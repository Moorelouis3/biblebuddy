const KNOWN_EMOJI_FIXES: Array<[string, string]> = [
  ["ðŸŒŠ", "🌊"],
  ["ðŸž", "🍞"],
  ["ðŸ‹", "🐋"],
  ["ðŸ ", "🏠"],
  ["ðŸ˜¤", "😤"],
  ["ðŸŒ™", "🌙"],
  ["ðŸ’”", "💔"],
  ["ðŸ˜ ", "😠"],
  ["â³", "⏳"],
  ["ðŸ˜ž", "😞"],
  ["ðŸ¤", "🤍"],
  ["ðŸ™", "🙏"],
  ["ðŸ‘¤", "👤"],
  ["ðŸšï¸", "🏚️"],
  ["ðŸª™", "🪙"],
  ["ðŸ”¥", "🔥"],
  ["ðŸ‘´", "👴"],
  ["ðŸ‘¨", "👨"],
  ["ðŸ§”", "🧔"],
  ["ðŸ’¤", "💤"],
  ["ðŸ¤©", "🤩"],
  ["ðŸ˜¡", "😡"],
  ["ðŸ§±", "🧱"],
  ["â›“", "⛓"],
  ["âš–ï¸", "⚖️"],
  ["ðŸ”’", "🔒"],
  ["ðŸš°", "🚰"],
  ["ðŸš¢", "🚢"],
  ["ðŸ›•", "🛕"],
  ["ðŸŒ¾", "🌾"],
  ["ðŸ·", "🍷"],
  ["â˜ ï¸", "☠️"],
  ["ðŸ‘¥", "👥"],
  ["ðŸ‘‘", "👑"],
  ["ðŸ§ ", "🧠"],
  ["ðŸ‘¨â€ðŸ³", "👨‍🍳"],
  ["ðŸ›ï¸", "🏛️"],
  ["ðŸ¥£", "🥣"],
  ["ðŸ©º", "🩺"],
  ["ðŸ“‹", "📋"],
  ["ðŸŒ", "🌍"],
  ["ðŸœï¸", "🏜️"],
  ["ðŸ—¡ï¸", "🗡️"],
  ["ðŸª", "🐪"],
  ["ðŸ•°ï¸", "🕰️"],
  ["ðŸ„", "🐄"],
  ["ðŸ§µ", "🧵"],
  ["ðŸ›", "🛐"],
  ["ðŸ’°", "💰"],
  ["âŒ", "❌"],
];

function normalizeKnownArtifacts(text: string): string {
  let result = text;
  for (const [broken, fixed] of KNOWN_EMOJI_FIXES) {
    result = result.split(broken).join(fixed);
  }
  return result;
}

function addLeadingEmojiIfHelpful(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  const firstCode = trimmed.codePointAt(0) ?? 0;
  if (firstCode > 0x00ff) return trimmed;

  const emojiRules: Array<[RegExp, string]> = [
    [/^work ethic/i, "🛠️"],
    [/^trustworthiness/i, "🤝"],
    [/^false accusation/i, "⚖️"],
    [/^leadership/i, "🏛️"],
    [/^integrity/i, "🙏"],
    [/^commander/i, "👑"],
    [/^captain/i, "⚔️"],
    [/^foreign /i, "🌍"],
    [/^betrayed/i, "🩸"],
    [/^stripped/i, "👕"],
    [/^(dragged|enslaved|slave|chains?)/i, "⛓️"],
    [/^sold/i, "💰"],
    [/^private affairs/i, "🏠"],
    [/^(household valuables|finances|resources|profit)/i, "💰"],
    [/^(internal operations|logistics|storage)/i, "📦"],
    [/^(servant assignments|discipline|supervised)/i, "👥"],
    [/^(order|wise|wisdom)/i, "🧠"],
  ];

  for (const [pattern, emoji] of emojiRules) {
    if (pattern.test(trimmed)) {
      return `${emoji} ${trimmed}`;
    }
  }

  return trimmed;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function applyInlineHtml(text: string): string {
  let inner = escapeHtml(normalizeKnownArtifacts(text));
  inner = inner.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  inner = inner.replace(/\*([^*<\n]+?)\*/g, "<em>$1</em>");
  return inner;
}

const emojiTokenPattern =
  /(?:\d\uFE0F?\u20E3|[\p{Extended_Pictographic}\p{Emoji_Presentation}](?:\uFE0F|\uFE0E)?(?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}](?:\uFE0F|\uFE0E)?)*)/gu;
const leadingEmojiPattern = /^\s*(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}]|\d\uFE0F?\u20E3)/u;

function splitInlineEmojiList(text: string): string[] {
  const trimmed = normalizeKnownArtifacts(text).trim();
  if (!trimmed || /^[-*]\s+/.test(trimmed) || /^#{1,6}\s+/.test(trimmed)) return [];
  if (/[.!?:;]/.test(trimmed)) return [];

  const matches = Array.from(trimmed.matchAll(emojiTokenPattern));
  if (matches.length < 2) return [];

  const items = matches
    .map((match, index) => {
      const start = match.index ?? 0;
      const end = matches[index + 1]?.index ?? trimmed.length;
      return trimmed.slice(start, end).trim();
    })
    .filter((item) => item.length > 2 && item.length <= 80);

  const coveredText = items.join(" ").replace(/\s+/g, " ").trim();
  const originalText = trimmed.replace(/\s+/g, " ").trim();

  return items.length >= 2 && originalText.startsWith(items[0]) && coveredText.length >= originalText.length - 4
    ? items
    : [];
}

function renderSoftEmojiList(items: string[]): string {
  const listItems = items
    .map((item) => {
      const html = applyInlineHtml(addLeadingEmojiIfHelpful(item.replace(/^[-*]\s+/, "")));
      return `<li style="display:flex;gap:0.5rem;align-items:flex-start;padding:0.15rem 0;font-size:0.875rem;color:#374151;line-height:1.6">` +
        `<span style="min-width:0">${html}</span></li>`;
    })
    .join("");

  return `<ul style="list-style:none;margin:0.5rem 0;padding:0;display:flex;flex-direction:column;gap:0.1rem">${listItems}</ul>`;
}

export function parseSeriesNotesToHTML(intro: string): string {
  const blocks = intro.split("\n\n");
  const parts: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split("\n").map((l) => l.trim());

    const imageMatch = lines.length === 1 ? lines[0].match(/^!\[(.*?)\]\((\/[^)]+)\)$/) : null;
    if (imageMatch) {
      const alt = escapeHtml(imageMatch[1] || "Study image");
      const src = escapeHtml(imageMatch[2]);
      parts.push(
        `<div style="margin:0.85rem 0 1rem 0">` +
          `<img src="${src}" alt="${alt}" style="display:block;width:100%;max-width:680px;margin:0 auto;border-radius:1rem;box-shadow:none;border:none;outline:none;object-fit:cover;background:none" />` +
        `</div>`
      );
      continue;
    }

    const headingMatch = lines.length === 1 ? lines[0].match(/^(#{1,4})\s+(.+)$/) : null;
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = applyInlineHtml(headingMatch[2]);
      const headingTag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
      const style =
        level === 1
          ? "font-size:1.2rem;font-weight:800;color:#111827;margin-top:1.6rem;margin-bottom:0.5rem"
          : level === 2
            ? "font-size:1.05rem;font-weight:800;color:#111827;margin-top:1.5rem;margin-bottom:0.4rem;padding-bottom:0.3rem;border-bottom:2px solid #f3f4f6"
            : "font-size:0.98rem;font-weight:800;color:#1f2937;margin-top:1.15rem;margin-bottom:0.35rem";
      parts.push(
        `<${headingTag} style="${style}">${text}</${headingTag}>`
      );
      continue;
    }

    if (lines.every((l) => l.startsWith("> "))) {
      const quoteLines = lines.map((l) => applyInlineHtml(l.slice(2))).join("<br>");
      parts.push(
        `<div style="border-left:4px solid #f97316;padding:0.6rem 0.8rem;margin:0.5rem 0;background:#fff7ed;border-radius:0 0.5rem 0.5rem 0">` +
          `<p style="font-size:0.875rem;font-style:italic;color:#374151;line-height:1.6;margin:0">${quoteLines}</p>` +
        `</div>`
      );
      continue;
    }

    if (lines.every((l) => l.startsWith("- "))) {
      const items = lines.map((l) => {
        const html = applyInlineHtml(addLeadingEmojiIfHelpful(l.slice(2)));
        return `<li style="display:flex;gap:0.5rem;align-items:flex-start;padding:0.15rem 0;font-size:0.875rem;color:#374151;line-height:1.6">` +
          `<span style="flex-shrink:0;line-height:1.6">&bull;</span><span>${html}</span></li>`;
      }).join("");
      parts.push(`<ul style="list-style:none;margin:0.5rem 0;padding:0;display:flex;flex-direction:column;gap:0.1rem">${items}</ul>`);
      continue;
    }

    if (lines.length === 1) {
      const inlineEmojiItems = splitInlineEmojiList(lines[0]);
      if (inlineEmojiItems.length >= 2) {
        parts.push(renderSoftEmojiList(inlineEmojiItems));
        continue;
      }
    }

    if (lines.length >= 2 && lines.every((l) => leadingEmojiPattern.test(normalizeKnownArtifacts(l)))) {
      parts.push(renderSoftEmojiList(lines));
      continue;
    }

    const firstCode = trimmed.codePointAt(0) ?? 0;
    if (lines.length === 1 && firstCode > 0x00ff) {
      const html = applyInlineHtml(lines[0]);
      parts.push(
        `<p style="font-size:0.875rem;font-weight:600;color:#1f2937;padding:0.25rem 0">${html}</p>`
      );
      continue;
    }

    const paraHtml = lines.map((l) => applyInlineHtml(l)).join("<br>");
    parts.push(
      `<p style="font-size:0.875rem;color:#374151;line-height:1.7;margin:0">${paraHtml}</p>`
    );
  }

  return parts.join("\n");
}
