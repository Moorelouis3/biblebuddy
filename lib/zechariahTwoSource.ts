export type ZechariahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahTwoRawNotes(rawText: string): ZechariahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 2:${startVerse}` : `Zechariah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Zechariah 2 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_TWO_RAW_NOTES = `# Zechariah 2:1-5
# 📏 A Man With A Measuring Line
---
## 👀 Lifted Up Mine Eyes Again, And Looked

Another new vision begins right here.

Zechariah already opened a vision this same way back in chapter one.

Lifting his eyes again means God is not finished speaking to him yet.

One vision has barely ended before the next one begins.

👀 Marks the start of a new vision
🔁 Chapter one opened the same way
⏳ God is not finished speaking
➡️ One vision leads straight into the next

## 📏 A Man With A Measuring Line In His Hand

A measuring line was a cord used to mark out boundaries.

Surveyors stretched it across a plot before any building began.

God already promised this exact image back in chapter one.

Here the promise becomes an action someone can actually see.

📏 A measuring line marks out boundaries
🏗️ Surveyors used it before building
🔁 Chapter one already promised this image
📖 The promise is now becoming visible

## 📐 What Is The Breadth Thereof, And What Is The Length Thereof

Breadth means width, the distance from side to side.

Length means how far the city stretches from end to end.

The angel measures the ruined city the way a builder measures a lot.

This measuring comes before Jerusalem can be rebuilt as promised.

📐 Breadth means side to side
📏 Length means end to end
🏗️ Measuring comes before building
📖 This measuring prepares for rebuilding

## 👼 Another Angel Went Out To Meet Him

Two separate angels appear together in this scene.

The angel that talked with me already appeared back in chapter one.

This new angel comes forward to meet him with fresh instructions.

More than one heavenly messenger is now involved in this vision.

👼 Two angels appear in this scene
🔁 One angel already appeared in chapter one
📨 The new angel brings fresh instructions
📖 More than one messenger is involved

## 🗣️ Run, Speak To This Young Man

This young man refers to Zechariah himself.

An angel is told to run and catch up with him quickly.

The urgency shows how important this next message really is.

This next message turns out to be worth running for.

🗣️ The young man is Zechariah
🏃 An angel is told to hurry
⏳ The message cannot wait
📖 Urgent news deserves urgent delivery

## 🏙️ Jerusalem Shall Be Inhabited As Towns Without Walls

This does not mean Jerusalem would be left defenseless.

Walled cities in this culture were usually small, cramped spaces.

Jerusalem would grow so large that normal walls could not contain it.

The multitude of people and animals would simply spill past any wall.

🏙️ Not a picture of being defenseless
🧱 Walled cities were small and cramped
📈 Jerusalem would outgrow any wall
➡️ Growth spills past the old boundary

## 🔥 A Wall Of Fire Round About

God promises to be Jerusalem's protection instead of a stone wall.

A wall of fire round about means God himself surrounds the city.

No enemy could break through a defense like that.

The one without walls gets the safest wall of all.

🔥 God himself becomes the wall
🛡️ Fire surrounds the whole city
🚫 No enemy can break through
📖 God is the safest wall of all

## ✨ The Glory In The Midst Of Her

Protection alone is not the whole promise here.

God also promises to be the glory inside the city itself.

Glory in scripture often means God's visible presence and honor.

Jerusalem would not just be guarded, it would be filled.

✨ More than protection is promised
👑 Glory means God's visible presence
🏙️ Jerusalem would be guarded and filled
📖 God promises presence, not just safety

# Zechariah 2:6-9
# 🏃 Flee From The Land Of The North
---
## 📢 Ho, Ho, Come Forth, And Flee From The Land Of The North

Ho, ho is an old way of shouting to grab attention fast.

The land of the north refers to Babylon.

Armies invading Judah had always come down through the north.

So Babylon gets called the north out of old habit, not exact geography.

📢 Ho ho means shout for attention
🗺️ The north means Babylon here
🛣️ Invasions always came from the north
📖 Old habit named Babylon the north

## 🌬️ I Have Spread You Abroad As The Four Winds Of The Heaven

The four winds means every direction at once.

It pictures north, south, east, and west all together.

God is admitting he is the one who scattered Israel this completely.

Total scattering now sets up a total gathering back home.

🌬️ Four winds means every direction
🧭 North south east and west
💨 God admits he scattered them completely
📖 Total scattering now meets total gathering

## 🏙️ Deliver Thyself, O Zion, That Dwellest With The Daughter Of Babylon

Zion here means the Jewish exiles still living in Babylon.

The daughter of Babylon is simply another name for the city itself.

Deliver thyself is a command to escape while there is still time.

Staying any longer in Babylon was no longer the safe choice.

🏙️ Zion means the exiles in Babylon
🏛️ Daughter of Babylon names the city
🏃 Deliver thyself means escape now
➡️ Staying longer was no longer safe

## 👁️ He That Toucheth You Toucheth The Apple Of His Eye

The apple of the eye is the pupil, the most sensitive part of the eye.

Even a light touch there causes someone to flinch instantly.

God compares Zion to that same sensitive spot in his own eye.

This verse also says God sent himself against the nations that hurt Zion.

Scholars read that exact line in different ways.

Either way, touching Zion means facing God directly.

👁️ Apple of the eye means the pupil
⚡ Even a light touch causes flinching
❤️ Zion is that sensitive to God
📖 Touching Zion means facing God himself

## ✋ I Will Shake Mine Hand Upon Them

Shaking a hand at someone here is a gesture of attack, not a wave.

It pictures God raising his hand to strike down an enemy.

This is the same God who just promised to protect Zion like his own eye.

Protection for Zion means judgment for the nations that hurt her.

✋ Shaking the hand means attacking
⚔️ God raises his hand to strike
🛡️ Protecting Zion means judging her enemies
📖 One promise brings both outcomes

## 💰 They Shall Be A Spoil To Their Servants

This does not mean Israel's own servants would do the plundering.

Their refers to the nations that had conquered and spoiled Israel.

Those same nations would end up being plundered by their own servants.

The oppressor becomes the one who gets oppressed.

💰 Not Israel's own servants here
🔄 Their means the conquering nations
⚖️ Those nations get plundered too
➡️ The oppressor becomes the oppressed

## 📣 Ye Shall Know That The LORD Of Hosts Hath Sent Me

This exact phrase already appeared once before in this chapter.

The speaker shifts between sounding like God and sounding like a messenger sent by God.

That kind of shift happens throughout Zechariah's visions.

Hearing it twice drives the point home that this message truly comes from God.

📣 This phrase repeats from earlier
🔁 The speaker shifts between messenger and God
📜 This shift repeats through Zechariah's visions
📖 Repetition confirms the message is from God

# Zechariah 2:10-13
# 🎉 The LORD Will Dwell In The Midst Of Thee
---
## 🎶 Sing And Rejoice, O Daughter Of Zion

Daughter of Zion is simply another name for Jerusalem and her people.

This command to celebrate comes right after promises of protection and judgment.

Singing here is not just an emotional outburst.

It is the proper response to a promise this certain.

🎶 Daughter of Zion means Jerusalem's people
🤝 This follows promises already made
🙌 Singing is the proper response
📖 Certainty deserves real celebration

## 👣 Lo, I Come, And I Will Dwell In The Midst Of Thee

Lo is an old word used to grab attention before an announcement.

God himself is the one making this promise, not a prophet speaking for him.

To dwell in the midst means to live right there among the people.

This is bigger than rescue, it is God moving in permanently.

👣 Lo signals an important announcement
🙋 God speaks this in his own voice
🏠 Dwell in the midst means living there
📖 This promise goes beyond rescue

## 🌍 Many Nations Shall Be Joined To The LORD In That Day

This promise reaches past Israel to people from other nations entirely.

Joined to the LORD means these outsiders would become his own people too.

That was a radical idea for this time in history.

God's family was always meant to grow beyond one bloodline.

🌍 This promise reaches other nations
🤝 Outsiders would become God's own people
💡 This idea was radical for its time
➡️ God's family was never meant to stay small

## 🗣️ Thou Shalt Know That The LORD Of Hosts Hath Sent Me Unto Thee

This same confirming phrase has now appeared three times in this chapter.

Each time, it answers the same quiet question, who is really speaking here.

The angel, the LORD, and the sent one all seem to describe a single speaker.

Zechariah is being shown more about God's nature than he may realize.

🗣️ This phrase now appears a third time
❓ It answers who is really speaking
🔗 Angel, LORD, and sent one overlap
📖 Zechariah glimpses more of God's nature

## 🏞️ The LORD Shall Inherit Judah His Portion In The Holy Land

Inherit usually describes receiving land passed down from a family member.

Here God is the one described as inheriting Judah, not the other way around.

This is one of the few places in the Old Testament actually called the holy land.

The land belongs to God before it ever belongs to any one person.

🏞️ Inherit normally means receiving family land
🔄 Here God inherits Judah instead
📜 This is a rare use of holy land
📖 The land belongs to God first

## 🏙️ Shall Choose Jerusalem Again

Choosing Jerusalem again does not mean God had thrown Jerusalem away for good.

It means God is renewing a choice he already made long before the exile.

The exile felt like rejection.

The relationship was never actually over.

Again here is a word of restoration, not a fresh decision.

🏙️ Not a permanent rejection reversed
🔄 God renews an old choice
💔 Exile felt like rejection
📖 Again means restoration, not a new decision

## 🤫 Be Silent, O All Flesh, Before The LORD

All flesh means every single person, not just Israel.

Being silent here means showing reverence, not staying quiet forever.

Loud celebration just happened a few verses earlier in this same chapter.

Now the mood shifts from celebration to reverence in an instant.

🤫 All flesh means every single person
🙏 Silence here means reverence
🎶 Celebration just happened a few lines earlier
📖 The mood shifts from joy to reverence

## 🌌 He Is Raised Up Out Of His Holy Habitation

His holy habitation means heaven, where God dwells.

Raised up pictures God standing up and getting ready to act.

This image answers the call for silence that just came before it.

When God himself gets up to move, everyone else should stop and watch.

🌌 Holy habitation means heaven itself
🧍 Raised up means standing to act
🤫 This answers the call for silence
➡️ When God moves, everyone should watch
`.trim();

export const ZECHARIAH_TWO_PERSONAL_SECTIONS = parseZechariahTwoRawNotes(ZECHARIAH_TWO_RAW_NOTES);
