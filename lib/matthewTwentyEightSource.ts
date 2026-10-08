export type MatthewTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyEightRawNotes(rawText: string): MatthewTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 28:${startVerse}` : `Matthew 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Matthew 28 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_EIGHT_RAW_NOTES = `# Matthew 28:1-4
# 🪦 The Angel At The Tomb
---
## 🌅 In The End Of The Sabbath, As It Began To Dawn Toward The First Day Of The Week

The Sabbath ran from Friday evening to Saturday evening.

Jewish days began at sunset, not at midnight.

The first day of the week means Sunday on our modern calendar.

Matthew marks this exact moment with unusual care.

This is the very day the church would come to call the Lord's Day.

🌅 Sabbath ran Friday evening to Saturday evening
🌙 Jewish days began at sunset
☀️ First day of the week means Sunday
📖 This became the Lord's Day

## 👪 Came Mary Magdalene And The Other Mary

Mary Magdalene had once been freed by Jesus from a severe affliction.

She had followed him faithfully ever since.

The other Mary is the mother of James and Joses.

Matthew named both these women watching the crucifixion in the previous chapter.

These two faithful women are now the first to reach the tomb.

🕊️ Mary Magdalene was freed from affliction
👪 The other Mary mothered James and Joses
✝️ Both watched the crucifixion already
📖 Faithfulness led them to the tomb first

## 🌋 There Was A Great Earthquake

This is the second earthquake Matthew records in only two chapters.

The first came at the moment Jesus died, tearing the temple veil.

This one comes at the moment he rises from the dead.

Matthew ties both of history's greatest moments to a shaking earth.

Creation itself responds when its maker dies and when he rises again.

🌋 This is the second earthquake in two chapters
💔 The first came when Jesus died
🌅 This one comes when he rises
📖 Creation reacts to both death and life

## 👼 The Angel Of The Lord Descended From Heaven

An angel of the Lord already appeared earlier in this Gospel, warning Joseph in dreams.

Angel simply means messenger, a being sent to deliver God's word.

This time the angel appears openly in daylight, not in a dream.

The resurrection is too important to announce quietly.

God sends a visible messenger straight from heaven to mark the moment.

👼 Angel means a messenger from God
📜 This angel appeared before, to Joseph
☀️ This time it happens in daylight
📖 The resurrection gets an open announcement

## 🪨 Rolled Back The Stone From The Door

This does not mean the angel rolled the stone away so Jesus could climb out.

By this point Jesus had already risen inside the sealed tomb.

A resurrected body was not held back by a stone wall.

The stone was rolled back for the witnesses, not for Jesus.

It let the empty tomb be seen, not Jesus be freed.

🪨 This did not free Jesus from inside
✝️ He had already risen before the stone moved
👀 The stone was moved for witnesses
📖 The empty tomb needed to be seen

## ⚡ His Countenance Was Like Lightning, And His Raiment White As Snow

Countenance means his face and overall appearance.

Lightning and snow white clothing both describe something bright and otherworldly.

Jesus showed this same bright glory earlier, on the mountain of transfiguration.

This angel borrows that same visual language of glory.

Heaven announces this moment with brightness, not silence.

⚡ Countenance means his face and appearance
❄️ Lightning and snow describe divine brightness
⛰️ Jesus showed this glory at the transfiguration
📖 Heaven announces this moment with brightness

## 🪖 The Keepers Did Shake, And Became As Dead Men

These are the same soldiers Pilate had posted to guard the tomb.

The sight of the angel terrifies them completely.

They do not simply flee, they collapse as if dead themselves.

These same soldiers will soon be paid to deny what they just witnessed.

Fear did not stop them from later lying about this very moment.

🪖 These were the soldiers guarding the tomb
😱 The angel terrified them completely
💀 They collapsed as if dead
📖 They would later lie about this moment

# Matthew 28:5-7
# 📢 The Angel's Message To The Women
---
## 🛑 Fear Not Ye For I Know That Ye Seek Jesus, Which Was Crucified

The angel speaks directly to calm the women first.

He already knows exactly why they came.

They are not looking for a stranger, they are looking for Jesus specifically.

Naming him as the one who was crucified confirms this is the very same man.

The angel meets their grief before he gives them any news.

🛑 Fear not calms them first
👀 The angel knows their purpose already
🎯 They came looking for Jesus specifically
📖 Comfort comes before the news

## 🪦 He Is Not Here, For He Is Risen, As He Said

This is the plainest possible statement that Jesus rose from the dead.

Risen means he is alive again, not simply remembered or honored.

As he said points back to Jesus's own repeated predictions about this moment.

Jesus had told his disciples this would happen more than once, earlier in this Gospel.

What sounded impossible when he first said it has now actually happened.

🪦 He is not here means truly gone
🌅 Risen means alive again, not just remembered
🗣️ He had predicted this himself before
📖 His own words came true exactly

## 👀 Come, See The Place Where The Lord Lay

The angel invites the women to look for themselves rather than simply take his word.

An empty space inside the tomb becomes the first piece of evidence.

Seeing an empty space takes real faith.

There is nothing left to examine, only a bare stone shelf.

The women become the very first eyewitnesses of the empty tomb.

👀 The angel invites them to look themselves
🪦 An empty tomb is the first evidence
🙏 Believing an absence takes real faith
📖 They become the first eyewitnesses

## 📣 Go Quickly, And Tell His Disciples That He Is Risen From The Dead

The angel gives the women a task, not just information.

They become the very first messengers of the resurrection.

In this culture, a woman's testimony often carried less legal weight than a man's.

God chooses these women as witnesses anyway, ahead of any of the male disciples.

The most important news in history is first entrusted to them.

📣 The women get a task, not just news
👩 Women's testimony often carried less legal weight
🥇 God chooses them as witnesses anyway
📖 They are entrusted with history's biggest news

## 🗺️ He Goeth Before You Into Galilee

Jesus had told his disciples this exact plan the night before he was arrested.

Galilee was home territory, far from Jerusalem and the authorities who had killed him.

Meeting there instead of staying in Jerusalem removes any doubt about where to go next.

The promise they would see him there is repeated from that earlier night.

Jesus plans the reunion before anyone else even knows he is alive.

🗺️ Galilee was home territory, away from danger
🌙 Jesus predicted this plan before his arrest
🔁 The promise is repeated here exactly
📖 Jesus planned the reunion in advance

# Matthew 28:8-10
# 🏃 Jesus Meets The Women
---
## 😨 They Departed Quickly From The Sepulchre With Fear And Great Joy

Fear and joy do not usually belong together, yet both are completely true here.

Fear comes from witnessing an angel and an earthquake only moments earlier.

Joy comes from hearing that Jesus is alive.

Matthew lets both emotions stand side by side without smoothing either one away.

Real faith often holds fear and joy together instead of choosing one.

😨 Fear came from the angel and earthquake
😊 Joy came from the resurrection news
🏃 They ran with both feelings at once
📖 Faith can hold fear and joy together

## 🥇 Jesus Met Them

This is Jesus's first appearance to anyone after his resurrection.

He appears to these women before he appears to any of his male disciples.

Matthew records this order plainly, without drawing extra attention to it.

The first witnesses of the empty tomb are also the first to see Jesus alive.

God again chooses the overlooked to carry the greatest news.

🥇 This is Jesus's first resurrection appearance
👩 Women see him before any male disciple
📜 Matthew records the order plainly
➡️ God chose the overlooked as witnesses

## 🦶 They Came And Held Him By The Feet, And Worshipped Him

Holding him by the feet means they physically touched his real body.

This was not a ghost or a vision.

Worship here means recognizing him as God, not simply a teacher come back to life.

Their actions already matched a growing understanding of who he truly was.

Touch and worship together confirm a real, bodily resurrection.

🦶 They physically touched his body
👻 This was not a ghost or vision
🙏 Worship means recognizing him as God
📖 This confirms a real bodily resurrection

## 🛑 Be Not Afraid

Jesus repeats the same comfort the angel had already given them.

This is the first thing Jesus himself says after rising from the dead.

His first concern is calming frightened friends, not making a grand announcement.

Even in triumph, Jesus leads with gentleness.

The resurrected Jesus is still the same compassionate person he was before.

🛑 This repeats the angel's earlier comfort
🗣️ These are Jesus's first resurrection words
💛 His first concern is calming his friends
📖 Resurrection did not change his gentle character

## 👬 Go Tell My Brethren That They Go Into Galilee

Brethren means brothers, and here it refers to the disciples.

Days earlier, every one of these same disciples had abandoned Jesus at his arrest.

Jesus calls them brethren anyway, with no mention of their failure.

The relationship is restored before a single apology is even given.

Grace reaches them before guilt ever gets the chance to speak first.

👬 Brethren means the disciples, called brothers
🏃 They had all abandoned him days earlier
💞 Jesus restores the relationship without blame
📖 Grace reached them before guilt could

## ✅ There Shall They See Me

Jesus confirms the exact plan the angel had already described to the women.

Two separate messengers now agree on the same meeting place.

Jesus is not vague or uncertain about what comes next.

He already knows precisely how and where this story continues.

Every detail of the resurrection unfolds exactly as Jesus intended.

✅ This confirms the angel's exact plan
🗺️ Galilee remains the agreed meeting place
🎯 Jesus is certain, not vague
📖 Every detail unfolds as he intended

# Matthew 28:11-15
# 💰 The Guards' Bribe
---
## 🪖 Some Of The Watch Came Into The City

These are the very soldiers who had just witnessed the angel and the earthquake.

Instead of reporting to Pilate, who assigned them, they go to the chief priests.

That choice alone suggests where their real loyalty and payment came from.

Men paid to guard a king's tomb go running to his enemies instead.

Fear sends them to the people who can make this problem go away quietly.

🪖 These are the soldiers from the tomb
🏛️ They report to the chief priests, not Pilate
💰 That shows where their loyalty lay
📖 Fear sent them to the wrong allies

## 📜 Shewed Unto The Chief Priests All The Things That Were Done

Shewed is an older spelling of showed, meaning they reported everything in detail.

These soldiers deliver the single best piece of evidence for the resurrection in this entire chapter.

The very men paid to prevent a resurrection story become its first witnesses.

The chief priests now hear the truth directly from their own hired guards.

What they do with the truth next reveals exactly who they really are.

📜 Shewed is an older spelling of showed
🗣️ The soldiers report everything in detail
😳 Their own guards become resurrection witnesses
📖 Truth reached the priests directly

## 🏛️ They Gave Large Money Unto The Soldiers

The chief priests first meet with the elders to plan their response.

They pay to bury the truth, just as they once paid to arrange Jesus's arrest.

Thirty pieces of silver bought Judas's betrayal back in chapter twenty six.

Now a larger, unnamed sum buys a cover up for the resurrection itself.

A lie this large needed a price large enough to keep it quiet.

🏛️ Chief priests first met with the elders
🪙 Money bought Judas's betrayal earlier
💰 Now money buys this cover up too
📖 A big lie needed a big price

## 📝 Say Ye, His Disciples Came By Night, And Stole Him Away While We Slept

The chief priests invent a story and hand it to the soldiers to repeat.

The story collapses under its own logic almost immediately.

Sleeping soldiers cannot possibly witness and report what happened while they were asleep.

A Roman guard caught sleeping on duty also faced severe punishment, even execution.

The cover story asks people to trust testimony that contradicts itself.

📝 Priests invented this story for the soldiers
😴 Sleeping witnesses cannot report what they saw
⚠️ Sleeping on duty risked serious punishment
📖 The story contradicts itself from the start

## 🤐 If This Come To The Governor's Ears, We Will Persuade Him, And Secure You

The priests promise to protect the soldiers from Pilate if the lie is discovered.

Persuade here really means bribe or pressure, not simply convince with words.

Secure means the soldiers will be kept safe from punishment.

The priests are confident enough in their influence over Pilate to make this promise.

A lie this organized required real political power to keep it standing.

🤐 Priests promise to protect the soldiers
💸 Persuade here really means bribe Pilate
🛡️ Secure means kept safe from punishment
📖 This lie needed real political power

## 🪙 So They Took The Money, And Did As They Were Taught

The soldiers accept the bribe and repeat the story exactly as instructed.

They choose money and safety over the truth they personally witnessed.

Firsthand eyewitnesses of the resurrection become paid promoters of a lie instead.

Belief does not always follow from seeing something firsthand.

Even the clearest evidence can be bought and buried by people unwilling to accept it.

🪙 The soldiers accepted the bribe
🤥 They repeated the story exactly as told
👀 Eyewitnesses chose a lie over the truth
📖 Evidence alone cannot force belief

## 🗓️ This Saying Is Commonly Reported Among The Jews Until This Day

Matthew is writing years, maybe decades, after the events themselves took place.

Until this day tells readers this rumor had survived for a very long time.

Matthew addresses this rumor directly instead of pretending it never existed.

Naming a counter story this openly took real confidence in the truth he was reporting.

A resurrection rumor this persistent is itself a strange kind of evidence that something real happened.

🗓️ Matthew wrote years after these events
🗣️ This rumor had lasted a long time
💪 Matthew named the rumor openly, unafraid
📖 A rumor this stubborn hints something real happened

# Matthew 28:16-20
# ⛰️ The Great Commission
---
## 🔢 Then The Eleven Disciples Went Away Into Galilee

Eleven, not twelve, is the number left after Judas's betrayal and death.

His absence is a quiet, constant reminder of what happened in this story.

These eleven men make the journey despite having fled only days earlier.

God works through imperfect, once frightened followers, not a flawless team.

The eleven arrive ready to receive the most important instructions of their lives.

🔢 Eleven, not twelve, after Judas's betrayal
🏃 These same men had fled days earlier
💪 God uses imperfect, once frightened followers
📖 They arrive for history's biggest instructions

## ⛰️ Into A Mountain Where Jesus Had Appointed Them

Mountains carry special weight throughout this entire Gospel.

Jesus taught the Sermon on the Mount earlier from a mountainside.

Jesus also revealed his glory to three disciples on a mountain at the transfiguration.

Now Jesus gives his final, farthest reaching instructions from a mountain as well.

Matthew consistently uses mountains as the place where Jesus reveals something enormous.

⛰️ Mountains carry special weight in Matthew
📜 The Sermon was taught from a mountain
✨ The transfiguration also happened on one
📖 Jesus gives his final instructions there too

## 🙏 They Worshipped Him, But Some Doubted

Worship and doubt appear together in the very same sentence.

Matthew does not hide the fact that even eyewitnesses struggled to fully believe.

Some doubted likely means a few in the larger group of followers, not necessarily all eleven.

Real faith does not require erasing every last question first.

Jesus gives his followers their mission even while some still wrestle with doubt.

🙏 Worship and doubt sit side by side here
😕 Even eyewitnesses struggled to fully believe
👥 Some doubted likely means a few followers
📖 Jesus sends them out despite their doubt

## 👑 All Power Is Given Unto Me In Heaven And In Earth

Power here means total authority, not simply physical strength.

Jesus claims authority over absolutely everything, in heaven and on earth alike.

This authority was given to him, pointing back to God the Father.

Everything commanded next rests entirely on this one claim being true.

The mission that follows only makes sense because of this authority.

👑 Power here means total authority
🌍 It covers heaven and earth both
🎁 This authority was given by the Father
📖 Everything that follows rests on this claim

## 🔗 Go Ye Therefore, And Teach All Nations

Therefore ties this command directly to the authority Jesus just claimed.

All nations marks a major shift from earlier instructions that focused mainly on Israel.

Nations here means every people group, not simply foreign governments.

The good news is no longer meant for one nation alone.

This single sentence redraws the boundaries of who the message is for.

🔗 Therefore ties this to his authority
🌍 All nations means every people group
🚪 This opens the message beyond Israel alone
📖 The boundaries of the mission just changed

## 💧 Baptizing Them In The Name Of The Father, And Of The Son, And Of The Holy Ghost

Baptizing marks someone as a follower through a public act with water.

Name is singular here, even though three persons are named.

Father, Son, and Holy Ghost names the one God in three persons.

This verse is one of the clearest statements of the Trinity in the entire Bible.

Baptism marks entry into relationship with this same God, not just membership in a group.

💧 Baptizing marks someone as a follower
🔢 Name is singular for three persons
✝️ Father, Son, and Spirit are one God
📖 This verse states the Trinity clearly

## 📚 Teaching Them To Observe All Things Whatsoever I Have Commanded You

Observe means to actually practice and obey, not simply to know about something.

Teaching continues long after baptism is finished.

Following Jesus is meant to be a lifelong process, not a single moment.

Commanded points back to everything Jesus already taught throughout this Gospel.

Belief that never changes behavior was never the goal Jesus had in mind.

📚 Observe means practice, not just knowledge
⏳ Teaching continues long after baptism
🔁 Following Jesus is a lifelong process
📖 Belief was always meant to change behavior

## 🔁 Lo, I Am With You Alway, Even Unto The End Of The World

Alway is an older spelling of always, meaning every day without exception.

This promise bookends the entire Gospel of Matthew perfectly.

Matthew opened by naming Jesus Immanuel, meaning God with us.

Matthew now closes with Jesus promising to remain with his followers forever.

The presence promised at his birth is the same presence promised at the end of the story.

🔁 Alway means always, without exception
👶 Matthew opened with Immanuel, God with us
🏁 Matthew closes with the same promise
📖 His presence bookends this entire Gospel
`.trim();

export const MATTHEW_TWENTY_EIGHT_PERSONAL_SECTIONS = parseMatthewTwentyEightRawNotes(MATTHEW_TWENTY_EIGHT_RAW_NOTES);
