export type FirstKingsEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsEighteenRawNotes(rawText: string): FirstKingsEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsEighteen\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsEighteen\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsEighteen\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 18:${startVerse}` : `1 Kings 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 1 Kings 18 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_EIGHTEEN_RAW_NOTES = `# FirstKingsEighteen 18:1-4
# 😢 A Famine And A Hidden Remnant
---
## The Word Of The LORD Came To Elijah In The Third Year

Elijah predicted no rain until he gave the word, back in chapter seventeen.

This verse picks up in the third year of that drought.

The New Testament later says the drought lasted three years and six months.

The famine had already stretched on for a very long time before this moment.

📅 Third year marks the drought's length
📜 Chapter seventeen started this drought
⏳ It lasted three years, six months
📖 The famine had dragged on long

## Go, Shew Thyself Unto Ahab

"Shew" is an old spelling of show.

God sends Elijah straight back to the king who wants him dead.

Ahab had spent the whole drought searching for the prophet who caused it.

Elijah walks directly into danger at God's command instead of hiding.

👁️ Shew means show or present
👑 Ahab had been hunting Elijah
🚶 Elijah walks straight into danger
📖 Obedience mattered more than safety

## A Sore Famine In Samaria

"Sore" here means severe, not painful in the modern sense.

Samaria was the capital city of the northern kingdom of Israel.

Even the king's own capital was suffering under the drought.

Nobody in the land had escaped the effects of Elijah's word.

💀 Sore means severe here
🏙️ Samaria was the northern capital
👑 Even the king's city suffered
📖 Nobody escaped the drought's reach

## Obadiah, Which Was The Governor Of His House

"Governor of his house" means Obadiah managed the entire royal household.

He was one of the most powerful officials serving under Ahab.

That makes what he does in the next few verses far more dangerous.

A man that close to the king had the most to lose.

🏛️ Governor meant head of household
👔 A powerful position under Ahab
⚠️ Closeness to Ahab meant risk
📖 His courage cost him more

## Obadiah Feared The LORD Greatly

Obadiah served a king devoted to Baal, yet stayed loyal to the true God.

His faith was not loud or public.

It showed up instead in a quiet, costly choice made away from the palace.

Serving a wicked ruler did not have to mean becoming like him.

🙏 Obadiah stayed loyal to God
👑 He still served a wicked king
🤫 His faith worked quietly
📖 Loyalty can survive a bad ruler

## Jezebel Cut Off The Prophets Of The LORD

Jezebel was Ahab's wife and a devoted worshiper of Baal.

"Cut off" means she had the LORD's prophets hunted down and killed.

She wanted Baal worship to fully replace worship of the true God.

This was not a disagreement about religion.

It was an organized attempt to silence God's messengers.

👑 Jezebel was Ahab's wife
🔪 Cut off means hunted and killed
🛐 She pushed Baal worship instead
📖 This was targeted persecution

## Hid Them By Fifty In A Cave

Obadiah hid one hundred prophets in groups of fifty, in two separate caves.

Feeding that many people in secret during a famine took constant risk.

Anyone who noticed could have reported him and gotten them all killed.

Think of hiding a hundred people while food itself is scarce everywhere.

That is the scale of what Obadiah managed for years.

🏔️ A hundred prophets hidden in caves
🍞 Fed in secret during a famine
🎲 Discovery could have meant death
📖 Quiet courage kept them alive

# FirstKingsEighteen 18:5-7
# 🐴 Searching For Grass
---
## Peradventure We May Find Grass

"Peradventure" is an old word meaning perhaps or maybe.

Ahab is not confident here, only hopeful.

The drought had gotten so severe that even the king searched for pasture himself.

Horses and mules were valuable animals, essential for travel and war.

🤔 Peradventure means perhaps
🐴 Ahab searched for pasture himself
⚔️ Horses and mules were valuable
📖 Drought threatened even royal resources

## Ahab Went One Way By Himself

The king and his top official split up to cover more ground.

Both men searched personally instead of sending only servants.

That detail shows how desperate the kingdom had become for water and grass.

🗺️ Ahab and Obadiah split up
👑 Even the king searched personally
💧 Water and grass were nearly gone
📖 Desperation reached the very top

## Fell On His Face

Falling on his face was a deep act of respect, usually given to royalty.

Obadiah treats Elijah, a hunted fugitive, with more honor than many nobles received.

He still believed Elijah spoke for God, even while Ahab hunted him.

🙇 Falling down showed deep respect
👑 Normally reserved for royalty
🙏 Obadiah still honored God's prophet
📖 True honor ignores official rank

## Art Thou That My Lord Elijah

Obadiah recognizes Elijah instantly, even after years of hiding.

He calls him "my lord," a title of honor, not the label Ahab would use.

Their meeting on a random road becomes the answer to Ahab's whole search.

👀 Obadiah recognized Elijah instantly
🗣️ He called him my lord
🎯 An unplanned meeting on the road
📖 God arranged this exact meeting

# FirstKingsEighteen 18:8-12
# 😨 Obadiah's Fear
---
## Go, Tell Thy Lord, Behold, Elijah Is Here

Elijah's answer is short and direct.

He tells Obadiah to announce his location straight to Ahab.

There is no more hiding in this plan, only a bold return.

🗣️ Elijah gives a direct answer
🚶 No more hiding planned
👑 Ahab is meant to hear this
📖 Boldness replaces years of hiding

## What Have I Sinned

Obadiah is not confessing guilt here.

He is asking why Elijah would put him in danger, as if he deserved it.

His years of quiet loyalty are about to be repaid with real risk.

❓ Obadiah is not confessing sin
😟 He questions being put at risk
🙏 His loyalty feels unrewarded now
📖 Fear does not erase faithfulness

## There Is No Nation Or Kingdom Whither My Lord Hath Not Sent To Seek Thee

Ahab had searched for Elijah across the entire region, not just within Israel.

He even made neighboring kingdoms swear an oath that Elijah was not hiding there.

That level of effort shows how much Ahab blamed Elijah for the famine.

🌍 Ahab searched surrounding kingdoms too
🤝 Other nations swore official oaths
👑 Ahab obsessed over finding Elijah
📖 One prophet consumed a king's attention

## The Spirit Of The LORD Shall Carry Thee

Obadiah fears God might move Elijah elsewhere before Ahab arrives.

Prophets in this era were sometimes understood to be carried off by God's Spirit without warning.

If that happened, Obadiah would look like a liar with no way to prove his story.

🌬️ The Spirit could move Elijah suddenly
❓ Obadiah fears looking like a liar
⚠️ Ahab would blame him instead
📖 Real fear shaped this whole request

## I Thy Servant Fear The LORD From My Youth

Obadiah restates his lifelong faithfulness before agreeing to help.

He wants Elijah to understand the risk is real, not an excuse to refuse.

His fear and his faith are both true at the same moment.

🙏 A lifetime of faithfulness restated
⚠️ The risk to him was real
😨 Fear and faith held together
📖 Obadiah agrees despite the danger

# FirstKingsEighteen 18:13-16
# 🔥 Obadiah's Proof And Elijah's Oath
---
## Was It Not Told My Lord What I Did

Obadiah reminds Elijah of the very act described earlier in this chapter.

He is not bragging.

He is establishing that his loyalty is already proven.

This makes his fear in this moment carry real weight instead of sounding like an excuse.

🙏 Loyalty already proven, not claimed
😨 His fear feels grounded, not fake
📜 Obadiah recalls his earlier courage
📖 Past faithfulness backs present hesitation

## As The LORD Of Hosts Liveth, Before Whom I Stand

"LORD of hosts" is a title for God as commander over heaven's armies.

Swearing "as the LORD liveth" was the strongest kind of oath in this culture.

Elijah stakes his own word on God's life to reassure Obadiah.

⚔️ LORD of hosts means heaven's commander
🤝 This was the strongest kind of oath
🙏 Elijah stakes his word on God
📖 A serious promise calms real fear

## I Will Surely Shew Myself Unto Him To Day

Elijah gives Obadiah a firm guarantee, not a vague plan.

He will meet Ahab that very day, with no delay and no disappearing act.

This directly answers Obadiah's fear from the verses before.

📅 Elijah commits to that same day
🚫 No delay, no disappearing act
🤝 This directly answers Obadiah's fear
📖 A firm promise replaces a shaky plan

## Ahab Went To Meet Elijah

After years of searching, Ahab finally walks toward the man he has hunted.

The meeting Ahab wanted for so long finally happens.

But it happens on Elijah's terms, not on Ahab's own terms.

👑 Ahab finally meets his target
🔍 Years of searching are over
⚖️ The meeting happens on Elijah's terms
📖 God's timing controls this moment

# FirstKingsEighteen 18:17-19
# ⚖️ Who Really Troubled Israel
---
## Art Thou He That Troubleth Israel

Ahab blames Elijah personally for the years of famine and drought.

From Ahab's view, the prophet who announced no rain must be causing all the trouble.

He never once considers that the trouble began with his own choices.

👑 Ahab blames Elijah for the famine
🌧️ He ignores who actually caused it
🙈 He never questions his own choices
📖 Blame often skips the real cause

## Thou, And Thy Father's House

Elijah turns the accusation straight back onto Ahab and his family line.

"Thy father's house" points to Omri, Ahab's father, who also led Israel into idol worship.

The real trouble did not start with a prophet's word.

It started generations earlier with the throne's own choices.

👨‍👦 Father's house means Ahab's family line
👑 Omri also led Israel into idols
🔄 Elijah reverses the whole accusation
📖 The throne caused what it blamed

## Thou Hast Followed Baalim

"Baalim" is the plural of Baal, the many local versions of that god worshiped in the region.

Ahab did not just tolerate this worship.

He personally followed it, breaking the most basic command in Israel's covenant with God.

🛐 Baalim means many local Baal gods
👑 Ahab personally followed this worship
📜 This broke Israel's core covenant
📖 The king led the nation into idolatry

## The Prophets Of The Groves Four Hundred, Which Eat At Jezebel's Table

"Groves" refers to worship of Asherah, a Canaanite goddess pictured by wooden poles near altars.

Eating at Jezebel's table means she personally funded these prophets.

Between Baal's prophets and Asherah's prophets, Jezebel backed eight hundred fifty pagan leaders.

🌳 Groves points to Asherah worship
👑 Jezebel personally funded these prophets
🔢 Eight hundred fifty prophets total
📖 State power actively promoted idolatry

# FirstKingsEighteen 18:20-24
# 🤔 The Challenge On Mount Carmel
---
## Mount Carmel

Mount Carmel was a prominent mountain range near Israel's coast, visible for miles around.

Its height and public location made it the perfect stage for a contest everyone could see.

This was not a private test.

It was designed to be witnessed by the whole nation.

⛰️ Carmel was a tall coastal mountain
👀 Visible for miles around
📢 A public, not private, contest
📖 God's answer was meant to be seen

## How Long Halt Ye Between Two Opinions

"Halt" here means to limp or waver, not to stop completely.

Elijah pictures the people wobbling between two gods like someone limping on an injured leg.

He forces a real decision instead of letting the nation drift.

🦵 Halt means to limp or waver
⚖️ The people wavered between two gods
🛑 Elijah demands a real choice
📖 Indecision was its own answer

## The People Answered Him Not A Word

Silence here is not neutral.

It shows a nation that already senses something is wrong but is not ready to say so.

Fear of Jezebel likely kept many mouths shut.

🤐 Silence was not a neutral answer
😨 Fear of Jezebel played a part
👀 The nation sensed something was wrong
📖 Silence can hide a guilty conscience

## I, Even I Only, Remain A Prophet Of The LORD

Elijah is not claiming to be the last faithful believer in all Israel.

Obadiah alone had already hidden one hundred prophets earlier in this chapter.

Elijah means he is the only one standing here, publicly, willing to be seen.

🙋 Elijah stands publicly, visibly alone
🏔️ A hundred others were hidden in caves
👀 He means visible, not total, isolation
📖 Public courage looks different from hidden faith

## The God That Answereth By Fire, Let Him Be God

The test is simple and impossible to fake.

Fire falling from nowhere onto a wet or dry altar cannot be staged.

Elijah stakes everything on a test both sides agree is fair.

🔥 Fire from nowhere cannot be faked
⚖️ Both sides agreed to this test
🎯 The stakes could not be higher
📖 A fair test settles a real question

# FirstKingsEighteen 18:25-29
# 😩 Baal's Prophets Fail
---
## Choose You One Bullock For Yourselves, And Dress It First

Elijah lets Baal's prophets go first and gives them every advantage.

Four hundred fifty men against one gives them plenty of time and manpower.

He is not stacking the odds in his own favor at all.

🐂 Baal's prophets choose and go first
🔢 Four hundred fifty men, full advantage
⏳ They receive unlimited time
📖 Elijah wanted a fair, unrigged test

## They Leaped Upon The Altar

This likely describes a ritual dance, a hopping or limping motion tied to Baal worship.

Some ancient sources connect this to acting out Baal's mythical death and return to life.

No matter the exact ritual, it produced nothing at all.

💃 Leaping was likely a ritual dance
📜 Possibly acted out Baal's mythical death
🔇 The ritual produced no answer
📖 Elaborate ritual is not real power

## Either He Is Talking, Or He Is Pursuing, Or He Is In A Journey

Elijah mocks Baal by suggesting practical, human reasons for his silence.

Maybe he is busy talking, chasing something, or simply away traveling.

Canaanite myths actually described Baal as a god who could die and sleep seasonally.

The insult lands directly on their own religion's story.

🗣️ Elijah mocks with human excuses
😴 Canaanite myths described Baal sleeping
🎯 The insult targets their own mythology
📖 Silence exposed the god as powerless

## Cut Themselves After Their Manner With Knives And Lancets

"Lancets" were small sharp blades used for cutting.

Self injury like this was part of certain ancient pagan worship, meant to force a god's attention.

Israel's own law specifically forbade this kind of self cutting.

🔪 Lancets were small sharp blades
🩸 Self cutting aimed to force a response
🚫 Israel's law forbade this practice
📖 Desperation still produced no answer

## Neither Voice, Nor Any To Answer, Nor Any That Regarded

Three separate phrases confirm the exact same total silence.

No voice, no response, no attention at all from Baal.

Hours of shouting, dancing, and self cutting ended in complete nothing.

🔇 Three phrases confirm total silence
⏰ Hours of effort brought no response
🤕 Self harm changed nothing at all
📖 A false god cannot answer at all

# FirstKingsEighteen 18:30-35
# 🪨 Elijah Rebuilds The Altar
---
## The Altar Of The LORD That Was Broken Down

God's altar had fallen into ruin, likely torn down under pressure to worship Baal.

Before anything else, Elijah repairs it rather than building something new.

Restoring true worship came before proving any point.

🪨 The LORD's altar had fallen into ruin
👑 Years of pressure pushed it aside
🔧 Elijah repairs it first
📖 True worship gets restored, not replaced

## Twelve Stones, According To The Number Of The Tribes

Twelve stones represent the twelve tribes descended from Jacob's sons.

At this point Israel was politically split into two separate kingdoms.

Elijah's altar quietly insists that God still sees one united people.

🪨 Twelve stones for twelve tribes
🗺️ Israel was politically split in two
🤝 God still saw one people
📖 Unity outlasted political division

## A Trench About The Altar, As Great As Would Contain Two Measures Of Seed

A "measure" here refers to an ancient unit for grain called a seah.

Two measures of seed points to a sizable trench, large enough to hold real water.

This detail matters later, since that trench is about to be filled completely.

📏 A measure was an ancient grain unit
🕳️ The trench was sizable
💧 Built to hold a real amount of water
📖 Every detail sets up what follows

## Fill Four Barrels With Water

Water was extremely scarce during a multi year drought.

Elijah asks for it to be poured on the sacrifice three separate times.

That totals twelve barrels, soaking everything completely.

💧 Water was scarce during the drought
🔁 Poured three separate times
🔢 Twelve barrels used in total
📖 Elijah removes any natural explanation

## The Water Ran Round About The Altar

The wood, the sacrifice, and the ground around it were all thoroughly soaked.

No hidden spark or trick could survive that much water.

Whatever happens next will have only one possible explanation.

💦 Everything was thoroughly soaked
🚫 No trick could survive this water
🎯 Only one explanation remains possible
📖 God gets the fullest possible glory

## Built An Altar In The Name Of The LORD

Building "in the name of the LORD" means the altar existed for worshiping Him alone.

Every stone and every action publicly declared whose God this altar belonged to.

There was no ambiguity left about who this moment was for.

🏗️ Built specifically for the LORD
📢 Publicly declared whose altar it was
🚫 No ambiguity about ownership
📖 The name attached defined the purpose

# FirstKingsEighteen 18:36-40
# 🔥 Fire Falls From Heaven
---
## The Time Of The Offering Of The Evening Sacrifice

This was the regular hour of daily worship tied to Israel's temple pattern.

Even in a kingdom overrun by Baal worship, Elijah times his prayer to Israel's true rhythm.

The timing itself is a quiet statement of loyalty.

🕰️ A set daily hour of worship
🏛️ Tied to Israel's temple pattern
🙏 Elijah honors that rhythm here
📖 Faithfulness shows up in small timing

## LORD God Of Abraham, Isaac, And Of Israel

Elijah calls on God using the names of the patriarchs, not a new title.

This ties the moment directly back to the covenant promises made generations earlier.

The fire about to fall answers on behalf of that whole ancient promise.

👴 Names the three patriarchs directly
📜 Ties to old covenant promises
🔗 Links this moment to that history
📖 An old promise answers a new crisis

## That I Have Done All These Things At Thy Word

Elijah makes clear this whole contest was never his own idea.

Every step, from the challenge to the altar to the water, followed God's instruction.

He wants the people to credit God completely, not himself.

🙋 Elijah claims no personal credit
📜 Every step followed God's word
🎯 The glory belongs to God alone
➡️ A messenger points past himself

## The Fire Of The LORD Fell, And Consumed The Burnt Sacrifice

The fire did not just burn the sacrifice and the wood.

It also consumed the stones, the dust, and the water in the trench.

Nothing about this could be explained as a lucky spark or hidden trick.

It was total and undeniable.

🔥 Fire consumed everything present
💧 Even the standing water disappeared
🚫 No natural explanation fits this
📖 A complete answer, beyond dispute

## The LORD, He Is The God

The people repeat this exact sentence twice in a row.

That kind of repetition in Hebrew poetry signals strong emotion and full certainty.

After years of silence and wavering, the nation finally says it plainly, together.

🔁 Repetition signals strong certainty
🗣️ The whole nation speaks together
⏳ Years of silence finally break
📖 Conviction replaces years of doubt

## Let Not One Of Them Escape

Moses' law required false prophets who led Israel into idolatry to be put to death.

Elijah is not acting out of personal rage here.

He is carrying out a command already written in Israel's own law.

The brook Kishon becomes the place where that command is finally enforced.

📜 Moses' law required this penalty
⚖️ Not personal revenge, but the law
🌊 Kishon is where it happened
📖 God's justice followed God's own rules

# FirstKingsEighteen 18:41-46
# 🌧️ Rain Returns To The Land
---
## There Is A Sound Of Abundance Of Rain

The sky was still completely clear when Elijah says this.

He announces the coming rain by faith, before there is any visible sign of it.

Confidence in God's word came before any proof his eyes could see.

☀️ The sky was still clear
🗣️ Elijah speaks before any sign
🙏 Faith came before visible proof
📖 God's word can be trusted first

## Cast Himself Down Upon The Earth, And Put His Face Between His Knees

This unusual posture describes intense, focused prayer, folding low to the ground.

Elijah had just won a massive public victory, yet he does not celebrate.

He goes straight into humble, private prayer instead.

🙇 An intense posture of prayer
🏆 Comes right after a huge victory
🤫 Private prayer over public celebration
📖 Real faith stays humble after winning

## Go Again Seven Times

Elijah sends his servant to check the sky again and again.

Six times in a row come back with nothing to report.

Announcing rain by faith did not mean the answer came instantly.

Persistent prayer kept going even when nothing changed for a while.

🔄 Seven separate trips to check
😐 Six times came back with nothing
⏳ The answer took real persistence
📖 Faith kept praying through the silence

## A Little Cloud Out Of The Sea, Like A Man's Hand

The very first sign of the coming storm was tiny, no bigger than a hand.

From that small beginning, the entire sky would soon turn completely black.

Think of the smallest spark before a massive fire spreads.

Small beginnings are still real beginnings.

☁️ The first sign was tiny
✋ Barely the size of a hand
🌩️ It grew into a massive storm
📖 Small starts can still be real

## Prepare Thy Chariot, And Get Thee Down

Elijah warns Ahab to hurry before the storm makes the roads dangerous.

Even after everything Ahab has done, Elijah still looks out for his safety.

Judgment on false worship did not erase basic mercy toward the king.

🌩️ The storm was coming fast
🐎 Ahab needed to hurry home
🤝 Elijah still showed him mercy
📖 Justice and mercy can coexist

## He Girded Up His Loins, And Ran Before Ahab

"Girded up his loins" means Elijah tucked his long robe into his belt to run freely.

He then ran ahead of Ahab's chariot all the way to Jezreel, many miles away.

"The hand of the LORD" describes supernatural strength given for this exact moment.

An ordinary man could not have kept pace with a chariot that far on foot.

👘 Girded loins means tucking in robes
🏃 He outran a royal chariot
💪 God's power enabled this feat
📖 The same God gave strength to run
`.trim();

export const FIRST_KINGS_EIGHTEEN_PERSONAL_SECTIONS = parseFirstKingsEighteenRawNotes(FIRST_KINGS_EIGHTEEN_RAW_NOTES);
