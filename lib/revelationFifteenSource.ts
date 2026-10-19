export type RevelationFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationFifteenRawNotes(rawText: string): RevelationFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 15:${startVerse}` : `Revelation 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Revelation 15 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_FIFTEEN_RAW_NOTES = `# Revelation 15:1-2
# 😇 Seven Angels And The Sea Of Glass
## ⚡ Another Sign In Heaven, Great And Marvellous

A sign here does not mean a magic trick or a show.

It means a symbol that carries a message still to come.

John already called earlier visions signs in this same book.

Each one points forward to an event God is about to bring.

This sign introduces the final stretch of his judgment on the earth.

🔮 A sign means a symbol with a message

📜 John used this word for earlier visions too

⏳ Each sign points to something still coming

📖 This sign opens the final stage of judgment

## 🔥 The Seven Last Plagues

The word last here means final, not least severe.

Revelation already described two earlier waves of judgment.

Those were the seven seals and the seven trumpets.

This third wave of seven is the last one.

Nothing comes after these plagues are finished.

🔥 Last means final, not least severe

📯 Seals and trumpets came earlier

🥣 These are the third and final set

📖 God is finishing what he started

## 🌊 A Sea Of Glass Mingled With Fire

This sea of glass already appeared once before, in Revelation chapter four.

There it looked calm and clear, like a floor of crystal before God's throne.

Here it is mingled with fire, meaning fire mixes into it.

The fire likely pictures the fiery trial the saints just came through.

Calm worship and real suffering sit side by side in this one picture.

🌊 This sea first appeared in Revelation four

💎 It once looked calm like crystal

🔥 Fire now mixes into the glass

📖 Worship and suffering appear together here

## 🛡️ Gotten The Victory Over The Beast

These people refused to worship the beast described back in Revelation chapter thirteen.

They did not bow to his image or accept the mark of his number.

Many of them were killed for that refusal.

John still pictures them standing, not defeated.

Their victory did not come from surviving physically.

It came from staying faithful until the end.

🛡️ They refused the beast from chapter thirteen

🚫 They rejected his image and his mark

⚰️ Many of them died for that choice

📖 Faithfulness counted as victory, not survival

# Revelation 15:3-4
# 🎵 The Song Of Moses And The Lamb
## 🎶 The Song Of Moses The Servant Of God, And The Song Of The Lamb

These are not two separate songs with two separate messages.

The song of Moses points back to Exodus chapter fifteen.

There, Israel sang after God destroyed Pharaoh's army in the sea.

The song of the Lamb points to an even greater rescue through Christ.

Both songs praise the same kind of God.

He saves his people from a tyrant, every time.

🎶 This is not two separate messages

🌊 Moses sang this after Exodus fifteen

🐑 The Lamb's song points to a greater rescue

📖 God saves his people from every tyrant

## ⚖️ Just And True Are Thy Ways, Thou King Of Saints

Just means God's actions are always fair.

True means his words always match reality.

The ones singing call God King of saints here.

That title means he rules over everyone who belongs to him.

Their praise names both his fairness and his trustworthy character.

Neither trait ever competes with the other in God.

⚖️ Just means his actions are fair

✅ True means his words match reality

👑 King of saints means he rules his people

📖 Fairness and truth never compete in God

## 🙇 For Thou Only Art Holy

Holy means set apart, completely different from anything else.

God is not simply the best among many gods.

He is in a category no one else shares.

This is why the song says only, not merely most holy.

Nothing and no one else qualifies for that word in the same way.

🙇 Holy means set apart completely

🚫 God is not just the best option

🏆 He belongs in his own category

📖 Only means nothing else compares

## 🌍 All Nations Shall Come And Worship Before Thee

This is a promise about the future, not a description of the present.

Right now, plenty of nations do not worship God at all.

The verse says a day is coming when that will change.

Every nation eventually will bow before him, not just Israel.

This widens the song beyond one people to the whole world.

🌍 This describes the future, not today

🙅 Not every nation worships God right now

🙇 One day every nation will bow

📖 The song reaches far beyond Israel alone

# Revelation 15:5-8
# 🏛️ The Temple Filled With Smoke
## 📜 The Temple Of The Tabernacle Of The Testimony

The tabernacle of the testimony was the tent Israel carried in the wilderness.

Inside it sat the ark holding the stone tablets of the law.

Those tablets were called the testimony because they testified to God's covenant.

This heavenly temple is the true version that the earthly tent copied.

Its opening here means the covenant behind this judgment is now in view.

📜 Testimony means the stone tablets of the law

⛺ The tabernacle was Israel's wilderness tent

🏛️ Heaven holds the true version of that tent

📖 This judgment is tied to God's covenant

## 👕 Clothed In Pure And White Linen

Pure white linen was priestly clothing in the Old Testament.

These seven angels are not random enforcers of violence.

They come dressed like priests carrying out a sacred task.

Golden girdles, or sashes, complete that same priestly picture.

Christ himself wore a golden girdle back in Revelation chapter one.

Judgment here comes from a priest, not a raging soldier.

👕 White linen was priestly clothing

⚔️ These angels are not random enforcers

🎗️ Golden girdles matched that priestly image

📖 Christ wore a golden girdle too

## 🥣 Seven Golden Vials Full Of The Wrath Of God

Vials here does not mean small glass bottles.

The word means wide, shallow bowls used for pouring.

Each bowl holds a full portion of God's wrath.

Nothing in them is held back or watered down.

When judgment finally pours out, it pours out completely.

🥣 Vials means wide bowls, not bottles

💧 Each bowl is poured out completely

🚫 Nothing in them is held back

📖 This wrath holds nothing back at all

## 🚪 Till The Seven Plagues Of The Seven Angels Were Fulfilled

No one, not even an angel, may enter the temple right now.

That includes anyone who might normally plead or intercede there.

The door stays shut until every one of the seven plagues is finished.

This signals that the time for appeal has passed.

Judgment, once started here, is going to run its full course.

🚪 No one may enter the temple now

🙅 Not even intercession happens during this time

⏳ Nothing stops until all seven plagues finish

📖 This judgment will run its full course
`.trim();

export const REVELATION_FIFTEEN_PERSONAL_SECTIONS = parseRevelationFifteenRawNotes(REVELATION_FIFTEEN_RAW_NOTES);
