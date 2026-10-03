export type EzekielTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyOneRawNotes(rawText: string): EzekielTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 21:${startVerse}` : `Ezekiel 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezekiel 21 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_ONE_RAW_NOTES = `# Ezekiel 21:1-5
# ⚔️ The Sword Is Drawn Against The Land
---
## 👁️ Set Thy Face Toward Jerusalem

God tells Ezekiel to physically turn his body and look toward Jerusalem.

This was not a private thought.

It was a visible, acted out sign for anyone watching him in Babylon.

Ezekiel's own body became part of the message he carried.

👁️ Set thy face means turn and look
🎭 Ezekiel acts out the message with his body
🏙️ Jerusalem is the target of this sign
📖 The prophet himself becomes part of the warning

## 🌧️ Drop Thy Word Toward The Holy Places

To "drop" a word pictures speech falling like rain, steady and unstoppable.

The holy places are the temple and its sacred courts in Jerusalem.

Even the most sacred site in Israel is not shielded from this message.

🌧️ Drop pictures words falling like rain
🏛️ Holy places means the temple itself
🚫 No building is shielded from judgment
➡️ Even sacred ground must hear this word

## ⚔️ I Am Against Thee

God names Himself as the direct opponent of His own people.

This is not Babylon's army acting alone.

The real conflict in this chapter is between God and Jerusalem.

Babylon only becomes the hand He chooses to use.

⚔️ God names Himself as the opponent
🪖 Babylon is the hand, not the cause
🏙️ Jerusalem faces God directly here
📖 The real conflict is with God Himself

## 🗡️ Draw Forth My Sword Out Of His Sheath

A sheath is the covering that keeps a blade safely hidden away.

Drawing the sword out means the threat is no longer distant or theoretical.

This single image of a drawn sword controls almost the entire chapter.

🗡️ A sheath hides a blade safely
⏰ Drawing it means judgment has arrived
🔁 The sword image runs through this chapter
➡️ What was hidden is now exposed

## 💔 Cut Off From Thee The Righteous And The Wicked

This sounds like the righteous and wicked are treated exactly alike.

Ezekiel eighteen already taught that God judges each person by their own choices.

Here the sword describes a coming war, not a courtroom verdict on each soul.

A sword falling on a nation in battle does not sort people one by one.

💔 War sweeps over righteous and wicked alike
📜 Chapter eighteen already explained personal judgment
⚔️ This verse describes a coming war
📖 A sword in battle sorts no one

## 🧭 From The South To The North

This phrase names both ends of the land to mean the whole territory.

Nothing from one border to the other escapes what is coming.

Naming two far opposite points was a common way to describe an entire region.

🧭 South to north means every direction
🗺️ No region of the land is spared
🌍 The whole territory faces this sword
➡️ A phrase this wide leaves nothing out

## 📖 That All Flesh May Know That I The LORD

The judgment itself is not the final goal here.

God states plainly why this is happening, so people will recognize who He is.

Even a disaster this painful is meant to reveal God's identity, not just punish.

📖 Knowing God is the real goal
💥 Judgment is the means, not the point
👁️ Disaster can still reveal who God is
➡️ Even pain can point back to God

# Ezekiel 21:6-10
# 😢 Sigh Before Their Eyes
---
## 😢 Sigh... With The Breaking Of Thy Loins

God commands Ezekiel to act out physical collapse in front of everyone.

"Breaking of thy loins" pictures the sudden weakness of a body giving way to grief.

Ezekiel becomes a living picture of the nation's coming devastation.

😢 Ezekiel acts out physical collapse
💔 Loins breaking pictures sudden weakness
🎭 His body becomes a living message
📖 The prophet feels what the nation will feel

## 🦵 All Hands Shall Be Feeble

Feeble hands describe strength completely draining out of a person.

Soldiers with feeble hands cannot even hold a weapon properly.

This is total loss of the will and ability to resist.

🦵 Feeble means all strength is gone
🛡️ Soldiers lose the ability to fight
😨 This is total, not partial, weakness
➡️ Fear can drain strength from anyone

## 💧 All Knees Shall Be Weak As Water

Water cannot hold any shape or support any weight on its own.

Knees as weak as water means legs that can no longer hold a person upright.

This is the picture of terror so complete that standing becomes impossible.

💧 Water holds no shape or weight
🦵 Weak knees mean legs giving out
😱 This pictures total, overwhelming terror
📖 Fear this size can paralyze a whole city

## 📰 For The Tidings Because It Cometh

"Tidings" is an old word simply meaning news or a report.

Ezekiel's sighing is his honest reaction to news of the coming disaster.

He is not performing sadness, he is genuinely responding to what he already knows.

📰 Tidings is an old word for news
😢 Ezekiel reacts honestly, not for show
⏳ The disaster is still approaching, not here yet
➡️ Real news deserves a real reaction

## ⚔️ A Sword, A Sword Is Sharpened, And Also Furbished

Repeating "a sword" twice is a Hebrew way of adding weight to the warning.

"Furbished" means polished bright, the way a soldier prepares a blade before battle.

A sharpened and furbished sword is a weapon fully ready to be used.

⚔️ Repetition adds weight to the warning
✨ Furbished means polished for battle
🗡️ A ready weapon needs no more preparation
📖 This sword is fully prepared to strike

## 🎉 Should We Then Make Mirth?

"Mirth" means laughter or celebration, the normal mood of a feast or party.

This rhetorical question has an obvious answer, there is nothing here worth celebrating.

Judah had grown careless about how serious this moment actually was.

🎉 Mirth means laughter or celebration
❌ The expected answer here is no
😬 Judah had grown careless about the danger
➡️ Some moments leave no room for celebration

## 🌳 It Contemneth The Rod Of My Son, As Every Tree

This line is one of the hardest to translate in the whole book of Ezekiel.

Many scholars believe it means the sword shows no special favor to Judah.

"My son" likely points to Judah as God's own people.

The sword treats that son like any ordinary piece of wood, with no exception made.

🌳 One of Ezekiel's hardest lines to translate
👨 My son likely points to Judah
🪵 The sword shows no special favor
📖 No one gets an automatic exception

# Ezekiel 21:11-13
# 🗡️ A Weapon Ready For The Slayer
---
## ✋ Given It To Be Furbished, That It May Be Handled

A sword must be shaped and balanced correctly before a hand can use it well.

This line pictures careful preparation, not a rushed or careless act.

Everything about this coming judgment has been deliberately prepared in advance.

✋ A sword must be shaped to be used
🛠️ This pictures careful, deliberate preparation
⏳ Nothing about this judgment is rushed
📖 God's plans are prepared, not sudden guesses

## 🪓 To Give It Into The Hand Of The Slayer

A "slayer" here is simply the one who carries out the killing in battle.

Babylon becomes that human slayer, the hand that actually swings the sword.

God remains the one who set the whole judgment in motion.

🪓 Slayer means the one who strikes
🪖 Babylon becomes that human hand
🙌 God still directs the whole event
➡️ A human hand can still serve God's plan

## 😭 Cry And Howl... Smite Therefore Upon Thy Thigh

Striking one's own thigh was an ancient gesture of grief and alarm.

It is close to the modern picture of someone pounding their own chest in anguish.

Ezekiel is told to visibly mourn in front of the people watching him.

😭 Thigh striking showed grief in that culture
💔 It compares to pounding one's chest today
🎭 Ezekiel visibly mourns before the people
📖 Grief here is physical, not just spoken

## 👑 It Shall Be Upon All The Princes Of Israel

"Princes" here means the ruling class, the leaders and nobles of the nation.

This judgment is not limited to ordinary citizens caught in a war.

The very people meant to protect Israel are named as targets themselves.

👑 Princes means the ruling leaders
🏛️ This reaches the very top of society
🛡️ Protectors are also under judgment here
➡️ No rank shields anyone from this sword

## ⚖️ Because It Is A Trial

A "trial" here means a real test, not a random or meaningless act of violence.

This judgment proves something true about the nation's actual condition.

It is not cruelty without a cause.

⚖️ Trial means a genuine test
🔍 It proves something true about the nation
🚫 This is not cruelty without reason
📖 God's judgment always carries real purpose

# Ezekiel 21:14-17
# 👏 The Sword Doubled A Third Time
---
## 👏 Smite Thine Hands Together

Clapping hands here is not applause or celebration of any kind.

In this context it is a gesture marking shock and the force of a decree.

Ezekiel repeats this same clapping gesture later in verse seventeen.

👏 Clapping here is not celebration
😮 It marks shock and a serious decree
🔁 This same gesture returns in verse seventeen
➡️ A simple gesture can carry heavy weight

## 🔁 Let The Sword Be Doubled The Third Time

This phrase does not describe counting out exactly three separate strikes.

Hebrew often repeats a number this way to describe judgment multiplying and escalating.

The point is severity increasing, not a literal tally.

🔁 This is not a literal count of three
📈 Hebrew uses repetition to show escalation
💥 The real point is increasing severity
📖 Numbers like this describe weight, not math

## 🚪 Entereth Into Their Privy Chambers

A "privy chamber" was a private inner room, the most secure part of a house.

Even that hidden, secure space offers the people inside no real protection.

There is no corner left to hide in once this sword moves.

🚪 Privy chamber means a private inner room
🏠 Even hidden rooms offer no safety here
🚫 No corner is left to hide in
➡️ Judgment reaches past every locked door

## 🏰 Set The Point Of The Sword Against All Their Gates

City gates were the main entrances and the key points of defense.

Aiming the sword at the gates pictures an attack on the city's whole ability to defend itself.

Once the gates fail, nothing inside the walls remains protected.

🏰 Gates were a city's key defense point
🗡️ The sword targets that defense directly
🧱 Once gates fail, the walls mean little
📖 This pictures total, not partial, exposure

## 🧭 Go Thee One Way Or Other, Either On The Right Hand, Or On The Left

Here the sword itself is spoken to as though it were a living soldier.

Wherever Ezekiel's face is set, in his acted out sign, the sword is told to strike there.

This connects directly to the two roads the king of Babylon will choose between next.

🧭 The sword is addressed like a soldier
👁️ It follows wherever Ezekiel's face points
🛣️ This sets up the two roads ahead
➡️ One small gesture points to a bigger choice

## 😮 I Will Cause My Fury To Rest

"Rest" here does not mean God relaxing or calming down early.

It means His anger will finally be spent once the judgment is fully carried out.

The fury does not fade on its own, it runs its full course first.

😮 Rest here means fury fully spent
⏳ It is not an early calming down
🔥 The judgment must run its full course
📖 God's anger here has a clear endpoint

# Ezekiel 21:18-23
# 🪙 The King Of Babylon At The Crossroad
---
## 🛣️ Appoint Thee Two Ways

God tells Ezekiel to physically mark out two roads, likely by drawing them on the ground.

This acted out sign mirrors a real decision the king of Babylon will soon face.

One prophetic drawing becomes a preview of an actual military choice.

🛣️ Ezekiel draws two roads on the ground
🪖 This mirrors a real choice Babylon faces
🎭 A drawing becomes a prophetic preview
📖 God reveals a choice before it happens

## 🏙️ Rabbath Of The Ammonites

Rabbath was the capital city of Ammon, located where the city of Amman stands today.

It stood as a second possible target for Babylon's army besides Jerusalem.

Ammon was Judah's neighbor, not a distant or unrelated nation.

🏙️ Rabbath was Ammon's capital city
📍 It stands where Amman is today
🧭 It was a second possible target
➡️ Judah's neighbor faces the same danger

## 🏯 Judah In Jerusalem The Defenced

"Defenced" is an old word meaning heavily fortified and built for defense.

Jerusalem's walls and defenses still could not guarantee safety from this coming sword.

Strong walls mean little when the real threat comes from God's own judgment.

🏯 Defenced means heavily fortified
🧱 Jerusalem's walls could not stop this
⚔️ The real threat was not military alone
📖 No wall can block a judgment from God

## 🎯 At The Parting Of The Way... To Use Divination

Divination was the ancient practice of seeking guidance from omens or signs.

The king of Babylon genuinely relied on these pagan methods to decide which city to attack.

God uses even a pagan king's superstition to carry out His own real plan.

🎯 Divination means seeking guidance from omens
🪖 Babylon's king genuinely used this method
🙌 God works even through a pagan ritual
➡️ God can use what people trust wrongly

## 🏹 He Made His Arrows Bright

This describes an ancient practice called belomancy, shaking marked arrows from a container.

Whichever arrow fell out first was read as the god's chosen direction.

It was treated as a serious decision making tool in that culture, not a game.

🏹 Belomancy means divination using arrows
🎲 The first arrow out marked the choice
🪖 It was a serious tool, not a game
📖 Babylon trusted superstition to choose a target

## 🔮 He Consulted With Images... He Looked In The Liver

"Images" here refers to small household idols consulted for guidance.

Looking in the liver describes hepatoscopy, examining an animal's liver for meaning in its shape.

Babylon used every pagan method available before marching toward either city.

🔮 Images means small household idols
🩺 Liver reading examined an animal's organ
🪖 Babylon used every method it trusted
➡️ None of it changed God's actual plan

## 🙅 As A False Divination In Their Sight

From Jerusalem's point of view, Babylon's pagan rituals would look meaningless and false.

Yet the outcome that superstition points toward still matches God's real judgment.

A method can be false and still arrive at a true result God already decided.

🙅 Jerusalem would call this method false
🎯 The outcome still matches God's real plan
🪖 Babylon's confidence was never the real cause
📖 A false method still served a true purpose

## 📜 He Will Call To Remembrance The Iniquity

Jerusalem may dismiss Babylon's divination as nonsense and feel falsely safe.

The real reason for their coming capture is their own guilt, already known to God.

Superstition decided Babylon's method, but guilt decided the outcome.

📜 Jerusalem's own guilt is the real cause
😌 False confidence does not remove real guilt
⚖️ Superstition picked the method, not the outcome
➡️ Hidden guilt is still known to God

# Ezekiel 21:24-27
# 👑 The Crown Is Removed
---
## 🔍 Your Iniquity To Be Remembered... Ye Shall Be Taken With The Hand

Judah's sin has not stayed hidden, it has come fully into view.

"Taken with the hand" pictures actual soldiers physically seizing and capturing people.

Guilt that comes to light here does not stay a private, abstract matter.

🔍 Hidden guilt has now come into view
✋ Taken with the hand means real capture
⚠️ This guilt leads to real consequences
📖 Sin eventually surfaces into plain sight

## 👑 Profane Wicked Prince Of Israel

This title points directly at Zedekiah, the last king of Judah before Babylon's conquest.

"Profane" means he treated what was sacred as common and worthless.

A king meant to honor God's covenant instead showed contempt for it.

👑 This names King Zedekiah directly
🚫 Profane means treating the sacred as common
😔 Zedekiah showed contempt for the covenant
➡️ Leaders are judged by what they honor

## 💎 Remove The Diadem, And Take Off The Crown

A diadem was a royal headband, worn alongside the crown as a sign of rulership.

Stripping away both symbols removes every visible mark of Zedekiah's authority.

This is the formal, public end of his reign as king.

💎 A diadem was a royal headband
👑 Crown and diadem both mark authority
🏁 Both are stripped from Zedekiah here
📖 This marks the formal end of his reign

## ⚖️ Exalt Him That Is Low, And Abase Him That Is High

This describes a reversal, where the powerful are brought down and the humble are lifted.

This same pattern of reversal appears again and again throughout scripture.

It is not random cruelty, it reflects how God consistently deals with pride.

⚖️ This describes a complete reversal
🔁 The same pattern repeats throughout scripture
💔 Pride is regularly brought low
📖 God consistently humbles what exalts itself

## 🌀 I Will Overturn, Overturn, Overturn, It

Repeating one word three times in Hebrew emphasizes total, complete destruction.

This is aimed at the corrupt human throne in Jerusalem, not at God's own rule.

The repetition leaves no doubt about how thorough this collapse will be.

🌀 Triple repetition shows total destruction
👑 It targets the human throne, not God
💥 The collapse is complete, not partial
➡️ Some judgments need no further explanation

## 👑 Until He Come Whose Right It Is

This line points forward to a rightful ruler still to come.

It echoes an older promise in Genesis about a ruler from Judah's line called Shiloh.

Christians read this as a hint pointing all the way forward to Christ.

👑 This points to a future rightful ruler
📜 It echoes the older promise about Shiloh
✝️ Christians connect this hint to Christ
📖 Even in judgment, a promise survives

# Ezekiel 21:28-32
# 🔥 Judgment Turns To The Ammonites
---
## 😏 Concerning The Ammonites, And Concerning Their Reproach

"Reproach" means mocking insult, scorn aimed at someone else's downfall.

Ammon had been taunting Judah over its coming collapse.

Now the same sword that struck Judah turns to face Ammon as well.

😏 Reproach means mocking scorn
👎 Ammon had taunted Judah's downfall
🗡️ The same sword now turns to Ammon
📖 Mocking another nation's judgment invites one's own

## 🎭 They See Vanity Unto Thee, They Divine A Lie Unto Thee

Ammon's own prophets and diviners were telling them comforting, false messages.

"Vanity" here means something empty, with no real substance behind it.

False comfort from their own advisers left Ammon unprepared for what was actually coming.

🎭 Ammon's own prophets offered false comfort
🫧 Vanity here means empty and hollow
😴 False comfort left them unprepared
➡️ Comforting lies do not stop real danger

## ❓ Shall I Cause It To Return Into His Sheath?

This rhetorical question expects a clear answer, no, it will not be sheathed yet.

The sword that struck Judah still has work left to do against Ammon.

God had already named Ammon as a second target back in verse twenty.

❓ The expected answer here is no
🗡️ The sword's work is not finished yet
🧭 Ammon is the sword's next target
📖 Judgment will not stop before its purpose

## 🏡 In The Place Where Thou Wast Created, In The Land Of Thy Nativity

"Nativity" here simply means the place of one's birth or origin.

Ammon will be judged on its own home soil, not somewhere far away.

There is no distant refuge that puts this judgment out of reach.

🏡 Nativity means one's own homeland
🧭 Ammon is judged right where it began
🚫 Distance offers no real refuge here
➡️ Judgment can reach a nation at home

## 🪖 Deliver Thee Into The Hand Of Brutish Men, And Skilful To Destroy

"Brutish" describes men acting without mercy, almost like untamed animals in battle.

Being "skilful to destroy" means this is not a clumsy or accidental defeat.

Babylon's army is described here as both fierce and highly effective at war.

🪖 Brutish means acting without mercy
🎯 Skilful to destroy means highly effective
⚔️ Babylon is both fierce and capable
📖 This defeat is thorough, not accidental

## 🔥 Thou Shalt Be For Fuel To The Fire

This pictures total consumption, the way dry wood is completely used up by flame.

Nothing of lasting value is expected to remain standing after this judgment.

It is one of the most complete destruction images in the entire chapter.

🔥 Fuel pictures total consumption by flame
🪵 Nothing lasting is left standing
💥 This is complete, not partial, loss
➡️ Some images need no further softening

## 🚫 Thou Shalt Be No More Remembered

This marks the end of the Ammonites as a nation of lasting significance.

Unlike Judah, who still carried a promise of future restoration elsewhere in scripture, Ammon simply fades from importance.

Being forgotten by history is its own kind of quiet judgment.

🚫 Ammon fades from lasting significance
📜 Judah still carried a future promise
🤫 Being forgotten is its own judgment
📖 Not every nation's story continues
`.trim();

export const EZEKIEL_TWENTY_ONE_PERSONAL_SECTIONS = parseEzekielTwentyOneRawNotes(EZEKIEL_TWENTY_ONE_RAW_NOTES);
