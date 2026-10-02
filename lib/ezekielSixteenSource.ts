export type EzekielSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielSixteenRawNotes(rawText: string): EzekielSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 16:${startVerse}` : `Ezekiel 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Ezekiel 16 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_SIXTEEN_RAW_NOTES = `# Ezekiel 16:1-5
# 👶 Born Unwanted In Jerusalem
---
## 🤢 Cause Jerusalem To Know Her Abominations

"Abominations" means things that are deeply disgusting and offensive to God.

This is not a gentle scolding.

God is laying out a formal charge against the whole city.

The rest of this long chapter explains exactly what that charge is.

🤢 Abominations means deeply disgusting sins
⚖️ This is a formal charge, not a scolding
📜 The whole chapter explains the charge
📖 God names the sin before judging it

## 🏛️ Thy Birth And Thy Nativity Is Of The Land Of Canaan

Before Israel ever lived in Jerusalem, pagan nations already lived there.

"Canaan" was the whole region filled with cities that worshiped many false gods.

Jerusalem's story does not start with God's people.

It starts inside a culture built on idol worship.

🏛️ Canaan means the whole pagan region
🗺️ Jerusalem began inside that pagan culture
🙅 Israel did not start this city
📖 Its roots were pagan from the start

## 👥 Thy Father Was An Amorite, And Thy Mother An Hittite

The Amorites and Hittites were Canaanite peoples known for worshiping idols.

Naming literal parents this way makes a bold point about identity.

Jerusalem's pagan roots were not distant or accidental.

They ran all the way back to its very beginning.

👥 Amorites and Hittites worshiped idols
🏙️ Jerusalem's identity is being named plainly
🌱 These pagan roots go back to the start
📖 Nothing about this origin was accidental

## 🩺 Thy Navel Was Not Cut

In the ancient world, cutting and tying the umbilical cord was the first basic act of newborn care.

Skipping it meant nobody even performed the most basic step of caring for this baby.

This image is not really about medicine.

It pictures total abandonment from the very first moment of life.

🩺 Cutting the cord was basic newborn care
🚫 Nobody performed even that first step
👶 The image is about total abandonment
📖 Neglect begins at the very first moment

## 🧂 Not Salted At All, Nor Swaddled At All

Newborns in this culture were often rubbed with salt and wrapped tightly in cloth strips.

Salt was believed to clean and firm the skin.

Swaddling means wrapping an infant snugly for warmth and comfort.

This baby received none of it, not even the simplest comfort.

🧂 Salt was rubbed on newborn skin
🩹 Swaddling means wrapping an infant snugly
❄️ This baby got no warmth or comfort
📖 Even simple comfort was withheld completely

## 😢 None Eye Pitied Thee

"None eye pitied thee" means that not a single person felt compassion for this baby.

Nobody stepped in to help at all.

The next verse shows exactly how far that neglect went.

Being completely unwanted is the whole picture God wants Jerusalem to see first.

😢 Pitied thee means felt compassion
🙅 Not one person stepped in
👀 The next verse shows the result
📖 Jerusalem begins this chapter unwanted

## 🏜️ Cast Out In The Open Field

Leaving an unwanted newborn outside to die was a real, terrible practice in the ancient world.

This baby was left completely alone, with no one coming back for her.

The whole image pictures Jerusalem as a city nobody chose or wanted.

That makes what happens in the very next verse even more striking.

🏜️ Exposure was a real ancient practice
🚫 Nobody came back for this baby
🏙️ Jerusalem is pictured as unwanted
➡️ The next verse changes everything

# Ezekiel 16:6-9
# 💧 Found, Washed, And Claimed
---
## 🩸 Polluted In Thine Own Blood

This pictures the baby still covered in the blood of her own birth.

Nobody had cleaned her the way verse four already described.

God is the first one who actually stops to look.

He finds her in the worst possible condition.

🩸 She is still covered in birth blood
🙈 Nobody had cleaned her yet
👀 God is the first to stop and look
📖 He finds her at her very worst

## 🗣️ I Said Unto Thee When Thou Wast In Thy Blood, Live

The word "Live" is repeated twice on purpose here.

It is a direct command spoken over someone left to die.

This is the exact moment the abandoned baby is given a future.

Nothing about her survival came from her own strength.

🗣️ Live is repeated for emphasis
⏳ It reverses a death sentence
👶 Her survival starts right here
📖 Her future came from God, not herself

## 🌱 Multiply As The Bud Of The Field

A "bud" grows on its own once it is planted in good soil.

It does not need to be forced to grow.

Jerusalem's growth from here happens the same natural, rapid way.

God simply lets her thrive once she is no longer abandoned.

🌱 A bud grows naturally once planted
⏩ Growth happens fast from here
🏙️ Jerusalem thrives once rescued
📖 God lets her grow once safe

## 💃 Thy Breasts Are Fashioned, And Thine Hair Is Grown

This marks the moment the metaphor shifts from infant to young woman.

Jerusalem is no longer being pictured as a baby.

She has reached the age where marriage becomes possible.

The whole allegory is about to move into marriage imagery.

💃 The metaphor shifts to a young woman
📏 She has reached marrying age
💍 Marriage imagery comes next
📖 The allegory keeps tracking her growth

## ⏳ Thy Time Was The Time Of Love

This phrase is an old way of saying someone has reached the age for marriage.

It does not describe one single romantic moment.

It describes an entire season of life.

God is the one who notices that season has arrived.

⏳ Time of love means marrying age
📅 It describes a whole season
👀 God notices the moment Himself
📖 He is watching her the whole time

## 🧵 I Spread My Skirt Over Thee

Spreading a garment corner over someone was a real ancient custom.

It meant a man was claiming a woman as his wife.

The same custom appears later when Ruth asks this of Boaz.

Here God Himself performs this exact action over Jerusalem.

🧵 Spreading a garment claimed a bride
📜 Ruth later asks Boaz for this
🤝 God performs the same custom
📖 He claims Jerusalem as His own

## 🤝 I Sware Unto Thee, And Entered Into A Covenant With Thee

A covenant is a binding promise, sealed with an oath.

Marriage here is described using the same serious legal language used for God's other promises in scripture.

This is not a casual relationship.

It is a solemn and permanent commitment.

🤝 Covenant means a binding sealed promise
⚖️ Marriage gets this same serious language
📜 Scripture uses covenant for major promises
📖 This bond was never meant to be casual

## 💧 Then Washed I Thee With Water

The bath that never happened back in verse four finally happens here.

Oil was often added afterward as a finishing touch for skin and beauty.

This is the full reversal of the neglect from the beginning of the chapter.

Every piece of care she was denied as a baby is now being given to her.

💧 The missing bath finally happens
🧴 Oil finished the cleansing process
🔁 This reverses the early neglect
📖 Every denied care is now given

# Ezekiel 16:10-14
# 👑 Clothed Like A Queen
---
## 👡 Shod Thee With Badgers' Skin

"Badgers' skin" refers to a tough, fine leather used for quality footwear.

Scholars still debate which animal this leather came from.

Either way, it describes an unusually fine material for sandals.

Even her shoes marked her as someone cared for at the highest level.

👡 Badgers skin means a fine tough leather
❓ The exact animal is still debated
✨ It made unusually fine sandals
📖 Even her shoes showed real care

## 🧵 Girded Thee About With Fine Linen, And Covered Thee With Silk

Fine linen was an expensive cloth, often imported from Egypt.

Silk was even rarer and marked extreme wealth.

Both fabrics together describe clothing fit for royalty, not an ordinary bride.

Every layer added to this picture of lavish, undeserved generosity.

🧵 Fine linen was costly imported cloth
💎 Silk marked extreme wealth
👑 Together they describe royal clothing
📖 Every layer was undeserved generosity

## 💎 Bracelets Upon Thy Hands, And A Chain On Thy Neck

Jewelry like this was a common bridal gift in the ancient world.

Bracelets and a neck chain marked a woman as cherished and provided for.

These were not just decorations.

They were a public sign of being chosen and loved.

💎 Jewelry was a common bridal gift
🙌 It marked her as cherished
👀 It was a public sign
📖 She was shown as chosen and loved

## 💍 A Jewel On Thy Forehead

A forehead jewel was another real bridal gift in this culture.

Rebekah receives a similar gift in Genesis when Abraham's servant finds her for Isaac.

This detail connects Jerusalem's story to that same ancient custom.

It marks her as a bride being formally presented.

💍 Forehead jewels were real bridal gifts
📜 Rebekah received one in Genesis
🔁 The same custom appears here
📖 She is being presented as a bride

## 👑 A Beautiful Crown Upon Thine Head

A crown signals more than marriage.

It signals royalty.

God is not just giving Jerusalem a husband.

He is making her into a queen with a whole kingdom.

👑 A crown signals more than marriage
🏰 It signals royalty itself
🤴 God makes her into a queen
📖 A kingdom comes with the crown

## 🍯 Thou Didst Eat Fine Flour, And Honey, And Oil

These three foods together describe abundance, not survival rations.

Fine flour meant bread made from the best grain available.

Honey and oil were valued staples, not everyday basics.

This is a picture of a well fed, well provided household.

🍯 These foods describe real abundance
🌾 Fine flour meant the best grain
🫒 Honey and oil were valued staples
📖 This household lacked nothing

## 🌟 Thou Wast Exceeding Beautiful, And Didst Prosper Into A Kingdom

The transformation is now complete.

An abandoned infant has become a prospering kingdom.

Nothing about this path happened by her own effort.

Every single step traces back to what God did for her.

🌟 The transformation is now complete
👶 She began as an abandoned infant
🏰 She became a full kingdom
📖 Every step traces back to God

## 🌍 It Was Perfect Through My Comeliness, Which I Had Put Upon Thee

"Comeliness" means attractiveness or beauty.

This is the most important line in the whole section.

Her beauty was never something she created herself.

It was a gift placed on her by God, and that fact is about to be forgotten.

🌍 Comeliness means attractiveness or beauty
🎁 Her beauty was a gift, not her own
⚠️ This gift is about to be forgotten
📖 Credit belongs to the giver, not the receiver

# Ezekiel 16:15-19
# 💔 Beauty Turned Into Betrayal
---
## 😔 Thou Didst Trust In Thine Own Beauty

This is the exact turning point of the whole allegory.

Instead of crediting God, Jerusalem began crediting herself.

That one shift in trust opens the door to everything that follows.

Forgetting the giver always changes how a gift gets used.

😔 This is the turning point
🙋 She began crediting herself instead
🚪 That shift opened the door to sin
📖 Forgetting the giver changes everything

## 😕 Playedst The Harlot Because Of Thy Renown

Throughout the prophets, "playing the harlot" usually describes spiritual unfaithfulness, not only literal prostitution.

It can mean worshiping other gods or trusting foreign nations instead of God.

Jerusalem's fame and beauty became the very thing she chased after on her own.

The gift itself became the distraction from the giver.

😕 Playing the harlot often means spiritual unfaithfulness
🙏 It can mean trusting other gods
🏙️ Her own fame became the distraction
📖 The gift replaced the giver in her heart

## 🌊 Pouredst Out Thy Fornications On Every One That Passed By

This phrase pictures overflowing, uncontrolled unfaithfulness.

It was not a private struggle kept quiet.

It was public and constant, offered to anyone nearby.

The imagery is meant to shock, not just describe.

🌊 This pictures overflowing unfaithfulness
🙊 It was not kept private
👥 It was offered to anyone nearby
📖 The imagery is meant to shock

## 🎨 Deckedst Thy High Places With Divers Colours

"High places" were hilltop shrines built for worshiping other gods.

"Divers colours" simply means a variety of bright colors.

Jerusalem used the very fabric gifts from her covenant to decorate those shrines.

She took what God gave her and used it against Him.

🎨 Divers colours means many bright colors
⛰️ High places were shrines to other gods
🎁 She decorated them with her own gifts
📖 Gifts from God were turned against Him

## 🗿 Madest To Thyself Images Of Men

These images were idols shaped like human figures.

Many ancient cultures made idols like this for fertility worship.

She likely melted down jewelry God had given her to make them.

The very gold meant to mark her as His became raw material for false gods.

🗿 These were human shaped idols
🔥 Likely melted from her own jewelry
🎁 God's own gifts became the material
📖 His gift was turned into an idol

## 🕯️ Set Mine Oil And Mine Incense Before Them

Oil and incense were offerings meant for God alone.

Instead, Jerusalem gave them to lifeless idols.

This was not a small oversight.

It redirected worship that belonged only to the one who rescued her.

🕯️ Oil and incense belonged to God
🚫 She gave them to idols instead
⚠️ This was not a small mistake
📖 True worship was redirected completely

## 🍞 Set It Before Them For A Sweet Savour

"Sweet savour" is the exact phrase used throughout the Torah for an offering God accepts.

Here that same phrase gets applied to food given to idols instead.

The language of true worship is being copied and misused.

Even the vocabulary of faith was not safe from this betrayal.

🍞 Sweet savour describes an accepted offering
📜 This same phrase is used in the Torah
🔄 The language of worship is being misused
📖 Even the vocabulary of faith was corrupted

# Ezekiel 16:20-22
# 🔥 Her Own Children Sacrificed
---
## 😱 Taken Thy Sons And Thy Daughters...Sacrificed Unto Them To Be Devoured

This names the most severe charge in the entire chapter.

"Devoured" means these children were consumed as part of a sacrifice.

Her own sons and daughters are described as belonging to God first.

Instead, they were given to false gods instead of Him.

😱 This is the chapter's most severe charge
🔥 Devoured means consumed as a sacrifice
👶 Her children belonged to God first
📖 They were given to idols instead

## ❓ Is This Of Thy Whoredoms A Small Matter

This rhetorical question expects only one answer, no.

God is naming the full scale of the escalation on purpose.

What began as broken trust has now reached the murder of her own children.

Nothing about this charge is treated as minor.

❓ The question expects the answer no
📈 This names a clear escalation
💔 Broken trust led to lost lives
📖 Nothing here is treated as minor

## 🔥 Cause Them To Pass Through The Fire

This phrase describes child sacrifice offered to the god Molech.

Other passages in the law and in Kings describe this same practice plainly.

It was a real, documented horror in the ancient Near East, not a figure of speech.

God names it directly instead of softening the language.

🔥 This describes sacrifice to the god Molech
📜 Other scripture names this same practice
🌍 It was a real ancient horror
📖 God names it without softening it

## 😶 Thou Hast Not Remembered The Days Of Thy Youth

This phrase repeats a theme from the very start of the chapter.

Jerusalem forgot the helpless, rescued infant she once was.

Remembering that beginning should have kept her humble.

Forgetting it opened the door to everything that followed.

😶 This repeats the chapter's opening theme
👶 She forgot her own helpless start
🙏 Remembering it should have kept her humble
📖 Forgetting it opened the door to ruin

# Ezekiel 16:23-29
# 🌍 Whoredom Spreads To Every Neighbor
---
## 😭 Woe, Woe Unto Thee

Saying "woe" twice in a row is a formal way of announcing serious doom.

It is not an expression of simple sadness.

It functions like a legal pronouncement before a sentence is given.

The repetition makes the warning impossible to miss.

😭 Woe twice signals serious doom
⚖️ It works like a legal pronouncement
🔔 It comes right before a sentence
📖 The repetition makes it impossible to miss

## 🏛️ Built Unto Thee An Eminent Place

An "eminent place" was a raised platform built for worshiping other gods.

Building one in every street meant this worship was not hidden at all.

It was public, permanent construction, not a private lapse.

The city itself was being physically reshaped around idolatry.

🏛️ Eminent place means a raised worship platform
🏙️ It was built in every street
🧱 This was permanent, not private
📖 The whole city was reshaped by idolatry

## 🚪 Opened Thy Feet To Every One That Passed By

This phrase is a direct idiom for total, public unfaithfulness.

It completes the picture already building since verse fifteen.

Nothing about this sin was hidden or occasional.

It was constant and available to anyone.

🚪 This idiom describes total unfaithfulness
🏙️ It completes the picture from verse fifteen
🙌 Nothing about it was hidden
📖 It was constant, not occasional

## 🇪🇬 Committed Fornication With The Egyptians Thy Neighbours, Great Of Flesh

"Great of flesh" likely points to Egypt's size and power as a nation.

Judah really did form political alliances with Egypt at points in its history.

Here, a political alliance gets described using the same unfaithfulness language as idol worship.

Trusting a foreign power instead of God counted as the same kind of betrayal.

🇪🇬 Great of flesh points to Egypt's power
📜 Judah really allied with Egypt historically
🤝 Political alliances get called unfaithfulness here
📖 Trusting a nation still betrays God

## 🍽️ Diminished Thine Ordinary Food

This describes judgment pictured as reduced provision, like a famine or a siege.

It reverses the abundance described earlier in the chapter.

The same God who once gave fine flour and honey now withholds it.

Consequences here match the exact blessing that was abused.

🍽️ This pictures famine like judgment
🔄 It reverses the earlier abundance
🌾 Fine flour and honey are withheld now
📖 The punishment matches the abused blessing

## ⚔️ Delivered Thee Unto The Will Of Them That Hate Thee

God allows old enemies, the Philistines, to gain power over her.

This is not random misfortune.

It is discipline carried out through real historical nations.

Even Jerusalem's enemies become a tool in God's hand.

⚔️ The Philistines are named as enemies
🎯 This discipline is not random
🌍 Real nations carry out this discipline
📖 Even enemies serve God's purpose here

## 🇦🇸 Played The Whore Also With The Assyrians, Because Thou Wast Unsatiable

"Unsatiable" means never satisfied, no matter how much is gained.

Assyria was another real foreign power Judah turned to at different points.

Each new alliance was supposed to finally bring security.

None of them ever actually did.

🇦🇸 Unsatiable means never truly satisfied
📜 Assyria was another real historical ally
🛡️ Each alliance promised security
📖 None of them ever delivered it

## 🇮🇶 Multiplied Thy Fornication...Unto Chaldea

Chaldea refers to Babylon, the next major power in this list.

The pattern keeps repeating with a new nation each time.

Egypt, Assyria, and now Babylon, and still no satisfaction follows.

The chasing itself had become the real problem, not any single nation.

🇮🇶 Chaldea refers to Babylon
🔁 The same pattern repeats again
🌍 Three major powers now named
📖 The chasing itself was the real problem

# Ezekiel 16:30-34
# 🙃 A Harlot Who Pays Instead Of Being Paid
---
## 💔 How Weak Is Thine Heart

"Weak" here does not mean physically frail.

It means morally reckless, willing to act without any real resistance.

This is a surprising accusation aimed at someone who looks powerful and wealthy.

Real weakness can hide behind an appearance of strength.

💔 Weak here means morally reckless
🏰 She looks powerful and wealthy
👀 This weakness hides behind appearances
📖 Strength on the outside can hide real weakness

## 😤 The Work Of An Imperious Whorish Woman

"Imperious" means bold, controlling, and shameless.

This is not describing a victim of circumstance.

It describes someone driving her own choices with open defiance.

The chapter keeps refusing to soften this description.

😤 Imperious means bold and shameless
🙅 This is not a victim's story
🎯 She drives her own choices
📖 The chapter refuses to soften this

## 💰 Thou Scornest Hire

A normal prostitute at least receives payment for what she does.

Jerusalem refuses even that, which is a strange kind of reversal.

Rejecting payment here is not virtue.

It only sets up an even stranger behavior described next.

💰 Normal harlots are paid for what they do
🙅 She refuses even that payment
🔄 This is a strange reversal
📖 It sets up something even stranger

## 💍 Taketh Strangers Instead Of Her Husband

This phrase moves the metaphor from general sin into a specific legal category, adultery.

Jerusalem is pictured as a wife, not a stranger to God.

That makes every alliance and every idol a direct betrayal of a marriage.

The relationship being broken was never distant to begin with.

💍 This names the sin as adultery
👰 She is pictured as a wife
💔 Every idol becomes a marriage betrayal
📖 This betrayal was never distant

## 🎁 Thou Givest Thy Gifts To All Thy Lovers

Here the pattern flips completely backward.

Normal harlots receive gifts, but Jerusalem pays her own.

She gives away tribute and treasure just to keep foreign nations and idols interested in her.

She loses in a situation most people would expect to profit from.

🎁 The normal pattern flips backward
💸 She pays instead of being paid
🌍 Tribute kept foreign nations interested
📖 She loses where others would profit

## 🙃 Therefore Thou Art Contrary

"Contrary" means the complete opposite of what is expected.

Even by the low standard of ordinary harlotry, Jerusalem's behavior makes no sense.

She has turned something shameful into something even more backward.

This verse closes the comparison with total absurdity.

🙃 Contrary means the opposite of expected
🔄 Even harlotry has its own logic
🙅 She breaks that logic too
📖 The comparison ends in total absurdity

# Ezekiel 16:35-39
# ⚖️ The Sentence Is Passed
---
## 📯 Wherefore, O Harlot, Hear The Word Of The LORD

This phrase marks a clear shift in the chapter.

The accusation stage is finished.

What follows now is a formal sentence, like a verdict read aloud in court.

Everything before this verse was evidence, not punishment.

📯 This marks a clear shift
✅ The accusation stage is finished
⚖️ A formal sentence follows now
📖 Everything before this was only evidence

## 👁️ Thy Nakedness Discovered

"Nakedness discovered" means her sin has been fully and publicly exposed.

Nothing is hidden or deniable any longer.

This phrase echoes the literal nakedness from the beginning of the chapter.

The judgment matches the very image the allegory started with.

👁️ Nakedness discovered means sin fully exposed
🙅 Nothing is deniable any longer
🔁 This echoes the chapter's opening image
📖 Judgment matches where the story began

## 🩸 By The Blood Of Thy Children, Which Thou Didst Give Unto Them

This repeats the most severe charge one final time before sentencing.

Child sacrifice is placed front and center, not buried among lesser complaints.

The worst sin gets the clearest mention.

Nothing about it is minimized at the moment of judgment.

🩸 This repeats the worst charge
🎯 It is placed front and center
⚠️ The worst sin gets clear mention
📖 Nothing here is minimized

## 👀 I Will Discover Thy Nakedness Unto Them

Public shaming like this was a real practice used against unfaithful wives in the ancient world.

The very lovers she tried to please are gathered to witness her exposure.

What she hid becomes the spectacle everyone sees.

The punishment fits the specific shape of the sin.

👀 Public shaming was a real ancient practice
🌍 Her former lovers witness this
🎭 Hidden sin becomes public spectacle
📖 The punishment matches the sin's shape

## ⚖️ Women That Break Wedlock And Shed Blood Are Judged

Israelite law treated adultery and murder as two separate capital crimes.

This verse names both crimes together on purpose.

Jerusalem's sentence covers unfaithfulness and the killing of her own children at once.

The legal basis for this judgment is being stated plainly.

⚖️ Adultery and murder were both capital crimes
📜 Both crimes are named here together
👶 Unfaithfulness and killing are judged as one
📖 The legal basis is stated plainly

## 🙈 Leave Thee Naked And Bare

This phrase is an exact callback to how the chapter began.

Every gift God gave is stripped away in judgment.

She ends this stage exactly where she started, with nothing of her own.

The whole arc of the chapter comes full circle here.

🙈 This repeats the chapter's opening words
🎁 Every gift is stripped away
🔁 She returns to where she started
📖 The whole arc comes full circle

# Ezekiel 16:40-43
# 🔥 Judgment Carried Out
---
## 🪨 Stone Thee With Stones, And Thrust Thee Through With Their Swords

Stoning was the actual legal penalty for adultery under the law given to Israel.

This judgment is carried out historically through invading armies, not a sudden supernatural act.

God uses real nations as the instrument of a real legal penalty.

The punishment described here was never only symbolic.

🪨 Stoning was the legal penalty for adultery
⚔️ Invading armies carry out this judgment
🌍 Real nations act as God's instrument
📖 This punishment was never only symbolic

## 🔥 Execute Judgments Upon Thee In The Sight Of Many Women

This judgment is meant to be witnessed, not hidden away.

Other cities and nations are watching this happen.

A public judgment was meant to serve as a clear warning to everyone else.

What happens to Jerusalem becomes a lesson for every watching nation.

🔥 This judgment is meant to be seen
👥 Other nations are watching closely
⚠️ It serves as a warning to them
📖 Jerusalem's judgment becomes everyone's lesson

## 🕊️ I Will Be Quiet, And Will Be No More Angry

God's anger in this chapter is not described as endless rage.

It has a clear purpose and a clear stopping point.

Once justice is fully carried out, His anger settles and rests.

This detail matters for understanding God's character through the whole chapter.

🕊️ God's anger is not endless
🎯 It has a clear purpose
✅ It settles once justice is done
📖 This reveals God's real character

## 🚫 Thou Shalt Not Commit This Lewdness Above All Thine Abominations

This closes out the judgment section with one final warning.

"Lewdness" here points back to the child sacrifice named earlier in the chapter.

That sin is marked as the worst among everything else listed.

The sentence ends by naming exactly what must never happen again.

🚫 This closes the judgment section
🔙 Lewdness points back to child sacrifice
⚠️ It is marked as the worst sin
📖 The sentence names what must never return

# Ezekiel 16:44-48
# 👯 Two Sisters, Samaria And Sodom
---
## 📜 As Is The Mother, So Is Her Daughter

This was a common saying in the ancient world, much like a modern proverb about family resemblance.

It describes a child inheriting a parent's character, not just their appearance.

The proverb sets up the next verses, which trace Jerusalem's inherited pattern.

A pattern repeated across generations rarely starts by accident.

📜 This was a common ancient proverb
👪 It describes inherited character, not looks
🔁 It sets up the next verses
📖 Repeated patterns rarely start by accident

## 😔 Thou Art Thy Mother's Daughter, That Lotheth Her Husband And Her Children

"Lotheth" means despises or rejects completely.

This directly recalls the pagan parents already named back in verse three.

Jerusalem is accused of rejecting both God, pictured as her husband, and the people meant to be her own children.

The pattern from her origin never actually stopped.

😔 Lotheth means despises completely
🔁 This recalls the parents from verse three
💔 She rejects both God and her people
📖 The old pattern never really stopped

## 👩‍👩‍👧 Thine Elder Sister Is Samaria...Thy Younger Sister...Is Sodom

Samaria was the capital city of the northern kingdom of Israel.

Sodom was the infamous city destroyed for its wickedness in Genesis.

Calling them Jerusalem's sisters means they share the same moral family, not an actual bloodline.

This comparison is about to get far more uncomfortable than it first sounds.

👩‍👩‍👧 Samaria was Israel's northern capital
🔥 Sodom was the city destroyed in Genesis
👪 Sister here means shared moral family
📖 This comparison is about to get worse

## 😳 Thou Wast Corrupted More Than They In All Thy Ways

This is a shocking claim.

Jerusalem is being called worse than the city most remembered for wickedness.

Samaria had already fallen to Assyria by this point in history.

Even that fall does not make Jerusalem look better by comparison.

😳 This claim is genuinely shocking
🔥 Jerusalem is called worse than Sodom
🏛️ Samaria had already fallen to Assyria
📖 Even that fall does not help her case

## 🙏 As I Live, Saith The Lord GOD

This phrase is a solemn oath, not a casual expression.

God is swearing by His own life to make this comparison certain.

That level of seriousness shows this claim is not exaggeration.

The comparison about to be made is meant to be taken fully seriously.

🙏 This phrase is a solemn oath
🎯 God swears by His own life
⚖️ This is not exaggeration
📖 The claim is meant to be taken seriously

# Ezekiel 16:49-52
# 🏙️ Sodom's Specific Sin
---
## 🍞 Pride, Fulness Of Bread, And Abundance Of Idleness

This verse names Sodom's actual sin plainly.

It was not only the famous wickedness most people remember.

Arrogance, overindulgence, and laziness sat underneath that wickedness the whole time.

Sin often has ordinary roots hiding beneath a dramatic reputation.

🍞 Sodom's sin is named plainly here
😤 Pride and overindulgence came first
🛋️ Laziness sat underneath it all
📖 Ordinary roots can hide a dramatic reputation

## 🤲 Neither Did She Strengthen The Hand Of The Poor And Needy

This line gives Sodom's sin a concrete, specific shape.

Ignoring the poor and needy was a real and measurable failure.

It was not just an abstract idea of wickedness.

Neglecting the vulnerable counted as a genuine, named sin on its own.

🤲 This names a concrete failure
🚫 Ignoring the poor was measurable
💔 It was not just abstract wickedness
📖 Neglecting the vulnerable counts as real sin

## 😤 They Were Haughty, And Committed Abomination Before Me

"Haughty" means proud and looking down on others.

Pride gets named as the root cause, listed before the consequence that follows.

Cause comes first, consequence comes second, in that exact order.

The order itself teaches something about how sin actually works.

😤 Haughty means proud and superior
🌱 Pride is named as the root cause
⚖️ Consequence always follows cause
📖 Sin's order reveals how it works

## 🙊 Hast Justified Thy Sisters In All Thine Abominations

This is a strange kind of irony.

By sinning even worse than her sisters, Jerusalem accidentally makes them look better by comparison.

Being the worst in the room does not clear anyone of guilt.

It only shifts how guilt gets measured.

🙊 This creates a strange irony
📉 Being worse makes others look better
🚫 It clears nobody of guilt
📖 It only shifts how guilt is measured

## 🏆 They Are More Righteous Than Thou

This is the sharpest line in the whole comparison.

Sodom and Samaria, both already judged harshly, still come out ahead of Jerusalem here.

Having judged her neighbors earlier only makes this verdict land harder now.

The standard she used on others is the same standard used on her.

🏆 This is the sharpest line here
🔥 Sodom and Samaria still rank above her
⚖️ Judging others made this land harder
📖 Her own standard gets used on her

# Ezekiel 16:53-58
# 🔁 Shared Fates, Reversed
---
## 🔓 Bring Again The Captivity Of Thy Captives

"Bring again their captivity" is an old idiom meaning to restore someone from exile or judgment.

This promise applies to all three, Sodom, Samaria, and Jerusalem together.

Mercy in this chapter is never only for Jerusalem alone.

Restoration gets extended even to a city as notorious as Sodom.

🔓 This idiom means restoring from judgment
👯 All three cities share this promise
🙌 Mercy is not only for Jerusalem
📖 Even Sodom receives this restoration

## 😳 Thou Art A Comfort Unto Them

This is a strange kind of mercy.

Seeing Jerusalem judged even more severely softens the shame her sisters carry.

Comparing herself to someone judged worse makes judgment easier to bear.

That dynamic cuts in uncomfortable directions in both ways.

😳 This mercy feels strange at first
📉 Jerusalem's shame softens her sisters' shame
⚖️ Comparison makes judgment easier to bear
📖 This dynamic works in both directions

## 🏡 Thou And Thy Daughters Shall Return To Your Former Estate

All three sisters are promised a future restoration together.

"Former estate" means their previous condition before judgment fell.

None of the three gets left out of this hope.

Heavy judgment in this chapter still ends with a door left open.

🏡 Former estate means their condition before judgment
👯 None of the three is left out
🚪 A door stays open after judgment
📖 Hope survives even heavy judgment

## 🤐 Thy Sister Sodom Was Not Mentioned By Thy Mouth In The Day Of Thy Pride

In better days, Jerusalem was too proud to even compare herself to Sodom.

She considered herself above that kind of comparison entirely.

Now the very comparison she once refused gets forced into the open.

Pride often hides the comparisons it cannot survive.

🤐 She once refused this comparison
👑 Pride kept her above it
🔓 That comparison is now forced open
📖 Pride hides what it cannot survive

## 😒 The Daughters Of The Philistines, Which Despise Thee

The Philistines are named again as old, mocking enemies.

Once Jerusalem's sin became public, even old rivals openly despised her.

Shame like this rarely stays contained to just one audience.

It spreads to everyone already watching for a reason to mock.

😒 The Philistines mock her openly
👥 Old rivals now despise her too
📢 Shame rarely stays contained
📖 Mockery spreads to every watching eye

## 🙊 Thou Hast Borne Thy Lewdness And Thine Abominations

"Lewdness" names shameless sexual sin plainly, without softening it.

This line works as a summary before the chapter's final turn.

Every charge from the whole chapter gets gathered into this one label.

Nothing is left unnamed at this point in the story.

🙊 Lewdness names shameless sin plainly
📋 This summarizes the whole chapter
🗂️ Every charge gets gathered here
📖 Nothing is left unnamed

# Ezekiel 16:59-63
# 🤝 An Everlasting Covenant Anyway
---
## 📜 Despised The Oath In Breaking The Covenant

This repeats the core legal charge one final time.

The marriage covenant from verse eight was a sworn oath, not a casual agreement.

Breaking it was treated with the same seriousness as breaking any binding promise to God.

Every other sin in the chapter flows out from this one broken oath.

📜 This repeats the core legal charge
💍 The marriage covenant was a sworn oath
⚖️ Breaking it was treated seriously
📖 Every other sin flows from this one

## 🔁 Nevertheless I Will Remember My Covenant With Thee In The Days Of Thy Youth

"Nevertheless" signals a massive turn in the whole chapter.

After pages of charges and judgment, God chooses to remember the original promise anyway.

This callback reaches all the way back to rescuing the abandoned infant in verse six.

Mercy here is not earned, it is simply chosen.

🔁 Nevertheless signals a massive turn
🤲 God remembers the promise anyway
👶 It recalls rescuing the infant in verse six
📖 This mercy is chosen, not earned

## ♾️ I Will Establish Unto Thee An Everlasting Covenant

This covenant is described as permanent, unlike the one already broken.

"Everlasting" means it will never end or be revoked again.

Other prophets like Jeremiah describe a similar future, lasting promise from God.

This points forward to something far more secure than what came before.

♾️ Everlasting means it will never end
🔁 The old covenant was broken, not this one
📜 Jeremiah describes a similar future promise
📖 This points toward something more secure

## 👪 I Will Give Them Unto Thee For Daughters, But Not By Thy Covenant

Samaria and Sodom's people are given to Jerusalem like gained family.

This happens through God's mercy, not through anything Jerusalem herself arranged.

The gift is deliberately not based on her own broken terms.

Even restoration here stays entirely in God's hands.

👪 Samaria and Sodom's people become family
🎁 This happens through mercy, not her effort
🚫 It is not based on her terms
📖 Restoration stays entirely in God's hands

## 🪞 Thou Shalt Know That I Am The LORD

This exact phrase repeats constantly across the whole book of Ezekiel.

Earlier in the chapter, it marked the reason behind judgment.

Here the same phrase now marks the reason behind mercy instead.

Both judgment and mercy exist to reveal exactly who God is.

🪞 This phrase repeats throughout Ezekiel
⚖️ It once marked the reason for judgment
🤲 Now it marks the reason for mercy
📖 Both reveal exactly who God is

## 🤐 Never Open Thy Mouth Any More Because Of Thy Shame

The chapter does not end with pride restored.

It ends with humbled silence instead.

That silence comes from shame, but it also comes from gratitude for mercy she did not earn.

This is a strikingly honest way to close such a difficult chapter.

🤐 The chapter ends in humbled silence
🙅 Pride is not what gets restored
🙏 Shame mixes with real gratitude here
📖 This closing is strikingly honest

## ☮️ When I Am Pacified Toward Thee For All That Thou Hast Done

"Pacified" means calmed or satisfied.

God's own anger settles because of His own mercy, not because of anything Jerusalem did to deserve it.

The whole allegory closes on that exact point.

Grace, not performance, is what actually resolves this entire story.

☮️ Pacified means calmed or satisfied
🙏 God's anger settles through His own mercy
🚫 Nothing Jerusalem did earns this ending
📖 Grace resolves the whole story
`.trim();

export const EZEKIEL_SIXTEEN_PERSONAL_SECTIONS = parseEzekielSixteenRawNotes(EZEKIEL_SIXTEEN_RAW_NOTES);
