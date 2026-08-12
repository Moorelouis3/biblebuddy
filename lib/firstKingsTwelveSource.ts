export type FirstKingsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTwelveRawNotes(rawText: string): FirstKingsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTwelve\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTwelve\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTwelve\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 12:${startVerse}` : `1 Kings 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Kings 12 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TWELVE_RAW_NOTES = `# FirstKingsTwelve 12:1-5
# 🏛️ Rehoboam Goes To Shechem
---
## 🗺️ Rehoboam Went To Shechem

Shechem was not the usual place to crown a king.

Jerusalem was David's city and Solomon's capital.

Shechem sat further north, deep in the other tribes' land.

Abraham and Jacob had both worshiped God there generations earlier.

The northern tribes picked this spot so they could set their own terms.

🗺️ Shechem sat north, not in Jerusalem

📜 Abraham and Jacob worshiped there before

👑 Rehoboam traveled to their territory

📖 The location signaled a demand for change

## 👷 Jeroboam The Son Of Nebat

Jeroboam was not a new name in this story.

He once ran forced labor crews for Solomon.

A prophet named Ahijah already told him he would rule ten tribes.

Solomon heard about that promise and tried to kill him.

Jeroboam had to run for his life to survive it.

👷 Jeroboam managed Solomon's labor crews

🔮 Ahijah promised him ten tribes

🏃 He fled to survive the threat

📖 That backstory sits in chapter eleven

## 🇪🇬 Who Was Yet In Egypt

Jeroboam had been hiding in Egypt this whole time.

Egypt's king Shishak had given him shelter there.

Solomon's death finally made it safe to come home.

His timing was not an accident.

He returned exactly when Israel's anger was ready to boil over.

🇪🇬 Jeroboam hid safely in Egypt

👑 Shishak sheltered him from Solomon

⚰️ Solomon's death opened the door home

📖 His return matched the nation's anger

## ⚖️ Thy Father Made Our Yoke Grievous

A yoke is the wooden bar placed across an animal's neck for pulling heavy loads.

Used for a king, it means the heavy taxes and forced labor Solomon demanded.

"Grievous" means painful and hard to bear.

Solomon's massive building projects took enormous manpower and money to complete.

The people are naming that exact burden to Solomon's own son.

⚖️ A yoke means a heavy burden

💰 It refers to taxes and forced labor

😣 Grievous means painful to bear

📖 They name Solomon's own burden to Rehoboam

## 🤝 We Will Serve Thee

The people are not refusing to serve a king at all.

They are offering a clear deal instead.

Lighten the burden and they promise loyalty in return.

This is a real negotiation, not a rebellion yet.

🤝 The people offer a real deal

🪶 Lighter service in exchange for loyalty

🚫 This is negotiation, not rebellion yet

➡️ Rehoboam's answer will decide what happens next

## 📆 Depart Yet For Three Days

Rehoboam does not answer right away.

He asks for three days to think it over.

That short delay gives him time to gather advice from two very different groups.

That pause decides everything in the verses ahead.

📆 Rehoboam asks for three days

🤔 He wants time to think

👥 The delay lets him gather advice

➡️ The next verses show what he decides

# FirstKingsTwelve 12:6-11
# ⚖️ Old Men Or Young Men
---
## 👴 Consulted With The Old Men

Rehoboam turns first to the men who had served Solomon for decades.

These elders had watched Solomon's whole reign up close.

Their long experience made them the wisest voices available to him.

👴 The old men served under Solomon

👀 They watched his whole reign

🧠 Experience made them wise counselors

➡️ Rehoboam starts by asking the right people

## 🤝 If Thou Wilt Be A Servant Unto This People

The old men give surprising advice for a king.

They tell Rehoboam to serve the people first.

A king who serves well earns lasting loyalty in return.

Leadership here works as a relationship, not just a command.

🤝 The elders urge Rehoboam to serve

👑 Serving the people was their advice

💛 Loyalty follows a leader who serves

📖 Leadership works both directions not one

## 👴 He Forsook The Counsel Of The Old Men

Rehoboam now has two very different plans in front of him.

He sets aside the wise, older voices completely.

That choice happens before he even hears the young men speak.

Pride is already steering this decision.

👴 Two plans now sit before him

🚮 He sets aside the wise counsel

🪞 Pride already steers this choice

📖 The costly decision starts right here

## 👦 Consulted With The Young Men

Rehoboam does not stop with the old men.

He also asks the young men who grew up alongside him.

These were friends his own age, not seasoned advisors.

Their outlook on power was about to be very different.

👦 Rehoboam also asks his peers

🎂 They were young men his own age

🎭 Their view on power differed sharply

➡️ Their answer steers the whole chapter

## 🧍 Which Stood Before Him

"Stood before him" is an old way of describing a king's inner circle.

These young men held no real power of their own.

Their closeness to Rehoboam mattered more than any wisdom they offered.

Being near power is not the same thing as giving good counsel.

🧍 Standing before him meant being an advisor

👦 These men had no independent power

🤝 Closeness to Rehoboam was their qualification

📖 Proximity is not the same as wisdom

## 👌 My Little Finger Shall Be Thicker Than My Father's Loins

This is a boast about raw physical power and strength.

The young men mean Rehoboam's smallest show of force will outweigh anything Solomon ever did.

"Loins" here refers to the whole strength of a man's body.

It is an arrogant, exaggerated claim with no real basis.

👌 Little finger means a small display

💪 Loins meant a man's full strength

😤 The claim is pure arrogance

📖 They promise more force, not more service

## 🦂 I Will Chastise You With Scorpions

Whips were painful but ordinary tools of punishment in this world.

"Scorpions" likely describes a whip fitted with sharp metal barbs.

The young men are promising far worse treatment than Solomon ever gave.

This threat is the exact opposite of the old men's advice.

🐍 Whips were the ordinary punishment

🦂 Scorpions meant a far crueler whip

📈 They promise to escalate the pain

➡️ This directly reverses the elders' advice

# FirstKingsTwelve 12:12-15
# 🔥 Rehoboam's Harsh Answer
---
## 📆 Came To Rehoboam The Third Day

The three day waiting period from verse five is now over.

Jeroboam returns exactly as Rehoboam had asked.

Everyone gathers expecting a real answer this time.

Nothing about this meeting is a surprise ambush.

📆 The three day wait ends here

👥 Jeroboam returns as promised

🎯 Everyone expects a real answer

➡️ The stage is set for Rehoboam's choice

## 😠 The King Answered The People

The Bible describes Rehoboam's tone here as harsh, with no gentleness at all.

Rehoboam chooses the young men's words over the old men's wisdom.

This is the exact moment the kingdom begins to split.

A single harsh answer becomes a national turning point.

😠 His tone was harsh, not gentle

👦 He follows the young men's advice

💔 This moment splits the kingdom

📖 One harsh answer changes a nation

## 🦂 My Father Also Chastised You With Whips

Rehoboam repeats the young men's exact scorpion threat word for word.

He is not softening it or adding his own judgment.

The king simply hands the people the harshest option available.

No attempt at compromise happens here at all.

🦂 Rehoboam repeats the scorpion threat exactly

🚫 He adds no softening of his own

👑 The king offers the harshest option

➡️ No compromise is even attempted

## ✝️ The Cause Was From The LORD

This is the most important line in the whole scene.

Rehoboam's foolish choice was not the only force at work.

God was fulfilling what He had already told Ahijah to say back in chapter eleven.

Human pride and God's plan move together here, not against each other.

The split was tragic, but it was not outside God's control.

✝️ God was working through this moment

🔮 This fulfills Ahijah's prophecy in chapter eleven

🤝 Human pride and God's plan overlap here

📖 God remained in control of the split

# FirstKingsTwelve 12:16-17
# 💔 Israel Rejects The House Of David
---
## ⛺ To Your Tents, O Israel

This phrase is an old battle cry meaning go home and abandon this king.

It had been shouted once before, during an earlier rebellion in David's own reign.

Using it again here signals a complete, formal break from the throne.

This is not a quiet grumble, it is a declared rebellion.

⛺ Tents meant go home now

📜 The phrase echoes an earlier rebellion

🚨 It signals a formal, public break

➡️ This is rebellion, not a quiet complaint

## 👨‍👦 What Portion Have We In David

The people ask a pointed question with an obvious answer, none.

"The son of Jesse" refers to David without honoring his name as king.

Ten tribes are walking away from the whole royal line at once.

Only two tribes remain loyal to Rehoboam after this.

❓ Their question already means no share

👎 Son of Jesse insults David on purpose

🔟 Ten tribes leave the royal line

📖 Only Judah stays loyal to Rehoboam

## 🏘️ The Children Of Israel Which Dwelt In The Cities Of Judah

Not every Israelite abandoned Rehoboam completely.

Some from the northern tribes lived inside Judah's own cities.

Those particular people stayed under Rehoboam's rule by simple geography.

The split was mostly tribal, but not a perfectly clean line.

🏘️ Some Israelites lived inside Judah's cities

📍 Geography kept them under Rehoboam

🧩 The split was not perfectly clean

➡️ Most of Israel still walked away

# FirstKingsTwelve 12:18-19
# ⚰️ Adoram Is Stoned
---
## 👷 King Rehoboam Sent Adoram

Adoram was the official in charge of Solomon's forced labor crews.

Sending him may have been an attempt to still collect tribute from the north.

It could also read as a threat.

It reminded the people of exactly what they were rejecting.

Either way, it was the worst possible person to send.

👷 Adoram ran the forced labor system

💰 Sending him may have demanded tribute

⚠️ He also symbolized the very burden

📖 It was the wrong man for the moment

## 🪨 All Israel Stoned Him With Stones

Stoning was a public form of execution carried out by a crowd together.

The people's anger lands on the one man standing for Solomon's old system.

Rehoboam sees exactly how far the rebellion has already gone.

He barely escapes with his own life right after this.

🪨 Stoning was a public group execution

😡 Anger targets the old system's symbol

🏃 Rehoboam barely escapes with his life

➡️ The rebellion is now fully violent

## 🐎 Made Speed To Get Him Up To His Chariot

Rehoboam does not walk away calmly.

He rushes to his chariot and flees straight to Jerusalem.

A king who came to Shechem to be crowned now leaves running for his life.

The irony of that reversal is hard to miss.

🐎 Rehoboam flees in his own chariot

🏃 He runs straight back to Jerusalem

🔄 A coronation trip ends in flight

📖 The reversal shows how badly this failed

## 📜 So Israel Rebelled Against The House Of David Unto This Day

This closing line was written from a later point in Israel's history.

"Unto this day" tells the reader the split was still permanent when this was recorded.

What began as one bad decision became a lasting, generations long division.

The united kingdom of David and Solomon never comes back together in the Old Testament.

📜 Unto this day means still true later

⏳ The split became permanent, not temporary

💔 One decision caused generations of division

📖 The united kingdom never fully returns

# FirstKingsTwelve 12:20-24
# 👑 Jeroboam Is Crowned, War Is Stopped
---
## 👑 Made Him King Over All Israel

News of Jeroboam's return spreads fast through the northern tribes.

The assembly that gathered to negotiate with Rehoboam now crowns Jeroboam instead.

This fulfills the exact promise Ahijah gave him back in chapter eleven.

Only one tribe stays outside this new arrangement.

👑 The assembly crowns Jeroboam king

📖 This fulfills Ahijah's earlier prophecy

🏃 News of his return spread fast

➡️ Only Judah remains outside this new kingdom

## 🔢 An Hundred And Fourscore Thousand Chosen Men

"Fourscore" is an old way of saying eighty.

So this number totals one hundred eighty thousand trained soldiers.

Rehoboam gathers a massive army to force the north back under his rule.

Civil war between the tribes looks unavoidable at this exact moment.

🔢 Fourscore is an old word for eighty

🧮 The total reaches one hundred eighty thousand

⚔️ Rehoboam prepares for full scale war

📖 Civil war looks unavoidable right now

## 📢 The Word Of God Came Unto Shemaiah

Shemaiah is a prophet the reader has not met before this verse.

God sends him with an urgent message before the armies can clash.

This is the second time in this chapter a prophet's earlier word directly shapes events.

God is still speaking into this crisis, even after Rehoboam's failure.

📢 Shemaiah is a new prophet here

⏱️ His message arrives before battle starts

🔁 A second prophecy shapes this chapter

📖 God still speaks into the crisis

## 🚫 Ye Shall Not Go Up, Nor Fight Against Your Brethren

God directly forbids the civil war Rehoboam was preparing.

"Your brethren" reminds both sides that Israel and Judah share one family.

The split itself was allowed to happen, but a war over it was not.

God draws a clear line even in the middle of judgment.

🚫 God forbids the coming civil war

👨‍👩‍👧‍👦 Brethren reminds both sides they are family

⚖️ The split stands, but war does not

📖 God limits judgment even here

## ✅ They Hearkened Therefore To The Word Of The LORD

Rehoboam's army actually obeys this command and stands down.

That is a rare moment of real restraint from him in this chapter.

A war that could have been bloody and long never happens.

One prophet's message accomplishes what neither king's pride could manage alone.

✅ Rehoboam's army obeys and stands down

🕊️ A major war is avoided here

🙌 This is a rare moment of restraint

➡️ One message prevented a bloody war

# FirstKingsTwelve 12:25-27
# 😨 Jeroboam's Fear
---
## 🏗️ Built Shechem In Mount Ephraim

Jeroboam fortifies a city right after becoming king.

Shechem becomes a base inside his new northern territory.

He also builds up Penuel, east of the Jordan River, guarding that side of his kingdom.

A brand new king needs strong, defended cities right away.

🏗️ Jeroboam fortifies key cities

📍 Shechem anchors his home territory

🌊 Penuel guards the land past the Jordan

➡️ A new kingdom needed real defenses

## 💭 Jeroboam Said In His Heart

"Said in his heart" means he thought this privately, not out loud.

The reader gets to see Jeroboam's private fear, not just his public actions.

He worries that his brand new kingdom could slip away from him.

This inner doubt drives everything he does in the next verses.

💭 In his heart means a private thought

😰 Jeroboam fears losing his new kingdom

🔍 The reader sees his hidden motive

➡️ That fear drives his next decision

## 🕍 If This People Go Up To Do Sacrifice In The House Of The LORD

The temple in Jerusalem was still the one place God commanded sacrifice.

Jeroboam worries that regular trips there will slowly rebuild loyalty to Rehoboam.

Worship, not weapons, is what he sees as the real threat to his throne.

His solution to that fear comes in the very next verse.

🕍 The temple stood only in Jerusalem

🛤️ Regular trips there worried Jeroboam

👑 He feared worship would rebuild loyalty

📖 His fix comes in the next verse

## ⚔️ They Shall Kill Me

Jeroboam's fear escalates all the way to imagining his own murder.

He believes losing the people's loyalty could cost him his life, not just his throne.

That fear, not careful faith, is what shapes his next decision.

A frightened king often makes worse choices than a patient one.

⚔️ Jeroboam fears being killed

👑 He fears losing more than the throne

😨 Fear, not faith, drives his choice

➡️ Frightened leaders often choose poorly

# FirstKingsTwelve 12:28-30
# 🐄 The Golden Calves
---
## 🐄 Made Two Calves Of Gold

Jeroboam builds two golden calf idols to solve his fear from the last section.

This deliberately copies the sin Israel committed at Mount Sinai long before this.

A brand new king repeats one of the nation's oldest failures in his very first act.

The calves were meant to keep people from traveling south to worship.

🐄 Jeroboam builds two golden calves

🔁 This repeats the old Sinai sin

👑 It comes from his very first decision

📖 The goal was to stop southern travel

## 🗣️ Behold Thy Gods, O Israel, Which Brought Thee Up

Jeroboam echoes the exact words spoken at Sinai almost word for word.

He credits these new idols with the exodus out of Egypt itself.

That claim rewrites Israel's own history to serve his political needs.

Real worship of the true God gets replaced with a convenient lie.

🗣️ Jeroboam echoes the words from Sinai

🐄 He credits idols for the exodus

📚 That rewrites Israel's real history

📖 Convenience replaces true worship here

## 📍 The One In Bethel, And The Other Put He In Dan

Bethel sat near Jeroboam's southern border, close to Judah.

Dan sat far north, near the kingdom's opposite edge.

Placing one calf at each end let every Israelite reach one without traveling far.

Convenience shaped the whole design behind this new religious system.

📍 Bethel guarded the southern border

🧭 Dan marked the far northern edge

🚶 Every Israelite could reach one easily

➡️ Convenience shaped the whole design

## ⚠️ This Thing Became A Sin

The text names this decision plainly, a sin, not just a political misstep.

People genuinely traveled to worship the calf set up at Dan.

What began as Jeroboam's fear over losing power became the nation's spiritual downfall.

This single choice gets blamed for Israel's idolatry for generations afterward.

⚠️ The text calls this a sin

🚶 People actually worshiped at Dan

📉 Fear over power became national idolatry

📖 This choice haunts Israel for generations

# FirstKingsTwelve 12:31-33
# 🔥 A Counterfeit Priesthood And Feast
---
## 🏛️ Made An House Of High Places

"High places" were local worship sites, often on hills, outside the one temple God authorized.

Jeroboam builds an official structure just for this outside worship.

This adds a second layer of disobedience on top of the golden calves.

Worship is now not just misdirected, it is organized and permanent.

🏛️ High places meant unauthorized worship sites

🐄 This adds to the calf idolatry

🏗️ Jeroboam makes it official and organized

📖 Disobedience becomes a lasting system

## 👥 Priests Of The Lowest Of The People, Which Were Not Of The Sons Of Levi

God had set apart the tribe of Levi alone for the priesthood.

Jeroboam ignores that requirement completely and appoints whoever he wants.

"Lowest of the people" suggests he did not even choose respected men for the role.

Breaking God's structure for worship matched breaking God's structure for the kingdom.

👥 Only Levites were meant to be priests

🚫 Jeroboam ignored that requirement entirely

📉 He appointed unqualified, low status men

➡️ Broken worship matched his broken kingdom

## 📅 Ordained A Feast In The Eighth Month

God's true feast of Tabernacles fell in the seventh month back in Judah.

Jeroboam shifts his version one month later, into the eighth month instead.

The phrase "devised of his own heart" makes clear this date came from Jeroboam, not God.

A counterfeit calendar, a counterfeit priesthood, and a counterfeit god now all work together.

📅 The real feast fell in month seven

🔀 Jeroboam moved his version to month eight

💭 Devised of his own heart means self invented

📖 A full counterfeit system is now complete
`.trim();

export const FIRST_KINGS_TWELVE_PERSONAL_SECTIONS = parseFirstKingsTwelveRawNotes(FIRST_KINGS_TWELVE_RAW_NOTES);
