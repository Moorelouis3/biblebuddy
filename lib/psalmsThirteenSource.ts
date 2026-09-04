export type PsalmsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirteenRawNotes(rawText: string): PsalmsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 13:${startVerse}` : `Psalms 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 13 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTEEN_RAW_NOTES = `# Psalms 13:1-2
# 😢 How Long O LORD
---
## 😢 How Long Wilt Thou Forget Me

David is not claiming God has actually forgotten him.

"Forget" here pictures memory being wiped out completely.

David is naming a feeling, not stating a fact about God.

This same question repeats four times in the psalm's first two verses.

Honest pain can ask hard questions without losing real faith.

😢 Forget means feeling completely abandoned

❓ How long repeats four times here

🙏 Pain and faith can coexist

📖 Honest complaint is not unbelief

## 🙈 Hide Thy Face From Me

"Hide thy face" pictures God turning away on purpose.

In the Old Testament, a king's face turned toward someone meant favor.

A face turned away meant judgment or silence.

David feels like God has stopped looking his way.

This image appears throughout the Psalms during seasons of suffering.

Feeling unseen by God is a pain the Bible takes seriously.

🙈 Hide thy face means turned away

👑 Kings turning toward someone showed favor

😔 David feels unseen by God

📖 Scripture takes this pain seriously

## 🤔 Take Counsel In My Soul

"Take counsel in my soul" means turning a problem over alone in his mind.

David has no answer, so he keeps arguing with himself.

"Sorrow in my heart daily" shows this is not a single bad day.

The ache returns morning after morning without relief.

Endless inner arguing is its own kind of exhausting suffering.

🤔 Wrestling with a problem alone

🔄 No answer ever seems to arrive

📅 Daily means this sorrow keeps returning

📖 Unanswered pain can wear a person down

## 👑 Mine Enemy Be Exalted Over Me

"Exalted" means lifted up high, celebrated as the clear winner.

David fears his enemy gets to gloat over his downfall.

Scripture never names this enemy specifically in the psalm.

It could be a person, a sickness, or a whole hostile situation.

Four straight questions in two verses stack up all of David's fear.

👑 Exalted means the clear winner

😨 David fears his enemy gloating

❓ The enemy is never named here

📖 Four questions stack up his fear

# Psalms 13:3-4
# 🙏 Consider And Hear Me
---
## 🙏 Consider And Hear Me O LORD My God

David moves from complaining to actually asking for something.

"Consider" means look closely, not just glance in his direction.

"Hear me" asks for an answer, not only silent attention.

Naming God "my God" claims a personal relationship in the middle of pain.

The prayer turns from venting into a direct request.

🙏 Consider means careful attention

👂 Hear me asks for a real answer

🤝 My God claims a personal relationship

📖 Complaint turns into direct request

## 👀 Lighten Mine Eyes

"Lighten mine eyes" means restore strength and life to his tired body.

Dim, heavy eyes were an old picture for exhaustion and near collapse.

David is not asking for better eyesight.

He is asking God to revive him before he has nothing left.

Strength itself feels like it is running out.

👀 Lighten mine eyes means restore strength

😴 Dim eyes pictured deep exhaustion

🙅 Not a request for better eyesight

📖 David asks to be revived, not just seen

## 💀 Sleep The Sleep Of Death

"Sleep the sleep of death" is an old way of saying he could die.

Sleep was a common Bible picture for death's stillness.

David is not being dramatic for effect here.

Real physical danger sits behind this prayer, not just sadness.

Fear of dying under crushing grief was a real ancient experience.

💀 Sleep of death means dying

🌙 Sleep pictured death's total stillness

⚠️ Real danger stands behind this prayer

📖 Grief here carries physical danger too

## 🏆 Mine Enemy Say I Have Prevailed Against Him

"Prevailed" means won completely, leaving nothing for the loser.

David does not want his enemy to get to celebrate.

A private struggle now carries a public reputation at stake.

Losing here would look like proof that God abandoned him.

🏆 Prevailed means winning completely

🗣️ David fears public gloating from his enemy

👀 Others are watching this outcome too

📖 His reputation and God's honor connect

## 😬 Those That Trouble Me Rejoice When I Am Moved

"Moved" here means shaken, stumbling, or falling under pressure.

David's enemies are watching closely for exactly that moment.

They would celebrate his collapse, not just his defeat.

Public shame would follow right behind any visible failure.

😬 Moved means shaken or stumbling

👀 Enemies are watching for his fall

🎉 They would celebrate his failure

📖 Public shame would follow any collapse

# Psalms 13:5-6
# 🎶 Trust Turns To Song
---
## 🔀 I Have Trusted In Thy Mercy

The psalm suddenly shifts from questions to a settled decision.

"But" signals a turn away from fear toward trust.

"Mercy" here means God's loyal, covenant love, not a passing feeling.

David chooses to trust that love before his circumstances actually change.

🔀 But marks a sudden turn here

🤝 Mercy means God's loyal covenant love

⏳ Trust comes before circumstances improve

📖 Faith can choose trust while still waiting

## 🎉 My Heart Shall Rejoice In Thy Salvation

"Salvation" here does not mean the danger has already ended.

David's rejoicing rests on what God will do, not what has happened yet.

This is trust reaching ahead of the actual rescue.

Joy in this verse is a decision, not just a reaction.

🎉 Salvation does not mean danger already ended

⏩ Rejoicing reaches ahead of the actual rescue

🧠 Joy here is a choice David makes

📖 Trust can celebrate before rescue arrives

## 🎶 I Will Sing Unto The LORD

David moves from private trust into public praise.

Singing turns a private prayer into something others can hear.

This mirrors how the psalm itself will be sung later.

Worship becomes the natural next step after real trust.

🎶 Singing turns trust into public praise

👂 Others could hear this declared aloud

🔁 The psalm itself was meant to be sung

📖 Real trust naturally leads to worship

## 🎁 He Hath Dealt Bountifully With Me

"Dealt bountifully" means treated generously, giving more than what was owed.

David says this before his crisis is even fully resolved.

He is remembering God's past generosity, not just hoping for future help.

The psalm that opened in despair ends by counting God's gifts.

🎁 Bountifully means far more than owed

⏪ David remembers God's past kindness here

🔄 The psalm ends far from where it began

📖 Despair gave way to counted blessings
`.trim();

export const PSALMS_THIRTEEN_PERSONAL_SECTIONS = parsePsalmsThirteenRawNotes(PSALMS_THIRTEEN_RAW_NOTES);
