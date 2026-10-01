export type JeremiahThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtySixRawNotes(rawText: string): JeremiahThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 36:${startVerse}` : `Jeremiah 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 36 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_SIX_RAW_NOTES = `# Jeremiah 36:1-3
# 📜 The Command To Write It All Down
---
## ⚔️ In The Fourth Year Of Jehoiakim

This timestamp lands in the same year Babylon crushed Egypt at Carchemish.

Jehoiakim was Josiah's son.

Egypt placed him on the throne, and he was never loyal to God.

That battle was the exact moment Babylon became the great empire Jeremiah had warned about.

God picked this turning point to gather every warning into one written scroll.

⚔️ Babylon had just crushed Egypt

👑 Jehoiakim was Josiah's disloyal son

🌍 Babylon became the empire of the hour

📖 God timed the scroll to this moment

---

## 📜 Take Thee A Roll Of A Book

A roll means a scroll, not a book with pages like we use today.

Ancient scribes wrote on long sheets of papyrus or leather and rolled them around a stick.

God told Jeremiah to put every single sermon he had preached onto that one scroll.

Nothing before this had ever been gathered into one complete written record.

📜 A roll means a scroll

✍️ Scribes wrote on papyrus or leather

🗂️ Every sermon was gathered in one place

📖 This became Jeremiah's first full written record

---

## 📆 From The Days Of Josiah, Even Unto This Day

Jeremiah had been preaching since the thirteenth year of king Josiah, over twenty years earlier.

This scroll was not one sermon but a lifetime of warnings compiled at last.

Josiah had been a godly king who tried to turn the nation back to God.

Jehoiakim, his son, was undoing that reform one decision at a time.

📆 Jeremiah had preached over twenty years

📚 The scroll held a lifetime of warnings

👑 Josiah had been a godly reformer

📖 Jehoiakim was undoing his father's reform

---

## ❓ It May Be

This phrase sounds uncertain.

It is not God doubting Himself.

God already knows how Judah will respond to this warning.

The uncertainty belongs to the people, not to God.

He is holding the door open for repentance even now.

Giving one more warning before judgment falls is patience, not weakness.

❓ It may be sounds uncertain

🎯 God already knows their response

🚪 The door for repentance stays open

📖 Patience comes before judgment, not weakness

---

## 🔄 Return Every Man From His Evil Way

To return means to repent, turning around and walking back toward God.

Every man shows this was not just a national policy change.

God wanted each individual person to make this choice personally.

Judah's failure in this book is always personal before it is national.

🔄 Return means repent and turn back

🧍 Every man means individual choice

🙏 Not a national policy, a personal one

📖 Personal sin always comes before national sin

---

# Jeremiah 36:4-8
# ✍️ Baruch Writes And Reads
---
## ✍️ Baruch The Son Of Neriah

Baruch was Jeremiah's scribe and closest companion through the hardest years of his ministry.

He appears nowhere in scripture working for anyone but Jeremiah.

Writing by dictation was skilled work.

Every word had to be captured correctly on scarce material.

Baruch risked his own safety simply by being connected to Jeremiah's unpopular message.

✍️ Baruch was Jeremiah's trusted scribe

🤝 He served no one but Jeremiah

📜 Dictation required careful, skilled work

📖 Loyalty to Jeremiah carried real risk

---

## 🚫 I Am Shut Up

This phrase means Jeremiah was barred from entering the temple himself.

The text does not tell us exactly why he was kept out.

It may have been an official ban after his earlier temple warnings in chapter twenty six.

Whatever the reason, God simply used a different method to reach the people.

🚫 Shut up means barred from entering

❓ The text does not explain why

📜 Chapter twenty six may be the reason

📖 God found another way to speak

---

## 🍽️ In The LORD's House Upon The Fasting Day

A fasting day was a public day set aside for the whole nation to seek God.

People stopped eating and gathered to show sorrow and urgency before the LORD.

Baruch was told to read the scroll on exactly this kind of day.

A fast meant the biggest possible crowd would hear Jeremiah's words at once.

🍽️ A fast meant the nation sought God

😔 Eating stopped to show urgency

📅 Baruch read it on a fast day

📖 The timing guaranteed the largest crowd

---

## 🏙️ All Judah That Come Out Of Their Cities

Jerusalem swelled with visitors on a fast day.

People traveled in from every town in Judah.

This was not a message meant only for the capital city.

Every community in the land needed to hear this same warning.

🏙️ Jerusalem filled with visitors on fast days

🗺️ People came from every town in Judah

📢 The warning was not for the capital alone

📖 The whole land needed to hear it

---

## ✅ Baruch Did According To All That Jeremiah Commanded

Baruch obeyed exactly, without changing a single instruction.

He had every reason to be afraid.

He still read the scroll in public anyway.

This is the same obedience Jeremiah himself had shown for over twenty years.

Faithful delivery of God's word can cost the messenger as much as the message itself.

✅ Baruch obeyed without changing anything

😨 He read it publicly despite real fear

🔁 His obedience matched Jeremiah's own pattern

📖 Faithful delivery can cost the messenger too

---

# Jeremiah 36:9-13
# 🏛️ The Reading In Gemariah's Chamber
---
## 📆 In The Fifth Year, In The Ninth Month

A full year had passed since Baruch first read the scroll in chapter five.

The ninth month on Judah's calendar fell in the cold winter season, around our December.

This detail explains why the king later sits by a fire later in this chapter.

Proclaiming a fast like this normally meant the nation faced a real danger.

📆 A year had passed since the first reading

❄️ The ninth month fell in winter

🔥 This explains the fire later in the chapter

📖 Time and season both matter to the story

---

## ⚠️ Proclaimed A Fast Before The LORD

National fasts were not routine.

They were called only during real danger or crisis.

By this time, Babylon loomed as a growing threat over Judah's future.

Calling the whole nation to fast shows how serious this moment had become.

⚠️ Fasts were called only during real danger

🌍 Babylon was the growing threat

📣 The whole nation was summoned

📖 This shows how serious the moment was

---

## 🏛️ The Chamber Of Gemariah The Son Of Shaphan

Shaphan was the royal scribe who helped King Josiah years earlier in chapter twenty two of second Kings.

Shaphan's family stayed loyal to God's word long after Josiah died.

His son Gemariah lending his own chamber for this reading was a quiet act of support.

This same family protected Jeremiah again and again across many chapters.

📜 Shaphan served godly king Josiah

👪 His family stayed loyal after Josiah died

🏛️ Gemariah lent his chamber for the reading

📖 This family protected Jeremiah again and again

---

## 🚪 At The Entry Of The New Gate

The new gate was a well known entrance into the temple courts.

Reading here, at the higher court, placed Baruch in the busiest, most visible spot in the whole temple.

This was not a quiet, private reading.

It was a public broadcast to everyone passing through.

🚪 The new gate was a temple entrance

👀 It was the busiest, most visible spot

📢 This was a public reading, not private

📖 Everyone passing through could hear it

---

## 👂 When Michaiah Heard All The Words

Michaiah was Gemariah's son and Shaphan's grandson, a third generation in this same trusted family.

He heard the entire reading firsthand, not a rumor passed along secondhand.

What he heard troubled him enough to act immediately.

His next move set off everything that follows in this chapter.

👂 Michaiah heard the reading firsthand

👪 Third generation of the same trusted family

🏃 He acted immediately on what he heard

📖 Firsthand truth moved him to act

---

## 🏛️ Into The King's House, Into The Scribe's Chamber

Michaiah did not go to the king directly.

He went first to the officials, the proper chain of authority in the royal court.

This was a careful, responsible report, not a reckless leak.

🏛️ Michaiah went to officials first

📋 He followed the proper chain of authority

🤐 This was a careful report, not a leak

📖 Responsible process came before royal action

---

## 🗣️ Michaiah Declared Unto Them All The Words

Michaiah repeated the message accurately to the gathered officials.

This was the second time the scroll's words had now been read in Jerusalem that same day.

Word of its content was spreading fast through the halls of power.

What started as one public reading was now reaching the king's own officials.

🗣️ Michaiah repeated the message accurately

🔁 This was the second reading that day

⚡ Word was spreading fast through the palace

📖 The scroll could no longer be ignored

---

# Jeremiah 36:14-19
# 😨 The Princes Summon Baruch
---
## 👤 Jehudi The Son Of Nethaniah

Jehudi's name is traced back three generations, ending with Cushi.

Cushi likely marks a Cushite, or African, ancestor somewhere in the family line.

A messenger's family background rarely mattered this much in scripture.

Naming it here hints that Jehudi's background was worth remembering to the original readers.

👤 Jehudi's line is traced three generations

🌍 Cushi likely marks African ancestry

📝 This detail is unusually specific

📖 The original readers found it worth noting

---

## 😨 They Were Afraid, Both One And Other

Every official in the room reacted with the same fear, not just one or two.

They recognized immediately that burning anger from God stood behind these words.

Fear here was not cowardice, it was an accurate read of real danger.

😨 Every official felt the same fear

🔥 They recognized God's anger behind the words

✅ This fear was accurate, not cowardly

📖 Real danger produces real reactions

---

## ⚠️ We Will Surely Tell The King

These officials knew the content was too dangerous to keep quiet.

Telling the king was their legal and political duty, whatever the risk to themselves.

Their honesty here sets up the danger Baruch and Jeremiah are about to face.

⚠️ The content was too dangerous to hide

📋 Reporting to the king was their duty

🎯 Honesty here created real danger ahead

📖 Duty and danger arrived together

---

## ❓ How Didst Thou Write All These Words At His Mouth

The princes wanted to know Baruch's exact method of recording this.

They needed to be certain this was truly Jeremiah's prophecy, not Baruch's own invention.

Verifying the source mattered before anyone took the message to the king.

❓ They asked about Baruch's exact method

🔍 They needed to confirm the true source

✅ Verification came before action

📖 Truth had to be certain first

---

## 🖋️ I Wrote Them With Ink In The Book

Baruch confirms he was only the pen, Jeremiah was the voice.

He took dictation word for word, adding nothing of his own.

This plain answer protected both men from any accusation of fraud.

🖋️ Baruch was the pen, not the voice

📝 He wrote exactly what Jeremiah spoke

🛡️ His honesty protected them both

📖 A plain answer ended the accusation

---

## 🤝 Go, Hide Thee, Thou And Jeremiah

These same princes who feared the king still chose to protect Jeremiah and Baruch.

Their warning gave both men a chance to disappear before anyone could be arrested.

Not every official in Jehoiakim's court was hostile to God's prophet.

🤝 The princes still chose to protect them

🏃 They gave both men a chance to flee

👥 Not every official opposed Jeremiah

📖 Mercy came from an unexpected place

---

# Jeremiah 36:20-23
# 🔥 The King Burns The Scroll
---
## 📜 They Laid Up The Roll In The Chamber Of Elishama

The officials protected the actual scroll even while reporting its contents to the king.

Keeping the original safe mattered, since a copy could always be challenged later.

This small act of caution turns out to matter later in the chapter.

📜 The scroll itself was kept safe

🛡️ A safe original could not be disputed

⏳ This caution matters later in the story

📖 Small precautions can carry real weight

---

## 🔁 The King Sent Jehudi To Fetch The Roll

Jehudi now switches roles, from royal messenger to the one who must read Jeremiah's warnings aloud to the king himself.

This was the third time this same scroll had now been read out loud.

Each reading moved the message one level closer to the throne.

🔁 Jehudi now reads it to the king

📖 This was the third public reading

⬆️ Each reading climbed closer to the throne

➡️ The warning had finally reached Jehoiakim himself

---

## 🏠 The King Sat In The Winterhouse

A winterhouse was a palace room built to stay warm during the cold ninth month.

This detail is not filler, it explains exactly why a fire was already burning nearby.

Kings often had separate quarters for summer and winter, much like different rooms for different seasons.

🏠 A winterhouse stayed warm in winter

🔥 It explains the nearby burning fire

🗓️ Kings kept separate seasonal quarters

📖 Small details set up the scene ahead

---

## 🔥 A Fire On The Hearth Burning Before Him

The fire was already lit before Jehudi even began reading.

That detail now looks like foreshadowing of exactly what the king intended to do.

Comfort and destruction sat in the very same room.

🔥 The fire was burning before the reading began

⚠️ It foreshadows what happens next

🏛️ Comfort and destruction shared one room

📖 Small setup becomes the chapter's turning point

---

## 🔪 He Cut It With The Penknife

A penknife was a small blade used for sharpening reed pens, not a weapon.

Jehoiakim turned an ordinary writing tool into an instrument of rejection.

This was deliberate, not panic, since cutting and burning took real time and attention.

🔪 A penknife normally sharpened pens

🔥 The king turned it into rejection

⏳ Cutting and burning took real time

📖 This was calm defiance, not panic

---

## 📄 Three Or Four Leaves

A leaf here means one column of writing on the scroll, not a loose page.

The king did not wait for the whole scroll to be read before destroying it.

He cut it apart little by little as Jehudi kept reading.

📄 A leaf means one written column

✋ The king did not wait to finish

🔪 He destroyed it piece by piece

📖 Rejection happened in real time

---

## 🔥 Until All The Roll Was Consumed In The Fire

Every single word Jeremiah had dictated was now ash.

Burning God's word did not erase the warning, it only sealed Jehoiakim's own fate.

What took Baruch many hours to write was destroyed in a few minutes.

🔥 Every word was reduced to ash

⚖️ Burning it sealed the king's own fate

⏱️ Hours of writing, minutes to destroy

📖 God's word cannot be erased by fire

---

# Jeremiah 36:24-26
# 🙅 No Fear, No Mercy
---
## 👕 They Were Not Afraid, Nor Rent Their Garments

Tearing one's garment was the normal, expected sign of grief or repentance in this culture.

Not one person in that room showed any sign of sorrow or alarm.

Compare this to king Josiah, Jehoiakim's own father.

Josiah tore his own robes when he heard God's word in second Kings twenty two.

Father and son reacted to the exact same kind of warning in opposite ways.

👕 Tearing garments showed grief or repentance

🚫 No one in the room showed either

👑 Josiah had torn his robes for this reason

📖 Father and son reacted in opposite ways

---

## 🙏 Elnathan And Delaiah And Gemariah Made Intercession

Three officials actually begged the king not to burn the scroll.

Elnathan had once helped capture a prophet for execution back in chapter twenty six.

That same man now tries to save Jeremiah's written words instead.

People are not always locked into the same choice twice.

🙏 Three officials begged the king to stop

🔄 Elnathan had opposed a prophet before

🤲 Now he tries to save Jeremiah's words

📖 People can choose differently the second time

---

## 🙉 He Would Not Hear Them

Jehoiakim rejected wise advice from his own trusted officials.

Refusing good counsel here mirrors his refusal to hear God's own word.

A king who will not listen to people rarely listens to God either.

🙉 Jehoiakim ignored his own advisors

🔁 This mirrors his rejection of God's word

👑 Closed ears to people, closed ears to God

📖 Refusing counsel and refusing God go together

---

## 👪 Jerahmeel The Son Of Hammelech

Hammelech may not be a personal name at all, it can simply mean the king in Hebrew.

Some translations read this as Jerahmeel, a son of the king, possibly one of Jehoiakim's own sons.

Either way, the king sent his own household to arrest God's prophet.

👑 Hammelech may simply mean the king

👪 He may have been the king's own son

🚔 The king sent his own household to arrest

📖 Jehoiakim turned his own family against God's prophet

---

## 🛡️ But The LORD Hid Them

Jehoiakim's men searched, yet Baruch and Jeremiah were never found.

The text does not explain exactly how they stayed hidden.

What it does say plainly is that God Himself was the one protecting them.

No human effort could override that kind of protection.

🔍 The king's men searched for them

❓ The text does not explain how

🛡️ God Himself was their protection

📖 No human effort could override that

---

# Jeremiah 36:27-32
# 📝 A Second Scroll, A Worse Judgment
---
## 🔄 Take Thee Again Another Roll

God's response to the burned scroll was not retreat but repetition.

Fire could destroy paper, but it could never destroy the message itself.

Jehoiakim's whole plan to silence Jeremiah had already failed before it even finished.

🔄 God answered destruction with repetition

🔥 Fire destroys paper, not the message

❌ Jehoiakim's plan failed before it finished

📖 God's word cannot be silenced by fire

---

## 🗣️ Why Hast Thou Written Therein

God quotes Jehoiakim's own private objection back to him word for word.

Nothing said in the king's winterhouse was ever truly hidden from God.

This line reveals exactly what Jehoiakim found most offensive, the prophecy against Babylon's rise.

🗣️ God quotes the king's own words

👁️ Nothing was hidden from God

⚔️ Babylon's prophecy offended Jehoiakim most

📖 God hears what is said in private

---

## 👑 He Shall Have None To Sit Upon The Throne Of David

This judgment did not mean David's line itself would end, God had already promised otherwise.

It meant Jehoiakim personally, and his direct descendants after him, would never rightfully rule from Jerusalem again.

His own son Jehoiachin reigned barely three months before being dragged off to Babylon.

👑 David's line itself was not ending

🚫 Jehoiakim's own descendants lost the throne

⏳ His son ruled barely three months

📖 God's judgment landed exactly where promised

---

## 🌡️ His Dead Body Cast Out To The Heat And Frost

Kings in this culture expected an honorable burial inside the royal tombs.

This judgment promised the opposite, an exposed, dishonored death with no burial at all.

Being left unburied was considered one of the worst fates imaginable in the ancient world.

👑 Kings expected an honorable royal burial

🚫 Jehoiakim was promised the opposite

🌡️ Exposed to heat by day, frost by night

📖 Being unburied was a feared, shameful fate

---

## ⚖️ I Will Punish Him And His Seed And His Servants

The judgment was never meant to stop with Jehoiakim alone.

His household, his officials, and the whole population of Jerusalem and Judah would share the consequences.

Sin at the top of a nation rarely stays contained to the top alone.

⚖️ Judgment reached beyond Jehoiakim alone

👪 His household and officials were included

🏙️ Jerusalem and Judah shared the consequence

📖 Sin at the top rarely stays contained

---

## 🙉 But They Hearkened Not

Despite every warning, every scroll, and every messenger, nothing changed.

This short phrase closes the chapter on a note of stubborn refusal.

The scroll survived the fire, but the people's hearts did not survive their own pride.

🙉 Nothing changed despite every warning

📜 Scrolls and messengers made no difference

🔥 The scroll survived, but hearts did not

📖 Stubborn pride outlasted every warning given

---

## ➕ There Were Added Besides Unto Them Many Like Words

The second scroll was not simply a copy of the first.

Jeremiah included every original word, then added even more on top of it.

Jehoiakim's fire did not shrink the message, it ended up making it longer.

📜 The second scroll was not a plain copy

➕ Jeremiah added even more words to it

🔥 Burning the first only grew the second

📖 Destruction could not shrink God's word
`.trim();

export const JEREMIAH_THIRTY_SIX_PERSONAL_SECTIONS = parseJeremiahThirtySixRawNotes(JEREMIAH_THIRTY_SIX_RAW_NOTES);
