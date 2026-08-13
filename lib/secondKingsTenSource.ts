export type SecondKingsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTenRawNotes(rawText: string): SecondKingsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTen\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTen\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTen\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 10:${startVerse}` : `2 Kings 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 2 Kings 10 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TEN_RAW_NOTES = `# SecondKingsTen 10:1-3
# 👑 A Letter To Jezreel
---
## 👑 Ahab Had Seventy Sons In Samaria

A king in this culture often had many wives and concubines.

So seventy sons was not unusual for a royal house like Ahab's.

That many sons meant Ahab's family still controlled a huge network of power even after his own death.

Jehu had already killed Ahab's son Joram and grandson Ahaziah of Judah in the chapter before this one.

Seventy more possible heirs still stood between Jehu and a secure throne.

👑 Seventy sons was normal for a king

🏰 Ahab's family still held real power

⚔️ Jehu had already killed two of the line

📖 Many heirs still stood in Jehu's way

## 🏙️ Unto The Rulers Of Jezreel

Samaria was the capital city where the royal princes actually lived.

Jezreel was Ahab's second royal city, where Jehu had just seized control in the chapter before this one.

Jehu sends his letter from his new base in Jezreel to the officials guarding the heirs back in Samaria.

He is reaching across two cities to test their loyalty before he ever meets them face to face.

🏙️ Samaria held the royal princes

🏰 Jezreel was Jehu's new base

✉️ The letter crossed both cities

➡️ Jehu tested loyalty from a distance

## 👶 Them That Brought Up Ahab's Children

Royal children in the ancient world were often raised by guardians.

Their own parents rarely raised them directly.

These guardians managed the young princes' households and had real influence over them.

Jehu addresses his letter to these guardians directly, since they are the ones actually holding power over the heirs.

Whoever these guardians side with will decide whether Ahab's dynasty survives.

👶 Guardians raised the royal children

🏠 They managed the princes' households

✉️ Jehu wrote to them directly

📖 Their choice would decide the dynasty

## ⚔️ Chariots And Horses, A Fenced City Also, And Armour

Jehu spells out exactly what the guardians have available to fight him if they choose to.

A fenced city means a city with real walls, built to withstand a siege.

Listing these resources is not a threat by itself.

It is Jehu daring them to use what they have and resist him openly.

⚔️ Chariots and horses meant real military strength

🏰 A fenced city could withstand a siege

😨 Jehu names their full resources on purpose

➡️ He dares them to fight if they can

# SecondKingsTen 10:4-7
# 😱 The Elders Choose Jehu
---
## 😨 Two Kings Stood Not Before Him

The elders are remembering Jehu's killing of Joram, king of Israel.

He also killed Ahaziah, king of Judah, in the chapter just before this one.

If two reigning kings could not stop Jehu, the guardians of Samaria reason they have no real chance either.

Fear, not loyalty, is what actually shapes their decision here.

😨 Two kings already died at Jehu's hand

👑 Joram of Israel and Ahaziah of Judah

😬 The guardians expect the same fate

➡️ Fear decides their choice, not loyalty

## 🙇 We Will Not Make Any King

The officials answer Jehu with total surrender before he even asks for it.

They promise obedience and specifically refuse to crown a new king from among Ahab's sons.

This removes any chance the seventy sons could unite behind a new ruler.

Their words hand Jehu the throne without a fight.

🙇 The officials surrender completely

🚫 They refuse to crown a new king

👑 This clears Jehu's path to the throne

📖 Surrender came before any battle

## 🗡️ Take Ye The Heads Of The Men Your Master's Sons

Jehu's second letter turns surrender into something far darker.

He demands the guardians personally execute all seventy heirs.

Removing every possible rival heir was a common way ancient rulers secured a new throne against future rebellion.

Jehu is making the guardians share the guilt of the killing, not just permit it.

🗡️ Jehu demands the heirs be killed

👑 Removing heirs secured a new throne

🤝 Jehu makes the guardians share the guilt

➡️ Loyalty now required actual bloodshed

## 🧺 Put Their Heads In Baskets

Sending heads as proof of a completed killing was a recognized practice in the ancient Near East.

The baskets served as physical evidence that the guardians had actually obeyed, not just promised to.

Seventy people, named as Ahab's own sons, were killed to fulfill this one command.

🧺 Heads served as proof of obedience

📦 Baskets carried that grim evidence to Jehu

👑 Seventy of Ahab's sons were killed

📖 Obedience here was proven in blood

# SecondKingsTen 10:8-11
# 🗡️ Two Heaps At The Gate
---
## 🚪 Lay Them In Two Heaps At The Entering In Of The Gate

The city gate was the busiest public space in any ancient city.

Trade and legal matters were handled there every single day.

Jehu chooses this location on purpose so that as many people as possible will see the heaps by morning.

This was not private business.

It was a public statement meant to announce his total control.

🚪 The gate was the busiest public spot

👀 Jehu wanted maximum public attention

📢 The display announced his total control

➡️ A private killing became a public message

## ❓ Ye Be Righteous... But Who Slew All These?

Jehu openly admits he killed Joram, his own former master.

Then he turns around and asks who killed the seventy sons, as if he had no part in that order.

This is a calculated attempt to shift blame onto the guardians who actually carried it out.

Jehu wants the crowd to see their hands as bloodier than his own.

❓ Jehu admits killing his own master

🙅 He blames the guardians for the rest

🎭 This shifts guilt away from himself

📖 Jehu manages his image in public

## 📜 Nothing Of The Word Of The LORD

This is a direct callback to a prophecy against Ahab's entire house.

Elijah had warned Ahab back in 1 Kings 21 about his family's future.

He said the whole line would be wiped out because of Ahab's sins.

Jehu names Elijah specifically, tying this bloody morning to a promise God made years earlier.

The killing fulfills that word exactly as it was spoken.

📜 This recalls Elijah's warning to Ahab

⚖️ Ahab's whole house was doomed by that word

⏳ Years passed before it was fulfilled

📖 God's word came true exactly as spoken

## ⚰️ His Great Men, And His Kinsfolks, And His Priests

Jehu does not stop with the seventy sons.

He also kills Ahab's officials, extended family, and religious leaders connected to the royal house.

Wiping out an entire ruling class, not just the direct heirs, was common practice.

It was how a new dynasty prevented any future revolt.

By the end of this purge, nothing of Ahab's household remains in Jezreel.

⚰️ Officials, family, and priests were all killed

🏛️ This wiped out the whole ruling class

🛡️ It prevented any future revolt

➡️ Nothing of Ahab's household survived

# SecondKingsTen 10:12-14
# ⚰️ The Brethren Of Ahaziah
---
## 🐑 The Shearing House In The Way

A shearing house was a gathering place where sheep were sheared, often along a well used road between towns.

It was an ordinary, everyday location, not a place anyone would expect danger.

Jehu meets the next group of victims here almost by chance, on his way from Jezreel to Samaria.

🐑 A shearing house was for sheep shearing

🛣️ It sat along a well traveled road

😬 An ordinary place became a deadly one

➡️ Jehu met this group almost by chance

## 👑 Brethren Of Ahaziah King Of Judah

Ahaziah, king of Judah, had already been killed by Jehu's men in the previous chapter.

Judah's royal family was closely tied by marriage to Ahab's household in Israel, through Ahaziah's mother Athaliah.

That family connection is exactly why these relatives from Judah are traveling through Israel and now cross paths with Jehu.

👑 Ahaziah of Judah already died in chapter nine

🤝 Judah's royal line was tied to Ahab's family

🛣️ That tie brought these relatives into Israel

📖 Family connections now cost them their lives

## 🗡️ Slew Them At The Pit Of The Shearing House

These men are traveling to visit the royal family in Samaria, not knowing that family no longer exists.

Jehu takes all forty two of them alive first.

Then he kills every one of them at the pit near the shearing house.

His purge extends past Israel's own royal line into Judah's extended family as well.

🗡️ Forty two men were killed together

🙅 They had no idea the danger they faced

🌍 The purge crossed into Judah's own family

➡️ No relative of the old dynasty was spared

# SecondKingsTen 10:15-17
# 🤝 Jehonadab Joins The Purge
---
## 🐪 Jehonadab The Son Of Rechab

The Rechabites were a nomadic clan known for a simple, disciplined way of life devoted to the LORD.

They avoided wine, permanent houses, and settled farming, choosing to live as their ancestor Rechab had instructed them.

The prophet Jeremiah later holds this same family up as an example of faithfulness in Jeremiah chapter thirty five.

Jehu meeting a man this respected gives his cause real religious credibility.

🐪 Rechabites lived a simple, disciplined life

🚫 They avoided wine and permanent houses

📖 Jeremiah later praised their faithfulness

➡️ Jehonadab's presence gave Jehu credibility

## 🤝 Is Thine Heart Right, As My Heart Is With Thy Heart?

Jehu is not making small talk here.

He is asking Jehonadab to publicly commit to his side before anything else happens.

Giving his hand and pulling Jehonadab into his own chariot was a visible, public gesture of alliance.

Everyone watching would see exactly who stood with Jehu now.

🤝 Jehu asks for open loyalty

🚗 The chariot ride made it visible

👀 Onlookers would see the alliance clearly

📖 Public gestures sealed political loyalty

## 🔥 See My Zeal For The LORD

"Zeal" here means intense, energetic devotion to a cause.

Jehu frames his violent purge as devotion to God.

He does not call it a grab for personal power.

The chapters ahead will show that his obedience was real in some ways but incomplete in others.

His words here sound more certain than his actions later turn out to be.

🔥 Zeal means intense devotion

🙏 Jehu frames the purge as devotion to God

⚖️ Later verses show his obedience was incomplete

➡️ Words here outrun what his actions prove

# SecondKingsTen 10:18-21
# 🎭 Jehu's Trap For Baal
---
## 🎭 Ahab Served Baal A Little, But Jehu Shall Serve Him Much

Jehu says the exact opposite of what he actually intends to do.

Baal was the Canaanite storm and fertility god that Ahab and Jezebel had promoted throughout Israel.

This announcement is bait, designed to draw every Baal worshipper in the country into one place.

🎭 Jehu's words are a deliberate lie

⛈️ Baal was Ahab and Jezebel's chosen god

🪤 The announcement was bait for worshippers

📖 Jehu's real plan was total destruction

## ⚠️ Whosoever Shall Be Wanting, He Shall Not Live

Jehu frames attendance at this sacrifice as mandatory under threat of death.

Anyone who values their life will show up.

No one wants to be marked as disloyal.

This guarantees the largest possible crowd of Baal worshippers gathers in one building.

⚠️ Missing the sacrifice meant a death threat

😨 Fear guaranteed a huge turnout

🏛️ Every worshipper gathered in one place

➡️ The trap needed a full house to work

## 🗝️ Jehu Did It In Subtilty

"Subtilty" means clever, calculated deception.

The text tells the reader directly that Jehu's whole announcement was a trick.

There is no need to guess at his real motive.

He is willing to look like a Baal worshipper himself for a short time.

His real goal is to destroy Baal worship completely.

🗝️ Subtilty means clever deception

📖 The text names the trick plainly

🎭 Jehu posed as a worshipper to destroy them

➡️ The end goal was Baal's total defeat

## 🏛️ The House Of Baal Was Full From One End To Another

This detail shows just how widespread Baal worship had become in Israel by this point.

Decades of Ahab and Jezebel's influence had built a large, devoted following.

A single building overflowing with worshippers is a picture of how deep the problem actually ran.

🏛️ The temple was completely packed

📆 Decades of royal influence built this following

😟 The scale shows how deep the problem ran

📖 One trap could not have worked otherwise

# SecondKingsTen 10:22-25
# 👘 Vestments And The Guard
---
## 👘 Bring Forth Vestments For All The Worshippers Of Baal

Special garments were kept in a vestry for Baal's priests and worshippers to wear during formal ceremonies.

Handing these out to everyone in the crowd marked each person clearly as a follower of Baal.

That marking becomes important a few verses later, when Jehu's men need to know exactly who to kill.

👘 Vestments were formal Baal worship garments

🏛️ They came from a dedicated vestry

🎯 The garments marked who belonged there

➡️ That marking mattered for what came next

## 🔍 None Of The Servants Of The LORD, But Worshippers Of Baal Only

Jehu and Jehonadab personally check the crowd before the killing begins.

This search protects any faithful worshipper of the LORD who might have wandered in by accident.

It also proves that Jehu's earlier claim to serve Baal was calculated performance, not genuine belief.

🔍 Jehu personally screened the crowd

🛡️ This protected any faithful bystander

🎭 It proved his earlier claim was a performance

📖 The trap was aimed with precision

## 🛡️ Fourscore Men Without

"Fourscore" is an old way of saying eighty.

Jehu stations eighty armed men outside the building before the sacrifice even begins.

Positioning them outside first means every exit is already sealed once the killing starts inside.

🛡️ Fourscore means eighty

🚪 Eighty men guarded every exit

🔒 The building was sealed before the killing

➡️ Nothing was left to chance

## ⚖️ His Life Shall Be For The Life Of Him

Jehu warns his own guards that letting any Baal worshipper escape will cost the guard his own life.

This kind of matching penalty was a familiar warning in the ancient world, meant to guarantee full obedience.

No guard would risk his own neck to let a stranger slip away.

⚖️ A guard's life matched any escapee's life

😨 The threat guaranteed full obedience

🚫 No guard would risk letting one go

📖 Fear sealed the trap completely

# SecondKingsTen 10:26-28
# 🔥 Baal's House Destroyed
---
## 🗿 Brought Forth The Images, And Burned Them

The sacred images inside the temple represented Baal and the worship built around him.

Destroying the physical objects was not just symbolic violence against the people.

It removed the very things the worshippers had bowed down to.

🗿 Images represented Baal himself

🔥 They were burned, not just discarded

🙇 This ended what people had bowed to

📖 Destroying idols matched destroying idolatry

## 🚽 Made It A Draught House Unto This Day

A "draught house" was a latrine, a place for human waste.

Turning Baal's own temple into the lowest, most degrading kind of building was a deliberate insult.

The phrase "unto this day" matters here.

It tells the reader this humiliating change was still true when Kings was written.

🚽 Draught house means a latrine

😳 This was a deliberate insult to Baal

📆 It stayed that way for generations

➡️ Nothing about Baal's house was left with honor

## 🔥 Thus Jehu Destroyed Baal Out Of Israel

This line closes out the entire campaign against organized Baal worship in the northern kingdom.

Formal Baal worship, with priests, temples, and public sacrifice, genuinely ends here.

The verses right after this one will show that Jehu's reform still left something important untouched.

🔥 Formal Baal worship ended here

🏛️ Priests, temples, and sacrifice were destroyed

⚠️ Something important still remained untouched

📖 A real victory, but not a complete one

# SecondKingsTen 10:29-31
# 🐄 The Golden Calves Remain
---
## 🐄 The Golden Calves That Were In Bethel, And That Were In Dan

Long before Jehu, King Jeroboam had set up two golden calf shrines described back in 1 Kings chapter twelve.

Jeroboam built them so Israelites would not travel south to worship.

The temple in Jerusalem sat inside the rival kingdom of Judah.

Jehu tore down Baal worship completely but left these two shrines standing.

His reform removed a foreign god but kept a false way of worshipping the true God.

🐄 Jeroboam built these shrines earlier

🗺️ Bethel and Dan sat far from Jerusalem

🚫 Jehu never tore these two down

📖 One false worship replaced another

## 👑 Thy Children Of The Fourth Generation Shall Sit On The Throne

God rewards Jehu's real, if incomplete, obedience with a promise about his family line.

Four generations of Jehu's descendants would rule Israel after him, longer than almost any other dynasty in the northern kingdom.

The reward matches the obedience given, no more and no less.

👑 God promises four generations of rule

📆 That outlasted most northern dynasties

⚖️ The reward matched the obedience shown

📖 Partial obedience still brought a real blessing

## 💔 Took No Heed To Walk In The Law Of The LORD With All His Heart

This verse delivers the chapter's final verdict on Jehu.

He acted with real zeal against Baal but never fully committed his own heart to God's law.

Destroying one form of false worship is not the same thing as wholehearted devotion.

Jehu becomes a warning that outward zeal and inward faithfulness are not automatically the same thing.

💔 The verdict on Jehu is mixed

🔥 His zeal against Baal was real

⚖️ His heart was never fully devoted

➡️ Outward zeal is not true faith

# SecondKingsTen 10:32-36
# ⚔️ Israel Cut Short
---
## ✂️ The LORD Began To Cut Israel Short

This phrase directly follows the verdict against Jehu's half hearted obedience in the verse just before it.

Israel begins losing territory almost as soon as that verdict is given.

The timing in the text draws a clear line from Jehu's incomplete devotion to the nation's coming losses.

✂️ Israel starts losing land here

⚖️ This follows right after Jehu's mixed verdict

🔗 The text links the two events together

📖 Incomplete devotion carried a real cost

## ⚔️ Hazael Smote Them In All The Coasts Of Israel

Hazael was the king of Syria, a nation east and north of Israel across the Jordan region.

He had been marked out years earlier in 1 Kings chapter nineteen as a future instrument of judgment against Israel.

That old, waiting prophecy now begins to come true through Hazael's attacks.

⚔️ Hazael was the king of Syria

📖 He was marked for this role earlier

⏳ A years old prophecy begins to fulfill

➡️ Judgment can wait a long time before arriving

## 🗺️ From Jordan Eastward... Even Gilead And Bashan

This describes the loss of the entire Transjordan region, the large stretch of Israel's land east of the Jordan River.

Gilead and Bashan were fertile territories that belonged to the tribes of Gad, Reuben, and half of Manasseh.

Losing this much land was a massive blow to Israel's size and strength, not a minor border skirmish.

🗺️ Transjordan means land east of the Jordan

🌾 Gilead and Bashan were fertile tribal lands

📉 This was a massive loss of territory

📖 The judgment reached far beyond a skirmish

## 📚 The Book Of The Chronicles Of The Kings Of Israel

This phrase points to an official royal record that once existed alongside the Bible's own account.

That original record has not survived to today.

The author of Kings uses this same formula again and again.

It points readers to fuller records that existed at the time of writing.

📚 This names a lost royal record

📜 It once existed alongside this account

🔁 The same formula repeats throughout Kings

➡️ Not every detail made it into scripture

## 👑 Jehu Reigned... Twenty And Eight Years

Twenty eight years was one of the longer reigns among the unstable kings of the northern kingdom.

That length matched the four generation promise made earlier in the chapter.

Together they made Jehu's family the longest lasting line Israel's throne would ever see.

His story closes as a mix of real obedience, real violence, and a heart that never went all the way.

👑 Twenty eight years was a long northern reign

📆 His dynasty became the longest lasting one

⚖️ His story mixes obedience with a divided heart

📖 A long reign built on partial faithfulness
`.trim();

export const SECOND_KINGS_TEN_PERSONAL_SECTIONS = parseSecondKingsTenRawNotes(SECOND_KINGS_TEN_RAW_NOTES);
