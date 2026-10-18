export type HebrewsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsTenRawNotes(rawText: string): HebrewsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 10:${startVerse}` : `Hebrews 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Hebrews 10 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_TEN_RAW_NOTES = `# Hebrews 10:1-4
# 🌑 The Shadow Of The Law
---
## 🌑 A Shadow Of Good Things To Come

A shadow is only an outline of something real, not the thing itself.

The law could point ahead to Christ but could never deliver him.

Think of a photograph of a feast.

The picture shows the meal but cannot feed anyone.

The law showed the shape of salvation without ever supplying it.

🌑 Shadow means an outline, not the object
📷 Think of a photo of a feast
🍽️ A photo cannot feed anyone
📖 The law showed salvation without supplying it

## 🙇 Make The Comers Thereunto Perfect

"Comers thereunto" is an old way of saying the people who came to worship there.

"Perfect" here means fully clean before God, not merely well behaved.

The yearly sacrifices were repeated again and again for a reason.

A sacrifice that actually finished the job would never need repeating.

Repetition itself was proof the problem was not solved.

👥 Comers thereunto means the worshippers
✅ Perfect means fully clean before God
🔁 Yearly sacrifices had to repeat
📖 Repetition proved the problem remained unsolved

## 😔 No More Conscience Of Sins

This does not mean the worshippers stopped feeling bad about their sins.

It means a sacrifice that worked would end that sense of guilt before God.

The old sacrifices never reached that deep.

Guilt kept returning because the sacrifice never fully dealt with sin.

That repeated guilt was proof something greater was still needed.

😔 Not about feeling bad on their own
🩹 Perfect sacrifice ends ongoing guilt
🔁 Guilt kept returning under the old system
📖 Repeated guilt proved more was needed

## 📅 A Remembrance Again Made Of Sins Every Year

The yearly Day of Atonement did not erase sin.

It only brought the sin back to mind.

That is a strange kind of remedy.

A medicine that only reminds the patient of the sickness is not a cure.

The sacrifices were a diagnosis, not a healing.

📅 The yearly ritual recalled sin again
🔁 It did not erase the sin
🩺 A reminder is not a cure
📖 Sacrifices diagnosed sin, never healed it

## 🩸 The Blood Of Bulls And Of Goats

Animal blood could cover sin ritually but could never erase it morally.

Bulls and goats were valuable animals.

They could never choose to obey God.

Sin is a matter of the will, not just a debt paid in flesh.

Only a willing, obedient sacrifice could truly deal with sin.

That sacrifice is coming in the next verse.

🩸 Animal blood covered sin ritually only
🐂 Bulls and goats could not choose
🙏 Sin needed a willing obedience
📖 A better sacrifice is coming next

# Hebrews 10:5-10
# 🙏 Christ Comes To Do The Will Of God
---
## 🙅 Sacrifice And Offering Thou Wouldest Not

God is not rejecting sacrifice as a concept here.

He is saying that animal offerings were never the final answer he wanted.

The whole system of bulls, goats, and grain was always meant to point further.

A signpost is useful, but no one parks a car on a signpost.

God wanted a person, not a procedure.

🙅 Not a rejection of sacrifice itself
🪧 The system was always a signpost
🚗 A signpost is not the destination
📖 God wanted a person, not a procedure

## 👤 A Body Hast Thou Prepared Me

This line is quoted from Psalm forty and placed in the mouth of Christ before his birth.

"Prepared" means God formed a human body specifically for this purpose.

The eternal Son did not already have a body to offer.

One had to be made so he could become the final sacrifice.

👤 Quoted ahead of time from Psalm forty
🧬 Prepared means specially formed
👶 The Son needed a body to offer
📖 A body was made for this one purpose

## 📖 In The Volume Of The Book

"The volume of the book" is an old way of saying the scroll of scripture.

Christ says his coming was already written down long before he arrived.

This was not a last minute rescue plan.

It had been the plan from the very start.

📖 Volume of the book means the scroll
📜 Christ's coming was already written
🕰️ This was not a late plan
➡️ It was the plan from the start

## 🔁 He Taketh Away The First That He May Establish The Second

"The first" is the old system of animal sacrifice.

"The second" is the obedience and offering of Christ.

One system had to end before the other could stand.

God was not patching the old system, he was replacing it.

🔁 The first means the old sacrifices
🆕 The second means Christ's obedience
🚫 God was not patching the old system
📖 He replaced it instead of fixing it

## ✅ Sanctified Through The Offering Once For All

"Sanctified" means set apart as holy and made acceptable to God.

"Once for all" means this offering never has to happen again.

Every animal sacrifice before this needed to be repeated.

Christ's offering closed the account permanently.

✅ Sanctified means made holy before God
🔂 Once for all means never repeated
🔁 Old sacrifices always needed repeating
📖 Christ's offering closed the account for good

# Hebrews 10:11-14
# 👑 One Sacrifice Seated Forever
---
## 🧍 Standeth Daily Ministering

Every ordinary priest in the temple worked standing up.

Standing was the posture of unfinished work, since the job was never done.

The sacrifices repeated day after day with no final moment of rest.

That daily grind is about to be contrasted sharply with Christ.

🧍 Standing was the priest's constant posture
🔁 The work was never finished
📅 Sacrifices repeated every single day
➡️ This sets up a sharp contrast with Christ

## 🪑 Sat Down On The Right Hand Of God

Sitting down is the opposite of the priest's endless standing in verse eleven.

To sit at God's right hand was a position of honor and finished authority.

No priest before this had ever been invited to sit in that place.

Christ sits because his work of offering sacrifice is actually complete.

🪑 Sitting is the opposite of standing
👑 The right hand means a place of honor
✅ No earlier priest ever sat there
📖 Christ sits because the work is finished

## 🦶 His Enemies Made His Footstool

Placing something under someone's feet pictured total defeat in the ancient world.

A conquered king might literally sit with a captured ruler's neck under his throne.

Christ is already seated, but this final victory is still being completed.

The outcome is certain even though the full defeat of evil has not yet arrived.

🦶 Footstool pictures total defeat
👑 Ancient kings pictured victory this way
⏳ The final victory is still unfolding
📖 The outcome is already certain

## ✨ Perfected For Ever Them That Are Sanctified

"Perfected" here does not mean believers never sin again.

It means their standing before God is now complete and secure.

One offering reached every single person who trusts in it.

No extra sacrifice will ever need to be added to it.

✨ Perfected means secure standing, not sinlessness
🔒 This standing cannot be undone
👥 One offering reaches every believer
📖 Nothing more needs to be added

# Hebrews 10:15-18
# 📜 The New Covenant In The Heart
---
## 🕊️ The Holy Ghost Also Is A Witness

The writer now brings in a second kind of proof besides logical argument.

The Holy Ghost himself testifies through an old prophecy from Jeremiah.

Scripture is being treated here as God's own spoken voice, not just ancient literature.

That same prophecy was already quoted once before, back in Hebrews chapter eight.

🕊️ The Holy Ghost adds direct testimony
📜 The proof comes from Jeremiah's prophecy
🗣️ Scripture is treated as God speaking
➡️ This backs up everything said so far

## ❤️ My Laws Into Their Hearts

Under the old covenant, the law was written on stone tablets outside a person.

A law written only on stone can be read but easily ignored.

The new covenant writes God's will into the heart itself, the center of desire and will.

Obedience becomes an inward desire instead of only an outward rule.

❤️ The new law is written inward
🪨 The old law was only on stone
👁️ Stone can be read but ignored
📖 Obedience now flows from desire, not only rules

## 🧽 Remember No More

This does not mean God simply forgets, since God forgets nothing.

It means he chooses never to hold these sins against the believer again.

A judge who tears up a case file still remembers the crime happened.

He has simply chosen never to bring the charge again.

🧽 Not literal forgetting, but a choice
⚖️ God chooses not to bring the charge
📁 Like a judge tearing up the file
📖 The sin is never held against the believer

## 🚫 No More Offering For Sin

Once sin is truly dealt with, there is nothing left to pay for.

This is the writer's conclusion after the whole argument of this chapter.

Animal sacrifice is not simply one option among several anymore.

It is finished, because the real payment already happened.

🚫 Nothing is left to pay for
🏁 This closes the chapter's whole argument
🐑 Animal sacrifice is no longer an option
📖 The real payment already happened

# Hebrews 10:19-25
# 🚪 Boldness To Draw Near
---
## 🚪 Boldness To Enter Into The Holiest

"The holiest" was the innermost room of the temple, where God's presence dwelt.

Under the old system, only the high priest entered there, and only once a year.

Ordinary people who approached without permission faced death.

Because of Christ, every believer can now approach that same presence directly.

🚪 The holiest was God's innermost presence
🙅 Only the high priest could enter before
⚠️ Entering without permission once meant death
📖 Believers can now approach directly

## 🛣️ A New And Living Way

A "way" in this verse means the path that leads into God's presence.

"New" means it did not exist under the old system.

"Living" means the way itself is alive, since it is Christ himself.

Every path before this one eventually ran out.

🛣️ Way means the path to God's presence
🆕 New means it never existed before
🌱 Living means the way itself is alive
📖 This path never runs out

## 🧵 Through The Veil That Is To Say His Flesh

The veil was a thick curtain separating the holy place from the holiest.

Only death could pass through that curtain under the old system.

Christ's own body, torn on the cross, is compared directly to that torn curtain.

His death opened the way that the veil had always blocked.

🧵 The veil separated people from God's presence
⚔️ Only death passed through it before
🩸 Christ's body is compared to that curtain
📖 His death opened the blocked way

## 🙏 An High Priest Over The House Of God

"The house of God" means God's whole family of believers, not a building.

A high priest represented the people before God and carried their concerns.

Christ now holds that role permanently, with no successor needed after him.

Every believer belongs inside that house through faith in him.

🙏 House of God means God's family
🗣️ A high priest represented the people
♾️ Christ holds this role permanently
📖 Believers belong to that house by faith

## 💧 Hearts Sprinkled From An Evil Conscience

Sprinkling with blood was the old ritual way of marking something as clean.

"An evil conscience" means the nagging sense of guilt that will not go away.

Christ's sacrifice does for the inside what the old rituals could only do on the outside.

Washing with "pure water" pictures that same inward cleansing.

💧 Sprinkling once marked ritual cleanness
😔 Evil conscience means lingering inner guilt
🧼 Christ cleans the inside, not just outside
📖 Pure water pictures that inward washing

## 🪢 Without Wavering

"Wavering" means switching back and forth between belief and doubt.

The writer urges holding the same confession steady, not changing it with every pressure.

That confidence rests on God's own faithfulness, not on the believer's mood.

The anchor for steady faith is who God is, not how the believer feels.

🪢 Wavering means switching between doubt and belief
🧷 Hold the same confession steady
🙌 God's faithfulness anchors that confidence
📖 Steady faith rests on who God is

## 🤝 Not Forsaking The Assembling Of Ourselves Together

Some believers had already stopped meeting with other Christians.

"Provoke unto love and good works" means spurring each other on, the opposite of discouraging.

Gathering together was never just a habit or a tradition.

It was one of the ways believers kept each other from quietly drifting away.

🤝 Some believers had stopped meeting together
🔥 Provoke means spurring one another on
👥 Gathering was never just tradition
📖 It kept believers from drifting away

# Hebrews 10:26-31
# 🔥 The Danger Of Willful Sin
---
## 😤 If We Sin Wilfully

"Wilfully" means a deliberate, ongoing rejection of the truth already known, not an occasional failure.

This is not describing every believer who stumbles and repents.

It describes someone who has fully understood the truth and still turns their back on it completely.

The warning targets a settled choice, not a single bad day.

😤 Wilfully means deliberate, knowing rejection
🙋 Not describing an occasional stumble
🚪 It describes a full turning away
➡️ Knowledge already received makes the choice serious

## ⚖️ A Certain Fearful Looking For Of Judgment

"Looking for" here means a dreadful expectation, not a hope.

Someone who rejects the only true payment for sin has nothing left to look forward to.

There is no second sacrifice waiting in reserve.

The earlier verses already explained why one offering was always meant to be enough.

⚖️ Looking for means dreadful expectation
🙅 No hope, only dread, remains
🐑 No second sacrifice is available
📖 Rejecting the only payment leaves nothing

## ⚰️ Died Without Mercy Under Two Or Three Witnesses

Under the old law, two or three witnesses were required before a death sentence was carried out.

This protected the accused from a single false or angry accusation.

The writer uses this familiar legal standard to introduce an even weightier comparison.

Moses' law already carried real and final consequences for the guilty.

⚰️ Two or three witnesses were required
🧑‍⚖️ This protected against a false accusation
📜 A familiar legal standard from the old law
➡️ A heavier comparison is coming next

## 👣 Trodden Under Foot The Son Of God

"Trodden under foot" is a picture of complete contempt, like stomping on something worthless.

Willful rejection does not just ignore Christ, it treats his sacrifice as beneath notice.

Calling his blood an "unholy thing" insults the very covenant it sealed.

The same blood that saves is the blood this sin despises.

👣 Trodden under foot means complete contempt
💔 Rejection treats Christ as worthless
🩸 His blood sealed the covenant itself
📖 Contempt for the cross is never small

## ⚡ Vengeance Belongeth Unto Me

This is a direct quote from the song of Moses in Deuteronomy thirty two.

God reserves the right to judge, so believers never have to take revenge themselves.

The same God who judges is also the one who promises mercy to those who trust him.

Both warning and mercy come from that same unchanging God.

⚡ A quote from Deuteronomy's song of Moses
🙅 Revenge is never the believer's job
👨‍⚖️ Judgment belongs to God alone
📖 The judge is also the one offering mercy

## 😨 Into The Hands Of The Living God

"Fearful thing" does not describe ordinary caution, it describes real dread.

Human courts can be escaped, bribed, or outlasted.

God's hands cannot be avoided by anyone, ever.

That is exactly why the earlier warning about willful sin matters so much.

😨 Fearful thing means real dread, not caution
🏛️ Human courts can sometimes be escaped
✋ God's hands cannot be avoided
📖 This is why the warning matters

# Hebrews 10:32-39
# 🏃 Endurance Until The Promise
---
## 🕰️ Call To Remembrance The Former Days

The writer shifts from warning to encouragement by pointing back to the readers' own history.

"Illuminated" refers to when they first understood the gospel clearly.

They had already proven they could endure hardship once before.

Remembering past faithfulness can steady someone facing a hard present.

🕰️ The tone shifts to encouragement here
💡 Illuminated means first understanding the gospel
🏋️ They had already endured hardship before
➡️ Their own history proves they can endure again

## 👀 Made A Gazingstock

A "gazingstock" is someone publicly stared at, mocked, and shamed.

Early believers were sometimes put on public display for ridicule, much like a public trial.

Suffering alongside others who were treated the same way built a shared loyalty between them.

Public shame was meant to isolate them, but it did the opposite.

👀 Gazingstock means publicly mocked and shamed
🎭 Some believers were put on public display
🤝 Shared suffering built loyalty between them
📖 They stood together instead of alone

## 📦 The Spoiling Of Your Goods

"Spoiling" means having one's property seized or destroyed, often by an angry mob or the state.

Losing possessions for following Christ was treated here as an actual joy, not a tragedy.

That joy only makes sense if something far more valuable was already secured.

Verse thirty four already names it, "a better and an enduring substance" in heaven.

📦 Spoiling means property seized or destroyed
😊 They faced this loss with real joy
💎 Joy only works if something better is secured
📖 Heaven held a better, lasting substance

## 🛡️ Cast Not Away Therefore Your Confidence

"Confidence" here is the same boldness mentioned earlier in verse nineteen.

The writer is not introducing a new idea, he is calling the readers back to it.

Confidence built through past suffering is too valuable to throw away now.

Trading it for comfort now would undo everything already endured.

🛡️ Confidence echoes the boldness from verse nineteen
🔁 This calls readers back to that truth
💰 Hard won confidence should never be wasted
📖 Giving up would discard something earned

## ⏳ Ye Have Need Of Patience

"Patience" here means steady endurance over time, not passive waiting.

The promise was real, but it had not yet fully arrived.

Doing God's will is the condition named just before receiving what was promised.

Endurance and obedience work together while the waiting continues.

⏳ Patience means steady endurance, not passive waiting
🎯 The promise was real but not yet here
✅ Obedience comes before receiving the promise
📖 Endurance bridges the gap until then

## 🚶 Will Not Tarry

This quotes the prophet Habakkuk, who also wrote to people waiting through hard times.

"Tarry" is an old word meaning to delay or linger.

The coming one is certain, even though the exact timing is not given.

Habakkuk's readers needed that same patience just urged in the verse before.

🚶 Tarry means to delay or linger
📜 This quotes the prophet Habakkuk
🎯 The coming one is certain
📖 Certainty matters more than exact timing

## 🙌 The Just Shall Live By Faith

This same line is quoted three times across the New Testament, a sign of how central it is.

"Live by faith" means ongoing trust, not a single decision made once and forgotten.

The opposite path, drawing back, is named directly in the very next verse.

Paul leans on this same verse to anchor both Romans and Galatians.

🙌 Quoted three times across the New Testament
🔁 Live by faith means ongoing trust
↩️ Drawing back is the opposite path
📖 Faith must be lived, not just started

## 🏁 Draw Back Unto Perdition

The chapter ends by sorting the readers into one of two groups.

"Perdition" means final ruin and loss, the opposite of being saved.

The writer places himself and the readers confidently in the second group, the ones who believe.

That confidence sets up the famous celebration of faith that opens the very next chapter.

🏁 Two groups close this chapter
💀 Perdition means final ruin and loss
🙌 The writer counts readers among the faithful
📖 Faith here leads straight into chapter eleven
`.trim();

export const HEBREWS_TEN_PERSONAL_SECTIONS = parseHebrewsTenRawNotes(HEBREWS_TEN_RAW_NOTES);
