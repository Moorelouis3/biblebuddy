export type PsalmsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightRawNotes(rawText: string): PsalmsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 8:${startVerse}` : `Psalms 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 8 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHT_RAW_NOTES = `# Psalms 8:1-2
# 🌌 Praise Set Above The Heavens
---
## 🌌 O LORD, Our Lord, How Excellent Is Thy Name In All The Earth

The word LORD in capital letters is God's own personal name, Yahweh.

Lord right after it is a different word, Adonai, meaning master.

David praises God by both names in the very same breath.

Excellent here means high above everything else, not simply impressive.

This exact line opens the psalm and closes it in verse nine.

Everything between those two lines explains why that praise is true.

🌌 LORD is God's own personal name
👑 Lord means master or ruler
🙌 David praises both names together
📖 This line opens and closes the psalm

---

## ✨ Who Hast Set Thy Glory Above The Heavens

Glory here means the visible weight of God's greatness on display.

David pictures that glory sitting higher than the sky itself.

Nothing in creation, not even the heavens, can contain God fully.

The heavens themselves point back to something greater than them.

David has not even mentioned the earth yet in this psalm.

He starts as high as language can possibly reach.

✨ Glory means God's visible greatness
🌌 It sits higher than the heavens
🌠 Creation cannot contain God fully
📖 David starts as high as possible

---

## 👶 Out Of The Mouth Of Babes And Sucklings Hast Thou Ordained Strength

Babes and sucklings are two words for the very youngest children.

Sucklings cannot yet speak for themselves.

Strength here does not mean physical force or military power.

It means praise strong enough to silence an enemy's argument.

God can use the weakest voice to answer the loudest attack.

The point is not the children themselves but the God who uses them.

👶 Babes and sucklings are very young children
🍼 Sucklings cannot yet speak for themselves
🛡️ Strength here means praise not force
📖 God silences enemies through weak voices

---

## ⚔️ Because Of Thine Enemies, That Thou Mightest Still The Enemy And The Avenger

Still here means to silence completely, not simply to calm.

The enemy and the avenger both point to the same hostile group.

David widens the picture from a nursing child to a real threat.

A child's honest praise becomes a weapon against grown enemies.

That contrast is the whole point of the opening two verses.

Weakness in God's hands accomplishes what strength cannot.

⚔️ Still means to silence completely
🎯 Enemy and avenger name the same threat
👶 A child's praise becomes a real weapon
📖 Weakness in God's hands defeats strength

# Psalms 8:3-4
# 🌠 What Is Man?
---
## 🔭 When I Consider Thy Heavens, The Work Of Thy Fingers

Consider here means to look closely, not simply glance upward.

Work of thy fingers pictures something made with careful, personal skill.

A potter shaping clay uses fingers, not simply raw force.

David pictures God crafting the sky the same intimate way.

This is not a distant, impersonal universe flung into place.

Every star was placed there on purpose.

🔭 Consider means to look closely
🖐️ Work of thy fingers means careful skill
🏺 Like a potter shaping clay by hand
📖 God crafted the sky on purpose

---

## 🌙 The Moon And The Stars, Which Thou Hast Ordained

Ordained means set in place with intention and purpose.

The moon and stars were not scattered there by accident.

Ancient people had no telescopes, yet they still saw an ordered sky.

That order itself pointed them toward a deliberate Maker.

Even now, anyone who looks up feels that same smallness.

That feeling of smallness becomes the doorway to true worship.

🌙 Ordained means placed on purpose
✨ The stars were not scattered by accident
👀 Ancient eyes still saw a designed sky
📖 That smallness becomes a doorway to worship

---

## 🙋 What Is Man, That Thou Art Mindful Of Him?

Mindful means actively thinking about someone, not simply aware they exist.

David just described a sky too vast to measure.

Then he asks why a God that large would even notice a person.

Man here means humanity in general, not one specific individual.

The question is not rhetorical despair, it is genuine wonder.

David is amazed, not discouraged, by how small he feels.

🙋 Mindful means actively thinking about someone
🌌 The sky above is impossibly vast
🤏 David wonders why God notices him
📖 This is wonder, not despair

---

## 🚶 The Son Of Man, That Thou Visitest Him?

Son of man is simply a Hebrew way of saying human being.

Visitest means far more than a quick, passing glance.

It describes God stepping in personally to care for someone.

David repeats the same question twice using different words.

Hebrew poetry often restates one idea for weight, not repetition for its own sake.

Both lines ask the same stunned question, why does God care.

🚶 Son of man simply means human being
👁️ Visitest means personal, caring attention
🤝 God steps in to care personally
📖 Both lines ask why God cares

# Psalms 8:5-6
# 👑 Crowned With Glory And Honour
---
## 👼 Thou Hast Made Him A Little Lower Than The Angels

Angels here translates a Hebrew word that can also mean God himself.

Many scholars believe it points to heavenly beings just below God.

A little lower means humanity ranks just beneath that highest tier.

That is a remarkably high place for humans in the created order.

David has moved from asking why God cares to answering how much.

Humanity's rank in creation answers the question he just asked.

👼 Angels may mean heavenly beings near God
📊 A little lower means just beneath them
🏔️ Humanity holds a remarkably high place
📖 This answers why God is mindful of man

---

## 👑 Hast Crowned Him With Glory And Honour

A crown pictures royal authority given, not earned by effort.

Glory means visible greatness, honour means the respect that greatness deserves.

God is described here as the one placing the crown.

Humanity did not seize this position for itself.

It was given, the same way a king appoints an heir.

That gift comes with responsibility, not just privilege.

👑 A crown pictures given authority
✨ Glory means visible greatness
🎖️ Honour means the respect greatness deserves
📖 This gift carries responsibility, not just privilege

---

## 🌍 Thou Madest Him To Have Dominion Over The Works Of Thy Hands

Dominion means responsible rule, not permission to exploit.

Works of thy hands refers back to everything God just made.

A king rules a kingdom he did not build himself.

Humanity rules a creation someone else designed and formed.

That distinction is the whole point of calling it dominion.

Rule here comes with the weight of caretaking, not ownership.

🌍 Dominion means responsible rule
🏗️ Works of thy hands means all creation
👑 Humanity rules what it did not build
📖 Dominion means caretaking, not ownership

---

## 🦶 Thou Hast Put All Things Under His Feet

Under his feet is an ancient picture of complete authority.

Kings in this era placed a conquered foe under their feet.

Here the picture describes rule, not violence against an enemy.

All things signals that this authority covers the entire created world.

This is not a conquest but a caretaking assignment.

Authority given by God still answers back to God.

🦶 Under his feet pictures full authority
👑 Kings used this image for rule
🌏 All things covers the entire created world
📖 Authority here still answers back to God

# Psalms 8:7-9
# 🐑 Every Living Thing
---
## 🐑 All Sheep And Oxen, Yea, And The Beasts Of The Field

Sheep and oxen were the most familiar farm animals to David's readers.

Beasts of the field widens the picture to wild land animals too.

This list moves from the everyday to the untamed.

Even creatures no one controls still answer to this given authority.

Wild does not mean outside of God's design.

Every animal, tame or wild, still fits inside God's order.

🐑 Sheep and oxen were familiar farm animals
🦁 Beasts of the field means wild animals too
📋 The list moves from tame to wild
📖 Even wild animals fit inside God's order

---

## 🐦 The Fowl Of The Air, And The Fish Of The Sea

Fowl of the air means every bird that flies.

Fish of the sea means every creature that swims.

The list has now covered land, sky, and water completely.

Nothing in the visible world sits outside this authority.

This was not a small assignment for the first humans.

It was the whole visible world placed in trust.

🐦 Fowl of the air means every bird
🐟 Fish of the sea means every swimmer
🌐 Land, sky, and water are now covered
📖 The whole visible world was placed in trust

---

## 🌊 Whatsoever Passeth Through The Paths Of The Seas

Paths of the seas pictures fixed routes that sea creatures travel.

Ancient sailors already noticed that ocean currents seemed to move in patterns.

Even that hidden order under the water was placed under humanity's care.

Whatsoever passeth means anything at all, with no exceptions listed.

Nothing is too hidden or too small to be included.

God's care for creation reaches every corner, seen and unseen.

🌊 Paths of the seas means fixed routes
⛵ Sailors noticed ocean currents move in patterns
🐳 Even hidden sea order falls under this care
📖 God's care reaches every corner, seen and unseen

---

## 🔁 O LORD Our Lord, How Excellent Is Thy Name In All The Earth

This is the exact line the psalm opened with in verse one.

Repeating the opening line at the very end is called an inclusio.

It works like bookends holding everything in between together.

Everything about babes, stars, dominion, and animals sits inside those two matching lines.

The psalm began with praise and returns to that same praise.

Nothing that happened in between changed the answer, only deepened it.

🔁 This repeats the psalm's opening line
📚 Repeating the opening line is called inclusio
🗂️ It works like bookends around the whole psalm
📖 The psalm ends exactly where it began
`.trim();

export const PSALMS_EIGHT_PERSONAL_SECTIONS = parsePsalmsEightRawNotes(PSALMS_EIGHT_RAW_NOTES);
