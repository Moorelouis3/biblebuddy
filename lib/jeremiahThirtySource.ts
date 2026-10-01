export type JeremiahThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyRawNotes(rawText: string): JeremiahThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 30:${startVerse}` : `Jeremiah 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 30 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_RAW_NOTES = `# Jeremiah 30:1-3
# ✍️ Write It In A Book
---
## ✍️ Write Thee All The Words

God tells Jeremiah to do something unusual here.

Most of Jeremiah's prophecies were spoken out loud first.

This one gets a direct order to be written down in a book.

A written record could outlast Jeremiah himself.

The exiles reading this later would need proof the promise was real.

✍️ Write thee means record it permanently

🗣️ Most prophecies were spoken first

📖 Writing it preserved the promise

➡️ Future readers could check it against history

## 🔄 Bring Again The Captivity Of My People Israel And Judah

"Bring again the captivity" is an old way of saying reverse the exile.

It does not mean sending them back into captivity.

It means ending the captivity completely.

Israel was the northern kingdom, already destroyed by Assyria over a century earlier.

Judah was the southern kingdom, facing destruction by Babylon in Jeremiah's own lifetime.

This promise reaches past Judah alone and includes the long lost northern tribes too.

🔄 Bring again the captivity means ending exile

🏚️ Israel means the fallen northern kingdom

🏛️ Judah means the kingdom Jeremiah lived in

📖 Both nations are promised restoration together

## 👴 Return To The Land That I Gave To Their Fathers

"Their fathers" points back to Abraham, Isaac, and Jacob.

God had promised this exact land to each of them personally.

That promise was made centuries before Jeremiah was even born.

Exile could delay the promise.

It could never cancel it.

👴 Their fathers means Abraham Isaac and Jacob

📜 God promised them this land long ago

⏳ Exile only delayed the promise

📖 The promise outlasts every setback

# Jeremiah 30:4-7
# 😱 The Time Of Jacob's Trouble
---
## 😱 A Voice Of Trembling, Of Fear, And Not Of Peace

This "voice" is a sound, not a calm discussion.

Trembling and fear describe pure panic.

Even a normal argument still carries some kind of peace underneath it.

This voice has none.

It sounds like people caught in a disaster, not a disagreement.

😱 Trembling means pure panic

🔇 No peace underneath this sound

⚠️ This is a disaster, not an argument

📖 The coming trouble sounds like crisis

## 🤰 A Man Doth Travail With Child

"Travail" means the pain of childbirth.

In this culture, only women experienced travail.

Jeremiah pictures grown men bent over in that same pain.

That image is meant to look wrong and alarming.

It shows fear so great it breaks the normal order of things.

🤰 Travail means the pain of childbirth

🙎 Men normally never feel this pain

⚠️ The image shows overwhelming fear

📖 Something has broken the normal order

## 👤 The Time Of Jacob's Trouble

Jacob is another name for the nation of Israel.

It comes from their ancestor, the patriarch Jacob.

"Trouble" here does not mean an ordinary hard season.

It points to one specific, severe time of distress still to come.

This phrase later became a common way to describe a hard season right before full restoration.

👤 Jacob here means the nation of Israel

⏳ Trouble means one specific hard time

🌩️ Not ordinary hardship, something severe

📖 Restoration follows this named trouble

## 🚪 He Shall Be Saved Out Of It

This verse does not promise Jacob will avoid the trouble.

It promises he will come out the other side of it.

The trouble is real and still has to happen.

The ending is not left in doubt.

God names the rescue before the danger even arrives.

🌊 Trouble is not avoided here

🚪 Jacob comes out the other side

✅ The ending is settled in advance

📖 God names rescue before danger arrives

# Jeremiah 30:8-9
# ⛓️ Breaking The Yoke
---
## 🪵 I Will Break His Yoke From Off Thy Neck

A "yoke" is a heavy wooden frame used to force an animal to pull a plow.

Prophets often used it as a picture of being ruled by force.

Judah currently wears Babylon's yoke, forced into tribute and control.

God promises to physically snap that frame off their neck.

The image is sudden and complete, not a slow loosening.

🪵 A yoke forces an animal to pull

⛓️ It pictures being ruled by force

💥 God promises to break it suddenly

📖 Freedom comes complete, not gradual

## 🌍 Strangers Shall No More Serve Themselves Of Him

"Strangers" here means foreign nations, not random travelers.

"Serve themselves of him" means using Jacob's labor for someone else's benefit.

Babylon had been doing exactly that through tribute and forced service.

This promise ends foreign nations profiting off Israel's work.

🌍 Strangers means foreign ruling nations

🧺 Serve themselves means use for their own gain

🚫 Foreign profit from Israel's labor ends

📖 This marks true political freedom

## 👑 David Their King, Whom I Will Raise Up

King David had already been dead for centuries when Jeremiah wrote this.

This cannot mean David's own body returning to rule.

"David their king" points instead to a future ruler from David's own family line.

God had already promised David's throne would never permanently end.

This verse looks forward to that promise being kept.

👑 David here means a ruler from his line

⚰️ The real David was long dead

📜 God promised David's throne would not end

📖 This looks forward to that promise

# Jeremiah 30:10-11
# 🛡️ Fear Not, Jacob
---
## 🛡️ Fear Thou Not, O My Servant Jacob

"Servant" here is a title of honor, not just a job description.

Moses and David were both called God's servant too.

It marks Jacob as someone specially chosen, not a random laborer.

Fear would make complete sense given everything Jacob has faced.

The command to not fear rests entirely on who is speaking it.

👑 Servant is a title of honor here

🧑‍🌾 Moses and David shared this same title

😨 Fear would otherwise make sense

📖 The command rests on who speaks it

## 🗺️ I Will Save Thee From Afar

"Afar" means far away lands, not just the nearest border.

The exiles were not scattered to one single place.

Some ended up in Babylon, others in Egypt and beyond.

This promise reaches every one of those locations, no matter the distance.

🗺️ Afar means lands far away

🌍 Exiles were scattered to many places

📍 Distance does not limit this promise

📖 God's reach covers every location

## ⚖️ A Full End Of All Nations... Yet Will I Not Make A Full End Of Thee

This is the center of the whole chapter's promise.

God says the nations who conquered Israel will be fully destroyed.

Israel will face real discipline, but not total destruction.

The difference is not about who deserves punishment less.

It is about a bond God refuses to fully end.

⚖️ Nations face complete destruction

🛡️ Israel faces discipline, not destruction

❤️ The difference is the bond, not merit

📖 God refuses to fully end this bond

## 🧮 I Will Correct Thee In Measure

"Correct" here means discipline, the way a parent corrects a child.

It is not the same as an enemy's punishment.

"In measure" means controlled and proportionate, not unlimited.

God is not pretending Jacob did nothing wrong.

He is promising the response will never go further than it should.

👨‍👧 Correct means a parent's discipline

🧮 In measure means a proportionate response

🚫 Not the same as an enemy's punishment

📖 Discipline here has a limit

# Jeremiah 30:12-15
# 🩹 The Incurable Wound
---
## 🩹 Thy Bruise Is Incurable

This verse uses sickness as a picture of the nation's condition.

"Incurable" does not mean doctors tried and failed.

It means no normal medicine could ever fix damage this deep.

Judah's problem was never just political or military.

It was a moral collapse that no treaty or army could cure.

🩹 Bruise pictures the nation's condition

💊 Incurable means normal remedies cannot work

⚔️ The real problem was not military

📖 Moral collapse needed more than medicine

## ⚖️ None To Plead Thy Cause

"Plead thy cause" is legal language for having someone argue on your behalf.

Judah had trusted other nations to defend her in a crisis.

None of those alliances show up now that trouble has actually come.

She stands alone in the one moment she needed support most.

⚖️ Plead thy cause means an advocate

🤝 Judah once trusted foreign allies

🚫 None of them show up now

📖 Trusted alliances failed when it mattered

## 💔 All Thy Lovers Have Forgotten Thee

"Lovers" is Jeremiah's regular word for the nations and gods Judah chased instead of the true God.

The relationship gets pictured like an unfaithful marriage throughout this book.

Those other nations and idols offered nothing lasting in return for that loyalty.

They vanish completely the moment Judah actually needs them.

💔 Lovers means false allies and idols

💍 Jeremiah pictures this like unfaithfulness

🫥 Those allies offered nothing lasting

📖 False loyalty leaves nothing behind

## 📚 For The Multitude Of Thine Iniquity

"Multitude" means a large pile built up over time, not one single mistake.

"Iniquity" means sin, specifically guilt that deserves real consequence.

This verse states plainly that this suffering is not random bad luck.

It is a direct response to sin that kept adding up for years.

📚 Multitude means sin piled up over time

⚖️ Iniquity means guilt that deserves consequence

🎲 This is not random bad luck

📖 Consequence followed years of buildup

# Jeremiah 30:16-17
# 🔄 The Devourers Devoured
---
## 🔄 They That Devour Thee Shall Be Devoured

"Devour" means to consume completely, like an animal eating its prey.

Babylon had been devouring Judah through conquest and exile.

This verse promises the exact same fate will come back on them.

The language repeats on purpose, devourer devoured, spoiler spoiled, hunter hunted.

That repeated pattern makes the reversal impossible to miss.

🦁 Devour means consume completely

🔁 Babylon's own actions return to them

🎯 Spoiler and hunter face the same fate

📖 The reversal pattern is deliberate

## 🩹 I Will Restore Health Unto Thee

Verse twelve already called this wound incurable by any normal medicine.

This verse answers that exact statement directly.

What people cannot heal, God can still heal.

The same sickness picture now gets a cure nobody expected.

🩹 This answers the incurable wound from before

💊 No human medicine could fix it

✝️ God heals what people cannot

📖 Hopeless cases are not hopeless to God

## 🏙️ This Is Zion, Whom No Man Seeketh After

Zion is another name for Jerusalem.

Enemies had started calling her an outcast, a mocking nickname.

"No man seeketh after" means nobody bothers to visit or care about her anymore.

That insult pictures a city everyone had written off as finished.

God directly answers an insult with a promise.

🏙️ Zion is another name for Jerusalem

🏷️ Outcast was a mocking enemy nickname

🙅 No man seeketh means nobody cared anymore

📖 God answers the insult with a promise

# Jeremiah 30:18-20
# 🏙️ Rebuilding On The Old Ruins
---
## ⛺ Jacob's Tents

Tents picture a simpler, wandering way of life.

Jacob and his family lived this way long before Jerusalem ever existed.

Using that word here reaches all the way back to the earliest promises.

The vision moves from humble beginnings toward a city with walls.

⛺ Tents picture a simple nomadic life

👴 Jacob's own family lived this way

📜 The image reaches back to earliest promises

📖 Restoration spans the whole story

## 🏚️ The City Shall Be Builded Upon Her Own Heap

A "heap" here means a mound of rubble left after destruction.

Jerusalem would be left in ruins when Babylon finished with it.

This promise is specific, the city gets rebuilt on that exact same spot.

It is not replaced somewhere else or abandoned for a new location.

🏚️ Heap means a mound of rubble

💥 Jerusalem would be left in ruins

📍 Rebuilding happens on the same spot

📖 The same place gets a new future

## 🏛️ The Palace Shall Remain After The Manner Thereof

"After the manner thereof" means built the way it was always meant to be.

This is not a smaller, cheaper replacement building.

The royal palace returns to its proper pattern and purpose.

Restoration here means getting it right, not just getting it back.

🏛️ After the manner means built properly

🚫 Not a cheap or smaller replacement

👑 The palace returns to its true purpose

📖 Restoration means doing it right

## 👶 Their Children Also Shall Be As Aforetime

"Aforetime" is an old word meaning the way things used to be.

Exile had broken up families and scattered children from their homes.

This promise restores ordinary life, not just buildings and borders.

Normal families and a normal community come back too.

👶 Aforetime means the way things used to be

💔 Exile had broken families apart

🏡 Ordinary family life returns here

📖 Restoration reaches past buildings into homes

# Jeremiah 30:21-24
# 🌪️ The Whirlwind And The Covenant
---
## 👑 Their Governor Shall Proceed From The Midst Of Them

During exile, Judah had no king and faced constant foreign rule.

Even back in the land, conquerors often placed outsiders in charge.

"From the midst of them" means this future leader comes from their own people.

No foreign ruler gets handed authority over them this time.

👑 Governor here comes from their own people

🚫 Not a foreign ruler imposed on them

⛓️ Exile had meant constant outside control

📖 Leadership returns to their own line

## 🚪 Who Is This That Engaged His Heart To Approach Unto Me

Approaching God directly was treated as dangerous in Israel's worship.

Only the high priest could enter the innermost room, and only once a year.

This verse pictures someone bold enough to draw near to God personally.

That kind of close access was never the normal arrangement.

🚪 Approaching God directly was normally restricted

🙏 Only the high priest entered that inner room

💪 This pictures unusual boldness and access

📖 Closeness with God becomes the new normal

## 📜 Ye Shall Be My People, And I Will Be Your God

This short line is called the covenant formula.

It appears again and again across the Old Testament.

It summarizes the entire relationship God built with Israel in one sentence.

Every promise in this chapter leads back to this one simple bond.

📜 This line is called the covenant formula

🔁 It repeats across the Old Testament

❤️ It summarizes the whole relationship

📖 Every promise points back to this bond

## 🌪️ The Whirlwind Of The LORD Goeth Forth With Fury

A whirlwind is a violent, spinning storm that strikes without warning.

Prophets often used it as a picture of sudden, forceful judgment.

"Continuing" means this storm will not simply pass through quickly.

It keeps moving until it finishes exactly what it was sent to do.

🌪️ Whirlwind means a violent sudden storm

⚡ Prophets used storms as judgment pictures

⏳ Continuing means it does not pass quickly

📖 Judgment finishes what it was sent to do

## 📅 In The Latter Days Ye Shall Consider It

"Latter days" means a future point in time, looking back on this moment.

"Consider" means to finally understand something clearly.

Readers in Jeremiah's own time may not have grasped the full weight of this chapter yet.

A later generation would look back and see exactly how it all fit together.

📅 Latter days means a future looking back

💡 Consider means finally understanding clearly

⏳ The full meaning takes time to land

📖 Hindsight reveals what was promised here
`.trim();

export const JEREMIAH_THIRTY_PERSONAL_SECTIONS = parseJeremiahThirtyRawNotes(JEREMIAH_THIRTY_RAW_NOTES);
