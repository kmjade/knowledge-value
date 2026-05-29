/*
 ** Script Name: Create Or Open Note
 ** Author: Johnny
 ** Bilibili: https://space.bilibili.com/432408734
 ** Version: 1.9.0
 */
const isObsidianThemeDark = () =>
  document.body.classList.contains("theme-dark");

async function IOTOCreateOrOpenNote(tp, tR, folderPath, settings) {
  const ml = new (tp.user.IOTOMultiLangs(tp))(tp);
  const {
    addLinkToCurrentTDL,
    taskSelectorShowOptionOrder,
    taskSelectorShowBasePath,
    taskSelectorExcludesPaths,
    projectNameFormat,
    taskFolder,
  } = tp.app.plugins.plugins["ioto-settings"].settings;

  const activeFile = tp.config.active_file;
  const activeNote = tp.user.IOTONoteMaker(tp, activeFile);
  const activeCache = tp.app.metadataCache.getFileCache(activeFile);
  const selection = tp.file.selection().trim() || "";
  const defaultReturn = selection ? selection : "";
  const returnObj = {
    tR: defaultReturn,
    link: "",
    cancel: false,
  };
  const activeFileFM = activeCache?.frontmatter;
  const noteAddLinkToTDL = activeFileFM?.addLinkToTDL ?? undefined;

  const addLinkToTDL =
    noteAddLinkToTDL !== undefined ? noteAddLinkToTDL : settings.addLinkToTDL;

  if (addLinkToCurrentTDL && addLinkToTDL) {
    let project = activeFileFM?.Project;
    let message = "";
    const missingProject = !project || !project.length;
    if (missingProject) {
      message = ml.t(
        "You have not specified a project for this note. Please select a project for this note.",
      );
      new tp.obsidian.Notice(message, 2000);
      projectPath = await tp.user.IOTOGetFolderOption(tp, {
        folderPath: taskFolder,
        excludesPaths: taskSelectorExcludesPaths
          ? taskSelectorExcludesPaths.trim().split("\n")
          : [],
        showBasePathInOption: taskSelectorShowBasePath,
        optionContentTemplate: "{{folder}}",
        showOptionOrder: taskSelectorShowOptionOrder,
      });

      if (projectPath) {
        project = await tp.user.IOTOCreateProjectName(
          projectPath,
          projectNameFormat,
        );
        let tempFMDict = Object.assign(activeNote.fmDict, {
          Project: [project],
          cssclasses: ["iotoTDL"],
        });
        await activeNote.prepareNoteFm(tempFMDict);
        await activeNote.prepareNoteContent();
        await tp.app.vault.modify(
          activeNote.file,
          activeNote.fm + "\n" + activeNote.content,
        );
        await new Promise((r) => setTimeout(r, 100)); //wait for metadata to update, steal from obsidian excalidraw
      }
    }
  }

  let {
    template,
    defaultNewNoteFollowUpAction,
    noteNamePrefix,
    noteNamePostfix,
    assignedNoteName,
    defaultExcalidrawTemplate,
    fleetingNoteFolder,
    fleetingNotePrefix,
    fleetingNoteDateFormat,
  } = settings;

  let noteName = undefined;
  let note = undefined;
  let fleetingNotePrefixSetting = fleetingNotePrefix
    ? `${fleetingNotePrefix}-`
    : "";
  let fleetingNoteDateFormatSetting = fleetingNoteDateFormat
    ? fleetingNoteDateFormat
    : "YYYY-MM-DD";

  if (!folderPath) {
    returnObj.cancel = true;
    return returnObj;
  }

  const pathExist = await app.vault.exists(folderPath);
  if (!pathExist) {
    new tp.obsidian.Notice(ml.t("FolderPathNotExist", { folderPath }));
    returnObj.cancel = true;
    return returnObj;
  }

  if (template && !tp.file.find_tfile(template)) {
    new tp.obsidian.Notice(ml.t("TemplateNotExist", { template }));
    returnObj.cancel = true;
    return returnObj;
  }

  const noteType = folderPath.split("/").last().split("-").last();
  const isInDrawingFolder = folderPath.toLowerCase().includes("draw");
  const isInCanvasFolder = folderPath.toLowerCase().includes("canvas");

  if (
    isInDrawingFolder &&
    !app.plugins.enabledPlugins.has("obsidian-excalidraw-plugin")
  ) {
    new tp.obsidian.Notice(ml.t("ExcalidrawPluginNotInstalled"));
    returnObj.cancel = true;
    return returnObj;
  }

  let openOrLink = undefined;

  if (
    isNaN(defaultNewNoteFollowUpAction) ||
    0 == defaultNewNoteFollowUpAction ||
    defaultNewNoteFollowUpAction > 5
  ) {
    // 预生成基础选项，避免重复模板字符串解析
    const baseOptions = [
      ml.t("InsertLinkAfterCreate"),
      ml.t("OpenNoteAfterCreate"),
      ml.t("InsertLinkAndOpenNoteAfterCreate"),
      ml.t("DoNotInsertLinkAndDoNotOpenNoteAfterCreate"),
      ml.t("AddLinkTextAfterCreate"),
    ];
    const options = baseOptions.map((text, idx) => `${idx + 1}. ${text}`);
    const values = [1, 2, 3, 4, 5];

    // 若存在选中内容，追加第6项
    if (selection) {
      options.push(`6. ${ml.t("AddLinkAndUseSelectionAsAlias")}`);
      values.push(6);
    }
    openOrLink = await tp.system.suggester(options, values);
  } else {
    openOrLink = defaultNewNoteFollowUpAction;
  }

  // convert timestamp fix to date string
  const notePrefix = noteNamePrefix.startsWith("ts-")
    ? tp.date.now(noteNamePrefix.replace("ts-", ""))
    : noteNamePrefix;

  const notePostfix = noteNamePostfix.startsWith("ts-")
    ? tp.date.now(noteNamePostfix.replace("ts-", ""))
    : noteNamePostfix;

  if (!openOrLink) {
    returnObj.cancel = true;
    return returnObj;
  }
  if (folderPath.startsWith(fleetingNoteFolder)) {
    noteName =
      fleetingNotePrefixSetting + tp.date.now(fleetingNoteDateFormatSetting);
  } else {
    const enableAutoComplete = !assignedNoteName && !notePrefix && !notePostfix;
    const selectionAsAlias = selection && openOrLink === 6;

    if (enableAutoComplete || selectionAsAlias) {
      const folder = app.vault.getAbstractFileByPath(folderPath);
      let files = [];
      if (folder && folder.children) {
        files = folder.children
          .filter((f) => !f.children) // Filter out folders
          .map((f) => f.basename);
      }

      noteName = await new Promise((resolve) => {
        class NoteInputModal extends tp.obsidian.SuggestModal {
          constructor(app, files) {
            super(app);
            this.files = files;
            this.resolved = false;
            this.setPlaceholder(
              ml.t("PleaseInputNoteName", { noteType: noteType }),
            );
            // Add custom class to make it look like a prompt modal
            this.modalEl.addClass("ioto-prompt-modal");
          }

          onOpen() {
            super.onOpen();
          }

          getSuggestions(query) {
            if (!query) return [];
            const lowerQuery = query.toLowerCase();
            const filtered = this.files.filter((f) =>
              f.toLowerCase().includes(lowerQuery),
            );

            const suggestions = [];
            // Check for exact match to avoid duplicate "Create New" option
            const exactMatch = this.files.some(
              (f) => f.toLowerCase() === lowerQuery,
            );

            if (!exactMatch) {
              suggestions.push({ type: "create", value: query });
            }

            suggestions.push(
              ...filtered.map((f) => ({ type: "file", value: f })),
            );
            return suggestions;
          }

          renderSuggestion(item, el) {
            if (item.type === "create") {
              el.setText(`${ml.t("CreateNewFile")}: ${item.value}`);
              el.style.color = "var(--text-accent)";
            } else {
              el.setText(item.value);
            }
          }

          onChooseSuggestion(item, evt) {
            this.resolved = true;
            // this.close(); // Do not close manually, let Obsidian handle it
            resolve(item.value);
          }

          onClose() {
            // Delay slightly to ensure onChooseSuggestion has priority if triggered
            setTimeout(() => {
              if (!this.resolved) {
                resolve(null);
              }
            }, 10);
          }
        }
        new NoteInputModal(tp.app, files).open();
      });

      if (!noteName) {
        returnObj.tR = "";
        returnObj.cancel = true;
        return returnObj;
      }
    } else {
      noteName =
        (notePrefix ? notePrefix : "") +
        (assignedNoteName
          ? assignedNoteName
          : await tp.system.prompt(ml.t("PleaseInputNoteName", { noteType }))) +
        (notePostfix ? notePostfix : "");
    }
  }

  if ("null" === noteName) {
    returnObj.cancel = true;
    return returnObj;
  }

  noteName = noteName.trim();

  if (isInDrawingFolder) {
    noteName += "";
  }

  if (isInCanvasFolder) {
    noteName += ".canvas";
  }

  const notePath = folderPath + "/" + noteName;

  const file = tp.file.find_tfile(notePath);

  if (file) {
    note = file;
  } else if (isInDrawingFolder) {
    if (defaultExcalidrawTemplate) {
      const defaultExcalidrawTemplateNote = tp.file.find_tfile(
        defaultExcalidrawTemplate,
      );
      if (!defaultExcalidrawTemplateNote) {
        new tp.obsidian.Notice(
          ml.t("ExcalidrawTemplateNotExist", {
            defaultExcalidrawTemplate,
          }),
        );
        returnObj.cancel = true;
        return returnObj;
      } else {
        note = await tp.file.create_new(
          tp.file.find_tfile(defaultExcalidrawTemplate),
          noteName,
          false,
          app.vault.getAbstractFileByPath(folderPath),
        );
      }
    } else {
      note = await app.vault.create(
        notePath + ".md",
        getExcalidrawDefaultContent(),
      );
    }
  } else if (isInCanvasFolder) {
    note = await app.vault.create(notePath, "{}");
  } else {
    note = await tp.file.create_new(
      template ? tp.file.find_tfile(template) : "",
      noteName,
      false,
      app.vault.getAbstractFileByPath(folderPath),
    );
  }

  const link = app.metadataCache.fileToLinktext(note, app.vault.getName());

  switch (openOrLink) {
    case 1:
      returnObj.tR = `[[${link}]]`;
      returnObj.link = link;
      break;
    case 2:
      app.workspace.openLinkText(note.path, "/", true);
      returnObj.link = link;
      break;
    case 3:
      returnObj.tR = `[[${link}]]`;
      returnObj.link = link;
      app.workspace.openLinkText(note.path, "/", true);
      break;
    case 4:
      returnObj.link = link;
      break;
    case 5:
      returnObj.tR = `${link.trim()}`;
      returnObj.link = link;
      break;
    case 6:
      returnObj.tR = `[[${link.trim()}|${selection.trim()}]]`;
      returnObj.link = link;
      break;
    default:
      break;
  }
  return returnObj;
}

function getExcalidrawDefaultContent() {
  const Excalidraw = app.plugins.plugins["obsidian-excalidraw-plugin"];
  const GITHUB_RELEASES =
    "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/";
  const PLUGIN_VERSION = Excalidraw.manifest.version;
  const FRONTMATTER_KEY = "excalidraw-plugin";
  const BLANK_DRAWING = `{"type":"excalidraw","version":2,"source":"${
    GITHUB_RELEASES + PLUGIN_VERSION
  }","elements":[],"appState":{"gridSize":null,"viewBackgroundColor":"#ffffff"}}`;
  const DARK_BLANK_DRAWING = `{"type":"excalidraw","version":2,"source":"${
    GITHUB_RELEASES + PLUGIN_VERSION
  }","elements":[],"appState":{"theme":"dark","gridSize":null,"viewBackgroundColor":"#ffffff"}}`;

  const FRONTMATTER = [
    "---",
    "",
    `${FRONTMATTER_KEY}: parsed`,
    "tags: [excalidraw]",
    "",
    "---",
    "",
  ].join("\n");

  const blank =
    Excalidraw.settings.matchTheme && isObsidianThemeDark()
      ? DARK_BLANK_DRAWING
      : BLANK_DRAWING;
  return `${FRONTMATTER}\n# Drawing\n\x60\x60\x60json\n${blank}\n\x60\x60\x60\n%%`;
}

module.exports = IOTOCreateOrOpenNote;
