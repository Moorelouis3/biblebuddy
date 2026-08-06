export type DeuteronomyTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyTwoRawNotes(rawText: string): DeuteronomyTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 22:${startVerse}` : `Deuteronomy 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 22 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_TWO_RAW_NOTES = `# Deuteronomy 22:1-4
# 🐑 Caring For A Neighbor's Stray Animal
---
## 🙈 Go Astray, And Hide Thyself From Them

"Hide thyself" does not mean physically hiding.

It means noticing a problem and choosing to ignore it.

A neighbor's ox or sheep wandering off was a real financial loss.

God commands active involvement instead of a passive shrug.

🙈 Hide thyself means looking away
🐑 A stray ox or sheep meant real loss
🤝 God commands active involvement here
📖 Looking away was never acceptable

## 🔁 Thou Shalt In Any Case Bring Them Again

This is not a gentle suggestion.

The Hebrew phrasing here doubles the verb for emphasis.

Returning stray property was a firm duty, not an option.

Israelite law treated a neighbor's loss as everyone's concern.

🔁 The wording doubles the verb for emphasis
📋 Returning strays was a firm duty
🚫 This was never optional
📖 A neighbor's loss was everyone's concern

## 📏 If Thy Brother Be Not Nigh Unto Thee, Or If Thou Know Him Not

"Nigh" is an old word meaning near or close by.

Sometimes the owner lived too far away to be reached right away.

Other times the finder simply did not recognize whose animal it was.

The law still required action even without an obvious owner.

📏 Nigh means near or close by
🏃 Distance did not cancel the duty
❓ Not knowing the owner changed nothing
➡️ Action was still required either way

## 🏠 Until Thy Brother Seek After It

The finder became a temporary caretaker, not a new owner.

He had to keep and feed the animal at his own cost.

The animal stayed his responsibility until the real owner came looking.

Finding something valuable did not make it his to keep.

🏠 The finder became a temporary caretaker
🌾 He fed and kept it himself
⏳ Responsibility lasted until the owner came
📖 Finding it did not mean keeping it

## 👕 So Shalt Thou Do With His Raiment

"Raiment" means clothing or garments.

This law was not limited to animals alone.

Any lost item, including clothing, had to be returned the same way.

Personal property mattered as much as livestock under this law.

👕 Raiment simply means clothing
🐑 The law was not just for animals
🧺 Any lost item counted the same way
📖 Personal property mattered under this law

## 🔍 Which He Hath Lost, And Thou Hast Found, Shalt Thou Do Likewise

This verse widens the law to cover literally anything lost.

Whatever a neighbor lost and another Israelite found still had to go back.

The finder gained nothing extra just from being the one who found it.

Honesty toward a neighbor's property was the entire point.

🔍 The law covers literally anything lost
🤲 Finding something first gave no advantage
🤝 The item still belonged to its owner
📖 Honesty toward a neighbor mattered most

## 🐴 Thou Shalt Not See Thy Brother's Ass Or His Ox Fall Down By The Way

This law pairs with the lost animal rule just given.

Here the problem is not a wandering animal but a fallen one.

An ox or donkey collapsing under its load was a common danger.

Walking past a struggling animal was treated the same as walking past a lost one.

🐴 This pairs with the lost animal law
⚠️ Here the animal has fallen, not wandered
🏋️ Heavy loads made collapses common
➡️ Walking past was still not allowed

## 💪 Thou Shalt Surely Help Him To Lift Them Up Again

This law goes further than just reporting the problem.

The passerby had to physically help lift the animal back up.

Standing by and watching did not satisfy the command.

Loving a neighbor here meant real physical effort, not just good intentions.

💪 Real physical help was required
🚫 Just watching did not count
🤝 The law demanded hands on effort
📖 Loving a neighbor took real effort

# Deuteronomy 22:5
# 👗 Not Wearing The Other Sex's Clothing
---
## 👗 The Woman Shall Not Wear That Which Pertaineth Unto A Man

"Pertaineth" is an old word meaning belongs to or is proper to.

This law drew a clear line between clothing linked to each sex.

Clothing in this culture often marked a person's role, not just their style.

The rule protected that visible distinction from being blurred.

👗 Pertaineth means belongs to or fits
🚻 Clothing marked a clear role here
🎭 Style and role were closely tied
➡️ The rule protected a visible distinction

## 🔄 Neither Shall A Man Put On A Woman's Garment

The command runs in both directions equally.

A man crossing this same line broke the identical law.

Neither sex was singled out as the greater offender.

The concern was distinction itself, not one side dressing as the other.

🔄 The command works in both directions
⚖️ Neither sex was singled out
🚫 Both broke the same law equally
📖 Distinction itself was the real concern

## 💔 All That Do So Are Abomination Unto The LORD Thy God

"Abomination" is a strong word for something God finds deeply offensive.

Many scholars connect this law to pagan worship rituals nearby.

Some Canaanite fertility rites involved worshippers dressing as the opposite sex.

Israel was called to stay visibly distinct from those surrounding practices.

💔 Abomination means deeply offensive to God
🛐 Nearby pagan rituals may explain this
🎭 Some rites involved dressing as the other sex
📖 Israel was called to stay visibly distinct

# Deuteronomy 22:6-8
# 🪺 A Bird's Nest And A Safe Roof
---
## 🪺 If A Bird's Nest Chance To Be Before Thee In The Way

This law addresses an ordinary moment on a journey, not a rare crisis.

A traveler could easily stumble across a nest while walking or working.

The law assumes this kind of encounter happened often enough to matter.

Even small, everyday moments fell under God's instruction.

🪺 This describes an ordinary roadside moment
🚶 Travelers often passed nests like this
📋 The law covers something common
📖 Even small moments fell under instruction

## 🐦 The Dam Sitting Upon The Young, Or Upon The Eggs

"Dam" is an old word for a mother animal.

The law pictures the mother bird still caring for her nest.

Taking her at that exact moment would end her ability to raise more.

The command protects her future usefulness, not just this one nest.

🐦 Dam means a mother animal
🪺 She is still caring for her nest
🔁 Taking her would end future nests
📖 Her future usefulness was protected

## 🚫 Thou Shalt Not Take The Dam With The Young

This is the actual command at the center of the law.

The young or the eggs could be taken for food.

The mother bird herself had to be let go.

The law shows real concern for an animal most people would ignore.

🚫 The mother could not be taken
🥚 Young or eggs were allowed
🕊️ She had to be set free
📖 The law cared for an easily ignored animal

## 📜 That It May Be Well With Thee, And That Thou Mayest Prolong Thy Days

This exact promise also appears attached to honoring father and mother.

A small mercy toward a bird carries the same kind of reward language.

The connection suggests both laws train the same habit of restraint.

Kindness in small, unseen moments still mattered to God.

📜 This promise also honors father and mother
🔗 Two very different laws share one reward
🧠 Both laws train the same restraint
📖 Small kindness still mattered to God

## 🏠 When Thou Buildest A New House, Then Thou Shalt Make A Battlement

"Battlement" here means a low wall or railing around the edge of a roof.

Flat rooftops in this culture were used daily, not just for shelter.

Families ate, slept, and worked on their roofs regularly.

A railing prevented an ordinary evening from ending in tragedy.

🏠 Battlement means a railing around a roof
🛌 Flat roofs were used for daily life
👪 Families gathered there often
📖 A simple railing prevented tragedy

## 🩸 That Thou Bring Not Blood Upon Thine House, If Any Man Fall

"Blood" here means the guilt of a preventable death.

A homeowner who skipped this railing bore real legal responsibility.

The law treated safety as a spiritual duty, not just good sense.

Neglecting a simple precaution could make a family guilty of bloodshed.

🩸 Blood means the guilt of a death
🏗️ Skipping the railing brought real liability
🙏 Safety was treated as a spiritual duty
➡️ Neglect could count as real guilt

# Deuteronomy 22:9-12
# 🌾 Forbidden Mixtures
---
## 🌱 Thou Shalt Not Sow Thy Vineyard With Divers Seeds

"Divers" is an old word meaning different or mixed kinds.

Planting two different crops together in one vineyard was forbidden.

This law belongs to a small group of mixture laws in this chapter.

Each one pictures a boundary God wanted kept visibly clear.

🌱 Divers means different or mixed kinds
🍇 Mixing crops in one vineyard was banned
📚 This starts a group of mixture laws
📖 Each law pictures a clear boundary

## 🚫 Lest The Fruit Of Thy Seed And The Fruit Of Thy Vineyard Be Defiled

"Defiled" here means the whole mixed harvest became unusable.

The penalty was not a fine but the loss of the entire crop.

Mixing what God meant to stay separate carried a real cost.

The law protected order by making disorder expensive.

🚫 Defiled means the harvest becomes unusable
💰 The whole crop was lost, not fined
⚖️ Disorder carried a real cost
📖 The law protected order through cost

## 🐂 Thou Shalt Not Plow With An Ox And An Ass Together

An ox and a donkey have very different strength and gait.

Yoking them together would strain the weaker animal badly.

Many scholars believe the law also carried a symbolic meaning about mismatched pairing.

Practical mercy and symbolic order worked together in this one command.

🐂 Ox and donkey differ greatly in strength
😣 Yoking them together would strain one animal
🎭 The pairing likely carried symbolic weight too
📖 Mercy and order worked together here

## 🧵 Thou Shalt Not Wear A Garment Of Divers Sorts, As Of Woollen And Linen Together

This mixed fabric law is often called shatnez in later Jewish tradition.

Wool and linen together were reserved for one specific use in Israel.

The priestly garments described in Exodus deliberately combined the two.

What was holy in the tabernacle stayed out of daily clothing.

🧵 This mixed fabric rule is called shatnez
👔 Wool and linen were reserved together once
🕎 Priestly garments combined the two on purpose
📖 What was holy stayed out of daily wear

## 👘 Thou Shalt Make Thee Fringes Upon The Four Quarters Of Thy Vesture

"Vesture" is an old word for the outer garment a person wore.

"Fringes" here refers to tassels, later called tzitzit in Hebrew.

Numbers fifteen already commanded these tassels as a visual reminder of God's law.

Every outer garment carried a built in reminder of the covenant.

👘 Vesture means the outer garment worn
🧵 Fringes means tassels, later called tzitzit
📜 Numbers fifteen already commanded these tassels
📖 Clothing itself carried a covenant reminder

# Deuteronomy 22:13-19
# ⚖️ A False Accusation Against A Bride
---
## 💍 If Any Man Take A Wife, And Go In Unto Her, And Hate Her

This law opens with a marriage that quickly turns sour.

"Go in unto her" is the Bible's common phrase for consummating a marriage.

"Hate" here means growing to dislike her, not necessarily violent hatred.

The law anticipates a husband looking for a way out of the marriage.

💍 The marriage quickly turns sour here
🛏️ Go in unto her means consummation
❤️ Hate means dislike, not violent hatred
📖 A husband is looking for an exit

## 🗣️ Give Occasions Of Speech Against Her, And Bring Up An Evil Name Upon Her

This describes a husband spreading a false rumor about his own wife.

He wants a legal excuse to end the marriage without penalty.

Damaging her reputation publicly was his chosen method.

The law is about to stop that plan cold.

🗣️ He spreads a false rumor about her
⚖️ He wants an excuse to divorce free
📉 Her reputation is damaged publicly
➡️ The law is about to intervene

## 🗣️ I Found Her Not A Maid

This is the husband's specific accusation stated in court.

"Maid" here means a virgin.

He claims she was not a virgin when they married.

This charge could destroy her future and her family's honor.

🗣️ This is his specific court accusation
👰 Maid means a virgin here
💔 He claims she was not one
📖 Her future and honor are at stake

## 🩸 The Father Of The Damsel, And Her Mother, Take And Bring Forth The Tokens

"Tokens of virginity" refers to the bloodstained cloth from the wedding night.

Ancient Israelite custom treated this cloth as physical proof.

Both parents, not just the father, take part in this defense.

The family had a real way to answer a false charge.

🩸 Tokens means the bloodstained wedding cloth
📜 This served as physical legal proof
👪 Both parents defended their daughter together
📖 A false charge had a real answer

## 🗣️ I Gave My Daughter Unto This Man To Wife, And He Hateth Her

The father speaks directly to the elders in his daughter's defense.

He states the plain facts before the formal accusation is even addressed.

This father is not a passive bystander in the process.

Public defense of a daughter's honor here was clearly expected of him.

🗣️ The father speaks in her defense
📋 He states the plain facts first
🛡️ He plays an active role here
📖 Defending her honor was expected

## 📜 They Shall Spread The Cloth Before The Elders Of The City

This physical evidence was displayed in front of the town's legal authority.

It turned a private accusation into an open legal proceeding.

Everyone present could see the same evidence at once.

Nothing about this process happened behind closed doors.

📜 Evidence went before the town elders
👀 Everyone present saw it directly
🚪 This became a fully open proceeding
📖 Nothing here stayed hidden

## ⚖️ The Elders Of That City Shall Take That Man And Chastise Him

"Chastise" means to physically punish, likely through a beating.

This punishment fell on the husband, not the innocent wife.

False accusation carried a real, immediate cost for the accuser.

The law protected the wife from an unanswered lie.

⚖️ Chastise means a physical punishment
👨 The punishment falls on the husband
💸 False accusation carried a real cost
📖 The wife was protected from a lie

## 💰 Amerce Him In An Hundred Shekels Of Silver

"Amerce" is an old word for imposing a fine.

A hundred shekels was double the standard bride price of fifty shekels.

This heavy fine matched the seriousness of a public false accusation.

Money alone could not undo the damage, but it still carried weight.

💰 Amerce means to impose a fine
🔟 A hundred shekels doubled the normal price
⚖️ The heavy fine matched the offense
📖 Money could not undo the harm

## 👨 Give Them Unto The Father Of The Damsel

The fine went directly to the wife's father, not to the court.

Her father had defended her reputation and now received the compensation.

This connected the punishment directly back to the family that was wronged.

Justice here was personal, not just a general legal fine.

👨 The fine went to her own father
🤝 He had defended her reputation
🔗 Punishment tied back to the wronged family
📖 Justice stayed personal, not abstract

## 🚫 He May Not Put Her Away All His Days

This husband loses the normal right to divorce his wife.

A man who nearly destroyed her reputation could not later discard her either.

The false accusation itself came with a lasting consequence for him.

She kept lifelong security instead of being married and then abandoned.

🚫 He permanently loses the right to divorce
⚖️ His own accusation created this consequence
🛡️ She gained lasting security instead of risk
📖 Protection outlasted the original false charge

# Deuteronomy 22:20-21
# 🪨 When The Accusation Proves True
---
## 🔄 If This Thing Be True, And The Tokens Of Virginity Be Not Found

This verse addresses the opposite outcome from the previous case.

Here the accusation turns out to be accurate, not false.

No cloth or physical evidence exists to defend her.

The law now moves toward a very different and severe outcome.

🔄 This is the opposite outcome now
✅ The accusation turns out true
🚫 No evidence exists in her defense
➡️ A severe outcome follows next

## 🚪 They Shall Bring Out The Damsel To The Door Of Her Father's House

The execution takes place specifically at her own father's doorway.

That location tied the shame of the offense directly to her household.

Her father had publicly staked his word on her innocence earlier.

The location made the consequence impossible for the family to avoid seeing.

🚪 The location is her father's own doorway
🏠 Shame is tied directly to the household
🗣️ Her father had staked his word on her
➡️ The family could not avoid seeing this

## 🪨 The Men Of Her City Shall Stone Her With Stones That She Die

Stoning placed responsibility for the sentence on the whole community.

No single individual carried out this punishment alone.

This matched the same communal method used elsewhere in Deuteronomy.

The severity reflected how seriously Israel treated a broken marriage covenant.

🪨 Stoning spread responsibility across the community
🚫 No single person acted alone here
🔁 The same method appears elsewhere in Deuteronomy
📖 The penalty matched a broken covenant

## 📚 She Hath Wrought Folly In Israel, To Play The Whore In Her Father's House

"Wrought folly" is an old phrase for committing a serious, foolish sin.

This is not calling her merely careless or silly.

The phrase treats her act as a real betrayal of her family and nation.

Sin here has consequences reaching beyond just the individual involved.

📚 Wrought folly means committing serious sin
🚫 This is far more than mere carelessness
👪 The betrayal reached family and nation
➡️ Sin here reached beyond one person

## 🔁 So Shalt Thou Put Evil Away From Among You

This exact closing phrase repeats throughout Deuteronomy's law sections.

It signals the true purpose behind these harsh penalties.

Israel was meant to actively remove corruption, not just punish individuals.

A holy community required ongoing effort, not passive hope.

🔁 This phrase repeats throughout Deuteronomy
🎯 It names the real purpose here
🧹 Corruption had to be actively removed
📖 Holiness required ongoing community effort

# Deuteronomy 22:22-27
# 💔 Adultery And Assault
---
## 💔 If A Man Be Found Lying With A Woman Married To An Husband

This law addresses adultery in the plainest possible terms.

Both participants share full legal responsibility under this law.

Marriage was treated as a serious, binding covenant, not a casual arrangement.

Breaking it carried the most severe penalty available.

💔 This law names adultery directly
⚖️ Both participants share full responsibility
💍 Marriage was treated as a binding covenant
📖 The penalty matched the seriousness

## ⚖️ Then They Shall Both Of Them Die

The penalty applied equally to the man and the woman.

This law refused to place all the blame on one side.

Ancient cultures nearby often punished women alone for this offense.

Israel's law here demanded equal accountability from both parties.

⚖️ The penalty applied equally to both
🚫 Blame did not fall on one side
🌍 Nearby cultures often blamed women alone
📖 Israel required equal accountability here

## 💍 A Damsel That Is A Virgin Be Betrothed Unto An Husband

"Betrothed" means formally promised in marriage, more binding than modern engagement.

A betrothed woman was already treated legally as someone's wife.

Breaking that bond carried the same weight as breaking an actual marriage.

This legal status explains why the coming penalties are so severe.

💍 Betrothed means formally promised in marriage
⚖️ She already held a wife's legal status
🔗 Breaking it matched breaking a marriage
📖 This explains the severity ahead

## 🏙️ A Man Find Her In The City, And Lie With Her

The setting matters as much as the act itself in this law.

A city was full of people close enough to hear a cry for help.

The law assumes silence in this setting suggested consent.

Location becomes the deciding evidence in this specific case.

🏙️ The setting is a crowded city here
👂 Neighbors were close enough to hear
🤫 Silence here suggested consent
📖 Location became the deciding evidence

## 🗣️ Because She Cried Not, Being In The City

This is the specific reasoning behind her portion of the penalty.

Crying out in a city was assumed to bring real help quickly.

The law is not accusing her of wanting what happened.

It assumes she had a real chance to stop it and did not take it.

🗣️ Crying out could bring quick help
🏙️ A city offered nearby rescue
❓ The law assumes a missed chance
➡️ This reasoning shaped her portion of the penalty

## 🌾 A Man Find A Betrothed Damsel In The Field, And The Man Force Her

The setting shifts completely from a crowded city to an empty field.

"Force" here plainly means rape, not seduction or persuasion.

No neighbors were nearby to hear any cry for help.

The law now reads this situation in a completely different light.

🌾 The setting shifts to an empty field
⚠️ Force here plainly means rape
🔇 No neighbors were nearby to help
➡️ The law reads this differently now

## ⚖️ The Man Only That Lay With Her Shall Die

Only the attacker faces the death penalty in this case.

The law completely clears the woman of any blame here.

This is a sharp contrast with the city scenario just described.

Setting alone changed the entire legal outcome for her.

⚖️ Only the attacker faces this penalty
🙅 The woman is fully cleared
🔄 This contrasts sharply with the city case
📖 Setting alone changed the outcome

## 🙅 There Is In The Damsel No Sin Worthy Of Death

This line states her innocence in the plainest terms possible.

The law refuses to treat a victim as guilty of anything.

No ambiguity is left about where responsibility actually belongs.

Scripture protects her reputation here as firmly as it can.

🙅 Her innocence is stated plainly here
🚫 A victim is never treated as guilty
🎯 Responsibility is placed clearly on him
📖 Her reputation is firmly protected

## ⚔️ As When A Man Riseth Against His Neighbour, And Slayeth Him

This comparison places the assault in the same category as murder.

Both are treated as violent crimes committed against another person.

The law refuses to describe this as a moral failure on her part.

Naming it this way protected her from being blamed like a willing participant.

⚔️ This compares the assault to murder
🔪 Both are treated as violent crimes
🙅 Her side carries no moral failure
📖 The comparison protected her from blame

## 🗣️ There Was None To Save Her

This closing line explains exactly why she was judged innocent.

She did cry out, but no one was close enough to hear.

Being alone in the field was the deciding factor for her.

God's law gave her the benefit of the doubt, not blind suspicion.

🗣️ She did cry out for help
🔇 No one was near enough to hear
🌾 Being alone shaped this judgment
📖 She received the benefit of the doubt

# Deuteronomy 22:28-30
# 👰 A Virgin's Violation And A Father's Wife
---
## 👰 If A Man Find A Damsel That Is A Virgin, Which Is Not Betrothed

This scenario differs from the earlier ones in one key detail.

The woman here is not engaged or promised to anyone yet.

No existing marriage covenant is broken by this act.

The law still takes the violation completely seriously.

👰 She is not engaged to anyone here
🔄 No marriage covenant is broken
⚠️ The violation is still taken seriously
➡️ A different penalty structure follows

## 💰 The Man That Lay With Her Shall Give Unto The Damsel's Father Fifty Shekels Of Silver

Fifty shekels matches the standard bride price mentioned elsewhere in the law.

This fine was half the hundred shekel penalty for a false accusation.

The lighter fine reflects a real but different kind of offense.

Payment went directly to the father as compensation for the harm.

💰 Fifty shekels matched the standard bride price
⚖️ This was half the false accusation fine
🔄 The offense here differed from that one
📖 Payment compensated the father directly

## 🔗 She Shall Be His Wife, Because He Hath Humbled Her

"Humbled" is the same word used for the wartime captive law earlier in this book.

Marriage here functioned as lifelong provision, not a reward for the man.

Without it, a violated unmarried woman faced a very difficult future.

The same lifelong protection clause from verse nineteen applies again here.

🔗 Humbled matches the earlier captive law
💍 Marriage provided lifelong security for her
😟 Her future was otherwise very difficult
📖 The same protection clause applies again

## 🚫 A Man Shall Not Take His Father's Wife, Nor Discover His Father's Skirt

This law forbids a son marrying his father's wife, likely a stepmother.

"Discover his father's skirt" is an old idiom for taking marital rights.

The same idiom appears later in Ruth and Ezekiel with the same meaning.

The chapter closes by protecting the most basic family boundary of all.

🚫 This forbids marrying a father's wife
👘 Discover the skirt means taking marital rights
📚 The same idiom appears in Ruth and Ezekiel
📖 The chapter closes on a basic boundary
`.trim();

export const DEUTERONOMY_TWENTY_TWO_PERSONAL_SECTIONS = parseDeuteronomyTwentyTwoRawNotes(DEUTERONOMY_TWENTY_TWO_RAW_NOTES);
