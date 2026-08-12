export type SecondKingsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsFiveRawNotes(rawText: string): SecondKingsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsFive\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsFive\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsFive\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 5:${startVerse}` : `2 Kings 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 5 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_FIVE_RAW_NOTES = `# SecondKingsFive 5:1-4
# 🩹 A Leper Seeks Healing
---
## 🎖️ Captain Of The Host Of The King Of Syria

Captain of the host means the commander of the whole Syrian army.

Naaman held the highest military rank a foreign king could give.

That rank explains why his sickness carried so much weight.

A powerful man struck by a shameful disease stands out immediately.

🎖️ Captain of the host means commander

⚔️ Naaman led the whole Syrian army

👑 He held Syria's highest military rank

📖 His power made his sickness notable

---

## 🙌 By Him The LORD Had Given Deliverance Unto Syria

This does not mean the Syrians worshiped the LORD.

The LORD here is Israel's God.

He rules far beyond Israel's own borders.

Naaman's victories over other nations came from the LORD's hand.

Syria never knew or acknowledged this at all.

That is a bold claim about God's reach into every nation.

🌍 The LORD ruled far beyond Israel

⚔️ Naaman's victories came from His hand

🙈 Syria never knew or admitted this

📖 God's power reaches every nation

---

## 💔 A Mighty Man In Valour, But He Was A Leper

"Valour" means courage and skill shown in battle.

Naaman had rank, respect, and real success.

Then this one word cuts through all of it.

Leprosy in this era covered many skin diseases.

It was not only the illness we picture today.

It could still cost a person their standing and their future.

💪 Valour means courage in battle

👑 Naaman had rank, respect, and success

💔 Leprosy still marked him deeply

📖 Great strength could not fix this

---

## 👧 She Waited On Naaman's Wife

This girl was taken captive during a Syrian raid into Israel.

She now served in the home of the very man whose army captured her.

Instead of bitterness, she offers Naaman a way to be healed.

Her small, overlooked voice becomes the turning point of the whole chapter.

👧 She was a captured Israelite girl

🏠 She served in Naaman's own household

🙏 She offered help, not bitterness

📖 A servant girl starts this story

---

## 🗣️ Would God My Lord Were With The Prophet That Is In Samaria

"Would God" is an old way of saying I wish.

"My lord" here means her master Naaman, not God.

Samaria was the capital city of the northern kingdom of Israel.

She has every reason to resent the man who captured her.

Her faith reaches out to him anyway.

🙏 Would God means a wish

👑 My lord refers to Naaman

🏙️ Samaria was Israel's capital city

📖 Her faith crossed enemy lines

---

## 💊 He Would Recover Him Of His Leprosy

"Recover" here means a full healing, not a partial improvement.

The girl expects a complete cure for Naaman.

Word of Elisha's power had already reached foreign households like this one.

That detail shows how far Elisha's reputation traveled by this point.

💊 Recover means a complete healing

🎯 She expected a full cure

📣 Elisha's reputation reached foreign homes

📖 God's power was already well known

# SecondKingsFive 5:5-7
# 📜 A Letter To The King Of Israel
---
## 💰 Ten Talents Of Silver, And Six Thousand Pieces Of Gold

A talent was a unit of weight, not a coin.

One talent of silver weighed about seventy five pounds.

Ten talents of silver alone would be worth a fortune.

The king of Syria sent an enormous payment for Naaman's healing.

⚖️ A talent measured weight, not coins

💰 Ten talents of silver was a fortune

👑 Syria's king spared no expense

📖 Money could not buy this miracle

---

## 👘 Ten Changes Of Raiment

"Raiment" simply means clothing or garments.

Fine clothing was extremely valuable in this culture.

It was often given as a formal gift between rulers.

Ten full outfits added even more weight to an already massive gift.

👘 Raiment means clothing or garments

🎁 Fine clothes were valuable gifts

📦 Ten outfits added to the gift

📖 Every detail aimed to impress

---

## 📨 I Have Therewith Sent Naaman My Servant To Thee

The king of Syria assumes the king of Israel controls Elisha directly.

That assumption made sense in a world where prophets often served under kings.

Israel's prophets answered to God, not to any human ruler.

This misunderstanding sets off the king of Israel's panic in the next verse.

👑 Syria's king expected royal control

🙏 Elisha answered to God, not kings

❌ That was a real misunderstanding

📖 The mistake triggers panic next

---

## 😱 He Rent His Clothes

Tearing your own clothes was a dramatic sign of grief or fear.

Kings and ordinary people both used this gesture in a crisis.

The king of Israel reacts before he even thinks of Elisha.

His first instinct is fear, not faith.

😱 Renting clothes showed real distress

👑 Kings used this gesture too

😨 His first reaction was fear

📖 He forgot to ask Elisha

---

## ⚖️ Am I God, To Kill And To Make Alive

The king knows that only God has power over life and death.

He rightly refuses to claim a power that belongs to God alone.

His words are true.

Panic is what drives them, not real doubt.

He simply forgets that God's prophet lives in his own kingdom.

⚖️ Only God controls life and death

🙅 He refuses to claim God's power

😨 Panic, not doubt, drives his words

📖 He forgets Elisha lives nearby

---

## 🗡️ He Seeketh A Quarrel Against Me

The king assumes this letter is a trap, not a real request.

He expects Syria wants an excuse to start a war.

Years of tension between these two kingdoms shaped that fear.

He reads danger into a situation about to become a miracle.

🗡️ He suspects a trap for war

⚔️ Old tension shaped his fear

🌩️ He misreads the whole situation

📖 Fear blinded him to a miracle

# SecondKingsFive 5:8-10
# 🌊 Wash In Jordan Seven Times
---
## 📢 There Is A Prophet In Israel

Elisha hears about the king's panic and steps in immediately.

He is not afraid of Naaman's army or his wealth.

His confidence stands in sharp contrast to the king's fear.

Elisha wants Naaman to know God is still active in Israel.

📢 Elisha steps in with confidence

😨 The king reacted with fear instead

🙏 Elisha trusted God, not politics

📖 God was still active in Israel

---

## 🐎 Naaman Came With His Horses And With His Chariot

Naaman arrives with a full display of his military rank.

Horses and chariots were expensive and marked out someone important.

He expects this visit to match his own high status.

That expectation is about to be quietly overturned.

🐎 Horses and chariots showed high rank

👑 Naaman expected a grand welcome

🎭 His arrival matched his status

📖 That expectation is about to change

---

## 🚪 Stood At The Door Of The House Of Elisha

Naaman expects Elisha himself to greet a man of his rank.

Instead, he is left standing outside the door.

Elisha does not come out at all in this scene.

The silence is the first small blow to Naaman's pride.

🚪 Naaman waits outside the door

🙅 Elisha does not greet him

😤 Naaman expected special treatment

📖 His pride takes a first hit

---

## 📩 Elisha Sent A Messenger Unto Him

Elisha does not come out to speak with Naaman in person.

He sends a servant with the instructions instead.

This was a real insult to a man used to royal treatment.

Elisha wants Naaman to focus on God, not on ceremony.

📩 A servant carries the message

😤 That felt insulting to Naaman

👀 Elisha shifts the focus to God

📖 Naaman needed less ceremony, not more

---

## 🌊 Go And Wash In Jordan Seven Times

The Jordan was a modest, muddy river.

It was nothing like the great rivers of Syria.

Washing seven times ties the healing to a full, complete act.

The instruction is plain and almost embarrassingly simple for a man of Naaman's rank.

God often works healing through ordinary things instead of impressive ones.

🌊 The Jordan was a modest river

🔢 Seven signals a complete act

😳 The command felt too simple

📖 God often heals through ordinary means

# SecondKingsFive 5:11-14
# 😡 Naaman's Anger, Then Obedience
---
## 😠 Naaman Was Wroth

"Wroth" means intensely angry, more than simple annoyance.

Naaman expected honor and instead received a plain command.

The command came through a servant, not from Elisha himself.

His anger comes from wounded pride as much as confusion.

That anger nearly costs him the healing he traveled so far to find.

😠 Wroth means intense anger

😤 Wounded pride fueled his reaction

🚶 He almost walked away healed

📖 Pride nearly cost him everything

---

## 🙌 Strike His Hand Over The Place, And Recover The Leper

Naaman expected a dramatic healing ceremony performed in person.

He pictured Elisha calling on God's name out loud.

He also pictured Elisha waving a hand directly over the leprosy.

Instead, he receives a simple command delivered secondhand.

God's methods here do not match Naaman's expectations at all.

🙌 Naaman expected a dramatic ritual

🖐️ He pictured a hand wave healing

📩 He got a plain command instead

📖 God's methods surprised his expectations

---

## 🏞️ Abana And Pharpar, Rivers Of Damascus

Damascus was Naaman's home city in Syria.

Abana and Pharpar were real rivers there.

They were likely clearer and more impressive than the Jordan.

Naaman assumes a better river should produce a better result.

His pride keeps him focused on the water instead of the instruction.

🏞️ Damascus was Naaman's home city

💧 Its rivers looked more impressive

😤 He assumed better water meant more

📖 Pride distracted him from obedience

---

## 👨‍👦 My Father

Naaman's own servants call him "my father" as a term of deep respect.

That closeness gives them room to challenge him honestly.

This detail shows Naaman was not a harsh, unapproachable commander.

Their honesty ends up saving him from walking away unhealed.

👨‍👦 My father shows deep respect

🗣️ It gave them room to speak

❤️ Naaman was not unapproachable

📖 Their honesty saved his healing

---

## 💧 Wash, And Be Clean

The servants point out how small this command really is.

If Elisha had asked for something difficult, Naaman would have obeyed at once.

A simple command deserves simple obedience.

Their logic finally breaks through his pride.

💧 The command was genuinely simple

🤔 A hard task he would have tried

🗣️ Simple should be even easier

📖 Their logic broke his resistance

---

## 👶 His Flesh Came Again Like Unto The Flesh Of A Little Child

Naaman finally obeys and dips himself seven times in the Jordan.

His skin does not just improve.

It becomes completely new and healthy.

Comparing it to a child's skin points to total restoration, not partial.

The healing matches the completeness of the number seven used just before it.

👶 His skin became fully new

💯 This was total healing, not partial

🔢 It matched the number seven

📖 Obedience led to complete restoration

# SecondKingsFive 5:15-19
# 🙏 A New Faith And A Troubled Conscience
---
## 🌍 Now I Know That There Is No God In All The Earth, But In Israel

Naaman arrives at a real, personal conviction, not just gratitude.

He now believes Israel's God is the only true God over the whole earth.

This is a huge theological statement from a foreign military commander.

His healing led him somewhere far bigger than clean skin.

🌍 Naaman confesses the one true God

💡 This came from real conviction

⚔️ A foreign commander says this

📖 Healing led him to real faith

---

## 🎁 Take A Blessing Of Thy Servant

Naaman offers Elisha a gift to honor and repay him.

Paying a prophet or holy man for help was a normal custom.

Naaman still sees their relationship through the lens of trade and honor.

Elisha is about to correct that assumption.

🎁 A blessing here means a gift

🤝 Paying holy men was common

💱 Naaman still thought in trade

📖 Elisha is about to correct him

---

## 🙅 As The LORD Liveth, Before Whom I Stand, I Will Receive None

This oath was one of the strongest promises a person could make.

Elisha refuses every gift, no matter how much Naaman insists.

He wants Naaman to know the healing came from God.

It did not come from Elisha's own power.

His refusal protects the miracle from looking bought and sold.

🙅 Elisha refuses every single gift

💍 His oath was extremely serious

🙏 The miracle belonged to God

📖 Nothing bought or sold this healing

---

## 🪣 Two Mules' Burden Of Earth

Many people in the ancient world believed a god's power stayed tied to his own land.

Naaman wants to take Israelite soil home with him.

He plans to worship the LORD standing on that very soil.

His request sounds strange today, but it shows genuine, new devotion.

He wants a lasting, physical reminder of the God who healed him.

🪣 Gods were thought tied to land

🌍 Naaman wanted Israelite soil at home

🙏 It showed real, new devotion

📖 He wanted a lasting reminder of God

---

## 🏛️ The House Of Rimmon

Rimmon was a Syrian storm god worshiped in Damascus.

Naaman's official duties still require him to attend the king there.

He is not asking permission to worship Rimmon himself.

He only asks to physically assist his master in that temple.

His new faith now has to live inside an old, complicated job.

🏛️ Rimmon was a Syrian storm god

👑 His job still required attending there

🙏 He was not asking to worship Rimmon

📖 New faith met an old duty

---

## 🕊️ Go In Peace

Elisha does not fully approve or fully condemn Naaman's situation.

His short answer leaves room for God to handle a complicated conscience.

Not every hard question in Scripture gets a detailed, tidy answer.

Trust in God can keep growing even after a miracle is over.

🕊️ Elisha gives a short, open answer

❓ Not every question gets resolved

🙏 God handles the ongoing conscience

📖 Faith kept growing after the miracle

# SecondKingsFive 5:20-24
# 💰 Gehazi's Greed
---
## 🧑‍🤝‍🧑 Gehazi, The Servant Of Elisha The Man Of God

Gehazi works closely with Elisha as his personal servant.

He watched Elisha refuse Naaman's gift just moments earlier.

His decision to chase after Naaman goes directly against what he just saw.

That contrast makes his choice even more clearly wrong.

🧑‍🤝‍🧑 Gehazi served Elisha personally

👀 He watched Elisha refuse the gift

🏃 He chases Naaman anyway

📖 His choice ignored what he saw

---

## 🙅 As The LORD Liveth, I Will Run After Him

Gehazi uses the exact same solemn oath Elisha spoke earlier.

Elisha used it to refuse money.

Gehazi uses it to chase money down.

The same holy words now cover an opposite motive.

That twist exposes exactly how far Gehazi's heart has drifted.

🙅 Gehazi repeats Elisha's own oath

🔄 Elisha refused, Gehazi now chases

💔 Same words, opposite motive

📖 The twist exposes his real heart

---

## 🐎 He Lighted Down From The Chariot To Meet Him

Naaman steps down from his chariot out of continued respect.

His humility has not faded now that he is already healed.

He treats Gehazi as if Gehazi carries Elisha's full authority.

That trust is exactly what Gehazi is about to abuse.

🐎 Naaman still shows real respect

😌 His humility did not fade

🤝 He trusted Gehazi completely

📖 That trust is about to be abused

---

## 🤥 Two Young Men Of The Sons Of The Prophets

Gehazi invents a need that does not actually exist.

"Sons of the prophets" refers to a real group Elisha trained.

He uses that true detail to cover a completely false request.

The lie works because it sounds exactly like something Elisha would ask.

🤥 Gehazi invents a fake need

📿 He borrows a real, true detail

🎭 The lie sounds believable on purpose

📖 A half truth still is a lie

---

## 💰 Be Content, Take Two Talents

Naaman responds with even more generosity than Gehazi asked for.

He doubles the silver without being pressured into it.

Naaman's new faith is already producing real, joyful generosity.

Gehazi's greed is about to take advantage of that same generosity.

💰 Naaman doubles the gift himself

😊 His generosity came freely

🙏 New faith showed in his giving

📖 Gehazi exploits that same generosity

---

## 🏠 He Took Them From Their Hand, And Bestowed Them In The House

Gehazi hides the silver and clothing as soon as he is out of sight.

He sends Naaman's servants away quickly.

No one else can see what happened.

Every step here is secretive, unlike anything Elisha would have done openly.

Hidden actions like this usually mean the person already knows they are wrong.

🏠 Gehazi hides the stolen gift

🏃 He rushes the servants away

🤫 Secrecy marks the whole scene

📖 Hiding it revealed his guilt

# SecondKingsFive 5:25-27
# ☠️ Naaman's Leprosy Falls On Gehazi
---
## ❓ Whence Comest Thou, Gehazi?

Elisha already knows exactly where Gehazi has been.

He still asks the question directly.

That gives Gehazi a real chance to confess.

This is not a trap, it is an open door.

Gehazi is about to slam that door shut himself.

❓ Elisha already knew the truth

🚪 The question was a real chance

🙏 Confession was still possible here

📖 Gehazi chooses to lie instead

---

## 🤥 Thy Servant Went No Whither

"No whither" is an old way of saying nowhere at all.

Gehazi lies directly to Elisha's face without hesitation.

This is the second lie he has told in this same story.

His sin has grown from greed into open, repeated dishonesty.

🤥 No whither means nowhere at all

🗣️ Gehazi lies straight to Elisha

🔁 This was his second lie

📖 Greed grew into open dishonesty

---

## 💭 Went Not Mine Heart With Thee

Elisha reveals he saw the whole scene.

He was not physically there when it happened.

God gave him a kind of spiritual sight beyond normal human limits.

Gehazi's secret was never actually a secret at all.

💭 Elisha saw it without being there

👁️ God gave him spiritual sight

🤫 The secret was never hidden

📖 Nothing stays hidden from God

---

## 💸 Is It A Time To Receive Money

Elisha lists out the whole lavish future Gehazi was likely imagining.

Oliveyards and vineyards were valuable land.

Sheep and oxen meant real, growing wealth.

Naming every item makes Gehazi's greedy plan sound as ugly as it was.

Elisha exposes what Gehazi was already dreaming of doing.

💸 Elisha names Gehazi's imagined future

🌳 Oliveyards and vineyards meant real land

🐑 Sheep and oxen meant real wealth

📖 He exposed the dream, not the deed

---

## ❄️ Shall Cleave Unto Thee, And Unto Thy Seed For Ever

"Cleave" means to stick permanently, not to pass by quickly.

The very disease Naaman was just cleansed from now falls on Gehazi.

This judgment does not stop with Gehazi.

It reaches his descendants as well.

The punishment mirrors the crime with painful, exact precision.

❄️ Cleave means to stick permanently

🔄 Naaman's old disease now falls on Gehazi

👪 The judgment reaches his descendants too

📖 The punishment mirrored the crime exactly

---

## 🌨️ He Went Out From His Presence A Leper As White As Snow

"White as snow" is the same phrase used elsewhere in Scripture for leprosy.

The change in Gehazi happens immediately.

He is struck the moment he leaves the room.

His greed is now written plainly on his own skin.

The healing story ends with a warning about a dishonest heart.

🌨️ White as snow described real leprosy

⚡ The change happened immediately

👀 His sin became visible to everyone

📖 A healing story ends with a warning
`.trim();

export const SECOND_KINGS_FIVE_PERSONAL_SECTIONS = parseSecondKingsFiveRawNotes(SECOND_KINGS_FIVE_RAW_NOTES);
