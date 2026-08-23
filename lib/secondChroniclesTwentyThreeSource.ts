export type SecondChroniclesTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyThreeRawNotes(rawText: string): SecondChroniclesTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 23:${startVerse}` : `2 Chronicles 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 23 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_THREE_RAW_NOTES = `# SecondChronicles 23:1-3
# 🤝 Jehoiada's Secret Covenant
---
## 👊 Jehoiada Strengthened Himself

Strengthened himself means Jehoiada gathered his courage and made up his mind to act.

For six years he had only protected the hidden child in secret.

Now he moves from hiding into open action.

He is about to risk his own life to crown the rightful king.

💪 Strengthened means he gathered real courage
🏠 Six years of hiding are ending
👑 He moves to crown the true king
📖 Protection now becomes bold action

## 🎖️ Took The Captains Of Hundreds

Captains of hundreds were officers who each commanded about one hundred soldiers.

Jehoiada brings five of them into his plan, each one named directly.

These men controlled real soldiers guarding the palace.

Their loyalty is what makes a dangerous plan even possible.

🎖️ Captains of hundreds each led soldiers
🗣️ Jehoiada names five commanders directly
🛡️ They controlled the palace guard
📖 Their loyalty made the plan possible

## 🤝 Into Covenant With Him

Covenant here means each captain swore a formal binding promise to Jehoiada.

He needed certainty, not simply casual interest in the plan.

Scripture preserves each of their five names on purpose.

Naming them credits real people for a genuinely dangerous act of loyalty.

🤝 Covenant means a formal binding promise
🔒 Jehoiada needed certainty, not casual support
📜 Five real names are recorded here
📖 Scripture credits real courage by name

## 🏘️ Gathered The Levites Out Of All The Cities Of Judah

Levites lived spread across many cities throughout the land, not only in Jerusalem.

Joshua had assigned them those cities generations earlier for teaching and service.

Jehoiada now calls them back together for one dangerous purpose.

A citywide gathering this size could not stay hidden for long.

🏘️ Levites usually lived spread across many cities
📜 Joshua originally assigned them those cities
🕵️ Jehoiada gathers them for one purpose
📖 A gathering this size was hard to hide

## 👴 The Chief Of The Fathers Of Israel

Chief of the fathers means the heads of Israel's leading family lines.

These were respected elders, not priests or Levites.

Jehoiada is building support far wider than the temple staff alone.

A plan this dangerous needed backing from across the whole nation.

👴 Chief fathers were heads of major families
🌍 Support reaches beyond temple staff alone
🏛️ Jehoiada builds a nationwide alliance
📖 Wide backing was needed for this risk

## 👶 Made A Covenant With The King

This is the moment Joash is finally shown to the gathered leaders.

Only Jehoiada and his wife had known the boy was alive.

The covenant binds this whole group to support him from this day forward.

There is no turning back once this promise is made.

👶 Joash is revealed to the leaders here
🤫 Only two people had known the secret
🤝 The covenant locks in their support
📖 There is no turning back now

## 📜 As The LORD Hath Said Of The Sons Of David

God promised David that his own descendants would sit on the throne forever.

Second Samuel chapter seven records that promise in full.

Athaliah's years of rule had made that promise look broken.

Crowning Joash proves God's word never actually failed.

📜 God promised David an eternal throne
📚 Second Samuel seven records the promise
😟 Athaliah's reign made it look broken
📖 Joash's crowning proves the promise held

# SecondChronicles 23:4-8
# ⚔️ The Guard Is Organized
---
## 🚪 Porters Of The Doors

Porters were doorkeepers responsible for guarding the temple's entrances.

Jehoiada divides the priests and Levites into three separate watches.

Splitting the guard this way meant no single day was left unprotected.

Every rotation had one clear job to do.

🚪 Porters were doorkeepers stationed at entrances
🔀 Jehoiada splits the guard into three groups
🛡️ No single day was left unguarded
📖 Each watch had one clear job

## 🏰 A Third Part Shall Be At The King's House

One watch is stationed at the palace instead of the temple.

Protecting the future king's home mattered just as much as guarding the temple gates.

Splitting the guard this way covered both places Athaliah's men could strike.

Every approach to the king was covered at once.

🏰 One watch guards the king's own house
🛡️ His home mattered as much as the temple
🎯 Two locations blocked every angle of attack
📖 The whole plan covered every approach

## 🚧 The Gate Of The Foundation

The gate of the foundation was likely a specific gate along the temple's outer wall.

Many scholars believe it sat facing toward the palace grounds.

Wherever it stood exactly, guarding it sealed off one more way into the temple.

No gap was left for Athaliah's supporters to slip through.

🚧 The foundation gate was a specific gate
❓ Its exact location is debated today
🧱 It likely faced toward the palace
📖 Every gap into the temple was sealed

## 🏟️ All The People Shall Be In The Courts

Courts were the temple's open outer areas, open to ordinary worshipers.

Common people could not enter the sanctuary itself, but they could gather here.

Placing them there let a large crowd watch safely without risk to the ceremony.

Their presence also meant many witnesses if Athaliah tried to interfere.

🏟️ Courts were the temple's open outer areas
🙅 Ordinary people could not enter the sanctuary
👀 A crowd could watch safely from there
📖 More witnesses meant more protection

## 🔒 None Come Into The House Of The LORD, Save The Priests

Only priests and serving Levites were allowed inside the sanctuary building itself.

The text explains why plainly, for they are holy, set apart for that service.

Everyone else, no matter how loyal, had to stay outside in the courts.

This rule held even during a moment of national crisis.

🔒 Only priests and Levites entered the sanctuary
✨ Holy means set apart for that service
🚧 Everyone else stayed outside in the courts
📖 Sacred boundaries held even during a crisis

## 👀 Keep The Watch Of The LORD

Watch means staying alert, and everyone present had a role to play.

Ordinary people could not guard the sanctuary itself, but they still had real duty.

Staying watchful themselves added one more layer of protection around the whole plan.

Every person present carried some part of this responsibility.

👀 Watch means staying alert and ready
🙋 Ordinary people had a role too
🧱 Their watchfulness added one more layer
📖 Everyone carried some part of the plan

## 🛡️ The Levites Shall Compass The King Round About

Compass means to surround completely, forming a protective ring.

Armed Levites were told to form a human wall around the boy king.

This was not symbolic, they carried real weapons ready to use.

Joash was never left exposed for even a moment during the ceremony.

🛡️ Compass means to surround completely
⚔️ Levites carried real weapons, not symbols
👑 Joash stayed inside a protective ring
📖 He was never left exposed

## ⚠️ Whosoever Else Cometh Into The House, He Shall Be Put To Death

This is a direct kill order against any intruder during the ceremony.

Only guards with an assigned post were allowed near the king.

The order was severe on purpose, since one assassin could undo six years of hiding.

Security here was treated as a matter of life and death for the whole nation.

⚠️ Any intruder faced an immediate death order
🎯 Only assigned guards could approach the king
😬 Six years of hiding could be undone
📖 The nation's future depended on this security

## ✅ Did According To All Things That Jehoiada Had Commanded

Every instruction from the previous verses is now carried out exactly as given.

No one improvised or changed the plan once it was set in motion.

That kind of discipline is rare in a plan this risky and this large.

Careful obedience is exactly what kept the secret safe until this moment.

✅ Every instruction was carried out exactly
🚫 No one improvised or changed the plan
🤝 Discipline held across many participants
📖 Obedience protected the secret until now

## 🔄 Jehoiada The Priest Dismissed Not The Courses

Courses were the rotating shifts of priests and Levites David had organized generations earlier.

Normally one shift went home when the next shift took over.

Jehoiada kept both shifts on duty together instead of sending anyone home.

That doubled the number of armed men available on this one critical day.

🔄 Courses were David's rotating priestly shifts
🏠 Normally one shift would go home
👥 Jehoiada kept both shifts on duty
📖 Doubling the guard strengthened the plan

# SecondChronicles 23:9-11
# 👑 The Boy King Is Crowned
---
## 🛡️ Spears, And Bucklers, And Shields, That Had Been King David's

Bucklers were small round shields carried for close combat.

These weapons had belonged to King David himself, generations earlier.

David had dedicated captured weapons and treasure to the temple after his own wars.

His old weapons now protect his own great grandson's coronation.

🛡️ Bucklers were small round combat shields
👑 These weapons once belonged to David
🏛️ David had dedicated them to the temple
📖 His old weapons now protect his heir

## 🧭 From The Right Side Of The Temple To The Left Side

This describes an armed line stretching across the entire temple courtyard.

The formation ran from one side of the building to the other.

Every approach toward the king was blocked by an armed man.

Nothing about this defense was left to chance.

🧭 The line stretched across the whole courtyard
🛡️ Every approach to the king was blocked
🚫 No gap was left in the formation
📖 Nothing was left to chance

## 👑 Put Upon Him The Crown, And Gave Him The Testimony

The testimony was likely a written copy of God's law placed in the new king's hands.

The law itself commanded every king to keep a personal copy and read it often.

Crowning Joash with the law in hand declared something from the very first moment.

He would rule under God, never above Him.

👑 The crown marked him as king
📜 The testimony was likely God's written law
✅ Kings were commanded to keep a copy
📖 He ruled under God, never above Him

## 💧 Jehoiada And His Sons Anointed Him

Anointed means having oil poured on the head, marking someone set apart by God for a role.

David himself received this same anointing generations earlier.

Joash was about seven years old, one of the youngest kings Judah ever crowned.

The youngest heir now carried the oldest promise.

💧 Anointed means oil marking a God given role
👴 David received this same anointing before him
🔢 Joash was about seven years old
📖 The youngest heir carried the oldest promise

## 📢 Said, God Save The King

This phrase was a customary shout given at a new king's coronation.

It worked like a public blessing spoken over him in that moment.

Saying it out loud made the new reign official in front of everyone present.

After six years of silence, the true king finally had a public voice behind him.

📢 A customary shout given at coronations
🗣️ It worked as a public blessing
✅ It made the new reign official
📖 Silence finally ended with a public voice

# SecondChronicles 23:12-15
# 😱 Athaliah's Cry Of Treason
---
## 👂 Heard The Noise Of The People Running And Praising The King

Six years of careful secrecy end the moment this celebration breaks out.

Athaliah has no idea yet what she is about to walk into.

She comes toward the noise expecting trouble, not a coronation.

Curiosity draws her straight into the plan closing around her.

👂 Loud celebration broke the years of secrecy
❓ Athaliah does not know the cause yet
🚶 She walks straight toward the noise
📖 Curiosity drew her into the trap

## 🏛️ The King Stood At His Pillar At The Entering In

Kings had a specific standing place near the temple entrance during major ceremonies.

Seeing a king standing there again showed instantly that David's line had not ended.

Athaliah is looking at proof her own seven years of rule have already come undone.

One sight told her everything.

🏛️ Kings had a specific standing spot here
👑 A king stood there again after years
😳 Athaliah sees proof her rule has ended
📖 One sight told her everything

## 🎺 Sounded With Trumpets, Also The Singers With Instruments Of Musick

A full musical celebration breaks out for the first time in years.

This is public praise, sound meant to be heard everywhere nearby.

Trained singers and instruments here mean officially organized worship, not spontaneous noise.

True worship had gone quiet under Athaliah, and this moment brings it roaring back.

🎺 Trumpets marked the coronation publicly
🎶 Musicians and trained singers took part
😟 True worship had gone quiet under Athaliah
📖 Worship came roaring back at this moment

## 😱 Athaliah Rent Her Clothes, And Said, Treason, Treason

Rent her clothes means she tore her own garment, a common way to show sudden shock or grief.

Calling this treason is deeply ironic, since she seized the throne through violence herself.

The real conspiracy was hers seven years earlier, not the one happening now.

Her own words expose exactly what she has been hiding.

😱 Rent clothes showed sudden shock or grief
🗣️ Treason means rebellion against the rightful ruler
🙃 Her own accusation is deeply ironic
📖 She was the true conspirator all along

## ⚔️ Have Her Forth Of The Ranges

Ranges were the ordered rows of armed men lining the temple courtyard.

Jehoiada orders Athaliah removed from inside that formation immediately.

Anyone who tries to rescue her will be killed on the spot.

Jehoiada acted decisively the moment the threat was named.

⚔️ Ranges were the guard's ordered rows
🚶 Athaliah is removed from that formation
🛡️ Any rescue attempt would be killed
📖 Jehoiada acted decisively and immediately

## 🚫 Slay Her Not In The House Of The LORD

Jehoiada refuses to let her execution happen on sacred ground.

The temple must stay free of bloodshed even during her own death sentence.

Justice still moves forward, just not inside the building itself.

Holiness governs even the harshest moment in this whole chapter.

🚫 The temple stays free of bloodshed
⚖️ Her execution still moves forward outside
📍 Location mattered even in judgment
📖 Holiness governs even the harshest moment

## 🚪 The Entering Of The Horse Gate By The King's House

The horse gate was a palace area gate used mainly for royal and military traffic.

Leading her there placed her execution near her own former seat of power.

Seven years after seizing the throne through murder, her reign ends the very same way.

Violence had put her on the throne, and violence took her off it.

🚪 The horse gate stood near the palace
🐴 It was used for royal and military traffic
🔁 Her reign ended near where it began
📖 Violence seized power, violence ended it

# SecondChronicles 23:16-19
# 🔥 Baal Torn Down And Worship Restored
---
## 🤝 A Covenant Between Him, And Between All The People, And Between The King

This covenant has three separate parties, the priest, the people, and the king together.

Everyone present is binding themselves to the same commitment at once.

The one goal named is simple, that they should be the LORD's people.

Political change alone was never the real point of this whole day.

🤝 Three parties agree to one covenant
👥 Priest, people, and king together
🎯 The goal was faithfulness to the LORD
📖 This day was about worship, not politics

## 🏛️ The People Went To The House Of Baal, And Brake It Down

Athaliah's rule had allowed a temple to a foreign god inside Judah's own capital.

The people tear it down themselves, without waiting for a royal order.

This act shows how deeply Baal worship had taken root during her seven years.

Removing it becomes the nation's first public act of loyalty to the true God.

🏛️ Baal had a temple inside Jerusalem
👥 The people tore it down themselves
😟 It shows how deep Baal worship had spread
📖 This was the nation's first act of loyalty

## 🗡️ Slew Mattan The Priest Of Baal Before The Altars

Mattan served as the chief priest leading Baal worship under Athaliah's protection.

His death happens at the very altars where he once led that worship.

The law of Moses demanded death for anyone leading Israel into idolatry this openly.

Removing him ended organized Baal worship at its actual source.

🗡️ Mattan led Baal worship under Athaliah
📍 He died at his own altars
📜 The law demanded this for open idolatry
📖 His death ended organized Baal worship

## 📋 Appointed The Offices Of The House Of The LORD

Generations earlier, David had carefully organized the priests and Levites into specific duties.

Athaliah's years of Baal worship had let much of that order fall apart.

Jehoiada restores the very same system David had first put in place.

True worship returns to its old order after years of neglect.

📋 David had organized priestly duties long ago
😟 That order had broken down under Athaliah
🔧 Jehoiada restores David's original system
📖 True worship returns to its old order

## 🎶 With Rejoicing And With Singing, As It Was Ordained By David

David had commanded that temple worship include music, not only sacrifice.

Restoring the singing alongside the offerings brings back the fuller pattern David designed.

Joy itself becomes part of the nation's return to true worship.

This was not a grim ceremony, it was a celebration.

🎶 David commanded music as part of worship
🔁 Singing returns alongside the sacrifices
😊 Joy became part of true worship again
📖 Restoration was a celebration, not a formality

## 🚪 That None Which Was Unclean In Any Thing Should Enter In

Unclean here means ritually impure under the law of Moses, not simply dirty.

Porters were stationed again to screen everyone entering the temple grounds.

Years of Baal worship inside Judah's own capital had put the temple's purity at risk.

Guarding it again mattered more than ever.

🚪 Porters screened everyone entering the temple
✨ Unclean meant ritually impure, not dirty
🛡️ Purity mattered after years of idolatry
📖 The temple's holiness was actively protected

# SecondChronicles 23:20-21
# 🎉 The City Is Quiet
---
## 🚶 Brought Down The King From The House Of The LORD

The coronation itself happened at the temple, but the throne sits at the palace.

This procession moves Joash from the place of his crowning to the place of his rule.

A wide crowd, from top officials to common people, walks with him for this final step.

Every group in the nation now visibly stands behind their new king.

🚶 Joash moves from temple to palace
👥 Officials and common people walk together
🤝 The whole nation stands behind him
📖 Every group joined this final step

## 👑 Set The King Upon The Throne Of The Kingdom

After seven years, David's throne finally holds a descendant of David again.

This single sentence undoes what Athaliah's massacre in chapter twenty two tried to accomplish.

The promise made to David generations earlier survives intact.

One rescued baby is now, at last, sitting where he always should have been.

👑 David's throne holds David's heir again
😟 This undoes Athaliah's earlier massacre
📜 God's promise to David survived intact
📖 The rescued child now sits enthroned

## 🕊️ The City Was Quiet, After That They Had Slain Athaliah

Quiet here means real peace, not just an absence of noise.

Seven years under a false, Baal worshiping ruler finally come to an end.

The chapter closes exactly where the covenant in verse three aimed all along.

The throne, the promise, and true worship are all restored together.

🕊️ Quiet means real peace, not just silence
😌 Seven years of false rule finally ended
✅ The covenant's goal from verse three was met
📖 The throne, the promise, and worship restored
`.trim();

export const SECOND_CHRONICLES_TWENTY_THREE_PERSONAL_SECTIONS = parseSecondChroniclesTwentyThreeRawNotes(SECOND_CHRONICLES_TWENTY_THREE_RAW_NOTES);
