import type { ClueCard } from "../types";
import { GENESIS_PEOPLE } from "./genesisPeople";
import { GENESIS_PLACES_KEYWORDS } from "./genesisPlacesKeywords";

/**
 * The Genesis Beta deck: 52 cards, 25 People, 15 Places and 12 Keywords, in
 * the numbered roster order on the Notion page. The first five clue sets came
 * from Louis's card mockups (2026-11-22); Adam uses his revised digital clues.
 *
 * Art: public/games/clue/genesis/art/<id>-mystery.webp and -reveal.webp, from
 * the Drive folder "Bible Clue Game → Genesis" (genesis-manifest.json). A card
 * whose art is still being produced has `art: {}` and the game draws a neutral
 * fallback. Joseph, Beersheba and Joseph's Silver Cup have art as of today.
 */
export const GENESIS_CARDS: ClueCard[] = [...GENESIS_PEOPLE, ...GENESIS_PLACES_KEYWORDS];
