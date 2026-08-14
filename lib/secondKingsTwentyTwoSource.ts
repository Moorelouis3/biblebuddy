export type SecondKingsTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyTwoRawNotes(rawText: string): SecondKingsTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwentyTwo\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwentyTwo\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwentyTwo\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 22:${startVerse}` : `2 Kings 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 22 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_TWO_RAW_NOTES = `# SecondKingsTwentyTwo 22:1-2
# 👑 Josiah Begins To Reign
---
## 👶 Eight Years Old When He Began To Reign

Josiah became king of Judah at only eight years old.

He went on to reign thirty and one years, one of the longest reigns in Judah's history.

No king recorded so far in Kings started this young.

His father Amon died at twenty two, murdered by his own servants just one chapter earlier.

👶 Eight years old, the youngest king yet

📏 His reign lasted thirty and one years

⚔️ Amon his father died violently before this

📖 A child inherits a broken throne

## 💛 Jedidah, The Daughter Of Adaiah Of Boscath

Jedidah was the name of Josiah's mother.

The name means beloved or darling.

Boscath was a small town in the lowlands of Judah, far from the royal court.

Kings regularly names a ruler's mother, and this one comes from an ordinary place, not nobility.

💛 Jedidah means beloved or darling

🗺️ Boscath was a small lowland town

👑 She was not from noble birth

📖 God raises reform from ordinary roots

## ✅ Did That Which Was Right In The Sight Of The LORD

This phrase is the Bible's standard measuring stick for every king of Judah.

Only a handful of kings ever earn this exact description without qualification.

Josiah's father and grandfather both failed this same test badly.

The measuring stick has not changed, only the king standing under it.

📏 This is the Bible's standard for kings

✅ Very few kings earn it fully

😞 His father and grandfather both failed it

📖 Josiah stands where they collapsed

## 🚶 Walked In All The Way Of David His Father

David here does not mean Josiah's actual father, who was Amon.

Kings often calls any royal ancestor a father, especially the founding king David.

Walking in someone's way pictures living the same kind of life they lived.

Josiah reaches back past two failed generations to imitate David instead.

👑 David means the ancestor not Amon

🚶 Walking in a way means living like someone

⏭️ Josiah skips past two failed kings

📖 He imitates David instead of his own father

## 🛤️ Turned Not Aside To The Right Hand Or To The Left

This is an old picture for staying exactly on a marked path.

Turning aside meant drifting into disobedience, whether toward idolatry or compromise.

The phrase describes total, careful faithfulness, not occasional good behavior.

No other king of Judah gets this exact wording used about them so completely.

🛤️ The picture is staying on a marked path

↔️ Turning aside meant drifting into disobedience

✅ It describes total careful faithfulness

📖 No other king matches this description

# SecondKingsTwentyTwo 22:3-7
# 🔨 Repairing The Temple
---
## 🔢 The Eighteenth Year Of King Josiah

Josiah is twenty six years old when this chapter's main story begins.

Eighteen years have passed since the reign started back in verse one.

Second Chronicles records that Josiah began seeking God years earlier, in his teens.

This chapter shows the moment that private seeking becomes national action.

🔢 Eighteen years in, age twenty six

📜 Chronicles says the seeking began earlier

⚡ This chapter shows it becoming public action

📖 Private faith turns into national reform

## ✍️ Shaphan The Son Of Azaliah, The Son Of Meshullam, The Scribe

A scribe in this period was a trained royal secretary, not just a copyist.

Shaphan manages official correspondence and financial matters for the king personally.

Listing three generations of his family confirms him as a real, known official.

Shaphan's own sons and grandsons will remain trusted royal servants for generations.

✍️ A scribe was a royal secretary

💰 He handled official and financial matters

👪 Three generations confirm a real family

📖 His descendants stay trusted for generations

## 🛐 Hilkiah The High Priest

Hilkiah holds the highest religious office in Judah at this point.

The high priest oversees the temple, its priests, and its worship.

This is Hilkiah's first appearance in Kings, right as reform begins.

His discovery later in this chapter will change the whole nation's direction.

🛐 Hilkiah held Judah's highest religious office

🏛️ He oversaw the temple and its priests

🆕 This is his first appearance in Kings

📖 His find soon changes the nation

## 🧮 Sum The Silver Which Is Brought Into The House Of The LORD

Sum here means to count and total up an amount of money.

This silver came from ordinary worshippers giving offerings at the temple gate.

The keepers of the door were gatekeepers who collected gifts as people entered.

Years of neglected worship under Manasseh and Amon still left funds to redirect.

🧮 Sum means to count and total

🚪 Door keepers collected gifts from worshippers

💰 The silver came from ordinary people

📖 Even neglected years left funds to use

## 🕳️ To Repair The Breaches Of The House

A breach is a broken or damaged section of a building.

The temple had gone without proper maintenance for decades under Manasseh and Amon.

Josiah's father and grandfather filled the temple with idols instead of repairing it.

Josiah begins reform with the building itself before he confronts the idols inside it.

🕳️ A breach means a broken section

🏚️ Decades of neglect under two kings

😈 They filled it with idols instead

📖 Josiah starts with repair not confrontation yet

## 🪚 Carpenters, And Builders, And Masons

These three trades cover every skill needed to restore a stone building.

Carpenters worked wood, builders managed construction, and masons shaped stone.

Hewn stone means stone that has been cut and squared for building, not left rough.

This same three part list appears earlier when King Joash repaired this same temple.

🪚 Carpenters builders and masons cover every trade

🪨 Hewn stone means cut squared stone

🔁 The same list appears under King Joash

📖 A second king repeats the same repair

## 🧾 No Reckoning Made With Them... Because They Dealt Faithfully

A reckoning here means a formal audit or accounting of money spent.

Normally handling large amounts of silver required careful documentation and oversight.

These workers were trusted completely, so no such audit was required.

This exact same trust appears word for word in Joash's temple repair generations earlier.

🧾 Reckoning means a formal accounting

🤝 These workers were trusted completely

🔁 The same trust language appears under Joash

📖 Faithfulness made an audit unnecessary

# SecondKingsTwentyTwo 22:8-11
# 📜 The Lost Book Of The Law
---
## 📜 I Have Found The Book Of The Law In The House Of The LORD

The book of the law was likely part or all of the book of Deuteronomy.

Many scholars believe it was hidden away, or simply lost track of, during Manasseh's long reign of idol worship.

This was not a new scripture but Israel's own long neglected law being rediscovered.

An entire generation had grown up in Judah without ever hearing these words.

📜 The book was likely Deuteronomy

🙈 Lost track of during Manasseh's reign

🔁 Not new but rediscovered scripture

📖 A whole generation never heard it

## 📋 Thy Servants Have Gathered The Money That Was Found In The House

Shaphan's report opens with routine administrative details, not urgent news.

Servants here refers to the temple officials handling the repair funds, not household slaves.

The calm tone of this report makes the sudden shift to the book even sharper.

An ordinary funding update becomes the doorway to a national crisis.

📋 The report opens with routine details

👷 Servants means the temple officials

🔀 The tone shifts sharply right after

📖 An ordinary update leads to crisis

## 👀 Hilkiah Gave The Book To Shaphan, And He Read It

Shaphan reads the book himself first, before bringing it to the king.

Reading here likely means checking through it privately, confirming its contents.

As the king's scribe, verifying an important document before presenting it was normal practice.

This quiet first reading sets up the far more dramatic reading still to come.

👀 Shaphan reads it privately first

✍️ Verifying documents was normal scribal practice

⏭️ It sets up a more dramatic reading

📖 The full impact is still ahead

## 🗣️ Shaphan Read It Before The King

Shaphan first finishes his report about the temple silver and the workers.

Only after that business is done does he mention the book at all.

He then reads the law's actual words out loud, directly to Josiah.

This may be the first time in Josiah's life he hears this law spoken.

💰 He reports on the silver first

📜 The book comes up almost last

🗣️ Shaphan reads the words aloud

📖 Possibly Josiah's first time hearing it

## 👕 He Rent His Clothes

Tearing one's own clothing was a physical act of grief or deep distress.

Jacob did the same thing generations earlier believing Joseph was dead.

Josiah tears his clothes not from personal loss but from hearing his nation's guilt.

The king recognizes immediately how far Judah has drifted from these very words.

👕 Tearing clothes showed grief or distress

👴 Jacob did the same for Joseph

😢 Josiah grieves the nation's guilt not loss

📖 He recognizes how far Judah has drifted

# SecondKingsTwentyTwo 22:12-14
# 🔍 Seeking Huldah The Prophetess
---
## 👪 Ahikam The Son Of Shaphan

Ahikam is Shaphan the scribe's own son, sent on this same mission.

He later reappears years afterward, protecting the prophet Jeremiah from an angry mob.

His own son Gedaliah eventually becomes governor over Judah after Jerusalem falls.

This one family stays faithful across three generations during Judah's final decades.

👪 Ahikam is Shaphan's own son

🛡️ He later protects the prophet Jeremiah

👶 His son Gedaliah later governs Judah

📖 One family stays faithful three generations

## 🗣️ Enquire Of The LORD For Me, And For The People, And For All Judah

To enquire of the LORD means seeking a direct prophetic word, not simply praying quietly.

Josiah wants to know exactly how serious this newly found law's warnings really are.

He asks on behalf of himself, but also the entire nation under him.

A king's private conscience becomes a search for his whole people's fate.

🗣️ Enquire means seeking a direct prophetic word

❓ He wants to know the real danger

👥 He asks for himself and the nation

📖 A king's conscience becomes a national search

## 🔥 Great Is The Wrath Of The LORD That Is Kindled Against Us

Kindled compares God's wrath to a fire that has been lit and is spreading.

Josiah recognizes the danger the moment he hears the book's warnings.

This is not panic without cause, since the fire has already been building for generations.

He responds immediately instead of delaying or dismissing what he has heard.

🔥 Kindled compares wrath to a spreading fire

⚠️ Josiah recognizes real danger immediately

⏳ The danger built up over generations

📖 He responds fast instead of delaying

## 👂 Because Our Fathers Have Not Hearkened Unto The Words Of This Book

Hearkened is an old word that means to listen and then actually obey.

Fathers here points back to Manasseh and Amon, and generations before them.

Josiah does not excuse his ancestors or pretend the danger only recently began.

He names the real cause honestly instead of looking for someone else to blame.

👂 Hearkened means to listen and obey

👴 Fathers means Manasseh Amon and before

🙅 Josiah does not excuse his ancestors

📖 He names the real cause honestly

## 👩 Huldah The Prophetess

Huldah is one of only a handful of women in the Bible called a prophetess.

Both Jeremiah and Zephaniah are already active prophets at this very same time.

The king's officials go to Huldah anyway, without hesitation or explanation.

Her authority to speak for God is simply accepted, not defended or debated.

👩 One of only a few named prophetesses

📜 Jeremiah and Zephaniah were active too

🚶 The officials go to her directly

📖 Her authority is accepted without question

## 🏛️ She Dwelt In Jerusalem In The College

The college here does not mean a school in the modern sense.

It likely refers to a specific district or quarter within the city of Jerusalem.

Some scholars connect it to an area near the temple or the royal palace.

This small detail simply pins down exactly where the officials had to go.

🏫 College here is not a modern school

🗺️ It likely names a district of Jerusalem

🏛️ Possibly near the temple or palace

📖 It marks exactly where they traveled

# SecondKingsTwentyTwo 22:15-17
# ⚖️ Judgment Pronounced On Judah
---
## 👤 Tell The Man That Sent You To Me

Huldah refers to Josiah simply as the man, not as king.

This is not disrespect, since the officials clearly know who sent them.

In this moment, a prophet speaking for God outranks even the king himself.

God's word decides what happens next, regardless of royal title or authority.

👤 She calls Josiah simply the man

👑 It is not disrespect toward the king

📢 A prophet's word here outranks royalty

📖 God's word decides what happens next

## ⚠️ I Will Bring Evil Upon This Place

Evil here means disaster or judgment, not moral wickedness.

This same word describes famine, invasion, and national collapse elsewhere in Kings.

This place means Jerusalem and the whole surrounding land of Judah.

The warning matches the very curses written in the newly found book.

⚠️ Evil here means disaster not wickedness

🏙️ This place means Jerusalem and Judah

📜 It matches curses written in the book

📖 The warning is not a new threat

## ✅ All The Words Of The Book Which The King Of Judah Hath Read

Huldah confirms the book Josiah heard is genuinely God's own word.

This settles any doubt about whether the discovery was authentic.

The very warnings Josiah just heard are the ones about to come true.

A book that was lost for generations is confirmed as fully trustworthy.

✅ Huldah confirms the book is genuine

❓ It settles doubt about authenticity

🔮 Its warnings are about to happen

📖 A lost book proves fully trustworthy

## 🔥 They Have Forsaken Me, And Have Burned Incense Unto Other Gods

Burning incense was a normal part of worship in the ancient Near East.

Doing it for other gods misdirected worship that belonged to the LORD alone.

This same sin defined both Manasseh's and Amon's entire reigns before Josiah.

Forsaking God was not one incident but the nation's long standing pattern.

🔥 Burning incense was a normal worship act

🙏 Doing it for idols misdirected true worship

👴 This defined Manasseh and Amon's reigns

📖 Forsaking God was a long pattern

## 🔨 Provoke Me To Anger With All The Works Of Their Hands

The works of their hands means idols that people carved or cast themselves.

Calling them handmade work quietly mocks their claim to real divine power.

An idol has no power of its own beyond what human hands gave it.

Judah trusted objects they built over the God who built them.

🔨 Works of their hands means handmade idols

😏 The phrase quietly mocks their fake power

🙌 An idol has only the power given it

📖 Judah trusted their own creations over God

## 🔥 My Wrath Shall Be Kindled Against This Place, And Shall Not Be Quenched

Kindled and quenched are both fire words, one lit and one put out.

This wrath has already been kindled, matching Josiah's own words back in verse thirteen.

Not quenched means this coming judgment cannot be stopped or extinguished now.

The fire language makes the judgment feel immediate and impossible to escape.

🔥 Kindled and quenched are both fire words

🔁 It echoes Josiah's own words in verse 13

🚫 Not quenched means it cannot be stopped

📖 The judgment feels immediate and certain

# SecondKingsTwentyTwo 22:18-20
# 🕊️ Mercy Promised To Josiah
---
## 💧 Thine Heart Was Tender

A tender heart here means a heart that is soft, responsive, and easily moved.

This message is now addressed only to Josiah personally, not the whole nation.

Pharaoh's heart in Exodus is described the opposite way, hardened and unmoved.

Josiah's response to hard news is the exact opposite of a hardened heart.

💧 Tender means soft and easily moved

👑 This message is now for Josiah alone

🪨 Pharaoh's heart was the opposite hardened

📖 Josiah responds the opposite way

## 🙇 Thou Hast Humbled Thyself Before The LORD

To humble oneself means setting aside pride to admit real fault before God.

Second Chronicles records that Manasseh himself later humbled himself the same way.

That part of Manasseh's story does not appear back in this book of Kings.

Josiah does immediately what his own grandfather only did after great suffering.

🙇 Humbling means admitting real fault to God

📜 Chronicles records Manasseh later doing the same

❓ That story is missing from Kings

📖 Josiah humbles himself without needing to suffer first

## 🏚️ A Desolation And A Curse

Desolation means a land left empty and ruined, with no one living there.

Curse points back to specific warnings written in the law of Moses.

Deuteronomy lists these exact consequences for a nation that abandons God's covenant.

The threat Josiah heard was never a new idea, only a long ignored warning.

🏚️ Desolation means an empty ruined land

📜 Curse points back to Moses' law

⚠️ Deuteronomy names these exact consequences

📖 The warning was old not new

## 👂 I Also Have Heard Thee, Saith The LORD

This echoes back the same word used for Josiah hearing the book's words.

God directly answers Josiah's grief with His own personal attention.

Genuine humility before God receives a genuine, personal response here.

The king who listened is himself heard in return.

👂 It echoes the word for Josiah hearing

🗣️ God answers with personal attention

🤝 Genuine humility gets a genuine response

📖 The listener is himself heard

## 👴 I Will Gather Thee Unto Thy Fathers... In Peace

Gathered unto thy fathers is an old idiom for joining one's ancestors in death.

In peace means Josiah will not personally live to see Jerusalem's coming destruction.

This promise concerns the manner and timing of his death, not where he is buried.

Josiah later actually dies in battle, but still before the worst judgment arrives.

👴 Gathered to fathers means joining them in death

☮️ In peace means dying before the disaster

⏳ It concerns timing not burial location

📖 He dies before the worst judgment comes

## 🕊️ Thine Eyes Shall Not See All The Evil Which I Will Bring Upon This Place

This is the mercy at the center of Huldah's entire message.

Judah's judgment is delayed, not cancelled, because of Josiah's response.

Josiah will not personally witness Jerusalem's fall to Babylon decades later.

One king's humility buys his own generation time, not a final escape.

🕊️ This is the message's central mercy

⏳ Judgment is delayed not cancelled

🙈 Josiah will not see Jerusalem's fall

📖 One man's humility buys his generation time`.trim();

export const SECOND_KINGS_TWENTY_TWO_PERSONAL_SECTIONS = parseSecondKingsTwentyTwoRawNotes(SECOND_KINGS_TWENTY_TWO_RAW_NOTES);
