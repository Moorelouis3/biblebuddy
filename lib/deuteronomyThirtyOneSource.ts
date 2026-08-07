export type DeuteronomyThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirtyOneRawNotes(rawText: string): DeuteronomyThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 31:${startVerse}` : `Deuteronomy 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 31 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTY_ONE_RAW_NOTES = `# Deuteronomy 31:1-3
# 🎂 An Hundred And Twenty Years Old
---
## 🕰️ Moses Went And Spake These Words Unto All Israel

This is not a private farewell.

Moses delivers these words in front of the entire nation.

Chapters one through thirty already recorded his long closing sermon.

This is the very last piece of that sermon.

Everyone in Israel hears it together, all at once.

🕰️ Moses gives his final public words
📜 Chapters one through thirty already spoken
👥 All Israel hears it as one group
➡️ A public ending carries real weight
---
## 🎂 An Hundred And Twenty Years Old This Day

Moses states his exact age without hesitation.

His life divides into three equal stretches of forty years.

Acts chapter seven records forty years in Egypt as a prince.

Then forty years in Midian as a shepherd.

Then forty years leading Israel through the wilderness.

Even his final days follow a shape God had been building the whole time.

🎂 Life split into three forty year spans
📆 Egypt then Midian then the wilderness
🧭 Acts seven confirms the same pattern
📖 God shaped even the ending
---
## 🚶 I Can No More Go Out And Come In

This phrase does not mean Moses can no longer walk.

"Go out and come in" describes leading people, especially into battle and back home.

At an hundred and twenty, Moses is stepping down as Israel's leader.

The job of leading, not his legs, is what has come to an end.

🚶 Not about walking at all
⚔️ It means leading people to battle and back
🎂 Moses steps down as leader
➡️ Leadership itself is what ends here
---
## 🌊 Thou Shalt Not Go Over This Jordan

God already told Moses this once before.

Numbers chapter twenty records why, Moses struck a rock in anger instead of speaking to it.

That single moment of disobedience still carries a consequence here.

Moses can see the promised land, but he will not walk into it.

🌊 Jordan is the border into Canaan
🪨 Numbers twenty explains the reason
😔 One moment carried a lasting consequence
📖 He sees the land but never enters
---
## ⚔️ He Will Destroy These Nations From Before Thee

Israel is not sent in to win the battles alone.

The LORD himself is named as the one who does the destroying.

Joshua will lead the march, but God is credited with the outcome.

That order, God first and a human leader second, shapes how Israel should trust the plan.

⚔️ God not Israel destroys the nations
🧭 Joshua leads the march itself
🙌 Credit goes to God first
📖 Trust rests on God not strategy
---
## 🤝 Joshua He Shall Go Over Before Thee

Moses names his successor out loud, in public.

Joshua has already been training for this moment, serving as Moses's assistant for years.

There is no confusion left about who leads next.

🤝 Joshua is named as successor
📚 He served as Moses's assistant for years
👥 The transfer happens publicly
➡️ No confusion is left about who leads

# Deuteronomy 31:4-6
# 💪 Be Strong And Of A Good Courage
---
## 👑 As He Did Unto Sihon And Og

Sihon and Og were two Amorite kings Israel already defeated.

Numbers chapter twenty one records both battles in detail.

Moses points back to a victory Israel has already seen with their own eyes.

The nations still ahead in Canaan are not a new kind of threat.

👑 Sihon and Og were Amorite kings
📚 Numbers twenty one records their defeat
👀 Israel already witnessed this kind of victory
📖 The pattern is proven not new
---
## 🎁 The LORD Shall Give Them Up Before Your Face

Victory here is described as a gift, not a prize Israel wins on its own strength.

"Give them up" pictures God handing the enemy over, already defeated.

Israel still has to fight, but the outcome is not really in doubt.

🎁 Victory is described as a gift
🤲 God hands the enemy over
⚔️ Israel still fights but the result is set
📖 God not strength decides the outcome
---
## 💪 Be Strong And Of A Good Courage

This exact phrase appears three times in this chapter alone.

It is not empty cheerleading.

The courage commanded here is grounded in a specific promise, God going ahead of them.

Bravery without that promise would just be recklessness.

💪 Repeated three times in this chapter
🚫 Not empty cheerleading
🤝 Grounded in God going ahead
📖 Courage rests on a promise not bravado
---
## 😨 Fear Not Nor Be Afraid Of Them

Fear was a real, reasonable response to the nations Israel faced.

This command does not pretend the enemy is weak.

It tells Israel where to look instead of at the size of the threat.

😨 Fear was a reasonable response
🚫 The command does not deny the danger
👀 It redirects where Israel looks
➡️ Focus shifts from the threat to God
---
## 🤝 He Will Not Fail Thee Nor Forsake Thee

"Fail" here means to let someone down or abandon a task partway through.

"Forsake" means to walk away from someone completely.

Both words together rule out every version of God quietly stepping back.

🤝 Fail means letting someone down
🚪 Forsake means walking away completely
🚫 Both options are ruled out here
📖 God's presence is total not partial

# Deuteronomy 31:7-8
# 🤝 Moses Charges Joshua
---
## 👥 In The Sight Of All Israel

Moses does not hand off leadership privately.

He calls Joshua forward while the whole nation watches.

A public commission is harder to question or challenge later.

👥 The commission happens in public
🚫 Nothing about it is private
✅ A public act is harder to dispute
➡️ Everyone sees the same moment
---
## 🧭 Thou Must Go With This People

Moses speaks directly to Joshua now, not about him.

The word "must" leaves no room for Joshua to decline.

This is a command, not an invitation.

🧭 Moses speaks straight to Joshua
📌 Must means there is no choice
🚫 This is not an invitation
➡️ The commission is final
---
## 🛡️ He Will Not Fail Thee Neither Forsake Thee

Moses repeats the exact promise God gave to all of Israel back in verse six.

This time it is spoken to one man alone.

Joshua steps into leadership carrying the very same promise Moses carried for forty years.

🛡️ Same promise repeated to Joshua alone
🔁 It matches verse six exactly
👤 One leader now carries what many once held
📖 The promise transfers with the job
---
## 😌 Fear Not Neither Be Dismayed

"Dismayed" means thrown into confusion or panic, not just afraid.

Joshua is about to lead people into war without Moses beside him.

This command meets that exact fear before it has a chance to grow.

😌 Dismayed means panic not simple fear
⚔️ Joshua leads without Moses now
🎯 The command meets his real fear
📖 Reassurance arrives before the fear does

# Deuteronomy 31:9-13
# 📜 The Law Read Every Seven Years
---
## ✍️ Moses Wrote This Law

"This law" refers to the teaching Moses has been giving throughout Deuteronomy.

Writing it down turns a spoken sermon into a permanent record.

Israel will not have to rely on memory alone once Moses is gone.

✍️ This law means the teaching just given
📜 Speech becomes a permanent written record
🧠 Memory alone was not enough
📖 A written text outlasts a voice
---
## 👥 Delivered It Unto The Priests The Sons Of Levi

The sons of Levi were the tribe set apart to serve as Israel's priests.

They were also the ones responsible for carrying the ark of the covenant.

Placing the written law in their care linked the nation's worship to its founding document.

👥 Levites were the priestly tribe
📦 They carried the ark of the covenant
📜 The law was placed in their care
➡️ Worship and the law stayed linked
---
## 📆 The Solemnity Of The Year Of Release

The year of release happened every seventh year, when debts among Israelites were canceled.

Deuteronomy chapter fifteen already laid out that command in detail.

This special year became the moment set aside for reading the whole law aloud.

📆 Every seventh year debts were canceled
📚 Chapter fifteen explains the practice
🗣️ That year hosted the public reading
📖 Mercy and instruction shared one moment
---
## ⛺ The Feast Of Tabernacles

The feast of tabernacles was a week long festival held in the fall, after the harvest.

Families built and lived in temporary shelters made of branches during the feast.

It was one of three feasts every Israelite man was required to attend.

⛺ A week long fall harvest feast
🌿 Families lived in branch shelters
📅 One of three required feasts
📖 A harvest feast became a teaching moment
---
## 📢 Thou Shalt Read This Law Before All Israel

This reading was not private study.

It happened out loud, in front of the entire assembled nation.

Every seven years, the whole covenant got repeated from the beginning.

📢 The law was read aloud publicly
👥 The entire nation gathered to hear it
🔁 It repeated every seven years
➡️ No generation could claim they never heard it
---
## 🏘️ Men And Women And Children And Thy Stranger

"Stranger" here means a foreigner living among Israel, not a passerby.

This list leaves out no one living within the community.

Nobody in Israel's camp could claim the law never applied to them.

🏘️ Every household member is included
🌍 Stranger means a resident foreigner
🚫 No one is left out
📖 The law reached the whole community
---
## 👂 That They May Hear And That They May Learn

Hearing and learning are named as two separate steps.

Simply listening was never the goal by itself.

The reading existed to shape how Israel actually lived, not just what they knew.

👂 Hearing and learning are named separately
🚫 Listening alone was never the goal
🌱 The goal was changed behavior
📖 Knowing the law should lead to living it
---
## 🧒 Their Children Which Have Not Known Any Thing

This law was aimed at a specific future generation.

Children born in the land would never remember Egypt or the wilderness firsthand.

The seven year reading existed to make sure they still knew the story anyway.

🧒 Aimed at children not yet born
🚶 They would never remember Egypt themselves
🔁 Regular reading passed the story forward
📖 A story must be retold to survive

# Deuteronomy 31:14-18
# ☁️ The LORD Appears In A Pillar Of Cloud
---
## ⏳ Thy Days Approach That Thou Must Die

God tells Moses plainly that his death is near.

There is no soft language used here at all.

Moses is given time to prepare Joshua and Israel before that day comes.

⏳ God states the timing plainly
🚫 No soft language is used
🕰️ Moses still has time to prepare
📖 Even death is announced with purpose
---
## ⛺ The Tabernacle Of The Congregation

This tabernacle is the tent where God's presence dwelt among Israel.

"Congregation" here simply means the assembled community of Israel.

Moses and Joshua are called to that exact meeting place together.

⛺ God's presence dwelt in this tent
👥 Congregation means the assembled community
🤝 Moses and Joshua go there together
➡️ The handoff happens in God's presence
---
## ☁️ The LORD Appeared In A Pillar Of A Cloud

This same pillar of cloud led Israel through the wilderness for forty years.

It also stood at the doorway of the tabernacle during earlier moments in Exodus and Numbers.

Its return here marks a major, formal moment, not a routine appearance.

☁️ The same pillar led Israel for forty years
🚪 It also appeared at the tabernacle door before
🎯 Its return signals something major
📖 God shows up for the handoff himself
---
## 🛌 Thou Shalt Sleep With Thy Fathers

This phrase is a gentle way of saying Moses will die.

It pictures death as joining ancestors who died before him, not simply ending.

The Bible often softens hard news with phrases like this one.

🛌 A gentle phrase meaning death
👴 Pictures joining ancestors who came before
🚫 Not a literal nap
📖 Scripture often softens hard news this way
---
## 💔 Go A Whoring After The Gods Of The Strangers

"Whoring after" is a strong idiom for breaking a covenant of loyalty.

The Bible often compares Israel's relationship with God to a marriage.

Worshiping other gods gets described the same way scripture describes marital unfaithfulness.

💔 Whoring after means breaking loyalty
💍 Israel's covenant is pictured as a marriage
🚫 Other gods mean spiritual unfaithfulness
📖 Idolatry here means betrayal not mistake
---
## 🙈 I Will Hide My Face From Them

A hidden face in scripture usually pictures withdrawn favor and protection, not literal invisibility.

God is not vanishing from existence here.

He is describing what it feels like when His blessing is removed from a rebellious people.

🙈 Hidden face means withdrawn favor
🚫 Not about literal invisibility
🛡️ Protection is what gets removed
📖 Consequence not abandonment is the point
---
## ❓ Are Not These Evils Come Upon Us

God predicts the exact question Israel will one day ask.

He is not guessing at their future confusion.

He already knows they will feel abandoned without recognizing their own part in it.

❓ God predicts their future question
🔮 Not a guess but foreknowledge
😕 They will feel confused not guilty
📖 God sees the whole story before it happens

# Deuteronomy 31:19-23
# 🎵 Write Ye This Song
---
## 🎵 Write Ye This Song For You

God is not asking for a casual poem.

This song becomes chapter thirty two of Deuteronomy, right after this chapter ends.

Its purpose is stated clearly here, to serve as a witness against Israel later.

🎵 This song becomes chapter thirty two
📜 God commands it directly
⚖️ Its purpose is to serve as a witness
📖 A song can carry legal weight
---
## 🗣️ Put It In Their Mouths

Israel's culture relied heavily on memorized, spoken word rather than personal written copies.

Putting the song "in their mouths" means teaching it until people can recite it by heart.

A song is much harder to lose than a scroll no one can read.

🗣️ Memorized speech mattered more than private reading
🧠 In their mouths means learned by heart
📜 Songs survive better than scrolls
➡️ Music was built to be remembered
---
## 🍯 A Land That Floweth With Milk And Honey

This phrase does not describe two products flowing like rivers.

It is a common ancient picture of a land rich enough to support herds and orchards easily.

God repeats this same description throughout Israel's story to describe the promised land's abundance.

🍯 A picture of easy abundance
🐐 Milk points to healthy livestock
🍇 Honey points to fruitful land
📖 The promise repeats throughout the story
---
## 🍞 Waxen Fat

"Waxen fat" is an old way of saying someone grew comfortable and prosperous.

The warning is not really about abundance itself.

It is about what comfort tends to do to people over time.

🍞 Waxen fat means growing comfortable
💰 Prosperity itself is not the problem
😴 Comfort can dull spiritual attention
📖 Ease is warned about here not blessing
---
## ⚖️ This Song Shall Testify Against Them As A Witness

A witness in this culture stood in court and confirmed what actually happened.

The song is described the same way, as testimony that cannot be denied later.

Long after Moses is gone, the words themselves keep testifying.

⚖️ Witness language comes from the courtroom
📜 The song testifies like spoken evidence
🗣️ It keeps speaking after Moses is gone
📖 Words can outlive the person who wrote them
---
## 🧠 I Know Their Imagination

"Imagination" in the King James Bible does not mean creativity or fantasy.

It means the inner inclination or intention someone is already forming.

God is saying He already knows the direction Israel's heart is bending, before it happens.

🧠 Imagination means inner inclination not fantasy
🔮 God already knows their future direction
🚫 Not a modern definition of the word
📖 God sees intentions forming ahead of time
---
## 🤝 Be Strong And Of A Good Courage

God speaks this command straight to Joshua now, not through Moses.

It is the exact same phrase already given twice in this chapter.

Joshua hears it directly from God this time, not secondhand.

🤝 Spoken directly to Joshua by God
🔁 The third use of this exact phrase
👂 Joshua hears it firsthand this time
📖 The same promise now backs the same command

# Deuteronomy 31:24-27
# 📖 The Book Of The Law Beside The Ark
---
## 📖 Made An End Of Writing The Words Of This Law In A Book

This marks the completion of the written text of Deuteronomy itself.

"Book" here means a scroll, not pages bound like a modern book.

A sermon that began back in chapter one is now a finished, permanent document.

📖 Deuteronomy's writing is now complete
📜 Book means a scroll not bound pages
🗣️ A spoken sermon becomes a lasting text
➡️ Completion turns speech into scripture
---
## 📦 Put It In The Side Of The Ark Of The Covenant

The stone tablets of the ten commandments were kept inside the ark itself.

This scroll of the law was placed beside the ark, not inside it.

The two objects held different roles even while sitting close together.

📦 The tablets stayed inside the ark
📜 This scroll sat beside the ark instead
🪨 Two objects two separate roles
📖 Both still anchored Israel's covenant
---
## ⚖️ For A Witness Against Thee

The written law is described as a witness, echoing the same language used for the song in verse nineteen.

Both the song and the scroll exist for the same reason.

Neither one is there to flatter Israel.

⚖️ Witness language matches the song's purpose
📜 Both the scroll and the song testify
🚫 Neither exists to flatter Israel
📖 Two forms of testimony one message
---
## 🗿 Thy Rebellion And Thy Stiff Neck

"Stiff necked" is an old image for someone too stubborn to turn and listen.

Picture an ox that refuses to turn its neck at the farmer's guiding hand.

Moses uses this same blunt description Israel has already heard many times before.

🗿 Stiff necked means stubborn refusal
🐂 Pictures an ox resisting the reins
🔁 Moses has used this description before
📖 The warning is honest not gentle
---
## ⏳ How Much More After My Death

Moses reasons from the present into the future here.

Israel struggled to obey while he was alive to correct them.

The risk only grows once he is gone.

His honesty here is not despair, but a clear warning meant to prepare Joshua.

⏳ Moses reasons from present to future
📈 Disobedience is expected to grow not shrink
🚫 This is honesty not despair
📖 A clear warning prepares the next leader

# Deuteronomy 31:28-30
# 🌍 Call Heaven And Earth To Record
---
## 👴 Gather Unto Me All The Elders Of Your Tribes And Your Officers

Moses calls together Israel's full leadership structure, not just a few people.

Elders and officers represented every tribe in the nation.

What follows next is meant to reach the entire nation through its leaders.

👴 Elders and officers represent every tribe
👥 This is a full leadership gathering
📢 The message travels through them to everyone
➡️ Leaders carried the message onward
---
## 🌍 Call Heaven And Earth To Record Against Them

Ancient treaties often named the sky and the ground as permanent witnesses to an agreement.

Unlike a human witness, heaven and earth cannot die, forget, or be bribed.

Moses already used this same image back in chapter four.

🌍 Heaven and earth witnessed ancient treaties
🚫 Unlike people they cannot die or lie
🔁 Moses already used this image in chapter four
📖 The whole created world hears this covenant
---
## 💔 Ye Will Utterly Corrupt Yourselves

Moses does not soften this prediction at all.

He states plainly that Israel will fail to keep this covenant.

This is not Moses losing hope.

It is decades of watching Israel's pattern of behavior up close.

💔 Moses predicts real coming failure
🚫 No soft language is used here
👀 Based on years of watching Israel firsthand
📖 Honesty here is not giving up
---
## 🎵 Moses Spake The Words Of This Song Until They Were Ended

This verse closes chapter thirty one and sets up the song recorded next in chapter thirty two.

Moses delivers the exact song God commanded back in verse nineteen.

His last major public act here is not a battle or a law.

It is a song meant to outlive him.

🎵 Sets up the song in chapter thirty two
📜 Moses delivers what God commanded in verse nineteen
🚫 His final act here is not a battle
📖 A song was built to outlive its singer
`.trim();

export const DEUTERONOMY_THIRTY_ONE_PERSONAL_SECTIONS = parseDeuteronomyThirtyOneRawNotes(DEUTERONOMY_THIRTY_ONE_RAW_NOTES);
