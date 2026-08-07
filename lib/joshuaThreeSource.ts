export type JoshuaThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaThreeRawNotes(rawText: string): JoshuaThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 3:${startVerse}` : `Joshua 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Joshua 3 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_THREE_RAW_NOTES = `# Joshua 3:1-4
# 🎒 Israel Moves To The Jordan's Edge
---
## 🌅 Joshua Rose Early In The Morning

Rising before dawn was how a leader showed the people he meant business.

Joshua does this on the very day everything is about to change.

This same habit shows up again at other key moments in his life.

A leader who moves first sets the pace for the whole nation.

🌅 Joshua rises before the camp

🐑 Early rising shows his readiness

📜 This habit repeats later in Joshua

📖 A leader sets the pace first

## 🌵 Removed From Shittim

Shittim was the very camp the two spies left from in the last chapter.

The whole nation now leaves that same staging ground behind them.

Moving out of Shittim means the long wait is finally over.

The next stop is the last one before entering the promised land.

🌵 Shittim was the last chapter's camp

🕵️ The spies left from here too

🚶 The whole nation now moves

📖 The next stop is the promised land

## 🏕️ Lodged There Before They Passed Over

Israel does not cross the river the moment it comes into view.

They camp at its edge first, with the promised land right in plain sight.

The pause gives Joshua time to prepare the people properly.

A great moment still needs the right preparation before it happens.

🏕️ They camp at the river's edge

⏳ They do not cross right away

📜 Joshua uses the pause to prepare

📖 Preparation comes before the moment

## 🔢 After Three Days

Three days keeps showing up again and again in the book of Joshua.

Joshua told the people to prepare three days of food back in chapter one.

The two spies also hid for three days after escaping Jericho.

This third three day span lines up with those same earlier moments.

🔢 Three days repeats through Joshua

📜 Chapter one used the same span

🕵️ The spies hid that long too

📖 Patterns like this are not random

## 📢 The Officers Went Through The Host

Officers were leaders who carried Joshua's instructions out to the rest of the people.

Host is an old word for a large, organized army or camp.

These officers had to reach every family across a massive gathering.

A clear chain of command made sure nobody missed the instructions.

📢 Officers carried Joshua's instructions

⛺ Host means a large camp or army

🗣️ They reached every family in camp

📖 A clear chain of command mattered

## 📦 The Ark Of The Covenant Of The Lord Your God

The ark was a gold covered wooden chest kept inside Israel's holy tent.

It held the stone tablets carved with the ten commandments.

Only specially chosen priests were ever allowed to carry it.

It represented God's own presence traveling right along with his people.

📦 The ark was a gold covered chest

📜 It held the ten commandments

✋ Only chosen priests could carry it

📖 It represented God's presence

## 🙏 The Priests The Levites Bearing It

The Levites were the tribe set apart for holy service to God.

Priests came from inside that same tribe, through Aaron's family line.

Ordinary Israelites were never allowed to touch the ark directly.

Carrying it was one of the most sacred duties in all of Israel.

👨‍👩‍👧 Levites were set apart for holy work

🙏 Priests came from Aaron's family

🚫 Others could not touch it directly

📖 Carrying the ark was sacred duty

## 📏 A Space Between You And It, About Two Thousand Cubits

A cubit measured close to the length of a man's forearm, about eighteen inches.

Two thousand cubits works out to somewhere around half a mile.

That much open space let every single person see the ark clearly.

The distance also marked the ark as holy, not just another object in the crowd.

📏 A cubit is about eighteen inches

🚶 Two thousand cubits is near half a mile

👀 Everyone could see the ark clearly

📖 Distance marked the ark as holy

## 🧭 Ye Have Not Passed This Way Heretofore

Heretofore is an old word that means before this time, or until now.

None of this generation has ever crossed into Canaan before.

Following the ark gave them a guide across genuinely unfamiliar ground.

God provided direction for a path nobody in the camp had ever walked.

📖 Heretofore means until now

🚶 This generation has never crossed before

🧭 The ark guided unfamiliar ground

➡️ God provided the direction they needed

# Joshua 3:5-8
# 🙏 Joshua Prepares The People And The Priests
---
## 🧼 Sanctify Yourselves

To sanctify means to set yourself apart as clean and ready for something holy.

In this culture that often included washing, changing clothes, and avoiding certain things.

God was about to act in a visible, public way the next day.

The people needed to be ready to meet him, not just ready to travel.

🙏 Sanctify means set apart as holy

🧼 It often meant washing and preparing

👀 God was about to act visibly

📖 Readiness mattered more than travel

## ✨ The Lord Will Do Wonders Among You

A wonder is an act only God can do, not a clever trick or a coincidence.

Joshua promises this before anyone has actually seen anything happen yet.

The wonder itself is still one full day away.

That kind of promise takes real trust in God's word alone.

✨ A wonder is an act only God does

🗣️ Joshua promises it before it happens

⏳ The wonder is still one day off

📖 That promise takes real trust

## 🚶 Take Up The Ark Of The Covenant, And Pass Over Before The People

The priests do not wait at the back of the crowd.

They carry the ark out in front of the entire nation.

Whatever happens to them at the river happens first, before anyone else risks it.

Leadership here means walking first into the unknown, not just giving the orders.

📦 The priests carry the ark

🚶 They walk in front of everyone

⚠️ They face the river first

📖 Leadership means going first

## 👑 This Day Will I Begin To Magnify Thee

To magnify someone means to make their importance clear and visible to everyone.

God is not making Joshua more important than he already is.

God is making sure all of Israel sees Joshua's authority plainly.

A leader following Moses needed the people's full trust in order to lead them.

👑 Joshua's authority becomes clear here

👀 All Israel sees it happen

🙏 Trust in a new leader mattered

📖 Magnify means to make visible

## 🌊 As I Was With Moses, So I Will Be With Thee

God ties this new moment directly back to Moses at the Red Sea.

The same presence that parted the sea now stands behind Joshua.

Israel is not following a lesser leader with a smaller God.

One story is simply picking up right where the last one left off.

🌊 Moses saw the sea part

🙏 The same God now backs Joshua

👑 Joshua is not a lesser leader

📖 One story continues into the next

## 💧 The Brink Of The Water Of Jordan

Brink means the very edge, the last dry ground before the water begins.

The priests are told to walk all the way to that exact edge.

Nothing happens until their feet actually reach the water's line.

God asks for real movement, not just a promise from a safe distance.

🚶 Priests walk to that exact line

💧 Nothing happens before that step

👣 God asks for real movement

📖 Brink means the very edge

## ⏳ Ye Shall Stand Still In Jordan

The priests are told to stand still inside a flowing river, not run across it.

Standing still while carrying something that heavy takes real nerve.

The miracle has not happened yet when this command is given.

Obedience comes first here, and the wonder follows right after.

🌊 They stand still inside the river

📦 They still carry the ark's weight

⏳ The miracle has not happened yet

📖 Obedience comes before the wonder

# Joshua 3:9-13
# 🌍 The Living God Among You
---
## 👂 Come Hither, And Hear The Words Of The Lord Your God

Hither is an old word that simply means here, or to this place.

Joshua calls the entire nation together before the crossing begins.

What is about to happen is too important to hear about secondhand.

Everyone gets to hear the same promise together, at the same time.

📢 Joshua calls the whole nation together

👂 Nobody hears this secondhand

🙏 Everyone hears the promise together

📖 Hither is an old word for here

## 🙏 Hereby Ye Shall Know That The Living God Is Among You

Living God sets Israel's God apart from the carved idols worshipped all around them.

A carved idol cannot act, speak, or move on its own.

What happens at the river will prove which kind of God Israel actually serves.

The miracle itself becomes the proof, not just Joshua's own words.

🙏 Living God contrasts with carved idols

🪵 Idols cannot act or move

🌊 The river will prove which is true

📖 The miracle itself is the proof

## ⚔️ He Will Without Fail Drive Out From Before You

Without fail leaves no room for doubt about the outcome.

Joshua promises total success before a single battle has even been fought.

This is the same kind of confidence Rahab already spoke back in chapter two.

Israel's own leader and a frightened Canaanite woman agree on the same outcome.

⚔️ Victory is promised before any battle

🙏 Rahab said the same thing already

🤝 Friend and enemy agree on the outcome

📖 Without fail means certain, no doubt

## 🗺️ The Canaanites, And The Hittites, And The Hivites, And The Perizzites, And The Girgashites, And The Amorites, And The Jebusites

These seven names were already living inside the land God promised to Israel.

Each nation held its own cities, kings, and territory across Canaan.

Naming every one by name makes the size of this promise unmistakable.

One God is about to remove seven separate, established nations from their homeland.

🗺️ Seven nations already filled the land

👑 Each had its own kings and cities

🏹 The list names every single one

📖 One promise removes seven nations

## 👣 Take You Twelve Men Out Of The Tribes Of Israel

Joshua is told to choose twelve men, one from each of Israel's twelve tribes.

That number matches the twelve tribes exactly, with nobody left out.

These same twelve men get a special job in the very next chapter.

A small detail here quietly sets up an important scene still to come.

👣 Twelve men, one from each tribe

🤝 Nobody is left out of the number

📜 They return with a task in chapter four

➡️ A small detail sets up what is next

## 🌊 The Waters Of Jordan Shall Be Cut Off, And Stand Upon An Heap

The priests must actually step into the river before anything happens at all.

Their feet touch the water first, with no miracle yet in sight.

Once they step in, the flowing water piles up like a wall upstream.

Faith here means moving first and trusting the promise to catch up.

👣 Priests step in before the miracle

🌊 The river piles up like a wall

⏳ Nothing happens until they move first

📖 Faith moves before it sees proof

# Joshua 3:14-17
# 🌊 Crossing The Jordan On Dry Ground
---
## 📦 The Priests Bearing The Ark Of The Covenant Before The People

Nobody in the camp walks ahead of the ark on this day.

The priests lead the way, with the whole nation following close behind them.

This is the same order Joshua described several verses earlier.

The plan Joshua laid out is now carried out exactly as promised.

📦 Priests lead with the ark in front

🚶 The nation follows close behind

📜 This matches Joshua's earlier plan

📖 The plan is carried out exactly

## 💧 The Feet Of The Priests Were Dipped In The Brim Of The Water

The priests do not wait for the river to move out of their way first.

Their feet actually touch the water while the current is still flowing.

That single, ordinary step is the moment the miracle begins.

Obedience happens a moment before the wonder does.

💧 Their feet touch the flowing water

⏳ The river has not stopped yet

👣 One ordinary step starts it all

📖 Obedience comes a moment before the wonder

## 🌾 For Jordan Overfloweth All His Banks All The Time Of Harvest

The Jordan is not calm or low on this particular day.

Springtime harvest season swelled it well past its normal banks.

Crossing a flooded river on dry ground makes the miracle far bigger than it sounds.

The timing also lines up with the season of Passover, decades after the first one.

🌾 Harvest season swelled the river high

🌊 The Jordan overflowed its normal banks

💪 A flooded crossing makes it a bigger miracle

📖 The timing echoes the season of Passover

## 🏙️ Very Far From The City Adam, That Is Beside Zaretan

Adam and Zaretan were towns located upstream along the Jordan River.

The water backing up there stopped the flow many miles above where Israel stood.

That distance meant nothing downstream interfered with dry ground for anyone crossing.

God controlled water far beyond what anyone at the crossing could even see.

🏙️ Adam and Zaretan sat upstream

📏 The water stopped many miles away

👀 Nothing downstream interfered with the crossing

📖 God controlled what nobody could see

## 🧂 The Salt Sea

The salt sea is another name for what is known today as the Dead Sea.

Its high salt content makes it impossible for most life to survive there.

The Jordan normally flows south and empties into it.

That entire flow simply stopped moving for the length of the crossing.

🧂 The salt sea is the Dead Sea

🧪 Its high salt content kills most life

🌊 The Jordan usually flows into it

📖 That whole flow stopped completely

## 🏹 Passed Over Right Against Jericho

Israel crosses the river at the point directly facing Jericho itself.

That is the exact city the two spies had scouted back in chapter two.

There is no detour and no delay before reaching their first target.

The crossing lines the whole nation up right where the coming battle will happen.

🏹 They cross directly facing Jericho

🕵️ Chapter two's spies had scouted this city

🎯 No detour stands between them and it

📖 The nation lines up for what is next

## ✋ The Priests Stood Firm On Dry Ground In The Midst Of Jordan

The priests do not just cross quickly and step aside.

They stand planted in the middle of the riverbed the entire time.

Every single Israelite walks past them on completely dry ground.

Their steady obedience is what holds the whole crossing together.

✋ Priests stand firm in the riverbed

🚶 Every Israelite passes them on dry ground

⏳ They hold that position the whole time

📖 Their obedience holds the crossing together

## 🌊 Passed Clean Over Jordan

Clean over means the entire nation crosses completely, with nobody left behind.

This crossing deliberately echoes the Red Sea crossing from forty years earlier.

That older generation saw the sea part, and this new generation now sees the river do the same.

One promise made to Moses reaches all the way down to Joshua's own generation.

🌊 The whole nation crosses completely

🕊️ It echoes the Red Sea crossing

👨‍👩‍👧‍👦 A new generation sees the same power

📖 One promise reaches two generations

`.trim();

export const JOSHUA_THREE_PERSONAL_SECTIONS = parseJoshuaThreeRawNotes(JOSHUA_THREE_RAW_NOTES);
