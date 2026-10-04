export type DanielEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielEightRawNotes(rawText: string): DanielEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 8:${startVerse}` : `Daniel 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Daniel 8 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_EIGHT_RAW_NOTES = `# Daniel 8:1-2
# 😴 A Vision At Shushan
---
## 👑 In The Third Year Of The Reign Of King Belshazzar

This vision comes two years after the dream in chapter seven.

Belshazzar still rules Babylon at this point in the story.

His final night, the feast in chapter five, has not happened yet.

Daniel keeps receiving fresh visions even in Babylon's last years.

👑 Belshazzar still rules Babylon here

📆 Two years after chapter seven's dream

⏳ Chapter five's feast has not happened

📖 New visions keep coming until the end

## 🔁 After That Which Appeared Unto Me At The First

This phrase points back to the vision already described in chapter seven.

Daniel is the same man seeing both visions.

The order in the book is not strictly the order they happened in.

Chapter seven's vision came first, and this one follows soon after.

🔁 This recalls the chapter seven vision

📜 Daniel receives more than one vision

🔀 The book is not strict time order

📖 This vision follows soon after that one

## 🏛️ Shushan In The Palace, Which Is In The Province Of Elam

Shushan was a major city in the region called Elam.

It later became one of Persia's own royal capitals.

The book of Esther and the book of Nehemiah are both set in this same city.

Daniel sees this vision in a place Persia had not yet conquered.

That detail quietly points toward Persia's coming rise.

🏛️ Shushan was a major Elam city

👑 It later became a Persian capital

📜 Esther and Nehemiah both happen there

➡️ This hints at Persia's coming rise

## 🌊 By The River Of Ulai

The Ulai was a river that ran near the city of Shushan.

Rivers often mark the setting for major visions in Daniel and Ezekiel.

Daniel stands in a real, specific place while seeing something far beyond it.

This grounds a cosmic vision in an exact geographic spot.

🌊 Ulai was a river near Shushan

🗺️ Visions often happen near rivers

🧍 Daniel stands in a real place

📖 A real place holds a cosmic vision

# Daniel 8:3-4
# 🐏 A Ram With Two Horns
---
## 🐏 There Stood Before The River A Ram Which Had Two Horns

This ram stands for a kingdom, not just an animal.

The angel names it directly later in this very chapter.

Rams were a common symbol of strength and leadership in the ancient world.

Daniel does not yet know the full meaning as he watches.

🐏 A ram here pictures a kingdom

🔑 The angel names it later on

💪 Rams pictured strength in that culture

📖 Daniel watches without full understanding yet

## 🔱 One Was Higher Than The Other, And The Higher Came Up Last

The two horns picture two kings joined in one empire.

Later in the chapter they are named as Media and Persia.

Media rose to power first in that partnership.

Persia came later and grew to outrank Media completely.

That same pattern already appeared in chapter seven's bear, raised higher on one side.

🔱 Two horns means two joined kings

🕰️ Media rose to power first

📈 Persia later grew to outrank Media

📖 Chapter seven's bear pictured this too

## 🧭 Pushing Westward, And Northward, And Southward

The ram does not stop at one direction.

Media and Persia together conquered across a huge stretch of territory.

No mention is made of pushing eastward, since Persia already sat on that side.

This empire grew larger than almost anything the world had seen before it.

🧭 The ram pushes in three directions

🗺️ Media and Persia conquered huge territory

🚫 No push east, Persia sat there

📖 This empire grew larger than most

## 💪 According To His Will, And Became Great

Nothing in the ram's path could stop its advance.

"According to his will" means it answered to no one but itself.

Unchecked power like this rarely stays unchecked for long in Daniel's visions.

The very next verse already begins to prove that.

💪 Nothing could stop the ram's advance

🚫 It answered to no higher authority

⚠️ Unchecked power rarely stays unchecked long

➡️ The next verse already proves that

# Daniel 8:5-8
# 🐐 The Goat Overthrows The Ram
---
## 🐐 An He Goat Came From The West On The Face Of The Whole Earth, And Touched Not The Ground

Greece sits to the west of Persia on the map Daniel would have known.

"Touched not the ground" pictures incredible speed, almost flying instead of walking.

Alexander the Great conquered the entire Persian Empire in about a decade.

Few armies in history ever moved that fast across that much ground.

🐐 The goat pictures Greece, from the west

🏃 Touched not the ground means great speed

⚡ Alexander conquered Persia in about a decade

📖 Few armies ever moved this fast

## 👁️ The Goat Had A Notable Horn Between His Eyes

A notable horn here pictures one dominant ruler, not many.

The angel later calls this horn "the first king."

Many scholars identify this ruler as Alexander the Great himself.

One single leader drove this whole lightning fast conquest.

👁️ A notable horn means one ruler

👑 The angel later calls him first king

⚔️ Many link this to Alexander himself

📖 One leader drove the whole conquest

## 😤 He Was Moved With Choler Against Him

"Choler" is an old word for burning, furious anger.

This was not a calculated, cold attack.

The goat charges the ram with raw, personal fury.

That same fury explains why the fight ends so quickly.

😤 Choler means burning, furious anger

🔥 This attack is not calm or cold

💥 Raw fury drives the whole charge

➡️ That fury explains the quick ending

## ⚔️ Smote The Ram, And Brake His Two Horns

Both of the ram's horns break in this one encounter.

That means both Media and Persia's power collapse together.

History remembers this as Alexander's defeat of the Persian king Darius.

No part of that empire survives this moment untouched.

⚔️ Both horns break in one encounter

💔 Media and Persia both collapse together

📜 History remembers this as Darius's defeat

📖 No part of that empire survives

## 🧩 For It Came Up Four Notable Ones Toward The Four Winds Of Heaven

Alexander dies young, without one clear heir to take his place.

His empire splits among four of his own generals instead.

"Four winds of heaven" means scattered toward every direction on the map.

These four kingdoms are confirmed by name later in the chapter.

🧩 Alexander dies without one clear heir

👥 Four generals split his empire instead

🧭 Four winds means every direction scattered

📖 These four kingdoms return later on

# Daniel 8:9-12
# 😈 The Little Horn Rises
---
## 🌱 Out Of One Of Them Came Forth A Little Horn

This new ruler rises from one of the four divided Greek kingdoms.

Many scholars identify him as Antiochus the Fourth.

He ruled the eastern piece of Alexander's old empire.

His reign lasted about 175 to 164 BC.

This ruler becomes the main focus for the rest of the chapter.

🌱 A new ruler rises from one piece

🔑 Many identify him as Antiochus the Fourth

📆 He ruled about 175 to 164 BC

📖 He becomes this chapter's main focus

## 🗺️ Toward The South, And Toward The East, And Toward The Pleasant Land

This ruler's kingdom sat to the north of Israel, near Syria.

Pushing south and east aimed his power straight at Israel's own territory.

"The pleasant land" is another name for Israel used elsewhere in scripture.

The whole direction of this horn's growth points toward God's own people.

🗺️ His kingdom expands south and east

🏡 The pleasant land means Israel itself

🎯 His growth aims straight at Israel

📖 This horn targets God's own people

## ⭐ It Waxed Great, Even To The Host Of Heaven

"Waxed great" means it grew larger and more powerful over time.

"Host of heaven" can picture God's own people or their leaders.

Casting stars to the ground and stamping on them pictures total contempt.

Nothing sacred seems safe from this ruler's reach.

📈 Waxed great means growing more powerful

⭐ Host of heaven can mean God's people

👣 Stamping on stars pictures total contempt

📖 Nothing sacred feels safe from him

## 👑 He Magnified Himself Even To The Prince Of The Host

"Prince of the host" is a title most likely pointing to God himself.

This ruler's pride does not stop at human rivals.

It reaches high enough to challenge the highest authority there is.

That is a level of arrogance none of the earlier animals in this vision showed.

👑 Prince of the host likely means God

💔 His pride targets the highest authority

🆚 No earlier beast reached this far

➡️ Arrogance here has no real limit

## 🕯️ By Him The Daily Sacrifice Was Taken Away

The "daily sacrifice" was the twice daily burnt offering at the temple.

It stood at the very center of Israel's worship.

History records Antiochus the Fourth stopping temple sacrifices during his reign.

He also set up a pagan altar inside the temple itself.

🕯️ Daily sacrifice means the temple's offering

🛑 This ruler stops that worship completely

🏛️ He even sets up a pagan altar

📖 Worship itself becomes his target

## 🏛️ The Place Of His Sanctuary Was Cast Down

"Sanctuary" means the temple in Jerusalem, God's own dwelling place.

Cast down pictures the temple being disgraced, not simply demolished.

Israel had already rebuilt this temple once, after returning from exile in Babylon.

This attack came from inside the land, not from a distant invader.

🏛️ Sanctuary means the temple in Jerusalem

💔 Cast down means publicly disgraced

🔁 Israel had already rebuilt this temple once

📖 This attack struck from within the land

## ⚖️ An Host Was Given Him Against The Daily Sacrifice By Reason Of Transgression

"Given him" means this power was permitted, not simply seized.

"By reason of transgression" points to Israel's own sin as the deeper cause.

Old Testament prophets repeat this same pattern again and again.

Judgment often arrives through an enemy, but it starts with unfaithfulness at home.

⚖️ Given means permitted, not seized

💔 Transgression points to Israel's own sin

📜 Prophets repeat this pattern often

📖 Judgment starts with unfaithfulness at home

## 🌍 It Cast Down The Truth To The Ground

This ruler tramples truth itself, not just buildings.

The same verse adds that he "practised, and prospered."

"Practised" means he acted with ongoing, deliberate deception.

"Prospered" is the troubling part, his plan actually worked for a while.

🌍 Truth itself gets trampled here

🎭 Practised means deliberate, ongoing deception

📈 Prospered means his plan truly worked

📖 This vision is honest about evil succeeding

# Daniel 8:13-14
# 📏 The Measured Time
---
## 👂 Then I Heard One Saint Speaking, And Another Saint Said

"Saints" here means holy heavenly beings, not deceased human believers.

Daniel overhears a private conversation between two of them.

A similar heavenly scene already appeared in chapter seven's courtroom vision.

Daniel is allowed to listen in on something far beyond his own world.

👂 Daniel overhears two heavenly beings talking

😇 Saints here means holy heavenly beings

🔁 Chapter seven showed a similar scene

📖 Daniel glimpses something beyond his world

## ❓ How Long Shall Be The Vision Concerning The Daily Sacrifice, And The Transgression Of Desolation

One saint asks how long this horror is going to last.

"Transgression of desolation" names a specific, devastating act of desecration.

This same kind of phrase returns later in Daniel and in the Gospels.

Even heavenly beings seem to want a clear timeline for suffering to end.

❓ A saint asks how long this lasts

💔 Transgression of desolation names a devastating act

🔁 This same phrase returns later in scripture

📖 Even heaven wants suffering to end

## 🔢 Two Thousand And Three Hundred Days

This number of days converts to about six years and a few months.

Many scholars connect this span to events under Antiochus the Fourth.

The sanctuary being cleansed matches the Jewish feast of Hanukkah.

Hanukkah celebrates the temple's rededication after this very desecration ended.

🔢 2300 days equals about six years

📜 Many link this span to Antiochus

🕎 The cleansing matches the feast of Hanukkah

📖 A number in a vision became a holiday

# Daniel 8:15-19
# 👼 Gabriel Explains The Vision
---
## 🧍 Sought For The Meaning, Then, Behold, There Stood Before Me As The Appearance Of A Man

Daniel does not simply wonder about the vision and move on.

He actively seeks its meaning, the same instinct shown back in chapter seven.

In answer, a being appears that looks like a man.

That human like appearance usually signals an angel in this kind of vision.

🧍 Daniel actively seeks the vision's meaning

🔁 This matches his instinct from chapter seven

👤 A man like figure appears in answer

📖 Human like appearance often signals an angel

## 📛 Gabriel, Make This Man To Understand The Vision

This is the first time any angel is named in the whole Bible.

"Gabriel" means something like "mighty one of God."

This same angel reappears centuries later in the Gospel of Luke.

There he announces the births of John the Baptist and of Jesus.

📛 Gabriel is the Bible's first named angel

💪 His name points to God's own might

🔁 He reappears later in Luke's Gospel

📖 He announces both John's and Jesus's births

## 😨 I Was Afraid, And Fell Upon My Face

Fear is a common human reaction to angels throughout scripture.

These are not the gentle, harmless figures often pictured today.

Daniel's fall to the ground shows genuine terror, not simple politeness.

Fear here comes right before real understanding arrives.

😨 Fear is the normal reaction to angels

🚫 Angels are not harmless, gentle figures

🧎 Daniel's fall shows genuine terror

➡️ Fear often comes right before understanding

## ⏳ Understand, O Son Of Man: For At The Time Of The End Shall Be The Vision

"Son of man" simply means a human being in most of scripture.

Gabriel tells Daniel this vision points toward a future "time of the end."

That phrase recurs in other parts of Daniel describing distant, future events.

The nearest fulfillment still lay centuries beyond Daniel's own lifetime.

⏳ Time of the end points to the future

👤 Son of man simply means a human

🔁 This phrase recurs later in Daniel

📖 Fulfillment lay centuries beyond Daniel's life

## 😴 I Was In A Deep Sleep On My Face Toward The Ground

The weight of this vision overwhelms Daniel physically.

He collapses face down into something like unconsciousness.

Gabriel's touch alone is what brings him back to his feet.

A similar scene happens again to Daniel in a later chapter.

😴 The vision overwhelms Daniel physically

🧎 He collapses face down, unconscious

🤚 Gabriel's touch brings him back up

➡️ A similar scene happens again later

## 🗓️ At The Time Appointed The End Shall Be

"Indignation" is an old word for God's own righteous anger at sin.

This judgment is not random or chaotic in any way.

It runs on a fixed, appointed schedule known only to God.

That same theme of a set time already ran through Daniel's earlier visions.

🗓️ Indignation means God's righteous anger

📅 Judgment runs on a fixed schedule

🚫 Nothing about this is random chaos

📖 Set times run through all of Daniel

# Daniel 8:20-22
# 🔑 The Vision Decoded
---
## 🐏 The Ram Which Thou Sawest Having Two Horns Are The Kings Of Media And Persia

Gabriel now confirms directly what the ram symbol meant all along.

Most of Daniel's visions never get this plain a decoder key.

Media and Persia ruled jointly as one combined empire.

This same empire already appeared earlier as the bear in chapter seven.

🐏 Gabriel confirms the ram's exact meaning

🔑 Few visions get this plain a key

🤝 Media and Persia ruled as one empire

📖 Chapter seven's bear pictured this same empire

## 🐐 The Rough Goat Is The King Of Grecia

The goat is now named directly as Greece.

"The great horn" is confirmed as the first and greatest king of that nation.

Most readers of this vision have understood that to mean Alexander the Great.

The vision's images and the historical record line up detail for detail.

🐐 The goat is confirmed as Greece

👑 The great horn is Greece's first king

⚔️ Most link this directly to Alexander

📖 The image matches the historical record

## 🧩 Four Kingdoms Shall Stand Up Out Of The Nation, But Not In His Power

Alexander died young, with no single heir strong enough to hold his empire together.

Four of his own generals split that empire among themselves instead.

"Not in his power" means none of the four matched Alexander's full strength alone.

A kingdom can survive a leader's death and still never be the same again.

🧩 Alexander died without one true heir

👥 Four generals divided his empire instead

📉 None matched his full strength alone

📖 A kingdom can outlive its leader, changed

# Daniel 8:23-25
# 👑 A Fierce King To Come
---
## 📆 In The Latter Time Of Their Kingdom, When The Transgressors Are Come To The Full

This ruler does not appear right away after Alexander's empire divides.

He rises later, once that divided kingdom has aged and weakened.

"Transgressors come to the full" means sin has reached a tipping point.

Judgment in scripture often arrives only after that kind of buildup.

📆 This ruler rises later, not right away

⏳ He appears once the kingdom has weakened

💔 Sin reaches a tipping point here

📖 Judgment often follows a long buildup

## 😠 A King Of Fierce Countenance, And Understanding Dark Sentences

"Fierce countenance" describes a bold, ruthless look and manner.

"Understanding dark sentences" describes skill in cunning, hidden scheming.

This is not brute strength alone, it is calculated cleverness too.

Both traits combine to make him especially dangerous.

😠 Fierce countenance means bold and ruthless

🧠 Dark sentences means cunning, hidden scheming

⚔️ Strength and cleverness combine in him

📖 That combination makes him especially dangerous

## ⬆️ His Power Shall Be Mighty, But Not By His Own Power

Even this ruler's strength does not originate with himself.

A higher authority permits and limits every bit of it.

Chapter seven already described this exact pattern for the fourth beast.

No power in any of Daniel's visions ever stands fully independent.

⬆️ His power is not his own source

🙏 A higher authority permits and limits it

🔁 Chapter seven already showed this pattern

📖 No power here is fully independent

## 💔 He Shall Destroy The Mighty And The Holy People

"The holy people" very likely means the Jewish people themselves.

Earlier verses already described an attack on the temple and its worship.

Now the attack widens to target the people, not just their sanctuary.

The threat in this vision keeps growing closer and more personal.

💔 Holy people likely means the Jewish people

🏛️ Earlier verses targeted the temple itself

📈 Now the attack widens to people too

➡️ The threat keeps growing more personal

## 🎭 Through His Policy Also He Shall Cause Craft To Prosper In His Hand

"Policy" and "craft" both describe cunning deceit rather than open strength.

This ruler wins through manipulation as often as through weapons.

Earlier beasts in these visions mostly conquered by brute force alone.

This one adds a colder, more calculated kind of danger.

🎭 Policy and craft both mean cunning deceit

🤝 He wins through manipulation, not just force

🆚 Earlier beasts relied on brute force

📖 This ruler adds a colder danger

## ☮️ By Peace Shall Destroy Many

This line carries a real irony, peace itself becomes a weapon.

False treaties or false calm can lower a people's guard completely.

Destruction does not always arrive wearing an obvious enemy's face.

Sometimes the greatest danger looks like the absence of danger.

☮️ Peace itself becomes a weapon here

🛡️ False calm can lower a guard completely

🎭 Destruction does not always look dangerous

📖 The greatest danger can look like safety

## ⚖️ Stand Up Against The Prince Of Princes

"Prince of princes" is a title most likely pointing to God himself.

This ruler's ambition finally reaches the highest point possible.

No earthly throne stands above the one he is now challenging.

That challenge is the final, clearest sign of his coming downfall.

⚖️ Prince of princes likely names God himself

🆙 His ambition reaches the highest point

🚫 No throne stands above the one he fights

➡️ This challenge signals his coming downfall

## 🖐️ He Shall Be Broken Without Hand

"Without hand" means no human army or weapon brings him down.

God alone acts directly to end this ruler's reign.

Earlier kingdoms in this vision fell through human conquest and war.

This one falls a different way entirely, straight from heaven itself.

🖐️ Without hand means no human weapon

⚡ God alone ends this ruler's reign

🆚 Earlier kingdoms fell through human war

📖 This one falls straight from heaven

# Daniel 8:26-27
# 😵 Daniel Faints At The Vision
---
## ✅ The Vision Of The Evening And The Morning Which Was Told Is True

Gabriel closes by sealing the whole vision as completely reliable.

"Evening and morning" recalls the vision's imagery from earlier in the chapter.

This is not a confusing dream to shrug off and forget.

Everything described here is meant to be taken as certain.

✅ Gabriel seals the vision as reliable

🌅 Evening and morning recalls earlier imagery

🚫 This is not a dream to dismiss

📖 Everything here is meant as certain

## 🤐 Shut Thou Up The Vision

Daniel is told to keep this vision sealed rather than announce it right away.

"For many days" means its fulfillment lay far off in the future.

The two thousand three hundred days already hinted at just how far off that was.

Some revelation is given to be kept, not spread immediately.

🤐 Daniel keeps this vision sealed for now

⏳ Its fulfillment lay far in the future

🔢 The earlier number already hinted at that

📖 Some revelation waits before it spreads

## 🤒 I Daniel Fainted, And Was Sick Certain Days

The vision takes a real physical toll on Daniel's body.

This is not simply a dramatic way of describing his feelings.

He needed actual days to recover before resuming ordinary life.

Carrying something this heavy clearly came at a real cost.

🤒 The vision costs Daniel real health

💭 This is not just emotional language

📆 He needed real days to recover

📖 Heavy revelation can carry a real cost

## 💼 I Rose Up, And Did The King's Business

Daniel returns to his normal duties despite everything he just saw.

Faithfulness in ordinary work continues even after an overwhelming vision.

He admits plainly that even he did not fully understand it.

Scripture does not pretend every mystery gets solved the moment it is given.

💼 Daniel returns to his normal duties

🙏 Faithfulness continues after the overwhelming vision

❓ Even Daniel does not fully understand it

📖 Not every mystery gets solved right away
`.trim();

export const DANIEL_EIGHT_PERSONAL_SECTIONS = parseDanielEightRawNotes(DANIEL_EIGHT_RAW_NOTES);
