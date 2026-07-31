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
Shittim was Israel's last camp before crossing the Jordan into Canaan, on the plains east of the river across from Jericho. The name means "acacia trees," the same tough desert wood used to build the tabernacle and the ark.

This is the exact spot where Balaam had just failed three times to curse Israel in the last three chapters. What his oracles couldn't do from the outside, this chapter shows happening from the inside instead.

🏕️ Shittim was Israel's final camp before entering Canaan
🌳 The name means "acacia trees," the wood used in the tabernacle
🔑 Right after Balaam's blessings fail, a different kind of attack begins

## 💔 Began To Commit Whoredom With The Daughters Of Moab
This starts as literal sexual sin between Israelite men and Moabite women, but the Bible often uses this same word for spiritual unfaithfulness to God, and both meanings apply here at once.

Numbers 31:16 later reveals this wasn't random — Balaam himself advised Balak to use Moabite and Midianite women to lure Israel into sin, since cursing them directly had failed.

💔 Literal sexual sin, but also a picture of unfaithfulness to God
🎯 Numbers 31:16 later reveals this was Balaam's own plan
🔑 What cursing couldn't do, seduction almost did

## 🍽️ Called The People Unto The Sacrifices Of Their Gods
The Moabite women didn't just tempt Israel sexually — they invited Israelite men to religious feasts built around Baal worship, meals eaten as part of pagan sacrifice rituals.

🍽️ These were pagan religious feasts, not just ordinary meals
🙏 Sexual sin and idol worship arrive together, not separately
🔑 One invitation led straight into breaking the first commandment

## 🙇 Did Eat, And Bowed Down To Their Gods
Eating meat offered to a false god and then physically bowing down to it was a complete act of worship, not an accident or a misunderstanding. Israelite men fully participated.

🙇 Eating the sacrifice and bowing down were both acts of worship
🚫 Direct violation of the very first of the Ten Commandments
🔑 Not a slip — a real, physical act of worshiping another god

## ⚡ Israel Joined Himself Unto Baalpeor
Baalpeor means "Baal of Peor," a local version of the Canaanite storm-and-fertility god Baal, worshiped at Mount Peor. "Joined himself" is covenant language, the same kind of word used for marriage — Israel is pictured as binding itself to this false god.

⚡ Baalpeor was a local Baal god tied to the region of Peor
💍 "Joined himself" uses marriage-covenant language
🔑 A covenant people binding themselves to the wrong god

## 🔥 The Anger Of The LORD Was Kindled Against Israel
This sets up everything that follows in the chapter. God's anger here isn't a random outburst — it's the response of a covenant partner watching the people He rescued from Egypt hand themselves over to another god at the finish line before Canaan.

🔥 God's anger responds to a broken covenant, not a random mood
🚪 This happens right before Israel is set to enter the Promised Land
🔑 Sets up the plague and everything else in this chapter

# Numbers 25:4-5
# ⚖️ The Judges Are Ordered To Act
---
## 👑 Take All The Heads Of The People
"Heads" here means the leaders and chiefs of Israel, the ones responsible for letting this happen under their watch — not a command to kill everyone in the whole nation.

👑 "Heads" means the tribal leaders, not the whole population
🧭 These are the ones responsible for guarding the people
🔑 Leadership failure gets addressed at the leadership level first

## ☀️ Hang Them Up Before The LORD Against The Sun
This means a public execution followed by public display of the bodies in open daylight — a serious ancient Near Eastern practice meant to visibly turn back a nation's guilt in the eyes of both God and the watching community.

☀️ A public execution and display, not a private punishment
👁️ Meant to be seen clearly by the whole community
🔑 Public sin gets a public response

## 🌡️ That The Fierce Anger Of The LORD May Be Turned Away
Executing the guilty leaders is presented as the way to stop the LORD's anger from spreading further across the whole camp — dealing directly with the source of the sin to protect everyone else.

🌡️ Removing the guilty parties is meant to stop the anger from spreading
🛡️ A protective move for the rest of the nation
🔑 Justice here is also about limiting the damage

## 🗣️ Moses Said Unto The Judges Of Israel
These are the same judges set up back in Exodus 18 and Numbers 11 — leaders appointed over groups of a thousand, a hundred, fifty, and ten, so Moses wouldn't have to handle every case alone.

🗣️ These are the judges from the system set up in Exodus 18
📋 Leaders over groups of a thousand down to ten
🔑 Moses delegates instead of trying to act alone

## ⚔️ Slay Ye Every One His Men That Were Joined Unto Baalpeor
The order is decentralized on purpose — each judge is responsible for dealing with the guilty men from their own group, rather than one person trying to judge the whole nation at once.

⚔️ Each judge handles the guilty men from his own group
🧩 A decentralized response instead of one central trial
🔑 Shared responsibility across all of Israel's leadership

# Numbers 25:6-9
# 🗡️ Phinehas Stops The Plague
---
## 😱 One Of The Children Of Israel... Brought Unto His Brethren A Midianitish Woman
This man doesn't sin quietly — he brings a Midianite woman openly among his own people, in plain view, while judgment is already underway. It's a shocking act of defiance, not a hidden affair.

😱 An open, public act, not a secret sin
🌍 A Midianite woman now, showing the problem reaches beyond Moab
🔑 Defiance in the middle of a national crisis

## 👀 In The Sight Of Moses, And In The Sight Of All The Congregation
The text repeats "in the sight of" to hammer home just how public this was — done directly in front of Moses and the entire assembled nation, not hidden from anyone.

👀 Repeated twice for emphasis: everyone saw it happen
🎭 Total disregard for both Moses and the whole community
🔑 The boldness of the act is the point being made

## 😢 Weeping Before The Door Of The Tabernacle Of The Congregation
While this act of defiance is happening, the rest of Israel is gathered at the tabernacle entrance, mourning and pleading with God over the plague and the sin in the camp — the sharpest possible contrast.

😢 The nation is mourning at the very same moment
🏛️ Gathered specifically at the tabernacle's entrance
🔑 One man's defiance right next to everyone else's grief

## 👨‍👦 Phinehas, The Son Of Eleazar, The Son Of Aaron The Priest
This genealogy matters. Phinehas is Aaron's grandson through Eleazar — third in the priestly line — which is exactly why what he does next connects directly to a promise about the priesthood.

👨‍👦 Aaron, then Eleazar, then Phinehas — three generations of priests
📜 His family line explains the covenant given to him later in the chapter
🔑 Priesthood and this specific act are linked from the start

## 🏃 He Rose Up... And Took A Javelin In His Hand
Phinehas acts on his own initiative here — Moses hadn't given this specific order. His response is sudden and personal, not a command he was following in the moment.

🏃 A spontaneous action, not a direct order from Moses
🔱 A javelin, a short throwing spear, not a ceremonial object
🔑 Personal zeal driving an immediate decision

## ⛺ He Went After The Man Of Israel Into The Tent
"The tent" likely refers to a private tent where the couple had gone, possibly close to the tabernacle area itself given how publicly this whole scene played out.

⛺ A private tent, separate from the public tabernacle courtyard
🚶 Phinehas pursues them rather than confronting them where they stood
🔑 The act itself was hidden, even though the offense was not

## 💥 Thrust Both Of Them Through... The Woman Through Her Belly
This graphic detail isn't included for shock value alone — striking through the woman's body specifically ties the punishment directly to the act of sin itself, a detail ancient readers would have understood clearly.

💥 A specific, graphic detail rather than a vague description
🎯 Directly tied to the nature of the sin committed
🔑 Swift, decisive justice carried out in a single motion

## 🛑 So The Plague Was Stayed From The Children Of Israel
The plague here is a direct act of God's judgment, likely a sudden and deadly illness spreading through the camp. Phinehas's action is what stops it from continuing to spread.

🛑 A divine plague, not a natural illness alone
✋ One decisive act stops it from spreading further
🔑 The connection between sin and consequence is made explicit

## 🔢 Those That Died In The Plague Were Twenty And Four Thousand
This is one of the largest single death tolls recorded in the book of Numbers — for comparison, about 3,000 died after the golden calf incident back in Exodus 32:28. The scale shows how seriously God treated this specific sin.

🔢 24,000 dead — far more than the golden calf's 3,000
📖 1 Corinthians 10:8 later references this event as a warning
🔑 One of the most severe single judgments in the whole book

# Numbers 25:10-13
# 🕊️ The Covenant Of Peace
---
## 🙌 Phinehas... Hath Turned My Wrath Away
God speaks directly here, personally approving what Phinehas did. This is important — it turns what could look like uncontrolled violence into an action God Himself calls right and necessary.

🙌 God personally credits Phinehas with stopping His wrath
✅ Divine approval, not just human praise
🔑 Confirms the act was justice, not vigilante violence

## 🔥 Zealous For My Sake Among Them
"Zealous" describes an intense, protective devotion to God's honor — the same root word used for God's own "jealousy" later in this same verse. Phinehas cared about God's reputation more than his own safety.

🔥 "Zealous" means an intense devotion to God's honor
🪞 Uses the same root word as God's own jealousy
🔑 Protecting God's name mattered more to him than personal risk

## 💛 That I Consumed Not The Children Of Israel In My Jealousy
God describes His own jealousy here — the same word used in Exodus 20:5 calling Him "a jealous God." This isn't insecurity; it's the reaction of a covenant partner refusing to share loyalty with a false god.

💛 God's "jealousy" echoes Exodus 20:5's Ten Commandments language
💍 Covenant jealousy, not petty human jealousy
🔑 God's holiness makes divided loyalty impossible to ignore

## 📜 I Give Unto Him My Covenant Of Peace
This is a specific, named covenant — "peace" here means shalom, wholeness and right standing with God — given personally to Phinehas, distinct from the general priesthood already given to Aaron's family.

📜 A specific covenant, not just a general blessing
☮️ "Peace" here means shalom — wholeness, not just an absence of conflict
🔑 A personal reward on top of the priesthood he already had

## ♾️ His Seed After Him, Even The Covenant Of An Everlasting Priesthood
This promise extends to Phinehas's descendants permanently. Zadok, the high priest during Solomon's reign, actually traces his line back to Phinehas — this promise plays out for centuries.

♾️ A permanent promise, passed down through his descendants
👑 Zadok, Solomon's high priest, later descends from this line
🔑 One act of zeal shapes the priesthood for generations

## ⚖️ Because He Was Zealous For His God, And Made An Atonement
Calling Phinehas's action an "atonement" is unusual — that word normally describes a priest's ritual sacrifice, not a violent act. Here, his zeal itself is described as accomplishing what a sacrifice usually does: turning away God's wrath.

⚖️ "Atonement" usually describes a ritual sacrifice, not an action like this
🩸 His zeal functioned the way a sacrifice normally would
🔑 An unusual pairing of violence and priestly atonement language

# Numbers 25:14-15
# 📛 The Names Behind The Story
---
## 🏷️ Zimri, The Son Of Salu
The text finally names the Israelite man from verse 6, and it isn't a nobody — naming him this clearly, along with his father, marks him as someone whose identity mattered to the story, not an anonymous sinner.

🏷️ Naming him marks this as a real, remembered event
👤 Identified by his father Salu as well
🔑 The Bible doesn't let this stay anonymous

## 👑 A Prince Of A Chief House Among The Simeonites
Zimri wasn't a random Israelite — he was a leader, a "nasi," from a chief family in the tribe of Simeon, the same kind of tribal-prince title listed back in Numbers 1:16. A leader participating in this sin makes it far worse.

👑 "Prince" was a formal tribal-leader title, listed in Numbers 1:16
📉 Numbers 26's later census shows Simeon's tribe shrinks sharply after this
🔑 Leadership involved in the sin, not just ordinary people

## 🏷️ Cozbi, The Daughter Of Zur
The Midianite woman is also named and identified by her father, matching the same level of detail given to Zimri — this wasn't a random encounter between strangers, but between two people from prominent families on both sides.

🏷️ Named just as specifically as Zimri
👨‍👧 Identified through her father Zur
🔑 High status on both sides of this event

## 👑 He Was Head Over A People, And Of A Chief House In Midian
Zur was a ranking Midianite leader, not just an ordinary family head. Numbers 31:8 later lists a king named Zur among five Midianite kings killed when Israel goes to war against Midian for this very incident.

👑 Zur held real leadership rank among the Midianites
⚔️ A king named Zur is later killed in Numbers 31:8
🔑 This event reaches all the way to Midian's royal leadership

# Numbers 25:16-18
# ⚔️ The Command Against Midian
---
## 🎯 Vex The Midianites, And Smite Them
The target shifts specifically to Midian here, even though Moab was involved earlier in the chapter too. This command sets up the full military campaign against Midian that plays out later in Numbers 31.

🎯 The focus narrows specifically onto Midian
📖 Sets up the war against Midian described in Numbers 31
🔑 Moab started it, but Midian gets named for the coming judgment

## 🕸️ For They Vex You With Their Wiles
"Wiles" means deliberate, cunning schemes — not an accident or a misunderstanding, but a planned strategy. Numbers 31:16 later confirms this plan actually came from Balaam's own advice to Balak.

🕸️ "Wiles" means a deliberate, cunning scheme
🎯 Numbers 31:16 later confirms Balaam suggested this exact plan
🔑 What looked like temptation was really a calculated attack

## 😔 Wherewith They Have Beguiled You In The Matter Of Peor
"Beguiled" means deceived or led astray. This phrase ties the whole chapter's events directly back to the place name Peor and the god Baalpeor introduced at the very start of the chapter.

😔 "Beguiled" means deceived or led astray
🔗 Connects directly back to Baalpeor from verse 3
🔑 The chapter closes by naming exactly what happened and why

## 👪 The Daughter Of A Prince Of Midian, Their Sister
Calling Cozbi "their sister" stresses how deeply this scheme reached into Midian's own leadership — this wasn't a plan carried out by outsiders, but something connected to Midian's ruling families themselves.

👪 "Their sister" stresses her close tie to Midian's leadership
🏛️ Shows the plan reached into Midian's ruling families directly
🔑 Confirms just how deliberate and high-level this scheme really was
`;

export const NUMBERS_TWENTY_FIVE_PERSONAL_SECTIONS = parseNumbersTwentyFiveRawNotes(NUMBERS_TWENTY_FIVE_RAW_NOTES);
