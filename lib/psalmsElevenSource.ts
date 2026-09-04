export type PsalmsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsElevenRawNotes(rawText: string): PsalmsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 11:${startVerse}` : `Psalms 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 11 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ELEVEN_RAW_NOTES = `# Psalms 11:1-2
# 🏹 Advice To Flee Like A Bird
---
## 🙏 In The LORD Put I My Trust

David opens this whole psalm with one settled decision.

Trust means relying fully on God, not just hoping things turn out fine.

He states this confidence before describing any danger at all.

The rest of the psalm defends that trust under real pressure.

His confidence comes first, the crisis comes second.

🙏 Trust means relying fully on God
📢 David states this before any danger
🛡️ Confidence comes before the crisis
📖 The psalm defends this trust throughout

---

## 🐦 Flee As A Bird To Your Mountain

Someone close to David is giving him urgent advice here.

Flee as a bird pictures escaping quickly and out of reach.

A startled bird darts away the instant it senses danger.

Your mountain points to a safe, remote hiding place in the hills.

David does not take this advice in the verses ahead.

🐦 Advice urges David to flee quickly
🏔️ Mountain means a safe hiding place
⚡ A startled bird flees instinctively
📖 David does not take this advice

---

## 🏹 The Wicked Bend Their Bow

Bending a bow means pulling the string back, ready to fire.

This pictures more than a lone attacker.

Archers routinely trained to shoot from hidden positions at a distance.

The wicked here are preparing a calculated ambush, not a sudden outburst.

David faces real, prepared danger, not vague suspicion.

🏹 Bending the bow means preparing to shoot
🎯 This pictures a trained, hidden archer
📋 The attack is planned, not sudden
📖 David faces real, prepared danger

---

## 🤫 Privily Shoot At The Upright In Heart

Privily is an old word for secretly or from a hidden place.

The attack is meant to strike before anyone sees it coming.

Upright in heart describes someone who lives honestly before God.

The target here is not random at all.

Wickedness often aims first at those who try to live right.

🤫 Privily means secretly, from hiding
🎯 The attack strikes without warning
❤️ Upright in heart means honest living
📖 Wickedness often targets those who live right

# Psalms 11:3
# 🏚️ If The Foundations Be Destroyed
---
## 🏗️ If The Foundations Be Destroyed

Foundations here means the basic structures that hold a society together.

Think of law, justice, and trusted leadership as load bearing walls.

When a real building loses its foundation, everything above it collapses.

David describes a moment when those structures feel like they are failing.

This is not a question about buildings.

It is a question about an entire way of life.

🏗️ Foundations means the structures holding society together
⚖️ Law and justice work like load bearing walls
💥 A lost foundation brings everything down
📖 This question is about a way of life

---

## ❓ What Can The Righteous Do

This sounds like a question of despair.

It captures a real fear, that a good life offers no real protection.

Righteous here means someone who tries to live in line with God's ways.

The question almost answers itself with silence.

The rest of this psalm answers it directly instead.

😟 This question voices real fear
🙏 Righteous means living in line with God
❓ It sounds like it has no answer
📖 The rest of the psalm answers it

# Psalms 11:4-5
# 👁️ The LORD Tries The Righteous
---
## 🏛️ The LORD Is In His Holy Temple, The LORD's Throne Is In Heaven

This verse answers the fear named just before it.

Foundations on earth can crack.

God's own dwelling never does.

Holy temple pictures God's nearness, present and reachable.

Throne in heaven pictures God's total authority over everything.

Nearness and authority together answer David's worry at once.

🏛️ Temple pictures God's nearness
👑 Throne pictures God's total authority
🛡️ Earthly foundations can fail, God's cannot
📖 Nearness and authority answer David's fear

---

## 🔍 His Eyes Behold, His Eyelids Try, The Children Of Men

Behold here means watching closely, not glancing by accident.

Try is an old word for testing something to see what it is truly made of.

Picture a jeweler examining a stone under close light.

God is not distracted or far removed from what people do.

Every action of every person is seen and tested.

👀 Behold means watching closely on purpose
🔍 Try means testing what something is made of
💎 Pictures a jeweler examining a stone
📖 Nothing anyone does goes unseen

---

## 🔬 The LORD Trieth The Righteous

Trieth uses the same testing idea just explained in the verse before.

Testing the righteous does not mean God doubts them.

It means God allows real pressure to prove what is already true.

A tested faith is stronger than an unused one.

This testing is different from the judgment coming for the wicked next.

🔬 Trieth means testing under real pressure
🙏 Testing does not mean God doubts them
💪 Pressure proves what is already true
📖 Testing differs from the judgment ahead

---

## 💔 The Wicked And Him That Loveth Violence His Soul Hateth

Soul hateth is strong language describing God's complete rejection.

This does not mean God flies into an emotional rage.

It means violence stands in direct opposition to who God is.

Loveth violence describes someone who enjoys causing harm, not someone who slips into it once.

God's love for the righteous and hatred for violence sit side by side here.

💔 Soul hateth means complete rejection
🚫 Not an emotional rage, a settled opposition
⚔️ Loveth violence means enjoying harm
📖 Love and hatred sit side by side here

# Psalms 11:6-7
# 🔥 Judgment And Righteousness
---
## 🪤 Upon The Wicked He Shall Rain Snares

Snares were hidden traps used to catch animals off guard.

Raining snares pictures judgment falling suddenly from above.

There is no escape from something that rains down like weather.

This is real judgment, not an idle threat.

The same bow bent against David now meets a far greater force.

🪤 Snares means hidden, sudden traps
🌧️ Raining pictures judgment falling from above
🚫 There is no escaping this judgment
📖 The bow bent at David now faces God

---

## 🔥 Fire And Brimstone, And An Horrible Tempest

Brimstone is an old word for burning sulfur.

Fire and brimstone together recall the judgment on Sodom in Genesis nineteen.

Tempest means a violent, overwhelming storm.

These are not slow consequences.

They arrive as sudden, total judgment.

🔥 Brimstone means burning sulfur
🏙️ This recalls Sodom's judgment in Genesis nineteen
🌪️ Tempest means a violent, overwhelming storm
📖 Judgment here is sudden, not slow

---

## 🍷 This Shall Be The Portion Of Their Cup

Cup here is a common Old Testament picture for a person's assigned fate.

Portion means the exact share someone is given, not a random amount.

The wicked planned harm for others throughout this whole psalm.

Now that same harm becomes their own assigned portion.

Their own plans are handed back to them in full.

🍷 Cup pictures a person's assigned fate
📏 Portion means their exact given share
🔄 Their own planned harm returns to them
📖 What they aimed at others comes back

---

## ⚖️ For The Righteous LORD Loveth Righteousness

This verse turns from judgment back to God's own character.

The LORD is not only righteous in name.

He actively loves righteousness wherever it is found.

That love explains both the mercy shown to David and the judgment on the wicked.

Justice and love are not opposites here.

Both come from the very same character.

⚖️ God is righteous and loves righteousness
❤️ This is active love, not just a label
🔗 Mercy and judgment share one source
📖 Justice and love come from the same character

---

## 🙂 His Countenance Doth Behold The Upright

Countenance means the look on someone's face, especially what that look reveals.

Beholding the upright means God's attention rests on those who live honestly.

The whole psalm began with a question about whether God was even watching.

This final line answers that question with certainty.

God is watching, and His face is turned toward those who trust Him.

🙂 Countenance means the look on a face
👀 God's attention rests on the upright
❓ This answers the psalm's opening fear
📖 God's face is turned toward the upright
`.trim();

export const PSALMS_ELEVEN_PERSONAL_SECTIONS = parsePsalmsElevenRawNotes(PSALMS_ELEVEN_RAW_NOTES);
