/*
 ** Script Name: Create Tasks List
 ** Author: Johnny
 ** Bilibili: https://space.bilibili.com/432408734
 ** Version: 2.0.5
 */

// enableFutureDaysChoices: Allow users to choose whether to create TDL for future dates
// timestampFormat: Allow users to set the timestamp format themselves

/**
 * Handle date offset interaction
 */
async function getTaskDateOffset(tp, ml, enableFutureDaysChoices) {
  if (!enableFutureDaysChoices) return { offset: 0, overrideFormat: null };

  const futureDaysChoices = [
    ml.t("CreateTodayTasksList"),
    ml.t("CreateTomorrowTasksList"),
    ml.t("CreateAfterTomorrowTasksList"),
    ml.t("CreateBigAfterTomorrowTasksList"),
  ];
  const futureDaysOptions = [0, 1, 2, 3];

  const offset = await tp.system.suggester(
    futureDaysChoices,
    futureDaysOptions,
  );

  // If user cancelled, default to today (0)
  return {
    offset: offset ?? 0,
    overrideFormat: "YYYY-MM-DD",
  };
}

/**
 * Handle task list name generation and user interaction
 */
async function getTaskListName(
  tp,
  ml,
  folderPath,
  projectName,
  settings,
  offset,
  overrideFormat,
) {
  const { useCustomTDLName, timestampFormat: origTimestampFormat } = settings;
  const timestampFormat = overrideFormat || origTimestampFormat;
  let userAssignedName = null;

  if (settings.createPlanMode) {
    userAssignedName = await tp.system.prompt(ml.t("PleaseSpecifyTDLPlan"));
    if (userAssignedName) {
      return {
        tdlName: `${projectName}-${ml.t("Plan")}-${userAssignedName}`,
        isSubjectMode: false,
        isPlanMode: true,
      };
    }
  }

  if (useCustomTDLName) {
    const subjectNameProvider =
      settings.subjectNameProvider ||
      (({ tp, ml, folderPath }) =>
        promptSubjectNameWithExistingList(tp, ml, folderPath));
    userAssignedName = await subjectNameProvider({ tp, ml, folderPath });
    // If user inputs a name, use subject mode. If cancelled or empty, fallback to date mode
    if (userAssignedName) {
      return {
        tdlName: `${projectName}-${ml.t("Subject")}-${userAssignedName}`,
        isSubjectMode: true,
        isPlanMode: false,
      };
    }
  }

  return {
    tdlName: `${projectName}-${tp.date.now(timestampFormat, offset)}`,
    isSubjectMode: false,
    isPlanMode: false,
  };
}

class IOTOTDLSubjectPromptError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "IOTOTDLSubjectPromptError";
    this.cause = cause;
  }
}

function mlText(ml, key, fallback, vars) {
  const text = ml.t(key, vars);
  return text === key ? fallback : text;
}

function getSubjectMarker(subjectToken) {
  return `-${subjectToken}-`;
}

function tryExtractSubjectNameFromFileName(fileName, subjectToken) {
  const marker = getSubjectMarker(subjectToken);
  const dotIndex = fileName.lastIndexOf(".");
  const base =
    dotIndex > 0 && dotIndex < fileName.length - 1
      ? fileName.slice(0, dotIndex)
      : fileName;
  const markerIndex = base.indexOf(marker);
  if (markerIndex < 0) return null;
  const subject = base.slice(markerIndex + marker.length).trim();
  if (!subject) return null;
  return subject;
}

function listSubjectNamesFromFolderChildren(children, subjectToken) {
  const subjects = [];
  const invalid = [];
  for (const child of children || []) {
    if (!child || child.children) continue;
    const name =
      typeof child.name === "string"
        ? child.name
        : typeof child.basename === "string"
          ? `${child.basename}.${child.extension || "md"}`
          : null;
    if (!name) continue;
    if (!name.includes(getSubjectMarker(subjectToken))) continue;
    const subject = tryExtractSubjectNameFromFileName(name, subjectToken);
    if (!subject) {
      invalid.push(name);
      continue;
    }
    subjects.push(subject);
  }

  const unique = [...new Set(subjects)].sort((a, b) => a.localeCompare(b));
  return { subjects: unique, invalid };
}

async function fetchSubjectNamesInFolder(app, ml, folderPath) {
  const subjectToken = ml.t("Subject");
  const folder = app.vault.getAbstractFileByPath(folderPath);
  if (!folder || !folder.children) {
    throw new IOTOTDLSubjectPromptError(
      ml.t("FolderPathNotExist", { folderPath }),
    );
  }

  const { subjects, invalid } = listSubjectNamesFromFolderChildren(
    folder.children,
    subjectToken,
  );

  if (!subjects.length && invalid.length) {
    throw new IOTOTDLSubjectPromptError(
      mlText(
        ml,
        "UnableToParseSubjectNames",
        `无法解析主题名，请检查文件命名：${invalid.slice(0, 10).join(", ")}`,
        { folderPath, files: invalid.slice(0, 10).join(", ") },
      ),
    );
  }

  return { subjects, invalid };
}

async function promptSubjectNameWithExistingList(tp, ml, folderPath) {
  return await new Promise((resolve) => {
    class SubjectInputModal extends tp.obsidian.SuggestModal {
      constructor(app) {
        super(app);
        this.resolved = false;
        this.subjects = [];
        this.invalid = [];
        this.errorMessage = null;
        this.setPlaceholder(
          `${ml.t("PleaseSpecifyTDLTopic")} ${ml.t("CancelOrEnterToCreateDateRangeTDL")}`,
        );
        this.modalEl.addClass("ioto-prompt-modal");
      }

      async refreshSubjects() {
        try {
          const { subjects, invalid } = await fetchSubjectNamesInFolder(
            tp.app,
            ml,
            folderPath,
          );
          this.subjects = subjects;
          this.invalid = invalid;
          this.errorMessage = null;
        } catch (e) {
          this.subjects = [];
          this.invalid = [];
          this.errorMessage =
            e instanceof Error
              ? e.message
              : mlText(
                  ml,
                  "FolderReadError",
                  "读取文件夹失败，请检查权限或路径",
                );
        }
        this.updateMessage();
        this.updateSuggestions();
      }

      updateMessage() {
        if (!this.messageEl) return;
        this.messageEl.empty();

        if (this.errorMessage) {
          const errEl = this.messageEl.createDiv({
            cls: "ioto-modal-error",
            text: this.errorMessage,
          });
          errEl.style.color = "var(--text-error)";
        } else if (this.invalid.length) {
          const warnEl = this.messageEl.createDiv({
            cls: "ioto-modal-warn",
            text: mlText(
              ml,
              "SomeSubjectsParseFailed",
              `部分主题文件名解析失败：${this.invalid.length}`,
              { count: `${this.invalid.length}` },
            ),
          });
          warnEl.style.color = "var(--text-warning)";
        }

        if (this.retryBtn) {
          this.retryBtn.style.display = this.errorMessage ? "" : "none";
        }
      }

      onOpen() {
        super.onOpen();
        this.messageEl = this.contentEl.createDiv({
          cls: "ioto-modal-message",
        });
        this.retryBtn = this.contentEl.createEl("button", {
          text: mlText(ml, "Retry", "重试"),
        });
        this.retryBtn.style.marginTop = "8px";
        this.retryBtn.onclick = () => this.refreshSubjects();
        void this.refreshSubjects();
      }

      getSuggestions(query) {
        if (this.errorMessage) return [];
        const q = (query || "").trim();
        const lower = q.toLowerCase();
        const filtered = lower
          ? this.subjects.filter((s) => s.toLowerCase().includes(lower))
          : this.subjects;

        const suggestions = [];
        const exactMatch = lower
          ? this.subjects.some((s) => s.toLowerCase() === lower)
          : false;
        if (q && !exactMatch) {
          suggestions.push({ type: "create", value: q });
        }
        suggestions.push(
          ...filtered.map((s) => ({ type: "subject", value: s })),
        );
        return suggestions;
      }

      renderSuggestion(item, el) {
        if (item.type === "create") {
          el.setText(
            `${mlText(ml, "CreateNewSubject", "创建新主题")}: ${item.value}`,
          );
          el.style.color = "var(--text-accent)";
        } else {
          el.setText(item.value);
        }
      }

      onChooseSuggestion(item) {
        this.resolved = true;
        resolve(item.value);
      }

      onClose() {
        setTimeout(() => {
          if (!this.resolved) resolve(null);
        }, 10);
      }
    }
    new SubjectInputModal(tp.app).open();
  });
}

async function IOTOCreateTasksList(tp, folderPath, settings) {
  // If no folder path is provided, return directly
  if (!folderPath) return;

  const ml = new (tp.user.IOTOMultiLangs(tp))(tp);
  const Utils = new (tp.user.IOTOUtility(tp))(tp, app);

  const projectName = await tp.user.IOTOCreateProjectName(
    folderPath,
    settings.projectNameFormat,
  );

  // Phase 1: Collect User Interactions and Environment Data
  const { offset, overrideFormat } = await getTaskDateOffset(
    tp,
    ml,
    settings.enableFutureDaysChoices,
  );

  const { tdlName, isSubjectMode, isPlanMode } = await getTaskListName(
    tp,
    ml,
    folderPath,
    projectName,
    settings,
    offset,
    overrideFormat,
  );

  // Phase 2: State Evaluation (Determine if we need to migrate tasks)
  const activeFile = tp.config.active_file;
  const isSameProjectDateTDL =
    activeFile.parent.path === folderPath &&
    !activeFile.name.includes(`-${ml.t("Subject")}-`);

  const targetIsActive = activeFile.basename === tdlName;

  // We only need to check for unfinished tasks if the file matches project criteria and we are not creating a subject note
  let shouldMigrateTasks = false;
  let activeNote = null;

  if (isSameProjectDateTDL && !isSubjectMode && !targetIsActive) {
    activeNote = tp.user.IOTONoteMaker(tp, activeFile);
    await activeNote.prepareNoteContent();
    shouldMigrateTasks = Utils.hasUnfinishedTasks(activeNote.content);
  }

  // Phase 3: Data Preparation (Extract and remove tasks ONLY if needed)
  let newTDLContent = null;
  let modifiedOriginalContent = null;

  if (shouldMigrateTasks) {
    await activeNote.prepareNoteFm(activeNote.fmDict);
    modifiedOriginalContent = Utils.removeUncheckedTasks(
      activeNote.fullContent,
    );
    const onlyUnfinishedTasksContent = Utils.extractUncheckedTasksAndHeadings(
      activeNote.fullContent,
    );
    newTDLContent = activeNote.fm + onlyUnfinishedTasksContent;
  }

  // Phase 4: File Operations
  const tdlNote = tp.file.find_tfile(`${folderPath}/${tdlName}`);

  // Determine template to use
  const finalTemplate = shouldMigrateTasks
    ? newTDLContent
    : tp.file.find_tfile(settings.template);

  // Create or get the target TDL path
  const targetPath =
    tdlNote?.path ||
    (
      await tp.file.create_new(
        finalTemplate,
        tdlName,
        false,
        app.vault.getAbstractFileByPath(folderPath),
      )
    ).path;

  // Modify the original file if tasks were migrated
  if (shouldMigrateTasks) {
    await tp.app.vault.modify(activeFile, modifiedOriginalContent);
    await new Promise((r) => setTimeout(r, 100)); // wait for metadata to update
  }

  // Check if the target TDL is already open in an existing tab
  const leaves = app.workspace.getLeavesOfType("markdown");
  const existingLeaf = leaves.find(
    (leaf) => leaf.view.file && leaf.view.file.path === targetPath,
  );

  if (existingLeaf) {
    // If it's already open, switch to that tab
    app.workspace.setActiveLeaf(existingLeaf, { focus: true });
  } else {
    // Otherwise, open it in a new tab
    app.workspace.openLinkText(targetPath, "/", true);
  }

  if (isPlanMode) {
    return `[[${tdlName}]]`;
  } else {
    return "";
  }
}

module.exports = IOTOCreateTasksList;
