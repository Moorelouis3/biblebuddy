export type PsalmsThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyEightRawNotes(rawText: string): PsalmsThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 38:${startVerse}` : `Psalms 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 38 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_EIGHT_RAW_NOTES = `# Psalms 38:1-4
# 🏹 Discipline That Wounds Like Arrows
---
## 😡 Rebuke Me Not In Thy Wrath

"Rebuke" means correction spoken directly, a verbal warning.

"Chasten" describes discipline carried out through real consequences.

David asks God to hold back both at once.

He is not denying his guilt.

He is asking for mercy in how that guilt gets handled.

This whole psalm grows out of that one opening plea.

😡 Rebuke means verbal correction
⚡ Chasten means disciplinary consequences
🙏 David asks for mercy, not denial
📖 The whole psalm grows from this plea

## 🔥 Chasten Me In Thy Hot Displeasure

"Wrath" and "hot displeasure" name the same anger in two ways.

Hebrew poetry often repeats one idea using two different words.

The repetition is not padding, it is emphasis.

David is not facing a mild rebuke here.

He is facing the full weight of God's anger toward sin.

🔥 Hot displeasure repeats wrath
🔁 Hebrew poetry often repeats one idea twice
⚖️ Repetition here means emphasis, not padding
📖 David faces the full weight of God's anger

## 🎯 Thine Arrows Stick Fast In Me

Arrows piercing the body is a common Hebrew picture for deep affliction.

The pain feels as real and sharp as a physical wound.

David is not only describing physical suffering here.

He is naming the ache guilt leaves behind long after any single sin.

That ache lodges deep and does not simply pull free.

🎯 Arrows picture deep affliction
🩹 The pain feels physically real
⏳ Guilt lingers long after the sin
📖 It lodges deep and does not pull free

## ✋ Thy Hand Presseth Me Sore

A hand pressing down pictures heavy, continuous weight.

This is not one quick blow.

It is steady pressure that does not let up.

David feels God's discipline as something pressing on him constantly.

✋ A pressing hand means steady weight
🚫 Not one quick blow
⏳ Pressure that does not let up
📖 Discipline here feels constant, not brief

## 🩹 No Soundness In My Flesh Because Of Thine Anger

"Soundness" means wholeness, a body free of injury or sickness.

David says none of that wholeness remains in him.

He connects this physical collapse directly to God's anger.

This phrase returns again later in the psalm.

The repeat shows how completely this guilt has spread through him.

🩹 Soundness means bodily wholeness
💔 None of that wholeness remains
⚡ Physical collapse tied to God's anger
📖 This phrase returns again later in the psalm

## 🦴 No Rest In My Bones Because Of My Sin

Bones in Hebrew thought often stand for a person's inner strength.

David says even that deep strength cannot find rest.

The first half of this verse blamed God's anger.

This second half names the real cause, his own sin.

Guilt has reached all the way to his core.

🦴 Bones picture inner strength
😔 Even that strength finds no rest
🎯 This half names the true cause
📖 Guilt has reached his very core

## 🌊 Mine Iniquities Are Gone Over Mine Head

This pictures floodwater rising until it closes completely over someone's head.

David is not describing a manageable problem.

He feels fully submerged by the weight of his own wrongdoing.

The picture is drowning, not simply struggling.

🌊 Pictures floodwater rising over the head
🏊 Not a manageable problem
😰 David feels fully submerged
📖 The picture is drowning, not struggling

## 🏋️ As An Heavy Burden They Are Too Heavy For Me

The flood image now shifts to a second picture, a burden.

A burden this heavy could crush the person carrying it.

David admits plainly that he cannot bear this weight alone.

Naming that limit honestly is the first step toward the hope later in this psalm.

🏋️ A second picture, a crushing burden
😫 Too heavy to carry alone
🙋 David admits his own limit
📖 Honesty here prepares later hope

# Psalms 38:5-9
# 🤕 The Body Carries The Guilt
---
## 🤢 My Wounds Stink And Are Corrupt Because Of My Foolishness

David pictures untreated wounds left to rot instead of being cleaned.

"Foolishness" here means moral folly, not silliness or a simple mistake.

An infected wound only worsens the longer it goes unattended.

Unconfessed sin works the same way inside a person.

🤢 Untreated wounds left to rot
🧠 Foolishness means moral folly here
⏳ Infection worsens the longer it waits
📖 Unconfessed sin works the same way

## 😔 I Go Mourning All The Day Long

Mourning here is not one bad afternoon.

David describes a grief that fills every single day.

There is no relief built into this season for him.

The weight from earlier verses has become his constant company.

😔 Mourning fills every day, not one
⏳ No relief built into this season
🧳 The weight has become constant company
📖 Some grief does not let up

## 🔥 My Loins Are Filled With A Loathsome Disease

"Loins" often represents a person's core strength and vitality in Hebrew.

A loathsome disease pictures something consuming that vitality from within.

The phrase no soundness in my flesh returns from verse three.

Repeating it shows the guilt has now spread everywhere, not just to one place.

🔥 Loins picture core strength
🦠 Disease pictures vitality being consumed
🔁 No soundness in my flesh repeats verse three
📖 The guilt has now spread everywhere

## 😩 I Have Roared By Reason Of The Disquietness Of My Heart

"Roared" describes groaning out loud, not staying silent in pain.

"Disquietness" means deep inner turmoil, more than simple worry.

David is not hiding how bad this feels.

He lets the depth of his suffering be heard.

😩 Roared means groaning aloud
🌀 Disquietness means deep inner turmoil
🙊 David does not hide this pain
📖 He lets his suffering be heard

## 🙏 My Groaning Is Not Hid From Thee

This verse turns from suffering out loud to a quieter comfort.

David stops explaining his pain to people around him.

He simply trusts that God already sees all of it.

Nothing about this suffering has gone unnoticed by God.

🙏 A quieter comfort begins here
🤐 David stops explaining himself to others
👁️ God already sees all of it
📖 Nothing here goes unnoticed by God

# Psalms 38:10-14
# 🚶 Abandoned By Friends, Silent Before Enemies
---
## 💔 The Light Of Mine Eyes, It Also Is Gone From Me

"The light of mine eyes" is an old idiom for vitality and life itself.

This is not describing failing eyesight.

David means his very strength and spark for living have faded.

Even his own body no longer feels like his to command.

💔 Light of the eyes means vitality
👀 Not literally about eyesight
🔋 His strength and spark have faded
📖 Even his body feels beyond his control

## 🥺 My Lovers And My Friends Stand Aloof From My Sore

"Sore" here refers to David's affliction, not a small physical injury.

People closest to him have chosen to keep their distance.

Suffering often reveals who actually stays close to someone.

David is losing comfort exactly when he needs it most.

🥺 Sore means his whole affliction
🚶 Friends have chosen distance instead
🔍 Suffering reveals who truly stays
📖 Comfort fades exactly when needed most

## 👪 My Kinsmen Stand Afar Off

Even family, not just friends, keep their distance in this verse.

Kinsmen were normally the last support to disappear in this culture.

David names this loss specifically to show how complete the abandonment feels.

Nobody close to him remains close now.

👪 Even family kept its distance
🏠 Kinsmen were usually the last support
📉 This shows abandonment is complete
📖 Nobody close remains close now

## 🪤 Lay Snares For Me

A snare is a hidden trap set for an unsuspecting animal.

David describes his enemies hunting him this same way.

Their attacks are not open and honest.

They are calculated and hidden, waiting for him to make one wrong step.

🪤 A snare is a hidden trap
🎯 Enemies hunt him the same way
🙈 Their attacks are calculated, not honest
📖 They wait for one wrong step

## 🗣️ Imagine Deceits All The Day Long

This plotting is not occasional, it happens constantly.

The phrase all the day long already described David's mourning in verse six.

Now that same constant pattern describes his enemies' scheming instead.

Their cruelty runs on the same nonstop timeline as his own grief.

🗣️ Deceit here is constant, not occasional
🔁 All the day long echoes verse six
😈 Now describing his enemies' scheming
📖 Their cruelty runs on his own timeline

## 🙉 As A Deaf Man, Heard Not

David chooses this silence on purpose.

It is not actual hearing loss.

He refuses to answer every accusation thrown at him.

Staying quiet like this takes real discipline.

This silence sets up the trust described later in the psalm.

🙉 Deafness here is chosen, not real
🛑 He refuses to answer accusations
💪 Silence like this takes discipline
📖 It sets up the trust ahead

## 🤐 As A Dumb Man That Openeth Not His Mouth

"Dumb" here is an old word for someone unable or unwilling to speak.

David pairs deafness with muteness in the same verse.

Together they picture someone choosing total silence under pressure.

This is restraint, not weakness.

🤐 Dumb means unable or unwilling to speak
🔁 Paired here with deafness
🧘 Together they picture total silence
📖 This is restraint, not weakness

## 👂 In Whose Mouth Are No Reproofs

A "reproof" is a sharp reply meant to correct or argue back.

David says he offers none, even under real pressure.

He is not defending himself point by point.

This same kind of silence appears later in Isaiah's picture of a suffering servant.

👂 Reproofs means sharp counter arguments
🚫 David offers none here
🛡️ He is not defending himself
📖 Isaiah later pictures this same silence

# Psalms 38:15-20
# ⏳ Silent Trust While Enemies Thrive
---
## 🙏 In Thee, O LORD, Do I Hope

This verse explains why David stayed silent in the verses before it.

He was not staying quiet out of weakness or fear alone.

He was placing his defense entirely in God's hands instead.

Trusting God can look like silence from the outside.

🙏 This explains the earlier silence
🛡️ Not weakness, but a choice
🤲 His defense is placed in God's hands
📖 Trust can look like silence outside

## 😬 Lest Otherwise They Should Rejoice Over Me

David names a specific fear, watching his enemies gloat over his fall.

That kind of public shame would add pain on top of pain.

Asking God to be heard is also asking to be spared that shame.

😬 A specific fear, enemies gloating
💔 Public shame adds pain on pain
🙏 He asks to be spared that shame
📖 Being heard means being protected too

## 🦶 When My Foot Slippeth, They Magnify Themselves Against Me

A slipping foot is an old picture for failure or misfortune.

"Magnify themselves" means his enemies would boast and celebrate over any misstep.

David is describing people who are waiting for him to fall.

Their support was never real to begin with.

🦶 A slipping foot pictures failure
📣 Magnify themselves means boasting over him
👀 Enemies are waiting for his misstep
📖 Their support was never real

## 🥀 I Am Ready To Halt

"Halt" is an old word for stumbling or nearly falling.

David admits he is right on the edge of collapse.

This is an honest confession, not an exaggeration for sympathy.

Naming weakness honestly is different from giving up entirely.

🥀 Halt means nearly falling
😓 David admits he is near collapse
✅ This is honesty, not exaggeration
📖 Naming weakness is not giving up

## 📢 I Will Declare Mine Iniquity

David chooses to confess openly instead of staying silent here.

This contrasts sharply with the silence he kept toward his enemies earlier.

He stays quiet before accusers but speaks freely before God.

Confession, not self defense, is where he places his energy.

📢 Confession replaces silence here
🆚 This contrasts his silence toward enemies
🙏 Quiet before people, honest before God
📖 His energy goes toward confession

## 💪 Mine Enemies Are Lively, And They Are Strong

"Lively" here means vigorous and thriving, full of energy.

This stands in sharp contrast to David's own weakness described earlier in the psalm.

His enemies appear to be winning while he is barely standing.

That unfair contrast is part of what makes this prayer so honest.

💪 Lively means vigorous and thriving
🆚 Contrasts his own weakness earlier
📈 Enemies seem to be winning
📖 This unfair contrast makes the prayer honest

## 🎯 They That Hate Me Wrongfully Are Multiplied

"Wrongfully" states plainly that David has done nothing to earn this hatred.

The number of enemies is not shrinking, it is growing.

This is innocent suffering, not deserved punishment from other people.

Other psalms wrestle with this exact same unfair pattern.

🎯 Wrongfully means undeserved hatred
📈 Their numbers are growing, not shrinking
😔 This is innocent suffering
📖 Other psalms wrestle with this pattern

## 🔄 Render Evil For Good

This phrase describes a complete reversal of fairness.

David has done good, yet evil comes back to him instead.

He names this injustice directly rather than pretending it makes sense.

Facing it honestly matters more than explaining it away.

🔄 Fairness is completely reversed here
👍 Good was done, evil returned
😔 David names this injustice directly
📖 Honesty matters more than explaining it away

# Psalms 38:21-22
# 🙏 A Final Cry For Help
---
## 🙏 Forsake Me Not, O LORD

This plea directly answers the abandonment named earlier in the psalm.

Friends, kinsmen, and even his own strength had all pulled away.

David now asks the one relationship left to hold steady.

He does not ask God to fix everything.

He simply asks God to stay close.

🙏 Answers the abandonment named earlier
👪 Friends and kinsmen had pulled away
🤝 David asks God to stay close
📖 Presence matters more than a quick fix

## 🏃 Make Haste To Help Me, O Lord My Salvation

"Make haste" means come quickly, not eventually.

Naming God as "my salvation" ties the whole psalm together in one title.

Every wound, every accusation, and every fear in this psalm has led to this one plea.

David ends not with a solution but with a person he trusts completely.

🏃 Make haste means come quickly
🛟 Salvation names God directly here
🧵 Every earlier verse leads to this plea
📖 The psalm ends in trust, not solutions
`.trim();

export const PSALMS_THIRTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsThirtyEightRawNotes(PSALMS_THIRTY_EIGHT_RAW_NOTES);
