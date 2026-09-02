export type JobThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyRawNotes(rawText: string): JobThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 30:${startVerse}` : `Job 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 30 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_RAW_NOTES = `# Job 30:1-4
# 😔 Mocked By Men He Once Outranked
---
## 😔 They That Are Younger Than I Have Me In Derision

Derision means mocking laughter filled with contempt.

These are young men who once would not have dared mock Job.

In chapter twenty nine, elders stood up when Job walked by.

Now the sons of outcasts laugh in his face.

That reversal is the whole point of this chapter.

😔 Derision means mocking contempt

🔄 This reverses chapter twenty nine

👦 Younger men now mock Job

📖 The reversal is the chapter's point

## 🐕 Whose Fathers I Would Have Disdained To Have Set With The Dogs Of My Flock

Disdained means considered too low or unworthy.

Sheepdogs guarded the flock and lived among the animals.

Job says these men's fathers were not even fit for that work.

Now their sons are the ones mocking him.

🚫 Disdained means considered unworthy

🐕 Sheepdogs lived and worked with the flock

👴 Job ranked these fathers below that

📖 Their sons now mock him

## ❓ Whereto Might The Strength Of Their Hands Profit Me

This is a rhetorical question, not a real one.

Job means their strength was worth nothing to him at all.

Men that weak could not even help tend his flocks.

Their uselessness is part of the insult.

❓ This is a rhetorical question

💪 Their strength was worth nothing

🐑 They could not even help his flocks

📖 Their uselessness deepens the insult

## ⏳ In Whom Old Age Was Perished

This does not mean these men grew old and died.

It means life had already worn them out early.

Hunger and hardship aged them before their time.

Job is describing broken, used up men, not the elderly.

🚫 Not literal old age

⏳ Hardship wore them out early

🌾 Hunger aged them before their time

➡️ These were broken, not elderly, men

## 💰 For Want And Famine They Were Solitary

Want means severe poverty and lack.

Famine forced these men away from normal society.

Solitary means they lived cut off, without community.

Poverty pushed them completely outside the world Job knew.

💰 Want means severe poverty

🌾 Famine forced them away from others

🏝️ Solitary means cut off, alone

📖 Poverty pushed them outside society

## 🏜️ Fleeing Into The Wilderness In Former Time Desolate And Waste

This wilderness was already known as empty and ruined ground.

Nobody chose to live there who had any other option.

These men had nowhere else left to go.

🏜️ The wilderness was already known as ruined

🚫 Nobody chose to live there

🆘 These men had no other option

➡️ Desperation, not choice, sent them there

## 🌿 Who Cut Up Mallows By The Bushes

Mallows were a bitter wild plant, not a normal food source.

People only ate mallows when nothing better was available.

This detail shows how far these men had fallen.

🌿 Mallows were a bitter wild plant

🚫 Not a normal food source

🍽️ Eaten only out of desperation

📖 It shows how far they had fallen

## 🌱 Juniper Roots For Their Meat

Juniper roots are tough, bitter, and hard to digest.

Meat here simply means food in general, not animal flesh.

Eating roots instead of real food marks true starvation.

🌱 Juniper roots are bitter and tough

🍽️ Meat here just means food

🆘 Eating roots signals real starvation

➡️ Their poverty was extreme

# Job 30:5-8
# 🕳️ Outcasts Driven To The Rocks
---
## 🚫 They Were Driven Forth From Among Men

Driven forth means forced out, not simply left on their own.

Normal society refused to let these men stay.

They were treated as dangerous or unwanted, not just poor.

🚫 Driven forth means forced out

🏘️ Society refused to let them stay

⚠️ They were treated as unwanted

➡️ Rejection, not just poverty, shaped their lives

## 🗣️ They Cried After Them As After A Thief

People shouted at them the same way they would shout at a thief.

This shows the fear and suspicion aimed at these outcasts.

Nobody trusted them, even when they had done nothing wrong.

🗣️ People shouted as if chasing a thief

😨 This shows fear and suspicion

🚫 They were distrusted without real cause

📖 Suspicion followed them everywhere

## 🏔️ To Dwell In The Cliffs Of The Valleys, In Caves Of The Earth, And In The Rocks

These are not comfortable hiding places.

Caves and cliffs were the only shelter left to people with nothing.

Living there meant living outside normal human community entirely.

🏔️ Caves and cliffs offered rough shelter

🚫 These were the only options left

🏝️ They lived outside normal community

➡️ Their homes matched their rejection

## 🐴 Among The Bushes They Brayed

Brayed usually describes the loud cry of a wild donkey.

Job uses it here to describe these men's desperate cries.

The word choice makes them sound more animal than human.

🐴 Brayed normally describes a donkey's cry

😢 It describes desperate human cries here

🚫 The word makes them sound less than human

📖 Job's language matches their treatment

## 🌿 Under The Nettles They Were Gathered Together

Nettles are prickly plants that sting bare skin.

Gathering under them means these men had no better shelter available.

Even their meeting place caused them pain.

🌿 Nettles are prickly, stinging plants

🚫 No better shelter was available

😖 Even their shelter caused pain

➡️ Their misery had no relief

## 👎 They Were Children Of Fools, Yea, Children Of Base Men

Fools here does not mean lacking intelligence.

It means morally foolish, living without regard for God or wisdom.

Base means low in character, not simply poor.

Job is describing a family line marked by disgrace, not just poverty.

🚫 Fools here means morally foolish

📖 It is not about intelligence

👎 Base means low in character

➡️ Disgrace, not poverty, defined their line

## 😤 They Were Viler Than The Earth

This is a harsh, exaggerated insult.

Job means society considered them lower than dirt itself.

These are the very men now mocking him without shame.

😤 This is a harsh exaggeration

🌍 Viler than the earth means lower than dirt

🔄 These men now mock Job

📖 The insult sharpens the reversal

# Job 30:9-15
# 🌊 Attacked Without Mercy
---
## 🎵 And Now Am I Their Song

Job has become the subject of mocking songs.

People who once respected him now make jokes about his suffering.

This is public humiliation, not private gossip.

🎵 Job became the subject of mocking songs

😔 Former respect turned to ridicule

📢 This was public, not private

📖 Humiliation replaced honor

## 🗣️ Yea, I Am Their Byword

A byword means a name used as a common insult.

People began using Job's name as an example of disaster.

His suffering became a saying repeated by others.

🗣️ A byword is a name used as insult

⚠️ Job's name became an example of ruin

🔁 His suffering became a repeated saying

➡️ His name itself became a warning

## 🤢 They Abhor Me, They Flee Far From Me

Abhor means to hate with disgust, not simple dislike.

People now avoid Job as though his suffering were contagious.

This adds isolation to the pain he already carries.

🤢 Abhor means hate mixed with disgust

🏃 People avoid Job entirely

😢 Isolation adds to his suffering

📖 Even distance became a form of cruelty

## 🤮 Spare Not To Spit In My Face

Spitting in someone's face was a deliberate act of contempt.

This was not accidental or careless in that culture.

People felt free to insult Job without any restraint.

🤮 Spitting was a deliberate insult

🚫 It was never accidental

😤 People felt free to disrespect him

➡️ Restraint toward Job had disappeared

## 🪢 Because He Hath Loosed My Cord, And Afflicted Me

The cord here pictures the strength that once held Job steady.

Job says God is the one who loosened that strength.

He does not blame his attackers alone.

He names God's role too.

🪢 The cord pictures Job's strength

🙏 Job says God loosened it

⚖️ He names God's role honestly

📖 Job never fully separates suffering from God

## 🐴 They Have Also Let Loose The Bridle Before Me

A bridle normally controls and restrains an animal.

Removing the bridle means removing all restraint.

Job says his attackers now feel completely free to act against him.

🐴 A bridle normally restrains an animal

🚫 Removing it means no restraint

😤 Attackers now feel free to act

➡️ Job faces them with no protection

## ✋ Upon My Right Hand Rise The Youth

The right hand was considered the position of strength and honor.

Young men now attack Job from the very place that should defend him.

This detail makes the assault feel especially personal.

✋ The right hand was a place of honor

👦 Young men attack from that side

😔 The place of honor is now unsafe

📖 The attack feels deeply personal

## 🦶 They Push Away My Feet

This describes literally knocking Job off balance.

It is a small, humiliating act, not a major injury.

Even his footing is no longer safe from attack.

🦶 This describes knocking him off balance

😳 It is a small, humiliating act

🚫 Even his footing is not safe

➡️ Humiliation comes in constant small moments

## 🎯 They Raise Up Against Me The Ways Of Their Destruction

This means they actively plan and build ways to ruin him.

It is not random cruelty, it is deliberate effort.

Job faces attackers who are working hard against him.

🎯 This describes deliberate planning

🚫 It is not random cruelty

🛠️ They build ways to ruin him

📖 The attack is intentional, not accidental

## 🚧 They Mar My Path, They Set Forward My Calamity

Mar means to damage or block something on purpose.

Job's path likely means his life's direction, not just a road.

His attackers actively work to make his disaster worse.

🚧 Mar means to damage on purpose

🛤️ Path pictures his whole life direction

📉 Attackers work to worsen his disaster

➡️ Even his path forward is blocked

## 🆘 They Have No Helper

This line is easy to misread as describing Job's attackers.

It actually describes Job, who now has no one to help him.

His total isolation is the point being made.

🚫 This line describes Job, not his attackers

🆘 Job has no one left to help

😔 Total isolation is the point

📖 He faces this completely alone

## 🌊 They Came Upon Me As A Wide Breaking In Of Waters

This pictures a flood breaking through a barrier all at once.

Job's troubles did not come one at a time.

They overwhelmed him suddenly, like a flash flood.

🌊 This pictures a sudden flood

🚫 Troubles did not come one at a time

💥 They overwhelmed him all at once

➡️ Disaster came like a flash flood

## 🏚️ In The Desolation They Rolled Themselves Upon Me

Desolation describes the ruin Job's life had already become.

Rolled themselves pictures wave after wave crashing over him.

Even in the middle of ruin, more trouble kept coming.

🏚️ Desolation describes his ruined life

🌊 Rolled themselves pictures repeated waves

🔁 More trouble kept coming

📖 Ruin did not stop at one blow

## 😨 Terrors Are Turned Upon Me

Terrors here means overwhelming fear and dread, not one scary moment.

Job describes fear itself as something now aimed directly at him.

This is emotional suffering layered on top of the physical.

😨 Terrors means overwhelming dread

🎯 Fear itself feels aimed at him

💔 This adds emotional pain to physical pain

➡️ His suffering was more than physical

## 💨 They Pursue My Soul As The Wind

Wind cannot be outrun or blocked by human effort.

Job says his fears chase him with that same relentless force.

There is no shelter he can find from this pursuit.

💨 Wind cannot be outrun

😰 His fears chase him just as relentlessly

🚫 No shelter protects him from it

📖 The pursuit never lets up

## ☁️ My Welfare Passeth Away As A Cloud

Welfare here means Job's wellbeing and good standing in life.

Clouds change shape and vanish quickly in the sky.

Job says everything good in his life disappeared just as fast.

☁️ Welfare means his wellbeing and standing

💨 Clouds vanish quickly

📉 His good life disappeared just as fast

➡️ Nothing good in his life felt permanent anymore

# Job 30:16-19
# 🩹 The Body Breaking Down
---
## 🫗 And Now My Soul Is Poured Out Upon Me

Poured out pictures something emptied completely, with nothing left inside.

Job is not describing one bad feeling.

He means his whole inner strength has drained away.

🫗 Poured out means completely emptied

💔 This is not one bad feeling

😔 His whole inner strength drained away

📖 Nothing inside him felt full anymore

## ⏳ The Days Of Affliction Have Taken Hold Upon Me

Affliction means ongoing suffering, not a single event.

Taken hold pictures something gripping him and refusing to let go.

Job's suffering has become constant, not occasional.

⏳ Affliction means ongoing suffering

✊ Taken hold means it will not let go

🔁 His suffering became constant

➡️ There was no relief in sight

## 🦴 My Bones Are Pierced In Me In The Night Season

Bones being pierced describes deep, constant physical pain.

Night season means this pain was worst when he tried to rest.

Even sleep offered Job no escape from suffering.

🦴 Pierced bones describe deep constant pain

🌙 Night season means it worsened at rest

😣 Even sleep gave no escape

📖 Suffering followed him into the dark

## 🦵 My Sinews Take No Rest

Sinews are the tendons and muscles that hold the body together.

Job says even these never stop aching or twitching.

His body found no relief anywhere, awake or asleep.

🦵 Sinews are the body's tendons and muscles

😖 Even these never stopped aching

🚫 No relief came, awake or asleep

➡️ His whole body was under attack

## 🦠 By The Great Force Of My Disease Is My Garment Changed

Job's illness had changed the way his clothing fit or looked.

This may point to swelling, sores, or drastic weight loss.

His body's condition was visible from the outside now.

🦠 His illness changed how his clothing fit

🩹 This suggests swelling or sores

📉 His condition became visible outwardly

📖 Disease reshaped his whole body

## 👔 It Bindeth Me About As The Collar Of My Coat

A collar in that culture fit tightly around the neck.

Job says his illness now grips him just as tightly.

The image pictures suffering that feels inescapable, wrapped around him.

👔 A collar fit tightly around the neck

🤕 His illness gripped him the same way

🚫 The tightness felt inescapable

➡️ Suffering wrapped completely around him

## 🟤 He Hath Cast Me Into The Mire

Mire means thick, sticky mud that traps whatever falls into it.

Job says God is the one who placed him there.

Once again, Job names God directly in his suffering.

🟤 Mire means thick, trapping mud

🙏 Job says God placed him there

⚖️ He again names God directly

📖 Job never avoids the hard question

## 💨 I Am Become Like Dust And Ashes

Dust and ashes together picture something worthless and near death.

This phrase often marked mourning or deep humiliation in this culture.

Job says he himself has become that picture of ruin.

💨 Dust and ashes picture something worthless

😢 The phrase often marked mourning

🪦 It also suggests nearness to death

➡️ Job became the picture of ruin himself

# Job 30:20-23
# 🌪️ Crying Out To A Silent God
---
## 🙏 I Cry Unto Thee, And Thou Dost Not Hear Me

Job is now speaking directly to God, not about him.

He describes prayer that seems to go completely unanswered.

This is honest complaint, not rebellion or unbelief.

🙏 Job now speaks directly to God

🔇 His prayers seem unanswered

😔 This is honest complaint, not rebellion

📖 Job still brings his pain to God

## 🧍 I Stand Up, And Thou Regardest Me Not

Standing up here pictures Job presenting himself before God.

Regardest means to notice or pay attention to.

Job feels completely unseen, even while standing right before God.

🧍 Standing pictures presenting himself to God

👀 Regardest means to notice or pay attention

🚫 Job feels completely unseen

➡️ Silence from God felt worse than pain

## 😤 Thou Art Become Cruel To Me

This is a shocking accusation for Job to say about God.

Cruel means deliberately causing pain without mercy.

Job's honesty here shows how far his suffering has pushed him.

😤 This is a shocking accusation

💔 Cruel means causing pain without mercy

😢 It shows how far suffering pushed him

📖 The Bible records this raw honesty

## ✊ With Thy Strong Hand Thou Opposest Thyself Against Me

A strong hand pictures God's power being used with full force.

Opposest means actively working against, not simply allowing.

Job feels God himself has become his enemy in this moment.

✊ Strong hand pictures God's full power

⚔️ Opposest means actively working against

😔 Job feels God has become his enemy

➡️ His pain shaped how he saw God

## 🌪️ Thou Liftest Me Up To The Wind, Thou Causest Me To Ride Upon It

Job pictures himself being swept up and carried by a storm.

He has no control over where this force takes him.

The image captures how powerless Job feels in his suffering.

🌪️ Job pictures being swept up by a storm

🚫 He has no control over it

💨 The wind carries him helplessly

📖 Powerlessness defines this whole image

## 🧬 Dissolvest My Substance

Substance here means Job's whole being, body and strength together.

Dissolvest pictures something solid breaking apart and disappearing.

Job feels like he is being unmade, not just hurt.

🧬 Substance means his whole being

💧 Dissolvest pictures breaking apart

😢 Job feels unmade, not just hurt

➡️ This is deeper than physical pain

## ⚰️ For I Know That Thou Wilt Bring Me To Death

Job states this as a fact, not a fear or a guess.

He has stopped expecting healing or rescue at this point.

This certainty shapes everything Job says for the rest of the chapter.

⚰️ Job states this as fact, not fear

🚫 He has stopped expecting rescue

😔 This certainty shapes the rest of the chapter

📖 Job speaks from resignation, not despair alone

## 🏠 The House Appointed For All Living

This is a phrase for the grave, the place death eventually brings everyone.

Appointed means set in advance, not random or avoidable.

Job accepts death as certain for every living person, himself included.

🏠 This phrase describes the grave

📅 Appointed means set in advance

🌍 Death comes for every living person

➡️ Job accepts what he cannot escape

# Job 30:24-27
# ☔ Good Repaid With Evil
---
## 🔄 Howbeit He Will Not Stretch Out His Hand To The Grave

Howbeit means however, marking a shift in Job's thought.

Job seems to say that even a dying person still cries out for help.

He may be pointing out that suffering people still deserve some mercy.

🔄 Howbeit marks a shift in thought

🙏 Even the dying still cry for help

❤️ Suffering people still deserve mercy

📖 Job pleads for basic compassion

## 😢 Though They Cry In His Destruction

This line stays connected to the thought just before it.

Job describes someone crying out in the middle of their own ruin.

He is describing a universal human instinct.

Even the dying reach for help.

😢 This continues the same thought

🆘 Someone cries out in their own ruin

👤 This is a universal human instinct

➡️ Even the dying reach for help

## 😢 Did Not I Weep For Him That Was In Trouble

Job is not just claiming past charity here.

He is defending his character against unspoken accusation.

He genuinely cared for others long before his own suffering began.

😢 Job recalls his own past compassion

⚖️ He is defending his character

🤲 He cared for others before his own pain

📖 His compassion was real, not performed

## 💔 Was Not My Soul Grieved For The Poor

Grieved means Job felt real sorrow, not distant pity.

This mirrors what he already described doing in chapter twenty nine.

Job wants it clear that his kindness was genuine.

💔 Grieved means real sorrow, not pity

🔗 This mirrors chapter twenty nine

🤝 His kindness was genuine

➡️ Job's character has not changed

## 🙏 When I Looked For Good, Then Evil Came Unto Me

Job expected his kindness to be met with kindness in return.

Instead, he received suffering he did not expect or deserve.

This is the central confusion driving much of the whole book.

🙏 Job expected good to bring good

😔 Instead, suffering came unexpectedly

❓ This confusion drives the whole book

📖 Job cannot make sense of the reversal

## ☀️ When I Waited For Light, There Came Darkness

Light and darkness here stand for hope and hardship.

Job expected relief the way someone waits for daylight.

Darkness arriving instead pictures hope completely disappointed.

☀️ Light pictures hope and relief

🌑 Darkness pictures hardship instead

😢 His hope was completely disappointed

➡️ Expectation and reality did not match

## 🔥 My Bowels Boiled, And Rested Not

Bowels in this culture referred to the seat of deep emotion.

Boiled describes intense, churning inner distress.

Job means his inner turmoil never settled or calmed down.

🔥 Bowels referred to deep emotion here

🌊 Boiled describes churning inner distress

🚫 His turmoil never calmed down

📖 Emotional pain matched the physical

## ⏳ The Days Of Affliction Prevented Me

Prevented in this older English means to come before or overtake.

Job means suffering arrived before he could prepare for it.

His hardship kept overtaking him faster than he could respond.

⏳ Prevented here means came before

🚫 Suffering arrived before he could prepare

🔁 Hardship kept overtaking him

➡️ He never had time to catch up

# Job 30:28-31
# 🎻 A Harp Turned To Mourning
---
## 🌥️ I Went Mourning Without The Sun

This does not describe a single cloudy day.

It pictures Job living under a constant, ongoing gloom.

His sorrow colored every day, not just the hard ones.

🌥️ This is not one cloudy day

😔 It pictures constant, ongoing gloom

📅 Sorrow colored every single day

➡️ There was no relief from it

## 🏛️ I Stood Up, And I Cried In The Congregation

The congregation was the public gathering of the community.

Job's grief was not hidden or private.

He wept openly in front of everyone who once respected him.

🏛️ The congregation was the public gathering

😢 Job's grief was not hidden

👥 He wept in front of everyone

📖 Public honor turned to public sorrow

## 🐺 I Am A Brother To Dragons

Dragons here does not mean the mythical creature.

The word describes jackals, wild animals known for mournful howling.

Job says he now feels kinship with these howling creatures.

🐺 Dragons here means jackals

🚫 Not the mythical creature

🎶 Jackals were known for mournful howling

➡️ Job feels kinship with them now

## 🦉 A Companion To Owls

Owls lived in ruins and desolate places in this culture.

Their sound was associated with loneliness and mourning.

Job compares himself to creatures that live apart from others.

🦉 Owls lived in ruins and desolate places

😢 Their sound suggested loneliness

🏚️ Job compares himself to them

📖 Isolation defines this whole image

## 🩹 My Skin Is Black Upon Me

This describes a real physical symptom of Job's disease.

His skin had darkened or peeled from illness.

Job's suffering was visible on his body, not only felt inside.

🩹 This describes a real symptom

😣 His skin had darkened from illness

👀 His suffering was visible outwardly

➡️ Body and spirit suffered together

## 🔥 My Bones Are Burned With Heat

This pictures a burning fever deep inside Job's body.

The pain felt like it reached all the way to his bones.

His disease had become total, touching every part of him.

🔥 This pictures a deep burning fever

🦴 The pain reached to his bones

😖 His disease touched every part of him

📖 Nothing in his body was untouched

## 🎵 My Harp Also Is Turned To Mourning

A harp in this culture was used for joyful music and celebration.

Job says his own harp now only plays songs of grief.

Even the instruments of his former joy now serve his sorrow.

🎵 A harp was used for joyful music

😢 Job's harp now plays only grief

🔄 Joy has turned completely into mourning

➡️ Even his music reflects his loss

## 🎶 My Organ Into The Voice Of Them That Weep

An organ here means an ancient wind instrument, not a modern church organ.

It was also linked to celebration and festive occasions.

Job says even that instrument now sounds like weeping.

This final line closes the chapter exactly where it began, in grief.

🎶 Organ means an ancient wind instrument

🎉 It was linked to celebration

😭 Now it sounds like weeping

📖 The chapter closes in unresolved grief
`.trim();

export const JOB_THIRTY_PERSONAL_SECTIONS = parseJobThirtyRawNotes(JOB_THIRTY_RAW_NOTES);
