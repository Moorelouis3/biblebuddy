export type NumbersTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyThreeRawNotes(rawText: string): NumbersTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 23:${startVerse}` : `Numbers 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 23 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_THREE_RAW_NOTES = `# Numbers 23:1-6
# 🐂 Preparing The First Sacrifice
---
## 🔢 Build Me Here Seven Altars

Seven is not a random number in this ritual.

In the ancient world it marked completeness, a way to get a god's full attention.

Balaam is following pagan divination customs, not anything Israel practiced.

The God about to answer him is not a local idol.

He is the true God, entering a ritual that was never built for Him.

🔢 Seven marked ritual completeness

🕯️ Balaam used common pagan divination customs

🌍 This God was never a local idol

📖 God answers even inside a pagan ritual

## 🔥 Stand By Thy Burnt Offering, And I Will Go

A burnt offering was an animal completely burned on the altar.

None of it was eaten.

The whole gift went up to God alone.

Balaam then sends Balak away and goes off by himself.

He wants to hear from God without an audience watching.

🔥 Burnt offering means fully consumed, not eaten

🚶 Balaam separates himself from Balak

🤫 He seeks God without an audience

📖 Private listening comes before public speaking

## 🤞 Peradventure The LORD Will Come To Meet Me

Peradventure is an old word for perhaps.

Balaam is not certain God will even respond to him.

He is a hired outsider prophet, unsure exactly how this God operates.

That uncertainty is honest, not fake humility.

Real prophets of the LORD never spoke with this kind of doubt.

🤞 Peradventure means perhaps

❓ Balaam is not sure how this works

🌍 He is an outsider guessing at God's ways

📖 True prophets never spoke with this doubt

## ⛰️ He Went To An High Place

High places were hilltop sites used for worship in the ancient world.

Standing higher up was believed to put a worshiper physically closer to the gods.

Balaam already used this same kind of location back in Numbers 22.

The setting fits his usual divination methods perfectly.

⛰️ High places were elevated worship sites

🙏 Height meant closer to the divine

🔁 Balaam used this setting before in Numbers 22

📖 The location matches his usual methods

## 💬 God Met Balaam

This is remarkable on its own.

God has no obligation to answer a foreign diviner using pagan style rituals.

Yet He shows up and engages Balaam directly anyway.

This matches exactly what already happened back in Numbers 22:9.

God's willingness to speak here is a gift, not something Balaam earned.

💬 God directly engages a foreign prophet

🎁 Not something Balaam earned through ritual

🔁 Matches the pattern already set in Numbers 22:9

📖 God's presence here is a gift

## 🗣️ The LORD Put A Word In Balaam's Mouth

This fulfills the one hard condition already set twice in Numbers 22.

Balaam does not get to choose his own words.

God supplies the exact message, and Balaam only carries it.

He is a messenger here, nothing more.

🗣️ Fulfills the restriction from Numbers 22

📜 God supplies the message

📦 Balaam only delivers what he is given

📖 A messenger has no say in the message

## 👑 All The Princes Of Moab

Balak did not come to this altar alone.

His own nation's leaders stood there watching with him.

This was a public, national event, not a quiet private request.

Everyone with real authority in Moab had a stake in the outcome.

👑 Moab's leaders stood there too

🏛️ This was a national event, not private

⚖️ Their authority was riding on this outcome

📖 The whole nation was watching for a curse

# Numbers 23:7-10
# 📜 The First Oracle: Israel Cannot Be Cursed
---
## 📖 He Took Up His Parable

Parable here does not mean a short story like the ones Jesus told.

It means a formal, elevated, poetic speech, a solemn message meant to be remembered.

Balaam is about to speak in verse, not casual conversation.

This word choice signals a shift into prophetic language.

📖 Parable means a formal poetic oracle

🎙️ A solemn style meant to be repeated

🔀 Signals a shift into prophetic speech

➡️ Balaam speaks in verse, not conversation

## 🏔️ Brought Me From Aram, Out Of The Mountains Of The East

Aram is the region near the Euphrates river, far to the northeast.

This matches Pethor's location already given back in Numbers 22:5.

Balaam traveled an enormous distance to reach Moab, likely hundreds of miles.

His journey alone shows how much Balak was willing to pay for this.

🏔️ Aram sits near the Euphrates river

🗺️ Matches Pethor's location from Numbers 22:5

🐫 Balaam traveled hundreds of miles to arrive

📖 Distance shows what Balak was willing to pay

## 🚫 Come, Curse Me Jacob, And Defy Israel

Balaam repeats Balak's original request word for word.

Jacob and Israel are two names for the same nation.

Jacob was the patriarch's birth name before God renamed him Israel.

That renaming happened back in Genesis 32:28.

Naming both names together makes the request unmistakably clear.

🚫 States Balak's original request plainly

👤 Jacob and Israel name the same nation

🔁 Recalls the renaming in Genesis 32:28

📖 Both names remove any doubt about the target

## ❓ How Shall I Curse, Whom God Hath Not Cursed?

This is Balaam's whole argument, stated as one simple question.

He is not refusing out of personal virtue.

He is stating a plain fact about how this works.

No one can curse what God has already decided to bless.

❓ A question with an obvious answer

⚖️ States a fact, not a personal choice

🚫 No curse can override God's blessing

📖 The real reason no curse is possible

## 👁️ From The Top Of The Rocks I See Him

Balaam describes his actual physical viewpoint looking down at Israel's camp.

But the phrase carries a second layer too.

Seeing from above pictures a clear, elevated perspective on the whole nation.

Balaam is seeing Israel the way God sees them, set apart from everyone else.

👁️ Describes his literal high viewpoint

🔭 Also suggests a clearer, God given view

🏕️ He sees Israel as set apart

📖 His words match what he sees

## 🏕️ The People Shall Dwell Alone

This describes Israel's unique identity as God's covenant people.

They stand distinct from every nation camped around them.

That separation is not a punishment or an insult.

It is a deliberate difference tied to their special relationship with God.

🏕️ Describes Israel's set apart identity

🌍 Distinct from every surrounding nation

🤝 Tied to their covenant relationship with God

📖 A calling, not an isolation as punishment

## 🌫️ The Dust Of Jacob

This line echoes God's old promise to Abraham in Genesis 13:16.

There, God said Abraham's descendants would be too many to count, like dust.

The fourth part of Israel likely points to the four tribal divisions from Numbers 2.

Israel was organized into those four groups for camping and marching.

This is poetry describing a nation that has grown beyond counting.

🌫️ Echoes the dust of the earth promise

🔢 Fourth part likely means Israel's four divisions

📖 Genesis 13:16 first made this promise

➡️ Poetic language for a nation too large

## ☠️ Let Me Die The Death Of The Righteous

Balaam wishes for a good, blessed death like the one he pictures for Israel.

This line is deeply ironic.

Balaam's own death is recorded later in Numbers 31:8.

He dies fighting on the side of Israel's enemies, not among the righteous.

His words here do not match how his own story actually ends.

☠️ A wish for a blessed death

😬 Deeply ironic given his real ending

⚔️ He later dies fighting against Israel

📖 His words do not match his own story

# Numbers 23:11-12
# 😤 Balak's First Complaint
---
## 😠 What Hast Thou Done Unto Me?

Balak's shock is immediate and personal.

He does not hide his anger at getting the opposite of what he paid for.

This is the first crack in his confidence that hiring Balaam would work.

His whole plan is already falling apart in front of him.

😠 An immediate, personal outburst of anger

💸 He paid for a curse, got a blessing

📉 The first crack in his confidence

📖 His plan is already unraveling

## 🎯 I Took Thee To Curse Mine Enemies

Balak's own words reveal his true motive from the very start.

He sees Israel only as a threat to remove, not a people to understand.

This blunt admission sets up a sharp contrast with what Balaam just declared.

🎯 Reveals Balak's real motive plainly

🆚 Contrasts sharply with Balaam's actual words

😨 Israel was only ever a threat to him

📖 His fear, not curiosity, drives this whole story

## 🙅 Thou Hast Blessed Them Altogether

Altogether means completely, with nothing held back.

This was not a partial or hedged blessing.

Balaam's words came out as a full, unqualified blessing.

That is the exact opposite of the curse Balak asked for.

🙅 Altogether means completely, no hedging

🔄 The exact opposite of Balak's request

🚫 No room left to reinterpret what happened

📖 A full blessing, not a partial one

## 🗣️ Must I Not Take Heed To Speak That Which The LORD Hath Put In My Mouth?

Balaam's defense stays consistent with everything already set up in Numbers 22.

He is not apologizing for what happened.

From his side, he never had a choice about the words at all.

The message belongs to God, and Balaam only carries it forward.

🗣️ A defense, not an apology

🔒 Matches the restriction from Numbers 22

📦 Balaam had no choice in the words

📖 The message was never really his to change

# Numbers 23:13-17
# 🏔️ A Second Attempt, A Different View
---
## 🙏 Come, I Pray Thee, With Me Unto Another Place

Balak's new plan is almost a kind of magical thinking.

He assumes that if the location and the view change, the outcome might too.

He believes the problem is where Balaam is standing.

He still has not grasped that God controls the words, not the place.

🙏 Balak hopes a new spot changes things

🧠 A kind of magical thinking about location

📍 He blames the place, not the outcome

📖 God controls the words, not the view

## 👁️ Thou Shalt See But The Utmost Part Of Them

Balak deliberately limits how much of Israel's camp Balaam can see.

A smaller, partial view might make cursing them feel easier.

This same strategy already appeared back in Numbers 22:41.

Balak keeps repeating an approach that has not worked yet.

👁️ A deliberately smaller view of the camp

🔁 The same strategy already tried in Numbers 22:41

🔂 Balak keeps repeating a failed approach

📖 A smaller view will not change God's word

## 🏔️ The Field Of Zophim, To The Top Of Pisgah

Zophim means watchers, a fitting name for a lookout point.

Pisgah is a mountain range in the land of Moab.

This exact spot matters again later in the Bible.

Moses will stand on Pisgah to view the promised land, right before he dies, in Deuteronomy 34:1.

🏔️ Zophim means watchers

🗺️ Pisgah is a mountain range in Moab

🔁 The same mountain returns in Deuteronomy 34:1

📖 Moses later views the promised land here

## 🔁 Built Seven Altars, And Offered A Bullock And A Ram On Every Altar

This is the exact same ritual already performed at the first location.

Seven altars again, one bullock and one ram burned on each.

Balak is trying the identical process a second time.

Only the place has changed, not the method.

🔁 The same ritual repeated a second time

🐂 Seven altars, one bullock, one ram each

📍 Only the location changed, not the method

📖 Repeating a ritual cannot force a different answer

## 🧍 Stand Here By Thy Burnt Offering, While I Meet The LORD Yonder

Balaam repeats his exact pattern from the first oracle.

He steps away, seeks God privately, then returns with whatever he is given.

Nothing about his actual process has changed at all.

Only the geography around him is different this time.

🧍 The identical process from the first oracle

🚶 He seeks God privately, just like before

🗺️ Only the geography is different now

📖 The method never actually changes

## 🤔 What Hath The LORD Spoken?

Balak asks eagerly, still hoping for a different result.

The first attempt already failed completely.

His hope has not run out yet, even though nothing has really changed.

He still expects a new outcome from an unchanged process.

🤔 An eager question despite the earlier failure

🤞 Balak's hope has not run out

🔁 He still expects a new outcome

📖 Nothing about the process has actually changed

# Numbers 23:18-24
# ⚖️ The Second Oracle: God Does Not Lie
---
## 📢 Rise Up, Balak, And Hear

Balaam opens this second oracle with a direct command to the king.

He tells Balak to stand up and listen.

This is a striking reversal of the usual roles.

Kings do not normally take orders from the people they hire.

📢 A direct command from Balaam to the king

🔄 A reversal of the normal hired servant role

👑 Kings do not usually take such orders

📖 Sets an authoritative tone before the oracle begins

## 👂 Hearken Unto Me, Thou Son Of Zippor

Hearken is an old word for listen carefully.

Using Balak's father's name, Zippor, makes this a formal address.

It works the way using someone's full name grabs their full attention.

This message deserves Balak's complete focus.

👂 Hearken means listen carefully

📛 Son of Zippor is a formal address

🎯 Formal names grab full attention

📖 This message demands Balak's complete focus

## 🧍 God Is Not A Man, That He Should Lie

This is one of the clearest statements in the Bible about God's character.

Repent here means to change his mind, not to turn from sin.

People break their word constantly.

God's promises simply do not work that way.

🧍 One of Scripture's clearest statements on God

🔄 Repent here means change his mind

🚫 Human unreliability is not something God shares

📖 God's promises never work like human ones

## ✅ Hath He Said, And Shall He Not Do It?

This is a rhetorical question with an obvious answer.

Of course God will do what He said.

Balaam is stating a principle that covers every promise God has ever made.

It is not limited to this one blessing over Israel.

✅ A rhetorical question with an obvious yes

📜 A principle covering every promise God made

🌍 Not limited to this one blessing

📖 What God speaks will always happen

## 📩 I Cannot Reverse It

Balaam admits plainly that he has no power to undo what God has done.

This is not Balaam being generous.

He is not choosing to spare Israel out of kindness.

The option to curse them was simply never his to take.

📩 A plain admission of zero power

🚫 Not generosity, just plain fact

📦 The option was never really his

📖 Balaam remains only a messenger, not a judge

## 👁️ He Hath Not Beheld Iniquity In Jacob

This does not mean Israel has never sinned.

The rest of the Bible makes their sin very clear.

For the purpose of this specific blessing, God is not counting it against them.

That choice flows from His covenant commitment to His people.

👁️ Does not mean Israel has no sin

🤝 God's covenant overrides the case against them

📖 The rest of Scripture proves otherwise

➡️ A statement about God's posture, not their record

## 👑 The Shout Of A King Is Among Them

Israel has no human king yet at this point in the story.

This king almost certainly points to God Himself as Israel's true ruler.

Shout pictures the kind of joyful noise made at a coronation.

It could also picture the sound of a victory celebration.

👑 Likely refers to God as Israel's king

📯 Shout pictures a coronation sound

🎉 Or a victory celebration sound

📖 Israel already lives under God's kingship

## 🐂 The Strength Of An Unicorn

Unicorn in the King James translation is a real animal, not a myth.

It likely refers to the wild ox, also called the aurochs.

This animal was enormously strong and is now extinct.

The comparison is about raw power, not fantasy.

🐂 Unicorn here means a real wild ox

💪 Known for enormous strength

🦴 The aurochs is now extinct

📖 A real animal comparison, not a myth

## 🔮 Neither Is There Any Divination Against Israel

There is real irony hiding in this line.

Balaam himself is a diviner by trade.

Yet here he declares that no occult practice has any power against Israel.

That includes his own profession.

🔮 A diviner naming divination powerless

😅 Genuinely ironic given his own trade

🚫 His own methods included in that claim

📖 No ritual can override God's decision

## 📰 What Hath God Wrought!

This phrase became famous centuries later.

Samuel Morse quoted it as the first message ever sent by telegraph in 1844.

Here, it is simply an exclamation of amazement.

Balaam is marveling at what God has visibly done for Israel.

📰 Later became the first telegraph message

📅 Quoted by Samuel Morse in 1844

🎉 An exclamation of amazement here

📖 A celebration, not a question

## 🦁 Rise Up As A Great Lion, And Drink The Blood Of The Slain

This pictures Israel as a fierce, unstoppable predator.

The imagery describes total military victory, not literal animal behavior.

Drinking the blood of the slain is graphic, standard war poetry for total conquest.

Similar violent imagery for victory shows up elsewhere in Old Testament poetry.

🦁 Pictures Israel as an unstoppable predator

⚔️ Describes total military victory, not literal behavior

🩸 Graphic, standard war poetry for conquest

📖 A common style for describing total victory

# Numbers 23:25-30
# 🏔️ On To Peor
---
## 🤐 Neither Curse Them At All, Nor Bless Them At All

Balak has given up on getting an actual curse.

He now just wants Balaam to stay completely silent.

Two failed attempts have lowered his goal from cursing his enemy to simply stopping the blessings.

This is a quiet admission that his whole plan is not working.

🤐 Balak's goal has shrunk to silence

📉 Two failures already lowered his hopes

🙊 He now just wants no more blessing

📖 A quiet admission that his plan failed

## 🗣️ Told Not I Thee, Saying, All That The LORD Speaketh, That I Must Do?

Balaam reminds Balak of something already said plainly back in verse twelve.

This is not new information.

Balak is simply refusing to accept an answer he has already heard twice.

His persistence is not based on new hope.

🗣️ Repeats what Balaam already said before

🔁 Balak refuses to accept a heard answer

😤 His persistence is stubbornness, not hope

📖 Nothing new has actually changed here

## 🙏 Peradventure It Will Please God That Thou Mayest Curse Me Them From Thence

Balak tries the exact same location based logic a third time.

He still hopes a different physical spot might change the answer.

This nearly repeats his own words from verse thirteen.

He has not learned that the place was never the real issue.

🙏 The same hope tried a third time

🔁 Nearly repeats his words from verse thirteen

📍 He still blames the location itself

📖 The place was never the real issue

## ⛰️ The Top Of Peor, That Looketh Toward Jeshimon

Peor is a mountain linked to the god Baal peor.

That same site becomes the center of a major crisis for Israel in Numbers 25.

Jeshimon means wasteland, describing the desert view from this height.

Balak personally brings Balaam here himself, the third location he has chosen.

⛰️ Peor is linked to the god Baal peor

🏜️ Jeshimon means wasteland

🚶 Balak personally leads him here again

📖 The same site returns in Numbers 25

## 🔁 Build Me Here Seven Altars, And Prepare Me Here Seven Bullocks And Seven Rams

This is the exact same ritual set up a third time.

The wording matches the instructions from verse one almost exactly.

Nothing about Balaam's method changes, no matter how many times it is tried.

The ritual has never once controlled the outcome.

🔁 The identical ritual instructions from verse one

🔢 The third repetition of the same process

🚫 The method has never controlled the result

📖 Ritual cannot force a different answer from God

## ✅ Balak Did As Balaam Had Said

The chapter ends in the middle of the ritual process.

This sets up the third and final oracle that comes in the next chapter.

Balak keeps complying even after two total failures.

His continued effort shows he still has not given up hope.

✅ The chapter ends mid ritual

⏭️ Sets up the third oracle in Numbers 24

🔁 Balak complies even after two failures

📖 His hope has still not run out
`.trim();

export const NUMBERS_TWENTY_THREE_PERSONAL_SECTIONS = parseNumbersTwentyThreeRawNotes(NUMBERS_TWENTY_THREE_RAW_NOTES);
