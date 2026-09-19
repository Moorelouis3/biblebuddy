export type PsalmsOneHundredTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTenRawNotes(rawText: string): PsalmsOneHundredTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+110:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 110 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+110:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+110:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 110 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 110,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 110:${startVerse}` : `Psalms 110:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 110 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TEN_RAW_NOTES = `# Psalms 110:1-4
# 👑 The LORD Said Unto My Lord
---
## 👑 The LORD Said Unto My Lord

"LORD" in capital letters is God's own personal name.

"Lord" the second time is a different word entirely.

It means master, not a repeated title.

David here is quoting God speaking to someone else.

A king does not usually call anyone else his master.

Jesus later uses this exact puzzle to silence the Pharisees.

👑 LORD names God's own personal name

🎩 Lord means master, not a title repeat

❓ A king calling someone his master

📖 Jesus used this to silence the Pharisees

## 🪑 Sit Thou At My Right Hand

The right hand was the seat of highest honor beside a king.

Sitting there meant sharing in the king's own authority.

This was not a servant's post standing off to the side.

The New Testament describes Jesus taking this exact seat after his resurrection.

Hebrews chapter one quotes this very verse to make that point.

🪑 Right hand was the seat of honor

🤝 Sitting there meant shared authority

🧍 Not a servant standing to the side

📖 Hebrews one applies this seat to Jesus

## 🦶 Until I Make Thine Enemies Thy Footstool

A footstool sat under a king's feet, low and beneath him.

Ancient conquerors sometimes placed a defeated king's neck under their own foot.

Joshua chapter ten records that very act after a battle.

The footstool pictures total defeat, not a small setback.

Every enemy is asked to end up in that same position.

🦶 Footstool sat low, beneath the king

👑 Conquerors placed defeated kings under their feet

📜 Joshua ten records this same act

📖 The footstool pictures total defeat

## 🎌 The Rod Of Thy Strength Out Of Zion

A rod here means a scepter, a symbol of royal rule.

Kings held a rod like this to show their authority.

Zion was the hill in Jerusalem where God had placed his throne.

This rod of strength is sent out from that exact place.

The king's authority begins with God, not with his own army.

🎌 Rod means scepter, a symbol of rule

🏔️ Zion was the hill of God's throne

📤 Sent out from that exact place

📖 Authority begins with God, not the army

## ⚔️ Rule Thou In The Midst Of Thine Enemies

Most kings expect peace before they feel secure enough to rule.

This king is told to rule while still surrounded by enemies.

The opposition is not removed before his reign begins.

His authority stands strong in the middle of active resistance.

That is a much harder kind of rule to picture.

👑 Most kings expect peace before ruling

⚔️ This king rules while surrounded

🚫 Opposition is not removed first

📖 Authority stands strong amid resistance

## ✋ Thy People Shall Be Willing In The Day Of Thy Power

Ancient armies were often filled through forced conscription.

"Willing" here describes soldiers who join by their own choice.

"The day of thy power" names a specific moment of strength.

This king gathers followers who want to be there.

Loyalty by choice reads very differently than loyalty by force.

✋ Willing means joining by free choice

📅 Day of thy power names one moment

🚫 Not gathered through forced conscription

📖 Loyalty by choice, not loyalty by force

## ✨ In The Beauties Of Holiness

"Holiness" here is pictured as something beautiful, not only solemn.

The same phrase appears in Psalm twenty nine and Psalm ninety six.

Ancient worship often involved bright priestly clothing.

This phrase pictures God's people arrayed and ready like priests.

Holiness in this psalm looks like glory, not gloom.

✨ Holiness pictured as beautiful, not solemn

📜 Same phrase appears elsewhere in Psalms

👘 Pictures people arrayed like priests

📖 Holiness here looks like glory

## 🌅 From The Womb Of The Morning

The morning is pictured here like a mother giving birth.

Dew appears at dawn in vast, uncountable amounts.

This king's followers are pictured arriving the very same way.

They are not gathered slowly over years.

They appear suddenly and in great number, like morning dew.

🌅 Morning pictured like a mother giving birth

💧 Dew appears at dawn in vast amounts

👥 Followers pictured arriving the same way

📖 They appear suddenly, in great number

## 💧 Thou Hast The Dew Of Thy Youth

Dew is fresh and new every single morning.

It never carries over stale from the day before.

"The dew of thy youth" pictures strength that never grows old.

Most kings weaken as the years pass.

This king's vigor is pictured as endlessly renewed instead.

💧 Dew is fresh and new each morning

🔄 It never carries over from before

👴 Most kings weaken with age

📖 This king's vigor stays endlessly renewed

## 📜 The LORD Hath Sworn, And Will Not Repent

This does not mean God once sinned and now feels sorry.

"Repent" here means change his mind, an older use of the word.

A sworn oath in this culture could never be taken back.

God is stating that this specific promise is permanent.

Nothing will cause him to reverse it later.

🚫 Not God feeling sorry for sin

🔄 Repent here means change his mind

📜 A sworn oath could never be reversed

📖 This promise is stated as permanent

## ♾️ A Priest For Ever

Regular priests in Israel served for a limited time.

Each one eventually died and was replaced by another.

"For ever" describes a priesthood that never ends this way.

Hebrews chapter seven builds its entire argument on this one line.

It applies this permanent priesthood directly to Jesus.

⏳ Regular priests served for limited time

⚰️ Each one died and was replaced

♾️ For ever means it never ends

📖 Hebrews seven applies this to Jesus

## 🗝️ After The Order Of Melchizedek

Melchizedek first appears in Genesis chapter fourteen.

He was king of Salem and also a priest of God Most High.

He blessed Abraham after a battle and received a tenth of the spoil.

Genesis never records his father, mother, or family line.

Hebrews chapter seven uses that silence to picture a priesthood without an ending.

👑 First appears in Genesis fourteen

🍞 King of Salem and priest of God

🧬 No father, mother, or family line recorded

📖 Hebrews seven pictures a priesthood without ending

# Psalms 110:5-7
# ⚔️ He Shall Strike Through Kings
---
## ⚔️ The Lord At Thy Right Hand Shall Strike Through Kings

Verse one pictured this king sitting at the LORD's right hand.

Now the LORD is pictured standing at his right hand instead.

The positions have switched to show a close partnership.

"Strike through" means to pierce completely, not wound lightly.

Kings here stands for hostile rulers who oppose God's plan.

🔄 Positions switch from verse one

🤝 Pictures a close partnership

🗡️ Strike through means pierce completely

📖 Kings means rulers opposing God's plan

## 📅 In The Day Of His Wrath

"The day of his wrath" names one specific appointed day.

It does not describe God's constant, everyday mood.

Other prophets use this same phrase for a future day of judgment.

That day is set apart from ordinary time.

It arrives on God's own schedule, not by human timing.

📅 Names one specific appointed day

🚫 Not God's constant, everyday mood

📜 Other prophets use this same phrase

📖 Arrives on God's own schedule

## 🌍 He Shall Judge Among The Heathen

"Heathen" here means the nations outside Israel.

It points to the whole surrounding world, not one enemy.

This king's judgment is pictured reaching every nation.

His rule was never meant for Israel alone.

The scope widens far beyond one small kingdom.

🌍 Heathen means nations outside Israel

🌐 Points to the whole surrounding world

👑 Judgment pictured reaching every nation

📖 Rule was never for Israel alone

## ⚔️ He Shall Fill The Places With The Dead Bodies

This line pictures a battlefield after a massive defeat.

Ancient war poetry often used this same vivid image.

It communicates total, overwhelming victory, not a narrow win.

The scale pictured here is much larger than one battle.

The image is meant to shock, not to be taken lightly.

⚔️ Pictures a battlefield after defeat

📜 Ancient war poetry used this image

💯 Communicates total, overwhelming victory

📖 Meant to shock, not softened

## ✂️ He Shall Wound The Heads Over Many Countries

"Heads" here means rulers and leaders, not literal skulls only.

Striking the head of a nation removes its leadership entirely.

"Many countries" widens this judgment far past one kingdom.

The picture is leadership collapsing across an entire region.

No single nation escapes this reach.

👤 Heads means rulers, not just skulls

✂️ Striking the head removes leadership

🌍 Many countries widens the judgment

📖 No single nation escapes this reach

## 🏞️ He Shall Drink Of The Brook In The Way

"The brook in the way" means a stream found along the road.

Ancient soldiers sometimes paused mid chase to drink from a stream.

Judges chapter seven pictures a similar moment during a pursuit.

This king is pictured pausing briefly during his own victory.

Even a divine victory here includes a very human, weary moment.

🏞️ Brook in the way means a roadside stream

🏃 Soldiers paused mid chase to drink

📜 Judges seven pictures a similar moment

📖 A weary, human moment inside victory

## 🙌 Therefore Shall He Lift Up The Head

"Lift up the head" pictures a posture of victory and honor.

Earlier in this psalm, enemy heads were struck down in defeat.

Here, this king's own head is lifted high instead.

The refreshment from the brook leads straight into this triumph.

The psalm closes on this image of exaltation.

🙌 Pictures a posture of victory

🔄 Contrasts the enemies' heads struck down

💪 This king's own head lifted high

📖 The psalm closes on exaltation
`.trim();

export const PSALMS_ONE_HUNDRED_TEN_PERSONAL_SECTIONS = parsePsalmsOneHundredTenRawNotes(PSALMS_ONE_HUNDRED_TEN_RAW_NOTES);
