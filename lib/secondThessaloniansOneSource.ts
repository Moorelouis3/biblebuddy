export type SecondThessaloniansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondThessaloniansOneRawNotes(rawText: string): SecondThessaloniansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondThessaloniansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Thessalonians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Thessalonians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Thessalonians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Thessalonians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Thessalonians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Thessalonians 1:${startVerse}` : `2 Thessalonians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Thessalonians 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_THESSALONIANS_ONE_RAW_NOTES = `# 2 Thessalonians 1:1-2
# ✉️ Grace And Peace To Thessalonica
---
## 📛 Paul, And Silvanus, And Timotheus

"Silvanus" is the same man known elsewhere in the Bible as Silas.

Greek speaking regions used the longer name, Latin speaking regions used the shorter one.

Timotheus is the familiar missionary companion Timothy.

These same three names opened the first letter to the Thessalonians too.

This second letter comes from the same team only a short time later.

📛 Silvanus is the same man as Silas
🤝 Timotheus is Timothy, Paul's companion
🔁 Same three authors as the first letter
📖 This letter follows soon after the first

## 🎁 Grace Unto You, And Peace

"Grace" here means undeserved kindness from God, not something earned by good behavior.

"Peace" means a right standing with God, not simply a calm feeling.

Paul opens nearly every letter he writes with this exact pair of words.

Grace always comes first in his greetings, never peace standing alone.

Grace is the reason peace becomes possible at all.

🎁 Grace means undeserved kindness
🕊️ Peace means right standing with God
✍️ Paul's standard greeting pair
📖 Grace comes before peace, always

# 2 Thessalonians 1:3-5
# 💛 Faith Growing Under Pressure
---
## ⚖️ We Are Bound To Thank God Always

"Bound" means Paul feels a real obligation, not that thanks is optional politeness.

He calls it "meet," an old word for fitting or appropriate.

Paul is not flattering the Thessalonians here.

He is stating a plain moral duty, the way gratitude is owed to God.

Their growing faith makes thanks the only honest response.

⚖️ Bound means a felt obligation
✅ Meet means fitting or appropriate
🚫 Not polite flattery
📖 Growing faith makes thanks owed

## ❤️ The Charity Of Every One Of You All Toward Each Other Aboundeth

"Charity" in the King James Bible means love, not giving money to the poor.

It is the same word translated "love" in 1 Corinthians thirteen.

"Aboundeth" means it keeps increasing, not just staying steady.

Paul notices this love spreading between the believers themselves, not only toward outsiders.

A church that loves its own members well becomes able to love anyone else too.

❤️ Charity means love, not money
📜 Same word as 1 Corinthians 13
📈 Aboundeth means still increasing
➡️ Love inside the church enables love outside it

## 📣 We Ourselves Glory In You In The Churches Of God

Paul is not only praising them to their faces.

He is telling other churches about them as a living example.

"Glory" here means boasting with real pride, not empty flattery.

Their endurance under pressure became a story Paul used to encourage other believers.

This church likely never knew their struggle was someone else's encouragement.

📣 Glory means boasting with real pride
🏛️ Paul tells other churches about them
🧭 Their endurance became an example
📖 Their story helped someone they never met

## 👁️ A Manifest Token Of The Righteous Judgment Of God

"Manifest token" means a visible proof, something anyone could see for themselves.

Their patience under persecution is the proof Paul points to.

It shows God's judgment is righteous, meaning fair and right, not harsh or random.

Suffering for the kingdom is treated here as evidence of belonging to it.

The proof was not a miracle.

It was ordinary endurance, watched by everyone around them.

👁️ Manifest token means visible proof
⚖️ Righteous means fair, not harsh
🏆 Suffering becomes evidence of belonging
📖 Ordinary endurance was the proof

# 2 Thessalonians 1:6-10
# 🔥 The Lord Jesus Revealed In Flaming Fire
---
## ⚖️ Recompense Tribulation To Them That Trouble You

"Recompense" means to pay back exactly what is deserved.

This is not Paul encouraging personal revenge.

It describes God himself settling the account in the end.

"Them that trouble you" names the people actively persecuting the church.

Delayed justice here is never justice denied.

⚖️ Recompense means paying back what is owed
🚫 Not personal revenge
👆 God settles this account himself
📖 Delayed justice is not denied justice

## 😌 Rest With Us, When The Lord Jesus Shall Be Revealed

"Rest" here means relief, not a nap or a vacation.

It is relief from the pressure and persecution just described.

"Revealed" translates a word that means something hidden finally uncovered.

Christ is pictured as already present but not yet visible to the world.

That relief and that reveal happen on the very same day.

😌 Rest means relief, not a nap
🎭 Revealed means hidden made visible
👑 Christ is present but not yet seen
📖 Relief and revealing arrive together

## 👼 With His Mighty Angels

Angels accompanying Christ's return is a picture used elsewhere in the New Testament.

Jesus himself describes angels gathering with him in Matthew twenty five.

"Mighty" marks them as powerful servants carrying out a command, not decoration.

Their presence turns this into a visible, unmistakable arrival.

No one will be able to claim they missed it or misunderstood it.

👼 Angels appear with Christ elsewhere too
📜 Matthew 25 pictures this same scene
💪 Mighty means powerful, not decorative
📖 This arrival will be unmistakable

## 🔥 In Flaming Fire Taking Vengeance

Fire pictures judgment throughout the Old Testament, not just destruction.

"Vengeance" here means full and final justice, not an angry outburst.

It is God acting, never a believer's excuse to retaliate.

Isaiah and Daniel both describe God's judgment using fire this same way.

Paul is borrowing that same prophetic picture for his own readers.

🔥 Fire pictures judgment, not just ruin
⚖️ Vengeance means full, final justice
🙅 Never a reason for personal revenge
📖 Borrowed from Isaiah and Daniel

## 🙈 That Know Not God, And That Obey Not The Gospel

This verse actually names two separate groups of people.

The first group never knew God at all.

The second group heard the gospel clearly and refused it anyway.

Both groups face the same judgment, ignorance and open rejection alike.

Hearing the truth and refusing it is treated here as its own serious choice.

🙈 Group one never knew God
🙉 Group two heard and refused
⚖️ Both face the same judgment
📖 Refusing truth is a real choice

## 🚪 Punished With Everlasting Destruction From The Presence Of The Lord

This does not describe a quick ending followed by nothing at all.

"Everlasting" means the separation itself never ends.

"From the presence of the Lord" means cut off from God himself, not just from a place.

The real weight of this punishment is relational, not only physical.

Being shut out of God's presence forever is the destruction being described.

⏳ Everlasting means it never ends
🚪 Cut off from God's presence
💔 The weight here is relational
📖 Permanent separation, not a quick end

## ✨ To Be Glorified In His Saints

"Saints" simply means believers, ordinary people set apart for God.

It never describes a small, specially holy class of Christians.

"Glorified in" means Christ's own glory shows up through them, not merely beside them.

Everyone who testified about Jesus becomes part of displaying who he is.

Paul reminds them their own belief was part of that same testimony.

✨ Saints means ordinary believers
🚫 Not a special holy class
👑 Christ's glory shows through them
📖 Their own faith was part of that story

# 2 Thessalonians 1:11-12
# 🙏 Paul's Prayer For Them
---
## 📯 Count You Worthy Of This Calling

"Calling" here means God's own invitation into salvation, not a job title.

Paul is not asking God to make them worthy through their own effort.

He is asking God to complete what his calling already started.

The emphasis sits on God acting, not on human striving.

Prayer here becomes dependence, not a to do list.

📯 Calling means God's own invitation
🙅 Not earned through personal effort
🤲 God completes what he started
📖 Prayer here means dependence

## 😊 Fulfil All The Good Pleasure Of His Goodness

"Good pleasure" means God's own kind purpose, something he delights in doing.

It is not a reluctant obligation God is forced to keep.

"Goodness" names the source that purpose flows from.

Paul prays that this purpose reaches its full completion in them.

God's kindness toward them was never halfhearted to begin with.

😊 Good pleasure means God's own delight
🚫 Not a reluctant obligation
🌊 Goodness is the source of it
📖 God's kindness was never halfhearted

## 🔁 The Name Of Our Lord Jesus Christ May Be Glorified In You

This closes the chapter the same way the whole prayer began, pointing back to Christ.

"Glorified in you" repeats the same idea from verse ten about the saints.

Their changed lives were meant to put Christ's own name on display.

"Ye in him" adds that the honor runs in both directions.

Christ is glorified through them, and they are honored through their place in him.

🔁 Echoes the glory language from verse 10
✨ Their lives display Christ's name
🤝 Honor flows in both directions
📖 Chapter ends exactly where it began, on Christ
`.trim();

export const SECOND_THESSALONIANS_ONE_PERSONAL_SECTIONS = parseSecondThessaloniansOneRawNotes(
  SECOND_THESSALONIANS_ONE_RAW_NOTES
);
