/**
 * The customizable Home (Louis, 2026-11-21): every section of the dashboard
 * is a widget a reader can move, resize, remove and add back, plus widgets
 * for parts of Bible Buddy they use often (a study guide of their choice, Ask
 * Lil Louis, and the rest of the catalogue below).
 *
 * This is the Home screen INSIDE Bible Buddy, on web and in both apps. The
 * iPhone home-screen widgets are a different thing (lib/nativeWidgets.ts).
 *
 * WHAT A LAYOUT IS. An ordered list of { id, kind, size, studyId? }. That is
 * all that is saved: removing a widget takes its entry out of the list and
 * touches nothing else, so no progress, note or bookmark can ever be lost by
 * editing Home.
 *
 * WHERE IT LIVES. The reader's account (auth user_metadata.home_layout), so it
 * follows them between phone and web, with a copy on the device for the first
 * paint (lib/homeLayoutStore.ts). No saved layout means DEFAULT_LAYOUT, which
 * is the dashboard exactly as it was before widgets, in the same order.
 */

import type { MessageKey } from "./i18n/messages/en";

export type WidgetSize = "s" | "m" | "l";

export type WidgetKind =
  // The sections the dashboard already had.
  | "streak"
  | "bible_progress"
  | "level"
  | "verse_of_the_day"
  | "bookshelf"
  | "group_study_today"
  | "quick_reads"
  | "look_it_up"
  | "game_match"
  | "game_trivia"
  | "game_word_search"
  | "game_memory"
  // Added with the widget Home.
  | "study_guide"
  | "ask_lil_louis"
  | "continue_reading"
  | "bible_in_one_year"
  | "study_notes"
  | "saved_verses"
  | "group_countdown"
  | "buddies"
  | "messages"
  | "prayer_requests";

export type WidgetCategory = "daily" | "studies" | "ask" | "saved" | "games" | "community" | "reading";

export type WidgetDefinition = {
  kind: WidgetKind;
  /**
   * The name and the gallery line are message keys, not text: this module has
   * no reader's language to hand. Show them with t(def.nameKey). The English
   * is in lib/i18n/messages/en/home.ts.
   */
  nameKey: MessageKey;
  /** One line in the gallery. */
  descriptionKey: MessageKey;
  icon: string;
  category: WidgetCategory;
  /** The first is the size it is added at. */
  sizes: WidgetSize[];
  /** A study guide can be added once per guide; everything else once. */
  perStudy?: boolean;
};

export const WIDGET_CATEGORIES: Array<{ id: WidgetCategory; labelKey: MessageKey }> = [
  { id: "studies", labelKey: "home.category.studies" },
  { id: "daily", labelKey: "home.category.daily" },
  { id: "ask", labelKey: "home.category.ask" },
  { id: "saved", labelKey: "home.category.saved" },
  { id: "games", labelKey: "home.category.games" },
  { id: "community", labelKey: "home.category.community" },
  { id: "reading", labelKey: "home.category.reading" },
];

export const WIDGETS: Record<WidgetKind, WidgetDefinition> = {
  streak: { kind: "streak", nameKey: "home.widget.streak.name", descriptionKey: "home.widget.streak.description", icon: "🔥", category: "daily", sizes: ["s"] },
  bible_progress: { kind: "bible_progress", nameKey: "home.widget.bibleProgress.name", descriptionKey: "home.widget.bibleProgress.description", icon: "📖", category: "daily", sizes: ["s"] },
  level: { kind: "level", nameKey: "home.widget.level.name", descriptionKey: "home.widget.level.description", icon: "⭐", category: "daily", sizes: ["s"] },
  verse_of_the_day: { kind: "verse_of_the_day", nameKey: "home.widget.verseOfTheDay.name", descriptionKey: "home.widget.verseOfTheDay.description", icon: "✨", category: "daily", sizes: ["l"] },
  bible_in_one_year: { kind: "bible_in_one_year", nameKey: "home.widget.bibleInOneYear.name", descriptionKey: "home.widget.bibleInOneYear.description", icon: "📅", category: "daily", sizes: ["m", "l"] },
  study_guide: { kind: "study_guide", nameKey: "home.widget.studyGuide.name", descriptionKey: "home.widget.studyGuide.description", icon: "📚", category: "studies", sizes: ["m", "s"], perStudy: true },
  bookshelf: { kind: "bookshelf", nameKey: "home.widget.bookshelf.name", descriptionKey: "home.widget.bookshelf.description", icon: "🗂️", category: "studies", sizes: ["l"] },
  group_study_today: { kind: "group_study_today", nameKey: "home.widget.groupStudyToday.name", descriptionKey: "home.widget.groupStudyToday.description", icon: "👥", category: "studies", sizes: ["l"] },
  group_countdown: { kind: "group_countdown", nameKey: "home.widget.groupCountdown.name", descriptionKey: "home.widget.groupCountdown.description", icon: "⏳", category: "studies", sizes: ["m"] },
  continue_reading: { kind: "continue_reading", nameKey: "home.widget.continueReading.name", descriptionKey: "home.widget.continueReading.description", icon: "🔖", category: "studies", sizes: ["m", "s"] },
  ask_lil_louis: { kind: "ask_lil_louis", nameKey: "home.widget.askLilLouis.name", descriptionKey: "home.widget.askLilLouis.description", icon: "💬", category: "ask", sizes: ["m", "s"] },
  look_it_up: { kind: "look_it_up", nameKey: "home.widget.lookItUp.name", descriptionKey: "home.widget.lookItUp.description", icon: "🔎", category: "ask", sizes: ["l"] },
  study_notes: { kind: "study_notes", nameKey: "home.widget.studyNotes.name", descriptionKey: "home.widget.studyNotes.description", icon: "📝", category: "saved", sizes: ["m"] },
  saved_verses: { kind: "saved_verses", nameKey: "home.widget.savedVerses.name", descriptionKey: "home.widget.savedVerses.description", icon: "🔖", category: "saved", sizes: ["m"] },
  // Bible Buddy Match took Scrambled's place on Home on 2026-11-27 (Louis:
  // "remove scramble and bible match"). Scrambled had left the Games tab on
  // the 23rd; sanitizeLayout below turns a saved Scrambled card into this one.
  game_match: { kind: "game_match", nameKey: "home.games.match.title", descriptionKey: "home.widget.gameMatch.description", icon: "💎", category: "games", sizes: ["m"] },
  game_trivia: { kind: "game_trivia", nameKey: "home.games.trivia.title", descriptionKey: "home.widget.gameTrivia.description", icon: "❓", category: "games", sizes: ["m"] },
  game_word_search: { kind: "game_word_search", nameKey: "home.games.wordSearch.title", descriptionKey: "home.widget.gameWordSearch.description", icon: "🧩", category: "games", sizes: ["m"] },
  game_memory: { kind: "game_memory", nameKey: "home.games.memory.title", descriptionKey: "home.widget.gameMemory.description", icon: "🧠", category: "games", sizes: ["m"] },
  buddies: { kind: "buddies", nameKey: "home.widget.buddies.name", descriptionKey: "home.widget.buddies.description", icon: "🤝", category: "community", sizes: ["m"] },
  messages: { kind: "messages", nameKey: "home.widget.messages.name", descriptionKey: "home.widget.messages.description", icon: "✉️", category: "community", sizes: ["s", "m"] },
  prayer_requests: { kind: "prayer_requests", nameKey: "home.widget.prayerRequests.name", descriptionKey: "home.widget.prayerRequests.description", icon: "🙏", category: "community", sizes: ["m"] },
  quick_reads: { kind: "quick_reads", nameKey: "home.widget.quickReads.name", descriptionKey: "home.widget.quickReads.description", icon: "📰", category: "reading", sizes: ["l"] },
};

export type HomeWidget = {
  /** Unique on the board: the kind, or "study:<devotional id>". */
  id: string;
  kind: WidgetKind;
  size: WidgetSize;
  /** Only for kind "study_guide". */
  studyId?: string;
};

export type HomeLayout = { v: 1; items: HomeWidget[] };

const one = (kind: WidgetKind, size?: WidgetSize): HomeWidget => ({ id: kind, kind, size: size ?? WIDGETS[kind].sizes[0] });

/**
 * The dashboard as it was before widgets, top to bottom. Anyone who has never
 * pressed Edit Home sees exactly this.
 */
export const DEFAULT_LAYOUT: HomeLayout = {
  v: 1,
  items: [
    one("streak"),
    one("bible_progress"),
    one("level"),
    one("verse_of_the_day"),
    one("bookshelf"),
    one("group_study_today"),
    one("quick_reads"),
    one("look_it_up"),
    one("game_match"),
    one("game_trivia"),
    one("game_word_search"),
    one("game_memory"),
  ],
};

export function studyWidget(studyId: string, size: WidgetSize = "m"): HomeWidget {
  return { id: `study:${studyId}`, kind: "study_guide", size, studyId };
}

export function newWidget(kind: WidgetKind, size?: WidgetSize): HomeWidget {
  return one(kind, size);
}

/** Whatever was saved, made safe: unknown kinds dropped, sizes checked, no duplicates. */
export function sanitizeLayout(raw: unknown): HomeLayout | null {
  if (!raw || typeof raw !== "object") return null;
  const items = (raw as { items?: unknown }).items;
  if (!Array.isArray(items)) return null;
  const seen = new Set<string>();
  const out: HomeWidget[] = [];
  for (const entry of items) {
    if (!entry || typeof entry !== "object") continue;
    const { kind: savedKind, size, studyId } = entry as Partial<HomeWidget>;
    // Scrambled is gone from Home. Whoever had its card gets Bible Buddy
    // Match in the same spot, instead of a hole where a game used to be.
    const kind = ((savedKind as string) === "game_scrambled" ? "game_match" : savedKind) as WidgetKind | undefined;
    if (!kind || !(kind in WIDGETS)) continue;
    const def = WIDGETS[kind];
    if (def.perStudy && (typeof studyId !== "string" || !studyId)) continue;
    const id = def.perStudy ? `study:${studyId}` : kind;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      kind,
      size: size && def.sizes.includes(size) ? size : def.sizes[0],
      ...(def.perStudy ? { studyId } : {}),
    });
  }
  return { v: 1, items: out };
}

/** The next size this widget comes in, round the list. */
export function nextSize(widget: HomeWidget): WidgetSize {
  const sizes = WIDGETS[widget.kind].sizes;
  const at = sizes.indexOf(widget.size);
  return sizes[(at + 1) % sizes.length];
}

/** Grid columns, out of 6: three smalls to a row, two mediums (one on a phone), large full width. */
export const SIZE_SPAN: Record<WidgetSize, string> = {
  s: "col-span-2",
  m: "col-span-6 sm:col-span-3",
  l: "col-span-6",
};

/** Message keys, like the widget names: t(SIZE_LABEL_KEY[size]). */
export const SIZE_LABEL_KEY: Record<WidgetSize, MessageKey> = { s: "home.size.s", m: "home.size.m", l: "home.size.l" };
