import { NextResponse } from "next/server";
import { BIBLE_PEOPLE_LIST } from "../../../../lib/biblePeopleList";
import { BIBLE_PLACES_LIST } from "../../../../lib/biblePlacesList";
import { BIBLE_KEYWORDS_LIST } from "../../../../lib/bibleKeywordsList";

/**
 * One search box over all three reference lists: ~3,200 people, ~2,270
 * places, ~1,100 keywords.
 *
 * Served from here for the same reason /api/study-notes is: the three lists
 * are about 220 KB of data, and importing them into a client component puts
 * every name into the home screen's JavaScript chunk. The home screen has to
 * paint immediately, so the names stay on the server and a search sends back
 * only the handful of rows it matched.
 */

export type ReferenceKind = "person" | "place" | "keyword";

export type ReferenceHit = {
  label: string;
  kind: ReferenceKind;
  href: string;
};

type Candidate = {
  label: string;
  kind: ReferenceKind;
  href: string;
  /** The primary name, lower-cased. */
  name: string;
  /** Other spellings that should also match, lower-cased. */
  aliases: string[];
};

let cachedCandidates: Candidate[] | null = null;

/**
 * Built once per server process. The lists are static module data, so there
 * is nothing to invalidate.
 *
 * Still deduped by kind + name as a backstop. The source lists dedupe themselves
 * on export now, so this no longer has repeats to catch, but it is cheap and it
 * keeps one result row per name no matter what the lists do later. A name that is
 * both a person and a place - Bethel - is two real entries and stays, because
 * they go to different pages and the result row badges which is which.
 */
function getCandidates(): Candidate[] {
  if (cachedCandidates) return cachedCandidates;

  const candidates: Candidate[] = [];
  const seen = new Set<string>();

  function add(candidate: Candidate) {
    const key = `${candidate.kind}:${candidate.name}`;
    if (!candidate.name || seen.has(key)) return;
    seen.add(key);
    candidates.push(candidate);
  }

  BIBLE_PEOPLE_LIST.forEach((person) => {
    const name = person.name.trim();
    add({
      label: name,
      kind: "person",
      href: `/people-in-the-bible?person=${encodeURIComponent(name)}`,
      name: name.toLowerCase(),
      aliases: (person.aliases || []).map((alias) => alias.trim().toLowerCase()).filter(Boolean),
    });
  });

  BIBLE_PLACES_LIST.forEach((place) => {
    const name = place.name.trim();
    add({
      label: name,
      kind: "place",
      href: `/places-in-the-bible?place=${encodeURIComponent(name)}`,
      name: name.toLowerCase(),
      aliases: [],
    });
  });

  BIBLE_KEYWORDS_LIST.forEach((keyword) => {
    const term = keyword.term.trim();
    add({
      label: term,
      kind: "keyword",
      href: `/keywords-in-the-bible?keyword=${encodeURIComponent(term)}`,
      name: term.toLowerCase(),
      aliases: [],
    });
  });

  cachedCandidates = candidates;
  return candidates;
}

/**
 * Lower is better. An exact hit beats a name that starts with the query,
 * which beats a name that merely contains it; shorter labels win ties so
 * "Mary" outranks "Mary the mother of John Mark" when you type "mary".
 *
 * An alias match scores a whole band worse than any primary-name match, so
 * typing "mary" lists every Mary before it offers Joseph, who matches only
 * through his alias "Joseph (husband of Mary)". The row shows the primary
 * name, so an alias hit that outranked a real one would look like a bug.
 */
const ALIAS_PENALTY = 10;

function rankValue(value: string, query: string): number | null {
  if (value === query) return 0;
  if (value.startsWith(query)) return 1;
  if (value.includes(query)) return 2;
  return null;
}

function scoreCandidate(candidate: Candidate, query: string): number | null {
  const direct = rankValue(candidate.name, query);
  if (direct !== null) return direct;

  let best: number | null = null;
  candidate.aliases.forEach((alias) => {
    const rank = rankValue(alias, query);
    if (rank === null) return;
    const penalised = rank + ALIAS_PENALTY;
    if (best === null || penalised < best) best = penalised;
  });

  return best;
}

const MAX_RESULTS = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  // One letter matches thousands of names and tells the reader nothing, so
  // the box stays quiet until there is enough to narrow on. An empty query
  // answers with the real per-kind counts instead, which is how the home
  // screen card labels itself without importing the lists.
  if (query.length < 2) {
    const candidates = getCandidates();
    return NextResponse.json(
      {
        results: [] as ReferenceHit[],
        counts: {
          person: candidates.filter((candidate) => candidate.kind === "person").length,
          place: candidates.filter((candidate) => candidate.kind === "place").length,
          keyword: candidates.filter((candidate) => candidate.kind === "keyword").length,
        },
      },
      { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } },
    );
  }

  const scored: Array<{ hit: ReferenceHit; rank: number; length: number }> = [];

  getCandidates().forEach((candidate) => {
    const rank = scoreCandidate(candidate, query);
    if (rank === null) return;
    scored.push({
      hit: { label: candidate.label, kind: candidate.kind, href: candidate.href },
      rank,
      length: candidate.label.length,
    });
  });

  scored.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    if (a.length !== b.length) return a.length - b.length;
    return a.hit.label.localeCompare(b.hit.label);
  });

  return NextResponse.json(
    {
      results: scored.slice(0, MAX_RESULTS).map((entry) => entry.hit),
      total: scored.length,
    },
    {
      headers: {
        // The lists ship with the build, so a given query cannot go stale
        // between deploys.
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
