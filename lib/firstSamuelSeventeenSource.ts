export type FirstSamuelSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelSeventeenRawNotes(rawText: string): FirstSamuelSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 17:${startVerse}` : `1 Samuel 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 16) {
    throw new Error("Expected 16 1 Samuel 17 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_SEVENTEEN_RAW_NOTES = `# FirstSamuel 17:1-3
# ⚔️ Two Armies Face Off
---
## 🗺️ Gathered Together At Shochoh

Shochoh was a town inside the territory of Judah.

It sat in the hill country between Philistine land and Israelite land.

Armies from both sides often clashed in that in between region.

This was contested ground, not deep inside either nation's home territory.

🗺️ Shochoh sat inside Judah's land

⚔️ It bordered Philistine controlled territory

🏔️ This was contested border ground

📖 Border regions saw frequent conflict

## 🩸 In Ephesdammim

Ephesdammim is a place name built from two Hebrew words.

Many scholars believe it means boundary of blood.

Names like that often marked the edge of Philistine and Israelite land.

A name like that already hints at what kind of clash is coming.

🩸 Ephesdammim likely means boundary of blood

🗺️ It marked a contested border zone

⚔️ The name already points to violence

📖 This chapter will earn that name again

## 🌳 The Valley Of Elah

Elah means a large oak like tree common in that region.

The valley took its name from trees that grew along it.

This valley sits close to Bethlehem, David's hometown.

That location detail matters once David enters the story.

🌳 Elah means a large oak like tree

🏞️ The valley was named for those trees

📍 It sat near David's hometown Bethlehem

📖 That detail matters later in the chapter

## ⛰️ Stood On A Mountain On The One Side

Neither army wanted to attack first.

Charging down a mountain into a valley already put an army at a disadvantage.

Both camps had good reason to wait instead of moving.

This standoff explains why the two sides did not simply collide.

⛰️ Both armies held high ground

🚶 Charging downhill risked losing the advantage

⏳ Neither side wanted to move first

➡️ That is why a standoff formed

## 🛡️ Set The Battle In Array

Array means the armies lined up in organized battle formation.

This was not chaos, it was disciplined positioning.

Ancient armies arranged their ranks by weapon type and role.

The stage was now set for something other than a normal clash.

🛡️ Array means organized battle formation

📋 Both sides lined up by role

⚔️ This was disciplined, not chaotic

➡️ The stage was set for something unusual

# FirstSamuel 17:4-7
# 🛡️ The Champion Of Gath
---
## ⚔️ There Went Out A Champion

Champion here means a single fighter chosen to represent his whole army.

Ancient armies sometimes settled matters through one on one combat instead of a full battle.

Winning that one fight could decide the outcome for everyone watching.

This custom put enormous pressure on whoever stepped forward to fight.

⚔️ Champion means one chosen representative fighter

🤝 A single fight could replace a full battle

🎯 One outcome could decide everything

📖 Pressure fell on whoever accepted it

## 🏙️ Named Goliath, Of Gath

Gath was one of five major Philistine cities.

Later scripture connects Gath to a family line of unusually large warriors.

Goliath was not just tall for one person, he came from a line known for size.

His origin already explains why he could dominate a battlefield by presence alone.

🏙️ Gath was a major Philistine city

👤 Gath was linked to a family of giants

📏 Goliath's size came from that line

📖 His reputation walked out ahead of him

## 📏 Six Cubits And A Span

A cubit was an ancient measurement, close to the length of a forearm.

A span was about half a cubit, close to a hand's stretch.

Six cubits and a span comes to close to nine feet nine inches.

Some ancient manuscripts record a shorter four cubits and a span instead.

Even by the shorter reading, Goliath still towered over an average man.

📏 A cubit was about a forearm's length

✋ A span was close to half a cubit

📐 Older manuscripts disagree on the exact height

📖 Either way, Goliath towered over most men

## 🪖 An Helmet Of Brass Upon His Head

Brass here refers to bronze, a strong metal used for armor.

Chapter thirteen already showed Israel had almost no blacksmiths or metal weapons of its own.

Philistines controlled the region's metalworking, leaving Israel badly outfitted for war.

Goliath's armor was not only personal wealth, it displayed a whole technology gap.

🪖 Brass here means bronze armor

🔨 Philistines controlled the region's metalworking

⚔️ Israel lacked metal weapons by comparison

📖 Goliath's gear showed that whole gap

## 🎽 Armed With A Coat Of Mail

A coat of mail was armor made from small overlapping metal scales.

It protected the torso while still letting a soldier move.

This was expensive, skilled work, not something an ordinary soldier owned.

Every piece of Goliath's outfit signaled elite, professional status.

🎽 Mail means overlapping metal scale armor

🛡️ It protected the body while allowing movement

💰 This armor was expensive and rare

📖 His gear marked him as elite

## ⚖️ Five Thousand Shekels Of Brass

A shekel was originally a unit of weight, not a coin.

Five thousand shekels of brass comes to close to one hundred twenty five pounds.

That is heavier than most grown men.

Goliath carried that much weight in armor alone, before even picking up a weapon.

⚖️ A shekel was originally a weight unit

🏋️ Close to one hundred twenty five pounds

💪 That is heavier than most men

📖 That is armor weight alone

## 🦵 Greaves Of Brass Upon His Legs

Greaves were armor plates that covered the shins.

A target here means a small shield, not a modern archery target.

Carrying it between his shoulders means Goliath wore it strapped across his back.

He was armored from head to shin, with a spare shield ready behind him.

🦵 Greaves protected the shins

🛡️ Target here means a small shield

🎒 He carried it strapped across his back

📖 He was armored head to shin

## 🪵 The Staff Of His Spear Was Like A Weaver's Beam

A weaver's beam was the thick wooden bar a loom used to hold thread.

Comparing the spear shaft to it means the shaft was unusually thick and heavy.

Most spears were light enough for one man to throw with ease.

This spear sounds more like something meant to be planted and braced.

🧵 A weaver's beam was a thick loom bar

🪵 Goliath's spear shaft matched that thickness

🎯 Most spears were made to be thrown

📖 This one looks built to brace, not throw

## ⚙️ His Spear's Head Weighed Six Hundred Shekels Of Iron

Six hundred shekels of iron comes to close to fifteen pounds.

That is the weight of the spearhead alone, not the whole spear.

Iron was rarer and harder to work than bronze in this period.

An iron spearhead this heavy displayed both wealth and real danger.

⚙️ The spearhead alone weighed close to fifteen pounds

🔩 Iron was rarer than bronze then

💰 It displayed wealth as well as danger

📖 Every detail built the same picture

## 🛡️ One Bearing A Shield Went Before Him

A shield bearer was a servant who carried a second soldier's shield.

Only wealthy or high ranking warriors could afford one.

This detail confirms Goliath was not only physically large, he had real status.

Everything about his entrance was built to look unbeatable.

🛡️ A shield bearer served one fighter

💰 Only the wealthy had one

👑 This confirmed Goliath's high status

📖 His entrance was built to look unbeatable

# FirstSamuel 17:8-11
# 😨 The Daily Taunt
---
## 🗣️ Why Are Ye Come Out To Set Your Battle In Array

Goliath is mocking the whole army's formation, not asking a simple question.

Full battle formations meant thousands of soldiers on both sides risking their lives.

Goliath is offering a shortcut, one fight instead of a massacre.

His tone treats their entire army as an unnecessary overreaction.

🗣️ Goliath mocks their whole formation

⚔️ Full battle risks thousands of lives

🤝 He offers one fight instead

📖 His tone drips with contempt

## 🎯 Choose You A Man For You

Goliath is inviting Israel to pick one representative fighter.

The word choose puts the pressure back on Israel's own camp.

Nobody steps forward, and that silence speaks loudly.

A challenge like this could not simply be ignored forever.

🎯 Goliath invites one chosen fighter

👥 The pressure lands back on Israel

🤐 Silence answers him for forty days

➡️ A challenge like this cannot be ignored forever

## 👎 Ye Servants To Saul

Goliath is not just insulting Israel's army, he is insulting their king.

Calling them servants to Saul frames Israel as weak and dependent, not a real nation.

Saul had been described in chapter ten as standing a head taller than everyone else.

By every human measure Saul looked like the obvious champion, yet he does not step out.

👎 Goliath insults Israel through their king

📏 Saul was described as Israel's tallest man

👑 He looked like the obvious champion

📖 Fear kept the tallest man silent

## ⚖️ Then Shall Ye Be Our Servants, And Serve Us

The terms of the duel are stated plainly here.

Whoever wins the single fight decides who serves whom.

This was a real ancient custom, not an empty threat.

An entire nation's freedom now rests on one man's willingness to fight.

⚖️ The duel decides who serves whom

📜 This was a real ancient custom

🎲 One fight would settle everything

📖 A nation's freedom rests on one man

## 🗣️ I Defy The Armies Of Israel

Defy means to openly challenge and mock, daring someone to respond.

Goliath is not just threatening violence, he is questioning Israel's courage in public.

This same word will return later, once David reframes exactly who Goliath is really defying.

🗣️ Defy means an open, mocking challenge

😤 Goliath questions Israel's courage in public

🔁 This word returns later in the chapter

📖 Watch how the target of the insult shifts

## 😨 Dismayed, And Greatly Afraid

Dismayed means struck with panic, not simple sadness.

Saul had been described as standing a head taller than everyone in Israel.

By every human measure Saul looked like the nation's obvious champion.

Instead of stepping forward, the tallest man in Israel freezes with everyone else.

😨 Dismayed means struck with panic

📏 Saul was Israel's tallest man

👑 He still looked like the obvious champion

📖 Fear silenced him along with everyone else

# FirstSamuel 17:12-15
# 🐑 David The Shepherd
---
## 👤 That Ephrathite Of Bethlehemjudah

Ephrathite names a clan connected to the region around Bethlehem.

Bethlehemjudah distinguishes this town from another Bethlehem in a different tribal territory.

This detail firmly plants Jesse's family in Judah, David's tribe.

That tribal identity matters for the whole rest of Israel's story.

👤 Ephrathite names Jesse's clan and region

📍 Bethlehemjudah marks the correct Bethlehem

🏛️ Jesse's family belonged to the tribe of Judah

📖 That tribe shapes the rest of Israel's story

## 👨‍👦 He Had Eight Sons

Chapter sixteen already introduced seven of Jesse's sons passing before Samuel.

This verse counts David along with his brothers for a total of eight.

A large family like this was common and was seen as a blessing.

David was simply the last name on a long list.

👨‍👦 Chapter sixteen already named seven brothers

➕ This verse counts David as the eighth

👪 A large family was seen as a blessing

📖 David was the last name on the list

## 👴 Went Among Men For An Old Man

This phrase means Jesse was already considered elderly in his community.

Older men in this culture were often exempted from going to war themselves.

That is part of why Jesse's sons went to battle instead of Jesse.

His age also explains why he needed messengers like David to check on his sons.

👴 Jesse was already considered an old man

🏠 Older men were often exempt from war

👨‍👦 His sons served in the army instead

📖 That is why David ran his errands

## 👦 Eliab The Firstborn

Eliab, Abinadab, and Shammah were the three oldest sons who followed Saul to war.

Eliab is the same brother Samuel almost anointed king back in chapter sixteen.

Samuel had judged Eliab worthy by his height and appearance alone, and was corrected by God.

That earlier moment sits quietly behind everything Eliab says to David later in this chapter.

👦 Eliab, Abinadab, and Shammah followed Saul

👑 Eliab was almost anointed king in chapter sixteen

🙅 God rejected him for looking the part

📖 That memory shapes his anger later

## 🐑 David Was The Youngest

Being the youngest son in this culture usually meant being overlooked.

Chapter sixteen already showed Samuel had to specially ask for David to be brought in.

He was not present with the family's most important decisions by default.

Yet God had already chosen this overlooked son as the next king.

🐑 The youngest was usually overlooked

🚪 Samuel had to specially call for him

👑 God had already chosen him as king

📖 God does not overlook the overlooked

## 🐑 Returned From Saul To Feed His Father's Sheep

Chapter sixteen showed David already serving in Saul's court as a musician and armor bearer.

This verse shows him back home tending sheep at the same time.

Young men in this culture often moved between family duties and other service as needed.

There is no contradiction here, only a shepherd boy living two roles at once.

🎵 David already served in Saul's court

🐑 He also still tended his father's sheep

🔁 Both roles overlapped in this culture

📖 One shepherd boy, two responsibilities

# FirstSamuel 17:16-19
# 🍞 Jesse Sends David To The Camp
---
## 📆 Presented Himself Forty Days

Forty is a number that shows up again and again in scripture during times of testing.

The flood lasted forty days, Israel wandered forty years, and Moses fasted forty days on a mountain.

This standoff has now stretched into its own season of testing for Israel.

Every day Goliath shouts, the whole nation's faith is being tested along with its fear.

📆 Forty often marks a season of testing

🌊 The flood and the wilderness both used it

⛰️ Moses fasted forty days on a mountain

📖 Israel is now in its own testing season

## 🌾 An Ephah Of This Parched Corn

An ephah was a dry measure, close to two thirds of a bushel.

Parched corn means roasted grain, a simple food that traveled well without spoiling.

Soldiers in this period relied on their own families for food, not a national supply chain.

Jesse sending provisions was an ordinary, expected part of having sons at war.

🌾 An ephah was a large dry measure

🔥 Parched corn means roasted, travel ready grain

🎒 Armies had no supply chain of their own

📖 Families fed their own soldiers directly

## 🍞 These Ten Loaves, And Run To The Camp

Ten loaves of bread was a substantial gift for three grown men in the field.

Jesse trusted this errand to his youngest son rather than a hired servant.

That trust shows David was already seen as capable and dependable at home.

This simple errand is about to place him at the center of history.

🍞 Ten loaves was a substantial gift

🐑 Jesse trusted this errand to David

✅ David was already seen as dependable

📖 A simple errand leads to a huge moment

## 🧀 Carry These Ten Cheeses Unto The Captain Of Their Thousand

A captain of a thousand was a military officer commanding a large unit of soldiers.

Bringing him cheese was a customary way to show respect and stay in his good favor.

Jesse wanted his sons looked after, and a gift to their commander helped make that happen.

Small gestures like this mattered in an army built on personal loyalty and favor.

🧀 A captain of a thousand led many soldiers

🎁 The cheese was a gesture of respect

🙏 Jesse wanted his sons looked after

📖 Loyalty in this army ran on relationships

## 📜 Take Their Pledge

A pledge here means some proof or token brought back from the brothers.

Jesse wanted evidence that his sons were alive, well, and actually found.

This detail shows real parental worry sitting underneath a simple errand.

David is not just running food, he is checking on family in the middle of a war.

📜 A pledge means proof of their welfare

😟 Jesse wanted confirmation his sons were safe

🐑 David's errand was really about family

📖 Worry sent him straight into history

## ⚔️ Fighting With The Philistines

This verse repeats the standoff already described back in verses one through three.

Nothing has changed in the weeks since the armies first arrived at Elah.

That repetition is the whole point, the stalemate has become the normal state of things.

David is about to walk straight into a situation that has gone stale for everyone else.

⚔️ The standoff is repeated here on purpose

🔁 Nothing has changed in weeks

😴 The stalemate had become normal

📖 David walks into a stale, tired scene

# FirstSamuel 17:20-23
# 🏃 David Arrives At The Battle Line
---
## 🌅 Rose Up Early In The Morning

David gets up early without being told twice.

This same discipline was already part of his daily work as a shepherd.

An early start on an errand this important shows real eagerness to obey.

Small, faithful habits are about to matter on a much bigger stage.

🌅 David rose early without delay

🐑 This matched his shepherd discipline

✅ Eagerness shows in a small detail

📖 Faithful habits matter on a bigger stage

## 🐑 Left The Sheep With A Keeper

David does not abandon his responsibility, he arranges proper coverage first.

A keeper was someone trusted to watch the flock in his place.

This detail matters because David will soon be accused of neglecting his sheep.

The text quietly proves that accusation false before it is even made.

🐑 David arranged coverage before leaving

🧑‍🌾 A keeper watched the flock in his place

🚫 This disproves an accusation made later

📖 The text answers the charge in advance

## 🏕️ As The Host Was Going Forth To The Fight

David arrives right as the army is forming up for another day of the standoff.

The trench likely refers to the barricade of wagons and supplies protecting the camp.

His timing puts him at the center of the action from the very first moment.

He is not arriving late to a quiet camp, he is walking into the noise.

🏕️ David timed his arrival with the army

🛡️ The trench was the camp's protective barricade

⏰ His timing was not accidental

📖 He walked straight into the noise

## 📢 Shouted For The Battle

Shouting before battle was a common way to raise courage and signal readiness.

David joins this cry along with everyone else in the ranks.

He is not yet a hero here, just one more voice in the crowd.

That ordinary moment makes what happens next even more striking.

📢 The shout was a courage building custom

🗣️ David joined in like everyone else

👤 He was still just one voice here

📖 The ordinary makes the extraordinary stand out

## 🎒 Left His Carriage In The Hand Of The Keeper Of The Carriage

Carriage here means baggage and supplies, not a vehicle.

David again sets his things aside properly before running toward the action.

This is the second time in two verses he shows this same careful habit.

Responsible in small things, David is about to be trusted with something enormous.

🎒 Carriage means baggage and supplies

📋 David set his things aside properly

🔁 This is his second careful handoff

📖 Small responsibility comes before a huge one

## 👋 Came And Saluted His Brethren

Saluted here means David greeted his brothers and asked after their welfare.

This is an ordinary family reunion in the middle of a war zone.

Nothing about this moment suggests David expected what was about to happen.

He came to check on family, not to look for a fight.

👋 Saluted means a warm, caring greeting

👨‍👨‍👦 This was an ordinary family reunion

😊 David expected nothing unusual to happen

📖 He came for family, not for a fight

## 🔁 Spake According To The Same Words

Goliath repeats the exact same challenge David has already heard about secondhand.

This is the first time David hears it with his own ears.

Everyone around him has grown numb to these words after so many repeated days.

David is about to react very differently than everyone used to the routine.

🔁 Goliath repeats his usual challenge

👂 David hears it firsthand for the first time

😐 Everyone else has grown numb to it

📖 David's reaction is about to break the pattern

# FirstSamuel 17:24-27
# 🏃 Fear And A Promised Reward
---
## 🏃 Fled From Him, And Were Sore Afraid

Sore here means extremely or severely, not physically sore muscles.

The men of Israel do not just hesitate, they actively run away.

This is a striking image for a trained, organized army.

One man's size and noise has scattered soldiers who came ready to fight.

🏃 The soldiers actually fled

😨 Sore means extremely, not physically sore

⚔️ A trained army still panicked

📖 One man's presence scattered them all

## 💰 Enrich Him With Great Riches

Kings in this period often promised wealth to motivate a champion.

This reward was meant to be worth the enormous risk of the fight.

Money alone had not been enough to make anyone step forward yet.

Fear was still winning over the promise of riches.

💰 Kings often rewarded champions with wealth

🎯 The reward matched the size of the risk

😨 Fear still outweighed the promised money

📖 No price tag had moved anyone yet

## 👑 Give Him His Daughter

Marrying the king's daughter meant joining the royal family itself.

This was an enormous jump in status for any ordinary soldier.

This detail plants the seed for David's marriage to Michal later in chapter eighteen.

The reward offered here is about to shape the rest of David's story.

👑 Marrying the princess meant joining royalty

📈 It was a huge jump in status

🔮 This sets up chapter eighteen's marriage

📖 Today's offer shapes tomorrow's story

## 🏠 Make His Father's House Free In Israel

This meant the whole family would be excused from taxes and required service.

That was a real, lasting economic benefit, not just a personal honor for one man.

The reward reached far beyond the fighter himself into his entire household.

Whoever accepted this challenge was fighting for his whole family's future.

🏠 Free meant excused from taxes and service

👪 The benefit reached the whole family

💵 This was real, lasting economic gain

📖 One man's fight, one family's future

## ⚔️ Uncircumcised Philistine

Circumcision was the mark of God's covenant with Israel, going back to Abraham.

Calling Goliath uncircumcised was not really about ethnicity, it was about covenant standing.

David is naming him as an outsider to God, not just an outsider to Israel.

This distinction is the real reason David cannot let the challenge stand unanswered.

⚔️ Circumcision marked God's covenant people

🚫 Goliath stood outside that covenant

🎯 David's real objection is theological

📖 This is why David cannot stay silent

## 🙌 Defy The Armies Of The Living God

Earlier in the chapter Goliath was said to defy the armies of Israel.

David reframes the exact same insult as an offense against God himself.

The living God stands in contrast to lifeless idols the Philistines actually worshiped.

David's whole motivation shifts the fight from a national issue to a personal insult to God.

🙌 Goliath had defied Israel's armies

🔄 David reframes it as defying God

⚰️ Living God contrasts with lifeless idols

📖 This shift becomes David's whole motivation

## 👥 The People Answered Him After This Manner

The crowd repeats the same reward story David just heard.

Their consistent answer confirms this is a real offer, not just camp rumor.

David now has solid confirmation before he takes any action.

Word travels fast once one man starts asking the right question.

👥 The crowd repeats the same story

✅ Their answer confirms it as real

🐑 David now has solid confirmation

📖 Word spreads fast once someone asks

# FirstSamuel 17:28-30
# 😠 Eliab's Anger
---
## 😠 Eliab's Anger Was Kindled Against David

Eliab is the same brother almost anointed king back in chapter sixteen.

God had already rejected him in favor of his youngest brother.

That old rejection sits quietly underneath this sudden burst of anger now.

Jealousy often finds a small excuse to release a much older wound.

😠 Eliab was rejected as king in chapter sixteen

👑 David was chosen instead of him

💢 That old wound fuels this anger

📖 Jealousy finds any excuse to surface

## 🐑 With Whom Hast Thou Left Those Few Sheep

Eliab accuses David of abandoning his duty out in the wilderness.

Verse twenty already showed David carefully arranging a keeper for the flock.

Eliab's accusation is simply false, and the text has already proven it.

Older siblings do not always know a younger one as well as they assume.

🐑 Eliab accuses David of neglect

✅ Verse twenty already disproves the charge

❌ The accusation is simply false

📖 Assumptions about family are often wrong

## 💢 I Know Thy Pride, And The Naughtiness Of Thine Heart

Naughtiness here is a strong, old word for real wickedness, not childish mischief.

Eliab claims to know David's hidden motives with total confidence.

He has no actual evidence, only assumption and old resentment.

People often accuse others of the very thing they feel guilty of themselves.

💢 Naughtiness means real wickedness, not mischief

🔮 Eliab claims to know David's motives

❌ He has no real evidence

📖 Accusations often reveal the accuser's own heart

## 🙋 Is There Not A Cause

David refuses to take the bait or fight with his brother.

His short question redirects attention back to the real issue, Goliath's standing insult.

He does not defend his own character at length, he simply moves forward.

Staying focused on the real problem is its own kind of strength.

🙋 David refuses to argue back

🎯 He redirects to the real issue

🚶 He simply moves forward instead

📖 Staying focused is its own strength

## 🔁 He Turned From Him Toward Another

David does not let one angry brother stop him.

He keeps asking the same question to other soldiers nearby.

This shows real persistence in the face of family opposition.

Opposition from those closest to him does not change his resolve.

🔁 David keeps asking other soldiers

🚫 One brother's anger does not stop him

💪 This shows real persistence

📖 Family opposition does not shake his resolve

# FirstSamuel 17:31-33
# 👑 Brought Before Saul
---
## 📢 They Rehearsed Them Before Saul

Word of David's bold questions travels quickly up the chain of command.

Rehearsed here simply means his words were repeated exactly to the king.

This shows how fast news moved through a camp this tense.

A shepherd boy's question is now reaching the king's own ears.

📢 David's words spread up the chain quickly

🗣️ Rehearsed means repeated exactly

⚡ News traveled fast in a tense camp

📖 A shepherd's question now reaches the king

## 💪 Let No Man's Heart Fail Because Of Him

David speaks with calm confidence in front of the king himself.

This directly contrasts with verse eleven, where the whole army was described as dismayed.

One shepherd boy is now offering the courage an entire trained army could not find.

Confidence here comes from somewhere other than military experience.

💪 David speaks with calm confidence

😨 This contrasts with the army's fear

🐑 One shepherd offers what the army lacked

📖 His confidence comes from somewhere else

## 🙇 Thy Servant Will Go And Fight With This Philistine

Thy servant was a humble way of speaking to a king in this culture.

David is not boasting, he is formally offering himself using proper court language.

His humility toward Saul contrasts sharply with his boldness toward Goliath.

He knows exactly how to speak to a king and how to speak to an enemy.

🙇 Thy servant was humble court language

👑 David formally offers himself to Saul

⚔️ He is bold only toward the enemy

📖 He knows the right tone for each audience

## 🙅 Thou Art Not Able To Go Against This Philistine

Saul's doubt is a completely reasonable, human response.

He is judging David by size and experience, the same way Goliath will later.

Saul cannot yet see what God has already seen in David back in chapter sixteen.

Appearances keep leading people to the wrong conclusion throughout this whole chapter.

🙅 Saul's doubt seems reasonable on the surface

👀 He judges David by size and experience

💡 God had already seen differently in chapter sixteen

📖 Appearances mislead people again and again here

## ⚔️ A Man Of War From His Youth

Goliath has spent his entire adult life training and fighting professionally.

David, by comparison, has spent his years watching sheep in open fields.

On paper this looks like an impossible mismatch.

The rest of the chapter will completely overturn that first impression.

⚔️ Goliath trained for war his whole life

🐑 David spent his years watching sheep

📉 On paper this looks impossible

📖 The chapter is about to overturn that

# FirstSamuel 17:34-37
# 🦁 The Lion And The Bear
---
## 🦁 There Came A Lion, And A Bear

Shepherds in this hill country genuinely faced dangerous predators, not imagined threats.

Losing a lamb to an animal like this was a real, constant danger of the job.

David is not exaggerating his past for effect, this was ordinary shepherd life.

His courage was already tested long before anyone was watching.

🦁 Predators were a real shepherd danger

🐑 Losing a lamb was a constant risk

✅ David is not exaggerating his past

📖 His courage was tested when no one watched

## 💪 I Went Out After Him, And Smote Him

David does not just mourn the loss of the lamb, he goes after the predator.

Smote means he struck it with force, likely using his shepherd's staff or a stone.

Most people would count the loss and move on.

David's instinct was to pursue and recover what belonged to him.

💪 David pursued the predator instead of giving up

🪵 Smote means he struck it with force

😐 Most people would have just moved on

📖 His instinct was to recover what was his

## 🦁 Caught Him By His Beard

Beard here refers to the loose skin and mane around a lion's jaw.

Grabbing that area meant getting dangerously close to its teeth.

This was not a safe, distant kill, it was hand to hand combat.

The same courage shown here in private is about to be shown in public.

🦁 Beard means the mane near the jaw

⚠️ This was extremely close, dangerous combat

🤝 It was hand to hand, not distant

📖 Private courage becomes public courage

## ⚔️ Slew Both The Lion And The Bear

This was not one lucky encounter, but two separate proven victories.

David's confidence rests on a real, repeated track record, not empty bragging.

He has faced serious danger before and has already survived it twice.

Past faithfulness is about to become the foundation for present courage.

⚔️ Two separate victories, not one lucky escape

📊 David's confidence rests on real experience

🛡️ He has survived serious danger before

📖 Past faithfulness becomes present courage

## 👑 Seeing He Hath Defied The Armies Of The Living God

David places Goliath in the exact same category as the lion and the bear.

To David, this giant is simply another dangerous animal defying God's people.

The size of the threat has changed, but David's response has not.

Consistency of character shows up long before it shows up on a big stage.

👑 David puts Goliath beside the lion and bear

🦁 To David, the giant is just another threat

🔁 His response stays the same either way

📖 Consistency shows up before the big stage does

## 🛡️ The LORD That Delivered Me... He Will Deliver Me

David's whole argument rests on God's past faithfulness.

He does not claim certainty from his own skill or strength.

Instead he reasons that a God who has already saved him will keep saving him.

This single sentence is the theological engine driving the rest of the chapter.

🛡️ David's confidence rests on God's past faithfulness

🚫 It does not rest on his own skill

🔁 Past deliverance predicts future deliverance

📖 This sentence powers the rest of the chapter

## 🤝 Go, And The LORD Be With Thee

Saul finally agrees, and even invokes God's name in his blessing.

This is notable given Saul's own troubled and declining relationship with God since chapter fifteen.

Even a king struggling with obedience can still speak a true blessing.

Saul's words here are more hopeful than his actions have been lately.

🤝 Saul finally agrees to let David go

😔 Saul's own relationship with God has been declining

🙏 Even he can still speak a true blessing

📖 His words sound better than his recent actions

# FirstSamuel 17:38-40
# 🗡️ Choosing The Right Weapon
---
## 🛡️ Saul Armed David With His Armour

Saul offers his own royal armor, likely his best available protection.

Saul had been described in chapter ten as unusually tall, taller than David.

Borrowed armor built for a much bigger man would fit poorly and move awkwardly.

Good intentions do not always produce a good fit.

🛡️ Saul offers his own royal armor

📏 Saul was taller than David

😬 Armor built for a bigger man fits poorly

📖 Good intentions do not guarantee a good fit

## 🚫 He Had Not Proved It

Proved here means tested through practice and familiarity.

David had never trained or fought while wearing armor like this before.

Using unfamiliar gear under pressure is genuinely risky, not just uncomfortable.

Wisdom sometimes means refusing a gift that does not actually help.

🚫 Proved means tested through real practice

🏋️ David had never trained in this armor

⚠️ Unfamiliar gear under pressure is risky

📖 Wisdom sometimes means refusing a gift

## 🙅 I Cannot Go With These

David chooses his own tested skill over borrowed status symbols.

This decision is the opposite of everything Goliath represents in this chapter.

Goliath's identity is built entirely on armor, weight, and equipment.

David's identity rests somewhere else entirely.

🙅 David rejects the borrowed armor

⚖️ This is the opposite of Goliath's approach

🛡️ Goliath's identity rests on his equipment

📖 David's identity rests somewhere else

## 🪨 Five Smooth Stones Out Of The Brook

Smooth stones fly straighter and more predictably from a sling than rough ones.

David is not grabbing random rocks, he is selecting with real skill and care.

Five stones also suggests careful, practical preparation rather than blind confidence.

Skill and preparation are doing quiet work underneath this famous moment.

🪨 Smooth stones flew straighter from a sling

🎯 David selected them with real skill

📊 Five stones shows careful preparation

📖 Skill is working quietly under this moment

## 👜 A Shepherd's Bag... Even In A Scrip

A scrip was a small pouch shepherds used to carry food and tools.

David repurposes an ordinary, everyday shepherd's item for this extraordinary moment.

He needs no special equipment beyond what he already carries daily.

The tools of his ordinary life turn out to be exactly enough.

👜 A scrip was a shepherd's small pouch

🔁 David repurposes an everyday item

🐑 He needed nothing beyond his daily gear

📖 His ordinary tools turn out to be enough

## 🎯 His Sling Was In His Hand

Slings were legitimate, deadly ancient weapons, not children's toys.

Skilled slingers in this period could hit a target with real accuracy and force.

Other passages in scripture describe expert slingers who never missed their mark.

David is not walking out unarmed, he is walking out with a weapon he has mastered.

🎯 Slings were real, deadly weapons

🎪 Skilled slingers hit targets with real force

📚 Other scripture passages praise expert slingers

📖 David carries a weapon he has mastered

# FirstSamuel 17:41-44
# 😤 Goliath's Scorn
---
## 🚶 The Man That Bare The Shield Went Before Him

Goliath's shield bearer marches ahead of him just as before.

This same detail already appeared back in verse seven describing his armor.

That protective setup is about to become completely irrelevant once the fight actually starts.

All his preparation cannot protect him from what is coming.

🚶 The shield bearer marches ahead again

🔁 This detail already appeared in verse seven

⚠️ It is about to become irrelevant

📖 Preparation cannot stop what is coming

## 😤 He Disdained Him

Disdained means looked upon with open contempt.

Goliath forms his entire judgment of David from appearance alone.

He never once considers skill, faith, or God's own choice in the matter.

Snap judgments based on looks fail again and again throughout this chapter.

😤 Disdained means open contempt

👀 Goliath judges only by appearance

🚫 He ignores skill, faith, and God's choice

📖 Snap judgments keep failing in this chapter

## 🌟 Ruddy, And Of A Fair Countenance

These exact same words already described David back in chapter sixteen at his anointing.

There, God told Samuel that man looks on the outward appearance, but God looks on the heart.

Goliath is now making the very mistake God had already warned against.

The reader already knows what Goliath refuses to see.

🌟 The same words described David in chapter sixteen

👁️ God looks on the heart, not appearance

❌ Goliath repeats the mistake God warned against

📖 The reader already knows what Goliath ignores

## 🐕 Am I A Dog, That Thou Comest To Me With Staves

Dogs were viewed with real contempt in this culture, not affection.

Staves is plural, though David actually carried only one staff.

Goliath exaggerates the insult on purpose to make David look even more pathetic.

Mockery here is a weapon just as much as his spear is.

🐕 Dogs were viewed with contempt then

📊 Staves is plural, David carried only one

🎭 Goliath exaggerates the insult on purpose

📖 Mockery is its own kind of weapon

## 🗿 Cursed David By His Gods

Gods here is plural, reflecting the Philistines' worship of multiple deities.

Calling on his gods was a standard part of ancient warfare and formal challenges.

This moment quietly sets up the contrast with David's very next words.

One side calls on many gods, the other calls on one living God.

🗿 Philistines worshiped multiple gods

⚔️ Invoking gods before battle was standard custom

⚖️ This sets up a sharp contrast

📖 Many gods against one living God

## 🦅 Give Thy Flesh Unto The Fowls Of The Air

This threat goes beyond simple death, it threatens denial of a proper burial.

Leaving a body exposed to birds and animals was considered a severe curse in this culture.

Goliath is trying to humiliate David completely, not just defeat him.

Words like these were meant to break a person's spirit before the fight even began.

🦅 The threat includes denial of burial

😱 Exposure to animals was a severe curse

💔 Goliath aims for humiliation, not just victory

📖 Words tried to break David before the fight

# FirstSamuel 17:45-47
# 🙌 David's Declaration
---
## 🗡️ I Come To Thee In The Name Of The LORD Of Hosts

LORD of hosts is a military title meaning commander of heaven's armies.

Goliath listed his sword, spear, and shield as his weapons.

David answers that list with a name instead of a weapon.

He is entering this fight with an entirely different source of strength.

🗡️ Goliath lists physical weapons

👑 LORD of hosts means commander of heaven's armies

🔄 David answers weapons with a name

📖 His strength comes from somewhere else entirely

## 🎯 Whom Thou Hast Defied

David deliberately repeats the exact word Goliath used back in verse ten.

Goliath said he defied the armies of Israel.

David corrects that claim, this fight was always really against God.

The insult never actually belonged to Israel alone.

🎯 David repeats Goliath's own word

🔁 Goliath claimed to defy Israel

☝️ David corrects that, it was always God

📖 The insult was never Israel's alone

## ⚔️ I Will Smite Thee, And Take Thine Head From Thee

David predicts this exact outcome before the fight has even started.

This is a remarkable level of confidence spoken out loud in public.

The chapter later shows this precise prediction actually happening, word for word.

Faith here is not vague hope, it is specific and stated plainly.

⚔️ David predicts the outcome before fighting

🗣️ This confidence is spoken publicly

✅ The prediction comes true exactly later

📖 His faith is specific, not vague

## 🕊️ Give The Carcases Of The Host Of The Philistines

David boldly extends his prediction beyond Goliath to the entire Philistine army.

This is a bold escalation from a single duel to a full military outcome.

He is not just fighting for his own life or reputation here.

He is speaking as though the whole battle's ending is already decided.

🕊️ David extends his prediction to the whole army

📈 This is a bold escalation from one duel

🎯 He is not fighting for himself alone

📖 He speaks as if it is already decided

## 🌍 That All The Earth May Know That There Is A God In Israel

David states his actual purpose here, and it is not personal glory.

He wants everyone watching, on both sides, to see who God really is.

This line is the theological center of the entire chapter.

Every detail before this moment has been building toward this exact sentence.

🌍 David's purpose is not personal glory

👀 He wants everyone to see who God is

🎯 This is the chapter's theological center

📖 Everything before this has led here

## ⚔️ The Battle Is The LORD's

This short sentence is the clearest statement in the whole chapter.

David is not claiming God will help him fight, he is claiming God will do the fighting.

Victory here does not depend on conventional weapons or human strength at all.

This single line reframes everything that is about to happen next.

⚔️ The clearest line in the whole chapter

🙌 God does the fighting, not just helps

🚫 Victory does not depend on weapons

📖 This line reframes what happens next

# FirstSamuel 17:48-51
# 🎯 The Fight Itself
---
## 🏃 David Hastened, And Ran Toward The Army To Meet The Philistine

David runs directly toward the danger everyone else has been avoiding.

Back in verse twenty four, the men of Israel were described as fleeing from Goliath.

David's direction is the exact opposite of the whole army's earlier response.

Courage here is shown through movement, not just through words.

🏃 David runs straight toward the danger

🚶 Israel had fled from Goliath earlier

🔄 His direction reverses the army's response

📖 Courage shows up in his movement

## 🎯 Smote The Philistine In His Forehead

The forehead was the one unprotected spot on Goliath's entire body.

Verses five and six already listed his helmet, mail, and leg armor in detail.

This was not a lucky, random hit, it targeted the single gap in his armor.

Every earlier detail about Goliath's equipment now pays off in one precise moment.

🎯 The forehead was Goliath's one unprotected spot

🪖 His armor was listed in detail earlier

🎪 This hit targeted that exact gap

📖 Earlier detail pays off in one moment

## 🪨 The Stone Sunk Into His Forehead

A sling stone thrown with real skill could reach lethal speed and force.

This corrects a common modern assumption that a sling was a harmless toy.

David's earlier claim of skill with this weapon is now proven true.

The stone did not merely stun Goliath, it struck with genuinely fatal force.

🪨 A skilled sling throw could be lethal

🎯 This was not a harmless toy weapon

✅ David's claimed skill is now proven

📖 The stone struck with real, fatal force

## 🗡️ There Was No Sword In The Hand Of David

David deliberately did not carry a sword into this fight.

This detail directly confirms his own words back in verse forty five.

He said he would defeat Goliath without conventional weapons, and this proves it.

His declaration of faith and his actual method now perfectly line up.

🗡️ David carried no sword at all

📜 This confirms his words from verse forty five

✅ His declared faith matches his actual method

📖 Words and actions line up perfectly

## 🗡️ Took His Sword... And Cut Off His Head Therewith

David finishes the fight using Goliath's own weapon against him.

The giant who trusted in his own equipment is undone by that very equipment.

This is a striking, symbolic reversal of everything Goliath represented all chapter.

The proudest piece of his armory becomes the tool of his own defeat.

🗡️ David uses Goliath's own sword

🔄 The giant is undone by his own gear

🎭 This is a striking symbolic reversal

📖 His pride becomes his own downfall

## 🏃 When The Philistines Saw Their Champion Was Dead, They Fled

The entire outcome of this standoff hinged on one single duel, exactly as offered in verse nine.

Both armies had implicitly agreed to those terms weeks earlier without a written contract.

One man's death ends a conflict that thousands of soldiers had been unable to resolve.

The whole war turns on the very same wager the Philistines proposed themselves.

🏃 The Philistines flee once their champion falls

📜 This matches the original terms from verse nine

⚔️ One death ends what thousands could not

📖 Their own wager decided their own defeat

# FirstSamuel 17:52-54
# 🏆 The Aftermath
---
## 🏃 Pursued The Philistines, Until Thou Come To The Valley, And To The Gates Of Ekron

Ekron and Gath were two of the five major Philistine cities.

Israel's army chases the retreating Philistines deep into their own home territory.

What had been a weeks long standoff collapses into a total, one sided rout.

One man's obedience unlocked a victory the whole army could not find on its own.

🏃 Ekron and Gath were Philistine cities

🗺️ Israel chased them into their own territory

💥 The standoff collapsed into a total rout

📖 One man's obedience unlocked this victory

## 💰 Spoiled Their Tents

Spoiled here means plundered or looted, not ruined or spoiled food.

Taking supplies from a defeated camp was a standard, expected part of ancient warfare.

Israel gained real, practical resources from a battle they had been too afraid to start.

Fear had almost cost them a victory that was actually within reach the whole time.

💰 Spoiled means plundered, not ruined

📦 Looting a defeated camp was standard practice

🎁 Israel gained real supplies from this win

📖 Fear had almost cost them an easy win

## 🏙️ David Took The Head Of The Philistine, And Brought It To Jerusalem

Jerusalem was not yet fully under Israelite control at this point in the story.

David would not personally capture the city until years later, described in second Samuel.

Many scholars believe this detail was added by a later editor summarizing later events.

The Bible does not hide this kind of detail, it simply records what happened.

🏙️ Jerusalem was not yet fully Israelite here

📆 David captures it years later in second Samuel

📝 This detail likely reflects later editing

📖 Scripture records events plainly either way

## 🛡️ He Put His Armour In His Tent

Goliath's armor becomes a kept trophy rather than something quickly discarded.

Later scripture reveals Goliath's sword ends up stored at the tabernacle in Nob.

David himself returns to retrieve that very sword years later in chapter twenty one.

One battle's leftover equipment quietly becomes part of a much later story.

🛡️ Goliath's armor became a kept trophy

⛺ His sword later rests at the tabernacle

🔁 David retrieves that sword in chapter twenty one

📖 This detail echoes forward in the story

## 🗺️ The Wounded Of The Philistines Fell Down By The Way To Shaaraim

Shaaraim was a real town along the route of the Philistine retreat.

Naming this place grounds the story in actual, verifiable ancient geography.

This was not a vague legend, it happened along a specific, known road.

Real places anchor real events throughout the historical books of the Bible.

🗺️ Shaaraim was a real town on the route

📍 Naming it grounds the story in geography

✅ This was not a vague legend

📖 Real places anchor real biblical events

# FirstSamuel 17:55-58
# ❓ Whose Son Is This
---
## ❓ Whose Son Is This Youth?

Abner was Saul's cousin and the commander of his army.

Saul is asking specifically about David's family background, not simply who he is.

This question connects directly back to the reward promised in verse twenty five.

The king needs to know exactly which family to honor.

❓ Abner was Saul's army commander

👨‍👦 Saul asks about David's family specifically

🎁 This connects to the earlier promised reward

📖 The king must know which family to reward

## 🤷 As Thy Soul Liveth, O King, I Cannot Tell

This phrase is a solemn oath formula used when swearing something is true.

It is notable that Saul's own top general does not recognize a young man from chapter sixteen.

Some readers see this as a real gap in the earlier account, and scholars remain divided on it.

Others read Saul's question as focused only on lineage, not on personal recognition at all.

🤷 This is a solemn oath formula

❓ Abner claims not to know David

📚 Scholars are genuinely divided on why

📖 The question may be about lineage, not memory

## 🧑 Enquire Thou Whose Son The Stripling Is

Stripling means a young, slender youth, similar to how David has been described before.

Saul persists in wanting a direct, confirmed answer about David's family line.

This persistence lines up with the reward tied to a specific household back in verse twenty five.

The king is doing due diligence before he grants an enormous reward.

🧑 Stripling means a young, slender youth

🔁 Saul persists in seeking a confirmed answer

📜 This matches the reward tied to a family

📖 The king checks his facts before rewarding

## 🎖️ Brought Him Before Saul With The Head Of The Philistine In His Hand

This is a formal, ceremonial presentation, not a casual conversation.

The visible proof in David's hand backs up every word about what he just did.

This staging matters for a reward that depended on confirmed, undeniable proof.

The scene closes with public, visible evidence rather than mere rumor.

🎖️ This was a formal, ceremonial moment

✋ The head served as visible proof

📜 Proof mattered for the promised reward

📖 The scene ends in public evidence, not rumor

## 🙇 I Am The Son Of Thy Servant Jesse The Bethlehemite

David answers with the same humble, formal language he used with Saul back in verse thirty two.

He names his father Jesse directly, exactly what Saul had been trying to confirm.

This answer quietly sets up the reward and the relationship that unfolds in chapter eighteen.

A shepherd boy's simple family name is about to change the course of Israel's whole story.

🙇 David repeats his humble, formal language

👨‍👦 He names his father Jesse directly

🔮 This sets up chapter eighteen's events

📖 A simple family name changes Israel's story
`.trim();

export const FIRST_SAMUEL_SEVENTEEN_PERSONAL_SECTIONS = parseFirstSamuelSeventeenRawNotes(FIRST_SAMUEL_SEVENTEEN_RAW_NOTES);
