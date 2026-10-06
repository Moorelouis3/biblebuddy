export type ZechariahFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahFiveRawNotes(rawText: string): ZechariahFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Zechariah 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+5:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Zechariah\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 5:${startVerse}` : `Zechariah 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Zechariah 5 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_FIVE_RAW_NOTES = `# Zechariah 5:1-4
# 📜 The Flying Scroll Of Judgment
---
## 📜 Behold A Flying Roll

A roll here means a scroll, not a bound book.

Ancient scrolls were long sheets of material rolled around a stick.

This scroll moves through the sky on its own, carried by no one.

Zechariah sees it during one long night of eight back to back visions.

A scroll floating in midair is already strange before anyone reads what it says.

📜 Roll means a scroll
🌬️ It flies with no one carrying it
🌃 One vision inside a night full of them
📖 A floating scroll is already a warning

## 📏 The Length Thereof Is Twenty Cubits

A cubit was an everyday measurement, about the length of a forearm.

Twenty cubits stretched to about thirty feet, and ten cubits to about fifteen.

That makes this an enormous scroll, far too large for any human hand to unroll.

Many scholars note those exact dimensions match the porch in front of Solomon's temple.

The curse is sized like something belonging to God's own house, not an ordinary document.

📏 A cubit was about a forearm's length
📐 The scroll was about thirty feet by fifteen
🏛️ Those dimensions match the temple porch
📖 This curse carries the weight of holy ground

## ⚖️ This Is The Curse That Goeth Forth

A curse here means a formal sentence of judgment, not an angry wish.

It goes forth over the face of the whole earth, meaning the whole land of Israel.

This judgment is not aimed at foreign nations or distant enemies.

It is written against the very people who claim to belong to God.

The law given at Sinai always carried curses for those who broke it.

⚖️ Curse means a formal sentence
🗺️ It covers the whole land
🏠 It targets God's own people
📖 Breaking the law always carried this risk

## 🤲 Every One That Stealeth Shall Be Cut Off

Stealeth means taking what belongs to someone else without their consent.

That breaks the command against stealing, a sin aimed straight at a neighbor.

To be cut off meant removed from the community, sometimes through death.

The scroll had two sides, and this curse stood written on one of them.

A hidden theft in the dark gets named out loud by a scroll flying over every roof.

🤲 Stealeth means taking what is not yours
💔 This sin wrongs a neighbor
✂️ Cut off means removed from the community
📖 Hidden theft gets named openly

## 🗣️ Every One That Sweareth Shall Be Cut Off

Sweareth here means swearing falsely, making an oath in God's name and breaking it.

That breaks the command against misusing God's name, a sin aimed straight at God.

This curse stood written on the scroll's other side, facing the opposite direction.

One side judges sin against a neighbor, and the other judges sin against God.

Together the two sides of the scroll cover the whole of the law.

🗣️ Sweareth means a broken oath in God's name
🙏 This sin wrongs God directly
📜 It stood on the scroll's other side
📖 The two sides cover the whole law

## 🏚️ It Shall Enter Into The House Of The Thief

The curse is pictured entering a house the way an uninvited guest would.

It does not simply punish a person and move on.

It remains in the house, settling in and refusing to leave.

Consuming it with the timber and the stones means tearing down the whole structure.

A single hidden sin ends up costing a family its entire home.

🏚️ The curse enters like an uninvited guest
🏠 It settles in and stays
🪵 Timber and stones mean the whole house
📖 One hidden sin can cost everything

# Zechariah 5:5-8
# 🧺 The Woman In The Ephah
---
## 👼 Lift Up Now Thine Eyes

The same angel who has guided Zechariah through every vision speaks again here.

He tells Zechariah to look up and watch what comes next.

This phrase has already repeated several times across these night visions.

Each repetition signals a new scene inside the same long night.

Zechariah is not daydreaming.

He is being directed toward something specific.

👼 Same angel guiding every vision
👀 Zechariah is told to look up
🔁 A phrase repeated across the visions
📖 A new scene is about to open

## 🧺 This Is An Ephah That Goeth Forth

An ephah was a basket sized container used to measure dry goods like grain.

It worked the same way a modern bushel basket would at a market.

Seeing a measuring basket appear in a vision points straight at everyday trade and commerce.

Honest measures mattered to God, and dishonest ones show up elsewhere in scripture as sin.

This basket is about to reveal something hidden inside ordinary business dealings.

🧺 An ephah was a grain measuring basket
🏪 It pictures everyday trade and commerce
⚖️ Honest measures mattered to God
📖 Something hidden sits inside this basket

## 🌍 This Is Their Resemblance Through All The Earth

Resemblance here means a picture or likeness of something true about the whole land.

The ephah does not describe one dishonest merchant in one town.

It describes a pattern repeated everywhere across the land, not an isolated case.

Hidden wickedness in daily dealings had spread far wider than anyone wanted to admit.

The vision widens from one scroll of curses to the ordinary life of the whole nation.

🌍 Resemblance means a true likeness
🏘️ The pattern was spread everywhere
🙈 Wickedness had hidden inside daily life
📖 The whole nation shared this problem

## 🪨 A Talent Of Lead

A talent was a unit of weight, and this talent was about seventy five pounds.

Lead was a heavy, soft metal often shaped into a lid or cover.

Lifting a weight this heavy took real effort, not a casual gesture.

Pairing a basket with a massive lead weight hints that something inside needs holding down.

Whatever sits in that basket is strong enough to need this much weight against it.

🪨 A talent weighed about seventy five pounds
🔩 Lead is heavy and soft
💪 Lifting it took real effort
📖 Something inside needed holding down

## 👩 This Is Wickedness

A woman sits inside the ephah, and the angel names her plainly as wickedness.

Scripture often pictures sin or a nation's sin using a woman as a symbol.

Naming her wickedness removes any doubt about what this basket actually holds.

She is not simply present.

She is trapped inside a container built to measure trade.

Sin had worked its way into the very baskets people used every day.

👩 A woman named wickedness sits inside
📚 Scripture often pictures sin as a woman
🧺 She is trapped inside the measure
📖 Sin had worked into daily trade

## 🔒 He Cast The Weight Of Lead Upon The Mouth Thereof

The mouth of the ephah is its open top, where goods were poured in and out.

Casting the lead weight onto that opening sealed the basket completely shut.

Wickedness is not simply exposed in this vision.

She is forcibly shut in.

The lead that once suggested her strength now becomes the very thing containing her.

What had spread freely through the land is finally being sealed away.

🔒 The mouth is the basket's open top
🪨 The lead weight sealed it shut
🧺 Wickedness gets forcibly contained
📖 What had spread is finally sealed

# Zechariah 5:9-11
# 🪽 Carried Away To Shinar
---
## 🪽 Wings Like The Wings Of A Stork

Two women now appear, and wind fills their wings as they rise.

A stork is a large bird known for strong, steady, long distance flight.

Leviticus lists the stork among the birds considered unclean for Israel to eat.

An unclean bird fits a basket full of wickedness being carried far away.

The vision matches its messengers to the ugly cargo they are sent to move.

🪽 Two women rise on wind filled wings
🦢 A stork flies strong and far
🚫 Storks were listed as unclean birds
📖 The messengers match their ugly cargo

## 🌤️ Lifted Up The Ephah Between The Earth And The Heaven

The basket does not simply get carried on someone's back down a road.

It rises into open sky, suspended between the ground and the heavens above.

That placement signals something final, not a local delivery to the next town.

Wickedness is being removed from its place in Israel entirely, not merely relocated nearby.

The higher it flies, the further it travels from the people it had infected.

🌤️ The basket rises into open sky
🚫 This is removal, not a local delivery
🗺️ Wickedness leaves Israel completely
📖 Distance here means complete removal

## ❓ Whither Do These Bear The Ephah

Whither simply means to where, an old way of asking a destination.

Zechariah keeps following the same pattern from earlier visions.

Instead of guessing, he simply asks the angel directly.

He already asked similar questions about the lampstand and the olive trees.

A prophet who does not understand still asks for the meaning instead of inventing one.

The angel is always ready with an answer once the question is asked.

❓ Whither means to where
🙋 Zechariah asks instead of guessing
🔁 This matches his pattern from earlier visions
📖 The angel always answers when asked

## 🏯 To Build It An House In The Land Of Shinar

Shinar is the same region named back in Genesis as the site of the tower of Babel.

That earlier tower was a monument to human pride built apart from God.

Later in history, Shinar became part of the region known as Babylon.

Sending wickedness to Shinar sends it back to the very ground where pride and rebellion began.

The land that first produced this kind of sin becomes its permanent home again.

🏯 Shinar is the tower of Babel's land
🏛️ It later became part of Babylon
🔁 Wickedness returns to where it started
📖 Its origin becomes its permanent home

## 🧱 Established, And Set There Upon Her Own Base

A base here means a fixed foundation, something built to stay in place.

This is not a temporary stop before wickedness finds its way back to Israel.

The vision ends with permanence, a house built and settled on its own ground.

God is not simply hiding this sin.

He is relocating it for good.

The land of God's people is pictured as finally clear of what had corrupted it.

🧱 A base means a fixed foundation
🚫 This removal is not temporary
🏠 A permanent house is built far away
📖 God clears his people's land for good
`.trim();

export const ZECHARIAH_FIVE_PERSONAL_SECTIONS = parseZechariahFiveRawNotes(ZECHARIAH_FIVE_RAW_NOTES);
