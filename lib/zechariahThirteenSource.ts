export type ZechariahThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahThirteenRawNotes(rawText: string): ZechariahThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 13:${startVerse}` : `Zechariah 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Zechariah 13 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_THIRTEEN_RAW_NOTES = `# Zechariah 13:1-3
# 🧹 Cleansing The Land Of False Prophets
---
## 💧 A Fountain Opened

"A fountain" here does not mean an ordinary well.

It pictures a flowing source made for washing something away.

Under the law, flowing water was required to remove certain kinds of impurity.

Zechariah twelve just ended with the whole nation mourning the one they pierced.

This fountain opens right after that grief, not years later.

The cleansing answers the mourning directly.

💧 Fountain means a flowing cleansing source
📜 The law required flowing water for impurity
😢 Chapter twelve just ended in mourning
📖 Cleansing follows that mourning right away

## 🧹 For Sin And For Uncleanness

"Sin" and "uncleanness" are not the same problem here.

Sin means breaking God's law on purpose or through failure.

Uncleanness means a ceremonial impurity that kept a person from worship.

A person could become unclean without committing one specific sin.

This single fountain promises to wash away both at once.

Neither guilt nor impurity gets left unresolved.

⚖️ Sin and uncleanness differ here
🧾 Sin means breaking God's law
🚫 Uncleanness blocked someone from worship
📖 One fountain washes away both

## 🗑️ I Will Cut Off The Names Of The Idols

"Cutting off the names" means more than smashing statues.

Even the memory of these gods will be erased from daily speech.

People in this culture often swore oaths using the names of local gods.

God promises a cleansing deep enough to remove that habit completely.

Nothing of idolatry survives, not even in casual conversation.

🗑️ Cutting off names means total erasure
🗣️ People once swore oaths by these gods
🧒 Children were even named after idols
📖 This cleansing reaches daily speech itself

## 👻 The Prophets And The Unclean Spirit To Pass Out Of The Land

"The prophets" here means the false prophets from the verse before.

God groups them together with the unclean spirit behind them.

These prophets claimed to speak for God while actually channeling something else entirely.

The same cleansing that removes idols also removes this fake prophetic voice.

Zechariah had already condemned worthless shepherds and false prophets back in chapter eleven.

This purge finishes what that earlier warning started.

👻 False prophets get grouped with idols
🗣️ They claimed God's voice falsely
🧹 The same cleansing removes both
📖 Chapter eleven's warning reaches completion here

## ⚔️ Thou Shalt Not Live

This law normally protected children from their own parents.

Here it gets turned against a child who still prophesies falsely.

The parents in this verse are the ones pronouncing the death sentence.

Family loyalty does not outweigh the danger of a false prophetic voice.

Zero tolerance for lying prophets reaches into the closest relationship there is.

👨‍👩‍👧 Parents normally protect their children
⚖️ Here they pronounce the sentence
🚫 Loyalty does not excuse false prophecy
📖 Zero tolerance reaches every relationship

## 🗡️ Thrust Him Through When He Prophesieth

"Thrust through" means a real stabbing, not a figure of speech.

His own father and mother carry out this punishment themselves.

This pictures how seriously this future community will treat a false claim to speak for God.

Chapter twelve already used piercing language for the one the nation mourns.

Here that same picture of piercing turns into judgment instead of grief.

🗡️ Thrust through means a real stabbing
👪 His own parents carry it out
⚠️ False prophecy gets treated this seriously
📖 Piercing now means judgment, not grief

# Zechariah 13:4-6
# 🧥 The Ashamed Prophet's Disguise
---
## 😳 Ashamed Every One Of His Vision

These prophets once bragged about visions they claimed God gave them.

After this cleansing, that same claim becomes something to hide.

Public shame replaces public honor for this kind of prophet.

A reputation built on a lie cannot survive once the lie gets exposed.

😳 Prophets once bragged about visions
🙈 That claim becomes shameful instead
🔄 Honor flips into public shame
📖 A lie built reputation cannot last

## 🧥 Wear A Rough Garment To Deceive

A "rough garment" made of hair was the recognized uniform of a true prophet.

Elijah wore one, and so did John the Baptist centuries later.

Some false prophets wore the same garment just to look the part.

After this cleansing, even the costume gets dropped along with the lie.

The outfit alone was never proof of a real calling.

🧥 Rough garment was a prophet's uniform
🐫 Elijah and John the Baptist wore one
🎭 Some false prophets copied the look
📖 A costume never proved a true calling

## 🌾 I Am No Prophet, I Am An Husbandman

"Husbandman" is an old word for a farmer who works the soil.

This former false prophet now denies the title completely.

Claiming an ordinary trade was the safest thing left to say.

Admitting the earlier lie out loud could still bring the punishment named back in verse three.

🌾 Husbandman means an old word for farmer
🙅 He denies being a prophet at all
🛡️ An ordinary trade feels safer to claim
📖 Admitting the lie still risked judgment

## 🐂 Taught Me To Keep Cattle From My Youth

"Keeping cattle" means herding and tending livestock for a living.

He claims an ordinary upbringing, trained by another man, not called by God.

This finishes the cover story started in the line before it.

A false prophet works hard here to sound as unremarkable as possible.

🐂 Keeping cattle means herding livestock
👨‍🌾 He claims a normal human teacher
🙈 The cover story is now complete
📖 He tries to sound unremarkable on purpose

## 🩹 What Are These Wounds In Thine Hands

Someone notices visible wounds on this man's hands and asks about them directly.

The question assumes those wounds came from something unusual.

He cannot deny the wounds exist, only explain where they came from.

The evidence on his body contradicts the story he already told.

🩹 The wounds are visible and undeniable
❓ Someone asks about them directly
🧩 Evidence does not match his story
📖 A body can expose a hidden truth

## 🤥 Wounded In The House Of My Friends

This does not describe the wounds of Jesus on the cross.

The man speaking here is the same false prophet from the lines just before this one.

Many ancient prophets of other gods cut themselves during their rituals as part of the performance.

Many scholars believe these wounds likely came from exactly that kind of self inflicted ritual.

He lies about the cause, blaming a private fight instead of admitting the truth.

🤥 Not a description of Jesus on the cross
🗣️ The speaker is the false prophet himself
🔪 Many false prophets cut themselves in ritual
📖 He lies about the real cause here

# Zechariah 13:7-9
# ⚔️ The Shepherd Struck, The Flock Refined
---
## ⚔️ Awake, O Sword, Against My Shepherd

God calls out a command straight to a sword, as if it could hear.

The shepherd here gets called "my fellow," meaning someone close to God's own side.

Jesus later quotes this exact verse the night before his arrest, in Matthew twenty six.

He applies the shepherd being struck directly to himself.

⚔️ God commands the sword directly
🤝 My fellow means someone close to God
✝️ Jesus quotes this verse before his arrest
📖 He applies it to himself directly

## 🐑 The Sheep Shall Be Scattered

Striking the shepherd does not just hurt one man.

Every sheep that depended on him scatters without protection.

Jesus connects this same scattering to his own disciples fleeing that same night.

One person falling can send an entire group running in fear.

🐑 Scattering follows the shepherd's fall
🛡️ The sheep lose their protection
🏃 The disciples fled that same night
📖 One fall can scatter a whole group

## 👶 Mine Hand Upon The Little Ones

"The little ones" means the weak and vulnerable within the flock.

God's hand reaches even this far after the shepherd is struck.

No part of this community escapes the testing that follows.

The chapter is about to explain exactly what that testing produces.

👶 Little ones means the weak and vulnerable
✋ God's hand reaches even this far
🌍 No one escapes what comes next
📖 This sets up the testing ahead

## 🔢 Two Parts Therein Shall Be Cut Off And Die

Two out of every three people in this picture do not survive.

That is not a small loss, it counts as a majority of the whole group.

Only one third remains after this judgment passes through.

The chapter is honest about the size of this loss before describing what happens to the rest.

🔢 Two of three parts do not survive
📉 This counts as a majority loss
🧮 Only one third remains afterward
📖 The size of this loss is stated plainly

## 🥈 Refine Them As Silver Is Refined

Refining silver means heating it until the impurities rise and can be skimmed away.

The same process works on gold, using intense heat to remove anything impure.

God applies that same picture to the people who remain.

The fire here is not destruction, it is purification.

🥈 Refining removes impurities with heat
🥇 Gold gets purified the same way
🔥 The fire purifies, not destroys
📖 The remnant comes out purified

## 🙏 The LORD Is My God

This exchange repeats an old covenant formula found throughout the Old Testament.

God says plainly, it is my people.

The people answer just as plainly, the LORD is my God.

The chapter that opened with a fountain for cleansing ends with a relationship fully restored.

🤝 This repeats an old covenant formula
🗣️ God claims them as his people
🙏 They claim him as their God
📖 Cleansing ends in restored relationship
`.trim();

export const ZECHARIAH_THIRTEEN_PERSONAL_SECTIONS = parseZechariahThirteenRawNotes(ZECHARIAH_THIRTEEN_RAW_NOTES);
