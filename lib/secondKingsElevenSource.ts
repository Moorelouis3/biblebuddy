export type SecondKingsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsElevenRawNotes(rawText: string): SecondKingsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsEleven\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsEleven\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsEleven\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 11:${startVerse}` : `2 Kings 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 11 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_ELEVEN_RAW_NOTES = `# SecondKingsEleven 11:1-3
# 😱 A Queen Seizes The Throne
---
## 👑 Athaliah The Mother Of Ahaziah

Athaliah was not born into Judah's royal family.

She was the daughter of Ahab and Jezebel, the wicked king and queen of Israel.

Judah's king Jehoram had married her years earlier to link the two kingdoms.

That marriage brought Baal worship straight into David's own royal house.

Her son Ahaziah has just been killed in the chapter before this one.

👑 Athaliah came from Israel's royal house

🐍 Her parents were Ahab and Jezebel

💍 A marriage joined Judah to that family

📖 Baal worship entered David's line through her

## 🌱 Destroyed All The Seed Royal

"Seed royal" means the royal children, the heirs who could take the throne.

Athaliah had just lost her own son Ahaziah to Jehu's purge in Israel.

She did not mourn him.

She moved instead to kill every remaining grandchild who might replace her.

She was willing to destroy her own family to keep the throne for herself.

🌱 Seed royal means the royal heirs

💔 Athaliah had just lost her son

⚔️ She turned on her own grandchildren

📖 She chose the throne over her family

## 👑 Jehosheba, The Daughter Of King Joram

Jehosheba was King Joram's daughter and Ahaziah's own sister.

That makes her the aunt of baby Joash, the child she is about to save.

Most royal women in this story help Athaliah destroy the family.

Jehosheba is the one relative who acts to protect it instead.

👑 Jehosheba was Joram's daughter

👶 She was Joash's own aunt

🛡️ She stood apart from the family's violence

📖 One relative chose to protect the line

## 😱 Stole Him From Among The King's Sons Which Were Slain

This phrase confirms that Athaliah's purge was already underway when Jehosheba acted.

Joash was one baby hidden among a group of royal children being killed.

Jehosheba had to physically take him out from that danger in secret.

There was no safe way to do this openly.

Every moment of the rescue risked both their lives.

😱 Royal children were already being killed

👶 Joash was pulled from that danger

🤫 The rescue had to happen in secret

📖 One life was saved from a massacre

## 🍼 Hid Him, Even Him And His Nurse, In The Bedchamber

A nurse in this culture was a woman who fed and raised a royal infant.

Hiding the nurse along with Joash kept him fed and cared for in secret.

A single missing baby was easier to hide than a baby with a household around him.

This small detail shows how carefully the rescue was planned.

🍼 A nurse fed and raised royal infants

🤫 She was hidden along with the baby

👶 This kept Joash cared for in secret

📖 The rescue was planned with real care

## 🏛️ With Her Hid In The House Of The LORD Six Years

The temple was the safest possible hiding place in the entire kingdom.

Athaliah had no reason to search the house of the LORD for a baby.

Six years is a long time to keep a secret this dangerous.

The future of David's entire line depended on that secret holding.

🏛️ The temple was the safest hiding place

🤫 Athaliah never thought to search it

⏳ The secret lasted six full years

📖 David's whole line depended on it holding

## 👑 Athaliah Did Reign Over The Land

Athaliah is the only woman to rule Judah in her own name.

She was not from David's family at all.

Her reign came from violence, not from God's promise to David.

The true heir was alive the whole time, hidden a few steps away in the temple.

👑 Athaliah ruled Judah in her own name

🚫 She had no claim through David's line

⚔️ Her throne was built on violence

📖 The real heir was hidden nearby

# SecondKingsEleven 11:4-8
# 🛡️ Jehoiada's Secret Plan
---
## 🙏 The Seventh Year Jehoiada Sent

Jehoiada was the high priest, the most powerful religious leader in Judah.

Joash had now spent six full years hidden and growing up inside the temple.

Jehoiada waited until the boy was old enough and the timing felt safe.

That waiting itself was an act of careful faith.

🙏 Jehoiada was the high priest

👦 Joash had grown up inside the temple

⏳ Jehoiada waited for the right moment

📖 Patience was part of the plan

## 🤝 Made A Covenant With Them, And Took An Oath

A covenant here was a solemn, binding agreement between Jehoiada and the guard captains.

An oath sealed that agreement with a spoken promise before God.

Breaking either one was considered a serious offense against God himself.

Jehoiada needed guaranteed loyalty before he revealed anything as dangerous as a hidden king.

🤝 A covenant was a binding agreement

🗣️ An oath sealed it with a promise

⚠️ Breaking it was an offense against God

📖 Jehoiada needed guaranteed loyalty first

## 👀 Shewed Them The King's Son

"Shewed" is an old spelling of showed.

This is the moment the secret finally becomes real to other people.

The captains now know the throne has a living, rightful heir.

From this point forward, there is no going back.

👀 Shewed is an old word for showed

👦 The captains finally see the true heir

🔒 The secret becomes real to others

➡️ There is no turning back now

## 🔄 A Third Part Of You That Enter In On The Sabbath

Temple guards normally worked in shifts that changed every week on the sabbath.

Jehoiada uses this normal, expected shift change to hide something unusual.

One third of the guards enter on the sabbath as they always do.

Nothing about the schedule looks suspicious from the outside.

🔄 Guards normally changed shifts on the sabbath

🤫 Jehoiada hides his plan inside that routine

😐 Nothing looks unusual from the outside

📖 A normal schedule covered a secret plan

## 🚪 The Gate Of Sur

The gate of Sur was one of the entrances near the king's house.

Its exact location is not fully certain today.

What matters is that Jehoiada names a specific, guarded entry point.

Every gate around the palace is being covered on purpose.

🚪 Sur was a named gate near the palace

❓ Its exact spot is not fully certain

🛡️ Jehoiada covered every entry point

📖 Nothing was left unguarded

## 🔄 Two Parts Of All You That Go Forth On The Sabbath

Normally two thirds of the guard would leave duty on the sabbath.

Jehoiada orders that group to stay on watch around the temple instead.

This doubles the number of armed men protecting Joash without anyone outside noticing.

The extra guards blend into what looks like a normal changeover.

🔄 Two thirds would normally go off duty

🛡️ Jehoiada kept them on watch instead

➕ This quietly doubled the protection

📖 The extra guard stayed hidden in plain sight

## ⭕ Compass The King Round About

"Compass" here means to surround completely on every side.

The guards form a full circle of protection around the boy king.

No single gap is left open for anyone to reach him.

This formation turns the temple courtyard into a wall of armed men.

⭕ Compass means to surround completely

🛡️ Guards fully encircled the young king

🚫 No gap was left open

📖 The courtyard became a wall of guards

## 📏 He That Cometh Within The Ranges, Let Him Be Slain

The "ranges" were the guarded lines set up around the king.

Anyone who crossed that line without permission would be killed on sight.

This was not a bluff.

It made the boundary around Joash absolute, with no room for error.

📏 Ranges were the guarded protective lines

⚔️ Crossing them meant death on sight

🚫 There was no room for error

📖 The boundary around Joash was absolute

# SecondKingsEleven 11:9-12
# 👑 Joash Is Crowned
---
## ✅ Did According To All Things That Jehoiada The Priest Commanded

Every captain obeyed Jehoiada's plan exactly, without changing anything.

This kind of secret plot could have failed at any single weak link.

Total obedience from every officer is what let it succeed.

One loose word would have gotten Joash killed along with everyone helping him.

✅ Every captain obeyed the plan exactly

⚠️ One weak link could have ended it

🤝 Total loyalty made the plot work

📖 Obedience protected the hidden king

## 🗡️ King David's Spears And Shields, That Were In The Temple Of The LORD

These weapons had belonged to King David himself, generations earlier.

They were kept in the temple as sacred trophies, not everyday equipment.

Handing them out ties this new young king directly to David's own legacy.

The message is clear even before Joash speaks a single word as king.

🗡️ These weapons once belonged to David

🏛️ They were kept as sacred temple relics

👑 Using them linked Joash to David

📖 The message came before any words

## 🛡️ From The Right Corner Of The Temple To The Left Corner Of The Temple

This describes armed guards stretched across the entire width of the temple.

Every possible approach to the king is covered by an armed man.

The picture is one of total, careful protection, not a loose crowd.

Nothing about this coronation was left to chance.

🛡️ Guards stretched across the whole temple

👀 Every approach was covered

🔒 The protection was total, not loose

📖 Nothing here was left to chance

## 👑 Put The Crown Upon Him

The crown was the visible sign that Joash was now Judah's rightful king.

For six years the crown had no one wearing it.

This is the moment the throne finally has its true heir again.

The visible symbol now matches the hidden truth.

👑 The crown marked him as king

⏳ The throne sat empty for six years

✨ The true heir finally wears it

📖 The symbol now matched the truth

## 📜 Gave Him The Testimony

The "testimony" was likely a written copy of God's law or covenant.

Handing Joash this scroll along with the crown reminded him who he answered to.

Israel's kings were required to keep a copy of the law near them always.

A king in Judah was never above God's own law.

📜 Testimony likely meant a copy of the law

👑 It arrived alongside the crown itself

⚖️ Kings were required to keep a copy near

📖 No king stood above God's own law

## 🫗 They Made Him King, And Anointed Him

Anointing meant pouring special oil on someone's head as a sign of God's choosing.

This ritual marked Joash as chosen by God, not just by the priests and captains.

Kings, priests, and prophets were all anointed for their roles in this way.

The oil was a visible seal on an invisible calling.

🫗 Anointing meant pouring oil on the head

✨ It marked God's own choosing

👑 Kings and priests were anointed this way

📖 The oil sealed an invisible calling

## 👏 They Clapped Their Hands, And Said, God Save The King

Clapping and shouting were the normal way a crowd publicly accepted a new king.

This was the ancient version of a coronation cheer.

"God save the king" was a set phrase used again later in Judah's history.

The noise itself announced to the whole city that Judah had a king again.

👏 Clapping was a public sign of acceptance

📢 It worked like an ancient coronation cheer

🗣️ God save the king was a set phrase

📖 The noise announced Judah had a king

# SecondKingsEleven 11:13-16
# 😱 Treason, Treason
---
## 😨 Athaliah Heard The Noise Of The Guard And Of The People

For six years Athaliah believed her purge had worked completely.

This sudden noise is the first sign that something has gone badly wrong for her.

She has no idea yet what is actually happening inside the temple.

Her whole reign is about to end within a matter of minutes.

😨 Athaliah thought her purge had worked

🔊 The noise signaled something was wrong

❓ She did not yet know the cause

📖 Her reign was about to end

## 🏛️ The King Stood By A Pillar, As The Manner Was

Judah's kings customarily stood at a specific pillar during official ceremonies.

This detail confirms Joash is standing exactly where a true king should stand.

Nothing about this coronation was improvised or hidden anymore.

It was carried out with all the normal, expected formality of a real king.

🏛️ Kings customarily stood at this pillar

👑 Joash stood exactly where a king should

✅ The ceremony followed normal formality

📖 This was a real coronation, not a trick

## 👑 The Princes And The Trumpeters By The King

Princes here means royal officials and nobles of the court.

Trumpeters were musicians whose horns announced major public events.

Both groups appear here to make the coronation fully official.

Judah's whole royal government is functioning again in a single moment.

👑 Princes were royal officials of the court

📯 Trumpeters announced major public events

✅ Both made the coronation fully official

📖 Judah's government was working again

## 🎉 All The People Of The Land Rejoiced, And Blew With Trumpets

This is the ordinary people of Judah, not just the royal court.

Their joy shows how much Athaliah's rule was resented, not accepted.

The trumpets and shouting made the coronation impossible to hide or reverse.

An entire city was celebrating at the exact moment Athaliah walked in.

🎉 Ordinary people celebrated openly

💔 Their joy showed how much they resented Athaliah

📯 Trumpets made the event impossible to hide

📖 A whole city celebrated as she arrived

## 👗 Athaliah Rent Her Clothes, And Cried, Treason, Treason

Tearing clothes was a normal way to show shock, grief, or outrage.

Athaliah is accusing everyone else of treason against her own stolen throne.

She is the one who seized power through murder six years earlier.

The real traitor is the one shouting the word loudest.

👗 Tearing clothes showed shock or outrage

😡 Athaliah accused others of treason

⚔️ She had seized the throne by murder

📖 The real traitor shouted the loudest

## 📏 Have Her Forth Without The Ranges

The "ranges" are the same guarded lines set up back in verse eight.

Jehoiada orders his men to remove Athaliah from that protected area first.

He is not letting the killing happen inside the temple itself.

Even in a moment of judgment, Jehoiada keeps the temple's holiness in mind.

📏 Ranges were the same guarded lines from before

🚶 Athaliah was removed from that area first

🏛️ The temple itself stayed untouched by violence

📖 Jehoiada honored the temple even now

## ⚖️ Let Her Not Be Slain In The House Of The LORD

Jehoiada gives one specific instruction about where Athaliah must not die.

Killing her inside the temple would have defiled the holy building with death.

Her judgment still needed to happen, just not on that ground.

Justice and reverence for God's house both mattered to Jehoiada at once.

🏛️ The temple could not be defiled by death

⚖️ Justice still needed to be carried out

🚪 It simply had to happen elsewhere

📖 Reverence and justice mattered together

## 🐴 The Way By The Which The Horses Came Into The King's House

This was likely a ramp or road built for horses and chariots, not people.

Athaliah is dragged out through an entrance meant for animals, not royalty.

She dies far from the palace hall where she once ruled.

Her end matches how she lived, seizing a place that was never truly hers.

🐴 This entrance was built for horses

👑 She was dragged out, not escorted

⚰️ She died away from the palace hall

📖 Her end matched how she had ruled

# SecondKingsEleven 11:17-18
# 🔥 Baal's House Torn Down
---
## 🤝 A Covenant Between The LORD And The King And The People

This covenant had two separate parts joined together in one moment.

The first bound the whole nation back to God as his people.

The second bound the king himself to rule under God's law.

A king in Judah was never meant to rule without limits.

🤝 The covenant had two connected parts

🙏 One bound the nation to God

👑 One bound the king to God's law

📖 No king ruled without real limits

## ⛈️ The House Of Baal, And Brake It Down

Athaliah, like her mother Jezebel before her, had built formal Baal worship in Judah.

With her dead, the people immediately tear that temple down.

In Israel, Jehu is destroying Baal worship at almost this exact same time.

Both kingdoms are being cleaned of the same foreign god in the same season.

⛈️ Athaliah had promoted Baal worship in Judah

🔨 The people tore that temple down

🔥 Jehu was doing the same in Israel

📖 Both kingdoms turned from Baal together

## 🗡️ Slew Mattan The Priest Of Baal Before The Altars

Mattan was the chief priest who had led Baal worship under Athaliah.

He is killed at the very altars where he once served Baal.

The place of his greatest power becomes the place of his death.

His death ends organized Baal worship in Judah for now.

🗡️ Mattan led Baal worship under Athaliah

⚰️ He died at his own altars

🔚 His death ended organized Baal worship

📖 The place of power became his end

## 🏛️ The Priest Appointed Officers Over The House Of The LORD

Jehoiada now turns from tearing down Baal worship to rebuilding proper worship.

He appoints new officers to run the temple the right way again.

Order is being restored, not just destroyed.

The temple can now function the way it was always meant to.

🏛️ Jehoiada rebuilt proper temple worship

👥 New officers were appointed to run it

🔧 He restored order, not just destruction

📖 The temple could function as intended

# SecondKingsEleven 11:19-21
# 👑 The City Grows Quiet
---
## ⛰️ Brought Down The King From The House Of The LORD

The temple in Jerusalem sat on higher ground than the king's palace.

"Brought down" describes an actual downhill walk, not just a figure of speech.

This procession moved Joash from the place he was hidden to the place he would rule.

The two buildings, temple and palace, now belong to the same rightful king.

⛰️ The temple sat on higher ground

🚶 Brought down described a real downhill walk

👑 Joash moved from hiding to ruling

📖 Temple and palace both answered to him now

## 👑 He Sat On The Throne Of The Kings

This throne belonged to David's family line by God's own promise.

For six years an outsider with no claim to it had been sitting there instead.

Now the rightful line is restored to the exact seat it was promised.

God's covenant with David survived through one hidden child.

👑 The throne belonged to David's line

🚫 An outsider had ruled it for years

✅ The rightful line was now restored

📖 God's promise survived through one child

## 🏙️ The City Was In Quiet

This does not mean nothing happened that day.

A queen had just been killed and a false temple torn down.

"Quiet" here means the fighting and danger were finally over.

Jerusalem could settle after years of living under a stolen throne.

🏙️ Quiet did not mean nothing happened

⚔️ A queen had died and a temple fell

✅ It meant the danger was finally over

📖 The city could settle after years of fear

## 👦 Seven Years Old Was Jehoash When He Began To Reign

Jehoash and Joash are two forms of the same king's name used in this book.

A seven year old cannot actually run a kingdom alone.

Jehoiada the priest almost certainly guided the real decisions for years afterward.

A hidden baby has now become Judah's king at last.

👦 Jehoash and Joash name the same king

🙏 Jehoiada likely guided him for years

👑 A seven year old now sat as king

📖 A hidden baby became Judah's true king
`.trim();

export const SECOND_KINGS_ELEVEN_PERSONAL_SECTIONS = parseSecondKingsElevenRawNotes(SECOND_KINGS_ELEVEN_RAW_NOTES);
