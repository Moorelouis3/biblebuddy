export type PsalmsOneHundredSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredSixteenRawNotes(rawText: string): PsalmsOneHundredSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+116:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 116 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+116:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+116:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 116 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 116,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 116:${startVerse}` : `Psalms 116:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 116 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_SIXTEEN_RAW_NOTES = `# Psalms 116:1-2
# ❤️ I Love The LORD
---
## ❤️ I Love The LORD

Supplications means humble requests made with real urgency.

This word describes prayer that comes from deep need.

Most psalms open with a call to praise or a cry for help.

This one opens with a personal statement of love instead.

That love is tied directly to a specific answered prayer.

🙏 Supplications means urgent humble prayer

❤️ This psalm opens with love first

👂 God heard his voice and pleas

📖 Love follows a specific answered prayer

## 👂 He Hath Inclined His Ear Unto Me

Inclined his ear means God bent down to listen closely.

Picture a parent kneeling down to hear a small child speak.

God did not stay distant during this prayer.

He leaned in close enough to hear every word.

👂 Inclined ear means bending down to listen

👶 Like a parent kneeling to a child

🤍 God did not stay distant

📖 God leaned in to hear every word

## ⏳ As Long As I Live

This line is a vow, not just a feeling.

The psalmist promises to keep calling on God for his whole life.

This turns one answered prayer into a lifelong habit of worship.

Gratitude here does not fade once the crisis ends.

🤝 This line is a vow

📅 A promise to keep praying

🔥 Gratitude does not fade with time

📖 One answered prayer becomes lifelong worship

# Psalms 116:3-4
# ⛓️ The Sorrows Of Death Compassed Me
---
## ⛓️ The Sorrows Of Death Compassed Me

Compassed means surrounded on every side with no way out.

Many modern translations render this cords of death entangled me.

Either picture describes a trap closing in from every direction.

This was not a mild sadness but a real threat to his life.

🕸️ Compassed means surrounded on all sides

🪢 Other translations say cords of death

⚠️ A trap closing in from everywhere

📖 This was a real threat to his life

## 😖 The Pains Of Hell Gat Hold Upon Me

Hell here means Sheol, the Old Testament word for the realm of the dead.

This is not the New Testament picture of eternal fire and punishment.

Sheol simply meant the shadowy place all the dead were thought to go.

Gat hold means it grabbed him and would not let go.

🌑 Hell here means Sheol not fire

📜 An Old Testament word for the dead

✊ Gat hold means death grabbed him

📖 Death felt like it would not let go

## 😢 I Found Trouble And Sorrow

This short line summarizes everything just described in one phrase.

Trouble points to outward circumstances closing in on him.

Sorrow points to the inward grief he carried because of it.

Naming both together shows this pain touched him completely.

📝 A summary of everything just described

🌍 Trouble is outward circumstance

💧 Sorrow is inward grief

📖 The pain touched him completely

## 📣 Then Called I Upon The Name Of The LORD

This is the turning point of the whole psalm.

Calling upon the name of the LORD means appealing to who God is.

A name in Scripture carries someone's whole character and reputation.

This exact phrase will return later in the psalm as praise instead of a plea.

🔄 The turning point of the psalm

🏷️ The name means God's whole character

🙋 He appealed to who God is

📖 This phrase returns later as praise

## 🙇 O LORD I Beseech Thee Deliver My Soul

Beseech means begging with real urgency, not a calm request.

Repeating O LORD shows how desperate this moment felt.

Deliver my soul asks for his whole life to be saved.

This cry becomes the hinge the rest of the psalm turns on.

😩 Beseech means urgent desperate begging

🔁 Repeating O LORD shows desperation

🆘 Deliver my soul means save my life

📖 This cry becomes the psalm's turning hinge

# Psalms 116:5-7
# ✨ Gracious Is The LORD And Righteous
---
## ✨ Gracious Is The LORD And Righteous

Gracious means showing kindness that is not earned or owed.

Righteous means God always acts in a way that is right and just.

These two words might sound like they pull in different directions.

In God both kindness and justice are fully true at once.

🎁 Gracious means unearned kindness

⚖️ Righteous means always acting right

🤝 Both are fully true in God

📖 Kindness and justice are not opposites

## 💗 Our God Is Merciful

Merciful means God has compassion on people who do not deserve it.

This is the third description of God packed into one short verse.

Calling God our God makes this personal, not just theological.

The psalmist is not describing a stranger but the God he already knows.

💗 Merciful means compassion not deserved

📚 Another description packed in one verse

🫂 This makes God personal not distant

📖 The psalmist already knows this God

## 🌱 The LORD Preserveth The Simple

Simple here is an old word, not an insult about intelligence.

It describes someone untrained and easily led, not someone foolish.

God protects people even when they lack experience or wisdom of their own.

Preserveth simply means God keeps them safe over time.

🌾 Simple means untrained not unintelligent

🛡️ God protects the inexperienced too

⏳ Preserveth means kept safe over time

📖 God's care does not require expertise

## 📉 I Was Brought Low And He Helped Me

Brought low means he had fallen into real hardship.

This is not shame.

It is simply weakness or a real need.

He did not pull himself back up on his own.

God is the one who reached down and helped him.

📉 Brought low means real hardship

🙅 Not shame just weakness or need

🙋 He could not lift himself up

📖 God reached down to help him

## 🕊️ Return Unto Thy Rest O My Soul

The psalmist speaks directly to his own soul here.

This is a command aimed at himself.

Rest pictures a settled place after a long struggle.

The turmoil from the sorrows of death earlier has passed.

He can finally stop struggling and simply be still.

🗣️ He speaks directly to his own soul

🏡 Rest means a settled place again

🧘 He can finally stop struggling

📖 The turmoil from before has passed

## 🎁 The LORD Hath Dealt Bountifully With Thee

Bountifully means generously, far more than what was strictly needed.

This closes the section with a direct reminder of God's generosity.

The psalmist just told his own soul to rest.

Now he explains exactly why that rest is deserved.

🎁 Bountifully means far more than needed

💬 A direct reminder to his own soul

✅ Rest is deserved because of this

📖 God's generosity closes the section

# Psalms 116:8-9
# 🙌 Thou Hast Delivered My Soul From Death
---
## 🙌 Thou Hast Delivered My Soul From Death

This verse lists three specific things God rescued him from.

Soul from death means his very life was saved.

Eyes from tears means his grief itself was lifted, not just his body.

Feet from falling means he was kept steady when he might have collapsed.

All three losses connect back to the crisis described earlier in the psalm.

🕊️ Soul from death means life saved

😢 Eyes from tears means grief lifted

🦶 Feet from falling means kept steady

📖 Three rescues from one crisis

## 🚶 I Will Walk Before The LORD In The Land Of The Living

Land of the living is an old way of saying life here on earth.

This directly answers the fear of death from earlier in the psalm.

Walking before the LORD pictures an ongoing relationship, not a single moment.

He is not just alive, he is choosing to live in God's presence.

🌍 Land of the living means life on earth

🔙 Answers the fear of death from before

🚶 Walking before God is an ongoing relationship

📖 He chooses to live in God's presence

# Psalms 116:10-11
# 🗣️ I Believed Therefore Have I Spoken
---
## 🗣️ I Believed Therefore Have I Spoken

This exact line is quoted later in the New Testament.

Paul repeats it word for word in Second Corinthians chapter four.

The idea is that real faith eventually has to be spoken out loud.

Belief that stays silent is not the pattern this verse describes.

📜 Quoted later in the New Testament

✝️ Paul repeats it in Second Corinthians

🗣️ Real faith is eventually spoken aloud

📖 Belief was never meant to stay silent

## 😣 I Was Greatly Afflicted

Afflicted means he suffered real ongoing hardship.

This was not a small or passing complaint.

He spoke his faith in the middle of pain.

This was not comfort added only after it ended.

💢 Afflicted means real ongoing hardship

🙅 Not a small or passing complaint

🗣️ He spoke faith during the pain

📖 This was not comfort added later

## 😤 I Said In My Haste All Men Are Liars

Haste means a rushed, overwhelmed moment, not calm reflection.

This is not the psalm's final, settled belief about people.

It is an honest snapshot of despair in a hard moment.

Scripture is willing to record this raw thought without hiding it.

The very next verses turn back toward trust in God instead.

⏱️ Haste means a rushed overwhelmed moment

🙊 Not his final belief about people

📝 An honest snapshot of despair

📖 The next verses turn back to trust

# Psalms 116:12-14
# 🙏 What Shall I Render Unto The LORD
---
## 🙏 What Shall I Render Unto The LORD

Render means give back in response to a gift already received.

This is a question, not yet an answer.

The psalmist is not trying to earn what God already gave freely.

He is asking how to respond to it instead.

🎁 Render means give back a gift

❓ A question not yet an answer

🙅 Not trying to earn God's gift

📖 Asking how to respond instead

## 🍷 I Will Take The Cup Of Salvation

Many scholars believe this refers to a drink offering.

A drink offering was wine poured out at the temple.

It was offered alongside a sacrifice of thanksgiving.

Lifting this cup was a way of publicly celebrating what God had done.

🍷 Likely a drink offering of wine

🕍 Poured out at the temple

🎉 Offered alongside a thanksgiving sacrifice

📖 A public celebration of God's rescue

## 📣 Call Upon The Name Of The LORD

This exact phrase already appeared earlier, back in verse four.

There it was a desperate plea in the middle of danger.

Here it returns as thanksgiving after the danger has passed.

The same words now carry a completely different tone.

🔁 This phrase already appeared in verse four

😰 Then it was a desperate plea

🎉 Now it is thanksgiving instead

📖 Same words, completely different tone

## 🤲 I Will Pay My Vows Unto The LORD

A vow was a promise made to God during the crisis.

Paying it means following through now that the danger has passed.

This was not done privately or quietly.

It happened in front of the whole worshiping community on purpose.

🤝 A vow made during the crisis

✅ Paying it means following through now

👥 Done in front of the community

📖 The promise was fulfilled on purpose

# Psalms 116:15-16
# 💎 Precious In The Sight Of The LORD
---
## 💎 Precious In The Sight Of The LORD

This line is often misread as saying God enjoys the death of his people.

That is not what precious means here.

Precious means valuable and closely watched, not something taken lightly.

God does not let the death of his faithful ones happen carelessly.

Saints here simply means God's set apart people, not perfect ones.

❌ Not saying God enjoys death

💎 Precious means valuable and closely watched

👀 Their death does not happen carelessly

📖 Saints means God's set apart people

## 🙋 Truly I Am Thy Servant

This exact phrase repeats twice in the same verse.

Repetition in Hebrew poetry usually signals strong emphasis.

The psalmist is stating his identity with total certainty.

There is no hesitation left in how he sees himself now.

🔁 Repeats twice in one verse

📜 Repetition signals strong emphasis

🙋 States his identity with certainty

📖 No hesitation left in his answer

## 👩 The Son Of Thine Handmaid

Handmaid is an old word for a female servant.

Calling himself her son ties his identity to service, not status.

This likely echoes being born into a household already devoted to God.

His service to God did not start with him.

👩 Handmaid means a female servant

🏠 Ties his identity to service

👶 Likely born into a household serving God

📖 His devotion did not start with him

## ⛓️ Thou Hast Loosed My Bonds

Bonds pictures the grip of death and trouble described earlier.

Loosed means those bonds have now been untied completely.

This echoes the cords of death from the start of the psalm.

What once trapped him no longer holds him at all.

⛓️ Bonds echoes the trouble from before

🔓 Loosed means completely untied

🪢 Echoes the cords of death image

📖 What trapped him no longer holds him

# Psalms 116:17-19
# 🎉 I Will Offer The Sacrifice Of Thanksgiving
---
## 🎉 I Will Offer The Sacrifice Of Thanksgiving

A thank offering was a specific category of Old Testament sacrifice.

It was given in response to a rescue already received.

This is different from a sin offering, which dealt with guilt.

This offering simply says thank you for what already happened.

🙏 A specific Old Testament offering type

✅ Given after a rescue already happened

🙅 Different from a sin offering

📖 This offering simply says thank you

## 🔁 Now In The Presence Of All His People

This exact phrase already appeared back in verse fourteen.

Repeating it here bookends the psalm's promise to follow through.

The vow was not just made, it was carried out publicly again.

Naming the people again makes the commitment impossible to miss.

🔁 Repeats word for word from before

📚 Bookends the promise made earlier

✅ Carried out publicly a second time

📖 The commitment is impossible to miss

## 🏛️ In The Courts Of The LORD's House

Courts means the outer gathering areas of the temple.

This was where worshipers gathered, not the innermost holy space.

The LORD's house likely points to the temple in Jerusalem.

Naming the place makes this a public, physical act of worship.

🏛️ Courts means outer temple gathering areas

🕍 The LORD's house likely means the temple

📍 Names a specific physical place

📖 Worship here was public not private

## 🏙️ In The Midst Of Thee O Jerusalem

The psalm speaks directly to the city by name.

Jerusalem was the center of Israel's worship and temple life.

This vow was not paid alone, off in a private corner.

It happened at the very heart of the nation's worship.

🏙️ Speaks directly to Jerusalem by name

🕍 The center of Israel's worship

👥 Not paid alone in private

📖 Happened at the heart of the nation

## 🎉 Praise Ye The LORD

This is the Hebrew word hallelujah, translated into English here.

Many Jewish traditions group Psalms one hundred thirteen through one hundred eighteen together.

That collection is often called the Hallel, sung at Passover.

The psalm that began with fear of death ends in celebration.

🎉 Hallelujah simply means praise the LORD

📜 Part of a group called the Hallel

🕎 Sung during Passover celebrations

📖 Fear of death ends in celebration
`.trim();

export const PSALMS_ONE_HUNDRED_SIXTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredSixteenRawNotes(
  PSALMS_ONE_HUNDRED_SIXTEEN_RAW_NOTES
);
