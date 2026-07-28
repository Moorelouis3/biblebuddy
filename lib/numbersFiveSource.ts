export type NumbersFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersFiveRawNotes(rawText: string): NumbersFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 5:${startVerse}` : `Numbers 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 5 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_FIVE_RAW_NOTES = `# Numbers 5:1-4
# 🏕️ Keeping The Camp Clean
---
## 🩹 Every Leper
"Leper" in the Bible covers more than the disease we call leprosy (Hansen's disease) today. It's a broad label for a range of skin conditions, spelled out in detail back in Leviticus 13-14, and a priest had to formally examine and confirm the condition before anyone was sent out.
🩹 A broad label for skin conditions, not just one specific disease
📖 Fully defined and diagnosed back in Leviticus 13-14
✅ A priest confirmed the diagnosis, not a snap judgment
---
## 💧 Every One That Hath An Issue
"Issue" means an unusual bodily discharge, covered in detail in Leviticus 15 - things like ongoing wounds or fluid loss that made a person ceremonially unclean until it stopped and they were purified. It wasn't a moral failure, just a physical condition with a required waiting period.
💧 An unusual bodily discharge, defined in Leviticus 15
⏳ Uncleanness here was temporary, tied to a waiting period
🔑 A physical condition, not a moral judgment against the person
---
## ☠️ Whosoever Is Defiled By The Dead
Touching a dead body made a person ceremonially unclean, a rule this book will spell out fully in Numbers 19. It applied to everyone eventually - death touches every family - so this wasn't about singling out a few unlucky people.
☠️ Contact with a corpse caused ceremonial uncleanness
📖 The full rule for this gets its own chapter later, Numbers 19
🔑 Everyone eventually faced this, since everyone faces death
---
## 🚻 Both Male And Female Shall Ye Put Out
A direct statement that this law applies equally to men and women, no exceptions either way. It stands out next to Numbers 1's census, which only counted military-age men - purity rules, unlike that count, drew no line between the sexes.
🚻 Applies equally to men and women, no exceptions
🔀 A contrast with Numbers 1's men-only military census
🔑 Purity law in this book didn't separate by sex
---
## 🏕️ Without The Camp
"Without" means outside, not "lacking." By now the camp's layout is familiar from Numbers 2 - the tabernacle at the center, Levites ringed around it, the twelve tribes camped around them. Being sent "without the camp" meant leaving that entire structured space, all the way past its outer edge.
🏕️ "Without" is an old word for "outside," not "lacking"
📖 The camp's layout was set out back in Numbers 2
🚶 Meant leaving the whole structured space, past its outer edge
---
## 🕊️ That They Defile Not Their Camps, In The Midst Whereof I Dwell
This is the real reason behind the whole law, and it's not about hygiene or shame - it's about God's own presence. The tabernacle sat physically in the middle of the camp, and Israel is told plainly that the Lord Himself lives there among them. Keeping the camp clean was about keeping a livable space for that presence, not punishing sick or grieving people.
🕊️ The real reason: God's presence lived in the camp's center
🔑 About protecting sacred space, not shaming the unwell
❤️ Not a punishment - a practical reality of living that close to God
---
## ✅ And The Children Of Israel Did So
The same quick-obedience pattern already seen closing out chapters in this book - a command given, and immediately carried out, no argument or delay recorded.
✅ The same fast-obedience pattern seen in earlier chapters
🔁 Command given, then carried out, with nothing else recorded
🔑 Sets the tone before the next law even begins

# Numbers 5:5-10
# ⚖️ When Trust Is Broken
---
## ⚖️ A Sin That Men Commit, To Do A Trespass Against The Lord
This law covers everyday wrongs between people - lying, cheating, stealing, breaking a promise - and calls all of it a trespass against God, not just against the person wronged. Hurting another person is treated as also breaking trust with the God who commanded people to treat each other honestly.
⚖️ Covers everyday wrongs like lying, cheating, and stealing
🔑 Wronging a person is treated as also wronging God
📖 The same idea appears in the parallel law of Leviticus 6:1-7
---
## 🎯 And That Person Be Guilty
Guilt here isn't a feeling someone might or might not have - it's a fact, true the moment the wrong is done, whether or not anyone else ever finds out. The law assumes guilt is real and objective, not something that only exists once a person feels bad about it.
🎯 Guilt is treated as a fact, not just a feeling
🙈 True even if no one else ever finds out
🔑 The starting point for everything the rest of this law requires
---
## 🗣️ Then They Shall Confess Their Sin Which They Have Done
Confession comes first, before any payment. Naming the specific wrong out loud - not a vague sense of guilt - is the first required step toward making things right.
🗣️ Confession is the required first step, before any payment
🎯 Naming the specific wrong, not a vague feeling of guilt
🔑 Words come before money in this process
---
## 💰 Recompense His Trespass With The Principal Thereof
"Principal" means the original amount or value that was taken, damaged, or owed - the base debt itself, before any penalty gets added on top. Paying back the principal means making the wronged person whole again for exactly what they lost.
💰 "Principal" is the original amount taken or owed, full stop
🔁 Paying it back restores exactly what was lost
🔑 The starting point before any extra penalty is added
---
## ➕ And Add Unto It The Fifth Part Thereof
On top of paying back what was taken, the guilty person adds another twenty percent as a penalty - "fifth part" means one-fifth, or 20 percent extra. This same one-fifth penalty shows up again in Leviticus for similar trespass cases - it wasn't invented fresh here, it was an established formula.
➕ "Fifth part" means one-fifth - a 20 percent penalty on top
📖 The same one-fifth penalty appears again in Leviticus
🔑 Restitution alone wasn't enough - wrongdoing had a real cost
---
## 🤝 Give It Unto Him Against Whom He Hath Trespassed
The payment goes straight to the specific person who was wronged, not into some general community fund. Restitution in this law is personal, aimed at repairing one real relationship, not an abstract fine.
🤝 Payment goes directly to the specific person wronged
🔑 Personal restitution, not a fine paid into a general fund
❤️ Aimed at repairing one real relationship
---
## 👪 But If The Man Have No Kinsman To Recompense The Trespass Unto
A specific hard case: what if the wronged person has since died, and has no living relative left to receive the payment on their behalf? Ancient Israelite family structure normally had a close relative step in for situations like this - but sometimes no one was left.
👪 A hard case: the wronged person has died with no relative left
🔑 Normally a close relative would receive payment on their behalf
❓ This law doesn't let that gap simply cancel the debt
---
## 🙏 Let The Trespass Be Recompensed Unto The Lord, Even To The Priest
When there's truly no human being left to receive the payment, the debt still has to be paid - it goes to God, delivered through the priest. Wrongdoing doesn't just quietly disappear because the one owed money is unreachable.
🙏 The debt still gets paid, even with no one left to receive it
🔑 It goes to God, delivered through the priest
❌ Wrongdoing doesn't vanish just because the victim is unreachable
---
## 🐏 Beside The Ram Of The Atonement, Whereby An Atonement Shall Be Made For Him
This ram sacrifice is separate from the restitution payment, and it does a separate job. Paying back the debt repairs the relationship with the person who was wronged; the sacrifice repairs the relationship with God that the sin itself damaged.
🐏 A separate sacrifice, doing a separate job from restitution
🤝 Restitution repairs the human relationship
🙏 The sacrifice repairs the relationship with God
---
## 🎁 Every Offering...Shall Be His; And Every Man's Hallowed Things Shall Be His
The chapter shifts here into a short, general note about priestly income: gifts and offerings people bring to a priest become that priest's own to keep. Priests received no land inheritance like the other tribes, so these gifts functioned as their actual livelihood, a theme this book returns to at length later on.
🎁 Gifts brought to a priest become that priest's own property
🏞️ Priests had no land inheritance like the other tribes did
💼 These gifts were, in effect, how a priest made a living

# Numbers 5:11-15
# 😠 A Husband's Suspicion
---
## 🚶 If Any Man's Wife Go Aside, And Commit A Trespass Against Him
"Go aside" is an old way of saying she turned away from her marriage and was unfaithful. The same word choice as the sin law just above links this to that law's language of "trespass" - this too is treated as a broken trust, not just a private family matter.
🚶 "Go aside" is an old idiom for being unfaithful
🔗 Echoes the "trespass" language from the law just before it
🔑 Framed as a broken trust, not only a private matter
---
## 🤫 It Be Hid From The Eyes Of Her Husband, And Be Kept Close
This spells out the exact situation the law is written for: a secret affair, with no one else aware of it. That detail matters, because it explains why this law exists at all - the normal tools for settling a dispute don't work when nobody but the two people involved actually knows the truth.
🤫 Describes a secret affair, hidden from everyone else
❓ Explains exactly why this unusual law is even needed
🔑 Ordinary evidence simply isn't available in this situation
---
## 👀 There Be No Witness Against Her, Neither She Be Taken With The Manner
Israelite law normally required more than one witness to establish guilt in a serious case. "Taken with the manner" is an old expression meaning caught red-handed, in the act itself. This verse rules out both of the normal ways guilt would usually be proven.
👀 Israelite law normally required more than one witness
🚨 "Taken with the manner" is an old way of saying "caught in the act"
❌ This verse rules out both of the usual ways to prove guilt
---
## 😠 The Spirit Of Jealousy Come Upon Him, And He Be Jealous Of His Wife
This exact phrase gets repeated twice in a row, once for a wife who actually is guilty and once for a wife who is not. The law is written to cover both situations equally - a husband's suspicion, whether accurate or mistaken, is what triggers this whole process either way.
😠 Repeated twice - once for guilt, once for innocence
⚖️ The law covers both situations with the exact same process
🔑 Suspicion itself triggers the process, not proven guilt
---
## 🌾 The Tenth Part Of An Ephah Of Barley Meal
An ephah was a dry measure, roughly enough grain to fill a large basket - a tenth of one is a small, modest amount. Barley was cheaper and coarser than the wheat flour used in most grain offerings, fitting for an offering tied to shame and suspicion rather than celebration.
🌾 An ephah is a dry measure; a tenth is a modest amount
💰 Barley was cheaper, coarser grain than typical offering flour
🔑 A humble offering, matching the uncomfortable situation
---
## 🚫 He Shall Pour No Oil Upon It, Nor Put Frankincense Thereon
Normal grain offerings included oil, a symbol of blessing, and frankincense, a pleasant-smelling incense. Both are deliberately left out here. Leviticus's law for the poorest sin offering does the same thing for a similar reason - this offering isn't meant to please or celebrate, it's meant to formally raise a hard question.
🚫 Oil (blessing) and frankincense (pleasant scent) are both left out
📖 Leviticus's poorest sin offering skips them for a similar reason
🔑 Not an offering of celebration - one of formal accusation
---
## 📜 An Offering Of Jealousy, An Offering Of Memorial, Bringing Iniquity To Remembrance
"Memorial" here doesn't mean a happy remembrance - it means this offering formally puts the accusation on record before God. Its whole purpose is to name the suspicion out loud in a sacred setting, not to ask for a blessing.
📜 "Memorial" means formally placing the matter on record
🎯 Its purpose is to name the suspicion, not request a blessing
🔑 A legal function, not a celebratory one
---
## 👉 Then Shall The Man Bring His Wife Unto The Priest
This single instruction takes the entire matter out of the husband's hands. He cannot personally judge, punish, or divorce her over unproven suspicion - the case has to go to God through the priest, protecting the wife from being harmed on nothing but an accusation.
👉 Takes the whole matter out of the husband's hands entirely
🛡️ He cannot personally judge or punish her himself
🔑 Protects the wife from harm based on accusation alone

# Numbers 5:16-18
# 🏺 The Ritual Begins
---
## 🚶 The Priest Shall Bring Her Near, And Set Her Before The Lord
"Before the LORD" means at the tabernacle entrance itself, the sacred space where formal matters were brought to God directly. This isn't a quiet conversation between husband, wife, and priest - it's a formal proceeding, conducted in front of God.
🚶 "Before the LORD" means at the tabernacle entrance itself
📋 A formal proceeding, not a private conversation
🔑 Conducted directly in front of God, not behind closed doors
---
## 🏺 Holy Water In An Earthen Vessel
"Holy water" was almost certainly ordinary water taken from the bronze laver priests washed at before serving (Exodus 30:18-21) - made holy by where it came from, not by any special formula. "Earthen vessel" means a plain clay pot, not gold or silver like most sacred containers, since its one-time use didn't call for anything expensive.
🏺 Likely ordinary water from the priests' washing basin
📖 That basin is described back in Exodus 30:18-21
🏺 A plain clay pot, not the usual gold or silver vessel
---
## 🌫️ Of The Dust That Is In The Floor Of The Tabernacle
Plain dust, taken from the very ground of the holy space, gets mixed into the water. Dust is used elsewhere in Scripture as a symbol of humility and mortality - stirring it into this water ties the ritual to both the holy ground itself and to human smallness before God.
🌫️ Ordinary dust, taken from the holy ground itself
🔑 Dust often symbolizes humility and mortality in Scripture
🏺 Ties the ritual to the exact place they stand
---
## 💇 Uncover The Woman's Head
A married woman's hair was normally kept covered as a sign of modesty and status. Uncovering it here, publicly, was a visible sign of humiliation - marking her, in front of everyone present, as a woman under formal suspicion.
💇 Normally covered hair marked a woman's modesty and status
👁️ Uncovering it here was a visible, public sign of shame
🔑 Marks her openly as a woman under suspicion
---
## ✋ Put The Offering Of Memorial In Her Hands
She personally holds the very offering that formally raises the accusation against her. This forces her direct participation in her own trial - she isn't a passive bystander in the process, she physically carries the thing that puts the matter on record.
✋ She physically holds the offering that raises the accusation
🔑 Forces her direct, personal participation in the process
🚫 She's not a passive bystander in her own trial
---
## ☠️ The Bitter Water That Causeth The Curse
This name describes what the water is about to become, not how it currently tastes. It's called this because it's the vehicle for a curse that will only ever take effect if she's actually guilty - the name looks ahead to what's about to happen, not backward to some existing property.
☠️ Names what the water is about to become, not its current taste
⚖️ It's only a vehicle for a curse that activates on real guilt
🔑 The whole ritual hinges on that one condition

# Numbers 5:19-22
# 🗣️ The Oath And The Curse
---
## ⚖️ The Priest Shall Charge Her By An Oath
An oath here is a formal, legally binding self-curse, not a casual promise. Swearing this kind of oath before God was treated as one of the most serious acts a person could perform in the ancient world.
⚖️ A formal, legally binding self-curse, not a casual promise
🌍 Oaths like this were treated as deeply serious across the ancient world
🔑 Sets the weight for everything said next
---
## 🕊️ If No Man Have Lain With Thee...Be Thou Free From This Bitter Water
The innocent outcome is stated first and plainly: if she's telling the truth, the water simply has no power over her at all. The ritual isn't designed to harm every woman brought to it - only a guilty one.
🕊️ States the innocent outcome first, in plain terms
✅ If she's truthful, the water has no power over her
🔑 The ritual only threatens a woman who is actually guilty
---
## 😠 If Thou Hast Gone Aside To Another, And If Thou Be Defiled
The guilty condition is spelled out in full detail too, in the same careful language used for the innocent condition just before it. Both possible outcomes get stated plainly, before the actual ceremony moves forward another step.
😠 The guilty condition, spelled out just as carefully
⚖️ Mirrors the innocent condition stated one verse earlier
🔑 Both outcomes named clearly before the ritual continues
---
## ⚠️ The Priest Shall Charge The Woman With An Oath Of Cursing
The language shifts here from a neutral oath to specifically an oath "of cursing" - the second half of the same oath, now spelling out exactly what happens to her if she turns out to be guilty.
⚠️ A shift from a neutral oath to specifically a curse
🔀 The second half of the same oath, now naming consequences
🔑 Prepares the reader for the specific curse formula next
---
## 👥 The Lord Make Thee A Curse And An Oath Among Thy People
This is a set curse formula, meaning her name would become a byword - something people would actually say when cursing someone else ("may you end up like her"). It's a specific, known type of ancient curse language, not a generic threat.
👥 A set formula - her name could become an actual curse-word
🗣️ People might literally invoke her as an example when cursing
🔑 A known type of ancient curse language, not a vague threat
---
## 🦵 Thy Thigh To Rot, And Thy Belly To Swell
Many scholars read "thigh" here as an old euphemism for the womb or reproductive organs - the same kind of language used elsewhere in Scripture, like descendants being described as coming "out of one's thigh" (Genesis 46:26). Read that way, the described judgment points to infertility or a lost pregnancy, not a random illness.
🦵 "Thigh" is widely read as an old euphemism for the womb
📖 Similar language appears elsewhere, like Genesis 46:26
🔑 Likely points to infertility or a lost pregnancy, not random illness
---
## 🌊 This Water...Shall Go Into Thy Bowels
The text repeats that it's the water itself carrying the judgment, not the priest's opinion or the community's verdict. Nothing about this outcome depends on a human decision - it depends entirely on whether she's actually guilty.
🌊 Repeats that the water itself carries the judgment
🚫 Not the priest's opinion or a human verdict
🔑 Depends entirely on whether real guilt exists
---
## 🙏 And The Woman Shall Say, Amen, Amen
"Amen" means "so be it" or "truly" - said here twice for emphasis. She isn't a silent, coerced participant; she personally and verbally agrees to the entire oath and everything it promises, guilty or innocent.
🙏 "Amen" means "so be it" or "truly"
🔁 Said twice here, for emphasis
🗣️ She personally and verbally agrees to the whole oath

# Numbers 5:23-28
# 🥤 Drinking The Water
---
## 📖 The Priest Shall Write These Curses In A Book, And He Shall Blot Them Out With The Bitter Water
The curse words are physically written down in ink, then washed off the page directly into the water she's about to drink. The written curse becomes a literal, physical part of what she consumes - a vivid, tangible way of placing the oath inside her rather than just speaking it aloud.
📖 The written curse is physically washed into the water itself
🥤 It becomes a literal part of what she then drinks
🔑 A tangible way of placing the oath inside her, not just spoken
---
## 🥤 The Priest Shall Cause The Woman To Drink The Bitter Water
Drinking the water actually gets mentioned twice in this short passage - once here, and again a couple verses later. Hebrew narration often states the main outcome first in summary, then circles back to walk through the full order of events in detail, which is exactly what happens across these verses.
🥤 Drinking is mentioned twice in this short passage
🔁 The outcome stated first, then the full order retold in detail
🔑 A common pattern in how Hebrew narration is structured
---
## 🌊 Shall Enter Into Her, And Become Bitter
This repeated phrase makes an important point: the bitterness only becomes real once it's inside her, and only if she's guilty. That's a genuinely different picture from many other ancient "trial by ordeal" rituals, where the substance itself was often dangerous to anyone who drank it, guilty or not.
🌊 Bitterness only becomes real inside her, and only if guilty
⚖️ A real contrast with many other ancient trial-by-ordeal rituals
🔑 Innocence was never at risk from the substance itself
---
## 🙌 The Priest Shall Take The Jealousy Offering...And Wave The Offering Before The Lord
"Wave offering" describes a specific ritual motion - physically presenting food to God in a symbolic gesture before it's used. It's a standard step across many different Israelite offerings, not something invented specifically for this one.
🙌 A specific ritual motion, presenting food to God symbolically
🔁 A standard step across many different types of offerings
🔑 Not invented specifically for this unusual case
---
## 🔥 Burn It Upon The Altar
A handful of the barley meal is burned as a normal grain offering, following the same basic procedure as any other grain offering in Israel's worship. Even in this unusual, uncomfortable situation, the ritual still follows the ordinary rules for how offerings are handled.
🔥 A handful is burned, following the standard grain-offering rule
📋 Even here, the ordinary offering procedure still applies
🔑 Consistency, even in an unusual situation
---
## ⏱️ And Afterward Shall Cause The Woman To Drink The Water
This confirms the exact order of events: the offering is burned first, and only afterward does she actually drink. The ceremony has a fixed sequence, not something improvised on the spot.
⏱️ Confirms the exact order: offering burned, then drinking
📋 A fixed sequence, not something improvised
🔑 Matches the detailed retelling promised earlier in the passage
---
## 🤰 Her Belly Shall Swell, And Her Thigh Shall Rot
The guilty consequence, described back in the oath itself, is now shown actually playing out for a truly guilty woman. The text is consistent - what the oath promised is exactly what happens, nothing more and nothing different.
🤰 The exact consequence described in the earlier oath, now realized
✅ The text stays consistent between the promise and the outcome
🔑 Only happens if the guilt behind it is real
---
## 👥 The Woman Shall Be A Curse Among Her People
The consequence isn't only physical - it's also social and public. Her name becomes exactly what the earlier oath predicted: an example people invoke as a warning, tying directly back to the curse formula from a few verses earlier.
👥 A public, social consequence, not just a physical one
🔗 Fulfills the exact curse formula named a few verses earlier
🔑 Her situation becomes a public warning to others
---
## ✅ If The Woman Be Not Defiled, But Be Clean
The innocent outcome, stated as plainly and directly as the guilty one was. The law never lingers only on guilt - it gives just as much weight to describing what happens when the suspicion turns out to be false.
✅ The innocent outcome, stated just as plainly as the guilty one
⚖️ The law gives equal weight to both possible outcomes
🔑 This isn't a ritual biased toward finding guilt
---
## 🕊️ Then She Shall Be Free
"Free" here means more than simply unharmed - it means formally cleared. The suspicion is officially over, and she carries no more legal cloud or shame from the accusation.
🕊️ Means formally cleared, not just physically unharmed
📋 The suspicion is officially closed, not just quietly dropped
🔑 No more legal cloud or shame left hanging over her
---
## 🌱 And Shall Conceive Seed
This detail goes further than simply "nothing bad happens." An innocent woman is promised an active blessing of future fertility, not just the absence of harm - a genuinely positive outcome named specifically for her.
🌱 More than "no harm" - an active promise of future fertility
➕ A positive blessing, not just the absence of a curse
🔑 Named specifically as her outcome, not left vague

# Numbers 5:29-31
# 📜 The Law Of Jealousies
---
## 📜 This Is The Law Of Jealousies
This closing line names and summarizes the entire ritual just described, a pattern this book repeats - a short "this is the law of ___" line wrapping up a topic, the same structure used again a few verses later for the law of the Nazarite in chapter 6.
📜 A closing summary line naming the whole ritual just described
🔁 The same "this is the law of ___" pattern repeats later, in chapter 6
🔑 A structural marker, closing out this topic before the next
---
## 😠 When A Wife Goeth Aside To Another Instead Of Her Husband, And Is Defiled
The guilty scenario gets restated one final time here, now as the formal legal definition of exactly when this whole law applies.
😠 The guilty scenario, restated as a formal legal definition
📋 Marks exactly which situations this law covers
🔁 The final of several restatements across the chapter
---
## 🌫️ Or When The Spirit Of Jealousy Cometh Upon Him
The law restates that it applies equally to unfounded suspicion, not only to actual guilt. This closing summary makes sure that point isn't lost - the ritual exists for the jealous husband's use in either case.
🌫️ Confirms the law applies to unfounded suspicion too
⚖️ Not only for cases of actual, provable guilt
🔑 One final reminder that both scenarios are covered equally
---
## 🙏 The Priest Shall Execute Upon Her All This Law
One more reminder of where the authority to judge actually sits - with the priest, before God, never with the husband acting alone. The chapter closes exactly where it kept insisting the whole way through.
🙏 A final reminder of where judgment authority actually sits
🚫 Never with the husband acting alone, from start to finish
🔑 The chapter closes on the same point it kept making throughout
---
## ✅ Then Shall The Man Be Guiltless From Iniquity
By bringing his suspicion through this God-ordained process instead of taking matters into his own hands, the husband himself avoids guilt for raising the accusation. The law protected him too, as long as he used the process rather than acting alone.
✅ The husband avoids guilt by using this process, not acting alone
🛡️ Covers violence, unilateral divorce, or public shaming he might've chosen instead
🔑 The law protected both people in this situation, not just one
---
## ⚖️ And This Woman Shall Bear Her Iniquity
The final line only applies consequence to a woman who is genuinely guilty - it isn't a blanket statement about women in general. The same condition that ran through the entire chapter, real guilt and nothing less, is exactly what this closing line depends on too.
⚖️ Applies only to a woman who is genuinely, actually guilty
🚫 Not a blanket statement condemning women in general
🔑 The same real-guilt condition that ran through this whole chapter
`;

export const NUMBERS_FIVE_PERSONAL_SECTIONS = parseNumbersFiveRawNotes(NUMBERS_FIVE_RAW_NOTES);
