export type ExodusTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyRawNotes(rawText: string): ExodusTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 20:${startVerse}` : `Exodus 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 20 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_RAW_NOTES = `# Exodus 20:1-3
# 📜 No Other Gods
---
## 📜 I Am The LORD Thy God, Which Have Brought Thee Out Of The Land Of Egypt

God does not open with a command.

He opens with an introduction instead.

The words I am the LORD name exactly who is speaking.

He reminds Israel He already rescued them from slavery in Egypt.

These commands are given to people God already saved.

Obedience here grows out of gratitude, not fear alone.

📜 I am the LORD opens the list

🕊️ God introduces Himself first

🙌 Israel was already rescued from Egypt

📖 Obedience flows from gratitude, not fear

## 🚫 Thou Shalt Have No Other Gods Before Me

This command demands complete and exclusive loyalty to the LORD.

Before me means in His presence, ranked above every other claim on worship.

Egypt worshiped many gods at once, and Canaan did too.

Israel is told to break from a normal ancient practice, not follow it.

This is the foundation every other commandment stands on.

🚫 No other gods means complete loyalty

👑 Before me means ranked above all else

🌍 Egypt and Canaan worshiped many gods

📖 Israel breaks from the normal ancient practice

# Exodus 20:4-6
# 🖼️ No Graven Images
---
## 🖼️ Thou Shalt Not Make Unto Thee Any Graven Image

A graven image means a statue or carving shaped to represent a god.

This command goes further than banning worship of other gods.

It even bans making a carved image to represent the LORD Himself.

Ancient worship almost always centered on a physical object people could see and touch.

God refuses to be reduced to something carved by human hands.

🖼️ Graven image means a carved idol

🙅 This bans images of the LORD too

👐 Ancient worship centered on physical objects

📖 God will not be reduced to an object

## 😠 I The LORD Thy God Am A Jealous God

Jealous here does not mean petty envy the way people use the word today.

It describes a rightful claim to complete devotion.

Think of a marriage that demands full faithfulness from both people.

God claims that same kind of exclusive relationship with Israel.

Sharing worship with another god would break the relationship entirely.

😠 Jealous does not mean petty envy

💍 It describes a marriage like claim

🙏 God demands complete devotion from Israel

📖 Sharing worship would break the relationship

## 👨‍👩‍👧‍👦 Visiting The Iniquity Of The Fathers Upon The Children Unto The Third And Fourth Generation

This does not mean children are punished for a parent's specific personal guilt.

Iniquity means sin, especially sin with lasting weight.

The verse describes how sin's real consequences ripple forward through a family.

A parent's idol worship often shaped how children and grandchildren worshiped too.

Generations were not doomed, but patterns of sin are hard to escape alone.

👨‍👩‍👧‍👦 Not punishment for another's personal guilt

🌊 Iniquity means sin with lasting weight

🔁 Sin's consequences ripple through generations

📖 Family patterns of sin are hard to escape

# Exodus 20:7
# 🚫 The Name Of The LORD
---
## 🚫 Thou Shalt Not Take The Name Of The LORD Thy God In Vain

Vain means empty, worthless, or without real weight behind it.

This is not primarily about cursing the way modern language uses God's name.

It targets using God's name in a false oath or an empty religious claim.

Ancient people swore oaths by a god's name to guarantee they were telling the truth.

Invoking God falsely treated His name as a tool instead of a person.

🚫 Vain means empty or worthless

🤥 This targets false oaths, not just curses

📜 Ancient oaths invoked a god's name

📖 God's name is a person, not a tool

## ⚖️ The LORD Will Not Hold Him Guiltless

This command carries its own attached warning.

Guiltless means cleared of blame or considered innocent.

God says plainly that misuse of His name will not go unanswered.

Most of the other commands in this chapter do not include a warning like this.

That difference shows how seriously God treats His own name.

⚖️ Guiltless means cleared of blame

🚨 This command carries its own warning

🔍 Few other commands add a warning

📖 God treats His name with real weight

# Exodus 20:8-11
# 🛐 Remember The Sabbath
---
## 🛐 Remember The Sabbath Day, To Keep It Holy

Remember suggests this practice already existed before this moment.

Exodus chapter sixteen already showed a seven day rest pattern with the manna.

Holy means set apart for God, different from every ordinary day.

God is not introducing rest here.

He is turning an existing pattern into a permanent law.

🛐 Remember signals an existing practice

🍞 Chapter sixteen already showed this pattern

✨ Holy means set apart for God

📖 An existing rhythm becomes permanent law

## 🏠 Thou, Nor Thy Son, Nor Thy Daughter ... Nor Thy Stranger That Is Within Thy Gates

This list covers every person living inside an Israelite household.

Sons, daughters, servants, animals, and even foreign visitors are all named.

Stranger here means a foreigner living among Israel, not a random passerby.

In most ancient economies, servants and animals never stopped working.

This command gives an entire household real rest, not just its head.

🏠 Every household member is named here

🧑‍🌾 Servants and animals are included too

🌍 Stranger means a foreigner living among them

📖 Rest here covers the whole household

## 🌍 In Six Days The LORD Made Heaven And Earth ... And Rested The Seventh Day

The reason given points straight back to creation.

Genesis one and two already tell this same story.

Six days of work, then one day of rest.

God did not need to recover from being tired.

His rest set the pattern Israel is now told to copy.

Human rest is grounded in God's own example, not just a rule to follow.

🌍 This reason points back to creation

🛠️ Six days of work, one of rest

😌 God rested by pattern, not fatigue

📖 Human rest copies God's own example

# Exodus 20:12
# 👨‍👩‍👧 Honor Your Parents
---
## 👨‍👩‍👧 Honour Thy Father And Thy Mother

This is the first commandment aimed at relationships between people.

The nine before this all concerned Israel's relationship with God directly.

Placing it first among the human centered commands marks parents with special honor.

Honour here means far more than polite manners.

It calls for real respect and care across an entire lifetime.

👨‍👩‍👧 First commandment about human relationships

🔟 Nine earlier commands concerned God directly

🙏 Parents receive a uniquely honored place

📖 Honour means lifelong respect and care

## 📅 That Thy Days May Be Long Upon The Land

This commandment comes with a promise attached.

Long days here point to a stable, lasting life in the land God was giving Israel.

A society where children honor their parents tends to hold together.

Family stability and community stability were never separate ideas here.

This connects one household's choices to the whole nation's future.

📅 A promise is attached to this command

🏞️ Long days points to a stable life

👪 Family stability supports community stability

📖 One household's choices shape the nation

# Exodus 20:13-17
# ⚖️ Commandments About Others
---
## 🚫 Thou Shalt Not Kill

Kill here means unlawful killing, in other words murder.

It does not ban every instance of taking a life.

Later chapters of the Law describe warfare and capital punishment as permitted.

This command protects human life from being taken by personal violence or hatred.

Life carries real weight because every person bears God's image.

🚫 Kill here specifically means murder

⚔️ Warfare and capital punishment are addressed elsewhere

❤️ This protects life from personal violence

📖 Every person carries God's own image

## 💍 Thou Shalt Not Commit Adultery

This command protects the marriage covenant specifically.

Adultery means breaking that covenant by being unfaithful to a spouse.

Marriage faithfulness gets its own standalone place among the ten commands.

That placement shows how seriously God treats a broken promise between spouses.

💍 This protects the marriage covenant

💔 Adultery means breaking that covenant

🔟 It earns its own standalone place

📖 God takes broken marriage promises seriously

## 💰 Thou Shalt Not Steal

Stealing means taking what belongs to someone else without their consent.

This command assumes people have a real right to their own property.

An economy built on trust cannot survive constant theft.

Protecting property here also protects the trust a whole community depends on.

💰 Stealing means taking without consent

🏠 This assumes a real right to property

🤝 Trust holds a whole community together

📖 Protecting property protects shared trust

## 🗣️ Thou Shalt Not Bear False Witness Against Thy Neighbour

False witness means giving dishonest testimony, especially in a legal setting.

Ancient Israel settled disputes at the city gate in front of witnesses.

A lie told there could cost someone their property, their freedom, or their life.

This command protects the whole community's system of justice from corruption.

🗣️ False witness means dishonest testimony

⚖️ Ancient disputes were settled at the gate

😨 A lie there could cost someone everything

📖 This protects the community's justice system

## 💭 Thou Shalt Not Covet ... Any Thing That Is Thy Neighbour's

Covet means to desire something that belongs to someone else.

Every command before this one addressed an outward, visible action.

This one reaches inside, targeting desire before it ever becomes an action.

Wanting a neighbor's house, spouse, servant, or animal all count here.

God cares about the heart behind an action, not only the action itself.

💭 Covet means desiring another's belongings

👀 Earlier commands addressed outward actions only

❤️ This one targets desire itself

📖 God cares about the heart, not just actions

# Exodus 20:18-21
# 😨 The People's Fear
---
## 😨 The People Saw ... They Removed, And Stood Afar Off

Thunder, lightning, trumpet blasts, and a smoking mountain all happen at once.

This is not a gentle scene.

The people physically back away from the mountain out of real terror.

Fear here is a genuine, bodily reaction, not poetic language.

😨 The scene overwhelms the people's senses

🏔️ Thunder, lightning, and smoke together

🚶 They physically back away in terror

📖 This fear is real, not just poetic

## 🗣️ Speak Thou With Us ... But Let Not God Speak With Us, Lest We Die

The people ask Moses to stand between them and God.

They believe direct contact with God's presence would kill them.

This request sets up Moses's ongoing role as a mediator for Israel.

Later, one greater than Moses would make that kind of mediation unnecessary.

🗣️ The people ask Moses to mediate

😱 They fear direct contact with God

🧑‍⚖️ Moses becomes Israel's ongoing mediator

📖 A greater mediator comes later in scripture

## 🎯 God Is Come To Prove You, And That His Fear May Be Before Your Faces, That Ye Sin Not

Moses explains why God allowed such a terrifying display.

Prove here means test, not punish.

The goal was lasting reverence, not lingering panic.

Real reverence for God was meant to help Israel resist sin later.

🎯 Prove here means test, not punish

😌 The goal was reverence, not panic

🛡️ Reverence helps prevent future sin

📖 Fear of God was meant to protect them

## 🌑 Moses Drew Near Unto The Thick Darkness Where God Was

Everyone else stood far off, but Moses moves closer.

Thick darkness describes the dense cloud covering the mountain, not an absence of God.

Moses alone was permitted this kind of nearness to God's presence.

His unique access here sets up his role for the rest of Exodus.

🌑 Thick darkness describes a dense cloud

🚶 Moses alone draws near to it

🔑 He receives unique access to God

📖 This access shapes his role in Exodus

# Exodus 20:22-26
# 🏛️ Instructions For Altars
---
## 🥇 Ye Shall Not Make With Me Gods Of Silver, Neither Shall Ye Make Unto You Gods Of Gold

This repeats the ban on idols from earlier in the chapter.

Silver and gold are named specifically here.

Both metals made idols look valuable and impressive.

A costly idol could tempt people more than a plain one.

God wants worship aimed at Him alone, not at what an idol is made of.

🥇 This repeats the earlier ban on idols

✨ Silver and gold made idols look impressive

😍 Costly materials made idols more tempting

📖 God wants worship, not impressive material

## 🏛️ An Altar Of Earth Thou Shalt Make Unto Me

God asks for a simple altar built from plain earth.

This is the opposite of an elaborate, decorated structure.

A humble altar keeps attention on the worship happening there, not the object itself.

God did not need an impressive altar to be honored.

🏛️ God asks for a simple earth altar

🎨 This is the opposite of elaborate

🙏 A humble altar centers worship, not craft

📖 God is honored without an impressive altar

## 🔨 If Thou Lift Up Thy Tool Upon It, Thou Hast Polluted It

Even a stone altar had to stay uncut by human tools.

Polluted here means made unfit or spoiled for holy use.

Shaping the stone with a chisel would let human skill compete with worship.

The altar's roughness protected the focus on God alone.

🔨 Tools were not allowed on the stone

⚠️ Polluted means unfit for holy use

🙅 Cutting it let human skill compete

📖 A rough altar kept the focus on God

## 🚶 Neither Shalt Thou Go Up By Steps Unto Mine Altar, That Thy Nakedness Be Not Discovered Thereon

Ancient priestly garments were simple robes without undergarments.

Climbing steps in front of people below could expose the priest by accident.

This command is a practical safeguard, not a symbolic one.

Protecting the priest's modesty protected the dignity of the entire worship.

🚶 Ancient priestly robes had no undergarments

👀 Steps risked exposing a priest by accident

🛡️ This safeguard was practical, not symbolic

📖 Protecting modesty protected worship's dignity
`.trim();

export const EXODUS_TWENTY_PERSONAL_SECTIONS = parseExodusTwentyRawNotes(EXODUS_TWENTY_RAW_NOTES);
