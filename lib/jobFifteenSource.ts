export type JobFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFifteenRawNotes(rawText: string): JobFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 15:${startVerse}` : `Job 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Job 15 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FIFTEEN_RAW_NOTES = `# Job 15:1-6
# 😤 Eliphaz Accuses Job Of Empty Words
---
## 🌬️ Should A Wise Man Utter Vain Knowledge

Eliphaz is accusing Job of speaking like a fool, not a wise man.

"Vain" means empty or worthless, with no real substance behind it.

A truly wise man would never talk this way, Eliphaz says.

This opens his second, sharper reply to Job.

He is no longer just correcting Job.

He is questioning Job's character.

🌬️ Vain means empty and worthless
🗣️ Eliphaz accuses Job of foolish talk
😤 His tone has grown sharper now
📖 He now questions Job's character

## 🌪️ Fill His Belly With The East Wind

The east wind in this region was a hot, dry wind off the desert.

It brought no rain and no relief, only heat.

Eliphaz pictures Job's words the same way.

They fill the air without ever nourishing anyone.

Wind cannot feed a person no matter how much of it they take in.

Eliphaz is calling Job's speech impressive sounding but empty.

🌪️ East wind was a hot desert wind
🍽️ It never brought relief or nourishment
🗯️ Job's words are pictured the same way
📖 Impressive sound with nothing behind it

## 🚫 Speeches Wherewith He Can Do No Good

Eliphaz repeats his accusation in a second question.

Hebrew poetry often restates one point in two different lines.

Eliphaz wants Job to hear the same charge twice.

He says Job's arguments accomplish nothing useful.

To Eliphaz, Job's defense is not just wrong.

It is pointless.

🔁 Hebrew poetry often repeats a point
🚫 Eliphaz says Job's words help no one
🎯 He wants the charge to land twice
📖 Job's defense is called pointless

## 😨 Thou Castest Off Fear

"Fear" here does not mean simple nervousness.

It means reverence and proper respect for God.

Eliphaz claims Job has thrown that reverence away completely.

This is one of the harshest charges in the whole book.

Eliphaz is not saying Job argues badly.

He is saying Job no longer honors God at all.

😨 Fear here means reverence for God
🗑️ Castest off means to throw away
⚠️ This is one of the harshest charges here
📖 Eliphaz says Job no longer honors God

## 🙏 Restrainest Prayer Before God

"Restrainest" means to hold back or hinder something.

Eliphaz claims Job has stopped approaching God the right way.

This charge is not really true.

Job has actually been speaking to God constantly.

Eliphaz reads Job's raw honesty as disrespect instead of prayer.

Job's cries are prayer, even in his pain.

🙏 Restrainest means to hold back
🗣️ Job has spoken to God often
👀 Eliphaz misreads honesty as disrespect
📖 Job's cries are prayer, not silence

## 👄 Thy Mouth Uttereth Thine Iniquity

"Iniquity" means guilt or wrongdoing.

Eliphaz claims Job's own words are proof of his sin.

He no longer needs outside evidence for this.

Job's speech itself convicts him, Eliphaz argues.

This is a serious escalation from Eliphaz's earlier, gentler speeches.

👄 Iniquity means guilt or wrongdoing
🗣️ Eliphaz says Job's words prove guilt
📈 His accusations have grown harsher
📖 He believes Job confessed without knowing it

## 🐍 Thou Choosest The Tongue Of The Crafty

"Crafty" describes someone cunning or deceptive on purpose.

Eliphaz accuses Job of choosing this kind of speech deliberately.

He is saying Job's words are calculated, not just wrong.

This charge paints Job as dishonest, not simply mistaken.

Eliphaz has moved from questioning Job's wisdom to questioning his honesty.

🐍 Crafty means cunning or deceptive
🎯 Eliphaz says Job chose this on purpose
⚠️ This charge attacks Job's honesty
📖 Eliphaz now doubts Job's integrity

## ⚖️ Thine Own Mouth Condemneth Thee

Eliphaz insists he is not the one accusing Job.

He says Job's own words are the witness against him.

This lets Eliphaz distance himself from his own harsh charge.

It also makes the accusation harder for Job to escape.

Eliphaz frames this as Job convicting himself.

⚖️ Eliphaz claims Job convicts himself
🗣️ Job's own words become the witness
🙅 Eliphaz distances himself from the charge
📖 The accusation feels inescapable this way

# Job 15:7-10
# 👴 Eliphaz Questions Job's Claim To Wisdom
---
## 👶 Art Thou The First Man That Was Born

Eliphaz asks Job a sharp, sarcastic question.

He wants to know if Job thinks he was the very first human being.

The first man would have had a head start on understanding the world.

Eliphaz is mocking the confidence behind Job's arguments.

He implies Job is acting like he alone has access to the truth.

👶 Eliphaz asks if Job was first
😏 The question is sharp and sarcastic
🥇 The first man had a head start
📖 Eliphaz mocks Job's confidence

## ⛰️ Wast Thou Made Before The Hills

This continues the same sarcastic question from the line before.

The hills picture something ancient, formed long before humanity.

Eliphaz asks if Job existed even earlier than that.

No human being could honestly answer yes.

Eliphaz is reminding Job that he is not as old or as wise as he argues.

⛰️ Hills picture something ancient and fixed
❓ No human predates the hills
😏 The question still mocks Job's confidence
📖 Job is not as wise as he argues

## 🤫 Hast Thou Heard The Secret Of God

"Secret" here means God's private counsel or hidden plans.

Ancient people pictured important decisions being made in a royal council.

Eliphaz asks if Job somehow sat in on God's own council.

No human being attends that council.

Eliphaz accuses Job of speaking as if he knows things only God knows.

🤫 Secret means God's private counsel
👑 Ancient kings kept private councils too
🚪 No human sits in on God's council
📖 Job speaks as if he does

## 🔒 Dost Thou Restrain Wisdom To Thyself

"Restrain" means to keep something locked up or held back.

Eliphaz accuses Job of hoarding wisdom he refuses to share.

He suggests Job acts as if he alone understands the situation.

This keeps the sarcastic tone of the whole opening question.

Eliphaz paints Job as arrogant, not simply mistaken.

🔒 Restrain means to hold back
🗝️ Eliphaz accuses Job of hoarding wisdom
😤 The sarcastic tone continues here
📖 Job is painted as arrogant

## 🤔 What Knowest Thou That We Know Not

Eliphaz asks what special knowledge Job could possibly have.

The question assumes the answer is nothing.

Eliphaz believes he and the other friends already understand everything worth knowing.

This kind of certainty will later be shown as wrong.

The end of the book corrects exactly this kind of confidence.

🤔 Eliphaz assumes Job knows nothing new
🧑‍🤝‍🧑 He speaks for all three friends
😤 His certainty sounds absolute here
📖 The book later corrects this certainty

## 👴 Both The Grayheaded And Very Aged Men

"Grayheaded" describes someone with gray hair from old age.

In this culture, old age was closely tied to wisdom and respect.

Eliphaz claims his side includes men older than Job's own father.

He uses age as proof that his position deserves more weight.

Eliphaz leans on tradition instead of actually answering Job's pain.

👴 Grayheaded means gray with old age
🏛️ Age was linked to wisdom here
👨‍👦 Eliphaz claims elders older than Job's father
📖 He leans on age, not real answers

# Job 15:11-13
# 💢 Turning The Spirit Against God
---
## 🕊️ The Consolations Of God Small With Thee

"Consolations" means comfort or comforting words.

Eliphaz asks if God's own comfort seems too small to Job.

He believes his own speeches carry that comfort from God.

Eliphaz cannot understand why Job has not accepted what he said.

Job has found no comfort in Eliphaz's words at all.

🕊️ Consolations means comforting words
🎁 Eliphaz thinks his speech offers comfort
❓ He cannot see why Job rejects it
📖 Job has found no comfort in it

## 💔 Why Doth Thine Heart Carry Thee Away

Eliphaz asks why Job's emotions have taken control of him.

He views Job's grief and anger as something Job should have controlled.

This question does not take Job's suffering seriously.

It treats deep pain as a discipline problem.

Eliphaz misses that Job's heart is responding to real, unbearable loss.

💔 Eliphaz blames Job's strong emotion
🚫 He does not take the suffering seriously
📏 He treats grief as a discipline issue
📖 Job's pain is real, not undisciplined

## 👁️ What Do Thy Eyes Wink At

"Wink" here pictures a flash of anger showing on someone's face.

Eliphaz notices something in Job's expression that unsettles him.

He reads that look as evidence of hidden rebellion.

A single expression becomes proof in Eliphaz's argument.

Eliphaz is building a serious accusation on very thin evidence.

👁️ Wink pictures a flash of anger
😠 Eliphaz notices something in Job's face
🕵️ He treats a look as evidence
📖 His accusation rests on very little

## 🔥 Thou Turnest Thy Spirit Against God

This is the accusation the whole section has been building toward.

Eliphaz claims Job has turned his very spirit against God.

He believes Job's honest words to God count as open rebellion.

This charge treats Job's grief stricken honesty as an attack on God.

Eliphaz cannot tell the difference between wrestling with God and turning against him.

🔥 This is the section's main charge
🗣️ Eliphaz calls honesty open rebellion
😢 He cannot see grief as different
📖 Wrestling with God is not attacking him

# Job 15:14-16
# 💧 No One Is Clean Before God
---
## 🧍 What Is Man That He Should Be Clean

Eliphaz shifts from accusing Job personally to a statement about all humanity.

"Clean" here means morally pure, without any sin at all.

Eliphaz asks how any human being could ever meet that standard.

This question echoes something Job himself said back in chapter fourteen.

Eliphaz uses a true idea, that no one is pure, to attack Job unfairly.

🧍 Man means humanity in general here
🧼 Clean means completely morally pure
🔁 This echoes Job's own earlier words
📖 A true idea gets used unfairly

## 👶 Born Of A Woman That He Should Be Righteous

"Born of a woman" is simply an old way of saying every human being.

"Righteous" means fully right and blameless before God.

Eliphaz argues no one born this ordinary way could ever reach that standard.

He is reminding Job that he is no exception to that rule.

No one is perfectly righteous, but that fact should not become an accusation.

👶 Born of a woman means every human
⚖️ Righteous means fully blameless
🚫 No human reaches that standard alone
📖 A true fact, used as an attack

## 👼 He Putteth No Trust In His Saints

"Saints" here does not mean people, it refers to holy heavenly beings.

Eliphaz claims even these heavenly beings are not fully trusted by God.

If God does not fully trust the angels, no human should feel secure.

Eliphaz already used this same idea in his very first speech.

He repeats an old argument instead of offering Job anything new.

👼 Saints here means holy heavenly beings
🤷 Even they are not fully trusted
🔁 Eliphaz repeats an earlier argument
📖 Nothing new is offered to Job

## 🌌 The Heavens Are Not Clean In His Sight

Eliphaz pushes his point even further here.

He claims even the heavens fall short of God's perfect purity.

The heavens likely represent the highest, most exalted part of creation.

This is meant to make human impurity seem unavoidable by comparison.

Nothing in creation meets God's purity on its own.

🌌 Heavens picture the highest part of creation
📉 Even they fall short of God
🧮 This makes human impurity seem inevitable
📖 Nothing in creation meets God's purity alone

## 🤢 Abominable And Filthy Is Man

"Abominable" means something deeply disgusting or detestable.

"Filthy" pictures something stained or corrupted through and through.

Eliphaz is using the strongest language in the whole speech so far.

This description is meant to include Job as much as anyone else.

The target here is humanity in general, not Job alone.

🤢 Abominable means deeply detestable
🧫 Filthy pictures being stained through
😳 This is the harshest language yet
📖 The target is humanity, not Job alone

## 💧 Drinketh Iniquity Like Water

This pictures someone drinking sin the way a thirsty person drinks water.

Water is something people reach for constantly, without a second thought.

Eliphaz says sin has become just as natural for humanity.

No one questions or resists it, people simply take it in.

Eliphaz uses an everyday picture to describe something deeply serious.

💧 Water pictures something taken constantly
🍶 Sin is pictured the same way
🚫 No one questions or resists it
📖 An everyday image for something serious

# Job 15:17-19
# 📜 What The Fathers Handed Down
---
## 👂 I Will Shew Thee Hear Me

Eliphaz shifts from accusation into teaching mode here.

"Shew" is an old spelling of "show," meaning to demonstrate or explain.

He asks Job for careful, undivided attention to what comes next.

This marks a turn from personal attack toward his larger argument.

Eliphaz wants Job to listen closely to what he considers settled truth.

👂 Shew is an old spelling of show
🎓 Eliphaz shifts into teaching mode
🔀 This turns toward his main argument
📖 He wants Job's full attention

## 👀 That Which I Have Seen I Will Declare

Eliphaz claims personal, firsthand experience for what follows.

He is not just repeating a rumor or a guess.

He wants Job to trust this section because he witnessed it himself.

This claim gives extra weight to the description that follows.

Eliphaz stakes his credibility on personal observation, not just tradition.

👀 Eliphaz claims firsthand experience
🗣️ He is not just repeating rumor
⚖️ This adds weight to his claim
📖 He stakes his credibility on it

## 👴 Which Wise Men Have Told From Their Fathers

Eliphaz adds a second source of authority to his own experience.

He says this teaching was passed down from wise men through generations.

In this culture, an idea inherited from ancestors carried serious weight.

Eliphaz stacks up every kind of authority he can find.

He wants Job to feel he is arguing against generations of accepted wisdom.

👴 Wise men passed this teaching down
🏛️ Inherited teaching carried real weight
📚 Eliphaz stacks up every authority he can
📖 Job is made to feel outnumbered

## 🌍 Unto Whom Alone The Earth Was Given

This phrase likely points back to an earlier, purer generation of humanity.

Some see it as a time before foreign nations mixed into the land.

Eliphaz pictures wisdom being passed down without outside corruption.

This detail supports his claim that his teaching comes from a trustworthy source.

Eliphaz argues that his teaching's origin makes it especially reliable.

🌍 This points to an earlier generation
🚫 A time without outside corruption
🔗 It supports Eliphaz's claim of purity
📖 Origin is used to prove reliability

## 🚶 No Stranger Passed Among Them

"Stranger" here means a foreigner or outsider to that early community.

Eliphaz claims this teaching stayed free from outside influence.

He argues that nothing corrupted this wisdom as it passed down.

This finishes his case for why his argument deserves full trust.

Eliphaz builds an elaborate case for his authority before saying anything new.

🚶 Stranger means a foreign outsider
🔒 The teaching stayed free of outside influence
🏗️ Eliphaz has built up his authority
📖 All this before saying anything new

# Job 15:20-24
# 😨 The Wicked Man's Life Is Torment
---
## 😖 The Wicked Man Travaileth With Pain All His Days

"Travaileth" pictures the intense pain of labor and childbirth.

Eliphaz uses that image to describe constant, ongoing suffering.

He claims a wicked person's entire life carries this kind of pain.

This begins Eliphaz's long description of what happens to someone who defies God.

Job's own suffering will get read the same way, unfairly.

😖 Travaileth pictures labor pain
🔁 Eliphaz means constant, ongoing suffering
🧭 This begins his portrait of the wicked
📖 Job's suffering gets read the same way

## 🔢 The Number Of Years Is Hidden To The Oppressor

"Oppressor" describes someone who mistreats or crushes others for gain.

Eliphaz says this kind of person never knows how long their trouble will last.

Not knowing when suffering will end can feel worse than the suffering itself.

Uncertainty becomes its own kind of torment in Eliphaz's picture.

The wicked are trapped in pain with no visible end in sight.

🔢 Oppressor means someone who crushes others
❓ He never knows how long trouble lasts
😰 Uncertainty adds to the torment
📖 No visible end makes it worse

## 👂 A Dreadful Sound Is In His Ears

Eliphaz says the wicked person lives haunted by imagined threats.

Even silence can feel loud and threatening to someone gripped by guilt.

This dread follows the person everywhere, whether real danger is present or not.

Eliphaz treats this constant fear as a kind of built in punishment.

Guilt becomes its own relentless torment in this picture.

👂 The wicked hear threats that are not there
😰 Guilt makes even silence feel loud
🕰️ This dread never seems to leave
📖 Guilt becomes its own punishment

## 💥 In Prosperity The Destroyer Shall Come Upon Him

This does not mean the wicked person is never successful.

Eliphaz admits they can even prosper for a while.

He insists ruin will strike suddenly, even in the middle of good times.

Comfort, in his view, is never actually safe for someone living against God.

Apparent success only delays a coming collapse, Eliphaz argues.

💥 Even success does not guarantee safety
📈 The wicked can prosper for a time
⚡ Ruin can strike in the middle of it
📖 Apparent success only delays collapse

## 🌑 He Believeth Not That He Shall Return Out Of Darkness

"Darkness" here pictures disaster, danger, or death itself.

Eliphaz says the wicked person expects no escape once trouble arrives.

This describes a mindset of hopelessness hanging over every day.

Living without hope of relief becomes part of the punishment itself.

Eliphaz portrays constant dread as this person's ongoing reality.

🌑 Darkness pictures disaster or death
🚫 He expects no escape from it
😔 Hopelessness hangs over every day
📖 Dread itself becomes the punishment

## ⚔️ He Is Waited For Of The Sword

Eliphaz pictures violent death as something actively waiting for this person.

The sword represents sudden, violent judgment rather than a peaceful end.

This image makes destruction feel certain, not just possible.

Eliphaz is building toward a picture of a life that ends badly no matter what.

This kind of ending is simply what wickedness earns, in his system.

⚔️ The sword pictures violent judgment
⏳ Death is described as already waiting
🎯 Destruction is made to feel certain
📖 Eliphaz says this is what wickedness earns

## 🍞 He Wandereth Abroad For Bread

Eliphaz pictures the wicked person reduced to desperate wandering for food.

This is a picture of total loss, not just spiritual ruin.

Someone who once had wealth ends up begging simply to survive.

Eliphaz uses this image to show how completely wickedness undoes a life.

The fall he describes touches every part of a person's life.

🍞 The wicked wander desperate for food
📉 This pictures total loss, not just guilt
👑 Wealth and status disappear completely
📖 The fall touches every part of life

## 🌑 The Day Of Darkness Is Ready At His Hand

Eliphaz says this coming disaster is not distant or uncertain.

It stands close by, ready to strike at any moment.

The wicked person lives fully aware that ruin could arrive anytime.

This awareness feeds directly back into the earlier picture of dread.

The wicked never truly escape the shadow of coming judgment.

🌑 Disaster is described as close by
⏰ It could strike at any moment
😰 Awareness of it feeds constant dread
📖 The wicked never escape that shadow

## 😱 Trouble And Anguish Shall Make Him Afraid

"Anguish" means deep mental or emotional distress, more than simple worry.

Eliphaz says fear itself becomes overwhelming for someone living this way.

This is not a passing moment of nerves.

It is a crushing, constant weight instead.

In this picture, the wicked lose any sense of safety at all.

😱 Anguish means deep emotional distress
⚖️ Fear becomes an overwhelming weight
🧨 This is not passing nervousness
📖 All sense of safety collapses

## 🛡️ As A King Ready To The Battle

Eliphaz compares this final onslaught of trouble to an army ready for war.

A king preparing for battle expects danger and organizes forces against it.

Trouble comes at the wicked person like a coordinated attack.

This military image closes out Eliphaz's description of constant torment.

Eliphaz pictures a wicked life ending in overwhelming defeat, not quiet decline.

🛡️ A king pictures organized, prepared danger
⚔️ Trouble arrives like a coordinated attack
📉 This is not a small setback
📖 The wicked life ends in defeat

# Job 15:25-28
# ⚔️ Defying The Almighty
---
## ✊ He Stretcheth Out His Hand Against God

Eliphaz now explains why the wicked person suffers this way.

Stretching out a hand against someone pictured open defiance.

This person has directly challenged God, not just broken a rule quietly.

The next line repeats the same idea with an even stronger name for God.

Eliphaz treats this defiance as the root cause behind everything described so far.

✊ Stretching a hand pictures open defiance
⚔️ The wicked person directly challenges God
🔁 The next line repeats this idea
📖 Defiance is named as the root cause

## 🛡️ Upon The Thick Bosses Of His Bucklers

"Bucklers" were small, round shields carried into battle.

The "bosses" were the thick, raised centers built to absorb hard blows.

Eliphaz pictures the wicked person charging recklessly, shield raised, at God.

It is an image of reckless confidence, not calm rebellion.

Eliphaz portrays this defiance as bold to the point of being foolish.

🛡️ Bucklers were small round shields
🎯 Bosses were the shield's reinforced center
🏃 Eliphaz pictures a reckless, headlong charge
📖 Defiance here looks foolish, not brave

## 😊 Covereth His Face With His Fatness

"Fatness" pictures physical prosperity, wealth, and abundance.

Eliphaz says this person's success has visibly settled into their appearance.

A well fed, comfortable face was a common sign of ease in this culture.

Eliphaz connects this outward comfort directly to inward pride.

Comfort fed this person's arrogance rather than their gratitude, he argues.

😊 Fatness pictures wealth and comfort
👤 Success shows visibly in this person's face
🏛️ A full face signaled ease in this culture
📖 Comfort fed pride, not gratitude

## 🥩 Maketh Collops Of Fat On His Flanks

"Collops" are thick folds or layers of fat on the body.

"Flanks" refers to the sides of the body, near the waist.

This continues the picture of someone grown comfortable and self indulgent.

Eliphaz uses this physical image to represent spiritual complacency underneath.

Outward comfort can hide a heart that has grown careless toward God.

🥩 Collops means thick folds of fat
📏 Flanks means the sides of the body
😌 This pictures comfort and self indulgence
📖 Outward ease can hide inward carelessness

## 🏚️ Dwelleth In Desolate Cities

Eliphaz shifts to describe the coming ruin of this prideful person.

"Desolate" means abandoned and empty of life.

He pictures this person eventually living among ruins, not thriving cities.

This is a sharp reversal from the fatness and comfort described just before.

Whatever comfort the wicked person built for themselves does not last.

🏚️ Desolate means abandoned and empty
🔄 This reverses the earlier picture of comfort
🏙️ Thriving cities become empty ruins instead
📖 Built up comfort does not last

## 🧱 Ready To Become Heaps

"Heaps" pictures piles of rubble, what is left after a collapse.

Eliphaz says these houses are actively falling apart, not merely old.

He pictures a slow, steady collapse rather than one sudden disaster.

This image closes his description of where defiance against God leads.

Pride and defiance always end in this kind of ruin, Eliphaz insists.

🧱 Heaps means piles of rubble
📉 The houses are actively collapsing
⏳ Eliphaz pictures a slow ruin, not sudden
📖 Defiance ends in ruin, Eliphaz insists

# Job 15:29-35
# 🔥 The Wicked Man's Future Destroyed
---
## 💰 He Shall Not Be Rich

Eliphaz insists lasting wealth is never truly available to the wicked.

Any prosperity they enjoy will not continue or grow into anything permanent.

"Substance" refers to a person's total wealth or possessions.

Eliphaz claims this kind of prosperity always eventually collapses.

Whatever the wicked gain, they cannot fully keep it.

💰 Lasting wealth never truly reaches the wicked
📦 Substance means a person's total possessions
📉 Any prosperity eventually collapses
📖 What is gained cannot be kept

## 🌱 Neither Shall He Prolong The Perfection Thereof Upon The Earth

"Perfection" here means the full completion or extent of something.

Eliphaz says the wicked person's success can never fully mature.

Something always cuts it short before it reaches its full potential.

This adds a second layer of loss to the wealth already mentioned.

Wickedness guarantees an unfinished, cut short life, in Eliphaz's system.

🌱 Perfection means full completion here
✂️ Success is always cut short early
📉 Nothing wicked reaches its full potential
📖 Wickedness guarantees an unfinished life

## 🌑 He Shall Not Depart Out Of Darkness

This repeats language used earlier in the chapter about disaster.

Eliphaz says this person will find no way out of the coming ruin.

There is no escape route once this kind of judgment begins.

Repeating this phrase reinforces how final Eliphaz believes the outcome will be.

This darkness is a destination for him, not a passing phase.

🌑 Darkness again pictures disaster and ruin
🚪 No escape route is available
🔁 Eliphaz repeats this idea on purpose
📖 The darkness is a destination, not a phase

## 🔥 The Flame Shall Dry Up His Branches

Eliphaz compares this person to a tree scorched by fire.

Branches represent a person's family, descendants, and future.

Fire drying up branches pictures those descendants failing to thrive.

This directly reverses the hopeful tree image from chapter fourteen.

Where Job hoped a cut tree could sprout again, Eliphaz says this tree simply burns.

🔥 Fire pictures scorching, total loss
🌿 Branches picture a person's descendants
🚫 Those descendants fail to continue
📖 This reverses Job's earlier hopeful image

## 💨 By The Breath Of His Mouth Shall He Go Away

Scholars disagree on whose breath this refers to, God's or the wicked man's own.

Either reading points to the same basic outcome.

A mere breath is small and light, yet enough to end everything here.

The wicked person's downfall does not require a massive event to arrive.

Eliphaz pictures an ending that comes almost effortlessly once judgment is due.

💨 Breath pictures something light and small
❓ Scholars debate exactly whose breath this is
⚡ Either reading ends the same way
📖 Judgment can arrive with almost no effort

## 🍇 Let Not Him That Is Deceived Trust In Vanity

"Vanity" means something empty or worthless, with no real substance.

Eliphaz warns that trusting worthless things only leads to more deception.

"Recompence" in the next phrase means the payment someone receives.

Eliphaz argues that empty trust always earns an equally empty reward.

What someone builds their confidence on determines what they end up with.

🍇 Vanity means something empty and worthless
⚠️ Trusting emptiness leads to more deception
💱 Recompence means the return one receives
📖 Empty trust earns an empty reward

## ⏳ It Shall Be Accomplished Before His Time

Eliphaz says this person's ruin arrives earlier than it naturally should.

Their life gets cut short before reaching its expected length.

This adds urgency to Eliphaz's warning.

Nothing about this outcome unfolds on the wicked person's own schedule.

Judgment does not wait for a convenient moment, Eliphaz insists.

⏳ Ruin arrives earlier than expected
✂️ Life gets cut short of its length
⏰ Nothing unfolds on the wicked man's schedule
📖 Judgment does not wait for convenience

## 🌿 His Branch Shall Not Be Green

A green branch pictures something alive, healthy, and still growing.

Eliphaz says this branch will never even reach that thriving state.

This continues the tree imagery used earlier in the chapter.

The picture is one of a future that never gets to flourish.

Eliphaz pictures potential cut off before it ever truly begins.

🌿 Green pictures something alive and thriving
🚫 This branch never reaches that state
🌳 The tree image continues from before
📖 Potential is cut off before it begins

## 🍇 He Shall Shake Off His Unripe Grape As The Vine

An unripe grape falls off a vine before it fully develops.

Vine growers understood this as a sign of a failed harvest.

Eliphaz compares the wicked person's life to fruit that never gets to ripen.

All the potential is there, but it never gets fulfilled.

Eliphaz pictures a life full of promise that never comes to anything.

🍇 An unripe grape falls before developing
🍂 This pictured a failed harvest
🌱 The wicked man's life is compared to it
📖 Promise here never comes to anything

## 🫒 Cast Off His Flower As The Olive

Olive trees drop their blossoms before those blossoms become fruit.

This was a familiar, everyday sight to anyone farming in that region.

Eliphaz uses it as one more picture of wasted potential.

Three different plant images in a row all point to the same outcome.

Eliphaz stacks image after image so his warning cannot be missed.

🫒 Olive blossoms often fall before fruiting
🌾 This was a familiar farming sight
🔁 It repeats the same warning again
📖 Eliphaz stacks images so none are missed

## 🏛️ The Congregation Of Hypocrites Shall Be Desolate

"Hypocrites" here describes people who are godless or corrupt at heart.

"Congregation" means the whole community these people belong to.

Eliphaz says this entire group, not just individuals, will end up ruined.

The judgment described earlier for one person now covers their whole circle.

Eliphaz widens his warning from a single life to an entire corrupt community.

🏛️ Congregation means the whole community
🎭 Hypocrites here means the godless or corrupt
📉 Eliphaz says the whole group is ruined
📖 The warning widens beyond one person

## 🔥 Fire Shall Consume The Tabernacles Of Bribery

"Tabernacles" here simply means tents or dwelling places.

"Bribery" points to wealth gained dishonestly, through corruption.

Eliphaz says homes built on that dishonest gain will be destroyed by fire.

The method of gaining wealth determines the fate of what it built.

Corrupt gain can never provide lasting shelter, Eliphaz insists.

🔥 Fire pictures total, sudden destruction
🏠 Tabernacles here just means dwellings
💰 Bribery means dishonestly gained wealth
📖 Corrupt gain provides no lasting shelter

## 🐍 Their Belly Prepareth Deceit

"Belly" here pictures a person's inner self, where intentions form.

Eliphaz says deceit does not happen by accident for this kind of person.

It is planned and prepared deep inside, long before it is spoken.

This closes Eliphaz's speech on a note of deep, deliberate corruption.

Eliphaz ends by describing wickedness as cultivated, not stumbled into.

🐍 Belly pictures a person's inner self
🧠 Deceit is planned, not accidental
🌱 It is prepared deep inside first
📖 Eliphaz ends on deliberate corruption
`.trim();

export const JOB_FIFTEEN_PERSONAL_SECTIONS = parseJobFifteenRawNotes(JOB_FIFTEEN_RAW_NOTES);
