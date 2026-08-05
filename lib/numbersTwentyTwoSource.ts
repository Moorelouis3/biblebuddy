export type NumbersTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyTwoRawNotes(rawText: string): NumbersTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 22:${startVerse}` : `Numbers 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Numbers 22 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_TWO_RAW_NOTES = `# Numbers 22:1-4
# 😨 Moab's Fear
---
## In The Plains Of Moab

The plains of Moab sat on the east side of the Jordan River, directly across from Jericho.

This was the last stop before Israel entered the promised land.

Forty years of wandering were about to end at this exact spot.

Everything in the rest of Numbers happens from this one camp.

🗺️ East side of the Jordan, near Jericho

🏕️ The final camp before entering Canaan

⏳ Forty years of wandering nearly finished

📖 Everything ahead happens from this one spot

## All That Israel Had Done To The Amorites

This "all" refers to two full nations Israel had already defeated.

Israel had just crushed Sihon, king of the Amorites, and Og, king of Bashan.

Both kings and their armies fell in the chapters right before this one.

Balak has watched two powerful neighbors get wiped out in a matter of weeks.

That is exactly why he panics next.

⚔️ Refers to the defeat of Sihon and Og

👑 Two Amorite kings, both destroyed

📜 Both battles happened in Numbers twenty one

📖 Balak has watched this happen firsthand

## Moab Was Sore Afraid

"Sore" here does not mean physical pain.

It means severely, to an extreme degree.

Moab was not just nervous about Israel arriving.

They were gripped by total, overwhelming fear.

😨 Sore means severely, not painful

📈 An extreme, overwhelming kind of fear

👥 Directed at the whole nation of Moab

📖 Sets up why Balak acts so fast

## As The Ox Licketh Up The Grass Of The Field

Moab pictures Israel the way a farmer pictures a hungry ox in a pasture.

An ox does not nibble politely, it strips a field bare.

Moab believed Israel would consume everything around them the same way.

The image is total loss, not a partial threat.

Fear this size does not reach for calm language.

🐂 An ox stripping a field bare

🌾 Pictures total loss, not partial damage

😨 Shows the size of Moab's fear

📖 Panic, not calm calculation, drives this plan

## Balak The Son Of Zippor Was King Of The Moabites

Balak is the king who will drive most of the rest of this chapter.

His father Zippor is otherwise unknown outside this mention.

Moab was a nation east of the Dead Sea, related to Israel through Lot.

Balak has no army victory to fall back on, so he reaches for a different weapon.

👑 Balak rules Moab at this moment

🌍 Moab sat east of the Dead Sea

🧬 Moab descended from Lot, Abraham's nephew

📖 He turns to a spiritual weapon next

# Numbers 22:5-8
# 📜 Balak Summons Balaam
---
## Balaam The Son Of Beor

Balaam is not an Israelite and not a worshiper of the God of Israel by nationality.

He lived far to the northeast, likely near the Euphrates River.

He was known across the region as a diviner whose words carried real power.

The Bible treats him as a real figure God actually speaks through, even though he is an outsider.

🌍 A prophet from outside Israel entirely

📍 Lived near the Euphrates River region

🔮 Famous across the region as a diviner

📖 God speaks through him despite his background

## Curse Me This People

In this culture, a curse was not just a mean insult.

It was believed to be a spoken power that could bring real harm.

Balak wants Balaam to use words as a weapon he cannot use with his own army.

A skilled curser was hired the way a king might hire a general.

🗣️ A curse was believed to carry real power

⚔️ Words used as a weapon

💰 Balak hires Balaam like hiring a general

📖 Spiritual force stands in for military force

## He Whom Thou Blessest Is Blessed, And He Whom Thou Cursest Is Cursed

This is Balaam's reputation, quoted directly by the men sent to hire him.

People across the region believed his blessings and curses actually came true.

Balak is betting his nation's safety on that reputation.

The chapters ahead will test whether that reputation actually controls anything.

🌟 Balaam's blessings were believed to work

💀 His curses were believed to work too

🎲 Balak bets everything on this reputation

📖 The next chapters test if it is true

## The Rewards Of Divination

Divination means trying to learn hidden knowledge or control outcomes through magic or ritual.

The elders carry payment meant to secure Balaam's services in advance.

This was normal practice for hiring a diviner in the ancient Near East.

It shows Balak is treating this as a business transaction, not a request.

🔮 Divination means seeking hidden power through ritual

💰 Payment carried up front, in hand

🤝 A business deal, not a favor

📖 Balak expects results for his money

## Lodge Here This Night

Balaam does not answer right away.

He tells the elders to wait so he can hear from the LORD first.

That single detail is surprising, a pagan diviner checking with Israel's God before acting.

Whatever else is true about Balaam, he treats this God as real and in charge.

⏳ Balaam delays instead of answering immediately

🙏 He waits to hear from the LORD

😮 Surprising respect from an outside diviner

📖 He already knows who is really in charge

# Numbers 22:9-14
# 🚫 God Refuses Balaam
---
## What Men Are These With Thee

This does not mean God needs information He does not already have.

God already knows exactly who sent these messengers and why.

The question invites Balaam to say it out loud himself.

God often asks questions in Scripture to draw out a confession, not to gather facts.

❓ Not a real question for information

👁️ God already knows the answer

🗣️ Invites Balaam to answer honestly

📖 A pattern God uses throughout Scripture

## Thou Shalt Not Curse The People For They Are Blessed

God gives Balaam a flat, final answer.

Israel is already under blessing, so no curse Balaam could speak would land.

This has nothing to do with Balaam's own skill or reputation.

No payment and no persuasion can undo what God has already declared.

🚫 A clear no from God

✅ Israel already stands blessed

💪 Not about Balaam's own power

📖 No bribe can undo God's word

## The LORD Refuseth To Give Me Leave To Go With You

Balaam reports God's answer, but he leaves something important out.

God's real reason was that Israel is blessed, not just a simple refusal to travel.

Balaam makes it sound like a permission problem instead of a moral one.

The princes hear a partial truth, not the full reason.

✂️ Leaves out the real reason

🚗 Makes it sound like travel permission

🤐 A partial truth, not a full one

📖 The princes never hear the real reason

## Balaam Refuseth To Come With Us

The princes report back to Balak in their own shortened version.

By now the message has changed twice, further from what God actually said.

Each retelling strips away more of the real reason behind the refusal.

Balak only hears that Balaam said no, not why.

🔁 The message changes with each retelling

📉 Less truth survives each time

👂 Balak only hears a flat no

📖 The real reason never reaches him

## And God Came Unto Balaam

A Gentile diviner receiving direct speech from the LORD is not something Scripture treats lightly.

God is not limited to speaking only through Israel's own prophets.

This same God who spoke to Abraham and Moses now speaks to a hired diviner from the east.

It shows God's reach extends beyond the borders of His covenant people.

🌍 God speaks to someone outside Israel

🗣️ Direct, real communication with Balaam

🔗 The same God as Abraham's and Moses'

📖 God's reach is not limited to Israel

# Numbers 22:15-20
# 👑 A Second, Grander Offer
---
## More, And More Honourable Than They

Balak sends a second delegation, larger and higher in rank than the first.

In this culture, the status of the messengers reflected how badly the sender wanted something.

Sending more important men was itself a form of pressure.

Balak is escalating before Balaam even says a word this time.

📈 A bigger, higher ranking delegation

🎭 Status of messengers signaled urgency

⚖️ Pressure applied before any words spoken

📖 Balak escalates before hearing an answer

## Promote Thee Unto Very Great Honour

"Honour" here means public status, wealth, and position, not just praise.

Balak is offering to make Balaam powerful and respected beyond his current life.

This is a bribe dressed up as an opportunity.

The offer targets exactly what Balaam might want most.

👑 Honour means status, wealth, and power

🎁 A bribe dressed as opportunity

🎯 Aimed at what Balaam wants

📖 Sets up the temptation ahead

## If Balak Would Give Me His House Full Of Silver And Gold

This sounds like Balaam refusing any bribe, no matter how large.

But he still asks the men to stay another night before giving a final word.

Someone truly settled in their answer does not need to sleep on it again.

His words say integrity, his actions hint at something less certain.

🗣️ Sounds like a firm refusal

🛏️ Still asks to wait one more night

🤔 Words and actions do not match

📖 A crack starts to show here

## Tarry Ye Also Here This Night

Balaam already has a clear answer from God, given back in verse twelve.

Asking again is not seeking new information.

It looks like hoping for a different answer the second time.

Repeated asking can be its own kind of disobedience.

🗓️ God's answer already came in verse twelve

🔁 Asking again despite that answer

😬 Hoping for a different result

📖 Repeated asking becomes its own disobedience

## If The Men Come To Call Thee, Rise Up, And Go With Them

This is not God changing His mind about Israel being blessed.

God permits the trip while still restricting exactly what Balaam may say.

Permission to go is not the same as approval of Balaam's motives.

God can allow something and still be displeased with the heart behind it.

✅ Permission granted to make the trip

🔒 Still restricted to God's own words

❤️ Motive matters even when action is allowed

📖 Allowed does not always mean approved

## But Yet The Word Which I Shall Say Unto Thee, That Shalt Thou Do

This restriction is the one unbreakable condition on the entire trip.

It gets repeated again later in this same chapter, almost word for word.

No bribe, no title, and no pressure from Balak can change it.

Everything that happens for the rest of the story happens inside this one boundary.

🔒 The one unbreakable condition

🔁 Repeated again later in this chapter

🚫 No bribe can override it

📖 Everything ahead stays inside this boundary

# Numbers 22:21-27
# 🐴 The Donkey Sees What Balaam Cannot
---
## Saddled His Ass

A donkey was ordinary transportation, not a symbol of wealth or status.

Kings and important men often rode donkeys for peaceful travel, while horses were for war.

Balaam sets out on this journey looking completely unremarkable.

Nothing about the start of the trip hints at what is about to happen.

🐴 An ordinary animal for travel

🕊️ Donkeys signaled peaceful, not military, travel

👤 Balaam looks unremarkable leaving home

📖 Nothing warns of what comes next

## God's Anger Was Kindled Because He Went

This looks like a contradiction, since God had just told Balaam to go.

God's anger is not about the trip itself, it is about Balaam's heart on the way.

Balaam had already been told no once and kept pushing for a better answer.

God can permit an action while still judging the desire that drove someone to ask for it.

😠 God's anger seems to contradict verse twenty

❤️ The anger targets Balaam's motive

🔁 He kept pushing after an initial no

📖 Permission and approval are not the same

## The Angel Of The LORD Stood In The Way For An Adversary

"Adversary" translates a Hebrew word that simply means one who opposes or blocks.

It is the same root word behind the name Satan used elsewhere in Scripture.

Here it describes a role the angel is playing, not a title or a name.

God Himself sends this opposition directly into Balaam's path.

⚔️ Adversary means one who blocks or opposes

🔤 Same root as the word Satan

🎭 A role here, not a name

📖 God sends this opposition Himself

## The Ass Saw The Angel Of The LORD

Balaam is a professional seer, someone whose entire reputation rests on seeing what others cannot.

His own donkey sees the angel first, and Balaam sees nothing at all.

The irony sits right at the center of the whole story.

A hired visionary is spiritually blinder than the animal underneath him.

👁️ Balaam's job is supposedly seeing clearly

🐴 His donkey sees the angel first

😲 A sharp, deliberate irony

📖 The animal outsees the professional seer

## A Wall Being On This Side, And A Wall On That Side

The road narrows between two vineyard walls, leaving no room to step aside.

Vineyards in this region were often lined with low stone walls to mark boundaries.

The setting itself starts closing in around Balaam without his awareness.

Each obstacle in this journey gets tighter than the one before it.

🧱 Stone walls lined both sides

🍇 Vineyard boundaries marked with walls

📉 Space to move keeps shrinking

📖 The trap tightens with each verse

## Balaam Smote The Ass

Balaam strikes the animal for what looks like random disobedience.

He has no idea the donkey is actually protecting his life.

This is the first of three strikes in this same scene.

Frustration builds each time without Balaam ever asking why.

👊 The first of three strikes

🐴 Punished for saving Balaam's life

❓ Balaam never stops to ask why

📖 Anger grows without any real cause

## No Way To Turn Either To The Right Hand Or To The Left

The angel now blocks a spot with no room to escape in any direction.

The donkey cannot dodge sideways the way she did twice before.

This is the tightest and final version of the same trap.

Balaam is completely boxed in and still does not know it.

🚧 No room left to move at all

🐴 The donkey has run out of options

🔒 The tightest version of the trap

📖 Balaam is boxed in and unaware

# Numbers 22:28-31
# 🗣️ The Donkey Speaks
---
## The LORD Opened The Mouth Of The Ass

This is not the donkey suddenly gaining her own power of speech.

God directly causes this, the same way He controls everything else in this scene.

The miracle belongs to God, not to the animal.

Even a donkey can speak truth when God decides to use it.

🐴 Not the donkey's own new power

✋ God causes it directly

🎁 The miracle belongs to God

📖 God can speak truth through anything

## Thou Hast Mocked Me

Balaam accuses his donkey of deliberately humiliating him on purpose.

A talking donkey does not stop him to question anything odd about the moment.

His anger is so consuming that he argues with an animal without pausing to wonder why it can talk.

This detail says more about Balaam's blindness than about the donkey.

😤 Accuses the donkey of mocking him

🗣️ Does not question why it can speak

🌀 Anger overrides basic awareness

📖 Reveals how blind Balaam really is

## Am Not I Thine Ass, Upon Which Thou Hast Ridden Ever Since I Was Thine Unto This Day

The donkey appeals to years of faithful, ordinary service.

She has never once acted this way before today.

Her defense is simple, her track record speaks for itself.

Balaam has no answer, and he admits it plainly.

🐴 Years of faithful, ordinary service

🆕 Never once acted this way before

📊 Her record speaks for itself

📖 Balaam has no answer, and says so

## The LORD Opened The Eyes Of Balaam

The same God who opened the donkey's mouth now opens the prophet's eyes.

Only after this does Balaam finally see the angel his own donkey saw three times.

The animal was spiritually ahead of the professional seer the entire time.

Sight, like speech a moment earlier, comes from God, not from Balaam's own skill.

👁️ Mirrors the opened mouth of the donkey

🐴 The donkey saw it first, three times

🎯 Sight comes from God, not skill

📖 The prophet finally catches up

## Bowed Down His Head, And Fell Flat On His Face

This posture was the standard way to show total submission before a superior in this culture.

Balaam does not argue or defend himself once he actually sees the angel.

Everything changes the instant he can finally see what was really there.

The man who argued with a donkey now falls silent before God's messenger.

🙇 A posture of total submission

🤐 No arguing once he truly sees

⚡ Instant change once sight returns

📖 Silence replaces his earlier anger

# Numbers 22:32-35
# ⚔️ The Angel Confronts Balaam
---
## Thy Way Is Perverse Before Me

"Perverse" here means crooked or turned in a wrong direction.

It does not carry the narrower modern meaning the word often has today.

The angel is describing Balaam's whole course, not just this one road.

His direction, not only his destination, has gone wrong.

🔀 Perverse means crooked or wrong direction

📆 Not the word's modern narrower sense

🛤️ Describes his whole course, not one step

📖 Direction, not just destination, is the issue

## I Had Slain Thee, And Saved Her Alive

The angel states plainly what almost happened on this road.

The donkey would have lived, and Balaam would have died.

The animal Balaam struck three times was the one thing keeping him alive.

This reversal is meant to sting.

💀 Balaam nearly died on this road

🐴 The donkey would have survived instead

🔄 A stinging reversal of value

📖 The donkey saved the man who beat her

## I Have Sinned For I Knew Not That Thou Stoodest In The Way

This confession sounds complete, but look closely at what it actually admits.

Balaam only owns up to not seeing the angel on the road.

He says nothing about the deeper issue, his own greed and repeated pushing for a better answer.

A partial confession can sound sincere while still avoiding the real problem.

🗣️ Sounds like a full confession

👁️ Only admits missing the angel

💰 Says nothing about his own greed

📖 Partial honesty, not full repentance

## If It Displease Thee, I Will Get Me Back Again

Balaam offers to turn around and abandon the whole trip.

The angel does not take him up on the offer.

A real door to walk away opens here and is simply left unused.

Sometimes the way out is available and gets ignored anyway.

🔙 Offers to abandon the trip entirely

🚪 The angel does not accept the offer

🕳️ A real exit goes unused

📖 Available is not the same as taken

## But Only The Word That I Shall Speak Unto Thee, That Thou Shalt Speak

This is the same restriction from verse twenty, repeated almost word for word.

Twice now this single condition has governed the entire journey.

Nothing about the donkey, the anger, or the confession changes this rule.

This one boundary controls everything that happens for the rest of the story.

🔁 Repeats the restriction from verse twenty

🔒 The one unchanging condition

🐴 Untouched by everything with the donkey

📖 This boundary controls the rest of the story

# Numbers 22:36-41
# 🤝 Balak Meets Balaam
---
## Balak Went Out To Meet Him

Balak travels all the way to the border himself instead of waiting in his own capital.

Kings usually had messengers bring guests to them, not the other way around.

Balak breaking that pattern shows how urgent this meeting is to him.

He has staked his nation's safety on this one visitor.

🚗 Balak travels to the border himself

👑 Breaks the usual pattern for a king

⏳ Signals how urgent this is

📖 His nation's safety rides on this visit

## Did I Not Earnestly Send Unto Thee To Call Thee

This greeting sounds welcoming at first, but it is actually a complaint.

Balak is still frustrated about the earlier delay from Balaam's first refusal.

Even though Balaam eventually came, the irritation from before has not faded.

Old frustration surfaces the moment they finally meet face to face.

😤 A complaint disguised as a greeting

⏳ Frustration left over from the first delay

🤝 Surfaces even though Balaam did come

📖 Old irritation outlasts the outcome

## The Word That God Putteth In My Mouth, That Shall I Speak

Balaam restates the exact restriction God gave back in verses twenty and thirty five.

He sets Balak's expectations honestly before any curse is even attempted.

No amount of Moabite gold changes what Balaam is actually allowed to say.

The most honest moment in this whole exchange comes from the hired diviner, not the king.

🗣️ Restates God's restriction plainly

🎯 Sets honest expectations up front

🚫 No bribe changes what he can say

📖 Honesty comes from the diviner, not the king

## Kirjathhuzoth

This Moabite city name likely means "city of streets."

It appears nowhere else in the entire Bible outside this one verse.

Naming it grounds the story in a real, specific place on the map.

The journey is not vague or symbolic, it moves through an actual town.

🏙️ Likely means city of streets

📍 Appears only this once in Scripture

🗺️ Grounds the story in real geography

📖 A real town, not a symbolic stop

## Balak Offered Oxen And Sheep

Balak hosts a formal feast honoring both Balaam and his own officials.

Shared meals in this culture built goodwill and a sense of obligation.

This happens before Balaam does any actual work as a diviner.

Hospitality here is strategy, not just kindness.

🐂 A formal feast for honored guests

🤝 Meals built goodwill and obligation

⏳ Comes before any real work begins

📖 Hospitality used here as strategy

## The High Places Of Baal

"High places" were elevated hilltop sites used for worship in this region.

They were believed to bring a worshiper physically closer to the gods.

Baal was the chief storm and fertility god worshiped across Canaan and Moab.

Balak picks this location on purpose, hoping the setting itself helps the coming curse work.

⛰️ Elevated hilltop worship sites

⚡ Baal was the chief storm god

🌾 Also worshiped for fertility and harvest

📖 The setting is chosen to help the curse

## That Thence He Might See The Utmost Part Of The People

Balak does not show Balaam Israel's entire camp from this spot.

He deliberately points him toward only a partial, limited view.

A small detail like this looks minor here but matters again once Balaam starts to speak.

What Balak controls now is exactly what he loses control of later.

👀 Only a partial view of Israel shown

✂️ A deliberate, limited angle

🔮 Matters again once Balaam speaks

📖 What Balak controls now slips later
`.trim();

export const NUMBERS_TWENTY_TWO_PERSONAL_SECTIONS = parseNumbersTwentyTwoRawNotes(NUMBERS_TWENTY_TWO_RAW_NOTES);
