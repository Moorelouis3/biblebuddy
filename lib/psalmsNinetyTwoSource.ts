export type PsalmsNinetyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyTwoRawNotes(rawText: string): PsalmsNinetyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+92:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 92 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+92:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+92:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 92 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 92,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 92:${startVerse}` : `Psalms 92:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 92 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_TWO_RAW_NOTES = `# Psalms 92:1-3
# 🎶 Thanks, Praise, And Music For God
---
## 🙌 It Is A Good Thing To Give Thanks

Giving thanks here is not just good manners.

The psalm calls it a genuinely good thing on its own.

Thanks does not wait for a prayer to be answered first.

It belongs to God simply because of who he is.

This sets the tone for the entire psalm.

🙌 Thanks is called a good thing

⏳ It does not wait for answered prayer

👑 It is owed for who God is

📖 This sets the psalm's whole tone

## 📛 Sing Praises Unto Thy Name, O Most High

"Thy name" means more than a title.

In this culture, a name captured a person's whole character.

"Most High" names God as supreme over every rival power.

Singing praise to that name means celebrating who God actually is.

This is worship aimed at God's character, not just his actions.

📛 A name meant someone's whole character

👑 Most High means supreme over all rivals

🎤 Praise here targets God's character

📖 Worship aims at who God is

## ❤️ Thy Lovingkindness In The Morning, And Thy Faithfulness Every Night

"Lovingkindness" means a loyal, committed love.

It describes love that keeps its promises even when inconvenient.

"Faithfulness" describes God's reliability, proven over time.

Morning and night together cover the entire day.

God's loyal love does not stop at sundown.

❤️ Lovingkindness means loyal, promise keeping love

🤝 Faithfulness means proven reliability

🌅 Morning and night cover the whole day

📖 God's love never stops at sundown

## 🎻 Upon An Instrument Of Ten Strings, And Upon The Psaltery

A "psaltery" was a stringed instrument, something like a small harp.

The "instrument of ten strings" names its number of strings.

It may be that same instrument or a close relative of it.

Pairing it with a solemn sounding harp shows real care in worship.

This was a deliberate, skillful offering of praise.

🎻 Psaltery means a small harp like instrument

🔟 Ten strings describes its tuning

🎶 Careful music was part of worship

📖 Praise here was deliberate, not careless

# Psalms 92:4-6
# 🧠 God's Deep Thoughts, Missed By Fools
---
## 🙌 Made Me Glad Through Thy Work

"Made me glad" describes real joy, not simple relief.

"Thy work" points to what God has done.

"I will triumph" means celebrating a victory already won.

This joy responds to God's action, not the psalmist's own effort.

This is praise rooted in gratitude, not self congratulation.

😊 Glad describes real joy, not relief

🙌 Thy work means God's own action

🏆 Triumph means celebrating a victory

📖 Joy here responds to God, not self

## 🌊 How Great Are Thy Works, And Thy Thoughts Are Very Deep

"Thy works" includes both miracles and the ordinary details of creation.

"Thy thoughts" points to God's plans, not just his actions.

"Very deep" pictures something too vast to fully measure.

A person can see the works and still miss the depth behind them.

Verse six names exactly who tends to miss it.

🌍 Works cover miracles and ordinary creation

🧠 Thoughts means God's plans, not just acts

🌊 Very deep means too vast to measure

📖 Seeing the works is not understanding them

## 🐂 A Brutish Man Knoweth Not

"Brutish" means acting on pure instinct, like an animal.

"A fool" here does not mean unintelligent.

It means someone who refuses to consider God at all.

Both words describe a choice, not a lack of ability.

Depth like this stays hidden from those unwilling to look.

🐂 Brutish means acting on pure instinct

🙅 Fool here means refusing to consider God

🎯 Both describe a choice, not inability

📖 Depth stays hidden from those unwilling to look

# Psalms 92:7-9
# 🌾 The Wicked Fade Like Grass
---
## 🌱 When The Wicked Spring As The Grass

Grass grows fast.

It looks full for only a short while.

Then it dies quickly.

The wicked flourishing here is compared to that same pattern.

Their apparent success does not last, no matter how strong it looks now.

The next line says exactly where that fast growth ends.

🌱 Grass grows fast but dies quickly

🌾 Wicked flourishing is compared to grass

⏳ Their success does not last

📖 Fast growth is not lasting strength

## ⚖️ The Workers Of Iniquity Do Flourish

"Iniquity" means moral wrongdoing, a deliberate turning from what is right.

"Workers of iniquity" describes people practicing that wrong again and again.

Their flourishing looks like proof that wrong pays off.

"They shall be destroyed for ever" answers that appearance directly.

Their end is permanent, unlike the grass that only fades for a season.

⚖️ Iniquity means deliberate moral wrongdoing

🔁 Workers describes ongoing practice, not one mistake

🌾 Flourishing looks like wrong is winning

📖 Their destruction is permanent, not seasonal

## 👑 Thou, LORD, Art Most High For Evermore

God's position never changes.

The wicked may seem loud and strong for a time.

"For evermore" contrasts directly with the "for ever" destroyed just one line earlier.

One side gets a permanent end.

The other side gets a permanent throne.

👑 God's position never changes

⏳ For evermore contrasts wicked destruction

🏆 One side ends, one side reigns

📖 Nothing wicked can touch God's throne

## 💀 Thine Enemies Shall Perish, All The Workers Of Iniquity Shall Be Scattered

"Perish" means to come to a complete and final end.

"Scattered" pictures a group broken apart and driven in different directions.

The phrase "thine enemies" gets repeated twice here for real emphasis.

This was not a warning said quietly, one time only.

It was a certainty repeated so nobody could miss it.

💀 Perish means a complete final end

💨 Scattered means broken apart and driven off

🔁 The warning repeats twice for emphasis

📖 Certainty stated so nobody misses it

# Psalms 92:10-11
# 🦏 Strength And Honor Renewed
---
## 🐂 My Horn Shalt Thou Exalt Like The Horn Of An Unicorn

A "horn" in this culture pictured strength and honor, borrowed from a powerful animal.

To have your horn exalted meant being lifted up in strength and status.

The "unicorn" named here refers to a strong wild ox.

It is not the fantasy creature the word suggests today.

This animal was known for raw, untamed power.

The image pictures God raising the psalmist up with real strength.

🐂 Horn was a picture of strength and honor

⬆️ Exalted horn means lifted up in status

🦏 Unicorn here means a powerful wild ox

📖 God raises him with real strength

## 🫒 I Shall Be Anointed With Fresh Oil

"Anointed" means having oil poured or rubbed on someone.

It marked a person as set apart or honored.

"Fresh oil" pictures a renewed blessing, not one running dry.

Guests and kings were both anointed in this culture as a mark of honor.

The psalmist describes being renewed and honored personally by God.

This is not a blessing left over from the past.

It is a blessing kept current right now.

🫒 Anointed means honored with oil

✨ Fresh oil means a renewed blessing

👑 Anointing marked guests and kings alike

📖 God's honor here stays current

## 👁️ Mine Eye Shall See My Desire On Mine Enemies

This is not a wish for personal revenge.

It follows directly after verses seven through nine.

Those verses already promised the wicked would perish.

"See my desire" means witnessing that promise actually come true.

"Mine ears shall hear" adds a second sense to the same promise.

The psalmist expects to personally see and hear God keep his word.

👁️ This is not personal revenge

🔗 Follows the promise from verses seven to nine

✅ Seeing means watching the promise happen

📖 He expects to witness God keep his word

# Psalms 92:12-15
# 🌴 The Righteous Flourish Like Trees
---
## 🌴 The Righteous Shall Flourish Like The Palm Tree

Verse seven already compared the wicked to grass that grows fast and dies young.

The palm tree is the opposite picture entirely.

Palm trees grow slowly and keep producing fruit for decades.

The contrast between the two trees is deliberate.

The righteous are pictured with lasting strength, not a quick burst of success.

🌾 Grass in verse seven fades fast

🌴 Palm trees grow slowly and last for decades

⚖️ The contrast between them is deliberate

📖 The righteous get lasting strength over quick success

## 🌲 He Shall Grow Like A Cedar In Lebanon

Cedars from Lebanon were famous for their great height and strength.

Solomon later built the temple with this exact wood.

It resisted rot and lasted for a very long time.

Comparing the righteous to a cedar pictures a life built to last.

Two different trees describe two different kinds of lasting strength.

🌲 Cedars of Lebanon were famous for their strength

🏛️ Solomon later built the temple with this wood

🌴 Palm and cedar picture two kinds of strength

📖 A life near God grows fruit and strength

## 🌳 Those That Be Planted In The House Of The LORD

"Planted" pictures roots set down permanently.

It is not like a plant sitting loose in a pot.

"The house of the LORD" names the temple, the center of Israel's worship.

Being planted there pictures a life rooted in nearness to God.

"The courts" were the temple's outer areas, open to gathered worshipers.

Flourishing here depends on staying rooted, not on a single visit.

🌳 Planted means roots set down permanently

🏛️ House of the LORD names the temple

👣 Nearness to God is not one visit

📖 Flourishing depends on staying rooted

## 🍂 They Shall Still Bring Forth Fruit In Old Age

Most plants slow down and stop producing as they age.

This verse promises the opposite for someone rooted in God.

"Fat and flourishing" pictures full, healthy vitality.

Old age here is described as a season of continued usefulness.

A life planted near God does not run out of purpose with time.

🍂 Most plants slow down with age

🌿 This verse promises the opposite

💪 Fat and flourishing means full vitality

📖 A rooted life keeps its purpose over time

## ⚖️ To Shew That The LORD Is Upright

"Upright" means completely fair and morally straight.

Every promise in this psalm exists to prove that one truth about God.

Protection, fruitfulness, and lasting strength all point back to it.

"He is my rock" names God as a foundation solid enough to build a life on.

"No unrighteousness in him" leaves no exception anywhere in God's character.

The psalm that opened with thanksgiving closes by naming who deserves it.

⚖️ Upright means fair with no crookedness

🪨 Rock names God as a solid foundation

🚫 No unrighteousness means no exception

📖 The psalm closes on who deserves the thanks
`.trim();

export const PSALMS_NINETY_TWO_PERSONAL_SECTIONS = parsePsalmsNinetyTwoRawNotes(PSALMS_NINETY_TWO_RAW_NOTES);
