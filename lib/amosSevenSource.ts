export type AmosSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosSevenRawNotes(rawText: string): AmosSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 7:${startVerse}` : `Amos 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Amos 7 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_SEVEN_RAW_NOTES = `# Amos 7:1-3
# 🦗 The Vision Of The Grasshoppers
---
## 👁️ Thus Hath The Lord GOD Shewed Unto Me

Lord GOD combines two Hebrew names for God in one title.

Small capital letters on GOD mark God's own personal name, the LORD.

This same phrase opens three straight visions in this chapter.

Amos is reporting something God actually showed him, not a dream he invented.

📛 Lord GOD combines two divine names
🔠 Small capitals mark God's personal name
🔁 This phrase opens three visions
📖 Amos reports a real revelation here

## 🦗 He Formed Grasshoppers

"Grasshoppers" here means a locust swarm, not scattered insects.

A swarm like this could strip a whole field bare within hours.

This is the first of five visions God shows Amos.

God forms the locusts himself before they even arrive.

Judgment begins in heaven before it ever reaches the ground.

🦗 Grasshoppers means a locust swarm
🌾 Locusts could strip whole fields fast
👁️ This opens five straight visions
📖 God forms judgment before it lands

## 🌾 When They Had Made An End Of Eating The Grass Of The Land

Made an end means they finished completely.

Grass here covers all the green growth across the fields, not lawn grass.

The locusts did more than damage the harvest.

They consumed everything green until nothing was left.

🏁 Made an end means fully finished
🌿 Grass meant all the green growth
🦗 Locusts left nothing green behind
📖 The destruction here was total

## 🌱 The Latter Growth After The King's Mowings

The king's mowings were the first cut of the season.

That cut was taken for the king's own use.

The latter growth was the second growth of the season.

Ordinary families depended on that second growth to live.

Locusts struck exactly that second harvest.

The king had already taken his share.

👑 King's mowings meant the first cut
🌱 Latter growth fed ordinary families
🦗 Locusts struck that second harvest
📖 The poor lost their only share

## 😢 By Whom Shall Jacob Arise? For He Is Small

Jacob here names the whole nation, not only the patriarch.

Small means weak, not minor or unimportant.

Amos is saying Israel cannot survive a disaster this size.

This is the stern prophet pleading instead of accusing.

🧑‍🤝‍🧑 Jacob here names the whole nation
🤏 Small means weak, not minor
🙏 Amos pleads instead of accusing
📖 Even Amos doubts Israel can survive

## 🙏 O Lord GOD, Forgive, I Beseech Thee

Beseech means to beg, not simply ask.

Amos has spent six chapters announcing judgment without flinching.

Here he begs God to stop it instead.

The same prophet who condemned Israel now pleads for Israel's life.

🙏 Beseech means begging, not asking
📢 Amos had only pronounced judgment before
❤️ Now he pleads for Israel instead
📖 The judge becomes the intercessor

## 🕊️ The LORD Repented For This

This does not mean God sinned or changed his character.

Repented here means God relented.

God chose not to carry out this one judgment.

God's overall plan for Israel does not change here.

What changes is this single disaster.

It changed because Amos pleaded for it.

🕊️ Repented means relented, not regretted
🙅 God did not sin or change
⏸️ Only this one judgment was paused
📖 Amos's plea actually moved God

# Amos 7:4-6
# 🔥 The Vision Of The Fire
---
## 🔥 Called To Contend By Fire

Contend means to argue a legal case, like in a courtroom.

God is not simply angry here.

He is bringing a formal charge against Israel.

Fire is the weapon he chooses to make his case.

Judgment here looks like a verdict, not only a disaster.

⚖️ Contend means a formal legal case
🔥 Fire carries out the verdict
👨‍⚖️ God is prosecuting, not just punishing
📖 Judgment here looks like a courtroom

## 🌊 It Devoured The Great Deep

The great deep names the vast waters ancient readers believed lay beneath the land.

Springs and wells were pictured as fed from that deep source.

Fire consuming the deep meant even that basic water supply was at risk.

A drought this severe could leave the land with nothing left to drink.

🌊 Great deep meant waters beneath the land
💧 Springs and wells drew from it
🔥 Fire threatened even that deep source
📖 This drought threatened survival itself

## 🔥 Did Eat Up A Part

This fire did not need to finish its work.

Eating only a part of the land was already a disaster.

Amos interrupts before the fire finishes completely.

The vision shows how close total destruction already stood.

🔥 Eating only a part was still disaster
⏳ The fire had not even finished
🙏 Amos stops it mid judgment
📖 Israel stood closer to ruin than it knew

## ✋ O Lord GOD, Cease, I Beseech Thee

Cease means stop, not pardon.

In the first vision Amos asked God to forgive.

Here the fire is already burning.

So Amos asks God to stop it instead.

The two pleas fit two different moments in the story.

✋ Cease means stop, not pardon
🔥 This fire is already burning
🙏 Amos pleads mid disaster this time
📖 Different danger called for a different plea

## 🔁 This Also Shall Not Be

Also ties this answer directly back to the first vision.

God relents from this second disaster.

He relented from the first disaster the same way.

Two separate judgments now have two separate reprieves.

Israel is being spared twice in a row, not once.

🔁 Also links this to the first vision
🕊️ God relents a second time
🔢 Two judgments, two reprieves
📖 Israel is spared twice, not once

# Amos 7:7-9
# 📏 The Vision Of The Plumbline
---
## 📏 A Wall Made By A Plumbline

A plumbline is a string with a weight tied to one end.

Builders used it to check whether a wall stood perfectly straight.

This wall had already been built true, measured against that plumbline.

The LORD is pictured standing on a structure built exactly right.

📏 Plumbline means a weighted string tool
🧱 It checked if a wall was straight
✅ This wall had been built true
📖 God stands on something built correctly

## 👁️ The LORD Stood Upon A Wall

In the first two visions, Amos could still beg God to stop.

Here God is only measuring.

He has not struck yet.

There is nothing left to plead against in a plain measurement.

This vision changes the mood of the whole chapter.

✋ Earlier visions still allowed pleading
📏 This vision only measures first
🤐 There is nothing yet to beg against
📖 The chapter's mood shifts here

## 🗣️ Amos, What Seest Thou?

This is the first time in the book God calls Amos by name.

The earlier visions were shown to Amos in silence.

Now God speaks to him directly and waits for an answer.

The vision has turned into a conversation.

🗣️ First time God names Amos directly
🤐 Earlier visions came without words
💬 Now God waits for an answer
📖 Vision becomes conversation here

## 📏 I Will Set A Plumbline In The Midst Of My People Israel

This plumbline is not measuring a building anymore.

It measures whether Israel's own life matches God's standard.

A real plumbline cannot be argued with.

It simply shows crooked or straight.

Israel is about to be measured the same exact way.

📏 The plumbline now measures Israel itself
⚖️ It checks against God's own standard
🚫 A plumbline cannot be argued with
📖 Israel will be shown crooked or straight

## 🚫 I Will Not Again Pass By Them Any More

Pass by here means overlook or let go, not walk past.

In the first two visions, God passed by Israel's sin.

He relented both times.

This line closes that door completely.

The pleading that worked twice before will not work again.

🚫 Pass by meant overlook, not walk by
🕊️ God had passed by sin twice already
🔒 That door is now closed
📖 Pleading will not work a third time

## 🏔️ The High Places Of Isaac Shall Be Desolate

Isaac here stands for the whole nation of Israel.

That matches how Jacob named the nation earlier in this chapter.

High places were hilltop worship sites.

They often mixed true worship with pagan practice.

Desolate means left empty and abandoned.

The very places Israel trusted for worship are about to sit empty.

👴 Isaac here names the whole nation
🔁 Jacob did the same earlier
⛰️ High places were hilltop worship sites
📖 Israel's worship sites will sit empty

## 🏛️ The Sanctuaries Of Israel Shall Be Laid Waste

Sanctuaries here means official worship centers, like the one at Bethel.

High places were scattered hilltop shrines.

Sanctuaries were the larger, state supported centers of worship.

Laid waste means both kinds of worship sites fall together.

🏛️ Sanctuaries meant official worship centers
⛰️ High places were smaller hilltop shrines
💥 Laid waste means both are destroyed
📖 No worship site is spared

## ⚔️ I Will Rise Against The House Of Jeroboam With The Sword

House of Jeroboam means the entire royal family, not only the king himself.

Jeroboam the second was Israel's ruling king at this time.

This is the first vision aimed directly at the throne.

The next scene shows exactly how the palace reacts to this.

👑 House of Jeroboam means the royal family
🤴 Jeroboam the second ruled at this time
🎯 This vision targets the throne directly
📖 The palace reacts to this next

# Amos 7:10-13
# ⚔️ Amaziah Reports Amos To The King
---
## ⛪ Amaziah The Priest Of Bethel

Amaziah was the chief priest at Bethel, the king's own royal shrine.

His position depended directly on the king's favor.

Amos held no official position, no priesthood, and no court connection.

The confrontation that follows is the insider against the outsider.

⛪ Amaziah led the king's royal shrine
👑 His position depended on royal favor
🚶 Amos held no official position at all
📖 This is the insider against the outsider

## 📜 Amos Hath Conspired Against Thee

Conspired means plotting treason against the king.

Amaziah does not dispute whether Amos's words are true.

He reframes a prophetic warning as a political crime instead.

Relabeling a message this way can silence it without ever answering it.

📜 Conspired meant plotting treason
🙅 Amaziah never argues the message is false
🎯 He reframes it as a political crime
📖 Relabeling silences a message without answering it

## 🌍 The Land Is Not Able To Bear All His Words

Bear here means endure, not carry physical weight.

Amaziah claims the whole nation cannot tolerate Amos's preaching any longer.

This is almost certainly an exaggeration meant to make the threat sound bigger.

Fear of unrest, not the truth of the message, drives this complaint.

🌍 Bear means endure, not carry weight
📢 Amaziah claims the nation cannot take it
📈 This likely exaggerates the real threat
📖 Fear of unrest drives the complaint

## ⚔️ Jeroboam Shall Die By The Sword

Amos actually said the house of Jeroboam, meaning the whole dynasty.

Amaziah reports it as Jeroboam himself, the king in person.

That small change makes the warning sound like a direct death threat.

A slight misquote can turn a warning into something far more dangerous to repeat.

👑 Amos said house of Jeroboam, the dynasty
🤴 Amaziah narrows it to the king himself
🔄 That change sounds like a death threat
📖 A small misquote can change everything

## 👁️ O Thou Seer

Seer was simply another title for a prophet.

Amaziah uses it here to sound dismissive.

He treats it like naming a job, not a calling.

The title is accurate, but the tone behind it is not respectful.

👁️ Seer was simply another word for prophet
💼 Amaziah uses it to sound dismissive
💰 He treats it like a paid trade
📖 An accurate title said with contempt

## 🏃 Flee Thee Away Into The Land Of Judah

Judah was the southern kingdom, separate from Amos's current audience in the north.

Amos actually came from Tekoa, a town in Judah.

Amaziah tells him to go prophesy among his own people instead.

He treats a message from God as something that belongs to one region only.

🗺️ Judah was the southern kingdom
🏡 Amos actually came from Tekoa in Judah
🚶 Amaziah tells him to go back there
📖 He treats God's word as regional only

## 🍞 There Eat Bread, And Prophesy There

Eat bread here means earn your living.

Many prophets in this period were paid by a king or a shrine.

Amaziah assumes Amos works the same way, prophesying for money.

In the next verses, Amos answers this assumption directly.

🍞 Eat bread meant earn a living
💰 Paid prophets were common at the time
🙅 Amaziah assumes Amos is one of them
📖 Amos is about to correct him

## 🏛️ It Is The King's Chapel, And It Is The King's Court

Bethel served as both a royal chapel and a royal court in one place.

The king controlled what got preached there.

Amaziah is defending his own turf, not only the king's honor.

Religion and politics had become the same institution at Bethel.

🏛️ Bethel served as chapel and court both
👑 The king controlled what was preached there
🛡️ Amaziah defends his own turf too
📖 Religion and politics merged at Bethel

# Amos 7:14-17
# 🌿 Amos Answers Amaziah
---
## 🚫 I Was No Prophet, Neither Was I A Prophet's Son

Prophet's son here does not mean a literal father and son.

It names a member of an organized school or guild of prophets.

Amos says he never trained in that guild or joined that class.

He is answering Amaziah's assumption that prophesying was just his trade.

👨‍👦 Prophet's son named a trained guild member
🏫 These guilds trained prophets as a class
🙅 Amos denies belonging to that class
📖 He answers Amaziah's assumption directly

## 🐑 I Was An Herdman, And A Gatherer Of Sycomore Fruit

Herdman means someone who kept and raised livestock.

Sycomore fruit was a common, inexpensive fruit, something poor families actually ate.

Both jobs were ordinary manual labor, not religious work.

Amos is describing an ordinary working life, not a priestly one.

🐑 Herdman meant someone raising livestock
🌳 Sycomore fruit was cheap, common food
💪 Both were ordinary manual labor
📖 Amos lived an ordinary working life

## 🐑 The LORD Took Me As I Followed The Flock

Took here means God pulled him directly out of his daily work.

Amos was not studying to become a prophet when this happened.

No school, no priest, and no king gave him this calling.

God's call came straight to an ordinary shepherd in the field.

🐑 Amos was simply working when called
📚 No school trained him for this
👑 No king or priest authorized him
📖 God called him directly in the field

## 🤐 Drop Not Thy Word Against The House Of Isaac

Drop thy word here is an idiom meaning stop preaching.

It pictures words falling like drops, one at a time.

House of Isaac again names the whole nation, the same as earlier in this chapter.

Amos repeats Amaziah's own demand before answering it.

🤐 Drop thy word meant stop preaching
💧 It pictures words falling like drops
👴 House of Isaac again means the nation
📖 Amos repeats the demand before answering it

## 💔 Thy Wife Shall Be An Harlot In The City

This judgment is aimed at Amaziah personally, not the whole nation.

In a conquered city, this often meant a woman left with no other way to survive.

That fate pictures total loss, not a judgment on her own character.

Silencing God's word was about to cost Amaziah his entire family.

🎯 This judgment targets Amaziah personally
💔 Conquest could force women into this
🙅 It pictures loss, not her own guilt
📖 Silencing God's word cost his whole family

## 📏 Thy Land Shall Be Divided By Line

Divided by line means conquerors will measure and split up the land.

This echoes the plumbline from the vision earlier in this chapter.

That plumbline measured Israel's standing before God.

This line measures what enemies will take instead.

📏 Divided by line meant measured and split
🔁 This echoes the earlier plumbline vision
⚖️ That line measured Israel before God
📖 This line measures what enemies take

## 🌍 Thou Shalt Die In A Polluted Land

Polluted land here means foreign ground outside Israel.

Israelite law treated land outside the promised land as ritually unclean.

For a priest, dying there meant losing the one place his whole calling was built around.

This was the worst exile imaginable for someone in his position.

🌍 Polluted land meant foreign, unclean ground
⛪ A priest's calling depended on Israel's land
💔 Dying there meant losing that completely
📖 This was exile at its worst

## ⛓️ Israel Shall Surely Go Into Captivity Forth Of His Land

Surely means this is certain, not a possibility.

This closes both judgments from this chapter, Amaziah's and the nation's.

Three visions and one confrontation all point to the same outcome.

Israel's story in this chapter ends in exile, not another reprieve.

✅ Surely means certain, not possible
🔗 This closes both judgments together
🔢 Three visions point to one outcome
📖 This chapter ends in exile, not reprieve
`.trim();

export const AMOS_SEVEN_PERSONAL_SECTIONS = parseAmosSevenRawNotes(AMOS_SEVEN_RAW_NOTES);
