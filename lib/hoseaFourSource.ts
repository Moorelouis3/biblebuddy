export type HoseaFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaFourRawNotes(rawText: string): HoseaFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 4:${startVerse}` : `Hosea 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Hosea 4 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_FOUR_RAW_NOTES = `# Hosea 4:1-3
# ⚖️ The LORD Brings A Case Against The Land
---
## 👂 Hear The Word Of The LORD

Hear the word of the LORD opens like a summons to court, not a casual greeting.

Prophets used this phrase when God was bringing formal charges against His people.

Ye children of Israel means the entire nation is addressed together, not one group.

This chapter reads like a trial.

God is the plaintiff, and Israel is the defendant.

⚖️ Hear the word means a courtroom summons
🇮🇱 Children of Israel means the whole nation
📜 This chapter reads like a trial
📖 God brings formal charges against His people

## ⚖️ The LORD Hath A Controversy With The Inhabitants Of The Land

Controversy here is not a disagreement about opinions.

It is the Hebrew word for a formal legal case, like a lawsuit.

The LORD is acting as both the judge and the wronged party.

Inhabitants of the land means everyone living in Israel, not just the leaders.

No one gets to sit this trial out.

⚖️ Controversy means a formal legal case
👨‍⚖️ The LORD is judge and plaintiff
🏞️ Inhabitants of the land means everyone
📖 No one is exempt from this trial

## 🚫 No Truth, Nor Mercy, Nor Knowledge Of God In The Land

These three words describe exactly what is missing from the nation.

Truth means people cannot be trusted to keep their word.

Mercy means there is no kindness left between neighbors.

Knowledge of God does not mean information about God.

It means an intimate relationship with Him, and it has disappeared.

🚫 Three things are missing from the land
🤥 Truth means people cannot be trusted
💔 Mercy means no kindness between neighbors
📖 Knowledge of God means a lost relationship

## 😡 By Swearing, And Lying, And Killing, And Stealing, And Committing Adultery

This list names five sins together, one after another.

It reads like formal charges read aloud in court.

Swearing here means lying under oath, not bad language.

The list matches several of the Ten Commandments.

Breaking all of them at once shows how far the nation fell.

😡 Five sins are named together here
⚖️ It reads like formal courtroom charges
🤥 Swearing means lying under oath
➡️ This breaks several of the Ten Commandments

## 🩸 They Break Out, And Blood Toucheth Blood

Break out pictures violence spilling past every normal limit.

Blood toucheth blood is a vivid way of saying bloodshed follows bloodshed without stopping.

One violent act leads straight into the next one.

The nation is not committing an occasional crime.

It is caught in a constant, repeating cycle of violence.

🩸 Break out means violence overflowing limits
🔁 Blood toucheth blood means bloodshed repeating
⚔️ One violent act leads to another
➡️ Violence here is constant, not occasional

## 🌾 Therefore Shall The Land Mourn

The land itself is pictured as a mourner here, not just the people.

This same pattern shows up elsewhere, where sin brings a curse on the land.

The land was never just scenery in this story.

It was always tied to whether the people kept covenant with God.

When the people fail, the ground itself feels the weight.

🌾 The land itself mourns like a person
📜 Sin here brings a curse on land
🌍 The land was tied to the covenant
📖 The people's failure weighs on the ground

## 🐟 The Fishes Of The Sea Also Shall Be Taken Away

This judgment moves backward through the order of creation itself.

Land animals, birds, and fish are listed here in that order.

That matches the exact categories God made in Genesis chapter one.

Judgment is undoing creation step by step, not just punishing people.

Even the natural world suffers for human sin.

🐟 Fish, birds, and land animals are listed
🌍 This matches creation's order in Genesis one
💥 Judgment undoes creation step by step
📖 Even nature suffers for human sin

# Hosea 4:4-6
# 👥 Guilt Spreads To Priest And Prophet
---
## 🤐 Yet Let No Man Strive, Nor Reprove Another

Strive and reprove both mean arguing or correcting someone else's behavior.

Normally a priest would be the one to correct the people's sin.

Here God tells everyone to stop arguing, because the problem goes too deep for debate.

The guilt is not one person's fault to isolate.

Everyone, including the ones who should be correcting others, shares the blame.

🤐 Strive and reprove mean arguing or correcting
🙅 Normally the priest corrects the people
⚖️ The guilt here goes too deep for debate
📖 Even the correctors share the blame

## 👥 Thy People Are As They That Strive With The Priest

This line says the ordinary people are now arguing with their own priests.

In a healthy nation, the priest's correction would be respected, not fought.

Here the whole relationship between leaders and people has broken down.

No one is left who can simply listen and be corrected.

👥 The people now argue with their priests
🏛️ Correction is normally respected, not fought
💔 Leaders and people both broke down together
➡️ No one is left willing to listen

## 🌙 The Prophet Also Shall Fall With Thee In The Night

Prophets were supposed to warn the nation before disaster struck.

This verse says even the prophet will fall, right alongside everyone else.

Day and night together mean there is no safe hour left for anyone.

No official role protects a person from this judgment.

🌙 Even the prophet falls in this judgment
📢 Prophets were supposed to warn, not share guilt
⏰ Day and night together mean no safe hour
📖 No title protects anyone from judgment

## 👩 I Will Destroy Thy Mother

Mother here does not mean one individual woman.

It is a common way the prophets pictured the whole nation of Israel.

Destroying the mother means the entire national identity is coming apart.

The judgment reaches past any single family into the whole community.

👩 Mother here means the whole nation
🇮🇱 Prophets often pictured Israel this way
💥 The nation's identity is coming apart
➡️ Judgment reaches past one family to all

## 📚 My People Are Destroyed For Lack Of Knowledge

Knowledge here does not mean facts or information.

It means knowing God personally, the way you know someone you love.

The people were destroyed because that relationship had gone missing.

A nation can know facts about God and still not know Him at all.

📚 Knowledge here means knowing God personally
💔 It is relationship, not just information
🏚️ That missing relationship caused real destruction
📖 Facts are not the same as relationship

## 🔄 Because Thou Hast Rejected Knowledge, I Will Also Reject Thee

This verse works like a mirror, giving back exactly what was given first.

Israel rejected knowing God on purpose, not by accident.

God responds by rejecting their claim to be His priests.

The punishment matches the sin instead of being random.

🔄 God mirrors back what Israel chose first
🙅 Israel rejected knowing God on purpose
⚖️ God rejects their claim to the priesthood
📖 The punishment matches the sin exactly

## 👶 I Will Also Forget Thy Children

Forget here is a covenant word, not simple memory loss.

It means God will no longer treat them as His own set apart people.

The consequence of this sin does not stop with one generation.

It reaches forward into the lives of children not yet born.

👶 Forget here means a covenant decision
🙅 God stops treating them as set apart
⏳ The consequence outlives one single generation
➡️ Children not yet born inherit this judgment

# Hosea 4:7-10
# 🍽️ Priests Who Feed On Sin
---
## 📈 As They Were Increased, So They Sinned Against Me

Increased here points to growing wealth and population under earlier blessing.

Instead of gratitude, prosperity led straight into more sin.

The more God gave, the further the people drifted from Him.

Blessing did not guarantee faithfulness in this story.

📈 Increased means growing wealth and numbers
🙏 Prosperity led to more sin, not thanks
↘️ More blessing brought more distance from God
📖 Blessing never guaranteed faithfulness here

## 💔 I Will Change Their Glory Into Shame

Glory here likely points to Israel's wealth, status, and reputation among nations.

God promises to flip that honor into public disgrace instead.

This reverses the normal direction of blessing completely.

What once made Israel proud will soon make Israel ashamed.

💔 Glory means Israel's wealth and status
🔄 God flips that honor into shame
⬇️ This reverses blessing's normal direction
➡️ Former pride becomes future shame

## 🍖 They Eat Up The Sin Of My People

Priests were supposed to live off the people's offerings as part of their role.

This verse accuses them of actually feeding off the people's sin instead.

More sin meant more sin offerings, which meant more food for corrupt priests.

The priesthood had turned Israel's guilt into their own personal profit.

🍖 Priests normally lived off the offerings
💰 Here they profit from the people's sin
📈 More sin meant more income for them
📖 Guilt became personal profit for the priesthood

## ⚖️ Like People, Like Priest

This is a short saying, almost like a proverb about shared guilt.

It means the leaders are no better than the people they are supposed to guide.

Priests were meant to raise the standard, not match the lowest point.

Here they fell to exactly the same level as everyone else.

⚖️ Like people, like priest means shared guilt
📏 Priests should raise the standard, not match it
📉 Here the leaders fell with the people
📖 No one stood above the failure

## 💰 I Will Punish Them For Their Ways, And Reward Them Their Doings

Ways and doings both mean the same thing here, a person's actual actions.

God repeats the same idea twice for emphasis, not for two different ideas.

Reward here is used with heavy irony, since the payment is judgment, not a gift.

People reap what their own actions actually planted.

💰 Ways and doings both mean actions
🔁 One idea repeated twice for emphasis
😬 Reward here is used with irony
📖 People reap what their actions planted

## 🍽️ They Shall Eat, And Not Have Enough

This pictures a curse tied to covenant disobedience, the same kind warned about in Deuteronomy.

Food will exist, but it will never satisfy anyone who eats it.

The problem is not a lack of food on the table.

It is a lack of blessing resting on what they already have.

🍽️ This pictures a curse from Deuteronomy
🚫 Food exists, but never satisfies anyone
📉 The problem is not a lack of food
📖 The missing piece is God's own blessing

## 🚫 They Shall Commit Whoredom, And Shall Not Increase

Whoredom in Hosea almost always pictures worshipping other gods, not only sexual sin.

Baal worship promised fertility and increase in exchange for devotion.

God's judgment here cancels that very promise completely.

Chasing a false god for blessing leaves a person with even less.

🚫 Whoredom here pictures worshipping other gods
🌾 Baal worship promised fertility in return
❌ God cancels that false promise here
📖 False gods leave people with even less

# Hosea 4:11-14
# 🗿 Wooden Idols And Hollow Worship
---
## 🍷 Whoredom And Wine And New Wine Take Away The Heart

Heart in the Bible usually means the mind and will, not just emotion.

Take away the heart means these things destroy clear thinking and good judgment.

Spiritual unfaithfulness is grouped together here with heavy drinking.

Both leave a person unable to see their situation clearly.

🍷 Heart here means the mind and will
🌫️ Take away the heart means clouded judgment
🤝 Unfaithfulness and drinking are grouped together
📖 Both leave a person unable to see clearly

## 🪵 My People Ask Counsel At Their Stocks

Stocks here means pieces of carved wood, small idols made by human hands.

Asking counsel means going to these objects for guidance about the future.

A piece of wood cannot think, speak, or know anything at all.

The people chose a lifeless object over the living God.

🪵 Stocks means carved wooden idols
❓ Asking counsel means seeking guidance there
🙅 A piece of wood cannot think or speak
📖 They chose a lifeless object over God

## 📏 Their Staff Declareth Unto Them

Staff here points to a rod used in pagan divination practices.

Some ancient cultures threw or balanced sticks to predict the future.

This was a counterfeit substitute for hearing from a real prophet.

Israel had traded true guidance for a magic trick.

📏 Staff means a rod used in divination
🎲 Sticks were used to predict the future
🚫 This counterfeited hearing from a true prophet
➡️ True guidance was traded for a trick

## 🌀 The Spirit Of Whoredoms Hath Caused Them To Err

Spirit of whoredoms describes a whole mindset bent toward chasing false gods.

This is not one accidental mistake but a settled direction of the heart.

Err means wandering off the right path, not a single misstep.

The nation had developed a habit, not just made one bad choice.

🌀 Spirit of whoredoms means a bent mindset
🧭 Err means wandering off the right path
🔁 This is a habit, not one mistake
📖 The whole nation developed this direction

## ⛰️ They Sacrifice Upon The Tops Of The Mountains

High places like mountain tops were common worship sites for other nations.

Worshipping there mixed true religion with the customs of surrounding peoples.

The location itself showed where Israel's loyalty had actually drifted.

God had commanded worship at one place, not at scattered hilltops.

⛰️ Mountain tops were common pagan worship sites
🤝 This blended true worship with pagan custom
🧭 Location showed where loyalty had drifted
📖 God commanded one place, not scattered hills

## 🌳 Under Oaks And Poplars And Elms, Because The Shadow Thereof Is Good

These three trees all gave heavy, cool shade in a hot climate.

Canaanite worship often happened under shady trees like these on purpose.

The shade was pleasant, which made the false worship feel comfortable too.

Comfort does not make a place of worship acceptable to God.

🌳 These trees gave heavy, cool shade
🛐 Canaanite worship often used shady trees
😌 Comfort made the false worship feel appealing
📖 Comfort never makes worship acceptable to God

## 👧 Your Daughters Shall Commit Whoredom, And Your Spouses Shall Commit Adultery

Some Canaanite worship rites reportedly involved sexual acts tied to fertility rituals.

This verse likely points to that practice spreading into Israel's own families.

The sin of the parents did not stay contained to themselves.

It spilled over directly into the next generation's own choices.

👧 Canaanite rites likely involved ritual sex
👪 This sin spread into Israel's own families
⬇️ Parents' sin did not stay contained
📖 It spilled into the next generation

## 👨 For Themselves Are Separated With Whores

This shifts the blame toward the men in the story, not the young women.

Separated with whores means the men were the ones seeking out that sin first.

God holds the leaders and the men most responsible for leading others astray.

The daughters' sin grew out of a corruption the men created.

👨 Blame shifts toward the men here
🙅 Men sought out this sin first
⚖️ God holds leaders most responsible
➡️ Daughters' sin grew from men's corruption

## 😶 The People That Doth Not Understand Shall Fall

Doth not understand points back to the lack of knowledge named in verse six.

Understanding here means recognizing right from wrong before God, not simple intelligence.

A nation that stopped listening to God eventually stops being able to hear Him at all.

This verse closes the section exactly where it started, with a people who no longer know God.

😶 Understand means knowing right from wrong
🔁 This recalls the lack of knowledge
🙉 They stopped being able to hear God
📖 The chapter circles back to its start

# Hosea 4:15-16
# 🐄 A Warning To Judah, A Stubborn Heifer
---
## 🙅 Though Thou, Israel, Play The Harlot, Yet Let Not Judah Offend

Israel here means the northern kingdom, the ten tribes that split off earlier.

Judah is the separate southern kingdom, warned not to copy this same sin.

Play the harlot again pictures spiritual unfaithfulness, not literal prostitution alone.

One kingdom's failure was meant to be a warning, not an example to follow.

🙅 Israel means the northern ten tribes
🏞️ Judah is the separate southern kingdom
💔 Play the harlot pictures unfaithfulness to God
📖 One kingdom's failure warns the other

## 🚫 Come Not Ye Unto Gilgal, Neither Go Ye Up To Bethaven

Gilgal was once a holy site tied to Israel's entrance into the promised land.

By this point it had become a center for corrupt worship instead.

Bethaven is a mocking nickname, swapping Bethel's meaning of house of God.

Bethaven instead means house of trouble, or house of wickedness.

Even the place names in this verse carry a warning.

🏞️ Gilgal once marked entering the promised land
🛐 It had become a site of corrupt worship
🏠 Bethaven mocks Bethel's name, house of God
📖 Bethaven instead means house of trouble

## 🤐 Nor Swear, The LORD Liveth

Swearing by the LORD's name should mean total honesty before Him.

Here the people use God's own name while living in open unfaithfulness.

The oath had become empty words, disconnected from any real loyalty.

God would rather hear silence than a hollow promise using His name.

🤐 Swearing by God's name means honesty
😶 They used His name in open unfaithfulness
🕳️ The oath had become empty words
📖 God prefers silence over a hollow promise

## 🐄 For Israel Slideth Back As A Backsliding Heifer

A heifer is a young cow, and a backsliding one refuses to go the way it is led.

This pictures Israel stubbornly resisting God's direction, pulling away at every turn.

The image is not a gentle wandering but active, repeated resistance.

Stubbornness here is not a one time stumble, it is a pattern.

🐄 A heifer is a stubborn young cow
🚫 Israel resists God's direction at every turn
🔁 This is repeated resistance, not one stumble
📖 Stubbornness here is a settled pattern

## 🐑 Now The LORD Will Feed Them As A Lamb In A Large Place

This line is likely ironic rather than comforting.

A lamb in a large, open place has no shepherd watching close by.

It stands exposed, wandering, and vulnerable to danger on every side.

The coming exile would leave Israel scattered this same way, without real protection.

🐑 This line is likely ironic, not comforting
🌾 A lamb in open land lacks a shepherd
⚠️ It stands exposed and vulnerable to danger
📖 Exile would leave Israel scattered this way

# Hosea 4:17-19
# 💨 Ephraim Given Over To Idols
---
## 🗿 Ephraim Is Joined To Idols: Let Him Alone

Ephraim was the largest and most powerful tribe in the northern kingdom.

Its name is often used to stand in for the whole nation of Israel.

Joined to idols pictures a bond that will not easily be broken.

Let him alone is not permission, it is God giving up active correction.

Sometimes judgment looks like God stepping back, not stepping in.

🗿 Ephraim stands in for the whole nation
🔗 Joined to idols pictures an unbreakable bond
✋ Let him alone means God stepping back
📖 Judgment can look like being left alone

## 🍷 Their Drink Is Sour

This pictures a feast that has gone bad, not a minor inconvenience.

What should have been a joyful celebration has turned stale and spoiled.

The spoiled drink mirrors the spoiled worship happening throughout this whole chapter.

Even their celebrations carried the same rot as their religion.

🍷 This pictures a feast gone bad
🎉 A joyful celebration turned stale and spoiled
🪞 Spoiled drink mirrors the spoiled worship
📖 Their celebrations carried the same rot

## 🔁 They Have Committed Whoredom Continually

Continually means this was not a single lapse or a passing season.

The unfaithfulness in this chapter had become a constant, repeated pattern.

Each warning earlier in the chapter had already described the same ongoing problem.

By now the sin was simply how the nation lived, not an exception to it.

🔁 Continually means constant, not occasional
📆 This had become their repeated pattern
📜 Earlier warnings already described this problem
📖 Sin had become how the nation lived

## 💰 Her Rulers With Shame Do Love, Give Ye

Give ye was likely a demand rulers made for bribes or payment.

These leaders loved that shameful gain more than honest leadership.

Shame here does not mean the rulers felt embarrassed.

It means their actions brought disgrace, whether they felt it or not.

💰 Give ye was likely a demand for bribes
👑 Rulers loved shameful gain over honest leadership
😳 Shame means disgrace, not embarrassment felt
📖 Their actions brought shame either way

## 💨 The Wind Hath Bound Her Up In Her Wings

This pictures a bird suddenly caught and swept away by a strong wind.

Israel is compared to that bird, carried off without warning.

The image points forward to the coming exile under Assyria.

Their own sacrifices will bring shame instead of help.

The false gods they trusted could never actually save them.

💨 Wind bound up pictures a bird swept away
🦅 Israel is compared to that caught bird
⚔️ This points forward to exile under Assyria
📖 Their trusted gods could not save them
`.trim();

export const HOSEA_FOUR_PERSONAL_SECTIONS = parseHoseaFourRawNotes(HOSEA_FOUR_RAW_NOTES);
