export type SecondKingsTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyOneRawNotes(rawText: string): SecondKingsTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwentyOne\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwentyOne\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwentyOne\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 21:${startVerse}` : `2 Kings 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 21 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_ONE_RAW_NOTES = `# SecondKingsTwentyOne 21:1-3
# 😈 Manasseh's Wicked Beginning
---
## 👑 Twelve Years Old When He Began To Reign

Manasseh became king of Judah at only twelve years old.

A boy that young could not rule alone at first.

Older advisors and officials almost certainly guided the kingdom in his earliest years.

He went on to reign fifty and five years, longer than any other king of Judah.

👑 Manasseh became king at only twelve

👥 Advisors likely guided him at first

📏 His reign lasted fifty and five years

📖 No king of Judah reigned longer

## 💛 Hephzibah

Hephzibah was the name of Manasseh's mother.

The name means my delight is in her.

Isaiah later uses this exact name as a symbol for a restored Jerusalem.

God delighting in His people again is the picture behind that name.

💛 Hephzibah means my delight is in her

📜 She was Manasseh's mother

🏙️ Isaiah reuses the name for Jerusalem

📖 It pictures God delighting in His people

## 😢 Did That Which Was Evil In The Sight Of The LORD

This phrase is the standard measuring stick Kings uses for every ruler.

Manasseh's own father Hezekiah was one of Judah's most faithful kings.

Manasseh reverses everything his father built in a single generation.

The two reigns sit right next to each other as an obvious contrast.

📏 This is the Bible's standard measure for kings

👑 Hezekiah his father was deeply faithful

🔄 Manasseh reverses that faithfulness completely

📖 Father and son sit in stark contrast

## 🏔️ Built Up Again The High Places

High places were open air worship sites usually built on hills.

They were originally used for idol worship before Israel entered the land.

Hezekiah tore these same high places down earlier in the book.

Manasseh personally rebuilds every one of them.

🏔️ High places were open air worship sites

🔨 Hezekiah had torn these down before

🔄 Manasseh rebuilds every one of them

📖 His first act undoes his father's reform

## 🐂 Reared Up Altars For Baal, And Made A Grove

Baal was the chief storm and fertility god worshipped across Canaan.

A grove here does not mean a cluster of trees.

It refers to an Asherah pole, a wooden object tied to a Canaanite goddess.

Ahab, one of Israel's most wicked kings, set up the same kind of grove.

Manasseh is compared directly to the worst king in the whole Bible.

🐂 Baal was a Canaanite storm god

🪵 A grove meant an Asherah idol pole

😈 Ahab set up the very same thing

📖 Manasseh is compared to Israel's worst king

## ✨ Worshipped All The Host Of Heaven

The host of heaven means the sun, moon, and stars.

Many ancient nations worshipped these as gods with real power over daily life.

The law of Moses specifically forbids Israel from worshipping anything in the sky.

Manasseh brings a foreign, forbidden religion straight into Judah's official worship.

✨ Host of heaven means sun, moon, stars

🌍 Neighboring nations worshipped these as gods

🚫 The law of Moses forbids this

📖 Manasseh imports a forbidden religion

# SecondKingsTwentyOne 21:4-7
# 🏛️ Idols Inside God's Own House
---
## 🏛️ Built Altars In The House Of The LORD

Every earlier act of idolatry happened outside the temple.

This altar goes inside the temple itself, the one place set apart for God alone.

God had already named this exact building as the place He would put His name.

Manasseh brings the very things God hates into God's own house.

🏛️ This idolatry moves inside the temple

📍 The temple was set apart for God

✋ God had claimed this exact place

📖 Manasseh brings idols into God's house

## 📛 In Jerusalem Will I Put My Name

God's name being placed somewhere meant His presence and reputation rested there.

This was a promise God made when the temple was first built.

Filling that same place with foreign altars directly attacks that promise.

The building meant to honor God's name is now used against Him.

📛 God's name meant His presence rested there

🏗️ This promise came at the temple's building

⚔️ Foreign altars directly attack that promise

📖 God's own house turns against Him

## 🚪 In The Two Courts Of The House Of The LORD

The temple had an inner court for priests and an outer court for the people.

Placing altars in both courts meant every visitor to the temple saw them.

There was no part of temple worship left untouched by this idolatry.

🚪 The temple had an inner and outer court

👀 Every visitor would see these altars

🚫 No part of worship stayed untouched

📖 Idolatry reached every corner of the temple

## 🔥 Made His Son Pass Through The Fire

This phrase describes child sacrifice offered to the god Molech.

The law of Moses names this practice as one of the worst sins possible.

Manasseh offers his own child the same way pagan nations offered theirs.

A king meant to protect his people instead sacrifices his own family.

🔥 This means child sacrifice to Molech

🚫 The law names this among the worst sins

👶 Manasseh sacrifices his own child

📖 A protector becomes a destroyer

## 🔮 Observed Times, And Used Enchantments

Observing times meant reading omens from the sky, animals, or random events.

Enchantments were spells or charms meant to control outcomes through hidden power.

The law of Moses forbids both practices by name in Deuteronomy.

Manasseh reaches for pagan magic instead of trusting God's word.

🔮 Observing times meant reading omens

🪄 Enchantments were spells or charms

🚫 Deuteronomy forbids both by name

📖 He trusts magic instead of God

## 👻 Dealt With Familiar Spirits And Wizards

A familiar spirit was believed to be a spirit that spoke through a medium.

A wizard here means a person who claimed to talk with the dead.

King Saul was judged for consulting a similar medium generations earlier.

Manasseh formally welcomes the same forbidden practice back into Judah.

👻 A familiar spirit spoke through a medium

🧙 A wizard claimed to speak with the dead

⚖️ Saul was judged for the very same thing

📖 Manasseh welcomes it back officially

## 🪵 A Graven Image Of The Grove

This is not a new idol, but the very Asherah pole from verse three.

Manasseh moves it from the high places into the temple building itself.

This is the single most direct insult to God possible in this chapter.

The object God hates most now sits where God's own name was placed.

🪵 The same Asherah idol moves again

🏛️ It now sits inside the temple

💔 This is the chapter's worst insult

📖 The idol takes God's own place

## ♾️ Will I Put My Name For Ever

God had promised David and Solomon that His name would stay in this house forever.

For ever meant a promise with no expiration date.

Manasseh's idols now sit directly inside a promise God intended to last always.

The contrast between God's eternal promise and Manasseh's present betrayal could not be sharper.

♾️ God promised His name forever here

👑 The promise was made to David and Solomon

💔 Idols now sit inside that promise

📖 Eternal promise meets present betrayal

# SecondKingsTwentyOne 21:8-9
# ⚖️ A Promise With A Condition
---
## 🦶 Neither Will I Make The Feet Of Israel Move Any More

God had promised Israel a permanent, settled home in the land.

Feet moving described wandering, the way Israel wandered before entering Canaan.

God wanted this generation to stop wandering and finally stay put.

That promise was never unconditional though.

🦶 Feet moving meant wandering, like before Canaan

🏡 God promised a permanent, settled home

🛑 Wandering was meant to be over

📖 The promise still carried a condition

## 📜 According To All The Law That My Servant Moses Commanded

The promise of a settled land depended on Israel keeping God's law.

Moses had delivered that same law generations earlier at Mount Sinai.

Obedience was always the condition attached to staying in the land.

Manasseh's idolatry breaks the exact condition this promise depended on.

📜 The land promise had a condition

🏔️ Moses delivered that law at Sinai

✅ Obedience kept Israel in the land

📖 Manasseh breaks the condition himself

## 😔 Manasseh Seduced Them

Seduced here means Manasseh actively led the people into sin.

He did not just sin privately as one man.

The text says Judah sinned more than the nations God had already destroyed.

A king's example spreads to an entire nation.

😔 Seduced means he led others into sin

👥 Judah followed his example nationally

📉 They outsinned the nations God removed

📖 A king's example spreads to a nation

# SecondKingsTwentyOne 21:10-15
# ⚡ God's Judgment Pronounced
---
## 🗣️ The LORD Spake By His Servants The Prophets

God does not judge Judah without warning them first.

Prophets were God's chosen messengers sent to speak His exact words.

This pattern repeats throughout the whole book of Kings before every major judgment.

Judgment always comes after a warning, never as a surprise.

🗣️ Prophets carried God's exact words

📢 God warns before He judges

🔁 This pattern repeats throughout Kings

📖 Judgment never arrives as a surprise

## 🏜️ Above All That The Amorites Did

The Amorites were one of the nations living in Canaan before Israel arrived.

God had removed them from the land because of their own wickedness.

Manasseh's sin is measured as worse than the sin that got the Amorites removed.

The very people Israel replaced become the standard Manasseh manages to exceed.

🏜️ Amorites were Canaan's earlier inhabitants

🚫 God removed them for their wickedness

📈 Manasseh's sin measures worse than theirs

📖 He exceeds the standard that got them removed

## 👂 Both His Ears Shall Tingle

This is an old idiom for news so shocking it stuns the listener.

The same exact phrase appears earlier in the book of Samuel.

It signals that whoever hears this coming judgment will be genuinely stunned.

😱 Listeners will be genuinely stunned

👂 An idiom for truly shocking news

📖 The same phrase appears in Samuel

➡️ The judgment matches the sin's severity

## 📏 The Line Of Samaria, And The Plummet Of The House Of Ahab

A line and a plummet were simple building tools.

Builders used them to check whether a wall stood straight and level.

Samaria was Israel's capital, already destroyed by Assyria for the very same sins.

Ahab's house was Israel's most idolatrous royal family, already judged and removed.

God measures Jerusalem by the same standard already used against both of them.

📏 Line and plummet were measuring tools

🏙️ Samaria already fell for these sins

👑 Ahab's house already faced this judgment

📖 Jerusalem now gets measured the same way

## 🍽️ Wipe Jerusalem As A Man Wipeth A Dish

This pictures someone wiping a dish clean and then turning it completely upside down.

Nothing is left inside, and nothing sits on top afterward either.

The image describes total, thorough judgment, not a partial correction.

Jerusalem is about to be emptied out just as completely.

🍽️ A wiped, overturned dish is emptied fully

🧹 The image means total, thorough judgment

🚫 Nothing is left, nothing remains on top

📖 Jerusalem faces the same complete emptying

## 💔 Forsake The Remnant Of Mine Inheritance

Mine inheritance refers to Israel, the people God chose and set apart.

Remnant means the portion of that people still left in the land.

God had never fully abandoned His people before this point.

This judgment is severe enough that even that faithfulness reaches its limit.

💔 Mine inheritance means God's own people

👥 Remnant means those still left

🛑 God had never abandoned them before

📖 This judgment reaches even that limit

## 🏹 A Prey And A Spoil To All Their Enemies

A prey is something hunted down and captured.

A spoil is property taken by force after a victory.

Both words describe how completely Israel's enemies will overpower them.

The nation that once conquered Canaan is about to be conquered itself.

🏹 Prey means something hunted and captured

💰 Spoil means property taken by force

⚔️ Enemies will overpower them completely

📖 The conquerors are about to be conquered

## 🇪🇬 Since The Day Their Fathers Came Forth Out Of Egypt

God traces Israel's disobedience all the way back to the exodus.

This was not one bad king causing one bad moment.

The pattern of turning from God stretches across the entire history of the nation.

Manasseh is the worst example of a very long running pattern.

🇪🇬 The pattern traces back to the exodus

📜 This is not one king's mistake

⏳ Disobedience spans the nation's whole history

📖 Manasseh is the worst example yet

# SecondKingsTwentyOne 21:16-18
# 🩸 Manasseh's Blood And Death
---
## 🩸 Manasseh Shed Innocent Blood Very Much

This blood was likely spilled to silence anyone who opposed his idolatry.

Jewish tradition holds that the prophet Isaiah was killed during Manasseh's reign.

The text says Jerusalem was filled with this bloodshed from one end to the other.

Manasseh's violence matches the scale of his idol worship.

🩸 Likely spilled to silence opposition

📜 Tradition connects this to Isaiah's death

🏙️ Jerusalem was filled end to end

📖 His violence matched his idolatry

## 😔 Beside His Sin Wherewith He Made Judah To Sin

This verse separates two different categories of guilt.

One is the innocent blood Manasseh personally shed.

The other is the idolatry he spread across the whole nation.

Both are counted against him at the same time.

😔 Two separate categories of guilt appear

🩸 One is the blood he shed

😈 The other is the idolatry he spread

📖 Both are counted against him together

## 📚 The Book Of The Chronicles Of The Kings Of Judah

This was a real royal record book that no longer exists today.

Kings cites this same source repeatedly across many different chapters.

It was likely an official court history, separate from the biblical books of Chronicles.

The Bible openly points its own readers toward sources outside itself.

📚 A real record book, now lost

🔁 Kings cites this source repeatedly

🏛️ Likely an official court history

📖 The Bible points beyond its own text

## 🌳 Buried In The Garden Of His Own House, In The Garden Of Uzza

Earlier kings of Judah were normally buried in the City of David.

Manasseh instead gets buried in a private garden attached to the palace.

Scholars are not fully certain why this change happened.

It may simply reflect a shift in royal burial custom by this point.

🌳 Not buried in the City of David

🏡 Buried instead in a palace garden

❓ The exact reason is not fully known

➡️ Royal burial custom may have shifted

# SecondKingsTwentyOne 21:19-22
# 👑 Amon Follows His Father's Path
---
## 👩 Meshullemeth, The Daughter Of Haruz Of Jotbah

Kings often records the mother's name for each ruler of Judah.

Jotbah was a small town whose exact location is no longer certainly known.

Naming a king's mother and hometown was a normal part of a royal record.

This small detail confirms Amon as a real, historically recorded king.

👩 Kings regularly records each king's mother

🗺️ Jotbah's exact location is uncertain today

📜 This was normal royal record keeping

📖 It grounds Amon as a real king

## ⏳ He Reigned Two Years In Jerusalem

Amon's reign lasted only two years, one of the shortest in Judah's history.

His father Manasseh had just reigned fifty five years before him.

A very long reign is followed immediately by a very short one.

This short reign will not end in old age.

It ends in violence instead.

⏳ Only two years, one of the shortest

📏 Manasseh's fifty five years came right before

🔄 A long reign followed by a short one

➡️ This reign is about to end violently

## 😞 As His Father Manasseh Did

Amon copies his father's evil.

He does not copy his father's later years.

Second Chronicles records that Manasseh humbled himself before God later in life.

That part of the story does not appear here in Kings.

Amon apparently follows only the worst version of his father's example.

😞 Amon copies his father's early evil

📖 Chronicles records Manasseh's later humbling

❓ That change is not repeated here

➡️ Amon follows the worst version only

## 🚶 Walked In All The Way That His Father Walked In

Walking in someone's way is an old picture for living the same kind of life.

This is not one or two copied sins.

Amon follows his father's entire pattern, idol for idol.

Nothing in his short reign breaks from that inherited pattern.

🚶 Walking in a way means living like someone

🔁 Not one sin but a whole pattern

🐂 He copies idol for idol

📖 Nothing here breaks the inherited pattern

## 💔 Forsook The LORD God Of His Fathers

Forsook means he completely abandoned something he once had access to.

His fathers here likely points back to earlier faithful kings like Hezekiah.

Amon walks away from that whole faithful inheritance, not just his father's failures.

Unlike Manasseh in Chronicles, nothing in this text shows Amon turning back.

💔 Forsook means completely abandoned

👑 His fathers include faithful kings like Hezekiah

🚫 He abandons that whole inheritance

📖 Nothing shows him turning back

# SecondKingsTwentyOne 21:23-26
# ⚔️ Amon's Death And Josiah's Rise
---
## ⚔️ The Servants Of Amon Conspired Against Him

These servants were likely officials or guards working inside the palace itself.

Conspired means they planned his death together in secret.

Two earlier kings of Judah, Joash and Amaziah, were also killed by their own servants.

Amon becomes the third king of Judah murdered by people meant to serve him.

⚔️ Servants planned his death in secret

🏛️ They likely worked inside the palace

👑 Two earlier kings died the same way

📖 Amon becomes the third king murdered

## 👥 The People Of The Land Made Josiah His Son King

The people of the land describes ordinary landowning citizens, not the royal court.

This same group first executes everyone who killed Amon.

They then step in and place his young son Josiah on the throne.

Ordinary citizens, not the conspirators, decide who rules next.

👥 Landowning citizens, not the royal court

⚖️ They executed Amon's killers first

👶 They placed young Josiah on the throne

📖 Citizens decided who ruled next

## 📖 The Rest Of The Acts Of Amon

Manasseh's record in verse seventeen also mentions his sin that he sinned.

Amon's record here leaves out that same phrase about his sin.

The missing phrase may simply reflect how short his two year reign was.

There was far less time for a lasting record to accumulate either way.

📖 Manasseh's record names his sin directly

🤔 Amon's record leaves that phrase out

⏳ His two year reign was very short

➡️ Less time meant less recorded to tell

## 🌳 Buried In His Sepulchre In The Garden Of Uzza

Amon is buried in the very same garden as his father Manasseh.

A sepulchre was a stone tomb, sometimes cut into rock.

Neither king rests among the normal royal tombs in the City of David.

Father and son end up sharing the very same private burial plot.

🌳 Buried in the same garden as Manasseh

⚰️ A sepulchre was a stone tomb

🏛️ Not buried among the royal tombs

📖 Father and son share the same plot

## 👑 Josiah His Son Reigned In His Stead

Josiah becomes king as a child after his father's violent death.

The very next chapter shows Josiah growing into one of Judah's most faithful kings.

The throne passes from a season of violence into what becomes real, lasting reform.

👑 Josiah becomes king as a child

📖 He grows into one of Judah's best kings

🔄 Worst kings are followed by a faithful one

➡️ The throne moves from violence to reform`.trim();

export const SECOND_KINGS_TWENTY_ONE_PERSONAL_SECTIONS = parseSecondKingsTwentyOneRawNotes(SECOND_KINGS_TWENTY_ONE_RAW_NOTES);
