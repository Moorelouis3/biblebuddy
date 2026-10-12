export type ActsTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyTwoRawNotes(rawText: string): ActsTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 22:${startVerse}` : `Acts 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 22 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_TWO_RAW_NOTES = `# Acts 22:1-5
# 🗣️ Paul Begins His Defence
---
## 🗣️ Men, Brethren, And Fathers

This greeting was a formal way to address a serious Jewish assembly.

Paul uses almost the same words Stephen once used before this same council.

Stephen's speech ended in his own death by stoning.

Paul now stands in a similarly dangerous moment.

🗣️ A formal address to a serious crowd

📜 Stephen used nearly the same words

⚰️ Stephen's speech ended in his death

➡️ Paul now faces similar danger

## 🤫 Kept The More Silence

"The more silence" means the crowd grew quieter than before.

Paul had just spoken to a Roman officer in Greek.

Hearing him switch to their own language surprised the crowd completely.

That surprise bought him room to speak before any violence returned.

🤫 The more silence means even quieter

😮 The crowd expected Greek, not Aramaic

🗣️ Hearing their own language surprised them

➡️ Surprise bought Paul room to speak

## 🪪 I Am Verily A Man Which Am A Jew

Paul opens by claiming the exact identity his accusers already share.

"Verily" is an old word that simply means truly or certainly.

He is not denying his Jewish heritage to escape the charge.

He is standing fully inside it before he says anything else.

🪪 Paul claims his Jewish identity first

✅ Verily means truly or certainly

🙋 He does not deny his heritage

📖 Shared identity opens the whole speech

## 🏙️ Born In Tarsus, A City In Cilicia

Paul already named Tarsus just before this speech began.

It sat in Cilicia, a region along the southern coast of Asia Minor.

The city was known for learning, trade, and Roman influence.

Naming it again reminds the crowd that Paul was never an outsider to their world.

🏙️ Tarsus was already named before this

🗺️ Cilicia sat on the southern coast

📚 The city was known for learning

➡️ Paul was never truly an outsider

## 📚 At The Feet Of Gamaliel

"At the feet of" was the normal way to describe being someone's student.

Students sat on the floor while their teacher sat slightly higher on a bench.

Gamaliel was one of the most respected rabbis of that whole generation.

He already appears earlier in Acts, defending the apostles before this same council.

📚 At the feet means being a student

🪑 Teachers sat higher than their students

🎓 Gamaliel was a highly respected rabbi

📖 He already appeared earlier in Acts

## 📜 According To The Perfect Manner Of The Law Of The Fathers

This phrase describes the strict Pharisee training Paul received as a young man.

"The law of the fathers" means the traditions passed down from earlier generations.

Paul is not describing casual knowledge here.

He is describing years of exact, careful religious discipline.

📜 The law of the fathers means tradition

🎯 Paul describes exact, careful training

🕯️ This was strict Pharisee discipline

➡️ Years of discipline shaped this speech

## 🔥 Zealous Toward God, As Ye All Are This Day

"Zealous" means intensely devoted and eager to act on that devotion.

Paul is not insulting the crowd in front of him.

He is telling them he once felt the exact same zeal they feel right now.

That shared starting point makes his story harder for them to dismiss outright.

🔥 Zealous means intensely devoted and eager

🤝 Paul shares the crowd's own zeal

😠 He once felt what they feel

➡️ Shared zeal makes his story matter

## 🛣️ I Persecuted This Way Unto The Death

"This way" was an early name for the followers of Jesus, not a road or path.

Paul admits publicly that he hunted that movement all the way to killing its members.

He is not softening his own record in front of this crowd.

He states the worst part of his past before telling them what changed it.

🛣️ This way names the early church

⚔️ Paul hunted that movement to killing

🙋 He admits his worst actions plainly

➡️ His past sets up what changed him

## ⚖️ The High Priest Doth Bear Me Witness

Paul calls the high priest himself as a living witness to this claim.

That same high priest and council are likely present in this very crowd.

He is daring anyone listening to contradict facts they already know are true.

This is not a vague memory, it is a checkable record.

⚖️ Paul names the high priest as witness

👀 That same council may be watching now

✅ He invites anyone to check the facts

📖 This is a checkable record, not memory

# Acts 22:6-11
# ☀️ The Light From Heaven
---
## 🔁 As I Made My Journey

This is the third time Acts tells this same conversion story.

Luke already narrated it directly back in chapter nine.

Now Paul tells it himself, in his own words, to a hostile crowd.

A story repeated three times in one book carries real weight.

🔁 Acts tells this story a third time

📖 Luke first told it in chapter nine

🗣️ Now Paul tells it in his own words

➡️ Repetition signals real weight in Acts

## 📍 Nigh Unto Damascus About Noon

"Nigh" is an old word that simply means near or close.

Noon was the brightest hour of the whole day in that region.

A light bright enough to outshine full noon sunlight was not ordinary.

That detail alone tells the reader how extreme this moment really was.

📍 Nigh means near or close by

☀️ Noon was the brightest hour outdoors

✨ This light outshone full daylight

➡️ The brightness alone marks this as extreme

## 💡 A Great Light Round About Me

The light surrounds Paul completely, not just shining in front of him.

This was not a flash of sunlight or an ordinary bright sky.

Paul later calls this light the glory of God in verse eleven.

A light that strong was its own kind of message before a single word was spoken.

💡 The light surrounds Paul completely

🚫 Not ordinary sunlight or weather

✨ Paul later calls it God's glory

📖 The light spoke before any words did

## ⬇️ I Fell Unto The Ground

Falling here was not a stumble from being startled.

It was the normal human response to real divine glory in scripture.

Other figures like Ezekiel and John also fall down at similar moments.

Paul's whole body reacts before he understands anything that is happening.

⬇️ Falling was not a simple stumble

📜 Ezekiel and John reacted the same way

😵 The body reacts before the mind

➡️ Paul falls before he understands anything

## 🔁 Saul, Saul, Why Persecutest Thou Me?

Calling a name twice is a pattern scripture uses for urgent, personal moments.

Abraham, Moses, and Samuel all hear their own names repeated this same way.

"Persecutest" means actively attacking or hunting someone down.

Jesus speaks as if every attack on his followers lands on him personally.

🔁 A doubled name signals real urgency

📜 Abraham and Moses heard this pattern too

⚔️ Persecutest means actively hunting someone

📖 Jesus takes attacks on his people personally

## 📛 I Am Jesus Of Nazareth

The voice behind this blinding glory gives a plain, humble sounding name.

"Of Nazareth" was the same ordinary title people used for Jesus during his life.

The glory in the light and the plainness of the name sit side by side on purpose.

Paul is meeting the same Jesus people once dismissed as a village carpenter's son.

📛 Jesus gives his plain, human name

🏘️ Nazareth was his ordinary hometown

✨ Glory and plainness meet in one voice

➡️ The risen Jesus is still that same man

## 👀 They That Were With Me Saw The Light

Acts chapter nine already says Paul's companions heard a sound but did not understand it.

Here Paul says they saw the light but did not hear the actual words.

Both details can be true without contradicting each other.

A loud sound without clear words is not the same as a real voice.

👀 They saw the light clearly

👂 They heard sound, not clear words

🤝 Both details fit together, not against

📖 Experience can be shared without being equal

## 🙋 What Shall I Do, Lord?

Paul already calls this voice Lord before fully understanding who is speaking.

The question shows immediate surrender, not negotiation or delay.

A man who once hunted Christians now asks only how to obey.

This is the turning point of his entire life in one short sentence.

🙋 Paul calls him Lord immediately

🤲 The question shows instant surrender

🔄 A hunter now asks to obey

➡️ One sentence turns his whole life

## 🚶 Arise, And Go Into Damascus

God gives Paul a next step before explaining anything else.

Obedience here comes before full understanding, not after it.

Damascus was the very city Paul had set out to attack.

He now has to walk into it broken instead of in power.

🚶 A next step comes before explanations

🙏 Obedience arrives before full understanding

🏙️ Damascus was his original target city

➡️ He enters it broken, not in power

## ❓ It Shall Be Told Thee Of All Things

God does not explain the plan directly to Paul in this moment.

Someone else will deliver the details later, through another believer.

This keeps Paul dependent on the ordinary church instead of a private vision alone.

Even an apostle chosen this dramatically still needs other believers to guide him.

❓ The plan is not explained yet

🙋 Someone else will explain the details

⛪ This keeps Paul dependent on the church

➡️ Even Paul needed other believers

## 🙈 Could Not See For The Glory Of That Light

The same light that revealed Jesus also leaves Paul physically blind.

"Glory" here means the visible brightness of God's own presence.

Paul needed other believers to lead him by the hand into the city.

The man who once led others to prison now has to be led himself.

🙈 The light leaves Paul blind

✨ Glory means God's visible brightness

🤝 Others must now lead him

📖 Paul is led instead of leading

# Acts 22:12-16
# 👁️ Ananias Restores His Sight
---
## 📜 One Ananias, A Devout Man According To The Law

Acts chapter nine already introduced Ananias as a disciple of Jesus.

Here Paul describes him only by his devotion to the Jewish law instead.

Paul is choosing details that this particular crowd will respect and trust.

The same man gets a different introduction depending on who is listening.

📜 Acts nine already introduced Ananias

🙏 Here he is described by devotion to law

🎯 Paul picks details this crowd trusts

➡️ The same man, a different introduction

## 🏙️ Having A Good Report Of All The Jews Which Dwelt There

Ananias was respected by the wider Jewish community in Damascus, not only by believers.

That respect matters here because Paul needs a credible witness in front of this crowd.

A respected follower of Jesus pushes back on the idea that faith meant abandoning Judaism.

Paul is building his case one trusted name at a time.

🏙️ Ananias was respected beyond believers

⚖️ Paul needed a credible witness here

🤝 Faith in Jesus did not mean abandoning Judaism

📖 Paul builds his case name by name

## 🤝 Brother Saul, Receive Thy Sight

Ananias calls Paul brother before Paul has done a single thing to earn that title.

That word alone welcomes a former persecutor straight into the family of believers.

The healing itself happens the moment Ananias speaks, not gradually.

Grace arrives here faster than Paul's own guilt could keep up with.

🤝 Brother welcomes him before he earns it

👁️ Sight returns the moment he speaks

⚡ The healing happens instantly, not slowly

📖 Grace moves faster than guilt

## 🙏 The God Of Our Fathers Hath Chosen Thee

Ananias frames this calling as coming from the same God the whole crowd already worships.

Nothing about this message asks Paul to leave his Jewish faith behind.

It asks him to see where that faith was always pointing.

The calling is a fulfillment, not a replacement.

🙏 The same God the crowd worships

🕎 Nothing here replaces Paul's Jewish faith

➡️ The faith was always pointing forward

📖 Fulfillment, not replacement, is the message

## ⚖️ That Just One

"The Just One" is a title for Jesus meaning the perfectly righteous one.

Stephen used this same title back in chapter seven, right before he died.

Peter also used it earlier in chapter three.

The early church kept returning to this same name for Jesus.

⚖️ Just One means perfectly righteous

📜 Stephen used this title in chapter seven

🗣️ Peter used it earlier in chapter three

📖 The early church returned to this name

## 🌍 Thou Shalt Be His Witness Unto All Men

This calling already points toward the wider mission Paul will describe later in this same speech.

"All men" quietly includes people far beyond the Jewish community listening right now.

Ananias speaks this before Paul has preached even one sermon.

The assignment comes before the resume does.

🌍 All men hints at a wider mission

📣 The assignment comes before any sermon

⏳ Ananias speaks this very early

➡️ Calling comes before the resume

## ⏱️ Why Tarriest Thou?

"Tarriest" is an old word meaning to delay or wait around.

Ananias is not asking a real question here.

He is pushing Paul to act now instead of processing slowly.

Some callings do not leave much room for hesitation.

⏱️ Tarriest means delay or wait

🚫 This is not a real question

🏃 Ananias pushes Paul to act now

➡️ Some callings leave no room to wait

## 🚫 Arise, And Be Baptized, And Wash Away Thy Sins

This does not mean the water itself removes sin by magic.

Baptism here pictures the inward cleansing that calling on Jesus already provides.

The washing is the sign, not the cause.

Paul obeys this command within the same hour he regains his sight.

🚫 Water itself does not remove sin

🧼 Baptism pictures an inward cleansing

✍️ The sign points past itself

➡️ Paul obeys within the very hour

## 🙏 Calling On The Name Of The Lord

This phrase pairs directly with the baptism just described.

Calling on a name here means trusting and depending on that person completely.

The outward act and the inward trust belong together, not apart.

Paul's whole story turns on this one moment of calling out.

🙏 Calling on a name means trusting fully

🤝 Outward act and inward trust belong together

🔄 This moment turns Paul's whole story

📖 Trust and obedience arrive together

# Acts 22:17-21
# 💤 A Vision In The Temple
---
## 📆 When I Was Come Again To Jerusalem

This visit to Jerusalem happens years after Paul's conversion in Damascus.

Galatians describes a similar gap of time away from Jerusalem after his calling.

Paul is not rushing straight from Damascus into public ministry.

Time passed before this next vision takes place.

📆 Years passed after his conversion

📜 Galatians describes a similar gap

⏳ Paul did not rush into ministry

➡️ Time passed before this next vision

## 💤 While I Prayed In The Temple, I Was In A Trance

A trance here means Paul entered a vision like state while fully conscious.

Notice that Paul is praying inside the temple, not avoiding it.

Becoming a believer in Jesus did not make him abandon Jewish worship spaces.

God meets him in the very place this hostile crowd assumes he now despises.

💤 A trance means a vision like state

🙏 Paul was praying inside the temple

🕎 He did not abandon Jewish worship

📖 God meets him where he is accused

## ⚠️ Make Haste, And Get Thee Quickly Out Of Jerusalem

God warns Paul to leave before anything violent even happens.

This is not punishment, it is protection offered in advance.

Paul will eventually leave Jerusalem many times across the rest of Acts.

This is simply the first of several departures under pressure.

⚠️ A warning arrives before any danger

🛡️ Protection comes before punishment ever could

🔁 Paul leaves Jerusalem many times later

➡️ This is the first of several exits

## 🔮 They Will Not Receive Thy Testimony Concerning Me

God already knows how this crowd will respond before Paul ever opens his mouth.

Paul is telling his own story anyway, right now, to the very people warned about here.

That choice alone shows real courage.

He is not expecting success, he is simply being faithful to the call.

🔮 God already knew the outcome

🗣️ Paul still tells his story anyway

💪 This choice shows real courage

➡️ Faithfulness mattered more than success

## 📚 Lord, They Know That I Imprisoned And Beat In Every Synagogue Them That Believed

Paul offers his violent past as proof the crowd should trust his transformation.

That argument fails here the same way it failed back in verse eighteen.

A changed life does not always convince the people who remember the old one.

Paul's credibility with this crowd runs out long before his courage does.

📚 Paul offers his past as proof

❌ That argument fails just like before

🔁 Memory of the old life lingers

➡️ Courage outlasted credibility that day

## 📜 The Blood Of Thy Martyr Stephen Was Shed

This directly connects Paul's past to the stoning described back in chapter seven.

"Martyr" here means someone who died specifically for their testimony about Jesus.

Paul is publicly owning his connection to one of the darkest moments in the early church.

He does not try to minimize or explain away what happened that day.

📜 This connects back to chapter seven

⚰️ Martyr means someone who died testifying

🙋 Paul owns this dark connection fully

➡️ He does not minimize what happened

## ✅ I Also Was Standing By, And Consenting Unto His Death

"Consenting" means actively agreeing with and approving an action.

Paul was not a silent, uninvolved bystander at Stephen's death.

He fully supported it in his heart at the time.

This confession is harder to make than simply admitting he was present.

✅ Consenting means actively agreeing with it

🙅 Paul was not a silent bystander

💔 He fully supported it at the time

➡️ This confession goes beyond simple presence

## 👕 Kept The Raiment Of Them That Slew Him

Guarding the cloaks of the men doing the stoning was itself a real role in the killing.

"Raiment" simply means clothing or garments.

Someone had to hold what the killers set aside before they could throw stones.

Paul held that exact job on that exact day.

👕 Raiment simply means clothing

🪨 Guarding cloaks was a real role

🙋 Paul held that job himself

📖 Small tasks can still carry real guilt

## 🌍 Depart: For I Will Send Thee Far Hence Unto The Gentiles

This single word, Gentiles, is what finally breaks the crowd's patience in the next verse.

Up to this point, Paul's story has kept this hostile audience listening.

Sending a Jewish mission to non Jews sounded like betrayal to many in that crowd.

The whole speech has been building toward this one explosive sentence.

🌍 Gentiles is the word that breaks patience

👂 The crowd had listened up to now

😠 This sounded like betrayal to many

➡️ One sentence ends the whole speech

# Acts 22:22-24
# 😡 Away With Such A Fellow
---
## 👂 They Gave Him Audience Unto This Word

The crowd listens patiently all the way up until this exact word.

"Audience" here simply means they were actually listening and paying attention.

One word ends what careful testimony had managed to hold together.

Patience in a crowd can disappear in a single sentence.

👂 Audience means they were listening

⏱️ They listened right up to this word

💥 One word ends the patience

➡️ Crowds can turn in a sentence

## 📖 Away With Such A Fellow From The Earth

This is the same kind of cry already shouted against Jesus in Luke chapter twenty three.

It was also shouted against Paul himself back in chapter twenty one.

The same city uses nearly the same words against both the Lord and his follower.

That repetition is almost certainly intentional on Luke's part as the writer.

📖 This echoes the cry against Jesus

🔁 It also echoed earlier in chapter twenty one

🏙️ The same city repeats the same words

➡️ The echo is likely intentional writing

## 👕 Cast Off Their Clothes, And Threw Dust Into The Air

Throwing off clothes and flinging dust were physical signs of extreme outrage in that culture.

This was not random chaos.

It was a recognizable way of showing fury without yet resorting to actual violence.

The gesture itself was a warning sign of worse to come.

👕 Cast off clothes signaled extreme outrage

💨 Dust in the air showed fury

🎭 This was recognizable, not random chaos

➡️ The gesture warned of worse ahead

## 🩸 Bade That He Should Be Examined By Scourging

"Scourging" was a brutal Roman beating, often done with a whip of leather and bone.

Victims sometimes died from the wounds alone.

The captain wants Paul to confess under pain, since the crowd gave him no clear charge.

This decision is about to collide with a detail the captain does not yet know.

🩸 Scourging was a brutal Roman beating

⚰️ Victims sometimes died from it

❓ The captain wanted a confession

➡️ A hidden detail is about to matter

## ❓ That He Might Know Wherefore They Cried So Against Him

The Roman captain still has no real charge against Paul at this point.

"Wherefore" is an old word that simply means why.

Violence was about to answer a question that evidence never actually provided.

Confusion, not proof, was driving every decision in this scene.

❓ Wherefore simply means why

🚫 No real charge existed yet

🩸 Violence stood in for evidence

➡️ Confusion drove this whole decision

# Acts 22:25-30
# 🪪 Paul Claims His Roman Citizenship
---
## 🪢 As They Bound Him With Thongs

"Thongs" were leather straps used to tie a prisoner down for a beating.

Paul is already restrained and ready for scourging at this exact moment.

He speaks up now, right before the whip would have started.

Timing here matters as much as the words themselves.

🪢 Thongs means leather straps for binding

⏱️ Paul speaks right before the whip

🗣️ He waits until the last moment

➡️ Timing mattered as much as words

## ⚖️ Is It Lawful For You To Scourge A Man That Is A Roman, And Uncondemned?

Roman law strictly forbade beating a citizen who had not been formally convicted of a crime.

Officers who broke that law risked real punishment themselves, not just embarrassment.

Paul is not pleading for mercy here.

He is stating a legal fact that puts the captain in genuine danger.

⚖️ Roman law protected uncondemned citizens

🚫 Officers risked real punishment for breaking it

🗣️ Paul states a fact, not a plea

➡️ This put the captain in danger

## 🔄 Take Heed What Thou Doest

The centurion's tone shifts instantly from command to warning.

"Take heed" was a common way of saying be careful right now.

A soldier who was moments from giving the scourging order suddenly stops cold.

One sentence from Paul changes the entire direction of the scene.

🔄 The centurion's tone shifts instantly

⚠️ Take heed means be careful now

🛑 The scourging order suddenly stops

➡️ One sentence changed the whole scene

## 🪪 This Man Is A Roman

Three simple words carry enormous legal weight in this moment.

Roman citizenship came with real, enforceable protections across the whole empire.

The centurion reports this up the chain immediately, not casually.

Everything about how Paul is treated changes from this sentence onward.

🪪 Three words carried real legal weight

🛡️ Citizenship brought real legal protection

📢 The centurion reports this immediately

➡️ Paul's treatment changes from here on

## ❓ Tell Me, Art Thou A Roman?

The chief captain needs to confirm this claim directly from Paul himself.

A false claim to citizenship was a serious crime, so the question carried real risk either way.

Paul answers with a single plain word, Yea.

There is no hesitation in his response at all.

❓ The captain confirms the claim directly

⚠️ A false claim was itself a crime

✅ Paul answers with a single word

➡️ No hesitation shows in his answer

## 💰 With A Great Sum Obtained I This Freedom

The chief captain admits he had to pay heavily for his own citizenship.

Roman citizenship could sometimes be purchased, especially under corrupt officials of that era.

That admission makes Paul's next words land even harder.

The captain bought something Paul never had to buy at all.

💰 The captain paid for his citizenship

🏛️ Citizenship could sometimes be bought

😮 This makes Paul's reply land harder

➡️ The captain bought what Paul already had

## 🪪 But I Was Free Born

Paul did not buy or earn his citizenship through any payment.

He was born with it, most likely through his father's own status in Tarsus.

That single fact outranks the captain's own hard earned citizenship instantly.

A prisoner just outranked the man holding his chains.

🪪 Paul was born a citizen already

👨‍👦 His father likely held that status

📈 This outranked the captain's own citizenship

➡️ A prisoner outranked his own captor

## 🚶 They Departed From Him Which Should Have Examined Him

The men ready to scourge Paul simply back away from the whole plan.

No formal apology is recorded here, only quiet retreat.

The threat of real legal consequences did more than any argument could have.

Fear of punishment, not persuasion, ends the danger.

🚶 The scourging team simply backs away

🤐 No apology is recorded here

⚖️ Legal consequences stopped this, not argument

➡️ Fear of punishment ended the danger

## ⛓️ The Chief Captain Also Was Afraid, Because He Had Bound Him

Binding a Roman citizen without a trial was already illegal on its own.

The captain had committed that mistake before he even knew Paul's status.

His fear here is personal, not just procedural concern for Paul.

Rank did not protect an officer who broke this particular law.

⛓️ Binding a citizen untried was illegal

😨 The captain's fear was personal

🛡️ Rank did not excuse this mistake

➡️ Breaking this law carried real risk

## 🔓 Loosed Him From His Bands, And Commanded The Chief Priests And All Their Council To Appear

The chains come off immediately once Paul's citizenship becomes clear.

The captain still needs an actual answer to the charge against Paul.

He turns to Jewish leadership instead of simply guessing at the accusation.

This sets up the formal hearing that fills the very next chapter.

🔓 The chains come off right away

❓ The real charge is still unknown

🏛️ Jewish leaders are called to answer it

➡️ This sets up the next chapter's hearing
`.trim();

export const ACTS_TWENTY_TWO_PERSONAL_SECTIONS = parseActsTwentyTwoRawNotes(ACTS_TWENTY_TWO_RAW_NOTES);
