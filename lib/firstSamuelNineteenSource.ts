export type FirstSamuelNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelNineteenRawNotes(rawText: string): FirstSamuelNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 19:${startVerse}` : `1 Samuel 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Samuel 19 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_NINETEEN_RAW_NOTES = `# FirstSamuel 19:1-3
# 🗝️ Jonathan Warns And Intervenes
---
## 🗡️ That They Should Kill David

Saul now says the plan out loud instead of hiding it.

He tells his own son and his royal servants to kill David.

Chapter eighteen ended with jealousy and secret plotting.

Chapter nineteen opens with that plotting turned into an open order.

Even a king's private servants now know his intentions.

🗡️ Saul orders David killed openly
👑 He tells his son and servants
🔓 The secret plot becomes an order
📖 Chapter eighteen's jealousy is now open

## 💗 Delighted Much In David

"Delighted" here means genuine deep pleasure, not a mild fondness.

Jonathan feels this way about David even though his own father wants David dead.

Jonathan already gave David his own robe and weapons back in chapter eighteen.

That covenant of love is about to be tested for the first time.

💗 Delighted means deep genuine affection
📜 Their covenant began in chapter eighteen
⚖️ Loyalty to David tests obedience to Saul
📖 That test starts right now

## 🕶️ Abide In A Secret Place

Jonathan warns David plainly that his father intends to kill him.

He tells David to hide somewhere secret until morning.

This is the first time David hears the danger stated so directly.

Jonathan is choosing to warn the very man his own father wants dead.

⚠️ Jonathan warns David directly
🕶️ Hide somewhere secret until morning
👑 The warning defies his own father
📖 Jonathan protects the man Saul wants dead

## 🗣️ I Will Commune With My Father Of Thee

Jonathan plans to stand beside Saul and speak on David's behalf.

He will watch his father's reaction and report back what he learns.

This puts Jonathan directly between an angry king and a hunted friend.

He is risking his own standing with Saul to protect David.

🗣️ Jonathan will speak for David
👀 He will watch Saul's reaction
⚖️ He stands between king and friend
📖 He risks his place to protect David

# FirstSamuel 19:4-7
# 🤝 An Oath Restores The Peace
---
## 🙇 Let Not The King Sin Against His Servant

Jonathan speaks up for David directly to Saul's face.

He calls David his servant, a term of loyalty, not weakness.

Killing an innocent man would be a sin against David and against God.

Jonathan is asking his father to see David the way he does.

🗣️ Jonathan defends David to Saul
🙇 Servant here means loyal, not weak
⚖️ Killing him would be real sin
📖 Jonathan asks Saul to see David rightly

## ✅ He Hath Not Sinned Against Thee

Jonathan states plainly that David has done Saul no wrong.

David's only offense has been success, not disloyalty.

Every action David has taken has actually helped Saul.

Jonathan is stripping away every excuse Saul might use to justify killing him.

✅ David has done Saul no wrong
🏆 His only offense is success
👍 His actions have all helped Saul
📖 Jonathan removes every excuse to kill him

## 🎲 He Did Put His Life In His Hand

This phrase is an idiom meaning David risked death willingly.

It describes David facing Goliath with no guarantee of survival.

The LORD wrought a great salvation for all Israel that day.

Jonathan reminds Saul that David's risk saved the whole nation, Saul included.

🎲 The idiom means risking death willingly
⚔️ It describes the fight with Goliath
🛡️ That risk saved the whole nation
📖 Saul himself was saved that day

## 🩸 Wilt Thou Sin Against Innocent Blood

Innocent blood is a phrase scripture uses for killing someone who did nothing wrong.

Jonathan names the killing plainly as bloodguilt, not justice.

He points out David has been given no real cause to die.

Jonathan does not soften the accusation.

Naming sin directly is his strongest argument.

🩸 Innocent blood means killing the guiltless
⚖️ Jonathan calls it bloodguilt plainly
❓ There was no real cause given
📖 Naming sin was his strongest argument

## 🤝 Saul Sware, As The LORD Liveth, He Shall Not Be Slain

Saul makes a formal oath using God's own name as its guarantee.

An oath sworn this way was considered unbreakable in this culture.

Saul is persuaded, at least for the moment, by his son's plea.

This same king still tries to kill David again within a few verses.

🤝 Saul swears a formal oath
📜 Oaths on God's name were unbreakable
😌 Saul is persuaded, for the moment
📖 He tries again within verses

## 🔄 As In Times Past

David returns to Saul's presence just as he did before the trouble began.

This phrase signals a real, if temporary, restoration between the two men.

Nothing about Saul's underlying jealousy has actually been solved.

Peace built only on a promise, without a changed heart, rarely lasts.

🔄 David returns to Saul's presence
🤝 It looks like real restoration
💔 Saul's jealousy remains unsolved
📖 A promise alone cannot fix a heart

# FirstSamuel 19:8-10
# 🗡️ The Javelin Flies Again
---
## ⚔️ There Was War Again

Fighting with the Philistines starts back up after the brief peace.

David returns to the battlefield exactly as he did before chapter eighteen began.

His success against the Philistines gave Saul's jealousy its first spark.

The same pattern that started the trouble is repeating itself.

⚔️ War with the Philistines resumes
🔁 David returns to the same role
🔥 His success first sparked Saul's jealousy
📖 The old pattern repeats

## 💪 Slew Them With A Great Slaughter

David defeats the Philistines decisively.

The Philistines flee before him in this battle.

Every battlefield success only feeds the fear already growing in Saul.

The better David does for Israel, the more dangerous Saul feels his own future is.

💪 David wins decisively again
🏃 The Philistines flee from him
😨 Success feeds Saul's fear
📖 Israel's gain feels like Saul's loss

## 😈 The Evil Spirit From The LORD Was Upon Saul

This tormenting spirit was already explained back in chapter sixteen.

It came as judgment after Saul's own disobedience, not senseless cruelty.

Earlier chapters call it the evil spirit "from God."

Here it is instead called the evil spirit "from the LORD."

Both phrases point to the same one true God.

😈 The tormenting spirit returns again
📜 Chapter sixteen explained its cause
🔁 God and LORD both name Him
📖 Only one true God is meant

## 🎯 Sought To Smite David Even To The Wall

Saul aims to pin David to the wall with the spear.

This detail shows a deliberate, targeted attack, not a wild swing.

David slips away just before the blow lands.

The javelin strikes the wall instead of him.

The same weapon that missed once in chapter eighteen misses him again.

🎯 Saul aims to pin David
🗡️ This was a deliberate attack
🏃 David slips away just in time
📖 The javelin misses him again

## 🌙 David Fled, And Escaped That Night

David leaves under cover of darkness.

He does not stay to confront Saul.

This begins the season of David's life spent constantly on the run.

He does not fight back or try to defend his position at court.

Survival, not confrontation, becomes David's strategy from this point forward.

🌙 David flees under cover of night
🏃 His life on the run begins
🛡️ He does not fight back
📖 Survival becomes his strategy

# FirstSamuel 19:11-13
# 🪟 Michal's Window Rescue
---
## 👮 Saul Also Sent Messengers Unto David's House

Saul escalates from a personal attack to an organized manhunt.

He sends men to watch David's own house overnight.

The plan targets the next morning, not a sudden rage.

This is now a calculated, official operation against David.

👮 Saul sends men to watch the house
🌙 The plan targets the morning
🧊 This is calculated, not sudden rage
📖 It is now an official operation

## ⚠️ If Thou Save Not Thy Life To Night

Michal, David's wife, warns him just as Jonathan did earlier in the chapter.

She tells him plainly that tomorrow he will be killed.

Michal is Saul's own daughter, and still she chooses David over her father.

A second member of Saul's own family now protects David instead of Saul.

⚠️ Michal warns David of danger
👧 She is Saul's own daughter
💗 She chooses David over her father
📖 A second family member protects him

## 🪟 Michal Let David Down Through A Window

David escapes by climbing down from a window instead of the door.

This detail shows the house was already being watched at every normal exit.

Rahab uses this exact same method to save the spies later in Joshua.

A window becomes the only way out for a man the powerful want dead.

🪟 David escapes through a window
🚪 The door was already watched
📜 Rahab later uses this same method
📖 A window becomes his only way out

## 🗿 Michal Took An Image, And Laid It In The Bed

The word here refers to a household idol figure called a teraphim.

Its presence in David's own house is a small detail scripture never explains.

Michal shapes the idol under the covers to look like a sleeping man.

She buys David time by making his absence harder to notice.

🗿 The image was a household idol figure
❓ Scripture never explains why it was there
🛏️ She shapes it to look like David
📖 It buys him time to flee

## 🐐 A Pillow Of Goats' Hair For His Bolster

Goat hair was often used to mimic the look of human hair from a distance.

A bolster is a long pillow placed at the head of a bed.

Michal adds this detail on purpose to complete the disguise.

Every small choice she makes here is aimed at buying David more time.

🐐 Goat hair mimicked human hair
🛏️ A bolster sat at the bed's head
🎭 The detail completed the disguise
📖 Every choice bought David more time

# FirstSamuel 19:14-17
# 🎭 The Disguise Is Uncovered
---
## 🤥 He Is Sick

Michal tells Saul's messengers a simple, believable lie to protect David.

A sick man in bed was a normal, unremarkable excuse in this culture.

The lie works on the first visit and buys David another day.

Michal is now actively deceiving her own father to save her husband.

🤥 Michal lies to protect David
🛏️ A sick man was a believable excuse
✅ The lie works the first time
📖 She deceives her father for David

## 🛏️ Bring Him Up To Me In The Bed, That I May Slay Him

Saul is no longer content to hear that David is sick.

He orders the sick man carried to him, bed and all.

This removes any doubt about Saul's real intentions toward David.

A king demanding a bedridden man be delivered for execution shows how far his anger has gone.

🛏️ Saul demands the bed be brought
🗡️ He wants to kill David himself
❌ There is no more room for doubt
📖 His anger has gone this far

## 🗿 There Was An Image In The Bed

The messengers finally pull back the covers and find the disguise.

David has already had enough time to escape completely.

The trick Michal built now falls apart in front of Saul's own men.

Buying time, not permanent deception, was always the actual goal.

🗿 The messengers find the idol instead
🏃 David is already long gone
🎭 The disguise finally falls apart
📖 Buying time was the real goal

## 😡 Why Hast Thou Deceived Me So

Saul confronts his own daughter directly about the trick.

He calls David his enemy, revealing exactly how he now sees him.

Michal is caught between protecting her husband and answering her furious father.

Her next words are chosen carefully to keep herself safe.

😡 Saul confronts Michal directly
👑 He calls David his enemy
⚖️ She is caught between the two men
📖 Her answer protects herself now

## 🤥 Why Should I Kill Thee

Michal tells Saul that David threatened her life if she did not help him.

This is very likely a second lie, since Michal was the one who planned the whole escape.

Claiming to be a victim protects Michal from her father's anger.

Even David's allies sometimes have to protect themselves with more than one lie.

🤥 Michal likely lies a second time
🗿 She was the one who planned it
🛡️ The lie protects her from Saul
📖 Even allies sometimes lie to survive

# FirstSamuel 19:18-20
# 🏛️ Refuge With Samuel At Naioth
---
## 🏛️ Came To Samuel To Ramah

David runs first to the prophet who anointed him back in chapter sixteen.

Ramah was Samuel's hometown and the base of his ministry.

David tells Samuel everything Saul has done to him.

For the first time in this chapter, David seeks spiritual counsel instead of just physical escape.

🏛️ David runs to Samuel first
📍 Ramah was Samuel's hometown
🗣️ David tells him everything
📖 He seeks counsel, not just escape

## 🏘️ He And Samuel Went And Dwelt In Naioth

Naioth was not a separate town, but a cluster of dwellings tied to Samuel's prophetic school.

The name likely means something close to "residences" or "dwellings."

David finds shelter inside a community built around hearing from God.

This is the safest place David has been since the chapter opened.

🏘️ Naioth means dwellings, not a town
🎓 It housed Samuel's prophetic school
🛡️ David finds real shelter there
📖 It is his safest place yet

## 🕵️ Behold, David Is At Naioth In Ramah

Saul's spies find David again despite his flight to Samuel.

Ramah sat only a short distance from Saul's own base at Gibeah.

Word travels quickly even to a supposedly safe hiding place.

Saul immediately sends men to take him.

He does not let the matter rest.

🕵️ Saul's spies locate David again
📍 Ramah was not far from Gibeah
📢 Word travels fast even in hiding
📖 Saul reacts immediately again

## 🕊️ The Spirit Of God Was Upon The Messengers Of Saul

Saul's men arrive intending to capture David by force.

Instead, seeing Samuel's company of prophets, they suddenly begin prophesying themselves.

This is the same Spirit of God, not the tormenting spirit troubling Saul.

God intervenes directly to stop the manhunt before it ever reaches David.

🕊️ God's Spirit overtakes the messengers
🎯 They came to capture David
🗣️ They prophesy instead of attacking
📖 God stops the manhunt himself

# FirstSamuel 19:21-24
# 😲 Even Saul Prophesies
---
## 🔁 He Sent Other Messengers, And They Prophesied Likewise

Saul tries again with a second group of men, assuming the first group simply failed.

The exact same thing happens to them as happened before.

Saul then sends a third group, and it happens a third time.

This repetition rules out any accident or coincidence.

🔁 Saul tries with a second group
🗣️ The same thing happens again
🔄 A third group meets the same fate
📖 Repetition rules out coincidence

## 🚶 He Came To A Great Well That Is In Sechu

Saul finally goes himself instead of sending more messengers.

Sechu was a small, otherwise unknown town near Ramah, marked here only by its well.

Wells were common public gathering and information points in this culture.

Saul asks directly for directions, showing his growing desperation to reach David.

🚶 Saul goes himself this time
📍 Sechu is only known by this well
💧 Wells were public gathering spots
📖 His desperation to reach David grows

## 🕊️ The Spirit Of God Was Upon Him Also

The same Spirit that overtook Saul's messengers now comes upon Saul himself.

He begins prophesying on the road before he even reaches Naioth.

The king sent to capture David is stopped by the same God David serves.

Even Saul cannot resist God's Spirit once it comes upon him.

🕊️ The Spirit overtakes Saul too
🚶 He prophesies before arriving
👑 Even the king cannot resist it
📖 God stops him personally

## 👑 He Stripped Off His Clothes Also, And Lay Down Naked

Saul removes his royal garments, the very symbols of his kingship.

Naked here likely means stripped down to an undergarment, not fully unclothed.

Either way, the humiliation of the moment is real.

He lies exposed before Samuel for a full day and night.

The king chasing David ends this scene utterly powerless instead.

👑 Saul strips off his royal clothes
😳 Naked here means deeply humiliated
🛌 He lies exposed a full day
📖 The hunter ends up powerless

## ❓ Is Saul Also Among The Prophets

This exact question was first asked back in chapter ten, right after Saul's anointing.

There, it marked a hopeful, surprising sign that God's Spirit was on a new king.

Here, the same words return as a proverb, now mocking his current disgrace.

The same phrase measures how far Saul has fallen from where he began.

❓ The same question appeared in chapter ten
✨ It first marked a hopeful sign
😳 It now marks Saul's disgrace
📖 It measures how far he has fallen
`.trim();

export const FIRST_SAMUEL_NINETEEN_PERSONAL_SECTIONS = parseFirstSamuelNineteenRawNotes(FIRST_SAMUEL_NINETEEN_RAW_NOTES);
