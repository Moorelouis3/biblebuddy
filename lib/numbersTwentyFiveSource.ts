export type NumbersTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyFiveRawNotes(rawText: string): NumbersTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 25:${startVerse}` : `Numbers 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 25 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_FIVE_RAW_NOTES = `# Numbers 25:1-3
# 🐂 Israel Joins Baalpeor
---
## 🏕️ Israel Abode In Shittim

"Abode" means the people were staying in one place, not passing through.

Shittim sat on the plains of Moab, just across the Jordan from Jericho.

This was Israel's last camp before entering the promised land.

Balaam had just failed three times to curse Israel from this same region.

What his curses could not do from outside, this chapter shows happening from within.

🏕️ Abode means they stayed in place

🗺️ Shittim sat near Jericho and the Jordan

🔮 Balaam had just failed to curse them here

📖 The threat now comes from inside the camp
---
## 💔 Began To Commit Whoredom With The Daughters Of Moab

This does not mean a single isolated incident.

"Whoredom" describes ongoing sexual sin that spread through the camp.

The Bible often uses this same word for spiritual unfaithfulness to God.

Both meanings are true here at the same time.

Numbers thirty one later reveals Balaam himself suggested this exact plan to Balak.

What cursing could not accomplish, seduction almost did.

💔 Whoredom means ongoing sin, not one moment

🪞 The word also pictures unfaithfulness to God

🎯 Numbers thirty one names this as Balaam's plan

📖 Seduction succeeded where cursing had failed
---
## 🍽️ Called The People Unto The Sacrifices Of Their Gods

"Sacrifices" here means ritual meals offered to a foreign god.

The Moabite women invited Israelite men to join these meals.

Eating this kind of meal was itself an act of worship.

The invitation was religious, not just social.

Sin opened the door, but idolatry is what walked through it.

🍽️ Sacrifices means meals offered in worship

👋 Moabite women issued the invitation

🙏 Eating the meal counted as worship

📖 Sin led straight into idolatry
---
## 🙇 Did Eat, And Bowed Down To Their Gods

Israelite men did not stumble into this by accident.

Eating the sacrifice and bowing down were two separate acts.

Both together formed a complete act of worship to a false god.

This directly broke the first of the Ten Commandments.

Nothing about it was hidden or confused.

🍽️ Eating and bowing were both worship

🚫 This broke the first commandment directly

👥 Many Israelite men took part openly

📖 The sin was clear, not accidental
---
## ⚡ Israel Joined Himself Unto Baalpeor

"Baalpeor" means the god Baal as worshiped at the region of Peor.

"Joined himself" is the same kind of language used for marriage.

Israel is pictured here as binding itself to this false god.

A people already bound to the LORD by covenant now bind themselves elsewhere.

That divided loyalty is exactly what breaks the relationship.

⚡ Baalpeor was Baal worshiped near Peor

💍 Joined himself uses marriage covenant language

🔗 Israel bound itself to a false god

📖 Divided loyalty breaks a covenant
---
## 🔥 The Anger Of The LORD Was Kindled Against Israel

God's anger here is not a random outburst.

It is the response of a covenant partner watching His people turn away.

This happens right before Israel is set to enter the promised land.

"Kindled" pictures a fire being lit, not a sudden mood that quickly fades.

This anger sets up everything that follows in the rest of the chapter.

🔥 Kindled pictures a fire being lit

💔 This is covenant anger, not a mood

🚪 It happens right before entering Canaan

📖 It sets up the rest of the chapter
# Numbers 25:4-5
# ⚖️ The Judges Are Ordered To Act
---
## 👑 Take All The Heads Of The People

"Heads" here means the leaders and chiefs of Israel.

This is not a command to punish the whole nation.

These leaders were responsible for what happened under their watch.

God addresses the failure at the leadership level first.

Guilt starts with the people who were supposed to guard against it.

👑 Heads means Israel's tribal leaders

🧭 Not a command against the whole nation

🛡️ Leaders were responsible for guarding the camp

📖 Guilt starts at the leadership level
---
## ☀️ Hang Them Up Before The LORD Against The Sun

This describes a public execution followed by public display of the bodies.

It happened in open daylight, not hidden away.

Ancient Near Eastern justice often used this to make guilt visible to everyone.

The display was meant to be seen by the whole community.

Public sin was answered with a public response.

☀️ Against the sun means in open daylight

👁️ The bodies were displayed publicly

🏛️ This was ancient public justice

📖 Public sin got a public response
---
## 🌡️ That The Fierce Anger Of The LORD May Be Turned Away

Removing the guilty leaders is presented as the way to stop the anger from spreading.

This is not only about punishing wrongdoing.

It is also about protecting everyone else still in the camp.

Leaving the sin unanswered would have put the whole nation at risk.

Justice here doubles as protection for the community.

🌡️ Removing guilt was meant to stop the anger

🛡️ This protected the rest of the nation

⚖️ Justice and protection worked together here

📖 Unanswered sin would have spread further
---
## 🗣️ Moses Said Unto The Judges Of Israel

"The judges" refers to leaders Moses appointed back in Exodus eighteen.

They were set over groups of a thousand, a hundred, fifty, and ten.

This system let Moses delegate instead of judging every case himself.

He calls on that same structure now, in a moment of crisis.

The chain of leadership built earlier is what handles this emergency.

🗣️ Judges were leaders from Exodus eighteen

📋 They oversaw groups from a thousand to ten

🤝 Moses delegated instead of acting alone

📖 An earlier system now handles a crisis
---
## ⚔️ Slay Ye Every One His Men That Were Joined Unto Baalpeor

This order is spread across many leaders, not centralized in one person.

Each judge is responsible only for the guilty men in his own group.

No single person has to judge the whole nation alone.

Responsibility for this crisis is shared across all of Israel's leadership.

The structure keeps the response organized instead of chaotic.

⚔️ Each judge handles his own group

🧩 Responsibility is shared, not centralized

👥 All of Israel's leadership takes part

📖 Shared responsibility keeps justice organized
# Numbers 25:6-9
# 🗡️ Phinehas Stops The Plague
---
## 😱 Brought Unto His Brethren A Midianitish Woman

This man does not sin quietly.

He brings a Midianite woman openly among his own people.

This happens while judgment for the same sin is already underway.

It is a bold act of defiance, not a hidden affair.

The timing makes the act even more shocking.

😱 An open act, not a secret one

🌍 A Midianite woman, showing Moab was not alone

🔥 Judgment was already underway when this happened

📖 Defiance in the middle of a crisis
---
## 👀 In The Sight Of Moses, And In The Sight Of All The Congregation

Repeating "in the sight of" twice stresses just how public this was.

It happened directly in front of Moses.

It also happened in front of the entire assembled nation.

Nothing about this act was hidden from anyone.

The boldness of the act is the point being made.

👀 Repetition stresses total visibility

🎭 Done in front of Moses himself

🏛️ Done in front of the whole nation

📖 Boldness itself was the message
---
## 😢 Weeping Before The Door Of The Tabernacle Of The Congregation

This detail is not filler.

While one man defies God openly, the rest of Israel is mourning.

They are gathered specifically at the entrance to the tabernacle.

They are pleading with God over the plague and the sin in the camp.

One man's defiance sits right next to everyone else's grief.

😢 The nation mourns at the same moment

🏛️ They gather at the tabernacle entrance

🙏 They plead with God over the plague

📖 Defiance and grief sit side by side
---
## 👨‍👦 Phinehas, The Son Of Eleazar, The Son Of Aaron The Priest

This genealogy places Phinehas three generations into the priestly line.

Aaron was his grandfather, and Eleazar was his father.

This detail is not just background information.

It explains why what happens next connects to a promise later in the chapter.

His family line and his action are linked from the very start.

👨‍👦 Three generations of priests are named

📜 Aaron, then Eleazar, then Phinehas

🔗 His line connects to a later promise

📖 Priesthood and action are linked here
---
## 🔱 Took A Javelin In His Hand

A javelin was a short throwing spear, a real weapon.

Phinehas acts here on his own initiative.

Moses had not given this specific order in the moment.

His response is sudden and personal, not a command he was following.

Personal zeal is driving an immediate decision.

🔱 A javelin was a real throwing spear

🏃 No direct order came from Moses

⚡ The response was sudden and personal

📖 Zeal drove an immediate decision
---
## ⛺ He Went After The Man Of Israel Into The Tent

"The tent" likely means a private tent, not the tabernacle courtyard.

The couple had gone there, possibly near the tabernacle area itself.

Phinehas pursues them rather than confronting them in the open crowd.

The act itself happened out of sight, even though the offense had not.

He chooses to follow rather than to wait.

⛺ The tent was likely a private space

🚶 Phinehas pursued rather than waited

🙈 The act was hidden, the offense was not

📖 He chose to follow, not to wait
---
## 💥 The Woman Through Her Belly

This graphic detail is not included for shock value alone.

Striking through the woman's body ties the punishment to the sin itself.

Ancient readers would have understood that connection clearly.

The act is swift and decisive, carried out in a single motion.

Nothing about the punishment is vague or symbolic only.

💥 A specific detail, not a vague description

🎯 Tied directly to the nature of the sin

⚡ Carried out in one swift motion

📖 Decisive justice, not delayed punishment
---
## 🛑 So The Plague Was Stayed From The Children Of Israel

"Stayed" means stopped, not merely slowed down.

The plague itself was a direct act of God's judgment on the camp.

It was likely a sudden and deadly illness spreading through the people.

Phinehas's action is what stops it from spreading any further.

One decisive act ends a judgment that was already killing people.

🛑 Stayed means stopped, not slowed

⚡ The plague was a divine judgment

✋ One act stopped it from spreading

📖 Sin and consequence are linked directly
---
## 🔢 Those That Died In The Plague Were Twenty And Four Thousand

Twenty four thousand is one of the largest death tolls in the book of Numbers.

About three thousand people died after the golden calf in Exodus thirty two.

This plague killed far more than that earlier judgment.

The scale shows how seriously God treated this specific sin.

First Corinthians later points back to this event as a warning.

🔢 Twenty four thousand died in this plague

📉 Far more than the golden calf's toll

⚠️ The scale shows how serious this sin was

📖 First Corinthians uses this as a warning
# Numbers 25:10-13
# 🕊️ The Covenant Of Peace
---
## 🙌 Hath Turned My Wrath Away From The Children Of Israel

God speaks directly here, personally crediting what Phinehas did.

This is not a human guess about what pleased God.

It turns what could look like uncontrolled violence into something God calls right.

God Himself confirms that the wrath has actually stopped.

Divine approval settles any doubt about the act.

🙌 God personally credits Phinehas here

✅ This is divine approval, not a guess

🛡️ It confirms the act was justice

📖 God settles any doubt Himself
---
## 🔥 He Was Zealous For My Sake Among Them

"Zealous" describes an intense, protective devotion to God's honor.

The same root word describes God's own jealousy later in this same verse.

Phinehas cared about God's reputation more than his own safety.

This word choice links Phinehas's heart directly to God's own character.

Protecting God's name mattered more to him than the risk he took.

🔥 Zealous means intense devotion to God

🪞 The same word describes God's jealousy

🛡️ God's honor mattered more than safety

📖 His heart mirrors God's own character
---
## 💛 That I Consumed Not The Children Of Israel In My Jealousy

This jealousy does not mean insecurity.

The same word describes God in Exodus twenty, calling Him a jealous God.

It describes a covenant partner refusing to share loyalty with a false god.

God's holiness makes divided loyalty something He cannot ignore.

This jealousy is what nearly consumed the whole nation.

💛 Jealousy here is not insecurity

📜 Exodus twenty uses this same word

💍 It is covenant loyalty, not pettiness

📖 Divided loyalty cannot be ignored
---
## 📜 I Give Unto Him My Covenant Of Peace

"Peace" here translates the Hebrew word shalom.

It means wholeness and right standing, not just the absence of conflict.

This is a specific, named covenant given personally to Phinehas.

It stands apart from the general priesthood already given to Aaron's family.

A personal reward is added on top of what he already had.

📜 A specific covenant, not a vague blessing

☮️ Peace means shalom, real wholeness

👑 Distinct from the general priesthood

📖 A personal reward on top of his role
---
## ♾️ His Seed After Him, Even The Covenant Of An Everlasting Priesthood

This promise reaches far beyond Phinehas himself.

It extends permanently to his descendants after him.

Zadok, the high priest during Solomon's reign, later traces his line back to Phinehas.

One act of zeal ends up shaping the priesthood for centuries.

A single moment in this chapter echoes for generations.

♾️ The promise passes to his descendants

👑 Zadok later descends from this line

🏛️ It shapes the priesthood for centuries

📖 One moment echoes for generations
---
## ⚖️ He Was Zealous For His God, And Made An Atonement

"Atonement" does not normally describe an act of violence.

The word usually names a priest's ritual sacrifice instead.

Here, Phinehas's zeal is described as accomplishing what a sacrifice usually does.

It turns away God's wrath the same way a sacrifice would.

This is an unusual pairing of action and priestly language.

⚖️ Atonement usually names a ritual sacrifice

🩸 His zeal functioned the same way

🔥 It turned away God's wrath

📖 An unusual pairing of action and ritual
# Numbers 25:14-15
# 📛 The Names Behind The Story
---
## 🏷️ Was Zimri, The Son Of Salu

The text finally names the man from verse six.

He is not left as a nameless sinner.

Naming him, along with his father Salu, marks him as someone remembered.

The Bible does not let this stay anonymous.

A name attached to the story makes the account harder to dismiss.

🏷️ The man is finally named here

👤 His father Salu is named too

📜 This marks a real remembered event

📖 The Bible refuses to leave him anonymous
---
## 👑 A Prince Of A Chief House Among The Simeonites

"Prince" here was a formal title for a tribal leader.

The same title appears for tribal leaders back in Numbers one.

Zimri was not a random Israelite but a leader in the tribe of Simeon.

A leader taking part in this sin makes the offense far worse.

Numbers twenty six later shows Simeon's tribe shrinking sharply after this event.

👑 Prince was a formal tribal title

📋 The same title appears in Numbers one

📉 Simeon's tribe shrinks in the next census

📖 A leader's sin made this worse
---
## 🏷️ Was Cozbi, The Daughter Of Zur

The Midianite woman is named just as specifically as Zimri.

She is identified through her father, Zur.

This was not a random encounter between two strangers.

Both people involved came from prominent families on their own sides.

Naming both of them shows how high this reached.

🏷️ Cozbi is named just as specifically

👨‍👧 She is identified through her father Zur

👑 Both families held real status

📖 This reached into leadership on both sides
---
## 👑 He Was Head Over A People, And Of A Chief House In Midian

Zur was a ranking Midianite leader, not just an ordinary family head.

Numbers thirty one later lists a king named Zur among Midian's rulers.

That king is killed when Israel goes to war over this very incident.

This event reaches all the way up to Midian's royal leadership.

What looked like one couple's sin involved rulers on both sides.

👑 Zur held real rank in Midian

⚔️ A king named Zur dies later on

🌍 The war traces back to this event

📖 Royal leadership was involved on both sides
# Numbers 25:16-18
# ⚔️ The Command Against Midian
---
## 🎯 Vex The Midianites, And Smite Them

The target shifts specifically to Midian here.

Moab was the nation involved at the start of this chapter.

This command sets up the full military campaign against Midian in Numbers thirty one.

Midian is named for the coming judgment, not Moab.

The story is not finished when this chapter ends.

🎯 The focus narrows onto Midian here

📖 Numbers thirty one carries out this command

🔀 Moab started it, Midian is judged

➡️ This chapter sets up a later war
---
## 🕸️ For They Vex You With Their Wiles

"Wiles" means a deliberate, cunning scheme.

This was not a misunderstanding or an accident.

Numbers thirty one later confirms this plan came from Balaam's own advice to Balak.

What looked like temptation was really a calculated attack.

The seduction in this chapter had a strategist behind it.

🕸️ Wiles means a deliberate scheme

🎯 Numbers thirty one names Balaam's advice

🧠 This was calculated, not accidental

📖 A strategist stood behind the temptation
---
## 😔 Beguiled You In The Matter Of Peor

"Beguiled" means deceived or led astray.

This phrase ties the whole chapter back to the place named Peor.

It also ties back to the god Baalpeor introduced at the start of the chapter.

The chapter closes by naming exactly what happened and why.

Nothing about the ending is left vague.

😔 Beguiled means deceived or led astray

🔗 This connects back to Peor and Baalpeor

📜 The chapter closes by naming the cause

📖 Nothing here is left unexplained
---
## 👪 The Daughter Of A Prince Of Midian, Their Sister

Calling Cozbi their sister stresses how deeply this reached into Midian's leadership.

This was not carried out by outsiders with no standing.

It was connected to Midian's ruling families themselves.

The final verse confirms just how deliberate this scheme really was.

The chapter ends by tying the sin directly to the people who planned it.

👪 Their sister ties her to Midian's rulers

🏛️ Midian's own leadership was involved

🎯 This confirms the scheme was deliberate

📖 The plan is tied to its planners
`.trim();

export const NUMBERS_TWENTY_FIVE_PERSONAL_SECTIONS = parseNumbersTwentyFiveRawNotes(NUMBERS_TWENTY_FIVE_RAW_NOTES);
