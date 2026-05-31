function IOTONotionLinkConverter(tp) {
  return class NotionLinkConverter {
    constructor(syncer) {
      this.syncer = syncer;
      this.notionToObLinkIndexBuilt = false;
      this.notionPageIdToObLinkTarget = new Map();
    }

    shouldConvertNotionLinksToObsidian() {
      return this.syncer.getSyncSettingByLevel(
        "notionConvertLinksToObsidian",
        this.syncer.activeNote,
        this.syncer.currentSyncFolder || this.syncer.folder,
        true,
      );
    }

    shouldConvertObsidianLinksToNotion() {
      return this.syncer.getSyncSettingByLevel(
        "notionConvertObsidianLinksToNotion",
        this.syncer.activeNote,
        this.syncer.currentSyncFolder || this.syncer.folder,
        true,
      );
    }

    notionCompactIdToUuid(compactId) {
      const clean = String(compactId || "")
        .replace(/[^0-9a-fA-F]/g, "")
        .toLowerCase();
      if (clean.length !== 32) return "";
      return (
        clean.slice(0, 8) +
        "-" +
        clean.slice(8, 12) +
        "-" +
        clean.slice(12, 16) +
        "-" +
        clean.slice(16, 20) +
        "-" +
        clean.slice(20)
      );
    }

    normalizeNotionPageIdToUuid(id) {
      const raw = String(id || "").trim();
      if (!raw) return "";
      const hex = raw.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
      if (hex.length !== 32) return raw;
      return this.notionCompactIdToUuid(hex);
    }

    extractNotionCompactIdFromUrl(url) {
      const raw = String(url || "").trim();
      if (!raw) return "";
      if (!/^https?:\/\//i.test(raw)) return "";

      const decoded = (() => {
        try {
          return decodeURIComponent(raw);
        } catch (e) {
          return raw;
        }
      })();

      const path = decoded.split("?")[0].split("#")[0];
      const hexOnly = path.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
      if (hexOnly.length < 32) return "";
      return hexOnly.slice(hexOnly.length - 32);
    }

    ensureNotionToObLinkIndex() {
      if (this.notionToObLinkIndexBuilt) return;

      const files = this.syncer.vault.getMarkdownFiles();
      const basenameCounts = new Map();
      const candidates = [];

      for (const file of files) {
        const fm = this.syncer.app.metadataCache.getFileCache(file)?.frontmatter;
        const notionId = fm?.[this.syncer.recordIdPropertyName];
        if (!notionId) continue;
        const uuid = this.normalizeNotionPageIdToUuid(notionId);
        if (!uuid) continue;
        candidates.push({ uuid, file });
        const base = String(file.basename || "");
        basenameCounts.set(base, (basenameCounts.get(base) || 0) + 1);
      }

      for (const { uuid, file } of candidates) {
        if (this.notionPageIdToObLinkTarget.has(uuid)) continue;
        const base = String(file.basename || "");
        const usePath = (basenameCounts.get(base) || 0) > 1;
        const target = usePath ? file.path.replace(/\.md$/i, "") : base;
        this.notionPageIdToObLinkTarget.set(uuid, {
          target,
          path: file.path,
          basename: base,
        });
      }

      this.notionToObLinkIndexBuilt = true;
    }

    resolveObsidianLinkFromNotionPageId(pageId, label = "") {
      this.ensureNotionToObLinkIndex();
      const uuid = this.normalizeNotionPageIdToUuid(pageId);
      const entry = uuid ? this.notionPageIdToObLinkTarget.get(uuid) : null;
      if (!entry?.target) return "";
      const safeLabel = String(label || "").trim();
      if (safeLabel && safeLabel !== entry.target) {
        return `[[${entry.target}|${safeLabel}]]`;
      }
      return `[[${entry.target}]]`;
    }

    resolveNotionPageIdFromObsidianLink(linkpath) {
      if (!linkpath) return "";
      const sourcePath =
        this.syncer.currentObsidianSourceFilePath || this.syncer.activeFile?.path || "";
      let file = null;
      try {
        file = this.syncer.app.metadataCache.getFirstLinkpathDest(
          String(linkpath || ""),
          sourcePath,
        );
      } catch (e) {}
      if (!file) return "";
      const fm = this.syncer.app.metadataCache.getFileCache(file)?.frontmatter;
      const notionId = fm?.[this.syncer.recordIdPropertyName];
      if (!notionId) return "";
      return this.normalizeNotionPageIdToUuid(notionId);
    }
  };
}

module.exports = IOTONotionLinkConverter;

