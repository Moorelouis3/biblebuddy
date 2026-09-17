export type PsalmsSeventyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyTwoRawNotes(rawText: string): PsalmsSeventyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+72:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 72 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+72:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+72:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 72 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 72,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 72:${startVerse}` : `Psalms 72:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 72 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_TWO_RAW_NOTES = `# Psalms 72:1-2
# 👑 A Prayer Handed From One King To Another
---
## 👑 Give The King Thy Judgments, O God

Judgments here means the wisdom to rule with justice, not a list of punishments.

This is a prayer, not a boast about the king already having wisdom.

David is asking God to be the source of the king's ability to judge well.

No human ruler can supply this kind of fairness on his own.

👑 Judgments means wisdom to rule with justice

🙏 This is a prayer, not a boast

🙌 God is the source of that wisdom

📖 No ruler supplies this on his own

## 🙌 Thy Righteousness Unto The King's Son

The king's son likely refers to Solomon, David's son and successor.

Many scholars believe David wrote this prayer near the end of his reign.

Righteousness here means the character to rule justly, not just good judgments.

A king needs both wisdom to decide and character to decide right.

This prayer covers the ruler's mind and his heart together.

🙌 The king's son likely means Solomon

👴 David likely wrote this near reign's end

⚖️ Righteousness means the character to rule justly

📖 The prayer covers his mind and heart

## ⚖️ He Shall Judge Thy People With Righteousness

This verse answers the prayer just prayed in verse one.

The king ruling well is not automatic, it is the hoped for result.

Thy people reminds the king that Israel belongs to God first.

The king rules as a steward, not as the true owner.

⚖️ This verse answers the prayer above

🙅 Good rule was hoped for, not automatic

🙏 Thy people means Israel belongs to God

📖 The king rules as a steward, not owner

## 🤲 Thy Poor With Judgment

Judgment paired with poor points to fair treatment in court, not favors.

In the ancient world, the poor often had no power to demand justice.

A good king was measured by how he treated people who could not repay him.

This line sets up a theme that repeats through the whole psalm.

🤲 Judgment here means fair treatment in court

📉 The poor often had no power then

⚖️ A king was measured by this test

📖 This theme repeats through the psalm

# Psalms 72:3-4
# 🏔️ Peace Grown From Justice, Not Luck
---
## 🏔️ The Mountains Shall Bring Peace To The People

Mountains and hills were often used as pictures of the whole land.

This does not mean the land itself produces peace by magic.

It means a just king ruling well leads to peace across the whole country.

Even the farthest hillsides, not just the capital city, share in this peace.

🏔️ Mountains and hills picture the whole land

🙅 Peace does not come from the land itself

⚖️ A just king leads to peace instead

📖 Even the farthest hillsides share in it

## 🌿 The Little Hills, By Righteousness

This line repeats the same idea as the mountains, using smaller hills.

Hebrew poetry often says one thing twice using two matching pictures.

Both lines together stress the same truth, righteousness produces real peace.

The repetition itself is the point, not two separate ideas.

🌿 Little hills repeat the mountains' picture

🔁 Hebrew poetry often repeats an idea twice

⚖️ Righteousness is shown to produce peace

📖 The repetition itself is the point

## 👶 He Shall Save The Children Of The Needy

Children of the needy means the most vulnerable people in society.

A child with no wealthy family had almost no protection in this world.

The king's justice is measured by how he treats those with no voice.

This is not abstract fairness, it is rescue for real people.

👶 Children of the needy means the vulnerable

🛡️ A poor child had little protection then

⚖️ Justice is measured by treatment of the voiceless

📖 This is rescue, not abstract fairness

## 💔 Shall Break In Pieces The Oppressor

Oppressor means someone using power to take advantage of the weak.

Break in pieces is a strong, violent image of complete defeat.

Real justice sometimes requires actively stopping people who cause harm.

A just king does not just help victims, he confronts those who hurt them.

💔 Oppressor means someone abusing power over the weak

🔨 Break in pieces pictures complete defeat

🛑 Justice sometimes must actively stop harm

📖 A just king confronts, not just comforts

# Psalms 72:5-7
# 🌦️ A Reign Lasting As Long As The Sky
---
## ☀️ They Shall Fear Thee As Long As The Sun And Moon Endure

Fear here means deep reverence and respect, not being scared.

Sun and moon were the ancient world's clearest picture of permanence.

This prayer asks for a reign that lasts as long as the sky itself.

It reaches far beyond any one king's natural lifetime.

☀️ Fear means reverence, not being scared

🌙 Sun and moon picture lasting permanence

⏳ The prayer asks for an unending reign

📖 It reaches past one king's lifetime

## 🌧️ He Shall Come Down Like Rain Upon The Mown Grass

Mown grass is grass that has already been cut short.

Rain on cut grass helps it grow back quickly and fully.

This king's influence is pictured as something that restores and revives.

It is a gentle image, not a picture of force or conquest.

🌧️ Mown grass means grass already cut short

🌱 Rain helps cut grass grow back fully

🔄 This king restores and revives, like rain

📖 A gentle image, not one of force

## 🌱 Showers That Water The Earth

This line repeats the rain image from the line just before it.

Showers add the idea of steady, regular rainfall, not one storm.

The king's good rule is not a single event, it keeps happening.

Both lines together picture a reign that constantly refreshes the land.

🌱 This repeats the rain image again

🌦️ Showers means steady, regular rainfall

🔁 Good rule keeps happening, not just once

📖 A reign that constantly refreshes the land

## 🌸 In His Days Shall The Righteous Flourish

Flourish means growing and thriving, the same word used for healthy plants.

In his days ties this blessing directly to this king's specific reign.

The righteous are not just protected under this king, they actually thrive.

This connects back to the rain image just used above.

🌸 Flourish means growing and thriving

📅 In his days ties this to his reign

🌿 The righteous thrive, not just survive

📖 This connects to the rain pictured above

## ☮️ Abundance Of Peace So Long As The Moon Endureth

Abundance means more than enough, not just a small amount of peace.

The moon appears again here, matching the sun mentioned in verse five.

Using both sun and moon frames peace as lasting the entire span of time.

This closes the section on the same note of permanence it opened with.

☮️ Abundance means far more than enough

🌙 The moon matches the sun from verse five

⏳ Peace is framed as lasting all time

📖 The section closes where it opened

# Psalms 72:8-9
# 🌍 A Kingdom Reaching Every Direction
---
## 🌊 He Shall Have Dominion Also From Sea To Sea

Dominion means ruling authority over a wide area, not just a title.

Sea to sea is a Hebrew way of saying from one edge to the other.

This does not literally map out exact borders on a map.

It pictures a kingdom with no real limit to its reach.

🌊 Dominion means real ruling authority

🗺️ Sea to sea means edge to edge

🚫 Not a literal map of exact borders

📖 It pictures a kingdom without real limit

## 🏞️ From The River Unto The Ends Of The Earth

The river likely refers to the Euphrates, a major boundary in that world.

Ends of the earth means everywhere beyond even that far boundary.

Pairing a known river with an unknown edge stretches the picture wider.

Together with sea to sea, this verse pictures total, complete reach.

🏞️ The river likely means the Euphrates

🌐 Ends of the earth means everywhere beyond

📏 A known place paired with an unknown edge

📖 Together this pictures total, complete reach

## 🏜️ They That Dwell In The Wilderness Shall Bow Before Him

Wilderness describes people living far from cities, on the margins.

Bow before him is a picture of submission and honor, not fear alone.

Even people at the edge of civilization recognize this king's authority.

This shows the reach from verse eight is not just theory.

🏜️ Wilderness means people far from cities

🙇 Bow before him means submission and honor

🌐 Even edge dwellers recognize his authority

📖 This proves the reach from verse eight

## 🐫 His Enemies Shall Lick The Dust

Lick the dust is a vivid ancient picture of total, humbling defeat.

It likely comes from the posture of bowing low enough to touch the ground.

This is not literal, it is a strong image of complete submission.

Enemies who once resisted now show the same honor as everyone else.

🐫 Lick the dust pictures total defeat

🙇 It comes from bowing very low

🚫 Not literal, a strong image instead

📖 Even enemies now show the same honor

# Psalms 72:10-11
# 🎁 Kings Bring Gifts Instead Of Armies
---
## 🚢 The Kings Of Tarshish And Of The Isles Shall Bring Presents

Tarshish was likely a distant trading city, possibly in modern day Spain.

The isles refers to coastal lands and islands across the Mediterranean Sea.

Naming these far off places shows how wide this king's respect reaches.

Rulers from the edges of the known world choose to honor him.

🚢 Tarshish was likely a distant trading city

🏝️ The isles means Mediterranean coastlands

🌍 Far off places honor this king

📖 Respect reaches to the known world's edge

## 🐪 The Kings Of Sheba And Seba Shall Offer Gifts

Sheba and Seba were likely wealthy kingdoms in Arabia and northeast Africa.

These names pair with Tarshish and the isles to cover every direction.

The queen of Sheba's later visit to Solomon echoes this exact verse.

Wealthy, powerful nations choosing to give gifts shows real, willing honor.

🐪 Sheba and Seba were likely African and Arabian

🧭 These names cover every direction combined

👑 This echoes the queen of Sheba's later visit

📖 Wealthy nations giving gifts shows willing honor

## 🙇 Yea All Kings Shall Fall Down Before Him

Yea adds emphasis, underlining that this next claim is not an exaggeration.

Fall down before him pictures full bowing, not a simple nod of respect.

This moves from specific named kingdoms to every king everywhere.

The prayer has widened from a region to the entire world.

🙇 Yea adds emphasis to this claim

🛐 Fall down pictures full bowing, not a nod

🌐 This widens from named kingdoms to every king

📖 The prayer now covers the whole world

## 🌐 All Nations Shall Serve Him

Serve here means genuine service, not forced slavery under threat.

Nations refers to entire peoples, not just their individual rulers.

This closes the section by widening the picture one final time.

From kings bowing to entire nations serving, the reach keeps growing.

🌐 Serve means willing service, not forced slavery

👥 Nations means whole peoples, not just kings

📈 The picture widens one final time here

📖 From kings bowing to nations serving

# Psalms 72:12-14
# 💰 A King Who Actually Rescues The Poor
---
## 🙏 For He Shall Deliver The Needy When He Crieth

For signals this verse explains why the king deserves this honor.

The needy person crying out pictures someone with nowhere else to turn.

Him that hath no helper describes total, complete helplessness.

This king's worth is proven by how he treats people who cannot repay him.

🙏 For explains why he deserves honor

😢 Crying out pictures someone with no options

🚫 No helper means total helplessness

📖 His worth is proven by helping the powerless

## 🤲 He Shall Spare The Poor And Needy

Spare here means actively protect, not simply avoid harming.

This repeats the same concern for the poor from earlier in the psalm.

Shall save the souls of the needy adds that this rescue reaches deep.

Souls points to a person's whole life, not just their immediate need.

🤲 Spare means actively protect, not just avoid harm

🔁 This repeats the earlier concern for the poor

💫 Souls means their whole life, not one need

📖 The rescue goes deeper than surface help

## ⛓️ He Shall Redeem Their Soul From Deceit And Violence

Redeem means buying someone back out of danger, often at a cost.

Deceit and violence name two different ways the poor were commonly harmed.

Being cheated and being physically hurt are both covered by this promise.

No single kind of harm is left outside the king's protection.

⛓️ Redeem means buying someone back from danger

🎭 Deceit and violence name two kinds of harm

🛡️ Being cheated and being hurt are both covered

📖 No kind of harm sits outside protection

## 🩸 Precious Shall Their Blood Be In His Sight

Precious here means valuable, worth protecting at real cost.

Blood stands for a person's actual life, not just their wellbeing.

In his sight means this value is measured by the king's own view of them.

The poor are not overlooked, their lives matter directly to the king.

🩸 Precious means valuable, worth real cost

❤️ Blood stands for a person's actual life

👁️ In his sight means the king values them

📖 The poor are not overlooked by him

# Psalms 72:15-17
# 🌾 Blessing That Spreads Like A Field Of Grain
---
## 🙌 And He Shall Live, And To Him Shall Be Given Of The Gold Of Sheba

He shall live is a simple prayer for the king's long, healthy life.

Gold of Sheba names the same wealthy region mentioned earlier in the psalm.

Wealth is not condemned here, it is pictured as part of this king's honor.

The prayer connects long life directly to lasting prosperity.

🙌 He shall live prays for a long life

🪙 Gold of Sheba repeats an earlier region

💎 Wealth here is honor, not something condemned

📖 Long life and prosperity are linked

## 🙏 Prayer Also Shall Be Made For Him Continually

Continually means without stopping, an ongoing habit, not a single moment.

This describes people regularly praying on the king's behalf.

A ruler who is prayed for this consistently is deeply valued by his people.

This flips the direction of the psalm, from praying for him to others doing the same.

🙏 Continually means an ongoing habit

👥 People pray for him regularly

❤️ This shows how deeply he is valued

📖 The direction of prayer flips here

## 📢 And Daily Shall He Be Praised

Daily means every single day, not just on special occasions.

This adds a third promise to the two already made in this verse.

His life, the gifts he receives, and now his ongoing praise are all named.

Consistent praise becomes proof of how much his rule is valued.

📢 Daily means every single day

🔢 This is the third promise in one verse

🎁 Life, gifts, and praise are all named

📖 Consistent praise proves how he is valued

## 🌾 There Shall Be An Handful Of Corn In The Earth Upon The Top Of The Mountains

Corn here is an old word for grain in general, not modern corn on the cob.

A handful planted on a mountaintop describes a small, unlikely amount of seed.

Mountaintops usually had thin, poor soil that struggled to grow much.

This pictures a blessing so strong it produces abundance in the worst conditions.

🌾 Corn is an old word for grain

🏔️ A handful pictures a small amount of seed

⛰️ Mountaintops normally had poor, thin soil

📖 Blessing produces abundance even there

## 🌲 The Fruit Thereof Shall Shake Like Lebanon

Fruit thereof describes the harvest that grows from that small planting.

Lebanon was famous in the ancient world for its thick, tall cedar forests.

Shake like Lebanon pictures grain so full and tall it moves like a forest.

An unlikely mountaintop seed becomes an image of an entire forest of grain.

🌲 Fruit thereof means the harvest that grows

🌳 Lebanon was famous for its cedar forests

🌬️ Shake like Lebanon pictures grain moving like trees

📖 A small seed becomes a forest of grain

## 🏙️ They Of The City Shall Flourish Like Grass Of The Earth

This shifts the picture from mountaintop fields to ordinary city dwellers.

Flourish repeats the same word used earlier for the righteous in verse seven.

Grass of the earth pictures something common, plentiful, and quick to spread.

The blessing that started on distant mountains now reaches everyday people.

🏙️ This shifts from mountains to city dwellers

🔁 Flourish repeats the word from verse seven

🌱 Grass pictures something common and plentiful

📖 The blessing reaches everyday people too

## ♾️ His Name Shall Endure For Ever

Endure for ever means this king's reputation will never fade or be forgotten.

Name here stands for the king's whole legacy, not just a word people remember.

Continued as long as the sun repeats the permanence language from verse five.

Every human king eventually dies, but this verse reaches past that limit.

♾️ Endure means his reputation will never fade

📛 Name stands for his whole legacy

☀️ This repeats the sun language from verse five

📖 It reaches past any human king's limit

## 🌍 Men Shall Be Blessed In Him, All Nations Shall Call Him Blessed

Blessed in him means people find real good because of this king's rule.

This language directly echoes God's promise to Abraham in Genesis 12.

All nations calling him blessed widens that old promise to the whole world.

This is the clearest hint yet that this prayer reaches beyond any one king.

🌍 Blessed in him means real good through him

📜 This echoes God's promise to Abraham

🌐 All nations widens that promise worldwide

📖 A clear hint this reaches beyond one king

# Psalms 72:18-20
# 🙌 A Doxology, Then The Book Closes
---
## 🙌 Blessed Be The LORD God, The God Of Israel

This verse shifts from praising the king to praising God directly.

LORD in small capitals marks God's own personal covenant name.

The God of Israel ties this praise to a specific relationship, not a vague deity.

After twenty verses about an earthly king, the true King is named at last.

🙌 The focus shifts from the king to God

🔤 LORD marks God's own personal name

🤝 God of Israel names a real relationship

📖 The true King is named at last

## ✨ Who Only Doeth Wondrous Things

Only here means God alone, no one else can rightly claim this.

Wondrous things means acts that go beyond normal human ability.

Everything described earlier in the psalm, the peace and justice, ultimately traces back to God.

The earthly king was always meant to reflect this greater King.

✨ Only means God alone, no one else

🌟 Wondrous things means beyond human ability

🔁 Earlier blessings trace back to God

📖 The king was meant to reflect God

## 🌍 Let The Whole Earth Be Filled With His Glory

Glory here means God's visible greatness and weighty presence.

Filled describes something completely covering an entire space, with nothing left out.

This prayer matches the earlier picture of a kingdom reaching sea to sea.

God's glory is meant to reach even further than any human king's rule.

🌍 Glory means God's visible greatness

🫙 Filled means completely covering, nothing left out

🗺️ This matches the earlier sea to sea picture

📖 God's glory reaches further than any king

## 🙏 Amen, And Amen

Amen means let it be so, a way of confirming a statement is true.

Saying it twice adds extra weight and certainty to the confirmation.

This closes the doxology that just praised God's greatness and glory.

Double amens mark this as a firm, settled ending, not a casual one.

🙏 Amen means let it be so

🔁 Saying it twice adds extra weight

✅ This closes the doxology just spoken

📖 A firm, settled ending, not casual

## 📜 The Prayers Of David The Son Of Jesse Are Ended

This line is an editorial note, not part of David's actual prayer.

Son of Jesse identifies David clearly by his father's name.

This verse marks the end of an early collection of psalms attributed to David.

Later psalms in the book still exist, this marks a section's close.

📜 This line is an editorial note

👨 Son of Jesse identifies David by his father

📚 It marks the end of an early collection

📖 A section closes, not the whole book`.trim();

export const PSALMS_SEVENTY_TWO_PERSONAL_SECTIONS = parsePsalmsSeventyTwoRawNotes(PSALMS_SEVENTY_TWO_RAW_NOTES);
