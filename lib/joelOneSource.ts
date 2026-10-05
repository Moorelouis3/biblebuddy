export type JoelOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoelOneRawNotes(rawText: string): JoelOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoelOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joel\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joel 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joel\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Joel\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joel 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joel 1:${startVerse}` : `Joel 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Joel 1 sections, received " + sections.length);
  }

  return sections;
}

const JOEL_ONE_RAW_NOTES = `# Joel 1:1-4
# 📯 The Word That Came To Joel
---
## 📯 The Word Of The LORD That Came

This phrase opens many Old Testament prophetic books in the exact same way.

It marks the message as coming from God, not from Joel's own opinion.

The prophet is simply the messenger here, not the source.

Everything that follows claims to be God's own word, not human commentary.

📯 Opens like many prophetic books

🗣️ Joel speaks for God, not himself

📜 The message claims divine origin

📖 Everything after this is God's word

## Joel The Son Of Pethuel

Pethuel appears nowhere else in the entire Bible.

Nothing else is known about Joel's father beyond this one verse.

The name Joel itself means the LORD is God.

That meaning sets up the whole argument of this book.

Every disaster described here will keep pointing back to that one claim.

❓ Pethuel appears only here

👤 Nothing else is known of him

🏷️ Joel means the LORD is God

📖 That claim drives the whole book

## Hear This, Ye Old Men

Old men are singled out because they have lived the longest.

If anyone could remember a disaster like this, it would be them.

Joel calls on their memory as a kind of witness.

Their answer is about to prove this disaster has no equal.

👴 Old men have the longest memory

🧓 They are called as witnesses

📏 Their memory becomes the measuring stick

📖 Even they have never seen this

## Or Even In The Days Of Your Fathers

This question is not really asking for information.

Joel already knows the answer is no.

Nothing in living memory or inherited memory compares to what is coming.

The disaster is about to break every existing record.

❓ The question already has its answer

🚫 Nothing compares in living memory

📈 This disaster breaks every record

📖 Joel is naming something unprecedented

## Tell Ye Your Children Of It

Ancient Israel had no printing press or daily newspaper.

Important events survived by being spoken from parent to child.

Joel orders this disaster to be remembered the same way the exodus was remembered.

Three generations are named on purpose, grandparent, parent, and child.

That spread guarantees the story outlives everyone alive right now.

🗣️ Stories survived by being spoken aloud

👪 Three generations are named on purpose

⏳ The memory outlives everyone alive now

📖 This disaster gets treated like the exodus

## That Which The Palmerworm Hath Left Hath The Locust Eaten

These four insect names most likely describe one locust in different stages of growth.

Palmerworm, locust, cankerworm, and caterpiller all name the same destroyer at a different age.

A young insect eats low plants first.

A flying swarm then strips whole fields bare.

Whatever one stage leaves behind becomes food for the next.

🐛 Four names may mean one locust

🦗 Each name marks a different stage

🍃 Each stage finishes what the last missed

📖 Nothing is left standing afterward

## That Which The Cankerworm Hath Left Hath The Caterpiller Eaten

This sentence names three losses back to back on purpose.

Nothing that survives one wave of damage survives the next wave.

The repeated structure itself becomes the real message here.

Nothing green is left anywhere by the verse's end.

🔁 Three losses are named back to back

🌪️ Nothing survives wave after wave

📢 The repeated structure is the message

📖 Nothing green survives by the end

# Joel 1:5-7
# 🍷 The Vine And The Fig Tree Stripped Bare
---
## Awake, Ye Drunkards, And Weep

This is not only a moral rebuke of drunkenness.

Those who drink wine are the first to feel this disaster.

Their daily comfort disappears before anyone else even notices.

Joel starts with the group that will complain loudest first.

🍷 Not only a moral rebuke here

😢 Wine drinkers feel the loss first

📉 Comfort disappears before others notice

📖 Joel starts with the loudest complainers

## It Is Cut Off From Your Mouth

New wine means fresh grape juice before it finished fermenting.

It was a common, everyday drink, not a luxury item.

Something this ordinary disappearing shows how deep the shortage runs.

When even the basics vanish, nobody can call this a small problem.

🍇 New wine meant fresh grape juice

🏠 It was an everyday household drink

📉 Even basics have disappeared completely

📖 This shortage reaches every single home

## For A Nation Is Come Up Upon My Land

Nation here is not a human army invading the land.

Joel is describing the locust swarm in the language of a foreign army.

It arrives with no treaty, no warning, and no mercy.

Calling it a nation makes the threat feel as real as any war.

🦗 Nation describes the locust swarm here

⚔️ The language borrows from warfare

🚫 It arrives with no warning given

📖 The threat feels as real as war

## He Hath The Cheek Teeth Of A Great Lion

Cheek teeth means molars, the teeth used for grinding food completely.

A lion's molars crush bone, not just tear at soft flesh.

The image pictures total, grinding destruction, not a quick nibble.

Whatever this nation touches gets fully consumed, not merely damaged.

🦁 Cheek teeth means grinding molars

🦴 Lions crush bone, not just flesh

🌪️ The image pictures total destruction

📖 Nothing touched escapes fully consumed

## He Hath Laid My Vine Waste, And Barked My Fig Tree

The vine and the fig tree were Israel's own symbols of peace and plenty.

Owning both meant a family had enough land and enough safety to enjoy it.

Barked means the bark itself was stripped completely away.

Losing both trees at once erases the very picture of a secure life.

🍇 Vine and fig meant peace and plenty

🏡 Owning both meant a secure life

🌳 Barked means the bark was stripped

📖 This erases the picture of safety

## The Branches Thereof Are Made White

Once bark is stripped away, the bare wood underneath turns pale and white.

This is not a gentle wilting that could still recover with rain.

A white, barked branch is already dead and will not heal.

The whiteness itself is visible proof the damage is permanent.

🤍 White wood appears once bark is gone

💀 A barked branch is already dead

🌧️ Rain alone cannot reverse this

📖 The whiteness proves permanent damage

# Joel 1:8-10
# 👰 Mourning Like A Bride Who Never Married
---
## Lament Like A Virgin Girded With Sackcloth For The Husband Of Her Youth

In this culture, a betrothal was already treated as legally binding.

A girded virgin here is a woman promised in marriage, not yet a wife.

Losing a betrothed husband counted as real widowhood, even without a wedding.

Joel picks the rawest kind of grief available to describe this loss.

💍 Betrothal was already legally binding

👰 She was promised, not yet married

😢 Losing him counted as real widowhood

📖 Joel picks the rawest grief available

## The Meat Offering And The Drink Offering Is Cut Off

These offerings required grain and wine brought from the harvest.

With the harvest gone, there is nothing left to bring to the temple.

Worship itself has been interrupted, not just daily meals.

A ruined field now reaches all the way into the house of God.

🌾 Offerings needed grain and wine

🏛️ The harvest no longer exists

🙏 Worship itself has been interrupted

📖 The field's ruin reaches God's house

## The Priests, The LORD's Ministers, Mourn

Priests spent their whole career managing these daily offerings.

Now their most basic task has nothing left to work with.

Calling them the LORD's ministers stresses whose service they lost.

Even the people trained to serve God are left standing with empty hands.

👔 Priests managed offerings as their job

🤲 Now they have nothing to offer

🏷️ Their title stresses whose service this is

📖 Even trained servants stand empty handed

## The Field Is Wasted, The Land Mourneth

The land itself is described here as if it can grieve.

This is not just a poetic decoration added for effect.

Older parts of scripture repeatedly described creation as spiritually linked to Israel.

When the people suffer, the ground they live on is pictured suffering too.

🌍 The land is pictured as grieving

🔗 Creation is linked to Israel's fate

🤝 People and land suffer together here

📖 Even the ground feels this loss

## The New Wine Is Dried Up, The Oil Languisheth

Grain, wine, and oil together were the three basic blessings named throughout the Old Testament.

Losing even one of them was already considered a serious judgment.

Here all three disappear together in the very same verse.

This verse does not describe a shortage.

It describes total collapse instead.

🌾 Grain, wine, and oil formed one trio

⚠️ Losing even one was serious judgment

💥 All three disappear in one verse

📖 This describes total collapse, not shortage

# Joel 1:11-12
# 🌾 Farmers Ashamed And Trees Withered
---
## Be Ye Ashamed, O Ye Husbandmen

Husbandmen simply means farmers who work the grain fields.

Ashamed here means disappointed and humiliated by a failed harvest.

This is not shame over wrongdoing.

It is grief over empty hands.

A farmer's whole year of labor has produced nothing to show for it.

🌾 Husbandmen means grain farmers

😞 Ashamed means disappointed, not guilty

🤲 A whole year's labor shows nothing

📖 Empty hands replace an empty harvest

## Howl, O Ye Vinedressers, For The Wheat And For The Barley

Vinedressers means workers who tend grapevines all year long.

Wheat and barley were the two basic grains that fed the whole nation.

Even workers who do not farm grain are told to howl over it.

When grain fails, every trade in the economy feels the loss together.

🍇 Vinedressers tended grapevines, not grain

🌾 Wheat and barley fed the nation

🤝 Every trade feels this loss together

📖 One failed harvest touches the whole economy

## The Vine Is Dried Up, And The Fig Tree Languisheth

This repeats the same vine and fig tree named back in verse seven.

Joel is not introducing new damage.

He is confirming the damage already named.

Repetition here works like a refrain in a funeral song.

🔁 This echoes verse seven directly

✅ Joel confirms damage, not new loss

🎵 Repetition works like a funeral refrain

📖 The reader feels how total this is

## Joy Is Withered Away From The Sons Of Men

Harvest time in ancient Israel was also a season of festivals and celebration.

With no harvest, there is no festival left to celebrate.

Joel connects the condition of trees directly to human emotion.

When the land withers, human joy withers right alongside it.

🎉 Harvest time meant festivals and joy

🚫 No harvest means no festival now

🌳 Trees and human joy are linked

📖 Human joy withers with the land

# Joel 1:13-14
# 🪔 Gird Yourselves And Call A Fast
---
## Gird Yourselves, And Lament, Ye Priests

Gird here means to physically put on and tie on sackcloth.

Sackcloth was a rough, uncomfortable fabric worn only during deep mourning.

Priests normally wore fine garments set apart for temple service.

Trading those garments for sackcloth shows how serious this moment is.

🪢 Gird means to put on sackcloth

🧵 Sackcloth was rough mourning clothing

👔 Priests normally wore fine garments

📖 Trading garments shows real seriousness

## Lie All Night In Sackcloth, Ye Ministers Of My God

This is not a short ritual lasting only a few minutes.

The priests are told to stay in mourning clothes through the entire night.

Round the clock grief matches the size of the disaster.

A quick prayer would not have matched what this moment required.

🌙 Mourning continues through the whole night

⏳ Round the clock grief, not a moment

🧵 Clothing matches the size of disaster

📖 A quick prayer would not be enough

## Sanctify Ye A Fast, Call A Solemn Assembly

Sanctify means to formally set something apart as holy.

This fast is not a private decision.

It is an official, public act.

A solemn assembly was a specific, formally called national gathering for worship.

Both actions turn personal grief into something the whole nation does together.

📯 Sanctify means to set apart as holy

📢 This fast is an official public act

🏛️ A solemn assembly was a formal gathering

📖 Personal grief becomes a national act

## Gather The Elders And All The Inhabitants Of The Land

Elders were the respected leaders who already guided local decisions.

Calling them specifically means this crisis needs real leadership, not only crowds.

Everyone, leaders and ordinary people together, is told to gather in one place.

The chapter ends this section with one unified cry, not many separate prayers.

👴 Elders were respected local leaders

🤝 Leadership and ordinary people gather together

📍 Everyone meets in one single place

📖 One unified cry replaces many prayers

# Joel 1:15-18
# ⚠️ The Day Of The LORD Is At Hand
---
## Alas For The Day

Alas is a real cry of grief, not a casual comment.

Joel reacts to this coming day the way someone reacts to terrible news.

His own emotional response models how the reader should feel too.

This is not distant theology.

It is something to actually feel.

😭 Alas is a real cry of grief

🎭 Joel models the right emotional response

📚 This is not distant theology

📖 It is something to actually feel

## The Day Of The LORD Is At Hand

The day of the LORD is a major phrase used across many prophetic books.

It names a moment when God acts directly instead of staying in the background.

It can mean judgment, deliverance, or both at the very same time.

Joel will return to this exact phrase again later in this book.

📅 A major phrase across many prophets

⚡ God acts directly, not quietly

⚖️ It can mean judgment or deliverance

📖 Joel returns to this phrase later

## As A Destruction From The Almighty Shall It Come

Almighty translates an ancient Hebrew name for God, Shaddai.

The name itself emphasizes overwhelming, unmatched power.

This destruction is not blamed on bad luck or natural accident.

Joel names God himself as the one bringing this day.

🏔️ Almighty translates the name Shaddai

💪 The name stresses overwhelming power

🚫 This is not blamed on luck

📖 God himself brings this day

## Joy And Gladness From The House Of Our God

Joy and gladness are two separate Hebrew words placed side by side on purpose.

Pairing them doubles the weight of what has been lost.

The temple itself was normally a center of celebration, not sorrow.

Even the house built for worship has nothing left to celebrate.

🎊 Joy and gladness are two words

➕ Pairing them doubles the loss

🏛️ The temple was once a joyful place

📖 Even God's house has nothing to celebrate

## The Seed Is Rotten Under Their Clods

Clods are the small clumps of dirt that cover freshly planted seed.

Seed is supposed to break out of those clods and sprout upward.

Instead, the seed is rotting underground before it ever gets the chance.

The harvest is failing before it even has a chance to begin.

🌱 Clods are dirt clumps over seed

🚫 Seed should sprout, not rot

⬇️ It is failing underground, unseen

📖 The harvest fails before it begins

## The Garners Are Laid Desolate, The Barns Are Broken Down

Garners were storage buildings built specifically to hold harvested grain.

A full garner meant security for an entire household through the coming year.

These garners now sit completely empty, with nothing left to store.

Broken barns on top of empty garners show total agricultural collapse.

🏚️ Garners stored the harvested grain

🏡 A full garner meant real security

📦 They now sit completely empty

📖 Empty garners show total collapse

## How Do The Beasts Groan

This disaster is no longer only a human problem.

Even the animals are described groaning from real distress.

Perplexed describes cattle that are confused and bewildered, not just hungry.

Creation itself is suffering alongside the people who live on it.

🐄 This is no longer only human

😣 Even cattle groan from distress

🤔 Perplexed means confused, not just hungry

📖 Creation suffers alongside its people

# Joel 1:19-20
# 🔥 Even The Beasts Cry Out To God
---
## O LORD, To Thee Will I Cry

Up to this point Joel has been speaking about the nation.

Here the prophet suddenly switches to his own first person voice.

Joel is modeling the exact response he has been calling for.

He does not just command prayer.

He prays it himself first.

👤 Joel switches to his own voice

🗣️ He models the response himself

🙏 He does not only command prayer

📖 He prays it before anyone else

## The Beasts Of The Field Cry Also Unto Thee

The word also links the animals directly to Joel's own cry in the verse before.

Animals are pictured depending on God just as much as people do.

Dried up rivers and burned pastures threaten every living creature together.

The whole created order is shown groaning toward God at once.

🔗 Also links animals to Joel's cry

🐑 Animals depend on God too

🌊 Dried rivers threaten every creature

📖 All creation groans toward God together
`.trim();

export const JOEL_ONE_PERSONAL_SECTIONS = parseJoelOneRawNotes(JOEL_ONE_RAW_NOTES);
