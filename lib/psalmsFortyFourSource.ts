export type PsalmsFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyFourRawNotes(rawText: string): PsalmsFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+44:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 44 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+44:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+44:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 44 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 44,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 44:${startVerse}` : `Psalms 44:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 44 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_FOUR_RAW_NOTES = `# Psalms 44:1-3
# 📜 The Fathers Have Told Us
---
## 👂 We Have Heard With Our Ears

With our ears is a Hebrew way of saying the people heard this firsthand.

It does not just mean physical hearing.

It means receiving something trustworthy and direct.

This is not a rumor or a guess about God.

It is testimony passed down as solid fact.

👂 With our ears means firsthand testimony

📚 This is not a rumor

🗣️ Someone delivered this account directly

📖 God's past acts became trusted history

## 👪 Our Fathers Have Told Us

Fathers here means the ancestors who came before this generation.

Ancient Israel passed down its history mainly by speaking, not by writing.

Each generation taught the next what God had done for them.

This verse itself is proof that the method worked.

The psalmist is repeating a story he only knows because someone told him.

👪 Fathers means earlier generations of Israel

🗣️ History passed down mainly by speaking

📚 Each generation taught the next

📖 This verse proves the method worked

## 🌱 Drive Out The Heathen With Thy Hand

Heathen is an old word for nations that did not worship the true God.

God pushed those nations out of Canaan to make room for Israel.

Plantedst them pictures Israel being placed in the land like a tree taking root.

The next line repeats the same idea in different words.

Hebrew poetry often says one thing twice using two different pictures.

🌍 Heathen means nations without the true God

🚪 God pushed nations out of Canaan

🌳 Plantedst pictures Israel taking root

📖 Hebrew poetry repeats one idea twice

## ⚔️ Not By Their Own Sword

Israel did not win the land through military skill alone.

The Bible is blunt about this so no one takes credit for what God did.

A sword and an arm both stood for human strength in battle.

Israel had real weapons and real soldiers.

Even so, none of that secured the victory by itself.

⚔️ Sword pictures human military strength

💪 Arm also pictures human strength

🙅 Neither one won the land alone

📖 Victory belonged to God, not muscle

## ✨ Thy Right Hand, And Thine Arm, And The Light Of Thy Countenance

The Bible often describes God using human body parts as a picture.

God does not have a literal hand, arm, or face.

Right hand pictures his power to act and save.

Countenance means the look on someone's face, especially when it shows favor.

God's face lighting up here pictures his favor resting on Israel.

✋ Right hand pictures God's power to act

🚫 God has no literal body

🙂 Countenance means the look on a face

📖 A shining face pictures God's favor

# Psalms 44:4-8
# 👑 Thou Art My King
---
## 👑 Thou Art My King, O God

The prayer shifts here from our to my.

The whole nation trusts God, but each person must also claim him personally.

King means the one with full authority to rule and to save.

Calling God king is not just poetry.

It means putting every decision about war and safety in his hands.

👑 King means the one with full authority

🙋 The prayer turns personal here

🛡️ Trusting God is not only national

📖 Israel's safety belonged to its true king

## 🎗️ Command Deliverances For Jacob

Jacob here is another name for the whole nation of Israel.

Jacob was the patriarch whose children became the twelve tribes.

Command is a strong word.

It pictures a king giving an order that must happen.

The psalmist is not making a polite request here.

🎗️ Jacob is another name for Israel

🌳 Jacob fathered the twelve tribes

📯 Command pictures a king's order

📖 This is a bold request, not a hint

## 🐂 Through Thy Name Will We Tread Them Under

This verse says the same thing twice using two pictures.

Push down pictures an ox knocking down an enemy with its horns.

Tread them under pictures trampling a defeated enemy underfoot.

Thy name means God's own power and reputation, not Israel's strength.

Both pictures land on the same point.

Victory belongs to God's power alone.

🔁 This verse repeats one idea twice

🐂 Push down pictures a goring ox

👣 Tread under pictures trampling a foe

📖 Thy name means God's power, not Israel's

## 🏹 I Will Not Trust In My Bow, Neither Shall My Sword Save Me

The bow was the main long range weapon of ancient warfare.

The sword was the main weapon for close combat.

Together they stood for every kind of human weapon available.

David refuses to lean on either one for safety.

His trust is placed somewhere else entirely.

🏹 Bow was the main long range weapon

🗡️ Sword was the main close combat weapon

🙅 Together they picture all human weapons

📖 David trusts God, not his weapons

## 🎉 Thou Hast Saved Us From Our Enemies

This line looks back at real victories God already gave.

Salvation here means being rescued from real physical danger.

The nation remembers this before making its complaint later in the psalm.

Faith gets stronger when a person remembers what God already did.

🎉 This recalls real past victories

🛡️ Salvation means real rescue from danger

🧠 Remembering God's past acts builds faith

📖 Past deliverance grounds present trust

## 😳 Put Them To Shame That Hated Us

Shame here means public disgrace and defeat.

The people who hated Israel expected to win.

Instead their attack failed in front of everyone watching.

Their hatred earned them public humiliation instead of victory.

😳 Shame means public disgrace

😡 Israel's enemies expected to win

❌ Their attack failed publicly

📖 God reverses shame onto the haters

## 🙌 In God We Boast All The Day Long

Boast here does not mean bragging about yourself.

It means loudly praising someone else's greatness.

The nation directs all of its pride toward God, not toward its own army.

This kind of boasting happens constantly, not just after a big win.

🙌 Boast here means loud praise

🎯 The praise is aimed at God

🚫 It is not pride in Israel's army

📖 True boasting never runs out of reasons

## ⏸️ Selah

Selah appears often in the Psalms, including here at the end of verse eight.

No one knows for certain what it means.

Many scholars believe it marked a musical pause or a moment for reflection.

It likely told worshippers to stop and let the words sink in.

⏸️ Selah appears often across the Psalms

❓ Its exact meaning stayed uncertain

🎵 Many scholars see a musical pause

📖 It invites the reader to stop and reflect

# Psalms 44:9-16
# 😔 Thou Hast Cast Off
---
## 🔄 But Thou Hast Cast Off, And Put Us To Shame

The word But marks a sudden turn in the whole psalm.

Everything before this verse celebrated God's past help.

Now the tone flips into complaint and confusion.

Cast off is a strong word for rejection.

The people feel abandoned by the same God they just praised.

🔄 But signals a sudden turn

🙌 Verses one through eight praised God

😔 The tone now shifts to complaint

📖 Cast off describes a feeling, not fact

## ⚔️ Goest Not Forth With Our Armies

In ancient Israel, God's presence was pictured as going out with the army into battle.

Sometimes this meant the ark of the covenant traveled with the soldiers.

This verse says that presence is now missing.

An army that trusted God for victory now feels alone.

⚔️ God's presence once went with the army

📦 Sometimes the ark traveled to battle

🚫 That presence now feels absent

📖 God's absence changes everything in battle

## 🏃 They Which Hate Us Spoil For Themselves

Turn back here means retreating in the middle of battle.

Spoil means the goods and treasure taken from a defeated side.

Instead of Israel winning and taking spoil, the enemy takes it from them.

The whole picture reverses what the nation expected from God.

🏃 Turn back means retreating in battle

💰 Spoil means treasure taken from the loser

🔃 The expected outcome flips completely

📖 Israel's enemies profit from this defeat

## 🐑 Sheep Appointed For Meat

This pictures Israel as a flock being handed over for slaughter.

Appointed means marked out for that exact purpose on purpose.

Sheep cannot fight back or choose their fate.

The image makes Israel's helplessness feel physical, not just emotional.

🐑 Sheep pictures total helplessness

🔪 Meat means marked for slaughter

🎯 Appointed means chosen on purpose

📖 Helplessness is the whole point of the image

## 🌍 Scattered Us Among The Heathen

Scattered means the people were spread out among foreign nations.

This pictures exile, being pushed far from home and from the land God promised.

A scattered nation loses its unity and its sense of safety.

This image would later become painfully real in Israel's history.

🌍 Scattered means pushed among foreign nations

🏠 It pictures exile far from home

💔 A scattered people lose their unity

📖 Exile turns a promise into an open wound

## 💰 Thou Sellest Thy People For Nought

This pictures God selling Israel the way a person sells a slave.

For nought means for nothing, for no real price at all.

A slave sold for money at least had some worth attached to the sale.

Being sold for nothing feels even more worthless to the one being sold.

💰 The image pictures Israel being sold

🏷️ For nought means for no real price

📉 Even a slave had some price attached

📖 This sale had no price at all

## 😞 A Reproach To Our Neighbours

Reproach means a public insult that damages someone's reputation.

Neighbours here means the nearby nations who watched Israel closely.

Israel's suffering was not private.

The surrounding nations saw it and judged Israel because of it.

😞 Reproach means a public insult

👀 Neighbours means the watching nearby nations

📢 The suffering happened in public view

📖 Public shame cuts deeper than private pain

## 😏 A Scorn And A Derision

Scorn means open contempt, treating someone as worthless.

Derision means mocking laughter aimed directly at someone.

Together these words describe more than sadness.

They describe active, public mockery from every side.

😏 Scorn means open contempt

😆 Derision means mocking laughter

🎯 Both words describe active mockery

📖 Mockery adds insult to real injury

## 📛 A Byword Among The Heathen

A byword is a name people use as a joke or a warning example.

Other nations began using Israel's name that way.

Instead of being known for God's blessing, Israel became a punchline.

This flips the nation's purpose completely upside down.

📛 Byword means a mocking example

🗣️ Foreign nations used Israel's name that way

🙃 Israel became a punchline, not a witness

📖 A witness nation became a warning story

## 🙅 A Shaking Of The Head Among The People

Shaking the head was a common ancient gesture of mockery.

It showed contempt without needing a single word.

People passing by Israel's ruin used this gesture openly.

A silent gesture can wound just as deeply as an insult said out loud.

🙅 Head shaking was a mocking gesture

🤐 It needed no words at all

👥 People used it openly against Israel

📖 A gesture can cut as deep as words

## 😳 My Confusion Is Continually Before Me

Confusion here does not mean feeling puzzled.

It means public disgrace that the psalmist cannot escape or forget.

Continually means it never leaves his mind, not even for a moment.

This is a heavy, constant weight, not a passing feeling.

😳 Confusion means disgrace, not puzzlement

🔁 Continually means it never lets up

🧠 The shame stays constantly in his mind

📖 This weight never leaves him alone

## 😔 The Shame Of My Face Hath Covered Me

In this culture, covering the face was a visible sign of shame.

People could see this disgrace just by looking at him.

His humiliation was not hidden or private.

It showed up plainly on his face for everyone to see.

😔 Covering the face signaled shame

👀 Others could see this disgrace

🙈 The shame was not hidden

📖 Grief here is public, not hidden

## 🗣️ Him That Reproacheth And Blasphemeth

Reproacheth means insulting someone with the goal of humiliating them.

Blasphemeth here means speaking against God with open contempt.

The insults were not only aimed at Israel.

They were also aimed straight at the God Israel served.

🗣️ Reproacheth means insulting to humiliate

🚫 Blasphemeth means speaking against God directly

🎯 The mockery targets both Israel and God

📖 Mocking God's people mocks God himself

## 😠 By Reason Of The Enemy And Avenger

Avenger here means someone determined to get revenge.

This was not a random insult from a stranger.

It came from an enemy actively seeking payback.

The threat felt personal and ongoing, not distant or occasional.

😠 Avenger means someone seeking revenge

🎯 This enemy targeted Israel on purpose

🔁 The threat kept happening, not once

📖 Real danger surrounded every complaint in this psalm

# Psalms 44:17-22
# 🤲 Yet Have We Not Forgotten Thee
---
## 🙏 Yet Have We Not Forgotten Thee

All this points back to everything just described, the shame and the scattering.

Despite all of it, the people insist they never forgot God.

This begins a new section of the psalm, a protest of innocence.

The complaint is no longer about what happened.

It becomes about why it happened when nothing was done wrong.

🙏 All this points back to the suffering

🤲 The people insist they stayed loyal

⚖️ This starts a protest of innocence

📖 The question shifts from what to why

## 📜 Neither Have We Dealt Falsely In Thy Covenant

Dealt falsely means breaking a promise or being unfaithful to an agreement.

A covenant is a binding promise between two parties.

Here it means a promise between God and Israel.

The people claim they kept their side of that agreement.

This claim sets up the strong protest that follows in the next verses.

📜 Dealt falsely means breaking a promise

🤝 Covenant means a binding promise between two sides

✅ The people claim they kept their word

📖 Loyalty claimed is loyalty on the line

## ❤️ Our Heart Is Not Turned Back, Neither Have Our Steps Declined

This verse says the same thing twice, a common pattern in Hebrew poetry.

Heart pictures inner loyalty, what a person believes and loves.

Steps pictures outward action, what a person actually does.

Together they claim total faithfulness, inside and out.

❤️ Heart pictures inner loyalty

👣 Steps pictures outward action

🔁 The verse repeats one idea twice

📖 The claim covers both belief and behavior

## 🐺 The Place Of Dragons

This phrase does not mean literal dragons or mythical monsters.

Many scholars believe it points to jackals, wild animals living in desolate wilderness.

The phrase pictures a dangerous, abandoned place far from safety.

That image describes exactly how broken and exposed the people felt.

🐺 Dragons likely means wild jackals

🏜️ The phrase pictures a desolate wilderness

⚠️ It describes a dangerous, exposed place

📖 The setting mirrors the suffering inside

## 🌑 Covered Us With The Shadow Of Death

This exact phrase also appears in Psalms twenty three.

There it described comfort even in danger.

Here it describes being surrounded by real, present darkness and fear.

The same phrase can carry very different weight depending on where it lands.

🌑 Shadow of death pictures deep darkness

🔁 The same phrase appears in Psalms twenty three

😨 Here it describes real fear, not comfort

📖 The same words can carry new weight

## 🙏 Stretched Out Our Hands To A Strange God

Stretching out the hands was a common ancient posture for prayer and worship.

A strange god means a foreign god that Israel had no covenant with.

This verse pictures the sin of turning to worship someone else entirely.

The people insist this never actually happened to them.

🙏 Stretched hands was a prayer posture

🚫 Strange god means a foreign, false god

❌ This pictures the sin of idolatry

📖 This denial is bold, not casual

## 👁️ He Knoweth The Secrets Of The Heart

This verse appeals to something no human judge could ever check.

God does not just see actions.

He sees hidden thoughts, motives, and intentions no one else can access.

This appeal only makes sense if the people are telling the truth.

👁️ God sees hidden motives, not just actions

🔍 No human judge could check this

🤍 This appeal only works if it is true

📖 God's knowledge backs up their claim

## 💀 For Thy Sake Are We Killed All The Day Long

This line claims the suffering came because of loyalty to God, not sin.

All the day long means this danger felt constant, not occasional.

The people frame their pain as the cost of staying faithful.

That is a heavy claim to make honestly before God.

💀 The suffering is framed as loyalty's cost

⏳ All the day long means constant danger

🙏 The people claim faithfulness, not sin

📖 Suffering for God is not punishment

## 🐑 Counted As Sheep For The Slaughter

This exact phrase gets quoted centuries later in the New Testament.

The apostle Paul uses it in Romans chapter eight to describe suffering believers.

Both passages picture people who face danger simply for belonging to God.

The image of helpless suffering for faith echoes across the whole Bible.

🐑 This image pictures total helplessness

📖 Paul quotes this exact line in Romans eight

🔗 Both passages link suffering to belonging to God

➡️ Ancient pain still speaks to suffering today

# Psalms 44:23-26
# ⏰ Awake, Why Sleepest Thou
---
## ⏰ Awake, Why Sleepest Thou, O Lord

This does not mean the people believed God literally falls asleep.

Scripture elsewhere says God never slumbers or sleeps.

This is bold, honest prayer language describing how abandoned they feel.

Crying out this way is not disrespect.

It is raw honesty brought straight to God.

⏰ This is not literal sleep

😢 It describes how abandoned they feel

🙏 Raw honesty is allowed in prayer

📖 Honest prayer does not require polite words

## 🚨 Arise, Cast Us Not Off For Ever

Arise and awake are not the same request.

Awake asks God to notice what is happening.

Arise asks God to actually act and step in.

For ever raises the stakes.

This cannot become permanent abandonment.

🚨 Arise asks God to act

👀 Awake asks God to notice

🔼 Arise is the stronger request

📖 Arise asks for more than a glance

## 🙈 Wherefore Hidest Thou Thy Face

A hidden face was a common way to describe God withdrawing his favor.

This does not mean God is literally somewhere else.

It means his presence and blessing feel completely absent.

This same complaint appears often across the book of Psalms.

🙈 A hidden face pictures withdrawn favor

📍 God is not literally elsewhere

😔 His presence simply feels absent

📖 Feeling forgotten is not being forgotten

## 😩 Our Soul Is Bowed Down To The Dust

This pictures a person collapsed low to the ground in grief.

Belly cleaveth unto the earth pictures the same posture, lying flat in defeat.

Both lines describe complete physical exhaustion and despair.

The body here mirrors exactly what the soul is feeling.

😩 This pictures collapsing to the ground

📉 Belly cleaveth pictures lying flat in defeat

💔 Both lines describe total exhaustion

📖 Grief can be seen, not just felt

## 🙌 Arise For Our Help

This repeats the same urgent word from earlier in the psalm.

The psalm circles back to its boldest request one more time.

Help here means direct, active rescue, not just comfort or sympathy.

The whole psalm has been building toward this final request.

🙌 Arise repeats the plea from before

🔁 The psalm circles back one more time

🆘 Help means active rescue, not sympathy

📖 Hope keeps asking even without an answer

## 💝 Redeem Us For Thy Mercies' Sake

Redeem is a legal and family term.

It means paying a price to rescue someone or buy them out of trouble.

The plea is not based on Israel's own goodness.

It rests entirely on God's mercy, his loyal and undeserved love.

💝 Redeem means paying to rescue someone

👪 It was also a family rescue term

🙏 The plea rests on mercy, not merit

📖 God's loyal love, not Israel's goodness, saves
`.trim();

export const PSALMS_FORTY_FOUR_PERSONAL_SECTIONS = parsePsalmsFortyFourRawNotes(PSALMS_FORTY_FOUR_RAW_NOTES);
