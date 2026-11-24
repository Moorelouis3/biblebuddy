# Prompt for ChatGPT: redo the backgrounds that do not match (Exodus, Leviticus, 1 Chronicles)

Made 2026-11-24 from an audit of all 111 live board backgrounds. Louis: "a lot of the
boards in match for exodus levetiucus or more have these bad bg backgrounds that dont
match the style". The PDF version (docs/match-prompts/Match-Style-Redo.pdf) has the
reference pictures inside it; give ChatGPT the PDF and say "do Part 1" (then Part 2,
then Part 3), one part per chat so the style does not drift.

What the audit found. About 75 of the 111 boards share one look: warm golden
storybook painting, Bible people in the scene, rich but calm colours (Genesis 3-11,
Numbers through 2 Samuel). Three groups do not:

- **Exodus 01, 03, 04, 05, 06, 07, 09, 10, 11, 12**: a cartoon baby with a Pixar face,
  dark night and storm scenes, a cartoon frog, bright turquoise water, and close-ups of
  objects (tablets, golden calf, lampstand) on plain or white grounds instead of a scene.
- **Leviticus 01-10**: almost empty sand with a thin strip of scenery at the top. They
  were redone on 2026-11-23 with the "people only small and far away" rule, which
  overshot.
- **1 Chronicles 01-10**: the same empty-sand look, from the same rule in the book PDFs.

Exodus 02 (burning bush) and 08 (Mount Sinai) are fine and stay.

---

## The look to copy

The reference pictures in this PDF are finished Bible Buddy Match backgrounds. **Every new
background must look like it was painted by the same artist on the same day.**

1. **A real Bible scene with its people in it**, like the references: warm golden
   storybook painting, soft detailed faces, robes in rust, cream, purple and blue,
   hills, olive trees, stone and sky. People can be large in the scene, like David
   with his sling or Ruth in the field.
2. **Not a cartoon.** No Pixar or Disney faces, no big cartoon eyes, no cartoon animals
   with faces. Painted, gentle and real.
3. **Warm golden light**, morning or evening haze. **No** dark night or storm scenes,
   **no** bright turquoise water, **no** neon or toy-bright colours.
4. **A whole scene, never a close-up of one object** on a plain or white ground. If the
   story is about an object (the tablets, the Ark, the calf), show it in its place
   with people around it.
5. **Not empty.** Never a big plain field of sand. The scene fills the picture.
6. Gentle and hopeful. No blood, no bodies, no violence: judgment is shown as distant
   smoke or a sky growing dark far away.
7. No text, buttons, UI or frames.

For each board below make **`background-phone.png` at 1080x2340** and
**`background-desktop.png` at 1920x1080** (the same scene, wider), and put them in that
board's existing folder in Drive, replacing the old files with the same names. **Change
nothing else**: not the tiles, not `board-config.json`, not the win screens, not the map.

Before delivering, put each new background next to the reference pictures. If it looks
like a different artist, a cartoon, or an empty field, paint it again.

## Part 1: Exodus (10 boards, folder `Exodus`)

| Folder | Scripture | The scene |
|---|---|---|
| `01-Moses-in-the-Basket` | Exodus 1-2 | Pharaoh's daughter and her maids at the edge of the Nile among tall reeds, lifting the reed basket from the water; Miriam watching from the rushes; Egyptian buildings and palms behind. A painted baby, not a cartoon. |
| `03-Let-My-People-Go` | Exodus 5-7:13 | Moses and Aaron standing before Pharaoh on his steps in a warm sandstone hall; Hebrew brickmakers with straw and bricks seen through the columns. |
| `04-The-Plagues-of-Egypt` | Exodus 7:14-10:29 | Moses with his staff raised on a riverbank at evening; the Nile darker in the distance, a few frogs on the stones, a hazy sky growing dim far away. Warm, not stormy. |
| `05-The-First-Passover` | Exodus 11-13:16 | A Hebrew family inside their home at golden lamplight, sandals on and staffs in hand, unleavened bread and a cup on the table, the doorway marked; ready to leave. Warm and hopeful, not dark. |
| `06-Across-the-Red-Sea` | Exodus 13:17-15:21 | Israel walking through the sea on dry ground at dawn, the walls of water in deep green-blue painted softly (not turquoise), Moses at the front with his staff, Miriam with her tambourine on the far shore. |
| `07-Through-the-Wilderness` | Exodus 15:22-18:27 | The camp in the wilderness at morning, families gathering white manna from the ground into baskets, quail in the scrub, Moses striking the rock with water flowing. |
| `09-Plans-for-the-Tabernacle` | Exodus 25-31 | Bezalel and the craftsmen at work in the camp: weaving blue and purple cloth, shaping gold, the lampstand being finished, the people bringing gifts. A scene with people, not a table of objects. |
| `10-The-Golden-Calf` | Exodus 32 | Moses coming down the mountain path holding the tablets, looking toward the camp below where the golden calf stands among the people. Mountain and camp in warm light. |
| `11-New-Tablets` | Exodus 33-34 | Moses alone on Mount Sinai at dawn with two new stone tablets, his face shining softly, the camp tiny far below, warm cloud on the peak. |
| `12-The-Tabernacle` | Exodus 35-40 | The finished Tabernacle in the middle of the camp, the cloud resting over it, priests at the bronze altar and families watching from their tents. Seen from outside, in its setting, not on white. |

## Part 2: Leviticus (10 boards, folder `Leviticus`)

| Folder | Scripture | The scene |
|---|---|---|
| `01-The-Burnt-Offering` | Leviticus 1 | A man bringing a lamb to the bronze altar in front of the Tabernacle, a priest receiving it, smoke rising, the camp around them. |
| `02-Grain-and-Peace-Offerings` | Leviticus 2-3 | A woman carrying a basket of flat bread and grain to the priest, a small jar of oil and frankincense beside her, the Tabernacle behind. |
| `03-Aaron-Made-Priest` | Leviticus 8 | Moses pouring anointing oil on Aaron's head, Aaron in his priestly robes and jewelled breastplate, his sons beside him, the people watching. |
| `04-Fire-from-the-LORD` | Leviticus 9 | Aaron with his hands raised in blessing as fire comes down on the altar, the people bowing with joy around the Tabernacle court. |
| `05-Clean-and-Unclean` | Leviticus 11 | Moses teaching a family beside the camp: sheep and a goat nearby, fish in a stream, birds in an olive tree. Calm and real, no cartoon animals. |
| `06-The-Day-of-Atonement` | Leviticus 16 | Aaron in plain white linen with incense, the Tabernacle behind him; a goat being led away into the far wilderness. |
| `07-Love-Your-Neighbor` | Leviticus 19 | The edge of a wheat field left for the poor: a widow and a child gathering grain while the farmer and his family greet them. |
| `08-The-Feasts-of-the-LORD` | Leviticus 23 | Families building booths of branches across the camp at evening, lamps glowing, children carrying palm branches, a priest with a silver trumpet. |
| `09-The-Year-of-Jubilee` | Leviticus 25 | A priest blowing the ram's horn on a hill above the camp at sunrise, families below returning to their fields with joy. |
| `10-Blessings-for-Obedience` | Leviticus 26 | Gentle rain just ending over green fields and vineyards, a family harvesting grapes and wheat, the sun breaking through. |

## Part 3: 1 Chronicles (10 boards, folder `1 Chronicles`)

| Folder | Scripture | The scene |
|---|---|---|
| `01-The-Family-of-Israel` | 1 Chronicles 1-9 | An old father telling his children and grandchildren their family history under an olive tree, a scroll open on his knees, the hills of Israel behind. |
| `02-The-Well-of-Bethlehem` | 1 Chronicles 11 | Three of David's mighty men at the well by Bethlehem's gate at evening, drawing water in a clay jar; the town on the hill behind. Warm dusk, not night. |
| `03-The-Ark-Brought-Home` | 1 Chronicles 15 | The Levites carrying the golden Ark on poles up the road to Jerusalem, David dancing in front, musicians and the crowd rejoicing. |
| `04-A-Song-of-Thanks` | 1 Chronicles 16 | Asaph and the Levites singing with harps and cymbals before the tent of the Ark in Jerusalem, the people listening. |
| `05-The-Threshing-Floor` | 1 Chronicles 21 | David building an altar on Ornan's threshing floor on the hilltop, Ornan and his sons with the oxen and wheat nearby, Jerusalem below. |
| `06-Gathering-for-the-Temple` | 1 Chronicles 22 | Workers stacking cut stone, cedar beams and bronze in Jerusalem, David showing young Solomon the gathered materials. |
| `07-The-Singers-and-Harps` | 1 Chronicles 25 | Rows of singers and musicians with harps, lyres and cymbals, practising together in a courtyard in Jerusalem. |
| `08-The-Gatekeepers` | 1 Chronicles 26 | Gatekeepers in robes standing watch at great wooden gates of Jerusalem in the morning, the city behind them. |
| `09-The-Plans-for-the-Temple` | 1 Chronicles 28 | Old King David handing Solomon the scroll of the Temple plans in front of the leaders of Israel. |
| `10-Davids-Last-Prayer` | 1 Chronicles 29 | David praying with his arms raised before all the people, who bring gifts of gold and silver, Jerusalem in golden evening light. |
