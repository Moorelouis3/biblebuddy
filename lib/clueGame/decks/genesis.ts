import type { ClueCard } from "../types";
import { GENESIS_PEOPLE } from "./genesisPeople";
import { GENESIS_PLACES_KEYWORDS } from "./genesisPlacesKeywords";

/**
 * The Genesis Beta deck: 52 cards, 25 People, 15 Places and 12 Keywords, in
 * the numbered roster order on the Notion page. The first five clue sets came
 * from Louis's card mockups (2026-11-22); Adam uses his revised digital clues.
 *
 * Art: public/games/clue/genesis/art/<artKey(id)>-m.webp and -r.webp, from
 * the Drive folder "Bible Clue Game → Genesis" (genesis-manifest.json), brought
 * in by number with scripts/clue-game-art.ts. A card with `art: {}` gets a neutral
 * fallback. All 52 have art since 2026-11-22 (scripts/clue-game-art.ts).
 */
export const GENESIS_CARDS: ClueCard[] = [...GENESIS_PEOPLE, ...GENESIS_PLACES_KEYWORDS];
