export type PsalmsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSevenRawNotes(rawText: string): PsalmsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 7:${startVerse}` : `Psalms 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 7 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVEN_RAW_NOTES = `# Psalms 7:1-2
# 🦁 Fleeing From The Lion
---
## 🛡️ In Thee Do I Put My Trust

This psalm carries a heading calling it a Shiggaion of David.

No one today knows for certain what Shiggaion means.

Many scholars connect it to a word for wandering or wild emotion.

The heading also names Cush the Benjamite as the source of this trouble.

"Trust" means resting your whole weight on someone, not simply hoping.

David answers an unnamed threat by naming exactly where his safety lies.

📜 Shiggaion is a psalm heading of uncertain meaning
😠 Cush the Benjamite caused this trouble
🛡️ Trust means resting full weight on God
📖 David names his safety before naming the threat

---

## 🙏 Save Me From All Them That Persecute Me, And Deliver Me

David asks for two things in one breath, saving and delivering.

"Save" pictures rescue from a specific, present danger.

"Deliver" pictures being carried fully out of it, not just eased.

The psalm never names exactly who these persecutors are.

That silence lets any reader facing opposition pray this same line.

🆘 Save means rescue from present danger
🚪 Deliver means fully carried out of it
🙈 The persecutors are never named
📖 Any reader facing opposition can pray this

---

## 🦁 Lest He Tear My Soul Like A Lion, Rending It In Pieces

David pictures his enemy as a lion tearing its prey apart.

"Rending" means tearing violently into separate pieces.

Ancient shepherds in this region often lost sheep to real lions.

David is not reaching for a random image.

He is naming a threat everyone around him would recognize.

"None to deliver" pictures total helplessness.

No one is left who could step in and save him.

🦁 David pictures a lion tearing its prey
✂️ Rending means tearing violently apart
🐑 Real lions actually threatened shepherds here
📖 David names a threat everyone recognized

# Psalms 7:3-5
# ⚖️ An Oath Of Innocence
---
## 🙌 If I Have Done This, If There Be Iniquity In My Hands

David does not know exactly what Cush accused him of doing.

"This" points back to that unnamed accusation from the psalm's heading.

"Iniquity in my hands" means guilt shown through actual wrongdoing, not just thoughts.

David is willing to test his own innocence out loud before God.

He is not afraid of the accusation being examined closely.

❓ This refers to Cush's unnamed accusation
✋ Iniquity in my hands means actual wrongdoing
🔍 David invites God to examine him
📖 He is not afraid of scrutiny

---

## 🕊️ If I Have Rewarded Evil Unto Him That Was At Peace With Me

David widens his oath to include how he treats his friends.

"At peace with me" describes someone who was not his enemy at all.

Rewarding evil for peace would mean betraying someone who trusted him.

He even says he freed an enemy who attacked him without any cause.

David's claim of innocence covers both friends and enemies.

🤝 At peace with me means a true friend
💔 Betraying peace would break real trust
🕊️ David freed an enemy without cause
📖 His innocence covers friends and enemies

---

## 🌍 Let The Enemy Persecute My Soul, And Take It

David turns his oath into a challenge aimed at himself.

If he is guilty, he invites the enemy to actually win.

"Take it" pictures his life being seized completely, not just threatened.

This is a serious risk to state out loud in a public prayer.

David is that confident in his own innocence.

⚔️ David turns his oath into a challenge
🏆 He invites the enemy to win if guilty
🫳 Take it pictures his life being seized
📖 David is confident in his innocence

---

## 🕯️ Lay Mine Honour In The Dust, Selah

"Honour" here means David's reputation and standing among his people.

Being laid in the dust pictures total public disgrace.

David says the enemy may crush his reputation completely if he is lying.

"Selah" is a musical or liturgical pause whose exact purpose is not fully known.

It likely told the original singers to stop and let the words sink in.

The oath is meant to be felt, not rushed past.

👑 Honour means David's reputation and standing
🕳️ Dust pictures total public disgrace
⏸️ Selah likely marks a pause to reflect
📖 The oath is meant to be felt

# Psalms 7:6-8
# ⚡ Arise To Judge
---
## 😤 Arise, O LORD, In Thine Anger

David is not asking God to lose control or sin.

In the Old Testament, God's anger usually means active justice against wrong.

"Arise" pictures a king standing up from his throne to act.

David wants God to move from listening to actually acting.

This is a request for justice, not for divine rage.

😤 Arise pictures a king standing to act
⚖️ Anger here means active justice not rage
🪑 God is asked to move from his throne
📖 David wants justice, not simple fury

---

## 📯 So Shall The Congregation Of The People Compass Thee About

"Congregation" pictures a whole assembly of witnesses gathering together.

"Compass about" means surrounding someone on every side.

David imagines God's justice happening in full public view.

This is not a private, hidden verdict between David and God alone.

The whole community would see whether David's claim of innocence held up.

👥 Congregation means a whole gathered assembly
🔄 Compass about means surrounded on every side
👀 David wants justice done in public
📖 The whole community would see the verdict

---

## 👨‍⚖️ The LORD Shall Judge The People, Judge Me, O LORD

David asks God to judge everyone, not just his own case.

Then he narrows the same request down to himself specifically.

"Righteousness" here means right standing measured by David's actual conduct.

"Integrity" means wholeness, a life that matches on the inside and outside.

David is asking to be measured by the same standard as everyone else.

🌍 David first asks God to judge everyone
🎯 Then he narrows it to himself
⚖️ Righteousness means right standing by conduct
📖 David wants the same standard applied to him

# Psalms 7:9-11
# 🔥 The God Who Tries Hearts
---
## 🛑 Let The Wickedness Of The Wicked Come To An End

David prays for wicked actions to stop, not simply for wicked people to vanish.

"Come to an end" pictures a pattern being cut off completely.

In the very same line he prays for the just to be established instead.

David wants wrong stopped and right upheld, not only punishment handed out.

Justice here means restoring balance, not only revenge.

🛑 David prays for wicked patterns to stop
🏛️ Establish the just means upholding the innocent
⚖️ David wants balance restored, not only revenge
📖 Justice means more than punishment

---

## 🔬 The Righteous God Trieth The Hearts And Reins

"Trieth" means tests or examines closely, like metal tested for purity.

"Hearts" in Hebrew thought represented a person's thoughts and decisions.

"Reins" literally means kidneys, believed to be the seat of emotion.

Together the phrase means God examines both what a person thinks and feels.

Nothing about a person is hidden from that kind of examination.

🔬 Trieth means tests closely like refined metal
🧠 Hearts represented a person's thoughts
💭 Reins meant the kidneys, seat of emotion
📖 Nothing in a person stays hidden from God

---

## 🛡️ My Defence Is Of God, Which Saveth The Upright In Heart

"Defence" pictures a shield or a wall protecting someone under attack.

David says that shield belongs to God, not to his own strength.

"Upright in heart" describes someone whose inner life matches their outward claim.

David is not claiming perfection.

He is claiming honesty.

His safety rests on that honesty, backed by God.

🛡️ Defence pictures a shield protecting someone
💪 The shield belongs to God, not David
❤️ Upright in heart means honest, not perfect
📖 David's safety rests on honesty before God

---

## 😠 God Is Angry With The Wicked Every Day

This line describes God's anger as constant, not occasional.

It is easy to picture God's anger as a single, dramatic outburst.

"Every day" describes something steady, more like a settled verdict than a mood.

God's opposition to evil does not take a day off.

That steadiness is actually part of what makes God's justice trustworthy.

📅 Every day means constant, not occasional
🎭 This is not a single dramatic outburst
⚖️ It is a settled verdict, not a mood
📖 God's steady justice makes it trustworthy

# Psalms 7:12-13
# 🏹 Weapons Made Ready
---
## ⚔️ He Will Whet His Sword, He Hath Bent His Bow

"Whet" means sharpening a blade until it is ready to cut.

Bending a bow means pulling it taut and ready to fire.

Both pictures describe a weapon prepared, not yet actually used.

This applies to someone who refuses to turn from wrongdoing.

God's judgment is being prepared, but it has not yet been carried out.

🗡️ Whet means sharpening a blade to cut
🏹 A bent bow is pulled taut and ready
⏳ Both weapons are prepared, not yet used
📖 Judgment is readied but not yet carried out

---

## 💀 He Hath Prepared For Him The Instruments Of Death

"Instruments of death" is a general phrase covering any weapon of judgment.

The text does not list a specific weapon here.

That vagueness makes the threat feel larger, not smaller.

"For him" makes clear this judgment is aimed at one particular person.

The wicked man of this psalm, not people in general.

💀 Instruments of death covers any weapon
❓ No specific weapon is named here
📈 The vagueness makes the threat feel larger
📖 The judgment targets one specific person

---

## 🎯 He Ordaineth His Arrows Against The Persecutors

"Ordaineth" means appoints or assigns for a specific purpose.

The arrows are not random.

They are deliberately aimed.

"Persecutors" ties this back to the very people named in verse one.

The threat that opened the psalm is answered directly by the end of this section.

🎯 Ordaineth means deliberately appointed for a purpose
🏹 The arrows are aimed, not random
🔄 Persecutors echoes the opening of the psalm
📖 The opening threat is answered directly

# Psalms 7:14-16
# 🕳️ Falling Into His Own Trap
---
## 🤰 He Travaileth With Iniquity, And Hath Conceived Mischief

"Travaileth" pictures the pain and labor of childbirth.

David uses that image for someone plotting evil.

"Conceived mischief" pictures a plan for harm starting small, like a pregnancy.

The wicked person is described as pregnant with his own downfall.

This is an uncomfortable image on purpose, meant to feel unnatural.

🤰 Travaileth pictures the pain of childbirth
📝 Conceived mischief pictures a plan for harm
🌱 The plan starts small, like a pregnancy
📖 The wicked carries his own downfall inside him

---

## 🕳️ He Made A Pit, And Digged It, And Is Fallen Into The Ditch

This verse pictures a hunter digging a trap for someone else.

Pits like this were a common way to catch wild animals in this era.

The wicked man falls into the very trap he built himself.

David is describing poetic justice, not random bad luck.

The harm meant for someone else lands back on its own maker.

🕳️ The wicked digs a hunting trap
🐾 Pits were a common way to catch animals
🔄 He falls into his own trap
📖 The harm lands back on its maker

---

## 🔁 His Mischief Shall Return Upon His Own Head

"Return upon his own head" means the harm comes back to its source.

This is not David asking for revenge to be added.

It is David trusting that consequences already built into the world will play out.

The wicked man's own plan becomes the very thing that judges him.

🔁 Return upon his head means harm circles back
🙅 This is not David demanding extra revenge
🌍 Consequences already built into the world play out
📖 His own plan becomes his judgment

---

## 🎯 His Violent Dealing Shall Come Down Upon His Own Pate

"Pate" is an old word for the top of someone's head.

This repeats the idea of the line just before it, in different words.

Hebrew poetry often restates one idea twice for emphasis.

The repetition makes the promise of justice feel certain, not just hopeful.

The psalm closes this section with confidence rather than doubt.

👤 Pate is an old word for the head
🔁 This repeats the line before it
📜 Hebrew poetry often restates ideas for emphasis
📖 The repetition makes justice feel certain

# Psalms 7:17
# 🎶 Praise Resolved
---
## 🙌 I Will Praise The LORD According To His Righteousness

The psalm ends by shifting from courtroom language to worship.

David does not wait for the verdict before he starts praising.

"According to his righteousness" means the praise matches who God actually is.

This is not praise for a favor already granted.

It is praise rooted in God's character, whatever happens next.

⚖️ The psalm shifts from courtroom to worship
🙌 David praises before the verdict arrives
🎯 Praise matches God's actual character
📖 This praise depends on God, not outcomes

---

## 🎵 Sing Praise To The Name Of The LORD Most High

"The name" represents God's whole character and reputation, not just a title.

"Most High" names God as ruler above every earthly threat, including Cush.

The psalm began with a specific enemy and ends with the biggest possible God.

That shift in size is the entire point of the prayer.

The threat named in verse one looks small by the end of the chapter.

🏷️ The name represents God's whole character
👑 Most High places God above every threat
📏 The psalm ends bigger than it began
📖 The threat looks small next to this God
`.trim();

export const PSALMS_SEVEN_PERSONAL_SECTIONS = parsePsalmsSevenRawNotes(PSALMS_SEVEN_RAW_NOTES);
