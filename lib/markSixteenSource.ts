export type MarkSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkSixteenRawNotes(rawText: string): MarkSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 16:${startVerse}` : `Mark 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Mark 16 sections, received " + sections.length);
  }

  return sections;
}

const MARK_SIXTEEN_RAW_NOTES = `# Mark 16:1-4
# 🌅 The Women Return At Dawn
---
## 🌙 When The Sabbath Was Past

The Sabbath ran from Friday evening to Saturday evening on the Jewish calendar.

Jesus died on Friday, so his body rested in the tomb through the Sabbath.

These women could not finish preparing his body until the Sabbath had fully ended.

Their grief had to wait on God's own command to rest first.

🌙 Sabbath ran Friday evening to Saturday evening

⏳ Burial preparations waited for the Sabbath to end

😢 Grief waited behind God's command to rest

📖 Even sorrow followed the Sabbath's own rule

## 👥 Mary Magdalene, And Mary The Mother Of James, And Salome

These are the same women named back in Mark fifteen as witnesses of the cross and the burial.

Mary Magdalene was the woman Jesus had freed from seven demons, named later in verse nine.

Mary the mother of James was likely the wife of Alphaeus, mother of one of the twelve apostles.

Salome was likely the mother of James and John, the sons of Zebedee.

👀 Same women who watched the cross and burial

🙅 Mary Magdalene was freed from seven demons

👪 Mary's son James was likely an apostle

📖 These women stayed faithful to the very end

## 🌿 Had Bought Sweet Spices, That They Might Come And Anoint Him

Anointing a body with spices was a normal part of Jewish burial customs.

Bodies were not embalmed in this culture, so spices helped cover the smell of decay.

This act also showed real honor and love for the person who died.

These women planned to finish the proper burial Friday's rushed timeline had left undone.

🌿 Spices were used to honor the dead

🚫 Bodies were never embalmed in this culture

❤️ This act showed real love, not just custom

📖 They finished what Friday's rush left undone

## 🪦 Came Unto The Sepulchre

A sepulchre is simply an old word for a tomb, a place used to bury the dead.

Wealthier families carved tombs into solid rock, often sealed with a heavy stone door.

Jesus was buried in a borrowed tomb that belonged to Joseph of Arimathaea.

A real, checkable tomb meant anyone could go confirm the burial for themselves.

🪦 Sepulchre is an old word for tomb

⛰️ Tombs were often carved into solid rock

🙏 Joseph of Arimathaea had lent his own tomb

📖 A real tomb could be checked by anyone

## ☀️ Very Early In The Morning The First Day Of The Week

The first day of the week is Sunday on our calendar.

This detail is part of why Christians later began worshiping on Sunday.

Mark also notes this happened at the rising of the sun, very early.

Light breaking over the horizon matched new life breaking into the world.

☀️ First day of the week means Sunday

⛪ Sunday became the new day of worship

🌅 Sunrise matched this moment of new life

📖 Resurrection morning reshaped the whole calendar

## 🪨 Who Shall Roll Us Away The Stone

Tombs in this culture were sealed with a large, heavy stone, not a simple door.

The stone was rolled along a carved groove and needed several strong men to move.

These three women had no way to move a stone that size themselves.

They were walking toward a tomb with no actual plan to get inside.

🪨 Tomb stones were large and very heavy

💪 Moving one required several strong men

🚶 These women had no plan to open it

📖 They walked forward despite the obstacle

## 👀 They Saw That The Stone Was Rolled Away

Mark adds that this stone was very great, meaning unusually large and heavy.

No normal explanation fits a stone this size being moved before dawn with no witnesses.

The miracle began before anyone told the women anything at all.

An empty tomb already announces something before a single word is spoken.

👀 The stone was already moved when they arrived

🪨 Very great means unusually large and heavy

🚫 No normal explanation fits what happened

📖 The miracle started before any announcement

# Mark 16:5-8
# 👼 The Angel's Message
---
## 👼 A Young Man Sitting On The Right Side, Clothed In A Long White Garment

Matthew and Luke both describe this same figure as an angel.

A long white garment is a common way scripture pictures heavenly messengers.

Sitting calmly inside the tomb shows this moment was under control.

Nothing here looks like chaos, robbery, or panic.

His calm presence announces that God planned this event.

👼 This young man was an angel

🤍 White clothing marks a heavenly messenger

🧘 Calm sitting shows a planned, not chaotic, event

📖 God was behind what happened here

## 😨 They Were Affrighted

Affrighted is an old word for being suddenly and deeply frightened.

Meeting an angel inside an empty tomb was not something these women expected.

Fear is the normal human reaction throughout scripture whenever someone meets a heavenly messenger.

Comfort in these stories always comes after the fear, never before it.

😨 Affrighted means suddenly and deeply afraid

👼 Meeting an angel was never expected

📜 Fear often meets angels throughout scripture

📖 Comfort comes only after the fear

## 🏷️ Ye Seek Jesus Of Nazareth, Which Was Crucified

The angel names Jesus exactly, leaving no room for mistaken identity.

Crucified confirms a real death actually happened just days earlier.

This matters because the resurrection news only makes sense if the death was real.

The angel states the hard fact before giving the good news.

🏷️ The angel names Jesus by name

☠️ Crucified confirms a real death happened

❓ No room is left for mistaken identity

📖 Truth comes before the good news

## 🎉 He Is Risen

Five plain words carry the center of the entire Christian faith.

Risen means Jesus came back to life with a real body, not just a living spirit.

Behold the place where they laid him invites the women to check the evidence themselves.

The angel does not ask for blind faith.

He points to proof they can see instead.

🎉 He is risen carries the whole gospel

💪 Risen means a real, bodily return to life

👀 The empty spot is there to check

📖 Faith here starts with evidence, not blindness

## 😔 Tell His Disciples And Peter

Peter had denied even knowing Jesus three times just a few days earlier.

Naming him separately here is a personal message of forgiveness, not just a general update.

Jesus is not finished with Peter despite his failure.

This small detail carries enormous grace inside one short instruction.

😔 Peter had denied Jesus three times

💔 Naming him alone signals personal forgiveness

🙌 Failure did not end Peter's calling

📖 Grace reaches the one who failed worst

## 📜 He Goeth Before You Into Galilee

Jesus had already told them this exact plan back in Mark fourteen, before he died.

Galilee was the region north of Jerusalem where most of his ministry and these disciples' homes were.

Going before you pictures Jesus leading the way, the same role he always held.

The promise he made earlier is coming true exactly as he said.

📜 Jesus already promised this back in Mark fourteen

🗺️ Galilee was home ground for most disciples

🚶 Going before means Jesus leads the way

📖 His earlier promise is proving true

## 🏃 Said Nothing To Any Man

This is the chapter's third time these women flee a scene in fear.

Their fear now is so strong that they tell absolutely no one what happened.

Matthew's Gospel says they later obeyed and told the disciples, once the shock passed.

Fear can delay obedience without canceling it completely.

🏃 Their third fearful reaction in this chapter

🤐 They told absolutely no one at first

📜 Matthew says they obeyed once the shock passed

📖 Fear can delay obedience, not cancel it

# Mark 16:9-11
# 👁️ Jesus Appears To Mary First
---
## 📜 Now When Jesus Was Risen

The oldest known manuscripts of Mark end at the previous verse, without this section.

Many later manuscripts include verses nine through twenty, and the early church used them.

The events described here also appear independently in Matthew, Luke, and John.

Either way, the resurrection stands confirmed by the other Gospels.

📜 Oldest manuscripts end at verse eight

✅ Many later manuscripts include this ending

🤝 Other Gospels confirm these same events

📖 The resurrection news stands confirmed either way

## ⚖️ He Appeared First To Mary Magdalene

A woman's testimony was not considered valid proof in a Jewish court at this time.

If this story were invented, choosing a woman as the first witness makes little sense.

This detail is actually strong evidence that the Gospel writers simply reported what happened.

Jesus chose to honor Mary first, regardless of what the culture around him valued.

⚖️ Women's testimony was not legally valid then

🤔 An invented story would not choose a woman

✅ This detail points toward real history

📖 Jesus honored her outside the culture's rules

## 👹 Out Of Whom He Had Cast Seven Devils

This detail about Mary Magdalene comes from Luke eight, where Jesus freed her from seven demons.

Seven here signals a complete, overwhelming form of possession, not a minor problem.

The woman Jesus appears to first was once in the deepest kind of bondage.

Grace reaching the most broken person first is never an accident.

👹 Seven devils means complete, severe possession

📜 Luke eight tells her full story

🙌 Jesus freed her from deep bondage

📖 Grace reached the most broken person first

## 😢 As They Mourned And Wept

The disciples are not sitting around hoping for a resurrection.

They are still in the middle of real grief for a friend they believe is gone.

This detail makes the unbelief in the next verse understandable, not foolish.

Grief and faith often need time to meet each other.

😢 The disciples were still grieving deeply

🤷 Grief made good news hard to hear

❌ Their unbelief next is not foolish, just human

📖 Grief and faith often take time together

## 🔁 They Believed Not

Mark repeats this same unbelief three separate times across this chapter.

The disciples were not an easy crowd ready to believe any miracle report.

Real proof was required before any of them accepted the resurrection as true.

This resistance actually makes their later testimony more convincing, not less.

🔁 This unbelief repeats three times here

🚫 The disciples were not easily convinced

🔍 Real proof was required before belief

📖 Skeptics make the strongest witnesses later

# Mark 16:12-13
# 🛣️ Two More Witnesses, Still Doubted
---
## 🚶 He Appeared In Another Form

Luke twenty four tells this same story in full detail.

It happened on the road to a village called Emmaus.

Another form means these two disciples did not recognize Jesus right away.

Luke explains their eyes were kept from recognizing him until later in the conversation.

The risen Jesus was not always instantly recognizable, even to close friends.

🚶 Luke twenty four tells this story fully

👀 Another form means he was not recognized

🛣️ This happened on the road to Emmaus

📖 Recognition came only when God allowed it

## 🔁 Neither Believed They Them

This is the third time in this chapter that eyewitness testimony gets rejected.

Two separate witnesses now agree that Jesus is alive, yet the group still refuses to believe.

This stubborn doubt sets up how dramatic the next appearance to the eleven will be.

The resurrection had to break through real resistance, not an eager crowd.

🔁 This is the third rejected report

👥 Two witnesses still were not enough

😤 Doubt here was stubborn, not casual

📖 Belief would take Jesus appearing himself

## 🗺️ Went Into The Country

Luke's account names this place specifically as Emmaus, a village near Jerusalem.

That walk gave these two disciples a few hours to talk things through together.

These two had already left the others, likely assuming the story was over.

Jesus met them exactly on the road they thought led away from the story.

🗺️ The village was called Emmaus

🚶 A walk of several miles

⏳ Hours of walking gave time to talk

📖 Jesus met them while they were leaving

# Mark 16:14-18
# 🌍 The Great Commission
---
## 🔢 He Appeared Unto The Eleven

Jesus had twelve apostles, but this group is now called the eleven.

Judas Iscariot had already betrayed Jesus and was dead by this point in the story.

The missing number is a quiet reminder of that loss and his absence.

Even with Judas gone, Jesus still comes to this gathered group.

🔢 Eleven means Judas is no longer counted

💔 Judas had already betrayed Jesus and died

👥 The group is smaller but still gathered

📖 Jesus still comes to the eleven

## 🍽️ As They Sat At Meat

Sitting at meat means sharing an actual meal together.

Luke and John both describe the risen Jesus eating real food in front of his followers.

A spirit or ghost does not need to eat.

This ordinary detail quietly proves Jesus rose with a real, physical body.

🍽️ At meat means sharing a real meal

👻 Ghosts do not need to eat

💪 This proves a real, physical body

📖 Ordinary details can prove extraordinary truth

## 😠 Upbraided Them With Their Unbelief And Hardness Of Heart

Upbraided means Jesus firmly scolded them, stronger than a gentle correction.

Hardness of heart describes a stubbornness that resists even clear evidence.

This matches the same unbelief already shown three separate times earlier in this chapter.

Jesus confronts the problem directly instead of letting it quietly continue.

😠 Upbraided means a firm scolding

🪨 Hardness of heart means stubborn resistance

🔁 This matches the pattern from earlier verses

📖 Jesus confronts doubt instead of ignoring it

## 🌍 Go Ye Into All The World

Until now, Jesus and his disciples had mostly stayed within the land of Israel.

This command expands their mission to every nation and every person on earth.

Every creature makes clear that no group of people is left out of this call.

This single sentence becomes the launch point for the entire book of Acts.

🌍 The mission now expands to the whole world

🚫 No nation or group is left out

🚀 This launches the story told in Acts

📖 Every creature means everyone, without exception

## 🙏 He That Believeth And Is Baptized Shall Be Saved

Belief comes first in this sentence, and baptism follows right after it.

Baptism here is the visible, public response to a faith someone already has.

The next phrase blames only unbelief for condemnation, not a missed baptism.

Faith is the root here, baptism is the fruit that grows from it.

🙏 Belief is named first in this verse

💧 Baptism follows faith, it does not replace it

❌ Unbelief, not missing baptism, brings condemnation

📖 Faith is the root, baptism is the fruit

## ⚖️ He That Believeth Not Shall Be Damned

Damned means facing final judgment and separation from God, not a minor warning.

This matches what Jesus taught elsewhere about belief shaping someone's eternal outcome.

The warning here sits right next to the promise of salvation in the same verse.

Both weight and grace appear together in this one short sentence.

⚖️ Damned means final judgment, not a small warning

📜 This matches Jesus's other teaching on belief

🔗 The warning sits right next to the promise

📖 Both weight and grace appear together here

## 📜 These Signs Shall Follow Them That Believe

These specific signs mostly appear in the book of Acts, confirming the apostles' early preaching.

Casting out devils and speaking in new tongues both happen in the chapters right after this one.

Signs here served to confirm a brand new message to people who had never heard it.

A sign's whole purpose is to point toward the message, not toward itself.

📜 Acts shows these exact signs happening

🗣️ New tongues means speaking real, unlearned languages

👉 Signs confirmed the message, not themselves

📖 Evidence served the gospel, not personal glory

## 🐍 They Shall Take Up Serpents

Acts twenty eight records Paul being bitten by a venomous snake and walking away unharmed.

This verse describes protection tied to the preaching mission.

It was never a command to test God on purpose.

History shows that deliberately testing this verse has ended badly many times.

God's protection accompanied the mission, never a stunt to prove faith.

🐍 Paul survived a venomous snake bite in Acts

🚫 This was never a command to test God

⚠️ Deliberate testing has ended badly throughout history

📖 Protection served the mission, not performance

## 🙌 They Shall Lay Hands On The Sick

Laying on hands was a common gesture of blessing and prayer throughout scripture.

Acts repeatedly shows the apostles healing the sick this same way as they preached.

This sign, like the others, confirmed a brand new message in its earliest days.

The hands did the touching, but the healing itself always came from God.

🙌 Laying on hands was a gesture of prayer

🏥 Acts shows this healing happening often

🙏 God did the healing, not the hands

📖 Signs confirmed the gospel's earliest spread

# Mark 16:19-20
# ☁️ Jesus Ascends, The Mission Begins
---
## ☁️ He Was Received Up Into Heaven

This moment is called the Ascension, when Jesus visibly returned to heaven.

Acts one explains this happened about forty days after the resurrection, in front of witnesses.

This was not just a symbolic idea, the disciples watched him physically go up.

His visible time walking on earth after the resurrection had now come to an end.

☁️ This moment is called the Ascension

📅 Acts one places it forty days later

👀 Witnesses watched this happen in person

📖 His visible time on earth was ending

## 👑 Sat On The Right Hand Of God

The right hand was the seat of highest honor next to a king in this culture.

This phrase states that Jesus now holds full authority alongside God the Father.

It does not describe a literal chair, it describes a position of power.

The crucified Jesus now reigns in the place of greatest honor.

👑 Right hand means the highest place of honor

🪑 This is not a literal chair

💪 It states Jesus holds full authority

📖 The crucified one now reigns in glory

## 🌍 They Went Forth, And Preached Every Where

This single sentence summarizes everything the book of Acts will describe in detail.

Every where means the gospel started moving beyond Israel immediately, just as verse fifteen commanded.

The same disciples who doubted three times in this chapter now carry the message forward boldly.

Doubt did not disqualify them from the mission in the end.

🌍 Every where means beyond Israel immediately

📜 Acts tells this whole story in detail

🔁 The same doubters now preach boldly

📖 Doubt did not disqualify their calling

## 🤝 The Lord Working With Them, And Confirming The Word With Signs Following

Working with them means God acted alongside the disciples as they preached.

Confirming the word means the signs backed up the truth of what they said.

Neither the preaching nor the signs stood alone, each one supported the other.

The mission that began with eleven doubting men ended up reaching the whole world.

🤝 God worked alongside their preaching

✅ Signs confirmed the truth of their words

🔗 Preaching and signs worked together

📖 Doubters became the start of a worldwide mission
`.trim();

export const MARK_SIXTEEN_PERSONAL_SECTIONS = parseMarkSixteenRawNotes(MARK_SIXTEEN_RAW_NOTES);
