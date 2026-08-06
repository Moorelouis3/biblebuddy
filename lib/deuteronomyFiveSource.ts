export type DeuteronomyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyFiveRawNotes(rawText: string): DeuteronomyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 5:${startVerse}` : `Deuteronomy 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Deuteronomy 5 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_FIVE_RAW_NOTES = `# Deuteronomy 5:1-5
# 🗣️ Moses Renews The Covenant At Horeb
---
## 👂 Hear, O Israel, The Statutes And Judgments

Hear here means much more than simply listening with your ears.

In Hebrew this word calls for hearing followed by real obedience.

Statutes were the fixed rules God set for Israel to follow.

Judgments were rulings that came from applying those rules to real cases.

Moses already used both of these exact words back in chapter four.

👂 Hear means listen and obey

📏 Statutes were God's fixed rules

⚖️ Judgments applied rules to cases

📖 These words already appeared in chapter four

## 🤝 The LORD Our God Made A Covenant With Us In Horeb

Covenant means a binding agreement made between two parties.

Horeb is another name for Mount Sinai, the same mountain named often in Deuteronomy.

This covenant bound Israel to God as His own chosen people.

The terms of that agreement are about to be repeated in full.

🤝 Covenant means a binding agreement

⛰️ Horeb is another name for Sinai

👥 Israel became God's own people

📖 The terms are repeated in this chapter

## 🚫 The LORD Made Not This Covenant With Our Fathers

This does not mean the older generation was cut out of the covenant entirely.

That older generation already stood at this same mountain once before.

Moses is stressing how alive and present this covenant still is.

The phrase even us who are here alive today makes that point directly.

The rebellious generation from Numbers fourteen had already died in the wilderness by now.

🚫 Not excluding the older generation entirely

🔁 That generation stood here once already

🌟 Moses stresses this covenant's living relevance

📖 The Numbers fourteen generation had died already

## 👤 The LORD Talked With You Face To Face In The Mount

Face to face here does not mean the people saw an actual face.

Chapter four already said plainly that no shape or form was ever seen.

Face to face instead describes direct personal speech, not a secondhand message.

God spoke to this whole generation Himself, not only through a prophet.

👤 Face to face is not literal

👁️ Chapter four says no shape appeared

🗣️ It means direct personal speech

📖 God spoke to the whole generation Himself

## 🧍 I Stood Between The LORD And You At That Time

Moses is describing his own role as the mediator between God and Israel.

The people were too afraid of the fire to approach the mountain.

Moses alone climbed up to meet God.

The rest of Israel stayed below.

That same fear returns later when the people ask for a mediator.

🧍 Moses served as the mediator

🔥 The people feared the mountain's fire

⛰️ Moses alone climbed the mountain

📖 That same fear returns later in the chapter

## 🔥 For Ye Were Afraid By Reason Of The Fire, And Went Not Up Into The Mount

The people's fear explains exactly why Moses needed to mediate.

Ordinary Israelites stayed at the base of the mountain the whole time.

Only Moses walked into the fire and cloud covering Sinai.

That physical distance pictures the larger gap sin created between people and a holy God.

🔥 The fire terrified the whole camp

🏔️ Israel stayed at the mountain's base

🚶 Only Moses walked into the cloud

📖 Physical distance pictured a deeper gap

# Deuteronomy 5:6-10
# ⚡ No Other Gods, No Graven Images
---
## 🆔 I Am The LORD Thy God, Which Brought Thee Out Of The Land Of Egypt

Every commandment that follows rests on this one identity statement first.

God introduces Himself by what He has already done, not by a list of rules.

Bondage means slavery, a life owned and controlled by someone else.

Israel obeys a rescuer, not a stranger demanding blind loyalty.

🆔 God identifies Himself before commanding

🇪🇬 He points to Egypt first

⛓️ Bondage means slavery

📖 Israel obeys a rescuer, not a stranger

## 🥇 Thou Shalt Have None Other Gods Before Me

This is the first of the ten commandments Moses now repeats in full.

Before me literally means in defiance of me, not simply ranked lower.

Israel's neighbors each worshiped many different gods side by side without conflict.

This command rules out that entire approach at once.

🥇 The first commandment repeats here

⚔️ Before me means in defiance of God

🌍 Neighbors worshiped many gods at once

📖 This command rules that approach out

## 🪓 Thou Shalt Not Make Thee Any Graven Image

A graven image is an idol carved or shaped by human hands.

Here Moses simply restates it as the second of the ten commandments.

Egypt and Canaan both filled their worship with carved objects like this.

🪓 Graven image means a carved idol

🥈 This is the second commandment

🇪🇬 Egypt and Canaan both used carved idols

📖 Chapter four already explained this ban in full

## 🌌 Any Likeness Of Any Thing That Is In Heaven Above

Heaven above, earth beneath, and the waters below cover the entire created world.

Chapter four already gave this same three part list in detail.

No category of creation was safe to turn into an idol.

Repeating the list here shows how seriously this command is meant.

🌌 Heaven above starts the list

🌍 Earth beneath comes next

🌊 Waters below finishes the list

📖 Together they cover all creation

## 🙇 Thou Shalt Not Bow Down Thyself Unto Them, Nor Serve Them

Bow down describes a physical act of worship, kneeling or lying flat before something.

Serve describes an ongoing pattern of devoted service, not one single moment.

Together these two words cover both a single act and a whole lifestyle.

An idol could never rightly receive either kind of devotion.

🙇 Bow down means a physical act

🔁 Serve means ongoing devoted service

⚖️ Together they cover act and lifestyle

📖 No idol deserves either kind of devotion

## 💍 I The LORD Thy God Am A Jealous God

Jealous here does not mean petty or insecure the way people often use the word.

It means God refuses to share worship with anything else.

A faithful marriage does not tolerate a third partner either.

This same description already appeared once in chapter four.

💍 Jealous means faithful, not petty

🚫 God refuses to share worship

❤️ Marriage offers a fitting picture

📖 Chapter four already used this description

## ⚖️ Visiting The Iniquity Of The Fathers Upon The Children Unto The Third And Fourth Generation

Iniquity means sin, guilt that carries real consequences.

This does not mean children are punished directly for a parent's private sin.

Sin inside a family often shapes the choices of the next generation anyway.

Idol worship especially tends to pass from parent to child within a household.

⚖️ Iniquity means sin with real weight

🚫 Children are not punished for a parent's sin

👪 Sin still shapes a family's next generation

📖 Idol worship often passes down a household

## 📜 And Shewing Mercy Unto Thousands Of Them That Love Me And Keep My Commandments

Shewing is an old spelling of showing.

This verse deliberately contrasts with the warning just given about the fathers and children.

Judgment reaches only a few generations.

Mercy reaches thousands instead.

God's kindness is always described as far larger than His anger.

📜 Shewing is an old spelling of showing

⚖️ This verse contrasts judgment with mercy

📈 Mercy reaches thousands, judgment reaches few

📖 God's kindness outweighs His anger

# Deuteronomy 5:11-15
# 🛌 The Name, And The Sabbath
---
## 🚫 Thou Shalt Not Take The Name Of The LORD Thy God In Vain

In vain means for an empty, worthless, or false purpose.

This command covers more than cursing.

It also covers false oaths and empty promises made in God's name.

A name carried real weight and authority in the ancient world.

🚫 In vain means empty or worthless

😤 This covers more than cursing

🤥 False oaths count too

📖 Names carried real authority in that world

## ⚖️ The LORD Will Not Hold Him Guiltless

Guiltless means free from blame or punishment.

God treats misusing His name as a serious offense, not a small slip of the tongue.

This warning closes out the third commandment with a clear consequence.

The commandments so far have moved from worship to speech.

⚖️ Guiltless means free from blame

🚨 Misusing God's name is serious

🔚 This closes the third commandment

📖 Worship moves next into speech

## ✨ Keep The Sabbath Day To Sanctify It

Sanctify means to set something apart as holy and different from ordinary days.

The sabbath was the seventh day of each week, set aside for rest.

This is the fourth of the ten commandments Moses repeats.

No other commandment so far has needed this much explanation.

✨ Sanctify means set apart as holy

📅 Sabbath means the seventh day

🔢 This is the fourth commandment

📖 It gets the most explanation so far

## 🛠️ Six Days Thou Shalt Labour, And Do All Thy Work

Six days of labor set the normal rhythm for every household in Israel.

Work was expected and good, not something to avoid.

The seventh day breaks that rhythm on purpose.

A regular rest could not happen without a regular pattern of work first.

🛠️ Six days set the normal rhythm

✅ Work itself was expected and good

🛑 Day seven breaks that rhythm

📖 Rest needs a rhythm of work first

## 🏷️ But The Seventh Day Is The Sabbath Of The LORD Thy God

This day is called the sabbath of the LORD, not simply a day off.

The list of who must rest is remarkably long, covering the whole household.

Son, daughter, servants, animals, and even a foreign stranger inside Israel's gates all rest together.

No one in the household was allowed to work for someone else's sake.

🏷️ Called the LORD's sabbath, not a day off

👨‍👩‍👧 The whole household is covered

🐂 Even animals and strangers rest

📖 No one works for someone else's rest

## 🎯 That Thy Manservant And Thy Maidservant May Rest As Well As Thou

This line states the sabbath's real purpose plainly.

A master's day of rest was worthless if his servants kept working.

Deuteronomy consistently protects the weakest members of the household first.

The command exists to build fairness into daily life on purpose.

🎯 This states the sabbath's real purpose

👥 A master's rest could not exclude his servants

🛡️ Deuteronomy protects the weakest members first

📖 Fairness gets built into daily life

## ⛓️ Remember That Thou Wast A Servant In The Land Of Egypt

This gives a different reason for the sabbath than Exodus twenty gives.

Exodus ties the sabbath to God resting after creation.

Deuteronomy instead ties it to Israel's own memory of slavery.

Both reasons point to the same command from two different angles.

🔀 Deuteronomy gives a different reason than Exodus

🌱 Exodus ties rest to creation

⛓️ Deuteronomy ties rest to slavery memory

📖 Two reasons, one command

# Deuteronomy 5:16-21
# ⚖️ The Rest Of The Ten Words
---
## 🙇 Honour Thy Father And Thy Mother

Honour means far more than simple politeness.

It includes caring for parents financially and physically as they grow old.

This is the fifth commandment and the first one with a promise attached.

That promise is that thy days may be prolonged in the land.

🙇 Honour means more than politeness

👴 It includes caring for aging parents

🔗 This is the fifth commandment

📖 A promise of long life is attached

## ⏳ That Thy Days May Be Prolonged, And That It May Go Well With Thee

Prolonged means made longer, extended beyond the normal expectation.

Go well with thee points to a lived blessing, not just a longer lifespan.

Honoring parents was treated as foundational to a stable, lasting society.

A society that honors its elders tends to hold together longer.

⏳ Prolonged means made longer

🌿 Go well means a lived blessing

🏛️ Honoring parents stabilizes a whole society

📖 Elder honor helps a nation hold together

## 🔪 Thou Shalt Not Kill

This command uses a specific Hebrew word for unlawful killing, not every kind of killing.

War and the death penalty are addressed elsewhere in the law.

Numbers thirty five already separated true murder from a genuine accident in detail.

This command protects human life as something only God has the right to take.

🔪 This bans unlawful killing specifically

⚔️ War and justice are addressed elsewhere

📜 Numbers thirty five already defined murder

📖 Human life belongs to God alone

## 💍 Neither Shalt Thou Commit Adultery

Adultery means a married person having sexual relations with someone who is not their spouse.

This command protects marriage as a serious, binding commitment.

Ancient Israel treated marriage as a covenant, much like the one just described at Horeb.

Breaking that covenant carried real consequences under the law given later in this book.

💍 Adultery breaks a marriage commitment

🤝 Marriage functioned like a covenant

⚖️ Breaking it carried real legal consequences

📖 The law protects marriage seriously

## 🧤 Neither Shalt Thou Steal

Stealing means taking something that belongs to another person without permission.

This command assumes and protects the idea of private property.

It covers everything from a person's belongings to their freedom itself.

Kidnapping a person to sell them was treated as a form of theft too.

🧤 Stealing means taking without permission

🏠 This command protects private property

👤 It even covers stealing a person

📖 Theft takes what is not yours

## 🗣️ Neither Shalt Thou Bear False Witness Against Thy Neighbour

False witness means lying under oath in a legal or public setting.

Ancient Israel had no police investigators.

Trials leaned heavily on eyewitness testimony instead.

A single lie could cost an innocent neighbor his freedom or his life.

This command protects truth inside the courtroom specifically.

🗣️ False witness means lying under oath

⚖️ Trials leaned on eyewitness testimony

😢 A lie could cost a neighbor his life

📖 This command protects courtroom truth

## 💭 Neither Shalt Thou Desire Thy Neighbour's Wife

Desire here describes an inward wish, not an outward action like the commands before it.

This command reaches into a person's private thoughts, not just their behavior.

No human court could ever enforce a law like this one.

Only God can see and judge desire itself.

💭 Desire means an inward wish

🧠 This reaches private thoughts, not actions

⚖️ No human court can enforce this

📖 Only God can judge desire itself

## 😩 Neither Shalt Thou Covet Thy Neighbour's House, His Field

Covet means to want something so much that it consumes a person's thoughts.

This verse lists concrete examples, house, field, servants, and livestock.

Together these represent everything that made up a family's entire livelihood.

Coveting was treated as the root that leads toward stealing or worse.

😩 Covet means an all consuming want

🏡 The list covers house, field, and livestock

🌱 Together they represent a family's livelihood

📖 Coveting is the root of worse sins

# Deuteronomy 5:22-27
# 😨 The People Ask For A Mediator
---
## 🔚 These Words The LORD Spake Unto All Your Assembly

The giving of the ten commandments ends exactly here.

Added no more means God stopped speaking aloud after exactly these ten words.

Every other law in this book comes through Moses instead of a direct voice.

That makes the ten commandments unique among everything else God gave Israel.

🔚 This marks the end of the ten words

🤐 God spoke no further commands directly

📜 Later laws come through Moses instead

📖 The ten commandments stand uniquely alone

## ✍️ And He Wrote Them In Two Tables Of Stone, And Delivered Them Unto Me

Chapter four already explained that God wrote these words Himself.

Two tables likely means two copies, matching ancient treaty customs.

Delivered them unto me confirms Moses personally received the finished stone tablets.

Stone made the ten commandments permanent in a way spoken words never could be.

✍️ God wrote these words Himself

📜 Two tables likely means two copies

🤲 Moses personally received the stone tablets

📖 Stone made these words permanent

## 👥 Ye Came Near Unto Me, Even All The Heads Of Your Tribes, And Your Elders

The tribal leaders approach Moses right after the ten commandments are spoken.

They come forward on behalf of the whole camp.

Ordinary Israelites stay back.

Their representatives speak for them instead.

This request becomes the reason Moses now serves as Israel's mediator.

👥 Tribal leaders approached Moses together

🗣️ They spoke for the whole camp

🏕️ Ordinary Israelites stayed back

📖 This starts Moses' ongoing mediator role

## 😮 We Have Seen This Day That God Doth Talk With Man, And He Liveth

This is a genuinely remarkable claim for the ancient world.

Most ancient peoples believed encountering a god directly would kill a person instantly.

Israel heard God speak and survived the experience completely.

That survival becomes proof of just how gracious this God really is.

😮 A remarkable claim for that world

☠️ Other cultures expected death from meeting a god

✅ Israel heard God and survived

📖 Survival proved God's own graciousness

## 😱 Now Therefore Why Should We Die? For This Great Fire Will Consume Us

Fear drives this question more than logic does.

The people assume more direct contact with God will surely kill them next.

That fear was not really about the fire itself.

It was about coming face to face with a holy God unprotected.

😱 Fear drives this question

🔥 They expect the fire to kill them

🙏 The real fear was God's holiness

📖 They felt unprotected before a holy God

## ❓ Who Hath Heard The Voice Of The Living God

No nation but Israel could ever answer this question yes.

Israel's own experience at Horeb had no equal anywhere in the ancient world.

The people are not exaggerating their own importance here.

They are stating a simple historical fact about what just happened to them.

❓ This expects the answer no one

🌍 No nation had a matching experience

📢 This is not exaggeration

📖 It states a simple historical fact

## 🧍 Go Thou Near, And Hear All That The LORD Our God Shall Say

The people ask Moses to become their permanent go between with God.

Speak thou unto us all that the LORD shall speak places full trust in Moses' honesty.

We will hear it, and do it promises obedience before the law even arrives.

This request quietly sets up the entire rest of the book of Deuteronomy.

🧍 The people ask Moses to mediate permanently

🤝 They trust Moses to relay God's words honestly

✅ They promise obedience before hearing the law

📖 This request sets up the rest of Deuteronomy

# Deuteronomy 5:28-33
# 🏕️ God Approves, Moses Stays
---
## ✅ They Have Well Said All That They Have Spoken

God directly approves of the people's request for a mediator.

This is not God settling for a lesser plan.

Fearing God's presence did not cancel a real wish to obey Him.

That combination was itself the right response.

The people's instinct to ask for help was exactly correct.

✅ God approves the people's request

🎯 This is not a lesser backup plan

🙏 Fear and a wish to obey mixed rightly

📖 Their instinct to ask for help was correct

## 😔 O That There Were Such An Heart In Them, That They Would Fear Me

God wishes out loud for Israel's heart to match its words.

The people's good intention in this moment would not last on its own.

Fear me here means deep reverence, not simple terror.

A right heart, not just a right moment, was always the real goal.

😔 This is God's own wistful wish

⏳ Good intentions rarely last on their own

🙏 Fear me means deep reverence

📖 A right heart was always the real goal

## 🏕️ Go Say To Them, Get You Into Your Tents Again

God sends the ordinary people back to their own camps.

Only the tribal leaders had approached the mountain a moment earlier.

This closes the immediate crisis at the base of the mountain.

The larger conversation about the law continues with Moses alone.

🏕️ Ordinary people return to their tents

👥 Only leaders had approached the mountain

🔚 This closes the immediate crisis

📖 Moses continues the conversation alone

## 🧍 Stand Thou Here By Me, And I Will Speak Unto Thee All The Commandments

Moses alone is now set apart to receive the rest of the law.

Commandments, statutes, and judgments names the same three layers used back in chapter four.

Everything from chapter six onward flows out of this one private moment.

Moses becomes the sole channel for the law that follows.

🧍 Moses alone is set apart now

🔤 Commandments, statutes, and judgments repeat from before

📚 Chapter six onward flows from this moment

📖 Moses becomes the law's sole channel

## 🎯 Ye Shall Observe To Do Therefore As The LORD Your God Hath Commanded You

Observe to do means actually carrying out the command, not just agreeing with it.

Ye shall not turn aside describes obedience as staying exactly on a marked path.

To the right hand or to the left covers every possible direction of straying.

This same picture of a straight path returns often throughout Deuteronomy.

🎯 Observe to do means real action

🛤️ Obedience is pictured as a straight path

↔️ Right or left covers every direction of straying

📖 This picture returns often in Deuteronomy

## 🚶 Ye Shall Walk In All The Ways Which The LORD Your God Hath Commanded You

Walk is a common Old Testament picture for how a person lives day to day.

Following God is not one dramatic decision but a daily direction.

All the ways covers every part of life, not just the big moments.

This same walking picture returns constantly throughout the rest of Deuteronomy.

🚶 Walk pictures daily living, not one moment

🧭 Following God is a daily direction

🌐 All the ways covers every part of life

📖 This picture returns throughout Deuteronomy

## 🌿 That Ye May Live, And That Ye May Prolong Your Days In The Land Which Ye Shall Possess

Live here means a full flourishing life, not just staying alive.

Prolong your days repeats the same promise already attached to honoring parents.

This time the promise covers the whole nation, not just individual families.

The chapter that opened with hear now closes with the reason to obey.

🌿 Live means a full flourishing life

⏳ Prolong your days repeats an earlier promise

🌍 This time the whole nation is promised

📖 The chapter closes on the reason to obey
`.trim();

export const DEUTERONOMY_FIVE_PERSONAL_SECTIONS = parseDeuteronomyFiveRawNotes(DEUTERONOMY_FIVE_RAW_NOTES);
