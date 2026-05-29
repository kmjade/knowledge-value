function IOTOBaserowDB(tp) {
  let MyNocoDB = tp.user.IOTONoCodeDB(tp);
  return class MyBaserowDB extends MyNocoDB {
    constructor(settings) {
      super(
        settings,
        {
          dbName: "Baserow",
          recordIdPropertyName: "baserowRecordID",
          recordIdPropertyNameForDownload: "baserowDownloadRecordID",
          recordIdName: "id",
          useDate: false,
          apiUrlRoot: settings.apiUrlRoot || "https://api.baserow.io/api/",
          recordUrlRoot: settings.recordUrlRoot || "https://baserow.io/",
        },
        {
          baseIDName: "databaseID",
          defaultBaseIDName: "defaultBaseID",
          downloadBaseIDName: "downloadBaseID",
          tableIDName: "tableID",
          defaultTableIDName: "defaultTableID",
          downloadTableIDName: "downloadTableID",
        },
      );
      this.email = settings.email || "";
      this.password = settings.password || "";
      this.contentMaxLength = 100000;
      // this.uploadTags = settings.uploadTags ?? false;
      // this.uploadAliases = settings.uploadAliases ?? false;
      this.extractKeyPointsAsText = true;
      this.extractBlocksAsText = true;
      this.extractTagLinesAsText = true;
      this.extractSectionsAsText = true;
    }

    makeApiUrl(root, baseID, tableID) {
      const cleanRoot = root.replace(/\/$/, "");
      return `${cleanRoot}/database/rows/table/${tableID}/`;
    }

    makeFieldsApiUrl(root, baseID, tableID) {
      const cleanRoot = root.replace(/\/$/, "");
      return `${cleanRoot}/database/fields/table/${tableID}/`;
    }

    makeUpdateFieldApiUrl(root, baseID) {
      const cleanRoot = root.replace(/\/$/, "");
      return `${cleanRoot}/database/fields/`;
    }

    /**
     * Sets record table URL base for a sync folder
     * @param {string} folder - Folder path
     * @returns {string} Record table URL base
     */
    setSyncFolderRecordTableUrlBase(folder, mode = "upload") {
      // NocoDB UI URL: {root}/dashboard/#/project/{projectId}/table/{tableId}
      // Or similar. Let's try to construct a valid UI link.
      // Since we might not have projectId readily available if only tableId is used,
      // we might need to rely on what we have.
      // If baseID is provided in settings, we use it.
      const tableID = this.findSyncFolderNocodDBTableID(folder, mode);
      const baseID = this.findSyncFolderNocodDBBaseID(folder, mode);
      const cleanRoot = this.recordUrlRoot.replace(/\/$/, "");
      return `${cleanRoot}/database/${baseID}/table/${tableID}/row/`; // Fallback if supported
    }
  };
}

module.exports = IOTOBaserowDB;
