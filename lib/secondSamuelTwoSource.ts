export type SecondSamuelTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwoRawNotes(rawText: string): SecondSamuelTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 2:${startVerse}` : `2 Samuel 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWO_RAW_NOTES = `
# SecondSamuel 2:1-4
# 👑 David Becomes King Over Judah
---
## 📿 David Enquired Of The LORD

"Enquired" means David asked God for clear direction before making his next move.

He likely asked through the priest Abiathar, who had joined him carrying a priestly garment called an ephod.

That same ephod already helped David get answers back in 1 Samuel 23 and 30.

Saul, the king before him, had stopped asking God anything at all.

In his last battle, Saul turned to a medium instead.

David begins his reign doing the opposite of what ended Saul's.

📿 Enquired means asking God for direction
👤 Abiathar's ephod likely carried the answer
🚫 Saul had stopped asking God for guidance
📖 David starts where Saul's reign ended

## ⛰️ Unto Hebron

Hebron was an ancient city high in the hill country of Judah.

Abraham himself was buried there, in the cave of Machpelah, generations earlier.

The land around Hebron already belonged to Caleb's family, going back to Joshua's day.

God did not send David to a random town.

He sent him to the deepest root of Judah's own history.

⛰️ Hebron sits high in Judah's hill country
🪦 Abraham was buried there
🗺️ Caleb's family already held this land
📖 God rooted David in Judah's own history

## 👰 His Two Wives Also

Ahinoam and Abigail were not new additions to David's life.

Ahinoam came from Jezreel, a town in Israel's territory, a different place from the Jezreel where Saul later died.

Abigail had been married to a wealthy but foolish man named Nabal.

Nabal died, and she married David not long after, back in 1 Samuel 25.

Both women had already survived years on the run with David.

Now they walk into a city as a king's wives, not a fugitive's family.

👰 Ahinoam and Abigail were already David's wives
🏞️ Ahinoam came from a different Jezreel
🍇 Abigail once was married to Nabal
📖 Fugitive's wives now become a king's wives

## 🏕️ Every Man With His Household

This move was not a small band of soldiers traveling light.

David brought his entire following, wives, children, servants, and animals included.

Back in 1 Samuel 27, this group had numbered around six hundred fighting men, plus their families.

Moving to Hebron meant relocating an entire community, not just an army.

🏕️ This was a full community, not an army
👨‍👩‍👧‍👦 Wives, children, and servants all came
🔢 About six hundred men led this group
➡️ David's whole world moved to Hebron

## 👑 Anointed David King Over The House Of Judah

"Anointed" means oil was poured over David's head as a public sign that God had chosen him.

Samuel had already anointed David privately, years earlier in 1 Samuel 16.

This anointing is different because the men of Judah do it themselves, out in the open.

It makes David's kingship official and public, but only over one tribe so far.

The house of Judah means the tribe of Judah, not yet the whole nation of Israel.

🫗 Anointed means oil poured as a public sign
🔁 Samuel already anointed David privately once
👀 This time the anointing is public
📖 David rules Judah, not all Israel yet

## 🙏 The Men Of Jabeshgilead Buried Saul

Jabeshgilead was a town east of the Jordan River, in the region of Gilead.

Saul rescued this same town from a brutal enemy.

That rescue was his very first act as king, back in 1 Samuel 11.

Decades later, the town repaid that loyalty.

They recovered Saul's body after his death and gave him a proper burial, back in 1 Samuel 31.

David hears this news right as he becomes king himself.

🗺️ Jabeshgilead sat east of the Jordan
🛡️ Saul rescued this town as his first act
🙏 They returned the favor after Saul's death
📖 Loyalty answered loyalty, years apart

# SecondSamuel 2:5-7
# 🙏 David Honors Jabeshgilead
---
## 🙏 Blessed Be Ye Of The LORD

David opens with a formal blessing, calling on God to reward these men himself.

This is David's first act as king, and it is public gratitude, not a political order.

He publicly praises loyalty shown to Saul, the very king who once hunted him.

That says something about David's character before it says anything about strategy.

🙏 Blessed be ye means a formal thank you
👑 This is David's first act as king
🎯 He honors loyalty shown to his enemy Saul
📖 Gratitude comes before any political move

## 👑 Even Unto Saul

David still calls Saul his lord here, even though Saul is dead and David is king now.

He held that same respect back in 1 Samuel 24 and 26.

Twice there, he refused to kill Saul because Saul was still God's anointed king.

Respect for Saul's memory did not end when Saul's crown finally passed to David.

👑 David still calls Saul his lord
🚫 He twice spared Saul's life earlier
🤝 Respect did not end at Saul's death
📖 David honors the office, not just the man

## 🤝 Shewed This Kindness Unto Your Lord

"Shewed" is an old spelling of "showed."

"Kindness" here translates a Hebrew word often used for loyal, covenant style love.

Retrieving and burying a king's body at real risk was not a small favor.

David treats it as the serious act of loyalty it actually was.

📖 Shewed is an old spelling of showed
🤝 Kindness here means loyal, covenant style love
⚠️ Burying Saul's body carried real danger
➡️ David honors it as true loyalty

## 💰 I Also Will Requite You This Kindness

"Requite" means to pay back or repay.

David promises to personally reward the same loyalty they showed Saul.

He is signaling that loyalty to God's anointed king, whoever it is, will always be rewarded under his rule.

That message reaches far beyond just this one town.

💰 Requite means to pay back or repay
🤝 David promises a personal reward
📢 The message reaches beyond just Jabeshgilead
➡️ Loyalty to the king will be rewarded

## 💪 Let Your Hands Be Strengthened, And Be Ye Valiant

"Let your hands be strengthened" is an old idiom meaning take courage and stay strong.

Saul's death left Jabeshgilead without their former protector.

David is not just thanking them, he is also recruiting their loyalty for what comes next.

He announces his own new kingship in the very same breath.

💪 Strengthened hands means take courage
🛡️ Jabeshgilead lost their old protector in Saul
📢 David announces his own kingship here
➡️ Thanks and recruitment arrive in one message

# SecondSamuel 2:8-11
# ⚔️ Abner Crowns Ishbosheth
---
## ⚔️ Abner The Son Of Ner, Captain Of Saul's Host

"Host" is an old word for army.

Abner had commanded Saul's forces for years and already appeared several times back in 1 Samuel.

With Saul dead, Abner holds more real power than anyone left in Saul's family.

What Abner decides next will shape the whole nation's future.

⚔️ Host is an old word for army
👤 Abner already led Saul's army for years
💪 Abner now holds the real power
➡️ His next move shapes the nation

## 🗺️ Brought Him Over To Mahanaim

Mahanaim sat east of the Jordan River, in the region of Gilead.

That location kept Ishbosheth farther away from Philistine territory to the west.

Abner is protecting his chosen king here, not just relocating him.

This same city becomes important again later, when David himself flees there.

🗺️ Mahanaim sat east of the Jordan
🛡️ Distance kept Ishbosheth safer from Philistines
👤 Abner protects his chosen king here
📖 This city matters again later in David's story

## 📛 Ishbosheth The Son Of Saul

"Ishbosheth" likely means man of shame, possibly a later edited version of an earlier name.

Many scholars believe his original name may have honored a Canaanite god called Baal.

He was not present at the battle where his father and brothers died in 1 Samuel 31.

That absence is likely why he survived to be crowned here.

📛 Ishbosheth may mean man of shame
🔁 His original name may have honored Baal
🏃 He was absent from his father's final battle
📖 That absence is likely why he survived

## 🗺️ Made Him King Over All Israel

Judah, the largest and most powerful tribe, is missing from this list, since Judah already crowned David.

"All Israel" here really means the northern and eastern tribes still loyal to Saul's family.

Two kings now claim two separate territories inside one nation.

This split will not stay peaceful for long.

📜 Judah is missing from this list
🗺️ All Israel here means the other tribes
👑 Two kings now claim one nation
➡️ This split will not stay peaceful

## 🔢 Forty Years Old, And Reigned Two Years

Forty was old enough to rule on his own, yet Ishbosheth leans entirely on Abner throughout this account.

His reign lasts two years, far shorter than David's seven and a half years in Hebron mentioned two verses later.

Many scholars believe fighting between the two houses continued for years after Ishbosheth died.

That gap likely explains why the numbers do not fully line up.

🔢 Forty years old, but Abner truly ruled
📉 Only two years, far shorter than David's
❓ A likely gap explains the mismatch
📖 A fragile kingship from the very start

## ⚖️ But The House Of Judah Followed David

This one line draws the whole battle line for the chapters ahead.

Judah stands with David.

The rest of the tribes stand with Saul's remaining son.

One family, one nation, now split down the middle.

⚖️ Judah stands firmly behind David
🗺️ The other tribes stand behind Ishbosheth
💔 One nation now stands split in two
➡️ This division sets up years of conflict

## 🔢 Seven Years And Six Months

This detail will not make full sense until later in 2 Samuel.

David's total reign eventually adds up to forty years, first in Hebron, then in Jerusalem over the whole nation.

Seven and a half of those years are spent ruling only one tribe while a rival king sits nearby.

Patience, not speed, marks David's path to the full throne.

🔢 Seven and a half years just in Hebron
👑 David's full reign later totals forty years
⏳ Years pass before he rules the whole nation
📖 Patience marks David's road to the throne

# SecondSamuel 2:12-17
# 🏊 The Contest At The Pool Of Gibeon
---
## 🗺️ From Mahanaim To Gibeon

Gibeon sat in the territory of Benjamin, a natural meeting point between the two rival camps.

This same city already appears back in Joshua 9.

Its people once tricked Israel into a peace treaty by posing as travelers from far away.

Two armed camps now stand at the very place that once meant peace.

🗺️ Gibeon sat between the two rival camps
🤝 Joshua once made a peace treaty there
⚔️ This meeting is anything but peaceful
📖 A place of past peace hosts new conflict

## ⚔️ The Servants Of Ishbosheth, The Servants Of David

Neither Ishbosheth nor David personally appears on this battlefield.

Abner fights for one king and Joab fights for the other, while both actual kings stay away.

That pattern continues through the rest of this civil war.

👑 Neither king fights in this battle
⚔️ Abner and Joab do the fighting instead
🏠 Both kings stay away from the field
📖 Generals carry this war, not kings

## 👤 Joab The Son Of Zeruiah

Zeruiah was David's own sister, which makes Joab David's nephew.

This chapter introduces Joab as the commander of David's forces for the first time.

Two of his brothers, Abishai and Asahel, fight alongside him in the verses ahead.

Joab becomes one of the most important, and most ruthless, figures in David's entire reign.

👪 Zeruiah was David's own sister
👤 Joab is David's own nephew
⚔️ Joab now commands David's forces
📖 He becomes a major, ruthless figure ahead

## 🏊 The One On The One Side Of The Pool

Both armies face each other across the water instead of charging straight into battle.

That pause suggests neither commander wants to be the one who starts the fighting first.

The calm is only on the surface.

🏊 Both armies face off across the pool
⏸️ Neither side wants to strike first
😬 Calm surface, real tension underneath
➡️ A pause before something breaks it

## 🎭 Let The Young Men Now Arise, And Play Before Us

Abner is not proposing a game in the way that word sounds today.

He is proposing a formal combat contest, champion against champion, to settle things without a full battle.

This kind of contest appears elsewhere in the ancient world.

Armies sometimes used it to test each other before committing to full war.

🎭 Play here means a violent contest
⚔️ Champions fight instead of full armies
🌍 Ancient armies sometimes used this custom
➡️ Joab agrees to the proposal

## 🔢 Twelve Of Benjamin, And Twelve Of The Servants Of David

Choosing exactly twelve men from each side was probably not random.

Twelve was Israel's own number, tied to the twelve tribes descended from Jacob.

Picking matched pairs may have been meant to represent the whole nation in miniature.

🔢 Twelve matches Israel's twelve tribes
⚖️ Both sides send equal numbers
🎭 The fight represents the whole nation
📖 A small contest carrying a big symbol

## ⚔️ Caught Every One His Fellow By The Head

Each of the twenty four men grabs an opponent and strikes at the exact same moment.

Every single one of them dies together, with no side actually declared a winner.

The contest meant to prevent a larger battle succeeds only in killing twenty four young men for nothing.

⚔️ All twenty four men strike together
💀 Every one of them dies
🚫 No side wins the contest
📖 A pointless cost with no real result

## 📛 Helkathhazzurim, Which Is In Gibeon

This name likely means field of sharp edges or field of the strong men.

Naming a place after an event was common in the ancient world, turning geography into permanent memory.

Anyone who later heard this place named would remember exactly what happened there.

📛 The name likely means field of sharp edges
🗺️ Naming places preserved memory in this world
🪦 Twenty four men are remembered by this name
📖 A name that carries a warning

## ⚔️ A Very Sore Battle That Day

"Sore" is an old word for severe or intense, not physical soreness.

The champion contest fails to prevent anything, since a full battle breaks out right after it.

Abner's side loses this fight, which sets up the desperate chase in the rest of the chapter.

⚔️ Sore means severe, not sore muscles
🚫 The contest did not prevent a battle
📉 Abner's men lose this fight
➡️ This loss starts the chase ahead

# SecondSamuel 2:18-23
# 🏃 Asahel's Fatal Pursuit
---
## 👪 Joab, And Abishai, And Asahel

All three of Zeruiah's sons, David's own nephews, are named together here for the first time.

Joab already commands David's forces.

Abishai already appeared in 1 Samuel 26, when he wanted to kill sleeping Saul and David stopped him.

Asahel is introduced here for the first time, known first for his speed.

👪 All three are David's nephews
⚔️ Joab already leads David's army
🗡️ Abishai already appeared in 1 Samuel 26
📖 Asahel is introduced here, known for speed

## 🦌 As Light Of Foot As A Wild Roe

A "roe" is a small, fast wild deer.

This is a compliment describing real, exceptional speed.

The comparison sets up exactly why Asahel believes he can catch a seasoned warrior like Abner.

His speed becomes both his advantage and, soon, his downfall.

🦌 A roe is a small, fast wild deer
🏃 Asahel was known for real speed
💪 His speed makes this chase possible
📖 That same speed leads to his death

## 🎯 Turned Not To The Right Hand Nor To The Left

This phrase is an old way of describing single minded focus.

Asahel ignores every other target and chases only Abner.

That kind of tunnel vision reads as brave, but it also blinds him to the danger ahead.

🎯 The phrase means total, single focus
🏃 Asahel chases only Abner, nobody else
😤 Bravery here doubles as tunnel vision
➡️ Focus without caution becomes dangerous

## 👀 Art Thou Asahel?

Abner already knows the answer before he asks.

Nobody runs like Asahel, and Abner has clearly seen him fight before.

Asking the question anyway gives Asahel one honest chance to stop before things go further.

👀 Abner already recognizes Asahel's running
🗣️ He asks anyway to give a warning
⏳ This is Asahel's first real chance to stop
➡️ The question is a mercy, not confusion

## 🛡️ Turn Thee Aside, And Take Thee His Armour

Abner is not running out of fear here.

He offers Asahel an honorable alternative, take armor from an ordinary soldier instead of chasing a seasoned commander.

That would still count as a legitimate battle trophy, without forcing this exact confrontation.

Asahel refuses the offer and keeps chasing anyway.

🛡️ Abner offers an honorable alternative target
🏆 Any soldier's armor still counted as a trophy
🚫 Asahel refuses and keeps chasing
➡️ Pride overrides a real chance to walk away

## 👀 How Then Should I Hold Up My Face To Joab Thy Brother

"Hold up my face" is an old idiom meaning how could I look him in the eye.

Abner already knows Joab personally and respects him enough to dread this outcome.

He is warning Asahel that killing him will start a blood feud with his own brother.

That warning turns out to be exactly right.

👀 Hold up my face means look him honestly
🤝 Abner already knows and respects Joab
⚠️ He warns this will start a feud
📖 The warning comes true almost immediately

## 🗡️ Smote Him Under The Fifth Rib

This phrase describes a strike to the torso, not a precisely counted rib.

Abner strikes backward with the blunt end of his own spear, likely trying only to wound, not kill.

The blow proves fatal anyway, and Asahel dies exactly where he falls.

🗡️ Fifth rib refers to a torso wound
🔙 Abner strikes backward with the spear's blunt end
💀 The wound turns out to be fatal
📖 Even a defensive strike could not be undone

## 🛑 As Many As Came To The Place Stood Still

Soldiers chasing behind Asahel reach his body and simply stop moving.

A single death halts an entire army's momentum in the middle of a battle.

Grief and shock do that, even in the middle of a war.

🛑 Soldiers stop the instant they see him
⚔️ One death interrupts an entire chase
😔 Shock freezes even battle hardened men
➡️ A body in the road stops everything

# SecondSamuel 2:24-28
# 📯 Joab Calls Off The Chase
---
## 🗺️ The Hill Of Ammah, That Lieth Before Giah

These place names are not important on their own, but the level of detail matters.

Naming the exact hill shows this account came from someone who knew the ground firsthand.

The chase has carried both sides far from where the day began at Gibeon.

🗺️ Ammah and Giah mark the exact chase site
✍️ This detail suggests an eyewitness source
🏃 The chase has covered real distance
➡️ Nightfall is about to change everything

## 🌇 The Sun Went Down

Battles in this world usually paused once daylight ran out.

This detail signals that a natural stopping point has arrived, whether anyone calls for it or not.

The timing sets up the request Abner is about to make.

🌇 Nightfall usually paused ancient battles
⏳ A natural stopping point has arrived
🗣️ This sets up Abner's next words
➡️ Darkness gives both sides an opening

## 🏔️ The Children Of Benjamin Stood On The Top Of An Hill

Benjamin was Saul's own tribe, which explains why they rally so hard around his son's cause.

Taking the high ground gave the surviving soldiers a real defensive advantage if the chase continued.

Abner has regrouped just enough to make continuing costly for Joab's side too.

👪 Benjamin was Saul's own tribe
🏔️ High ground gave a real defense
🔁 Abner has regrouped his scattered men
➡️ Continuing the chase would now cost more

## ❓ Shall The Sword Devour For Ever?

This question sounds wise, but it comes from the very man who started the day's violence.

Abner proposed the deadly contest back in verse fourteen, and lost the battle that followed it.

Now that his own side is losing, he suddenly wants the killing to stop.

❓ Abner now asks for the fighting to end
🎭 He started this violence himself
📉 He asks only after losing
➡️ Convenient timing does not erase the question's truth

## 💔 It Will Be Bitterness In The Latter End

Abner is warning that this fighting will leave lasting resentment long after today ends.

Both sides share the same nation and the same God.

That makes this closer to a civil war than a foreign battle.

His warning turns out to describe the years of conflict that follow this exact chapter.

💔 Bitterness will outlast today's fighting
🇮🇱 Both sides belong to the same nation
⚔️ This is civil war, not a foreign one
📖 His warning describes what actually follows

## 👪 Return From Following Their Brethren

"Brethren" means brothers, and Abner uses that word for men fighting on Joab's side.

He is reminding Joab that the soldiers on both sides belong to the same twelve tribes.

Calling them brothers instead of enemies is itself an argument for stopping.

👪 Brethren means brothers, not enemies
🇮🇱 Both armies come from the same tribes
🗣️ The word itself argues for peace
➡️ Abner appeals to shared identity, not fear

## 🗣️ Unless Thou Hadst Spoken

Joab admits plainly that his men were ready to keep fighting straight through until morning.

Abner's words are the only reason he calls off the pursuit right now.

Joab does not pretend otherwise or claim credit for mercy he did not choose first.

Whatever his real motive, the fighting actually stops because of this exchange.

🗣️ Joab admits the chase would have continued
🛑 Abner's words are what stopped it
🤝 Joab does not hide this fact
➡️ The exchange itself ends the pursuit

## 📯 Joab Blew A Trumpet

A trumpet, likely a ram's horn, was the standard way to send a command across a noisy battlefield.

No single voice could reach that many scattered soldiers at once.

One sound ends the entire day's chase for every soldier under Joab.

📯 A trumpet was likely a ram's horn
📢 It sent commands across a whole battlefield
🛑 One signal stopped every soldier at once
➡️ The chase ends the moment it sounds

# SecondSamuel 2:29-32
# 🪦 Counting The Cost
---
## 🌙 Walked All That Night Through The Plain

Abner's men do not stop to rest even after the fighting ends.

They march through the night, crossing the Jordan River and the region of Bithron to reach safety at Mahanaim.

A truce did not erase real fear of what Joab's men might still do.

🌙 Abner's men march through the whole night
🏞️ They cross the Jordan River for safety
😨 A ceasefire did not erase real fear
➡️ Distance still felt safer than trust

## 📖 Went Through All Bithron

This name shows up nowhere else in the entire Bible.

It likely describes a ravine or a district in the region east of the Jordan.

Whatever else is unclear, the route confirms Abner's men pushed hard and fast to reach safety.

📖 Bithron appears only this one time in scripture
🗺️ It likely names a ravine or region
🏃 The route shows a fast, hard retreat
➡️ Every detail confirms real urgency

## 🔢 There Lacked Of David's Servants Nineteen Men And Asahel

"Lacked" here means killed or missing, not simply absent.

Asahel gets counted separately from the other nineteen, even though he is just as dead as they are.

That separate mention shows how much his death mattered to the men telling this story.

📖 Lacked means killed, not just missing
🔢 Nineteen men died on David's side
👤 Asahel is named apart from the rest
➡️ His death carried extra weight for the writer

## ⚖️ Three Hundred And Threescore Men Died

"Threescore" is an old word for sixty, making this number three hundred sixty.

David's side loses twenty men total, while Abner's side loses over seventeen times that many.

The lopsided numbers show David's men were the far stronger fighting force that day.

🔢 Threescore means sixty, so this totals 360
⚖️ Abner's losses were seventeen times worse
💪 David's side proves the stronger force
📖 One battle already signals who is winning

## 🪦 Buried Him In The Sepulchre Of His Father

A "sepulchre" is a family burial place, often a cave or carved tomb.

Bethlehem was not just any town, it was David's own family hometown.

Asahel was David's nephew, so this burial is personal grief, not just a military report.

🪦 A sepulchre is a family burial place
🏡 Bethlehem was David's own hometown
👪 Asahel was David's own nephew
📖 This loss was personal, not just military

## 🌅 They Came To Hebron At Break Of Day

Joab's men march through an entire second night, this time carrying grief instead of victory.

The chapter ends back in Hebron, exactly where it began.

Hebron now holds a fresh grave instead of just a new throne.

This is the first blood of a war between two houses that will not end quickly.

🌅 They arrive at Hebron by morning
🔁 The chapter ends where it started
⚰️ Hebron now holds grief, not just a crown
📖 Only the first blood of this conflict
`.trim();

export const SECOND_SAMUEL_TWO_PERSONAL_SECTIONS = parseSecondSamuelTwoRawNotes(
  SECOND_SAMUEL_TWO_RAW_NOTES,
);
