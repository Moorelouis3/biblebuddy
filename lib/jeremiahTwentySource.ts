export type JeremiahTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyRawNotes(rawText: string): JeremiahTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 20:${startVerse}` : `Jeremiah 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 20 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_RAW_NOTES = `# Jeremiah 20:1-3
# 🪵 Struck And Put In The Stocks
---
## 👤 Pashur The Son Of Immer The Priest

Pashur was a priest from a respected family in the temple.

His father Immer's name later marks an entire division of priests in Ezra and Nehemiah.

This was not some random enemy of Jeremiah.

A powerful priest, not a stranger, is the one who moves against him.

👤 Pashur came from a priestly family

📜 Immer's name marks a whole priestly line

⚔️ No random enemy, a powerful priest

📖 Even the priesthood turned against Jeremiah

## 🏛️ Chief Governor In The House Of The LORD

This title means Pashur was in charge of order at the temple.

He had the authority to arrest anyone causing a disturbance there.

Jeremiah's preaching about coming disaster counted as exactly that kind of disturbance.

The very man responsible for temple order used that power against God's messenger.

🏛️ Chief governor means temple security chief

🚨 He had power to arrest troublemakers

🗣️ Jeremiah's preaching counted as a disturbance

📖 Temple order was used against a prophet

## 👊 Pashur Smote Jeremiah The Prophet

Smote means struck with force, likely a formal beating.

Jewish law allowed forty stripes as punishment for certain offenses.

Pashur is not just arguing with Jeremiah, he is physically assaulting him.

This is the first time in the book Jeremiah suffers violence for his message.

👊 Smote means struck with real force

📏 Jewish law allowed up to forty stripes

🩹 This was physical assault, not argument

📖 The first violence against Jeremiah in this book

## 🪵 Put Him In The Stocks

Stocks means a wooden frame that locked around the hands, feet, or neck.

The device forced the body into a painful, twisted position for hours.

It was also a public display meant to humiliate, not just to hurt.

Anyone passing through the temple gate would see Jeremiah on display like a criminal.

🪵 Stocks means a locking wooden frame

😖 The position itself caused real pain

👀 It was meant to humiliate publicly

📖 Jeremiah was displayed like a criminal

## 🚪 The High Gate Of Benjamin

This gate sat on the north side of the temple courts.

It was one of the busiest entrances, used by crowds heading to worship.

Placing the stocks there guaranteed the largest possible audience.

Pashur wanted Jeremiah's humiliation seen by as many people as possible.

🚪 The gate sat on the temple's north side

🚶 It was a busy, heavily used entrance

👥 A busy gate meant a bigger audience

📖 Pashur wanted maximum public humiliation

## 📆 Pashur Brought Forth Jeremiah Out Of The Stocks

Morrow is an old word for the next day.

Jeremiah spent an entire night locked in the stocks before release.

Whatever plan Pashur had, one night was apparently enough to satisfy it.

Jeremiah's first words after release are not fear, they are a prophecy.

📆 Morrow means the following day

🌙 Jeremiah spent a full night restrained

🔓 Release came after just one night

📖 Jeremiah answers with prophecy, not fear

## 😱 The LORD Hath Not Called Thy Name Pashur, But Magormissabib

Magormissabib means terror on every side in Hebrew.

God renames Pashur the same way He once renamed Abram and Jacob.

Those earlier renamings marked a blessing, this one marks a curse.

Pashur's own name will now announce the disaster coming on him.

😱 Magormissabib means terror on every side

🔁 Renaming recalls Abram and Jacob's stories

⚡ This renaming is a curse, not a blessing

📖 His name now predicts his downfall

# Jeremiah 20:4-6
# ⚔️ A Prophecy Against Pashur
---
## 😨 I Will Make Thee A Terror To Thyself

This phrase directly explains the new name Magormissabib from verse three.

Pashur will not just frighten others, he will become afraid of his own life.

Guilt and coming disaster will make him fear everything around him.

The judgment starts inside Pashur himself before it ever reaches the nations.

😨 This phrase explains the name Magormissabib

🪞 Pashur becomes afraid of his own life

⚡ Guilt and disaster fill him with fear

📖 Judgment begins inside Pashur himself

## 👁️ Thine Eyes Shall Behold It

This phrase means Pashur will personally witness the coming disaster.

He will not just hear a report of Judah's fall from far away.

Watching it happen will be part of his own punishment.

Seeing disaster with your own eyes hurts differently than only hearing about it.

👁️ Behold it means witnessing it firsthand

📰 Not just a report from far away

😢 Watching becomes part of the punishment

📖 Seeing hurts more than only hearing

## 💔 They Shall Fall By The Sword Of Their Enemies

Friends here means everyone in Pashur's inner circle, not just family.

Judah's coming war with Babylon will not spare people connected to him.

His false comfort to the people will end up costing them dearly.

Their deaths become one more piece of the judgment against Pashur himself.

👥 Friends means his whole inner circle

🏴 Judah's war spares no one connected

💔 False comfort costs others dearly

📖 Their deaths add to Pashur's judgment

## 🏴 I Will Give All Judah Into The Hand Of The King Of Babylon

This names Babylon specifically, not just an unnamed foreign enemy.

Babylon was the rising empire that would soon destroy Jerusalem completely.

This is one of the clearest, most direct predictions in the whole book.

Pashur wanted comfortable lies, Jeremiah answers with an exact enemy's name.

🏴 Babylon is named specifically here

👑 Babylon was the rising world empire

🎯 One of the book's clearest predictions

📖 An exact name replaces comfortable lies

## ⛓️ He Shall Carry Them Captive Into Babylon, And Shall Slay Them With The Sword

This describes exile and death together, the two harshest outcomes of war.

Some in Judah would be marched away as captives to a foreign land.

Others would not survive long enough to be taken at all.

Both outcomes trace back to a warning Pashur tried to silence.

⛓️ Captivity means forced exile to Babylon

🗡️ Slay with the sword means death in war

💀 Two outcomes, exile or death

📖 Both trace back to a silenced warning

## 👑 All The Treasures Of The Kings Of Judah

This lists the wealth built up by generations of Judah's kings.

Gold, silver, and temple treasures had been gathered over hundreds of years.

Babylon will not just conquer people, it will strip the nation bare.

Everything Judah's kings spent generations collecting leaves in a single conquest.

👑 Treasures means generations of royal wealth

🏺 Gold, silver, and temple items included

🏴 Babylon strips the nation, not just conquers

📖 Generations of wealth leave in one conquest

## 🏠 Thou, Pashur, And All That Dwell In Thine House Shall Go Into Captivity

This judgment reaches beyond Pashur to his entire household.

His family shares in the consequence of his own actions against Jeremiah.

Verse six repeats and confirms the new name Magormissabib given earlier.

Pashur cannot protect the people closest to him from what is coming.

🏠 Judgment reaches his whole household

👪 Family shares the consequence with him

🔁 This confirms the name Magormissabib

📖 Pashur cannot shield those closest to him

## ⚰️ There Thou Shalt Die, And Shalt Be Buried There

Dying and being buried in Babylon meant dying far from home soil.

For an Israelite, burial in the promised land carried real spiritual weight.

Pashur will lose that connection completely, along with everything else.

Even his grave becomes part of the punishment for opposing God's prophet.

⚰️ Dying in Babylon means dying far from home

🏡 Burial in the land held real meaning

🚫 Pashur loses that connection entirely

📖 Even his grave becomes part of the judgment

## 🗣️ To Whom Thou Hast Prophesied Lies

Pashur was not simply a temple officer, he also spoke false prophecies.

He likely promised the people peace and safety instead of coming disaster.

That false comfort makes his punishment personal, not just official duty.

Jeremiah's true, hard word stands in direct contrast to Pashur's easy lies.

🗣️ Pashur spoke false prophecies himself

🕊️ He likely promised false peace and safety

⚖️ False comfort makes this judgment personal

📖 Truth and easy lies stand in contrast

# Jeremiah 20:7-10
# 🔥 A Fire Shut Up In My Bones
---
## 🙅 O LORD, Thou Hast Deceived Me, And I Was Deceived

This does not mean God lied to Jeremiah about anything factual.

Deceived here reflects raw, honest complaint, not a doctrinal claim about God.

Jeremiah feels tricked because obeying God's call brought him only suffering.

The psalms of lament use this same kind of shocking honesty toward God.

🙅 Not a claim that God actually lied

😤 Deceived expresses raw, honest complaint

💔 Obedience brought Jeremiah only suffering

📖 Honest complaint has its place in scripture

## 💪 Thou Art Stronger Than I, And Hast Prevailed

Jeremiah admits he tried to resist his calling and lost.

Chapter one already recorded him objecting that he was too young to speak.

God's persistence simply outlasted every one of Jeremiah's objections.

Being overpowered by God here is not shameful, it is simply true.

💪 Jeremiah admits he tried to resist

📜 Chapter one recorded his first objection

⏳ God's persistence outlasted every objection

📖 Being overpowered by God is not shameful

## 😆 I Am In Derision Daily, Every One Mocketh Me

Derision means open mockery meant to humiliate someone in public.

This mockery follows Jeremiah every single day, not just after the stocks.

His own neighbors and countrymen have turned his message into a joke.

Being right about the coming disaster has not earned him any respect.

😆 Derision means open, humiliating mockery

📆 The mockery happens daily, not once

🏘️ His own neighbors turned on him

📖 Being right earned him no respect

## ⚔️ I Cried Violence And Spoil

Jeremiah's actual message was a warning of violence and looting to come.

Reproach means his true message became something people mocked, not respected.

Speaking truthfully about disaster turned him into the target instead of Babylon.

Faithful preaching earned him public shame instead of a fair hearing.

⚔️ His message warned of violence and looting

🙄 Reproach means his message drew mockery

🎯 He became the target instead of Babylon

📖 Faithful preaching brought shame, not respect

## 🛑 I Will Not Make Mention Of Him, Nor Speak Any More In His Name

Jeremiah considers quitting the prophet's job entirely out of exhaustion.

He wants to simply stop speaking about God in public altogether.

This admission shows real human weariness, not a lack of true faith.

Even faithful prophets reach a point where they want to stop.

🛑 Jeremiah considers quitting completely

🤐 He wants to stop speaking God's name

😩 This shows real human weariness

📖 Even faithful prophets reach a breaking point

## 🔥 His Word Was In Mine Heart As A Burning Fire Shut Up In My Bones

This pictures a fire trapped inside Jeremiah with nowhere to escape.

He tried to hold the message in, exactly as he said in the line before.

The pressure of God's word inside him became impossible to contain.

Silence was never really an option, no matter how much he wanted it.

🔥 A fire trapped inside with no escape

🤫 Jeremiah tried to hold the message in

💥 The pressure became impossible to contain

📖 Silence was never truly an option

## 🤐 I Was Weary With Forbearing, And I Could Not Stay

Forbearing means holding something back, in this case his own words.

Jeremiah grew physically and emotionally tired from trying to stay silent.

Eventually the effort of staying quiet cost more than speaking ever did.

His silence broke, and the message came out despite everything against him.

🤐 Forbearing means holding words back

😩 Jeremiah grew tired from staying silent

⚖️ Silence cost more than speaking did

📖 The message came out despite everything

## 😨 For I Heard The Defaming Of Many, Fear On Every Side

Fear on every side directly repeats the meaning of Magormissabib from verse three.

Jeremiah now hears people using his own prophesied name as an insult against him.

Defaming means people are actively spreading rumors meant to damage his reputation.

The very words God gave him have become weapons used against him.

😨 Fear on every side echoes Magormissabib

🗣️ People use his own prophecy as an insult

📰 Defaming means spreading damaging rumors

📖 God's words became weapons against him

## 👥 All My Familiars Watched For My Halting

Familiars means close friends and trusted companions, not strangers.

Halting means stumbling or making some kind of costly mistake.

People Jeremiah once trusted are now hoping he slips up and fails.

Peradventure, an old word for perhaps, shows they are actively plotting his downfall.

👥 Familiars means close, trusted friends

👣 Halting means stumbling into a mistake

👀 Former friends now hope he fails

📖 Peradventure shows real plotting against him

# Jeremiah 20:11-13
# 🛡️ The Lord Is With Me
---
## 🛡️ The LORD Is With Me As A Mighty Terrible One

Jeremiah's mood shifts sharply from complaint to confidence in this verse.

Mighty terrible one pictures God as an unstoppable warrior fighting for him.

This is the same confidence Jeremiah briefly loses earlier in this very chapter.

Honest complaint and real faith can exist together in the same prayer.

🛡️ Jeremiah's mood shifts to confidence

⚔️ Mighty terrible one pictures a warrior God

🔁 The same confidence he lost earlier returns

📖 Complaint and faith can coexist in prayer

## 🎯 My Persecutors Shall Stumble, And They Shall Not Prevail

Persecutors here means Pashur and everyone else opposing Jeremiah's message.

Stumble pictures them tripped up and unable to succeed against him.

Jeremiah trusts that their plans will ultimately fail, even if it takes time.

Confidence in God's protection does not mean the danger disappears immediately.

🎯 Persecutors means Pashur and his allies

🦶 Stumble means tripped up, unable to succeed

⏳ Failure may not come immediately

📖 Protection does not erase present danger

## 😳 Their Everlasting Confusion Shall Never Be Forgotten

Confusion here means public disgrace and shame, not simple embarrassment.

Everlasting means this shame will outlast Pashur's own lifetime completely.

Jeremiah expects history itself to remember this as a lasting disgrace.

Unlike Jeremiah's own suffering, this shame will never quietly fade away.

😳 Confusion means real public disgrace

⏳ Everlasting means it outlasts his lifetime

📚 History itself will remember this disgrace

📖 This shame will never quietly fade

## 🫀 O LORD Of Hosts, That Triest The Righteous, And Seest The Reins And The Heart

LORD of hosts pictures God commanding armies of angels, not standing alone.

Reins means the kidneys, used here as an old way of naming deep emotions.

Triest means God actually tests and examines people, not just watches from far away.

Nothing Jeremiah feels inside is hidden from the God he is praying to.

👑 LORD of hosts pictures a commanding God

🫀 Reins is an old word for deep emotions

🔍 Triest means God tests people closely

📖 Nothing inside Jeremiah is hidden from God

## 📂 Let Me See Thy Vengeance On Them, For Unto Thee Have I Opened My Cause

Opened my cause means Jeremiah formally hands his whole complaint over to God.

He is not asking permission to take revenge himself.

Instead he places the entire matter into God's hands alone.

Trusting God with vengeance frees Jeremiah from carrying that weight personally.

📂 Opened my cause means handing it to God

🚫 Jeremiah is not planning personal revenge

🙏 He places the matter in God's hands

📖 Trust frees him from carrying that weight

## 🎶 Sing Unto The LORD, Praise Ye The LORD

This sudden call to worship feels surprising after so much raw complaint.

Jeremiah moves from lament straight into genuine praise within the same prayer.

That shift shows real trust, not simply forced or fake positivity.

Honest faith can hold both deep pain and real worship at once.

🎶 A surprising call to worship appears here

🔁 Jeremiah moves from lament to praise

🙌 The shift shows real trust, not denial

📖 Faith can hold pain and worship together

## 🙏 He Hath Delivered The Soul Of The Poor From The Hand Of Evildoers

Poor here means anyone powerless and mistreated, which includes Jeremiah himself.

Jeremiah counts himself among the poor being rescued by God's hand.

Pashur had all the official power, yet God still delivers the powerless one.

This verse turns Jeremiah's personal ordeal into a promise for anyone oppressed.

🙏 Poor means anyone powerless and mistreated

🧑 Jeremiah counts himself among the poor

⚖️ God delivers the powerless despite Pashur's power

📖 One ordeal becomes a promise for many

# Jeremiah 20:14-18
# 😢 Cursed Be The Day I Was Born
---
## 😢 Cursed Be The Day Wherein I Was Born

This does not mean Jeremiah actually wishes he had never existed as a person.

Cursing a day here was a common ancient way to express unbearable grief.

Job uses this exact same kind of language in Job chapter three.

Even faithful, godly people can reach a point of complete emotional collapse.

😢 Not a literal wish to not exist

📜 Cursing a day expressed unbearable ancient grief

🔁 Job used this same language before

📖 Even faithful people can reach collapse

## 👶 Let Not The Day Wherein My Mother Bare Me Be Blessed

Bare means gave birth to, an old way of describing labor and delivery.

Jeremiah extends his despair from his birth day onto his mother's suffering too.

This is grief speaking at its rawest, without any careful editing.

Scripture preserves this moment honestly instead of smoothing it into something tamer.

👶 Bare means gave birth to someone

💔 The despair extends onto his mother too

😖 This is grief at its rawest

📖 Scripture preserves it honestly, unedited

## 📰 Cursed Be The Man Who Brought Tidings To My Father

Tidings means news, specifically the news announcing Jeremiah's own birth.

Jeremiah wishes he could curse the innocent messenger who delivered that news.

This shows exactly how far his despair has spread beyond his own life.

Even a joyful, harmless moment becomes a target for his pain.

📰 Tidings means the news of his birth

😔 Jeremiah wishes to curse the messenger

💔 Despair spreads beyond his own life

📖 Even a joyful moment becomes a target

## 😊 A Man Child Is Born Unto Thee, Making Him Very Glad

This recalls the exact words once spoken to Jeremiah's father at his birth.

His father's joy at the time is stated plainly, without any doubt.

Jeremiah now wishes that joy had never happened at all.

Turning real joy into an object of hatred shows the depth of his pain.

👶 This recalls the words spoken at his birth

😊 His father's joy is stated plainly

🚫 Jeremiah wishes that joy never happened

📖 Real joy becomes an object of hatred

## 🔥 Let That Man Be As The Cities Which The LORD Overthrew, And Repented Not

This is a direct reference to Sodom and Gomorrah from Genesis nineteen.

Repented not means those cities never turned back from their sin before judgment fell.

Jeremiah wishes the messenger had faced total, sudden destruction instead of good news.

This is the harshest curse in the entire passage, aimed at an innocent man.

🔥 This recalls Sodom and Gomorrah's destruction

🚫 Repented not means no turning back happened

⚡ Jeremiah wishes total, sudden destruction on him

📖 The harshest curse targets an innocent man

## 🕛 Let Him Hear The Cry In The Morning, And The Shouting At Noontide

Noontide is an old word for midday, the hottest and busiest part of the day.

Jeremiah pictures the messenger surrounded by the sounds of disaster at all hours.

Morning and noon together mean there would be no peaceful moment at all.

The wished for punishment matches the constant torment Jeremiah feels in his own life.

🕛 Noontide means midday, the busiest hours

😱 Disaster sounds surround him at all hours

🌅 Morning and noon leave no peace

📖 The wish mirrors Jeremiah's own torment

## ⚰️ Because He Slew Me Not From The Womb

Jeremiah wishes he had died before he was ever even born alive.

Slew here means killed, imagined here as happening before birth instead of after.

This reveals exactly how unbearable his current suffering has actually become.

The wish is not really about hating life, it is about escaping this pain.

⚰️ Jeremiah wishes for death before birth

🗡️ Slew means killed, imagined before birth

😩 This reveals unbearable current suffering

📖 The wish is about escaping pain

## 🤰 My Mother Might Have Been My Grave, And Her Womb To Be Always Great With Me

Jeremiah pictures his mother's womb becoming his grave instead of his birthplace.

Always great with me means permanently pregnant, so birth itself never happens.

This image trades a lifetime of suffering for never having lived at all.

It is one of the most extreme statements of despair in the whole Bible.

⚰️ The womb imagined as a permanent grave

🤰 Always great means permanently pregnant

⚖️ A lifetime of pain traded for nonexistence

📖 One of scripture's most extreme despair statements

## 😮‍💨 Wherefore Came I Forth Out Of The Womb To See Labour And Sorrow

Labour here means hard, exhausting toil, not the act of childbirth.

Jeremiah asks why he was even born only to face constant hardship.

His life since God's call has meant conflict, stocks, and public mockery.

The question is raw and real, not a polished theological statement.

😮‍💨 Labour means hard, exhausting toil here

❓ Jeremiah asks why he was even born

⚔️ His life has meant conflict and mockery

📖 The question is raw, not polished

## 🔥 That My Days Should Be Consumed With Shame

Consumed means completely used up, leaving nothing left over.

Jeremiah feels his entire life has been swallowed by public shame and mockery.

The chapter ends on this bleak note, without any comforting resolution attached.

Scripture lets real pain stand unresolved instead of forcing a tidy ending.

🔥 Consumed means completely used up

😔 His whole life feels swallowed by shame

🚫 No comforting resolution closes the chapter

📖 Real pain is left unresolved here
`.trim();

export const JEREMIAH_TWENTY_PERSONAL_SECTIONS = parseJeremiahTwentyRawNotes(JEREMIAH_TWENTY_RAW_NOTES);
