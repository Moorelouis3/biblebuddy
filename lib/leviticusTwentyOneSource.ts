export type LeviticusTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyOneRawNotes(rawText: string): LeviticusTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 21:${startVerse}` : `Leviticus 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Leviticus 21 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_ONE_RAW_NOTES = `# Leviticus 21:1-4
# 💀 Priests And The Dead
---
## 🕯️ Speak Unto The Priests The Sons Of Aaron

God now speaks to one family within Israel, not the whole camp.

Chapters eighteen through twenty gave rules for every Israelite in the camp.

Here the target narrows to Aaron and his priestly sons.

More access to holy things always meant more responsibility.

🎯 Rules narrow to Aaron's family alone

📜 Chapters eighteen to twenty covered everyone

🕯️ Priests handled the holiest things

📖 Closeness to God required more care

## 💀 There Shall None Be Defiled For The Dead Among His People

"Defiled" here means made ritually unclean through contact with a dead body.

Touching a corpse caused a temporary uncleanness, not a moral sin.

Numbers nineteen lays out the entire purification process this triggers.

An unclean priest could not serve at the altar until purified.

This rule protected the tabernacle from losing a priest for days at a time.

💀 Defiled means ritually unclean, not sinful

⏳ Touching a corpse caused temporary uncleanness

📚 Numbers nineteen explains the full process

📖 The tabernacle needed priests ready always

## 👪 For His Mother, And For His Father, And For His Son, And For His Daughter, And For His Brother

God gives priests an exact list of family they may still mourn.

The list covers parents, children, and brothers by name.

A named list removes any guessing about which funerals are allowed.

This limits ritual uncleanness for priests.

It does not ban grief itself.

👪 Names parents, children, and brothers

📏 A named list removes guesswork

⚖️ Limits uncleanness, not grief itself

📖 Priests could still mourn close family

## 👰 For His Sister A Virgin, That Is Nigh Unto Him

This exception applies only to an unmarried sister.

"Nigh unto him" means she still lived in his household.

Once a sister married, mourning duties shifted to her husband's family.

The list narrows even further than it first sounds.

👰 Applies only to an unmarried sister

🏠 Nigh unto him means still home

💍 Marriage shifted her to another family

📖 The list narrows further than expected

## ⚖️ Being A Chief Man Among His People, To Profane Himself

"Chief man" points to the priest's public position of honor.

"Profane" means treating something set apart as common or ordinary.

Mourning outside the short list above would treat that position carelessly.

The narrow family list exists to protect the priest's public role.

⚖️ Chief man means public standing

🔤 Profane means treated as common

🚫 Mourning outside the list was careless

📖 The list protected the priest's role

# Leviticus 21:5-6
# 💇 No Pagan Mourning Marks
---
## 🪒 They Shall Not Make Baldness Upon Their Head

Shaving the head bald was a common mourning ritual in this era.

It served as a visible sign of grief worn on the body.

Priests were told not to copy this practice at all.

Their mourning customs needed to look different from surrounding nations.

🪒 Head shaving was a common mourning ritual

🚫 Priests could not adopt this practice

🌍 It marked Israel's priests as different

📖 Grief needed its own distinct look

## 🧔 Neither Shall They Shave Off The Corner Of Their Beard

This same command already applies to every Israelite in Leviticus nineteen.

Repeating it here for priests shows even a universal rule got restated.

Priests were held to it with even less room for exceptions.

Highest standards still needed the basic rules spelled out again.

🔗 The same rule appears in Leviticus nineteen

👥 First given to all, now repeated

📈 Priests had less room for exceptions

📖 Even leaders needed the basics restated

## 🩸 Nor Make Any Cuttings In Their Flesh

Cutting the skin during mourning shows up elsewhere tied to pagan worship.

Baal's prophets cut themselves begging their god to answer in 1 Kings 18:28.

Banning this practice separated Israel's grief from rituals built on self harm.

Israel's God never needed to be begged through pain.

🩸 Ritual cutting was tied to pagan worship

👑 1 Kings 18:28 shows Baal's prophets cutting themselves

🚫 Israel never begged God through self harm

📖 Israel's worship did not need violence

## ✨ They Shall Be Holy Unto Their God, And Not Profane The Name Of Their God

"Holy" means set apart for God's use.

"Profane" means common or ordinary, the opposite of holy.

This line sums up the reasoning behind all the mourning bans just given.

A priest's body and behavior needed to visibly match his set apart role.

✨ Holy means set apart for God

🔤 Profane means the opposite, common

🔗 Sums up the mourning ban reasoning

📖 Behavior needed to match the role

## 🔥 For The Offerings Of The LORD Made By Fire, And The Bread Of Their God, They Do Offer

This verse gives the actual reason behind the holiness requirement just stated.

Priests handled the offerings burned on the altar every day.

They also handled the bread set out before God continually.

Their own condition could not be separated from the holy things they touched.

🔥 Names their daily job at the altar

🍞 They also handled the holy bread

🔗 Ties personal holiness to daily duty

📖 Explains the why behind the section

# Leviticus 21:7-8
# 💍 Who A Priest May Marry
---
## 🚫 They Shall Not Take A Wife That Is A Whore, Or Profane

A priest could not marry a woman who worked as a prostitute.

He also could not marry a woman this culture considered profane.

"Profane" here means her reputation made her seem common, not set apart.

A priest's wife's status reflected on his fitness to serve at the altar.

🚫 Bans marriage to a prostitute

🔤 Profane means treated as common

👰 A wife's status affected his fitness

📖 Marriage reflected on priestly service

## 💔 Neither Shall They Take A Woman Put Away From Her Husband

"Put away" means divorced.

This ban applied to ordinary priests marrying a divorced woman.

The stricter high priest rule coming later goes even further than this.

This law had different tiers depending on a priest's rank.

💔 Put away means divorced

📊 Ordinary priests get one standard

⬆️ The high priest's rule is stricter

📖 Rank shaped which rules applied

## 🙏 For He Is Holy Unto His God

This closes the marriage restrictions with the chapter's core reasoning.

A priest's holy status was never a private matter.

Even his choice of wife reflected on the sacred role he carried.

The whole community watched how he lived that role out.

🙏 Repeats the chapter's core reasoning

👀 A priest's choices were never private

🔗 Same logic drives the mourning rules

📖 His marriage reflected his sacred role

## 🍞 Thou Shalt Sanctify Him Therefore

This line switches direction from commanding the priest to commanding the people.

The community is told to treat the priest as set apart.

"Sanctify" means to set someone apart for God's own use.

That honor was tied to duties the priest carried out for everyone.

🔄 Switches to commanding the community instead

🔤 Sanctify means set apart for God

🤝 Honor flowed toward the priest here

📖 The people had a role too

## 🍞 For He Offereth The Bread Of Thy God: He Shall Be Holy Unto Thee

The reason for that community honor was his daily bread duty.

He alone presented the sacred bread before God on Israel's behalf.

Holiness in this system ran in both directions, not one way only.

The people had to treat him as set apart because of that duty.

🍞 Ties back to his bread duties

🙌 He served on Israel's behalf

🤝 Holiness ran in both directions

📖 His duty shaped how people treated him

## ✨ For I The LORD, Which Sanctify You, Am Holy

The final reason traces back past the priest and the people to God himself.

Every rule in this section reflects who God actually is.

It is not just a rule that keeps a system running smoothly.

It points to something deeper than logistics.

✨ Traces back to God's own character

🔝 Reflects who God is, not convenience

🔁 Echoes across the whole chapter

📖 Points past logistics to God himself

# Leviticus 21:9
# 🔥 A Priest's Daughter Who Sins
---
## 👨‍👧 And The Daughter Of Any Priest, If She Profane Herself By Playing The Whore, She Profaneth Her Father

Family honor and a father's public standing were tightly linked in this culture.

A priest's daughter turning to prostitution was not treated as her failure alone.

The text says her choice profanes, or drags down, her father's holy standing too.

A priest's household was expected to visibly reflect his sacred role.

👨‍👧 Family honor and standing were linked

📉 Described as dragging down his status

🏠 A household reflected the father's role

📖 Priestly honor was a shared burden

## 🔥 She Shall Be Burnt With Fire

Burning was one of the harshest penalties in this entire legal system.

It was reserved for only a small handful of the worst offenses.

Leviticus twenty gives this same penalty for a different serious offense.

This shows how seriously a priestly household's conduct was treated here.

🔥 One of the harshest penalties given

📏 Reserved for a small handful of offenses

🔗 The same penalty appears in Leviticus twenty

📖 Reflects the higher standard on priests

# Leviticus 21:10-12
# 👑 The High Priest's Extra Rules
---
## 👑 He That Is The High Priest Among His Brethren, Upon Whose Head The Anointing Oil Was Poured

This section narrows the focus from priests in general to one man.

The high priest was the single man holding the top position.

Oil poured over his head marked his ordination, described in Exodus twenty nine.

He kept every earlier priestly rule, plus a stricter set that follows.

👑 Narrows the focus to one man

🫗 Anointing oil marked his ordination ceremony

➕ He kept all the earlier rules too

📖 Exodus twenty nine describes that ceremony

## 👔 Shall Not Uncover His Head, Nor Rend His Clothes

Loose hair and torn clothing were normal signs of grief in this era.

Job tears his own robe in mourning back in Job chapter one.

The high priest was barred from even these ordinary mourning gestures.

This was a stricter line than the rules given to regular priests.

👔 Loose hair and torn clothes meant mourning

⬆️ Stricter than rules for regular priests

🚫 The high priest could not do either

📖 Job chapter one shows this exact custom

## ⚰️ Neither Shall He Go In To Any Dead Body, Nor Defile Himself For His Father, Or For His Mother

Ordinary priests could still become unclean for their own parents.

The high priest could not, not even for his own father or mother.

His office required constant readiness for sanctuary duty at every moment.

Not even the most painful family loss changed that requirement.

⬆️ Stricter than the ordinary priest exception

⚰️ No exception, not even for parents

⏱️ His role required constant readiness

📖 Even grief could not interrupt his duty

## 🏛️ Neither Shall He Go Out Of The Sanctuary, Nor Profane The Sanctuary Of His God

This likely means he could not leave his duties to attend mourning rites.

That held true even for the funeral of his own close family.

Walking away from his post, even to grieve, is called profaning the sanctuary.

His constant presence at his post protected the sanctuary's own holiness.

🚪 Likely means not leaving mid duty

😢 Even his own family's funeral qualified

🔤 Leaving his post is called profaning

📖 His presence protected the sanctuary's holiness

## 👑 For The Crown Of The Anointing Oil Of His God Is Upon Him: I Am The LORD

"Crown" here pictures the anointing oil as a permanent, invisible mark on him.

It set him apart continuously, not only during ceremonies.

Every stricter rule in this section traces back to that one image.

He wore his consecration at all times.

He lived by that consecration at all times too.

👑 Crown pictures a constant invisible mark

⏳ Not just for ceremonies, a constant status

🔗 Explains why his rules are stricter

📖 He lived by his consecration always

# Leviticus 21:13-15
# 👰 The High Priest Must Marry A Virgin
---
## 👰 And He Shall Take A Wife In Her Virginity

The high priest's marriage rule goes further than the one just given.

An ordinary priest could not marry certain categories of women.

The high priest was required to marry a virgin specifically.

This is the strictest version of the marriage rule in this chapter.

👰 Stricter than the rule from verse seven

⬆️ Required, not just restricted from categories

📏 The tightest marriage standard in the chapter

📖 His role demanded the highest standard

## 🚫 A Widow, Or A Divorced Woman, Or Profane, Or An Harlot, These Shall He Not Take

This list adds widow to the ban, a category ordinary priests could still marry.

The high priest's role touched the whole nation, not just his own family.

His marriage list became the narrowest given to anyone in Israel's law.

Representing the whole nation before God came with the tightest limits.

➕ Widow is newly added to the ban

👑 Tied to his national representative role

📏 The narrowest marriage rule in Israel

📖 Representing everyone meant the tightest limits

## 🇮🇱 But He Shall Take A Virgin Of His Own People To Wife

"Of his own people" means an Israelite woman, not a foreigner.

This kept the high priest's household rooted inside the covenant nation.

It also protected the priestly line descending from him going forward.

His household needed to visibly represent the nation he served.

🇮🇱 Of his own people means Israelite

👪 Kept his household inside the nation

🔗 Protected the priestly line going forward

📖 His household represented the whole nation

## 👶 Neither Shall He Profane His Seed Among His People: For I The LORD Do Sanctify Him

"Seed" here means his own children.

This marriage rule was never only about the high priest himself.

His choice of wife directly affected his own children's set apart status.

Priestly identity in Israel passed down through the family line.

👶 Seed means his own children

🔗 His marriage affected his children too

📜 Priestly identity passed through family lines

📖 The rule protected an entire lineage

# Leviticus 21:16-20
# 🚫 Blemishes That Bar A Priest From Serving
---
## 🍞 Let Him Not Approach To Offer The Bread Of His God

This section lists physical conditions barring a priest's descendant from the altar.

It is worth saying plainly that this was never a judgment of a man's worth.

Offering animals already had to be without blemish, a standard explained again in Leviticus twenty two.

This extended that same symbolic standard of wholeness to the person serving.

Verse twenty two later confirms a barred priest was still fed from the offerings.

Hebrews 7:26 later calls Jesus a high priest who is truly undefiled.

That deeper wholeness is what this physical list could only ever picture.

🍞 Lists conditions barring altar service

❤️ Never a judgment of personal worth

🐑 Mirrors the standard required for animals

📖 Hebrews 7:26 points to Jesus's true wholeness

## 👁️ A Blind Man, Or A Lame, Or He That Hath A Flat Nose, Or Any Thing Superfluous

This opens the list with blindness and an inability to walk normally.

"Flat nose" likely means a damaged or disfigured nose.

"Superfluous" means an extra, unusual body part.

Each condition named here was visible and permanent.

👁️ Blindness and lameness open the list

👃 Flat nose means a disfigured nose

➕ Superfluous means an extra body part

📖 Every condition here was visible

## 🦴 Or A Man That Is Brokenfooted, Or Brokenhanded

This covers a permanently broken or malformed foot or hand.

It does not cover a temporary injury like a healed fracture.

The list cares about lasting conditions, not short term recovery.

A healed broken bone was never the concern here.

🦴 A permanent foot or hand condition

⏳ Not a temporary or healed injury

📋 Lasting conditions, not short term recovery

📖 Continues the visible and lasting pattern

## 🩺 Or Crookbackt, Or A Dwarf, Or That Hath A Blemish In His Eye, Or Be Scurvy, Or Scabbed, Or Hath His Stones Broken

This final cluster names a curved spine and unusually short stature.

It also names an eye condition and an ongoing skin disease.

It closes with a physical injury affecting reproduction.

This is the most detailed stretch in the whole list.

🩺 Names spine curvature and short stature

👁️ Also names an eye condition

🩹 Scurvy and scabbed mean ongoing skin disease

📖 The most detailed cluster in the list

# Leviticus 21:21-24
# 🍞 Provided For, But Limited
---
## 🚪 No Man That Hath A Blemish Of The Seed Of Aaron The Priest Shall Come Nigh To Offer The Offerings Of The LORD Made By Fire

This verse restates the whole blemish list one final time as a single rule.

It closes the list before moving on to what a barred priest could still do.

He could not serve at the altar, but he was not cast out of the family.

The next verses turn from what he could not do to what he still could.

🚪 Restates the whole list as one rule

📋 Closes out the disqualifying conditions

👪 He stayed part of the priestly family

📖 The chapter now turns to provision

## 🍞 He Shall Eat The Bread Of His God, Both Of The Most Holy, And Of The Holy

A priest barred from the altar still received his share of the holy food.

This covered both the most holy portions and the regular holy portions.

Exclusion from the altar never meant exclusion from provision or belonging.

Being barred from one duty was not the same as being cut off.

🍞 Still received his full food portion

📊 Covers both most holy and holy food

🤝 Altar exclusion was not total exclusion

📖 Provision and belonging still remained his

## 🚪 Only He Shall Not Go In Unto The Vail, Nor Come Nigh Unto The Altar, Because He Hath A Blemish

This defines exactly what a blemished priest could not do.

He could not enter past the veil, closest to God's presence.

He also could not approach the altar to perform sacrifices himself.

Everything else, eating the holy food and living among the priests, stayed open.

🚪 Two specific limits, the veil and the altar

✅ Everything else remained open to him

📏 A narrow restriction, not a full ban

📖 Only two duties were closed off

## ✨ That He Profane Not My Sanctuaries: For I The LORD Do Sanctify Them

The reasoning returns one final time to the sanctuary's own holiness.

This was never about ranking the man's personal worth.

The restriction protects the set apart status of the holy space itself.

This same reasoning has run through the entire chapter from the first verse.

✨ Protects the sanctuary's holiness, not his worth

🔁 The same reasoning used all chapter long

📚 Brings the chapter's core theme full circle

📖 God alone makes people and places holy

## 📜 And Moses Told It Unto Aaron, And To His Sons, And Unto All The Children Of Israel

This closing line is easy to skim past, but it matters.

These rules applied specifically to priests, yet Moses told the whole nation.

Every Israelite depended on priests staying fit to carry out the offerings.

Everyone needed to understand the standard their priests were held to.

📜 A rule for priests, announced to everyone

🤝 Everyone depended on priests staying fit

👥 Closes the chapter the way it opened

📖 Moses relayed God's word to all
`.trim();

export const LEVITICUS_TWENTY_ONE_PERSONAL_SECTIONS = parseLeviticusTwentyOneRawNotes(LEVITICUS_TWENTY_ONE_RAW_NOTES);
