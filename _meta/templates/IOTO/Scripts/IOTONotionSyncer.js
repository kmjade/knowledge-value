function IOTONotionSyncer(tp) {
  let NocoDBSyncer = tp.user.IOTONoCodeDBSyncer(tp);
  const ml = new (tp.user.IOTOMultiLangs(tp))();
  const NotionRequestScheduler = tp.user.IOTONotionRequestScheduler(tp);
  const NotionLinkConverter = tp.user.IOTONotionLinkConverter(tp);
  const NotionInlineRichText = tp.user.IOTONotionInlineRichText(tp);
  const NotionMarkdownBlocks = tp.user.IOTONotionMarkdownBlocks(tp);
  const NotionApiClient = tp.user.IOTONotionApiClient(tp);

  return class NotionSyncer extends NocoDBSyncer {
    constructor(nocodb, tp, app, updateNotesInOB = true) {
      super(nocodb, tp, app, updateNotesInOB);
      this.defaultPageSize = 100;
      this.currentSyncFolder = this.folder;
      this.blockAppendBatchSize = 50;
      this.blockRetrievePageSize = 100;
      this.blockSyncDelayMs = 350;
      this.maxBlockDepth = 2;
      this.notionRequestScheduler = null;
      this.refreshNotionRequestScheduler();
      this.currentObsidianSourceFilePath = "";
      this.linkConverter = new NotionLinkConverter(this);
      this.inlineRichText = new NotionInlineRichText(this, this.linkConverter);
      this.markdownBlocks = new NotionMarkdownBlocks(
        this,
        this.inlineRichText,
        this.linkConverter,
      );
      this.apiClient = new NotionApiClient(this, this.notionRequestScheduler);
    }

    getNotionStatusBarText() {
      const total = Number(this._iotoSyncProgress?.total || 0);
      const done = Number(this._iotoSyncProgress?.done || 0);
      if (total > 0) {
        return ml.t("NotionSyncingInStatusBarCounts", { total, done });
      }
      return ml.t("NotionSyncingInStatusBar");
    }

    onSyncProgressStart(progress) {
      if (!progress?.total) return;
      this.beginStatusBarTask(
        "ioto-notion-blocks",
        this.getNotionStatusBarText(),
      );
    }

    onSyncProgressUpdate(progress) {
      if (!progress?.total) return;
      this.updateStatusBarTaskText(
        "ioto-notion-blocks",
        this.getNotionStatusBarText(),
      );
    }

    onSyncProgressEnd(progress) {
      if (!progress?.total) return;
      this.endStatusBarTask("ioto-notion-blocks");
    }

    async setSyncEnviromentForFolder(folder, mode = "upload") {
      this.currentSyncFolder = folder;
      const result = await super.setSyncEnviromentForFolder(folder, mode);
      this.refreshNotionRequestScheduler();
      return result;
    }

    refreshNotionRequestScheduler() {
      const folder = this.currentSyncFolder || this.folder || "";
      const minIntervalSetting = this.getSyncSettingByLevel(
        "notionRequestMinIntervalMs",
        this.activeNote,
        folder,
        this.blockSyncDelayMs,
      );
      const maxConcurrencySetting = this.getSyncSettingByLevel(
        "notionMaxConcurrency",
        this.activeNote,
        folder,
        2,
      );

      const minIntervalMs =
        Number(minIntervalSetting) >= 0
          ? Number(minIntervalSetting)
          : this.blockSyncDelayMs;
      const maxConcurrency =
        Number(maxConcurrencySetting) >= 1 ? Number(maxConcurrencySetting) : 2;

      if (!this.notionRequestScheduler) {
        this.notionRequestScheduler = new NotionRequestScheduler({
          minIntervalMs,
          maxConcurrency,
        });
        return;
      }

      this.notionRequestScheduler.updateConfig({
        minIntervalMs,
        maxConcurrency,
      });
    }

    normalizeNotionPageIdToUuid(id) {
      return this.linkConverter.normalizeNotionPageIdToUuid(id);
    }

    ensureNotionToObLinkIndex() {
      return this.linkConverter.ensureNotionToObLinkIndex();
    }

    resolveObsidianLinkFromNotionPageId(pageId, label = "") {
      return this.linkConverter.resolveObsidianLinkFromNotionPageId(
        pageId,
        label,
      );
    }

    shouldConvertNotionLinksToObsidian() {
      return this.linkConverter.shouldConvertNotionLinksToObsidian();
    }

    shouldConvertObsidianLinksToNotion() {
      return this.linkConverter.shouldConvertObsidianLinksToNotion();
    }

    resolveNotionPageIdFromObsidianLink(linkpath) {
      return this.linkConverter.resolveNotionPageIdFromObsidianLink(linkpath);
    }

    createRequestConfig({
      url,
      method,
      data = null,
      apiKey = "",
      additionalHeaders = {},
    } = {}) {
      const resolvedApiKey = String(apiKey || "").trim()
        ? apiKey
        : this.getNotionApiKeyForContext(
            this.activeNote,
            this.currentSyncFolder || this.folder,
          );
      return this.apiClient.createRequestConfig({
        url,
        method,
        data,
        apiKey: resolvedApiKey,
        additionalHeaders,
      });
    }

    async requestWithRetry(config, retryCount = 0) {
      return this.apiClient.requestWithRetry(config, retryCount);
    }

    async sleep(ms) {
      await new Promise((resolve) => setTimeout(resolve, ms));
    }

    getDataSourceIDFromApiUrl() {
      const match = this.nocodb.apiUrl.match(/data_sources\/([^/]+)\/query$/);
      return match?.[1] || "";
    }

    makeDataSourceApiUrl(dataSourceID) {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      return `${cleanRoot}/data_sources/${dataSourceID}`;
    }

    makeDataSourceQueryUrl(dataSourceID) {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      return `${cleanRoot}/data_sources/${dataSourceID}/query`;
    }

    async getDataSourceSchema(dataSourceID = "") {
      return this.apiClient.getDataSourceSchema(dataSourceID);
    }

    getMarkdownFromRecordFields(fields = {}) {
      const full =
        fields?.[this.recordFieldsNames.fullContent] ||
        fields?.[this.recordFieldsNames.content] ||
        "";
      const extraFull =
        fields?.[this.recordFieldsNames.extraFullContent] ||
        fields?.[this.recordFieldsNames.extraContent] ||
        "";
      return String(full || "") + String(extraFull || "");
    }

    getContentFieldsKeys() {
      return [
        this.recordFieldsNames.content,
        this.recordFieldsNames.extraContent,
        this.recordFieldsNames.fullContent,
        this.recordFieldsNames.extraFullContent,
      ].filter(Boolean);
    }

    getSyncSettingBooleanForRecord(record, propertyKey, fallbackValue) {
      const folder =
        record?.fields?.[this.recordFieldsNames.path] || this.currentSyncFolder;
      let note = null;
      try {
        const title = record?.fields?.[this.recordFieldsNames.title];
        if (folder && title) {
          const file =
            this.tp.file.find_tfile(`${folder}/${title}`) ||
            (!/\.md$/i.test(title)
              ? this.tp.file.find_tfile(`${folder}/${title}.md`)
              : null);
          if (file) {
            const frontmatter =
              this.app.metadataCache.getFileCache(file)?.frontmatter;
            if (frontmatter) {
              note = { frontmatter };
            }
          }
        }
      } catch (e) {}

      return this.getBooleanSyncSettingByLevel(
        propertyKey,
        note,
        folder || this.currentSyncFolder || this.folder,
        fallbackValue,
      );
    }

    getSyncSettingForRecord(record, propertyKey, fallbackValue) {
      const folder =
        record?.fields?.[this.recordFieldsNames.path] || this.currentSyncFolder;
      let note = null;
      try {
        const title = record?.fields?.[this.recordFieldsNames.title];
        if (folder && title) {
          const file =
            this.tp.file.find_tfile(`${folder}/${title}`) ||
            (!/\.md$/i.test(title)
              ? this.tp.file.find_tfile(`${folder}/${title}.md`)
              : null);
          if (file) {
            const frontmatter =
              this.app.metadataCache.getFileCache(file)?.frontmatter;
            if (frontmatter) {
              note = { frontmatter };
            }
          }
        }
      } catch (e) {}

      return this.getSyncSettingByLevel(
        propertyKey,
        note,
        folder || this.currentSyncFolder || this.folder,
        fallbackValue,
      );
    }

    getNotionApiKeyForContext(note, folder) {
      const key = this.getSyncSettingByLevel(
        "apiKey",
        note,
        folder || this.currentSyncFolder || this.folder,
        this.nocodb.apiKey || "",
      );
      return String(key || "").trim()
        ? String(key || "")
        : this.nocodb.apiKey || "";
    }

    getNotionApiKeyForRecord(record) {
      const key = this.getSyncSettingForRecord(
        record,
        "apiKey",
        this.nocodb.apiKey || "",
      );
      return String(key || "").trim()
        ? String(key || "")
        : this.nocodb.apiKey || "";
    }

    shouldSyncContentToPageBlocks(record = null) {
      const key = this.iotoConfig.syncSettingProperties.syncContentToPageBlocks;
      if (record) {
        return this.getSyncSettingBooleanForRecord(record, key, false);
      }
      return this.getBooleanSyncSettingByLevel(
        key,
        this.activeNote,
        this.currentSyncFolder || this.folder,
        false,
      );
    }

    shouldPullContentFromPageBlocks(record = null) {
      const key =
        this.iotoConfig.syncSettingProperties.pullContentFromPageBlocks;
      if (record) {
        return this.getSyncSettingBooleanForRecord(record, key, false);
      }
      return this.getBooleanSyncSettingByLevel(
        key,
        this.activeNote,
        this.currentSyncFolder || this.folder,
        false,
      );
    }

    shouldKeepContentProperty(record = null) {
      const key = this.iotoConfig.syncSettingProperties.keepContentProperty;
      if (record) {
        return this.getSyncSettingBooleanForRecord(record, key, true);
      }
      return this.getBooleanSyncSettingByLevel(
        key,
        this.activeNote,
        this.currentSyncFolder || this.folder,
        true,
      );
    }

    getNotionBlocksFetchConcurrency() {
      const folder = this.currentSyncFolder || this.folder || "";
      const fallback =
        this.notionRequestScheduler?.maxConcurrency &&
        Number(this.notionRequestScheduler.maxConcurrency) >= 1
          ? Number(this.notionRequestScheduler.maxConcurrency)
          : 2;
      const value = this.getSyncSettingByLevel(
        "notionBlocksFetchConcurrency",
        this.activeNote,
        folder,
        fallback,
      );
      const num = Number(value);
      return Number.isFinite(num) && num >= 1
        ? Math.floor(num)
        : Math.floor(fallback);
    }

    async mapWithConcurrency(items = [], limit = 1, mapper) {
      const list = Array.isArray(items) ? items : [];
      const max = Number(limit) >= 1 ? Math.floor(Number(limit)) : 1;
      const results = new Array(list.length);
      let nextIndex = 0;

      const worker = async () => {
        while (true) {
          const i = nextIndex++;
          if (i >= list.length) break;
          results[i] = await mapper(list[i], i);
        }
      };

      const workerCount = Math.min(max, list.length || 0);
      const workers = [];
      for (let i = 0; i < workerCount; i++) {
        workers.push(worker());
      }
      await Promise.all(workers);
      return results;
    }

    async pullBlocksForRecords(records = [], apply) {
      const list = Array.isArray(records) ? records : [];
      if (!list.length) return list;

      const concurrency = this.getNotionBlocksFetchConcurrency();
      await this.mapWithConcurrency(list, concurrency, async (record) => {
        const pageId = record?.[this.recordIdName];
        if (!pageId) return record;
        const blocks = await this.retrieveAllBlocks(pageId);
        const md = this.blocksToMarkdown(blocks);
        await apply(record, md, pageId);
        return record;
      });

      return list;
    }

    toRichText(text = "") {
      const safeText = String(text ?? "");
      if (!safeText.trim()) {
        return [];
      }

      const chunks = [];
      const chunkSize = 1900;
      for (
        let i = 0;
        i < safeText.length && chunks.length < 100;
        i += chunkSize
      ) {
        chunks.push({
          type: "text",
          text: {
            content: safeText.slice(i, i + chunkSize),
          },
        });
      }
      return chunks;
    }

    markdownInlineToRichText(text = "") {
      return this.inlineRichText.markdownInlineToRichText(text);
    }

    textToRichTextBlocks(text = "") {
      const chunks = [];
      const safeText = String(text ?? "");
      const chunkSize = 1900;
      for (let i = 0; i < safeText.length; i += chunkSize) {
        chunks.push(safeText.slice(i, i + chunkSize));
      }
      return chunks.length ? chunks : [""];
    }

    normalizeDateISO(value) {
      return this.apiClient.normalizeDateISO(value);
    }

    buildNotionPropertyValue(type, value) {
      return this.apiClient.buildNotionPropertyValue(type, value);
    }

    mapFieldsToNotionProperties(fields, schema) {
      return this.apiClient.mapFieldsToNotionProperties(fields, schema);
    }

    getPageUrlFromId(pageId) {
      const root = (
        this.nocodb.recordUrlRoot || "https://www.notion.so/"
      ).replace(/\/$/, "");
      const raw = String(pageId || "").trim();
      if (!raw) return "";
      if (/^https?:\/\//i.test(raw)) {
        return raw;
      }
      const compact = raw.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
      if (compact.length === 32) {
        return `${root}/${compact}`;
      }
      return `${root}/${raw}`;
    }

    notionCompactIdToUuid(compactId) {
      return this.linkConverter.notionCompactIdToUuid(compactId);
    }

    extractNotionCompactIdFromUrl(url) {
      return this.linkConverter.extractNotionCompactIdFromUrl(url);
    }

    setRecordURL(dbURLProperty, note, record, updateFromDownload) {
      return {
        [dbURLProperty]: this.getPageUrlFromId(record?.[this.recordIdName]),
      };
    }

    async erasePageContent(pageId) {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      const requestConfig = this.createRequestConfig({
        url: `${cleanRoot}/pages/${pageId}`,
        method: "PATCH",
        data: { erase_content: true },
      });
      await this.requestWithRetry(requestConfig);
    }

    async appendBlockChildren(blockId, children = []) {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      let remaining = [...children];
      let appended = [];
      while (remaining.length) {
        const batch = remaining.slice(0, this.blockAppendBatchSize);
        remaining = remaining.slice(this.blockAppendBatchSize);
        const requestConfig = this.createRequestConfig({
          url: `${cleanRoot}/blocks/${blockId}/children`,
          method: "PATCH",
          data: { children: batch },
        });
        const response = await this.requestWithRetry(requestConfig);
        const results = Array.isArray(response?.json?.results)
          ? response.json.results
          : [];
        appended = appended.concat(results);
      }
      return appended;
    }

    async appendBlocksTree(blockId, blocks = []) {
      if (!blockId) return;
      const pending = [...(blocks || [])];
      const batch = [];

      const flushBatch = async () => {
        if (!batch.length) return;
        await this.appendBlockChildren(blockId, batch);
        batch.length = 0;
      };

      while (pending.length) {
        const b = pending.shift();
        if (!b) continue;

        const nestedChildren =
          b.__ioto_children ||
          b.children ||
          b.toggle?.children ||
          b.table?.children ||
          null;

        const needsTwoStepAppend =
          b.type === "toggle" ||
          b.type === "callout" ||
          b.type === "bulleted_list_item" ||
          b.type === "numbered_list_item" ||
          b.type === "to_do" ||
          b.type === "synced_block";

        if (nestedChildren && needsTwoStepAppend) {
          await flushBatch();
          const shallow = { ...b };
          delete shallow.__ioto_children;
          delete shallow.children;
          if (shallow.toggle?.children) {
            shallow.toggle = { ...shallow.toggle };
            delete shallow.toggle.children;
          }
          if (shallow.callout?.children) {
            shallow.callout = { ...shallow.callout };
            delete shallow.callout.children;
          }

          const results = await this.appendBlockChildren(blockId, [shallow]);
          const createdId = results?.[0]?.id || "";
          if (
            createdId &&
            Array.isArray(nestedChildren) &&
            nestedChildren.length
          ) {
            await this.appendBlocksTree(createdId, nestedChildren);
          }
          continue;
        }

        batch.push(b);
        if (batch.length >= this.blockAppendBatchSize) {
          await flushBatch();
        }
      }

      await flushBatch();
    }

    async retrieveBlockChildren(blockId, startCursor = null) {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      const params = [];
      params.push(`page_size=${this.blockRetrievePageSize}`);
      if (startCursor) {
        params.push(`start_cursor=${encodeURIComponent(startCursor)}`);
      }
      const url = `${cleanRoot}/blocks/${blockId}/children?${params.join("&")}`;
      const requestConfig = this.createRequestConfig({
        url,
        method: "GET",
      });
      const response = await this.requestWithRetry(requestConfig);
      return response.json || {};
    }

    async retrieveAllBlocks(blockId, depth = 0, options = {}) {
      const rootCall = depth === 0;
      if (rootCall) {
        this.beginStatusBarTask(
          "ioto-notion-blocks",
          this.getNotionStatusBarText(),
        );
      }
      try {
        let results = [];
        let cursor = null;
        let hasMore = true;

        const includeChildren = options.includeChildren ?? true;
        const maxDepth = Number.isFinite(options.maxDepth)
          ? options.maxDepth
          : this.maxBlockDepth;

        while (hasMore) {
          const data = await this.retrieveBlockChildren(blockId, cursor);
          const pageResults = data.results || [];
          results = results.concat(pageResults);
          hasMore = Boolean(data.has_more);
          cursor = data.next_cursor || null;
        }

        if (!includeChildren || depth >= maxDepth) {
          return results;
        }

        for (let i = 0; i < results.length; i++) {
          const b = results[i];
          if (b?.has_children) {
            const children = await this.retrieveAllBlocks(
              b.id,
              depth + 1,
              options,
            );
            results[i] = { ...b, __children: children };
          }
        }

        return results;
      } finally {
        if (rootCall) {
          this.endStatusBarTask("ioto-notion-blocks");
        }
      }
    }

    richTextToPlain(richText = []) {
      return this.markdownBlocks.richTextToPlain(richText);
    }

    escapeMarkdownText(text) {
      return this.markdownBlocks.escapeMarkdownText(text);
    }

    wrapMarkdown(text, wrapper) {
      return this.markdownBlocks.wrapMarkdown(text, wrapper);
    }

    richTextToMarkdown(richText = [], options = {}) {
      return this.markdownBlocks.richTextToMarkdown(richText, options);
    }

    escapeMarkdownTableCell(text) {
      return this.markdownBlocks.escapeMarkdownTableCell(text);
    }

    tableRowCellsToMarkdown(rowCells = [], mdOptions = {}) {
      return this.markdownBlocks.tableRowCellsToMarkdown(rowCells, mdOptions);
    }

    tableToMarkdown(tableBlock, mdOptions = {}) {
      return this.markdownBlocks.tableToMarkdown(tableBlock, mdOptions);
    }

    getMediaUrlFromFileObject(fileObj) {
      if (!fileObj || typeof fileObj !== "object") return "";
      if (fileObj.type === "external") {
        return fileObj.external?.url || "";
      }
      if (fileObj.type === "file") {
        return fileObj.file?.url || "";
      }
      return fileObj.url || "";
    }

    createOrderedListState() {
      return {
        counterByDepth: Object.create(null),
        lastTypeByDepth: Object.create(null),
      };
    }

    getListDepthFromIndent(indent) {
      const tabs = String(indent || "").match(/\t/g);
      return tabs ? tabs.length : 0;
    }

    resetOrderedListAtDepth(state, depth, type) {
      if (!state) return;
      state.counterByDepth[depth] = 0;
      state.lastTypeByDepth[depth] = type || null;
      const keys = Object.keys(state.counterByDepth);
      for (const k of keys) {
        const d = Number(k);
        if (Number.isFinite(d) && d > depth) {
          delete state.counterByDepth[d];
          delete state.lastTypeByDepth[d];
        }
      }
    }

    nextOrderedListNumber(state, depth) {
      if (!state) return 1;
      const prevType = state.lastTypeByDepth[depth] || null;
      const prev = Number(state.counterByDepth[depth] || 0);
      const next = prevType === "numbered_list_item" ? prev + 1 : 1;
      state.counterByDepth[depth] = next;
      state.lastTypeByDepth[depth] = "numbered_list_item";
      const keys = Object.keys(state.counterByDepth);
      for (const k of keys) {
        const d = Number(k);
        if (Number.isFinite(d) && d > depth) {
          delete state.counterByDepth[d];
          delete state.lastTypeByDepth[d];
        }
      }
      return next;
    }

    blockToMarkdown(block, indent = "", orderedListState = null) {
      return this.markdownBlocks.blockToMarkdown(
        block,
        indent,
        orderedListState,
      );
    }

    blocksToMarkdown(blocks = []) {
      return this.markdownBlocks.blocksToMarkdown(blocks);
    }

    blocksToPlainText(blocks = []) {
      return this.markdownBlocks.blocksToPlainText(blocks);
    }

    markdownToBlocks(markdown = "", options = {}) {
      const lines = String(markdown || "").split("\n");
      const blocks = [];

      let inCode = false;
      let codeLang = "";
      let codeLines = [];
      let inMath = false;
      let mathLines = [];
      let paragraphLines = [];
      const listStack = [];

      const toggleDepth = Number(options.toggleDepth) || 0;
      const maxToggleDepth = Number(options.maxToggleDepth) || 5;

      const parseDetailsBlockAt = (startIndex) => {
        if (toggleDepth >= maxToggleDepth) return null;
        const startLine = String(lines[startIndex] || "");
        if (!startLine.includes("<details")) return null;

        const collected = [];
        let i = startIndex;
        let foundEnd = false;
        while (i < lines.length) {
          const l = String(lines[i] || "");
          collected.push(l);
          if (l.includes("</details>")) {
            foundEnd = true;
            break;
          }
          i++;
        }
        if (!foundEnd) return null;

        const raw = collected.join("\n");
        const summaryMatch = raw.match(/<summary>([\s\S]*?)<\/summary>/i);
        const summary = summaryMatch ? summaryMatch[1].trim() : "";

        const afterSummary = raw.replace(/^[\s\S]*?<\/summary>/i, "");
        const innerRaw = afterSummary.replace(/<\/details>[\s\S]*$/i, "");
        const inner = innerRaw.replace(/^\s+/, "").replace(/\s+$/, "");

        const children = inner
          ? this.markdownToBlocks(inner, {
              toggleDepth: toggleDepth + 1,
              maxToggleDepth,
            })
          : [];

        return {
          block: {
            object: "block",
            type: "toggle",
            toggle: {
              rich_text: this.markdownInlineToRichText(summary),
            },
            __ioto_children: children,
          },
          nextIndex: i + 1,
        };
      };

      const parseSyncedBlockAt = (startIndex) => {
        const first = String(lines[startIndex] || "");
        const startMatch = first.match(
          /^\s*<!--\s*IOTO:SYNCED_BLOCK\b([\s\S]*?)-->\s*$/,
        );
        if (!startMatch) return null;

        const attrText = String(startMatch[1] || "");
        const getAttr = (key) => {
          const re = new RegExp(`\\b${key}=([^\\s]+)`, "i");
          const match = attrText.match(re);
          return match ? String(match[1] || "").trim() : "";
        };
        const sourceId = getAttr("source");
        const collected = [];
        let i = startIndex + 1;
        let foundEnd = false;
        while (i < lines.length) {
          const l = String(lines[i] || "");
          if (/^\s*<!--\s*\/IOTO:SYNCED_BLOCK\s*-->\s*$/.test(l)) {
            foundEnd = true;
            break;
          }
          collected.push(l);
          i++;
        }
        if (!foundEnd) return null;

        const inner = collected.join("\n");
        const children = inner
          ? this.markdownToBlocks(inner, {
              ...options,
              toggleDepth,
              maxToggleDepth,
            })
          : [];

        return {
          block: {
            object: "block",
            type: "synced_block",
            synced_block: {
              synced_from: sourceId ? { block_id: sourceId } : null,
            },
            __ioto_children: children,
          },
          nextIndex: i + 1,
        };
      };

      const parseCalloutBlockAt = (startIndex) => {
        const first = String(lines[startIndex] || "");
        const match = first.match(/^\s*>\s*\[!([^\]]+)\]\s*(.*)$/);
        if (!match) return null;

        const rawType = String(match[1] || "").trim();
        const type = rawType.replace(/[+-]$/, "").toLowerCase();
        let title = String(match[2] || "").trim();

        const iconMap = {
          note: "📝",
          info: "ℹ️",
          tip: "💡",
          warning: "⚠️",
          danger: "⛔",
          error: "⛔",
          failure: "⛔",
          success: "✅",
          question: "❓",
        };

        let emojiFromTitle = "";
        try {
          const emojiMatch = title.match(
            /^\s*(\p{Extended_Pictographic}\uFE0F?)\s+(.*)$/u,
          );
          if (emojiMatch) {
            emojiFromTitle = emojiMatch[1];
            title = (emojiMatch[2] || "").trim();
          }
        } catch (e) {}

        const emoji = emojiFromTitle || iconMap[type] || "💡";

        const collected = [];
        let i = startIndex + 1;
        while (i < lines.length) {
          const l = String(lines[i] || "");
          if (/^\s*>/.test(l)) {
            collected.push(l.replace(/^\s*>\s?/, ""));
            i++;
            continue;
          }
          break;
        }

        const inner = collected
          .join("\n")
          .replace(/^\s+/, "")
          .replace(/\s+$/, "");
        const children = inner
          ? this.markdownToBlocks(inner, {
              ...options,
              toggleDepth,
              maxToggleDepth,
            })
          : [];

        return {
          block: {
            object: "block",
            type: "callout",
            callout: {
              rich_text: this.markdownInlineToRichText(title || type || "note"),
              icon: { type: "emoji", emoji },
              color: "default",
            },
            __ioto_children: children,
          },
          nextIndex: i,
        };
      };

      const parseQuoteBlockAt = (startIndex) => {
        const first = String(lines[startIndex] || "");
        if (!/^\s*>/.test(first)) return null;
        if (/^\s*>\s*\[!([^\]]+)\]/.test(first)) return null;

        const collected = [];
        let i = startIndex;
        while (i < lines.length) {
          const l = String(lines[i] || "");
          if (!/^\s*>/.test(l)) break;
          if (/^\s*>\s*\[!([^\]]+)\]/.test(l)) break;
          collected.push(l.replace(/^\s*>\s?/, ""));
          i++;
        }

        if (!collected.length) return null;
        const text = collected.join("\n").replace(/\s+$/, "");

        return {
          block: {
            object: "block",
            type: "quote",
            quote: {
              rich_text: this.markdownInlineToRichText(text),
              color: "default",
            },
          },
          nextIndex: i,
        };
      };

      const splitMarkdownTableRow = (line) => {
        const raw = String(line || "").trim();
        if (!raw.includes("|")) return null;

        const withoutEdges = raw.replace(/^\|/, "").replace(/\|$/, "");
        const cells = [];
        let current = "";
        let escape = false;
        for (let i = 0; i < withoutEdges.length; i++) {
          const ch = withoutEdges[i];
          if (escape) {
            current += ch;
            escape = false;
            continue;
          }
          if (ch === "\\") {
            escape = true;
            continue;
          }
          if (ch === "|") {
            cells.push(current.trim());
            current = "";
            continue;
          }
          current += ch;
        }
        cells.push(current.trim());
        if (cells.length < 2) return null;
        return cells;
      };

      const isMarkdownTableSeparator = (line) => {
        const raw = String(line || "").trim();
        if (!raw.includes("|")) return false;
        const withoutEdges = raw.replace(/^\|/, "").replace(/\|$/, "");
        const parts = withoutEdges.split("|").map((p) => p.trim());
        if (parts.length < 2) return false;
        return parts.every((p) => /^:?-{3,}:?$/.test(p));
      };

      const parseMarkdownTableAt = (startIndex) => {
        if (startIndex + 1 >= lines.length) return null;
        const headerCells = splitMarkdownTableRow(lines[startIndex]);
        if (!headerCells) return null;
        if (!isMarkdownTableSeparator(lines[startIndex + 1])) return null;

        const rows = [headerCells];
        let i = startIndex + 2;
        while (i < lines.length) {
          const row = splitMarkdownTableRow(lines[i]);
          if (!row) break;
          rows.push(row);
          i++;
        }

        const tableWidth = Math.max(...rows.map((r) => r.length));
        const maxRowsPerTable = 40;
        const tables = [];

        for (let offset = 0; offset < rows.length; offset += maxRowsPerTable) {
          const chunk = rows.slice(offset, offset + maxRowsPerTable);
          const rowChildren = chunk.map((r) => {
            const cells = r.slice(0, tableWidth);
            while (cells.length < tableWidth) cells.push("");
            return {
              object: "block",
              type: "table_row",
              table_row: {
                cells: cells.map((c) =>
                  this.markdownInlineToRichText(String(c || "")),
                ),
              },
            };
          });

          tables.push({
            object: "block",
            type: "table",
            table: {
              table_width: tableWidth,
              has_column_header: offset === 0,
              has_row_header: false,
              children: rowChildren,
            },
          });
        }

        return { tables, nextIndex: i };
      };

      const parseImageLine = (line) => {
        const match = String(line || "").match(/^\s*!\[([^\]]*)\]\((.+)\)\s*$/);
        if (!match) return null;

        const alt = (match[1] || "").trim();
        const inside = String(match[2] || "").trim();
        if (!inside) return null;

        const angleMatch = inside.match(
          /^<([^>]+)>\s*(?:"[^"]*"|'[^']*')?\s*$/,
        );
        let url = angleMatch ? angleMatch[1] : inside.split(/\s+/)[0];
        url = String(url || "")
          .replace(/^<|>$/g, "")
          .trim();
        if (!/^https?:\/\//i.test(url)) return null;
        url = url.slice(0, 2000);

        const image = {
          type: "external",
          external: { url },
        };
        if (alt) {
          image.caption = this.toRichText(alt);
        }

        return {
          type: "image",
          image,
        };
      };

      const parseLinkToPageLine = (line) => {
        const match = String(line || "").match(/^\s*\[([^\]]*)\]\((.+)\)\s*$/);
        if (!match) return null;

        const inside = String(match[2] || "").trim();
        if (!inside) return null;

        const angleMatch = inside.match(
          /^<([^>]+)>\s*(?:"[^"]*"|'[^']*')?\s*$/,
        );
        let url = angleMatch ? angleMatch[1] : inside.split(/\s+/)[0];
        url = String(url || "")
          .replace(/^<|>$/g, "")
          .trim();

        const compactId = this.extractNotionCompactIdFromUrl(url);
        if (!compactId) return null;
        const uuid = this.notionCompactIdToUuid(compactId);
        if (!uuid) return null;

        return {
          type: "link_to_page",
          link_to_page: {
            type: "page_id",
            page_id: uuid,
          },
        };
      };

      const flushCode = () => {
        if (!codeLines.length) return;
        const text = codeLines.join("\n");
        const chunks = this.textToRichTextBlocks(text);
        chunks.forEach((chunk) => {
          blocks.push({
            type: "code",
            code: {
              rich_text: this.toRichText(chunk),
              language: codeLang || "plain text",
            },
          });
        });
        codeLines = [];
      };

      const flushMath = () => {
        const expr = mathLines.join("\n").trim();
        if (!expr) {
          mathLines = [];
          return;
        }
        blocks.push({
          type: "equation",
          equation: { expression: expr },
        });
        mathLines = [];
      };

      const pushParagraph = (text) => {
        const safe = String(text || "");
        if (!safe.trim()) {
          blocks.push({
            type: "paragraph",
            paragraph: { rich_text: [] },
          });
          return;
        }
        const rich = this.markdownInlineToRichText(safe);
        if (!rich.length) {
          blocks.push({
            type: "paragraph",
            paragraph: { rich_text: [] },
          });
          return;
        }
        const maxItems = 100;
        for (let i = 0; i < rich.length; i += maxItems) {
          blocks.push({
            type: "paragraph",
            paragraph: { rich_text: rich.slice(i, i + maxItems) },
          });
        }
      };

      const flushParagraph = () => {
        if (!paragraphLines.length) return;
        pushParagraph(paragraphLines.join("\n"));
        paragraphLines = [];
      };

      const clearListStack = () => {
        listStack.length = 0;
      };

      const addChildToBlock = (parent, child) => {
        if (!parent.__ioto_children) parent.__ioto_children = [];
        parent.__ioto_children.push(child);
      };

      const computeIndent = (line) => {
        const raw = String(line || "");
        let count = 0;
        for (let i = 0; i < raw.length; i++) {
          const ch = raw[i];
          if (ch === " ") {
            count += 1;
            continue;
          }
          if (ch === "\t") {
            count += 4;
            continue;
          }
          break;
        }
        return count;
      };

      const parseListItemLine = (line) => {
        const s = String(line || "");
        const todo = s.match(/^(\s*)[-*+]\s+\[(\s|x|X)\]\s+(.*)$/);
        if (todo) {
          return {
            kind: "to_do",
            indent: computeIndent(todo[1] || ""),
            checked: String(todo[2] || "").toLowerCase() === "x",
            text: todo[3] || "",
          };
        }

        const bullet = s.match(/^(\s*)[-*+]\s+(.*)$/);
        if (bullet) {
          return {
            kind: "bulleted_list_item",
            indent: computeIndent(bullet[1] || ""),
            text: bullet[2] || "",
          };
        }

        const num = s.match(/^(\s*)\d+\.\s+(.*)$/);
        if (num) {
          return {
            kind: "numbered_list_item",
            indent: computeIndent(num[1] || ""),
            text: num[2] || "",
          };
        }

        return null;
      };

      const appendListItem = (block, indent) => {
        while (
          listStack.length &&
          indent <= listStack[listStack.length - 1].indent
        ) {
          listStack.pop();
        }

        const parentEntry = listStack.length
          ? listStack[listStack.length - 1]
          : null;
        if (parentEntry?.block) {
          addChildToBlock(parentEntry.block, block);
        } else {
          blocks.push(block);
        }

        listStack.push({ indent, block });
      };

      for (let idx = 0; idx < lines.length; idx++) {
        const line = String(lines[idx]);
        const fenceMatch = line.match(/^\s*```(.*)\s*$/);
        if (fenceMatch) {
          if (!inCode) {
            flushParagraph();
            clearListStack();
            inCode = true;
            codeLang = (fenceMatch[1] || "").trim();
            codeLines = [];
          } else {
            inCode = false;
            flushCode();
            codeLang = "";
          }
          continue;
        }

        if (inCode) {
          codeLines.push(line);
          continue;
        }

        const trimmed = line.trim();
        if (/^\$\$/.test(trimmed)) {
          const isExactFence = trimmed === "$$";
          const isOneLineClosed =
            trimmed.length > 4 &&
            trimmed.startsWith("$$") &&
            trimmed.endsWith("$$");

          if (!inMath && isOneLineClosed) {
            flushParagraph();
            clearListStack();
            const inner = trimmed.slice(2, -2).trim();
            if (inner) {
              blocks.push({
                type: "equation",
                equation: { expression: inner },
              });
            }
            continue;
          }

          if (!inMath) {
            flushParagraph();
            clearListStack();
            inMath = true;
            mathLines = [];
            if (!isExactFence) {
              const after = trimmed.replace(/^\$\$\s*/, "");
              if (after) {
                mathLines.push(after);
              }
            }
            continue;
          }

          if (inMath) {
            if (isExactFence) {
              inMath = false;
              flushMath();
              continue;
            }

            if (trimmed.endsWith("$$")) {
              const before = trimmed.slice(0, -2).trim();
              if (before) {
                mathLines.push(before);
              }
              inMath = false;
              flushMath();
              continue;
            }
          }
        }

        if (inMath) {
          if (trimmed.endsWith("$$")) {
            const before = trimmed.slice(0, -2);
            if (before) {
              mathLines.push(before);
            }
            inMath = false;
            flushMath();
            continue;
          }
          mathLines.push(line);
          continue;
        }

        if (!line.trim()) {
          flushParagraph();
          continue;
        }

        const syncedParsed = parseSyncedBlockAt(idx);
        if (syncedParsed) {
          flushParagraph();
          clearListStack();
          blocks.push(syncedParsed.block);
          idx = syncedParsed.nextIndex - 1;
          continue;
        }

        const calloutParsed = parseCalloutBlockAt(idx);
        if (calloutParsed) {
          flushParagraph();
          clearListStack();
          blocks.push(calloutParsed.block);
          idx = calloutParsed.nextIndex - 1;
          continue;
        }

        const quoteParsed = parseQuoteBlockAt(idx);
        if (quoteParsed) {
          flushParagraph();
          clearListStack();
          blocks.push(quoteParsed.block);
          idx = quoteParsed.nextIndex - 1;
          continue;
        }

        const detailsParsed = parseDetailsBlockAt(idx);
        if (detailsParsed) {
          flushParagraph();
          clearListStack();
          blocks.push(detailsParsed.block);
          idx = detailsParsed.nextIndex - 1;
          continue;
        }

        const tableParsed = parseMarkdownTableAt(idx);
        if (tableParsed) {
          flushParagraph();
          clearListStack();
          tableParsed.tables.forEach((t) => blocks.push(t));
          idx = tableParsed.nextIndex - 1;
          continue;
        }

        const imageBlock = parseImageLine(line);
        if (imageBlock) {
          flushParagraph();
          clearListStack();
          blocks.push(imageBlock);
          continue;
        }

        const linkToPageBlock = parseLinkToPageLine(line);
        if (linkToPageBlock) {
          flushParagraph();
          clearListStack();
          blocks.push(linkToPageBlock);
          continue;
        }

        const hr = line.match(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/);
        if (hr) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "divider",
            divider: {},
          });
          continue;
        }

        const h1 = line.match(/^#\s+(.*)$/);
        if (h1) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_1",
            heading_1: { rich_text: this.markdownInlineToRichText(h1[1]) },
          });
          continue;
        }
        const h2 = line.match(/^##\s+(.*)$/);
        if (h2) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_2",
            heading_2: { rich_text: this.markdownInlineToRichText(h2[1]) },
          });
          continue;
        }
        const h3 = line.match(/^###\s+(.*)$/);
        if (h3) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_3",
            heading_3: { rich_text: this.markdownInlineToRichText(h3[1]) },
          });
          continue;
        }
        const h4 = line.match(/^####\s+(.*)$/);
        if (h4) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_4",
            heading_4: { rich_text: this.markdownInlineToRichText(h4[1]) },
          });
          continue;
        }

        const listItem = parseListItemLine(line);
        if (listItem) {
          flushParagraph();
          const kind = listItem.kind;
          const text = String(listItem.text || "");
          if (kind === "to_do") {
            appendListItem(
              {
                type: "to_do",
                to_do: {
                  rich_text: this.markdownInlineToRichText(text),
                  checked: Boolean(listItem.checked),
                },
              },
              listItem.indent,
            );
          } else if (kind === "bulleted_list_item") {
            appendListItem(
              {
                type: "bulleted_list_item",
                bulleted_list_item: {
                  rich_text: this.markdownInlineToRichText(text),
                },
              },
              listItem.indent,
            );
          } else if (kind === "numbered_list_item") {
            appendListItem(
              {
                type: "numbered_list_item",
                numbered_list_item: {
                  rich_text: this.markdownInlineToRichText(text),
                },
              },
              listItem.indent,
            );
          }
          continue;
        }

        if (listStack.length && /^\s+/.test(line)) {
          flushParagraph();
          const text = String(line || "").trim();
          if (text) {
            addChildToBlock(listStack[listStack.length - 1].block, {
              type: "paragraph",
              paragraph: { rich_text: this.markdownInlineToRichText(text) },
            });
          }
          continue;
        }

        if (listStack.length && !/^\s+/.test(line)) {
          clearListStack();
        }

        paragraphLines.push(line);
      }

      if (inCode) {
        flushCode();
      }

      if (inMath) {
        flushMath();
      }

      flushParagraph();

      return blocks.filter(Boolean);
    }

    async syncPageBlocks({ pageId, markdown, erase = false } = {}) {
      if (!pageId) return;
      this.beginStatusBarTask(
        "ioto-notion-blocks",
        this.getNotionStatusBarText(),
      );
      try {
        if (erase) {
          await this.erasePageContent(pageId);
        }
        const blocks = this.markdownToBlocks(markdown || "");
        if (!blocks.length) return;
        await this.appendBlocksTree(pageId, blocks);
      } finally {
        this.endStatusBarTask("ioto-notion-blocks");
      }
    }

    async updateNoteInVault({
      file,
      record,
      firstUpdate = false,
      updateFromDownload = false,
      uploadTags = true,
      uploadAliases = true,
    } = {}) {
      const shouldPull = this.shouldPullContentFromPageBlocks(record);
      if (!shouldPull) {
        return await super.updateNoteInVault({
          file,
          record,
          firstUpdate,
          updateFromDownload,
          uploadTags,
          uploadAliases,
        });
      }

      const note = new (tp.user.IOTOObNoteMaker())(
        this.tp,
        this.app,
        file,
        this.nocodb.noteSettings,
        this.recordFieldsNames,
      );

      if (!updateFromDownload) {
        await note.prepareNoteContent();
        const recordCopy = {
          ...record,
          fields: {
            ...(record.fields || {}),
            [this.recordFieldsNames.content]: note.content,
            [this.recordFieldsNames.extraContent]: "",
            [this.recordFieldsNames.fullContent]: "",
            [this.recordFieldsNames.extraFullContent]: "",
          },
        };
        return await super.updateNoteInVault({
          file,
          record: recordCopy,
          firstUpdate,
          updateFromDownload,
          uploadTags,
          uploadAliases,
        });
      }

      const includeChildren = this.getSyncSettingByLevel(
        "notionIncludeChildrenBlocks",
        note,
        note.folder,
        true,
      );
      const maxDepth = this.getSyncSettingByLevel(
        "notionMaxBlockDepth",
        note,
        note.folder,
        this.maxBlockDepth,
      );
      const outputMode = this.getSyncSettingByLevel(
        "notionBlocksOutputMode",
        note,
        note.folder,
        "markdown",
      );

      const preserveStyles = this.getSyncSettingByLevel(
        "notionPreserveRichTextStyles",
        note,
        note.folder,
        true,
      );
      const convertLinks = this.getSyncSettingByLevel(
        "notionConvertLinks",
        note,
        note.folder,
        true,
      );
      const underlineMode = this.getSyncSettingByLevel(
        "notionUnderlineMode",
        note,
        note.folder,
        "html",
      );
      const embedImages = this.getSyncSettingByLevel(
        "notionEmbedImages",
        note,
        note.folder,
        true,
      );

      const pageId = record?.[this.recordIdName];
      if (!pageId) {
        return await super.updateNoteInVault({
          file,
          record,
          firstUpdate,
          updateFromDownload,
          uploadTags,
          uploadAliases,
        });
      }

      try {
        this.currentNotionMarkdownOptions = {
          preserveStyles: Boolean(preserveStyles),
          convertLinks: Boolean(convertLinks),
          underlineMode: String(underlineMode || "html"),
          embedImages: Boolean(embedImages),
        };
        this.markdownBlocks.currentNotionMarkdownOptions =
          this.currentNotionMarkdownOptions;

        const blocks = await this.retrieveAllBlocks(pageId, 0, {
          includeChildren,
          maxDepth: Number(maxDepth) || this.maxBlockDepth,
        });

        const md =
          String(outputMode).toLowerCase() === "plain"
            ? this.blocksToPlainText(blocks)
            : this.blocksToMarkdown(blocks);

        const recordCopy = {
          ...record,
          fields: {
            ...(record.fields || {}),
            [this.recordFieldsNames.content]: md,
            [this.recordFieldsNames.extraContent]: "",
            [this.recordFieldsNames.fullContent]: "",
            [this.recordFieldsNames.extraFullContent]: "",
            notionURL: this.getPageUrlFromId(pageId),
          },
        };

        return await super.updateNoteInVault({
          file,
          record: recordCopy,
          firstUpdate,
          updateFromDownload,
          uploadTags,
          uploadAliases,
        });
      } catch (error) {
        return await super.updateNoteInVault({
          file,
          record,
          firstUpdate,
          updateFromDownload,
          uploadTags,
          uploadAliases,
        });
      } finally {
        this.currentNotionMarkdownOptions = null;
        this.markdownBlocks.currentNotionMarkdownOptions = null;
      }
    }

    parseNotionFormulaValue(formulaValue) {
      if (!formulaValue || typeof formulaValue !== "object") return "";
      switch (formulaValue.type) {
        case "string":
          return formulaValue.string || "";
        case "number":
          return formulaValue.number;
        case "boolean":
          return Boolean(formulaValue.boolean);
        case "date":
          return formulaValue.date?.start || "";
        default:
          return "";
      }
    }

    parseNotionPropertyValue(propertyValue) {
      if (!propertyValue || typeof propertyValue !== "object") return "";
      const type = propertyValue.type;
      switch (type) {
        case "title":
          return (propertyValue.title || []).map((v) => v.plain_text).join("");
        case "rich_text":
          return (propertyValue.rich_text || [])
            .map((v) => v.plain_text)
            .join("");
        case "multi_select":
          return (propertyValue.multi_select || []).map((v) => v.name);
        case "select":
          return propertyValue.select?.name || "";
        case "status":
          return propertyValue.status?.name || "";
        case "date":
          return propertyValue.date?.start || "";
        case "checkbox":
          return Boolean(propertyValue.checkbox);
        case "number":
          return propertyValue.number;
        case "url":
          return propertyValue.url || "";
        case "email":
          return propertyValue.email || "";
        case "phone_number":
          return propertyValue.phone_number || "";
        case "formula":
          return this.parseNotionFormulaValue(propertyValue.formula);
        default:
          return "";
      }
    }

    formatRecord(page) {
      if (!page || !page.properties) return null;
      const fields = {};
      for (const [name, value] of Object.entries(page.properties)) {
        fields[name] = this.parseNotionPropertyValue(value);
      }
      return {
        [this.recordIdName]: page.id,
        fields,
      };
    }

    reformatRecords(records) {
      return (records || [])
        .map((record) => this.formatRecord(record))
        .filter(Boolean);
    }

    createPathFilter(schema, pathField, folder, includesSubfolder = false) {
      if (!folder || !schema[pathField]) return null;

      const propertyType = schema[pathField].type;
      const operator = includesSubfolder ? "starts_with" : "equals";

      if (propertyType === "rich_text" || propertyType === "title") {
        return {
          property: pathField,
          [propertyType]: {
            [operator]: folder,
          },
        };
      }

      return null;
    }

    filterRecordsByPath(records, pathField, folder, includesSubfolder = false) {
      if (!folder) return records;
      return records.filter((record) => {
        const pathValue = String(record?.fields?.[pathField] || "");
        return includesSubfolder
          ? pathValue.startsWith(folder)
          : pathValue === folder;
      });
    }

    async queryPagesFromDataSource({
      dataSourceID,
      filter = null,
      pageSize = this.defaultPageSize,
    } = {}) {
      let records = [];
      let hasMore = true;
      let nextCursor = null;

      while (hasMore) {
        const body = {
          page_size: pageSize,
          result_type: "page",
          in_trash: false,
        };
        if (filter) {
          body.filter = filter;
        }
        if (nextCursor) {
          body.start_cursor = nextCursor;
        }

        const requestConfig = this.createRequestConfig({
          url: this.makeDataSourceQueryUrl(dataSourceID),
          method: "POST",
          data: body,
        });

        const response = await this.requestWithRetry(requestConfig);
        const data = response.json || {};
        records = records.concat(
          (data.results || []).filter((item) => item.object === "page"),
        );
        hasMore = Boolean(data.has_more);
        nextCursor = data.next_cursor || null;
      }

      return this.reformatRecords(records);
    }

    async retriveRecordInNocoDB(rid, returnRaw = false) {
      try {
        const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
        const requestConfig = this.createRequestConfig({
          url: `${cleanRoot}/pages/${rid}`,
          method: "GET",
        });
        const response = await this.requestWithRetry(requestConfig);
        if (returnRaw) return response;
        if (response.json?.in_trash || response.json?.is_archived) {
          return null;
        }
        const formatted = this.formatRecord(response.json);
        if (!formatted) return null;
        if (this.shouldPullContentFromPageBlocks()) {
          const blocks = await this.retrieveAllBlocks(rid);
          const md = this.blocksToMarkdown(blocks);
          formatted.fields[this.recordFieldsNames.content] = md;
          formatted.fields[this.recordFieldsNames.extraContent] = "";
          formatted.fields[this.recordFieldsNames.fullContent] = "";
          formatted.fields[this.recordFieldsNames.extraFullContent] = "";
        }
        formatted.fields["notionURL"] = this.getPageUrlFromId(rid);
        return formatted;
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordRetrieveError"));
        return null;
      }
    }

    async checkRecordInNocoDB(rid) {
      try {
        const response = await this.retriveRecordInNocoDB(rid, true);
        return (
          response.status === 200 &&
          response.json?.id &&
          !response.json?.in_trash &&
          !response.json?.is_archived
        );
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    async retriveRecordsInNocoDB(
      folder = "",
      includesSubfolder = false,
      fields = "",
    ) {
      const pathField = this.recordFieldsNames.path;
      const dataSourceID = this.getDataSourceIDFromApiUrl();
      const schema = await this.getDataSourceSchema(dataSourceID);
      const filter = this.createPathFilter(
        schema,
        pathField,
        folder,
        includesSubfolder,
      );

      let records = await this.queryPagesFromDataSource({
        dataSourceID,
        filter,
      });

      if (folder) {
        records = this.filterRecordsByPath(
          records,
          pathField,
          folder,
          includesSubfolder,
        );
      }

      if (this.shouldPullContentFromPageBlocks()) {
        await this.pullBlocksForRecords(records, async (record, md, pageId) => {
          record.fields[this.recordFieldsNames.content] = md;
          record.fields[this.recordFieldsNames.extraContent] = "";
          record.fields[this.recordFieldsNames.fullContent] = "";
          record.fields[this.recordFieldsNames.extraFullContent] = "";
          record.fields["notionURL"] = this.getPageUrlFromId(pageId);
        });
      } else {
        records = records.map((r) => {
          const pageId = r?.[this.recordIdName];
          if (pageId) {
            r.fields["notionURL"] = this.getPageUrlFromId(pageId);
          }
          return r;
        });
      }

      return records;
    }

    async fetchRecordsFromSource(sourceTable) {
      const dateChoice = await this.getDateChoice();
      if (!dateChoice.choice) {
        return [];
      }

      const dataSourceID =
        sourceTable.dataSourceID ||
        sourceTable.tableID ||
        this.nocodb.defaultTableID;

      if (!dataSourceID) {
        this.showNotice(ml.t("NoAvailableTables"), ml.t("RecordRetrieveError"));
        return [];
      }

      const records = await this.queryPagesFromDataSource({
        dataSourceID,
      });

      if (this.shouldPullContentFromPageBlocks()) {
        await this.pullBlocksForRecords(records, async (record, md, pageId) => {
          record.fields[this.fetchContentFrom] = md;
          record.fields[this.recordFieldsNames.content] = md;
          record.fields["notionURL"] = this.getPageUrlFromId(pageId);
        });
      }

      if (
        records.length > 0 &&
        records[0].fields &&
        records[0].fields.hasOwnProperty(this.updatedTime)
      ) {
        return this.filterRecordsByDate(records, dateChoice);
      }

      return records;
    }

    async createRecordsInNocoDB(data, updateNotesInOB = true) {
      if (!data?.records?.length) return false;

      const dataSourceID = this.getDataSourceIDFromApiUrl();
      const schema = await this.getDataSourceSchema(dataSourceID);
      const createdRecords = [];

      for (const record of data.records) {
        const markdown = this.getMarkdownFromRecordFields(record.fields);
        const keepContentProperty = this.shouldKeepContentProperty(record);
        const fieldsForProps = { ...(record.fields || {}) };
        if (!keepContentProperty) {
          this.getContentFieldsKeys().forEach((k) => {
            if (k in fieldsForProps) {
              delete fieldsForProps[k];
            }
          });
        }

        const properties = this.mapFieldsToNotionProperties(
          fieldsForProps,
          schema,
        );
        const requestConfig = this.createRequestConfig({
          url: this.nocodb.apiUrlRoot.replace(/\/$/, "") + "/pages",
          method: "POST",
          apiKey: this.getNotionApiKeyForRecord(record),
          data: {
            parent: {
              type: "data_source_id",
              data_source_id: dataSourceID,
            },
            properties,
          },
        });

        try {
          const response = await this.requestWithRetry(requestConfig);
          if (response.status >= 200 && response.status < 300) {
            const formatted = this.formatRecord(response.json);
            if (formatted) {
              const pageId =
                formatted?.[this.recordIdName] || response.json?.id;
              if (pageId && this.shouldSyncContentToPageBlocks(record)) {
                const prevSourcePath = this.currentObsidianSourceFilePath || "";
                try {
                  const folder = String(
                    record?.fields?.[this.recordFieldsNames.path] || "",
                  );
                  const title = String(
                    record?.fields?.[this.recordFieldsNames.title] || "",
                  );
                  let sourceFile = null;
                  if (folder && title) {
                    sourceFile =
                      this.tp.file.find_tfile(`${folder}/${title}`) ||
                      (!/\.md$/i.test(title)
                        ? this.tp.file.find_tfile(`${folder}/${title}.md`)
                        : null);
                  }
                  this.currentObsidianSourceFilePath = sourceFile?.path || "";
                  await this.syncPageBlocks({
                    pageId,
                    markdown,
                    erase: false,
                  });
                } finally {
                  this.currentObsidianSourceFilePath = prevSourcePath;
                }
              }
              formatted.fields["notionURL"] = this.getPageUrlFromId(pageId);
              createdRecords.push(formatted);
            }
          }
        } catch (error) {
          this.showNotice(error.message, ml.t("RecordCreateError"));
        }
      }

      if (updateNotesInOB && createdRecords.length) {
        await this.updateNotesFromRecords(createdRecords, true);
      }

      return createdRecords.length > 0;
    }

    async updateRecordsInNocoDB(data) {
      if (!data?.records?.length) return false;

      const dataSourceID = this.getDataSourceIDFromApiUrl();
      const schema = await this.getDataSourceSchema(dataSourceID);
      const updatedRecords = [];

      for (const record of data.records) {
        const recordID = record[this.recordIdName] || record.id;
        if (!recordID) continue;

        const markdown = this.getMarkdownFromRecordFields(record.fields);
        const keepContentProperty = this.shouldKeepContentProperty(record);
        const fieldsForProps = { ...(record.fields || {}) };
        if (!keepContentProperty) {
          this.getContentFieldsKeys().forEach((k) => {
            if (k in fieldsForProps) {
              delete fieldsForProps[k];
            }
          });
        }

        const properties = this.mapFieldsToNotionProperties(
          fieldsForProps,
          schema,
        );
        const requestConfig = this.createRequestConfig({
          url: this.nocodb.apiUrlRoot.replace(/\/$/, "") + `/pages/${recordID}`,
          method: "PATCH",
          apiKey: this.getNotionApiKeyForRecord(record),
          data: { properties },
        });

        try {
          const response = await this.requestWithRetry(requestConfig);
          if (response.status >= 200 && response.status < 300) {
            const formatted = this.formatRecord(response.json);
            if (formatted) {
              if (this.shouldSyncContentToPageBlocks(record)) {
                const prevSourcePath = this.currentObsidianSourceFilePath || "";
                try {
                  const folder = String(
                    record?.fields?.[this.recordFieldsNames.path] || "",
                  );
                  const title = String(
                    record?.fields?.[this.recordFieldsNames.title] || "",
                  );
                  let sourceFile = null;
                  if (folder && title) {
                    sourceFile =
                      this.tp.file.find_tfile(`${folder}/${title}`) ||
                      (!/\.md$/i.test(title)
                        ? this.tp.file.find_tfile(`${folder}/${title}.md`)
                        : null);
                  }
                  this.currentObsidianSourceFilePath = sourceFile?.path || "";
                  await this.syncPageBlocks({
                    pageId: recordID,
                    markdown,
                    erase: true,
                  });
                } finally {
                  this.currentObsidianSourceFilePath = prevSourcePath;
                }
              }
              formatted.fields["notionURL"] = this.getPageUrlFromId(recordID);
              updatedRecords.push(formatted);
            }
          }
        } catch (error) {
          this.showNotice(error.message, ml.t("RecordUpdateError"));
        }
      }

      if (updatedRecords.length) {
        await this.updateNotesFromRecords(updatedRecords);
      }

      return updatedRecords.length > 0;
    }

    async deleteRecordsInNocoDB(recordID) {
      if (!recordID) return false;
      try {
        const requestConfig = this.createRequestConfig({
          url: this.nocodb.apiUrlRoot.replace(/\/$/, "") + `/pages/${recordID}`,
          method: "PATCH",
          data: { in_trash: true },
        });
        const response = await this.requestWithRetry(requestConfig);
        if (response.status >= 200 && response.status < 300) {
          this.showNotice(ml.t("RecordDeleteSuccess"));
          return true;
        }
        return false;
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordDeleteError"));
        return false;
      }
    }
  };
}

module.exports = IOTONotionSyncer;
