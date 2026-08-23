export type SecondChroniclesSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesSeventeenRawNotes(rawText: string): SecondChroniclesSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 17:${startVerse}` : `2 Chronicles 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Chronicles 17 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_SEVENTEEN_RAW_NOTES = `# SecondChronicles 17:1-6
# 👑 Jehoshaphat Follows In David's Ways
---
## 👑 Jehoshaphat His Son Reigned In His Stead

Jehoshaphat was Asa's son, the fourth king in David's line to rule Judah.

The word "stead" means in his place, taking over the throne his father left behind.

Each new king in this family carried forward the same promise God made to David.

The line was not broken just because one king's story ended.

👑 Jehoshaphat was Asa's son and heir
🔄 Stead means taking his father's place
📜 David's royal line continued unbroken
📖 The promise carried forward to the next king

## ⚔️ Strengthened Himself Against Israel

Judah and the northern kingdom of Israel had been rival nations for decades by this point.

Strengthened here means Jehoshaphat built up his army and defenses right from the start of his reign.

The two kingdoms shared one people and one God but lived as separate, often hostile states.

A new king had to prepare for that reality immediately.

⚔️ Judah and Israel were rival kingdoms
🛡️ He built up his defenses right away
⏳ Division between them had lasted for decades
📖 A new king had to prepare for it

## 🏰 Placed Forces In All The Fenced Cities Of Judah

Fenced cities were towns surrounded by strong walls built for defense.

Placing forces there means Jehoshaphat stationed soldiers to guard every major fortified town.

This was a nationwide defense plan, not protection for the capital alone.

🏰 Fenced cities means walled, defended towns
🪖 He stationed soldiers in every one
🗺️ This covered the whole nation
📖 Defense was not limited to the capital

## 🗺️ Cities Of Ephraim, Which Asa His Father Had Taken

Ephraim was a territory belonging to the northern kingdom of Israel.

Asa had captured these specific cities during the reforms recorded two chapters earlier.

Jehoshaphat now defends land his father won rather than simply inheriting a settled border.

The chapter opens by tying the son's reign directly to the father's work.

🗺️ Ephraim belonged to the northern kingdom
⚔️ Asa had captured these cities earlier
🛡️ Jehoshaphat now defends that same ground
📖 The son continues the father's work

## 🙏 The LORD Was With Jehoshaphat

God's presence with a king in Chronicles is never automatic.

It shows up specifically when that king lives in obedience to Him.

This sentence sets up the reason for everything good that follows in this chapter.

🙏 God's presence was not automatic
✅ It followed Jehoshaphat's obedience
🔑 This explains everything good that follows
📖 God's nearness answers a king's faithfulness

## 📜 Walked In The First Ways Of His Father David

Father here means ancestor, since David was Jehoshaphat's great great grandfather, not his literal father.

The first ways points to David's early reign, before his failures with Bathsheba and Uriah.

Chronicles is careful to praise the pattern of David's faithful years, not his whole record.

📜 Father means ancestor here, not a direct parent
🕰️ First ways points to David's early reign
⚖️ Chronicles praises the faithful pattern, not every failure
📖 Jehoshaphat modeled David at his best

## 🚫 Sought Not Unto Baalim

Baalim is the plural form of Baal, the Canaanite storm and fertility god.

Worshiping Baalim meant looking to false gods to control rain, crops, and success.

Jehoshaphat refused to bring that worship into Judah alongside the LORD.

🚫 Baalim is the plural of Baal
🌧️ Baal worship claimed to control rain and crops
✋ Jehoshaphat refused to bring it into Judah
📖 He kept worship centered on the LORD alone

## 🚫 Not After The Doings Of Israel

The doings of Israel refers to the golden calf worship set up at Bethel and Dan.

The northern kingdom's first king built those shrines so his people would not travel south to worship.

Jehoshaphat deliberately rejected that shortcut, even though it would have been politically easier.

🐂 This refers to the golden calves
🗺️ Built by Israel's first king at Bethel
✋ Jehoshaphat rejected that shortcut on purpose
📖 True worship mattered more than convenience

## 🏛️ The LORD Stablished The Kingdom In His Hand

Stablished is an old form of established, meaning firmly secured and made stable.

This was not Jehoshaphat's own political skill holding the throne together.

Chronicles credits God directly with the stability of his rule.

🏛️ Stablished means firmly secured
🙏 This was not Jehoshaphat's own doing
👑 God is credited with the kingdom's stability
📖 Obedience produced a secure throne

## 🎁 All Judah Brought To Jehoshaphat Presents

Gifts brought to a king by his own people signaled widespread loyalty and support.

This was not tribute forced from a conquered enemy.

A united, willing nation is itself a sign of God's blessing on this reign.

🎁 These gifts came from Jehoshaphat's own people
🤝 This was loyalty, not forced tribute
🇮🇱 A united nation is a sign of blessing
📖 The people's support matched God's favor

## 💰 He Had Riches And Honour In Abundance

Riches and honour appearing together was a recognized mark of God's blessing in this era.

Wealth alone could come through many means, but this pairing signals something more.

The text ties Jehoshaphat's prosperity directly back to his obedience in the verses just before it.

💰 Riches and honour together marked God's blessing
🔗 This was not wealth by itself
✅ It followed directly from his obedience
📖 Blessing and faithfulness are linked here

## ❤️ His Heart Was Lifted Up In The Ways Of The LORD

This does not describe pride, even though the same phrase can mean that elsewhere in scripture.

Here it means Jehoshaphat grew confident and courageous in living for God.

The context of reform that follows immediately makes the positive meaning clear.

❤️ This is not pride in this context
💪 It means growing confidence in serving God
🔍 The reform that follows confirms the meaning
📖 Courage in obedience, not arrogance

## 🌳 Took Away The High Places And Groves Out Of Judah

High places were local hilltop shrines, often blending true worship with pagan customs.

Groves were wooden poles or trees dedicated to Asherah, a Canaanite fertility goddess.

Removing both meant undoing worship sites his own father Asa had failed to fully clear.

⛰️ High places were hilltop worship shrines
🌳 Groves were poles honoring the goddess Asherah
🔄 Even Asa had not fully removed these
📖 Jehoshaphat pressed the reform further

# SecondChronicles 17:7-9
# 📖 Teachers Sent Throughout Judah
---
## 📅 Also In The Third Year Of His Reign

This teaching mission happened early, only three years into Jehoshaphat's rule.

He treated the spiritual education of his people as an urgent priority, not a later project.

Most kings settled into their throne first before starting reforms this large.

Jehoshaphat moved right away instead of waiting.

📅 This happened just three years into his reign
🎯 He made it an early priority
⏰ It was not delayed for a calmer season
📖 Urgency showed what Jehoshaphat valued most

## 🧑‍🤝‍🧑 He Sent To His Princes To Teach In The Cities Of Judah

Princes here means royal officials, not young sons of the king.

Sending government officials to teach was unusual, since teaching was normally a priestly task.

Jehoshaphat used the full weight of his administration to spread knowledge of God's law.

🧑‍🤝‍🧑 Princes means royal officials here
📚 Teaching was normally a priestly task
🏛️ Jehoshaphat used his whole administration for it
📖 He treated this as a matter of state

## 🕊️ With Them He Sent Levites

Levites were the tribe set apart to assist priests and serve in worship and instruction.

Pairing officials with Levites combined civil authority with trained religious teaching.

Together they formed teams equipped to explain the law accurately, not just announce it.

🕊️ Levites assisted priests in worship and teaching
🤝 This paired civil authority with religious training
👥 Teams were built for accurate teaching
📖 Knowledge and authority traveled together

## ⚱️ And With Them Elishama And Jehoram, Priests

Adding priests to the teams gave the mission full religious authority alongside the Levites.

This created a three part structure of officials, Levites, and priests working as one unit.

No single group carried this mission alone.

⚱️ Priests gave the mission full religious authority
🔺 Three groups worked together as one team
🤝 No single group carried this alone
📖 Full cooperation backed this effort

## 📜 They Had The Book Of The Law Of The LORD With Them

This was a physical copy of God's law, likely the writings of Moses.

Having a written copy to carry from city to city was a significant undertaking in this era.

Ordinary people in scattered towns did not otherwise have regular access to it.

📜 This was a copy of the law
🧳 Carrying it between cities took real effort
🏘️ Ordinary people rarely had access otherwise
📖 Jehoshaphat brought God's word directly to them

## 🚶 Went About Throughout All The Cities Of Judah

This describes a traveling campaign, not a single event held in one place.

The teams moved from town to town so no city was left out.

Jehoshaphat wanted every part of his kingdom to hear the same instruction.

🚶 This was a traveling campaign
🏘️ Every city was included
🎯 No town was left out
📖 One consistent message reached the whole kingdom

# SecondChronicles 17:10-11
# 🕊️ Peace And Tribute From The Nations
---
## 😨 The Fear Of The LORD Fell Upon All The Kingdoms

This was not fear of Jehoshaphat's army alone.

It describes a sense of dread that God Himself placed on Judah's neighbors.

Nations round about Judah include Philistine cities to the west and other bordering peoples.

😨 This was fear sent by God
🗺️ It affected Judah's neighboring nations
🛡️ God protected Judah through this dread
📖 Spiritual causes produced political safety

## ⚔️ So That They Made No War Against Jehoshaphat

This peace came without a single battle needing to be fought.

It stands as a direct result of the fear described in the line just before it.

Chronicles wants the reader to connect this calm directly to God's protection.

⚔️ No battle was needed for this peace
🔗 It followed straight from that fear
🕊️ This was protection, not military victory
📖 God secured peace without a fight

## 🎁 Some Of The Philistines Brought Jehoshaphat Presents

The Philistines had been Israel's most persistent enemies for generations, going back to Samson and Goliath.

Gifts and tribute silver from them marked a dramatic reversal from that old hostility.

Former rivals now approached Judah with respect instead of raids.

🎁 Philistines were a longtime enemy nation
🔄 Their gifts marked a dramatic reversal
🤝 Former rivals now showed respect
📖 God's blessing changed old hostilities

## 🐑 The Arabians Brought Him Flocks Of Rams And He Goats

The Arabians were nomadic tribes living in the desert regions near Judah's southern border.

The number seven thousand and seven hundred appears twice, stressing the enormous size of the gift.

Livestock this valuable represented real wealth in an agricultural economy.

🐑 Arabians were nomadic desert tribes nearby
🔢 The huge number is repeated for emphasis
💰 Livestock this large meant real wealth
📖 Even distant peoples honored Jehoshaphat

# SecondChronicles 17:12-19
# 🛡️ Jehoshaphat's Growing Military Strength
---
## 📈 Jehoshaphat Waxed Great Exceedingly

Waxed is an old word meaning grew or became, still used today only in phrases like waxing and waning.

Exceedingly stresses that this growth went well beyond an ordinary, expected increase.

The chapter has now moved from Jehoshaphat's obedience to its visible national results.

📈 Waxed means grew or became
🔝 Exceedingly means far beyond ordinary growth
🔗 This follows directly from his obedience
📖 Faithfulness produced visible national strength

## 🏰 He Built In Judah Castles And Cities Of Store

Castles here means fortified strongholds, not the later European style of castle.

Cities of store were towns built specifically to hold grain, weapons, and supplies for the kingdom.

Together they gave Judah both defense and the resources to sustain it.

🏰 Castles means fortified strongholds
🏬 Store cities held grain, weapons, and supplies
🛡️ Together they gave defense and resources
📖 Jehoshaphat prepared for both war and provision

## 🧱 He Had Much Business In The Cities Of Judah

Business here refers to building projects and organized resources, not commerce in the modern sense.

This describes a kingdom actively developing its towns, not sitting idle in its peace.

The years without war gave Judah room to build instead of just defend.

A quiet season can still be a productive one.

🧱 Business means organized building and resources
🏗️ Judah's towns were actively developing
⏳ Peace years became building years
📖 A quiet season can still be productive

## 🪖 Men Of War, Mighty Men Of Valour, Were In Jerusalem

Valour is an old word for courage or bravery in battle.

These elite troops were stationed specifically in the capital, not spread thin across the countryside.

Keeping the strongest forces near the throne protected the heart of the kingdom.

🪖 Valour means courage in battle
🏙️ Elite troops were kept in the capital
👑 This protected the heart of the kingdom
📖 The strongest defense guarded Jerusalem itself

## 📋 According To The House Of Their Fathers

This phrase means the army was organized by tribe and extended family line.

Israel's military structure followed the same family groupings used since the nation left Egypt.

Ancient armies were rarely random collections of strangers.

📋 This means organized by family and tribe
🏛️ This structure dated back to the exodus
👪 Soldiers served alongside their own relatives
📖 Family identity shaped military order

## 🎖️ Captains Of Thousands

A captain of thousands commanded a large military unit, similar to a modern general.

Naming specific captains shows Chronicles preserving real administrative records, not just a vague summary.

These were not anonymous soldiers but known, ranked leaders.

The list that follows names five of them directly.

🎖️ This was a high military rank
📚 Naming captains reflects real records
🗂️ Chronicles preserved specific administrative detail
📖 This was not a vague summary

## 🔢 Adnah The Chief, And With Him Three Hundred Thousand

Adnah led the largest single division named in this list.

Many scholars believe large numbers like this in Chronicles may represent military units rather than a literal headcount.

Either way, the text presents Judah's army as remarkably large for its size.

🔢 Adnah led the largest division named
📚 Large numbers here may mean military units
🤔 The exact count is genuinely debated
📖 Judah's forces were remarkably strong

## 🎖️ Jehohanan The Captain, And With Him Two Hundred And Fourscore Thousand

Fourscore is an old word for eighty, since a score meant twenty.

Two hundred and fourscore thousand simply means two hundred eighty thousand men.

Jehohanan led the second division named in this chapter.

Each captain in this list is named with his own exact count.

🎖️ Fourscore is an old word for eighty
🔢 A score meant twenty in that counting system
🧮 This totals two hundred eighty thousand men
📖 Old number words still describe real totals

## 🙋 Amasiah, Who Willingly Offered Himself Unto The LORD

This exact phrase, willingly offered himself, echoes the language of Judges chapter five.

That earlier song praised leaders who volunteered for battle instead of being forced into service.

Chronicles singles Amasiah out by name for that same spirit of devotion.

🙋 This phrase echoes the song in Judges five
🎖️ It praises volunteers, not forced soldiers
✨ Amasiah is singled out for this devotion
📖 Willing service stood out as worth naming

## 🏹 Of Benjamin, Eliada A Mighty Man Of Valour

Benjamin and Judah were the two tribes that stayed loyal when the kingdom split in two.

Naming Benjamin here shows the southern kingdom still functioned as those two tribes together.

Eliada led forces drawn specifically from Benjamin rather than Judah alone.

The two tribes fought as one army under one king.

🏹 Judah and Benjamin were the two loyal tribes
🤝 Both tribes made up the southern kingdom
🇮🇱 This shows Judah was not acting alone
📖 Unity between the two tribes held strong

## 🏹 Armed Men With Bow And Shield Two Hundred Thousand

This detail specifies these troops as archers carrying shields for protection.

Naming their equipment shows the army had specialized units, not one uniform type of soldier.

A bow gave range while a shield gave close protection.

Together they formed a balanced fighting unit.

🏹 These troops were archers
🛡️ They also carried shields for protection
⚙️ The army had specialized unit types
📖 Judah's forces were organized by role

## 🪖 Jehozabad, And With Him An Hundred And Fourscore Thousand

An hundred and fourscore thousand means one hundred eighty thousand men.

This is the final named captain in a list of five leaders.

Adding every division together, the total passes well over a million soldiers.

Chronicles presents Judah as a fully mustered, ready kingdom.

🔢 This means one hundred eighty thousand men
📊 This is the fifth and final captain named
➕ The full list totals well over a million
📖 Judah stood as a fully mustered kingdom

## 🏙️ These Waited On The King

Waited on means these troops actively served and attended the king, not that they stood idle.

This was the core royal army stationed close to Jerusalem.

They stood ready to move at the king's command.

This force made up the beating heart of Judah's defense.

🏙️ Waited on means actively serving, not idle
👑 This was the army closest to the king
🛡️ They formed the core royal force
📖 Constant readiness marked this army

## 🏰 Beside Those Whom The King Put In The Fenced Cities

This points back to the garrisons Jehoshaphat placed in walled towns at the start of the chapter.

The soldiers counted here were separate from those border defenders.

The chapter closes exactly where it opened, with a kingdom fully guarded on every side.

🏰 This recalls the garrisons from verse two
➕ These were separate from the border troops
🔄 The chapter closes where it began
📖 Judah stood fully guarded on every side
`.trim();

export const SECOND_CHRONICLES_SEVENTEEN_PERSONAL_SECTIONS = parseSecondChroniclesSeventeenRawNotes(SECOND_CHRONICLES_SEVENTEEN_RAW_NOTES);
