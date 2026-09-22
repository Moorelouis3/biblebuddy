export type IsaiahSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixteenRawNotes(rawText: string): IsaiahSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 16:${startVerse}` : `Isaiah 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 16 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTEEN_RAW_NOTES = `# Isaiah 16:1-5
# 🐑 Moab Begs For Shelter
---
## Send Ye The Lamb To The Ruler Of The Land

Moab used to pay tribute to Judah's king.

That tribute was paid with lambs.

Second Kings records Moab once owing a hundred thousand lambs a year.

Sending a lamb again means Moab is asking for peace.

This old custom returns now that Moab feels desperate.

🐑 Lambs were Moab's usual tribute
🕊️ Sending one asked for peace
📜 Second Kings records lambs paid yearly
📖 Moab revives that old custom

## From Sela To The Wilderness, Unto The Mount Of The Daughter Of Zion

Sela was a rock city in Edom, likely the region later known as Petra.

The wilderness describes the harsh desert route between Edom and Judah.

Mount Zion refers to Jerusalem, the city where Judah's king ruled.

Moab's messengers are told exactly which road to take.

The destination was never in doubt.

It was Judah's own king.

🏜️ Sela sat in the region of Edom
🧭 The wilderness was the desert route
🏙️ Mount Zion means Jerusalem
📖 Moab is sent straight to Judah's king

## As A Wandering Bird Cast Out Of The Nest

A bird cast out of its nest has nowhere safe to land.

That image pictures homeless refugees with no shelter of their own.

The daughters of Moab means the women and families of Moab.

The fords of Arnon were shallow river crossings at Moab's northern border.

They gather there with nowhere left to go.

🐦 A cast out bird has no home
🏃 The image pictures Moab's refugees
👪 Daughters of Moab means Moab's people
📖 They wait helpless at Arnon's fords

## Make Thy Shadow As The Night In The Midst Of The Noonday

Shadows at noon are normally thin because the sun sits high overhead.

Judah is asked to give shade as deep and dark as nighttime instead.

That is a picture of total, complete protection.

Moab needs cover strong enough to hide refugees in broad daylight.

☀️ Noon shadows are normally thin
🌑 Judah is asked for night level shade
🛡️ The image means total protection
📖 Refugees need cover even in daylight

## Bewray Not Him That Wandereth

Bewray is an old word that means to betray or expose someone.

Judah is asked not to hand fleeing Moabites over to their enemy.

Wandereth simply means one who wanders, here a refugee on the run.

Protecting a stranger's location was a serious moral test.

🗣️ Bewray means to betray
🚫 Judah must not expose the refugees
🚶 Wandereth means one who wanders
📖 Hiding refugees becomes a moral test

## Let Mine Outcasts Dwell With Thee, Moab

These outcasts were refugees fleeing danger, likely from an invading army.

Moab is asked to become a temporary home for people it once fought.

That request flips the expected relationship between these two nations.

The Bible often calls for mercy toward outsiders in danger.

🏠 Outcasts means refugees fleeing danger
🤝 Moab is asked to shelter former rivals
🔄 The request flips their usual relationship
📖 Mercy toward outsiders matters to God

## Be Thou A Covert To Them From The Face Of The Spoiler

Covert is an old word for a hiding place or shelter.

The spoiler refers to the invading enemy causing this crisis.

Judah is asked to give real physical protection, not just kind words.

Real safety, not sympathy alone, is what the outcasts need.

🏚️ Covert means a hiding place
⚔️ The spoiler is the invading enemy
🛡️ Real protection is being requested
📖 Safety matters more than sympathy

## The Extortioner Is At An End, The Spoiler Ceaseth

This line promises the danger will not last forever.

Extortioner and spoiler both describe the same violent enemy.

Naming the threat twice makes the promise of its end feel certain.

Judah is being told the crisis has a coming expiration date.

⏳ The danger will not last forever
⚔️ Extortioner and spoiler name one enemy
🔁 Naming it twice underlines the promise
📖 This crisis has a coming end

## In Mercy Shall The Throne Be Established

This verse shifts from Moab's crisis to a promise about Judah's throne.

Mercy, not force, is named as the true foundation of a lasting kingdom.

That is a direct contrast with the pride driving Moab's own downfall.

A ruler ruling in mercy stands on far steadier ground.

👑 The subject shifts to Judah's throne
❤️ Mercy is the throne's real foundation
⚖️ This contrasts with Moab's pride
📖 Mercy makes a kingdom steady

## He Shall Sit Upon It In Truth In The Tabernacle Of David

The tabernacle of David refers to the ongoing line of David's royal family.

This links directly back to God's promise that David's throne would endure.

Many readers see this line pointing forward to a future king.

Judging in truth means ruling with honesty instead of favoritism.

🏛️ Tabernacle of David means David's dynasty
📜 It echoes God's promise to David
🔮 Many see this pointing to a future king
📖 True judging means ruling without favoritism

# Isaiah 16:6-8
# 🍇 Pride Gives Way To Ruin
---
## We Have Heard Of The Pride Of Moab

Isaiah names pride as Moab's defining trait before describing its fall.

This is not a rumor, since Moab's arrogance was already widely known.

Naming a nation's core flaw before its judgment is a pattern in Isaiah.

Pride sets up exactly what is about to be lost.

👂 Moab's pride was widely known
🎯 Isaiah names it before the fall
🔁 This pattern repeats elsewhere in Isaiah
📖 Pride sets up what is lost

## His Haughtiness, And His Pride, And His Wrath

Isaiah stacks three separate words for the same basic flaw.

Haughtiness means looking down on others as beneath oneself.

Repeating the idea three times makes the arrogance feel total.

This kind of piling on words is a common feature of Hebrew poetry.

📚 Three words describe one flaw
😤 Haughtiness means looking down on others
🔺 Repetition makes the pride feel total
📖 Hebrew poetry often piles up words

## But His Lies Shall Not Be So

Moab boasted about its own strength and security.

This line promises that boasting will prove false.

Moab's confidence was never matched by reality.

The coming disaster exposes every one of those claims.

🗣️ Moab boasted about its strength
❌ That boasting will prove false
🎭 Confidence never matched reality
📖 Disaster exposes every false claim

## Moab Shall Howl For Moab, Every One Shall Howl

Repeating the word Moab inside one sentence stresses total, nationwide grief.

This is not one city mourning but the whole nation together.

Every one shall howl leaves no exception anywhere in the land.

Chapter fifteen already described this same widespread wailing beginning.

🔁 Repeating Moab stresses total grief
🌍 The whole nation mourns together
🚫 No exception is left out
📖 Chapter fifteen already began this wailing

## For The Foundations Of Kirhareseth Shall Ye Mourn

Kirhareseth was likely the same fortress city called Kir in chapter fifteen.

Mourning over its foundations means the destruction reached the very core of the city.

A ruined foundation cannot simply be repaired like a damaged wall.

This detail marks the destruction as total, not partial.

🏰 Kirhareseth was Moab's major fortress
🧱 Its foundations, not just walls, fell
🔨 Foundations cannot be easily repaired
📖 This marks total, not partial ruin

## The Fields Of Heshbon Languish, And The Vine Of Sibmah

Heshbon and Sibmah were both regions in Moab known for farming.

Languish means to grow weak and lifeless, like a dying plant.

Sibmah in particular was famous for producing excellent wine grapes.

Both places represent Moab's food and wealth, not just scenery.

🌾 Heshbon and Sibmah were farmland
🥀 Languish means growing weak and lifeless
🍇 Sibmah was famous for its grapes
📖 These fields meant real food and wealth

## Her Branches Are Stretched Out, They Are Gone Over The Sea

Sibmah's vines were widely prized for their wine.

Their branches spread out far beyond Moab's own borders.

Reaching Jazer and even the sea shows how widely they were traded.

This was not a small, local vineyard operation.

Losing something this famous and valuable makes the ruin sting more.

🍇 Sibmah's vines were widely prized
🗺️ Branches spread far beyond Moab
🚢 Trade reached Jazer and the sea
📖 Losing something famous stings more

# Isaiah 16:9-12
# 😢 Weeping Over Sibmah's Vines
---
## I Will Bewail With The Weeping Of Jazer The Vine Of Sibmah

The speaker here is likely God or Isaiah speaking on God's behalf.

Bewail means to cry out in deep, open grief.

This is not judgment delivered coldly from a distance.

Chapter fifteen already showed this same genuine sorrow over Moab's pain.

🗣️ God or Isaiah speaks this grief
😭 Bewail means crying out in sorrow
❤️ Judgment is not delivered coldly here
📖 Chapter fifteen already showed this sorrow

## I Will Water Thee With My Tears, O Heshbon, And Elealeh

Watering these towns with tears reverses their normal use of water for crops.

Instead of life giving rain, they now receive tears of mourning.

Heshbon and Elealeh were named earlier in chapter fifteen as well.

The grief keeps returning to the same familiar places.

💧 Tears replace the water these towns needed
🔄 Life giving rain becomes mourning instead
🏘️ Heshbon and Elealeh appeared in chapter fifteen
📖 Grief returns to the same places

## The Shouting For Thy Summer Fruits And For Thy Harvest Is Fallen

Harvest time in the ancient world included loud, joyful shouting.

That shout celebrated a good crop and a successful year of work.

This verse says that celebration will simply stop happening.

Silence where there was once celebration marks the depth of the loss.

📢 Harvest shouting was a joyful custom
🎉 It celebrated a good year's crop
🔇 That celebration will simply stop
📖 Silence marks the depth of loss

## In The Vineyards There Shall Be No Singing, Neither Shall There Be Shouting

Singing and shouting both belonged to the normal rhythm of harvest work.

Naming both together shows every kind of joyful noise disappearing.

An ancient vineyard during harvest was usually full of sound.

This verse pictures instead a vineyard gone completely silent.

🎶 Singing and shouting were harvest sounds
🍇 Vineyards were usually loud with joy
🤐 Both kinds of joy disappear here
📖 The vineyard goes completely silent

## The Treaders Shall Tread Out No Wine In Their Presses

Treaders were workers who crushed grapes by stomping them with bare feet.

Wine presses were carved stone or dug out pits built for this purpose.

This was normally hard, sweaty, joyful communal work at harvest time.

Now the presses sit empty and unused.

👣 Treaders crushed grapes with bare feet
🍷 Presses were pits built for crushing
🎊 This work was usually joyful and shared
📖 The presses now sit empty

## I Have Made Their Vintage Shouting To Cease

Vintage refers to the grape harvest and the wine made from it.

God directly claims responsibility for silencing this celebration.

This is not framed as random misfortune striking Moab.

The judgment traces straight back to God's own hand.

🍇 Vintage means the grape harvest
🗣️ God claims responsibility directly here
🎲 This is not random misfortune
📖 The judgment traces to God's hand

## My Bowels Shall Sound Like An Harp For Moab

Ancient writers often located deep emotion in the stomach and gut, not the heart.

Bowels here means the speaker's innermost feelings, not a literal body part.

A harp being played usually produces a low, mournful, trembling tone.

That image pictures grief so deep it feels like it is physically shaking.

🎻 Bowels meant someone's innermost feelings
🫀 Ancient writers located emotion in the gut
🎶 A harp made a low mournful tone
📖 The image pictures grief that shakes

## When It Is Seen That Moab Is Weary On The High Place

The high place was Moab's hilltop shrine for worshiping its own gods.

Isaiah already described Moabites weeping there back in chapter fifteen.

Weary here means exhausted from desperate, repeated prayer and ritual.

Moab keeps returning to the same place looking for help that never comes.

⛰️ High place means Moab's hilltop shrine
😭 Chapter fifteen already showed this weeping
😮‍💨 Weary means worn out from ritual
📖 Moab returns for help that never comes

## He Shall Come To His Sanctuary To Pray, But He Shall Not Prevail

Sanctuary here refers to that same pagan shrine mentioned earlier in this verse.

Prevail means to succeed or get the desired result.

No matter how hard or how often Moab prays there, nothing changes.

False gods simply cannot deliver what Moab is asking for.

🏛️ Sanctuary means that same pagan shrine
🙏 Prevail means to succeed
🚫 Nothing changes no matter how hard Moab prays
📖 False gods cannot deliver what is asked

# Isaiah 16:13-14
# ⏳ Three Years Until The End
---
## This Is The Word That The LORD Hath Spoken Concerning Moab Since That Time

Since that time points back to an earlier prophecy God had already given about Moab.

This tells the reader that verses one through twelve are not brand new material.

Isaiah is restating and confirming a message spoken before now.

Old prophecies about Moab's judgment are being reaffirmed here.

⏮️ Since that time points to an earlier word
📜 Verses one through twelve are not brand new
🔁 Isaiah restates a message given before
📖 This old prophecy is being reaffirmed

## Within Three Years, As The Years Of An Hireling

An hireling was a hired worker paid for a fixed, agreed number of years.

Hired workers counted their contract years exactly, never rounding up or down.

Comparing this prophecy to that timeline means the three years will be precise.

This is not a vague guess about someday.

👷 Hireling means a hired worker
📅 Hired years were counted exactly
🎯 The three year timeline is precise
📖 This is not a vague someday

## The Glory Of Moab Shall Be Contemned, With All That Great Multitude

Contemned means treated with contempt or looked down upon as worthless.

Moab's glory refers to its wealth, army, and national pride.

That great multitude points to Moab's large population and forces.

Even Moab's greatest strengths will not be enough to save it.

😤 Contemned means treated as worthless
👑 Glory means Moab's wealth and pride
👥 Great multitude means its large population
📖 Moab's strengths will not save it

## The Remnant Shall Be Very Small And Feeble

Remnant means the small group left after most of a people is gone.

Feeble means physically weak, without strength to recover quickly.

This closes the prophecy with a picture of near total loss.

Moab's story continues in later chapters, but it never fully recovers.

🌾 Remnant means the small group left
🦴 Feeble means weak without strength
📉 The prophecy closes on near total loss
📖 Moab never fully recovers from this`.trim();

export const ISAIAH_SIXTEEN_PERSONAL_SECTIONS = parseIsaiahSixteenRawNotes(ISAIAH_SIXTEEN_RAW_NOTES);
