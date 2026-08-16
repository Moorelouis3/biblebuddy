export type SecondChroniclesEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesEightRawNotes(rawText: string): SecondChroniclesEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 8:${startVerse}` : `2 Chronicles 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 8 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_EIGHT_RAW_NOTES = `# SecondChronicles 8:1-3
# 🏗️ Twenty Years Of Building And Conquest
---
## 🏗️ At The End Of Twenty Years

Twenty years sounds like a round number, but it is an exact total.

Solomon spent seven years building the temple of the LORD.

He spent another thirteen years building his own royal palace.

Seven plus thirteen adds up to the twenty years named here.

This chapter opens exactly where his two biggest projects finally end.

🏗️ The temple took seven years

🏰 The palace took another thirteen years

➕ Seven plus thirteen makes twenty

📖 Two huge projects end together

---

## 🎁 The Cities Which Huram Had Restored To Solomon

These cities were not new territory.

Solomon had earlier given Huram twenty cities in Galilee as payment.

Huram inspected them and was not pleased with what he received.

He called that land Cabul, a word tied to something worthless.

So Huram handed the cities back, and Solomon rebuilt them instead.

A rejected gift became new Israelite territory.

🎁 Solomon first gave these cities away

😒 Huram was not pleased with them

🏷️ He called the land Cabul

📖 A rejected gift became new territory

---

## 🏘️ Caused The Children Of Israel To Dwell There

Resettling a city meant more than repairing its walls.

Solomon moved actual Israelite families into these rebuilt towns.

Land that had briefly belonged to Tyre came back under Israelite control.

A city only counted as truly Israel's when Israelites lived inside it.

Ownership on paper became ownership in daily life.

🏘️ Israelite families moved into the cities

🔙 The land returned to Israelite control

📜 Ownership meant people living there

📖 Paper ownership became daily reality

---

## 🗺️ Solomon Went To Hamathzobah

Hamathzobah names a region far north of Israel's normal borders.

It sat near the kingdom of Aram, in what is now Syria.

A king traveling that far north was making a military statement.

This was expansion, not just border patrol.

Solomon's reach now stretched well past his father's kingdom.

🗺️ Hamathzobah sat far to the north

🏔️ It bordered ancient Aram and Syria

⚔️ This trip was a military campaign

📖 Solomon's reach outgrew his father's

---

## ⚔️ Prevailed Against It

Prevailed means Solomon won, not just visited.

This was an actual military victory, not a diplomatic trip.

Solomon rarely appears in Chronicles leading battles himself.

Solomon is remembered mostly for wisdom and building.

This verse shows he could also win a fight.

⚔️ Prevailed means an actual military win

🚶 This was not a diplomatic visit

👑 Solomon rarely leads battles in Chronicles

➡️ Here he wins one that mattered

# SecondChronicles 8:4-6
# 🏰 Building Across The Whole Kingdom
---
## 🏜️ Built Tadmor In The Wilderness

Tadmor was a fortified oasis city out in the open desert.

Centuries later, this same city would become famous as Palmyra.

An oasis controlled every caravan route crossing that stretch of desert.

Whoever held Tadmor controlled the trade passing through it.

Solomon was not just building homes here, he was building an economy.

🏜️ Tadmor was a desert oasis city

🏛️ Later known as Palmyra

🐫 It controlled desert caravan routes

📖 Solomon built trade, not just homes

---

## 📦 All The Store Cities Which He Built In Hamath

Store cities means warehouse towns, not homes for people to live in.

These cities held grain, oil, and supplies for the whole kingdom.

Hamath sat far north, near the border with Aram.

Spreading them out let Solomon supply distant regions quickly.

One storehouse was never enough for a kingdom this size.

📦 Store cities means warehouse towns

🌾 They held grain oil and supplies

🗺️ Hamath sat near the northern border

📖 One storehouse was never enough

---

## ⬆️ Bethhoron The Upper And Bethhoron The Nether

Bethhoron was actually two towns, an upper one and a lower one.

Upper and nether simply mean higher up the hill and lower down.

The two towns guarded a narrow pass connecting the coast to the hill country.

Armies had used this same pass for centuries.

Controlling both ends of the pass meant controlling who could travel through it.

⬆️ Upper and nether mean higher and lower

🛤️ The towns guarded a narrow mountain pass

⚔️ Armies fought over this pass for centuries

📖 Solomon controlled both ends of the road

---

## 🧱 Fenced Cities With Walls Gates And Bars

Fenced here means fortified, not surrounded by a garden fence.

These cities had thick walls built for real defense.

Bars were heavy beams that locked the gates shut from inside.

A fenced city could hold off an attack instead of falling right away.

Solomon fortified his kingdom's edges, not just its capital.

🧱 Fenced means fortified for defense

🚪 Gates could be sealed shut

🔒 Bars were heavy locking beams

📖 Solomon fortified more than the capital

---

## ⚔️ Chariot Cities And The Cities Of The Horsemen

These were military bases, not ordinary towns.

Chariot cities housed Solomon's war chariots and the crews who ran them.

Cities of the horsemen housed his cavalry in the same way.

First Kings records Solomon keeping thousands of horses and chariots this way.

A standing army needs permanent bases, and Solomon built them.

⚔️ These were military bases

🏹 Chariot cities housed war chariots

🐎 Horsemen cities housed the cavalry

📖 A standing army needs permanent bases

---

## 💭 All That Solomon Desired To Build

This is not a list of needs, it is a list of wants.

Desired describes ambition, not necessity.

His building reached from Jerusalem to Lebanon and across his whole kingdom.

Few kings before him had the resources to build purely on desire.

Solomon built at the scale of a man who could afford anything.

💭 Desired means wanted, not needed

🗺️ Building reached from Jerusalem to Lebanon

💰 Few kings could build on desire alone

📖 His wealth set the scale of building

# SecondChronicles 8:7-10
# 🛠️ Who Built And Who Ruled
---
## 🗺️ The Hittites And The Amorites And The Perizzites And The Hivites And The Jebusites

These five names list the Canaanite nations living in the land before Israel arrived.

Joshua's generation was commanded to remove these nations completely.

That command was never fully carried out.

Their descendants were still living in the land generations later, in Solomon's own time.

This verse quietly admits an old failure that never went away.

🗺️ Five nations lived in Canaan before Israel

📜 Israel was told to remove them fully

❌ That command was never fully obeyed

📖 Their descendants remained into Solomon's time

---

## 🍽️ Whom The Children Of Israel Consumed Not

Consumed here means destroyed completely, not eaten.

The conquest generation under Joshua left this job unfinished.

Judges chapter one already describes this same incomplete conquest.

Solomon's own Chronicle keeps that old, unfinished chapter of Israel's history in view.

🍽️ Consumed here means destroyed completely

⚠️ Joshua's generation left the job unfinished

📜 Judges one already tells this story

➡️ An old shortcut still shaped Solomon's day

---

## 💰 Did Solomon Make To Pay Tribute

Tribute meant these people worked for Solomon instead of only paying money.

First Kings calls this same arrangement forced labor.

They were not citizens of Israel, so different rules applied to them.

This system built Solomon's massive projects on non Israelite labor.

Every wall and store city so far had hands like these behind it.

💰 Tribute meant forced labor here

📜 First Kings calls it forced labor

🚫 They were not Israelite citizens

📖 Their labor built Solomon's projects

---

## ⚖️ Did Solomon Make No Servants For His Work

This line draws a sharp line between two classes of people.

Israelites were exempt from this same forced labor system.

That exemption would not last much longer than Solomon's own reign.

His son Rehoboam later tried to load labor onto Israel too.

The kingdom split apart over that exact decision.

⚖️ Two classes of people are named

✅ Israelites were exempt from forced labor

👑 Rehoboam later broke that exemption

➡️ The kingdom split over that choice

---

## 👑 Men Of War And Chief Of His Captains

Israelites filled the army instead of the labor crews.

They served as soldiers, officers, and commanders of chariots and horsemen.

This was considered honorable work, unlike forced construction labor.

Where a person served said something about their standing in the kingdom.

⚔️ Israelites served in the army instead

🎖️ They held officer and command roles

👑 This work carried honor, not shame

📖 Your role showed your standing

---

## 👥 Two Hundred And Fifty That Bare Rule Over The People

Bare rule means these men had real authority, not just titles.

Two hundred fifty officers is a large administrative structure for one kingdom.

Chronicles keeps close track of numbers like this one throughout Solomon's reign.

A kingdom this size ran on layers of officers most readers never picture.

👥 Two hundred fifty officers ruled

🏛️ Bare rule means real authority

🔢 Chronicles tracks numbers carefully throughout

📖 A big kingdom needs many officers

# SecondChronicles 8:11
# 👑 Pharaoh's Daughter Moves Out
---
## 👸 Brought Up The Daughter Of Pharaoh Out Of The City Of David

Solomon's wife here was an Egyptian princess, married for political alliance.

First Kings three already mentions this marriage early in his reign.

She had been living in the City of David, David's own older section of Jerusalem.

Solomon now moves her into a separate house built just for her.

A foreign wife did not stay mixed into Israel's most sacred ground.

👸 Pharaoh's daughter married Solomon for alliance

📜 First Kings already introduces this marriage

🏙️ She had lived in David's own city

📖 Solomon moved her to a new house

---

## 🗣️ My Wife Shall Not Dwell In The House Of David King Of Israel

Solomon explains his own reasoning in his own words here.

He is not rejecting his wife, he is protecting a sacred space.

The house of David carried weight beyond just being a royal home.

Solomon treats geography as something that can carry holiness.

🗣️ Solomon explains his own reasoning

❤️ This was not rejecting his wife

🏛️ David's house carried special weight

➡️ Geography itself could carry holiness

---

## ✨ Because The Places Are Holy

Holy means set apart, not ordinary space anyone could use.

A place could become holy simply by what had once been kept there.

Nothing physically changed about the buildings themselves.

Their history was what made them different.

What happened in a place could outlast the event itself.

✨ Holy means set apart from ordinary

🏠 Nothing physically changed about the buildings

📜 Their history made them different

📖 A place can outlast its own event

---

## 📦 Whereunto The Ark Of The LORD Hath Come

This names the ark of the covenant, Israel's most sacred object.

Second Samuel six describes David bringing the ark into Jerusalem years earlier.

The ark had briefly rested in the City of David before the temple was built.

Just passing through was enough to leave that ground marked as sacred.

The ark was gone from that spot by now, but its presence still mattered.

📦 This names the ark of the covenant

📜 David brought it to Jerusalem earlier

🏛️ It once rested in David's city

📖 Its presence had marked that ground

# SecondChronicles 8:12-13
# 🔥 A Fixed Schedule Of Worship
---
## 🚪 On The Altar Of The LORD Which He Had Built Before The Porch

The porch was the entrance area right in front of the temple building itself.

Solomon had built a specific altar there just for burnt offerings.

A burnt offering means an entire animal burned completely, given fully to God.

The largest and most costly kind of sacrifice happened right at the temple's front door.

🚪 The porch sat at the temple entrance

🔥 Solomon built a specific altar there

🐑 Burnt offerings meant a whole animal given

📖 The biggest sacrifices happened at the front

---

## 📅 After A Certain Rate Every Day

Certain rate means a fixed daily amount, not an occasional gift.

Worship here was not sporadic or based on Solomon's mood.

The temple ran on a set schedule every single day.

Daily worship became part of the temple's normal routine, not a special event.

📅 Certain rate means a fixed amount

🔁 This happened daily, not occasionally

⏰ The temple ran on a set schedule

➡️ Worship became routine, not rare

---

## 📜 According To The Commandment Of Moses

This points back to instructions God gave centuries earlier through Moses.

Numbers chapters twenty eight and twenty nine list this exact sacrifice calendar.

Solomon was not inventing a new system of worship.

The newest building in Israel still ran on the oldest instructions.

📜 This points back to Moses

🔢 Numbers lists this exact calendar

🏗️ Solomon invented nothing new here

📖 The newest building followed the oldest law

---

## 🗓️ On The Sabbaths And On The New Moons

The sabbath was a weekly day of rest, kept every seventh day.

A new moon marked the start of each new month on Israel's calendar.

Both days called for their own extra offerings beyond the daily ones.

Israel's whole calendar, week by week and month by month, pointed back to worship.

🗓️ Sabbath meant a weekly rest day

🌙 New moon marked each new month

➕ Both days added extra offerings

📖 The calendar itself pointed to worship

---

## 🧳 The Solemn Feasts Three Times In The Year

Three times a year, every Israelite man had to travel to Jerusalem.

These were the largest gatherings on Israel's entire religious calendar.

Missing one of these three feasts was not really an option.

Three times a year, the whole nation showed up in one place.

🧳 Men traveled to Jerusalem three times yearly

🎪 These were the year's largest gatherings

✅ Attendance was expected, not optional

📖 The whole nation gathered three times

---

## 🍞 The Feast Of Unleavened Bread And In The Feast Of Weeks And In The Feast Of Tabernacles

Each of these three feasts remembered a different part of Israel's story.

Unleavened bread remembered the rushed exodus out of Egypt.

Weeks celebrated the grain harvest, later called Pentecost.

Tabernacles remembered living in tents during the wilderness years.

Every year, Israel relived its whole story three separate times.

🍞 Unleavened bread recalled leaving Egypt

🌾 Weeks celebrated the grain harvest

⛺ Tabernacles recalled the wilderness years

📖 Israel relived its story every year

# SecondChronicles 8:14-16
# 🎺 Everyone In Their Place
---
## 🔄 The Courses Of The Priests To Their Service

Courses means rotating shifts, like teams taking turns on duty.

David had first organized these shifts many years earlier.

Splitting the work meant no single priestly family carried the whole burden.

A system built under David was still running smoothly under his son.

🔄 Courses means rotating shifts of duty

👑 David first set up this system

⚖️ No single family carried the whole load

📖 David's system still ran under Solomon

---

## 🎵 The Levites To Their Charges To Praise And Minister

Levites were not the same as priests, even though both served at the temple.

Priests offered the sacrifices themselves.

Levites handled music, praise, and supporting duties instead.

Two different jobs kept the temple running every single day.

🎵 Levites led praise and music

🙏 Priests handled the sacrifices themselves

🤝 Two roles, two different jobs

📖 Both were needed every day

---

## 🚪 The Porters Also By Their Courses At Every Gate

Porters means gatekeepers, guarding who could enter the temple.

Every gate had its own rotating shift assigned to it.

This kept the temple secure without wearing out any one guard.

Worship needed order at the front door just as much as at the altar.

🚪 Porters means temple gatekeepers

🔄 Every gate had its own shift

🛡️ This kept the temple secure

📖 Order mattered at the door too

---

## 🏆 David The Man Of God

This title is normally reserved for prophets like Moses and Elijah.

Calling David this way here is a very high honor.

It shows how much authority his instructions still carried after his death.

David's plans were treated as coming from God himself, not just a former king.

🏆 This title usually names prophets

👑 David receives a very high honor

📜 His plans carried lasting authority

📖 His instructions were treated as God's own

---

## ✅ They Departed Not From The Commandment Of The King

Nothing here was improvised or left to guesswork.

Priests, Levites, and porters followed David's original plan exactly.

Even decisions about the treasures followed the same fixed rules.

Precise obedience, not creativity, kept temple worship running smoothly.

✅ Nothing here was improvised

📋 Every group followed David's plan

💰 Even treasure decisions followed the rules

➡️ Precise obedience kept worship running

---

## 🏛️ So The House Of The LORD Was Perfected

Perfected means fully finished, with nothing left undone.

This closes out a building project that began several chapters earlier.

Every detail, from walls to worship schedules, was now complete.

The temple was not just built, it was finished down to the last detail.

🏛️ Perfected means fully finished

🏗️ This closes a multi chapter project

🔍 Every detail was now complete

📖 Finished down to the last detail

# SecondChronicles 8:17-18
# ⛵ A Fleet Bound For Ophir
---
## ⚓ To Eziongeber And To Eloth At The Sea Side In The Land Of Edom

These were port cities on the Red Sea, in territory controlled by Edom.

Modern maps would place them near the Gulf of Aqaba.

Sea access here opened trade routes Israel could not reach by land.

A kingdom built on hills and valleys now had a doorway to the sea.

⚓ These were Red Sea port cities

🗺️ They sat in Edomite territory

🌊 Sea access opened new trade routes

📖 A land kingdom gained a sea doorway

---

## 🌊 Sent Him By The Hands Of His Servants Ships And Servants That Had Knowledge Of The Sea

Israel did not have its own tradition of sailors or shipbuilders.

Huram's kingdom of Tyre was famous across the ancient world for seafaring.

Solomon needed Tyrian crews to actually sail the ships he now owned.

This partnership with Huram, first built over cedar and gold, now stretched out to sea.

⚓ Israel had no sailing tradition

🌊 Tyre was famous for seafaring skill

🤝 Solomon needed Huram's experienced crews

📖 Their partnership now reached the sea

---

## 🗺️ To Ophir

Ophir names a distant trading region, not a single well known city.

Scholars are not certain exactly where it was located.

Many think it sat somewhere in Arabia, East Africa, or even India.

Wherever it was, Ophir was famous across the ancient world for gold.

🗺️ Ophir was a distant trading region

❓ Its exact location is still debated

🥇 It was famous for gold

➡️ Its wealth was never in doubt

---

## ⚖️ Four Hundred And Fifty Talents Of Gold

A talent was a unit of weight, not a coin or a skill.

One talent likely weighed close to seventy five pounds.

Four hundred fifty talents would then total near seventeen tons of gold.

This was one of the largest gold shipments named in the Old Testament.

God had promised Solomon wealth beyond any king before him.

This shipment was that promise showing up in real life.

⚖️ A talent measured weight, not coins

🥇 One talent was near seventy five pounds

🚢 The shipment totaled near seventeen tons

📖 This fulfilled God's promise of wealth
`.trim();

export const SECOND_CHRONICLES_EIGHT_PERSONAL_SECTIONS = parseSecondChroniclesEightRawNotes(SECOND_CHRONICLES_EIGHT_RAW_NOTES);
