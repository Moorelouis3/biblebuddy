export type IsaiahSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSevenRawNotes(rawText: string): IsaiahSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 7:${startVerse}` : `Isaiah 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 7 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SEVEN_RAW_NOTES = `# Isaiah 7:1-2
# 🛡️ Syria And Israel Threaten Judah
---
## 👑 Ahaz The Son Of Jotham, The Son Of Uzziah

Ahaz was the king of Judah when this chapter opens.

He was the grandson of the great king Uzziah.

His father Jotham ruled well, but Ahaz did not follow that same path.

Isaiah is writing about a real king facing a real crisis, not a symbol.

👑 Ahaz ruled Judah in this chapter
🧬 He was Uzziah's grandson
📉 He did not rule like his father
📖 This crisis was real, not symbolic
---
## 🇸🇾 Rezin The King Of Syria, And Pekah The Son Of Remaliah, King Of Israel

Rezin ruled the northern kingdom of Syria, based in Damascus.

Pekah ruled the northern kingdom of Israel, often called Ephraim.

These two kings joined forces against Judah.

Historians call this alliance the Syro Ephraimite war.

🇸🇾 Rezin ruled Syria from Damascus
🇮🇱 Pekah ruled the northern kingdom Israel
🤝 The two kings joined forces
📖 Scholars call this the Syro Ephraimite war
---
## 🤝 Syria Is Confederate With Ephraim

"Confederate" means joined together by a formal agreement.

Syria and Israel were not just cooperating loosely.

They had committed to fight Judah together as allies.

That kind of alliance made the threat far more serious.

🤝 Confederate means formally joined together
⚔️ Syria and Israel allied against Judah
📈 A formal alliance raised the danger
📖 Two kingdoms now moved as one
---
## 🌳 As The Trees Of The Wood Are Moved With The Wind

Ahaz and his people panicked the moment they heard the news.

Think of trees swaying and shaking in a strong storm.

That is the picture Isaiah uses for their fear.

The whole nation trembled together, not just the king.

🌳 Trees swaying pictures shaking fear
💨 A strong wind moves every branch
😱 The whole nation panicked together
📖 Fear can spread like wind through trees
---
# Isaiah 7:3-9
# 🚶 Isaiah Meets Ahaz At The Conduit
---
## 🚶 Go Forth Now To Meet Ahaz

God sends Isaiah out to intercept the king personally.

This was not a message delivered through a servant.

Isaiah met Ahaz face to face at a specific, real location.

God wanted Ahaz to hear this word directly.

🚶 Isaiah goes to meet Ahaz himself
👑 Not a message sent through others
📍 The meeting happens at a real place
📖 God speaks to Ahaz directly
---
## 👦 Shearjashub Thy Son

Shearjashub means "a remnant shall return" in Hebrew.

Isaiah brings his own son along as a living message.

The boy's name itself was a preview of the chapter's ending.

Judgment was coming, but a remnant would survive it.

👦 Shearjashub means a remnant shall return
🚶 Isaiah brings his son along
🔮 The name previews the chapter's ending
📖 A remnant survives even this judgment
---
## 💧 At The End Of The Conduit Of The Upper Pool

A conduit was a channel built to carry water into the city.

Jerusalem depended on pools like this one during a siege.

Ahaz was likely inspecting the water supply when Isaiah found him.

He was already preparing for the coming attack.

💧 A conduit carried water into the city
🏙️ Jerusalem needed this pool during a siege
👑 Ahaz was checking his defenses
📖 He met Isaiah while preparing for war
---
## 🧺 In The Highway Of The Fuller's Field

A fuller was someone who cleaned and whitened cloth for a living.

Fullers worked outside the city, near open ground and water.

"The fuller's field" was simply the well known spot where they worked.

The location tells us exactly where this meeting took place.

🧺 A fuller cleaned and whitened cloth
💧 Fullers worked near water outside the city
📍 This names the meeting's exact spot
📖 A real place, not a vague setting
---
## 🛑 Take Heed, And Be Quiet

God's first word to Ahaz is a command to stay calm.

"Take heed" means pay careful attention to what follows.

Ahaz was ready to panic before Isaiah even finished speaking.

God interrupts that fear before naming the actual threat.

🛑 Take heed means pay careful attention
😌 God commands calm before explaining
😱 Ahaz was already close to panic
📖 Calm comes before the full explanation
---
## 🔥 The Two Tails Of These Smoking Firebrands

A firebrand is a burning stick pulled from a fire.

"Smoking" means it has already burned down and lost its flame.

Rezin and Pekah looked fierce, but their real power was fading.

Think of a stick that smokes but can no longer catch anything on fire.

🔥 A firebrand is a burning stick
💨 Smoking means the flame is gone
😤 The two kings looked fierce but weak
📖 Their real threat was already fading
---
## 👑 Set A King In The Midst Of It, Even The Son Of Tabeal

Syria and Israel planned more than just a military victory.

They wanted to remove Ahaz and install their own ruler.

The son of Tabeal was an outsider with no right to David's throne.

This plot threatened God's promise to keep David's family on the throne forever.

👑 The enemy planned to replace Ahaz
🧑 Tabeal's son had no royal right
⚠️ This threatened David's promised line
📖 More than a war, a stolen throne
---
## 🛑 It Shall Not Stand, Neither Shall It Come To Pass

This is God's flat verdict on the whole invasion plan.

The plot to remove Ahaz and install a puppet king will fail completely.

God names the outcome before the war even begins.

Ahaz did not have to guess how this would end.

🛑 God flatly denies this plan
👑 The plot to replace Ahaz fails
⏳ The outcome is named in advance
📖 Ahaz did not have to guess
---
## 🏛️ The Head Of Syria Is Damascus, And The Head Of Damascus Is Rezin

"Head" here means the ruling city and the ruler over it.

Damascus was Syria's capital, and Rezin sat on its throne.

Isaiah names each kingdom's true source of power.

A kingdom is only as strong as the one who leads it.

🏛️ Head means the ruling city and king
🏙️ Damascus was Syria's capital
👑 Rezin ruled from that city
📖 Isaiah names each nation's real power
---
## 🔢 Within Threescore And Five Years Shall Ephraim Be Broken

"Threescore and five" means sixty five years in plain English.

This was not fulfilled by the war Ahaz was facing that day.

The final collapse of Israel's ten tribes took decades longer to arrive.

Assyria kept resettling the land with foreign people well after that collapse.

🔢 Threescore and five means sixty five years
⏳ This judgment unfolds over decades
🗺️ It points past Israel's coming exile
📖 God's timeline stretched beyond Ahaz's lifetime
---
## 🏙️ The Head Of Ephraim Is Samaria, And The Head Of Samaria Is Remaliah's Son

This line repeats the same pattern used for Syria a moment earlier.

Samaria was the capital city of the northern kingdom Israel.

Pekah, called here Remaliah's son, ruled from that city.

Naming both threats the same way puts them on equal, limited footing.

🏙️ Samaria was Israel's capital city
👑 Pekah ruled from Samaria
🔁 This mirrors the line about Syria
📖 Both threats are named as limited
---
## 🔤 If Ye Will Not Believe, Surely Ye Shall Not Be Established

The Hebrew word behind "believe" and "established" is the same root word.

It carries the idea of standing firm, the same word behind "amen."

Ahaz's security depended on trusting God, not on clever politics.

A kingdom built on doubt could not stand for long.

🔤 Believe and established share one Hebrew root
🙏 The word behind them means standing firm
⚖️ Trust in God was the real safety
📖 Doubt cannot hold a kingdom up
---
# Isaiah 7:10-13
# 🙏 Ask Thee A Sign
---
## 🗣️ The LORD Spake Again Unto Ahaz

God does not stop after the first message of reassurance.

He speaks to Ahaz a second time in this same conversation.

This next word will test whether Ahaz truly believes what he already heard.

Patience like this shows how far God was willing to go for a reluctant king.

🗣️ God speaks to Ahaz again
🔁 This continues the same conversation
🧪 The next word tests his faith
📖 God is patient with a reluctant king
---
## ✅ Ask Thee A Sign Of The LORD Thy God

A sign in scripture is a visible proof that backs up a spoken promise.

God offers Ahaz the chance to ask for anything, in the deepest depth or the highest height.

This was an open invitation, not a small favor.

God wanted Ahaz to trust him with total confidence.

✅ A sign proves a promise is true
🌌 Ahaz could ask for anything at all
🎁 This was a generous, open offer
📖 God wanted complete confidence from Ahaz
---
## 📖 I Will Not Ask, Neither Will I Tempt The LORD

This sounds like humble obedience on the surface.

Ahaz is actually quoting a real command from Deuteronomy about not testing God.

He is using true scripture to dodge a direct invitation from God himself.

False humility can hide behind a real Bible verse.

📖 Ahaz quotes a real command
🎭 His humility is not genuine here
🚪 He dodges God's own invitation
➡️ Scripture can be misused to avoid obedience
---
## 😮‍💨 Is It A Small Thing For You To Weary Men

To weary someone means to wear them down or exhaust their patience.

Isaiah names what Ahaz has already been doing throughout this exchange.

Doubting God's messenger wears down more than just one prophet.

This question exposes Ahaz's true attitude toward the whole conversation.

😮‍💨 Weary means wearing down someone's patience
👤 Ahaz has worn out Isaiah already
❓ This question exposes his real attitude
📖 Doubt tires out more than one person
---
## ⚠️ Will Ye Weary My God Also

Isaiah raises the stakes with one sharp question.

Rejecting the prophet's word was really rejecting God's own word.

Ahaz thought he was only being cautious with a man.

He was actually testing the patience of God himself.

⚠️ Rejecting Isaiah meant rejecting God
👤 Ahaz thought this was only about a man
🙏 It was really about God's own patience
➡️ Some choices reach higher than we realize
---
# Isaiah 7:14-17
# 👶 The Virgin Shall Conceive
---
## 🎁 The Lord Himself Shall Give You A Sign

Ahaz refused to ask for a sign, so God gives one anyway.

"The Lord himself" makes clear this sign comes from God, not from Ahaz's request.

God's plans do not depend on a king's willingness to cooperate.

The sign that follows outlasts Ahaz by hundreds of years.

🎁 God gives the sign unasked
👑 It does not depend on Ahaz
⏳ This sign outlasts his whole reign
📖 God's plans move forward regardless
---
## 👩 Behold, A Virgin Shall Conceive

The Hebrew word here, almah, means a young woman of marrying age.

In this culture, it was normally understood to mean someone who had not yet had a child.

Matthew later quotes this exact verse about Mary and Jesus.

Many scholars believe the sign had an immediate meaning for Ahaz and a deeper fulfillment later in Christ.

👩 Almah means a young woman of age
📜 Matthew connects this verse to Mary
🔮 It carried meaning for Ahaz's own day
📖 A near sign and a far fulfillment together
---
## 🔤 Shall Call His Name Immanuel

Immanuel means "God with us" in Hebrew.

The name itself was the message, spoken every time it was said aloud.

God was promising his own presence in the middle of this crisis.

That promise reaches far beyond the threat Ahaz faced that day.

🔤 Immanuel means God with us
🗣️ The name carried the message itself
🙌 God promised his own presence
📖 A promise bigger than one crisis
---
## 🍯 Butter And Honey Shall He Eat

Butter and honey sound like a rich, comfortable diet today.

In this setting, they describe simple food eaten when farmland lies unused.

War would empty the fields around this child as he grew up.

A simple diet here is actually a sign of hardship, not comfort.

🍯 Butter and honey sound rich today
🌾 Here they picture unused farmland
⚔️ War would empty the fields
📖 Simple food signals hardship, not comfort
---
## 👶 Before The Child Shall Know To Refuse The Evil, And Choose The Good

This phrase points to early childhood, long before a full grown decision.

It sets a short, specific timeframe for what happens next.

The threat from Syria and Israel would be gone within just a few years.

God ties a massive political prophecy to something as ordinary as a growing child.

👶 This points to early childhood
⏳ It sets a short timeframe
⚔️ The threat ends within a few years
📖 A huge promise tied to a child's growth
---
## 😠 The Land That Thou Abhorrest Shall Be Forsaken Of Both Her Kings

"Abhorrest" means Ahaz deeply hated and feared this land already.

Both Rezin and Pekah are named here as the two kings in view.

Within a few years, Assyria removed both threats permanently.

The fear that opened this chapter had an ending date after all.

😠 Abhorrest means deeply feared or hated
👑 Both Rezin and Pekah are meant here
⚔️ Assyria removed both threats later
📖 This fear had a real ending date
---
## ⚠️ Days That Have Not Come, From The Day That Ephraim Departed From Judah

The good news of Immanuel does not end the chapter's warnings.

God promises relief from Syria and Israel, but not from every danger.

Assyria, the very empire Ahaz wanted to lean on for help, becomes the next threat.

The nation had not seen trouble this severe since the kingdom itself split in two.

⚠️ Relief from one threat, not every threat
🏛️ Assyria becomes the next danger
📜 Not seen since the kingdom divided
📖 Immanuel's sign comes with a warning too
---
# Isaiah 7:18-20
# 🐝 The Fly And The Bee
---
## 🪰 The LORD Shall Hiss For The Fly That Is In The Uttermost Part Of The Rivers Of Egypt

"Hiss" here means a sharp whistle used to summon something, not an insult.

The fly stands for Egypt's army, pictured swarming in from the south.

God is the one calling this army forward, not merely allowing it.

Even a foreign empire moves only when God signals it to move.

🪰 Hiss means a summoning whistle
🇪🇬 The fly represents Egypt's army
🧭 It comes from the far south
📖 God controls when nations move
---
## 🐝 The Bee That Is In The Land Of Assyria

The bee stands for Assyria's army, the empire pressing in from the north.

Egypt and Assyria were usually rivals, not partners.

Isaiah pictures both showing up in Judah at the same time.

Judah would be caught directly between two powerful enemies.

🐝 The bee represents Assyria's army
🧭 It comes from the north
⚔️ Egypt and Assyria were usually rivals
📖 Judah sat trapped between both of them
---
## 🏞️ Rest All Of Them In The Desolate Valleys, And In The Holes Of The Rocks

Insects like flies and bees do not stay in one small spot.

They spread into every valley, cliff, and thorn bush without exception.

Isaiah uses that swarming picture to describe a full scale invasion.

No corner of the land would be left untouched.

🏞️ Insects spread into every space
🌾 Valleys, cliffs, and bushes all covered
⚔️ This pictures a full invasion
📖 No part of the land is spared
---
## ✂️ Shall The Lord Shave With A Razor That Is Hired

Shaving a man's head and beard in this culture was a public act of shame.

"Hired" here means Assyria acted as God's own tool, even without knowing it.

This judgment strips away Judah's pride the way a razor strips away hair.

God can use even a proud, godless empire to accomplish his own purpose.

✂️ Shaving in public meant deep shame
💰 Hired means Assyria acted as God's tool
😔 The image pictures stripped pride
📖 God can use even godless nations
---
# Isaiah 7:21-25
# 🌾 Briers And Thorns
---
## 🐄 A Man Shall Nourish A Young Cow, And Two Sheep

This sounds like a peaceful, simple farm scene at first glance.

In context, it actually pictures a population reduced to almost nothing.

A family that once had large herds now owns just one cow and two sheep.

War leaves survivors with only the bare minimum to live on.

🐄 One cow and two sheep only
📉 This pictures a shrunken population
⚔️ War strips away large herds
📖 Survivors are left with the bare minimum
---
## 🥛 For The Abundance Of Milk That They Shall Give He Shall Eat Butter

With so few people left, even a small herd gives more milk than needed.

Butter and honey return here, the same picture from earlier in the chapter.

What once needed rich, farmed fields now grows wild after the land empties out.

Comfort food becomes ordinary again only because the population has collapsed.

🥛 Few people means milk is plentiful
🍯 Butter and honey repeat verse fifteen
🌾 Wild land replaces farmed fields
📖 Simple food returns through loss, not gain
---
## 🙋 Butter And Honey Shall Every One Eat That Is Left In The Land

"Every one that is left" points to the remnant who survive the coming invasions.

This is not the whole nation anymore, only those still standing afterward.

The same simple diet marks both the promised child and this shrunken remnant.

One image ties the sign of Immanuel to the fate of the whole land.

🙋 Left means the surviving remnant
📉 Most of the population is gone
👶 The same diet marked Immanuel too
📖 One image links the child and the land
---
## 🪙 Where There Were A Thousand Vines At A Thousand Silverlings

A silverling was a unit of silver, likely a shekel, used as money.

A thousand vines worth a thousand silverlings describes a highly valuable vineyard.

That valuable land is left to grow wild without anyone tending it.

Something once worth real money becomes worthless once no one remains to farm it.

🪙 A silverling was a unit of silver
🍇 A thousand vines meant real wealth
🌵 That valuable land goes untended
📖 Abandoned land loses all its worth
---
## 🌵 It Shall Even Be For Briers And Thorns

Briers and thorns picture wild, overgrown, useless ground.

This phrase repeats three times in just five verses.

Isaiah wants the reader to feel how completely the land changes.

A once fruitful vineyard becomes a wasteland no one wants to walk through.

🌵 Briers and thorns mean overgrown waste
🔁 The phrase repeats three times here
📉 Fruitful land turns to wasteland
📖 Repetition drives home the loss
---
## 🐂 It Shall Be For The Sending Forth Of Oxen, And For The Treading Of Lesser Cattle

Even land this overgrown still finds some use in the end.

Farmland becomes open pasture where animals simply wander and graze.

The chapter opened with a king terrified of two smoking firebrands.

It closes with a land emptied of people but still quietly under God's design.

🐂 Overgrown land still becomes pasture
🐐 Animals wander where farms once stood
👑 The chapter began with a frightened king
📖 Even an emptied land stays under God's design
`.trim();

export const ISAIAH_SEVEN_PERSONAL_SECTIONS = parseIsaiahSevenRawNotes(ISAIAH_SEVEN_RAW_NOTES);
