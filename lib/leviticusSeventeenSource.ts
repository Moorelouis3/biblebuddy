export type LeviticusSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusSeventeenRawNotes(rawText: string): LeviticusSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 17:${startVerse}` : `Leviticus 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 17 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_SEVENTEEN_RAW_NOTES = `# Leviticus 17:1-2
# 📜 A Command For Everyone, Not Just The Priests

## 🗣️ Speak Unto Aaron, And Unto His Sons, And Unto All The Children Of Israel

This law is not addressed to the priests alone.

It goes out to Aaron, his sons, and the whole nation together.

Several laws just before this one were spoken only to Moses or to Moses and Aaron.

This one reaches every household because it regulates something every family actually does.

Killing an animal for food.

The whole camp hears the same rule at the same time.

No one in Israel can say they never got the message.

👨‍👩‍👧‍👦 Addressed to the whole nation

🍖 Regulates something every household does

📜 Widens beyond the priests alone

📖 Everyone in camp hears one rule

## 📖 This Is The Thing Which The Lord Hath Commanded

"Thing" sounds like a vague filler word here.

The Hebrew word behind it can also mean "word" or "matter."

Scripture uses that word to formally introduce something binding.

This phrase works like a legal heading.

It tells the reader that what follows carries full command weight.

Same weight as any other law God gave through Moses.

📜 Functions like a legal heading

🗣️ Thing can also mean word

⚖️ Signals a binding command

📖 Same weight as any other law

# Leviticus 17:3-7
# 🏕️ No More Backyard Sacrifices

## 🐂 That Killeth An Ox, Or Lamb, Or Goat, In The Camp, Or Out Of The Camp

Ox, lamb, and goat are the three standard offering animals.

Leviticus chapters one through seven already used this same list.

Naming "in the camp" and "out of the camp" closes a loophole.

It does not matter where the animal gets killed.

The rule that follows still applies everywhere.

🐂 Ox, lamb, and goat were standard livestock

📍 Covers both inside and outside camp

🚫 Closes any location loophole

📖 One rule applies everywhere

## 🚪 Bringeth It Not Unto The Door Of The Tabernacle Of The Congregation

The tabernacle door was where the bronze altar stood.

That altar was the one legal place a sacrifice could be offered.

Israel was camped in the wilderness with the tabernacle at its center.

"Bring it to the door" meant something concrete and realistic for everyone.

A short walk from any tent in camp, not a distant demand.

🏛️ The one legal altar stood there

🏕️ The camp made this realistic for everyone

📍 One authorized location, no exceptions

➡️ A short walk, not a distant demand

## 🩸 Blood Shall Be Imputed Unto That Man

Killing an animal without bringing it to the tabernacle carries a heavy charge.

The same language used for human bloodguilt gets used here.

This is not simple butchering, it is treated as taking a life wrongly.

The point is not that eating meat is wrong.

Every animal's life belonged to God first.

Skipping the altar treated that life carelessly.

⚖️ Uses the same language as human bloodguilt

🚫 Not a ban on eating meat

🐐 Every animal's life belonged to God first

📖 Skipping the altar treated life carelessly

## ☠️ That Man Shall Be Cut Off From Among His People

"Cut off" is Leviticus's most severe recurring penalty.

It shows up only for the book's most serious violations.

Many scholars believe it meant formal exclusion from the covenant community.

Some believe it could also mean an early death sent directly by God.

Either way, this was far heavier than a fine or a warning.

⚖️ Leviticus's harshest recurring penalty

🚫 Formal exclusion from the covenant community

☠️ Possibly an early death from God's hand

📖 Far heavier than a fine or warning

## 🌾 Which They Offer In The Open Field

Before this law, Israelites had been sacrificing animals out in open fields.

Not at the tabernacle, just wherever a family happened to be.

Many scholars believe this habit was carried over from Egypt.

There had been no central altar to bring anything to before this.

This verse redirects that old habit toward the one true altar.

🌾 Names a habit this law corrects

🇪🇬 Likely carried over from Egypt

🏛️ No central altar existed before this

➡️ Redirects worship toward the one true altar

## 🔥 The Priest Shall Sprinkle The Blood, And Burn The Fat For A Sweet Savour

This restates the exact peace offering procedure from Leviticus chapter three.

Blood goes on the altar, fat gets burned as a fragrant offering.

This chapter is not introducing a brand new sacrifice system.

It is making sure the existing one actually gets used.

Field slaughter gets redirected back into the proper process.

🔗 Matches the peace offering from Leviticus 3

🆕 Not a new ritual, enforces the old one

🔥 Blood on the altar, fat burned as offering

📖 Redirects field slaughter into the proper system

## 🐐 No More Offer Their Sacrifices Unto Devils

"Devils" translates a Hebrew word meaning "hairy ones" or "goat demons."

These were goat shaped idols worshipped in Egypt and nearby nations.

Some Israelites kept sacrificing to these false gods even after the Exodus.

Old habits from Egypt had not fully disappeared yet.

This law puts an end to that practice for good.

🐐 Devils means goat shaped idols

🇪🇬 Worshipped in Egypt and nearby nations

😢 Old idolatry had not fully disappeared

📖 This law ends the practice for good

## 💔 After Whom They Have Gone A Whoring

Scripture regularly compares worshipping false gods to marital unfaithfulness.

Israel's relationship with the Lord gets described in covenant terms.

Almost like a marriage between God and His people.

Calling idol worship "whoring" here is not a throwaway insult.

It is the Bible's normal way of naming the betrayal inside idolatry.

💍 Compares Israel to a marriage covenant

💔 Idolatry named as unfaithfulness, not just wrong belief

📖 A recurring image across the Old Testament

➡️ Names betrayal, not just bad theology

## 🔁 A Statute For Ever Unto Them Throughout Their Generations

"For ever" and "throughout their generations" mark this as a permanent law.

Not a temporary rule for one wilderness season.

Every future generation of Israel stays bound by it.

For as long as this whole covenant system stood.

This same forever language appears elsewhere in Leviticus.

🔁 Marked permanent, not temporary

👨‍👦 Binding on every future generation

📜 Same forever language used elsewhere in Leviticus

📖 A law meant to outlast one generation

# Leviticus 17:8-9
# 🚪 The Rule Widens To Everyone Living Among Israel

## 🌍 Or Of The Strangers Which Sojourn Among You

A "stranger which sojourneth" is a foreigner living long term among Israel.

Not a citizen by birth, but someone settled within the community.

This law reaches beyond native born Israelites to include them too.

No exemption exists just for being a foreign resident.

🌍 A long term foreign resident, not a citizen

🏕️ Settled within the community, not just passing through

🚫 No exemption for foreign residents

📖 The law reaches everyone living in camp

## 🔥 That Offereth A Burnt Offering Or Sacrifice

The same tabernacle door requirement from verses three and four returns here.

So does the same "cut off" penalty.

Both now apply to foreign residents as well as native Israelites.

One rule, applied without exception to everyone living in the camp.

🔁 Repeats the rule from verses three and four

🌍 Now covers foreign residents too

⚖️ One rule, no exceptions by background

📖 Applies to everyone living in the camp

# Leviticus 17:10-12
# 🩸 The Life Is In The Blood

## 🚫 That Eateth Any Manner Of Blood

This bans consuming blood in absolutely any form.

Not only drinking blood straight from an animal.

Also eating meat that still has blood inside it.

Or using blood as an ingredient in food.

This is a total ban, not a limit on quantity.

🚫 Bans blood in any form

🍖 Includes meat still containing blood

📏 A total ban, not a quantity limit

📖 Covers eating and cooking alike

## 👁️ I Will Even Set My Face Against That Soul

This is stronger language than the earlier "cut off" phrase.

It pictures God personally and actively opposing the person.

Not just a penalty applied from a distance.

Eating blood is not treated as a minor dietary mistake.

God treats it as a direct affront against Himself.

👁️ Stronger than cut off, pictures God opposing someone

🚫 Not treated as a minor mistake

⚖️ Treated as a direct affront to God

📖 God takes this rule personally

## ❤️ For The Life Of The Flesh Is In The Blood

This states the theological reason behind the whole chapter's blood rules.

Blood itself represents and carries life.

Losing blood is losing life, a fact anyone can observe.

The entire sacrificial system in Leviticus builds on this one connection.

❤️ Blood represents life itself

🩸 An observation anyone can see is true

📜 The foundation for every blood rule here

📖 One idea holding up the whole system

## 🏛️ Given It To You Upon The Altar To Make An Atonement

Blood has exactly one sacred purpose in this system.

Covering sin on the altar, not being eaten as food.

Treating something with this holy purpose as ordinary food blurs a line.

The line between what is sacred and what is common.

🏛️ Blood's one purpose is atonement

🍽️ Never meant to double as food

⚖️ Keeps sacred and common clearly separated

📖 One substance, one holy purpose

## ✝️ It Is The Blood That Maketh An Atonement For The Soul

This restates the principle in its plainest form yet.

Later Scripture builds directly on this exact idea.

Hebrews nine in the New Testament sums up the whole pattern.

"Without shedding of blood is no remission," meaning no forgiveness.

That later verse points forward to Christ's own blood as the final fulfillment.

📖 Restated here in its plainest form

✝️ Hebrews 9 builds on this principle

🔗 Points forward to Christ's own blood

➡️ One pattern completed in the New Testament

## 🔁 No Soul Of You Shall Eat Blood, Neither Shall Any Stranger

This rule gets repeated a second time within three verses.

Again it includes foreign residents alongside native Israelites.

Scripture rarely doubles back on one point this many times.

That repetition shows how seriously this law was meant to be taken.

🔁 Repeated twice in three verses

🌍 Still includes foreign residents

⚖️ Rare repetition signals real seriousness

📖 Some rules get said more than once

# Leviticus 17:13-14
# 🏹 Even A Hunted Animal's Blood Matters

## 🏹 Which Hunteth And Catcheth Any Beast Or Fowl That May Be Eaten

This extends the same blood rule to wild game.

Not just the domesticated animals named earlier in the chapter.

A deer, a bird, or any other legally edible wild animal.

All of them fall under the exact same blood rule.

🏹 Extends the rule to hunted game

🐦 Includes animals and birds alike

📜 Same rule as earlier livestock

📖 One rule, whether hunted or raised

## 🕳️ He Shall Even Pour Out The Blood Thereof, And Cover It With Dust

A hunted animal could not be brought to the tabernacle altar.

Not the way livestock could be walked there alive.

So its blood had to be poured out on the ground instead.

Then covered with dust, not casually consumed or ignored.

This still treated the blood with real respect.

🏔️ No altar access for wild game

🕳️ Poured out and covered with dust

🙏 Still treated with real respect

📖 Not consumed, not ignored

## 🔁 For It Is The Life Of All Flesh, The Blood Of It Is For The Life Thereof

The chapter restates its core principle a third time now.

This time applied specifically to wild game, not just sacrifices.

The point was never only about formal ritual.

It is about the nature of blood itself, in any animal, anywhere.

🔁 Restated a third time here

🌍 Applies to any animal, not just livestock

📜 About blood's nature, not just ritual

📖 One truth said three different ways

## ☠️ Whosoever Eateth It Shall Be Cut Off

The same severe "cut off" penalty from earlier returns here.

It applies even to an ordinary hunted meal eaten at home.

Far away from the tabernacle, with no priest watching.

Distance from the sanctuary never lowered the seriousness of this rule.

☠️ Same penalty as earlier in the chapter

🏡 Applies to ordinary meals at home

📏 Distance does not lower the stakes

📖 One rule, no matter where you eat

# Leviticus 17:15-16
# 🧼 An Accident Is Different From A Choice

## 💀 That Which Died Of Itself, Or That Which Was Torn With Beasts

"Died of itself" means an animal that died from illness or old age.

Not one that was properly slaughtered at all.

"Torn with beasts" means one killed by a predator like a lion or wolf.

Either way, its blood was never drained on purpose.

💀 Death by illness or old age

🐺 Killed by a predator, not slaughtered

🩸 Blood never properly drained either way

📖 An accident, not a deliberate choice

## ⚖️ Whether It Be One Of Your Own Country, Or A Stranger

The law applies equally to native Israelites and foreign residents alike.

This is the third time this one chapter calls out "the stranger" by name.

No group in the camp could claim this rule did not apply to them.

⚖️ Applies equally to Israelites and residents

🔁 Third time this chapter names the stranger

🚫 No group could claim an exemption

📖 One law, no exceptions by birth

## 🛁 Wash His Clothes, And Bathe Himself In Water, And Be Unclean Until The Even

Eating meat from an animal that died naturally is treated as accidental uncleanness.

Different from the deliberate blood eating named earlier in the chapter.

It gets resolved the same day, through washing and waiting until evening.

That is the same cleansing formula used throughout Leviticus chapters eleven through fifteen.

🔀 Treated differently from deliberate blood eating

🛁 Resolved same day with washing and waiting

📖 Same formula used earlier in Leviticus

➡️ An honest mistake gets a real fix

## ⚠️ If He Wash Them Not, Then He Shall Bear His Iniquity

Skipping the required washing changes everything about this situation.

An accidental, resolvable uncleanness turns into personal guilt he now carries.

"Bear his iniquity" is softer language than "cut off."

It still holds him responsible for ignoring the fix he was given.

⚠️ Skipping the wash turns accident into guilt

📉 Softer than cut off, still real responsibility

🔧 The fix was available and ignored

📖 Responsibility begins where the excuse runs out
`.trim();

export const LEVITICUS_SEVENTEEN_PERSONAL_SECTIONS = parseLeviticusSeventeenRawNotes(LEVITICUS_SEVENTEEN_RAW_NOTES);
