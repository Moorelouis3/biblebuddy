export type PsalmsOneHundredTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwoRawNotes(rawText: string): PsalmsOneHundredTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+102:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 102 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+102:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+102:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 102 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 102,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 102:${startVerse}` : `Psalms 102:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 102 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWO_RAW_NOTES = `# Psalms 102:1-5
# 😢 A Prayer From The Ashes
---
## 👂 Hear My Prayer O LORD

"Hear" means more than simply catching the words.

It means pay close attention and then act.

This psalm opens as a prayer of someone in deep pain.

The Hebrew poetry doubles the request for emphasis.

"Let my cry come unto thee" repeats the same plea a second way.

Ancient prayers often used this doubling to add weight to a request.

👂 Hear means listen and then act

🔁 The line repeats the same plea twice

📯 Doubling adds weight in Hebrew poetry

📖 A repeated plea is never wasted

## 🙈 Hide Not Thy Face From Me

"Hide thy face" is a Hebrew idiom, not a literal image.

It describes God withdrawing his attention and favor from someone.

A face turned away in that culture meant rejection and distance.

David is not afraid God will vanish physically.

He is afraid God will stop paying attention to him.

This idiom appears often in the Psalms during times of suffering.

🙈 Hide thy face means withdrawn favor

👤 A turned face signals rejection

😟 David fears being ignored, not abandoned

📖 This idiom repeats often in the Psalms

## 👂 Incline Thine Ear And Answer Me Speedily

"Incline thine ear" pictures God bending down to listen closely.

It is the posture of someone leaning in during a personal conversation.

"Speedily" means without delay, not simply eventually.

David is not asking for a slow, general kind of care.

He wants an answer now, in the middle of his trouble.

Urgent prayer is not a lack of faith.

It is honest desperation brought straight to God.

👂 Incline thine ear means leaning close

⏱️ Speedily means without delay

🆘 David wants help now, not eventually

📖 Honest urgency is not a lack of faith

## 💨 My Days Are Consumed Like Smoke

Smoke rises fast and then disappears completely.

David compares his remaining days to that same quick vanishing.

He does not feel like his life is simply passing.

He feels like it is being burned away.

Grief can make time itself feel like it is dissolving.

💨 Smoke rises and then vanishes fast

⌛ David feels his days disappearing

🔥 His life feels burned away, not passing

📖 Grief can make time feel dissolved

## 🔥 My Bones Are Burned As An Hearth

A "hearth" was the fireplace at the center of an ancient home.

David says his bones feel like they are burning from the inside.

Bones were seen in this culture as the core of a person's strength.

If even the bones feel scorched, nothing feels solid anymore.

This is the language of a body wrecked by grief and stress.

🏠 Hearth means the fireplace of a home

🔥 David feels his bones burning inside

💪 Bones represented a person's inner strength

📖 Grief can wreck the body too

## 🥀 My Heart Is Smitten And Withered Like Grass

"Smitten" means struck down hard, not lightly bruised.

David says his heart has taken a heavy blow.

"Withered like grass" pictures grass that dries up fast under a hot sun.

Grass looks alive one day and brittle the next.

David feels that same fast collapse happening inside himself.

💥 Smitten means struck down hard

🥀 Withered like grass means dried up fast

☀️ Grass fades quickly under heat

📖 David feels himself collapsing just as fast

## 🍞 I Forget To Eat My Bread

Bread was the basic, daily food in this culture.

Forgetting to eat it was not normal behavior for anyone.

David is describing grief so heavy it kills his appetite completely.

He is not skipping a meal on purpose.

His body has simply stopped asking for food.

Deep sorrow can shut down even the most basic needs.

🍞 Bread was the daily basic food

🚫 David forgets to eat, not on purpose

😔 Grief has killed his appetite

📖 Sorrow can shut down basic needs

## 🦴 My Bones Cleave To My Skin

"Cleave" means to stick tightly together.

David pictures his bones pressing right up against his skin.

That image describes a body that has become dangerously thin.

Constant groaning and grief had worn away his flesh.

This is not poetic exaggeration alone.

Grief this deep really can waste away a person's body.

🦴 Cleave means stuck tightly together

📉 His bones show through thin skin

😢 Groaning wore away his flesh

📖 Deep grief can waste the body too

# Psalms 102:6-11
# 🦉 Alone And Wasting Away
---
## 🐦 I Am Like A Pelican Of The Wilderness

The pelican in this verse pictures a large bird living alone in an empty, dry place.

Ancient readers pictured this bird as gaunt and mournful looking.

David is not describing a pretty picture.

He is describing a creature that looks half starved and utterly alone.

That is exactly how he feels inside.

🐦 The pelican lives alone in empty places

😥 Ancient readers pictured it as gaunt

🏜️ It matches David's sense of isolation

📖 He feels half starved and alone inside

## 🦉 I Am Like An Owl Of The Desert

Owls were night creatures, active while everyone else slept.

They were often linked in this culture with ruins and abandoned places.

David compares himself to a bird that lives apart from normal life.

He feels cut off from the ordinary rhythm everyone else enjoys.

Pairing the pelican and the owl doubles the picture of isolation.

Hebrew poetry often repeats an image twice to make it land harder.

🦉 Owls were creatures of the night

🏚️ Linked with ruins and abandoned places

🌙 David feels cut off from normal life

📖 Two images double the weight of the point

## 🐦 A Sparrow Alone Upon The House Top

Sparrows in this region normally traveled in noisy flocks.

A single sparrow sitting alone on a roof was an unusual sight.

David pictures himself as that lone bird, wide awake at night.

"I watch" means he cannot sleep, kept up by his own grief.

Loneliness often gets louder in the middle of a sleepless night.

🐦 Sparrows normally travel in flocks

🏠 One alone on a roof stands out

😳 David cannot sleep through his grief

📖 Loneliness grows louder at night

## 🗡️ They That Are Mad Against Me Are Sworn Against Me

"Sworn against me" describes enemies who made a formal pledge to harm David.

This is not random mockery from strangers.

It describes people who organized themselves against him on purpose.

David faces both personal grief and active human hostility at the same time.

Suffering rarely arrives from only one direction.

🗡️ Sworn against means an organized pledge

🎯 These enemies act on purpose

💔 Grief and hostility hit him together

📖 Suffering rarely comes from one direction alone

## 🍂 I Have Eaten Ashes Like Bread

Sitting in ashes was a common mourning practice in this culture.

David describes ashes mixing into his food, not just sitting nearby in a bowl.

His grief has invaded even his most basic meals.

Nothing in his daily life is untouched by his sorrow.

🍂 Sitting in ashes showed deep mourning

🍽️ Ashes now mix into David's food

😞 Grief invades his most basic routine

📖 Sorrow can touch every part of daily life

## 💧 Mingled My Drink With Weeping

"Mingled" means mixed together into one thing.

David's tears fall into his own cup as he drinks.

This is not a single dramatic moment of crying.

It describes weeping so constant that it becomes part of daily life.

💧 Mingled means mixed together

😭 His tears fall into his own cup

🔁 This crying is constant, not a moment

📖 Grief becomes part of his daily routine

## ⚡ Thine Indignation And Thy Wrath

"Indignation" and "wrath" both describe God's anger toward sin.

David reads his suffering as coming from God's own hand.

This does not mean every hardship is direct punishment.

For David, this specific suffering felt tied to God's discipline.

Ancient readers often searched for meaning inside their pain instead of ignoring it.

⚡ Indignation and wrath both mean God's anger

🤔 David reads this pain as discipline

🔍 He searches for meaning in his suffering

📖 Not all suffering is punishment, but some teaches

## 🎢 Thou Hast Lifted Me Up And Cast Down

This phrase pictures a complete reversal, not a small setback.

David describes being raised up high and then dropped hard.

It is the language of someone whose whole situation flipped suddenly.

He is not exaggerating for effect.

He is naming how sudden and total his fall really felt.

🎢 Lifted up and cast down means total reversal

📈 He once stood high

📉 Then he fell hard and fast

📖 His fall felt sudden, not gradual

## 🌇 My Days Are Like A Shadow That Declineth

An evening shadow grows long and then disappears entirely as the sun sets.

David compares his life to that fading shadow.

It is not simply getting shorter.

It is heading toward vanishing completely.

Paired with "withered like grass," this doubles the picture of a fast ending life.

🌇 A shadow lengthens, then vanishes at sunset

⏳ David feels his life heading the same way

🥀 Paired again with the image of withered grass

📖 Both images picture a fast ending life

# Psalms 102:12-17
# 🏛️ God Will Rebuild Zion
---
## ♾️ Thou Shalt Endure For Ever

The psalm suddenly turns here, from David's pain to God's nature.

Everything just described about David was fading, temporary, and fragile.

God is described as the exact opposite of all of that.

"Endure for ever" means God's existence has no expiration point.

"Thy remembrance unto all generations" means people will keep knowing who God is, long after David is gone.

🔀 The psalm turns from pain to God's nature

🥀 David is fading and fragile

♾️ God endures without end

📖 God's name outlasts every generation

## 🏛️ Thou Shalt Arise And Have Mercy Upon Zion

"Arise" is not about God standing up physically.

It is an idiom meaning God will finally step into action.

"Zion" refers to Jerusalem, especially the city as God's chosen dwelling place.

David expects God's care for his people to eventually turn visible again.

This hope comes right after some of the darkest lines in the whole psalm.

🧍 Arise means God steps into action

🏛️ Zion refers to Jerusalem

🙏 David expects visible mercy, not just words

📖 Hope follows the psalm's darkest lines

## ⏰ The Set Time Is Come

A "set time" is an appointed moment, decided in advance.

This is not a vague hope that things might get better someday.

David believes God has already planned exactly when restoration will happen.

Waiting on God is not the same as being forgotten by him.

⏰ Set time means a planned, appointed moment

📅 Restoration was already planned in advance

🕰️ Waiting does not mean being forgotten

📖 God works on a set schedule, not chance

## 🧱 Thy Servants Take Pleasure In Her Stones

"Her stones" likely refers to the broken rubble of Jerusalem's walls and buildings.

Normally, no one takes pleasure in a pile of ruined stones.

David's people loved the city so deeply that even its wreckage felt precious to them.

That kind of love does not wait for things to look impressive first.

🧱 Her stones means Jerusalem's broken rubble

💔 Ruins are usually nothing to love

❤️ The people loved the city even in ruins

📖 Real love does not wait to look good

## 🌍 The Heathen Shall Fear The Name Of The LORD

"Heathen" here simply means the surrounding nations who did not worship the God of Israel.

David expects God's future actions to be so obvious that even outsiders will notice.

"Fear the name" means recognizing God's power, not literal terror.

God's reputation was never meant to stay inside one nation.

🌍 Heathen means the surrounding nations

👀 God's actions will be too obvious to miss

🙇 Fear the name means recognizing his power

📖 God's reputation was never meant to stay small

## 👑 All The Kings Of The Earth Thy Glory

This line pairs with the nations named in the line right before it.

Now even kings, the most powerful people of that world, are included.

"Thy glory" means the visible weight of God's greatness on display.

If even kings take notice, no one gets to stay unaware.

👑 Even kings are included here

✨ Thy glory means visible greatness on display

🌐 The point covers every level of power

📖 No one is meant to stay unaware

## 🏗️ When The LORD Shall Build Up Zion

"Build up" pictures actual construction, not just a feeling of comfort.

David expects real, visible restoration, not simply an inward sense of peace.

Broken walls will be rebuilt, and the city will function again.

Faith here is not detached from the physical world.

It expects God to act inside real history.

🏗️ Build up means real construction

🧱 Restoration will be visible, not just felt

🌆 Faith here expects real world change

📖 God acts inside real history, not just feelings

## 🙏 He Will Regard The Prayer Of The Destitute

"Destitute" describes people who have absolutely nothing left.

This word ties directly back to David's own condition earlier in the psalm.

God is not only listening to kings and powerful nations.

He also hears the person who has lost everything.

David's own suffering becomes proof that God actually listens to people like him.

🙏 Destitute means having nothing left

🔗 This ties back to David's own condition

👂 God hears the powerless, not just kings

📖 David's pain becomes proof God really listens

# Psalms 102:18-22
# 📜 A Psalm For Generations Not Yet Born
---
## 📜 This Shall Be Written For The Generation To Come

David knows this psalm will outlive him.

He is not just processing his own pain privately.

He is deliberately leaving a written record for people not even born yet.

That includes anyone reading this psalm today, generations later.

This line is the reason this exact prayer still exists at all.

📜 David writes for future generations

👶 That includes people not yet born

📖 This is why the psalm still exists today

➡️ Personal pain became a permanent record

## 🏔️ From The Height Of His Sanctuary

The "sanctuary" refers to God's dwelling place, pictured here as heaven itself.

"Height" emphasizes that God sees everything from far above.

The next phrase clarifies this further, saying God looked down from heaven at the earth.

David wants the reader to know that nothing happening below goes unseen.

🏔️ Sanctuary here pictures God's heavenly home

👁️ Height means seeing from far above

🌍 Nothing on earth goes unseen

📖 God's distance does not mean he is unaware

## ⛓️ To Hear The Groaning Of The Prisoner

"The prisoner" likely points to people held captive, possibly during Israel's exile.

Prisoners in the ancient world had almost no power to change their own situation.

David insists that God actually listens even to people trapped and powerless.

Groaning here means an inarticulate cry, not even formed into full words.

God hears pain before it even becomes a clear sentence.

⛓️ The prisoner may picture exiles in captivity

🔒 Prisoners had almost no power of their own

👂 God hears even wordless groaning

📖 God hears pain before it forms into words

## 🗝️ To Loose Those That Are Appointed To Death

"Loose" means to set free or release from bondage.

"Appointed to death" describes people already marked out for execution or ruin.

This is not a small rescue from minor trouble.

David pictures God reaching into the worst possible situation and reversing it.

🗝️ Loose means set free from bondage

⚰️ Appointed to death means already marked for ruin

🔄 God reverses even the worst situations

📖 No situation is too far gone for God

## 📯 To Declare The Name Of The LORD In Zion

God's rescue was never meant to be a private, silent event.

"Declare the name" means announcing God's character out loud, publicly.

Zion becomes the stage where God's reputation gets made known.

The point of restoration was worship, not comfort alone.

📯 Declare the name means announcing it publicly

🏛️ Zion becomes the stage for this

🙌 The goal was worship, not comfort alone

📖 God's rescue was never meant to stay private

## 🌐 The People Gathered Together And The Kingdoms

This pictures a massive gathering, not just Israel alone.

"The kingdoms" widens the scene to include the surrounding nations.

Their shared purpose is described plainly in the next words, serving the LORD.

Even at this early point in Scripture, the vision already includes the whole world.

🌐 The kingdoms means surrounding nations included

🤝 This is a shared, massive gathering

🙇 Their purpose is serving the LORD

📖 The vision already reaches the whole world

# Psalms 102:23-28
# ♾️ The One Who Never Changes
---
## 🚶 He Weakened My Strength In The Way

"In the way" describes the ongoing journey of David's life, not one single event.

David returns here to his own suffering after praising God's future plans.

His strength did not fail all at once.

It wore down gradually over the course of his life.

Real faith can hold both hope for the future and honest present pain together.

🚶 In the way means the journey of life

📉 His strength wore down over time

🔁 The psalm returns to his own pain

📖 Hope and honest pain can exist together

## 🙏 Take Me Not Away In The Midst Of My Days

"The midst of my days" means the middle of a normal lifespan, not old age.

David is pleading for more time, not resigned or ready to go.

He feels his life being cut short before its natural end.

This is an honest, unfiltered request, not a peaceful goodbye.

🙏 Midst of my days means the middle years

⏳ David is not ready to go

✋ He asks God to stop this early ending

📖 Honest prayer does not have to sound peaceful

## ♾️ Thy Years Are Throughout All Generations

David immediately contrasts his own short life with God's endless years.

This line answers his own plea before God even responds.

Even if David's days end, God's story never does.

That contrast becomes the source of comfort inside the fear.

♾️ God's years stretch through every generation

⚖️ David's short life sits beside that truth

🕊️ God's story continues even if David's ends

📖 God's permanence comforts David's fear

## 🌍 Of Old Hast Thou Laid The Foundation Of The Earth

"Of old" means far back at the very beginning of everything.

"Laid the foundation" pictures the earth as something carefully built, not accidental.

God is not just older than David.

He existed before the earth itself had a starting point.

🌍 Of old means the very beginning

🏗️ Laid the foundation means carefully built

⏮️ God predates the earth's own beginning

📖 Nothing existed before God did

## 🍂 They Shall Perish But Thou Shalt Endure

"They" refers back to the earth and the heavens just mentioned.

Even the sky and the ground will eventually come to an end.

God stands completely outside that pattern of decay.

Everything physical has an expiration point except God himself.

🍂 They means the earth and heavens

⌛ Even the sky will eventually end

♾️ God stands outside that decay

📖 Everything physical fades except God

## 👘 As A Vesture Shalt Thou Change Them

A "vesture" is simply an old word for a garment or piece of clothing.

David pictures God folding up the universe the way a person changes clothes.

Clothing gets worn out and eventually replaced without much thought.

To God, even the entire created universe is that easy to set aside and renew.

👘 Vesture means an old word for clothing

🔄 God changes creation the way people change clothes

🪡 Clothing wears out and gets replaced

📖 Even the universe is easy to renew

## 🔒 Thou Art The Same And Thy Years Shall Have No End

Everything else in this psalm changes, fades, or wears out.

God alone stays exactly the same, forever.

This exact line gets quoted centuries later in the New Testament.

Hebrews chapter one applies it directly to Jesus.

That connection identifies Jesus as sharing in God's own eternal, unchanging nature.

🔒 Thou art the same means unchanging forever

📖 Hebrews chapter one quotes this exact line

✝️ It applies this eternal nature to Jesus

➡️ Jesus shares in God's unchanging nature

## 🌱 Their Seed Shall Be Established Before Thee

"Seed" means descendants, the children and grandchildren still to come.

"Established" means made secure and lasting, not fragile or temporary.

The psalm ends by widening from David's own short life to a much longer future.

His days may be numbered, but his family's story continues on securely before God.

🌱 Seed means descendants still to come

🏛️ Established means made secure and lasting

🔭 The psalm widens beyond David's own lifetime

📖 A short life joins a lasting story
`.trim();

export const PSALMS_ONE_HUNDRED_TWO_PERSONAL_SECTIONS = parsePsalmsOneHundredTwoRawNotes(PSALMS_ONE_HUNDRED_TWO_RAW_NOTES);
