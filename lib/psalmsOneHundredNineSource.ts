export type PsalmsOneHundredNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredNineRawNotes(rawText: string): PsalmsOneHundredNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+109:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 109 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+109:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+109:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 109 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 109,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 109:${startVerse}` : `Psalms 109:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 109 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_NINE_RAW_NOTES = `# Psalms 109:1-5
# 😤 Hatred Without A Cause
---
## 🤐 Hold Not Thy Peace, O God Of My Praise

"Hold not thy peace" means do not stay silent.

David is asking God to speak up and act.

"The God of my praise" ties this plea to a God he already praises.

This is not a stranger's complaint.

It comes from inside a real, existing relationship.

🤐 Means do not stay silent

🙏 God of my praise names their bond

📣 David asks God to act now

📖 A plea from inside a real relationship

## ⚖️ They Have Spoken Against Me With A Lying Tongue

This whole psalm reads like a courtroom scene.

The wicked and deceitful men here are accusers, not casual gossips.

A lying tongue means the charge against David is not even true.

David is not just hurt by mean words.

He is being formally slandered instead.

⚖️ Written like a courtroom scene

🗣️ Accusers, not casual gossips

🤥 Lying tongue means a false charge

📖 Formal slander, not simple gossip

## 🔄 They Compassed Me About Also With Words Of Hatred

"Compassed" means surrounded on every side.

David pictures hostile words closing in on him like a circle.

There is no direction left to turn where the hatred is absent.

This is not one insult.

It is constant pressure from every side at once.

🔄 Compassed means surrounded on every side

🗯️ Hostile words close in like a circle

🚫 No direction offers any escape

📖 Constant pressure, not one insult

## 🎯 Fought Against Me Without A Cause

"Without a cause" means David gave them no real reason to hate him.

Jesus later echoes this exact wording in the Gospel of John.

He describes people hating him for no reason, using nearly the same words.

Causeless hatred against God's people did not start with David.

🎯 Without a cause means no real reason

✝️ Jesus later echoes this same wording

🔁 A pattern older than David's own story

📖 Causeless hatred is a recurring pattern

## 💔 For My Love They Are My Adversaries

David loved these people.

Yet they became his enemies because of it.

Love did not earn him safety here.

It earned him open opposition instead.

💔 Love repaid with hostility

🔄 Love earned opposition instead of safety

⚖️ Not petty conflict, but real unfairness

📖 The psalm opens on this unfairness

## 🙏 But I Give Myself Unto Prayer

Instead of striking back, David turns straight to prayer.

"I give myself" means his full attention goes into praying.

This is David's actual response to hatred, not just a private wish.

The rest of the psalm grows out of this one choice.

🙏 Turns to prayer instead of revenge

🎯 Give myself means full focus

🚫 Praying, not plotting revenge

📖 The whole psalm grows from this choice

## 🔁 They Have Rewarded Me Evil For Good, And Hatred For My Love

This verse restates the idea from the verse just before it.

Repeating an idea twice in a row is common in Hebrew poetry.

Evil for good and hatred for love name the same unfairness two ways.

Saying it twice makes that unfairness impossible to miss.

🔁 Restates the verse before it

📜 Repetition is common in Hebrew poetry

⚖️ Evil for good, hatred for love

📖 Said twice, unmistakable either way

# Psalms 109:6-10
# ⚖️ Set A Wicked Man Over Him
---
## 🎯 Set Thou A Wicked Man Over Him

Starting here, David narrows his complaint from a whole group to one man.

This is likely the chief accuser leading the attack against him.

David asks that this man be judged by someone just as corrupt.

The punishment is asked to match the crime.

🎯 Shifts from a group to one man

👤 Likely the chief accuser

⚖️ Judged by someone just as corrupt

📖 The punishment matches the crime

## ⚖️ Let Satan Stand At His Right Hand

In an ancient court, the accuser traditionally stood at the right hand of the accused.

"Satan" here works as a legal title meaning accuser, not only a proper name.

Zechariah chapter three pictures this exact same courtroom position.

David is asking for permanent, relentless accusation against this man.

⚖️ Right hand was the accuser's position

📛 Satan means accuser here, not just a name

📜 Zechariah three pictures this same scene

📖 David asks for relentless accusation

## ✅ Let Him Be Condemned

David asks that any trial against this man end in a guilty verdict.

This is the opposite of what the man wanted for David.

He tried to get David condemned falsely.

So David asks for a true conviction instead.

⚖️ Asks for a guilty verdict

🔄 The opposite of what he wanted for David

✅ A true conviction, not a false one

📖 The tables turn on the accuser

## 🙏 Let His Prayer Become Sin

Prayer is normally something that helps a person, not something used against them.

David asks that even this man's prayers count against him instead.

This is one of the harshest requests in the whole psalm.

It pictures a person so guilty that even his good acts turn bad.

🙏 Prayer normally helps, not harms

🚫 Even his prayers count against him

😨 One of the harshest lines in the psalm

📖 Guilt so deep it turns good acts bad

## ⏳ Let His Days Be Few, And Let Another Take His Office

This exact verse gets quoted later in the book of Acts, chapter one.

Peter applies it directly to Judas, after his betrayal of Jesus.

"Let another take his office" becomes the reason the apostles choose his replacement.

A curse written centuries earlier ends up describing a real betrayal in the Gospels.

📖 Quoted in Acts chapter one

😔 Peter applies it to Judas

🔄 Basis for choosing Judas's replacement

➡️ An old curse describes a real betrayal

## 👨‍👧 Let His Children Be Fatherless, And His Wife A Widow

The curse now moves from the man himself to his whole family.

Losing a father in this culture meant losing protection and income at once.

A widow in ancient Israel had very few ways to support herself.

This line asks for his downfall to reach his household too.

👨‍👧 Curse widens from the man to his family

🏠 A father's loss meant lost protection and income

😔 Widows had very few ways to survive alone

📖 The downfall reaches his whole household

## 🚶 Let His Children Be Continually Vagabonds, And Beg

"Vagabond" means someone with no home, wandering from place to place.

David pictures this man's children reduced to homeless beggars.

"Desolate places" points to ruined, abandoned land with nothing left to offer.

Even searching for food would mean searching through wreckage.

🚶 Vagabond means homeless and wandering

🥺 Children reduced to begging

🏚️ Desolate places means ruined, abandoned land

📖 Even their search for food finds wreckage

# Psalms 109:11-15
# 🪦 Let His Posterity Be Cut Off
---
## 💰 Let The Extortioner Catch All That He Hath

An "extortioner" is someone who takes property through threats or force, not fair trade.

David asks that a violent creditor seize everything this man owns.

This is the same kind of unjust taking the man was accused of.

The curse fits the very crime being punished.

💰 Extortioner means someone who takes by force

🏚️ Everything he owns is asked to be seized

🔄 Matches the crime he was accused of

📖 The curse fits the crime

## 🌍 Let The Strangers Spoil His Labour

"Strangers" here means outsiders with no rightful claim to what he built.

"Spoil his labour" means take away everything he worked to earn.

Years of effort end up in the hands of people who never earned it.

The curse targets the fruit of his work, not just his money.

🌍 Strangers means outsiders with no rightful claim

🧺 Spoil his labour means take his earnings

😔 Years of effort lost to others

📖 The curse targets his life's work

## 🚫 Let There Be None To Extend Mercy Unto Him

David asks that no one show this man kindness.

Not even his own children are spared from this request.

"Favour" here means special kindness or protection offered freely.

This is the exact mercy the man refused to show others.

🚫 No mercy for the man himself

👶 None even for his own children

🔄 The mercy he refused to give others

📖 A world with no mercy left for him

## 👪 Let His Posterity Be Cut Off

"Posterity" means his descendants, the family line meant to carry his name.

"Cut off" pictures that line ending completely.

"Blotted out" means erased, like ink wiped clean off a page.

David asks that this family be forgotten within one generation.

👪 Posterity means his family line

✂️ Cut off means the line ends completely

🖊️ Blotted out means erased like wiped ink

📖 Forgotten within a single generation

## ⚖️ Let The Iniquity Of His Fathers Be Remembered With The LORD

"Iniquity" means real guilt for wrongdoing, not just a small mistake.

David asks that even his ancestors' guilt stay on God's record.

People often assume old sins fade away with time.

This verse asks God to keep that guilt on record instead.

⚖️ Iniquity means real guilt, not a small mistake

🧬 Even the fathers' guilt is included

⏳ Sins do not simply fade with time

📖 The record stays open before God

## 👁️ That He May Cut Off The Memory Of Them From The Earth

"Before the LORD continually" means kept always in view, like evidence never filed away.

This family is kept in view by God.

At the same time, David asks that they disappear from human memory.

Being remembered by God and forgotten by people happen together here.

👁️ Kept always before the LORD

🫥 But forgotten completely by people

⚖️ Remembered by God, erased from memory

📖 A harsh close to the curse section

# Psalms 109:16-20
# 🧥 He Loved Cursing
---
## ❓ Because That He Remembered Not To Shew Mercy

This verse finally explains why all these curses were asked for.

The man's real crime was refusing to show mercy to anyone.

"Shew" is simply the old spelling of "show."

Every curse asked for so far traces back to this one failure.

❓ Finally explains why the curses were asked

🚫 His crime was refusing mercy

📝 Shew is an old spelling of show

📖 Every curse traces back to this failure

## 💔 That He Might Even Slay The Broken In Heart

"The broken in heart" means people already crushed by grief or hardship.

This man did not simply ignore the hurting.

He went after them instead.

Targeting someone already broken is a specific kind of cruelty.

💔 Broken in heart means already crushed by grief

🎯 He targeted the already hurting

😨 A specific kind of cruelty

📖 This makes the curse feel earned

## 😈 As He Loved Cursing, So Let It Come Unto Him

This man loved cursing people.

David asks for that very curse to land on him instead.

He also took no delight in blessing others.

So blessing is asked to stay just as far away.

The punishment matches exactly what he already chose for his own life.

😈 He loved cursing others

🔄 That curse now lands on him

🚫 He also refused to bless

📖 The punishment matches his own choice

## 👕 He Clothed Himself With Cursing Like As With His Garment

A garment in this culture was worn every day and seen by everyone.

Comparing cursing to a garment pictures it as part of his identity.

This was not an occasional outburst.

It was simply how he presented himself.

👕 Garments were worn daily, seen by all

🎭 Cursing became part of his identity

🚫 Not an occasional outburst

📖 How he presented himself every day

## 💧 Let It Come Into His Bowels Like Water, And Like Oil Into His Bones

Water and oil were both known for soaking completely into whatever they touched.

"Bowels" and "bones" picture the deepest, most internal parts of a person.

David asks that the curse stop being just words and sink in completely.

What started as an outer garment is now asked to become an inner reality.

💧 Water and oil soak in completely

🦴 Bowels and bones mean the deepest parts

➡️ The curse moves from outside to inside

📖 Words are asked to become reality

## 🎗️ For A Girdle Wherewith He Is Girded Continually

A "girdle" was a belt or sash tied around the waist, worn every day.

Unlike a coat, a girdle stayed cinched on constantly.

David asks that this curse become just as permanent.

The garment image from before is now sealed shut for good.

🎗️ Girdle means a belt worn daily

🔒 Unlike a coat, it stayed cinched on

♾️ The curse is asked to be permanent

📖 The garment image is now sealed shut

## ⚖️ Let This Be The Reward Of Mine Adversaries From The LORD

David has been asking God for all of this.

He has not been planning it himself.

"From the LORD" means this outcome comes from God's justice, not David's hand.

David never raises a hand against these men anywhere in this psalm.

He leaves the punishment entirely in God's control.

🙏 All of this comes from David's prayer

⚖️ From the LORD, not David's hand

🚫 David never raises a hand himself

📖 He leaves the punishment to God

# Psalms 109:21-25
# 😢 I Am Poor And Needy
---
## 👑 O GOD The Lord, For Thy Name's Sake

The tone shifts here from curses against an enemy to a direct plea.

Using two titles for God together, GOD and Lord, stresses his full authority.

"For thy name's sake" means David is asking based on God's own reputation.

He is not claiming he deserves this.

He is appealing to who God is instead.

🔄 Tone shifts from curse to plea

👑 Two titles stress God's full authority

🏷️ For thy name's sake appeals to God's reputation

📖 Not deserving, but appealing to who God is

## 💞 Because Thy Mercy Is Good, Deliver Thou Me

"Mercy" here means God's loyal, covenant love for his people.

David grounds his rescue request in God's character, not his own record.

"Deliver" means rescue from real danger, not a small inconvenience.

The request rests entirely on who David already knows God to be.

💞 Mercy means loyal, covenant love

📜 Grounded in God's character, not David's record

🛟 Deliver means rescue from real danger

📖 The request rests on who God is

## 💸 I Am Poor And Needy, And My Heart Is Wounded Within Me

David openly admits he has no resources of his own.

"Wounded" pictures a real injury, not simply sadness.

This kind of honesty is rare in the middle of a conflict.

His confidence in the earlier curses never denied how much this hurt.

💸 No resources of his own

🩹 Wounded pictures a real injury, not sadness

🗣️ Rare honesty in the middle of conflict

📖 Confidence and real pain live side by side

## 🌇 I Am Gone Like The Shadow When It Declineth

A shadow grows longest right before it vanishes at sunset.

"Declineth" means fading or sinking, like the sun going down.

David pictures himself fading out, close to disappearing entirely.

This is not exaggeration.

It describes real physical and emotional exhaustion.

🌇 A shadow stretches longest before vanishing

📉 Declineth means fading or sinking

👻 David pictures himself close to disappearing

📖 Real exhaustion, not exaggeration

## 🦗 I Am Tossed Up And Down As The Locust

A locust has no control over where the wind carries it.

David compares himself to something blown around with no say in the outcome.

This pictures total helplessness, not just sadness.

Both images in this verse describe a man who feels like he is disappearing.

🦗 A locust cannot control the wind

🌬️ David feels blown around helplessly

😔 Pictures total helplessness, not sadness

📖 A man who feels like he is disappearing

## 🍽️ My Knees Are Weak Through Fasting

Fasting meant going without food, often as part of urgent prayer.

David has been fasting so long that his body is failing.

"Flesh faileth of fatness" means he has lost so much weight his body looks thin.

This is not a spiritual metaphor.

It describes his actual physical state.

🍽️ Fasting meant going without food

🙏 Often part of urgent, desperate prayer

📉 Flesh faileth of fatness means real weight loss

📖 A real physical toll, not just a metaphor

## 😔 When They Looked Upon Me They Shaked Their Heads

"Reproach" means public shame.

It means being mocked openly, not hidden away in private.

Shaking the head was an ancient gesture of scorn, much like it still is today.

David is being mocked in front of others, not hurting quietly alone.

😔 Reproach means public shame

🙅 Head shaking was an ancient gesture of scorn

👀 Mocked openly, not hidden away

📖 Same gesture, same meaning across centuries

# Psalms 109:26-31
# 🙌 The Right Hand Of The Poor
---
## 🆘 Help Me, O LORD My God

David now uses God's personal covenant name, LORD, to make this plea direct.

This is a short, urgent request, not a long argument.

"According to thy mercy" means David asks based on God's character, not his own merit.

The prayer has moved from complaint into simple, direct dependence.

🆘 A short, urgent request

🏷️ LORD is God's personal covenant name

📜 Based on God's character, not merit

📖 Complaint has become simple dependence

## 👁️ That They May Know That This Is Thy Hand

David wants his rescue to look obviously like God's doing, not luck.

"Thy hand" pictures God's direct, personal involvement in what happens next.

If David is saved, everyone watching should know exactly who did it.

The purpose of this deliverance reaches beyond David to everyone watching.

👁️ Rescue should look obviously like God's doing

✋ Thy hand pictures direct, personal involvement

📢 Everyone watching should know who acted

📖 The purpose reaches beyond David alone

## 😤 Let Them Curse, But Bless Thou

David admits the cursing from his enemies will probably keep happening.

He does not ask God to silence their words directly.

Instead he asks for God's blessing to simply outweigh it.

Two very different sources speak over David at the same time.

😤 Their cursing will likely continue

🙏 God's blessing is asked to outweigh it

⚖️ Two opposite voices speak at once

📖 Blessing does not require silencing the curse

## 😊 But Let Thy Servant Rejoice

"When they arise" pictures David's enemies acting confidently, expecting to win.

David asks that their confidence end in shame instead.

At the same moment, he asks for his own outcome to be joy.

The same event is asked to land completely differently on each side.

💪 They arise expecting to win

😳 Their confidence is asked to end in shame

😊 David's outcome is asked to be joy

📖 One event, two completely different endings

## 🧥 Cover Themselves With Their Own Confusion, As With A Mantle

"Mantle" means an outer cloak, worn over everything else a person had on.

"Confusion" here means shame and humiliation, not simply being puzzled.

Earlier in this psalm, the wicked man clothed himself with cursing like a garment.

That same clothing image returns here, now covering his own supporters instead.

🧥 Mantle means an outer cloak

😳 Confusion here means shame, not puzzlement

🔁 Echoes the garment image from earlier

📖 What he chose, they now wear

## 🗣️ I Will Greatly Praise The LORD With My Mouth

David closes this psalm the same way he opened it, speaking directly to God.

"Among the multitude" means he plans to praise God publicly, not privately.

The whole psalm has moved from a private complaint to a public prayer.

Now it ends with a public vow of praise instead.

🗣️ Praise spoken with his own mouth

👥 Among the multitude means done publicly

🔄 Complaint becomes praise by the end

📖 A public vow closes the psalm

## 🙌 He Shall Stand At The Right Hand Of The Poor

This verse directly reverses the picture from the start of the psalm.

Back in verse six, David asked for an accuser to stand at his enemy's right hand.

Here, God himself stands at the right hand of the poor, ready to save.

The same position that once meant accusation now means rescue.

🔄 Reverses the picture from verse six

😈 Verse six pictured an accuser at that position

🙌 Now God stands there to save instead

📖 The same position, now meaning rescue
`.trim();

export const PSALMS_ONE_HUNDRED_NINE_PERSONAL_SECTIONS = parsePsalmsOneHundredNineRawNotes(PSALMS_ONE_HUNDRED_NINE_RAW_NOTES);
