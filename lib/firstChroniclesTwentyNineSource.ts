export type FirstChroniclesTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyNineRawNotes(rawText: string): FirstChroniclesTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 29:${startVerse}` : `1 Chronicles 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 29 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_NINE_RAW_NOTES = `# FirstChronicles 29:1-2
# 👑 David Announces The Great Work
---
## 👑 Whom Alone God Hath Chosen

Solomon was not David's oldest surviving son.

God alone chose him over his older brothers.

David had already named this choice back in chapter twenty two.

Adonijah had tried to seize the throne before this.

This choice came from God, not from birth order.

👑 God chose Solomon alone

📜 Chapter twenty two named this first

⚔️ Adonijah tried to take the throne

📖 The choice was God's, not birth order

---

## 🧒 Is Yet Young And Tender

Young and tender does not mean a small child.

Solomon was likely a young man, not a boy.

He had no real experience running a kingdom.

David names that risk honestly, out loud, before everyone.

This was a father preparing his son, not hiding the danger.

🧒 Means inexperienced, not literally a child

📈 Solomon was young, not a boy

⚠️ No real experience running a kingdom

📖 David admits the risk openly

---

## 🏛️ The Palace Is Not For Man, But For The LORD God

Palace here does not mean a king's house.

It refers to the temple David is preparing to build.

The word describes something magnificent, fit for a great ruler.

Here that ruler is God, not Solomon.

The whole building exists for God to dwell among His people.

🏛️ Palace here means the temple

👑 It is not a king's house

🌟 Built to be magnificent and grand

📖 It was built for God, not Solomon

---

## ⚱️ The Gold... The Silver... The Brass... The Iron... And Wood

David lists every major building material by name.

Gold, silver, brass, iron, and wood each get named separately.

Brass here means bronze, a mix of copper and tin.

Naming each material shows how complete this provision really was.

Nothing needed for the temple was left out.

⚱️ Every material is named by type

🔶 Brass here means bronze, not modern brass

🧱 Gold, silver, iron, and wood included

📖 Nothing needed was left out

---

## 💎 Onyx Stones... Glistering Stones, And Of Divers Colours

Onyx is a banded gemstone, dark with pale layers.

Glistering means sparkling or shining brightly.

Divers colours is an old way of saying many different colors.

These same gemstones were also used on the priest's garments.

David gathered the rarest materials available to him.

💎 Onyx is a dark banded gemstone

✨ Glistering means sparkling or shining

🌈 Divers colours means many different colors

📖 Only the rarest materials would do

# FirstChronicles 29:3-5
# 💰 David's Personal Gift
---
## ❤️ I Have Set My Affection To The House Of My God

Affection here means deep personal love and devotion.

This is more than simple liking or interest.

David is not describing a small, passing feeling.

He is describing why he gives everything that follows.

❤️ Affection means deep personal devotion

🏠 Aimed at God's house specifically

🙏 More than a passing feeling

📖 This love drives everything he gives

---

## 👛 Of Mine Own Proper Good

Proper good here means David's own personal wealth.

This money is separate from the nation's treasury.

Chapter twenty two already listed what David set aside as king.

This new gift comes from his private fortune instead.

👛 Proper good means personal wealth

🏛️ Separate from the national treasury

📜 Chapter twenty two covered the treasury gift

📖 This gift is personal, not official

---

## ⚖️ Three Thousand Talents Of Gold, Of The Gold Of Ophir

A talent was an ancient unit of weight.

One talent weighed about seventy five pounds.

Three thousand talents of gold is an enormous personal fortune.

Ophir was a distant region famous for producing the finest gold.

Its exact location is still uncertain today.

⚖️ A talent weighed about seventy five pounds

🌍 Ophir was famous for the finest gold

📍 Its exact location remains unknown

📖 This was an enormous personal fortune

---

## 🔥 Seven Thousand Talents Of Refined Silver

Refined means the silver was purified of impurities.

Seven thousand talents added to the three thousand of gold already given.

Together these overlaid the temple walls.

This single gift alone could have funded a kingdom.

🔥 Refined means purified of impurities

🪙 Seven thousand talents of silver given

🧱 Used to overlay the temple walls

📖 One gift, an entire kingdom's wealth

---

## 🔨 By The Hands Of Artificers

Artificers means skilled craftsmen and metalworkers.

They would shape this raw gold and silver into finished objects.

Every craftsman needed real material to work with.

David is not just praying for a temple.

He is funding one with real resources.

🔨 Artificers means skilled craftsmen

🛠️ They shape raw metal into finished objects

💰 David funds the work, not just prays

📖 Real resources back up his prayer

---

## 🙌 Who Then Is Willing To Consecrate His Service

Consecrate means to set something apart for a holy purpose.

David just gave a personal fortune to God's house.

Now he turns to everyone else with a direct question.

He is not asking for money only.

He is asking who else will fully dedicate themselves.

🙌 Consecrate means set apart for God

❓ David asks the people directly

💸 He already gave first, before asking

📖 The question is about devotion, not just money

# FirstChronicles 29:6-9
# 🙌 The People Give Willingly
---
## 👴 The Chief Of The Fathers And Princes Of The Tribes

These titles cover every level of Israel's leadership.

Chief of the fathers means the heads of extended family clans.

Princes of the tribes means the leaders over each of Israel's twelve tribes.

Captains of thousands and hundreds were military commanders.

Every layer of leadership responded to David's challenge.

👴 Chief of the fathers means clan heads

👑 Princes led each of the twelve tribes

⚔️ Captains led the army's divisions

📖 Every leader answered David's call

---

## 🪙 Ten Thousand Drams

A dram was a gold coin, also called a daric.

Darics were minted generations after David actually lived.

Many scholars believe the Chronicler used a coin name his own readers would recognize.

The exact ancient currency David used may have differed.

The huge total still made the point clearly.

🪙 Dram means an ancient gold coin

📜 Darics came after David's own lifetime

✍️ The Chronicler wrote in familiar terms

📖 The total still stuns the reader

---

## ⚖️ One Hundred Thousand Talents Of Iron

These totals are almost impossible to picture today.

One hundred thousand talents of iron alone would weigh millions of pounds.

The numbers are not meant to be counted exactly.

They are meant to show the whole nation held nothing back.

⚖️ Millions of pounds of iron given

🔢 Numbers this large defy exact counting

🇮🇱 The whole nation gave together

📖 Total generosity, not exact accounting

---

## 🕎 By The Hand Of Jehiel The Gershonite

Gershonite means a descendant of Gershon, one of Levi's three sons.

The Levites split into three clans, Gershon, Kohath, and Merari.

Each clan had its own assigned duties in worship.

Jehiel served as a trusted treasurer for these gifts.

🕎 Gershonite means from Gershon's family line

👥 Levites split into three main clans

📦 Jehiel managed the treasure collected

📖 A trusted keeper for a sacred gift

---

## ❤️ With Perfect Heart They Offered Willingly

Perfect heart does not mean sinless or flawless.

It means wholehearted, fully devoted, holding nothing back.

The people gave because they wanted to, not because they were forced.

Their joy was the direct result of that honest motive.

❤️ Perfect heart means wholehearted devotion

🚫 Not sinless, but fully committed

🙌 They gave because they wanted to

📖 Honest motive produced real joy

---

## 😊 David The King Also Rejoiced With Great Joy

David does not celebrate alone at the end of this chapter.

His own joy matches the joy of everyone around him.

A king's generosity had become the whole nation's generosity.

This shared joy sets up the prayer David offers next.

😊 David's joy matched the people's joy

👑 A king's gift became the nation's gift

🔗 Personal generosity spread outward

➡️ This joy leads straight into his prayer

# FirstChronicles 29:10-13
# 🙏 David Blesses The LORD
---
## 👨‍👦 LORD God Of Israel Our Father

Father here does not mean a literal blood ancestor.

It describes God's relationship to the whole nation.

Israel was Jacob's covenant name, given back in Genesis.

Calling God father ties this moment back to that covenant.

👨‍👦 Father means covenant relationship, not bloodline

📜 Israel was Jacob's renamed identity

🤝 Ties this prayer to the old covenant

📖 God is father to the whole nation

---

## 👑 Thine Is The Kingdom... Thou Art Exalted As Head Above All

This exact language became famous far beyond this chapter.

That phrase became part of the Lord's Prayer.

For thine is the kingdom, and the power, and the glory.

Many Bibles add that line at the end of Matthew six.

David's ancient prayer still gets prayed today.

👑 Thine is the kingdom, a source line

🙏 Echoed later in the Lord's Prayer

📜 Matthew six borrows this exact phrase

📖 An ancient prayer still spoken today

---

## 💰 Both Riches And Honour Come Of Thee

Every gift listed earlier in this chapter started with God.

Riches and honour did not come from human skill alone.

David is naming the true source before anyone forgets it.

Even a king's wealth is borrowed, not self made.

💰 Riches and honour trace back to God

🚫 Not from human skill alone

👑 Even a king's wealth is borrowed

📖 God is named as the true source

---

## 💪 In Thine Hand It Is To Make Great, And To Give Strength

This line states a flat theological claim.

Human power does not create itself.

Every strong ruler and every strong nation depends on God for that strength.

Nothing here happened by human effort alone.

💪 Human power does not create itself

👑 Rulers depend on God for strength

🚫 Not by human effort alone

📖 God is the source of all strength

# FirstChronicles 29:14-16
# 🌫️ David's Humility
---
## 👑 But Who Am I, And What Is My People

David just gave away one of the largest personal fortunes in the Bible.

Instead of pride, his very next words are humble.

The most powerful king Israel had known asks who am I.

Real generosity did not make David feel important.

👑 David just gave an enormous personal gift

🙇 His next words are humble, not proud

❓ Who am I becomes his honest question

📖 Generosity did not inflate his pride

---

## 🔁 For All Things Come Of Thee

This line restates the point made earlier in the prayer.

Every talent of gold and silver began as God's own.

David is not claiming credit for any of it.

Even the gift back to God was God's first.

🔁 Restates the earlier point again

💰 Every talent began as God's own

🚫 David claims no credit for it

📖 The gift was God's before it was David's

---

## 🏕️ We Are Strangers Before Thee, And Sojourners

Sojourners means people living somewhere temporarily, not permanent owners.

David says this about Israel's whole history in the land.

Abraham himself was called a sojourner generations earlier in Genesis.

None of this land or wealth was ever truly Israel's own.

🏕️ Sojourners means temporary residents

📜 Abraham used this same word earlier

🚫 Nothing here was permanently theirs

📖 Even the land belonged to God

---

## 🌗 Our Days On The Earth Are As A Shadow

A shadow moves constantly and disappears the moment light changes.

David compares a human lifetime to that same shadow.

A life can feel long while it is happening.

Looking back, it passes as quickly as a shadow crossing the ground.

🌗 A shadow moves and then disappears

⏳ Life feels long while it happens

👀 Looking back, it passes quickly

📖 Even a king's life is brief

---

## 🏠 There Is None Abiding

Abiding means staying or remaining permanently in one place.

No person on earth gets to stay forever.

David says this while surrounded by more wealth than most people ever see.

Even all that gold could not buy him one more day.

🏠 Abiding means staying permanently

⏳ No one stays on earth forever

💰 True even surrounded by great wealth

📖 Wealth cannot buy one more day

# FirstChronicles 29:17-19
# ❤️ Prayer For Solomon's Heart
---
## 🔍 Thou Triest The Heart

Triest is an old word meaning tests or examines.

God does not just look at the size of a gift.

He looks at the motive behind it.

David says this while trusting his own motive was honest.

🔍 Triest means tests or examines

🎁 God looks past the size of gifts

❤️ He examines the motive behind them

📖 David trusts his own motive is honest

---

## ⚖️ In The Uprightness Of Mine Heart

Uprightness means honesty and integrity of motive.

David is not claiming to be sinless.

He is claiming his giving was not for show.

That kind of honest motive is what God takes pleasure in.

⚖️ Uprightness means honest, sincere motive

🚫 Not a claim of sinless perfection

🎭 Not giving for show

📖 God takes pleasure in honest motives

---

## 📜 The God Of Abraham, Isaac, And Of Israel

Israel here is Jacob's covenant name, given after he wrestled with God.

David names three generations in a row, Abraham, Isaac, and Jacob.

Naming all three ties this prayer back to the very first promises.

The same God from Genesis is the God David prays to now.

📜 Israel is Jacob's covenant name

👴 Three generations named together

🤝 Ties back to the first promises

📖 The same God, generations later

---

## 🙏 Give Unto Solomon My Son A Perfect Heart

This is David's final request before handing over the kingdom.

Perfect heart again means wholehearted, not flawless.

David cannot control what kind of king Solomon becomes.

He can only pray for the right heart to lead.

🙏 David's last request before stepping down

❤️ Perfect heart means wholehearted, not flawless

🚫 David cannot control Solomon's choices

📖 He prays instead for the right heart

---

## 📏 To Keep Thy Commandments, Thy Testimonies, And Thy Statutes

These three words describe God's law from slightly different angles.

Commandments are direct instructions to obey.

Testimonies are the terms of God's covenant relationship.

Statutes are the fixed rules and decrees God set in place.

📏 Commandments means direct instructions

🤝 Testimonies means covenant terms

📖 Statutes means fixed decrees

➡️ Together they describe God's whole law

# FirstChronicles 29:20-22
# 👑 Solomon Anointed A Second Time
---
## 🙇 Bowed Down Their Heads, And Worshipped The LORD, And The King

This does not mean the people treated Solomon as a god.

Bowing before a king was a normal sign of loyalty and honor.

The same word for worship could describe deep respect for a person.

Here it shows honor to God and loyalty to His chosen king together.

🙇 Not worship of Solomon as a god

👑 Bowing showed loyalty to the king

🙏 Also honored God at the same time

📖 One gesture, honor to both

---

## 🐂 A Thousand Bullocks, A Thousand Rams, And A Thousand Lambs

Three thousand animals were offered in a single day.

This was likely the largest sacrifice recorded in the Bible up to this point.

So much meat fed an enormous public celebration.

The whole nation ate together to mark this new king.

🐂 Three thousand animals offered that day

🍽️ A massive shared public feast

🎉 The whole nation celebrated together

📖 The scale matched the moment's importance

---

## 🔁 Solomon The Son Of David King The Second Time

David had already named Solomon king once before, in chapter twenty three.

That first anointing happened quietly, without this kind of public ceremony.

This second, public anointing made the choice impossible to dispute.

A clear, public transition helped avoid a fight over the throne.

🔁 Solomon was anointed a second time

🤫 The first time was quiet and private

📢 This time was public and undeniable

📖 A clear transition prevented a power struggle

---

## 👑 To Be The Chief Governor

Chief governor is another title for the ruling king.

Using two royal titles together made his authority unmistakable.

Every listener would understand Solomon now held full royal power.

There was no ambiguity left about who was in charge.

👑 Chief governor means the ruling king

📢 Two titles made authority unmistakable

✅ No ambiguity about who led

📖 Solomon's power was fully confirmed

---

## 🕎 Zadok To Be Priest

Zadok was anointed as priest at this same ceremony.

Another priest named Abiathar had backed a rival claim to the throne.

Zadok's family became the priestly line going forward from here.

Loyalty at this moment shaped generations of future priests.

🕎 Zadok anointed priest at this ceremony

⚔️ Abiathar had backed a rival claim

👨‍👦 Zadok's line led the priesthood after

📖 Loyalty here shaped future generations

# FirstChronicles 29:23-25
# 🌟 Solomon's Reign Begins
---
## 👑 The Throne Of The LORD

Israel's king did not rule as a fully independent ruler.

His throne is described here as belonging to the LORD.

Solomon sat as God's representative over God's own people.

This idea shapes how every king in Israel was meant to rule.

👑 The throne belonged to the LORD

🙏 Solomon ruled as God's representative

🇮🇱 Kingship over God's own people

📖 Every king was meant to rule this way

---

## ⚔️ All The Princes, And The Mighty Men... Submitted Themselves

David's reign had already survived two serious attempts to steal the throne.

His own sons Absalom and Adonijah had both tried to take power early.

This time, every leader and every son submitted without a fight.

A peaceful transition was not something this family could take for granted.

⚔️ Earlier rebellions had threatened David's throne

👨‍👦 Absalom and Adonijah both tried before

🤝 This time, everyone submitted peacefully

📖 A peaceful transition was not guaranteed

---

## 🙌 The LORD Magnified Solomon Exceedingly

Solomon's rise did not come from his own political skill.

Scripture credits this directly to God's own hand.

This sets up the wealth and wisdom described later in his story.

Everything still to come is framed here as a gift, not an achievement.

🙌 Credited to God, not Solomon's skill

🌟 God magnified him personally

📖 Sets up his coming wealth and wisdom

➡️ Framed as a gift, not an achievement

---

## 👑 Royal Majesty As Had Not Been On Any King Before Him

Only two kings had ruled Israel before Solomon, Saul and David.

This verse says Solomon's majesty outshone them both.

That is a specific comparison, not a vague compliment.

It points forward to the extraordinary wealth described later in his reign.

👑 Only Saul and David ruled before him

📈 Solomon's majesty outshone them both

🎯 A specific comparison, not vague praise

📖 It points toward his coming wealth

# FirstChronicles 29:26-30
# 📜 The End Of David's Reign
---
## 🐑 David The Son Of Jesse

David began life as the youngest son of a shepherd family.

Jesse, his father, lived in the small town of Bethlehem.

That humble beginning stands next to everything just described in this chapter.

The boy who once kept sheep died ruling a wealthy, unified kingdom.

🐑 David began as a shepherd's son

🏘️ Jesse's family lived in Bethlehem

📈 A humble start, a great ending

📖 God can lift the lowest beginning

---

## 🔢 Seven Years Reigned He In Hebron

David reigned forty years in total.

The first seven years were spent ruling from Hebron.

Hebron was his first capital, before he captured Jerusalem.

The remaining thirty three years were ruled from Jerusalem instead.

🔢 Forty years total as king

🏕️ Seven years first, ruling from Hebron

🏰 Jerusalem became his capital after that

📖 Two capitals across one long reign

---

## 📜 Died In A Good Old Age, Full Of Days, Riches, And Honour

This exact wording also describes Abraham's death back in Genesis.

It is a set phrase for a life that reached its full course.

It does not just mean David lived a long time.

It means his life was considered complete and well finished.

📜 Same phrase used for Abraham's death

⏳ Marks a life fully lived out

✅ More than just old age

📖 A complete and well finished life

---

## 📚 The Book Of Samuel The Seer... Nathan The Prophet... Gad The Seer

These are not the same as the Bible books called First and Second Samuel.

They were separate historical records that have not survived to today.

Seer is an older word for a prophet who received visions.

The Chronicler used these lost records as his own historical sources.

📚 Not the same as the Bible book Samuel

📖 Seer means an old word for prophet

🗃️ These records have not survived

➡️ The Chronicler used them as sources

---

## 🌍 The Times That Went Over Him, And Over Israel, And Over All The Kingdoms Of The Countries

This line reaches beyond Israel's own borders.

David's reign had become known among surrounding nations, not just at home.

That international reputation is about to grow even larger under Solomon.

The chapter ends looking outward, not just back at Israel alone.

🌍 David's fame reached beyond Israel

🗺️ Surrounding nations knew of his reign

📈 Solomon's reputation grows even further

📖 The story ends looking outward
`.trim();

export const FIRST_CHRONICLES_TWENTY_NINE_PERSONAL_SECTIONS = parseFirstChroniclesTwentyNineRawNotes(
  FIRST_CHRONICLES_TWENTY_NINE_RAW_NOTES
);
