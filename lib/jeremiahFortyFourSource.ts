export type JeremiahFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyFourRawNotes(rawText: string): JeremiahFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+44:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 44 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+44:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+44:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 44 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 44,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 44:${startVerse}` : `Jeremiah 44:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 44 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_FOUR_RAW_NOTES = `# Jeremiah 44:1-6
# 📜 The Word Reaches The Refugees In Egypt
---
## 🏜️ All The Jews Which Dwell In The Land Of Egypt

This chapter follows the same people who fled to Egypt in chapters forty two and forty three.

Jeremiah had warned them not to go there at all.

They went anyway after Gedaliah was murdered back in Judah.

Now the word of the LORD finds them even in Egypt.

🏃 They fled to Egypt anyway

📣 God's word still reaches them there

🚫 Running did not mean escaping

➡️ No place removes anyone from God's reach

---
## 🗺️ At Migdol, And At Tahpanhes, And At Noph

These are four real places scattered across Egypt.

It shows the refugees did not stay together in one city.

They split across the whole country, from the border to the south.

Migdol was a fort near Egypt's northern border.

Tahpanhes was the city from the end of chapter forty three.

🗺️ Migdol guarded Egypt's northern border

🏃 Tahpanhes is where Jeremiah was taken

🏛️ Noph, or Memphis, was a major city

➡️ Pathros lay far south in Egypt

---
## 👁️ Ye Have Seen All The Evil That I Have Brought Upon Jerusalem

God starts by appealing to something they witnessed firsthand.

This is not a rumor or a story passed down.

They personally saw Jerusalem and the cities of Judah become empty.

Their own eyes already prove the point God is about to make.

👁️ They saw the destruction themselves

🏚️ Jerusalem and Judah's cities stand empty

🚫 This is not secondhand information

📖 Eyewitness proof backs up God's warning

---
## ❓ Whom They Knew Not, Neither They, Ye, Nor Your Fathers

Knew not means these gods had no history with Israel at all.

They were not part of any covenant or promise from the past.

No earlier generation had worshiped them either, going all the way back.

These idols were a brand new betrayal, not an old family habit.

❓ Knew not means no prior connection

🆕 These gods were completely new to Israel

📜 No ancestor ever worshiped them before

➡️ This betrayal was fresh, not inherited

---
## 🔥 To Burn Incense, And To Serve Other Gods

Burning incense was a normal part of worship in the ancient world.

The rising smoke pictured prayers and devotion going up toward a god.

Doing this for another god meant giving that devotion to someone besides the LORD.

It was not a small or harmless gesture.

🔥 Incense pictured prayer rising upward

🙏 It showed devotion to whichever god received it

🚫 Giving it to idols meant real betrayal

📖 Worship was never a neutral action

---
## 📯 Howbeit I Sent Unto You All My Servants The Prophets

Howbeit is an old word meaning however or nevertheless.

Even while the people kept sinning, God kept sending warnings anyway.

The prophets were His servants, sent again and again to plead with them.

God's patience showed up as a long line of messengers, not silence.

📯 Howbeit means however or nevertheless

📜 God sent prophet after prophet

🗣️ Each one pleaded with the people

➡️ Patience looked like persistent warning

---
## ⏰ Rising Early And Sending Them

This exact phrase shows up again and again throughout the book of Jeremiah.

It pictures someone getting up at dawn, determined not to waste a moment.

God is not shown as distant or slow to act here.

He is shown as urgent, repeatedly reaching out before judgment ever fell.

⏰ Rising early pictures urgent effort

🔁 This phrase repeats often in Jeremiah

🏃 God was never slow to warn

📖 Urgency came before judgment, not after

---
## 👂 Hearkened Not, Nor Inclined Their Ear

Hearkened is an old word for listened and obeyed.

Inclined their ear is a second way of saying the same thing.

Stacking both phrases together makes the refusal sound even more complete.

This was not confusion.

It was a flat refusal to listen.

👂 Hearkened means listened and obeyed

🙉 Inclined their ear repeats the same idea

🚫 This was flat refusal, not confusion

➡️ Doubling the phrase shows total rejection

---
## 🔥 My Fury And Mine Anger Was Poured Forth, And Was Kindled

This verse uses two different pictures for God's anger.

Poured forth pictures wrath like water, spreading out over everything.

Kindled pictures wrath like fire, catching and spreading on its own.

Together they describe judgment that could not be held back any longer.

💧 Poured forth pictures wrath like water

🔥 Kindled pictures wrath like fire

🏚️ Judgment reached the cities and streets

📖 Anger finally broke out completely

# Jeremiah 44:7-10
# 😡 Why Commit This Great Evil
---
## 💔 Commit Ye This Great Evil Against Your Souls

God frames this sin as harmful to their own souls, not just disobedience.

They are not only breaking a rule somewhere far away.

They are actively damaging their own relationship with God.

Sin here is described as self inflicted damage, not a distant offense.

💔 Sin here harms their own souls

🙅 This is not just rule breaking

⚠️ They are hurting themselves directly

📖 Sin is never a victimless choice

---
## 👶 Man And Woman, Child And Suckling

This phrase pairs opposite ages together on purpose.

Man and woman covers every adult in the community.

Child and suckling adds the very youngest, even nursing infants.

Together the phrase means absolutely everyone, with no age left out.

👨 Man and woman means every adult

👶 Suckling means a nursing infant

🔗 Pairing opposites means total coverage

➡️ No age group is left out

---
## 🙌 The Works Of Your Hands

This phrase is a common way the Bible describes idols.

Idols were objects people carved or shaped with their own hands.

Calling them works of your hands exposes the irony clearly.

A god that a person builds cannot actually rule over that person.

🙌 Works of your hands means idols

🔨 People carved and shaped them

🙃 A handmade god has no real power

📖 Worship was aimed at something they built

---
## 🌍 A Curse And A Reproach Among All The Nations Of The Earth

This describes becoming a warning example to everyone watching.

Other nations would one day use Judah's name as an insult.

May you end up like Judah would become its own kind of curse.

A whole people's reputation would carry the weight of this choice.

🌍 Nations would watch and remember

🗣️ Judah's name would become an insult

📉 Reputation would carry lasting shame

➡️ A whole people would bear this weight

---
## 🔁 Have Ye Forgotten The Wickedness Of Your Fathers

God names wickedness five separate times in a single verse.

Fathers, kings, the kings' wives, the present generation, and their wives are all included.

Stacking the word again and again makes the point impossible to miss.

No generation and no group gets to claim they were the exception.

🔁 Wickedness is repeated five times here

👪 Every generation shared the same guilt

👑 Kings and common people are both named

📖 No one group escapes the blame

---
## 😤 They Are Not Humbled Even Unto This Day

Jerusalem's destruction already happened by the time God says this.

Even after watching it happen, the people still have not changed.

Seeing judgment firsthand did not produce real repentance.

Hard consequences do not automatically soften a hard heart.

😤 Judgment already happened by this point

👀 They watched it with their own eyes

🚫 Watching did not lead to change

➡️ Consequences alone cannot soften a heart

---
## 📜 Walked In My Law, Nor In My Statutes

Law refers to God's broader teaching and covenant instruction.

Statutes refers to the specific rules God had set in place.

The people had ignored both the big picture and the fine details.

Total disregard, not a few missed instructions, is being described here.

📜 Law means God's overall teaching

📏 Statutes means the specific rules

🚫 Both were ignored completely

📖 This was total disregard, not a few mistakes

# Jeremiah 44:11-14
# 🔥 I Will Set My Face Against You
---
## 😠 I Will Set My Face Against You For Evil

Set my face against is a strong idiom for firm, direct opposition.

It usually describes a king or judge turning fully against someone.

God is not threatening from a distance here.

He is declaring direct, personal opposition to this remnant in Egypt.

😠 Set my face means firm opposition

👑 The phrase pictures a king's judgment

🎯 This opposition is direct, not distant

➡️ God now opposes them personally

---
## ⚰️ They Shall All Be Consumed, And Fall In The Land Of Egypt

The very place they ran to for safety becomes the place of their ruin.

Egypt was supposed to protect them from Babylon's sword.

Instead it becomes the location of the judgment they tried to escape.

Running toward safety is not the same as running toward God.

🏃 Egypt was chosen as a refuge

⚰️ Egypt instead becomes the place of ruin

🚫 Safety was never guaranteed by location

📖 True safety comes from obedience, not geography

---
## 😱 An Execration, And An Astonishment, And A Curse, And A Reproach

Four separate words are stacked together to describe their coming reputation.

Execration means being cursed by name as a formal example.

Astonishment means people reacting with shock at what happened to them.

Piling up four words this way shows how total the disgrace will be.

😱 Four words describe total disgrace

🗣️ Execration means a formal curse

😲 Astonishment means shocked onlookers

📖 Stacked words show complete ruin

---
## ⚔️ By The Sword, By The Famine, And By The Pestilence

This three part list appears again and again throughout Jeremiah's warnings.

Sword means death in war or by violence.

Famine means death by starvation when crops and supplies fail.

Pestilence means death by widespread disease.

Together the three cover almost every way a population can be wiped out.

⚔️ Sword means death by violence

🌾 Famine means death by starvation

🦠 Pestilence means death by disease

📖 Together they describe total destruction

---
## 🏃 None Shall Return But Such As Shall Escape

A remnant is a small surviving group left after a disaster.

Here God promises only a tiny few will ever see Judah again.

This is not the return the people in Egypt were hoping for.

Fleeing to Egypt for safety will end in a much smaller homecoming than expected.

🏃 A remnant is a small surviving group

🔙 Only a few will ever return

😞 This is not the ending they wanted

➡️ Their choice shrinks their own future

# Jeremiah 44:15-19
# 🗿 The People Refuse To Listen
---
## 👥 All The Men Which Knew That Their Wives Had Burned Incense

The whole community was aware of the idol worship, not just a few households.

Husbands knew exactly what their wives were doing and said nothing against it.

A great multitude means this was not a handful of people.

Nearly everyone living in Egypt had some part in this practice.

👥 Husbands knew and stayed silent

📣 A great multitude means nearly everyone

🤝 The whole community shared the guilt

➡️ Silence here was its own agreement

---
## 🙅 We Will Not Hearken Unto Thee

This repeats the exact word already explained back in verse five.

There it described the nation's past refusal to listen.

Here the same refusal is spoken out loud, directly to Jeremiah's face.

Open defiance has replaced quiet disobedience.

🙅 Hearken means listen and obey

🔁 This echoes the refusal from verse five

🗣️ Now the refusal is spoken aloud

📖 Quiet disobedience became open defiance

---
## 👑 To Burn Incense To The Queen Of Heaven

The queen of heaven was a popular goddess in the ancient Near East.

Many scholars believe she was linked to the Mesopotamian goddess Ishtar.

She was worshiped as a goddess of fertility, love, and the stars.

Judah had apparently kept worshiping her for generations, even inside Jerusalem.

👑 Queen of heaven was a popular goddess

🌟 Many scholars link her to Ishtar

🌾 She was tied to fertility and the stars

📖 This worship had gone on for generations

---
## 🍷 And To Pour Out Drink Offerings Unto Her

A drink offering was liquid, usually wine, poured out as a gift to a god.

It was a common ritual gesture across many ancient religions.

Pouring something out completely pictured giving that devotion fully, not partially.

This was real worship, not a casual habit.

🍷 Drink offerings were poured out liquid

🎁 It symbolized a full gift to a god

🌍 This ritual was common in the region

➡️ It represented complete devotion to her

---
## 🍞 We Had Plenty Of Victuals, And Were Well, And Saw No Evil

Victuals is an old word for food and provisions.

The people connect their old prosperity directly to worshiping this goddess.

That connection is false, but it feels true to them because of timing.

They mistake something happening before an event for something that caused it.

🍞 Victuals means food and provisions

🤔 They blame prosperity on the goddess

❌ Timing is not the same as cause

📖 A false connection can feel convincing

---
## 📉 Since We Left Off To Burn Incense, We Have Wanted All Things

The people blame the famine on quitting idol worship.

In reality the famine and exile came from the sin Jeremiah had already named.

They have the whole story backward.

Stopping sin gets blamed for consequences that sin itself actually caused.

📉 They blame hardship on stopping idols

🔄 The real cause was their sin

🙃 Their whole explanation is backward

➡️ Blame was aimed in the wrong direction

---
## 🍪 Did We Make Her Cakes To Worship Her, Without Our Men

These cakes were special ritual bread shaped to honor the goddess.

The women ask whether their husbands knew and approved of this practice.

The question reveals that this worship happened with full family involvement.

No one in the household could claim they did not know.

🍪 Cakes were ritual bread for the goddess

👨‍👩‍👧 Husbands were aware of the practice

🏠 This involved the whole household

📖 No family member could claim ignorance

# Jeremiah 44:20-23
# 👁️ Jeremiah's Reply To Their Defiance
---
## 👁️ Did Not The LORD Remember Them, And Came It Not Into His Mind

Jeremiah answers their claim about prosperity with a pointed question.

Of course God remembered their idol worship, the question expects that answer.

Nothing about their history of incense burning had gone unnoticed.

Their own defense actually confirms the very charge against them.

👁️ God remembered all of it clearly

❓ The question expects an obvious answer

🚫 Nothing had gone unnoticed by God

📖 Their defense proves the charge true

---
## ⚖️ So That The LORD Could No Longer Bear

Could no longer bear pictures patience as a weight being carried.

God had tolerated this sin for a long time already.

Eventually even patience reaches a breaking point.

Judgment here is described as the result of held back patience, not sudden rage.

⚖️ Bear pictures patience as a weight

⏳ God tolerated this for a long time

💔 Even patience has a limit

➡️ Judgment followed long delayed patience

---
## 🏚️ Your Land Is A Desolation, Without An Inhabitant

This restates the empty cities from the start of the chapter.

Jeremiah brings the argument full circle back to what they already saw.

The evidence they witnessed in verse two is the same evidence used here.

Their own eyes remain the strongest witness in this whole case.

🏚️ Desolation means completely empty

🔁 This returns to the chapter's opening evidence

👁️ Their own eyes already confirmed it

📖 Eyewitness proof closes Jeremiah's argument

# Jeremiah 44:24-28
# 🤐 An Oath Against Using God's Name
---
## 👩 And To All The Women, Hear The Word Of The LORD

Jeremiah now speaks directly and specifically to the women in the crowd.

Verses fifteen and nineteen already showed women leading this worship.

Singling them out here is not random, it matches their active role.

God's warning reaches everyone involved, not only the men.

👩 Women are addressed directly here

🔁 This matches their role from verse fifteen

🎯 The warning is specific, not vague

➡️ Everyone involved receives the same warning

---
## 😏 Ye Will Surely Accomplish Your Vows

This line sounds like permission, but it is not approval.

God is letting their stubbornness run its own course.

Sometimes judgment looks like simply stepping back and letting a choice stand.

Their own determination becomes the very thing that seals their fate.

😏 This sounds like permission but is not

🚶 God lets their choice run its course

⚠️ Stepping back can still be judgment

📖 Their stubbornness seals their own fate

---
## 🤐 My Name Shall No More Be Named In The Mouth Of Any Man Of Judah

People in this culture commonly swore oaths using God's name, saying things like as the LORD liveth.

That phrase was an everyday part of speech for the Jewish community.

God says that privilege will be taken away completely from this group.

Losing the right to even speak His name was a severe, specific judgment.

🤐 They once swore oaths using God's name

🚫 That right is now taken away

😔 Even common speech reflected a broken relationship

📖 Losing His name was a real loss

---
## 👁️ I Will Watch Over Them For Evil, And Not For Good

Scripture often describes God watching over His people for protection and good.

This verse flips that familiar picture completely around.

The same watching that once meant care now means certain harm.

A promise of protection has become a promise of ruin instead.

👁️ Watching normally means protection

🔄 This verse reverses that picture

⚠️ The same attention now brings harm

📖 Protection turned into certain ruin

---
## 🔙 A Small Number That Escape The Sword Shall Return

This repeats the remnant promise already given earlier in the chapter.

Only a tiny group will ever make it back to Judah.

The next line turns this into a kind of test.

Whose words will actually come true, Jeremiah's or the people's own claims.

🔙 Only a small group returns home

🔁 This repeats the earlier remnant promise

⚖️ The outcome becomes a kind of test

📖 Whose words stand will finally be proven

# Jeremiah 44:29-30
# ⚔️ A Sign In Pharaoh Hophra's Fall
---
## 🖊️ This Shall Be A Sign Unto You

A sign here means a specific, nearby event that proves a bigger promise true.

Jeremiah often used this kind of confirming event throughout his ministry.

If the smaller sign comes true, the larger warning can be trusted too.

God gives evidence, not just a demand to simply believe.

🖊️ A sign confirms a larger promise

🔁 Jeremiah used this pattern before

✅ A fulfilled sign builds real trust

📖 God backs His words with evidence

---
## 👑 I Will Give Pharaohhophra King Of Egypt Into The Hand Of His Enemies

Pharaoh Hophra was a real Egyptian king, also known in history as Apries.

He ruled Egypt during the very years this chapter takes place.

History records that Hophra was later overthrown by his own military commander.

God names a specific, provable outcome rather than a vague future threat.

👑 Hophra was a real Egyptian king

📚 History also calls him Apries

⚔️ He was later overthrown by his own general

📖 God's warning named a specific real event

---
## 🔗 As I Gave Zedekiah King Of Judah Into The Hand Of Nebuchadrezzar

This closing line points back to something that already happened.

Zedekiah's capture by Babylon was already fulfilled earlier in the book.

Using a proven past prophecy backs up this brand new one about Egypt.

What God already did becomes the proof for what He says He will still do.

🔗 This recalls Zedekiah's already fulfilled capture

✅ A past fulfillment backs a future promise

🤝 Egypt's king now faces the same pattern

📖 God's track record supports His new word
`.trim();

export const JEREMIAH_FORTY_FOUR_PERSONAL_SECTIONS = parseJeremiahFortyFourRawNotes(JEREMIAH_FORTY_FOUR_RAW_NOTES);
