export type ExodusTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyFourRawNotes(rawText: string): ExodusTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 24:${startVerse}` : `Exodus 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 24 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_FOUR_RAW_NOTES = `# Exodus 24:1-2
# 🏔️ Called Up The Mountain
---
## ⛰️ Come Up Unto The Lord

God speaks this command right after giving Moses the law in the four chapters before this one.

This is not Moses climbing on his own initiative.

God calls him up personally, by name.

The mountain is Sinai, where the law was just spoken aloud.

This climb turns a spoken law into a formal covenant ceremony.

🗣️ God gives a personal invitation

📜 This follows the law already given

🏔️ Sinai is the mountain in view

📖 The climb formalizes the covenant

## 👦 Thou, And Aaron, Nadab, And Abihu

Nadab and Abihu are Aaron's two oldest sons.

God names them here months before they become priests.

Leviticus chapter ten later records both of them dying for offering fire God did not command.

Being singled out for honor here makes that failure land harder.

👦 Nadab and Abihu are Aaron's sons

🔥 Leviticus ten records their later deaths

😔 Honor here makes that failure heavier

📖 Their story starts with this invitation

## 👴 Seventy Of The Elders Of Israel

These seventy men were tribal leaders.

Moses chose them back in Exodus chapter eighteen.

His father in law Jethro said he could not judge the whole nation alone.

Seventy leaders present meant the whole nation was represented, not just Moses.

Jewish tradition later ties this group to the Sanhedrin.

That was the ruling council still active in Jesus's day.

👴 These were the elders from Exodus eighteen

⚖️ Jethro urged Moses to delegate judging

🤝 Seventy leaders represented the whole nation

📖 Tradition ties this group to the Sanhedrin

## 🚧 Worship Ye Afar Off

Everyone but Moses had to stop at a distance to worship.

God's presence on the mountain was too holy to approach carelessly.

Distance itself became a way of showing respect.

Exodus chapter nineteen already warned the people not to touch the mountain at all.

This command repeats and reinforces that same boundary.

🚧 Everyone stopped at a set distance

🙏 Distance itself showed respect for God

📏 Exodus nineteen already set this boundary

📖 Holiness required careful, respectful distance

## 🧍 Moses Alone Shall Come Near The Lord

This verse sets up three different levels of closeness to God.

The ordinary people stayed at the bottom of the mountain.

The elders and Aaron's sons could come partway up.

Only Moses could come all the way near.

This same step by step pattern becomes the blueprint for the tabernacle.

The outer court, the holy place, and the Most Holy Place mirror these three levels exactly.

🧍 Three levels of closeness are set here

🏛️ This maps onto the future tabernacle

🕊️ Moses alone reaches the closest level

📖 One mediator stands between God and Israel

# Exodus 24:3-4
# 📜 The People's Vow
---
## 📜 All The Words Of The Lord, And All The Judgments

Words and judgments are two different things here.

The words are the Ten Commandments God spoke directly from the mountain.

The judgments are the case laws just given for everyday life.

They cover things like injuries, property, and fair treatment.

Moses repeats both sets so the people hear the whole law.

📜 Words means the commandments God spoke

⚖️ Judgments means the case laws given

🩹 They cover injuries, property, and fairness

📖 The people heard the entire law

## 🗣️ All The People Answered With One Voice

The whole nation agreed together, out loud, as one.

This was not a quiet, private decision.

It was a public, spoken promise made by the entire community at once.

Ancient treaties between a king and his people often worked the same way.

Terms were read aloud, and the people responded with a formal yes.

That response made the agreement official and binding.

🗣️ The nation answered together as one

📜 This followed ancient treaty ceremonies

🤝 A formal yes made it official

📖 Public words made the promise binding

## ✍️ Moses Wrote All The Words Of The Lord

This is the first time the Bible shows Moses actually writing something down.

Before this, God spoke and Moses listened and repeated the words aloud.

Now the law becomes a permanent written record.

A written record cannot fade or shift the way memory can over time.

✍️ Moses writes Scripture down for the first time

📜 The law becomes a permanent written record

🧠 Memory alone could not be trusted forever

📖 Writing protected the covenant for the future

## 🪨 Builded An Altar Under The Hill, And Twelve Pillars, According To The Twelve Tribes Of Israel

The altar stood in for God's side of this agreement.

The twelve stone pillars stood in for the twelve tribes on the other side.

Physical markers like these were a common way to seal a covenant in the ancient world.

The stones themselves stood as a permanent witness that both sides had made a deal.

🪨 The altar represented God's side

🗿 Twelve pillars represented the twelve tribes

👁️ Stone markers were common covenant seals

📖 Silent stones testified to the agreement

# Exodus 24:5-8
# 🩸 The Blood Of The Covenant
---
## 🙋 Young Men Of The Children Of Israel

These were not official priests, because there was no priesthood yet.

Aaron and his sons are not set apart as priests until Exodus chapter twenty nine.

Until then, ordinary young men from the community carried out the sacrifices.

Sacrifice was not yet limited to one special family.

🙋 No official priesthood existed yet

📅 Aaron is ordained later in Exodus

🔓 Ordinary men could offer sacrifice here

📖 Priesthood was still months away

## 🔥 Offered Burnt Offerings

A burnt offering was completely burned up on the altar.

Nothing was kept back and nothing was eaten.

Burning the whole animal pictured total surrender.

The whole gift belonged to God with nothing held back.

🔥 The entire animal was burned

🚫 Nothing was kept for the giver

🎁 It pictured a gift of everything

📖 Surrender was the whole point

## 🍖 Sacrificed Peace Offerings Of Oxen

A peace offering worked differently than a burnt offering.

Only part of the animal was burned on the altar.

The rest of the meat became a shared meal.

This kind of sacrifice celebrated friendship and fellowship with God.

That fits perfectly with the meal the leaders share with God later in this chapter.

🍖 Only part of the animal was burned

🍽️ The rest became a shared meal

🤝 It celebrated friendship with God

📖 It points ahead to verse eleven's meal

## 🥣 Half Of The Blood, And Put It In Basons

Basons is simply an old word for bowls.

Splitting the blood in half connected both sides of the agreement.

One half would touch the altar, standing in for God.

The other half would soon be sprinkled on the people.

Blood represented life itself in this culture.

A blood ceremony meant both sides were bound together at the deepest level.

🥣 Basons means bowls

🔗 Blood connected both sides at once

❤️ Blood represented life itself

📖 This bound God and Israel together

## 📖 The Book Of The Covenant

The book of the covenant is the written record Moses just finished.

It holds the Ten Commandments and the case laws from the chapters before this one.

In the audience of is an old phrase meaning within hearing of.

Reading the terms aloud meant no one could later claim they never knew them.

📖 This book held the written law

👂 In the audience of means within hearing

✅ No one could claim ignorance later

➡️ Public reading made the terms undeniable

## 🤝 All That The Lord Hath Said Will We Do, And Be Obedient

This is the second time the people make this exact promise.

The first vow, back in verse three, was about action, doing what God said.

This second vow adds one more word, obedient.

It moves the commitment from outward action toward an inward attitude.

🤝 This is the people's second vow

➕ Obedient adds a deeper commitment

❤️ The vow moves from action to attitude

📖 Inward obedience was added on purpose

## 🩸 Behold The Blood Of The Covenant

Sprinkling the same blood on the people formally sealed the agreement.

This blood had already touched the altar back in verse six.

The blood of the covenant is not a one time phrase in Scripture.

Jesus uses nearly the same words at the Last Supper about his own blood.

The New Testament book of Hebrews later points back to this exact scene.

🩸 The same blood sealed both sides

🍷 Jesus echoes this phrase at the Last Supper

📜 Hebrews later points back to this scene

📖 One ceremony explains two covenants

# Exodus 24:9-11
# 👣 They Saw The God Of Israel
---
## ⛰️ Then Went Up Moses

This is the same group named back in verse one.

Now they actually climb, instead of just being invited.

The command from the start of the chapter finally happens.

Obedience here follows right after the vow the people just made.

⛰️ The same group from verse one climbs

🚶 Invitation becomes action here

🤝 This follows right after the vow

📖 Obedience followed the promise quickly

## 👣 They Saw The God Of Israel

Seventy four people are described seeing God directly and living to tell about it.

That count includes Moses, Aaron, Nadab, Abihu, and the seventy elders.

This kind of shared, direct vision of God is rare anywhere in the Bible.

Most encounters with God in Scripture involve one person at a time.

👣 Seventy four people saw God together

🙋 Not just Moses this time

😲 Shared visions like this are rare

📖 God let a whole leadership team witness this

## 💎 A Paved Work Of A Sapphire Stone

Sapphire describes a deep, brilliant blue, like a clear sky.

The elders are trying to describe something ordinary words cannot fully hold.

They reach for the closest earthly picture they can find.

Centuries later, the prophets Ezekiel and John use very similar sky blue imagery for God's throne.

💎 Sapphire means a deep brilliant blue

🗣️ Human language stretches to describe God

👁️ Ezekiel later sees similar imagery

📖 Both point toward the same throne

## ✋ He Laid Not His Hand

Laid not his hand is an old way of saying God did not strike them down.

Seeing God directly was normally considered fatally dangerous.

Exodus chapter thirty three later says no one can see God's face and live.

What the elders saw here was likely a glimpse of what was under God's feet, not his face.

This moment stands out as a specific act of mercy.

✋ Laid not his hand means no strike

⚠️ Seeing God was normally dangerous

👣 They saw beneath his feet, not his face

📖 God showed mercy in a risky moment

## 🍽️ Did Eat And Drink

Sharing a meal in someone's presence was a serious act of fellowship in this culture.

It was not a casual snack.

Ancient treaties between two parties were often sealed with a shared meal.

This meal on the mountain confirmed the covenant already made below.

Now it was celebrated in God's own presence.

🍽️ Sharing a meal meant real fellowship

📜 Treaties were often sealed with meals

🎉 This meal confirmed the covenant

📖 It happened in God's own presence

# Exodus 24:12-14
# 🪨 Tables Of Stone
---
## ⛰️ Come Up To Me Into The Mount, And Be There

This is a second call, higher and further than the first invitation in verse one.

Moses had already gone partway up the mountain with the elders.

Now God calls him alone, even further in.

This is a level of closeness none of the others will share.

⛰️ A second call goes higher up

🧍 Moses alone climbs even further

🔁 This builds on verse one's invitation

📖 Closeness with God keeps deepening

## 🪨 Tables Of Stone, And A Law, And Commandments Which I Have Written

Tables here means flat stone tablets, not furniture.

This is the first mention of the tablets that will hold the Ten Commandments.

God says he has written them himself, not Moses.

These would be inscribed directly by God's own hand.

🪨 Tables means flat stone tablets

✍️ God wrote them himself

📜 These become the Ten Commandments

📖 Divine handwriting, not human copying

## 🎓 That Thou Mayest Teach Them

The law was written down so it could be taught, not just kept.

God gives Moses a permanent copy for a specific reason.

It could be passed on accurately to others.

One man's encounter with God becomes instruction for an entire nation.

🎓 Writing enabled teaching, not just keeping

📋 Moses received a permanent copy

🔁 Accuracy could pass to others

📖 One encounter became a nation's instruction

## 🧑 His Minister Joshua

Minister here means a personal assistant, not a religious title.

This is a quiet, early introduction to Joshua.

He goes partway up the mountain with Moses here.

This happens long before he becomes Israel's leader after Moses dies.

Watching him serve closely here helps explain why he was ready later.

🧑 Minister means personal assistant here

👣 Joshua climbs partway with Moses

🔜 This comes long before he leads Israel

📖 Faithful service here shaped his readiness

## 🛡️ Aaron And Hur Are With You

Moses does not leave the people leaderless while he is gone.

Aaron and Hur are left in charge to handle disputes.

These are the same two men who held up Moses's hands during the battle with Amalek.

That battle is recorded back in Exodus chapter seventeen.

🛡️ Aaron and Hur stayed in charge

⚖️ They were left to settle disputes

🤝 Both held up Moses's hands before

📖 Exodus seventeen records that earlier moment

# Exodus 24:15-18
# ☁️ Forty Days In The Cloud
---
## ☁️ A Cloud Covered The Mount

This cloud was not ordinary weather.

It was the same visible sign of God's presence.

That same cloud had led Israel by day since Exodus chapter thirteen.

Now it settles directly over the mountain itself.

☁️ This was no ordinary weather

🔥 The same cloud led Israel by day

⛰️ Now it settles over the mountain

📖 The guide becomes the meeting place

## ✨ The Glory Of The Lord Abode Upon Mount Sinai

Glory describes the visible weight of God's presence.

It is not just a feeling or an idea.

The cloud covered the mountain for six full days before anything happened.

Moses had to wait inside that cloud before God spoke to him directly.

✨ Glory means God's visible presence

⏳ Six days passed before God spoke

🧍 Moses waited inside the cloud

📖 Even the invited had to wait

## 🔢 The Seventh Day He Called Unto Moses

God speaking on the seventh day echoes the pattern set at creation.

The seventh day was set apart there as different from the other six.

Even the timing of this meeting reflects that same rhythm.

Six days of waiting are followed by one day of hearing God's voice.

🔢 The seventh day matches creation's pattern

🔁 Six and seven repeat through Scripture

🗓️ Timing itself carries meaning here

📖 The rhythm points back to creation

## 🔥 The Sight Of The Glory Of The Lord Was Like Devouring Fire

Devouring means completely consuming, like a fire that burns up everything it touches.

From below, the people watching the mountain saw what looked like an unstoppable blaze.

The whole camp could see this, not just Moses.

It served as a visible, frightening reminder of God's holiness to everyone in the camp.

🔥 Devouring means completely consuming

👀 The whole camp could see this

⚠️ It reminded everyone of God's holiness

📖 Holiness was visible, not just spoken

## 🌫️ Moses Went Into The Midst Of The Cloud

Moses does not just approach the cloud from outside.

He physically walks into it.

This is a step further than anything described so far in the chapter.

Total immersion in God's presence follows total obedience to God's call.

🌫️ Moses walks directly into the cloud

🚶 This goes further than before

🙏 Obedience led to full immersion

📖 Nearness followed obedience, not fear

## 🕐 Forty Days And Forty Nights

Forty days and nights is a number that repeats again and again in Scripture.

It appears with the flood's rain, the spies scouting Canaan, and Jesus fasting in the wilderness.

Each of these forty day periods marks a season of testing or preparation.

Something significant always follows a period of forty.

🕐 Forty repeats at major turning points

🌧️ The flood's rain lasted forty days

🍞 Jesus fasted forty days in the wilderness

📖 Forty days prepared Moses for what followed
`.trim();

export const EXODUS_TWENTY_FOUR_PERSONAL_SECTIONS = parseExodusTwentyFourRawNotes(EXODUS_TWENTY_FOUR_RAW_NOTES);
