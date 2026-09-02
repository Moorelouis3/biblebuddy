export type JobThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyFourRawNotes(rawText: string): JobThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 34:${startVerse}` : `Job 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Job 34 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_FOUR_RAW_NOTES = `# Job 34:1-4
# 👂 Elihu Widens His Audience
---
## 🗣️ Hear My Words, O Ye Wise Men

Elihu now turns from Job alone to a wider group of listeners.

"Wise men" likely refers to other men present who were known for careful thinking.

Until this point his whole speech had been aimed straight at Job.

This shift invites outside judges into the argument.

🗣️ Elihu widens his audience

🧠 Wise men means careful, respected thinkers

👥 His speech had been aimed at Job

📖 Elihu invites outside judgment

## 👂 The Ear Trieth Words, As The Mouth Tasteth Meat

Elihu compares careful listening to tasting food before eating it.

"Trieth" means to test or examine something closely.

The mouth checks whether food is good before swallowing.

The ear must test words the same way before accepting them.

👂 The ear tests words like taste

🍽️ Trieth means to test closely

😋 The mouth checks food before eating

📖 Words deserve the same careful test

## 🤝 Let Us Choose To Us Judgment

Elihu invites everyone present to reason through this together.

"Judgment" here means the ability to discern right from wrong.

He is not asking them to simply pick a side.

He wants a shared search for what is genuinely good.

🤝 Elihu invites a shared reasoning process

⚖️ Judgment means discerning right from wrong

🚫 This is not picking a side

📖 The goal is finding what is good

# Job 34:5-9
# 🗣️ Elihu Quotes Job's Claims
---
## 🗣️ For Job Hath Said, I Am Righteous

Elihu now begins quoting Job's own words directly back to him.

Job had repeatedly claimed he had done nothing to deserve his suffering.

"Righteous" here means innocent of any wrongdoing that earned this pain.

Elihu wants everyone to hear the claim clearly before he answers it.

🗣️ Elihu quotes Job directly

✅ Righteous means innocent of wrongdoing

🔁 Job made this claim repeatedly

📖 Elihu wants the claim heard clearly

## ⚖️ And God Hath Taken Away My Judgment

This is the second half of Job's complaint in the same verse.

Job felt God had denied him a fair legal hearing.

"Judgment" here means the right to have his case heard justly.

Job believed he was being punished without ever getting his day in court.

⚖️ Job felt denied a fair hearing

📜 Judgment means the right to be heard justly

😔 Job felt punished without a trial

📖 This is the heart of his complaint

## 🩹 My Wound Is Incurable Without Transgression

Job insists his suffering makes no sense given his innocence.

"Transgression" means a willful act of wrongdoing, not an accident.

He claims his pain runs so deep it seems impossible to heal.

Yet he maintains he never earned it through sin.

🩹 Job calls his suffering incurable

📜 Transgression means willful wrongdoing

😖 The pain runs impossibly deep

📖 Job denies he earned it

## 😠 What Man Is Like Job, Who Drinketh Up Scorning Like Water

This line is Elihu's own accusation about Job, not Job's own words.

"Drinketh up scorning like water" means mocking God as easily as swallowing a drink.

Water was cheap and ordinary, taken without a second thought.

Elihu says Job now mocks God with that same careless ease.

😠 This is Elihu's own accusation

💧 Scorning like water means careless mockery

🥤 Water was consumed without a thought

📖 Elihu says Job mocks that easily

## 👥 Which Goeth In Company With The Workers Of Iniquity

Elihu accuses Job of associating with people who do evil.

"Workers of iniquity" describes those who practice wrongdoing as a pattern of life.

This is a serious charge, not a passing complaint.

Elihu is questioning the company Job's words seem to keep him in.

👥 Elihu accuses Job of evil company

📜 Workers of iniquity means habitual wrongdoers

⚠️ This is a serious charge

📖 Elihu questions who Job sounds like

## 💬 It Profiteth A Man Nothing That He Should Delight Himself With God

Elihu quotes what he hears as the real conclusion behind Job's complaints.

This claims serving God brings no actual benefit to a person.

"Profiteth" means to gain something worthwhile in return.

Elihu treats this idea as the most dangerous part of Job's argument.

💬 Elihu names Job's underlying conclusion

🚫 The claim is that serving God gains nothing

💰 Profiteth means gaining something worthwhile

📖 Elihu treats this as most dangerous

# Job 34:10-15
# 👑 God Will Not Do Wickedly
---
## 🚫 Far Be It From God, That He Should Do Wickedness

Elihu states his core defense of God before making his case.

"Far be it" is a strong way of saying something is completely unthinkable.

Elihu is not questioning whether God could sin.

He rules that possibility out entirely.

This becomes the foundation his whole argument stands on.

🚫 Wickedness in God is unthinkable

📜 Far be it means completely ruled out

🙅 Elihu is not questioning God's character

📖 This is the foundation of his case

## ⚖️ For The Work Of A Man Shall He Render Unto Him

This states the basic principle of God's justice Elihu is defending.

"Render" means to give back or repay in kind.

A person's own actions determine what they receive from God.

God causes each person to find exactly what his own ways deserve.

⚖️ This is Elihu's basic justice principle

🔄 Render means repay in kind

👣 A person's actions determine their outcome

📖 God matches ways to their result

## 🔁 Neither Will The Almighty Pervert Judgment

Elihu restates verse ten's claim in slightly different words.

"Pervert" means to twist something away from what is right.

Hebrew often repeated an idea like this for emphasis, not new information.

The repetition shows how firmly Elihu holds this conviction.

🔁 Elihu restates his earlier claim

📜 Pervert means twist away from right

🗣️ Hebrew repeats ideas for emphasis

📖 Repetition shows Elihu's firm conviction

## ❓ Who Hath Given Him A Charge Over The Earth

Elihu asks who exactly appointed God to His position of authority.

This is a rhetorical question with an obvious answer, no one.

God did not receive His authority as an assignment from someone above Him.

His rule over creation is original, not delegated.

❓ Elihu asks a rhetorical question

🚫 No one appointed God to His role

👑 God's authority was never assigned

📖 His rule is original, not delegated

## 🌬️ If He Gather Unto Himself His Spirit And His Breath

Elihu pictures what would happen if God simply withdrew His life giving presence.

"Spirit" and "breath" both point to the force that keeps a person alive.

This echoes how God first breathed life into man in Genesis.

The same breath that gave life could just as easily be withdrawn.

🌬️ Elihu pictures God withdrawing His breath

📜 Spirit and breath both mean life force

🔁 This echoes Genesis and man's creation

📖 The life giver could withdraw it

## 💀 All Flesh Shall Perish Together, And Man Shall Turn Again Unto Dust

This describes the result if God withdrew His life giving breath.

Every living creature would die together, not gradually.

"Turn again unto dust" echoes God's words to Adam after the fall.

Life is shown here as something completely dependent on God's ongoing will.

💀 This describes life without God's breath

🌍 All flesh would perish together

📜 Turn to dust echoes Adam's judgment

📖 Life depends on God's ongoing will

# Job 34:16-20
# ⚖️ No King Escapes God's Judgment
---
## 🎯 If Now Thou Hast Understanding, Hear This

Elihu challenges Job directly to follow his next argument closely.

This is not an insult about Job's intelligence.

It is a call to pay careful attention to what comes next.

Elihu wants Job engaged, not simply listening passively.

🎯 Elihu challenges Job to follow closely

🚫 This is not an insult

👂 It calls for careful attention

📖 Elihu wants active engagement

## ❓ Shall Even He That Hateth Right Govern?

Elihu asks whether someone who hates justice could ever be fit to rule.

The obvious answer is no, such a person could never govern well.

This question sets up his larger point about God as ruler.

God could never be that kind of unjust governor.

❓ Elihu asks if injustice could rule

🚫 The obvious answer is no

👑 This sets up his point about God

📖 God is not an unjust governor

## 🔄 Wilt Thou Condemn Him That Is Most Just?

Elihu now turns the same logic directly onto Job's complaint.

Job has been accusing God, who is described here as most just.

Condemning the most just being in existence makes no sense.

Elihu wants Job to see the contradiction in his own complaint.

🔄 Elihu turns the logic onto Job

⚖️ God is described as most just

🚫 Condemning perfect justice makes no sense

📖 Elihu exposes Job's contradiction

## 👑 Is It Fit To Say To A King, Thou Art Wicked?

Elihu points out that even human subjects do not speak this way to their king.

Approaching an earthly ruler and calling him wicked to his face was almost unthinkable.

Elihu is preparing to compare that risk to accusing God directly.

If a king deserves that much respect, God deserves even more.

👑 Subjects rarely spoke this way to kings

😨 Calling a king wicked was unthinkable

⚖️ Elihu builds toward God by comparison

📖 God deserves even greater respect

## ⚖️ How Much Less To Him That Accepteth Not The Persons Of Princes

Elihu argues it is even less appropriate to accuse God this way.

"Accepteth not the persons of princes" means God does not favor people for their rank.

God treats a poor man and a prince by the exact same standard.

Every person, regardless of status, is equally the work of His hands.

⚖️ Accusing God is even less appropriate

👑 God shows no favoritism to rank

🤝 Rich and poor are judged alike

📖 Everyone is equally His creation

## ⏱️ In A Moment Shall They Die

Elihu describes how suddenly God can bring down the powerful.

Death here can come without warning, even in the middle of the night.

"Without hand" means no human weapon or army was needed to do it.

Even the mightiest rulers have no real defense against God.

⏱️ Death can arrive without warning

🌙 Even midnight offers no safety

✋ Without hand means no human weapon

📖 The mightiest have no defense

# Job 34:21-25
# 👀 God Sees Every Path
---
## 👀 His Eyes Are Upon The Ways Of Man

Elihu shifts from God's fairness to God's constant awareness.

"Ways" here means the whole pattern of a person's choices and conduct.

Nothing about how someone lives goes unnoticed by God.

This sets up the point that no one can truly hide from Him.

👀 God constantly watches human conduct

🚶 Ways means a person's whole pattern

🔍 Nothing about a life goes unnoticed

📖 No one can hide from Him

## 🌑 There Is No Darkness, Nor Shadow Of Death

Elihu names two of the darkest images the ancient world knew.

"Shadow of death" was a common phrase for the deepest, most hopeless darkness.

Even that extreme darkness offers no true concealment from God.

The verse begins by ruling out any hiding place at all.

🌑 Elihu names the darkest images known

📜 Shadow of death means hopeless darkness

🚫 Even that offers no concealment

📖 No hiding place exists at all

## 🙈 Where The Workers Of Iniquity May Hide Themselves

This finishes the thought begun in the first half of the verse.

"Workers of iniquity" are people who practice wrongdoing as a way of life.

Job had earlier complained that God tracks him like a hostile watcher.

Elihu turns that same idea around to comfort the innocent and warn the guilty.

🙈 This completes the darkness image

📜 Workers of iniquity means habitual wrongdoers

🔄 Job used similar language differently

📖 The same truth warns the guilty

## ⚖️ He Will Not Lay Upon Man More Than Right

Elihu insists God never punishes a person beyond what is fair.

This directly answers Job's earlier fear of an overwhelming, unjust weight.

God does not need a formal hearing to determine what is right.

His judgment is already accurate without a courtroom process.

⚖️ God never punishes beyond what is fair

😨 This answers Job's fear of injustice

🏛️ God needs no formal hearing

📖 His judgment is already accurate

## 💥 He Shall Break In Pieces Mighty Men Without Number

Elihu returns to the theme of powerful rulers falling before God.

"Without number" stresses how many mighty men this has already happened to.

God simply replaces them with others when the time comes.

No single ruler is irreplaceable in God's larger plan.

💥 Mighty men fall before God

🔢 Without number means this happens often

🔄 God replaces rulers when needed

📖 No ruler is irreplaceable to Him

## 🔄 He Overturneth Them In The Night

God's knowledge of a person's deeds comes before any judgment falls.

"Overturneth" pictures a sudden, total reversal of someone's position.

Night was often when people felt least watched and most secure.

That false sense of safety offers no real protection from God.

🧠 God's knowledge comes before judgment

🔄 Overturneth means a sudden reversal

🌙 Night felt like safety to them

📖 That safety was never real

# Job 34:26-30
# 📢 The Cry Of The Poor Reaches Him
---
## 👁️ He Striketh Them As Wicked Men In The Open Sight Of Others

God's judgment on evildoers is not hidden away in secret.

"Open sight of others" means the punishment happens where people can see it.

This serves as a public warning to everyone watching.

Justice done in view teaches a lesson private punishment could not.

👁️ God's judgment happens publicly

📢 Open sight means others can see it

⚠️ It serves as a public warning

📖 Public justice teaches a lesson

## 🔙 Because They Turned Back From Him

This names the actual reason behind their punishment.

"Turned back" describes a deliberate departure from following God.

They are not condemned for an accident or a moment of weakness.

Refusing to even consider God's ways was their real failure.

🔙 Turned back means a deliberate departure

🚫 This was not an accident

🧠 They refused to consider His ways

📖 Refusal, not mistake, was the failure

## 📢 The Cry Of The Poor Cometh Unto Him

Elihu names who was actually harmed by these wicked rulers.

The poor had no power of their own to fight back.

Their cry describes a desperate appeal that reaches all the way to God.

No earthly authority stood between their suffering and God's attention.

📢 Elihu names who was truly harmed

🙇 The poor had no power to fight back

🙏 Their cry reaches all the way to God

📖 Nothing blocks their appeal from Him

## 👂 He Heareth The Cry Of The Afflicted

This restates the same truth from the sufferer's side instead of the ruler's.

"Afflicted" describes anyone crushed by suffering or oppression.

God is not simply aware of their pain, He actively listens to it.

This is the same God who would later hear Israel's cry in Egypt.

👂 God actively listens to suffering

📜 Afflicted means crushed by oppression

🔁 This restates the poor's cry

📖 The same God heard Israel in Egypt

## 🕊️ When He Giveth Quietness, Who Then Can Make Trouble?

Elihu describes how completely God controls a person's circumstances.

"Quietness" here means peace or rest that God grants.

No one can disturb the peace God chooses to give.

This same power applies equally to a whole nation or to one person.

🕊️ God controls peace completely

😌 Quietness means the rest God grants

🚫 No one can disturb it

📖 This applies to nations and individuals alike

## 🎭 That The Hypocrite Reign Not

Elihu names one clear purpose behind God's control over rulers.

"Hypocrite" here means someone who rules while hiding their true, godless character.

God works to prevent this kind of ruler from gaining lasting power.

Left unchecked, a hypocrite in power would trap the people under him.

🎭 Hypocrite means a godless ruler in disguise

🛑 God works to prevent lasting power

🪤 Ensnared means the people get trapped

📖 God protects people from bad rulers

# Job 34:31-33
# 🙏 A Model For Repentance
---
## 🙇 I Have Borne Chastisement, I Will Not Offend Any More

Elihu now models the kind of honest response God actually wants.

"Chastisement" means the correction or discipline a person receives for wrongdoing.

This response accepts correction rather than arguing against it.

It commits to real change, not just an apology in words.

🙇 Elihu models an honest response

📜 Chastisement means correction for wrongdoing

✅ It accepts correction instead of arguing

📖 It commits to real change

## 🙏 That Which I See Not Teach Thou Me

This is a humble request for God to reveal blind spots.

A person often cannot see their own wrongdoing without help.

The prayer asks God to show what is currently hidden from view.

It pairs honestly with a promise to actually change once shown.

🙏 This asks God to reveal blind spots

👀 People often miss their own faults

💡 The prayer asks for that light

📖 It pairs with a promise to change

## ❓ Should It Be According To Thy Mind?

Elihu challenges Job's expectation that God must meet his own terms.

God does not owe anyone a settlement shaped to their personal preference.

"Recompense" means God will repay exactly as He decides, not as Job demands.

Elihu insists the decision belongs to God, not to Job's own judgment.

❓ Elihu challenges Job's expectation

🚫 God is not shaped by preference

⚖️ Recompense means God repays on His terms

📖 The decision belongs to God alone

# Job 34:34-37
# ⚠️ Elihu's Verdict Against Job
---
## 🙋 Let Men Of Understanding Tell Me

Elihu invites other wise listeners to weigh in on his argument.

This is not a demand for agreement, it is an open invitation.

He wants his reasoning tested by people capable of real judgment.

Confidence in an argument allows it to be examined openly.

🙋 Elihu invites outside listeners to weigh in

🤝 This is an invitation, not a demand

🧠 He wants reasoning tested by real judgment

📖 Confidence allows open examination

## ⚖️ Job Hath Spoken Without Knowledge

Elihu now states his verdict on Job's earlier complaints plainly.

"Without knowledge" means Job spoke without fully understanding what he was saying.

This is a strong charge, though not the same as calling Job wicked.

Elihu separates confused speech from an evil character.

⚖️ Elihu states his verdict plainly

📜 Without knowledge means speaking without understanding

🚫 This is not the same as wicked

📖 Confused speech differs from an evil heart

## 🔎 My Desire Is That Job May Be Tried Unto The End

Elihu wants Job's case examined fully, not cut short.

"Tried" here means tested or put through careful scrutiny.

He believes Job's complaints have echoed the arguments wicked men use.

Elihu wants the full weight of that comparison to be faced honestly.

🔎 Elihu wants Job's case fully examined

⚖️ Tried means tested through scrutiny

😟 Job's words echoed wicked men's arguments

📖 Elihu wants that faced honestly

## ⚠️ He Addeth Rebellion Unto His Sin

Elihu closes with his harshest accusation yet against Job.

He claims Job is compounding his troubles instead of easing them.

"Clappeth his hands" here pictures open mockery or defiant scorn, not applause.

Elihu believes Job's many words are only making his case against God worse.

⚠️ Elihu closes with his harshest charge

📈 Job is compounding his troubles

👏 Clapping hands here means defiant scorn

📖 More words only worsen Job's case
`.trim();

export const JOB_THIRTY_FOUR_PERSONAL_SECTIONS = parseJobThirtyFourRawNotes(JOB_THIRTY_FOUR_RAW_NOTES);
