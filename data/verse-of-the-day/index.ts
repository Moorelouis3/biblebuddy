import { BREAKDOWNS_01_10 } from "./breakdowns-01-10";
import { BREAKDOWNS_11_20 } from "./breakdowns-11-20";
import { BREAKDOWNS_21_30 } from "./breakdowns-21-30";
import type { VerseBreakdownSeed } from "./types";

/** The first month pilot, in scheduled order. Day 1 = index 0. */
export const INITIAL_VERSE_BREAKDOWNS: VerseBreakdownSeed[] = [
  ...BREAKDOWNS_01_10,
  ...BREAKDOWNS_11_20,
  ...BREAKDOWNS_21_30,
];

export type { VerseBreakdownSeed } from "./types";
