export type MarkThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkThreeRawNotes(rawText: string): MarkThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 3:${startVerse}` : `Mark 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Mark 3 sections, received " + sections.length);
  }

  return sections;
}

const MARK_THREE_RAW_NOTES = `# Mark 3:1-6
# 🖐️ Healing On The Sabbath
---
## 🕍 He Entered Again Into The Synagogue

Again points back to the synagogue scene already told in Mark chapter one.

Jesus had healed and taught there before, and now he returns to the same place.

Mark often tracks Jesus returning to a familiar setting before a new story begins.

Capernaum keeps showing up as the base where real conflict starts to build.

🕍 Again means a return to that synagogue

📜 Jesus already taught there in Mark one

🔁 Mark often returns to familiar settings

➡️ Conflict keeps building from this same base

## 🖐️ A Man There Which Had A Withered Hand

Withered means the hand had shrunk and lost its normal strength and use.

Some old injury or sickness had left the muscle unable to work.

A hand like this could not grip a tool, carry a load, or earn a living.

This was not a small, hidden problem, it limited an entire life.

🖐️ Withered means shrunk and unusable

💪 The muscle had lost its real strength

💰 It kept the man from earning a living

➡️ A visible problem, not a hidden one

## 👀 They Watched Him, Whether He Would Heal Him On The Sabbath Day

The word they refers to the Pharisees named a few verses later.

They are not watching to learn, they are watching to build a case.

Healing counted as forbidden work under their strict Sabbath rules.

Accuse means they wanted a formal charge to bring against Jesus.

👀 They refers to the Pharisees nearby

🚫 Healing counted as forbidden Sabbath work

⚖️ Accuse means a formal legal charge

➡️ They are hunting for a case, not truth

## ⚖️ Is It Lawful To Do Good On The Sabbath Days, Or To Do Evil

Jesus turns their silent trap into a direct public question.

He frames healing as either an act of good or an act of evil, nothing between.

Their own rules had no real category for mercy done on the Sabbath.

Their silence exposes that their system was not built to help anyone.

⚖️ Jesus turns the trap into a question

💚 Healing counts as doing good, not evil

🚫 Their rules left no room for mercy

📖 Their silence exposes their own rule

## 😠 He Had Looked Round About On Them With Anger, Being Grieved For The Hardness Of Their Hearts

Hardness of heart means a settled refusal to feel compassion or change.

Jesus feels real anger at their response, but it comes mixed with real grief.

He is not angry because they disagree with him.

He is grieved because they protected a rule instead of helping a suffering man.

😠 Anger here is mixed with real grief

💔 Hardness of heart means refusing compassion

🖐️ They valued a rule over a man

📖 Jesus grieves over closed hearts, not debate

## ⚡ His Hand Was Restored Whole As The Other

The healing happens the instant Jesus speaks, with no gradual recovery.

Whole as the other means both hands now match completely in strength and shape.

No ceremony or private moment accompanies this miracle.

A single word alone was enough to undo years of damage.

⚡ The healing happened the instant he spoke

🖐️ Whole as the other means both hands match

🗣️ A single word accomplished the healing

📖 Jesus's word alone undid years of damage

## 🏛️ The Pharisees Went Forth, And Straightway Took Counsel With The Herodians

The Herodians were a political group loyal to Herod's family and Roman rule.

Pharisees normally despised Herod's government and everything the Herodians stood for.

These two groups rarely agreed on anything, religious or political.

A shared threat was enough to make even bitter rivals work together.

🏛️ Herodians supported Herod's Roman backed rule

⚔️ Pharisees and Herodians rarely agreed

🤝 A shared enemy pulled rivals together

➡️ Opposition to Jesus united old rivals

## 💀 How They Might Destroy Him

This is the first time in Mark that killing Jesus is openly discussed.

The plot begins this early, right after a simple act of healing.

Mark keeps planting this seed long before the cross actually happens.

A kind act toward a suffering man becomes the spark for a murder plot.

💀 This is Mark's first mention of killing Jesus

🌱 The plot begins shockingly early in the story

⚡ One healing becomes the spark for murder

📖 Mark plants this seed long before the cross

# Mark 3:7-12
# 🌊 Pressed By A Growing Crowd
---
## 🚶 Jesus Withdrew Himself With His Disciples To The Sea

Withdrew means Jesus deliberately steps back from the danger just described.

The open shoreline gave him room that no building or town could offer.

Mark already showed this same pattern of retreat back in chapter one.

Growing opposition does not stop his ministry, it simply relocates it.

🚶 Withdrew means a deliberate step back

🌊 The shoreline offered room no building could

🔁 Mark already showed this pattern before

➡️ Opposition relocates his work, not stops it

## 🧭 A Great Multitude From Galilee Followed Him, And From Judaea

Galilee was his home region in the north, Judaea the region near Jerusalem in the south.

People were now traveling from both ends of the land just to reach him.

This spread shows his reputation had grown far past one town.

🧭 Galilee sat in the north, Judaea the south

🚶 People traveled from both ends of the land

📣 His reputation had outgrown one region

➡️ Fame was spreading in every direction

## 🗺️ From Jerusalem, And From Idumaea, And From Beyond Jordan

Jerusalem was the religious and political capital of the Jewish nation.

Idumaea was the old territory of Edom, the region Herod's own family came from.

Beyond Jordan means land east of the Jordan river, outside the main Jewish heartland.

Even people with no natural claim on Jewish faith were drawn to him.

🏛️ Jerusalem was the nation's capital city

🗺️ Idumaea was the old land of Edom

🌊 Beyond Jordan lay east of the river

➡️ Even outsiders were drawn to Jesus

## 🌊 They About Tyre And Sidon, A Great Multitude

Tyre and Sidon were Gentile cities on the coast, outside Israel entirely.

These crowds worshiped other gods and still came looking for Jesus.

Word of his power had already crossed into pagan territory.

His reach had stretched well beyond his own people this early in the story.

🌊 Tyre and Sidon were Gentile coastal cities

🙏 These crowds worshiped other gods

📣 His fame had crossed into pagan land

📖 His reach already stretched past Israel

## 🛶 A Small Ship Should Wait On Him Because Of The Multitude, Lest They Should Throng Him

Throng means to crowd and crush in around someone from every side.

Jesus plans ahead for a practical escape instead of simply hoping the crowd stays calm.

A boat waiting offshore gave him a way out if the pressing crowd grew dangerous.

Even his miracles came with real, ordinary human risk attached.

🌊 Throng means crushing in from every side

🛶 A boat offered a practical escape route

📋 Jesus planned ahead instead of just hoping

➡️ Real danger came with real popularity

## 🩹 They Pressed Upon Him For To Touch Him, As Many As Had Plagues

Plagues here simply means diseases or physical afflictions, not an epidemic.

People believed that touching him, even briefly, could bring healing.

The desperation in this crowd was physical, not polite or patient.

Real need, not manners, was driving everyone pressing toward him.

🩹 Plagues means diseases or afflictions

🖐️ People believed a touch could heal

😣 Desperation shaped the whole crowd's behavior

➡️ Real need, not manners, drove the crush

## 👹 Cried, Saying, Thou Art The Son Of God

The demons say out loud what the religious leaders in verse six refuse to admit.

Unclean spirits recognize Jesus's true identity instantly and with total certainty.

Mark keeps using this irony, the enemies of God often see the truth clearest.

Correct knowledge about Jesus is not the same as actually following him.

👹 Demons name him Son of God instantly

🙈 Religious leaders refuse the same truth

🔁 Mark repeats this irony throughout the book

📖 Knowing truth is not the same as faith

## 🤐 He Straitly Charged Them That They Should Not Make Him Known

Straitly charged means a strict, urgent command, not a casual request.

Jesus silences the demons instead of letting their announcement spread.

Mark often shows Jesus controlling when and how his identity gets revealed.

His full mission still needed time to unfold on his own terms.

🤐 Straitly charged means a strict command

🔇 He silences the demons on purpose

⏳ His identity would unfold in his own time

📖 Mark tracks this pattern throughout the book

# Mark 3:13-19
# 👥 Twelve Are Chosen
---
## ⛰️ He Goeth Up Into A Mountain, And Calleth Unto Him Whom He Would

Mountains in scripture often mark a moment of major revelation or calling.

Moses received the law on a mountain, and now Jesus calls his own leaders on one.

Whom he would means the choice is entirely his, not earned by position or status.

Nobody here earns a spot on this list, they are simply chosen.

⛰️ Mountains often mark major moments

📜 This echoes Moses receiving the law

🎯 Whom he would means his own choice

📖 None of the twelve earn their place

## 📋 He Ordained Twelve, That They Should Be With Him, And That He Might Send Them Forth To Preach

Ordained means formally set apart and appointed for a specific task.

Twelve matches the twelve tribes of Israel, hinting at a new people being formed.

Their first job is simply nearness, staying close enough to learn by watching.

Preaching comes only after that season of being with him.

📋 Ordained means formally set apart

🔢 Twelve recalls Israel's twelve tribes

👥 Nearness came before any assignment

➡️ Preaching follows after learning up close

## ⚡ Power To Heal Sicknesses, And To Cast Out Devils

This authority is not something the twelve build up on their own.

Jesus hands them power that until now only he has used in this book.

Healing and casting out devils were the exact signs already seen in chapters one and two.

Their ministry becomes a visible extension of his own.

⚡ This power is given, not earned

🤝 Until now only Jesus used this power

🔁 These are the same signs from earlier chapters

📖 Their ministry extends his own ministry

## 🏷️ Simon He Surnamed Peter

Surnamed means Jesus gave him an added name on top of his birth name.

Peter comes from a word meaning rock, a name tied to stability and strength.

Simon had already shown plenty of impulsive, unstable moments in this book.

The new name points forward to who he will become, not who he already is.

🏷️ Surnamed means an added, given name

🪨 Peter means rock, suggesting strength

🌊 Simon had been impulsive, not stable yet

➡️ The name points to who he will become

## ⚡ He Surnamed Them Boanerges, Which Is, The Sons Of Thunder

Boanerges is an Aramaic nickname meaning sons of thunder.

James and John likely earned it through a loud, intense temperament.

Later chapters in the Gospels show both brothers acting with that same fire.

Jesus notices and names personality traits, not just assigns tasks.

⚡ Boanerges means sons of thunder

🔥 It points to a fiery temperament

📖 Later chapters confirm that same fire

➡️ Jesus names character, not only duty

## 📖 Matthew

Matthew is the very same man already introduced as Levi in chapter two.

Levi was his birth name, Matthew the name he becomes known by as a disciple.

He had been a despised tax collector before Jesus called him away from that table.

A hated profession becomes a powerful testimony inside Jesus's own chosen twelve.

📖 Matthew is the Levi from chapter two

🏷️ Levi was his birth name

💰 He had been a despised tax collector

➡️ A hated past now sits inside the twelve

## 👤 James The Son Of Alphaeus

This James is a different man from James the son of Zebedee named earlier.

Matthew was also called a son of Alphaeus back when he was introduced as Levi.

That shared father's name suggests these two disciples may have been brothers.

Family ties among the twelve are not spelled out plainly, they have to be noticed.

👤 This is a different James than Zebedee's son

👨 Matthew was also called a son of Alphaeus

🤝 The two may actually have been brothers

➡️ Family ties hide quietly inside this list

## 🚫 Simon The Canaanite

Canaanite here does not mean Simon came from the land of Canaan.

The word actually comes from an Aramaic term close in meaning to zealous or zealot.

Zealots were fiercely devoted to Jewish law and often hostile toward Roman rule.

A man shaped by that kind of fire is now called to follow Jesus instead.

🚫 Canaanite does not mean from Canaan

🔥 The word is closer to zealous or zealot

⚔️ Zealots resisted Roman rule fiercely

➡️ That same fire now follows Jesus

## ⚠️ Judas Iscariot, Which Also Betrayed Him

Mark names the betrayal before the story even gets there.

Every other name on this list gets introduced without warning, Judas does not.

The shadow of the cross falls across the twelve from the moment they are chosen.

Being chosen by Jesus never meant staying faithful to him.

⚠️ Mark warns of the betrayal early

📋 Every other name gets no warning

✝️ The cross shadows the twelve already

📖 Being chosen does not guarantee staying faithful

# Mark 3:20-27
# 🏠 A House Divided
---
## 🍞 They Could Not So Much As Eat Bread

The crowd now presses in so tightly that a normal meal becomes impossible.

This is not a short visit, it is constant, overwhelming demand.

Mark keeps piling up these small details to show how fast the pressure grew.

Even basic human needs get crowded out by the weight of his ministry.

🍞 Eating a normal meal became impossible

👥 Demand on Jesus was constant, not brief

📖 Mark tracks the pressure building fast

➡️ Basic needs got crowded out entirely

## 👪 They Went Out To Lay Hold On Him

Friends here likely means his own family members.

Beside himself means they thought he had genuinely lost his mind.

They believed they were protecting him, not attacking him.

Even people who love someone can misread what they are doing.

👪 Friends here points to his own family

🧠 Beside himself means they thought him insane

🛡️ They believed they were protecting him

➡️ Love does not guarantee understanding him

## 😈 The Scribes Which Came Down From Jerusalem Said, He Hath Beelzebub

Beelzebub was a mocking name for Satan, borrowed from an old pagan god's title.

These scribes traveled all the way from Jerusalem just to confront him.

That distance shows how seriously the religious leadership now took the threat of Jesus.

The accusation has grown far more serious than the local grumbling back in chapter two.

😈 Beelzebub was a mocking name for Satan

🚶 Scribes traveled far just to confront him

📈 This shows rising official concern

➡️ The charge has grown more serious

## ⚖️ By The Prince Of The Devils Casteth He Out Devils

This is the actual legal style charge the scribes are building.

They admit Jesus has real power, they simply credit it to the wrong source.

If true, it would make Jesus Satan's own agent, not God's.

The accusation is specific and dangerous, not vague name calling.

⚖️ This is their actual formal charge

✅ They admit his power is real

😈 They credit it to Satan, not God

➡️ A specific, dangerous accusation, not an insult

## ❓ How Can Satan Cast Out Satan

Jesus answers their accusation with a simple question, not an argument.

Casting out Satan would work directly against Satan's own goals.

An enemy does not usually spend his power destroying his own side.

The accusation collapses once anyone actually thinks it through.

❓ Jesus answers with a question, not a speech

😈 Casting out Satan would hurt Satan's goals

🚫 An enemy rarely fights his own side

📖 The accusation collapses under its own logic

## 👑 If A Kingdom Be Divided Against Itself, That Kingdom Cannot Stand

Jesus gives two matching pictures, a kingdom split by civil war and a house split by feuding.

Neither one can survive while working against its own people.

A kingdom at war with itself eventually falls apart from the inside.

The same simple truth applies to Satan's own kingdom of evil.

👑 A kingdom cannot survive its own civil war

🏠 A divided house fails the same way

💔 Internal division always weakens from inside

➡️ The same truth applies to Satan's kingdom

## 😈 If Satan Rise Up Against Himself, And Be Divided, He Cannot Stand, But Hath An End

Jesus now applies the kingdom and house picture directly to Satan himself.

If exorcism were Satan fighting Satan, his own kingdom would already be collapsing.

Hath an end means Satan's defeat is certain, not just possible.

Their own logic actually points to Satan's doom, not to Jesus's guilt.

😈 The picture now applies to Satan directly

💥 Satan fighting Satan would collapse his kingdom

⏳ Hath an end means his defeat is certain

📖 Their own logic points to Satan's doom

## 💪 No Man Can Enter Into A Strong Man's House, And Spoil His Goods, Except He Will First Bind The Strong Man

The strong man pictures Satan himself.

His house pictures his hold over people and evil spirits.

To spoil his goods means to take back what he controlled.

Someone has to overpower the strong man first.

Only then can anything be taken from his house.

Jesus casting out demons proves he has already won.

💪 The strong man pictures Satan himself

🏠 His house means his hold over evil

🔓 Binding him must happen first

📖 Jesus already proved he beat Satan

# Mark 3:28-30
# ⚠️ A Sin That Cannot Be Forgiven
---
## ✅ Verily I Say Unto You, All Sins Shall Be Forgiven Unto The Sons Of Men

Verily is Jesus's way of signaling that an especially important truth is coming.

This promise is wide and generous, covering every ordinary sin and failure.

Jesus leads with this good news before giving any kind of warning.

The scope here is meant to comfort, not to minimize what comes next.

✅ Verily signals an important truth

🌍 This promise covers nearly every sin

💚 Good news comes before any warning

📖 Comfort comes first, warning comes after

## 🚫 He That Shall Blaspheme Against The Holy Ghost Hath Never Forgiveness

This is not about a stray curse word or a moment of doubt.

In context, it means calling God's own work the work of Satan instead.

That is exactly what the scribes just did two verses earlier in this chapter.

A hardened, settled rejection of the truth is what makes this sin different.

🚫 This is not a careless curse word

😈 It means calling God's work Satan's work

📖 The scribes just did this two verses back

➡️ Settled rejection makes this sin different

## ⚖️ In Danger Of Eternal Damnation

Damnation names a final, lasting judgment, not a temporary punishment.

Eternal makes clear this consequence does not end or get undone later.

Jesus states this plainly, without softening the weight of the warning.

The seriousness of this sin matches the seriousness of its consequence.

⚖️ Damnation means a final judgment

⏳ Eternal means it never ends

🗣️ Jesus states this without softening it

📖 The warning matches the sin's weight

## 🔗 Because They Said, He Hath An Unclean Spirit

This line explains exactly why Jesus gave the warning in the first place.

The scribes had just credited God's own work in Jesus to an unclean spirit.

Mark places the warning right next to the accusation that triggered it.

The whole passage reads as one connected moment, not two separate topics.

🔗 This explains the warning's real trigger

😈 They blamed God's work on an unclean spirit

📖 Mark places both right next to each other

➡️ One connected moment, not two topics

# Mark 3:31-35
# 👪 Jesus Redefines Family
---
## 👪 There Came Then His Brethren And His Mother

Brethren here means Jesus's own half brothers.

They were the other children of Mary and Joseph.

Standing without means they are stuck outside.

They cannot push through the thick crowd.

This is likely the same family mentioned back in verse twenty one.

The family that doubted him has now come to find him in person.

👪 Brethren means his own half brothers

🚪 Standing without means stuck outside

🔁 This matches verse twenty one's family

➡️ They came to find him in person

## 📣 Sent Unto Him, Calling Him

The family does not push through the crowd themselves, they send word instead.

A message gets passed along the edge of the crowd until it reaches Jesus.

This detail shows just how packed and difficult to move through the scene really was.

Even his own mother cannot simply walk up to him.

📣 A message gets passed through the crowd

👥 Even family could not push through easily

🏠 This shows how packed the scene was

➡️ Not even his mother could just walk up

## ❓ Who Is My Mother, Or My Brethren

Jesus is not rejecting or insulting his own mother and brothers with this question.

He is using their arrival to make a much bigger point to everyone listening.

His own answer to this question comes just two verses later.

Family, by itself, is not what defines belonging in God's family.

❓ This is not an insult to his family

🎯 He is building toward a bigger point

⏳ His own answer comes two verses later

➡️ Blood alone does not define God's family

## 👀 Behold My Mother And My Brethren

Jesus looks at the ordinary people sitting around him as he says this.

None of them are related to him by blood at all.

He is redrawing the lines of family around something other than birth.

Sitting close and listening becomes its own kind of belonging here.

👀 He looks at the crowd around him

🚫 None of them share his blood

🔄 He redraws the lines of family

➡️ Listening close becomes real belonging

## 🌍 Whosoever Shall Do The Will Of God, The Same Is My Brother, And My Sister, And Mother

Whosoever means this invitation is open to absolutely anyone, not a closed family circle.

Doing God's will, not shared blood, is what Jesus names as the real family tie.

The chapter opened with Jesus healing a stranger and now closes by calling strangers family.

Obedience to God turns anyone into Jesus's own brother, sister, or mother.

🌍 Whosoever means open to absolutely anyone

🙏 Doing God's will defines real family here

🔁 The chapter opened and closes on outsiders

📖 Obedience makes anyone Jesus's own family
`.trim();

export const MARK_THREE_PERSONAL_SECTIONS = parseMarkThreeRawNotes(MARK_THREE_RAW_NOTES);
