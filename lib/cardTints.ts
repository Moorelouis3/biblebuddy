/**
 * The pastel backgrounds the dashboard's carousels rotate through.
 *
 * Louis, 2026-10-17: the shelves "need separate bgs for each banner", so a row
 * of covers reads as a row of cards rather than pictures floating on the page.
 *
 * Every colour here is already somewhere on this dashboard - peach from the
 * Bible Trivia card and the streak chip, blue from Today's Group Study before
 * it went lavender, lavender from From Your Groups, mint from the apps-unlocked
 * banner, rose from the Keywords tile in Look It Up. Nothing new is introduced,
 * which is the whole point: the shelves should look like they belong to the
 * same family as the cards above and below them.
 *
 * Rotated by position, not by content. Tying a colour to a particular book
 * would mean a shelf whose colours jump around as books are finished and the
 * order changes; by position the row always reads left to right in the same
 * order.
 */
export type CardTint = { bg: string; border: string };

export const CARD_TINTS: CardTint[] = [
  { bg: "#fff3e6", border: "#f4dcc8" }, // peach - Bible Trivia, streak chip
  { bg: "#eaf5ff", border: "#dbe7f4" }, // blue
  { bg: "#f5f2ff", border: "#ddd6f3" }, // lavender - From Your Groups
  { bg: "#eafaf0", border: "#bfe4cd" }, // mint - apps unlocked
  { bg: "#fdeded", border: "#f3d2d2" }, // rose - Keywords tile
];

export function cardTint(index: number): CardTint {
  return CARD_TINTS[((index % CARD_TINTS.length) + CARD_TINTS.length) % CARD_TINTS.length];
}
