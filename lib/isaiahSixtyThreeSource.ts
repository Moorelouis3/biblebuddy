export type IsaiahSixtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyThreeRawNotes(rawText: string): IsaiahSixtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+63:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 63 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+63:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+63:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 63 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 63,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 63:${startVerse}` : `Isaiah 63:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 63 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_THREE_RAW_NOTES = `# Isaiah 63:1-3
# 🍷 The Warrior From Edom
---
## 🗺️ Who Is This That Cometh From Edom

"Edom" was the nation descended from Esau, Jacob's twin brother.

Genesis already shows the tension between those two brothers.

That old rivalry lasted for centuries between their descendants.

A watchman on Zion's wall spots someone approaching from that direction.

The question sounds startled, almost afraid.

The next two verses answer exactly who this stranger is.

🗺️ Edom was Esau's nation
👥 Esau and Jacob were rivals
👀 A watchman spots this stranger
📖 The verses ahead reveal who he is

## 🩸 With Dyed Garments From Bozrah

"Bozrah" was one of Edom's chief cities.

His clothing looks stained a deep red.

A first reading might picture travel dust or wine.

The next verse removes any doubt about that color.

It is blood from a great defeat of Edom.

🏙️ Bozrah was a major Edomite city
🎨 His clothing looks deeply stained
❓ The color seems unclear at first
📖 Verse two removes all doubt

## 💪 I That Speak In Righteousness, Mighty To Save

The watchman's question finally gets an answer.

The approaching figure speaks for himself.

He does not name himself yet.

He describes what he does instead.

He acts in righteousness.

He is strong enough to save.

⚖️ He claims perfect righteousness
💪 He claims real strength
🛟 He is mighty enough to save
📖 Power and goodness are paired

## 🍇 Red In Thine Apparel, Like Him That Treadeth In The Winefat

A "winefat" was the pit where workers crushed grapes with their feet.

Juice splashed up with every step.

It stained their clothes and legs deep red.

Think of a farmer stepping out of a vat after a long day.

His clothes would be soaked in the same color as the grapes.

Here the red is not grape juice.

🍇 A winefat was a grape crushing pit
🦶 Treading grapes stained a worker's clothes
🍷 That image explains the color
📖 Here the red is something else

## ⚔️ I Have Trodden The Winepress Alone

The winepress becomes a picture of judgment, not wine making.

This figure crushes his enemies the way feet crush grapes.

He states plainly that he did this without any help.

No army marched beside him.

No ally shared the weight of that fight.

⚔️ The winepress now pictures judgment
🦶 Enemies are crushed like grapes
🙅 No army helped him
📖 He carried the fight alone

## 🩸 Their Blood Shall Be Sprinkled Upon My Garments

The metaphor and the reality finally meet in one line.

Grape juice from the winepress picture becomes real blood here.

That blood lands on his own clothing.

It is the same clothing the watchman noticed first.

This is not a stray detail.

It is the answer the whole scene has been building toward.

🩸 Blood replaces the grape juice picture
👕 It lands on his own clothing
🔁 This answers the watchman's opening question
📖 The picture and the reality now match

# Isaiah 63:4-6
# ⚖️ The Day Of Vengeance
---
## 📅 The Day Of Vengeance Is In Mine Heart

"Vengeance" here means setting right what was wronged.

That work belongs to the rightful judge alone.

This anger was not sudden or careless.

It had been planned long before this moment.

It simply waited for the right time to act.

⚖️ Vengeance means setting a wrong right
🧠 This was planned, not sudden
⏳ It waited for the right time
📖 God's judgment is never careless

## 🎉 The Year Of My Redeemed Is Come

"Redeemed" means those who were bought back or rescued.

A specific year is named here, not a vague future hope.

Israel's release finally arrives on schedule.

Judgment on Edom and rescue for God's people arrive together.

🎉 Redeemed means rescued and bought back
📆 A specific year is named
🔓 Israel's release finally arrives
📖 Judgment and rescue happen together

## 🙅 There Was None To Help, And None To Uphold

This figure looked for allies and found none.

That detail is not a complaint.

It proves that this victory comes from his own power.

No human effort gets credit for it.

🔍 He looked for help and found none
🚫 No one stood ready to assist
💪 The victory is entirely his own
📖 No human effort shares the credit

## 💪 Mine Own Arm Brought Salvation Unto Me

"Arm" is an old way of picturing someone's strength.

It is not a literal body part.

Scripture uses this image again and again for God's power.

He needed no outside weapon or army.

His own strength was already more than enough.

💪 Arm pictures strength, not a body part
📖 Scripture often uses this same image
🛡️ He needed no outside weapon
➡️ His own strength was already enough

## 🔥 I Will Tread Down The People In Mine Anger

The winepress picture from verse three returns here.

This time it names exactly who gets trampled.

The nations that opposed him are the target.

"Make them drunk in my fury" pictures enemies stumbling and confused.

A drunk man cannot stand straight.

Judgment leaves them disoriented, not just defeated.

🔥 The winepress picture returns
🌍 This time the nations are named
🍷 Drunk pictures stumbling confusion
📖 Judgment leaves them disoriented

## 🌍 I Will Bring Down Their Strength To The Earth

"Bring down to the earth" is a picture of total collapse.

Whatever power these nations once had gets emptied out.

This finishes the scene that began with a single stranger stained red.

One figure, acting alone, ends an entire nation's strength.

🌍 Bring down pictures total collapse
💨 Their power is emptied out
🍇 This finishes the winepress scene
📖 One figure alone ends a nation's strength

# Isaiah 63:7-9
# ❤️ Remembering The LORD's Mercies
---
## 💛 The Lovingkindnesses Of The LORD

"Lovingkindness" is one Hebrew word for a much bigger idea.

It means God's loyal, covenant keeping love.

It is not a passing feeling.

It is a love that keeps its promises no matter what.

The speaker shifts here from describing judgment to remembering mercy.

That shift changes the whole tone of the chapter.

💛 Lovingkindness means loyal, promise keeping love
🤝 It is tied to God's covenant
🔄 The tone shifts from judgment to mercy
📖 Mercy now takes center stage

## 👪 Surely They Are My People, Children That Will Not Lie

God names Israel as his own family here.

This is more than calling them his subjects.

"Children that will not lie" describes the relationship God hoped for.

The verses right after this admit that hope did not always hold true.

Even so, God still claims them as his own.

👪 God calls Israel his own family
🤥 This describes the loyalty God hoped for
😔 That hope was not always kept
📖 God still claims them anyway

## 😢 In All Their Affliction He Was Afflicted

"Affliction" means suffering or hardship.

This line says God did not simply watch that suffering from a distance.

He felt it alongside his people.

That is a striking claim about God's own heart.

He is never described here as untouched by pain.

😢 Affliction means real suffering
👀 God did not watch from a distance
❤️ He felt it alongside his people
📖 God is not untouched by pain

## 👼 The Angel Of His Presence Saved Them

"The angel of his presence" is a rare title in scripture.

It points to a messenger who carries God's own presence.

This is not just an ordinary angel.

This is the same presence that led Israel through the wilderness.

Rescue here comes directly from God.

👼 A rare title for a special messenger
🌟 He carries God's own presence
🐫 This presence led Israel through the wilderness
📖 Rescue comes directly from God

## 💕 In His Love And In His Pity He Redeemed Them

Two words stack here on purpose, love and pity.

"Pity" means deep compassion for someone in a hard place.

Redemption is never shown here as a cold, legal transaction.

It flows out of real affection.

💕 Love and pity are named together
😢 Pity means deep compassion
🚫 Redemption was never cold or distant
📖 It flowed from real affection

## 🤱 He Bare Them, And Carried Them All The Days Of Old

This pictures a parent carrying a tired child.

It is not simply a leader guiding a group.

"All the days of old" stretches this care across Israel's entire history.

It was never just one rescue.

The image is tender, not just powerful.

🤱 Pictures a parent carrying a tired child
📆 This covers Israel's whole history
💪 The image is tender, not only powerful
📖 God's care never had a gap

# Isaiah 63:10-14
# 🕊️ Rebellion And The Memory Of Moses
---
## 😔 They Rebelled, And Vexed His Holy Spirit

"Vexed" means to grieve or provoke someone deeply.

The tone shifts sharply after six verses about tender mercy.

This is one of the few Old Testament verses that names the Holy Spirit directly.

Rebellion here is described as personal pain caused to God.

It is not just a broken rule.

😔 Vexed means to grieve deeply
🔄 The tone shifts sharply here
📜 This directly names the Holy Spirit
📖 Rebellion caused God real pain

## ⚔️ He Was Turned To Be Their Enemy

This is a hard sentence to read.

The same God who carried them like a parent now fights against them.

That reversal did not come from nowhere.

It followed directly from the rebellion named in the line before it.

Their own choice changed the relationship.

⚔️ God became their opponent
🔄 This follows directly from their rebellion
💔 A hard reversal to read
📖 Their choice changed the relationship

## 🧓 Then He Remembered The Days Of Old, Moses

The tone shifts again here, from judgment back toward hope.

"Remembered" does not mean God had forgotten.

It means God's people now recall his past faithfulness on purpose.

Three questions follow this line.

Each one points back to the Exodus.

🧓 Days of old points back to the Exodus
🔄 The tone shifts toward hope again
🧠 Remembered means recalling on purpose
📖 Three questions follow this line

## 🌊 Where Is He That Brought Them Up Out Of The Sea With The Shepherd Of His Flock

"The sea" is the Red Sea, crossed during the Exodus from Egypt.

"The shepherd of his flock" is Moses.

He is pictured leading Israel the way a shepherd leads sheep.

This question is really a plea.

It asks where that same power has gone.

It is not doubt so much as desperate hope.

🌊 The sea means the Red Sea crossing
🐑 The shepherd means Moses
❓ The question is really a plea
📖 It voices desperate hope, not doubt

## 🕊️ Where Is He That Put His Holy Spirit Within Him

This asks where the same Spirit that empowered Moses has gone.

That same Spirit was named earlier in the chapter.

It was the one described as grieved.

The question circles back to where the trouble started.

🕊️ Asks where that same Spirit has gone
🔁 This is the Spirit named earlier as grieved
🔄 The question circles back to the problem
📖 The plea and the pain connect

## 💪 Led Them By The Right Hand Of Moses With His Glorious Arm

"Right hand" pictures strength and authority.

It works much like "arm" did back in verse five.

Moses acted, but the power moving through him belonged to God.

The human leader and the divine strength are named together.

💪 Right hand pictures strength and authority
🙌 The power was not Moses's own
🤝 Human leader, divine strength, named together
📖 God worked through a human leader

## 🌊 Dividing The Water Before Them

This recalls the parting of the Red Sea directly.

Millions of people needed a path that simply should not have existed.

God made one anyway.

🌊 This recalls the Red Sea parting
👥 A path for a whole nation
✨ That path should not have existed
📖 God made a way where none was

## 🏆 To Make Himself An Everlasting Name

The Exodus was never only about rescuing Israel.

It was also about God's own reputation.

"Everlasting name" means a reputation that outlasts any single event.

That purpose still holds true in every generation that remembers this story.

🏆 The Exodus built God's own reputation
📆 Everlasting name means lasting across generations
🌍 The purpose reached beyond one rescue
📖 That reputation still holds true today

## 🐎 As An Horse In The Wilderness, That They Should Not Stumble

A horse moves surely across rough ground.

It does not lose its footing.

Israel's long trek through the wilderness gets pictured the same way.

Dangerous terrain did not become the reason for disaster.

God's guidance kept their footing sure the whole way.

🐎 A horse moves surely on rough ground
🏜️ Israel's trek is pictured the same way
⚠️ Dangerous terrain did not cause disaster
📖 God kept their footing sure

## 🐑 As A Beast Goeth Down Into The Valley, The Spirit Of The LORD Caused Him To Rest

Cattle heading down into a valley find real rest.

That calm picture closes out the whole Exodus memory.

The journey began with crushing labor in Egypt.

It ends here in genuine rest.

🐑 Cattle in a valley find real rest
🏜️ This closes the Exodus memory
⛓️ The journey began in hard labor
📖 It ends here in genuine rest

# Isaiah 63:15-19
# 🙏 A Desperate Prayer For Return
---
## 👁️ Look Down From Heaven, And Behold

The tone shifts one more time, from memory into direct prayer.

"Behold" is an old word for look.

It means pay close attention.

"The habitation of thy holiness and of thy glory" names heaven itself.

It is God's own dwelling place.

The prayer opens by simply asking God to look.

👁️ The chapter shifts into direct prayer
👀 Behold means look and pay attention
🏠 Heaven is named as God's dwelling place
📖 The prayer begins with a simple ask

## ❓ Where Is Thy Zeal And Thy Strength

"Zeal" means passionate, active care, not mere interest.

The speaker asks where that same zeal has gone.

This question echoes the same questions asked about Moses earlier.

It sounds bold, almost like a complaint.

It actually comes from real desperation.

🔥 Zeal means passionate, active care
❓ The speaker asks where it went
🔁 This echoes the questions about Moses
📖 Boldness here comes from desperation

## 💓 The Sounding Of Thy Bowels And Of Thy Mercies

"Bowels" was an old way of naming the seat of deep emotion.

It works much like "heart" does today.

The question asks whether God's compassion has been held back.

"Are they restrained" makes the question explicit.

This is raw, honest language.

It is not polished poetry for its own sake.

💓 Bowels meant the seat of deep emotion
🤲 The question asks about God's compassion
🚧 Restrained asks if it has been held back
📖 This is raw, honest prayer

## 👴 Doubtless Thou Art Our Father, Though Abraham Be Ignorant Of Us

The speaker admits something painful here.

Even Abraham, Israel's great ancestor, would not recognize them now.

Even so, the prayer insists on one thing.

God's fatherhood does not depend on any human ancestor.

👴 Even Abraham would not recognize them
😔 That admission is painful to make
🙌 God's fatherhood does not depend on ancestors
📖 The claim on God stands on its own

## ♾️ Thy Name Is From Everlasting

Human ancestors come and go, generation after generation.

God's own name has no starting point.

It has no ending point either.

The prayer leans on that permanence when everything else feels unstable.

♾️ God's name has no beginning or end
👴 Human ancestors come and go
🌊 The prayer leans on that permanence
📖 Stability comes from who God is

## ❓ Why Hast Thou Made Us To Err From Thy Ways

This is one of the boldest questions in the whole chapter.

The speaker seems to blame God for the people's own hardened hearts.

Many scholars believe this reflects raw grief more than careful theology.

Scripture allows this kind of honest, unfiltered prayer.

❓ A bold, uncomfortable question
😤 It seems to blame God directly
📜 Likely raw grief, not careful theology
📖 Scripture allows honest, unfiltered prayer

## 🙏 Return For Thy Servants' Sake, The Tribes Of Thine Inheritance

The prayer turns from questioning to asking directly.

"Return" means come back and act on Israel's behalf again.

"Thine inheritance" reminds God that Israel still belongs to him.

It belongs to no one else.

The plea rests on an old relationship, not on Israel's own record.

🙏 The prayer turns to a direct request
🔄 Return means come back and act
👥 Inheritance means Israel still belongs to God
📖 The plea rests on relationship, not record

## 🏚️ The People Of Thy Holiness Have Possessed It But A Little While

"The people of thy holiness" describes Israel as a nation set apart.

Their time living peacefully in the land felt painfully short.

That short span makes the loss described next feel even sharper.

🏚️ Holy people means a nation set apart
⏳ Their peaceful time felt painfully short
💔 That shortness sharpens the loss ahead
📖 A brief possession, quickly lost

## 🏛️ Our Adversaries Have Trodden Down Thy Sanctuary

"Sanctuary" means the temple in Jerusalem.

It was the place built for worship.

Enemy nations had overrun and defiled that sacred place.

This was not only a national loss.

It felt like an attack on God's own house.

🏛️ Sanctuary means the Jerusalem temple
👣 Enemies overran and defiled it
😢 This was not only a national loss
📖 It felt like an attack on God's house

## 🙌 We Are Thine

The chapter's final plea is short and direct.

"Thou never barest rule over them" admits something hard.

Other nations, not God, had ruled Israel for most of their years.

"They were not called by thy name" admits Israel had not always lived like God's own people.

Even so, the last word is still a claim of belonging.

🙌 The plea ends short and direct
👑 Other nations had ruled instead of God
🏷️ Israel had not always lived like God's people
📖 The final word is still belonging`.trim();

export const ISAIAH_SIXTY_THREE_PERSONAL_SECTIONS = parseIsaiahSixtyThreeRawNotes(ISAIAH_SIXTY_THREE_RAW_NOTES);
