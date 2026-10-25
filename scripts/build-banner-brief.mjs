#!/usr/bin/env node
/**
 * The banner brief Louis hands to an image model (Louis, 2026-10-25).
 *
 * Every Bible Buddy banner is 1672x941 with the title set on the left and a
 * photographic scene on the right, and the whole library only looks like one
 * library because that is written down somewhere. This is where it is written
 * down, along with a headline, a palette and a scene for each banner that does
 * not exist yet.
 *
 *   node scripts/build-banner-brief.mjs docs/blog-banner-brief.pdf
 *
 * Re-run it when the Christian Holidays queue changes. The slugs here are
 * checked against scripts/holiday-blog-queue.mjs and lib/blogContent.ts: a
 * filename that matches no real article is a banner nobody will ever see.
 */
import PDFDocument from "pdfkit";
import fs from "node:fs";

const NIGHT = "Night / gold";
const DAY = "Day / navy + warm orange";

// file, headline lines, subtitle, palette, scene
const NOW = [
  ["thanksgiving-when-the-year-has-been-hard", ["GRATITUDE WHEN", "THE YEAR HAS", "BEEN HARD"], "WHAT THANKSGIVING REALLY MEANS", DAY,
    "A plain kitchen table at first light. One mug, an open Bible, a folded pair of older hands. One empty chair across the table, slightly out of focus. Quiet, not sad."],
  ["what-the-first-christmas-actually-looked-like", ["WHAT THE FIRST", "CHRISTMAS ACTUALLY", "LOOKED LIKE"], "", NIGHT,
    "A rough stone lower room, straw on the floor, a stone feeding trough. One oil lamp. Mary and Joseph exhausted, ordinary clothes, no halos. Crowded Bethlehem rooftops through the doorway."],
  ["christmas-day-one-thing-to-carry", ["CHRISTMAS DAY"], "ONE THING TO CARRY INTO TODAY", NIGHT,
    "A shepherd's field at night from the shepherds' eye level. Sheep, a staff, a low fire. Lamplit Bethlehem on the hill beyond and one bright star. Warm and still."],
  ["how-to-read-the-bible-in-a-year-without-quitting", ["READ THE BIBLE", "IN A YEAR"], "WITHOUT QUITTING IN FEBRUARY", DAY,
    "A worn wooden desk with a thick open Bible, a ribbon marker, a mug and a wall calendar with twelve months. A few days ticked, one gap left visible."],
  ["have-they-found-noahs-ark", ["HAVE THEY FOUND", "NOAH'S ARK?"], "WHAT THE EVIDENCE ACTUALLY SHOWS", DAY,
    "The snow line of Mount Ararat under hard daylight. A small survey team with instruments on a ridge, a long boat shaped ground formation below them. Documentary, not dramatic."],
  ["shroud-of-turin-what-the-science-says", ["THE SHROUD", "OF TURIN"], "WHAT THE SCIENCE SAYS", NIGHT,
    "A length of herringbone linen under raking museum light on a dark table, a microscope and gloved hands at the edge of frame. Clinical, reverent, no face rendered."],
  ["laminin-the-cross-shaped-protein", ["LAMININ"], "THE CROSS SHAPED PROTEIN", NIGHT,
    "A scientific molecular model of the laminin protein glowing in a dark lab, cross shape clearly readable, cell tissue imagery softly behind. Teal and gold."],
];

const SCHEDULED = [
  [2, "what-is-reformation-day", ["WHAT IS", "REFORMATION DAY?"], "HISTORY, MEANING, AND WHY OCTOBER 31 MATTERS", NIGHT,
    "A heavy wooden church door in Wittenberg at dusk, a nailed parchment of theses, a hammer resting below, autumn leaves on the step."],
  [2, "what-is-all-saints-day", ["WHAT IS", "ALL SAINTS' DAY?"], "MEANING, HISTORY, AND HOW CHRISTIANS CELEBRATE", NIGHT,
    "The inside of an old church lit by hundreds of candles, stained glass dark above, a few figures standing quietly. Gold on deep blue."],
  [2, "what-is-christmas", ["WHAT IS", "CHRISTMAS?"], "THE BIBLICAL MEANING OF JESUS' BIRTH", NIGHT,
    "A stone trough with swaddling cloth, straw and a single lamp in the foreground, the night sky and one star opening out behind. Reverent, uncluttered."],
  [2, "what-is-the-liturgical-calendar", ["THE LITURGICAL", "CALENDAR"], "A BEGINNER'S GUIDE TO THE CHRISTIAN YEAR", DAY,
    "A circular church year wheel laid on a wooden table, its seasons in purple, white, green and red, with a candle and an open prayer book beside it."],
  [3, "when-does-advent-begin", ["WHEN DOES", "ADVENT BEGIN?"], "DATES, MEANING, AND TRADITIONS", NIGHT,
    "An evergreen Advent wreath on a dark table, one purple candle lit and three unlit, early winter window behind."],
  [3, "what-is-epiphany", ["WHAT IS", "EPIPHANY?"], "THE MEANING OF THREE KINGS' DAY ON JANUARY 6", NIGHT,
    "Three richly dressed travellers and camels on a desert ridge at night following a low bright star toward distant lamplit houses."],
  [3, "what-is-all-souls-day", ["WHAT IS", "ALL SOULS' DAY?"], "CATHOLIC TRADITIONS, PRAYER, AND REMEMBRANCE", NIGHT,
    "A cemetery at dusk with candles set on gravestones, mist between the trees, one figure standing with a hand on a stone. Tender, never ghoulish."],
  [3, "what-does-the-bible-say-about-the-birth-of-jesus", ["WHAT THE BIBLE SAYS", "ABOUT THE BIRTH", "OF JESUS"], "", NIGHT,
    "An open ancient scroll and a lamp in the foreground, the Bethlehem night scene softly behind it as if read off the page."],
  [4, "is-christmas-pagan", ["IS CHRISTMAS", "PAGAN?"], "WHAT HISTORY ACTUALLY TELLS US", NIGHT,
    "A split scene: a Roman winter festival in torchlight on one side, an early Christian gathering with a single lamp on the other, a hard line between them."],
  [4, "when-is-saint-nicholas-day", ["SAINT", "NICHOLAS DAY"], "WHO HE WAS AND WHY DECEMBER 6 IS CELEBRATED", NIGHT,
    "A fourth century bishop in red and gold vestments placing coins quietly at a poor family's door at night. Historical, not Santa."],
  [4, "who-was-saint-martin-of-tours", ["SAINT MARTIN", "OF TOURS"], "THE MEANING OF ST. MARTIN'S DAY", NIGHT,
    "A Roman soldier on horseback cutting his cloak in two with his sword to give half to a beggar at a snowy city gate. Lantern light."],
  [4, "was-jesus-really-born-on-december-25", ["WAS JESUS BORN", "ON DECEMBER 25?"], "WHAT THE EVIDENCE ACTUALLY SHOWS", DAY,
    "An old calendar page and an astronomical chart on a desk with a magnifier and a dated manuscript. Investigative, no nativity imagery."],
  [5, "what-is-the-feast-of-christ-the-king", ["THE FEAST OF", "CHRIST THE KING"], "MEANING AND BIBLICAL SIGNIFICANCE", NIGHT,
    "A crown of thorns resting on a stone throne step, light breaking from above, a distant crowd silhouette. Majestic and sober."],
  [5, "most-important-christian-holidays", ["THE MOST IMPORTANT", "CHRISTIAN HOLIDAYS"], "AND WHAT THEY ALL MEAN", DAY,
    "A flat lay of the church year: Advent wreath, palm branch, empty tomb stone, flame, laid in a row on linen with seasonal colours."],
  [5, "what-is-totensonntag", ["WHAT IS", "TOTENSONNTAG?"], "GERMANY'S SUNDAY OF REMEMBRANCE EXPLAINED", NIGHT,
    "A German village churchyard in late November, bare trees, wreaths and candles on graves, grey light and low mist."],
  [5, "what-is-christmas-eve", ["WHAT IS", "CHRISTMAS EVE?"], "HISTORY, MEANING, AND CHRISTIAN TRADITIONS", NIGHT,
    "A candlelit church interior filling for a midnight service, snow visible through the door, people holding small candles."],
  [6, "what-is-a-holy-day-of-obligation", ["A HOLY DAY", "OF OBLIGATION"], "CATHOLIC MEANING AND REQUIREMENTS", DAY,
    "A Catholic parish church exterior on a bright weekday morning, doors open, a few people going in, a noticeboard of mass times."],
  [6, "who-was-saint-andrew", ["WHO WAS", "SAINT ANDREW?"], "THE APOSTLE'S STORY AND FEAST DAY", DAY,
    "A fisherman hauling nets on the Sea of Galilee at dawn, boat timbers and wet rope in close detail, a diagonal cross shape in the rigging."],
  [6, "why-is-christmas-on-january-7", ["CHRISTMAS ON", "JANUARY 7"], "WHY SOME CHRISTIANS CELEBRATE LATER", NIGHT,
    "An Orthodox church with onion domes under snow at night, candlelight through the windows, a procession with icons."],
  [6, "what-is-christmastide", ["WHAT IS", "CHRISTMASTIDE?"], "THE TWELVE DAYS OF CHRISTMAS EXPLAINED", NIGHT,
    "Twelve candles in a line on a long table, the first few burned down and the last still tall, greenery and winter fruit between them."],
  [7, "catholic-vs-protestant-church-calendars", ["CATHOLIC AND", "PROTESTANT CALENDARS"], "WHAT IS ACTUALLY DIFFERENT", DAY,
    "Two church year wheels side by side on a desk, one with more feast days marked, a pen and reading glasses between them."],
  [7, "what-is-the-immaculate-conception", ["THE IMMACULATE", "CONCEPTION"], "WHAT CATHOLICS ACTUALLY BELIEVE", NIGHT,
    "A marian statue in blue and white in a candlelit side chapel, white lilies at the base, soft blue light from a window."],
  [7, "what-is-the-solemnity-of-mary", ["SOLEMNITY OF MARY,", "MOTHER OF GOD"], "WHY JANUARY 1 MATTERS TO CATHOLICS", NIGHT,
    "Mary holding the infant in a quiet stone room on the eighth day, a single window of cold new year light. Gold and deep blue."],
  [7, "was-jesus-born-in-a-stable", ["WAS JESUS BORN", "IN A STABLE?"], "WHAT THE BIBLE ACTUALLY SAYS", NIGHT,
    "A first century village house with the family room above and the animal space below, a stone manger cut into the floor. Architectural and honest."],
  [8, "most-important-catholic-holy-days", ["THE MOST IMPORTANT", "CATHOLIC HOLY DAYS"], "A YEAR OF OBSERVANCE EXPLAINED", DAY,
    "A liturgical calendar wall chart in a sacristy with vestments in four colours hanging beside it."],
  [8, "saint-nicholas-facts-and-legends", ["SAINT NICHOLAS:", "FACT AND LEGEND"], "WHAT HISTORY CAN ACTUALLY SHOW", NIGHT,
    "A historical bishop figure on the left of frame fading into a modern red suited silhouette on the right, with the division obvious."],
  [8, "what-is-candlemas", ["WHAT IS", "CANDLEMAS?"], "THE FEAST OF THE PRESENTATION OF JESUS", NIGHT,
    "A procession of hands holding lit candles inside a stone church at dawn, blue early light at the windows."],
  [8, "all-saints-day-vs-all-souls-day", ["ALL SAINTS' DAY", "AND ALL SOULS' DAY"], "WHAT IS THE DIFFERENCE?", NIGHT,
    "A diptych: a bright church full of candles on one side, a quiet candlelit graveyard on the other, one day apart."],
  [9, "what-is-an-advent-wreath", ["THE ADVENT", "WREATH"], "THE MEANING OF THE FOUR CANDLES", NIGHT,
    "A close evergreen wreath with three purple candles and one pink, two lit, pine needles and a dark wood table."],
  [9, "who-were-the-wise-men", ["WHO WERE", "THE WISE MEN?"], "WHAT THE BIBLE SAYS ABOUT THE MAGI", NIGHT,
    "Robed eastern scholars with star charts and astronomical instruments in a courtyard at night, camels resting behind. Scholars, not kings."],
  [9, "why-some-christians-do-not-celebrate-christmas", ["WHY SOME CHRISTIANS", "DO NOT CELEBRATE", "CHRISTMAS"], "", DAY,
    "A plain meeting house interior with no decoration at all in December, bare windows, an open Bible on a simple table."],
  [9, "who-was-saint-stephen", ["WHO WAS", "SAINT STEPHEN?"], "WHY CHRISTIANS REMEMBER HIM ON DECEMBER 26", NIGHT,
    "A young man in first century dress kneeling outside a city wall at dusk, face lifted to a break of light above. Stones implied, never graphic."],
  [10, "advent-vs-christmas", ["ADVENT AND", "CHRISTMAS"], "WHAT IS THE DIFFERENCE?", NIGHT,
    "A wreath with unlit candles in the foreground and a fully lit nativity scene behind it, the foreground sharp and the background glowing."],
  [10, "who-was-saint-lucy", ["WHO WAS", "SAINT LUCY?"], "THE MEANING OF SAINT LUCY'S DAY", NIGHT,
    "A girl in white with a red sash carrying a tray of candles through a dark Scandinavian winter house at dawn."],
  [10, "what-is-the-feast-of-the-annunciation", ["THE FEAST OF THE", "ANNUNCIATION"], "THE DAY GOD SAID IT FIRST", DAY,
    "A young woman at a doorway in a small Galilean house, dust in a shaft of light, white lilies on the sill. The angel implied by light only."],
  [10, "what-is-the-feast-of-the-holy-family", ["THE FEAST OF THE", "HOLY FAMILY"], "MEANING AND BIBLICAL LESSONS", DAY,
    "A carpenter's workshop in Nazareth, a man working, a woman at the door, a boy sweeping shavings. Ordinary domestic warmth."],
  [11, "solemnity-feast-memorial-difference", ["SOLEMNITY, FEAST", "OR MEMORIAL?"], "WHAT THE RANKS ACTUALLY MEAN", DAY,
    "Three church calendar entries on a page at increasing scale and ornament, with a pen marking the highest."],
  [11, "what-is-gaudete-sunday", ["WHAT IS", "GAUDETE SUNDAY?"], "WHY IS ONE ADVENT CANDLE PINK?", NIGHT,
    "The Advent wreath with the single rose coloured candle lit and glowing warmer than the purple ones beside it."],
  [11, "what-is-the-presentation-of-jesus", ["THE PRESENTATION", "OF JESUS"], "WHAT IT MEANT AND WHY IT MATTERS", NIGHT,
    "An old man in the temple courts holding an infant up into a shaft of light, a pair of doves in a basket at his feet."],
  [11, "what-is-the-feast-of-the-holy-innocents", ["THE HOLY", "INNOCENTS"], "THE BIBLICAL STORY EXPLAINED", NIGHT,
    "Small unlit candles in a dark stone church, one hand lighting the first. Grief handled with restraint, no children depicted."],
  [12, "what-is-a-patron-saint", ["WHAT IS A", "PATRON SAINT?"], "HOW SAINTS ARE CHOSEN AND WHY", NIGHT,
    "A wall of small painted icons of different saints with candles beneath them, one lit directly in front of the viewer."],
  [12, "what-is-an-advent-calendar", ["THE ADVENT", "CALENDAR"], "THE CHRISTIAN MEANING BEHIND THE DOORS", DAY,
    "A handmade wooden Advent calendar with small numbered doors, some open showing scripture slips rather than chocolate."],
  [12, "how-is-epiphany-celebrated-around-the-world", ["EPIPHANY AROUND", "THE WORLD"], "HOW DIFFERENT CHRISTIANS KEEP THE DAY", DAY,
    "A collage of three customs in one frame: a river blessing, a chalked doorway, a ring cake on a table. Bright and varied."],
  [12, "what-is-watch-night", ["WHAT IS", "WATCH NIGHT?"], "CHRISTIAN NEW YEAR'S EVE WORSHIP EXPLAINED", NIGHT,
    "A packed church just before midnight, people standing with heads bowed, a clock on the wall near twelve, candles everywhere."],
  [13, "how-does-the-church-make-a-saint", ["HOW THE CHURCH", "MAKES A SAINT"], "CANONIZATION EXPLAINED", DAY,
    "Documents, seals and a postulator's desk in a Vatican office, a portrait of a candidate propped at the back. Procedural, not mystical."],
  [13, "why-is-advent-purple", ["WHY IS ADVENT", "PURPLE?"], "THE MEANING OF THE LITURGICAL COLORS", DAY,
    "Folded altar cloths in purple, rose, white and green stacked on a sacristy table, rich fabric texture in close focus."],
  [13, "what-is-the-feast-of-the-circumcision", ["THE FEAST OF THE", "CIRCUMCISION"], "JANUARY 1 EXPLAINED", NIGHT,
    "An eighth day naming in a first century home, a scroll with a name being written, lamplight, family gathered. Dignified and plain."],
  [13, "meaning-of-the-twelve-days-of-christmas", ["THE TWELVE DAYS", "OF CHRISTMAS"], "WHAT THEY ACTUALLY MEAN", NIGHT,
    "An old song sheet on a table surrounded by twelve small objects from the verses, candlelight and winter greenery."],
  [14, "what-is-a-feast-day", ["WHAT IS A", "FEAST DAY?"], "WHY THE DATE IS USUALLY A DEATH DAY", NIGHT,
    "A church calendar page with a saint's date circled, a candle beside it, an icon leaning against the wall behind."],
  [14, "who-was-saint-barbara", ["WHO WAS", "SAINT BARBARA?"], "THE FEAST DAY AND THE CHERRY BRANCH", NIGHT,
    "A bare cherry branch in a jug of water on a winter windowsill, a single blossom opening, snow outside, a stone tower beyond."],
  [14, "where-do-christmas-carols-come-from", ["WHERE DO CHRISTMAS", "CAROLS COME FROM?"], "THE BIBLE BEHIND THE SONGS", NIGHT,
    "Carollers with lanterns and old song sheets in a snowy village street at night, warm windows behind them."],
  [14, "what-is-ordinary-time", ["WHAT IS", "ORDINARY TIME?"], "THE LONGEST SEASON OF THE CHURCH YEAR", DAY,
    "A green field path running to a country church in high summer, a green altar cloth echoed in the landscape. Calm and unremarkable on purpose."],
  [15, "what-is-a-nativity-scene", ["THE NATIVITY", "SCENE"], "THE HISTORY BEHIND THE CHRISTMAS CRIB", NIGHT,
    "Hand carved wooden nativity figures being set out on a mantelpiece by candlelight, shavings and a knife beside them."],
  [15, "who-was-king-herod", ["WHO WAS", "KING HEROD?"], "THE RULER BEHIND THE CHRISTMAS STORY", NIGHT,
    "A hard faced king on a throne in a lamplit palace hall, Jerusalem's walls through the arch behind him. Cold, imposing, no violence shown."],
  [15, "what-is-boxing-day", ["WHAT IS", "BOXING DAY?"], "ST. STEPHEN'S DAY AND ITS CHRISTIAN ROOTS", DAY,
    "Boxes of food and clothing being handed out at a church door the morning after Christmas, frost on the ground."],
  [15, "what-is-the-octave-of-christmas", ["THE OCTAVE OF", "CHRISTMAS"], "THE EIGHT DAYS EXPLAINED", NIGHT,
    "Eight candles in a row, all lit at the same height, a nativity figure small and soft focus behind them."],
];

const doc = new PDFDocument({ size: "A4", margins: { top: 56, bottom: 56, left: 56, right: 56 }, info: { Title: "Bible Buddy Blog Banner Brief", Author: "Bible Buddy" } });
doc.pipe(fs.createWriteStream(process.argv[2]));

const INK = "#0f172a";
const MUTED = "#475569";
const BLUE = "#0056fd";
const W = doc.page.width - 112;

function h1(t) { doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text(t); }
function h2(t) { doc.moveDown(1.1).font("Helvetica-Bold").fontSize(14).fillColor(BLUE).text(t.toUpperCase(), { characterSpacing: 1 }); doc.moveDown(0.4); }
function body(t, o = {}) { doc.font("Helvetica").fontSize(10).fillColor(MUTED).text(t, { lineGap: 2, ...o }); }

// ---- cover ----
h1("Bible Buddy — Blog Banner Brief");
doc.moveDown(0.3);
body("63 banners to produce. Generated 25 October 2026.");
doc.moveDown(1);

h2("The spec");
doc.font("Helvetica").fontSize(10).fillColor(INK);
const spec = [
  ["Size", "1672 x 941 px (the exact size of every banner already in the library)"],
  ["Format", "JPEG, under about 400 KB"],
  ["Filename", "the slug given for each banner, lowercase, plus .jpg. Nothing else."],
  ["Where it goes", "public/blog-banners/<slug>.jpg — the site picks it up with no code change"],
  ["Layout", "Title typography on the LEFT third. Photographic scene fills the RIGHT. Keep the left side darker or simpler so the type reads."],
  ["Type", "Big condensed display serif, all caps, two or three lines. A small ornament above and below. Subtitle underneath in smaller caps."],
  ["Palette A", "Night / gold: deep navy night, warm lamp and candle light, gold lettering. Used for anything historical, biblical or solemn."],
  ["Palette B", "Day / navy + warm orange: daylight scene, navy and orange-red lettering. Used for practical and explainer posts."],
  ["Style", "Photoreal cinematic render, shallow depth of field, rich texture. No cartoon, no flat vector, no stock-photo look."],
  ["Never", "No modern clothing or objects in a biblical scene. No graphic violence. No depiction of God the Father. Keep Catholic subjects respectful and accurate."],
];
for (const [k, v] of spec) {
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(k, { continued: true });
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text("   " + v);
  doc.moveDown(0.25);
}
doc.moveDown(0.6);
body("Each entry below gives the filename, the headline to set on the image, the subtitle, which palette, and the scene. The headline line breaks are how the type should stack.", { width: W });

let entryNo = 0;
function entry(file, lines, sub, palette, scene, day) {
  const block = 86;
  if (doc.y + block > doc.page.height - 56) doc.addPage();
  entryNo += 1;
  doc.moveDown(0.7);
  const top = doc.y;
  doc.save().rect(56, top - 4, W, 0.8).fill("#e2e8f0").restore();
  doc.moveDown(0.35);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK)
    .text(`${entryNo}.  ${file}.jpg`, { continued: !!day });
  if (day) doc.font("Helvetica").fontSize(9).fillColor("#94a3b8").text(`     publishes day ${day}`);
  doc.moveDown(0.2);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BLUE).text("HEADLINE   ", { continued: true });
  doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(lines.join("  /  "));
  if (sub) {
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BLUE).text("SUBTITLE   ", { continued: true });
    doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(sub);
  }
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BLUE).text("PALETTE    ", { continued: true });
  doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(palette);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BLUE).text("SCENE      ", { continued: true });
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(scene, { lineGap: 1.5 });
}

doc.addPage();
h1("Part 1 — Needed now");
doc.moveDown(0.3);
body("Four posts published today are borrowing another post's artwork. Three Christian News posts have been running on generated placeholders since 12 October.", { width: W });
doc.moveDown(0.2);
for (const [file, lines, sub, palette, scene] of NOW) entry(file, lines, sub, palette, scene);

doc.addPage();
h1("Part 2 — Scheduled, four a day");
doc.moveDown(0.3);
body("These 56 publish automatically over the next two weeks, four a day, starting tomorrow. Each will go out borrowing a nearby banner until its own file exists. Day numbers are counted from Sunday 25 October, so day 2 is Monday 26 October.", { width: W });
doc.moveDown(0.2);
for (const [day, file, lines, sub, palette, scene] of SCHEDULED) entry(file, lines, sub, palette, scene, day);

doc.end();
console.log("entries:", NOW.length + SCHEDULED.length);
