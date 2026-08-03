export type LeviticusTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwoRawNotes(rawText: string): LeviticusTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 2:${startVerse}` : `Leviticus 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 2 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWO_RAW_NOTES = `# Leviticus 2:1-3
# 🌾 The Grain Offering Begins
---
## 🌾 A Meat Offering Unto The LORD

"Meat" here does not mean animal flesh at all.

The word once simply meant food in general.

This offering was made of flour, oil, and frankincense.

Nothing on this altar had to be killed first.

Chapter one already showed an offering that required an animal.

This chapter shows a different kind of gift entirely.

🌾 "Meat" here simply meant food

🐄 Chapter one required a living animal

🌱 This gift grew instead of breathed

📖 God welcomed both kinds of offering

## 🫒 His Offering Shall Be Of Fine Flour

An ordinary family ground its own flour at home.

"Fine flour" meant flour ground extra fine and sifted smooth.

That took far more time and work than the ordinary kind.

A worshipper was not allowed to bring the cheapest option.

Even a grain gift had to reflect real effort and care.

🌾 "Fine flour" meant finely ground and sifted

⏳ It took more work than ordinary flour

💰 The offering cost real time and effort

📖 God did not accept the cheapest option

## 🌿 He Shall Pour Oil Upon It, And Put Frankincense Thereon

Two costly ingredients were added directly onto the flour.

"Frankincense" was a fragrant resin taken from trees grown in Arabia.

It traveled a long trade route before it ever reached Israel.

Both ingredients turned this into a genuinely costly gift.

No animal died here, yet real wealth was still given.

🫒 Oil was poured right onto the flour

🌿 Frankincense came from resin trees in Arabia

💰 Both ingredients made the gift genuinely costly

📖 Wealth was given even without taking a life

## 🤝 He Shall Bring It To Aaron's Sons The Priests

A worshipper could not carry his own offering to the altar.

The gift first had to pass through a priest.

"Aaron's sons" refers to the whole priestly family, not Aaron alone.

Aaron could not personally handle every single offering himself.

Chapter one already showed this same handoff for the burnt offering.

🤝 Offerings passed through a priest first

👥 "Aaron's sons" means the whole priestly family

🙅 No worshipper reached the altar alone

📖 Chapter one already showed this same pattern

## ✋ The Priest Shall Burn The Memorial Of It

The priest did not burn the whole offering on the altar.

He burned only a handful, called the "memorial."

A memorial was a small portion standing in for the whole gift.

The rest of the flour never touched the fire at all.

One token portion could represent the entire offering before God.

✋ Only a handful reached the altar

🔥 That handful was called the "memorial"

🌾 One portion stood in for the whole

📖 A token could represent the entire gift

## 🍞 The Remnant Shall Be Aaron's And His Sons'

"Remnant" meant whatever flour was left after the priest's handful.

That leftover flour became food for the priestly family.

Priests owned no farmland of their own anywhere in Israel.

Offerings like this one were part of how they actually ate.

Every part of this gift served a real purpose.

🍞 "Remnant" meant flour left after the memorial

🍽️ The leftover flour fed the priestly family

🌾 Priests owned no farmland of their own

📖 Every part of the gift had a purpose

## ⭐ It Is A Thing Most Holy

Leviticus uses two levels of holiness for its offerings.

Something "holy" could be handled with normal priestly care.

Something "most holy" carried far stricter limits than that.

Only male priests were allowed to eat a most holy offering.

It had to be eaten inside the tabernacle courtyard, never taken home.

⭐ "Most holy" was stricter than plain holy

👨‍👦 Only male priests could eat it

🏕️ It had to stay inside the tabernacle courtyard

📖 It never left with an ordinary family

# Leviticus 2:4-7
# 🔥 Three Ways To Bake It
---
## 📜 If Thou Bring An Oblation Of A Meat Offering

"Oblation" is simply another word for offering.

It comes from a root meaning something brought or given.

It is not a new or separate category of gift.

The word appears again later in this same chapter.

Every oblation named here is still the same grain offering.

📜 "Oblation" simply means offering

🔁 It is not a new category of gift

🌾 Every oblation here is a grain offering

📖 The word returns later in this chapter

## 🔥 It Shall Be Unleavened Cakes Of Fine Flour

An Israelite home oven was usually a clay cylinder heated by fire.

Families used it every day just to bake their bread.

"Unleavened" meant made without yeast, so the dough never rose.

"Mingled with oil" meant the oil was worked into the dough itself.

This gave the worshipper a real choice beyond raw flour alone.

🔥 A clay oven was normal kitchen equipment

🍞 "Unleavened" meant no yeast, no rising

🥣 "Mingled with oil" meant oil inside the dough

📖 Baking gave the worshipper another option

## 🫓 Or Unleavened Wafers Anointed With Oil

Wafers were a second option baked in that same oven.

A wafer was thin and flat, closer to a cracker.

"Anointed with oil" meant the oil went on top, not inside.

Cakes had oil mixed into the dough before baking began.

Wafers had oil brushed on only after they came out.

🫓 Wafers were thin, more like a cracker

🖌️ "Anointed" meant oil applied on top

🔀 Cakes and wafers used oil differently

📖 Two textures, one same offering

## 🍳 Baken In A Pan

A "pan" here meant a flat griddle, not an enclosed oven.

This bread cooked directly over an open flame instead.

It was closer to a modern flatbread than a loaf.

Ordinary households already owned equipment like this for daily meals.

God asked for no special tools, only what a home already had.

🍳 A "pan" meant a flat griddle

🔥 It cooked over an open flame

🏠 Ordinary households already owned one

📖 No special equipment was ever required

## ✂️ Part It In Pieces, And Pour Oil Thereon

This griddle bread was broken apart only after it finished baking.

Oil was then poured over the broken pieces on top.

Cakes from the oven had oil worked into the dough first.

This method poured oil on only after the baking was done.

Even a small detail like oil order got its own instruction.

✂️ Bread was broken apart after baking

🫒 Oil went on top of the pieces

🔀 The order differed from the oven cakes

📖 Even small details carried real instruction

## 🫕 Baken In The Fryingpan

A "fryingpan" was deeper than the flat pan just described.

More oil was likely involved than the griddle method used.

This was closer to frying than to simple grilling.

Three separate cooking methods now sit side by side in this chapter.

Oven, pan, and fryingpan all counted as the same valid gift.

🫕 A "fryingpan" was deeper than a flat pan

🫒 More oil was likely used here

🥘 This was the third cooking method offered

📖 Every method counted as the same gift

# Leviticus 2:8-10
# 🚶 From Table To Altar
---
## 🚶 Presented Unto The Priest, He Shall Bring It Unto The Altar

Baked bread still had to make the same journey as raw flour.

It moved from the worshipper's hands into the priest's hands first.

Only then did the priest carry it to the altar himself.

No worshipper reached the altar directly, no matter how the bread was cooked.

The method of baking never changed who was allowed near the altar.

🚶 Baked bread still passed through the priest first

🚫 No worshipper reached the altar directly

🔁 This matched the raw flour offering exactly

📖 Cooking method never changed who approached the altar

## 🔥 The Priest Shall Take From The Meat Offering A Memorial Thereof

The same "memorial" idea from the raw flour offering returns here.

A portion, not the whole loaf, went up as smoke.

This held true whether the offering arrived raw or already baked.

The priest's task at the altar never actually changed.

Only the bread's shape at the start looked different.

🔥 Only a portion was ever burned

🔁 The same memorial process applied again

🍞 Raw or baked, the rule stayed the same

📖 The priest's task at the altar never changed

## 🌬️ Of A Sweet Savour Unto The LORD

This exact phrase already closed several offerings back in chapter one.

"Sweet savour" does not mean God needed the smell or the smoke.

It means the offering, given rightly, was accepted and pleasing to Him.

An animal offering and a grain offering could both earn this same phrase.

The words describe God's response, not His appetite.

🌬️ "Sweet savour" meant accepted, not needed

🔁 Chapter one used this same phrase too

🐄🌾 Both animal and grain gifts could earn it

📖 The phrase describes God's response, not His hunger

## 🍞 That Which Is Left Shall Be Aaron's And His Sons'

Verse three already said this about the raw offering.

Verse ten repeats it again for the baked version.

Leftover bread fed the priests exactly the same way both times.

The "most holy" restriction carried over unchanged as well.

Whether raw or baked, the ending rule never moved.

🍞 The same leftover rule applies again

🔁 Verse three and verse ten nearly match

⭐ The "most holy" restriction carried over too

📖 Raw or baked, the ending rule held

# Leviticus 2:11-13
# 🧂 No Leaven, No Honey, Always Salt
---
## 🚫 Shall Be Made With Leaven

"Leaven" is yeast, or anything that makes dough rise and ferment.

Every grain offering described so far had to stay unleavened.

Scripture often uses leaven as a picture of something that spreads.

Exodus twelve already required Israelite homes to be cleared of leaven for Passover.

This chapter carries that same warning straight onto the altar.

🚫 "Leaven" meant yeast or any rising agent

🍞 Every grain offering here stayed unleavened

🔁 The same warning now reaches the altar

📖 Exodus twelve already banned leaven for Passover

## 🍯 Nor Any Honey

Honey is banned right alongside leaven in this same verse.

Like leaven, honey can ferment and sour with time.

Honey was also commonly used in offerings to other gods nearby.

Banning both kept Israel's offerings clearly different from its neighbors.

A small ingredient rule protected a much bigger boundary.

🍯 Honey can ferment and sour like leaven

🌍 Honey was common in offerings to other gods

🔒 Banning both set Israel's worship apart

📖 A small rule protected a bigger boundary

## 🌾 The Oblation Of The Firstfruits

This is not the same firstfruits offering described later in this chapter.

Leviticus twenty three seventeen describes leavened loaves waved at the Feast of Weeks.

Those loaves were allowed to contain leaven.

They were never burned on the altar as a sweet savour offering.

A single word here can point to two different gifts.

🤔 This differs from the firstfruits offering later on

🍞 Leviticus twenty three describes leavened loaves instead

🔥 Those loaves were never burned this way

📖 One word can name two different gifts

## 🔥 They Shall Not Be Burnt On The Altar For A Sweet Savour

This firstfruits gift skipped the memorial and altar step entirely.

Every grain offering earlier in this chapter went through fire.

This one did not, because it served a different purpose.

Leviticus twenty three explains it as part of a festival, not this altar process.

Not every good gift to God burned the same way.

🚫 This offering skipped the altar fire

🌾 Earlier offerings in this chapter all burned

🎉 This one served a festival purpose instead

📖 Not every gift to God worked the same

## 🧂 The Salt Of The Covenant Of Thy God

Salt does not ferment or spoil the way leaven and honey do.

It preserves things instead of breaking them down over time.

This verse borrows that quality to describe God's covenant with Israel.

A covenant sealed with salt was meant to be durable and lasting.

Numbers eighteen and second Chronicles thirteen use this same phrase again.

🧂 Salt preserves instead of spoiling

🤝 This describes God's lasting covenant

⏳ A covenant of salt meant durable and permanent

📖 Numbers and Chronicles repeat this same phrase

## 🌍 With All Thine Offerings Thou Shalt Offer Salt

This command was not limited to the grain offering alone.

Salt had to accompany every kind of offering brought to God.

Its presence was constant, required, and never optional.

Even a small detail like this still had to be obeyed.

Nothing brought to the altar was considered too minor to matter.

🧂 Salt was required with every offering

🌍 Its presence was constant across all worship

📏 Even small requirements were never optional

📖 Nothing brought to God was too minor

# Leviticus 2:14-16
# 🌱 The Firstfruits Offering
---
## 🎁 Meat Offering Of Thy Firstfruits Unto The LORD

"Firstfruits" meant giving God a portion before the whole harvest was even in.

A family did not yet know how large that year's harvest would be.

Giving first, not last, was an act of real trust.

Leviticus twenty three later covers Israel's larger national feast of firstfruits.

This early gift trusted God before the outcome was ever known.

🎁 "Firstfruits" came before the full harvest

🙏 Giving first required real trust in God

🌾 This came before the outcome was known

📖 Leviticus twenty three describes the national feast

## 🌽 Green Ears Of Corn Dried By The Fire

"Corn" in the King James Bible does not mean American corn.

It is a general word for grain, most likely barley here.

Barley ripened earliest each year in Israel's growing season.

"Green ears" meant the grain was fresh, not dried in storage first.

"Dried by the fire" meant the fresh grain was parched over flame.

🌽 "Corn" here meant grain, not maize

🌾 This was likely barley, the earliest crop

🔥 "Green" meant fresh, not stored and dried

📖 Parching prepared the fresh grain for use

## 🌾 Corn Beaten Out Of Full Ears

After parching, the grain still had to be threshed by hand.

"Beaten out" meant separating the grain from its husk.

This offering stayed rough and unprocessed, unlike the fine flour from verse one.

A worshipper could bring something straight from the field, unrefined.

Even an unrefined gift like this one was fully acceptable.

🌾 "Beaten out" meant threshed by hand

🚜 This was rougher than the fine flour offering

🎁 Straight from the field, still acceptable

📖 God accepted the offering in its rough state

## 🫒 Thou Shalt Put Oil Upon It, And Lay Frankincense Thereon

This threshed grain got the same oil and frankincense as verse one.

The chapter's basic recipe never actually changed from start to end.

A humble offering straight from the field still received full treatment.

God's attention never shrank for a simple gift.

The richest form and the plainest form shared the same core.

🫒 Oil and frankincense returned just as before

🔁 The recipe stayed the same throughout

🌾 A humble gift still got full treatment

📖 God's attention never shrank for a simple gift

## 🔥 Part Of The Beaten Corn Thereof, And Part Of The Oil Thereof

The chapter ends the same way it built its pattern throughout.

A portion was burned as a memorial, never the whole gift.

Raw flour, three kinds of baked bread, and roasted grain all end this way.

The offering's form changed five times across this chapter.

The underlying process never changed even once.

🔥 A memorial portion closed this offering too

🌾 Every form in this chapter ended alike

🍞 Bread and grain both closed the same way

📖 Five forms, one unchanging process`.trim();

export const LEVITICUS_TWO_PERSONAL_SECTIONS = parseLeviticusTwoRawNotes(LEVITICUS_TWO_RAW_NOTES);
