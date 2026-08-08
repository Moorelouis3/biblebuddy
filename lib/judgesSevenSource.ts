export type JudgesSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesSevenRawNotes(rawText: string): JudgesSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 7:${startVerse}` : `Judges 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 7 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_SEVEN_RAW_NOTES = `# Judges 7:1-3
# ⛺ Gideon's Army Gathers
---
## 🔥 Jerubbaal, Who Is Gideon

"Jerubbaal" means "let Baal plead."

That name was given to Gideon in the previous chapter.

It was a taunt.

Gideon had just torn down his father's altar to Baal.

The Bible repeats that name here on purpose.

Gideon is still the same man who defied an idol one chapter earlier.

🔥 Jerubbaal means let Baal plead

⚡ Given after Gideon smashed Baal's altar

🔁 The name connects back to chapter six

📖 Gideon is still the idol breaker here

## 💧 Pitched Beside The Well Of Harod

"Harod" was the name of a spring near Gideon's camp.

The word comes from a Hebrew root meaning to tremble or to shake with fear.

That same root shows up again two verses later, when God tells fearful men to go home.

The camp itself sat on ground named for the very test about to happen.

Midian's army lay just to the north, past the hill of Moreh, in the valley below.

💧 Harod means trembling or fear

🔗 Same root as verse three's fearful

⛰️ Midian camped north by Moreh

📖 The ground matched the coming test

## ⚖️ Too Many For Me To Give The Midianites Into Their Hands

God tells Gideon the army is too big, not too small.

If this many men win, Israel might claim the credit for themselves.

Verse two even names the danger directly, that Israel might boast, mine own hand hath saved me.

God is guarding Israel against its own pride before the battle even starts.

The fewer the soldiers, the clearer it will be whose victory this is.

⚖️ The army is called too many

💭 Israel might boast in its own strength

🛡️ God is guarding against pride early

📖 A smaller army makes credit clear

## 🚶 Depart Early From Mount Gilead

This does not mean the men marched home to the region of Gilead across the Jordan.

That Gilead sat many miles east, far from this camp.

Gideon's men were fighting on home ground, near the hill of Moreh in the Jezreel Valley.

Many scholars believe this refers to a local hill carrying the same name, not the distant region.

The men who left were not traveling far.

They were simply walking back to nearby homes.

🗺️ Not the distant Gilead across Jordan

🏡 This hill sat near Gideon's homeland

🚶 Fearful men had a short walk home

➡️ Geography here is local, not far

## 🔢 Twenty And Two Thousand

Fear cut the army down fast.

Twenty two thousand men left, more than two out of every three soldiers.

Only ten thousand remained standing with Gideon.

Ten thousand still sounds like a large army for one battle.

God is about to say it is still too many.

📉 Fear removed most of the army

🔢 Twenty two thousand men went home

✋ Ten thousand men remained

📖 Even that number still felt large

# Judges 7:4-8
# 💧 The Water Test
---
## 🔍 I Will Try Them For Thee There

God tells Gideon the army still needs to shrink further.

"Try" here means test, not attempt.

God already knows which men should stay.

He shows Gideon through a simple habit at the water, not a battle skill.

The test is not about strength.

It reveals something else about each man.

🔍 Try here means test

💧 The test happens at the water

🎯 God already knows the outcome

➡️ Strength is not what gets tested

## 🐕 Lappeth Of The Water With His Tongue, As A Dog Lappeth

Two ways of drinking are described here.

Some men knelt all the way down, burying their face in the water to drink.

Others scooped water in a cupped hand and lapped it while staying upright.

The second group could still watch the surrounding hills while they drank.

Many scholars believe this test measured alertness, not thirst.

A watchful soldier fights very differently from a distracted one.

🐕 Lapping meant drinking while alert

🙇 Kneeling meant losing sight of danger

👀 Alertness was the real test

📖 A watchful soldier fights differently

## 🔟 Three Hundred Men

Only three hundred men passed the water test.

That is a tiny fraction of the ten thousand who were still standing.

Verse twelve later describes Midian's army as impossible to count, like grasshoppers filling a valley.

Three hundred against that many people looks like defeat before the fight begins.

That gap is exactly the point God is making.

🔟 Three hundred out of ten thousand

📉 A tiny fraction of the army

😨 The odds looked impossible

📖 The gap makes the victory God's

## 🍞 Victuals In Their Hand, And Their Trumpets

"Victuals" means food supplies for the journey.

Notice what the three hundred men carried instead of weapons.

Food and trumpets, nothing else.

No sword is mentioned for this small group.

Their equipment matches a plan built on surprise and noise, not hand to hand fighting.

🍞 Victuals means food supplies

📯 Trumpets replace ordinary weapons

🤔 No swords are mentioned yet

➡️ This army will fight differently

## 🏕️ The Host Of Midian Was Beneath Him In The Valley

The chapter repeats where the enemy sits, filling the valley below.

Three hundred men now stand between Israel and a full invading army.

Every other soldier who might have helped has already gone home.

This detail keeps the size of the risk in view before the plan even starts.

🏕️ Midian fills the valley below

🔟 Only three hundred men remain

🚪 Everyone else already went home

➡️ The risk stays in full view

# Judges 7:9-15
# 🌙 A Dream In The Enemy Camp
---
## 😨 If Thou Fear To Go Down

God does not shame Gideon for feeling afraid.

Instead He offers Gideon a way to hear the enemy's own fear firsthand.

Fear gets treated here as something to work through, not something to hide.

God keeps meeting Gideon exactly where his doubt actually is.

😨 God names Gideon's fear directly

🎁 He offers a way through it

🚫 Fear is not treated as shameful

➡️ God meets Gideon in his doubt

## 🧍 Phurah Thy Servant

Phurah was Gideon's personal servant, likely his armor bearer.

Gideon does not go alone into danger.

He brings one trusted companion instead of facing the fear by himself.

That small detail matters more than it first seems.

🧍 Phurah served as Gideon's companion

🤝 Gideon did not go alone

🛡️ Likely his armor bearer

➡️ Fear is easier with company

## 🦗 Like Grasshoppers For Multitude

This idiom describes an army too large to count.

Their camels are compared to sand along the seashore, another way of saying without number.

Both pictures describe the exact army God had already called too many for Israel to fight with pride.

The size here is not exaggeration.

It is meant to make the coming victory impossible to explain any other way.

🦗 Grasshoppers means too many to count

🏖️ Sand pictures an endless number

😳 The size looks impossible to beat

📖 Only God can explain what follows

## 🍞 A Cake Of Barley Bread Tumbled Into The Host

Barley was considered a poor man's grain, cheaper and rougher than wheat.

A soldier dreams of a plain loaf of barley bread crashing through the enemy camp.

The dream pictures something small and humble knocking over a tent with full force.

Gideon had called himself the least in his family back in chapter six.

The bread in this dream fits that same picture of small and overlooked.

🍞 Barley bread was a poor man's food

😴 A soldier dreamed this on his own

⛺ The loaf knocks over a whole tent

📖 Small and overlooked wins the day

## 🗣️ This Is Nothing Else Save The Sword Of Gideon

An enemy soldier interprets his own comrade's dream.

He names Gideon by name, without ever meeting him.

Fear of Gideon has already spread through the Midianite camp before a single arrow flies.

Gideon overhears the enemy already admitting defeat.

🗣️ An enemy soldier names Gideon himself

😰 Fear had already spread in the camp

👂 Gideon overhears this by surprise

➡️ The battle felt decided before it began

## 🙏 He Worshipped

Gideon does not celebrate or boast after hearing the dream.

His first response is worship.

He recognizes exactly where this confidence is coming from.

He returns to his men.

He repeats what he just heard, the LORD hath delivered Midian into your hand.

🙏 Gideon worships before celebrating

🎯 He knows where the plan came from

🗣️ He repeats the promise to his men

📖 Confidence here started as worship

# Judges 7:16-18
# 📯 Trumpets, Pitchers, And Lamps
---
## 🔀 Divided The Three Hundred Men Into Three Companies

Splitting into three groups let Gideon surround the enemy camp from more than one direction.

A single line of three hundred men could not encircle a whole army.

Three smaller groups spread out around the camp could.

The plan depends on position as much as noise.

🔀 Three companies split the men up

🎯 Splitting allowed the camp to be surrounded

📐 Position mattered as much as noise

➡️ One line could not have worked

## 🏺 Empty Pitchers, And Lamps Within The Pitchers

Each man carried three things, a trumpet, an empty clay jar, and a torch hidden inside that jar.

A trumpet in this era was a ram's horn, not a metal instrument.

The jar kept the torch's light hidden until the right moment.

Not one sword is listed among their equipment.

📯 A trumpet here was a ram's horn

🏺 The jar hid a torch inside

🔥 Light stayed hidden until the signal

📖 An army without a single sword

## 👀 Look On Me, And Do Likewise

Gideon does not send his men in first.

He leads the attack himself.

He asks them to copy his exact actions.

That kind of leadership asks nothing of the men that Gideon was not already doing himself.

🚶 Gideon leads instead of sending others

👀 He asks them to copy him

🤝 He shares the same risk

➡️ Leadership here means going first

## ⚔️ The Sword Of The LORD, And Of Gideon

This exact phrase already appeared once before, inside the enemy soldier's dream in verse fourteen.

Gideon's men are about to shout back the enemy camp's own fear, almost word for word.

The battle cry was not invented that night.

It was overheard, then repeated on purpose.

🔁 This phrase already appeared in verse fourteen

👂 It came from the enemy's own fear

🗣️ Israel shouts back what Midian feared

📖 A dream became a battle cry

# Judges 7:19-22
# 🌑 The Battle Cry In The Night
---
## 🌙 In The Beginning Of The Middle Watch

Ancient armies divided the night into three watches for guard duty.

The middle watch fell around midnight, the deepest and darkest stretch of the night.

Guards had only just changed shifts.

That meant the camp was at its least alert moment.

Gideon timed the attack for maximum confusion.

🌙 Nights were split into three watches

⏰ Midnight was the darkest stretch

😴 Guards had only just changed shifts

➡️ Gideon timed the attack on purpose

## 🏺 Brake The Pitchers

Three hundred jars shattering at once made a sudden, violent noise in the dark.

Hidden torches flared into view the instant the jars broke.

To a half asleep camp, that noise and light felt overwhelming.

It could easily seem like thousands of attackers, not three hundred.

🏺 Jars shattered together in the dark

🔥 Torches flared into sight at once

😱 The camp likely thought thousands attacked

➡️ Sound and light did the work

## 🧍 They Stood Every Man In His Place

Israel's three hundred men never charge into the camp.

They stay exactly where they are stationed, surrounding the outside of it.

Every bit of fighting and running happens among the Midianites themselves.

Standing still turned out to be the entire battle plan.

🧍 Israel's men never actually charge

⭕ They stayed in place around the camp

😵 Midian did the fighting themselves

➡️ Standing still won the battle

## ⚔️ The LORD Set Every Man's Sword Against His Fellow

This is the real turning point of the whole battle.

In the panic and darkness, Midianite soldiers began striking the men next to them.

Israel's three hundred never had to swing a single sword.

The Bible credits this directly to God, not to confusion or luck.

⚔️ Midian's own soldiers struck each other

🌑 Panic and darkness caused the chaos

🚫 Israel never had to fight at all

📖 God gets direct credit for this

## 🗺️ Fled To Bethshittah In Zererath, And To The Border Of Abelmeholah, Unto Tabbath

These places mark the direction Midian's army ran while fleeing.

The names trace a path away from the Jezreel Valley, out toward the Jordan River.

A reader does not need to memorize each name.

What matters is how far and how fast the retreat scattered.

🗺️ These names trace the retreat's path

🏃 Midian fled toward the Jordan

📍 The names are not the point

➡️ The retreat scattered far and fast

# Judges 7:23-25
# 🏹 Chasing Down Midian
---
## 📯 Naphtali, And Out Of Asher, And Out Of All Manasseh

These same three tribes were first called to fight back in chapter six.

Only three hundred of their men stayed for the actual water test.

Now that Midian is already fleeing, the rest of these tribes join the chase.

It is easier to show up once the danger has passed.

📯 These tribes were first called in chapter six

🔟 Only three hundred stayed for the test

🏃 The rest join once Midian flees

➡️ Danger thins a crowd fast

## 💧 Take Before Them The Waters Unto Bethbarah And Jordan

"The waters" here means the river crossings, the shallow fording points along the Jordan.

Gideon sends word to the tribe of Ephraim to seize those crossings first.

Controlling the fords meant trapping Midian's fleeing army on the near side of the river.

This turns a retreat into a dead end.

💧 Waters means the river crossings

🚧 Ephraim was sent to block them

🪤 This trapped Midian's retreat

➡️ A retreat became a dead end

## 🐦 Oreb And Zeeb

"Oreb" means raven, and "Zeeb" means wolf.

Both were princes serving under Midian's kings, not kings themselves.

Naming these two leaders shows how deep the pursuit reached, past ordinary soldiers to real commanders.

🐦 Oreb means raven

🐺 Zeeb means wolf

👑 Both were princes, not kings

➡️ The pursuit reached real commanders

## 🍇 The Winepress Of Zeeb

Both the rock where Oreb died and the winepress where Zeeb died were later named after them.

A winepress was normally used for stomping grapes into juice, not for violence.

That ordinary place became forever tied to this one event.

The same thing happened earlier with the well of Harod.

A place got remembered by what happened there.

🪨 The rock later carried Oreb's name

🍇 A winepress usually crushed grapes

📍 The place was renamed after Zeeb

📖 Events here reshaped what places meant
`.trim();

export const JUDGES_SEVEN_PERSONAL_SECTIONS = parseJudgesSevenRawNotes(JUDGES_SEVEN_RAW_NOTES);
