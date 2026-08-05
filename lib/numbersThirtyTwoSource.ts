export type NumbersThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyTwoRawNotes(rawText: string): NumbersThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 32:${startVerse}` : `Numbers 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Numbers 32 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_TWO_RAW_NOTES = `# Numbers 32:1-5
# 🐄 Reuben And Gad Eye The Land
---
## 🐄 A Very Great Multitude Of Cattle

Reuben and Gad owned far more livestock than the other tribes.

"Multitude" here means an unusually large number, not just a big herd.

Herds this size needed wide, open pasture to survive.

That single fact shapes everything the two tribes ask for next.

🐄 Multitude means a large thriving herd
📈 Reuben and Gad owned unusual wealth
🌾 Big herds needed wide grazing land
📖 Their wealth shapes the whole request

## 🗺️ The Land Of Jazer, And The Land Of Gilead

Jazer and Gilead were regions east of the Jordan River.

Israel had already captured this territory from King Sihon and King Og.

The land sat outside the borders of Canaan itself.

Wide grassy hills made it ideal for raising livestock.

🗺️ Jazer and Gilead sit east of Jordan
⚔️ Israel had already conquered this land
🚧 It lies outside Canaan's own borders
📖 Grassy hills made it ideal for herds

## 🌱 Was A Place For Cattle

This land was not chosen at random.

The soil and grass there suited grazing animals better than farmland.

Reuben and Gad noticed the fit right away.

Their eyes went straight to what their flocks needed most.

🌱 The land suited grazing, not farming
👀 Reuben and Gad noticed the fit
🐑 Their flocks needed exactly this land
➡️ Practical needs shaped their whole request

## 🙏 Bring Us Not Over Jordan

This is the real request hiding inside all that description.

Reuben and Gad want to settle here instead of crossing into Canaan.

That request sounds reasonable at first read.

It ignores the promise God already made about the land across the river.

🙏 This reveals their real request
🏞️ They want to stay east of the river
😬 The request sounds reasonable at first
📖 It ignores God's promise about Canaan

# Numbers 32:6-9
# 😠 Moses Confronts Reuben And Gad
---
## 😠 Shall Your Brethren Go To War, And Shall Ye Sit Here?

Moses does not hide his anger behind soft words.

His question is sharp and direct on purpose.

Sending some tribes to fight while others stay behind was unthinkable.

Every tribe had promised to cross the Jordan together.

😠 Moses confronts them directly
⚔️ Other tribes would fight without them
🚫 Staying behind broke the shared promise
📖 Unity mattered more than personal gain

## 💔 Wherefore Discourage Ye The Heart Of The Children Of Israel

"Discourage" means much more than disappointing someone.

It means draining a whole nation's will to keep going.

Moses fears this request could do exactly that again.

One generation already lost forty years because of discouraged hearts.

💔 Discourage means draining a nation's will
😨 Moses fears history repeating itself
📉 One request could weaken the whole camp
📖 Words and choices can drain a nation's hope

## 📜 Thus Did Your Fathers, When I Sent Them From Kadeshbarnea To See The Land

Moses points back to a specific failure, not a general warning.

Kadeshbarnea was where Israel's spies scouted Canaan generations earlier.

Numbers chapter thirteen already told that whole story in detail.

That mission ended in fear, not faith.

🕵️ Spies once scouted Canaan from there
📜 Kadeshbarnea recalls that earlier failure
😨 That mission ended in fear, not faith
📖 Numbers thirteen tells the full story

## 🍇 The Valley Of Eshcol

Eshcol was a fertile valley deep inside Canaan itself.

The spies reached it and saw grapes so large they carried them on a pole.

Seeing the good land should have built faith, not fear.

Instead the size of the challenge overwhelmed the size of the promise.

🍇 Eshcol was a fertile valley in Canaan
👀 The spies saw impressive fruit there
😨 Fear grew bigger than their faith
📖 The size of the promise still stood

# Numbers 32:10-15
# 🔥 The LORD's Anger And Forty Years
---
## 🔥 The LORD's Anger Was Kindled The Same Time, And He Sware

"Kindled" means anger that flares up suddenly, like a fire catching.

God did not simply feel frustrated in that moment.

He made a binding oath in response to Israel's fear.

An oath from God is never taken back lightly.

🔥 Kindled means anger flaring up fast
😠 God responded to Israel's fear directly
🤝 He sealed His response with an oath
📖 God's oaths are never taken back lightly

## 🙌 They Have Wholly Followed The LORD

Caleb and Joshua get named exceptions to a national judgment.

"Wholly" means without holding anything back.

Every other adult from Egypt would die in the wilderness instead.

Complete loyalty made these two men the exception to that sentence.

🙌 Caleb and Joshua are named exceptions
💯 Wholly means holding nothing back
⚰️ Everyone else from Egypt would not survive
📖 Complete loyalty set these two apart

## ⏳ He Made Them Wander In The Wilderness Forty Years

This sentence stretched one generation's punishment across a lifetime.

Forty years matched the forty days the spies spent scouting the land.

Numbers chapter fourteen already told this part of the story.

The wandering was not random.

It matched the exact shape of the sin.

⏳ Forty years matched forty days of scouting
📜 Numbers fourteen already told this story
🎯 The punishment matched the sin's shape
📖 Nothing about it was random

## 👥 Ye Are Risen Up In Your Fathers' Stead, An Increase Of Sinful Men

Moses is not accusing Reuben and Gad of the exact same sin.

He is warning that this new generation carries the same danger.

"Stead" means standing in someone else's place.

One generation's failure can repeat itself in the next if no one is careful.

👥 Stead means standing in their place
⚠️ Moses warns of a repeated pattern
🔁 One generation's sin can echo forward
📖 Careful choices break dangerous patterns

## ⚠️ He Will Yet Again Leave Them In The Wilderness

Moses names the real stakes of this moment plainly.

A bad decision now could cost the whole nation another delay.

This is not an idle threat.

It already happened once before.

Moses is trying to protect Israel from repeating its own history.

⚠️ Moses names the real stakes plainly
⏳ A bad choice could cost more delay
🔁 This already happened once before
📖 Moses is protecting Israel from repeat history

# Numbers 32:16-19
# 🐑 Their Plan To Build And Fight
---
## 🐑 We Will Build Sheepfolds Here For Our Cattle, And Cities For Our Little Ones

Reuben and Gad answer Moses with a real plan, not just a wish.

"Sheepfolds" means fenced enclosures built to protect livestock overnight.

Cities here means fortified settlements for their families to live safely.

The plan covers both their animals and their households.

🐑 Sheepfolds means fenced pens for livestock
🏘️ Cities means fortified family settlements
📋 This was a real plan, not a wish
📖 Both animals and families were covered

## ⚔️ We Ourselves Will Go Ready Armed Before The Children Of Israel

This is the offer that answers Moses' whole complaint.

They will not stay behind while others fight.

Instead they will lead the way into battle.

"Ready armed" means fully equipped and prepared to fight immediately.

⚔️ They offer to lead, not lag behind
🛡️ Ready armed means fully equipped for war
🙋 This answers Moses' whole complaint
📖 They chose to go first, not last

## 🧱 Our Little Ones Shall Dwell In The Fenced Cities Because Of The Inhabitants Of The Land

"Fenced cities" means towns protected by walls or barriers.

Families needed real protection while the men were away at war.

Nearby peoples still living in the region posed a genuine threat.

Safety for the families came before anything else in the plan.

🧱 Fenced cities means walled, protected towns
👨‍👩‍👧 Families needed protection while men fought
⚠️ Nearby peoples were a real threat
📖 Family safety came first in the plan

## 🤝 We Will Not Return Unto Our Houses, Until The Children Of Israel Have Inherited Every Man His Inheritance

This is a binding vow, not a loose promise.

They commit to finish the whole conquest before going home.

No man among them would settle back down early.

Their own comfort would wait until everyone else was provided for.

🤝 This is a binding vow
🏁 They vow to finish the whole conquest
⏳ No one settles back down early
📖 Their comfort waits for everyone else

## 🗺️ We Will Not Inherit With Them On Yonder Side Jordan

"Yonder side Jordan" means the western side, inside Canaan itself.

Reuben and Gad make their intentions completely clear here.

Their permanent home will be east of the river, not west.

This line removes any confusion about what they are actually asking for.

🗺️ Yonder side Jordan means the western side
🏞️ Their home will be east of the river
❓ This line removes all confusion
📖 Their request is now completely clear

# Numbers 32:20-24
# ⚖️ Moses Sets The Condition
---
## 📋 If Ye Will Do This Thing, If Ye Will Go Armed Before The LORD To War

Moses does not simply take their word for it.

He restates their offer as a formal condition.

Repeating it twice in one verse shows how seriously he takes it.

Their words are about to become a binding commitment.

📋 Moses restates their offer as a condition
🔁 He repeats it twice on purpose
⚖️ Words are becoming a binding commitment
📖 Moses holds them to their own offer

## 🏁 Until He Hath Driven Out His Enemies From Before Him

Moses defines exactly when their obligation ends.

It is not a short favor or a single battle.

The commitment lasts until the entire conquest of Canaan is finished.

A vague promise now becomes a measurable finish line.

🏁 Moses defines a clear finish line
⏳ The commitment covers the whole conquest
🎯 It is not one battle only
📖 Vague promises became a measurable line

## ✅ Then Afterward Ye Shall Return, And Be Guiltless Before The LORD, And Before Israel

"Guiltless" means cleared of any obligation or blame.

Keeping their word would settle the matter completely.

They would owe nothing more to God or to the nation.

A vow fully kept leaves no debt behind it.

✅ Guiltless means fully cleared of blame
🤝 Keeping the vow settles everything
🙏 They would owe God nothing more
📖 A kept vow leaves no debt

## 🔍 Be Sure Your Sin Will Find You Out

This line has outlived the rest of the chapter in popular memory.

Moses is not describing bad luck or coincidence.

A broken vow here would eventually surface and be exposed.

Consequences do not disappear just because they are delayed.

🔍 This warning outlived the rest of the chapter
🚫 Moses means consequence, not luck
⏳ A broken vow would surface eventually
📖 Delay does not erase consequence

## 🗣️ Do That Which Hath Proceeded Out Of Your Mouth

Moses points directly back to their own spoken words.

"That which hath proceeded out of your mouth" means exactly what they promised aloud.

He is not inventing new terms for them.

He is simply holding them to the offer they already made.

🗣️ Moses points to their own words
📜 He invents no new terms
🤝 He holds them to their offer
📖 Spoken promises carry real weight

# Numbers 32:25-27
# 🤝 Gad And Reuben Agree
---
## 🙇 Thy Servants Will Do As My Lord Commandeth

Gad and Reuben answer with complete submission.

Calling themselves "servants" and Moses "my lord" was a formal sign of respect.

There is no negotiation left in their response.

The condition Moses set is now fully accepted.

🙇 They answer with full submission
🗣️ Servants and my lord signal deep respect
🚫 No further negotiation follows
📖 Moses' condition is now fully accepted

## 🏘️ Our Little Ones, Our Wives, Our Flocks, And All Our Cattle, Shall Be There In The Cities Of Gilead

This restates their plan from earlier in the chapter.

Now it comes with Moses' full agreement attached to it.

Naming families, flocks, and cattle together shows how complete this move was.

Nothing about their old life stays behind, only their bodies leave for war.

🏘️ This restates their plan, now approved
👪 Families, flocks, and cattle all move together
📦 The move is complete, not partial
📖 Only their bodies leave for war

## ✅ Thy Servants Will Pass Over, Every Man Armed For War

This is their final, formal confirmation.

Every fighting man among them commits personally to the crossing.

No exceptions and no substitutes are offered here.

The agreement is now sealed on both sides.

✅ This is their final confirmation
🪖 Every fighting man commits personally
🚫 No exceptions or substitutes here
📖 The agreement is now sealed

# Numbers 32:28-32
# 📜 Moses Hands Off The Instructions
---
## 🤝 So Concerning Them Moses Commanded Eleazar The Priest, And Joshua The Son Of Nun

Moses gives these instructions to his two successors, not just to Reuben and Gad.

Eleazar and Joshua would be the ones who actually enter Canaan.

Moses already knew he would not cross the Jordan himself.

This handoff quietly prepares Israel for leadership after Moses is gone.

🤝 Moses hands this off to his successors
🚶 Eleazar and Joshua would enter Canaan
😔 Moses already knew he would not
📖 This quietly prepares Israel's next leaders

## 📋 Then Ye Shall Give Them The Land Of Gilead For A Possession

Moses passes the exact same condition down to Eleazar and Joshua.

Keeping their word earns Gad and Reuben their chosen land legally.

This was not Moses making a promise on his own authority.

He is setting the terms his successors must actually carry out.

📋 Moses passes the condition down
🏞️ Keeping their word earns them the land
⚖️ This is not Moses' personal promise
📖 His successors must carry out these terms

## ⚠️ But If They Will Not Pass Over With You Armed, They Shall Have Possessions Among You In The Land Of Canaan

Moses also plans for the possibility that they break their word.

Breaking the vow would not go unpunished or unnoticed.

Instead of their chosen land, they would settle inside Canaan with everyone else.

The reward they wanted was tied directly to keeping their promise.

⚠️ Moses plans for a broken vow too
🚫 Breaking it would not go unnoticed
🏞️ They would settle in Canaan instead
📖 The reward stayed tied to the promise

## 🗣️ As The LORD Hath Said Unto Thy Servants, So Will We Do

This time Gad and Reuben speak the vow themselves.

Earlier Moses only reported what they had promised.

Now the commitment comes directly from their own mouths.

A promise repeated by the person who made it carries more weight.

🗣️ Gad and Reuben speak this vow themselves
🔁 Earlier Moses only reported their words
💪 This time it comes straight from them
📖 A vow repeated in person carries weight

# Numbers 32:33-38
# 🏘️ Building Cities East Of The Jordan
---
## 👑 The Kingdom Of Sihon King Of The Amorites, And The Kingdom Of Og King Of Bashan

These two kingdoms were already conquered earlier in the book of Numbers.

Sihon and Og were defeated in chapter twenty one.

Moses is not handing over new territory, only settling what Israel already holds.

Naming both kings again ties this moment back to that earlier victory.

👑 Sihon and Og were already defeated
📜 Numbers twenty one told that story
🗺️ This land was already in Israel's hands
📖 Old victories now become new homes

## 👨‍👦 Unto Half The Tribe Of Manasseh The Son Of Joseph

This is the first time Manasseh appears in this land deal.

Only half of the tribe settles here, the other half later settles in Canaan.

Splitting one tribe across the Jordan River was unusual.

It shows how flexible Israel's tribal arrangements could be when land allowed it.

👨‍👦 Manasseh enters the story here first
✂️ Only half the tribe settles east
🌊 The tribe splits across the Jordan
📖 Land needs shaped tribal arrangements

## 🏗️ The Children Of Gad Built Dibon, And Ataroth, And Aroer

"Built" here mostly means rebuilt and fortified existing towns.

These cities already stood in the land Israel had just conquered.

Gad strengthened them rather than starting completely from nothing.

A city with new walls could protect a family for generations.

🏗️ Built here mostly means rebuilt
🏙️ These towns already existed before Gad arrived
🧱 Gad strengthened rather than started over
📖 New walls protected families for years to come

## 🏷️ Their Names Being Changed

Renaming a captured city was a way of claiming it.

A new name marked a fresh start under new ownership.

Some of these renamed towns are named earlier in this very verse.

Names carried real weight in the ancient world, not just labels.

🏷️ Renaming marked a change in ownership
🆕 A new name meant a fresh start
📜 Some renamed towns appear earlier in the verse
📖 Names carried real weight, not just labels

# Numbers 32:39-42
# ⚔️ Machir, Jair, And Nobah Claim Their Own Land
---
## 🏃 The Children Of Machir The Son Of Manasseh Went To Gilead, And Took It

Machir was Manasseh's son, making this land within the same larger tribe.

This conquest happened without waiting for any formal command from Moses.

Machir's family simply saw the opportunity and acted on it.

Not every acquisition in this chapter follows the same neat process.

👨‍👦 Machir was Manasseh's own son
🗺️ Gilead was taken without a formal order
🏃 Machir's family acted on its own
📖 Not every gain here followed one process

## ✅ Moses Gave Gilead Unto Machir

Moses formally confirms what Machir's family had already taken by force.

This was not Moses initiating the gift on his own.

His approval made an existing conquest official and secure.

Sometimes leadership means recognizing what has already happened correctly.

✅ Moses confirms what was already taken
🙅 He did not initiate this himself
📜 His approval made it official
📖 Good leadership can mean recognizing reality

## 🏘️ Called Them Havothjair

"Havothjair" means the towns of Jair in the original language.

Jair was another descendant of Manasseh who took small towns of his own.

Naming a whole cluster of towns after himself made his claim lasting.

A name on a map can outlast its founder.

🏘️ Havothjair means the towns of Jair
👤 Jair was another of Manasseh's descendants
🗺️ His name marked a whole cluster of towns
📖 A name can outlast its founder

## 🏙️ Called It Nobah, After His Own Name

Nobah conquered Kenath and named the whole town after himself.

This chapter closes the way it opened, with land and names bound together.

Reuben and Gad wanted grazing land for cattle at the very start.

The chapter ends with men claiming permanent land under their own names.

These names outlasted every person who fought to earn them.

🏙️ Nobah renamed Kenath after himself
🔁 The chapter ends how it began
🐄 It started with a request for grazing land
📖 Names on this land outlasted their owners
`.trim();

export const NUMBERS_THIRTY_TWO_PERSONAL_SECTIONS = parseNumbersThirtyTwoRawNotes(NUMBERS_THIRTY_TWO_RAW_NOTES);
