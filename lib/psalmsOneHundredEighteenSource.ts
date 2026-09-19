export type PsalmsOneHundredEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredEighteenRawNotes(rawText: string): PsalmsOneHundredEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+118:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 118 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+118:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+118:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 118 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 118,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 118:${startVerse}` : `Psalms 118:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Psalms 118 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_EIGHTEEN_RAW_NOTES = `# Psalms 118:1-4
# 🙌 O Give Thanks Unto The LORD
---
## 🔁 For His Mercy Endureth For Ever

"Mercy" here translates the Hebrew word chesed.

Chesed means loyal, covenant keeping love, not a passing feeling.

This refrain repeats five times across this psalm.

Psalm 136 repeats it twenty six times in a row.

The repetition is not filler.

It trains the worshipper to answer every good outcome the same way.

🔁 Mercy translates the Hebrew word chesed

🤝 Chesed means loyal covenant love

🎶 This refrain repeats five times here

📖 Psalm 136 repeats it twenty six times

## 🎤 Let Israel Now Say

This is not a private psalm read alone.

It was written to be sung by a crowd, out loud, together.

A worship leader called out a line.

The gathered people answered back with the same refrain.

This call and response structure repeats for the next two verses too.

Congregational singing turned one memory into a shared confession.

🎤 A worship leader called out a line

👥 The people answered back together

🔁 Call and response repeats twice more

📖 Congregational singing shared one memory

## 🪔 Let The House Of Aaron Now Say

The house of Aaron refers to Israel's priests.

Aaron was Moses' brother and the first high priest.

Every priest who served in the temple descended from him.

This verse calls out a second specific group to answer the refrain.

First the whole nation spoke.

Now the priesthood adds its own voice.

⛪ House of Aaron means the priests

🪔 Aaron was the first high priest

🔂 A second group answers the refrain

📖 The priesthood adds its own voice

## 🌍 Let Them Now That Fear The LORD Say

To fear the LORD does not mean being afraid of him.

It means holding God in deep reverence and awe.

This third group is wider than Israel or the priesthood alone.

Many scholars believe it may include Gentile worshippers who revered Israel's God.

Three distinct groups have now all echoed the same refrain.

The whole assembly, however it was made up, agrees on one thing.

😌 Fear here means reverence not terror

🌍 Fear the LORD may include Gentile worshippers

🔢 Three separate groups have now spoken

📖 The whole assembly agrees together
# Psalms 118:5-7
# 🆘 I Called Upon The LORD In Distress
---
## 😰 I Called Upon The LORD In Distress

Distress here means a real, specific danger, not everyday stress.

This whole psalm looks back on one particular deliverance.

A large place is a Hebrew idiom for freedom and relief.

The opposite would be a cramped, narrow trap with no way out.

Being surrounded by enemies often felt exactly like that trap.

God's answer moved him from a tight corner into open ground.

😰 Distress means a real specific danger

🗝️ This psalm recalls one deliverance

🏞️ Large place is an idiom for freedom

📖 God moved him from trap to freedom

## ❓ What Can Man Do Unto Me

This question is not really a question.

It is a confident statement dressed as one.

Because the LORD is on his side, no human threat can undo him.

The New Testament book of Hebrews quotes this exact line.

Hebrews chapter thirteen verse six borrows it to comfort persecuted believers.

Confidence in God was never limited to the Old Testament.

❓ The question is really a statement

🛡️ No human threat can undo him

📚 Hebrews quotes this exact line

📖 Confidence in God spans both testaments

## 🤝 The LORD Taketh My Part With Them That Help Me

Taketh my part means the LORD fights on his side.

Them that help me refers to his own allies and supporters.

I shall see my desire upon them that hate me is a Hebrew idiom.

It means watching a threat get resolved, not craving revenge.

The psalmist is not celebrating cruelty here.

He is trusting God to make the danger go away for good.

🤝 Taketh my part means God fights for him

👥 Them that help me are his allies

👀 Seeing his desire means watching danger resolved

📖 This is trust, not a craving for revenge
# Psalms 118:8-9
# 🤝 It Is Better To Trust In The LORD
---
## ⚖️ It Is Better To Trust In The LORD

This exact line repeats twice in a row, in verse eight and verse nine.

Man here means any ordinary human being.

Trusting God is set against leaning on people instead.

Many note that this couplet falls near the middle of the printed King James Bible.

That placement is a coincidence, not the point.

The real point is that God outlasts every human backup plan.

🔁 This line repeats twice in a row

🧑 Man means any ordinary human being

⚖️ Trusting God beats leaning on people

📖 God outlasts every human backup plan

## 👑 Than To Put Confidence In Princes

Verse eight already said not to trust ordinary people.

This verse raises the stakes to trust in princes.

Princes here means kings and powerful rulers with armies and wealth.

If trusting God beats even a king, it beats anyone smaller too.

The repetition is not wasted breath.

It builds from ordinary people up to the most powerful people alive.

👑 Princes means kings and powerful rulers

📈 This verse raises the stakes higher

🏰 Kings have armies and real wealth

📖 God outranks even the most powerful ruler
# Psalms 118:10-12
# 🐝 They Compassed Me About Like Bees
---
## 🔁 In The Name Of The LORD Will I Destroy Them

This exact phrase repeats three times in only three verses.

All nations compassed me about pictures an entire army surrounding one man.

In the name of the LORD means acting under God's authority, not his own.

Destroy them is not personal revenge talk.

It is confidence that God himself will win this fight.

Ancient readers used repetition the way we use bold text today.

🔁 This phrase repeats three times running

⚔️ Nations compassed him means he was surrounded

🙏 Acting under God's authority not his own

📖 God will win the fight, not him

## 🐝 They Compassed Me About Like Bees

A swarm of bees is not one attacker but hundreds acting together.

Bees also sting repeatedly and do not stop after one hit.

That is the picture of being surrounded by an entire hostile army.

Quenched as the fire of thorns describes a different kind of danger.

Dry thorns burn hot and fast, then die out almost as quickly.

The threat looked overwhelming but it did not last.

🐝 Bees swarm and sting many times

⚔️ This pictures being surrounded by an army

🔥 Thorns burn fast then die out

📖 The threat looked huge but did not last
# Psalms 118:13-14
# 💪 The LORD Is My Strength And Song
---
## 😤 Thou Hast Thrust Sore At Me That I Might Fall

The psalmist suddenly speaks straight to his enemy here.

Thrust sore means shoved hard, with real force.

That I might fall states the enemy's exact goal plainly.

The attack was real and it nearly worked.

But the LORD helped me closes the verse with a single reversal.

One small clause undoes the whole attack.

😤 The psalmist speaks straight to his enemy

💥 Thrust sore means shoved with real force

🎯 The enemy's goal was to make him fall

📖 One clause from God reverses the attack

## 📜 The LORD Is My Strength And Song

This exact line is not new to this psalm.

It quotes Moses' song after Israel crossed the Red Sea in Exodus.

Borrowing that line links this deliverance to Israel's greatest rescue story.

Strength and song describes two different kinds of response.

Strength for the danger itself, song for what comes after it.

Become my salvation means God himself was the outcome, not just the helper.

📜 This line quotes Moses' song in Exodus

🌊 It recalls Israel crossing the Red Sea

💪 Strength and song are two different responses

📖 God himself became the salvation
# Psalms 118:15-16
# 🙌 The Right Hand Of The LORD Doeth Valiantly
---
## ⛺ In The Tabernacles Of The Righteous

Tabernacles here simply means tents, the homes of ordinary people.

This is not the tabernacle building where Israel worshipped God.

It pictures celebration breaking out in the tents of everyday families.

Voice of rejoicing and salvation describes shouting after a battle won.

The party is not happening at the palace alone.

It spreads to every home in the camp.

⛺ Tabernacles here means ordinary tents

🎉 It is not the worship tabernacle building

📣 Rejoicing describes shouting after a battle won

📖 The celebration spreads to every home

## ✋ The Right Hand Of The LORD Is Exalted

The right hand in Hebrew idiom pictures strength and decisive action.

Most people favored their right hand for work and for battle.

Saying God's right hand is exalted means his power is on display.

This exact phrase, doeth valiantly, repeats from the line before it.

Repetition here works like an echo, not wasted words.

The victory belongs entirely to God, not to any human effort.

✋ Right hand pictures strength in Hebrew idiom

🏆 God's power is now on display

🔁 Doeth valiantly repeats from the line before

📖 The victory belongs to God alone
# Psalms 118:17-18
# 💗 I Shall Not Die But Live
---
## 🤝 I Shall Not Die But Live

This line is a vow, spoken in the middle of real danger.

The psalmist commits to staying alive on purpose, not by accident.

Declare the works of the LORD names exactly why his life matters.

His survival was never going to be private.

He planned to keep telling this story out loud.

A vow like this turns one rescue into ongoing testimony.

🤝 This line is a spoken vow

🙌 He commits to staying alive on purpose

🗣️ He plans to tell the story out loud

📖 One rescue becomes ongoing testimony

## 📏 The LORD Hath Chastened Me Sore

Chastened means disciplined or corrected, not simply hurt at random.

The danger in this psalm came with a purpose behind it.

But he hath not given me over unto death sets a hard limit.

Discipline had a boundary that God himself controlled.

Correction was never meant to end his life.

The suffering had a purpose and it also had an edge.

📏 Chastened means disciplined, not random suffering

🚧 God set a limit on the danger

🛑 Death was never the actual goal

📖 Correction had both a purpose and an edge
# Psalms 118:19-21
# 🚪 Open To Me The Gates Of Righteousness
---
## 🚪 Open To Me The Gates Of Righteousness

This pictures a worshipper arriving at the temple gates after a rescue.

Ancient temples often had a set liturgy for who could enter.

The worshipper asks to be let in so he can give thanks publicly.

I will go into them states his intention plainly.

Praise here was never meant to stay private.

It belonged inside the gathered worship of God's people.

🚪 He arrives at the temple gates

📜 Temples had a set entry liturgy

🙌 He wants to praise God publicly

📖 Worship belonged with the whole community

## 🗝️ This Gate Of The LORD

This line answers the request made in the verse before it.

A gatekeeper, whether real or pictured, replies on God's behalf.

Into which the righteous shall enter sets the condition for entry.

Psalm 24 asks a nearly identical question about who may enter God's presence.

Righteousness here is not sinless perfection.

It means living in right relationship with God through faith.

🚪 This answers the request before it

🗝️ A gatekeeper replies on God's behalf

✅ The righteous are the ones allowed in

📖 Psalm 24 asks this same question

## 🙏 I Will Praise Thee For Thou Hast Heard Me

This verse turns the psalm back to personal thanksgiving.

For thou hast heard me names the exact reason for the praise.

God did not just permit him through the gate.

God had already answered the prayer that got him there.

Art become my salvation repeats the phrase from verse fourteen.

The whole psalm keeps circling back to that same one word.

🙏 This returns to personal thanksgiving

👂 God heard him before he arrived

🚪 Entry follows an answered prayer

📖 Salvation is the psalm's repeated word
# Psalms 118:22-23
# 🪨 The Stone Which The Builders Refused
---
## 🧱 The Stone Which The Builders Refused

Builders here rejected one stone as useless during construction.

The head stone of the corner is the most important stone in the whole building.

It sets the angle and strength for every other stone around it.

Something the builders threw away became the piece the structure could not stand without.

Jesus later applies this exact verse to himself in the Gospels.

Peter also quotes it in the book of Acts.

🧱 Builders rejected this stone as useless

📐 The head stone anchors the whole building

🔄 A rejected stone became essential

📖 Jesus and Peter both quote this verse

## 🎯 This Is The LORD's Doing

This reversal did not happen by accident or luck.

The text credits it directly to God's own action.

Marvellous in our eyes describes shared amazement, not private surprise.

The whole community is watching and responding together.

A rejected stone becoming essential should stop everyone in their tracks.

That is exactly the reaction this verse expects.

🎯 This was God's action, not luck

😲 Marvellous means shared collective amazement

👥 The whole community watches this together

📖 A rejected stone becoming essential stuns everyone
# Psalms 118:24
# 📅 This Is The Day Which The LORD Hath Made
---
## 📅 This Is The Day Which The LORD Hath Made

This line is often quoted today for any ordinary morning.

In its original setting it points to one specific day.

That day marked a real, remembered deliverance being celebrated by name.

Ancient Israel likely sang this during a set feast or thanksgiving service.

The verse is not denying that every day belongs to God.

It is naming one day worth singling out for celebration.

📅 Often quoted today for any morning

🎉 Originally it named one specific day

🕍 Israel may have sung it at a feast

📖 One day was singled out for celebration

## 🎊 We Will Rejoice And Be Glad In It

This closing line is a decision, not just a feeling.

The community chooses to rejoice on purpose, together, out loud.

It answers the opening call to give thanks from verse one.

The whole psalm moves from danger, to rescue, to shared celebration.

Joy here is not private or quiet.

It is meant to be seen and heard by everyone present.

🎊 Rejoicing is a choice not a feeling

🤲 The community chooses joy together

🔄 This answers the call from verse one

📖 Joy here is public, not private
# Psalms 118:25-27
# 🙏 Save Now I Beseech Thee
---
## 🗣️ Save Now I Beseech Thee

Save now translates two Hebrew words, hoshia and na.

Put together they became the word hosanna.

Beseech thee means to beg with real urgency, not a casual request.

This line is not calm praise.

It is a desperate plea for rescue and blessing both.

The same cry shows up centuries later in the Gospels.

🗣️ Save now becomes the word hosanna

🙏 Beseech means to beg with urgency

😣 This is a desperate plea not calm praise

📖 The same cry appears later in the Gospels

## 👑 Blessed Be He That Cometh In The Name Of The LORD

This exact line greets Jesus as he enters Jerusalem before his death.

The crowds shout it directly at him in all four Gospels.

In the name of the LORD means arriving with God's own authority.

The original worshippers in this psalm were greeting a victorious king.

Centuries later the crowd used the same words for a greater king.

One verse ended up welcoming two very different arrivals.

👑 Crowds shout this at Jesus in the Gospels

🚪 It greets someone arriving with God's authority

🎉 Originally it greeted a victorious king

📖 One verse welcomed two different arrivals

## 🐂 Bind The Sacrifice With Cords Even Unto The Horns Of The Altar

The horns of the altar were four raised corners built onto its top.

They were not decoration.

Priests tied sacrifices to them and also used them during atonement rituals.

Binding the sacrifice kept it in place during the offering itself.

This detail grounds the psalm's praise in real temple worship, not just words.

Worship here was physical, not only spoken.

🐂 Altar horns were four raised corners

🔗 Priests bound sacrifices to the horns

🩸 Horns were also used in atonement rituals

📖 Worship here was physical not just spoken
# Psalms 118:28-29
# 🙌 Thou Art My God And I Will Praise Thee
---
## 🙌 Thou Art My God And I Will Exalt Thee

Thou art my God repeats twice in this one verse alone.

The whole psalm has moved from a crowd's confession to one man's own voice.

Exalt thee means to lift God up above everything else.

This is not new information for the reader.

It is a personal vow restated with full conviction.

The doctrine has become a decision.

🙌 Thou art my God repeats twice here

🎤 The psalm moves from crowd to one voice

⬆️ Exalt means to lift God up highest

📖 A doctrine has become a personal decision

## 🔁 O Give Thanks Unto The LORD For He Is Good

This is the exact line that opened the psalm in verse one.

Ending on the same words as the beginning is called an inclusio.

An inclusio wraps the whole psalm inside one repeated frame.

Everything between these two lines proved the claim true.

Distress came, enemies compassed him, and rescue arrived exactly as expected.

The psalm ends where it started, but now the claim has been tested.

🔁 This repeats the exact opening line

📦 Matching endings and openings is called inclusio

🖼️ The whole psalm sits inside one frame

📖 The claim from verse one is now proven
`.trim();

export const PSALMS_ONE_HUNDRED_EIGHTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredEighteenRawNotes(
  PSALMS_ONE_HUNDRED_EIGHTEEN_RAW_NOTES
);
