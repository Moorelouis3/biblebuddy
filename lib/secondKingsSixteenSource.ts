export type SecondKingsSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsSixteenRawNotes(rawText: string): SecondKingsSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsSixteen\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsSixteen\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsSixteen\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 16:${startVerse}` : `2 Kings 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 2 Kings 16 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_SIXTEEN_RAW_NOTES = `# SecondKingsSixteen 16:1-4
# 👑 Ahaz Begins To Reign In Judah
---
## 📅 In The Seventeenth Year Of Pekah The Son Of Remaliah

Kings in Israel and Judah get dated by each other's reigns.

This verse marks the start of Ahaz by counting years into Pekah's rule up north.

The two kingdoms had split apart generations earlier.

The writer still tracks both thrones on one shared timeline.

That habit keeps the whole history of God's people lined up together.

📅 Dates are counted by the other king's reign

👑 Judah and Israel are tracked side by side

🧭 The split kingdoms still share one timeline

📖 History here never loses track of both thrones

## 👴 Ahaz The Son Of Jotham King Of Judah Began To Reign

Ahaz was next in David's family line to rule Judah.

His father Jotham had generally followed the LORD as king.

Ahaz breaks that pattern almost immediately once he takes the throne.

A faithful father does not guarantee a faithful son.

👴 Ahaz follows his father Jotham on the throne

🙏 Jotham had generally followed the LORD

💔 Ahaz breaks that pattern right away

➡️ Faithful fathers do not guarantee faithful sons

## 📆 Twenty Years Old Was Ahaz When He Began To Reign, And Reigned Sixteen Years In Jerusalem

Ahaz was only twenty when he took the throne of Judah.

He ruled from Jerusalem for sixteen years total.

Sixteen years was enough time to shape the whole nation.

Ahaz used that time to lead Judah away from God instead of toward Him.

📆 Ahaz began his reign at twenty

🏙️ He ruled from Jerusalem sixteen years

⏳ Sixteen years shapes a whole nation

➡️ Ahaz led Judah away from God

## ⚖️ Did Not That Which Was Right In The Sight Of The LORD His God, Like David His Father

Every king of Judah gets measured against one standard, David.

David made real mistakes.

He still turned back to God after every failure.

Ahaz never gets that same defense anywhere in this chapter.

⚖️ David is the standard every king faces

🙏 David still turned back to God

🚫 Ahaz never gets that same defense

📖 Not every king fails the standard

## 🚶 He Walked In The Way Of The Kings Of Israel

Judah's kings usually get compared to David, the good standard.

Israel's kings usually serve as the warning example instead.

This phrase says Ahaz copied the northern kingdom's idol worship on purpose.

Israel was already the more unfaithful of the two kingdoms.

Ahaz chose to imitate the worse example instead of the better one.

🚶 Walked in the way means copied their worship

💔 Israel served as the warning, not the goal

🐂 Israel worshiped golden calves at Bethel and Dan

➡️ Ahaz copied the worse example on purpose

## 🔥 Made His Son To Pass Through The Fire

This phrase describes child sacrifice offered to the god Molech.

Ammonite worshipers believed burning a child in fire pleased their god.

The law of Moses forbids this practice by name.

A king from David's own family line commits one of the worst sins in the whole Bible.

🔥 This describes child sacrifice to Molech

🚫 The law of Moses forbids this practice

💔 Ahaz sacrificed his own son

📖 David's own line falls into its worst sin

## 🤢 According To The Abominations Of The Heathen

Abomination means a practice God finds deeply disgusting and forbidden.

Heathen here means the nations already living in Canaan.

God had already removed those nations for doing these same things.

Ahaz brings back the very practices that cost the land its first people.

🤢 Abomination means deeply disgusting to God

🌍 Heathen means the nations already in Canaan

🚫 God removed them for these same sins

➡️ Ahaz repeats the sin that cost the land

## 🌳 In The High Places, And On The Hills, And Under Every Green Tree

High places were local worship sites built on hills instead of the temple.

They were often leftover Canaanite shrines from before Israel arrived.

Every green tree points to fertility worship tied to the false god Baal.

Ahaz did not hide this worship.

He spread it across the whole land.

⛰️ High places means hilltop worship sites

🌲 Green trees point to Baal worship

🏛️ God wanted worship centered at the temple

📖 Ahaz spread false worship across Judah

# SecondKingsSixteen 16:5-9
# ⚔️ Rezin And Pekah Attack Jerusalem
---
## ⚔️ Came Up To Jerusalem To War

Two kings team up against Judah at the same time.

Syria was Judah's neighbor to the north.

Israel was the split off northern kingdom, also bordering Judah.

Both kings wanted Ahaz to join their alliance against Assyria.

This same crisis is the backdrop for Isaiah chapter seven.

⚔️ Two kings attack Judah together

🗺️ Syria and Israel both border Judah

🤝 Both wanted Ahaz to join their alliance

📖 Isaiah chapter seven covers this same crisis

## 🛡️ Besieged Ahaz, But Could Not Overcome Him

Besieged means the armies surrounded Jerusalem to cut off its supplies.

The city held even with two armies attacking together.

That survival did not come from Ahaz trusting God.

Isaiah had already told Ahaz not to fear these two kings.

🛡️ Besieged means surrounded to force surrender

🏙️ Jerusalem held against both armies

🙏 Isaiah told Ahaz not to fear them

📖 Ahaz still would not trust God's word

## 🌊 Recovered Elath To Syria, And Drave The Jews From Elath

Elath was a port city on the Red Sea, valuable for trade.

Judah had controlled that port before this war began.

Syria captured it during this same conflict.

The Jewish residents living there were driven out completely.

🌊 Elath was a valuable Red Sea port

🏴 Syria captured it from Judah

🚶 Jewish residents were driven out

📖 Judah loses real territory in this crisis

## 📜 Dwelt There Unto This Day

This phrase means the Syrians still held Elath when this book was written.

Elath never went back to Judah's control after this loss.

Phrases like this show the writer working from real memory, not guesswork.

The loss described here was still true long after Ahaz himself was gone.

📜 Unto this day means still true when written

🌊 Elath never returned to Judah's control

✍️ The writer draws on real memory

📖 This loss outlived Ahaz himself

## ✉️ Sent Messengers To Tiglathpileser King Of Assyria

Tiglathpileser ruled one of the strongest empires in the ancient world.

He is also called Pul in an earlier chapter of this book.

Assyria had already been pressuring smaller kingdoms like Judah and Israel for years.

Ahaz now asks that same feared empire to rescue him.

✉️ Tiglathpileser ruled a powerful empire

📛 He is also called Pul elsewhere

😨 Assyria already pressured smaller kingdoms

📖 Ahaz asks that empire to rescue him

## 🙇 I Am Thy Servant And Thy Son

Ahaz sends this message asking Assyria's king for rescue.

Calling himself servant and son means he is offering full submission.

That kind of language usually appears in treaties between a weaker king and a stronger one.

Ahaz chooses to serve a pagan empire instead of trusting the God of Judah.

🙇 Servant and son means submission

📜 This mirrors ancient treaty language

👑 Ahaz makes Judah subject to Assyria

📖 He trusts an empire instead of God

## 🏛️ The Silver And Gold That Was Found In The House Of The LORD

This treasure had built up in the temple across many generations.

Some of it came from gifts dedicated to God by earlier kings.

Ahaz takes this sacred wealth to pay for his own rescue.

What was set apart for God gets spent on a political deal instead.

🏛️ Temple wealth built up over generations

🎁 Some came from gifts dedicated to God

💰 Ahaz spends it on his own rescue

📖 Sacred wealth pays for a political deal

## 📦 Sent It For A Present

Present here is a polite word for tribute paid to a stronger power.

Ahaz is not giving a gift out of kindness.

He is buying protection with wealth that belonged to God.

Fear of two enemy kings leads straight to giving away sacred treasure.

📦 Present here really means tribute

💰 Ahaz buys protection with sacred wealth

😨 Fear drives this expensive decision

📖 Sacred wealth now buys safety

## 🗡️ The King Of Assyria Hearkened Unto Him

Hearkened means Assyria's king listened and agreed to act.

The plan works, at least on the surface.

Assyria attacks Damascus and defeats it just as Ahaz hoped.

The Syrian threat against Jerusalem finally ends.

🗡️ Hearkened means Assyria agreed to act

✅ The plan works on the surface

🏙️ Damascus falls to Assyria's army

📖 The Syrian threat against Judah ends

## ⛓️ Carried The People Of It Captive To Kir

Assyria's kings often moved conquered peoples far from their homeland.

Kir was a distant region under Assyrian control.

Breaking up a population made rebellion much harder to organize.

This same policy will strike Israel itself within a few more chapters.

⛓️ Assyria relocated conquered peoples

🗺️ Kir was a distant Assyrian region

🚫 Scattering people made rebellion harder

📖 Israel faces this same policy soon

# SecondKingsSixteen 16:10-14
# 🛐 The Altar Copied From Damascus
---
## 🏛️ Went To Damascus To Meet Tiglathpileser King Of Assyria

Ahaz travels north to personally thank the Assyrian king.

Vassal kings often had to appear before their new overlord in person.

This trip puts Ahaz face to face with Assyrian power and Assyrian worship.

That visit changes more than just foreign policy for Judah.

🏛️ Ahaz travels to thank the Assyrian king

👑 Vassal kings had to appear in person

🌍 The trip exposes Ahaz to Assyrian worship

📖 This visit changes more than policy

## 👀 Saw An Altar That Was At Damascus

In Damascus, Ahaz notices a striking altar design.

It was likely used in Syrian or Assyrian worship.

He does not just admire it.

He decides Judah needs one just like it.

A king who already gave away temple treasure now wants to copy foreign worship too.

👀 Ahaz notices a striking altar design

🌍 It was likely Syrian or Assyrian worship

😍 He wants Judah to copy it

📖 One compromise leads straight into another

## 📐 The Fashion Of The Altar, And The Pattern Of It

Fashion and pattern both mean detailed plans, like a blueprint.

Ahaz sends exact measurements and design details back to Jerusalem.

He wants an identical copy, not just something similar in spirit.

This is a deliberate royal order, not an accident.

📐 Fashion and pattern mean detailed blueprints

✉️ Ahaz sends the exact design home

🎯 He wants an identical copy built

📖 This was a deliberate royal order

## ⚒️ Urijah The Priest Built An Altar According To All That King Ahaz Had Sent

Urijah was the priest serving at the temple in Jerusalem.

His role was supposed to protect true worship, not import foreign designs.

He builds the altar exactly as ordered.

No objection from Urijah is recorded anywhere in this chapter.

⚒️ Urijah builds it exactly as ordered

🛡️ His role was to protect true worship

🤐 No objection from Urijah is recorded

📖 A guardian of worship becomes its copier

## 🔥 The King Approached To The Altar, And Offered Thereon

Offering sacrifices was supposed to be the priest's job, not the king's.

Ahaz personally performs the sacrifice himself.

King Uzziah was struck with disease for a similar overreach in an earlier chapter.

Ahaz steps into that same forbidden territory with no recorded consequence yet.

🔥 Sacrifice was the priest's job

👑 Ahaz personally performs the offering

⚠️ Uzziah was judged for a similar act

📖 Ahaz faces no recorded consequence yet

## 🍞 Burnt His Burnt Offering And His Meat Offering, And Poured His Drink Offering

This verse names several different kinds of sacrifice at once.

A burnt offering was completely burned up as a gift to God.

A meat offering was really a grain offering, not animal meat.

A drink offering meant wine poured out at the altar.

Ahaz performs all of these himself, a job that belonged only to priests.

🍞 A burnt offering was fully given to God

🌾 A meat offering was really made of grain

🍷 A drink offering meant wine poured out

📖 Ahaz performs a job meant only for priests

## 🏛️ Brought Also The Brasen Altar, Which Was Before The LORD

The brasen altar was the original bronze altar from the time of Moses.

It had stood at the center of temple worship for generations.

That altar was never meant to be replaced.

Ahaz does not destroy it.

He moves it aside instead.

🏛️ Brasen altar means the original bronze altar

📜 It came from the time of Moses

🕰️ It once stood at the center of worship

📖 Ahaz moves it aside instead of destroying it

## ➡️ Put It On The North Side Of The Altar

Ahaz relocates the true altar instead of removing it completely.

The north side was no longer the place of honor at the temple.

The true altar becomes a leftover next to the new copy Ahaz prefers.

A small move in location carries a much bigger meaning underneath it.

🧭 The true altar moves to the north side

📉 That spot lost its place of honor

😔 The true altar becomes an afterthought

📖 A small move can carry a big meaning

# SecondKingsSixteen 16:15-18
# 🔧 Ahaz Rearranges The House Of The LORD
---
## 🌅 Upon The Great Altar Burn The Morning Burnt Offering, And The Evening Meat Offering

Ahaz gives new instructions for how daily worship will run.

The new pagan style altar now handles every regular public sacrifice.

Morning and evening offerings had marked temple worship every single day for generations.

That daily rhythm now runs through an altar copied from a foreign king.

🌅 New orders reshape daily temple worship

🏛️ The new altar takes over public sacrifice

⏰ Morning and evening offerings marked every day

📖 A foreign design now shapes daily worship

## 🔮 The Brasen Altar Shall Be For Me To Enquire By

Enquire by points to seeking guidance, a practice tied to pagan divination.

Ahaz keeps the true altar, but only for his own private use.

The old altar of the LORD gets demoted to the king's personal purposes.

Worship that once belonged to the whole nation now serves one man.

🔮 Enquire by means seeking guidance or omens

👑 Ahaz keeps it for private use only

📉 The old altar gets demoted

📖 Worship now serves one man, not a nation

## 🤝 Thus Did Urijah The Priest, According To All That King Ahaz Commanded

This line repeats almost exactly what an earlier verse already said.

Repeating it confirms Urijah's full obedience covers this second order too.

A priest is meant to answer to God first, not just the throne.

Urijah's steady compliance is part of why this whole change succeeds.

🤝 The line repeats Urijah's earlier obedience

👑 He follows the king's orders again

⚖️ A priest should answer to God first

📖 Quiet compliance let this whole change happen

## 🚿 Cut Off The Borders Of The Bases, And Removed The Laver

Bases and lavers were bronze stands and basins used for washing at the temple.

Solomon had originally installed ten of these for priestly purification.

Ahaz strips their decorative bronze parts away.

That bronze likely went toward paying tribute to Assyria.

🚿 Lavers were bronze basins used for washing

🔟 Solomon had installed ten of them

🔨 Ahaz strips their bronze parts away

📖 Even washing tools get sold for tribute

## 🐂 Took Down The Sea From Off The Brasen Oxen

The sea was a massive bronze basin used by the priests.

It once rested on the backs of twelve bronze oxen statues.

Ahaz removes it from the oxen and sets it on plain stone instead.

One more piece of the temple's original design quietly disappears.

🌊 The sea was a giant bronze basin

🐂 Twelve bronze oxen once held it up

🪨 Ahaz moves it onto plain stone

📖 Another piece of the temple's design disappears

## 🛖 The Covert For The Sabbath That They Had Built In The House

The covert for the sabbath was a covered structure used for sabbath ceremonies.

It likely gave the king a sheltered place during weekly worship.

Ahaz removes or alters this structure along with his private entrance to the temple.

Even small architectural details do not escape this reshaping of the temple.

🛖 Covert means a covered structure for worship

👑 It served the king during sabbath worship

🔨 Ahaz removes or alters it

📖 Even small details do not escape this reshaping

## 😨 Turned He From The House Of The LORD For The King Of Assyria

This phrase states the reason behind all these changes plainly.

Ahaz reshapes the temple to please a foreign king.

Fear of Assyria drives decisions that once belonged to God alone.

God's house now answers to a foreign king's wishes instead of its own people.

😨 Fear of Assyria drives these changes

👑 Ahaz reshapes the temple to please him

💔 God's house now answers to a foreign king

📖 Fear can reshape what belongs to God

# SecondKingsSixteen 16:19-20
# 🌇 Ahaz Dies, Hezekiah Begins To Reign
---
## 📚 Written In The Book Of The Chronicles Of The Kings Of Judah

This is a repeated formula used to close out most kings' stories in this book.

It points to a royal record that has not survived to modern times.

The Bible itself chooses what to include, not the whole national archive.

Even a king this unfaithful gets summarized by that same standard formula.

📚 This formula closes most kings' stories

📜 It points to a record now lost

✂️ The Bible chooses what to include

📖 Even Ahaz gets the same formula

## 💤 Slept With His Fathers

Slept with his fathers is a gentle old way of saying someone died.

Kings in this book almost always get this exact phrase.

It treats death as a rest, not a total end.

Ahaz's story quietly closes with this same ordinary phrase.

💤 Slept with his fathers means he died

🔁 Kings in this book share this phrase

🕊️ Death gets described gently as rest

📖 Even Ahaz's story ends in ordinary words

## 🏙️ Buried With His Fathers In The City Of David

The city of David was the oldest part of Jerusalem.

It served as the burial ground for many of Judah's kings.

Ahaz was buried there despite his unfaithful reign.

A burial place does not measure the choices a king actually made.

🏙️ City of David held the royal tombs

👑 Ahaz was buried among Judah's kings

⚰️ Burial there did not depend on faithfulness

📖 A grave site cannot undo a life's choices

## 👶 Hezekiah His Son Reigned In His Stead

Hezekiah takes the throne right after one of Judah's worst kings.

Later chapters reveal Hezekiah as one of Judah's most faithful kings.

He removes the very high places and altars his own father built.

One unfaithful generation does not have to control the next one.

👶 Hezekiah succeeds his father Ahaz

🌟 Hezekiah becomes one of Judah's best kings

🔨 He removes what his father built

📖 One generation's failure does not decide the next
`.trim();

export const SECOND_KINGS_SIXTEEN_PERSONAL_SECTIONS = parseSecondKingsSixteenRawNotes(SECOND_KINGS_SIXTEEN_RAW_NOTES);
