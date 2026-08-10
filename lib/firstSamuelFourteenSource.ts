export type FirstSamuelFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelFourteenRawNotes(rawText: string): FirstSamuelFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 14:${startVerse}` : `1 Samuel 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Samuel 14 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_FOURTEEN_RAW_NOTES = `# FirstSamuel 14:1-3
# 🗡️ Jonathan's Secret Plan
---
## 🛡️ The Young Man That Bare His Armour

An armorbearer was a trusted soldier who carried a warrior's shield and weapons.

The role required real courage, since he fought beside the warrior, not behind him.

Jonathan trusted this one man enough to risk both their lives together.

🛡️ Armorbearer means the man who carried the shield

🤝 The role required deep trust

🚶 He fought beside the warrior, not behind

📖 Jonathan trusted him with both their lives

---

## 🎯 Let Us Go Over To The Philistines Garrison

A garrison was a small group of enemy soldiers stationed to hold a place.

Jonathan proposes attacking that outpost with only his armorbearer at his side.

This is bold, since Israel's whole army numbers only six hundred and still lacks real weapons.

🎯 A garrison was a stationed enemy outpost

👥 Jonathan planned to attack with one man

⚔️ Israel's army was weak and small

📖 Jonathan's plan was a genuine risk

---

## 🤐 But He Told Not His Father

Jonathan keeps this plan completely secret from Saul.

Saul had just been rebuked by Samuel for acting rashly under pressure.

Jonathan is not asking permission this time, he is simply acting on his own faith.

🤐 Jonathan kept the plan secret

👑 Saul had just been rebuked for rashness

🚫 Jonathan did not ask permission

➡️ A very different kind of risk begins

---

## 📍 Saul Tarried In The Uttermost Part Of Gibeah Under A Pomegranate Tree

"Uttermost part" means the outer edge of the town, not its center.

Migron was a threshing floor area near Gibeah, and the tree marked a known spot.

Saul sits at the edge of camp, watching and waiting rather than acting.

📍 Uttermost part means the outer edge

🌳 The tree marked a known meeting spot

👑 Saul is watching, not acting

➡️ Jonathan is already moving nearby

---

## 🔢 The People That Were With Him Were About Six Hundred Men

This number repeats the count from the very end of chapter thirteen.

Saul's tiny remaining force is still with him, still mostly without real weapons.

Repeating this number reminds the reader how desperate Israel's position still is.

🔢 Six hundred repeats the count from chapter 13

🌾 Most still carried farm tools, not weapons

😨 Israel's position remains desperate

📖 The reader is reminded before the battle begins

---

## 👴 Ahiah, The Son Of Ahitub, Ichabod's Brother, The Son Of Phinehas, The Son Of Eli

This genealogy connects Ahiah all the way back to Eli, the priest from the start of 1 Samuel.

Ichabod was born the day the ark of God was captured.

His name means no glory, or the glory has departed.

Phinehas was Ichabod's father, killed in that same battle back in chapter four.

👴 Ahiah descends from Eli the priest

💔 Ichabod's name means no glory

⚰️ Phinehas died the day the ark was lost

📖 That old disaster is present in this scene

---

## 🏛️ The LORD's Priest In Shiloh, Wearing An Ephod

Shiloh had been Israel's worship center before the ark was captured by the Philistines.

An ephod was a priestly garment used to seek God's direction, especially before a battle.

A priest with an ephod nearby means Saul has a way to ask God for guidance.

Nothing in the text says Saul actually asks for it here.

🏛️ Shiloh was Israel's old worship center

👔 An ephod helped seek God's direction

❓ Saul has access to guidance nearby

➡️ Whether he uses it is another question

---

## 🙈 The People Knew Not That Jonathan Was Gone

No one in the camp, not even Saul, realizes Jonathan has left.

This detail raises the danger, since no rescue is coming if Jonathan fails.

The reader now knows something the whole Israelite camp does not.

🙈 No one in camp knows Jonathan left

⚠️ No rescue is coming if he fails

👀 The reader knows what the camp does not

📖 Hidden tension builds from this gap

# FirstSamuel 14:4-7
# 🪨 Bozez And Seneh
---
## 🪨 There Was A Sharp Rock On The One Side, And A Sharp Rock On The Other Side

Two rock formations formed a narrow, dangerous passage between the camps.

Climbing through here meant Jonathan and his armorbearer were fully exposed to the enemy above.

The terrain itself already made this plan look reckless before a single blow was struck.

🪨 Two sharp rocks framed a narrow passage

👀 Climbers would be fully exposed

⚠️ The terrain alone was dangerous

📖 The plan looked reckless from outside

---

## ✨ The Name Of The One Was Bozez, And The Name Of The Other Seneh

Bozez likely means shining or slippery, describing the rock's surface.

Seneh likely means thorny, describing rough or thorn covered ground nearby.

Naming both rocks shows this was a real, known landmark, not a vague location.

✨ Bozez likely means shining or slippery

🌵 Seneh likely means thorny

🗺️ Both were real, known landmarks

📖 The scene is rooted in an exact place

---

## 🧭 Situate Northward Over Against Michmash, And The Other Southward Over Against Gibeah

This verse pinpoints the exact geography between the two armies.

Michmash held the Philistine camp, and Gibeah was Saul's side.

Jonathan is walking directly into the gap separating the two forces.

🧭 Michmash sat north, Gibeah sat south

🏕️ Michmash held the Philistine camp

🚶 Jonathan walked into the gap between them

📖 The geography sets the exact scene

---

## 🏷️ Let Us Go Over Unto The Garrison Of These Uncircumcised

"Uncircumcised" was a term Israelites used for people outside God's covenant, especially the Philistines.

Circumcision marked the sign of God's covenant with Abraham's descendants.

Jonathan frames this as a fight for God's people against those outside that covenant.

🏷️ Uncircumcised marked people outside the covenant

🤝 Circumcision was Abraham's covenant sign

⚔️ Jonathan frames this as a covenant fight

📖 The label carries real theological weight

---

## ❓ It May Be That The LORD Will Work For Us

Jonathan does not claim certainty, he offers a hope grounded in faith.

This shows real trust without demanding a guaranteed outcome from God first.

Jonathan is willing to act, letting God's answer come through the action itself.

❓ Jonathan does not claim certainty

🙏 His hope is grounded in real faith

🚶 He acts first, trusting God to answer

📖 Faith here means moving, not just waiting

---

## 🚫 There Is No Restraint To The LORD To Save By Many Or By Few

"Restraint" here means a limit or a hindrance.

Jonathan states plainly that God's power to save does not depend on army size.

This line is the theological center of the whole chapter, spoken before the fight even starts.

🚫 Restraint means a limit or hindrance

💪 God's power does not depend on numbers

🎯 This line centers the whole chapter

📖 Jonathan states it before the fight begins

---

## 🤝 Do All That Is In Thine Heart

The armorbearer commits fully before even hearing the details of the plan.

This kind of full trust was rare and valuable in ancient warfare.

His loyalty matches Jonathan's faith, and the two men move forward together.

🤝 The armorbearer commits before hearing details

💯 This trust was rare in warfare

❤️ His loyalty matches Jonathan's faith

📖 They move forward together as one

---

## 🔁 I Am With Thee According To Thy Heart

The armorbearer repeats the word heart back to Jonathan on purpose.

He is affirming that his own will now matches Jonathan's completely.

Two men, fully united, are about to take on an entire enemy garrison.

🔁 He repeats the word heart on purpose

🤝 His will now matches Jonathan's completely

👥 Two men stand fully united

➡️ They now move against the whole garrison

# FirstSamuel 14:8-10
# 🎯 Jonathan's Sign
---
## 👀 We Will Discover Ourselves Unto Them

"Discover ourselves" means to deliberately reveal their presence, not hide any longer.

Jonathan and his armorbearer plan to walk into full view of the enemy on purpose.

This is not a stealth attack, it is a direct test to see how the Philistines respond.

👀 Discover means to reveal on purpose

🚶 They plan to walk into full view

🧪 This was a test, not a stealth raid

📖 Their response would decide the next move

---

## ⏳ Tarry Until We Come To You

Jonathan sets up a way to read God's will through the enemy's own words.

If the Philistines say to wait, Jonathan will treat that as a sign to hold back.

He builds a real test into the plan instead of guessing blindly.

⏳ Tarry means to wait in place

🎯 Jonathan reads a sign in their words

🛑 Waiting words would mean holding back

📖 The test removes blind guessing

---

## ⬆️ Come Up Unto Us: Then We Will Go Up

If the Philistines invite them up instead, Jonathan will treat that as God's green light.

Either answer gives Jonathan real information, not just a guess about God's will.

This kind of sign making appears elsewhere in Scripture as a way to seek confirmation.

⬆️ An invitation up means go up

🚦 Jonathan treats it as God's green light

🔍 Either answer gives real information

📖 Seeking a sign appears elsewhere in Scripture

---

## 🗣️ The LORD Hath Delivered Them Into Our Hand

Jonathan speaks about the coming victory as if it has already happened.

His faith is not a wish, it is settled confidence spoken before the fight starts.

This kind of certainty is exactly what was missing from Saul back in chapter thirteen.

🗣️ Jonathan speaks of victory as settled

💪 His confidence comes before the fight

⚖️ This contrasts Saul's fear in chapter 13

📖 Faith here means confident, not just hopeful

# FirstSamuel 14:11-15
# ⚔️ The First Slaughter
---
## 😏 The Hebrews Come Forth Out Of The Holes Where They Had Hid Themselves

The Philistines mock Israel using the same caves and holes mentioned back in chapter thirteen.

They assume these two men are just more frightened soldiers crawling out of hiding.

This insult is about to backfire in a way the Philistines never expect.

😏 The Philistines mock Israel's hiding spots

🕳️ They recall the caves from chapter 13

🤔 They assume two more frightened men

➡️ This insult is about to backfire

---

## ✅ Come Up To Us, And We Will Shew You A Thing

The Philistines' own invitation matches the second sign Jonathan had asked for.

"Shew you a thing" was likely a boastful taunt, promising to humiliate them.

Without realizing it, the enemy just answered Jonathan's test with a green light.

✅ Their words match Jonathan's second sign

😏 Shew you a thing was likely a taunt

🎯 The enemy unknowingly gave the green light

📖 God used their own mockery as a sign

---

## 🔁 The LORD Hath Delivered Them Into The Hand Of Israel

Jonathan repeats this exact confidence to his armorbearer as they begin climbing.

He is not improvising bravery in the moment, he is following through on what he already believed.

Steady faith before and during the danger is what makes this moment work.

🔁 Jonathan repeats his earlier confidence

🧗 He speaks it while starting the climb

💪 His faith stayed steady, not sudden

📖 Steady faith carried the moment

---

## 🧗 Jonathan Climbed Up Upon His Hands And Upon His Feet

This detail shows how physically difficult and exposed the climb really was.

Using hands and feet means no weapon was ready in his grip during the climb.

Jonathan is completely vulnerable in this moment, trusting God with his own life.

🧗 The climb required hands and feet

🗡️ No weapon was ready during the climb

⚠️ Jonathan was completely exposed

📖 He trusted God with his own life

---

## ⚔️ They Fell Before Jonathan, And His Armourbearer Slew After Him

Jonathan strikes first, and his armorbearer follows to finish each fallen man.

This teamwork lets two men fight far above what either could do alone.

The plan Jonathan built on faith is now playing out exactly as he hoped.

⚔️ Jonathan struck first in each attack

🗡️ The armorbearer finished what he started

🤝 Teamwork multiplied what two men could do

📖 The plan played out as Jonathan hoped

---

## 📏 About Twenty Men, Within As It Were An Half Acre Of Land

An half acre described a small, tight patch of ground.

It matched about the space a pair of oxen could plow in one stretch.

Twenty Philistine soldiers fell inside that narrow, cramped space.

📏 A half acre was a small, tight area

🐂 It matched what oxen could plow at once

🔢 Twenty men fell in that narrow space

📖 Two men achieved a stunning result

---

## 🐂 A Yoke Of Oxen Might Plow

A yoke was the wooden frame joining two oxen together to pull a plow.

This everyday farming picture gives the reader a real sense of the ground's size.

The image quietly echoes chapter thirteen, where farm tools stood in for weapons.

🐂 A yoke joined two oxen together

📏 It gives a sense of the ground's size

🌾 It echoes the farm tools from chapter 13

📖 Even the measurement ties back to that theme

---

## 🏕️ There Was Trembling In The Host, In The Field, And Among All The People

"Host" means the main army camp, separate from the field where soldiers were stationed.

Fear spreads through every part of the Philistine forces at once, not only the two men attacked.

News of the strange defeat is already outrunning the actual size of the attack.

🏕️ Host means the main army camp

🌾 Fear spread through the field as well

📢 News outran the size of the attack

📖 Confusion spread faster than facts

---

## 😱 The Garrison, And The Spoilers, They Also Trembled, And The Earth Quaked

The spoilers were the same raiding parties introduced back in chapter thirteen.

Even Philistine units far from Jonathan's attack begin to panic.

Whether the earthquake was literal or describes the panic's scale, the effect on the Philistines is total confusion.

😱 Spoilers were the raiding parties from chapter 13

😨 Even distant units began to panic

🌍 The earth quaked, literally or figuratively

📖 Total confusion gripped the Philistines

# FirstSamuel 14:16-19
# 👀 Saul Sees The Panic
---
## 👀 The Watchmen Of Saul In Gibeah Looked

Watchmen were soldiers posted to observe the enemy camp from a distance.

From their position, they see chaos breaking out in the Philistine ranks without knowing the cause.

Saul's camp is watching a battle they did not start and do not yet understand.

👀 Watchmen observed the enemy from a distance

😵 They saw chaos with no known cause

❓ Saul's camp did not understand what happened

📖 They are watching, not yet acting

---

## 🫠 The Multitude Melted Away, And They Went On Beating Down One Another

"Melted away" is a vivid picture of a crowd dissolving into panic and disorder.

The Philistines are striking each other in the confusion, not just fleeing from Jonathan.

This chaos matches what Jonathan predicted, that God does not need a large army to win.

🫠 Melted away pictures a crowd in panic

⚔️ Philistines struck their own men in confusion

🎯 This matches what Jonathan predicted

📖 God needed only two faithful men

---

## 🔢 Number Now, And See Who Is Gone From Us

Saul orders a headcount to figure out who might be responsible for the chaos.

The same counting pattern from the end of chapter thirteen appears again here.

Saul is trying to make sense of a battle he never planned or ordered.

🔢 Saul orders a headcount of his men

🔁 The same pattern repeats from chapter 13

❓ Saul is trying to explain the chaos

➡️ The count is about to reveal the answer

---

## ❓ Jonathan And His Armourbearer Were Not There

The headcount reveals the missing pair, and Saul now understands who started this.

Jonathan's earlier secrecy is fully exposed the moment the numbers come back.

What began as one prince's private act of faith is now Saul's problem to manage.

❓ The headcount reveals who is missing

🔍 Jonathan's secret is now exposed

👑 His faith becomes Saul's problem to manage

📖 One man's risk now shapes the whole battle

# FirstSamuel 14:20-23
# ⚔️ Israel Joins The Battle
---
## 📦 Bring Hither The Ark Of God

The ark represented God's presence and was normally kept for worship, not carried into random battles.

Saul wants to consult God properly before deciding how to respond.

This is a notable contrast to his rushed sacrifice back in chapter thirteen.

📦 The ark represented God's presence

🙏 Saul wants to consult God properly

⚖️ This contrasts his rushed choice in chapter 13

📖 Saul is trying to do this rightly

---

## 📍 For The Ark Of God Was At That Time With The Children Of Israel

This note explains that the ark happened to be nearby, in the Israelite camp itself.

Its location matters because the ark had spent years elsewhere after the Philistines captured and returned it.

The detail grounds the scene in the ark's larger, ongoing story across 1 Samuel.

📍 The ark happened to be nearby

🔄 It had been captured and later returned

📚 This ties to the ark's larger story

📖 The detail is not just background noise

---

## ⚔️ They Came To The Battle: And Behold, Every Man's Sword Was Against His Fellow

Saul finally leads his men into the fight already breaking out among the Philistines.

The enemy soldiers are literally striking each other in the panic and confusion.

Israel is joining a battle that God had already begun to win before they arrived.

⚔️ Saul leads his men into the fight

😵 Philistines strike their own soldiers

🌀 Panic and chaos fuel the confusion

📖 God had already begun the victory

---

## 💥 A Very Great Discomfiture

"Discomfiture" means total confusion and defeat, more than a simple loss.

This same word describes complete divine intervention elsewhere in the Old Testament.

The scale of this collapse points beyond ordinary battlefield luck.

💥 Discomfiture means total confusion and defeat

📖 The same word marks divine intervention elsewhere

🌪️ The collapse was total, not partial

➡️ Something beyond luck was happening

# FirstSamuel 14:24-30
# 🍯 Saul's Rash Oath
---
## 😩 The Men Of Israel Were Distressed That Day

"Distressed" describes physical exhaustion and pressure building on the tired soldiers.

This distress comes not from the battle itself but from a decision Saul is about to make.

The victory God is giving is about to be weighed down by a human mistake.

😩 Distressed means exhausted and pressured

⚔️ The battle itself was already won

⚠️ Trouble is coming from a human decision

📖 A victory is about to be weighed down

---

## 🗣️ Saul Had Adjured The People, Cursed Be The Man That Eateth Any Food Until Evening

"Adjured" means Saul bound the people with a solemn, formal oath.

This kind of oath called down a curse on anyone who broke it.

Saul makes this promise without asking God or thinking through the cost to his exhausted army.

🗣️ Adjured means bound by a solemn oath

⚠️ Breaking it would bring a curse

🚫 Saul never consulted God about it

📖 He never weighed the cost to his men

---

## 😠 That I May Be Avenged On Mine Enemies

Saul frames the oath around his own personal desire for revenge.

The wording centers on Saul's feelings rather than on God's glory or the army's need for strength.

This small shift in focus quietly echoes the self centered impatience from chapter thirteen.

😠 Saul centers the oath on his own revenge

👑 The focus is Saul, not God's glory

🍽️ His exhausted men needed food, not delay

📖 It echoes his impatience from chapter 13

---

## 🙅 None Of The People Tasted Any Food

The army obeys completely, even while pursuing a fast moving enemy at full effort.

This total obedience contrasts with the earlier soldiers who fled and hid out of fear.

Their loyalty is about to be tested by a temptation none of them expected.

🙅 The army obeyed completely, without food

🏃 They kept fighting at full effort

⚖️ This contrasts the earlier soldiers who fled

➡️ A new test is about to appear

---

## 🍯 All They Of The Land Came To A Wood, And There Was Honey Upon The Ground

Wild honey dripping onto the ground was a real feature of forests in that region.

This detail is not exaggeration, ancient travelers described the same kind of natural honeycomb.

The starving army is now surrounded by food they are forbidden to touch.

🍯 Wild honey dripped naturally in this region

📜 Ancient travelers described the same thing

😩 Starving soldiers stood right next to food

📖 The oath now faced its hardest test

---

## 😨 No Man Put His Hand To His Mouth: For The People Feared The Oath

The soldiers hold back not because they are not hungry, but purely out of fear of the curse.

This fear driven obedience is different from obedience that flows from trust or understanding.

The scene quietly asks what kind of obedience actually honors God.

😨 Fear of the curse held them back

🍯 Hunger was not the issue at all

⚖️ Fear driven obedience differs from trust

📖 The scene questions what obedience should look like

---

## ⚔️ Jonathan Heard Not When His Father Charged The People With The Oath

Jonathan had been off fighting during the moment Saul made this vow.

He genuinely does not know the rule exists when he later breaks it.

This detail matters because it separates Jonathan's innocent mistake from deliberate defiance.

⚔️ Jonathan was fighting when the oath was made

❓ He genuinely did not know the rule

🙅 His mistake was not deliberate defiance

📖 Innocence and rebellion are not the same

---

## 🌾 He Put Forth The End Of The Rod That Was In His Hand, And Dipped It In An Honeycomb

The rod was likely a walking staff or a weapon's shaft Jonathan carried.

He eats only a small taste, dipped from the rod rather than a full handful.

This small, ordinary action becomes the spark for a major crisis in the chapter.

🌾 The rod was a staff Jonathan carried

🍯 He took only a small taste

⚡ A tiny action sparks a major crisis

📖 Small choices can carry big consequences

---

## 👀 His Eyes Were Enlightened

This phrase describes the physical relief and clarity that comes from eating after exhaustion.

Low blood sugar from fasting genuinely dulls a person's alertness and strength.

Jonathan's small taste of honey restores real energy the starving army badly needed.

👀 Enlightened describes renewed clarity and strength

🩸 Fasting genuinely dulls the body's energy

🍯 A small taste restored real strength

📖 The army badly needed this same relief

---

## 🗣️ Thy Father Straitly Charged The People With An Oath

Another soldier immediately warns Jonathan about the vow he just broke.

"Straitly" means strictly or urgently, showing how serious the command was meant to be.

Jonathan learns the truth only after the fact, in the middle of a starving, faint army.

🗣️ A soldier warns Jonathan about the oath

⚠️ Straitly means strict and urgent

😩 Jonathan learns the truth too late

📖 The whole army was already faint

---

## 🗣️ My Father Hath Troubled The Land

Jonathan openly criticizes his father's decision in front of other soldiers.

"Troubled" means Saul's oath caused real harm, not just minor inconvenience.

This is a striking moment, a son publicly naming his king's mistake during an active battle.

🗣️ Jonathan openly criticizes Saul's choice

💔 Troubled means real harm was caused

👑 A son names his king's mistake in public

📖 This tension will not end quietly

---

## 💪 How Much More, If Haply The People Had Eaten Freely

Jonathan argues the army could have fought even harder with real food in their bodies.

"Haply" means perhaps, and Jonathan is reasoning about what could have happened.

He suggests the oath actually weakened Israel's pursuit instead of strengthening their devotion.

💪 Jonathan argues food would have helped

❓ Haply means perhaps, a reasoned guess

📉 The oath likely weakened the pursuit

📖 Good intentions produced a real cost

---

## ⚔️ Had There Not Been Now A Much Greater Slaughter Among The Philistines

Jonathan claims a fuller victory was possible if the army had not been starving.

This argument directly criticizes Saul's leadership decision without softening the point.

The chapter lets Jonathan's reasoning stand without correction, letting the reader weigh it.

⚔️ Jonathan claims a fuller victory was possible

👑 He directly criticizes Saul's decision

❓ The text does not correct or confirm this

📖 The reader is left to weigh his reasoning

# FirstSamuel 14:31-35
# 🩸 Eating With The Blood
---
## 🗺️ They Smote The Philistines That Day From Michmash To Aijalon

Aijalon sat much farther west than Michmash, showing how far the pursuit actually traveled.

This chase covered real distance across rough hill country, all on empty stomachs.

The distance traveled shows just how thorough this victory became.

🗺️ Aijalon sat far west of Michmash

🏃 The pursuit covered real distance

😩 Soldiers ran this whole way while fasting

📖 The victory became thorough and complete

---

## 😩 The People Were Very Faint

This repeats the exhaustion language from earlier in the chapter, now at its peak.

The oath's cost is now fully visible in the soldiers' physical condition.

Exhaustion this severe is about to lead the army straight into a new sin.

😩 Faint means the exhaustion reached its peak

⚠️ The oath's cost is now fully visible

🍽️ Extreme hunger is about to cause trouble

➡️ A new failure is coming next

---

## 🐑 The People Flew Upon The Spoil, And Took Sheep, And Oxen, And Calves, And Slew Them On The Ground

Starving soldiers finally reach the captured animals and rush to eat.

"Flew upon" pictures a desperate, uncontrolled rush rather than an orderly meal.

Their desperation after fasting all day leads straight into breaking God's law.

🐑 Starving soldiers rushed toward the animals

💨 Flew upon pictures an uncontrolled rush

😩 Desperation followed a full day of fasting

📖 That desperation led straight into sin

---

## 🩸 They Did Eat Them With The Blood

God's law commanded that blood be drained before meat was eaten, since blood represented life itself.

Eating meat with the blood still in it broke this command directly.

Saul's oath is now producing exactly the kind of sin Saul claimed to be preventing.

🩸 Blood represented life in God's law

🚫 Draining it was a required step

😩 Desperate hunger caused them to skip it

📖 Saul's oath produced the sin it warned against

---

## 🗣️ Behold, The People Sin Against The LORD, In That They Eat With The Blood

Someone reports this violation to Saul immediately, before it spreads further.

The report shows that at least some soldiers still recognized the seriousness of the law.

Saul now has to respond to a crisis his own oath helped cause.

🗣️ Someone reports the violation to Saul

👀 Some soldiers still recognized the law's weight

👑 Saul must respond to a crisis

📖 His own oath helped cause the problem

---

## ⚖️ Ye Have Transgressed: Roll A Great Stone Unto Me This Day

"Transgressed" means the people broke God's law, a serious charge Saul states plainly.

A large stone would give a clean, raised surface for proper slaughtering and draining of blood.

Saul moves quickly to correct the problem rather than ignoring it.

⚖️ Transgressed means they broke God's law

🪨 A large stone gave a clean, raised surface

🏃 Saul moved quickly to correct it

📖 He did not ignore the violation

---

## 🏛️ Bring Me Hither Every Man His Ox, And Every Man His Sheep, And Slay Them Here

Saul organizes a proper, central place for the animals to be killed correctly.

This structure lets soldiers drain the blood properly before eating, following God's law.

Saul takes real leadership here, unlike his rushed decision back in chapter thirteen.

🏛️ Saul organizes one proper killing site

🩸 This let soldiers drain blood correctly

⚖️ Saul follows God's law this time

📖 This decision shows real leadership

---

## 🛐 Saul Built An Altar Unto The LORD: The Same Was The First Altar That He Built Unto The LORD

An altar was a raised structure used for offerings, marking a place as set apart to God.

This detail is surprising, since Saul had already reigned through more than one crisis by this point.

Building his first altar here shows Saul responding to this failure with genuine worship.

🛐 An altar marked a place of worship

⏳ This was surprisingly Saul's very first

🙏 He responds to failure with real worship

📖 A flawed king can still turn back

# FirstSamuel 14:36-42
# 🎲 Casting Lots
---
## 🌙 Let Us Go Down After The Philistines By Night, And Spoil Them Until The Morning Light

Saul wants to press the pursuit through the night to finish off the fleeing enemy.

Night fighting was risky, but a total victory this size was rare and worth pursuing.

Saul's aggression here shows real military ambition following the day's success.

🌙 Saul wants to pursue through the night

⚔️ Night fighting carried real risk

🎯 A total victory was rare and valuable

📖 Saul shows real ambition after the win

---

## 🤝 Do Whatsoever Seemeth Good Unto Thee

The people give Saul full support for his plan without objection.

This kind of unquestioning agreement will repeat later in this passage with very different stakes.

The soldiers trust Saul's judgment completely in this moment.

🤝 The people fully support Saul's plan

🔁 This same phrase repeats again soon

💯 They trust his judgment completely

➡️ The stakes will shift dramatically

---

## 🙏 Then Said The Priest, Let Us Draw Near Hither Unto God

The priest, likely Ahiah from earlier in the chapter, suggests checking with God before acting.

This mirrors Saul's own earlier instinct to bring the ark before making his move.

Saul is being reminded to seek God's confirmation before this new plan proceeds.

🙏 The priest is likely Ahiah from earlier

🔁 This mirrors Saul's earlier instinct

📦 God's confirmation is suggested first

📖 Saul is reminded to seek guidance again

---

## 🙏 Saul Asked Counsel Of God, Shall I Go Down After The Philistines

Saul does what the priest suggests and formally asks God for direction.

This is a real moment of proper leadership, seeking God before a major decision.

The reader expects a clear answer after such a strong day of victory.

🙏 Saul formally asks God for direction

⚖️ This is proper, careful leadership

🎯 A clear answer seems likely after victory

➡️ The response is about to surprise everyone

---

## 🤐 He Answered Him Not That Day

God's silence is the surprising and troubling turn in this scene.

Silence from God usually signals that something is wrong that needs addressing first.

Saul must now figure out what has broken the connection between his army and God.

🤐 God's silence surprises everyone present

⚠️ Silence usually signals an unresolved problem

❓ Saul must find what caused it

📖 Something in the camp needs correcting first

---

## 🔍 Know And See Wherein This Sin Hath Been This Day

Saul assumes correctly that someone's disobedience is blocking God's answer.

He gathers the chief leaders to investigate rather than guessing on his own.

This search is about to circle back to Jonathan's honey earlier in the chapter.

🔍 Saul assumes sin is blocking God's answer

👥 He gathers leaders to investigate together

🍯 The search circles back to Jonathan's honey

➡️ The oath is about to resurface

---

## 👑 Though It Be In Jonathan My Son, He Shall Surely Die

Saul commits, in advance, to enforce his earlier oath even against his own son.

This is the same rash pattern from chapter thirteen, a costly vow made under pressure.

Saul does not yet know that this promise is about to point directly at Jonathan.

👑 Saul commits to enforce his oath fully

⚠️ This repeats his rash pattern from chapter 13

💔 He includes his own son in the vow

➡️ The vow is about to find its target

---

## 🤐 There Was Not A Man Among All The People That Answered Him

The soldiers' total silence suggests many of them may already suspect the truth.

No one is willing to be the one to name Jonathan, the hero of the battle.

The silence itself becomes a small act of protection for Jonathan.

🤐 The soldiers stay completely silent

🤔 Many may already suspect the truth

🛡️ No one wants to name their hero

📖 Their silence quietly protects Jonathan

---

## ⚖️ Be Ye On One Side, And I And Jonathan My Son Will Be On The Other Side

Saul sets up a formal process, using lots, to narrow down the guilty party.

Casting lots was a common ancient method believed to reveal God's choice or judgment.

Saul unknowingly places himself on the same side as the very man he is hunting.

⚖️ Saul sets up a formal lot process

🎲 Lots were believed to reveal God's choice

👑 Saul groups himself with Jonathan

📖 He does not yet see the irony

---

## 🎯 Saul Said Unto The LORD God Of Israel, Give A Perfect Lot

"A perfect lot" means a clear, decisive result, not a confusing or split outcome.

Saul is asking God directly to expose the guilty party through this process.

He is unknowingly asking God to point straight at his own son.

🎯 A perfect lot means a clear result

🙏 Saul asks God to expose the guilty one

👑 He unknowingly targets his own son

📖 The prayer is about to be answered fully

---

## 🎯 Saul And Jonathan Were Taken: But The People Escaped

The lot narrows the search down to just the king and his son, clearing everyone else.

This result confirms the suspicion the silent soldiers likely already held.

The tension of the chapter now centers entirely on these two men.

🎯 The lot narrows to Saul and Jonathan

✅ Everyone else is cleared completely

🤔 This confirms what soldiers likely suspected

📖 The tension now centers on father and son

---

## 🎲 Cast Lots Between Me And Jonathan My Son: And Jonathan Was Taken

A second round of lots is cast to choose between just the two remaining men.

This final lot lands directly on Jonathan, the very man who won the battle that day.

Saul's rash oath is now about to collide with his own son's heroism.

🎲 A second lot chooses between the two

🎯 The result lands on Jonathan directly

💔 Saul's oath collides with his son's heroism

➡️ The confrontation is about to unfold

# FirstSamuel 14:43-46
# 😱 Jonathan Nearly Dies
---
## ❓ Tell Me What Thou Hast Done

Saul now directly confronts his own son with the same demand Samuel once used on him.

The chapter deliberately echoes Samuel's earlier confrontation with Saul from chapter thirteen.

Saul is unknowingly repeating the very scene where he himself was judged.

❓ Saul confronts Jonathan directly

🔁 The wording echoes Samuel's earlier question

⚖️ Saul once stood where Jonathan stands now

📖 The roles have quietly reversed

---

## 🍯 I Did But Taste A Little Honey With The End Of The Rod That Was In Mine Hand

Jonathan answers honestly and immediately, offering no excuse for what he did.

"But taste a little" emphasizes just how small this act really was.

His honesty stands in sharp contrast with Saul's earlier excuse making in chapter thirteen.

🍯 Jonathan admits it honestly and fully

🤏 The act itself was genuinely small

⚖️ This contrasts Saul's excuses in chapter 13

📖 Honesty replaces excuse making here

---

## ☠️ Lo, I Must Die

Jonathan accepts the consequence of the oath even though he never knew it existed.

He does not argue for his innocence despite having a completely valid defense.

This calm acceptance shows just how extreme and unjust Saul's vow really was.

☠️ Jonathan accepts death without argument

🤷 He does not claim his valid defense

⚠️ This shows how extreme the vow was

📖 A hero faces death for a small mistake

---

## 📜 God Do So And More Also: For Thou Shalt Surely Die, Jonathan

This exact phrase was a formal, binding oath formula used elsewhere in the Old Testament.

Saul is doubling down on his earlier vow instead of reconsidering it now that he knows the truth.

Saul chooses to honor a rash promise over honoring the son who won the battle.

📜 This phrase was a formal oath formula

🔒 Saul doubles down instead of reconsidering

💔 He chooses the vow over his own son

📖 Rash words are about to cost dearly

---

## 🗣️ Shall Jonathan Die, Who Hath Wrought This Great Salvation In Israel

The people finally speak up, something they refused to do earlier when Saul first made the vow.

Their question directly names Jonathan's role in saving the entire nation that day.

The people's courage here corrects the silence they kept back in verse thirty nine.

🗣️ The people finally speak up for Jonathan

🏆 They name his role in Israel's salvation

🔁 This corrects their earlier silence

📖 Courage arrives just in time

---

## 📜 God Forbid: As The LORD Liveth, There Shall Not One Hair Of His Head Fall To The Ground

This strong oath formula was normally reserved for the most serious promises.

The people use the same kind of formal language Saul himself used to condemn Jonathan.

They are matching Saul's own oath with an equally serious counter oath of their own.

📜 This oath formula marked serious promises

⚖️ The people match Saul's own formal language

🛡️ Their vow directly counters his

📖 One serious oath answers another

---

## 🤝 For He Hath Wrought With God This Day

The people credit Jonathan's victory as something accomplished together with God, not by Jonathan alone.

This phrase settles the theological question at the center of the whole chapter.

Jonathan's early words about God saving by many or by few are now confirmed by the whole nation.

🤝 Jonathan's victory involved God directly

🎯 This settles the chapter's central question

🔁 It confirms Jonathan's own words from earlier

📖 The nation agrees with what Jonathan believed

---

## 🛡️ So The People Rescued Jonathan, That He Died Not

The people physically intervene to stop Saul from carrying out his oath.

This is a rare moment where the nation overrules its own king for the sake of justice.

Jonathan survives not because Saul relents, but because the people refuse to let the oath stand.

🛡️ The people physically intervene for Jonathan

⚖️ The nation overrules its own king

🙅 Saul himself never relents

📖 The people, not Saul, save Jonathan's life

---

## 🛑 Saul Went Up From Following The Philistines: And The Philistines Went To Their Own Place

The pursuit ends here, without the total destruction Saul had planned back in verse thirty six.

The crisis over Jonathan likely cost Israel the chance to finish off the fleeing enemy.

Saul's earlier oath ends up costing the nation the very victory it was meant to protect.

🛑 The pursuit ends short of Saul's plan

⏳ The Jonathan crisis likely cost time

📉 A full victory slipped away

📖 The oath cost the nation its own goal

# FirstSamuel 14:47-52
# 👑 Saul's Reign Summarized
---
## 📋 So Saul Took The Kingdom Over Israel

This verse begins a summary section, stepping back from the single crisis just described.

The chapter shifts from one dramatic day to an overview of Saul's whole reign.

This kind of summary appears often in the books of Kings and Chronicles for other rulers too.

📋 This begins a summary of Saul's reign

🔍 It steps back from one single day

📚 Similar summaries appear for other kings

📖 The narrative zooms out here

---

## 🗺️ Fought Against All His Enemies On Every Side, Against Moab, And Against The Children Of Ammon, And Against Edom

Moab, Ammon, and Edom were neighboring nations descended from Lot and Esau.

They were related to Israel by blood but were often hostile toward them.

Saul faced threats from every direction throughout his reign, not just from the Philistines.

🗺️ Moab, Ammon, and Edom were neighboring nations

👪 They were related to Israel by blood

⚔️ Threats came from every direction

📖 Saul stayed active despite his failures

---

## ⚔️ And Against The Kings Of Zobah, And Against The Philistines

Zobah was a powerful Aramean kingdom to the north, a significant regional threat.

Naming the Philistines again reminds the reader they remained a constant enemy throughout Saul's reign.

This wide list of enemies shows just how much pressure surrounded Israel's young kingdom.

⚔️ Zobah was a powerful northern kingdom

🔁 The Philistines remained a constant enemy

🌍 Pressure surrounded Israel from every side

📖 The young kingdom faced constant threats

---

## ⚔️ Whithersoever He Turned Himself, He Vexed Them

"Vexed" means Saul troubled and harassed these enemies wherever he went.

This is a genuinely positive summary of Saul as a warrior king.

The text is honest enough to credit Saul's real strengths alongside his real failures.

⚔️ Vexed means Saul troubled his enemies

🏆 This is a genuinely positive summary

⚖️ The text credits real strengths too

📖 Saul was flawed, not worthless

---

## ⚔️ He Gathered An Host, And Smote The Amalekites

This line briefly previews a fuller Amalekite conflict described later, in chapter fifteen.

The Amalekites had a long standing history of hostility toward Israel going back to the exodus from Egypt.

This short mention sets up a much larger story still to come.

⚔️ This previews a fuller story in chapter 15

📜 Amalekites had opposed Israel since the exodus

🔮 A larger conflict is still coming

📖 This verse plants a seed for later

---

## 🛡️ Delivered Israel Out Of The Hands Of Them That Spoiled Them

"Them that spoiled them" refers to raiders who had been plundering Israel's land and people.

Saul's military action here genuinely protected ordinary Israelite families and their property.

Whatever his flaws as a leader, Saul did provide real, needed protection during his reign.

🛡️ Spoilers were raiders plundering Israel

🏠 Saul's actions protected ordinary families

🏆 He provided real, needed protection

📖 His reign had genuine benefits too

---

## 👨‍👦 The Sons Of Saul Were Jonathan, And Ishui, And Melchishua

This introduces Saul's other sons, who play smaller or no roles later in the story.

Ishui may be another name for the son elsewhere called Abinadab in different Old Testament lists.

Jonathan remains the most important of these sons throughout the rest of 1 Samuel.

👨‍👦 This introduces Saul's other sons

🔀 Ishui may match Abinadab in other lists

⭐ Jonathan remains the most important son

📖 The family list sets up later chapters

---

## 👧 The Name Of The Firstborn Merab, And The Name Of The Younger Michal

Merab and Michal are named here for the first time, and both later marry into the story of David.

Merab was promised to David but given to another man instead.

That broken promise is found later, in chapter eighteen.

Michal instead becomes David's actual wife, a relationship central to several later chapters.

👧 Merab and Michal are Saul's daughters

💔 Merab's marriage promise is later broken

💍 Michal later becomes David's wife

📖 Both names matter for chapters still ahead

---

## 👑 The Name Of Saul's Wife Was Ahinoam, The Daughter Of Ahimaaz

This names Saul's queen for the first time in the story.

Ahinoam was a common name in this period.

This Ahinoam is a different woman from a later one connected to David.

Naming a king's wife and her father was a standard way ancient records established royal legitimacy.

👑 Ahinoam is named as Saul's queen

🔀 A different Ahinoam appears later with David

📜 Naming a wife's father showed royal legitimacy

📖 This detail roots Saul's family in real record

---

## ⚔️ The Captain Of His Host Was Abner, The Son Of Ner, Saul's Uncle

Abner served as the commander of Saul's entire army, a position of enormous trust and power.

Being Saul's own uncle by blood made Abner both family and military leadership combined.

Abner becomes a major figure later in the story, especially after Saul's death.

⚔️ Abner commanded Saul's entire army

👪 He was also Saul's own uncle

🏛️ Family and command combined in one man

📖 Abner returns as a major figure later

---

## 👪 Kish Was The Father Of Saul, And Ner The Father Of Abner Was The Son Of Abiel

This closes the chapter with a short genealogy connecting Saul and Abner as close cousins.

Genealogies like this one helped the original audience track how power and family connected in Israel's first royal house.

Even a brief list of names carries real weight in establishing legitimate royal lineage.

👪 Kish was Saul's father

🔗 Abiel connects Saul and Abner as cousins

📜 Genealogies tracked power within royal families

📖 Even short lists carry real weight

---

## 💪 When Saul Saw Any Strong Man, Or Any Valiant Man, He Took Him Unto Him

Saul actively recruited skilled fighters into his personal service wherever he found them.

This detail sets up exactly how David will later enter Saul's court in the very next chapters.

The chapter ends by quietly preparing the reader for the story's next major figure.

💪 Saul recruited strong, skilled fighters

🎯 This sets up how David later joins him

🔮 The story is already preparing its next figure

📖 One era's ending opens the next chapter

---

## ⚔️ There Was Sore War Against The Philistines All The Days Of Saul

"Sore" here means severe or intense, not physically painful.

This confirms that the Philistines were never fully defeated, only checked, throughout Saul's whole reign.

Chapter fourteen's victory was significant, but it was one battle in a much longer, ongoing conflict.

⚔️ Sore means severe, not physically painful

🔁 The Philistines were checked, not defeated

📖 Today's victory was one of many battles

➡️ The conflict continues beyond this chapter
`.trim();

export const FIRST_SAMUEL_FOURTEEN_PERSONAL_SECTIONS = parseFirstSamuelFourteenRawNotes(FIRST_SAMUEL_FOURTEEN_RAW_NOTES);
