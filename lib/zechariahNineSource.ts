export type ZechariahNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahNineRawNotes(rawText: string): ZechariahNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 9:${startVerse}` : `Zechariah 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Zechariah 9 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_NINE_RAW_NOTES = `# Zechariah 9:1-4
# ⚔️ Judgment Falls On Syria And Phoenicia
---
## 📜 The Burden Of The Word Of The LORD

"Burden" here does not mean a heavy object someone carries.

It is an old word for a weighty message from God.

That kind of message almost always announces judgment on a nation.

Zechariah borrows this label from earlier prophets like Isaiah and Amos.

A burden oracle always names something specific.

This chapter opens with that same heavy tone.

It later shifts into one of the most hopeful endings in the book.

📜 Burden means a weighty prophetic message

⚖️ It usually announces judgment on a nation

📚 Earlier prophets used this same label

📖 This chapter carries real weight from the start

## 🗺️ In The Land Of Hadrach, And Damascus Shall Be The Rest Thereof

Hadrach is a place name that appears nowhere else in the whole Bible.

Ancient records outside scripture show it as a small region in Syria.

That region sat just north of Damascus.

Damascus itself was the major city of that whole area.

"Rest" here means a resting place, not relief from trouble.

Damascus becomes the center this message settles on.

Starting with a city this small shows God notices even minor nations.

🗺️ Hadrach appears only this one time

🏙️ Damascus was the region's major city

📍 This message settles there first

➡️ No nation is too small for God

## 👀 The Eyes Of Man, As Of All The Tribes Of Israel, Shall Be Toward The LORD

This does not mean every person alive already looks to God.

It is a forward looking promise instead.

One day, people everywhere will watch for the LORD.

Israel was already supposed to watch that same way.

Here that same attention is promised to reach beyond Israel's own borders.

Verses nine and ten later show exactly how far that reach goes.

👀 Not a claim about the present

🔮 A promise about the future

🕎 Israel already carried this calling

📖 Other nations will join that watching

## ⚓ Tyrus, And Zidon, Though It Be Very Wise

Tyrus and Zidon were the two leading port cities of ancient Phoenicia.

Both cities were famous for trade, shipbuilding, and clever political deals.

Calling them wise here is not really a compliment.

It points to the kind of cunning that let them survive for centuries.

Bigger empires often struggled to conquer them because of it.

That cleverness is about to fail them anyway.

⚓ Tyrus and Zidon were Phoenician ports

💼 Both cities were skilled traders

🧠 Their wisdom really meant cunning

📖 That same skill will not save them

## 🪙 Heaped Up Silver As The Dust, And Fine Gold As The Mire Of The Streets

Silver here piles up like common dust on the ground.

Gold is compared to mire, the mud that collects in city streets.

Both pictures describe wealth too large to feel special anymore.

Tyre also built itself into a fortified island city.

It trusted that no army could ever reach it by sea.

That trust is about to be tested.

🪙 Silver piled up like common dust

✨ Gold compared to street mud

🏯 Tyre trusted its island fortress

📖 That confidence will not hold

## 🌊 He Will Smite Her Power In The Sea

Tyre's whole identity rested on controlling the sea around it.

God promises to break that exact source of power.

History later confirmed this in a striking way.

Alexander the Great eventually captured Tyre by building a causeway into the sea.

That causeway turned the island into a peninsula.

The very sea that once protected Tyre became the path that destroyed it.

🌊 Tyre's power was built on the sea

⚔️ God targets that exact strength

🏗️ Alexander later built a causeway

📖 What once protected Tyre destroyed it

# Zechariah 9:5-8
# 😨 Fear Spreads Through The Philistine Cities
---
## 🏙️ Ashkelon Shall See It, And Fear

"It" here points back to Tyre's sudden fall in the verse just before.

Ashkelon was one of five major Philistine cities along the coast south of Phoenicia.

News of a powerful neighbor collapsing so fast would terrify any nearby city.

Ashkelon's fear is not really about Tyre.

It is fear that the same God could turn against them next.

🏙️ It refers back to Tyre's fall

🌊 Ashkelon was a coastal Philistine city

😨 Ashkelon fears becoming the next target

📖 The real fear points toward God

## 👑 The King Shall Perish From Gaza

Gaza had its own local king at this time, unlike some other Philistine cities.

Losing that king meant losing its whole political identity, not just one ruler.

Ashkelon is named right alongside Gaza as a city that will end up empty.

Two major Philistine strongholds lose their power in the very same verse.

👑 Gaza had its own local king

💔 Losing him meant losing their identity

🏙️ Ashkelon loses its people too

📖 Both cities lose everything at once

## 🏙️ A Bastard Shall Dwell In Ashdod

"Bastard" here does not describe a personal insult.

It describes a mixed, foreign population replacing the city's original Philistine identity.

Ashdod would stop being a purely Philistine city and start belonging to outsiders.

Losing control of your own city was one of the harshest judgments in the ancient world.

🏙️ Bastard means a mixed population here

🔄 Ashdod loses its own identity

⚖️ Outsiders replace the original people

📖 Few punishments cut this deep

## 💔 I Will Cut Off The Pride Of The Philistines

Pride here means the Philistines' long standing confidence as Israel's fiercest enemy.

That confidence stretched all the way back to Samson, Saul, and David's own battles with Goliath.

God promises to end that whole legacy of defiance in one stroke.

Centuries of conflict come to a close inside a single verse.

💔 Pride means their long standing defiance

⚔️ Their history reached back to Goliath

🛑 God ends that whole legacy

📖 A long war ends in one line

## 🏙️ He Shall Be As A Governor In Judah, And Ekron As A Jebusite

A Jebusite was a Canaanite resident of Jerusalem before David ever captured the city.

Jebusites were never wiped out completely.

Many were absorbed into Israel and eventually worshiped the true God alongside everyone else.

Ekron, a Philistine city, is promised that exact same future here.

Even Israel's enemies could end up grafted into God's own people.

🏙️ Jebusites once lived in Jerusalem

🤝 Many were absorbed into Israel

🔮 Ekron is promised that same future

📖 Outsiders can become God's own family

## 🏛️ I Will Encamp About Mine House

"Mine house" means God's own temple in Jerusalem.

"Encamp" is military language, describing troops set up to guard a specific place.

God pictures himself personally standing guard over his own temple like an army on watch.

No human army is strong enough to provide protection like that.

🏛️ Mine house means God's own temple

🪖 Encamp means standing guard like an army

🛡️ God personally guards his own house

📖 Only God can guard it like that

## 🚫 No Oppressor Shall Pass Through Them Any More

This promises an end to repeated invasions crossing through this exact region.

Armies from larger empires regularly marched straight through this corridor on their way to war elsewhere.

That constant foot traffic brought looting, forced labor, and fear with every passing army.

God promises the marching finally stops here.

🚫 No more invading armies pass through

🪖 Armies once regularly marched through here

😨 That traffic brought fear and looting

📖 God himself ends the invasions

## 👻 Ashkelon Shall Not Be Inhabited

This is a direct, specific prediction about a real city's future.

Ashkelon did decline sharply in the centuries after this prophecy.

A city once feared across the region fades from relevance completely.

God is not speaking only in symbols here.

👻 A specific prediction about Ashkelon

📉 The city's old power faded

🫥 It lost its former importance

📖 This is real history, not metaphor

# Zechariah 9:9-10
# 👑 The King Who Comes In Peace
---
## 🏙️ Rejoice Greatly, O Daughter Of Zion

"Daughter of Zion" is a poetic name for Jerusalem and its people together.

Prophets often speak to a whole city as if addressing one person.

This command to rejoice stands out because most of Zechariah's prophecies carry warning, not celebration.

Something is coming that is worth real, loud joy.

🏙️ Daughter of Zion means Jerusalem's people

🗣️ Prophets often speak to cities as one

🎉 This command breaks from Zechariah's usual warnings

📖 Real joy is finally coming

## 👑 Behold, Thy King Cometh Unto Thee

This king is not a vague future ruler.

The Gospel of Matthew directly connects this exact verse to Jesus entering Jerusalem.

Crowds there waved palm branches and shouted praises on the very day this verse describes.

A promise written centuries earlier arrives on one specific afternoon.

👑 This king is a real, named person

📖 Matthew connects this verse to Jesus

🌿 Crowds waved palms on that exact day

➡️ A centuries old promise finally arrives

## 🫏 Riding Upon An Ass, And Upon A Colt The Foal Of An Ass

This does not mean the coming king is weak or embarrassing himself.

Kings in this culture rode horses into war and donkeys during peaceful, formal visits.

Choosing a donkey was a deliberate signal of humility and peace, not a lack of options.

The description repeats the same animal twice simply for poetic emphasis, a common pattern in Hebrew poetry.

🫏 A donkey signaled peace, not weakness

⚔️ Horses were reserved for war

🕊️ This king arrives on purpose, in peace

📖 Hebrew poetry often repeats for emphasis

## 🐎 Cut Off The Chariot From Ephraim, And The Horse From Jerusalem

Chariots and horses were the core weapons of ancient warfare.

Removing them from Ephraim and Jerusalem means removing the tools for fighting wars at all.

This king's reign will not be built on military strength.

That is a radical promise for people who had just survived exile and invasion.

🐎 Chariots and horses were war machines

🛑 This king removes the tools of war

🕊️ His reign rests on peace, not force

📖 A radical promise after years of invasion

## 🌍 He Shall Speak Peace Unto The Heathen

"Heathen" here simply means the nations outside Israel.

This king does not just rule his own people peacefully.

He actively speaks peace to outsiders who were once enemies.

That kind of reach was almost unheard of for an ancient king.

🌍 Heathen means the nations outside Israel

🕊️ Peace reaches outsiders, not just Israel

🤝 Former enemies are included here

📖 This kind of reach was almost unheard of

## 🏞️ His Dominion Shall Be From Sea Even To Sea

"The river" names the Euphrates, the traditional eastern border of the promised land.

"Sea to sea" and "the ends of the earth" stretch that border far beyond its original lines.

This is no longer a promise about one nation's territory.

It describes a kingdom with no real edge at all.

🏞️ The river means the Euphrates

🗺️ This dominion reaches past old borders

🌍 It stretches to the ends of the earth

📖 This reign has no outer limit

# Zechariah 9:11-13
# 🏹 Prisoners Freed, Judah Becomes A Weapon
---
## 🩸 By The Blood Of Thy Covenant

This covenant points back to Mount Sinai, where Israel's agreement with God was sealed with sacrificial blood.

That blood ceremony is recorded back in Exodus chapter twenty four.

God is not acting on a new whim here.

He is honoring a promise made generations earlier.

🩸 This covenant points back to Sinai

📜 Exodus describes that original ceremony

🤝 God keeps an ancient promise here

📖 This is not a new decision

## 🕳️ Thy Prisoners Out Of The Pit Wherein Is No Water

A pit with no water was a dry, empty cistern used as a makeshift prison.

Joseph and the prophet Jeremiah were both thrown into pits very much like this one.

Being trapped in a waterless pit meant real suffering with no way out.

God promises to personally pull his people out of exactly that kind of trap.

🕳️ A dry pit was used as a prison

📜 Joseph and Jeremiah faced a pit like this

🙏 It meant real suffering with no escape

📖 God personally pulls his people out

## 🏰 Turn You To The Strong Hold, Ye Prisoners Of Hope

"Prisoners of hope" names exiles who kept believing in God's promises.

They held onto that hope even during the captivity itself.

The strong hold here is a place of real safety, not just a military fort.

Calling them prisoners of hope instead of just prisoners changes the whole meaning.

Their captivity never actually crushed their hope.

🙏 Prisoners of hope kept believing in exile

🏰 The strong hold meant real safety

💔 They were prisoners, yet never hopeless

📖 Captivity never crushed their hope

## ⚖️ I Will Render Double Unto Thee

This promises restoration worth twice whatever was lost in exile.

It is not a vague comfort but a specific, measured promise.

Years of suffering get matched with an even larger return.

God's justice here works in the people's favor, not just as punishment on their enemies.

⚖️ A specific, doubled restoration is promised

📈 A bigger reward replaces the loss

🙌 Justice here brings blessing, not only punishment

📖 Suffering does not go unanswered

## 🏹 Bent Judah For Me, Filled The Bow With Ephraim

This verse pictures God as an archer preparing for battle.

Judah becomes the bow itself, the tool God bends into shape.

Ephraim becomes the arrow, loaded into that bow and ready to fly.

Two historically divided tribes are joined into one single weapon in God's hand.

🏹 God takes aim like a warrior

🎯 Judah is shaped into a weapon

🪶 Ephraim flies as the arrow

📖 Old rivals become one weapon together

## 🇬🇷 Against Thy Sons, O Greece

"Greece" names a nation barely on Israel's radar when Zechariah actually wrote this.

Persia, not Greece, ruled the known world at this time.

Centuries later, Alexander the Great's Greek empire became one of Israel's fiercest threats.

Naming Greece this early is a striking piece of long range foresight.

🇬🇷 Greece was a minor power then

🏛️ Persia was the real power then

⚔️ That weak nation later turned dangerous

📖 This prophecy saw far into the future

# Zechariah 9:14-17
# 🌩️ The LORD Fights And Then Feasts
---
## 👁️ His Arrow Shall Go Forth As The Lightning

God himself now appears as a warrior, visible over his own people.

His arrow is compared to lightning, striking fast and impossible to dodge.

This picture echoes the storm imagery used for God throughout the Old Testament.

The same God who once seemed distant now appears ready to fight for them personally.

👁️ God steps into view as a warrior

⚡ Lightning speed, impossible to escape

🌩️ Storm pictures for God run throughout scripture

📖 Distance turns into close protection

## 🧭 Shall Go With Whirlwinds Of The South

"The south" points toward the Negev, the dry desert region below Judah.

Storms from that direction were known for sudden, violent winds.

God is pictured riding on that same kind of fierce, natural force.

A trumpet blast earlier in the verse adds the sound of a war signal to the picture.

🧭 South points to Judah's desert border

🌪️ That direction brought fierce desert storms

📯 A trumpet adds a war signal

📖 God arrives inside the storm itself

## 🪨 Subdue With Sling Stones

A sling was a simple weapon, a leather strap used to hurl stones at high speed.

David famously used one to defeat Goliath generations earlier.

Here it stands for ordinary fighters, not just elite soldiers, winning a real battle.

God's victory does not depend on fancy weapons.

🪨 A simple strap could launch stones fast

🛡️ This is the same weapon David used

⚔️ Everyday soldiers share in this victory

📖 Simple tools, not fancy ones, win

## 🩸 Filled Like Bowls, And As The Corners Of The Altar

These bowls were the basins priests used to catch and sprinkle sacrificial blood.

The corners of the altar were regularly soaked with that same blood during temple offerings.

Both images picture complete, overflowing victory, filled all the way to the edge.

This is sacrifice language used to describe a battle, not a ritual.

🩸 Bowls caught blood during sacrifices

🔥 Blood soaked that altar often too

🏆 Victory here is full, not partial

📖 Worship imagery paints this battle scene

## ⚔️ As The Flock Of His People

After all the battle imagery, God suddenly becomes a shepherd instead of a warrior.

A flock depends completely on its shepherd for safety, food, and direction.

That shift in picture matters.

Protection in war and gentle care afterward come from the very same God.

⚔️ The warrior becomes a shepherd here

🐑 Flocks rely completely on their shepherd

🙏 Safety and gentle care come together

📖 One God provides both battle and care

## 💎 As The Stones Of A Crown, Lifted Up As An Ensign

Crown stones were the valuable jewels set carefully into a king's crown.

An ensign was a raised banner or flag, visible from a distance as a rallying point.

God's people go from being trampled to being treasured and displayed with pride.

That is a complete reversal of their former status.

💎 Jewels like these marked royal honor

🚩 A banner rallied people from far off

🔄 Shame turns into treasured display

📖 Being despised becomes being prized

## 🙌 How Great Is His Goodness, And How Great Is His Beauty

This line breaks into pure praise, with no new information to explain.

After pages of judgment and battle, the chapter stops to simply admire God himself.

Goodness and beauty here describe God's character, not just his actions.

The feeling of the chapter shifts from tension to genuine wonder.

🙌 The tone turns to simple praise

✨ The whole mood pauses to marvel

💫 These words praise who God is

📖 The mood turns to wonder

## 🌾 Corn Shall Make The Young Men Cheerful, And New Wine The Maids

"Corn" here means grain, the basic harvest crop, not corn on the cob.

New wine was a simple, everyday drink made from the season's fresh grape harvest.

Both pictures describe ordinary prosperity returning to ordinary people after years of hardship.

The chapter that opened with judgment on nations ends with young people simply enjoying a good harvest.

🌾 Corn means grain, not a vegetable

🍷 Fresh grape juice marked a good year

😊 Everyday joy returns after hard years

📖 Judgment gives way to simple joy
`.trim();

export const ZECHARIAH_NINE_PERSONAL_SECTIONS = parseZechariahNineRawNotes(ZECHARIAH_NINE_RAW_NOTES);
