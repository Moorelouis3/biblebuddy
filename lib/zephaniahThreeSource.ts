export type ZephaniahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZephaniahThreeRawNotes(rawText: string): ZephaniahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZephaniahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zephaniah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zephaniah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zephaniah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Zephaniah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zephaniah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zephaniah 3:${startVerse}` : `Zephaniah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Zephaniah 3 sections, received " + sections.length);
  }

  return sections;
}

const ZEPHANIAH_THREE_RAW_NOTES = `# Zephaniah 3:1-5
# 😔 Jerusalem's Corrupt Leaders
---
## Woe To Her That Is Filthy And Polluted

"Woe" is a cry used only to announce coming disaster.

It is not a sigh of sadness.

It is a formal warning that judgment is already decided.

Zephaniah uses the exact same word that opened the judgments against other nations in chapter two.

Now the word turns and lands on Jerusalem itself.

📢 Woe announces disaster, not sadness

⚖️ It signals judgment already decided

🔁 The same word judged other nations

📖 Now the word turns on Jerusalem itself

## The Oppressing City

Zephaniah never says the name Jerusalem in this verse.

The city being addressed becomes clear only from what follows, a people with priests, prophets, and a temple.

Chapter two judged Philistia, Moab, Ammon, Ethiopia, and Assyria one at a time.

Chapter three turns that same warning onto God's own city.

No nation gets a free pass, not even the one that carries God's name.

🏙️ The city is not named here directly

🏛️ Priests and a temple point to Jerusalem

🔁 Chapter two judged other nations first

📖 God's own city is not exempt

## She Obeyed Not The Voice, She Received Not Correction

This verse lists Jerusalem's failure in four short strikes.

The first two land on hearing and learning from correction.

"The voice" means God speaking through his prophets and his law.

Receiving "correction" means letting a mistake actually change your behavior.

Jerusalem did neither.

She heard the warnings and ignored them anyway.

👂 The voice means God speaking through prophets

📚 Correction means letting a mistake change you

🙉 Jerusalem heard both and ignored them

📖 Hearing is not the same as listening

## She Trusted Not In The LORD, She Drew Not Near To Her God

The second pair of failures goes deeper than the first.

Not trusting the LORD means looking somewhere else for safety.

Not drawing near means she stopped seeking him at all.

A person can hear a warning and still refuse to lean on the one giving it.

This verse moves from refusing to listen to refusing the relationship itself.

🙅 Not trusting means looking elsewhere for safety

🚪 Not drawing near means she stopped seeking God

💔 Hearing right and trusting right are different things

📖 This failure reaches the relationship itself

## Her Princes Within Her Are Roaring Lions

A roaring lion does not sneak up on its prey.

It announces itself and then takes whatever it wants by force.

"Princes" here means the ruling officials who were supposed to protect the people.

Instead they used their power the way a lion uses its strength, openly and without mercy.

The people in charge of justice became the biggest danger in the city.

🦁 A roaring lion takes by open force

👑 Princes were the ruling officials

💔 They used power to prey, not protect

📖 Leaders became the city's real danger

## Her Judges Are Evening Wolves, They Gnaw Not The Bones Till The Morrow

Wolves that hunt in the evening finish their kill before anything can interrupt them.

"Gnaw not the bones till the morrow" means they do not even wait until morning to pick a carcass clean.

Judges were supposed to settle disputes justly, not devour whoever came before them.

This image pictures corrupt judges stripping people of everything, right away, with nothing left over.

Patience and mercy are both missing from this picture.

🐺 Evening wolves hunt without waiting

🦴 They strip a carcass clean overnight

⚖️ Judges should settle disputes, not devour them

📖 Nothing was left over for mercy

## Her Prophets Are Light And Treacherous Persons

"Light" here does not mean easygoing or cheerful.

It means reckless and unreliable, the opposite of what a prophet was supposed to be.

"Treacherous" means willing to betray the very people trusting them for truth.

A prophet's job was to speak God's actual word, not whatever people wanted to hear.

These prophets broke that trust on purpose.

🗣️ Light means reckless, not cheerful

🐍 Treacherous means willing to betray trust

📜 A prophet's job was speaking God's truth

📖 These prophets broke that trust on purpose

## Her Priests Have Polluted The Sanctuary

Priests were set apart to keep the temple holy and undefiled.

"Polluted" means they treated sacred space as if it were ordinary or unclean.

The sanctuary was the one place in the city meant to stay untouched by corruption.

Even that place was not safe from it.

The people assigned to protect holiness were the ones who ruined it.

🏛️ Priests were set apart to guard holiness

🚫 Polluted means treating the sacred as ordinary

🕍 The sanctuary was meant to stay untouched

📖 Its own guardians ruined it

## The Just LORD Is In The Midst Thereof

Every leader named so far failed the city in a different way.

This line turns to the one leader who did not fail.

"Just" means his judgment is never twisted by bribery or fear.

He stayed present in the city the whole time this corruption was happening.

His presence never depended on the city deserving it.

⚖️ Just means never twisted by bribery

👑 Every human leader named here failed

🏙️ God stayed present through it all

📖 His presence never depended on being deserved

## Every Morning Doth He Bring His Judgment To Light

Human judges in this chapter devour by night and leave nothing for morning.

God's judgment works the opposite way.

He brings it out fresh and visible every single morning, never hidden, never rushed.

"He faileth not" means this pattern never breaks, not even once.

Reliability is the whole point of this contrast.

🌅 God's judgment appears fresh every morning

🙈 Human judges hide and devour at night

🔁 He faileth not means this never breaks

📖 Reliability sets God apart from these leaders

## But The Unjust Knoweth No Shame

Shame is supposed to work like a warning light inside a person.

It signals that something is wrong and needs to change.

"Knoweth no shame" means that warning light stopped working completely for Jerusalem's leaders.

A city can keep sinning long after it should feel the weight of it.

That is the real danger this whole section has been building toward.

🚨 Shame normally warns a person something is wrong

💡 Knoweth no shame means that warning stopped

🔁 Sin can continue after shame fades

📖 A broken conscience is the real danger here

# Zephaniah 3:6-8
# ⏳ A Patient Warning Ignored
---
## I Have Cut Off The Nations

God now points back to judgments he has already carried out against other nations.

This is not a future threat only, it already happened to someone else first.

Those nations stood as a warning Jerusalem could have learned from.

Instead the warning was ignored, as the next verse will show.

✂️ Cut off means judgment already carried out

🌍 Other nations already felt this judgment

⚠️ Their fall was meant as a warning

📖 Jerusalem ignored the warning anyway

## Their Towers Are Desolate

Towers were built for defense, tall enough to spot danger before it arrived.

"Desolate" means empty, with no one left to watch from them.

A desolate tower is a picture of a city that lost its own protection.

Streets with no one passing by complete that same picture of total emptiness.

The strength these nations trusted in did not save them.

🏰 Towers were built for defense

🕳️ Desolate means empty, unwatched

🌆 Empty streets confirm total emptiness

📖 Trusted strength did not save them

## I Said, Surely Thou Wilt Fear Me

This line reveals God's own hope before judgment, not just his anger after it.

He expected that watching other nations fall would make Jerusalem take him seriously.

"Fear me" means respect and obey, not simple terror.

"Receive instruction" means actually letting that respect change how the city lived.

God wanted correction to work, not just punishment to happen.

🙏 Fear me means respect, not simple terror

📚 Receive instruction means letting it change you

💭 God hoped the warning would land first

📖 He wanted correction over punishment

## They Rose Early And Corrupted All Their Doings

"Rose early" pictures eagerness, not laziness or delay.

Jerusalem got up early to pursue corruption, the same energy a hard worker would use for something good.

This line answers the hope from the verse before with a flat refusal.

The city did not drift into sin slowly.

It chased it on purpose, every single day.

🌅 Rose early means eager, not delayed

🏃 The city chased corruption with real energy

🚫 This answers God's hope with refusal

📖 Sin here was chosen, not drifted into

## Wait Ye Upon Me, Saith The LORD

After naming the refusal, God still calls for patience rather than instant action.

"Wait ye upon me" means trust his timing instead of trying to fix things alone.

This is the same call given to the meek back in chapter two.

Waiting here is not passive, it is active trust while judgment is still being delayed.

⏳ Wait ye upon me means trust God's timing

🔁 This echoes the call to the meek

🙏 Waiting is active trust, not passive delay

📖 Patience is asked for even now

## Until The Day That I Rise Up To The Prey

This pictures God like a hunter who has already decided to act.

"Rise up to the prey" means the moment he finally moves against what he has been watching.

The delay was never a sign that God forgot or changed his mind.

It was simply not yet time.

🦁 Rise up to the prey pictures a hunter

⏱️ The delay was never God forgetting

🎯 A decided moment is simply still ahead

📖 Patience and certainty can exist together

## The Fire Of My Jealousy

"Jealousy" here does not describe envy over something God wants for himself selfishly.

It describes the protective anger of someone defending what rightfully belongs to them.

God describes his anger at sin using fire, something that consumes completely and leaves nothing hidden.

This verse widens the target from a few named nations to the whole earth.

Nothing stays outside this reckoning.

🔥 Jealousy here means protective anger, not envy

🌍 This widens judgment to the whole earth

🧯 Fire pictures total, consuming judgment

📖 Nothing stays outside this reckoning

# Zephaniah 3:9-13
# 🌍 A Purified People Remains
---
## I Will Turn To The People A Pure Language

"Pure language" literally means pure lips or pure speech.

It pictures a people whose words are no longer twisted by lies, idols, or corrupt worship.

This reverses the picture from the tower of Babel, where language divided the nations in judgment.

Here God promises a shared, clean way of speaking that unites people in worship instead.

👄 Pure language literally means pure lips

🏗️ This reverses the confusion from Babel

🤝 Clean speech unites instead of dividing

📖 Even language gets restored here

## To Serve Him With One Consent

"One consent" means agreement, many different people choosing the same purpose together.

This is not forced uniformity.

It is a shared decision to serve the LORD side by side.

Chapter two already pictured worship spreading out to the isles of the heathen.

This verse completes that picture with people from many places finally united.

🤝 One consent means shared agreement, not force

🌍 People from many places worship together

🔁 This builds on chapter two's wider worship

📖 Unity in worship completes the picture

## From Beyond The Rivers Of Ethiopia

Ethiopia here again points to Cush, the same distant region named earlier in this chapter.

"Beyond the rivers" pushes the picture even further away, as far as Zephaniah could point on a map.

Worshippers coming from this far away show how wide God's reach has become.

The nation judged earlier is now pictured bringing an offering instead.

🗺️ Ethiopia means Cush, named earlier in this chapter

🌍 Beyond the rivers means a far distant place

🔁 A judged nation now brings an offering

📖 Judgment and restoration touch the same people

## My Suppliants, The Daughter Of My Dispersed

"Suppliants" means people who come humbly asking for help or favor.

"The daughter of my dispersed" is a tender name for people scattered far from home.

God calls these far away people his own, not strangers.

An offering brought by scattered worshippers becomes a sign that distance never broke the relationship.

🙏 Suppliants means people humbly asking for help

💔 Dispersed means scattered far from home

❤️ God still calls them his own

📖 Distance never broke the relationship

## Thou Shalt Not Be Ashamed

The address shifts back from distant nations to Jerusalem herself here.

Earlier in this chapter shame should have been felt and was not.

Now the promise flips that completely, shame is removed because the sin causing it is removed too.

This is not Jerusalem pretending nothing happened.

It is an actual change making shame unnecessary.

🔄 The address shifts back to Jerusalem

💔 Earlier shame should have been felt

✅ Shame leaves because the sin causing it leaves

📖 This is real change, not pretending

## Them That Rejoice In Thy Pride

This phrase names a specific group being removed from the city.

These are the people who took pride in exactly the corruption named earlier in this chapter.

Removing them is not random punishment.

It targets the same root cause already named back in chapter two, pride that mocked and exploited others.

👑 This names a specific proud group

🗑️ They are removed from the city

🔁 Pride is the same root cause

📖 Removal targets the actual cause of the sin

## No More Haughty Because Of My Holy Mountain

"Haughty" means proud in a way that looks down on everyone else.

"My holy mountain" refers to Jerusalem's temple, the place that should have produced humility, not arrogance.

Instead the city had used its closeness to God as a reason to feel superior.

That specific pride is what gets removed here.

👃 Haughty means proud, looking down on others

⛰️ My holy mountain refers to the temple

💔 Closeness to God had bred arrogance instead

📖 That specific pride is removed here

## An Afflicted And Poor People

This phrase does not describe people who are simply unlucky.

It describes people who stayed humble and dependent on God through real hardship.

The proud leaders named earlier in this chapter are removed.

What remains in the city afterward is a very different kind of people.

💔 Afflicted and poor means humbled, not unlucky

🙏 These people stayed dependent on God

🔄 Proud leaders are gone, a new people remains

📖 Who remains matters just as much

## The Remnant Of Israel Shall Not Do Iniquity

"Remnant" means the smaller group that survives after judgment removes the rest.

This remnant is described doing exactly what the city failed to do back in verse two.

No iniquity, no lies, no deceitful tongue, the opposite of everything named at the start of this chapter.

The change promised here is not partial.

👥 Remnant means the group that survives judgment

🔄 They do the opposite of verse two's failures

🗣️ No lies, no deceitful tongue among them

📖 This change is complete, not partial

## They Shall Feed And Lie Down, None Shall Make Them Afraid

This pictures a flock of sheep resting safely after grazing, with no predator nearby.

Earlier in this chapter, leaders were compared to lions and wolves hunting the people.

Now the same people rest without fear of being hunted at all.

Safety here is not just physical, it is the direct reversal of how this chapter began.

🐑 This pictures sheep resting safely after grazing

🦁 Leaders were lions and wolves earlier

🔄 The hunted people now rest unafraid

📖 This directly reverses how the chapter began

# Zephaniah 3:14-17
# 🎉 Zion Is Told To Rejoice
---
## Sing, O Daughter Of Zion

"Daughter of Zion" is an affectionate name for Jerusalem, pictured like a beloved child.

The command to sing comes right after a whole chapter built on warnings and judgment.

This sudden shift in tone is not random.

It marks the turning point where judgment gives way to restoration.

❤️ Daughter of Zion is an affectionate name

🔄 This marks a sudden shift to joy

🎵 Singing becomes the response instead of fear

📖 Restoration follows judgment, not the other way around

## Rejoice With All The Heart

This is not a quiet, polite happiness.

"With all the heart" means complete, undivided joy, nothing held back.

Three separate commands stack together here, sing, shout, and rejoice.

That repetition shows how total this celebration is meant to be.

🎉 With all the heart means undivided joy

📢 Sing, shout, and rejoice stack together here

🔁 Repetition shows the celebration is total

📖 Nothing is held back in this response

## The LORD Hath Taken Away Thy Judgments

"Judgments" here means the punishments that were coming because of Jerusalem's sin.

This does not erase that the sin happened.

It means the consequence of that sin is finally lifted.

The same God who announced woe in verse one now removes the reason for it.

⚖️ Judgments here means punishments, not opinions

🔄 The sin happened, but its consequence lifts

🗣️ The same God who warned now restores

📖 Removing the consequence does not erase the past

## The King Of Israel Is In The Midst Of Thee

This echoes the exact phrase used back in verse five about God being present even during the corruption.

Now that same presence is named directly as a king, not just a witness.

A king in the midst of a city means rule, protection, and ongoing care.

The one who watched the corruption is now the one restoring the city himself.

🔁 This echoes God's presence from verse five

👑 Naming him king means active rule

🛡️ A king in the midst means protection

📖 The witness to corruption becomes the restorer

## Fear Thou Not, Let Not Thine Hands Be Slack

"Fear thou not" addresses the heart, calming anxiety about the future.

"Let not thine hands be slack" addresses the hands, calling for action instead of giving up.

Together they cover both the inner feeling and the outer response.

A restored people still needs both courage and effort moving forward.

❤️ Fear thou not calms inner anxiety

💪 Hands be slack calls for continued effort

🤝 Together they cover feeling and action

📖 Restoration still requires courage going forward

## He Will Rest In His Love

This pictures God settling into contentment, the way a person rests once a hard task is finally finished.

God is not pictured as reluctantly tolerating his people here.

He is pictured delighting in them, fully at peace in his love for them.

That is a strong contrast to the anger and fire described earlier in this chapter.

😌 Rest in his love pictures settled contentment

❤️ God delights in his people, not tolerates them

🔄 This contrasts sharply with the fire from earlier

📖 God's final posture here is peace, not anger

## He Will Joy Over Thee With Singing

This verse pictures God himself singing, not only his people.

The chapter opened with God's judgment against Jerusalem's sin.

It closes with God's own joy over Jerusalem's restoration.

That full reversal is the real point of this whole section.

🎵 This pictures God himself singing

🔄 The chapter opened in judgment, not joy

❤️ It closes with God's own delight

📖 That reversal is the whole point

# Zephaniah 3:18-20
# 🏠 The LORD Brings Them Home
---
## Gather Them That Are Sorrowful For The Solemn Assembly

A "solemn assembly" was a scheduled gathering for worship that this sorrow had kept people away from.

Those too sorrowful or ashamed to attend were left out of public worship entirely.

God promises to gather exactly those people back in.

No one who wanted to belong gets permanently left outside because of past shame.

🙏 Solemn assembly means a scheduled worship gathering

💔 Sorrow had kept some people away from it

🤝 God promises to gather them back in

📖 Past shame does not permanently exclude anyone

## I Will Save Her That Halteth

"Halteth" means limping or struggling to walk properly.

This pictures someone who cannot keep pace with everyone else on the journey home.

God does not leave behind the ones moving slowest.

He specifically names rescuing them, alongside gathering the ones already scattered away.

🦵 Halteth means limping or struggling to walk

🐢 This pictures someone who cannot keep pace

🤝 God does not leave the slowest behind

📖 Rescue reaches those struggling most, by name

## Praise And Fame In Every Land

This people had been put to shame in the very lands they were scattered to.

Now God promises the opposite outcome in those same places.

"Praise and fame" means other nations will openly recognize and honor them.

What once brought humiliation becomes the setting for honor instead.

💔 They were once shamed in these same lands

🔄 God promises the opposite outcome now

🌍 Other nations will openly honor them

📖 The setting of shame becomes honor

## I Will Bring You Again

This is a direct promise to physically return the scattered people to their own land.

"Even in the time that I gather you" ties this return to a specific moment God has already set.

The promise is not vague or indefinite.

It is anchored to an actual time, decided by God himself.

🏠 Bring you again means a physical return home

⏳ Gather you ties this to a set time

📅 The promise is specific, not vague

📖 God has already decided when this happens

## Turn Back Your Captivity Before Your Eyes

"Before your eyes" means the people will actually witness this reversal happening, not just hear about it later.

The whole book began with warnings of judgment coming on the whole earth.

It ends with a very specific, visible promise to one rescued people.

That ending answers everything the opening woe put in motion.

👀 Before your eyes means witnessing it directly

📜 The book began with judgment everywhere

🎯 It ends with one specific, visible promise

📖 This ending answers the opening woe
`.trim();

export const ZEPHANIAH_THREE_PERSONAL_SECTIONS = parseZephaniahThreeRawNotes(ZEPHANIAH_THREE_RAW_NOTES);
