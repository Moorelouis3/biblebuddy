export type PsalmsFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyRawNotes(rawText: string): PsalmsFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+50:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 50 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+50:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+50:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 50 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 50,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 50:${startVerse}` : `Psalms 50:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 50 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_RAW_NOTES = `# Psalms 50:1-6
# ⚖️ God Arrives As Judge
---
## 👑 The Mighty God, Even The LORD

This verse stacks three different names for God together.

"The mighty God" translates the Hebrew word El, an ancient name for God.

"The LORD" translates Yahweh, God's personal covenant name for Israel.

Stacking all three names in one line signals a scene of full authority.

👑 Three names for God open this verse

🔤 El is an ancient name for God

📜 LORD translates God's covenant name Yahweh

📖 The stacked names signal full authority

## 🌅 Called The Earth From The Rising Of The Sun

This phrase means from east to west, the whole earth.

"Rising of the sun" points to the east, where the sun appears each morning.

"Going down thereof" points to the west, where the sun sets.

Naming two opposite directions was a Hebrew way of meaning everywhere in between.

God summons every person on earth, not only Israel.

🌅 Rising of the sun means the east

🌇 Going down means the west

🌍 Together the phrase means everywhere on earth

📖 God summons everyone, not only Israel

## 🏔️ Out Of Zion, The Perfection Of Beauty

"Zion" is the mountain in Jerusalem where God's presence dwelt among Israel.

Calling it "the perfection of beauty" honors it as the most glorious place on earth.

This judgment scene begins from God's own house.

It is not a foreign king invading from outside.

It is Israel's own God stepping out to speak.

🏔️ Zion is Jerusalem's holy mountain

✨ Perfection of beauty honors God's dwelling

🚪 Judgment begins from God's own house

📖 This is Israel's God, not an invader

## ✨ God Hath Shined

"Shined" describes a burst of visible glory, not ordinary sunlight.

The same word describes God's appearance to Moses on Mount Sinai.

A visible, shining glory was how ancient Israel recognized a true appearance of God.

This is not a quiet arrival.

✨ Shined means a visible burst of glory

🏔️ The same word describes Sinai's glory

👀 Israel recognized God through visible glory

📖 This arrival is anything but quiet

## 🤫 Shall Not Keep Silence

God is often described in scripture as patient and slow to act.

This verse marks the moment that patience turns to speech.

Silence never meant God was absent, only that He had not yet spoken in judgment.

The rest of the psalm describes exactly what that silence gives way to.

🤫 God is usually patient and slow to act

⏰ This verse marks the turning point

🔇 Silence meant waiting, not absence

📖 What follows breaks that silence completely

## 🔥 A Fire Shall Devour Before Him

Fire in scripture often marks the presence of a holy, dangerous God.

The same fire imagery appeared at Mount Sinai when God gave the law.

This fire does not warm anyone.

It consumes whatever cannot stand in God's presence.

🔥 Fire often marks God's holy presence

🏔️ The same fire appeared at Sinai

⚠️ Fire consumes what cannot stand near God

📖 This scene is a courtroom, not a visit

## 🌪️ Very Tempestuous Round About Him

"Tempestuous" means stormy, full of wind and violent weather.

Storm and fire together were the same two signs that marked God's appearance at Sinai.

Ancient readers would recognize this pairing immediately.

It signals a full appearance of God, not just a word from Him.

🌪️ Tempestuous means violent stormy weather

🏔️ Storm and fire both echo Sinai

👁️ Ancient readers would recognize this pairing

📖 God is appearing, not merely speaking

## 🌍 He Shall Call To The Heavens From Above, And To The Earth

This is the exact shape of an ancient covenant lawsuit.

A king who felt wronged by a broken treaty would call heaven and earth as legal witnesses.

Moses used this same pattern in Deuteronomy before Israel entered the land.

Calling both witnesses again means God is bringing a formal legal case.

⚖️ This matches an ancient covenant lawsuit

📜 Heaven and earth serve as legal witnesses

🔁 Moses used this pattern in Deuteronomy

📖 God is bringing a formal legal case

## 👥 That He May Judge His People

"His people" makes clear this judgment is aimed at Israel, not foreign nations.

This is not God punishing outsiders for their sin.

It is God calling His own covenant partner to account.

That distinction shapes everything said in the rest of the psalm.

👥 His people means Israel, not outsiders

🤝 God judges His own covenant partner

🔍 This judgment is internal, not foreign

📖 That shapes the whole rest of the psalm

## 🤝 Gather My Saints Together Unto Me

"Saints" translates a Hebrew word meaning those loyal to the covenant.

It does not mean morally perfect people.

It means people bound to God by a real agreement.

God is calling His covenant partners to appear before Him.

🤝 Saints means people loyal to the covenant

🚫 It does not mean morally perfect

📜 It means bound by a real agreement

📖 God calls His covenant partners to appear

## 🩸 Made A Covenant With Me By Sacrifice

This recalls the moment Israel's covenant with God was first sealed.

In Exodus, Moses splashed sacrificial blood on the people to confirm the agreement.

A covenant sealed with blood was treated as unbreakable in the ancient world.

God is reminding His people exactly what they agreed to.

🩸 Blood once sealed Israel's covenant

📜 Exodus records the original ceremony

🔒 Blood covenants were treated as unbreakable

📖 God reminds them what they agreed to

## 📢 The Heavens Shall Declare His Righteousness

The witnesses summoned back in verse four now speak.

Heaven testifies that God's judgment is fair, not cruel or arbitrary.

An outside witness backs up the judge's own claim.

This detail heads off any charge that the verdict is unjust.

📢 Heaven now speaks as a witness

⚖️ It confirms the judgment is fair

🙅 This heads off a charge of injustice

📖 An outside witness backs the judge

## 🎵 Selah

"Selah" appears often in the Psalms, and its exact meaning is still debated.

Many scholars believe it marked a musical pause or a change in instruments.

It invites the reader to stop and sit with what was just said.

Here it falls right after the whole courtroom scene is set.

🎵 Selah likely marked a musical pause

❓ Its exact meaning is still debated

🛑 It invites a pause to reflect

📖 It lands right after the courtroom is set

# Psalms 50:7-9
# 🐂 Not About The Sacrifices
---
## 🔄 Hear, O My People, And I Will Speak

God's tone shifts from summoning outside witnesses to speaking directly to Israel.

The courtroom no longer faces outward.

It now faces God's own covenant partner.

This direct address makes the message personal, not a general warning to the world.

🔄 The tone shifts to direct address

🎯 The courtroom now faces Israel itself

🗣️ God speaks personally, not generally

📖 This message is aimed at His own people

## ⚖️ I Will Testify Against Thee

"Testify against" is legal language, the same phrase used for witnesses in a court case.

God is not merely scolding here.

He is formally bringing charges.

This word choice keeps the covenant lawsuit picture running through the whole psalm.

⚖️ Testify against is formal legal language

📜 God is bringing formal charges here

🔁 This keeps the lawsuit picture running

📖 This is a case, not a scolding

## 🙋 I Am God, Even Thy God

God repeats the word "God" but adds "thy," meaning your own God.

This reminds Israel that the relationship is personal, not distant.

The charge that follows comes from a God who already belongs to them by covenant.

🙋 Thy God means your own personal God

🤝 The relationship is personal, not distant

📜 The charge comes from within the covenant

📖 A close relationship makes the charge sharper

## 🚫 I Will Not Reprove Thee For Thy Sacrifices

God clarifies up front what the coming complaint is not about.

Israel had actually kept offering sacrifices, exactly as commanded.

The problem in this psalm is not a failure to perform rituals.

🚫 This is not about missing sacrifices

✅ Israel had kept offering them regularly

🎯 The real problem lies elsewhere

📖 Right ritual is not the issue here

## 🔥 Burnt Offerings, To Have Been Continually Before Me

A "burnt offering" was completely burned up on the altar.

Other offerings were partly eaten, but this one was not.

Burning the whole animal symbolized total devotion, nothing held back.

"Continually" shows Israel had stayed faithful in keeping this ritual.

🔥 A burnt offering was fully burned up

🙏 It symbolized complete devotion

📅 Continually shows real ritual faithfulness

📖 The ritual itself was not the failure

## 🐂 I Will Take No Bullock Out Of Thy House

God begins a string of statements about not needing anything from Israel.

A "bullock" is a young bull, one of the costlier animals used in sacrifice.

God is not short on food or resources that an offering could supply.

🐂 A bullock is a young bull

💰 It was an expensive sacrificial animal

🚫 God has no shortage to fill

📖 God is not a hungry deity

## 🐐 Nor He Goats Out Of Thy Folds

A "fold" is a fenced pen used to keep sheep and goats safe at night.

Pairing bullocks with goats covers the range of animals used in sacrifice.

God's point is not aimed at one offering.

It applies to sacrifice as a whole.

🐐 A fold is a fenced pen for animals

📋 Bullocks and goats cover the full range

🎯 The point applies to sacrifice in general

📖 No animal offering meets a real need

# Psalms 50:10-15
# 🌍 Everything Already Belongs To God
---
## 🌲 Every Beast Of The Forest Is Mine

God claims ownership over every wild animal, not only the domestic ones Israel raises.

This directly answers an old belief that gods needed to be fed by human worshippers.

Owning everything already means God has no need a sacrifice could fill.

🌲 God claims every forest animal

🍽️ Ancient gods were thought to need feeding

🙅 God rejects that entire assumption

📖 Total ownership means no real need

## 🔢 The Cattle Upon A Thousand Hills

"A thousand hills" is not a literal count.

It is a Hebrew way of saying an uncountable number.

The phrase paints a picture of endless, overflowing ownership.

Whatever Israel could offer already belonged to God before the offering was made.

🔢 A thousand hills means an uncountable number

🏞️ It pictures endless, overflowing ownership

🎁 The offering was already God's own property

📖 Nothing given to God was truly new

## 🐦 I Know All The Fowls Of The Mountains

God extends His ownership claim from land animals to birds as well.

Pairing "fowls" with "wild beasts" covers land and sky together.

This kind of pairing is a common Hebrew way of saying absolutely everything.

🐦 Fowls means birds of the mountains

🦌 Wild beasts covers the land animals

🌍 Together they mean absolutely everything

📖 Nothing in creation escapes God's ownership

## 😏 If I Were Hungry, I Would Not Tell Thee

This line is deliberately sarcastic, since God cannot actually feel hunger.

It mocks an old idea that gods depend on human offerings for food.

"The world is mine, and the fulness thereof" repeats the same ownership claim once more.

😏 This line is deliberately sarcastic

🍞 It mocks the idea that gods need food

🌍 The world and everything in it is His

📖 A real God has no hunger

## 🐂 Will I Eat The Flesh Of Bulls, Or Drink The Blood Of Goats

This is a direct jab at old religions where gods were pictured literally eating offerings.

The question expects an obvious answer, of course not.

By this point in the psalm, that old idea has been fully exposed as absurd.

🐂 Old religions pictured gods eating offerings

❓ This question expects an obvious no

🎯 The absurdity is now fully exposed

📖 The true God does not eat sacrifices

## 🙏 Offer Unto God Thanksgiving

After clearing away the wrong reason for sacrifice, God finally names what He wants.

"Thanksgiving" translates the Hebrew word todah, gratitude expressed out loud.

The whole shift moves from a transaction to a relationship.

🙏 Thanksgiving means gratitude spoken aloud

📜 The Hebrew word here is todah

🔄 The shift is from transaction to relationship

📖 God wants gratitude, not payment

## 🤝 Pay Thy Vows Unto The Most High

A "vow" was a promise made to God, often during a time of danger or need.

"Pay" means actually following through once the crisis had passed.

Many people make a promise to God in trouble.

They quietly forget it once life improves.

🤝 A vow was a promise made to God

💳 Pay means following through afterward

😬 Many forget vows once trouble passes

📖 Real worship keeps its promises

## 📞 Call Upon Me In The Day Of Trouble

God invites His people to depend on Him honestly during real hardship.

"Day of trouble" means any season of danger, loss, or crisis.

This invitation only makes sense inside a real relationship, not a ritual one.

📞 Call upon me means honest dependence

⛈️ Day of trouble means any real crisis

🤝 This invitation assumes a real relationship

📖 God wants to be trusted, not just paid

## 🛟 I Will Deliver Thee, And Thou Shalt Glorify Me

God promises rescue as a direct response to honest dependence.

"Glorify me" means the natural response after being helped, giving credit where it belongs.

This is the exact exchange God actually wants.

It means trust followed by honest praise.

🛟 God promises rescue when called upon

🙌 Glorify means giving credit afterward

🔁 Trust and praise complete the exchange

📖 This is the worship God actually wants

# Psalms 50:16-21
# 🗣️ Words For The Wicked
---
## 🔄 Unto The Wicked God Saith

The psalm now shifts to address a second group entirely.

"The wicked" here does not mean outsiders.

It means hypocrites within Israel's own covenant community.

The tone changes sharply from the patient explanation given to faithful worshippers.

🔄 The audience shifts to a new group

👥 The wicked means hypocrites within Israel

😠 The tone changes sharply here

📖 Not every worshipper hears the same words

## 📜 What Hast Thou To Do To Declare My Statutes

"Statutes" means God's laws, the specific rules given at Sinai.

"Declare" means reciting or teaching them out loud to others.

God's question exposes a gap between speaking His law and actually living by it.

📜 Statutes means the laws given at Sinai

🗣️ Declare means reciting them out loud

⚠️ A gap exists between speaking and living

📖 Quoting the law is not keeping it

## 👄 Take My Covenant In Thy Mouth

This means reciting the covenant's words without honoring them in daily life.

The mouth speaks the covenant while the rest of life ignores it.

This is the same hypocrisy religious leaders would later be warned about throughout scripture.

👄 The mouth speaks the covenant's words

🚫 Daily life ignores those same words

🔁 This hypocrisy repeats throughout scripture

📖 Words alone do not honor a covenant

## 📚 Seeing Thou Hatest Instruction

"Instruction" translates the Hebrew word musar, meaning correction or discipline.

Hating instruction means refusing correction rather than simply lacking knowledge.

This is a much sharper charge than ignorance.

📚 Instruction here means correction or discipline

🚫 Hating it means refusing correction

⚠️ This charge is sharper than ignorance

📖 The real problem is a hardened heart

## 🗑️ Casteth My Words Behind Thee

This is an old idiom for tossing something aside as worthless.

Throwing words "behind" someone meant deliberately putting them out of sight and out of mind.

The picture is active rejection, not simple forgetting.

🗑️ Casteth behind means tossing aside

👀 It means putting something out of sight

🙅 This is active rejection, not forgetting

📖 God's words were deliberately ignored

## 👀 When Thou Sawest A Thief, Then Thou Consentedst With Him

"Consentedst" means giving silent approval, not necessarily joining a crime directly.

Watching a thief and staying quiet still counted as taking his side.

Silence in the face of wrongdoing is treated here as its own kind of guilt.

👀 Consentedst means giving silent approval

🤐 Silence still counted as taking sides

⚠️ Watching wrong and staying quiet is guilt

📖 Approval does not require direct action

## 💔 Partaker With Adulterers

"Partaker" means sharing in something, taking part alongside someone else.

This names a second sin, sexual unfaithfulness, alongside the earlier charge of theft.

Both charges show a pattern of tolerating serious sin rather than confronting it.

💔 Partaker means sharing in something

⚠️ Adultery is the second sin named

🔁 Both show a pattern of tolerating sin

📖 Looking away is its own participation

## 🛠️ Thy Mouth To Evil, And Thy Tongue Frameth Deceit

"Frameth" means to construct or build something on purpose.

Deceit here is planned and built carefully, not an accidental slip.

The mouth that claimed to recite God's covenant in verse sixteen now builds lies instead.

🛠️ Frameth means building something on purpose

🤥 Deceit here is planned, not accidental

🔁 The same mouth once quoted the covenant

📖 Speech reveals what the heart is doing

## 🪑 Thou Sittest And Speakest Against Thy Brother

"Sittest" pictures a settled, comfortable gossip session, not a heated argument.

"Brother" means a fellow Israelite, bound to this person by covenant and family.

Slandering a covenant brother was treated as a real betrayal, not idle talk.

🪑 Sittest pictures a relaxed gossip session

👨 Brother means a fellow covenant Israelite

💔 Slander here is a real betrayal

📖 Comfortable talk still does real damage

## 👪 Slanderest Thine Own Mother's Son

This phrase repeats "brother" a second way for emphasis.

Repeating the same idea twice in one verse is a common feature of Hebrew poetry.

The closeness of the relationship makes this betrayal even worse.

👪 Mother's son repeats brother for emphasis

🔁 Hebrew poetry often repeats an idea twice

💔 Closeness makes the betrayal worse

📖 Family ties did not stop the slander

## 🤫 I Kept Silence, Thou Thoughtest That I Was Altogether Such An One As Thyself

God's patience had been mistaken for approval or even indifference.

This person assumed God either did not notice or did not care.

Believing God is just like us is a very old and very human mistake.

🤫 God's patience got mistaken for approval

😶 They assumed God did not notice

🪞 They imagined God was just like them

📖 That assumption is an old human mistake

## ⚖️ I Will Reprove Thee, And Set Them In Order Before Thine Eyes

"Set them in order" is courtroom language for laying out evidence clearly.

Nothing here is vague or based on rumor.

Every charge gets displayed plainly.

The silence from earlier in the verse is now over completely.

⚖️ Set in order means laying out evidence

📋 Every charge is displayed plainly

🔚 God's earlier silence is now over

📖 God's patience was never proof of innocence

# Psalms 50:22-23
# 🦁 Forget God, Or Glorify Him
---
## 🧠 Consider This, Ye That Forget God

"Forget God" does not mean literal amnesia about His existence.

It means living day to day as though He is not watching or does not matter.

This is the root problem named across the whole second half of the psalm.

🧠 Forget God means living as if absent

👀 It is not literal amnesia about God

🌱 This is the psalm's root problem

📖 Practical neglect is still real rejection

## 🦁 Lest I Tear You In Pieces, And There Be None To Deliver

This pictures a lion tearing apart its prey, a common image of judgment.

"None to deliver" means no rescue will come once this judgment falls.

The warning is deliberately severe.

It is meant to break through comfortable indifference.

🦁 The image pictures a lion's judgment

🚫 None to deliver means no rescue comes

⚠️ The warning is meant to be severe

📖 Indifference toward God carries real danger

## 🙌 Whoso Offereth Praise Glorifieth Me

This verse answers the question the whole psalm opened with.

What does God actually want?

"Praise" here means the same grateful worship named back in verse fourteen.

Real worship was never about the size of an offering.

🙌 This verse answers the psalm's opening question

🔁 Praise echoes the thanksgiving from verse fourteen

💰 Worship was never about offering size

📖 Gratitude, not payment, honors God

## 🚶 To Him That Ordereth His Conversation Aright

"Conversation" in this old sense means a person's whole conduct, not just talking.

"Ordereth aright" means arranging that conduct to match God's covenant faithfully.

The psalm closes by pairing right worship with a rightly lived life.

🚶 Conversation here means conduct, not talking

📐 Ordereth aright means living faithfully

🔗 Right worship pairs with a right life

📖 God's salvation meets a life lived well
`.trim();

export const PSALMS_FIFTY_PERSONAL_SECTIONS = parsePsalmsFiftyRawNotes(PSALMS_FIFTY_RAW_NOTES);
