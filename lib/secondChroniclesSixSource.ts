export type SecondChroniclesSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesSixRawNotes(rawText: string): SecondChroniclesSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 6:${startVerse}` : `2 Chronicles 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 2 Chronicles 6 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_SIX_RAW_NOTES = `# SecondChronicles 6:1-2
# 🌑 Dwelling In Thick Darkness
---
## 🌑 The LORD Hath Said That He Would Dwell In The Thick Darkness

Solomon is quoting something God said long before this day.

At Mount Sinai, God spoke to Moses from a thick, dark cloud.

He did not appear there in plain sight.

That same kind of cloud just filled this temple in the verses right before this one.

🌑 Thick darkness recalls God's cloud at Sinai

☁️ The same cloud just filled this temple

👁️ God chooses to stay hidden, not seen

📖 Solomon names what the people just witnessed

---

## 🏠 I Have Built An House Of Habitation For Thee

Habitation means a settled, permanent home, not a temporary shelter.

For centuries God's presence traveled with Israel inside a tent called the tabernacle.

Solomon is announcing a change here.

A portable tent is being traded for a fixed stone building.

🏠 Habitation means a settled, permanent home

⛺ God's presence used to travel in a tent

🏛️ Solomon offers a fixed building instead

📖 The traveling era of worship is ending

---

## ⏳ A Place For Thy Dwelling For Ever

For ever is a bold claim for a building made by human hands.

Solomon is not just building a house.

He is asking God to stay in it permanently.

No earlier structure in Israel's history had ever carried that kind of claim.

⏳ For ever claims lasting permanence

🔨 A human building makes a huge request

🆕 No earlier structure carried this claim

➡️ Solomon asks God to stay for good

# SecondChronicles 6:3-6
# 🙏 Blessing The Assembly
---
## 🙏 The King Turned His Face, And Blessed The Whole Congregation

Until this moment Solomon had been facing the altar and the ark.

Turning his face means he physically turned around to look at the people.

Blessing the people out loud was normally a priest's role, not a king's.

Solomon steps into that role himself here.

🙏 Solomon had faced the altar until now

🔄 Turning his face means facing the people

👳 Blessing was usually done by a priest

📖 Solomon steps into that role himself

---

## ✋ Fulfilled That Which He Spake With His Mouth To My Father David

This phrase pairs two ideas together on purpose.

God's mouth stands for the promise once spoken.

God's hand stands for that same promise now kept.

Solomon is pointing out that a promise made to his father is now visibly complete.

✋ Mouth means the promise once spoken

🤲 Hand means the promise now kept

👴 The promise was originally made to David

📖 A finished temple proves the promise true

---

## 🗺️ Since The Day That I Brought Forth My People Out Of The Land Of Egypt I Chose No City

Centuries passed between the Exodus from Egypt and this temple.

During all that time, God never picked one fixed city for His name to live in.

The tabernacle moved from place to place the entire time instead.

This single moment ends a very long wait.

🗺️ Centuries passed with no fixed city

🚶 God's presence kept moving that whole time

⛺ A traveling tabernacle stood in for a temple

📖 This moment ends a very long wait

---

## 🏙️ I Have Chosen Jerusalem, And Have Chosen David

Two separate choices are named together in one breath.

Jerusalem is chosen as the one place for God's name.

David is chosen as the one family to rule.

The temple now ties both choices into a single building.

🏙️ Jerusalem is chosen as the one place

👑 David is chosen as the one ruler

🔗 Two choices land in one building

➡️ Place and king are bound together

# SecondChronicles 6:7-11
# 🏗️ David's Heart, Solomon's Hands
---
## ❤️ It Was In The Heart Of David My Father To Build An House

David wanted to build this temple long before Solomon was even born.

That desire is recorded back in the story of Second Samuel seven.

Solomon opens his prayer by honoring his father's original wish.

Only then does he explain what actually happened next.

❤️ David wanted to build this temple first

📜 Second Samuel seven records that wish

👴 Solomon honors his father's original desire

📖 The story starts with David's heart

---

## 👍 Thou Didst Well That It Was In Thine Heart

God told David that simply wanting to build the house counted for something.

This is a real theological point, not just a polite comment.

God can honor a sincere desire even while saying no to the actual request.

👍 Wanting counted for something to God

🙅 God still said no to the request

💛 A sincere desire can still be honored

📖 God values the heart behind an offer

---

## 👶 Thy Son Which Shall Come Forth Out Of Thy Loins, He Shall Build The House

Loins here is an old way of saying a direct blood son.

This was not a promise about some distant relative down the family line.

God was naming Solomon specifically, long before Solomon was even born.

👶 Loins here means a direct blood son

🎯 This points to Solomon specifically

⏳ The promise came before Solomon was born

📖 God named the builder in advance

---

## 👑 I Am Risen Up In The Room Of David My Father

Room here is an old word for place or position.

It does not mean a literal room in a building.

Solomon means he now holds the position David used to hold.

He is describing his own coronation, not talking about furniture.

👑 Room means position, not a literal room

🔄 Solomon now holds David's former position

🚫 This is not about furniture or space

📖 Solomon describes stepping into the throne

---

## 📦 In It Have I Put The Ark, Wherein Is The Covenant Of The LORD

The ark had just been carried into the temple in the chapter before this one.

Inside it sat the stone tablets holding God's covenant with Israel.

Solomon confirms the most sacred object in the nation now has a permanent home.

📦 The ark was just placed inside

📜 It held God's covenant with Israel

🏛️ The most sacred object now has a home

➡️ Solomon confirms the placement out loud

# SecondChronicles 6:12-13
# 🦵 Solomon Kneels On A Bronze Platform
---
## ✋ Spread Forth His Hands

This was the normal ancient posture for prayer, not folded hands.

Palms opened upward and arms lifted toward the sky showed a request being made.

Solomon's whole body prayed along with his words.

✋ Open palms, not folded hands

🙌 Lifted arms showed a request being made

🗣️ The body prayed along with the words

📖 Solomon's whole posture faced God

---

## 🟫 A Brasen Scaffold Of Five Cubits Long, And Five Cubits Broad, And Three Cubits High

A cubit was about eighteen inches, the length of a forearm.

That makes this platform about seven feet long, seven feet wide, and four feet high.

Solomon built it so the entire crowd could see and hear him pray.

🟫 A cubit was about eighteen inches

📏 The platform stood about seven feet wide

👀 It let the whole crowd see him

📖 Solomon prayed where everyone could witness it

---

## 🙇 Kneeled Down Upon His Knees Before All The Congregation Of Israel

Most prayer in this culture was offered standing, not kneeling.

A reigning king kneeling in public was a striking image.

The most powerful man in Israel is shown here as a servant before God.

🙇 Standing was the more common prayer posture

👑 A king knelt in front of everyone

🤲 Power gave way to humility here

➡️ The king modeled being a servant

# SecondChronicles 6:14-17
# 👑 There Is No God Like Thee
---
## 🌌 There Is No God Like Thee In The Heaven, Nor In The Earth

Solomon is making a direct claim of uniqueness, not just praise.

Nations around Israel believed their gods ruled only one region or one force of nature.

Solomon is saying the LORD has no rival anywhere.

🌌 Solomon claims God has no equal

🗺️ Other gods were believed to be limited

🌍 The LORD is not limited to any region

📖 No rival exists anywhere at all

---

## 🤝 Which Keepest Covenant, And Shewest Mercy Unto Thy Servants, That Walk Before Thee With All Their Hearts

Shewest is an old spelling of shows.

Keeping covenant and showing mercy are named together on purpose.

God's loyalty is not automatic.

It responds to people who sincerely try to follow Him.

🤝 Shewest is an old spelling of shows

📜 Covenant and mercy are named together

💛 God responds to sincere hearts

📖 Loyalty here is not automatic

---

## 🪑 There Shall Not Fail Thee A Man In My Sight To Sit Upon The Throne Of Israel

This repeats a promise God first made to David in Second Samuel seven.

It is a promise of an ongoing family line sitting on Israel's throne.

Solomon prays for that promise to keep holding true after his own lifetime.

🪑 An ongoing throne line was promised

📜 Second Samuel seven first records this

⏳ Solomon prays for it to keep holding

📖 One family's throne, promised across generations

---

## 👣 Yet So That Thy Children Take Heed To Their Way To Walk In My Law

The promise about the throne is not stated without any condition.

Future kings still had to actually obey God's law.

This line quietly warns of trouble to come if that condition is ignored.

👣 The throne promise carries a condition

📏 Future kings still had to obey the law

⚠️ This quietly warns of future trouble

📖 A promise and a warning sit together

---

## ✔️ Let Thy Word Be Verified

Verified means proven true, confirmed by what actually happens.

Solomon is not doubting God's promise here.

Asking God to confirm His word out loud is itself an act of confident faith.

✔️ Verified means proven true

🙏 Solomon is not expressing doubt

💪 Asking for confirmation is an act of faith

📖 Faith can ask God to prove Himself

# SecondChronicles 6:18-21
# 🌌 Heaven Cannot Contain Thee
---
## ❓ Will God In Very Deed Dwell With Men On The Earth?

Solomon just built the most magnificent building in Israel's history.

Then he immediately questions whether any building could ever really hold God.

The question is not doubt.

It is Solomon admitting the true scale of what he is asking for.

❓ Solomon questions his own huge project

🏛️ He just built Israel's grandest building

😮 The question admits the scale of the request

📖 Even a king can be humbled by God

---

## 🌠 Heaven And The Heaven Of Heavens Cannot Contain Thee

Heaven of heavens is a Hebrew way of naming the largest possible space.

Even that entire scale cannot hold God inside it.

Solomon sets up his next request by naming the most extreme comparison first.

🌠 Heaven of heavens means the largest space

🚫 Even that cannot hold God

📐 The most extreme comparison comes first

📖 Nothing physical can contain God

---

## 👁️ That Thine Eyes May Be Open Upon This House Day And Night

Open eyes is a picture for constant, active attention, not literal eyeballs.

Day and night means without any pause or gap in that attention.

Solomon is asking for ongoing care, not a one time blessing at the dedication.

👁️ Open eyes pictures constant attention

🌓 Day and night means no gap in it

🔁 Ongoing care, not a one time gift

📖 Solomon asks for attention that never stops

---

## 🧭 Toward This Place

Solomon is setting up a pattern for how Israel will pray from now on.

The temple becomes the direction people face, not a container that traps God inside.

Centuries later, the prophet Daniel prays with his window open toward this same city.

🧭 The temple becomes a direction to face

🚫 It is not a container that traps God

🪟 Daniel later prays facing this same city

➡️ Prayer gets a focal point, not a cage

# SecondChronicles 6:22-23
# ⚖️ An Oath Before The Altar
---
## 🤲 An Oath Be Laid Upon Him To Make Him Swear

Ancient courts had no cameras or paper trail to prove who was lying.

When two people disagreed with no evidence, the accused would swear an oath at the altar.

Calling on God as a witness stood in for the evidence a modern court would need.

🤲 Ancient disputes often lacked hard evidence

⚖️ The accused swore an oath at the altar

👁️ God served as the missing witness

📖 An oath filled the gap evidence could not

---

## 🎯 By Requiting The Wicked, By Recompensing His Way Upon His Own Head

Recompensing his way upon his own head is an old idiom.

It means the consequences of a person's actions land back on that same person.

Solomon is asking God to be the judge no human court could fully be.

🎯 The idiom means consequences return to the guilty

⚖️ Solomon asks God to act as judge

🚫 No human court could fully judge secret guilt

📖 God sees what a courtroom cannot

---

## ✅ By Justifying The Righteous, By Giving Him According To His Righteousness

This is the other half of the same request.

Solomon is not only asking for guilty people to be exposed.

He also asks for innocent people to be cleared when they are telling the truth.

✅ This is the request's other half

🚫 It is not only about exposing guilt

🙌 Innocent people deserve to be cleared too

📖 True justice protects both sides

# SecondChronicles 6:24-25
# 🏳️ Defeat Before The Enemy
---
## 🏳️ Put To The Worse Before The Enemy

This phrase is an old way of saying defeated in battle.

Solomon assumes military defeat can be a direct result of the nation's sin.

That connection between disobedience and defeat runs throughout Israel's whole story.

🏳️ Put to the worse means defeated in battle

⚔️ Solomon links defeat to the nation's sin

📜 This pattern runs through Israel's whole story

📖 Disobedience carried real national consequences

---

## 🗣️ Return And Confess Thy Name

Confessing God's name here means more than saying sorry quietly.

It means publicly admitting that God was right and the nation was wrong.

That kind of confession requires real humility after a defeat.

🗣️ Confessing means more than a quiet sorry

📢 It means admitting God was right publicly

😔 That takes real humility after a defeat

📖 True confession is spoken, not just felt

---

## 🏡 Bring Them Again Unto The Land Which Thou Gavest To Them And To Their Fathers

Solomon is praying here for restoration after a national defeat.

This same promise gets tested centuries later when Judah is conquered by Babylon.

A king at the height of Israel's glory is already praying for its darkest future day.

🏡 Solomon prays for restoration after defeat

📆 This gets tested when Babylon later conquers Judah

🔮 Solomon could not know those future details

📖 This prayer reaches far past his own lifetime

# SecondChronicles 6:26-27
# 🌧️ When The Heaven Is Shut Up
---
## ☁️ When The Heaven Is Shut Up, And There Is No Rain

Israel's farms depended completely on seasonal rainfall, not rivers or irrigation.

Drought in this kind of farming culture meant real, widespread hunger.

The Law given through Moses had already listed drought as a consequence of turning from God.

☁️ Farms depended completely on seasonal rain

🌾 Drought meant real, widespread hunger

📜 Moses had already listed this as a consequence

📖 Weather itself carried spiritual weight here

---

## 🔄 Turn From Their Sin

Repentance in this prayer is not just feeling bad about a mistake.

Turn pictures someone physically changing direction, walking a new way instead.

Solomon links forgiveness to that actual change, not only to an apology.

🔄 Turn pictures a real change in direction

😔 Repentance is more than just feeling bad

🙏 Solomon links forgiveness to real change

📖 Turning matters more than mere words

---

## 📚 When Thou Hast Taught Them The Good Way, Wherein They Should Walk

This phrase reframes the whole hard season as instruction, not only punishment.

God is pictured here as a teacher correcting His people.

The goal was always to guide Israel back to a better path.

📚 The season is framed as teaching

🧑‍🏫 God is pictured here as a teacher

🎯 The goal was guiding Israel back

📖 Even discipline can carry a lesson

# SecondChronicles 6:28-31
# 🦗 Famine, Siege, And Plague
---
## 🌾 If There Be Dearth In The Land, If There Be Pestilence, If There Be Blasting, Or Mildew, Locusts, Or Caterpillers

Dearth means a severe food shortage.

Blasting and mildew describe crops destroyed by hot wind and fungus.

Locusts and caterpillars describe swarms of insects that could strip a field bare in a day.

🌾 Dearth means a severe food shortage

🌬️ Blasting and mildew describe ruined crops

🦗 Locusts and caterpillars could strip fields bare

📖 Solomon names every major ancient disaster

---

## 🏰 If Their Enemies Besiege Them In The Cities Of Their Land

A siege meant an enemy army surrounding a city to cut off food and water.

This was a different threat than the natural disasters just listed.

Solomon covers both the dangers of nature and the dangers of other nations.

🏰 A siege meant a city cut off

⚔️ This threat came from other nations

🌾 Nature and war are both covered here

➡️ Solomon leaves no disaster category out

---

## 💔 When Every One Shall Know His Own Sore And His Own Grief

This verse zooms in from the whole nation to one single person.

Every individual, not just the nation as a group, is invited to pray about personal pain.

Solomon widens this prayer to cover private grief.

💔 The focus narrows to one single person

🙋 Individuals, not only the nation, can pray

😢 Private grief gets covered here too

📖 God hears personal pain, not only national crisis

---

## 🧠 For Thou Only Knowest The Hearts Of The Children Of Men

People can fake outward behavior, but they cannot fake what God sees inside.

This same idea appears later when God chooses David by looking past outward appearance.

Solomon is asking God to judge motive, something no human judge could ever fully do.

🧠 Only God truly sees inside a person

👀 Outward behavior can be faked easily

👑 God chose David by looking past appearance

📖 God alone judges true motive

---

## 🙇 That They May Fear Thee, To Walk In Thy Ways

Solomon names the real goal behind this whole request.

Relief from suffering was never meant to be the final point.

A changed, ongoing reverence for God mattered more than quick relief.

🙇 This names the real goal of the prayer

🩹 Relief was never the final point

💛 Lasting reverence mattered more than quick relief

📖 The goal reaches past the crisis itself

# SecondChronicles 6:32-33
# 🌍 The Stranger From A Far Country
---
## 🌍 Concerning The Stranger, Which Is Not Of Thy People Israel

This is a striking moment in an otherwise Israel focused prayer.

Solomon explicitly includes non Israelites who travel to pray at this temple.

Foreigners are invited to be heard by Israel's God, not shut out from Him.

🌍 A striking, Israel focused prayer shifts here

🚶 Solomon includes travelers from outside Israel

🤲 Foreigners are invited to be heard

📖 God's ear was never limited to one nation

---

## 💪 Come From A Far Country For Thy Great Name's Sake, And Thy Mighty Hand, And Thy Stretched Out Arm

Mighty hand and stretched out arm are set phrases describing the Exodus from Egypt.

Word of what God did for Israel had already spread to distant nations.

Solomon expects God's reputation, not a sales pitch, to draw foreigners in.

💪 Mighty hand and stretched arm recall the Exodus

📣 Word of that event had spread widely

🧲 God's reputation alone draws foreigners in

📖 A famous rescue became a famous testimony

---

## 🌐 That All People Of The Earth May Know Thy Name, And Fear Thee

This line states a purpose bigger than Israel alone.

The temple was never meant to be a private building for one nation only.

Solomon prays for God's reputation to reach every people on earth.

🌐 The purpose reaches beyond Israel alone

🚫 The temple was not meant to stay private

🗣️ Solomon prays for a worldwide reputation

📖 One temple, a purpose for every nation

# SecondChronicles 6:34-35
# ⚔️ Prayer Before Battle
---
## 🧭 By The Way That Thou Shalt Send Them

Solomon is not praying a blank check for every possible war.

This phrase assumes the war itself is undertaken at God's own direction.

Victory is tied to obedience, not simply to Israel wanting to fight.

🧭 This is not a blank check for war

📜 The war is assumed to be God directed

🙏 Victory is tied to obedience, not desire

📖 God's direction matters before the battle starts

---

## ⚖️ Maintain Their Cause

Cause is a legal word, closer to a case argued in court than a fight.

Solomon pictures God as the judge deciding whether Israel's side is right.

This is not a request for automatic victory.

It is a request for justice.

⚖️ Cause is a legal, courtroom word

👨‍⚖️ God is pictured as the deciding judge

🚫 This is not a request for automatic victory

📖 Solomon asks for justice, not a blank favor

# SecondChronicles 6:36-39
# 🏚️ Prayer From Captivity
---
## 🙋 For There Is No Man Which Sinneth Not

This short line is not an afterthought.

Solomon is admitting up front that this exact scenario is not just hypothetical.

Every person and every generation will eventually need this part of the prayer.

🙋 This line admits sin is not hypothetical

🔁 Every generation will eventually need this prayer

😔 Solomon expects failure, not just success

📖 Honesty about sin opens this section

---

## 🌏 Carry Them Away Captives Unto A Land Far Off Or Near

Solomon is praying about national exile centuries before it actually happens.

Second Chronicles thirty six later records Babylon doing exactly this to Judah.

A king at the height of Israel's glory is already praying for its darkest future day.

🌏 Solomon prays about exile in advance

📜 Second Chronicles thirty six later fulfills this

👑 A king at his peak plans ahead

📖 This prayer reaches far into Israel's future

---

## 💭 If They Bethink Themselves In The Land Whither They Are Carried Captive

Bethink themselves is an old phrase meaning to come to one's senses.

It describes a moment of clear thinking after a long period of denial.

Solomon pictures exile itself as the moment that finally wakes people up.

💭 Bethink themselves means coming to one's senses

😴 It follows a long period of denial

⏰ Exile itself becomes a wake up moment

📖 Hard seasons can restore clear thinking

---

## 🗣️ We Have Sinned, We Have Done Amiss, And Have Dealt Wickedly

Three different words for wrongdoing are stacked together on purpose.

That repetition makes the confession sound complete, not partial or halfhearted.

Solomon models exactly what honest, full repentance sounds like out loud.

🗣️ Three words for wrong stack together

💯 The repetition makes the confession complete

🙏 Solomon models honest, full repentance

📖 Real confession does not soften the truth

---

## 💛 If They Return To Thee With All Their Heart And With All Their Soul

All their heart and all their soul describes total, undivided devotion.

This phrase echoes the same wording used for loving God in Deuteronomy six.

Solomon is asking for complete repentance, not a partial or reluctant one.

💛 Heart and soul means total devotion

📜 Deuteronomy six uses this same wording

🚫 A partial, reluctant return is not enough

📖 God asks for the whole person

# SecondChronicles 6:40-42
# 🙌 Arise, O LORD God
---
## 🙏 I Beseech Thee

Beseech means to earnestly beg or plead.

It is a stronger word than a simple, polite request.

Solomon closes his long prayer by dropping any formality and pleading directly.

🙏 Beseech means to earnestly beg

💪 It is stronger than a polite request

😢 Solomon drops formality here at the close

📖 A king can still plead like anyone else

---

## 👂 Let Thine Ears Be Attent Unto The Prayer

Attent is an old word for attentive, fully listening.

This pairs with the earlier request for God's eyes to stay open in verse twenty.

Solomon now asks for both eyes and ears, seeing and hearing together.

👂 Attent is an old word for attentive

👁️ It pairs with the eyes of verse twenty

🙏 Solomon now asks for seeing and hearing

📖 Full attention covers more than sight alone

---

## ⛪ Arise, O LORD God, Into Thy Resting Place, Thou, And The Ark Of Thy Strength

This exact language echoes Psalm one hundred thirty two.

Arise once described the ark moving out ahead of Israel's army in the wilderness.

Solomon now uses that same battle language to ask God to settle down permanently instead.

⛪ This language echoes Psalm one hundred thirty two

🏕️ Arise once described the ark leading the army

🛑 Solomon now asks God to settle permanently

📖 Battle language becomes a request for rest

---

## 👳 Let Thy Priests, O LORD God, Be Clothed With Salvation

Clothed with salvation is a picture, not a literal outfit.

Priests represented God to the people through everything they wore and did.

Solomon prays that their whole appearance would visibly reflect God's saving character.

👳 Clothed with salvation is a picture

👀 Priests represented God through what they did

✨ Their appearance was meant to reflect God

📖 Even a priest's look could preach a message

---

## 👑 Turn Not Away The Face Of Thine Anointed

Anointed refers to Solomon himself, marked as king by oil poured on his head.

Turning away someone's face was an ancient picture for rejecting or ignoring them.

Solomon is asking God not to reject his own prayer and his own kingship.

👑 Anointed refers to Solomon himself

🫗 Kings were marked by oil poured on them

🚫 Turning away a face pictured rejection

📖 Solomon asks not to be ignored

---

## 💛 Remember The Mercies Of David Thy Servant

Solomon does not end by pointing to his own good deeds.

He ends by pointing back to God's steady loyalty toward his father David.

The whole prayer closes by resting on God's character, not Solomon's achievements.

💛 Solomon points to God's loyalty, not his own

👴 That loyalty was shown to David first

🙏 The prayer rests on God's character

📖 A whole prayer ends leaning on grace
`.trim();

export const SECOND_CHRONICLES_SIX_PERSONAL_SECTIONS = parseSecondChroniclesSixRawNotes(SECOND_CHRONICLES_SIX_RAW_NOTES);
