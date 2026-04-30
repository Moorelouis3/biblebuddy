import { BIBLE_KEYWORDS_LIST } from "./bibleKeywordsList";
import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";
import { BIBLE_PLACES_LIST } from "./biblePlacesList";
import { bibleBuddyTvTitles } from "./bibleBuddyTvContent";

export type MentionCatalogItem = {
  key: string;
  label: string;
  href: string;
  kind:
    | "devotional"
    | "book"
    | "chapter"
    | "person"
    | "place"
    | "keyword"
    | "reading_plan"
    | "series"
    | "tv_title"
    | "user";
  searchText: string;
};

type DynamicMentionRow = {
  id: string;
  title: string;
};

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
  "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
  "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John",
  "2 John", "3 John", "Jude", "Revelation",
] as const;

const BIBLE_BOOK_CHAPTER_COUNTS: Record<(typeof BIBLE_BOOKS)[number], number> = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Solomon": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22,
};

const STATIC_READING_PLANS: Array<{ label: string; href: string }> = [
  { label: "Bible in One Year", href: "/reading-plans/bible-in-one-year" },
  { label: "The Bible Buddy Reading Plan", href: "/reading-plans/bible-buddy" },
];

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function slugifyLoose(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function toBibleBookSegment(book: string) {
  return encodeURIComponent(book.toLowerCase());
}

function buildStaticMentions() {
  const items: MentionCatalogItem[] = [];
  const seen = new Set<string>();

  function add(item: Omit<MentionCatalogItem, "searchText">) {
    const key = `${item.kind}:${item.label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    items.push({
      ...item,
      searchText: normalizeSearchText(item.label),
    });
  }

  BIBLE_BOOKS.forEach((book) => {
    add({
      key: `book:${book}`,
      label: book,
      href: `/reading/books/${encodeURIComponent(book.toLowerCase())}?open=true`,
      kind: "book",
    });

    const totalChapters = BIBLE_BOOK_CHAPTER_COUNTS[book];
    for (let chapter = 1; chapter <= totalChapters; chapter += 1) {
      add({
        key: `chapter:${book}:${chapter}`,
        label: `${book} ${chapter}`,
        href: `/Bible/${toBibleBookSegment(book)}/${chapter}`,
        kind: "chapter",
      });
    }
  });

  STATIC_READING_PLANS.forEach((plan) => {
    add({
      key: `reading_plan:${plan.label}`,
      label: plan.label,
      href: plan.href,
      kind: "reading_plan",
    });
  });

  BIBLE_PEOPLE_LIST.forEach((person) => {
    add({
      key: `person:${person.name}`,
      label: person.name,
      href: `/people-in-the-bible?person=${encodeURIComponent(person.name)}`,
      kind: "person",
    });
  });

  BIBLE_PLACES_LIST.forEach((place) => {
    add({
      key: `place:${place.name}`,
      label: place.name,
      href: `/places-in-the-bible?place=${encodeURIComponent(place.name)}`,
      kind: "place",
    });
  });

  BIBLE_KEYWORDS_LIST.forEach((keyword) => {
    const term = keyword.term.trim();
    if (!term) return;
    add({
      key: `keyword:${term}`,
      label: term,
      href: `/keywords-in-the-bible?keyword=${encodeURIComponent(term)}`,
      kind: "keyword",
    });
  });

  bibleBuddyTvTitles.forEach((title) => {
    add({
      key: `tv_title:${title.id}`,
      label: title.title,
      href: `/biblebuddy-tv/shows/${title.slug}`,
      kind: "tv_title",
    });
  });

  return items;
}

const STATIC_MENTION_CATALOG = buildStaticMentions();

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function loadGroupPostMentions(
  supabaseClient: any,
  groupId?: string | null,
) {
  const items = [...STATIC_MENTION_CATALOG];
  const seenUserIds = new Set<string>();

  const { data: userProfiles, error: userProfilesError } = await supabaseClient
    .from("profile_stats")
    .select("user_id, display_name, username")
    .or("display_name.not.is.null,username.not.is.null")
    .order("display_name", { ascending: true });

  if (userProfilesError) {
    throw new Error(userProfilesError.message || "Could not load people for mentions.");
  }

  (userProfiles || []).forEach((profile: { user_id: string; display_name: string | null; username: string | null }) => {
    if (!profile.user_id || seenUserIds.has(profile.user_id)) return;
    const label = profile.display_name?.trim() || profile.username?.trim();
    if (!label) return;
    seenUserIds.add(profile.user_id);
    items.push({
      key: `user:${profile.user_id}`,
      label,
      href: `/profile/${profile.user_id}`,
      kind: "user",
      searchText: normalizeSearchText(
        [label, profile.username || "", profile.display_name || "", label.replace(/\s+/g, "")]
          .filter(Boolean)
          .join(" "),
      ),
    });
  });

  const { data: devotionals, error: devotionalError } = await supabaseClient
    .from("devotionals")
    .select("id, title")
    .order("title", { ascending: true });

  if (devotionalError) {
    throw new Error(devotionalError.message || "Could not load devotionals for mentions.");
  }

  (devotionals || []).forEach((devotional: DynamicMentionRow) => {
    items.push({
      key: `devotional:${devotional.id}`,
      label: devotional.title,
      href: `/devotionals/${devotional.id}`,
      kind: "devotional",
      searchText: normalizeSearchText(`${devotional.title} devotional`),
    });
  });

  if (groupId) {
    const { data: seriesRows, error: seriesError } = await supabaseClient
      .from("group_series")
      .select("id, title")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (seriesError) {
      throw new Error(seriesError.message || "Could not load series for mentions.");
    }

    (seriesRows || []).forEach((series: DynamicMentionRow) => {
      items.push({
        key: `series:${series.id}`,
        label: `${series.title} Series`,
        href: `/study-groups/${groupId}/series`,
        kind: "series",
        searchText: normalizeSearchText(`${series.title} series bible series`),
      });
    });
  }

  return items;
}

export function filterMentionCatalog(items: MentionCatalogItem[], query: string, limit = 8) {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const filtered = tokens.length === 0
    ? items
    : items.filter((item) => tokens.every((token) => item.searchText.includes(token)));

  return filtered.slice(0, limit);
}

export function linkMentionItemsInHtml(html: string, items: MentionCatalogItem[]) {
  if (!html.trim() || items.length === 0) return html;

  return [...items]
    .sort((a, b) => b.label.length - a.label.length)
    .reduce((output, item) => {
      const escapedLabel = escapeRegExp(item.label);
      const pattern = new RegExp(
        `(^|[\\s>(])(@${escapedLabel})(?=($|[\\s<.,!?):;]))`,
        "gi",
      );

      return output.replace(
        pattern,
        (_, prefix: string, mentionText: string) =>
          `${prefix}<a href="${item.href}" class="font-semibold text-[#8d5d38] underline underline-offset-2">${mentionText}</a>`,
      );
    }, html);
}

export function getMentionCategoryLabel(kind: MentionCatalogItem["kind"]) {
  switch (kind) {
    case "devotional": return "Devotional";
    case "book": return "Book";
    case "chapter": return "Chapter";
    case "person": return "Person";
    case "place": return "Place";
    case "keyword": return "Keyword";
    case "reading_plan": return "Reading Plan";
    case "series": return "Bible Series";
    case "tv_title": return "BibleBuddy TV";
    case "user": return "Member";
    default: return "Mention";
  }
}

export function getMentionInsertionText(item: MentionCatalogItem) {
  return `@${item.label}`;
}

export function getActiveMentionQuery(editor: any) {
  if (!editor) return null;

  const { from } = editor.state.selection;
  const { $from } = editor.state.selection;
  const textBefore = $from.parent.textBetween(0, $from.parentOffset, "\n", "\n");
  const match = textBefore.match(/(^|\s)@([^\n\r]*)$/);

  if (!match) return null;

  const fullMatch = match[0];
  const atIndex = fullMatch.lastIndexOf("@");
  if (atIndex < 0) return null;

  const fromPos = from - (fullMatch.length - atIndex);
  const query = fullMatch.slice(atIndex + 1);

  return {
    from: fromPos,
    to: from,
    query,
  };
}

// ── Textarea (plain <textarea> / <input>) mention helpers ─────────────────────

/** Returns the active @-query and its start index in `value`, or null. */
export function getActiveMentionQueryFromTextarea(
  value: string,
  selectionStart: number,
): { query: string; atIndex: number } | null {
  const textBefore = value.slice(0, selectionStart);
  const match = textBefore.match(/(^|\s)@([^\n\r]*)$/);
  if (!match) return null;
  const atIndex = textBefore.lastIndexOf("@");
  return { query: match[2], atIndex };
}

/** Inserts a mention item into `value`, replacing the @-query at cursor. */
export function insertMentionIntoTextarea(
  value: string,
  selectionStart: number,
  item: MentionCatalogItem,
): { newValue: string; newCursorPos: number } {
  const textBefore = value.slice(0, selectionStart);
  const atIndex = textBefore.lastIndexOf("@");
  const insertText = `@${item.label} `;
  const newValue = value.slice(0, atIndex) + insertText + value.slice(selectionStart);
  return { newValue, newCursorPos: atIndex + insertText.length };
}

export function insertMentionIntoEditor(editor: any, range: { from: number; to: number }, item: MentionCatalogItem) {
  if (!editor) return;

  editor
    .chain()
    .focus()
    .insertContentAt(
      { from: range.from, to: range.to },
      `<a href="${item.href}" class="font-semibold text-[#8d5d38] underline underline-offset-2">${getMentionInsertionText(item)}</a>&nbsp;`,
    )
    .run();
}

type MentionTextSegment =
  | { type: "text"; text: string }
  | { type: "mention"; text: string; href: string; key: string };

function isMentionBoundaryBefore(char: string | undefined) {
  return !char || /\s|[>(]/.test(char);
}

function isMentionBoundaryAfter(char: string | undefined) {
  return !char || /\s|[<.,!?):;]/.test(char);
}

export function splitTextWithMentions(text: string, items: MentionCatalogItem[]): MentionTextSegment[] {
  if (!text || items.length === 0) {
    return [{ type: "text", text }];
  }

  const sortedItems = [...items].sort((a, b) => b.label.length - a.label.length);
  const segments: MentionTextSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    if (text[cursor] !== "@" || !isMentionBoundaryBefore(text[cursor - 1])) {
      let nextCursor = cursor + 1;
      while (
        nextCursor < text.length &&
        (text[nextCursor] !== "@" || !isMentionBoundaryBefore(text[nextCursor - 1]))
      ) {
        nextCursor++;
      }
      segments.push({ type: "text", text: text.slice(cursor, nextCursor) });
      cursor = nextCursor;
      continue;
    }

    const mentionStart = cursor + 1;
    const matchedItem = sortedItems.find((item) => {
      const candidate = text.slice(mentionStart, mentionStart + item.label.length);
      const nextChar = text[mentionStart + item.label.length];
      return candidate.toLowerCase() === item.label.toLowerCase() && isMentionBoundaryAfter(nextChar);
    });

    if (!matchedItem) {
      segments.push({ type: "text", text: "@" });
      cursor += 1;
      continue;
    }

    const mentionEnd = mentionStart + matchedItem.label.length;
    segments.push({
      type: "mention",
      text: text.slice(cursor, mentionEnd),
      href: matchedItem.href,
      key: matchedItem.key,
    });
    cursor = mentionEnd;
  }

  return segments.filter((segment) => segment.text.length > 0);
}

export function extractMentionedItemsFromText(
  text: string,
  items: MentionCatalogItem[],
  kinds?: MentionCatalogItem["kind"][],
) {
  if (!text || items.length === 0) return [] as MentionCatalogItem[];

  const allowedKinds = kinds ? new Set(kinds) : null;
  const sortedItems = [...items]
    .filter((item) => !allowedKinds || allowedKinds.has(item.kind))
    .sort((a, b) => b.label.length - a.label.length);
  const seen = new Set<string>();
  const matches: MentionCatalogItem[] = [];

  for (let cursor = 0; cursor < text.length; cursor += 1) {
    if (text[cursor] !== "@" || !isMentionBoundaryBefore(text[cursor - 1])) continue;
    const mentionStart = cursor + 1;
    const matchedItem = sortedItems.find((item) => {
      const candidate = text.slice(mentionStart, mentionStart + item.label.length);
      const nextChar = text[mentionStart + item.label.length];
      return candidate.toLowerCase() === item.label.toLowerCase() && isMentionBoundaryAfter(nextChar);
    });

    if (!matchedItem || seen.has(matchedItem.key)) continue;
    seen.add(matchedItem.key);
    matches.push(matchedItem);
  }

  return matches;
}
