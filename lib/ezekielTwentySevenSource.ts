export type EzekielTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentySevenRawNotes(rawText: string): EzekielTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 27:${startVerse}` : `Ezekiel 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Ezekiel 27 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_SEVEN_RAW_NOTES = `# Ezekiel 27:1-3
# 💰 Tyre's Beauty Boasts Before Its Fall
---
## 😢 Take Up A Lamentation For Tyrus

A lamentation is a funeral song, normally sung after someone has died.

God tells Ezekiel to sing one for Tyre while the city is still very much alive.

Tyre was proud, wealthy, and sure of her own permanence.

Singing her funeral song early makes the coming judgment feel certain, not maybe.

The whole chapter plays out like that song, verse by verse.

😢 Lamentation means a funeral song
🏙️ Tyre was still alive and proud
⏳ The song comes before the death
📖 The judgment is treated as certain

## 🌊 Situate At The Entry Of The Sea

Situate simply means located, an older way of saying where a place sits.

Tyre sat right where sea routes opened toward the coast.

Ships heading toward Israel, Egypt, or the wider coastline passed near her harbors.

That location made Tyre a natural doorway for trade.

Her whole identity grew out of that one geographic advantage.

🌍 Situate means located
🌊 Tyre sat where sea routes opened
🚢 Ships from many lands passed nearby
📖 Geography built Tyre's entire identity

## 🏝️ A Merchant Of The People For Many Isles

Isles here covers coastlines and islands across the ancient sea world.

Tyre did not just trade with her own neighbors.

She supplied and profited from dozens of distant ports at once.

The rest of this chapter names many of those isles one by one.

Each one depended on Tyre more than Tyre depended on any single one of them.

🏝️ Isles means distant coastlines and islands
🌍 Tyre traded with dozens of ports
📜 The chapter names them one by one
📖 Many depended on Tyre, not the reverse

## 👑 I Am Of Perfect Beauty

This is Tyre speaking about herself, not God or Ezekiel describing her.

Perfect beauty is a boast, not a simple observation.

Her confidence rested entirely on her wealth, her harbors, and her ships.

That same proud claim opens the lament right before her fall gets described.

Pride spoken out loud often comes right before God answers it directly.

👑 Tyre boasts about her own beauty
💰 Her confidence rested on wealth and trade
⚠️ The boast opens the lament itself
📖 Pride spoken aloud invites God's answer

# Ezekiel 27:4-7
# 🚢 Tyre Built Like The Finest Ship Afloat
---
## ⛵ Thy Borders Are In The Midst Of The Seas

Borders means Tyre's own edges, not a nation's boundary line.

The mainland city sat on the coast.

Her most defended core sat out on a rocky island just offshore.

From here, the chapter starts describing Tyre as if she were a ship.

Every verse that follows builds that same picture piece by piece.

⛵ Borders means Tyre's own edges
🏝️ Her defended core sat on an island
🚢 The chapter pictures Tyre as a ship
📖 Each verse adds another piece to it

## 🌲 Ship Boards Of Fir Trees Of Senir

Senir is another name for Mount Hermon, a tall mountain north of Israel.

Fir trees from its slopes were prized for shipbuilding.

Builders also brought cedars down from Lebanon to shape into masts.

Lebanon's cedar forests were famous across the ancient world for their size and strength.

Even Solomon's temple used that same wood generations earlier.

🌲 Senir is another name for Hermon
🪵 Fir trees became the ship's boards
🌴 Lebanon cedar became the ship's masts
📖 The same wood once built Solomon's temple

## 🛶 Oaks Of Bashan Have They Made Thine Oars

Bashan was a fertile region east of the Jordan, known for strong oak trees.

Those oaks became oars strong enough to move a loaded ship.

Workers from Ashur then built benches of ivory for the deck.

That ivory had traveled in from the isles of Chittim, likely Cyprus.

Every part of this ship came from somewhere far away.

🌳 Bashan was known for strong oak trees
🛶 Oak became the ship's oars
🦴 Ivory benches came from Chittim
📖 Every part of the ship traveled far

## 🎨 Blue And Purple From The Isles Of Elishah Was That Which Covered Thee

The ship's sail was fine linen, embroidered, and brought from Egypt.

Blue and purple dye covered the deck itself, not just small trim pieces.

Elishah was likely a region near Cyprus, known for producing that dye.

Purple dye came from crushed sea snails.

It cost more than almost anything else in the ancient world.

A ship covered in it was not hiding her wealth.

She was showing it to everyone who saw her pass.

🧵 The sail was fine embroidered linen
🎨 Purple dye came from crushed snails
💎 It was one of the costliest dyes
📖 She showed her wealth, not hid it

# Ezekiel 27:8-11
# ⚔️ Sailors, Pilots, And Soldiers Of Tyre
---
## ⛴️ The Inhabitants Of Zidon And Arvad Were Thy Mariners

Zidon and Arvad were both Phoenician port cities, close neighbors of Tyre.

Mariners means the ordinary sailors who actually rowed and steered the ship.

Tyre did not crew her own ships only with her own people.

She pulled skilled workers in from every nearby port she could reach.

Her strength was never only her own.

🏙️ Zidon and Arvad were nearby port cities
⛵ Mariners means the sailors who steered
🤝 Tyre pulled in skilled workers from neighbors
📖 Her strength was borrowed, not only her own

## 🧭 Thy Wise Men, O Tyrus, That Were In Thee, Were Thy Pilots

A pilot here guided the ship safely through rocks, currents, and harbors.

Calling them wise men shows how much skill the job required.

The ancients of Gebal, a city today known as Byblos, worked as her calkers.

A calker sealed the gaps between boards so the ship would not leak.

Every one of these roles kept one single vessel afloat.

🧭 Pilots guided the ship through danger
🏙️ Gebal is the city known today as Byblos
🧰 Calkers sealed the boards against leaks
📖 Every skilled role kept one ship afloat

## 🛡️ They Of Persia And Of Lud And Of Phut Were In Thine Army

Persia, Lud, and Phut were distant lands, not neighbors of Tyre.

Lud likely points to a people in Asia Minor, and Phut to a region near Libya.

These soldiers were hired men, paid to fight for Tyre's defense.

Hanging their shields and helmets on her walls was a display, not just gear storage.

A rich city could buy an army it never had to raise itself.

🛡️ Persia, Lud, and Phut were distant lands
💰 These soldiers were hired, not native
🪖 Shields on the walls were a display
📖 Wealth bought an army Tyre never raised

## 🏰 The Gammadims Were In Thy Towers

The exact identity of the Gammadims is not certain even to scholars today.

Many think the word describes brave or highly skilled soldiers.

Whoever they were, they stood watch in Tyre's defensive towers.

Arvad's own army manned the walls that ran all the way around the city.

Tyre's defenses, like her trade, were built from many borrowed hands.

🏰 Gammadims is a name scholars still debate
🧑‍🤝‍🧑 Many think it means skilled soldiers
🧱 They stood watch in the towers
📖 Tyre's defenses were borrowed, like her trade

# Ezekiel 27:12-15
# 📜 Tarshish To Dedan, A World Of Trade
---
## 🪙 Tarshish Was Thy Merchant By Reason Of The Multitude Of All Kind Of Riches

Tarshish was a far western trading city, possibly located in what is now Spain.

It was famous across the ancient world for silver, iron, tin, and lead.

Jonah later tried to flee toward this same distant port.

Reaching Tyre from Tarshish meant sailing further than almost any other trade route named here.

Tyre's reach already stretched to the edge of the known world.

🪙 Tarshish was a far western trading city
⚙️ It supplied silver, iron, tin, and lead
⛵ Jonah later fled toward this same port
📖 Tyre's reach stretched to the known world's edge

## 🐎 Javan, Tubal, And Meshech, They Were Thy Merchants

Javan names the Greek world, while Tubal and Meshech sat in what is now Turkey.

These same three names show up again later, grouped with Gog in Ezekiel 38.

Here they traded people and bronze goods instead of weapons.

Trading the persons of men is a blunt way of naming the slave trade.

Tyre's wealth was never only metal and cloth.

🇬🇷 Javan names the Greek world
🗺️ Tubal and Meshech sat in modern Turkey
⚠️ They traded people, not only goods
📖 Tyre's wealth included the slave trade

## 🐴 They Of The House Of Togarmah Traded In Thy Fairs With Horses And Horsemen And Mules

Togarmah was a region near Armenia, in the far northeast of Asia Minor.

That area was well known in the ancient world for raising strong horses.

A fair, in this context, means a trading market, not a festival.

Tyre imported both animals and trained riders, not just raw goods.

Even her cavalry supply chain stretched hundreds of miles away.

🐴 Togarmah sat in the far northeast
🐎 The region was known for strong horses
🛒 A fair here means a trading market
📖 Even cavalry came from hundreds of miles out

## 🦴 The Men Of Dedan Were Thy Merchants

Dedan was a trading people linked to the Arabian peninsula.

Many isles supplied Tyre, but this verse singles out one gift in particular.

Ivory and ebony came in as presents, not ordinary bulk cargo.

Ebony is a dense, dark wood prized for fine furniture and carving.

A gift like this marked a relationship worth keeping, not just a sale.

🏜️ Dedan was linked to the Arabian peninsula
🎁 Ivory and ebony came as gifts
🪵 Ebony is a dense, prized dark wood
📖 The gift marked a valued relationship

# Ezekiel 27:16-19
# 🏺 Syria, Judah, And Damascus Fill Tyre's Shelves
---
## 💎 Syria Was Thy Merchant By Reason Of The Multitude Of The Wares Of Thy Making

Syria here refers to Aram, the region just northeast of Israel.

Emeralds, purple cloth, and fine embroidered linen flowed through this trade route.

Coral and agate, both prized stones, are named right alongside them.

The sheer number of named goods shows how much Tyre's own products were in demand.

Other nations were not just selling to Tyre.

💎 Syria is the region called Aram
🧵 Purple cloth and fine linen traveled this route
💍 Coral and agate were prized stones
📖 Nations bought from Tyre too

## 🌾 Judah, And The Land Of Israel, They Were Thy Merchants

God's own covenant people appear here as one trading partner among many.

Wheat of Minnith was a specific, well regarded grain grown in Ammonite territory.

Pannag is a word scholars still cannot translate with full confidence.

Honey, oil, and balm rounded out what Israel sent to Tyre's markets.

Even the promised land's harvest passed through a pagan city's hands.

🌾 Israel appears as one trading partner
🌽 Minnith names a region known for its wheat
❓ Pannag is a word scholars still debate
📖 Israel's harvest passed through a pagan city

## 🍷 Damascus Was Thy Merchant In The Wine Of Helbon, And White Wool

Damascus was the capital of Syria, a major city in its own right.

Helbon was a nearby region whose vineyards produced especially prized wine.

White wool stood out because most wool took extra work to bleach that pale.

Both goods were valued for quality, not just raw quantity.

Tyre collected the best of what every neighbor had to offer.

🏙️ Damascus was the capital of Syria
🍇 Helbon's vineyards produced prized wine
🐑 White wool took extra work to bleach
📖 Tyre collected only the best from each neighbor

## ⚙️ Bright Iron, Cassia, And Calamus, Were In Thy Market

Dan and Javan brought these goods in through constant back and forth trade.

Bright iron names wrought iron, worked smooth rather than left rough.

Cassia and calamus were both fragrant plants used to make incense and perfume.

Spices like these traveled enormous distances for their scent alone.

A market this wide pulled in goods that served no practical need but smell and shine.

⚙️ Bright iron means smoothly worked iron
🌿 Cassia and calamus were fragrant plants
👃 Spices traveled far just for their scent
📖 Tyre's market sold luxury, not only necessity

# Ezekiel 27:20-25
# 👑 Every Nation Brought Something To Sell
---
## 🐪 Dedan Was Thy Merchant In Precious Clothes For Chariots

This verse names Dedan again, now tied to a very specific product.

Precious clothes for chariots likely means fine fabric saddle coverings, not everyday clothing.

A chariot dressed this well was built to be seen, not just to ride in.

Wealth in the ancient world was often worn in public, not kept hidden.

Tyre supplied the look of power as much as power itself.

🐪 Dedan supplied fine chariot coverings
🏇 These covered chariots, not riders
👁️ Wealth was meant to be seen
📖 Tyre sold the look of power itself

## 🐑 Arabia, And All The Princes Of Kedar

Kedar was a nomadic Arabian tribe, descended from Ishmael's son of that name.

These were herding peoples, not city dwellers like most other names in this list.

Lambs, rams, and goats were their entire trade, their whole way of life.

Even a wandering tribe with no city walls still had something Tyre wanted.

No corner of the ancient economy sat outside Tyre's reach.

🐫 Kedar traces back to a son of Ishmael
🐑 Lambs, rams, and goats were their trade
⛺ They were herders, not city dwellers
📖 No corner of the economy escaped Tyre

## 💰 The Merchants Of Sheba And Raamah

Sheba was a wealthy southern Arabian kingdom, the same one Solomon's queen once visited.

Raamah was a smaller, closely related trading people in the same region.

Spices, precious stones, and gold were their signature exports.

These were some of the rarest and most valuable goods named in the whole chapter.

The farther a good had to travel, the more it said about Tyre's pull.

👑 Sheba's queen once visited Solomon
🌍 Raamah traded alongside Sheba
💎 Spices, stones, and gold were their exports
📖 Distance itself measured Tyre's pull

## 🗺️ Haran, And Canneh, And Eden, The Merchants Of Sheba, Asshur, And Chilmad

Haran was the city where Abraham's family once settled before he journeyed on to Canaan.

Canneh, Eden, Asshur, and Chilmad were all trading centers scattered through Mesopotamia.

Naming so many cities at once shows just how wide Tyre's trade network reached.

Chests of rich clothing, bound with cords and built from cedar, came through this same route.

A single shipment could carry pieces of a dozen different cities inside it.

🏡 Haran was Abraham's family's former home
🗺️ These were Mesopotamian trading centers
📦 Rich clothing chests traveled this route
📖 One shipment held pieces of many cities

## ⛵ Thou Wast Replenished, And Made Very Glorious In The Midst Of The Seas

Replenished means filled back up, continually restocked with new goods and wealth.

The ships of Tarshish are pictured almost singing in celebration of Tyre's success.

Glorious here describes dazzling wealth, not moral goodness or honor.

Every nation named so far fed into this one single, glittering result.

Tyre stood, for this one moment, at the very top of the ancient world.

🔁 Replenished means constantly restocked
🎶 Tarshish's ships celebrated her success
✨ Glorious here means dazzling wealth
📖 Every nation fed one glittering result

# Ezekiel 27:26-28
# 🌊 The East Wind Breaks The Ship
---
## 🚣 Thy Rowers Have Brought Thee Into Great Waters

The picture shifts here, from a ship being built to a ship already at sea.

Rowers were the ordinary workers who physically powered the vessel forward.

Great waters means open, deep sea, far from any safe harbor.

Everything built in the earlier verses now gets tested out on the open water.

A ship this loaded with wealth had the most to lose out there.

🚣 Rowers physically powered the ship
🌊 Great waters means open, deep sea
⚠️ Everything built earlier is now tested
📖 A loaded ship had the most to lose

## 💨 The East Wind Hath Broken Thee In The Midst Of The Seas

The east wind appears throughout the Bible as a picture of harsh judgment.

It dried up the Red Sea, withered Jonah's shelter, and scorched Pharaoh's dream grain.

Here it simply shatters Tyre, out where no coastline can shelter her.

All her wealth, her hired soldiers, and her famous ships could not stop one wind.

The very sea that made her rich is the same sea that ends her.

💨 The east wind pictures harsh judgment
🌾 It also withered grain in Pharaoh's dream
🚫 No wealth or army could stop it
📖 The sea that made her rich ends her

## 📣 The Suburbs Shall Shake At The Sound Of The Cry Of Thy Pilots

Suburbs here means the smaller towns and villages surrounding Tyre's main harbor.

They felt the disaster before they ever saw the wreckage itself.

The cry of the pilots means the shouted panic of the men still steering.

Sound traveling ahead of a disaster is its own kind of warning.

Fear reached land before the ship ever did.

🏘️ Suburbs means towns near the main harbor
📣 The cry came from the panicked pilots
🔊 Sound of disaster traveled ahead of it
📖 Fear reached land before the ship did

# Ezekiel 27:29-32
# 😭 A Funeral For A Sunken City
---
## 🧍 All That Handle The Oar Shall Come Down From Their Ships, They Shall Stand Upon The Land

Every worker named earlier in the chapter now abandons the ship completely.

Standing on land, safe themselves, they still turn to watch Tyre go down.

This is the full crew of the earlier verses, now reduced to helpless witnesses.

The same hands that built and sailed her could not save her in the end.

Watching was all that remained for them to do.

🧍 Every worker abandons the sinking ship
👀 They watch helplessly from dry land
🙌 These are the same hands that built her
📖 Watching was all that was left to do

## 😭 They Shall Cause Their Voice To Be Heard Against Thee, And Shall Cry Bitterly

This is loud, public grief, not quiet private sorrow.

Casting dust upon their heads was a recognized mourning gesture in that culture.

Dust pictured the grave itself, a person returning to plain dirt.

Doing this in public told everyone watching exactly how serious the loss was.

Grief this loud was meant to be seen, not hidden away.

😭 This is loud, public grief
🌫️ Dust on the head pictured the grave
👥 The gesture was meant to be seen
📖 Public grief measured how serious the loss was

## 👤 They Shall Make Themselves Utterly Bald For Thee, And Gird Them With Sackcloth

Shaving the head bald was another ancient sign of deep, visible mourning.

Sackcloth was a rough, uncomfortable fabric worn specifically during grief or disaster.

Wearing something uncomfortable on purpose matched the pain being felt inside.

These were not quiet feelings kept to oneself.

Mourners made their sorrow physically impossible to miss.

👤 A shaved head signaled deep mourning
🪵 Sackcloth was rough, uncomfortable fabric
💔 Outward discomfort matched inward pain
📖 Sorrow was made impossible to miss

## 🎼 What City Is Like Tyrus, Like The Destroyed In The Midst Of The Sea

This question comes straight from the funeral song the mourners sing.

Tyre's own earlier boast, I am of perfect beauty, gets answered directly here.

No city had ever matched her for wealth or reputation.

No city, it turns out, falls the same way she did either.

The question is not really a question at all.

🎼 This line comes from the funeral song
👑 It answers Tyre's own earlier boast
🏆 No city matched her wealth or reputation
📖 The question is really a verdict

# Ezekiel 27:33-36
# 🪦 Tyre Becomes A Terror And A Memory
---
## 👑 Thou Didst Enrich The Kings Of The Earth With The Multitude Of Thy Riches

Enrich means Tyre's wealth did not stay only inside her own walls.

Kings far beyond her own borders grew richer just from trading with her.

That reach is exactly why her collapse mattered to so many distant places.

A single city's fall could shake economies that never saw her harbor firsthand.

Her influence had always outgrown her small size.

👑 Enrich means her wealth spread outward
🌍 Distant kings grew richer through her trade
📉 Her fall reached economies far away
📖 Her influence outgrew her small size

## 🌊 Broken By The Seas In The Depths Of The Waters

This repeats the ship picture from earlier in the chapter one final time.

Depths of the waters means Tyre sinks completely, not just takes damage.

Her merchandise and her entire company go down together, all at once.

Nothing about this ending is gradual or partial.

The ship metaphor that opened the chapter closes it the exact same way.

🌊 This repeats the earlier ship picture
⬇️ Depths means total sinking, not damage
📦 Her goods and crew go down together
📖 The chapter closes the way it opened

## 😨 All The Inhabitants Of The Isles Shall Be Astonished At Thee, And Their Kings Shall Be Sore Afraid

Every distant trading partner named earlier in the chapter reacts here at once.

Astonished means genuinely stunned, not a polite or expected reaction.

Sore afraid means deeply, visibly frightened, not mildly concerned.

If Tyre could fall this completely, any one of them could fall too.

Her ruin became a warning sign for every port that had depended on her.

😨 Every distant trading partner reacts at once
😮 Astonished means genuinely stunned
😰 Sore afraid means deeply frightened
📖 Her fall warned every dependent port

## 🚫 Thou Shalt Be A Terror, And Never Shalt Be Any More

Merchants hiss here as a gesture of scorn, not a sound of sympathy.

A terror means Tyre becomes a frightening example, a warning told to others.

Never shalt be any more leaves no room for a future rebuilding.

The city that once boasted I am of perfect beauty ends as a cautionary tale.

Her story began in verse one with pride and closes here with nothing left at all.

🚫 Hissing was a gesture of scorn
⚠️ Terror means a frightening warning to others
🏚️ Never any more rules out rebuilding
📖 Pride opened this chapter, nothing closes it
`.trim();

export const EZEKIEL_TWENTY_SEVEN_PERSONAL_SECTIONS = parseEzekielTwentySevenRawNotes(EZEKIEL_TWENTY_SEVEN_RAW_NOTES);
