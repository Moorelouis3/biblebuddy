export type LeviticusTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyRawNotes(rawText: string): LeviticusTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 20:${startVerse}` : `Leviticus 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Leviticus 20 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_RAW_NOTES = `# Leviticus 20:1-5
# 🔥 The Molech Death Penalty
---
## 👶 Whosoever...Giveth Any Of His Seed Unto Molech
Molech was a god worshipped by the Ammonites and other neighboring nations, and worshipping him involved burning children alive as offerings. "His seed" means his own children - this law names child sacrifice directly and bans it outright, with the harshest penalty in the whole law code.
👶 "Seed" here means a person's own children
🔥 Molech worship involved burning children alive
⚖️ The harshest possible penalty is attached to this one
---
## 🌍 Or Of The Strangers That Sojourn In Israel
This law explicitly covers foreigners living in Israel too, not just native-born Israelites. Some practices were tolerated as private matters for resident foreigners elsewhere in the law, but child sacrifice was banned for everyone in the land without exception.
🌍 Applies to resident foreigners, not just native Israelites
🚫 No exception carved out for anyone living in the land
⚖️ Some of the harshest laws allow zero exceptions
---
## 🪨 He Shall Surely Be Put To Death: The People Of The Land Shall Stone Him With Stones
The doubled phrase "surely be put to death" translates a Hebrew grammar construction that repeats the verb for emphasis - it shows up close to a dozen times across this chapter, underlining just how certain the penalty is meant to be. Stoning made the execution a group act carried out by the community itself, not a single executioner.
🔤 "Surely" reflects a doubled Hebrew verb for emphasis
🪨 Stoning was a community act, not one executioner's job
🔁 This same doubled phrase repeats throughout the chapter
---
## 👁️ I Will Set My Face Against That Man
This is a vivid Hebrew idiom for God turning his full, direct attention toward someone in judgment - not glancing away, but staring them down. It shows up specifically when the human court might fail to act, as a reminder that God's own response doesn't depend on people getting it right.
👁️ An idiom for God's direct, unmissable attention in judgment
⚖️ Used especially when human justice might fail to act
✨ God's response isn't dependent on people enforcing the law
---
## ✨ To Defile My Sanctuary, And To Profane My Holy Name
Child sacrifice isn't framed here only as a crime against the child - it's described as an assault on God's own reputation and dwelling place. "Profane" means to treat something holy as common or worthless, the same word used for misusing God's name back in Leviticus 19:12.
✨ Framed as an offense against God's name, not just the child
🏛️ "Defile my sanctuary" ties the sin to God's dwelling place
🔗 "Profane" repeats the same word from Leviticus 19:12
---
## ⚖️ And Will Cut Him Off From Among His People
"Cut off" (karet in Hebrew) is a separate penalty from the stoning just described - formal removal from the covenant community, and in many places in Leviticus, understood as God's own direct action rather than something a court carries out. Here it stacks on top of the human death sentence rather than replacing it.
⚖️ "Cut off" (karet) is God's own penalty, distinct from stoning
📚 Formal removal from the covenant community
🔗 Stacks on top of the human penalty, doesn't replace it
---
## 🙈 If The People Of The Land Do Any Ways Hide Their Eyes From The Man...And Kill Him Not
This anticipates a real possibility: a community choosing to look away rather than carry out the required penalty, whether from fear, sympathy, or corruption. The law doesn't just define the crime - it also closes the loophole of quiet, collective non-enforcement.
🙈 Anticipates a community simply choosing not to act
🚪 Closes the loophole of quiet non-enforcement
⚖️ Community responsibility, not just individual guilt
---
## 👪 Then I Will Set My Face Against That Man, And Against His Family
If the community fails to enforce the penalty, God's judgment widens to include the guilty man's whole family, not just him. This is a striking escalation - the cost of a community's silence isn't smaller than direct punishment, it's larger.
👪 Judgment widens to the family if the community stays silent
📈 Communal failure to act makes the consequence worse, not milder
⚖️ Silence has a cost, not a discount
---
## 💔 And All That Go A Whoring After Him, To Commit Whoredom With Molech
Idolatry is described throughout Scripture using marriage and adultery language, since Israel's relationship with God was pictured as a covenant like a marriage. Following Molech - or covering for someone who does - is described here as unfaithfulness to that relationship, not just breaking a rule.
💔 Idolatry pictured as marital unfaithfulness to God
📖 A recurring pattern across the Old Testament (see Hosea)
🔗 Applies to those who cover for Molech worship too

# Leviticus 20:6-8
# 🔮 Mediums And Being Holy
---
## 🔮 The Soul That Turneth After Such As Have Familiar Spirits
A "familiar spirit" refers to a supposed spirit consulted through a medium claiming contact with the dead or hidden knowledge - already named back in Leviticus 19:31. Repeating it here, right after the Molech law, groups necromancy with child sacrifice as two ways of looking for answers or power outside of God.
🔮 A "familiar spirit" claims contact with the dead
🔗 Repeats the warning already given in Leviticus 19:31
👥 Grouped with Molech worship as seeking power outside God
---
## 💔 To Go A Whoring After Them
The exact same "whoring after" language used for Molech worship two verses earlier is reused here for consulting mediums - both count as unfaithfulness to God, even though one involves killing a child and the other doesn't. The chapter treats both as the same basic betrayal.
💔 Repeats the same "whoring after" language from verse 5
⚖️ Both offenses count as unfaithfulness, despite different severity
🔗 Links necromancy and idolatry as the same basic sin
---
## ✨ Sanctify Yourselves Therefore, And Be Ye Holy
"Sanctify" means to set apart or consecrate for God's use - the same root idea as "holy" that opened chapter 19 and now returns here. The command follows directly after two of the most serious warnings in the chapter, tying holiness to actively rejecting these specific practices.
✨ "Sanctify" means set apart, consecrated for God
🔗 Echoes the "be holy" command that opened chapter 19
⚖️ Comes right after the chapter's two most serious warnings
---
## 🙏 I Am The LORD Which Sanctify You
This adds an important nuance: people are commanded to be holy, but this line says God himself is the one who actually makes them holy. Holiness isn't only self-produced effort - it's something God does in and for his people, even while he commands them to pursue it.
🙏 God names himself as the one who makes them holy
⚖️ Holiness is commanded, but also something God provides
🔗 Balances the command in the verse just before it
---
## 📜 Ye Shall Keep My Statutes, And Do Them: I Am The LORD
A short transition line that closes this opening section and sets up the long list of specific penalties about to follow - the general command to obey now gets applied to one detailed case after another.
📜 Closes the introduction before the specific-cases list begins
🔁 The chapter's recurring "I am the LORD" signature returns
➡️ Sets up the detailed penalty list that follows

# Leviticus 20:9-10
# ⚖️ Cursing Parents And Adultery
---
## 🗣️ Every One That Curseth His Father Or His Mother Shall Be Surely Put To Death
"Curseth" here means more than an insult - it covers treating a parent with contempt or calling down harm on them, the direct opposite of the "honor thy father and thy mother" command from the Ten Commandments (Exodus 20:12) and Leviticus 19:3. This same law and penalty already appear almost word for word in Exodus 21:17.
🗣️ "Curseth" means contempt or calling down harm, not just an insult
📜 The direct opposite of the fifth commandment
🔗 Nearly identical to the law already given in Exodus 21:17
---
## 🩸 His Blood Shall Be Upon Him
This is a legal formula that recurs throughout the chapter - it means the guilty person bears full responsibility for their own death sentence, not the community or judges who carry it out. Watching for this exact phrase helps track which offenses in this chapter carry it and which don't.
🩸 A recurring legal formula meaning self-caused responsibility
⚖️ Removes blame from the community that carries out the sentence
🔁 Worth tracking - it doesn't appear after every single law here
---
## 💔 The Man That Committeth Adultery With Another Man's Wife, Even He That Committeth Adultery With His Neighbour's Wife
Naming the woman as "another man's wife" and "his neighbour's wife" ties this law to property and family-line concerns in this culture, alongside the moral wrong - adultery threatened whose child was whose in a way this society took very seriously.
💔 Names her specifically as someone else's wife
👨‍👩‍👧 Ties to real concerns about family lines and inheritance
📜 The seventh commandment (Exodus 20:14) applied with a penalty
---
## ⚖️ The Adulterer And The Adulteress Shall Surely Be Put To Death
Both parties are held equally responsible here, not just the woman - a detail worth noting since ancient near eastern law codes didn't always apply penalties evenly between men and women in cases like this.
⚖️ Both the man and the woman held equally responsible
🌍 Not a given in every ancient near eastern law code
📜 Matches the shared "neighbour" language from Leviticus 19:18

# Leviticus 20:11-12
# 🚫 Father's Wife And Daughter-In-Law
---
## 🛏️ The Man That Lieth With His Father's Wife Hath Uncovered His Father's Nakedness
This exact relationship was already forbidden back in Leviticus 18:8 - chapter 18 explained what was off limits, and this chapter now supplies the penalty that chapter 18 left unstated. "Uncovered his father's nakedness" means violating his father's marriage, not assaulting his father's body.
🔗 The relationship was already banned in Leviticus 18:8
⚖️ Chapter 20 adds the penalty chapter 18 didn't state
🛏️ "Nakedness" language means violating a marriage, not a body
---
## 🩸 Both Of Them Shall Surely Be Put To Death; Their Blood Shall Be Upon Them
Both parties receive the death penalty, and the phrasing assumes willing participation on both sides - Leviticus treats forced assault differently elsewhere (see Deuteronomy 22:25-27), so this formula signals a consensual act, not a rape case.
⚖️ Applies to both people equally
🤝 The formula implies willing participation, not an assault
🔗 Forced cases are treated differently elsewhere in the law
---
## 👨‍👩‍👦 If A Man Lie With His Daughter In Law, Both Of Them Shall Surely Be Put To Death
A "daughter in law" is a son's wife - in this culture, extended families often lived closely together across generations, which is part of why the law needed to be this explicit rather than assumed. Judah's own sin with his daughter-in-law Tamar in Genesis 38 shows this wasn't a hypothetical danger.
👨‍👩‍👦 "Daughter in law" means a son's wife
🏡 Close multi-generational living made this a real risk, not theoretical
📖 Judah's own failure with Tamar in Genesis 38 is the exact case
---
## 🔀 They Have Wrought Confusion; Their Blood Shall Be Upon Them
"Confusion" (Hebrew tebhel) means a blurring together of family roles that were meant to stay distinct - the same underlying concern as the mixed-kinds bans in Leviticus 19:19, now applied to family relationships instead of crops or fabric.
🔤 "Confusion" (tebhel) means blurring distinct categories together
🔗 The same underlying idea as chapter 19's mixed-kinds laws
👪 Applied here to family roles instead of crops or fabric

# Leviticus 20:13-14
# 🔥 Two More Capital Sexual Sins
---
## 🚫 If A Man Also Lie With Mankind, As He Lieth With A Woman, Both Of Them Have Committed An Abomination
This law was already stated in Leviticus 18:22 - chapter 20 now attaches the penalty. "Abomination" (Hebrew to'evah) describes something considered deeply detestable or ritually repulsive, a strong word used elsewhere in the chapter for practices tied to pagan worship.
🔗 The ban itself was already given in Leviticus 18:22
🔤 "Abomination" (to'evah) means deeply detestable, ritually repulsive
⚖️ This verse supplies the penalty the earlier chapter left unstated
---
## ⚰️ They Shall Surely Be Put To Death; Their Blood Shall Be Upon Them
The same doubled-verb death sentence and self-responsibility formula used throughout this chapter applies here too, treating this alongside the other capital sexual offenses in the list rather than singling it out with different language.
🔁 Uses the same formula repeated throughout the chapter
⚖️ Treated with the same severity as the other capital offenses
📜 No special or different language marks this case out
---
## 👰 If A Man Take A Wife And Her Mother, It Is Wickedness
Marrying both a woman and her mother at once is a specific case not directly listed in chapter 18's roster of forbidden relationships - chapter 20 adds it here, showing this list expands on chapter 18 rather than just repeating it with penalties attached.
👰 A specific case chapter 18's list didn't directly cover
📜 Shows chapter 20 adds new cases, not just penalties
🔗 Marrying a woman and her mother simultaneously
---
## 🔥 They Shall Be Burnt With Fire, Both He And They; That There Be No Wickedness Among You
Burning was a harsher method than stoning, reserved for only the worst handful of offenses in the law (this one, and a priest's daughter turning to prostitution in Leviticus 21:9) - a signal of just how seriously this particular case was treated. The stated goal, "that there be no wickedness among you," frames the penalty as protecting the whole community, not just punishing the individuals.
🔥 Burning was reserved for only the most severe offenses
📜 One of just a couple of cases in the law that get this penalty
🎯 Framed as protecting the community, not just punishing individuals

# Leviticus 20:15-16
# 🐴 Bestiality Named For Both
---
## 🐴 If A Man Lie With A Beast, He Shall Surely Be Put To Death: And Ye Shall Slay The Beast
This was already banned in Leviticus 18:23 - here the penalty is added, and unusually, the animal is killed too. This isn't about blaming the animal morally; it reflects the idea that the act itself defiled the animal and needed to be fully removed from the community, not just punished in the guilty person.
🔗 The ban itself already appears in Leviticus 18:23
🐴 The animal is killed too, though not morally at fault
✨ Reflects the idea that the whole act needed removing, not just the person
---
## 🌍 Historical Background Behind This Law
Some ancient near eastern religious practices, including certain Egyptian and Canaanite fertility cults, involved sexual rituals tied to animals or animal-associated gods. Naming this act explicitly may be pushing back directly against practices Israel would have encountered among its neighbors, not addressing a purely hypothetical scenario.
🌍 Some neighboring fertility cults involved animal-associated rituals
🚫 The law may directly target a real practice, not just a hypothetical
📖 Consistent with this chapter's pattern of rejecting Canaanite customs
---
## 👩 If A Woman Approach Unto Any Beast, And Lie Down Thereto...They Shall Surely Be Put To Death
Leviticus 18:23 only addressed the case of a man - this verse explicitly closes the gap and applies the same law to a woman, making clear the ban wasn't limited by gender even though chapter 18 didn't spell it out both ways.
🔗 Chapter 18 only explicitly named the man's case
⚖️ This verse extends the same law to a woman
📜 Closes a gap chapter 18 left open

# Leviticus 20:17-18
# 👪 Sister And The Blood Law
---
## 👫 If A Man Shall Take His Sister...It Is A Wicked Thing; And They Shall Be Cut Off In The Sight Of Their People
This relationship was banned in Leviticus 18:9, and here the penalty is "cut off," not the stoning death sentence used for several other cases in this same chapter - a real difference in severity worth noticing, since this list doesn't treat every forbidden relationship identically.
🔗 The ban was already given in Leviticus 18:9
⚖️ Penalty here is "cut off," not a stoning death sentence
📊 This chapter's penalties vary in severity, not uniform
---
## ⚖️ He Hath Uncovered His Sister's Nakedness; He Shall Bear His Iniquity
"Bear his iniquity" is a lighter formula than "his blood shall be upon him," reinforcing that this offense, while serious, sits at a different severity level within the chapter's own internal scale of penalties.
⚖️ A different, lighter formula than the "blood upon him" language
📊 Part of the chapter's own internal scale of severity
🔗 Consistent with the "cut off" penalty just given
---
## 🩸 If A Man Shall Lie With A Woman Having Her Sickness, And Shall Uncover Her Nakedness
"Her sickness" means menstruation, already covered as a source of temporary ritual uncleanness back in Leviticus 15:19-24 and named again in Leviticus 18:19. This verse addresses intentional sexual relations during that time specifically, not the ordinary purity rules for accidental contact covered in chapter 15.
🩸 "Her sickness" means menstruation
🔗 Purity rules for this already exist in Leviticus 15
⚖️ This verse addresses intentional relations, not accidental contact
---
## 💧 He Hath Discovered Her Fountain...Both Of Them Shall Be Cut Off From Among Their People
"Fountain" is a euphemism for the source of her blood. The penalty here is "cut off" again rather than execution, matching the sister-relationship case just above it and continuing to show this chapter uses more than one level of consequence.
💧 "Fountain" is a euphemism for the source of her blood
⚖️ "Cut off" penalty, matching the case just before it
📊 Reinforces that this chapter has more than one severity tier

# Leviticus 20:19-21
# 👪 Aunt, Uncle's Wife, Brother's Wife
---
## 👩 Thou Shalt Not Uncover The Nakedness Of Thy Mother's Sister, Nor Of Thy Father's Sister
Aunts on either side of the family were already banned as partners back in Leviticus 18:12-13 - this verse repeats both cases together and calls them "near kin," meaning close blood relatives, with the penalty "bear their iniquity" used again.
🔗 Both cases were already listed in Leviticus 18:12-13
👪 "Near kin" means close blood relatives
⚖️ Uses the lighter "bear their iniquity" penalty again
---
## 👨‍👩‍👦 If A Man Shall Lie With His Uncle's Wife...They Shall Bear Their Sin; They Shall Die Childless
This introduces a third kind of penalty in the chapter: dying without children. In a culture where a family's name, inheritance, and tribal land allotment all depended on having heirs, this was understood as a severe, likely divinely-enacted consequence, even without a human court carrying out an execution.
👨‍👩‍👦 A third penalty type appears here: dying childless
🏡 Inheritance and land allotment depended on having heirs
✨ Likely understood as God's own action, not a court sentence
---
## 👰 If A Man Shall Take His Brother's Wife, It Is An Unclean Thing...They Shall Be Childless
This repeats the ban already given in Leviticus 18:16, again with the "childless" penalty. It's worth noting this assumes the brother is alive - a separate custom called levirate marriage (explained in Deuteronomy 25:5-10) later required a man to marry his dead brother's widow specifically to preserve that brother's family line, which is a different situation entirely.
🔗 The ban already appears in Leviticus 18:16
⚠️ Assumes the brother is alive, a different case than levirate marriage
📖 Levirate marriage (Deuteronomy 25:5-10) covers the brother's-death case instead

# Leviticus 20:22-24
# 🌍 Don't Let The Land Vomit You Out
---
## 🤮 Ye Shall Therefore Keep All My Statutes...That The Land...Spue You Not Out
"Spue" means vomit - a vivid, almost physical image of the land itself rejecting its inhabitants for wrongdoing. This nearly repeats the same warning given at the end of Leviticus 18:24-28, forming a matching bookend between the chapter that lists these laws and the chapter that lists their penalties.
🤮 "Spue" literally means vomit
🔗 Nearly repeats the warning from Leviticus 18:24-28
📚 Forms a bookend between chapters 18 and 20
---
## 🚶 Ye Shall Not Walk In The Manners Of The Nation, Which I Cast Out Before You
"The nation" refers to the Canaanites, whose land Israel was about to move into and settle. Their practices, including everything just listed in this chapter, are named as the specific reason God says he "cast them out" of that land ahead of Israel's arrival.
🚶 "The nation" refers to the Canaanites
🏞️ The land Israel was about to enter and settle
⚖️ Named as the specific reason God removed them from it
---
## 😤 For They Committed All These Things, And Therefore I Abhorred Them
"Abhorred" is a strong word for God's judgment - applied here to an entire culture's practices as a whole, not just to individual offenders. It frames what came before as a moral evaluation of Canaanite society broadly.
😤 "Abhorred" describes a strong, whole-culture judgment
🌍 Applied to Canaanite society broadly, not just individuals
📜 Frames the preceding list as more than isolated rules
---
## 🍯 Ye Shall Inherit Their Land...A Land That Floweth With Milk And Honey
This is a stock phrase used throughout the Exodus and wilderness story to describe the promised land's fertility and abundance - "milk" points to healthy livestock and pasture, "honey" to a land rich enough to support wild bees. It's a promise of a good, productive place to live, not just an escape from Egypt.
🍯 A recurring phrase describing the land's abundance
🐄 "Milk" points to healthy livestock and pasture
🐝 "Honey" points to a land rich enough for wild bees
---
## ✨ I Am The LORD Your God, Which Have Separated You From Other People
This ties directly back to the "holy," or set-apart, theme running through this entire chapter and chapter 19 before it - Israel's laws, diet, and family ethics were all meant to visibly mark them as different from their neighbors, by God's own design.
✨ Directly ties back to the "set apart" theme of this chapter
🔗 Connects to the same theme running through chapter 19
🆔 Israel's differences were by God's own design, not accident

# Leviticus 20:25-26
# 🐷 Clean And Unclean Animals
---
## 🐄 Ye Shall Therefore Put Difference Between Clean Beasts And Unclean
This calls back to the detailed dietary laws already given in Leviticus 11, but reframes them here as part of the same "separation" theology running through this whole chapter - not a random food rule, but one more way Israel's daily life was meant to reflect being set apart.
🔗 Calls back to the dietary laws of Leviticus 11
✨ Reframed here as part of the chapter's "separation" theme
🍽️ Everyday eating habits carried the same theological weight
---
## 🦅 And Between Unclean Fowls And Clean
Birds are grouped in with land animals under the same principle, showing the scope of these laws covered every category of food a household might eat, not just one type of animal.
🦅 Birds included under the same clean/unclean principle
📋 Covers every food category, not just one kind of animal
🔗 Same logic as the land-animal distinction just given
---
## 🚫 Ye Shall Not Make Your Souls Abominable
The same strong word "abominable" used earlier in this chapter for the worst sexual sins is reused here for violating food laws - not because eating an unclean animal is equally severe, but because the text treats both as expressions of the same underlying call to holiness.
🔤 Reuses the same strong word from the sexual-sin laws earlier
⚖️ Not claiming equal severity, but the same underlying principle
✨ Both are expressions of the call to holiness
---
## ✨ Ye Shall Be Holy Unto Me: For I The LORD Am Holy, And Have Severed You From Other People
The chapter's holiness refrain returns one final time here, tying diet, sexual ethics, and worship all together under a single reason - this is simply what belonging to this God looks like in daily practice, not a random pile of unrelated rules.
🔁 The chapter's holiness refrain returns one more time
🔗 Ties diet, sexual ethics, and worship into one single reason
📚 Frames the whole chapter as one unified call, not separate rules

# Leviticus 20:27
# 🔮 One Final Warning About Mediums
---
## 👫 A Man Also Or Woman That Hath A Familiar Spirit, Or That Is A Wizard, Shall Surely Be Put To Death
This closes the chapter by returning to the same warning about mediums given back in verse 6 - but where verse 6 only stated "cut off," this final verse spells out the human death penalty explicitly, and names both men and women as equally liable.
🔗 Returns to the same warning given back in verse 6
⚖️ Spells out the death penalty verse 6 left as "cut off"
👫 Names both men and women as equally liable
---
## 🪨 They Shall Stone Them With Stones: Their Blood Shall Be Upon Them
The chapter closes exactly as it opened - with a stoning penalty for looking outside God for spiritual power, first for Molech worship in verse 2, and now for consulting mediums here at the very end, framing the whole chapter as one unified statement on where Israel's loyalty had to lie.
🪨 Matches the stoning penalty for Molech worship back in verse 2
📚 Forms a closing bookend for the entire chapter
🎯 The whole chapter argues for one thing: undivided loyalty to God
`;

export const LEVITICUS_TWENTY_PERSONAL_SECTIONS = parseLeviticusTwentyRawNotes(LEVITICUS_TWENTY_RAW_NOTES);
