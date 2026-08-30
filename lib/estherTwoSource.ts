export type EstherTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherTwoRawNotes(rawText: string): EstherTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 2:${startVerse}` : `Esther 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Esther 2 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_TWO_RAW_NOTES = `# Esther 2:1-4
# 🔍 The Search For A New Queen Begins
---
## 🗓️ After These Things

The phrase after these things marks a gap in the story, not the very next moment.

Many scholars believe several years passed between chapter one and this verse.

Ahasuerus spent much of that time waging a costly war against Greece.

The chapter jumps straight past that whole campaign without mentioning it at all.

🗓️ After these things means years passed

⚔️ Ahasuerus was away fighting Greece

📖 The war is never even mentioned

➡️ Esther's story resumes after the gap

## 🔥 When The Wrath Of The King Was Appeased

"Appeased" means his anger had finally cooled down.

The fury from chapter one over Vashti's refusal had faded with time.

A calmer king now had room to feel something besides rage.

That calm sets up the very next line of the verse.

🔥 Appeased means calmed down

😤 His fury had faded with time

🧠 A calmer king could feel more

📖 That calm opens the next thought

## 💭 He Remembered Vashti, And What Was Decreed Against Her

This does not say the king wanted Vashti back.

The text only says her memory returned to his mind.

Persian law already made her removal permanent and unchangeable.

Whatever regret he felt could not undo his own decree.

💭 He simply remembered her

🚫 The text never says he wanted her back

📜 Persian law made her removal permanent

📖 Regret could not undo his decree

## 👥 Fair Young Virgins Sought For The King

This was not a private search for a single new wife.

The king's own servants proposed a kingdom wide search for candidates.

Every province was expected to send its most beautiful young women.

This system functioned like a national search built entirely around one man's approval.

👥 Servants proposed the whole plan

🌍 Every province took part

👑 Selection depended on one man

📖 It replaced Vashti through competition

## 🏯 The House Of The Women, Unto The Custody Of Hege

The house of the women was a separate section of the palace.

It existed only for the king's wives and candidates.

Hege was a eunuch who managed and guarded every woman housed there.

His name later appears under the spelling Hegai.

🏯 A separate palace wing for women

👤 Hege managed and guarded them

🚫 Eunuchs threatened no bloodline claim

📖 His name is later spelled Hegai

## 💧 Let Their Things For Purification Be Given Them

"Purification" here means a lengthy program of beauty treatments, not a religious cleansing.

Every candidate received oils, perfumes, and cosmetics paid for by the crown.

This process functioned as preparation for a single night with the king.

The scale of it shows how seriously this search was taken.

💧 Purification meant beauty treatments

👑 The crown paid for everything

🌙 It prepared women for one night

📖 The scale shows how serious this was

## 👑 The Maiden Which Pleaseth The King Be Queen Instead Of Vashti

This means one woman out of many would become queen.

Nothing about birth, family status, or nationality mattered here.

Only the king's own preference decided who would reign beside him.

This detail matters because the next queen will come from an unexpected place.

👑 Any candidate could become queen

🚫 Birth and status did not matter

❤️ Only personal preference decided

📖 This opens the door for Esther

# Esther 2:5-7
# 👤 Mordecai And Esther Are Introduced
---
## 🕎 A Certain Jew, Whose Name Was Mordecai

Mordecai is introduced here as a Jewish man living inside the Persian capital.

His family line traces back through Jair, Shimei, and Kish, all the way to the tribe of Benjamin.

Naming three generations of ancestors was a normal way to establish someone's identity in this culture.

This lineage also connects Mordecai to Israel's first king, Saul, who came from the same tribe.

🕎 Mordecai was a Jewish exile

📜 His lineage traces to Benjamin

👑 That tribe also produced King Saul

📖 His identity is fully established here

## ⚔️ Carried Away From Jerusalem With The Captivity

Mordecai's family had been taken from Jerusalem generations earlier as war captives.

King Nebuchadnezzar of Babylon conquered Judah and forced many Jews into exile.

That event happened alongside King Jeconiah, one of Judah's last kings before the fall.

Mordecai's family history was shaped by a national tragedy before he was even born.

⚔️ Nebuchadnezzar conquered Judah

🏙️ Jeconiah was exiled alongside the people

🕎 Mordecai's family was taken captive

📖 His story starts inside a tragedy

## 🌿 He Brought Up Hadassah, That Is, Esther

Hadassah was Esther's original Hebrew name.

It means myrtle, a small fragrant shrub.

Esther was likely her adopted Persian name, used once she entered the king's world.

Living under two names hints at the double life she is about to lead.

🌿 Hadassah means myrtle

🇮🇱 It was her Hebrew name

👑 Esther was her Persian name

📖 Two names foreshadow a double life

## 👨‍👩‍👧 His Uncle's Daughter

Esther was Mordecai's cousin, not his sister or niece as some readers assume.

Both of her parents had died, leaving her without immediate family.

Losing both parents left a young woman especially vulnerable in this culture.

Family ties like this mattered enormously for protection in the ancient world.

👨‍👩‍👧 Esther was Mordecai's cousin

💔 Both her parents had died

🛡️ Orphans had little protection

📖 Family ties mattered for survival

## 🤝 Mordecai Took Her For His Own Daughter

Mordecai formally adopted Esther after her parents died.

He raised her as his own child.

He did not treat her as a distant relative he merely watched over.

That decision protected Esther and gave her a stable home inside a foreign empire.

🤝 Mordecai adopted Esther

🏠 He raised her as his own

🛡️ It gave her protection and stability

📖 This loyalty shapes the whole story

# Esther 2:8-11
# 🏯 Esther Enters The King's House
---
## 🚪 Esther Was Brought Also Unto The King's House

Esther did not volunteer for this competition.

The text simply says she was brought, the same passive language used for every candidate.

Young women in this situation had little real choice in the matter.

Esther enters the story as someone swept into events far larger than herself.

🚪 Esther was brought, not asked

📜 The same word describes every candidate

🚫 She had little real choice

📖 Larger events swept her along

## ✨ The Maiden Pleased Him, And She Obtained Kindness Of Him

Hegai is the same official introduced earlier under the spelling Hege.

Something about Esther earned his favor immediately, though the text never explains exactly what.

That early favor shaped every advantage she received from this point forward.

One official's goodwill could change the entire trajectory of a candidate's chances.

👤 Hegai favored Esther right away

🤔 The text does not explain why

📈 Early favor shaped her chances

📖 One man's goodwill changed everything

## ✅ Seven Maidens, Which Were Meet To Be Given Her

"Meet" is an old word meaning suitable or fitting.

Hegai assigned Esther seven personal attendants, chosen specifically for her.

He also moved her into the best location within the house of the women.

These were not standard privileges given to every candidate equally.

✅ Meet means suitable or fitting

👥 Seven attendants were chosen for her

🏆 She got the best location

📖 These were special privileges

## 🤫 Esther Had Not Shewed Her People Nor Her Kindred

"Shewed" is an old spelling of showed.

Esther kept her Jewish identity a secret from everyone in the palace.

Mordecai had specifically instructed her to hide it.

Jewish people were not always safe or welcome inside foreign royal courts.

🤫 Shewed means showed

🕎 Esther hid her Jewish identity

📜 Mordecai ordered the secrecy

📖 Her safety may have required it

## 📢 Mordecai Charged Her That She Should Not Shew It

"Charged" here means Mordecai gave Esther a firm, direct command.

This was not a casual suggestion made once and forgotten.

Mordecai still had real authority over Esther even after she entered the palace.

Their bond stayed close even after she left his household.

📢 Charged means firmly commanded

👨‍👧 Mordecai still guided Esther

🏯 His influence reached into the palace

📖 Their bond stayed strong

## 🚶 Mordecai Walked Every Day Before The Court Of The Women's House

Mordecai could not enter the house of the women himself.

Instead he showed up daily just outside it, watching for any news.

That daily habit shows how deeply he cared about what happened to Esther.

A father figure was quietly keeping watch the entire time she was inside.

🚶 Mordecai came daily to check on her

🚪 He could not enter himself

❤️ It showed how much he cared

📖 He kept watch the whole time

# Esther 2:12-14
# ⏳ The Year Long Preparation
---
## 🗓️ After That She Had Been Twelve Months

Every candidate spent a full year in preparation before ever meeting the king.

That is a striking amount of time invested in a single night.

The length of the process shows how much value this culture placed on appearance.

Esther endured this same yearlong process like every other candidate.

🗓️ A full year of preparation

🌙 All for a single night

💄 Appearance mattered enormously here

📖 Esther went through it too

## 🌿 Six Months With Oil Of Myrrh, And Six Months With Sweet Odours

Myrrh was a fragrant resin used as perfume and in cosmetic oils.

"Sweet odours" refers to a separate set of perfumes and spices.

Each half of the year used entirely different substances.

This level of detail shows how elaborate and expensive the whole process really was.

🌿 Myrrh was a fragrant resin

🌸 Sweet odours means perfumes and spices

📅 Each half used different treatments

📖 The process was elaborate and costly

## 🎁 Whatsoever She Desired Was Given Her

Each candidate could request anything she wanted to bring before meeting the king.

Clothing, jewelry, or specific attendants were all fair game for this one request.

What a woman chose to bring likely revealed something about her own taste.

The choice mattered because it was her one real decision in the entire process.

🎁 She could request anything

💍 Clothing and jewelry were common choices

🧠 The choice revealed her judgment

📖 It was her one real decision

## 🏯 She Returned Into The Second House Of The Women

This was a different, separate section from where the candidates first lived.

Shaashgaz managed this second house, which held the king's concubines.

A woman who spent one night with the king but was not chosen moved here.

Her future now depended on whether the king personally requested her by name again.

🏯 A separate house held the concubines

👤 Shaashgaz managed this section

🚪 Most women moved here after one night

📖 Her future depended on being called again

# Esther 2:15-18
# 👑 Esther Becomes Queen
---
## 👤 The Daughter Of Abihail The Uncle Of Mordecai

This verse names Esther's birth father as Abihail.

Abihail was Mordecai's own uncle, which makes Mordecai and Esther first cousins.

Mordecai had adopted her after Abihail's death, as already explained earlier in the chapter.

This detail simply confirms the family relationship stated back in verse seven.

👤 Abihail was Esther's birth father

👨‍👩‍👧 He was Mordecai's uncle

🌳 That makes them first cousins

📖 It confirms verse seven's detail

## 🚫 She Required Nothing But What Hegai Appointed

Unlike other candidates, Esther did not request anything extra before meeting the king.

She trusted Hegai's own judgment about what would please the king most.

That restraint stands out against verse thirteen, where every woman could ask for anything.

Her simplicity may have been exactly what set her apart from the rest.

🚫 Esther requested nothing extra

🤝 She trusted Hegai's judgment

⚖️ This contrasts with other candidates

📖 Simplicity may have set her apart

## ✨ Esther Obtained Favour In The Sight Of All Them That Looked Upon Her

This favor was not limited to one official or one night with the king.

Everyone who encountered Esther inside the palace responded well to her.

That kind of widespread favor is mentioned nowhere else among the other candidates.

The narrator keeps repeating this detail because it matters to the story's outcome.

✨ Everyone favored Esther

👥 Not just one official

🌟 No other candidate gets this praise

📖 The repetition signals its importance

## 📅 In The Tenth Month, Which Is The Month Tebeth

Tebeth was the tenth month on the ancient Hebrew calendar.

It fell in what today spans December and January.

This detail also anchors the timeline to the seventh year of the king's reign.

Chapter one's great feast happened in his third year, meaning about four years had already passed.

📅 Tebeth means December and January

🔢 It was his seventh year as king

⏳ About four years had passed since chapter one

📖 The timeline finally lines up

## 👑 He Set The Royal Crown Upon Her Head, And Made Her Queen Instead Of Vashti

Esther, a Jewish orphan raised in exile, now wore the crown of a mighty empire.

Nothing about her background made this outcome likely.

The phrase instead of Vashti closes the loop opened back in chapter one's decree.

An empire wide search for beauty had quietly become the doorway for a bigger plan.

👑 A Jewish orphan became queen

🌍 Nothing about her background made this likely

🔁 This closes chapter one's storyline

📖 A bigger plan moved through this process

## 🍷 The King Made A Great Feast, Even Esther's Feast

This feast echoes the massive banquet from chapter one, for a very different reason.

The king even granted a release, most likely meaning tax relief for the provinces.

He distributed gifts across the empire to mark the occasion.

A queen chosen through a beauty contest was now being celebrated on an imperial scale.

🍷 A feast echoed chapter one's banquet

💰 A release likely meant tax relief

🎁 Gifts went out across the empire

📖 Esther's rise was celebrated widely

# Esther 2:19-23
# 🗡️ Mordecai Uncovers A Plot
---
## 👥 The Virgins Were Gathered Together The Second Time

This does not describe a second search for queen, since Esther already holds that role.

Many scholars believe this refers to gathering more women into the king's harem.

The king's household kept expanding even after Esther's coronation.

Esther's new title did not end this larger ongoing system.

🚫 Not a second search for queen

👥 Likely more women joined the harem

🏯 The system kept expanding

📖 Esther's crown did not end it

## 🏛️ Mordecai Sat In The King's Gate

Sitting in the king's gate meant Mordecai held an official government position.

City and palace gates functioned as courtrooms and administrative centers in the ancient world.

Mordecai had moved from a private citizen to a man with real access inside the empire.

That new position puts him exactly where he needs to be for what happens next.

🏛️ The gate was where officials worked

📜 Mordecai now held a real position

👤 He gained access to the empire

📖 That access mattered immediately

## 🤫 Esther Had Not Yet Shewed Her Kindred Nor Her People

Esther kept her secret even after becoming queen, not only during the earlier competition.

She continued obeying Mordecai's original instruction long after she no longer had to.

The text compares her obedience now to her obedience as a child in his household.

That consistency reveals real character, not just convenient compliance.

🤫 Her secret continued after the crown

👨‍👧 She still obeyed Mordecai

🧒 Compared to her childhood obedience

📖 Consistency reveals real character

## 🔥 Two Of The King's Chamberlains, Bigthan And Teresh, Were Wroth

"Wroth" means furious, the same word used for the king's own anger in chapter one.

Bigthan and Teresh were palace guards who controlled access to the king's door.

Their anger pushed them toward an assassination plot against Ahasuerus.

The text never explains exactly what made them so furious.

🔥 Wroth means furious

🚪 They guarded the king's door

🗡️ Their anger became a murder plot

📖 Their motive is never explained

## 👂 The Thing Was Known To Mordecai

The text does not explain exactly how Mordecai learned about the plot.

His position at the gate likely gave him access to overheard conversations.

Mordecai chose to act immediately rather than staying silent.

That choice protects the king's life and quietly plants a seed for later in the story.

👂 Mordecai somehow learned of the plot

🏛️ His position likely gave him access

⚡ He chose to act immediately

📖 This plants a seed for later

## 📢 Esther Certified The King Thereof In Mordecai's Name

"Certified" means Esther formally reported and confirmed the information to the king.

She made sure Mordecai received full credit for uncovering the plot.

This is the first time in the book that Esther and Mordecai work together directly.

Their partnership here quietly sets up how they will work together again later.

📢 Certified means formally reported

🏅 Mordecai got the credit

🤝 Their first joint action in the book

📖 It sets up what comes later

## 📜 It Was Written In The Book Of The Chronicles Before The King

Persian kings kept official written records of significant events, including acts of loyalty.

Mordecai's good deed was recorded here, but the king never rewarded him for it at the time.

This record sits quietly unused for years before it becomes suddenly important later in the book.

A small forgotten detail like this ends up saving lives further down the story.

📜 Persian kings kept official records

🏆 Mordecai's deed went unrewarded then

⏳ The record sat unused for years

📖 This detail becomes crucial later
`.trim();

export const ESTHER_TWO_PERSONAL_SECTIONS = parseEstherTwoRawNotes(ESTHER_TWO_RAW_NOTES);
