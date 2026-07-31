export type LeviticusEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusEighteenRawNotes(rawText: string): LeviticusEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 18:${startVerse}` : `Leviticus 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 18 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_EIGHTEEN_RAW_NOTES = `# Leviticus 18:1-5
# 🚫 Don't Live Like Egypt Or Canaan
---
## 🗣️ Speak Unto The Children Of Israel, And Say Unto Them
Like chapter 17, this law is spoken to the whole nation, not filtered through the priests first. Everyone hears it directly, because it's about to describe boundaries every household needs to know, not just a rule for tabernacle service.
👨‍👩‍👧‍👦 Addressed to the whole nation at once
📜 A boundary-setting law for ordinary households
🗣️ Not filtered through priests first
---
## 🆔 I Am The LORD Your God
This exact phrase opens the chapter and then repeats six more times before it ends (verses 4, 5, 6, 21, and 30 twice). It works like a signature stamped on every section, reminding Israel who is actually giving this command and why it carries weight.
🔁 Repeated seven times across this one chapter
✍️ Functions like a signature on each section
⚖️ Grounds the law in God's own authority, not just tradition
---
## 🇪🇬 After The Doings Of The Land Of Egypt, Wherein Ye Dwelt, Shall Ye Not Do
Israel had just spent over 400 years living inside Egyptian culture, so Egyptian family and sexual customs were the only normal most of them had ever known. God names Egypt specifically because its ordinary, everyday practices are exactly what Israel needs to unlearn.
🇪🇬 Egypt was the culture Israel had just left
📅 Over 400 years living inside that culture
🔄 Names the specific unlearning Israel needs to do
---
## 🏜️ And After The Doings Of The Land Of Canaan, Whither I Bring You, Shall Ye Not Do
Canaan is named too, because it's where Israel is headed next, not just where they've been. The warning covers both directions of the journey - the past they're leaving and the future culture they're about to move into.
🏜️ Canaan is the destination, not the past
➡️ Covers both directions of Israel's journey
🚫 Neither culture is the model to copy
---
## 📜 Neither Shall Ye Walk In Their Ordinances
"Ordinances" here means settled customs and religious practices, not just individual bad choices. The command isn't only "don't do these specific acts" - it's "don't adopt this whole way of structuring family and worship life."
📜 "Ordinances" means settled customs, not one-off acts
🏛️ Includes religious practice, not just behavior
🚫 Rejects an entire cultural pattern, not isolated incidents
---
## ⚖️ Ye Shall Do My Judgments, And Keep Mine Ordinances, To Walk Therein
"Judgments" and "ordinances" here are God's own version of the same two categories just used to describe Egypt and Canaan - case-by-case rulings and settled practices. Israel isn't left without any structure; they're handed a different one to live inside instead.
⚖️ Mirrors the same two categories just used for Egypt/Canaan
🔄 Trades one cultural structure for another, not structure for none
🚶 "Walk therein" means an ongoing way of life, not a one-time choice
---
## ❤️ Which If A Man Do, He Shall Live In Them
This became one of the most quoted lines from Leviticus in the rest of the Bible - Paul references it in Romans 10:5 and Galatians 3:12 while arguing that the law could describe a life but never actually produce it. Read in its own setting here, it's simpler: following God's ways leads to real, flourishing life, not the death dealt out in verse 29 for breaking them.
📖 Quoted later by Paul in Romans and Galatians
❤️ "Live" points to a flourishing, protected life
⚖️ Sets up the life-versus-being-cut-off contrast running through the chapter

# Leviticus 18:6-11
# 🚫 Off Limits Inside The Immediate Family
---
## 🚷 None Of You Shall Approach To Any That Is Near Of Kin To Him
"Approach" is the same word used elsewhere for a man drawing near a woman romantically or sexually - it's a polite but clear verb, not vague language. "Near of kin" sets up the whole list that follows: close blood or marriage relatives who are now off limits as sexual partners.
🚷 "Approach" is a polite word for a sexual advance
👪 "Near of kin" introduces the entire list to come
📜 One general rule, then eleven specific examples
---
## 🫣 To Uncover Their Nakedness
"Uncover nakedness" is the chapter's standing euphemism for sexual intercourse - it shows up roughly two dozen times in these thirty verses. Genesis 9:20-23 uses the same phrase for Noah's sons seeing his literal nakedness, showing the idiom can stretch from the physically literal to this fully sexual sense depending on context.
🫣 The chapter's repeated euphemism for sex
📖 Same root phrase used literally back in Genesis 9
🔁 Appears roughly two dozen times in this chapter alone
---
## 👨 The Nakedness Of Thy Father, Or The Nakedness Of Thy Mother
"Thy father's nakedness" doesn't mean a son assaulting his own father - it means violating the marriage bed that belongs to him, since husband and wife are described elsewhere in Scripture as "one flesh." That's why sleeping with your father's wife (verse 8) gets described the exact same way, even when she isn't your biological mother.
👨‍👩‍👧 "Father's nakedness" means his marriage bed, not his body
📖 Rests on the "one flesh" marriage language from Genesis 2:24
🔗 Explains why verse 8 reuses the identical phrase for a stepmother
---
## 👩 She Is Thy Mother; Thou Shalt Not Uncover Her Nakedness
The law states the obvious relationship plainly - "she is thy mother" - before giving the rule, a pattern repeated for almost every relative on this list. Spelling out the relationship first makes the command impossible to misunderstand or argue around.
📢 States the relationship plainly before the rule
🔁 A pattern repeated for nearly every name on this list
🚫 Leaves no room to claim confusion about who's covered
---
## 🛏️ The Nakedness Of Thy Father's Wife Shalt Thou Not Uncover: It Is Thy Father's Nakedness
This covers a stepmother - any wife of the father's, not only the son's biological mother - and Israelite culture allowed a man to have more than one wife, making this a real, not hypothetical, family situation. Reuben breaks this exact law with his father Jacob's concubine Bilhah in Genesis 35:22, a sin Jacob names on his deathbed in Genesis 49:4, showing this boundary already existed by custom well before it's written down here.
🛏️ Covers a stepmother, any wife of the father's
👪 A real situation in a culture with multiple wives
📖 Reuben breaks this exact boundary in Genesis 35:22 and 49:4
---
## 👧 The Nakedness Of Thy Sister...Whether She Be Born At Home, Or Born Abroad
"Born at home, or born abroad" closes a loophole - a sister through the same mother, raised in the same house, is covered, but so is a half-sister born to a different one of the father's wives, possibly raised elsewhere. Abraham actually married his half-sister Sarah before this law existed (Genesis 20:12), which is part of why later Scripture never condemns Abraham for it - the boundary hadn't been drawn yet.
🏠 "Born abroad" closes the half-sister loophole
👪 Reflects households built on multiple wives
📖 Abraham married his half-sister Sarah before this law existed
---
## 👶 Thy Son's Daughter, Or Of Thy Daughter's Daughter...For Theirs Is Thine Own Nakedness
This covers granddaughters through either a son or a daughter. "Theirs is thine own nakedness" explains the logic: a granddaughter is genetically and legally an extension of the grandparent's own body, not a separate case needing its own reasoning.
👶 Covers granddaughters through sons and daughters alike
🧬 "Thine own nakedness" ties it to shared bloodline
📜 Explains the reasoning instead of just stating the rule
---
## 👧 Thy Father's Wife's Daughter, Begotten Of Thy Father, She Is Thy Sister
This is a half-sister through the father's other wife - already covered conceptually by verse 9, but restated here specifically as a stepmother's daughter to make sure this particular family shape doesn't slip through as a technicality.
👧 A half-sister through the father's other wife
📜 Restates verse 9's principle for one more specific case
🚫 Closes a technicality some might try to argue around

# Leviticus 18:12-14
# 👵 Aunts, By Blood And By Marriage
---
## 👵 The Nakedness Of Thy Father's Sister: She Is Thy Father's Near Kinswoman
This is a paternal aunt - the father's own sister. "Near kinswoman" repeats the same phrase used to introduce the whole list back in verse 6, tying this specific case back to that general principle.
👵 A paternal aunt, the father's sister
🔗 "Near kinswoman" echoes verse 6's opening principle
📜 Blood relation on the father's side
---
## 👵 The Nakedness Of Thy Mother's Sister: For She Is Thy Mother's Near Kinswoman
The identical rule and identical wording is now applied to the mother's side of the family, making the law symmetrical - it doesn't favor one parent's bloodline over the other.
👵 A maternal aunt, the mother's sister
⚖️ Mirrors verse 12's wording exactly for symmetry
📜 Blood relation on the mother's side
---
## 👨 Thou Shalt Not Approach To His Wife: She Is Thine Aunt
This covers an aunt by marriage - the wife of the father's brother, an uncle's wife rather than a blood relative. Notably, this specific law comes after Moses' own parents' marriage: Amram married his father's sister Jochebed (Exodus 6:20), a marriage Scripture never condemns because it happened before this boundary was set.
💍 Covers an aunt by marriage, not blood
📖 Moses' parents Amram and Jochebed had this exact kind of marriage
⏳ Their marriage predates this law and is never condemned
---
## 🧬 Two Categories, One List
Verses 12-14 quietly group two different kinds of "aunt" together - one by blood (father's or mother's sister) and one purely by marriage (uncle's wife) - under the same off-limits category. The list isn't only about shared bloodline; it treats marriage itself as creating real family boundaries, not just biology.
🧬 Blood and marriage relatives grouped under one rule
💍 Marriage itself creates real family boundaries
📜 Not a purely biological definition of "family"

# Leviticus 18:15-18
# 💍 Boundaries Created By Marriage, Not Blood
---
## 👰 Thy Daughter In Law: She Is Thy Son's Wife
This one is entirely about marriage, not shared blood at all - a daughter-in-law becomes off-limits the moment she marries into the family, with no biological connection required for the boundary to apply.
👰 No blood relation - marriage alone creates the boundary
💍 Off-limits from the moment she marries in
📜 Shows the list isn't only tracking bloodline
---
## 👨‍👩‍👦 Thy Brother's Wife: It Is Thy Brother's Nakedness
While the brother is alive, his wife is completely off-limits, described the same way as a father's wife earlier in the chapter. This is not the same situation as Deuteronomy 25:5-10's later levirate marriage law, which only applies after a brother has died leaving no children.
🚫 Off-limits while the brother is alive
📖 Uses the same "his nakedness" language as verse 8
⚖️ A different situation from the later levirate marriage law
---
## ⚰️ Why Levirate Marriage Isn't A Contradiction
Deuteronomy 25 later requires a man to marry his dead, childless brother's widow specifically to continue that brother's family line and inheritance. This verse addresses a living brother's wife, a completely different situation - the two laws don't actually conflict, they cover opposite circumstances.
⚰️ Deuteronomy 25 applies only after the brother has died
👶 That law exists to protect a dead brother's family line
🔀 Two laws for two different circumstances, not a contradiction
---
## 😔 A Woman And Her Daughter...It Is Wickedness
This bans marrying or having relations with both a woman and her daughter (or granddaughter), and it's the only prohibition in this whole chapter directly labeled "wickedness" in the text itself, rather than simply "abomination" like several others. The stronger label may reflect how directly this one pits a mother and daughter against each other inside the same household.
😔 The only relation in this chapter directly called "wickedness"
👩‍👧 Would set a mother and daughter against each other
🏠 Covers the same household, not a distant relative
---
## 💔 Neither Shalt Thou Take A Wife To Her Sister, To Vex Her
"Vex" translates a Hebrew word connected to the term for a rival wife - this specifically bans marrying two sisters at the same time, since doing so would deliberately turn them into sexual and household rivals with each other.
💔 "Vex" is tied to the Hebrew word for "rival wife"
👭 Bans marrying two sisters at the same time
🏠 Names the exact harm: turning sisters into rivals
---
## ⏳ Beside The Other In Her Life Time
This law comes after Jacob had already married both Leah and Rachel while both sisters were alive (Genesis 29), the exact situation described here, and Scripture openly shows the painful rivalry this created between them. Like Abraham's marriage to his half-sister and Amram's marriage to his aunt, this marriage predates the law and isn't retroactively condemned by it.
📖 Jacob married sisters Leah and Rachel exactly this way
😢 Genesis openly records the rivalry it caused between them
⏳ Predates this law, so it isn't retroactively condemned

# Leviticus 18:19-23
# ⚠️ Five More Serious Boundaries
---
## 🩸 Thou Shalt Not Approach Unto A Woman...As Long As She Is Put Apart For Her Uncleanness
This connects directly back to the monthly uncleanness law already given in Leviticus 15:19-24, now stated here as a moral boundary rather than only a ritual-purity one. The same underlying situation gets addressed from two different angles in two different chapters.
🔗 Connects back to the ritual law in Leviticus 15:19-24
⚖️ Same situation addressed from a moral angle here
📜 Purity law and moral law overlap on this point
---
## 💔 Thou Shalt Not Lie Carnally With Thy Neighbour's Wife, To Defile Thyself With Her
This is a direct ban on adultery, using the word "defile" - the same word used throughout this chapter for the land itself becoming morally polluted. Sexual sin against a neighbor's marriage isn't treated as a private matter between two people; it's described with the same weighty word used for corrupting the whole land.
💔 A direct ban on adultery
🔤 "Defile" is the same word used for the land's pollution
⚖️ Not treated as merely private - the same serious category as the rest of the chapter
---
## 🔥 Thou Shalt Not Let Any Of Thy Seed Pass Through The Fire To Molech
Molech was a god worshipped by Israel's neighbors, especially the Ammonites, and this phrase refers to child sacrifice - offering a son or daughter to be burned as an act of worship. This single verse bans one of the most horrifying practices named anywhere in the Old Testament, and later Israelite kings like Ahaz and Manasseh are condemned specifically for doing this very thing (2 Kings 16:3, 21:6).
🔥 Molech worship involved child sacrifice by fire
🌍 A practice associated especially with the Ammonites
👑 Later Israelite kings Ahaz and Manasseh are condemned for exactly this
---
## 🙏 Neither Shalt Thou Profane The Name Of Thy God
Sacrificing a child to another god doesn't just harm that child - it's described as an insult to God's own name and reputation, since it associates the LORD's people with a rival god's worship. Personal sin and public dishonor to God are tied together in this one line.
🙏 Ties this sin directly to dishonoring God's name
🌍 Associates Israel publicly with a rival god's worship
⚖️ Personal sin and public reputation are linked here
---
## 🚫 Thou Shalt Not Lie With Mankind, As With Womankind: It Is Abomination
"Abomination" (Hebrew to'ebah) is a strong term Leviticus reserves for what it considers seriously offensive to God - the same word is used elsewhere in the Old Testament for dishonest business scales and idol worship, not only sexual sin. This verse names a specific practice associated with the surrounding Egyptian and Canaanite cultures named back in verses 3.
🔤 "Abomination" (to'ebah) is a strong recurring Old Testament term
⚖️ Also used elsewhere for dishonest scales and idol worship
🔗 Connects back to the Egypt/Canaan warning opening the chapter
---
## 🐐 Neither Shalt Thou Lie With Any Beast To Defile Thyself Therewith: It Is Confusion
"Confusion" translates a Hebrew word (tebel) meaning a mixing-up or perversion of the created order - the same instinct behind other Levitical rules against mixing seeds, fabrics, or breeding animal kinds oddly. Bestiality is placed in that same "against the created order" category, described as unnatural rather than simply forbidden.
🔤 "Confusion" (tebel) means a mixing-up of the created order
🌾 Related to Leviticus's other bans on unnatural mixing
📜 Framed as unnatural, not just forbidden

# Leviticus 18:24-30
# 🌍 Why Even The Land Reacts
---
## 🚫 Defile Not Ye Yourselves In Any Of These Things: For In All These The Nations Are Defiled
"The nations" refers to the Canaanite peoples already living in the land Israel is about to enter, and the text treats their ongoing practice of everything just listed as the reason judgment is coming on them. This sets up the theological basis for Israel's coming conquest of Canaan: it's framed as consequence, not simple conquest for its own sake.
🌍 "The nations" means the Canaanites already in the land
⚖️ Their practices are named as the reason for coming judgment
📜 Frames the conquest as consequence, not conquest for its own sake
---
## 🏜️ The Land Is Defiled: Therefore I Do Visit The Iniquity Thereof Upon It
The text treats the land itself as capable of becoming morally polluted by what happens on it, not just the individual people who sin. This personification of the land as a moral actor is unusual to modern ears but consistent with how Genesis 4:10-11 describes the ground itself reacting to Abel's blood.
🏜️ The land itself is described as morally polluted
📖 Echoes the ground reacting to bloodshed in Genesis 4:10-11
🔤 Personifies land as something that can be "defiled"
---
## 🤮 The Land Itself Vomiteth Out Her Inhabitants
This vivid, almost violent image appears three times across this chapter (verses 25, 28, and again in spirit at 29-30) - the land is pictured as physically unable to hold onto people who defile it, rejecting them the way a body rejects poison. It's a warning built to be remembered.
🤮 A vivid image repeated across this chapter
🧪 Compares moral corruption to something a body physically rejects
🔁 Repetition makes the warning memorable and hard to miss
---
## ⚖️ Ye Shall Therefore Keep My Statutes...Neither Any Of Your Own Nation, Nor Any Stranger
Just like the blood laws in chapter 17, this rule explicitly includes any foreign resident living among Israel, not only native-born Israelites. The land's standard for what it can tolerate doesn't shift based on someone's nationality.
⚖️ Explicitly includes foreign residents, echoing chapter 17
🌍 The land's standard doesn't shift by nationality
📜 One rule for everyone living in it
---
## 📜 For All These Abominations Have The Men Of The Land Done, Which Were Before You
This makes plain that everything just listed in this chapter wasn't a hypothetical warning - it describes real practices of the Canaanite peoples currently occupying the land Israel is about to enter. The chapter's list functions as a direct contrast: don't become what you're about to replace.
📜 Names these as real, current Canaanite practices
🏜️ Not a hypothetical - a description of who's there now
🔄 Sets up a direct "don't become what you replace" warning
---
## ⚠️ That The Land Spue Not You Out Also, When Ye Defile It, As It Spued Out The Nations
This is the chapter's sharpest turn - the exact same fate about to fall on the Canaanites is now warned as a real possibility for Israel too, if they copy these same practices instead of avoiding them. Later biblical history shows this warning wasn't empty: the exiles of 2 Kings 17 and 2 Kings 25 use this same "land vomiting out its people" logic to explain why Israel and Judah eventually lost the land themselves.
⚠️ The exact same warning now applies to Israel, not just Canaan
📖 2 Kings 17 and 25 describe this warning actually coming true later
🔄 Israel isn't automatically exempt just by being God's people
---
## ☠️ The Souls That Commit Them Shall Be Cut Off From Among Their People
The "cut off" penalty from chapter 17 (karet) reappears here as the closing consequence for this entire list - formal exclusion from the covenant community, and possibly an early death understood as coming from God rather than a human court.
☠️ Same "cut off" penalty introduced in chapter 17
⚖️ Formal exclusion from the covenant community
📖 Closes this list with the same weight as the blood laws
---
## 🔁 Therefore Shall Ye Keep Mine Ordinance...I Am The LORD Your God
The chapter closes exactly the way it opened, with "I am the LORD your God," forming a bookend around the whole list. Everything in between - family boundaries, moral boundaries, the land's own reaction - is framed by the same reminder of whose authority this actually rests on.
🔁 Closes with the same line that opened the chapter
📚 Forms a deliberate bookend around the whole list
⚖️ Grounds every rule in between in God's own authority
`;

export const LEVITICUS_EIGHTEEN_PERSONAL_SECTIONS = parseLeviticusEighteenRawNotes(LEVITICUS_EIGHTEEN_RAW_NOTES);
