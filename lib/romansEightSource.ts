export type RomansEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansEightRawNotes(rawText: string): RomansEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 8:${startVerse}` : `Romans 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Romans 8 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_EIGHT_RAW_NOTES = `# Romans 8:1-4
# ⚖️ The Verdict Has Changed
---
## There Is Therefore Now No Condemnation

Condemnation means a formal guilty verdict, the kind a judge hands down in court.

Romans seven just finished describing a believer trapped under sin's power.

Paul now announces a complete change of status for that same believer.

Being in Christ Jesus moves a person out of guilty and into free.

⚖️ Condemnation means a guilty verdict

📜 Romans seven described feeling trapped

🔓 Being in Christ changes the status

📖 The verdict changed, not just the feeling

## Who Walk Not After The Flesh, But After The Spirit

To walk after something means to live by its direction every day.

Walking after the flesh means letting sinful desires set the daily course.

Walking after the Spirit means letting God's Spirit set that course instead.

Paul already spent chapter seven describing exactly how the flesh pattern feels from the inside.

🚶 Walk means a daily life pattern

🔥 After the flesh follows sinful desire

🕊️ After the Spirit follows God's leading

📖 Believers now have a real other option

## The Law Of The Spirit Of Life In Christ Jesus

Romans seven already named two laws at war inside a person.

One law came from the mind that wanted to obey God.

The other law came from sin living inside the flesh.

Paul now names a stronger law, the Spirit of life in Christ Jesus.

That new law is the one that actually sets a person free.

⚔️ Romans seven named two warring laws

🧠 One law came from the mind

🔗 One law came from sin in the flesh

📖 A stronger law now sets believers free

## God Sending His Own Son In The Likeness Of Sinful Flesh

This does not mean Jesus had a sinful nature of his own.

Likeness of sinful flesh means he took on a real human body.

He entered the same flesh and blood conditions every person lives in.

He did this without ever being ruled by sin himself.

👶 Jesus took on a real human body

🚫 He never had a sinful nature

🌍 He entered a world broken by sin

📖 Full humanity without being ruled by sin

## Condemned Sin In The Flesh

The law could point out sin but never defeat it.

What the law could not do, God accomplished through his own Son.

God condemned sin itself in the body of Christ on the cross.

Sin received the guilty verdict instead of the believer.

📜 The law could only point out sin

❌ The law could never defeat sin

✝️ Christ's body received sin's guilty verdict

📖 Sin was condemned so the believer is not

## The Righteousness Of The Law Might Be Fulfilled In Us

Fulfilled here does not mean a believer now perfectly keeps every rule.

It means the law's real goal, a life reflecting God's own character, is finally reached.

That goal is reached through the Spirit's work, not through self effort.

Walking after the Spirit, named back in verse one, is how a believer gets there.

🎯 Fulfilled does not mean perfect rule keeping

💗 The goal is a life reflecting God

🕊️ The Spirit reaches that goal, not self effort

📖 This answers how verse one actually works

# Romans 8:5-11
# 🧠 Two Minds, Two Masters
---
## To Mind The Things Of The Flesh

To mind something means to constantly think about it and want it.

A person after the flesh keeps their attention locked on what the flesh wants.

A person after the Spirit keeps that same attention locked on what the Spirit wants.

Paul is describing a daily direction of focus, not one single choice.

🧠 Mind means constant focus and desire

🔥 The flesh focused mind wants flesh things

🕊️ The Spirit focused mind wants Spirit things

📖 This is a daily direction, not one choice

## To Be Carnally Minded Is Death

Carnally minded means a mind completely set on the flesh.

Paul says that mindset leads to death, not only physical death someday.

It describes a present separation from God's life right now.

Spiritually minded leads the opposite way, into life and peace.

💀 Carnally minded means flesh focused thinking

⏳ This death is present, not only future

🕊️ Spiritually minded leads the opposite way

📖 Life and peace follow the Spirit focused mind

## The Carnal Mind Is Enmity Against God

Enmity means active hostility, not just disagreement or distance.

Paul is not describing a mind that merely ignores God.

He is describing a mind that works against God.

That mind cannot submit to God's law, and it never could on its own.

⚔️ Enmity means active hostility

🚫 Not simple distance from God

😠 The carnal mind works against God

📖 It cannot submit to God's law alone

## Ye Are Not In The Flesh, But In The Spirit

Paul switches from a general struggle to naming his readers directly.

These believers are no longer defined by the flesh as their ruling identity.

The Spirit of God now lives inside them.

That indwelling Spirit is what actually marks someone as a true believer.

🔀 Paul now speaks directly to believers

🏠 The Spirit now lives inside them

✅ The Spirit's presence marks true belonging

📖 Identity changed from flesh to Spirit

## If Any Man Have Not The Spirit Of Christ, He Is None Of His

This line sets a clear test for genuine faith.

Having the Spirit of Christ is not an optional upgrade for advanced believers.

Paul says plainly that without the Spirit, a person does not belong to Christ.

The presence of the Spirit, not a feeling or a label, is the real marker.

🧪 This verse gives a clear test

🚫 The Spirit is not optional

🔑 Belonging depends on having the Spirit

📖 Presence of the Spirit is the real marker

## The Body Is Dead Because Of Sin, But The Spirit Is Life

This does not mean a believer's body is already lifeless.

It means the body still carries the effects of sin.

The Spirit inside a believer is already alive because of Christ's righteousness.

Two realities sit side by side in the same believer right now.

⚰️ The body still carries sin's effect

🕊️ The Spirit is already alive

⚖️ Righteousness is the reason for that life

📖 Two realities coexist in one believer

## Shall Also Quicken Your Mortal Bodies

Quicken means to bring to life, the same way a spark lights a fire.

The Spirit who raised Jesus from the dead lives inside every believer.

That same Spirit will one day raise up the believer's own body.

The resurrection of the body is tied to the Spirit's presence now.

🔥 Quicken means to bring to life

✝️ The Spirit who raised Jesus lives in believers

🙌 That Spirit will raise their bodies too

📖 Present Spirit and future resurrection are linked

# Romans 8:12-17
# 👪 Adopted As Sons And Heirs
---
## We Are Debtors, Not To The Flesh

A debtor is someone who owes a payment or an obligation to another.

Paul says believers owe nothing to the flesh anymore.

The flesh has no legitimate claim left on how a believer lives.

That old debt was already cancelled earlier in this chapter.

💳 Debtor means someone who owes an obligation

🚫 Believers owe the flesh nothing

🔓 The flesh lost its claim on them

📖 That debt was already cancelled

## Mortify The Deeds Of The Body

Mortify means to put something to death on purpose.

Paul is not describing a passive feeling here.

He is describing an active, ongoing choice to kill sinful habits.

The Spirit is the power behind that choice, not willpower alone.

⚔️ Mortify means to put to death

🙅 This is not a passive feeling

💪 It is an active, ongoing choice

📖 The Spirit powers that choice

## Led By The Spirit Of God, They Are The Sons Of God

Being led means following direction over time, the way a shepherd leads a flock.

Paul names this leading as the actual proof of being God's son.

Sonship here is not about gender.

It describes the full legal standing of belonging to God's family.

🐑 Led means following direction over time

✅ This leading proves true sonship

👪 Sonship means full family standing

📖 Being led by the Spirit is the proof

## The Spirit Of Bondage Again To Fear

Bondage means slavery, a condition with no legal freedom at all.

Paul says believers have not received that old slave mindset again.

That old mindset was ruled by constant fear.

Fear once asked whether God could ever really accept a person.

⛓️ Bondage means slavery with no freedom

😨 That mindset was ruled by fear

🔙 Believers left that mindset behind

📖 Fear once questioned God's acceptance

## The Spirit Of Adoption, Whereby We Cry, Abba, Father

Adoption in the Roman world gave a person full legal rights as a true son.

Abba is an Aramaic word for father, used with warmth and closeness.

A household slave would never dare call the master by that word.

The Spirit gives believers the confidence to use it anyway.

📜 Adoption gave full legal son status

🗣️ Abba is a warm Aramaic word for father

🙅 A slave would never use that word

📖 The Spirit gives believers that confidence

## The Spirit Itself Beareth Witness With Our Spirit

A witness is someone who confirms the truth of a claim.

Paul says the Holy Spirit personally confirms, inside a believer, that they belong to God.

This is an inner confirmation, not a feeling someone has to manufacture.

Two witnesses agree here, the believer's own spirit and God's Spirit.

🧾 Witness means someone confirming a truth

🕊️ The Spirit confirms real belonging

🙋 This confirmation comes from inside

📖 Two witnesses agree on one truth

## Heirs Of God, And Joint Heirs With Christ

An heir is someone legally guaranteed a future inheritance.

In this culture, an adopted son received the same inheritance rights as a son born into the family.

Paul says believers are not only God's heirs, but heirs alongside Christ himself.

That inheritance comes with a condition named in the very next phrase.

📜 Heir means a guaranteed future inheritance

👨‍👦 Adopted sons inherited equally in this culture

✝️ Believers inherit alongside Christ himself

📖 One condition follows this promise

## If So Be That We Suffer With Him, That We May Be Also Glorified Together

Suffering and glory are tied together here, not offered as two separate options.

Sharing in Christ's sufferings now comes before sharing in his glory later.

Paul is not saying suffering earns the inheritance.

He is saying the inheritance and the suffering belong to the same path.

🔗 Suffering and glory are tied together

⏳ Suffering now comes before glory later

🚫 Suffering does not earn the inheritance

📖 Both belong to the same path

# Romans 8:18-25
# 🌍 Creation Waits With Us
---
## I Reckon That The Sufferings Of This Present Time

Reckon means to calculate carefully, the way someone adds up a bill before paying it.

Paul is not guessing or hoping here.

He has weighed present suffering against future glory and reached a settled conclusion.

The comparison is not even close.

🧮 Reckon means a careful calculation

🚫 This is not a guess or wish

⚖️ Paul weighed suffering against glory

📖 The comparison was not even close

## The Earnest Expectation Of The Creature

Creature here means the whole created world, not a single animal.

Mountains, oceans, animals, and the created order itself are all included.

Paul pictures all of it waiting eagerly, the way a crowd waits for an announcement.

What it is waiting for gets named in the very next verse.

🌍 Creature means the whole created world

🏔️ Mountains, oceans, and animals are included

👀 All of it waits eagerly

📖 The next verse names what for

## Subject To Vanity, Not Willingly

Vanity here means built in frustration, things not working the way they were made to work.

This points back to the curse placed on creation in Genesis three, after the Fall.

Creation did not choose that frustration for itself.

God placed it there, and God placed it there with a purpose attached.

💔 Vanity means built in frustration

📜 This traces back to Genesis three

🚫 Creation did not choose this itself

📖 God attached a purpose to it

## The Bondage Of Corruption Into The Glorious Liberty

Bondage of corruption describes creation's current condition, decay that keeps breaking everything down.

Glorious liberty describes what is coming instead.

This liberty is not a vague improvement.

It is the same freedom believers already have in Christ, extended to all creation.

⛓️ Bondage of corruption means ongoing decay

🔓 Glorious liberty is what is coming

🚫 This is not a vague improvement

📖 Creation shares believers' freedom one day

## The Whole Creation Groaneth And Travaileth In Pain

Travaileth describes the pain of childbirth specifically, not pain in general.

Paul pictures all of creation groaning the way a woman in labor groans.

Labor pain is not pointless pain.

Paul is saying creation's pain leads somewhere too, the same way labor leads to new life.

👶 Travaileth means labor pain specifically

🌍 All creation groans like a woman in labor

🚫 This pain is not pointless

📖 Labor pain leads to new life

## The Firstfruits Of The Spirit

Firstfruits were the very first crops gathered at harvest in the ancient world.

They proved the rest of the harvest was genuinely on its way.

The Spirit living in a believer right now works the same way.

It is proof that the fuller harvest, the resurrection of the body, is still coming.

🌾 Firstfruits were the harvest's first crops

✅ They proved more harvest was coming

🕊️ The Spirit works the same way

📖 Full resurrection is the harvest still coming

## We Are Saved By Hope

Hope in this verse does not mean a weak wish that something might happen.

It means a confident expectation of something God has already promised.

Salvation here is not only a past event.

It also includes a future completion that has not fully arrived yet.

🙏 Hope means confident expectation, not a weak wish

📜 It rests on God's own promise

⏳ Salvation includes a future completion

📖 That completion has not arrived yet

## Hope That Is Seen Is Not Hope

If someone can already see a thing, they no longer need to hope for it.

Hope, by definition, reaches toward something not yet visible.

That is exactly why patience belongs in the very next line.

Waiting is simply what hope looks like while it is still true hope.

👁️ Seen things no longer need hope

🙏 Hope reaches toward the unseen

⏳ Patience naturally follows real hope

📖 Waiting is what hope looks like

# Romans 8:26-30
# 🙏 The Spirit Prays, God Plans
---
## The Spirit Also Helpeth Our Infirmities

Infirmities means weaknesses, the ordinary limits every believer runs into.

Paul names one very specific weakness next, not knowing how to pray.

The Spirit does not criticize that weakness.

The Spirit steps in and helps carry it instead.

💪 Infirmities means ordinary weaknesses

🙏 Not knowing how to pray is named next

🚫 The Spirit does not criticize weakness

📖 The Spirit helps carry it instead

## Groanings Which Cannot Be Uttered

Uttered means spoken out loud in actual words.

Sometimes a need is too deep for a person to put into words.

Think of a friend who sits silently beside someone in grief, understanding more than words could say.

The Spirit prays that same kind of prayer for believers.

🗣️ Uttered means spoken in actual words

💔 Some needs are too deep for words

🤝 Think of a friend sitting silently in grief

📖 The Spirit prays beyond words for believers

## He That Searcheth The Hearts Knoweth The Mind Of The Spirit

He that searcheth the hearts refers to God the Father.

God does not need the Spirit's prayers translated into words to understand them.

God already knows exactly what the Spirit is asking for.

That prayer always matches God's own will perfectly.

👁️ He that searcheth hearts means God

🔓 God needs no translation of the Spirit's prayer

✅ God already knows the request

📖 That prayer always matches God's will

## All Things Work Together For Good

This promise does not mean every single event will feel pleasant.

It means God is weaving every event, good and painful, toward a real purpose.

That promise belongs specifically to those who love God.

It belongs to those called according to his purpose.

🚫 This is not a promise of comfort

🧵 God weaves events toward real purpose

❤️ It belongs to those who love God

📖 It is tied to God's own calling

## For Whom He Did Foreknow, He Also Did Predestinate

Foreknow means God knew these people before they ever existed.

Predestinate means God set a plan in place for them ahead of time.

Many scholars disagree about exactly how these two words work together.

What they agree on is that the plan's goal comes in the very next phrase.

👁️ Foreknow means known before they existed

📜 Predestinate means a plan set in advance

📚 Scholars disagree on exactly how this works

📖 The plan's goal comes in the next phrase

## Conformed To The Image Of His Son

Conformed means gradually shaped into the same form as something else.

God's plan for believers is not random improvement.

It aims at one specific target, looking like Jesus himself.

That goal shapes everything else named in this chapter.

🎯 Conformed means gradually shaped like something

🚫 This is not random improvement

✝️ The target is looking like Jesus

📖 This goal shapes the whole chapter

## The Firstborn Among Many Brethren

A firstborn son in this culture held a special place of honor over his siblings.

Jesus holds that place of honor, but he is not an only son.

Every believer conformed to his image becomes a brother in that same family.

Christ is first, and believers follow in the same family line.

👑 Firstborn held special honor in this culture

✝️ Jesus holds that honored place

👪 Believers become brothers in that family

📖 Christ is first, believers follow

## Them He Also Called, Justified, Glorified

This verse lists one chain of events, each step leading into the next.

Called means invited into relationship with God.

Justified means declared righteous, the same verdict named back in verse one.

Glorified means fully sharing in Christ's own glory.

Paul writes glorified as already settled, even though it has not happened yet.

🔗 Four steps link into one chain

📣 Called means invited into relationship

⚖️ Justified means declared righteous

📖 Glorified is written as already settled

# Romans 8:31-34
# ⚔️ No One Can Accuse Us Now
---
## If God Be For Us, Who Can Be Against Us

This question is not really asking for an answer.

Paul already knows no answer exists strong enough to matter.

Having God on a person's side settles every real threat that could come.

The question is really a declaration dressed up as a question.

❓ This question expects no real answer

🛡️ God's side settles every threat

💬 It is a declaration, not a real question

📖 Nothing can outweigh God being for us

## He That Spared Not His Own Son

Sparing someone means holding something back to protect them.

God did not hold Jesus back, even though he easily could have.

He gave up his own Son for people who did not deserve it.

That same generosity backs the promise named in the very next line.

🤲 Sparing means holding something back

✝️ God did not hold Jesus back

🎁 This was a gift to the undeserving

📖 This generosity backs the next promise

## Who Shall Lay Any Thing To The Charge Of God's Elect

A charge here means a formal legal accusation, the kind brought in a courtroom.

Elect means those God has chosen and called his own.

Paul is asking who could possibly bring a charge that actually sticks.

The answer comes immediately in the very next line.

⚖️ Charge means a formal legal accusation

✅ Elect means those God has chosen

❓ No accusation here actually sticks

📖 The answer comes in the next line

## It Is God That Justifieth

The judge who could convict is the same judge who already declared the verdict innocent.

No other court outranks that verdict.

This directly answers the accusation question from the line before it.

God himself is both the one who could accuse and the one who acquits.

⚖️ The same judge gave the verdict

🏛️ No other court outranks it

❓ This answers the accusation question

📖 God accuses no one he has justified

## Who Is He That Condemneth

This question echoes the very first line of the chapter, no condemnation.

Paul circles back to close the loop he opened at the start.

Christ died and rose again, and now sits at God's right hand.

That risen, exalted Christ is actively praying for believers right now.

🔁 This echoes chapter eight's opening line

✝️ Christ died and rose again

🙌 Christ now sits at God's right hand

📖 Christ actively prays for believers now

# Romans 8:35-39
# 🛡️ Nothing Can Separate Us
---
## Who Shall Separate Us From The Love Of Christ

Paul asks this question, then lists the worst things a person could face.

Tribulation, distress, persecution, famine, nakedness, danger, and even the sword of execution.

That is every major threat someone in the first century genuinely feared.

Several of these were not hypothetical, real believers already faced them.

❓ Paul asks a question with no real answer

⚔️ He names every major first century threat

😨 These were not hypothetical fears

📖 Real believers already faced several of these

## We Are Accounted As Sheep For The Slaughter

This exact line is quoted from Psalm forty four, written centuries earlier.

Sheep for the slaughter pictures an animal with no ability to fight back or run.

Paul is saying believers can feel that exposed and that powerless at times.

Even that feeling does not mean God's love has left them.

📜 This line quotes Psalm forty four

🐑 Sheep for the slaughter means fully exposed

😔 Believers can feel that powerless

📖 That feeling does not mean love is gone

## Nay, In All These Things We Are More Than Conquerors

A conqueror wins a fight they were already in.

More than a conqueror means that fight never shakes a person's standing with God.

None of the threats listed earlier can actually touch that standing.

Through him that loved us names exactly where that strength comes from.

🏆 A conqueror wins a fight already happening

💪 More than a conqueror never loses standing

🛡️ The earlier threats cannot touch that standing

📖 Christ's love is the source of that strength

## Neither Death, Nor Life, Nor Angels, Nor Principalities, Nor Powers

Principalities and powers refer to spiritual authorities and rulers, visible and invisible.

Paul is not only ruling out physical threats here.

He is ruling out spiritual and supernatural ones too.

No category, large or small, seen or unseen, qualifies as strong enough.

👑 Principalities and powers mean spiritual authorities

🚫 Physical threats are ruled out

👁️ Unseen spiritual threats are ruled out too

📖 No category is strong enough

## Nor Height, Nor Depth, Nor Any Other Creature

Height and depth likely picture the furthest reaches of the sky and sea.

Any other creature closes the list by covering everything left unnamed.

Paul leaves no gap in this list on purpose.

The love of God in Christ Jesus our Lord is the one thing nothing can out measure.

🌌 Height and depth picture the furthest reaches

🌍 Any other creature covers everything left

🚫 Paul leaves no gap in this list

📖 Nothing out measures God's love in Christ
`.trim();

export const ROMANS_EIGHT_PERSONAL_SECTIONS = parseRomansEightRawNotes(ROMANS_EIGHT_RAW_NOTES);
