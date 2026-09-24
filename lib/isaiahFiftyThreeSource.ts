export type IsaiahFiftyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyThreeRawNotes(rawText: string): IsaiahFiftyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+53:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 53 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+53:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+53:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 53 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 53,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 53:${startVerse}` : `Isaiah 53:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 53 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_THREE_RAW_NOTES = `# Isaiah 53:1-3
# 😔 Despised And Rejected Of Men
---
## 📢 Who Hath Believed Our Report

Report means the message that was preached about him.

This question opens the entire chapter.

Almost no one believed what they heard.

The rest of the chapter explains exactly why.

📢 Report means the message that was preached

❓ The chapter opens with a hard question

👎 Almost no one believed it

📖 The rest of the chapter explains why

## 💪 To Whom Is The Arm Of The LORD Revealed

Arm of the LORD is an old picture for God acting in power.

Isaiah already used this same picture back in chapter fifty one.

Here that same powerful arm takes the form of a suffering man.

Almost no one recognized God's power when it finally appeared this way.

💪 Arm of the LORD means God's power

📖 Chapter fifty one used this same picture

😳 That same arm now took human form

➡️ Almost no one recognized it

## 🌱 He Shall Grow Up Before Him As A Tender Plant

Tender plant means a small young shoot, not yet strong.

This pictures a quiet, ordinary beginning, not a royal birth.

Think of a single sprout pushing up through hard soil.

No one expects power to come from something this small.

🌱 Tender plant means a small young shoot

👶 It pictures a quiet, ordinary beginning

🌾 A sprout, not a king's birth

📖 Power came from something small and unnoticed

## 🏜️ As A Root Out Of A Dry Ground

Dry ground means soil too barren to support real growth.

A root growing there survives against the odds from the start.

This describes the humble, unlikely place the servant comes from.

Nothing about his origin looked promising to the people watching.

🏜️ Dry ground means barren, lifeless soil

🌱 A root there survives against the odds

👀 His origin looked unpromising to onlookers

📖 God works through unlikely beginnings

## 👀 He Hath No Form Nor Comeliness

Form and comeliness both describe an impressive, attractive appearance.

This corrects an assumption a reader might bring to this chapter.

The Messiah does not arrive looking like a king or a warrior.

Nothing about his outward appearance would draw a crowd.

👀 Form and comeliness mean an attractive appearance

🚫 He does not look like a king

⚔️ Nor does he look like a warrior

📖 His power was never in his appearance

## 😔 Despised And Rejected Of Men

Despised means looked down upon as worthless.

Rejected means actively refused and turned away.

Both words describe how people treated him in his own lifetime.

This sets up the deep irony running through the whole chapter.

😔 Despised means looked down upon as worthless

🚪 Rejected means actively turned away

📆 Both describe his own lifetime, not later history

📖 The chapter's central irony begins here

## 😢 A Man Of Sorrows, And Acquainted With Grief

Sorrows here means deep, ongoing suffering, not a single sad day.

Acquainted with grief means grief was a familiar companion, not a stranger.

This was not one bad season in an otherwise easy life.

Suffering marked him from beginning to end.

😢 Sorrows means deep, ongoing suffering

🤝 Acquainted with grief means grief was familiar

📆 This was not one bad season

📖 Suffering marked his whole life

## 🙈 We Hid As It Were Our Faces From Him

Hiding one's face was a way of avoiding someone in shame or disgust.

People looked away from him the way they would look away from something unpleasant.

Esteemed him not means they placed no value on him at all.

The crowd's reaction to him was silence and avoidance, not curiosity.

🙈 Hiding the face means turning away in disgust

👎 People treated him as unpleasant to look at

💔 Esteemed him not means valued at nothing

📖 Avoidance, not curiosity, was the crowd's response

# Isaiah 53:4-6
# 🐑 He Bore Our Griefs
---
## 🎒 Surely He Hath Borne Our Griefs, And Carried Our Sorrows

Borne and carried both describe taking on a weight that belonged to someone else.

Griefs and sorrows include sickness and suffering, not only emotional pain.

He did not simply sympathize with these burdens from a distance.

He personally took them on himself.

🎒 Borne and carried mean taking on another's weight

🤒 Griefs and sorrows include sickness, not just sadness

👀 He did not just sympathize from a distance

📖 He personally carried these burdens himself

## ❓ Yet We Did Esteem Him Stricken, Smitten Of God, And Afflicted

Onlookers assumed his suffering proved God was punishing him.

In this culture, visible suffering was often read as a sign of hidden sin.

That assumption about him was completely wrong.

The next verse corrects it directly.

❓ Onlookers assumed his suffering meant punishment

🤔 Suffering was often read as a sin sign

🚫 That assumption about him was wrong

📖 The next verse corrects it directly

## 🗡️ He Was Wounded For Our Transgressions

Transgressions means acts of open rebellion against God.

Wounded describes a real, physical injury, not a figure of speech.

The wounds he received belonged to other people's rebellion, not his own.

This is the chapter's clearest statement of substitution.

🗡️ Transgressions means open rebellion against God

🩸 Wounded describes a real physical injury

🔄 The wounds belonged to someone else's rebellion

📖 This states substitution plainly

## 💔 He Was Bruised For Our Iniquities

Iniquities means guilt, the weight a wrong action leaves behind.

Bruised pictures being crushed under pressure, not just struck once.

Transgressions in the line before named the acts themselves.

Iniquities names the guilt those acts left behind.

💔 Iniquities means the guilt a wrong leaves behind

⚖️ Bruised pictures being crushed under pressure

🔁 Transgressions named the act, this names the guilt

📖 Both words point to the same substitution

## ⚖️ The Chastisement Of Our Peace Was Upon Him

Chastisement means punishment meant to correct or restore.

Peace here means wholeness, the opposite of everything broken by sin.

The punishment that should have restored that peace fell on him instead.

He absorbed the correction so others could receive the wholeness.

⚖️ Chastisement means punishment meant to restore

🕊️ Peace means wholeness, not just calm feelings

🔄 The correction fell on him, not us

📖 He absorbed it so others could be whole

## 🩹 With His Stripes We Are Healed

Stripes means the wounds left by a whipping.

Healed here reaches further than physical health alone.

It points to being restored in a relationship with God.

The wounds that harmed him became the source of that healing.

🩹 Stripes means wounds left by a whipping

🙏 Healed here means restored to God

🔄 His wounds became the source of healing

📖 Suffering became the doorway to wholeness

## 🐑 All We Like Sheep Have Gone Astray

Sheep wander easily and rarely find their own way back.

This pictures sin as wandering off, not just breaking a rule.

Every single person is included in this picture, not a select few.

Nobody in this chapter gets to stand outside the description.

🐑 Sheep wander easily and cannot find their way

🧭 Sin here means wandering, not just rule breaking

👥 Every person is included, not a select few

📖 No reader stands outside this description

## 🎯 The LORD Hath Laid On Him The Iniquity Of Us All

This line is the turning point of the whole chapter.

Everyone's guilt, described in the line before, gets collected in one place.

That collected guilt is placed on one person instead of being scattered.

The servant carries what belonged to everyone else.

🎯 This line is the chapter's turning point

📦 Everyone's guilt gets collected in one place

👤 It is placed on one person, not scattered

📖 He carries what belonged to everyone else

# Isaiah 53:7-9
# 🤐 Silent Before His Shearers
---
## 🤐 Yet He Opened Not His Mouth

Silence here does not mean he had no defense to offer.

He chose not to argue back against a plainly unjust process.

This was restraint, not weakness or resignation.

The same silence appears twice in this one verse.

🤐 Silence did not mean he had no defense

🛡️ He chose restraint over arguing back

💪 This was strength, not weakness

📖 This same silence appears twice here

## 🐑 He Is Brought As A Lamb To The Slaughter

A lamb led to slaughter has no idea what is coming and does not resist.

This picture connects directly to the lambs sacrificed at Passover.

Later, John the Baptist calls Jesus the Lamb of God using this same image.

The comparison points forward to an actual sacrifice.

🐑 A lamb led to slaughter does not resist

🩸 This connects to the Passover lamb

📖 John the Baptist later reuses this image

➡️ It points forward to an actual sacrifice

## ✂️ As A Sheep Before Her Shearers Is Dumb

Shearing meant a sheep was held down and had its wool cut off.

A calm sheep during shearing was actually the normal, expected picture.

Dumb here is an old word meaning silent, not unintelligent.

His silence under mistreatment matched that same calm picture.

✂️ Shearing meant cutting off a sheep's wool

😌 A calm sheep was the expected picture

🤐 Dumb here is an old word for silent

📖 His silence matched that same calm picture

## ⛓️ He Was Taken From Prison And From Judgment

This describes an arrest followed by a judgment with no real defense.

Judgment here points to an unfair legal process, not a careful trial.

No one stood up to argue that he was innocent.

The whole process moved forward without justice.

⛓️ This describes an arrest and unfair judgment

⚖️ Judgment here means an unjust legal process

🙊 No one argued that he was innocent

📖 Injustice, not justice, drove this process

## ❓ Who Shall Declare His Generation

This difficult phrase has more than one accepted reading among scholars.

Many scholars believe it points to a life cut short before a family line could continue.

Others connect it to no one at his trial speaking up for him.

Either way, the line points to a death that came far too early.

❓ Scholars read this phrase more than one way

👨‍👩‍👧 One reading points to a life cut short

🗣️ Another points to no one defending him

📖 Both point to an unjustly early death

## ⚰️ For He Was Cut Off Out Of The Land Of The Living

Cut off out of the land of the living is a direct way to say he would die.

This removes any doubt about what happens to him in this chapter.

The suffering described earlier ends in an actual death.

This was not a near death experience or a metaphor.

⚰️ A direct way to say he died

🚫 No doubt is left about the outcome

💀 The suffering ends in actual death

📖 This was never just a metaphor

## 👥 For The Transgression Of My People Was He Stricken

My people signals God speaking in the first person here.

Stricken repeats the same accusation onlookers wrongly made back in verse four.

This time the text confirms the true reason behind the stroke.

It was not his own sin, but everyone else's.

👥 My people means God speaking in first person

🔁 Stricken repeats the accusation from verse four

✅ The true reason is confirmed here

📖 It was everyone else's sin, not his

## 💰 He Made His Grave With The Wicked, And With The Rich In His Death

Criminals in this culture were usually buried in a shared, dishonorable grave.

This verse predicts his death would look exactly like a criminal's death.

Yet somehow his burial ends up among the rich instead.

The Gospels record a rich man named Joseph of Arimathea giving him his own tomb.

💰 Criminals normally received a shared, dishonorable grave

😳 His death looked exactly like a criminal's

🏺 His burial ended up among the rich

📖 A rich man's tomb fulfills this exactly

## ✅ He Had Done No Violence, Neither Was Any Deceit In His Mouth

This line finally answers the false assumption raised back in verse four.

His suffering was never a punishment for something he actually did.

Violence and deceit stand for wrongdoing in both action and speech.

Neither one was ever found in him.

✅ This answers the false assumption from verse four

🚫 His suffering was not punishment for himself

🗣️ Violence and deceit cover both deed and word

📖 Neither one was ever found in him

# Isaiah 53:10-12
# 🏆 It Pleased The LORD To Bruise Him
---
## 🙏 Yet It Pleased The LORD To Bruise Him

This does not mean God enjoyed watching him suffer.

Pleased here means this suffering accomplished exactly what God planned.

The bruising in this verse was purposeful, not senseless cruelty.

God's plan to save people moved forward through it.

🙏 This does not mean God enjoyed cruelty

🎯 Pleased means this fulfilled God's plan

📋 The bruising was purposeful, not senseless

📖 God's plan to save people moved through it

## 🐐 Make His Soul An Offering For Sin

Offering for sin was a specific sacrifice described back in Leviticus.

That sacrifice covered guilt that ordinary worship could not remove.

Here that entire sacrificial system points forward to one final offering.

His own life becomes that offering.

🐐 This offering was described back in Leviticus

📜 It covered guilt ordinary worship could not remove

🔮 The whole system points to one final offering

📖 His own life became that offering

## 🌱 He Shall See His Seed, He Shall Prolong His Days

Seed means descendants, a spiritual family rather than blood children here.

Prolong his days means continuing to live, not simply being remembered.

Both promises directly answer being cut off from the living back in verse eight.

Death in this chapter is not presented as the final word.

🌱 Seed here means a spiritual family

📆 Prolong his days means continuing life, not memory

🔁 Both answer being cut off in verse eight

📖 Death is not the final word here

## 😌 He Shall See Of The Travail Of His Soul, And Shall Be Satisfied

Travail is an old word for the intense pain of childbirth.

That kind of pain produces something worth the suffering in the end.

His suffering, described through this whole chapter, works the same way.

What comes out of it satisfies him completely.

😌 Travail is an old word for labor pain

👶 That pain produces something worth it

🔄 His suffering works the same way

📖 The result satisfies him completely

## ⚖️ By His Knowledge Shall My Righteous Servant Justify Many

Justify is a courtroom word meaning declared not guilty.

My righteous servant is a title God uses for him directly.

Knowledge here points to what he reveals about God through his suffering.

Many people, not just a select few, receive this verdict.

⚖️ Justify means declared not guilty

👤 Righteous servant is God's own title for him

👥 Many receive this, not just a select few

📖 Knowledge points to what he reveals about God

## 🏆 Therefore Will I Divide Him A Portion With The Great

This pictures a reward given to a victorious general after a battle.

The image is surprising, since he never looked victorious in this chapter.

His humiliation, described earlier, is answered here with real honor.

Shame did not get the final say in his story.

🏆 This pictures a general's reward after battle

😳 That image is surprising after such humiliation

🔄 Earlier shame is answered here with honor

📖 Shame did not get the final say

## 🎭 He Was Numbered With The Transgressors

Numbered with the transgressors means counted as one criminal among others.

The Gospels describe him crucified between two actual criminals.

This detail in Isaiah was written centuries before that moment happened.

The match between the two is exact.

🎭 Numbered with transgressors means counted as a criminal

✝️ The Gospels place him between two criminals

📆 Isaiah wrote this centuries earlier

📖 The match between them is exact

## 🕊️ He Bare The Sin Of Many, And Made Intercession For The Transgressors

Bare the sin repeats the same substitution named throughout this whole chapter.

Intercession means speaking up on someone else's behalf.

This was not a suffering that ended once it was finished.

His work continues on behalf of the very people who rejected him.

🕊️ Bare the sin repeats the chapter's whole theme

🗣️ Intercession means speaking up for someone else

♾️ This work did not end there

📖 He still speaks for those who rejected him
`.trim();

export const ISAIAH_FIFTY_THREE_PERSONAL_SECTIONS = parseIsaiahFiftyThreeRawNotes(ISAIAH_FIFTY_THREE_RAW_NOTES);
