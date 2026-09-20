export type PsalmsOneHundredTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyNineRawNotes(rawText: string): PsalmsOneHundredTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+129:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 129 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+129:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+129:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 129 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 129,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 129:${startVerse}` : `Psalms 129:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 129 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_NINE_RAW_NOTES = `# Psalms 129:1-4
# 🌾 A History Of Affliction
---
## 😣 Many A Time Have They Afflicted Me From My Youth

"Many a time" means this happened again and again.

"Afflicted" points to real, lasting harm, not a small inconvenience.

"From my youth" reaches back to Israel's earliest history, starting in Egypt.

The psalm opens by naming a pattern of suffering that goes back centuries.

😣 Afflicted means real, lasting harm

📅 Many a time means repeatedly

🍼 Youth points to Israel's earliest history

📖 The psalm opens with centuries of suffering

## 🗣️ May Israel Now Say

This line invites the whole nation to speak these words together.

Ancient Israel often recited psalms like this one in shared worship.

The single voice of verse one becomes a shared confession.

One person's memory becomes the whole nation's prayer.

🗣️ Say invites the whole nation to speak

🎶 Psalms were often recited together

🤝 One voice becomes a shared prayer

📖 Memory turns into worship

## ⚔️ Yet They Have Not Prevailed Against Me

"Prevailed" means the enemies never won a final victory.

Israel faced attacks across many centuries of its history.

Egypt, Assyria, and Babylon all tried to destroy this nation.

None of them succeeded in wiping Israel out completely.

⚔️ Prevailed means winning a final victory

🏹 Many enemies attacked Israel over centuries

🛡️ None of them destroyed the nation

📖 Survival itself becomes the testimony

## 🌾 The Plowers Plowed Upon My Back

This line compares Israel's suffering to a farmer plowing a field.

A "plower" drags a sharp blade through dirt to break it open.

Here the back of the sufferer stands in for that broken ground.

The image pictures deep, repeated wounds from beatings or slavery.

🌾 Plowers is a farming image for attackers

🔪 A plow drags a blade through dirt

😖 The back stands in for the ground

📖 The image pictures deep, repeated wounds

## 📏 They Made Long Their Furrows

A "furrow" is the long groove a plow cuts into a field.

Long furrows meant a field that had been worked over completely.

Applied to a back, the furrows picture wounds stretched out and severe.

The suffering described here was not brief or shallow.

📏 Furrows are long grooves cut by a plow

🌱 Long furrows mean a field worked over fully

🩹 On a back, furrows picture severe wounds

📖 The suffering here ran deep and long

## ⚖️ The LORD Is Righteous

"Righteous" means God always acts justly and keeps his word.

The psalm has just described years of unfair suffering.

Naming God as righteous turns the poem from complaint toward trust.

Justice will come, even if it has not arrived yet.

⚖️ Righteous means always just and true

😣 Years of suffering came before this line

🙏 Naming God shifts the tone to trust

📖 Justice is coming even if delayed

## 🪢 He Hath Cut Asunder The Cords Of The Wicked

"Cords" were ropes used to bind, drag, or control someone.

Farmers also used cords to yoke and guide their plow animals.

"Cut asunder" means those ropes were sliced completely apart.

God is pictured ending the control the wicked once had.

🪢 Cords are ropes used to bind and control

🐂 Cords also guided yoked plow animals

✂️ Cut asunder means sliced completely apart

📖 God ends the wicked's control for good

# Psalms 129:5-8
# 🌱 A Blessing That Never Comes
---
## 😳 Let Them All Be Confounded And Turned Back

"Confounded" means put to shame and left humiliated.

"Turned back" pictures an army retreating instead of advancing.

This verse is a prayer, not a threat spoken by a person.

The psalmist asks God to bring about that defeat personally.

😳 Confounded means put to shame

🔙 Turned back pictures a retreating army

🙏 This is a prayer, not a threat

📖 God is asked to bring the defeat

## 🏛️ That Hate Zion

"Zion" was the hill in Jerusalem where God's presence was understood to dwell.

Over time Zion came to stand for God's people as a whole.

To hate Zion means opposing God and the nation he chose.

The prayer targets that hatred directly, not personal rivals.

🏛️ Zion was the hill where God dwelled

🇮🇱 Zion came to stand for God's people

💔 Hating Zion means opposing God himself

📖 The prayer targets that hatred directly

## 🏠 As The Grass Upon The Housetops

Israelite houses had flat roofs covered with a thin layer of dirt.

Seeds could blow onto that dirt and sprout into thin grass.

That roof soil was too shallow to support real growth.

The image compares Israel's enemies to that weak, thin grass.

🏠 Houses in Israel had flat, dirt covered roofs

🌱 Seeds sometimes sprouted into thin grass there

🪴 The soil was too shallow for real growth

📖 Enemies are pictured as that weak grass

## 🥀 Which Withereth Afore It Groweth Up

"Withereth" means the grass dries up and dies.

"Afore" is an older word that simply means before.

This roof grass dies before it ever matures.

The enemies of Zion are pictured with that same short, wasted life.

🥀 Withereth means it dries up and dies

⏱️ Afore is an old word for before

🌾 This roof grass dies before it matures

📖 Enemies are pictured with that same fate

## 🌾 Wherewith The Mower Filleth Not His Hand

A "mower" is a reaper who cuts grain at harvest time.

Normal harvest grass fills a mower's hand again and again.

This rooftop grass is too weak and thin to ever be harvested.

Even a mower gathering grain finds nothing here worth cutting.

🌾 A mower is a harvest time reaper

✋ Filleth not his hand means nothing to gather

🪴 This rooftop grass is too weak to cut

📖 Even a mower finds nothing worth harvesting

## 🤗 Nor He That Bindeth Sheaves His Bosom

A "sheaf" is a bundle of cut grain tied together after harvest.

Workers carried finished sheaves against their chest, called the bosom here.

This useless rooftop grass never becomes a sheaf worth carrying.

The image pictures a harvest that produces nothing at all.

🌾 A sheaf is a bundle of cut grain

🤗 Bosom pictures grain carried against the chest

🚫 This grass never becomes a sheaf

📖 The harvest here produces nothing at all

## 📜 The Blessing Of The LORD Be Upon You

This exact phrase was a traditional greeting exchanged during grain harvest.

Ruth chapter two records Boaz greeting his reapers this same way.

The psalm imagines someone about to speak this blessing over a harvest.

But this rooftop grass never produces a real harvest to bless.

🌾 This was a traditional harvest greeting

📜 Ruth records Boaz using this same greeting

🪴 The psalm imagines this blessing being offered

📖 This grass has no harvest to bless

## 🤝 We Bless You In The Name Of The LORD

A full greeting had two halves spoken by two different people.

The passerby blessed the workers, then the workers blessed them back.

That full, warm exchange is exactly what this verse now withholds.

The psalm ends by picturing a blessing that never gets spoken at all.

🤝 A full greeting had two halves

🗣️ Workers blessed the passerby back in reply

🚫 This verse withholds that exact exchange

📖 The psalm ends on a blessing unspoken
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_NINE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyNineRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_NINE_RAW_NOTES
);
