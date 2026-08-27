export type SecondChroniclesTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyFiveRawNotes(rawText: string): SecondChroniclesTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 25:${startVerse}` : `2 Chronicles 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Chronicles 25 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_FIVE_RAW_NOTES = `# SecondChronicles 25:1-4
# 💔 A Divided Heart
---
## 💔 Right In The Sight Of The Lord, But Not With A Perfect Heart

This is unusual praise.

Right in the sight of the Lord usually introduces a fully faithful king.

Here the verse immediately takes some of that back.

"A perfect heart" means complete, undivided loyalty to God.

Amaziah did right, but his loyalty was never whole.

This single line predicts everything the rest of the chapter will show.

💔 Perfect heart means complete loyalty

⚠️ Amaziah's obedience was only partial

🔮 This line predicts his downfall

📖 Doing right differs from full devotion

## ⚔️ He Slew His Servants That Had Killed The King His Father

This looks like plain justice, but it needs some backstory.

Chapter twenty four already showed Amaziah's father Joash murdered by his own officials.

Once Amaziah takes the throne, he executes the men responsible.

This was expected, almost required, of a new king protecting his father's memory.

The real test comes in what he does next.

⚔️ Joash was murdered by his officials

👑 Amaziah executes those responsible

🛡️ This was expected of a new king

➡️ The real test is still ahead

## 📜 Did As It Is Written In The Law In The Book Of Moses

Amaziah could have executed the murderers' children too.

That was common practice among surrounding nations to erase a rival family completely.

Instead he follows a specific law from Moses.

A father is not put to death for the children.

A child is not put to death for the father.

Each person answers only for their own sin.

Amaziah's restraint here comes from Scripture, not personal mercy.

📜 The law limits guilt to the guilty

🚫 Common practice killed whole families

⚖️ Each person answers for their own sin

📖 Amaziah obeys Scripture, not just instinct

# SecondChronicles 25:5-6
# 🛡️ Assembling An Army, Then Renting One
---
## 🔢 Numbered Them From Twenty Years Old And Above

Twenty years old marked the line into adulthood for military service in Israel.

Anyone younger was not yet counted as fit for war.

Three hundred thousand men from Judah and Benjamin met that standard here.

That is a real, countable army, not an exaggeration for effect.

Amaziah starts this chapter from a position of real strength.

🔢 Twenty marked military adulthood

👥 Three hundred thousand men qualified

🏹 They could handle spear and shield

📖 Amaziah begins from real strength

## 💰 Hired Also An Hundred Thousand Mighty Men Of Valour Out Of Israel For An Hundred Talents Of Silver

A "talent" was a unit of weight, not a coin, close to seventy five pounds of silver.

A hundred talents was an enormous sum, enough to hire a hundred thousand soldiers.

These soldiers came from Israel, the rival northern kingdom that had split from Judah generations earlier.

Hiring from a kingdom that had already turned from God's covenant was a warning sign before anyone said a word.

💰 A talent equaled about seventy five pounds

🪙 The price bought a huge mercenary force

🏴 The mercenaries came from rival Israel

📖 Their source was a warning sign

# SecondChronicles 25:7-10
# 🗣️ A Costly Correction
---
## 🚫 The Lord Is Not With Israel, To Wit, With All The Children Of Ephraim

"Ephraim" here is shorthand for the entire northern kingdom of Israel.

Ephraim was Israel's largest tribe, so its name often stood in for the whole nation.

Ever since the kingdom split, Israel's kings led the people into worshiping other gods.

Borrowing their soldiers meant borrowing an army God had already turned away from.

🚫 Ephraim stands for all of Israel

👑 Israel's kings led it into idolatry

🪖 Amaziah was borrowing a rejected army

📖 Numbers cannot replace God's presence

## ⚠️ God Shall Make Thee Fall Before The Enemy

A bigger army does not guarantee a win.

The man of God warns that God himself can decide the outcome of this exact battle.

Adding a hundred thousand soldiers cannot outweigh God's opposition.

Strength on paper means nothing if God is not behind it.

⚠️ Numbers cannot force a win

🙌 God controls this battle's outcome

🧮 A hundred thousand soldiers is not enough

📖 God's favor matters more than headcount

## 💸 But What Shall We Do For The Hundred Talents

Amaziah does not object to losing men.

He objects to losing the silver he already paid them.

This is the same thinking behind staying in a bad deal to avoid wasting money already spent.

Obedience was costing him something real, and he hesitated.

💸 He worries about the silver, not the men

🧠 This is classic sunk cost thinking

😬 Obedience here has a real price

➡️ Amaziah hesitates before doing right

## 🙌 The Lord Is Able To Give Thee Much More Than This

The man of God does not minimize the loss.

He answers it directly, God can replace a hundred talents easily.

Trusting God with a financial loss is still trusting God.

Amaziah sends the mercenaries home once he hears this.

🙌 God can replace any loss

💰 The financial cost was real

🤝 Trust covers money, not just danger

📖 Amaziah obeys once he hears this

## 😡 Their Anger Was Greatly Kindled Against Judah

The dismissed soldiers do not go home quietly.

Losing a promised payday over someone else's religious decision made them furious.

That anger does not just fade away on the road home.

It resurfaces later in this same chapter with real damage.

😡 Dismissed soldiers leave furious

💵 They lost an expected payday

🔥 Their anger keeps building

➡️ This anger returns later in the chapter

# SecondChronicles 25:11-13
# ⚔️ Victory In The Valley, Then A Raid
---
## 🧂 Went To The Valley Of Salt

The Valley of Salt sat near the Dead Sea, close to Edom's territory.

This was not the first battle fought there.

Generations earlier, David's army won a major victory against Edom in this same valley.

Amaziah is walking into ground already marked by an earlier victory over the same enemy.

🧂 Salt Valley sat near the Dead Sea

🗺️ It bordered Edom's territory

🔁 David won there generations earlier

📖 Amaziah repeats an old battlefield

## 🪨 Cast Them Down From The Top Of The Rock

"The rock" likely refers to Sela, a city whose name means rock in Hebrew.

Sela sat on a high cliff, later known as part of the region around Petra.

Throwing captives from that height was a brutal, deliberate execution.

Ten thousand men died this way after the battle was already won.

🪨 The rock was likely Sela

🏔️ Sela sat high on a cliff

💀 Ten thousand died by this execution

📖 Victory turned into brutal cruelty

## 🔥 Fell Upon The Cities Of Judah

The mercenaries Amaziah sent home never made it home quietly.

They raided Judah's own cities along the way, from Samaria to Bethhoron.

Three thousand people died and much was stolen in these raids.

Obeying the prophet's warning still carried a real, painful cost.

🔥 Dismissed soldiers raided Judah instead

🗺️ Samaria to Bethhoron were hit

💀 Three thousand people died in the raids

📖 Obedience still came at a price

# SecondChronicles 25:14-16
# 🗿 Worshiping The Gods He Just Defeated
---
## 🗿 He Brought The Gods Of The Children Of Seir, And Set Them Up To Be His Gods

Seir was the region and people also called Edom, the enemy Amaziah just defeated.

He brings home the very idols that failed to protect their own worshipers.

Winning the battle did not stop him from bowing to the loser's gods.

This is one of the strangest decisions in the whole chapter.

🗿 Seir refers to Edom's people

🏆 He defeated these gods' own worshipers

🙇 He still bows down to them

📖 A truly strange decision

## ❓ Why Hast Thou Sought After The Gods Of The People, Which Could Not Deliver Their Own People

The prophet's question exposes the logic problem instantly.

These gods could not even save the nation that worshiped them.

Amaziah just proved that himself on the battlefield.

An idol that cannot protect itself cannot protect anyone else either.

❓ The prophet exposes flawed logic

🛡️ These gods failed their own people

⚔️ Amaziah proved it in battle

📖 A powerless god helps no one

## 🙅 Art Thou Made Of The King's Counsel? Forbear

"Forbear" is an old word meaning stop or hold back.

Amaziah is not asking a question, he is silencing a warning.

A king who once obeyed a prophet in verse nine now threatens one instead.

That shift shows exactly how far his heart has already drifted.

🙅 Forbear means stop or hold back

😠 Amaziah threatens the prophet

🔁 Earlier he obeyed, now he silences

📖 His drift is now visible

## ⚖️ I Know That God Hath Determined To Destroy Thee

The prophet does not back down from the threat.

He delivers the verdict anyway, judgment is already decided.

This is not a maybe or a warning to consider.

The rest of the chapter plays out exactly this sentence.

⚖️ Judgment is already decided

🗣️ The prophet does not back down

🔮 This is a verdict, not a warning

📖 The rest of the chapter fulfills it

# SecondChronicles 25:17-19
# 🌵 The Thistle And The Cedar
---
## ⚔️ Come, Let Us See One Another In The Face

This sounds like an invitation to meet.

In context, it is a challenge to battle, not a friendly visit.

Amaziah is riding high off his win over Edom and wants a bigger fight.

Pride from one victory is pushing him toward a war he cannot win.

⚔️ This phrase means a challenge to fight

😤 Amaziah wants a bigger war

🏆 Pride follows his Edom victory

📖 This challenge invites disaster

## 🌵 The Thistle That Was In Lebanon Sent To The Cedar

Joash answers with a fable instead of a direct threat.

A "thistle" is a small, prickly weed with no real strength.

A "cedar" was Lebanon's tallest, strongest tree, often used to picture great kingdoms.

The thistle in the story demands marriage from the cedar and gets trampled by a passing animal instead.

Joash is comparing Amaziah to the thistle and Israel to the cedar.

🌵 A thistle pictures something weak

🌲 A cedar pictures something strong

🐾 The thistle gets trampled in the story

📖 Joash compares Amaziah to the weed

## 💔 Thine Heart Lifteth Thee Up To Boast

Joash names the real problem directly, pride.

One victory over Edom convinced Amaziah he could beat anyone.

Success had gone straight to his head.

Pride after a win is often more dangerous than the battle that earned it.

💔 Pride is the real problem

🏆 One win inflated his confidence

📈 Success went to his head

📖 Pride after victory is its own danger

# SecondChronicles 25:20-24
# 💥 Defeat At Bethshemesh
---
## 🙌 It Came Of God, That He Might Deliver Them Into The Hand Of Their Enemies

Amaziah is not simply outmatched in this battle.

The text says plainly that God arranged this outcome.

Verse fourteen already explained why, Amaziah's worship of Edom's gods.

This defeat is a direct consequence, not bad luck.

🙌 God arranged this outcome

🗿 The cause traces back to verse fourteen

🎯 It is consequence, not luck

📖 Idolatry led directly to defeat

## 🗺️ Both He And Amaziah King Of Judah, At Bethshemesh

"Bethshemesh" means house of the sun in Hebrew.

It sat on the border between Judah and the old Philistine territory.

Two kings meeting there in battle marks a fully public, undeniable defeat.

There was no way to hide or spin what happened here.

🗺️ Bethshemesh means house of the sun

🧭 It sat on Judah's border

👑 Two kings clashed there directly

📖 The defeat was fully public

## 🧱 Brake Down The Wall Of Jerusalem, Four Hundred Cubits

A "cubit" was an ancient measurement, close to eighteen inches, about the length of a forearm.

Four hundred cubits comes out to around six hundred feet of wall.

Think of a wall as long as two football fields, torn down in one stroke.

Jerusalem's defenses were left wide open for anyone to walk through.

🧱 A cubit was about eighteen inches

📏 Four hundred cubits is about six hundred feet

🏟️ That equals about two football fields

➡️ Jerusalem's defenses were left wide open

## 💰 Took All The Gold And The Silver, And All The Vessels With Obededom

"Obededom" was a family name tied to temple service generations earlier, back in David's time.

The Ark once rested at an Obededom's house before it ever reached Jerusalem.

Now a descendant of that same family loses the temple treasures he was trusted to guard.

Even a legacy of faithful service could not protect against a king's own sin.

💰 Temple gold and silver were stolen

👨‍👦 Obededom's family had a long temple history

🕍 That legacy could not stop this loss

📖 One king's sin cost many people

# SecondChronicles 25:25-28
# 🕯️ A King's Lonely End
---
## 📆 Lived After The Death Of Joash Fifteen Years

Amaziah outlives Joash, the king who humiliated him, by fifteen years.

Outliving a rival is not the same as winning.

Those fifteen years never restore what Bethshemesh took from him.

A longer life does not erase a defeated reputation.

📆 Amaziah outlives Joash by fifteen years

🏳️ Surviving is not the same as winning

🧱 The wall damage was never undone

📖 A long life cannot fix a ruined reign

## 🗡️ After The Time That Amaziah Did Turn Away From Following The Lord They Made A Conspiracy Against Him

The text draws a direct line here.

Amaziah turned away from the Lord, and then his own people turned against him.

This is not presented as a coincidence.

Verse fourteen's idolatry finally catches up with him completely.

🗡️ His own people conspired against him

🔗 The text links this to his idolatry

🎯 It reads as consequence, not chance

📖 Old sin finally caught up with him

## 🏃 He Fled To Lachish

Lachish was one of Judah's most heavily fortified cities.

Fleeing there meant Amaziah still hoped strong walls could save him.

It did not work.

His pursuers caught up with him even behind Lachish's defenses.

🏃 Lachish was a fortified city

🧱 Strong walls could not save him

🗡️ Pursuers caught him there anyway

📖 No wall protects a lost cause

## ⚰️ They Brought Him Upon Horses, And Buried Him With His Fathers

Amaziah dies in disgrace, killed by his own people.

Even so, he still receives a king's burial in Jerusalem.

Not every failed king in this book gets that honor.

Judgment and mercy sit side by side even at the very end.

⚰️ He still receives a royal burial

👑 Not every failed king gets this honor

⚖️ Judgment and mercy both appear here

📖 Even a ruined reign ends with mercy
`.trim();

export const SECOND_CHRONICLES_TWENTY_FIVE_PERSONAL_SECTIONS = parseSecondChroniclesTwentyFiveRawNotes(
  SECOND_CHRONICLES_TWENTY_FIVE_RAW_NOTES,
);
