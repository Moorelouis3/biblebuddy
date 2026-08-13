export type SecondKingsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsSixRawNotes(rawText: string): SecondKingsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsSix\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsSix\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsSix\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 6:${startVerse}` : `2 Kings 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 6 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_SIX_RAW_NOTES = `# SecondKingsSix 6:1-7
# 🪓 The Borrowed Axe Head
---
## 🏫 Sons Of The Prophets

The sons of the prophets were not Elisha's biological children.

They were a group of trainee prophets who lived and studied together.

Elisha led several of these prophetic communities across Israel.

Think of it as a school for men learning to hear from God.

This school had grown large.

Their current house could no longer hold everyone.

🏫 Sons of the prophets means trainees
📚 They studied prophecy together
🏠 Their group had grown large
📖 The old house could not hold them all

---

## 📏 Too Strait For Us

Strait does not mean straight.

It means narrow, cramped, or too small.

The prophets are telling Elisha their meeting place has become too small for their numbers.

This was a practical problem, not a spiritual complaint.

Elisha's simple answer was to let them go build a bigger one.

📏 Strait means narrow or cramped
🏠 Not the word straight
👥 Their group had outgrown the space
📖 Elisha approved a practical solution

---

## 🌊 Unto Jordan

Jordan River valley had trees the men could cut for lumber.

Most of central Israel was too dry and rocky for large timber.

Jordan sat lower in elevation.

Its lower ground held a wetter climate.

That climate could grow real trees.

Elisha did not object to the move.

He simply said, Go.

🌊 Jordan had trees for lumber
🏜️ Central Israel lacked good timber
🌳 The valley supported real forest
📖 Elisha gave a simple approval

---

## 🪵 Take Thence Every Man A Beam

A beam here means a heavy wooden log, not a modern board.

Each man was responsible for cutting and hauling his own timber.

There was no lumber mill involved.

Every log was chosen, felled, and carried by hand.

This was hard physical labor for men who spent their days studying and praying.

🪵 Beam means a heavy log
💪 Each man cut his own
🪓 No mill did the work
📖 Study and hard labor mixed here

---

## 🪓 As One Was Felling A Beam

Felling means chopping down a tree until it falls.

This was normal work, nothing unusual was happening yet.

The men were simply doing what Elisha had approved.

Trouble comes during normal life too.

🪓 Felling means chopping down a tree
🌲 Ordinary daily work
✅ Elisha had approved the trip
📖 Trouble comes during normal life too

---

## 😰 For It Was Borrowed

Iron tools were expensive in ancient Israel.

A poor student prophet likely could not afford his own axe.

Borrowing tools was common in this culture.

But borrowing came with real responsibility.

Losing a borrowed tool created a real debt.

The borrower owed its full value to its owner.

That explains why he cried out instead of shrugging it off.

🪙 Iron tools were costly
🤝 Borrowing carried real responsibility
💸 A lost tool became a debt
📖 His fear was about real money owed

---

## 😭 Alas, Master

Alas was a real cry of distress, not a mild complaint.

This student was terrified, not just embarrassed.

He calls Elisha master, showing deep respect for his teacher.

His fear was proof of how seriously debt was taken in this culture.

😭 Alas signaled real distress
😨 He was genuinely afraid
🙇 Master shows deep respect
📖 Debt was taken seriously here

---

## 🌊 The Iron Did Swim

Iron does not float.

It sinks straight to the bottom.

Elisha cut a stick and threw it where the axe head had fallen.

The iron rose to the surface and floated.

This miracle reversed a basic law of nature.

God used this power for one poor man's ordinary problem.

He did not need a king or a battle to show His care.

🌊 Iron does not normally float
🪓 Elisha threw a stick in
✨ The axe head rose and floated
📖 God cares about small ordinary needs

---

# SecondKingsSix 6:8-12
# 🛏️ Elisha Hears The King's Bedchamber
---
## ⚔️ Warred Against Israel

This king of Syria is likely Benhadad.

He ruled when Naaman was healed in the last chapter.

Syria and Israel were neighboring kingdoms.

They fought each other on and off for years.

Verse eight shows Benhadad plotting a surprise ambush against Israel.

He chooses a hidden spot to camp before Israel even knows he is coming.

⚔️ Syria and Israel fought often
👑 This king is likely Benhadad
🗺️ He planned a hidden camp
📖 He wanted to surprise Israel

---

## 📍 In Such And Such A Place

This phrase is Benhadad's secret plan spoken to his own officers.

He never says the location out loud in the biblical text.

The Bible simply shows that he had a specific hidden spot in mind.

The phrase captures the secrecy of his plan without revealing military details.

🤫 A secret plan among officers
📍 The exact spot is not named
🕵️ The text protects the details
📖 Secrecy was central to his plan

---

## 👁️ Sent Unto The King Of Israel

Elisha did not need spies to know Benhadad's plans.

God simply showed him where the danger was.

Elisha then warned the king of Israel directly.

That warning gave Israel time to avoid the trap.

This happened more than once, not just a single lucky guess.

👁️ Elisha saw the hidden plan
📡 God revealed it to him
⚠️ He warned the king in time
📖 This pattern repeated many times

---

## 🛡️ Not Once Nor Twice

The king of Israel escaped Benhadad's ambush more than one time.

Not once nor twice means this saving pattern happened repeatedly.

Each escape depended entirely on Elisha's warning, not the king's own skill.

The king benefited from a prophet's gift without fully understanding its source yet.

🛡️ The king escaped repeatedly
🔢 Not once nor twice means many times
🙏 Each escape came through Elisha
📖 The king did not yet know why

---

## 😠 Sore Troubled For This Thing

Sore here does not mean physical pain.

It means deeply upset or greatly disturbed.

Benhadad could not understand how his secret plans kept leaking.

His frustration grew strong enough that he suspected a traitor in his own camp.

😠 Sore means deeply upset
🤔 His secret kept failing
🕵️ He suspected a spy nearby
📖 Frustration led him to investigate

---

## 🕵️ Which Of Us Is For The King Of Israel

Benhadad is not asking a philosophical question here.

He is accusing one of his own officers of being a spy for Israel.

In his mind, only a traitor inside his own camp could explain the leaks.

He has not yet considered that a prophet might simply hear from God.

🕵️ He suspects a traitor
🗡️ The accusation targets his own men
🚫 He rules out a spiritual cause
📖 He misjudges the real source

---

## 🛏️ The Words That Thou Speakest In Thy Bedchamber

A bedchamber was the most private room in a king's house.

The servant reveals that Elisha knows words spoken there, far from any spy's ears.

This detail proves the leak was never about human intelligence.

Elisha's knowledge came from God, reaching into a place no outsider could enter.

🛏️ Bedchamber means a private room
👂 No spy could hear there
🙏 Elisha's knowledge came from God
📖 Nothing is hidden from God

---

# SecondKingsSix 6:13-17
# 🔥 Horses And Chariots Of Fire
---
## 🕵️ Go And Spy Where He Is

Benhadad finally learns the truth.

The leak was never a human spy.

It was Elisha the prophet.

His response is to send men after one unarmed man.

Sending an army after a single prophet shows how seriously he took the threat.

🎯 Elisha was finally identified
🪖 Benhadad sends men to track him
😨 One prophet is treated like a major threat
📖 Fear drove an extreme response

---

## 🏙️ Behold, He Is In Dothan

Dothan was a small town north of Samaria, in a fertile valley.

It sat along a major trade route, so its location was well known.

This was not a hidden fortress, just an ordinary town where Elisha happened to be staying.

Genesis also mentions Dothan as the place where Joseph's brothers sold him into slavery.

🏙️ Dothan was a small town
🛤️ It sat on a trade route
🏘️ Elisha was simply staying there
📖 Joseph was once sold near this same town

---

## 🌙 Compassed The City About

Compassed means surrounded completely on every side.

Benhadad sent horses, chariots, and a large army just to capture one man.

Arriving by night was a deliberate tactic meant to trap the city before dawn.

By morning, Dothan had no way out.

🌙 They attacked under cover of night
🐎 A huge force chased one man
🔄 Compassed means fully surrounded
📖 The trap was set before dawn

---

## 😨 Alas, My Master! How Shall We Do

Elisha's servant wakes up to find the city surrounded.

An enemy army fills the view in every direction.

His fear is completely understandable.

He does not yet know what Elisha already knows.

His question captures the panic of someone who can only see visible danger.

😨 The servant panics at the sight
👀 He only sees the enemy army
🙈 He cannot see what Elisha sees
📖 Panic often comes from limited sight

---

## 💪 More Than They That Be With Them

Elisha is not denying the danger the servant sees.

He is revealing that there is a second, invisible reality present too.

An unseen army of God outnumbers the visible army of Syria.

Faith here does not mean pretending danger is not real.

It means trusting that God's side is never actually outnumbered.

👁️ Elisha does not deny the danger
✨ He reveals a hidden reality
⚖️ God's side outnumbers the enemy
📖 Faith trusts what cannot yet be seen

---

## 🙏 Open His Eyes, That He May See

Elisha does not argue with his servant or explain everything in words.

Instead, he prays a short, specific prayer for God to open the servant's eyes.

This is not physical blindness, his servant can already see normally.

Elisha is asking for spiritual sight, the ability to see what is truly there.

🙏 Elisha prays instead of arguing
👀 He asks for spiritual sight
🔓 Open means revealed, not physical
📖 God answers a simple prayer

---

## 🔥 Horses And Chariots Of Fire

The servant's eyes open to see what was always actually there.

An army of fire surrounds Elisha, vastly outnumbering the Syrian force below.

Fire often represents God's presence and power throughout the Bible.

This vision reveals that Elisha was never truly alone or in danger.

The physical eye had been the only thing limiting what the servant could see.

🔥 Fire often represents God's presence
🐎 A heavenly army surrounds Elisha
🛡️ Elisha was never truly alone
📖 The unseen world was always there

---

# SecondKingsSix 6:18-20
# 🌫️ Struck With Blindness
---
## 🌫️ Smite This People With Blindness

This blindness was not permanent physical blindness.

Many scholars believe it was a temporary confusion.

It kept the soldiers from recognizing where they were.

Elisha does not ask God to harm them.

He asks for just enough confusion to prevent violence.

🌫️ The blindness was likely temporary
🤔 It confused without causing harm
🕊️ Elisha avoided unnecessary violence
📖 Mercy shaped his request

---

## 🧭 This Is Not The Way, Neither Is This The City

Elisha tells the blinded soldiers something technically true.

They are not standing exactly where they think they are.

He offers to personally lead them to the man they seek.

The soldiers cannot see, so they have no choice but to trust his voice.

🧭 A technically true statement
🙈 They cannot see to check
🤝 Elisha offers to lead them
📖 They must trust his voice alone

---

## 🏙️ He Led Them To Samaria

Samaria was the capital city of the northern kingdom of Israel.

Elisha leads an entire enemy army straight into the heart of Israel's power.

They walk in blind, completely unaware of where they are actually headed.

This is not a rescue, it sets up a striking display of mercy.

🏙️ Samaria was Israel's capital
🚶 An army walks in blind
🎯 They enter the enemy's stronghold
📖 A striking mercy is coming

---

## 👁️ Open The Eyes Of These Men

Elisha prays again, this time to remove the confusion he had asked for.

The same God who closed their sight now opens it again.

This power was fully under Elisha's control through prayer.

👁️ Elisha reverses his own prayer
🔓 God restores their sight
🎛️ The power was fully controlled
📖 Prayer directed the entire event

---

## 😳 In The Midst Of Samaria

The soldiers open their eyes to a terrifying discovery.

They are standing inside the capital city of the enemy they came to capture.

Every advantage they thought they had is completely gone.

Their fate now rests entirely in the hands of the king they hunted.

😳 A shocking realization hits them
🏙️ They stand inside enemy territory
⚖️ Their advantage is completely gone
📖 Their fate now rests with Israel's king

---

# SecondKingsSix 6:21-23
# 🍞 Bread And Water Instead Of The Sword
---
## ⚔️ My Father, Shall I Smite Them

The king of Israel calls Elisha my father, a title of deep honor and respect.

It does not mean Elisha was his biological parent.

Students and followers often called a respected teacher or prophet father in this culture.

The king now has helpless captives and asks whether to kill them.

👑 My father shows honor, not family
🙇 A title used for respected teachers
⚔️ The captives are now helpless
📖 The king waits for Elisha's answer

---

## 🚫 Thou Shalt Not Smite Them

Elisha refuses the obvious, expected response of war.

Prisoners captured in battle were normally killed or enslaved.

Elisha overturns that expectation completely.

He treats blinded, helpless enemies with mercy instead of vengeance.

🚫 Elisha rejects the expected violence
⚔️ Captives were usually killed or enslaved
🕊️ He chooses mercy instead
📖 Mercy overturns the normal rules of war

---

## 🍞 Set Bread And Water Before Them

Offering food and water was a powerful act of hospitality in this culture.

Sharing a meal with an enemy was almost unthinkable after an attempted capture.

This gesture treats former enemies like honored guests instead of prisoners.

It turns a moment of expected violence into a moment of surprising kindness.

🍞 Food and water meant hospitality
🤝 Enemies are treated like guests
😲 This gesture was almost unthinkable
📖 Kindness replaced expected violence

---

## 🎉 He Prepared Great Provision For Them

The king does not offer a small or grudging meal.

Great provision means a large, generous feast.

This was not the bare minimum, it was genuine abundance.

The scale of the meal matched the scale of the mercy being shown.

🎉 The feast was large and generous
🙅 Nothing about it was stingy
📈 The scale matched the mercy
📖 Generosity mirrored God's own kindness

---

## 🕊️ The Bands Of Syria Came No More

Bands here means raiding parties sent to harass Israel's borders.

One act of mercy accomplished what more fighting could not.

The soldiers likely returned home and told others what happened to them.

A kindness shown to helpless enemies bought Israel real peace, at least for a season.

🕊️ Bands means small raiding parties
🛑 The raids stopped completely
📣 Their story likely spread
📖 Mercy accomplished what war could not

---

# SecondKingsSix 6:24-31
# 😱 Famine And A Mother's Horror
---
## 🏰 Gathered All His Host, And Besieged Samaria

Benhadad now returns with a full army instead of small raiding bands.

The season of peace from the last chapter has clearly ended.

A siege means surrounding a city completely to cut off supplies and force surrender.

Samaria could no longer trade or bring in food from outside its walls.

🏰 Benhadad returns with a full army
⏳ The earlier peace has ended
🚧 A siege means total encirclement
📖 Samaria was cut off from supplies

---

## 😱 A Great Famine In Samaria

A famine means a severe, prolonged shortage of food.

With the city sealed off, no new food could enter for a long time.

Stored supplies eventually ran out, leaving the population desperate.

What follows in these verses shows just how extreme that desperation became.

😱 Famine means severe food shortage
🚧 The siege blocked all supplies
📉 Stored food eventually ran out
📖 Desperation grew extreme inside the walls

---

## 🫏 An Ass's Head For Fourscore Pieces Of Silver

Fourscore is an old way of saying eighty.

A donkey's head was normally considered worthless.

People threw it away instead of eating it.

Eating any part of a donkey broke Israelite dietary law.

Paying eighty pieces of silver for it shows how extreme the hunger had become.

🔢 Fourscore means eighty
🫏 Donkey meat broke dietary law
💰 A worthless item became costly
📖 Extreme hunger broke normal rules

---

## 💩 A Cab Of Dove's Dung

A cab was a small, dry measurement, close to the size of a modern quart.

A fourth of a cab was a tiny amount.

Dove's dung was worthless and inedible even by famine standards.

Some scholars believe the phrase may point to a type of cheap seed pod.

Either way, the text shows people paying real silver for almost nothing.

📏 A cab was a small measurement
🪶 Dove's dung was worthless
🌱 It may mean a cheap seed pod
📖 People paid silver for almost nothing

---

## 😭 Help, My Lord, O King

A desperate woman cries out to the king as he walks along the city wall.

Kings in this era were expected to personally hear and resolve disputes.

Walking the wall let the king see the suffering of his people directly.

Her cry shows just how far ordinary life had collapsed inside the city.

😭 A desperate cry for help
👑 Kings settled disputes personally
🧱 He was walking the city wall
📖 Ordinary life had fully collapsed

---

## 🌾 Out Of The Barnfloor, Or Out Of The Winepress

A barnfloor was where grain was threshed and stored.

A winepress was where grapes were crushed to make wine.

The king is really saying he has no food or drink left to give her.

His answer is not cruelty, it is honest helplessness in the face of total famine.

🌾 Barnfloor means where grain was kept
🍇 Winepress means where wine was made
🙅 The king has nothing left
📖 His helplessness was honest, not cruel

---

## 😨 What Aileth Thee

Aileth is an old word that simply means what is wrong.

The king asks a plain, caring question despite having no power to fix anything.

He still stops to listen to her before hearing the horror she describes.

😨 Aileth means what is wrong
👂 The king still listens carefully
🙅 He cannot yet fix anything
📖 He listens before he can help

---

## 🍲 Give Thy Son, That We May Eat Him

Two starving mothers made a horrifying agreement to eat their own children.

This scene fulfills warnings given centuries earlier in the law of Moses about famine this severe.

The first woman kept her side of the agreement.

The second woman then hid her son and broke the deal.

This is one of the darkest scenes in the entire Old Testament.

😱 A horrifying agreement between mothers
📜 Moses warned of famine this severe
💔 One woman kept the agreement
📖 One of scripture's darkest scenes

---

## 👗 He Rent His Clothes

Rent means torn.

Tearing one's own clothing was a public sign of grief, horror, or despair in this culture.

Kings and leaders used this gesture during moments of national crisis.

The king reacts to a mother's horror with genuine, visible anguish.

👗 Rent means torn
😢 Torn clothes signaled real grief
👑 Leaders used this gesture publicly
📖 The king's anguish was genuine

---

## 🖤 Sackcloth Within Upon His Flesh

Sackcloth was a rough, uncomfortable material worn during mourning or repentance.

The people only see the king tear his outer robe.

Underneath, hidden from public view, he was already wearing sackcloth against his own skin.

This reveals the king had been secretly grieving and fasting before this moment.

His private suffering was real, even before the public crisis broke out.

🖤 Sackcloth was rough mourning cloth
👀 The public only saw his robe
🤫 He wore it secretly underneath
📖 His private grief came before the public one

---

## ⚡ God Do So And More Also To Me

This phrase was a common ancient oath formula.

It called down punishment on the speaker if a promise was broken.

The king vows to kill Elisha that very day.

He wrongly blames the prophet for the famine crushing his city.

His fury is misdirected at the very man who has been trying to help Israel.

⚡ An ancient oath formula
🗡️ The king vows to kill Elisha
😠 He blames the wrong person
📖 His fury was misdirected

---

# SecondKingsSix 6:32-33
# 🚪 Shut The Door
---
## 👴 The Elders Sat With Him

Elders were respected older leaders who often gathered for counsel and support.

Elisha is not alone or hiding when the danger arrives.

Their presence shows Elisha still had the trust and respect of Israel's leadership.

This detail matters just before a hostile messenger arrives at his door.

👴 Elders were respected community leaders
🤝 Elisha was not isolated
🙏 He still held their trust
📖 Support arrived before the danger

---

## 🗡️ This Son Of A Murderer

This insult likely refers to the king's father, who had a violent history toward prophets.

The king is sending someone to kill Elisha for a famine he did not cause.

Elisha names the real threat before the messenger even arrives.

This was not exaggeration, an execution order was truly coming.

🗡️ The insult points to the king's father
⚰️ An execution order was coming
🎯 Elisha names the real threat first
📖 He was not exaggerating the danger

---

## 🚪 Shut The Door, And Hold Him Fast At The Door

Elisha gives his elders a calm, specific plan for the messenger's arrival.

Blocking the door briefly was not disobedience to the king himself.

It bought a short moment before violence could happen.

Elisha remained completely composed even while an execution order was on its way.

🚪 A calm, specific plan
⏳ It bought a brief delay
😌 Elisha stayed completely composed
📖 Calm can exist inside real danger

---

## 👣 The Sound Of His Master's Feet Behind Him

Elisha already knows the king himself is following close behind his messenger.

He hears what no one else in the room can hear yet.

This detail shows Elisha's insight was still fully active even during a crisis.

Nothing about this moment has caught the prophet off guard.

👣 Elisha hears what others cannot
👑 The king follows close behind
🧠 His insight stayed active in crisis
📖 Nothing catches Elisha off guard

---

## 😤 What Should I Wait For The LORD Any Longer

The king arrives and voices complete despair, blaming God for the famine's horror.

He calls it evil, treating the crisis as something God allowed on purpose.

His question suggests he has given up hoping God will act at all.

This moment of total despair sets up the sudden reversal that opens the next chapter.

😤 The king voices total despair
👆 He blames God for the crisis
🙅 He has given up hoping
📖 The next chapter answers his question
`.trim();

export const SECOND_KINGS_SIX_PERSONAL_SECTIONS = parseSecondKingsSixRawNotes(SECOND_KINGS_SIX_RAW_NOTES);
