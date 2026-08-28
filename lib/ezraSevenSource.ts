export type EzraSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraSevenRawNotes(rawText: string): EzraSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 7:${startVerse}` : `Ezra 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezra 7 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_SEVEN_RAW_NOTES = `# Ezra 7:1-6
# 📜 Ezra's Line And Calling
---
## 👑 In The Reign Of Artaxerxes King Of Persia

This is the same Persian king named in Ezra chapter four.

There, he had ordered work in Jerusalem stopped.

Here, decades into his reign, he becomes the one funding temple worship instead.

A king who once resisted the work now became its biggest supporter.

👑 Artaxerxes appears earlier in Ezra chapter four

🛑 There he had stopped work in Jerusalem

💰 Here he funds temple worship instead

📖 A resistant king became a generous one

## ⚰️ Ezra The Son Of Seraiah

This Seraiah was the last high priest before Jerusalem fell to Babylon.

Nebuchadnezzar had him executed generations before Ezra was even born.

Son here means descendant, a normal way Hebrew genealogies skip generations.

Ezra came from the highest priestly line in Israel, not just any family.

⚰️ Seraiah was the last high priest

👑 Nebuchadnezzar had him executed

🔗 Son here means descendant, not a literal father

📖 Ezra came from Israel's highest priestly line

## 🤝 The Son Of Zadok, The Son Of Ahitub

Zadok was the priest who stayed loyal to David during Absalom's rebellion.

He later anointed Solomon as king while a rival priest backed someone else.

His name became the standard for faithful priesthood for centuries afterward.

Ezra's line ran straight through that same faithful family.

🤝 Zadok stayed loyal to David during a rebellion

👑 He anointed Solomon as king

✅ His name stood for faithful priesthood

📖 Ezra descended from that same line

## 🔗 The Son Of Aaron The Chief Priest

This closes a chain of sixteen names stretching back to Israel's very first priest.

The list actually skips several generations recorded elsewhere in the Old Testament.

Genealogies like this cared more about proving the line than listing every name.

Naming Aaron at the end proved Ezra's priestly authority beyond question.

🔗 The chain runs back to Aaron himself

✂️ Some generations are skipped in the list

🎯 The goal was proving the line

📖 Aaron's name settled Ezra's authority

## 🏙️ This Ezra Went Up From Babylon

Babylon was where most Jewish exiles had lived for generations by this time.

Going up describes climbing in elevation toward Jerusalem, not just travel north.

Jerusalem sits high in the hill country, so any approach to it means climbing.

Ezra chose to leave a comfortable, established life for an unfinished project abroad.

🏙️ Babylon had been home to exiles for generations

⛰️ Going up means climbing toward Jerusalem's elevation

🗺️ Jerusalem sits high in the hill country

➡️ Ezra left comfort for unfinished work

## ✍️ A Ready Scribe In The Law Of Moses

A scribe copied, studied, and taught the first five books of the Bible.

Ready here means skilled and well prepared, not simply available.

Ezra had spent years mastering this law before he ever left Babylon.

His skill made him uniquely qualified to reform worship back in Jerusalem.

✍️ A scribe copied and taught the law

🎓 Ready means skilled, not just available

📚 Ezra had studied for years already

📖 His skill fit exactly what Jerusalem needed

## 🙏 The King Granted Him All His Request

Ezra apparently asked Artaxerxes for far more than simple travel permission.

The rest of this chapter lists exactly what that request included.

A foreign king said yes to nearly everything a Jewish priest asked for.

Scripture credits God's own hand for that surprising cooperation.

🙏 Ezra asked for more than travel permission

📜 The chapter lists what he received

😮 A foreign king granted nearly all of it

📖 God's hand explains the cooperation

## 🖐️ According To The Hand Of The Lord His God Upon Him

This exact phrase repeats several times across this chapter alone.

It means God was actively guiding and protecting Ezra's circumstances.

Ezra credited none of this success to his own persuasion or skill.

Watch for this same phrase again later in the chapter.

🖐️ The Lord's hand means His active guidance

🔁 This phrase repeats through the chapter

🙌 Ezra gave God the credit, not himself

➡️ Watch for it again later

# Ezra 7:7-10
# 🛤️ The Journey To Jerusalem
---
## 🚶 Some Of The Children Of Israel, And Of The Priests, And The Levites

Not every exile chose to make this trip back to Jerusalem.

Only some volunteered to leave settled lives in Babylon behind.

Priests and Levites were needed most since temple worship required them.

This second wave joined the exiles who had returned decades earlier under Zerubbabel.

🚶 Only some exiles chose to return

🏠 Many had settled lives in Babylon

🙏 Priests and Levites were especially needed

📖 This was a second wave of returnees

## 🎵 The Singers, And The Porters, And The Nethinims

Singers led worship music during temple services and processions.

Porters guarded the temple gates and controlled who could enter.

Nethinims were temple servants who handled the heavy, practical labor of worship.

Rebuilding right worship needed every one of these roles, not just priests.

🎵 Singers led worship music

🚪 Porters guarded the temple gates

🧹 Nethinims handled practical temple labor

📖 Right worship needed every role

## 📆 In The Seventh Year Of Artaxerxes The King

Persian records let historians date this year precisely, around four fifty eight BC.

That places this trip about sixty years after Ezra chapter six ended.

The temple had already stood finished for decades by this point.

Ezra's mission was about reforming worship, not building the building itself.

📆 This dates to about four fifty eight BC

🏛️ The temple had stood finished for decades

🎯 Ezra's mission was reform, not construction

➡️ Timing matters for this chapter

## 🐪 He Came To Jerusalem In The Fifth Month

Verse nine spells out the entire timeline for this trip in one line.

Ezra departed Babylon on the first day of the first month.

He reached Jerusalem on the first day of the fifth month, four months later.

That is about nine hundred miles covered on foot and by animal.

📅 The trip spanned four full months

🚶 Ezra traveled about nine hundred miles

🐪 Foot and animal were the only transport

📖 God's good hand covered this trip

## ❤️ Ezra Had Prepared His Heart To Seek The Law Of The Lord

This single verse gives Ezra's entire life mission in three clear steps.

First he prepared his heart, meaning he committed himself inwardly before acting.

Then he sought the law, studying it seriously rather than skimming it.

Only after that did he do it himself and teach it to others.

❤️ He prepared his heart first

📖 Then he sought the law seriously

🙌 Then he lived it out himself

➡️ Only then did he teach others

## 🎓 To Teach In Israel Statutes And Judgments

Statutes were God's specific commands, the exact rules Israel had to follow.

Judgments were the case by case rulings judges used to apply those rules justly.

Most Israelites living in Jerusalem by now barely knew either one.

Ezra's real assignment was rebuilding knowledge of God's law, not just a building.

📜 Statutes were God's specific commands

⚖️ Judgments applied those commands case by case

😕 Most Israelites barely knew either

📖 Ezra rebuilt knowledge, not just buildings

# Ezra 7:11-14
# ✉️ The King's Letter Begins
---
## 📜 The Copy Of The Letter

This introduces an official government document quoted directly inside Scripture.

Ezra likely kept the original and preserved this copy for the record.

Ancient Near Eastern kings issued written decrees like this to make orders official.

The Bible rarely quotes a whole foreign government letter word for word like this.

📜 This is an official government document

🗂️ Ezra likely preserved the original copy

👑 Written decrees made royal orders official

📖 Scripture rarely quotes a letter this fully

## 🙏 A Scribe Of The Words Of The Commandments Of The Lord

Even the pagan king's letter describes Ezra using this exact religious title.

Artaxerxes acknowledged Ezra's role in Israel's God without hesitation or mockery.

A foreign government document validated Ezra's spiritual authority in writing.

That kind of recognition from Persia carried real legal weight back in Jerusalem.

👑 Even the king used this religious title

🙏 Artaxerxes showed no mockery toward Israel's God

📜 This recognition was written into law

📖 Persia's respect gave Ezra real authority

## 👑 Artaxerxes, King Of Kings

This title claimed authority over every lesser king within the Persian Empire.

Persian kings used it often to show their power stretched over many nations.

The same title appears again centuries later describing Jesus in Revelation.

One earthly king borrowed language that ultimately belongs to God alone.

👑 King of kings claimed rule over lesser kings

🌍 Persia ruled over many nations at once

📖 Revelation later uses this same title for Jesus

➡️ Earthly power borrowed language that belongs to God

## ✉️ Perfect Peace, And At Such A Time

This was a standard, formal greeting used in official Persian correspondence.

It functioned much like a modern letter's opening line before the real content.

The phrase carried little spiritual weight on its own here.

What follows this greeting is where the letter's real substance begins.

✉️ This was a standard formal greeting

📝 It worked like a modern letter's opening line

🤷 It carried little spiritual weight alone

➡️ The real content follows right after

## 📜 I Make A Decree

A decree was a binding royal order that carried the full force of law.

No official in the empire could legally ignore or overturn it.

This single sentence gave Ezra's whole mission its legal foundation.

Without this decree, Ezra had no authority to lead anyone anywhere.

📜 A decree was a binding royal order

⚖️ No official could legally ignore it

🏛️ This sentence gave Ezra his legal foundation

📖 Authority made the mission possible

## ✋ Which Are Minded Of Their Own Freewill To Go Up

Nobody was forced to leave Babylon and travel to Jerusalem.

Freewill here means a genuine, voluntary choice made without pressure.

Many exiles had built comfortable lives and simply chose to stay behind.

Every person who did go up made a costly, personal decision to do so.

🙅 Nobody was forced to go

✋ Freewill means a genuine voluntary choice

🏠 Many exiles chose comfort and stayed

📖 Everyone who went made a costly choice

## 👥 Of His Seven Counsellors

Persian kings ruled alongside a formal council of seven high nobles.

Esther chapter one mentions this exact same governing structure by name.

Mentioning them here shows this decree passed through Persia's highest levels.

This was not a casual favor but an empire wide official policy.

👥 Persia's kings ruled with seven top nobles

📖 Esther chapter one names this same council

🏛️ The decree passed through Persia's highest levels

➡️ This was official policy, not a casual favor

# Ezra 7:15-20
# 💰 Silver, Gold, And Vessels For The Temple
---
## 💰 To Carry The Silver And Gold

Ezra was personally trusted to transport a massive fortune across hundreds of miles.

No armed escort is mentioned protecting this treasure during the journey.

Later in this same book, Ezra explains why he refused to ask for one.

Trusting God with the treasure mattered more to him than trusting an army.

💰 Ezra carried a massive fortune personally

🛡️ No armed escort is mentioned here

🙏 He trusted God over an army

📖 Ezra later explains refusing one

## 🏠 Whose Habitation Is In Jerusalem

Habitation means dwelling place, where God had chosen to be worshiped.

The Persian letter uses respectful religious language for Israel's own God here.

Persia treated Jerusalem's temple as a genuinely sacred site, not just a building.

That respect from a foreign empire was unusual and worth noticing.

🏠 Habitation means dwelling place

🙏 Persia used respectful language for Israel's God

🏛️ Jerusalem's temple counted as genuinely sacred

📖 Foreign respect here was unusual

## 🔍 All The Silver And Gold That Thou Canst Find In All The Province Of Babylon

This authorized Ezra to actively collect additional funding while still in Babylon.

The king's decree gave Ezra fundraising authority, not just a fixed gift.

Jewish communities still living across the province could give before he ever left.

The final total leaving Babylon was likely larger than any single royal gift.

🔍 Ezra could collect funding before leaving

📜 The decree granted fundraising authority

🏙️ Jewish communities across Babylon could give

📖 The final total grew larger this way

## 🎁 The Freewill Offering Of The People

This describes voluntary gifts given beyond anything Persia's government required.

Ordinary Jewish families and priests could contribute out of their own resources.

Government funding and personal generosity combined to fund this same project.

Both a king's treasury and a poor family's gift mattered to this mission.

🎁 These were voluntary gifts beyond taxes

👥 Ordinary families and priests could give

🤝 Government money and personal gifts combined

📖 Every size of gift mattered here

## 🐂 Buy Speedily With This Money Bullocks, Rams, Lambs

These three animals covered the main types of burnt offerings required by law.

Speedily meant Ezra should not delay converting funds into actual sacrifices.

A burnt offering was completely consumed on the altar as a gift to God.

The Persian treasury directly funded ongoing daily worship, not a one time gift.

🐂 Bullocks, rams, and lambs covered burnt offerings

⏱️ Speedily means without unnecessary delay

🔥 A burnt offering was fully consumed

📖 Persia funded ongoing worship, not a single gift

## 🌾 Their Meat Offerings And Their Drink Offerings

A meat offering here was actually grain, flour, or bread, not literal meat.

It usually accompanied an animal sacrifice as a companion gift.

A drink offering was wine poured out beside the altar during the ritual.

Together these completed a full sacrifice according to the law of Moses.

🌾 Meat offering here means grain, not literal meat

🍷 Drink offerings poured wine beside the altar

🤝 These accompanied animal sacrifices

📖 Together they completed a full offering

## 🤲 Whatsoever Shall Seem Good To Thee, And To Thy Brethren

Artaxerxes gave Ezra personal discretion over any silver and gold left over.

This was an extraordinary level of trust from a foreign government official.

Ezra could decide how to use it, as long as it served God's will.

Few religious leaders in history received this much financial freedom from a king.

🤲 Ezra had discretion over leftover funds

😮 This was extraordinary trust from Persia

🎯 Every choice still had to serve God's will

📖 Few leaders received this much freedom

## 🏺 The Vessels Also That Are Given Thee For The Service Of The House

Vessels here means the sacred bowls, basins, and tools used in temple worship.

Persia was supplying brand new equipment for the rebuilt temple's daily use.

This echoes the earlier vessels Cyrus returned back in Ezra chapter one.

Both kings, generations apart, cared about equipping Israel's worship properly.

🏺 Vessels means sacred bowls, basins, and tools

🆕 Persia supplied brand new temple equipment

📖 This echoes Cyrus in Ezra chapter one

➡️ Two kings both equipped Israel's worship

## 🏦 Bestow It Out Of The King's Treasure House

Artaxerxes promised to cover any remaining cost beyond what had already been sent.

This made the earlier gifts a starting point, not a strict spending limit.

Persia's royal treasury effectively became an open account for temple needs.

Very few ancient religious projects ever had this kind of guaranteed backup funding.

🏦 Artaxerxes covered any remaining cost

💰 Earlier gifts were only a starting point

😮 Few projects had this kind of backup funding

📖 Persia's treasury became an open account

# Ezra 7:21-26
# ⚖️ The King's Full Decree
---
## 💰 The Treasurers Which Are Beyond The River

These officials managed Persia's money across the entire province west of the Euphrates.

Artaxerxes now commands every one of them directly, not just Jerusalem's local leaders.

This decree carried authority across a huge stretch of the Persian Empire.

Ezra's mission had backing far beyond Jerusalem's own city limits.

💰 Treasurers managed money west of the Euphrates

👑 Artaxerxes commanded every one of them

🗺️ This decree covered a huge region

📖 Ezra's backing reached far beyond Jerusalem

## ⚖️ An Hundred Talents Of Silver

A talent weighed about seventy five pounds, one of the largest ancient units of weight.

A hundred talents of silver was an almost unimaginable sum for the time.

This single amount alone likely outweighed anything the earlier returnees had raised.

Persia was not offering token support here, but genuine wealth.

⚖️ A talent weighed about seventy five pounds

💰 A hundred talents was an enormous sum

📈 This likely outweighed earlier fundraising totals

📖 Persia offered genuine wealth, not a token gift

## 🍶 An Hundred Measures Of Wheat, And An Hundred Baths Of Wine, And An Hundred Baths Of Oil

A bath measured about six gallons, a common liquid unit in the ancient world.

Wheat, wine, and oil together supplied grain offerings and daily temple needs.

Repeating the number one hundred four times in one verse was not an accident.

The pattern emphasized just how complete and generous this provision truly was.

🍶 A bath measured about six gallons

🌾 Wheat, wine, and oil supplied daily worship

🔢 The number one hundred repeats four times

📖 The pattern emphasized total generosity

## 🧂 Salt Without Prescribing How Much

Every other item on this list came with an exact maximum amount allowed.

Salt alone had no limit placed on it anywhere in the decree.

Salt was cheap, common, and essential for nearly every offering under the law.

Persia's planners simply assumed the temple would always need more of it.

📏 Every other item had a maximum amount

🧂 Salt alone had no limit

🍽️ Salt was cheap but essential for offerings

📖 Persia assumed the need would never stop

## 😨 Why Should There Be Wrath Against The Realm Of The King And His Sons

This exposes Artaxerxes' real motive lying underneath his generosity.

Persian kings widely believed that neglecting a foreign god invited that god's anger.

Funding the temple was partly an act of political self protection.

God still used a partly selfish motive to accomplish His own purpose.

😨 This exposes the king's underlying motive

👑 Persians feared angering a neglected foreign god

🛡️ Funding the temple was partly self protection

📖 God used an imperfect motive anyway

## 💵 It Shall Not Be Lawful To Impose Toll, Tribute, Or Custom

Toll, tribute, and custom were three separate kinds of taxes Persia typically collected.

Temple workers named in this decree were now permanently exempt from all three.

This exemption applied specifically to priests, Levites, singers, porters, and Nethinims.

A tax free temple staff was a significant, lasting financial gift on its own.

💵 Toll, tribute, and custom were three separate taxes

🙏 Temple workers became exempt from all three

👥 The exemption covered every named worship role

📖 Tax freedom was a lasting gift alone

## ⚖️ Set Magistrates And Judges

Artaxerxes gave Ezra authority to appoint an entire legal system for the region.

Magistrates and judges would rule specifically according to God's own law.

This went far beyond religious duties into real governing power.

Ezra returned to Jerusalem as both a spiritual and civil leader at once.

⚖️ Ezra could appoint judges and magistrates

📜 They would rule by God's own law

🏛️ This power went beyond religious duty

📖 Ezra led both spiritually and civilly

## ⚰️ Whether It Be Unto Death, Or To Banishment, Or To Confiscation Of Goods, Or To Imprisonment

This lists four separate legal punishments Ezra's new courts could actually hand down.

Banishment meant permanent exile, forced removal from the community entirely.

Confiscation meant the government seized a person's property and belongings.

Real teeth backed this legal system, not just symbolic religious authority.

⚰️ Death was the harshest listed punishment

🚫 Banishment meant permanent forced exile

📦 Confiscation meant seized property

📖 Real teeth backed this legal system

# Ezra 7:27-28
# 🙌 Ezra Blesses The Lord
---
## ✍️ Blessed Be The Lord God Of Our Fathers

Ezra suddenly shifts from quoting the king's letter to speaking in his own voice.

This is the first place in the book where Ezra writes in first person.

Blessed here means praised and thanked, not a request for a future blessing.

Relief and gratitude break through immediately after all that official language.

✍️ Ezra shifts into his own voice here

🙏 Blessed means praised, not requested

😮 This is his first person section

📖 Gratitude follows all that official language

## 🙌 Which Hath Put Such A Thing As This In The King's Heart

Ezra credits God, not his own persuasion, for Artaxerxes' surprising generosity.

Proverbs elsewhere describes a king's heart as fully open to God's direction.

Ezra genuinely believed God could move even a pagan ruler's decisions.

This conviction shaped how he faced the entire dangerous journey ahead.

🙌 Ezra credited God, not himself

📖 Proverbs describes God directing a king's heart

👑 God can move even pagan rulers

➡️ This belief shaped Ezra's whole journey

## 🏛️ To Beautify The House Of The Lord Which Is In Jerusalem

Beautify meant more than simple maintenance or basic repair work.

The temple was already standing but still needed proper adornment and resources.

Funding worship properly mattered to God beyond mere structural completion.

A finished building was not the same thing as a fully honored one.

🏛️ Beautify means more than basic repair

🏗️ The temple stood but still needed resources

🙏 Proper worship mattered beyond the structure

📖 Finished was not the same as honored

## 🙏 Extended Mercy Unto Me Before The King, And His Counsellors

Ezra needed favor with more than one man to succeed in this mission.

Any one of Persia's seven counsellors could have blocked this entire decree.

Mercy here describes undeserved kindness, not something Ezra had earned outright.

Every official in that room had to agree for this plan to move forward.

🙏 Ezra needed favor with more than one man

👥 Any counsellor could have blocked the decree

🎁 Mercy means undeserved kindness

📖 Everyone in the room had to agree

## 💪 I Was Strengthened As The Hand Of The Lord My God Was Upon Me

This same phrase about God's hand already appeared twice earlier in this chapter.

Ezra directly connects that phrase here to his own inner courage and strength.

Facing a dangerous journey with treasure and no army required real, personal courage.

Ezra says plainly that his courage came from God, not from confidence in himself.

🔁 This phrase repeats a third time here

💪 Ezra links it to his own courage

🛡️ A dangerous journey required real bravery

📖 His courage came from God

## 👪 I Gathered Together Out Of Israel Chief Men To Go Up With Me

This final verse quietly sets up the entire list that opens chapter eight.

Chief men means family and clan leaders willing to lead others on the journey.

Ezra did not travel alone, but assembled a real community around him.

The chapter ends by launching straight into the difficult work still ahead.

👪 This sets up chapter eight's list

🧑 Chief men were family and clan leaders

🚶 Ezra assembled a community, not a solo trip

➡️ The hardest work was still ahead
`.trim();

export const EZRA_SEVEN_PERSONAL_SECTIONS = parseEzraSevenRawNotes(EZRA_SEVEN_RAW_NOTES);
