export type AmosFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosFourRawNotes(rawText: string): AmosFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 4:${startVerse}` : `Amos 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Amos 4 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_FOUR_RAW_NOTES = `# Amos 4:1-3
# 🐄 Hear This Word, Ye Kine Of Bashan
---
## 🐄 Ye Kine Of Bashan, That Are In The Mountain Of Samaria

Kine is an old word for cows.

Calling Israel's wealthy women kine of Bashan compares them to fat cattle.

Bashan was a region famous for its rich pastureland.

It raised the fattest cattle in the whole area.

These women lived in careless comfort.

The poor around them were starving.

🐄 Kine means cows
🌾 Bashan grew the richest pastureland
💰 The comparison points to fat careless wealth
📖 Comfort came at the poor's expense

## 😡 Which Oppress The Poor, Which Crush The Needy

Oppress means to use power to hold someone down unfairly.

Crush pushes that picture even further than oppress alone.

Amos pairs two verbs to show how far this abuse went.

The poor and the needy are not two different groups here.

They are the same victims named twice for emphasis.

Repetition in Hebrew poetry presses one point harder.

😡 Oppress means unfair use of power
💔 Crush intensifies that same abuse
🔁 Two verbs double the emphasis
📖 The needy are pressed twice for weight

## 🍷 Which Say To Their Masters, Bring, And Let Us Drink

This line puts words directly into these women's mouths.

Masters here points to their husbands, the powerful men of Samaria.

Bring and let us drink is a command, not a request.

Their comfort depended on their husbands squeezing more from the poor.

Demanding more wine was the same demand that crushed the needy.

🍷 Bring and drink is a command
🤵 Masters means their own husbands
💰 Their comfort came from squeezed wealth
📖 Demanding wine fed the same injustice

## 🪝 He Will Take You Away With Hooks, And Your Posterity With Fishhooks

Hooks here were likely used to drag captives away like fish or cattle.

Posterity means the next generation, their own children.

This pictures a humiliating defeat, not a dignified exile.

Conquerors sometimes led captives by hooks through the lip or nose.

Even their children would not escape this coming disgrace.

🪝 Hooks pictures a humiliating capture
👶 Posterity means their own children
⛓️ Conquerors sometimes led captives this way
📖 Even the next generation would suffer

## 🏚️ Ye Shall Go Out At The Breaches, Every Cow At That Which Is Before Her

The women are now pictured as cattle again, like the kine of Bashan.

Breaches means gaps broken open in a city wall.

Each cow going out her own breach pictures a herd driven out in panic.

There is no order left, only forced departure in every direction.

They will be cast into the palace, not kept safe inside it.

The place that once meant security becomes part of the judgment.

🏚️ Breaches means broken gaps in a wall
🐄 Cattle imagery returns for the exile
😱 Each one flees her own way in panic
📖 The palace becomes judgment, not shelter

# Amos 4:4-5
# 🏛️ Come To Bethel, And Transgress
---
## 🏛️ Come To Bethel, And Transgress

Bethel and Gilgal were two of Israel's favorite worship sites.

Both had drifted far from true worship of the LORD.

Transgress here does not mean a private sin alone.

It means stepping outside the boundaries God set for worship.

Coming to Bethel on purpose is bitter sarcasm.

It is not a real invitation to sin.

🏛️ Bethel was a popular worship site
🚫 Transgress means stepping outside God's bounds
😏 Amos speaks in sharp sarcasm here
📖 False worship was treated as normal

## 🌾 At Gilgal Multiply Transgression

Gilgal was the second site named alongside Bethel.

Multiply transgression means pile up sin on sin without end.

Amos is mocking a people who treated worship like a contest.

More sacrifices did not mean more devotion to God.

It only meant more of the same false religion.

🌾 Gilgal paired with Bethel as a worship site
📈 Multiply transgression means piling up sin
🏆 Worship had become a hollow contest
📖 More sacrifice was not more devotion

## 🌅 Bring Your Sacrifices Every Morning, And Your Tithes After Three Years

This describes two different offerings with two different schedules.

Daily sacrifices were offered every single morning without fail.

Tithes were a tenth of a person's income.

This custom gave tithes once every three years.

Israel kept both schedules faithfully and with great show.

The problem was never their calendar.

It was their hearts underneath all that routine.

🌅 Daily sacrifices came every single morning
📦 Tithes means a tenth given every third year
🎭 These offerings were kept with great show
📖 The hearts behind the routine were empty

## 🍞 Offer A Sacrifice Of Thanksgiving With Leaven

A thank offering was normally meant to be bread made without leaven.

Leaven is the ingredient that makes bread rise.

It works much like yeast does today.

Adding leaven where it did not belong broke the actual command.

Israel kept the outward form of worship.

They ignored the details underneath it.

Even their generosity broke the rules God had set.

🍞 Leaven works much like yeast today
🚫 Adding it broke the actual command
🎭 The form of worship stayed, obedience did not
📖 Generosity without obedience still falls short

## 📢 Proclaim And Publish The Free Offerings

Free offerings were extra, voluntary gifts beyond the required ones.

Israel did not quietly bring these gifts.

They proclaimed and published them for everyone to notice.

Liketh means this is exactly what pleased them, not God.

Worship had become a performance for human approval.

📢 Free offerings were voluntary, extra gifts
📣 Israel announced their generosity loudly
👀 Liketh means this pleased them, not God
📖 Worship had become a show for people

# Amos 4:6-8
# 😔 Yet Have Ye Not Returned Unto Me
---
## 🦷 I Have Given You Cleanness Of Teeth In All Your Cities

Cleanness of teeth is a vivid picture for nothing to chew.

It means a famine so severe that teeth had nothing to do.

Want of bread describes the same shortage from a different angle.

God names Himself as the direct cause of this hunger.

This was discipline, not an accident of weather.

🦷 Cleanness of teeth pictures empty mouths
🍞 Want of bread names the same famine
✋ God names Himself as the cause
📖 This was discipline, not an accident

## 🌧️ I Have Withholden The Rain From You

Withholden means God deliberately held something back.

This happened three months before the harvest, the worst possible timing.

A late rain failure could ruin an entire year's food supply.

God controlled the weather itself to get Israel's attention.

Nature was never random in this story.

🌧️ Withholden means deliberately held back
⏳ The timing hit right before harvest
🌾 One failed rain could ruin a whole year
📖 God controlled nature on purpose

## 🗺️ Caused It To Rain Upon One City, And Not Upon Another

God made it rain on one city and skip the next.

A single field was rained on.

The very next field withered dry.

This kind of precision could never be mistaken for ordinary weather.

It was a pointed, personal sign.

🗺️ Rain fell on one city, not the next
🌾 One field was watered, the next withered
🎯 The precision ruled out ordinary weather
📖 This was a pointed, personal sign

## 💧 Two Or Three Cities Wandered Unto One City, To Drink Water

Entire towns had to travel just to find drinking water.

Wandered pictures desperate searching, not a planned trip.

Even reaching water did not solve the problem.

They drank but were not satisfied.

Physical thirst became a picture of their deeper condition.

💧 Towns wandered just to find water
🚶 Wandered pictures desperate searching
🙁 They drank but were not satisfied
📖 Physical thirst pictured their deeper need

## 😔 Yet Have Ye Not Returned Unto Me

This exact line repeats five times across this chapter.

Each disaster was meant to turn Israel back toward God.

Famine, drought, and thirst all failed to do it.

Returned means genuine repentance, not a change of location.

God sent discipline the way a parent sends a warning before punishment escalates.

😔 This refrain repeats five times
🔁 Each disaster aimed at the same goal
🚫 None of them brought real repentance
📖 God disciplines like a patient parent

# Amos 4:9-11
# 🔥 I Have Smitten You With Blasting And Mildew
---
## 🌾 I Have Smitten You With Blasting And Mildew

Blasting and mildew were two separate crop diseases.

Blasting means crops scorched and ruined by hot wind.

Mildew means crops rotted by damp and fungus.

Together they covered every way a harvest could fail.

God controlled both extremes, drought and damp alike.

🌾 Blasting means crops scorched by hot wind
🍄 Mildew means crops rotted by damp
🔄 Together they covered every kind of failure
📖 God controlled both extremes completely

## 🐛 The Palmerworm Devoured Them

A palmerworm is a locust in an early, crawling stage of life.

It devoured gardens, vineyards, fig trees, and olive trees alike.

These were the crops a whole family depended on to live.

Nothing was too increased or too healthy to escape it.

Even growth and abundance could not outrun this judgment.

🐛 Palmerworm means an early stage locust
🌳 It struck every major crop at once
🍇 These crops were a family's livelihood
📖 Abundance offered no escape from judgment

## ⚔️ I Have Sent Among You The Pestilence After The Manner Of Egypt

Pestilence means a deadly plague or disease.

After the manner of Egypt recalls the plagues God once sent on Pharaoh.

The nation God rescued from Egypt's plagues now faces that same kind of judgment.

Young men were killed and horses taken, weakening Israel's whole army.

The same God who judged Egypt now judges His own people.

⚔️ Pestilence means a deadly plague
🇪🇬 This recalls the plagues on Egypt
🐴 Soldiers and horses were both lost
📖 The rescuer now judges His own

## 👃 The Stink Of Your Camps To Come Up Unto Your Nostrils

This pictures dead bodies left unburied after battle losses.

The smell of death filled the very air they breathed.

War here was not a distant report from somewhere else.

Israel's own camps carried the evidence of this judgment.

The senses themselves could not escape what had happened.

👃 This pictures unburied dead after battle
💨 The smell of death filled their camps
🏕️ Judgment was not distant, it was close
📖 Their own senses carried the evidence

## 🔥 I Have Overthrown Some Of You, As God Overthrew Sodom And Gomorrah

Sodom and Gomorrah were cities destroyed for their extreme wickedness.

Every Israelite hearing this name would know exactly what it meant.

God compares Israel's own coming judgment to that same total destruction.

This was not a new kind of disaster.

It was the same severity, now turned on God's own covenant people.

🔥 Sodom and Gomorrah were totally destroyed
📖 Every listener knew this reference by heart
⚖️ Israel faced that same severity
➡️ The same God now judges His own people

## 🪵 Ye Were As A Firebrand Plucked Out Of The Burning

A firebrand is a stick already burning, pulled out just before it is consumed.

Even in the middle of all this discipline, some of Israel survived.

Being pulled from a fire still means real damage was done.

Survival here is a warning, not a comfortable rescue.

Mercy and judgment are both present in this one image.

🪵 Firebrand means a stick already burning
🙌 Some of Israel survived each disaster
🔥 Survival still meant real damage
📖 Mercy and judgment appear together here

# Amos 4:12-13
# ⚡ Prepare To Meet Thy God, O Israel
---
## ⚡ Prepare To Meet Thy God, O Israel

Every disaster in this chapter was building toward this one command.

Prepare to meet God is not an invitation to a pleasant visit.

It warns of a coming confrontation with the one who sent each judgment.

Israel's name is repeated twice to make the warning personal.

This is addressed to them directly, not to some distant nation.

⚡ The chapter builds toward this command
⚠️ Meeting God here means confrontation
🎯 Israel's name is repeated for emphasis
📖 The warning is personal, not distant

## ⛰️ He That Formeth The Mountains, And Createth The Wind

This describes the LORD by what He has made.

Not only by what He has said.

Forming mountains and creating wind cover solid earth and invisible air alike.

The same God who shapes creation also shapes Israel's coming judgment.

Nothing in nature happens outside His control.

The one about to judge Israel also made the world they stand on.

⛰️ He formed the mountains themselves
💨 He created the wind as well
🌍 Creation itself answers to Him
📖 The judge is also the Creator

## 🧠 Declareth Unto Man What Is His Thought

This means God reveals to people what He Himself is thinking.

No human effort uncovers God's plans on its own.

He chooses to speak through His prophets, as the chapter already showed.

Nothing said about Israel's coming judgment was left a mystery.

God warned before He acted, just as Amos already explained earlier.

🧠 Declareth means God reveals His own thought
🗣️ He speaks through chosen prophets
🚫 Nothing here was left a mystery
📖 Warning always came before judgment

## 🌅 Maketh The Morning Darkness, And Treadeth Upon The High Places Of The Earth

Making morning into darkness pictures total reversal.

Light itself is undone by God's own hand.

High places often meant mountain shrines where false gods were worshipped.

Treading upon them pictures the LORD walking above every rival god.

Nothing in creation or false religion stands higher than Him.

This verse ends with His own name, The LORD, The God Of Hosts.

That name is the final, unanswerable word in this whole chapter.

🌅 Morning turned dark pictures total reversal
🏔️ High places often meant false worship sites
👑 The LORD treads above every rival god
📖 His own name closes the chapter
`.trim();

export const AMOS_FOUR_PERSONAL_SECTIONS = parseAmosFourRawNotes(AMOS_FOUR_RAW_NOTES);
