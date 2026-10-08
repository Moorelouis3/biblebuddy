export type MatthewFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewFourteenRawNotes(rawText: string): MatthewFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 14:${startVerse}` : `Matthew 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 14 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_FOURTEEN_RAW_NOTES = `# Matthew 14:1-5
# 👑 Herod's Guilty Fear
---
## Herod The Tetrarch Heard Of The Fame Of Jesus

A "tetrarch" is a ruler over only part of a larger territory.

Rome had split Herod the Great's old kingdom among three of his sons.

This Herod, called Antipas, ruled only Galilee and a region east of it.

Jesus already had enough fame to reach even a ruler's own house.

👑 Tetrarch means ruler of one region

🏛️ Rome divided Herod's kingdom among his sons

🗺️ Antipas ruled only Galilee and nearby land

📖 Jesus' fame had reached a ruler's palace

## This Is John The Baptist He Is Risen From The Dead

Herod believed John had come back from the dead as Jesus.

That fear came from real guilt over what he had done to John.

A guilty conscience often invents frightening explanations instead of facing the truth.

Herod could silence John's body but not his own conscience.

😨 Herod feared John had returned

💔 Guilt fueled his strange theory

🧠 A guilty mind invents frightening answers

📖 Killing John could not kill his guilt

## His Brother Philip's Wife

Herodias had been married to Philip, Herod's own brother.

Herod took her from Philip and married her himself.

Jewish law named this exact kind of marriage forbidden.

John would not stay silent just because the offender wore a crown.

💍 Herodias had married Philip first

👑 Herod took his brother's wife

📜 Jewish law forbade this marriage

📖 John spoke even to a king

## It Is Not Lawful For Thee To Have Her

This is John's own confrontation, spoken straight to Herod's face.

Leviticus already named marrying a brother's wife as forbidden.

A prophet's job was never to flatter whoever held power.

John paid for that honesty with his freedom and later his life.

🗣️ John confronted Herod directly

📜 Leviticus already forbade this marriage

⚖️ Prophets answered to God, not kings

📖 Honesty cost John his freedom

## He Feared The Multitude Because They Counted Him As A Prophet

Herod wanted John dead but was afraid of the crowd's reaction.

Most ordinary people already believed John spoke for God.

Killing a man seen as a prophet risked a public uprising.

Herod's fear here was political, not moral.

😨 Herod feared public reaction

🙌 People saw John as a prophet

🔥 Killing him risked an uprising

📖 Herod's fear was political, not conscience

# Matthew 14:6-9
# 💃 A Reckless Promise
---
## When Herod's Birthday Was Kept

Herod threw a grand feast to celebrate his own birthday.

Roman rulers used these feasts to show off wealth and power.

Guests, wine, and entertainment all served that same purpose.

This setting, not a quiet evening, is where the danger began.

🎉 Herod held a grand birthday feast

💰 Rulers used feasts to show power

🍷 Wine and guests filled the hall

📖 Danger grew inside the celebration

## The Daughter Of Herodias Danced Before Them

Ancient writers outside the Bible name this young woman Salome.

A royal daughter dancing for a hall of drinking men was shocking.

Normally only servants or hired entertainers would dance at a feast like this.

Herodias was using her own daughter to work toward a goal.

💃 Salome danced before the guests

😳 A princess dancing was shocking

🎭 Normally servants filled that role

📖 Herodias used her daughter on purpose

## He Promised With An Oath To Give Her Whatsoever She Would Ask

Kings in this culture made public oaths to prove their generosity.

Breaking a public oath meant losing honor in front of every guest.

Herod trapped himself before he even knew what she would ask.

Pride, not love, is what forced his hand next.

🤝 Herod swore a public oath

👀 Breaking it meant public shame

🪤 He trapped himself before asking

📖 Pride, not love, drove his choice

## Give Me Here John Baptist's Head In A Charger

A "charger" is a large serving platter, not a horse.

Herodias had already told her daughter exactly what to request.

She did not ask for riches or land, only John's death.

Her hatred for John had been waiting for this exact opening.

🍽️ Charger means a large platter

🗣️ Herodias fed her the request

💀 She asked for John's death

📖 Old hatred found its opening

## The King Was Sorry Nevertheless For The Oath's Sake

Herod felt real regret the moment he heard the request.

"Meat" here simply means the feast, the shared meal everyone was eating.

He cared more about looking weak in front of his guests than about John's life.

Regret without action changes nothing.

😔 Herod felt genuine regret

🍞 Meat here just means the feast

👥 He feared looking weak before guests

📖 Regret without action saves no one

# Matthew 14:10-12
# ⚰️ The Death Of John The Baptist
---
## He Sent And Beheaded John In The Prison

Herod could have refused even after making the oath.

Instead he sent the order straight to the prison.

John died because of pride, not because the law demanded it.

The prophet who confronted a king was executed for the truth.

⚔️ Herod gave the order

🔓 He still could have refused

👑 Pride killed John, not law

📖 The truth cost John his life

## His Head Was Brought In A Charger And Given To The Damsel

"Damsel" is an old word for a young woman or girl.

A teenage girl carried a severed head across a crowded room.

This detail shows exactly how far hatred had gone that night.

Nothing about this feast remained a normal celebration.

👧 Damsel means a young girl

🩸 She carried John's severed head

💔 Hatred had reached a new low

📖 The feast turned into horror

## His Disciples Came And Buried It And Told Jesus

John's own followers claimed his body and gave him a burial.

Back in chapter eleven, John himself had sent followers to question Jesus.

Those same kind of loyal followers now bring Jesus the worst news.

Grief, not doubt, is what finally brings them to him.

⚰️ Disciples buried John's body

📜 Chapter eleven already showed their loyalty

😢 Grief brought them to Jesus

➡️ Jesus now carries their sorrow too

# Matthew 14:13-14
# 🛶 Jesus Withdraws With Compassion
---
## He Departed Thence By Ship Into A Desert Place Apart

Jesus needed to grieve after hearing how John had died.

A "desert place" means empty, uninhabited land, not necessarily sand.

"Apart" means alone, away from the crowds that normally surrounded him.

Even Jesus needed space to feel real sorrow.

🛶 Jesus left quietly by ship

🏜️ Desert place means empty land

🙏 Apart means alone, away from crowds

📖 Even Jesus needed room to grieve

## The People Followed Him On Foot Out Of The Cities

Word of where Jesus went still reached the crowds somehow.

They walked, on foot, around the shoreline to find him.

Their need for him outweighed any concern for his own grief.

Jesus never got the private moment he had gone looking for.

🚶 Crowds walked to find Jesus

🌊 They traced the shoreline on foot

😔 Their need overruled his privacy

📖 He never got his quiet moment

## He Was Moved With Compassion Toward Them

"Compassion" here is a gut level word, a felt ache inside the body.

Jesus was not simply being polite or doing his duty.

His own grief did not stop him from caring about theirs.

Real compassion keeps giving even while it is hurting.

💗 Compassion means a felt ache inside

🙅 Not polite duty, real feeling

😢 His grief did not block mercy

📖 Compassion keeps giving while hurting

# Matthew 14:15-21
# 🍞 Feeding The Five Thousand
---
## This Is A Desert Place And The Time Is Now Past

The disciples see two real problems, no shops and no daylight left.

Their concern sounds practical, even reasonable, on the surface.

They are thinking only in terms of what they can personally supply.

That is exactly the limit Jesus is about to break.

🏜️ No nearby place to buy food

🌇 Daylight was already running out

🧮 Disciples thought only in human terms

📖 Jesus was about to break that limit

## Send The Multitude Away That They May Buy Themselves Victuals

"Victuals" is an old word simply meaning food or supplies.

The disciples' plan is reasonable, scatter the crowd toward nearby villages.

It also quietly hands the problem back to the crowd itself.

Jesus is about to refuse that easy way out.

🍞 Victuals simply means food

🏘️ Their plan sent people to villages

🙅 It handed the problem back

📖 Jesus refused the easy way out

## They Need Not Depart Give Ye Them To Eat

Jesus turns the entire problem back onto the disciples themselves.

He does not solve it immediately, he first makes them face it.

Faith often grows through being asked to do what feels impossible.

Jesus wanted them to see the gap before he filled it.

🙋 Jesus handed them the problem

🧠 He made them face it first

🌱 Faith grows through impossible asks

📖 He let them see the gap first

## We Have Here But Five Loaves And Two Fishes

Five small loaves and two fish was an ordinary poor man's meal.

Bread like this was usually flat and barley based, cheap to make.

The fish were likely small and dried, preserved for travel.

By any normal math, this could not feed thousands of people.

🍞 Five loaves were a poor meal

🐟 Fish were small and dried

🧮 The math did not add up

📖 Jesus works beyond normal math

## He Commanded The Multitude To Sit Down On The Grass

Jesus organizes the crowd before he ever multiplies anything.

Sitting down on green grass points to a calm, orderly scene.

Psalm twenty three already pictures God making his people lie down in green pastures.

Order comes before the miracle, not after it.

🌾 Jesus organized the crowd first

🧘 Sitting down meant calm order

📜 Psalm twenty three pictures this same image

📖 Order came before the miracle

## Looking Up To Heaven He Blessed And Brake

Jewish meals normally opened with a spoken blessing thanking God.

"Brake" is simply the old word for broke.

Jesus gave thanks for five loaves as if they were already enough.

Gratitude came before the multiplying, not after it.

🙏 Jewish meals opened with blessing

🍞 Brake simply means broke

💫 He thanked God before the miracle

📖 Gratitude came before the increase

## They Did All Eat And Were Filled

Every single person present ate until they were satisfied.

This echoes the manna God once rained down in the wilderness.

God's provision in Exodus was daily bread, this was sudden abundance.

Jesus is shown feeding his people the same way God always has.

🍽️ Everyone ate until full

🌾 This echoes the wilderness manna

📅 Exodus bread was daily, this instant

📖 Jesus provides the way God always has

## Twelve Baskets Full Of Fragments

The leftovers alone filled twelve separate baskets.

Twelve matches the twelve tribes of Israel and the twelve apostles.

Nothing here was wasted even though there was far more than enough.

Abundance and order showed up together in the same miracle.

🧺 Twelve baskets held the leftovers

🔢 Twelve recalls Israel's tribes and apostles

♻️ Nothing was wasted despite abundance

📖 Abundance and order arrived together

## About Five Thousand Men Beside Women And Children

Matthew only counts the men, following the counting custom of that day.

Women and children were present too but were not included in the number.

The real crowd that day was likely well over five thousand people.

This miracle was bigger than the number five thousand alone suggests.

🧮 Matthew counted only the men

👩‍👧 Women and children were also present

📈 The real crowd was likely larger

📖 The miracle outsized the stated number

# Matthew 14:22-23
# ⛰️ Alone On The Mountain
---
## Straightway Jesus Constrained His Disciples To Get Into A Ship

"Straightway" is an old word meaning immediately, without delay.

"Constrained" means Jesus firmly insisted, not a gentle suggestion.

John's own gospel notes the crowd wanted to crown Jesus king that very night.

Jesus moved his disciples out of that danger fast.

⏱️ Straightway means immediately

💪 Constrained means firmly insisted

👑 The crowd wanted to crown him king

📖 Jesus removed his disciples from danger

## He Sent The Multitudes Away

Jesus personally handled dismissing a crowd of thousands.

Letting excitement like this spiral could easily turn political.

A true leader closes out a moment instead of riding its momentum.

Jesus chose a quiet ending over a loud one.

👋 Jesus dismissed the whole crowd

🔥 Excitement like this could turn political

🧭 He closed the moment on purpose

📖 He chose quiet over momentum

## He Went Up Into A Mountain Apart To Pray

After a huge, draining day, Jesus goes looking for solitude.

Mountains in this region often served as natural places of prayer.

This was not his first time retreating alone to pray.

Rest and prayer were not optional for Jesus, they were a pattern.

⛰️ Jesus climbed the mountain alone

🙏 Mountains served as prayer places

🔁 This retreat followed a real pattern

📖 Prayer was never optional for him

# Matthew 14:24-27
# 🌊 Walking On The Water
---
## The Ship Was Tossed With Waves For The Wind Was Contrary

The Sea of Galilee sits low, surrounded by hills on every side.

Cool air can rush down those hills and hit the warm water fast.

That collision creates sudden, violent storms with almost no warning.

"Contrary" simply means the wind was blowing against them.

🌊 Galilee sits low between hills

💨 Cool air rushes down suddenly

⛈️ Storms there form with little warning

📖 Contrary means the wind opposed them

## In The Fourth Watch Of The Night Jesus Went Unto Them

Roman time split the night into four separate watches.

The fourth watch fell somewhere between about three and six in the morning.

That means the disciples had already struggled for hours in the storm.

Jesus let them fight the storm for a long while before he came.

🕓 Nights were split into four watches

🌙 The fourth watch was before dawn

⏳ Disciples struggled for hours already

📖 Jesus let the struggle run its course

## They Were Troubled Saying It Is A Spirit

A man walking on open water looked impossible to the disciples.

Ancient people already feared the sea as a place where spirits lived.

Their first guess was fear, not recognition of their own teacher.

Panic often blinds people to what is standing right in front of them.

😱 Walking on water looked impossible

👻 Ancient people feared spirits at sea

🙈 Fear blocked their recognition of Jesus

📖 Panic can hide what is obvious

## Be Of Good Cheer It Is I Be Not Afraid

Jesus speaks immediately once he realizes they are afraid.

"It is I" echoes the same words God used to name himself in the Old Testament.

Jesus is not just calming nerves, he is naming who he actually is.

His presence itself is the reason fear can leave.

🗣️ Jesus spoke the moment they feared

📜 It is I echoes God's own name

👑 Jesus names who he really is

📖 His presence removes the fear

# Matthew 14:28-33
# 🚶 Peter Steps Out
---
## Bid Me Come Unto Thee On The Water

Peter does not doubt it is Jesus, he wants proof.

He asks for a command, not just permission, before stepping out.

This is bold faith, even if it is mixed with pride.

Peter is the only disciple who asks for this at all.

🙋 Peter asked for a command

💪 His request showed bold faith

⚖️ Faith and pride were mixed together

📖 Only Peter made this request

## And He Said Come

Jesus answers with a single word, no long explanation.

One word was enough invitation for Peter to actually move.

Faith does not always need a full explanation first.

Sometimes obedience simply has to come before full understanding.

🗣️ Jesus answered with one word

🏃 Peter moved on that one word

🌱 Faith does not need every answer

📖 Obedience can come before understanding

## Peter Walked On The Water To Go To Jesus

For a moment, Peter does the very thing he just asked for.

He is the only human in the Bible shown walking on water besides Jesus.

His eyes were fixed on Jesus, not on the waves beneath him.

That focus is exactly what made the impossible step possible.

🚶 Peter actually walked on water

🌊 Only he did this besides Jesus

👀 His focus stayed on Jesus

📖 Focus made the impossible step work

## When He Saw The Wind Boisterous He Was Afraid

"Boisterous" means violently strong, not playful or lighthearted.

Peter takes his eyes off Jesus and looks at the storm instead.

The moment his focus shifts, his fear takes over completely.

Fear grew the instant his attention moved.

💨 Boisterous means violently strong

👀 Peter's focus shifted to the storm

😨 Fear took over immediately

📖 Attention and fear moved together

## Beginning To Sink He Cried Lord Save Me

Peter's prayer here is short, honest, and completely without pretending.

He does not defend himself or explain his doubt first.

He simply asks Jesus for rescue, nothing else.

That short cry is still real faith, just a scared version of it.

🆘 Peter's prayer was short and honest

🙅 He offered no excuses first

🙏 He simply asked for rescue

📖 Scared faith is still real faith

## O Thou Of Little Faith Wherefore Didst Thou Doubt

Jesus rescues Peter before he ever corrects him.

"Little faith" is not the same as "no faith" at all.

Jesus names the doubt honestly without shaming Peter for trying.

The question invites Peter to think, it is not a punishment.

🤲 Jesus rescued Peter first

🌱 Little faith still counts as faith

🗣️ Jesus named doubt without shaming him

📖 The question invited thought, not shame

## Of A Truth Thou Art The Son Of God

The wind stopping instantly is what finally moves the disciples to worship.

This is the clearest, fullest confession of Jesus so far in Matthew.

Earlier chapters showed amazement, this moment names who Jesus actually is.

A storm, a rescue, and a sinking disciple led them to this truth.

🤯 The instant calm amazed them

🙌 This is Matthew's clearest confession yet

📈 Earlier amazement now becomes recognition

📖 A storm led them to this truth

# Matthew 14:34-36
# 🙌 Healing At Gennesaret
---
## They Came Into The Land Of Gennesaret

Gennesaret was a fertile plain along the western shore of Galilee.

Its rich soil made it one of the most populated areas nearby.

Landing there put Jesus within reach of many towns at once.

Geography here quietly explains why word spread so fast.

🗺️ Gennesaret sat on Galilee's shore

🌾 Its soil supported many towns

📍 Many towns sat within easy reach

📖 Geography explains the fast spreading news

## The Men Of That Place Had Knowledge Of Him

People here already knew exactly who Jesus was before he arrived.

News of him had clearly traveled ahead through the whole region.

This was not the first time Jesus had passed through nearby.

A reputation for healing had already taken root in that area.

📰 Jesus' reputation arrived before him

🗣️ News traveled fast through the region

🔁 He had passed through before

📖 A healing reputation had taken root

## Besought Him That They Might Only Touch The Hem Of His Garment

"Besought" is an old word for begging or pleading earnestly.

The "hem" was the fringe, a tassel sewn onto a Jewish prayer garment.

Chapter nine already showed a woman healed by touching this same fringe.

People now expected the same power without needing a word spoken.

🙏 Besought means begged earnestly

🧵 Hem means the garment's fringe

📜 Chapter nine already told this story

➡️ Touch alone now carried that hope

## As Many As Touched Were Made Perfectly Whole

Every single person who touched him was completely healed.

"Whole" means fully restored, not partly improved.

None of them walked away only partly healed.

Jesus closes this exhausting chapter the same way he opened it, with mercy.

🙌 Everyone who touched was healed

💯 Whole means fully restored

🚫 No one was only partly healed

📖 The chapter opens and closes in mercy
`.trim();

export const MATTHEW_FOURTEEN_PERSONAL_SECTIONS = parseMatthewFourteenRawNotes(MATTHEW_FOURTEEN_RAW_NOTES);
