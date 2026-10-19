export type RevelationSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationSeventeenRawNotes(rawText: string): RevelationSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 17:${startVerse}` : `Revelation 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 17 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_SEVENTEEN_RAW_NOTES = `# Revelation 17:1-3
# 👑 The Angel Reveals The Great Whore
---
## 🍶 One Of The Seven Angels Which Had The Seven Vials

This angel is one of the seven who poured out God's anger in the chapter before this one.

"Vials" means bowls, not small glass bottles.

Each bowl carried one specific judgment poured onto the earth.

Now that same messenger turns to explain something instead of judging.

🍶 Vials means bowls, not bottles

⚡ This angel poured one of the judgments

🔙 Chapter sixteen just finished those judgments

📖 Now the angel explains instead of judges

---
## 👑 I Will Shew Unto Thee The Judgment Of The Great Whore

"The great whore" is not a comment about one woman's private life.

Scripture often pictures a nation that chases money as an unfaithful wife.

This image names a whole system that turned away from God.

The coming judgment falls on that whole system.

👑 The great whore pictures a system

💔 Scripture pictures unfaithfulness as an affair

💰 This system chases money over God

📖 Judgment falls on the whole system

---
## 🌊 That Sitteth Upon Many Waters

This detail sounds strange on its own.

John explains it later in this same chapter.

Verse fifteen says the waters stand for peoples, multitudes, nations, and languages.

Sitting on many waters pictures authority across many nations.

🌊 Waters are explained later in the chapter

🌍 They stand for peoples and nations

👑 Sitting on waters pictures wide authority

📖 The chapter explains its own symbol

---
## 💔 The Kings Of The Earth Have Committed Fornication

This does not describe a literal affair between this woman and world leaders.

Prophets often use fornication as a picture for turning away from God.

Rulers who trade loyalty to God for wealth are described the very same way.

The real charge here is broken loyalty, not literal behavior.

💔 Fornication pictures broken loyalty, not an affair

👑 Kings trade loyalty to God for power

💰 Wealth and protection become the real prize

📖 Broken loyalty is the real charge

---
## 🍷 Made Drunk With The Wine Of Her Fornication

Wine that makes someone drunk clouds their judgment.

Think of how easy it becomes to go along once everyone around you already has.

The inhabitants of the earth are pictured the same way here, intoxicated by this system's wealth.

That spreading influence is what drunk pictures here.

🍷 Wine pictures something that clouds judgment

🌍 The whole earth is affected here

🤝 Going along gets easier over time

➡️ Influence spreads faster than one choice

---
## 👁️ Carried Away In The Spirit Into The Wilderness

John is not physically moved to another place.

This is vision language, the same kind used back in chapter one.

The wilderness is a place away from ordinary city life.

Scripture often uses it as a place where people see clearly.

👁️ Carried away in the spirit means a vision

🏜️ Wilderness means away from city life

📜 Moses and Elijah both met God there

📖 Clarity often comes away from the noise

# Revelation 17:4-6
# 🩸 The Woman Arrayed In Scarlet
---
## 💜 Arrayed In Purple And Scarlet Colour

Purple and scarlet dye were extremely costly in the ancient world.

Only royalty and powerful religious leaders could afford clothing dyed these colors.

This woman's clothing broadcasts wealth and status the moment anyone sees her.

💜 Purple and scarlet were costly dyes

👑 Only the rich and powerful wore them

💰 Her clothing broadcasts wealth and status

📖 Appearance hides what the system really is

---
## 💎 Decked With Gold And Precious Stones And Pearls

"Decked" means dressed up or decorated.

This woman is covered head to toe in the finest luxury the ancient world could offer.

Every piece of jewelry is meant to impress and to overwhelm.

Nothing about her appearance is accidental.

💎 Decked means dressed up in luxury

👀 Gold, stones, and pearls overwhelm the eye

🎭 Her look is designed to impress

📖 Luxury can disguise real corruption

---
## 🏆 A Golden Cup In Her Hand

A golden cup looks beautiful from the outside.

Verse four says plainly what is actually inside it, abominations and filthiness.

The cup pictures how this whole system works.

It offers something that looks attractive while hiding what it truly contains.

🏆 The cup looks beautiful outside

🤢 Abominations and filthiness fill it inside

🎭 Appearance and content do not match

📖 The system hides what it offers

---
## 📛 A Name Written, Mystery, Babylon The Great

"Mystery" here means a hidden truth now being revealed, not a puzzle to solve.

"Babylon" recalls the ancient empire that destroyed Jerusalem and carried God's people into exile.

Many scholars believe this name points to any powerful system that opposes God.

Writing the name on her forehead names exactly what she is.

📛 Mystery means a hidden truth revealed

🏛️ Babylon recalls the empire that exiled Israel

🌍 It points to any system that opposes God

📖 The name exposes what she really is

---
## 👩 The Mother Of Harlots And Abominations Of The Earth

Calling her a mother means every form of unfaithfulness to God traces back to this same source.

She does not stand alone as one isolated problem.

Every corrupt system that chases wealth instead of God shares her same spirit.

👩 Mother means this is the source

🌍 Other corruption traces back to her

🔁 Many systems share her same spirit

📖 This is not one isolated problem

---
## 🩸 Drunken With The Blood Of The Saints

This woman is not only wealthy, she is violent toward God's people.

"The saints" means ordinary believers.

"Martyrs of Jesus" means those killed for their faith in Him.

John reacts with genuine shock, wondering with great admiration at what he has just seen.

"Admiration" here is an old word for astonishment, not approval.

🩸 She persecutes God's people violently

⚰️ Martyrs means those killed for their faith

😲 Admiration here means shock, not approval

📖 Even John is stunned by this vision

# Revelation 17:7-9
# 🐉 The Mystery Of The Beast Explained
---
## ❓ Wherefore Didst Thou Marvel

"Wherefore" is an old word meaning why.

The angel notices John's shock and offers to explain it instead of leaving him confused.

This whole chapter exists to answer that exact question.

❓ Wherefore means why

😲 The angel notices John's shock

🗣️ He offers a full explanation

📖 The chapter answers John's own question

---
## 🐉 The Beast That Carrieth Her, Which Hath The Seven Heads And Ten Horns

This beast already appeared earlier in Revelation thirteen, rising out of the sea.

The woman does not act alone, she rides on this beast's power.

Seven heads and ten horns connect this creature directly to that earlier vision.

🐉 This beast already appeared in chapter thirteen

🤝 The woman rides on the beast's power

🔗 Seven heads and ten horns match chapter thirteen

📖 The two visions describe one single system

---
## ⏳ The Beast That Thou Sawest Was, And Is Not

This strange phrase describes power that existed, disappeared, and will return again.

Many scholars connect this to an empire that once seemed finished, only to return in a changed form.

The pattern of rising, falling, and rising again describes how evil power keeps resurfacing.

⏳ Was and is not means it disappeared

🔁 It later returns in a changed form

📉 Evil power rises and falls repeatedly

📖 History keeps seeing this same pattern

---
## 🕳️ Shall Ascend Out Of The Bottomless Pit

"The bottomless pit" names a place of imprisonment for evil spiritual forces.

This same place appears earlier in Revelation nine, holding back destructive power until it is released.

The beast's return is tied directly to this place of confinement.

🕳️ Bottomless pit means a place of confinement

⛓️ It holds back destructive spiritual power

🔓 Its release lets the beast return

📖 This power was always contained by God

---
## 📖 Whose Names Were Not Written In The Book Of Life

"The book of life" lists everyone who truly belongs to God.

Those amazed by this beast are the same people whose names never appear in that book.

Being impressed by this system reveals something real about where someone's loyalty actually lies.

📘 Book of life lists who belongs to God

😲 These people are amazed by the beast

💔 Their names are missing from that book

➡️ What impresses someone reveals their loyalty

---
## ⛰️ The Seven Heads Are Seven Mountains

John tells his readers this symbol has a real answer, not a riddle with no solution.

Many scholars believe seven mountains points to Rome, a city famously built on seven hills.

The woman sitting on these mountains pictures a government ruling through this corrupt system.

⛰️ Seven mountains likely points to Rome

🏛️ Rome was known for its seven hills

👑 The woman rules through this system

📖 The symbol has a real answer

# Revelation 17:10-11
# 👑 Seven Kings And An Eighth
---
## 👑 Five Are Fallen, And One Is

John describes a sequence of rulers, five already gone, one currently reigning.

This detail would have meant something concrete to the first readers of this letter.

The text does not tell us the exact names, but the pattern of succession is the real point.

👑 Five kings already came and went

🪑 One king currently reigns right now

📜 First readers understood this reference clearly

📖 Succession itself is the real point

---
## ⏱️ The Other Is Not Yet Come

A seventh ruler is still future from John's own point in history.

Verse ten says his reign will be short once he finally arrives.

Brief power is still real power, even when it does not last long.

⏱️ A seventh ruler is still future

⌛ His reign will be brief

⚡ Short power is still real power

📖 Brevity does not mean weakness

---
## 🔢 He Is The Eighth, And Is Of The Seven

This phrase sounds like a contradiction at first.

An eighth ruler cannot belong to an earlier group of seven, yet this one does.

Many scholars believe this points to the same corrupt power returning in a new form.

🔢 The eighth ruler shares the same spirit

🔁 He is a return, not someone new

♻️ Evil power recycles itself across history

📖 Form changes, the spirit does not

---
## 🔥 Goeth Into Perdition

"Perdition" means complete and final destruction.

Every version of this beast, past, present, and future, ends the exact same way.

No matter how powerful this system looks right now, its ending was already settled.

🔥 Perdition means total destruction

⏳ Every form of the beast shares this end

💪 Present power does not guarantee survival

📖 The ending was decided before it began

# Revelation 17:12-14
# ⚔️ Ten Kings And The Lamb's Victory
---
## 🔟 Ten Horns... Are Ten Kings, Which Have Received No Kingdom As Yet

These ten horns were already introduced back in verse three on the beast itself.

They represent rulers who do not hold power yet at the time John is writing.

Their authority is still future, not something already happening.

🔟 Ten horns already appeared in verse three

👑 They stand for rulers without power yet

⏳ Their authority is still future here

📖 Verse three and verse twelve connect

---
## ⏰ Receive Power As Kings One Hour With The Beast

"One hour" does not mean a literal sixty minutes.

It pictures a short, limited period of shared power with the beast.

Compared to God's eternal kingdom, even great earthly power lasts a very brief moment.

⏰ One hour means a brief period

🤝 They share power together with the beast

⚡ Their time in power is limited

📖 Earthly power is brief next to eternity

---
## 🧠 These Have One Mind

Unlike human alliances that usually argue and compete, these rulers act in total agreement.

They willingly hand their own strength over to serve the beast's purpose.

Complete unity around a corrupt cause makes this alliance especially dangerous.

🧠 One mind means total agreement

🤝 They give their power to the beast

⚠️ Unity around evil is still dangerous

📖 Agreement does not make a cause right

---
## ⚔️ These Shall Make War With The Lamb

"The Lamb" is one of Revelation's most common names for Jesus.

It pictures Him as the sacrifice who already defeated sin through His own death.

These kings gather their combined strength to fight against Him directly.

⚔️ These kings unite to fight the Lamb

🐑 The Lamb is a title for Jesus

🩸 It recalls His sacrifice for sin

📖 Human power now challenges heaven itself

---
## 👑 Lord Of Lords, And King Of Kings

This title places Jesus above every single ruler mentioned in this chapter.

Five fallen kings, one reigning king, a future king, and ten more kings all answer to Him.

No earthly power, however old or however new, ranks above this one King.

👑 This title ranks above every other king

📜 It covers rulers past, present, and future

🙌 No power on earth outranks Jesus

📖 Every throne eventually answers to Him

---
## ✅ Called, And Chosen, And Faithful

These three words describe the people standing with the Lamb in this battle.

"Called" means invited by God.

"Chosen" means selected for this purpose.

"Faithful" means they actually stayed loyal once called.

📣 Called means invited by God

🎯 Chosen means selected for a purpose

🙏 Faithful means they stayed loyal

📖 All three must be true together

# Revelation 17:15-18
# 🏙️ The Waters, The Hatred, And The City
---
## 🌊 The Waters... Are Peoples, And Multitudes, And Nations, And Tongues

This verse finally answers the question left open back in verse one.

The waters this woman sits on are not literal rivers or seas.

They represent every kind of people group under her wide influence.

🌊 Waters means peoples, not literal water

🌍 Her influence reaches many nations

🗣️ Tongues means different languages and cultures

📖 Her reach is wide, not local

---
## 💔 These Shall Hate The Whore

The same ten kings who once supported this system now turn against it completely.

Corrupt alliances built on greed rarely stay loyal once the advantage shifts.

Those who benefit from a corrupt system are often the first ones to destroy it.

💔 The same allies now turn against her

💰 Greed built this alliance, not real loyalty

🔄 Benefit shifting breaks the partnership fast

📖 Corrupt alliances rarely stay loyal long

---
## 🔥 Eat Her Flesh, And Burn Her With Fire

This graphic language describes total, irreversible destruction.

Ancient readers understood burning a body with fire as the most complete form of judgment available.

Nothing about this system will survive once this judgment finally arrives.

🔥 This pictures total, final destruction

⚰️ Burning was the most complete judgment

🚫 Nothing of the system survives

📖 Final judgment leaves nothing behind

---
## 🙏 God Hath Put In Their Hearts To Fulfil His Will

Even the beast's own violent allies end up serving God's larger plan without realizing it.

Their hatred and betrayal still accomplish exactly what God already decided would happen.

God remains in control of events even when evil people act from entirely selfish motives.

🙏 Their betrayal still serves God's plan

😈 Evil motives can fulfill God's will

👁️ God remains in control throughout

📖 Nothing happens outside God's purpose

---
## ⏳ Until The Words Of God Shall Be Fulfilled

This phrase sets a clear ending point for all of this chaos.

God's spoken promises, not human power struggles, determine when this story actually ends.

Every king, alliance, and betrayal in this chapter is working toward that one fixed point.

⏳ God's words set the real ending

📜 His promises decide when it stops

⚔️ Human power struggles do not decide it

📖 Everything moves toward God's fixed point

---
## 🏙️ That Great City, Which Reigneth Over The Kings Of The Earth

John's final explanation names exactly what this woman represents.

At the time John wrote, only one city truly reigned over the kings of the earth.

Many scholars believe this points directly to Rome, the dominant power of John's own day.

The vision still speaks to any future power that repeats this same pattern.

🏙️ She is a great ruling city

🏛️ This likely points to Rome

📜 Rome ruled the kings of that era

📖 The pattern can repeat in any era
`.trim();

export const REVELATION_SEVENTEEN_PERSONAL_SECTIONS = parseRevelationSeventeenRawNotes(REVELATION_SEVENTEEN_RAW_NOTES);
