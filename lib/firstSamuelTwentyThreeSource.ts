export type FirstSamuelTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyThreeRawNotes(rawText: string): FirstSamuelTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 23:${startVerse}` : `1 Samuel 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 23 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_THREE_RAW_NOTES = `# FirstSamuel 23:1-5
# 🌾 David Saves Keilah From The Philistines
---
## 🏘️ Fight Against Keilah

Keilah was a walled town inside the tribe of Judah.

It sat close to Philistine territory, near the edge of the hill country.

A location like that made it an easy, repeated target for raiders.

David is a fugitive from his own king, yet Keilah's danger reaches him anyway.

He still wears the label of an outlaw.

He is about to defend a city anyway.

🏘️ Keilah was a walled town in Judah

🌾 It sat near Philistine territory

🎯 Its location made it an easy target

📖 David defends it while branded an outlaw

---

## 🌾 Rob The Threshingfloors

A threshingfloor was a flat patch of ground used to separate grain from stalks.

Farmers piled that year's whole harvest there right after cutting it.

Raiding the threshingfloors meant stealing an entire town's food supply at once.

This was not a small theft.

It threatened Keilah with hunger through the whole coming year.

🌾 A threshingfloor is where grain was separated

🌽 The whole harvest was piled there

😟 Losing it threatened the town with hunger

➡️ This was a strike at survival itself

---

## 🙏 David Enquired Of The LORD

This does not mean David heard a voice out of the open sky.

David asked God through a priest using the ephod, explained a few verses later.

Abiathar had already reached him by this point, ephod in hand.

Even hunted and hiding, David's first move is to ask before he acts.

🙏 David asked God through the priest's ephod

📿 Verse six explains how this worked

🏃 Abiathar had already joined him by now

➡️ Asking came before acting, even in hiding

---

## 🛡️ Go, And Smite The Philistines, And Save Keilah

Saul is hunting David across the countryside right now.

At the very same time, God sends David to rescue an Israelite town.

David is not just surviving Saul's manhunt.

He is already doing the job of protecting Israel that Saul has abandoned.

🛡️ David is told to rescue Keilah

🏃 He is still a hunted fugitive

👑 He already acts like Israel's protector

📖 Saul abandoned the job David is doing

---

## 😨 We Be Afraid Here In Judah

David's men are already scared, and they have not even left home territory yet.

Judah was supposed to be the safest ground they had.

Saul's manhunt has made even their own tribal land feel dangerous.

Fear is already present before any new danger even appears.

😨 David's men are already afraid

🏡 This fear exists even in home territory

⚠️ Saul's hunt made Judah itself feel unsafe

➡️ Fear arrives before the new danger does

---

## ⚔️ How Much More Then If We Come To Keilah

The men compare two real dangers and rank them.

Hiding from Saul in Judah is frightening enough on its own.

Marching out to face an active Philistine army raises the stakes even higher.

Their fear is fair, not cowardly.

Six hundred untrained men had real reason to worry about a real army.

⚔️ The men compare two real dangers

🏹 Facing a Philistine army raises the stakes

🧮 Their fear is practical, not cowardly

📖 Six hundred men had no formal army

---

## 🔁 David Enquired Of The LORD Yet Again

David does not scold his men for being afraid.

Instead, he brings their fear straight back to God and asks a second time.

This is a real pattern in David's leadership through this whole chapter.

He seeks real confirmation.

He does not assume his first answer settles everything alone.

🔁 David asks God a second time

🙏 He does not scold his frightened men

👂 He treats their fear as worth answering

📖 Confirmation matters more than assuming he is right

---

## 🤝 I Will Deliver The Philistines Into Thine Hand

God's second answer is even more direct than the first.

"Deliver into thine hand" is an old promise phrase meaning certain victory.

This is not a vague suggestion to go try something risky.

It is a guarantee spoken before the battle even starts.

🤝 God repeats His promise more directly

✅ Deliver into thine hand means certain victory

🗣️ This is a guarantee, not a guess

📖 Confidence comes from the promise, not the odds

---

## 🐄 Brought Away Their Cattle

Taking captured livestock after a battle was a normal ancient practice.

It replaced losses the Philistines had already caused by raiding the threshingfloors.

The cattle likely helped feed both Keilah and David's own six hundred men.

Rescue here comes with real, practical provision attached to it.

🐄 Taking cattle after battle was normal practice

🌾 It helped replace what the raiders stole

🍞 It likely helped feed both groups

➡️ Rescue included real, practical provision

---

## 🛡️ So David Saved The Inhabitants Of Keilah

David has no crown, no palace, and no official army yet.

He is still legally an outlaw in Saul's eyes.

Yet he is already acting exactly like the shepherd king Israel needs.

Long before David wears a crown, he is already doing a king's real work.

🛡️ David has no crown or palace yet

🏃 He is still legally called an outlaw

👑 He already does a king's real work

📖 The role comes before the title does

# FirstSamuel 23:6-8
# 📿 Abiathar Arrives, Saul Plots A Siege
---
## 🏃 Abiathar The Son Of Ahimelech Fled To David

Ahimelech was the priest Saul executed along with the rest of the priests of Nob.

Abiathar was the one son who escaped that massacre alive.

He had nowhere left to belong except with the man his father had helped.

His arrival links this chapter directly back to that earlier tragedy.

🏃 Abiathar is Ahimelech's surviving son

☠️ His father died in Saul's massacre at Nob

🏠 He had nowhere else left to go

📖 This links back to the tragedy at Nob

---

## 📿 With An Ephod In His Hand

An ephod was a priestly garment worn over the chest.

It held a pouch called the Urim and Thummim.

Priests used those objects to seek clear answers from God.

Without a priest and an ephod, David had no formal way to ask God anything.

Abiathar's arrival is what makes David's repeated inquiries even possible.

📿 An ephod was a priestly garment

🎲 It held the Urim and Thummim

🙏 Without it, David had no formal way

➡️ Abiathar's arrival made these inquiries possible

---

## 🙌 God Hath Delivered Him Into Mine Hand

Saul speaks like a man who trusts God completely here.

In reality, he is using God's name to justify his own murder plan.

The very next verse shows Saul planning a siege, not a prayer.

Twisting faith to excuse personal hatred is one of Saul's worst patterns in this book.

🙌 Saul invokes God for his own plan

🗡️ His real goal is David's death

📖 Faith language covers a murder plan here

➡️ This pattern repeats through Saul's whole pursuit

---

## 🚪 Shut In, By Entering Into A Town That Hath Gates And Bars

Ancient towns like Keilah were surrounded by walls with gated entrances.

Gates and bars kept enemies out during an attack.

Saul sees those same walls as a trap instead of protection.

To Saul, David has accidentally locked himself inside a cage.

🚪 Town gates were meant to keep enemies out

🏰 Saul sees the walls as a trap instead

🎯 He believes David is now cornered

📖 What protects David also seems to trap him

---

## 📯 Called All The People Together To War

This is not a small squad sent to arrest one man.

Saul calls up a full national muster, the same scale used for a real war.

Chasing David has become Saul's central use of Israel's own army.

One personal grudge is now consuming the kingdom's military resources.

📯 Saul calls up a full national muster

⚔️ This is the scale of a real war

👑 David has become Saul's main target

➡️ One grudge now drains the kingdom's army

# FirstSamuel 23:9-13
# 🔮 The Ephod Warns David To Flee
---
## 🕵️ Secretly Practised Mischief

"Mischief" here does not mean a harmless prank.

In the King James Bible it means real, intended harm.

David has picked up on Saul's hidden plan before it is ever announced out loud.

Watchfulness, not just courage, is keeping him alive at this point.

🕵️ Mischief here means real intended harm

👂 David senses the plan before it is announced

👀 Watchfulness is keeping him alive

📖 Awareness matters as much as courage

---

## 📿 Bring Hither The Ephod

David turns straight to prayer the moment danger becomes likely.

He does not wait for certainty before asking God what to do.

This request puts the ephod Abiathar brought into active, immediate use.

Guidance was available the whole time, and David finally reaches for it here.

📿 David asks for guidance right away

⏳ He does not wait for certainty first

🙏 This puts the ephod into active use

➡️ Available guidance only helps once it is used

---

## 🔥 To Destroy The City For My Sake

David names the real cost of Saul's plan out loud.

Saul is willing to level an entire Israelite town just to capture one man.

This is the same king who is supposed to protect towns like Keilah.

Saul's hatred has grown large enough to threaten his own people.

🔥 Saul would destroy a whole town for David

👑 Saul is the one meant to protect it

😠 His hatred now threatens his own people

📖 One grudge is worth a whole city

---

## 🤔 Will The Men Of Keilah Deliver Me Up

David just risked his men's lives to rescue this exact town.

Now he has to ask whether that same town would hand him over.

Gratitude is not guaranteed, even after a real act of rescue.

David is realistic about people, not naive about how they might respond.

🤔 David just rescued this very town

😟 He now doubts their loyalty to him

🙏 Gratitude was never guaranteed to him

➡️ David stays realistic, not naive, about people

---

## ✅ He Will Come Down

God's answer here is short and direct, a plain yes.

This style of answer fits how the Urim and Thummim were traditionally used.

They were built for clear yes or no questions, not long explanations.

Simple guidance can still carry enormous weight for the person receiving it.

✅ God gives a short, direct answer

🎲 The ephod worked for yes or no questions

📏 It was not built for long explanations

📖 Simple guidance still carries real weight

---

## 💔 They Will Deliver Thee Up

This is the harder, more painful of David's two questions.

He learns that the very people he just saved would still hand him over.

Verse five already proved his rescue of them was real and effective.

Human gratitude fails here even though David's kindness genuinely was not wasted.

💔 The people David saved would betray him

🛡️ His rescue of them was still real

😢 Gratitude fails even after real kindness

📖 Kindness is not wasted, even unreturned

---

## 🔢 About Six Hundred

David's band has grown from four hundred men in the cave at Adullam.

Two hundred more men have joined him since then.

A larger group meant more mouths to feed and more people to protect.

David is still on the run.

His responsibilities keep expanding anyway.

🔢 The group grew from four hundred men

📈 Two hundred more men have joined since

🍞 More people meant more to feed and protect

➡️ His responsibilities grow even while fleeing

---

## 🛑 He Forbare To Go Forth

Once David leaves Keilah, Saul calls off the whole campaign.

Saul was never actually defending the town from the Philistines.

His only real target the entire time was David himself.

The instant that target moves, so does every one of Saul's priorities.

🛑 Saul cancels the campaign once David leaves

🎯 David was always Saul's only real target

🏘️ Keilah's safety was never his true concern

📖 His priorities move the moment David does

# FirstSamuel 23:14-18
# 🌲 Jonathan's Last Visit In The Wood
---
## 🏔️ Strong Holds

A stronghold here means a natural, defensible position in rough terrain.

Caves, cliffs, and rocky ridges all worked as places to hide and hold ground.

David is not simply wandering aimlessly through the wilderness.

He is choosing terrain that gives him a real, lasting advantage.

🏔️ A stronghold means defensible, rough terrain

🪨 Caves and cliffs worked as hiding places

🧭 David is not wandering without a plan

➡️ He is choosing ground that favors him

---

## 🗺️ The Wilderness Of Ziph

Ziph was a rugged, dry region in the hill country of Judah.

It sat close enough to Bethlehem that David likely knew the land well.

Familiar terrain gave David an edge that a stranger chasing him would not have.

Knowing the land is quietly becoming one of David's greatest survival tools.

🗺️ Ziph was a rugged region in Judah

🏠 It sat near David's home region of Bethlehem

🧠 Familiar terrain gave David a real edge

📖 Knowledge of the land became a survival tool

---

## 🙌 Saul Sought Him Every Day, But God Delivered Him Not

Saul's effort here is described as constant, not occasional.

Every single day, Saul actively searches for David.

Every single day, God still keeps David out of his reach.

Human persistence and divine protection are placed side by side on purpose.

🙌 Saul searches for David every single day

🛡️ God still keeps David out of reach

⚖️ Persistence and protection sit side by side

📖 Effort alone cannot overpower God's protection

---

## ⚠️ Come Out To Seek His Life

This phrase removes any doubt about Saul's real intention.

Saul is not trying to arrest David or put him on trial.

He is actively hunting to end David's life.

Naming the danger plainly is part of how this chapter builds real tension.

⚠️ This phrase removes any doubt about intent

☠️ Saul is hunting to end David's life

⚖️ This is not an arrest or a trial

📖 Plain danger builds real tension in the story

---

## 🚶 Jonathan Saul's Son Arose, And Went To David

Jonathan is the crown prince, and his own father is hunting the man he visits.

Walking into David's hiding place could easily be read as treason.

Jonathan risks real danger just by making this trip at all.

Loyalty to David matters more to him than staying safely out of sight.

🚶 Jonathan is Saul's own crown prince

⚠️ Visiting David risks looking like treason

💪 He takes on real personal danger here

📖 Loyalty outweighs staying safely hidden

---

## 💪 Strengthened His Hand In God

This phrase does not describe adding physical muscle.

It means Jonathan renews David's courage and trust in God.

David has been running, hiding, and losing people close to him for a while now.

Jonathan's visit arrives exactly when David most needs real encouragement.

💪 This phrase means renewed courage, not muscle

🙏 Jonathan strengthens David's trust in God

😔 David has been worn down by loss

➡️ Encouragement arrives right when it is needed

---

## 👑 Thou Shalt Be King Over Israel

Jonathan says this plainly, with no hesitation in his voice.

He is Saul's own son, next in line for the throne by birth.

Yet Jonathan openly accepts that the crown belongs to David instead.

Few people in Jonathan's position would give up a throne this willingly.

👑 Jonathan states David's future kingship plainly

🏛️ Jonathan is next in line by birth

🤲 He accepts David's claim over his own

📖 Few would give up a throne this easily

---

## 🤲 I Shall Be Next Unto Thee

Jonathan does not just accept David's future crown.

He asks for nothing more than second place under David's future rule.

Even Saul reportedly already knows this outcome is coming.

Jonathan's humility here stands in sharp contrast to his father's growing rage.

🤲 Jonathan asks only for second place

👑 Even Saul reportedly knows this outcome

😔 Saul fights an outcome he cannot stop

📖 Humility here contrasts with Saul's rage

---

## 🤝 Made A Covenant Before The LORD

This is not the first covenant between David and Jonathan.

They had already made similar promises earlier in this story.

Renewing it here, in hiding, shows the promise still holds under real pressure.

Then the two men part ways, likely for the very last time in this life.

🤝 This renews an earlier promise between them

🌲 They renew it here, in hiding

💪 The promise holds under real pressure

📖 The two men part for the last time

# FirstSamuel 23:19-24
# 🗣️ The Ziphites Betray David's Hiding Place
---
## 🗣️ The Ziphites

The Ziphites lived in Ziph, inside the tribe of Judah, David's own tribe.

That makes them David's own countrymen, not a rival or foreign people.

They choose to report his hiding place to Saul anyway.

Betrayal here comes from kinship, not from an enemy outside the camp.

🗣️ The Ziphites were David's own countrymen

🏘️ They lived inside the tribe of Judah

🤝 They still chose to report him to Saul

📖 This betrayal comes from within, not from outside

---

## 🗺️ Hill Of Hachilah, On The South Of Jeshimon

Hachilah was a specific hill inside the wilderness region near Ziph.

"Jeshimon" is an old word meaning a wasteland or desert region.

Naming the exact hill shows the Ziphites gave Saul precise, usable intelligence.

This is not a vague rumor.

It is a real location a search party could actually act on.

🗺️ Hachilah was a specific hill near Ziph

🏜️ Jeshimon means a wasteland or desert region

🎯 This was precise, usable intelligence

📖 A vague rumor becomes an actual target

---

## 😔 All The Desire Of Thy Soul

This phrase describes desire, not duty.

Saul's interest in David is framed as something deeply personal.

The manhunt is no longer described as ordinary royal business.

It is personal obsession wearing the appearance of state duty.

😔 The Ziphites name Saul's real motive

👑 They do not call it royal duty

💭 They call it a personal desire instead

➡️ Obsession hides behind the appearance of duty

---

## 🤝 Our Part Shall Be To Deliver Him

This offer goes further than simply sharing information.

The Ziphites volunteer to help capture and hand David over themselves.

This goes beyond gossip into direct, willing cooperation with Saul's plan.

Betrayal by David's own people becomes an active choice, not an accident.

🤝 The Ziphites offer active help, not just words

🎯 They volunteer to help capture David

🙋 This is willing cooperation, not gossip

📖 Their betrayal is a choice, not an accident

---

## 🙏 Blessed Be Ye Of The LORD, For Ye Have Compassion On Me

Saul thanks God for information that will help him kill an innocent man.

He describes betrayal against David as an act of compassion toward himself.

This shows exactly how far Saul's sense of right and wrong has slipped.

Faith language keeps covering choices that faith would actually condemn.

🙏 Saul thanks God for a plan to kill

😢 He calls betrayal an act of compassion

⚖️ His sense of right and wrong has slipped

📖 Faith language covers what faith would condemn

---

## 🦊 He Dealeth Very Subtilly

"Subtilly" is an old spelling of subtly, meaning clever and hard to catch.

Saul is still actively hunting David here.

Yet he admits real respect for David's skill at evasion.

David has escaped every attempt made against him so far in this chapter.

Saul's own words reveal how outmatched his pursuit has actually been.

🦊 Subtilly is an old spelling of subtly

🙇 Saul admits real respect for David's skill

🏃 David has escaped every attempt so far

📖 Saul's words reveal how outmatched he is

---

## 🔍 Know And See His Place Where His Haunt Is

"Haunt" is an old word for a place someone regularly returns to.

Saul demands exact, repeated reconnaissance.

He refuses to settle for a quick guess.

This is careful, methodical planning, not reckless anger.

Saul is learning that catching David will take real patience, not just fury.

🔍 Haunt means a place David often returns to

🕵️ Saul demands exact, repeated reconnaissance

🧠 This is careful planning, not reckless anger

➡️ Fury alone has not caught him yet

---

## 📜 Come Again To Me With The Certainty

Saul refuses to move his forces on a rumor alone.

He wants confirmed, verified information before committing his men to another chase.

This caution shows how many times David has already slipped away from him.

Careful planning has replaced Saul's earlier impulsive bursts of anger.

📜 Saul wants confirmed information, not rumor

🧠 He will not chase a mere guess

🏃 David has slipped away from him before

➡️ Caution now replaces his earlier impulsiveness

---

## 🏹 Throughout All The Thousands Of Judah

"Thousands" here refers to the clan divisions that made up each Israelite tribe.

Saul is threatening to search every clan inside all of Judah if needed.

This is not a search of one hillside.

It is a threat to comb an entire tribe until David is found.

🏹 Thousands means the clan divisions of a tribe

🗺️ Saul threatens to search all of Judah

🔎 This goes far beyond one hillside

📖 One man's hiding threatens an entire tribe's peace

---

## 🏜️ The Wilderness Of Maon

Maon was another rugged region south of Ziph, further into the desert.

David has already moved on by the time the Ziphites finish reporting.

The information Saul receives is already slightly out of date.

Staying one step ahead is becoming David's real survival strategy in this chapter.

🏜️ Maon was a rugged region south of Ziph

🏃 David had already moved on by now

⏳ Saul's information was already out of date

➡️ Staying ahead becomes David's real strategy

# FirstSamuel 23:25-29
# 🏃 The Chase Around The Mountain
---
## 🪨 He Came Down Into A Rock

David retreats to a natural rock formation for cover and defense.

Rocky terrain in this wilderness often included caves, ledges, and narrow passes.

This kind of ground slows down anyone trying to surround a smaller group.

David keeps choosing terrain that works in his favor, even under real pressure.

🪨 David retreats to a rock formation

🕳️ This terrain often included caves and ledges

🐢 Rough ground slows down a larger force

➡️ David keeps using terrain to his advantage

---

## 🏃 Saul Pursued After David In The Wilderness Of Maon

This is the closest Saul has come to catching David in this entire chapter.

The chase has moved from reports and rumors into direct, physical pursuit.

Tension rises sharply the moment Saul enters David's own wilderness.

The danger here finally becomes immediate instead of just possible.

🏃 This is Saul's closest chase yet

📈 Tension rises as pursuit becomes direct

⚠️ Danger becomes immediate, not just possible

➡️ The gap between them is finally closing

---

## ⛰️ On This Side Of The Mountain, And On That Side

Saul and David end up on opposite sides of the very same mountain.

This detail paints an almost unbearably close, visual standoff.

Only a single ridge separates the hunter from the man he is hunting.

The distance between capture and escape has never felt this small before.

⛰️ Saul and David share one mountain

📏 Only a ridge separates them here

😰 This is an unbearably close standoff

➡️ Escape and capture have never been closer

---

## 🔄 Compassed David And His Men Round About

"Compassed round about" means Saul's forces have fully surrounded David's group.

This is not a near miss anymore.

David's men are genuinely encircled, with no clear way out left open.

Every earlier escape in this chapter has led up to this single moment.

🔄 Compassed round about means fully surrounded

🚫 There is no clear way out left

⏳ Every earlier escape leads to this moment

📖 The danger has never been this real

---

## 📯 But There Came A Messenger Unto Saul

At the exact moment David seems trapped, an outside message interrupts everything.

No angel appears, and no miracle is described happening in the sky.

God's protection here works through an ordinary military report instead.

Sometimes deliverance looks like a well timed interruption, not a dramatic sign.

📯 A messenger interrupts at the worst moment

✨ No visible miracle happens here

📨 Protection arrives through an ordinary report

➡️ Deliverance can look like good timing

---

## ⚔️ The Philistines Have Invaded The Land

Saul cannot simply ignore a real national threat, even mid chase.

A king who lets Philistines overrun Israel risks losing his whole kingdom.

Duty as king finally outweighs personal obsession, at least for this one moment.

David is not saved by Saul suddenly changing his heart toward him.

⚔️ Saul faces a real national threat

👑 Ignoring it would risk his whole kingdom

⚖️ Duty briefly outweighs personal obsession

📖 David is saved by timing, not mercy

---

## 🪨 Selahammahlekoth

This place gets a new name because of what almost happened here.

Many study notes translate it as the rock of divisions.

The name likely comes from a word meaning to slip away.

Naming a location after an event was a common way to preserve a story.

Every traveler who later heard this name would remember how close this chase came.

🪨 The place is renamed for this event

📜 The name likely means the rock of divisions

🗣️ Naming a place preserved its story

➡️ The name kept this close call remembered

---

## 🏞️ Engedi

Engedi was a lush oasis on the western shore of the Dead Sea.

Fresh springs made it a rare patch of green inside a harsh desert.

David trades one wilderness stronghold for another, even further from Saul's usual reach.

This same location returns later as the setting for another major moment in David's story.

🏞️ Engedi was a lush oasis by the sea

💧 Fresh springs made it green inside a desert

🗺️ David moves even further from Saul's reach

📖 This location returns later in David's story
`.trim();

export const FIRST_SAMUEL_TWENTY_THREE_PERSONAL_SECTIONS = parseFirstSamuelTwentyThreeRawNotes(FIRST_SAMUEL_TWENTY_THREE_RAW_NOTES);
