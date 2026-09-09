export type PsalmsSixtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyFiveRawNotes(rawText: string): PsalmsSixtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+65:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 65 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+65:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+65:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 65 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 65,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 65:${startVerse}` : `Psalms 65:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 65 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_FIVE_RAW_NOTES = `# Psalms 65:1-4
# 🙏 A God Who Forgives And Draws Near
---
## 🙏 Praise Waiteth For Thee, O God, In Sion

"Waiteth" means much more than simply passing time.

It describes a calm, confident, ongoing expectation.

David is not begging or pleading in this line.

He is describing praise that gathers before God even acts.

Sion refers to Jerusalem, the city where God's temple stood.

That is where this kind of confident praise properly belongs.

⏳ Waiteth means confident, patient expectation
🙏 Praise gathers even before God acts
🏙️ Sion refers to Jerusalem
📖 True praise belongs at God's temple

## 🤝 Unto Thee Shall The Vow Be Performed

A vow was a promise made directly to God.

People often made vows during a time of trouble or need.

"Performed" means the promise will actually be kept, not just spoken.

David is certain this promised offering will really be paid.

A vow was never meant to be a word without a follow through.

Confidence in God includes confidence that promises get finished.

🤝 A vow was a promise made to God
😟 Vows often came during real trouble
✅ Performed means the promise gets kept
📖 God's people finish what they promise

## 👂 O Thou That Hearest Prayer

This line names God directly by what he does.

God is not a silent or distant listener in this psalm.

He actually hears the prayers people bring to him.

That truth is the reason David can keep praying honestly.

A god who did not listen would make prayer pointless.

👂 God is named as the one who hears
🗣️ Prayer reaches a God who listens
🙌 This truth makes honest prayer possible
📖 A silent god would make prayer empty

## 🌍 Unto Thee Shall All Flesh Come

This does not mean only the nation of Israel comes to God.

"All flesh" means every kind of person, from every nation.

The psalm suddenly widens from David's own voice to the whole world.

This early hint points toward a promise fulfilled much later in scripture.

God was always planning to welcome more than one nation.

🌍 All flesh means every nation, not just Israel
🔭 The psalm widens beyond David alone
📜 This points toward a promise fulfilled later
📖 God planned to welcome every nation

## ⚖️ Iniquities Prevail Against Me

"Iniquities" means sins, specifically the guilt they leave behind.

"Prevail" means to overpower or gain the upper hand.

David is describing the weight of guilt pressing down on him.

He is not hiding this struggle or pretending it away.

Honest prayer can admit that sin sometimes feels stronger than we are.

⚖️ Iniquities means sin and its guilt
💥 Prevail means to overpower someone
😔 David admits guilt feels overwhelming
📖 Honest prayer names real struggle

## 🧼 As For Our Transgressions, Thou Shalt Purge Them Away

"Transgressions" means acts that cross a clear line God has set.

"Purge" means to clean completely, leaving nothing behind.

The pronoun shifts from "me" to "our" in this same verse.

David's personal guilt becomes a shared need for the whole community.

God is the only one able to remove sin this completely.

🚧 Transgressions means crossing God's line
🧼 Purge means cleaned away completely
👥 Me shifts to our in this verse
📖 Only God removes sin this fully

## 🙋 Blessed Is The Man Whom Thou Choosest

This blessing does not come from the man's own effort.

The text says God does the choosing, not the person.

"Blessed" describes someone who is truly fortunate before God.

Being chosen and being invited near God go together here.

No one earns their way into God's presence by trying hard enough.

🙋 Blessing comes from God's choice, not effort
🎯 God does the choosing here
😊 Blessed means truly fortunate before God
📖 No one earns their way to God

## 🚪 Causest To Approach Unto Thee, That He May Dwell In Thy Courts

"Approach" describes gaining access to come near God's presence.

In the temple system, ordinary access to God's presence was limited.

"Courts" refers to the outer areas surrounding the temple building itself.

To dwell there pictures a nearness that lasts, not a single visit.

God is not just permitting a visit but inviting someone to stay close.

🚪 Approach means gaining access to God
🏛️ Courts were the temple's surrounding areas
🏠 Dwell pictures lasting nearness, not one visit
📖 God invites people to stay close

## 🍽️ We Shall Be Satisfied With The Goodness Of Thy House, Even Of Thy Holy Temple

"Satisfied" means fully filled, with nothing left wanting.

"Thy house" and "thy holy temple" both point to the same place.

That place was where God's own presence was understood to dwell.

David expects real fullness there, not a partial or empty visit.

Nearness to God is pictured here as the deepest kind of satisfaction.

🍽️ Satisfied means fully filled, not partial
🏛️ House and temple point to the same place
✨ God's presence made this place special
📖 Nearness to God is true satisfaction

# Psalms 65:5-8
# 🌊 The God Who Calms The Roaring Sea
---
## 😮 By Terrible Things In Righteousness Wilt Thou Answer Us

"Terrible things" here does not mean things that are simply bad.

In this context, it means acts powerful enough to inspire real awe.

"Righteousness" means these acts are also completely fair and just.

God answers prayer through visible, sometimes overwhelming action.

His power and his fairness are never separated from each other.

😮 Terrible things means awe inspiring acts
⚖️ Righteousness means these acts are just
💪 God answers prayer through real action
📖 God's power and fairness stay together

## 🌊 Who Art The Confidence Of All The Ends Of The Earth, And Of Them That Are Afar Off Upon The Sea

"The ends of the earth" refers to the farthest, most distant nations.

"Them that are afar off upon the sea" describes people across the ocean.

Neither phrase points to one specific place or people group.

Together they describe the entire known world at that time.

Even people who never heard of Israel's God still depend on him.

🌍 Ends of the earth means distant nations
🌊 Afar off upon the sea means overseas peoples
🗺️ Together they mean the whole known world
📖 Every nation depends on God, even unknowingly

## ⛰️ Which By His Strength Setteth Fast The Mountains

"Setteth fast" means to fix something firmly in place.

Mountains were the most permanent, unmovable objects a reader could picture.

Think of a building set on solid rock instead of loose sand.

Nothing shifts it, no matter the weather or the years.

God's strength is pictured as being at least that stable and sure.

⛰️ Setteth fast means fixed firmly in place
🏔️ Mountains pictured total permanence to ancient readers
🪨 Like a building set on solid rock
📖 God's strength is pictured as unshakable

## 🧵 Being Girded With Power

"Girded" describes tying a belt tightly around the waist.

Soldiers and workers girded themselves before hard, physical effort.

The image pictures God as dressed and ready for action.

This is not a distant, passive kind of strength.

God's power is pictured as active and always ready to use.

🧵 Girded means a belt tied for action
🛡️ Soldiers girded themselves before hard work
💪 This pictures God ready for action
📖 God's power is active, not passive

## 🤫 Which Stilleth The Noise Of The Seas, The Noise Of Their Waves

"Stilleth" means to calm something down completely.

A raging sea was one of the most feared sights in the ancient world.

Think of a loud, crashing storm suddenly falling completely silent.

No human effort can calm the sea like that.

Only God's authority reaches over water this way.

🤫 Stilleth means calmed down completely
🌊 A raging sea pictured total chaos
⛈️ Like a storm suddenly falling silent
📖 Only God's authority calms the sea

## 📢 And The Tumult Of The People

"Tumult" means noisy chaos, like a violent uprising or riot.

This same verse moves from calming seas to calming nations.

Raging water and raging nations are placed side by side on purpose.

The same God who controls water controls violent human chaos too.

Nothing is genuinely outside of God's reach in this picture.

📢 Tumult means noisy, violent chaos
🌊 Seas and nations are paired on purpose
🌍 The same God controls both
📖 Nothing sits outside God's reach

## 🗺️ They Also That Dwell In The Uttermost Parts Are Afraid At Thy Tokens

"Uttermost parts" means the farthest, most remote regions of the earth.

"Tokens" refers to visible signs or acts that reveal who God is.

Even people living far from Israel notice these signs.

Their reaction is a real, reverent fear, not simple curiosity.

God's actions are visible enough to reach people who never met him personally.

🗺️ Uttermost parts means the farthest regions
🔍 Tokens means visible signs of God
😮 Distant people notice these signs
📖 God's actions reach people everywhere

## 🌅 Thou Makest The Outgoings Of The Morning And Evening To Rejoice

"Outgoings" means the points where morning and evening begin.

This describes sunrise in the east and sunset in the west.

The verse pictures the whole daily cycle responding to God with joy.

Even the natural pattern of day and night reflects his goodness.

Creation itself is described here as glad, not neutral or silent.

🌅 Outgoings means where morning and evening begin
🌄 This pictures sunrise and sunset
🎶 The daily cycle responds with joy
📖 Creation itself reflects God's goodness

# Psalms 65:9-13
# 🌾 God Crowns The Year With Plenty
---
## 👀 Thou Visitest The Earth, And Waterest It

"Visitest" here means to pay close, personal attention to something.

This is not a distant, one time inspection of the earth.

God is pictured actively caring for the land itself.

"Waterest" describes providing the rain a growing land actually needs.

His attention to creation is ongoing, not occasional.

👀 Visitest means close, personal attention
🌍 God actively cares for the land
🌧️ Waterest means providing needed rain
📖 God's care for creation is ongoing

## 🌊 Thou Greatly Enrichest It With The River Of God

"The river of God" does not name one specific, mapped river.

It pictures God's own abundant supply of water and blessing.

"Enrichest" means to make something rich and full of resources.

The image describes a source of provision that never actually runs dry.

God himself is the true supply behind every good harvest.

🌊 River of God pictures divine abundance
💰 Enrichest means made rich with resources
♾️ This supply never runs dry
📖 God is the true source of harvest

## 🌾 Thou Preparest Them Corn, When Thou Hast So Provided For It

"Corn" in this psalm means grain in general, not one specific crop.

God is described as preparing the harvest before it even arrives.

The provision comes first, and the growth follows after it.

Nothing about a good harvest happens by pure accident here.

God's planning stands behind the food that reaches every table.

🌾 Corn here means grain in general
📋 God prepares the harvest in advance
🌱 Provision comes before the growth
📖 God's planning stands behind every harvest

## 🌱 Thou Waterest The Ridges Thereof Abundantly

"Ridges" refers to the raised rows of plowed soil in a field.

Ancient farmers shaped fields this way to control water and planting.

"Abundantly" means far more than a bare minimum amount.

God is pictured soaking the entire shaped field, not just part of it.

This same verse also describes God settling the furrows between those rows.

🌱 Ridges means the raised rows of plowed soil
👨‍🌾 Ancient farmers shaped fields this way
💧 Abundantly means far more than the minimum
📖 God soaks the whole field, not part

## 🌧️ Thou Makest It Soft With Showers

Freshly plowed soil can dry into a surface too hard for seeds.

Gentle showers loosen that hard ground back into something workable again.

Think of hard, packed dirt slowly turning soft after steady rain.

This same verse also describes God blessing the crop as it springs up.

God tends the smallest steps of growth, not just the final harvest.

🌧️ Showers soften soil too hard for seeds
🪨 Hard, packed dirt turns workable again
🌱 God blesses the crop as it grows
📖 God tends every step, not just the harvest

## 👑 Thou Crownest The Year With Thy Goodness

"Crownest" pictures placing something like a crown on top of the year.

A crown marks the final, completing touch on something already good.

This describes an entire year shaped by God's own goodness.

The image suggests a full year, not just one good harvest season.

God's goodness is described as covering the whole span of time.

👑 Crownest pictures a completing, final touch
📅 This describes an entire year, not one season
✨ God's goodness shapes the whole year
📖 Every season answers to God's goodness

## 🛤️ And Thy Paths Drop Fatness

"Paths" pictures the tracks and trails that God's blessing follows.

"Fatness" means rich abundance, like overflowing oil or well fed livestock.

The image pictures blessing dripping down like something overflowing a container.

This is poetic language for a season of real material abundance.

Even the ground itself seems to overflow with good things here.

🛤️ Paths pictures the tracks blessing follows
🫗 Fatness means rich, overflowing abundance
📈 The image pictures blessing dripping down
📖 The ground itself overflows with good things

## 🌾 They Drop Upon The Pastures Of The Wilderness

"They" refers back to the rich drops of blessing from the verse before.

"Pastures of the wilderness" describes open grazing land, not a desert wasteland.

In this psalm, wilderness describes untamed, unfarmed open country.

Even land far from any city receives God's careful attention.

God's goodness is not limited to farmed or settled places.

🔗 They refers back to the drops of blessing
🌾 Pastures of the wilderness means open grazing land
🏞️ Wilderness here means untamed, unfarmed country
📖 God's goodness reaches unsettled places too

## ⛰️ And The Little Hills Rejoice On Every Side

This line pictures the hills themselves responding with joy.

Hills cannot literally feel or celebrate anything on their own.

The poem gives human joy to the landscape itself.

This kind of language is common throughout the poetry of the Psalms.

All of creation is pictured celebrating God's provision together.

⛰️ Hills are pictured responding with joy
🎭 This gives human joy to the landscape
📜 This kind of language is common in Psalms
📖 All creation celebrates God's provision together

## 👕 The Pastures Are Clothed With Flocks

"Clothed" pictures the fields wearing something, like fabric covering skin.

Here the fabric covering the fields is actually a flock of sheep.

Think of a green hillside so full of sheep it looks covered.

This pictures abundance so great it fills every visible space.

The scene shows a land bursting with healthy, thriving livestock.

👕 Clothed pictures fields wearing something
🐑 The fabric here is a flock of sheep
🏞️ A hillside so full it looks covered
📖 The land bursts with thriving livestock

## 🌾 The Valleys Also Are Covered Over With Corn

This verse pairs hillsides full of sheep with valleys full of grain.

Together the two pictures cover the entire landscape completely.

Nothing in this scene is empty, wasted, or left unused.

Grain filled every valley the same way sheep filled every hill.

The whole land is pictured as fully productive at once.

🌾 Valleys are covered over with corn
🐑 This pairs with the hills full of sheep
🗺️ Together they cover the whole landscape
📖 The whole land is fully productive

## 🎉 They Shout For Joy, They Also Sing

The psalm ends with the whole scene bursting into celebration.

Fields, hills, and valleys are all pictured shouting and singing together.

This is not quiet contentment but loud, joyful noise.

The psalm opened with David waiting quietly before God in Sion.

It closes with all of creation praising him out loud.

Praise moves from one man's patient waiting to the whole world's celebration.

🎉 The psalm ends in loud celebration
🌾 Fields, hills, and valleys join the sound
🔁 This closes the pattern that opened the psalm
📖 Praise grows from one man to all creation
`.trim();

export const PSALMS_SIXTY_FIVE_PERSONAL_SECTIONS = parsePsalmsSixtyFiveRawNotes(PSALMS_SIXTY_FIVE_RAW_NOTES);
