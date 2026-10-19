export type RevelationSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationSevenRawNotes(rawText: string): RevelationSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 7:${startVerse}` : `Revelation 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Revelation 7 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_SEVEN_RAW_NOTES = `# Revelation 7:1-3
# 🌬️ Four Angels Hold The Winds
---
## 🧭 Four Angels Standing On The Four Corners Of The Earth

This does not mean the earth has actual corners.

"Four corners" is an old way to say every direction at once.

North, south, east, and west are all covered here.

Four angels now stand guard over the whole earth at the same time.

Nothing escapes this kind of total coverage.

🧭 Four corners means every direction

🌍 The whole earth is covered

👼 Four angels stand full guard

📖 Nothing escapes God's reach

## 💨 Holding The Four Winds Of The Earth

"Holding" here does not mean literally gripping something.

It means restraining the winds from moving at all.

The four winds often picture storms, change, or coming judgment in scripture.

Daniel earlier saw four winds stir up the sea before four great beasts rose.

Here those same four winds are held back by command.

The storm itself now waits on God's timing.

💨 Holding means restraining, not gripping

🌬️ Four winds often picture judgment

📜 Daniel also saw four winds stir

➡️ The storm waits on God's timing

## 🌍 Nor On The Earth, Nor On The Sea, Nor On Any Tree

This list is not random.

Earth, sea, and trees name three separate targets.

Revelation eight later sends hail and fire upon the earth.

It also turns the sea to blood and burns up the trees.

This pause now protects the very things judgment will soon strike.

🌍 Earth, sea, and trees named here

🔥 Revelation eight strikes these same three

⏸️ This pause is deliberate

➡️ Judgment is coming, just delayed

## 🌅 Ascending From The East

The east is where the sun rises every single day.

In scripture, light and God's glory often appear from the east.

Ezekiel once saw the glory of God entering the temple from the east.

This angel's appearance echoes that same picture of light breaking in.

He arrives at the exact moment the earth needs mercy, not more harm.

🌅 East is where the sun rises

✨ God's glory often enters from there

📜 Ezekiel saw this same picture

➡️ Mercy arrives at just the right moment

## 🔏 Having The Seal Of The Living God

A seal in the ancient world was a mark pressed into wax or clay.

It proved ownership and carried the authority of whoever owned it.

Kings used personal seals to make orders official and unbreakable.

This angel carries God's own seal, not a human king's.

Whatever this seal marks belongs fully to the living God.

🔏 A seal proved ownership back then

👑 Kings used seals to show authority

🙌 This seal belongs to God himself

📖 Whoever is marked belongs to Him

## 👼 To Whom It Was Given To Hurt The Earth And The Sea

These four angels do not have free, independent power to harm anything.

The phrase "was given" means their authority to hurt the earth comes from somewhere higher.

Even angels who can bring destruction answer to God's permission first.

Nothing happens on earth outside what He allows.

👼 Their power to harm is given

⬆️ That authority comes from above

🚫 No angel acts on its own

📖 God permits even hard things first

## ⏳ Till We Have Sealed The Servants Of Our God

"Till" means until, pointing straight to an ending point.

Judgment on the earth is only paused, not canceled.

That pause lasts exactly as long as this sealing takes.

Once the sealing finishes, the restrained judgment can move forward again.

⏳ Till means until, not forever

⏸️ Judgment is paused, not canceled

✅ The pause ends once sealing is done

➡️ Judgment can then move forward again

## ✍️ In Their Foreheads

Marking the forehead made ownership visible to anyone looking.

This was a public sign, not a private, hidden one.

Later in Revelation, the beast forces his own mark onto people's foreheads and hands.

This earlier seal belongs to God, long before that counterfeit appears.

✍️ Foreheads make ownership visible

👀 This mark is public, not hidden

👹 The beast copies this later

📖 God's true seal comes first

# Revelation 7:4-8
# 🕎 The Sealing Of The Twelve Tribes
---
## 🔢 An Hundred And Forty And Four Thousand

This number is built from twelve multiplied by twelve, then multiplied by a thousand.

Twelve already pictures Israel's twelve tribes, a number of complete covenant order.

Squaring it and multiplying by a thousand pushes that completeness even further.

The number itself is less about an exact headcount and more about totality.

Every part of God's covenant people is accounted for here, not just a sample.

🔢 Twelve times twelve times a thousand

🕎 Twelve already pictures Israel's tribes

💯 The number signals full completeness

📖 God's whole covenant people are counted

## 👪 Of All The Tribes Of The Children Of Israel

Israel here means the twelve tribes descended from Jacob's twelve sons.

Jacob himself was renamed Israel back in Genesis thirty two.

Each tribe traces back to one of his sons or grandsons.

Naming all twelve tribes together signals that no part of the family is left out.

👪 Israel means Jacob's twelve tribes

🔁 Jacob was renamed Israel in Genesis

🌳 Every tribe traces back to one son

📖 No branch of the family is missing

## 👑 Of The Tribe Of Juda Were Sealed Twelve Thousand

Judah is named first here, even though he was not Jacob's oldest son.

Reuben held that birth order, not Judah.

Judah earns the lead spot because the promised King would come from his line.

Jesus himself is later called the Lion of the tribe of Juda in Revelation five.

👑 Judah leads, though not the firstborn

📜 Reuben was actually the oldest son

🦁 The Messiah comes through Judah's line

📖 Revelation five already named this Lion

## 🔁 Of The Tribe Of Manasses Were Sealed Twelve Thousand

This list quietly leaves out the tribe of Dan.

Older Bible lists of Israel's tribes almost always include Dan.

Manasses appears here instead, standing in for Ephraim, the tribe more commonly listed.

Manasses and Ephraim were both sons of Joseph, so this is still Joseph's family line.

The text never explains the change, so readers should not claim more certainty than it gives.

❓ Dan is missing from this list

🔁 Manasses stands in for Ephraim here

👨‍👦 Both were Joseph's own sons

📖 Scripture leaves the reason unexplained

## 🕯️ Of The Tribe Of Levi Were Sealed Twelve Thousand

Levi's tribe did not normally receive its own share of land in Israel.

They were set apart instead for priestly service to God.

Military counts elsewhere in scripture often leave Levi out for that same reason.

Here Levi is fully counted among the sealed, with no exception made.

🕯️ Levi served as priests, not landowners

🚫 Levi was often left out of counts

✅ Here Levi is fully included

📖 No one is excluded from this seal

## 👶 Of The Tribe Of Benjamin Were Sealed Twelve Thousand

Benjamin was Jacob's youngest son, born last of the twelve.

Naming him last here matches his place in the family's birth order.

The list now runs from Judah's leadership at the start to Benjamin's place at the end.

Together the twelve names form one complete family, start to finish.

👶 Benjamin was the youngest son

🔚 He closes the list in order

👪 All twelve sons are now named

📖 The whole family stands complete

# Revelation 7:9-12
# 🤍 A Multitude No One Could Count
---
## ♾️ A Great Multitude, Which No Man Could Number

This multitude stands in deliberate contrast to the counted number before it.

The one hundred forty four thousand had an exact count.

This multitude cannot be counted at all, no matter how hard anyone tries.

Together the two groups picture both God's precise care and His boundless reach.

🔢 The earlier group had an exact count

♾️ This multitude cannot be numbered

🤝 Both pictures describe the same salvation

📖 God's reach has no real limit

## 🌍 Of All Nations, And Kindreds, And People, And Tongues

This exact fourfold phrase appears several times across Revelation.

It names nation, family group, people, and language as four separate ways to describe humanity.

Stacking all four together leaves out no group of people anywhere on earth.

Salvation here is not limited to the twelve tribes named earlier in this chapter.

🌍 Nations, kindreds, people, and tongues combine

🔁 This phrase repeats across Revelation

🌐 No group of people is left out

📖 Salvation now reaches far beyond Israel

## 🤍 Clothed With White Robes

White robes already appeared earlier in Revelation as a picture of victory and purity.

Normal clothing gets stained and worn from daily life.

These robes stay perfectly white, showing a life made clean, not earned through effort.

The next few verses explain exactly how these robes became white.

🤍 White robes picture purity and victory

🧺 Normal clothes get stained over time

✨ These robes stay perfectly clean

📖 Verse fourteen explains exactly how

## 🌿 Palms In Their Hands

Palm branches were waved in the ancient world to celebrate victory or welcome a king.

Crowds once waved palm branches for Jesus when he entered Jerusalem.

Here the whole multitude waves them together before God's throne.

This is a scene of open, joyful celebration, not quiet reverence alone.

🌿 Palm branches celebrated victory or a king

👑 Crowds once waved them for Jesus

🎉 This scene is joyful celebration

📖 Victory belongs to God and the Lamb

## 🙌 Salvation To Our God Which Sitteth Upon The Throne

The multitude does not thank themselves for reaching this moment.

Every word of their cry points credit straight at God and the Lamb.

"Salvation" here is not a request, it is a declaration already true.

They are announcing a finished rescue, not asking for one.

🙌 Credit goes to God, not themselves

📣 Salvation is declared, not requested

✅ The rescue is already finished

📖 God and the Lamb share the praise

## 👴 The Elders And The Four Beasts

These elders and four beasts were already introduced back in Revelation four.

The twenty four elders pictured represented leadership before God's throne.

The four beasts, better understood as four living creatures, lead worship around that same throne.

Now the angels join that same inner circle in falling down before God.

👴 Elders were introduced in Revelation four

🦁 Four beasts means four living creatures

👼 Angels now join their worship

📖 Heaven's whole order bows together

## ✨ Blessing, And Glory, And Wisdom, And Thanksgiving, And Honour, And Power, And Might

This list names seven different things offered to God at once.

Seven often marks completeness throughout Revelation and the rest of scripture.

Each word points to a different reason God deserves praise, not one repeated idea.

A nearly identical sevenfold praise already appeared for the Lamb back in Revelation five.

✨ Seven words mark complete praise

🙏 Each word gives a different reason

🔁 A similar list already honored the Lamb

📖 Heaven's praise leaves nothing out

# Revelation 7:13-14
# 🩸 Washed White In The Lamb's Blood
---
## ❓ One Of The Elders Answered, Saying Unto Me

The word "answered" is curious here, since John never actually asked a question out loud.

Elders in Revelation often guide John's understanding rather than wait to be asked.

This elder already knows exactly what John is silently wondering.

Heaven's teachers here step in before confusion even has a chance to set in.

❓ Answered, though no question was spoken

👴 Elders often guide John's understanding

👀 This elder reads John's silent question

📖 Heaven teaches before confusion can grow

## 🧠 What Are These Which Are Arrayed In White Robes

The elder already knows the answer to his own question.

Asking it out loud invites John to think it through instead of simply being told.

This same teaching method appears elsewhere in scripture, including with Jesus and his disciples.

A question can teach more deeply than a flat statement sometimes can.

🧠 The elder already knows the answer

❓ The question invites John to think

🗣️ Jesus used this same teaching method

📖 Questions can teach more than statements

## ⏳ These Are They Which Came Out Of Great Tribulation

The phrase "the great tribulation" uses a specific article in the original language, not a vague one.

That points to one particular, identifiable period of suffering, not hardship in general.

Bible teachers disagree on whether this points to a future global crisis or ongoing suffering believers face throughout history.

What stays certain either way is that this multitude survived real, severe suffering before reaching this scene.

📖 The tribulation is specific, not vague

⏳ Teachers debate exactly when it happens

💔 Either way, real suffering came first

➡️ Survival here leads straight to God's presence

## 🩸 Washed Their Robes, And Made Them White In The Blood Of The Lamb

Blood normally stains fabric, not cleans it.

This is the exact opposite of how washing usually works.

Christ's own sacrifice is what truly makes the record clean.

No effort of their own earned that clean record.

The whiteness of these robes came at a real cost.

🩸 Blood usually stains, not cleans

🔄 This is the opposite on purpose

✝️ Christ's sacrifice makes the record clean

📖 Clean robes came at a real cost

# Revelation 7:15-17
# 😢 God Wipes Away Every Tear
---
## 🕯️ Serve Him Day And Night In His Temple

Earthly priests served in careful shifts, never working around the clock.

This service never stops and never tires anyone out.

"Day and night" here means without any break at all, forever.

Worship in this place is not a burden anyone needs rest from.

🕯️ Earthly priests worked limited shifts

🔄 This service never stops

💪 No rest is ever needed here

📖 Worship here brings no burden

## 🏠 He That Sitteth On The Throne Shall Dwell Among Them

"Dwell" means to live with someone permanently, not just visit.

God once dwelt with Israel through a tent called the tabernacle.

Here there is no tent or curtain separating anyone from His presence.

This moment points forward to an even fuller presence described later in Revelation twenty one.

🏠 Dwell means to live together permanently

⛺ God once dwelt in a tabernacle

🚫 No curtain separates anyone now

📖 Revelation twenty one completes this picture

## 💔 They Shall Hunger No More, Neither Thirst Any More

This multitude already suffered great tribulation back in verse fourteen.

Hunger and thirst were very likely part of that very real suffering.

Every lasting need from that hardship is now completely over.

What they once lacked, they now have in full, forever.

💔 They already suffered real tribulation

🍞 Hunger and thirst once marked that suffering

✅ Every lasting need is now over

📖 What was lacking is now full

## ☀️ Neither Shall The Sun Light On Them, Nor Any Heat

Scorching heat was a real danger for travelers in the ancient Near East.

Israel once suffered under brutal desert heat during their long wilderness years.

That same danger has no power here at all.

Protection here is total, covering even the smallest daily discomfort.

☀️ Desert heat was a real danger

🏜️ Israel suffered this in the wilderness

🛡️ That danger holds no power here

📖 Even small discomforts are covered

## 🐑 The Lamb... Shall Feed Them, And Shall Lead Them Unto Living Fountains Of Waters

A lamb does not normally feed or lead other animals, a shepherd does.

Calling Jesus both the Lamb and the shepherd here holds two truths together.

He gave himself as a sacrifice, and he also leads his people with care.

"Living fountains" means water that never runs dry, unlike wells that can fail.

🐑 A lamb does not normally lead

✝️ Jesus is both Lamb and shepherd

💧 Living fountains never run dry

📖 He gave himself, and he still leads

## 😢 God Shall Wipe Away All Tears From Their Eyes

This is one of the most quoted promises in the whole Bible.

"Wipe away" pictures a parent gently comforting a crying child.

Every tear named here points to real pain already lived through.

This exact promise appears again almost word for word in Revelation twenty one.

😢 Every tear here was real pain

🤲 Wipe away pictures gentle comfort

🔁 Revelation twenty one repeats this promise

📖 God himself ends all sorrow
`.trim();

export const REVELATION_SEVEN_PERSONAL_SECTIONS = parseRevelationSevenRawNotes(REVELATION_SEVEN_RAW_NOTES);
