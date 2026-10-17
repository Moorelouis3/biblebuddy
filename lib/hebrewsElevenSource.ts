export type HebrewsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsElevenRawNotes(rawText: string): HebrewsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 11:${startVerse}` : `Hebrews 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Hebrews 11 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_ELEVEN_RAW_NOTES = `# Hebrews 11:1-3
# 🔭 The Substance Of Things Hoped For
---
## 🔭 The Substance Of Things Hoped For

"Substance" means something solid and real, not a feeling or a wish.

Faith is not pretending something is true.

It is holding something unseen with the same confidence as something you can touch.

The writer has just finished warning about drawing back.

Now he defines the exact opposite of drawing back.

🔭 Substance means something solid and real
🤝 Faith holds the unseen with confidence
↩️ This answers the warning just before it
📖 Faith is not pretending, it is trusting

## 👁️ The Evidence Of Things Not Seen

"Evidence" means proof that convinces, not a guess.

A court accepts evidence it cannot physically hold, like a witness account, and still calls it proof.

Faith works the same way toward what God has said.

The believer has not seen heaven, but trusts the testimony that it is real.

👁️ Evidence means convincing proof
⚖️ Courts accept unseen testimony as proof
🙏 Faith trusts what God has said
📖 Not seeing something does not make it false

## 📜 The Elders Obtained A Good Report

"Elders" here means the Old Testament believers who came before, not church leaders.

"A good report" means God himself testified that their faith pleased him.

This single line is the hinge for the entire chapter.

Every name coming next is one of these elders.

📜 Elders means Old Testament believers
🗣️ A good report means God approved of them
🚪 This line opens the whole chapter
➡️ Every name ahead belongs to this group

## 🌌 The Worlds Were Framed By The Word Of God

"Framed" means built, the way a builder frames a house before anything else is added.

God did not shape the universe out of material that already existed.

He spoke it into being out of nothing at all.

Believing that takes faith, since no human watched it happen.

🌌 Framed means built from nothing
🗣️ God spoke the universe into existence
👀 No human witnessed creation happen
📖 Believing it requires faith, not sight

# Hebrews 11:4-6
# 🐑 Abel, Enoch, And Pleasing God
---
## 🐑 A More Excellent Sacrifice Than Cain

Abel brought an offering from his flock.

Cain brought an offering from his crops.

Genesis never says God rejected grain itself.

It does say he had regard for Abel and his offering, not Cain's.

Many scholars believe the difference was the posture behind each gift, not the type of produce.

Abel offered in trusting faith, and Cain did not.

🐑 Abel offered from his flock
🌾 Cain offered from his crops
❤️ God regarded the giver, not just the gift
📖 Faith shaped Abel's offering

## 🗣️ He Being Dead Yet Speaketh

Abel died thousands of years before this letter was written.

Yet his story still speaks to every reader of Genesis.

His faith became a permanent testimony, repeated long after his own voice went silent.

A life of real faith outlasts the person who lived it.

🗣️ Abel's voice is long silent
📖 His story still gets read today
⏳ Faith outlasts the person who had it
➡️ A life of faith keeps teaching after death

## 🚶 Enoch Was Translated That He Should Not See Death

"Translated" means taken from one place to another, here from earth straight to God's presence.

Genesis says simply that Enoch walked with God, and then he was not, for God took him.

He is one of only two people in the Bible who never died a normal death.

That kind of ending only happens to someone already walking closely with God.

🚶 Translated means taken directly to God
📖 Genesis says God simply took him
🙌 Only one other person shares this ending
➡️ Closeness with God preceded this ending

## 🙏 Without Faith It Is Impossible To Please Him

This is the flattest statement in the whole chapter.

No sacrifice, no effort, and no good behavior can substitute for trusting God.

Faith is not one path among several that pleases God.

It is the only one.

🙏 No substitute exists for faith
🚫 Effort alone cannot please God
🎯 Faith alone is the only path
📖 This verse states the point directly

## 🔍 A Rewarder Of Them That Diligently Seek Him

"Diligently" means persistent and active, not a casual glance toward God now and then.

Faith requires believing two things at once, that God exists, and that God responds to those who pursue him.

Both halves matter.

Believing God exists without seeking him is not the faith this verse describes.

🔍 Diligently means persistent seeking
🙌 Faith believes God exists and responds
✋ Both halves are required together
📖 Casual belief is not what this verse means

# Hebrews 11:7
# 🚢 Noah's Ark Built On A Warning
---
## ☔ Warned Of God Of Things Not Seen As Yet

No flood like this had ever happened before Noah's lifetime.

He built a massive ark on dry ground for a storm nobody around him could imagine.

Faith acted on God's word before there was any visible reason to.

That is the same pattern the chapter opened with in verse one.

☔ No flood like it had happened before
🚢 Noah built for an unseen storm
🔭 Faith acted before any visible sign
📖 This repeats the pattern from verse one

## ⚖️ He Condemned The World

Noah never preached a single recorded sermon in the account.

His obedience alone was the indictment.

Building the ark for decades said louder than words that everyone else was wrong to ignore God.

A faithful life can expose unbelief just by existing.

⚖️ Noah's obedience itself was the indictment
🔨 Decades of building said what words could not
👥 Everyone else was shown to be ignoring God
➡️ A faithful life exposes unbelief by existing

## 🌈 Heir Of The Righteousness Which Is By Faith

"Heir" means someone who receives something they did not earn themselves.

Noah was not declared righteous because he built well.

He was declared righteous because he trusted God, and the ark was simply what that trust looked like in action.

The reward followed the faith, not the carpentry.

🌈 Heir means receiving what was not earned
🚫 Good building did not earn righteousness
🙏 Trusting God earned it
📖 The reward followed the faith, not the work

# Hebrews 11:8-10
# 🧭 Abraham Went Out Not Knowing Whither
---
## 🧭 Not Knowing Whither He Went

Abraham lived in Ur of the Chaldees, a settled and prosperous city.

God told him to leave for a land he would only name after Abraham was already walking.

He obeyed an address he did not have yet.

Faith often means moving before the destination is fully explained.

🧭 Abraham left a settled, prosperous city
📍 God withheld the destination until he moved
👣 He obeyed an address he did not have
📖 Faith sometimes moves before the plan is clear

## ⛺ Sojourned In The Land Of Promise, As In A Strange Country

"Sojourned" means living somewhere as a temporary resident, not an owner.

Abraham reached the very land God promised him, and still never owned a permanent plot inside it.

He lived in his own inheritance like a visitor.

That tension did not shake his trust in the promise.

⛺ Sojourned means living as a temporary resident
🗺️ Abraham never owned land in his own promise
🤔 He lived there like a visitor
📖 The tension never shook his trust

## 🏕️ Dwelling In Tabernacles With Isaac And Jacob

"Tabernacles" here simply means tents, not the later worship structure.

Three generations in a row lived the same nomadic life inside the same unfulfilled promise.

Isaac and Jacob inherited the waiting as much as they inherited the promise itself.

None of them ever saw it completed in their own lifetime.

🏕️ Tabernacles here means ordinary tents
👨‍👨‍👦 Three generations lived the same nomadic life
⏳ They inherited the waiting, not just the promise
📖 None of them saw it finished

## 🏙️ Looked For A City Which Hath Foundations

Tents have no foundations, they can be packed up and moved overnight.

Abraham's real hope was never a patch of ground in Canaan.

He was looking past the tents toward a permanent city God himself designed and built.

A temporary life in tents pointed to a permanent home still ahead.

🏙️ Tents have no foundations at all
🗺️ Canaan was never Abraham's real target
🏗️ God designed a permanent city instead
📖 Tents now pointed to a permanent home later

# Hebrews 11:11-12
# 👵 Sara's Strength To Conceive
---
## 👵 Sara Herself Received Strength To Conceive Seed

Sarah was far past the age when childbearing was physically possible.

Genesis even records her laughing privately at the idea.

Yet the strength to conceive came as a gift, not from her own body.

It was tied directly to her trust that God would keep his word.

Her own laughter did not disqualify her faith.

👵 Sarah was far past childbearing age
😄 Genesis records her laughing at the idea
🎁 The strength came as a gift from God
📖 Her doubt did not cancel her faith

## 💀 Him As Good As Dead

This phrase describes Abraham's body, worn out and unable to father a child in the natural course of things.

Both parents were, by every physical measure, finished.

God's promise did not wait for better biology.

It overruled it.

💀 As good as dead describes Abraham's body
🧬 Both parents were physically finished
🚫 The promise did not wait for better biology
📖 God's word overruled the natural limit

## ⭐ As The Stars Of The Sky In Multitude

God had told Abraham his descendants would outnumber the stars and the sand on a shore.

That promise came from one aging couple with no children yet.

Centuries later, an entire nation traced its existence back to that single impossible promise kept.

Faith believed the ending before the middle ever started.

⭐ God promised descendants beyond counting
👴 The promise started with one childless couple
🌍 A whole nation eventually traced back to it
📖 Faith believed the ending before the middle

# Hebrews 11:13-16
# 🏕️ Strangers And Pilgrims On The Earth
---
## ⏳ These All Died In Faith, Not Having Received The Promises

Every person named so far died without seeing the full promise completed in their own lifetime.

They saw it only from a distance, the way a traveler sees a mountain long before reaching it.

Dying without the full reward did not mean their faith had failed.

It meant the reward was simply larger than one lifetime could hold.

⏳ None of them saw the promise completed
🏔️ They saw it only from a distance
🚫 An unfinished promise is not a failed faith
📖 The reward was bigger than one lifetime

## 🚶 Strangers And Pilgrims On The Earth

"Strangers" means people who do not belong to the place they are living in.

"Pilgrims" means travelers passing through on the way to somewhere else.

Both words describe people who never tried to make earth their permanent home.

That identity shaped how they lived every single day.

🚶 Strangers means not belonging to this place
🧳 Pilgrims means travelers passing through
🏠 Earth was never meant to be their home
📖 That identity shaped their daily life

## 🏙️ They Seek A Country

Anyone can say they miss home.

The real proof is whether their life points toward it.

These believers kept living, deciding, and sacrificing as people aimed at somewhere they had not yet reached.

Their direction, not just their words, gave away where their hope was set.

🗣️ Anyone can claim to miss home
🧭 Their daily direction proved it instead
🎯 Decisions revealed where their hope was set
📖 Faith shows up in direction, not just words

## 🏛️ God Is Not Ashamed To Be Called Their God

Normally a king would be embarrassed to be publicly tied to poor, homeless wanderers.

God does the opposite here.

He claims these tent dwelling strangers as his own without hesitation, and even prepares them a city.

Earthly status never determined who God was proud to call his people.

🏛️ A king would avoid homeless wanderers
🙌 God claims them as his own instead
🏗️ He even prepares them a city
📖 Status never decided who God was proud of

# Hebrews 11:17-19
# 🔪 Abraham Offered Up Isaac
---
## 🧪 When He Was Tried, Offered Up Isaac

"Tried" means tested, not accused of wrongdoing.

Genesis twenty two records God asking Abraham to offer up the very son the promise depended on.

This was not God tempting Abraham to sin.

It was God proving, out loud, what kind of trust was already inside him.

🧪 Tried means tested, not accused
📖 Genesis 22 records this exact test
🚫 This was not a temptation to sin
➡️ It revealed the trust already inside him

## 👶 His Only Begotten Son

Abraham also had Ishmael, born earlier through Hagar.

"Only begotten" here does not mean his only child by birth.

It means Isaac alone was the son of the promise, the one every future blessing was tied to.

Offering him meant risking the entire future God had spoken over Abraham's life.

👶 Abraham also had a son named Ishmael
🎯 Only begotten means the son of promise
🔗 Every future blessing ran through Isaac
📖 Abraham risked the whole promised future

## 🔗 In Isaac Shall Thy Seed Be Called

This phrase quotes God's own earlier promise directly back to Abraham.

The whole nation God had spoken of was meant to descend through this one specific son.

Sacrificing him looked, on the surface, like destroying the promise with his own hands.

Abraham trusted God's word more than he trusted what the situation looked like.

🔗 This quotes God's own earlier promise
🌳 A whole future nation ran through Isaac
🔨 The act looked like destroying the promise
📖 Abraham trusted God's word over appearances

## 🙏 Received Him In A Figure

"Figure" here means a symbol or a preview of something greater still to come.

Abraham reasoned God was able to raise Isaac even from death itself.

Isaac's return from that altar became a living picture of resurrection, pointing far ahead of Abraham's own story.

A single moment of trust became a preview of something larger than Abraham ever saw fully.

🙏 Figure means a symbol or preview
💭 Abraham trusted God could raise the dead
🖼️ Isaac's rescue pictured resurrection ahead
📖 One moment of trust previewed something larger

# Hebrews 11:20-22
# 👴 Isaac, Jacob, And Joseph At The End
---
## 🙏 Isaac Blessed Jacob And Esau Concerning Things To Come

Isaac was old and nearly blind when he spoke this blessing in Genesis twenty seven.

He spoke about a future he would never personally witness.

Trusting God with words spoken over someone else's unseen future is still an act of faith.

Isaac's faith looked forward through his sons, not just through his own remaining days.

🙏 Isaac was old and nearly blind
🔮 He blessed a future he would not see
👨‍👦 His faith looked forward through his sons
📖 Blessing an unseen future is still faith

## 🦯 Leaning Upon The Top Of His Staff

This small detail comes from Genesis forty seven, where an aged, weakened Jacob still bows in worship.

A staff was a simple walking aid, nothing dramatic or symbolic on its own.

The detail matters because even physical weakness did not stop Jacob's worship.

Faith did not require strength, only a will to honor God with whatever strength remained.

🦯 A staff was a simple walking aid
👴 Jacob was aged and physically weakened
🙇 He still bowed in worship anyway
📖 Faith needed a will, not physical strength

## ⚰️ Joseph, When He Died, Made Mention Of The Departing

Joseph had risen to the highest office in Egypt under Pharaoh himself.

Even from that position of power and comfort, he still believed Israel's future was outside Egypt, not inside it.

He gave specific instructions about his own bones, insisting they travel back to Canaan one day.

His dying words bet everything on a promise he would never live to see kept.

⚰️ Joseph held the highest office in Egypt
🏠 He still believed the future was outside Egypt
🦴 He gave instructions about his own bones
📖 His dying words bet on an unseen promise

# Hebrews 11:23-28
# 👶 Moses Chose Affliction Over Egypt
---
## 👶 Hid Three Months Of His Parents

Pharaoh had ordered every Hebrew infant son killed at birth.

Moses' parents defied a direct royal decree by hiding him for three months.

That decision alone, made before Moses could do anything himself, was already an act of faith on his parents' part.

Faith sometimes begins in someone else's decision before the person it protects can even understand it.

👶 Pharaoh had ordered Hebrew infants killed
🙈 His parents hid him in direct defiance
👨‍👩‍👦 Their decision alone was already faith
📖 Faith can begin in someone else's choice first

## ✨ Seeing He Was A Proper Child

"Proper" in this older English means beautiful or goodly, not well behaved.

Exodus notes Moses' appearance as part of why his parents risked hiding him.

The verse does not claim Moses earned rescue by looking a certain way.

It simply records the detail Exodus itself preserved about that moment.

✨ Proper means beautiful, not well behaved
👶 Exodus notes his appearance at the time
🚫 The verse does not claim he earned rescue
📖 It simply preserves the detail from Exodus

## 👑 Refused To Be Called The Son Of Pharaoh's Daughter

Moses grew up inside Pharaoh's own household with every royal privilege available to him.

As an adult, he chose to walk away from that identity entirely.

Refusing a title like that meant refusing the wealth, protection, and status that came attached to it.

Faith was willing to lose comfort rather than keep a false identity.

👑 Moses grew up with full royal privilege
🚶 As an adult he walked away from it
💸 The title carried wealth, protection, and status
📖 Faith chose a true identity over comfort

## ⚖️ Choosing Rather To Suffer Affliction With The People Of God

This was an active choice, not a situation Moses was forced into.

He had every comfort available and set it aside on purpose.

Siding with an enslaved, powerless people instead of Egypt's royal court was a real cost, not a symbolic gesture.

Faith counted belonging to God's people worth more than Egypt's comfort.

⚖️ This was an active choice, not forced
🏰 He had every comfort available to keep
⛓️ He sided with an enslaved people instead
📖 Belonging to God's people outweighed comfort

## 💰 Esteeming The Reproach Of Christ Greater Riches Than The Treasures In Egypt

"Reproach of Christ" means the shame and suffering tied to belonging to God's promised deliverer.

Egypt in this period controlled enormous wealth, some of the richest treasuries in the ancient world.

Moses weighed guaranteed Egyptian riches against future shame tied to God's promise, and chose the shame.

He treated an unseen future reward as more valuable than wealth he could already hold in his hands.

💰 Reproach of Christ means shame for his promise
🏺 Egypt held some of the richest treasuries
⚖️ Moses weighed riches against future shame
📖 He valued an unseen reward over held wealth

## 👁️ Seeing Him Who Is Invisible

Moses later fled Egypt after killing an Egyptian, not out of pure courage alone.

But this verse credits something deeper than fearlessness.

He acted as though he could see God clearly.

Yet God remained completely invisible to his physical eyes the whole time.

Faith treats an unseen God as more real than a visible, furious king.

👁️ God remained invisible to his physical eyes
😠 Moses still did not fear the king's wrath
🙏 He acted as though he saw God clearly
📖 Faith treats the unseen God as most real

## 🩸 Kept The Passover, And The Sprinkling Of Blood

The Passover required blood placed on doorposts so death would pass over that household.

Moses organized this for the entire nation based entirely on a command he had not personally verified by sight.

Trusting a specific, costly, unverifiable instruction for an entire nation's safety took enormous faith.

One obeyed instruction protected every firstborn son in Israel that night.

🩸 Blood on the doorposts turned death away
🗣️ Moses obeyed a command he could not verify
🌍 He trusted it for an entire nation
📖 One obeyed instruction protected every firstborn son

# Hebrews 11:29-31
# 🌊 The Red Sea, Jericho, And Rahab
---
## 🌊 Passed Through The Red Sea As By Dry Land

The sea did not calm down or lower slowly.

Exodus describes walls of water standing on either side while Israel walked across on dry ground.

Walking into that gap required trusting God's word more than trusting what their eyes could see holding back.

Faith moved forward into something that looked physically impossible.

🌊 Water stood like walls on either side
🏖️ Israel walked across on dry ground
👀 Their eyes saw an impossible sight
📖 Faith moved forward despite what they saw

## ☠️ The Egyptians Assaying To Do Were Drowned

"Assaying" means attempting, in this case attempting the exact same crossing.

Egypt's army saw Israel cross safely and tried to follow immediately after.

The same sea that protected one nation destroyed the other, because only one side crossed in faith.

Imitating an action is never the same as sharing the faith behind it.

☠️ Assaying means attempting the same crossing
🏃 Egypt's army followed right behind Israel
🌊 One sea protected Israel, drowned Egypt
📖 Copying an action is not faith

## 🧱 The Walls Of Jericho Fell Down

Israel's entire strategy was marching and shouting, not siege engines or battering rams.

By any normal military standard, that plan should have failed completely.

The walls collapsed only after seven days of obedience to an unusual, specific command.

Faith followed instructions that made no military sense and watched them work anyway.

🧱 No siege weapons were used at all
📯 The plan was only marching and shouting
🗓️ The walls fell after seven days
📖 Faith followed a plan that made no sense

## 🏳️ The Harlot Rahab Perished Not

"Harlot" is named plainly, without softening or hiding her past.

Rahab lived inside a doomed city under a death sentence that applied to every other resident.

She hid Israelite spies and trusted their God over her own king and people.

Her past did not disqualify the faith that saved her household.

🏳️ Harlot is stated plainly, not hidden
🏙️ She lived inside a condemned city
🤝 She trusted Israel's God over her own king
📖 Her past did not disqualify her faith

# Hebrews 11:32-34
# ⚔️ Judges, Kings, And Prophets Through Faith
---
## ⏱️ The Time Would Fail Me To Tell

The writer stops naming individual stories here on purpose.

He admits plainly that the full list of faithful believers is far too long to finish.

That admission is itself a kind of praise, since it means faith has never been rare among God's people.

The named list is only a sample, not the whole roll call.

⏱️ The writer stops the list on purpose
📜 He admits the full list is too long
🙌 A long list means faith was never rare
📖 These names are only a sample

## ⚔️ Gedeon, And Barak, And Samson, And Jephthae

These four names come from the book of Judges, a period of frequent national chaos and weak leadership.

Each led Israel into unlikely military victories using deeply flawed, ordinary men.

None of them were polished heroes by any normal measure.

Faith used imperfect people, not only impressive ones.

⚔️ All four names come from Judges
🌀 Judges was a period of national chaos
🙍 None were polished, impressive heroes
📖 Faith used imperfect, ordinary people

## 👑 David Also, And Samuel, And Of The Prophets

David was Israel's most famous king, Samuel anointed him, and the prophets spoke for God across centuries afterward.

Grouping them together spans kingship, priesthood, and prophecy in a single short phrase.

Every major category of Old Testament leadership gets folded into this one line.

Faith was not limited to a single kind of calling or office.

👑 David was Israel's most famous king
🕯️ Samuel anointed him as king
📢 The prophets spoke for God for centuries
📖 Faith crossed every kind of calling

## 🦁 Stopped The Mouths Of Lions

This line points toward Daniel, thrown into a den of lions for refusing to stop praying.

He survived a night surrounded by animals built to kill him.

The text does not need to name him directly for the original readers to recognize the story instantly.

Faith survived a danger with no natural explanation available.

🦁 This points to Daniel in the lions' den
🙏 He was punished for refusing to stop praying
🌙 He survived a night built to kill him
📖 Faith survived with no natural explanation

## 🔥 Quenched The Violence Of Fire

This line points toward Shadrach, Meshach, and Abednego, thrown into a furnace for refusing to worship an idol.

Daniel records that they walked out without even the smell of smoke on them.

The fire did not weaken or slow down.

It simply failed to touch the men who trusted God inside it.

🔥 This points to three men in the furnace
🚫 They refused to worship a false idol
👃 They came out without even smelling smoke
📖 Fire failed to touch their trust in God

# Hebrews 11:35-38
# ⛓️ Tortured, Not Accepting Deliverance
---
## 👩 Women Received Their Dead Raised To Life Again

This line recalls the widow of Zarephath and the Shunammite woman.

Both were given their dead sons back through Elijah and Elisha.

Both stories involve ordinary mothers, not kings or famous leaders.

Faith reached into the most painful kind of grief and reversed it.

God's power through these prophets touched personal loss, not only national events.

👩 This recalls two grieving mothers
📖 Elijah and Elisha returned their sons alive
💔 Faith reached into deep personal grief
➡️ God's power touched private loss, not just nations

## ⛓️ Tortured, Not Accepting Deliverance

Some of these believers could have escaped suffering by denying their faith.

They refused the easy way out on purpose.

"A better resurrection" means they valued what came after death more than relief available right now.

Faith sometimes chooses continued suffering over an offered shortcut.

⛓️ Denying their faith would have ended the suffering
🚫 They refused that easy way out
🌅 A better resurrection outweighed present relief
📖 Faith sometimes refuses an offered shortcut

## 🗡️ They Were Stoned, They Were Sawn Asunder

This list grows deliberately brutal and specific.

Jewish tradition remembers the prophet Isaiah as one example of being sawn asunder for his faith.

The writer refuses to soften how costly real faith has actually been for real people.

Faith has never been a guarantee of comfort or safety.

🗡️ The list turns deliberately brutal here
📜 Tradition names Isaiah as one such case
🚫 The writer does not soften the cost
📖 Faith never guaranteed comfort or safety

## 🏜️ Of Whom The World Was Not Worthy

This line flips the usual judgment completely.

The world rejected these believers as outcasts, wandering in deserts, mountains, and caves with nothing.

The text insists the world itself failed to deserve people of this kind of faith.

Rejection by the world was never proof that the world was right.

🏜️ They were cast out to deserts and caves
🌍 The world treated them as worthless outcasts
🔄 The verse flips that judgment completely
📖 Rejection did not mean the world was right

# Hebrews 11:39-40
# 🏁 A Better Thing Provided For Us
---
## ⏳ Having Obtained A Good Report Through Faith, Received Not The Promise

Every single name in this chapter is tied together by this one closing line.

All of them were approved by God for their faith.

None of them personally received the full promise during their own lifetime.

Approval from God and the timing of a reward are not the same thing.

⏳ Every name here shares this one ending
🗣️ All were approved by God for their faith
🚫 None received the full promise in their lifetime
📖 Approval and timing are not the same thing

## 🎁 God Having Provided Some Better Thing For Us

"Us" means the readers of this letter, standing on this side of Christ's arrival.

The Old Testament believers were waiting for something the original readers could already hold.

Their long wait makes sense only because it was pointing toward something bigger still ahead of them.

The faith chapter ends by handing the baton directly into the next chapter's race.

🎁 Us means the letter's own readers
🙌 Those readers could already hold what was promised
🎯 Their long wait pointed toward something bigger
📖 This chapter hands the baton to the next
`.trim();

export const HEBREWS_ELEVEN_PERSONAL_SECTIONS = parseHebrewsElevenRawNotes(HEBREWS_ELEVEN_RAW_NOTES);
