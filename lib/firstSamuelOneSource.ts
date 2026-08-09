export type FirstSamuelOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelOneRawNotes(rawText: string): FirstSamuelOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 1:${startVerse}` : `1 Samuel 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_ONE_RAW_NOTES = `# FirstSamuel 1:1-3
# 🛖 Elkanah Of Mount Ephraim
---
## 🏔️ Of Mount Ephraim

"Mount Ephraim" does not name one single peak.

It means the hill country that belonged to the tribe of Ephraim.

This region sat in the center of the land, north of Jerusalem.

Elkanah's hometown, Ramathaimzophim, sat inside that hill country.

The story of Samuel begins in ordinary, familiar ground.

Not in a palace or a battlefield.

It begins inside one family's everyday life.

🏔️ Mount Ephraim means hill country

🗺️ It sat north of Jerusalem

📍 Ramathaimzophim was a real town

📖 Samuel's story starts in ordinary life

## 🕎 An Ephrathite

"Ephrathite" does not always mean the same thing in the Bible.

In some verses it points to Bethlehem, also called Ephrathah.

Here it points to something else entirely.

Elkanah's family line traces back to Levi, the priestly tribe.

Levites had no land of their own.

They lived scattered among the other tribes, including Ephraim.

"Ephrathite" here likely means he lived in Ephraim's territory.

It does not mean he was born there.

📍 Ephrathite has more than one meaning

🏙️ It can mean from Bethlehem

🕎 Here it likely points to Levi's line

📖 Every family detail carries a clue

## 👧 Peninnah Had Children, But Hannah Had No Children

Children were not simply a personal joy in this culture.

A family's whole future rested on having sons.

Sons carried on the family name and worked the land.

Peninnah already had that security.

Hannah did not.

That gap between the two women is about to shape this whole chapter.

👶 Children secured a family's future

🌾 Sons carried on land and name

⚖️ Peninnah already had this security

📖 Hannah's emptiness drives this whole story

## 📯 The LORD Of Hosts

"LORD of hosts" is a title for God as commander of Heaven's armies.

"Hosts" means the vast, ordered ranks of angels who serve Him.

This is the first time this exact title appears in the Bible.

Many scholars point to this verse as its very first use.

This title returns again and again through Samuel and the prophets.

God is introduced here as more than a family's blessing giver.

He is introduced as commander of Heaven itself.

📯 LORD of hosts means commander of angels

👼 Hosts means Heaven's ordered armies

🆕 Its first known use in the Bible

📖 God is bigger than one family's story

## 😵 Hophni And Phinehas, The Priests Of The LORD

These two names will matter a great deal later in this book.

Hophni and Phinehas are Eli's own sons.

As priests, they were meant to represent God faithfully to the people.

Right now they simply stand quietly in the background of Hannah's story.

Later chapters show they used their position badly.

Eli's failure to correct them becomes its own tragedy.

Watch how differently these priests turn out.

Compare them to the son Hannah is about to pray for.

⚔️ Hophni and Phinehas are Eli's sons

🕎 They serve as priests at Shiloh

😔 Later chapters show them failing badly

📖 Their failure contrasts with Samuel's future

# FirstSamuel 1:4-8
# 🍽️ A Table Split By Rivalry
---
## 🍖 He Gave To Peninnah His Wife, And To All Her Sons And Her Daughters, Portions

This sacrifice was not burned up completely on the altar.

Much of the meat came back to the family as a shared meal.

"Portions" means the pieces of that meal handed out to each person.

The bigger the portion, the more it showed favor.

Peninnah and her children each received their share that day.

Every plate at that table quietly announced who mattered most.

🍖 Portions were shares of the sacrifice meal

👨‍👩‍👧‍👦 Peninnah's children each received a share

⚖️ Portion size showed favor at the table

📖 Even food carried meaning at Shiloh

## 💗 For He Loved Hannah

Elkanah did not hide his love for Hannah.

He gave her a "worthy portion," a bigger and better share than the rest.

That gift was not about hunger.

It was a public sign of favor, plain for the whole family to see.

Love did not solve Hannah's pain, but it was real.

💗 Elkanah gave Hannah the better share

👀 Everyone at the table could see it

🤍 His love for her was genuine

➡️ Love alone could not fix her grief

## 🚪 But The LORD Had Shut Up Her Womb

Hannah's childlessness is described here as something God allowed, not something she caused.

This same phrase appears elsewhere in the Bible for other women.

Sarah, Rebekah, and Rachel all faced the same struggle.

Each of them later bore a son who mattered greatly to God's larger story.

Hannah's story is about to follow that same pattern.

🚪 God is described as shutting her womb

👵 Sarah and Rebekah faced this too

👶 Rachel faced this before Joseph was born

📖 Barren women often carry God's biggest promises

## 😢 Her Adversary Also Provoked Her Sore

"Adversary" here simply means rival, and it points straight at Peninnah.

"Sore" does not describe physical pain.

It means harshly, again and again, without letting up.

This was not a single unkind comment.

It was a pattern of cruelty that repeated year after year.

😢 Adversary means rival, pointing to Peninnah

🔁 Sore means harshly and repeatedly

📆 This cruelty repeated year after year

📖 Ongoing pain wears differently than one wound

## 🍽️ Therefore She Wept, And Did Not Eat

This happens during what should have been a joyful worship meal.

Hannah cannot eat because her grief has taken over completely.

Everyone else at the table is celebrating.

She sits in the middle of it, unable to join in.

Grief does not wait for a convenient moment to arrive.

🍽️ Hannah cannot eat during the feast

😭 Her grief overtakes a joyful moment

👥 Everyone else celebrates around her

➡️ Grief ignores convenient timing

## 🗣️ Am Not I Better To Thee Than Ten Sons?

Elkanah means this as comfort, not as a dismissal of her pain.

"Ten sons" is not a literal number.

It is a way of saying more than anyone could ask for.

His love is real, but his words cannot fill the gap she feels.

Being loved and being unheard can happen to the same person at once.

🗣️ Elkanah means this as comfort

🔢 Ten sons is not a literal count

🤍 His love for her is genuine

📖 Comfort and being unheard can coexist

# FirstSamuel 1:9-11
# 🙏 Hannah's Vow Before The LORD
---
## 🕍 Eli The Priest Sat Upon A Seat By A Post Of The Temple Of The LORD

This does not mean Solomon's Temple in Jerusalem.

That temple would not be built for about a century after this scene.

The building here was the tabernacle, a tent based place of worship at Shiloh.

Scripture sometimes calls this tent structure a "temple" because it served the same purpose.

Eli's seat by the doorpost marked him as the one in charge there.

🕍 Temple here means the tabernacle

⛺ It was tent based, not stone

📍 Shiloh was where it stood

📖 The word can shift with the building

## 😞 She Was In Bitterness Of Soul

"Bitterness of soul" means a deep ache that goes beyond ordinary sadness.

This is grief that has been building for years, not a single bad day.

Hannah's pain has finally reached its breaking point.

She turns that pain into prayer instead of staying silent.

Turning to God does not require having the right words first.

😞 Bitterness of soul means deep ache

📆 Years of pain reach a breaking point

🙏 She turns her pain into prayer

➡️ Prayer does not require perfect words

## 🙇 Look On The Affliction Of Thine Handmaid

"Handmaid" is a humble way of naming herself as God's servant.

Hannah is not demanding anything from God.

She is asking Him to notice her.

It is the same hope a servant has toward a master who cares.

Her vow grows out of respect, not a bargain forced on God.

🙇 Handmaid means a humble servant

👀 She asks God to notice her

🤝 Her request comes from respect

📖 Prayer can be a plea, not a demand

## ✂️ There Shall No Razor Come Upon His Head

This is the language of a Nazirite vow, described later in Numbers chapter six.

Uncut hair was the visible sign of that vow.

It marked a person as set apart for God's service in a special way.

Hannah is promising this for a son she does not even have yet.

She is planning his whole life before he is even born.

✂️ Uncut hair marked a Nazirite vow

📜 Numbers six describes this same vow

🕎 It meant being set apart for God

📖 Hannah plans his life before his birth

## 🎁 Then I Will Give Him Unto The LORD All The Days Of His Life

This vow is not for a season.

It is not until he turns a certain age either.

Hannah promises her future son to God for his entire life.

Most vows in this culture had limits or set time periods.

Hers has none.

🎁 Hannah's vow covers his whole life

⏳ Most vows had limits or time periods

🚫 Hers had no limit at all

📖 She gives away her most wanted gift

# FirstSamuel 1:12-18
# 😳 Mistaken For Drunk
---
## 👁️ Eli Marked Her Mouth

"Marked" means Eli was watching her closely.

He was not just glancing her way.

He was studying her, trying to make sense of what he saw.

What he saw confused him completely.

👁️ Marked means watching closely

🤔 Eli studies her carefully

❓ Her behavior confuses him

➡️ Watching does not always lead to understanding

## 🤫 Only Her Lips Moved, But Her Voice Was Not Heard

Silent prayer was unusual in this culture.

Most prayers at that time were spoken out loud for others to hear.

Hannah's prayer is different.

It comes from a grief too deep for a normal, public prayer.

Her silence is not disrespect toward God.

It is the sound of a private pain finally breaking open.

🤫 Silent prayer was unusual then

📢 Most prayers were spoken aloud

💔 Hers came from private, deep grief

📖 Silence can hold real prayer

## 😵 Eli Thought She Had Been Drunken

The priest completely misreads what he is looking at.

He assumes the worst instead of asking a gentle question first.

This is not the last time in this book that Eli misjudges what is right in front of him.

Even godly leaders can get it wrong.

😵 Eli assumes she is drunk

❌ He misreads what he sees

👴 Eli misjudges more than once in this book

📖 Even godly leaders can be wrong

## 😠 A Daughter Of Belial

"Belial" means worthless or wicked.

Calling someone a daughter of Belial was a serious insult, not a mild scolding.

Eli accuses Hannah of exactly the kind of behavior a priest should never tolerate at the tabernacle.

His words land far harder than the situation deserves.

😠 Belial means worthless or wicked

⚠️ This was a serious accusation

🕍 Eli feared disorder at the tabernacle

📖 His harsh words missed the real story

## 🍷 I Have Drunk Neither Wine Nor Strong Drink, But Have Poured Out My Soul Before The LORD

"Strong drink" refers to a fermented beverage stronger than ordinary wine.

Hannah denies both, calmly and directly.

"Poured out my soul" means she held nothing back in her prayer.

Every bit of her fear, grief, and hope spilled out before God.

That is a very different picture than the one Eli assumed.

🍷 Strong drink means a stronger fermented drink

🙅 Hannah denies both, calmly

💧 Poured out her soul means total honesty

📖 Her prayer held nothing back

## 🕊️ Go In Peace: And The God Of Israel Grant Thee Thy Petition

Eli's tone shifts completely once he understands the truth.

"Petition" means the specific request Hannah just prayed.

Eli does not know the exact words of her vow.

He blesses her anyway, trusting that her request was sincere.

A leader who first misjudged her now sends her away with hope.

🕊️ Eli's tone shifts to blessing

📜 Petition means her specific request

🙏 He blesses without knowing the details

➡️ Misjudgment can still turn into grace

## 🙂 Her Countenance Was No More Sad

"Countenance" means the look on someone's face, especially their mood.

Nothing has actually changed yet.

Hannah still has no child.

Her peace comes before her prayer is even answered.

That kind of peace is trust, not proof the answer already came.

🙂 Countenance means the look on a face

⏳ Nothing has changed yet

🕊️ Her peace arrives before the answer does

📖 Trusting God can start before the answer comes

# FirstSamuel 1:19-23
# 👶 The LORD Remembered Her
---
## 💑 Elkanah Knew Hannah His Wife

"Knew" here is the Bible's gentle way of describing a husband and wife coming together.

It does not mean simple recognition.

The Bible often uses ordinary words to speak carefully about private moments.

This same word appears throughout the Old Testament for married couples.

💑 Knew describes marital intimacy

📖 The Bible speaks of it gently

🔁 This word appears often in the Old Testament

➡️ Careful words can still tell the full story

## 🙌 The LORD Remembered Her

God did not forget Hannah and then suddenly recall her.

"Remembered" in the Bible usually means God acted on a promise or a need.

The exact same phrase describes what happened for Rachel back in Genesis.

Rachel's remembering led to the birth of Joseph.

Hannah's remembering is about to lead to the birth of Samuel.

🙌 Remembered means God acted, not recalled

🔁 The same phrase describes Rachel in Genesis

👶 Rachel's remembering led to Joseph's birth

📖 Hannah's remembering leads to Samuel's birth

## 📛 She Called His Name Samuel, Saying, Because I Have Asked Him Of The LORD

Names in the Bible often explain something about the story behind them.

Hannah ties the name Samuel directly to her own words, "asked of the LORD."

Scholars are not fully certain of the name's exact original meaning.

What is certain is the connection Hannah herself makes to her prayer.

Every time his name was said aloud, it repeated her answered prayer.

📛 Names in the Bible often explain a story

🙏 Samuel connects to being asked of God

❓ Scholars debate the exact meaning

📖 His name repeated her answered prayer

## 🏠 Hannah Went Not Up

Every other member of the family goes to the yearly sacrifice.

Hannah stays home instead.

She already has a plan for how to keep her vow.

Staying home here is not disobedience.

It is preparation for something bigger.

🏠 Hannah stays home this year

👪 The rest of the family goes

📋 She is already planning ahead

➡️ Staying back is not disobedience

## 🍼 Until The Child Be Weaned

Weaning in the ancient world happened later than it usually does today.

A child was often close to two or three years old before being weaned.

Hannah is choosing to keep her son close for those first years.

Only after that will she bring him to fulfill her vow.

🍼 Weaning happened around age two or three

👶 Hannah keeps him close during those years

📅 The vow waits until weaning is finished

📖 She gives him fully, but not too soon

## 🤝 Only The LORD Establish His Word

"His word" points back to Hannah's own vow from earlier in this chapter.

Elkanah is not making his own separate promise here.

He is agreeing to support the vow his wife already made.

A husband backing his wife's promise to God carries real weight in this culture.

🤝 His word means Hannah's own vow

👨‍👩‍👧 Elkanah supports her promise

✅ He does not add his own terms

📖 Support from home makes the vow possible

# FirstSamuel 1:24-28
# 🕊️ Lent To The LORD
---
## 🐂 Three Bullocks, And One Ephah Of Flour, And A Bottle Of Wine

"Ephah" was a dry measurement, close to a large basket of flour.

This offering was far larger than a small family usually brought.

Three bullocks alone would have been a costly gift.

Hannah is not giving God the minimum required.

She is giving generously, out of real gratitude.

🐂 Bullocks were a costly offering

🌾 An ephah was a large basket of flour

🍷 Wine completed the offering

📖 Hannah gives generously, not minimally

## 👦 The Child Was Young

Samuel is likely only two or three years old at this point.

He is old enough to be weaned, but still very small.

Hannah is not waiting until he is grown to let him go.

She keeps her promise as soon as it can honestly be kept.

👦 Samuel is likely two or three

🍼 He is newly weaned, not grown

⏳ Hannah keeps her word right on time

📖 A promise kept early still counts fully

## 🗣️ I Am The Woman That Stood By Thee Here, Praying Unto The LORD

Hannah reminds Eli of the exact moment from earlier in this chapter.

This is the same spot where he once mistook her for being drunk.

Now she returns to that same place with the son she prayed for.

The scene has come full circle.

🗣️ Hannah recalls their earlier meeting

📍 It happened in this same place

👶 She returns with the son she prayed for

📖 The story comes full circle

## 🎁 I Have Lent Him To The LORD

"Lent" and "asked" share a close connection in the original Hebrew wording.

Many scholars point to this wordplay as the reason for Samuel's name.

Hannah is not describing a temporary loan.

She means he now belongs fully to God's service.

The word choice itself carries the whole point of her prayer.

🎁 Lent connects to the word asked

🔤 Scholars link this to Samuel's name

🕎 Samuel now belongs to God's service

📖 Her wordplay carries her whole prayer

## ♾️ As Long As He Liveth He Shall Be Lent To The LORD

Hannah's vow from earlier in the chapter is now complete.

She promised a lifetime, and she delivers exactly that.

Most parents in this culture kept their children close for many more years.

Hannah gives hers up while he is still small.

She trusted God with the very thing she wanted most.

♾️ Her vow covers his entire life

✅ Hannah keeps her promise in full

👋 She gives him up while still young

📖 She trusts God with her greatest gift
`.trim();

export const FIRST_SAMUEL_ONE_PERSONAL_SECTIONS = parseFirstSamuelOneRawNotes(FIRST_SAMUEL_ONE_RAW_NOTES);
