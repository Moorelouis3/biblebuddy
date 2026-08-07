export type DeuteronomyTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyFiveRawNotes(rawText: string): DeuteronomyTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 25:${startVerse}` : `Deuteronomy 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Deuteronomy 25 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_FIVE_RAW_NOTES = `# Deuteronomy 25:1-3
# ⚖️ Judgment And The Forty Stripes
---
## ⚖️ If There Be A Controversy Between Men

"Controversy" means a legal dispute between two people.

It is not just an argument or a bad mood.

The text pictures two Israelites who cannot resolve something on their own.

So they bring it before judges instead of settling it by force.

⚖️ Controversy means a legal dispute

🙅 Not just an argument

👥 Two Israelites cannot agree

📖 Judges settle it, not force

---

## 🎯 Justify The Righteous, And Condemn The Wicked

The judges' only job is to see the truth clearly.

Not to negotiate, not to split the difference.

One side is right and one side is wrong.

Real justice always lands somewhere specific.

🎯 Judges must see truth clearly

🚫 No splitting the difference

⚖️ One side is truly wrong

📖 Real justice lands somewhere specific

---

## 👁️ Beaten Before His Face

This punishment was not carried out in private.

The judge himself had to watch it happen.

That kept the number of blows honest.

No one could secretly add extra strikes later.

👁️ The judge watches it happen

🚫 Not a private punishment

🔢 Watching keeps the count honest

➡️ No secret extra strikes allowed

---

## 🔢 According To His Fault, By A Certain Number

The punishment had to match the size of the crime.

A judge could not hand out random or excessive blows.

"A certain number" means a fixed, calculated amount, not an emotional decision.

This kept punishment fair instead of driven by anger.

⚖️ Punishment must match the crime

🚫 No random or excessive blows

🔢 A certain number means fixed

📖 Fairness ruled instead of anger

---

## 🔟 Forty Stripes He May Give Him, And Not Exceed

"Stripes" means lashes from a whip or rod.

Forty was the legal ceiling, never a required amount.

Going even one stripe past forty broke the law itself.

Later Jewish practice stopped at thirty nine stripes to build in a safety margin.

Paul later says he received forty stripes save one, in 2 Corinthians 11:24.

🔢 Forty stripes was the legal limit

🚫 Never a required amount

🛡️ Safety margin stopped at thirty nine

📖 Paul later suffered this same punishment

---

## 💔 Thy Brother Should Seem Vile Unto Thee

The word "brother" matters here.

The guilty man is still a fellow Israelite, not an enemy.

"Vile" means treated as worthless or disgraced beyond what is fair.

Punishment could correct wrong without permanently destroying someone's dignity.

👨‍👩‍👧 Brother means a fellow Israelite

💔 Vile means treated as worthless

🛡️ Dignity survives even punishment

➡️ Justice never erases a person

# Deuteronomy 25:4
# 🐂 The Ox That Treadeth Out The Corn
---
## 🌾 Treadeth Out The Corn

"Treadeth out" means the ox walked over cut grain on a threshing floor.

Its hooves separated the edible kernels from the dry stalks.

This was the normal way to process grain before mills existed.

The ox worked directly among the food it was helping to produce.

🐂 Treadeth out means walking over grain

🌾 Hooves separated kernels from stalks

🏗️ The normal method before mills

➡️ The ox worked among its food

---

## 🚫 Thou Shalt Not Muzzle The Ox

A muzzle is a device fastened over an animal's mouth to stop it from eating.

This law commands the opposite of that.

The ox pulling the plow was allowed to eat some of the grain it was working.

Withholding food from a hardworking animal counted as needless cruelty.

🚫 Muzzle blocks an animal's mouth

🌾 The ox could eat while working

🐂 Cruelty to workers was forbidden

📖 Even an animal earns its food

---

## 📜 When He Treadeth Out The Corn

Paul quotes this exact law twice in the New Testament.

He uses it in 1 Corinthians 9:9 and 1 Timothy 5:18.

Both times he applies it to paying people for honest work.

A rule about a working animal becomes a principle about human wages.

📜 Paul quotes this law twice

💰 Applied to paying workers honestly

🐂 Animal law becomes human principle

📖 Workers deserve to share in results

# Deuteronomy 25:5-10
# 👞 The Duty Of The Husband's Brother
---
## 👨‍👨‍👦 If Brethren Dwell Together

This law applies to brothers who still share family land and life together.

It is not a rule for any two distant relatives.

A dead man's portion of the family inheritance was at stake.

Keeping that portion inside the family mattered deeply in this culture.

👨‍👨‍👦 Brothers sharing family land

🏡 Not distant or unrelated relatives

💰 A dead man's inheritance at stake

➡️ Keeping land inside the family

---

## 🚪 Shall Not Marry Without Unto A Stranger

"Without" here is an old word meaning outside the family.

A widow with no son was not free to simply remarry anyone.

The law first protected her place inside her husband's family line.

This gave the family, not just the widow, a say in what happened next.

🚪 Without means outside the family

🙅 She could not simply remarry anyone

👪 Her husband's family had a claim

📖 The line came before her freedom

---

## 🤝 Perform The Duty Of An Husband's Brother

This custom is often called levirate marriage today.

"Levir" is an old word for a husband's brother.

The brother married the widow so the dead man's line would continue.

It was treated as an obligation, not a romantic choice.

📖 Levirate marriage is the modern term

👨‍👩‍👧 Levir means husband's brother

🤝 Duty, not romance, drove the custom

➡️ The dead man's line continues

---

## 👶 The Firstborn Which She Beareth Shall Succeed In The Name Of His Brother

The first son born from this marriage was not counted as the living brother's heir.

He legally carried the name and inheritance of the dead brother instead.

This kept the dead man's family line alive on paper and in property.

A child could restore what death had already taken away.

👶 The firstborn son inherits differently

📜 Counted as the dead brother's heir

🏡 The dead man's name survives

➡️ A child can restore a lost line

---

## 🙅 If The Man Like Not To Take His Brother's Wife

This law never forces a man into the marriage.

He is allowed to simply refuse.

Refusing carried no criminal charge or legal punishment.

It did carry a public and lasting embarrassment instead.

🙅 Refusal was legally allowed

🚫 No criminal charge followed refusal

😳 Public shame replaced legal punishment

➡️ The law used shame, not force

---

## 🏛️ Go Up To The Gate Unto The Elders

The city gate served as the courthouse of the ancient world.

Elders gathered there to hear disputes and settle business.

This made the widow's complaint a public legal matter, not a private grudge.

Everyone in town would eventually hear how it was resolved.

🏛️ The gate functioned as a courthouse

👴 Elders gathered to judge there

📢 Her complaint became fully public

➡️ The whole town would know the outcome

---

## 👞 Loose His Shoe From Off His Foot, And Spit In His Face

Removing a sandal was an old way of giving up a legal claim.

The same shoe custom appears later in the book of Ruth.

Spitting in his face added public disgrace on top of the legal act.

Both actions together made his refusal impossible to hide or deny.

👞 Loosing the shoe gave up a claim

📖 Ruth 4 later reuses this custom

🤮 Spitting added public disgrace

➡️ His refusal became impossible to hide

---

## 🏷️ The House Of Him That Hath His Shoe Loosed

This unflattering nickname would follow the man for the rest of his life.

Neighbors would use it to remember exactly what he had refused to do.

A single choice could shape how an entire town saw a family.

Refusing a duty was legal, but never free of cost.

🏷️ A lasting, unflattering nickname

👥 Neighbors would remember his refusal

👪 One choice shaped a reputation

📖 Legal freedom still carried a cost

---

## 🏗️ Build Up His Brother's House

"Build up" is a picture of restoring a family that would otherwise disappear.

This exact law gets a much happier ending later in the book of Ruth.

Boaz willingly performs this same duty for Ruth instead of refusing it.

That willing choice eventually leads to King David's family line, and later to Jesus.

🏗️ Build up means restore a family

📖 Ruth 4 shows this law working

🤝 Boaz chooses duty, not refusal

➡️ That choice leads to David and Jesus

# Deuteronomy 25:11-12
# ✋ A Fight That Goes Too Far
---
## 👊 When Men Strive Together One With Another

"Strive" here means a physical fight, not just a disagreement.

Two men are already grappling with each other.

A third person, one man's wife, steps into the fight to help him.

Her intention is simply to protect her own husband.

👊 Strive means a physical fight

👫 Two men are grappling

🤝 A wife steps in to help

➡️ Her goal was to protect him

---

## 🙊 Taketh Him By The Secrets

"Secrets" is a polite old word for a man's genitals.

This detail explains exactly why the law reacts so strongly.

Injury there could end a man's ability to ever have children.

In this culture, having descendants carried enormous weight.

🙊 Secrets means a man's genitals

⚠️ This injury could be permanent

👶 It threatened his future children

📖 Descendants mattered enormously in this culture

---

## ⚖️ Then Thou Shalt Cut Off Her Hand

This is the harshest civil penalty found anywhere in this law code.

Many scholars believe later Jewish practice replaced it with a monetary payment instead.

The plain wording of the text itself describes a physical punishment.

Either way, the law treats this specific method as far more than a minor foul.

⚖️ The harshest penalty in this law

💰 Many scholars believe payment replaced it

📜 The text itself describes injury

📖 This method was treated seriously

---

## ❤️ Thine Eye Shall Not Pity Her

Her original goal was good, protecting her own husband.

The law still refuses to excuse the specific method she used.

Good intentions do not erase a harmful action's consequences.

Motive and method are judged separately here.

❤️ Her intention was actually good

🚫 Good intent did not excuse the method

⚖️ Motive and method judged apart

➡️ Even care has limits under law

# Deuteronomy 25:13-16
# ⚖️ Honest Weights And Measures
---
## 🪨 Divers Weights, A Great And A Small

"Divers" is an old word meaning more than one kind.

Merchants weighed goods on a balance scale using stone weights.

A dishonest trader carried two sets, a heavy one and a light one.

He would buy with the heavy weight and sell with the light one.

⚖️ Divers means more than one kind

🪨 Weights sat on a balance scale

😈 A dishonest trader kept two sets

➡️ Buying and selling used different weights

---

## 🪣 Thou Shalt Not Have In Thine House Divers Measures

"Measures" refers to containers used for grain and other goods.

The same trick worked here too, one size for buying, another for selling.

This law reaches beyond the marketplace and into a person's own home.

Even private dishonesty someone thought no one would notice was still forbidden.

🪣 Measures means containers for goods

😈 Two sizes worked the same scam

🚫 Private dishonesty was still forbidden

➡️ The law reached into the home

---

## ✅ A Perfect And Just Weight

"Just" means consistently accurate, the same for every single customer.

No favoring family, friends, or anyone with more power.

Honesty in ordinary daily business mattered as much as honesty at the altar.

God cared about the marketplace, not only the temple.

✅ Just means the same for everyone

🚫 No favoring family or friends

🏪 The marketplace mattered as much as worship

📖 God cared about ordinary honesty

---

## 📜 That Thy Days May Be Lengthened In The Land

This exact promise also appears attached to honoring your father and mother.

Both commands connect an everyday choice to how long Israel would stay in the land.

Honest business was never treated as a small or separate issue.

It carried the same weight as the Ten Commandments themselves.

📜 Same promise as honoring parents

🏡 Tied to staying in the land

⚖️ Business honesty was not a small issue

📖 It carried the weight of a commandment

---

## 💔 An Abomination Unto The LORD Thy God

"Abomination" means something God finds deeply disgusting, not merely against the rules.

This same word describes idol worship elsewhere in the law.

Cheating a customer with rigged scales is placed in that same category.

Dishonesty in business was treated as a form of spiritual betrayal.

💔 Abomination means deeply disgusting to God

🗿 The same word describes idol worship

⚖️ Cheating placed in that category

📖 Dishonesty was a spiritual betrayal

# Deuteronomy 25:17-19
# ⚔️ Remember What Amalek Did
---
## 📜 Remember What Amalek Did Unto Thee

Amalek attacked Israel shortly after they left Egypt, back in Exodus 17.

That first battle happened at a place called Rephidim.

Moses held up his hands during that fight while Joshua led the army.

This chapter now looks back on that same attack from years later.

📜 Amalek first attacked in Exodus 17

📍 The battle happened at Rephidim

🙌 Moses held up his hands there

➡️ This verse looks back on that day

---

## 🎯 Smote The Hindmost Of Thee, Even All That Were Feeble

"Hindmost" means the very back of the group traveling together.

Amalek did not challenge Israel's strongest fighters up front.

They targeted the elderly, the sick, and the exhausted stragglers instead.

That made it an ambush against the most defenseless people, not a real battle.

🎯 Hindmost means the back of the line

🏃 They avoided the strongest fighters

👴 They targeted the weak and tired

📖 This was an ambush, not a battle

---

## ⚠️ He Feared Not God

This is the real accusation behind the whole verse.

It is not only that Amalek fought unfairly.

A basic reverence for God should have stopped anyone from attacking the helpless.

Amalek had none of that restraint at all.

⚠️ The real accusation is stated plainly

🛡️ Reverence should restrain cruelty

🚫 Amalek showed no restraint at all

➡️ Fearing God shapes how you treat the weak

---

## ⏳ Blot Out The Remembrance Of Amalek From Under Heaven

This command was tied to a future moment, after Israel finally had rest in the land.

It was not a blanket order to attack immediately.

Generations later, King Saul receives this exact assignment in 1 Samuel 15.

The story of Amalek even reaches as far as the book of Esther.

⏳ Tied to a future moment of rest

👑 Saul receives this assignment later

📖 Amalek's story reaches into Esther

➡️ A command fulfilled generations later

---

## 🧠 Thou Shalt Not Forget It

This chapter opened with fair courts and honest scales for everyday life.

It closes by commanding Israel to actively remember one specific historical wrong.

Forgetting was treated as its own kind of failure here.

Memory itself carried a moral weight in this law.

⚖️ The chapter opened on fairness

🧠 It closes on active memory

🚫 Forgetting counted as a failure

📖 Memory itself carried moral weight
`.trim();

export const DEUTERONOMY_TWENTY_FIVE_PERSONAL_SECTIONS = parseDeuteronomyTwentyFiveRawNotes(
  DEUTERONOMY_TWENTY_FIVE_RAW_NOTES,
);
