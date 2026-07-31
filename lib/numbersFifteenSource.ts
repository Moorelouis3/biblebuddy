export type NumbersFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersFifteenRawNotes(rawText: string): NumbersFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 15:${startVerse}` : `Numbers 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Numbers 15 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_FIFTEEN_RAW_NOTES = `# Numbers 15:1-5
# 🍇 Offerings For A Land Not Yet Entered
---
## 🗓️ When Ye Be Come Into The Land Of Your Habitations, Which I Give Unto You
This chapter opens right after God just sentenced the entire adult generation to forty years of wandering and death in the wilderness in chapter 14. Yet the very next words out of His mouth assume the land is still coming.
"Which I give unto you" is present tense, not "if." The promise to Abraham doesn't get cancelled by one generation's unbelief - it simply waits for the next generation to receive it.
🗓️ Comes right after the wilderness sentence in chapter 14
✅ "Which I give" is present tense, not a maybe
🔑 One generation's failure doesn't cancel God's promise
---
## 🏠 Habitations
"Habitations" means settled, permanent dwelling places, not tents pitched for a night. The word itself signals a shift from the wandering camp life Israel has always known toward an actual home.
🏠 A permanent dwelling, not a tent moved every few days
🔄 Signals a coming shift from wandering to settled life
🔑 Points toward a future Israel hasn't experienced yet
---
## 🔥 An Offering By Fire...A Burnt Offering, Or A Sacrifice In Performing A Vow, Or In A Freewill Offering, Or In Your Solemn Feasts
Four different reasons for bringing an offering are named here: a burnt offering (general worship), a vow sacrifice (paying a promise made to God), a freewill offering (a voluntary gift with no obligation attached), and offerings tied to the yearly feast calendar.
Naming all four together shows this new instruction applies broadly - to nearly every kind of animal sacrifice Israel will ever bring, not one narrow ritual.
🔥 Four different reasons people bring sacrifices, named together
🤝 A vow offering pays back a promise already made to God
🔑 This rule covers almost every kind of sacrifice, not one type
---
## 🌬️ A Sweet Savour Unto The LORD
This phrase doesn't mean God literally smells and enjoys smoke like a person would. It's the Bible's regular way of describing an offering God accepts and is pleased with - human language stretched to describe a divine reaction.
The exact same phrase appears constantly through Leviticus for accepted sacrifices, so a reader who's followed the story this far has already met it many times before this chapter.
🌬️ Describes God's pleasure, not a literal smell
📖 The same phrase already used throughout Leviticus
🔑 Human language stretched to describe how God responds
---
## 🌾 A Meat Offering Of A Tenth Deal Of Flour Mingled With The Fourth Part Of An Hin Of Oil
"Meat" in this old English simply means food in general, not flesh - this is a grain offering, made of flour and oil, brought alongside the animal, not instead of it.
"A tenth deal" is about two quarts of flour, roughly one-tenth of a larger unit called an ephah. "The fourth part of an hin" of oil is close to one quart. Together they're precise, measured amounts, not a rough handful.
🌾 "Meat offering" means a grain offering, not flesh
📏 A tenth deal is about two quarts of flour
🔑 Exact measured amounts, not a rough guess
---
## 🍷 The Fourth Part Of An Hin Of Wine For A Drink Offering
A drink offering was wine poured out at the altar, not consumed by anyone - a liquid gift given entirely to God, distinct from both the animal and the grain offering.
This smallest offering size, one quarter of a hin (about a quart), is paired specifically with one lamb - the starting point for a scale that grows with bigger animals in the next verses.
🍷 Wine poured out completely, not drunk by anyone
📐 The smallest measure, paired specifically with one lamb
🔑 Sets the starting point for a scale that grows next

# Numbers 15:6-10
# ⚖️ Bigger Animal, Bigger Offering
---
## 🐏 Or For A Ram, Thou Shalt Prepare For A Meat Offering Two Tenth Deals Of Flour Mingled With The Third Part Of An Hin Of Oil
A ram is a larger, more valuable animal than a lamb, and its required grain offering doubles to match - two tenth deals of flour instead of one, with more oil as well.
Nothing here is arbitrary. The size of the grain and oil brought is tied directly to the size and value of the animal being offered.
🐏 A ram is bigger and more valuable than a lamb
📈 Its grain offering doubles to match, two tenth deals
🔑 The amount brought always tracks the animal's value
---
## 🍷 The Third Part Of An Hin Of Wine, For A Sweet Savour Unto The LORD
The wine portion grows too - a third of a hin instead of a quarter. Every part of the offering scales together: flour, oil, and wine all increase as the animal gets bigger.
🍷 The wine portion grows along with the flour and oil
📊 Every part of the offering scales together
🔑 Nothing is left flat while the rest increases
---
## 📐 Why Three Separate Animal Examples Instead Of One Rule
God could have given a single formula and left the math to the people. Instead, Moses gets three worked examples - lamb, ram, and bullock - stated in full each time, so no one has to calculate anything themselves before bringing an offering.
📐 A single formula could have covered all three animals
🧮 Instead, each animal gets its own fully worked example
🔑 Removes any chance of doing the math wrong at the altar
---
## 🥃 Half An Hin, In Real Terms
A hin was a liquid measure equal to about a gallon and a half. A half hin, the bullock's oil and wine portion, comes out to roughly three quarts each - a noticeably larger gift than the lamb's original quart.
🥃 A hin equaled roughly a gallon and a half
🥛 Half a hin comes out to about three quarts
🔑 A noticeably bigger gift than where the chapter started
---
## 🐂 When Thou Preparest A Bullock For A Burnt Offering, Or For A Sacrifice In Performing A Vow, Or Peace Offerings Unto The LORD
A bullock is a young bull, the largest and most costly of the three animals named in this chapter. "Peace offerings" appear here for the first time in the chapter - a category of sacrifice eaten in a shared meal by the offerer, the priests, and sometimes their families, celebrating fellowship with God rather than only atoning for sin.
🐂 A bullock is the largest, most costly animal named here
🍽️ Peace offerings were eaten in a shared meal, not fully burned
🔑 The most valuable animal comes with the most flexible use
---
## 📏 Three Tenth Deals Of Flour Mingled With Half An Hin Of Oil...Half An Hin Of Wine
The bullock's grain offering triples from the lamb's original amount, and both oil and wine reach a full half hin, double the ram's portion. The scale keeps climbing in exact proportion: lamb, then ram, then bullock, each one bigger than the last.
📏 Flour triples from the lamb's starting amount
🔺 Oil and wine both reach a full half hin
🔑 A clear ladder: lamb, then ram, then bullock, each bigger

# Numbers 15:11-16
# 🤝 One Law For Israelite And Foreigner Alike
---
## 🐐 Thus Shall It Be Done For One Bullock, Or For One Ram, Or For A Lamb, Or A Kid
"Kid" means a young goat, added here to complete the full list of animals this rule covers. A goat kid would follow the same scaled pattern as a lamb, since the two were close in size and value.
🐐 "Kid" means a young goat, rounding out the animal list
📋 Follows the same scale as a lamb, being close in size
🔑 Completes the full set of animals this law applies to
---
## 🔢 According To The Number That Ye Shall Prepare, So Shall Ye Do To Every One According To Their Number
This is a multiplication rule, not a flat total. Offering five lambs means five full sets of flour, oil, and wine - the earlier measurements are a per-animal amount, repeated for every single animal brought.
🔢 A multiplication rule, not one flat amount
✖️ Five lambs means five full sets of grain, oil, and wine
🔑 Every measurement given earlier is a per-animal amount
---
## 🌍 All That Are Born Of The Country Shall Do These Things After This Manner
"Born of the country" means native-born Israelites, people who belong to the nation by birth. This phrase sets up a direct contrast with the very next verse.
🌍 Means native-born Israelites, part of the nation by birth
👥 Sets up a deliberate contrast with the next verse
🔑 The starting half of a comparison about to be made
---
## 🧳 If A Stranger Sojourn With You
"Sojourn" means to live somewhere for a while without being a native of that place. A "stranger" here (the Hebrew ger) wasn't a passing tourist - it meant a foreigner who had settled in and lived among Israel long-term, with real standing in the community.
🧳 "Sojourn" means living somewhere long-term without being native there
🏘️ A "stranger" here had settled in, not just passing through
🔑 A real, ongoing member of the community, just not by birth
---
## ⚖️ As Ye Do, So He Shall Do
The foreigner living among Israel follows the exact same worship instructions as everyone else - the same offerings, the same measurements, the same access to God. There's no separate, lesser system for outsiders.
⚖️ Same offerings, same measurements, same access to God
🚫 No separate or lesser system exists for outsiders
🔑 Full inclusion in Israel's worship, not partial
---
## 📜 One Ordinance...As Ye Are, So Shall The Stranger Be Before The LORD
"Ordinance" means a fixed, official rule. Stating that the foreigner stands "before the LORD" exactly as the native Israelite does is a striking claim for the ancient world, where nations usually treated outsiders as lesser by default.
📜 "Ordinance" means a fixed, official rule
🌏 Most ancient nations treated outsiders as automatically lesser
🔑 God's law here refuses that default assumption
---
## 🔁 One Law And One Manner Shall Be For You, And For The Stranger That Sojourneth With You
This same point - equal treatment under the law - just got made in the previous two verses. Saying it again here, plainly, is the text's way of making sure no one can claim to have missed it.
🔁 Repeats a point already made twice just before it
📢 Repetition here signals real importance, not filler
🔑 No room left to claim the point was missed

# Numbers 15:17-21
# 🍞 The First Of The Dough
---
## 🌾 When Ye Come Into The Land Whither I Bring You
Like the opening of this chapter, this new instruction is written for a future Israel that hasn't arrived yet. It only makes sense once the nation is settled, growing crops, and baking their own bread - not while living on daily manna in the wilderness.
🌾 Written for a future, settled Israel, not the current camp
🍞 Only makes sense once they're growing and baking their own grain
🔑 Another law that looks past the wilderness toward the land
---
## 🙌 When Ye Eat Of The Bread Of The Land, Ye Shall Offer Up An Heave Offering Unto The LORD
A "heave offering" gets its name from the action itself - the offering was physically lifted or raised up as a gift, then given over to the priests rather than burned completely on the altar.
🙌 Named for the action - the gift is physically lifted up
👐 Given to the priests, not burned completely like a burnt offering
🔑 A different kind of gift than the offerings earlier in the chapter
---
## 🍰 A Cake Of The First Of Your Dough
"Cake" here means a loaf or portion of bread dough, not a sweet dessert. Before baking the rest of the batch for the household, a portion from the very first dough made was set aside for God - later Jewish tradition calls this practice challah.
🍰 "Cake" means a loaf of bread dough, not a dessert
✋ Set aside from the very first batch, before the rest is baked
🔑 Later known in Jewish tradition as the challah offering
---
## 🥖 A Cake...For An Heave Offering
Unlike the animal offerings earlier in the chapter, this gift costs almost nothing to give up - a single portion of dough out of an entire batch. The size of the gift matters less here than the habit of giving God the first portion, every time bread is made.
🥖 Costs far less than the animal offerings earlier in the chapter
🔁 A small gift, but a repeated, everyday habit
🔑 The habit of giving first matters more than the amount given
---
## 🌾 As Ye Do The Heave Offering Of The Threshingfloor, So Shall Ye Heave It
This points back to an already-familiar practice: offering the first portion of harvested grain at the threshingfloor, where grain was separated from its stalks. The dough offering follows that same established pattern, just applied one step later, after the grain becomes bread.
🌾 Points back to an already-known threshingfloor offering
🔄 Same pattern, just applied one step later in the process
🔑 Consistency - one principle followed at every stage of the harvest
---
## ⏳ Of The First Of Your Dough Ye Shall Give Unto The LORD An Heave Offering In Your Generations
"In your generations" means this law is permanent, meant to be kept by every future generation, not just a one-time instruction for the people currently listening.
Giving God the first portion before using the rest is the same principle behind firstborn animals and firstfruits offerings elsewhere in the Law - putting God first, literally, before anything else gets used.
⏳ "In your generations" means permanent, for every future generation
🥇 Same principle as firstborn animals and firstfruits elsewhere
🔑 Puts God first, literally, before anything else gets used

# Numbers 15:22-26
# 😌 Forgiveness For A Mistake The Whole Camp Made
---
## ❓ If Ye Have Erred, And Not Observed All These Commandments
"Erred" means to accidentally stray off course, not to rebel on purpose. This single word sets up the entire point of the rest of the chapter - the sharp difference between an honest mistake and open defiance.
❓ "Erred" means an accidental mistake, not open rebellion
📖 Sets up the whole point developed for the rest of the chapter
🔑 The dividing line between an honest error and real defiance
---
## ✋ By The Hand Of Moses
This is an idiom meaning "through Moses" or "by way of Moses" - it identifies Moses as the messenger delivering God's law, not the one who invented it.
✋ Means "through Moses," not that Moses made the rule himself
📨 Names Moses as messenger, not the source of the command
🔑 Keeps the credit for the law with God, not the man
---
## 🏘️ If Ought Be Committed By Ignorance Without The Knowledge Of The Congregation
This describes a specific situation: an error made by the whole community together, something everyone missed without realizing it - not one person's private sin, which gets its own separate rule a few verses later.
🏘️ A mistake made by the whole community together
👥 Nobody in the camp realized it was happening
🔑 Different from one person's private sin, covered later
---
## 🐂 One Young Bullock For A Burnt Offering...And One Kid Of The Goats For A Sin Offering
Two separate animals for two separate purposes: the burnt offering expresses full devotion to God, while the sin offering specifically deals with the guilt of this particular mistake. One offering alone wouldn't cover both jobs.
🐂 Two animals, because the offering serves two purposes
🔥 The burnt offering expresses devotion, not guilt
🔑 The sin offering is the one that actually deals with the mistake
---
## 🙏 The Priest Shall Make An Atonement For All The Congregation, And It Shall Be Forgiven Them
"Atonement" means covering or repairing what sin has broken between people and God - the priest performs the ritual that restores the relationship on the whole community's behalf.
🙏 "Atonement" means repairing what sin broke, not ignoring it
🧑‍⚖️ The priest acts on behalf of the entire community
🔑 The ritual actually restores the relationship, not just excuses it
---
## 💧 For It Is Ignorance...Seeing All The People Were In Ignorance
Genuine forgiveness is offered here for a genuine mistake - this isn't a loophole for getting away with anything, but real grace extended because the whole nation truly didn't know they were doing wrong.
💧 Real forgiveness, offered for a real, honest mistake
🚫 Not a loophole - the whole camp genuinely didn't know
🔑 Grace here matches the true nature of the error
---
## 🧳 And The Stranger That Sojourneth Among Them
The same foreigner included in the offering instructions earlier in this chapter is included here too - forgiveness for an honest mistake reaches the whole camp, native-born and foreign-born alike, with no exception drawn.
🧳 The same foreigner named earlier in this chapter
🤝 Forgiveness reaches native-born and foreign-born alike
🔑 No exception drawn between the two groups, even here

# Numbers 15:27-29
# 🐐 Forgiveness For One Person's Mistake
---
## 👤 If Any Soul Sin Through Ignorance
This shifts from the whole community's mistake in the last section to a single individual's mistake - the same accidental-sin category, just scaled down to one person instead of the whole camp.
👤 Shifts from the whole camp to a single individual
🔄 Same accidental category, just one person instead of everyone
🔑 The principle stays the same no matter the group's size
---
## 🐐 He Shall Bring A She Goat Of The First Year For A Sin Offering
A single young female goat is a smaller, simpler offering than the bullock-and-kid pair required for the whole congregation's mistake - matched to the smaller scale of one person's error rather than a nation's.
🐐 A smaller offering than the community's bullock-and-kid pair
📏 Matched to the smaller scale of one person's mistake
🔑 The size of the offering fits the size of the situation
---
## ✅ The Priest Shall Make An Atonement...And It Shall Be Forgiven Him
The same reassurance already given to the whole camp in verse 25 is now stated personally, for one individual - forgiveness for an honest mistake isn't only available at the national level.
✅ The same reassurance from verse 25, now stated personally
🙋 Forgiveness for honest mistakes isn't only a group-level thing
🔑 One person's error gets the same real atonement
---
## 🔁 Ye Shall Have One Law For Him That Sinneth Through Ignorance, Both For Him That Is Born Among The Children Of Israel, And For The Stranger
The equal-treatment principle for native and foreigner gets stated for a third time in this chapter, now specifically applied to individual forgiveness rather than group offerings or worship in general.
🔁 Stated for the third time in this one chapter
🎯 Now applied specifically to individual forgiveness
🔑 A point this important gets repeated, not assumed

# Numbers 15:30-31
# ⚡ The Opposite Of An Honest Mistake
---
## 😤 The Soul That Doeth Ought Presumptuously
"Presumptuously" means on purpose, defiantly, knowing exactly what you're doing. Every case covered so far in this chapter has been about "ignorance" - this verse is the sharp line drawn against that entire category.
😤 "Presumptuously" means deliberate, defiant, fully aware
⚔️ Drawn as the direct opposite of every case just covered
🔑 The dividing line the whole chapter has been building toward
---
## 🗣️ Reproacheth The LORD
"Reproacheth" means to insult or openly defy. A deliberate sin isn't described here as merely breaking a rule - it's treated as a personal insult directed at God Himself.
🗣️ Means to insult or openly defy, not just disobey
🎯 Deliberate sin is framed as a personal insult to God
🔑 The stakes are relational, not just legal
---
## ✂️ That Soul Shall Be Cut Off From Among His People
"Cut off" is a serious, recurring penalty in the Law that could mean death, exile, or being removed from the covenant community and its blessings, depending on the case - always a complete severing, never a small correction.
✂️ Could mean death, exile, or removal from the community
📖 A recurring penalty phrase used throughout the Law
🔑 Always a complete severing, never a minor slap on the wrist
---
## 💔 Because He Hath Despised The Word Of The LORD
"Despised" is the exact word already used one chapter earlier for the ten spies who despised the promised land in 14:31. This law isn't abstract - it's naming the very sin the nation just committed and was judged for.
💔 The same word already used for the spies in 14:31
🔗 Directly links this general law to the story just told
🔑 The previous chapter's whole story was presumptuous sin
---
## ⚖️ His Iniquity Shall Be Upon Him
"Iniquity" means guilt that stays attached to a person rather than being lifted away. Unlike every honest mistake just covered, which ends in "it shall be forgiven," no such release is offered here.
⚖️ "Iniquity" means guilt that stays, not guilt that lifts
🚫 No "it shall be forgiven" line appears for this case
🔑 The contrast with the whole rest of the chapter is deliberate

# Numbers 15:32-36
# 🪵 A Real Case: The Man Who Gathered Sticks
---
## 🪵 They Found A Man That Gathered Sticks Upon The Sabbath Day
Sabbath rest was already commanded back in Exodus 20 and named as a capital matter in Exodus 31:14-15. Gathering sticks, likely to build a fire, counted as ordinary work - exactly the kind of activity the Sabbath law forbade.
🪵 Sabbath rest was already commanded in Exodus 20 and 31
🔥 Gathering sticks for a fire counted as ordinary work
🔑 A plain, unmistakable violation, not a gray area
---
## 📖 Right After The Law Just Given
This real case appears immediately after the presumptuous-sin law in verses 30-31, and the placement isn't an accident - the text moves straight from the abstract rule to a concrete example of exactly what it looks like in practice.
📖 Placed right after the abstract presumptuous-sin law
🎯 Moves from rule to a real, concrete example immediately
🔑 Shows readers exactly what "presumptuous" looks like in real life
---
## 🔒 They Put Him In Ward
"Ward" means a holding place or temporary custody, closer to a modern holding cell than a long-term prison. He wasn't being punished yet - he was being held while Moses sought a ruling.
🔒 An old word for a holding place, like custody
⏸️ Not yet a punishment, just a hold while awaiting a ruling
🔑 Israel didn't yet have a set procedure for this exact case
---
## ❓ It Was Not Declared What Should Be Done To Him
Sabbath-breaking already carried the death penalty in principle from Exodus 31, but the specific method of carrying it out hadn't been spelled out yet. This case became the moment that missing detail got settled.
❓ The general penalty existed, but the method didn't yet
📋 This case is what settles the missing procedural detail
🔑 A real event that ends up shaping the legal system going forward
---
## 🪨 The LORD Said Unto Moses, The Man Shall Be Surely Put To Death: All The Congregation Shall Stone Him With Stones Without The Camp
God Himself issues the ruling directly, rather than leaving it to human judges. Stoning involved the whole community rather than a single executioner, spreading the responsibility for carrying out the sentence across the entire camp.
🪨 God gives the ruling directly, not a human judge
👥 The whole community carries out the stoning together
🔑 Responsibility for the sentence is shared, not placed on one person
---
## 🚧 Without The Camp
Executions happened outside the camp to keep death away from the sacred, set-apart space where Israel lived and worshiped - the same kind of boundary already seen with other matters of ritual purity earlier in the Law.
🚧 Keeps death outside the sacred, set-apart camp space
📏 Matches the same purity boundaries used elsewhere in the Law
🔑 Physical distance reflects a spiritual distinction

# Numbers 15:37-41
# 🧵 Tassels To Remember
---
## 🧵 Bid Them That They Make Them Fringes In The Borders Of Their Garments
"Fringes" here refers to tassels attached to the corners of outer garments, later called tzitzit in Jewish tradition - a physical, wearable reminder built directly into everyday clothing.
🧵 Tassels attached to the corners of outer clothing
👕 Later known in Jewish tradition as tzitzit
🔑 A reminder built into clothing worn every single day
---
## 🔵 A Ribband Of Blue
This specific blue dye, later called tekhelet, came from a rare sea mollusk and was extremely expensive to produce. The same blue shows up elsewhere in the tabernacle curtains and the priests' garments, linking ordinary Israelites' clothing to something sacred.
🔵 A rare, costly dye made from a sea mollusk
🏛️ The same blue used in the tabernacle and priestly garments
🔑 Links everyday clothing to something set apart as sacred
---
## 🔗 Right After The Sabbath-Breaker's Story
The timing here is deliberate. One story just showed a man forgetting God's law with fatal consequences, and it's immediately followed by a command designed to help everyone remember God's law every single day just by looking at their own clothes.
🔗 Follows right after a story about forgetting God's law
👀 A daily, visible reminder placed right after that failure
🔑 The text pairs a warning with a built-in solution
---
## 👁️ That Ye May Look Upon It, And Remember All The Commandments Of The LORD, And Do Them
The purpose is stated plainly: a visual cue meant to interrupt daily life and prompt memory, not a magic object with power of its own. Seeing the tassel was meant to lead straight to actually obeying, not just remembering.
👁️ A visual reminder, not an object with magic power
🧠 Meant to interrupt daily routine and prompt memory
🔑 The goal is obedience, not just remembering for its own sake
---
## 💭 That Ye Seek Not After Your Own Heart And Your Own Eyes
This idiom describes chasing personal desire and whatever looks appealing in the moment, instead of following God's instruction. It names the exact opposite impulse the tassels are meant to interrupt.
💭 Means chasing personal desire over God's instruction
⚔️ The exact opposite of what the tassels are meant to prevent
🔑 Names the pull the daily reminder is designed to counter
---
## 💍 After Which Ye Use To Go A Whoring
This is a recurring biblical idiom for spiritual unfaithfulness to God, comparing idol worship to marital infidelity - the same language used elsewhere for the golden calf and later Baal worship, not a claim about literal sexual sin here.
💍 An idiom for spiritual unfaithfulness, not literal sexual sin
🐄 The same language used elsewhere for the golden calf
🔑 Compares chasing other gods to breaking a marriage vow
---
## ✨ Be Holy Unto Your God
"Holy" means set apart, distinct, belonging specifically to God rather than blending in with everyone else. The tassels' real purpose isn't fashion - it's a visible sign of who Israel belongs to.
✨ "Holy" means set apart, belonging specifically to God
👔 Not a fashion choice - a visible sign of belonging
🔑 Everyday clothing turned into a daily statement of identity
---
## 🇪🇬 I Am The LORD Your God, Which Brought You Out Of The Land Of Egypt, To Be Your God: I Am The LORD Your God
This closing line is stated twice in a single verse for emphasis, grounding the whole command - and much of the Law given so far - in what God already did at the Exodus, not in obedience for its own sake.
🇪🇬 Repeated twice in one verse for emphasis
📜 Grounds the command in what God already did, the rescue itself
🔑 Obedience is framed as response to rescue, not a bare rule
`;

export const NUMBERS_FIFTEEN_PERSONAL_SECTIONS = parseNumbersFifteenRawNotes(NUMBERS_FIFTEEN_RAW_NOTES);
