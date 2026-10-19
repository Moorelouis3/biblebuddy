export type RevelationTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTwelveRawNotes(rawText: string): RevelationTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 12:${startVerse}` : `Revelation 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Revelation 12 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TWELVE_RAW_NOTES = `# Revelation 12:1-2
# 🌟 A Great Wonder In Heaven
---
## 🌞 A Woman Clothed With The Sun

This woman is not one specific person walking through heaven.

Many scholars believe she pictures the nation of Israel.

Israel is the people through whom God brought the Messiah into the world.

The sun, moon, and stars match an older picture from Genesis.

There, Joseph dreamed of his father, mother, and brothers bowing under those same symbols.

John borrows that family image to show where the Messiah truly came from.

🌞 The sun and moon picture glory

👪 Many scholars see Israel in this woman

🌟 The image echoes Joseph's dream in Genesis

📖 The Messiah comes from this very family

---

## 👑 Upon Her Head A Crown Of Twelve Stars

Twelve is not a random number in this picture.

It points to the twelve tribes of Israel, the sons of Jacob.

A crown here pictures honor and authority, not simple decoration.

John uses the number twelve again later for the twelve apostles.

He uses it again for the twelve gates of the New Jerusalem.

The number keeps tying this whole book back to God's chosen people.

🔢 Twelve points to the twelve tribes

👑 The crown pictures honor and authority

🚪 John reuses twelve for the New Jerusalem's gates

📖 The number ties the book to Israel

---

## 😣 Travailing In Birth, And Pained To Be Delivered

Travailing means going through the intense pain of childbirth.

John uses that real pain to picture tension before something new arrives.

The Old Testament often pictures a nation's struggle the same way.

Here it pictures Israel's long wait for the Messiah to be born.

The pain is real.

What comes from it is a child, not a disaster.

😣 Travailing means the pain of childbirth

⏳ It pictures tension before something new

📜 The Old Testament uses this image often

➡️ The pain ends with the Messiah's birth

# Revelation 12:3-6
# 🐉 The Dragon Appears
---
## 🐉 A Great Red Dragon, Having Seven Heads And Ten Horns

This dragon pictures Satan, not a literal animal.

Red suggests violence and bloodshed.

Seven heads picture complete, total power.

Ten horns picture great strength.

Seven crowns show a claim to rule, not just to attack.

Together, the picture is one of total, violent, self proclaimed authority.

🐉 The dragon pictures Satan himself

🩸 Red suggests violence and bloodshed

👑 Seven heads picture total power

➡️ Ten horns and crowns claim total authority

---

## ⭐ His Tail Drew The Third Part Of The Stars Of Heaven

This does not describe a literal tail knocking stars from the sky.

Stars often picture angels in this kind of writing.

Many scholars believe this pictures Satan pulling a third of the angels with him.

That rebellion was against God himself.

Even so, two out of three angels stayed loyal to God.

One being's rebellion can spread surprisingly far.

⭐ Stars often picture angels here

😈 Satan pulled a third of them with him

🙏 Two of three angels stayed loyal

➡️ Rebellion can spread further than expected

---

## 👹 Ready To Devour Her Child As Soon As It Was Born

The dragon waits for one purpose, to destroy this child the moment he arrives.

This pictures the many real attempts in history to wipe out the promised line of the Messiah.

Pharaoh once ordered Hebrew baby boys killed.

Herod later ordered the same thing in Bethlehem.

Satan stands behind every one of those attempts.

None of them ever succeeded.

👹 The dragon wants to destroy the child

👑 Pharaoh once targeted Hebrew baby boys

🏘️ Herod later targeted babies in Bethlehem

➡️ Every attempt against the Messiah failed

---

## ⚔️ Rule All Nations With A Rod Of Iron

A rod of iron pictures unstoppable, firm authority, not gentle guidance.

This exact phrase already appeared in Psalm two about God's promised king.

The child born here is the Messiah.

That old promise was always pointing toward him.

No enemy can bend or break this kind of rule.

The dragon's attack could not stop him from reaching his throne.

⚔️ A rod of iron means firm, unstoppable rule

📜 Psalm two already used this phrase

👑 The child is the promised Messiah

➡️ No attack could stop him from his throne

---

## 📅 A Thousand Two Hundred And Threescore Days

Threescore is an old word for sixty.

Twelve hundred and sixty days works out to about three and a half years.

This exact length of time comes back again later in this very chapter.

It also comes back later in the book, measured in months.

The number itself pictures a set, limited season of hardship.

God has already placed a limit on how long it lasts.

🔢 Threescore is an old word for sixty

📅 The number equals three and a half years

🔁 This same length returns later in the chapter

➡️ God has already limited this season of hardship

# Revelation 12:7-9
# ⚔️ War In Heaven
---
## 👼 Michael And His Angels Fought Against The Dragon

Michael is an archangel named only a few times in the whole Bible.

He appears in Daniel as the protector of God's people, Israel.

Here he leads heaven's own armies against Satan directly.

This is not a struggle between equals.

It is an angel obeying God's command against a rebel who refuses to obey.

👼 Michael is an archangel from Daniel

🛡️ He protects God's own people

⚔️ He leads heaven's armies against Satan

➡️ Obedience stands directly against rebellion

---

## 🚫 Neither Was Their Place Found Any More In Heaven

This phrase marks a permanent change, not a temporary retreat.

Satan and his angels lose their place in heaven for good.

Satan could still appear before God earlier in the Bible.

He does that at the start of Job.

That access ends here completely.

Heaven itself becomes a place he can never enter again.

🚫 This marks a permanent expulsion

📜 Satan once still appeared before God in Job

🔒 That access now ends completely

➡️ Heaven becomes closed to him forever

---

## 🐍 That Old Serpent, Called The Devil, And Satan

This single verse stacks up every major name for this enemy.

"That old serpent" points back to the snake in the garden of Eden.

"Devil" means accuser or slanderer.

"Satan" means adversary, someone who opposes another on purpose.

John wants the reader to know these are all the same being.

The deceiver in Eden is the same deceiver attacking the church now.

🐍 The old serpent recalls the garden of Eden

😈 Devil means accuser or slanderer

⚔️ Satan means adversary or opponent

➡️ One deceiver spans the whole Bible

# Revelation 12:10-12
# 📯 Now Is Come Salvation
---
## ⚖️ The Accuser Of Our Brethren Is Cast Down

An accuser brings formal charges against someone, often in a court setting.

Satan's whole role here has been standing before God and accusing believers of their sin.

Job chapter one already shows Satan doing exactly this against Job.

That accusing voice is now silenced for good.

His defeat means every charge he ever raised has lost its power.

⚖️ An accuser brings formal charges

😈 Satan accused believers before God

📜 Job already shows Satan doing this

➡️ His accusations have now lost their power

---

## 🩸 They Overcame Him By The Blood Of The Lamb

Believers do not defeat Satan through their own strength.

"The blood of the Lamb" points to Jesus and his death on the cross.

That sacrifice is the actual weapon used against the accuser.

Victory here belongs to Christ first, and to believers only through him.

No accusation can stand against someone covered by that blood.

🩸 The Lamb's blood means Jesus's sacrifice

🏆 That sacrifice defeats the accuser

🙏 Victory belongs to Christ first

➡️ No accusation can stand against it

---

## 💀 Loved Not Their Lives Unto The Death

This describes believers who were willing to die rather than deny their faith.

Their testimony mattered to them more than their own survival.

Many early Christians faced exactly this kind of choice under persecution.

Overcoming Satan here is not only about belief.

It is also about a willingness to stay faithful at any cost.

💀 They valued faith over their own lives

🗣️ Their testimony mattered most to them

⛓️ Early Christians often faced this choice

➡️ Faithfulness held even at the highest cost

---

## 😤 He Hath But A Short Time

Satan's wrath grows worse because he knows his time is now limited.

Being cast out of heaven does not make him calmer.

It makes him more desperate instead.

A cornered enemy often becomes more dangerous, not less.

This explains why hardship on earth increases after this point in the story.

His defeat is already certain.

The fight itself is not yet finished.

😤 His limited time makes him desperate

🦁 A cornered enemy grows more dangerous

🌍 Hardship on earth increases after this

➡️ His defeat is certain, the fight continues

# Revelation 12:13-17
# 🦅 The Woman In The Wilderness
---
## 🦅 Two Wings Of A Great Eagle

Eagle wings in the Bible often picture God's own protection and speed.

Moses already used this image in the book of Exodus.

There, God bore Israel out of Egypt on eagles' wings.

Here the same picture protects God's people again, this time from the dragon.

The method changes, but the protector stays exactly the same.

God's care for his people did not start or end in Exodus.

🦅 Eagle wings picture God's protection and speed

📜 Moses used this image in Exodus

🛡️ God protects his people again here

➡️ The same protector spans both Testaments

---

## 🔢 A Time, And Times, And Half A Time

This odd phrase is another way of counting three and a half years.

A time means one year.

Times means two more years.

Half a time means half a year.

Added together, that matches the twelve hundred and sixty days named earlier in this chapter.

Daniel used this exact phrase to describe a limited season of persecution.

John borrows Daniel's own language for the same kind of season here.

🔢 This phrase equals three and a half years

📜 Daniel used this same phrase first

🔁 It matches twelve hundred and sixty days

➡️ Persecution here has a set limit

---

## 🌊 Water As A Flood After The Woman

This flood is not a literal river chasing someone.

Water often pictures overwhelming trouble in this kind of writing.

The dragon throws a flood of persecution and lies after God's people.

The goal is to sweep them away completely.

Satan still works this way today.

Pressure can overwhelm just as much as direct force.

🌊 Water pictures overwhelming trouble here

😈 The dragon floods persecution and lies

🎯 The goal is to sweep people away

➡️ Pressure can overwhelm like direct force

---

## 🌍 The Earth Opened Her Mouth, And Swallowed Up The Flood

God does not need a dramatic miracle to protect his people every time.

Here creation itself simply absorbs the danger.

The earth acts almost like a drain.

It takes in the flood before it can reach the woman.

This is a quieter kind of rescue than fire from heaven or a parted sea.

Quiet does not mean weak.

God's protection still works even when it looks completely ordinary.

🌍 The earth absorbs the flood

🚰 It acts like a drain here

🕊️ This rescue is quiet, not dramatic

➡️ God's protection still works either way

---

## ⚔️ War With The Remnant Of Her Seed

Remnant means the smaller group that remains after a larger group is gone.

Here it refers to believers left on earth after the woman is protected.

"The commandments of God" and "the testimony of Jesus Christ" describe exactly who this remnant is.

They keep God's commands and hold firmly to faith in Jesus.

The dragon could not reach the woman.

So he turns his anger on them instead.

The fight continues wherever God's people still stand firm today.

📖 Remnant means those left after judgment

🙏 They keep God's commands and faith in Jesus

😤 The dragon turns on them instead

➡️ This fight continues today
`.trim();

export const REVELATION_TWELVE_PERSONAL_SECTIONS = parseRevelationTwelveRawNotes(REVELATION_TWELVE_RAW_NOTES);
