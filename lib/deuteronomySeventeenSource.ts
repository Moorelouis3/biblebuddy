export type DeuteronomySeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomySeventeenRawNotes(rawText: string): DeuteronomySeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomySeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 17:${startVerse}` : `Deuteronomy 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 17 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_SEVENTEEN_RAW_NOTES = `# Deuteronomy 17:1-4
# 😇 Corrupt Offerings, Corrupt Worship
---
## 🐑 Blemish, Or Any Evilfavouredness

"Blemish" means a physical flaw, like a broken bone or a missing eye.

"Evilfavouredness" means the animal simply looked bad, even with no specific flaw.

Leviticus twenty two already required Israel's offerings to be the best of the flock.

Giving God a damaged animal treated the offering like empty formality.

🐑 Blemish means a physical flaw
👀 Evilfavouredness means it simply looked bad
📜 Leviticus twenty two set this standard first
📖 A careless gift was never a real gift

## 💔 For That Is An Abomination Unto The LORD Thy God

"Abomination" is the same strong word used at the end of chapter sixteen.

Chapter sixteen used it for a pagan grove and a carved image.

This chapter now applies it to a lazy, damaged sacrifice.

Careless worship and false worship land in the same category here.

💔 Abomination repeats chapter sixteen's word
🌳 That word first described a pagan grove
🐑 Now it describes a careless offering too
📖 Careless worship can offend like false worship

## 👫 Man Or Woman

This law names both a man and a woman as possible offenders.

Many ancient law codes assumed the offender would be a man.

Naming both sexes here applies the command equally to either.

👫 Both a man and a woman are named
📜 Many ancient codes assumed men only
⚖️ This command applies equally to both
📖 No exception is written in for either

## 📜 Transgressing His Covenant

"Covenant" is the binding agreement between God and Israel sealed at Sinai.

Idolatry is not framed here as one person's private choice.

It is described as breaking a formal agreement the whole nation entered together.

📜 Covenant means the binding deal from Sinai
🚫 Idolatry breaks that agreement directly
👥 The whole nation entered it together
📖 This makes idolatry closer to treason

## ☀️ The Sun, Or Moon, Or Any Of The Host Of Heaven

"Host of heaven" means the stars, pictured like an army arranged in the sky.

Worshiping the sun, moon, and stars was common across Babylon and Egypt.

Genesis one already described these same objects as things God made and placed.

☀️ Host of heaven means the stars
⚔️ Host pictures them like an army
🌍 This worship was common across the region
📖 Genesis one already named them as made things

## 🚫 Which I Have Not Commanded

God points out plainly that He never asked for this kind of worship.

The problem is not only worshiping something false.

It includes inventing devotion God never requested in the first place.

🚫 God never commanded this worship
🎯 The problem includes uninvited devotion
🙏 True worship follows what God asks
📖 Invention is not the same as obedience

## 🔎 Enquired Diligently

"Diligently" means a careful, thorough investigation, not a quick assumption.

A rumor alone could not lead to an execution.

The accusation had to be checked and confirmed before anyone acted on it.

🔎 Diligently means a careful investigation
🚫 A rumor alone was not enough
✅ The charge had to be confirmed
📖 Due process came before punishment

# Deuteronomy 17:5-7
# ⚖️ Two Or Three Witnesses
---
## 🚪 Unto Thy Gates

"Gates" means the local town, the same meaning used in chapter sixteen.

Executions happened at the town gate, the public center where elders met.

This kept judgment public rather than hidden away.

🚪 Gates means the local town again
👥 The town gate was the public center
👀 Judgment happened where everyone could see
📖 Nothing about this was done in secret

## 🪨 Stone Them With Stones

Stoning required the whole community to take part.

No single executioner carried out the sentence alone.

This spread responsibility for a death sentence across many hands.

🪨 Stoning involved the whole community
🙌 No single person bore the full weight
⚖️ The community itself enforced the sentence
📖 Justice here was a shared duty

## 👄 At The Mouth Of Two Witnesses, Or Three

"At the mouth" is an old way of saying by the testimony of.

One accusation was never enough to end a life.

This same rule appears again later in chapter nineteen.

Jesus and Paul both quote this same rule in the New Testament.

👄 At the mouth means by testimony
🔢 Two or three witnesses were required
🔁 The rule returns again in chapter nineteen
📖 The New Testament later quotes this rule

## 🙅 But At The Mouth Of One Witness He Shall Not Be Put To Death

A single accuser could be mistaken, biased, or simply lying.

This rule protects the accused from that risk.

It exists specifically to stop one person's word from becoming a death sentence.

🙅 One witness alone could not convict
❓ A single voice could be wrong
🛡️ This rule protected the accused
📖 Truth needed more than one source

## ✋ The Hands Of The Witnesses Shall Be First Upon Him

The witnesses who accused someone had to throw the first stones themselves.

A witness willing to lie casually now faced the weight of killing with their own hands.

That requirement discouraged false testimony before it could happen.

✋ Witnesses threw the first stones
😳 Lying now carried a heavier cost
🛑 This discouraged false testimony in advance
📖 Accusers bore real weight for their words

## 🧹 So Thou Shalt Put The Evil Away From Among You

This exact closing phrase repeats across many of Deuteronomy's laws.

It frames punishment as removing a corrupting influence from the whole community.

Not just punishing one guilty person.

🧹 This phrase repeats throughout Deuteronomy
🏘️ Evil is treated as a community threat
🚫 Punishment removes that threat
📖 One person's sin could endanger everyone

# Deuteronomy 17:8-13
# 🏛️ The Central Court
---
## ⚖️ Too Hard For Thee In Judgment

Chapter sixteen already set up local judges in every town.

Some cases were too complicated for those local courts to settle.

This verse builds in an appeal system for exactly those hard cases.

⚖️ Local courts came from chapter sixteen
🤔 Some cases were too complex locally
🏛️ This verse builds in an appeal
📖 Even ancient Israel needed a higher court

## 🩸 Between Blood And Blood

"Blood and blood" means disputed killing cases.

Telling murder apart from accidental death was one hard example.

Chapters four and nineteen both wrestle with that exact distinction elsewhere in Deuteronomy.

🩸 Blood and blood means disputed killings
❓ Murder versus accident was the hard question
📜 Chapters four and nineteen cover this too
📖 Some killings needed careful sorting out

## 👊 Between Stroke And Stroke

"Stroke and stroke" means disputed injury cases.

Judges had to weigh how serious an assault actually was.

Exodus twenty one already laid out base penalties for different injuries.

Some cases still needed a judge to weigh details the law could not fully anticipate.

👊 Stroke and stroke means disputed injuries
📜 Exodus twenty one set base penalties
🤔 Some details still needed a judge
📖 Law cannot anticipate every situation

## 🕍 The Priests The Levites, And The Judge

The central court combined two kinds of authority, priestly and civil.

This paired religious teaching with practical legal judgment in one place.

No local town court carried that same combined weight.

🕍 Priests and a judge both served here
🙏 One side brought religious teaching
⚖️ The other brought legal judgment
📖 Both kinds of authority worked together

## 🚦 They Shall Shew Thee The Sentence Of Judgment

"Shew" is an old spelling of show.

The central court's ruling was not a suggestion.

It was the final word on that specific dispute.

🚦 Shew is an old spelling of show
📜 The court delivered a binding ruling
🔒 It was final on that dispute
📖 Appeals ended once this ruling came

## 🧭 To The Right Hand, Nor To The Left

This exact idiom for straying already appeared back in chapter five.

It pictures walking a straight path without wandering toward either side.

Here it binds the local judges to that same straight path.

🧭 Right or left is an idiom for straying
🔁 The same phrase appeared in chapter five
➡️ It pictures staying on a straight path
📖 Obedience here allowed no wandering

## 😤 Do Presumptuously

"Presumptuously" means acting with willful, deliberate defiance.

That differs from an honest mistake.

Numbers fifteen already separates unintentional sin from this kind of defiant sin.

Refusing the court's ruling on purpose fell into this more serious category.

😤 Presumptuously means willful defiance
🤷 It differs from an honest mistake
📜 Numbers fifteen already made this distinction
📖 Defying the court was treated as serious

## 👂 All The People Shall Hear, And Fear

Executing someone who defied the court was not only about that one person.

The news was meant to spread and teach everyone else the same lesson.

Public justice functioned as public teaching.

👂 The outcome was meant to spread
📚 It taught a lesson to everyone
🛑 Fear here meant respect for the court
📖 Public justice doubled as public teaching

# Deuteronomy 17:14-17
# 👑 Restraining The King
---
## 🌍 Like As All The Nations That Are About Me

Israel imagines wanting a king specifically to look like its neighbors.

Judges chapter eight already shows Gideon refusing that exact kind of kingship.

This verse predicts a request that actually happens later, in first Samuel chapter eight.

🌍 Israel wants to resemble its neighbors
🚫 Gideon had already refused this once
🔮 First Samuel eight fulfills this prediction
📖 God foresaw the request before it came

## 👆 Whom The LORD Thy God Shall Choose

The king could not simply be Israel's own pick.

God's approval was required before anyone could take the throne.

This kept even the monarchy under a higher authority.

👆 God had to choose the king
🚫 The people could not simply pick one
👑 Even the throne stayed under authority
📖 No king ruled outside God's approval

## 🇮🇱 One From Among Thy Brethren

The king had to be a fellow Israelite, not a foreign ruler.

A foreign king would likely bring foreign gods into Israel's throne.

And foreign loyalties along with them.

🇮🇱 The king had to be an Israelite
🚫 No foreign ruler was permitted
⚠️ Foreign kings often import foreign gods
📖 The throne stayed inside the covenant family

## 🐴 Not Multiply Horses To Himself

Horses meant chariots, and chariots meant real military power.

Egypt was the main source for buying large numbers of horses.

Solomon later broke this exact command, importing horses from Egypt by the thousands.

🐴 Horses meant real military power
🇪🇬 Egypt was the main horse supplier
⚠️ Solomon later broke this command directly
📖 Written law predicted a real future failure

## 🚫 Cause The People To Return To Egypt

Buying horses from Egypt meant sending Israelites back there to trade.

That risked recreating the very dependence on Egypt God had just rescued them from.

The exodus itself was still recent history when this law was given.

🚫 Trading with Egypt risked dependence again
🏃 God had just rescued them from there
🔁 This law guarded against sliding back
📖 Freedom needed protecting, not just winning

## 💍 Multiply Wives To Himself, That His Heart Turn Not Away

Royal marriages were often political alliances with foreign nations.

Foreign wives frequently brought their own gods into the palace.

Solomon later broke this command too.

First Kings blames his many foreign wives for turning his heart toward idols.

💍 Many wives often meant political alliances
🙏 Foreign wives brought foreign gods
⚠️ Solomon broke this command directly
📖 His heart turned exactly as warned here

## 💰 Multiply To Himself Silver And Gold

Great wealth could make a king feel independent of God.

And independent of his own people.

This command guards the king's heart against pride built on riches.

💰 Wealth could breed false independence
👑 Pride grows easily around riches
🛡️ This command guarded the king's heart
📖 Even a king answered to a higher law

# Deuteronomy 17:18-20
# 📜 The King's Own Copy Of The Law
---
## ✍️ Write Him A Copy Of This Law In A Book

"This law" refers to the book of Deuteronomy itself.

The king had to personally write out his own copy.

Not simply receive one already made for him.

The priests kept the master copy his version was checked against.

✍️ The king wrote his own copy
🕍 Priests kept the master copy
📜 Personal copying was the requirement
📖 This law means Deuteronomy itself

## 📅 Read Therein All The Days Of His Life

This was not a one time coronation ritual.

The king was expected to read his copy for the rest of his reign.

Daily familiarity with the law was built directly into the job.

📅 Reading was a daily, lifelong habit
👑 Not a one time coronation act
🔁 Familiarity with the law never stopped
📖 The job itself demanded ongoing study

## 🙏 That He May Learn To Fear The LORD His God

The purpose of all that reading was reverence, not just information.

"Fear" here means deep respect and awe, not being afraid.

Knowing the law was meant to shape the king's heart.

Not just his memory.

🙏 Fear here means deep reverence
🧠 The goal was more than memorization
❤️ Reading was meant to shape his heart
📖 Knowledge alone was never the point

## 👥 His Heart Be Not Lifted Up Above His Brethren

Kings in Egypt and Mesopotamia were often treated as gods themselves.

Israel's king was required to remain a brother among brothers.

Not a god king set above everyone else.

This one line separates Israel's monarchy from every surrounding nation's model.

👥 The king stayed a brother, not a god
🇪🇬 Nearby nations often deified their kings
🚫 Israel's model rejected that pattern
📖 Humility was written into the job itself

## 🧭 Turn Not Aside To The Right Hand, Or To The Left

This same idiom for straying already appeared in verse eleven, for the judges.

Now it applies to the king, closing the loop between both offices.

No one in Israel, not even the king, stood above this standard.

🧭 The same idiom returns from verse eleven
⚖️ It first applied to the judges
👑 Now it applies to the king too
📖 Nobody stood above this one standard

## 👨‍👦 Prolong His Days In His Kingdom, He, And His Children

The promise here covers both the king personally and his whole family line.

Obedience to this chapter was tied directly to how long that line kept ruling.

Centuries later, this exact standard becomes a measuring stick.

Historians in Kings and Chronicles use it to judge every king of Israel and Judah.

👨‍👦 The promise covers the king and his line
📆 Obedience was tied to dynasty length
📚 Kings and Chronicles later judge rulers by this
📖 This chapter became history's own measuring stick
`.trim();

export const DEUTERONOMY_SEVENTEEN_PERSONAL_SECTIONS = parseDeuteronomySeventeenRawNotes(DEUTERONOMY_SEVENTEEN_RAW_NOTES);
