export type PsalmsOneHundredSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredSixRawNotes(rawText: string): PsalmsOneHundredSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+106:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 106 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+106:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+106:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 106 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 106,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 106:${startVerse}` : `Psalms 106:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Psalms 106 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_SIX_RAW_NOTES = `# Psalms 106:1-3
# 🙌 Praise Opens The Psalm
---
## 🙌 Praise Ye The LORD

"Praise ye the LORD" translates one single Hebrew word, Hallelujah.

Psalms one hundred four and one hundred five already closed and opened using this same word.

Psalms one hundred six picks up that same shout without any pause.

The command to praise comes before any reason for it is even given.

🙌 Hallelujah means praise the LORD

🔁 It repeats the last two psalms

📚 These psalms form a connected group

📖 Praise leads before the reasons follow

## 💛 For He Is Good

"Good" here is not a mild compliment about one kind act.

It describes God's whole character, not a single moment of kindness.

Everything the rest of the psalm will describe rests on this one claim.

A God who was not truly good could not be trusted with a history this messy.

💛 Good describes his whole character

🏛️ Not just one kind action

⚓ Everything else rests on this claim

➡️ Trust starts with trusting his goodness

## 💞 His Mercy Endureth For Ever

"Mercy" translates a Hebrew word for loyal, covenant love.

It is not a passing feeling that could fade with time or mood.

"For ever" means this love was never given an expiration date.

The rest of the psalm will test that claim against a very messy history.

💞 Mercy means loyal covenant love

🔒 Never given an expiration date

📜 The psalm will test this claim

📖 Love that outlasts a messy history

## 📢 Who Can Shew Forth All His Praise

This is a rhetorical question, not a request for an actual number.

It means God's praise is too vast for any single person to finish declaring.

Pairing it with "who can utter the mighty acts" doubles the same idea for emphasis.

Some things about God are simply too large to summarize completely.

📢 A rhetorical question, not a request

♾️ Too vast for one person to finish

🔁 Paired with the line just before it

📖 Some things are too large to summarize

## ⚖️ Blessed Are They That Keep Judgment

"Judgment" here does not mean a courtroom verdict.

It means living by what God has already declared to be right.

"Keep" pictures someone guarding that standard carefully, not casually agreeing with it.

Blessing here is tied to steady obedience, not to a single good moment.

⚖️ Judgment means God's standard of right

🛡️ Keep means guard it carefully

🔁 Blessing ties to steady obedience

➡️ One good moment is not enough

## 🌍 He That Doeth Righteousness At All Times

Righteousness shown once is easy for almost anyone to manage.

"At all times" is the far harder standard set here.

This line quietly sets up the rest of the psalm as a contrast.

The history that follows will show exactly how hard "at all times" really is.

🌍 Righteousness once is easy

⏱️ At all times is the harder standard

⚔️ It sets up the contrast ahead

📖 The history to come tests this standard

# Psalms 106:4-5
# 🙏 A Personal Plea Inside A National Psalm
---
## 🙋 Remember Me, O LORD

This is not a fear that God has actually forgotten the writer.

"Remember" here means something closer to "include me," not "recall a lost fact."

The writer wants to personally share in the same favor shown to the whole nation.

A big, national psalm suddenly turns intensely personal for one line.

🙋 Remember means include me, not recall

🤝 He wants to share the nation's favor

🔀 A national psalm turns personal here

➡️ One request sits inside a whole history

## 😊 That I May See The Good Of Thy Chosen

"The good" here means the real, visible blessings promised to God's people.

The writer is not asking for something abstract or purely spiritual.

He wants an actual, tangible share in what God is doing for the nation.

Faith here still hopes for something concrete, not just a good feeling.

😊 The good means real, visible blessing

🙋 Not something abstract or vague

🎁 He wants a tangible share

📖 Faith still hopes for something concrete

## 🎉 That I May Glory With Thine Inheritance

"Thine inheritance" refers to Israel, the people God claimed as his own possession.

To "glory with" them means celebrating fully alongside the whole community.

The writer does not want blessing set apart from everyone else.

Real joy here means being counted inside the group, not standing off to the side.

🎉 Inheritance means Israel as God's own

🤗 Glory with means celebrating together

🚫 Not blessing set apart alone

📖 Joy means belonging with everyone else

# Psalms 106:6-12
# 🌊 Confession And The Red Sea
---
## 😔 We Have Sinned With Our Fathers

The writer does not distance himself from his ancestors' failures.

"With our fathers" ties his own generation directly to the sins of the past.

Hebrew thought often treated a nation as one continuous body across generations.

Confessing someone else's sin as your own is rare and honest.

😔 He joins his ancestors' guilt

👪 A nation seen as one body

🙌 This kind of confession is rare

➡️ Honesty starts with owning shared failure

## 🚫 Committed Iniquity, And Done Wickedly

"Iniquity" means a twisted or crooked action, not just a small mistake.

Stacking three words, sinned, iniquity, wickedly, is a Hebrew way of naming the full weight of the failure.

No single word could carry how deep the problem actually was.

This opening confession sets the tone for the whole history that follows.

🚫 Iniquity means a crooked action

🔺 Three words stack for full weight

📏 No single word was enough

📖 This confession sets the psalm's tone

## 🌊 Provoked Him At The Sea, Even At The Red Sea

This points back to Exodus fourteen, at the edge of the Red Sea.

Pharaoh's army was closing in fast, and the people panicked instead of trusting God.

They openly accused Moses of leading them out only to die in the wilderness.

That moment of panic happened before the sea had even parted.

🌊 Points back to Exodus fourteen

🏇 Pharaoh's army was closing in

😱 They panicked instead of trusting

📖 Fear came before the sea even parted

## 🙌 He Saved Them For His Name's Sake

God did not rescue them because they deserved it.

Their panic in the verse just before makes that painfully clear.

"For his name's sake" means God acted to protect his own reputation and character.

The rescue was never really about how good Israel had been.

🙌 God rescued them, not their merit

😬 Their panic just proved this

🏷️ His name means his own character

📖 Rescue was never about their record

## 🗣️ He Rebuked The Red Sea Also

"Rebuked" pictures God speaking to the sea the way a person might command an animal.

The same word describes Jesus later calming a storm with a word in the Gospels.

The sea obeyed instantly and dried into a walkable path.

Nature itself answers directly to God's voice.

🗣️ Rebuked means commanded like an animal

⛵ The same word appears in the Gospels

🏜️ The sea dried into a path

📖 Nature answers to God's voice

## 🛡️ Saved Them From The Hand Of Him That Hated Them

"Him that hated them" points to Pharaoh and the pursuing Egyptian army.

Hatred here was not a personal grudge but a nation determined to destroy them completely.

"Redeemed" pictures a costly rescue, like buying someone out of slavery.

This rescue was total, covering both the threat itself and its hold on them.

🛡️ Points to Pharaoh's pursuing army

⚔️ Hatred meant planned destruction

💰 Redeemed pictures a costly rescue

📖 The rescue was total, not partial

## 💥 There Was Not One Of Them Left

"Them" here refers to the pursuing Egyptian army, not to Israel.

Exodus fourteen describes the walls of water collapsing back over every chariot and rider.

This was not a partial retreat or a narrow escape for Egypt.

The threat that had terrified Israel only verses earlier was completely gone.

🌊 Them refers to Pharaoh's army

💥 The walls of water collapsed completely

🚫 Not a partial retreat for Egypt

📖 The whole threat was gone

## 🎶 Then Believed They His Words

For one shining moment, the people finally trusted God completely.

They sang praise right after watching the sea close over their enemies.

The very next verse in this psalm already starts undoing that trust.

Belief born only from a miracle rarely lasts very long on its own.

🎶 A brief moment of full trust

🙌 They sang right after the miracle

⏳ The next verse undoes it

➡️ Miracle faith rarely lasts alone

# Psalms 106:13-15
# 😩 They Soon Forgot
---
## 😩 They Soon Forgat His Works

"Soon" is the key word in this line.

The praise from the last section did not even last through one chapter.

"Waited not for his counsel" means they stopped asking God what to do next.

Impatience, not disbelief, was the first crack in their trust.

😩 Soon shows how quickly trust faded

⏳ Praise barely lasted a chapter

🤐 They stopped asking for guidance

📖 Impatience cracked their trust first

## 🍖 Lusted Exceedingly, And Tempted God

This recalls Numbers eleven, when the people complained loudly about having no meat to eat.

"Lusted" here means an intense, demanding craving, not simple hunger.

"Tempted God" means they tested whether he would actually provide it.

Craving something is not sin by itself, but testing God to prove himself is.

🍖 Recalls the meat craving in Numbers

😤 Lusted means an intense demand

🎯 Tempted means testing God to prove himself

📖 Craving is not sin, testing is

## 💀 He Sent Leanness Into Their Soul

"Leanness" pictures a body wasting away, thin and drained of strength.

Numbers eleven describes a plague striking the camp right after the meat arrived.

God gave them exactly what they demanded, and it cost them dearly.

Getting what you begged for is not always the same as being blessed.

💀 Leanness means a wasted, drained body

🍗 The meat arrived just before the plague

⚠️ They got what they demanded

📖 A granted wish is not a blessing

# Psalms 106:16-18
# 🔥 Envy And Judgment In The Camp
---
## 😠 They Envied Moses Also In The Camp

This points to Numbers sixteen, when Korah, Dathan, and Abiram challenged Moses and Aaron.

They claimed the whole community was equally holy, so no one deserved special authority.

"The saint of the LORD" is a title of honor given here to Aaron.

Envy dressed itself up as a complaint about fairness.

😠 Points to Korah's rebellion

🗣️ They claimed everyone was equally holy

🏅 Saint of the LORD honors Aaron

📖 Envy hid behind a fairness complaint

## 🌍 The Earth Opened And Swallowed Up Dathan

Numbers sixteen describes the ground splitting open directly beneath the rebels' tents.

Dathan and Abiram, along with their households, dropped alive into the opening.

This was not a natural disaster that happened to strike at a convenient time.

The judgment was specific, immediate, and impossible to explain away.

🌍 The ground split beneath their tents

👪 Dathan and Abiram fell with their households

🚫 Not a random natural disaster

📖 The judgment was immediate and specific

## 🔥 The Flame Burned Up The Wicked

Numbers sixteen also describes fire consuming two hundred fifty men who joined the rebellion.

They had been offering incense, a duty reserved only for God's chosen priests.

Two different judgments, the earth and the fire, struck the same rebellion at once.

Taking a role God had not given was treated as a very serious offense.

🔥 Fire consumed two hundred fifty rebels

🕯️ They performed a priest only duty

⚡ Two judgments struck one rebellion

📖 Taking God's role was a serious offense

# Psalms 106:19-23
# 🐂 The Golden Calf And Moses' Stand
---
## 🐂 They Made A Calf In Horeb

Horeb is another name for Mount Sinai, the very place God had just given the law.

"Molten image" means an idol made by melting metal and pouring it into a shape.

Exodus thirty two tells the full story of Aaron building this calf from gathered jewelry.

The idol was built while Moses was still on the mountain receiving God's commands.

🐂 Horeb is another name for Sinai

🔥 Molten means melted and poured metal

📜 Exodus thirty two tells the full story

📖 Built while Moses was still on the mountain

## 🌱 Changed Their Glory Into An Ox That Eateth Grass

"Their glory" here means the true, living God they were meant to worship.

They traded that glory for a statue of an animal that eats grass in a field.

The comparison is meant to sound as foolish as it actually was.

Worship aimed at the wrong thing always shrinks the object being worshipped.

🌱 Their glory meant the living God

🐄 Traded for a grass eating statue

😳 The comparison sounds foolish on purpose

📖 Wrong worship always shrinks its object

## 😔 They Forgat God Their Saviour

"Saviour" recalls everything already described earlier in this psalm, the plagues and the parted sea.

Forgetting him this quickly meant forgetting an incredibly recent and personal rescue.

This was not yet a distant story passed down through generations.

The very people who walked through the sea built an idol only weeks later.

😔 Saviour recalls the earlier rescue

⏳ The rescue was still recent

🚫 Not yet a distant old story

📖 They forgot weeks after walking through the sea

## 🏺 Wondrous Works In The Land Of Ham

"Ham" was one of Noah's sons, and Egypt was later named for his descendants.

This same poetic title for Egypt already appeared in Psalm one hundred five.

"Wondrous works" points back to the plagues described in that companion psalm.

These two psalms clearly were written to be read as a matched pair.

🏺 Ham was one of Noah's sons

🗺️ A poetic name already used for Egypt

⚡ Wondrous works points to the plagues

📖 These two psalms form a matched pair

## 🛡️ Moses His Chosen Stood Before Him In The Breach

A "breach" is a gap broken open in a wall during an attack.

Standing in the breach pictures a defender blocking that gap with his own body.

Exodus thirty two describes Moses pleading directly with God to spare the people.

One man's intercession stood between the whole nation and total destruction.

🛡️ Breach means a broken gap in a wall

🧍 Standing there means blocking it bodily

🙏 Moses pleaded for the nation directly

📖 One man's prayer stood between them and ruin

# Psalms 106:24-27
# 🚫 Despising The Promised Land
---
## 🗺️ They Despised The Pleasant Land

This recalls Numbers thirteen and fourteen, when twelve spies scouted Canaan.

Ten of them came back afraid, focused on giants instead of God's promise.

"Despised" means they treated a gift from God as if it were worthless.

Fear had convinced them the promise was not worth trusting.

🗺️ Recalls the twelve spies in Numbers

😨 Ten focused on giants, not God

🚫 Despised means treated as worthless

📖 Fear made the promise feel untrustworthy

## 🏕️ Murmured In Their Tents

"Murmured" describes quiet, ongoing complaining rather than one loud outburst.

This happened privately inside their own tents, not in a single public protest.

Grumbling in private can still count as open rebellion against God.

Hidden complaints reveal the same doubt as spoken ones.

🏕️ Murmured means private, ongoing complaint

🤫 It happened inside their own tents

⚠️ Private grumbling still counts as rebellion

📖 Hidden doubt is still doubt

## ✋ He Lifted Up His Hand Against Them

Lifting up a hand here is an old gesture used when making a solemn oath.

Numbers fourteen records God swearing that whole generation would die in the wilderness.

This was not a passing threat spoken in anger.

It was a formal, binding decision.

✋ Lifting a hand meant a solemn oath

📜 Numbers fourteen records this promise

🚫 Not a passing angry threat

📖 It was formal and binding

## 🌍 To Scatter Them In The Lands

This line reaches far beyond the wilderness generation being discussed here.

It looks ahead to Israel's later exile among foreign nations, centuries afterward.

One generation's unbelief cast a shadow reaching much further than their own lifetime.

The consequences of that moment outlived everyone who was actually there.

🌍 Points ahead to a later exile

⏳ Centuries beyond the wilderness generation

🔗 One generation's unbelief reached far

📖 Consequences outlived everyone present

# Psalms 106:28-31
# ⚔️ Baalpeor And Phinehas' Zeal
---
## 🗿 They Joined Themselves Unto Baalpeor

Baalpeor was a Moabite god worshipped through sexual rituals and idol feasts.

Numbers twenty five describes Israelite men joining these rituals with Moabite women.

"Sacrifices of the dead" likely refers to offerings made to lifeless idols, not living gods.

This was not a small compromise but a direct switch in loyalty.

🗿 Baalpeor was a Moabite idol

👥 Israelite men joined in Numbers

💀 Sacrifices of the dead means lifeless idols

📖 This was a direct switch in loyalty

## ⚡ The Plague Brake In Upon Them

Numbers twenty five describes a plague that killed thousands of Israelites.

The judgment struck quickly, right in the middle of the idol worship itself.

This was one of the deadliest single judgments in the wilderness years.

Sin here had an immediate and visible cost.

⚡ A plague killed thousands in Numbers

🎯 It struck during the idolatry itself

💥 One of the deadliest judgments recorded

📖 Sin here had a visible cost

## 🗡️ Then Stood Up Phinehas, And Executed Judgment

Phinehas was Aaron's grandson, a priest zealous for God's honor.

Numbers twenty five describes him stopping the plague by confronting one couple publicly.

His action was decisive and immediate, not a slow committee decision.

One man's bold obedience stopped a disaster already in motion.

🗡️ Phinehas was Aaron's zealous grandson

🎯 He confronted the sin publicly

⚡ His action was immediate, not slow

📖 One man's obedience stopped the plague

## 🏅 Counted Unto Him For Righteousness

This exact phrase, counted for righteousness, also describes Abraham's faith in Genesis fifteen.

Phinehas is honored here in the same terms usually reserved for Abraham's trust in God.

"For evermore" means this honor was never meant to be temporary.

Zeal for God's honor, acted on at real risk, earned lasting recognition.

🏅 Same phrase used for Abraham's faith

🤝 Phinehas is honored like Abraham

⏳ For evermore means lasting, not temporary

📖 Bold zeal earned lasting recognition

# Psalms 106:32-33
# 💧 The Waters Of Strife
---
## 💧 The Waters Of Strife

This points to Numbers twenty, at a place called Meribah, meaning strife or quarrel.

The people complained bitterly again about having no water in the wilderness.

God told Moses to speak to a rock so water would come out.

Their complaint became the setting for one of Moses' own biggest mistakes.

💧 Meribah means strife or quarrel

😤 The people complained about no water

🪨 God told Moses to speak to a rock

📖 Their complaint led to Moses' own mistake

## 😠 He Spake Unadvisedly With His Lips

"Unadvisedly" means speaking rashly, without thinking first.

Numbers twenty describes Moses striking the rock in anger instead of simply speaking to it.

That single moment of frustration cost Moses entry into the promised land.

Even a lifelong leader was held to the exact instruction he was given.

😠 Unadvisedly means speaking rashly

🪨 Moses struck the rock instead of speaking

🚫 It cost him entry to the land

📖 Even leaders answer to exact instructions

# Psalms 106:34-39
# 🗿 Idols In The Promised Land
---
## 🚫 They Did Not Destroy The Nations

This command in Joshua and Deuteronomy was never about random cruelty.

It was meant to remove nations whose idol worship would corrupt Israel's faith over time.

Israel disobeyed and allowed many of these nations to stay in the land.

That single decision opens the door to everything described in the rest of this section.

🚫 The command aimed to protect faith

🗺️ Not random cruelty toward nations

⚠️ Israel disobeyed and let them stay

📖 That choice opens this whole section

## 🤝 Were Mingled Among The Heathen

"Mingled" means blending in closely, through marriage and daily life.

Deuteronomy had specifically warned against this kind of close mixing.

Slow blending in is often more dangerous than an obvious, sudden attack.

Israel's faith did not collapse overnight, it eroded gradually.

🤝 Mingled means blending through daily life

📜 Deuteronomy warned against this mixing

🐌 Slow erosion, not sudden collapse

📖 Faith eroded gradually, not all at once

## 🕸️ Their Idols Were A Snare Unto Them

A "snare" is a trap designed to catch an animal without it noticing.

Idol worship here worked the same way, drawing people in gradually.

What looked like harmless cultural mixing became a spiritual trap.

By the time the danger was obvious, many were already caught.

🕸️ Snare means a hidden trap

🐾 It catches without the animal noticing

🎭 Cultural mixing became the bait

📖 Many were caught before noticing danger

## 💔 Sacrificed Their Sons And Their Daughters Unto Devils

This describes child sacrifice, one of the most horrifying practices in the ancient Near East.

Canaanite worship of gods like Molech sometimes involved burning children as offerings.

"Devils" here names what these idols actually were behind the religious language.

Losing sight of the true God led to losing even basic love for their own children.

💔 Describes real child sacrifice

🔥 Canaanite worship of gods like Molech

👹 Devils names what the idols really were

📖 Losing God cost even love for children

## 🩸 The Land Was Polluted With Blood

"Polluted" pictures the land itself as stained and unclean because of this bloodshed.

Leviticus had already warned that this kind of sin could defile the ground Israel lived on.

This was not viewed as a private family matter.

The whole nation's relationship with the land was affected by it.

🩸 Polluted means stained by bloodshed

📜 Leviticus warned the land could be defiled

🌍 Not treated as a private matter

📖 The whole nation's land was affected

## 🎭 Went A Whoring With Their Own Inventions

"Whoring" here is a common Old Testament picture for spiritual unfaithfulness to God.

It compares worshipping other gods to breaking a marriage covenant.

"Inventions" points out these gods were entirely man made, not real beings.

Israel chased gods that existed only because people had built them.

🎭 Whoring pictures spiritual unfaithfulness

💍 Compared to breaking a marriage covenant

🔨 Inventions means man made gods

📖 They chased gods people had built

# Psalms 106:40-43
# 🔁 The Cycle Of Anger And Deliverance
---
## 🔥 He Abhorred His Own Inheritance

"Abhorred" means to feel strong disgust, a shockingly strong word for God to use about his own people.

"His own inheritance" repeats the same title used earlier, back in verse five.

The same people once celebrated now provoke that level of reaction from God.

Persistent sin can turn a relationship of love into real grief.

🔥 Abhorred means strong disgust

🔁 Inheritance repeats the earlier title

😔 The same people now provoke this

📖 Persistent sin can turn love into grief

## ⛓️ Gave Them Into The Hand Of The Heathen

This describes the repeating pattern found throughout the book of Judges.

God allowed hostile nations to rule over Israel as a direct consequence of their sin.

"They that hated them" points to real, specific oppressors named later in Judges.

Judgment here was not random, it was allowing the natural result of rejecting God.

⛓️ Matches the pattern in Judges

👑 Hostile nations ruled as a consequence

🎯 Named oppressors appear later in Judges

📖 Judgment was the natural result of rejection

## 🔁 Many Times Did He Deliver Them

"Many times" is the key phrase in this whole section.

The book of Judges shows this cycle repeating again and again, not just once.

Israel sins, is oppressed, cries out, and is rescued, then the pattern repeats.

God's patience through that repeated cycle says as much as any single rescue does.

🔁 Many times is the key phrase

📚 Judges shows this cycle repeatedly

↩️ Sin, oppression, rescue, then repeat

📖 Patience through repetition speaks loudly

# Psalms 106:44-46
# ❤️ Mercy Remembered
---
## 👂 He Regarded Their Affliction, When He Heard Their Cry

"Regarded" means God paid close, personal attention to their suffering.

Nothing in the previous verses suggested Israel had suddenly earned this attention.

Their cry, not their record, is what moved God to respond.

Mercy here answers pain directly, without waiting for a perfect apology first.

👂 Regarded means close, personal attention

🚫 Not earned by a sudden good record

😢 Their cry moved God to respond

📖 Mercy answers pain, not perfection

## 🤝 He Remembered For Them His Covenant

"Remembered" here does not mean God had genuinely forgotten, the same way verse four used the word earlier.

It means God chose to act based on his covenant promise.

That promise, not Israel's track record, is what actually held the relationship together.

A promise kept by one side alone can still hold a whole relationship up.

🤝 Remembered means chose to act

📜 Based on covenant, not Israel's record

⚓ The promise held the relationship up

📖 One side's faithfulness can carry a relationship

## 😢 To Be Pitied Of All Those That Carried Them Captives

This describes a surprising softening in the attitude of Israel's own captors.

Even people with no loyalty to Israel's God began to show them pity.

That kind of shift in an enemy's heart does not happen by accident.

God's mercy reached Israel even through the compassion of people who once hated them.

😢 Even captors began to show pity

🌍 People with no loyalty to their God

🎯 This shift did not happen by accident

📖 Mercy came even through former enemies

# Psalms 106:47-48
# 📖 The Closing Prayer And Doxology
---
## 🙏 Gather Us From Among The Heathen

This verse suggests the psalm was written during or shortly before Israel's actual exile.

"Gather us" is a direct prayer asking God to reverse the scattering described earlier in the psalm.

The purpose named here is not comfort alone but the chance to give thanks properly again.

A whole national history of failure ends with an honest request for a fresh start.

🙏 Suggests the psalm was written near exile

🔄 Gather reverses the earlier scattering

🙌 The goal is giving thanks again

📖 Failure ends with a request for renewal

## 🙌 Blessed Be The LORD God Of Israel, Amen

This exact line closes what scholars call Book Four of the Psalms, one of five sections in the whole book.

"From everlasting to everlasting" answers back to the mercy described as enduring for ever in verse one.

"Let all the people say, Amen" turns a private prayer into something the whole community affirms together.

The psalm ends the way it began, with the whole people praising the LORD.

🙌 Closes Book Four of the Psalms

🔁 Answers the mercy from verse one

🗣️ Amen makes it the whole people's prayer

📖 It ends the way it began, in praise
`.trim();

export const PSALMS_ONE_HUNDRED_SIX_PERSONAL_SECTIONS = parsePsalmsOneHundredSixRawNotes(PSALMS_ONE_HUNDRED_SIX_RAW_NOTES);
