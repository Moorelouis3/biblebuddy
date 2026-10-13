export type FirstCorinthiansFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansFourteenRawNotes(rawText: string): FirstCorinthiansFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 14:${startVerse}` : `1 Corinthians 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Corinthians 14 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_FOURTEEN_RAW_NOTES = `# FirstCorinthians 14:1-5
# 📣 Prophecy Outranks Tongues
---
## 🏃 Follow After Charity

"Follow after" means to chase something down, not to wait for it.

Chapter thirteen just finished describing exactly what love looks like in action.

Paul now tells the Corinthians to go after that same love on purpose.

Desiring a spiritual gift still matters, but love comes first in this sentence.

🏃 Follow after means actively chasing

🎯 Chapter thirteen already defined this love

💞 Love comes before any gift

➡️ Pursuing love takes real effort

## 🙏 Desire Spiritual Gifts

"Desire" means setting your heart eagerly on something.

Paul already spent all of chapter twelve ranking these gifts by how showy they looked.

Here he redirects that same eagerness toward gifts that actually build up the church.

Wanting a gift is not wrong.

Wanting the right gift is what matters most.

🙏 Desire means eagerly reaching for

🏆 Chapter twelve ranked gifts by show

🏗️ Paul redirects that eagerness here

➡️ Wanting the right gift matters most

## 🗣️ Speaketh In An Unknown Tongue

The word "unknown" does not appear in the original Greek text.

The King James translators added it in italics to help readers.

Paul simply means a language the hearers in the room do not understand.

It could be a real human language or a Spirit given prayer language.

🗣️ Unknown was added by translators

📜 It is not in the Greek text

🌍 It means a language hearers do not know

📖 Could be human or Spirit given speech

## 📞 Speaketh Not Unto Men, But Unto God

A person praying in tongues is not talking to the people around them.

Their words go straight to God, who understands every language without translation.

Paul states this plainly here, not as a criticism.

It simply explains why no one else in the room understands what is said.

📞 Tongues speak directly to God

🌐 God understands every language already

🙅 Paul states this, not as criticism

➡️ Explains why the room cannot understand

## 🔐 In The Spirit He Speaketh Mysteries

"Mysteries" here does not mean something scary or secret in a bad way.

Paul uses this word elsewhere for truths about God that stayed hidden until God revealed them.

Someone praying in tongues may be speaking real truths about God.

The problem is nobody else in the room can understand a word of it.

🔐 Mysteries means hidden truth revealed by God

📚 Paul uses this word elsewhere too

🗣️ The words may hold real truth

➡️ Nobody else can understand them though

## 🏗️ Edification, And Exhortation, And Comfort

Prophecy does three specific things for the people listening.

"Edification" means building the whole group up, like adding to a structure.

"Exhortation" means urging someone forward to actually act.

"Comfort" means steadying someone who is struggling or afraid.

🏗️ Edification means building people up

📣 Exhortation means urging someone forward

🤗 Comfort means steadying someone afraid

➡️ Prophecy does all three at once

## 🙋 Edifieth Himself

Someone praying in tongues privately strengthens only their own faith.

That benefit is real, and Paul never calls it worthless.

It simply stops at one person instead of reaching the room.

Prophecy, by contrast, reaches everyone listening at once.

🙋 Edifies the speaker alone

✅ That benefit is still real

🚪 It stops at one person

➡️ Prophecy reaches the whole room

## 🏛️ Edifieth The Church

"The church" here means the whole gathered group of believers meeting together.

Prophecy speaks a message everyone in the room can actually follow.

One person's faith grows, and so does everyone else's at the same time.

That wider reach is exactly why Paul prefers it for public worship.

🏛️ Church means the whole gathered group

📈 Everyone's faith grows together here

🤝 Not just one person benefits

📖 Paul prefers this gift in public worship

## 🔑 Except He Interpret

Paul does not forbid tongues here, he sets one condition on them.

"Interpret" means translating the message into words everyone can understand.

Without that translation, the gift stays locked to one person alone.

With it, the whole church can receive the same edifying benefit.

🔑 Interpret means translating the message

🔒 Without it, the gift stays locked

🔓 With it, everyone can benefit

📖 Translation unlocks edifying for the church

# FirstCorinthians 14:6-12
# 🎺 Sound Without Meaning
---
## 🔮 By Revelation, Or By Knowledge, Or By Prophesying, Or By Doctrine

Paul names four ways he could speak that the Corinthians would actually understand.

"Revelation" means a truth God shows him directly in the moment.

"Prophesying" means delivering a message in plain, understandable words.

"Doctrine" means teaching that lays out truth clearly for the room.

Any of these four would profit the church more than tongues alone.

🔮 Revelation means a truth shown directly

📚 Knowledge means understanding God has taught

📣 Prophesying and doctrine both teach plainly

➡️ Any of these profits more than tongues

## 🎶 Pipe Or Harp

A pipe and a harp were two of the most common instruments in the ancient world.

Both can make music, or they can make meaningless noise.

Everything depends on whether the notes form a clear, recognizable tune.

Paul uses ordinary instruments everyone in Corinth had heard before.

🎶 Pipe and harp were common instruments

🔊 Notes can form music or noise

👂 Clarity depends on the pattern played

➡️ Paul picks instruments everyone knew well

## 📯 The Trumpet Give An Uncertain Sound

Ancient armies used trumpet calls to signal exact commands during battle.

Advance, retreat, and assemble each sounded different.

A soldier who heard a confused, uncertain blast would not know what to do.

Paul picks the one sound every Corinthian man would recognize instantly.

📯 Trumpets signaled exact battle commands

⚔️ Advance, retreat, and assemble sounded different

❓ An uncertain blast left soldiers confused

➡️ Everyone recognized this sound instantly

## 💨 Speak Into The Air

This phrase was already a common saying for wasted, pointless talk.

Words spoken into the air reach no one and land nowhere.

Paul says that is exactly what unclear tongues sound like to the room.

The problem is not the gift itself, it is nobody understanding it.

💨 Speaking into air means wasted words

🚫 The words reach no one at all

🗣️ This describes unclear tongues exactly

➡️ The problem is understanding, not the gift

## 🌍 So Many Kinds Of Voices In The World

Paul points out something obvious, the world is full of different languages.

Every one of those languages carries real meaning to its own speakers.

None of them is actually meaningless, even if a listener cannot follow it.

The issue is always the hearer's understanding, never the language itself.

🌍 The world holds many real languages

🗣️ Each one carries meaning to someone

👂 The hearer's understanding is the real issue

📖 No language is meaningless on its own

## 🗿 I Shall Be Unto Him That Speaketh A Barbarian

"Barbarian" did not originally mean savage or uncivilized the way it does today.

The Greek word imitated the sound of foreign speech, "bar bar bar."

It simply meant someone whose words sounded like noise instead of language.

That is exactly how two confused speakers sound to each other today.

🗿 Barbarian once just meant unintelligible speech

🔁 The word imitated meaningless sounding noise

👥 It described any unfamiliar foreign speaker

➡️ Two confused speakers sound that way still

## 🏆 Excel To The Edifying Of The Church

"Excel" means to be rich in something, to have plenty of it.

Paul is not telling the Corinthians to want less, he is redirecting their wanting.

Chapter twelve already showed how zealous this church was for spiritual gifts.

That same zeal, aimed at building up others, is exactly what Paul wants.

🏆 Excel means being rich in something

🔄 Paul redirects their zeal, not removes it

🙌 Corinth already had plenty of zeal

➡️ Aim that zeal at building others up

# FirstCorinthians 14:13-19
# 🙏 Pray With The Understanding Too
---
## 🗝️ Pray That He May Interpret

Paul circles back to the condition he already named earlier in this chapter.

Someone praying in an unknown tongue should also ask God for its meaning.

That second request turns a private prayer into something the whole room can share.

Paul is not canceling the gift, he is completing it.

🗝️ Paul repeats this same condition

🙏 Ask God for the meaning too

🤝 This turns private prayer into shared prayer

➡️ Interpretation completes the gift, not cancels it

## 🧠 My Understanding Is Unfruitful

Paul separates two parts of a person, the spirit and the understanding.

"Spirit" here means the part of him praying under the Holy Spirit's power.

"Understanding" means his own mind, the part that can explain things in words.

When he prays in tongues, only the first part is doing any work.

🧠 Understanding means his own thinking mind

💨 Spirit means the part praying by power

⚙️ Only one part works during tongues

➡️ The mind stays idle the whole time

## ⚖️ Pray With The Spirit, And Pray With The Understanding Also

Paul is not choosing one over the other here, he wants both.

Praying only in tongues leaves half of a person completely silent.

Praying only with words can miss the Spirit's own leading entirely.

Paul asks for prayer that uses the whole person, not half of one.

⚖️ Paul wants both, not either

🤐 Tongues alone leaves the mind silent

🚫 Words alone can miss the Spirit

➡️ Real prayer uses the whole person

## 👥 He That Occupieth The Room Of The Unlearned

"The unlearned" means a visitor or newcomer who does not yet understand what is happening.

Paul pictures this person sitting in the gathering, listening along with everyone else.

If nobody translates the tongue, this visitor cannot follow a single word of it.

Paul keeps asking the Corinthians to think about who is actually in the room.

👥 Unlearned means a confused newcomer

🚪 This person is sitting right there

❓ Untranslated tongues leave them lost

➡️ Paul keeps the visitor in mind

## 🙌 Say Amen At Thy Giving Of Thanks

"Amen" was already the normal way a congregation agreed out loud with a prayer.

It is a Hebrew word that means "so be it" or "it is true."

Saying it required actually following what was prayed well enough to agree with it.

An untranslated prayer makes that simple, shared response impossible for everyone else.

🙌 Amen means so be it, agreed

🕍 This was the normal worship response

👂 It required following the prayer first

➡️ Untranslated prayer blocks this response

## 🗣️ I Speak With Tongues More Than Ye All

Paul is not an outsider attacking a gift he does not have or understand.

He claims more experience with tongues than anyone he is correcting.

That claim gives his next instructions real weight instead of sounding like jealousy.

Paul corrects this gift as someone who values it, not someone who resents it.

🗣️ Paul claims this gift himself

💪 He has more experience than them

⚖️ This removes any charge of jealousy

➡️ He corrects it as a friend

## 🔢 Five Words... Than Ten Thousand Words In An Unknown Tongue

Paul uses an obvious exaggeration here on purpose, nobody actually counts that high.

The huge gap between five and ten thousand makes his point impossible to miss.

A tiny amount of understood speech outweighs an enormous pile of confusing speech.

Quantity was never the goal in Corinth's worship, clarity always was.

🔢 Five versus ten thousand is exaggeration

📏 The huge gap makes the point obvious

🪶 A little clarity outweighs a lot of noise

📖 Clarity was always the real goal

# FirstCorinthians 14:20-25
# 🚪 A Sign For Those Outside
---
## 👶 Be Not Children In Understanding

Paul already compared the Corinthians to infants earlier in this letter.

A child gets fascinated by whatever looks exciting or new in the moment.

Tongues had become exactly that kind of exciting new toy in Corinth.

Paul calls them to grow up and think about this gift more carefully.

👶 Paul already called them infants before

✨ Tongues had become an exciting new toy

🧠 Children chase whatever looks exciting

➡️ Paul calls them to think like adults

## 📜 In The Law It Is Written

Paul quotes an old prophecy from the book of Isaiah here.

Isaiah warned that God would one day speak to Israel through foreign invaders' strange tongues.

That strange language was a sign of judgment on a people who refused to listen.

Paul reuses that same old warning for a brand new reason.

📜 Paul quotes an old Isaiah prophecy

🌍 Foreign tongues once signaled judgment

🙉 It punished a people who would not listen

➡️ Paul reuses this warning in a new way

## 🚩 Tongues Are For A Sign

Paul applies that old warning directly to what is happening in Corinth now.

Unexplained tongues, like that old foreign speech, mark unbelief instead of faith.

They were never meant to impress believers who already trust God.

Prophecy does the opposite work, reaching people who do not yet believe.

🚩 Tongues once signaled unbelief, not status

🙅 Not meant to impress believers

📣 Prophecy reaches unbelievers instead

➡️ The two gifts work in opposite directions

## 😵 Will They Not Say That Ye Are Mad

Nearby pagan shrines were already famous for frenzied, babbling style worship.

Outsiders expected that kind of chaos from pagan temples, not from a church.

A visitor walking into confused, unexplained tongues could easily mistake Corinth for one of those temples.

That confusion was exactly what chapter twelve had already warned against.

😵 Pagan shrines were known for frenzy

🏛️ Outsiders expected chaos from pagan temples

👀 Confusion could make the church look the same

➡️ Chapter twelve already warned about this

## ⚖️ He Is Convinced Of All, He Is Judged Of All

"Convinced" here means convicted, not simply persuaded by a clever argument.

An unbeliever hearing clear prophecy feels truly exposed, not merely impressed.

"Judged" describes that same feeling of being seen and evaluated honestly.

Clear prophecy can do something tongues never manage to do for a visitor.

⚖️ Convinced means convicted, not persuaded

👁️ The unbeliever feels truly seen

📣 Clear prophecy reaches deeper than tongues

➡️ Prophecy can expose a visitor's own heart

## 💔 The Secrets Of His Heart Made Manifest

"Manifest" means brought out into the open where everyone can see it.

Prophecy can name something true about a visitor that they never said out loud.

That moment can feel exposing in a way no clever speech ever could.

It is also the moment that turns a visitor toward worshiping God.

💔 Manifest means brought into the open

👁️ Prophecy can name hidden truth

😳 This feels far more exposing

📖 It can turn a visitor to worship

# FirstCorinthians 14:26-33
# 🗂️ Order In The Gathering
---
## 📋 Hath A Psalm, Hath A Doctrine, Hath A Tongue, Hath A Revelation, Hath An Interpretation

Paul pictures an ordinary Corinthian service with five different things happening at once.

A psalm meant a song sung out loud to the group.

Doctrine meant plain teaching anyone could follow and apply.

A tongue meant Spirit given speech in an unfamiliar language.

Revelation meant a fresh truth shown in the moment.

Interpretation meant translating a tongue into clear words.

📋 Five different gifts, all active at once

🎵 A psalm meant a sung song

📣 Doctrine meant plain teaching for the room

➡️ This room was already full of gifts

## 🏗️ Let All Things Be Done Unto Edifying

This line states the one goal behind every single instruction in this chapter.

"Edifying" means building people up, the same word used all through this letter.

Every gift Paul names gets measured against this one same question.

Does it actually build someone else up, or does it only serve the speaker.

🏗️ Edifying means building people up

🎯 This is the chapter's one real goal

⚖️ Every gift gets measured by it

📖 Building others up outranks showing off

## 🔢 By Two, Or At The Most By Three

Paul sets a firm numeric limit on how many people speak in tongues per gathering.

"By course" means taking turns, one after another instead of all at once.

A limit like this keeps the service from turning into noisy chaos.

Order here protects everyone's ability to actually follow what is happening.

🔢 A firm limit, two or three

🔁 By course means taking turns

🤫 This limit prevents noisy chaos

➡️ Order protects everyone's understanding

## 🤐 Let Him Keep Silence In The Church

This silence is conditional, it only applies when no interpreter is present.

Paul never bans tongues outright anywhere in this whole letter.

He simply redirects an untranslated prayer into something private instead of public.

"Speak to himself, and to God" means that same prayer is still welcome privately.

🤐 This silence is only conditional

🚫 Paul never bans tongues outright

🔄 He redirects it toward private prayer

➡️ Private prayer in tongues stays welcome

## 👂 Let The Other Judge

"Judge" here means testing a prophecy, not condemning the person who gave it.

The whole congregation shared responsibility for checking what was said.

No single prophet in Corinth got to speak without any accountability at all.

This same testing instruction shows up again in Paul's other letters.

👂 Judge means testing, not condemning

🏛️ The whole congregation shared this duty

🔍 No prophet spoke without accountability

📖 Paul repeats this instruction elsewhere

## ✋ Let The First Hold His Peace

Paul pictures a second person suddenly receiving something during someone else's turn.

Even a real, Spirit given revelation does not get to interrupt someone else.

The first speaker simply pauses and makes room for the second.

Urgency never excuses rudeness in Paul's picture of worship.

✋ The first speaker simply pauses

⏸️ Even real revelation can wait its turn

🤝 Room gets made for the next person

➡️ Urgency never excuses rudeness here

## 🧘 The Spirits Of The Prophets Are Subject To The Prophets

Many pagan shrines nearby believed their prophets lost control during worship.

Worshipers pictured a god taking over completely.

The person was imagined as just along for the ride.

Paul insists true prophecy never works that way at all.

A real prophet stays in control the whole time, free to stop or wait.

🧘 Pagan prophets were thought to lose control

😮 Worshipers pictured being taken over completely

✅ True prophets stay fully in control

➡️ A real gift never overrides the person

## ☮️ God Is Not The Author Of Confusion, But Of Peace

This line names the problem directly, Corinth's services had grown confusing and chaotic.

God's own character stands against that kind of confusion on principle.

"Peace" here means an ordered calm, not simply an absence of noise.

Every instruction in this whole chapter flows out of this one claim about God.

☮️ Confusion contradicts God's own character

🤫 Corinth's services had grown chaotic

🧘 Peace means ordered calm, not silence

📖 This verse explains the whole chapter

# FirstCorinthians 14:34-36
# 🤫 Let Your Women Keep Silence
---
## 🤫 Let Your Women Keep Silence In The Churches

This is one of the most debated instructions Paul ever wrote.

Chapter eleven already assumed women could pray and prophesy out loud in this same church.

Many scholars believe this silence addresses disruptive talking, not all speech of every kind.

The exact kind of talking Paul has in mind is not fully spelled out here.

🤫 One of Paul's most debated lines

🙋 Chapter eleven already allowed women praying aloud

❓ Many read this as disruptive talking

➡️ The text leaves the exact scope unclear

## 📖 As Also Saith The Law

Paul does not name the exact passage he means by "the law" here.

Many point back to the created order described early in Genesis.

The text itself does not spell out which law Paul has in mind.

Admitting that gap honestly beats guessing past it.

📖 The exact law named is not given

🌱 Many point back to Genesis

❓ The text does not spell it out

➡️ Honesty here beats a confident guess

## 🏠 Let Them Ask Their Husbands At Home

Ancient synagogues often seated men and women in separate sections during instruction.

Calling out a question across that divide would have interrupted the whole service.

Paul redirects that question to a quieter setting instead of banning it outright.

This fits the chapter's larger theme of controlling who speaks and when.

🏠 Home becomes the quieter setting

🕍 Synagogues often seated men and women apart

🙋 A shouted question would have interrupted

➡️ This fits the chapter's theme of order

## ❓ What? Came The Word Of God Out From You?

Paul suddenly turns sharp and sarcastic in this one line.

He asks whether Corinth invented God's word or merely received it like every other church.

This same prideful attitude shows up again and again across this whole letter.

Paul is reminding Corinth that they do not get to write their own rules.

❓ Paul turns sharply sarcastic here

🏆 He asks if Corinth invented God's word

🔁 This pride shows up throughout the letter

➡️ Corinth does not write its own rules

# FirstCorinthians 14:37-40
# ✅ Decently And In Order
---
## 👑 The Commandments Of The Lord

Paul is not offering a personal suggestion here, he claims real authority.

Anyone who truly has a spiritual gift should recognize that authority immediately.

These instructions come from the Lord, not from Paul's personal preference.

That claim raises the stakes on everything written earlier in this chapter.

👑 Paul claims real apostolic authority

🙏 A true prophet should recognize it

📜 These rules come from the Lord

➡️ This raises the stakes on the chapter

## 🤷 If Any Man Be Ignorant, Let Him Be Ignorant

Some manuscripts read this slightly differently, "let him be recognized as ignorant."

Either way, Paul is talking about someone who refuses his authority here.

He does not argue further with someone determined to reject his instructions.

Paul simply leaves that person to their own willful ignorance.

🤷 A manuscript variant reads this slightly differently

🙅 This describes refusing Paul's authority

🚫 Paul does not argue further here

➡️ He leaves that person to themselves

## 🎯 Covet To Prophesy, And Forbid Not To Speak With Tongues

Paul closes by restating both halves of his whole argument at once.

Prophecy still gets first priority, exactly as verse one already said.

Tongues never get banned outright anywhere in this entire chapter.

Both gifts stay welcome, just properly ordered within the gathering.

🎯 Prophecy still ranks first priority

🗣️ Tongues are never actually banned

⚖️ Both gifts stay properly ordered

📖 This restates the whole chapter's argument

## ✅ Let All Things Be Done Decently And In Order

"Decently" translates a Greek word meaning fitting or becoming, done the right way.

"Order" translates a word borrowed from military ranks lined up in their proper place.

Paul closes an entire chapter about chaotic worship with one simple picture.

Every gift has its proper place, like soldiers standing in formation.

✅ Decently means done the fitting way

⚔️ Order borrows a military ranking word

🪖 Gifts should stand like soldiers in formation

📖 This closes the whole chapter's argument
`.trim();

export const FIRST_CORINTHIANS_FOURTEEN_PERSONAL_SECTIONS = parseFirstCorinthiansFourteenRawNotes(FIRST_CORINTHIANS_FOURTEEN_RAW_NOTES);
