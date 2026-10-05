export type AmosOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosOneRawNotes(rawText: string): AmosOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 1:${startVerse}` : `Amos 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Amos 1 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_ONE_RAW_NOTES = `# Amos 1:1-2
# 📜 The Words Of Amos
---
## 🐑 The Words Of Amos

Amos was not a trained prophet raised among priests or kings.

He worked outdoors with sheep and cattle before God ever called him.

This opening line names who is speaking and where his words came from.

The LORD often chose plain, unlikely men over polished insiders.

A shepherd's voice is about to confront nations far larger than his own.

The message carries weight because of who sent it, not who delivers it.

🐑 Amos worked with sheep and cattle

📜 His spoken words were written down

👑 An outsider now confronts kings

📖 God chooses unlikely messengers

## 🏔️ Among The Herdmen Of Tekoa

Tekoa was a small town on the edge of the Judean wilderness.

It sat about ten miles south of Jerusalem.

A herdman spent his days in open country, watching sheep and cattle.

That life left little room for formal training or royal connections.

Amos left those quiet hills the moment God sent him north.

The LORD's call reached a man nobody in power expected to hear from.

🏔️ Tekoa bordered the wilderness

🐑 A herdman worked outdoors daily

🗺️ Ten miles south of Jerusalem

📖 God called an unexpected man

## 🌍 Two Years Before The Earthquake

This earthquake was remembered long after it struck.

The prophet Zechariah still points back to this same event centuries later.

Many scholars connect it to a destruction layer archaeologists found at ancient Hazor.

Amos anchors his whole book to this one shared, dateable memory.

A specific disaster told the first readers exactly when these words were spoken.

🌍 A severe, memorable earthquake

📜 Zechariah mentions it centuries later

🏛️ Hazor shows a matching ruin layer

📖 The date anchors Amos in real history

## 🦁 The LORD Will Roar From Zion

A roar is not a gentle sound.

Lions roar to warn before they attack.

Zion names Jerusalem, where the LORD's own temple stood.

His voice is now going out from His own house.

The nations around Israel had sinned for years.

The LORD was not silent any longer.

🦁 A roar warns, it does not whisper

🏛️ Zion names Jerusalem's temple

📢 God's voice comes from His own house

📖 The LORD was not silent

## 🌿 The Top Of Carmel Shall Wither

Carmel was a mountain range famous for its lush, green beauty.

Travelers used it as a picture of fertility and plenty.

Even that lush mountain will dry up under the weight of God's roar.

If Carmel can wither, nothing in creation is safe from judgment.

The most fruitful places still answer to the LORD.

🌿 Carmel was known for green fertility

🏔️ Even rich land can dry up

⚖️ Nothing escapes God's judgment

📖 The LORD rules the richest places

# Amos 1:3-5
# ⚖️ For Three Transgressions, And For Four
---
## ⚖️ For Three Transgressions, And For Four

This phrase is a counting formula, not a literal count.

Hebrew poetry often names one number, then the next number up.

The pattern means the offenses are many, not exactly three or four.

God is not accusing Damascus of one small fault.

A whole pattern of sin has filled up and run over.

⚖️ Three and four means complete and full

🔢 Not a literal headcount of sins

📈 Sin has piled up for years

📖 The whole pattern deserves judgment

## ⏳ I Will Not Turn Away The Punishment Thereof

This line means God will not hold back judgment any longer.

Patience is not the same as permission.

The LORD had been patient with Damascus for a long time.

That patience has now run out completely.

The word thereof simply means for that specific sin just named.

Judgment delayed is not judgment canceled.

⏳ Patience has finally run out

🚫 Judgment will not be held back

📅 God's patience was not permission

📖 Delayed judgment was never canceled

## 🔨 Threshed Gilead With Threshing Instruments Of Iron

Threshing was normally a harvest task, beating grain to separate it from the husk.

Farmers dragged a heavy, spiked sledge over the stalks to do this.

Syria's armies used that same violence on the people of Gilead instead of grain.

This pictures captives crushed and dragged through brutal, prolonged war.

The image turns a peaceful farm chore into a description of cruelty.

🌾 Threshing normally separated grain from husk

🔨 A spiked sledge crushed the stalks

⚔️ Syria turned that violence on people

📖 A farm image becomes a war crime

## 🔥 I Will Send A Fire Into The House Of Hazael

Hazael was a real king of Damascus, known from Israel's own history books.

He seized the throne through violence and later crushed Israel's armies for years.

This judgment names his own royal house as the target.

A fire against a house meant total, lasting destruction, not a small setback.

The LORD is not guessing at who caused this harm.

🔥 Hazael was a real, violent king

👑 He crushed Israel for years

🏚️ Fire meant total destruction

📖 God named the exact guilty house

## 🚪 I Will Break Also The Bar Of Damascus

City gates were locked for the night with a heavy wooden or metal bar.

Breaking that bar meant the city's defenses had completely failed.

Damascus trusted its walls and gates to keep danger out.

The LORD is promising to reach past every lock the city has.

No gate built by men can shut Him out.

🚪 A bar locked the city gate

🏰 Broken defenses meant total failure

🛡️ Walls could not keep God out

📖 No gate shuts out the LORD

## 🗺️ The People Of Syria Shall Go Into Captivity Unto Kir

Kir was the place Syria's own people are said to have come from long before.

Sending them back there turns their own history into their punishment.

The nation that once came out of Kir now returns to it in chains.

This is not a random destination chosen for exile.

The LORD is closing the circle their own story began in.

🗺️ Kir was Syria's own point of origin

🔁 Exile sends them back where they began

⛓️ Freedom ends in chains, not escape

📖 God closes the circle Himself

# Amos 1:6-8
# 🏺 For Three Transgressions Of Gaza
---
## 🏺 For Three Transgressions Of Gaza

Gaza was a major Philistine city, old enough to appear in Israel's earliest stories.

The same complete, overflowing measure of guilt named at Damascus applies here too.

This time the crime is different, not violence in war but trading in people.

No neighbor of Israel is exempt from the same standard of justice.

God weighs every nation by the same measure.

🏺 Gaza was an ancient Philistine city

⚖️ The same standard applies to everyone

👥 This crime involves trading in people

📖 No nation is exempt from justice

## ⛓️ Carried Away Captive The Whole Captivity

This was not soldiers taken prisoner during a battle.

Whole communities, men, women, and children, were seized and sold.

Gaza ran a trade in human beings as if people were goods.

That is the specific crime named here, not ordinary warfare.

Selling a whole population erases every one of their names and lives.

⛓️ Whole communities were seized, not soldiers

💰 People were sold like goods

👪 Men, women, and children taken together

📖 A whole population erased by trade

## 🌍 To Deliver Them Up To Edom

Edom had its own harsh reputation among Israel's neighbors.

Gaza was not just capturing people, it was shipping them onward.

Edom served as a destination for this trade in human lives.

Naming Edom here ties two guilty nations to the very same crime.

No one in this chain of cruelty stands innocent.

🌍 Edom received this human cargo

🔗 Two nations shared one crime

📦 People were shipped like goods

📖 No link in the chain is innocent

## 🔥 Devour The Palaces Thereof

A palace was a wealthy ruler's home, built for comfort and power.

Fire was promised against these buildings specifically, not every house in the city.

The people who profited most from this cruelty lived in those very palaces.

Judgment is landing exactly where the wealth from this crime was stored.

The LORD does not aim His judgment blindly.

🔥 Fire was promised to the palaces

👑 Rulers, not common people, profited

💰 Wealth from cruelty was stored there

📖 Judgment lands where the profit sat

## 👑 Him That Holdeth The Sceptre From Ashkelon

A sceptre was a ruler's rod, a symbol of royal authority.

Ashkelon was one of five major Philistine cities along the coast.

Cutting off its ruler meant ending its power to rule at all.

This judgment reaches every level of Philistine leadership, not just Gaza's king.

No single city escapes by hiding behind another's name.

👑 A sceptre symbolized royal authority

🏙️ Ashkelon was a major Philistine city

✂️ Cutting it off ended its rule

📖 Judgment reached every level of leadership

## 🏙️ The Remnant Of The Philistines Shall Perish

The Philistines were organized around five major cities along the coast.

Only four are named across these verses, Gaza, Ashdod, Ashkelon, and Ekron.

Gath, the fifth city, may already have fallen before Amos spoke these words.

A remnant means whatever was left standing after everything else had already fallen.

Even what survived earlier judgments will not escape this one.

🏙️ Five cities once ruled Philistia

🏚️ Gath may have already fallen

🕯️ Remnant means whatever was left

📖 Nothing survives this final judgment

# Amos 1:9-10
# ⚓ For Three Transgressions Of Tyrus
---
## ⚓ For Three Transgressions Of Tyrus

Tyre was a wealthy trading city built partly on an island just off the coast.

Its ships carried goods across the sea.

Its merchants carried just as much influence.

This charge is not about an army crossing a border in open war.

Tyre's guilt came through commerce, not through a sword.

⚓ Tyre was a wealthy trading city

🚢 Ships carried goods and influence

💼 Guilt came through trade, not war

📖 Commerce can sin as surely as armies

## 🤝 Remembered Not The Brotherly Covenant

Centuries earlier, Tyre's king Hiram had been a friend to both David and Solomon.

That friendship was remembered as a kind of brotherly agreement between the two nations.

Tyre broke that old bond by helping sell Israel's own people into slavery.

A covenant does not expire just because greed becomes more convenient.

Loyalty mattered less to Tyre than the profit from the trade.

🤝 Hiram was once a royal friend

📜 Two nations shared a covenant

💔 Tyre broke that old bond

📖 Greed does not cancel a covenant

## 🏰 A Fire On The Wall Of Tyrus

Tyre was famous for walls that had never fallen to an attacking army.

Its island location made the city feel completely untouchable.

This judgment targets the one thing Tyre trusted most, its own defenses.

No wall built by human hands can outlast the LORD's judgment.

Pride in stone walls could not shield Tyre from God.

🏰 Tyre's walls had never fallen

🏝️ Its island felt untouchable

🎯 Judgment targets Tyre's greatest pride

📖 No wall outlasts the LORD

## 📦 Delivered Up The Whole Captivity To Edom

This is the same crime already named against Gaza, trading whole populations as goods.

Tyre and Gaza were not acting alone.

Both nations were part of the same trading network.

Edom shows up again as the destination for this human trade.

Wealthy Tyre profited from the very same cruelty as its poorer neighbor.

📦 The same crime as Gaza's

🔗 Tyre and Gaza shared one network

🌍 Edom received the trade again

📖 Wealth did not excuse the cruelty

# Amos 1:11-12
# ⚔️ For Three Transgressions Of Edom
---
## ⚔️ For Three Transgressions Of Edom

Edom descended from Esau, the brother of Jacob, Israel's own ancestor.

This was not a quarrel between strangers.

It was a fight between actual kin.

The word brother in these verses is not a figure of speech here.

Family history makes this cruelty sting in a way the others did not.

⚔️ Edom descended from Esau himself

👪 This fight was between real kin

💔 Brother here is literal, not figurative

📖 Family history deepens the cruelty

## 🗡️ Did Pursue His Brother With The Sword

His brother here points straight back to Jacob and Esau's old rivalry.

That old family conflict in Genesis never fully ended.

Generations later, Edom was still settling a grudge with a sword in hand.

Shared blood did not stop the violence.

It may have fueled the violence instead.

🗡️ Brother points to Jacob and Esau

📜 Genesis started this old rivalry

⏳ Generations later, the grudge continued

📖 Shared blood did not stop violence

## 💔 Did Cast Off All Pity

Pity means the natural instinct to show mercy when someone suffers.

Edom did not lose this feeling by accident in a single angry moment.

The text describes a choice, casting pity off on purpose.

This was a settled national policy, not one bad decision.

Mercy was removed on purpose, not lost by mistake.

💔 Pity means natural mercy toward suffering

🚫 Edom cast that mercy away

📋 This was a deliberate choice

📖 A policy, not one bad moment

## 🔥 His Anger Did Tear Perpetually

Perpetually means without stopping, not just for a season or a single war.

Most anger cools with time or distance.

Edom's anger is described as still tearing, generation after generation.

This was not a flare up but a lasting fire that never went out.

The LORD names this anger for exactly what it had become.

🔥 Perpetually means without ever stopping

⏱️ Most anger cools with time

🌀 Edom's anger kept tearing on

📖 A fire that never went out

## 🏔️ Devour The Palaces Of Bozrah

Teman and Bozrah were real cities inside Edom's own territory.

Naming specific places makes this judgment concrete, not vague or symbolic.

These were not distant enemies but Edom's own familiar ground.

Judgment was coming to the exact towns Edom called home.

God's warnings were never aimed at a vague, faceless nation.

🏔️ Teman and Bozrah were real cities

📍 Naming places makes judgment concrete

🏠 These towns were Edom's own ground

📖 Judgment reached Edom's own home

# Amos 1:13-15
# 🗡️ For Three Transgressions Of The Children Of Ammon
---
## 🏘️ For Three Transgressions Of The Children Of Ammon

Ammon descended from Lot, Abraham's own nephew.

This is another near kin nation, much like Edom.

Ammon's guilt is not about defending its own small borders.

The coming verses show deliberate cruelty, not simple self defense.

God weighs even Israel's distant relatives by the same standard.

🏘️ Ammon descended from Lot himself

👪 Another near kin nation like Edom

🎯 This was not simple self defense

📖 Deliberate cruelty drove this crime

## 💀 They Have Ripped Up The Women With Child Of Gilead

This is the hardest line in the whole chapter to read.

Pregnant women in Gilead were deliberately killed during an invasion.

This was not an accident of war but a chosen act of terror.

The LORD names this cruelty plainly instead of looking away from it.

Some sins are too severe to describe in gentle language.

💀 The hardest line in the chapter

🤰 Pregnant women were deliberately targeted

😢 This was chosen terror, not accident

📖 God names cruelty plainly, not quietly

## 🗺️ That They Might Enlarge Their Border

This violence was not blind rage in the heat of battle.

Ammon's goal was calculated, more land for itself.

Killing the vulnerable was a strategy, not a side effect.

Greed, not fury, is named as the real motive here.

Land was worth more to Ammon than human life.

🗺️ The goal was more land

🧮 This was calculated, not blind rage

🎯 Killing the vulnerable was strategy

📖 Greed was the real motive

## 🌀 A Tempest In The Day Of The Whirlwind

A tempest is a violent storm that arrives without warning.

A whirlwind adds spinning, uncontrollable force to that same picture.

No one outruns a storm like this once it begins.

Judgment is coming the same way, sudden and impossible to escape.

Ammon will not see this coming in time to prepare.

🌀 A tempest strikes without warning

🌪️ A whirlwind adds uncontrolled force

🏃 No one outruns a storm like this

📖 Judgment arrives sudden and inescapable

## 👑 Their King Shall Go Into Captivity, He And His Princes Together

No one at the top of Ammon's government escapes this judgment.

The king and every prince beneath him are swept away together.

Power offered no shelter once this judgment arrived.

Leadership that once gave orders now marches into exile instead.

The whole ruling class falls at exactly the same moment.

👑 The king is not spared

🤝 Every prince goes too

🚫 Power gave no shelter here

📖 Leadership marches into exile together
`.trim();

export const AMOS_ONE_PERSONAL_SECTIONS = parseAmosOneRawNotes(AMOS_ONE_RAW_NOTES);
