export type EstherFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherFiveRawNotes(rawText: string): EstherFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 5:${startVerse}` : `Esther 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Esther 5 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_FIVE_RAW_NOTES = `# Esther 5:1-2
# 😨 Esther Risks The Inner Court
---
## 👑 Esther Put On Her Royal Apparel

This was not simply getting dressed for the day.

Esther put on her full royal clothing on purpose.

She wanted the king to see his queen before he saw anything else.

Every detail of this moment was planned in advance.

Her appearance was already part of the appeal she was about to make.

👑 Esther dressed with full intention
🎯 She wanted to look like the queen
📋 The whole moment was planned
📖 Her appearance began her appeal

## ⚖️ Stood In The Inner Court Of The King's House

She is now standing in the exact place that could cost her life.

Chapter four already explained the law behind the inner court.

Anyone entering uninvited faced death unless the king held out his scepter.

Esther is walking directly into that risk instead of avoiding it.

Fear did not stop her from making the choice she already committed to.

⚖️ The inner court carried real danger
🚪 Esther entered without being called
😨 She risked her life by standing there
📖 Commitment carried her past the fear

## ✋ The King Held Out The Golden Sceptre

The king's response came before Esther said a single word.

Holding out the sceptre was the one signal that spared her life.

Ahasuerus made that choice within seconds of seeing her standing there.

Nothing about his decision was guaranteed in advance.

God had already begun answering three days of fasting before Esther even spoke.

✋ The king held out the sceptre first
🎲 Her survival was not guaranteed
⏳ The answer came before she spoke
📖 The fasting was already being answered

## 🤲 Esther Drew Near And Touched The Top Of The Sceptre

Touching the sceptre completed the king's gesture of favor.

This physical act was the expected way to accept a king's mercy.

Esther was following exact court protocol, not being dramatic.

The danger of entering uninvited was now fully resolved.

She could finally speak without fear of instant judgment.

🤲 Touching the sceptre accepted the king's favor
📜 This act followed exact court protocol
✅ The danger of entering was now resolved
📖 Esther could finally speak freely

# Esther 5:3-5
# 🍽️ Esther's First Invitation
---
## 👑 What Wilt Thou Queen Esther, Even To The Half Of The Kingdom

This was not a literal offer to divide Persia in half.

"To the half of the kingdom" was a stock phrase for extreme generosity.

Ancient kings used it to show maximum favor, not to promise land.

The king is telling Esther she can ask for almost anything.

This is the exact opening Esther has been risking her life for.

👑 Half the kingdom was a stock phrase
🎁 It signaled extreme royal favor
🚫 Not a literal offer of land
📖 The door she risked her life for opened

## 🍽️ Let The King And Haman Come This Day Unto The Banquet That I Have Prepared

Esther does not ask for anything yet.

She had permission to request almost anything from the king.

Instead she invites him and Haman to a simple dinner.

This delay was not stalling for no reason.

She was choosing her moment instead of rushing into it.

🍽️ Esther requests a dinner instead
⏳ She delays her real request
🎯 She is choosing the right moment
📖 Patience shaped her whole strategy

## ⚡ Cause Haman To Make Haste, That He May Do As Esther Hath Said

The king wastes no time granting Esther's small request.

He personally orders Haman to hurry to the banquet.

Haman has no idea he is walking toward his own downfall.

He believes this invitation is simply an honor.

⚡ The king acts on the request immediately
😊 Haman sees only an honor
🕸️ He does not see the trap forming
➡️ Small requests can hide a bigger plan

# Esther 5:6-8
# ❓ The Second Invitation
---
## 🍷 At The Banquet Of Wine, What Is Thy Petition

"Banquet of wine" describes a feast centered on drinking together.

The king repeats his generous offer a second time.

He still does not know what Esther actually wants.

His patience with her keeps growing anyway.

🍷 Banquet of wine means a wine centered feast
🔁 The king repeats his generous offer
🤷 He still does not know her request
📖 His patience keeps growing

## 🗣️ My Petition And My Request Is

Esther begins to answer.

Then she stops before finishing her thought.

Verse eight shows she is still not ready to reveal her request.

She is building trust with the king one step at a time.

This kind of patience took real courage under pressure.

🗣️ Esther begins to answer
⏸️ She pauses before finishing
🤝 She is building trust step by step
📖 Patience took real courage here

## 🔁 Let The King And Haman Come To The Banquet That I Shall Prepare

Esther asks for the exact same setup a second time.

Two banquets in a row is not an accident.

Each delay raises the tension without revealing the actual danger.

The king has no idea what is coming.

🔁 A second banquet is requested
⏳ Tension builds with every delay
😐 The king suspects nothing yet
➡️ Delay was part of Esther's plan

## 🙇 I Will Do Tomorrow As The King Hath Said

Esther still speaks as though the king is deciding everything.

In reality she is the one steering this entire plan.

Her words stay humble even while she controls the outcome.

Wisdom here did not require announcing her own power.

🙇 Esther speaks with outward humility
🎯 She is actually directing events
🤫 She never announces her own control
📖 Wisdom does not need to announce itself

# Esther 5:9-13
# 💔 Haman's Joy Turns To Rage
---
## 😊 Haman Went Forth That Day Joyful And With A Glad Heart

Haman leaves the banquet on top of the world.

His joy is tied entirely to being personally invited by the queen.

Nothing about that joy has anything to do with real character or peace.

This feeling will not survive the next few verses.

😊 Haman's joy came from status alone
👑 An invitation from the queen thrilled him
⚠️ This joy will not last
📖 Status based joy is fragile

## 😤 When He Saw Mordecai, That He Stood Not Up, He Was Full Of Indignation

"Indignation" means anger mixed with wounded pride.

One man refusing to stand undoes all of Haman's good mood.

Mordecai's silent defiance here matches his refusal back in chapter three.

Haman cannot enjoy success next to one holdout he cannot control.

😤 Indignation means anger with wounded pride
🚷 Mordecai still refuses to stand
🔁 This matches his defiance in chapter three
📖 Pride cannot tolerate one holdout

## 🤐 Nevertheless Haman Refrained Himself, And Called For His Friends And Zeresh His Wife

Haman controls his anger in public for now.

He waits until he gets home before reacting to what he feels.

Calling together friends and his wife shows how much he needs validation.

Private anger often looks for an audience before it acts.

🤐 Haman hides his anger in public
🏠 He waits until he gets home
👥 He gathers friends and his wife
➡️ Private anger often seeks an audience

## 💰 Haman Told Them Of The Glory Of His Riches, And The Multitude Of His Children

Haman needs to hear his own success spoken out loud.

He lists his wealth first.

Then his many sons.

Then every promotion the king has given him.

He wants everyone in the room to agree he deserves it all.

💰 Haman lists his wealth first
👶 He counts his many sons
📈 He adds every royal promotion
📖 He wants his greatness confirmed

## 🎉 Esther Let No Man Come In With The King Unto The Banquet But Myself

Haman brags about being the only guest besides the king.

No one else, not even other officials, shared that invitation.

He is convinced this proves how special he has become.

Tomorrow's second invitation only inflates that same false confidence.

🎉 Haman was the only other guest
👑 He sees this as pure honor
🎈 His confidence keeps inflating
📖 One invitation cannot define real worth

## 🚷 Yet All This Availeth Me Nothing, So Long As I See Mordecai Sitting At The Gate

"Availeth" is an old way of saying helps or is worth.

Haman is admitting that none of his success feels like enough.

One man sitting silently at a gate outweighs everything else he owns.

Pride like this cannot rest until every last person bows to it.

📖 Availeth means helps or is worth
😤 Nothing Haman owns feels like enough
🚷 One holdout outweighs everything else
➡️ Unchecked pride never feels satisfied

# Esther 5:14
# 🪓 Zeresh's Deadly Advice
---
## 🗼 Let A Gallows Be Made Of Fifty Cubits High

A cubit measured about eighteen inches long.

Fifty cubits reached close to seventy five feet into the air.

That height made the structure visible across the whole city.

Zeresh wanted Mordecai's death to be a public spectacle.

A quiet execution was not enough for her plan.

📏 A cubit measured about eighteen inches
🗼 Fifty cubits reached about seventy five feet
👀 The height made it visible citywide
📖 Zeresh wanted a public spectacle

## ⚡ He Caused The Gallows To Be Made

Haman does not hesitate for even a moment.

He orders the gallows built before morning even arrives.

He fully expects to celebrate Mordecai's death by the next evening.

The rest of the book turns this exact structure against the man who built it.

⚡ Haman acts without any delay
🌙 The gallows is built overnight
😈 He expects to celebrate tomorrow
📖 This structure will turn against him
`.trim();

export const ESTHER_FIVE_PERSONAL_SECTIONS = parseEstherFiveRawNotes(ESTHER_FIVE_RAW_NOTES);
