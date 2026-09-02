export type JobTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentySixRawNotes(rawText: string): JobTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 26:${startVerse}` : `Job 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 26 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_SIX_RAW_NOTES = `# Job 26:1-4
# 🙄 Job Turns Bildad's Words Back On Him
---
## 🗣️ But Job Answered And Said

This begins Job's reply to Bildad's very short speech.

Bildad's whole argument barely filled six verses.

Job now answers with his longest speech in the entire book.

The tone from the very first line is heavy sarcasm.

Job is about to prove something surprising.

He understands God's greatness better than his friends do.

🗣️ Job now answers Bildad
📏 Bildad's speech was very short
😏 Job responds with heavy sarcasm
📖 Job proves he understands God's greatness better


## 😏 How Hast Thou Helped Him That Is Without Power

This question is sarcasm, not a genuine compliment.

"Without power" means someone with no strength left to help himself.

Job is mocking Bildad for offering no real comfort to a suffering man.

Bildad's brief speech never once addressed Job's actual pain.

A truly helpful friend would have done more than describe God's greatness.

😏 Job's question is pure sarcasm
💪 Without power means no strength left
🤐 Bildad never addressed Job's pain
📖 True comfort takes more than facts about God


## 💪 How Savest Thou The Arm That Hath No Strength

"The arm" is a common Bible picture for a person's own strength.

An arm with no strength pictures someone who cannot even help himself.

Job asks what Bildad actually did to save someone that weak.

The obvious answer is nothing at all.

Bildad offered words about God's power, but no real rescue for Job.

💪 The arm pictures personal strength
🦴 No strength means totally helpless
❓ Job asks what Bildad actually saved
📖 Words about God are not rescue


## 🧠 How Hast Thou Counselled Him That Hath No Wisdom

"Counselled" means giving wise guidance to someone who is stuck.

Job asks if Bildad gave any wisdom Job did not already have.

Bildad's short speech mostly repeated ideas the friends already used.

Nothing in it answered Job's actual questions about his suffering.

Real counsel would have wrestled with Job's pain, not just praised God from a distance.

🧠 Counselled means giving wise guidance
🔁 Bildad repeated old arguments
❓ Job already knew this "wisdom"
📖 Real counsel wrestles with real pain


## 📝 How Hast Thou Plentifully Declared The Thing As It Is

"Plentifully declared" means explained fully and completely.

Job's sarcasm points out that Bildad barely explained anything.

Bildad's whole speech was only six verses long.

A subject as large as God deserves far more than that.

Job is about to show what a full description of God actually sounds like.

📝 Plentifully declared means fully explained
📏 Bildad's speech was far too short
🌌 God's greatness deserves more than six verses
➡️ Job is about to show him how


## ❓ To Whom Hast Thou Uttered Words? And Whose Spirit Came From Thee?

Job asks where Bildad's words actually came from.

"Spirit" here can mean inspiration, or simply Bildad's own breath and effort.

Job implies Bildad's speech was not truly inspired by God.

It sounded like something anyone could have said without real insight.

This closes Job's sarcastic opening before he gives his own answer about God.

❓ Job questions where the words came from
💨 Spirit can mean inspiration or mere breath
🚫 Job implies no real inspiration was there
➡️ This sets up Job's own answer

# Job 26:5-6
# 💀 Even The Realm Of The Dead Is Exposed
---
## 💀 Dead Things Are Formed From Under The Waters

This verse pictures the world of the dead, sometimes called Sheol.

Ancient near eastern people often imagined it as a shadowy place beneath the earth and sea.

"Dead things" refers to departed spirits, not the physical bodies of the dead.

The picture uses the waters like a curtain hiding that hidden realm.

Even that hidden place lies open before God, not sealed away from Him.

💀 Dead things means departed spirits
🌊 Sheol was pictured beneath the waters
🫥 It was thought hidden from view
📖 Even that hidden place is open to God


## ⚰️ Hell Is Naked Before Him

"Hell" here translates Sheol, the Old Testament word for the realm of the dead.

This is not the same as the later Christian idea of eternal punishment.

"Naked" means fully exposed, with nothing hidden or covered.

Even the deepest, darkest place cannot be concealed from God.

Nothing in creation, seen or unseen, escapes His sight.

⚰️ Hell here means Sheol, not eternal punishment
👁️ Naked means fully exposed
🌑 Even the darkest place is seen
📖 Nothing escapes God's sight


## 🕳️ Destruction Hath No Covering

"Destruction" here translates a Hebrew word often linked to Abaddon, a name for ruin itself.

It works as another name for the same hidden realm as Sheol.

"No covering" repeats the same idea as "naked" in the line before.

Hebrew poetry often says the same truth twice in different words.

This kind of doubling makes the point impossible to miss.

🕳️ Destruction is another name for ruin
🔁 It repeats the idea of Sheol
📜 Hebrew poetry often repeats for emphasis
📖 The point cannot be missed

# Job 26:7-10
# 🌍 God Hangs The Earth On Nothing
---
## 🧭 He Stretcheth Out The North Over The Empty Place

"The north" here pictures the northern sky stretching out above the earth.

Some ancient peoples believed a great cosmic mountain held up the sky in the north.

Job says God simply stretches it out, with nothing holding it up at all.

The verse quietly answers a popular myth of its day.

God does not need a mountain or pillar to hold up the heavens.

🧭 The north means the northern sky
🏔️ Some believed a cosmic mountain held it up
🙌 God simply stretches it out himself
📖 No pillar or mountain is needed


## 🌍 And Hangeth The Earth Upon Nothing

This line pictures the earth floating in space with no support underneath it.

Many ancient cultures imagined the earth resting on pillars, or on the back of an animal.

Job's poem rejects that picture entirely.

The earth simply hangs, held only by God's power.

This is a strikingly accurate picture for such an ancient poem.

🌍 The earth hangs with no support
🐢 Other cultures imagined pillars or animals
🚫 Job's poem rejects those pictures
📖 Only God's power holds it up


## 🪢 He Bindeth Up The Waters In His Thick Clouds

"Bindeth" means ties up or holds together securely.

The verse pictures clouds like large water skins carrying rain across the sky.

In the ancient world, this looked like a miracle every single day.

Only God could hold that much water above people's heads.

The everyday sky becomes proof of God's constant control.

🪢 Bindeth means ties together securely
☁️ Clouds are pictured like water skins
💧 Holding that water seemed miraculous
📖 The sky proves God's daily control


## ✂️ And The Cloud Is Not Rent Under Them

"Rent" means torn apart.

A cloud holding that much water should tear open and pour out everything at once.

Instead, God controls exactly how and when the rain falls.

This is another quiet picture of complete divine control over nature.

Even something as ordinary as rain follows God's careful design.

✂️ Rent means torn apart
💦 A torn cloud would dump all its water
🎚️ God controls how rain falls
📖 Ordinary rain shows God's design


## 👑 He Holdeth Back The Face Of His Throne, And Spreadeth His Cloud Upon It

This pictures God's throne in the sky, wrapped and hidden by clouds.

"Holdeth back the face" means He veils it from human sight.

People cannot look directly at the full glory of God's throne.

The clouds act like a curtain, softening what would otherwise overwhelm anyone who saw it.

God is present above, but graciously keeps His full glory covered.

👑 God's throne sits above the sky
🌥️ The clouds veil its full glory
🙈 No one could look at it directly
📖 God covers His glory graciously


## ⭕ He Hath Compassed The Waters With Bounds

"Compassed" means drew a circle or boundary line around something.

This pictures the horizon, where the sea appears to meet the sky.

Ancient sailors could travel for days and never find the edge of the sea.

Yet Job says God has already marked exactly where that boundary sits.

The sea looks endless to a person, but it is not endless to God.

⭕ Compassed means drew a boundary
🌊 This pictures the horizon
🚢 The sea seemed endless to sailors
📖 God already marked its true edge


## ⏳ Until The Day And Night Come To An End

This phrase means the boundary around the sea lasts as long as time continues.

Day and night have marked time since the very first days of creation.

Job is not describing a temporary limit.

He is describing an order built into creation from the beginning.

God's control over the sea is as permanent as time itself.

⏳ This means as long as time lasts
🌗 Day and night have marked time since creation
🔒 The boundary is not temporary
📖 God's control is permanent

# Job 26:11-14
# ⚡ The Thunder Of His Power Who Can Understand
---
## 🏛️ The Pillars Of Heaven Tremble

Ancient people often pictured the sky as a dome held up by pillars, like a great tent.

"Pillars of heaven" is poetic language, not a claim about literal architecture.

The image says even the strongest supports of creation shake before God.

If pillars that hold up the sky can tremble, nothing in creation is truly unshakable.

The point is not architecture, it is the sheer size of God's power.

🏛️ Pillars of heaven is poetic language
🏗️ It pictures the sky like a tent
📳 Even the strongest supports tremble
📖 Nothing in creation is unshakable


## 😱 And Are Astonished At His Reproof

"Reproof" means a sharp correction or rebuke.

"Astonished" pictures something frozen with shock, not simply surprised.

Even the pillars holding up the sky are stunned by God's voice of correction.

This is poetic exaggeration meant to show scale, not a literal event.

If the sky itself reacts this way, human beings have far less room to argue with God.

😱 Reproof means a sharp rebuke
🥶 Astonished means frozen with shock
🌌 Even the sky reacts to God's voice
📖 Humans have even less room to argue


## 🌊 He Divideth The Sea With His Power

Many ancient cultures told stories about their gods fighting the sea.

The sea often symbolized chaos and danger in those stories.

Job says the true God divided the sea by His own power, with no rival at all.

This same picture echoes later when God parts the Red Sea for Israel.

The sea that terrified sailors is nothing more than another thing God controls.

🌊 Ancient myths pictured gods fighting the sea
😨 The sea symbolized chaos and danger
💪 God alone divided it, with no rival
📖 This echoes the later Red Sea


## 🐉 By His Understanding He Smiteth Through The Proud

"The proud" here likely refers to a legendary sea monster named Rahab in Hebrew tradition.

Rahab pictured chaos and rebellion against God's order, not simply human pride.

"Smiteth through" means struck down completely, leaving no doubt about the winner.

Job pictures God defeating that chaos through wisdom, not just brute force.

Even the most feared powers in the ancient imagination are no match for God's understanding.

🐉 The proud may refer to Rahab
🌪️ Rahab pictured chaos and rebellion
💥 Smiteth through means struck down completely
📖 God's wisdom defeats even the fiercest chaos


## 🐍 His Hand Hath Formed The Crooked Serpent

"The crooked serpent" is another name for Leviathan, a sea monster in ancient near eastern stories.

Other cultures told stories of their gods struggling to defeat this creature.

Job says God simply formed it with His own hand.

A creature other nations feared was never a real threat to God.

What looked like ultimate chaos to everyone else was only ever God's own creation.

🐍 The crooked serpent means Leviathan
⚔️ Other myths show gods battling it
🙌 God simply formed it Himself
📖 Chaos to others was only creation to God


## 👀 Lo, These Are Parts Of His Ways

"Lo" is an old word meaning look, or pay attention.

"Parts of his ways" means these are only fragments, not the full picture.

Everything Job just described, the heavens, the sea, Leviathan, is only the edge of God's power.

Job admits even his own impressive description falls short of the whole truth.

The real weight of God is bigger than any single poem can capture.

👀 Lo means look, or pay attention
🧩 Parts of his ways means only fragments
🌌 All of this is only the edge
📖 God's full power exceeds any poem


## 🍽️ How Little A Portion Is Heard Of Him

"A portion" means a small share or fraction of the whole.

Job admits that everything anyone knows about God is only a small sample.

This comes from a man who just gave one of the most vivid descriptions of God in the book.

Even the wisest human words about God only scratch the surface.

True knowledge of God always leaves more left to discover.

🍽️ A portion means a small share
🤏 Job admits this is only a sample
📚 This is Job's own vivid speech
📖 Human words about God only scratch the surface


## ⛈️ But The Thunder Of His Power Who Can Understand

Thunder was one of the loudest sounds anyone in the ancient world ever heard.

Job says even thunder is only a small hint of God's real power.

The question "who can understand" expects the answer, no one.

Job has now praised God's greatness better than any of his three friends did.

Yet Job still has no answer for his own suffering.

That silence is the real weight of this whole chapter.

⛈️ Thunder was the loudest sound they knew
❓ Who can understand expects the answer, no one
🏆 Job outdoes his friends' praise of God
📖 His own suffering still has no answer
`.trim();

export const JOB_TWENTY_SIX_PERSONAL_SECTIONS = parseJobTwentySixRawNotes(JOB_TWENTY_SIX_RAW_NOTES);
