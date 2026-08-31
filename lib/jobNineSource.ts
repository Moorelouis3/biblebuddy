export type JobNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobNineRawNotes(rawText: string): JobNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 9:${startVerse}` : `Job 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 9 sections, received " + sections.length);
  }

  return sections;
}

const JOB_NINE_RAW_NOTES = `# Job 9:1-4
# ⚖️ Job Answers Bildad's Challenge
---
## ✅ I Know It Is So Of A Truth

Job agrees with Bildad on one basic point.

God does reward the right and punish the wrong.

That is not what Job is questioning here.

Job is asking a much harder question underneath it.

✅ Job agrees God punishes wrongdoing

⚖️ That was Bildad's basic claim

❓ Job asks a deeper question instead

📖 Can anyone truly stand innocent before God

## ⚖️ How Should Man Be Just With God

"Just" here does not mean morally decent.

It means legally cleared, right in front of a judge.

Job is picturing a courtroom, not a character reference.

He is asking how a human could ever win a case against God.

No higher judge exists to render that verdict.

⚖️ Just means legally cleared, not simply good

🏛️ Job pictures a courtroom scene

❓ Can a human win a case against God

📖 No higher judge exists to decide it

## 🏛️ If He Will Contend With Him

"Contend" means to argue a formal legal case.

It is not casual disagreement or a private complaint.

Job imagines actually taking God to court.

The word choice shows how serious this question really is.

🏛️ Contend means arguing a formal case

🚫 Not a casual disagreement

⚖️ Job pictures suing God directly

📖 The seriousness matches the size of the question

## 🔢 He Cannot Answer Him One Of A Thousand

"One of a thousand" is not a literal count.

It is an old way of saying the odds are hopeless.

A person could not answer even a small fraction of God's questions.

The number picks the largest gap the ancient mind could picture.

🔢 One of a thousand means hopeless odds

❌ Not a literal count of questions

📏 The largest gap imaginable at the time

➡️ Human answers cannot keep up with God

## 🧠 Wise In Heart, And Mighty In Strength

"Heart" in Hebrew thinking means the mind, not just the emotions.

"Wise in heart" means God's understanding has no limit.

"Mighty in strength" means his power matches that wisdom.

God's mind and God's power move together in this verse.

🧠 Heart means mind in Hebrew thought

📚 Wise in heart means limitless understanding

💪 Mighty in strength means matching power

📖 God's wisdom and power move together

## 🪨 Who Hath Hardened Himself Against Him, And Hath Prospered

This question expects one answer. Nobody.

"Hardened himself" means stubbornly resisting God's will.

Job cannot name a single person who fought God and came out ahead.

The question closes Job's opening argument before his real point even starts.

❓ The question expects the answer nobody

🪨 Hardened means stubborn resistance

🚫 No one resists God and wins

➡️ This sets up Job's bigger question

# Job 9:5-10
# 🌌 God's Power Over Creation
---
## ⛰️ Which Removeth The Mountains, And They Know Not

Job pictures God moving mountains without warning.

"They know not" pictures the mountains as caught by surprise.

That is a poetic way of showing total, sudden power.

Nothing this large should move so easily, yet God moves it.

⛰️ God moves mountains without warning

😮 They know not pictures total surprise

💪 Shows power beyond normal limits

📖 Nothing this large should move so easily

## 💥 Which Overturneth Them In His Anger

"Overturneth" means completely flips or destroys something.

Job links this destructive power directly to God's anger.

Ancient readers often connected earthquakes and landslides to God's judgment.

The image is not gentle nature. It is force under real emotion.

💥 Overturneth means complete destruction

😠 Job links this to God's anger

🌍 Ancient readers saw quakes as judgment

📖 This is force, not gentle nature

## 🌍 Which Shaketh The Earth Out Of Her Place

This line pictures an earthquake strong enough to shift the ground itself.

"Out of her place" means the earth is not simply shaking.

That level of power had no other explanation to an ancient hearer.

🌍 Pictures a massive earthquake

📍 Out of her place means real shifting

😲 No other explanation existed at the time

📖 God's power reaches the ground itself

## 🏛️ The Pillars Thereof Tremble

Ancient people often pictured the earth resting on unseen pillars.

"Pillars thereof tremble" means even the earth's foundation shakes.

This is poetic language, not a claim about geology.

Nothing holding up the world is safe from God's hand.

🏛️ Pillars pictures the earth's foundation

😨 Even the foundation trembles here

🎨 Poetic language, not literal geology

📖 Nothing holding up the world is safe

## ☀️ Which Commandeth The Sun, And It Riseth Not

Job pictures God simply telling the sun to stay down.

This may point to an eclipse or a heavy storm.

Either way, the sun obeys instantly, without question.

The most reliable thing in daily life bends when God speaks.

☀️ God can command the sun itself

🌑 May picture an eclipse or storm

⚡ The sun obeys without question

📖 Even daily order bends to God's word

## ✉️ Sealeth Up The Stars

"Sealeth" means closing something shut, the way a wax seal closes a letter.

Job pictures God shutting the stars away like they are sealed behind a door.

This continues the same idea as the sun refusing to rise.

God controls the entire night sky, not just daylight.

✉️ Sealeth means closing shut like a letter

🌌 Stars pictured as sealed away

🌓 Continues the sun not rising image

📖 God controls the whole sky, day and night

## ☝️ Which Alone Spreadeth Out The Heavens

"Alone" is the key word in this line.

Job insists no other power helped God spread out the sky.

Many ancient religions pictured multiple gods sharing the work of creation.

Job's God needed no partner and no permission.

☝️ Alone is the key word here

🌌 God spread the sky by himself

🚫 No other god helped him

📖 The true God needed no partner

## 🌊 Treadeth Upon The Waves Of The Sea

Ancient stories often pictured the sea as a symbol of chaos.

Walking calmly on top of the waves pictures total mastery over that chaos.

The sea cannot rise higher than the God who treads on it.

This same picture of walking on water returns much later in the Gospels.

🌊 The sea often symbolized chaos

🚶 Treading on it pictures total control

👑 Nothing can rise above God's rule

📖 The same picture returns later with Jesus

## ✨ Which Maketh Arcturus, Orion, And Pleiades

These are three constellations still visible in the night sky today.

"Arcturus" is a bright star grouping near the Big Dipper.

"Orion" is the hunter shaped group of stars many people still recognize.

"Pleiades" is a tight cluster of stars sometimes called the Seven Sisters.

Naming them by name shows God made every specific star, not just stars in general.

✨ Arcturus, Orion, Pleiades are real constellations

🌌 Still visible in the night sky today

🎯 God made each one specifically

📖 Nothing in creation is generic to God

## 🏠 The Chambers Of The South

"Chambers of the south" pictures hidden rooms in the southern sky.

Ancient people could not see every constellation from where they lived.

Some stars only appeared far to the south, out of normal view.

Job pictures God as the one who still rules what nobody can see.

🏠 Chambers pictures hidden rooms in the sky

🧭 Points to stars unseen from home

👁️ Represents what people could not observe

📖 God rules even what nobody can see

## 📜 Which Doeth Great Things Past Finding Out

This line sums up everything just listed, mountains, stars, sea, and sky.

"Past finding out" means beyond what any person could fully explain.

Job is not being poetic for its own sake here.

He is building the case that no human can question this kind of power.

📜 Sums up mountains, stars, sea, and sky

🔍 Past finding out means unexplainable

🧠 Beyond any human's full understanding

📖 No one can question power like this

## ♾️ Wonders Without Number

"Without number" means Job could keep listing examples forever.

The images already given are only a small sample.

Job's real point is bigger than any single wonder.

No human stands in a position to challenge someone with unlimited power.

🔢 Without number means the list never ends

📋 These images are only a sample

♾️ God's wonders have no real limit

📖 No one can challenge unlimited power

# Job 9:11-13
# 👁️ God Passes By Unseen
---
## 👣 He Goeth By Me, And I See Him Not

Job shifts from talking about nature to his own experience.

He senses that God is active nearby, even when nothing is visible.

This is not doubt that God exists.

It is frustration that God's presence is so hard to pin down.

👣 God moves near Job unseen

👀 Job does not doubt God exists

😤 The frustration is God's hiddenness

📖 Presence without visibility feels unsettling

## 🔁 He Passeth On Also, But I Perceive Him Not

"Perceive" here means to notice or detect, not just see with the eyes.

Job repeats the same idea a second way for emphasis.

Even paying close attention, Job cannot track what God is doing.

That repetition itself is a form of poetry called parallelism.

🔁 Repeats the same idea for emphasis

🕵️ Perceive means notice, not just see

📜 This repetition is called parallelism

📖 Job cannot track God's actions

## ✋ Behold, He Taketh Away, Who Can Hinder Him

"Hinder" means to stop or block someone.

Job is describing loss, likely thinking of his own losses in chapters one and two.

The question has only one honest answer. No one.

Nothing Job has said so far disputes God's right to do this.

✋ Hinder means to stop or block

💔 Job likely means his own losses

❓ The answer is clearly no one

📖 No one can block what God takes

## ❓ Who Will Say Unto Him, What Doest Thou

This question pictures anyone demanding an explanation from God.

Job already knows nobody holds that kind of authority.

The question is not really asking for information.

It is proving a point about how small human power really is.

❓ Pictures demanding an explanation from God

🚫 Nobody holds that kind of authority

🎯 The question proves a point

📖 Human power is genuinely small here

## 💪 The Proud Helpers Do Stoop Under Him

"Proud helpers" likely means powerful allies or forces opposing God.

"Stoop" means to bow down or collapse under pressure.

Even the strongest forces bend when God's anger does not let up.

If proud helpers cannot stand against God, an ordinary man certainly cannot.

💪 Proud helpers means powerful allies

🙇 Stoop means bowing under pressure

🌀 Even strong forces bend to God

📖 If they cannot stand, no one can

# Job 9:14-20
# 🗣️ Job Cannot Answer God
---
## 🔄 How Much Less Shall I Answer Him

Job now applies the whole argument directly to himself.

If mountains and stars obey God without question, how could Job argue back?

This line marks the turn from God's power to Job's own smallness.

🔄 Job turns the argument on himself

⛰️ If mountains obey, how could Job argue

📉 Marks a shift toward his own smallness

📖 Power described earlier now feels personal

## 🏛️ Choose Out My Words To Reason With Him

"Reason" here means to argue a case logically, like in a courtroom.

Job pictures carefully selecting the perfect words for his defense.

He admits in advance that no wording would be good enough.

Even his best possible argument would still fail before God.

🏛️ Reason means arguing a legal case

✍️ Job imagines choosing perfect words

🚫 He admits no wording would work

📖 Even his best defense would fail

## ⚖️ Though I Were Righteous, Yet Would I Not Answer

This is a striking claim. Even fully innocent, Job still would not argue back.

The size of the gap between God and Job makes innocence beside the point.

Being right is not the same as being able to argue with God.

⚖️ Even innocence would not help here

📏 The gap with God is too large

🙊 Being right is not being able to argue

📖 Innocence and standing are different things

## 🙏 I Would Make Supplication To My Judge

"Supplication" means a humble request for mercy, not a legal defense.

Job says he would beg rather than argue his case.

That word choice reveals what Job actually believes about his position.

He does not expect to win. He hopes to be shown mercy instead.

🙏 Supplication means a humble request

🚫 Not the same as a legal defense

💭 Reveals what Job expects from God

📖 Job hopes for mercy, not a win

## 💭 If I Had Called, And He Had Answered Me

Job imagines a hypothetical conversation with God.

Even picturing God answering him, Job doubts he could trust it.

This shows how deep Job's sense of distance from God has grown.

His pain is shaking his confidence in being heard, not just his circumstances.

💭 Job imagines a hypothetical conversation

😔 He doubts he could trust the answer

📏 Shows how deep his distance feels

📖 Pain has shaken his confidence too

## 👂 Yet Would I Not Believe That He Had Hearkened Unto My Voice

"Hearkened" is an old word meaning to truly listen, not just hear sound.

Job questions whether God is even paying attention to him personally.

This is raw, honest doubt spoken directly toward God.

The book of Job never punishes Job for saying this out loud.

👂 Hearkened means truly listening

❓ Job doubts God is paying attention

😰 This is raw, honest doubt

📖 The book never punishes him for saying it

## 🌪️ He Breaketh Me With A Tempest

"Tempest" means a violent storm.

Job describes his suffering using the same storm imagery from the whirlwind in chapter one.

He feels like he is still caught inside that same storm.

🌪️ Tempest means a violent storm

📖 Echoes the storm from chapter one

😖 Job feels still caught inside it

➡️ His pain has not really ended

## ❓ Multiplieth My Wounds Without Cause

"Without cause" is a bold claim. Job says his suffering has no clear reason.

This does not match what the reader already knows from chapters one and two.

Job simply does not have access to that information.

His confusion is honest, not defiant.

❓ Without cause means no clear reason

👁️ The reader knows more than Job does

🙅 Job lacks that hidden information

📖 His confusion is honest, not rebellious

## 😮‍💨 He Will Not Suffer Me To Take My Breath

This pictures suffering so constant that Job cannot even catch a break.

"Suffer" here is an old word meaning to allow or permit.

Job feels like there is no pause button on his pain.

😮‍💨 Pictures suffering with no pause

✅ Suffer here means allow or permit

⏸️ Job has no break from the pain

📖 Constant pain wears down more than the body

## 😣 Filleth Me With Bitterness

"Bitterness" here means overwhelming inner grief, not a taste.

Job says pain has filled every part of him, not just his circumstances.

The line completes the picture of suffering with no room left to breathe.

😣 Bitterness means overwhelming inner grief

💧 Fills every part of him

🫁 Connects to breath in the same verse

📖 No space is left untouched by pain

## 🏛️ Who Shall Set Me A Time To Plead

"Plead" means to present a formal legal case.

Job asks who could even schedule a fair hearing between him and God.

Strength and legal standing both fail him in the same verse.

No earthly court has jurisdiction over this kind of case.

🏛️ Plead means presenting a legal case

📅 Job asks who could schedule a hearing

💪 Strength and standing both fail here

📖 No earthly court has this authority

## ⚖️ If I Justify Myself, Mine Own Mouth Shall Condemn Me

"Justify" means to argue that he is innocent.

Job believes that even trying to defend himself would somehow prove him guilty.

This is not really about Job hiding any secret sin.

It shows how powerless he feels in front of God's judgment, guilty or not.

⚖️ Justify means arguing his innocence

🔄 Defending himself would seem to prove guilt

🙅 Not about a hidden secret sin

📖 Job feels powerless either way

## 🌀 If I Say, I Am Perfect, It Shall Also Prove Me Perverse

"Perverse" means twisted or corrupt, the opposite of innocent.

Job says even claiming perfection would somehow be used as proof against him.

This finishes the trap described in the first half of the verse.

Being right and being able to prove it are not the same thing here.

🌀 Perverse means twisted or corrupt

🪤 Even a true claim becomes proof against him

🔄 Finishes the trap from the verse's first half

📖 Being right is not proving it

# Job 9:21-24
# 💔 Job's Hardest Complaint
---
## 🪞 Though I Were Perfect, Yet Would I Not Know My Soul

Job repeats "though I were perfect" from verse fifteen's "righteous."

"Know my soul" here means to have any real sense of self left.

Job says even innocence would not restore his sense of who he is.

His suffering has stripped away more than health and family.

🔁 Repeats the earlier righteous claim

🪞 Know my soul means sense of self

💔 Even innocence would not restore that

📖 Suffering stripped away more than possessions

## 💔 I Would Despise My Life

This is one of the most painful lines Job speaks in the whole book.

"Despise" means to hate or reject completely.

Job is not making a plan to end his life here.

He is expressing the depth of his exhaustion and grief out loud.

💔 One of Job's most painful lines

🚫 Despise means to hate completely

🙅 Not a plan to end his life

📖 It is grief spoken honestly, out loud

## ⚖️ He Destroyeth The Perfect And The Wicked

This is the accusation at the center of Job's whole complaint.

Job says God treats innocent people and guilty people the same.

That claim directly challenges Bildad's argument from the previous chapter.

Bildad said suffering always proves guilt. Job says the evidence does not fit.

⚖️ Job's central accusation against God

🟰 Innocent and guilty treated the same

🔄 Directly challenges Bildad's argument

📖 The evidence does not match Bildad's claim

## ⚡ If The Scourge Slay Suddenly, He Will Laugh At The Trial Of The Innocent

"Scourge" pictures a sudden disaster, like a plague or a whip of judgment.

Job uses shockingly strong language, accusing God of laughing at innocent suffering.

This is Job at his angriest and most honest in the whole speech.

The book later shows God answering Job directly, but not punishing this outburst.

⚡ Scourge pictures sudden disaster

😠 Job accuses God of laughing at pain

🔥 This is Job at his angriest

📖 God later answers Job without punishing this

## 🌍 The Earth Is Given Into The Hand Of The Wicked

Job looks around at the world and sees wicked people in control.

This was a real ancient complaint, not just Job's private feeling.

Wisdom writers across the Bible wrestle with why evil people often succeed.

🌍 Job sees wicked people in control

👥 A common ancient complaint

📚 Other wisdom writers ask this too

📖 Why the wicked prosper is a real question

## 🙈 He Covereth The Faces Of The Judges Thereof

"Covereth the faces" is an old idiom for blinding or corrupting judgment.

Job means that even the people meant to enforce justice cannot see clearly.

If not God doing this, Job asks, then who.

The verse ends without an answer, on purpose.

🙈 Covereth the faces means blinded judgment

⚖️ Even judges cannot see clearly

❓ Job asks who else it could be

📖 The question is left open on purpose

# Job 9:25-31
# ⏳ Days That Slip Away
---
## 🏃 My Days Are Swifter Than A Post

A "post" here does not mean a wooden pole.

It means a running messenger who carried news quickly across long distances.

Job compares his remaining days to that fast courier, gone before he notices.

🏃 Post means a fast running messenger

⏳ Job's days move at that same speed

😔 Life is passing before he notices

📖 Time feels like it is escaping him

## 🔁 They Flee Away, They See No Good

Job repeats the idea of fleeing time using two short phrases in a row.

This kind of doubling is common in Hebrew poetry for emphasis.

"See no good" means his days pass without bringing relief or happiness.

🔁 Repeats the fleeing idea twice

📜 Common doubling pattern in Hebrew poetry

😞 See no good means no relief

📖 Every passing day feels empty

## ⛵ They Are Passed Away As The Swift Ships

Ancient ships without engines moved only as fast as the wind allowed.

"Swift ships" pictures the fastest kind, catching full wind and racing forward.

Even that image of speed cannot fully capture how Job feels.

⛵ Swift ships means the fastest sailing vessels

💨 They moved only as fast as the wind

😖 Even that speed cannot capture Job's feeling

📖 Time outruns every comparison Job can find

## 🦅 As The Eagle That Hasteth To The Prey

An eagle diving toward prey moves faster than almost anything visible in nature.

Job stacks a third image of speed onto the first two, on purpose.

Three images in a row build a feeling words alone could not carry.

🦅 Pictures an eagle diving toward prey

⚡ One of the fastest things visible in nature

🔢 The third speed image in a row

📖 Repetition builds a feeling words cannot alone

## 🤔 If I Say, I Will Forget My Complaint

Job considers trying to simply stop thinking about his pain.

"Complaint" here means his formal case or grievance, not just griping.

He imagines choosing to let it go and move on.

🤔 Job considers letting go of his case

📜 Complaint means a formal grievance

🚶 He imagines simply moving on

📖 This is a real option he weighs

## ⚖️ I Will Leave Off My Heaviness, And Comfort Myself

"Heaviness" pictures grief as a literal weight pressing down.

Job imagines trying to set that weight down and comfort himself instead.

The next verse shows why that plan does not actually work for him.

⚖️ Heaviness pictures grief as a weight

😔 Job imagines setting it down

🚫 The next verse undoes this plan

📖 Trying to self comfort is not enough

## 😨 I Am Afraid Of All My Sorrows

Job admits his fear returns no matter how he tries to reason past it.

"Sorrows" here means all his pains stacked together, not one single problem.

Trying to think his way to peace has not actually worked.

😨 Fear returns despite his reasoning

📚 Sorrows means every pain stacked together

🧠 Thinking alone cannot fix this

📖 Job is honest that the plan failed

## 🚫 I Know That Thou Wilt Not Hold Me Innocent

Job states his real fear plainly here.

He believes God has already decided against him, whatever the truth actually is.

This belief is what makes comfort feel impossible for him right now.

⚖️ States Job's real fear plainly

🚫 He believes the verdict is already set

😔 This belief blocks any real comfort

📖 Fear of judgment overrides every plan to relax

## ❓ If I Be Wicked, Why Then Labour I In Vain

Job voices a troubling thought experiment here.

If he really were guilty, at least his suffering would make sense.

Instead his labor to prove himself feels pointless either way.

This shows Job trapped no matter which way the argument goes.

🤔 A troubling thought experiment

❓ Even guilt would make more sense than this

😞 His effort feels pointless either way

📖 Job feels trapped no matter the outcome

## ❄️ If I Wash Myself With Snow Water, And Make My Hands Never So Clean

"Snow water" pictures the purest, cleanest water Job can imagine.

Washing hands was an ancient symbol of moral innocence, not just hygiene.

Job pictures using the cleanest possible method to prove himself innocent.

❄️ Snow water pictures the purest water

🙌 Washing hands symbolized moral innocence

🧼 Job imagines the cleanest possible proof

📖 Even the best effort will not be enough

## 🕳️ Yet Shalt Thou Plunge Me In The Ditch

Despite the cleanest possible washing, Job pictures God still throwing him into filth.

"Ditch" pictures a muddy pit, the opposite of clean.

"Mine own clothes shall abhor me" means even his own garments would reject him.

No human effort could change how this feels to him.

🕳️ Ditch pictures a muddy, filthy pit

👕 Even his own clothes would reject him

🚫 The image completely reverses the washing

📖 No human effort feels like enough here

# Job 9:32-35
# 🤝 No Mediator Between Them
---
## ⚖️ For He Is Not A Man, As I Am

Job states plainly why an equal courtroom fight is impossible.

God and Job do not stand on the same level to begin with.

A fair legal case requires two parties of comparable standing.

⚖️ States the core problem plainly

📏 God and Job are not equal parties

🏛️ Fair trials need comparable standing

📖 That basic requirement cannot be met here

## 🏛️ That I Should Answer Him, And We Should Come Together In Judgment

"Come together in judgment" pictures both parties meeting as equals before a court.

Job says that meeting could never actually happen the normal way.

The size gap between them makes the whole legal picture break down.

🏛️ Pictures both sides meeting as equals

🚫 That meeting cannot really happen

📏 The size gap breaks the picture

📖 Normal justice needs two comparable sides

## 🤝 Neither Is There Any Daysman Betwixt Us

A "daysman" is an old word for a mediator, someone who stands between two sides.

"Betwixt" is an old word simply meaning between.

Job says no third party exists to judge between him and God.

This is one of the most important lines in the whole book.

🤝 Daysman means a mediator

↔️ Betwixt is an old word for between

🚫 No one exists to stand between them

📖 One of the most important lines in Job

## 🤲 That Might Lay His Hand Upon Us Both

"Lay his hand upon us both" pictures a mediator touching both sides at once.

That gesture symbolized fairness, treating both parties the same way.

Job is picturing exactly what he needs and admitting it does not exist.

🤲 Pictures touching both sides at once

⚖️ The gesture symbolized fairness

❌ Job admits this does not exist

📖 He names exactly what is missing

## 🪄 Let Him Take His Rod Away From Me

"Rod" pictures punishment or discipline, like a shepherd's staff used to correct.

Job asks for a pause, not a full pardon.

He wants space to speak honestly without fear hanging over every word.

🪄 Rod pictures punishment or discipline

⏸️ Job asks for a pause, not a pardon

🗣️ He wants room to speak honestly

📖 Fear was blocking honest conversation

## 😱 Let Not His Fear Terrify Me

Job repeats the request a second way, matching Hebrew parallelism.

"Terrify" means overwhelming fear, not just simple nervousness.

Job wants the fear removed as much as the punishment itself.

🔁 Repeats the request a second way

📜 Matches the pattern of Hebrew parallelism

😱 Terrify means overwhelming fear

📖 Job wants the fear gone too

## 🗣️ Then Would I Speak, And Not Fear Him: But It Is Not So With Me

Job admits directly that fear controls him right now.

He believes he could speak boldly if that fear were removed.

The chapter ends without that relief actually arriving.

This honest admission of fear becomes part of what later chapters build on.

😨 Job admits fear controls him now

🗣️ He believes he could speak boldly

🚫 No relief arrives by chapter's end

📖 This honesty sets up what comes next
`.trim();

export const JOB_NINE_PERSONAL_SECTIONS = parseJobNineRawNotes(JOB_NINE_RAW_NOTES);
