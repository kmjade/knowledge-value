function IOTONotionMarkdownBlocks(tp) {
  return class NotionMarkdownBlocks {
    constructor(syncer, inlineRichText, linkConverter) {
      this.syncer = syncer;
      this.inline = inlineRichText;
      this.link = linkConverter;
      this.currentNotionMarkdownOptions = null;
    }

    richTextToPlain(richText = []) {
      return (richText || []).map((t) => t.plain_text || "").join("");
    }

    escapeMarkdownText(text) {
      return String(text || "").replace(/([\\`*_{}[\]()#+\-.!|>])/g, "\\$1");
    }

    wrapMarkdown(text, wrapper) {
      const safe = String(text || "");
      if (!safe) return safe;
      return `${wrapper}${safe}${wrapper}`;
    }

    richTextToMarkdown(richText = [], options = {}) {
      const preserveStyles = options.preserveStyles ?? true;
      const convertLinks = options.convertLinks ?? true;
      const underlineMode = options.underlineMode || "html";
      const sanitizeHref = (href) => {
        return String(href || "")
          .trim()
          .replace(/^`+|`+$/g, "")
          .replace(/^<|>$/g, "");
      };
      const tryResolveObsidianLinkFromHref = (href, label) => {
        if (!this.link.shouldConvertNotionLinksToObsidian()) return "";
        const safeHref = sanitizeHref(href);
        if (!safeHref) return "";
        const compact = this.link.extractNotionCompactIdFromUrl(safeHref);
        const uuid = compact ? this.link.notionCompactIdToUuid(compact) : "";
        if (!uuid) return "";
        return this.link.resolveObsidianLinkFromNotionPageId(uuid, label);
      };
      const isObsidianLinkText = (text) => {
        const s = String(text || "");
        return /^\[\[[\s\S]+?\]\]$/.test(s);
      };

      return (richText || [])
        .map((rt) => {
          if (!rt) return "";
          const type = rt.type;
          let text = rt.plain_text || "";
          const href = sanitizeHref(rt.href);
          let skipHrefWrap = false;

          if (type === "equation") {
            const expr = rt.equation?.expression || text;
            text = `$${expr}$`;
          }

          if (type === "mention") {
            const mentionType = rt.mention?.type || "";
            if (mentionType === "page" && this.link.shouldConvertNotionLinksToObsidian()) {
              const pageId = rt.mention?.page?.id || "";
              const resolved = this.link.resolveObsidianLinkFromNotionPageId(
                pageId,
                rt.plain_text || "",
              );
              if (resolved) {
                text = resolved;
                skipHrefWrap = true;
              } else {
                text = rt.plain_text || text;
              }
            } else {
              text = rt.plain_text || text;
            }
          }

          if (!preserveStyles) {
            if (convertLinks && href) {
              const resolved = tryResolveObsidianLinkFromHref(href, text);
              if (resolved) return resolved;
              if (isObsidianLinkText(text)) return text;
              const label = this.escapeMarkdownText(text);
              return `[${label}](${href})`;
            }
            return text;
          }

          const ann = rt.annotations || {};
          let out = text;

          if (ann.code) {
            out = "`" + out.replace(/`/g, "\\`") + "`";
          }
          if (ann.bold) {
            out = this.wrapMarkdown(out, "**");
          }
          if (ann.italic) {
            out = this.wrapMarkdown(out, "*");
          }
          if (ann.strikethrough) {
            out = this.wrapMarkdown(out, "~~");
          }
          if (ann.underline) {
            out =
              underlineMode === "html"
                ? `<u>${out}</u>`
                : this.wrapMarkdown(out, "__");
          }
          const color = String(ann.color || "default");
          if (color !== "default" && !ann.code) {
            if (color === "yellow_background") {
              out = this.wrapMarkdown(out, "==");
            } else if (/_background$/.test(color)) {
              out = `<mark data-ioto-color="${color}">${out}</mark>`;
            } else {
              out = `<span data-ioto-color="${color}">${out}</span>`;
            }
          }

          if (convertLinks && href && !skipHrefWrap) {
            const resolved = tryResolveObsidianLinkFromHref(href, text);
            if (resolved) return resolved;
            if (isObsidianLinkText(out)) return out;
            const label = ann.code ? out : this.escapeMarkdownText(out);
            return `[${label}](${href})`;
          }

          return out;
        })
        .join("");
    }

    escapeMarkdownTableCell(text) {
      return String(text || "")
        .replace(/\r\n/g, "\n")
        .replace(/\n/g, "<br>")
        .replace(/\|/g, "\\|");
    }

    tableRowCellsToMarkdown(rowCells = [], mdOptions = {}) {
      const cells = (rowCells || []).map((cell) => {
        const cellText = this.richTextToMarkdown(cell || [], mdOptions);
        return this.escapeMarkdownTableCell(cellText);
      });
      return `| ${cells.join(" | ")} |`;
    }

    tableToMarkdown(tableBlock, mdOptions = {}) {
      const table = tableBlock.table || {};
      const rows = (tableBlock.__children || []).filter(
        (c) => c?.type === "table_row",
      );
      if (!rows.length) return "";

      const firstRowCells = rows[0]?.table_row?.cells || [];
      const colCount =
        Number(table.table_width) ||
        Math.max(
          ...rows.map((r) => (r?.table_row?.cells || []).length),
          firstRowCells.length,
        );

      const normalizeCells = (cells) => {
        const arr = (cells || []).slice(0, colCount);
        while (arr.length < colCount) arr.push([]);
        return arr;
      };

      const headerMode = mdOptions.tableHeaderMode || "auto";
      const useFirstRowAsHeader =
        headerMode === "always" ||
        headerMode === "auto" ||
        Boolean(table.has_column_header);

      const headerCells = normalizeCells(firstRowCells);
      const headerLine = this.tableRowCellsToMarkdown(headerCells, mdOptions);
      const sepLine = `| ${new Array(colCount).fill("---").join(" | ")} |`;

      const bodyRows = useFirstRowAsHeader ? rows.slice(1) : rows;
      const bodyLines = bodyRows
        .map((r) =>
          this.tableRowCellsToMarkdown(
            normalizeCells(r?.table_row?.cells || []),
            mdOptions,
          ),
        )
        .join("\n");

      const lines = [headerLine, sepLine];
      if (bodyLines) lines.push(bodyLines);
      return lines.join("\n") + "\n\n";
    }

    getMediaUrlFromFileObject(fileObj) {
      const obj = fileObj || {};
      const type = obj.type;
      if (type === "external") {
        return obj.external?.url || "";
      }
      if (type === "file") {
        return obj.file?.url || "";
      }
      return "";
    }

    createOrderedListState() {
      return { counterByDepth: {}, lastTypeByDepth: {} };
    }

    getListDepthFromIndent(indent) {
      const s = String(indent || "");
      let tabs = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "\t") tabs++;
      }
      return tabs;
    }

    resetOrderedListAtDepth(state, depth, blockType) {
      if (!state) return;
      if (blockType !== "numbered_list_item") {
        delete state.counterByDepth[depth];
        delete state.lastTypeByDepth[depth];
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
      if (!block || typeof block !== "object") return "";
      const mdOptions = this.currentNotionMarkdownOptions || {};
      const type = block.type;
      const children = block.__children || [];
      const listIndentUnit = "\t";
      const childIndentUnit =
        type === "bulleted_list_item" ||
        type === "numbered_list_item" ||
        type === "to_do"
          ? listIndentUnit
          : "  ";
      const childState = this.createOrderedListState();
      const childMd = children
        .map((c) => this.blockToMarkdown(c, indent + childIndentUnit, childState))
        .filter(Boolean)
        .join("");

      const wrapWithChildren = (line) => {
        if (!childMd) return line;
        return line + childMd;
      };

      const depth = this.getListDepthFromIndent(indent);
      switch (type) {
        case "heading_1": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.heading_1?.rich_text, mdOptions);
          return wrapWithChildren(`${indent}# ${text}\n\n`);
        }
        case "heading_2": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.heading_2?.rich_text, mdOptions);
          return wrapWithChildren(`${indent}## ${text}\n\n`);
        }
        case "heading_3": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.heading_3?.rich_text, mdOptions);
          return wrapWithChildren(`${indent}### ${text}\n\n`);
        }
        case "heading_4": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.heading_4?.rich_text, mdOptions);
          return wrapWithChildren(`${indent}#### ${text}\n\n`);
        }
        case "equation": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const expr = String(block.equation?.expression || "");
          const indentedExpr = expr
            .split("\n")
            .map((l) => `${indent}${l}`)
            .join("\n");
          return `${indent}$$\n${indentedExpr}\n${indent}$$\n\n`;
        }
        case "quote": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.quote?.rich_text, mdOptions);
          const lines = String(text || "")
            .split("\n")
            .map((l) => `${indent}> ${l}`)
            .join("\n");
          return wrapWithChildren(`${lines}\n\n`);
        }
        case "bulleted_list_item": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.bulleted_list_item?.rich_text, mdOptions);
          return wrapWithChildren(`${indent}- ${text}\n`);
        }
        case "numbered_list_item": {
          const text = this.richTextToMarkdown(block.numbered_list_item?.rich_text, mdOptions);
          const n = this.nextOrderedListNumber(orderedListState, depth);
          return wrapWithChildren(`${indent}${n}. ${text}\n`);
        }
        case "to_do": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.to_do?.rich_text, mdOptions);
          const checked = Boolean(block.to_do?.checked);
          return wrapWithChildren(`${indent}- [${checked ? "x" : " "}] ${text}\n`);
        }
        case "code": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToPlain(block.code?.rich_text);
          const lang = block.code?.language || "";
          return wrapWithChildren(`${indent}\`\`\`${lang}\n${text}\n${indent}\`\`\`\n\n`);
        }
        case "paragraph": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.paragraph?.rich_text, mdOptions);
          const line = text ? `${indent}${text}\n\n` : "\n";
          return wrapWithChildren(line);
        }
        case "divider": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          return wrapWithChildren(`${indent}---\n\n`);
        }
        case "image": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = this.getMediaUrlFromFileObject(block.image);
          if (!url) return childMd || "";
          const embed = mdOptions.embedImages ?? true;
          return wrapWithChildren(`${indent}${embed ? "!" : ""}[${""}](${url})\n\n`);
        }
        case "file": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = this.getMediaUrlFromFileObject(block.file);
          if (!url) return childMd || "";
          const name = block.file?.name || "file";
          return wrapWithChildren(`${indent}[${name}](${url})\n\n`);
        }
        case "pdf": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = this.getMediaUrlFromFileObject(block.pdf);
          if (!url) return childMd || "";
          const name = block.pdf?.name || "pdf";
          return wrapWithChildren(`${indent}[${name}](${url})\n\n`);
        }
        case "video": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = this.getMediaUrlFromFileObject(block.video);
          if (!url) return childMd || "";
          return wrapWithChildren(`${indent}[video](${url})\n\n`);
        }
        case "audio": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = this.getMediaUrlFromFileObject(block.audio);
          if (!url) return childMd || "";
          return wrapWithChildren(`${indent}[audio](${url})\n\n`);
        }
        case "bookmark": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const url = block.bookmark?.url || "";
          if (!url) return childMd || "";
          return wrapWithChildren(`${indent}[${url}](${url})\n\n`);
        }
        case "callout": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.callout?.rich_text, mdOptions);
          const header = `${text}`.trim();
          const quoteChild = (md) => {
            const lines = String(md || "").split("\n");
            return lines.map((l) => `${indent}>${l ? " " + l : ""}`).join("\n");
          };
          const inner = childMd ? quoteChild(childMd).replace(/\n+$/, "") : "";
          return `${indent}> [!note] ${header}${inner ? "\n" + inner : ""}\n\n`;
        }
        case "toggle": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const text = this.richTextToMarkdown(block.toggle?.rich_text, mdOptions);
          const inner = childMd ? `\n${childMd}\n` : "\n";
          return `${indent}<details>\n${indent}<summary>${text}</summary>\n${inner}${indent}</details>\n\n`;
        }
        case "table": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          return wrapWithChildren(this.tableToMarkdown(block, mdOptions));
        }
        case "link_to_page": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const ltp = block.link_to_page;
          const linkType = ltp?.type;
          const id =
            linkType === "page_id"
              ? ltp?.page_id
              : linkType === "database_id"
                ? ltp?.database_id
                : "";
          if (id && linkType === "page_id" && this.link.shouldConvertNotionLinksToObsidian()) {
            const local = this.link.resolveObsidianLinkFromNotionPageId(id);
            if (local) {
              return wrapWithChildren(`${indent}${local}\n\n`);
            }
          }
          const url = id ? this.syncer.getPageUrlFromId(id) : "";
          if (!url) return childMd || "";
          return wrapWithChildren(`${indent}[Notion](${url})\n\n`);
        }
        case "synced_block": {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const blockId = String(block?.id || "").trim();
          const sourceId = String(
            block?.synced_block?.synced_from?.block_id || "",
          ).trim();
          const start =
            `${indent}<!-- IOTO:SYNCED_BLOCK` +
            `${blockId ? " id=" + blockId : ""}` +
            `${sourceId ? " source=" + sourceId : ""} -->\n`;
          const end = `${indent}<!-- /IOTO:SYNCED_BLOCK -->\n\n`;
          if (childMd) {
            return start + childMd + end;
          }
          return start + end;
        }
        default: {
          this.resetOrderedListAtDepth(orderedListState, depth, type);
          const fallbackText = this.richTextToMarkdown(block?.[type]?.rich_text || [], mdOptions);
          if (fallbackText) {
            return wrapWithChildren(`${indent}${fallbackText}\n\n`);
          }
          return childMd || "";
        }
      }
    }

    blocksToMarkdown(blocks = []) {
      const ensureTrailingNewlines = (text, count) => {
        const str = String(text || "");
        const match = str.match(/\n*$/);
        const existing = match ? match[0].length : 0;
        if (existing >= count) return str;
        return str + "\n".repeat(count - existing);
      };

      const listTypes = new Set([
        "bulleted_list_item",
        "numbered_list_item",
        "to_do",
      ]);

      let out = "";
      let prevType = null;
      const orderedListState = this.createOrderedListState();

      for (const block of blocks || []) {
        const piece = this.blockToMarkdown(block, "", orderedListState);
        if (!piece) {
          prevType = block?.type || prevType;
          continue;
        }

        const currType = block?.type || null;

        if (out && listTypes.has(prevType) && !listTypes.has(currType)) {
          out = ensureTrailingNewlines(out, 2);
        }

        if (currType === "table") {
          out = ensureTrailingNewlines(out, 2);
        } else if (listTypes.has(currType)) {
          if (out && !listTypes.has(prevType)) {
            out = ensureTrailingNewlines(out, 2);
          } else {
            out = ensureTrailingNewlines(out, 1);
          }
        }

        out += piece;
        prevType = currType;
      }

      return out.replace(/\s+$/, "") + "\n";
    }

    blocksToPlainText(blocks = []) {
      const walk = (b, out = []) => {
        if (!b || typeof b !== "object") return out;
        const type = b.type;
        const value = b[type];
        if (value?.rich_text) {
          out.push(this.richTextToPlain(value.rich_text));
        }
        if (b.__children?.length) {
          b.__children.forEach((c) => walk(c, out));
        }
        return out;
      };
      const lines = [];
      blocks.forEach((b) => walk(b, lines));
      return lines.filter((l) => l !== undefined && l !== null).join("\n") + "\n";
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
              rich_text: this.inline.markdownInlineToRichText(summary),
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

        const inner = collected.join("\n").replace(/^\s+/, "").replace(/\s+$/, "");
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
              rich_text: this.inline.markdownInlineToRichText(title || type || "note"),
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
              rich_text: this.inline.markdownInlineToRichText(text),
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
                  this.inline.markdownInlineToRichText(String(c || "")),
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
        url = String(url || "").replace(/^<|>$/g, "").trim();
        if (!/^https?:\/\//i.test(url)) return null;
        url = url.slice(0, 2000);

        const image = {
          type: "external",
          external: { url },
        };
        if (alt) {
          image.caption = this.inline.markdownInlineToRichText(alt);
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
        url = String(url || "").replace(/^<|>$/g, "").trim();

        const compactId = this.link.extractNotionCompactIdFromUrl(url);
        if (!compactId) return null;
        const uuid = this.link.notionCompactIdToUuid(compactId);
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
        const chunks = this.syncer.textToRichTextBlocks(text);
        chunks.forEach((chunk) => {
          blocks.push({
            type: "code",
            code: {
              rich_text: this.syncer.toRichText(chunk),
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
        const rich = this.inline.markdownInlineToRichText(safe);
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
        while (listStack.length && indent <= listStack[listStack.length - 1].indent) {
          listStack.pop();
        }

        const parentEntry = listStack.length ? listStack[listStack.length - 1] : null;
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
            trimmed.length > 4 && trimmed.startsWith("$$") && trimmed.endsWith("$$");

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
            heading_1: { rich_text: this.inline.markdownInlineToRichText(h1[1]) },
          });
          continue;
        }
        const h2 = line.match(/^##\s+(.*)$/);
        if (h2) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_2",
            heading_2: { rich_text: this.inline.markdownInlineToRichText(h2[1]) },
          });
          continue;
        }
        const h3 = line.match(/^###\s+(.*)$/);
        if (h3) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_3",
            heading_3: { rich_text: this.inline.markdownInlineToRichText(h3[1]) },
          });
          continue;
        }
        const h4 = line.match(/^####\s+(.*)$/);
        if (h4) {
          flushParagraph();
          clearListStack();
          blocks.push({
            type: "heading_4",
            heading_4: { rich_text: this.inline.markdownInlineToRichText(h4[1]) },
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
                  rich_text: this.inline.markdownInlineToRichText(text),
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
                  rich_text: this.inline.markdownInlineToRichText(text),
                },
              },
              listItem.indent,
            );
          } else if (kind === "numbered_list_item") {
            appendListItem(
              {
                type: "numbered_list_item",
                numbered_list_item: {
                  rich_text: this.inline.markdownInlineToRichText(text),
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
              paragraph: { rich_text: this.inline.markdownInlineToRichText(text) },
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
  };
}

module.exports = IOTONotionMarkdownBlocks;
