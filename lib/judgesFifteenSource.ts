export type JudgesFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesFifteenRawNotes(rawText: string): JudgesFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 15:${startVerse}` : `Judges 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 15 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_FIFTEEN_RAW_NOTES = `# Judges 15:1-3
# 🐐 Denied His Bride
---
## 🐐 Visited His Wife With A Kid

A "kid" here means a young goat, not a child.

Bringing a gift like this was a normal way to visit a wife living apart from her husband.

In that culture a bride often stayed at her father's house until the husband came to claim her.

Samson is trying to pick up his marriage right where it stopped in chapter fourteen.

🐐 Kid means a young goat

🎁 A gift for a marriage visit

🏠 Brides often stayed at their father's house

📖 Samson expects to resume his marriage

## 🚪 Her Father Would Not Suffer Him To Go In

"Suffer" here is an old word for allow.

The father physically blocks Samson from entering his own wife's room.

Something has changed since the wedding feast ended in anger back in chapter fourteen.

The father is about to explain exactly what.

🚪 Suffer means allow

🛑 The father blocks Samson at the door

😳 Something changed since the wedding feast

➡️ The father is about to explain why

## 🗣️ I Verily Thought Thou Hadst Utterly Hated Her

"Verily" means truly, and it signals the father is giving his honest reasoning.

Samson had stormed away from the wedding feast furious over the riddle bet in chapter fourteen.

The father read that anger as a permanent divorce, not a temporary fight.

So he gave the bride to someone else while Samson was gone.

🗣️ Verily means truly

😡 Samson left the feast in fury

💔 The father assumed the marriage was over

➡️ That assumption led to a bigger mistake

## 🤵 Given Her To Thy Companion

This "companion" is the same friend mentioned back in chapter fourteen who stood beside Samson at his wedding.

That role worked like a best man at a modern wedding.

The father hands his daughter to the best man instead of the groom.

To Samson this looks like a personal betrayal, not just a mix up.

🤵 Companion means the best man from chapter 14

💍 He now has Samson's wife

😤 Samson feels personally betrayed

📖 A wedding role turns into a rival

## 👧 Is Not Her Younger Sister Fairer Than She

The father tries to fix his mistake with a business style offer.

He offers his younger daughter as a replacement bride.

"Fairer" means more beautiful, meant as an added incentive.

Treating a daughter as a trade item shows how little say these women actually had.

💱 The father offers a trade

👧 Fairer means more beautiful

📦 The offer works like a swap

➡️ Daughters had little say in this culture

## ⚖️ Now Shall I Be More Blameless Than The Philistines

"Blameless" means without guilt or fault.

Samson is not asking a real question here.

He is announcing that whatever he does next, the Philistines started it.

He is building his own justification before he acts.

⚖️ Blameless means without guilt

❓ Not a real question

🎯 Samson blames the Philistines first

➡️ He is justifying revenge in advance

## 😐 Though I Do Them A Displeasure

"Displeasure" sounds mild, almost like a small annoyance.

The word choice badly undersells what Samson is about to do.

A wave of destruction is coming, not a minor inconvenience.

The Bible sometimes uses a quiet, small word to introduce a huge coming event.

😐 Displeasure sounds small

🔥 What follows is not small

📉 The word undersells the coming damage

📖 Small words can hide a big event

# Judges 15:4-6
# 🦊 Foxes And Firebrands
---
## 🐺 Three Hundred Foxes

The Hebrew word translated fox can also mean jackal.

Many scholars believe jackals fit this story better than foxes.

Jackals travel and can be trapped in groups, while foxes usually live alone.

Catching three hundred animals at once makes far more sense with a pack animal.

🐺 The word can mean jackal

📚 Jackals travel in groups

🦊 Foxes usually live alone

📖 The animal choice affects how the story reads

## 🔗 Turned Tail To Tail

Samson ties the animals together in pairs by their tails.

A torch goes in the knot between each pair.

Two panicked animals pulling in different directions spread the fire much further than one animal running alone.

It works like a chain reaction instead of a single spark.

🔗 Animals are tied in pairs

🔥 A torch sits between each pair

💨 Panic spreads the fire faster

➡️ One idea multiplies the damage

## 🌾 Burnt Up Both The Shocks, And Also The Standing Corn

"Corn" in the King James Bible means grain crops like wheat and barley, not corn on the cob.

"Shocks" are bundles of harvested grain stacked upright in the field to dry.

The fire destroys grain still growing and grain already cut and gathered.

This happens during the wheat harvest, so nothing is left to store for the whole year.

🌾 Corn means grain crops

📦 Shocks means stacked bundles of grain

🔥 Both growing and cut grain burn

📖 A year of food is destroyed at once

## 🍇 With The Vineyards And Olives

The fire does not stop at the grain fields.

Vineyards and olive trees take years to grow and cannot be replanted quickly.

Samson's revenge damages the Philistines' food supply for far longer than one season.

This is economic warfare, not just a personal grudge.

🍇 Vineyards take years to grow

🫒 Olive trees take even longer

📉 The damage outlasts one season

➡️ Personal revenge becomes economic warfare

## 🔍 Who Hath Done This

The Philistines start an investigation into who burned their fields.

They do not yet know Samson is behind it.

Someone in the community connects the destruction to Samson's recent wedding trouble.

Word travels fast in a small, connected community.

🔍 The Philistines investigate the fires

❓ They do not yet suspect Samson

🗣️ Someone makes the connection

➡️ News spreads through the community

## 📍 Son In Law Of The Timnite

"The Timnite" refers to Samson's father in law from chapter fourteen.

Timnath was the Philistine town where Samson chose his first wife.

This detail ties the fire directly back to the wedding feast disaster.

The Philistines now understand exactly why Samson is angry.

📍 Timnite means the father from Timnath

🔁 This connects back to chapter 14

💍 The wedding feast started this feud

📖 The Philistines finally understand the motive

## 🔥 The Philistines Came Up, And Burnt Her And Her Father With Fire

The Philistines punish the woman and her father instead of confronting Samson directly.

This is the exact threat she feared back in chapter fourteen if she failed to get Samson's riddle answer.

She tried to avoid that fate by betraying Samson to the other men, and it happens anyway.

Fire started this chapter's conflict and now fire ends two lives because of it.

🔥 They burn her and her father

😨 This matches her fear from chapter 14

💔 Betraying Samson did not save her

➡️ The fire theme returns with tragedy

# Judges 15:7-8
# ⚔️ Hip And Thigh
---
## 🔄 Though Ye Have Done This, Yet Will I Be Avenged Of You

Samson treats the killing of his wife and father in law as new provocation, not payback that settles the score.

Each side keeps answering violence with more violence.

Nobody in this cycle is trying to stop it.

Every act of revenge simply resets the count for the next one.

🔄 Each side escalates the conflict

⚔️ Samson vows more revenge

🚫 Nobody tries to stop the cycle

➡️ Revenge keeps resetting, never settling

## 🛑 After That I Will Cease

Samson promises this will be his final act of revenge.

The rest of the chapter proves that promise wrong almost immediately.

Anger rarely keeps the timeline it promises itself.

Samson's story keeps repeating this same pattern of one more fight.

🛑 Samson claims this will be the last act

❌ The chapter proves that false

😤 Anger rarely keeps its own promises

📖 The pattern repeats through his whole story

## 💥 He Smote Them Hip And Thigh With A Great Slaughter

"Hip and thigh" is an old Hebrew expression for a complete, crushing defeat.

It does not describe Samson striking only those two body parts.

The phrase means total devastation, leaving nothing standing.

One man causes damage that would normally take an army.

💥 Hip and thigh means total defeat

🚫 Not a literal description of body parts

⚔️ Complete devastation is the point

📖 One man does an army's work

## 🪨 He Went Down And Dwelt In The Top Of The Rock Etam

"Etam" was a rocky hideout in the territory of Judah.

High, rocky ground was easy to defend and hard to surround.

Samson retreats there instead of returning to his own people's town.

This choice will soon put his whole tribe in danger.

🪨 Etam was a rocky hideout

🛡️ High ground was easy to defend

🏃 Samson hides there alone

➡️ His hiding spot puts Judah at risk

# Judges 15:9-13
# 🪢 Bound With New Cords
---
## ⚔️ The Philistines Went Up, And Pitched In Judah

The Philistines do not just search for Samson quietly.

They march an army into the territory of Judah, Samson's own tribe.

This turns a personal feud into a threat against Samson's entire people.

Innocent families now have to deal with a problem they did not start.

⚔️ An army enters Judah's territory

🎯 They are hunting Samson

👥 The whole tribe is now at risk

➡️ One man's feud threatens everyone

## 📍 Spread Themselves In Lehi

"Lehi" is a place name that means jawbone in Hebrew.

The name has nothing to do with Samson yet at this point in the story.

A few verses from now, that name becomes impossible to ignore.

The Bible often plants a name early and pays it off later.

📍 Lehi means jawbone

🤔 The name seems random at first

🔮 It becomes important very soon

📖 The name is set up early

## 🎯 To Bind Samson Are We Come Up

The Philistines tell Judah exactly why they have invaded.

They want Samson handed over, tied up and helpless.

This is meant to end the conflict without a full scale war.

It puts the burden of catching Samson on his own countrymen.

🎯 The goal is to capture Samson

🪢 They want him bound, not killed yet

⚖️ This avoids a bigger war

➡️ Judah is pressured to do the capturing

## 👑 Knowest Thou Not That The Philistines Are Rulers Over Us

This question reveals the real political situation of Samson's lifetime.

Judges thirteen already explained that the Philistines had ruled over Israel for forty years.

The men of Judah are not cowards for wanting peace, they are living under occupation.

Fighting Samson's battle risks bringing down a much larger army on everyone.

👑 Philistines ruled over Israel at this time

📜 Chapter thirteen already explained this

😟 Judah fears a bigger crackdown

📖 Occupation shapes how ordinary people respond

## 🗣️ As They Did Unto Me, So Have I Done Unto Them

Samson gives Judah a short, simple explanation for everything he has done.

He frames his violence as pure retaliation, nothing more and nothing less.

He leaves out that he escalated things by burning food that would last a whole year.

A short answer can still leave out the fuller picture.

🗣️ Samson gives a simple explanation

⚖️ He frames it as fair payback

🙈 He leaves out his own escalation

➡️ Short answers can hide the full story

## 🤝 Swear Unto Me That Ye Will Not Fall Upon Me Yourselves

Samson agrees to be captured, but only under one condition.

He does not trust the Philistines, but he also does not trust his own countrymen here.

He wants Judah's word that they will not attack him themselves.

A hero who has just terrified a whole army is still afraid of his own people turning on him.

🤝 Samson demands a promise first

😕 He distrusts his own countrymen too

🛡️ He wants to avoid a Judah attack

➡️ Fear of betrayal comes from every side

## 🪢 They Bound Him With Two New Cords

"New" cords have never been stretched or weakened by earlier use.

Judah chooses new rope specifically so it will not break.

This detail sets up how impressive the coming escape actually is.

The strongest available restraint is about to fail completely.

🪢 New cords means unused, strong rope

💪 Chosen so it will not break

⚠️ This raises the stakes for later

📖 The strongest restraint still fails

# Judges 15:14-17
# 🦴 Jawbone Of An Ass
---
## 📍 When He Came Unto Lehi

Lehi is the very place name introduced back in verse nine.

Its meaning, jawbone, is about to become the whole point of the scene.

Samson walks bound into the place whose name already predicts what happens next.

The setup from earlier in the chapter finally pays off here.

📍 Lehi was introduced in verse 9

🦴 Its name means jawbone

🎯 The name now becomes literal

📖 An earlier setup pays off here

## 📣 The Philistines Shouted Against Him

The Philistines see Samson bound and helpless and celebrate too early.

Shouting here is a victory cry, not just noise.

They believe the fight is already over before it has even started.

Their confidence is about to be badly misplaced.

📣 Shouting is a victory cry

🎉 They celebrate before the fight starts

😬 Their confidence is misplaced

➡️ Overconfidence comes right before their defeat

## 🕊️ The Spirit Of The Lord Came Mightily Upon Him

Samson's strength never came from his long hair by itself.

This exact phrase already appeared in chapter fourteen, right before he killed a lion with his bare hands.

The hair was simply the visible sign of a vow explained back in chapter thirteen.

That vow made Samson a Nazarite, someone set apart for God from birth.

God's Spirit, not muscle or magic hair, is the actual source of the power.

🕊️ God's Spirit empowers Samson here

🔁 The same phrase appeared in chapter 14

✂️ His hair was just a sign

📖 God, not hair, is the real power source

## 🌾 The Cords That Were Upon His Arms Became As Flax That Was Burnt With Fire

"Flax" is a plant fiber used to make thread and rope.

Burnt flax turns brittle and crumbles apart at the lightest touch.

The strong new cords from verse thirteen snap just as easily.

What looked unbreakable to Judah is nothing at all to God's power.

🌾 Flax means a plant fiber used for rope

🔥 Burnt flax crumbles instantly

🪢 The new cords give way just as fast

➡️ Human strength is nothing next to God's

## 🦴 He Found A New Jawbone Of An Ass, And Put Forth His Hand, And Took It

"New" here means recently dead, not yet dried out or brittle.

A fresh bone still holds enough weight and strength to work as a club.

Samson grabs whatever is on the ground rather than a real weapon.

The most ordinary object becomes a weapon in the right hands.

🦴 New means recently dead, still solid

💪 A fresh bone works like a club

🎯 Samson uses whatever is available

📖 An ordinary object becomes a weapon

## 🔢 Slew A Thousand Men Therewith

The number one thousand is not a casual guess.

It marks this as one of the largest single feats of strength in the whole Bible.

No sword, no army, no plan, only one man and a bone.

The scale makes the miracle impossible to explain any other way.

🔢 One thousand men fall

🦴 Only a bone as a weapon

🚫 No sword or army involved

📖 The scale points straight to a miracle

## 🎤 With The Jawbone Of An Ass, Heaps Upon Heaps

Samson makes up a short victory chant right after the battle.

"Heaps upon heaps" pictures piles of fallen enemies stacking up.

He repeats the phrase jawbone of an ass twice for emphasis.

Turning a farm animal's bone into the hero of his own poem shows Samson's pride in the moment.

🎤 Samson chants his own victory line

📚 Heaps upon heaps means huge piles

🔁 He repeats the jawbone twice

➡️ Pride shows through his own words

## 🗺️ He Cast Away The Jawbone Out Of His Hand, And Called That Place Ramathlehi

"Ramathlehi" combines two Hebrew words into one place name.

It means the height, or hill, of the jawbone.

Naming a location after an event was common practice throughout the book of Judges.

Anyone traveling through this area afterward would hear the story just from the name.

🗺️ Ramathlehi means hill of the jawbone

📍 Named for what just happened there

📖 This naming pattern repeats in Judges

➡️ The land itself remembers the story

# Judges 15:18-20
# 💧 Water From The Jaw
---
## 🥵 He Was Sore Athirst

"Sore" here is an old word for severely or greatly, not physical soreness.

Even a Spirit empowered victory leaves Samson's body exhausted.

The greatest feat of his life is followed immediately by ordinary human weakness.

Superhuman strength did not make him immune to thirst.

🥵 Sore means severely

💪 Even Samson gets exhausted

😮‍💨 A huge victory still costs the body

➡️ Strength does not remove human limits

## 🙏 He Called On The Lord

This is the first time in the story Samson is shown praying to God directly.

Earlier chapters showed his strength and his temper far more than his faith.

Exhaustion and real danger bring out a side of Samson the reader has not fully seen yet.

Crisis often reveals what a person actually believes underneath.

🙏 Samson prays for the first time here

😤 Earlier chapters showed temper more than faith

🔍 Crisis reveals what he truly believes

📖 A hidden side of Samson appears

## 🙌 Thou Hast Given This Great Deliverance Into The Hand Of Thy Servant

Samson finally says out loud what the narrator already showed, that God won this battle.

He does not take credit for his own strength here.

"Thy servant" is a humble way of speaking to God, not a boastful title.

The same man who bragged in his victory chant now speaks with real humility.

🙌 Samson credits God with the victory

🚫 He does not claim credit himself

🧎 Thy servant is a humble title

📖 Pride and humility both appear in Samson

## 🚫 Shall I Die For Thirst, And Fall Into The Hand Of The Uncircumcised

"Uncircumcised" was a term Israelites used for people outside their covenant with God, especially the Philistines.

Samson fears an absurd ending, dying of thirst right after his greatest victory.

His body would then simply be found by the enemies he just defeated.

The fear is not about the battle anymore, it is about a pointless death afterward.

🚫 Uncircumcised marks outsiders to God's covenant

😰 Samson fears dying right after winning

💧 Thirst threatens to undo the victory

➡️ A pointless ending feels worse than defeat

## 💦 God Clave An Hollow Place That Was In The Jaw

"Clave" is an old word meaning split or opened.

Many scholars believe this hollow place may describe a spot at Lehi itself, not the jawbone Samson held.

Either way, the point stays the same, God supplies water in a place that had none.

The same jawbone that just won a battle now sits beside the very spot that saves Samson's life.

💦 Clave means split open

🤔 Scholars debate the exact source of the water

🙌 God provides water either way

📖 Rescue follows right after victory

## 🔋 His Spirit Came Again, And He Revived

Samson's strength returns the moment he drinks.

"Revived" means his life and energy came back fully.

God rescues Samson from an ordinary danger just as completely as from an entire army.

The same God who wins the big battles also handles the small, human needs.

💧 Drinking restores his strength

🔋 Revived means fully renewed

⚔️ God handled the army and the thirst

➡️ No need is too small for God

## 💦 He Called The Name Thereof Enhakkore, Which Is In Lehi Unto This Day

"Enhakkore" means the spring of him that called, naming the place after Samson's prayer.

"Unto this day" is a phrase used often in Judges to mark something still visible when the book was written.

A reader in ancient Israel could have visited this exact spring themselves.

The name keeps the story of God's rescue attached to a real, physical place.

💦 Enhakkore means spring of the one who called

📍 Unto this day means still visible then

🗺️ A real spring readers could visit

📖 A place keeps a rescue story alive

## ⚖️ He Judged Israel In The Days Of The Philistines Twenty Years

A "judge" in this book was not a courtroom official.

It meant a military and tribal leader who defended Israel during a time with no king.

Twenty years is a long career, even though Samson's story feels like one wild event after another.

This closing line is the standard way Judges marks the end of a leader's story.

⚖️ Judge means a tribal and military leader

📆 Twenty years marks his whole career

🔁 This closing line repeats throughout Judges

➡️ One title, but a very unusual leader
`.trim();

export const JUDGES_FIFTEEN_PERSONAL_SECTIONS = parseJudgesFifteenRawNotes(JUDGES_FIFTEEN_RAW_NOTES);
