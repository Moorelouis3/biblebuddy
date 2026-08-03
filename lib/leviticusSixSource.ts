export type LeviticusSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusSixRawNotes(rawText: string): LeviticusSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 6:${startVerse}` : `Leviticus 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 6 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_SIX_RAW_NOTES = `# Leviticus 6:1-7
# 😤 Sinning Against A Neighbor Is Sinning Against God
---
## 😤 Commit A Trespass Against The LORD

Sinning against another person still counts as sinning against God.

This law covers wrongs between neighbors, not violations at the altar.

Chapter four already covered unintentional sins against the LORD directly.

Verse two adds a second category, sins committed against people.

😤 Neighbor wrongs still count as sin

📜 Chapter four covered sins against God

🤝 This adds sins against other people

📖 Both wrongs answer to the same LORD

---
## 📦 In That Which Was Delivered Him To Keep, Or In Fellowship

"Delivered him to keep" means an item left in someone's care for safekeeping.

Think of trusting a neighbor with your suitcase before a trip.

"In fellowship" means money or goods pooled together for a shared venture.

Both situations here depend entirely on broken trust.

📦 Delivered to keep means a safekeeping deposit

🧳 Like trusting a neighbor with your suitcase

🤝 Fellowship means a shared business venture

📖 Every case here depends on broken trust

---
## 🥊 A Thing Taken Away By Violence

"Taken away by violence" means simple robbery, not a quiet trick.

This case does not involve any broken trust at all.

The victim never agreed to hand anything over.

Verse three moves on to quieter kinds of dishonesty instead.

🥊 Violence means straightforward robbery

🚫 No trust was ever broken here

👊 The victim never agreed to anything

📖 Robbery differs from the other cases

---
## 🎭 Hath Deceived His Neighbour

"Deceived" covers everyday cheating in a deal or a trade.

This sin needs no violence and no formal trust arrangement at all.

A dishonest scale or a broken business promise both qualify here.

The law reaches past obvious theft into ordinary dishonesty.

🎭 Deceived means cheating in a deal

⚖️ No violence or trust arrangement is required

🧮 A dishonest scale would qualify too

📖 Ordinary dishonesty still counts as sin

---
## 🔍 Have Found That Which Was Lost, And Lieth Concerning It

This covers someone who finds lost property and quietly keeps it.

Simply finding it was not yet the sin here.

The sin begins the moment he lies about having it.

An honest finder was expected to return lost property.

🔍 Finding it was not the sin

🤥 Lying about it made him guilty

🙅 Honest finders returned lost property

📖 A lie turned honesty into guilt

---
## ⚠️ Sweareth Falsely

A false oath added a second layer of guilt on top of the first.

Courts in ancient Israel depended heavily on sworn testimony.

Lying under oath attacked the whole system used to settle disputes.

Exodus twenty already warned against this same danger.

⚠️ A false oath doubled the guilt

⚖️ Courts relied on sworn testimony

🏛️ This attacked the whole justice system

📖 Exodus twenty already warned against this

---
## 🔢 In Any Of All These That A Man Doeth, Sinning Therein

Five very different wrongs just got listed in only two verses.

A broken deposit, a failed partnership, robbery, deceit, and a lie about lost property.

Every one of them ends with the exact same word, guilty.

The specific wrong matters less than the fact that it was against another person.

🔢 Five different wrongs share one chapter

⚖️ Each one still counts as guilt

🤝 Every case involves another person

📖 The next verses explain what happens next

---
## 💰 He Shall Restore That Which He Took Violently Away

Forgiveness in this law never skips the step of making things right.

The guilty man had to give back exactly what he took.

An offering alone was never enough to settle the matter.

Restitution came first, and worship came only after it.

💰 Restitution had to happen first

🙏 An offering alone was not enough

🤝 Making things right came before worship

📖 God cared about the wronged neighbor too

---
## ➕ Shall Add The Fifth Part More Thereto

Restitution alone was not the full penalty in this law.

"The fifth part more" means an extra twenty percent added on top.

Giving back exactly what was taken still counted as a form of theft.

The extra amount made crime cost more than honesty ever would.

➕ The fifth part means twenty percent extra

💸 Giving back the exact amount was not enough

⚠️ Crime had to cost more than honesty

📖 God built a real deterrent into this law

---
## 📅 In The Day Of His Trespass Offering

Restitution and the offering both happened on the very same day.

Nothing here allowed a slow, dragged out repayment plan.

The wronged neighbor got paid back right away, not eventually.

Quick restitution mattered as much as the sacrifice itself.

📅 Repayment and offering happened the same day

🚫 No slow payment plan was allowed

⏱️ The neighbor was paid back quickly

📖 Speed mattered as much as the sacrifice

---
## ⚖️ With Thy Estimation

"Estimation" means the priest set the ram's value in silver.

This was not a random price picked by the guilty man himself.

A priest guaranteed the offering met a fair, honest standard.

Chapter five already used this same system for a lamb or two birds.

⚖️ Estimation means the priest set the value

🐏 A ram without blemish was required here

🙅 He could not set his own price

📖 A priest kept the standard fair and honest

# Leviticus 6:8-13
# 🔥 The Fire That Must Never Go Out
---
## 🌙 The Burning Upon The Altar All Night Unto The Morning

The burnt offering placed on the altar kept burning through the whole night.

Nobody personally stood guard over it, but the fire itself never stopped.

Chapter one already covered this offering being wholly burned.

This verse adds a new detail, that its burning lasted all night long.

🌙 The offering burned through the whole night

🔥 The fire itself never stopped

📜 Chapter one already covered this offering

📖 A new detail, its burning overnight

---
## 🔥 The Fire Of The Altar Shall Be Burning In It

This is the first mention of a fire meant to never go out.

The idea returns and gets repeated three separate times in this section.

A continual fire meant God was always ready to receive an offering.

Nobody ever had to relight it from nothing.

🔥 A continual fire begins here

🔁 This idea repeats three times

🙏 God was always ready for worship

📖 Nobody ever relit it from nothing

---
## 👕 His Linen Garment, And His Linen Breeches

"Linen garment" means the plain white robe worn only for altar service.

"Breeches" means an undergarment covering the priest from waist to thigh.

Exodus twenty eight already introduced special linen clothing for priests.

This modest undergarment kept the priest covered while climbing near the altar.

👕 Linen garment means the plain service robe

🩲 Breeches covered the priest's waist and thigh

📜 Exodus twenty eight introduced priestly linen

📖 Modesty mattered even during holy work

---
## 🧹 Put Them Beside The Altar

Every morning the priest scooped up the ashes left from the night's fire.

The ashes were not thrown out right away.

They were set down close to the altar first.

This was only the first of two separate steps.

🧹 The priest gathered the morning ashes

📍 Ashes rested beside the altar first

⏳ This step came before removal outside

📖 One more step still remained

---
## 👔 Put Off His Garments, And Put On Other Garments

Before carrying ashes outside the camp, the priest changed clothes completely.

His holy service linen stayed inside, reserved only for altar work.

Plainer clothing handled the dirtier job of hauling ashes.

Even garments marked the difference between sacred duty and ordinary labor.

👔 The priest changed clothes before this task

✨ Holy linen stayed reserved for the altar

🧺 Plainer clothes handled the dirtier work

📖 Clothing marked sacred duty from ordinary labor

---
## 🏕️ Carry Forth The Ashes Without The Camp Unto A Clean Place

The ashes did not just get dumped anywhere nearby.

They were carried outside the whole camp entirely.

Even then, the spot chosen still had to be clean.

Something used in worship still deserved careful, respectful treatment.

🏕️ Ashes left the entire camp

🧼 The dump site still had to be clean

🙏 Worship remains got respectful treatment

📖 Even leftover ash carried real honor

---
## 🌅 The Priest Shall Burn Wood On It Every Morning

Feeding the altar fire became a daily, unskippable duty.

No single day was ever left to chance.

This habit ran in addition to the fire simply never going out.

Faithfulness here meant showing up morning after morning without fail.

🌅 Wood got added every single morning

📆 No day was ever skipped

🔥 This ran alongside the continual fire

📖 Faithfulness meant daily, unglamorous work

---
## 🐑 Burn Thereon The Fat Of The Peace Offerings

The peace offering's fat also burned on this exact same fire.

Chapter three already explained why fat, not meat, went to God.

One continual fire ended up serving more than just the burnt offering.

Every kind of offering eventually passed through the same flame.

🐑 Peace offering fat burned here too

📜 Chapter three explained why fat was God's portion

🔥 One fire served several offerings

📖 Every offering passed through the same flame

---
## ♾️ The Fire Shall Ever Be Burning, It Shall Never Go Out

This sentence closes the section by repeating its main point one final time.

A fire that never stopped meant access to God never stopped either.

Israel never had to wonder whether the altar was ready.

Worship was always available, every single day, without exception.

♾️ The fire never stopped, by design

🚪 Access to God never stopped either

📆 Worship was ready every single day

📖 God's presence came with no closed hours

# Leviticus 6:14-18
# 🍞 The Grain Offering Becomes The Priests' Food
---
## 🤏 Take Of It His Handful

Chapter two already explained this same handful, called the memorial.

Only a small portion of the flour ever reached the altar fire.

The rest stayed with the priests instead of burning up completely.

This chapter now explains what happened to that larger remaining portion.

🤏 A handful means the memorial portion

📜 Chapter two already explained this

🔥 Only a small part reached the fire

📖 The rest becomes the topic here

---
## 🌬️ A Sweet Savour, Even The Memorial Of It

"Sweet savour" describes a pleasing smell that showed God accepted the gift.

Chapter one already used this exact phrase for the burnt offering.

The grain offering earns the same language even though nothing here bleeds.

Acceptance, not blood alone, is the real point of this phrase.

🌬️ Sweet savour means a pleasing, accepted smell

📜 Chapter one already used this same phrase

🌾 Grain offerings earn this language too

📖 Acceptance mattered more than the method

---
## 🍽️ The Remainder Thereof Shall Aaron And His Sons Eat

Whatever flour was not burned became food for the priests.

This was not leftover scraps thrown away out of waste.

Priests owned no farmland of their own in Israel.

Offerings like this one were their actual wages for serving.

🍽️ Leftover flour became the priests' food

🌾 Priests owned no farmland themselves

💰 Offerings worked as their real wages

📖 God provided for those who served Him

---
## 🥙 With Unleavened Bread Shall It Be Eaten In The Holy Place

"Unleavened" means made without any yeast, so it never rises.

Chapter two already explained why grain offerings always avoided leaven.

This bread also could not be taken home for a private meal.

It had to be eaten right there, inside the holy place itself.

🥙 Unleavened means made without yeast

📜 Chapter two already explained this rule

🏛️ Eating happened inside the holy place

📖 This food never left holy ground

---
## 🚫 It Shall Not Be Baken With Leaven

"Baken" is an old word simply meaning baked.

Leaven often pictures something small that spreads and changes everything around it.

Exodus twelve already banned leaven from Israelite homes at Passover.

This offering stayed free of it for that exact same reason.

🚫 Baken means baked, an old spelling

🍞 Leaven pictures something that spreads

📜 Exodus twelve already banned it at Passover

📖 This offering stayed free of it too

---
## 👑 It Is Most Holy, As Is The Sin Offering, And As The Trespass Offering

"Most holy" marked the very highest tier an offering could reach.

Only priests, not ordinary Israelites, were allowed anywhere near this food.

Three different offerings now share this exact same top ranking.

The category mattered as much as the specific ritual behind it.

👑 Most holy marked the top tier

🙅 Ordinary Israelites could not eat this

🔗 Three offerings now share this rank

📖 Category mattered as much as ritual

---
## 👨 All The Males Among The Children Of Aaron Shall Eat Of It

Only male priests were permitted to eat this particular food.

Peace offerings later in this book allow a much wider family circle.

This narrower rule marks the grain offering as unusually holy.

The strictest food always went to the smallest, most restricted group.

👨 Only male priests could eat this

👪 Peace offerings later allow a wider circle

📈 A narrower rule signals higher holiness

📖 The holiest food had the fewest eaters

---
## ✋ Every One That Toucheth Them Shall Be Holy

Holiness here worked like a contact that could spread through touch.

Anything or anyone touching this food picked up that same holy status.

This is the reverse of the uncleanness rules explained back in chapter five.

There, touching something impure spread guilt outward instead.

✋ Holiness could spread by simple touch

🔄 This works opposite from uncleanness rules

📜 Chapter five explained the impurity version

📖 Holiness and impurity both spread by contact

# Leviticus 6:19-23
# 👑 The High Priest's Own Perpetual Offering
---
## 🕯️ In The Day When He Is Anointed

Anointing marked the exact day a new high priest began his service.

Exodus twenty nine already described this anointing ceremony in detail.

This offering started immediately at that moment and never stopped afterward.

A brand new duty began the same day as the honor itself.

🕯️ Anointing began a new high priest's service

📜 Exodus twenty nine already described this ceremony

🔄 A new duty began that same day

📖 Honor and duty arrived together

---
## 📏 The Tenth Part Of An Ephah Of Fine Flour

An "ephah" was a dry measure, close to a large basket of grain.

A tenth of an ephah came out to a bit more than two quarts.

This exact same small amount already appeared back in chapter five.

Even the high priest's own offering used a modest, familiar measure.

📏 An ephah was a large dry measure

🥣 A tenth was a bit over two quarts

📜 Chapter five used this same small amount

📖 Even the high priest kept it modest

---
## 🌓 Perpetual, Half Of It In The Morning, And Half Thereof At Night

"Perpetual" means this offering never stopped, day after day, for life.

Ordinary Israelites only brought a grain offering when they had a reason to.

The high priest brought this one every single morning and every single evening.

His position came with a duty nobody else in Israel carried.

🌓 Perpetual means an offering that never stopped

🔁 Every morning and every evening, always

👤 Ordinary Israelites had no such daily duty

📖 The high priest's role carried extra weight

---
## 🍳 In A Pan It Shall Be Made With Oil

This offering was cooked in a shallow pan rather than left raw.

Chapter two already described several similar cooking methods for grain gifts.

"Baken" simply means baked, once the oil and flour were mixed.

Even a daily duty still required real preparation and effort.

🍳 Cooked in a shallow pan with oil

📜 Chapter two described similar cooking methods

🥘 Baken simply means baked

📖 Daily duty still took real effort

---
## 🔄 Anointed In His Stead

"In his stead" means whichever son took over as high priest next.

This duty was tied to the office, not to one single man.

Numbers twenty later shows Eleazar stepping into this same role after Aaron dies.

The office continued even after the person holding it changed.

🔄 In his stead means the next successor

👑 The duty belonged to the office

📜 Numbers twenty shows Eleazar taking this role

📖 Offices outlasted the men who held them

---
## 🔥 It Shall Be Wholly Burnt: It Shall Not Be Eaten

Ordinary priests ate the remainder of a normal grain offering, back in verse sixteen.

The high priest never got to eat his own personal offering at all.

Every bit of it went entirely to the fire instead.

The highest position in Israel came with the fewest personal benefits.

🔥 Every bit of it burned completely

🚫 The high priest never ate his own gift

📜 Verse sixteen showed ordinary priests eating theirs

📖 Higher rank meant fewer personal benefits

# Leviticus 6:24-30
# 🩸 The Sin Offering, Eaten Here Or Burned There
---
## 📍 In The Place Where The Burnt Offering Is Killed Shall The Sin Offering Be Killed

Both offerings died in the exact same spot beside the altar.

Chapter one already located this spot on the altar's north side.

Using one shared location kept the whole system simple and consistent.

Location alone did not make one offering more holy than another.

📍 Both offerings were killed at the same spot

📜 Chapter one already named this north side location

🔗 One location served multiple offering types

📖 Consistency mattered throughout this whole system

---
## 🍽️ The Priest That Offereth It For Sin Shall Eat It

Unlike the burnt offering, this sacrifice was never sent entirely up in smoke.

The priest who performed the ritual got to eat part of it himself.

Eating it here was not casual, it happened only in the holy place.

This meal marked the final, official step of the atonement process.

🍽️ The officiating priest ate part of it

🏛️ Eating happened only in the holy place

🔥 Unlike the burnt offering, none was wasted

📖 The meal marked atonement's final step

---
## ✋ Whatsoever Shall Touch The Flesh Thereof Shall Be Holy

This is the same contact holiness rule already explained for the grain offering.

Anything touching this meat became holy simply through that contact.

The rule shows up again here on purpose, not by accident.

God treated multiple kinds of offerings with this same careful pattern.

✋ Touching this meat also spread holiness

📜 The grain offering already showed this rule

🔁 The pattern repeats here on purpose

📖 God applied one consistent standard

---
## 🩸 When There Is Sprinkled Of The Blood Thereof Upon Any Garment, Thou Shalt Wash

Blood from this sacrifice carried real, physical holiness, not just symbolism.

A stained garment could not simply be worn around afterward.

Washing had to happen right there, inside the holy place itself.

Careless handling of something sacred was never treated as a small matter.

🩸 Blood on clothing had to be washed

🏛️ Washing happened inside the holy place

🚫 Stained garments could not be worn casually

📖 Sacred blood demanded careful handling

---
## 🏺 The Earthen Vessel Wherein It Is Sodden Shall Be Broken

"Sodden" is an old word meaning boiled.

Clay pots soaked up whatever meat had been boiled inside them.

No amount of washing could ever fully clean porous clay like that.

Breaking the pot was the only way to keep holiness from lingering in ordinary use.

🏺 Sodden means boiled

🚫 Clay could not be cleaned completely

🔨 Breaking the pot was the only safe option

📖 Holiness could not be casually reused

---
## 🥘 If It Be Sodden In A Brasen Pot, It Shall Be Scoured, And Rinsed

"Brasen" means made of bronze, a much harder and smoother metal.

Bronze did not soak up liquid the way porous clay did.

Scouring and rinsing could fully clean a pot like this one.

The material itself decided whether an item got destroyed or reused.

🥘 Brasen means bronze, a smooth hard metal

💧 Bronze could be scoured and rinsed clean

🏺 Clay had to be broken instead

📖 Material decided reuse or destruction

---
## 👨 All The Males Among The Priests Shall Eat Thereof

This same male only rule already appeared for the grain offering earlier in this chapter.

The sin offering now follows that identical restriction.

Both offerings share the label "most holy" for the exact same reason.

A consistent boundary protected every offering placed in that top category.

👨 Only male priests could eat this

📜 The grain offering already set this rule

👑 Both offerings share the most holy label

📖 One boundary protected the whole category

---
## 🔥 Brought Into The Tabernacle Of The Congregation To Reconcile Withal

This verse names one important exception to everything just explained.

Chapter four already covered sin offerings whose blood entered the tabernacle itself.

Those specific offerings could never be eaten by any priest at all.

Instead, every part of them had to be burned completely outside the camp.

This exception connects directly to the Day of Atonement described later in chapter sixteen.

🔥 One case broke the normal eating rule

📜 Chapter four covered blood entering the tabernacle

🚫 Those offerings could never be eaten

📖 Chapter sixteen builds directly on this exception
`.trim();

export const LEVITICUS_SIX_PERSONAL_SECTIONS = parseLeviticusSixRawNotes(LEVITICUS_SIX_RAW_NOTES);
