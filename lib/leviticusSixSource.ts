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

# 🤥 Stealing, Lying, And Making It Right

---

## 🔗 And The LORD Spake Unto Moses, Saying

This new instruction picks up right where chapter 5 left off. Chapter 5:14-19 introduced the trespass offering for mishandling holy things or breaking an unnamed rule. This section names specific, everyday wrongs the same offering also covers: lying to a neighbor, theft, and fraud.

🔗 This continues chapter 5:14-19's trespass offering into new, specific cases

🤝 These new cases are wrongs between neighbors, not just against holy things

📖 Leviticus keeps building one offering system case by case, not all at once

---

## 🤥 Commit A Trespass Against The LORD, And Lie Unto His Neighbour

This verse makes a bold claim: lying to another person counts as trespassing against the LORD himself. In Israel's covenant community, wronging a neighbor was never treated as a private matter that only involved the two people directly affected.

🤥 Lying to a neighbor is here labeled a trespass against God

🤝 Israel's community was bound together by covenant, not just proximity

⚖️ Wrongs between people were never treated as purely private

---

## 🤝 In That Which Was Delivered Him To Keep, Or In Fellowship

"Delivered him to keep" describes a deposit - something left in someone's care, like a modern safe-deposit box, with a clear expectation it would be returned untouched. "Fellowship" here points to a business partnership, like a shared investment where partners trusted each other with money or goods.

🤝 "Delivered...to keep" means an item left in trusted safekeeping

🤝 "Fellowship" here means a business partnership involving shared property

💰 Both situations rest entirely on trust between two people

---

## 👊 Or In A Thing Taken Away By Violence

This covers straightforward robbery - taking something by force rather than through fraud or broken trust. Unlike the deposit and partnership cases just named, this one doesn't require any prior relationship at all; it's plain theft.

👊 This case is outright robbery, taken by force

🆕 No prior trust relationship is needed for this case to apply

📋 It sits alongside fraud cases as an equally serious wrong

---

## 😈 Or Hath Deceived His Neighbour

This phrase is a catch-all, covering any other way one person might cheat or trick another that the earlier, more specific cases didn't already name. Leviticus doesn't try to list every possible scam; it closes the loop by including whatever else counts as deceit.

😈 This phrase catches any remaining kind of trickery or fraud

📋 Leviticus doesn't attempt to name every possible scam individually

🔒 The broad wording closes any loophole the specific cases might miss

---

## 🔍 Have Found That Which Was Lost, And Lieth Concerning It, And Sweareth Falsely

This describes someone who stumbles onto lost property, then makes it worse in two escalating steps: first lying about having it, then backing up the lie with a false oath in God's name. What started as an honest opportunity to return something quietly becomes a much bigger sin.

🔍 Finding lost property isn't the sin - lying about it is

📈 The wrong escalates from a lie to a false oath sworn before God

⚖️ A false oath treats God's name as a tool for covering up guilt

---

## ↩️ He Shall Restore That Which He Took Violently Away

No matter which of these situations applied - robbery, fraud, a broken deposit, or a lie about lost property - the very first requirement is the same: give it back. Ritual and forgiveness come later; making the victim whole comes first.

↩️ Every case listed above shares this same first requirement

🥇 Returning the property comes before any ritual or offering

🤝 This puts the wronged neighbor's loss first, not just the guilty person's conscience

---

## ➕ Shall Add The Fifth Part More Thereto

This repeats chapter 5:16's exact penalty: repay the full value, then add another 20% on top. Simple return wasn't enough - the added cost made sure the guilty person actually lost something by having done wrong, instead of breaking even once caught.

➕ This is the same 20% penalty chapter 5:16 already introduced

⚖️ Simple repayment alone wasn't considered sufficient

💸 The extra cost meant wrongdoing never simply broke even

---

## 📅 In The Day Of His Trespass Offering

The restitution and the ritual offering weren't separated by time - both were expected to happen together, on the same day. Justice toward the wronged neighbor and worship toward God moved forward as one single event, not two unrelated steps handled whenever it was convenient.

📅 Repayment and the ritual offering happened on the same day

🔗 This ties fixing the human wrong to worship, not two separate errands

⏰ Nothing here allowed for delaying justice toward the neighbor

---

## 🐏 A Ram Without Blemish...With Thy Estimation

The required animal is a ram, and its worth is set by "thy estimation" - the priest's official valuation, using the fixed "shekel of the sanctuary" standard chapter 5:15 already introduced. This matches the exact offering already required for mishandling holy things back in chapter 5:14-19, now applied to wrongs against a neighbor's property instead.

🐏 A ram is required, matching chapter 5:14-19's holy-things trespass offering

⚖️ "Thy estimation" means the priest set the official value owed

🔁 The same fixed offering now covers wrongs against people, not just holy things

---

## ✝️ The Priest Shall Make An Atonement For Him Before The LORD: And It Shall Be Forgiven Him

The chapter closes with the same formula used repeatedly since chapter 4: whatever the specific wrong was, the outcome of confession, restitution, and offering together is complete forgiveness. Making things right with the neighbor and making things right with God are treated as one connected process, not two separate transactions.

✝️ This closing formula has repeated since chapter 4 for every offering type

🤝 Restitution to the neighbor and atonement before God are one process

🎯 Forgiveness is the stated outcome, not left in doubt

# Leviticus 6:8-13

# 🔥 The Fire That Never Goes Out

---

## 👔 Command Aaron And His Sons...This Is The Law Of The Burnt Offering

This marks a real shift in the book. Chapters 1-5 were written for the ordinary Israelite bringing an offering. Starting here, Leviticus turns to instructions written specifically for the priests - what Aaron and his sons must actually do once an offering reaches the altar.

👔 Chapters 1-5 addressed the offerer; this section addresses the priest

🔄 Same offerings as before, now shown from the priest's side of the altar

📖 This "law of the burnt offering" pattern repeats for each offering type in this chapter

---

## 🌙 Because Of The Burning Upon The Altar All Night Unto The Morning

Unlike a quick cooking fire, the burnt offering was left to burn slowly through the entire night, not consumed and finished within the hour. This detail explains why the fire needed constant priestly attention rather than being lit and simply walked away from.

🌙 The burnt offering burned slowly through the whole night

⏰ It wasn't a quick fire, finished and forgotten within the hour

👀 This is why the fire needed a priest watching over it constantly

---

## 👖 The Priest Shall Put On His Linen Garment, And His Linen Breeches

This is plain linen work clothing, not the elaborate, jeweled high priestly garments described back in Exodus 28. "Breeches" were undergarments specifically required for modesty during this physical, hands-in-the-ashes task, matching the same modesty rule Exodus 28:42 already set for priestly service.

👖 This plain linen differs from the ornate high priestly garments of Exodus 28

🩲 "Breeches" are undergarments, required here specifically for modesty

🔁 Exodus 28:42 already established this same modesty requirement for priests

---

## 🧹 Take Up The Ashes...And He Shall Put Them Beside The Altar

Every morning began with this task: gathering the ashes left over from the night's burning and setting them beside the altar. This was the first order of business of each new day of tabernacle service, before anything else could happen.

🧹 Gathering the ashes was the very first task of each new day

📍 The ashes were first set beside the altar, not immediately carried away

🔁 This happened every single morning without exception

---

## 👕 Put Off His Garments, And Put On Other Garments

Before carrying the ashes outside the camp, the priest changed out of his ministry linens into different clothes. The garments worn while serving at the altar were treated as too holy to wear for the separate task of hauling ashes out to a disposal site.

👕 The priest changed clothes before the next task of carrying ashes out

✨ Ministry garments were kept too holy for the ash-disposal task

🔀 Two different tasks required two visibly different sets of clothing

---

## 🚮 Carry Forth The Ashes Without The Camp Unto A Clean Place

The ashes weren't simply dumped nearby. They were carried entirely outside the camp to a specific place still described as "clean" - meaning even leftover ash from a holy fire was handled with care and respect, not treated as ordinary trash.

🚮 Ashes were carried all the way outside the camp, not left nearby

✨ Even this leftover ash was still called a "clean place," not a trash heap

🙏 Reverence extended even to what the fire left behind

---

## 🔥 The Fire Upon The Altar Shall Be Burning In It; It Shall Not Be Put Out

This is the first explicit command that the altar fire must never be extinguished. From this point forward, keeping the flame alive became an ongoing priestly responsibility, not something restarted from scratch for each new offering.

🔥 This is the first direct command that the fire must never go out

🔄 The same flame stayed lit rather than being relit for every offering

📋 Keeping it burning became an ongoing priestly duty, not a one-time task

---

## 🪵 Burn Wood On It Every Morning, And Lay The Burnt Offering In Order Upon It

Feeding the fire fresh wood and arranging that day's burnt offering "in order" - meaning properly and deliberately, not carelessly tossed on - was the priest's first daily duty at the altar, done before any other offering that day could be handled.

🪵 Adding fresh wood each morning kept the continual fire going

📐 "In order" means arranged deliberately, not thrown on carelessly

🥇 This was the priest's first daily task at the altar

---

## 🐑 He Shall Burn Thereon The Fat Of The Peace Offerings

The fat portions from peace offerings, described back in chapter 3, were burned on this same continual fire rather than on a separate one. One altar and one ongoing flame served every offering type brought throughout the day.

🐑 Peace offering fat, from chapter 3, burned on this identical fire

🔥 One continual flame served every offering type, not a separate fire each time

🔗 This ties the peace offering directly into the burnt offering's fire system

---

## 🔥 The Fire Shall Ever Be Burning Upon The Altar; It Shall Never Go Out

This command closes the section by repeating verse 12's point, word for word in meaning, for emphasis. A flame that never went out symbolized that access to God through sacrifice was never suspended, not even overnight, not even for a moment.

🔥 This repeats verse 12's command, underlining it with emphasis

🕯️ A never-extinguished flame symbolized worship that never paused

⏳ Access to God through sacrifice was never treated as "closed for the night"

# Leviticus 6:14-18

# 🍞 What The Priests Eat

---

## ⚖️ This Is The Law Of The Meat Offering: The Sons Of Aaron Shall Offer It Before The LORD, Before The Altar

"Meat offering" in the KJV means a grain offering, not animal meat - the same offering fully described back in chapter 2. This verse repeats "before" twice, stressing that the act happened both in God's presence and at the specific altar location, not as some vague, generic ritual.

⚖️ "Meat offering" in the KJV means grain offering, from chapter 2

🔁 "Before the LORD" and "before the altar" are repeated for emphasis

📍 This grounds the ritual in one specific place, not a vague ceremony

---

## ✋ Take Of It His Handful...Burn It Upon The Altar For A Sweet Savour, Even The Memorial

This "memorial" handful is the same symbolic portion chapter 2 already described - a small token amount burned to represent the whole gift being given to God, even though most of the flour never touches the fire at all.

✋ "Memorial" repeats the same symbolic handful chapter 2 introduced

🔥 Only a small portion is actually burned, standing in for the whole gift

🔁 Leviticus reuses this term rather than inventing new language for it

---

## 🍞 The Remainder Thereof Shall Aaron And His Sons Eat: With Unleavened Bread...In The Holy Place

After the memorial handful is burned, the leftover flour becomes food for the priests - but with two conditions: it must be baked without leaven, and it must be eaten in the holy place, not carried home to an ordinary house.

🍞 The leftover flour, after the burned handful, became priestly food

🚫 It had to be baked without leaven, unlike ordinary daily bread

🏛️ It had to be eaten in the holy place, not taken home

---

## 🏛️ In The Court Of The Tabernacle Of The Congregation They Shall Eat It

This narrows the location even further than "the holy place" alone - specifically the court, the outer enclosed area of the tabernacle grounds. Even something as ordinary as a priest's meal had a fixed, sacred location rather than being left to personal preference.

🏛️ "The court" narrows the eating location even more precisely

📐 Even a priest's meal happened in one fixed, designated place

🔒 Nothing about this offering's leftovers was left to personal choice

---

## 🚫 It Shall Not Be Baken With Leaven

Leaven acts as a rising agent, and in several biblical contexts it pictures corruption or spreading sin. Chapter 2 already banned leaven from grain offerings burned on the altar; this verse confirms the same ban even applies to the portion the priests simply eat as food.

🚫 Leaven is a rising agent, often pictured elsewhere as spreading corruption

🔁 Chapter 2 already banned leaven from the burned portion of grain offerings

🍞 This verse extends that same ban to the priests' eaten portion too

---

## 👑 It Is Most Holy, As Is The Sin Offering, And As The Trespass Offering

"Most holy" was the highest category of sacredness in the tabernacle system. This verse groups the grain, sin, and trespass offerings together under that same top-level label, showing that "most holy" wasn't only for the biggest or costliest offerings.

👑 "Most holy" marked the highest level of sacredness in this system

🔗 Grain, sin, and trespass offerings all share this identical top category

💰 Holiness here wasn't measured by an offering's size or cost

---

## ♂️ All The Males Among The Children Of Aaron Shall Eat Of It

Only male priests were permitted to eat this most-holy food - priests' wives and daughters were excluded from this specific portion, even though they were part of a priest's household in every other way.

♂️ Eating this most-holy food was restricted to male priests only

👪 Priests' wives and daughters were excluded from this specific food

🔒 The restriction applied narrowly to this one category of offering

---

## 📜 It Shall Be A Statute For Ever In Your Generations

"For ever in your generations" means this rule wasn't temporary or tied to one specific moment in Israel's history - it was meant to continue being followed by every future generation of priests without exception.

📜 "For ever in your generations" signals a rule with no expiration

🔁 Every future generation of priests was expected to keep following it

🏛️ This wasn't a one-time instruction limited to Aaron's own lifetime

---

## ✨ Every One That Toucheth Them Shall Be Holy

Holiness here worked like something contagious by contact - touching this most-holy food transferred a kind of sacred status onto whatever or whoever touched it. This same principle will matter again later in the chapter with the sin offering's blood and vessels.

✨ Holiness spread by direct contact, almost like something contagious

🔗 Whatever touched this food took on that same sacred status

📖 This exact principle returns later in the chapter with the sin offering

# Leviticus 6:19-23

# 🥞 The High Priest's Own Daily Offering

---

## 👑 This Is The Offering Of Aaron And Of His Sons, Which They Shall Offer...In The Day When He Is Anointed

This new offering belongs personally to the high priest, tied to his anointing day - the day he was formally set apart and consecrated into office. Unlike the offerings covered so far, this one isn't brought by ordinary Israelites at all; it's the priest's own required gift.

👑 This offering is tied specifically to the high priest's own anointing day

🆕 Every other offering so far came from ordinary Israelites, not the priest himself

🔁 Verse 22 later confirms this repeats for every high priest after Aaron

---

## ⚖️ The Tenth Part Of An Ephah Of Fine Flour

This is the exact same measurement, one omer, that chapter 5:11 already used as the flour amount for Israel's very poorest sinner. Here, the same small measure becomes the high priest's own required daily offering - the highest office in Israel using the same modest amount set aside for the poor.

⚖️ This is the same omer measure chapter 5:11 gave the poorest offerer

👑 The high priest's own offering uses this identical modest amount

🤝 Rank in Israel didn't come with an exemption from this small, humble measure

---

## 🌅 Perpetual, Half Of It In The Morning, And Half Thereof At Night

Splitting the offering into a morning half and an evening half matches the twice-daily rhythm of the continual burnt offering already established in Exodus 29:38-42. This offering bookended the priest's entire day of service, morning and night, without fail.

🌅 This morning-and-night split matches Exodus 29:38-42's continual burnt offering

📆 It bookended the priest's whole day, every single day, without exception

🔁 "Perpetual" means this never stopped happening, generation after generation

---

## 🍳 In A Pan It Shall Be Made With Oil; And When It Is Baken, Thou Shalt Bring It In

Chapter 2 already described three cooking methods for grain offerings: oven, flat pan, and fryingpan. This offering specifically uses the flat pan method, mixed with oil before baking, then brought in to the altar once finished.

🍳 This uses the flat-pan method, one of chapter 2's three cooking options

🫒 The flour was mixed with oil before baking, not afterward

📖 Chapter 2:5 is where this exact pan method was first described

---

## 🌸 The Baken Pieces...Offer For A Sweet Savour Unto The LORD

"Sweet savour" is the same formula used across nearly every offering type in Leviticus so far - not a literal pleasant smell to God, but a way of saying the offering was fully accepted, done correctly, and welcomed.

🌸 "Sweet savour" repeats the acceptance formula used across this whole book

✅ It signals the offering was done correctly and fully accepted

🔁 The exact same phrase already appeared for burnt, grain, and peace offerings

---

## 🔥 Every Meat Offering For The Priest Shall Be Wholly Burnt: It Shall Not Be Eaten

This closes with a sharp contrast to verse 16. When an ordinary Israelite brought a grain offering, the priests ate the leftover portion as food. But when the priest brings this offering for himself, none of it is eaten by anyone - it's given completely to the fire.

🔥 This contrasts directly with verse 16's priestly food from the people's offerings

🚫 No one, not even the priest himself, ate any part of his own offering

🎯 His personal offering was given entirely, with nothing kept back as food

# Leviticus 6:24-30

# 🩸 Blood That Cannot Be Washed Away Lightly

---

## 📍 In The Place Where The Burnt Offering Is Killed Shall The Sin Offering Be Killed...It Is Most Holy

The sin offering, first described in chapter 4, is killed in the exact same spot as the burnt offering - not a separate location. This verse also confirms the sin offering shares the same "most holy" ranking already given to the grain and trespass offerings back in verse 17.

📍 The sin offering is killed in the same location as the burnt offering

👑 It shares the identical "most holy" category with the grain and trespass offerings

🔗 One shared location and ranking connects several offering types together

---

## 🍽️ The Priest That Offereth It For Sin Shall Eat It: In The Holy Place...In The Court Of The Tabernacle

Here's a sharp contrast worth noticing: the burnt offering (verses 8-13) is never eaten by anyone - it's wholly given to the fire. But this sin offering is eaten by the priest, in the same "holy place...court of the tabernacle" location already specified for the grain offering in verse 16.

🍽️ Unlike the burnt offering, the sin offering is eaten by the priest

🚫🔥 The burnt offering, by contrast, is never eaten by anyone at all

📍 The eating location matches verse 16's grain offering location exactly

---

## ✨ Whatsoever Shall Touch The Flesh Thereof Shall Be Holy

This repeats verse 18's same contact-holiness principle, now applied to the sin offering's meat instead of the grain offering. Holiness transferred by direct physical touch, treated as a real, almost physical property rather than just a symbolic idea.

✨ This repeats verse 18's identical contact-holiness principle

🔗 The same rule now applies to the sin offering instead of the grain offering

🤲 Holiness is treated here as something real that spreads by touch

---

## 🩸 Sprinkled Of The Blood...Upon Any Garment, Thou Shalt Wash That...In The Holy Place

If any of the sin offering's blood accidentally splashed onto a priest's clothing, that garment had to be washed - and specifically inside the holy place itself, not taken home or cleaned anywhere ordinary. Blood from this offering was never treated as something to simply wipe away casually.

🩸 Blood-stained garments required washing, not casual wiping away

🏛️ The washing itself had to happen inside the holy place

⚠️ This shows how seriously this blood's holiness was treated, even by accident

---

## 🏺 The Earthen Vessel Wherein It Is Sodden Shall Be Broken

"Sodden" means boiled. Clay pots are porous, meaning they slowly soak up whatever is cooked in them. Because this meat was most holy, a clay pot that absorbed even a trace of it could never be trusted for ordinary use again - so it was simply broken and discarded.

🏺 "Sodden" is the old word for boiled

🧽 Clay is porous and absorbs whatever is cooked inside it

💥 A pot that absorbed most-holy meat was broken rather than reused

---

## 🍲 If It Be Sodden In A Brasen Pot, It Shall Be Both Scoured, And Rinsed In Water

"Brasen" means made of brass or bronze. Unlike porous clay, a bronze pot's smooth surface doesn't absorb what's cooked in it, so it could be thoroughly scrubbed and rinsed clean instead of destroyed - the material itself determined whether it could be reused.

🍲 "Brasen" means made of brass or bronze

🧼 Bronze doesn't absorb liquid the way clay does, so it could be cleaned

🔁 The pot's material, not the food itself, decided if it could be reused

---

## ♂️ All The Males Among The Priests Shall Eat Thereof: It Is Most Holy

This repeats verse 18's identical male-only restriction, now stated for the sin offering. Whether it was the grain offering or the sin offering, this most-holy food stayed limited to male priests specifically, not their whole households.

♂️ This repeats verse 18's same male-only restriction

🔗 Both the grain offering and sin offering share this identical rule

👪 The restriction excluded the rest of a priest's household either way

---

## 🔥 If Any Of The Blood Is Brought Into The Tabernacle...To Reconcile Withal...It Shall Be Burnt In The Fire

This is an important exception to the "priest eats it" rule just given. Chapter 4:1-21 described a different kind of sin offering - for the high priest himself or the whole congregation - where the blood is carried inside the tent itself, not just applied to the outer altar. Whenever that happens, the meat is burned outside the camp instead of eaten by anyone.

🔥 This is an exception to the eating rule stated earlier in this section

📖 Chapter 4:1-21 covers exactly this case: blood carried inside the tent

🚫 When that happens, the meat is burned outside camp, never eaten

---

## 📖 Two Kinds Of Priestly Law: Fire That Never Stops, Food That Feeds The Priests

Stepping back across the whole chapter: the burnt offering (verses 8-13) is wholly given to a fire that must never go out, while the grain and ordinary sin offerings (verses 14-18, 24-29) are partly burned and partly eaten by the priests as food. Even the disposal rules for cooking vessels - a broken clay pot versus a scoured bronze one - show that holiness in this system always had real, physical, practical consequences, not just symbolic ones.

📖 The chapter's three offering types split into "wholly burned" versus "partly eaten"

🍽️ Grain and ordinary sin offerings fed the priests; burnt offerings never did

🏺 Even cookware rules show holiness carried real, physical consequences`;

export const LEVITICUS_SIX_PERSONAL_SECTIONS = parseLeviticusSixRawNotes(LEVITICUS_SIX_RAW_NOTES);
