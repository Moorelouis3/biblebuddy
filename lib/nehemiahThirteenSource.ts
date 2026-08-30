export type NehemiahThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahThirteenRawNotes(rawText: string): NehemiahThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 13:${startVerse}` : `Nehemiah 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Nehemiah 13 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_THIRTEEN_RAW_NOTES = `# Nehemiah 13:1-3
# 🚫 Separating From The Nations
---
## 📜 They Read In The Book Of Moses

"The book of Moses" means the Law, the first five books that Moses wrote.

This was not a new law being introduced for the first time.

It was an old command, read aloud again in public.

Nehemiah's whole reform effort grows out of rereading Scripture, not a new idea of his own.

📜 Book of Moses means the Law

🔁 An old command, not a new one

🗣️ Read aloud in public again

📖 Reform grew from Scripture itself

## 🗺️ The Ammonite And The Moabite Should Not Come Into The Congregation Of God

This law barred Ammonites and Moabites from full membership in Israel's worship community.

Ammon and Moab were nations east of the Jordan River, descended from Lot.

The exclusion answered a specific history, not a blanket judgment on every person born there.

Ruth the Moabite, generations earlier, had already been welcomed into Israel through her faith.

🗺️ Ammon and Moab sat east of Jordan

🚫 Barred from the worship community

📜 Tied to a specific history

📖 Ruth shows the rule was not absolute

## 🔮 They Hired Balaam Against Them

Balaam was a prophet hired to curse Israel as they traveled toward the promised land.

The full story is told back in Numbers chapters twenty two through twenty four.

Moab and Ammon paid him to speak a curse over God's people.

🔮 Balaam was a hired prophet

💰 Payment was made for a curse

📚 Numbers 22 tells the story

📖 They tried to curse what God would bless

## 🚫 Turned The Curse Into A Blessing

God did not merely block Balaam's curse.

He made Balaam speak a blessing over Israel instead, against Balaam's own wishes.

This memory is exactly why Ammon and Moab stayed excluded for generations.

God sides with His people, often in ways they do not expect.

🚫 The curse never landed

🗣️ Balaam blessed Israel instead

🔁 Remembered for generations

📖 God protects His people

## 👥 They Separated From Israel All The Mixed Multitude

"Mixed multitude" means the foreigners living among the Israelites who were not part of the covenant.

Hearing the law read aloud moved the people to actually act on it.

This separation mirrored what happened generations earlier under Ezra.

Scripture read in public is meant to change behavior, not just inform.

👥 Mixed multitude means outside foreigners

🗣️ Hearing led to action

🔁 Echoes Ezra's earlier reform

📖 Scripture is meant to change behavior

# Nehemiah 13:4-9
# 🏠 Clearing Out Tobiah's Chamber
---
## 👑 Eliashib The Priest, Having The Oversight Of The Chamber

Eliashib was the high priest who served during much of Nehemiah's time in Jerusalem.

He had official charge over the storage chambers inside the temple.

Those rooms held the supplies that kept temple worship running every day.

Putting a relative in charge of sacred storage gave him real power over temple resources.

👑 Eliashib was the high priest

🏛️ He oversaw the temple storage rooms

📦 Those rooms supplied daily worship

📖 That oversight carried real power

## 🤝 Was Allied Unto Tobiah

Tobiah was an Ammonite official who had opposed rebuilding Jerusalem's wall from the very beginning.

He is named as an enemy as far back as chapter two of this book.

Eliashib was tied to him by marriage through one of Tobiah's own family connections.

An old enemy of the wall project had quietly gained a family tie inside the temple itself.

⚔️ Tobiah opposed the wall project

📜 Named as an enemy since chapter two

🤝 Related to Eliashib by marriage

📖 An old enemy gained inside access

## 📦 A Great Chamber

This storage room once held everything that kept daily worship running.

Grain and wine offerings, frankincense for the altar, and sacred vessels all sat inside it.

It also held the tithes owed to the Levites, the singers, and the gatekeepers.

Clearing it all out for one man's guest room was a serious breach.

📦 The chamber held worship supplies

🔄 Everything was cleared out for Tobiah

⚖️ A serious breach of trust

📖 Worship supplies were pushed aside

## 📆 The Two And Thirtieth Year Of Artaxerxes

This dates Nehemiah's trip back to the king twelve years after he first arrived in Jerusalem.

Nehemiah had originally come as governor with royal permission and a set term of service.

He returned to the Persian court, then later came back to Jerusalem a second time.

The corruption in the temple took hold during the gap while he was away.

📆 Twelve years after his first arrival

🏛️ Nehemiah had served as governor

🔁 He returned to Persia, then came back

📖 Corruption grew while he was gone

## 📝 Obtained I Leave Of The King

"Leave" here means official permission, not vacation time.

Nehemiah needed the Persian king's approval before he could travel back to Jerusalem at all.

Even a trusted governor answered to a higher authority.

📝 Leave means official permission

🏛️ He needed the king's approval

👑 Even a governor answered upward

📖 Authority still answers to authority

## 👀 Understood Of The Evil That Eliashib Did For Tobiah

Nehemiah had been away from Jerusalem for some length of time.

In that gap, the high priest quietly handed sacred space to an old enemy of God's people.

Corruption did not announce itself loudly.

It happened in the absence of watchful leadership.

👀 Nehemiah had been away

🤫 The corruption happened quietly

🚪 Sacred space went to an enemy

📖 Leadership's absence let it happen

## 😢 It Grieved Me Sore

"Sore" here means severely, not a description of physical pain.

Nehemiah felt this news as a deep, personal wound.

His reaction shows how seriously he took the misuse of God's house.

😢 Sore means severely, not painfully

💔 Nehemiah felt this deeply

🏛️ He took God's house seriously

📖 Real leaders feel real grief

## 🚪 I Cast Forth All The Household Stuff Of Tobiah Out Of The Chamber

Nehemiah did not quietly ask Eliashib to make a change.

He personally removed every one of Tobiah's belongings from the temple storeroom.

This was a direct, public act, not a private conversation.

Leaders sometimes have to act right away rather than wait for permission to fix what is broken.

🚪 Nehemiah acted himself

📦 He removed Tobiah's belongings personally

👀 This was public, not private

📖 Urgent wrongs need urgent action

## 💧 They Cleansed The Chambers

To "cleanse" meant performing a ceremonial purification, not just sweeping out dust.

The room had been used for something unholy and needed to be set apart again.

Only after that cleansing were the sacred vessels and offerings brought back in.

Restoring order took more than just removing what was wrong.

💧 Cleanse means ceremonial purification

🚫 The room had been made unholy

🔄 Vessels returned only after cleansing

📖 Removing wrong is not enough alone

# Nehemiah 13:10-14
# 💰 Restoring The Levites' Portions
---
## 🌾 The Portions Of The Levites Had Not Been Given Them

"Portions" means the share of food and supplies the Levites were owed for their temple work.

Levites owned no farmland and depended entirely on the tithes of the people.

Without that support, they could not afford to keep serving at the temple.

🌾 Portions means their owed support

🏛️ Levites owned no farmland

💰 They depended on the tithe

📖 No pay meant no service

## 🌱 Fled Every One To His Field

This does not describe the Levites running from an enemy.

It means they had gone back to farming their own land just to survive.

Unpaid temple workers had no other way to eat.

Worship itself had quietly ground to a halt while leaders were not paying attention.

🌱 They returned to farming, not danger

💔 Unpaid workers had no other choice

🛑 Temple worship had quietly stopped

📖 Neglect can empty out worship

## 🗣️ Why Is The House Of God Forsaken

Nehemiah confronted the leaders directly with this question.

"Forsaken" means abandoned or left without care.

The temple had not been destroyed, just neglected until it emptied out on its own.

Nehemiah's question forced the rulers to own a failure they had let happen.

🗣️ Nehemiah confronted the rulers directly

🏛️ Forsaken means abandoned

😶 Neglect, not destruction, emptied it

📖 Leaders were made to own the failure

## 🌾 The Tithe Of The Corn And The New Wine And The Oil

These three items made up the core of what Israel's farmers owed as their tithe.

Grain was the main food crop, and new wine came fresh from the harvest.

Olive oil was used for food, light, and worship all at once.

Bringing these back in restored the food supply that kept the Levites at the temple.

🌾 Grain, wine, and oil made the tithe

🔄 The people brought it back in

🏛️ This restored the Levites' food

📖 Giving returned, and service followed

## 🗂️ I Made Treasurers Over The Treasuries

"Treasurers" means trusted officials placed in charge of distributing the stored tithes honestly.

Nehemiah named four specific men by name for this role.

Naming them personally made each one accountable if anything went wrong again.

🗂️ Treasurers managed the stored tithes

👤 Four men were named directly

⚖️ Naming names created accountability

📖 Good systems need named people

## 🤝 They Were Counted Faithful

"Faithful" here means reliable and trustworthy with something valuable.

Nehemiah chose these men specifically because of their character, not their rank.

The same corruption that let Eliashib favor Tobiah could happen again without trustworthy leaders.

🤝 Faithful means trustworthy

👤 Character mattered more than rank

🔁 Trustworthy leaders prevent repeat corruption

📖 Character is a real qualification

## 🙏 Wipe Not Out My Good Deeds

Nehemiah asks God directly to remember what he has done for the temple.

This is not pride, it is an honest prayer from a tired leader.

He repeats a version of this same request several times across this chapter.

Faithful work, even when thankless, still matters to God.

🙏 Nehemiah asks God to remember

😮‍💨 An honest prayer, not pride

🔁 He repeats this request often

📖 Thankless work still matters to God

# Nehemiah 13:15-22
# 🛑 Enforcing The Sabbath
---
## 🍇 Treading Wine Presses On The Sabbath

The sabbath was meant to be a full day of rest from ordinary labor.

Treading a wine press meant stomping grapes by foot to crush out their juice.

Doing that kind of hard physical work on the sabbath broke the command directly.

🍇 Wine presses crushed grapes by foot

🛑 Sabbath meant a full day of rest

⚖️ This broke the command directly

📖 Rest was meant to be kept

## 🫏 Lading Asses

"Lading" simply means loading goods onto an animal to carry.

Donkeys were the standard way to transport heavy loads in this culture.

Loading pack animals for a day of selling turned the sabbath into an ordinary workday.

🫏 Lading means loading an animal

📦 Donkeys carried heavy goods

🛑 This turned rest into work

📖 Convenience does not excuse disobedience

## 🗣️ I Testified Against Them

"Testified" here means giving a formal, public warning, not just offering an opinion.

Nehemiah confronted this behavior directly and on the spot.

He did not wait for someone else to handle it.

🗣️ Testified means a formal warning

👀 Nehemiah confronted it directly

🚫 He did not wait for others

📖 Leaders address wrong when they see it

## 🌊 Men Of Tyre

Tyre was a wealthy trading city on the Mediterranean coast, outside Israel entirely.

Foreign merchants had settled inside Jerusalem and kept selling fish and goods every single day.

Outsiders were not bound by Israel's sabbath law, but their presence tempted Israelites to break it anyway.

🌊 Tyre was a coastal trading city

🐟 Its merchants sold fish and goods

🧲 Their presence tempted Israelites to sin

📖 Outside influence still shaped behavior inside

## 🗣️ What Evil Thing Is This That Ye Do

Nehemiah does not soften his language here.

He calls sabbath breaking exactly what it is, evil, not a minor oversight.

The nobles of Judah, the leaders themselves, were the ones he confronted.

Strong wrong sometimes needs strong, plain words.

🗣️ Nehemiah called it evil plainly

👑 He confronted the nobles directly

🚫 Not treated as a minor issue

📖 Clear wrong needs clear words

## 🏛️ Did Not Our God Bring All This Evil Upon Us

Nehemiah points back to Israel's exile to Babylon generations earlier.

That exile came as judgment for the nation's repeated disobedience, sabbath breaking included.

He warns that repeating the same sin could bring the same kind of judgment again.

History was not just a memory, it was a live warning.

🏛️ Points back to the exile in Babylon

⚖️ That exile came as judgment

🔁 Repeating sin risked repeating judgment

📖 History served as a live warning

## 🚪 I Commanded That The Gates Should Be Shut

Nehemiah used his own authority as governor to physically stop the problem.

He had the city gates closed before each sabbath began and kept shut until it ended.

Preaching alone was not enough, he backed it with an enforceable rule.

🚪 Gates were shut before the sabbath

👮 Guards were stationed to enforce it

🗣️ Words alone were not enough

📖 Leadership sometimes means enforcement

## 🏕️ Why Lodge Ye About The Wall

Merchants tried to get around the closed gates by camping just outside the city wall.

They were waiting to rush in the moment the gates reopened.

Nehemiah threatened real physical consequences if they kept trying this workaround.

After that warning, they stopped coming on the sabbath entirely.

🏕️ Merchants camped outside the wall

🚪 They waited to rush in

⚠️ Nehemiah threatened real consequences

📖 A clear threat ended the workaround

## 🛡️ I Commanded The Levites That They Should Cleanse Themselves

Nehemiah put the Levites themselves in charge of guarding the gates on the sabbath.

Using temple workers, not ordinary soldiers, tied the rule directly to worship.

He closes this section with the same kind of prayer he has prayed before.

Protecting the sabbath was ultimately an act of mercy, not punishment.

🛡️ Levites were put in charge of gates

🏛️ This tied enforcement to worship

🙏 Nehemiah prays again for remembrance

📖 Protecting rest was an act of mercy

# Nehemiah 13:23-29
# 💔 Confronting The Mixed Marriages
---
## 🗺️ Jews That Had Married Wives Of Ashdod, Of Ammon, And Of Moab

Ashdod, Ammon, and Moab were neighboring nations that worshipped other gods.

The concern was never about ethnicity itself.

It was about households drifting away from worshipping the God of Israel.

Ruth the Moabite had already shown that a foreigner who embraced Israel's faith was fully welcomed.

🗺️ Three neighboring, idol worshipping nations

❤️ The concern was faith, not ethnicity

🏠 Households were drifting from God

📖 Ruth shows faith mattered most

## 🗣️ Their Children Spake Half In The Speech Of Ashdod

These children could no longer speak the language their own people used to worship and read Scripture.

Language loss meant something deeper than convenience.

A generation raised this way would not fully understand their own covenant with God.

Identity was quietly slipping away one household at a time.

🗣️ Children lost their own language

📜 That language carried Scripture

🏠 Covenant understanding was slipping away

📖 Identity erodes quietly, generation by generation

## 😠 I Cursed Them, And Smote Certain Of Them, And Plucked Off Their Hair

This was a public, physical punishment, not a private scolding.

Cursing and hair pulling were recognized ways in this culture to publicly disgrace someone.

Nehemiah's anger here matches how seriously he viewed this specific sin.

The punishment looks harsh to modern eyes, but it was a known cultural practice, not random violence.

😠 This was public shaming, not a chat

✊ Hair pulling disgraced someone publicly

🔥 It matched how serious he saw this

📖 A known practice, not random violence

## 👑 Did Not Solomon King Of Israel Sin By These Things

Nehemiah points to Solomon as the clearest warning in Israel's whole history.

Solomon was the wisest and most blessed king Israel ever had.

Foreign wives still pulled his heart toward other gods later in his life.

If that much wisdom and blessing could not protect Solomon, no one could assume they were safe either.

👑 Solomon was Israel's wisest king

💔 Foreign wives still turned his heart

⚠️ Even blessing does not guarantee safety

📖 No one is above this danger

## 🗺️ Outlandish Women Cause Him To Sin

"Outlandish" here simply means foreign, from outside the land, not strange or bizarre.

The word describes where these women were from, not their character.

Solomon's failure became the strongest example Nehemiah could point to.

🗺️ Outlandish means foreign born

👤 It describes origin, not character

👑 Solomon became the clearest warning

📖 History's worst example still teaches

## ⚔️ Son In Law To Sanballat The Horonite

Sanballat had fiercely opposed rebuilding Jerusalem's wall from the very start of this book.

One of the high priest's own grandsons had married into that enemy's family.

An old enemy of the entire rebuilding project now had a direct family tie to the priesthood itself.

⚔️ Sanballat opposed the wall from the start

👴 Eliashib's grandson married his family

🏛️ An old enemy reached the priesthood

📖 Compromise had crept in at the top

## 🚪 Therefore I Chased Him From Me

Nehemiah removed this man from priestly service right away.

He closes with one more personal prayer asking God to remember what was defiled.

"Defiled" means made unholy, unfit for sacred use.

Protecting the priesthood mattered more to Nehemiah than protecting one family's position.

🚪 The man was removed right away

🙏 Nehemiah prays once more

🚫 Defiled means made unholy

📖 Holiness mattered more than position

# Nehemiah 13:30-31
# 🙏 Nehemiah's Closing Prayer
---
## 🧹 I Cleansed Them From All Strangers

This one sentence summarizes every reform covered across this entire chapter.

Foreign influence, broken worship supply, and neglected sabbath keeping were all addressed.

Nehemiah restored order, one broken piece at a time.

🧹 One sentence summarizes the chapter

🔄 Worship, supply, and rest were restored

🧩 Order came back piece by piece

📖 Faithful work often looks like cleanup

## 🪵 The Wood Offering, At Times Appointed

The "wood offering" supplied the fuel needed to keep the altar's fire burning continuously.

Without an organized wood supply, the daily sacrifices could not even be offered.

Nehemiah made sure this practical, unglamorous need had a fixed schedule.

🪵 Wood offering fueled the altar fire

🔥 Sacrifices needed that fire burning

📅 Nehemiah gave it a fixed schedule

📖 Unglamorous needs still matter to God

## 🙏 Remember Me, O My God, For Good

This is the very last line Nehemiah writes in this entire book.

He does not end with a grand victory speech.

He ends with a quiet, personal request to be remembered by God.

The whole book closes the way it began, with one man's honest prayer.

📖 The book's final line

🙏 A quiet, personal request

🔁 Mirrors how the book began

➡️ Faithful work ends in prayer, not applause
`.trim();

export const NEHEMIAH_THIRTEEN_PERSONAL_SECTIONS = parseNehemiahThirteenRawNotes(NEHEMIAH_THIRTEEN_RAW_NOTES);
