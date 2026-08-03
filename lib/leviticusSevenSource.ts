export type LeviticusSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusSevenRawNotes(rawText: string): LeviticusSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 7:${startVerse}` : `Leviticus 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Leviticus 7 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_SEVEN_RAW_NOTES = `# Leviticus 7:1-7

# 🩸 The Law Of The Trespass Offering

---

## ⚖️ This Is The Law Of The Trespass Offering

A trespass offering was not the same as a sin offering.

It covered a specific wrong that could be measured and repaid.

Stealing, lying under oath, or misusing something holy could all call for it.

The guilty person still owed repayment on top of the sacrifice.

This offering dealt with a real debt, not just a feeling of guilt.

⚖️ Trespass offering covers a specific wrong

💰 Repayment was owed on top of it

🙅 Different from the general sin offering

📖 Sin can create a real debt

---

## 🔝 It Is Most Holy

"Most holy" was the highest level of sacredness in Israel's worship.

Only priests could eat this meat, and only inside the holy place.

An ordinary Israelite could never touch it, even a faithful one.

Some offerings ranked lower and could be eaten by a priest's family at home.

This offering stayed at the very top of that scale.

🔝 Most holy marks the highest rank

👨‍⚖️ Only priests could eat this meat

🚫 Ordinary Israelites could never touch it

📖 Some offerings ranked lower than this

---

## 🧭 In The Place Where They Kill The Burnt Offering

This place was the north side of the altar.

Leviticus chapter one already set that location for the burnt offering.

The trespass offering had to die in that same exact spot.

One dedicated place kept the sacrifices from becoming careless or random.

Every offering pointed back to the same altar, the same system.

🧭 The place means the altar's north side

📜 Chapter one already set this location

🔁 The trespass offering reused that spot

📖 One altar, one unified system

---

## 🩸 The Blood Thereof Shall He Sprinkle Round About Upon The Altar

Blood stood for the life of the animal given in place of the guilty person.

"Round about" means the priest sprinkled all four sides of the altar.

Nothing about this act was partial or one sided.

This covered the entire debt, not a portion of it.

🩸 Blood stands for a life given up

🔄 Round about means all four sides

🎯 The act was never partial

➡️ A whole debt got a whole covering

---

## 🐑 He Shall Offer Of It All The Fat Thereof, The Rump

The "rump" was the broad fat tail common on sheep raised in this region.

It was considered a rich, valuable piece of meat.

God received the richest parts of the animal, not the leftovers.

The best portion went to the altar before anyone else ate a bite.

🐑 Rump means the sheep's fat tail

💎 It was the richest cut available

🔥 The best part went to the altar

📖 God received first, not last

---

## 🫀 The Fat That Covereth The Inwards

"Inwards" means the internal organs of the animal.

A layer of fat naturally sits over them.

That fat always belonged to God, never to the person offering it.

Fat was considered the richest part of any animal in this culture.

🫀 Inwards means the internal organs

🧈 Fat over them belonged to God

🚫 Never eaten by the offerer

📖 Fat symbolized the animal's richness

---

## 🫘 The Two Kidneys, And The Fat That Is On Them, Which Is By The Flanks

The kidneys sat near the flanks, the sides of the animal's lower body.

In Hebrew thought, the kidneys were linked to a person's inner conscience.

That is something close to how "heart" gets used in English today.

Giving God this piece pictured giving him the inner, hidden parts.

Not just the outer, visible ones.

🫘 Kidneys sat near the flanks

🧠 Hebrew thought linked kidneys to conscience

💭 Similar to how "heart" is used today

📖 God received the hidden parts too

---

## 🍖 The Caul That Is Above The Liver

A "caul" is the fatty membrane that wraps around the liver.

This detail repeats from the burnt offering and the sin offering earlier in Leviticus.

The same pieces get removed every time.

It never depends on which offering is in view.

One consistent pattern runs underneath several different sacrifices.

🍖 Caul means the membrane over the liver

🔁 The same pieces repeat across offerings

📏 One pattern, many different sacrifices

📖 Consistency was part of the design

---

## 🔥 The Priest Shall Burn Them Upon The Altar For An Offering Made By Fire

Burning the fat sent it up as smoke toward heaven.

This is what "an offering made by fire" means.

The smoke was the visible sign that the gift had reached God.

This step was never wasted effort.

It carried real meaning.

🔥 Burning sent the fat up as smoke

☁️ Smoke was the sign of a gift given

🚫 Not a wasteful step, a real one

📖 Fire carried the offering to God

---

## 👨‍⚖️ Every Male Among The Priests Shall Eat Thereof, In The Holy Place

This law names who could eat this meat, priests who were male.

Women in priestly families were not included in this specific portion.

The meat also had to be eaten inside the holy place itself.

Location and person both mattered for this offering.

👨‍⚖️ Only male priests could eat this meat

🚫 Priestly women were not included here

🏛️ Eaten only in the holy place

📖 Person and place both mattered

---

## ⚖️ As The Sin Offering Is, So Is The Trespass Offering

These were two different offerings for two different situations.

A sin offering could cover an unintentional wrong with no clear debt attached.

A trespass offering usually involved an actual object or value that had been wronged.

Even so, the ritual itself followed one identical set of steps.

⚖️ Two offerings, two different situations

💰 Trespass often involved real repayment

🔁 Both followed the same ritual steps

📖 Different problems, same road to atonement

---

## 🍽️ The Priest That Maketh Atonement Therewith Shall Have It

Whichever priest actually performed the sacrifice received this meat as his own portion.

Priests owned no farmland in Israel.

This meat was part of how they were fed.

Serving at the altar was their entire livelihood.

👨‍⚖️ The officiating priest kept the meat

🌾 Priests owned no farmland of their own

🍽️ Offerings were how priests were fed

📖 Service at the altar was their income

# Leviticus 7:8-10

# 🥖 What Belongs To The Priests

---

## 🐑 The Priest Shall Have To Himself The Skin Of The Burnt Offering

Burnt offerings were entirely burned up, unlike other sacrifices.

Almost nothing physical remained afterward except the animal's skin.

That single leftover piece became the priest's own payment for that sacrifice.

Even the driest case still gave the priest something.

🔥 Burnt offerings were fully burned up

🐑 Only the skin was left over

👨‍⚖️ The skin became the priest's payment

📖 Even this offering still paid the priest

---

## 🍞 Baken In The Oven

"Baken" is an old form of the word baked.

An oven in this culture was often built from clay or stone.

Grain offerings could be prepared this way before reaching the altar.

The finished bread still belonged to the priest who offered it.

🍞 Baken is an old form of baked

🏺 Ovens were clay or stone structures

👨‍⚖️ The bread belonged to the offering priest

📖 The cooking method never changed who received it

---

## 🍳 Dressed In The Fryingpan, And In The Pan

A "fryingpan" cooked bread in a shallow layer of oil.

A flat "pan" worked more like a griddle.

Naming both tools shows this law covered every common way Israelite homes cooked bread.

No cooking method offered a way around the rule.

🍳 Fryingpan meant cooking in oil

🫓 A flat pan worked like a griddle

🏠 Both were common household tools

📖 No cooking method escaped this law

---

## 🤲 Mingled With Oil, And Dry, Shall All The Sons Of Aaron Have

Some grain offerings were mixed with oil.

Others were kept plain and dry.

This type was shared equally among every priest on duty.

Not only the one priest who brought it.

Fairness mattered even inside the priesthood itself.

🫒 Some grain offerings included oil

🌾 Others stayed plain and dry

🤝 This type was shared among all priests

📖 Fairness applied within the priesthood too

# Leviticus 7:11-15

# 🍞 The Peace Offering Of Thanksgiving

---

## 🕊️ This Is The Law Of The Sacrifice Of Peace Offerings

A peace offering was not primarily about fixing sin.

It celebrated an already good relationship with God.

Thanksgiving, a fulfilled vow, or simple generosity could all prompt one.

This offering was joyful, not corrective.

🕊️ Peace offering was not about guilt

🙏 It celebrated an existing good relationship

🎉 Thanksgiving or a kept vow could prompt it

📖 A joyful offering, not a corrective one

---

## 🎂 Unleavened Cakes Mingled With Oil

"Unleavened" means made without yeast, so the bread stayed flat.

"Cakes" were a thicker bread with oil mixed into the flour.

Oil added richness to what was otherwise a simple food.

This bread accompanied the animal sacrifice for a thanksgiving offering.

🍞 Unleavened means made without yeast

🫒 Oil enriched the plain flour

🎂 Cakes were a thicker mixed bread

📖 Bread accompanied the thanksgiving sacrifice

---

## 🫓 Unleavened Wafers Anointed With Oil

A "wafer" was a thin, crisp piece of bread, unlike the thicker cake.

"Anointed with oil" here means the oil was brushed on top.

That differs from the cakes, where oil was mixed into the dough itself.

Three bread forms show real effort, not habit.

🍘 A wafer was thin and crisp

🖌️ Anointed here means oil brushed on top

🍞 Different from oil mixed into dough

📖 Variety here showed real effort

---

## 🍞 Besides The Cakes, He Shall Offer Leavened Bread

Leavened bread contains yeast, so it rises.

Most grain offerings in Leviticus banned yeast completely.

This offering makes a rare exception, adding risen bread beside the flat cakes.

The added variety mirrored the offerer's own overflowing gratitude.

🍞 Leavened bread contains yeast, unlike the rest

🚫 Yeast was normally banned in offerings

🎉 This offering makes a rare exception

📖 Variety here mirrored real gratitude

---

## 🎁 One Out Of The Whole Oblation For An Heave Offering

"Oblation" is an old word simply meaning an offering or gift.

A "heave offering" was a portion lifted up and set apart for God.

One piece out of the whole batch of bread went to the priest this way.

That piece belonged to whichever priest had handled the blood of the sacrifice.

🎁 Oblation means an offering or gift

⬆️ Heave offering means a portion lifted up

🍞 One piece was set apart from the batch

📖 It paid the priest who handled the blood

---

## 🌙 It Shall Not Leave Any Of It Until The Morning

A thanksgiving peace offering had to be eaten the very same day.

Nothing could be saved until morning.

Without refrigeration, meat left overnight would spoil quickly.

The rule protected the worshiper, not only the ritual's meaning.

🌙 Nothing could be saved until morning

🍖 Meat would spoil without refrigeration

⏰ The whole animal was eaten that day

📖 The rule protected people, not just ritual

# Leviticus 7:16-18

# ⏳ How Long The Meat Could Wait

---

## 🤝 If The Sacrifice Of His Offering Be A Vow, Or A Voluntary Offering

A "vow" offering fulfilled a promise someone had already made to God.

A "voluntary offering" was given freely, with no promise attached.

Both differ from the thanksgiving offering described one verse earlier.

The reason behind a gift could change its own rules.

🤝 A vow offering fulfilled a promise

🎁 A voluntary offering had no promise attached

🔀 Different from the thanksgiving offering before it

📖 The reason behind a gift shaped its rules

---

## 📆 On The Morrow Also The Remainder Of It Shall Be Eaten

These two offering types got an extra day that thanksgiving did not receive.

The meat could be eaten on the day of the sacrifice or the day after.

That single extra day was worth spelling out clearly.

Not every peace offering ran on the same clock.

📆 An extra day was allowed here

🍖 Meat lasted through the next day

⏰ Worth spelling out clearly

📖 Not every offering ran on one clock

---

## 🔥 The Remainder Of The Flesh On The Third Day Shall Be Burnt With Fire

Whatever meat remained by the third day could not be eaten at all.

It had to be burned completely.

By that point, meat kept without refrigeration was no longer safe to eat.

Destroying it removed the temptation to eat it anyway.

🔥 Leftover meat was burned on day three

🌡️ Meat spoiled quickly in a warm climate

🚫 Burning removed the temptation to eat it

📖 The rule closed off a real risk

---

## 🤢 It Shall Be An Abomination, And The Soul That Eateth Of It Shall Bear His Iniquity

"Abomination" means something God finds deeply offensive.

"Iniquity" here means the guilt of that choice now rests on the person who ate it.

Eating spoiled, disqualified meat was never a small mistake.

It turned an act of worship into something offensive to God.

🤢 Abomination means deeply offensive to God

⚖️ Iniquity means the guilt now sits on him

🍖 Old meat could not become an exception

📖 Careless worship can turn holy into offensive

# Leviticus 7:19-21

# ⚠️ What Made The Meat Unfit

---

## 🚫 The Flesh That Toucheth Any Unclean Thing Shall Not Be Eaten

"Unclean" describes anything unfit for worship, not simply dirty in a literal sense.

If sacrificial meat touched something unclean, it could no longer be eaten.

The only option left for it was to burn it completely.

Holiness could be lost by contact, even by accident.

🚫 Unclean means unfit for worship

🍖 Contaminated meat could not be eaten

🔥 Burning was the only option left

📖 Holiness could be lost by accident

---

## ⚔️ Having His Uncleanness Upon Him, Even That Soul Shall Be Cut Off

"Cut off from his people" was one of the most serious penalties in Israel's law.

Many scholars believe it meant expulsion from the community, or judgment carried out by God himself.

Eating holy meat while personally unclean treated something sacred as ordinary food.

That carelessness carried the harshest consequence in the whole system.

⚔️ Cut off was the harshest penalty listed

🌍 It meant separation from the community

🍖 Sacred meat was not ordinary food

📖 Carelessness with holy things had real weight

---

## 🧍 Any Abominable Unclean Thing, And Eat Of The Flesh

This verse repeats and widens the warning from the two verses before it.

Human uncleanness or an unclean animal both counted the same way.

The specific source of the contamination did not matter.

What mattered was being clean before approaching something holy.

🔁 This verse widens the same warning

🧍 Human or animal uncleanness both counted

❓ The source did not change the outcome

📖 Being clean came before eating something holy

# Leviticus 7:22-27

# 🛑 No Fat, No Blood

---

## 🐂 Ye Shall Eat No Manner Of Fat, Of Ox, Or Of Sheep, Or Of Goat

This command applied to every Israelite, not only to priests.

Fat from these three animals was reserved for the altar alone.

People still raised and ate the meat of oxen, sheep, and goats every day.

Only the fat itself was permanently off the table.

🐂 Applied to ox, sheep, and goat

👥 This law covered every Israelite

🍖 Meat was still eaten normally

📖 Only the fat belonged to God

---

## 💀 The Fat Of The Beast That Dieth Of Itself

An animal that died from sickness, age, or accident could never be sacrificed.

Its fat still could not go on the altar.

Something not intentionally offered to God was never a valid sacrifice to begin with.

This fat still had ordinary, practical uses outside of eating it.

💀 A naturally dead animal was never a sacrifice

🚫 Its fat still could not reach the altar

🔧 It could still serve ordinary uses

📖 Not every animal death counted as an offering

---

## 🐺 The Fat Of That Which Is Torn With Beasts

This covers an animal killed by a wild predator instead of natural death.

Exodus chapter twenty two already treats a predator kill as a real, provable loss.

Even in that case, the fat was still off limits for the table.

The rule made no exception for how the animal died.

🐺 This covers a predator kill

📜 Exodus twenty two treats this as loss

🚫 The fat was still off limits

📖 No exception, no matter the cause

---

## ⚔️ Whosoever Eateth The Fat Shall Be Cut Off From His People

This repeats the same severe penalty already used in verse twenty.

Eating the fat meant for God was never treated as a minor slip.

It was treated as taking something that was never the offerer's to take.

The penalty matched the seriousness of that theft.

⚔️ Cut off repeats the severe penalty

🔥 The fat belonged to God alone

🚫 Eating it was treated as theft

📖 The penalty matched the seriousness

---

## 🐦 Ye Shall Eat No Manner Of Blood, Whether It Be Of Fowl Or Of Beast

This command covered every kind of animal, including birds.

Genesis chapter nine already connects blood directly to life itself.

Blood represented life, and life belonged to God alone.

This rule applied everywhere Israelites lived, not only near the altar.

🐦 Covered birds as well as animals

📜 Genesis nine ties blood to life

🩸 Blood belonged to God, not the table

📖 The rule followed Israel everywhere they lived

---

## 🩸 Whatsoever Soul It Be That Eateth Any Manner Of Blood

This closes the blood law with the same penalty already used twice in this chapter.

By now, the pattern is impossible to miss.

Fat and blood were the two things most linked to life and richness.

Both were reserved only for God, and everything else belonged to the people.

🔁 The same penalty closes this law

🩸 Fat and blood were both reserved for God

🍖 Everything else belonged to the people

📖 Life and richness pointed back to God

# Leviticus 7:28-34

# 🙌 The Wave Breast And Heave Shoulder

---

## 🙋 He That Offereth The Sacrifice Of His Peace Offerings Shall Bring His Oblation

This command names the offerer specifically, not a servant or substitute.

"Oblation" repeats the same word already defined for the bread gift in verse fourteen.

Every peace offering, whether animal or bread, followed one same principle.

The person making peace with God brought the gift personally.

🙋 The offerer himself is named here

🎁 Oblation was already defined in verse fourteen

🔁 One same principle covers every peace offering

📖 Peace with God was brought personally

---

## 🙌 His Own Hands Shall Bring The Offerings Of The LORD Made By Fire

The person offering the sacrifice personally carried it forward.

This was not a task handed off to a servant.

Worship here meant physically showing up with the gift in hand.

🙌 The offerer carried it personally

🚫 This was not a task to delegate

📿 Worship required real, physical presence

➡️ Showing up mattered as much as the gift

---

## 👐 That The Breast May Be Waved For A Wave Offering

A "wave offering" was moved back and forth in the priest's hands.

That motion likely pictured presenting the gift to God and receiving it back.

The breast of the animal was the specific piece waved this way.

A small physical gesture carried a big idea, this gift now belongs to you.

👐 Wave offering means moved back and forth

🎯 Presented to God, then given to the priest

🐑 The breast was the piece waved

📖 A gesture that said this belongs to you

---

## 🔥 The Fat Upon The Altar, But The Breast Shall Be Aaron's And His Sons'

The fat still went to the altar, matching the pattern from earlier in this chapter.

The breast, once waved, became food for Aaron's whole priestly family.

This portion was not tied to whichever priest performed the ritual that day.

It was a standing right for the entire priestly line.

🔥 Fat still went to the altar

🍖 The breast fed Aaron's whole family

👨‍👩‍👧‍👦 Not tied to one officiating priest

📖 A lasting right for the priestly line

---

## 💪 The Right Shoulder Shall Ye Give Unto The Priest For An Heave Offering

The right side was treated as the place of honor across the ancient world.

This cut, the right shoulder, was lifted up and set apart like the bread in verse fourteen.

It went to one particular priest, not the whole family like the breast.

💪 The right shoulder was the honored cut

⬆️ Heave offering means lifted up and set apart

👨‍⚖️ It went to one specific priest

📖 Honor was built into which cut was chosen

---

## 🎯 He That Offereth The Blood Shall Have The Right Shoulder For His Part

This verse names exactly who receives the shoulder, the priest who handled the blood.

Verse thirty one already gave the breast to the whole family.

Now the shoulder rewards the one person who did the hands on work that day.

A shared portion and a personal one both existed in the same offering.

🎯 The officiating priest earned the shoulder

🩸 Blood work was the task rewarded

🍖 Breast was shared, shoulder was personal

📖 Shared and personal reward both had a place

---

## 🗣️ For The Wave Breast And Heave Shoulder Have I Taken

God speaks in the first person here, claiming credit for this arrangement.

These were not portions the priests invented for themselves.

God calls it "a statute for ever," a permanent law for every future priest.

This was not a temporary wilderness rule.

🗣️ God claims this arrangement himself

🚫 Priests did not invent it themselves

♾️ Statute forever means a permanent law

📖 Support for priests was God's design

# Leviticus 7:35-38

# 🏔️ The Law Closes At Mount Sinai

---

## 🫒 This Is The Portion Of The Anointing Of Aaron

"Anointing" means being set apart for a role by having oil poured on someone.

Aaron and his sons were anointed to serve permanently as priests.

This meat portion was tied to that anointing, the day they were set into office.

The gift and the appointment were connected from the very beginning.

🫒 Anointing means being set apart with oil

👨‍⚖️ Aaron and his sons were anointed priests

📅 Tied to the day they were appointed

📖 Provision was built in from the start

---

## 🔁 By A Statute For Ever Throughout Their Generations

This phrase repeats deliberately from verse thirty four.

Repetition in this kind of legal text was never filler.

It signaled a rule that later generations should still treat as fully binding.

Nothing here was written only for the people standing at Sinai.

🔁 This phrase repeats on purpose

📜 Legal repetition was never filler

♾️ It bound generations far beyond Sinai

📖 A rule meant to outlast its first audience

---

## 📋 This Is The Law Of The Burnt Offering And Of The Consecrations

This verse works as a summary, listing every offering type covered across several chapters.

Burnt, grain, sin, trespass, ordination, and peace offerings all get named together.

A list like this marks the end of one complete section of instructions.

The next chapter shifts toward a different kind of story entirely.

📋 This verse lists every offering type

📚 It closes a complete section of law

🔚 A clear marker that this part is done

📖 Structure itself can carry meaning

---

## 🏔️ Which The LORD Commanded Moses In Mount Sinai

This closing line grounds the whole law in one place and time, Mount Sinai.

These were not vague customs that developed slowly over centuries.

The text presents them as commands given directly to Moses himself.

That claim of a specific origin is part of why Israel treated this law as binding.

🏔️ Mount Sinai anchors this whole law

🧑‍🦳 Given directly to Moses

📍 A real place, not vague custom

📖 A specific origin gave the law its authority
`.trim();

export const LEVITICUS_SEVEN_PERSONAL_SECTIONS = parseLeviticusSevenRawNotes(LEVITICUS_SEVEN_RAW_NOTES);
