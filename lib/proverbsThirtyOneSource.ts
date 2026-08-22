export type ProverbsThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsThirtyOneRawNotes(rawText: string): ProverbsThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 31:${startVerse}` : `Proverbs 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Proverbs 31 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_THIRTY_ONE_RAW_NOTES = `# Proverbs 31:1-3
# 👑 A Mother's Instruction To The King
---
## 👑 King Lemuel

Lemuel appears only in this one chapter of the whole Bible.

The name likely means devoted to God or belonging to God.

No outside record explains exactly which king carried it.

Some old Jewish tradition connects the name to Solomon himself.

The mystery does not weaken the wisdom that follows it.

👑 Lemuel appears only in this chapter
🌍 No record confirms exactly who he was
📜 Jewish tradition links the name to Solomon
📖 The mystery does not weaken the wisdom

## 📜 The Prophecy That His Mother Taught Him

"Prophecy" here carries the same meaning it carried in the chapter just before this one.

It translates a word for a burden, a weighty message someone feels compelled to speak.

This whole chapter preserves a mother's spoken teaching to her royal son.

That makes it one of the only places in the Bible where a mother's own words become scripture.

📜 Prophecy again means a weighty burden
👩 A queen mother teaches her royal son
📚 Few Bible passages record a mother's words
📖 Her wisdom became scripture for a king

## 🙏 The Son Of My Vows

"My son" is repeated three times in this one verse alone.

That repetition shows deep urgency, a mother pleading for her son to truly listen.

"The son of my vows" points to a promise she made to God about this child.

Hannah made a similar vow before Samuel was even born.

A vowed child was received as a direct gift from God, not simply a birth.

🙏 My son repeats three times for urgency
🤱 The son of my womb names her labor
📿 Her vows recall Hannah's promise for Samuel
📖 This child was received as God's gift

## 💔 Give Not Thy Strength Unto Women

This is a direct warning against giving in to sexual excess.

"Strength" pictures the vigor and resources a king needs to rule well.

Handing that strength to women here means letting desire control his choices.

Solomon himself later fell into exactly this trap.

He married many wives who turned his heart away from God.

A king's greatest danger was sometimes his own appetite, not an enemy army.

💔 Strength pictures a king's vigor and resources
😔 Desire can quietly control royal decisions
👑 Solomon later fell into this exact trap
📖 Appetite can threaten a king more than enemies

# Proverbs 31:4-7
# 🍷 A Warning About Wine For Rulers
---
## 🍷 It Is Not For Kings To Drink Wine

This is not a total ban on wine anywhere in Israel.

It is a specific warning aimed at kings and rulers.

A king's mind must stay clear to judge with justice.

Clouded judgment from a ruler can harm an entire nation.

The warning covers strong drink too, a fermented drink stronger than wine.

🍷 This warns kings specifically, not everyone
⚖️ A ruler's mind must stay clear
🍺 Strong drink means a drink stronger than wine
📖 One ruler's judgment can affect a nation

## ⚖️ Pervert The Judgment Of Any Of The Afflicted

"Pervert" means twist something fair into something crooked.

"The afflicted" refers to people already suffering, the ones most in need of a fair ruling.

A drunk king could easily rule against the very people who most needed his protection.

That risk alone was reason enough for this warning to exist.

⚖️ Pervert means twisting fairness into crookedness
😢 The afflicted are people already suffering
🍷 Drunkenness risked harming those needing protection
📖 Clear judgment protects the vulnerable most

## 🍶 Give Strong Drink Unto Him That Is Ready To Perish

This verse shifts from warning kings to permitting something for others.

Wine and strong drink here are offered as comfort, not as a reward.

"Ready to perish" points to someone facing death or overwhelming suffering.

The same drink that endangers a ruler's judgment can ease a dying person's pain.

Wisdom is not one rule for every situation, but the right response for each one.

🍶 This verse shifts from warning to comfort
💀 Ready to perish means facing death or suffering
⚖️ The same drink serves different purposes
📖 Wisdom fits the situation, not one fixed rule

## 😔 Forget His Poverty, And Remember His Misery No More

"Forget" and "remember no more" describe the same relief pictured two ways.

This is not encouragement to drink away every problem in life.

It described a narrow, compassionate use for those in the deepest distress.

The mother's larger point still stands, a ruler's own mind must stay clear.

😔 Forget and remember describe the same relief
🍷 Not a call to drink away problems
🤲 It named comfort for the deeply distressed
📖 A ruler still needs to stay clear headed

# Proverbs 31:8-9
# 🗣️ Speak For Those Who Cannot Speak
---
## 🗣️ Open Thy Mouth For The Dumb

"The dumb" here does not only mean someone physically unable to speak.

It describes anyone without the power or standing to defend themselves.

A king's voice could carry legal weight that a poor person's voice could not.

Lemuel's mother tells him to use that power on behalf of others.

🗣️ Dumb means unable to defend themselves
⚖️ A king's words carried real legal weight
🤲 His mother calls him to help others
📖 Power was meant to protect the powerless

## ⚖️ Plead The Cause Of The Poor And Needy

"Judge righteously" means ruling by what is fair, not by bribes or favoritism.

"Plead the cause" pictures actively arguing on behalf of someone in court.

The poor and needy often had no one else able to speak for them.

This closes the mother's advice before the poem about the ideal woman begins.

⚖️ Judge righteously means no bribes or favoritism
🗣️ Plead the cause means arguing for someone
🤲 The poor often had no other advocate
📖 A king's justice was meant to protect them

# Proverbs 31:10-12
# 💎 Who Can Find A Virtuous Woman
---
## 💎 Who Can Find A Virtuous Woman

The Hebrew word behind "virtuous" is the same word often used for a mighty warrior.

It means strength and capability, not only moral goodness.

The question itself signals that a woman like this is rare and hard to find.

The rest of the poem exists to describe exactly what that strength looks like in daily life.

💎 Virtuous translates a word for a mighty warrior
💪 It means strength and capability, not only goodness
❓ The question signals how rare this woman is
📖 The poem describes what that strength looks like

## 💰 Her Price Is Far Above Rubies

Rubies were rare, costly stones prized across the ancient world.

Saying her price is "far above" them means no amount of wealth could buy what she offers.

This is not about buying a wife like property.

It is about the immense, immeasurable value of her character and skill.

💎 Rubies were rare and costly stones
💰 Far above means beyond any price tag
🚫 This is not about buying a person
📖 Her true worth is character and skill

## 🤝 He Shall Have No Need Of Spoil

"Spoil" means plunder, goods taken by force, often from war or raiding.

A husband with a wife like this has no need to seek gain that way.

Her skill at managing the household already produces more than enough.

Trust here is not only emotional.

It is entirely practical too.

🤝 Spoil means plunder taken by force
🏠 Her management already produces enough
💍 His trust in her is deeply practical
📖 Her skill removes any need to take

## 🌤️ She Will Do Him Good And Not Evil

This verse widens the picture from one moment to a whole lifetime.

"All the days of her life" means this was not a season, but a pattern.

Good and evil here describe faithfulness itself, not single actions.

Consistency over decades is the real point being praised.

🌤️ This covers a whole lifetime, not one moment
📆 All the days means a lasting pattern
⚖️ Good and evil describe faithfulness itself
📖 Decades of consistency is what is praised

# Proverbs 31:13-15
# 🧶 Her Hands Are Never Idle
---
## 🧶 She Seeketh Wool, And Flax

Wool and flax were the two basic raw materials used to make cloth in ancient Israel.

Wool came from sheep, and flax was a plant spun into linen.

"Seeketh" shows she actively searches out good raw material rather than waiting for it to arrive.

"Worketh willingly" means she does this work with real eagerness, not forced obligation.

🧶 Wool and flax made ancient cloth
🐑 Wool came from sheep, flax from a plant
🔍 Seeketh shows she actively searches for good material
📖 Willingly means eagerness, not forced obligation

## 🚢 She Is Like The Merchants' Ships

Merchant ships traveled far to bring back goods not available locally.

Comparing her to a ship pictures resourcefulness that reaches beyond her own household.

She gathers food and provisions the way a trading ship gathers cargo from distant ports.

This is not passive waiting.

It is active, far reaching effort.

🚢 Merchant ships traveled far for goods
🌊 The comparison pictures wide reaching resourcefulness
🍞 She gathers food like cargo from distant ports
📖 Her effort reaches beyond her own household

## 🌙 She Riseth While It Is Yet Night

She begins her work before the sun even comes up.

"Meat" here means food in general, not specifically animal flesh.

She feeds her whole household first.

She also gives a portion to her own maidens.

Caring for her servants shows this was leadership, not just personal discipline.

🌙 She rises before the sun comes up
🍽️ Meat here means food in general
👪 She feeds the whole household first
📖 Caring for servants shows real leadership

# Proverbs 31:16-18
# 🌱 A Field, A Vineyard, And A Business
---
## 🌱 She Considereth A Field, And Buyeth It

"Considereth" means she evaluates carefully before acting, not on impulse.

Buying land and property was normally a decision made by the man of the house.

Here she acts as an independent economic decision maker herself.

"With the fruit of her hands she planteth a vineyard" shows her own earnings funding the purchase.

🌱 Considereth means careful evaluation, not impulse
🏠 Land purchases were normally a man's decision
💪 She acts as her own decision maker
📖 Her own earnings funded the vineyard

## 💪 Girdeth Her Loins With Strength

To "gird the loins" meant tucking a long robe up into the belt.

That freed the legs for hard, fast physical work.

The picture is practical readiness, not a figure of speech about attitude alone.

"Strengtheneth her arms" pairs with it, picturing real physical labor, not just management from a distance.

💪 Girding loins meant tucking a robe up
🏃 It freed the legs for hard work
🖐️ This pictures real physical readiness
📖 She worked hands on, not just managed

## 🕯️ Her Candle Goeth Not Out By Night

"Candle" in the King James translation actually means an oil lamp, not a wax candle.

A lamp burning late into the night pictures ongoing diligence and preparedness.

She perceives her own merchandise is good, meaning she already knows her work has real value.

Confidence here comes from proven skill, not simple guessing.

🕯️ Candle here actually means an oil lamp
🌙 A late burning lamp pictures ongoing diligence
✅ She already knows her work has value
📖 Her confidence comes from proven skill

# Proverbs 31:19-21
# 🧵 Her Hands Give As Well As They Work
---
## 🧵 Her Hands Hold The Distaff

A "distaff" held the raw, unspun fiber ready for spinning.

The "spindle" was the tool that twisted that fiber into usable thread.

Together they describe hand spinning, a slow and skillful craft.

This detail grounds the whole poem in real, physical daily labor.

🧵 A distaff held raw unspun fiber
🌀 The spindle twisted fiber into thread
🧶 Together they describe hand spinning craft
📖 This grounds the poem in real labor

## 🤲 She Stretcheth Out Her Hand To The Poor

The same hands busy with wool, flax, and spindle also open to give.

Her productivity was never only for her own household's benefit.

"Reacheth forth her hands to the needy" repeats the image for emphasis.

Wealth here flows outward, not just inward.

🤲 The same busy hands also give freely
🏠 Her work was not only for herself
🔁 The image repeats twice for emphasis
📖 Her wealth flowed outward, not just inward

## ❄️ Not Afraid Of The Snow For Her Household

Snow in this region meant real cold that could threaten an unprepared family.

"Scarlet" describes wool dyed a deep red, both warm and costly.

Her household is doubly protected, warm clothing and no fear of the season.

Preparation ahead of time removes fear before it even starts.

❄️ Snow meant real seasonal danger here
🧣 Scarlet describes warm, costly dyed wool
🛡️ Her household stayed warm and protected
📖 Preparation removes fear before it starts

# Proverbs 31:22-24
# 👗 Silk, Purple, And A Husband Known In The Gates
---
## 👗 Her Clothing Is Silk And Purple

Purple dye in the ancient world came from a rare sea snail and cost enormous sums.

Only royalty and the very wealthy could normally afford true purple cloth.

She does not simply buy this status symbol.

She makes her own tapestries and coverings by hand.

Her wealth here comes from skill, not simply from her husband's position.

👗 Purple dye came from a rare sea snail
👑 Normally only royalty could afford true purple
🧵 She makes her own coverings by hand
📖 Her wealth comes from skill, not status

## 🏛️ Her Husband Is Known In The Gates

City gates were where elders gathered to judge disputes and conduct public business.

Being "known" there meant holding real respect and standing in the community.

Her skill at running the household freed him to serve there without worry.

His public honor rests, in part, on her private diligence.

🏛️ City gates were where elders gathered publicly
⚖️ Being known there meant real public respect
🏠 Her management freed him to serve there
📖 His public honor rests on her diligence

## 💼 She Maketh Fine Linen, And Selleth It

She does not only clothe her own family.

She produces enough fine linen to sell directly to merchants.

"Girdles" were belts or sashes, another product she delivers for trade.

This is a real business, run by her own hands, generating income outside the home.

💼 She sells fine linen beyond her family
🧣 Girdles were belts sold as trade goods
📈 This describes a real business she runs
📖 Her income reached beyond her own home

# Proverbs 31:25-27
# 💪 Strength, Wisdom, And A Household Well Kept
---
## 💪 Strength And Honour Are Her Clothing

This verse shifts from literal clothing to a metaphor.

Silk and purple described what she wears on her body.

Strength and honour describe her actual character instead.

Both kinds of clothing come from the same source, her own hard work.

💪 This shifts from literal to metaphorical clothing
👗 Earlier verses described her physical clothing
🎖️ Now the poem describes her character
📖 Both kinds of clothing came from her work

## 🌅 She Shall Rejoice In Time To Come

Most people fear an uncertain future.

Her confidence comes from years of preparation already put in.

She has already stored food, built income, and cared for her household well.

That kind of readiness turns fear of tomorrow into simple joy.

🌅 Most people fear an uncertain future
📦 Her confidence rests on years of preparation
😊 Readiness replaces fear with real joy
📖 Preparation turns tomorrow into something to welcome

## 🗣️ The Law Of Kindness Is In Her Tongue

"The law of kindness" pictures kindness as a settled rule she lives by, not an occasional mood.

Wisdom alone was not the whole picture.

Her speech combines real insight with real gentleness.

Few people manage to hold both together consistently.

🗣️ Kindness here means a settled rule
🧠 Wisdom alone was not the whole picture
💛 Her speech combines insight with gentleness
📖 Few people hold both together consistently

## 🏠 Eateth Not The Bread Of Idleness

"The bread of idleness" is an idiom picturing food eaten without earning it through work.

She refuses that path entirely.

"Looketh well to the ways of her household" means she stays alert to everything happening under her roof.

Her diligence runs through the entire poem, from sunrise to nightfall.

🏠 Bread of idleness pictures unearned food
🚫 She refuses that path entirely
👀 She stays alert to her whole household
📖 Her diligence runs through the whole poem

# Proverbs 31:28-31
# 📣 Let Her Own Works Praise Her
---
## 👪 Her Children Arise Up, And Call Her Blessed

This is not her own claim about herself.

It is her family's own testimony, spoken freely.

Children and husband both offer praise, not just one voice alone.

Her worth is confirmed by the people who know her best.

👪 This is her family's own testimony
🗣️ Both children and husband offer praise
🏠 The people closest to her confirm her worth
📖 Real worth shows in how family speaks

## 💬 Thou Excellest Them All

This line quotes the husband's own words directly.

"Many daughters" refers to women broadly, not literal sisters.

He is not comparing her to a small group, but to women everywhere.

Placing his exact words inside the poem makes the praise feel personal and immediate.

💬 This quotes the husband's own words
👩 Daughters here means women broadly
🌍 He compares her to women everywhere
📖 His exact words make the praise personal

## ⚖️ Favour Is Deceitful, And Beauty Is Vain

"Favour" here means outward charm, the kind that wins quick approval.

"Vain" means empty or fleeting, not evil in itself.

Both charm and beauty fade or mislead over time.

The poem has praised skill and character for thirty verses before finally naming what does not last.

⚖️ Favour here means outward, winning charm
💨 Vain means empty or fleeting, not evil
⏳ Both charm and beauty fade over time
📖 The poem saves this warning for last

## 🙏 A Woman That Feareth The LORD, She Shall Be Praised

This line is the thesis the entire poem has been building toward.

"Feareth the LORD" means deep reverence, not being frightened of God.

Every skill, every business deal, and every act of kindness flowed from that reverence first.

Character rooted in God outlasts charm and beauty every time.

🙏 This line is the poem's real thesis
❤️ Feareth the LORD means deep reverence
🌊 Every skill flowed from that reverence first
📖 God rooted character outlasts charm and beauty

## 📣 Let Her Own Works Praise Her In The Gates

"The gates" already appeared earlier, where her husband was known and respected.

Now the poem calls for her to be honored in that very same public place.

"Give her of the fruit of her hands" asks that she be paid from her own earnings.

The poem ends where it began, with real honor instead of empty flattery.

📣 The gates already appeared earlier in the poem
🏛️ Now she is honored in that same place
💰 She is rewarded from her own earnings
📖 The poem ends on real honor, not flattery
`.trim();

export const PROVERBS_THIRTY_ONE_PERSONAL_SECTIONS = parseProverbsThirtyOneRawNotes(PROVERBS_THIRTY_ONE_RAW_NOTES);
