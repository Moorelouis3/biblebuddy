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

God had just sentenced the whole adult generation to forty years of wandering in chapter fourteen.

The very next words assume the land is still coming.

"Which I give" is present tense, not a future maybe.

One generation's failure did not cancel the promise for the next one.

📆 Comes right after chapter fourteen's sentence

✅ Stated as present tense, not future

🔑 One generation's failure could not cancel it

📖 God already plans past the wilderness

## 🏠 Habitations

"Habitations" means permanent, settled homes, not tents moved every few nights.

The word marks a real shift for Israel.

Up to this point Israel has only known camp life.

This law describes a future the people have not lived yet.

🏠 Habitations means a permanent home

⛺ Different from the tents Israel knows

🔮 Describes a future not yet lived

📖 God plans ahead of the wilderness camp

## 🔥 A Burnt Offering, Or A Sacrifice In Performing A Vow, Or In A Freewill Offering, Or In Your Solemn Feasts

Four separate reasons for bringing a sacrifice get named together in one verse.

A burnt offering meant general worship.

A vow offering paid back a promise already spoken to God.

A freewill offering was a voluntary gift with no debt attached.

A feast offering followed the yearly calendar of set feasts.

Naming all four together means this rule covers almost every offering Israel will ever bring.

🔥 Burnt offerings meant general worship

🤝 Vow offerings repaid a spoken promise

🎁 Freewill offerings carried no obligation

📖 One rule covers nearly every offering

## 🌬️ A Sweet Savour Unto The LORD

This phrase does not mean God literally smells and enjoys smoke the way a person would.

It is the Bible's regular way of describing an offering God accepts.

The same phrase already appears many times through Leviticus for accepted sacrifices.

Human language gets stretched here to describe how God responds.

👃 Not a literal smell God enjoys

🔁 Already used often through Leviticus

🗣️ Human language stretched to explain God

📖 Marks an offering God accepts

## 🌾 A Tenth Deal Of Flour Mingled With The Fourth Part Of An Hin Of Oil

"Meat" in this old English simply means food in general, not flesh.

This is a grain offering, made of flour and oil, brought alongside the animal.

A tenth deal was close to two quarts of flour.

The fourth part of a hin of oil was close to one quart.

These were exact measured amounts, not a rough guess.

🌾 "Meat offering" means grain, not flesh

📏 A tenth deal was close to two quarts

🫒 The oil measure was close to one quart

📖 Exact amounts, never a rough guess

## 🍷 The Fourth Part Of An Hin Of Wine For A Drink Offering

A drink offering was wine poured out at the altar.

No one drank it themselves.

This was the smallest measure in the chapter, paired with a single lamb.

It set the starting point for a scale that grows larger in the next verses.

🍷 Wine poured out, not consumed by anyone

🐑 Paired with the smallest animal, one lamb

📈 Sets the starting point for a scale

📖 The scale grows larger from here

# Numbers 15:6-10
# ⚖️ Bigger Animal, Bigger Offering
---
## 🐏 Two Tenth Deals Of Flour Mingled With The Third Part Of An Hin Of Oil

A ram was larger and more valuable than a lamb.

Its grain offering doubled to match, two tenth deals of flour instead of one.

More oil came with it as well.

Nothing here was random.

The size of the grain and oil brought was tied to the size of the animal.

🐏 A ram outranked a lamb in value

📈 Its grain offering doubled to match

🫒 More oil accompanied the larger animal

📖 The gift always tracked the animal's worth

## 🍷 The Third Part Of An Hin Of Wine, For A Sweet Savour Unto The LORD

The wine portion grew too, a third of a hin instead of a quarter.

Flour, oil, and wine all increased together as the animal got bigger.

Nothing in the offering stayed flat while the rest climbed.

Every part matched the value of the gift being brought.

🍷 Wine grew alongside the flour and oil

📊 Every part of the gift scaled together

🚫 Nothing stayed flat while the rest grew

📖 The whole offering matched its value

## 🐂 When Thou Preparest A Bullock For A Burnt Offering, Or For A Sacrifice In Performing A Vow, Or Peace Offerings Unto The LORD

A bullock was a young bull, the largest and priciest animal named in this chapter.

"Peace offerings" appear here for the first time.

They were eaten in a shared meal by the offerer, the priests, and their families.

This kind of sacrifice celebrated fellowship with God rather than only covering sin.

🐂 A bullock was the largest animal named

🆕 Peace offerings appear here for the first time

🍽️ Eaten in a shared meal, not fully burned

📖 The biggest gift had the most flexible use

## 📏 Three Tenth Deals Of Flour Mingled With Half An Hin Of Oil

The bullock's grain offering tripled from the lamb's starting amount.

Its oil reached a full half hin, double the ram's portion.

The scale kept climbing in exact proportion across all three animals.

Lamb, then ram, then bullock, each gift larger than the last.

📏 Flour tripled from the lamb's amount

🔺 Oil reached a full half hin

🪜 A clear ladder, lamb, ram, bullock

📖 Each animal brought a bigger gift

## 🥃 Half An Hin Of Wine, For An Offering Made By Fire

The wine portion also reached a full half hin for the bullock.

"Offering made by fire" is a general term covering any sacrifice burned on the altar.

Wine itself was never burned.

It was poured out beside the burning sacrifice as its own separate gift.

🍷 Wine reached a full half hin too

🔥 "Offering by fire" names any burnt sacrifice

🚫 Wine itself was never actually burned

📖 It was poured out as a separate gift

# Numbers 15:11-16
# 🤝 One Law For Israelite And Foreigner Alike
---
## 🐐 Thus Shall It Be Done For One Bullock, Or For One Ram, Or For A Lamb, Or A Kid

"Kid" means a young goat, added here to round out the list of animals.

A goat kid followed the same scale as a lamb.

The two animals were close in size and value.

This verse completes the full set of animals the law covers.

🐐 "Kid" means a young goat

📋 Follows the same scale as a lamb

⚖️ Close to a lamb in size and value

📖 Completes the full list of animals covered

## 🔢 According To The Number That Ye Shall Prepare, So Shall Ye Do To Every One According To Their Number

This is a multiplication rule, not one flat total.

Offering five lambs meant five full sets of flour, oil, and wine.

Each measurement given earlier applied per animal, not per group.

Every single animal repeated the whole formula on its own.

🔢 A multiplication rule, not a flat sum

✖️ Five lambs meant five full sets

📐 Every measurement applied per animal

📖 Each animal repeated the full formula

## 🌍 All That Are Born Of The Country Shall Do These Things After This Manner

"Born of the country" means native born Israelites, people who belonged to the nation by birth.

This phrase sets up a comparison the next verse is about to make.

Only half of that comparison stands here for now.

The other half arrives immediately after.

🌍 Means native born Israelites by birth

👥 Sets up a comparison with the next verse

🧩 Only half of the comparison so far

📖 The other half arrives immediately after

## 🧳 If A Stranger Sojourn With You

"Sojourn" means to live somewhere for a while without being native to that place.

A "stranger" here, the Hebrew word ger, was not a passing tourist.

It meant a foreigner who had settled in and lived among Israel long term.

This person held real standing in the community.

🧳 Sojourn means living somewhere without being native

🗣️ The Hebrew word is ger, not a tourist

🏘️ Settled in and living among Israel long term

📖 A real member, just not by birth

## ⚖️ As Ye Are, So Shall The Stranger Be Before The LORD

The foreigner living among Israel followed the exact same worship rules as everyone else.

Same offerings, same measurements, same access to God.

"Ordinance" means a fixed, official rule that could not bend by case.

Ancient nations usually treated outsiders as lesser by default.

This law refused that default.

⚖️ Same offerings, same measure, same access

📜 "Ordinance" means a fixed, official rule

🌏 Most ancient nations treated outsiders as lesser

📖 This law refused that default assumption

## 🔁 One Law And One Manner Shall Be For You, And For The Stranger That Sojourneth With You

This same point, equal treatment under the law, was just made in the verse before it.

Saying it again here made sure no one could claim to have missed it.

Repetition in this chapter signals real weight, not filler.

Two verses in a row land the same conviction from two angles.

🔁 Repeats a point just made one verse earlier

📢 Repetition here signals real weight

🚫 No room left to claim it was missed

📖 Two verses land one shared conviction

# Numbers 15:17-21
# 🍞 The First Of The Dough
---
## 🌾 When Ye Come Into The Land Whither I Bring You

Like the opening of this chapter, this instruction was written for a future Israel that had not arrived yet.

It only made sense once the nation was settled and growing its own grain.

Manna, not homegrown bread, was still the daily food in the wilderness.

Another law here looks past the wilderness toward the land ahead.

🌾 Written for a future, settled Israel

🍞 Made sense once they grew their own grain

🥣 Manna was still the daily food for now

📖 Another law looks past the wilderness

## 🙌 When Ye Eat Of The Bread Of The Land, Ye Shall Offer Up An Heave Offering Unto The LORD

A "heave offering" got its name from the action itself.

The gift was physically lifted up, then handed over to the priests.

It was not burned completely on the altar like other offerings.

This was a different kind of gift than the ones earlier in the chapter.

🙌 Named for being physically lifted up

👐 Given to the priests, not burned

🔥 Different from the burnt offerings earlier

📖 A new kind of gift enters here

## 🍰 A Cake Of The First Of Your Dough

"Cake" here means a loaf or portion of bread dough, not a sweet dessert.

A piece from the very first batch was set aside for God before baking the rest.

Later Jewish tradition calls this practice challah.

The size of the gift mattered less than the habit of giving God the first portion.

🍞 "Cake" means bread dough, not dessert

✋ Set aside from the very first batch

🕎 Later called the challah offering

📖 Giving first mattered more than the amount

## 🌾 As Ye Do The Heave Offering Of The Threshingfloor, So Shall Ye Heave It

This points back to an already familiar practice, the threshingfloor offering.

Grain was separated from its stalks there before anyone ate it.

The dough offering followed that same established pattern.

It simply applied one step later, after the grain became bread.

🌾 Points back to the threshingfloor offering

🌬️ Grain was separated from its stalks there

🔄 Same pattern, applied one step later

📖 One principle followed at every stage

## ⏳ Of The First Of Your Dough Ye Shall Give Unto The LORD An Heave Offering In Your Generations

"In your generations" meant this law was permanent.

Every future generation was expected to keep it, not only the people currently listening.

Giving God the first portion echoed the same principle behind firstborn animals and firstfruits offerings.

It put God first, literally, before anything else got used.

⏳ "In your generations" means permanent

🥇 Same principle as firstborn animals and firstfruits

🙏 Puts God first, literally, before anything else

📖 A daily habit built from an old promise

# Numbers 15:22-26
# 😌 Forgiveness For A Mistake The Whole Camp Made
---
## ❓ If Ye Have Erred, And Not Observed All These Commandments

"Erred" meant to accidentally stray off course, not to rebel on purpose.

This single word sets up the entire point of the rest of the chapter.

An honest mistake and open defiance sit far apart from each other.

The chapter is about to draw that line sharply.

❓ "Erred" means an accidental mistake

⚔️ Not open rebellion on purpose

🧭 Sets up the chapter's whole direction

📖 A sharp line between mistake and defiance

## ✋ By The Hand Of Moses

This is an old idiom meaning "through Moses" or "by way of Moses."

It names Moses as the messenger delivering God's law.

It does not call him the one who invented the law.

The credit for the command stays with God, not the man.

✋ Means "through Moses," not his own idea

📨 Names Moses as the messenger

🚫 Not the source of the command

📖 Credit for the law stays with God

## 🏘️ If Ought Be Committed By Ignorance Without The Knowledge Of The Congregation

This describes one specific situation, an error the whole community made together.

Nobody in the camp realized it was happening at the time.

This differs from one person's private sin, which gets its own rule a few verses later.

The size of the mistake here was the whole nation, not one person.

🏘️ A mistake made by the whole camp

👥 Nobody realized it while it happened

🔀 Different from one person's private sin

📖 The size here was the whole nation

## 🐂 One Young Bullock For A Burnt Offering

A burnt offering expressed full devotion to God.

It was one of two animals required for this particular mistake.

The other animal, a sin offering, dealt with the actual guilt.

One offering alone could not cover both jobs at once.

🐂 A young bullock for the burnt offering

🔥 Burnt offerings expressed devotion, not guilt

🎯 Paired with a second animal for guilt

📖 Two animals because two jobs were needed

## 🐐 One Kid Of The Goats For A Sin Offering

A kid of the goats served as the sin offering in this same verse.

The sin offering was the one that actually dealt with the guilt of the mistake.

The burnt offering next to it expressed devotion, not guilt.

Together the two animals covered what one animal could not.

🐐 A goat kid for the sin offering

⚖️ This animal covered the actual guilt

🔗 Paired with the burnt offering nearby

📖 Two animals, two different jobs

## 🙏 The Priest Shall Make An Atonement For All The Congregation, And It Shall Be Forgiven Them

"Atonement" means covering or repairing what sin broke between people and God.

The priest performed the ritual on behalf of the whole community.

The relationship was actually restored, not just excused.

Forgiveness followed once that repair was made.

🙏 "Atonement" means repairing what sin broke

🧑‍⚖️ The priest acted for the whole community

🔧 The relationship was restored, not excused

📖 Forgiveness followed the actual repair

## 🧳 And The Stranger That Sojourneth Among Them

The same foreigner named earlier in this chapter gets named again here.

Forgiveness for an honest mistake reached the whole camp, native born and foreign born alike.

No exception was drawn between the two groups.

The whole nation genuinely did not know it was doing wrong.

🧳 The same foreigner named earlier returns

🤝 Forgiveness reached native born and foreign born alike

🚫 No exception was drawn between the groups

📖 Grace matched the true, shared mistake

# Numbers 15:27-29
# 🐐 Forgiveness For One Person's Mistake
---
## 👤 If Any Soul Sin Through Ignorance

This shifts from the whole community's mistake in the last section to a single person's mistake.

The category stays the same, an accidental sin, not a defiant one.

Only the scale changes, one person instead of the whole camp.

The same principle held steady no matter the size of the group.

👤 Shifts from the whole camp to one person

🔄 Same accidental category as before

📏 Only the scale changes here

📖 One principle, no matter the group's size

## 🐐 He Shall Bring A She Goat Of The First Year For A Sin Offering

A single young female goat was a smaller offering than the bullock and kid pair required for the whole camp.

The smaller size matched the smaller scale of one person's error.

A nation's mistake and one person's mistake did not call for the same weight of offering.

The size of the gift always fit the size of the situation.

🐐 A single female goat, not a pair

📏 Matched the smaller scale of one person

⚖️ A nation's mistake carried more weight

📖 The gift always fit the situation

## ✅ And It Shall Be Forgiven Him

The same reassurance already given to the whole camp gets stated again here, now for one person.

Forgiveness for an honest mistake was never only a group level matter.

One person's error received the same real atonement as the nation's did.

The priest still stood between the guilty person and God.

✅ The same reassurance, now stated personally

🙋 Forgiveness was never only a group matter

🔁 One person's error got the same atonement

📖 The priest still stood in the gap

## 🔁 Ye Shall Have One Law For Him That Sinneth Through Ignorance

The equal treatment principle for native and foreigner gets stated for a third time in this chapter.

It now applies specifically to individual forgiveness, not group offerings or worship in general.

A point this important was repeated on purpose, not assumed.

Three times in one chapter left no room for missing it.

🔁 Stated for the third time in this chapter

🎯 Now applied to individual forgiveness

📢 Repeated on purpose, not assumed

📖 Three times left no room for missing it

# Numbers 15:30-31
# ⚡ The Opposite Of An Honest Mistake
---
## 😤 The Soul That Doeth Ought Presumptuously

"Presumptuously" meant on purpose, defiantly, knowing exactly what one was doing.

Every case covered so far in this chapter dealt with ignorance.

This verse draws the sharp line against that entire category.

It marks the exact opposite of every mistake just described.

😤 "Presumptuously" means deliberate and fully aware

🧭 Opposite of every case covered so far

⚔️ Draws a sharp line here

📖 The line the whole chapter built toward

## 🗣️ The Same Reproacheth The LORD

"Reproacheth" meant to insult or openly defy someone.

A deliberate sin was not treated here as merely breaking a rule.

It was treated as a personal insult directed at God Himself.

The stakes were relational, not only legal.

🗣️ "Reproacheth" means to insult openly

🎯 Deliberate sin insults God personally

⚖️ Not just breaking a rule

📖 The stakes here were relational

## ✂️ That Soul Shall Be Cut Off From Among His People

"Cut off" was a serious, recurring penalty through the Law.

It could mean death, exile, or removal from the covenant community depending on the case.

It was always a complete severing.

It was never a small correction.

✂️ Could mean death, exile, or removal

🔁 A recurring phrase used through the Law

🚫 Always a complete severing

📖 Never a small, minor correction

## 💔 Because He Hath Despised The Word Of The LORD

"Despised" was the exact word already used one chapter earlier for the ten spies.

They despised the promised land in chapter fourteen.

This law was not abstract.

It named the very sin the nation had just committed and been judged for.

💔 The same word used for the spies

🔗 Links straight back to chapter fourteen

🎯 Not an abstract law at all

📖 Names the sin the nation just committed

## ⚖️ His Iniquity Shall Be Upon Him

"Iniquity" meant guilt that stayed attached to a person rather than lifting away.

Every honest mistake earlier in the chapter ended with the words "it shall be forgiven."

No such release appears for this case.

The contrast with the rest of the chapter was deliberate.

⚖️ "Iniquity" means guilt that stays

🚫 No "it shall be forgiven" line here

🔀 A deliberate contrast with the chapter

📖 This guilt did not lift away

# Numbers 15:32-36
# 🪵 A Real Case, The Man Who Gathered Sticks
---
## 🪵 They Found A Man That Gathered Sticks Upon The Sabbath Day

Sabbath rest had already been commanded back in Exodus twenty.

It was named as a capital matter in Exodus thirty one.

Gathering sticks, likely to build a fire, counted as ordinary work.

This was exactly the kind of activity the Sabbath law forbade.

🪵 Sabbath rest was already commanded in Exodus

🔥 Sticks were likely gathered for a fire

⚙️ Counted as ordinary, forbidden work

📖 A plain violation, not a gray area

## 🔒 They Put Him In Ward

"Ward" meant a holding place or temporary custody.

It was closer to a modern holding cell than a long term prison.

He was not being punished yet.

He was being held while Moses sought a ruling from God.

🔒 "Ward" means a holding place

⏸️ Not yet a punishment

🙏 Held while Moses sought a ruling

📖 Israel had no set rule for this yet

## ❓ It Was Not Declared What Should Be Done To Him

Sabbath breaking already carried the death penalty in principle from Exodus thirty one.

The exact method of carrying it out had not been spelled out yet.

This case became the moment that missing detail got settled.

A real event ended up shaping the legal system going forward.

❓ The penalty existed, the method did not

📋 This case settled the missing detail

⚖️ Shaped the legal system going forward

📖 A real event, not a hypothetical

## 🪨 The Man Shall Surely Be Put To Death

God Himself issued this ruling directly.

It did not come from a human judge working it out alone.

The direct answer left no doubt about how serious this offense was.

God settled the open question Himself.

🪨 God gave the ruling directly

🚫 Not left to a human judge

⚖️ No doubt about how serious this was

📖 God Himself settled the open question

## 🚧 Stone Him With Stones Without The Camp

Stoning involved the whole community rather than a single executioner.

Responsibility for the sentence spread across the entire camp.

Executions happened outside the camp to keep death away from the sacred space where Israel lived.

The same kind of boundary shows up elsewhere in matters of ritual purity.

👥 The whole community carried out the stoning

🤝 Responsibility spread across the whole camp

🚧 Kept death outside the sacred camp space

📖 Physical distance reflected a spiritual line

## 📜 As The LORD Commanded Moses

The chapter closes this account by naming exactly whose command was followed.

The people did not act on their own judgment.

They carried out what God had already ruled in the verse before.

Obedience here followed a clear word from God, not a guess.

📜 Names exactly whose command was followed

🚫 Not the people's own judgment

🔗 Carried out God's ruling from before

📖 Obedience followed a clear word, not a guess

# Numbers 15:37-41
# 🧵 Tassels To Remember
---
## 🧵 Bid Them That They Make Them Fringes In The Borders Of Their Garments

"Fringes" referred to tassels attached to the corners of outer garments.

Jewish tradition later called them tzitzit.

This was a physical reminder built directly into everyday clothing.

It stayed in front of the wearer's eyes every single day.

🧵 Tassels attached to the corners of clothing

📿 Later known as tzitzit

👕 Built into clothing worn every day

📖 A reminder the wearer could not avoid

## 🔵 A Ribband Of Blue

This particular blue dye was later called tekhelet.

It came from a rare sea mollusk and cost a great deal to produce.

The same blue appeared in the tabernacle curtains and the priests' garments.

It linked an ordinary Israelite's clothing to something set apart as sacred.

🔵 A rare dye from a sea mollusk

💰 Costly to produce for anyone

🏛️ The same blue used in the tabernacle

📖 Linked everyday clothing to something sacred

## 👁️ That Ye May Look Upon It, And Remember All The Commandments Of The LORD, And Do Them

The purpose here was stated plainly, a visual cue meant to interrupt daily life.

It was not a magic object with power of its own.

Seeing the tassel was meant to lead straight to actually obeying.

Remembering alone was never the whole goal.

👁️ A visual reminder, not a magic object

🧠 Meant to interrupt daily routine

✅ Meant to lead to real obedience

📖 Remembering alone was never the goal

## 💭 That Ye Seek Not After Your Own Heart And Your Own Eyes

This idiom described chasing personal desire and whatever looked appealing in the moment.

It named the exact pull the tassels were meant to interrupt.

Following one's own heart and eyes meant ignoring God's instruction instead.

The tassel was designed to counter that very impulse.

💭 Chasing personal desire over instruction

⚔️ The opposite of what the tassel taught

👀 Heart and eyes named as the pull

📖 The tassel was built to counter it

## 💍 After Which Ye Use To Go A Whoring

This is a recurring biblical idiom for unfaithfulness to God.

It compares chasing after other gods to breaking a marriage vow.

The same language describes the golden calf and later Baal worship.

This was not a claim about literal sexual sin here.

💍 An idiom for unfaithfulness to God

🐄 Same language used for the golden calf

🚫 Not a claim about literal sin

📖 Compares idolatry to a broken vow

## ✨ Be Holy Unto Your God

"Holy" meant set apart, distinct, belonging specifically to God.

The tassels were never about fashion.

They served as a visible sign of who Israel belonged to.

Everyday clothing turned into a daily statement of identity.

✨ "Holy" means set apart for God

👔 Never a fashion choice

🏷️ A visible sign of belonging

📖 Clothing became a daily statement

## 🇪🇬 I Am The LORD Your God, Which Brought You Out Of The Land Of Egypt

This closing line is stated twice within a single verse.

The repetition placed weight on what God had already done at the Exodus.

The whole command, and much of the Law given so far, rested on that rescue.

Obedience here answered a rescue already given, not a rule owed in advance.

🇪🇬 Repeated twice in one verse

📜 Grounds the command in the Exodus rescue

🙌 The Law rests on what God already did

📖 Obedience answers rescue, not an owed debt
`.trim();

export const NUMBERS_FIFTEEN_PERSONAL_SECTIONS = parseNumbersFifteenRawNotes(NUMBERS_FIFTEEN_RAW_NOTES);
