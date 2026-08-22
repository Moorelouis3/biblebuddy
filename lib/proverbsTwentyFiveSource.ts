export type ProverbsTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyFiveRawNotes(rawText: string): ProverbsTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 25:${startVerse}` : `Proverbs 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 25 sections, received " + sections.length);
  }

  return sections;
}



const PROVERBS_TWENTY_FIVE_RAW_NOTES = `# Proverbs 25:1-3
# 👑 Kings And Hidden Things
---
## The Men Of Hezekiah King Of Judah Copied Out

Copied out means these scribes gathered and recorded proverbs of Solomon.

Those sayings had been passed down separately before this point.

Hezekiah reigned about two hundred fifty years after Solomon died.

His officials treated Solomon's old sayings as worth preserving for a new generation.

Proverbs was collected in stages across centuries, not written all at once.

📜 Copied out means gathered and recorded

👑 Hezekiah ruled long after Solomon

🖋️ His scribes preserved old sayings

📖 Proverbs grew across many generations

## It Is The Glory Of God To Conceal A Thing

Conceal here means God keeps some things hidden instead of fully explaining them.

God does not owe anyone a complete explanation for everything He does.

His glory includes a mystery that stays beyond human reach.

A God who could be fully explained would not be much of a God at all.

🌫️ Conceal means keep hidden on purpose

👑 God owes no full explanation

✨ Mystery is part of His glory

📖 A fully explained God would be small

## The Honour Of Kings Is To Search Out A Matter

Search out a matter means digging for the truth instead of guessing.

A human king does not know everything the way God does.

So digging for facts is his job, not a weakness in him.

Good rulers were expected to examine a case before ruling on it.

God hides, kings must search, and that contrast is the whole point here.

🔍 Search out means dig for truth

👑 Kings lack God's full knowledge

⚖️ Rulers must examine before deciding

📖 God hides, kings must dig

## The Heaven For Height, And The Earth For Depth

This line names two things nobody can fully measure.

No one has ever found the edge of the sky.

No one has ever found the true bottom of the earth.

The pair stands for a distance too large to measure.

🌌 Heaven's height has no known edge

🌍 Earth's depth has no known bottom

📏 Both stand for the immeasurable

📖 This sets up the next line

## The Heart Of Kings Is Unsearchable

Unsearchable means a king's true thoughts cannot be fully known by his people.

A king's real motives are compared here to the sky and the earth.

Subjects of a king often had to guess what he was really planning.

That is a human limit God does not share.

God does not merely hide His heart from us.

He already knows everything without needing to search.

🫀 Unsearchable means thoughts stay hidden

👑 A king's plans are hard to know

🤷 Subjects often had to guess

📖 God has no such limit

# Proverbs 25:4-7
# ⚒️ Removing What Does Not Belong
---
## Take Away The Dross From The Silver

Dross means the worthless waste left over after metal is melted down.

Silversmiths heated silver until the impurities rose to the surface and could be skimmed off.

Only real silver was left once the dross was removed.

The process pictures anything false or corrupt being separated out from what is good.

🔥 Dross means leftover waste from melting

🥈 Silversmiths skimmed it off the top

✨ Only true silver remained after

📖 This pictures removing what is false

## There Shall Come Forth A Vessel For The Finer

The finer is the craftsman who worked the purified silver into something useful.

Once the dross was gone, the metal could finally be shaped into a cup or a tool.

Removing corruption is not the end goal by itself.

It clears the way for something valuable to be built.

⚒️ The finer shapes the purified metal

🥈 Purified silver becomes something useful

🧱 Removing corruption makes room to build

📖 Cleaning the way comes before building

## Take Away The Wicked From Before The King

This line applies the silver refining picture directly to government.

Wicked advisers near a throne act like impurities hidden inside good silver.

A king surrounded by corrupt counselors will rule badly even with good intentions.

Removing bad influence is what allows good leadership to actually happen.

⚖️ Wicked advisers act like impurities

👑 Bad counsel corrupts good leadership

🚪 Removing them clears the way to rule well

📖 The next line names the result

## Put Not Forth Thyself In The Presence Of The King

Put not forth thyself means do not push your own importance forward.

This warns against grabbing attention or a higher seat in front of powerful people.

Ancient royal courts had strict seating and speaking order based on rank.

Claiming a rank that was not given to you was seen as foolish, not confident.

🙅 Put forth thyself means self promotion

👑 Royal courts had strict rank

🪑 Claiming an unearned seat looked foolish

📖 Confidence is not the same as self promotion

## Stand Not In The Place Of Great Men

This repeats the same warning using a different picture, standing in someone else's spot.

Taking a position meant for someone more important invited public embarrassment.

The wisdom here is patience about your own status rather than grabbing for it.

Trying to look important by standing in the wrong place backfires.

🚷 Standing in another's place invited shame

⏳ Patience about status is wiser

🎭 Faking importance backfires publicly

📖 Real status is not seized, it is given

## Come Up Hither

Come up hither means being invited to move up to a better or higher position.

Being asked to move up in front of others is a public honor.

Jesus later used this exact idea in a parable about wedding seats in Luke chapter fourteen.

Take the lower seat first and let someone else lift you up.

🙌 Come up hither means being invited higher

🎉 Being invited up is a public honor

📖 Jesus taught this same lesson later

➡️ Let others lift you, do not lift yourself

## Than That Thou Shouldest Be Put Lower

Being put lower means publicly demoted after assuming too much.

This is the humiliation half of the comparison, the opposite of being called up.

Taking a high seat you were not given risks being asked to move down in front of everyone.

The embarrassment of being lowered is far worse than never having claimed the seat at all.

📉 Put lower means publicly demoted

😳 This is public humiliation

🪑 An unearned seat risks being taken back

📖 Better to wait than to be demoted

# Proverbs 25:8-10
# 🤐 Handling Conflict And Secrets
---
## Go Not Forth Hastily To Strive

Strive here means to argue or bring a legal complaint against someone.

Hastily means rushing into a conflict before thinking it through.

Ancient disputes were often settled in public, in front of the city elders at the gate.

A rushed accusation could not be taken back once it was spoken.

🏃 Hastily means rushing without thinking

⚖️ Strive means arguing or accusing

🏛️ Disputes were often settled in public

📖 Words spoken in haste cannot be unspoken

## When Thy Neighbour Hath Put Thee To Shame

This names the real risk of rushing into a fight, being proven wrong in public.

If new facts come out later, the hasty accuser is the one left embarrassed.

The warning is practical, not just about being nice, it is about protecting your own reputation.

Wisdom checks the facts before making a public accusation.

😳 The risk is public embarrassment

🕵️ New facts can undo a hasty claim

🛡️ This protects your own reputation

📖 Check facts before you accuse

## Debate Thy Cause With Thy Neighbour Himself

Debate thy cause means work out the disagreement directly with the person involved.

Going straight to the person, instead of everyone else first, is the wiser path.

Talking to others about a conflict before talking to the person only spreads the problem.

Direct conversation gives the actual disagreement a chance to be solved.

🗣️ Debate thy cause means talk it out directly

👥 Go to the person first, not everyone else

🌊 Gossip spreads the problem instead of solving it

📖 Direct talk gives real solutions a chance

## Discover Not A Secret To Another

Discover here is an old word meaning to reveal or expose.

This warns against telling other people the private details shared during a dispute.

Once a private matter is repeated, it can never be fully taken back.

Trust in a relationship depends on keeping what was shared privately actually private.

🔓 Discover means reveal or expose

🤫 Private details should stay private

💧 Spilled secrets cannot be gathered back

📖 Trust depends on kept confidences

## Lest He That Heareth It Put Thee To Shame

Heareth it refers to anyone who later finds out the secret got out.

If the secret spreads, people will know who leaked it first.

The shame lands on the person who could not be trusted, not the original problem.

A ruined reputation for gossip can follow someone long after the original conflict is forgotten.

👂 Heareth it means whoever finds out

🗣️ People trace leaks back to their source

😳 Shame falls on the one who told

📖 A reputation for gossip outlasts the conflict

# Proverbs 25:11-14
# 🍎 Words That Land Well
---
## A Word Fitly Spoken

Fitly spoken means a word said at exactly the right moment, in exactly the right way.

Timing changes everything about whether good advice actually helps someone.

The same true statement can comfort or wound depending only on when it is said.

Wisdom is not only knowing what is true, it is knowing when to say it.

⏰ Fitly spoken means perfectly timed

🎯 Timing changes how truth lands

💔 The same words can help or wound

📖 Wisdom includes knowing when to speak

## Is Like Apples Of Gold In Pictures Of Silver

This pictures fruit made of gold set inside a carved silver frame or bowl.

It describes something rare and beautifully crafted, not a real piece of fruit.

The image pairs two valuable things together for maximum beauty and worth.

A well timed word is treated here as a genuine work of art.

🥇 Apples of gold means something crafted and rare

🥈 Silver framing adds to the beauty

💎 Two valuable things paired together

📖 A good word is treated like art

## As An Earring Of Gold, And An Ornament Of Fine Gold

These are two examples of fine, carefully made jewelry worn to show wealth or beauty.

Gold jewelry in the ancient world was expensive and often passed down as an heirloom.

The image sets up an expectation of something precious and well made.

The next line reveals what this jewelry actually stands for.

💍 An earring pictures fine jewelry

👑 Gold jewelry showed wealth in ancient times

✨ It sets up something precious

📖 The comparison is completed next

## So Is A Wise Reprover Upon An Obedient Ear

A reprover is someone who corrects you honestly, even when it is uncomfortable to hear.

An obedient ear belongs to a person actually willing to listen and change.

Correction only works as intended when both people are doing their part.

Honest correction, received well, is compared here to wearing fine jewelry, something valuable, not something shameful.

🗣️ A reprover corrects you honestly

👂 An obedient ear is willing to listen

🤝 Correction takes two willing people

📖 Honest correction is treated as a treasure

## As The Cold Of Snow In The Time Of Harvest

Snow during harvest season would have been rare and unusually refreshing in that climate.

Harvest work was hot, exhausting labor done under the sun for long hours.

Something cool arriving in the middle of that heat would feel like a huge relief.

The picture sets up exactly what a faithful messenger feels like to the person waiting.

❄️ Snow in harvest was rare and refreshing

🌾 Harvest work was hot and exhausting

😌 Something cool felt like huge relief

📖 This sets up the messenger comparison

## So Is A Faithful Messenger To Them That Send Him

A faithful messenger delivers the message exactly as it was given, without changing it.

Before writing or fast travel existed, an entire plan depended on the messenger's honesty.

A trustworthy messenger refreshed the sender the same way cold snow refreshed a harvest worker.

Faithfulness in a small job like carrying a message was treated as a genuine gift.

📬 A faithful messenger delivers the message exactly

📜 Plans depended entirely on the messenger's honesty

😌 A trustworthy messenger brought relief to the sender

📖 Faithfulness in small jobs is a real gift

## Whoso Boasteth Himself Of A False Gift

A false gift is one that was promised loudly but never actually given.

Boasting about generosity you never followed through on made the promise worse than silence.

Public promises carried social weight in this culture, so breaking one was a real offense.

Empty words about giving are worse than simply saying nothing at all.

🎁 A false gift is a promise never kept

📢 Boasting made the broken promise worse

🤝 Public promises carried real social weight

📖 Empty words are worse than silence

## Is Like Clouds And Wind Without Rain

Clouds and wind usually signal that rain is finally coming after dry weather.

In a farming society, a false promise of rain was a bitter disappointment.

The clouds build up hope, then deliver nothing, exactly like the false gift.

Something that looks like help but delivers nothing is worse than no promise at all.

☁️ Clouds and wind usually signal rain

🌧️ A farming culture depended on that rain

😔 False hope builds up, then delivers nothing

📖 Looking helpful without helping disappoints the most

# Proverbs 25:15-17
# 😌 Patience And Its Limits
---
## By Long Forbearing Is A Prince Persuaded

Forbearing means staying patient and calm instead of demanding an answer right away.

A prince here means any powerful ruler who could easily refuse a request.

Patience, not pressure, is shown as the thing that actually changes a powerful person's mind.

Pushing hard on someone in power usually backfires and closes the door instead.

⏳ Forbearing means staying patient

👑 A prince is a powerful ruler

🕊️ Patience changes minds better than pressure

📖 Pushing hard usually backfires

## A Soft Tongue Breaketh The Bone

Soft tongue means gentle, careful speech instead of harsh or forceful words.

Bone here stands for something extremely hard and resistant to being changed.

The image is intentionally surprising, something gentle succeeding where force would fail.

Gentle words can wear down stubborn resistance that shouting never could.

🗣️ A soft tongue means gentle speech

🦴 Bone stands for stubborn resistance

😲 Gentle succeeds where force fails

📖 Kindness can outlast stubbornness

## Hast Thou Found Honey? Eat So Much As Is Sufficient

Wild honey was a rare treat in the ancient world, not a common pantry item.

Finding a hive was exciting enough to tempt anyone into eating too much of it.

Sufficient means only as much as your body can actually handle well.

Even a genuinely good thing becomes harmful once it is taken past its healthy limit.

🍯 Wild honey was a rare treat

😋 Finding it tempted people to overeat

⚖️ Sufficient means only what is healthy

📖 Even good things can be overdone

## Withdraw Thy Foot From Thy Neighbour's House

Withdraw thy foot means visit less often, not stop being friends entirely.

This proverb assumes close, frequent visiting was normal between neighbors in this culture.

Even a welcome guest can wear out their welcome by showing up too often.

Wisdom here protects the friendship itself by respecting the other person's time and space.

🚶 Withdraw thy foot means visit less

🏠 Frequent visiting was normal back then

😩 Overstaying wears out a welcome

📖 Respecting space protects the friendship

# Proverbs 25:18-20
# 💔 Betrayal And Bad Timing
---
## A Man That Beareth False Witness Against His Neighbour

Beareth false witness means lying under oath about someone else, usually in a legal setting.

Ancient courts relied heavily on eyewitness testimony since there were no cameras or records.

A false witness could destroy an innocent person's life, property, or even their family.

This sin was taken seriously enough to earn its own place in the Ten Commandments.

⚖️ False witness means lying under oath

🏛️ Courts relied entirely on eyewitnesses

💔 A lie could destroy an innocent life

📖 This sin has its own commandment

## Is A Maul, And A Sword, And A Sharp Arrow

A maul was a heavy hammer used to crush or break things apart.

All three, maul, sword, and arrow, are weapons meant to seriously wound or kill.

Stacking three separate weapons together emphasizes just how much damage a lie can do.

Words alone are being described here as genuine, physical weapons.

🔨 A maul is a heavy hammer

⚔️ All three images are weapons

💥 Stacking them shows the scale of harm

📖 Lies are treated as real weapons

## Confidence In An Unfaithful Man In Time Of Trouble

Confidence here means relying on someone to come through for you when it matters most.

An unfaithful man is someone who promises help but does not actually deliver it.

Time of trouble is exactly when a person's true reliability finally gets tested.

Trusting the wrong person is often only discovered at the worst possible moment.

🤝 Confidence means relying on someone

🙅 Unfaithful means promising without delivering

⏰ Trouble reveals who was truly reliable

📖 Bad trust is discovered too late

## Is Like A Broken Tooth, And A Foot Out Of Joint

A broken tooth throbs with pain every single time you try to use it.

A foot out of joint fails you the exact moment you try to stand or walk.

Both images describe something you desperately needed working, failing at the worst moment.

Relying on an unfaithful person hurts exactly when you can least afford the pain.

🦷 A broken tooth hurts with every use

🦶 A foot out of joint fails when needed

⏰ Both fail at the worst moment

📖 Bad support hurts most under pressure

## As He That Taketh Away A Garment In Cold Weather

Garments in the ancient world doubled as blankets people needed to survive cold nights.

Taking someone's coat away in cold weather was cruel, not just careless.

The image describes an action that makes someone else's suffering worse on purpose.

This sets up the comparison that follows about badly timed cheerfulness.

🧥 A garment doubled as a blanket

❄️ Removing it in the cold was cruel

😖 It makes suffering worse on purpose

📖 This sets up the next comparison

## And As Vinegar Upon Nitre

Nitre was a natural mineral used like soda for cleaning in the ancient world.

Pouring vinegar on nitre caused it to fizz, react badly, and lose its cleaning power.

The two substances actively worked against each other instead of blending well.

This pictures two things that should never be combined, since one ruins the other.

🧪 Nitre was a cleaning mineral

💥 Vinegar made it fizz and react badly

⚠️ The two substances worked against each other

📖 Some combinations only cause harm

## So Is He That Singeth Songs To An Heavy Heart

A heavy heart means someone weighed down by real grief or sorrow.

Singing cheerful songs at someone grieving ignores what they actually need in that moment.

The action is not evil, but it is badly mismatched to the moment.

Real comfort requires paying attention to what a person needs, not just meaning well.

💔 A heavy heart means real grief

🎵 Cheerful songs can ignore real pain

⏰ The timing here is the whole problem

📖 Comfort requires paying attention, not just good intentions

# Proverbs 25:21-24
# 🔥 Kindness As Strategy
---
## If Thine Enemy Be Hungry, Give Him Bread To Eat

This command goes directly against the normal instinct to see an enemy suffer.

Meeting a real, physical need, food and water, is named specifically here, not vague goodwill.

Kindness toward an enemy was radical advice in a culture built around loyalty to your own side.

Paul later quotes this exact verse in Romans chapter twelve.

🍞 The command overrides the instinct for revenge

💧 Real physical needs are named specifically

🌍 This was radical advice in that culture

📖 Paul later quotes this exact verse

## For Thou Shalt Heap Coals Of Fire Upon His Head

This is not a command to physically hurt someone with fire.

Many scholars believe it points to an ancient custom.

Someone whose fire went out would carry hot coals home on their head to relight it.

In that picture, the coals represent a needed gift given freely to someone in need.

Undeserved kindness can produce shame and change in an enemy that revenge never could.

🔥 This is not literal physical harm

🏺 It likely points to an ancient fire custom

🎁 The coals represent a needed gift

📖 Kindness can change a heart revenge cannot

## And The LORD Shall Reward Thee

This line answers an obvious question, why should kindness to an enemy ever pay off?

The reward for this kind of costly mercy is promised from God, not from the enemy.

You are never asked to trust that the enemy will change or repay you back.

Trusting God with the outcome is what makes this kind of kindness possible at all.

❓ This answers the obvious objection

👑 The reward comes from God, not the enemy

🙏 You are never asked to trust the enemy

📖 Trusting God makes costly kindness possible

## The North Wind Driveth Away Rain

In this region, the north wind was known for clearing storm clouds out of the sky.

People could predict the weather by watching which direction the wind was blowing from.

This is simply an observation about local weather patterns.

The next line uses this familiar weather fact to describe something about people.

🌬️ The north wind cleared storm clouds

🌦️ People predicted weather by wind direction

🔎 This is a simple observation

📖 The next line applies it to people

## So Doth An Angry Countenance A Backbiting Tongue

Backbiting means talking badly about someone behind their back instead of to their face.

Countenance means the look on someone's face, their visible expression.

Just as wind clears a sky, a visibly angry face can stop gossip before it spreads.

Confronting gossip openly, instead of ignoring it, is what actually shuts it down.

🗣️ Backbiting means gossiping behind someone's back

😠 Countenance means a visible facial expression

🌬️ An angry look can stop gossip early

📖 Confronting gossip openly shuts it down

## Better To Dwell In The Corner Of The Housetop

Flat rooftops in this region were used as an extra room of the house.

A tiny corner outside, exposed to weather, was still considered livable space.

The comparison sets an extremely low bar for where someone would rather live.

The next line reveals exactly what makes indoor living worse than that.

🏠 Rooftops were used as extra rooms

🌦️ A rooftop corner was exposed to weather

📉 This sets a very low bar

📖 The next line explains the comparison

## Than With A Brawling Woman In A Wide House

Brawling here means constant arguing, nagging, or conflict inside the home.

A wide house means spacious and comfortable, everything most people wanted.

Even comfort and space cannot make up for constant conflict inside a home.

Peace matters more than comfort when it comes to where a person actually wants to live.

😤 Brawling means constant conflict at home

🏡 A wide house means comfort and space

⚖️ Comfort cannot outweigh constant conflict

📖 Peace matters more than comfort

# Proverbs 25:25-28
# 💧 Restraint And Its Absence
---
## As Cold Waters To A Thirsty Soul

Cold water in a hot climate, with no refrigeration, was a rare and welcome relief.

Thirsty soul describes someone in real need, not just mild discomfort.

The image pictures something small that meets a deep need at exactly the right time.

The next line names what this relief actually stands for.

💧 Cold water was a rare relief

🥵 A thirsty soul is in real need

⏰ Small things can meet deep needs

📖 The next line names the comparison

## So Is Good News From A Far Country

Before fast travel or communication, news from far away could take months to arrive.

Not knowing what had happened to distant family or friends caused real, ongoing worry.

Good news arriving after a long wait brought the same relief as water to someone thirsty.

Waiting well for good news, without giving up hope, is part of what this proverb quietly teaches.

📬 News from far away could take months

😟 Not knowing caused ongoing worry

😌 Good news brought deep relief after waiting

📖 Hope matters while you wait

## A Righteous Man Falling Down Before The Wicked

Falling down here means giving in to pressure and abandoning what is right.

A righteous person is expected to stand firm, which makes this failure especially disappointing.

The wicked winning this way spreads harm well beyond the one person who gave in.

The next two lines picture exactly what that failure looks like.

😞 Falling down means giving in to pressure

⚖️ Righteous people are expected to stand firm

🌊 The harm spreads beyond just one person

📖 The next lines picture this failure

## Is As A Troubled Fountain

A fountain is a spring that a whole community depended on for clean water.

Troubled means the water has been stirred up, muddied, and made unsafe to drink.

A source everyone trusted has suddenly become something nobody can rely on.

That is exactly what a righteous person giving in to evil does to everyone watching.

⛲ A fountain was a shared water source

🌊 Troubled means stirred up and unsafe

😔 A trusted source becomes unreliable

📖 One person's failure affects everyone watching

## And A Corrupt Spring

A spring, unlike a well, was expected to naturally refresh and renew itself.

Corrupt here means the source itself has gone bad at its very root.

This image is worse than the fountain, since even the water's source cannot be trusted anymore.

When the source itself fails, the damage runs far deeper than a single bad moment.

🌊 A spring should naturally stay fresh

☠️ Corrupt means the source itself is bad

📉 This is worse than a troubled fountain

📖 A failed source causes deeper damage

## It Is Not Good To Eat Much Honey

This repeats the earlier warning from verse sixteen for a reason.

Even a genuinely good and sweet thing turns harmful once it is taken too far.

The lesson widens here from honey specifically to anything good taken to excess.

The next line names exactly which kind of excess this proverb is really warning about.

🍯 This repeats the earlier honey warning

⚖️ Good things turn harmful in excess

🌍 The lesson widens beyond just honey

📖 The next line names the real target

## So For Men To Search Their Own Glory Is Not Glory

Search their own glory means chasing praise and honor for yourself on purpose.

Real honor comes from others recognizing something true, not from demanding it for yourself.

Chasing your own glory directly cancels out the very thing you are chasing.

Wanting to be honored, and grabbing for that honor yourself, are opposites, not the same thing.

🏆 Searching your own glory means chasing praise

👥 Real honor comes from others, not yourself

🔄 Chasing it cancels out the thing itself

📖 Wanting honor and grabbing for it are opposites

## He That Hath No Rule Over His Own Spirit

Rule over his own spirit means the ability to control your own reactions and desires.

A person with no self control is compared next to a specific, visible kind of failure.

Self control was viewed in this culture as a form of real, personal strength.

Without it, a person is left exposed to whatever pressure or temptation shows up next.

🛡️ Rule over his spirit means self control

💪 Self control was seen as real strength

⚠️ Without it, a person is left exposed

📖 The next image shows what that looks like

## Is Like A City That Is Broken Down, And Without Walls

City walls were the entire defense system protecting an ancient town from attack or raid.

A city without walls could not stop anyone or anything from getting in.

A person without self control has no defense against sin, temptation, or bad decisions.

Self control is not a small virtue here, it is the wall that keeps everything else standing.

🏰 Walls were an ancient city's entire defense

🚪 No walls meant no protection from attack

🛡️ No self control means no defense at all

📖 Self control holds everything else up`.trim();

export const PROVERBS_TWENTY_FIVE_PERSONAL_SECTIONS = parseProverbsTwentyFiveRawNotes(PROVERBS_TWENTY_FIVE_RAW_NOTES);
