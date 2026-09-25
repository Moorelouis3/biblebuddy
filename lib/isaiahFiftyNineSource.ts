export type IsaiahFiftyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyNineRawNotes(rawText: string): IsaiahFiftyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+59:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 59 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+59:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+59:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 59 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 59,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 59:${startVerse}` : `Isaiah 59:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 59 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_NINE_RAW_NOTES = `# Isaiah 59:1-3
# 🙉 Not God, But Us
---
## The LORD's Hand Is Not Shortened, That It Cannot Save

This does not mean God's power has grown smaller or weaker over time.

A shortened hand pictures someone too weak to reach out and act.

God is telling Israel their prayers were not failing because He grew weak.

The problem was never a weak God.

🖐️ Shortened hand means too weak to act

❌ God is not describing His own weakness

🙏 Israel's prayers were not failing from His end

📖 The problem was never God's strength

## Neither His Ear Heavy, That It Cannot Hear

"Heavy" here means dulled or blocked, not literally weighed down.

A heavy ear could not pick up sound clearly.

God is again denying that the problem sits on His side.

He can hear everything Israel says and does.

👂 Heavy here means dulled or blocked

🚫 A heavy ear could not hear well

🙅 God denies the problem is on His side

📖 Nothing said or done escapes His hearing

## Your Iniquities Have Separated Between You And Your God

"Iniquities" means sins so serious they twist a person's whole direction.

Verse one already ruled out a weak or distant God.

This verse names the actual cause of the silence.

Sin itself had built the wall between them.

⚖️ Iniquities means twisting, serious sin

🧱 Sin itself built the wall

👤 The distance was never God's doing

📖 Sin, not God, caused the silence

## Your Sins Have Hid His Face From You

This does not mean God physically turned away and vanished.

"Hid his face" means He withdrew the sense of His nearness.

The people could no longer feel Him close by.

Their own sin had caused that hidden feeling.

🙈 Hid his face means withdrawn nearness

😶 Not a literal disappearance of God

💔 The people felt distant from Him

📖 Their own sin caused that distance

## Your Hands Are Defiled With Blood

"Defiled" means made unclean by something touched or done.

This is not a vague or symbolic accusation.

The text points to real violence and real bloodshed.

Their own actions had made them unfit to approach God.

🩸 Defiled means made unclean by contact

⚔️ This points to real violence

🙅 Not a symbolic or vague charge

📖 Their own actions blocked their access to God

## Your Tongue Hath Muttered Perverseness

"Perverseness" means speech that twists what is right into what is wrong.

"Muttered" suggests this had become a constant undertone, not a rare slip.

Their words had grown crooked from repeated practice.

A tongue can become corrupt just like a hand.

🗣️ Perverseness means twisted, corrupt speech

🔁 Muttered suggests a constant habit

🌀 Their words had grown crooked

📖 A tongue corrupts just like a hand

# Isaiah 59:4-8
# 🕸️ Webs That Cannot Clothe Anyone
---
## None Calleth For Justice, Nor Any Pleadeth For Truth

"Pleadeth" is old courtroom language for arguing a case before a judge.

This describes a society where no one steps up to demand what is right.

Truth had no one left to defend it in public.

The legal system meant to protect people had gone silent.

⚖️ Pleadeth means arguing a case in court

🤐 No one demanded justice anymore

📉 Truth had no defenders left

📖 The system meant to protect people went silent

## They Trust In Vanity, And Speak Lies

"Vanity" here means something empty, worthless, and unable to deliver.

The people were putting their confidence in something that could not hold weight.

Lying naturally followed once truth stopped mattering to them.

An empty foundation always produces empty words.

💨 Vanity means something empty and worthless

🏗️ They trusted a foundation with no strength

🗣️ Lying followed once truth stopped mattering

📖 An empty foundation produces empty words

## They Conceive Mischief, And Bring Forth Iniquity

"Conceive" and "bring forth" are the same words used for pregnancy and birth.

The picture is that sin starts small and hidden, then grows into full action.

"Mischief" here is not childish trouble but serious harm done to others.

Their sin was not accidental but something carried and delivered on purpose.

🤰 Conceive and bring forth picture pregnancy

🌱 Sin starts small before it grows

⚠️ Mischief here means serious harm

📖 Their sin was planned, not accidental

## They Hatch Cockatrice' Eggs

A "cockatrice" was an old English name for a deadly, venomous serpent.

Hatching its eggs pictures plans that produce nothing but poison and death.

Anyone who touches what these people produce ends up harmed.

Even their most careful plans were deadly at the core.

🐍 Cockatrice meant a venomous serpent

☠️ Their plans produced poison, not life

🚫 Touching their work brought harm

📖 Even careful plans were deadly inside

## Weave The Spider's Web

A spider's web looks intricate but was never built to hold real weight.

Their careful scheming looked impressive from the outside.

None of it could actually support or protect anyone.

Verse six spells out exactly what that web fails to do.

🕸️ A web looks intricate but holds nothing

🎭 Their scheming looked impressive outwardly

🚫 It never protected anyone

📖 The next verse names what it cannot do

## Their Webs Shall Not Become Garments

A web can never be woven into clothing that actually covers someone.

Their schemes could not protect them the way real righteousness would.

Whatever they built with their own hands stayed useless in the end.

Violence, not usefulness, was the real product of their labor.

🧵 A web cannot become real clothing

🛡️ Their schemes could not protect them

🙌 Their own works stayed useless

📖 Violence was their true product

## Their Feet Run To Evil

Feet running to evil is an old idiom for eager, quick sin.

They were not slow or reluctant about doing wrong.

Speed itself showed how comfortable they had become with harm.

Nobody drifted into this evil, they hurried toward it.

🏃 Running feet means eager, quick sin

⚡ They were not slow or reluctant

😨 Speed showed comfort with harm

📖 They hurried toward evil, not drifted

## Wasting And Destruction Are In Their Paths

Everywhere these people walked, ruin followed close behind.

"Wasting" means resources and lives left stripped and empty.

A path usually leads somewhere, but this one only leaves damage.

Their whole way of living had become destructive by habit.

🌪️ Ruin followed everywhere they walked

🍂 Wasting means stripped and empty

💥 The path itself only leaves damage

📖 Destruction had become their habit

## They Have Made Them Crooked Paths

A crooked path bends and twists instead of running straight and honest.

This pictures a whole way of living built on dishonesty.

Anyone who follows that path inherits the same lack of peace.

The way of peace and the crooked path cannot both be walked.

🌀 Crooked path means twisted, dishonest living

🚷 It describes a whole way of life

😟 Followers inherit the same unrest

📖 Peace and crooked paths cannot mix

# Isaiah 59:9-11
# 🌑 Groping In The Daylight
---
## Therefore Is Judgment Far From Us

The voice suddenly shifts from accusing "they" to confessing "us."

This is Isaiah joining the confession instead of standing apart from it.

The consequences named earlier now belong to the whole nation, himself included.

No one gets to watch this sin from a safe distance.

🔀 The voice shifts from they to us

🙋 Isaiah joins the confession himself

🌍 Consequences now belong to everyone

📖 No one watches from a safe distance

## We Wait For Light, But Behold Obscurity

"Obscurity" means darkness or a confused, unclear situation.

They hoped for clarity and relief but received the opposite.

Verse eight already promised no peace on this crooked path.

Their own choices had produced the darkness they now complain about.

🌫️ Obscurity means darkness or confusion

🙏 They hoped for light, not this

🔁 This fulfills the warning from before

📖 Their choices produced this darkness

## We Grope For The Wall Like The Blind

"Grope" means feeling around blindly, searching by touch instead of sight.

A blind person uses a wall to find their way forward safely.

This nation had lost that kind of moral direction completely.

They could no longer tell right from wrong on their own.

✋ Grope means searching blindly by touch

🧱 A wall guides someone who cannot see

🧭 They had lost moral direction

📖 They could not tell right from wrong

## We Stumble At Noon Day As In The Night

This is not describing an actual physical disability.

Noon is the brightest, clearest hour of the whole day.

Even then, this nation stumbled as if it were pitch dark.

Their confusion came from inside, not from a lack of daylight.

☀️ Noon was the brightest hour

🌑 They stumbled anyway, as if dark

🧠 The confusion came from inside them

📖 Daylight was never the problem

## We Roar All Like Bears, And Mourn Sore Like Doves

A bear roars out of frustration and barely controlled anger.

A dove makes a low, mournful sound linked with grief.

Together the two pictures describe anger and sorrow mixed in one people.

They wanted relief but only found more waiting.

🐻 A bear's roar pictures frustration

🕊️ A dove's sound pictures grief

😢 Anger and sorrow are mixed here

📖 They found more waiting, not relief

# Isaiah 59:12-15
# ⚖️ Truth Falls In The Street
---
## Our Sins Testify Against Us

"Testify" is courtroom language for a witness speaking in front of a judge.

Their own sins now stood as the evidence, not some outside accuser.

They could not claim ignorance or blame someone else for it.

This confession finally admits what verses one through eight already proved.

⚖️ Testify means acting as a witness

👤 Their own sins were the witness

🙅 No one else could be blamed

📖 The confession matches the evidence

## Speaking Oppression And Revolt

"Oppression" here means using power to crush or mistreat someone weaker.

"Revolt" means open rebellion against rightful authority.

Both had become normal topics of everyday conversation.

Their speech revealed exactly what their hearts had accepted.

👊 Oppression means crushing the weak

🚩 Revolt means open rebellion

🗣️ Both became normal conversation

📖 Speech revealed what hearts accepted

## Conceiving And Uttering From The Heart Words Of Falsehood

This repeats the same conceiving and bearing image from verse four.

Lies were not careless slips of the tongue here.

They were planned inside the heart before they ever reached the mouth.

The heart, not just the mouth, needed to change.

🔁 This repeats the image from before

🧠 Lies were planned in the heart

👄 The mouth just delivered what was planned

📖 The heart needed to change, not just words

## Judgment Is Turned Away Backward

Judgment is pictured here as a person forced to retreat.

It is not simply absent, it has been actively pushed back.

Someone or something drove justice out of its rightful place.

The nation had made room for wrong instead of right.

🔙 Judgment is pictured retreating

👊 It was pushed back, not just missing

🏛️ Justice lost its rightful place

📖 Room was made for wrong, not right

## Truth Is Fallen In The Street

In this culture, city gates and open streets were where elders judged cases.

Truth falling there pictures the whole legal system collapsing in public.

"Equity" means fairness, and it could no longer even get through the door.

The very place meant for justice had become unsafe for it.

🏙️ Streets and gates were where cases were judged

📉 Truth collapsed in that public place

🚪 Equity means fairness, and it was shut out

📖 The place for justice became unsafe for it

## He That Departeth From Evil Maketh Himself A Prey

This does not mean doing right causes punishment from God.

In a corrupt society, an honest person becomes an easy target for others.

"Prey" pictures someone hunted, the way a predator stalks a weaker animal.

Living rightly here came at a real, painful cost.

🎯 Doing right did not bring God's punishment

🦌 Prey pictures being hunted by others

😔 Honesty made someone an easy target

📖 Right living carried a real cost

## It Displeased Him That There Was No Judgment

Everything up to this point has described human failure alone.

Here the LORD Himself finally reacts to what He observed.

His displeasure marks the turning point of the whole chapter.

What happens next comes directly from His own response.

👁️ God finally reacts to what He saw

🔀 This marks the chapter's turning point

😠 His response is real displeasure

📖 Everything after flows from this moment

# Isaiah 59:16-18
# 🛡️ The Divine Warrior Arms Himself
---
## There Was No Man

God looked for even one person willing to stand and act rightly.

Nobody stepped forward to change the situation described in the verses before.

This confirms how deep the corruption in the nation had spread.

The failure was total, not just widespread.

🔍 God looked for someone to act

🚫 No one stepped forward at all

📉 The corruption had spread completely

📖 The failure was total, not partial

## Wondered That There Was No Intercessor

An "intercessor" is someone who steps between two parties to plead on another's behalf.

God expected at least one person to plead for the nation.

"Wondered" here shows genuine astonishment at finding no one.

Since no human filled that role, God chose to fill it Himself.

🙏 Intercessor means someone pleading for another

😮 Wondered shows real astonishment

👤 No human filled that role

📖 God stepped into the role Himself

## He Put On Righteousness As A Breastplate

A breastplate was a piece of armor protecting a soldier's chest in battle.

Picturing righteousness as a breastplate means God's own goodness became His protection.

He needed no human ally to fight for what was right.

This same armor picture appears again much later in Ephesians chapter six.

🛡️ A breastplate protected a soldier's chest

✅ Righteousness became God's own protection

⚔️ He needed no human ally

📖 The same image returns in Ephesians

## An Helmet Of Salvation Upon His Head

A helmet protected the most vital, exposed part of a soldier's body.

Salvation here is not just a future hope but active protection.

God guarded His own plan to rescue His people Himself.

Nothing could stop the deliverance He had already decided on.

🪖 A helmet protected the head

🎯 Salvation is pictured as active protection

👑 God guarded His own rescue plan

📖 Nothing could stop this deliverance

## Clad With Zeal As A Cloak

A cloak was the outer layer everyone could see a person wearing.

"Zeal" means intense, focused passion for a cause.

God's determination to set things right was visible on the outside, not hidden.

Vengeance here means setting right what evil had twisted, not petty anger.

🧥 A cloak was worn on the outside

🔥 Zeal means intense, focused passion

👀 God's resolve was visible, not hidden

📖 Vengeance means making wrong things right

## To The Islands He Will Repay Recompence

"Islands" here was a common way to describe distant coastlands and nations.

It did not refer to a few small pieces of land nearby.

"Recompence" means paying back exactly what is deserved.

God's justice was never limited to Israel alone.

🏝️ Islands meant distant nations and coastlands

🌍 God's reach went beyond Israel

⚖️ Recompence means paying back what is owed

📖 His justice covers the whole world

# Isaiah 59:19-21
# 🕊️ The Redeemer's Covenant
---
## His Glory From The Rising Of The Sun

The Bible often names two opposite directions to mean the whole world.

West and the rising sun, which is east, cover everywhere in between.

This means people everywhere, not just Israel, will eventually recognize the LORD.

His name will not stay confined to one nation forever.

🧭 West and east together mean everywhere

🌍 This includes people beyond Israel

👑 God's name will not stay confined

📖 Recognition of Him will spread worldwide

## The Spirit Of The LORD Shall Lift Up A Standard Against Him

A "standard" was a raised banner or flag used to rally soldiers in battle.

The enemy is pictured coming in like a sudden, overwhelming flood.

God's own Spirit raises the counter response against that flood.

The threat looked unstoppable, but the response was already prepared.

🚩 A standard was a battle rallying flag

🌊 The enemy is pictured as a flood

🛡️ God's Spirit raises the counter response

📖 The threat was never actually unstoppable

## The Redeemer Shall Come To Zion

"Redeemer" was a family member with the right to rescue a relative.

That could mean buying back land, or freeing someone from debt or danger.

"Zion" is another name for Jerusalem, where God's presence dwelt.

This Redeemer comes only to those who turn from sin.

Rescue in this chapter always follows repentance, never replaces it.

👨‍👩‍👧 Redeemer means a rescuing family member

🏙️ Zion refers to Jerusalem

🔄 Rescue comes to those who repent

📖 Rescue follows repentance, never replaces it

## This Is My Covenant With Them

A "covenant" is a solemn, binding promise between two parties.

This one comes right after the LORD dealt with Israel's sin and judgment.

Grace was not offered instead of judgment, it followed judgment.

The relationship moves forward on God's terms, not on their record.

🤝 Covenant means a binding, solemn promise

⏳ Grace followed judgment, not instead of it

📜 The relationship moves forward on His terms

📖 Their record does not get the final word

## Nor Out Of The Mouth Of Thy Seed's Seed

"Seed" here means descendants, the children born after someone.

"Seed's seed" stretches the promise forward two full generations, to the grandchildren.

This is not a promise for just one lifetime.

God commits His word and Spirit to an unbroken, permanent line.

👶 Seed means descendants, children born after

👨‍👩‍👧‍👦 Seed's seed reaches two generations ahead

⏩ This is not a one lifetime promise

📖 God's word continues down an unbroken line
`.trim();

export const ISAIAH_FIFTY_NINE_PERSONAL_SECTIONS = parseIsaiahFiftyNineRawNotes(ISAIAH_FIFTY_NINE_RAW_NOTES);
