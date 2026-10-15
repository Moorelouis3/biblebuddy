export type EphesiansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansFiveRawNotes(rawText: string): EphesiansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 5:${startVerse}` : `Ephesians 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Ephesians 5 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_FIVE_RAW_NOTES = `# Ephesians 5:1-4
# 👣 Followers Of God
---
## 👣 Followers Of God

"Followers" here does not mean fans or admirers.

It means imitators, copying a pattern on purpose.

A child does not grow to resemble a parent by accident.

Paul asks the Ephesians to copy God that same deliberate way.

👣 Followers means imitators, not fans

🧒 A child copies a parent on purpose

🎯 Copying God is meant to be deliberate

📖 Likeness to God is the real goal

## 🧒 As Dear Children

This phrase is not a performance requirement.

It is a statement about identity first.

The Ephesians are already God's dear children before they are told to imitate Him.

Obedience here grows out of belonging, not the other way around.

🧒 Dear children names identity first

💗 Belonging comes before behavior

🔁 Obedience grows out of belonging

📖 God calls them His own before commanding them

## 💞 Walk In Love, As Christ Also Hath Loved Us

"Walk" is the key word running through this whole chapter.

It means a daily way of living, not one good moment.

Christ's love for the Ephesians becomes the pattern for their own love.

That love was proven in action, not only spoken in words.

🚶 Walk means a daily way of living

🔁 Walk repeats throughout this chapter

❤️ Christ's love is the pattern

📖 Love proven in action, not words

## 🙏 An Offering And A Sacrifice

These two words come from Israel's temple system.

An "offering" was a gift given to God.

A "sacrifice" usually involved an animal's life given in its place.

Christ's death is described here using that same temple language.

🏛️ Offering and sacrifice come from temple language

🎁 Offering means a gift to God

🐑 Sacrifice means a life given instead

📖 Christ's death fulfills that whole system

## 🌸 A Sweetsmelling Savour

This phrase describes the pleasing smell of a sacrifice rising as smoke.

In the Old Testament, that smell signaled God's acceptance of the gift.

Paul borrows that picture to describe how Christ's sacrifice pleased God completely.

Nothing about Christ's offering was rejected or found lacking.

🔥 Smoke rising described a pleasing smell

👃 Savour means a pleasing smell to God

✅ It signaled God's full acceptance

📖 Christ's sacrifice pleased God completely

## 🚫 Fornication, And All Uncleanness, Or Covetousness

"Fornication" means sexual sin outside of marriage.

"Uncleanness" covers a wider range of sexual sin beyond that one word.

"Covetousness" means wanting what belongs to someone else so badly it controls you.

Paul groups these three together on purpose.

🚫 Fornication means sexual sin outside marriage

🌊 Uncleanness covers a wider range of sin

👀 Covetousness means wanting what is not yours

📖 All three distort God given desire

## 🤐 Not Be Once Named Among You

This idiom is stronger than just saying avoid it.

It means these sins should not even surface as a rumor.

A reputation can be hurt by a rumor alone, even a false one.

Paul wants their reputation clean, not just their actions.

🗣️ Named means even mentioned as a rumor

🚫 Stronger than just avoiding the sin

🛡️ Reputation matters, not only action

📖 A clean name backs up a clean life

## ✨ As Becometh Saints

"Becometh" is an old word for what fits or suits someone.

"Saints" simply means people set apart as belonging to God.

The logic here is not a list of rules kept for their own sake.

It is a question of what actually fits someone who belongs to God.

✨ Becometh means what fits or suits

🙏 Saints means people set apart for God

🎯 This is about fit, not a rulebook

📖 Holiness fits who they already are

# Ephesians 5:5-7
# ⚖️ No Inheritance For Idolatry
---
## 💰 Whoremonger, Nor Unclean Person

These two categories repeat the same sins already named in verse three.

Paul is not introducing new sins here.

He is making sure no one thinks those sins were just a suggestion.

Repeating the list raises the seriousness of the warning.

🔁 These repeat verse three's list

🚫 Not a new set of sins

📢 Repetition raises the seriousness

📖 Warnings this serious are not optional

## 💎 Covetous Man, Who Is An Idolater

This phrase makes a direct equation most readers would not expect.

Covetousness is not just a smaller sin next to idolatry.

Paul calls it idolatry outright.

Wanting something badly enough can replace God as the thing a heart actually worships.

💎 Covetousness gets called idolatry outright

😲 Most readers do not expect this

❤️‍🔥 Wanting something can replace worship of God

📖 A craving can quietly become a god

## 👑 Inheritance In The Kingdom Of Christ And Of God

"Inheritance" means a share that belongs to someone by right, usually through family.

Paul says these sins block someone from that inheritance.

This is not about losing salvation over a single mistake.

It describes a settled pattern of life that never actually turned toward God.

👑 Inheritance means a share by right

🚪 These sins block that inheritance

🔁 This describes a settled pattern, not one mistake

📖 A whole direction of life is in view

## 🗣️ Deceive You With Vain Words

"Vain" means empty, carrying no real weight or truth.

Someone was apparently telling the Ephesians these sins were not a big deal.

Paul calls that argument empty, not persuasive.

A smooth sounding argument is not the same as a true one.

🗣️ Vain means empty, not true

😬 Someone argued these sins were minor

🚫 Paul calls that argument empty

📖 Smooth words are not always true

## 😔 Children Of Disobedience

This exact phrase already appeared earlier in this letter.

Ephesians chapter two used it to describe what the Ephesians used to be before Christ.

Paul uses it again here as a warning, not as their new identity.

He does not want them sliding back into what they already left.

🔁 This phrase already appeared in chapter two

⏮️ It described their old life before Christ

⚠️ Here it is used as a warning

📖 Paul does not want a slide backward

## 🙅 Partakers With Them

"Partakers" means sharing fully in something, not just standing near it.

Paul is not only warning against committing these sins directly.

He is warning against joining in, even as a quiet participant.

Going along with a group's sin still counts as sharing in it.

🙅 Partakers means sharing fully in something

👀 Not just committing the sin directly

🤝 Going along still counts as sharing

📖 Quiet participation is still participation

# Ephesians 5:8-10
# ☀️ Walking As Children Of Light
---
## 🌑 Ye Were Sometimes Darkness

"Sometimes" here is an old way of saying formerly, not occasionally.

Paul does not say the Ephesians used to live in darkness.

He says they actually were darkness itself.

That is a statement about identity, not just behavior.

🕰️ Sometimes means formerly, not occasionally

🌑 They were darkness, not just in darkness

🆔 This is about identity, not behavior

📖 Who they were has fully changed

## ☀️ Now Are Ye Light In The Lord

The change Paul describes is total, not partial.

Light does not describe a new habit they picked up.

It describes who they now are, the same way darkness once did.

That change happened only in the Lord, never on their own.

☀️ Light describes who they now are

🔁 This mirrors the darkness language exactly

🙌 The change was total, not partial

📖 It happened only in the Lord

## 🚶 Walk As Children Of Light

Identity and action are connected here, not separated.

Being light leads naturally into walking like it.

A person does not fake being light.

Their new nature is simply meant to show.

🚶 Walking follows naturally from being light

🆔 Identity leads into action

🚫 This is not about faking it

📖 A changed nature is meant to show

## 🍇 All Goodness And Righteousness And Truth

This list is not identical to the fruit of the Spirit named in Galatians.

Paul is not contradicting himself by using different words here.

He is naming what that fruit actually looks like once it grows.

"Fruit" describes a natural result of the Spirit's presence, not a forced effort.

🍇 Fruit describes a natural result

🌱 The Spirit produces growth, not forced effort

🔁 This list differs from Galatians, not contradicts it

📖 Goodness, righteousness, and truth are that growth

## 🔍 Proving What Is Acceptable Unto The Lord

"Proving" here means testing something to find out if it is genuine.

It carries the idea of a careful check, not a guess.

The Ephesians are told to actively examine their choices against what pleases God.

This is an ongoing habit, not a one time decision.

🔍 Proving means testing to confirm something

✅ Not a guess, but a careful check

🔁 This is an ongoing habit

📖 Every choice gets measured against God

# Ephesians 5:11-14
# 💡 Awake And Exposed By Light
---
## 🌒 No Fellowship With The Unfruitful Works Of Darkness

"Fellowship" means close partnership, not simply being nearby.

"Unfruitful" means these works produce nothing good, no matter how they are dressed up.

Paul is not just warning against doing these works.

He is warning against becoming close partners with people doing them.

🤝 Fellowship means close partnership

🚫 Unfruitful means no real good comes from it

👥 This warns against partnership, not just action

📖 Closeness to darkness still has weight

## 💡 Reprove Them

"Reprove" means to expose something and correct it, not quietly ignore it.

Silence toward sin can look like approval, even when it is not meant that way.

Paul calls for the opposite response, speaking up.

Light does not stay neutral around darkness.

💡 Reprove means expose and correct

🤐 Silence can look like approval

🗣️ Paul calls for speaking up instead

📖 Light does not stay neutral

## 🙈 A Shame Even To Speak Of

Some sins are so degrading that even describing them in detail does harm.

Paul avoids giving specifics here on purpose.

Naming every detail can end up spreading the very thing being condemned.

Restraint in how something is discussed can be its own form of wisdom.

🙈 Some sins are too degrading to detail

🚫 Paul avoids specifics on purpose

📢 Detailing sin can spread it further

📖 Restraint itself can be wisdom

## 🔦 Are Made Manifest By The Light

"Manifest" means made fully visible, nothing hidden left.

Light in this verse does more than illuminate a room.

It actively exposes whatever has been done in secret.

Hidden sin cannot survive forever once real light reaches it.

🔦 Manifest means fully visible

💡 Light does more than illuminate

🕵️ It actively exposes what was hidden

📖 Hidden sin cannot survive real light

## 😴 He Saith

Paul quotes a line here without naming its source directly.

Many scholars believe this was an early Christian hymn or baptismal saying.

The early church may have sung or recited lines like this one.

Paul trusted his readers to recognize it instantly.

😴 Paul quotes a line without naming it

🎶 Many scholars believe it was an early hymn

⛪ The church may have used it in worship

📖 Readers were expected to already know it

## 🛏️ Awake Thou That Sleepest

Sleep here is a picture for spiritual numbness, not physical tiredness.

A sleeping person is unaware of what is actually happening around them.

Paul is calling for alertness, not literal wakefulness.

Someone can be physically awake and still spiritually asleep.

🛏️ Sleep pictures spiritual numbness

😶 A sleeper is unaware of reality

⏰ Paul calls for real alertness

📖 Being awake and alert are not the same

## ⚰️ Arise From The Dead

This second image is stronger than the first one.

Sleep can be shaken off by effort alone.

Death cannot be undone by the person who is dead.

Only outside power can raise someone from that state.

Paul says Christ supplies that power.

⚰️ Death is stronger than sleep

🚫 A dead person cannot wake themselves

⚡ Only outside power can raise the dead

📖 Christ supplies the power to rise

## ✨ Christ Shall Give Thee Light

This promise completes the two pictures already given.

The sleeper gets woken, the dead get raised, the dark get light.

Each picture points to the same person doing the work.

Christ is the one actually making all three happen.

✨ This completes both earlier pictures

🙌 One person stands behind all three

🔑 Christ supplies what each picture needs

📖 Waking, rising, and light all trace to Him

# Ephesians 5:15-18
# 🍷 Filled With The Spirit
---
## 👀 Walk Circumspectly

"Circumspectly" is an old word meaning careful and alert, looking all around before acting.

It pictures someone checking their surroundings instead of walking carelessly.

Paul wants deliberate, watchful living, not careless drifting.

Small choices matter when the days are dangerous.

👀 Circumspectly means careful and alert

🔄 It pictures looking all around first

🚫 Not careless drifting through life

📖 Small choices matter in dangerous days

## 🧠 Not As Fools, But As Wise

"Fools" here does not mean lacking intelligence.

It means living as if consequences do not apply to you.

"Wise" means living with a clear eye on where choices actually lead.

The difference is awareness, not raw intelligence.

🧠 Fools means ignoring consequences

🎯 Wise means seeing where choices lead

🔁 The difference is awareness, not intelligence

📖 Wisdom watches where the road goes

## ⏳ Redeeming The Time

"Redeeming" means buying something back, rescuing it from being wasted.

Time here is treated like a limited resource that can be spent wisely or lost.

Paul pictures each day like something that can be bought back for good use.

Once a day is gone, it cannot be redeemed again.

⏳ Redeeming means buying something back

💰 Time is treated like a resource

🔁 Each day can be used well or lost

📖 A spent day cannot be redeemed twice

## ⚠️ Because The Days Are Evil

Paul is not describing one unusually bad season.

He means the normal condition of life in a fallen world.

That reality is exactly why urgency matters.

Waiting for easier days to start living wisely is waiting for something that is not coming.

⚠️ Evil days describes ordinary fallen life

🌍 Not just one bad season

⏰ This reality creates real urgency

📖 Easier days are not coming

## 🤔 Be Ye Not Unwise, But Understanding

"Unwise" repeats the same warning already given in verse fifteen.

"Understanding" here means grasping God's will specifically, not general knowledge.

Paul wants his readers to know what God actually wants, not just facts in general.

That kind of understanding takes real attention, not guesswork.

🤔 Unwise repeats the warning from verse fifteen

🎯 Understanding means grasping God's specific will

📚 Not general knowledge, but God's will

📖 Real understanding takes real attention

## 🍷 Drunk With Wine, Wherein Is Excess

"Excess" means losing control, going past any reasonable limit.

Paul is not condemning wine itself here.

He is condemning the loss of control that comes from overdoing it.

A person who is drunk is no longer the one actually in charge of themselves.

🍷 Excess means losing real control

🚫 Wine itself is not the target

🎭 Drunkenness hands control to something else

📖 Self control matters more than the drink

## 🔥 But Be Filled With The Spirit

Paul sets up a direct contrast on purpose.

Both pictures describe something controlling a person from the inside.

Wine controls through loss of self control.

The Spirit controls through something completely different, a willing surrender.

🔥 This contrasts directly with drunkenness

🎮 Both describe something controlling a person

🍷 Wine controls through loss of control

📖 The Spirit controls through willing surrender

# Ephesians 5:19-21
# 🎵 Submitting One To Another
---
## 🎶 Psalms And Hymns And Spiritual Songs

These three words describe different categories of worship music in the early church.

"Psalms" likely meant the Old Testament psalms, often sung with instruments.

"Hymns" were composed songs of praise, often about Christ directly.

"Spiritual songs" may have included songs created in the moment of worship.

🎶 Three different categories of worship music

📜 Psalms likely meant the Old Testament psalms

🎼 Hymns were composed songs about Christ

📖 Together they filled the church's worship

## 💓 Making Melody In Your Heart

This phrase adds something beyond the sound coming out of someone's mouth.

Worship here is not only a public performance.

It happens internally first, in the heart, before it is ever heard.

Singing without engaging the heart misses the actual point.

💓 Melody happens internally first

🎤 Not just a public performance

👂 Outward singing without heart misses the point

📖 The heart leads, the voice follows

## 🙏 Giving Thanks Always For All Things

This command has no exceptions built into it.

"Always" and "all things" leave no easy category to skip.

That does not mean every circumstance feels good or deserves celebration.

It means gratitude toward God can exist even inside hard circumstances.

🙏 No exceptions built into this command

⏳ Always and all things leave nothing out

😔 This does not mean every moment feels good

📖 Gratitude can exist inside hard circumstances

## ✝️ In The Name Of Our Lord Jesus Christ

"In the name of" means acting with someone's authority behind you.

Ancient letters and legal documents used this same kind of phrase.

Thanksgiving here is not offered on personal authority.

It is offered through Christ, who gives it its standing before God.

✝️ In the name of means acting with authority

📜 Legal documents used this same kind of phrase

🙌 Thanks is offered through Christ's authority

📖 Christ gives worship its standing before God

## 🤝 Submitting Yourselves One To Another

This verse introduces the next whole section of the letter.

"Submitting" means voluntarily placing someone else's good ahead of your own.

"One to another" means this is not a one direction command.

Every relationship that follows in this chapter gets explained starting from this verse.

🤝 This verse opens the next section

🙇 Submitting means placing others' good first

🔁 One to another means it runs both ways

📖 Every relationship below starts from this verse

## 🙏 In The Fear Of God

"Fear" here does not mean being afraid of God in a cruel sense.

It means deep reverence, taking God's authority seriously.

That reverence is the actual reason for mutual submission.

It is not based on which person seems stronger or more in charge.

🙏 Fear means deep reverence, not terror

⚖️ Reverence, not personal power, drives this

🎯 God's authority is the real reason

📖 Reverence for God grounds every relationship below

# Ephesians 5:22-24
# 💍 Wives And Husbands
---
## 🙇 Submit Yourselves Unto Your Own Husbands

This verse continues the same word already used in verse twenty one.

Paul is not introducing a brand new idea here.

He is applying the mutual submission already commanded to one specific relationship.

"Your own" husbands narrows this to marriage, not every man in general.

🔁 This continues verse twenty one's command

🎯 It applies submission to one relationship

💍 Your own husbands means marriage specifically

📖 Marriage is one place mutual submission lands

## 🙏 As Unto The Lord

This phrase sets the real motive behind the command.

The submission described is not aimed at a flawed human being alone.

It is offered the way someone would offer something to the Lord.

That motive changes the whole meaning of the act.

🙏 This sets the real motive

🎯 Not aimed at a flawed person alone

✨ Offered the way a gift is offered

📖 Motive changes the meaning of the act

## 👑 The Husband Is The Head Of The Wife

"Head" in this culture often pictured a source, like the head of a river.

It did not automatically mean superior value or worth.

Paul explains what headship means immediately in the rest of this verse.

He defines it through Christ's relationship to the church, not through raw authority alone.

🌊 Head pictured a source, like a river's head

⚖️ Not a claim about superior worth

🔑 Paul defines this through Christ right away

📖 Headship is explained, not left vague

## 🛡️ He Is The Saviour Of The Body

This phrase defines what headship actually looks like in practice.

Christ's headship over the church shows up as saving it, not ruling harshly.

That becomes the pattern Paul expects from a husband's headship too.

The weight of this phrase lands on sacrifice, not control.

🛡️ This defines what headship looks like

❤️ Christ's headship means saving, not harsh rule

🔁 This becomes the pattern for husbands

📖 The weight falls on sacrifice, not control

## ⛪ As The Church Is Subject Unto Christ

The church's relationship to Christ is Paul's model for this verse.

Christ never mistreats the church He leads.

Any comparison to Christ immediately limits what this submission could ever look like.

It can never justify harm or cruelty.

⛪ The church's bond with Christ is the model

❤️ Christ never mistreats the church

🚫 This limits what submission could mean

📖 It can never justify cruelty

## 📏 In Every Thing

This phrase sounds absolute at first glance.

It makes far more sense once Christ's example from the verse before is kept in view.

The standard is not a husband's every wish and whim.

The real standard is Christ, who gave Himself up for those He leads.

📏 This phrase sounds absolute at first

🔑 Christ's example from the verse limits it

🚫 Not a husband's every wish and whim

📖 Christ, not whim, sets the standard

# Ephesians 5:25-27
# ❤️ Husbands, Love Your Wives
---
## ❤️ Husbands, Love Your Wives

This command gets far more space in the chapter than the one given to wives.

In this culture, husbands holding authority was simply assumed.

Loving a wife sacrificially was the actual surprising, countercultural command.

Paul spends the most words on the harder, less expected instruction.

❤️ This command gets the most space here

📜 Authority for husbands was already assumed

😲 Sacrificial love was the surprising part

📖 Paul spends more words on the harder command

## ✝️ Gave Himself For It

This phrase sets the real standard for a husband's love.

It is not a feeling or a mood to maintain.

It is Christ's actual death, given willingly for the church He loves.

A standard that high rules out selfishness completely.

✝️ This sets the real standard

🚫 Not a feeling or passing mood

💔 Christ's death is the standard

📖 Selfishness has no room under this bar

## 💧 Sanctify And Cleanse It

"Sanctify" means set apart as holy, belonging fully to God.

"Cleanse" means washed clean from whatever stained it before.

Both words describe something Christ does to the church, not something she earns herself.

The church's holiness is a gift given, not a trophy won.

💧 Sanctify means set apart as holy

🧼 Cleanse means washed clean from stain

🎁 Both describe a gift, not an earned trophy

📖 Christ gives the holiness, the church receives it

## 📜 The Washing Of Water By The Word

Many scholars connect this phrase to baptism.

Others connect it more directly to the preaching and teaching of Scripture itself.

Either way, the cleansing described here comes from outside the church, not from within it.

God's own word is the actual source of this washing.

💧 Many scholars connect this to baptism

📜 Others connect it to Scripture's teaching

🌊 The cleansing comes from outside the church

📖 God's word is the source of it

## ✨ Present It To Himself A Glorious Church

This phrase pictures a wedding presentation, a bride being brought forward in splendor.

Ancient weddings often included this exact kind of formal presentation moment.

Christ is pictured as the one presenting His own bride to Himself.

The goal of all His work is a church prepared and ready.

💍 This pictures a wedding presentation

👰 Ancient weddings used this kind of moment

✨ Christ presents His own bride to Himself

📖 The goal is a church prepared and ready

## 🚫 Not Having Spot, Or Wrinkle, Or Any Such Thing

"Spot" and "wrinkle" describe flaws that would ruin a garment's appearance.

This language borrows directly from inspecting a fine piece of clothing.

Paul pictures the church being made flawless, the way a perfect garment would be.

That flawlessness is Christ's work on her, not her own achievement.

🧵 Spot and wrinkle describe flaws in cloth

👗 This borrows language from inspecting clothing

✨ The church is pictured as flawless

📖 That flawlessness is Christ's work, not hers

## 💎 Holy And Without Blemish

"Blemish" is the same kind of word used for inspecting sacrificial animals in the Old Testament.

An animal offered to God had to be free of defect.

Paul applies that exact same standard to describe the church Christ is preparing.

Christ's work produces a flawless offering, not a damaged one.

💎 Blemish recalls sacrificial animal inspection

🐑 Offerings had to be free of defect

⛪ That standard now describes the church

📖 Christ's work produces a flawless result

# Ephesians 5:28-30
# 🫀 Members Of His Body
---
## 💑 Love Their Wives As Their Own Bodies

This comparison is deliberately practical, not just poetic.

Everyone already knows how to care for their own body without being taught.

Paul uses that automatic instinct as the actual measuring stick for love.

A husband is told to treat his wife with that same automatic care.

🪞 This comparison is practical, not poetic

🙆 People already know how to care for themselves

📏 That instinct becomes the measuring stick

📖 A wife is to receive that same care

## 🔁 He That Loveth His Wife Loveth Himself

Paul draws a tight, almost mathematical connection here.

Marriage is pictured as a bond that tight.

One partner's good affects the other partner directly.

Loving a spouse poorly ends up harming the one giving the poor love too.

This is a simple observation about how close the bond really is.

🔁 A tight connection is drawn here

🪞 One partner's good affects the other

📉 Loving poorly harms the one who does it

📖 Closeness like this cuts both ways

## 🍞 No Man Ever Yet Hated His Own Flesh

This verse states something Paul assumes everyone already agrees with.

No healthy person deliberately works against their own body.

That universal instinct becomes the baseline Paul builds his whole argument on.

If that instinct is normal for a body, it should be normal for a marriage too.

🍞 This states an assumed universal truth

🙅 No one works against their own body

🏗️ This instinct becomes the baseline argument

📖 The same logic should apply to marriage

## 🌿 Nourisheth And Cherisheth It

"Nourisheth" means feeding and providing what is needed to grow.

"Cherisheth" means warming and tenderly caring for something valuable.

These two words were sometimes paired to describe a mother caring for a child.

Paul borrows that tender picture to describe how Christ treats the church.

🌿 Nourisheth means feeding what is needed

🤗 Cherisheth means warm, tender care

👶 This pairing could describe a mother's care

📖 Christ treats the church this tenderly

## ⚓ Even As The Lord The Church

This short phrase anchors the whole comparison back to Christ.

Every instruction in this section keeps circling back to the same example.

A husband's care is never measured against culture or convenience.

It is measured against how Christ actually treats His own church.

⚓ This phrase anchors the whole comparison

🔁 Every instruction circles back to Christ

🚫 Not measured against culture or convenience

📖 Christ's care for the church is the measure

## 🦴 Members Of His Body, Of His Flesh, And Of His Bones

This exact wording echoes Adam's words about Eve in the very first marriage.

Genesis describes Eve as bone of Adam's bone and flesh of his flesh.

Paul applies that same union language to Christ and the church.

The oldest picture of marriage in the Bible becomes the picture for this relationship too.

🦴 This echoes Adam's words about Eve

📜 Genesis used this bone and flesh language first

🔁 Paul applies it to Christ and the church

📖 The oldest marriage picture becomes this picture

# Ephesians 5:31-33
# 🔑 A Great Mystery
---
## 👨‍👩‍👧 Leave His Father And Mother

Paul quotes a line straight out of Genesis here, said about the very first marriage.

"Leave" describes a real shift in a person's primary loyalty.

A new household takes priority over the household someone grew up in.

This truth was already true in Genesis, long before Paul applied it to Christ.

📜 Paul quotes Genesis directly here

🏠 Leave means a shift in primary loyalty

👨‍👩‍👧 A new household now takes priority

📖 This truth predates Paul by the whole Bible

## 🧩 They Two Shall Be One Flesh

"One flesh" describes a real, binding union, not just a shared address.

Two separate people are joined into something that functions as a single unit.

Paul is about to use this exact picture for Christ and the church too.

The marriage bond becomes a living picture of that far greater union.

🧩 One flesh means a binding union

🔗 Two people joined into one unit

🔁 This becomes the picture for Christ's church

📖 Marriage pictures a far greater union

## 🔑 This Is A Great Mystery

"Mystery" in Paul's letters usually means a truth once hidden, now revealed by God.

Marriage was always meant to point toward something bigger than two people.

Most people living out that marriage never noticed what it was pointing to.

Paul reveals that hidden meaning here directly.

🔑 Mystery means a truth now revealed

🧩 Marriage always pointed to something bigger

😶 Most people never noticed what it meant

📖 Paul reveals that meaning here

## ⛪ I Speak Concerning Christ And The Church

Paul makes sure no one misses his real point here.

Every line about marriage in this whole section has carried a second meaning.

That second meaning was Christ and His church all along.

Marriage was never only about the two people inside it.

⛪ Paul states his real point directly

🔁 Every marriage line carried a second meaning

✝️ That meaning was always Christ's church

📖 Marriage was never only about two people

## 💗 So Love His Wife Even As Himself

This final verse brings the whole chapter back down to one household.

Paul has spent many verses on Christ and the church.

Now he returns to a single husband and his wife.

The standard stays the same as the one set earlier in the chapter.

🏠 This brings the chapter back to one household

🔁 The standard stays exactly the same

💗 A husband loves his wife like himself

📖 Christ's example lands on an ordinary marriage

## 🙇 That She Reverence Her Husband

"Reverence" means deep respect, not fear of mistreatment.

This final instruction answers back to the submission commanded in verse twenty two.

Paul closes the whole section the way he opened it, with mutual honor.

Both husband and wife are given a standard too high to reach through selfishness.

🙇 Reverence means deep respect, not fear

🔁 This answers back to verse twenty two

🤝 The whole section closes on mutual honor

📖 Selfishness could never meet either standard
`.trim();

export const EPHESIANS_FIVE_PERSONAL_SECTIONS = parseEphesiansFiveRawNotes(EPHESIANS_FIVE_RAW_NOTES);
