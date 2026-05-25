function IOTOUtility(tp, app) {
  const ml = new (tp.user.IOTOMultiLangs(tp))();
  return class IOTOUtility {
    constructor(tp, app) {
      this.tp = tp;
      this.app = app;
    }

    checkIOTOUserPermission() {
      const s = this.app.plugins.plugins["ioto-update"]?.settings;
      const valid = Boolean(
        s?.updateAPIKeyIsValid &&
        s?.userChecked &&
        s?.updateAPIKey &&
        s?.userEmail,
      );
      if (!valid) {
        this.showNotice(ml.t("IOTOLicenseInfo"), "⚠️ ", "error");
      }
      return valid;
    }

    checkOBSyncWithMDBUserPermission() {
      const s = this.app.plugins.plugins["ob-sync-with-mdb"]?.settings;
      const valid = Boolean(
        s?.updateAPIKeyIsValid &&
        s?.userChecked &&
        s?.updateAPIKey &&
        s?.userEmail,
      );
      if (!valid) {
        this.showNotice(ml.t("OBSyncLicenseInfo"), "⚠️ ", "error");
      }
      return valid;
    }

    showNotice(
      message,
      prefix = "",
      type = "info",
      duration = 3000,
      useConsole = false,
      returnInstance = false,
    ) {
      if (useConsole) {
        switch (type) {
          case "error":
            console.error(message);
            break;
          case "warning":
            console.warn(message);
            break;
          default:
            console.log(message);
        }
      }

      if (this.tp && this.tp.obsidian && this.tp.obsidian.Notice) {
        const prefixMessage = prefix && `${prefix}：`;
        const notice = new this.tp.obsidian.Notice(
          prefixMessage + message,
          duration,
        );

        return returnInstance ? notice : undefined;
      }
    }

    buildFragment(content, color) {
      const fragment = document.createDocumentFragment();
      const div = document.createElement("div");
      div.textContent = content;
      div.style.color = color;
      fragment.appendChild(div);
      return fragment;
    }

    getStatusBarEl() {
      try {
        const container = this.app?.workspace?.containerEl;
        const byContainer = container?.querySelector?.(".status-bar");
        if (byContainer) return byContainer;
      } catch (e) {}

      try {
        const byDocument = document?.querySelector?.(".status-bar");
        if (byDocument) return byDocument;
      } catch (e) {}

      return null;
    }

    getOrCreateStatusBarItem(key) {
      const safeKey = String(key || "").trim();
      if (!safeKey) return null;
      const win = window;
      if (!win.__iotoStatusBarItems) {
        win.__iotoStatusBarItems = Object.create(null);
      }
      const store = win.__iotoStatusBarItems;

      const existing = store[safeKey];
      if (existing?.el && existing.el.isConnected) {
        return existing.el;
      }

      const statusBar = this.getStatusBarEl();
      if (!statusBar) return null;
      const el = document.createElement("span");
      el.className = "status-bar-item ioto-status-bar-item";
      el.dataset.iotoKey = safeKey;
      statusBar.appendChild(el);

      store[safeKey] = store[safeKey] || { count: 0, el: null };
      store[safeKey].el = el;
      return el;
    }

    beginStatusBarTask(key, text = "") {
      const safeKey = String(key || "").trim();
      if (!safeKey) return;
      const el = this.getOrCreateStatusBarItem(safeKey);
      if (!el) return;

      const store = window.__iotoStatusBarItems || Object.create(null);
      const entry = store[safeKey] || { count: 0, el };
      entry.el = el;
      entry.count = Number(entry.count || 0) + 1;
      store[safeKey] = entry;
      window.__iotoStatusBarItems = store;

      el.textContent = String(text || "");
    }

    updateStatusBarTaskText(key, text = "") {
      const safeKey = String(key || "").trim();
      if (!safeKey) return;
      const store = window.__iotoStatusBarItems;
      const entry = store?.[safeKey];
      const el = entry?.el;
      if (!el || !el.isConnected) return;
      el.textContent = String(text || "");
    }

    endStatusBarTask(key) {
      const safeKey = String(key || "").trim();
      if (!safeKey) return;
      const store = window.__iotoStatusBarItems;
      if (!store || !store[safeKey]) return;

      const entry = store[safeKey];
      entry.count = Number(entry.count || 0) - 1;
      if (entry.count > 0) {
        store[safeKey] = entry;
        return;
      }

      try {
        entry.el?.remove();
      } catch (e) {}
      delete store[safeKey];
    }

    convertToValidFileName(fileName) {
      return fileName.replace(/[\/|\\:'"()（）{}<>\.\*]/g, "-").trim();
    }

    isObject(value) {
      return Object.prototype.toString.call(value) === "[object Object]";
    }

    async createPathIfNeeded(folderPath) {
      const { vault } = this.app;
      const directoryExists = await vault.exists(folderPath);
      if (!directoryExists) {
        await vault.createFolder(this.tp.obsidian.normalizePath(folderPath));
      }
    }

    async getDateChoice() {
      const dateFilterOptions = [
        { id: 1, label: ml.t("PastHourNotes"), unit: "hours", value: 1 },
        { id: 2, label: ml.t("TodayNote"), unit: "hours", value: 24 },
        { id: 3, label: ml.t("PastThreeDaysNotes"), unit: "days", value: 3 },
        { id: 4, label: ml.t("PastWeekNotes"), unit: "days", value: 7 },
        { id: 5, label: ml.t("PastTwoWeeksNotes"), unit: "days", value: 14 },
        {
          id: 6,
          label: ml.t("PastMonthNotes"),
          unit: "days",
          value: 30,
        },
        { id: 99, label: ml.t("AllNotes") },
      ];

      const unitOptions = [
        { label: ml.t("Minutes"), value: "minutes" },
        { label: ml.t("Hours"), value: "hours" },
        { label: ml.t("Days"), value: "days" },
        { label: ml.t("Weeks"), value: "weeks" },
        { label: ml.t("Months"), value: "months" },
      ];

      const customFilterLabel = ml.t("NotesUpdatedInSpecificTimeRange");
      const allLabels = [
        ...dateFilterOptions.map((option) => option.label),
        customFilterLabel,
      ];
      const allIds = [
        ...dateFilterOptions.map((option) => option.id),
        "custom",
      ];

      let choice = await this.tp.system.suggester(
        allLabels.map((item, index) => `${index + 1}. ${item}`),
        allIds,
      );

      let selectedFilter = null;

      if (choice === "custom") {
        const unitChoice = await this.tp.system.suggester(
          unitOptions.map((u) => u.label),
          unitOptions.map((u) => u.value),
        );
        if (!unitChoice) {
          return { choice: null, selectedFilter: null };
        }

        let value = await this.tp.system.prompt(
          `${ml.t("PleaseInputValue")}（${ml.t(
            unitOptions
              .find((u) => u.value === unitChoice)
              .value.charAt(0)
              .toUpperCase() +
              unitOptions.find((u) => u.value === unitChoice).value.slice(1),
          )}）：`,
          "",
        );
        value = parseInt(value, 10);
        if (isNaN(value) || value <= 0) {
          this.showNotice(`${ml.t("PleaseInputValidValue")}`);
          return { choice: null, selectedFilter: null };
        }
        selectedFilter = {
          unit: unitChoice,
          value: value,
        };
        choice = "custom";
      } else {
        selectedFilter = dateFilterOptions.find(
          (option) => option.id === choice,
        );
      }

      return {
        choice: choice,
        selectedFilter: selectedFilter,
      };
    }

    static getCurrentHourTime() {
      const now = new Date();

      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0",
      )}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours(),
      ).padStart(2, "0")}00`;
    }

    /**
     * Determine if the passed value conforms to the ISO 8601 UTC time format
     * @param {string} value
     * @returns {boolean}
     */
    isISO8601UTC(value) {
      if (typeof value !== "string") return false;
      // ISO 8601 UTC format example: 2023-06-01T12:34:56Z or 2023-06-01T12:34:56.789Z
      const iso8601UtcRegex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
      return iso8601UtcRegex.test(value);
    }

    /**
     * Convert ISO 8601 UTC time string (e.g., 2023-06-01T12:34:56Z) to ISO 8601 format string in the system's local time zone
     * @param {string} utcISOString
     * @returns {string} ISO 8601 string in system timezone (e.g., 2023-06-01T20:34:56+08:00)
     */
    isoUtcToLocalIsoString(utcISOString) {
      if (typeof utcISOString !== "string") return "";
      // Validate format first
      const iso8601UtcRegex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
      if (!iso8601UtcRegex.test(utcISOString)) return "";
      try {
        const date = new Date(utcISOString);
        if (isNaN(date.getTime())) return "";
        // toISOString() always returns UTC, toLocaleString is affected by locale but without timezone
        // We want an ISO string for local time with timezone
        // Manually construct it below
        const pad = (n) => String(n).padStart(2, "0");
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hour = pad(date.getHours());
        const minute = pad(date.getMinutes());
        const second = pad(date.getSeconds());
        const ms = date.getMilliseconds();
        let msStr = "";
        if (ms > 0) {
          msStr = "." + String(ms).padStart(3, "0");
        }
        // Get local timezone offset in minutes
        const offset = -date.getTimezoneOffset();
        const offsetSign = offset >= 0 ? "+" : "-";
        const offsetAbs = Math.abs(offset);
        const offsetHour = pad(Math.floor(offsetAbs / 60));
        const offsetMin = pad(offsetAbs % 60);
        const tzStr = `${offsetSign}${offsetHour}:${offsetMin}`;
        return `${year}-${month}-${day}T${hour}:${minute}:${second}${msStr}${tzStr}`;
      } catch (e) {
        return "";
      }
    }

    isValidTimestamp(value) {
      value = String(value);
      return (
        typeof value === "string" &&
        /^\d{10}$|^\d{13}$/.test(value) &&
        // 10-digit second-level timestamp range: 2000-01-01 ~ 2100-01-01
        ((value.length === 10 &&
          Number(value) >= 946684800 &&
          Number(value) <= 4102444800) ||
          // 13-digit millisecond-level timestamp range: 2000-01-01 ~ 2100-01-01
          (value.length === 13 &&
            Number(value) >= 946684800000 &&
            Number(value) <= 4102444800000))
      );
    }

    // Convert timestamp (10 or 13 digits) to ISO date format string
    timestampToISODate(timestamp) {
      let ts = Number(timestamp);
      if (isNaN(ts)) return "";
      // If it is 10 digits, it means seconds, need to convert to milliseconds
      if (String(ts).length === 10) {
        ts = ts * 1000;
      }
      try {
        const date = new Date(ts);
        if (isNaN(date.getTime())) return "";
        // Convert to local time string of the current system timezone (format: YYYY-MM-DD HH:mm:ss)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(date.getDate()).padStart(2, "0")} ${String(
          date.getHours(),
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
          2,
          "0",
        )}:${String(date.getSeconds()).padStart(2, "0")}`;
      } catch (e) {
        return "";
      }
    }

    checkDBSettings(nocoDBSettings, dbType) {
      let result = true;
      switch (dbType) {
        case "airtable":
          if (
            !nocoDBSettings.apiKey ||
            !nocoDBSettings.defaultBaseID ||
            !nocoDBSettings.defaultTableID
          ) {
            this.showNotice(
              ml.t("AirtalbeSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "vika":
          if (!nocoDBSettings.apiKey || !nocoDBSettings.defaultTableID) {
            this.showNotice(
              ml.t("VikaSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "feishu":
          if (
            !nocoDBSettings.appID ||
            !nocoDBSettings.appSecret ||
            !nocoDBSettings.defaultAppToken ||
            !nocoDBSettings.defaultTableID
          ) {
            this.showNotice(
              ml.t("FeishuSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "lark":
          if (
            !nocoDBSettings.appID ||
            !nocoDBSettings.appSecret ||
            !nocoDBSettings.defaultAppToken ||
            !nocoDBSettings.defaultTableID
          ) {
            this.showNotice(
              ml.t("LarkSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "wps":
          if (
            !nocoDBSettings.appID ||
            !nocoDBSettings.appKey ||
            !nocoDBSettings.defaultFileID ||
            !nocoDBSettings.defaultSheetID
          ) {
            this.showNotice(
              ml.t("WpsSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "ding":
          if (
            !nocoDBSettings.appID ||
            !nocoDBSettings.appSecret ||
            !nocoDBSettings.userID ||
            !nocoDBSettings.defaultBaseID ||
            !nocoDBSettings.defaultSheetID
          ) {
            this.showNotice(
              ml.t("DingSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "baserow":
          if (
            !nocoDBSettings.apiKey ||
            !nocoDBSettings.defaultBaseID ||
            !nocoDBSettings.defaultTableID
          ) {
            this.showNotice(
              ml.t("BaserowSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "nocodb":
          if (
            !nocoDBSettings.apiKey ||
            !nocoDBSettings.defaultBaseID ||
            !nocoDBSettings.defaultTableID
          ) {
            this.showNotice(
              ml.t("NocoDBSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        case "notion":
          if (!nocoDBSettings.apiKey || !nocoDBSettings.defaultDataSourceID) {
            this.showNotice(
              ml.t("NotionSyncSettingError"),
              ml.t("SyncSettingError"),
              "error",
            );
            result = false;
          }
          break;
        default:
          result = true;
      }
      return result;
    }

    noteFrontMatterCooker(frontMatter = {}, note = "") {
      if (!this.isObject(frontMatter)) {
        frontMatter = {};
      }
      if (typeof note !== "string") {
        note = "";
      }

      const { noteFrontmatter, contentWithoutFrontmatter } =
        this.parseNoteFrontMatter(note);

      const mergedFrontMatter = Object.assign({}, frontMatter, noteFrontmatter);

      let fmText = "";
      if (Object.keys(mergedFrontMatter).length > 0) {
        let fmDict = mergedFrontMatter;
        let YAMLCooker =
          this.tp &&
          this.tp.user &&
          typeof this.tp.user.IOTOYAMLCooker === "function"
            ? this.tp.user.IOTOYAMLCooker()
            : null;
        if (YAMLCooker) {
          const yamlCooker = new YAMLCooker(this.tp);
          fmDict = yamlCooker.sortFmDict
            ? yamlCooker.sortFmDict(fmDict)
            : fmDict;
          fmText = yamlCooker.dumpsFm(fmDict, false);
        } else {
          fmText =
            "---\n" +
            Object.entries(fmDict)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n") +
            "\n---\n";
        }
      }

      return fmText + contentWithoutFrontmatter;
    }

    addIOOLinkPropertyToFrontMatter(frontMatter = {}, active_file = null) {
      if (!active_file) return frontMatter;

      const settings = this.app.plugins.plugins["ioto-settings"]?.settings;
      if (!settings) return frontMatter;

      const { inputFolder, outputFolder, outcomeFolder } = settings;
      const { path } = active_file;

      // 一次性判断路径前缀并设置对应属性
      const key = path.startsWith(inputFolder)
        ? "Inputs"
        : path.startsWith(outputFolder)
          ? "Outputs"
          : path.startsWith(outcomeFolder)
            ? "Outcomes"
            : null;

      if (key) {
        const link = this.app.metadataCache.fileToLinktext(
          active_file,
          this.app.vault.getName(),
        );
        frontMatter[key] = [`"[[${link}]]"`];
      }

      return frontMatter;
    }

    parseNoteFrontMatter(note = "") {
      const lines = String(note).split("\n");
      if (!lines.length) {
        return { noteFrontmatter: {}, contentWithoutFrontmatter: "" };
      }

      let start = 0;
      while (start < lines.length && lines[start].trim() === "") {
        start++;
      }

      if (start >= lines.length || lines[start].trim() !== "---") {
        return { noteFrontmatter: {}, contentWithoutFrontmatter: note };
      }

      let end = start + 1;
      for (; end < lines.length; end++) {
        if (lines[end].trim() === "---") {
          break;
        }
      }

      if (end >= lines.length) {
        return { noteFrontmatter: {}, contentWithoutFrontmatter: note };
      }

      const fmLines = lines.slice(start + 1, end);
      const contentLines = lines.slice(end + 1);

      const noteFrontmatter = this.parseYamlLinesToObject(fmLines);
      const contentWithoutFrontmatter = contentLines.join("\n");

      return { noteFrontmatter, contentWithoutFrontmatter };
    }

    parseYamlLinesToObject(lines = []) {
      const result = {};
      let currentKey = null;
      let mode = null;
      let blockLines = [];
      let arrayItems = [];

      const flushCurrent = () => {
        if (!currentKey) return;
        if (mode === "array") {
          result[currentKey] = arrayItems.slice();
        } else if (mode === "block") {
          result[currentKey] = blockLines.join("\n");
        }
        currentKey = null;
        mode = null;
        blockLines = [];
        arrayItems = [];
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!currentKey && trimmed === "") {
          continue;
        }

        if (!currentKey && trimmed.startsWith("#")) {
          continue;
        }

        const isIndented =
          line.startsWith(" ") || line.startsWith("\t") || line === "";

        if (isIndented && currentKey && mode === "array") {
          const m = trimmed.match(/^- (.*)$/);
          if (m) {
            arrayItems.push(this.parseYamlScalar(m[1]));
          }
          continue;
        }

        if (isIndented && currentKey && mode === "block") {
          if (trimmed !== "") {
            blockLines.push(line.replace(/^\s+/, ""));
          } else {
            blockLines.push("");
          }
          continue;
        }

        if (!trimmed) {
          flushCurrent();
          continue;
        }

        flushCurrent();

        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) {
          continue;
        }

        const key = line.slice(0, colonIndex).trim();
        let rawValue = line.slice(colonIndex + 1);
        rawValue = rawValue.replace(/^\s+/, "");

        if (!key) {
          continue;
        }

        if (
          rawValue === "|" ||
          rawValue === "|-" ||
          rawValue === ">" ||
          rawValue === ">-"
        ) {
          currentKey = key;
          mode = "block";
          blockLines = [];
          continue;
        }

        if (rawValue === "") {
          currentKey = key;
          mode = "array";
          arrayItems = [];
          continue;
        }

        result[key] = this.parseYamlScalar(rawValue);
      }

      flushCurrent();

      return result;
    }

    parseYamlScalar(rawValue) {
      let value = rawValue;
      const hasDoubleQuotes =
        value.length >= 2 && value.startsWith('"') && value.endsWith('"');
      const hasSingleQuotes =
        value.length >= 2 && value.startsWith("'") && value.endsWith("'");

      if (hasDoubleQuotes || hasSingleQuotes) {
        value = value.slice(1, -1);
        return value;
      }

      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }

      if (!isNaN(value) && value !== "") {
        return Number(value);
      }

      return value;
    }
    removeUncheckedTasks(content) {
      if (!content) return content;
      // 匹配以 -、* 或 + 开头，后跟 [ ]（允许内部有空格）的未完成任务行，并将其整行移除
      const regex = /^[ \t]*[-*+][ \t]+\[\s*\].*(?:\r?\n|$)/gm;
      return content.replace(regex, "");
    }

    extractUncheckedTasksAndHeadings(content) {
      if (!content) return content;

      const lines = content.split("\n");
      const result = [];

      const headingRegex = /^#+\s+.+/;
      const uncheckedTaskRegex = /^[ \t]*[-*+][ \t]+\[\s*\].*/;

      for (const line of lines) {
        if (headingRegex.test(line)) {
          if (result.length > 0) result.push("");
          result.push(line);
          result.push("");
        } else if (uncheckedTaskRegex.test(line)) {
          result.push(line);
        }
      }

      return result.join("\n");
    }

    hasUnfinishedTasks(content) {
      if (!content) return false;
      // 检查是否包含未完成的任务，且任务内容不为空（必须包含至少一个非空白字符）
      const regex = /^[ \t]*[-*+][ \t]+\[\s*\][ \t]*\S.*/gm;
      return regex.test(content);
    }

    removeFrontMatterFromContent(content) {
      if (!content) return content;
      const frontmatterRegex = /^---\n(.*?)\n---\n/s;
      return content.replace(frontmatterRegex, "");
    }
  };
}

module.exports = IOTOUtility;
