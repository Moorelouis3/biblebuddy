export type PsalmsNinetyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyEightRawNotes(rawText: string): PsalmsNinetyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+98:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 98 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+98:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+98:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 98 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 98,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 98:${startVerse}` : `Psalms 98:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 98 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_EIGHT_RAW_NOTES = `# Psalms 98:1-3
# 🎶 New Song For A Mighty Victory
---
## 🎶 Sing Unto The LORD A New Song

"New song" does not mean a song no one had ever sung before.

Israel used this phrase whenever God did something fresh worth celebrating.

Psalms 33, 96, and 149 all open the exact same way.

Every fresh act of God deserved fresh words, not a recycled line.

🎶 New song means fresh praise
🔁 Used whenever God acted freshly
📜 Psalms 33, 96, and 149 open this way
📖 Fresh acts deserve fresh praise

## ✋ His Right Hand And Holy Arm

"Right hand" and "arm" are common Hebrew ways of picturing strength.

They do not point to God having a literal body.

Kings in the ancient world were praised the same way, strong in battle.

Scripture borrows that royal image to describe God as a warrior king.

The picture shows raw power winning the fight alone.

✋ Right hand pictures God's strength
🚫 Not a literal body part
👑 Ancient kings were praised the same way
📖 God fights and wins alone

## 🏆 Hath Gotten Him The Victory

"Gotten him the victory" means God alone won this fight.

No ally helped him and no army stood beside him.

The words picture a champion finishing a battle unaided.

This victory becomes the very reason the whole earth is told to sing.

🏆 Victory means God won alone
🤝 No ally or army helped him
⚔️ Pictures a champion finishing the fight
📖 This victory launches the song

## 📢 Made Known His Salvation

"Made known" means God let this salvation be seen, not just felt.

Israel did not keep this victory as a private, hidden secret.

News of what God had done was meant to travel outward.

A private rescue would not have called for a whole earth's song.

📢 Made known means openly revealed
🤐 Not kept as a private secret
🌍 Meant to travel far outward
📖 A hidden rescue would not need this song

## 🌍 Openly Shewed In The Sight Of The Heathen

"Shewed" is the old spelling of showed, meaning displayed plainly.

"Heathen" here simply means the nations outside Israel, not an insult.

God let outsiders watch him work, not just his own people.

His righteousness was put on display for the whole watching world.

🔤 Shewed means showed or displayed
🌐 Heathen means nations outside Israel
👀 Outsiders were let to watch
📖 His righteousness was on display for all

## 🤝 Remembered His Mercy And His Truth

"Remembered" does not mean God had briefly forgotten his people.

In Scripture it means he acted on a promise already made.

"Mercy" and "truth" are two words often paired together in the Old Testament.

Together they describe God staying loyal to his covenant no matter what.

Israel could count on both at once, never just one alone.

🤝 Remembered means acted on a promise
🚫 Not that God had forgotten
💞 Mercy and truth are a common pair
📖 God stays loyal to his covenant

# Psalms 98:4-6
# 🎺 A Joyful Noise With Every Instrument
---
## 📣 Make A Joyful Noise Unto The LORD

"Joyful noise" pictures a loud shout, not a polite clap.

Ancient worship was rarely quiet or reserved.

This is the sound of a crowd erupting after a victory.

The command matches the mood the psalm has already built.

📣 Joyful noise means a loud shout
🤫 Not quiet or reserved worship
🎉 Sounds like a crowd erupting
📖 It matches the psalm's mood so far

## 🌍 All The Earth

"All the earth" widens this call far past the nation of Israel.

Every person alive, in every land, is now included.

The psalm already said the nations watched God's salvation.

Now those same nations are told to respond, not just observe.

🌍 All the earth means every nation
👀 Once watchers, now included
📈 The call widens past Israel
📖 Watching turns into joining

## 🎻 Sing Unto The LORD With The Harp

The harp named here was a small stringed instrument.

It was closer to a lyre than a modern harp.

It was common in Israelite worship, often played while singing.

David himself was known for playing one.

Voice and strings together were the normal way to praise God.

🎻 Harp means a small stringed instrument
🎶 Closer to a lyre than today's harp
👑 David himself played one
📖 Voice and strings praised God together

## 📜 The Voice Of A Psalm

A "psalm" was originally a song meant to be sung with instruments, not just read.

The word itself points back to plucking strings.

Calling it "the voice of a psalm" ties singing and playing into one act.

Worship here was never meant to be silent or purely private.

🎼 Psalm means a song for instruments
🎵 Points back to plucking strings
🗣️ Singing and playing joined together
📖 Worship here was never silent

## 📯 With Trumpets And Sound Of Cornet

A "cornet" in the King James Bible does not mean a modern brass instrument.

It points to a curved horn made from an animal horn, close to a shofar.

Trumpets here were often long, straight metal horns used in worship and battle.

Together they filled the air with a loud blast of praise.

📯 Cornet was not a brass instrument
🐏 It was really a curved animal horn
🎺 Trumpets were long straight metal horns
📖 Together they filled the air with praise

## 👑 Before The LORD, The King

Calling God "the King" here is not a poetic decoration.

Every trumpet, harp, and shout in this psalm honors him as an actual ruler.

Ancient kings were welcomed with exactly this kind of loud fanfare.

The whole scene pictures a king receiving his people's praise in person.

👑 King is not just a poetic title
📯 Every instrument honors him as ruler
🎉 Kings were welcomed with fanfare
📖 The scene pictures a king receiving praise

# Psalms 98:7-9
# 🌊 All Creation Joins The Judge
---
## 🌊 Let The Sea Roar, And The Fulness Thereof

The sea is pictured here as if it could shout on purpose.

"The fulness thereof" means everything living inside it, every fish and creature.

Even the deepest, least seen parts of creation are called to respond.

Nothing in the natural world stays silent in this celebration.

🌊 The sea is pictured as shouting
🐟 Fulness thereof means every creature in it
🕳️ Even the deepest places are included
📖 Nothing in creation stays silent

## 🌍 The World, And They That Dwell Therein

"They that dwell therein" points to every person living on the earth.

The sea and its creatures were just called to praise in the line before.

Now humanity is added to that same chorus.

Every living thing, in water and on land, is included together.

🌍 Dwell therein means everyone on earth
🐟 Joins the sea creatures from before
🤝 Humanity is added to the chorus
📖 Every living thing joins together

## 👏 Let The Floods Clap Their Hands

Rivers and floods obviously have no hands to clap.

This is personification, giving nature a human action to picture its response.

Think of a crowd bursting into applause after a great win.

That is the picture painted over rushing water here.

👏 Floods clapping is personification
🌊 Rivers cannot literally have hands
🙌 Pictures a crowd applauding a win
📖 That excitement is placed over rushing water

## ⛰️ Let The Hills Be Joyful Together

Hills cannot feel joy any more than rivers can clap.

This line pairs with the floods clapping just before it.

Hebrew poetry often lines up two pictures that say the same thing.

Water and mountains together stand in for the whole created world.

⛰️ Hills cannot literally feel joy
🔁 Pairs with the floods clapping before it
📝 This is Hebrew poetry's parallel style
📖 Water and mountains stand for all creation

## ⚖️ He Cometh To Judge The Earth

"Judge" here does not mean a courtroom sentence to fear.

In this context it means God is coming to set things right.

That is exactly why creation is celebrating instead of hiding.

A ruler who judges with real fairness is good news for the ruled.

⚖️ Judge means setting things right
🎉 That is why creation celebrates
🙅 Not a verdict to fear
📖 A fair ruler is good news

## 🤲 The People With Equity

"Equity" means fairness applied equally to everyone, not favoritism.

"Righteousness" and "equity" are paired here, both describing the same fair rule.

Hebrew poetry often repeats one idea in two different words.

The whole psalm has moved from a private victory to a promise for the whole world.

Every nation, every creature, and every person is included in that closing promise.

⚖️ Equity means fairness for everyone
🔁 Righteousness and equity repeat one idea
🌍 The promise now reaches the whole world
📖 Every nation and creature is included
`.trim();

export const PSALMS_NINETY_EIGHT_PERSONAL_SECTIONS = parsePsalmsNinetyEightRawNotes(PSALMS_NINETY_EIGHT_RAW_NOTES);
