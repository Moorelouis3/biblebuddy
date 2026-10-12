export type ActsTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyEightRawNotes(rawText: string): ActsTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 28:${startVerse}` : `Acts 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Acts 28 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_EIGHT_RAW_NOTES = `# Acts 28:1-2
# 🏝️ Shipwrecked On Melita
---
## 🗺️ The Island Was Called Melita

"Melita" is the ancient name for the island now called Malta.

Paul and the crew had just survived a violent storm from the chapter before this one.

The ship broke apart.

Everyone aboard still made it to land alive.

Melita sits in the Mediterranean Sea, south of Sicily.

It sat along a busy shipping route between Rome and the east.

Landing here was not luck.

An angel had already told Paul in chapter twenty seven that he would reach land safely.

🗺️ Melita is the island now called Malta
⛵ It sat on a major Rome trade route
🌊 The whole crew survived the wreck
📖 God's promise to Paul held true

## 👥 The Barbarous People

"Barbarous" does not mean cruel or savage here.

In the Greek of this period, it simply meant someone who did not speak Greek.

The people of Melita spoke a different dialect, not Greek, so Luke uses the normal word for a foreign speaker.

It is a description of language, not of character.

These "barbarous" islanders turn out to be the kindest people in the whole shipwreck story.

🗣️ Barbarous meant non Greek speaking
🏝️ Melita's people spoke a different language
❤️ The word says nothing about their character
📖 The kindest people here are called barbarous

## 🔥 No Little Kindness

"No little kindness" is a KJV way of saying a great deal of kindness.

The islanders kindled a fire for soaked, freezing survivors they had never met.

Hospitality to strangers was a serious value across the ancient Mediterranean world.

Paul and the crew were not treated as prisoners or foreigners to fear.

They were treated as guests in need.

🔥 No little kindness means great kindness
🌧️ The survivors arrived soaked and cold
🤝 Hospitality to strangers was a real value
📖 Strangers were welcomed, not feared

# Acts 28:3-6
# 🐍 The Viper And The Verdict
---
## 🪵 A Bundle Of Sticks

Paul gathers firewood himself instead of standing back and watching others work.

He was still a prisoner on his way to trial in Rome.

That status never stopped him from serving the people around him.

Small, practical kindness meant as much to Paul as preaching did.

🪵 Paul gathers wood himself
⛓️ He was still a Roman prisoner
🤝 He served without being asked
📖 Paul's faith showed up in small tasks

## 🐍 A Viper Out Of The Heat

The heat here means the fire Paul had just built.

A viper is a venomous snake, and the warmth likely drew it out of the sticks.

It fastened on his hand the moment the heat reached it.

This was a real and dangerous animal, not a symbol.

🔥 The heat refers to Paul's fire
🐍 A viper is a venomous snake
✋ It struck Paul's hand directly
📖 This danger was real, not symbolic

## ☠️ No Doubt This Man Is A Murderer

The islanders assume Paul's snakebite proves his guilt.

Ancient peoples across this region often believed sudden disaster was the gods punishing a hidden crime.

Paul had already survived a shipwreck, so a deadly snake seemed like justice catching up to him at last.

Their logic connects suffering directly to secret sin.

The rest of the chapter proves that connection wrong.

⚖️ They assume the snakebite proves guilt
🌊 Surviving the wreck made it seem worse
🧩 Ancient thinking linked disaster to hidden sin
📖 Their assumption is about to be disproven

## 🙌 Shook Off The Beast Into The Fire, And Felt No Harm

Paul does not panic or perform a dramatic healing.

He simply shakes the snake off and keeps going.

Jesus had told His disciples in Mark's Gospel that deadly creatures would not harm them.

That promise came while they were carrying out His mission.

This moment quietly fulfills that old promise.

🐍 Paul shakes off the viper calmly
🙌 No dramatic reaction is needed
📜 Mark's Gospel promised this kind of protection
📖 God's protection does not need a show

## 🙇 They Changed Their Minds, And Said That He Was A God

The islanders swing from one extreme to the opposite extreme.

First they call Paul a murderer.

Now they call him a god.

Neither label is accurate.

People often judge someone only by what just happened to them, not by who they actually are.

Paul does not correct the title here, but Acts fourteen already shows him refusing worship like this.

🔄 Their opinion flips completely
❌ Murderer and god are both wrong labels
👀 People judge by outcomes, not truth
📖 Paul refused this kind of worship before

# Acts 28:7-10
# 🏡 Publius And The Healings
---
## 👑 The Chief Man Of The Island

Publius held an official Roman title on Melita, similar to a governor over the island.

This was not just a wealthy local man, but the top Roman authority in the region.

Hosting shipwrecked prisoners and crew for three days used real political power.

👑 Publius was the island's top Roman official
🏛️ His title carried real local authority
🏠 He chose to host the survivors
📖 Power was used here for kindness

## 🛏️ Lodged Us Three Days Courteously

"Courteously" means Publius treated his guests with genuine respect, not cold formality.

Three days of hosting an entire shipwrecked group, prisoners included, was a real cost to him.

Luke notices the manner of the welcome, not just the fact of it.

🤝 Courteously means genuine respectful care
🏠 Three days of hosting many guests
💰 This cost Publius real resources
📖 How he welcomed them mattered too

## 🤒 A Fever And Of A Bloody Flux

A "bloody flux" is the old name for dysentery, a serious intestinal illness.

Combined with a high fever, Publius's father was in real danger, not just mildly unwell.

Luke, who was a physician, describes this with real medical accuracy.

🦠 Bloody flux means dysentery
🤒 Fever made the illness more serious
⚕️ Luke describes it with medical precision
📖 This was a genuine, dangerous sickness

## 🙏 Paul Entered In, And Prayed, And Laid His Hands On Him

Paul does not demand payment or a platform for this healing.

He simply goes to a sick man's bedside and prays.

The method matches what Jesus modeled, personal presence joined with prayer.

Healing here flows from compassion, not performance.

🙏 Paul prays before laying on hands
🛏️ He goes to the sick man directly
❤️ Compassion drives the healing, not show
📖 Paul's ministry mirrors Jesus's own pattern

## 🎁 Honoured Us With Many Honours

"Honours" here likely means more than kind words.

It probably included gifts, supplies, and provisions for the rest of the journey.

Publius and the islanders answer Paul's kindness with their own generosity.

What began as a shipwreck ends with real material support for the trip ahead.

🎁 Honours likely meant gifts and supplies
🔁 Kindness was returned with more kindness
🧭 This support helped the final leg
📖 Generosity moved in both directions

# Acts 28:11-13
# ⛵ The Voyage Resumes
---
## 📅 After Three Months

Ancient Mediterranean sailing mostly stopped during the winter months because storms made travel too dangerous.

Paul and the others had to wait out the season on Melita before any ship could safely leave.

Three months of hospitality, not just three days, is the real length of their stay on the island.

❄️ Winter made sea travel too dangerous
🏝️ The group waited out the season
🧭 Melita's hospitality lasted far longer than first described
📖 Patience was forced on them by the weather

## 👬 Whose Sign Was Castor And Pollux

Ships in this period were often marked after the gods sailors believed protected them.

Castor and Pollux were twin gods in Roman mythology, considered patrons of sailors and safe voyages.

A carved figurehead of the twins would have been visible on the ship's bow.

Paul sails to Rome on a vessel dedicated to gods he does not serve.

🚢 Ships were often marked with a patron god
👬 Castor and Pollux were twin sailing gods
🗿 Their image was carved on the bow
📖 Paul trusts a protection far greater than this

## 🏛️ Landing At Syracuse

Syracuse was a major port city on the island of Sicily.

The ship stops here for three days, likely to resupply or wait for favorable wind.

This was a normal, practical stop on a well known trade route, not a planned destination of its own.

🏛️ Syracuse was a major Sicilian port
⛵ The ship paused here briefly
🧭 This was a routine supply stop
📖 Even ordinary stops move God's plan forward

## 💨 After One Day The South Wind Blew

Rhegium sat at the southern tip of mainland Italy, across the strait from Sicily.

A south wind was exactly the direction the ship needed to push north toward Rome.

What looked like simple good weather was one more piece of a long, guided journey.

🗺️ Rhegium sat at Italy's southern tip
💨 The south wind pushed them toward Rome
🧭 The timing of the wind mattered
📖 Small details still served the larger plan

# Acts 28:14-16
# 🏛️ Arrival In Rome
---
## 🤝 Desired To Tarry With Them Seven Days

Christians already lived in Puteoli before Paul ever preached there himself.

The gospel had reached Italy ahead of Paul's own arrival.

These believers ask Paul to stay a full week before continuing to Rome.

⛪ Believers were already in Puteoli
🗺️ The gospel arrived in Italy before Paul did
🤝 They welcomed him for a full week
📖 God's work was already spreading ahead of him

## 🛤️ Appii Forum, And The Three Taverns

These were two well known stopping points along the Appian Way, the main road into Rome.

"Appii Forum" was a market town about forty miles from Rome.

"The Three Taverns" was a rest stop closer in, named for three roadside inns.

Roman believers traveled out to these points just to meet Paul partway.

🛤️ Both were stops on the Appian Way
🏪 Appii Forum was a market town
🏠 Three Taverns was a roadside rest stop
📖 Believers traveled out just to meet Paul

## 🙏 He Thanked God, And Took Courage

Paul had been a prisoner for years by this point in the story.

Seeing familiar faces from the church reminds him he was never facing Rome completely alone.

Gratitude and courage arrive together in this verse, not separately.

Encouragement from other believers can renew strength that circumstances alone cannot.

⛓️ Paul had endured years as a prisoner
👀 Familiar faces reminded him he was not alone
🙏 Gratitude and courage arrived together
📖 Encouragement from others can renew real strength

## 🏠 Paul Was Suffered To Dwell By Himself With A Soldier

This does not mean Paul was thrown into a prison cell.

Roman custody sometimes allowed a prisoner to rent his own lodging while guarded by a single soldier.

Paul waited for his trial under this lighter form of custody, not behind bars.

This arrangement gave him real freedom to receive visitors and keep teaching.

🏠 Paul was not held in a prison cell
🪖 One soldier guarded him in his own house
⛓️ This was a lighter form of custody
📖 This freedom let his ministry continue

# Acts 28:17-20
# 📢 Paul's Appeal To The Jews In Rome
---
## 👥 Called The Chief Of The Jews Together

Paul reaches out to the Jewish leaders in Rome within days of arriving.

Even under guard, waiting for trial, he makes contact with his own people first.

This matches his pattern across the whole book of Acts, go to the synagogue community before anywhere else.

👥 Paul contacts Jewish leaders quickly
⛓️ He does this while still under guard
🔁 This matches his pattern throughout Acts
📖 His own people came first, as always

## ⚖️ Committed Nothing Against The People, Or Customs Of Our Fathers

Paul opens by defending his loyalty, not his doctrine.

He wants the Jewish leaders to know he has not abandoned his heritage or betrayed Jewish law.

This matters because rumors about Paul rejecting Jewish customs had already spread ahead of him in earlier chapters.

⚖️ Paul defends his loyalty first
📜 He claims to honor Jewish customs
🗣️ Rumors about him had spread earlier
📖 He corrects the record before teaching

## 📯 Constrained To Appeal Unto Caesar

Appealing to Caesar was not Paul fleeing justice.

Roman citizens had a real legal right to have their case heard by the emperor's own court.

Paul used this right only because his enemies kept pressing for his death.

This was legal defense, not rebellion against his own nation.

📯 Appealing to Caesar was a legal right
🇮🇹 Roman citizenship made this possible
⚠️ Paul used it only under real threat
📖 This was legal defense, not rebellion

## ⛓️ Bound With This Chain

This chain was likely a light restraint linking Paul to his guard, not heavy prison irons.

It matches the lighter custody already described back in verse sixteen.

Paul names the chain honestly without using it to gain sympathy.

⛓️ The chain was a light restraint
🪖 It linked Paul to his guard
🗣️ Paul names it plainly, not for pity
📖 Honesty, not self pity, shapes his words

# Acts 28:21-22
# 🤔 Their Cautious Response
---
## 📜 We Neither Received Letters Out Of Judaea

The Jewish leaders in Rome tell Paul something important, no formal accusation against him has reached them yet.

Paul arrives in Rome without his reputation already ruined by letters from his enemies back home.

This gives him a rare, fair hearing before any rumor can shape their opinion first.

📜 No formal charge against Paul had arrived
🗣️ His enemies had not written ahead
⚖️ He gets a fairer hearing because of this
📖 A clean slate opens the conversation

## 🏷️ This Sect

"Sect" was the term outsiders used for the followers of Jesus at this time.

It did not yet mean a separate religion in most people's minds.

Jewish listeners in Rome still saw this movement as a controversial part of Judaism, not something entirely new.

🏷️ Sect was the outsider's label for Christians
🕍 It was seen as part of Judaism still
🗣️ The movement was controversial, not foreign
📖 Early Christianity had not yet fully separated

## 🌍 Every Where It Is Spoken Against

By this point, word of the Christian movement had reached Jewish communities from many directions.

Controversy followed this message across the whole empire, not just in Judea.

Curiosity, not certainty, is what brings these leaders to listen to Paul at all.

🌍 Christianity's reputation had spread widely
🗣️ Controversy followed it across the empire
🤔 Curiosity brought these leaders to listen
📖 Even controversy created an open door

# Acts 28:23-28
# 📖 A Full Day Of Testimony
---
## 📅 Appointed Him A Day

The Jewish leaders do not dismiss Paul after one short conversation.

They schedule a real, dedicated time to hear him out fully.

Many more people than the first small group show up on that day.

📅 A real meeting day was scheduled
👥 More people came than just the leaders
🤔 This shows genuine interest, not dismissal
📖 Paul's message earned a real hearing

## 🗣️ He Expounded And Testified The Kingdom Of God

"Expounded" means Paul explained the Scriptures in careful detail, not just in broad statements.

"Testified" adds a personal layer, Paul speaks from his own experience with Jesus, not only from argument.

The kingdom of God was his main subject, the reign and rule of God breaking into the world through Jesus.

🗣️ Expounded means careful, detailed explanation
🙋 Testified adds Paul's own personal witness
👑 The kingdom of God was his main topic
📖 Teaching and testimony worked together

## 📜 Out Of The Law Of Moses, And Out Of The Prophets

"The law of Moses" refers to the first five books of the Hebrew Bible, also called the Torah.

"The prophets" means the later prophetic books like Isaiah and Jeremiah.

Paul builds his whole case for Jesus from Scriptures his Jewish listeners already trusted completely.

He is not introducing something foreign, he is showing where those Scriptures were pointing all along.

📜 The law of Moses means the Torah
📖 The prophets means books like Isaiah
🏛️ Paul argues from Scriptures they already trusted
➡️ Their own text was pointing to Jesus

## 🌅 From Morning Till Evening

This was not a brief appointment.

Paul teaches for an entire day without pausing the conversation.

The length itself shows how seriously both sides treated this subject.

🌅 The teaching lasted a full day
⏳ This was no brief, rushed talk
🤔 Both sides treated this seriously
📖 Real conviction takes real time

## ⚖️ Some Believed The Things Which Were Spoken, And Some Believed Not

The exact same teaching, from the exact same man, lands completely differently on different hearers.

Paul's message does not fail here, even though it divides the room.

A divided response was something Jesus himself predicted would follow His message everywhere it went.

⚖️ The same words led to split reactions
🗣️ Paul's message itself did not fail
🔀 A divided response was already expected
📖 Truth does not guarantee agreement

## 📖 Well Spake The Holy Ghost By Esaias The Prophet

"Esaias" is the old English spelling of the prophet Isaiah.

Paul quotes words the Holy Spirit gave to Isaiah many centuries earlier.

He treats that ancient prophecy as speaking directly into this exact moment in Rome.

Scripture written long ago still explains what Paul is watching happen right now.

📖 Esaias is the old spelling of Isaiah
🕰️ This quote is centuries old
🎯 Paul applies it to his own moment
➡️ Old Scripture still explains present events

## 👂 Hearing Ye Shall Hear, And Shall Not Understand

This does not mean God prevents people from understanding against their will.

It describes people who hear truth repeatedly but refuse to let it change them.

The repetition in "hearing ye shall hear" stresses how often the chance to understand was offered.

Stubborn resistance, not a lack of chances, is the real problem this verse names.

👂 This is not God blocking understanding
🙉 It describes repeated, willful resistance
🔁 The repetition stresses how many chances were given
📖 The problem is stubbornness, not access

## 👂 Their Ears Are Dull Of Hearing

"Dull" here means slow or unresponsive, like a blade that no longer cuts well.

The image describes people who have heard truth so often that it stopped affecting them.

Familiarity had worn down their sensitivity to the message instead of sharpening it.

🗡️ Dull means slow and unresponsive
👂 Their hearing had grown unresponsive over time
😶 Familiarity dulled them instead of sharpening them
📖 Repetition without response can harden a heart

## 🌍 The Salvation Of God Is Sent Unto The Gentiles

Paul names the turning point of this whole chapter, and really of the whole book of Acts.

Some of his own people reject the message in this very room.

That rejection does not end God's plan, it expands where the message goes next.

The gospel moving to the Gentiles was always part of God's intention, not a backup plan.

🌍 The message now turns toward the Gentiles
🚪 Rejection opened a door instead of closing one
📖 This was God's plan, not a backup
➡️ Acts ends where it was always heading

# Acts 28:29-31
# 🏠 Two Years In His Own Hired House
---
## 🗣️ Great Reasoning Among Themselves

The Jewish leaders do not simply walk away in silence.

They leave arguing intensely with one another about everything Paul had just said.

A message that gets ignored rarely produces reasoning this strong.

🗣️ They leave in intense debate
👥 The argument was among themselves, not with Paul
🤔 Strong reactions show the message landed
📖 Indifference does not provoke this kind of fight

## 🏠 Dwelt Two Whole Years In His Own Hired House

"Hired house" means Paul rented his own lodging rather than being held in a dungeon.

Two whole years is a long stretch of waiting, with his legal case still unresolved.

Despite that uncertainty, Paul stays in one place long enough to build a real, lasting ministry in Rome.

🏠 Hired house means Paul rented his own place
⏳ Two years is a long, uncertain wait
🏛️ He stayed long enough to build real ministry
📖 Delay did not mean wasted time

## 🚪 Received All That Came In Unto Him

Paul's door stays open to anyone willing to visit him.

Being a prisoner limits his movement, but it never limits who can come find him.

A closed door and a closed heart are not the same thing.

🚪 Paul welcomed every visitor
⛓️ Custody limited movement, not access
❤️ His heart stayed open despite his situation
📖 Limits on freedom did not limit his welcome

## 📖 With All Confidence, No Man Forbidding Him

Acts ends without a dramatic trial scene or a clear verdict from Caesar.

It ends instead on Paul still teaching, still preaching, still unstopped.

Luke closes the whole book on that note deliberately.

The real point was never Paul's court case.

It was that nothing, not shipwreck, not snakebite, not chains, ever stopped the message from moving forward.

📖 Acts ends on teaching, not a verdict
⛓️ Paul remained unstopped despite custody
🚫 No man forbidding him closes the book
➡️ The real story was the message spreading
`.trim();

export const ACTS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseActsTwentyEightRawNotes(ACTS_TWENTY_EIGHT_RAW_NOTES);
