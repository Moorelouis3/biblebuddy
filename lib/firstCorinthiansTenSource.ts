export type FirstCorinthiansTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansTenRawNotes(rawText: string): FirstCorinthiansTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 10:${startVerse}` : `1 Corinthians 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 First Corinthians 10 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_TEN_RAW_NOTES = `# FirstCorinthians 10:1-4
# 🌊 The Cloud, The Sea, And The Rock
---
## 👴 Our Fathers

"Our fathers" means the generation of Israelites who left Egypt with Moses.

Paul is pulling the Corinthians back into their own spiritual family history.

These were not strangers to the gospel story.

Their journey out of Egypt became a pattern for every believer who came after them.

👴 Our fathers means the Exodus generation

📜 Paul links the Corinthians to that history

🚶 Their journey became a lasting pattern

📖 Every believer shares in that story

## ☁️ Under The Cloud, And All Passed Through The Sea

God led Israel through the wilderness inside a visible pillar of cloud.

That same cloud had stood between them and Pharaoh's army at the Red Sea.

"Passed through the sea" points to the Red Sea crossing in Exodus fourteen.

Every single person in that whole nation walked through on dry ground.

☁️ The cloud was God's visible, guiding presence

🌊 Passed through the sea means the Red Sea

🛡️ The cloud once shielded them from Pharaoh

📖 Every one of them shared this same deliverance

## 💧 Baptized Unto Moses

This is not water baptism the way the church later practiced it.

"Baptized unto Moses" means the whole nation was identified with Moses as their leader.

Passing through the cloud and sea marked them as belonging to his covenant community.

Paul is drawing a comparison, not describing a church ritual that already existed.

💧 Baptized here means identified with a leader

🤝 The nation was bound to Moses as leader

🚫 Not the later ritual of church baptism

➡️ Paul is drawing a comparison for his readers

## 🌊 In The Cloud And In The Sea

Picture the cloud overhead and walls of water on either side.

Israel was completely surrounded, cloud above, sea on both sides.

That full surrounding is the picture Paul borrows for the word "baptized."

Being baptized unto Moses meant being wholly enclosed inside that shared experience.

☁️ Cloud covered them from above

🌊 Walls of sea stood on either side

🔲 They were fully enclosed by both

📖 That enclosure pictures what baptism means here

## 🍞 Did All Eat The Same Spiritual Meat

"Spiritual meat" refers to the manna God provided every morning in the wilderness.

Exodus sixteen describes it as bread that appeared on the ground like dew.

Paul calls it spiritual because its source was miraculous, not ordinary farming.

Every person in the camp, not just a favored few, ate the very same food.

🍞 Spiritual meat means the manna from Exodus sixteen

✨ Its source was miraculous, not ordinary

🍽️ Every single Israelite shared this same food

📖 God fed the whole nation without exception

## 🪨 Did All Drink The Same Spiritual Drink

Israel had no river to rely on through the dry wilderness.

God provided water by splitting open a literal rock, recorded in Exodus seventeen.

Paul calls this water spiritual for the same reason he called the manna spiritual.

Its source was God himself, not a natural spring they happened to find.

🏜️ Israel had no natural water source

🪨 Water came from God splitting open a rock

✨ Spiritual marks its source as miraculous

📖 God supplied every person's thirst directly

## 🏔️ That Spiritual Rock That Followed Them

Numbers twenty records a second rock struck for water, years after the first.

Jewish tradition pictured that rock as somehow present with Israel the whole journey.

Paul is not claiming an actual boulder rolled along behind the camp.

He is describing God's constant provision using a vivid, familiar picture.

🪨 A second rock appears later in Numbers twenty

📚 Jewish tradition pictured it as ever present

🚫 Not a literal boulder following the camp

➡️ A vivid picture of constant provision

## ✝️ And That Rock Was Christ

Paul makes a bold claim here about where that provision truly came from.

He says Christ himself was the source behind the rock's water all along.

This points to Christ as active even before his human birth in Bethlehem.

The same Christ who later died for the Corinthians also sustained their ancestors.

✝️ Paul identifies Christ as the rock's true source

⏳ Christ was active before his human birth

🔗 Ties the old story to the new gospel

📖 The one who saves also sustained them

# FirstCorinthians 10:5-8
# 😤 Idolatry In The Wilderness
---
## 😤 God Was Not Well Pleased

Despite all that shared provision, most of that generation still displeased God.

Experiencing miracles firsthand did not guarantee faithful hearts underneath.

Paul is building toward a warning the Corinthians need to hear clearly.

Blessing received is not the same thing as obedience given.

😤 Shared blessing did not guarantee faithfulness

⚠️ Paul is building toward a direct warning

🎁 Receiving a gift is not obeying

➡️ Privilege never replaces a faithful heart

## 🏜️ Overthrown In The Wilderness

"Overthrown" describes a whole generation that died before reaching the promised land.

Numbers fourteen records this judgment after Israel refused to trust God at the border.

An entire generation that left Egypt with such hope never entered the inheritance.

Paul wants the Corinthians to feel the weight of that lost promise.

☠️ Overthrown means that generation died in judgment

🗺️ Numbers fourteen records the refusal at the border

⏳ A whole generation lost its promised inheritance

📖 Hope that started well must finish well

## 📖 These Things Were Our Examples

"Examples" here means a pattern deliberately preserved as a warning for later readers.

These stories were not recorded as neutral history alone.

God wanted future generations to learn from what happened to this one.

Paul is reading the Old Testament the way it was meant to be read.

📖 Examples means a pattern meant as warning

✍️ Not neutral history recorded for its own sake

👀 God intended later readers to learn from it

➡️ Old stories carry present day lessons

## 😈 Lust After Evil Things, As They Also Lusted

"Lust" here means a strong, consuming desire, not only a sexual one.

Numbers eleven records Israel craving the meat and food they remembered from Egypt.

That craving led them to despise the provision God was already giving them.

Paul warns the Corinthians against that same restless, ungrateful kind of desire.

😈 Lust means a strong, consuming craving

🍖 Israel craved the food they missed from Egypt

😠 That craving turned into ingratitude toward God

➡️ The same restless craving can tempt any believer

## 🐄 Rose Up To Play

This phrase quotes Exodus thirty two, describing the golden calf celebration.

While Moses was on the mountain, Israel built an idol and threw a wild party.

"Play" describes reckless, idol driven revelry, not innocent fun.

Paul calls this idolatry outright, not a harmless cultural festival.

🐄 Quotes the golden calf scene in Exodus

🎉 Play describes reckless idol worship, not fun

🚫 Paul names it plainly as idolatry

📖 Worship aimed anywhere but God always corrupts

## 💔 Neither Let Us Commit Fornication

"Fornication" means sexual immorality outside the bounds God set for marriage.

Numbers twenty five records Israel joining pagan worship tied directly to sexual sin.

Idolatry and sexual sin were tangled together in that ancient culture.

Paul treats the warning against one as inseparable from the warning against the other.

💔 Fornication means sexual sin outside marriage

🛐 Numbers twenty five ties it to pagan worship

🔗 Idolatry and sexual sin were tangled together

➡️ One temptation often drags another one with it

## ⚰️ Fell In One Day Three And Twenty Thousand

This staggering number comes directly from the judgment described in Numbers twenty five.

Thousands died in a single day because of that idolatry and sexual sin.

Paul includes the exact number so the warning cannot feel abstract or distant.

A specific number forces the reader to picture real, sudden loss.

⚰️ The number comes from Numbers twenty five

☠️ Thousands died in a single day

🔢 Paul gives an exact count on purpose

📖 A real number makes the warning feel real

# FirstCorinthians 10:9-11
# 🐍 Tempting Christ, And The Destroyer
---
## 🐍 Tempt Christ, And Were Destroyed Of Serpents

Numbers twenty one records Israel complaining bitterly against God and against Moses.

God sent venomous serpents into the camp as a direct judgment for that complaint.

"Tempt" here means testing God's patience past its limit, not light teasing.

Paul names Christ as the one Israel was really testing all along.

🐍 Numbers twenty one records the serpent judgment

😠 Tempt means pushing God's patience past its limit

🗣️ Their complaint provoked the judgment directly

📖 Paul says Christ himself was being tested

## 😠 Neither Murmur Ye

"Murmur" means grumbling complaint, often repeated under someone's breath.

Israel murmured against Moses and Aaron again and again throughout the wilderness.

Numbers sixteen records one such murmuring that ended in sudden, severe judgment.

Paul warns the Corinthians against falling into that exact same habit.

😠 Murmur means repeated, grumbling complaint

🗣️ Israel murmured against their leaders constantly

📜 Numbers sixteen records a severe judgment for it

➡️ The same grumbling habit can creep in

## 👿 Destroyed Of The Destroyer

"The destroyer" describes an agent of judgment, not Moses or a human enemy.

Numbers sixteen records a plague that struck the camp after that murmuring.

The language echoes the destroying angel from the first Passover night in Egypt.

Paul wants the Corinthians to take divine judgment seriously, not lightly.

👿 The destroyer is an agent of judgment

🦠 Numbers sixteen records a plague after murmuring

🌙 Echoes the destroying angel from the Passover night

📖 Divine judgment is never something to treat lightly

## 📜 Written For Our Admonition

"Admonition" means a warning meant to correct behavior before it happens.

Paul says these ancient stories were preserved with later believers specifically in mind.

Scripture is not just a record of the past for its own sake.

It is active instruction aimed at whoever reads it afterward.

📜 Admonition means a warning meant to correct

✍️ Written with later believers specifically in mind

📚 Scripture is active instruction, not just record

➡️ Old warnings still apply to present readers

## ⏳ The Ends Of The World Are Come

Paul tells the Corinthians they are living at a turning point in history.

Christ's death and resurrection had already split history into a before and after.

"The ends of the world" does not mean the world was about to vanish.

It means the final era of God's plan had already begun in their own lifetime.

⏳ Marks a turning point in history

✝️ Christ's death and resurrection caused the split

🚫 Does not mean the world would vanish

📖 The final era of God's plan had begun

# FirstCorinthians 10:12-13
# ⚠️ Take Heed, And The Way To Escape
---
## ⚠️ Let Him That Thinketh He Standeth Take Heed Lest He Fall

Paul applies the whole wilderness warning directly to confident believers in Corinth.

Feeling spiritually secure can be exactly the moment someone becomes careless.

The Israelites who fell were not strangers to God's blessing either.

Confidence without ongoing watchfulness is a dangerous combination.

⚠️ A direct warning to confident believers

😌 Feeling secure can lead to carelessness

👴 The wilderness generation had blessing too

➡️ Confidence still needs ongoing watchfulness

## 🤝 Common To Man

Paul reassures the Corinthians that their struggles are not unique to them.

Every temptation they face has already been faced by someone else before them.

This truth should remove both despair and any sense of special excuse.

Nobody gets to claim their temptation is too strange for God to understand.

🤝 Temptation is shared by every person

👥 Someone else has already faced the same test

🚫 No excuse of being uniquely tempted

📖 God understands every common human struggle

## 🙏 God Is Faithful

"Faithful" means utterly reliable, never breaking a promise once made.

Paul grounds this entire promise in God's own character, not in human effort.

God sets a real limit on how far any temptation can push a believer.

That limit is not random, it is personally measured by God himself.

🙏 Faithful means completely reliable

🧱 The promise rests on God's character

📏 God sets a real limit on temptation

📖 That limit is personally measured, not random

## 🚪 A Way To Escape

"Escape" does not always mean the temptation simply disappears.

It often means God provides a real, specific path through the trial.

That path might be a person, a choice, or simply the strength to endure.

God's provision always matches what a believer can genuinely bear.

🚪 Escape often means a path through, not away

🧭 It could be a person or a choice

⚖️ The path always fits what can be borne

➡️ God's provision is tailored, not generic

# FirstCorinthians 10:14-17
# 🍷 Flee From Idolatry, To The Lord's Table
---
## 🏃 Flee From Idolatry

"Flee" is a strong, urgent command, not a gentle suggestion.

Paul does not tell the Corinthians to merely resist idolatry where it stands.

He tells them to run from it the way someone runs from real danger.

This command ties directly back to every wilderness warning he just gave.

🏃 Flee is an urgent command, not gentle advice

🚨 Idolatry is treated as real, present danger

🔗 Connects straight back to the wilderness warnings

➡️ Distance, not mere resistance, is the safest response

## 🧠 I Speak As To Wise Men

Paul is not issuing a command from pure authority alone here.

He is appealing to the Corinthians' own ability to reason the matter out.

He trusts them to weigh the evidence and reach the obvious conclusion themselves.

Respecting someone's judgment can be more persuasive than simply ordering them.

🧠 Paul appeals to their own reasoning

⚖️ He invites them to judge the matter

🤝 Trusting their judgment, not just commanding

➡️ Respect can persuade more than pure authority

## 🍷 The Cup Of Blessing

This phrase describes the cup shared during the Lord's Supper.

"Blessing" points to the prayer of thanks spoken over it before drinking.

Jewish meals already included a cup blessed with thanksgiving before this new meaning was added.

Paul draws on a familiar practice to explain something now deeply sacred.

🍷 The cup of blessing is the Supper's cup

🙏 Blessing points to the thanksgiving spoken over it

📜 Jewish meals already used a blessed cup

➡️ A familiar practice now carries sacred new meaning

## 🤝 The Communion Of The Blood Of Christ

"Communion" means a genuine shared participation, not just a symbolic gesture.

Drinking this cup unites believers in a real, spiritual connection to Christ's sacrifice.

Paul treats this moment as far more than a simple remembrance exercise.

What happens at that table actually joins believers to what Christ accomplished.

🤝 Communion means real, shared participation

✝️ It connects believers to Christ's sacrifice

🚫 Not merely a symbolic remembrance

📖 The table joins believers to what Christ did

## 🍞 The Bread Which We Break

Breaking a single loaf pictured something deeper than the meal itself.

One loaf, divided among many people, pointed to one body shared by many members.

Paul will build directly on this picture in the very next verse.

The physical act of breaking bread carried real spiritual weight.

🍞 One loaf was physically broken and shared

🧩 It pictured one body with many members

🔗 Sets up the point made in verse seventeen

➡️ A simple act carried real spiritual weight

## 👥 We Being Many Are One Bread, And One Body

Paul draws the conclusion his readers should already be sensing.

Many different believers, by sharing one loaf, become one united body.

This unity is not just a nice feeling but an actual spiritual reality.

That same unity is exactly what idol feasts could never offer anyone.

👥 Many believers become one united body

🍞 Sharing one loaf pictures that unity

✨ The unity is a real spiritual fact

📖 Idol feasts can never offer this unity

# FirstCorinthians 10:18-22
# 🔥 Partakers With Devils
---
## 🇮🇱 Israel After The Flesh

"Israel after the flesh" means the ordinary, physical nation of Israel.

Paul points to the Old Testament sacrificial system as a parallel example.

He is not contrasting bad Israel with good Gentiles here.

He is simply using a system the Corinthians already understood as common ground.

🇮🇱 Describes the physical, national people of Israel

📜 Paul points to their sacrificial system

🤝 Used as common, understood ground

➡️ Not a contrast of good versus bad people

## 🔥 Partakers Of The Altar

Eating sacrificial meat connected an Israelite worshiper directly to what happened at the altar.

That meal was never just food, it was an act of participation in worship.

Paul uses this familiar idea to set up his real warning.

Sharing a meal tied to an altar meant sharing in what the altar represented.

🔥 Eating sacrificed meat linked worshipers to the altar

🍖 The meal itself was an act of worship

🔗 Paul uses this to set up his warning

➡️ Shared meals can mean shared participation

## ❓ The Idol Is Any Thing

Paul is careful here not to give an idol false spiritual power.

An idol, as a carved object, has no real existence as a god.

He already said this plainly back in chapter eight.

The real danger Paul is about to describe comes from somewhere else entirely.

❓ An idol carved object has no real power

📖 Paul already said this in chapter eight

🚫 He is not granting idols false authority

➡️ The real danger lies somewhere else

## 👿 They Sacrifice To Devils

Paul reveals what is spiritually happening behind pagan sacrifice, even though idols themselves are empty.

Demonic spirits use empty idols as a cover for real spiritual activity.

Worshipers may think they are honoring a statue made of stone or wood.

Paul says something genuinely dark is actually receiving that worship instead.

👿 Demonic spirits hide behind empty idols

🎭 Worshipers think they honor a lifeless statue

😨 Something genuinely dark receives it instead

📖 Idol worship is never spiritually neutral

## 🚫 Fellowship With Devils

"Fellowship" means close, shared participation, the same word used for genuine communion.

Paul will not let the Corinthians treat idol feasts as harmless social events.

Sharing that kind of meal would mean sharing in something genuinely evil.

He wants to protect them from that connection entirely.

🚫 Fellowship means close, shared participation

⚠️ Idol feasts are not harmless social events

😈 Sharing the meal means sharing in evil

➡️ Paul wants to protect them from this entirely

## 🍷 Ye Cannot Drink The Cup Of The Lord, And The Cup Of Devils

Paul states a flat impossibility, not merely a strong preference.

A person cannot genuinely belong to two opposing spiritual realities at once.

Drinking from the Lord's cup and a demonic cup cancel each other out.

Loyalty divided this completely is not loyalty at all.

🚫 States an impossibility, not just a preference

⚖️ No one belongs to two realities at once

🍷 The two cups cancel each other out

📖 Split loyalty here is really no loyalty

## 🪑 Partakers Of The Lord's Table, And Of The Table Of Devils

"Table" pictures an ongoing relationship, not just a single shared meal.

Sitting regularly at someone's table meant belonging to their household and their side.

Paul says a believer cannot hold membership at both tables simultaneously.

The choice between them is total, not partial.

🪑 Table pictures an ongoing relationship

🏠 It meant belonging to a household and side

🚫 No one holds membership at both tables

➡️ The choice between them is total

## 😠 Provoke The Lord To Jealousy

"Jealousy" here describes God's rightful response to being replaced by a rival.

A husband's jealousy over his wife's loyalty is the closest human picture available.

God has every right to that same reaction toward his people's loyalty.

Paul's closing question dares the Corinthians to consider their own strength honestly.

😠 Jealousy is God's response to being replaced

💍 Pictures a husband's claim on his wife's loyalty

✅ God has a rightful claim to loyalty

📖 No one is stronger than God himself

# FirstCorinthians 10:23-26
# ⚖️ Lawful, But Not Always Helpful
---
## ⚖️ All Things Are Lawful For Me

Paul is quoting a slogan some Corinthians were using to excuse their behavior.

Technically permitted is not the same question as genuinely wise.

Paul already used this exact phrase back in chapter six to make the same point.

A loophole is not automatically a good decision.

⚖️ Quotes a slogan some Corinthians were using

🧩 Permitted and wise are different questions

🔁 Paul used this same phrase in chapter six

➡️ A loophole is not automatically wise

## 🏗️ Edify

"Edify" means to build someone up, much like constructing a sturdy building.

An action can be perfectly legal and still tear someone else down spiritually.

Paul measures choices by their effect on other people, not just their legality.

A free choice should leave people stronger, not weaker, in their faith.

🏗️ Edify means to build someone up spiritually

⚖️ Legal and harmful can happen together

👀 Paul measures choices by their effect on others

📖 A free choice should strengthen, not weaken, faith

## 🤝 Let No Man Seek His Own, But Every Man Another's Wealth

"Wealth" here means genuine benefit or well being, not money specifically.

Paul redirects the Corinthians' freedom away from pure self interest.

A mature believer asks what helps someone else before asking what they personally prefer.

This single instruction reshapes how every freedom in this chapter should be used.

🤝 Wealth here means genuine benefit, not money

🙅 Redirects freedom away from pure self interest

❓ Ask what helps others before personal preference

➡️ This reshapes how every freedom gets used

## 🥩 Sold In The Shambles

"The shambles" was the ordinary public meat market in a city like Corinth.

Meat sold there often came from animals previously offered at a pagan temple.

Paul says a believer can buy and eat it without investigating its history.

Normal daily life does not require constant suspicion over every meal.

🥩 The shambles was the public meat market

🏛️ Temple sacrificed meat often ended up there

🛒 Believers could buy it without investigating

➡️ Ordinary life does not require constant suspicion

## 🤐 Asking No Question For Conscience Sake

Paul tells the Corinthians not to go hunting for reasons to feel guilty.

Needlessly investigating every meal would create anxiety that serves no real purpose.

A clear conscience does not require interrogating every plate of food.

Freedom includes the freedom to simply eat without constant worry.

🤐 Do not hunt for reasons to feel guilty

😟 Needless investigation only creates anxiety

🍽️ A clear conscience does not demand interrogation

📖 Freedom includes eating without constant worry

## 🌍 The Earth Is The Lord's, And The Fulness Thereof

Paul quotes Psalm twenty four to settle the whole question at its root.

"Fulness" means everything the earth contains, every animal and every harvest.

If God owns everything in creation, no food is inherently contaminated by itself.

The food on the table was always God's property before anyone sold it.

📜 Quotes Psalm twenty four directly

🌍 Fulness means everything the earth contains

🚫 No food is inherently contaminated by itself

📖 God owned the food before anyone sold it

# FirstCorinthians 10:27-30
# 🍽️ Eating For Conscience Sake
---
## 🚶 If Any Of Them That Believe Not Bid You To A Feast

Paul addresses a real, everyday situation Corinthian believers would actually face.

An unbelieving neighbor or relative might invite a Christian to a shared meal.

Paul does not tell them to refuse every invitation out of fear.

Normal social life with unbelievers is not automatically forbidden.

🚶 Describes an invitation from an unbeliever

🏠 A real, everyday social situation

🚫 Paul does not forbid every such invitation

➡️ Ordinary social life is not automatically off limits

## 🍽️ Whatsoever Is Set Before You, Eat

This instruction matches what Paul already said about food from the public market.

A guest is not expected to interrogate the host about where the meal came from.

Trusting a host's table was a basic form of ordinary hospitality.

Paul extends the same freedom from the marketplace into a private home.

🍽️ Matches the earlier instruction about the market

🙏 Guests are not expected to interrogate hosts

🤝 Trusting a host reflects ordinary hospitality

➡️ The same freedom applies in private homes

## 🤔 Eat Not For His Sake That Shewed It

This instruction only applies if someone specifically points out the meat's origin.

"Shewed" means pointed out or revealed, not simply assumed or guessed.

If a fellow guest flags the meat as sacrificed to an idol, the situation changes.

Paul's concern now shifts from the food itself to the person watching.

🤔 Only applies if someone points it out

👀 Shewed means pointed out, not merely guessed

🔄 A flagged meal changes the whole situation

📖 The concern shifts to the watching person

## 👥 Conscience, I Say, Not Thine Own, But Of The Other

Paul clarifies exactly whose conscience matters in this specific case.

The believer eating the meal already knows idols have no real power.

The issue is protecting someone else who might misread the believer's actions.

Love sometimes means limiting a freedom you personally do not even need to limit.

👥 Clarifies whose conscience is really at stake

🧠 The eater's own conscience is not confused

🛡️ The concern is protecting a watching believer

➡️ Love sometimes limits an unnecessary freedom

## ⚖️ Why Is My Liberty Judged Of Another Man's Conscience

Paul raises a fair sounding objection before answering it.

Why should someone else's weaker conscience ever restrict his own genuine freedom?

The question sounds reasonable on the surface, almost like a complaint.

Paul is letting the Corinthians feel the tension before resolving it in verse thirty one.

⚖️ Raises a fair sounding objection on purpose

❓ Why should another's conscience limit his freedom

😕 The question sounds reasonable at first

➡️ Paul resolves this tension in the next verses

## 🙏 Evil Spoken Of For That For Which I Give Thanks

Paul points out something genuinely unfair that can happen to a believer.

Giving honest thanks over a meal should never become grounds for criticism.

Yet careless eating in front of a watching unbeliever could still cause real harm.

Gratitude to God and consideration for others are not actually in competition.

🙏 Thanking God for food is never wrong

😕 Careless eating can still cause real harm

⚖️ Gratitude and consideration are not in competition

📖 Both can be honored at one meal

# FirstCorinthians 10:31-33
# 🙌 Do All To The Glory Of God
---
## 🙌 Whether Therefore Ye Eat, Or Drink, Or Whatsoever Ye Do

Paul widens his instruction far beyond this one specific food debate.

Every single action across an ordinary day falls under this same principle.

Nothing in daily life is too small or too ordinary to matter to God.

Paul is closing a long argument with one sweeping, simple rule.

🙌 Widens the lesson beyond this one debate

📅 Every ordinary action falls under this rule

🧩 Nothing is too small to matter to God

➡️ One simple rule closes a long argument

## ✨ Do All To The Glory Of God

"Glory" means reflecting God's own worth and goodness back to others.

Every decision, even one as small as a meal, can point toward God.

This single purpose becomes the real test behind every freedom Paul discussed.

The question is never just "can I," but always "does this honor God."

✨ Glory means reflecting God's worth to others

🍽️ Even small decisions can point toward God

🧭 This becomes the test behind every freedom

📖 The real question is whether it honors God

## 🚫 Give None Offence

"Offence" here means an unnecessary stumbling block placed in someone else's path.

Paul is not asking believers to avoid ever upsetting anyone at all.

He is asking them to avoid needlessly damaging someone's faith or conscience.

Some offense is unavoidable, but careless harm to others never has to be.

🚫 Offence means an unnecessary stumbling block

😊 Not about avoiding every upset feeling

🛡️ About avoiding needless damage to faith

➡️ Careless harm to others is always avoidable

## 🌍 Neither To The Jews, Nor To The Gentiles, Nor To The Church Of God

Paul names three distinct groups a believer's actions could genuinely wound.

Jewish neighbors, Gentile neighbors, and fellow believers each had different sensitivities.

A wise believer stays aware of how an action lands across all three groups.

This threefold list shows just how broadly Paul wants this principle applied.

🌍 Names three distinct groups that could be harmed

🕍 Jews, Gentiles, and the church each differ

👀 Wisdom means watching how actions land on each

➡️ Shows how broadly this principle applies

## 🤝 I Please All Men In All Things

Paul is not describing people pleasing flattery or a lack of real conviction.

He already showed real, firm conviction throughout this very letter.

"Please" here means removing needless obstacles so people can actually hear the gospel.

Paul adapts his approach constantly, but never changes the actual message.

🤝 Not flattery or a lack of conviction

💪 Paul shows firm conviction throughout this letter

🚧 Please means removing needless gospel obstacles

📖 His approach adapts, his message never does

## 💞 Not Seeking Mine Own Profit, But The Profit Of Many

Paul restates the same principle from the start of this chapter's argument.

His own comfort and preference consistently take a backseat to others' good.

This is not a one time decision but a settled, repeated pattern in his life.

Paul's whole ministry models the very instruction he is giving the Corinthians.

💞 Restates the chapter's opening principle again

🙇 His own comfort takes a back seat

🔁 A settled, repeated pattern, not one choice

➡️ Paul's life models his own instruction

## ✝️ That They May Be Saved

Paul names the ultimate goal behind every single choice in this long argument.

Every adjustment, every limit, every freedom given up points toward this one purpose.

Nothing here was ever really about food, meat markets, or dinner invitations alone.

It was always about clearing every possible obstacle out of the gospel's path.

✝️ Names the ultimate goal of the whole argument

🎯 Every choice in this chapter points here

🚫 Never really just about food or meals

📖 The goal is always clearing the gospel's path
`.trim();

export const FIRST_CORINTHIANS_TEN_PERSONAL_SECTIONS = parseFirstCorinthiansTenRawNotes(FIRST_CORINTHIANS_TEN_RAW_NOTES);
