import { BIBLE_KEYWORDS_LIST } from "./bibleKeywordsList";
import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";
import { BIBLE_PLACES_LIST } from "./biblePlacesList";

export type MentionCatalogItem = {
  key: string;
  label: string;
  href: string;
  kind: "devotional" | "book" | "person" | "place" | "keyword" | "reading_plan" | "series";
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
    case "person": return "Person";
    case "place": return "Place";
    case "keyword": return "Keyword";
    case "reading_plan": return "Reading Plan";
    case "series": return "Series";
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
