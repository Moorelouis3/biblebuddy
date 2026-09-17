export type PsalmsSeventySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventySevenRawNotes(rawText: string): PsalmsSeventySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+77:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 77 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+77:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+77:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 77 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 77,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 77:${startVerse}` : `Psalms 77:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 77 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_SEVEN_RAW_NOTES = `# Psalms 77:1-3
# 🌙 Crying Out In The Night
---
## 📣 I Cried Unto God With My Voice, And He Gave Ear Unto Me

Crying unto God with my voice does not mean a quiet, private thought.

It means calling out loud, the way someone shouts when they finally reach a breaking point.

The phrase repeats on purpose, unto God with my voice twice in one line.

Hebrew poetry often repeats a phrase to show intensity, not to pad the line.

Gave ear means God was not distant or unreachable.

He was listening the whole time.

📣 Crying out means calling aloud in desperation
🔁 The phrase repeats on purpose for emphasis
📜 Hebrew poetry repeats to show intensity
📖 God was listening the whole time

## 🙏 In The Day Of My Trouble I Sought The Lord

Trouble here means real distress, not a minor inconvenience.

Seeking the Lord means actively turning toward God instead of away from him.

Many people in pain pull away from God instead of toward him.

This psalm begins with the opposite instinct.

Pain became the reason to reach for God, not a reason to run from him.

😣 Trouble means real distress
🙏 Sought means actively turning to God
🏃 Many people run from God in pain
📖 This psalm turns toward him instead

## 🩹 My Sore Ran In The Night, And Ceased Not

Sore here means deep pain or aching grief, not a small ache.

Ran and ceased not pictures that pain continuing without a break.

Night often makes pain feel worse, with nothing left to distract from it.

This was a full night with no relief at all.

It was not a passing bad mood.

🩹 Sore means deep pain or grief
⏳ Ran and ceased not means constant pain
🌙 Night made the pain feel worse
📖 This was not a passing bad mood

## 🤔 I Remembered God, And Was Troubled

This looks backward at first, since remembering God should bring comfort.

Here it does the opposite, and troubled describes real inner turmoil.

He remembered who God was supposed to be and compared it to what he was feeling.

That gap between belief and feeling caused the trouble.

Honest faith allows a believer to say that struggle out loud.

🤔 Remembering God usually brings comfort
😟 Troubled means real inner turmoil
⚖️ He compared belief to what he felt
📖 Honest faith admits that struggle

## 😢 I Complained, And My Spirit Was Overwhelmed Selah

Complained here does not mean whining about something small.

It means pouring out real grief in words, the kind spoken when a person cannot hold it in any longer.

Overwhelmed describes a spirit that feels buried, unable to find its footing.

Selah appears again here, marking a pause right at the peak of his distress.

The psalm does not rush past this pain to fix it quickly.

😢 Complained means pouring out real grief
🌊 Overwhelmed means unable to find footing
⏸️ Selah pauses right at the peak
📖 The psalm does not rush past pain

# Psalms 77:4-6
# 🕯️ Remembering In The Dark
---
## 😴 Thou Holdest Mine Eyes Waking

This does not mean God was deliberately punishing him with sleeplessness.

It describes how deep distress can keep a person from sleep, no matter how hard they try.

Ancient writers often credited God with things that simply happened during hard seasons of life.

Holdest eyes waking is a vivid way to say he could not rest at all.

The exhaustion of grief was part of this whole ordeal.

😴 Holdest eyes waking means he could not sleep
💔 Deep distress often causes sleeplessness
📜 Ancient writers credited God with hard seasons
📖 Exhaustion was part of this grief

## 🤐 I Am So Troubled That I Cannot Speak

Cannot speak here means grief so heavy that words fail completely.

This is not shyness or a loss for small talk.

It describes the kind of pain that leaves a person staring, unable to form a sentence.

Even a skilled poet like this psalmist reaches a point language cannot cross.

Some pain has to be sat with before it can be spoken.

🤐 Cannot speak means words fail completely
😶 This is not shyness or small talk
🗣️ Even a poet reaches this limit
📖 Some pain must be sat with first

## 🤔 I Have Considered The Days Of Old, The Years Of Ancient Times

Considered here means deliberately thinking back, not just drifting into memory.

Days of old and years of ancient times both point to Israel's earlier history with God.

He is searching the past on purpose, looking for a reason to hope.

This is the same move people make today when they look back at answered prayers.

Remembering what God has done becomes a tool, not just a comfort.

🤔 Considered means deliberately thinking back
📜 Days of old points to Israel's history
🔍 He searches the past for hope
📖 Remembering God's past acts becomes a tool

## 🎶 I Call To Remembrance My Song In The Night

Song in the night likely refers to songs of praise he once sang to God.

Ancient worshippers often sang at night during festivals and times of prayer.

Calling it to remembrance means deliberately trying to recall that earlier joy.

The contrast is sharp, a song from easier days set against this sleepless, silent night.

He is reaching for what faith felt like.

🎶 Song in the night means past praise
🌃 Ancient worshippers often sang at night
🔁 He deliberately recalls that earlier joy
📖 He reaches for what faith felt like

## 💬 I Commune With Mine Own Heart, And My Spirit Made Diligent Search

Commune means having an honest, searching conversation, not small talk.

Here it is a conversation with himself, working through what he actually believes.

Diligent search means this was a careful, determined effort, not a passing thought.

He was not just venting, he was working to find an answer he could stand on.

Faith often requires this kind of slow, internal honesty.

💬 Commune means an honest inner conversation
🔎 Diligent search means careful determined effort
🐢 This was slow thinking, not reacting
📖 Faith requires this kind of honesty

# Psalms 77:7-9
# ❓ Six Anxious Questions
---
## 😰 Will The Lord Cast Off For Ever?

This is not a calm theological question.

It is grief speaking, wondering out loud if God has given up on him for good.

Cast off means rejected and pushed away completely.

Scripture elsewhere promises that God does not abandon his people forever.

This verse is not denying that promise, it is the sound of someone in pain doubting it.

😰 This question comes from raw grief
🚫 Cast off means rejected completely
📜 Scripture promises God does not abandon
📖 Pain can make a true promise feel doubtful

## 😊 And Will He Be Favourable No More?

Favourable here means kind, generous, and willing to bless.

No more pictures a door being shut permanently.

He is asking if God's kindness toward him has simply run out.

This kind of honest doubt is allowed inside prayer.

The Bible records it instead of hiding it.

😊 Favourable means kind and willing to bless
🚪 No more pictures a closed door
❓ He wonders if kindness has run out
📖 The Bible records honest doubt in prayer

## 🏜️ Is His Mercy Clean Gone For Ever?

Clean gone means completely used up, with nothing left at all.

Mercy here is God's compassion toward people who do not deserve it.

The question pictures mercy as something that could run dry like a well.

This is the psalmist's fear talking, not a settled belief.

Fear often exaggerates absence into permanence.

🏜️ Clean gone means completely used up
💧 Mercy is compassion toward the undeserving
🪣 He pictures mercy as a well running dry
📖 Fear exaggerates absence into permanence

## 🤝 Doth His Promise Fail For Evermore?

Promise here points to God's covenant commitments to his people.

Fail means broken or proven false.

For evermore pushes the fear out to its worst possible ending.

He is asking whether God's word can actually be trusted anymore.

This is the deepest fear grief can produce.

🤝 Promise means God's covenant commitment
💔 Fail means broken or proven false
⏳ For evermore pictures the worst ending
📖 This is grief questioning God's word

## 🤷 Hath God Forgotten To Be Gracious?

Forgotten does not mean God's memory actually failed.

It is how absence feels from the inside, as if he were overlooked.

Gracious describes God freely giving kindness that is not earned.

The question voices the fear of being invisible to God.

Real faith can still ask questions this hard.

🤷 Forgotten describes how absence feels
🎁 Gracious means kindness that is not earned
👻 He fears being invisible to God
📖 Real faith can ask hard questions

## 🔒 Hath He In Anger Shut Up His Tender Mercies Selah

Shut up pictures mercy locked away behind a closed door.

Tender mercies describes God's gentle, compassionate care, the kind shown to someone weak.

The question wonders if anger has replaced that gentleness completely.

Selah returns here, right after six raw, unanswered questions in a row.

The pause lets all of that honesty settle before the psalm moves on.

🔒 Shut up pictures mercy locked away
🤲 Tender mercies means gentle compassionate care
😠 He wonders if anger replaced it
📖 Selah lets the raw honesty settle

# Psalms 77:10-12
# 🔄 Choosing To Remember
---
## 🩹 This Is My Infirmity

Infirmity means weakness, not sin or wrongdoing.

He is naming his doubt honestly, calling it what it is, a moment of human weakness.

This is the turning point of the whole psalm.

Up to now he has only described his pain.

Here he chooses to interpret it differently.

🩹 Infirmity means weakness, not sin
🔄 This is the psalm's turning point
🗣️ He names his doubt honestly
📖 He chooses a different response now

## ✋ I Will Remember The Years Of The Right Hand Of The Most High

Right hand is a common Bible picture for strength and power.

The right hand of the most High points to God's mighty acts in Israel's past.

Instead of staying stuck in fear, he deliberately turns his mind toward what God has already done.

Remembering here is an active choice, not a passive feeling.

He is choosing where to aim his attention.

✋ Right hand pictures God's strength
📜 It points to God's mighty past acts
🧭 Remembering here is a deliberate choice
📖 He chooses where to aim his attention

## 🔁 I Will Remember The Works Of The LORD, Surely I Will Remember Thy Wonders Of Old

Works of the LORD and wonders of old describe the same thing said two different ways.

Hebrew poetry often repeats an idea in a second line instead of rhyming sounds.

The repetition is not filler, it adds weight the way saying something twice shows you mean it.

Works points to what God has done.

Wonders points to how amazing those acts were.

🔁 The line repeats one idea two ways
📜 Hebrew poetry repeats instead of rhyming
💪 Works points to what God has done
📖 Wonders shows how amazing those acts were

## 🧠 I Will Meditate Also Of All Thy Work

Meditate here does not mean clearing the mind or emptying it.

In the Bible it means turning something over slowly, thinking about it from every angle.

He plans to keep thinking about God's work, not just remember it once.

This turns a single memory into an ongoing habit.

Recovery from doubt takes repeated attention, not one good thought.

🧠 Meditate means turning something over slowly
🔂 He plans ongoing thought, not one memory
🏋️ This becomes a habit, not a moment
📖 Recovery from doubt takes repeated attention

## 🗣️ And Talk Of Thy Doings

Talk means speaking it out loud to other people, not just thinking privately.

Doings refers to the specific things God has actually done.

Remembering silently and telling someone else are two different steps.

Speaking it out loud makes the truth harder to quietly doubt again.

This models what it looks like to move from despair back to trust.

🗣️ Talk means speaking it out loud
📋 Doings means God's specific actions
👥 Telling someone is a separate step
📖 This models moving from despair to trust

# Psalms 77:13-15
# 👑 Who Is So Great A God
---
## 🛤️ Thy Way, O God, Is In The Sanctuary

Way here means God's manner of acting, not a literal road.

Sanctuary was the holy, set apart place where God's presence dwelled among his people.

The line means God's true character is revealed in his holiness, not the chaos happening around the psalmist.

Looking to the sanctuary meant looking past the crisis to who God actually is.

He is shifting his focus from circumstances to God's nature.

🛤️ Way means God's manner of acting
🏛️ Sanctuary was God's holy dwelling place
👁️ He looks past crisis to God's nature
📖 The focus shifts to who God is

## ❗ Who Is So Great A God As Our God?

This is not really a question looking for an answer.

It is an exclamation, the kind of thing said when comparison makes an answer obvious.

Ancient nations worshipped many different gods, each tied to their own people.

The psalmist is stating, with confidence, that none of them compare.

Doubt has now turned into bold confession.

❗ This is an exclamation, not a real question
🌍 Ancient nations worshipped many different gods
🏆 He confesses none of them compare
📖 Doubt has turned into bold confession

## ✨ Thou Art The God That Doest Wonders

Wonders means acts so far beyond normal explanation that people notice and talk about them.

This is not a vague compliment about God's power.

It points to specific, visible events like the plagues and the parting of the sea.

Later verses will name some of those events directly.

He is building toward a specific memory, not staying general.

✨ Wonders means acts beyond normal explanation
👀 People noticed and talked about them
🌊 It points to events like the sea parting
📖 He is building toward a specific memory

## 📢 Thou Hast Declared Thy Strength Among The People

Declared means made publicly known, not kept quiet.

Among the people points beyond Israel to the surrounding nations who watched it happen.

God's power was not a private family secret.

Other nations saw it and had to reckon with it.

His strength was meant to be witnessed, not hidden.

📢 Declared means made publicly known
🌍 Among the people includes surrounding nations
👀 Other nations witnessed his power
📖 His strength was meant to be seen

## 💪 Thou Hast With Thine Arm Redeemed Thy People

Arm is a Bible picture for God's active strength and power.

Redeemed means bought back or rescued at a cost, not just released.

This points directly to the exodus, when God rescued Israel out of slavery in Egypt.

He is now remembering the single biggest rescue in his nation's history.

That memory is the strongest evidence he has against his own doubt.

💪 Arm pictures God's active strength
🔓 Redeemed means rescued at a cost
🏃 This points to the exodus rescue
📖 It is his strongest evidence against doubt

## 👪 The Sons Of Jacob And Joseph Selah

Jacob was the patriarch whose new name, Israel, gave the whole nation its identity.

Joseph was one of Jacob's twelve sons, sold into slavery before rising to power in Egypt.

Naming Joseph specifically recalls how the family ended up in Egypt in the first place.

The rescue did not erase that earlier story, it completed it.

Selah closes the section right after this reminder of God's faithfulness across generations.

👪 Jacob's new name Israel named the nation
📦 Joseph was sold into slavery in Egypt
🔗 His story explains how they got there
📖 Selah closes it on generations of faithfulness

# Psalms 77:16-20
# 🌊 God's Way Through The Sea
---
## 🌊 The Waters Saw Thee, O God, The Waters Saw Thee, They Were Afraid, The Depths Also Were Troubled

The waters saw thee repeats twice in the same line on purpose.

This points back to the Red Sea, Israel once crossed it on dry ground.

The psalm pictures the sea reacting with fear at the sight of God.

The depths, the unseen water far below, reacted the very same way.

Hebrew poetry often moves from the visible to the hidden to show something is total.

Nature itself reacted to God the way Israel now needed to.

🌊 The waters points to the Red Sea
🔁 The phrase repeats twice for emphasis
🌀 The depths means the hidden, deep water
📖 Nature reacted to God like Israel needed to

## ⛈️ The Clouds Poured Out Water, The Skies Sent Out A Sound

This section pictures God's power using storm imagery, not calm weather.

Pouring clouds and a sound from the sky describe heavy rain and rolling thunder.

Ancient readers often described God's presence through storms, since a storm's power is impossible to ignore.

The exodus event is being retold as an overwhelming display of nature responding to God.

This is not a gentle memory, it is a dramatic one.

⛈️ This describes storm imagery
🌧️ Pouring clouds means heavy rain
🔊 A sound from the sky means thunder
📖 The exodus is retold as dramatic power

## 🏹 Thine Arrows Also Went Abroad

Arrows here is a poetic picture for lightning, not literal weapons.

Went abroad means they struck out in every direction at once.

Ancient writers often described lightning as God's arrows shot from the sky.

The image adds a sense of active, aimed power, not random weather.

God was not just present in the storm, he was acting through it.

🏹 Arrows pictures lightning
💥 Went abroad means striking everywhere
📜 Ancient writers linked lightning to God
📖 God was acting through the storm

## 🗣️ The Voice Of Thy Thunder Was In The Heaven, The Lightnings Lightened The World

Voice of thy thunder describes the thunder as if God himself were speaking.

This is not a scientific description of a weather pattern.

Lightened the world means the lightning lit up even far distant places.

Together, thunder and lightning made God's presence loud and impossible to miss.

No one standing there could claim they had not noticed.

The whole sky became a witness to what was happening.

🗣️ Voice of thunder pictures God speaking
⚡ Lightened the world means widespread light
👂 Together they made his presence unmistakable
📖 The sky itself became a witness

## 🌍 The Earth Trembled And Shook

Trembled and shook pictures the ground itself responding, almost like a small earthquake.

Sky, sea, and now the ground all react in this same passage.

The whole created world responds together to this one moment.

Nothing in creation stayed still.

The scene builds a picture of total, overwhelming power.

🌍 Trembled and shook pictures an earthquake
🌐 Sky, sea, and ground all react together
🚫 Nothing in creation stayed still
📖 The scene builds total, overwhelming power

## 🛤️ Thy Way Is In The Sea, And Thy Path In The Great Waters

Way and path both describe the direction or route someone takes.

Sea and great waters point back to the Red Sea crossing one more time.

Saying God's way was in the sea means his actions went right through the biggest obstacle Israel faced.

The very thing that trapped Israel became the path God used to save them.

God's rescue used the hardest obstacle.

🛤️ Way and path mean the route taken
🌊 Sea points back to the Red Sea
🚧 The obstacle became the path of rescue
📖 God's rescue used the hardest obstacle

## 👣 Thy Footsteps Are Not Known

Footsteps not known means God's exact methods cannot be fully tracked or explained.

This is not a complaint, it is an honest admission.

Even after describing this dramatic rescue in detail, some mystery about God's ways remains.

Faith does not require understanding every step God takes.

It requires trusting the one taking them.

👣 Footsteps not known means methods stay unclear
🤷 This is an honest admission, not a complaint
❓ Some mystery about God remains even here
📖 Faith trusts the one taking the steps

## 🐑 Thou Leddest Thy People Like A Flock By The Hand Of Moses And Aaron

Leading like a flock is a common Bible picture for a shepherd's gentle care.

A shepherd guides sheep instead of driving them.

By the hand of Moses and Aaron means God worked through two human leaders.

Moses led Israel out of Egypt.

Aaron was his brother and served as the first high priest.

God's power in the storm and sea worked through ordinary human leadership.

The psalm ends by tying dramatic power back to two faithful people.

🐑 Leading like a flock pictures shepherd care
👫 Moses and Aaron were the human leaders
⛪ Aaron served as the first high priest
📖 God's power worked through ordinary leaders`.trim();

export const PSALMS_SEVENTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsSeventySevenRawNotes(PSALMS_SEVENTY_SEVEN_RAW_NOTES);
