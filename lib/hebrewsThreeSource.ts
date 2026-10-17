export type HebrewsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsThreeRawNotes(rawText: string): HebrewsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 3:${startVerse}` : `Hebrews 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hebrews 3 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_THREE_RAW_NOTES = `# Hebrews 3:1-6
# 🏠 A Greater Builder Than Moses
---
## 🤝 Partakers Of The Heavenly Calling

"Partakers" means people who truly share in something, not just onlookers.

"The heavenly calling" means the invitation to belong fully to God's own family.

Chapter two already showed that Jesus calls believers his brethren.

This verse addresses them by what they now share with him.

That shared calling is the reason they can be called holy brethren here.

🤝 Partakers means truly sharing in something

👑 Heavenly calling means belonging to God's family

👪 Chapter two already called them brethren

📖 Shared calling explains holy brethren here

---
## 📨 Consider The Apostle And High Priest Of Our Profession

"Apostle" here simply means one sent on a mission, not a church office yet.

Jesus is called both apostle and high priest in this single verse.

An apostle represents God to the people.

A priest represents the people back to God.

"Profession" means the faith they openly confessed, not a job or career.

Jesus fills both directions of that relationship himself.

📨 Apostle means one sent on a mission

⚖️ Jesus represents God to the people

🙏 Jesus represents the people back to God

📖 He fills both directions for us

---
## 📜 As Also Moses Was Faithful In All His House

"His house" does not mean a building here.

It means the whole household of Israel that Moses led and served.

Moses was honored among Jewish readers as the greatest leader in their history.

The writer brings him up on purpose, as the highest comparison available.

Naming Moses first makes the point about Jesus land much harder soon.

🏠 His house means the household of Israel

👑 Moses was Israel's most honored leader

🎯 The writer names him on purpose

➡️ A bigger comparison is about to land

---
## ⚖️ Counted Worthy Of More Glory Than Moses

This is a bold claim for a first century Jewish reader to hear.

No one ranked above Moses in Israel's story before this.

The writer is not insulting Moses or lowering his honor.

He is showing that someone greater than Moses has now appeared.

The next line explains exactly why that ranking is fair.

⚖️ A bold claim for a Jewish reader

👑 No one outranked Moses before this

🚫 Moses is not being insulted here

📖 The next line explains the ranking

---
## 🏗️ He Who Hath Builded The House Hath More Honour Than The House

Builders always receive more honor than what they built.

Think of a house and the builder who constructed it.

The house can be beautiful, but the builder still gets the credit.

Moses was part of the household God was building.

Jesus is the one who built it.

That alone places Jesus in a different category than Moses.

🏗️ Pictures a builder and a house

🏠 Moses belonged to the household itself

🔨 Jesus built the household Moses served

📖 A builder always outranks the house

---
## ✝️ He That Built All Things Is God

Hebrews never says outright who built this house.

The answer given here is simply God.

One line earlier, Jesus was just called the builder.

Putting those two claims side by side quietly names Jesus as God himself.

❓ Who built the house is the question

🙌 The plain answer given here is God

✝️ Jesus was just called the builder

📖 This quietly names Jesus as God

---
## 🔮 For A Testimony Of Those Things Which Were To Be Spoken After

Moses served faithfully, but his service pointed beyond himself.

"A testimony" means a piece of evidence pointing toward something still coming.

Moses and the whole law he delivered acted like a signpost.

The thing that law pointed toward had not yet arrived in his lifetime.

Hebrews is about to reveal exactly what that signpost was aiming at.

🪧 Testimony means evidence pointing forward

📜 Moses and the law were a signpost

⏳ The real thing had not yet arrived

➡️ Hebrews names what it was pointing to

---
## 👑 Christ As A Son Over His Own House

Moses served the household as a servant inside it.

Christ stands over the household as a son who owns it.

A servant and a son hold very different positions in a family.

A son does not simply work in the house, he inherits it.

That difference in rank is the whole point of this comparison.

🧹 Moses served the house as a servant

👑 Christ owns the house as a son

🏠 Sons inherit a house, servants do not

📖 That rank difference is the whole point

---
## 👪 Whose House Are We

"We" suddenly shifts from history into the readers' own lives.

The household being discussed is not a building in the past.

It is the community of believers reading this letter right now.

Everyone who trusts Christ belongs to that same household today.

👆 We suddenly includes the readers themselves

🏠 The household is not an old building

👪 It is the community of believers today

➡️ Trusting Christ places you inside it

---
## 🏁 Hold Fast The Confidence And The Rejoicing Of The Hope Firm Unto The End

Belonging to this household comes with a condition attached here.

"Hold fast" means grip tightly and refuse to let go.

"Confidence" and "the rejoicing of the hope" both describe a settled trust in God's promise.

That trust is not meant to fade halfway through life.

The chapter is about to explain what happens when people let go instead.

✊ Hold fast means grip tightly

🙂 Confidence and hope describe settled trust

🏁 The trust must last until the end

📖 Letting go is the chapter's next warning

# Hebrews 3:7-11
# 📜 The Warning From Psalm Ninety Five
---
## 🕊️ As The Holy Ghost Saith

The words that follow are not simply the writer's own opinion.

He credits them directly to God's own Holy Spirit speaking through scripture.

The quotation comes from Psalm ninety five, written centuries earlier by David.

Hebrews treats an old psalm as God's own voice still speaking today.

That claim raises the stakes for everything quoted next.

🕊️ The Holy Ghost speaks through this quote

📜 It comes from Psalm ninety five

👑 David wrote it centuries earlier

📖 Old scripture still speaks as God's voice

---
## ⏰ To Day If Ye Will Hear His Voice

"To day" is written as two words in the King James English.

It means right now, not eventually or someday.

The warning is not aimed at some distant future moment.

It is aimed at whatever day a reader hears these words.

⏰ To day means right now

🚫 Not eventually or someday

👂 Aimed at whoever hears it today

📖 This moment is the one that matters

---
## 🪨 Harden Not Your Hearts

A hardened heart does not happen in one dramatic moment.

It builds slowly, the same way skin thickens under repeated pressure.

Each small refusal to listen makes the next refusal easier.

The command here is to resist that slow process while it can still be felt.

🪨 A hardened heart builds up slowly

🖐️ Like skin thickening under pressure

🔁 Each refusal makes the next one easier

➡️ Resist the process while you still can

---
## 🏜️ As In The Provocation, In The Day Of Temptation In The Wilderness

"The provocation" points to a specific event, not a general mood.

It recalls Israel's complaint for water at Meribah, described in Exodus and Numbers.

"The wilderness" means the desert Israel wandered through for forty years after leaving Egypt.

Readers of this letter would have known that story well.

Hebrews assumes that shared memory instead of retelling the whole event.

🏜️ Provocation points to a real event

💧 Israel complained for water at Meribah

🧭 The wilderness covers forty wandering years

📖 Hebrews assumes readers know the story

---
## 🧪 When Your Fathers Tempted Me, Proved Me

"Tempted" here means testing God's patience, not being tempted toward sin.

"Proved me" describes putting God's power and promises to the test.

Israel's ancestors demanded proof again and again instead of simply trusting God.

God had already rescued them from Egypt in plain view.

Doubt still kept resurfacing anyway.

🧪 Tempted means testing God's patience

🔍 Proved means demanding proof repeatedly

🌊 God had already rescued them from Egypt

📖 Doubt resurfaced even after that rescue

---
## 🔢 Saw My Works Forty Years

Forty years is not a round estimate here.

It matches the exact length of Israel's wilderness wandering in the book of Numbers.

God's works during that time included manna, water from a rock, and constant guidance.

Seeing proof for forty straight years still did not settle their trust.

🔢 Forty years matches Israel's wandering

🍞 Manna and water were daily proof

🧭 Guidance continued the whole time

📖 Proof alone did not settle their trust

---
## 🧭 They Do Alway Err In Their Heart

"Err" means to wander off course.

Picture a traveler who keeps missing the right road.

"Alway" is an older spelling of always.

The problem described here was not one single mistake.

It was a repeated pattern of drifting off course.

🧭 Err means wandering off course

🔁 Alway means always in older English

📍 This was a repeated pattern

📖 Not one mistake but constant drifting

---
## 🙅 They Have Not Known My Ways

Israel clearly knew facts about God after everything they had witnessed.

"Known my ways" means something deeper than knowing facts.

It means understanding how God actually works and trusting his character.

Facts without trust left their hearts unmoved.

🧠 They knew facts about God already

❤️ Known my ways means trusting his character

🚫 Facts alone did not move their hearts

📖 Knowledge without trust still falls short

---
## 🔥 So I Sware In My Wrath

"Sware" is the old past tense of swear.

It means God made a binding oath.

"Wrath" here is God's settled anger at persistent unbelief, not a sudden outburst.

An oath from God is never an empty threat.

Whatever God swears, he follows through on completely.

📜 Sware means God made a binding oath

🔥 Wrath means settled anger at unbelief

🚫 Not a sudden outburst but settled judgment

📖 God's oaths are never empty threats

---
## 🚪 They Shall Not Enter Into My Rest

"My rest" first meant the promised land of Canaan in Psalm ninety five.

That whole generation who left Egypt died without ever entering it.

Hebrews is about to use the word rest for something larger than land.

This verse plants the warning that opens the rest of the chapter.

🗺️ My rest first meant the promised land

💀 That generation died without entering it

🔓 Hebrews widens rest beyond geography

➡️ This warning opens the rest of the chapter

# Hebrews 3:12-15
# ⚠️ A Warning For Today
---
## 👀 Take Heed, Brethren, Lest There Be In Any Of You An Evil Heart Of Unbelief

"Take heed" means pay careful attention.

It is the same urgent word used back in chapter two, verse one.

This warning is addressed to brethren, fellow believers, not outsiders.

"An evil heart of unbelief" is not a single doubt or honest question.

It describes a settled refusal to trust God over time.

The danger described here grows inside a community of believers, not outside it.

👀 Take heed means pay careful attention

👪 This warns believers, not outsiders

🚫 Unbelief here means settled refusal to trust

📖 The danger grows inside the community

---
## 🚶 In Departing From The Living God

"Departing" pictures someone walking away, step by step.

It is not one single dramatic exit.

"The living God" contrasts sharply with lifeless idols worshiped elsewhere in that world.

Leaving a living relationship is different from simply changing an opinion.

This verse treats unbelief as real movement, a slow walk away from someone real.

🚶 Departing means a slow walk away

🪨 Living God contrasts with lifeless idols

💔 Unbelief is treated as real movement

📖 It is leaving someone, not an idea

---
## 🗣️ Exhort One Another Daily, While It Is Called To Day

"Exhort" means to urge someone forward with real energy.

It is stronger than a casual compliment.

This command is not given to leaders only.

It is given to the whole community, one another.

"Daily" matches the urgency already set up by "to day" back in verse seven.

Community is presented here as real protection against slow drifting.

🗣️ Exhort means to urge someone forward

👪 Given to the whole community

📆 Daily matches the urgency of today

📖 Community protects against slow drifting

---
## 🎭 Lest Any Of You Be Hardened Through The Deceitfulness Of Sin

"The deceitfulness of sin" names sin as something that lies to the person committing it.

Sin rarely announces itself honestly as dangerous.

It usually shows up disguised as harmless, reasonable, or even deserved.

That disguise is exactly what makes a hardened heart so hard to notice from inside.

🎭 Sin disguises itself as harmless

🤥 It lies to the person doing it

👻 Hardening is hard to notice from inside

📖 The deception is the real danger

---
## ✝️ For We Are Made Partakers Of Christ

This chapter already called believers partakers of a heavenly calling.

This verse uses a similar word for something more personal, sharing in Christ himself.

That sharing is not a single event finished at the start.

The next line reveals exactly how that sharing proves itself real.

🙌 Earlier this chapter named a heavenly calling

✝️ This verse names sharing in Christ himself

🔁 Sharing is not finished at the start

➡️ The next line proves it is real

---
## 🏃 If We Hold The Beginning Of Our Confidence Stedfast Unto The End

"Stedfast" is the King James spelling of steadfast.

It means firm and unmoving.

Sharing in Christ is proven real by endurance, not by how someone started.

Many people begin a race of faith with real excitement.

Finishing it is the actual evidence that the beginning was genuine.

🏃 Stedfast means firm and unmoving

🏁 Endurance proves the beginning was real

🎉 Starting with excitement is not the test

📖 Finishing is the real evidence

---
## 🔁 While It Is Said, To Day If Ye Will Hear His Voice, Harden Not Your Hearts

Hebrews repeats this exact warning for the third time now.

Repetition here is a teaching tool, not padding.

Hearing a warning once rarely changes a settled habit.

Hearing it hammered three times in one chapter is meant to finally land.

🔁 This is the third repeat of the warning

🔨 Repetition is used as a teaching tool

👂 Once rarely changes a settled habit

📖 Three times is meant to finally land

# Hebrews 3:16-19
# 🪦 Why That Generation Never Entered
---
## 👂 For Some, When They Had Heard, Did Provoke

The writer now asks himself a pointed question.

Who exactly provoked God after hearing his voice.

"Provoke" here points back to the same event named earlier in verse eight.

Hearing God's voice clearly did not guarantee a trusting response from everyone.

❓ The writer asks who provoked God

🏜️ Provoke points back to verse eight

👂 Hearing God did not guarantee trust

📖 Clear hearing is not the same as belief

---
## ✌️ Howbeit Not All That Came Out Of Egypt By Moses

"Howbeit" is an old word meaning however or but.

This line draws an important line most readers would miss.

Not every single person who left Egypt rebelled against God.

Joshua and Caleb, named in Numbers chapter fourteen, trusted God and were spared this judgment.

The warning targets a choice, not simply belonging to a group.

✌️ Howbeit means however in older English

👫 Not everyone who left Egypt rebelled

🙌 Joshua and Caleb trusted and were spared

📖 The warning targets a choice, not a group

---
## 😔 But With Whom Was He Grieved Forty Years

"Grieved" describes God's sorrow, not merely his anger.

Forty years matches the exact number of days the twelve spies spent scouting Canaan in Numbers thirteen.

God turned each one of those days into a full year of wandering as judgment.

That detail shows the punishment was measured on purpose, not random.

😔 Grieved means sorrow, not only anger

🔍 Forty years matches the spies' forty days

⚖️ Each scouting day became a wandering year

📖 The judgment was measured, not random

---
## ⚰️ Whose Carcases Fell In The Wilderness

"Carcases" is a blunt King James word for dead bodies.

That entire adult generation who left Egypt died before reaching the promised land.

Numbers fourteen records God's exact sentence after the spies' bad report.

The bluntness of the word matches how final that judgment actually was.

⚰️ Carcases means dead bodies plainly

🏜️ That whole generation died in the wilderness

📜 Numbers fourteen records this sentence

📖 The blunt word matches a final judgment

---
## 🔓 To Whom Sware He That They Should Not Enter Into His Rest, But To Them That Believed Not

The writer now names the exact cause behind God's oath in verse eleven.

Disobedience alone was not the real root of it.

Disobedience was only the visible symptom.

Unbelief was the hidden disease underneath it.

🔓 Names the cause behind the oath

🩺 Disobedience was the visible symptom

🦠 Unbelief was the disease underneath

📖 The root problem gets named directly

---
## 🏁 So We See That They Could Not Enter In Because Of Unbelief

Every warning since verse seven built toward this one sentence.

The real danger was never distance, hardship, or even disobedience by itself.

Unbelief, a refusal to trust God's word, was the one thing that locked the door.

That same door stays just as real for every reader hearing this chapter today.

🏁 Every warning built toward this conclusion

🚪 Unbelief, not distance, locked the door

🔑 Trusting God's word opens what unbelief closes

📖 The same door is still real today
`.trim();

export const HEBREWS_THREE_PERSONAL_SECTIONS = parseHebrewsThreeRawNotes(HEBREWS_THREE_RAW_NOTES);
