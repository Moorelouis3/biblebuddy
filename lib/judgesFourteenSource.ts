export type JudgesFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesFourteenRawNotes(rawText: string): JudgesFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 14:${startVerse}` : `Judges 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Judges 14 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_FOURTEEN_RAW_NOTES = `# Judges 14:1-4
# 😍 A Dangerous Choice
---
## 🗺️ Went Down To Timnath

Timnath sat in the lowlands, west of where Samson's family lived in the hill country.

"Went down" describes the change in elevation, not just travel.

The Philistines controlled that lower territory through this whole chapter.

Every step Samson takes toward Timnath is a step toward the enemy.

🗺️ Timnath sat in Philistine territory

⬇️ Went down means he left the hills

⚔️ Philistines controlled that lower land

📖 Samson walks straight toward the enemy

## 👥 A Woman Of The Daughters Of The Philistines

The Philistines were Israel's fiercest enemy during the time of the judges.

They lived along the coast in five major cities, including Gaza and Ashkelon.

Marrying outside Israel was not just a cultural preference.

God had commanded Israel not to marry into the nations around them.

That command protected Israel from being pulled into foreign gods.

⚔️ Philistines were Israel's fiercest enemy

🏙️ They ruled five coastal cities

🚫 God forbade marriage outside Israel

📖 The command protected Israel's faith

## 📢 Get Her For Me To Wife

This is a command, not a request.

In this culture, a father usually arranged his son's marriage.

Samson skips that process and simply tells his father what to do.

His tone reveals a man used to getting what he wants.

📢 Get her is a command

👨 Fathers usually arranged marriages

⏭️ Samson skips that whole process

📖 His tone shows a demanding will

## ❓ Is There Never A Woman Among The Daughters Of Thy Brethren

Samson's parents are not being close minded.

They are pointing back to God's own command against marrying outside Israel.

"Thy brethren" means the wider family of Israelite tribes, not just close relatives.

Their question is really a warning dressed up as a question.

❓ Their question hides a warning

📜 It points back to God's command

🧬 Brethren means the wider tribes of Israel

📖 A warning wrapped inside a question

## ✂️ The Uncircumcised Philistines

Circumcision was the sign of God's covenant with Israel, going back to Abraham.

Calling the Philistines uncircumcised marks them as complete outsiders to that covenant.

It is not a passing insult.

It names the exact reason this marriage worried Samson's parents so much.

✂️ Circumcision marked God's covenant people

🚫 Uncircumcised means outside that covenant

😟 It names their real fear

📖 The word carries real weight here

## ❤️ She Pleaseth Me Well

Samson answers his parents with a feeling, not a reason.

He never addresses their concern about the Philistines at all.

The same phrase appears again in verse seven about this same woman.

His attraction becomes the only argument he offers.

❤️ Samson answers with a feeling

🙉 He ignores their real concern

🔁 The phrase repeats in verse seven

📖 Attraction becomes his only reason

## 🎭 His Father And His Mother Knew Not That It Was Of The LORD

The narrator steps in here to explain something the characters cannot see.

Samson's reckless choice looks like pure stubbornness from the outside.

God is actually using it to set His larger plan in motion.

This does not excuse Samson's disregard for his parents or for God's command.

It shows God can work through a flawed choice without approving of it.

🎭 The narrator reveals a hidden purpose

👀 The choice looks like plain stubbornness

🧩 God is shaping a larger plan

📖 God works through it, not because of it

## 🎯 He Sought An Occasion Against The Philistines

"Occasion" here means an opportunity, a reason to act.

Samson was not looking to marry as much as looking for a reason to fight.

God intended to use this marriage as the spark for conflict with the Philistines.

The chapters that follow show exactly how that spark catches fire.

🎯 Occasion means an opportunity to act

⚔️ Samson was really looking for conflict

🔥 God intended it as a spark

📖 The next chapters show that spark catching
---
# Judges 14:5-9
# 🦁 The Lion And The Honey
---
## 🍇 Came To The Vineyards Of Timnath

Samson was a Nazarite from before his birth, set apart to God for life.

Numbers six lists the Nazarite rules, and one forbids going near grapevines at all.

Walking through a vineyard already puts him right at the edge of breaking his vow.

Nothing happens yet, but the danger is already present in the setting itself.

🍇 Vineyards were forbidden ground for Nazarites

📜 Numbers six lists that exact rule

⚠️ Samson is already near the edge

📖 The danger starts before anything happens

## 🦁 A Young Lion Roared Against Him

Lions still lived in the hill country of Israel during this period.

A roar signals a lion about to attack, not just a warning sound.

Samson is alone here, without his parents nearby to help him.

The moment tests the very strength God has been building in him.

🦁 Lions lived in Israel then

😱 A roar signals attack, not warning

🚶 Samson faces this completely alone

📖 The moment tests his God given strength

## 🌀 The Spirit Of The LORD Came Mightily Upon Him

This exact phrase already appeared once at the end of Judges thirteen.

It describes a sudden surge of divine strength, not a permanent feeling.

The Spirit comes and goes through Samson's story at specific moments of need.

This is the first time that power shows up in physical action.

🌀 This phrase already appeared in chapter thirteen

⚡ It means a sudden burst of strength

🔁 The Spirit comes and goes at key moments

📖 This is the first time it acts physically

## ✂️ He Rent Him As He Would Have Rent A Kid

"Rent" is an old word meaning torn apart.

A kid is a young goat, an animal easily torn apart by hand.

Samson tears apart a full grown lion the same way, with no weapon at all.

The comparison makes the feat almost impossible to picture as merely human.

✂️ Rent means torn apart

🐐 A kid is a young goat

💪 Samson had no weapon in hand

📖 The feat looks impossible for a man alone

## 💀 Turned Aside To See The Carcase Of The Lion

Carcase means the dead body of an animal.

Samson goes out of his way to revisit the very place he killed the lion.

A dead body was considered unclean under the Nazarite vow.

Returning here is already a step toward breaking that rule.

💀 Carcase means a dead body

🚶 Samson revisits the place on purpose

🚫 Dead bodies were unclean for a Nazarite

📖 He is already stepping toward his vow's edge

## 🐝 A Swarm Of Bees And Honey In The Carcase

Bees nesting inside a dried out carcase was unusual but not impossible in that climate.

Honey was a rare and prized sweet food in the ancient world.

Finding it inside a dead lion made the discovery feel almost like a small miracle.

That contrast between death and sweetness becomes the whole heart of Samson's later riddle.

🐝 Bees nested inside the carcase

🍯 Honey was rare and prized then

✨ The find felt almost miraculous

📖 Death and sweetness become his riddle later

## 🍯 He Took Thereof In His Hands, And Went On Eating

Touching a dead body made a Nazarite ceremonially unclean under the vow.

Samson eats honey straight from the corpse without any hesitation shown in the text.

This is the clearest break of his vow so far in the story.

The text records it plainly, without comment or excuse.

🚫 Touching the body broke his vow

🍯 He eats from it without pause

⚠️ This is his clearest violation yet

📖 The text simply records it, no excuse

## 🤫 Told Not Them That He Had Taken The Honey Out Of The Carcase Of The Lion

Samson hides this from his parents, just as he hid killing the lion in verse six.

The secrecy suggests he already knows this crosses a line he should not cross.

A pattern is forming where Samson keeps his choices hidden from the people who should know.

That same pattern of hidden choices will shape much of the rest of his story.

🤫 Samson hides this like he did before

😟 The secrecy suggests he knows better

🔁 A pattern of hidden choices is forming

📖 That pattern will shape his whole story
---
# Judges 14:10-14
# 🎉 The Wedding Riddle
---
## 🎉 Samson Made There A Feast, For So Used The Young Men To Do

A wedding feast like this lasted seven full days in this culture.

Young men customarily hosted a feast like this before joining their bride's family.

This was normal custom, even though the marriage itself broke God's command about outsiders.

The feast sets the stage for the riddle contest that follows.

🎉 Feasts like this lasted seven days

👨 Young grooms customarily hosted a feast

📜 It was normal despite the risky marriage

📖 It sets up the riddle contest ahead

## 👥 They Brought Thirty Companions To Be With Him

Thirty men joining the groom was a large number for a single wedding party.

Many scholars believe the Philistines assigned these men partly to watch an outsider like Samson.

Companions here functioned like groomsmen, sharing in the feast and its games.

Their presence sets up the wager that follows in the very next verse.

👥 Thirty men is a large wedding party

👀 Philistines may have watched an outsider closely

🎊 Companions functioned like groomsmen

📖 Their presence sets up the wager ahead

## 🧩 I Will Now Put Forth A Riddle Unto You

Riddle contests were a popular form of entertainment at feasts in the ancient world.

Wisdom literature across the ancient Near East often prized this kind of wordplay.

Samson turns his own secret experience into a public game.

He is confident enough to make it a real bet, not just fun.

🧩 Riddle games were common wedding entertainment

📚 Wordplay was valued across the ancient world

🎭 Samson turns his secret into a game

📖 He is confident enough to bet on it

## 🧵 Thirty Sheets And Thirty Change Of Garments

Sheets here means fine linen garments, not bedding.

A change of garments meant a full festive outfit, worth real money.

Thirty of each is an enormous prize for a wedding game.

The size of the bet shows how seriously both sides take the contest.

🧵 Sheets means fine linen garments

👘 Change of garments means festive outfits

💰 Thirty of each was a huge prize

📖 The stakes show how seriously they compete

## 🦁 Out Of The Eater Came Forth Meat, And Out Of The Strong Came Forth Sweetness

This riddle only makes sense if you already know what happened at the lion's carcase.

"Meat" here is an old word for food in general, not just animal flesh.

The eater is the lion, and the sweetness is the honey found inside it.

No one at the feast has the information needed to solve it honestly.

🦁 The eater refers to the lion

🍯 The sweetness refers to the honey

🥩 Meat is an old word for food

📖 Nobody else has the facts to solve it

## 🧠 They Could Not In Three Days Expound The Riddle

Expound means to explain or work out the answer.

Three full days pass with the thirty men completely stuck.

The riddle was never solvable through logic since it depends on a private event.

Their failure sets up why they turn to Samson's wife instead.

🧠 Expound means explain the answer

📆 Three days pass with no answer

🔒 The riddle depended on a private event

📖 Their failure leads them to his wife
---
# Judges 14:15-18
# 😢 The Riddle Is Betrayed
---
## 🗣️ Entice Thy Husband, That He May Declare Unto Us The Riddle

Entice means to persuade someone through charm or pressure, not always honestly.

The thirty men cannot beat Samson honestly, so they turn to manipulation instead.

They target his new wife because she has access no one else has.

Their plan turns the wedding itself into a weapon against Samson.

🗣️ Entice means to persuade through pressure

🧩 They cannot win the riddle honestly

🎯 They target the one person with access

📖 The wedding becomes a weapon against Samson

## 🔥 Lest We Burn Thee And Thy Father's House With Fire

This is not an idle threat in this culture.

Burning a household was a real and brutal form of collective punishment.

The men threaten to destroy her entire family, not just her alone.

Fear, not friendship, is what actually moves her to act.

🔥 Burning a house was a real threat

👪 Her whole family is threatened, not just her

😨 Fear drives her next choice

📖 This is coercion, not friendship

## 🙃 Have Ye Called Us To Take That We Have

The men twist the situation into an accusation against Samson.

They claim he invited them only to take their possessions through an unfair bet.

This flips the truth completely, since they are the ones threatening violence.

Manipulation often works by making the victim sound like the real threat.

🔄 They accuse Samson of using them

💰 They claim he wants their possessions

🙃 The accusation flips the real truth

📖 Manipulation often paints the victim as guilty

## 💔 Thou Dost But Hate Me, And Lovest Me Not

The wife accuses Samson of not truly loving her at all.

This exact same tactic appears again later with Delilah in Judges sixteen.

Both women use claims that Samson does not love them to break his guard.

The pattern reveals a real weakness in how Samson handles pressure from someone close to him.

💔 She accuses him of not loving her

🔁 Delilah uses this same tactic later

🎭 Both scenes use love as a weapon

📖 Pressure from loved ones is his weakness

## 📆 She Wept Before Him The Seven Days, While Their Feast Lasted

Seven days of constant pressure wears down even a strong resolve.

Samson had told no one, not even his own parents, this same secret.

His wife eventually receives what his own family did not.

Persistence, not fairness, is what finally breaks his silence.

📆 Seven days of pressure wore him down

🤐 He never told even his parents

👩 His wife receives what family did not

📖 Persistence broke his silence, not fairness

## 🍯 What Is Sweeter Than Honey And What Is Stronger Than A Lion

The men repeat the two key images from Samson's own riddle back to him.

Their answer sounds clever, but it is not something they solved themselves.

Samson immediately recognizes the answer could only have come from his wife.

Their victory is built entirely on betrayal, not on wisdom.

🍯 Honey and lion echo his riddle exactly

🧠 Their answer looks clever but is not

👀 Samson recognizes the leak immediately

📖 Their win rests on betrayal, not wisdom

## 🐄 If Ye Had Not Plowed With My Heifer, Ye Had Not Found Out My Riddle

A heifer is a young female cow used for plowing fields.

Samson compares his wife to this animal, used by someone else against her owner's will.

The insult is sharp and shows real anger at being betrayed by someone so close.

He names exactly how they won, even as he loses the bet.

🐄 A heifer is a young female cow

💔 Samson compares his wife to the animal

😠 The insult shows real anger

📖 He names exactly how they cheated
---
# Judges 14:19-20
# ⚔️ Samson's Anger
---
## 🏙️ The Spirit Of The LORD Came Upon Him, And He Went Down To Ashkelon

Ashkelon was one of the five major Philistine cities along the coast.

It sat a good distance from Timnath, showing how far Samson traveled in his anger.

This is the second time in the chapter the Spirit empowers a violent act.

God's purpose from verse four, stirring conflict with the Philistines, is now unfolding.

🏙️ Ashkelon was a major Philistine city

🚶 Samson traveled a long distance in anger

🔁 The Spirit's second act in this chapter

📖 God's purpose from verse four is unfolding

## 🎽 He Slew Thirty Men Of Them, And Took Their Spoil

Thirty men matches the exact number of companions who cheated him.

Spoil means the possessions taken from the men he defeated.

Samson uses their own garments to pay off the wager he lost.

He keeps his word to the riddle, but through violence instead of honesty.

🔢 Thirty matches the number who cheated him

🎽 Spoil means what he took from them

💳 He pays the bet with their garments

📖 He keeps his word through violence

## 🔥 His Anger Was Kindled, And He Went Up To His Father's House

Kindled means his anger was set alight, like a fire starting.

Samson leaves his own wedding in the middle of the celebration.

Going up to his father's house means he abandons his new wife entirely.

His temper, not just the Philistines, costs him his marriage here.

🔥 Kindled means his anger caught fire

🚪 He leaves his own wedding

🏠 He abandons his new wife

📖 His own temper costs him this marriage

## 👰 Samson's Wife Was Given To His Companion, Whom He Had Used As His Friend

In this culture, a bride's family could give her to someone else if the groom abandoned her.

The companion here is likely the very man who stood closest to Samson at the wedding.

Samson does not know this has happened yet.

This quiet detail sets up the anger and conflict that opens the very next chapter.

👰 A family could reassign an abandoned bride

🤝 The companion was likely Samson's closest friend

🙈 Samson does not know this yet

📖 This sets up the conflict in chapter fifteen
`.trim();

export const JUDGES_FOURTEEN_PERSONAL_SECTIONS = parseJudgesFourteenRawNotes(JUDGES_FOURTEEN_RAW_NOTES);
