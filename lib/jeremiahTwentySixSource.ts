export type JeremiahTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentySixRawNotes(rawText: string): JeremiahTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 26:${startVerse}` : `Jeremiah 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 26 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_SIX_RAW_NOTES = `# Jeremiah 26:1-3
# 📜 Stand In The Court And Speak
---
## 👑 In The Beginning Of The Reign Of Jehoiakim

Jehoiakim was the son of Josiah and a king of Judah.

"In the beginning of the reign" marks an early, specific moment in his rule.

Josiah had been a reforming king who tried to turn the nation back to God.

Jehoiakim did not share his father's heart for that reform.

This message arrives right as Judah's direction was starting to shift again.

👑 Jehoiakim was Josiah's son

🔄 He did not share Josiah's reforms

🗓️ This word came early in his reign

📖 Judah's direction was already shifting

## 🏛️ Stand In The Court Of The LORD's House

"The court" was the open outer area surrounding the temple building itself.

It was not the inner sanctuary where only priests could enter.

Standing there let Jeremiah speak to ordinary worshipers as they walked in and out.

This was the most public place in the whole nation to deliver a message.

God wanted this warning heard by as many people as possible.

🏛️ The court was the temple's outer area

🚶 Ordinary worshipers passed through it

📢 It was the most public place in Judah

📖 God wanted the widest possible audience

## 🌾 All The Cities Of Judah, Which Come To Worship

This phrase points to worshipers traveling in from towns all across Judah.

The temple in Jerusalem was the one place the whole nation gathered to worship.

People came from small villages and farming towns, not just the capital.

Jeremiah's message would travel home with them to every corner of the land.

No town could later claim it never heard this warning.

🌾 Worshipers came from every town in Judah

🏛️ The temple was the one shared gathering place

🚶 Visitors would carry the message home

➡️ No town could claim it was never warned

## ✂️ Diminish Not A Word

"Diminish" means to make something smaller by cutting parts away.

God told Jeremiah not to soften or shorten the message at all.

It would have been easy to leave out the harshest lines to avoid trouble.

Jeremiah was commanded to deliver the whole warning exactly as given.

A messenger who edits the message is no longer being honest with it.

✂️ Diminish means cutting parts away

🚫 Jeremiah could not soften the message

📜 He had to deliver the whole warning

📖 An edited message is not an honest one

## 🔄 That I May Repent Me Of The Evil

This does not mean God had sinned and needed to repent the way a person does.

"Repent" here means God changing His planned response because people changed first.

The judgment was never locked in no matter what Judah did.

Turning from evil ways was always the way to turn judgment aside.

God's warnings were an invitation to change, not a fixed sentence.

🔄 God's repenting means changing His response

🚫 It does not mean God sinned

🔁 Judah's turning could still turn judgment aside

📖 A warning is an invitation, not a sentence

# Jeremiah 26:4-6
# 🏚️ Like Shiloh, Like A Curse
---
## 📜 To Walk In My Law, Which I Have Set Before You

"My law" refers to the instructions God had already given Israel through Moses.

"Walk in" is a common Hebrew picture for how someone lives day to day.

It does not mean simply reading the law or agreeing with it.

It means actually living by it, one step and one choice at a time.

God had already given Judah everything it needed to know how to live.

📜 The law came through Moses

🚶 Walk in means living it out daily

📖 Agreeing is not the same as obeying

➡️ Judah already had everything it needed

## 🌅 Rising Up Early, And Sending Them

"Rising up early" is a Hebrew idiom for urgent, persistent effort.

It does not describe God's literal schedule or the time of day.

God kept sending prophet after prophet, refusing to give up on Judah.

Sending them again and again showed how much patience the warning already carried.

By the time this chapter happens, that patience had already lasted for generations.

🌅 Rising early means persistent effort

🚫 It is not about the literal hour

📨 God sent many prophets, not one

📖 Patience had already lasted generations

## 🏚️ Then Will I Make This House Like Shiloh

Shiloh was an earlier worship site where the tabernacle once stood for centuries.

It was destroyed after the sons of Eli disgraced the priesthood there.

Many in Jerusalem assumed the temple could never suffer that same fate.

God directly challenges that assumption by naming Shiloh out loud.

The same God who let Shiloh fall could let Jerusalem's temple fall too.

🏚️ Shiloh was an earlier worship site

💥 It was already destroyed once before

🏛️ Many assumed the temple was different

📖 God says it was never guaranteed safe

## 🌍 A Curse To All The Nations Of The Earth

Becoming "a curse" meant Jerusalem's name would be used as a warning example.

Other nations would point to its ruin when cursing someone else.

This was not just physical destruction for the city itself.

Its reputation would be dragged down along with its buildings.

The warning reached far beyond Judah's own borders and its own century.

🌍 A curse means a warning example

🗣️ Other nations would use Jerusalem's name that way

🏚️ Its reputation would fall with its buildings

➡️ The warning reached beyond Judah alone

# Jeremiah 26:7-9
# ⚠️ Thou Shalt Surely Die
---
## 👥 The Priests And The Prophets And All The People

Three different groups are named together on purpose.

Priests ran the temple and its daily worship.

Prophets were the ones who claimed to speak for God.

The people were everyone else gathered that day.

These were exactly the groups who should have recognized a true message from the LORD.

Instead all three united against the one man who actually was speaking for Him.

👥 Three separate groups are named

🏛️ Priests ran the temple

🗣️ Prophets claimed to speak for God

📖 All three united against the true prophet

## ⚠️ Took Him, Saying, Thou Shalt Surely Die

"Took him" means they physically seized and restrained Jeremiah.

This was not yet a formal legal trial with judges deciding a case.

It was a mob reacting in the heat of the moment.

"Thou shalt surely die" was a threat, not an official sentence.

The real trial with actual judges comes only a few verses later.

⚠️ Took him means seized and restrained

👥 This was a mob, not a court

🗣️ The death threat was not official yet

➡️ The formal trial comes just after this

## ❓ Why Hast Thou Prophesied In The Name Of The LORD

This sounds like a fair question but it was really an accusation dressed as one.

The crowd was not genuinely asking Jeremiah to explain himself.

They had already decided his message was false and dangerous.

Claiming to speak in the LORD's name was treated as the crime itself.

The real question was never asked: was Jeremiah actually telling the truth.

❓ This sounds like a question but is not

⚖️ The crowd had already judged him guilty

🗣️ Speaking for the LORD was called a crime

➡️ No one asked if it was true

## 🏚️ This City Shall Be Desolate Without An Inhabitant

"Desolate" means completely emptied out and left in ruins.

"Without an inhabitant" makes that emptiness total, not one person left behind.

This was the specific line that enraged the crowd the most.

Predicting an empty, ruined Jerusalem sounded like treason against their own home.

They heard an attack on the city, not a warning meant to save it.

🏚️ Desolate means emptied and ruined

🚫 Without an inhabitant means no one left

😠 This was the line that enraged them

📖 A warning was heard as an attack

## 👥 All The People Were Gathered Against Jeremiah

A crowd forming together can feel like proof that someone is guilty.

Numbers were never the test of whether Jeremiah's message was true.

One man speaking God's actual words stood against an entire gathered crowd.

Being outnumbered did not mean Jeremiah was wrong.

Truth does not need a majority vote to still be true.

👥 A crowd is not proof of guilt

🗣️ One man stood against many

⚖️ Numbers never decided who was right

📖 Truth does not need a majority

# Jeremiah 26:10-12
# ⚖️ The LORD Sent Me
---
## 🏛️ The Princes Of Judah Heard These Things

"Princes" here means high officials and nobles, not literal sons of the king.

They served as judges and administrators under the king's authority.

Hearing about the uproar at the temple was enough to bring them running.

Their arrival turns a chaotic mob scene into a formal legal matter.

This is the moment order finally arrives while Jeremiah's life is still threatened.

🏛️ Princes means officials and judges

👑 They served under the king's authority

⚖️ Their arrival made this a formal case

📖 Order finally reaches the mob

## 🚪 Sat Down In The Entry Of The New Gate

City gates in ancient Israel were the normal place for public legal proceedings.

Elders and officials would sit there to hear disputes and render judgment.

"The new gate" points to a specific, recently built entrance to the temple area.

Sitting down at the gate signaled that this had become an official trial.

Jeremiah's fate would now be decided by a real legal process, not a mob.

🚪 City gates hosted legal proceedings

⚖️ Sitting down signaled an official trial

🏛️ The new gate was a temple entrance

➡️ A mob scene became a real trial

## ⚖️ This Man Is Worthy To Die

The priests and prophets now formally press their case before the princes.

"Worthy to die" is a specific legal phrase, a capital charge.

Their evidence is simply that Jeremiah predicted judgment against the city.

They treat the prediction itself as the crime, not something they need to disprove.

No one yet asks whether God actually sent that message.

⚖️ Worthy to die was a formal capital charge

🗣️ Their evidence was the prophecy itself

🚫 They never questioned if it was true

📖 The real question was still unasked

## 📜 The LORD Sent Me To Prophesy Against This House

Jeremiah's entire defense rests on one claim: God sent him.

He does not deny saying the words that angered everyone.

He does not soften them or apologize for them either.

Instead he stakes his life on the claim that the message came from God, not himself.

This is the same commission God gave him back in chapter one.

📜 Jeremiah's defense rests on one claim

🚫 He does not deny or soften his words

🗣️ He says God sent the message

📖 This echoes his calling from chapter one

# Jeremiah 26:13-15
# 🤲 I Am In Your Hand
---
## 🔄 Amend Your Ways And Your Doings

This exact offer appears earlier in Jeremiah's temple sermon in chapter seven.

"Amend" means to correct and make right, not just feel sorry.

"Ways" and "doings" cover both a person's direction in life and their actual actions.

Jeremiah is not backing down from his warning here.

He repeats the same open door God had already offered, even on trial for his life.

🔄 Amend means to correct and make right

🚶 Ways and doings cover life and actions

📖 This repeats his chapter seven sermon

➡️ The offer to turn back still stood

## 🤲 I Am In Your Hand

Jeremiah fully surrenders his fate to the men judging him.

He does not beg, threaten, or try to escape.

"As seemeth good and meet" means whatever they decide is right in their own eyes.

His calm submission is striking for a man facing an actual death sentence.

He trusts God's authority behind his words more than his own safety.

🤲 Jeremiah surrenders his fate completely

🚫 He does not beg or threaten

😌 His calm response is striking here

📖 He trusts God more than his own safety

## 🩸 Ye Shall Surely Bring Innocent Blood Upon Yourselves

"Innocent blood" is a serious legal and covenant term in the Old Testament.

Killing someone without real guilt brings guilt down on the killers themselves.

Jeremiah warns that executing a true prophet would count as exactly that.

The consequence would fall on the judges, the city, and everyone who allowed it.

This was not a threat from Jeremiah but a warning about God's own justice.

🩸 Innocent blood is a covenant term

⚖️ Killing the innocent brings guilt on the killer

🏛️ The whole city would share that guilt

📖 This warns of God's justice, not Jeremiah's

## 🗣️ Of A Truth The LORD Hath Sent Me Unto You

Jeremiah closes his defense exactly where he started it.

Everything hangs on whether this one claim is true.

If God really sent him, killing him is a grave sin.

If he made it up, the crowd's anger would make sense.

The whole trial comes down to a question only God could ultimately settle.

🗣️ Jeremiah repeats his core claim

⚖️ Everything depends on this one claim

🩸 A true prophet's death is a grave sin

📖 Only God could settle the real question

# Jeremiah 26:16-19
# 👴 Micah's Precedent
---
## ⚖️ This Man Is Not Worthy To Die

The princes and the people suddenly reverse their earlier mood completely.

Jeremiah's defense, or something else, has changed their minds.

"Not worthy to die" formally clears him of the capital charge.

The mob that nearly killed him now becomes his protection instead.

Public opinion had shifted from rage to a real, if shaky, acquittal.

⚖️ The verdict reverses the earlier mood

🗣️ Jeremiah's defense worked

🚫 He is formally cleared of the death charge

📖 The mob becomes his protection instead

## 👴 Certain Of The Elders Of The Land

"Elders" were respected older leaders, often the heads of families or clans.

They carried real authority alongside the priests, prophets, and princes.

Their voice at this moment tips the case firmly in Jeremiah's favor.

They do this by reaching back into Judah's own history for a precedent.

A precedent is simply an earlier case used to decide a new one.

👴 Elders were respected family leaders

⚖️ Their voice carried real authority

📜 They reach back into Judah's history

➡️ A precedent settles a new case

## 📜 Micah The Morasthite Prophesied In The Days Of Hezekiah

Micah was a real prophet whose own book still exists in the Bible today.

"The Morasthite" means he came from Moresheth, a small town in Judah.

He preached about a century before Jeremiah, during king Hezekiah's reign.

The elders quote his words almost exactly from Micah chapter three.

Citing an actual named prophet, not a vague rumor, gave their argument real weight.

📜 Micah wrote his own Bible book

🏘️ Morasthite means he came from Moresheth

🗓️ He preached under king Hezekiah

📖 The quote comes from Micah chapter three

## 🌾 Zion Shall Be Plowed Like A Field

Plowing a field means breaking up its ground to prepare it for planting.

Saying Zion would be plowed like a field means the city would be leveled completely.

Where buildings and walls once stood, only open, broken ground would remain.

Jerusalem, called Zion here, would look like farmland instead of a capital city.

This is one of the harshest predictions any prophet gave against Jerusalem.

🌾 Plowing means breaking ground for planting

🏙️ Zion is another name for Jerusalem

💥 The city would be leveled completely

📖 A capital city reduced to open farmland

## 🙇 Put Him At All To Death

This is the elders' real point, framed as a question with an obvious answer.

Hezekiah heard an equally harsh prophecy and did not kill the prophet who gave it.

Instead he feared the LORD and pleaded with Him for mercy.

Because of that response, God relented and held back the judgment.

The elders are showing Jehoiakim's court exactly what the right response looks like.

🙇 Hezekiah heard an equally harsh warning

🙏 He feared the LORD instead

🔄 God relented because of his response

📖 The elders show the right response here

## ⚠️ Procure Great Evil Against Our Souls

"Procure" means to bring something about, usually something you end up regretting.

The elders warn that killing Jeremiah would not just end one life.

It would bring real, lasting harm down on everyone who allowed it.

Hezekiah's story proved the opposite path was always available and safe.

The chapter's tension resolves here, at least for now, in Jeremiah's favor.

⚠️ Procure means bringing about real harm

🩸 Killing him would harm everyone involved

🙇 Hezekiah's story proved a safer path existed

➡️ The tension resolves in Jeremiah's favor

# Jeremiah 26:20-24
# 🛡️ Urijah And Ahikam
---
## 🗣️ Urijah The Son Of Shemaiah Of Kirjathjearim

Urijah is a minor prophet who appears only in this one passage of the Bible.

"Kirjathjearim" was his hometown, a town west of Jerusalem.

He preached the exact same warning Jeremiah did, word for word.

His story is placed here on purpose, right after Jeremiah's own trial.

It shows readers what could have happened to Jeremiah under different circumstances.

🗣️ Urijah appears only in this chapter

🏘️ Kirjathjearim was his hometown

📜 He preached the same message as Jeremiah

➡️ His story shows what almost happened

## 👑 The King Sought To Put Him To Death

This time the threat comes directly from the king, not a crowd or a mob.

Jehoiakim himself, backed by his mighty men and princes, wanted Urijah dead.

That is a very different kind of danger than what Jeremiah faced.

Jeremiah's case was judged by princes willing to hear a defense.

Urijah faced a king who had already decided the outcome himself.

👑 This threat came from the king himself

⚔️ Jehoiakim's mighty men backed him

⚖️ Jeremiah's princes were willing to listen

➡️ Urijah faced no such fair hearing

## 🏃 He Was Afraid, And Fled, And Went Into Egypt

Urijah's fear was reasonable given exactly who was hunting him.

Fleeing to Egypt made sense as an escape from Judah's own king.

Egypt sat outside Jehoiakim's direct authority, or so Urijah likely hoped.

His response contrasts sharply with Jeremiah's calm words back in verse fourteen.

Jeremiah accepted whatever judgment his accusers would give.

Urijah instead ran as far away as he possibly could.

🏃 Urijah's fear made sense here

🌍 Egypt seemed outside the king's reach

🤲 Jeremiah accepted judgment instead of running

➡️ Two prophets, two very different responses

## ⚔️ Slew Him With The Sword, And Cast His Dead Body

Jehoiakim sent men all the way to Egypt to bring Urijah back by force.

Once returned, the king had him executed with no trial described at all.

"Cast his dead body into the graves of the common people" denied him any special honor.

Even in death, Urijah was treated as ordinary and forgettable.

This is the fate Jeremiah could easily have shared just a few verses earlier.

⚔️ Urijah was executed without a trial

🪦 He was denied any special burial honor

😨 This shows how real the danger was

📖 Jeremiah narrowly avoided this same fate

## 🛡️ The Hand Of Ahikam The Son Of Shaphan Was With Jeremiah

"The hand of Ahikam was with him" is a Hebrew way of saying he actively protected Jeremiah.

Ahikam was the son of Shaphan.

Shaphan was the scribe who once read God's law aloud to king Josiah.

That earlier moment helped launch Josiah's whole reform movement.

Ahikam's family had a long history of standing with God's true prophets.

His protection here was not random at all.

🛡️ Hand with him means active protection

📜 Ahikam's father once read God's law to Josiah

👪 His family had a history of reform

➡️ His protection was not a coincidence

## 🙅 Give Him Into The Hand Of The People

This closing line explains exactly how Jeremiah survived this chapter.

It was not luck and it was not only his own defense.

A specific, named person used real influence to protect him.

The chapter began with a mob ready to kill Jeremiah on the spot.

It ends with him alive because God placed the right protector in his path.

🙅 This line explains how Jeremiah survived

👤 A named protector made the difference

👥 A mob was ready to kill him

📖 God placed the right protector in his path
`.trim();

export const JEREMIAH_TWENTY_SIX_PERSONAL_SECTIONS = parseJeremiahTwentySixRawNotes(JEREMIAH_TWENTY_SIX_RAW_NOTES);
