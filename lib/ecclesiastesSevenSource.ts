export type EcclesiastesSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesSevenRawNotes(rawText: string): EcclesiastesSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 7:${startVerse}` : `Ecclesiastes 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Ecclesiastes 7 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_SEVEN_RAW_NOTES = `# Ecclesiastes 7:1-4
# 😌 A Good Name And A Better Ending
---
## A Good Name Is Better Than Precious Ointment

"Ointment" means an expensive perfume used to honor a guest or prepare a body for burial.

A good name is the reputation someone builds through a lifetime of choices.

That perfume cost a fortune, yet its scent faded within a single day.

A good reputation can keep its value long after the person is gone.

The Preacher is weighing something that fades fast against something that lasts.

A name is the one fragrance that never wears off.

🌸 Ointment means costly ancient perfume
🕰️ Perfume's scent faded within a day
🏆 A good name outlasts the person
📖 A name is the fragrance that never fades

## And The Day Of Death Than The Day Of One's Birth

This does not mean death is more enjoyable than being born.

A birth day is full of hope, but nothing about that life is settled yet.

A death day reveals what a person actually became over their whole life.

Ancient funeral customs often included a public accounting of what someone had done.

The Preacher values a finished story over the empty promise of a new one.

A life can only be honestly judged once it is complete.

👶 Birth is full of hope, nothing proven
⚰️ Death reveals what a life became
📜 Funerals often reviewed a life's deeds
📖 A life is judged once finished

## To Go To The House Of Mourning Than To Go To The House Of Feasting

"House of mourning" means the home of a family grieving a recent death.

Visiting grieving families was a serious social duty in the ancient world.

"House of feasting" means a home celebrating something joyful, like a wedding.

A funeral confronts a guest with the plain truth that life ends.

A party only distracts a guest from that same truth.

Facing mortality honestly teaches more than any celebration.

🏚️ House of mourning means a grieving home
🎉 House of feasting means a celebration
👀 Funerals confront guests with mortality
📖 Facing death teaches more than a party

## The Living Will Lay It To His Heart

"That" refers to death, the end every human being eventually reaches.

No wealth, wisdom, or fame changes that ending for anyone.

"Lay it to his heart" is an old idiom meaning to take something seriously.

It pictures pressing a lesson deep inside yourself instead of forgetting it.

The Preacher wants the reminder of death to actually change how someone lives.

A truth only helps once someone lets it sink in.

⚰️ That refers to death, everyone's ending
💰 No wealth changes that ending
❤️ Lay to heart means take seriously
📖 A truth helps once it sinks in

## By The Sadness Of The Countenance The Heart Is Made Better

"Countenance" means a person's face and the expression it shows.

Sadness on the face often reflects real reflection happening underneath it.

The Preacher is not praising sadness for its own sake.

He means grief can quietly shape a person into someone wiser.

Laughter can entertain, but it rarely changes anyone for the better.

A little grief can do more good than a lot of laughing.

😔 Countenance means a person's face
🤔 Sad faces often reflect real thought
😂 Laughter entertains but rarely changes anyone
📖 Grief can shape a person for good

## The Heart Of The Wise Is In The House Of Mourning

"Heart" here means where a person's attention and priorities actually live.

The wise keep death and life's limits in view, even on ordinary days.

That awareness is not depressing, it is realistic.

Staying aware of life's shortness shapes wiser daily choices.

Wisdom keeps one eye on the ending.

🧠 Heart means where attention lives
⏳ The wise stay aware of life's limits
✅ That awareness is realistic, not gloomy
📖 Wisdom keeps one eye on the end

## But The Heart Of Fools Is In The House Of Mirth

"Mirth" means shallow, distracting fun, not deep joy.

Fools chase constant entertainment to avoid thinking about anything serious.

That avoidance feels good for a moment but teaches nothing.

The contrast with the first half of this verse is deliberate and sharp.

Running from hard truths never actually makes them disappear.

🎪 Mirth means shallow distracting fun
🙈 Fools avoid thinking about serious things
⏱️ Avoidance feels good but teaches nothing
📖 Hard truths do not disappear that way

# Ecclesiastes 7:5-7
# 🔥 The Laughter Of The Fool
---
## It Is Better To Hear The Rebuke Of The Wise

"Rebuke" means direct correction, telling someone plainly what they got wrong.

Hearing correction stings, but it can actually improve a person.

The Preacher values what is useful over what is merely pleasant.

Wisdom often arrives wrapped in something uncomfortable to hear.

A hard truth is worth more than an easy compliment.

📢 Rebuke means direct correction
😖 Correction stings but can improve someone
🎁 Wisdom often arrives uncomfortably
📖 A hard truth beats an easy compliment

## Than For A Man To Hear The Song Of Fools

"The song of fools" pictures empty entertainment with nothing to teach.

Flattering songs feel good in the moment but leave a person unchanged.

This kind of noise is pleasant company for no real gain.

The Preacher sets it directly against the sting of honest correction.

Pleasant noise and real growth are not the same thing.

🎵 Song of fools means empty entertainment
😊 It feels good but changes nothing
⚖️ It is set against honest correction
📖 Pleasant noise is not the same as growth

## As The Crackling Of Thorns Under A Pot

Dry thorns thrown under a cooking pot burn fast and loud.

They make a lot of noise but produce very little real heat.

A fool's laughter is loud the same way, all noise and no substance.

The picture is meant to be heard, not just imagined.

Loud does not mean valuable.

🔥 Thorns burn loud but weak
😆 Fool's laughter is loud, not useful
👂 The picture is meant to be heard
📖 Loud is not the same as valuable

## So Is The Laughter Of The Fool, This Also Is Vanity

The Preacher names his conclusion plainly right after the picture of thorns.

"Vanity" is his repeated word for something empty and pointless.

Foolish laughter burns bright for a moment and leaves nothing behind.

That emptiness is the whole point of the thorn comparison.

Noise without weight always ends the same way.

💨 Vanity means something empty and pointless
🔥 Foolish laughter burns bright then fades
🪶 It leaves nothing lasting behind
📖 Noise without weight always ends the same

## Surely Oppression Maketh A Wise Man Mad

"Oppression" means being treated unjustly or crushed by someone with power.

Even a genuinely wise person can be pushed past their limits by real cruelty.

"Mad" here means clear thinking gets distorted under enough pressure.

Wisdom protects a person, but it does not make them immune to injustice.

No one is too wise to be broken by real oppression.

⚖️ Oppression means unjust, crushing treatment
🧠 Mad means clear thinking gets distorted
🛡️ Wisdom does not make anyone immune
📖 Real oppression can break even the wise

## And A Gift Destroyeth The Heart

"Gift" here does not mean a kind, innocent present.

It means a bribe, something given in secret to influence a decision.

Bribes quietly reshape how a person judges right and wrong.

Over time, that corruption reaches the heart, not just the decision.

Even a small bribe can bend a person's whole character.

🎁 Gift here means a bribe
🕵️ Bribes influence decisions in secret
⚖️ It corrupts judgment over time
📖 A small bribe can bend character

# Ecclesiastes 7:8-10
# ⏳ Patience Over Pride
---
## Better Is The End Of A Thing Than The Beginning Thereof

Beginnings are full of excitement and untested promises.

Endings show whether all that promise actually held up.

The Preacher trusts a finished result over a hopeful start.

This echoes his same point from verse one about a name and a birth.

Judge a thing by how it finishes, not how it starts.

🚀 Beginnings carry untested promises
🏁 Endings show what actually held up
🔁 This echoes the point from verse one
📖 Judge a thing by its finish

## And The Patient In Spirit Is Better Than The Proud In Spirit

"Patient in spirit" describes someone willing to wait calmly for an outcome.

"Proud in spirit" describes someone who demands results now, on their own terms.

Patience can absorb setbacks that pride cannot handle.

A proud spirit often breaks under the very delay a patient one survives.

Waiting well is its own kind of strength.

🧘 Patient in spirit means calm waiting
😤 Proud in spirit demands results now
💪 Patience survives what pride cannot
📖 Waiting well is its own strength

## Be Not Hasty In Thy Spirit To Be Angry

"Hasty in thy spirit" means reacting to anger before thinking it through.

Anger itself is not the problem this verse targets.

The warning is against the speed of the reaction, not the feeling.

A slower response leaves room for real thought.

A wise person feels anger without rushing into it.

⚡ Hasty in thy spirit means reacting fast
😠 Anger itself is not the target here
🐢 The warning is about speed, not feeling
📖 Wisdom leaves room for real thought

## For Anger Resteth In The Bosom Of Fools

"Resteth in the bosom" is an old picture of something settling in close to the chest.

Anger that lingers has found a permanent home instead of passing through.

Letting anger move in and stay is what marks a fool.

A wise person feels anger but does not let it live there.

Anger can visit, but a fool lets it move in.

🏠 Resteth in the bosom means settling in
⏳ Anger that lingers has found a home
🧠 Letting it stay is what marks a fool
📖 A fool lets anger move in

## Say Not Thou, What Is The Cause That The Former Days Were Better

This warns against a common complaint about the good old days.

Nostalgia quietly edits out the hard parts of the past.

It also blinds a person to whatever good exists right now.

The Preacher treats this question as a trap, not an honest inquiry.

Comparing today to an imagined past rarely leads anywhere useful.

🕰️ This warns against golden age nostalgia
✂️ Nostalgia edits out the past's hard parts
🙈 It blinds people to today's good
📖 That comparison rarely leads anywhere useful

## For Thou Dost Not Enquire Wisely Concerning This

"Enquire wisely" means asking a question for the right reasons, with real thought behind it.

Asking why the past was better is usually driven by discontent.

A wise question actually wants to learn something true.

This kind of question just wants permission to complain.

Not every question deserves to be asked.

❓ Enquire wisely means asking with real thought
😒 That question is usually driven by discontent
🎯 A wise question wants real truth
📖 Not every question deserves asking

# Ecclesiastes 7:11-12
# 🛡️ Wisdom As A Defence
---
## Wisdom Is Good With An Inheritance

An "inheritance" is money or property passed down within a family.

Wisdom and inherited wealth work well paired together.

Money without wisdom can be wasted quickly by whoever receives it.

The Preacher is not against wealth, only wealth without wisdom to guide it.

Wisdom is what makes an inheritance actually last.

💰 Inheritance means family wealth passed down
🤝 Wisdom pairs well with wealth
🕳️ Money without wisdom gets wasted
📖 Wisdom makes an inheritance last

## And By It There Is Profit To Them That See The Sun

"Them that see the sun" is the Preacher's repeated phrase for the living.

He uses it throughout this book instead of simply saying "people."

Wisdom's profit is not stored up for the next life, it works right now.

That benefit belongs to anyone still walking around under the sun.

Wisdom pays off in this life, not only some future one.

☀️ See the sun means the living
🔁 The Preacher repeats this phrase often
💵 Wisdom's profit works right now
📖 Wisdom pays off in this life

## For Wisdom Is A Defence, And Money Is A Defence

"Defence" here means a shelter, something that protects a person from harm.

Both money and wisdom can shield someone from real trouble.

A full wallet and a full mind can each keep danger away.

The Preacher puts these two very different things side by side on purpose.

Protection can come in more than one form.

🛡️ Defence means protection or shelter
💵 Money can shield from real trouble
🧠 Wisdom can shield from real trouble
📖 Protection has more than one form

## But The Excellency Of Knowledge Is, That Wisdom Giveth Life To Them That Have It

"Excellency" means the one advantage that sets wisdom apart from money.

Money can protect a person's property and comfort.

Wisdom can protect the very life and choices of the person who holds it.

That kind of protection reaches further than anything money alone can buy.

Money guards what you have, wisdom guards who you are.

⭐ Excellency means wisdom's unique advantage
💵 Money protects property and comfort
❤️ Wisdom protects life and choices
📖 Wisdom guards who you are

# Ecclesiastes 7:13-14
# 🌗 Prosperity And Adversity
---
## Consider The Work Of God For Who Can Make That Straight, Which He Hath Made Crooked

"The work of God" means the way He has shaped the world and a person's circumstances.

"Crooked" pictures something bent, uneven, or not going the way someone planned.

No human effort can force a straight outcome onto a situation God has bent.

This is not an excuse to stop trying, it is a call to stop fighting reality.

Some circumstances are meant to be accepted, not corrected.

🧩 God shapes the world and circumstances
➰ Crooked means bent or uneven
🚫 No human effort straightens what God bends
📖 Some circumstances are meant to be accepted

## In The Day Of Prosperity Be Joyful, But In The Day Of Adversity Consider

"Prosperity" means a season when life is going well.

"Adversity" means a season of hardship or real difficulty.

Good seasons call for enjoying what is actually there.

Hard seasons call for careful reflection instead of easy answers.

Different seasons call for different responses, and both are wise.

☀️ Prosperity means a season going well
🌧️ Adversity means a season of hardship
😊 Good seasons call for real joy
📖 Different seasons call for different responses

## God Also Hath Set The One Over Against The Other

God deliberately mixes good seasons and hard seasons throughout a person's life.

"The one over against the other" means He places them side by side on purpose.

That mixture keeps anyone from predicting exactly what comes next.

The mixing itself is presented as something intentional, not random chance.

Uncertainty about the future is part of God's own design.

🔀 God mixes good and hard seasons on purpose
🎯 This keeps outcomes from being predictable
🎲 The mixing is intentional, not random
📖 Uncertainty is part of God's design

## To The End That Man Should Find Nothing After Him

"Find nothing after him" means no one can map out their own future with certainty.

A person cannot calculate ahead of time which season is coming next.

That blind spot is built into life on purpose, not an accident.

It keeps a person humble instead of falsely confident about tomorrow.

Not knowing what comes next keeps a person leaning on God.

🔮 No one can map their own future
📐 The blind spot is built in on purpose
🙇 It keeps a person humble
📖 Not knowing keeps a person leaning on God

# Ecclesiastes 7:15-18
# ⚖️ Neither Overmuch Righteous Nor Overmuch Wicked
---
## All Things Have I Seen In The Days Of My Vanity

"My vanity" refers to the Preacher's own limited, fleeting lifetime.

He is not claiming to have witnessed literally everything that ever happened.

He means he has observed a very wide range of human experience firsthand.

What follows is a personal report, not secondhand theory.

This next hard observation comes from something he actually watched happen.

👤 My vanity means his own fleeting life
👀 He reports wide personal experience
📋 What follows is firsthand, not theory
📖 He actually watched this happen

## There Is A Just Man That Perisheth In His Righteousness

"Perisheth" means dies, often before what seems like a fair or expected time.

This observation does not match the neat idea that good behavior always gets rewarded.

The Preacher names this troubling pattern honestly instead of pretending it never happens.

He is describing real life as he has actually seen it.

Life does not always sort people the way we expect.

⚰️ Perisheth means dying, often too soon
😕 Good behavior is not always rewarded
👁️ He describes real life as he saw it
📖 Life does not sort people as expected

## And There Is A Wicked Man That Prolongeth His Life In His Wickedness

"Prolongeth his life" means living a long time despite doing real wrong.

This is the other half of the same troubling pattern from the line before.

Wrongdoing does not always shorten a life the way people assume it will.

The Preacher lets both halves of this hard truth stand side by side.

Neither outcome fits the tidy story people like to tell themselves.

🕰️ Prolongeth his life means living long
😣 Wrongdoing does not always shorten a life
🔗 Both halves of the pattern stand together
📖 Neither outcome fits a tidy story

## Be Not Righteous Over Much, Neither Make Thyself Over Wise

This does not mean a person can be too good or too honest.

It warns against a rigid, self righteous perfectionism that judges everyone harshly.

"Over wise" pictures someone so sure of their own understanding that they trust nothing else.

That kind of pride can isolate a person and wear them down.

Even good qualities can turn destructive when pushed to an extreme.

🙅 This is not a warning against real goodness
📏 It warns against rigid self righteousness
🧠 Over wise means trusting only yourself
📖 Good qualities can turn destructive in excess

## Why Shouldest Thou Destroy Thyself

This is a real, pointed question, not just a rhetorical flourish.

Rigid perfectionism can genuinely wear a person down to breaking.

Judging every failure harshly eventually turns that same judgment inward.

The Preacher wants the reader to feel the real cost of this extreme.

Self destruction can come from excess virtue, not only from excess sin.

❓ This is a real, pointed question
💥 Perfectionism can wear a person down
🪞 Harsh judgment eventually turns inward
📖 Self destruction can come from excess virtue

## Be Not Over Much Wicked, Neither Be Thou Foolish

This is not permission to sin a moderate, acceptable amount.

It warns that reckless wickedness carries real, physical consequences.

Foolish choices can shorten a life through danger, sickness, or violence.

The Preacher pairs this warning directly with the one about excess righteousness.

Both extremes, not just wickedness, can lead to real ruin.

🚫 This is not permission to sin some
⚠️ Reckless wickedness has real consequences
💀 Foolish choices can shorten a life
📖 Both extremes can lead to real ruin

## Why Shouldest Thou Die Before Thy Time

This question makes the danger of reckless living completely concrete.

An early death is a real, physical outcome, not just a scare tactic.

Sin carries consequences that reach beyond a person's own conscience.

The Preacher wants that real cost taken seriously, not brushed aside.

Wickedness can end a life years before it needed to end.

⏱️ This question names a concrete danger
💀 Early death is a real outcome
🌍 Sin's consequences reach beyond conscience
📖 Wickedness can end a life too soon

## It Is Good That Thou Shouldest Take Hold Of This

"Take hold" pictures gripping something tightly with both hands.

The Preacher is telling the reader to hold onto this warning firmly.

Avoiding wickedness needs to be a deliberate, active grip, not a passive hope.

A loose grip on wisdom slips away under real pressure.

Wisdom has to be held onto, not just admired from a distance.

✋ Take hold pictures gripping tightly
💪 The warning needs an active grip
🎈 A loose grip slips away under pressure
📖 Wisdom must be held, not just admired

## Yea, Also From This Withdraw Not Thine Hand

"Withdraw not thine hand" repeats the same gripping picture from the line before.

The Preacher is telling the reader to hold onto both warnings at once.

Avoiding wickedness alone is not enough without also avoiding rigid perfectionism.

Balance here means grabbing the whole truth, not picking the easier half.

Wisdom holds both warnings together instead of choosing a favorite.

🤝 This repeats the same gripping picture
⚖️ Both warnings must be held at once
🧩 One warning alone is not enough
📖 Wisdom holds the whole truth

## For He That Feareth God Shall Come Forth Of Them All

"Feareth God" means living with deep respect and awe for who God is.

That reverence is the anchor point between both dangerous extremes named above.

"Come forth of them all" means escaping both traps at once.

Fearing God is not one more rule stacked on top of the others.

It is the center that keeps a person from sliding into either extreme.

🙏 Feareth God means deep reverence for Him
⚓ That reverence anchors between both extremes
🚪 Come forth means escaping both traps
📖 Fearing God is the center, not another rule

# Ecclesiastes 7:19-22
# 🏙️ Wisdom Stronger Than Ten Mighty Men
---
## Wisdom Strengtheneth The Wise More Than Ten Mighty Men Which Are In The City

Ancient cities depended on strong, armed defenders to keep them safe.

"Ten mighty men" pictures a small but serious military force guarding the walls.

The Preacher claims wisdom protects a person even more effectively than that force.

This is about wisdom's power to prevent trouble before it starts.

The best defense is often avoiding the danger, not surviving it.

🏙️ Ancient cities relied on armed defenders
⚔️ Ten mighty men pictures a small force
🧠 Wisdom protects even better than that
📖 The best defense avoids danger early

## For There Is Not A Just Man Upon Earth, That Doeth Good, And Sinneth Not

"Just man" means someone who consistently does what is right.

This verse states plainly that no such flawless person actually exists.

Even the most careful, godly person still fails at some point.

This truth should soften how quickly a person judges someone else's failures.

Total moral perfection is not available to anyone on earth.

⚖️ Just man means someone consistently right
🚫 No flawless person actually exists
🪞 Even godly people still fail
📖 Total perfection is not available to anyone

## Also Take No Heed Unto All Words That Are Spoken

"Take no heed" means deliberately choosing not to listen closely.

Chasing down every word said about you invites needless pain.

Some knowledge only hurts a person without helping them at all.

The Preacher is recommending a kind of selective deafness on purpose.

Peace sometimes means choosing not to listen.

🙉 Take no heed means choosing not to listen
💔 Chasing every word invites needless pain
🚧 Some knowledge only hurts, never helps
📖 Peace sometimes means not listening

## Lest Thou Hear Thy Servant Curse Thee

In this culture, a household servant might be overheard complaining about their master.

Listening for that kind of complaint only invites hurt feelings.

A master had power over the servant, yet the words could still sting.

The warning applies to anyone in any position of authority today.

Some words are better left unheard, even when they are true.

🗣️ A servant might complain unheard
👂 Listening for it only invites hurt
👑 Even those in authority can be stung
📖 Some words are better left unheard

## For Oftentimes Also Thine Own Heart Knoweth That Thou Thyself Likewise Hast Cursed Others

This verse turns the warning back onto the reader directly.

Everyone has spoken carelessly or unfairly about someone else at some point.

That private memory is proof enough of everyone's own hypocrisy on this point.

The Preacher uses honest self reflection instead of pure moral instruction.

Remembering your own words should soften how you judge someone else's.

🔄 The warning turns back onto the reader
🗯️ Everyone has spoken unfairly at some point
🪞 That memory proves everyone's hypocrisy here
📖 Your own words should soften your judgment

# Ecclesiastes 7:23-26
# 🔍 Searching Out Wisdom And Wickedness
---
## All This Have I Proved By Wisdom

"Proved" means tested through real, personal effort, not just studied in theory.

The Preacher is describing years of lived experience, not a quick opinion.

He put wisdom to the test in his own choices and circumstances.

What comes next is the honest result of that lifelong test.

This admission carries weight because of how it was earned.

🧪 Proved means tested through real effort
📆 This describes years of lived experience
🔬 Wisdom was tested in real choices
📖 The result was honestly earned

## I Said, I Will Be Wise, But It Was Far From Me

The Preacher set out determined to master wisdom completely.

Despite every resource and effort available to him, full wisdom still slipped away.

This admission is striking coming from someone remembered as remarkably wise.

Even the wisest person alive cannot fully grasp wisdom itself.

Wanting wisdom badly enough does not guarantee catching all of it.

🎯 He set out to master wisdom fully
🙌 Full wisdom still slipped away from him
👑 This is striking from someone this wise
📖 No one fully grasps wisdom itself

## That Which Is Far Off, And Exceeding Deep, Who Can Find It Out

"Far off" and "exceeding deep" both describe something beyond normal human reach.

This is a rhetorical question that expects the answer "no one."

Some truths about life and God simply exceed human ability to search out fully.

Admitting that limit is honest, not a failure of faith.

Some mysteries stay mysteries, even for the wisest searcher.

🌊 Far off and deep mean beyond reach
❓ This question expects the answer no one
🧠 Some truths exceed human ability
📖 Some mysteries stay mysteries for everyone

## I Applied Mine Heart To Know, And To Search, And To Seek Out Wisdom

"Applied mine heart" means giving something focused, determined attention.

The Preacher lists several separate actions here, knowing, searching, and seeking.

That stacked list shows just how deliberate and thorough this search really was.

He was not casually curious, he was relentlessly investigating.

This was a full scale search, not a passing thought.

🎯 Applied mine heart means focused effort
📋 Several separate actions are listed here
🔬 The stacking shows real thoroughness
📖 This was a full scale search

## And The Reason Of Things, And To Know The Wickedness Of Folly

"The reason of things" means the underlying cause behind how life actually works.

"Folly" in this book often means more than simple silliness.

Here folly is paired directly with real wickedness, not just embarrassment.

That pairing shows folly can shade into something genuinely harmful.

Understanding evil closely is different from being drawn into it.

🧩 Reason of things means life's underlying cause
🃏 Folly here means more than silliness
⚠️ It is paired with real wickedness
📖 Understanding evil differs from embracing it

## Even Of Foolishness And Madness

Foolishness and madness are stacked together to show how far folly can go.

This is not calling every foolish person literally insane.

It describes the extreme end of where careless folly eventually leads.

The Preacher wanted to see that end point clearly, not walk into it.

Seeing where a path leads is not the same as walking it.

📉 Foolishness and madness show folly's extreme end
🚫 This is not calling fools insane
🔭 The Preacher wanted to see this clearly
📖 Seeing a path is not walking it

## And I Find More Bitter Than Death The Woman, Whose Heart Is Snares And Nets

"Snares" and "nets" are hunting and trapping tools.

This pictures a specific kind of manipulative woman who ensnares men on purpose.

This is the Preacher's personal, painful observation, not a claim about women in general.

Proverbs uses this same warning image for a dangerous, seductive figure elsewhere.

The danger described here is manipulation, not womanhood itself.

🪤 Snares and nets are trapping tools
🎯 This pictures a manipulative, ensnaring figure
📚 Proverbs uses this same warning elsewhere
📖 The danger is manipulation, not womanhood

## And Her Hands As Bands, Whoso Pleaseth God Shall Escape From Her

"Bands" here means restraints, like ropes or chains that hold someone captive.

"Pleaseth God" means living in a way that honors and follows Him closely.

That kind of life gives a person the discernment to see a trap coming.

Closeness to God works like an early warning system here.

Staying close to God is what keeps a person out of the trap.

⛓️ Bands means restraints, like ropes or chains
🙏 Pleaseth God means honoring Him closely
🚨 That closeness gives early discernment
📖 Closeness to God keeps someone out of traps

## But The Sinner Shall Be Taken By Her

"The sinner" here means someone already living carelessly, without any guard up.

Carelessness leaves a person far more exposed to being caught.

The contrast with the line before is drawn on purpose.

One posture protects, the other one leaves a person open to harm.

Awareness and carelessness lead to two very different endings.

😬 The sinner means someone living carelessly
🚪 Carelessness leaves a person exposed
⚖️ The contrast here is drawn on purpose
📖 Awareness and carelessness lead to different endings

# Ecclesiastes 7:27-29
# 🔎 One Among A Thousand
---
## Behold, This Have I Found, Saith The Preacher, Counting One By One

"The Preacher" is the title this book uses for its author throughout.

"Counting one by one" pictures a careful, methodical investigation, not a quick guess.

This introduces the specific, personal finding that comes in the next two verses.

The Preacher wants the reader to know this took real, patient effort.

What follows is the result of patient, careful counting.

📛 The Preacher is this book's repeated title
🔢 Counting one by one means careful method
⏳ This took real, patient effort
📖 What follows comes from patient counting

## To Find Out The Account

"Account" means a final, reliable total, like the sum of a ledger.

The Preacher wanted a number he could actually trust.

That careful method matters because of how surprising the result turned out to be.

A casual guess would not have carried the same weight.

A careful method makes the coming finding harder to dismiss.

📊 Account means a final, reliable total
✅ He wanted a number he could trust
⚖️ Method matters given the surprising result
📖 A careful method is harder to dismiss

## Which Yet My Soul Seeketh, But I Find Not, One Man Among A Thousand Have I Found

The Preacher describes an ongoing, unfinished search for real integrity in people.

"One man among a thousand" is a way of saying genuine integrity was extremely rare.

He is not claiming men are perfect, only that a truly upright one stood out.

This rarity frustrated him, since he kept searching without finding many at all.

Real integrity turned out to be far rarer than he expected.

🔍 The search for integrity is ongoing
🎯 One in a thousand means extremely rare
🚫 Not a claim that men are perfect
📖 Real integrity was rarer than expected

## But A Woman Among All Those Have I Not Found

This verse has been badly misused throughout history to demean women.

It should not be read that way.

The Preacher had far less access to women in his culture's public and court life than to men.

Many scholars read this as frustrated hyperbole about his personal search, not a doctrine about women's worth.

This reflects the limit of one man's search, not a verdict on half of humanity.

⚠️ This verse has been badly misused historically
🚪 His access to women was limited
📚 Many scholars read this as hyperbole
📖 One search, not a verdict on women

## Lo, This Only Have I Found, That God Hath Made Man Upright

"Upright" means straight, honest, and good, the opposite of crooked.

This describes humanity exactly as God originally designed it to be.

The word choice deliberately echoes the "crooked" image back in verse thirteen.

Whatever went wrong in people did not start with how God made them.

The corruption people see did not come from God's original design.

📏 Upright means straight, honest, and good
🎨 This describes humanity as God designed it
🔗 It echoes the crooked image from verse 13
📖 Corruption did not start with God's design

## But They Have Sought Out Many Inventions

"Inventions" here means schemes, shortcuts, and self made detours from what is right.

Humanity took the upright design God gave and went searching for something else instead.

That searching, not God's design, is the real source of the crookedness named earlier.

This closes the chapter by placing the blame for corruption exactly where it belongs.

People bent themselves away from a design that started straight.

🛠️ Inventions means self made schemes
🚶 Humanity wandered from an upright design
🔀 That wandering caused the crookedness described
📖 People bent away from a straight design
`.trim();

export const ECCLESIASTES_SEVEN_PERSONAL_SECTIONS = parseEcclesiastesSevenRawNotes(ECCLESIASTES_SEVEN_RAW_NOTES);
