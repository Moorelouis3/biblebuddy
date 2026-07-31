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
---
## 🗣️ Speak Unto Aaron, And Unto His Sons, And Unto All The Children Of Israel
Several of the purity laws just before this chapter, like chapters 13-15, were addressed to Moses or to Moses and Aaron. This one is addressed to the whole nation at once - priests and ordinary people together - because it's about to regulate something every household actually does: killing an animal for food.
👨‍👩‍👧‍👦 Addressed to the entire nation, not only the priests
🍖 It regulates something every household actually does
📜 Signals this law reaches into everyday life, not just tabernacle duty
---
## 📖 This Is The Thing Which The LORD Hath Commanded
"Thing" here isn't a vague filler word - it translates a Hebrew term that can also mean "word" or "matter," and gets used to formally introduce something binding. This phrase works like a legal heading, telling the reader that what follows carries full command weight, same as any other law God has given through Moses.
📜 Functions like a legal heading before the actual rule
🗣️ The Hebrew word behind "thing" can also mean "word"
⚖️ Signals binding command, not friendly advice

# Leviticus 17:3-7
# 🏕️ No More Backyard Sacrifices
---
## 🐂 That Killeth An Ox, Or Lamb, Or Goat, In The Camp, Or That Killeth It Out Of The Camp
These are the same three animals already used throughout the sacrifice instructions in Leviticus 1-7 - the standard livestock of an Israelite household. Naming "in the camp, or out of the camp" closes off any location loophole; it doesn't matter where the animal is killed, the rule that follows still applies.
🐂🐑🐐 Ox, lamb, and goat are the standard offering animals
📍 Covers both inside and outside the camp - no location loophole
📜 Sets up the rule that's about to follow
---
## 🚪 And Bringeth It Not Unto The Door Of The Tabernacle Of The Congregation
The tabernacle's entrance was where the bronze altar stood, the one authorized place a sacrifice could legally be offered. Israel was camped in the wilderness with the tabernacle at its literal center, so "bring it to the door" meant something concrete and realistically possible for everyone at this point in the story.
🏛️ The tabernacle door is where the one legal altar stood
🏕️ Israel's camp was small enough for this to be realistic
📍 One authorized location, no exceptions
---
## 🩸 Blood Shall Be Imputed Unto That Man; He Hath Shed Blood
Killing an ox, lamb, or goat without bringing it to the tabernacle is described using the same language used for shedding human blood - not simple butchering, but bloodguilt. The point isn't that eating meat is wrong; it's that every animal's life belonged to God first, and skipping the altar treated that life carelessly.
⚖️ Uses the same language as bloodguilt for a human death
🚫 Not a ban on eating meat - a ban on skipping the altar
🐐 Every animal's life is treated as belonging to God first
---
## ☠️ That Man Shall Be Cut Off From Among His People
"Cut off" (karet in Hebrew) is Leviticus's most severe recurring penalty, showing up for the book's most serious violations. It most likely means formal exclusion from the covenant community, and possibly an early death understood as coming directly from God rather than a human court.
⚖️ Leviticus's most severe recurring penalty
🚫 Formal exclusion from the covenant community
☠️ Possibly understood as an early death from God's hand, not a court
---
## 🌾 Which They Offer In The Open Field
Before this law, it seems Israelites had been slaughtering and sacrificing animals out in open fields rather than bringing them to the tabernacle - maybe an old habit carried over from Egypt or the patriarchal period, back when there was no single central altar to bring anything to.
🌾 Describes an existing practice this law is correcting
🇪🇬 Possibly a habit carried over from Egypt or earlier generations
🏛️ There was no central altar to bring animals to before this
---
## 🔥 The Priest Shall Sprinkle The Blood...And Burn The Fat For A Sweet Savour
This restates the exact peace offering procedure already laid out back in Leviticus 3 - blood on the altar, fat burned as a fragrant offering. This chapter isn't introducing a new sacrifice system; it's making sure the existing one is actually used instead of bypassed.
📖 Matches the peace offering procedure from Leviticus 3
🆕 Not a new ritual - enforcement of the existing one
✅ Field slaughter gets redirected into the proper system
---
## 🐐 They Shall No More Offer Their Sacrifices Unto Devils
"Devils" translates a Hebrew word (se'irim) that literally means "hairy ones" or "goat-demons" - goat-shaped idols worshipped in Egypt and by surrounding pagan nations. Some Israelites, even after the Exodus, were apparently still sacrificing to these false gods out in open fields instead of to the LORD.
🐐 "Devils" translates a word meaning "goat-demons" or "hairy ones"
🇪🇬 Goat-idol worship was practiced in Egypt and nearby nations
😢 Shows old idolatry habits hadn't fully disappeared after the Exodus
---
## 💔 After Whom They Have Gone A Whoring
The Old Testament regularly compares worshipping false gods to marital unfaithfulness, since Israel's relationship with the LORD was described in covenant, almost marriage-like terms. Calling idol worship "whoring" isn't a throwaway insult - it's the Bible's normal way of naming the betrayal at the heart of idolatry.
💍 Compares Israel's relationship with God to a marriage covenant
💔 Idolatry is described as unfaithfulness, not just wrong belief
📖 A recurring image used throughout the Old Testament
---
## 🔁 This Shall Be A Statute For Ever Unto Them Throughout Their Generations
"For ever" and "throughout their generations" mark this as a permanent law, not a temporary wilderness rule - binding on every future generation of Israel for as long as this covenant system stood.
🔁 Marked as permanent, not a temporary fix
👨‍👦 Binding on every future generation
📜 Same kind of "forever" language used elsewhere in Leviticus

# Leviticus 17:8-9
# 🚪 The Rule Widens To Everyone Living Among Israel
---
## 🌍 Or Of The Strangers Which Sojourn Among You
A "stranger which sojourneth" is a foreigner living long-term among Israel, not a citizen by birth but someone settled within the community. This law reaches beyond native-born Israelites to include them too - no exemption just for being a foreign resident.
🌍 A long-term foreign resident, not a citizen by birth
🏕️ Living within Israel's community, not just passing through
🚫 No exemption for foreign residents
---
## 🔥 That Offereth A Burnt Offering Or Sacrifice...Even That Man Shall Be Cut Off
The same tabernacle-door requirement and the same "cut off" penalty from verses 3-4 are repeated here, in the same structure, now widened to cover foreign residents as well as native Israelites. One rule, applied without exception to everyone living in the camp.
🔁 Repeats the same requirement and penalty from verses 3-4
🌍 Widened to include foreign residents, not just native Israelites
⚖️ One rule, no exceptions based on background

# Leviticus 17:10-12
# 🩸 The Life Is In The Blood
---
## 🚫 That Eateth Any Manner Of Blood
This bans consuming blood in any form at all - not just drinking it straight, but eating meat that still has blood in it, or using blood as an ingredient. It's a total ban, not a limit on quantity.
🚫 Bans blood in any form, not just drinking it directly
🍖 Includes meat still containing blood
📏 A total ban, not a quantity limit
---
## 👁️ I Will Even Set My Face Against That Soul
This is stronger language than the earlier "cut off" phrase - it pictures God personally, actively opposing the person, rather than just a penalty being applied at a distance. Eating blood isn't treated as a minor dietary mistake; it's treated as something God himself takes as a direct affront.
👁️ Stronger than "cut off" - pictures God personally opposing someone
🚫 Not treated as a minor dietary mistake
⚖️ A direct affront taken seriously by God himself
---
## ❤️ For The Life Of The Flesh Is In The Blood
This states the theological reason behind the whole chapter's blood rules: blood itself represents and carries life. It's also basically biologically accurate - loss of blood is loss of life - and the Bible builds its entire sacrificial logic on this observed connection.
❤️ Blood is treated as representing life itself
🩸 An observation that's also biologically accurate
📜 The foundation for every blood rule in this chapter
---
## 🏛️ I Have Given It To You Upon The Altar To Make An Atonement For Your Souls
Blood has exactly one sacred purpose in this system - covering sin on the altar, not being eaten as food. Treating something with this specific holy purpose as ordinary food would blur the line between what's sacred and what's common.
🏛️ Blood's one sacred purpose is atonement on the altar
🍽️ Never meant to double as food
⚖️ Keeps the sacred and the common clearly separated
---
## ✝️ For It Is The Blood That Maketh An Atonement For The Soul
This restates the principle in its plainest form, and later Scripture builds directly on it - Hebrews 9:22 in the New Testament sums up this whole idea as "without shedding of blood is no remission" (forgiveness), pointing forward to Christ's own blood as the final fulfillment of this pattern.
📖 Restated here in its plainest form
✝️ Hebrews 9:22 builds directly on this same principle
🔗 Points forward to Christ's blood as the final fulfillment
---
## 🔁 No Soul Of You Shall Eat Blood, Neither Shall Any Stranger That Sojourneth Among You
The rule is repeated a second time within three verses, again including foreign residents alongside native Israelites. Scripture doubles back on this specific point more than almost any other law in Leviticus, showing how seriously it was meant to be taken.
🔁 Repeated again within the same short passage
🌍 Still includes foreign residents, not just native Israelites
⚖️ Rare level of repetition shows how seriously it's meant

# Leviticus 17:13-14
# 🏹 Even A Hunted Animal's Blood Matters
---
## 🏹 Which Hunteth And Catcheth Any Beast Or Fowl That May Be Eaten
This extends the same blood principle to wild game, not just the domesticated sacrificial animals named earlier. Deer, birds, or any other legally edible wild animal a hunter caught still fell under the exact same blood rule.
🏹 Extends the rule to hunted wild game
🐦 Includes both animals and birds
📜 Same rule as the domesticated animals in verses 3-12
---
## 🕳️ He Shall Even Pour Out The Blood Thereof, And Cover It With Dust
A hunted animal obviously couldn't be brought to the tabernacle altar the way livestock could - so instead, its blood had to be poured out on the ground and covered with dust, treating it with respect rather than casually consuming or ignoring it.
🏔️ A practical alternative since a wild animal can't reach the altar
🕳️ Poured out and covered, not consumed or ignored
🙏 Still treats the blood with respect, just differently
---
## 🔁 For The Life Of All Flesh; The Blood Of It Is For The Life Thereof
The chapter restates its core principle a third time, now applied specifically to wild game - underlining that this isn't only a rule about formal sacrifices, but about the nature of blood itself, in any animal, anywhere.
🔁 The life-in-the-blood principle restated a third time
🌍 Applies to any animal, not just sacrificial livestock
📜 Shows the principle is about blood's nature, not just ritual
---
## ☠️ Whosoever Eateth It Shall Be Cut Off
The same severe "cut off" penalty from earlier in the chapter applies here too, even for blood from an ordinary hunted meal at home, far from the tabernacle. Distance from the sanctuary never lowered the seriousness of this particular rule.
☠️ Same severe penalty as verses 4, 9, and 10
🏡 Applies even to ordinary meals at home
📏 Distance from the tabernacle doesn't lower the stakes

# Leviticus 17:15-16
# 🧼 An Accident Is Different From A Choice
---
## 💀 That Which Died Of Itself, Or That Which Was Torn With Beasts
"Died of itself" means an animal that died from illness or old age rather than being properly slaughtered; "torn with beasts" means one killed by a predator like a lion or wolf. Either way, its blood was never drained the way a sacrificed or hunted animal's blood was.
💀 "Died of itself" means death by illness or old age
🐺 "Torn with beasts" means killed by a predator
🩸 Blood was never properly drained in either case
---
## ⚖️ Whether It Be One Of Your Own Country, Or A Stranger
Once again the law applies equally to native Israelites and foreign residents alike - the third time in this one chapter the text specifically calls out "the stranger," making sure no group could claim this rule didn't apply to them.
⚖️ Applies equally to Israelites and foreign residents
🔁 The third time this chapter specifically includes "the stranger"
🚫 No group could claim exemption
---
## 🛁 He Shall Both Wash His Clothes, And Bathe Himself In Water, And Be Unclean Until The Even
Unlike the deliberate blood-eating earlier in the chapter, eating meat from an animal that died naturally or was killed by a predator is treated as accidental uncleanness - resolved the same day with washing and waiting until evening, the same formula used throughout Leviticus 11-15.
🔀 Treated differently from deliberate blood-eating earlier in the chapter
🛁 Resolved same-day through washing and waiting until evening
📖 Same cleansing formula used throughout Leviticus 11-15
---
## ⚠️ But If He Wash Them Not, Nor Bathe His Flesh; Then He Shall Bear His Iniquity
Skipping the required washing turns an accidental, resolvable uncleanness into personal guilt he now has to carry. "Bear his iniquity" is softer language than "cut off," but it still holds him responsible for ignoring the fix that was available to him.
⚠️ Skipping the washing turns an accident into personal guilt
📉 Softer than "cut off," but still real responsibility
🔧 The fix was available - ignoring it is what causes the guilt
`;

export const LEVITICUS_SEVENTEEN_PERSONAL_SECTIONS = parseLeviticusSeventeenRawNotes(LEVITICUS_SEVENTEEN_RAW_NOTES);
