function IOTOBaserowSyncer(tp) {
  let NocoDBSyncer = tp.user.IOTONoCodeDBSyncer(tp);
  const ml = new (tp.user.IOTOMultiLangs(tp))(tp);

  return class BaserowSyncer extends NocoDBSyncer {
    constructor(nocodb, tp, app, updateNotesInOB = true) {
      super(nocodb, tp, app, updateNotesInOB);
      this.jwtTokenPromise = this.setNewJWTToken();
    }

    async ensureJWTToken() {
      if (this.jwtTokenPromise) {
        await this.jwtTokenPromise;
      }
      if (!this.jwtToken) {
        await this.setNewJWTToken();
      }
    }

    createRequestConfig({
      url,
      method,
      data = null,
      apiKey = this.nocodb.apiKey || "",
      additionalHeaders = {},
      jwt = false,
    } = {}) {
      // Baserow uses "Token " prefix for Database Tokens
      const config = {
        method: method,
        headers: {
          Authorization: `${jwt ? "JWT " : "Token "}${apiKey}`,
          ...additionalHeaders,
        },
      };

      if (url) {
        config.url = url;
      }

      if (data) {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(data);
      }

      return config;
    }

    async retriveRecordInNocoDB(rid) {
      await this.ensureJWTToken();
      try {
        const url = this.nocodb.apiUrl + `${rid}/?user_field_names=true`;
        const requestConfig = this.createRequestConfig({
          url,
          method: "GET",
        });
        const response = await requestUrl(requestConfig);

        if (response.status !== 200) {
          this.showNotice(response.statusText, ml.t("RecordRetrieveError"));
          return null;
        }
        const record = {
          id: response.json.id,
          fields: response.json,
        };
        return this.formatRecord(record);
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordRetrieveError"));
        return null;
      }
    }

    async checkRecordInNocoDB(rid) {
      await this.ensureJWTToken();
      try {
        const url = this.nocodb.apiUrl + `${rid}/?user_field_names=true`;
        const requestConfig = this.createRequestConfig({
          url,
          method: "GET",
        });
        const response = await requestUrl(requestConfig);
        return response.status === 200;
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
      await this.ensureJWTToken();
      let url = this.nocodb.apiUrl + "?user_field_names=true";
      const pathField = this.recordFieldsNames.path;

      // Baserow uses filters for row retrieval
      // Format: filter__field_1__equal=value
      if (folder) {
        if (!includesSubfolder) {
          url += `&filter__field_${encodeURIComponent(pathField)}__equal=${encodeURIComponent(folder)}`;
        } else {
          url += `&filter__field_${encodeURIComponent(pathField)}__contains=${encodeURIComponent(folder)}`;
        }
      }

      // Note: Baserow's free plan has limitations on complex filters via URL.
      // For now, we use a simple approach. Pagination is handled in getAllRecordsFromTable.
      return await this.getAllRecordsFromTable(url);
    }

    async fetchRecordsFromSource(sourceTable) {
      await this.ensureJWTToken();
      const dateChoice = await this.getDateChoice();
      if (!dateChoice.choice) {
        return [];
      } else {
        const tableID = sourceTable.tableID || this.nocodb.defaultTableID;
        // Baserow URL for list rows: /api/database/rows/table/{table_id}/
        const url = `${this.nocodb.apiUrlRoot}database/rows/table/${tableID}/?user_field_names=true`;

        const records = await this.getAllRecordsFromTable(url);

        if (records.length > 0 && records[0].hasOwnProperty(this.updatedTime)) {
          // Wrap records in the expected format for filterRecordsByDate (record.fields)
          const wrappedRecords = records.map((r) => ({
            [this.recordIdName]: r[this.recordIdName],
            fields: r,
          }));
          const filteredRecords = await this.filterRecordsByDate(
            wrappedRecords,
            dateChoice,
          );
          return filteredRecords;
        } else {
          // Return wrapped records
          return records.map((r) => ({
            [this.recordIdName]: r[this.recordIdName],
            fields: r,
          }));
        }
      }
    }

    async getAllRecordsFromTable(url) {
      let records = [];
      let nextUrl = url;

      while (nextUrl) {
        try {
          const requestConfig = this.createRequestConfig({
            url: nextUrl,
            method: "GET",
          });
          const response = await requestUrl(requestConfig);
          const data = response.json;

          // Baserow response format: { count: X, next: URL, previous: URL, results: [] }
          if (data.results) {
            // Map results to standard format: { id: X, fields: { ... } }
            const standardRecords = data.results.map((r) => ({
              [this.recordIdName]: r[this.recordIdName],
              fields: r,
            }));
            records = records.concat(standardRecords);
          }

          nextUrl = data.next || null;
        } catch (error) {
          this.showNotice(error.message, ml.t("RecordRetrieveError"));
          break;
        }
      }
      return this.formatRecords(records);
    }

    async createRecordsInNocoDB(data, updateNotesInOB = true) {
      await this.ensureJWTToken();
      const url = this.nocodb.apiUrl + "?user_field_names=true";

      // Baserow create row is one by one or batch.
      // IOTO usually sends { records: [...] }. Baserow batch create: POST /api/database/rows/table/{table_id}/batch/
      const batchUrl = this.nocodb.apiUrl + "batch/?user_field_names=true";

      // Data format transformation: IOTO uses { records: [ { fields: { ... } } ] }
      // Baserow batch create uses { items: [ { ...fields } ] }
      const baserowData = {
        items: data.records.map((r) => r.fields),
      };

      await this.updataSelectFieldsOptions(data.records);

      try {
        const requestConfig = this.createRequestConfig({
          url: batchUrl,
          method: "POST",
          data: baserowData,
        });
        const response = await requestUrl(requestConfig);
        const resData = response.json;

        if (response.status !== 200) {
          this.showNotice(
            resData.error || "Unknown error",
            ml.t("RecordCreateError"),
          );
          return false;
        } else {
          if (updateNotesInOB && resData.items) {
            // Transform back to IOTO format for updateNotesFromRecords
            const iotoRecords = resData.items.map((item) => ({
              [this.recordIdName]: item[this.recordIdName],
              fields: item,
            }));
            await this.updateNotesFromRecords(
              this.formatRecords(iotoRecords),
              true,
            );
          }
          return true;
        }
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordCreateError"));
        return false;
      }
    }

    async updateRecordsInNocoDB(data) {
      await this.ensureJWTToken();
      // Baserow batch update: PATCH /api/database/rows/table/{table_id}/batch/
      const batchUrl = this.nocodb.apiUrl + "batch/?user_field_names=true";

      // IOTO data: { records: [ { id: X, fields: { ... } } ] }
      // Baserow batch update: { items: [ { id: X, ...fields } ] }
      const items = data.records.map((r) => ({
        [this.recordIdName]: r[this.recordIdName],
        ...r.fields,
      }));

      await this.updataSelectFieldsOptions(data.records);

      try {
        const requestConfig = this.createRequestConfig({
          url: batchUrl,
          method: "PATCH",
          data: {
            items,
          },
        });
        const response = await requestUrl(requestConfig);
        const resData = response.json;

        if (response.status !== 200) {
          this.showNotice(
            resData.error || "Unknown error",
            ml.t("RecordUpdateError"),
          );
          return false;
        } else {
          if (resData.items) {
            const iotoRecords = resData.items.map((item) => ({
              [this.recordIdName]: item[this.recordIdName],
              fields: item,
            }));

            await this.updateNotesFromRecords(this.formatRecords(iotoRecords));
          }
          return true;
        }
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordUpdateError"));
        return false;
      }
    }

    async deleteRecordsInNocoDB(recordID) {
      await this.ensureJWTToken();
      const url = this.nocodb.apiUrl + `${recordID}/`;
      const requestConfig = this.createRequestConfig({
        url,
        method: "DELETE",
      });
      try {
        const response = await requestUrl(requestConfig);
        if (response.status === 204) {
          this.showNotice(ml.t("RecordDeleteSuccess"));
          return true;
        }
        return false;
      } catch (error) {
        this.showNotice(error.message, ml.t("RecordDeleteError"));
        return false;
      }
    }

    async updataSelectFieldsOptions(records = []) {
      if (records.length === 0) return;
      const requiredOptions = {};
      for (const record of records) {
        for (const [fieldName, value] of Object.entries(record.fields)) {
          if (!requiredOptions[fieldName]) {
            requiredOptions[fieldName] = new Set();
          }
          if (Array.isArray(value)) {
            value.forEach((opt) => requiredOptions[fieldName].add(opt));
          } else if (value) {
            requiredOptions[fieldName].add(value);
          }
        }
      }
      if (Object.entries(requiredOptions).length === 0) return;

      const fieldsApiUrl = this.nocodb.fieldsApiUrl;

      const config = this.createRequestConfig({
        url: fieldsApiUrl,
        method: "GET",
        apiKey: this.jwtToken,
        jwt: true,
      });

      const metaRes = await requestUrl(config);

      const msFields = metaRes.json.filter(
        (field) =>
          field?.type === "multiple_select" || field?.type === "single_select",
      );
      const msFieldsMap = Object.fromEntries(
        msFields.map((field) => [field.name, field]),
      );

      for (const [fieldName, neededTitlesSet] of Object.entries(
        requiredOptions,
      )) {
        const fieldMeta = msFieldsMap[fieldName];
        if (!fieldMeta) continue;

        const currentOptions = fieldMeta.select_options || [];
        const existingTitles = new Set(currentOptions.map((opt) => opt.value));

        // 找出缺失的选项
        const missingTitles = [...neededTitlesSet].filter(
          (title) => !existingTitles.has(title),
        );
        if (missingTitles.length === 0) continue;

        const newOptions = missingTitles.map((title) => ({
          value: title,
          color: "blue",
        }));
        const updatedOptions = [...currentOptions, ...newOptions];

        const updatePayload = {
          name: fieldMeta.name,
          type: fieldMeta.type,
          select_options: updatedOptions,
        };

        const updateUrl = this.nocodb.updateFieldApiUrl + fieldMeta.id + "/";

        const updateConfig = this.createRequestConfig({
          url: updateUrl,
          method: "PATCH",
          data: updatePayload,
          apiKey: this.jwtToken,
          jwt: true,
        });

        try {
          await requestUrl(updateConfig);
        } catch (error) {
          console.error(
            `Failed to update options for field ${fieldName}:`,
            error,
          );
        }
      }
    }

    formatRecord(record) {
      const copyRecord = { ...record };
      for (let [key, value] of Object.entries(copyRecord.fields)) {
        if (
          value &&
          Array.isArray(value) &&
          typeof value[0] === "object" &&
          "value" in value[0]
        ) {
          copyRecord.fields[key] = value.map((v) => v.value);
        }
        if (value && typeof value === "object" && "value" in value) {
          copyRecord.fields[key] = value.value;
        }
      }
      return copyRecord;
    }

    formatRecords(records) {
      return records.map((record) => this.formatRecord(record));
    }

    async setNewJWTToken() {
      this.jwtToken = await this.getJWTToken();
    }

    async getJWTToken() {
      const cleanRoot = this.nocodb.apiUrlRoot.replace(/\/$/, "");
      const url = cleanRoot + "/user/token-auth/";
      const requestConfig = this.createRequestConfig({
        url,
        method: "POST",
        data: {
          email: this.nocodb.email,
          password: this.nocodb.password,
        },
      });
      const response = await requestUrl(requestConfig);
      const resData = response.json;
      if (response.status !== 200) {
        this.showNotice(
          resData.error || "Unknown error",
          // ml.t("JWTTokenError"),
        );
        return false;
      } else {
        return resData.token;
      }
    }
  };
}

module.exports = IOTOBaserowSyncer;
