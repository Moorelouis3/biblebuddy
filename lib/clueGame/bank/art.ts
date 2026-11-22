/**
 * Card art for question-bank answers that are not one of the 52 deck cards
 * (Louis, 2026-11-22). docs/clue-card-art-needed.md lists what to make;
 * finished pairs go to public/games/clue/genesis/art/<slug>-mystery.webp and
 * <slug>-reveal.webp, and their slugs are added to ART_READY so the game uses
 * them (a missing file must never be asked for, so this list is the switch).
 */

/** Slugs whose mystery and reveal files are in public/games/clue/genesis/art. */
export const ART_READY: string[] = [];

const ART_DIR = "/games/clue/genesis/art";

/** "The Tower of Babel" -> "tower-of-babel". */
export function artSlug(answer: string): string {
  return answer
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/^(the|a|an)\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const NOT_A_THING = /^(it|be|to|he|she|they|i|we|you|because|that|for|not|no|yes|never|all|every|by|in|on|at|with|from|after|before|so|let|go|give|send|bless|spare|kill|make|take|build)\b/i;
const NUMBERS = /\b(one|two|three|four|five|six|seven|eight|nine|ten|twelve|twenty|thirty|forty|fifty|seventy|hundred|thousand|first|second|third|fourth|fifth|sixth|seventh|eighth|day|days|years|times)\b/i;

/** Can this answer be drawn as a picture of a person, place or object? */
export function isDrawable(answer: string, category: string): boolean {
  const a = answer.trim();
  if (/[,;?!“”"()]/.test(a)) return false;
  if (category === "person" || category === "place") return a.split(/\s+/).length <= 4;
  if (a.split(/\s+/).length > 3) return false;
  if (NOT_A_THING.test(a) || NUMBERS.test(a)) return false;
  // Ideas, directions and actions ("Eastward", "Blessed and sanctified", "Enmity") are not pictures.
  if (/(ed|ward|wards|ity|ness|ing|ly|ion)$/i.test(a.split(/\s+/).pop() || "")) return false;
  return true;
}

/** The art for an answer, when it has been made. */
export function artFor(answer: string, category: string, chapter: number): { mystery: string; reveal: string } | null {
  const slug = isDrawable(answer, category) ? artSlug(answer) : `chapter-${String(chapter).padStart(2, "0")}`;
  if (!ART_READY.includes(slug)) return null;
  return { mystery: `${ART_DIR}/${slug}-mystery.webp`, reveal: `${ART_DIR}/${slug}-reveal.webp` };
}
