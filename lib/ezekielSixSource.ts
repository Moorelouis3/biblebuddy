export type EzekielSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielSixRawNotes(rawText: string): EzekielSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 6:${startVerse}` : `Ezekiel 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Ezekiel 6 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_SIX_RAW_NOTES = `# Ezekiel 6:1-3
# 🏔️ A Prophecy Against The Mountains
---
## 🧍 Son Of Man

"Son of man" means a mortal human being.

God calls Ezekiel this name again and again in this book.

Ezekiel is never once called a prophet by title here.

He is called son of man instead, more than ninety times total.

That title keeps the distance between God and Ezekiel clear.

🧍 Son of man means a mortal human
📖 God uses this title constantly in the book
👤 Used instead of the word prophet
➡️ The title keeps God's greatness clear

## 🧭 Set Thy Face Toward The Mountains Of Israel

"Set thy face toward" means turn and look straight at something.

It describes a deliberate, fixed stare.

This is not a quick, casual glance.

God sends Ezekiel's attention straight at the mountains of Israel.

Those mountains held many shrines built to worship other gods.

A stare in scripture often signals coming judgment.

🧭 Set thy face means look straight at
⛰️ The target is the mountains of Israel
🛐 Mountains held shrines to false gods
📖 A fixed stare often signals judgment

## 📢 Prophesy Against Them

This does not mean Ezekiel speaks only to rocks and hills.

Mountains cannot hear a sermon and cannot repent.

The mountains stand in for the people who worship there.

Ezekiel speaks against the land because the land itself was defiled.

Judgment on the place becomes judgment on everyone who used it.

🏔️ Mountains stand in for their people
🙅 Mountains cannot hear or repent
🛐 The land itself was defiled
➡️ Judging the land judges its people

## 🗺️ To The Hills, To The Rivers, And To The Valleys

God names every kind of terrain in this one line.

Hills, rivers, and valleys cover the whole landscape of Israel.

No hidden shrine in any valley escapes this warning.

No high place on any hill is overlooked either.

The judgment is written to reach every single location.

🗺️ Every kind of land gets named
⛰️ Hills and valleys are both included
🌊 Rivers are named too
➡️ No hiding place is overlooked

## ⚔️ I, Even I, Will Bring A Sword Upon You

God repeats the word "I" here on purpose.

This is not an accident of invading armies.

God is not merely allowing an enemy to attack.

He is personally directing the sword that falls.

The repetition makes that claim impossible to miss.

⚔️ I, even I stresses personal action
🙅 This is not a random invasion
👑 God directs the sword himself
📖 Repetition makes the point unmistakable

## 🛕 Destroy Your High Places

A high place was a raised platform or shrine for worship.

Many sat on literal hills, since height felt closer to the gods.

Israel used these spots to worship idols instead of the LORD.

God names these shrines directly because of that betrayal.

Destroying the high places strikes at the center of Israel's sin.

🛕 High place means a hilltop shrine
⛰️ Height felt closer to the gods
🙅 Israel worshiped idols there instead of God
📖 God strikes the center of the sin

# Ezekiel 6:4-7
# ⚰️ The Idols Watch Their Worshipers Die
---
## 🪨 Your Altars Shall Be Desolate

An altar was the stone structure where sacrifices and incense were offered.

"Desolate" means left empty and ruined, with no one to use it.

These altars were built for other gods, not for the LORD.

God promises to leave every one of them abandoned and broken.

🪨 Altar means the stone place of sacrifice
💔 Desolate means empty and ruined
🙅 These altars served false gods
📖 God leaves them abandoned

## 🗿 Your Images Shall Be Broken

"Images" here means carved idol statues, not pictures.

People in this culture believed these statues held real power.

God promises to smash the very objects Israel trusted for protection.

An idol that can be broken was never real.

🗿 Images means carved idol statues
🙏 People trusted these objects for power
🔨 God promises to smash them
➡️ A broken idol was never real

## ⚰️ I Will Cast Down Your Slain Men Before Your Idols

The bodies of the dead will fall right in front of the idols.

Those idols were supposed to protect the very people now lying dead.

The scene makes the uselessness of the idols impossible to deny.

Worshipers die in the shadow of the gods they trusted most.

⚰️ Dead bodies fall before the idols
🙅 The idols cannot protect anyone
👁️ The scene proves the idols are powerless
📖 Trust in idols leads to ruin

## 💀 Lay The Dead Carcases Of The Children Of Israel Before Their Idols

"Carcases" is an old plain word for dead bodies.

Touching a dead body made a worshiper ceremonially unclean under Israelite law.

Stacking corpses in front of an altar would defile that altar completely.

The very shrines Israel used for worship fill with death instead.

💀 Carcases means dead bodies
🚫 Dead bodies made a person unclean
🪨 The defilement reaches the altars themselves
➡️ Shrines of worship fill with death

## 🦴 Scatter Your Bones Round About Your Altars

This is not a quick, tidy death.

Bones left scattered around the altars could never receive a proper burial.

A proper burial mattered deeply in this culture.

Leaving bones exposed was considered a lasting disgrace.

The very altars built for worship become unmarked graveyards instead.

🦴 Bones are left unburied
⚰️ No proper burial was possible
💔 Unburied bones meant lasting disgrace
📖 Shrines turn into graveyards

## 🏚️ The Cities Shall Be Laid Waste, And The High Places Shall Be Desolate

This judgment reaches far past the shrines on the hills.

Ordinary cities and homes are included in the destruction too.

Nowhere in the land offers real safety from what is coming.

The whole land shares in the same coming ruin.

🏚️ Cities are destroyed, not just shrines
🏠 Everyday homes are included
🙅 No safe place is left
➡️ The whole land shares the ruin

## 🔨 That Your Idols May Be Broken And Cease, And Your Images May Be Cut Down

God stacks up four different words for destruction in one verse.

Laid waste, broken, cut down, and abolished all appear together.

That repetition is deliberate, not sloppy writing.

It drives home just how total this judgment really is.

🔨 Four separate words for destruction appear
📜 Laid waste, broken, cut down, abolished
🎯 Repetition is deliberate, not accidental
📖 It shows how total the judgment is

## 📖 Ye Shall Know That I Am The LORD

This exact phrase repeats dozens of times across the whole book.

Judgment here is never only about punishment.

It exists to prove something to people who had stopped believing it.

God wants Israel to know him as LORD when everything else has failed.

📖 This phrase repeats often in Ezekiel
🎯 Judgment is not only punishment
🙏 It proves who God really is
➡️ Knowing God is the real goal

# Ezekiel 6:8-10
# 🌾 A Remnant Among The Nations
---
## 🌾 Yet Will I Leave A Remnant

A remnant means a small surviving part of a much larger group.

Total destruction is not God's last word in this chapter.

Even inside heavy judgment, God preserves a portion of his people.

That pattern repeats again and again throughout the prophets.

🌾 Remnant means a small surviving group
💔 Total destruction is not the final word
🙏 God preserves people within judgment
📖 This pattern repeats in the prophets

## 🗺️ Scattered Through The Countries

This describes the real exile that followed Israel's fall.

An empire conquered the land and carried many people away as captives.

Those captives ended up spread across a large foreign territory.

This is literal history, not only a picture or a metaphor.

🗺️ Describes the real coming exile
⚔️ An empire conquered and carried people away
🌍 Captives spread across foreign territory
📖 This is real history, not imagery

## 💔 I Am Broken With Their Whorish Heart

"Whorish" is the King James word for persistent unfaithfulness.

Prophets often compare Israel's idol worship to a broken marriage.

God had bound himself to Israel the way a husband binds to a wife.

Chasing after other gods broke that bond the way an affair would.

"I am broken" shows real grief, not only anger.

💔 Whorish means persistent unfaithfulness
💍 Idolatry is pictured as a broken marriage
😢 God shows real grief here
📖 This is grief, not only anger

## 👁️ Their Eyes, Which Go A Whoring After Their Idols

Eyes in this phrase stand for desire and attention.

"Go a whoring after" describes chasing something with longing eyes.

Israel kept glancing toward other gods instead of staying faithful to the LORD.

The idiom paints wandering desire as a kind of unfaithfulness.

👁️ Eyes represent desire and attention
🙅 Chasing idols is pictured as unfaithfulness
💔 Israel kept glancing toward other gods
📖 Wandering desire breaks a bond

## 😣 They Shall Lothe Themselves For The Evils Which They Have Committed

"Lothe" is an old spelling of loathe, meaning a strong disgust.

This disgust is aimed inward, at their own choices, not at God.

Exile was meant to produce honest shame, not only punishment.

Real change starts when people finally see their own sin clearly.

😣 Lothe means to feel strong disgust
🪞 The disgust is aimed at themselves
🎯 Exile was meant to produce honest shame
📖 Clear sight of sin starts real change

## 📜 I Have Not Said In Vain That I Would Do This Evil Unto Them

"In vain" means empty, with no real effect behind it.

Earlier prophets had already warned Israel that judgment was coming.

Those warnings were real, not empty threats meant only to scare people.

This moment proves every one of those earlier warnings true.

📜 In vain means empty or without effect
⚠️ Earlier warnings already said this was coming
✅ Those warnings turn out to be true
📖 God's word does not return empty

# Ezekiel 6:11-14
# 🔥 My Fury Accomplished
---
## 👏 Smite With Thine Hand, And Stamp With Thy Foot

God tells Ezekiel to physically clap his hand and stomp his foot.

This was a real, visible gesture Ezekiel acted out in public.

Ancient audiences used gestures like this to show shock, grief, or scorn.

Ezekiel's whole body becomes part of the message, not just his words.

👏 Ezekiel claps his hand for real
🦶 He also stamps his foot
😮 The gesture shows shock and grief
📖 His body preaches, not only his words

## 😖 Alas For All The Evil Abominations Of The House Of Israel

"Alas" is a cry of real grief, not a formal announcement.

"Abominations" means things God finds utterly detestable.

Here it points directly at Israel's idol worship.

This is a sin that broke the heart of the covenant itself.

😖 Alas is a cry of real grief
🙅 Abominations means utterly detestable things
🛐 Idol worship is the abomination named
📖 This sin broke the covenant itself

## ⚔️ They Shall Fall By The Sword, By The Famine, And By The Pestilence

These three threats describe exactly what a long siege looked like.

The sword was the danger of open battle.

Famine came from a city cut off from food for months.

Pestilence was the disease that spread fast inside crowded, starving cities.

⚔️ Sword describes danger in open battle
🍞 Famine comes from a long siege
🦠 Pestilence spreads inside a trapped city
📖 All three describe real siege warfare

## 🧭 He That Remaineth And Is Besieged Shall Die By The Famine

God names every possible way someone might try to survive.

Fleeing far away does not guarantee safety.

Staying close by does not guarantee safety either.

Hiding inside the besieged city offers no safety at all.

Every single escape route in this verse is closed.

🧭 Every kind of survivor is named
🏃 Fleeing far away is not safe
🏠 Staying near is not safe either
➡️ No escape route is left open

## 🔥 Thus Will I Accomplish My Fury Upon Them

"Fury" means God's full, righteous anger, fully carried out.

This anger follows centuries of patience, not a sudden impulse.

God warned Israel through prophet after prophet long before this moment.

The judgment finally matches the warnings that were ignored for generations.

🔥 Fury means full righteous anger
⏳ This follows centuries of patience
📢 Many prophets warned before this moment
📖 Judgment finally matches old warnings

## 🌳 Upon Every High Hill, In All The Tops Of The Mountains, And Under Every Green Tree

This phrase repeats often across the Old Testament.

Hilltops and shady trees were common sites for Canaanite worship.

Height and shade both felt closer to the divine to ancient worshipers.

Naming every one of these spots shows how widespread the idolatry had become.

🌳 Trees and hilltops were common worship sites
⛰️ Height felt closer to the divine
🍃 Shade felt the same way
📖 The list shows how widespread idolatry was

## 🕯️ The Place Where They Did Offer Sweet Savour To All Their Idols

"Sweet savour" normally describes a pleasing smell rising from a sacrifice to the LORD.

Here that same proper language gets applied to sacrifices for idols instead.

The words of true worship are being spent on a false god.

That borrowed language makes the betrayal even sharper.

🕯️ Sweet savour normally describes worship of God
🙅 Here it describes worship of idols
💔 True worship language used for a false god
📖 Borrowed words make betrayal sharper

## 🏜️ More Desolate Than The Wilderness Toward Diblath

Diblath is not mentioned anywhere else in the whole Bible.

Many scholars believe this name refers to Riblah, a city used as a military base in Syria.

The exact identity of the place matters less than the comparison itself.

Even the harshest wilderness becomes the measuring stick for how desolate this land will be.

🏜️ Diblath appears nowhere else in scripture
🗺️ Many scholars connect it to Riblah
📏 The comparison matters more than the name
📖 The land becomes worse than a wilderness
`.trim();

export const EZEKIEL_SIX_PERSONAL_SECTIONS = parseEzekielSixRawNotes(EZEKIEL_SIX_RAW_NOTES);
