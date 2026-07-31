export type NumbersSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSixRawNotes(rawText: string): NumbersSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 6:${startVerse}` : `Numbers 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 6 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SIX_RAW_NOTES = `# Numbers 6:1-4
# 🍇 Taking The Nazarite Vow
---
## 🙋 Either Man Or Woman
This vow was open to any Israelite, not just priests or a special class of people. A man or a woman could choose it, and choosing it was completely voluntary, unlike the priesthood, which only ran in one family by birth. Samson and Samuel were set apart as Nazarites for their whole lives before they were even born (Judges 13, 1 Samuel 1) - the vow described here is different, an ordinary person choosing this path for a set stretch of time.
🙋 Open to any Israelite, man or woman, no exceptions
🎯 A voluntary choice, unlike the priesthood, which passed down by birth
👶 Different from lifelong Nazarites like Samson, set apart before birth
---
## 🗣️ Vow Of A Nazarite
"Nazarite" comes from a Hebrew word meaning "one who is separated" or "set apart." A vow was a solemn spoken promise made directly to God - not a private wish, but a real commitment with real requirements attached once it was spoken out loud. This book returns to the subject of vows in general later, in Numbers 30.
🗣️ "Nazarite" means "one who is separated" or "set apart"
📢 A vow was a spoken, binding promise, not a private wish
📖 Numbers 30, later in this book, covers vows more broadly
---
## 🔑 To Separate Themselves Unto The Lord
The word "separate" appears three times packed into these two verses. That kind of repetition is the text's way of underlining the vow's entire point: dedicating a stretch of time to God, not simply giving something up for its own sake. Everything that follows - the grapes, the hair, the avoiding of death - only makes sense as evidence of that one underlying purpose.
🔑 "Separate" is repeated three times in just two verses
🎯 The point was dedicating time to God, not just giving things up
📋 Every rule that follows serves this one underlying purpose
---
## 🍷 Wine And Strong Drink
"Strong drink" is an old term for a fermented beverage that wasn't made from grapes - beer-like drinks brewed from grain, or drinks made from dates or other fruit. Naming both wine and strong drink together closed any loophole: every kind of alcoholic beverage, not just wine specifically, was off-limits for the length of the vow.
🍷 "Strong drink" means fermented drinks made from something other than grapes
🚫 Naming both wine and strong drink closes any obvious loophole
📋 The first of the vow's three major restrictions
---
## 🍇 Vinegar...Nor Eat Moist Grapes, Or Dried
The list keeps going past alcohol entirely: no vinegar made from wine, no vinegar from strong drink, no grape juice, not even fresh grapes or raisins (dried grapes). This makes clear the point was never just about avoiding drunkenness - it was about total abstinence from the grapevine itself, in any form, alcoholic or not.
🍇 The ban covers non-alcoholic grape products too, like raisins
🎯 Proves this was never really about avoiding drunkenness alone
📋 Total abstinence from the vine, not moderate drinking
---
## 🌿 From The Kernels Even To The Husk
"Kernels" means the seeds inside the grape, and "husk" means the skin. Even these smallest, most overlooked parts of the plant were forbidden food for the length of the vow. The rule was written to leave no loophole anywhere - not the wine, not the juice, not even a stray seed.
🌿 "Kernels" are the seeds, "husk" is the skin of the grape
🔍 Even the smallest, most overlooked parts of the plant were banned
🚫 A rule built to leave absolutely no loophole
---
## 🎯 Why Grapes, Specifically
Wine and grapes were a symbol of settled, prosperous life in Canaan - later in this same book, the spies bring back a single cluster of grapes so large it takes two men to carry it, as proof of the land's richness (Numbers 13:23). Giving up every trace of the vine was a visible way of setting aside comfort and ordinary pleasure for as long as the vow lasted, in the same spirit as the Rechabites' vow of simple living centuries later (Jeremiah 35).
🍇 Grapes symbolized settled prosperity, as Numbers 13:23 later shows
🎯 Giving them up meant visibly setting aside comfort for the vow's length
📖 A similar vow of simple living shows up later with the Rechabites (Jeremiah 35)

# Numbers 6:5-8
# 💇 The Visible Signs Of The Vow
---
## 🪒 There Shall No Razor Come Upon His Head
This is the second of the vow's three restrictions: no cutting the hair for as long as the vow lasted. Paired with the ban on grapes, it meant the Nazarite's whole daily life - what they ate and drank, and even how they looked - visibly marked out this stretch of time as different from ordinary life.
🪒 The second of three total restrictions in the vow
✂️ No cutting hair at all until the vow's time was finished
👁️ Made the vow visible in daily life, not just a private choice
---
## 💇 Let The Locks Of His Head Grow
Growing hair became the walking, public sign of the vow - anyone who saw a Nazarite could tell, just by looking, that this person was under a vow to God. This actually set a Nazarite apart even from ordinary priests, who were required to keep their hair trimmed, not shaggy or unkempt (Ezekiel 44:20).
💇 Long hair worked as a visible, public sign of the vow
👁️ Anyone could tell at a glance that someone was under this vow
📖 Priests, by contrast, had to keep their hair trimmed (Ezekiel 44:20)
---
## ✨ He Shall Be Holy
"Holy" here means set apart for God's use for this specific stretch of time - it isn't a claim about the person's personal moral perfection. This is a status tied directly to the vow itself, lasting exactly as long as the vow does, not a permanent trait the person now possesses.
✨ "Holy" means set apart for God's use, not moral perfection
⏳ A status tied to the vow's timeframe, not a permanent trait
🔑 Echoed again at the end of this section, in verse 8
---
## ☠️ He Shall Come At No Dead Body
The third and final restriction: total avoidance of contact with a corpse. This connects directly back to the defilement law just covered in Numbers 5, and forward to the fuller version of this same rule that gets its own chapter later, Numbers 19.
☠️ The third of the vow's three total restrictions
🔗 Connects back to the defilement law just given in Numbers 5
📖 The fullest version of this rule comes later, in Numbers 19
---
## 👪 Not For His Father, Or For His Mother...When They Die
This rule is strict even for the closest possible family - a Nazarite couldn't attend to or bury even a parent or sibling during the vow. That's actually stricter than the rule for ordinary priests, who were allowed to become unclean for close family (Leviticus 21:1-4). Only the High Priest was normally held to a no-exceptions standard like this, even for his own parents (Leviticus 21:10-11) - meaning a Nazarite's vow held them, temporarily, to the same bar as the High Priest.
👪 Applies even to a Nazarite's own parents and siblings
📖 Stricter than ordinary priests, who could attend close family (Leviticus 21:1-4)
🔑 Temporarily holds a Nazarite to the same standard as the High Priest
---
## 🔑 Because The Consecration Of His God Is Upon His Head
"Consecration" means the dedication itself, pictured here almost like something physically resting on the Nazarite's head - fittingly, since the uncut hair is the one visible sign anyone could actually see. The reason given for staying away from death isn't squeamishness or fear - it's the vow itself, sitting there, unbroken.
🔑 "Consecration" is pictured almost like a physical weight on the head
💇 Fitting, since the uncut hair is the vow's one visible sign
🎯 The reason given is the vow itself, not fear of death
---
## 📜 All The Days Of His Separation
A short summary line, repeating language used throughout this whole passage. It signals that verses 2 through 8 form one complete unit describing everything the vow requires, right before the chapter turns to a very different question: what happens if something breaks it.
📜 Closes out one complete unit: everything the vow requires
🔁 Repeats the "days of his separation" language used throughout
➡️ Sets up the next section's question: what if it gets broken?

# Numbers 6:9-12
# ⚰️ If Death Happens Suddenly
---
## 💨 Die Very Suddenly By Him
This describes an accident - someone unexpectedly dying right next to a Nazarite, with no warning and no intention involved on the Nazarite's part. The law doesn't require any fault or carelessness for the defilement to count. Simple physical closeness to a death breaks the vow's purity, no matter how it happened or whose fault it was.
💨 Describes a sudden, unplanned death near the Nazarite
🚫 No fault or intention needed for the defilement to count
🔑 Simple closeness to death breaks the vow's purity either way
---
## 🪒 He Hath Defiled The Head Of His Consecration
"Head" stands in for the entire vow, since the growing hair is its visible sign. A sudden death nearby doesn't just cause a minor inconvenience - it actually invalidates the whole consecration built up to that point, hair and all.
🪒 "Head" stands for the whole vow, not just the literal body part
💥 A sudden death nearby invalidates the entire consecration so far
🔑 Everything built up to that point is now undone
---
## 📅 Shave His Head...On The Seventh Day
The visible sign of the vow - the uncut hair - now has to come off, on the seventh day after the defilement. That seven-day period matches the standard purification time for anyone who touched a dead body, Nazarite or not, spelled out fully later in Numbers 19:11-12.
📅 The uncut hair is shaved off, on day seven after the defilement
📖 Matches the standard corpse-contact purification period (Numbers 19:11-12)
🔑 The same timeline applied to any Israelite, not just a Nazarite
---
## 🕊️ Two Turtles, Or Two Young Pigeons
These birds were the standard low-cost offering option used throughout Israelite law, available to anyone who couldn't afford a lamb or a goat (Leviticus 5:7, 12:8). Requiring only birds here meant purification from this kind of accidental defilement was never out of reach for a poor Nazarite.
🕊️ The standard low-cost offering option in Israelite law
💰 Kept purification affordable, even for someone with little money
📖 The same option appears elsewhere, like Leviticus 5:7 and 12:8
---
## 🐦 One For A Sin Offering, And The Other For A Burnt Offering
A sin offering dealt with the specific defilement itself, while a burnt offering, fully burned up on the altar, signaled complete rededication back to God. Bringing both together addressed both the immediate problem and the bigger picture of the broken vow at the same time.
🐦 A sin offering addresses the specific defilement itself
🔥 A burnt offering signals complete rededication back to God
🔑 Together, both the problem and the bigger picture get addressed
---
## ⚖️ For That He Sinned By The Dead
Worth pausing on this word choice: the text actually calls this "sin," even though the death was a pure accident, nobody's fault, and completely outside the Nazarite's control. The law treats ritual defilement as something that genuinely needs atoning for, regardless of anyone's intentions.
⚖️ The text calls accidental defilement "sin," despite no wrongdoing
🎯 Ritual defilement needed atonement whether or not anyone was at fault
🔑 Intention didn't change whether atonement was required
---
## 🔄 Hallow His Head That Same Day
Re-consecration happens immediately - the same day as the offering, not weeks later once the hair has regrown. The vow restarts formally right away, even though its visible sign will take time to fully return.
🔄 Re-consecration happens the same day as the offering
⏱️ The vow restarts formally at once, without waiting on the hair
🔑 The visible sign lags behind, but the vow itself resumes immediately
---
## 🐑 A Lamb Of The First Year For A Trespass Offering
A third animal, more costly than the two birds, gets added here specifically because of the broken vow. The birds in verse 10 dealt with the physical impurity itself; this lamb deals with something different - the vow that got interrupted.
🐑 A third, costlier animal, added specifically for the broken vow
🕊️ Different purpose than the birds, which addressed the impurity itself
🔑 This offering addresses the vow, not the defilement
---
## ⏮️ The Days That Were Before Shall Be Lost
The clock resets completely to zero. None of the time already spent under the vow counts anymore - if someone was well into a long vow when this happened, all of that time is gone, and the whole vow starts over from day one.
⏮️ The vow's timeline resets completely to zero
🔢 Time already spent under the vow no longer counts at all
🔁 The entire vow period must be completed again from scratch

# Numbers 6:13-17
# 🐏 Completing The Vow
---
## 📜 This Is The Law Of The Nazarite
Another "this is the law of ___" summary heading - the exact same structural pattern Numbers 5 just used to wrap up the law of jealousies. It signals a fresh, self-contained topic: what happens when the vow's time period runs its full course, with no defilement or interruption at all.
📜 The same "law of ___" pattern used to close Numbers 5
➡️ Marks a fresh topic: a vow completed the normal way, start to finish
🔑 No defilement involved here - this is the standard happy ending
---
## 🚪 He Shall Be Brought Unto The Door Of The Tabernacle
Completing the vow required a formal, public ceremony at the tabernacle entrance - the same sacred location used throughout the rituals in the chapter before this one. It wasn't something wrapped up quietly at home.
🚪 A formal, public ceremony, not something handled privately
📖 The same sacred location used throughout Numbers 5's rituals
🔑 Marks the vow's completion as an official, witnessed event
---
## 🐑 One He Lamb...For A Burnt Offering
"He lamb" is an old way of saying a male lamb. A burnt offering was fully burned up on the altar, holding back nothing - a symbol of complete dedication back to God. "Without blemish," repeated for all three animals here, meant the physically best animal available, never a flawed leftover.
🐑 "He lamb" is old English for a male lamb
🔥 Fully burned - a symbol of complete dedication to God
✅ "Without blemish" meant the best animal available, no exceptions
---
## 🐑 One Ewe Lamb...For A Sin Offering
"Ewe" means a female lamb. A sin offering dealt with specific wrongdoing or impurity needing atonement - a distinct purpose from the burnt offering named right alongside it.
🐑 "Ewe" is old English for a female lamb
🎯 A sin offering addressed specific wrongdoing needing atonement
🔀 A separate purpose from the burnt offering named just before it
---
## 🐏 One Ram...For Peace Offerings
A peace offering, sometimes called a fellowship offering, was partly burned on the altar and partly eaten in a shared meal. It celebrated a restored, healthy relationship - a fitting way to mark a vow that had just been successfully completed.
🐏 Partly burned, partly eaten in a shared celebratory meal
🤝 Celebrated a restored, healthy relationship
🔑 A fitting close to a vow finished the normal way
---
## 🍞 Unleavened Bread...Mingled With Oil
"Unleavened" means made without yeast, the standard rule for grain offerings throughout Israelite worship, echoing the unleavened bread of Passover. Oil was mixed into the cakes and brushed onto the wafers - practically helpful for baking, and symbolically tied to blessing and consecration elsewhere in Scripture.
🍞 "Unleavened" means made without yeast, like Passover bread
🫒 Oil was mixed in and brushed on, both practical and symbolic
📖 Oil elsewhere in Scripture often marks blessing or consecration
---
## 🍷 Their Meat Offering, And Their Drink Offerings
In KJV English, "meat offering" is an old term for a grain offering - it has nothing to do with meat or flesh at all, a common mix-up for a modern reader. Grain and drink (wine) offerings were the standard accompaniment to an animal sacrifice, never brought on their own.
🍷 "Meat offering" in the KJV means a grain offering, not flesh
📋 The standard accompaniment to an animal sacrifice
🔑 Never brought by itself - always alongside the animal offerings
---
## 📋 The Order: Sin Offering, Then Burnt Offering, Then Peace Offering
The sequence itself carries meaning found throughout Israelite worship. Sin gets dealt with first, clearing the obstacle; then comes full dedication; only then comes the celebratory shared meal. Relationship with God gets repaired before it gets celebrated.
📋 A set sequence: sin offering, then burnt offering, then peace offering
🔧 Repair comes first, celebration comes only after
🔑 A pattern repeated throughout Israelite worship, not unique to this vow

# Numbers 6:18-21
# ✂️ The Final Steps
---
## ✂️ Shall Shave The Head Of His Separation
Even when the vow finishes with no defilement at all, the hair still gets shaved off at the very end. The visible sign of the vow was only ever meant to be temporary, exactly like the vow itself.
✂️ The hair comes off even after a vow completed without incident
⏳ The sign was always meant to be temporary, like the vow
🔑 Completion, not just interruption, ends with shaving
---
## 🔥 Put It In The Fire...Of The Peace Offerings
The shaved-off hair - the literal, physical evidence of months of consecration - is deliberately burned as part of the sacrifice itself. It's a vivid, physical way of giving the very sign of the vow back to God, rather than simply discarding it.
🔥 The hair itself becomes part of the sacrifice, not discarded
👁️ A vivid, physical way of giving the sign of the vow back to God
🔑 The evidence of the vow is offered up, not thrown away
---
## 🍖 The Sodden Shoulder Of The Ram
"Sodden" is an old word for boiled. The priest hands the Nazarite a boiled shoulder of meat, along with bread, to hold personally right after the shaving is finished.
🍖 "Sodden" is an old word meaning boiled
🤲 The Nazarite personally holds this food right after shaving
🔑 One more moment of direct, physical participation in the ritual
---
## 🙌 Wave Them For A Wave Offering
A wave offering involved a specific ceremonial motion - lifting the food toward God as a visible gesture before it changed hands. The Nazarite briefly holds the food themselves before the priest performs this motion, another moment of personal participation in their own ceremony.
🙌 A specific ceremonial motion, lifting food toward God
🤲 The Nazarite holds it briefly before the priest waves it
🔑 One more way the Nazarite personally takes part, not a bystander
---
## 🍽️ This Is Holy For The Priest
The wave breast and heave shoulder, portions explained fully back in Leviticus 7:32-34, were the priest's standard cut from a peace offering - his payment, in effect, for officiating the ceremony.
🍽️ The priest's standard share of any peace offering
📖 Fully explained back in Leviticus 7:32-34
💼 Functioned as the priest's payment for officiating
---
## 🍷 The Nazarite May Drink Wine
Only now, after every single step is finished, is the restriction from verse 3 finally lifted. This one line closes the loop the chapter opened at the very start - the unmistakable, official end of the vow.
🍷 The original restriction from verse 3 is finally lifted here
🔁 Closes the loop the chapter opened at its very beginning
🔑 The clearest possible marker that the vow is truly over
---
## 📜 Beside That That His Hand Shall Get
A closing note: the offerings just listed were the required minimum, not a hard ceiling. A Nazarite who was able to give more was free to bring additional voluntary gifts on top of them.
📜 The listed offerings were a minimum, not a maximum
➕ A Nazarite could freely bring more, if they were able
🔑 Generosity beyond the requirement was welcomed, never capped

# Numbers 6:22-27
# 🙌 The Priestly Blessing
---
## 🔀 A New Topic Begins
The chapter shifts abruptly from the Nazarite vow to something completely different: a fixed blessing formula for the priests to speak over Israel. The two topics share one thread underneath - both describe how an ordinary Israelite related to God, one through voluntary extra devotion, the other through a blessing God gives freely to everyone.
🔀 A sudden shift from the Nazarite vow to a blessing formula
🔗 Both sections are about how Israelites related to God
🎁 One is voluntary devotion, the other is a free gift to everyone
---
## 🗣️ On This Wise Ye Shall Bless
This isn't a suggested blessing or one example among several options - it's the exact, required wording God gives Aaron and his sons to use. Nothing about the wording was left up to a priest's personal creativity.
🗣️ The exact, required wording, not a suggestion
🚫 Not left up to any individual priest's personal creativity
🔑 Given directly by God, through Moses, to Aaron's family
---
## 🙏 The Lord Bless Thee
The blessing is spoken to "thee," singular, even though a whole crowd of Israel stood listening at once. That wording made the blessing feel personally addressed to each individual, not just a general wish tossed out over a faceless group.
🙏 Addressed to "thee," singular, despite a whole crowd listening
👤 Made the blessing feel personal to each individual
🔑 Not a vague wish over a faceless group
---
## 🛡️ And Keep Thee
"Keep" means guard or protect - the same word used elsewhere for a shepherd watching sheep or a soldier standing guard. This isn't only a wish for good things to happen; it's a promise of continued protection over time.
🛡️ "Keep" means guard or protect, not just "look after"
🐑 The same word used for a shepherd watching sheep
🔑 A promise of ongoing protection, not a one-time wish
---
## ☀️ Make His Face Shine Upon Thee
A face "shining" toward someone is an old way of describing warm approval and closeness - the opposite of God "hiding His face," language used elsewhere in Scripture for judgment or distance (Deuteronomy 31:17). This line pictures a God who is warm, present, and favorable, not distant or withdrawn.
☀️ "Face shining" is old language for warmth and closeness
🌑 The opposite of God "hiding His face," a sign of judgment elsewhere
🔑 Pictures a present, favorable God, not a distant one
---
## 🎁 And Be Gracious Unto Thee
"Gracious" means showing kindness that isn't earned or owed - favor given freely, not paid out as a reward for good behavior. It's the same underlying idea behind the New Testament word "grace."
🎁 "Gracious" means kindness that isn't earned
🆓 Given freely, not as payment for good behavior
📖 The same root idea behind the New Testament word "grace"
---
## 😊 Lift Up His Countenance Upon Thee
"Countenance" is an old word for someone's face or expression. God "lifting" His face toward someone pictures active, direct attention - like a person turning to look right at someone they care about, instead of glancing away.
😊 "Countenance" is an old word for someone's face or expression
👁️ Pictures active, direct attention, not a passing glance
🔑 Like someone turning to look right at a person they care about
---
## ☮️ And Give Thee Peace
The Hebrew word behind "peace" here is "shalom," a far bigger idea than just the absence of fighting - it means wholeness, completeness, everything as it ought to be. This closing line asks for total well-being, not merely a truce.
☮️ "Shalom" means wholeness and completeness, not just no conflict
🔑 A bigger idea than simply the absence of fighting
🎯 Asks for total well-being, not merely a truce
---
## 🏷️ They Shall Put My Name Upon The Children Of Israel
Speaking God's own name over the people, in this exact three-part formula, functioned like placing God's name and ownership directly onto them - similar to a mark of belonging. Israel is publicly identified, out loud, as God's own people.
🏷️ Speaking God's name over Israel functioned like a mark of ownership
👥 Publicly identifies Israel, out loud, as belonging to God
🔑 The blessing itself becomes a statement of identity
---
## ✅ And I Will Bless Them
A crucial final clarification: the priests speak the words, but God Himself is the one who actually does the blessing. The priest delivers the message; God alone is its actual source.
✅ The priests speak the words, but God does the actual blessing
📬 The priest is only the messenger, never the source
🔑 Closes the chapter by pointing all the credit back to God
`;

export const NUMBERS_SIX_PERSONAL_SECTIONS = parseNumbersSixRawNotes(NUMBERS_SIX_RAW_NOTES);
