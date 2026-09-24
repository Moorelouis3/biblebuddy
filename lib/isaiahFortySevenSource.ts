export type IsaiahFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortySevenRawNotes(rawText: string): IsaiahFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+47:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 47 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+47:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+47:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 47 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 47,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 47:${startVerse}` : `Isaiah 47:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 47 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_SEVEN_RAW_NOTES = `# Isaiah 47:1-3
# 👑 Babylon Comes Down From Her Throne
---
## 🪑 Come Down, And Sit In The Dust

Babylon is pictured here as a queen ordered off her throne.

Sitting in the dust marks someone who has lost all power.

A throne stands high above the ground.

Dust is the lowest place a person can sit.

This command is a sentence being pronounced, not a suggestion.

🪑 Babylon is pictured as a queen
🌫️ Dust means the lowest place there is
👑 Thrones once stood high above the ground
📖 This is judgment, not a suggestion

## 🏙️ O Virgin Daughter Of Babylon

Virgin here does not describe purity in a physical sense.

It pictures a city that had never been conquered or humbled before.

Babylon had ruled other nations without ever being forced to bow.

Daughter is a common way the Bible pictures a city or nation.

This title is about to be stripped away completely.

🏙️ Virgin means never conquered before now
👑 Babylon had ruled without ever bowing
👧 Daughter pictures a whole city or nation
📖 This proud title is about to end

## 🏛️ There Is No Throne, O Daughter Of The Chaldeans

Chaldeans was another name for the Babylonians, especially their ruling class.

A throne was the visible symbol of a ruling kingdom.

Saying there is no throne means the kingdom itself is finished.

This is not a temporary setback.

The rule is over completely.

🏛️ Chaldeans names Babylon's ruling people
🪑 A throne stood for the whole kingdom
🚫 No throne means the kingdom is finished
📖 This ending is not temporary

## 🍇 Thou Shalt No More Be Called Tender And Delicate

Tender and delicate describe a life of comfort and soft luxury.

Babylon had lived like a pampered queen with servants to spare.

That title is being taken away along with the throne.

What comes next will be hard labor, not comfort.

🍇 Tender and delicate mean soft, comfortable living
👑 Babylon lived like a pampered queen
🔚 That comfortable title is being removed
📖 Hard labor replaces comfort next

## 🪨 Take The Millstones, And Grind Meal

A millstone was a heavy stone used to crush grain into flour.

Grinding grain by hand was slave work, done by servants or captives.

A queen never touched a millstone in her own life.

This command puts Babylon into the lowest kind of labor.

🪨 A millstone crushed grain into flour
👷 Grinding grain was work done by servants
👑 A queen never touched this kind of work
📖 Babylon is placed into the lowest labor

## 🧕 Uncover Thy Locks, Make Bare The Leg

Uncovering the hair and bare legs described the treatment of a captive.

A modest woman in this culture kept her head and legs covered.

Removing that covering in public was a mark of shame, not fashion.

Conquered women were sometimes marched this way in front of an army.

🧕 Covered hair and legs marked modesty
😳 Removing the covering meant public shame
⛓️ Captives were marched exposed like this
📖 Babylon is treated as a captive here

## ⚔️ I Will Not Meet Thee As A Man

This phrase describes God acting without holding back out of mercy.

A man meeting another man in battle might show restraint or fairness.

God says this judgment will not work that way.

This is vengeance, not a fair fight between equals.

⚔️ A man in battle might show restraint
🚫 God says restraint will not happen here
⚖️ This is vengeance, not a fair fight
📖 God judges Babylon completely, without mercy

# Isaiah 47:4-5
# 🕊️ The Holy One Of Israel Speaks
---
## 🛡️ As For Our Redeemer, The Lord Of Hosts Is His Name

A redeemer is someone who rescues or buys back what was lost.

This short line breaks in like a response from God's people.

Lord of hosts names God as commander over every army and power.

Babylon just lost her throne.

Israel's redeemer never loses His.

🛡️ A redeemer rescues what was lost
🗣️ This line answers Babylon's fall
⚔️ Lord of hosts names God over every army
📖 Israel's redeemer never loses His power

## ✨ The Holy One Of Israel

Holy means set apart, completely different from anything else that exists.

This title appears often in Isaiah for God's uniqueness and purity.

Babylon worshipped gods that had to be carried and rescued by people.

Israel's God needs no rescue and stands apart from every false god.

✨ Holy means set apart, completely unique
🔁 This title repeats often through Isaiah
🗿 Babylon's gods needed rescuing by people
📖 Israel's God stands apart from every god

## 🤐 Sit Thou Silent, And Get Thee Into Darkness

Babylon is told to stop speaking and disappear from view.

Silence here is the opposite of a proud queen making announcements.

Darkness pictures being hidden away, no longer seen or heard from.

The city that once gave orders is now told to vanish.

🤐 Babylon is told to stop speaking
🌑 Darkness means hidden away from sight
👑 A proud queen is silenced completely
📖 The city that ordered others now obeys

## 👑 Thou Shalt No More Be Called, The Lady Of Kingdoms

Lady of kingdoms was a title claiming rule over other nations.

Babylon had once controlled and taxed kingdoms far beyond her own borders.

That title required no throne, since the throne is already gone.

Losing a title like this in public was a deep humiliation.

👑 Lady of kingdoms claimed rule over nations
🌍 Babylon once controlled many other kingdoms
🪑 The throne behind that title is gone
📖 Losing this title in public was humiliation

# Isaiah 47:6-7
# 😠 The Yoke Of Judgment
---
## 😠 I Was Wroth With My People

Wroth means intense anger, stronger than simple frustration or annoyance.

God admits He was genuinely angry with His own people, Israel.

That anger is why Israel ended up conquered and taken to Babylon.

God does not hide His own part in this story.

😠 Wroth means intense anger, not annoyance
👪 God was angry with His own people
⛓️ That anger led to Israel's exile
📖 God does not hide His own part

## 👪 I Have Polluted Mine Inheritance

Inheritance here refers to Israel, the people God claimed as His own.

Polluted describes something treated as unclean or handed over to disgrace.

God allowed His own people to be defeated and dishonored by Babylon.

This was discipline, not a sign that God had rejected Israel.

👪 Inheritance means Israel, God's own people
😔 Polluted means treated as unclean or disgraced
⚔️ Israel was handed over to defeat
📖 This was discipline, not rejection

## 🐂 Upon The Ancient Hast Thou Very Heavily Laid Thy Yoke

A yoke is a heavy wooden bar placed across an animal to force labor.

Here it pictures the crushing weight Babylon placed on conquered people.

The ancient refers to elderly people, who deserved gentler treatment.

Babylon showed no mercy, even to those who could least bear it.

🐂 A yoke forced heavy labor on animals
⛓️ It pictures Babylon's crushing weight on captives
👴 The ancient means elderly, defenseless people
📖 Babylon showed mercy to no one

## 🗣️ I Shall Be A Lady For Ever

This records Babylon's own boast about her future, not God's words.

Babylon assumed her power and comfort would simply continue without end.

Empires in this period often believed their rule was permanent.

That confidence is about to be proven completely wrong.

🗣️ This is Babylon's own boast, not God's
👑 Babylon assumed her power would never end
🏛️ Empires often believed their rule was permanent
📖 That confidence is about to fail

## 🔚 Neither Didst Remember The Latter End Of It

Latter end means the eventual outcome or final result of an action.

Babylon enjoyed her power without ever considering how it might end.

She showed Israel no mercy, forgetting that judgment could still come.

Ignoring the ending is how empires get caught by surprise.

🔚 Latter end means the eventual outcome
👑 Babylon enjoyed power without considering the future
😔 She showed Israel no mercy at all
📖 Ignoring endings leaves empires unprepared

# Isaiah 47:8-9
# 👑 I Am, And None Else
---
## 🍷 Thou That Art Given To Pleasures, That Dwellest Carelessly

Given to pleasures describes a life built entirely around comfort and ease.

Dwellest carelessly means living without any real sense of danger.

Babylon felt completely safe behind her walls, wealth, and army.

That false sense of safety is exactly what is about to break.

🍷 Given to pleasures means a life of comfort
😌 Dwellest carelessly means feeling no real danger
🏰 Babylon trusted her walls and wealth
📖 That false safety is about to break

## 👑 I Am, And None Else Beside Me

This claim belongs to God alone throughout the book of Isaiah.

Babylon is copying language that only fits the true God.

Claiming this title for herself was open pride bordering on blasphemy.

The one who truly deserves this title has already spoken in this chapter.

👑 This claim belongs only to God
😳 Babylon is copying language meant for God
💔 This pride borders on outright blasphemy
📖 The real owner of this claim has spoken

## 👰 I Shall Not Sit As A Widow

A widow in this culture often lost both status and financial support.

Babylon boasts that she will never face that kind of loss.

This boast covers losing her king, her allies, and her protection.

The next verse names the exact loss she claims will never come.

👰 A widow often lost status and support
👑 Babylon boasts she will avoid that loss
🛡️ This covers losing her king and allies
📖 The next verse names this exact loss

## 👶 The Loss Of Children, And Widowhood, In A Moment In One Day

Babylon boasted she would never face this loss in the verse before.

Both disasters are pictured arriving together, not spread out over years.

In a moment in one day stresses how fast the fall will be.

The very thing she denied is promised to happen anyway.

👶 Loss of children and widowhood strike together
⚡ Both disasters arrive fast, not slowly
⏱️ In one day stresses the sudden timing
📖 The very thing she denied still happens

## 🔮 For The Multitude Of Thy Sorceries

Sorceries were magic rituals used to predict the future or control events.

Babylon was famous across the ancient world for practicing these arts.

Multitude shows this was not occasional but a constant part of daily life.

This judgment answers years of trusting magic instead of the true God.

🔮 Sorceries were magic rituals for control
🏛️ Babylon was famous for practicing these arts
📅 Multitude means this happened constantly
📖 This judgment answers trusting magic over God

# Isaiah 47:10-11
# 🔮 None Seeth Me
---
## 😈 Thou Hast Trusted In Thy Wickedness

Babylon built her entire sense of safety on doing wrong without stopping.

Wickedness here includes cruelty toward captives and trust in false gods.

She did not merely commit wrong.

She relied on it working in her favor.

That kind of trust is about to be shown completely false.

😈 Babylon trusted wickedness to keep her safe
⛓️ This includes cruelty toward her captives
🔮 It also includes trust in false gods
📖 That trust is about to fail

## 👀 None Seeth Me

Babylon believed her actions happened completely hidden from view.

This is the same false confidence named already in verse eight.

Repeating this claim shows how deep this blindness really went.

God has been watching everything this whole time.

👀 Babylon believed no one was watching
🔁 This echoes the same claim from verse eight
😳 Repeating it shows how deep the blindness went
📖 God was watching the entire time

## 📚 Thy Wisdom And Thy Knowledge, It Hath Perverted Thee

Babylon was known across the ancient world for astrology and learning.

Perverted here means that knowledge twisted her judgment instead of sharpening it.

She trusted her own cleverness more than she feared any consequence.

Real wisdom would have warned her that no kingdom lasts forever.

📚 Babylon was famous for astrology and learning
🌀 Perverted means it twisted her judgment
😤 She trusted cleverness over any warning
📖 Real wisdom warns that no kingdom lasts

## ❓ Thou Shalt Not Know From Whence It Riseth

Whence means from where, an old way of asking about a source.

Babylon will not be able to trace where this disaster begins.

Her astrologers claimed to predict the future, yet this catches her blind.

The very skill she trusted most fails her at the moment it matters.

❓ Whence means from where, asking the source
🌀 Babylon cannot trace where this disaster starts
🔮 Her astrologers claimed to predict the future
📖 That skill fails at the moment it matters

## 🏚️ Desolation Shall Come Upon Thee Suddenly

Desolation means total ruin, a place left empty and destroyed.

Suddenly is repeated for emphasis, stressing that no warning will come first.

This directly answers Babylon's own claim to know the future in advance.

The kingdom that predicted everything never saw its own end coming.

🏚️ Desolation means total ruin, left empty
⚡ Suddenly stresses no warning will come first
🔮 This answers her claim to predict the future
📖 She never saw her own end coming

# Isaiah 47:12-13
# ⭐ Let The Astrologers Stand Up
---
## 🔮 Stand Now With Thine Enchantments

This is a challenge, daring Babylon to use her magic to save herself.

Enchantments were spoken spells believed to control spirits or future events.

God is not afraid of this power, because it has no real strength.

The challenge itself proves how powerless these practices actually are.

🔮 This dares Babylon to use her magic
🗣️ Enchantments were spells meant to control events
💪 God is not afraid of this power
📖 The challenge proves the power is empty

## 📆 Wherein Thou Hast Laboured From Thy Youth

Babylon had practiced these magic arts since she was young as a nation.

Laboured shows this took real effort, not a casual passing interest.

A lifetime of practice still could not produce any real protection.

Effort spent on a false source of power never pays off in the end.

📆 Babylon practiced magic since her youth
💪 Laboured shows this took real effort
🚫 That effort produced no real protection
📖 Effort on a false power never pays off

## 😩 Thou Art Wearied In The Multitude Of Thy Counsels

Wearied means exhausted, worn out from trying too many different plans.

Multitude of counsels pictures Babylon consulting endless advisors and omens.

None of those plans is named as the source of any real answer.

Chasing more advice was never going to fix the real problem.

😩 Wearied means exhausted from too many plans
🗣️ Babylon consulted endless advisors and omens
❌ None of those plans gave a real answer
📖 More advice was never the real fix

## ⭐ The Astrologers, The Stargazers, The Monthly Prognosticators

Astrologers studied the stars to claim knowledge about future events.

Stargazers is a close synonym, naming the same practice a second way.

Monthly prognosticators tracked the calendar to predict fortunes month by month.

Babylon is told to let this entire profession try to rescue her now.

⭐ Astrologers studied stars to predict the future
🌌 Stargazers names the same practice again
📅 Monthly prognosticators predicted fortunes by the calendar
📖 This whole profession is told to try now

# Isaiah 47:14-15
# 🔥 They Shall Be As Stubble
---
## 🌾 They Shall Be As Stubble

Stubble is the dry leftover stalks in a field after harvest.

Stubble burns fast and completely, leaving almost nothing behind.

This describes how quickly Babylon's astrologers and magicians will be destroyed.

Their own fire imagery gets turned back against them here.

🌾 Stubble means dry leftover stalks after harvest
🔥 Stubble burns fast and completely
⚡ This shows how fast the fall will be
📖 Their own imagery turns back on them

## 🔥 There Shall Not Be A Coal To Warm At

A coal that stays warm can be used to start a new fire.

This says nothing will be left behind, not even a small ember.

No comfort, no rebuilding, and no second chance are pictured here.

The destruction described is total, not partial.

🔥 A coal could normally start a new fire
🚫 Not even a small ember survives here
🏚️ No comfort or rebuilding is left
📖 This destruction is total, not partial

## 💰 Thy Merchants, From Thy Youth

Babylon grew wealthy through trade routes that reached across the ancient world.

These merchants had worked and traded with her since she was young.

Long partnerships like this were expected to offer loyalty in hard times.

Even these long term partners will not be able to help her.

💰 Babylon grew wealthy through wide trade routes
🤝 These merchants had worked with her since youth
⏳ Long partnerships were expected to bring loyalty
📖 Even these old partners cannot help her

## 🔚 None Shall Save Thee

This closes the chapter with the exact opposite of Babylon's opening boast.

She claimed no one could touch her and that she would rule forever.

Every source of help named in this chapter has now failed her.

Idols, magic, and astrologers all failed her the same way.

🔚 This closes the chapter, reversing her boast
👑 She once claimed she would rule forever
🔮 Idols, magic, and astrologers all failed
📖 Every source of help leaves her alone`.trim();

export const ISAIAH_FORTY_SEVEN_PERSONAL_SECTIONS = parseIsaiahFortySevenRawNotes(ISAIAH_FORTY_SEVEN_RAW_NOTES);
