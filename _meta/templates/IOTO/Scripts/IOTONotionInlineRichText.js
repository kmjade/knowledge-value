function IOTONotionInlineRichText(tp) {
  return class NotionInlineRichText {
    constructor(syncer, linkConverter) {
      this.syncer = syncer;
      this.link = linkConverter;
    }

    markdownInlineToRichText(text = "") {
      const s = String(text ?? "");
      if (!s) return [];

      const out = [];
      const chunkSize = 1900;
      const notionColors = new Set([
        "default",
        "gray",
        "brown",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink",
        "red",
        "gray_background",
        "brown_background",
        "orange_background",
        "yellow_background",
        "green_background",
        "blue_background",
        "purple_background",
        "pink_background",
        "red_background",
      ]);

      const normalizeNotionColor = (value, background = false) => {
        const raw = String(value || "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/-/g, "_");
        if (!raw) return "";
        const normalized = raw === "grey" ? "gray" : raw;
        if (notionColors.has(normalized)) return normalized;
        if (background && notionColors.has(`${normalized}_background`)) {
          return `${normalized}_background`;
        }
        if (!background && normalized.endsWith("_background")) {
          const base = normalized.replace(/_background$/, "");
          if (notionColors.has(base)) return base;
        }
        return "";
      };

      const parseStyleColor = (styleText, prop) => {
        const style = String(styleText || "");
        const escapedProp = prop.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
        const match = style.match(
          new RegExp(`${escapedProp}\\s*:\\s*([^;]+)`, "i"),
        );
        if (!match) return "";
        return String(match[1] || "").trim();
      };

      const isEscapedAt = (input, pos) => {
        let count = 0;
        for (let i = pos - 1; i >= 0 && input[i] === "\\"; i--) {
          count++;
        }
        return count % 2 === 1;
      };

      const baseAnnotations = {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      };

      const normalizeAnnotations = (ann = {}) => {
        const outAnn = {
          bold: Boolean(ann.bold),
          italic: Boolean(ann.italic),
          strikethrough: Boolean(ann.strikethrough),
          underline: Boolean(ann.underline),
          code: Boolean(ann.code),
          color: ann.color || "default",
        };
        return outAnn;
      };

      const pushText = (raw, ann) => {
        const t = String(raw ?? "");
        if (!t) return;
        const annotations = normalizeAnnotations(ann);
        for (let i = 0; i < t.length; i += chunkSize) {
          out.push({
            type: "text",
            text: { content: t.slice(i, i + chunkSize) },
            annotations,
          });
        }
      };

      const pushTextWithHref = (raw, ann, href) => {
        const t = String(raw ?? "");
        if (!t) return;
        const annotations = normalizeAnnotations(ann);
        const safeHref = String(href || "").trim();
        for (let i = 0; i < t.length; i += chunkSize) {
          out.push({
            type: "text",
            text: { content: t.slice(i, i + chunkSize) },
            annotations,
            href: safeHref || null,
          });
        }
      };

      const isWordChar = (ch) => /[0-9A-Za-z]/.test(String(ch || ""));
      const isWhitespace = (ch) => /\s/.test(String(ch || ""));

      const findClosing = (input, delim, start) => {
        let i = start;
        while (i < input.length) {
          const idx = input.indexOf(delim, i);
          if (idx === -1) return -1;
          if (!isEscapedAt(input, idx)) return idx;
          i = idx + 1;
        }
        return -1;
      };

      const mergeAnn = (a, b) => {
        const na = normalizeAnnotations(a);
        const nb = normalizeAnnotations(b);
        return normalizeAnnotations({
          bold: na.bold || nb.bold,
          italic: na.italic || nb.italic,
          strikethrough: na.strikethrough || nb.strikethrough,
          underline: na.underline || nb.underline,
          code: na.code || nb.code,
          color: nb.color && nb.color !== "default" ? nb.color : na.color,
        });
      };

      const parseInline = (input, ann) => {
        let buffer = "";
        let i = 0;
        while (i < input.length) {
          const ch = input[i];

          if (
            this.link.shouldConvertObsidianLinksToNotion() &&
            (input.startsWith("[[", i) || input.startsWith("![[", i)) &&
            !isEscapedAt(input, i)
          ) {
            const isEmbed = input.startsWith("![[", i);
            const start = i + (isEmbed ? 3 : 2);
            const end = input.indexOf("]]", start);
            if (end !== -1) {
              const rawInner = input.slice(start, end);
              const inner = String(rawInner || "").trim();
              if (inner) {
                const pipeIndex = inner.indexOf("|");
                const left = pipeIndex === -1 ? inner : inner.slice(0, pipeIndex);
                const alias =
                  pipeIndex === -1
                    ? ""
                    : String(inner.slice(pipeIndex + 1)).trim();

                const anchorMatch = String(left).match(/^(.*?)([#^].*)$/);
                const linkPath = (anchorMatch ? anchorMatch[1] : left).trim();
                const anchorSuffix = anchorMatch ? anchorMatch[2] : "";

                const pageId = this.link.resolveNotionPageIdFromObsidianLink(
                  linkPath,
                );
                if (pageId) {
                  if (buffer) {
                    pushText(buffer, ann);
                    buffer = "";
                  }

                  if (alias) {
                    const href = this.syncer.getPageUrlFromId(pageId);
                    pushTextWithHref(alias, ann, href);
                  } else {
                    out.push({
                      type: "mention",
                      mention: { type: "page", page: { id: pageId } },
                      annotations: normalizeAnnotations(ann),
                    });
                  }

                  if (anchorSuffix) {
                    pushText(anchorSuffix, ann);
                  }

                  i = end + 2;
                  continue;
                }
              }
            }
          }

          if (ch === "`" && !isEscapedAt(input, i)) {
            const end = findClosing(input, "`", i + 1);
            if (end === -1) {
              buffer += ch;
              i++;
              continue;
            }
            const inner = input.slice(i + 1, end);
            if (buffer) {
              pushText(buffer, ann);
              buffer = "";
            }
            pushText(inner, mergeAnn(ann, { code: true }));
            i = end + 1;
            continue;
          }

          if (ch === "$" && !isEscapedAt(input, i) && input[i + 1] !== "$") {
            const end = (() => {
              let j = i + 1;
              while (j < input.length) {
                if (input[j] === "$" && !isEscapedAt(input, j)) return j;
                j++;
              }
              return -1;
            })();
            if (end !== -1) {
              const exprRaw = input.slice(i + 1, end);
              if (!exprRaw.includes("\n")) {
                const expr = exprRaw.trim();
                if (expr) {
                  if (buffer) {
                    pushText(buffer, ann);
                    buffer = "";
                  }
                  out.push({
                    type: "equation",
                    equation: { expression: expr },
                  });
                  i = end + 1;
                  continue;
                }
              }
            }
          }

          const htmlTagMatch = input
            .slice(i)
            .match(/^<(span|mark)\b([^>]*)>/i);
          if (htmlTagMatch) {
            const tagName = String(htmlTagMatch[1] || "").toLowerCase();
            const attrs = String(htmlTagMatch[2] || "");
            const openTagLen = htmlTagMatch[0].length;
            const closeTag = `</${tagName}>`;
            const closePos = input
              .toLowerCase()
              .indexOf(closeTag, i + openTagLen);

            if (closePos !== -1) {
              const inner = input.slice(i + openTagLen, closePos);

              const dataColorMatch = attrs.match(
                /\bdata-ioto-color\s*=\s*["']([^"']+)["']/i,
              );
              const dataNotionColorMatch = attrs.match(
                /\bdata-notion-color\s*=\s*["']([^"']+)["']/i,
              );
              const styleMatch = attrs.match(/\bstyle\s*=\s*["']([^"']+)["']/i);

              let color = "";
              if (dataColorMatch) {
                color = normalizeNotionColor(dataColorMatch[1]);
              }
              if (!color && dataNotionColorMatch) {
                color = normalizeNotionColor(dataNotionColorMatch[1]);
              }
              if (!color && styleMatch) {
                const style = styleMatch[1] || "";
                const bg = parseStyleColor(style, "background-color");
                const fg = parseStyleColor(style, "color");
                if (bg) {
                  color = normalizeNotionColor(bg, true);
                }
                if (!color && fg) {
                  color = normalizeNotionColor(fg, false);
                }
              }
              if (!color && tagName === "mark") {
                color = "yellow_background";
              }

              if (color) {
                if (buffer) {
                  pushText(buffer, ann);
                  buffer = "";
                }
                parseInline(inner, mergeAnn(ann, { color }));
                i = closePos + closeTag.length;
                continue;
              }
            }
          }

          if (input.startsWith("==", i) && !isEscapedAt(input, i)) {
            const end = findClosing(input, "==", i + 2);
            if (end !== -1) {
              const inner = input.slice(i + 2, end);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { color: "yellow_background" }));
              i = end + 2;
              continue;
            }
          }

          if (input.startsWith("~~", i) && !isEscapedAt(input, i)) {
            const end = findClosing(input, "~~", i + 2);
            if (end !== -1) {
              const inner = input.slice(i + 2, end);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { strikethrough: true }));
              i = end + 2;
              continue;
            }
          }

          if (/^<u>/i.test(input.slice(i))) {
            const openMatch = input.slice(i).match(/^<u>/i);
            const closeIndex = input.toLowerCase().indexOf("</u>", i + 3);
            if (openMatch && closeIndex !== -1) {
              const inner = input.slice(i + openMatch[0].length, closeIndex);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { underline: true }));
              i = closeIndex + 4;
              continue;
            }
          }

          if (input.startsWith("**", i) && !isEscapedAt(input, i)) {
            const end = findClosing(input, "**", i + 2);
            if (end !== -1) {
              const inner = input.slice(i + 2, end);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { bold: true }));
              i = end + 2;
              continue;
            }
          }

          if (input.startsWith("__", i) && !isEscapedAt(input, i)) {
            const end = findClosing(input, "__", i + 2);
            if (end !== -1) {
              const inner = input.slice(i + 2, end);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { bold: true }));
              i = end + 2;
              continue;
            }
          }

          if ((ch === "*" || ch === "_") && !isEscapedAt(input, i)) {
            const marker = ch;
            if (input[i + 1] === marker) {
              buffer += marker;
              i++;
              continue;
            }

            const prev = i > 0 ? input[i - 1] : "";
            const next = i + 1 < input.length ? input[i + 1] : "";
            if (isWhitespace(next)) {
              buffer += marker;
              i++;
              continue;
            }
            if (marker === "_" && isWordChar(prev) && isWordChar(next)) {
              buffer += marker;
              i++;
              continue;
            }

            const end = (() => {
              let j = i + 1;
              while (j < input.length) {
                if (input[j] === marker && !isEscapedAt(input, j)) {
                  const before = input[j - 1] || "";
                  const after = input[j + 1] || "";
                  if (isWhitespace(before)) {
                    j++;
                    continue;
                  }
                  if (marker === "_" && isWordChar(before) && isWordChar(after)) {
                    j++;
                    continue;
                  }
                  return j;
                }
                j++;
              }
              return -1;
            })();

            if (end !== -1) {
              const inner = input.slice(i + 1, end);
              if (buffer) {
                pushText(buffer, ann);
                buffer = "";
              }
              parseInline(inner, mergeAnn(ann, { italic: true }));
              i = end + 1;
              continue;
            }
          }

          buffer += ch;
          i++;
        }

        if (buffer) {
          pushText(buffer, ann);
        }
      };

      parseInline(s, baseAnnotations);
      return out;
    }
  };
}

module.exports = IOTONotionInlineRichText;

