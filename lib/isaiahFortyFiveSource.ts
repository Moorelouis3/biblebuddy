export type IsaiahFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyFiveRawNotes(rawText: string): IsaiahFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 45:${startVerse}` : `Isaiah 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 45 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_FIVE_RAW_NOTES = `# Isaiah 45:1-3
# 👑 Cyrus, God's Anointed Conqueror
---
## 👑 To His Anointed, To Cyrus

"Anointed" is the same word used later for Israel's kings and ultimately for a coming Messiah.

Here God applies that word to Cyrus, a Persian king who did not worship Him.

Cyrus is named by name more than a hundred years before his own birth.

No other ancient prophecy names a future ruler this far in advance.

👑 Anointed usually marks a king or priest
🌍 Cyrus was a pagan Persian ruler
📅 He is named long before he was born
📖 No rival prophecy predicts a name like this

## 🔓 I Will Loose The Loins Of Kings

"Loins" refers to the waist, where a warrior tied his belt and weapons.

To loose someone's loins meant to weaken and disarm them before battle.

This pictures God stripping the strength and readiness of Cyrus's enemies.

Kings who felt secure will suddenly find themselves unable to resist.

🔓 Loins means the waist and belt area
⚔️ A tied belt held a warrior's weapons
😮 Loosed loins means stripped of strength
📖 God disarms Cyrus's enemies in advance

## 🚪 The Two Leaved Gates

Double gates like this guarded the entrances of a heavily fortified city.

Babylon was famous for massive bronze gates built along the Euphrates River.

Ancient historians record that the city's gates were left open the night Cyrus entered.

A locked gate could have stopped an army for months, but this one stood open.

🚪 Double gates guarded a fortified city
🏙️ Babylon's gates were famous and massive
📜 Historians say the gates stood open that night
📖 God cleared the one obstacle that mattered

## 🛣️ Make The Crooked Places Straight

This borrows the picture of clearing a road ahead of a traveling king.

Workers would level bumps and straighten curves before a ruler traveled through.

Applied here, it means God removes every obstacle standing between Cyrus and victory.

Nothing in Cyrus's path will slow down what God has already decided.

🛣️ Pictures a road cleared for a king
🧑‍🔧 Workers leveled roads before rulers traveled
🚧 God removes every obstacle in the way
📖 Nothing slows what God has already decided

## 🔨 Cut In Sunder The Bars Of Iron

"Sunder" means to split apart or break completely into pieces.

Massive iron bars reinforced the great gates of a city like Babylon.

Under normal conditions those bars alone could stop an invading army cold.

God promises to break even the strongest physical defenses without a fight.

🔨 Sunder means split apart completely
⚙️ Iron bars reinforced Babylon's gates
🛡️ Those bars alone could stop an army
📖 God breaks strong defenses without a fight

## 💰 Treasures Of Darkness, And Hidden Riches Of Secret Places

Babylon was one of the wealthiest cities in the entire ancient world.

Kings often hid their most valuable treasure in underground vaults and sealed rooms.

"Darkness" here simply describes treasure stored away from daylight and out of sight.

God promises Cyrus will find even the wealth no one else could locate.

💰 Babylon held enormous ancient wealth
🕳️ Treasure was often hidden underground
🌑 Darkness means hidden from daylight
📖 Cyrus finds wealth no one else could

# Isaiah 45:4-7
# 🌍 None Else Beside Me
---
## 🙋 For Jacob My Servant's Sake

God's reason for raising up Cyrus was Israel, not Cyrus himself.

Jacob and Israel here are two names for the same covenant people.

Cyrus becomes the tool, but Israel remains the whole point of the plan.

Even a world power like Persia serves a hidden purpose.

🙋 Jacob and Israel name the same people
🎯 Israel is the reason, not Cyrus
🛠️ Cyrus becomes a tool for that plan
📖 Even empires serve a hidden purpose

## 🤝 I Have Surnamed Thee, Though Thou Hast Not Known Me

A surname here means giving someone a title or identity, not a family name.

Cyrus worshipped Persian gods and had no relationship with Israel's God.

God still gave him a role and a title before Cyrus ever knew who assigned it.

Being useful to God's plan never required Cyrus to believe in Him first.

🤝 Surname means a given title or role
🛐 Cyrus worshipped other Persian gods
🎁 God assigned this before Cyrus knew Him
📖 Usefulness never required belief first

## 🕊️ I Am The LORD, And There Is None Else

This exact claim repeats within just a few verses here.

Repetition in Hebrew poetry signals the most important point in the passage.

No competing god gets named or credited with any part of this plan.

The sheer repetition itself becomes part of the argument.

🕊️ This claim repeats nearby again
📢 Repetition marks the most important point
🚫 No other god gets credited here
📖 Repetition itself becomes the argument

## 🚫 There Is No God Beside Me

This adds a second, even stronger claim right next to the first one.

Not just first in rank, but the only one that actually exists at all.

Ancient peoples usually pictured many gods sharing different jobs and regions.

This verse rules out every one of them at once.

🚫 A stronger claim than first in rank
🥇 Only one God exists at all
🗺️ Ancient peoples pictured many regional gods
📖 This verse rules out every rival

## 💪 I Girded Thee, Though Thou Hast Not Known Me

To gird someone means to tie a belt or sash around their waist.

Ancient soldiers girded themselves before marching out to battle.

This pictures God personally equipping Cyrus for the conquest ahead of him.

The same unknowing king from before is strengthened again here.

💪 Girded means tying on a battle belt
⚔️ Soldiers girded themselves before marching out
🛠️ God personally equipped Cyrus for battle
📖 An unknowing king is strengthened anyway

## 🌅 From The Rising Of The Sun, And From The West

This is a merism, a figure of speech naming two extremes to mean everything between them.

East and west here simply means every direction, every nation, everywhere on earth.

The point of using Cyrus is not private. It is meant to be seen worldwide.

God wants this demonstration recognized far beyond Israel's own borders.

🌅 East and west names two extremes
🌍 Together they mean everywhere on earth
👀 This is meant to be seen worldwide
📖 Recognition reaches past Israel's own borders

## 🌗 I Form The Light, And Create Darkness

Persian religion at this time often taught two rival gods, one of light and one of darkness.

This verse directly denies that kind of split power struggle in the heavens.

The true God claims both light and darkness as His own creation.

Cyrus's own culture is corrected here even while Cyrus is being used by God.

🌗 Persian belief often split light and dark
👑 God claims both as His own creation
🛐 Cyrus's own culture is corrected here
📖 One God rules light and darkness alike

## ⚖️ I Make Peace, And Create Evil

"Evil" here means disaster or calamity, not moral wrongdoing or sin.

God is claiming authority over judgment and hardship, not authorship of sin itself.

This answers any assumption that hardship proves a rival dark power is in control.

Both blessing and calamity fall under the same God's authority.

⚖️ Evil here means disaster, not sin
👑 God claims authority over judgment too
🚫 No rival power causes hardship instead
📖 Blessing and calamity share one authority

# Isaiah 45:8-10
# 🌧️ Woe To Him Who Argues With His Maker
---
## 🌧️ Drop Down, Ye Heavens, From Above

This is poetry, calling on the sky itself to pour something down.

Rain in a dry land pictured blessing that could not be forced or manufactured.

Here the heavens are told to rain down righteousness instead of water.

This verse has been sung for centuries as a longing for God to send help.

🌧️ Heavens are called to pour something down
💧 Rain pictured blessing beyond human control
⚖️ Righteousness replaces water in this picture
📖 This verse became a centuries old prayer

## 🌍 Let The Earth Open, And Let Them Bring Forth Salvation

This continues the rain picture with the earth acting like a womb.

Just as rain makes seeds sprout, the earth here is pictured producing salvation itself.

The image combines rain from above with growth from below into one movement.

Blessing here is not passive. It is described as actively growing upward.

🌍 Earth pictured like a womb
🌱 Rain makes seeds sprout and grow
🔄 Above and below move together here
📖 Blessing is described as actively growing

## ⚠️ Woe Unto Him That Striveth With His Maker

"Woe" is a strong warning, not a mild complaint or suggestion.

"Striveth" means to argue, fight, or contend against someone directly.

This warns anyone tempted to argue with God about how He runs His plan.

The target of this warning becomes clear in the next line.

⚠️ Woe is a strong warning
🥊 Striveth means arguing or fighting
🙅 This warns against arguing with God
📖 The target becomes clear next

## 🏺 Let The Potsherd Strive With The Potsherds Of The Earth

A potsherd is a broken piece of old, discarded pottery.

The image pictures one broken clay fragment arguing with another broken clay fragment.

Neither piece has any authority, voice, or standing to argue about anything.

The absurdity is the entire point of the comparison.

🏺 Potsherd means a broken clay piece
🗣️ Pictures one broken piece arguing with another
🚫 Neither piece has any real authority
📖 The comparison is meant to sound absurd

## 🏺 Shall The Clay Say To Him That Fashioneth It

"Fashioneth" means shapes or forms, the same word used for a potter at work.

A potter shapes wet clay into whatever form he chooses on the wheel.

The clay itself has no say in what shape it becomes.

Israel is the clay here, and Cyrus's role is part of that shaping.

🏺 Fashioneth means shapes or forms
🧑‍🎨 A potter shapes clay on a wheel
🤐 Clay has no say in its shape
📖 Cyrus is part of that larger shaping

## 👨‍👩‍👧 Woe Unto Him That Saith Unto His Father, What Begettest Thou

"Begettest" is an old word for fathering or bringing a child into the world.

This repeats the same warning using a family picture instead of a pottery one.

A child does not get to question or redesign the parents who gave it life.

Both pictures make the same point. A creation cannot correct its creator.

👨‍👩‍👧 Begettest means fathering a child
🔁 Repeats the warning with a family image
🙅 A child cannot redesign its own parents
📖 A creation cannot correct its creator

# Isaiah 45:11-13
# 🙌 Ask Me Of Things To Come
---
## ✨ The Holy One Of Israel, And His Maker

This stacks two titles together, holy and maker, judge and creator.

"Holy One of Israel" is one of Isaiah's favorite titles for God, used often in this book.

Pairing it with maker ties God's holiness directly to His work as creator.

The one who made everything is also the one set apart from everything.

✨ Two titles stacked here, holy and maker
📚 Isaiah uses Holy One often in this book
🔗 Holiness and creating are tied together
📖 God is set apart from all He made

## 🙌 Ask Me Of Things To Come Concerning My Sons

This is an invitation, not a rebuke like the warning just given.

Honest questions about the future are different from arguing with the potter.

God welcomes real questions from His own people about what He is doing.

The difference is not the question. It is the posture behind it.

🙌 This is an invitation, not a rebuke
❓ Honest questions differ from arguing
👂 God welcomes real questions from His people
📖 Posture matters more than the question

## 🌌 I Have Made The Earth, And Created Man Upon It

This answers the invitation to ask by giving credentials first.

Before revealing what comes next, God restates what He has already done.

Creation itself becomes the proof backing up every future promise.

A God who made the earth can be trusted to shape what comes after it.

🌌 Credentials come before the promise
🏗️ God restates what He already did
🧾 Creation is the proof behind the promise
📖 The maker of earth can be trusted

## ⭐ All Their Host Have I Commanded

"Host" here refers to the stars and heavenly bodies, often called an army.

Many ancient peoples worshipped the sun, moon, and stars as gods themselves.

This verse places every star firmly under God's own command instead.

Nothing in the sky operates outside the authority of its maker.

⭐ Host means the stars and heavens
🛐 Many ancient peoples worshipped the stars
👑 Stars are placed under God's command
📖 Nothing in the sky outranks its maker

## 🏗️ I Have Raised Him Up In Righteousness

"Him" returns to Cyrus, picking the thread back up from the chapter's opening.

Raising up a ruler in righteousness means God stands behind Cyrus's specific rise to power.

This is not random history. It is described as a deliberate act.

The same God who made the stars also raised up this one king.

🏗️ Him returns to Cyrus again
👑 God stands behind Cyrus's rise
🎯 This is described as deliberate, not random
📖 The star maker also raised this king

## 💰 Not For Price Nor Reward

This detail becomes historically remarkable once Cyrus's actual policies are known.

Cyrus later freed conquered peoples and let exiles return home without demanding payment.

An ancient record known as the Cyrus Cylinder describes this kind of policy in his own words.

A conqueror who could have demanded a fortune chose to let captives go free.

💰 Cyrus asked no payment for this
🏛️ He later freed conquered peoples for free
📜 The Cyrus Cylinder records this kind of policy
📖 A conqueror chose to free captives instead

# Isaiah 45:14-17
# 🌍 Nations Bow, Israel Is Saved
---
## 🏺 The Labour Of Egypt, And Merchandise Of Ethiopia

"Labour" and "merchandise" here mean the wealth and goods a nation produces through work.

Egypt and Ethiopia were both major powers with well known wealth in this period.

This pictures the riches of great nations eventually flowing toward Israel instead of away.

The direction of tribute gets completely reversed from how Israel usually experienced it.

🏺 Labour and merchandise mean produced wealth
🏛️ Egypt and Ethiopia were major powers
🔄 Wealth flows toward Israel instead of away
📖 The usual direction of tribute reverses

## ⛓️ In Chains They Shall Come Over

This pictures foreign peoples arriving as captives or humbled petitioners, not as conquerors.

The chains symbolize submission rather than punishment for a crime.

Coming over describes crossing a border to reach Israel directly.

The scene reverses the usual picture of Israel being led away in chains.

⛓️ Chains picture submission, not punishment
🚶 Coming over means crossing to Israel
🔄 This reverses Israel's usual experience
📖 Israel is no longer the captive here

## 🙇 They Shall Fall Down Unto Thee, They Shall Make Supplication

"Supplication" means a humble, pleading request, not a casual conversation.

Falling down was a physical posture of complete submission in this culture.

These once proud nations are pictured begging rather than commanding.

The reversal from the start of Isaiah's book to here could not be sharper.

🙇 Supplication means a humble plea
🧎 Falling down showed complete submission
👑 Proud nations are pictured begging instead
📖 The reversal across Isaiah is striking

## 🙋 Surely God Is In Thee

These foreign visitors reach the same conclusion Cyrus never fully states himself.

Their own eyes convince them of something Cyrus is simply used to accomplish.

Recognition here comes from watching God act, not from a sermon.

Evidence, not argument, becomes the whole basis of belief in this scene.

🙋 Foreign visitors reach this conclusion themselves
👀 Their own eyes convince them
🗣️ Recognition comes from watching, not preaching
📖 Evidence becomes the basis for belief

## 🌫️ Verily Thou Art A God That Hidest Thyself

"Hidest thyself" describes a God who works through hidden, unseen means.

Cyrus never receives a vision or a direct conversation with God in this account.

God's plan moves forward through ordinary political and military events instead.

Hiddenness does not mean absence. It means working through means people rarely notice.

🌫️ Hidest thyself means working unseen
👑 Cyrus never receives a direct vision
🏛️ God works through ordinary political events
📖 Hidden does not mean absent

## 😳 They Shall Be Ashamed, And Also Confounded, All Of Them

"Confounded" means thrown into confusion, unable to explain or defend themselves.

This describes everyone who trusted an idol once that idol's uselessness becomes obvious.

Shame here is not embarrassment over manners. It is exposure of a wasted trust.

Every maker of idols shares in this same public exposure.

😳 Confounded means thrown into confusion
🗿 This describes idol worshippers exposed
💔 Shame here means wasted trust exposed
📖 Every idol maker shares this exposure

## ♾️ Israel Shall Be Saved In The LORD With An Everlasting Salvation

"Everlasting" means without an ending, unlike the temporary shame just described.

The contrast between the idol worshippers and Israel could not be sharper in this verse.

Idol worship ends in exposure, but trust in the LORD ends in lasting rescue.

Two very different endings sit side by side in the same passage.

♾️ Everlasting means without an ending
⚖️ Contrasted directly with the shame before it
🔀 Idol worship and true trust end differently
📖 Two different endings sit side by side

## 🛡️ Ye Shall Not Be Ashamed Nor Confounded World Without End

"World without end" is an old way of saying forever, without any limit of time.

This repeats the everlasting promise from the line before it, just worded differently.

Repetition again signals how important this specific point is to the passage.

The nation that trusted rightly never faces the ending idol worshippers face.

🛡️ World without end means forever
🔁 This repeats the promise just given
📢 Repetition signals real importance
📖 Right trust never faces that ending

# Isaiah 45:18-19
# 🌏 Formed To Be Inhabited
---
## 🌏 God Himself That Formed The Earth And Made It

This repeats language from Genesis and earlier in Isaiah about God's creating work.

Two different words appear here for the same act, created and formed.

Stacking both words emphasizes how total and complete this act of creation was.

Nothing about the earth's existence happened by accident or by another power.

🌏 Repeats Genesis style creation language
🔤 Created and formed appear together
📏 Stacking both words shows completeness
📖 Nothing about earth happened by accident

## 🏡 He Created It Not In Vain, He Formed It To Be Inhabited

"In vain" means empty or purposeless, without any real point.

This directly answers Genesis, where the earth began without form and void.

God did not leave His work unfinished or pointless. He built it to be lived in.

Every part of creation carries a purpose, down to the earth itself.

🏡 In vain means empty or pointless
🔗 This answers Genesis directly
🛠️ God built it to be lived in
📖 Every part of creation carries purpose

## 🗣️ I Have Not Spoken In Secret, In A Dark Place Of The Earth

Many ancient oracles were given inside dark caves, temples, or hidden chambers.

Pagan priests often kept their predictions vague, private, and hard to verify.

God's promises through Isaiah were spoken publicly and preserved in writing for anyone to check.

Openness itself becomes part of the proof that this word can be trusted.

🗣️ Pagan oracles were often given in secret
🏛️ Priests kept predictions vague and private
📜 God's words were public and written down
📖 Openness becomes part of the proof

## 🔍 I Said Not Unto The Seed Of Jacob, Seek Ye Me In Vain

"Seek me in vain" would mean searching for God and finding nothing real.

This is a promise that sincere searching for God is never a wasted effort.

The contrast is aimed directly at idols, which never offered anything real to find.

God is reachable in a way no idol has ever been.

🔍 Seek in vain means searching for nothing
🙏 Sincere searching is never wasted here
🗿 Idols never offered anything real
📖 God is reachable, unlike any idol

# Isaiah 45:20-22
# 🌐 Look Unto Me, All The Earth
---
## ⚖️ Assemble Yourselves And Come, Draw Near Together

This restarts the courtroom scene used earlier in Isaiah, in chapters forty one, forty three, and forty four.

God calls the surviving nations together one more time for a final hearing.

Survivors of conquered nations are specifically summoned, not just onlookers.

The verdict about to be given applies to everyone listening.

⚖️ Restarts the earlier courtroom scenes
📢 Survivors are called for one final hearing
👥 Survivors, not just onlookers, are summoned
📖 The verdict applies to everyone listening

## 🏃 Ye That Are Escaped Of The Nations

"Escaped" here points to survivors of nations already judged or conquered.

These are not the powerful anymore. They are people who barely got out alive.

Even survivors with little status get personally invited to hear this message.

No one is too insignificant to be called to this hearing.

🏃 Escaped means survivors of judgment
📉 These are not the powerful anymore
🎟️ Even the least are personally invited
📖 No one is too small to be called

## 🪵 They Have No Knowledge That Set Up The Wood Of Their Graven Image

This mocks idol worshippers one final time before the chapter's closing appeal.

Carrying around a piece of carved wood and calling it a god required real ignorance.

The word knowledge here means basic, obvious understanding, not deep education.

Even simple awareness should have exposed a worshipped block of wood.

🪵 One final mock of idol worship
🤷 Carrying wood as a god shows real ignorance
🧠 Knowledge here means basic, obvious understanding
📖 Simple awareness should expose a wooden god

## 📜 Who Hath Declared This From Ancient Time

This question returns to the recurring challenge running through Isaiah forty through forty eight.

No idol or false god has ever correctly predicted major future events in advance.

God alone has a track record of naming things before they happen.

The challenge remains completely unanswered by anyone except this one God.

📜 The recurring challenge across these chapters
🔮 No idol ever predicted the future correctly
🏆 God alone has this track record
📖 The challenge stays unanswered by any rival

## ⚖️ A Just God And A Saviour

This pairs two ideas that might seem opposite, strict justice and merciful rescue.

Most ancient gods were pictured as one or the other, never really both together.

Here justice and salvation belong to the very same character at once.

This pairing becomes central to how the New Testament later describes God's own plan.

⚖️ Pairs justice and rescue together
🎭 Most gods were pictured as only one
🤝 Both belong to the same character here
📖 This pairing becomes central later in scripture

## 🌐 Look Unto Me, And Be Ye Saved, All The Ends Of The Earth

This is one of the clearest invitations to every nation found anywhere in the Old Testament.

Salvation here is not limited to Israel alone. It reaches to the ends of the earth.

The look required is simple, a turn of attention and trust, not a complicated ritual.

This verse becomes a foundation for later promises that salvation would reach every nation.

🌐 A clear invitation to every nation
🌍 Salvation reaches beyond Israel alone
👀 Look means a simple turn of trust
📖 This becomes a foundation for every nation

# Isaiah 45:23-25
# 🙇 Every Knee Shall Bow
---
## 🤚 I Have Sworn By Myself

Normally someone swears an oath by something greater than themselves.

Since nothing is greater than God, He swears by His own name instead.

This is the strongest possible guarantee available in this culture.

An oath like this cannot be broken or taken back.

🤚 Normally an oath invokes something greater
👑 Nothing is greater than God to swear by
🔒 This is the strongest possible guarantee
📖 An oath like this cannot be broken

## 📤 The Word Is Gone Out Of My Mouth In Righteousness, And Shall Not Return

This pictures a spoken word as something sent out that cannot be recalled.

Isaiah later compares God's word to rain and snow that always accomplish their purpose.

Once spoken with this kind of promise, a divine word cannot fail or fall short.

The certainty rests on God's own character, not on circumstances changing later.

📤 A word sent out that cannot return
🌧️ Isaiah later compares this to rain and snow
✅ A word like this cannot fail
📖 Certainty rests on God's character

## 🦵 Every Knee Shall Bow, Every Tongue Shall Swear

Bowing the knee and swearing with the tongue both picture total, public submission.

This exact phrase gets quoted centuries later in the New Testament about Jesus.

Paul applies this same language to describe every person eventually acknowledging Christ.

A promise first spoken about God's uniqueness later gets connected directly to Jesus.

🦵 Bowing and swearing picture total submission
📚 The New Testament later quotes this exact line
✝️ Paul applies it to Jesus directly
➡️ God's uniqueness gets connected to Christ

## 💪 In The LORD Have I Righteousness And Strength

This is spoken as if by the nations who just witnessed God's power.

Righteousness and strength are not something a person builds on their own here.

Both are described as gifts received from the LORD, not personal achievements.

The proper response to God's greatness is dependence, not self reliance.

💪 Spoken by nations witnessing God's power
🎁 Righteousness and strength are gifts here
🙅 Neither is a personal achievement
📖 The response is dependence, not self reliance

## 😠 All That Are Incensed Against Him Shall Be Ashamed

"Incensed" means filled with intense anger, more than simple annoyance.

This names anyone who stays angrily opposed to God despite all the evidence given.

Their anger does not protect them from eventually facing the same shame as the idol worshippers.

Opposition, no matter how furious, does not change the outcome described here.

😠 Incensed means filled with intense anger
🙅 This names those who stay angrily opposed
💔 Their anger leads to the same shame
📖 Furious opposition does not change the outcome

## 👑 In The LORD Shall All The Seed Of Israel Be Justified, And Shall Glory

"Justified" is a legal word meaning declared right or acquitted in a court setting.

"Seed of Israel" means the whole covenant people, not just a few individuals.

The chapter that opened with a pagan king named Cyrus closes with Israel's own standing before God.

Empire, courtroom, and covenant all land on the same final point.

👑 Justified means declared right in court
🌾 Seed of Israel means the whole people
🔄 The chapter closes on Israel's own standing
📖 Empire, courtroom, and covenant all converge here`.trim();

export const ISAIAH_FORTY_FIVE_PERSONAL_SECTIONS = parseIsaiahFortyFiveRawNotes(ISAIAH_FORTY_FIVE_RAW_NOTES);
