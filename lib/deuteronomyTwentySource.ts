export type DeuteronomyTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyRawNotes(rawText: string): DeuteronomyTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 20:${startVerse}` : `Deuteronomy 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 20 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_RAW_NOTES = `# Deuteronomy 20:1-4
# ⚔️ Facing A Bigger Army
---
## 🐎 Horses, And Chariots

Chariots gave an ancient army real speed and force in open battle.

Israel had no chariots of its own at this point in its history.

Cities like Hazor in Canaan were known for large chariot forces.

This verse names the exact enemy advantage that would look impossible to beat.

🐎 Chariots meant speed and force
🚶 Israel had no chariots yet
🏙️ Hazor was known for chariots
📖 This was a real military gap

## 🛑 Be Not Afraid Of Them

This is a direct command, not just encouragement.

Moses gives the order before he gives any reason.

God expected Israel to trust him even while still afraid.

Courage in this chapter means obeying despite the fear, not feeling nothing.

🛑 This is a command, not a suggestion
📜 The order comes before the reason
🙏 Trust was expected despite fear
📖 Courage here means obeying while afraid

## 🤝 The LORD Thy God Is With Thee

This phrase names the real reason the odds do not matter.

God's presence, not army size, decided the outcome of Israel's battles.

The same promise appears again right before Israel crosses into Canaan.

Fear of a bigger army only makes sense if God is left out of the count.

🤝 God's presence was the real factor
⚖️ Numbers did not decide the battle
📜 This same promise repeats later
📖 Fear ignores God being in the count

## 🌊 Brought Thee Up Out Of The Land Of Egypt

This phrase points back to the exodus, Israel's defining rescue story.

God defeated Egypt's army and chariots at the Red Sea.

That victory is the proof being offered here, not a new promise.

The same God who won that fight was leading this one too.

🌊 This points back to the exodus
🐎 Egypt's chariots were beaten there too
✅ That victory was the real proof
📖 The same God led both battles

## 🕎 The Priest Shall Approach And Speak Unto The People

A priest, not a general, gave this speech before battle.

That choice kept the coming fight connected to worship and faith.

Jewish tradition later called this figure the priest anointed for war.

His words mattered as much as any weapon Israel carried.

🕎 A priest gave this speech
🙏 War stayed connected to faith
📜 Tradition named this a war priest
📖 His words mattered like weapons

## 📢 Hear, O Israel

This exact phrase opens the most famous line in Deuteronomy, the Shema.

Using it here signals that this moment deserves the same full attention.

A battle speech and a statement of faith share the same opening words.

For Israel, going to war was never separate from listening to God.

📢 This phrase opens the Shema
👂 It signals full attention here
⚔️ Battle and faith share one voice
📖 War was never separate from God

## 📚 Let Not Your Hearts Faint, Fear Not, And Do Not Tremble

Three different phrases for fear are stacked together on purpose.

Ancient speeches often piled up close synonyms for real emphasis.

This is not empty repetition, it is a deliberate push against panic.

The priest names fear three times so it cannot hide under one word.

📚 Three fear words are stacked here
🗣️ Ancient speech used repetition for weight
🚫 This is not empty repetition
📖 Naming fear three times fought panic

## ⚔️ He That Goeth With You, To Fight For You

This phrase makes God an active fighter, not just a companion.

The verb changes from going with Israel to fighting for Israel.

Ancient Near Eastern nations often pictured their gods fighting for them too.

Israel's claim was that the one true God actually did this.

⚔️ God is described as fighting himself
🔄 Goeth with becomes fight for
🌍 Other nations claimed this for their gods
📖 Israel claimed it was actually true

## 🎯 To Save You

This phrase names the goal behind the whole battle speech.

Winning was never the point for its own sake.

The purpose was Israel's survival and protection, not conquest for glory.

Salvation here is physical rescue, the same word used for deliverance elsewhere.

🎯 Saving Israel was the real goal
🏆 Winning was not the point itself
🛡️ Survival mattered more than glory
📖 This is the same word for rescue

# Deuteronomy 20:5-9
# 🏠 Who Gets Sent Home
---
## 📋 The Officers Shall Speak Unto The People

"Officers" here were different from the priest and the army's commanders.

They handled organization and administration, not spiritual leadership.

Their job was to sort the army before any actual fighting began.

This step happened after the priest's speech, not before it.

📋 Officers handled organization, not worship
🗂️ They sorted the army before battle
⏳ This came after the priest spoke
📖 Different leaders had different roles

## 🏠 Built A New House, And Hath Not Dedicated It

"Dedicated" here means holding a ceremony to mark a new home's first use.

Israelite families likely marked a new house with a small household ceremony.

This exemption let a man finish something he had already started in life.

Dying before that ceremony would have left the work permanently unfinished.

🏠 Dedicated meant a home ceremony
🎉 Israelite families likely marked new homes
🔨 This let a man finish his work
📖 Death would leave it unfinished

## 🔁 Let Him Go And Return To His House

This exact instruction repeats three separate times in this short passage.

Each repetition covers a different unfinished piece of a man's life.

The law protected personal milestones even during a national emergency.

Israel's army was never meant to run on forced, uncaring service.

🔁 This phrase repeats three times
🧩 Each covers a different milestone
🛡️ Personal life was protected in war
📖 Service was never meant to be forced

## 🍇 Planted A Vineyard, And Hath Not Yet Eaten Of It

Israelite law required a new vineyard's fruit to be left alone for years.

Leviticus nineteen explains that fruit could not be eaten until the fifth year.

A man could plant a vineyard and still be waiting when war came.

This exemption protected that long term investment from being wasted.

🍇 New vineyards had a waiting period
📜 Leviticus nineteen sets that timeline
⏳ A man could still be waiting
📖 War would not waste that investment

## 💍 Betrothed A Wife, And Hath Not Taken Her

"Betrothed" was a binding legal step, well before the wedding itself took place.

A betrothed couple was legally committed but not yet living as husband and wife.

Deuteronomy twenty four later gives a full year of exemption after an actual wedding.

This earlier exemption protected the engagement period the same way.

💍 Betrothed meant legally bound already
⏳ The couple was not yet married
📜 Deuteronomy twenty four protects new marriages
📖 Engagement was protected the same way

## 😨 Fearful And Fainthearted

This exemption is different in kind from the other three.

It is about a man's state of mind, not his unfinished plans.

Fear could spread through a whole army if it was left unchecked.

Judges seven later shows this same idea in Gideon's own army.

😨 This exemption covers real fear
🦠 Fear could spread through an army
⚔️ Judges seven shows the same idea
📖 Unchecked fear risked the whole camp

## 💔 Lest His Brethren's Heart Faint As Well As His Heart

This line explains exactly why fear needed to be removed early.

One frightened soldier could quietly weaken the courage of everyone near him.

Sending him home protected the whole group, not just that one man.

Morale in this army was treated as something worth actively guarding.

💔 One man's fear could spread
🧑‍🤝‍🧑 It could weaken the whole group
🏠 Sending him home protected everyone
📖 Morale was actively guarded here

## 🪖 Captains Of The Armies To Lead The People

Once every exemption was handled, the remaining men needed real structure.

Captains were appointed only after the fearful and distracted had already left.

This order matters, structure came last, not first.

What remained was a smaller army built entirely on willing, steady men.

🪖 Captains organized who remained
⏳ This step came after exemptions
🧱 Order followed careful preparation
📖 The final army was steady and willing

# Deuteronomy 20:10-15
# 🏳️ Offering Peace First
---
## 🕊️ Proclaim Peace Unto It

Before any siege began, Israel had to formally offer peace first.

This was a real legal step, not just a polite gesture.

Many ancient armies attacked without warning to gain total surprise.

This law required Israel to give an enemy city one honest chance.

🕊️ Peace had to be offered first
📜 This was a required legal step
⚔️ Other armies often attacked without warning
📖 Israel had to give a real chance

## 🚪 If It Make Thee Answer Of Peace, And Open Unto Thee

"Open unto thee" means the city's gates would be physically opened.

Opening the gates was a public act of surrender to Israel.

Accepting peace meant giving up any resistance completely.

There was no partial or secret version of this agreement.

🚪 Open unto thee means opened gates
🏳️ This was a public surrender
✅ It meant giving up resistance
📖 There was no secret version of it

## 💰 Tributaries Unto Thee, And They Shall Serve Thee

"Tributaries" were people who paid tax and labor to a ruling power.

This is different from slavery, the city kept its own people and homes.

Serving here meant ongoing obligation, not being taken away or destroyed.

Surrender led to a changed status, not automatic harm.

💰 Tributaries paid tax and labor
🏠 The city kept its own people
🔄 Service replaced destruction here
📖 Surrender changed status, not safety

## ⚖️ If It Will Make No Peace With Thee, But Will Make War Against Thee

This line places the choice for war on the enemy city, not Israel.

Israel's default offer was peace, war was the city's own decision.

The text frames the coming siege as a response, not the first move.

That framing matters for understanding everything that follows in this law.

⚖️ The city chose war, not Israel
🕊️ Peace was Israel's default offer
🔄 A siege was framed as a response
📖 This framing shapes the whole law

## 🏙️ Besiege It

A siege meant surrounding a city and cutting off its food and supplies.

This method could take a very long time to actually work.

It relied on pressure and patience more than direct attack.

Verse nineteen later returns to this exact kind of long siege.

🏙️ A siege meant surrounding a city
🍞 It cut off food and supplies
⏳ It relied on patience over time
📖 Verse nineteen returns to this

## 🤝 When The LORD Thy God Hath Delivered It Into Thine Hands

This phrase credits God with the victory before the battle is even described.

The same idea already appeared back in verse four of this chapter.

Israel's law consistently framed military success as a gift, not a skill.

That framing shaped how Israel was expected to think about winning.

🤝 God gets credit before the battle
🔁 Verse four already made this point
🎁 Victory was framed as a gift
📖 This shaped how Israel saw winning

## ⚔️ Smite Every Male Thereof With The Edge Of The Sword

This harsh line targeted men of fighting age in a conquered city.

Ancient warfare commonly removed a defeated city's ability to fight back again.

The next verse immediately narrows who this violence applied to.

This law is difficult, and the text itself does not soften it.

⚔️ This targeted men of fighting age
🛡️ It removed future military threat
🔍 The next verse narrows this further
📖 The text does not soften this law

## 👪 The Women, And The Little Ones, And The Cattle

This verse draws a clear line between combatants and everyone else.

Women, children, and livestock were spared even in a completed siege.

Total destruction was not the default outcome, even in ancient warfare.

The next verse shows a far harsher rule reserved for a different case.

👪 Women and children were spared
🐄 Livestock was spared as well
🛡️ Destruction was not automatic here
📖 A harsher rule appears next

## 🗺️ Very Far Off From Thee

This phrase quietly limits everything just described to distant cities only.

It sets up a sharp contrast with the very next set of verses.

Distance mattered because these cities were not part of Israel's promised land.

The law that follows applies only to the nations living inside Canaan.

🗺️ This limits the rule to distant cities
🔀 It sets up a coming contrast
🏞️ These cities were outside the promised land
📖 A different law covers Canaan itself

# Deuteronomy 20:16-18
# 🔥 No Mercy For Canaan
---
## 🚫 Save Alive Nothing That Breatheth

This command applies only to the nations living inside Canaan itself.

It goes far beyond the rules just given for distant cities.

Scholars call this kind of total destruction command herem, or the ban.

Herem meant something was set apart entirely for destruction, with no exceptions.

🚫 This applies only inside Canaan
🔥 It goes beyond the earlier rules
📚 Scholars call this herem, or the ban
📖 Herem meant total, set apart destruction

## 🎁 For An Inheritance

This phrase frames the land as a gift, not a prize Israel earned.

"Inheritance" language runs throughout the promises made to Abraham.

Even this harsh command sits inside a larger story about a gift of land.

Israel was receiving something, not simply taking something by force.

🎁 Inheritance means the land was a gift
📜 This language traces back to Abraham
🌍 A gift frames this whole command
📖 Israel was receiving, not just taking

## 🔁 Utterly Destroy Them

The original language doubles this verb for extra emphasis.

That kind of doubling is a common way Hebrew intensifies a command.

This was not a suggestion open to Israel's own judgment.

The severity of the wording matches the severity of what is commanded.

🔁 The original wording doubles this verb
📚 Doubling is a Hebrew way to intensify
🛑 This was not left to judgment
📖 The wording matches the command's weight

## 📜 Namely, The Hittites, And The Amorites, The Canaanites, And The Perizzites, The Hivites, And The Jebusites

These six names cover the peoples already living inside the promised land.

Deuteronomy seven lists a nearly identical group of seven nations earlier in this same book.

Each nation had its own cities, gods, and long established culture.

Naming them specifically kept this command from being vague or open ended.

📜 These six peoples lived in Canaan
🕰️ Deuteronomy seven names a similar list
🏛️ Each had its own cities and gods
➡️ Naming them kept the command specific

## 🙏 As The LORD Thy God Hath Commanded Thee

This phrase places the responsibility for this command on God, not Israel.

Obedience is the framing here, not national ambition or hatred.

Israel is repeatedly told this was never their own idea.

That framing runs through this entire chapter of war instructions.

🙏 This command came from God
📖 Obedience is the framing, not ambition
🚫 This was never Israel's own idea
➡️ The same framing runs through the chapter

## 🎯 That They Teach You Not To Do After All Their Abominations

This verse gives the actual reason behind such a severe command.

"Abominations" refers to practices like child sacrifice tied to Canaanite worship.

The danger named here is spiritual influence, not ethnic hatred.

Israel's own future faithfulness was the real thing being protected.

🎯 This verse explains the real reason
🔥 Abominations included practices like child sacrifice
⚠️ The danger was spiritual influence
📖 Israel's future faithfulness was protected

# Deuteronomy 20:19-20
# 🌳 Sparing The Trees
---
## 🌳 Thou Shalt Not Destroy The Trees Thereof By Forcing An Axe Against Them

This law restrains Israel's own army during a long, difficult siege.

Cutting down fruit trees for no reason was specifically forbidden.

Few ancient warfare codes placed any limit like this on an army.

Even a justified war had real limits on how it could be fought.

🌳 Fruit trees could not be cut down
⚔️ This limited Israel's own army
🌍 Few ancient armies had this rule
📖 Even war had real limits

## 🍎 Thou Mayest Eat Of Them

This line gives the practical reason behind the tree law.

Fruit trees were a long term food source, not a quick resource.

Destroying them would only hurt whoever eventually lived in that land.

That included Israel itself, once the land was finally settled.

🍎 Trees were a long term food source
🚫 Destroying them would only cause harm
🏞️ This included Israel's own future
📖 The land was worth protecting

## ❤️ For The Tree Of The Field Is Man's Life

This line states the reasoning as plainly as possible.

A tree that provided food was treated as a source of life itself.

That value did not disappear just because a war was happening.

This is a rare moment of real compassion inside a chapter about warfare.

🌳 Trees were treated as life itself
🍎 Food value did not disappear in war
❤️ This is a moment of real compassion
📖 Compassion appears even inside war laws

## 🧱 Build Bulwarks Against The City

"Bulwarks" were defensive structures or ramps built to help attack a city's walls.

Only trees that did not produce fruit could be used this way.

The law drew a clear, practical line between useful trees and expendable ones.

Even permitted destruction in this chapter had real boundaries around it.

🧱 Bulwarks were siege structures or ramps
🌲 Only trees without fruit could be used
📏 A clear line separated the two
📖 Even permitted destruction had boundaries
`.trim();

export const DEUTERONOMY_TWENTY_PERSONAL_SECTIONS = parseDeuteronomyTwentyRawNotes(DEUTERONOMY_TWENTY_RAW_NOTES);
