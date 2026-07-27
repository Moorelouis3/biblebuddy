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

"Meat" here doesn't mean flesh at all - in Old English, "meat" just meant food in general, and this offering was made of grain, not an animal. This is the second offering type Leviticus describes, right after the burnt offering (olah) in chapter 1, and it's usually called the "grain offering" or "meal offering" in modern translations for exactly this reason.

Unlike the burnt offering, nothing here had to die. A worshipper could approach God with food already growing in his own field.

🌾 KJV "meat" meant food in general, not flesh

🐄 Chapter 1 covered the burnt offering, an animal; chapter 2 covers the grain offering

🌱 No death was required for this kind of offering

---

## 🫒 Fine Flour, Oil, And Frankincense

Three specific ingredients open this chapter. "Fine flour" was flour ground and sifted smooth, without the husks and coarse bits of ordinary flour - it took more time and effort than what a poor family might grind for its own table. Oil and frankincense, a fragrant resin imported from trees that grew far south in Arabia, were both valuable additions layered on top of it.

Together, these three ingredients made this a genuinely costly gift, even though no animal was involved.

🌾 "Fine flour" was finely ground and sifted, more work than ordinary flour

🫒 Olive oil was poured directly onto the flour

🌿 Frankincense, an imported resin, was expensive and fragrant when burned

---

## 🤝 He Shall Bring It To Aaron's Sons The Priests

Just like the burnt offering in chapter 1, a worshipper couldn't handle this offering entirely on his own - it had to be handed over to a priest. Aaron's sons carried out the priestly duties day to day, since Aaron himself couldn't personally process every offering brought to the tabernacle.

🤝 Every offering passed through a priest's hands before reaching the altar

👥 "Aaron's sons" refers to the whole priestly family carrying out daily duties

📖 This same handoff pattern already appeared with the burnt offering in chapter 1

---

## ✋ His Handful...The Priest Shall Burn The Memorial Of It

The priest didn't burn the whole offering - just a handful, along with all the oil and frankincense. That handful is called a "memorial" (azkarah in Hebrew), a representative portion that stood in for the entire gift.

This is a real difference from the burnt offering in chapter 1, where the whole animal went up in smoke. Here, only a token portion was given to God directly.

✋ Only a handful of the flour was burned, not the whole offering

🔥 That handful is called a "memorial" - a token portion representing the whole

🐄 This differs from the burnt offering in chapter 1, which was consumed entirely

---

## 🍞 The Remnant Shall Be Aaron's And His Sons'

Everything left over after the priest's handful became food for the priestly family. This wasn't leftovers nobody wanted - it was one of the main ways the priests, who owned no farmland of their own in Israel, actually got fed.

🍞 "Remnant" means what's left over after the memorial portion was burned

🍽️ This leftover flour became food for Aaron's family

🌾 Priests owned no farmland in Israel, so offerings like this fed them

---

## ⭐ It Is A Thing Most Holy

Leviticus uses two levels of holiness for offerings: "holy" and "most holy." Something "most holy" could only be eaten by priests, only male priests at that, and only within the tabernacle courtyard itself - never taken home to an ordinary family table. This label marks the grain offering as belonging to the highest tier.

⭐ "Most holy" was a stricter category than plain "holy"

👨‍👦 Only male priests could eat something labeled most holy

🏕️ It had to be eaten inside the tabernacle courtyard, never carried home

# Leviticus 2:4-7

# 🔥 Three Ways To Bake It

---

## 📜 "Oblation" Is Just Another Word For Offering

"Oblation" shows up several times in this chapter as another name for the same grain offering already described. It comes from a Latin root meaning "something brought" or "something offered up" - it isn't a separate category, just a different word for the identical gift.

📜 "Oblation" simply means "offering" - not a new or different kind of gift

🔁 The word appears repeatedly through this chapter for the same grain offering

📖 It shows up again later in verses 12 and 13

---

## 🍞 Baken In The Oven: Unleavened Cakes

This verse gives the worshipper a real choice - the raw flour offering from verses 1-3 wasn't the only option. An Israelite household oven was typically a clay cylinder, heated with a fire inside, used daily for baking bread. "Unleavened" means made without yeast, so the dough wouldn't rise.

🔥 A clay oven was standard equipment in an ordinary Israelite home

🍞 "Unleavened cakes" were thick, flat, made without any rising agent

🥣 "Mingled with oil" means the oil was worked into the dough itself

---

## 🫓 Or Unleavened Wafers Anointed With Oil

Wafers were a second option baked in the same oven - thin and flat, more like a cracker than a loaf. Unlike the cakes, which had oil mixed into the dough, wafers were "anointed" - oil brushed or poured onto the surface after baking.

🫓 Wafers were thin, more like a cracker than a loaf of bread

🖌️ "Anointed with oil" means the oil was applied on top, not mixed in

🔀 Cakes and wafers gave a worshipper two different textures to choose from

---

## 🍳 Baken In A Pan: Parted In Pieces

A second cooking method entirely - a flat pan or griddle, rather than an enclosed oven. This is the kind of equipment used for something closer to a modern flatbread, cooked directly over an open fire.

🍳 A "pan" was a flat griddle, different from the enclosed oven of verse 4

🔥 It cooked directly over an open flame rather than inside a chamber

🏠 This was common, everyday cooking equipment, not specialized gear

---

## ✂️ Part It In Pieces, And Pour Oil Thereon

After baking in the pan, the flatbread was broken apart into pieces, and oil was poured over the broken pieces - a different order than the cakes, where oil went into the dough before baking. Small details like this show how carefully Leviticus tracks each variation.

✂️ The bread was broken into pieces after baking, not before

🫒 Oil was poured on top of the broken pieces, not mixed into the batter

📋 Every small variation in method got its own precise instruction

---

## 🫕 Baken In The Fryingpan

A third and final cooking method - deeper than the flat pan of verse 5, likely meaning more oil was involved, closer to how a modern cook might fry something rather than simply grill it flat.

🫕 The fryingpan was deeper than the flat pan described in verse 5

🫒 More oil was likely involved than in the flat-pan method

3️⃣ This is the third of three cooking methods this chapter allows

---

## ⚖️ Three Cooking Methods, One Same Offering

Oven, pan, or fryingpan - the choice was left entirely up to whatever equipment a household already had at home. God didn't require special tools or a particular kind of kitchen; He accepted the same offering made three completely different ways.

🔥 A worshipper could use whatever cooking method he already had

🍞 Every version - cakes, wafers, griddle bread, or fried bread - counted equally

🎯 The variety shows this offering was meant to be accessible, not a burden

# Leviticus 2:8-10

# 🚶 From Table To Altar

---

## 🚶 Presented Unto The Priest, He Shall Bring It Unto The Altar

Once baked, the offering still had to make the same two-step journey as the raw flour offering earlier in the chapter: from the worshipper's hands to the priest, and only then from the priest to the altar. An ordinary Israelite still couldn't walk straight up to the altar himself, no matter how the bread was cooked.

🚶 The offering passed through the priest before ever reaching the altar

🚫 Worshippers still couldn't approach the altar directly, even with baked bread

🔁 This mirrors the exact handoff already described for the raw offering in verse 2

---

## 🔥 The Priest Shall Take...A Memorial Thereof, And Burn It

The same "memorial" concept from verse 2 applies here too - just a portion, not the whole loaf, went up in smoke. Whether the offering arrived as raw flour or as baked cakes, wafers, or fried bread, the priest's job at the altar stayed exactly the same.

🔥 Only a token portion, the memorial, was burned - never the entire loaf

🔁 This matches the memorial process already used for the raw flour offering

🍞 Cooking method changed nothing about how the altar portion was handled

---

## 🌬️ Of A Sweet Savour Unto The LORD

This exact phrase already closed multiple sections of chapter 1's burnt offerings. It means the same thing here: not that God needed the smoke or the smell, but that the offering, given rightly, was accepted and pleasing to Him.

🌬️ "Sweet savour" means the offering was accepted, not that God needed food

🔁 The identical phrase closed several sections in chapter 1's burnt offerings

🐄🌾 Both an animal offering and a grain offering could earn this same description

---

## 🍽️ That Which Is Left Is Aaron's And His Sons': A Thing Most Holy

Verse 3 already said this about the raw offering; verse 10 repeats it almost word for word for the baked version. The leftover bread fed the priests exactly the same way the leftover flour did, and it carried the identical "most holy" restriction, eaten only by priests, only in the tabernacle courtyard.

🍞 The same "leftover feeds the priests" rule applies to every version of this offering

⭐ The "most holy" label repeats here almost word for word from verse 3

🔁 Whether raw or baked, the offering's back half worked identically

---

## 🔁 The Same Words, Repeated On Purpose

Verses 8-10 nearly duplicate verses 2-3, almost sentence for sentence. That repetition isn't accidental - it's the chapter's way of insisting that no matter how the flour was prepared, the underlying process and its meaning never changed.

🔁 Verses 8-10 closely echo verses 2-3 in wording and structure

🎯 The repetition is deliberate, reinforcing the process rather than varying it

🌾 Raw or baked, this offering worked by one consistent set of rules

# Leviticus 2:11-13

# 🧂 No Leaven, No Honey, Always Salt

---

## 🚫 No Meat Offering...Shall Be Made With Leaven

"Leaven" is yeast, or any agent that makes dough rise and ferment. Every version of the grain offering described so far - raw, baked as cakes, wafers, griddle bread, or fried bread - had to stay unleavened. Scripture regularly uses leaven as a picture of something small that spreads and corrupts, the same idea behind the command to clear leaven out of the house before Passover in Exodus 12.

🚫 "Leaven" is yeast or any rising, fermenting agent

📖 Exodus 12 already required Israelite homes to be cleared of leaven for Passover

🔁 Leaven shows up elsewhere in Scripture as a symbol of corruption that spreads

---

## 🍯 Nor Any Honey, In Any Offering Made By Fire

Honey is banned right alongside leaven. Like leaven, honey can ferment and sour over time, and it was also commonly used in offerings to pagan gods throughout the ancient Near East. Banning both together kept Israel's offerings distinct from anything associated with fermentation or with the surrounding nations' worship.

🍯 Honey, like leaven, can ferment and spoil over time

🌍 Honey was commonly used in pagan offerings among Israel's neighbors

🔒 Banning both kept Israel's offerings clearly set apart

---

## 🌾 The Oblation Of The Firstfruits: A Different Kind Of Offering

This verse can be confusing next to verses 14-16, which also mention "firstfruits" and clearly do get burned on the altar. Here, "the oblation of the firstfruits" points to a separate firstfruits gift - most likely the leavened loaves waved before the LORD at the Feast of Weeks in Leviticus 23:17, which were allowed to contain leaven precisely because they were never burned as a sweet savour offering.

🤔 This isn't the same firstfruits offering described later in verses 14-16

🍞 Leviticus 23:17 describes leavened loaves offered at the Feast of Weeks

🔥 That offering could contain leaven specifically because it wasn't burned this way

---

## 🧂 The Salt Of The Covenant Of Thy God

Unlike leaven and honey, salt doesn't ferment or spoil - it preserves things instead of breaking them down. Verse 13 borrows that quality to describe God's covenant with Israel: durable, incorruptible, meant to last. The same phrase, "covenant of salt," reappears later in Numbers 18:19 and 2 Chronicles 13:5 to describe binding, permanent agreements.

🧂 Salt preserves; it's the opposite of things that ferment and spoil

🤝 Calling it "the salt of the covenant" ties this offering to God's lasting promise

📖 Numbers 18:19 and 2 Chronicles 13:5 use this same "covenant of salt" phrase

---

## 🧂 With All Thine Offerings Thou Shalt Offer Salt

This command wasn't just for the grain offering - it applied to every kind of offering brought to the altar. Salt's presence was meant to be constant and universal, a small but required detail attached to everything Israel brought to God.

🧂 Salt was required with every offering, not only the grain offering

🌍 This made salt a universal, non-negotiable part of Israel's worship

📏 Even a small, easy-to-miss requirement like this still had to be obeyed

# Leviticus 2:14-16

# 🌱 The Firstfruits Offering

---

## 🌱 Green Ears Of Corn Dried By The Fire

"Corn" in the King James Bible doesn't mean American corn - it's a general word for grain, most likely barley here, since barley ripened earliest in Israel's growing season. "Green ears" means the grain was still fresh off the stalk, not left to fully dry in storage first, and it was parched over a fire to prepare it for use.

🌽 KJV "corn" means grain in general, not American corn

🌾 This was likely barley, the first grain to ripen each year in Israel

🔥 "Dried by the fire" means the fresh grain was parched, not left to dry naturally

---

## 🌾 Corn Beaten Out Of Full Ears

After parching, the grain still had to be threshed - beaten out of the husks by hand. This was a simple, unprocessed offering, made directly from the field with none of the refinement of the fine flour described back in verse 1.

🌾 "Beaten out" means threshed by hand to separate grain from husk

🚜 This was rougher and less processed than the fine flour of verse 1

🎁 Even an unrefined, simple offering like this one was fully acceptable

---

## 🎁 Offering God The Very First Of The Harvest

Bringing firstfruits meant giving God a portion of the harvest before the rest was even gathered in, before a family knew for certain how large that year's full harvest would be. It was an act of trust, giving first and best rather than waiting to see what was left over.

🎁 Firstfruits were given before the full harvest was even known

🙏 This required trusting God with what hadn't happened yet

📖 Leviticus 23:10-14 later describes Israel's national Feast of Firstfruits offering

---

## 🫒 Oil And Frankincense Again: Same Base Elements

Even this simple, threshed grain got the same oil and frankincense treatment as the fine flour offering back in verse 1. However humble the form the harvest came in, the same core recipe applied all the way through the chapter.

🫒 Oil and frankincense were added here just as they were in verse 1

🔁 The chapter's basic recipe stayed the same from its richest form to its plainest

🌾 Humble grain, straight from the field, still received full, careful treatment

---

## 🔥 The Priest Shall Burn The Memorial: The Chapter's Closing Pattern

The chapter ends exactly the way it built its pattern throughout - a portion burned as a memorial, an offering made by fire unto the LORD. Raw flour, baked bread in three different forms, and now roasted grain straight from the field all funnel into this same closing act.

🔥 A "memorial" portion closes this chapter just as it did in verses 2 and 9

🌾🍞 Every form of grain offering in this chapter ends the same way

✅ The chapter closes having covered five distinct ways to bring the same gift`;

export const LEVITICUS_TWO_PERSONAL_SECTIONS = parseLeviticusTwoRawNotes(LEVITICUS_TWO_RAW_NOTES);
