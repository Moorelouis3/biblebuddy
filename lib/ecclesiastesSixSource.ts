export type EcclesiastesSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesSixRawNotes(rawText: string): EcclesiastesSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 6:${startVerse}` : `Ecclesiastes 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Ecclesiastes 6 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_SIX_RAW_NOTES = `# Ecclesiastes 6:1-2
# 😔 An Evil Common Among Men
---
## There Is An Evil Which I Have Seen Under The Sun

"Evil" here does not mean a moral sin the man committed.

It means a painful, troubling wrongness in how life sometimes unfolds.

The Preacher says he witnessed this pattern himself, not just heard about it.

"Under the sun" is his repeated phrase for ordinary, everyday life.

This kind of evil is common, not rare, among people.

😔 Evil here means a painful wrongness
👀 The Preacher witnessed this personally
☀️ Under the sun means everyday life
📖 This kind of evil is common

## A Man To Whom God Hath Given Riches, Wealth, And Honour

This describes someone who seems to have every blessing already.

Riches, wealth, and honour stack together into total prosperity.

Wanteth nothing means his soul lacks no desire he wants filled.

This looks like the complete ancient definition of a blessed life.

The next line reveals a serious problem hiding inside it.

🎁 Riches wealth and honour stack together
😌 Wanteth nothing means no desire unfilled
✅ This looks like total ancient blessing
📖 A serious problem is hiding inside

## Yet God Giveth Him Not Power To Eat Thereof

"Power" here means the same thing it meant back in chapter five.

It is the actual ability to enjoy and use what you have.

This man owns everything but cannot bring himself to enjoy any of it.

Having the resource and having the capacity to enjoy it are two separate gifts.

🍽️ Power means the ability to enjoy
🔁 The same word appeared in chapter five
😶 He owns it but cannot enjoy it
📖 Having and enjoying are separate gifts

## But A Stranger Eateth It

"Stranger" here means someone outside the man's own household.

All the wealth gathered ends up in someone else's hands instead.

The Preacher calls this "vanity," his word for something empty and pointless.

He adds a stronger label here, calling it an "evil disease."

That word disease pictures a real sickness, not simple bad luck.

🚪 Stranger means someone outside the household
💸 The wealth ends up in another's hands
💨 Vanity means something empty and pointless
📖 Evil disease pictures real sickness not luck

# Ecclesiastes 6:3-6
# 👶 An Untimely Birth Is Better Than He
---
## If A Man Beget An Hundred Children, And Live Many Years

A hundred children and a long life were the ultimate ancient picture of blessing.

Large families and length of days were both signs of God's favor at that time.

The Preacher stacks up the two greatest measures of a good life someone could imagine.

He is about to test whether even that combination is enough.

👶 A hundred children means the ultimate blessing
📆 Long life was also a sign of favor
🏆 Two greatest measures of a good life
📖 He is about to test that idea

## And Also That He Have No Burial

Proper burial mattered enormously in the ancient world.

Losing it was treated as a real disgrace, not a minor inconvenience.

Even someone with a hundred children and a long life could still end up disgraced this way.

The Preacher pairs the greatest blessings with the worst possible ending.

⚰️ Burial mattered greatly in the ancient world
😔 Losing it was treated as disgrace
👶 Even the greatly blessed could end this way
📖 Greatest blessings paired with the worst ending

## I Say, That An Untimely Birth Is Better Than He

"Untimely birth" here means a child who never lived to be born alive.

That comparison is meant to shock the reader on purpose.

Losing everything before it starts is called better than gaining everything and never enjoying it.

The Preacher is making his strongest point yet about a life without real enjoyment.

😢 Untimely birth means a child who never lived
😮 The comparison is meant to shock
⚖️ Losing everything is called better here
📖 A life without enjoyment is the real loss

## For He Cometh In With Vanity, And Departeth In Darkness

The stillborn child enters and leaves without ever experiencing anything at all.

"Vanity" and "darkness" both describe complete emptiness, not just sadness.

That child never faced hunger, disappointment, or the weight of unenjoyed riches.

The Preacher is making a hard claim here.

Nothing is worse than having everything and enjoying none of it.

👶 The child experiences nothing at all
🌑 Vanity and darkness both mean emptiness
🚫 Never facing riches or their weight
📖 Having everything unenjoyed is the worst

## Yea, Though He Live A Thousand Years Twice Told

"Twice told" means doubled, so this pictures a life of two thousand years.

That number is deliberately impossible, a hyperbole meant to make a point.

Even that much time could not add real enjoyment to an empty life.

"One place" points to the grave, the destination everyone eventually reaches.

🔢 Twice told means a doubled number
😲 An impossible number used on purpose
⏳ More time cannot add real enjoyment
📖 One place means the grave everyone reaches

# Ecclesiastes 6:7-9
# 🍽️ The Appetite Is Not Filled
---
## All The Labour Of Man Is For His Mouth

Most human work in the ancient world existed to put food on the table.

"Mouth" stands for basic survival, the most fundamental human need.

"The appetite is not filled" admits that this hunger is never fully satisfied.

Work never actually finishes the job it was meant to do.

🍽️ Mouth stands for basic survival
🔁 Most labor exists to meet this need
😩 The appetite is never fully satisfied
📖 Work never finishes the job for good

## For What Hath The Wise More Than The Fool

This question undercuts a common assumption people make about wisdom.

Many believed a wise person automatically gets more out of life than a foolish one.

When it comes to basic needs like food, wisdom offers no real advantage.

The Preacher is not attacking wisdom itself, just this narrow claim about it.

❓ A common assumption gets challenged here
🧠 Wisdom was assumed to give more
🍞 Basic needs offer no real advantage
📖 The Preacher is not attacking wisdom itself

## What Hath The Poor, That Knoweth To Walk Before The Living

"Walk before the living" is an old way of describing how someone conducts themselves in public.

It means knowing proper behavior and how to carry yourself among other people.

A poor person can have that same social skill as anyone else.

Yet even that skill does nothing to fill the same basic hunger.

🚶 Walk before the living means public conduct
🎓 It means knowing proper social behavior
👥 The poor can share this same skill
📖 That skill still cannot fill real hunger

## Better Is The Sight Of The Eyes Than The Wandering Of The Desire

"The sight of the eyes" means being content with what is right in front of you.

"The wandering of the desire" means restlessly craving whatever you do not yet have.

The Preacher clearly favors present contentment over endless wanting.

He still calls even this better option "vanity," since neither one escapes life's limits.

👀 Sight of the eyes means present contentment
🌀 Wandering desire means restless craving
✅ Contentment is favored over endless wanting
📖 Even the better option is still vanity

# Ecclesiastes 6:10-12
# ❓ What Is Man The Better
---
## That Which Hath Been Is Named Already

This means human nature was already defined and named at creation.

Nothing about what a man fundamentally is remains a mystery to argue about.

The word "man" itself carries a settled, unchangeable meaning already fixed by God.

That fixed nature sets up the next line's argument about arguing with God.

📛 Man's nature was already named and fixed
🧩 Nothing about it remains a mystery
🔒 The meaning was already settled by God
📖 A fixed nature sets up the next point

## Neither May He Contend With Him That Is Mightier Than He

"Contend" means to argue or dispute a case in court.

No human being can out argue God about how he was made.

This closes the door on complaining about one's own nature or circumstances.

The mightier one here is clearly God himself, not any human rival.

⚖️ Contend means to argue a case
🚫 No one can out argue God
🔐 This closes off that kind of complaint
📖 The mightier one here is God

## Seeing There Be Many Things That Increase Vanity, What Is Man The Better

More words and more pursuits keep piling up without adding real profit.

"Increase vanity" means stacking emptiness on top of more emptiness.

The question "what is man the better" expects the answer nothing.

This echoes the same tired question this whole book keeps circling back to.

📈 More pursuits pile up without profit
🌀 Increase vanity means stacking emptiness
❓ The expected answer here is nothing
📖 The book keeps circling this same question

## Which He Spendeth As A Shadow

A shadow is a familiar Ecclesiastes picture for something brief and fleeting.

It moves fast and disappears the moment the light shifts.

A human life is described the very same way here.

"Vain life" does not mean a wasted life, it means a brief one.

🌗 A shadow means something brief and fleeting
💨 It moves fast then disappears entirely
⏳ Human life is pictured the same way
📖 Vain life means brief, not wasted

## For Who Can Tell A Man What Shall Be After Him Under The Sun

This question admits a real limit on human knowledge.

No one alive can see clearly into what comes after their own life.

That uncertainty is not a flaw in the Preacher's argument.

It is the edge every honest search for meaning eventually reaches.

❓ The question admits a real limit
🔮 No one can see what comes after
🎯 This uncertainty is the Preacher's whole point
📖 Every honest search reaches this same edge
`.trim();

export const ECCLESIASTES_SIX_PERSONAL_SECTIONS = parseEcclesiastesSixRawNotes(ECCLESIASTES_SIX_RAW_NOTES);
