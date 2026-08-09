export type RuthTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRuthTwoRawNotes(rawText: string): RuthTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RuthTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ruth\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ruth 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ruth\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Ruth\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ruth 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ruth 2:${startVerse}` : `Ruth 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ruth 2 sections, received " + sections.length);
  }

  return sections;
}

const RUTH_TWO_RAW_NOTES = `# Ruth 2:1-3
# 🌾 A Kinsman Named Boaz
---
## 🤑 A Mighty Man Of Wealth

A mighty man of wealth means much more than having money.

It describes someone with land, workers, and real standing in the town.

Boaz was a respected figure long before Ruth ever met him.

His introduction here sets up exactly why he can help this family.

🌾 Wealth meant land and standing

👑 Boaz was a respected figure

🏘️ He held real influence in Bethlehem

📖 His introduction sets up the rescue

## 👪 Of The Family Of Elimelech

This detail connects Boaz directly to Naomi's late husband.

Family ties like this mattered deeply under Israelite law.

A close relative could act as a kinsman redeemer for the family.

That role becomes the real turning point of this whole book.

👪 Boaz relates to Elimelech's family

⚖️ Family ties carried real legal weight

🛡️ A kinsman redeemer could protect widows

📖 That role shapes the rest of Ruth

## 🌾 Let Me Now Go To The Field And Glean

To glean means gathering the leftover grain reapers dropped behind them.

Israelite law required farmers to leave grain at the edges of every field.

That law existed specifically to provide for the poor and for foreigners.

Ruth was invoking a real welfare system, not begging for charity.

🌾 Glean means gathering leftover grain

📜 Law required farmers to leave some

🤲 It provided for the poor and foreigners

📖 Ruth used a real established system

## 🎲 Her Hap Was To Light On A Part Of The Field

Hap is an old word for chance or luck.

On the surface, Ruth just wandered into the nearest open field.

The story never actually calls this pure coincidence.

Every reader is meant to sense God quietly guiding her steps.

🎲 Hap means chance or luck

🚶 Ruth wandered into an open field

👀 The text hints at more than luck

📖 God was guiding her steps unseen

# Ruth 2:4-7
# 👀 Boaz Notices A Stranger
---
## 🙏 The LORD Be With You

This was a normal daily greeting between a boss and his workers.

Boaz blessed his reapers instead of simply barking out orders.

The workers answered back with a blessing of their own.

Faith was woven into the ordinary rhythm of Boaz's workday.

🙏 A common greeting between boss and workers

😊 Boaz blessed his workers first

🔁 The reapers answered with a blessing

📖 Faith shaped his everyday routine

## 👧 Whose Damsel Is This

A damsel simply means a young woman.

Boaz noticed someone new working in his field right away.

He did not recognize her, which meant she stood out.

His question opens the door to everything that follows.

👧 Damsel means a young woman

👀 Boaz noticed a new face

❓ He did not recognize her

📖 His question starts the whole scene

## 🗺️ The Moabitish Damsel That Came Back With Naomi

The servant identifies Ruth by her nationality before her name.

Moabites and Israelites carried generations of tension between them.

Ruth was working in this field as a known outsider.

Nobody at this point has any idea how this story will end.

🗺️ Moabitish marks Ruth as an outsider

⚔️ Moab and Israel had old tension

🌾 Ruth worked here as a foreigner

➡️ No one yet knows where this leads

## 🌅 Continued Even From The Morning Until Now

Ruth had been gleaning nonstop since sunrise.

Gleaning meant bending down and gathering grain by hand all day.

The work was slow, exhausting, and physically demanding.

Her diligence gets noticed before Boaz ever speaks to her directly.

🌅 Ruth started work at sunrise

🥵 She worked without stopping for hours

💪 Gleaning was slow, physical labor

📖 Her hard work gets noticed first

## ⏸️ Tarried A Little In The House

Tarried means she rested for only a short time.

Even her one short break got specifically mentioned in the report.

The servant describes Ruth as someone who barely stopped working.

That detail says a lot about her character before Boaz meets her.

⏸️ Tarried means she rested briefly

📝 Even her short rest was noted

😮‍💨 She barely paused all day

📖 Her character precedes her introduction

# Ruth 2:8-9
# 🛡️ Boaz Offers Protection
---
## 🤝 Abide Here Fast By My Maidens

To abide fast by someone means staying close beside them.

Boaz tells Ruth not to wander off to a different field.

Staying near his own workers kept her safer and more visible.

This was real protection, not just a friendly suggestion.

🤝 Abide fast by means stay close

🚫 Boaz tells her not to wander

🛡️ Staying near his workers meant safety

📖 This was protection, not a suggestion

## ⚠️ Have I Not Charged The Young Men That They Shall Not Touch Thee

Boaz had already warned his male workers before Ruth ever arrived.

A foreign widow working alone in a field faced real danger.

Boaz removed that danger before Ruth even had to ask.

His protection came before her fear, not after it.

⚠️ Foreign widows faced real danger

🗣️ Boaz warned his workers ahead of time

🛡️ He removed the danger himself

📖 His care came before her fear

## 💧 When Thou Art Athirst Go Unto The Vessels

Athirst simply means thirsty.

The vessels held water the young men had drawn for themselves.

Boaz opened his own workers' water supply to a foreign gleaner.

That water was normally reserved for hired hands, not outsiders.

💧 Athirst means thirsty

🪣 Vessels held water for workers

🤲 Boaz shared his own supply

📖 That water was normally off limits

# Ruth 2:10-13
# 🕊️ Grace In Boaz's Eyes
---
## 🙇 Then She Fell On Her Face And Bowed Herself To The Ground

This was a full physical gesture of deep respect and gratitude.

Ruth was not just saying thank you with words.

Her whole body expressed how overwhelmed she felt by his kindness.

Boaz's generosity had gone far beyond anything she expected.

🙇 A full bow showed deep respect

🙏 Words alone were not enough

😲 Ruth felt truly overwhelmed

📖 Boaz gave far more than expected

## 🌍 Seeing I Am A Stranger

Ruth names her own outsider status out loud.

A stranger had no guaranteed protection or claim under local custom.

She has no idea yet why Boaz would treat her so well.

Her humility makes his generosity even more striking.

🌍 Ruth calls herself a stranger

⚖️ Strangers had no guaranteed protection

❓ She does not know his reason

📖 Her humility highlights his kindness

## 📢 It Hath Fully Been Shewed Me

Shewed is an old spelling of showed.

Boaz already knew Ruth's story before he ever spoke to her.

News of her loyalty to Naomi had already spread through Bethlehem.

A small town noticed exactly what kind of woman Ruth was.

📢 Shewed means showed or told

👂 Boaz already knew her story

🏘️ Her loyalty had spread through town

📖 A small town notices real character

## 🏡 Left Thy Father And Thy Mother And The Land Of Thy Nativity

Nativity here simply means the land of her birth.

Ruth gave up her home country to follow Naomi to Israel.

That same language echoes God's call to Abraham to leave his homeland.

Boaz is comparing Ruth's faith to one of Israel's greatest ancestors.

🏡 Nativity means her birthplace

🚶 Ruth left her home country

📜 The wording echoes Abraham's own call

📖 Boaz compares her to Israel's ancestor

## 🐦 Under Whose Wings Thou Art Come To Trust

This pictures a mother bird sheltering her young under her wings.

Boaz is describing Ruth taking refuge in the God of Israel.

The image speaks of safety, warmth, and protection all at once.

Boaz himself will later become part of that same sheltering picture.

🐦 Wings picture a bird sheltering young

🙏 Ruth took refuge in God

🛡️ The image means safety and protection

📖 Boaz later becomes part of that shelter

## 🎁 Let Me Find Favour In Thy Sight My Lord

Favour here means kindness that is not required or owed.

Ruth is asking Boaz to keep treating her this same way.

Calling him my lord shows real respect for his position.

She still sees herself as beneath even his own hired workers.

🎁 Favour means unearned kindness

🙏 Ruth asks it to continue

🎩 My lord shows real respect

📖 She still sees herself as lowly

# Ruth 2:14-16
# 🍞 Bread And Secret Kindness
---
## 🍞 At Mealtime Come Thou Hither And Eat Of The Bread

Boaz invites Ruth to eat with his own workers as an equal.

A foreign gleaner did not normally share a meal with the landowner's crew.

This public gesture raised her status in front of everyone watching.

Boaz keeps choosing to honor her instead of merely tolerating her.

🍞 Boaz invites her to eat

📈 This raised her status publicly

👀 Everyone in the field was watching

📖 Boaz keeps honoring, not just tolerating her

## 🍇 Dip Thy Morsel In The Vinegar

The vinegar here was a sour wine drink used for dipping bread.

A morsel simply means a small piece of bread.

This was ordinary food eaten by common field workers every day.

Boaz shared his own simple lunch, not a special feast.

🍇 Vinegar was a sour wine drink

🍞 Morsel means a small piece

🌾 This was common worker food

📖 Boaz shared his own simple meal

## 🔥 Parched Corn

Parched corn means grain that has been roasted over a fire.

It was a simple, filling food common at harvest time.

Ruth ate until she was sufficed, which means fully satisfied.

She even had food left over to carry home to Naomi.

🔥 Parched corn means roasted grain

🌾 It was common harvest food

😋 Sufficed means fully satisfied

📖 She carried leftovers home to Naomi

## 🤫 Let Fall Also Some Of The Handfuls Of Purpose For Her

Boaz secretly told his workers to drop extra grain on purpose.

Normal gleaning law only allowed leftover grain after the reapers passed.

Boaz was quietly giving Ruth far more than the law required.

His kindness worked behind the scenes, not just in public.

🤫 Boaz secretly increased her harvest

📜 Normal law only allowed leftovers

🎁 He gave more than required

📖 His kindness worked behind the scenes

## 🗣️ And Rebuke Her Not

Reproach means shaming her with harsh words.

Rebuke means scolding or correcting her harshly.

Boaz doubled down on protecting Ruth from any harassment.

He made sure his generosity came with real safety attached.

🗣️ Reproach means shaming with words

😠 Rebuke means harsh scolding

🛡️ Boaz repeated his protection order

📖 Generosity and safety came together

# Ruth 2:17-19
# ⚖️ An Ephah Of Barley
---
## 🌇 So She Gleaned In The Field Until Even

Even here means evening, not the word for equal or fair.

Ruth worked a full day from morning all the way to dusk.

Her effort matched every bit of kindness Boaz had shown her.

Hard work and grace worked together throughout this whole chapter.

🌇 Even means evening here

💪 Ruth worked a full day

🤝 Her effort matched his kindness

📖 Work and grace work together

## 📏 An Ephah Of Barley

An ephah was a dry measurement, about the size of a large basket.

That amount could weigh close to thirty pounds of grain.

Gleaning that much in one day was an unusually large haul.

God's abundance was showing up in the size of her harvest.

📏 An ephah was a dry measurement

⚖️ It weighed close to thirty pounds

📈 That haul was unusually large

📖 Abundance showed up in her harvest

## 🚶 She Took It Up And Went Into The City

Ruth carried this heavy load all the way back to Bethlehem.

That is a serious amount of grain to carry by hand.

Her determination matched the size of what she brought home.

Every step of this chapter shows real effort, not luck alone.

🚶 Ruth carried the grain home

💪 It was a heavy, serious load

🏘️ She returned all the way to Bethlehem

📖 Effort matched luck in her story

## 😲 Her Mother In Law Saw What She Had Gleaned

Naomi's reaction is not recorded, but the amount speaks for itself.

No gleaner brought home this much grain in one ordinary day.

Naomi immediately senses something unusual happened out in that field.

Her questions are about to reveal exactly what took place.

😲 Naomi sees an unusual amount

❓ No normal day produced this much

🔍 Naomi senses something happened

📖 Her questions come next

## 👀 Blessed Be He That Did Take Knowledge Of Thee

To take knowledge of someone means noticing and favoring them.

Naomi blesses this mystery man before she even knows his name.

Her instincts are already telling her something good has happened.

She is about to learn that good thing has a name.

👀 Take knowledge means noticing someone

🙏 Naomi blesses him before naming him

✨ Her instincts sense something good

📖 That good thing gets a name next

# Ruth 2:20-23
# 👑 Naomi Names The Kinsman
---
## 🙌 Blessed Be He Of The LORD Who Hath Not Left Off His Kindness

Naomi recognizes God's own hand working through Boaz's actions.

The word behind kindness here is the same hesed from chapter one.

Hesed means loyal love that goes beyond what is required.

Naomi sees that same loyal love returning to her family now.

🙌 Naomi credits God's own hand

🕊️ Kindness here is the word hesed

🤝 Hesed means loyal, faithful love

📖 That same love returns to her family

## 👨‍👩‍👦 The Man Is Near Of Kin Unto Us, One Of Our Next Kinsmen

A near kinsman was a close relative with special legal duties.

Israelite law allowed this relative to redeem land or marry a widow.

That role kept a dead man's name and property inside the family.

Naomi has just discovered Boaz can legally act as that rescuer.

👨‍👩‍👦 Near kinsman means a close relative

📜 That relative had special legal duties

🏠 It kept land inside the family

📖 Boaz can legally act as rescuer

## 🔁 Thou Shalt Keep Fast By My Young Men

Boaz already offered Ruth this same protection back in verse nine.

Ruth repeats his exact words back to Naomi word for word.

Her careful memory shows how much his kindness meant to her.

The offer of safety is confirmed a second time in this chapter.

🔁 Ruth repeats Boaz's exact words

💭 She remembers his kindness clearly

🛡️ The protection offer gets confirmed again

📖 Safety is stated twice in this chapter

## ✅ That They Meet Thee Not In Any Other Field

Naomi agrees that staying in one field is the wisest choice.

Other fields offered no guarantee of the same safety or kindness.

Naomi is protecting Ruth just as carefully as Boaz already is.

Both women are working together to keep Ruth safe now.

✅ Naomi agrees staying is wisest

⚠️ Other fields offered no guarantee

🛡️ Naomi protects Ruth too

📖 Both women work to keep her safe

## 🌾 Unto The End Of Barley Harvest And Of Wheat Harvest

Barley harvest came first, followed several weeks later by wheat harvest.

Together these two harvests covered a span of about seven weeks.

Ruth stayed safely in Boaz's field through this entire season.

This quiet stretch of time sets up what happens next in Ruth's story.

🌾 Barley harvest came before wheat

📆 The two harvests spanned weeks

🛡️ Ruth stayed safe the whole season

📖 This season sets up what comes next
`.trim();

export const RUTH_TWO_PERSONAL_SECTIONS = parseRuthTwoRawNotes(RUTH_TWO_RAW_NOTES);
