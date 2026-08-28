export type EzraNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraNineRawNotes(rawText: string): EzraNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 9:${startVerse}` : `Ezra 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezra 9 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_NINE_RAW_NOTES = `# Ezra 9:1-2
# 📜 The Report Reaches Ezra
---
## 👑 The Princes Came To Me, Saying

"Princes" here means Israel's own community leaders, not foreign nobility.

These men reported directly to Ezra soon after his arrival in Jerusalem.

They were confessing a problem inside their own community, not accusing outsiders.

That made the sin harder to hide and harder to excuse.

👑 Princes means Israel's own leaders

📢 They reported the problem to Ezra

🪞 This was confession, not accusation

📖 The sin was inside their own camp

## 🚧 Have Not Separated Themselves From The People Of The Lands

"Separated" means staying distinct instead of blending in with neighboring nations.

This command traces back to Moses, long before Israel entered the land.

The goal was never ethnic purity.

The real goal was protecting worship of the one true God.

Marrying into idol worshiping families slowly pulled Israelite hearts toward other gods.

🚧 Separated means staying distinct

📜 The command traces back to Moses

🙏 The goal was pure worship, not ethnicity

📖 Foreign marriage often pulled hearts toward idols

## 🔥 According To Their Abominations

"Abominations" describes practices God found deeply detestable, especially idol worship.

Canaanite religion often included child sacrifice and ritual prostitution at local shrines.

The princes were not describing minor cultural habits.

They were describing worship of false gods creeping into Israelite homes.

🚫 Abominations means detestable practices

🔥 Canaanite worship included child sacrifice

🏠 This was creeping into Israelite homes

📖 Not minor habits, real idolatry

## 🌱 The Holy Seed Have Mingled Themselves

"Holy seed" means Israel's descendants, set apart by God for His purposes.

"Mingled" pictures two separate things blending until they can no longer be told apart.

Israel's identity as God's set apart people was dissolving through these marriages.

The princes and rulers led this failure instead of preventing it.

🌱 Holy seed means Israel, set apart

🌊 Mingled means blended, no longer distinct

💔 Israel's identity was dissolving

📖 Leaders led the failure, not just followed it

# Ezra 9:3-4
# 😢 Ezra's Extreme Grief
---
## ✂️ I Rent My Garment And My Mantle

"Rent" means torn, a deliberate act of tearing cloth by hand.

Tearing your own clothes was the ancient Near East's clearest sign of grief or horror.

Ezra tore not one but two garments, his everyday robe and his outer mantle.

This was not private sorrow, everyone in Jerusalem could see it happen.

✂️ Rent means torn by hand

😢 Torn clothes signaled grief or horror

👕 Ezra tore two garments, not one

📖 His grief was visible to everyone

## 😣 Plucked Off The Hair Of My Head And Of My Beard

Pulling out your own hair was an extreme, physical expression of anguish.

A man's beard carried real social dignity in this culture.

Damaging it on purpose showed Ezra did not care how he looked anymore.

Nothing about this reaction was calm or controlled.

😣 Plucking hair showed extreme anguish

🧔 A beard carried real dignity then

🙈 Ezra no longer cared how he looked

📖 His reaction was raw, not staged

## 😶 Sat Down Astonied

"Astonied" means stunned into silence, unable to move or speak normally.

Ezra had just arrived from Babylon with royal support and temple treasure.

Discovering this sin so soon must have felt like a gut punch.

Sometimes grief is too heavy for words, only stunned silence fits.

😶 Astonied means stunned silent

🎁 Ezra had just arrived with royal favor

👊 The timing made the news worse

📖 Some grief is too heavy for words

## 😨 Every One That Trembled At The Words Of The God Of Israel

These were people who took God's commands seriously enough to feel real fear.

They gathered around Ezra once they saw his reaction.

Not everyone in Jerusalem cared about this sin, but this group clearly did.

A shared conscience drew a crowd around one grieving man.

😨 Trembled means feared God's words

🚶 They gathered around Ezra

🎯 Not everyone in Jerusalem cared, they did

📖 Shared conscience drew a crowd together

# Ezra 9:5-6
# 🙏 Ezra's Prayer Begins
---
## 🕰️ At The Evening Sacrifice I Arose Up From My Heaviness

The evening sacrifice was a set time of daily worship at the temple.

Ezra had reportedly sat stunned since morning, hours without moving.

He chose that fixed hour of prayer to finally act on his grief.

Grief eventually has to turn into a response, not just silence.

🕰️ Evening sacrifice was a set worship hour

⏳ Ezra had sat stunned for hours

🙏 He acted at that fixed hour

📖 Grief eventually calls for a response

## 🙌 I Fell Upon My Knees, And Spread Out My Hands

Kneeling with open hands was a common posture for urgent prayer.

Open hands pictured someone with nothing to offer but an honest plea.

Ezra was not reciting a formal ritual, he was pleading like a desperate man.

His body matched what his heart was already feeling.

🙌 Open hands pictured an honest plea

🦵 Kneeling showed urgent, humble prayer

😔 This was pleading, not ritual

📖 His body matched his heart

## 😳 I Am Ashamed And Blush To Lift Up My Face

"Blush" here means Ezra felt too disgraced to even look up toward heaven.

He was not praying on behalf of his own sin alone.

He was carrying the shame of his whole people as if it were his own.

A true leader can feel a nation's guilt personally.

😳 Blush means too ashamed to look up

🤝 Ezra carried the people's guilt too

👑 A leader can feel a nation's shame

📖 This was not only his own sin

## 🗼 Our Trespass Is Grown Up Unto The Heavens

Sin is pictured here piling up so high it reaches all the way to God.

Ezra was not describing one bad decision by a few families.

He meant generations of failure had built into something enormous.

Naming the size of the problem honestly was the first step of his prayer.

🗼 Sin pictured as piling up to heaven

📚 This was not one bad decision

⏳ Generations of failure had built up

📖 Naming the size honestly came first

# Ezra 9:7-9
# ⛓️ A History Of Judgment And Grace
---
## 📜 Since The Days Of Our Fathers Have We Been In A Great Trespass

Ezra traces this sin back for generations, not just to his own lifetime.

Kings and priests were named specifically because they should have known better.

Leaders carry more responsibility than the people who simply follow them.

This confession refused to blame only the previous generation.

📜 The trespass went back generations

👑 Kings and priests are named directly

⚖️ Leaders carry more responsibility

📖 Ezra refused to blame only the past

## ⚔️ Delivered Into The Hand Of The Kings Of The Lands

The exile is in view here, when Babylon conquered Judah and carried away its people.

"The sword" and "captivity" were the actual, physical cost of the nation's sin.

"Confusion of face" means public shame, being humiliated in front of other nations.

Ezra listed real consequences, not vague spiritual language.

⚔️ This describes Babylon's conquest of Judah

🔗 Sword and captivity were real costs

😳 Confusion of face means public shame

📖 These were real, not vague, consequences

## 🔩 A Nail In His Holy Place

A "nail" here pictures something driven in to hold firmly, like a tent peg.

Ezra meant a secure foothold, God's people planted again in Jerusalem.

After exile scattered the nation, even a small foothold felt like a miracle.

God had not just spared them, He had anchored them back home.

🔩 A nail pictures a firm foothold

🏕️ Israel was planted back in Jerusalem

😮 A small foothold felt miraculous

📖 God anchored His people back home

## 🌱 A Little Reviving In Our Bondage

"Reviving" means new life and strength after a period of near collapse.

Ezra called it "little" on purpose, this recovery still felt fragile.

The exiles were technically free to return, yet still under Persian rule.

Even partial mercy still counted as real mercy to Ezra.

🌱 Reviving means new strength after collapse

🤏 Ezra called it little on purpose

🏛️ They were still under Persian rule

📖 Partial mercy still counted as real mercy

# Ezra 9:10-12
# 🚫 The Command Restated
---
## ❓ What Shall We Say After This?

Ezra is not really looking for advice with this question.

He is admitting that no excuse could possibly cover this failure.

Sometimes the most honest prayer starts by admitting words are not enough.

Silence before God can be more honest than a rehearsed defense.

❓ This question is rhetorical, not literal

🙊 No excuse could cover this failure

🤐 Honest prayer admits words fall short

📖 Silence beat a rehearsed defense here

## 🧼 An Unclean Land With The Filthiness Of The People

"Unclean" here is about spiritual defilement, not literal dirt.

The land was called unclean because of the idol worship practiced on it.

This language echoes warnings God gave through the prophets long before the exile.

Ezra was quoting the law, not inventing a new standard.

🧼 Unclean means spiritually defiled, not dirty

🕯️ Idol worship defiled the land itself

📜 This echoes older prophetic warnings

📖 Ezra quoted the law, did not invent it

## 🚫 Give Not Your Daughters Unto Their Sons

The command blocked marriage in both directions, sons and daughters alike.

The concern was never a family's bloodline or ethnic background.

The real danger was a spouse pulling the family toward foreign gods.

Israel's faith, not its ancestry, was what this law protected.

🚫 The ban covered both directions

🩸 Bloodline was never the real concern

🙏 A spouse could pull hearts toward idols

📖 Faith, not ancestry, was being protected

## 💪 That Ye May Be Strong, And Eat The Good Of The Land

Obedience here was tied to a promised blessing, not just a bare rule.

"Eat the good of the land" pictures lasting prosperity for the whole family.

The command was never designed to punish Israel or make life smaller.

It protected the very inheritance God wanted to give them.

💪 Obedience was tied to real blessing

🍇 Good of the land means prosperity

🚫 The command was not meant to punish

📖 It protected their promised inheritance

# Ezra 9:13-15
# ⚖️ Standing Guilty Before God
---
## ⚖️ Punished Us Less Than Our Iniquities Deserve

Ezra openly admits the exile was less severe than the sin actually earned.

This is not false modesty, it is an honest read of their own guilt.

Mercy, by definition, always gives less punishment than a sin deserves.

Ezra names that mercy instead of quietly assuming he was owed it.

⚖️ Ezra admits the punishment was lighter

🙏 This was honest, not false modesty

💗 Mercy always gives less than deserved

📖 Ezra named the mercy, not the debt

## 🤝 Join In Affinity With The People Of These Abominations

"Affinity" means a close bond formed through marriage into another family.

Ezra is describing the exact sin the princes reported back in verse two.

Falling into the same sin again, right after being shown mercy, would be worse.

A second failure carries more weight than the first one did.

🤝 Affinity means a bond formed by marriage

🔁 This repeats the sin from verse two

😬 A second failure follows fresh mercy

📖 The same sin twice carries more weight

## 🌱 So That There Should Be No Remnant Nor Escaping

A "remnant" is the small surviving group left after judgment or disaster.

Ezra is naming the worst possible outcome, total destruction with no survivors left.

He is not exaggerating for effect, he understood this was a real possibility.

Fear this deep only makes sense next to a sin this serious.

🌱 Remnant means the small group left

💀 Total destruction was the real fear

😨 Ezra was not exaggerating this danger

📖 Real fear matched a real sin

## ⚖️ We Cannot Stand Before Thee Because Of This

"Stand before" pictures appearing in a courtroom, ready to be judged.

Ezra admits Israel has no defense to offer if God judges them now.

The prayer ends without a plan or a promise, only open confession.

Sometimes the most honest place to end a prayer is admitting the guilt is real.

⚖️ Stand before pictures a courtroom scene

🙊 Israel had no defense to offer

🤐 The prayer ends without a plan

📖 Honest confession was the only ending
`.trim();

export const EZRA_NINE_PERSONAL_SECTIONS = parseEzraNineRawNotes(EZRA_NINE_RAW_NOTES);
