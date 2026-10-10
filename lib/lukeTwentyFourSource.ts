export type LukeTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwentyFourRawNotes(rawText: string): LukeTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 24:${startVerse}` : `Luke 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Luke 24 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWENTY_FOUR_RAW_NOTES = `# Luke 24:1-3
# 🌅 Very Early At The Tomb
---
## 🌅 Very Early In The Morning

Very early in the morning means before the sun had even fully risen.

The sabbath had ended at sundown the evening before.

This was the earliest moment the women were allowed to travel.

Grief and love moved them before daylight did.

🌅 Very early means before full sunrise

🕯️ The sabbath had ended the evening before

⏳ This was their earliest possible moment

➡️ Grief moved them before daylight did

## 🌿 Bringing The Spices Which They Had Prepared

"Spices" here were fragrant herbs and oils used to anoint a dead body.

This was not the same as Egyptian embalming, which preserved a body for a long time.

These spices simply honored the dead and softened the smell of decay.

Luke already mentioned these same spices being bought right after the burial.

🌿 Spices were fragrant herbs and oils

⚱️ Not the same as Egyptian embalming

🕊️ They honored the dead with care

📖 The women had prepared this earlier

## 🪨 They Found The Stone Rolled Away

Tombs like this one were sealed with a large, heavy stone.

Moving a stone that size usually took several strong men.

The women expected to find that stone still blocking the entrance.

Instead they found the entrance already standing open.

🪨 The stone was large and heavy

💪 Moving it normally took several men

🚪 The women expected it closed

➡️ They found it already open

## ⚱️ Found Not The Body Of The Lord Jesus

The women came prepared to care for a body, not to witness a miracle.

Their whole plan for that morning assumed Jesus was still dead.

An empty tomb was not something they were hoping to find.

This is the very first clue in the chapter that something has changed everything.

⚱️ They expected a body, not a miracle

📋 Their whole plan assumed he was dead

❓ An empty tomb confused them at first

📖 This clue opens the whole chapter

# Luke 24:4-8
# 👼 Two Men In Shining Garments
---
## 👼 Two Men Stood By Them In Shining Garments

These "two men" are angels, described elsewhere in scripture the same radiant way.

"Shining garments" marks them as heavenly messengers, not ordinary visitors.

Angels appear at the most important turning points in the whole story of Jesus.

Their presence here signals that this moment matters as much as the birth did.

👼 Two men here means two angels

✨ Shining garments marks them as heavenly

🌟 Angels mark major turning points

📖 This moment matters as much as the birth

## ❓ Why Seek Ye The Living Among The Dead

This question corrects a mistake the women do not even realize they are making.

They are searching a tomb, a place built for the dead, for someone who is alive.

Once the angel says it plainly, the mistake sounds almost obvious.

The women simply had no reason yet to expect anything else.

❓ The angel points out a hidden mistake

⚰️ A tomb is a place for the dead

🏃 Jesus is alive, not dead

➡️ Grief had kept the obvious hidden

## 🌅 He Is Not Here, But Is Risen

This is the flat center of the entire chapter, stated as plainly as possible.

No long explanation comes first, just the fact itself.

Everything else in this chapter unpacks what this one line means.

Jesus is alive again, exactly as he said he would be.

📍 Not here means the tomb is empty

🌅 Risen means alive again

🎯 This is the chapter's central fact

📖 Everything after this explains that fact

## 🗣️ Remember How He Spake Unto You When He Was Yet In Galilee

The angel does not share new information here.

He simply reminds the women of something Jesus already told them.

Jesus had already predicted his own death and resurrection earlier in Luke.

He said it himself, still teaching in Galilee.

They had heard this before, they simply had not believed it yet.

🗣️ Jesus already predicted this himself

🗺️ Galilee was where he first said it

🔁 The angel is only reminding them

📖 They had heard it before believing it

## 🔢 The Third Day Rise Again

Jewish counting of days treated any part of a day as a full day.

Jesus died on a Friday afternoon and rose on a Sunday morning.

By that counting, Friday, Saturday, and Sunday together make three days.

The timing matched exactly what Jesus had already promised.

🔢 Any part of a day counts fully

📅 Friday, Saturday, and Sunday make three

⏰ The timing matched his own promise

📖 Prophecy and timing lined up exactly

# Luke 24:9-12
# 🏃 Report And Disbelief
---
## 🔢 Told All These Things Unto The Eleven

"The eleven" means the twelve apostles minus Judas, who had already died by this point.

The title still gets used even though the number briefly does not match.

These eleven men are the core group Jesus is about to appear to himself.

The women reach them first with news none of the men expected.

🔢 Eleven means the twelve minus Judas

💀 Judas had already died by now

👥 These eleven are the core group

➡️ Women bring the news first, not the men

## 😈 It Was Mary Magdalene

Mary Magdalene had been freed from seven demons earlier in Luke's gospel.

She became one of the most faithful women following Jesus after that.

She stayed near the cross when many others had already fled.

Now she is also one of the first to carry news of the resurrection.

😈 She had been freed from seven demons

❤️ She became deeply faithful afterward

⚔️ She stayed near the cross

📖 She carries the resurrection news first

## 👑 And Joanna, And Mary The Mother Of James

Joanna was married to Chuza, a steward who worked for Herod's own household.

Her presence here shows how widely Jesus's followers came from.

Mary the mother of James was another woman who had followed Jesus from Galilee.

Luke names real, specific people instead of leaving the witnesses vague.

👑 Joanna's husband worked for Herod

🌍 Followers came from many different places

👩 Mary was another Galilean follower

📖 Luke names real witnesses, not vague ones

## 🗣️ Their Words Seemed To Them As Idle Tales

"Idle tales" means talk that sounds like nonsense, not worth taking seriously.

In that culture, a woman's testimony often carried less weight in a formal setting.

That bias partly explains why the apostles dismissed the report so quickly.

Even hearing the truth directly, the apostles still needed more convincing.

🗣️ Idle tales means nonsense talk

⚖️ Women's testimony often carried less weight

🙅 The apostles dismissed it at first

➡️ Even truth needed more convincing here

## 🏃 Stooping Down, He Beheld The Linen Clothes

Peter still runs to check for himself despite his own doubt.

"Stooping down" suggests the entrance was low, so he had to bend to look inside.

The linen burial clothes sat empty, still in their folded shape.

A grave robber would have taken the valuable linen, not left it behind.

🏃 Peter checks for himself despite doubt

🚪 Stooping shows how low the entrance was

🧺 The linen sat empty, left behind

📖 Grave robbers would have taken the cloth

# Luke 24:13-16
# 🚶 The Road To Emmaus
---
## 📏 Which Was From Jerusalem About Threescore Furlongs

A "furlong" was a Roman measure of distance, close to an eighth of a mile.

"Threescore" is an old way of saying sixty.

Sixty furlongs adds up to about seven miles from Jerusalem.

That was a long walk for two men carrying heavy grief and confusion.

📏 A furlong was about one eighth mile

🔢 Threescore means sixty

🚶 Sixty furlongs is about seven miles

➡️ A long walk made heavier by grief

## 🗣️ They Communed Together And Reasoned

"Communed" means they talked deeply, not just making small talk.

They were trying to piece together everything that had just happened.

Confusing, frightening events often get processed out loud with someone else.

Their minds were still stuck on a story that did not yet make sense.

🗣️ Communed means deep, honest talk

🧩 They were piecing events together

😕 Nothing yet made full sense

➡️ Grief gets processed out loud

## 🚶 Jesus Himself Drew Near, And Went With Them

The risen Jesus does not wait for these two men to come find him.

He walks up and joins their journey without announcing who he is.

This is the same quiet, patient presence seen throughout Luke's gospel.

He meets people in the middle of an ordinary walk, not only in dramatic moments.

🚶 Jesus joins their journey himself

🤐 He does not announce who he is

❤️ This matches his pattern throughout Luke

📖 He meets people in ordinary moments

## 🙈 Their Eyes Were Holden That They Should Not Know Him

"Holden" is an old word meaning held back or prevented.

Something kept these two men from recognizing Jesus right away.

The text does not explain exactly what caused this, only that it happened.

Many readers connect it to what comes later, when recognition finally breaks through.

🙈 Holden means held back or prevented

❓ The exact cause is not explained

⏳ Recognition is delayed, not missing

➡️ The delay sets up what happens later

# Luke 24:17-24
# 😔 Cleopas Tells The Stranger
---
## 🧑 Art Thou Only A Stranger In Jerusalem

Cleopas is one of the two travelers, named here for the first time.

His question assumes everyone in Jerusalem already knows what just happened.

He is genuinely surprised that this stranger seems to know nothing about it.

The irony is that the stranger knows far more than either of them.

🧑 Cleopas is named as one of the two

🏙️ He assumes all Jerusalem already knows

😲 He is surprised Jesus seems unaware

📖 Jesus actually knows the most of all

## 🧑‍🏫 A Prophet Mighty In Deed And Word

This is how Cleopas describes Jesus, using the highest title he has in mind.

"Mighty in deed" points to the miracles Jesus performed throughout his ministry.

"Mighty in word" points to his teaching and authority when he spoke.

Even this high praise still falls short of who Jesus actually is.

🧑‍🏫 Prophet was the highest title Cleopas had

⚡ Mighty in deed means his miracles

🗣️ Mighty in word means his teaching

➡️ Even this title falls short of the truth

## 👑 We Trusted That It Had Been He Which Should Have Redeemed Israel

Many Jews expected the Messiah to defeat Israel's enemies and restore the nation.

"We trusted" is past tense, showing that hope now feels dead to Cleopas.

The crucifixion seemed to prove that hope wrong, from where he was standing.

He has no idea yet that the real redemption is far bigger than a political one.

👑 Many expected a political deliverer

⏳ We trusted is spoken in the past tense

💔 The cross seemed to end that hope

📖 The real redemption was far bigger

## 📅 Today Is The Third Day Since These Things Were Done

Cleopas is unknowingly standing exactly inside the fulfillment of a prophecy.

He names the very day Jesus had already promised he would rise.

He still has not connected the timing to anything hopeful yet.

The proof he needs is walking right beside him.

📅 He names the exact prophesied day

🔁 Jesus had already promised this timing

😕 He has not connected the dots yet

➡️ The proof is walking beside him

## 👩 Certain Women Also Of Our Company Made Us Astonished

Cleopas now repeats the women's report from earlier in the chapter.

"Astonished" shows the report shook the group, even without full belief yet.

He treats it as a strange rumor, not a settled fact.

The full picture keeps arriving to him in pieces, not all at once.

👩 He repeats the women's report

😲 Astonished shows real shock, not belief

❓ He still treats it as a rumor

➡️ The full picture arrives in pieces

## ❓ Him They Saw Not

This line closes Cleopas's whole account on a note of confusion.

Men went to check the tomb and confirmed it was empty, but saw no Jesus.

The deep irony is that Jesus himself is the one hearing this sentence.

The missing person in the story is standing right there listening.

❓ The account ends in confusion

⚰️ The tomb was confirmed empty

😮 Jesus himself hears this line

📖 The missing person is right there

# Luke 24:25-27
# 📖 Christ In All The Scriptures
---
## 🧠 O Fools, And Slow Of Heart To Believe

"Fools" here is not an insult about intelligence.

It describes people who are missing something that was already plainly taught to them.

"Slow of heart" means slow to trust, not slow to think.

Jesus is correcting them firmly, but he is not walking away from them.

🧠 Fools here is not about intelligence

📚 They missed what was already taught

❤️ Slow of heart means slow to trust

➡️ Correction here comes with patience

## ⚖️ Ought Not Christ To Have Suffered These Things, And To Enter Into His Glory

Jesus states the pattern plainly, suffering always came before glory.

This was never a plan that failed, no matter how it looked on Friday.

The disciples had only been expecting the glory part of the story.

Suffering and glory were always one plan, not two separate outcomes.

⚖️ Suffering always came before glory

🎯 The plan never actually failed

😕 They expected only the glory part

📖 Suffering and glory were one plan

## 📜 Beginning At Moses And All The Prophets

"Moses" here refers to the first five books of the Old Testament.

"The prophets" covers the rest of the Hebrew scriptures available at that time.

Jesus is not pointing to one verse.

He is tracing a theme through the whole Bible.

📜 Moses means the first five Bible books

📖 The prophets means the rest of scripture

🧵 Jesus traces one theme through all of it

➡️ The whole story was pointing at him

## 🧑 The Things Concerning Himself

Jesus becomes the subject of his own Bible study on this walk.

He is not teaching a lesson about someone else's story.

Every promise, picture, and prophecy in that long walk is about him specifically.

That walk alone would make for one of the richest Bible studies ever given.

🧑 Jesus is the subject of his own lesson

📖 Every promise points to him

🎁 Every picture and prophecy fits him

➡️ This walk was an unmatched Bible study

# Luke 24:28-32
# 🍞 Known In The Breaking Of Bread
---
## 🚶 He Made As Though He Would Have Gone Further

Jesus does not force his company on these two men.

He acts as if he will keep walking straight past their stop.

This gives them a real choice, not a forced encounter.

God often works this way, inviting attention instead of demanding it.

🚶 Jesus acts like he will keep walking

🙋 This gives them a real choice

🤝 Nothing here is forced on them

➡️ God often invites instead of demanding

## 🙏 Constrained Him, Saying, Abide With Us

"Constrained" means they urged him strongly, not just politely.

Offering a traveler a place to stay overnight was expected hospitality in that culture.

Refusing hospitality like this would have been considered rude.

Their insistence becomes the very thing that leads to recognizing him.

🙏 Constrained means urging strongly

🏠 Hospitality to travelers was expected

🚪 Turning him away would be rude

📖 Their hospitality leads to recognition

## 🍞 He Took Bread, And Blessed It, And Brake

These four actions match exactly what Jesus did at the last supper.

Taking, blessing, and breaking bread was also his normal pattern at any shared meal.

The men at this table have likely seen him do this motion before.

That familiar motion becomes the key that finally unlocks their eyes.

🍞 These actions match the last supper

🔁 This was also his normal table pattern

👀 They had likely seen this motion before

📖 A familiar motion unlocks recognition

## 👁️ Their Eyes Were Opened, And They Knew Him

Whatever had been holding back their recognition now lifts completely.

They do not recognize him by his face or his voice.

They recognize him by something he does with his hands.

God often reveals himself through familiar, ordinary actions, not dramatic signs.

👁️ Their recognition finally lifts

🙈 Not his face, not his voice

🙌 Recognized through a familiar action

➡️ God often reveals himself ordinarily

## ✨ He Vanished Out Of Their Sight

The resurrected body of Jesus can clearly do things an ordinary body cannot.

This is not the behavior of a ghost, since he later eats real food in front of witnesses.

His resurrected body is real, but it is no longer limited the same way.

This detail quietly answers questions the disciples have not even asked out loud yet.

✨ His resurrected body has new abilities

👻 This is not a ghost or a vision

🍞 He later eats in front of witnesses

📖 His body is real but no longer limited

## 🔥 Did Not Our Heart Burn Within Us

This idiom describes a strong feeling stirring inside, like a fire being lit.

They felt something true happening even before they understood what it was.

Looking back, they finally connect that feeling to who was actually speaking.

Sometimes the heart notices truth before the mind can explain it.

🔥 Heart burning means a strong inner feeling

❓ They felt it before they understood it

🔁 Looking back, it finally makes sense

➡️ The heart can notice truth early

# Luke 24:33-35
# 🏃 Back To Jerusalem
---
## ⏰ Rose Up The Same Hour, And Returned To Jerusalem

These two men do not wait until morning to share this news.

They walk the same seven miles back the very same night.

News this important could not sit until a more convenient hour.

Urgency, not comfort, drives every decision in the rest of this chapter.

⏰ They leave the same hour, at night

🚶 Another seven miles, back the same night

📢 The news could not wait

➡️ Urgency drives the rest of the chapter

## 👥 Found The Eleven Gathered Together

The apostles are staying together in one place, not scattered alone.

After Jesus was arrested, staying together likely felt safer than being isolated.

Grief and fear tend to pull people toward each other, not apart.

This gathered group is exactly where the two travelers need to deliver their news.

👥 The apostles stayed together, not scattered

🛡️ Togetherness likely felt safer after the arrest

❤️ Grief often pulls people together

➡️ This is where the news needed to land

## 🧑 Hath Appeared To Simon

"Simon" is another name for Peter, used often throughout Luke's gospel.

This appearance to Peter alone is mentioned here but never described in detail.

Paul later confirms this same appearance happened in his letter to the Corinthians.

Peter had denied Jesus three times, yet Jesus still sought him out personally.

🧑 Simon is Peter's other name

❓ This appearance is mentioned but not described

📜 Paul later confirms it happened

📖 Jesus sought out Peter despite his denial

## 📝 Known Of Them In Breaking Of Bread

The two travelers summarize their whole experience in one short phrase.

Everything that happened on that long road comes down to one familiar act.

The way they finally knew him becomes the headline of their whole report.

A small, ordinary gesture carried the weight of the entire story.

📝 Their report gets summarized in one phrase

🍞 One familiar act explains everything

📰 This becomes the headline of their story

➡️ A small gesture carried the whole weight

# Luke 24:36-43
# ✋ Proof He Is Not A Spirit
---
## 🕊️ Peace Be Unto You

This greeting was the normal Hebrew blessing of "shalom," offered at any meeting.

Coming from Jesus after the events of that week, it carries far more weight than a simple hello.

The disciples had scattered in fear only days earlier.

His first word to them now is peace, not blame.

🕊️ Peace be unto you means shalom

❤️ It carries extra weight after this week

😨 The disciples had scattered in fear

➡️ His first word is peace, not blame

## 👻 Supposed That They Had Seen A Spirit

Belief in spirits appearing to the living was common in that culture.

Given everything that had just happened, this reaction makes complete sense.

Jesus does not mock their fear or dismiss it as foolish.

He moves immediately to answer the actual confusion they are feeling.

👻 Belief in spirits was common then

😨 Their reaction makes complete sense

🤝 Jesus does not mock their fear

➡️ He answers their real confusion directly

## ✋ Handle Me, And See

Jesus invites physical touch as direct proof of his resurrection.

This is not a vision or a feeling, it is an actual body that can be touched.

He offers evidence instead of simply demanding that they believe him.

Faith here is built on something they can verify for themselves.

✋ He invites them to actually touch him

🙌 This is a real body, not a vision

🔍 He offers evidence, not just a demand

📖 Faith here rests on real proof

## 👻 A Spirit Hath Not Flesh And Bones

Jesus states the exact difference between a ghost and his resurrected body.

A spirit, by definition, has no physical body to touch at all.

This single sentence rules out every theory that he was only seen in a vision.

The resurrection was always meant to be physical, not merely spiritual.

👻 A spirit has no body to touch

🙌 Jesus clearly has flesh and bones

🚫 This rules out a vision theory

📖 The resurrection was always physical

## 😂 They Yet Believed Not For Joy

This is not doubt in the usual sense of refusing to believe.

The news feels almost too good to be true in that moment.

Overwhelming joy can make something feel unreal in the moment.

Jesus responds with patience instead of frustration at their hesitation.

😂 This is joy, not stubborn doubt

🎉 The news felt too good to be true

😮 Joy itself can feel unreal

➡️ Jesus responds with patience, not anger

## 🐟 A Piece Of A Broiled Fish, And Of An Honeycomb

Fish and honey were common, easy to find foods in that region.

Eating real food in front of witnesses was further, undeniable proof of a real body.

A ghost has no need and no ability to eat anything at all.

This simple meal quietly settles any remaining doubt in the room.

🐟 Fish and honey were common local foods

🍽️ Eating proved a real physical body

👻 A ghost cannot eat anything

📖 A simple meal settled every doubt

# Luke 24:44-49
# 📜 Fulfilling Every Promise
---
## 📜 The Law Of Moses, And In The Prophets, And In The Psalms

"The Law" means the first five books of the Bible.

"The Prophets" means the prophetic writings that came after.

"The Psalms" stood in for the rest of the Old Testament's wisdom and poetry.

Together these three names cover the whole Hebrew Bible of that time.

📜 Three names cover the whole Hebrew Bible

📖 Law, Prophets, and Psalms name every section

🎯 Every part points toward Jesus

➡️ This is the widest claim he could make

## 🧠 Opened He Their Understanding

This is not Jesus simply explaining things more clearly than before.

Luke describes an actual, supernatural act of opening their minds.

Information alone had not been enough to make them understand.

Real understanding here comes as a gift, not only as an effort.

🧠 This describes a supernatural act

📚 More facts alone were not enough

🎁 Understanding arrives as a gift

➡️ God opens minds, not just information

## 📏 It Behoved Christ To Suffer, And To Rise From The Dead The Third Day

"Behoved" is an old word meaning it was necessary or fitting.

Jesus states plainly that his suffering was never an accident or a defeat.

The timing and the suffering were both part of one single, necessary plan.

Nothing in that terrible week happened outside of what was always required.

📏 Behoved means necessary or fitting

🚫 His suffering was never an accident

🗓️ The timing was part of the plan

📖 Nothing happened outside the plan

## 💳 Repentance And Remission Of Sins Should Be Preached In His Name Among All Nations

"Remission" means forgiveness, the full cancelling of a debt.

Until now, the message had mostly reached Israel alone.

Jesus now sends that same message outward to every nation on earth.

This moment marks the real beginning of a global mission.

💳 Remission means a debt fully cancelled

🇮🇱 The message had mostly reached Israel

🌍 Now it reaches every nation

📖 A global mission begins right here

## 📋 Ye Are Witnesses Of These Things

Jesus gives the disciples a specific job, not just a feeling to carry.

A witness is someone who testifies to what they personally saw and heard.

Their testimony becomes the foundation the rest of the church will stand on.

The very next book of the Bible, Acts, follows exactly this assignment.

📋 Jesus gives them a specific job

👀 A witness testifies to what they saw

🏛️ Their testimony becomes the foundation

➡️ The book of Acts follows this assignment

## 🧥 Endued With Power From On High

"Endued" means clothed with or equipped with something.

"Power from on high" points ahead to the Holy Spirit, given at Pentecost.

The disciples are told to wait in Jerusalem instead of starting the mission alone.

God's own power, not human effort, was always meant to carry this mission forward.

🧥 Endued means clothed or equipped

🔥 Power from on high points to the Spirit

⏳ They are told to wait first

📖 God's power, not human effort, carries it

# Luke 24:50-53
# ☁️ The Ascension At Bethany
---
## 🗺️ He Led Them Out As Far As To Bethany

Bethany sat near the Mount of Olives, just outside Jerusalem.

Jesus had wept over the city from this same area earlier in Luke's gospel.

His public ministry both began and ends its final week close to this spot.

The location quietly ties the whole gospel story together.

🗺️ Bethany sat near the Mount of Olives

😢 Jesus had wept over Jerusalem nearby

🔁 This location ties the story together

➡️ The end echoes an earlier moment

## 🙌 He Lifted Up His Hands, And Blessed Them

Lifting the hands this way matched the posture priests used to bless the people.

Jesus acts here in a clearly priestly role, one final time in front of them.

A blessing like this sent people forward instead of just saying farewell.

This was not a sad goodbye, it was a commissioning.

🙌 This posture matched a priestly blessing

🧑‍⚖️ Jesus acts in a priestly role here

➡️ A blessing sends people forward

📖 This moment commissions, it does not just end

## ☁️ He Was Parted From Them, And Carried Up Into Heaven

This is the ascension, Jesus physically leaving earth in full view of witnesses.

His body does not simply disappear the way it did at Emmaus.

It visibly rises, confirming he was not a vision or a spirit the whole time.

The resurrection and the ascension together prove his body was always real.

☁️ This is Jesus physically leaving earth

👀 Witnesses see it happen in full view

🙌 His body visibly rises upward

📖 This confirms his body was always real

## 🙏 They Worshipped Him

The disciples respond to Jesus leaving by worshipping him, not by mourning him.

Worship like this was reserved only for God in that culture.

Giving Jesus this response confirms exactly who they now understood him to be.

Watching him leave did not shake their faith, it settled it.

🙏 They respond with worship, not mourning

✨ Worship was reserved only for God

📖 This confirms who they knew him to be

➡️ His leaving settled their faith

## 🏛️ Continually In The Temple, Praising And Blessing God

The disciples do not scatter in confusion the way they did after the crucifixion.

They return to the temple and stay there, worshipping openly.

Luke's gospel began in that same temple, with Zacharias serving as priest.

The whole story closes exactly where it first began, with ordinary people praising God.

🏛️ They gather in the temple, not scattered

🙌 Open worship replaces earlier fear

🔁 Luke's gospel also began in the temple

📖 The story ends where it first began
`.trim();

export const LUKE_TWENTY_FOUR_PERSONAL_SECTIONS = parseLukeTwentyFourRawNotes(LUKE_TWENTY_FOUR_RAW_NOTES);
