function IOTONotionDB(tp) {
  let MyNocoDB = tp.user.IOTONoCodeDB(tp);
  return class MyNotionDB extends MyNocoDB {
    constructor(nocoDBSettings) {
      super(
        nocoDBSettings,
        {
          dbName: "Notion",
          recordIdPropertyName: "notionRecordID",
          recordIdPropertyNameForDownload: "notionDownloadRecordID",
          recordIdName: "id",
          useDate: false,
          apiUrlRoot: "https://api.notion.com/v1/",
          recordUrlRoot:
            nocoDBSettings.recordUrlRoot || "https://www.notion.so/",
        },
        {
          baseIDName: "dataSourceID",
          defaultBaseIDName: "defaultDataSourceID",
          downloadBaseIDName: "downloadDataSourceID",
          tableIDName: "dataSourceID",
          defaultTableIDName: "defaultDataSourceID",
          downloadTableIDName: "downloadDataSourceID",
        },
      );

      this.notionVersion = nocoDBSettings.notionVersion || "2026-03-11";
      this.contentMaxLength = 1900;
      this.extractKeyPointsAsText = true;
      this.extractBlocksAsText = true;
      this.extractTagLinesAsText = true;
      this.extractSectionsAsText = true;
    }

    makeApiUrl(root, baseID, tableID) {
      const cleanRoot = root.replace(/\/$/, "");
      const dataSourceID = tableID || baseID;
      return `${cleanRoot}/data_sources/${dataSourceID}/query`;
    }

    makeDataSourceApiUrl(root, baseID, tableID) {
      const cleanRoot = root.replace(/\/$/, "");
      const dataSourceID = tableID || baseID;
      return `${cleanRoot}/data_sources/${dataSourceID}`;
    }

    setSyncFolderRecordTableUrlBase(folder, mode = "upload") {
      const root = this.recordUrlRoot.replace(/\/$/, "");
      return `${root}/`;
    }
  };
}

module.exports = IOTONotionDB;
