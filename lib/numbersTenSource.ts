export type NumbersTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTenRawNotes(rawText: string): NumbersTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 10:${startVerse}` : `Numbers 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Numbers 10 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TEN_RAW_NOTES = `# Numbers 10:1-4
# 🎺 Two Trumpets Of Silver
---
## 🔨 Two Trumpets Of Silver

"Trumpets" here means straight metal horns.

That differs from the curved shofar used elsewhere in the Law.

These horns were made of silver, a valuable metal.

Silver marked them as something set apart from ordinary camp noise.

One instrument was about to carry two very different messages.

🔨 Trumpets means straight metal horns
🎵 Different from the curved shofar
💰 Silver marked them as valuable
📖 One instrument, two coming signals
---
## ⚒️ Of A Whole Piece Shalt Thou Make Them

"Whole piece" means hammered from a single block of silver.

Nothing was welded together out of separate parts.

The golden lampstand and the cherubim on the mercy seat were built the same way.

That method left no seams to break under regular wear.

These trumpets were built to last, not made quickly.

⚒️ Whole piece means one solid block
🕯️ Same method built the lampstand
🔩 No seams left to break
📖 Built to last, not rushed
---
## 📯 For The Calling Of The Assembly And For The Journeying Of The Camps

One trumpet system had two separate jobs from the start.

"Calling the assembly" meant gathering everyone together in one place.

"Journeying of the camps" meant signaling the whole nation to start moving.

The same instrument could mean stay or go.

It just depended on how it was blown.

The rest of the chapter explains exactly how that worked.

📯 One trumpet, two separate jobs
🧍 Calling means gathering everyone together
🚶 Journeying means signaling the camp to move
➡️ The rest of the chapter explains how
---
## 🚪 All The Assembly Shall Assemble Themselves At The Door Of The Tabernacle

Blowing both trumpets together called the whole nation, not just leaders.

The meeting point was never random.

It was always the entrance of the tabernacle, God's own tent.

Every full gathering pointed the people back toward God's dwelling place.

The location mattered as much as the sound itself.

🚪 Both trumpets called the whole nation
⛺ The meeting point was the tabernacle door
👣 Location mattered as much as sound
📖 Gatherings pointed back to God's presence
---
## 🙋 Then The Princes Shall Gather Themselves Unto Thee

A single trumpet was a smaller, quieter signal.

It called only the princes, the twelve tribal leaders named back in Numbers one.

The whole camp did not need to stop for a leaders only meeting.

One sound gathered a nation, and a different use of that same sound gathered twelve men.

🙋 One trumpet called only the leaders
👥 These were the twelve tribal heads
🤏 A smaller signal for a smaller meeting
➡️ Not every gathering needed the whole camp
---

# Numbers 10:5-8
# 📯 Alarm Or Assembly
---
## 🚨 When Ye Blow An Alarm

"Alarm" describes a pattern of short, sharp blasts, not one long steady tone.

That sound is called a teruah in Hebrew.

A plain blow meant gather.

A sharp alarm meant something else entirely, and the verses ahead spell out what.

🚨 Alarm means short, sharp blasts
🎶 Hebrew calls this sound a teruah
🧍 A plain blow simply meant gather
📖 Two sounds, two very different meanings
---
## 🧭 Then The Camps That Lie On The East Parts Shall Go Forward

The first alarm signaled Judah's division to start marching.

Judah camped on the east side, closest to the tabernacle entrance, back in Numbers two.

That fixed camp position now became a fixed marching order.

The layout drawn up earlier in the book was finally put into motion.

🧭 First alarm cued Judah's division
📍 Judah camped closest to the entrance
🔁 Camp position became marching order
📖 An earlier plan now put into motion
---
## 🔁 When Ye Blow An Alarm The Second Time

A second alarm cued Reuben's division, camped on the south side.

That camp position was also set back in Numbers two.

Only two directions get named by name in this chapter.

A third and fourth alarm for the west and north sides is implied by the pattern.

🔁 Second alarm cued Reuben's division
🧭 Reuben camped on the south side
🧩 Only two directions are named directly
➡️ A full pattern is still implied
---
## 🙅 Ye Shall Blow, But Ye Shall Not Sound An Alarm

Calling people to a meeting used the plain blow from verse three.

Moving the whole camp used the sharp alarm pattern instead.

Mixing up the two signals risked real danger.

A camp that thought it was only gathering could panic if it heard the wrong sound.

🙅 Gathering used the plain blow only
🚫 Moving used the alarm pattern only
😨 Confusing the two risked real panic
📖 Clear signals kept the whole camp safe
---
## ✋ The Sons Of Aaron, The Priests, Shall Blow With The Trumpets

Sounding these trumpets was never open to just anyone.

Only Aaron's priestly sons were allowed to blow them.

Not a regular Levite, and not an ordinary Israelite.

Every command that moved the entire nation had to pass through authorized, priestly hands.

✋ Only Aaron's sons could blow them
🚫 Not open to any other Levite
👑 National movement tied to priestly authority
📖 Even a signal needed proper hands
---
## ♾️ An Ordinance For Ever Throughout Your Generations

"For ever" means this was never meant as a wilderness only rule.

The trumpet system was built to outlast the tent and the desert years.

Later generations kept using priestly trumpets even after Israel had a fixed temple.

A traveling instruction became a permanent institution.

♾️ Not just a wilderness only rule
🏛️ Later used at the fixed temple too
📆 Meant to outlast the desert years
📖 A traveling rule became a lasting one
---

# Numbers 10:9-10
# ⚔️ War And Worship
---
## ⚔️ If Ye Go To War In Your Land Against The Enemy That Oppresseth You

This law covers defending against an attacker, not launching a conquest.

The wording is specific about who moves first.

Israel is pictured here as the one being oppressed, not the one starting a fight.

The trumpet's battlefield use was tied to being attacked, not attacking.

⚔️ This covers defense, not conquest
🛡️ Israel is the one being oppressed
🎯 The trigger is being attacked first
📖 A defensive law, stated plainly
---
## 🙏 Ye Shall Be Remembered Before The LORD Your God, And Ye Shall Be Saved

The trumpet blast was not a battle tactic meant to scare an enemy.

It worked almost like a prayer made loud enough for the whole camp to hear.

Sounding it called on God's own covenant promise to fight for Israel.

Victory was credited to God remembering His people, not to Israel's own strength.

🙏 Less a tactic, more an audible prayer
🤝 It called on God's covenant promise
💪 Victory was never Israel's own strength
📖 God's remembering was the real defense
---
## 🎉 In The Day Of Your Gladness, And In Your Solemn Days, And In The Beginnings Of Your Months

Trumpets were not only sounded in danger.

They also marked joyful, peaceful days, including Israel's festivals.

"The beginnings of your months" means the new moon that opened each Hebrew month.

That new moon celebration was called rosh chodesh, and it happened every single month.

🎉 Also sounded on festival days
🌙 New moon marked each month's start
📅 That celebration was called rosh chodesh
📖 One instrument served danger and joy
---
## 🔥 Ye Shall Blow With The Trumpets Over Your Burnt Offerings

Sacrifices were already commanded back in Leviticus one.

The trumpet sound was added on top of that quiet ritual act.

That turned a private offering into something the whole camp could hear happening.

Worship was made loud on purpose, not kept silent.

🔥 Paired with sacrifices from Leviticus
📢 Turned a quiet ritual into a public one
👂 The whole camp could hear it
📖 Worship made loud on purpose
---
## 📝 For A Memorial Before Your God: I Am The LORD Your God

"Memorial" means something placed on purpose as a reminder in front of God.

The twelve stones on the priest's breastplate in Exodus worked the same way.

There, a physical object served as the reminder.

Here, a sound served the very same purpose.

📝 Memorial means a reminder placed on purpose
💎 The breastplate stones worked the same way
🔊 Here a sound served that role
📖 God gave His people a way to remember
---

# Numbers 10:11-13
# ☁️ The Cloud Lifts
---
## 📅 The Twentieth Day Of The Second Month, In The Second Year

This date lands about eleven months after Israel left Egypt in Exodus twelve.

It also falls about two months after the tabernacle was finished in Exodus forty.

Israel had spent nearly a full year camped in one place at Sinai.

That whole year was spent receiving law after law.

📅 About eleven months after leaving Egypt
⛺ About two months after the tabernacle's finish
📆 Nearly a full year camped at Sinai
📖 A long season of receiving God's law
---
## 🌥️ The Cloud Was Taken Up From Off The Tabernacle

This is the exact signal described back in Numbers nine.

The cloud lifting meant it was finally time to move.

The whole trumpet system from earlier in this chapter now had a real use.

A plan explained in theory was about to become an actual march.

🌥️ Matches the signal from Numbers nine
🚶 Lifting meant it was time to move
📯 The trumpet system now had a real use
➡️ Theory finally became an actual march
---
## 🏜️ The Wilderness Of Paran

Paran was a desert region north of Sinai, on the route toward Canaan.

It became Israel's base for a long stretch of the wilderness years.

The twelve spies are later sent out from this very place in Numbers thirteen.

Paran was not a random stop.

🏜️ A desert region between Sinai and Canaan
🔍 Later the base the twelve spies left from
🗺️ Israel's next home for a long stretch
📖 Not a random stop on the map
---
## ✋ According To The Commandment Of The LORD By The Hand Of Moses

The cloud gave the visible signal to move.

The text still credits God's command and Moses' leadership together.

That is the same partnership pattern already set up at the end of Numbers nine.

Divine guidance still worked through a human leader.

✋ Credits God's command and Moses together
🔁 Same pairing set up in Numbers nine
🤝 Divine guidance still used human leadership
📖 God led, and a man still led
---

# Numbers 10:14-17
# 🚩 Judah Leads The Way
---
## 🥇 In The First Place Went The Standard Of The Camp Of The Children Of Judah

This matches the exact marching order God laid out back in Numbers two.

Judah's division marched first, the same way it camped closest to the tabernacle's entrance.

Camp position and marching position were never two separate plans.

They were the same plan, just seen from two different moments.

🥇 Matches the order from Numbers two
🧭 Judah camped nearest the entrance, east
🔁 Camp position became marching position
📖 One plan, seen at two moments
---
## 👑 Over His Host Was Nahshon The Son Of Amminadab

Nahshon was already named as a leader back in Numbers one.

His family line runs down through history to King David.

That same line eventually reaches Jesus, named directly in Matthew one.

The man leading Israel's very first steps out of Sinai was also a future king's ancestor.

👑 Already named as a leader in Numbers one
🌳 His family line runs to King David
✝️ That line later reaches Jesus in Matthew one
📖 A future king's ancestor led the first steps
---
## 🏗️ The Tabernacle Was Taken Down

Before anyone could march, the entire sanctuary had to be fully disassembled.

Boards, curtains, and coverings all came apart first.

The exact procedure for this had already been laid out in Numbers four.

One short verse hides a massive amount of hidden labor.

🏗️ Fully disassembled before any marching
📋 Followed the procedure from Numbers four
🧱 Boards, curtains, and coverings all came apart
📖 A short verse hides real labor
---
## 🚶 The Sons Of Gershon And The Sons Of Merari Set Forward, Bearing The Tabernacle

These two Levite families carried the tent's coverings and wooden frame.

That assignment was given to them back in Numbers four.

They traveled early, right behind Judah's division.

That early start turns out to matter, and the reason becomes clear soon.

🚶 Carried the tent's coverings and frame
📦 Their job was set in Numbers four
🏃 They traveled early, right behind Judah
➡️ That early start matters very soon
---

# Numbers 10:18-21
# 🏕️ Reuben And The Kohathites
---
## 🥈 The Standard Of The Camp Of Reuben Set Forward

Reuben's division camped south of the tabernacle back in Numbers two.

It marched second, in the exact same order as its camp position.

Nothing about this order was a new decision made on the spot.

It was already fixed long before this march ever began.

🥈 Reuben's division camped south of the tabernacle
🚶 Marched second, matching its camp order
📋 Already fixed before the march began
📖 Order, not improvisation, moved the camp
---
## 📦 The Kohathites Set Forward, Bearing The Sanctuary

"Sanctuary" here means the holy furniture specifically, not the tent itself.

That furniture included the ark, the table, the lampstand, and the altars.

Numbers four already assigned this exact job to the Kohathites.

These pieces were carried by hand on poles, never loaded onto a cart.

📦 Sanctuary means the holy furniture itself
⛓️ Ark, table, lampstand, and altars included
🙌 Carried by hand on poles, never a cart
📖 The most sacred cargo in the camp
---
## 🏗️ The Other Did Set Up The Tabernacle Against They Came

Gershon and Merari left earlier carrying the tent structure.

Their early start gave them time to rebuild the frame and coverings first.

By the time the Kohathites arrived with the furniture, the tent was already standing.

That timing meant the ark never sat out in the open, even briefly.

🏗️ Gershon and Merari rebuilt the tent first
⏱️ Their early start made this possible
📦 The furniture arrived to a tent already standing
📖 Sacred items were never left exposed
---

# Numbers 10:22-25
# 🚩 Ephraim And Dan
---
## 🥉 The Standard Of The Camp Of The Children Of Ephraim Set Forward

Ephraim's division camped west, according to Numbers two.

Ephraim and Manasseh were both sons of Joseph.

Benjamin was Rachel's other son, and he marched in this same division.

This entire third division descended from Jacob's beloved wife, Rachel.

🥉 Ephraim's division camped on the west side
👨‍👦 Ephraim and Manasseh were both Joseph's sons
👨‍👩‍👦 Benjamin joined them in the same division
📖 One division built around Rachel's family
---
## 🛡️ Which Was The Rereward Of All The Camps

"Rereward" is an old word for rearguard.

Dan's division marched last in the entire column.

That position meant watching the back for any surprise threat.

The most exposed position in the whole march was deliberately guarded.

🛡️ Rereward is an old word for rearguard
🚶 Dan's division marched at the very back
👀 Their job was watching for threats behind
📖 The most exposed spot was guarded on purpose
---
## 🧭 Ahiezer The Son Of Ammishaddai

Names in these lists are not filler.

Ahiezer's name means "my brother is help."

That meaning fits a leader whose entire job was guarding the camp's trailing edge.

Even a name buried in a list can carry real meaning.

🧭 Ahiezer's name means my brother is help
🛡️ He led the camp's most exposed division
📖 A fitting name for a guarding leader
➡️ Names in lists can still carry meaning
---

# Numbers 10:26-28
# 📜 The March, In Order
---
## ✅ Thus Were The Journeyings Of The Children Of Israel According To Their Armies

This verse confirms the exact order used in this one march.

Judah went first, then Reuben, then the Kohathites, then Ephraim, then Dan.

That was not a one time arrangement made for a single day.

It became the standard formation used for the rest of the wilderness years.

✅ Confirms the order used in this march
🔁 It became Israel's standard formation
📆 Used for the rest of the wilderness years
📖 One march stands in for every future one
---
## ⚔️ According To Their Armies

"Armies" is military language, the same word used for the census counts in Numbers one.

Even ordinary travel used that same military framing.

Israel moved with real discipline and formation.

This was never a loose, wandering crowd.

⚔️ Armies echoes the Numbers one census word
🎖️ Even travel used military language
🚶 Discipline and formation marked every move
📖 A structured nation, not a scattered crowd
---

# Numbers 10:29-32
# 🤝 Moses And Hobab
---
## 👪 Hobab, The Son Of Raguel The Midianite, Moses' Father In Law

"Raguel" is another name for Jethro, already introduced back in Exodus eighteen.

Hobab appears to be Jethro's son, which would make him Moses' brother in law.

The exact family relationship is debated among translators.

Either way, this is the same Midianite family that sheltered Moses years earlier.

👪 Raguel is another name for Jethro
🤔 Hobab was likely Moses' brother in law
🏠 The same family that sheltered Moses before
📖 The exact relationship is genuinely debated
---
## 🗺️ We Are Journeying Unto The Place Of Which The LORD Said, I Will Give It You

Moses names the destination openly, not vaguely.

That destination is the same land promised to Abraham back in Genesis twelve.

God repeated that same promise to Moses at the burning bush in Exodus three.

This march had a specific target, not an aimless direction.

🗺️ The same land promised to Abraham
🔥 Reaffirmed to Moses at the burning bush
🎯 A named destination, not a guess
📖 The journey always had a real target
---
## 🙅 I Will Not Go, But I Will Depart To Mine Own Land

Hobab already had a home and a family of his own.

Leaving them behind for an uncertain desert journey was a real and costly ask.

His refusal was honest, not rude.

Moses would need a stronger appeal to change his mind.

🙅 Hobab already had his own home
💰 Leaving would have cost him a great deal
😌 His refusal was honest, not rude
➡️ Moses still had one more appeal to make
---
## 👁️ Thou Mayest Be To Us Instead Of Eyes

Hobab had lived in this desert region for years.

He knew practical details the cloud's guidance never spelled out on its own.

Water sources, safe paths, and terrain were things only local experience could teach.

God's guidance and human knowledge were treated as partners, not rivals.

👁️ Hobab knew the desert firsthand
💧 Water sources and safe paths were his knowledge
🤝 Divine guidance and human skill worked together
📖 Two kinds of help were never rivals
---
## 🤝 What Goodness The LORD Shall Do Unto Us, The Same Will We Do Unto Thee

Moses renews his offer with a firmer, more personal promise.

This is not vague future blessing, but a direct commitment to Hobab himself.

Judges chapter one and chapter four both mention Hobab's descendants, the Kenites.

Those later verses hint that Hobab's family did eventually stay close to Israel.

🤝 A firmer, more personal repeat of the offer
📜 Judges later mentions his descendants, the Kenites
👨‍👦 A hint that the family stayed close
📖 A kept promise across many generations
---

# Numbers 10:33-36
# ⛺ The Ark Goes Before Them
---
## ⛰️ They Departed From The Mount Of The LORD Three Days' Journey

"The mount of the LORD" refers to Mount Sinai itself.

Israel had camped there for almost eleven full months.

This departure marks a genuine turning point in the story.

The long Sinai chapter of the book finally closes here.

⛰️ Mount of the LORD means Mount Sinai
📆 Israel had camped there nearly a year
🚩 A genuine turning point in the story
📖 The long Sinai season finally ends
---
## 📦 The Ark Of The Covenant Of The LORD Went Before Them, To Search Out A Resting Place

Numbers two places the ark in the middle of the camp, with the Kohathites.

Here, for this stretch of the journey, it moves out ahead of everyone instead.

It acts almost like a scout marking each resting place before the nation arrives.

This was a special arrangement, not the ark's usual position.

📦 Different from the ark's usual mid camp spot
🔍 Moved ahead like a scout on this stretch
🎯 Marked each resting place before arrival
📖 A special role for this one journey
---
## 🌥️ The Cloud Of The LORD Was Upon Them By Day

This ties directly back to the guidance system explained in Numbers nine.

That system was explained there in theory.

Here it is finally shown running in real life, day by day.

The promise already made was now being lived out on the road.

🌥️ Ties back to the system from Numbers nine
📖 Theory now shown actually working
🚶 Guidance played out day by day
➡️ A promise now lived out in real time
---
## 🙏 Rise Up, LORD, And Let Thine Enemies Be Scattered

Moses spoke this short prayer every time the ark set out to travel.

Jewish tradition later calls it part of the Song of the Ark.

Some Hebrew Bibles even mark these verses off as their own distinct unit.

Israel's enemies and God's enemies are treated here as one and the same.

🙏 Spoken by Moses each time the ark moved
📜 Later called the Song of the Ark
🔖 Some Bibles mark it as separate
📖 God's advance was pictured as Israel's own
---
## 🔄 Return, O LORD, Unto The Many Thousands Of Israel

This is the closing half of that same short prayer.

Moses spoke it when the ark came to rest, not when it moved.

"Return" pictures God's presence settling back among the camp after leading the way forward.

"The many thousands" echoes the massive population counted back in Numbers one.

🔄 The closing half, spoken when the ark rested
🏕️ Pictures God's presence settling back in camp
🔢 Many thousands echoes the Numbers one census
📖 A journey opened and closed in prayer
`.trim();

export const NUMBERS_TEN_PERSONAL_SECTIONS = parseNumbersTenRawNotes(NUMBERS_TEN_RAW_NOTES);
