export type JobTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwoRawNotes(rawText: string): JobTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 2:${startVerse}` : `Job 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 2 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWO_RAW_NOTES = `# Job 2:1-6
# ⚖️ Satan Returns To The Court
---
## 🔁 Again There Was A Day

This scene opens exactly like the one back in chapter one.

Some time has passed since Job lost everything he owned.

The heavenly court meets again, and Satan returns to it.

Repetition here is not lazy writing, it is a deliberate pattern.

🔁 The scene repeats chapter one's setup

⏳ Time has passed since the first test

🏛️ The heavenly court meets again

📖 This pattern sets up round two

## 👼 The Sons Of God Came To Present Themselves Before The LORD

This is the same heavenly council introduced in chapter one.

The angels do not report only once and disappear forever.

Their presence before God happens on a recurring basis.

Job's story now continues from that same unseen realm.

👼 The same council from chapter one

🔁 Angels report on a recurring basis

👁️ Job's story continues from the unseen realm

📖 Heaven still oversees this whole test

## ⚖️ Satan Came Also Among Them

This is Satan's second appearance in the same heavenly scene.

He returns to the same courtroom he stood in before.

His access here is still limited to what God allows.

Nothing has changed about who holds the real authority.

⚖️ Satan returns to the same courtroom

🔓 His access is still limited by God

👑 God still holds the real authority

📖 Nothing here happens outside God's control

## ❓ From Whence Comest Thou

God asks Satan the exact same question as before.

The repeated question mirrors the very first test almost word for word.

This is not God searching for new information.

The rhythm of the exchange shows this is an ongoing pattern.

❓ The same question as chapter one

🔁 The exchange mirrors the first test

🧠 God is not searching for information

📖 This is part of an ongoing pattern

## 🙌 Hast Thou Considered My Servant Job

God brings Job up again without any prompting from Satan.

Bringing Job up a second time shows continued confidence in him.

God is not defending Job nervously, he states it plainly.

This is round two of a test God already expects Job to pass.

🙌 God brings up Job again

💪 God shows continued confidence in him

🗣️ God states it plainly, not nervously

📖 Round two begins with confidence

## 🤝 Still He Holdeth Fast His Integrity

Holdeth fast means Job kept a firm, unshaken grip on his character.

Integrity here means his life stayed whole and consistent under pressure.

Job lost everything in chapter one and did not change who he was.

This phrase is God's own verdict on how the first test went.

🤝 Holdeth fast means gripped firmly

🧩 Integrity means staying whole under pressure

✅ Job passed the first test completely

📖 God gives His own verdict here

## 🎯 Although Thou Movedst Me Against Him, To Destroy Him Without Cause

Movedst me means Satan stirred God to allow the test.

This does not mean Satan overpowered God's will.

Without cause means Job's suffering was not deserved.

God openly admits this first test had no fault in Job.

🎯 Movedst me means stirred to act

🚫 Satan never overpowered God's will

⚖️ Without cause means undeserved suffering

📖 God admits Job's innocence directly

## 💱 Skin For Skin

This phrase was likely a common trading proverb of that time.

It described trading one thing away to keep something more valuable.

Satan uses it to claim self preservation always wins in the end.

He is calling Job's motives selfish at the deepest level.

💱 Skin for skin was a trading proverb

🔄 It means trading less for something valuable

🎯 Satan claims self preservation always wins

📖 He calls Job's motives selfish

## 🧬 All That A Man Hath Will He Give For His Life

Satan claims survival instinct beats every other loyalty a person has.

He argues Job would give up anything, even his faith, to stay alive.

This is Satan's theory about what really drives every human being.

The next verses will put this exact theory to the test.

🧬 Survival instinct beats every loyalty, Satan claims

😨 Job would trade faith to survive, he argues

🧠 This is Satan's theory of human nature

📖 The test will prove or disprove it

## 🦴 Touch His Bone And His Flesh

This phrase means Satan is now asking to strike Job's own body.

Bone and flesh together simply mean his physical health and body.

The first test hit Job's wealth, this one targets his health directly.

The stakes have grown far more personal and painful.

🦴 Bone and flesh means physical body

🎯 Satan now targets Job's health

📈 This test goes deeper than the first

📖 The stakes just became personal

## 🗣️ He Will Curse Thee To Thy Face

Satan repeats the exact same prediction he made in chapter one.

He is doubling down on a bet he has not yet won.

This time the prediction targets Job's own suffering body, not his loss.

Satan is certain physical pain will succeed where financial loss failed.

🔁 Satan repeats his earlier prediction

🎲 He doubles down on a losing bet

🩹 This time it targets physical pain

📖 Satan believes pain will succeed where loss failed

## 🚧 Behold, He Is In Thine Hand, But Save His Life

God sets a new boundary the moment He allows this test.

Satan may now afflict Job's body in painful ways.

Satan may not take Job's actual life this time either.

God stays fully in control even while allowing real suffering.

🚧 God sets a new boundary again

🩹 Satan may afflict, but not kill

🔒 Job's life itself stays protected

📖 God controls even how far suffering goes

# Job 2:7-8
# 🩹 Head To Toe Affliction
---
## 🚶 So Went Satan Forth From The Presence Of The LORD

Satan leaves the heavenly court to carry out the test.

He does not linger or argue further with God.

This shows Satan operating strictly within the limit just given.

Obedience to the boundary happens immediately, without delay.

🚶 Satan leaves immediately after the boundary is set

🔒 He stays strictly within God's limit

⏱️ There is no delay or argument

📖 Even Satan's obedience proves God's control

## 🩹 Smote Job With Sore Boils From The Sole Of His Foot Unto His Crown

Sore boils were painful, infected sores covering the skin.

This was likely a severe, disfiguring skin disease.

Sole of his foot unto his crown is an old idiom for head to toe.

No part of Job's body escaped this affliction.

🩹 Sore boils means painful infected sores

🦶 Sole of his foot means his feet

👑 Unto his crown means up to his head

📖 The affliction covered his entire body

## 🏺 A Potsherd To Scrape Himself Withal

A potsherd was a broken piece of pottery with a rough edge.

Job used it to scrape the open sores covering his skin.

This detail shows just how much relief he desperately needed.

It also shows he had no proper medical care available.

🏺 A potsherd was a broken pottery piece

🩹 He scraped his open sores with it

😖 The detail shows his desperate need for relief

📖 No real medical care was available to him

## 🪶 He Sat Down Among The Ashes

Sitting in ashes was a well known posture of deep mourning.

Job already tore his robe and shaved his head back in chapter one.

Now his own body has become a source of grief as well.

This image pictures a once great man reduced to the dust.

🪶 Ashes were a posture of deep mourning

🔁 Job already mourned this way once before

👑 A once great man now sits in dust

📖 His body has become its own grief

# Job 2:9-10
# 🗣️ Two Voices In The Ashes
---
## 💔 Dost Thou Still Retain Thine Integrity

Job's wife echoes the exact word God used about Job earlier.

Her tone here is bitter, not admiring like God's was.

She is asking why Job still clings to a faith that cost him everything.

Her question cuts at the very center of who Job is.

💔 She echoes God's own word, integrity

😔 Her tone is bitter, not admiring

❓ She questions why he still believes

📖 The question cuts at his identity

## ⚰️ Curse God, And Die

This is a shocking suggestion coming from Job's own wife.

Some readers think she means cursing God would bring a quick death as mercy.

Others think she means it as open, final rejection of God.

Either way, she is urging Job to abandon his faith completely.

⚰️ A shocking suggestion from his own wife

🕊️ Some read it as a mercy killing wish

🚫 Others read it as full rejection of God

📖 Either way, she urges him to give up

## 🙋 Thou Speakest As One Of The Foolish Women Speaketh

Job does not attack his wife personally with this reply.

Foolish here means morally wrong, not lacking intelligence.

He calls her suggestion foolish because it rejects God under pressure.

His firm response shows his faith has not cracked yet.

🙋 He responds firmly, not cruelly

🧠 Foolish here means morally wrong

🚫 Her suggestion rejected God under pressure

📖 His faith has not cracked yet

## ⚖️ Shall We Receive Good At The Hand Of God, And Shall We Not Receive Evil

Job asks whether faith should only exist during easy seasons of life.

He argues that accepting blessing means also accepting hardship from the same God.

This is not resignation, it is a deliberate theological stand.

Job refuses to treat God as only a source of good things.

⚖️ Job weighs both good and hard seasons

🤝 Blessing and hardship come from the same God

💪 This stand is deliberate, not resignation

📖 God is not only a source of good

## 🤐 In All This Did Not Job Sin With His Lips

The narrator gives a precise, careful verdict on Job's words.

With his lips points specifically to what Job said out loud.

This wording leaves open a question about what he felt inside.

The rest of the book will explore that inner struggle honestly.

🤐 A precise verdict on Job's spoken words

👄 With his lips points to his speech only

❓ It leaves his inner feelings an open question

📖 Later chapters explore that inner struggle honestly

# Job 2:11-13
# 🤝 Three Friends Arrive
---
## 👥 Job's Three Friends

These three men will dominate most of the chapters ahead.

Each one traveled from his own home once he heard the news.

Real friendship here included showing up in person, not just words.

Their arrival opens the book's long middle section of speeches.

👥 Three friends who dominate the coming chapters

🚶 Each traveled from his own home

🤝 Friendship meant showing up in person

📖 Their arrival opens the book's long speeches

## 🗺️ Eliphaz The Temanite

Teman was a region in Edom known for producing wise men.

Eliphaz likely speaks first among the friends because of his age or standing.

He becomes the most frequent speaker across the coming chapters.

His homeland hints that his coming arguments will lean on traditional wisdom.

🗺️ Teman was a region in Edom

🧓 He likely speaks first due to standing

🗣️ He becomes the most frequent speaker

📖 His wisdom leans on Edom's tradition

## 🧬 Bildad The Shuhite

Shuah was possibly connected to a son born to Abraham through Keturah.

That link would place Bildad's ancestry near Israel's own extended family.

He tends to argue using older sayings and inherited tradition.

His name and homeland tie him loosely into Abraham's wider story.

🧬 Shuah may link back to Abraham's family

🗺️ His homeland sits near Israel's extended kin

📜 He argues from older sayings and tradition

📖 His roots tie him to Abraham's story

## 🏜️ Zophar The Naamathite

Naamah's exact location is not certain today.

It was likely somewhere in the same general region as the others.

Zophar tends to be the harshest and most blunt of the three friends.

He speaks least often but often says the most severe things.

🏜️ Naamah's location is uncertain but likely nearby

🗣️ Zophar is the harshest speaker of the three

📉 He speaks least but says the harshest things

📖 His sharp tone is set up here

## 🤝 They Had Made An Appointment Together

The friends coordinated their visit instead of showing up separately.

Traveling together took real planning across separate homes and long distances.

This was not a casual visit, it was intentional support.

Grief support in this culture often meant organized presence, not just sympathy.

🤝 They coordinated their visit on purpose

🗺️ Their homes were far apart from each other

📅 This required real planning and travel

📖 Organized presence mattered more than sympathy

## 😢 Knew Him Not

Job's disease had changed his appearance so much his friends did not recognize him.

This single detail shows just how severe his suffering had become.

His own closest friends needed a moment before they realized who he was.

Physical devastation had reshaped Job almost beyond recognition.

😢 His disease changed his appearance completely

🔍 Friends needed a moment to recognize him

📉 This shows how severe his suffering was

📖 Job was nearly unrecognizable to his own friends

## 😭 They Rent Every One His Mantle, And Sprinkled Dust Upon Their Heads Toward Heaven

These were the same mourning customs already introduced back in chapter one.

Rending a mantle meant tearing an outer robe as a visible sign of grief.

Sprinkling dust upon the head was another public expression of deep sorrow.

All three friends performed these customs together, sharing Job's grief openly.

😭 The same mourning customs from chapter one

👕 Rending a mantle meant tearing a robe

🌫️ Dust on the head showed deep sorrow

📖 All three shared his grief openly

## 🧮 Sat Down With Him Upon The Ground Seven Days And Seven Nights

Seven days was a traditional, formal period of mourning in this culture.

Sitting on the ground was a posture of humility and shared grief.

The friends gave up over a week of their own lives to be present.

Their physical presence mattered more at this point than any words.

🧮 Seven days was a formal mourning period

🪨 Sitting on the ground showed humility

⏳ They gave up over a week of time

📖 Presence mattered more than words here

## 🤐 None Spake A Word Unto Him

Silent presence was the wisest response the friends offered so far.

Sitting quietly with someone in pain can comfort more than words.

This silence will not last, their speeches begin in the next chapter.

Right now, their instinct to simply stay near Job was exactly right.

🤐 Silence was their wisest response yet

🫂 Quiet presence often comforts more than words

⏭️ Their speeches begin in the next chapter

📖 Their instinct to stay near was right

## 💔 They Saw That His Grief Was Very Great

The friends correctly recognized the depth of Job's suffering immediately.

Their assessment here is accurate and full of genuine compassion.

This moment of clear empathy stands in contrast to what comes next.

The chapters ahead will test whether their words match this good start.

💔 They correctly recognized his deep grief

❤️ Their assessment was accurate and compassionate

⚠️ This contrasts with what happens next

📖 Their words will soon be tested
`.trim();

export const JOB_TWO_PERSONAL_SECTIONS = parseJobTwoRawNotes(JOB_TWO_RAW_NOTES);
