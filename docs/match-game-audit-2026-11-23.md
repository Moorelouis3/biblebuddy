# Bible Buddy Match: game audit (23 November 2026)

What the leading match-3 games do (Candy Crush, Royal Match, Homescapes, Toon Blast, Bejeweled, Best Fiends), what Bible Buddy Match has, what was built today, and what is next. We take only the generic genre mechanics, never another game's names, characters or look.

## What the first day of play says

From 22 November, 14:30, to 23 November (all players, `landing_page_events`):

- 7 players, 49 opens, 78 boards started.
- **58 boards won, 1 lost.** On average a win left **13 of 28 moves** unused (most: 26).
- 158 hints shown (the hint after 10 seconds without a move).
- 109 power-ups made: 45 Light Burst, 41 Pillar of Fire, 16 Trumpet Blast, 7 All Match orb.
- Median visit 84 seconds. Opened on phones (web 23, iPhone app 13) and computers (13).

The game was too easy: every board was a sure win, so a win meant little. That was true with 2 goals; every board has had 3 since this morning.

## Built today (live with the next deploy; in local test mode now)

| What | How it works | Why |
|---|---|---|
| **Power-up combos** | Swap two power-ups together. Light Burst or Pillar with either one: a cross (a whole row and a whole column). Trumpet Blast with Light Burst or Pillar: 3 rows and 3 columns. Two Trumpet Blasts: a 5x5 blast. All Match orb with a power-up: every tile of that kind becomes that power-up and they all go off. | In every big match-3 game the combos are the "wow" moments; before today two power-ups just went off one after the other. The orb combo is the genre's favourite. |
| **The Dove** (new power-up) | Line up four of a kind in a 2x2 square. The Dove flies to a tile the goals still need and takes it and the four around it. Swap it with anything to send it. | The newest and best-loved piece in the genre (a homing piece). It fixes "one piece left and I can't reach it". Uses the existing dove tile art. |
| **The Jubilee** | Win with moves to spare and each spare move (up to 8) becomes a Light Burst or Pillar of Fire that goes off, for bonus points. | The most satisfying ending in the genre, and named for Leviticus 25. |
| **Chain callouts** | Each link of a chain: **Amen! → Hallelujah! → Glory!** Combos have their own: Cross of Light!, Great Trumpet Blast!, Mighty orb combo! | Juice. The faith theme fits the genre's spoken callouts. |
| **Difficulty curve** | Boards 1-6 keep 28 moves (the welcome). After that 25 moves, and **every 7th board is a Hard board with 22 moves**, marked "Hard" on the map and "Hard board" on the board. | The data above. Marked hard boards make a loss feel fair and the win feel earned. |
| **"So close! +5 moves"** | Out of moves with 8 or fewer pieces still needed: five more moves, free, once per try. | The near-miss rescue every big game has, without selling it. |
| Also | Win celebration (confetti, Board complete!, +10 XP on a first win). 3 goals on every board. Back and Settings buttons. Test mode on local (`?board=numbers-03`). | Earlier today. |

## Recommended next (ranked)

1. **Win streak gifts.** Win 1, 2, 3 boards in a row and start the next with 1, 2, 3 free power-ups on the board; a loss resets it. The most proven retention feature in the genre.
2. **Board obstacles (new art needed).** Each also makes a goal type:
   - **Stone blocks**: two hits to break.
   - **Chains**: a locked tile that can't move until it is matched.
   - **Sand or water under the tiles**: clear the tile on top to clear the layer.
   Ask ChatGPT for three overlay pictures (stone block, chain, sand layer) in the tile style.
3. **"Bring it down" goal.** An item (the Ark, the tablets, a basket) travels down the board and must reach the bottom. Story-friendly and well liked.
4. **Stars (1 to 3 by moves left) on the map coins.** A reason to replay a board.
5. **A daily free helper tied to the Bible reading streak.** For example a Staff that breaks one tile, earned by the day's reading. It ties the game to the app's main habit.
6. **A reward for finishing each book.** A verse card, a badge or bonus XP when a book's last board is won. It gives each map an end.
7. **A pressure board now and then:**
   - **Spreading weeds or locusts**: they grow if a move clears none.
   - **An oil lamp countdown**: it must be cleared before it runs out.
8. **More juice.** A short pause and screen shake on combos, and goal pieces flying up to the goal counter.
9. **"Read this chapter" on the story screen.** The link to the Bible chapter only shows on the old win scroll, which no board uses any more.

Left out on purpose: lives and waiting timers (they exist to sell refills), timed boards (Candy Crush removed them), paid boosters, and per-board leaderboards.

## Found along the way

- **46 boards in Deuteronomy, Joshua, Judges, Ruth and 1 Samuel named the wrong book** (ChatGPT wrote "Numbers 3:12-30" for Ehud, Judges 3:12-30). The chapters were right. Fixed, and the import now corrects it and reports it.
- The `verify:levels` check fails on the level-up celebration's opt-out read. It fails the same way without today's changes.

## Sources

King community knowledge base, Candy Crush wiki, Dream Games help pages (Royal Match), Playrix help pages (Homescapes), Medium and Naavik game analyses, Gamezebo and 148apps (Best Fiends), BlueStacks guides.
