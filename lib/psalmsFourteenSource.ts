export type PsalmsFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFourteenRawNotes(rawText: string): PsalmsFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 14:${startVerse}` : `Psalms 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 14 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FOURTEEN_RAW_NOTES = `# Psalms 14:1-3
# 😈 The Fool's Verdict
---
## 😐 The Fool Hath Said In His Heart

The word "fool" here does not mean someone with low intelligence.

In the Bible it names someone who lives as if God does not matter.

"In his heart" points to a settled belief, not a passing doubt.

This person has not built an argument against God.

He has simply decided to live without Him.

That decision will shape every choice that follows.

🧠 Fool means rejecting God morally

💭 In his heart means a settled belief

🚫 Not doubt but a decision

📖 The decision shapes what follows

## 🙅 There Is No God

This does not mean the fool has worked out a formal argument.

Almost no one in the ancient world argued that God does not exist at all.

The claim here is practical, not intellectual.

It means living as though God will never see or judge anything done.

Many people today still say they believe in God.

Their daily choices can say the same thing this fool said.

🙅 Not a formal argument here

👁️ Means living as if unseen

⚖️ Assuming God never judges

📖 Belief in name only says the same

## 🍎 They Are Corrupt, And Have Done Abominable Works

"Corrupt" means gone rotten, like fruit left too long in the sun.

The Hebrew picture is something ruined from the inside out.

"Abominable" describes actions that are morally repulsive to God.

This is not one bad choice.

It describes a whole character that has spoiled.

What a person believes about God shapes what they become.

🍎 Corrupt means rotten from within

🤢 Abominable means repulsive to God

🌱 Describes a whole spoiled character

📖 Belief shapes what a person becomes

## ⚖️ There Is None That Doeth Good

This line is not measuring good manners or occasional kindness.

It is measuring goodness by God's own standard.

Good here means action that matches God's character completely.

Judged that way, the verse says no one qualifies.

Paul later quotes this exact line in Romans chapter three.

He uses it to describe the whole human race, not just this fool.

⚖️ Good is measured by God's standard

🚫 No one meets that standard alone

📜 Paul quotes this in Romans three

📖 The verdict covers the whole human race

## 👀 The LORD Looked Down From Heaven

This pictures God actively watching the earth, not sitting far away.

The Bible often describes God's actions in human terms so people can picture them.

He does not need to lean down to see what is happening.

The image says His attention is already fully turned toward us.

Nothing happening among people goes unnoticed by Him.

👀 Pictures God actively watching earth

🗣️ Human terms help us picture God

🌍 His attention is already turned here

📖 Nothing happening escapes His notice

## 🔍 To See If There Were Any That Did Understand, And Seek God

"Understand" here does not mean simply knowing facts about God.

It means recognizing who God is and living like it is true.

"Seek" adds an active step beyond just agreeing God exists.

It pictures someone searching hard for something valuable.

God is looking for real recognition joined to real pursuit.

🧠 Understand means living like God is real

🔍 Seek means an active pursuit

💎 Like searching for something valuable

📖 God looks for both together

## 🐑 They Are All Gone Aside

This pictures a flock that has wandered off the path.

Think of sheep drifting away one slow step at a time.

No dramatic rebellion is needed to end up far from home.

Isaiah later uses this same picture for the whole human race.

Straying rarely feels like a decision while it is happening.

🐑 Pictures sheep wandering off the path

👣 Drifting happens one step at a time

📜 Isaiah uses the same picture later

📖 Straying rarely feels like a decision

## 🥛 They Are All Together Become Filthy

"Filthy" translates a Hebrew word close to spoiled or soured.

Think of milk left out until it turns.

It was fresh and useful once.

Something has now gone wrong all the way through.

This is the same rot from verse one, now covering everyone.

🥛 Filthy pictures milk gone sour

🔄 Once useful, now spoiled through

🌍 The description now covers everyone

📖 Verse one's rot spreads to all

## 🔁 No, Not One

This phrase leaves no room for a quiet exception.

Repeating "not one" makes the point impossible to soften.

Paul repeats this same line in Romans three about the whole human race.

No one earns a place outside this verdict on their own.

That hard truth is the very thing the rest of Scripture answers with grace.

🔁 Repetition removes any exception

📜 Paul repeats this in Romans three

🙅 No one qualifies alone

📖 Scripture answers this with grace

# Psalms 14:4-5
# 😨 Sudden Fear Comes
---
## 🔧 Have All The Workers Of Iniquity No Knowledge?

"Workers of iniquity" describes people who practice sin as a way of life.

This is not someone who slipped once and felt bad about it.

It describes a settled pattern, a job they keep showing up to.

The question is not really asking for information.

It is amazed disbelief that anyone could live this blind.

🔧 Workers of iniquity means a settled pattern

🔁 Not one slip but a repeated choice

❓ The question expresses disbelief, not curiosity

📖 Sin can become a job people keep

## 🍞 Who Eat Up My People As They Eat Bread

Bread was the most common food on any table in this culture.

Eating bread required no thought and no hesitation at all.

Comparing oppression to eating bread means it has become just as casual.

These people exploit others without a flicker of guilt.

Cruelty done without a second thought is its own kind of horror.

🍞 Bread was eaten without a thought

😐 Their cruelty has become just as casual

💔 They exploit others without guilt

📖 Effortless cruelty is its own horror

## 🙏 And Call Not Upon The LORD

"Call upon the LORD" means turning to Him in prayer and dependence.

These people never do that at all.

Their whole approach to life leaves God out of the room entirely.

The fool from verse one and the oppressor from verse four are the same person.

Both live as though they answer to no one.

🙏 Call upon means prayerful dependence

🚪 They leave God out entirely

🔗 The fool and the oppressor are the same

📖 Both live as if unaccountable

## 😨 There Were They In Great Fear

This is a sudden turn from confident oppression to real terror.

People who felt untouchable are now shown to be afraid.

The psalm does not explain exactly what triggers this fear.

It may be the sudden, unmistakable presence of God breaking into their false security.

Confidence built on ignoring God can collapse in a moment.

😨 Confident people suddenly grow afraid

❓ The exact trigger is not named

⚡ God's presence can break false security

📖 That kind of confidence can collapse fast

## 👑 For God Is In The Generation Of The Righteous

"Generation" here does not mean an age group like today's usage.

It means a company of people who trust and follow God.

God is not distant from this group the way the fool assumes.

He is present among them in a real, ongoing way.

That presence is exactly what the oppressors have never reckoned with.

👥 Generation means a company of believers

🏠 God dwells among this group

👑 His presence is real and ongoing

📖 Oppressors never reckoned with this

# Psalms 14:6-7
# 🎉 Hope Out Of Zion
---
## 😏 Ye Have Shamed The Counsel Of The Poor

"Counsel of the poor" describes a plan built on trusting God instead of power or money.

The wicked mock that plan as weak or naive.

Shaming someone's trust in God is treated here as a serious offense.

The poor person's confidence looks foolish only to someone who has rejected God already.

What looks weak to the proud can be real strength.

😏 Counsel of the poor means trusting God

🤡 The wicked mock this trust

⚠️ Shaming this trust is a serious offense

📖 Weakness to the proud can be real strength

## 🏰 Because The LORD Is His Refuge

"Refuge" pictures a fortress or shelter where danger cannot reach.

The poor person's trust is not naive if the shelter is real.

His confidence rests entirely on where he has run for safety.

The wicked mock the trust without ever testing the shelter themselves.

Real safety does not depend on what mockers believe about it.

🏰 Refuge means a real shelter

🛡️ Trust depends on the shelter's strength

🤔 Mockers never test the shelter themselves

📖 Safety does not depend on mockery

## 🏔️ Oh That The Salvation Of Israel Were Come Out Of Zion!

Zion refers to the hill in Jerusalem connected to God's presence and the temple.

This line is a longing prayer, not a flat statement of fact.

The writer wants rescue to come from the place where God is known to dwell.

That single word ties the nation's hope directly to God's own presence.

Hope here has an address, not just a feeling.

🏔️ Zion is tied to God's presence

🙏 This line is a longing prayer

📍 Hope has a specific place attached

📖 Hope here is not just a feeling

## ⛓️ When The LORD Bringeth Back The Captivity Of His People

This phrase is an old idiom for reversing someone's fortunes completely.

It does not necessarily describe a literal, future exile and return.

The same wording appears elsewhere in the Old Testament for any dramatic rescue.

David may be picturing any full turnaround, not one specific historical event.

The point is a complete undoing of what oppression had done.

⛓️ Bringeth back captivity means reversing fortune

🔄 Not necessarily one specific historical event

📜 The idiom appears elsewhere in scripture

📖 It pictures a complete turnaround

## 🎉 Jacob Shall Rejoice, And Israel Shall Be Glad

Jacob and Israel are two names for the same nation.

God renamed Jacob "Israel" back in Genesis after wrestling with him.

Using both names together covers the whole nation, past and present.

The psalm that opened with a bleak verdict on humanity ends in celebration.

Real hope was never the absence of a real problem.

🔀 Jacob and Israel name the same nation

📜 God renamed Jacob in Genesis

🎉 The psalm turns from bleak to joyful

📖 Hope does not require an absent problem
`.trim();

export const PSALMS_FOURTEEN_PERSONAL_SECTIONS = parsePsalmsFourteenRawNotes(PSALMS_FOURTEEN_RAW_NOTES);
