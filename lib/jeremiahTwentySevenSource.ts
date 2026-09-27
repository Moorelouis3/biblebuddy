export type JeremiahTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentySevenRawNotes(rawText: string): JeremiahTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 27:${startVerse}` : `Jeremiah 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 27 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_SEVEN_RAW_NOTES = `# Jeremiah 27:1-3
# 🐂 Jeremiah Wears The Yoke
---
## 📜 In The Beginning Of The Reign Of Jehoiakim

This does not fit the rest of the chapter.

Every other verse here names Zedekiah as the king in charge.

Many scholars believe a copyist repeated the opening line from chapter twenty six by mistake.

Zedekiah was Judah's actual king when this message was given.

📜 Jehoiakim does not match this chapter

✍️ A copying mistake likely caused it

👑 Zedekiah was the true king here

📖 The chapter itself confirms Zedekiah

## 🐂 Make Thee Bonds And Yokes

"Yoke" means a wooden crossbar tied across an animal's neck.

"Bonds" means the ropes and straps that held it in place.

God tells Jeremiah to wear one in public, not just describe it.

Prophets sometimes acted out a warning instead of only speaking it.

🐂 Yoke means a wooden crossbar

🪢 Bonds means the ropes holding it

🎭 Jeremiah acted out this warning

📖 A worn yoke could not be ignored

## 🗺️ The King Of Edom, And To The King Of Moab

These two nations bordered Judah to the south and east.

Edom traces back to Esau, the brother of Jacob.

Moab traces back to Lot, the nephew of Abraham.

Both nations already shared a long family history with Judah.

🗺️ Edom and Moab border Judah nearby

👴 Edom traces back to Esau

🧓 Moab traces back to Lot

📖 Old family ties run deep here

## 📨 By The Hand Of The Messengers Which Come To Jerusalem

"Messengers" here means official envoys carrying a formal message.

These envoys were already gathered in Jerusalem for other business.

Jeremiah uses their existing trip to deliver God's word to each king at once.

One meeting becomes the delivery point for five separate messages.

📨 Messengers means official envoys

🏛️ They were already gathered in Jerusalem

🎯 Jeremiah uses their trip on purpose

📖 One meeting reaches five kings at once

## 👑 Unto Zedekiah King Of Judah

Zedekiah was the last king Judah ever had.

Nebuchadnezzar placed him on the throne after exiling the previous king.

He never ruled with full independence, always answering to Babylon above him.

This same message now reaches him through his own royal court.

👑 Zedekiah was Judah's final king

🪑 Babylon placed him on the throne

⛓️ He always answered to Babylon

📖 The message reaches him at court

# Jeremiah 27:4-8
# ⚖️ God Hands The Nations To Babylon
---
## 🎖️ The LORD Of Hosts, The God Of Israel

"Hosts" means armies, specifically the armies of heaven.

This title pictures God commanding every power that exists.

It backs up a claim about controlling kings and nations.

No earthly army could ever outrank this one.

🎖️ Hosts means heavenly armies

👑 God commands every power that exists

⚔️ No earthly army outranks it

📖 This title backs up God's claim

## 💪 By My Great Power And By My Outstretched Arm

"Outstretched arm" is an old picture of God acting directly.

The same phrase describes God's rescue of Israel out of Egypt.

Here that same strength now hands nations over to Babylon instead.

The God who once freed a nation can also hand one over.

💪 Outstretched arm means God acting directly

🐫 The same phrase describes the Exodus

🔄 Now that strength serves a new purpose

📖 The same God frees and hands over

## ⚖️ Given It Unto Whom It Seemed Meet Unto Me

"Meet" here means fitting or right, not a gathering.

God claims the plain right to assign lands to whoever He chooses.

That includes handing rule to a foreign, pagan king.

No throne exists outside of this authority.

⚖️ Meet means fitting or right

🌍 God assigns nations as He chooses

👑 Even a pagan king can receive rule

📖 No throne stands outside God's authority

## 🐍 Nebuchadnezzar The King Of Babylon, My Servant

Calling Nebuchadnezzar "my servant" does not mean he worshiped Israel's God.

It means God was using him to carry out a specific purpose.

A servant here does the master's will without necessarily knowing the master.

Babylon becomes God's chosen tool for judgment in this moment.

🐍 Servant does not mean he worshiped God

🛠️ God used him as a tool

🙈 A tool can act without knowing why

📖 Babylon carries out God's purpose here

## 🐾 The Beasts Of The Field Have I Given Him Also

God's authority is not limited to ruling people alone.

Even wild animals fall under this same sweeping claim.

This detail makes the scope of God's declaration total, not partial.

Nothing in creation sits outside His right to give it away.

🐾 Even animals are included here

🌍 God's claim covers all creation

🚫 Nothing sits outside His authority

📖 The scope here is total, not partial

## 👨‍👦 His Son, And His Son's Son

This points ahead to two more kings who would rule after Nebuchadnezzar.

Babylon's power was never going to last forever.

It was set to last only for a certain family line.

"Until the very time of his land come" means until Babylon's own turn for judgment arrives.

The empire receiving power now would one day lose it the same way.

👨‍👦 Points to two future Babylonian kings

⏳ Babylon's rule was never permanent

🔁 Babylon would face judgment later too

📖 Every empire's turn eventually comes

## ⚔️ With The Sword, And With The Famine, And With The Pestilence

These three disasters appear together again and again throughout Jeremiah.

"Sword" means war and invasion.

"Famine" means starvation from a siege or ruined harvest.

"Pestilence" means widespread disease.

Together they describe the full cost of refusing to submit.

⚔️ Sword means war and invasion

🌾 Famine means starvation

🤒 Pestilence means widespread disease

📖 Together they picture the cost of resisting

# Jeremiah 27:9-11
# 🔮 A Warning Against False Guidance
---
## 🚫 Hearken Not Ye To Your Prophets, Nor To Your Diviners

"Hearken" is an old word for listen closely and obey.

God commands the nations to ignore their own trusted voices this time.

That was not a small ask in a culture that respected court prophets deeply.

"Diviners" read omens and signs for hidden meaning.

🚫 Hearken means listen and obey

👂 God says ignore trusted local voices

🏛️ Court prophets were normally respected

📖 Even trusted voices can be wrong

## 🔮 Nor To Your Dreamers, Nor To Your Enchanters, Nor To Your Sorcerers

"Dreamers" claimed to receive special messages while sleeping.

"Enchanters" performed magic chants to influence events.

"Sorcerers" cast spells and curses for hire.

The law of Moses had already forbidden all of these practices.

Judah's neighbors trusted them anyway to help decide matters of state.

🔮 Three more ways to predict the future

📜 Moses had already forbidden these practices

🌍 Neighboring nations trusted them anyway

📖 Popularity never made them true

## 😔 To Remove You Far From Your Land... And That Ye Should Perish

God names the real outcome behind this comforting message.

These false prophets promised safety, but following them would end in exile.

The lie was not harmless, it aimed to destroy the very people it comforted.

God states the danger plainly instead of letting people discover it too late.

😔 The real outcome was exile

💀 Following the lie led to death

🎭 A comforting lie is still a lie

📖 God names the danger early

## 🌾 Will I Let Remain Still In Their Own Land

Submission to Babylon is presented here as the path to safety.

Nations that accepted the yoke would keep farming their own land in peace.

This is the exact opposite of what the false prophets were promising.

Surrender in this case meant survival, not shame.

🌾 Submission meant staying on their land

🕊️ Farming continued there in peace

🚫 The opposite of the false promise

📖 Surrender here meant survival

# Jeremiah 27:12-15
# 👑 The Same Word To Zedekiah
---
## 👑 I Spake Also To Zedekiah King Of Judah According To All These Words

Jeremiah repeats the exact same message to the king himself.

The same warning already given to five nations now reaches Judah's own throne.

God treats Zedekiah the same way He treats every other king nearby.

No king receives a private exemption from this warning.

👑 Same message reaches Zedekiah directly

🔁 It repeats what other kings heard

⚖️ God treats every king the same

📖 No king is exempt here

## 🐂 Bring Your Necks Under The Yoke Of The King Of Babylon, And Serve Him And His People, And Live

This line ties directly back to the yoke Jeremiah wears in verse two.

Submission is framed here as a choice that leads to life.

The command is aimed squarely at the one king making this decision.

A whole nation's fate rests on his answer.

🐂 Ties back to Jeremiah's worn yoke

🕊️ Submission leads to life here

👑 Aimed squarely at the king

📖 A nation's fate rests on his answer

## ❓ Why Will Ye Die, Thou And Thy People

This is a real question, not just dramatic language.

God asks Zedekiah to weigh an obvious choice honestly.

Sword, famine, and pestilence were already named as the cost of refusing.

The question exposes how avoidable this destruction actually was.

❓ A real question, not just drama

⚖️ Asks Zedekiah to choose honestly

⚔️ Refusal brings sword, famine, pestilence

📖 This destruction was avoidable

## 🔁 Ye Shall Not Serve The King Of Babylon

This is the very same false promise already given to the nations in verse nine.

The whole message repeats three times in this one chapter.

It reaches the nations, then the king, then the priests and people.

God makes sure no single group in Judah can claim they never heard it.

🔁 The same false promise repeats here

📣 The message reaches three audiences

🎯 This repetition is deliberate

📖 No group could claim ignorance

## 🚫 For I Have Not Sent Them, Saith The LORD

This line draws a sharp difference between a true prophet and a false one.

Sounding confident or spiritual is not the same as being sent by God.

God directly denies ever sending this message.

A message can sound religious and still not come from God at all.

🚫 God denies sending this message

🎭 Confidence does not mean being sent

📢 A true prophet is sent, not self appointed

📖 Not every voice speaks for God

# Jeremiah 27:16-18
# 🏺 The Vessels Of The LORD's House
---
## 📢 Also I Spake To The Priests And To All This People

The audience widens here from just the king to everyone.

This false hope was not a private rumor, it was spreading publicly.

Correcting it required speaking to the whole community, not just the throne.

A public lie needed a public answer.

📢 The audience widens to priests and people

🗣️ The false hope was spreading publicly

🏛️ Priests needed correcting too

📖 A public lie needs a public answer

## 🏺 The Vessels Of The LORD's House Shall Now Shortly Be Brought Again From Babylon

These vessels were sacred items already carried off in an earlier raid.

Nebuchadnezzar had already taken some of the temple's gold and silver years before this chapter.

False prophets were promising a quick, easy return of those treasures.

That promise was designed to sound hopeful and patriotic.

🏺 Vessels means the temple's sacred items

📦 Some were already taken earlier

🙌 False prophets promised a quick return

📖 A hopeful promise can still be a lie

## 🏙️ Wherefore Should This City Be Laid Waste

This question shifts the focus from the king's life to the whole city.

Jerusalem itself is on the line here, not just its ruler.

Refusing to submit would cost the city itself, not only lives.

The same choice offered to Zedekiah now includes what the people stand to lose.

🏙️ Focus shifts to the whole city

🔥 Jerusalem itself is at stake

⚖️ Refusal risks more than lives

📖 The same choice, framed around loss

## 🧪 If They Be Prophets, And If The Word Of The LORD Be With Them, Let Them Now Make Intercession

God offers the false prophets a direct test of their own claim.

"Intercession" means pleading with God on someone else's behalf.

If they truly spoke for God, they could ask Him to protect what remained.

Their silence on this test would expose the lie for what it was.

🧪 God offers a direct test

🙏 Intercession means pleading for others

🏺 The test concerns the remaining vessels

📖 Real words hold up under testing

## 🏺 That The Vessels Which Are Left... Go Not To Babylon

This names exactly what is still at stake inside the temple.

Not everything sacred had been taken yet.

Whether these vessels stayed or left depended on the nation's response to this warning.

The next verses answer that question directly.

🏺 Some sacred vessels still remained

❓ Their fate was still undecided

⚖️ The nation's response would decide it

📖 The next verses answer the question

# Jeremiah 27:19-22
# 🏛️ The Remaining Vessels Will Follow
---
## 🏛️ Concerning The Pillars, And Concerning The Sea, And Concerning The Bases

These were specific, massive bronze furnishings inside Solomon's temple.

The "pillars" were two large bronze columns standing at the temple's entrance.

The "sea" was a huge bronze basin used for priestly washing.

The "bases" were the movable stands that held smaller basins.

🏛️ Pillars were bronze entrance columns

🌊 The sea was a huge bronze basin

🧺 Bases were stands for smaller basins

📖 All were original temple furnishings

## 👑 Which Nebuchadnezzar King Of Babylon Took Not, When He Carried Away Captive Jeconiah

"Jeconiah" is another name for Jehoiachin, an earlier king of Judah.

Babylon had already exiled him along with many nobles years before this chapter.

That first deportation took people and some treasures, but not everything.

This chapter now answers what happens to what was left behind.

👑 Jeconiah is Jehoiachin, an earlier king

⛓️ He was already exiled to Babylon

📦 That raid did not take everything

📖 This chapter finishes that story

## 🏺 They Shall Be Carried To Babylon

God confirms that the remaining vessels will not be spared after all.

The false prophets' promise of an early return is directly contradicted here.

Even sacred objects were not exempt from the coming judgment.

This was not cruelty, it was simply the truth the false prophets refused to say.

🏺 The remaining vessels will also go

🚫 This contradicts the false prophets directly

⚖️ Even sacred objects were not exempt

📖 God states the truth plainly

## 📅 Until The Day That I Visit Them

"Visit" here means the day God chooses to act again.

This phrase quietly promises the exile will not last forever.

A specific day is coming when God turns His attention back to these objects.

The judgment in this chapter is not God's final word.

📅 Visit means the day God acts again

⏳ The exile will not last forever

🔄 God's attention will return to them

📖 Judgment is not God's final word

## 🙌 Then Will I Bring Them Up, And Restore Them To This Place

This promise came true generations later under a Persian king named Cyrus.

The book of Ezra records these very temple vessels being carried back to Jerusalem.

What looked like total loss in Jeremiah's day was only ever temporary.

Judgment and the promise of return were spoken in this very same chapter.

🏺 This promise came true under Cyrus

⏳ The loss was only ever temporary

🙌 Judgment and restoration share one God

📖 Ezra records the vessels' return
`.trim();

export const JEREMIAH_TWENTY_SEVEN_PERSONAL_SECTIONS = parseJeremiahTwentySevenRawNotes(JEREMIAH_TWENTY_SEVEN_RAW_NOTES);
