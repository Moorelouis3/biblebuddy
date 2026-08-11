export type SecondSamuelSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelSeventeenRawNotes(rawText: string): SecondSamuelSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 17:${startVerse}` : `2 Samuel 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Samuel 17 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_SEVENTEEN_RAW_NOTES = `# SecondSamuel 17:1-4
# ⚔️ Ahithophel's Fast Strike Plan
---
## 🧠 Ahithophel Said Unto Absalom

Ahithophel was once one of David's most trusted royal advisors.

He switched sides and now counsels David's own son Absalom instead.

His advice carried enormous weight in Israel, treated almost like a word straight from God.

That reputation is about to be tested in this very chapter.

🧠 Ahithophel once advised David directly
🔄 He now counsels Absalom instead
👑 His advice carried near prophetic weight
📖 That reputation is tested here

## 🌙 Choose Out Twelve Thousand Men

Ahithophel asks for a large strike force, not a small raiding party.

He wants to move that same night, before David's camp can settle or plan a defense.

Speed is the whole point of this plan.

Every hour David has to organize his men works against Ahithophel's chances.

🌙 A large force moves tonight
⏱️ Speed is the entire strategy
🛌 Delay only helps David prepare
➡️ Every hour matters to this plan

## 😮‍💨 Weary And Weak Handed

"Weak handed" means discouraged, too tired and afraid to fight well.

Ahithophel is not describing David's army as small.

He is describing them as exhausted from a hard, sudden flight out of Jerusalem.

A tired army makes mistakes that a rested one would not.

😮‍💨 Weak handed means discouraged and tired
🏃 David's men just fled the city
😩 Exhaustion causes real mistakes
📖 A tired army is a target

## 🎯 I Will Smite The King Only

Ahithophel's plan targets one man, not the whole army following him.

Killing only David would end the rebellion instantly without a long civil war.

It is a brutal plan, but a narrow one.

Fewer deaths overall was actually part of Ahithophel's pitch.

🎯 The target is David alone
🚫 Not a fight against the whole camp
⚡ One death could end it fast
➡️ A narrow plan, not a wide one

## 🐑 As If All Returned

Ahithophel compares the people following David to a flock that wandered off with one shepherd.

Remove that one shepherd, and the flock has nowhere else to go but back.

He promises Absalom that everyone else will simply come home in peace.

No one else needs to die for the plan to work, in his telling.

🐑 The people are like a flock
👤 Remove David, the flock returns
🕊️ Ahithophel promises peace afterward
📖 One death ends it, in his plan

## 🙋 The Saying Pleased Absalom Well

Absalom likes the plan immediately, and so do all the elders of Israel.

That unanimous approval should have settled the matter right there.

A confident, fast, well reasoned plan had just won the room completely.

What happens next in this chapter is not really about the plan's quality at all.

🙋 Absalom approves right away
👥 The elders agree with him
✅ The plan wins the room
➡️ Its quality is not the deciding factor

# SecondSamuel 17:5-6
# 🗣️ A Second Opinion Is Called For
---
## 📣 Call Now Hushai The Archite Also

Hushai is David's old friend, sent back into Jerusalem as a secret informant.

He pretended to switch sides in chapter fifteen so he could report on Absalom from the inside.

"Archite" names the region Hushai came from, near Bethel.

Absalom does not know he is inviting his own enemy's spy into this decision.

📣 Hushai is David's planted informant
🎭 He pretended to switch sides
🗺️ Archite names his home region
➡️ Absalom does not know the truth

## ⏳ Let Us Hear Likewise What He Saith

Absalom already has a strong, unanimous, fast acting plan on the table.

He pauses anyway, just to hear a second voice.

That single pause is the opening Hushai needs to change everything.

Small delays can carry enormous consequences.

⏳ A strong plan is already approved
🎤 Absalom wants one more voice
🔑 That pause opens the door
📖 Small delays can change everything

## 🎯 Speak Thou

Absalom openly invites Hushai to disagree with Ahithophel if he wants to.

He has no idea he is handing his enemy a fair chance to sabotage him.

The trap is not hidden or forced.

Absalom walks into it by his own invitation.

🎯 Absalom invites disagreement himself
🕵️ He does not suspect Hushai at all
🚪 No force is needed for the trap
➡️ Absalom opens the door himself

# SecondSamuel 17:7-10
# 🐻 Hushai Begins His Case
---
## ⏰ Not Good At This Time

Hushai does not call Ahithophel's plan foolish or wrong.

He only questions its timing, which is a much harder thing for Absalom to dismiss.

Attacking the timing lets Hushai sound careful and wise instead of jealous.

That framing buys him room to keep talking.

⏰ Hushai attacks the timing only
🧐 That sounds careful, not jealous
🗣️ It buys him more room to speak
➡️ A small doubt opens a bigger one

## 🐻 As A Bear Robbed Of Her Whelps

A mother bear that has lost her cubs is one of the most dangerous animals in the wild.

Hushai uses that image to describe David's men right now.

They may be tired, but tired and desperate is not the same as weak.

Fear, not calm reasoning, drives this comparison.

🐻 A robbed bear is extremely dangerous
😤 David's men are desperate, not weak
😨 Fear shapes this whole comparison
📖 Tired does not mean harmless

## ⚔️ A Man Of War

David spent decades as a soldier before he was ever king.

Hushai reminds Absalom that his father knows real battle tactics firsthand.

An experienced fighter would not simply camp out where he is expected.

That single fact undercuts Ahithophel's confident, simple plan.

⚔️ David is an experienced soldier
🧭 He knows real battle tactics
🏕️ He would not camp somewhere obvious
📖 Experience undercuts a simple plan

## 🕳️ He Is Hid Now In Some Pit

Hushai plants a plain but powerful doubt, no one actually knows exactly where David is.

Ahithophel's whole plan depends on finding him fast and hitting him first.

Uncertainty alone can stall a plan built entirely on speed.

Hushai never has to prove David is truly hidden, only suggest it.

🕳️ Nobody knows David's exact location
🎯 The plan depends on finding him fast
❓ Doubt alone can stall speed
➡️ Hushai only needs to suggest, not prove

## 📣 There Is A Slaughter Among The People

Hushai imagines the worst case rumor spreading through Absalom's own troops.

Even a small early setback could be exaggerated into a full defeat by word of mouth.

Panic can spread faster than truth ever could.

He is arguing with fear, not with facts.

📣 A rumor could spread instantly
📉 A small setback sounds like defeat
😱 Panic spreads faster than truth
📖 Fear argues louder than facts

## 🦁 Heart Of A Lion Shall Utterly Melt

Even the bravest soldier can lose his nerve from nothing more than a bad rumor.

Hushai is describing real battlefield psychology, not exaggerating for effect.

Courage depends partly on what a soldier believes is happening around him.

That single insight is exactly what Hushai needs Absalom to fear most.

🦁 Even brave men can panic
🧠 Belief shapes courage in battle
😰 Rumors can break morale fast
➡️ Absalom is meant to fear this outcome

# SecondSamuel 17:11-14
# 🌌 A Bigger, Slower Plan Wins The Room
---
## 🗺️ From Dan Even To Beersheba

This phrase names the northern and southern edges of the whole land of Israel.

Saying "Dan to Beersheba" was a common way of meaning everyone, from one end of the country to the other.

Hushai is proposing a massive national call up, not the small strike force Ahithophel asked for.

Bigger sounds safer, but it also takes far longer to gather.

🗺️ Dan and Beersheba mark the whole land
📢 The phrase means everyone, everywhere
📈 Hushai proposes a massive army
➡️ Bigger armies take much longer

## 🏖️ As The Sand That Is By The Sea

Hushai exaggerates the size of the coming army on purpose.

Flattering, oversized language appeals directly to Absalom's pride and ego.

A king wants a grand personal victory, not a quiet assassination handled by others.

Hushai is selling Absalom exactly what he wants to hear.

🏖️ The army size is exaggerated
😌 The image flatters Absalom's ego
👑 Kings want grand victories, not quiet ones
📖 Hushai sells Absalom his own vanity

## 🛡️ That Thou Go To Battle In Thine Own Person

Ahithophel's plan kept Absalom safely back while others did the fighting.

Hushai instead insists Absalom personally lead the army onto the battlefield.

Getting Absalom out in the open, not hidden in the city, quietly serves David's side far more than Absalom's.

The suggestion sounds like honor, but it is really exposure.

🛡️ Ahithophel kept Absalom safe at home
🎖️ Hushai wants Absalom on the field
🎯 Exposure actually helps David's side
➡️ Honor language hides a real risk

## 🌫️ As The Dew Falleth On The Ground

Dew does not strike one target, it settles quietly over everything at once.

Hushai promises total, overwhelming coverage instead of Ahithophel's single narrow strike.

That image sounds unstoppable and complete.

It also takes far longer to arrange than a fast night raid.

🌫️ Dew covers everything, not one spot
💯 Hushai promises total coverage
✨ The image sounds unstoppable
➡️ Total coverage takes real time to build

## 🏙️ We Will Draw It Into The River

Hushai boasts about literally dragging an entire city into a river with ropes.

That is not a realistic military tactic, it is theater meant to impress.

The wilder the boast, the more it distracts from Ahithophel's simple, workable plan.

Grand promises can sound stronger than they actually are.

🏙️ Dragging a city is not realistic
🎭 The boast is theater, not strategy
🌀 Wild promises distract from simple plans
📖 Grand words are not the same as strength

## ⚖️ The Counsel Of Hushai Is Better Than Ahithophel's

The elders and Absalom openly choose Hushai's slower, grander plan over Ahithophel's fast, effective one.

On paper, Ahithophel's plan was actually the stronger military choice.

Confidence and flattery won the room instead of sound strategy.

That choice is about to cost Absalom everything.

⚖️ The room picks the weaker plan
📊 Ahithophel's plan was the sounder one
😌 Flattery beat real strategy
➡️ That choice will cost Absalom dearly

## 🙏 The LORD Had Appointed To Defeat Ahithophel's Counsel

This single verse explains everything that just happened.

Absalom and the elders made their own free choice, yet God was working behind that choice the whole time.

David had prayed exactly this outcome back in chapter fifteen, asking God to turn Ahithophel's counsel into foolishness.

Ordinary conversations in a war room became the place God answered that prayer.

🙏 God worked through a normal decision
🧠 Human choice and God's plan both stand
📜 David had prayed this in chapter fifteen
📖 An answered prayer, hidden in plain sight

# SecondSamuel 17:15-16
# ✉️ Hushai Warns The Priests
---
## ⛪ Zadok And Abiathar The Priests

These two priests stayed loyal to David and remained inside Jerusalem as part of his intelligence network.

They already appear back in chapter fifteen, placed there on purpose before Absalom ever took the city.

Hushai now uses them to pass along what he just heard in the war room.

Every piece of this spy network depends on people trusting each other completely.

⛪ Zadok and Abiathar stayed loyal
🕵️ They remained in the city on purpose
📨 Hushai uses them to relay news
➡️ The whole plan depends on trust

## 🔁 Thus And Thus Did Ahithophel Counsel

The narrator skips repeating both full plans word for word here.

That shorthand keeps the story moving quickly, matching the real urgency of the moment.

Every verse spent explaining twice would slow down a message that has to move fast.

The pace of the writing mirrors the pace of the danger.

🔁 The plans are not repeated in full
⚡ Shorthand keeps the pace urgent
⏱️ Every verse spent here costs time
📖 The writing style matches the danger

## 🌾 Lodge Not This Night In The Plains Of The Wilderness

This warning names the exact location Ahithophel originally planned to strike.

Even though Absalom picked Hushai's plan instead, Hushai still is not certain Absalom will not change his mind again.

The danger from Ahithophel's original idea has not fully disappeared yet.

David needs to move immediately, not wait to see what happens next.

🌾 This matches Ahithophel's original target
😬 Absalom could still reverse his choice
⚠️ The old danger has not fully passed
➡️ David must move without delay

## 🌊 Lest The King Be Swallowed Up

"Swallowed up" pictures David and his people being completely overwhelmed, the way water closes entirely over something sinking.

It is a strong word choice for a message meant to move fast.

Hushai is not sending a casual update, he is sending an emergency warning.

Every phrase in this short message is built for urgency.

🌊 Swallowed pictures total destruction
📣 This is an emergency, not an update
🏃 Everyone in the camp is at risk
📖 The wording itself signals urgency

# SecondSamuel 17:17-20
# 🕳️ The Well At Bahurim
---
## 🏞️ Jonathan And Ahimaaz Stayed By Enrogel

Jonathan and Ahimaaz are the sons of the two loyal priests, working as message runners for David.

Enrogel was a spring just outside Jerusalem.

It was close enough to receive news, yet far enough to avoid being seen entering the city.

Walking into Jerusalem themselves would have exposed the whole spy network at once.

Careful placement protected everyone involved in this plan.

🏞️ Enrogel sits just outside Jerusalem
👦 Jonathan and Ahimaaz are the priests' sons
🚫 Entering the city risked exposure
➡️ Careful placement protected the network

## 🙋‍♀️ A Wench Went And Told Them

An unnamed servant girl carries Hushai's message from inside the city out to the two runners.

She is never named, yet the entire warning depends completely on her.

Many of the most important people in these chapters have no recorded name at all.

Their courage still shaped the outcome of David's survival.

🙋‍♀️ An unnamed servant carries the message
🔗 The whole plan depends on her
❓ Many key helpers go unnamed
📖 Unnamed people still shape real outcomes

## 👀 A Lad Saw Them, And Told Absalom

The plan nearly collapses over one small, unlucky detail, a boy noticing the two runners.

Tension in this scene comes from how thin the margin for safety actually is.

One careless moment could have ended David's entire chance at survival.

Big rescues often hang on very small, ordinary events.

👀 A boy spots the two runners
😨 The whole plan nearly collapses
🧵 The margin for safety is razor thin
➡️ Small events can carry huge weight

## 🕳️ Went Down Into A Well In His Court

Jonathan and Ahimaaz hide inside an ordinary household water well in Bahurim.

A well like this was common in a family's courtyard for daily water use.

Hiding in plain, everyday spaces was often safer than trying to run and be seen.

Ordinary places can become the safest hiding spots in a crisis.

🕳️ A well was a normal household feature
🏠 It sat right in the family courtyard
🏃 Hiding beats trying to outrun pursuers
📖 Ordinary places can hide extraordinary risk

## 🧺 Spread A Covering Over The Well's Mouth

The homeowner's wife acts fast, disguising the well's opening so it looks untouched.

Quick, calm thinking under pressure is exactly what saves the two men hiding below.

She receives no name in the text, yet her courage is just as vital as anyone else's in this chapter.

Her fast decision protects David's entire spy network in one move.

🧺 She covers the well's opening
🧠 Fast thinking saves both men
❓ She too goes unnamed in the text
➡️ One decision protects the whole plan

## 🌾 Spread Ground Corn Thereon

Scattering grain across the covering makes the well look like an ordinary spot for drying food in the sun.

It is a completely believable, everyday sight that would not draw a second glance.

The best disguise is often something boring, not something clever.

Nothing about the scene looks suspicious to anyone passing by.

🌾 Grain drying was a normal sight
👀 Nothing here draws a second glance
😴 Boring disguises work better than clever ones
➡️ The scene looks completely ordinary

## 🚶‍♀️ They Be Gone Over The Brook Of Water

When Absalom's men ask directly, the woman lies to their faces without hesitation.

She sends them off in the wrong direction entirely, buying David's runners the time they need.

This is a real, risky act of loyalty, not a small favor.

Her lie may have saved David's life that day.

🚶‍♀️ She lies to Absalom's men directly
🧭 She sends them the wrong way
⚠️ This was a real personal risk
📖 Her choice may have saved David

# SecondSamuel 17:21-23
# 💀 Jordan Crossed, Ahithophel's End
---
## 🏃 Arise, And Pass Quickly Over The Water

The message finally reaches David himself, after passing through priests, sons, a servant girl, and a homeowner's wife.

Every careful link in that chain finally pays off in this one urgent instruction.

Even though Ahithophel's original plan was rejected, real danger still remains close behind David.

The warning cannot wait even one more night.

🏃 The message finally reaches David
🔗 A whole chain of helpers made it possible
⚠️ Real danger is still close behind
📖 Urgency was never misplaced

## 🌅 By The Morning Light There Lacked Not One

David's entire company crosses the Jordan River overnight without losing a single person.

That kind of orderly, complete crossing in the dark is a real logistical achievement.

The text quietly credits more than just good planning for that success.

Safety this complete, this fast, reads as protection rather than luck.

🌅 The whole company crosses safely
🌙 The crossing happens overnight
📋 Complete order like this is rare
📖 Safety this total reads as protection

## 🐴 He Saddled His Ass, And Gat Him Home

Ahithophel sees that his plan was rejected and understands immediately what it means for him.

Being publicly overruled after building his whole reputation on flawless advice was more than professional embarrassment.

He returns home calmly, without panic or argument.

His response says more than his silence at first appears to.

🐴 Ahithophel departs calmly, without panic
📉 Rejection cost him his whole reputation
🧠 He understands the outcome immediately
➡️ Calm silence can hide real despair

## 📜 Put His Household In Order

This phrase describes settling personal and family affairs, similar to writing a final will.

Ahithophel is not acting in a sudden rage.

Every step he takes here is deliberate and planned out in advance.

That calm, methodical detail makes the ending of this scene even harder to read.

📜 He settles his affairs first
🧠 This is planned, not sudden rage
🚶 Every step here is deliberate
📖 Calm planning makes the ending heavier

## ⚰️ Hanged Himself, And Was Buried In His Father's Sepulchre

Ahithophel takes his own life once he sees that his political and personal standing has collapsed completely.

This is one of the very few suicides recorded anywhere in the Old Testament.

Even after everything, his family still buries him with his own ancestors, an ordinary, honorable burial.

His counsel had once carried the weight of scripture itself, and now his story ends in complete silence.

⚰️ A rare suicide in the Old Testament
👪 His family still buries him honorably
🔇 A once honored voice ends in silence
📖 Reputation and despair are tightly bound here

# SecondSamuel 17:24-26
# ⚔️ Two Armies Reach Gilead
---
## 🏰 David Came To Mahanaim

Mahanaim was a fortified city east of the Jordan River.

It was already used once before as a royal base by Ishbosheth in chapter two.

Its strong location made it a wise, defensible choice for David's camp in exile.

Choosing a city with a history of royal use also carried its own quiet symbolism.

David is regrouping, not simply hiding.

🏰 Mahanaim is a fortified eastern city
👑 It was once Ishbosheth's base too
🛡️ Its location favors defense
➡️ David is regrouping, not just hiding

## 🌊 Absalom Passed Over Jordan, He And All The Men Of Israel

Hushai's grand, slow plan from earlier in the chapter has now actually happened.

The full national army did gather, and it is now crossing the river in pursuit of David.

The delay Hushai bought did not remove the danger, it only postponed it.

David still has a real battle ahead of him.

🌊 The full army now crosses too
📈 Hushai's grand plan became real
⏳ Delay only postponed the danger
➡️ A real battle still lies ahead

## 👥 Amasa Captain Of The Host Instead Of Joab

Amasa is David's own nephew, now commanding the army fighting against his uncle.

His mother Abigail and Joab's mother Zeruiah were both David's sisters.

That makes Amasa and Joab first cousins standing on opposite sides of this war.

Family loyalty and national loyalty have completely split apart in this rebellion.

Even close relatives end up standing against each other here.

👥 Amasa is David's own nephew
👪 He and Joab are first cousins
⚔️ They now stand on opposite sides
📖 This rebellion splits even close family

## ❓ Ithra An Israelite

Some ancient manuscripts record Amasa's father as an Ishmaelite, a foreigner, rather than an Israelite.

The text itself leaves this detail slightly uncertain.

It is worth naming honestly rather than guessing at a single confident answer.

Either way, Amasa's mother's side ties him directly into David's own family.

❓ Ancient copies differ on this detail
🤷 The text does not fully settle it
🧬 His mother's side still ties him to David
📖 Honesty matters more than guessing

## 🏕️ Pitched In The Land Of Gilead

Both armies now sit in the same general region east of the Jordan.

That closeness sets up the battle that fills the very next chapter.

The chase that began back in chapter fifteen has finally caught up to David.

Everything in this chapter has been leading toward this moment.

🏕️ Both armies now sit near each other
📅 This sets up chapter eighteen's battle
🏃 The long chase has caught up
➡️ This chapter now points straight ahead

# SecondSamuel 17:27-29
# 🍯 Kindness At Mahanaim
---
## 👑 Shobi The Son Of Nahash Of Rabbah

Shobi is an Ammonite prince, from the very nation David had fought against in chapter ten.

His own brother Hanun once humiliated David's messengers and started that earlier war.

Yet here, Shobi shows David real kindness during his lowest moment.

Help sometimes comes from the last place anyone would expect it.

👑 Shobi is an Ammonite prince
⚔️ His brother once fought against David
🤝 He shows kindness anyway here
📖 Help can come from unexpected places

## 🏠 Machir The Son Of Ammiel Of Lodebar

Machir already appears earlier in the story, back in chapter nine, sheltering Mephibosheth before David ever found him.

The same man who once cared for Jonathan's crippled son now personally cares for David himself.

That quiet connection links two very different chapters together.

Small, easily missed details like this often carry real meaning.

🏠 Machir sheltered Mephibosheth earlier
🔗 The same man now aids David
🧵 Two chapters quietly connect here
➡️ Small details often carry meaning

## 🌾 Barzillai The Gileadite Of Rogelim

Barzillai is introduced here for the first time as a wealthy, respected local leader.

He becomes an important and deeply loyal friend to David again later in chapter nineteen.

His generosity in this chapter is only the beginning of that relationship.

Some of the most important friendships in this story start with a single quiet gift.

🌾 Barzillai is a respected local leader
🤝 He becomes David's close friend later
🎁 This gift is only the beginning
📖 Friendships can start with one small act

## 🛏️ Beds, And Basons, And Earthen Vessels

David's camp fled Jerusalem so suddenly that they left with almost nothing.

These are basic household items meant to make an exhausted, displaced camp livable again.

Practical comfort matters just as much as safety after a crisis like this.

Simple gifts like these meet very real, immediate needs.

🛏️ David's camp fled with almost nothing
🏺 These are basic household items
😴 Comfort matters after a crisis too
➡️ Simple gifts meet real needs

## 🌾 Wheat, And Barley, And Flour, And Parched Corn

This is a long list of grains and legumes, not a single small gift.

Food like this could sustain a large camp of people for an extended stay, not just one meal.

The scale of the gift matches the scale of David's need.

Someone clearly planned for David to stay a while, not just pass through quickly.

🌾 A full list of grains and legumes
📦 Enough to sustain the camp for weeks
📏 The gift matches the real need
📖 Someone planned for a longer stay

## 🍯 Honey, And Butter, And Sheep, And Cheese

Protein and dairy round out this list, making it a complete survival supply.

Nothing about this gift is thrown together carelessly.

It is thoughtful, thorough, and clearly meant to actually sustain David's people.

Real generosity shows itself in details like these.

🍯 Protein and dairy complete the list
🐑 Nothing here is careless or rushed
🧺 The gift is thorough and complete
➡️ Generosity shows itself in the details

## 😮‍💨 The People Is Hungry, And Weary, And Thirsty

After a whole chapter of scheming, spying, and a general's suicide, the story ends on plain human need.

Three simple words describe David's people, hungry, weary, and thirsty.

Ordinary kindness meets that need without any political motive attached.

Real care often shows up exactly where the ambition and plotting finally run out.

😮‍💨 The chapter ends on simple need
🍞 Hunger, weariness, and thirst are named plainly
🤲 Kindness here carries no hidden motive
📖 Real care outlasts ambition and plotting
`.trim();

export const SECOND_SAMUEL_SEVENTEEN_PERSONAL_SECTIONS = parseSecondSamuelSeventeenRawNotes(SECOND_SAMUEL_SEVENTEEN_RAW_NOTES);
