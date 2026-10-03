export type EzekielTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyRawNotes(rawText: string): EzekielTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 20:${startVerse}` : `Ezekiel 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Ezekiel 20 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_RAW_NOTES = `# Ezekiel 20:1-4
# 🚪 Elders Come To Inquire, And Are Refused
---
## 📅 In The Seventh Year, In The Fifth Month

This date marks about six years into Ezekiel's exile in Babylon.

Scholars count it from the same deportation that took Ezekiel there with King Jehoiachin.

That puts this meeting around the year 591 BC.

Ezekiel dates almost every major vision this way, like a journal entry.

Each date anchors a vision to a real moment in a real exile, not a vague someday.

🗓️ the seventh year counts from Ezekiel's exile
📆 this lands around 591 BC
⏳ real history anchors every vision
📖 Ezekiel dates his visions like a journal

## 👴 Elders Of Israel Came To Enquire Of The LORD

Elders were the respected leaders of each family or tribe.

To "enquire" of the LORD meant asking a prophet to bring back a word from God.

These elders were exiles in Babylon, far from the temple in Jerusalem.

Even in exile, they still expected God to answer through His prophet.

Losing the temple did not stop them from seeking God's voice.

👴 elders were respected family leaders
🙏 enquire means asking for a word from God
🏛️ these elders were exiles in Babylon
📖 they still expected God to answer

## 🔁 Wilt Thou Judge Them, Son Of Man, Wilt Thou Judge Them

God repeats this question twice in a row on purpose.

Hebrew writers often doubled a line like this for emphasis.

"Judge" here does not mean a courtroom trial.

It means confronting them honestly with the truth about themselves.

God is telling Ezekiel exactly how serious this confrontation needs to be.

🔁 the question is repeated for emphasis
⚖️ judge means confront with truth
🚫 this is not a courtroom trial
📖 God wants a serious confrontation

## 🙅 I Will Not Be Enquired Of By You

This does not mean God refuses to hear anyone who prays.

These elders still worshipped their old idols from Egypt.

God refuses to hand out guidance while they hold onto both God and idols.

He will not be used as one more good luck charm.

God wants to be asked honestly, not used as one option among many.

🙅 this is not a refusal of all prayer
🛐 the elders still worshipped old idols
⚖️ God is not a backup plan
📖 He wants honest worship, not a hedge

## 🤢 Cause Them To Know The Abominations Of Their Fathers

"Abominations" means things that disgust God, usually idols and the practices around them.

God tells Ezekiel to walk the elders through their family history of idol worship.

That history goes back generations, long before this moment in Babylon.

Knowing the real history was the first step toward any honest conversation with God.

🤢 abominations means things that disgust God
👪 this history goes back generations
🏺 mainly idols and idol worship
📖 honesty starts with facing the past

# Ezekiel 20:5-9
# 🇪🇬 The Day I Chose Israel, In Egypt
---
## ✋ Lifted Up Mine Hand Unto The Seed Of The House Of Jacob

Lifting up a hand like this was an ancient way of swearing an oath.

It is the same motion still used in courtrooms today.

God is swearing a formal, binding promise to Jacob's descendants.

This phrase repeats many times through this chapter for that exact reason.

Every promise in this chapter traces back to one sworn oath.

✋ lifting a hand means swearing an oath
⚖️ it works like a courtroom gesture
👪 the seed of Jacob means his descendants
📖 one sworn oath anchors the whole chapter

## 🍯 A Land Flowing With Milk And Honey

This phrase describes a land rich enough to feed its people easily.

"Milk" means healthy herds with plenty to spare.

"Honey" means fruit and food so plentiful that sweetness was common, not rare.

This was the land promised to Israel long before they ever left Egypt.

🐄 milk pictures healthy, plentiful herds
🍯 honey pictures plentiful, sweet food
🗺️ this describes the promised land
📖 the promise came before the exodus

## 👀 Cast Away Every Man The Abominations Of His Eyes

"Abominations of his eyes" means the idols each person looked to and desired.

This does not mean literal objects stuck to someone's eyes.

It means the idols that caught their attention and pulled their devotion away.

God asked for this while they were still living in Egypt, before the exodus even began.

👀 abominations of his eyes means desired idols
🙅 this is not literal, it is devotion
🏺 Egypt's idols pulled their attention
📖 God asked for loyalty even in Egypt

## 🔁 They Rebelled Against Me

This is the first time the chapter's main pattern shows up.

Israel rebels even before leaving Egypt, before the Red Sea, before Sinai.

The rebellion was not caused by hardship in the wilderness later on.

It started early, while they were comfortable and still only hoping for rescue.

🔁 rebellion is the chapter's repeating pattern
🇪🇬 it started while still in Egypt
😴 comfort did not stop the rebellion
📖 the pattern begins earlier than expected

## 🔥 I Will Pour Out My Fury Upon Them

"Fury" means God's full, righteous anger at sin.

Pouring it out pictures judgment falling all at once, like water from a jar.

This exact warning repeats three times later in the chapter.

Each time, something holds the judgment back before it is fully carried out.

🔥 fury means God's full righteous anger
🏺 pouring it out pictures sudden judgment
🔁 this warning repeats three times
📖 something holds it back each time

## 🛡️ I Wrought For My Name's Sake, That It Should Not Be Polluted Before The Heathen

"Heathen" means the surrounding nations who did not worship the LORD.

"Polluted" here means dishonored or made to look weak and defeated.

God held back full judgment so the nations would not mock His own name.

His mercy toward Israel was tied to His concern for His own name among the watching world.

🌍 heathen means the surrounding nations
💔 polluted means dishonored or disgraced
🛡️ God protected His own name
📖 mercy and reputation are tied together

# Ezekiel 20:10-13
# 📜 Statutes, Judgments, And Sabbaths In The Wilderness
---
## 📜 I Gave Them My Statutes, And Shewed Them My Judgments

"Statutes" were the fixed laws God gave, like the Ten Commandments.

"Judgments" were the specific rulings that applied those laws to real situations.

Together they gave Israel a full legal and moral system to live by.

This happened at Mount Sinai, right after they left Egypt.

📜 statutes means fixed, standing laws
⚖️ judgments means specific legal rulings
🏔️ both were given at Sinai
📖 together they formed Israel's whole law

## 🔁 Which If A Man Do, He Shall Even Live In Them

This line repeats three times across the chapter like a refrain.

It does not mean obeying the law earns eternal life in heaven.

It means a person who kept these laws could expect a full, stable life in the land.

Breaking them brought real consequences right away, not just someday.

🔁 this refrain repeats three times
🚫 it is not about earning heaven
🏡 it means a stable life in the land
📖 obedience brought real, present blessing

## 🛑 I Gave Them My Sabbaths, To Be A Sign Between Me And Them

A "sabbath" was a weekly day set apart for rest, no regular work allowed.

A "sign" here means a visible mark that showed who Israel belonged to.

Resting on a set day looked strange to every nation around them.

That strangeness itself pointed back to the God who gave the command.

🛑 sabbath means a weekly day of rest
🏷️ sign means a visible mark of belonging
👀 the rest looked strange to outsiders
📖 the strangeness pointed back to God

## ✨ That I Am The LORD That Sanctify Them

"Sanctify" means to set something apart as holy and different from everything else.

God is not just giving Israel rules here, He is claiming them as His own.

The sabbath was one visible proof of that claim every single week.

Keeping it well meant living like a people who actually belonged to God.

✨ sanctify means set apart as holy
🏷️ God was claiming Israel as His own
🛑 the sabbath proved that claim weekly
📖 keeping it showed who they belonged to

## 🔁 Their Sabbaths They Greatly Polluted

This is the second time the chapter's rebellion pattern repeats.

This generation left Egypt free, carrying no excuse from their parents' slavery.

They still broke the very sign meant to mark them as God's own.

The pattern was not about circumstances, it was about the heart.

🔁 the rebellion pattern repeats again
🆓 this generation left Egypt free
🛑 they still broke the sabbath sign
📖 the problem was the heart, not circumstances

# Ezekiel 20:14-17
# 🕊️ Mercy In The Wilderness
---
## 🛡️ I Wrought For My Name's Sake

This exact phrase already appeared once earlier in the chapter.

God repeats it on purpose every time He holds back judgment.

His own name, not Israel's good behavior, explains the mercy.

Watching this refrain return helps the reader see the real reason judgment keeps getting delayed.

🔁 this phrase already appeared once before
🛡️ God's name explains His mercy
🙅 it is not about Israel's good behavior
📖 the refrain reveals the real reason

## 🚷 I Would Not Bring Them Into The Land

This refers to the generation that left Egypt but refused to trust God at the border of Canaan.

That refusal is the story told back in the book of Numbers.

As punishment, that whole generation died in the wilderness without ever entering the land.

Their children would be the ones to finally cross over instead.

🚷 this is the generation from Numbers
🙅 they refused to trust God at the border
⏳ that generation died in the wilderness
📖 their children crossed over instead

## ❤️ Their Heart Went After Their Idols

"Heart" in the Bible usually means the center of a person's loyalty and desire, not just feelings.

Their actions followed their idols because their deepest loyalty already had.

Outward obedience without that inward loyalty never lasts very long.

This explains why the statutes and sabbaths kept getting broken despite being clearly given.

❤️ heart means the center of loyalty
🏺 their loyalty had already gone to idols
🎭 outward obedience without it does not last
📖 this explains the repeated failure

## 🕊️ Neither Did I Make An End Of Them In The Wilderness

God threatened total destruction earlier in this same passage.

He did not carry that threat out completely.

Mercy interrupted judgment even for a generation that kept rebelling.

The wilderness years were hard, but they were not the end of Israel's story.

⚠️ total destruction was threatened earlier
🛑 God did not carry it out fully
🕊️ mercy interrupted deserved judgment
📖 the wilderness was not the end

# Ezekiel 20:18-20
# 🌱 A Fresh Start For The Children
---
## 👶 Walk Ye Not In The Statutes Of Your Fathers

This is God speaking to the next generation, children born during the wilderness years.

They are told plainly not to copy their parents' failures.

God gives each generation its own chance, not just inherited guilt.

This fresh start also meant a fresh responsibility they could not blame on the past.

👶 this is the next generation speaking
🚫 told not to repeat their parents' failure
🔄 each generation gets its own chance
📖 fresh chances bring fresh responsibility

## 📝 I Am The LORD Your God

This short sentence is called a covenant formula, and it appears over and over in Ezekiel.

It is God's way of reminding Israel exactly who they belong to.

Saying it again to the children renews the same relationship their parents had.

The relationship itself never changed, even when the people kept failing it.

📝 this is a repeated covenant formula
🏷️ it reminds Israel who they belong to
🔄 the relationship is renewed for the children
📖 the relationship stayed steady despite failure

## ✨ Hallow My Sabbaths

"Hallow" means to treat something as holy, keeping it clearly different from ordinary days.

This command repeats the sabbath instruction already given to their parents.

Giving it again shows God was not giving up on this generation either.

A day set apart each week was meant to shape how they saw every other day too.

✨ hallow means treat as holy
🛑 this repeats the earlier sabbath command
🔄 God had not given up on them
📖 one set apart day shaped the rest

# Ezekiel 20:21-26
# 🔥 The Children Rebel Too
---
## 🔁 Notwithstanding The Children Rebelled Against Me

"Notwithstanding" means even after everything just described.

This is the third time in one chapter that a generation rebels.

First the generation in Egypt, then the first wilderness generation, now their children.

The pattern was clearly not limited to one unlucky generation.

🔁 this is the third rebellion in a row
👶 even the fresh generation rebelled
🚫 the pattern was not just bad luck
📖 the problem ran deeper than one generation

## ✋ I Withdrew Mine Hand

Earlier in this chapter, lifting up a hand meant swearing an oath.

Here, withdrawing the hand pictures God pulling back a blow that was already coming.

It is the same kind of mercy already shown twice before in this chapter.

God kept holding back judgment even as the pattern of rebellion kept repeating.

✋ lifting a hand earlier meant an oath
🛑 withdrawing it pictures a blow held back
🔁 this is the third act of mercy
📖 mercy kept outlasting the rebellion

## 🌍 I Would Scatter Them Among The Heathen, And Disperse Them Through The Countries

This sentence announces the exile long before it ever happened.

"Scatter" and "disperse" both describe being spread out into foreign lands.

By the time Ezekiel's own listeners heard this, that exile had already begun.

God was showing them their present captivity was not a surprise to Him at all.

🌍 scatter and disperse mean spread abroad
📣 the exile was announced far in advance
⏳ Ezekiel's listeners were living inside it already
📖 their captivity was never a surprise to God

## 👀 Their Eyes Were After Their Fathers' Idols

This echoes the earlier phrase about the abominations of their eyes back in Egypt.

The same weakness that started the whole pattern was still working generations later.

Idol worship was not invented by this generation, it was simply inherited.

Breaking a family pattern usually takes more than time passing alone.

👀 this echoes the earlier Egypt phrase
🔁 the same weakness lasted generations
👪 idolatry was inherited, not invented
📖 time alone does not break old patterns

## 🔄 I Gave Them Also Statutes That Were Not Good

This does not mean God handed Israel cruel commands on purpose out of spite.

Many scholars read this as God stepping back and letting them follow the harmful ways they already chose.

When people reject good instruction long enough, they are often left to the bad ones they preferred instead.

This judgment came by stepping back, not by inventing new punishment.

🙅 this is not God inventing cruelty
🔄 many scholars read this as stepping back
⚖️ rejecting good led to the bad they chose
📖 judgment can look like being let go

## 🔥 Caused To Pass Through The Fire All That Openeth The Womb

This describes child sacrifice offered to the god Molech, a practice from neighboring nations.

"Openeth the womb" is an old way of saying firstborn child.

Some of Israel's own people adopted this horrifying ritual as part of their idol worship.

This single line shows how far the chosen people had drifted from what God actually asked of them.

🔥 this describes child sacrifice to Molech
👶 openeth the womb means firstborn
🏺 borrowed from neighboring idol worship
📖 it shows how far Israel had drifted

# Ezekiel 20:27-29
# ⛰️ Every High Hill, And The Name Bamah
---
## ⚠️ Your Fathers Have Blasphemed Me, In That They Have Committed A Trespass Against Me

"Blasphemed" means treating God's name or honor with contempt.

"Trespass" means crossing a line that should never have been crossed.

Both words describe a direct offense against God, not just a private mistake.

This sets up the specific offense the next two verses describe in detail.

🚫 blasphemed means treating God with contempt
⚠️ trespass means crossing a forbidden line
🎯 both describe a direct offense
📖 the next verses explain the details

## ⛰️ Every High Hill, And All The Thick Trees

High hills and shaded groves were common worship sites for the gods of Canaan.

Standing up high and surrounded by trees felt closer to the divine to ancient worshippers.

Israel kept using these same borrowed locations even while claiming to worship the LORD.

The location itself was not the problem, copying pagan religion at that location was.

⛰️ high hills were common pagan worship sites
🌳 thick groves felt sacred to ancient worshippers
🏺 Israel borrowed these same locations
📖 copying pagan worship was the real problem

## 🍷 Their Sweet Savour, And Poured Out There Their Drink Offerings

"Sweet savour" describes a pleasing smell rising from a burnt offering.

"Drink offerings" were liquids like wine poured out as part of worship.

Both were legitimate parts of true worship when offered to the LORD at the right place.

Israel was using the right rituals aimed at the wrong gods in the wrong places.

🔥 sweet savour means a pleasing burnt smell
🍷 drink offerings were poured out liquids
✅ both were valid parts of true worship
📖 right rituals, aimed at the wrong gods

## 📛 The Name Thereof Is Called Bamah Unto This Day

"Bamah" is simply the Hebrew word for a high place.

God strips away any spiritual label Israel gave these sites and calls them by their plain name.

It works like calling a counterfeit exactly what it is instead of using its fancy title.

Removing the pretense exposes what the worship really was all along.

📛 Bamah is Hebrew for high place
🎭 God strips away the spiritual label
🏷️ it is called by its plain name
📖 removing pretense exposes the truth

# Ezekiel 20:30-32
# 🪵 Wood And Stone
---
## ❓ Are Ye Polluted After The Manner Of Your Fathers

This question brings the whole long history lesson straight back to the people listening right now.

Everything said about ancestors in Egypt and the wilderness was not just old history.

God is asking the exact same question of the generation standing in front of Ezekiel.

History was repeating, not just being remembered.

❓ the question returns to the present
📜 this was not just old history
👥 it is aimed at Ezekiel's own listeners
📖 history was repeating, not just remembered

## 💍 Commit Ye Whoredom After Their Abominations

"Whoredom" here is not about literal prostitution.

The Bible often pictures Israel's relationship with God like a marriage.

Chasing after other gods is described the same way the Bible describes marriage unfaithfulness.

The strong, uncomfortable word was chosen on purpose to show how serious the betrayal was.

💍 whoredom pictures Israel's broken marriage with God
🚫 it is not about literal prostitution
🏺 idolatry is treated like unfaithfulness
📖 the harsh word matches the real betrayal

## ⚖️ As I Live, Saith The Lord GOD

This is a solemn oath formula God uses when He wants to stress total certainty.

It appears three separate times across this one chapter.

Swearing by His own life is the strongest kind of guarantee God can give.

Whatever follows this phrase is settled, not a maybe.

⚖️ this is a solemn oath formula
🔁 it appears three times in this chapter
💯 swearing by His own life means certainty
📖 what follows is settled, not a maybe

## 🪵 We Will Be As The Heathen, To Serve Wood And Stone

"Wood and stone" describes lifeless idols carved from ordinary material.

This was Israel's actual secret wish, to blend in and worship like everyone else around them.

Giving up their unique identity felt easier than staying different and faithful.

God names the wish out loud before refusing to let it happen.

🪵 wood and stone pictures lifeless idols
🙈 this was Israel's secret wish to blend in
🆔 giving up their identity felt easier
📖 God names the wish and refuses it

# Ezekiel 20:33-38
# 🐑 Passing Under The Rod
---
## 💪 With A Mighty Hand, And With A Stretched Out Arm

This exact phrase described God's rescue of Israel out of Egypt long ago.

Here the same powerful phrase describes God's coming judgment on Israel instead.

The strength that once saved them is now the strength that will discipline them.

God's power never changed, only which direction it was pointed.

💪 this phrase once described the exodus rescue
🔄 here it describes coming judgment instead
⚡ the same strength points a new direction
📖 God's power never changed, only its aim

## 👑 Will I Rule Over You

This is not a threat of losing God as their King.

It is a promise that God will still be King no matter how much they resist.

Israel could reject His rule, but they could not actually escape it.

Even judgment here comes from a King who refuses to walk away.

👑 God remains Israel's true King
🚫 rejecting Him did not remove His rule
⚓ He refused to simply walk away
📖 even judgment comes from a faithful King

## 🗣️ There Will I Plead With You Face To Face

"Plead" here means a direct, personal confrontation, not a courtroom argument between lawyers.

"Face to face" means this would not happen through a messenger or a go between.

God promises the exact same kind of direct wilderness encounter their ancestors once had.

This second wilderness season was meant to lead to an honest reckoning, not more wandering.

🗣️ plead means a direct confrontation
👤 face to face means no go between
🔁 this repeats their ancestors' wilderness encounter
📖 the goal was an honest reckoning

## 🐑 I Will Cause You To Pass Under The Rod

Shepherds often counted and inspected their sheep one by one by making them pass under a rod.

Each animal was checked closely, not just counted as part of a crowd.

God pictures Himself doing the same thing to the people coming out of exile.

No one would slip through unnoticed in this future sorting.

🐑 shepherds counted sheep passing under a rod
🔍 each animal was checked individually
👤 God pictures the same close inspection
📖 no one slips through unnoticed

## 🔗 Bring You Into The Bond Of The Covenant

"Bond" here means a binding agreement, something sealed and not easily broken.

This points back to the original covenant promises made at Mount Sinai.

God was not writing a new relationship, He was renewing the old one.

The rod inspection and the covenant renewal were part of the very same process.

🔗 bond means a sealed, binding agreement
🏔️ this points back to the Sinai covenant
🔄 God renews rather than replaces it
📖 inspection and renewal happen together

## 🧹 I Will Purge Out From Among You The Rebels

"Purge" means removing something harmful from a larger group entirely.

"Sojourn" means living temporarily as a foreigner in someone else's land.

Not everyone scattered in exile would actually return to the land of Israel.

Coming home physically was never the same thing as being right with God.

🧹 purge means removing something harmful
🏕️ sojourn means living as a temporary foreigner
🚷 not everyone would actually return home
📖 coming home does not mean being right

# Ezekiel 20:39-44
# 🏔️ True Worship Restored
---
## 🙅 Go Ye, Serve Ye Every One His Idols

This is not God giving permission to keep worshipping idols.

It is a bitter challenge, daring them to keep going if they really think it will work.

God already knows exactly how that choice ends for them.

Letting them see it through makes the coming contrast impossible to miss.

🙅 this is not real permission
🎯 it is a bitter, pointed challenge
🔮 God already knows how it ends
📖 the contrast ahead becomes impossible to miss

## 🏔️ In Mine Holy Mountain, In The Mountain Of The Height Of Israel

This refers to Mount Zion, the hill in Jerusalem where the temple once stood.

"Height" here is not about literal elevation above sea level.

It describes the honored, central place this location held in Israel's worship.

True worship, when it finally returns, comes back to this one specific place.

🏔️ this means Mount Zion in Jerusalem
📏 height means honored status, not elevation
🏛️ the temple once stood on this site
📖 true worship returns to this place

## ✅ There Will I Accept Them, And There Will I Require Your Offerings

"Accept" here means God finally receiving their worship as genuine, not rejected.

"Require" simply means God expects these offerings to continue, now rightly given.

This reverses the rejected worship described earlier at the high places.

The same kinds of offerings once wasted on idols are finally given to the right God.

✅ accept means God receives it as genuine
📋 require means God expects it going forward
🔄 this reverses the earlier rejected worship
📖 the right offerings reach the right God

## 🌾 The Firstfruits Of Your Oblations

"Firstfruits" means the very first and best portion of a harvest.

"Oblations" is a general word covering different kinds of offerings brought to God.

Giving the first portion, not the leftovers, showed real trust that more would come.

This small practical detail reflected a much bigger attitude of the heart.

🌾 firstfruits means the first, best portion
🎁 oblations is a general word for offerings
🤝 giving first showed real trust in God
📖 a small practice revealed a big attitude

## ✨ I Will Be Sanctified In You Before The Heathen

"Sanctified" again means set apart as holy, the same word used earlier in the chapter.

"Before the heathen" means in full view of the surrounding nations.

Israel's restored worship would prove to the watching world who the real God actually was.

What happened to Israel was never only about Israel.

✨ sanctified means set apart as holy
🌍 before the heathen means in full view
🔁 this echoes the same word from earlier
📖 Israel's story was never only about Israel

## 😣 Ye Shall Lothe Yourselves In Your Own Sight

"Lothe" means to feel real disgust, much stronger than simple regret.

This reaction comes only after they are safely restored, not while still under threat.

Genuine shame here grows out of mercy already received, not fear of punishment.

Looking back honestly at old failures is part of what makes the restoration real.

😣 lothe means real disgust, not mild regret
🕊️ this comes after mercy, not under threat
❤️ honest shame follows real restoration
📖 looking back honestly makes it real

# Ezekiel 20:45-49
# 🌲 A Fire In The Forest Of The South
---
## 🧭 Set Thy Face Toward The South

Setting the face toward a direction was a prophetic way of aiming a message at a specific target.

"South," from Ezekiel's location in Babylon, pointed back toward Judah and Jerusalem.

The forest of the south field is a symbolic picture of the land and people of Judah.

A whole nation is pictured here as a single stretch of forest.

🧭 setting the face aims a message
🗺️ south points back toward Judah
🌲 the forest pictures the land of Judah
📖 one forest stands for a whole nation

## 🌳 Every Green Tree In Thee, And Every Dry Tree

Green trees and dry trees are not literal plants catching fire.

Green often pictures the righteous, and dry often pictures the wicked.

Both get caught in the very same coming disaster without exception.

A national disaster like the Babylonian invasion does not sort people out one at a time.

🌳 trees here are symbols, not literal plants
🟢 green often pictures the righteous
🟤 dry often pictures the wicked
📖 one disaster catches both without exception

## 🔥 The Flaming Flame Shall Not Be Quenched

"Quenched" means put out or extinguished completely.

Saying the flame will not be quenched means this judgment cannot be stopped once it starts.

Many scholars connect this fire directly to the coming invasion by Babylon.

Once that invasion began, there was no putting it out early.

🔥 quenched means put out completely
🚫 this fire cannot be stopped once started
⚔️ many connect it to Babylon's invasion
📖 there was no putting it out early

## 👁️ All Flesh Shall See That I The LORD Have Kindled It

"Kindled" means started or lit, like starting a fire from nothing.

This disaster would not look like random bad luck to anyone watching.

God wanted the cause behind the coming judgment to be unmistakable.

Even the worst news in this chapter still points straight back to who God is.

🔥 kindled means started or lit
🎲 this was never meant to look random
👁️ the true cause had to be unmistakable
📖 even judgment points back to who God is

## 🧩 Doth He Not Speak Parables

"Parable" here means a riddle or indirect saying that hides as much as it reveals.

This is the people complaining that Ezekiel's message is too hard to understand.

Their complaint actually proves they heard enough to know it was bad news.

The very next chapter answers this complaint by explaining the parable in plain words.

🧩 parable here means a riddle or indirect saying
😤 this is the people's complaint about Ezekiel
👂 they heard enough to know it was bad
📖 the next chapter explains it plainly`.trim();

export const EZEKIEL_TWENTY_PERSONAL_SECTIONS = parseEzekielTwentyRawNotes(EZEKIEL_TWENTY_RAW_NOTES);
