export type PsalmsSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventeenRawNotes(rawText: string): PsalmsSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 17:${startVerse}` : `Psalms 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 17 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTEEN_RAW_NOTES = `# Psalms 17:1-3
# ⚖️ A Plea For A Fair Hearing
---
## ⚖️ Hear The Right, O LORD

"The right" means the cause David is bringing before God.

This is courtroom language.

David pictures God as the judge in his case.

David is not making small talk.

He is asking God to rule in his favor.

The rest of the psalm reads like his evidence.

⚖️ Right means David's just cause
🏛️ Language borrowed from a courtroom
👨‍⚖️ God pictured as the judge in the case
📖 David petitions God for a verdict

## 👂 Attend Unto My Cry

"Attend" means to listen closely, not just hear in passing.

A cry here is an urgent plea, not a calm request.

David is not making a quiet suggestion to God.

He is begging for God's full attention right now.

The urgency in his words shows how desperate he feels.

👂 Attend means listen closely
😢 Cry is an urgent plea
🙏 David begs for full attention
📖 His words show real desperation

## 🎭 That Goeth Not Out Of Feigned Lips

"Feigned" means false or put on for show.

David insists his prayer is not an act.

Some people pray only to look religious in public.

David wants God to know this prayer is sincere.

His words match what is actually in his heart.

🎭 Feigned means false or put on
🙅 Not prayer performed for show
❤️ David's words match his heart
📖 He asks God to judge his sincerity

## 📜 Let My Sentence Come Forth From Thy Presence

A sentence here means a legal verdict, not a punishment.

David wants that verdict to come directly from God.

No human court could settle what he is asking.

Only God can see the truth behind his case.

David trusts the judge, not the process.

📜 Sentence means a legal verdict
👨‍⚖️ David wants God to decide
🚫 No human court could settle this
📖 David trusts the judge, not the process

## 🎯 Let Thine Eyes Behold The Things That Are Equal

Equal here means fair, balanced, exactly right.

David is not asking for special treatment.

He wants God to weigh his case honestly.

A fair verdict is all he is asking for.

That kind of prayer only makes sense for someone who has nothing to hide.

🎯 Equal means fair and balanced
🙅 Not asking for special treatment
⚖️ David wants an honest weighing of his case
📖 A clean conscience allows this prayer

## 🔥 Thou Hast Proved Mine Heart

"Proved" means tested, the way fire tests metal.

David says God has already examined his heart directly.

This was not a casual glance.

God searched him the way a refiner checks for impurities.

David welcomes that kind of scrutiny.

🔥 Proved means tested like metal
🔍 God examined David's heart directly
⚱️ Like a refiner checking for impurities
📖 David welcomes that kind of scrutiny

## 🌙 Thou Hast Visited Me In The Night

Night was when David was alone, with no one watching.

There was no audience left to perform for.

God chose that private hour to examine him.

A person's true character often shows most at night.

God tested David when it counted the most.

🌙 Night meant no one was watching
🎭 No audience left to perform for
🔎 God examined him in private
📖 True character shows most in private

## ⚱️ Thou Hast Tried Me, And Shalt Find Nothing

"Tried" repeats the picture of metal tested by fire.

This time David names the result of that test.

God searched him thoroughly and found no hidden sin.

David is not claiming to be sinless in every way.

He is claiming honesty about the accusation he currently faces.

⚱️ Tried repeats the refining picture
🔍 God searched him thoroughly
🙅 Not a claim of total sinlessness
📖 He is honest about this specific charge

## 🗣️ I Am Purposed That My Mouth Shall Not Transgress

"Purposed" means a firm decision, not a hopeful wish.

David has made a deliberate choice about his words.

He resolves ahead of time not to sin with his mouth.

That kind of resolve takes real effort to keep.

His speech backs up the honesty he just claimed.

🗣️ Purposed means a firm decision
🚫 Not just a hopeful wish
✅ David resolves not to sin in speech
📖 His words back up his honesty

# Psalms 17:4-6
# 🛤️ Kept From The Destroyer's Path
---
## 📜 By The Word Of Thy Lips

The word of thy lips means God's spoken instruction.

David credits scripture and God's commands for his direction.

He did not stay on the right path by accident.

God's own words showed him where not to go.

Guidance came before the danger, not after it.

📜 Word of thy lips means God's instruction
🧭 God's words gave him direction
🚫 Not something he managed alone
📖 Guidance came before the danger

## 🗡️ The Paths Of The Destroyer

The destroyer refers to violent men who prey on others.

Their way of life is called a path, a repeated direction.

David uses God's word to avoid choosing that direction himself.

Following it eventually leads to ruin.

David chose a different way entirely.

🗡️ Destroyer means violent, dangerous men
🛤️ Their path is a repeated direction
⚠️ It leads toward ruin
📖 David chose a different way

## 🚶 Hold Up My Goings In Thy Paths

"Goings" means David's steps, his daily way of life.

He asks God to hold him steady while he walks it.

This is not a one time rescue he wants.

He wants ongoing support for everyday choices.

Small daily steps matter as much as big decisions.

🚶 Goings means his daily steps
🤲 He asks for steady support
🔁 Not a one time rescue
📖 Daily steps matter as much as big ones

## 🦶 That My Footsteps Slip Not

David pictures a path where it is easy to lose footing.

Think of walking along a narrow ledge in the rain.

One careless step could send a person sliding off it.

David asks God to keep his feet steady on that ledge.

Staying faithful takes God's help, not just good intentions.

🦶 Footsteps slipping pictures losing footing
🌧️ Like walking a narrow ledge in rain
🤲 David asks God to steady him
📖 Faithfulness needs help, not just intentions

## 🙏 For Thou Wilt Hear Me, O God

David already knows God will hear him before he finishes praying.

His confidence comes from experience, not guessing.

He has called on God before and been heard.

That history now shapes how he prays.

Confidence in being heard changes the way a person prays.

🙏 David expects to be heard
📚 Confidence comes from past experience
🔁 He has called on God before
📖 Confidence changes the way he prays

## 👂 Incline Thine Ear Unto Me

"Incline" means to bend down and listen closely.

Picture a king leaning down to hear someone kneeling before him.

That posture shows the listener genuinely cares about the words.

David asks God for that same kind of close attention.

He is not asking for a distant, distracted glance.

👂 Incline means bending down to listen
👑 Like a king leaning toward a subject
❤️ The posture shows genuine care
📖 David wants close attention, not distance

# Psalms 17:7-9
# 🕊️ Sheltered Under God's Wings
---
## 💛 Shew Thy Marvellous Lovingkindness

"Shew" is the old spelling of "show."

Lovingkindness translates chesed, a Hebrew word for covenant loyalty.

It is not a passing feeling of affection.

It describes the loyal love God promised to keep.

David asks God to display that loyalty now, in his situation.

🔤 Shew is the old spelling of show
🤝 Lovingkindness translates chesed, covenant loyalty
❤️ Not just a passing feeling
📖 David asks God to show that loyalty now

## 💪 Thou That Savest By Thy Right Hand

The right hand pictures strength and decisive action.

Ancient kings used their right hand to strike or to save.

David pictures God acting powerfully on his behalf.

This is not a gentle, passive kind of help.

It is strong, active rescue.

💪 Right hand pictures strength and action
👑 Kings used it to strike or save
🛡️ God acts powerfully for David
📖 This is strong, active rescue

## 🛡️ Them Which Put Their Trust In Thee

God is described here as a saviour for those who trust him.

Trust is the condition, not earning or performing well.

David includes himself among that trusting group.

That trust is exactly what verses one through three defended.

His whole case rests on being one who truly trusts God.

🛡️ God saves those who trust him
🙅 Trust, not performance, is the condition
🙋 David includes himself in that group
📖 His whole case rests on that trust

## 👁️ Keep Me As The Apple Of The Eye

The apple of the eye is an old name for the pupil.

The pupil is one of the most protected parts of the body.

A person instinctively flinches to guard their own eyes.

David asks God to guard him with that same instinct.

He wants to be treated as precious, not overlooked.

👁️ Apple of the eye means the pupil
🛡️ One of the body's most protected parts
😳 People instinctively guard their own eyes
📖 David wants to be treated as precious

## 🕊️ Hide Me Under The Shadow Of Thy Wings

This pictures a mother bird covering her chicks with her wings.

The chicks are hidden completely from danger outside.

David asks God for that same complete covering.

The image is close and personal, not distant protection.

Being hidden under wings means being kept, not just watched.

🕊️ Pictures a mother bird covering chicks
🐣 Chicks are hidden from outside danger
🤲 David asks for the same covering
📖 Hidden means kept, not just watched

## 😈 From The Wicked That Oppress Me

"Oppress" means to crush someone with unfair pressure.

These are not vague, distant enemies for David.

They are real people actively working against him right now.

David names the danger plainly before asking to be hidden from it.

Naming the threat makes the earlier request for shelter make sense.

😈 Oppress means crushing with unfair pressure
🎯 These are real, present enemies
🗣️ David names the danger plainly
📖 Naming the threat explains his plea for shelter

## 🐺 My Deadly Enemies, Who Compass Me About

"Compass" means to surround completely, leaving no way out.

David is not facing one attacker but a hostile circle.

"Deadly" means these enemies genuinely intend to kill him.

He is naming the danger as real and immediate.

That surrounded feeling makes the plea for shelter urgent.

🐺 Compass means surrounded completely
⭕ Not one attacker but a hostile circle
☠️ Deadly means they intend to kill him
📖 Feeling surrounded makes the plea urgent

# Psalms 17:10-12
# 🦁 Surrounded By Lions
---
## 🥩 They Are Inclosed In Their Own Fat

Inclosed in their own fat is an old picture of prosperity.

These enemies have grown wealthy and comfortable over time.

That comfort has made them callous toward other people.

Prosperity here has hardened their hearts, not softened them.

David is describing arrogance built on years of ease.

🥩 Inclosed in fat pictures prosperity
💰 They grew wealthy and comfortable
💔 Comfort made them callous
📖 Arrogance built on years of ease

## 🗣️ With Their Mouth They Speak Proudly

Their pride is not hidden, it comes out in their speech.

Proud words usually follow a proud, comfortable life.

David hears their boasting directly.

Their comfort in verse ten produces the pride in this line.

Words reveal what already grew inside a person.

🗣️ Their pride shows in speech
📢 Proud words followed a proud life
👂 David hears their boasting directly
📖 Words reveal what already grew inside

## 🎯 They Have Now Compassed Us In Our Steps

This repeats the surrounding language from earlier in the psalm.

Now David says they are tracking his very steps.

They are not just nearby, they are following his movements closely.

David feels hunted rather than simply threatened.

The danger has grown more personal and more precise.

🎯 Repeats the surrounding language from before
👣 They track his very steps
🏹 David feels hunted, not just threatened
📖 The danger has grown more precise

## 👀 They Have Set Their Eyes Bowing Down To The Earth

This pictures eyes fixed low, scanning the ground like a hunter.

A predator watches its target's every movement this way.

David is describing calculated, patient watching, not a random glance.

They are studying him, waiting for the right moment.

That patience makes the threat feel even more dangerous.

👀 Eyes fixed low like a hunter
🐆 A predator watches this way
⏳ This is patient, calculated watching
📖 Patience makes the threat more dangerous

## 🦁 Like As A Lion That Is Greedy Of His Prey

David compares his enemies to a hungry, desperate lion.

Greedy of his prey means fully focused on the kill.

A hungry lion does not hesitate or hold back.

David expects the same aggression from these men.

Naming them as a lion shows how serious the threat is.

🦁 Compares enemies to a hungry lion
🎯 Greedy of prey means focused on the kill
⚡ A hungry lion does not hesitate
📖 The comparison shows how serious the threat is

## 🌑 A Young Lion Lurking In Secret Places

"Lurking" means waiting quietly, hidden, ready to strike.

A young lion is still strong enough to be dangerous.

Secret places let it attack without warning.

David is not facing an obvious threat he can see coming.

He is facing danger hidden until the last possible moment.

🌑 Lurking means waiting hidden to strike
🦁 A young lion is still dangerous
🕳️ Secret places allow a surprise attack
📖 The danger is hidden until the last moment

# Psalms 17:13-15
# ✨ Satisfied With Thy Likeness
---
## ⚔️ Arise, O LORD, Disappoint Him, Cast Him Down

"Disappoint" here does not mean modern disappointment.

It means to confront the enemy directly and stop him.

David asks God to physically block his enemy's plans.

"Arise" pictures God standing up to act, not staying seated.

This is an urgent, active request, not a patient wish.

⚔️ Disappoint means confront and stop him
🧍 Arise pictures God standing to act
🛑 David wants the enemy's plans blocked
📖 This is an urgent, active request

## 🗡️ Deliver My Soul From The Wicked, Which Is Thy Sword

Calling the wicked "thy sword" sounds surprising at first.

It does not mean God approves of what they do.

It means God can even use evil people to accomplish his purposes.

David still asks to be delivered from them personally.

God's control over evil does not remove David's danger.

🗡️ Wicked called God's sword sounds surprising
🙅 Not approval of what they do
🎯 God can use evil for his purposes
📖 David still needs deliverance from them

## ✋ From Men Which Are Thy Hand

"Thy hand" here means an instrument God is using.

This repeats the same idea as calling them a sword.

David is not claiming his enemies act outside God's control.

He is asking to be rescued from them anyway.

Trusting God's control does not mean staying passive about danger.

✋ Hand means an instrument God uses
🔁 Repeats the earlier sword picture
🙅 Not outside God's control
📖 Trust does not mean staying passive

## 🌍 Men Of The World, Which Have Their Portion In This Life

Their portion means everything they will ever receive.

For these men, that portion is limited to this life only.

They have no reward waiting for them beyond it.

David is quietly contrasting his own hope with theirs.

The next verse names exactly what David expects instead.

🌍 Portion means everything they will get
⏳ Limited to this life only
🚫 No reward waiting beyond it
📖 David's hope contrasts sharply with theirs

## 💰 Whose Belly Thou Fillest With Thy Hid Treasure

"Hid treasure" pictures wealth stored up and passed down.

These men live full, comfortable lives with plenty to spare.

They even have enough left to leave their children wealthy.

By every worldly measure, they look successful.

David admits this while still trusting God over their success.

💰 Hid treasure means stored up wealth
🍽️ They live full, comfortable lives
👶 Wealth passed down to their children
📖 David trusts God over worldly success

## 🙋 As For Me, I Will Behold Thy Face In Righteousness

"As for me" marks a sharp turn away from the wicked.

David is not chasing wealth or comfort here.

His goal is to see God's face directly.

"In righteousness" means approaching God as one made right.

Not standing there on his own merit.

That hope is far greater than any earthly portion.

🙋 As for me marks a sharp turn
🙅 Not chasing wealth or comfort
👀 His goal is to see God's face
📖 A hope greater than any earthly portion

## 😌 I Shall Be Satisfied, When I Awake, With Thy Likeness

"Awake" points beyond an ordinary morning.

Many readers connect this to waking from death itself.

David expects that awakening to bring him God's likeness.

Nothing else could satisfy him the same way.

The psalm that opened with a desperate plea ends in lasting hope.

😌 Awake points beyond an ordinary morning
⚰️ Many connect it to waking from death
😊 Seeing God's likeness satisfies him completely
📖 Desperate plea ends in lasting hope
`.trim();

export const PSALMS_SEVENTEEN_PERSONAL_SECTIONS = parsePsalmsSeventeenRawNotes(PSALMS_SEVENTEEN_RAW_NOTES);
