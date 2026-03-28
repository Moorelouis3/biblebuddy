import { BIBLE_KEYWORDS_LIST } from "./bibleKeywordsList";
import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";
import { BIBLE_PLACES_LIST } from "./biblePlacesList";
import {
  EXTRA_BIBLE_KEYWORD_ALIASES,
  EXTRA_BIBLE_PERSON_ALIASES,
  EXTRA_BIBLE_PLACE_ALIASES,
} from "./bibleReferenceAliases";

export type BibleReferenceType = "people" | "places" | "keywords";

const GENERIC_PLACE_TERMS = new Set([
  "field",
  "fields",
  "town",
  "gate",
  "gates",
  "house",
  "household",
  "road",
  "roads",
  "country",
  "countries",
  "land",
  "lands",
]);

const AMBIGUOUS_SHORT_TERMS = new Set([
  "on",
  "in",
  "at",
  "to",
  "of",
  "is",
  "it",
  "as",
  "an",
  "am",
  "be",
  "do",
  "go",
  "if",
  "my",
  "no",
  "or",
  "so",
  "up",
  "us",
  "we",
]);

function normalizeTerm(term: string): string {
  return term.toLowerCase().trim().replace(/\s+/g, " ");
}

function uniqTerms(terms: string[]): string[] {
  return Array.from(new Set(terms.map(normalizeTerm).filter(Boolean)));
}

const PEOPLE_NAME_MAP = new Map<string, string>();
for (const person of BIBLE_PEOPLE_LIST) {
  PEOPLE_NAME_MAP.set(normalizeTerm(person.name), person.name);
  for (const alias of person.aliases ?? []) {
    PEOPLE_NAME_MAP.set(normalizeTerm(alias), person.name);
  }
}
for (const entry of EXTRA_BIBLE_PERSON_ALIASES) {
  PEOPLE_NAME_MAP.set(normalizeTerm(entry.canonical), entry.canonical);
  for (const alias of entry.aliases) {
    PEOPLE_NAME_MAP.set(normalizeTerm(alias), entry.canonical);
  }
}

const PLACE_NAME_MAP = new Map<string, string>();
for (const place of BIBLE_PLACES_LIST) {
  PLACE_NAME_MAP.set(normalizeTerm(place.name), place.name);
}
for (const entry of EXTRA_BIBLE_PLACE_ALIASES) {
  PLACE_NAME_MAP.set(normalizeTerm(entry.canonical), entry.canonical);
  for (const alias of entry.aliases) {
    PLACE_NAME_MAP.set(normalizeTerm(alias), entry.canonical);
  }
}

const KEYWORD_NAME_MAP = new Map<string, string>();
for (const keyword of BIBLE_KEYWORDS_LIST) {
  KEYWORD_NAME_MAP.set(normalizeTerm(keyword.term), keyword.term.trim());
}
for (const entry of EXTRA_BIBLE_KEYWORD_ALIASES) {
  KEYWORD_NAME_MAP.set(normalizeTerm(entry.canonical), entry.canonical);
  for (const alias of entry.aliases) {
    KEYWORD_NAME_MAP.set(normalizeTerm(alias), entry.canonical);
  }
}

export function resolveBibleReference(type: BibleReferenceType, clickedTerm: string): string {
  const normalized = normalizeTerm(clickedTerm);
  if (!normalized) return clickedTerm;

  if (type === "people") {
    return PEOPLE_NAME_MAP.get(normalized) ?? clickedTerm;
  }

  if (type === "places") {
    return PLACE_NAME_MAP.get(normalized) ?? clickedTerm;
  }

  return KEYWORD_NAME_MAP.get(normalized) ?? clickedTerm;
}

export function getAutoHighlightPeopleTerms(): string[] {
  return uniqTerms([
    ...BIBLE_PEOPLE_LIST.flatMap((person) => [person.name, ...(person.aliases ?? [])]),
    ...EXTRA_BIBLE_PERSON_ALIASES.flatMap((entry) => entry.aliases),
  ])
    .filter((term) => !(term.length <= 2 && AMBIGUOUS_SHORT_TERMS.has(term)))
    .sort((a, b) => b.length - a.length);
}

export function getAutoHighlightPlaceTerms(): string[] {
  return uniqTerms([
    ...BIBLE_PLACES_LIST.map((place) => place.name),
    ...EXTRA_BIBLE_PLACE_ALIASES.flatMap((entry) => entry.aliases),
  ])
    .filter((term) => !(term.length <= 2 && AMBIGUOUS_SHORT_TERMS.has(term)))
    .filter((term) => !GENERIC_PLACE_TERMS.has(term))
    .sort((a, b) => b.length - a.length);
}

export function getAutoHighlightKeywordTerms(): string[] {
  return uniqTerms([
    ...BIBLE_KEYWORDS_LIST.map((keyword) => keyword.term),
    ...EXTRA_BIBLE_KEYWORD_ALIASES.flatMap((entry) => entry.aliases),
  ])
    .filter((term) => !(term.length <= 2 && AMBIGUOUS_SHORT_TERMS.has(term)))
    .sort((a, b) => b.length - a.length);
}
