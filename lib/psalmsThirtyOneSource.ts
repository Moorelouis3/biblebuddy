export type PsalmsThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyOneRawNotes(rawText: string): PsalmsThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 31:${startVerse}` : `Psalms 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 31 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_ONE_RAW_NOTES = `# Psalms 31:1-4
# 🛡️ In Thee Do I Put My Trust
---
## 🛡️ In Thee, O LORD, Do I Put My Trust

Trust here means resting your whole life on someone else.

David is not describing a passing feeling here.

He is describing a deliberate decision to lean on God.

Everything else in this psalm builds on that one choice.

🛡️ Trust means resting your whole life on God
🧠 It is a decision, not a feeling
🙌 David chooses God as his one anchor
📖 The whole psalm builds on this choice

## 😳 Let Me Never Be Ashamed

"Ashamed" here does not mean simple embarrassment.

It means being publicly proven wrong for trusting God.

David asks that his faith never be mocked as foolish.

His reputation and God's reputation are tied together here.

😳 Ashamed means publicly proven wrong
🙅 Not simple embarrassment
🗣️ He fears his trust being mocked
📖 His faith and God's name are linked

## ⚖️ Deliver Me In Thy Righteousness

This is not David claiming he has earned a rescue.

He is asking God to act in line with who God already is.

"Righteousness" names God's own faithful and just character.

David's confidence rests on God's nature, not his own record.

⚖️ Righteousness names God's faithful character
🙅 Not David's own earned merit
🙏 He appeals to who God is
📖 Confidence rests on God's nature

## 🏰 Be Thou My Strong Rock, For An House Of Defence

A "rock" pictured a high, steep place enemies could not easily climb.

A "house of defence" pictures a fortified shelter built for protection.

Think of a walled tower on a hill no army could quickly reach.

David asks God to be both the height and the shelter.

🪨 Rock pictures a place hard to reach
🏰 House of defence means a fortified shelter
🗼 Think of a walled tower on a hill
📖 David asks God to be both

## 🪨 For Thou Art My Rock And My Fortress

Hebrew poetry often says one idea twice using two pictures.

Rock and fortress both describe the same kind of safety.

David is not adding a new thought here.

He is deepening the thought he already named.

📜 Hebrew poetry often repeats one idea twice
🪨 Rock and fortress share one meaning
🔁 David deepens the thought, not adds one
📖 Repetition here means emphasis

## 🏷️ For Thy Name's Sake Lead Me, And Guide Me

"Thy name's sake" means for the sake of God's own reputation.

David is not asking to be led because he deserves it.

He is asking because God's own name is at stake.

God's guidance protects His reputation, not just David's safety.

🏷️ Name's sake means God's own reputation
🙅 Not because David deserves it
🙏 God's own name is at stake
📖 Guidance protects God's reputation too

## 🕸️ Pull Me Out Of The Net That They Have Laid Privily For Me

"Privily" means done in secret, where the victim cannot see it coming.

A net here pictures a hidden trap meant to catch him off guard.

David is not facing an obvious enemy but a hidden scheme.

He asks God to see what he could not see himself.

🕸️ Net pictures a hidden trap
🤫 Privily means done in secret
👁️ He could not see this danger
📖 God sees what people cannot

# Psalms 31:5-8
# 🙌 Into Thine Hand I Commit My Spirit
---
## 🙌 Into Thine Hand I Commit My Spirit

"Commit" means to hand something over completely, trusting the one receiving it.

David is placing his very life and future into God's care.

Jesus later prays these same words while dying on the cross.

The same trust that carried David carried Jesus at the end.

🙌 Commit means handing something over completely
❤️ David places his life in God's care
✝️ Jesus prays these words on the cross
📖 The same trust carried them both

## 💰 Thou Hast Redeemed Me, O LORD God Of Truth

"Redeemed" means bought back or rescued at a real cost.

A redeemer paid a price to free someone from danger.

"God of truth" means a God who is completely reliable.

David trusts the rescue because he trusts the rescuer's character.

💰 Redeemed means rescued at a real cost
🤝 A redeemer paid to set someone free
✅ God of truth means completely reliable
📖 Trust the rescuer, not just the rescue

## 🗿 I Have Hated Them That Regard Lying Vanities

"Lying vanities" means worthless idols that promise help but cannot deliver.

To "regard" them means looking to them for hope or safety.

David is not describing hatred of people here.

He is rejecting every false source of security.

🗿 Lying vanities means worthless idols
🙅 Regard means looking to them for help
🔥 David rejects false sources of security
📖 True trust leaves no room for fakes

## 🤍 I Will Be Glad And Rejoice In Thy Mercy

"Mercy" describes God's loyal, covenant kindness, not a passing feeling.

David's joy responds directly to that kindness.

This gladness is a choice David makes, not a random mood.

He chooses joy because of what God has already done.

🤍 Mercy means God's loyal, covenant kindness
😊 Joy here responds to that kindness
🙌 Gladness is a choice, not a mood
📖 Joy follows what God has already done

## 👀 Thou Hast Considered My Trouble

"Considered" means God looked closely, not just glanced from a distance.

David's suffering was not overlooked or ignored.

God paid real, careful attention to what David was facing.

That kind of attention mattered more to David than a quick fix.

👀 Considered means looked closely, not glanced
🚫 David's trouble was not ignored
🧠 God paid real, careful attention
📖 Attention mattered more than a quick fix

## 🧠 Thou Hast Known My Soul In Adversities

"Known my soul" means intimate, personal knowledge, not distant observation.

God did not just see David's troubles from far away.

He understood them from the inside, as David experienced them.

Being known this way brings a comfort that facts alone cannot.

🧠 Known my soul means intimate knowledge
👀 Not distant observation from far away
❤️ God understood it from the inside
📖 Being known this way brings real comfort

## 🔒 Hast Not Shut Me Up Into The Hand Of The Enemy

"Shut up into the hand" means handed over and trapped with no way out.

David is thanking God for a disaster that did not happen.

This is a rescue named by what God prevented.

Prevention here is its own kind of rescue.

🔒 Shut up means trapped with no escape
🙏 David thanks God for disaster avoided
🛑 This praise names what God prevented
📖 Prevention is its own kind of rescue

## 🏞️ Thou Hast Set My Feet In A Large Room

A "large room" pictures open space after being trapped and cornered.

Think of stepping out of a narrow hallway into an open field.

David is describing relief and freedom of movement.

This is not a picture of wealth but of breathing room.

🏞️ Large room pictures open space
🚪 Think of leaving a narrow hallway
🕊️ It describes freedom, not wealth
📖 Relief follows being trapped

# Psalms 31:9-13
# 💔 My Strength Faileth
---
## 🔄 Have Mercy Upon Me, O LORD, For I Am In Trouble

The psalm shifts here from confidence into raw complaint.

David does not hide this change of mood.

Real trust in the Bible includes honest, unfiltered pain.

Faith does not require pretending everything still feels fine.

🔄 The psalm shifts to raw complaint
😢 David does not hide his mood
🙏 Trust still allows honest pain
📖 Faith does not require pretending

## 👁️ Mine Eye Is Consumed With Grief, Yea, My Soul And My Belly

Eye, soul, and belly together are a Hebrew way of naming a whole person.

This is not a list of three separate symptoms.

Grief has reached every part of him, inside and out.

Even his body was carrying the weight of what he felt.

👁️ Eye, soul, belly name the whole person
🙅 Not three separate symptoms
💯 Grief reached every part of him
📖 Even his body carried this weight

## 🕯️ My Life Is Spent With Grief, And My Years With Sighing

"Spent" means used up completely, like a candle burned down.

This was not a brief sorrow but years of grief.

"Sighing" pictures constant, low exhaustion, not one dramatic moment.

David describes suffering measured in years, not days.

🕯️ Spent means used up completely
📆 This grief lasted years, not days
😩 Sighing pictures constant exhaustion
📖 His suffering was long, not brief

## ⚖️ My Strength Faileth Because Of Mine Iniquity

"Iniquity" means guilt or wrongdoing, not simple bad luck.

This does not necessarily point to one specific named sin.

David links his physical exhaustion to a spiritual weight.

Guilt, for him, carried a real physical cost.

⚖️ Iniquity means guilt or wrongdoing
🙅 Not one specific named sin
💪 His strength failed under that weight
📖 Guilt carried a real physical cost

## 😳 I Was A Reproach Among All Mine Enemies

"Reproach" means public shame, being openly mocked or looked down on.

This was not private embarrassment kept behind closed doors.

Even his neighbours, who should have shown loyalty, joined in.

Public shame cuts deeper than private pain.

😳 Reproach means public shame
👀 Not private, done in the open
😟 Even his neighbours joined in
📖 Public shame cuts especially deep

## 🚶 They That Did See Me Without Fled From Me

"Acquaintance" means people who knew him casually, not strangers.

"Without" here means out in public, not just at home.

Even casual friends crossed the street to avoid him.

His suffering made him someone others were afraid to be near.

🙋 Acquaintance means people who knew him casually
🚶 Without means out in public view
😨 Even casual friends kept their distance
📖 Suffering made him someone to avoid

## 🧠 I Am Forgotten As A Dead Man Out Of Mind

"Out of mind" is an old phrase for being completely forgotten.

David is not making a claim about literal death here.

He is describing the feeling of mattering to no one.

That kind of isolation can feel like death while still alive.

🧠 Out of mind means completely forgotten
🙅 Not a claim about literal death
😞 It describes feeling forgotten by everyone
📖 Isolation can feel like death while alive

## 🏺 I Am Like A Broken Vessel

A "vessel" was a clay pot used every day for water or storage.

Once a clay pot broke, it was thrown away, never repaired.

David felt just as broken and just as easily discarded.

This is not physical injury but a feeling of complete uselessness.

🏺 Vessel means an everyday clay pot
💥 Broken pots were thrown away, not fixed
🗑️ David felt just as discarded
📖 He felt completely useless, not hurt

## 🗣️ I Have Heard The Slander Of Many

"Slander" means false, damaging talk spread behind someone's back.

David is not imagining this hostility, he has actually heard it.

Rumors were coming at him from many directions at once.

Fear was surrounding him from every side.

🗣️ Slander means false, harmful talk
👂 David actually heard what was said
📢 It was coming from many directions
📖 Fear was surrounding him on every side

## ☠️ They Took Counsel Together Against Me, They Devised To Take Away My Life

"Counsel together" describes an organized plan, not scattered talk.

"Devised" means they planned this on purpose, over time.

Their stated goal in that plan was David's actual death.

This was calculated danger, not a passing threat.

🗣️ Counsel together means an organized plan
🧠 Devised means planned on purpose
☠️ Their goal was his actual death
📖 This danger was deliberate, not random

# Psalms 31:14-18
# 🙏 But I Trusted In Thee
---
## 🔄 But I Trusted In Thee, O LORD

"But" marks a turn back toward trust after verses of raw complaint.

David does not wait for the pain to end before trusting.

He chooses to trust while the pain is still present.

Trust, in this psalm, does not wait for a calm moment.

🔄 But marks a turn back to trust
😢 The pain has not been resolved
🙏 He trusts in the middle of it
📖 Trust does not wait for pain to end

## 🗣️ I Said, Thou Art My God

This is a personal claim, not a general statement about God.

David is not simply describing what he believes.

He is naming God as the one who belongs to him.

Faith becomes personal the moment it is spoken like this.

🗣️ This is a personal claim
🙌 David names God as his own
❤️ Relationship, not just belief about God
📖 Faith gets personal here

## ⏳ My Times Are In Thy Hand

"Times" means every season and circumstance of his whole life.

David places his entire timeline, not just this crisis, under God's care.

That includes seasons still ahead that he cannot yet see.

Trust here covers the whole story, not just this chapter.

⏳ Times means every season of his life
🙌 He places his whole timeline with God
🔮 That includes seasons he cannot see
📖 Trust covers the whole story

## 🏃 Deliver Me From The Hand Of Mine Enemies, And From Them That Persecute Me

"Persecute" means to be hunted or pursued with hostile intent.

This is more active and ongoing than a single attack.

David asks for rescue from people actively chasing him down.

The threat in this psalm was still moving, not standing still.

🏃 Persecute means being actively hunted
🎯 This is ongoing, not one event
🙏 David asks for rescue from pursuit
📖 The threat was still chasing him

## 😊 Make Thy Face To Shine Upon Thy Servant

A shining face is an old way of describing warm favor.

It pictures someone looking at you with a smile, not turning away.

David is asking to feel God's nearness, not distant help.

He wants to be looked at kindly, not only rescued quietly.

😊 A shining face pictures warm favor
🙂 The opposite of a turned away face
🙌 David wants nearness, not distance
📖 He asks to be looked at kindly

## 🤍 Save Me For Thy Mercies' Sake

"For thy mercies' sake" means because mercy is simply who God is.

David is not arguing that he has personally earned this rescue.

He already used this same reasoning back in verse three.

That repeated pattern shows how David keeps building his trust.

🤍 Mercies' sake means mercy is who God is
🙅 Not because David has earned it
🔁 He used this reasoning back in verse three
📖 God's character grounds the request

## 🙏 Let Me Not Be Ashamed, O LORD, For I Have Called Upon Thee

David again ties his own reputation to the fact that he called on God.

He is not asking to avoid every hard thing in life.

He is asking that calling on God never be proven foolish.

This request repeats the same concern he raised back in verse one.

🙏 David ties his reputation to calling on God
🙅 Not a request to avoid hardship
🗣️ He asks that faith never look foolish
📖 This echoes the concern from verse one

## ⚖️ Let The Wicked Be Ashamed, And Let Them Be Silent In The Grave

David asks that shame land on the wicked instead of on himself.

"Silent in the grave" pictures their scheming finally coming to nothing.

This is not a request for personal revenge.

It is a request that wrong finally be shown to be wrong.

⚖️ David asks shame to fall on the wicked
🤐 Silent in the grave means their plans end
🙅 This is not personal revenge
📖 He wants wrong finally exposed

## 🗣️ Let The Lying Lips Be Put To Silence

"Grievous" means harsh and cruel, stronger than simply unkind.

"Contemptuously" means with open scorn, not hidden dislike.

These enemies attacked proudly, without any shame at all.

David asks that this kind of voice finally be silenced.

🗣️ Grievous means harsh and cruel speech
😤 Contemptuously means open scorn
🙅 They attacked without any shame
📖 David asks that voice be silenced

# Psalms 31:19-20
# 🏰 Hidden In The Secret Of Thy Presence
---
## 😮 Oh How Great Is Thy Goodness

The tone here shifts sharply from complaint into open wonder.

David stops to marvel instead of asking for anything else.

Real prayer includes moments of simply being amazed by God.

This wonder comes right after the darkest section of the psalm.

🔄 The tone shifts to wonder here
😮 David pauses just to marvel
🙏 Prayer is not only asking
📖 Amazement has a place in prayer

## 💰 Which Thou Hast Laid Up For Them That Fear Thee

"Laid up" pictures something stored carefully, like treasure kept safe.

To "fear" God means holding Him in serious reverence, not terror.

God is described as keeping good things in reserve for those who honor Him.

That goodness is kept and prepared on purpose, not random.

💰 Laid up pictures treasure stored safely
🙇 Fear means reverence, not terror
🎁 God keeps good things in reserve
📖 Goodness is prepared on purpose

## 🛠️ Wrought For Them That Trust In Thee Before The Sons Of Men

"Wrought" means actually done and accomplished, not only promised.

"Before the sons of men" means this happens out in the open.

God's care for those who trust Him becomes visible to everyone.

This goodness was never meant to stay hidden.

🛠️ Wrought means actually done, not promised
👀 Before the sons of men means in public
🙌 God's care becomes visible to everyone
📖 This goodness was never meant to hide

## 🙈 Hide Them In The Secret Of Thy Presence

This "hiding" is not about disappearing but safety close to God.

Think of a child pulled behind a parent during a sudden storm.

God's presence itself becomes the shelter David is describing.

Safety here means nearness, not distance from danger.

🙈 Hiding here means safety, not disappearing
🧒 Think of a child behind a parent
🏠 God's presence itself is the shelter
📖 Safety is found close to God

## ⛺ Keep Them Secretly In A Pavilion From The Strife Of Tongues

"Pride of man" describes people who attack out of arrogance.

"Strife of tongues" means damage caused by hostile, quarreling speech.

A "pavilion" was a tent used for shelter and protection.

God shelters His people from both kinds of attack.

😤 Pride of man means arrogant hostility
🗣️ Strife of tongues means harmful speech
⛺ A pavilion is a sheltering tent
📖 God shelters people from both

# Psalms 31:21-24
# 💪 Be Of Good Courage
---
## 🙌 Blessed Be The LORD

"Blessed" here means praised and declared worthy of honor.

David is not asking God for anything in this line.

The psalm has shifted from request into open praise.

Thanks now takes the place of pleading.

🙌 Blessed means praised and honored
🙅 Not asking for anything here
🎉 The psalm shifts to praise
📖 Thanks replaces pleading here

## 🏰 He Hath Shewed Me His Marvellous Kindness In A Strong City

"Shewed" is an old spelling of showed, meaning made clearly visible.

A "strong city" pictures a walled place built for real protection.

David experienced God's kindness as something just as solid as that.

Kindness here was something he could stand on, not just feel.

👁️ Shewed means made clearly visible
🏰 Strong city pictures real protection
🤍 God's kindness felt just as solid
📖 Kindness became something to stand on

## 😨 I Said In My Haste, I Am Cut Off From Before Thine Eyes

"In my haste" means in a rushed, panicked moment, not a calm conclusion.

David admits he once said something false about God out of fear.

"Cut off from before thine eyes" meant he felt completely abandoned.

He is honest enough to admit that panic, not hide it.

😨 In my haste means a panicked moment
🗣️ David admits saying something false in fear
🙅 Cut off means feeling abandoned
📖 Panic can lie about how God sees us

## 👂 Nevertheless Thou Heardest The Voice Of My Supplications

"Nevertheless" corrects the panicked claim David just admitted to.

God heard him even in the moment he wrongly felt abandoned.

His honest doubt did not cancel God's actual response.

God's faithfulness never depended on David's feelings being accurate.

🔄 Nevertheless corrects his panicked claim
👂 God heard him even then
🙅 Doubt did not cancel God's response
📖 God hears past our panic

## 🙏 O Love The LORD, All Ye His Saints

David turns from his own story to speak to the whole community.

"Saints" again means people devoted to God, not people who never sin.

His personal rescue becomes an invitation for others to trust God.

One person's story becomes fuel for everyone else's faith.

🗣️ David speaks to the whole community
🙏 Saints means people devoted to God
❤️ His story becomes their invitation
📖 Personal rescue becomes shared praise

## ⚖️ The LORD Preserveth The Faithful, And Plentifully Rewardeth The Proud Doer

"Preserveth" means keeps safe over time, not just one rescue.

"The proud doer" describes someone who acts with arrogant disregard for others.

God is described as caring for the faithful.

Pride, by contrast, gets answered in kind.

🛡️ Preserveth means kept safe over time
😤 Proud doer means someone arrogantly harmful
🤍 God cares for the faithful
📖 Faithfulness and pride get different endings

## 💪 Be Of Good Courage, And He Shall Strengthen Your Heart

"Good courage" is a choice to act bravely, not a feeling that shows up alone.

David is not telling readers to feel brave by themselves.

He is promising that God supplies the strength courage requires.

This whole psalm moves from panic to trust to open praise.

💪 Good courage is a choice, not a feeling
🙌 God supplies the strength it takes
🔄 The psalm moves from panic to praise
📖 Hope in the LORD makes courage possible
`.trim();

export const PSALMS_THIRTY_ONE_PERSONAL_SECTIONS = parsePsalmsThirtyOneRawNotes(PSALMS_THIRTY_ONE_RAW_NOTES);
