export type JonahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJonahFourRawNotes(rawText: string): JonahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JonahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jonah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jonah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jonah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Jonah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jonah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jonah 4:${startVerse}` : `Jonah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jonah 4 sections, received " + sections.length);
  }

  return sections;
}

const JONAH_FOUR_RAW_NOTES = `# Jonah 4:1-3
# 😡 Jonah's Anger Boils Over
---
## 😤 It Displeased Jonah Exceedingly

"Exceedingly" means far beyond ordinary irritation.

Jonah is not mildly annoyed.

He is furious at something that just happened for someone else's good.

Chapter three ended with a whole city spared from disaster.

Chapter four opens with its own prophet in agony over that fact.

😤 Exceedingly means far beyond ordinary irritation

🏙️ Nineveh has just been spared

😡 Its own prophet reacts with fury

📖 Mercy for others can still offend us

## 😠 He Was Very Angry

This is not the anger of someone who failed.

Jonah is angry because he succeeded.

His warning worked.

Nineveh repented.

God relented exactly as Jonah feared He would.

That outcome was never really about destruction.

It was about forgiveness landing on people Jonah did not think deserved it.

😠 Jonah is angry because he succeeded

🏃 His own warning caused Nineveh's repentance

💔 God relented exactly as he feared

📖 Forgiveness can offend the one who warned

## 🔮 Was Not This My Saying, When I Was Yet In My Country

Jonah admits something shocking here.

He suspected this exact outcome before God ever called him in chapter one.

"My saying" means the very thing he had already said to himself back home.

He did not run from Nineveh because he was afraid of its size or its violence.

He ran because he suspected God would forgive it.

This verse rewrites the whole reason behind chapter one's flight.

🔮 Jonah suspected this before he was called

🏠 My saying points back to his own country

🏃 He never feared Nineveh's size or violence

📖 He feared God would actually forgive them

## 🏃 Therefore I Fled Before Unto Tarshish

This sentence connects straight back to chapter one.

Tarshish was a real port city, likely far west in what is now Spain.

Jonah ran in the opposite direction of Nineveh on purpose.

Here he finally says out loud exactly why.

He was not running from danger.

He was running from the chance that God might show mercy.

🗺️ Tarshish sat far to the west

🧭 Jonah fled the opposite direction on purpose

🙅 He was never running from danger

📖 He was running from God's mercy

## ❤️ A Gracious God, And Merciful, Slow To Anger, And Of Great Kindness

This exact description of God appears several times across the Old Testament.

Moses first heard God describe Himself this way on Mount Sinai.

"Gracious" means God gives good things that are not earned.

"Slow to anger" means He does not rush toward punishment.

Jonah knows these words by heart.

He is quoting God's own character back at Him as a complaint, not a compliment.

📜 This description repeats across the Old Testament

🏔️ Moses first heard it on Sinai

🎁 Gracious means grace that is not earned

📖 Jonah turns God's own character into a complaint

## 🔄 Repentest Thee Of The Evil

"Repentest" here does not mean God sinned and needed to turn from wrong.

It means God changes a planned action in response to a changed situation.

Chapter three already used this same word when God spared Nineveh.

Jonah is not confused about what the word means.

He understood it perfectly, and that is exactly the problem.

🔄 Repentest means changing a planned action

🚫 It never means God did wrong

📜 Chapter three already used this word

📖 Jonah understood it and still resented it

## 🙏 I Beseech Thee, My Life From Me

"Beseech" means to beg urgently, not to make a casual request.

Jonah is not simply frustrated.

He is asking God to end his life.

This is not the only time a prophet says something like this.

Elijah made an almost identical request after a different kind of exhaustion in First Kings nineteen.

Prophetic despair shows up more than once in scripture.

🙏 Beseech means to beg urgently

💀 Jonah asks God to end his life

🔥 Elijah made a similar request once

📖 Prophets can reach real despair

## 💀 It Is Better For Me To Die Than To Live

Jonah says this twice in this chapter, here and again after the plant dies.

Nineveh was just given its life back through repentance.

Jonah responds by asking to have his own life taken away.

The same chapter holds a city celebrating survival and a prophet begging for death.

Mercy for others can feel like loss for the one who did not want to give it.

💀 Jonah says this twice in this chapter

🎉 Nineveh just got its life back

😔 Jonah asks to have his life ended

📖 Mercy for others can feel like loss

# Jonah 4:4-5
# 🚶 God Asks, Jonah Walks Away
---
## ❓ Doest Thou Well To Be Angry

God does not scold Jonah here.

He asks a question instead.

This closely matches the question God once asked Cain in Genesis four.

That earlier anger eventually led Cain to murder his own brother.

The question invites Jonah to examine his own heart before his anger goes further.

Jonah does not answer.

He simply walks away.

❓ God asks instead of scolding

🔪 He once asked Cain this same question

💔 Cain's anger led to murder

➡️ Jonah answers by walking away instead

## 🚪 Went Out Of The City, And Sat On The East Side

Jonah does not go home.

He does not go back to Israel at all.

He leaves the city gate.

He sits down just outside it, within sight of Nineveh.

The east side was likely the direction back toward his own homeland.

He stays to watch, not to leave for good.

🚪 Jonah does not go home

🧭 The east side faced his homeland

👀 He stays near enough to watch

➡️ He is not finished with this city

## 🛖 There Made Him A Booth

A "booth" was a small shelter built quickly from branches and leaves.

Israel built the same kind of shelter every year during the Feast of Tabernacles.

That feast celebrated God's protection of Israel in the wilderness.

Jonah builds one here for a very different reason.

He wants shade for the days ahead.

He is waiting to see if Nineveh's judgment still falls.

🛖 A booth was a quick branch shelter

🎪 Israel built these for a yearly feast

☀️ Jonah wants shade for the days ahead

📖 He still hopes for Nineveh's judgment

## 👀 Till He Might See What Would Become Of The City

Jonah already knows Nineveh repented and God spared it.

This phrase shows he has not accepted that outcome internally.

He sits and waits as if the ending could still change.

Forty days have not even fully passed yet at this point in the story.

Part of him is still hoping for the destruction he originally preached.

👀 Jonah already knows the city was spared

🙅 He has not accepted it internally

⏳ The forty days have not fully passed

📖 Part of him still hopes for destruction

# Jonah 4:6-8
# 🌿 The Gourd, The Worm, And The Wind
---
## 🌿 The LORD God Prepared A Gourd

A "gourd" here was likely a fast growing vine with broad leaves, similar to a castor oil plant.

"Prepared" is the same word used for the great fish back in chapter one.

God controls small details of nature just as easily as massive ones.

This plant grows specifically to answer Jonah's self pity, not his obedience.

🌿 A gourd was a fast growing vine

🐋 Prepared also described the great fish

🌍 God controls both small and massive things

📖 This plant answers self pity, not obedience

## 💚 To Deliver Him From His Grief

Jonah is not grieving over Nineveh's fate here.

He is grieving his own discomfort in the heat.

God still responds with kindness anyway.

This gift comes before Jonah has repented of anything.

Mercy toward Jonah mirrors the mercy Jonah refuses to accept for Nineveh.

💚 Jonah grieves his own discomfort

🎁 God answers before any repentance

🔄 This mirrors the mercy shown to Nineveh

📖 God is patient with a bitter prophet

## 😄 Jonah Was Exceeding Glad Of The Gourd

The word "exceeding" already described his anger back in verse one.

Now the same extreme word describes his joy instead.

Jonah swings from furious to thrilled over his own shade, not over any person.

His emotions track his comfort, not the fate of a whole city.

😄 Exceeding described his anger in verse one

🔄 The same word now describes his joy

🌿 He is thrilled over his own shade

📖 His emotions track comfort, not people

## 🐛 God Prepared A Worm

The same God who grew the plant now sends something to kill it.

This is not random bad luck.

God controls the worm exactly as deliberately as He controlled the gourd.

The gift and its removal come from the same hand.

🐛 God sends the worm on purpose

🌿 The same hand grew the gourd

🎯 Nothing here happens by accident

📖 Blessing and its removal share one source

## 🥀 It Smote The Gourd That It Withered

"Smote" means struck hard, not a gentle nibble.

The plant dies almost as fast as it grew.

Something Jonah leaned on for comfort disappears within a single day.

This sets up the lesson God is about to make plain.

🥀 Smote means struck hard and fast

⏳ The plant dies within one day

💔 Jonah's comfort disappears just as quickly

📖 This sets up the lesson ahead

## 🌬️ God Prepared A Vehement East Wind

A "vehement east wind" describes a scorching desert wind, not a cool breeze.

This kind of wind still blows across that region today and feels like opening an oven door.

God adds heat on top of the sun already beating down.

Every form of discomfort in this scene traces back to God's own hand.

🌬️ Vehement means a scorching desert wind

🔥 It still blows in that region today

☀️ God adds heat on top of the sun

📖 Every discomfort traces back to God

## 😵 He Fainted, And Wished In Himself To Die

Jonah collapses from the heat and exhaustion.

He repeats the exact same death wish from verse three.

Back then his despair was about Nineveh's forgiveness.

Now it is about personal physical misery instead.

The same words cover two very different complaints.

😵 Jonah collapses from heat and exhaustion

🔁 He repeats his death wish from verse three

🏙️ That first wish was about Nineveh

📖 This one is about his own comfort

# Jonah 4:9
# 🔥 I Do Well To Be Angry, Even Unto Death
---
## ❓ Doest Thou Well To Be Angry For The Gourd

God asks Jonah the exact same question from verse four again.

This time He narrows it down to one small plant.

The bigger question about Nineveh was apparently too easy for Jonah to dodge.

A smaller, more personal example is harder to avoid honestly.

❓ The same question returns from verse four

🌿 This time it points to one plant

🏙️ The Nineveh question was easy to dodge

📖 A smaller example is harder to avoid

## 🔥 I Do Well To Be Angry, Even Unto Death

Jonah does not back down from God's question here.

He insists his anger is justified, all the way to the point of death.

This is the same man who just watched an entire pagan city repent.

He cannot extend to a plant what Nineveh managed to extend to God, a change of heart.

The book ends with Jonah defiant, not transformed.

🔥 Jonah insists his anger is justified

💀 He says this all the way to death

🏙️ Nineveh changed, but Jonah has not

📖 The book ends with defiance, not change

# Jonah 4:10-11
# 📖 God's Final Lesson About Nineveh
---
## 💔 Thou Hast Had Pity On The Gourd

"Pity" here means a tender concern for something's loss.

God names the exact emotion Jonah felt about the plant.

That same emotion is the one thing Jonah refuses to feel for Nineveh.

God is not condemning Jonah's pity itself.

He is asking why it stops at a plant.

💔 Pity means tender concern for a loss

🌿 Jonah felt this for the plant

🏙️ He refuses the same feeling for Nineveh

📖 God asks why pity stops at a plant

## 🌱 Thou Hast Not Laboured, Neither Madest It Grow

Jonah did not plant this gourd.

He did not water it or tend it in any way.

He has zero investment in it beyond the shade it gave him.

Yet he grieves its loss as if it were his life's work.

God points out how small his actual claim on the plant really was.

🌱 Jonah never planted or tended it

🙅 He has zero real investment in it

😭 He still grieves it intensely

📖 His claim on the plant was tiny

## 🌙 Which Came Up In A Night, And Perished In A Night

The plant existed for about one single day total.

It grew overnight and died just as fast.

Jonah is in deep grief over something that barely existed at all.

God uses that short lifespan to make the next question land harder.

🌙 The plant lasted about one day

⚡ It grew and died almost instantly

😢 Jonah grieves something barely there at all

📖 Its short life sets up the next question

## 🏙️ Should Not I Spare Nineveh, That Great City

This is the question the entire book has been building toward.

If a short lived plant can earn Jonah's pity, a whole city should earn far more.

God is not asking Jonah to agree out loud.

The book simply ends on this question, with no recorded answer from Jonah.

Readers are left to answer it themselves.

🏙️ This question is the whole book's point

🌿 A plant earned pity, a city deserves more

🤐 Jonah never answers out loud

📖 Readers must answer the question themselves

## 👶 Sixscore Thousand Persons That Cannot Discern Between Their Right Hand And Their Left Hand

"Sixscore" is an old way of counting, since a "score" means twenty.

Six score means six times twenty, or one hundred and twenty thousand people.

Not being able to tell right from left likely describes children too young to know right from wrong yet.

God's compassion reaches people who cannot even be blamed for Nineveh's sins.

👶 Sixscore means six times twenty

🔢 That totals one hundred twenty thousand people

🧒 Many were likely children too young to know

📖 God's compassion reaches the truly innocent

## 🐄 And Also Much Cattle

God's final word in the whole book is about animals.

His compassion reaches every living thing inside that city, not only the people.

The book of Jonah ends mid conversation, with God still speaking.

Jonah's answer is never recorded.

The reader is left holding the same question Jonah never answered.

🐄 God's last word covers even the animals

🌍 His compassion reaches every living thing

🤐 The book ends with Jonah silent

📖 The reader inherits Jonah's unanswered question
`.trim();

export const JONAH_FOUR_PERSONAL_SECTIONS = parseJonahFourRawNotes(JONAH_FOUR_RAW_NOTES);
