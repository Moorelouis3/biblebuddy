export type IsaiahFiftyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyEightRawNotes(rawText: string): IsaiahFiftyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+58:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 58 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+58:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+58:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 58 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 58,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 58:${startVerse}` : `Isaiah 58:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 58 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_EIGHT_RAW_NOTES = `# Isaiah 58:1-3
# 📯 The Fast They Cannot Explain
---
## 📯 Cry Aloud, Spare Not, Lift Up Thy Voice Like A Trumpet

A trumpet in ancient Israel sounded a public alarm, not a soft announcement.

God tells Isaiah to preach this message at full volume.

The people needed to hear this as an emergency, not a suggestion.

Nothing about the coming rebuke was meant to feel gentle.

📯 A trumpet meant a public alarm

🗣️ God tells Isaiah to preach at full volume

⚠️ This message was an emergency, not a suggestion

📖 Hard truth arrived loud, not softened

## 🪞 Shew My People Their Transgression, And The House Of Jacob Their Sins

"Shew" is an old word meaning to show or reveal something clearly.

The house of Jacob is another name for the nation of Israel.

It traces back to their ancestor Jacob, whose name later became Israel.

God already knows exactly what needs to be exposed.

🪞 Shew means to show or reveal

👪 House of Jacob names the nation Israel

🎯 God already knows the exact sin

📖 Confrontation, not guessing, is the assignment

## 🙋 Yet They Seek Me Daily, And Delight To Know My Ways

The people looked spiritually devoted from the outside.

They showed up regularly and studied what God required.

Seeking God daily should describe genuine devotion.

Here it describes a habit with no real change underneath it.

🙋 Israel looked devoted from the outside

📅 They kept a daily religious habit

🎭 Looking devoted is not being devoted

📖 A habit without change fools no one

## ⚖️ They Ask Of Me The Ordinances Of Justice

"Ordinances" means the specific rules God had laid out for right living.

The people wanted every rule spelled out clearly, in writing.

They were eager students of God's law.

The next verse reveals they were not eager to actually live it out.

⚖️ Ordinances means God's specific rules

📚 The people studied those rules closely

✅ Knowing rules is not keeping them

📖 Verse three exposes the real gap

## 😤 Wherefore Have We Fasted, Say They, And Thou Seest Not

The people complain that God has ignored their fasting.

Fasting meant giving up food for a set time to focus on God.

They expected the ritual itself to guarantee a reward.

Their tone here is frustration, not humility.

😤 The people complain God ignored their fast

🍽️ Fasting meant giving up food to seek God

🎫 They expected the ritual to earn a reward

📖 Frustration replaces real humility here

## 💼 Exact All Your Labours

God answers their complaint directly.

On their fast days they still squeezed hard work out of their laborers.

A true fast meant setting aside normal business to focus on God.

Business here continued exactly as usual.

💼 Laborers still worked hard on fast days

🎯 Normal business never actually stopped

🚫 The ritual changed nothing about their behavior

📖 A fast with no sacrifice is empty

# Isaiah 58:4-5
# 😔 The Fast God Rejects
---
## ⚔️ Ye Fast For Strife And Debate

"Strife" means ongoing conflict.

"Debate" here means quarreling.

Their fasting happened right alongside active arguing.

A day meant for humility was spent picking fights instead.

⚔️ Strife means ongoing conflict

🗣️ Debate here means quarreling

😠 Fasting happened alongside real infighting

📖 A day for humility was spent fighting

## 👊 To Smite With The Fist Of Wickedness

"Smite" means to strike or hit.

This phrase pictures real violence breaking out on a supposed holy day.

The people were not just arguing with words.

Some of them were coming to physical blows.

👊 Smite means to strike or hit

🥊 This describes real violence, not just words

📅 It happened on a supposedly holy day

📖 A sacred day hosted real bloodshed

## 🪴 Is It To Bow Down His Head As A Bulrush

A "bulrush" is a tall reed plant that bends easily in water or wind.

Bowing the head like a bulrush pictures someone slumping in exaggerated sadness.

God is describing a performance, not a real change of heart.

Looking humble is not the same as being humble.

🪴 Bulrush means a tall bending reed plant

😔 This pictures an exaggerated show of sadness

🎭 God is describing a performance

📖 Looking humble is not being humble

## 🧵 Spread Sackcloth And Ashes Under Him

Sackcloth was a rough, uncomfortable fabric worn to show grief or repentance.

Sitting in ashes was another common sign of mourning in this culture.

Both were normal, expected parts of a real fast.

God's complaint was never about the outward signs themselves.

It was that the heart behind them never actually changed.

🧵 Sackcloth was rough cloth worn in mourning

🌫️ Ashes were another visible sign of grief

✅ Both signs were normal parts of fasting

📖 The problem was the heart, not the signs

# Isaiah 58:6-7
# 🤲 The Fast God Chooses
---
## ⛓️ To Loose The Bands Of Wickedness

"Bands" here means chains or restraints used to control another person.

God says a real fast actively works to set the oppressed free.

This is not a passive, private ritual.

It requires taking real action on behalf of someone else.

⛓️ Bands means chains or restraints

🕊️ A real fast frees the oppressed

🙋 It is not private or passive

📖 Real worship takes real action for others

## 🎒 To Undo The Heavy Burdens

This continues the same picture from the phrase just before it.

A burden here means an unfair weight placed on someone through exploitation.

"Undo" means to actively remove that weight, not just feel bad about it.

God's chosen fast changes someone else's circumstances, not just the faster's feelings.

🎒 Burden means an unfair, exploitative weight

🔓 Undo means actively removing that weight

🙅 Feeling bad is not the same as acting

📖 True fasting changes someone else's life

## 🐂 Let The Oppressed Go Free, And That Ye Break Every Yoke

A "yoke" was a wooden bar used to bind an animal for labor.

Applied to people, it pictures forced servitude or unjust control.

Breaking every yoke means ending that control completely, not just easing it.

God's chosen fast targets injustice directly, by name.

🐂 A yoke was a bar controlling labor

⛓️ Applied to people, it means forced control

💥 Breaking it means ending injustice completely

📖 Fasting is meaningless without addressing injustice

## 🍞 Deal Thy Bread To The Hungry

God moves from ending oppression to actively giving.

Dealing bread means sharing food directly with someone who has none.

This was not a suggestion reserved for the wealthy alone.

Anyone observing this fast was expected to give something real.

🍞 Dealing bread means sharing food directly

🤲 Giving was expected of every faster

💰 This was not just for the wealthy

📖 A real fast costs the faster something

## 🚪 Bring The Poor That Are Cast Out To Thy House

"Cast out" describes people without a home or stable shelter of their own.

God calls for bringing them into an actual household, not handing them money outside.

This kind of hospitality was costly and personal.

It meant real contact with someone society had pushed aside.

🚪 Cast out means homeless and unsheltered

🏠 God calls for real hospitality, not distance

💸 This kind of giving was personal and costly

📖 Real fasting welcomes the people society ignores

## 🩸 Hide Not Thyself From Thine Own Flesh

"Thine own flesh" refers to a fellow human being who shares the same humanity.

Some scholars believe it may also point to a person's own relatives in need.

Hiding here means deliberately avoiding someone whose need feels inconvenient.

God's fast requires facing that need instead of looking away.

🩸 Thine own flesh means a fellow human

👪 It may also point to one's own relatives

🙈 Hiding means deliberately avoiding someone's need

📖 A real fast refuses to look away

# Isaiah 58:8-9
# 🌅 What Real Fasting Unlocks
---
## 🌅 Then Shall Thy Light Break Forth As The Morning

Light breaking forth as the morning pictures a sudden, hopeful new beginning.

This promise follows immediately after the real actions named in verses six and seven.

The reward comes after the actions, not instead of them.

God is not offering an easy shortcut around real obedience.

🌅 Morning light pictures a hopeful new beginning

📋 This promise follows real action, not empty ritual

🎯 Obedience comes before the reward here

📖 There is no shortcut around real change

## 🩹 Thine Health Shall Spring Forth Speedily

"Health" here can also mean healing or restoration, not only physical wellness.

"Speedily" means this restoration comes quickly once real obedience begins.

The picture is of something broken being repaired fast, not slowly.

God ties spiritual healing directly to how His people treat others.

🩹 Health here also means healing

⚡ Speedily means restoration comes quickly

🔧 Something broken gets repaired fast

📖 Healing is tied to how we treat others

## 🛡️ The Glory Of The LORD Shall Be Thy Rereward

"Rereward" is an old military term for troops guarding the back of a marching army.

It describes the most vulnerable position, the one enemies would attack first.

God promises to personally guard that exposed position Himself.

His own glory becomes the protection at the weakest point.

🛡️ Rereward means the guard at the rear

⚔️ It describes the army's most exposed spot

👑 God's glory covers that exact weak point

📖 God protects where His people are most exposed

## 🗣️ Thou Shalt Cry, And He Shall Say, Here I Am

This pictures an immediate, personal response from God.

"Here I am" is the same short, ready answer Isaiah gave in chapter six.

God no longer feels distant, the way He seemed back in verse three.

Real obedience changes how close God feels, not just how He acts.

🗣️ Here I am means an instant, personal answer

🔁 Isaiah used this same short answer earlier

📏 This contrasts the distance felt in verse three

📖 Obedience changes how near God feels

# Isaiah 58:10-12
# 💡 Light Rising In The Dark
---
## 🍞 Draw Out Thy Soul To The Hungry

This repeats and deepens the command already given in verse seven.

"Draw out thy soul" means giving from genuine compassion, not from mere duty.

The phrase pictures reaching inside oneself to offer something real.

God wants the heart behind the gift, not just the gift itself.

🍞 This repeats and deepens verse seven

❤️ Draw out thy soul means giving from compassion

🎁 God wants the heart behind the gift

📖 Duty alone was never the real goal

## 🌄 Thy Light Rise In Obscurity

"Obscurity" means darkness or a hidden, unclear situation.

This promises light appearing in exactly the place someone would least expect it.

The same image already appeared in verse eight, in a different form.

God specializes in bringing clarity out of confusion.

🌄 Obscurity means darkness or confusion

✨ Light appears where least expected

🔁 This echoes the same promise from verse eight

📖 God brings clarity out of confusion

## 🌿 Thou Shalt Be Like A Watered Garden

A garden without water in this dry region would quickly wither and die.

A watered garden pictures constant, reliable growth instead.

This was a vivid, everyday picture for the original audience.

Their survival depended on irrigation to keep anything alive.

God promises to be that steady, reliable water source Himself.

🌿 A watered garden pictures reliable growth

🏜️ Without water, gardens quickly withered here

💧 This picture was everyday and vivid then

📖 God promises to be that steady source

## 🧱 Thou Shalt Be Called, The Repairer Of The Breach

A "breach" is a broken gap in a wall, often from war or long neglect.

A repairer of the breach is someone who rebuilds what has been broken down.

This promise pictures God's people restoring ruined cities.

By extension, it points to rebuilding broken lives too.

🧱 Breach means a broken gap in a wall

🔨 A repairer rebuilds what was broken

🏙️ This pictures restoring ruined cities and lives

📖 The judged become known as rebuilders

# Isaiah 58:13-14
# 🕊️ Honoring The Sabbath
---
## 🦶 If Thou Turn Away Thy Foot From The Sabbath

"Turn away thy foot" is an old way of saying to stop and go a different direction.

The sabbath was the weekly day of rest God commanded His people to keep holy.

Turning the foot away from it means giving up personal business on that day.

This picks up the same fasting lesson, since both required setting personal interest aside.

🦶 Turn away thy foot means stop and redirect

📅 The sabbath was the weekly day of rest

💼 It meant setting personal business aside

📖 This echoes the same fasting lesson

## 😊 Call The Sabbath A Delight

God wants the sabbath approached with joy, not grudging obligation.

"Delight" here matches the same word used earlier for their false devotion in verse two.

The difference is that this delight is genuine, not a performance.

A day of rest was meant to feel like a gift, not a burden.

😊 God wants joy, not grudging obligation

🔁 Delight echoes the same word from verse two

✅ This time the delight is genuine

📖 Rest was meant to feel like a gift

## ⛰️ I Will Cause Thee To Ride Upon The High Places Of The Earth

Riding upon the high places pictures victory, safety, and honor, not a literal location.

This same phrase describes Israel's blessing back in Deuteronomy, when they first entered the land.

The heritage of Jacob points to the promises given to Jacob, later renamed Israel.

Real obedience, not empty ritual, was always the way into that inheritance.

⛰️ High places pictures victory and honor

🔁 The same phrase appears back in Deuteronomy

👪 Heritage of Jacob points to Israel's promises

📖 Real obedience opens the way to blessing
`.trim();

export const ISAIAH_FIFTY_EIGHT_PERSONAL_SECTIONS = parseIsaiahFiftyEightRawNotes(ISAIAH_FIFTY_EIGHT_RAW_NOTES);
