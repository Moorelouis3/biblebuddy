export type LeviticusTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyFiveRawNotes(rawText: string): LeviticusTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 25:${startVerse}` : `Leviticus 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Leviticus 25 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_FIVE_RAW_NOTES = `# Leviticus 25:1-7
# 🌱 The Land Gets A Sabbath
---
## In Mount Sinai

This law arrives from an unusual place.

Most of Leviticus records God speaking from the tabernacle, not the mountain.

Here Moses receives the command at Mount Sinai itself, before Israel ever leaves it.

That placement ties this law directly to the covenant given at Sinai.

It is not an ordinary tabernacle rule.

It stands alongside the Ten Commandments as core covenant law.

⛰️ Given directly at Mount Sinai
🕍 Most laws come from the tabernacle instead
📜 This ties the law to the Sinai covenant
📖 It stands with the Ten Commandments

## When Ye Come Into The Land Which I Give You

This command does not apply yet.

Israel is still camped at Sinai, decades before entering Canaan.

God is planning ahead for a land Israel does not yet possess.

The sabbatical year could only start once families were settled on their own ground.

Obedience here required patience and faith long before the law ever applied.

🗺️ Israel has not entered Canaan yet
⏳ God plans decades ahead of time
🌾 The law waits for settled land
📖 Faith often waits on a future promise

## Then Shall The Land Keep A Sabbath Unto The LORD

The word sabbath usually describes a day of rest for people.

Here it applies to the ground itself.

Just as the seventh day belongs to God, the seventh year of farming belongs to Him too.

The land itself gets treated like a living member of the covenant.

Even the soil needed a turn to stop and be still.

🛌 Sabbath usually means rest for people
🌍 Here the rest belongs to the land
🔗 It echoes the seventh day of the week
📖 Even the ground shared in the covenant

## Six Years Thou Shalt Sow Thy Field, And Six Years Thou Shalt Prune Thy Vineyard

Sowing means planting seed for grain crops.

Pruning means cutting back vines so they grow better fruit.

These two jobs cover the two main kinds of farming in ancient Israel, grain fields and vineyards.

Six straight years of normal work sets up the contrast that follows.

The rhythm mattered as much as the rest itself.

🌾 Sowing means planting grain
🍇 Pruning means trimming vines for fruit
📊 These cover Israel's two main crops
📖 Six years of work sets up the rest

## In The Seventh Year Shall Be A Sabbath Of Rest Unto The Land

This is the sabbatical year, sometimes called the shemitah.

Every seventh year, normal farming simply stopped.

No plowing, no planting, no pruning across the entire land at once.

It was not one farmer resting on his own schedule.

The whole nation kept the same year together.

📅 Called the sabbatical year, or shemitah
🛑 Farming across Israel stopped completely
🤝 Everyone kept the same year at once
📖 Rest here was a shared national act

## Thou Shalt Neither Sow Thy Field, Nor Prune Thy Vineyard

This repeats verse three's two jobs in the negative.

Neither task was allowed during the seventh year.

The repetition makes the command impossible to misunderstand.

Farmers had to trust that stopping would not cause them to starve.

🚫 Both farming jobs were forbidden
🔁 Repeats verse three in reverse
❓ Trust replaced a farmer's usual control
📖 Obedience meant giving up certainty

## That Which Groweth Of Its Own Accord Of Thy Harvest Thou Shalt Not Reap

Some grain always sprouts on its own from scattered seed, even without planting.

Normally a farmer would harvest that volunteer growth like any other crop.

During the sabbatical year, even that easy harvest was off limits.

The point was rest, not simply avoiding hard labor.

🌱 Volunteer grain grows without planting
🚜 Normally farmers would still harvest it
🛑 Even easy harvesting was forbidden
📖 The goal was real rest, not less work

## Neither Gather The Grapes Of Thy Vine Undressed

Undressed means a vine that has not been pruned or cared for that year.

Grapes still grew on an undressed vine, just less than usual.

The law forbids gathering those grapes for storage or sale.

Anyone could eat straight from the vine, but no one could farm it as a business.

✂️ Undressed means a vine left untended
🍇 Grapes still grew, just fewer
🚫 Gathering for storage or sale was banned
📖 Eating was allowed, farming was not

## For It Is A Year Of Rest Unto The Land

This closing line explains the reason behind every rule so far.

The land itself needed the same kind of rest people needed each week.

Treating the ground this seriously was unusual in the ancient world.

Most nearby cultures farmed their land every single year without exception.

🌍 The land needed real rest too
🌐 Most ancient nations farmed every year
🕊️ Israel's God cared about the ground itself
📖 This explains every rule before it

## The Sabbath Of The Land Shall Be Meat For You

Meat here is an old word for food in general, not just animal flesh.

Whatever grew wild that year belonged to everyone equally.

Servants, hired workers, and even foreigners living nearby could eat freely from the same fields.

No one owned the harvest during this year, not even the landowner.

🍞 Meat here means food, not flesh
🤝 Everyone shared the same fields
👥 Servants and strangers ate freely too
📖 No one owned the harvest that year

## And For Thy Cattle, And For The Beast That Are In Thy Land

The sharing did not stop with people.

Domestic animals and even wild animals could eat from the same untended fields.

This detail shows how completely farmers had to let go of control.

For one full year, the land belonged to God alone, and every creature on it shared the food.

🐑 Domestic animals could eat too
🦌 Even wild animals shared the fields
🙌 Farmers gave up total control
📖 The land belonged to God alone that year

# Leviticus 25:8-12
# 📯 The Year Of Jubile
---
## Thou Shalt Number Seven Sabbaths Of Years

A sabbath of years means one full seven year cycle, the pattern just described.

This verse asks Israel to count seven of those cycles in a row.

Counting years in groups of seven had already shaped the sabbatical year.

Now that same rhythm expands to a much longer cycle.

🔢 A sabbath of years means seven years
📆 This counts seven of those cycles
🔁 The same rhythm, now much longer
📖 Israel had to track time carefully

## Forty And Nine Years

Seven groups of seven years equal forty nine years total.

This is one of the few places the Bible shows its own math openly.

Forty nine years was about two full lifetimes in the ancient world.

Very few people would experience more than one jubile in their lifetime.

🔢 Seven sevens equal forty nine years
🧮 The Bible shows its math here
⏳ About two lifetimes in that era
📖 Most people saw only one jubile

## Cause The Trumpet Of The Jubile To Sound

Jubile comes from a Hebrew word for a ram's horn trumpet, the yobel.

Sounding a trumpet was how Israel announced major public events.

This blast announced something no other year had, a nationwide reset.

The sound itself became the name for the whole fiftieth year.

🐏 Jubile comes from a ram's horn trumpet
📯 A trumpet announced major events
🎉 This announced a nationwide reset
📖 The sound gave the year its name

## On The Tenth Day Of The Seventh Month, In The Day Of Atonement

The tenth day of the seventh month is the Day of Atonement, described back in chapter sixteen.

That was the one day each year the high priest entered the Most Holy Place.

Starting the jubile on that exact day was not an accident.

National freedom began on the same day national sin was covered.

📅 This date is the Day of Atonement
🙏 Chapter sixteen already explained that day
🚪 The one day the high priest entered
📖 Freedom began the same day sin was covered

## Ye Shall Hallow The Fiftieth Year

To hallow means to set something apart as holy.

The fiftieth year itself became sacred, not just the trumpet blast that opened it.

No other single year in Israel's calendar received this treatment.

An entire year could carry the same weight as a holy day.

✨ Hallow means set apart as holy
📆 The whole fiftieth year became sacred
🆕 No other year got this treatment
📖 A year could carry holy weight

## Proclaim Liberty Throughout All The Land Unto All The Inhabitants Thereof

Liberty here means release, especially release from debt and servitude.

This proclamation reached every single person living in the land, not just Israelites by birth.

This exact phrase later appears on the Liberty Bell in the United States.

Its origin is this one verse in Leviticus.

🔔 Liberty means release from debt and servitude
🌍 This reached everyone in the land
🇺🇸 Later inscribed on the Liberty Bell
📖 Freedom here traces back to this verse

## Ye Shall Return Every Man Unto His Possession

Possession here means the specific plot of family land assigned back in Joshua's day.

Over fifty years, families could lose their land through debt or hardship.

The jubile reversed all of that in a single year.

Every family line returned to the ground originally given to their ancestors.

🗺️ Possession means the family's assigned land
📉 Debt could cost a family its land
🔄 Jubile reversed all of that loss
📖 Land returned to its original family

## Ye Shall Return Every Man Unto His Family

This second return is about people, not property.

Anyone sold into servitude to pay off debt went home.

Families scattered by fifty years of hardship reunited on the same day.

No debt could permanently break up an Israelite family.

👪 This return is about people
⛓️ Servants sold for debt went home
🔗 Scattered families reunited together
📖 Debt could never permanently break a family

## A Jubile Shall That Fiftieth Year Be Unto You

This line restates the fiftieth year's name for emphasis.

Jubile was not simply another sabbatical year like the ones every seventh year.

It combined debt release, land return, and family reunion all at once.

Nothing else in Israel's calendar carried that much reversal in a single year.

📯 Restates the year's name for emphasis
🆚 Bigger than an ordinary sabbatical year
🔄 Debt release, land, and family together
📖 One year carried total reversal

## It Shall Be Holy Unto You: Ye Shall Eat The Increase Thereof Out Of The Field

Like the sabbatical year, the jubile year also stopped normal farming.

Families ate whatever grew wild, straight from the field.

Two rest years back to back meant Israel needed real trust in God's provision.

The forty ninth and fiftieth years likely ran together as one long stretch of rest.

🌾 Farming stopped again, like the sabbatical year
🍽️ Families ate whatever grew wild
🙏 Two rest years required real trust
📖 Provision, not farming, carried them through

# Leviticus 25:13-17
# ⚖️ Buying And Selling By The Jubile
---
## In The Year Of This Jubile Ye Shall Return Every Man Unto His Possession

This line repeats verse ten almost word for word.

The repetition is deliberate, not careless writing.

Everything that follows about buying and selling only makes sense next to this guarantee.

No sale of land in Israel was ever truly permanent.

🔁 Repeats verse ten on purpose
📜 It anchors the rules that follow
🚫 No land sale was ever permanent
📖 The jubile guarantee shapes everything else here

## If Thou Sell Ought Unto Thy Neighbour, Or Buyest Ought Of Thy Neighbour's Hand

Ought here is an old word simply meaning anything.

This law covers every land transaction between Israelites, buying and selling both.

Because land always returned at the jubile, no sale was final.

What Israel called selling land, a modern reader might call leasing it.

📦 Ought is an old word for anything
🤝 This covers both buying and selling
🔁 No land sale was ever final
📖 It worked more like a lease

## Ye Shall Not Oppress One Another

Oppress means to take unfair advantage of someone's weaker position.

This warning sits right in the middle of a law about pricing land.

It is easy to exploit someone who is desperate to sell.

God's law steps in before that exploitation can even start.

⚠️ Oppress means unfair advantage over someone
💰 Placed right inside a pricing law
😟 Desperate sellers are easy to exploit
📖 The law blocks exploitation in advance

## According To The Number Of Years After The Jubile Thou Shalt Buy

Land was never priced by the ground itself.

It was priced by how many harvests remained until the next jubile.

Buying land close to a jubile meant paying for very few harvests.

The land itself never truly changed hands at all.

🌾 Land was priced by harvests, not acreage
📆 Fewer years left meant a lower price
🔄 Every sale pointed toward the jubile
📖 The land itself never truly changed owners

## According To The Multitude Of Years Thou Shalt Increase The Price Thereof

Multitude here simply means a large number.

More years remaining until the jubile meant more harvests for the buyer.

More harvests meant a fair price was higher, not lower.

The math protected the seller from being underpaid.

🔢 Multitude means a large number
🌾 More years meant more harvests ahead
💰 More harvests meant a higher price
📖 This protected the seller from being cheated

## According To The Fewness Of Years Thou Shalt Diminish The Price Of It

Fewness is the opposite of multitude, a small number of years.

Diminish means to lower or reduce.

Fewer years before the jubile meant fewer harvests for the buyer to collect.

The price dropped to match exactly what the buyer was actually getting.

📉 Fewness means a small number
🔽 Diminish means to lower
🌾 Fewer harvests meant a lower price
📖 The price matched what was actually sold

## For According To The Number Of The Years Of The Fruits Doth He Sell Unto Thee

This closing line restates the whole principle one more time.

A buyer was never purchasing land itself in Israel.

A buyer was purchasing a set number of harvests, nothing more.

That distinction kept every land sale honest on both sides.

🔁 Restates the whole pricing principle
🌾 Buyers purchased harvests, not land
⚖️ This kept every sale honest
📖 Both buyer and seller were protected

## Ye Shall Not Therefore Oppress One Another, But Thou Shalt Fear Thy God

This repeats verse fourteen's warning, now with a reason attached.

Fearing God means taking His authority seriously enough to obey even when unseen.

No court could catch every unfair land deal in a small village.

God's own watching eye was the real enforcement behind this law.

🔁 Repeats the warning from verse fourteen
🙏 Fearing God means taking Him seriously
👁️ No court could catch every bad deal
📖 God's own watching eye enforced this law

# Leviticus 25:18-22
# 🌾 Trusting God For The Sixth Year
---
## Ye Shall Do My Statutes, And Keep My Judgments, And Do Them

Statutes and judgments together cover the whole range of God's law, not just this one chapter.

Doing them meant actual obedience, not just agreement in principle.

This verse works as a hinge between the land laws and what comes next.

Obedience was always the condition attached to the promise that follows.

📜 Statutes and judgments cover the whole law
✅ Doing them meant real obedience
🔗 This verse connects two big sections
📖 A promise always followed obedience

## Ye Shall Dwell In The Land In Safety

Safety here does not only mean protection from enemy attack.

It also means security from hunger and want.

A people who obeyed these hard land laws could trust God for daily bread.

Obedience and provision were tied directly together in this promise.

🛡️ Safety means more than military protection
🍞 It includes security from hunger too
🙏 Obedience connected directly to provision
📖 This promise covered daily life, not just war

## The Land Shall Yield Her Fruit, And Ye Shall Eat Your Fill

Yield means to produce or give up its harvest.

Eating to the fill means having plenty, not just barely enough.

This promise directly answers the fear a farmer would feel giving up a whole year of work.

God promises abundance, not just survival, for those who trust Him with the land.

🌾 Yield means to produce a harvest
🍽️ Eating your fill means real abundance
😨 It answers a farmer's natural fear
📖 God promised plenty, not just survival

## What Shall We Eat The Seventh Year

This is the exact question any honest farmer would ask.

The law does not pretend the sabbatical year was easy to trust.

God addresses the fear directly instead of ignoring it.

Scripture often gives voice to doubt before answering it.

❓ The honest question every farmer would ask
😟 The law admits this was hard to trust
🗣️ God answers the fear directly
📖 Scripture often voices doubt before answering it

## I Will Command My Blessing Upon You In The Sixth Year

The sixth year is the last normal farming year before the sabbatical rest.

God promises a blessing specifically timed to that sixth year's harvest.

This is not a vague promise of general goodness.

It is a specific, timed answer to a specific, timed problem.

📆 The sixth year comes right before the rest
🌾 God times a blessing to that harvest
🎯 A specific answer to a specific fear
📖 God's promises often match the exact need

## And It Shall Bring Forth Fruit For Three Years

One sixth year harvest had to somehow cover three years of eating.

That covers the sixth year itself, the seventh year of rest, and the eighth year of new planting.

This kind of surplus was not normal farming, it was a direct miracle.

God's provision here goes well beyond ordinary harvest math.

🔢 One harvest had to cover three years
📆 It spanned the sixth, seventh, and eighth years
✨ This surplus was not normal farming
📖 It required a direct miracle from God

## Ye Shall Sow The Eighth Year, And Eat Yet Of Old Fruit

Farming started again in the eighth year, right after the sabbatical rest ended.

New crops from that planting would not be ready to harvest for months.

Families lived on the old surplus from the sixth year the entire time.

The timing gap itself became proof that God's earlier promise had come true.

🌱 Farming resumed in the eighth year
⏳ New crops took months to be ready
🍞 Old surplus fed them in the meantime
📖 The gap itself proved the promise true

## Until Her Fruits Come In Ye Shall Eat Of The Old Store

Old store means grain saved up from an earlier harvest.

This closing line completes the timeline God laid out.

The surplus lasted exactly as long as it needed to, not one day less.

God's math, not the farmer's math, made the whole system work.

🏚️ Old store means saved up grain
📆 It completes God's full timeline
⏱️ The surplus lasted exactly long enough
📖 God's math made the whole system work

# Leviticus 25:23-28
# 🏡 The Land Belongs To God
---
## The Land Shall Not Be Sold For Ever

For ever means permanently, with no possibility of return.

Every land sale in Israel already had a built in expiration date, the next jubile.

This verse states the reason behind that limit directly.

Permanent ownership by any human family was never allowed in the first place.

⏳ For ever means with no return
📆 Every sale already had an expiration date
🚫 Permanent human ownership was never allowed
📖 This verse states the reason plainly

## For The Land Is Mine

This is the single sentence that explains every land law in this chapter.

Israel never actually owned the ground beneath their feet.

God owned it, and Israel held it as tenants, not landlords.

Every jubile, every pricing rule, every redemption right flows from this one claim.

🔑 The verse that explains the whole chapter
🌍 God owned the land, not Israel
🏠 Israel held it as tenants, not landlords
📖 Every land rule flows from this claim

## For Ye Are Strangers And Sojourners With Me

Strangers and sojourners are words for people living somewhere that is not their permanent home.

Israel is called this in relation to God, not in relation to Canaan.

Even in their own promised land, Israel remained guests of God Himself.

That identity kept the whole nation from treating the land as their own permanent property.

🧳 Strangers and sojourners means temporary guests
🙏 Israel were guests in relation to God
🏡 True even inside their own promised land
📖 This kept the land from becoming their own

## And In All The Land Of Your Possession Ye Shall Grant A Redemption For The Land

Redemption means buying something back, restoring it to its original owner.

This verse makes redemption a right, not just a kind gesture.

Every plot of land in Israel had to allow for this possibility.

The whole system was built around the idea that loss could always be reversed.

🔄 Redemption means buying something back
✅ This made redemption a legal right
🗺️ It applied to every plot of land
📖 Loss could always be reversed

## If Thy Brother Be Waxen Poor, And Hath Sold Away Some Of His Possession

Waxen poor is an old way of saying someone has grown poor over time.

This describes a slow slide into poverty, not a single sudden disaster.

Selling land was usually a last resort, not a first choice.

The law assumes real hardship stands behind most land sales.

📉 Waxen poor means grown poor over time
🐢 This describes a slow slide, not a shock
🏚️ Selling land was usually a last resort
📖 The law assumes real hardship behind it

## If Any Of His Kin Come To Redeem It

Kin means close relatives, especially within the extended family line.

A relative could step in and buy the land back on the original owner's behalf.

This role later gets a specific name, the kinsman redeemer, most famously in the book of Ruth.

Family loyalty here had real legal teeth, not just good feelings.

👪 Kin means close relatives
💰 A relative could buy the land back
🤝 Family loyalty carried real legal weight
📖 Ruth later shows this same role in action

## If The Man Have None To Redeem It, And Himself Be Able To Redeem It

Sometimes no relative was available or willing to help.

In that case, the original owner could still redeem his own land.

This required him to have saved or earned enough money to buy it back himself.

The law left more than one door open toward getting the land back.

🚪 A second path when no relative helps
💪 The owner could redeem it himself
💰 This required enough saved money
📖 More than one door led back home

## Then Let Him Count The Years Of The Sale Thereof, And Restore The Overplus

Overplus is an old word for the leftover amount, the extra.

The buyer had already paid for a set number of harvests up front.

If the owner redeemed the land early, he only owed for the years already used.

The buyer had to hand back whatever payment covered the unused years.

💰 Overplus means the leftover extra amount
🌾 Buyers had paid for future harvests
🔢 Early redemption meant paying only for years used
📖 Fairness ran in both directions here

## That He May Return Unto His Possession

This is the goal behind every redemption rule in this section.

Money and calculation were never the real point of these laws.

The real point was always getting a family back onto its own land.

Every formula in this chapter serves that one human purpose.

🎯 The real goal behind every redemption rule
💵 Money was never the actual point
🏡 The point was a family's own land
📖 Every formula serves this one purpose

## It Shall Remain In The Hand Of Him That Hath Bought It Until The Year Of Jubile

Not every family could scrape together enough money to redeem their land early.

When that happened, the buyer kept using the land, not owning it forever.

The jubile itself became the final, guaranteed backup plan.

No family in Israel had to wait more than forty nine years for their land to return.

💸 Some families could not redeem early
🌾 The buyer kept using the land meanwhile
📯 The jubile was the guaranteed backup
📖 No family waited more than forty nine years

# Leviticus 25:29-34
# 🏘️ Houses In The City And Levite Land
---
## If A Man Sell A Dwelling House In A Walled City

A walled city means a town protected by a defensive wall, unlike an open village.

Houses inside these walls were treated differently from farmland outside them.

This distinction is about to matter a great deal in the verses ahead.

Not every kind of property followed the same jubile rule.

🧱 A walled city has a defensive wall
🏠 City houses followed different rules
🌾 Different from farmland outside the walls
📖 Not every property followed the same rule

## He May Redeem It Within A Whole Year After It Is Sold

The seller got a full year, not just a few days, to buy the house back.

This gave a family real time to recover from a sudden money problem.

A year was long enough to plan, save, or ask relatives for help.

The clock started ticking the moment the sale happened.

📆 A full year to buy the house back
⏳ Real time to recover from hardship
💰 Enough time to save or ask for help
📖 The clock started at the sale itself

## If It Be Not Redeemed Within The Space Of A Full Year

Once that one year window closed, everything changed.

This is the deadline that makes city houses different from farmland.

Farmland always returned at the jubile no matter how much time passed.

A city house did not get that same guarantee.

⏰ The one year window had a hard deadline
🏙️ This is what makes city houses different
🌾 Farmland always had the jubile guarantee
📖 A city house lacked that safety net

## The House That Is In The Walled City Shall Be Established For Ever To Him That Bought It

Established for ever means the sale became permanent, with no future jubile reversal.

This is the one clear exception to the whole chapter's main rule.

A missed year meant a missed chance, permanently, for that specific house.

The exception applied narrowly, only to walled city houses, not to land in general.

🔒 Established for ever means a permanent sale
⚠️ The one real exception in this chapter
⏰ A missed year became a missed chance
📖 This exception applied narrowly, to houses only

## The Houses Of The Villages Which Have No Wall Round About Them

Small villages without walls sat close to the fields that surrounded them.

A house in a place like that functioned more like farmland than city property.

This law recognizes that difference instead of treating every house the same.

Where a family lived changed which rules applied to their home.

🏡 Villages without walls sat near open fields
🌾 These houses functioned like farmland
⚖️ The law treated them differently on purpose
📖 Location changed which rule applied

## They Shall Be Counted As The Fields Of The Country: They May Be Redeemed, And They Shall Go Out In The Jubile

Counted as the fields means these village houses followed the farmland rule instead.

They could be redeemed at any time, just like land.

And if no one redeemed them, the jubile still returned them for free.

Village families got the same protection that farmers received.

🌾 Village houses followed the farmland rule
💰 They could be redeemed at any time
📯 The jubile still returned them for free
📖 Village families got the same protection

## The Levites May Redeem At Any Time

The Levites were the priestly tribe, and they received no large farmland inheritance like the other tribes.

Instead, God assigned them a set of small cities scattered across the whole land.

Because those city houses were their only real inheritance, they needed extra protection.

Levites could redeem their city houses at any time, without the one year deadline.

👳 Levites were Israel's priestly tribe
🏙️ Small cities were their only inheritance
🔓 They could redeem at any time
📖 Their homes needed extra protection

## The City Of His Possession Shall Go Out In The Year Of Jubile

Even if a Levite sold a house and the year deadline passed, the jubile still applied.

This is a second exception layered on top of the first one.

Walled city houses in general stayed sold forever after one year.

Levite city houses never lost the jubile protection, no matter how much time passed.

🔁 A second exception, just for Levites
🏙️ Other city houses stayed sold forever
👳 Levite houses kept jubile protection always
📖 Their unique inheritance received unique safeguards

## But The Field Of The Suburbs Of Their Cities May Not Be Sold

Suburbs here means the open pastureland surrounding each Levite city, used for grazing animals.

Unlike the houses themselves, this pastureland could not be sold at all.

It is called their perpetual possession, land that belonged to them permanently.

No sale ever happened here, so no redemption rule was even needed.

🌿 Suburbs means Levite grazing pastureland
🚫 This land could never be sold
♾️ Called their perpetual possession
📖 No sale meant no redemption was needed

# Leviticus 25:35-38
# 🤝 Helping A Poor Brother
---
## If Thy Brother Be Waxen Poor, And Fallen In Decay With Thee

This repeats the phrase from verse twenty five, now applied to daily survival, not just land.

Fallen in decay pictures someone slowly losing the ability to support himself.

This is not a stranger's problem to ignore.

The text calls this person brother, a member of the same covenant family.

📉 Waxen poor means a slow decline
🤝 Brother means a covenant family member
😟 Fallen in decay pictures losing self support
📖 This was never a stranger's problem to ignore

## Then Thou Shalt Relieve Him

Relieve means to actively step in and help, not just feel sympathy.

This is a direct command, not a suggestion left to personal choice.

Israelite law expected practical action toward a struggling neighbor.

Feeling sorry for someone was never treated as enough on its own.

🙌 Relieve means active, practical help
📜 This is a command, not a suggestion
❤️ Feeling sorry alone was not enough
📖 Faith here required real action

## Yea, Though He Be A Stranger, Or A Sojourner

This command reaches beyond Israelites by birth.

Strangers and sojourners were foreigners living among the people, often without land of their own.

The same duty to relieve a struggling neighbor applied to them too.

Israel's kindness was never meant to stop at its own bloodline.

🌍 This reaches beyond Israelites by birth
🧳 Strangers and sojourners were resident foreigners
🤝 The same duty applied to them
📖 Kindness was not limited to bloodline

## Take Thou No Usury Of Him, Or Increase

Usury means charging interest on a loan.

Increase here means a similar extra charge, sometimes on goods instead of money.

Both words are banned together, closing off two ways to profit from a poor neighbor's crisis.

Lending to someone in real need was meant to be an act of mercy, not a business deal.

💰 Usury means charging interest on a loan
📈 Increase means a similar extra charge
🚫 Both were banned toward a struggling brother
📖 Lending here was mercy, not business

## But Fear Thy God, That Thy Brother May Live With Thee

This repeats the same reasoning already used for fair land pricing in verse seventeen.

Fearing God again becomes the real enforcement behind an economic law.

The stated goal is simple, that thy brother may live.

Survival, not profit, was the entire purpose of lending in this system.

🔁 Repeats verse seventeen's reasoning
🙏 Fearing God enforced this law
❤️ The goal was a brother's survival
📖 Profit was never the purpose here

## Thou Shalt Not Give Him Thy Money Upon Usury

This restates the ban specifically for money loans.

The repetition across two verses shows how seriously this rule was taken.

Charging a struggling neighbor interest was treated as real oppression, not clever business.

Ancient economies around Israel commonly allowed this kind of lending without restriction.

💵 Restates the ban on money interest
🔁 Two verses repeat this rule
⚠️ Interest here counted as oppression
📖 Neighboring nations allowed this freely

## Nor Lend Him Thy Victuals For Increase

Victuals means food supplies, especially grain kept in storage.

This closes a loophole, charging extra grain back instead of extra money.

Even food loans between neighbors had to be interest free.

No form of profit was allowed off a brother's hardship, whether cash or grain.

🌾 Victuals means stored food supplies
🚫 Closes the loophole of charging extra grain
🤝 Food loans also had to be interest free
📖 No profit was allowed off a brother's need

# Leviticus 25:39-46
# 👤 An Israelite Sold To You
---
## If Thy Brother That Dwelleth By Thee Be Waxen Poor, And Be Sold Unto Thee

This describes the most extreme form of poverty covered in this chapter.

A person could sell their own labor when land and loans were no longer enough.

Selling oneself was the last resort after every other option ran out.

The law does not ignore this reality, it regulates it carefully.

📉 The most extreme poverty in this chapter
🙋 Someone could sell their own labor
🏚️ This was always a last resort
📖 The law regulates this reality carefully

## Thou Shalt Not Compel Him To Serve As A Bondservant

Bondservant here describes the harsher, more permanent kind of slavery common in nearby nations.

This law forbids treating a fellow Israelite that way, no matter how desperate the sale.

The word choice draws a sharp legal line between two very different situations.

Even inside real hardship, an Israelite kept protections other nations denied their own poor.

⛓️ Bondservant describes a harsher form of slavery
🚫 An Israelite could never be treated this way
📏 A sharp legal line separates the two
📖 Protection remained even inside real hardship

## But As An Hired Servant, And As A Sojourner, He Shall Be With Thee

Hired servant and sojourner describe someone working for wages, not owned as property.

This person kept his own legal standing the entire time.

He worked under his employer's roof, but he was never that employer's possession.

The relationship stayed closer to employment than to ownership.

💼 Hired servant means paid labor, not property
⚖️ He kept his own legal standing
🏠 He worked there but was never owned
📖 Closer to a job than to slavery

## And Shall Serve Thee Unto The Year Of Jubile

This service had a guaranteed end date built in from the very beginning.

No matter how much money was involved, the jubile eventually canceled the whole arrangement.

An Israelite could never be trapped in service without hope of an ending.

The jubile made every one of these arrangements temporary by design.

📆 A guaranteed end date from the start
📯 The jubile eventually canceled every arrangement
🔓 No one stayed trapped without hope
📖 Every arrangement was temporary by design

## Then Shall He Depart From Thee, Both He And His Children With Him

Freedom here included the whole family, not the worker alone.

Children born or included during the service years left together at the same moment.

No family stayed split apart because of a debt one parent could not pay.

The jubile restored households, not just individual workers.

👪 Freedom included the whole family
🚸 Children left together with the parent
🔗 No family stayed split by debt
📖 Households were restored, not just workers

## And Shall Return Unto His Own Family, And Unto The Possession Of His Fathers Shall He Return

This verse ties two threads from this chapter back together at once.

Return unto his own family echoes the promise already made back in verse ten.

Return unto the possession of his fathers echoes the same promise about land.

Family and land were always meant to be restored together, not separately.

🔗 Ties two threads from this chapter together
👪 Echoes the promise about family
🗺️ Echoes the promise about land
📖 Family and land were restored as one

## For They Are My Servants, Which I Brought Forth Out Of The Land Of Egypt

This is the reason behind the whole bondservant law.

Israel already belonged to God, rescued once already from real slavery in Egypt.

A rescued people could not turn around and permanently enslave one another.

Their own history became the argument against permanent bondage among themselves.

🔑 The reason behind the whole law
🇪🇬 Israel had already been rescued once
🚫 They could not enslave each other again
📖 Their own history argued against bondage

## They Shall Not Be Sold As Bondmen

This repeats the earlier ban one more time, using a different word for emphasis.

Bondmen and bondservants describe the same harsher, more permanent kind of slavery.

No Israelite could ever be sold into that category, under any circumstance.

The repetition across this section shows how firm this line really was.

🔁 Repeats the ban with a new word
⛓️ Bondmen means permanent slavery, like bondservant
🚫 No Israelite could ever be sold this way
📖 Repetition shows how firm this line was

## Thou Shalt Not Rule Over Him With Rigour

Rigour means harsh, crushing treatment, more than firm management.

An employer could still expect real work and real accountability.

What the law forbids is cruelty, not ordinary discipline or structure.

The line between firm and harsh mattered enough to name directly.

😣 Rigour means harsh, crushing treatment
✅ Real work and accountability were still expected
🚫 Cruelty specifically was forbidden
📖 The line between firm and harsh mattered

## Both Thy Bondmen, And Thy Bondmaids, Which Thou Shalt Have, Shall Be Of The Heathen

This verse draws a hard line most modern readers do not expect.

Permanent, inherited slavery was allowed, but only involving foreign nations around Israel.

This was not a moral endorsement, it reflected the common practice of the entire ancient world.

The text restricts Israel's harshest option to outsiders, protecting their own covenant family from it.

🌍 Permanent slavery involved only foreign nations
⚠️ This reflected common ancient world practice
🤝 It was never a moral endorsement
📖 Only Israel's own family was protected from it

## Of The Children Of The Strangers That Do Sojourn Among You

This describes foreign families already living inside Israel's own borders.

Unlike Israelite debtors, these foreign residents could be bought as permanent property.

The law treats insiders and outsiders very differently throughout this whole chapter.

Covenant membership, not simply geography, decided which protections a person received.

🧳 Foreign families living inside Israel's borders
📏 Treated differently from Israelite debtors
🆚 Insiders and outsiders received different rules
📖 Covenant membership decided real protection

## Ye Shall Take Them As An Inheritance For Your Children After You

Inheritance means property passed down permanently from parent to child.

This status could be passed on for generations, unlike an Israelite's temporary service.

That permanence is exactly what the jubile canceled for Israel's own people.

The contrast between the two systems could not be drawn any sharper.

🏛️ Inheritance means property passed down permanently
🔁 This status carried on for generations
📯 The jubile canceled this for Israelites
📖 The contrast between systems was sharp

## But Over Your Brethren The Children Of Israel, Ye Shall Not Rule One Over Another With Rigour

This closing line returns to where the section started.

Rigour, the same harsh treatment banned back in verse forty three, gets banned again here.

The repetition draws a clear boundary line around the whole chapter's teaching.

Harsh rule belonged nowhere inside Israel's own covenant family, ever.

🔁 Returns to where the section started
😣 Rigour is banned again, for emphasis
📏 Draws a clear boundary for the whole law
📖 Harsh rule had no place inside the family

# Leviticus 25:47-55
# 🔓 Redeeming A Brother From A Stranger
---
## If A Sojourner Or Stranger Wax Rich By Thee

This scenario flips the usual picture in this chapter.

Here a foreigner living in Israel grows wealthy while an Israelite grows poor.

Wealth and poverty did not always follow the lines readers might expect.

The law had to plan for this exact reversal too.

🔄 This flips the usual picture in this chapter
💰 A foreigner grows wealthy here
📉 An Israelite grows poor beside him
📖 The law planned for this reversal too

## And Sell Himself Unto The Stranger, Or Sojourner By Thee

An Israelite in deep poverty could end up working for a wealthy foreigner.

This was the one scenario where an Israelite's own protections were most at risk.

A foreign employer was not automatically bound by Israel's covenant rules toward brothers.

The next several verses exist specifically to close that gap.

🙋 An Israelite could work for a wealthy foreigner
⚠️ Protections here were most at risk
🌍 Foreign employers were outside covenant rules
📖 The next verses close that exact gap

## After That He Is Sold He May Be Redeemed Again

Even in this risky situation, redemption remained fully available.

No Israelite lost the right to be bought back, no matter who purchased them.

This right applied even when the buyer was a foreigner outside Israel's covenant.

The safety net followed the person, not just the situation.

🔓 Redemption remained available here too
🌍 It applied even with a foreign buyer
🛡️ The right followed the person
📖 No situation removed this safety net

## One Of His Brethren May Redeem Him

Brethren means his own relatives within the covenant community.

Any relative could step forward and pay to bring him home.

This puts real responsibility on an extended family, not just distant law.

Israel's community was built to actively watch out for its most vulnerable members.

👪 Brethren means his own relatives
💰 Any relative could pay to redeem him
🤝 This placed responsibility on the family
📖 Community meant active care, not distance

## Either His Uncle, Or His Uncle's Son, May Redeem Him

The law names specific relatives instead of leaving the responsibility vague.

An uncle or a cousin through the father's line both qualified to help.

Naming exact relationships pushed the obligation past a vague, easy idea to ignore.

Someone specific always had both the standing and the duty to act.

🧔 Names specific relatives, not a vague group
👴 An uncle or cousin both qualified
📏 This pushed past an easy idea to ignore
📖 Someone specific always had the duty to act

## Or If He Be Able, He May Redeem Himself

This adds one final option beyond family help.

If the man himself earned or saved enough money, he could pay for his own freedom.

Redemption never depended only on having generous relatives nearby.

More than one path led back to freedom in this law.

💪 A final option beyond family help
💰 He could pay for his own freedom
🚪 Redemption did not depend on relatives alone
📖 More than one path led to freedom

## He Shall Reckon With Him That Bought Him

Reckon means to calculate the price honestly and openly together.

Both buyer and the redeeming family sat down and did the math out loud.

The final number always counted forward to the exact year of the next jubile.

Every price in this whole chapter eventually points back to that same date.

🧮 Reckon means calculating the price openly
🤝 Buyer and family worked out the math together
📆 The count ran to the next jubile
📖 Every price pointed to that same date

## According To The Time Of An Hired Servant Shall It Be With Him

This ties the redemption price to the same standard used for a hired servant's wages.

Nothing about this arrangement was ever meant to resemble permanent slavery.

The price stayed fair and calculable, based on ordinary daily wage rates.

The law kept using the language of employment, never of ownership.

💼 Tied to a hired servant's wage standard
🚫 Never meant to resemble permanent slavery
🧮 The price stayed fair and calculable
📖 The language stayed employment, not ownership

## If There Be Yet Many Years Behind

Many years behind means a large number of years still remain before the jubile.

More remaining years meant more work still owed to the buyer.

Naturally, that also meant a higher price to redeem him early.

The same math worked exactly the way it did for land back in verse sixteen.

📆 Many years behind means years still remaining
🌾 More years owed meant more work
💰 That meant a higher redemption price
📖 The same math applied to land earlier

## If There Remain But Few Years Unto The Year Of Jubile

This covers the opposite situation, close to the jubile already.

Fewer years remaining meant far less work still owed.

The redemption price dropped to match, exactly as it did with land.

Timing alone could make freedom either expensive or nearly free.

📆 The opposite situation, close to jubile
🌾 Fewer years owed meant less work
💰 The price dropped to match
📖 Timing alone changed the cost of freedom

## And As A Yearly Hired Servant Shall He Be With Him

This restates the wage standard one more time for clarity.

Every year of remaining service got valued like a normal year of paid work.

No hidden penalty or extra fee could be added on top.

Fair, transparent pricing ran through this entire redemption system.

🔁 Restates the wage standard again
📅 Each year valued like normal paid work
🚫 No hidden penalty could be added
📖 Fair pricing ran through this system

## The Other Shall Not Rule With Rigour Over Him In Thy Sight

Rigour appears here for the third time in this chapter alone.

This time God specifically warns Israel to watch a foreign employer's treatment of their brother.

In thy sight means Israel had a real duty to notice and step in.

Watching a brother suffer quietly was never treated as acceptable neutrality.

😣 Rigour is banned here a third time
👀 Israel had to watch out for their brother
🚨 In thy sight means a duty to notice
📖 Silent neutrality was never acceptable

## And If He Be Not Redeemed In These Years, Then He Shall Go Out In The Year Of Jubile

Just like every other arrangement in this chapter, the jubile was the final guarantee.

No one could fall through every other safety net and still remain permanently bound.

Family redemption, self redemption, and the jubile together left no real gap.

The system was designed with more than one way out, on purpose.

📯 The jubile was always the final guarantee
🛡️ No one could fall through every net
🔓 Multiple paths to freedom existed together
📖 The system left no real gap, by design

## For Unto Me The Children Of Israel Are Servants

This closing line returns to the same truth that opened the bondservant law back in verse forty two.

Israel belonged to God first, before any human employer or master.

That single fact stands underneath every rule in this entire chapter, from farmland to family.

Jubile, redemption, and rest all exist for one single reason.

God alone owns His people, and God alone owns the land.

🔁 Returns to the truth from verse forty two
🙏 Israel belonged to God before any master
🏛️ This truth underlies the whole chapter
📖 God alone owns His people and His land
`.trim();

export const LEVITICUS_TWENTY_FIVE_PERSONAL_SECTIONS = parseLeviticusTwentyFiveRawNotes(
  LEVITICUS_TWENTY_FIVE_RAW_NOTES,
);
