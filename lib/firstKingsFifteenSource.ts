export type FirstKingsFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsFifteenRawNotes(rawText: string): FirstKingsFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsFifteen\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsFifteen\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsFifteen\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 15:${startVerse}` : `1 Kings 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Kings 15 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_FIFTEEN_RAW_NOTES = `# FirstKingsFifteen 15:1-8
# 😔 Abijam Walks In His Father's Sins
---
## 📅 In The Eighteenth Year Of King Jeroboam

Bible writers often date one king's reign by another king's reign year.

Judah and Israel had split into two kingdoms after Solomon died.

This system let readers track both kingdoms on one shared timeline.

Abijam took Judah's throne in the eighteenth year of Jeroboam's rule over Israel.

📅 Israel and Judah dated kings by each other

👑 Two kingdoms formed after Solomon died

🕰️ This kept one shared timeline for both

📖 Two thrones, one calendar

## 📆 Three Years Reigned He In Jerusalem

Three years was a very short reign for a king of Judah.

Most kings before him ruled for decades.

Abijam's short time on the throne matches how the text describes his character.

A brief, troubled reign fits a king who kept walking in old sins.

📆 Three years was an unusually short reign

👑 Most earlier kings ruled for decades

😔 His character matched his short reign

➡️ A troubled king, a troubled reign

## 👑 His Mother's Name Was Maachah, The Daughter Of Abishalom

Maachah held the title of queen mother, a powerful position in Judah's court.

The queen mother often held real political influence in the royal court.

Her father's name appears here as Abishalom, likely another name for Absalom.

That would make Maachah a granddaughter of King David through his son Absalom.

👑 Queen mother was a real political role

📛 Abishalom is likely another name for Absalom

🌳 That ties Maachah to David's own family

📖 Family lines shaped who held power

## 👨‍👦 He Walked In All The Sins Of His Father

Abijam is Rehoboam's son.

Rehoboam had already led Judah into idol worship.

Walking in someone's sins means repeating their same wrong choices on purpose.

Abijam did not create new problems for Judah.

He simply continued the idolatry his father had already started.

👨‍👦 Abijam is Rehoboam's son

🚫 Rehoboam had already introduced idol worship

🔁 Walking in sins means repeating them on purpose

📖 Bad patterns can pass to the next generation

## 💯 His Heart Was Not Perfect With The LORD His God

Perfect here does not mean sinless or flawless.

It means wholly devoted to the LORD alone.

David also sinned badly.

His heart is still called perfect in that same sense.

Abijam is being measured by loyalty, not by a record of good behavior.

His heart was divided between the LORD and his father's idols.

💯 Perfect here means wholly devoted, not sinless

👑 David also sinned but remained loyal

⚖️ Loyalty is the true measure here

📖 Abijam's heart was split by idols

## 🕯️ For David's Sake Did The LORD Give Him A Lamp

A lamp here is a symbol for a lasting line of descendants on the throne.

An unlit house meant a family's rule had ended.

A lit lamp meant the family kept its rule.

God kept Abijam on the throne because of His promise to David.

Abijam did not earn this by his own goodness.

🕯️ A lamp symbolizes a lasting royal line

🏠 A dark house meant a family had ended

🔥 A lit lamp meant the line continued

📖 God kept His promise, not Abijam's merit

## 📜 To Set Up His Son After Him, And To Establish Jerusalem

This points back to God's covenant promise to David in Second Samuel chapter seven.

God promised David that his family line would keep ruling in Jerusalem.

That promise did not depend on each king being good.

It depended on God keeping His word.

📜 This recalls God's promise in Second Samuel seven

👑 David's line would keep ruling Jerusalem

🤝 The promise did not depend on each king

📖 God's word held the family together

## 💔 Save Only In The Matter Of Uriah The Hittite

This one line admits David was not a perfect man.

This recalls David's affair with Bathsheba.

It also recalls the killing of her husband Uriah.

Both events are told in Second Samuel chapter eleven.

Even Israel's greatest king had one enormous moral failure on record.

That honesty is part of why perfect earlier means loyal, not flawless.

💔 David was not a sinless man

📖 This recalls Second Samuel eleven, Uriah's death

🪞 Scripture does not hide David's worst sin

➡️ Perfect means loyal, not flawless

## 👴 There Was War Between Rehoboam And Jeroboam All The Days Of His Life

Rehoboam was Abijam's father.

He had already died in the previous chapter.

Some manuscripts read Abijam here instead of Rehoboam.

Many scholars believe this verse just carries over Rehoboam's old war language.

The next verse confirms war continued between Abijam and Jeroboam himself.

👴 Rehoboam was Abijam's father, already dead

📜 Some manuscripts read Abijam in this verse

⚔️ Judah and Israel stayed in constant conflict

➡️ Verse seven confirms the war continued

## 📚 Written In The Book Of The Chronicles Of The Kings Of Judah

This mentions a book of the chronicles of the kings of Judah.

That book is a separate royal record.

It is not the same as First and Second Chronicles in the Bible.

It has since been lost to history.

This same closing formula repeats for almost every king in the book of Kings.

It tells readers that more detail existed, even if it was not preserved here.

📚 This is a lost royal record, not Chronicles

🔁 The same formula closes most kings' reigns

📖 More detail existed beyond what is written

➡️ Kings often points past its own pages

## 😴 Abijam Slept With His Fathers, And Asa His Son Reigned In His Stead

Slept with his fathers is a gentle way of describing death.

It does not mean actual sleep.

It pictures joining the earlier generations who had already died.

Asa now takes the throne.

His reign will look very different from his father's.

😴 A gentle phrase for death

👪 It pictures joining earlier generations

👑 Asa now becomes king of Judah

➡️ A very different reign is about to begin

# FirstKingsFifteen 15:9-15
# 🧹 Asa's Reforms Begin
---
## 📅 In The Twentieth Year Of Jeroboam King Of Israel

This uses the same dual dating system explained back in verse one.

Asa began ruling Judah in Jeroboam's twentieth year over Israel.

Abijam's father Rehoboam and grandfather Solomon are now three generations back.

Asa is about to become one of Judah's better kings.

📅 Same dual dating system as verse one

👑 Asa begins ruling in Jeroboam's twentieth year

📖 Three generations now stand between Asa and Solomon

➡️ A better king is coming to the throne

## 📆 Forty And One Years Reigned He In Jerusalem

Forty one years is one of the longest reigns of any king of Judah.

Abijam his father ruled for only three years.

A long, stable reign like this let real reform actually take root.

📆 Forty one years, one of Judah's longest reigns

⚖️ Far longer than Abijam's three years

🌱 Stability gave real reform room to grow

📖 Time matters for lasting change

## 👵 His Mother's Name Was Maachah, The Daughter Of Abishalom

Maachah is named as Asa's mother here.

That is the exact same name given for Abijam's mother back in verse two.

Abijam was Asa's father, so Maachah is more likely his grandmother.

Mother in this culture could mean the ruling queen mother, not always a birth parent.

Maachah appears to have held that powerful title across two full reigns.

👵 Maachah is likely Asa's grandmother, not mother

👑 Mother could mean queen mother, not birth parent

🔁 She held that title through two reigns

📖 Titles do not always mean birth ties

## 🌟 Asa Did That Which Was Right In The Eyes Of The LORD

This is the first king since Solomon to receive this full, unqualified praise.

Abijam his father did not walk this way, only a chapter earlier.

Asa breaks the pattern of decline the book of Kings has been tracking.

A good king can still come from a troubled family line.

🌟 First fully praised king since Solomon

😔 Abijam did not walk this same path

🔁 Asa breaks the pattern of decline

📖 A troubled family does not decide the outcome

## 🛕 He Took Away The Sodomites Out Of The Land

Sodomites here refers to male shrine prostitutes tied to Canaanite fertility worship.

These practices had become mixed into worship at local shrines across Judah.

Asa removed this practice by force, not by gentle suggestion.

This was a direct attack on corrupted religion, not just morality.

🛕 Sodomites means male shrine prostitutes

🌾 Tied to Canaanite fertility worship practices

✂️ Asa removed this by force

📖 A direct attack on corrupted worship

## 👪 Removed All The Idols That His Fathers Had Made

Fathers here means the kings before him, back through Solomon.

Solomon himself had built shrines for his foreign wives' gods in his old age.

Those idols had stood in Judah for two full generations before Asa acted.

Asa was cleaning up damage that started at the very top of the royal family.

👪 Fathers means the kings before him

🏛️ Solomon built shrines for foreign gods

📆 These idols stood for two generations

➡️ Reform started at the top of the damage

## 👵 Maachah His Mother, Even Her He Removed From Being Queen

Even her signals that this decision cost Asa something personally.

Maachah held real political power as queen mother, explained back in verse ten.

Removing his own grandmother from that position was not an easy political move.

Asa's loyalty to the LORD outweighed his loyalty to his own family.

👵 Even her shows this decision was personal

👑 Maachah held real power as queen mother

💔 Removing her carried a real political cost

📖 Loyalty to God outweighed family loyalty

## 🌳 Because She Had Made An Idol In A Grove

A grove here means an Asherah pole, a wooden object used to worship a Canaanite goddess.

Asherah worship was often paired with worship of Baal in the ancient Near East.

Maachah had set this idol up herself, likely during her years of real influence.

Asa destroyed it and burned it at the brook Kidron outside Jerusalem.

🌳 A grove means an Asherah pole

🛕 Asherah worship often paired with Baal worship

🔥 Asa burned it at the brook Kidron

📖 He destroyed what his own family built

## ⛰️ The High Places Were Not Removed

High places were local hilltop shrines used for sacrifice outside the main temple in Jerusalem.

Some had started as worship of the true God in the wrong location.

Asa's reforms were real, but this verse admits they did not reach everywhere.

Even a good king in Judah could not undo every old habit at once.

⛰️ High places were local hilltop shrines

🛐 Some began as worship of the true God

🚧 Asa's reform was real but incomplete

📖 Even good kings leave some work unfinished

## 🎁 The Things Which His Father Had Dedicated, Into The House Of The LORD

Dedicated here means set apart as a gift, usually taken from war or tribute.

Abijam his father had apparently set aside valuable items for God's house before his death.

Asa added his own dedicated silver, gold, and vessels to that same collection.

Both father and son gave back to the temple, whatever their other failures.

🎁 Dedicated means set apart as a gift

👑 Abijam had already set some items aside

💰 Asa added his own silver, gold, and vessels

📖 Both father and son gave to the temple

# FirstKingsFifteen 15:16-19
# ⚔️ Asa Buys An Ally
---
## 👤 There Was War Between Asa And Baasha King Of Israel All Their Days

Baasha is a new king of Israel, introduced properly later in this same chapter.

He seized Israel's throne through violence, which the chapter will explain in detail.

This verse tells readers upfront that war marked the entire relationship between Judah and Israel.

👤 Baasha is Israel's newest king

⚔️ He took the throne through violence

📆 War defined the whole relationship

➡️ The two kingdoms remained rivals

## 🗺️ Baasha Built Ramah, That He Might Not Suffer Any To Go Out Or Come In

Ramah sat only a few miles north of Jerusalem, right on the border between the two kingdoms.

Building a fort there let Baasha block trade and travel in and out of Judah.

This was an economic siege, not a direct attack on the city itself.

Baasha aimed to weaken Judah slowly, without risking an open battle.

🗺️ Ramah sat near the border, close to Jerusalem

🚧 A fort there blocked trade and travel

💰 This was an economic siege, not a battle

📖 Baasha chose to weaken Judah slowly

## 💰 Asa Took All The Silver And The Gold Out Of The Treasures Of The House Of The LORD

Asa emptied both the temple treasury and his own palace treasury for this plan.

Some of that temple silver and gold likely included the very gifts he had just dedicated in verse fifteen.

This shows how seriously Asa took the threat from Baasha.

It also shows Asa trusting a foreign alliance instead of relying on the LORD alone.

💰 Asa emptied both the temple and palace

🎁 Some may be the gifts from verse fifteen

😨 This shows how serious the threat felt

📖 Asa trusted an ally instead of the LORD

## 👑 Sent Them To Benhadad, King Of Syria, That Dwelt At Damascus

Benhadad ruled Syria, also called Aram, from the city of Damascus to Judah's northeast.

His father and grandfather are named here too, tracing a known royal line.

Asa is reaching past his own kingdom to buy outside help.

Damascus stood far enough away that Baasha could not easily strike back at this new alliance.

👑 Benhadad ruled Syria from Damascus

🌍 Syria sat to Judah's northeast

🤝 Asa reached outside his own kingdom for help

📖 Distance made this alliance hard to punish

## 🤝 There Is A League Between Me And Thee

A league here means a formal treaty between two kingdoms.

This one was sealed by earlier kings, going back at least one generation.

Asa is reminding Benhadad of an old family agreement.

He is not proposing something brand new.

🤝 A league means a formal treaty

👪 This treaty passed down between fathers

📜 Asa calls on an old agreement

➡️ Old ties can still carry weight

## 💰 Come And Break Thy League With Baasha King Of Israel

Asa is asking Benhadad to betray an existing treaty with Israel, not just make a new friend.

A bribe of silver and gold is what makes Benhadad willing to break his word.

Second Chronicles later records a prophet named Hanani rebuking Asa for this exact choice.

Trusting Syria's army looked wise in the moment but cost Asa God's trust in the long run.

🤝 Asa asks Benhadad to break a treaty

💰 A bribe makes Benhadad willing to betray it

😠 A prophet later rebuked Asa for this

📖 Short term wisdom cost long term trust

# FirstKingsFifteen 15:20-22
# 🏗️ Baasha Retreats, Asa Builds
---
## 👂 Benhadad Hearkened Unto King Asa

Hearkened means Benhadad listened and agreed to act.

Asa's bribe worked exactly as he had hoped.

Syria's army now turned against Israel instead of helping guard the border with Judah.

One king's money just redirected another king's entire army.

👂 Hearkened means he listened and agreed

💰 Asa's bribe worked as planned

🔁 Syria's army turned against Israel instead

📖 Money redirected an entire army

## 🗺️ Smote Ijon, And Dan, And Abelbethmaachah, And All Cinneroth, With All The Land Of Naphtali

These are cities and regions across the far north of Israel, near where the country bordered Syria.

Dan marked Israel's northernmost point, mentioned often as the edge of the land.

Cinneroth sat by the Sea of Galilee, and Naphtali covered a wide territory around it.

Syria's army swept through Israel's entire northern frontier in a single strike.

🗺️ These cities sat across Israel's far north

📍 Dan marked Israel's northern edge

🌊 Cinneroth sat by the Sea of Galilee

📖 A whole frontier fell in one strike

## 🚧 He Left Off Building Of Ramah, And Dwelt In Tirzah

Baasha had to abandon his fort project at Ramah completely.

He needed his forces back home to deal with the Syrian invasion instead.

Tirzah was Israel's capital city at this point in its history.

Asa's plan worked, and the pressure on Judah's border lifted without a single battle.

🚧 Baasha abandoned the fort at Ramah

🏠 Tirzah was Israel's capital city

🛡️ His forces were needed against Syria

📖 Judah's pressure lifted without one battle

## 📢 Asa Made A Proclamation Throughout All Judah, None Was Exempted

A proclamation here means a public order every household in Judah had to obey.

None exempted means no one, rich or poor, could skip this work.

Asa mobilized his entire kingdom to tear down what Baasha had built.

This was a full national effort, not a small work crew.

📢 A proclamation was a public order

👥 None exempted means everyone had to help

🧱 Judah tore down what Baasha built

📖 A whole nation moved at once

## 🧱 Asa Built With Them Geba Of Benjamin, And Mizpah

Asa reused Baasha's own building materials for his own fortifications.

Geba and Mizpah both sat closer to Jerusalem than Ramah had.

These became new border forts protecting Judah's northern approach.

Baasha's abandoned project ended up strengthening the very kingdom he had tried to weaken.

🧱 Asa reused Baasha's own materials

🏰 Geba and Mizpah became new forts

🛡️ Both guarded Judah's northern approach

📖 Baasha's own project ended up helping Judah

# FirstKingsFifteen 15:23-24
# 🦶 Asa's Final Years
---
## 📚 Are They Not Written In The Book Of The Chronicles Of The Kings Of Judah

This is the same closing formula already explained back in verse seven.

It tells readers Asa did far more than what fits in this one chapter.

His might and his building projects earned their own separate record.

A forty one year reign leaves a lot of history behind.

📚 Same closing formula as verse seven

🏗️ More detail existed than fits here

📆 Forty one years left a lot of history

➡️ This chapter only tells part of the story

## 🦶 In The Time Of His Old Age He Was Diseased In His Feet

This does not mean a small, ordinary ache.

Second Chronicles adds that this disease became severe, even life threatening.

That same account also says Asa sought physicians instead of seeking the LORD.

A king who had torn down idols still struggled to trust God completely at the very end.

🦶 This was a severe, not minor, disease

⚠️ Second Chronicles calls it life threatening

🩺 Asa sought doctors instead of the LORD

📖 Even a reformer can struggle to trust fully

## 👑 Jehoshaphat His Son Reigned In His Stead

Slept with his fathers is the same peaceful phrase for death explained in verse eight.

Asa is buried in the city of David, the honored royal burial ground in Jerusalem.

Jehoshaphat now becomes king, and later chapters describe him as another good king in Judah.

Judah's better kings are starting to form a small but real pattern.

😴 Same phrase for death as verse eight

🏙️ Buried in Jerusalem's royal burial ground

👑 Jehoshaphat becomes the next king

📖 Judah's good kings begin forming a pattern

# FirstKingsFifteen 15:25-28
# 🗡️ Nadab Falls To Conspiracy
---
## 👤 Nadab The Son Of Jeroboam Began To Reign Over Israel

Nadab is Jeroboam's son, taking over Israel's throne after his father's death.

His reign lasted only two years, a short time compared to Asa's forty one.

The story now shifts north, back to Israel's royal line.

A short, weak reign often signals trouble ahead in the book of Kings.

👤 Nadab is Jeroboam's own son

📆 His reign lasted only two years

🧭 The story shifts north to Israel

➡️ A short reign often signals trouble

## 😔 He Did Evil In The Sight Of The LORD, And Walked In The Way Of His Father

This exact judgment was already given about Jeroboam back in the previous chapter.

Nadab copied his father's golden calf worship instead of correcting it.

The phrase made Israel to sin will repeat again and again across the book of Kings.

It becomes the standard measuring stick for nearly every king of Israel that follows.

😔 Same judgment already given about Jeroboam

🐂 Nadab copied the golden calf worship

🔁 Made Israel to sin repeats often in Kings

📖 This becomes the standard for Israel's kings

## 👤 Baasha The Son Of Ahijah, Of The House Of Issachar, Conspired Against Him

This is the same Baasha already named earlier in this chapter as Asa's rival.

The chapter told his war with Asa first, then circles back to show how he took Israel's throne.

He came from the tribe of Issachar, not from Jeroboam's own family line.

Conspired means he planned Nadab's death in secret, not an open military challenge.

👤 The same Baasha already named earlier

🔄 The chapter circles back to explain his rise

🌾 He came from the tribe of Issachar

📖 Israel's throne changes hands through violence

## 📍 Smote Him At Gibbethon, Which Belonged To The Philistines

Gibbethon sat inside Philistine territory, near Israel's western border.

Nadab and his army were away fighting the Philistines when this happened.

Baasha struck while the king was far from home and distracted by war.

A battlefield became the perfect cover for a palace coup.

📍 Gibbethon sat in Philistine territory

⚔️ Nadab's army was away fighting there

🎯 Baasha struck while the king was distracted

📖 A war became cover for a coup

## 📅 Even In The Third Year Of Asa King Of Judah Did Baasha Slay Him

This dates the coup using Judah's king again, the same cross referencing system from before.

Baasha did not just remove Nadab, he ended his life completely.

Baasha now claims the throne of Israel for himself.

A conspiracy has replaced one dynasty with another after only two years.

📅 Dated again using Judah's king, Asa

🗡️ Baasha ended Nadab's life completely

👑 Baasha now claims Israel's throne

📖 One dynasty replaced after only two years

# FirstKingsFifteen 15:29-32
# ⚖️ The Prophecy Comes True
---
## ⚔️ He Smote All The House Of Jeroboam, He Left Not Any That Breathed

Baasha killed every remaining member of Jeroboam's family, not just Nadab.

Left not any that breathed means a complete and total elimination, sparing no one.

Wiping out a rival's entire family was a common way new kings protected their throne.

A surviving relative could always become a future rival's rallying point.

⚔️ Baasha killed Jeroboam's whole family

🚫 None were left alive at all

👑 New kings often erased rival families

📖 A survivor could always become a future rival

## 📜 According Unto The Saying Of The LORD, Which He Spake By His Servant Ahijah The Shilonite

Ahijah the Shilonite is the prophet from the previous chapter who first predicted Jeroboam's family would fall.

That prophecy warned Jeroboam's whole house would be swept away like dung, told in chapter fourteen.

Baasha's violence fulfills a word God had already spoken years earlier.

God's judgment does not need a righteous man to carry it out.

📜 Ahijah predicted this back in chapter fourteen

🗑️ The prophecy warned of total removal

✅ Baasha's violence fulfills that old word

📖 God can use even a violent man

## 😠 By His Provocation Wherewith He Provoked The LORD God Of Israel To Anger

Provocation means an action that deliberately stirs up anger.

Jeroboam's golden calves were not a minor mistake or an accident.

They were a direct, ongoing insult to God's command not to worship idols.

This verse explains why judgment fell so completely on Jeroboam's family.

😠 Provocation means deliberately stirring up anger

🐂 The golden calves were not an accident

🚫 They broke God's clear command directly

📖 This explains the completeness of the judgment

## 📚 Written In The Book Of The Chronicles Of The Kings Of Israel

This is a second lost record, separate from the one already explained for Judah's kings.

Israel and Judah each kept their own royal chronicles after the kingdom split.

Nadab's own two year reign apparently had more detail than fits in these verses.

Two kingdoms, two separate histories, both eventually lost to time.

📚 A second, separate record for Israel's kings

🌓 Each kingdom kept its own chronicles

📆 Nadab's two years had more detail

📖 Two kingdoms, two lost histories

## 🔁 There Was War Between Asa And Baasha King Of Israel All Their Days

This sentence already appeared word for word back in verse sixteen.

Repeating it here marks the end of this section about Nadab and Baasha's rise.

The war itself never really stopped through any of the events just described.

Judah and Israel's rivalry forms the steady background behind every king in this chapter.

🔁 This exact line already appeared in verse sixteen

🔚 It marks the end of this section

⚔️ The war never actually stopped

📖 Rivalry stayed the constant background

# FirstKingsFifteen 15:33-34
# 👑 Baasha Takes The Throne
---
## 👑 Began Baasha The Son Of Ahijah To Reign Over All Israel In Tirzah, Twenty And Four Years

This restates Baasha's rise to power, now with his full reign length.

Twenty four years is a long, stable reign for a northern king.

That is notable since he took the throne by killing his predecessor.

Tirzah remains Israel's capital, the same city already named in verse twenty one.

A violent beginning did not stop Baasha from ruling for a long time.

👑 Baasha's full reign restated, twenty four years

📆 A long reign despite a violent start

🏠 Tirzah remains Israel's capital city

➡️ Violence did not shorten Baasha's rule

## 😔 He Did Evil In The Sight Of The LORD, And Walked In The Way Of Jeroboam

This is the exact same judgment already given about Nadab back in verse twenty six.

Baasha destroyed Jeroboam's family.

He still worshiped the same golden calves Jeroboam had built.

Wiping out a rival dynasty did not mean rejecting that dynasty's sin.

Israel's next king inherits the same pattern instead of breaking it.

😔 Same judgment already given about Nadab

🐂 Baasha kept Jeroboam's golden calf worship

🔁 Removing a rival did not remove the sin

📖 The next king inherits this same pattern
`.trim();

export const FIRST_KINGS_FIFTEEN_PERSONAL_SECTIONS = parseFirstKingsFifteenRawNotes(FIRST_KINGS_FIFTEEN_RAW_NOTES);
