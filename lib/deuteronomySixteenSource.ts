export type DeuteronomySixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomySixteenRawNotes(rawText: string): DeuteronomySixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomySixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 16:${startVerse}` : `Deuteronomy 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 16 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_SIXTEEN_RAW_NOTES = `# Deuteronomy 16:1-8
# 🐑 Passover Reinstructed
---
## 🌱 Observe The Month Of Abib

"Abib" means "green ears," the early stage of ripening barley.

This was the first month of Israel's religious calendar.

Later Jewish tradition renamed this month Nisan.

The whole year of feasts started here, tied to the barley harvest.

🌱 Abib means green ears of barley
📅 It marked the first month of the year
🔁 Later renamed Nisan
📖 The feast calendar began with the harvest

## 🌙 Brought Thee Forth Out Of Egypt By Night

Israel left Egypt at night, not during the day.

Exodus twelve describes the tenth plague striking at midnight.

Pharaoh released the people in those same dark hours.

Passover always remembers a rescue that happened after dark.

🌙 The exodus itself happened at night
💀 The tenth plague struck at midnight
🏃 Release came in those same dark hours
📖 Passover remembers a rescue after dark

## 🐑 Of The Flock And The Herd

Exodus twelve required a lamb or young goat from the flock alone.

Here the sacrifice also includes animals from the herd, meaning cattle.

Many scholars believe this addition covers extra offerings eaten across the full seven days.

The centerpiece Passover lamb itself still came from the flock.

🐑 Exodus twelve named the flock alone
🐂 Herd adds cattle to the picture
🍽️ Extra animals fed the full seven days
📖 The Passover lamb itself stayed from the flock

## 🏛️ The Place Which The LORD Shall Choose To Place His Name There

Exodus twelve had every household kill the lamb at their own door.

Deuteronomy changes that into one single chosen location.

That location later became Jerusalem, once the temple was built.

Centralizing worship kept Israel from copying the local shrines of Canaan.

🏠 Exodus twelve used every household's own door
🏛️ Deuteronomy points to one chosen place
🕍 That place later became Jerusalem
📖 One place guarded against copying Canaan's shrines

## 🍞 Even The Bread Of Affliction

"Affliction" means suffering or hardship.

Unleavened bread had no time to rise before Israel had to leave Egypt.

Eating this plain bread every year keeps the memory of slavery physically present.

The taste itself becomes part of the teaching.

🍞 Affliction means suffering or hardship
⏳ No time existed for bread to rise
🔁 The bread relives that rushed night yearly
📖 Even taste can carry a memory

## 🏃 Thou Camest Forth Out Of The Land Of Egypt In Haste

"Haste" means moving quickly, without time to prepare properly.

Exodus twelve already recorded Israel leaving with dough not yet leavened.

This verse repeats that detail so the reason for unleavened bread stays clear.

Nothing about that night allowed for slow, careful planning.

🏃 Haste means moving with no time to prepare
🍞 Unleavened dough came from that rushed night
🔁 The reason for the bread stays clear
📖 That night allowed no slow planning

## 📆 All The Days Of Thy Life

This feast was never meant to fade after one generation.

Every future Israelite, not just those who left Egypt, would keep it.

Repeating the exodus story yearly kept the whole nation from forgetting where they came from.

Memory here was built into the calendar itself.

📆 The command reaches every future generation
🔁 Not only those who left Egypt
🧠 Yearly repetition prevented forgetting
📖 Memory was built into the calendar

## 🚫 No Leavened Bread Seen With Thee In All Thy Coast

"Coast" here means territory or borders, not a seashore.

The command reached the whole land, not just the household eating the meal.

Every Israelite kept this rule at home, even those who did not travel to the feast.

The whole nation observed the same restriction at the same time.

🗺️ Coast means territory or borders here
🏠 The rule reached beyond just one household
🇮🇱 It covered the whole land at once
📖 One nation, one shared restriction

## 🌙 Remain All Night Until The Morning

Meat from the Passover sacrifice could not be saved for the next day.

Exodus twelve gave this same instruction, with leftovers to be burned.

Eating it fresh, the same night, kept the meal from becoming ordinary leftovers.

The whole animal belonged to that one night's meal.

🍖 Leftover meat was never allowed
🔥 Exodus twelve required burning any remainder
🌙 The meal stayed tied to one single night
📖 Nothing carried the meal past its purpose

## 🚪 Not Sacrifice The Passover Within Any Of Thy Gates

"Gates" means a person's own town.

Exodus twelve had families kill the lamb at their own doorposts.

That original at home Passover is now specifically forbidden.

Worship was being pulled away from scattered homes toward one shared place.

🚪 Gates means a person's own town
🏠 Exodus twelve used each family's own doorpost
🚫 That home based Passover is now banned
📖 Worship moved from scattered homes to one place

## 🌇 At The Going Down Of The Sun

"Even" is an old word for evening.

The sacrifice had to happen at a specific time, sunset, not whenever convenient.

This exact hour matched the timing of Israel's original rescue from Egypt.

The festival kept following the clock of that first Passover night.

🌇 Even is an old word for evening
⏰ Sunset was the required exact hour
🔁 It matched the original rescue's timing
📖 The festival followed that first night's clock

## 🔥 Thou Shalt Roast And Eat It

Exodus twelve already commanded roasting the lamb, never boiling it in water.

Roasting over fire kept the meat whole rather than falling apart.

Some scholars connect this method to a meal meant to be eaten quickly, ready to travel.

The method itself still mattered generations later.

🔥 Roasting was required, not boiling
🍖 Fire kept the meat whole
🏃 It suited a meal meant to be quick
📖 A method that outlasted the first Passover night

## 🏕️ Go Unto Thy Tents

By the time of Deuteronomy, Israel mostly lived in permanent houses, not tents.

"Tents" here works as an old expression for simply going home.

The phrase kept the language of the wilderness years alive in everyday speech.

Old words can outlive the things they first described.

🏕️ Tents is an old way of saying home
🏠 Most Israelites now lived in houses
🗣️ Wilderness language stayed alive in speech
📖 Words can outlast what they described

## 🍞 Six Days Thou Shalt Eat Unleavened Bread

The seven day festival actually splits into two halves here.

Six ordinary days of unleavened bread come first.

The seventh day stands apart with its own special gathering.

The count still totals the same seven days already named back in verse three.

🍞 Six days form the first half
📅 The seventh day stands apart
🔢 The total still equals seven days
📖 One festival, two distinct parts

## 🛑 A Solemn Assembly To The LORD Thy God

A "solemn assembly" was a required gathering, not an optional one.

This closing day mirrors the opening day's rest back in Exodus twelve.

No ordinary work was allowed on this final day of the feast.

The festival opened and closed on matching notes of rest.

🛑 Solemn assembly means a required gathering
🔁 It mirrors the feast's opening day
🚫 No ordinary work happened this day
📖 The festival opened and closed the same way

# Deuteronomy 16:9-12
# 🌾 The Feast Of Weeks
---
## 🔢 Seven Weeks Shalt Thou Number Unto Thee

This is a count of forty nine days, seven weeks of seven days each.

Jewish tradition later called this practice counting the Omer.

The count linked two harvest festivals together across seven full weeks.

Marking each day kept the connection between the feasts alive.

🔢 Seven weeks means forty nine days
📿 Later tradition called this counting the Omer
🔗 It linked two harvest feasts together
📖 Daily counting kept that link alive

## 🌾 Put The Sickle To The Corn

"Corn" in the King James Version means grain in general, especially barley.

The count began the moment the barley harvest itself began.

This ties the festival's timing to farm work, not a fixed calendar date alone.

The land's own rhythm set the schedule.

🌾 Corn means grain, especially barley
🔪 The sickle marks harvest beginning
📆 Timing followed farm work, not just a date
📖 The land's rhythm set the schedule

## 🎉 The Feast Of Weeks

This festival later became known as Shavuot, the Hebrew word for weeks.

In Greek it was called Pentecost.

Pentecost means fiftieth, the day counted after the seven weeks ended.

Jewish tradition later connected this feast to God giving the law at Sinai.

The same festival name reappears centuries later in Acts chapter two.

🎉 Later called Shavuot, meaning weeks
🔢 Pentecost means fiftieth
📜 Tradition tied it to the law at Sinai
📖 The name returns in Acts chapter two

## 🎁 A Tribute Of A Freewill Offering

A "freewill offering" was given by choice, not commanded as a fixed amount.

This differs from offerings with an exact required quantity.

The size of the gift was left to the giver's own decision.

Worship here included room for personal generosity, not just obligation.

🎁 Freewill means given by choice
🔢 No fixed amount was required
🙋 The giver decided the size
📖 Worship left room for generosity

## 🌾 According As The LORD Thy God Hath Blessed Thee

The offering's size was tied directly to that year's harvest.

A better harvest meant a larger gift back to God.

A thin harvest still counted, since the standard scaled with what was actually received.

No one gave more than what they truly had.

🌾 The gift scaled with the harvest
📈 A better harvest meant a bigger gift
📉 A thin year still counted too
📖 No one gave beyond what they had

## 🎊 Thou Shalt Rejoice Before The LORD Thy God

Joy is commanded here, not left as a feeling that might or might not show up.

The command applies to the whole household together, not one person alone.

Sons, daughters, and servants all shared in this same required celebration.

Worship in Deuteronomy was never meant to be a quiet, solitary duty.

🎊 Joy is a command, not just a feeling
👪 The whole household joins together
🙌 Servants shared in the celebration too
📖 Worship here was never meant to be solitary

## 🤝 The Levite, And The Stranger, And The Fatherless, And The Widow

These four groups appear together often throughout Deuteronomy.

The Levite had no land inheritance, since chapter eighteen explains his portion came from the offerings themselves.

The stranger, fatherless, and widow shared a common lack of family land or protection.

Naming them made sure the feast's joy was not kept only among the secure.

🕊️ Four vulnerable groups named together
🏞️ The Levite had no land inheritance
👤 The others lacked family protection
📖 Joy was not reserved for the secure

## 🇪🇬 Thou Shalt Remember That Thou Wast A Bondman In Egypt

This exact memory formula already appeared in chapter fifteen.

Israel is told to treat the vulnerable the way they once wished to be treated.

Their own history of slavery becomes the reason for their generosity now.

A shared feast becomes a way of living out that memory.

🇪🇬 The same memory formula returns from chapter fifteen
❤️ Past slavery shapes present generosity
🔁 Memory turns into a lived habit
📖 The feast lives out that memory

# Deuteronomy 16:13-17
# 🍇 Tabernacles And The Three Feasts
---
## 🏕️ The Feast Of Tabernacles

This festival later became known as Sukkot, the Hebrew word for booths.

Families built and lived in temporary shelters for the week.

Leviticus twenty three explains this recalled Israel's years living in tents during the wilderness journey.

Harvest comfort was paired with a deliberate reminder of past hardship.

🏕️ Later called Sukkot, meaning booths
🛖 Families lived in temporary shelters
🚶 It recalled the wilderness years
📖 Harvest comfort paired with hard memory

## 🍇 After That Thou Hast Gathered In Thy Corn And Thy Wine

This feast came at the very end of the farming year.

Grain, wine, and olive oil were all gathered in by this point.

It functioned as Israel's autumn thanksgiving for the full year's harvest.

The whole agricultural cycle closed here before starting again.

🍇 It closed out the full farming year
🌾 Grain, wine, and oil were already in
🙏 It worked as an autumn thanksgiving
📖 One cycle ended before the next began

## 🎊 Thou Shalt Rejoice In Thy Feast

The exact same guest list from the feast of weeks appears again here.

Sons, daughters, servants, Levites, strangers, the fatherless, and widows are all named again.

Repeating the list kept the same inclusive rule attached to every single feast.

No festival in Israel's calendar was allowed to leave the vulnerable out.

🔁 The same guest list repeats on purpose
👪 Sons, daughters, and servants named again
🕊️ Levites, strangers, and widows included again
📖 No feast left the vulnerable out

## 😊 Thou Shalt Surely Rejoice

This is now the third time joy is commanded across these three feasts.

The reason given here is direct, God's blessing on the harvest and on daily work.

"Surely" strengthens the command, ruling out a half hearted celebration.

Israel's worship calendar built in real joy, not just required attendance.

😊 The third command to rejoice in this chapter
🌾 The reason is God's blessing on the harvest
💪 Surely rules out a half hearted mood
📖 Real joy was built into the calendar

## 🚶 Three Times In A Year Shall All Thy Males Appear Before The LORD

Three annual trips to the chosen worship place were required.

"Males" likely reflects who was expected to travel, since women and children were not barred.

Long journeys with a whole household were harder for everyone to make three times a year.

The requirement fell on the household's representative, not the household's importance.

🚶 Three yearly trips were required
👤 Males were the ones required to travel
🚫 Women and children were not barred
📖 Duty fell on the representative, not rank

## 🌾 In The Feast Of Unleavened Bread, And In The Feast Of Weeks, And In The Feast Of Tabernacles

These three feasts follow the farming year in order.

Unleavened Bread came with the spring barley harvest.

Weeks came with the early summer wheat harvest.

Tabernacles came with the full autumn ingathering of grain, wine, and oil.

🌱 Unleavened Bread matched the spring barley
🌾 Weeks matched the early summer wheat
🍇 Tabernacles matched the autumn ingathering
📖 Worship followed the whole farming year

## 🙌 They Shall Not Appear Before The LORD Empty

Every pilgrim was expected to bring something, not simply show up.

An offering connected worship to whatever that person actually had that year.

This rule protected against treating worship as free of any real cost.

Coming before God always included bringing something back to Him.

🙌 Every pilgrim brought an offering
🎁 The gift connected worship to real cost
🚫 Empty handed worship was not allowed
📖 Coming to God meant giving something back

## ⚖️ Every Man Shall Give As He Is Able

This rule scales the requirement to what each person could actually afford.

A wealthy Israelite and a poor Israelite both kept the same command differently.

Fairness here meant matching the gift to the giver, not one flat rule for everyone.

The same principle already appeared with the freewill offering back in verse ten.

⚖️ The gift scaled to what each person had
💰 Rich and poor kept the same command differently
🎯 Fairness matched the gift to the giver
📖 The same principle appeared back in verse ten

# Deuteronomy 16:18-20
# ⚖️ Judges And Officers
---
## 🏘️ Judges And Officers Shalt Thou Make Thee In All Thy Gates

"Gates" means local towns, the same meaning used earlier in this chapter.

Every town needed its own local court, not one central court for the whole nation.

This system reached every tribe, not just a few larger towns.

Justice was meant to be near enough for anyone to reach.

🏘️ Gates means local towns again
⚖️ Every town needed its own court
🇮🇱 The system covered every tribe
📖 Justice needed to be within reach

## 📏 They Shall Judge The People With Just Judgment

The phrase repeats the word judgment twice in one sentence.

That repetition puts all the weight on one single quality, fairness.

A judge's whole purpose was defined by this one requirement.

Nothing else about the role mattered more than this.

🔁 Judgment is repeated twice on purpose
🎯 All the weight lands on fairness
👨‍⚖️ A judge's purpose is defined here
📖 Nothing mattered more than this one duty

## 🚫 Thou Shalt Not Wrest Judgment

"Wrest" is an old word meaning to twist or force something out of shape.

A judge could bend a ruling toward a desired outcome instead of the truth.

This command bans that twisting before it can even start.

The ruling itself had to stay honest, not shaped by pressure.

🚫 Wrest means to twist or force
⚖️ A ruling could be bent off course
🛑 This command stops that twisting early
📖 Rulings had to stay honest

## 👤 Thou Shalt Not Respect Persons

"Respect persons" here means showing favoritism based on someone's status or wealth.

A rich man's case and a poor man's case had to receive the exact same hearing.

Judges are barred from letting who a person is change the outcome of a case.

The law itself, not the person's rank, was meant to decide.

👤 Respect persons means playing favorites
💰 Rich and poor deserved equal hearings
🚫 Status could not sway the outcome
📖 The law decided, not a person's rank

## 💰 Neither Take A Gift

This bans bribery in plain terms.

A "gift" here means a payment meant to influence a judge's decision.

Even a small gift could quietly shift a ruling away from the truth.

The command closes off corruption before it can start small.

💰 This bans bribery directly
🎁 Gift here means a payment to influence
🔀 Even small gifts could shift a ruling
📖 Corruption gets stopped before it starts

## 👁️ For A Gift Doth Blind The Eyes Of The Wise

Even a genuinely wise, experienced judge was not immune to this danger.

"Blind" here is a picture, meaning a bribe stops a judge from truly seeing the facts.

Wisdom alone could not protect against the pull of money.

The warning is aimed at the very people most trusted to resist it.

👁️ Blind pictures a judge losing sight of facts
🧠 Even wise judges were not immune
💸 Money's pull could overpower wisdom
📖 The warning targets the most trusted people

## 🗣️ Pervert The Words Of The Righteous

"Pervert" means to twist something good into something false.

Even a person with a genuinely right case could still lose a fair ruling to a bribe.

The danger here reaches past corrupt judges into otherwise honest ones.

A bribe could turn true testimony into a false outcome.

🗣️ Pervert means twisting something good
✅ Even a right case could still lose
⚠️ The danger reaches honest judges too
📖 A bribe could turn truth false

## 🎯 That Which Is Altogether Just Shalt Thou Follow

"Altogether just" means justice alone, pursued without any competing motive.

The command repeats the word justice by itself here, not paired with convenience.

This single minded pursuit was meant to guard against every excuse listed just before it.

Justice needed to be the whole goal, not one factor among several.

🎯 Altogether just means justice alone
🔁 The word justice stands by itself here
🛡️ It guards against every excuse just named
📖 Justice had to be the whole goal

## 🏞️ That Thou Mayest Live, And Inherit The Land

Keeping this law is tied directly to the nation's survival.

Losing the land was already the warning attached to disobedience elsewhere in Deuteronomy.

A just legal system was not a side issue, it protected the whole covenant.

Corrupt courts could put the promised inheritance itself at risk.

🏞️ Obedience here connects to national survival
⚠️ Losing the land was the warning elsewhere
🤝 Justice protected the whole covenant
📖 Corrupt courts risked the promised inheritance

# Deuteronomy 16:21-22
# 🌳 No Groves Or Images
---
## 🌳 Not Plant Thee A Grove Of Any Trees

A "grove" here means a wooden pole or planted trees used in Canaanite worship.

It was closely tied to Asherah, a Canaanite fertility goddess.

Planting one near true worship risked blending true faith with pagan practice.

The ban protected against mixing, not just outright replacement.

🌳 Grove means a pole for pagan worship
👑 It connects to Asherah, a Canaanite goddess
⚠️ The risk was blending, not just replacing
📖 True worship had to stay unmixed

## 🛐 Near Unto The Altar Of The LORD Thy God

The concern here is proximity, not distance.

Even placing a pagan symbol close to true worship was forbidden.

This same concern about what stands near the altar continues into the next chapter.

Nearness itself could quietly blur the line between two very different faiths.

📏 Proximity is the real concern here
🚫 Even nearby pagan symbols were banned
🔗 The same concern continues into chapter seventeen
📖 Nearness could blur two different faiths

## 🗿 Neither Shalt Thou Set Thee Up Any Image

"Image" here means a carved standing stone used as an object of worship.

This differs from a plain memorial pillar, like the one Jacob once raised at Bethel.

The difference was purpose, one marked a memory, the other was worshiped directly.

Objects were not banned outright, but idolatry attached to an object was.

🗿 Image means a carved worship stone
🪨 It differs from a plain memorial pillar
🎯 Purpose, not the object, made the difference
📖 Idolatry was banned, not every stone

## 💔 Which The LORD Thy God Hateth

"Hateth" is a strong word, rarely used this directly in these law chapters.

Most commands in Deuteronomy are framed as instruction, not personal feeling.

Naming God's hatred here marks this practice as more than just against the rules.

The very next chapter opens with a related warning about blemished offerings.

💔 Hateth is unusually strong language here
📜 Most laws are framed as instruction, not feeling
🚨 This means more than a broken rule
📖 Chapter seventeen opens with a related warning
`.trim();

export const DEUTERONOMY_SIXTEEN_PERSONAL_SECTIONS = parseDeuteronomySixteenRawNotes(DEUTERONOMY_SIXTEEN_RAW_NOTES);
