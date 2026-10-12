export type ActsTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentySixRawNotes(rawText: string): ActsTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 26:${startVerse}` : `Acts 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 26 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_SIX_RAW_NOTES = `# Acts 26:1-3
# 🎤 Paul Takes The Floor Before Agrippa
---
## 🎤 Thou Art Permitted To Speak For Thyself

A Roman hearing did not let an accused man speak whenever he felt like it.

Agrippa is the one granting permission here, not Festus.

Festus had already handed this case to a king who understood Jewish law far better than he did.

Everything Paul says next depends on this one formal nod to begin.

🎤 Permission had to be formally granted
👑 Agrippa controls the floor, not Festus
📜 Festus leaned on Agrippa's Jewish knowledge
📖 One nod lets the whole defense begin

## ✋ Paul Stretched Forth The Hand

This was not a casual wave.

Ancient public speakers used this exact gesture to call a room to attention before beginning a formal speech.

Paul is stepping into the posture of a trained orator, not a frightened prisoner.

He has one chance to speak and he takes it seriously.

✋ The gesture called for attention
🎓 Trained speakers used this same move
🛡️ Paul stands like an orator, not a victim
➡️ He treats this chance as serious

## 😊 I Think Myself Happy, King Agrippa

Opening a speech with a compliment to the judge was standard practice in Roman and Greek courtrooms.

Paul is not groveling here.

Paul genuinely feels more at ease in front of Agrippa than he did in front of Festus.

A king who actually understood the background of the case was rare and welcome.

😊 A respectful opening was standard practice
🎓 This was not empty flattery
👑 Agrippa understood the case better than Festus
📖 A fair judge was worth genuine relief

## 📚 Expert In All Customs And Questions Which Are Among The Jews

Agrippa's family had ruled parts of Judea for generations and still managed parts of temple life.

Unlike Festus, who openly admitted he was confused by Jewish religious disputes, Agrippa actually knew this world.

Paul picks his audience carefully here.

He is finally speaking to someone who can follow every detail without a translator for the culture itself.

📚 Agrippa's family knew Jewish affairs well
😕 Festus had openly admitted confusion
🎯 Paul finally has a knowledgeable judge
➡️ The right audience changes everything

## 🙏 I Beseech Thee To Hear Me Patiently

"Beseech" is an old word that means to beg earnestly.

Paul is not simply asking for time.

He is asking Agrippa to stay patient through a long story.

That request signals how much ground this defense is about to cover.

A short answer was never going to be enough here.

🙏 Beseech means to beg earnestly
⏳ Paul warns this will take real time
📜 The defense covers a lot of ground
➡️ Some stories cannot be told quickly

# Acts 26:4-5
# 📖 Paul's Life Among His Own Nation
---
## 📖 My Manner Of Life From My Youth

Paul starts his defense with his own history, not with theology.

Establishing personal credibility before making any claim was a normal first move in ancient rhetoric.

He wants Agrippa to judge the man before judging the message.

Nobody can call this a stranger's story.

📖 Paul opens with his own history
🎓 Credibility came before any argument
👤 He wants to be judged as a person
➡️ This is not a stranger's claim

## 👥 Which Knew Me From The Beginning, If They Would Testify

Paul is pointing to living witnesses who could confirm every word.

He grew up visible, in Jerusalem, among people who are still around to check his story.

This is not a claim made where nobody can verify it.

Paul is inviting scrutiny, not avoiding it.

👥 Living witnesses could confirm his story
🏙️ He grew up visibly in Jerusalem
🔍 Paul invites real scrutiny here
📖 Truth does not fear a witness

## 🎓 After The Most Straitest Sect Of Our Religion

"Straitest" is an old word for strictest, not a misspelling of straight.

The Pharisees held the tightest standard of religious discipline within Judaism at the time.

Paul is not claiming a loose or casual upbringing.

He is claiming the most demanding path available in his faith.

🎓 Straitest means strictest, not straight
⚖️ Pharisees held the tightest standard around
📏 Paul claims the hardest path available
➡️ This was discipline, not a casual habit

## 🕊️ I Lived A Pharisee

Being a Pharisee meant more than holding an opinion.

It meant a daily life built entirely around careful law keeping and tradition.

Paul is not describing a title he once held on paper.

He is describing years of lived practice before any of this began.

🕊️ Pharisee meant a full way of life
📅 It shaped Paul's daily practice for years
📜 This was lived, not just believed
📖 His past makes his change impossible to ignore

# Acts 26:6-8
# 🌅 The Hope That Put Him On Trial
---
## ⚖️ I Stand And Am Judged For The Hope Of The Promise

Paul reframes the entire trial in one line.

He is not on trial for a crime against Rome or the temple.

He is on trial for believing the very promise God made to Abraham and the other patriarchs long ago.

The charge against him is really a disagreement about hope itself.

⚖️ Paul reframes the whole trial here
📜 The promise traces back to the patriarchs
❓ The real charge is about hope, not crime
📖 Disagreement over hope put him here

## 🔢 Our Twelve Tribes

By this point in history, most of Israel's twelve tribes had been scattered for centuries by foreign conquest.

Jews still spoke of twelve tribes as one complete nation.

The reality on the ground was far more broken than that language suggested.

Paul uses that same unbroken language on purpose.

The promise was always meant for the whole nation, not a surviving remnant alone.

🔢 Twelve tribes names the whole nation
💔 Most tribes had long been scattered
🗣️ Jews still spoke of them as one
➡️ The promise reached further than the remnant

## 🙌 Instantly Serving God Day And Night

"Instantly" here does not mean immediately, it means earnestly and without letting up.

Paul is describing devoted, ongoing worship, not a quick burst of religious energy.

This describes the whole Jewish nation's posture toward the promise, not just Paul's own habits.

Everyone in that room would have recognized that devotion.

🙌 Instantly means earnest, not immediate
🕯️ This describes ongoing, steady worship
🌍 The whole nation shared this posture
📖 Devotion to the promise was common ground

## ❓ Why Should It Be Thought A Thing Incredible With You, That God Should Raise The Dead

Paul turns a personal defense into a direct challenge to the room.

The real issue on trial has never been Paul's conduct.

It is whether a resurrection from the dead is something God could actually do.

Paul puts that question to everyone listening, not just to Agrippa.

❓ Paul challenges the whole room directly
🎯 The real issue is resurrection, not conduct
🙋 He asks what God is able to do
➡️ One question exposes the entire disagreement

# Acts 26:9-11
# 🔥 Paul Confesses His Own Violence
---
## 😳 I Verily Thought With Myself

"Verily" is an old word for truly.

Paul is admitting that his persecution of the church was not a performance or a job he hated.

He genuinely believed, with his whole mind, that it was the right thing to do.

A sincere wrong conviction is still a dangerous one.

😳 Verily means truly, with full honesty
🧠 Paul believed he was doing right
⚠️ Sincere belief can still be wrong
📖 Conviction alone never guarantees truth

## ⛓️ Many Of The Saints Did I Shut Up In Prison

"Saints" here simply means the early followers of Jesus, not people later recognized for holiness.

Paul admits he personally imprisoned them, not just approved of someone else doing it.

He also admits having a direct hand in their deaths.

This is Paul naming his own record without softening it.

⛓️ Saints means ordinary early believers
🔒 Paul imprisoned them himself
💀 He had a hand in their deaths
➡️ Paul names his own record plainly

## 🗳️ I Gave My Voice Against Them

This phrase describes formally voting or speaking in favor of a death sentence.

Paul was not a distant bystander to these killings.

He actively supported the outcome with his own words.

That detail makes his later change even harder to explain away as a small shift in opinion.

🗳️ This means voting for a death sentence
🙅 Paul was no distant bystander here
🗣️ He actively supported these deaths
📖 This was no small change of opinion

## 😡 Compelled Them To Blaspheme

"Compelled" means forced, often through real pressure or pain.

Paul tried to force believers to curse the name of Jesus out loud.

Forcing someone to say words against their own conscience is a particularly cruel form of pressure.

This detail shows how far Paul's zeal had actually gone.

😡 Compelled means forced under real pressure
🗣️ He forced believers to curse Christ's name
💔 Forcing words against conscience is cruel
➡️ Zeal had carried Paul this far

## 🗺️ Persecuted Them Even Unto Strange Cities

"Strange cities" means foreign towns outside Judea itself.

Paul did not stop at his own region once he started.

He actively traveled to chase believers down somewhere else.

This was deliberate pursuit, not a local overreaction that stayed in one place.

🗺️ Strange cities means towns outside Judea
🚶 Paul traveled to continue the chase
🎯 This was deliberate, planned pursuit
📖 His zeal crossed real distance

# Acts 26:12-18
# ☀️ The Light On The Damascus Road
---
## 📜 With Authority And Commission From The Chief Priests

Paul was not acting alone or outside his authority on this trip.

The chief priests had formally approved his mission to arrest believers in Damascus.

This detail matters because it shows the persecution was organized, not a lone man's grudge.

An entire religious system stood behind what Paul was about to do.

📜 Paul carried official priestly approval
🏛️ The persecution was organized, not personal
🚫 This was no lone grudge
➡️ A whole system backed this mission

## ☀️ At Midday, A Light From Heaven Above The Brightness Of The Sun

"Midday" rules out any explanation involving darkness, shadows, or tired eyes.

The light Paul describes was brighter than the sun itself, in the middle of a clear day.

This detail protects the story from being explained away as some trick of low light.

Whatever happened next, it happened in the open, under full daylight.

☀️ Midday means broad daylight, no shadows
💡 Brighter than the sun at noon
🚫 This rules out a trick of light
📖 The event happened in plain view

## 🐴 Shining Round About Me And Them Which Journeyed With Me

This light did not strike Paul alone.

Everyone traveling with him that day saw it too.

A private vision could be dismissed as one man's imagination.

A shared experience among several witnesses could not be explained away so easily.

🐴 Others on the road saw it too
🙅 This was not Paul's imagination alone
👥 Shared witnesses are harder to dismiss
➡️ Multiple eyes confirmed one event

## 🗣️ Saying In The Hebrew Tongue, Saul, Saul

Jesus speaks to Paul in Hebrew, Paul's own native language, not in Greek or Latin.

Calling someone's name twice in scripture usually marks a deeply personal, urgent moment.

God used this same pattern with Abraham and with Samuel in earlier parts of the Bible.

This was not a general announcement, it was aimed directly at one man.

🗣️ Hebrew was Paul's own native tongue
🔁 Doubled names mark urgent, personal moments
📜 Abraham and Samuel heard this same pattern
📖 This word was aimed at one man alone

## 🐂 It Is Hard For Thee To Kick Against The Pricks

"Pricks" were sharp goads farmers used to steer oxen.

An ox that kicks back against the goad only hurts its own foot.

The phrase pictures Paul fighting something that was only going to wound himself in the end.

Resisting God was never going to protect Paul, it was only going to cost him.

🐂 Pricks were sharp farm goads
🦶 A kicking ox only hurts itself
⚠️ Paul was only harming himself by resisting
➡️ Fighting God never protects the one resisting

## ✝️ I Am Jesus Whom Thou Persecutest

Jesus does not say the church, he says Jesus.

Attacking believers and attacking Christ himself are treated here as the exact same act.

This line reframes every arrest Paul ever made.

He was never just fighting a religious movement, he was fighting its living head.

✝️ Jesus names himself, not the church
🤝 Attacking believers means attacking Christ
🔄 Every past arrest gets reframed here
📖 The church and its head cannot be separated

## 🕊️ To Make Thee A Minister And A Witness

A minister here means someone sent to serve on God's behalf.

A witness means someone who testifies to what he has personally seen.

Paul is being given both roles at once, in the same breath that stops his violence.

The man built to destroy the church is being rebuilt to speak for it.

🕊️ Minister means one sent to serve
👁️ Witness means one who testifies firsthand
🔄 Both roles arrive in a single moment
➡️ The destroyer becomes the messenger

## 🌍 Delivering Thee From The People, And From The Gentiles

"The people" here means the Jewish nation, set apart from "the Gentiles," everyone else.

Paul's mission is named clearly as reaching both groups, not just one.

This single sentence sets up the rest of his entire ministry in the book of Acts.

Nobody is left outside the reach of this calling.

🌍 The people means the Jewish nation
🌐 Gentiles means everyone outside that nation
📘 This sets up the rest of Acts
📖 Nobody is left outside the calling

## 👁️ To Open Their Eyes, And To Turn Them From Darkness To Light

This describes conversion as a shift from blindness to actual sight.

Darkness to light and the power of Satan to God are the same shift described two different ways.

Paul is not offering a small moral upgrade.

He is describing a complete change in direction and ownership.

👁️ Open their eyes means given real sight
🌓 Darkness to light pictures the same shift twice
🔄 This is a complete change, not a tweak
➡️ Ownership itself changes hands here

## 🏛️ Sanctified By Faith That Is In Me

"Sanctified" means set apart as belonging to God.

This inheritance is not earned through personal effort or background.

It comes through faith placed in Jesus specifically, named here by Jesus himself.

The whole commission ends on the one thing that actually makes any of it possible.

🏛️ Sanctified means set apart for God
🎁 This inheritance is not earned by effort
🙏 Faith in Jesus is the actual key
📖 Everything in this calling rests on faith

# Acts 26:19-23
# 🗣️ Why Paul Could Not Stay Silent
---
## 🙏 Not Disobedient Unto The Heavenly Vision

Paul ties his entire ministry back to this one moment on the Damascus road.

Everything that follows is presented as simple obedience to what he was shown and told.

He is not claiming some separate, personal ambition.

He is claiming he did exactly what he was instructed to do.

🙏 Everything traces back to one vision
📜 Paul claims obedience, not ambition
🎯 He did what he was told
➡️ Obedience explains his whole ministry

## 🌍 Shewed First Unto Them Of Damascus, At Jerusalem, Then To The Gentiles

"Shewed" is an old spelling of showed, meaning preached or declared openly.

Paul lists his ministry in careful geographic order, Damascus first, then Jerusalem, then outward to the Gentiles.

This same expanding pattern was already promised earlier in the book of Acts.

Paul's actual ministry followed the exact shape Jesus laid out from the very beginning.

🌍 Shewed means declared or preached openly
🗺️ The order moves outward step by step
📘 This matches an earlier promise in Acts
📖 His ministry followed the plan exactly

## 🌱 Works Meet For Repentance

"Meet" here is an old word for fitting or appropriate.

Paul is not satisfied with people merely feeling sorry.

He expects their actions afterward to actually match that change of heart.

Real repentance shows up in behavior, not only in private feeling.

🌱 Meet means fitting or appropriate
💭 Feeling sorry alone is not enough
🔧 Behavior must match the change of heart
➡️ Real repentance always shows up in action

## 🏛️ The Jews Caught Me In The Temple, And Went About To Kill Me

This is the same riot already described back in chapter twenty one.

Paul is connecting his current trial directly to that earlier near lynching in the temple courts.

Years of legal proceedings all trace back to that one chaotic afternoon.

Nothing happening now is disconnected from that original moment.

🏛️ This recalls the riot from chapter twenty one
⚔️ That moment nearly ended in a lynching
📅 Years of trials trace back to it
📖 Nothing here is a new, separate event

## 👥 Witnessing Both To Small And Great

This phrase means Paul preached to everyone, regardless of rank or importance.

Beggars and governors both received the same message from him.

Paul draws no line between who deserves to hear the gospel and who does not.

Status never changed what Paul was willing to say.

👥 Small and great means every rank included
🤝 Beggars and governors heard the same message
🚫 No one was excluded by status
➡️ The message never bent to rank

## 📜 None Other Things Than Those Which The Prophets And Moses Did Say

Paul insists he invented nothing new.

He frames the resurrection of Jesus as the fulfillment of promises already written long before he was born.

This claim matters because it ties Christianity directly to Israel's own scriptures, not to some separate new religion.

Paul sees continuity where his accusers saw betrayal.

📜 Paul claims no new invention here
📘 He ties this to Moses and the prophets
🔗 This connects to scripture, not a new faith
📖 Continuity, not betrayal, is Paul's claim

## ✨ The First That Should Rise From The Dead

Others in scripture were raised back to life only to die again later.

Paul describes Christ's resurrection as something different in kind.

It is the first of a resurrection that never ends in death again.

This is the center of the whole gospel message Paul keeps repeating throughout this defense.

Everything else Paul says depends on this one claim being true.

✨ Earlier raised people eventually died again
🔄 Christ's resurrection ends death for good
🎯 This sits at the center of Paul's message
📖 The whole defense rests on this one fact

# Acts 26:24-29
# 👑 Festus Mocks, Agrippa Hesitates
---
## 😤 Paul, Thou Art Beside Thyself

"Beside thyself" is an old idiom meaning out of one's mind.

Festus interrupts Paul mid sentence with this blunt accusation.

A Roman official hearing resurrection claims for the first time reaches for the simplest explanation available to him, madness.

Festus is not trying to insult Paul personally, he genuinely cannot process what he is hearing.

😤 Beside thyself means out of one's mind
🛑 Festus cuts Paul off mid sentence
🤷 Madness felt like the simplest explanation
➡️ Confusion, not cruelty, drives this outburst

## 📚 Much Learning Doth Make Thee Mad

Festus offers his own theory on the spot.

He assumes too much study and too much thinking finally broke Paul's grip on reality.

This line reveals more about Festus than about Paul.

A man who cannot follow the argument assumes the speaker has lost the plot instead.

📚 Festus blames too much study
🧠 He assumes thinking broke Paul's mind
🔍 This reveals Festus more than Paul
📖 Confusion often gets blamed on the wrong person

## ⚖️ I Am Not Mad, Most Noble Festus

"Most noble" was a formal, respectful title used for a Roman official of Festus's rank.

Paul answers calmly instead of matching Festus's tone.

He refuses to let an interruption shake his composure in front of the whole room.

A steady answer carries more weight than a defensive one.

⚖️ Most noble was a formal Roman title
😌 Paul answers calmly, not defensively
🛡️ He keeps his composure under pressure
➡️ A steady reply carries real weight

## 🗣️ Words Of Truth And Soberness

"Soberness" here means a clear, sound mind, the exact opposite of madness.

Paul directly answers the charge Festus just raised against him.

He is not simply denying the accusation, he is naming precisely what his words actually are.

Truth and clear thinking stand side by side in Paul's own description of himself.

🗣️ Soberness means a clear, sound mind
🙅 Paul directly denies Festus's charge
🎯 He names exactly what his words are
📖 Truth and clear thinking stand together

## 🔓 This Thing Was Not Done In A Corner

"Done in a corner" is an old idiom for something kept hidden or secret.

Paul reminds the room that the events around Jesus happened publicly, with crowds and witnesses.

He appeals to public record, not to private claims only he could verify.

Something this visible was never meant to be dismissed quietly.

🔓 Done in a corner means kept secret
👥 Jesus's story happened in public, with witnesses
📜 Paul appeals to public record, not private claims
➡️ Visible events resist a quiet dismissal

## 🙋 King Agrippa, Believest Thou The Prophets

Paul turns from Festus and puts the real question directly to Agrippa.

Agrippa grew up with real knowledge of Jewish scripture.

He could not dodge this question the way Festus could.

Paul is forcing a personal decision, not just continuing an argument.

The whole room is suddenly watching to see how a king will answer.

🙋 Paul turns the question straight to Agrippa
📖 Agrippa knew the prophets, unlike Festus
🎯 This forces a personal decision, not debate
➡️ The whole room now watches Agrippa

## 🤔 Almost Thou Persuadest Me To Be A Christian

"Christian" was still a new label at this point in history for followers of Jesus.

Agrippa's answer is careful and noncommittal, not a clear yes or a clear no.

He avoids giving Festus, the Jewish leaders, or Paul any firm answer at all.

A king protecting his own position chose a vague response over an honest one.

🤔 Christian was still a new label here
🎭 Agrippa gives a careful, noncommittal answer
🛑 He avoids taking any firm side
📖 Caution won out over an honest answer

## 🙏 I Would To God, That All That Hear Me This Day Were Such As I Am

Paul does not settle for Agrippa's halfway answer.

He openly wishes full faith for everyone listening, not just a polite "almost."

"Except these bonds" shows Paul separating his chains from the faith itself.

He wants them to share his belief without wishing his imprisonment on anyone.

🙏 Paul wants full faith, not a halfway one
🌍 He wishes this for everyone listening
⛓️ Except these bonds separates faith from imprisonment
📖 He wants the belief, not the suffering

# Acts 26:30-32
# ✅ The Verdict Nobody Can Act On
---
## 🚶 The King Rose Up, And The Governor, And Bernice

Everyone standing together marks the formal end of the hearing.

This small, procedural detail signals that the session itself is officially closed.

Whatever gets decided next happens away from Paul, in private.

The public part of this trial is now finished.

🚶 Standing together closes the hearing
📋 This is a formal, procedural signal
🚪 What happens next stays private
➡️ The public trial has now ended

## ✅ This Man Doeth Nothing Worthy Of Death Or Of Bonds

This verdict comes from the king, the governor, and everyone else in the room, together.

Every Roman and Jewish authority who examined Paul's case already reached this same conclusion.

These leaders now simply repeat what others already found.

Nobody with real knowledge of the facts found Paul guilty of anything.

The consistency of that verdict across so many different officials is hard to dismiss.

✅ The whole room agrees on this verdict
🔁 Every examiner so far reached the same result
🙅 Nobody found Paul guilty of a crime
📖 A repeated verdict is hard to dismiss

## 🔒 This Man Might Have Been Set At Liberty, If He Had Not Appealed Unto Caesar

Paul made this appeal back in chapter twenty five.

He did it to escape a planned ambush in Jerusalem, not to delay his release.

That same legal move now becomes the technical reason he cannot go free.

Everyone in the room already agrees that he is innocent.

Roman law required following through on a formal appeal once it was made.

Paul's own choice for safety is what now keeps him moving toward Rome.

🔒 The appeal was made to escape an ambush
📜 That same move now blocks his release
⚖️ Roman law required honoring the appeal
➡️ Paul's choice for safety now shapes his path
`.trim();

export const ACTS_TWENTY_SIX_PERSONAL_SECTIONS = parseActsTwentySixRawNotes(ACTS_TWENTY_SIX_RAW_NOTES);
