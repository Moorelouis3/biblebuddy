export type PsalmsSeventyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyOneRawNotes(rawText: string): PsalmsSeventyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+71:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 71 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+71:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+71:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 71 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 71,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 71:${startVerse}` : `Psalms 71:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 71 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_ONE_RAW_NOTES = `# Psalms 71:1-3
# 🪨 A Trust Declared Before Any Request
---
## 🪨 In Thee O LORD Do I Put My Trust

Trust here means placing your full weight on God, not just a passing feeling.

David is not hoping things work out.

He is anchoring his whole life on God.

This opens the psalm with a flat declaration, not a plea.

Everything that follows builds from this one committed choice.

🪨 Trust means placing full weight on God

📌 Not a passing feeling or a hope

🗣️ Declared before any request is made

📖 The whole psalm builds from this choice

## 😳 Let Me Never Be Put To Confusion

Confusion here does not mean feeling puzzled or unsure.

In the Psalms it means public shame and humiliation.

David asks God to never let his trust look foolish.

If his trust failed publicly, his faith itself would be mocked.

This opening line sets the stakes for the whole prayer.

😳 Confusion means public shame, not puzzlement

🙏 David asks his trust never look foolish

⚖️ His faith itself is what is at stake

📖 This line sets up the whole prayer

## ⚖️ Deliver Me In Thy Righteousness

In thy righteousness means David is not appealing to his own record.

He is asking God to act because it fits who God is.

A righteous God protects those who trust him.

David bases his plea on God's character, not his own worthiness.

⚖️ Righteousness here is God's character, not David's

🙌 The appeal rests on who God is

🛡️ A righteous God protects those who trust

📖 David's plea is not about his own worth

## 👂 Incline Thine Ear Unto Me

Incline thine ear pictures someone bending down to listen closely.

It is the posture of a parent leaning toward a child's voice.

David is asking God to pay close, personal attention.

This is not a vague prayer sent upward into the air.

It asks for the kind of attention given to someone standing nearby.

👂 Incline thine ear means bend down and listen

👶 Like a parent leaning toward a child

🎯 David asks for close personal attention

📖 Not a vague prayer, a direct one

## 🏠 Be Thou My Strong Habitation, Whereunto I May Continually Resort

Habitation means a dwelling place, somewhere a person actually lives.

David is not asking for a one time rescue.

Continually resort means a place he can return to again and again.

Think of a shelter used in every storm, not just the first one.

David wants God to be his permanent address, not an emergency exit.

🏠 Habitation means a place someone lives

🔁 Continually resort means returning again and again

⛈️ Like a shelter used in every storm

📖 David wants God as a permanent home

## 📜 Thou Hast Given Commandment To Save Me

This does not mean God spoke an audible command David actually heard.

Given commandment describes something already decided by God.

David is saying his rescue was never in doubt in God's plan.

It removes any sense that his safety depends on luck or timing.

📜 Not a literal audible command heard

✅ It describes God's settled, decided will

🎲 David's rescue was never left to chance

📖 His safety rests on God's decision

## 🗻 For Thou Art My Rock And My Fortress

Rock and fortress describe a place enemies cannot easily reach.

In David's world, a high rock or a walled fortress was the safest place to be.

Calling God a rock means his protection cannot be shaken or broken through.

David uses two different pictures to say the same steady truth.

🗻 Rock pictures a place enemies cannot reach

🏰 Fortress adds a walled, defended shelter

💪 God's protection cannot be shaken

📖 Two pictures, one steady truth

# Psalms 71:4-6
# ✋ Danger Named, Then Traced Back To Birth
---
## ✋ Out Of The Hand Of The Wicked

Hand here does not mean a literal hand grabbing him.

In Hebrew idiom, hand means power or control over someone.

David asks to be taken out from under his enemies' control.

The same word appears twice, naming two shades of one danger.

✋ Hand means power or control, not a grip

🔓 David asks to be freed from control

🎭 Wicked and cruel name two sides of it

📖 One danger described from two angles

## 🗡️ Out Of The Hand Of The Unrighteous And Cruel Man

Unrighteous describes someone living against God's standard on purpose.

Cruel goes further, someone who enjoys causing harm.

David is not facing simple disagreement, he is facing real danger.

Naming both words together shows the threat is both moral and personal.

⚖️ Unrighteous means living against God's standard

🗡️ Cruel means actually enjoying harm done

⚠️ This is real danger, not disagreement

📖 The threat is both moral and personal

## 📜 Thou Art My Hope, O Lord GOD

Lord GOD here combines two different Hebrew words for God.

Lord means master or sovereign ruler, and GOD in capitals stands for the LORD, God's own name.

Putting them together is a formal, weighty way of addressing God.

David is not using a casual title, he is using God's full name.

📜 Lord GOD combines two Hebrew names

👑 Lord means master or sovereign ruler

🔤 Capitals mark God's own personal name

📖 A formal, weighty way to address God

## 👴 Thou Art My Trust From My Youth

From my youth means this trust did not start recently.

David is likely an old man by the time he writes this psalm.

He is looking back at a relationship that has lasted a lifetime.

His faith was not built in this one crisis, it was built over decades.

👶 From my youth means trust built early

👴 David is likely an old man here

🕰️ His faith spans a lifetime, not one crisis

📖 Decades of trust, not a sudden decision

## 🤲 By Thee Have I Been Holden Up From The Womb

Holden up is an old form of held up, meaning sustained and supported.

David traces God's care back before he could even remember it.

From the womb means his whole life, not just his adult years.

No part of his story happened outside God's care.

🤲 Holden up means held up or sustained

🌱 God's care traced back before memory

📅 From the womb covers his whole life

📖 No part of his life was outside God

## 🍼 Thou Art He That Took Me Out Of My Mother's Bowels

Bowels here is an old word for the womb, not its modern meaning.

David is describing the moment of his own birth.

He credits God directly with bringing him into the world.

This line makes his trust personal, not just theological.

🍼 Bowels is an old word for womb

👶 David describes the moment of his birth

🙌 He credits God directly with his life

📖 This makes his trust deeply personal

## 🔁 My Praise Shall Be Continually Of Thee

Continually means constant and ongoing, not occasional.

David is not promising to praise God only when things go well.

A lifetime of God's care deserves a lifetime of praise in return.

This line turns the whole verse from memory into a promise.

🔁 Continually means constant, not occasional

🙌 Not just praise when things go well

⚖️ A lifetime of care deserves lifelong praise

📖 Memory turns into a promise here

# Psalms 71:7-9
# 👀 A Public Spectacle Asking For A Private Refuge
---
## 👀 I Am As A Wonder Unto Many

Wonder here does not mean people admire David like a celebrity.

It means he has become a strange sight, someone others stare at.

Many scholars believe this points to his long list of troubles becoming public knowledge.

He is not boasting, he is describing how exposed his suffering has become.

👀 Wonder means a strange sight, not admiration

😟 David has become a public spectacle

📢 His troubles became widely known

📖 He is exposed, not boasting

## 🙈 But Thou Art My Strong Refuge

Refuge means a place to hide, not just a place to feel safe.

The word strong adds real security to that hiding place.

David sets his public exposure against this one private shelter.

Being stared at by many does not shake this one trust.

🙈 Refuge means a place to hide

💪 Strong adds real, lasting security

⚖️ Public exposure set against private shelter

📖 One trust that does not shake

## 🗣️ Let My Mouth Be Filled With Thy Praise And With Thy Honour All The Day

Honour here means speaking about God's greatness out loud.

It is not a private feeling David keeps to himself.

All the day means this fills his regular, ordinary speech.

David wants praise to be a habit, not a special occasion.

🗣️ Honour means speaking God's greatness aloud

🙅 Not a private feeling kept inside

🕐 All the day means ordinary, daily speech

📖 David wants praise as a habit

## 👴 Cast Me Not Off In The Time Of Old Age

Cast off means thrown away or abandoned.

This line reveals David is likely writing this prayer as an old man.

In the ancient world, old age often meant losing status and protection.

David is asking God not to treat him the way society might.

👴 Cast off means thrown away or abandoned

🕰️ This shows David wrote this in old age

📉 Old age often meant losing status then

📖 David asks God not to follow that pattern

## 💔 Forsake Me Not When My Strength Faileth

Forsake means more than leaving, it means walking away from a relationship.

Strength faileth describes his body failing him in old age.

David is not afraid of weakness itself, he is afraid of being alone in it.

This fear connects directly to his prayer against being cast off.

💔 Forsake means walking away from a relationship

🦴 Strength faileth describes his body failing

😟 His fear is being alone, not weak

📖 This connects straight back to being cast off

# Psalms 71:10-13
# 🕵️ Enemies Plot While David Prays Past Them
---
## 🗣️ Mine Enemies Speak Against Me

Speak against me means real, spoken opposition, not just private dislike.

David's enemies are actively talking about him to others.

Words alone were doing damage to his reputation.

This sets up the specific plot described in the rest of the verse.

🗣️ Speak against means active spoken opposition

📢 Enemies talk about him to others

💔 Words alone were damaging his name

📖 This sets up their plot below

## 🕵️ They That Lay Wait For My Soul Take Counsel Together

Lay wait means setting an ambush, waiting for the right moment to strike.

Take counsel together means these enemies are planning as a group.

For my soul means their goal is his life, not just his reputation.

This is not one angry person, it is an organized plot.

🕵️ Lay wait means setting an ambush

🤝 Take counsel means plotting as a group

🎯 For my soul means they want his life

📖 An organized plot, not one angry person

## 😈 Saying, God Hath Forsaken Him

This is the enemies' claim, not David's own belief.

They are using his suffering as proof God has abandoned him.

The rest of the psalm argues directly against this exact lie.

David never once agrees with what they are saying here.

🗣️ This is the enemies' claim, not truth

😈 They read his suffering as proof of abandonment

🙅 David never agrees with this claim

📖 The rest of the psalm argues against it

## 🏃 Persecute And Take Him, For There Is None To Deliver Him

Persecute means to chase down and harm on purpose.

None to deliver him means they believe he has no protector left.

This is the exact moment David's prayer becomes urgent.

Their confidence is about to be proven wrong.

🏃 Persecute means chase down to harm

🚫 They believe he has no protector

⏰ This is the urgent turning point

📖 Their confidence is about to be wrong

## 🙏 O God, Be Not Far From Me

Be not far from me directly answers the enemies' claim that God has forsaken him.

David is not arguing with his enemies, he is praying past them straight to God.

Calling on God twice in one verse shows real urgency.

This is the psalm's emotional center, the plea everything else builds toward.

🙏 This directly answers the forsaken claim

➡️ David prays past his enemies to God

🔁 Calling God twice shows real urgency

📖 This is the psalm's emotional center

## ⏱️ O My God, Make Haste For My Help

Make haste repeats the same urgent language David used in Psalm 70.

It means immediate action, not eventual help.

Naming God twice in one breath shows how personal this prayer feels.

David is not being formal here, he is being desperate.

⏱️ Make haste means immediate, not eventual

🔗 This echoes Psalm 70's opening plea

🙌 Naming God twice shows how personal it is

📖 This is desperate prayer, not formal request

## 😳 Let Them Be Confounded And Consumed That Are Adversaries To My Soul

Confounded means publicly shamed, the same word from verse one.

Consumed means completely used up or destroyed.

Adversaries to my soul names people after his very life, not just his standing.

David is asking their plot to fail completely, not partly.

😳 Confounded means publicly shamed, again

🔥 Consumed means completely used up

🎯 Adversaries to my soul means his life

📖 David asks for total failure of the plot

## 👕 Let Them Be Covered With Reproach And Dishonour That Seek My Hurt

Reproach and dishonour both describe public disgrace, not private embarrassment.

Covered pictures shame wrapping around someone completely, like a garment.

David wants their plan against him to become their own public shame.

This finishes the request that opened back in verse one.

👕 Covered pictures shame like a garment

📢 Reproach and dishonour mean public disgrace

🔄 Their plan against him becomes their shame

📖 This finishes the request from verse one

# Psalms 71:14-16
# 🔄 Hope Becomes A Daily Choice
---
## 🔄 But I Will Hope Continually

But marks a clear turn away from the complaints just described.

Hope continually means an ongoing choice, not a single burst of optimism.

David does not wait for the danger to pass before he hopes.

He decides to hope in the middle of the trouble, not after it.

🔄 But marks a turn from complaint

🔁 Continually means ongoing, not one burst

⏳ He hopes during trouble, not after

📖 Hope becomes his choice here

## 📈 And Will Yet Praise Thee More And More

More and more means his praise keeps growing, not staying the same.

Yet signals he will keep going despite everything working against him.

David is planning to praise God with greater intensity over time.

This is a promise about his future, not just his current feeling.

📈 More and more means growing praise

🙌 Yet signals he keeps going anyway

⏩ He plans greater intensity over time

📖 A promise about the future, not just now

## 📢 My Mouth Shall Shew Forth Thy Righteousness And Thy Salvation All The Day

Shew forth is an old spelling of show, meaning to publicly declare.

David is not keeping God's righteousness and salvation to himself.

All the day repeats the same phrase from verse eight.

His mouth is being used for testimony, not just private prayer.

📢 Shew forth means publicly declare

🙅 Not kept private, spoken to others

🔁 All the day repeats verse eight

📖 His mouth becomes a testimony

## 🔢 For I Know Not The Numbers Thereof

This is not a statement about David's math skills.

Numbers thereof means the list of times God has saved him.

That list has grown too long across his whole life to count.

A lifetime with God produces more than any one person can list.

🔢 Not about David's math ability

📜 Numbers thereof means his list of rescues

♾️ That list is too long to count

📖 A lifetime with God is that full

## 🚶 I Will Go In The Strength Of The Lord GOD

Go in the strength means moving forward using power that is not his own.

David is old and his own strength was already described as failing.

He is choosing to move forward anyway, borrowing God's strength instead.

This is a decision, not a feeling of sudden energy.

🚶 Go in strength means moving on borrowed power

🦴 His own strength was already failing

🙌 He borrows God's strength instead

📖 This is a decision, not a feeling

## 🗣️ I Will Make Mention Of Thy Righteousness, Even Of Thine Only

Make mention means speaking about something on purpose, not by accident.

Even of thine only means David will credit God alone, not himself.

This is a deliberate choice to keep the praise from shifting to his own effort.

After everything he has survived, this humility is a real accomplishment.

🗣️ Make mention means speaking on purpose

🙌 Thine only means credit goes to God alone

🚫 Not shifting praise to his own effort

📖 Real humility after real survival

# Psalms 71:17-19
# 📚 A Lifetime Of Teaching, Now Passed Forward
---
## 🔁 O God, Thou Hast Taught Me From My Youth

From my youth repeats the same phrase used earlier in verse five.

There it described trust, here it describes being taught.

David's whole life has been one long lesson from God.

Faith and learning grew together across his lifetime, not separately.

🔁 From my youth repeats verse five's phrase

📚 There it was trust, here it is teaching

🕰️ His whole life was one long lesson

📖 Faith and learning grew together

## ⏳ And Hitherto Have I Declared Thy Wondrous Works

Hitherto is an old word meaning up until this very moment.

Declared means spoken about publicly, not kept as private belief.

Wondrous works refers to specific things God has actually done for him.

David is summarizing a lifetime of public testimony in one line.

⏳ Hitherto means up until this moment

📢 Declared means spoken publicly

✨ Wondrous works means specific things God did

📖 A lifetime of testimony in one line

## 🧓 Now Also When I Am Old And Greyheaded

Greyheaded simply describes gray hair, a plain sign of old age.

This line confirms what earlier verses only hinted at.

David is not young or middle aged when he writes this psalm.

His prayer is coming from the far end of a long life.

🧓 Greyheaded simply means gray haired

✅ This confirms his age directly

📅 David writes this late in life

📖 A prayer from the far end of life

## 👴 Until I Have Shewed Thy Strength Unto This Generation, And Thy Power To Every One That Is To Come

Shewed is an old spelling of showed.

This generation means the people alive around him right now.

Every one that is to come means people not even born yet.

David wants his remaining years to matter to people he will never meet.

👴 Shewed means showed, plain and simple

👥 This generation means people alive now

👶 Every one to come means future generations

📖 His later years still matter to strangers

## 🏔️ Thy Righteousness Also, O God, Is Very High

Very high pictures something towering far above everything else.

It is the same kind of image used for a mountain peak.

David is saying God's righteousness cannot be measured against anything else.

Nothing in his experience compares to it.

🏔️ Very high pictures something towering

📏 Like comparing something to a mountain peak

🚫 Nothing else measures up to it

📖 God's righteousness stands beyond comparison

## ❓ O God, Who Is Like Unto Thee!

Who is like unto thee is a rhetorical question, not a real one.

David is not actually searching for a comparison.

The expected answer is that no one is like God at all.

This exclamation closes out the section on the highest possible note.

❓ A rhetorical question, not a real one

🚫 The expected answer is no one

🙌 God stands utterly without comparison

📖 The section closes on its highest note

# Psalms 71:20-21
# 💫 Revived From The Lowest Place
---
## 🔥 Thou, Which Hast Shewed Me Great And Sore Troubles

Sore here means severe, not physically tender or aching.

David is not hiding or downplaying how hard his life has been.

Shewed me troubles means God allowed him to experience real hardship.

Honesty about pain sits right next to his trust in God.

🔥 Sore means severe, not tender

🙅 David does not downplay his hardship

🎭 God allowed real hardship into his life

📖 Honesty and trust sit side by side

## 💫 Shalt Quicken Me Again, And Shalt Bring Me Up Again From The Depths Of The Earth

Quicken means to make alive again, to restore.

Depths of the earth is a poetic picture of the lowest, deadest place imaginable.

David is likely describing being revived from despair, not a literal grave.

He trusts that no depth is too low for God to reach.

💫 Quicken means made alive again

🕳️ Depths of the earth pictures the lowest place

🙏 Likely revival from despair, not a literal grave

📖 No depth is too low for God

## 🔄 Thou Shalt Increase My Greatness, And Comfort Me On Every Side

Increase my greatness is not a prayer for pride or status.

After being mocked and shamed earlier in the psalm, this is restored honor.

Comfort on every side means relief that surrounds him completely.

David asks for the opposite of the isolation he described before.

🙅 Not a prayer for pride or status

🔄 Restored honor after earlier public shame

🤗 Comfort on every side means complete relief

📖 The opposite of his earlier isolation

# Psalms 71:22-24
# 🎵 Praise Answered By Their Shame
---
## 🎵 I Will Also Praise Thee With The Psaltery

Psaltery was an ancient stringed instrument, similar to a small harp.

David moves from spoken praise to musical praise here.

Worship in his world regularly used instruments, not just words.

This adds a physical, musical layer to everything he has already said.

🎵 Psaltery was an ancient stringed instrument

🎶 Similar to a small harp

🗣️ David moves from words to music

📖 Worship here is physical, not just spoken

## ✅ Even Thy Truth, O My God

Truth here means God's faithfulness, his record of kept promises.

It is not an abstract fact, it is proof David has lived.

Praising God's truth is different from praising his power or his mercy.

David names one more specific thing to be thankful for.

✅ Truth means God's faithfulness, kept promises

📜 Proof David has actually lived through

🙏 Different from praising power or mercy

📖 One more specific reason for thanks

## 🎻 Unto Thee Will I Sing With The Harp

Harp names a second instrument alongside the psaltery.

David is pairing two instruments here, the same way he paired two names for God.

Worship in his world regularly used more than one instrument together.

This adds fuller, layered music to his praise.

🎻 Harp is a second instrument named

🎶 Paired with the psaltery already mentioned

🎼 Worship regularly used instruments together

📖 This adds fuller, layered praise

## ✨ O Thou Holy One Of Israel

Holy One of Israel is a covenant title, not a generic name for God.

Holy means set apart, completely different from anything else.

Of Israel ties that holiness to a specific relationship, not a distant deity.

This title appears often in the prophets, especially Isaiah.

✨ Holy means set apart, completely different

🤝 Of Israel ties it to a real relationship

📚 This title appears often in Isaiah

📖 A covenant title, not a generic name

## 😄 My Lips Shall Greatly Rejoice When I Sing Unto Thee

Greatly rejoice describes real, visible joy, not a quiet inner feeling.

Lips picture the physical act of singing, not just the emotion behind it.

David expects his praise to show outwardly, not stay hidden.

Singing becomes the outward proof of an inward trust.

😄 Greatly rejoice means visible, not quiet joy

👄 Lips picture the physical act of singing

🎤 Praise is meant to show outwardly

📖 Singing proves an inward trust

## 💰 And My Soul, Which Thou Hast Redeemed

Redeemed means bought back or rescued, often at a real cost.

In David's world, redeeming often meant paying a price to free someone.

He is not just claiming to be helped, he is claiming to be rescued at a price.

This word gives weight to everything he has already said about God's rescue.

💰 Redeemed means bought back or rescued

🔓 Often meant paying a real price

⚖️ More than helped, actually rescued

📖 This word gives weight to his rescue

## 🔁 My Tongue Also Shall Talk Of Thy Righteousness All The Day Long

All the day long repeats a phrase already used twice earlier in this psalm.

David keeps returning to the same promise of constant, ongoing praise.

Tongue adds a third body part named for praise, after mouth and lips.

The repetition itself becomes a kind of proof of how serious he is.

🔁 All the day long repeats a phrase

🙌 A promise of constant, ongoing praise

👅 Tongue is a third body part named

📖 Repetition itself proves how serious he is

## ✅ For They Are Confounded, For They Are Brought Unto Shame, That Seek My Hurt

Confounded and brought unto shame repeat the exact request from earlier in the psalm.

That seek my hurt names the same enemies described back in verse thirteen.

The psalm closes with the prayer already being answered, not just hoped for.

David began asking never to be put to confusion, and ends watching his enemies face it instead.

🔁 Confounded and shame repeat earlier requests

🎯 Seek my hurt names the same enemies

✅ The prayer closes already answered

📖 Confusion lands on them, not on David`.trim();

export const PSALMS_SEVENTY_ONE_PERSONAL_SECTIONS = parsePsalmsSeventyOneRawNotes(PSALMS_SEVENTY_ONE_RAW_NOTES);
