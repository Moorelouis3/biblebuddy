export type JeremiahNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahNineRawNotes(rawText: string): JeremiahNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 9:${startVerse}` : `Jeremiah 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 9 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_NINE_RAW_NOTES = `# Jeremiah 9:1-3
# 😢 A Fountain Of Tears
---
## 😢 Oh That My Head Were Waters, And Mine Eyes A Fountain Of Tears

"Hyperbole" means an exaggeration used to make a strong point.

Jeremiah pictures his own head turning into a spring.

He imagines his eyes becoming an endless fountain of tears.

That kind of grief matches the size of the coming disaster.

A true prophet did not deliver bad news from a safe distance.

His own sorrow models how seriously the reader should take this warning.

😢 Hyperbole means intentional exaggeration
💧 Jeremiah's grief matches the disaster's size
🗣️ True prophets do not stay distant
📖 His sorrow models how to take this warning

## 🏜️ A Lodging Place Of Wayfaring Men

A "lodging place of wayfaring men" was a rough shelter used by traveling strangers.

It was not a real home, just a stop between destinations.

Jeremiah wishes he could disappear into a place like that instead.

He is not literally planning to abandon his calling.

The wish shows how exhausted he was by his own people's betrayal.

Even a prophet can long to escape the very message he is called to carry.

🏜️ Lodging place meant a rough traveler's shelter
🚶 Not a home, just a stopover
😩 Jeremiah longs to escape his own people
📖 Even prophets grow weary of hard callings

## 😔 They Be All Adulterers, An Assembly Of Treacherous Men

"Adulterers" here does not only mean unfaithfulness inside a marriage.

Through the prophets, God regularly used marriage to picture Israel's covenant with him.

Breaking that covenant through idolatry was described the same way as breaking a marriage vow.

"Treacherous" means people cannot be trusted to keep their word.

An entire community had built this kind of betrayal into daily life.

Unfaithfulness to God showed up first as unfaithfulness to each other.

😔 Adulterers means covenant breaking, not just marriage
📜 Prophets pictured Israel's covenant as a marriage
🤥 Treacherous means impossible to trust
📖 Betrayal of God showed up between neighbors

## 🏹 They Bend Their Tongues Like Their Bow For Lies

Archers bend a bow to send an arrow flying toward a target.

Jeremiah says the people bend their tongues the same way to aim lies at each other.

A weapon usually defends the truth or defends a person.

Here the weapon itself has become the lie.

They trained their words for attack, not for honesty.

A nation skilled at lying has already lost its ability to defend the truth.

🏹 Bending a bow aims an arrow
👅 Their tongues aimed lies like arrows
🛡️ Weapons should defend truth, not attack it
📖 A lying nation loses truth's defense

# Jeremiah 9:4-9
# 🗣️ Every Man Deceiving His Neighbour
---
## 🦶 Trust Ye Not In Any Brother, For Every Brother Will Utterly Supplant

"Supplant" means to trip someone up or take their place by deceit.

This is the exact word behind Jacob's own name, the heel grabber.

God is saying Jacob's old deceitful nickname now describes the whole nation.

Genesis already showed Jacob outgrowing that name through years with God.

His descendants had fallen right back into the behavior he left behind.

🦶 Supplant means to trip up by deceit
👤 This is the word behind Jacob's own name
📈 Jacob outgrew that name through years with God
📖 His descendants fell back into his old ways

## 🗣️ They Have Taught Their Tongue To Speak Lies

A skill has to be practiced before it becomes natural.

This verse pictures lying the same way, something learned and rehearsed.

They did not slip into dishonesty by accident.

They trained for it the way a person trains for any skill.

Hard work spent perfecting sin is still hard work wasted.

🎯 Skills are learned through practice
🗣️ Lying became a trained, rehearsed habit
🚫 This was not accidental dishonesty
📖 Effort spent perfecting sin is effort wasted

## 🏠 Thine Habitation Is In The Midst Of Deceit

"Habitation" means the place someone lives, their normal daily surroundings.

God says deceit was not an occasional visitor in their lives.

It was the house they lived in every single day.

Living inside constant deceit made it impossible to truly know God.

A lie and truth cannot share a home.

🏠 Habitation means where someone normally lives
🤥 Deceit was their constant daily home
🔒 Living there blocked them from knowing God
📖 A lie and truth cannot share a home

## ⚖️ Shall I Not Visit Them For These Things?

"Visit" here is an old way of saying God will act in judgment.

It does not mean a friendly or casual stop by.

The question is rhetorical, its answer is already obvious.

God is not asking for permission, he is announcing what is coming.

Patience with sin like this could not continue forever.

⚖️ Visit here means God acting in judgment
❓ The question is rhetorical, not open
📢 God announces judgment, he does not ask
📖 Patience with sin cannot last forever

# Jeremiah 9:10-16
# 🏔️ Weeping For The Mountains
---
## 🐄 Neither Can Men Hear The Voice Of The Cattle

Silence is one of the loudest signs of total destruction.

No farmer walking these hills would hear a single animal call.

Birds and wild animals had already fled the land completely.

A place normally full of life had become empty and still.

God measures this disaster by everything that has gone missing.

🤫 Silence signals total destruction
🐦 Birds and animals had already fled
🏞️ A living land had gone empty
📖 God measures disaster by what vanished

## 🧠 Who Is The Wise Man, That May Understand This?

This question is not really looking for a clever answer.

God is asking whether anyone even understands why this disaster happened.

Only someone who has actually heard from God can explain it correctly.

Human wisdom alone cannot diagnose a spiritual problem.

The real answer comes only in the next verse.

🧠 The question is not really open ended
❓ It asks who can explain this disaster
👂 Only someone who heard from God can answer
📖 Human wisdom alone cannot diagnose sin

## 💔 They Have Walked After The Imagination Of Their Own Heart

"Imagination" here means their own stubborn plans and desires, not simple daydreaming.

God names the exact cause of this disaster in plain words.

They abandoned his law and followed their own heart instead.

Worshiping Baalim was not a new mistake, it was inherited from their fathers.

A sin taught early can shape a whole nation for generations.

💭 Imagination means stubborn plans, not daydreams
📜 God names the exact cause plainly
👪 The sin of idolatry was inherited
📖 An early lesson can shape generations

## 🌿 I Will Feed Them, Even This People, With Wormwood

"Wormwood" means a bitter plant used to describe suffering that tastes as bad as it feels.

Normal food and water bring comfort and strength.

God promises the opposite here on purpose.

The judgment itself will taste bitter every single day.

This same bitter image already appeared back in chapter eight.

🌿 Wormwood means a bitter suffering plant
🍽️ Food should comfort, not punish
😖 Judgment itself will taste bitter
📖 No relief was left anywhere at all

# Jeremiah 9:17-22
# 😭 Call For The Mourning Women
---
## 👩 Call For The Mourning Women, That They May Come

Hiring professional mourners was a common practice in the ancient Near East.

"Cunning" here does not mean deceptive, it means highly skilled.

These women were trained specialists in public grief, not random guests.

God calls for them because the coming grief will be too large for ordinary mourning.

Even paid mourners could not overstate what was coming.

👩 Mourning women were hired professionals
🎓 Cunning means highly skilled, not deceptive
📣 Their grief was trained, not random
📖 This disaster outsized even professional mourning

## 💧 That Our Eyes May Run Down With Tears

Wailing in this culture was loud and physical, not quiet sniffling.

The request is for tears that do not stop, eyes running like water.

This grief was meant to be seen and heard by everyone nearby.

Public mourning forced the whole community to face the disaster together.

Nobody was allowed to look away from what was happening.

📣 Wailing was loud and physical grief
💧 Tears were meant to run without stopping
👥 Grief was public, not private
📖 Nobody was allowed to look away

## 🪟 Death Is Come Up Into Our Windows

This does not describe an actual person named Death climbing through a window.

The image pictures death moving like an invading enemy or a disease.

It bypasses locked doors and enters through openings nobody guards.

Even the safety of a home offered no protection here.

Children and young men, the future of the nation, were the ones taken.

🪟 Death pictured as an invading enemy
🚪 It enters through openings nobody guards
🏠 Even homes offered no protection
📖 The nation's children and young men were taken

## 🌾 The Carcases Of Men Shall Fall As Dung Upon The Open Field

This same image of exposed, unburied bodies already appeared in chapter eight.

"The handful after the harvestman" means the leftover grain nobody bothers to collect.

A harvest field always leaves some scraps too small to be worth gathering.

God compares the dead here to scraps nobody thought were worth saving.

Repeating this image from chapter eight shows the warning had already gone unheeded.

🌾 Handful after the harvestman means leftover scraps
💀 Bodies compared to scraps nobody gathers
🔁 This image already appeared in chapter eight
📖 A repeated warning had gone unheeded

# Jeremiah 9:23-24
# 📖 Let Him That Glorieth Glory In This
---
## 🧠 Let Not The Wise Man Glory In His Wisdom

"Glory" here means to boast or find your identity in something.

God names three things people commonly build their pride around, wisdom, strength, and wealth.

Each one can be lost overnight through no fault of the person holding it.

None of these three things can guarantee anyone's standing before God.

A pride built on any of them is a pride built on sand.

🧠 Glory means finding identity in something
💪 Wisdom, strength, and wealth are named
📉 Any of the three can vanish overnight
📖 Pride built on them stands on sand

## 🙏 But Let Him That Glorieth Glory In This

God offers one true foundation to replace the other three.

Knowing God personally is not the same as knowing facts about him.

"Understandeth" points to real insight, not simple information.

This kind of knowing changes how a person actually lives.

Only this foundation cannot be taken away by circumstance.

🙏 God offers one true foundation
🧭 Knowing God means more than facts
🔄 Real knowing changes how a person lives
📖 Only this foundation cannot be taken away

## ⚖️ I Am The LORD Which Exercise Lovingkindness, Judgment, And Righteousness

God names three things that describe how he actually acts in the world.

"Lovingkindness" means covenant loyalty, mercy that keeps every promise.

"Judgment" here means setting wrongs right through real justice.

"Righteousness" means doing what is right without exception.

These three, not wisdom or wealth or strength, are what God actually delights in.

⚖️ Three qualities describe how God acts
🤝 Lovingkindness means loyal, promise keeping mercy
👨‍⚖️ Judgment means setting wrongs right
📖 God delights in these, not human pride

## 💛 For In These Things I Delight, Saith The LORD

God states plainly what actually brings him pleasure.

Not human achievement, but his own steady character on display in the world.

This verse flips the entire chapter's warning into an invitation.

The same God who judges deceit delights in lovingkindness, judgment, and righteousness.

True glory was never out of reach, it just was not where they were looking.

💛 God states plainly what pleases him
🌍 His own character on display delights him
🔄 The chapter's warning becomes an invitation
📖 True glory was never out of reach

# Jeremiah 9:25-26
# ✂️ Circumcised, Yet Uncircumcised In Heart
---
## ✂️ I Will Punish All Them Which Are Circumcised With The Uncircumcised

"Circumcised" refers to the physical sign God gave Abraham as a mark of the covenant.

Judah carried that mark and assumed it made them safe from judgment.

God says that assumption was wrong.

A physical sign alone was never the whole point of the covenant.

Judah would be judged right alongside nations who never carried that sign at all.

✂️ Circumcised means the covenant sign given Abraham
🛡️ Judah assumed the sign kept them safe
🚫 A physical sign alone was not the point
📖 Judah faced judgment alongside uncircumcised nations

## 🌍 Egypt, And Judah, And Edom, And The Children Of Ammon, And Moab

This list names five nations together in one sentence.

Four of them worshiped other gods and never carried God's covenant sign.

Judah is placed right in the middle of that list.

Being grouped with pagan nations was itself part of the shame.

The very people set apart to be different had made themselves the same.

🌍 Five nations are named together
🚫 Four never carried God's covenant sign
😔 Judah sits in the middle of that list
📖 The set apart nation copied the rest

## 🏜️ All That Dwell In The Wilderness

These desert dwelling peoples were known for a strange custom, shaving the corners of their hair.

Israel was told never to copy that practice.

Many of these same desert nations also practiced a form of circumcision.

That detail matters for the point God is making here.

Even nations outside the covenant shared this same physical practice.

A rite pagans could copy was never going to set Judah apart.

🏜️ Desert nations shaved their hair's corners
🚫 Israel was told to avoid that
✂️ These nations also practiced circumcision
📖 A copied rite could not set Judah apart

## 💔 All The House Of Israel Are Uncircumcised In The Heart

This is the real diagnosis behind everything in this chapter.

The physical mark on their bodies was never in question.

The mark on their hearts was what had gone missing.

A covenant sign means nothing without a covenant heart behind it.

The chapter that opened with tears over betrayal ends with the reason why it happened.

💔 The real diagnosis closes the chapter
✅ Their physical mark was never the issue
🫀 Their heart's mark had gone missing
📖 A sign means nothing without a matching heart
`.trim();

export const JEREMIAH_NINE_PERSONAL_SECTIONS = parseJeremiahNineRawNotes(JEREMIAH_NINE_RAW_NOTES);
