export type ColossiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseColossiansTwoRawNotes(rawText: string): ColossiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ColossiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Colossians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Colossians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Colossians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Colossians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Colossians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Colossians 2:${startVerse}` : `Colossians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Colossians 2 sections, received " + sections.length);
  }

  return sections;
}

const COLOSSIANS_TWO_RAW_NOTES = `# Colossians 2:1-5
# 🧵 Hearts Knit Together In Love
---
## 💪 Great Conflict I Have For You

Paul uses the word conflict the way we would describe a physical fight.

He is describing the effort of intense prayer and concern, not an actual battle.

Paul had likely never even met most of the Colossians in person.

Yet he still labors for them like a parent worries over a distant child.

This conflict was happening inside Paul, through prayer, long before it ever happened in person.

🙏 Conflict means intense inward struggle

💪 Paul fought for them in prayer

👶 Love labors even from a distance

📖 Spiritual care precedes physical presence

## 🏙️ Them At Laodicea

Laodicea was a wealthy city only a few miles from Colossae.

The two churches were close neighbors who likely read the same letters aloud.

Paul later tells the Colossians to share this very letter with Laodicea.

These young churches faced the same false teaching at the same time.

Paul's concern was never only for one congregation.

🏙️ Laodicea sat near Colossae

📜 The letter was meant to circulate

🤝 Neighboring churches shared the same danger

📖 Paul cared for the whole region

## 🧵 Knit Together In Love

Knit together pictures threads woven tightly into one piece of cloth.

Love is the thread that holds a church from pulling apart.

Think of a sweater knitted stitch by stitch until it holds its shape.

Pull one thread and loose fabric comes apart.

A tightly woven church does not come apart the same way.

Paul wants the Colossians held together by love, not by argument.

🧵 Knit together means tightly woven

🧶 Love works like interlocking thread

👚 One church held in one piece

📖 Unity comes through love not argument

## 📚 The Full Assurance Of Understanding

Assurance here does not mean a warm feeling that might fade.

It means a settled confidence that stands on real knowledge.

Paul wants them sure of what they believe, not guessing at it.

False teachers thrive on confusion, so clear understanding protects a church.

Full assurance leaves no room for a teacher to talk them out of the truth.

🧠 Assurance means settled confidence

🪨 It rests on real knowledge

❓ Confusion is what false teachers want

📖 Clear understanding protects the church

## 🔓 The Mystery Of God

Mystery does not mean something spooky or impossible to know.

In Paul's letters it means a plan God kept hidden until the right moment.

That plan is Christ himself, now revealed to everyone, not just a few insiders.

What was once concealed is now being announced openly.

The mystery is solved, not locked away forever.

🔓 Mystery means a hidden plan

⏳ It stayed hidden until the right time

✨ Christ is the mystery revealed

📖 The secret is now open to all

## 💎 Hid All The Treasures Of Wisdom And Knowledge

Treasures pictures something extremely valuable and carefully stored.

Paul says these treasures are hid in Christ, not scattered elsewhere.

Think of a vault holding everything precious in one single place.

A person does not need to search many teachers to find wisdom.

Everything worth knowing about God is already found in Christ.

💎 Treasures means something highly valuable

🔐 Wisdom is hidden in Christ

🏦 One vault holds everything needed

📖 Christ alone supplies true wisdom

## 🗣️ Beguile You With Enticing Words

Beguile means to trick someone through clever, convincing talk.

Enticing words sound appealing on the surface but lead somewhere false.

Paul is warning about smooth talking teachers, not obvious liars.

The real danger sounds wise, not foolish.

A church must test what sounds wise instead of simply believing it.

🗣️ Beguile means to trick by talking

🍯 Enticing words sound sweet at first

🎭 Smooth talk is the real danger

📖 Test every teaching before believing it

## 👻 Absent In The Flesh, Yet With You In The Spirit

Paul physically could not be in Colosse with them.

This does not mean he was present in some mystical, invisible form.

It simply means his heart and concern were fully with them.

Anyone who prays deeply for people far away understands this feeling.

Distance never stopped Paul from caring about a church he loved.

📍 Paul was absent physically, not spiritually

❤️ His heart stayed with the church

🙏 Prayer closes the gap distance creates

📖 Concern does not require physical presence

## ⚔️ Your Order, And The Stedfastness Of Your Faith

Order and stedfastness both come from military language.

Order pictures soldiers standing in disciplined formation, not scattered or confused.

Stedfastness pictures a line of soldiers that will not break under pressure.

Paul is praising a church that stands firm together instead of in chaos.

A disciplined, united church is harder for false teachers to break apart.

⚔️ Order and stedfastness are military words

🧍 Order means standing in formation

🛡️ Stedfastness means holding the line

📖 A united church resists being broken

# Colossians 2:6-10
# 🌳 Rooted And Complete In Christ
---
## 🚶 As Ye Have Therefore Received Christ Jesus The Lord

Receiving Christ was only the beginning, not the finish line.

Paul immediately connects believing with an ongoing walk.

Walk here means daily life, every step, not a single decision made once.

The same faith that started the journey must keep walking it forward.

A faith that never moves again was never meant to stop moving.

🚶 Walk means an ongoing daily life

🏁 Receiving Christ was the starting line

👣 Faith must keep moving forward

📖 Belief continues into daily living

## 🌳 Rooted And Built Up In Him

Paul uses two pictures at once here, a tree and a building.

Rooted means drawing life and nourishment from something deep and unseen.

Built up means rising steadily on a foundation that will not shift.

A tree with no roots falls over, a building with no foundation collapses.

Christ supplies both the nourishment underground and the foundation underneath.

🌳 Rooted means drawing life from Christ

🏗️ Built up means rising on a foundation

🍃 Roots feed what the building needs

📖 Christ supplies nourishment and foundation

## 📘 Stablished In The Faith, As Ye Have Been Taught

Stablished means made firm, the same root word as establish.

Paul ties this firmness to what they were originally taught.

Firmness is not stubbornness, it is loyalty to true teaching.

False teachers always arrive promising something newer or deeper.

Staying firm in the original teaching protects against every new trend.

📘 Stablished means made firm

🧱 Firmness rests on true teaching

🆕 New teaching is not automatically better

📖 Hold firmly to what was first taught

## 🙌 Abounding Therein With Thanksgiving

Abounding means overflowing, far more than just enough.

Paul pictures a faith that spills over instead of barely getting by.

Thanksgiving is the evidence that faith is healthy, not just present.

A grateful heart rarely wanders toward strange new teaching.

Gratitude keeps a believer satisfied with what Christ already gave.

🙌 Abounding means overflowing far more than enough

🎁 Thanksgiving shows a healthy faith

🧲 Gratitude resists chasing new teaching

📖 A thankful heart stays satisfied in Christ

## 🕳️ Spoil You Through Philosophy And Vain Deceit

Spoil here means to carry someone off as a captive, not just to ruin a mood.

Paul pictures a kidnapper leading someone away from safety.

Philosophy is not automatically bad, but vain deceit certainly is.

The danger is empty reasoning dressed up as deep thinking.

A captured mind can wander far from Christ without ever noticing.

🕳️ Spoil means to carry off captive

🧠 Vain deceit is empty reasoning dressed up

🚶 A captured mind drifts from Christ

📖 Not all deep thinking is true thinking

## 🏺 After The Tradition Of Men

Tradition of men means teaching invented by people, not given by God.

Every culture collects extra rules over time that feel important but are not biblical.

Paul does not reject tradition itself, only tradition that replaces God's word.

The test is simple, where did this actually come from.

Human habit can quietly outrank Scripture if no one checks it.

🏺 Tradition of men means manmade teaching

❓ Ask where a teaching actually began

⚖️ Human habit can outrank Scripture unnoticed

📖 Test every tradition against God's word

## 🌍 The Rudiments Of The World

Rudiments means basic building block ideas, the ABCs of a system.

In this culture that often meant pagan religious rules, charts, and rituals.

These rules promised control over spiritual forces through the right rituals.

Paul calls them elementary because Christ has already moved believers past them.

A student does not return to the alphabet after learning to read.

🌍 Rudiments means basic building block rules

🔤 They work like spiritual ABCs

🔮 Ancient rituals promised control over forces

📖 Christ moves believers past the basics

## ✨ All The Fulness Of The Godhead Bodily

This is one of the boldest claims in the entire letter.

Godhead means the full nature of God, everything God actually is.

Fulness means nothing held back, nothing partial or incomplete.

Bodily means this happened in a real, physical human body.

Jesus was not part divine wearing a human costume.

Full deity actually lived inside full humanity.

✨ Godhead means the full nature of God

🧊 Fulness means nothing held back

🧍 Bodily means a real physical body

📖 Full deity lived in full humanity

## 🧩 Complete In Him

Complete means lacking nothing else needed.

The false teachers were offering extra steps to reach real completeness.

Paul cuts that offer off before it even starts.

Nothing can be added to Christ that makes a believer more finished.

A completed puzzle does not need one more piece forced into it.

🧩 Complete means lacking nothing else

🚫 No extra steps are required

🧱 Christ alone finishes the picture

📖 Nothing can improve on completeness in Christ

## 👑 Head Of All Principality And Power

Principality and power are names for spiritual authorities and rulers.

Many in this culture feared these unseen powers deeply.

Paul places Christ over every one of them as their head.

A head directs the body, not the other way around.

Nothing spiritual outranks Christ, no matter how ancient or feared.

👑 Principality and power mean spiritual rulers

😨 People feared these unseen powers

🧠 Head means Christ directs, not obeys

📖 Christ outranks every spiritual power

# Colossians 2:11-15
# ⚰️ Buried, Raised, And Forgiven
---
## ✋ Circumcision Made Without Hands

Normal circumcision in this culture was a physical surgery done by human hands.

Paul says believers receive a circumcision no human hand performs.

This is an inward change only God can do.

It marks belonging to God without needing the old physical sign.

The real cutting away happens in the heart, not the body.

✋ Circumcision without hands means God's own work

🔪 Normal circumcision used human hands

❤️ This cutting happens in the heart

📖 God marks believers without the old sign

## 👕 Putting Off The Body Of The Sins Of The Flesh

Putting off pictures removing a piece of clothing.

The body of sins pictures sinful habits as something worn, not something built in forever.

Clothing can be taken off and left behind completely.

Paul says the same is true of the old sinful life in Christ.

What a person once wore no longer has to be worn again.

👕 Putting off means removing like clothing

🧥 Sins are pictured as worn garments

🗑️ Old clothing can be left behind

📖 The old sinful life need not return

## ✝️ The Circumcision Of Christ

This phrase answers the exact demand the false teachers were making.

Some were insisting Gentile believers be physically circumcised to belong fully.

Paul says the real circumcision already happened through union with Christ's death.

Nothing physical needs to be added to what Christ already finished.

Belonging to God never depended on that ritual in the first place.

✝️ Christ's circumcision replaces the physical ritual

🚷 No extra ritual is required to belong

🤝 Union with Christ is already enough

📖 Belonging never depended on that ritual

## 🪦 Buried With Him In Baptism

Baptism pictures a burial, going down and being covered completely.

A burial marks something as truly finished, not paused.

The old sinful life is not reformed here, it is buried.

Think of lowering a casket into the ground and walking away.

Baptism publicly shows a death that already happened by faith.

🪦 Baptism pictures a real burial

⚰️ Burial means truly finished, not paused

🕳️ The old life goes into the ground

📖 Baptism shows a death that already happened

## 🌅 Risen With Him Through The Faith Of The Operation Of God

A burial without a rising would be hopeless.

Paul immediately pairs the burial with a resurrection.

Operation of God means this rising happens by God's power, not human effort.

The same power that raised Jesus from an actual grave raises a believer's new life.

No one talks themselves into this, God performs it.

🌅 Rising follows burial in this picture

⚡ Operation of God means divine power

🪨 The same power raised Jesus from death

📖 God performs the rising, not human effort

## 💀 Dead In Your Sins And The Uncircumcision Of Your Flesh

This describes who the Colossians were before Christ, not who they are now.

Dead in sins means spiritually lifeless, unable to respond to God on their own.

Uncircumcision of your flesh marks them as outsiders to God's covenant people.

Most of the Colossian believers were Gentiles, not Jews.

Paul reminds them how far they had already been brought.

💀 Dead in sins means spiritually lifeless

🚪 Uncircumcision marked them as outsiders

🌍 Most Colossians were Gentile, not Jewish

📖 God brought outsiders fully inside

## ⚡ Quickened Together With Him

Quickened means made alive, the opposite of being dead.

This is not a slow recovery, it is a sudden change from death to life.

Together with him means this happens by union with Christ, not alone.

A person cannot make a dead thing alive by trying harder.

Only God can perform this kind of rescue.

⚡ Quickened means made alive suddenly

🔗 It happens together with Christ

🚫 No effort can achieve this alone

📖 Only God can make the dead live

## 🧾 Forgiven You All Trespasses

Trespasses pictures stepping over a line that was never supposed to be crossed.

Paul says every single one of these is forgiven, not just some.

This is a complete pardon, not a partial reduction of guilt.

Nothing is held back to be brought up again later.

A full pardon leaves no outstanding debt behind.

🧾 Trespasses means crossing a forbidden line

✅ All means every single one, not some

🚫 No guilt is held back for later

📖 The pardon is total, nothing outstanding

## 📜 Blotting Out The Handwriting Of Ordinances

Handwriting of ordinances pictures a written record of debts owed.

Ancient people kept physical, handwritten lists of exactly what someone owed.

Paul pictures the whole list of charges against a sinner written out in full.

Blotting out means the record is erased, not just hidden from view.

The actual evidence against a person is gone completely.

📜 Handwriting of ordinances means a debt record

✍️ Ancient lists tracked exactly what was owed

🧽 Blotting out means fully erased

📖 The evidence against a sinner is gone

## 🔨 Nailing It To His Cross

Roman punishment sometimes involved nailing a written list of someone's crimes above their head.

Paul borrows that image for what happened to the record of sin.

The charge against a believer was not thrown in a drawer, it was destroyed publicly.

A nailed document cannot be quietly pulled out and used again.

The cross did not just cover the debt, it ended it.

🔨 Nailing pictures a public Roman practice

📋 The charge list was destroyed publicly

🚫 A nailed record cannot return

📖 The cross ended the debt completely

## 🏴 Spoiled Principalities And Powers

Spoiled here means stripped of weapons and authority, not ruined like food.

Paul pictures Christ disarming hostile spiritual powers completely.

These powers once held real influence over people trapped in fear and ritual.

At the cross, that influence was broken, not just weakened.

An enemy with no weapons can no longer threaten a victory already won.

🏴 Spoiled means stripped of weapons

⚔️ Hostile powers once held real influence

💥 The cross broke their authority

📖 A disarmed enemy cannot threaten victory

## 🎉 Made A Shew Of Them Openly

A shew openly means a public display everyone could see.

Roman generals held triumphal parades marching defeated enemies through the city.

Paul pictures Christ parading these defeated spiritual powers the same way.

This was not a quiet, private victory kept to himself.

Everyone could witness that these powers had already lost.

🎉 A shew openly means public display

🏛️ Roman generals paraded defeated enemies

👀 Christ displayed the defeated powers publicly

📖 Victory was announced for everyone to see

# Colossians 2:16-19
# 🌒 A Shadow Of Things To Come
---
## 🍽️ Judge You In Meat, Or In Drink

Some teachers were condemning believers over specific food and drink choices.

Paul says let no one judge you, these rules cannot measure real faith.

Food laws once marked Israel apart from other nations under the old covenant.

Christ fulfilled what those laws pointed toward.

A diet was never the real test of belonging to God.

🍽️ Food rules do not measure faith

📏 Diet was never the real test

📘 Old laws pointed toward Christ

📖 Christ fulfilled what those laws promised

## 🌙 An Holyday, Or Of The New Moon, Or Of The Sabbath Days

These three mark Israel's yearly, monthly, and weekly religious calendar.

Holyday means an annual festival like Passover or the Day of Atonement.

New moon marked a monthly celebration tied to Israel's calendar.

Sabbath days were the weekly day of rest commanded in the law.

Paul says none of these calendar rules can be used to judge a believer now.

🌙 New moon was a monthly festival

📅 Holyday marked an annual celebration

🛌 Sabbath was the weekly day of rest

📖 Calendar rules cannot judge a believer now

## 🌒 A Shadow Of Things To Come

A shadow is cast by something solid standing in the light.

The shadow is real, but it is not the actual object.

Old covenant festivals and food laws were shadows pointing forward.

They were never meant to be the final destination.

A shadow's whole job is to announce that something is coming.

🌒 A shadow is cast by something solid

👤 The shadow is not the object itself

📍 Old laws pointed forward, not permanent

📖 Shadows exist to announce what is coming

## 🧍 The Body Is Of Christ

If the old system was the shadow, Christ is the actual body casting it.

A shadow loses its purpose once the real object finally arrives.

Christ is not one more shadow added to the pile.

He is the substance every earlier shadow was always pointing toward.

Once the body is standing in front of you, the shadow stops mattering.

🧍 Christ is the substance behind the shadow

🌒 The shadow loses purpose once fulfilled

🎯 Every earlier shadow pointed to Christ

📖 The substance has already arrived

## 🙇 Voluntary Humility And Worshipping Of Angels

Some teachers in Colosse promoted extreme self denial as a badge of holiness.

They paired this with rituals honoring angels as go betweens to God.

This looked humble on the outside but actually skipped past Christ.

Angels are never presented in Scripture as objects of worship.

Paul calls this practice exactly what it is, a detour.

🙇 Voluntary humility looked holy on the surface

👼 Angels were wrongly treated as mediators

🚧 This practice bypassed Christ entirely

📖 Worship belongs to God alone

## 👁️ Intruding Into Those Things Which He Hath Not Seen

Some teachers claimed authority from private visions no one else could check.

Intruding means pushing into territory that was never actually opened to them.

A vision cannot outrank what God has already clearly revealed.

Paul refuses to treat an unverifiable experience as higher truth.

Real authority rests on revealed truth, not private claims.

👁️ Some claimed authority from private visions

🚪 Intruding means entering unopened territory

⚖️ Visions cannot outrank revealed truth

📖 Real authority rests on revelation, not claims

## 🎈 Vainly Puffed Up By His Fleshly Mind

Puffed up pictures something inflated with air, looking bigger than it actually is.

Fleshly mind means thinking driven by pride, not by the Spirit.

This person feels deeply spiritual while actually drifting from Christ.

Inflated pride and true humility cannot occupy the same heart.

What looks impressive can still be completely empty inside.

🎈 Puffed up means falsely inflated

🧠 Fleshly mind means prideful thinking

🎭 It can look spiritual and still be empty

📖 True humility does not inflate itself

## 🩻 Not Holding The Head

The Head is Christ, the source every part of the body depends on.

A hand cut off from the body stops receiving any strength at all.

Chasing angels and visions quietly loosens a person's grip on Christ.

Nothing else can substitute for staying attached to the source.

A church that lets go of the Head eventually stops functioning as one body.

🩻 The Head means Christ, the source

✋ A cut off hand loses strength

🔗 Side issues loosen the grip on Christ

📖 Nothing substitutes for staying attached to Christ

## 🦴 By Joints And Bands Having Nourishment Ministered

Joints and bands picture the connective tissue holding a body together.

Nourishment flows through these connections to every part that needs it.

A church works the same way, connected member feeding member.

Cut the connections and growth stops no matter how strong one part is.

Christ designed His church to grow through connection, not isolation.

🦴 Joints and bands mean connective tissue

🍽️ Nourishment flows through real connection

🧍 Members feed and strengthen each other

📖 Growth depends on connection, not isolation

# Colossians 2:20-23
# 🚫 Dead To Manmade Rules
---
## ⚰️ Dead With Christ From The Rudiments Of The World

Chapter two already explained rudiments as basic, elementary spiritual rules.

Paul says believers died to that entire system through Christ.

A dead person cannot be ordered around by old obligations anymore.

Returning to rule keeping treats a finished death as if it never happened.

Christ did not free believers only to send them back to the basics.

⚰️ Dying with Christ ends old obligations

🔁 Returning to rules ignores that death

🔓 Freedom was never meant to be undone

📖 Christ frees believers from the basics for good

## ✋ Touch Not, Taste Not, Handle Not

These three commands sound like actual slogans the false teachers were repeating.

Paul is likely quoting their own rules back to them.

Each one restricts contact with some ordinary physical object.

None of these objects are explained as evil in themselves.

The rules sound serious, but they were invented, not commanded by God.

✋ These sound like the teachers' own slogans

🚫 Each rule restricts ordinary physical things

❓ None of these objects are actually evil

📖 Serious sounding rules are not always God's rules

## 🗑️ Which All Are To Perish With The Using

Perish with the using means these objects simply wear out through normal use.

Paul points out something almost humorous about these harsh restrictions.

The very things being guarded so strictly are temporary and disposable anyway.

It makes little sense to build a strict spiritual system around what fades.

Eternal devotion was being spent on things with no lasting value.

🗑️ These objects simply wear out

⏳ Temporary things got eternal sounding rules

🤷 The restriction outweighs the object's value

📖 Devotion was spent on what fades

## 📏 Commandments And Doctrines Of Men

These rules sound biblical, but Paul says plainly they came from men.

God never actually commanded touch not, taste not, handle not.

A rule can sound holy and still have no divine source behind it.

The entire chapter has been building toward this exact contrast.

Human rules dressed in religious language are still only human rules.

📏 These rules came from men, not God

❌ God never commanded these specific restrictions

🎭 Religious language does not make a rule divine

📖 Test every rule against its actual source

## 🎭 A Shew Of Wisdom In Will Worship

A shew of wisdom means something that looks wise from the outside.

Will worship means worship someone invented on their own, not commanded by God.

It feels devoted and disciplined while actually following personal preference.

Self invented devotion can look more impressive than simple obedience.

Looking wise and actually being wise are not the same thing.

🎭 A shew of wisdom means looking wise

🙋 Will worship means self invented devotion

✨ It can look impressive and still be empty

📖 Appearing wise differs from true obedience

## 🩹 Neglecting Of The Body

Neglecting the body meant harsh self denial, even deliberate discomfort.

Some treated physical suffering as proof of real spiritual seriousness.

Paul does not praise this practice, he exposes it.

Punishing the body does not automatically purify the heart.

Discipline and self punishment are not actually the same thing.

🩹 Neglecting the body meant harsh self denial

🏆 Suffering was treated as proof of holiness

❤️ Punishing the body does not purify the heart

📖 True discipline differs from self punishment

## 🧱 Not In Any Honour To The Satisfying Of The Flesh

This is Paul's final verdict on the whole system of manmade rules.

None of these harsh practices actually restrained real sinful desire.

A rule about food or an angel ritual cannot fix a human heart.

Only union with Christ, described all through this chapter, does that.

The chapter that began with hidden treasure ends by exposing an empty system.

🧱 Harsh rules did not restrain real sin

💔 External rules cannot fix an inward problem

🔑 Only union with Christ changes the heart

📖 Hidden treasure in Christ ends an empty system
`.trim();

export const COLOSSIANS_TWO_PERSONAL_SECTIONS = parseColossiansTwoRawNotes(COLOSSIANS_TWO_RAW_NOTES);
