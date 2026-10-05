export type HoseaSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaSevenRawNotes(rawText: string): HoseaSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 7:${startVerse}` : `Hosea 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Hosea 7 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_SEVEN_RAW_NOTES = `# Hosea 7:1-3
# 🩺 Healing Offered, Sin Uncovered
---
## 🩺 When I Would Have Healed Israel

This picks up right where chapter six left off.

Israel had just promised to return and seek the LORD.

Healed here means far more than curing a physical sickness.

It means restoring the whole relationship that sin had broken.

God stood ready to do exactly that.

The rest of this chapter explains why healing could not happen yet.

🩺 Healed means restoring the whole relationship
🔁 This continues right where chapter six ended
🙏 God stood ready to heal His people
📖 This chapter explains why healing stalled

## 🔍 The Iniquity Of Ephraim Was Discovered, And The Wickedness Of Samaria

Discovered does not mean God only just found out about something new.

God already knew everything Israel had done.

Discovered means the sin was finally exposed out in the open.

Ephraim was the leading tribe of the northern kingdom.

Samaria was that kingdom's capital city.

Naming both shows the corruption reached every level of national life.

🔍 Discovered means exposed, not newly learned
🏞️ Ephraim was the leading tribe of Israel
🏛️ Samaria was the kingdom's capital city
📖 Corruption reached every level of national life

## 🕵️ The Thief Cometh In, And The Troop Of Robbers Spoileth Without

They commit falsehood sets up these two pictures of lawlessness.

A thief works quietly from inside a house or city.

A troop of robbers attacks openly from outside its walls.

Spoileth means stealing and plundering, not just causing damage.

Together the two pictures mean no one was safe anywhere, inside or out.

🕵️ A thief works quietly from inside
⚔️ A troop of robbers attacks from outside
💰 Spoileth means stealing and plundering
📖 No one was safe anywhere in Israel

## 💭 They Consider Not In Their Hearts That I Remember All Their Wickedness

Consider means stopping to think something through honestly.

Israel kept sinning without ever pausing to examine itself.

Remember does not mean God simply recalls facts from storage.

It means God holds people responsible for everything He remembers.

A people who never reflect will not notice they need to change.

💭 Consider means stopping to really think
🙈 Israel sinned without examining itself
🧮 Remember means God holds people responsible
📖 A people who never reflect will not change

## 🔄 Their Own Doings Have Beset Them About

Beset about pictures something closing in from every side.

Israel's own choices had become the trap surrounding it.

This was not an outside enemy closing in first.

Sin itself had become the danger on every side.

🔄 Beset about means closing in from every side
🪤 Israel's own choices became its own trap
🚫 No outside enemy caused this first
📖 Sin itself became the danger

## 👁️ They Are Before My Face

This restates the same point made earlier in this verse.

Nothing Israel had done ever happened outside of God's sight.

Before my face pictures standing directly in front of someone.

There was nowhere for their wickedness to hide.

👁️ Before my face means directly in God's sight
🚫 Nothing Israel did was hidden from Him
📍 This restates a point made earlier
📖 There was nowhere for their sin to hide

## 😈 They Make The King Glad With Their Wickedness, And The Princes With Their Lies

This describes corrupt political life inside Israel's royal court.

Officials pleased the king through wicked schemes, not honest counsel.

They pleased the princes through lies instead of truth.

Loyalty to a corrupt government had replaced loyalty to God.

😈 Officials pleased the king with wicked schemes
🤥 They pleased the princes through lies
👑 This describes a corrupt royal court
📖 Loyalty to government had replaced loyalty to God

# Hosea 7:4-7
# 🔥 A Nation As Hot As An Oven
---
## 🔥 They Are All Adulterers, As An Oven Heated By The Baker

Adulterers here pictures Israel's unfaithfulness to God, echoing Hosea's own marriage.

Idolatry in this book is described again and again as marital unfaithfulness.

An oven heated by a baker became the image for burning, out of control desire.

The comparison is about passion that will not stay controlled.

🔥 Adulterers pictures unfaithfulness to God
💍 Hosea repeatedly compares idolatry to adultery
🍞 An oven heated by a baker pictures desire
📖 Their desire would not stay controlled

## ⏳ Who Ceaseth From Raising After He Hath Kneaded The Dough, Until It Be Leavened

A baker in this culture let dough sit and rise before baking it.

Raising here refers to that quiet waiting period, not standing up.

During that wait the oven itself kept building heat the whole time.

The picture is desire quietly building even while nothing looks urgent.

That hidden buildup makes the sudden burning in verse six less surprising.

🍞 Bakers let dough rest before baking it
⏳ Raising describes that quiet waiting period
🔥 The oven kept building heat during the wait
📖 Desire was quietly building the whole time

## 🍷 The Princes Have Made Him Sick With Bottles Of Wine

This describes a royal celebration that spiraled into drunkenness.

The princes were the king's own officials, not foreign guests.

Made him sick means they got the king drunk on purpose.

Leadership had traded sober judgment for parties that served its own corruption.

🍷 Princes got the king drunk on purpose
👑 These were the king's own officials
🥴 Made him sick means drunk, not ill
📖 Leadership traded judgment for corruption

## 🤝 He Stretched Out His Hand With Scorners

Scorners describes people who openly mock what is right and honest.

Stretched out his hand here pictures joining hands in friendship or alliance.

The king chose to align himself with mockers instead of correcting them.

A leader's company reveals what he actually values.

😏 Scorners mock what is right and honest
🤝 Stretched out his hand pictures joining with them
👑 The king aligned with mockers, not correction
📖 A leader's company reveals his values

## 🔥 They Have Made Ready Their Heart Like An Oven, Whiles They Lie In Wait

This returns to the oven image from verse four with a darker edge.

Lie in wait pictures planning harm quietly before acting on it.

Their heart being ready like an oven means their anger was already prepared.

Nothing about this plot was sudden or accidental.

🔥 This returns to the oven image again
🤫 Lie in wait means planning harm quietly
💢 Their heart was already prepared to act
📖 Nothing about this plot was sudden

## 🌙 Their Baker Sleepeth All The Night, In The Morning It Burneth As A Flaming Fire

The baker sleeping does not mean the danger paused overnight.

The oven kept heating on its own the whole time he rested.

By morning the heat had grown into a full flaming fire.

Anger and plotting left alone overnight only grow stronger, not weaker.

🌙 The baker sleeping did not pause the danger
🔥 The oven kept heating through the night
☀️ By morning it had become a flaming fire
📖 Anger left alone only grows stronger

## ⚔️ They Are All Hot As An Oven, And Have Devoured Their Judges

This is the third use of the oven image in just four verses.

Devoured their judges likely means violently removing the nation's own leaders.

Judges here were the officials responsible for settling disputes.

A nation this unstable began destroying the very people meant to govern it.

🔥 This is the third oven image used here
⚔️ Devoured their judges means violently removing leaders
⚖️ Judges settled disputes and kept order
📖 The nation destroyed its own government

## 👑 All Their Kings Are Fallen, There Is None Among Them That Calleth Unto Me

The northern kingdom saw a fast, violent turnover of kings in its final decades.

Several of those kings were removed through assassination, not natural death.

None of that chaos ever drove anyone to actually call on God.

Crisis alone does not produce real repentance.

👑 Israel's final kings fell in rapid succession
🗡️ Several were removed through assassination
🙏 None of it drove anyone to pray
📖 Collapse alone cannot force repentance

# Hosea 7:8-10
# 🍞 Ephraim, A Cake Not Turned
---
## 🌍 Ephraim, He Hath Mixed Himself Among The People

The people here refers to the surrounding pagan nations, not Israel's own tribes.

Mixed himself pictures blending in through political alliances and foreign customs.

Israel was meant to stay distinct as God's own set apart people.

Instead the nation dissolved its own identity into the nations around it.

🌍 The people means the surrounding pagan nations
🤝 Mixed himself pictures blending through alliances
🏞️ Israel was meant to stay set apart
📖 The nation dissolved its own identity

## 🥞 Ephraim Is A Cake Not Turned

Flatbread baked on a hot stone had to be flipped at the right moment.

A cake left unturned burns on one side while staying raw on the other.

The picture describes a nation ruined on one side and unfinished on the other.

Israel had become no use at all, inside or out.

🥞 Flatbread had to be flipped on time
🔥 Unturned bread burns on one side
🍞 This pictures a nation ruined and unfinished
📖 Israel had become no use at all

## 💪 Strangers Have Devoured His Strength, And He Knoweth It Not

Strangers here means foreign powers draining Israel through tribute and alliance.

Devoured his strength pictures resources and power being slowly used up.

Knoweth it not means Israel did not even notice the loss happening.

Decline is often invisible to the nation living through it.

🌍 Strangers means foreign powers draining Israel
💪 Devoured his strength means resources used up
🙈 Israel did not even notice the loss
📖 Decline is often invisible from the inside

## 👴 Gray Hairs Are Here And There Upon Him, Yet He Knoweth Not

Gray hair pictures aging and the loss of strength that comes with it.

Here and there suggests the signs were scattered, not yet obvious as a whole.

Israel was growing old and weak as a nation without realizing it.

Small warning signs are easy to miss one at a time.

👴 Gray hairs picture aging and weakness
🔍 Here and there means scattered, easy signs
🙈 Israel did not realize it was declining
📖 Small warning signs are easy to miss

## 👑 The Pride Of Israel Testifieth To His Face

This exact phrase about pride testifying also appears later in this book.

Testifieth means the evidence speaks for itself, like a witness in court.

Israel's own arrogance was the proof standing against it.

Pride here blinded the nation to how serious its decline really was.

⚖️ Testifieth means acting like a witness in court
👑 Israel's own pride was the evidence against it
🙈 Pride blinded the nation to its decline
📖 The nation's arrogance spoke against itself

## 🙏 They Do Not Return To The LORD Their God, Nor Seek Him For All This

For all this points back to every warning sign just listed.

Foreign drain, fading strength, and visible decline still were not enough.

Return and seek both describe actions, not just a feeling of regret.

Knowing something is wrong is not the same as turning back to God.

📋 For all this points to every sign listed
🌍 Even visible decline did not bring change
🙏 Return and seek describe action, not just regret
📖 Knowing something is wrong is not turning back

# Hosea 7:11-13
# 🕊️ A Dove Without Sense, Trapped By Its Own Flight
---
## 🕊️ Ephraim Also Is Like A Silly Dove Without Heart

Heart here means good sense and judgment, not emotion.

A dove was seen in this culture as an easily confused, poor deciding bird.

Without heart means Israel kept making choices with no real wisdom behind them.

The comparison is not flattering, and it was not meant to be.

🧠 Heart here means good sense, not emotion
🕊️ Doves were seen as easily confused birds
🙈 Israel kept making choices with no wisdom
📖 This comparison was not meant to flatter

## 🌍 They Call To Egypt, They Go To Assyria

Egypt and Assyria were the two major powers pulling at Israel from opposite directions.

Israel kept switching alliances between them instead of trusting God for protection.

This back and forth already appeared as a pattern earlier in this book.

Looking everywhere except to God was the real problem underneath it.

🌍 Egypt and Assyria were the two major powers
🔄 Israel kept switching alliances between them
📜 This pattern already appeared earlier in Hosea
📖 The real problem was not trusting God

## 🕸️ I Will Spread My Net Upon Them, I Will Bring Them Down As The Fowls Of The Heaven

The dove image from verse eleven continues directly into this picture.

A net was the ordinary tool used to catch wild birds in this period.

Fowls of the heaven simply means birds caught in flight.

Their own flight toward Egypt and Assyria was flying straight into the trap.

🕊️ This continues the dove image from verse eleven
🕸️ A net was the ordinary tool for birds
🦅 Fowls of the heaven means birds in flight
📖 Their own flight led into the trap

## ⚠️ I Will Chastise Them, As Their Congregation Hath Heard

Chastise means discipline meant to correct, not punishment for its own sake.

Congregation here means the assembled nation gathered to hear God's word.

As their congregation hath heard points back to warnings already given through the prophets.

None of this judgment would come as a surprise to anyone paying attention.

⚠️ Chastise means correction, not punishment alone
👥 Congregation means the gathered nation
📜 This points back to warnings already given
📖 This judgment would not be a surprise

## 😢 Woe Unto Them! For They Have Fled From Me

Woe is a cry of grief, closer to mourning than anger.

Fled from me pictures running away on purpose, not simply drifting.

God is grieving a relationship Israel actively chose to leave.

This is sorrow speaking before judgment, not judgment without feeling.

😢 Woe is a cry of grief, not anger
🏃 Fled means running away on purpose
💔 God grieves a relationship Israel chose to leave
📖 Sorrow speaks here before judgment does

## 💔 Though I Have Redeemed Them, Yet They Have Spoken Lies Against Me

Redeemed means God had already rescued Israel in the past, especially from Egypt.

This makes their betrayal even harder to justify.

Spoken lies against me likely includes crediting other gods for God's own rescue.

Rescued people still chose to lie about who actually rescued them.

🙏 Redeemed means God had already rescued Israel
🏺 This likely points back to the exodus
🗿 They credited other gods for God's rescue
📖 Rescued people still lied about their rescuer

# Hosea 7:14-16
# 🏹 A Deceitful Bow That Cannot Be Trusted
---
## 😭 They Have Not Cried Unto Me With Their Heart, When They Howled Upon Their Beds

Howled describes loud, visible distress, possibly during a ritual mourning for crops or rain.

The noise looked like crying out to God from the outside.

With their heart means the words never actually meant what they sounded like.

Loud emotion is not the same thing as real prayer.

😭 Howled describes loud, visible distress
🎭 It looked like crying out to God
🧠 With their heart means it was not sincere
📖 Loud emotion is not the same as prayer

## 🌾 They Assemble Themselves For Corn And Wine, And They Rebel Against Me

This likely points to pagan harvest rituals tied to Baal worship.

Corn and wine represent the crops those rituals were meant to secure.

Gathering for the ritual is named in the very same breath as rebelling against God.

Worship aimed at the wrong source is still rebellion, even when it looks religious.

🌾 Corn and wine point to pagan harvest rituals
🗿 These rituals were tied to Baal worship
🙏 Gathering for it is named as rebellion
📖 Worship aimed wrong is still rebellion

## 💪 Though I Have Bound And Strengthened Their Arms, Yet Do They Imagine Mischief Against Me

Bound and strengthened arms pictures God equipping Israel with real strength and skill.

This likely points to ability in battle or other practical skill God had given the nation.

Imagine mischief means they planned harm, including turning against God Himself.

Strength God provides can be turned against the very God who gave it.

💪 Bound and strengthened arms pictures given strength
⚔️ This likely points to skill in battle
😈 Imagine mischief means planning harm on purpose
📖 Given strength was turned against the giver

## 🙏 They Return, But Not To The Most High

Return here echoes the same word used back in chapter six.

There the people promised to return to the LORD completely.

Here any returning that happened never actually reached God Himself.

Motion without a true destination is not real repentance.

🔁 Return echoes the promise back in chapter six
🙏 That promise was to return fully
🚫 This returning never actually reached God
📖 Motion without a destination is not repentance

## 🏹 They Are Like A Deceitful Bow

A deceitful bow looks ready to fire accurately but is actually warped.

It misses its target no matter how carefully it is aimed.

Israel looked capable of loyalty but could not actually deliver it.

Appearance and reliability were never the same thing for this nation.

🏹 A deceitful bow looks ready but is warped
🎯 It misses its target even when aimed well
🙈 Israel looked loyal but could not deliver it
📖 Appearance and reliability were never the same

## 🗡️ Their Princes Shall Fall By The Sword For The Rage Of Their Tongue

Rage of their tongue points back to the lies and mockery already named in this chapter.

Reckless, prideful speech here leads directly to a violent downfall.

Leadership that ruled by lies would not survive by the sword either.

Words and consequences stayed connected the whole way through.

🗣️ Rage of their tongue points to earlier lies
🗡️ Reckless speech led to a violent downfall
👑 Leadership built on lies could not survive
📖 Words and consequences stayed connected

## 😏 This Shall Be Their Derision In The Land Of Egypt

Derision means being mocked and laughed at openly.

Egypt was one of the very nations Israel had tried to lean on for help.

The ally Israel trusted would end up mocking its downfall instead.

Trusting the wrong source for security ends in humiliation, not safety.

😏 Derision means being mocked openly
🌍 Egypt was a nation Israel leaned on
🙈 That ally mocked Israel's downfall instead
📖 Trusting the wrong source ends in humiliation
`.trim();

export const HOSEA_SEVEN_PERSONAL_SECTIONS = parseHoseaSevenRawNotes(HOSEA_SEVEN_RAW_NOTES);
