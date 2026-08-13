export type SecondKingsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwelveRawNotes(rawText: string): SecondKingsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwelve\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwelve\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwelve\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 12:${startVerse}` : `2 Kings 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 12 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWELVE_RAW_NOTES = `# SecondKingsTwelve 12:1-3
# 👑 Jehoash Begins To Reign
---
## 📅 In The Seventh Year Of Jehu

The seventh year of Jehu is not a calendar date.

Kings of Judah were often dated by which year the king of Israel was reigning in.

Jehu became king of Israel two chapters earlier, in 2 Kings 9.

This method ties the two kingdoms together in one shared timeline.

📅 Not a normal calendar date

👑 Jehu was king of Israel then

📚 Jehu's rise is told in 2 Kings 9

➡️ Judah and Israel share one timeline

## 📆 Forty Years Reigned He In Jerusalem

Forty years is an unusually long reign for a king of Judah.

Joash was the seven year old boy crowned in the chapter before this one.

Jehoiada the priest had hidden him inside the temple for six years to save his life.

That long reign gave Jehoiada plenty of time to shape him as a king.

👶 Joash was crowned at only seven

🙈 Jehoiada hid him for six years

📆 Forty years is a long reign

📖 One mentor shaped his whole start

## 👑 His Mother's Name Was Zibiah Of Beersheba

Naming a king's mother was a regular pattern for kings of Judah.

The queen mother held real influence in the royal court.

Beersheba was a city near Judah's southern border.

It marked the far end of the phrase from Dan to Beersheba, meaning the whole land.

Recording her hometown ties Joash's family to the land itself, not just the throne.

👑 Queen mothers held real influence

🗺️ Beersheba sat at Judah's southern edge

📏 Dan to Beersheba meant the whole land

📖 This links Joash to the land itself

## ✅ Did That Which Was Right In The Sight Of The LORD

This is the standard phrase the book of Kings uses to grade nearly every king.

It sounds like an unqualified compliment standing alone.

The very next line attaches a condition that changes the whole picture.

Good starts do not always mean good endings.

📏 A recurring grading phrase in Kings

✅ It sounds unqualified on its own

⚠️ The next line adds a condition

📖 Good starts do not guarantee good endings

## 🎓 Wherein Jehoiada The Priest Instructed Him

Instructed means Jehoiada actively taught and guided Joash.

The phrase all his days really means all the days Jehoiada was alive to guide him.

Second Chronicles explains that after Jehoiada died, Joash's obedience did not last.

This king's faithfulness depended on someone else standing beside him.

🎓 Instructed means active daily teaching

📆 Faithful only during Jehoiada's life

📚 Second Chronicles confirms this later

➡️ His faith leaned on another man

## ⛰️ The High Places Were Not Taken Away

High places were hilltop shrines used for worship outside the temple in Jerusalem.

Some were used to worship the LORD there.

Others slid into worship of other gods over time.

God's law called for worship to be centered at the temple alone.

Even a king remembered as good left this one problem standing.

⛰️ High places were hilltop worship sites

🕍 Temple worship was supposed to be central

😕 Some drifted toward other gods

📖 Even good kings left this uncorrected

## 🔥 The People Still Sacrificed And Burnt Incense In The High Places

This line shows the problem was not the king's failure alone.

The ordinary people kept the old habit going themselves, year after year.

A king can lead reform from the top, but he cannot force every heart to follow.

Judah's worship stayed divided between the temple and the hillsides for generations.

🔥 The people kept the old habit

👥 Not only a king's failure

🕯️ Incense was burned outside the temple

➡️ Divided worship lasted for generations

# SecondKingsTwelve 12:4-8
# 💰 Money For The Temple Repairs
---
## 🎁 The Money Of The Dedicated Things

Dedicated things means anything a person set apart and promised to the LORD as holy.

This could be an object, an animal, or a sum of money given by a vow.

Once dedicated, that money belonged to God alone and could not be used for ordinary things.

Jehoash orders all of it collected into one place for the temple's repair.

🎁 Dedicated things means promised to God

🚫 Vows could not be taken back

💰 Includes money given by vow

📖 All of it funds the repairs

## ⚖️ The Money That Every Man Is Set At

This phrase points back to a law in Leviticus about valuing a person by a vow.

Someone could vow themselves or a family member to the LORD.

A priest then set a fixed price to pay instead of the person.

That price is the money every man is set at.

Old vow law is now funding a very practical building project.

⚖️ Refers to a Leviticus vow law

🙋 A person could be vowed to God

💵 A priest set a fixed price

📖 Old vow law funds a real repair

## ❤️ That Cometh Into Any Man's Heart To Bring

This phrase describes freewill giving, money given simply because someone wanted to give it.

No law or vow required it.

Together with the dedicated things and the vow money, this created three separate income streams.

Jehoash was not inventing a new tax, he was redirecting money already coming in.

❤️ Freewill giving needed no command

🌊 Three income streams combine here

🚫 Not a new tax

➡️ Existing gifts get redirected

## 🤝 Let The Priests Take It To Them

This was Jehoash's first plan, handing full responsibility to the priests themselves.

No royal official was assigned to check on the work at this stage.

The plan sounds generous, trusting the priests completely with both the money and the labor.

That much trust with no oversight is about to become the exact problem.

🤝 Full responsibility given to priests

🚫 No official assigned to check

💵 Both money and labor entrusted

➡️ Too much trust invites a problem

## 👥 Every Man Of His Acquaintance

The first plan was decentralized, each priest collecting money from people he personally knew.

That priest was then trusted to use it directly to repair whatever breach he found.

It sounds reasonable on paper.

It left no one checking whether the work actually got done.

This loose system is exactly what breaks down in the next verse.

👥 Each priest collected from his contacts

🔧 That priest handled the repair himself

⚠️ No one checked the results in time

➡️ This system is about to fail

## 🔢 In The Three And Twentieth Year Of King Jehoash

Three and twentieth is an old way of counting.

It simply means the twenty third year.

That is a long stretch of time to leave a problem unresolved.

Joash was crowned at seven, so he is nearly thirty years old by now.

The breaches in the temple had gone unrepaired that entire time.

🔢 Three and twentieth means twenty third

📆 Over twenty years had passed

👑 Joash is nearly thirty now

📖 The temple stayed broken that whole time

## ❓ Why Repair Ye Not The Breaches Of The House

Jehoash goes straight to Jehoiada, the priest who raised him, and asks a direct question.

He does not accept a vague excuse.

His fix changes the whole system.

The priests are told to stop collecting the money themselves.

Instead they are told simply to hand it over for the work to be done.

❓ Jehoash confronts Jehoiada directly

🚫 Priests told to stop collecting

🔄 A new system replaces the old

➡️ Direct action follows a direct question

## 🚪 The Priests Consented To Receive No More Money

The priests agree to stop collecting money directly from worshipers.

That job now shifts to the door keepers and the chest described in the verses ahead.

Giving up a role willingly, without argument, is worth noticing after the long delay in verse six.

Cooperation here makes the new system possible.

🤝 Priests agree to stop collecting

🚪 That job shifts to the door keepers

✅ No argument or resistance shown

➡️ Cooperation enables the new system

## 🔨 Neither To Repair The Breaches Of The House

The priests also give up direct responsibility for the physical repair work itself.

That job was assigned to them back in verse five.

Removing it frees the priests to focus on their normal priestly duties instead.

The new plan divides labor more clearly than the old one ever did.

🔨 Priests also step back from repairs

📜 That job began in verse five

🙏 Frees them for priestly duties

📖 A clearer division of labor follows

# SecondKingsTwelve 12:9-12
# 📦 The Chest By The Altar
---
## 📦 Bored A Hole In The Lid Of It

Jehoiada builds a simple wooden chest with a small hole cut into the top.

Money could be dropped in through that hole.

Nothing could easily be pulled back out again.

This is one of the earliest recorded designs for a locked offering box.

A simple piece of furniture solves the accountability problem from the verses before.

📦 A chest with a hole in the lid

⬇️ Money went in, not back out

🔒 An early locked offering box

📖 A simple object fixes a real problem

## 👁️ Set It Beside The Altar, On The Right Side

Placing the chest beside the altar put it in plain sight of every worshiper.

The right side gave it one fixed, known spot.

A visible, public location made secret tampering far less likely.

Transparency itself became part of the design.

👁️ Placed in plain public view

📍 A fixed, known location

🚫 Harder to tamper with secretly

➡️ Transparency built into the design

## 🚶 The Priests That Kept The Door

These were priests assigned specifically to guard the temple's entrances.

Their job here was simply to make sure worshipers placed their money into the chest.

This spreads responsibility across a role that already existed.

It did not require creating a brand new office.

The new system reused people who were already in place.

🚪 Door keepers were an existing role

👀 They made sure money went in

🔁 No new office was created

📖 The fix reused what already existed

## 👔 The King's Scribe And The High Priest Came Up

Two separate officials, not one, are the ones who open the chest and count the money.

Pairing a royal official with a religious official checked each side against the other.

Neither the king nor the priesthood could quietly control the money alone.

This is an early form of the same principle behind two signatures on one check.

👔 A royal scribe and a priest together

⚖️ Two sides checked each other

🚫 No single group had full control

📖 An early two person check

## 👛 They Put Up In Bags, And Told The Money That Was Found

Told here is an old word meaning counted, the same word used again in verse eleven.

Putting the money into bags organized it for an accurate count before anything was spent.

This detail shows the process was orderly, not rushed or careless.

Careful counting protected everyone involved from being wrongly blamed later.

👛 Money was bagged for counting

🔢 Told means counted here too

🛡️ Protects everyone from false blame

📖 Careful counting builds real trust

## 🔢 They Gave The Money, Being Told

Being told here is an old way of saying the money was counted out precisely.

Every payment out of the chest matched an exact, recorded amount.

This detail answers the very question the priests failed to solve back in verse six.

A counted system replaces an unaccountable one.

🔢 Told means counted precisely

📋 Every payment was recorded

✅ Solves the failure from verse six

➡️ Counting replaces guessing

## 👷 Into The Hands Of Them That Did The Work

The money now goes directly to the overseers running the actual construction.

That is a change from the earlier plan.

Under the earlier plan, priests both held the money and did the work themselves.

Separating who handles the money from who spends it protects both jobs from suspicion.

A clear chain of custody replaced a single point of control.

👷 Overseers received the funds directly

🔀 Separated from the priests entirely

🛡️ Protects both roles from suspicion

📖 A clear chain replaces one control point

## 🧱 To Masons, And Hewers Of Stone

Masons built and shaped stone for the temple's walls.

Hewers of stone quarried and cut the raw blocks first.

Timber and hewed stone had to be purchased before repair work could begin.

Naming each trade shows how large and organized this project really was.

🧱 Masons built with shaped stone

⛏️ Hewers of stone cut raw blocks

🪵 Timber had to be purchased too

📖 A full crew, not a quick patch

# SecondKingsTwelve 12:13-16
# 🏺 What The Money Did Not Buy
---
## 🥣 Howbeit There Were Not Made For The House Of The LORD Bowls Of Silver, Snuffers, Basons

Howbeit is an old word that simply means however.

None of the repair money went toward making new silver bowls for temple use.

Snuffers were tools used to trim the burnt wicks on the temple's lamps.

Basons were wide shallow bowls used for washing and for catching sacrificial blood.

🥣 Bowls held liquid for temple use

✂️ Snuffers trimmed the lamp wicks

🥄 Basons caught blood and washed

📖 Each vessel had its own temple job

## 🎺 Trumpets, Any Vessels Of Gold, Or Vessels Of Silver

Trumpets were used to call assemblies and to sound alarms or celebrations.

None of these ceremonial items, gold or silver, were purchased with the repair money.

Every one of these objects was valuable and normally expected in a fully furnished temple.

The chapter makes a point of naming what was skipped, not just what was done.

🎺 Trumpets called and signaled the people

🚫 None purchased with repair funds

💰 All were valuable ceremonial items

📖 Naming what was skipped matters too

## 👷 They Gave That To The Workmen

Every payment out of the chest went straight to the people doing the physical labor.

There is no mention of the money funding anything beyond wages and materials.

This confirms the earlier plan in verse eleven worked exactly as designed.

A good plan on paper became a good result in practice.

👷 All funds paid the workmen

🧱 Nothing was diverted elsewhere

✅ Confirms the plan worked

📖 A good plan matched a good result

## 🤝 They Dealt Faithfully

They reckoned not means no one demanded a formal audit from these particular men.

That was not carelessness, it was earned trust.

Dealt faithfully is the reason given for skipping that step.

Their honesty had already been proven over time.

Trust like that is rare enough in any era to be worth recording in scripture.

📋 No formal audit was required

🤝 Trust had already been earned

✅ Faithfully means proven honest

📖 Rare trust, worth recording in scripture

## ⚖️ The Trespass Money And Sin Money Was Not Brought

Trespass money and sin money came from offerings people brought to atone for specific wrongs.

Old Testament law set that offering money aside as belonging to the priests themselves.

It supported their own needs.

This was a separate category from the general dedicated gifts collected in the chest for repairs.

The repair fund and the priests' personal support never got mixed together.

⚖️ Trespass and sin offerings differed

🍞 That money supported the priests

📦 Kept separate from the repair chest

📖 Two funds never got mixed

# SecondKingsTwelve 12:17-18
# ⚔️ Hazael's Threat
---
## 🗡️ Hazael King Of Syria Went Up, And Fought Against Gath

Hazael ruled Syria, also called Aram, a kingdom northeast of Israel.

Years earlier, the prophet Elijah was told to anoint Hazael as a future king.

That future king would bring judgment on God's people.

Gath was one of the old Philistine cities, well to the southwest of Syria.

Taking a city that far away shows how much power Hazael had gained.

🗡️ Hazael ruled Syria, or Aram

📜 Elijah once anointed him for this

🏙️ Gath was a distant Philistine city

📖 Distance shows his growing power

## 🧭 Hazael Set His Face To Go Up To Jerusalem

Set his face toward is an old way of saying he committed fully to that direction.

After taking Gath, Hazael turns his full attention north toward Judah's capital.

This is a direct, serious military threat aimed straight at Jehoash's kingdom.

The temple Jehoash had just spent this whole chapter repairing is now itself in danger.

🧭 Set his face means full commitment

🏹 Jerusalem is his next target

⚠️ A direct threat to Judah

➡️ The repaired temple is now at risk

## 🎁 Jehoash King Of Judah Took All The Hallowed Things

Hallowed things means items formally set apart as holy, the same category named back in verse four.

Jehoash gathers not only his own dedicated gifts but everything dedicated by three kings before him.

Ahaziah was his father, Jehoram his grandfather, and Jehoshaphat his great grandfather.

Generations of accumulated temple treasure are about to leave the building all at once.

🎁 Hallowed things means holy dedicated items

👴 Ahaziah, Jehoram, and Jehoshaphat all gave

👑 Three generations of kings included

📖 Generations of treasure, gone at once

## 💰 Sent It To Hazael King Of Syria, And He Went Away

Jehoash pays Hazael off with sacred treasure instead of fighting him.

The plan works, Hazael actually withdraws and leaves Jerusalem alone.

It is also a sobering reversal.

The very gold gathered to restore God's house instead buys off an invading king.

A chapter that opened with careful, faithful stewardship closes with that treasure spent just to survive.

💰 Treasure bought Hazael's retreat

✅ The plan technically worked

😕 Sacred gold funded a payoff instead

📖 Careful stewardship ends in survival, not glory

# SecondKingsTwelve 12:19-21
# 🗡️ The Conspiracy Against Joash
---
## 📚 Written In The Book Of The Chronicles Of The Kings Of Judah

This is a standard closing formula the book of Kings uses for almost every ruler.

It points to a separate royal record book, not the biblical books of Chronicles.

That original record has not survived to today.

The phrase signals the writer is wrapping up this king's story before moving to the next.

📚 A standard closing formula

📖 Points to a lost royal record

🚫 Not the biblical Chronicles

➡️ Signals the story is wrapping up

## 🕵️ His Servants Arose, And Made A Conspiracy

The very men closest to Jehoash are the ones who turn against him.

A conspiracy means they planned this together in secret.

It was not a sudden single act of rage.

The king who survived one plot against his life as a baby now faces another as a grown man.

Betrayal from inside a household often cuts deeper than any outside enemy.

🗡️ His own servants conspired

🤫 Conspiracy means a secret plan

🔁 A second plot against his life

📖 Betrayal from inside cuts deepest

## 🏗️ Slew Joash In The House Of Millo, Which Goeth Down To Silla

Millo was a large filled in terrace structure that supported part of Jerusalem's fortifications.

Silla names a road or location near it.

Its exact site is not certainly known today.

Naming the specific place makes this read like a real historical record, not a vague legend.

Even small geographic details were preserved carefully in these royal accounts.

🏗️ Millo was a fortified terrace

🗺️ Silla's exact site is uncertain

📍 A specific, real location named

📖 Careful detail marks a real record

## 👤 Jozachar The Son Of Shimeath, And Jehozabad The Son Of Shomer

These two men are named specifically as Joash's killers, not left anonymous.

Second Chronicles adds that their mothers were foreign women, one Ammonite and one Moabite.

Second Chronicles also connects this murder to Joash's own later order to kill Jehoiada's son Zechariah.

Naming the killers by name held them permanently responsible in Israel's history.

👤 Two men are named directly

🌍 Second Chronicles notes their foreign mothers

⚖️ Possibly linked to Zechariah's death later

📖 Naming them fixed the blame permanently

## ⚰️ They Buried Him With His Fathers In The City Of David

Burial in the city of David was the customary resting place for kings of Judah.

Second Chronicles adds a detail this verse leaves out.

Chronicles says Joash was not buried in the kings' own tombs, likely because of his final years.

This account in Kings stays neutral, simply recording that he was buried among his ancestors.

⚰️ Kings were buried in David's city

📚 Chronicles adds a missing detail

😕 Possibly buried apart from other kings

📖 Kings and Chronicles differ in detail

## 👑 Amaziah His Son Reigned In His Stead

His son Amaziah becomes the next king of Judah without any recorded struggle for the throne.

The boy who was hidden six years, crowned at seven, and reigned forty years is now gone.

The throne itself continues without pause, even when the man on it does not.

A reign that began with rescue ends in betrayal, yet the promised royal line still holds.

👑 Amaziah succeeds him smoothly

📆 Forty years ended by betrayal

➡️ The throne outlives any one king

📖 The royal line still holds
`.trim();

export const SECOND_KINGS_TWELVE_PERSONAL_SECTIONS = parseSecondKingsTwelveRawNotes(SECOND_KINGS_TWELVE_RAW_NOTES);
