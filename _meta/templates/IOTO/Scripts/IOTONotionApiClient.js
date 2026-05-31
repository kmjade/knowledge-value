function IOTONotionApiClient(tp) {
  return class NotionApiClient {
    constructor(syncer, scheduler) {
      this.syncer = syncer;
      this.scheduler = scheduler;
      this.dataSourceSchemaCache = {};
      this.maxRetryCount = 5;
    }

    createRequestConfig({
      url,
      method,
      data = null,
      apiKey = "",
      additionalHeaders = {},
    } = {}) {
      let resolvedApiKey = apiKey;
      if (!String(resolvedApiKey || "").trim()) {
        try {
          resolvedApiKey =
            this.syncer.getNotionApiKeyForContext?.(
              this.syncer.activeNote,
              this.syncer.currentSyncFolder || this.syncer.folder,
            ) || "";
        } catch (e) {}
      }
      if (!String(resolvedApiKey || "").trim()) {
        resolvedApiKey = this.syncer.nocodb.apiKey || "";
      }
      const config = {
        method,
        url,
        headers: {
          Authorization: "Bearer " + resolvedApiKey,
          "Notion-Version": this.syncer.nocodb.notionVersion || "2026-03-11",
          ...additionalHeaders,
        },
      };

      if (data) {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(data);
      }

      return config;
    }

    async requestWithRetry(config, retryCount = 0) {
      try {
        if (this.scheduler) {
          return await this.scheduler.schedule(() => requestUrl(config));
        }
        return await requestUrl(config);
      } catch (error) {
        const status = error?.status;
        if (status === 429 && retryCount < this.maxRetryCount) {
          const retryAfterHeader =
            error?.headers?.["Retry-After"] || error?.headers?.["retry-after"];
          const retryAfterSeconds = Number.parseInt(retryAfterHeader, 10);
          const waitMs =
            Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
              ? retryAfterSeconds * 1000
              : Math.min(1000 * 2 ** retryCount, 10000);
          if (this.scheduler) {
            this.scheduler.pause(waitMs);
          }
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          return this.requestWithRetry(config, retryCount + 1);
        }
        if (status === 404) {
          const hint =
            "Notion 返回 404：通常表示 integration token 没有访问权限，或 dataSource/page id 不存在。若你在按文件夹切换 apiKey，请确保该文件夹的 dataSourceID 也属于同一个 Workspace，并且该 integration 已被邀请到对应数据源。";
          if (
            error?.message &&
            !String(error.message).includes("Notion 返回 404")
          ) {
            error.message = `${error.message}\n${hint}`;
          }
        }
        throw error;
      }
    }

    async getDataSourceSchema(dataSourceID = "") {
      const targetDataSourceID =
        dataSourceID || this.syncer.getDataSourceIDFromApiUrl();
      if (!targetDataSourceID) {
        return {};
      }

      if (this.dataSourceSchemaCache[targetDataSourceID]) {
        return this.dataSourceSchemaCache[targetDataSourceID];
      }

      const requestConfig = this.createRequestConfig({
        url: this.syncer.makeDataSourceApiUrl(targetDataSourceID),
        method: "GET",
      });

      const response = await this.requestWithRetry(requestConfig);
      const schema = response.json?.properties || {};
      this.dataSourceSchemaCache[targetDataSourceID] = schema;
      return schema;
    }

    normalizeDateISO(value) {
      if (!value && value !== 0) return null;
      if (typeof value === "number") {
        const ts = String(value).length === 10 ? value * 1000 : value;
        const d = new Date(ts);
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      }
      if (typeof value === "string") {
        const maybeNumber = Number(value);
        if (!Number.isNaN(maybeNumber) && value.trim() !== "") {
          return this.normalizeDateISO(maybeNumber);
        }
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      }
      return null;
    }

    buildNotionPropertyValue(type, value) {
      if (value === undefined || value === null) return null;

      switch (type) {
        case "title": {
          const titleText = String(value || "").trim();
          return {
            title: this.syncer.toRichText(titleText || "Untitled"),
          };
        }
        case "rich_text":
          return { rich_text: this.syncer.toRichText(value) };
        case "multi_select": {
          const values = Array.isArray(value) ? value : [value];
          const options = values
            .map((v) => String(v || "").trim())
            .filter(Boolean)
            .slice(0, 100)
            .map((name) => ({ name }));
          return { multi_select: options };
        }
        case "select": {
          const selectValue = String(
            Array.isArray(value) ? value.first() || "" : value,
          ).trim();
          return selectValue ? { select: { name: selectValue } } : null;
        }
        case "status": {
          const statusValue = String(
            Array.isArray(value) ? value.first() || "" : value,
          ).trim();
          return statusValue ? { status: { name: statusValue } } : null;
        }
        case "checkbox":
          return { checkbox: Boolean(value) };
        case "number": {
          const numberValue = Number(value);
          return Number.isFinite(numberValue) ? { number: numberValue } : null;
        }
        case "date": {
          const isoDate = this.normalizeDateISO(value);
          return isoDate ? { date: { start: isoDate } } : null;
        }
        case "url": {
          const urlValue = String(value || "").trim();
          return urlValue ? { url: urlValue.slice(0, 2000) } : null;
        }
        case "email": {
          const email = String(value || "").trim();
          return email ? { email: email.slice(0, 200) } : null;
        }
        case "phone_number": {
          const phone = String(value || "").trim();
          return phone ? { phone_number: phone.slice(0, 200) } : null;
        }
        default:
          return null;
      }
    }

    mapFieldsToNotionProperties(fields, schema) {
      const properties = {};
      const titleFieldName = Object.entries(schema).find(
        ([, config]) => config?.type === "title",
      )?.[0];

      for (const [fieldName, fieldValue] of Object.entries(fields || {})) {
        if (!(fieldName in schema)) continue;
        const type = schema[fieldName]?.type;
        const notionValue = this.buildNotionPropertyValue(type, fieldValue);
        if (notionValue) {
          properties[fieldName] = notionValue;
        }
      }

      if (titleFieldName && !(titleFieldName in properties)) {
        const fallbackTitle =
          fields?.[this.syncer.recordFieldsNames.title] || "Untitled";
        properties[titleFieldName] = this.buildNotionPropertyValue(
          "title",
          fallbackTitle,
        );
      }

      return properties;
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
        [this.syncer.recordIdName]: page.id,
        fields,
      };
    }

    async queryPagesFromDataSource({
      dataSourceID,
      filter = null,
      pageSize = 100,
    } = {}) {
      let records = [];
      let hasMore = true;
      let nextCursor = null;

      while (hasMore) {
        const body = {
          page_size: pageSize,
          result_type: "page",
        };
        if (filter) {
          body.filter = filter;
        }
        if (nextCursor) {
          body.start_cursor = nextCursor;
        }

        const requestConfig = this.createRequestConfig({
          url: this.syncer.makeDataSourceQueryUrl(dataSourceID),
          method: "POST",
          data: body,
        });

        const response = await this.requestWithRetry(requestConfig);
        const pageResults = Array.isArray(response.json?.results)
          ? response.json.results
          : [];
        records = records.concat(pageResults);
        const data = response.json || {};
        hasMore = Boolean(data.has_more);
        nextCursor = data.next_cursor || null;
      }

      return (records || [])
        .map((record) => this.formatRecord(record))
        .filter(Boolean);
    }
  };
}

module.exports = IOTONotionApiClient;
