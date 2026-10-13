export type RomansNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansNineRawNotes(rawText: string): RomansNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 9:${startVerse}` : `Romans 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 9 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_NINE_RAW_NOTES = `# Romans 9:1-5
# 😢 Paul's Sorrow For Israel
---
## I Say The Truth In Christ, I Lie Not

Paul is about to say something painful.

He swears to its truth before he even states it.

Saying something "in Christ" means speaking as a believer under Christ's authority.

This is not an exaggeration for effect.

Romans eight just ended on overwhelming joy.

Romans nine opens on raw grief, from the same writer, in the very next breath.

😢 Paul swears before his claim
⛪ In Christ means under Christ's authority
🔄 Chapter eight ended in joy
📖 Chapter nine opens in grief

## My Conscience Also Bearing Me Witness In The Holy Ghost

A conscience is the inner sense that tells a person right from wrong.

Paul says his own conscience backs up what he is about to say.

He adds that the Holy Ghost confirms it too.

That is two witnesses, Paul's own heart and God's Spirit.

Ancient courts required more than one witness before a claim could stand.

😔 Conscience means an inner sense of right
🕊️ The Holy Ghost confirms it
⚖️ Two witnesses support his claim
📖 Paul is not speaking lightly

## Great Heaviness And Continual Sorrow In My Heart

Heaviness means a crushing weight on the mind that will not lift.

Sorrow usually comes and goes.

Paul says his is continual, meaning it never stops.

This is grief Paul carries every day, not a single bad moment.

😢 Heaviness means a crushing weight
🔁 Continual means it never stops
💔 Paul carries daily grief
📖 This is not a passing feeling

## I Could Wish That Myself Were Accursed From Christ

Accursed means cut off and placed under God's judgment.

Paul says he would take that place himself if it could save his people.

Moses once offered a similar prayer for Israel after the golden calf.

No one can actually trade their standing with Christ for someone else.

Paul states the wish anyway to show how deep his love runs.

🚫 Accursed means cut off from God
🔄 Paul offers to trade places
📜 Moses prayed something similar before
📖 The wish reveals the depth of his love

## My Brethren, My Kinsmen According To The Flesh

Brethren here does not mean fellow Christians.

Kinsmen according to the flesh means people connected by blood and ancestry.

Paul is talking about the Jewish people specifically.

He still calls them family here.

Most of this letter is written to Gentile believers.

👪 Brethren here means fellow Jews
🧬 According to the flesh means by blood
✍️ Paul writes mostly to Gentiles
📖 He still calls Israel family

## The Adoption, And The Glory, And The Covenants

Adoption here means Israel was chosen and placed into the position of God's own son.

Glory refers to the visible presence of God that once filled the tabernacle and temple.

Covenants means the formal promises God made to Abraham, Moses, and David.

Paul is listing privileges Israel received that no other nation received.

👨‍👩‍👧 Adoption means chosen as God's own
✨ Glory means God's visible presence
📜 Covenants means formal promises from God
📖 Israel received privileges no one else had

## The Giving Of The Law, And The Service Of God

The giving of the law refers to the commandments God handed down at Sinai.

The service of God means the temple worship system, the priesthood, and the sacrifices.

Both gifts shaped Israel's entire national identity.

No other ancient nation claimed a law and a worship system given directly by God.

📋 The law means the commandments from Sinai
🏛️ Service of God means temple worship
🆔 Both shaped Israel's identity
📖 No other nation had this

## Whose Are The Fathers

The fathers refers to Abraham, Isaac, and Jacob.

These three men are the root of Israel's entire family line.

God made His core promises directly to them first.

Every later blessing Paul has listed traces back to these same three names.

👴 The fathers means Abraham, Isaac, Jacob
🌳 They are Israel's family root
🤝 God's promises started with them
📖 Every blessing traces back to them

## Who Is Over All, God Blessed For Ever

This phrase says Christ came from Israel by human descent.

It then calls that same Christ God, blessed forever.

Paul is stating Christ's full humanity and full deity in one breath.

This is one of the clearest statements of who Jesus is in the entire letter.

👑 Christ came from Israel by descent
✝️ Paul also calls Christ God
🙌 Both truths sit in one line
📖 This names exactly who Jesus is
---
# Romans 9:6-13
# 👶 Children Of The Promise
---
## They Are Not All Israel, Which Are Of Israel

This sentence uses the name Israel two different ways in the same line.

The first use means everyone physically descended from Jacob.

The second use means those who actually carry the promise God made.

Paul is saying physical descent alone was never the full story.

🏷️ Israel first means Jacob's descendants
🤝 Israel second means promise carriers
🔀 The same word covers two groups
📖 Physical descent was never the whole story

## In Isaac Shall Thy Seed Be Called

Abraham had two sons, Ishmael through Hagar and Isaac through Sarah.

This verse quotes God naming Isaac, not Ishmael, as the one through whom the promise runs.

Ishmael was still Abraham's son and still loved.

He simply was not the child the covenant line passed through.

👦 Abraham had two sons
✅ Isaac carried the promise line
❤️ Ishmael was still loved
📖 Descent alone did not decide the promise

## The Children Of The Flesh Are Not The Children Of God

Children of the flesh means anyone born by ordinary human descent.

Children of the promise means those born through God's specific word and plan.

Paul draws this same line again using Isaac and Ishmael as the picture.

Being born into a family does not automatically mean belonging to God's family.

🧬 Flesh means ordinary human descent
✨ Promise means born through God's plan
👨‍👩‍👧 Isaac and Ishmael illustrate the line
📖 Family birth differs from God's family

## Sarah Shall Have A Son

This line quotes God's own promise to Abraham and Sarah from Genesis.

Sarah was far past the age of having children when this was spoken.

Isaac's birth was not a natural outcome anyone could arrange.

Paul uses it to prove the promise line began as God's act, not human effort.

👵 Sarah was far past childbearing age
🍼 Isaac's birth was not natural
🙌 It was God's act alone
📖 The promise line started with a miracle

## Rebecca Also Had Conceived By One, Even By Our Father Isaac

Rebecca was Isaac's wife.

She was the mother of both Jacob and Esau.

Jacob and Esau shared the same father.

They shared the same mother too.

Ishmael had a different mother than Isaac did.

With Jacob and Esau, every possible family difference is removed except God's own choice.

👩 Rebecca was Isaac's wife
👬 Jacob and Esau were full brothers
🧬 No family difference separated them
📖 Only God's choice set them apart

## Neither Having Done Any Good Or Evil

This phrase places the timing before Jacob and Esau were even born.

Neither twin had done anything yet to earn or lose God's favor.

Paul removes personal behavior from the equation entirely.

Whatever happens next in the chapter cannot be about one twin earning it.

👶 Neither twin had been born yet
⚖️ Neither had earned or lost favor
🚫 Behavior is removed from the picture
📖 What follows is not about earning

## The Purpose Of God According To Election Might Stand

Election here means God's choice to set someone apart for His own purpose.

Paul says that choice stands on God's purpose, not on anything the person does.

Of works means by effort or achievement.

Him that calleth means God is the one issuing the call.

🎯 Election means God's choice to set apart
🏗️ It stands on God's purpose
🙅 Of works means by effort
📖 God is the one who calls

## The Elder Shall Serve The Younger

In this culture, the older son normally received authority and the larger inheritance.

This line reverses that custom before either child had even been born.

Esau was the older twin and Jacob was the younger.

The reversal itself becomes the sign that God's choice, not birth order, was deciding this.

👴 Firstborn usually received authority
🔄 This line reverses that custom
👬 Esau was older, Jacob younger
📖 The reversal points to God's choice

## Jacob Have I Loved, But Esau Have I Hated

This line can sound harsher in English than it was meant.

In this kind of covenant language, loved and hated describe a choice, not an emotion.

Loved means chosen for the covenant line.

Hated means simply not chosen for that specific role.

It does not mean God felt personal hatred toward Esau as a person.

💛 Loved means chosen for the role
🚫 Hated means not chosen for it
🗣️ This is covenant language, not emotion
📖 It is not personal hatred toward Esau
---
# Romans 9:14-18
# ⚖️ Mercy, Not Merit
---
## Is There Unrighteousness With God? God Forbid

Paul raises the objection a reader is probably already thinking.

If God chooses one twin over another before birth, is that unfair of Him?

"God forbid" is a strong Jewish expression meaning may this never be true.

Paul rejects the charge immediately, before even answering it.

❓ Paul raises the obvious objection
⚖️ The question is whether God is unfair
🚫 God forbid means may this never be
📖 Paul rejects the charge at once

## I Will Have Mercy On Whom I Will Have Mercy

This line quotes God speaking to Moses back in Exodus.

Mercy means kindness given to someone who did not earn it.

God is stating that He decides who receives that kindness.

No one can place God under an obligation to be merciful.

🙏 Mercy means unearned kindness
📜 This quotes God speaking to Moses
👑 God decides who receives it
📖 No one can demand mercy from God

## Not Of Him That Willeth, Nor Of Him That Runneth

Willeth means simply wanting something very badly.

Runneth pictures an athlete straining toward a finish line.

Paul rules out both wanting and effort as the basis for mercy.

Mercy comes from God's own will, not from human desire or human striving.

🙋 Willeth means wanting badly
🏃 Runneth pictures effort and striving
🚫 Neither one earns mercy
📖 Mercy comes from God's will alone

## Even For This Same Purpose Have I Raised Thee Up

This line is God speaking about Pharaoh during the exodus from Egypt.

Raised thee up means God placed Pharaoh in power at that exact moment in history.

The purpose was to display God's power through the plagues and the exodus.

Pharaoh's rule became the stage God used to show His own strength to the world.

👑 This refers to Pharaoh in Exodus
⏰ God placed him in power on purpose
💪 The purpose was to display God's power
📖 Pharaoh's reign became that stage

## Whom He Will He Hardeneth

Hardening means Pharaoh's heart grew more stubborn and resistant toward God.

Exodus also records Pharaoh hardening his own heart repeatedly on his own.

Paul is not describing God forcing an innocent man into evil.

He is describing God confirming and using a hardness that was already there.

💔 Hardening means growing stubborn toward God
🔁 Pharaoh hardened his own heart too
🚫 God did not force innocence into evil
📖 God confirmed a hardness already present
---
# Romans 9:19-24
# 🏺 The Potter And The Clay
---
## Why Doth He Yet Find Fault? For Who Hath Resisted His Will

Paul voices a second objection a reader might raise next.

If God hardens whoever He chooses, how can He still blame that person?

The objection assumes no one can ever resist what God has already decided.

Paul is about to answer with an image instead of a logical argument.

❓ A second objection follows the first
⚖️ How can God blame a hardened heart
🚫 The objection assumes no real resistance
📖 Paul answers with an image next

## Who Art Thou That Repliest Against God

Repliest means talking back or arguing with someone in authority.

Paul's tone turns sharp here on purpose.

He is reminding the reader that a human being does not get to cross examine God.

The question itself is meant to humble, not merely to inform.

🗣️ Repliest means talking back
😮 Paul's tone turns sharp here
🙇 A human cannot cross examine God
📖 The question is meant to humble

## Shall The Thing Formed Say To Him That Formed It

The thing formed means an object shaped by someone else's hands.

Him that formed it means the one who did the shaping.

Paul pictures a finished object questioning the one who made it.

Something shaped does not get to overrule the one who shaped it.

🏺 Thing formed means a shaped object
🙌 Formed it means the one who shaped
❓ The object questions its own maker
📖 A shaped thing does not overrule its maker

## Hath Not The Potter Power Over The Clay

A potter is a craftsman who shapes wet clay into pots, jars, and bowls.

The same lump of clay could become something plain or something valuable.

The potter alone decides which, and the clay has no say in it.

Other parts of the Old Testament use this exact image for God and His people.

🧑‍🎨 A potter shapes wet clay into pots
🏺 The same clay could become many things
👑 The potter alone decides the outcome
📖 The Old Testament uses this image often

## One Vessel Unto Honour, And Another Unto Dishonour

Vessel here just means a finished pot or container.

Honour means a vessel used for something valued and visible.

Dishonour means a vessel used for something plain or ordinary.

Both vessels come from the same potter and the same material.

🏺 Vessel means a finished pot
✨ Honour means used for something valued
🪣 Dishonour means used for something plain
📖 Both come from the same potter

## The Vessels Of Wrath Fitted To Destruction

Wrath means God's settled opposition to sin.

Fitted to destruction means prepared for, or heading toward, judgment.

Longsuffering, the word just before this phrase, means God's extended patience.

God endures these vessels with patience.

He delays striking them in judgment.

🔥 Wrath means God's opposition to sin
⚰️ Fitted to destruction means headed to judgment
⏳ Longsuffering means extended patience
📖 God delays judgment with patience

## The Riches Of His Glory On The Vessels Of Mercy

This phrase stands opposite the vessels of wrath from the line before it.

Vessels of mercy means people prepared ahead of time to receive God's kindness.

Riches of his glory means the full display of God's goodness poured out on them.

Paul is showing two opposite outcomes from the same divine potter.

↔️ This phrase contrasts with vessels of wrath
🙏 Vessels of mercy means prepared for kindness
✨ Riches of glory means goodness poured out
📖 Two outcomes, one potter

## Not Of The Jews Only, But Also Of The Gentiles

This is the first time in the chapter Paul names the Gentiles directly.

Jews only would have been the expected audience for God's mercy.

Paul says the vessels of mercy include Gentile believers too.

This single line sets up the direction the rest of the chapter is heading.

🏷️ First direct mention of Gentiles
🙋 Jews only was the expected audience
🌍 Mercy now includes Gentiles too
📖 This sets up the rest of the chapter
---
# Romans 9:25-29
# 📖 Not My People Made My People
---
## As He Saith Also In Osee

Osee is the Greek form of the prophet's name Hosea.

Paul is about to quote directly from the Old Testament book of Hosea.

Hosea originally wrote about God restoring the nation of Israel after judgment.

Paul reuses that same promise and applies it to the Gentiles being brought in.

📜 Osee means the prophet Hosea
✍️ Paul quotes from Hosea's book
🔄 Hosea first wrote about Israel's restoration
📖 Paul applies it now to the Gentiles

## I Will Call Them My People, Which Were Not My People

This line quotes God promising to reclaim a people who had been rejected.

In Hosea, that rejected people was Israel after years of idolatry.

Paul widens the promise to include the Gentiles, who were outsiders to God's covenant before.

A status of not my people can be reversed entirely by God's own choice.

📜 Quotes God reclaiming a rejected people
🇮🇱 In Hosea, that people was Israel
🌍 Paul widens it to the Gentiles
📖 God can reverse that status completely

## The Children Of The Living God

Living God contrasts the true God with lifeless idols worshipped elsewhere.

Children here means people given full standing and identity as God's own family.

Being called not my people and later children of the living God is the biggest reversal in the Bible.

This reversal is offered freely, not earned by family background.

🕯️ Living God contrasts with lifeless idols
👨‍👩‍👧 Children means full family standing
🔄 This reversal could not be bigger
📖 It is offered freely, not earned

## As The Sand Of The Sea, A Remnant Shall Be Saved

Sand of the sea is a phrase used for Israel's huge population, far too many to count.

Remnant means only a portion that survives out of a much larger whole.

Paul quotes the prophet Isaiah to make a hard point.

Even with a massive nation, only a remnant would actually be saved.

🏖️ Sand of the sea means a huge population
🌱 Remnant means a small surviving portion
📜 Paul quotes the prophet Isaiah
📖 A huge nation, only a remnant saved

## He Will Finish The Work, And Cut It Short In Righteousness

Finish the work means God will complete His plan of judgment and salvation.

Cut it short means God will act decisively.

It will not drag on.

In righteousness means God's action stays fair and just the whole way through.

God's judgment is not random or delayed without purpose.

✅ Finish the work means completing God's plan
✂️ Cut it short means acting decisively
⚖️ In righteousness means staying just
📖 God's judgment is neither random nor delayed

## We Had Been As Sodoma, And Been Made Like Unto Gomorrha

Sodoma and Gomorrha are the Greek spellings of Sodom and Gomorrah.

Those two cities were completely destroyed for their sin in Genesis.

Isaiah says only God leaving a surviving seed kept Israel from that same total destruction.

A seed, in this sense, means a small surviving group that a future harvest can grow from.

🔥 Sodoma and Gomorrha were destroyed cities
💥 Total destruction was the real alternative
🌱 A seed means a small surviving group
📖 Only God's mercy prevented total ruin
---
# Romans 9:30-33
# 🪨 A Stone Of Stumbling
---
## The Gentiles, Which Followed Not After Righteousness, Have Attained To Righteousness

Followed not after righteousness means the Gentiles were not even chasing God's standard.

Attained to righteousness means they ended up right with God anyway.

The righteousness which is of faith means being made right through trusting God, not earning it.

This outcome is the opposite of what anyone would have expected.

🙅 Gentiles were not chasing righteousness
✅ They attained it anyway
🙏 Faith means trusting, not earning
📖 The result reverses every expectation

## Israel, Which Followed After The Law Of Righteousness, Hath Not Attained

Followed after the law of righteousness means Israel was actively pursuing God's standard through the law.

Hath not attained means that pursuit did not reach its goal.

This is the painful reversal of the Gentiles' outcome in the line just before it.

Effort and pursuit, by themselves, did not produce the result Israel was after.

🏃 Israel was actively pursuing the law
🚫 That pursuit did not reach its goal
↔️ This reverses the Gentiles' outcome
📖 Effort alone did not produce the result

## They Sought It Not By Faith, But As It Were By The Works Of The Law

Sought it by faith means pursuing righteousness by trusting God's promise.

By the works of the law means pursuing it through keeping commandments and rituals.

Paul says Israel chose the second path instead of the first.

This single contrast sums up the entire argument of the letter so far.

🙏 By faith means trusting God's promise
📋 By works means keeping commandments
🔀 Israel chose the second path
📖 This sums up the letter's whole argument

## They Stumbled At That Stumblingstone

A stumblingstone is an obstacle in the road that trips up someone walking.

Paul identifies Christ Himself as that stumblingstone for many in Israel.

The very person meant to bring righteousness became what many rejected instead.

The stone did not change, but the response to it determined who stumbled.

🪨 Stumblingstone means an obstacle in the road
✝️ Paul identifies Christ as that stone
🙅 Many in Israel rejected Him
📖 The response to Christ determined the outcome

## I Lay In Sion A Stumblingstone And Rock Of Offence

This line quotes the prophet Isaiah directly.

Sion, more often spelled Zion, refers to Jerusalem and the Jewish people as a whole.

Rock of offence means something that causes people to take offense and turn away.

God placed Christ there on purpose, knowing some would reject Him over it.

📜 This quotes the prophet Isaiah
🏙️ Sion refers to Jerusalem and its people
💢 Rock of offence means something people reject
📖 God placed Christ there on purpose

## Whosoever Believeth On Him Shall Not Be Ashamed

Believeth on him means trusting Christ personally, not just knowing facts about Him.

Shall not be ashamed means that trust will never end in regret or disappointment.

This closing promise is open to absolutely anyone, Jew or Gentile.

The chapter that opened in Paul's deep grief closes on an open invitation.

🙏 Believeth means trusting Christ personally
🛡️ Not ashamed means no regret ahead
🌍 Open to anyone, Jew or Gentile
📖 Grief opens the chapter, invitation closes it
`.trim();

export const ROMANS_NINE_PERSONAL_SECTIONS = parseRomansNineRawNotes(ROMANS_NINE_RAW_NOTES);
