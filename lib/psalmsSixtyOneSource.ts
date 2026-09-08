export type PsalmsSixtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyOneRawNotes(rawText: string): PsalmsSixtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+61:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 61 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+61:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+61:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 61 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 61,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 61:${startVerse}` : `Psalms 61:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 61 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_ONE_RAW_NOTES = `# Psalms 61:1-4
# 🪨 A Cry For A Refuge Higher Than Himself
---
## Hear My Cry, O God

Cry does not mean a soft or polite request.

In the Psalms it is the word for a distress signal.

David is not making small talk with God.

He is calling out the way a drowning person shouts for help.

This prayer opens in real desperation, not polite formality.

😢 Cry means an urgent distress call
🆘 Not a soft polite request
🌊 Like a drowning person shouting
📖 This is real desperate prayer

## Attend Unto My Prayer

Attend means much more than simply hearing.

It carries the idea of leaning in and paying close attention.

Hear my cry already asked God to notice him.

Attend unto my prayer asks God to stay focused on him.

Hebrew poetry often repeats an idea using two different words.

Together the two lines ask for God's full attention, not a passing glance.

👂 Attend means leaning in closely
🔁 Repeats the plea in new words
🎵 Hebrew poetry often restates an idea
📖 David asks for God's full attention

## From The End Of The Earth Will I Cry Unto Thee

End of the earth is a Hebrew way of saying very far away.

It describes emotional distance more than exact geography.

Many scholars believe David wrote this psalm away from home.

He may have been fleeing during Absalom's rebellion.

Wherever he stood, it felt farther from God than he wanted.

🌍 End of the earth means very far away
💭 It describes emotional distance too
🏃 Possibly written during Absalom's rebellion
➡️ Distance made his need feel greater

## When My Heart Is Overwhelmed

Overwhelmed does not mean mildly stressed.

The Hebrew word pictures a heart wrapped up and unable to function.

Think of being pulled under by a wave you cannot fight.

That is the weight David is describing here.

He prays in the middle of that weight, not after it lifts.

😵 Overwhelmed means far more than stressed
🌊 Like being pulled under a wave
💔 A heart that cannot function
📖 He prays in the middle of it

## Lead Me To The Rock That Is Higher Than I

A rock in the Psalms often pictures a place of safety.

Higher than I means a place David cannot reach on his own strength.

He is not asking for a small boost.

He is asking to be carried there completely.

Only God can lift him that high.

🪨 Rock pictures a place of safety
⬆️ Higher than I means beyond his strength
🙌 He asks to be carried fully
📖 Only God can lift him that high

## Thou Hast Been A Shelter For Me

Shelter means a place to escape a storm.

It is somewhere to run when danger is closing in.

David is not describing a onetime rescue.

He is describing a place he has returned to before.

That history is part of why he trusts God now.

⛈️ Shelter means escape from a storm
🏃 Somewhere to run from danger
🔁 Not a onetime rescue
📖 A place he has trusted before

## And A Strong Tower From The Enemy

A strong tower was a fortified point built into a city wall.

Soldiers used it to watch for attackers and to make a stand.

Shelter pictures comfort.

Tower pictures defense.

Together they cover both safety and protection.

🗼 Tower means a fortified watch point
👀 Soldiers watched and defended there
🛡️ Shelter is comfort, tower is defense
📖 God is both hiding place and fortress

## I Will Abide In Thy Tabernacle For Ever

The tabernacle was the tent where God's presence lived among Israel.

It came before the Temple was ever built in Jerusalem.

Abide means to stay permanently, not just visit.

David is not asking for a short getaway.

He wants to live in God's presence for the rest of his life.

⛺ Tabernacle was God's tent among Israel
🏠 Abide means staying permanently
🚫 Not asking for a short visit
📖 He wants to live in God's presence

## I Will Trust In The Covert Of Thy Wings

Covert means a hidden covering, a place tucked out of sight.

The picture is a mother bird spreading her wings over her young.

Chicks under those wings stay warm and safe from danger.

David pictures himself tucked that close to God.

Selah likely marks a pause here, a moment to sit with that picture.

🕊️ Covert means a hidden covering
🐦 Mother bird pictures wings and safety
🤗 Chicks stay warm under her wings
📖 Selah invites a pause here

# Psalms 61:5-8
# 👑 A Vow To Praise And A Prayer For The King
---
## Thou, O God, Hast Heard My Vows

A vow was a promise made to God, often during a crisis.

People vowed to worship or give something once they were rescued.

David is not making a new vow here.

He is reminding God that his past vows were already heard.

That memory becomes part of his confidence now.

🤝 Vow means a promise made to God
🙏 Often made during a real crisis
📜 David recalls a vow already heard
📖 Past answers build present confidence

## Thou Hast Given Me The Heritage Of Those That Fear Thy Name

Heritage means an inheritance, something passed down and kept.

In Israel it often pictured land given as a lasting possession.

Here it means belonging to the people who fear God's name.

Fear does not mean being afraid of punishment.

It means honoring God with reverence and awe.

David counts himself among that inherited family.

🏞️ Heritage means an inheritance kept over time
👪 Belonging to those who fear God's name
😊 Fear here means reverence, not terror
📖 David counts himself in that family

## Thou Wilt Prolong The King's Life

This verse shifts from David's own cry to a prayer for the king.

In many psalms David prays about himself using the third person.

A long reign was seen as a sign of God's favor.

The prayer is not selfish.

It protects the whole people David leads.

👑 Shifts to a prayer for the king
🗣️ David often speaks of himself this way
🕊️ A long reign showed God's favor
📖 The prayer protects the whole nation

## And His Years As Many Generations

This line stretches the king's life far beyond a normal lifespan.

It is poetic language, not a literal number of years.

The wish is that his rule would outlast his own body.

Later readers saw this pointing toward an eternal kingdom.

That larger hope points forward to a king who never dies.

⏳ Years as generations means a very long reign
📜 Poetic language, not a literal count
👑 The king's rule outlasting his life
📖 Later read as pointing to an eternal king

## He Shall Abide Before God For Ever

Abide appears again here, echoing verse four.

There David wanted to abide in God's tabernacle.

Now the king is pictured abiding in God's presence too.

The whole psalm circles around the same longing for nearness.

Security is not measured in years but in staying close to God.

🔁 Abide echoes the same word from verse four
👑 Now applied to the king's future
🤝 Nearness to God is the real security
📖 The psalm circles around staying close

## O Prepare Mercy And Truth, Which May Preserve Him

Mercy and truth are two Hebrew words often paired together.

Mercy pictures God's loyal love that does not quit.

Truth pictures God's faithfulness, doing what He said He would do.

Together they describe God's steady character, not a mood.

David asks for those two things to guard the king like a wall.

❤️ Mercy means God's loyal love
✅ Truth means God's steady faithfulness
🧱 Together they guard like a wall
📖 God's character protects the king

## So Will I Sing Praise Unto Thy Name For Ever

The psalm began in distress and ends in praise.

David does not wait for the crisis to fully pass first.

He commits to praise as an ongoing habit, not a onetime reaction.

For ever picks up the same word already used for the tabernacle and the king.

The whole song is bound together by that one lasting word.

🎶 The psalm moves from distress to praise
🔁 Praise becomes an ongoing habit
🔗 For ever links back to earlier verses
📖 One lasting word ties the psalm together

## That I May Daily Perform My Vows

Daily is the key word in this final line.

David is not promising one grand gesture.

He is promising a small act of faithfulness repeated every day.

The vows from verse five are not forgotten once the danger passes.

They become a daily rhythm of worship instead.

📅 Daily is the key word here
🙅 Not one grand onetime gesture
🔁 A small act repeated every day
📖 Vows become a daily rhythm of worship
`.trim();

export const PSALMS_SIXTY_ONE_PERSONAL_SECTIONS = parsePsalmsSixtyOneRawNotes(PSALMS_SIXTY_ONE_RAW_NOTES);
