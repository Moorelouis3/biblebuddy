export type FirstCorinthiansTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansTwelveRawNotes(rawText: string): FirstCorinthiansTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 12:${startVerse}` : `1 Corinthians 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Corinthians 12 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_TWELVE_RAW_NOTES = `# FirstCorinthians 12:1-3
# 🎁 Gifts From One Spirit
---
## 📣 Concerning Spiritual Gifts, Brethren, I Would Not Have You Ignorant

"Ignorant" here means lacking the right information, not foolish.

Paul is about to correct a real gap in what the Corinthians understood.

Spiritual gifts were already causing confusion and competition in their church.

Paul addresses the subject directly instead of letting it stay murky.

🎁 Ignorant means lacking information

❗ Spiritual gifts caused real confusion

🏛️ Corinth needed direct correction

📖 Paul tackles the subject head on

## 🗿 Ye Were Gentiles, Carried Away Unto These Dumb Idols

Many Corinthians had worshiped lifeless idols before coming to Christ.

"Dumb" here means silent, not foolish.

Those idols could never speak, guide, or answer anyone who prayed to them.

Pagan worship in Corinth often included wild trances and frenzied shouting.

🗿 Dumb means silent, not foolish

🙇 Idols could never speak or guide

🎭 Pagan worship often turned frenzied

📖 Paul recalls their life before Christ

## 🚫 No Man Speaking By The Spirit Of God Calleth Jesus Accursed

Paul gives the Corinthians a real test for spiritual speech.

No message that truly comes from God's Spirit will curse Jesus.

Some ecstatic speech in pagan worship could sound similarly dramatic.

This test cuts straight through that confusion.

⚖️ Paul offers a clear test

🚫 God's Spirit never curses Jesus

🎭 Pagan speech could sound similar

📖 Content matters more than excitement

## 🗣️ No Man Can Say That Jesus Is The Lord, But By The Holy Ghost

Calling Jesus Lord sounds like a simple sentence to say out loud.

Paul says real conviction behind those words only comes from the Holy Ghost.

Anyone can repeat words without actually believing them.

Genuine faith behind that confession is itself a gift from God.

🗣️ Saying Lord is easy to repeat

🕊️ Real conviction comes from the Holy Ghost

💡 Faith itself is a gift

📖 True confession starts with God, not effort

# FirstCorinthians 12:4-7
# 🌈 Many Gifts, One Spirit
---
## 🎁 There Are Diversities Of Gifts, But The Same Spirit

"Diversities" means differences or varieties.

Gifts differ widely from person to person in the church.

One Spirit is the single source behind every different gift.

Variety does not mean division here.

🎁 Diversities means real differences

🕊️ One Spirit behind every gift

🧩 Variety was never meant to divide

📖 A shared source unites different gifts

## 🧭 There Are Differences Of Administrations, But The Same Lord

"Administrations" means different ways of serving within the church.

Some lead, some teach, some organize, and some simply help.

Every role still answers to the same Lord.

No role here outranks another in importance.

🧭 Administrations means different ways of serving

🙇 Every role answers to the same Lord

⚖️ No role outranks another

📖 Many jobs, one Lord over all

## ⚙️ There Are Diversities Of Operations, But It Is The Same God Which Worketh All In All

"Operations" means the actual results these gifts produce in action.

God himself stands behind every single outcome, not just the gift itself.

Paul names Spirit, Lord, and God together here on purpose.

That order quietly points to one God acting in three ways.

⚙️ Operations means results gifts produce

🙌 God works behind every outcome

✝️ Spirit, Lord, and God named together

📖 Three persons, one God at work

## 👁️ The Manifestation Of The Spirit Is Given To Every Man To Profit Withal

"Manifestation" means the visible, outward display of something hidden.

Every believer in the church receives some visible display of the Spirit's work.

"Profit withal" means for the benefit of everyone, not just the person gifted.

No gift here exists only for one person's private use.

👁️ Manifestation means visible display

🙋 Every believer receives something

🤝 Profit withal means benefit for all

📖 Gifts serve the whole church

# FirstCorinthians 12:8-11
# ✨ Nine Gifts Named
---
## 🦉 To One Is Given By The Spirit The Word Of Wisdom

"Word of wisdom" means the Spirit given ability to apply truth rightly.

This is not general smartness or school learning.

It is a gift for a moment that needs godly judgment.

Paul names it first on his list of many gifts.

🦉 Wisdom means applying truth rightly

🎯 It fits a specific moment

🚫 Not school learning or general smartness

📖 First gift Paul names here

## 💡 To Another The Word Of Knowledge By The Same Spirit

"Word of knowledge" means a Spirit given insight into truth itself.

Wisdom answers what to do with truth.

Knowledge answers what truth actually is.

Paul separates the two because they do different work in the church.

💡 Knowledge means insight into truth

❓ It answers what is true

⚖️ Different work than wisdom

📖 Both still come from one Spirit

## 🙏 To Another Faith By The Same Spirit

This "faith" names a specific gift, not the saving faith every believer already has.

It means a sudden, supernatural confidence for one particular need.

A believer might receive it only for a single moment, not for life.

The same Spirit who gives salvation also gives this extra measure.

🙏 This faith is a specific gift

⚡ Supernatural confidence for one need

⏳ Often given for a single moment

📖 The same Spirit gives both gifts

## 🩹 To Another The Gifts Of Healing By The Same Spirit

"Gifts of healing" means the Spirit working physical healing through a believer's prayer.

The plural "gifts" suggests many separate instances, not one permanent power.

This gift depended fully on the Spirit's timing, not the believer's control.

No one carried an unlimited personal power to heal at will.

🩹 Healing gifts bring real physical restoration

🔁 Plural means many separate instances

⏱️ The Spirit controlled the timing

📖 No one held unlimited healing power

## ✨ To Another The Working Of Miracles

"Working of miracles" means acts that go beyond any natural explanation.

These acts pointed straight back to God's power, not human skill.

A miracle confirmed that a message or a messenger truly came from God.

This gift made God's presence impossible to miss.

✨ Miracles go beyond natural explanation

👉 They point to God, not skill

✅ They confirmed a message from God

📖 God's presence became hard to miss

## 🔮 To Another Prophecy

"Prophecy" here means speaking a fresh message straight from God to the church.

It does not mean predicting far off future events.

A prophet's words still had to match what Scripture already taught.

This gift gave the church direct, timely guidance.

🗣️ Prophecy means a message from God

🔮 Not the same as future prediction

📏 It still had to match Scripture

📖 It gave the church direct guidance

## 🔍 To Another Discerning Of Spirits

"Discerning of spirits" means recognizing whether a message truly comes from God.

Corinth already had plenty of false and showy spiritual claims floating around.

This gift protected the church from being fooled by a convincing performance.

It worked like a built in filter for every other gift on this list.

🔍 Discerning means testing where messages come from

🎭 Corinth had plenty of false claims

🛡️ This gift protected the church

📖 It filtered every gift on the list

## 🗯️ To Another Divers Kinds Of Tongues

"Divers kinds of tongues" means speaking in languages the speaker never personally learned.

This gift drew enormous attention and pride inside the Corinthian church.

Paul returns to this exact gift with much stronger warnings in chapter fourteen.

Here he simply places it alongside every other gift, not above them.

🗯️ Tongues means unlearned languages spoken

😤 This gift drew real pride in Corinth

📘 Chapter fourteen returns to this gift

📖 Tongues sit equal among many gifts

## 🔁 To Another The Interpretation Of Tongues

"Interpretation of tongues" means a separate gift that explains what was spoken.

Without this gift, a message in tongues could help no one listening.

Paul pairs the two gifts together on purpose here.

Speaking and understanding both needed the Spirit's help.

🔁 Interpretation explains what was spoken

🤷 Tongues alone helped no listener

🧩 Paul pairs these two gifts

📖 Both needed the Spirit's help

## 🎯 Dividing To Every Man Severally As He Will

"Selfsame" simply means the very same, repeated here for emphasis.

"Severally" means individually, one person at a time.

One Spirit alone decides who receives which gift.

No believer earns a gift or picks one off a list.

🎯 Selfsame means the very same Spirit

👤 Severally means given individually

🕊️ The Spirit decides who gets what

📖 No gift is earned or chosen

# FirstCorinthians 12:12-14
# 🦴 One Body, Many Members
---
## 🦴 As The Body Is One, And Hath Many Members, So Also Is Christ

Paul compares the church directly to a human body.

A body is one whole thing even though it has many different parts.

Every believer functions like one part of that same living body.

Christ himself is the pattern this whole comparison is built on.

🦴 The church compares to one body

🧩 Many parts still form one whole

🙋 Every believer is one part

📖 Christ is the pattern behind it

## 🕊️ For By One Spirit Are We All Baptized Into One Body

This baptism means the Spirit joining a believer to Christ's body, not water baptism.

"Bond" means enslaved, and "free" means not enslaved.

Jewish believers, Gentile believers, slaves, and free people all enter one body equally.

No background or social status changes how someone joins this body.

🕊️ This baptism means joining by the Spirit

⛓️ Bond means enslaved, free means not

🌍 Every background enters the same body

📖 Status never changes equal belonging

## 💧 And Have Been All Made To Drink Into One Spirit

Paul switches to a drinking picture here instead of a joining picture.

Everyone in the church shares one single source, like drinking from one well.

One Spirit fills every believer rather than handing out separate portions.

The whole church draws from that same supply.

💧 Drinking pictures a shared source

🌊 One Spirit fills every believer

🚫 No believer gets a separate portion

📖 The whole church draws from one supply

# FirstCorinthians 12:15-20
# 👂 If The Foot Or The Ear Should Speak
---
## 🦶 If The Foot Shall Say, Because I Am Not The Hand, I Am Not Of The Body

Paul imagines a foot complaining that it does not belong because it is not a hand.

That complaint sounds silly applied to an actual body.

Some Corinthians were making the same silly complaint about their place in the church.

Feeling different from another member never actually removes someone from the body.

🦶 The foot imagines it does not belong

😅 The complaint sounds silly in a body

🙋 Corinthians made this same complaint

📖 Difference never removes belonging

## 👂 And If The Ear Shall Say, Because I Am Not The Eye, I Am Not Of The Body

Paul repeats the same complaint using the ear and the eye instead.

Repeating the picture twice makes the absurdity impossible to miss.

Every part has a different job, not a different level of belonging.

The repetition itself is Paul's argument.

👂 The ear imagines the same complaint

👁️ Ear and eye have different jobs

🔁 Repeating the picture proves the point

📖 Different job, not different belonging

## 👁️ If The Whole Body Were An Eye, Where Were The Hearing

Paul pushes the picture further with a body made of only one part.

A body made entirely of eyes could never hear anything at all.

A body made entirely of ears could never smell anything either.

Variety among the parts is what makes a working body possible at all.

👁️ An all eye body could not hear

👂 An all ear body could not smell

🧩 Variety makes a working body possible

📖 Sameness would actually break the body

## 🙌 But Now Hath God Set The Members Every One Of Them In The Body

God himself placed every member exactly where it is.

No believer's role in the church happened by accident.

"As it hath pleased him" means God chose each placement on purpose.

That placement deserves trust rather than resentment.

🙌 God placed every member on purpose

🎯 No role in the church is accidental

❤️ God's pleasure guided every placement

📖 Placement deserves trust, not resentment

## 🧩 And If They Were All One Member, Where Were The Body

Paul circles back to the opening picture one final time.

A single member cannot form a body by itself.

Many members working together is exactly what makes one body possible.

Difference and unity depend on each other instead of competing.

🧩 One member alone cannot be a body

🤝 Many members together form one body

⚖️ Difference and unity depend on each other

📖 Unity needs difference to even exist

# FirstCorinthians 12:21-26
# 🤲 No Member Stands Alone
---
## 👁️ The Eye Cannot Say Unto The Hand, I Have No Need Of Thee

Paul flips the earlier picture around here.

Before, a lesser part complained about not belonging.

Now a stronger part is tempted to dismiss a part it thinks it does not need.

Both attitudes damage the same body in different directions.

👁️ The eye is tempted to dismiss the hand

🔄 This flips the earlier complaint around

💔 Both attitudes damage the same body

📖 Pride and envy cause the same harm

## 💪 Nay, Much More Those Members Of The Body, Which Seem To Be More Feeble, Are Necessary

"Feeble" means weaker or less visibly strong.

Paul says the weaker looking parts are not less important.

They are actually more necessary than the obviously strong parts.

A church cannot afford to treat its quieter members as optional.

💪 Feeble means weaker looking parts

⭐ Weaker parts are called more necessary

🙇 Quiet members are not optional

📖 Importance is not the same as visibility

## 🧥 Those Members Of The Body, Which We Think To Be Less Honourable, Upon These We Bestow More Abundant Honour

Paul thinks of a body's less visible parts, the ones normally kept covered.

People naturally dress and protect those parts with extra care, not less.

The parts that get the least public attention often get the most careful treatment.

Churches should treat their less visible members the same way.

🧥 Less visible parts get extra care

👕 People dress hidden parts carefully

🙏 Little attention does not mean little care

📖 Churches should treat quiet members the same

## ⚔️ That There Should Be No Schism In The Body

"Schism" means a real split or division inside one body.

God designed the body so that no genuine split should ever form in it.

Instead every member should carry the same concern for every other member.

Shared care, not competition, is the design God intended.

⚔️ Schism means a real split

🚫 No real split should exist here

❤️ Members should share equal care

📖 Shared care is the actual design

## 🩹 And Whether One Member Suffer, All The Members Suffer With It

A healthy body feels pain or joy in one part as if it belonged to the whole body.

One believer's suffering should matter to the entire church, not just to that one person.

One believer's honor should bring joy to the entire church too.

This is what real unity actually looks like in daily life.

🩹 One member's pain affects the whole body

🎉 One member's honor brings shared joy

🤝 Suffering and joy are both shared

📖 Real unity shows up in daily life

# FirstCorinthians 12:27-31
# 🏛️ Many Offices, One Body
---
## 🏛️ Now Ye Are The Body Of Christ, And Members In Particular

Paul applies the entire body picture directly to the Corinthian church itself.

They are not simply like a body, they actually function as Christ's body.

"Members in particular" means each person has a specific, individual part to play.

This is not an abstract idea anymore, it is their own identity.

🏛️ The church is Christ's actual body

🙋 Each person has a specific part

🎯 This is their real identity

📖 The picture becomes personal here

## 📨 And God Hath Set Some In The Church, First Apostles, Secondarily Prophets, Thirdly Teachers

"Apostles" were those sent directly by Christ to found and guide the early church.

"Prophets" spoke fresh messages from God to that church.

"Teachers" explained and applied truth that had already been revealed.

God set up this order with real purpose, not by random chance.

📨 Apostles were sent directly by Christ

🗣️ Prophets delivered fresh messages

📘 Teachers explained revealed truth

📖 God ordered these roles on purpose

## 🤲 After That Miracles, Then Gifts Of Healings, Helps, Governments, Diversities Of Tongues

"Helps" named practical service that supported the church's daily needs.

"Governments" meant the gift of wise leadership and administration.

Miracles, healing, and tongues round out a long and varied list.

Paul mixes dramatic gifts with quiet, practical ones in the very same list.

🤲 Helps meant practical daily service

🧭 Governments meant wise leadership

✨ Miracles and healing round out the list

📖 Dramatic and quiet gifts sit together

## ❓ Are All Apostles? Are All Prophets? Are All Teachers? Are All Workers Of Miracles?

Paul asks a string of rhetorical questions with an obvious answer, no.

No single believer holds every gift at once.

That built in limitation is exactly what makes the whole body necessary.

Nobody was ever meant to function alone.

❓ Paul asks obvious rhetorical questions

🙅 No believer holds every gift

🧩 Limitation makes the body necessary

📖 Nobody functions alone in this design

## 🔥 But Covet Earnestly The Best Gifts

"Covet earnestly" means to desire something strongly and pursue it on purpose.

Paul tells believers to actively want the gifts that build the church up most.

This is not about jealousy toward another believer's gift.

It is about wanting to serve the church as well as possible.

🔥 Covet earnestly means desire strongly

🎯 Pursue gifts that build others up

🚫 Not jealousy of another's gift

📖 The goal is serving the church well

## 👉 And Yet Shew I Unto You A More Excellent Way

"Shew" means to point out or reveal.

Paul promises something even better than any single gift on the list.

Chapter thirteen answers that promise directly with a description of love.

Every gift Paul just listed means nothing without love behind it.

👉 Shew means to point out

🏆 Something better than any single gift

❤️ Chapter thirteen reveals that way

📖 Gifts without love mean nothing
`.trim();

export const FIRST_CORINTHIANS_TWELVE_PERSONAL_SECTIONS = parseFirstCorinthiansTwelveRawNotes(FIRST_CORINTHIANS_TWELVE_RAW_NOTES);
