export type JobSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobSeventeenRawNotes(rawText: string): JobSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 17:${startVerse}` : `Job 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 17 sections, received " + sections.length);
  }

  return sections;
}

const JOB_SEVENTEEN_RAW_NOTES = `# Job 17:1-3
# ⚰️ The Grave Is Waiting
---
## 🫁 My Breath Is Corrupt

"Corrupt" here means decaying or spoiled, not morally wicked.

Job is describing physical decline, not sin.

His body feels like it is already breaking down.

Ancient readers linked labored, failing breath to a body shutting down before death.

Job speaks like someone standing at the edge of his own grave.

🫁 Corrupt means decaying not sinful
💀 Job describes his body failing
⏳ Death already feels close
📖 Job speaks as if already dying

## 🕯️ My Days Are Extinct

"Extinct" means snuffed out completely, like a flame put out.

Job pictures his life as a light that has already gone dark.

This is stronger than simply saying his life is short.

He is saying it already feels over.

Grief this deep does not wait for the body to actually die.

🕯️ Extinct means snuffed out completely
🌑 Job's life feels already dark
⏱️ Stronger than merely saying short
📖 Grief can make life feel over

## ⚰️ The Graves Are Ready For Me

Job pictures graves standing prepared and waiting just for him.

He is not speaking figuratively or for dramatic effect.

He genuinely believes death is coming soon.

The plural word "graves" pictures every path leading to the same end.

⚰️ Graves pictures death standing ready
🎯 Job expects death very soon
🗣️ This is not mere exaggeration
📖 Every path leads to one end

## 😏 Are There Not Mockers With Me

"Mockers" means people who ridicule and scorn someone openly.

Job asks this as a rhetorical question, not out of real doubt.

He already knows the answer is yes.

His three friends have become the mockers he is describing.

Naming them this way answers their accusations with equal bluntness.

😏 Mockers means people who ridicule
❓ Job asks this rhetorically here
🎯 His friends are the mockers
📖 Job answers accusation with bluntness

## 👁️ Mine Eye Continue In Their Provocation

"Provocation" means behavior meant to stir up anger or trouble.

Job says he is forced to watch this hostility happen constantly.

His eye stays fixed on their scorn because he cannot escape it.

There is no relief from the mockery surrounding him.

Being surrounded by contempt wears down a person as much as physical pain.

😠 Provocation means behavior stirring anger
👁️ Job cannot look away from it
🚫 No escape exists from mockery
📖 Constant contempt wears a person down

## 📜 Put Me In A Surety With Thee

"Surety" is a legal term for someone who guarantees a pledge or debt.

Job is asking God directly to act as his guarantor.

In ancient courts, a surety stood as a trusted backer for a person's claim.

Job wants God to vouch personally for his innocence.

This is a bold request aimed straight at God, not at his friends.

📜 Surety means a legal guarantor
🙏 Job asks God to vouch
⚖️ Ancient courts used real sureties
📖 Job wants God as his backer

## 🤝 Who Is He That Will Strike Hands With Me

Striking hands was an ancient gesture that sealed a legal agreement.

It worked the same way a handshake seals a deal today.

Job is asking who will formally agree to stand with him in this dispute.

He feels he has no ally willing to make that commitment.

The image continues the courtroom picture from the verse before it.

🤝 Striking hands sealed an agreement
📝 It worked like a handshake
😔 Job feels he has no ally
📖 This continues the courtroom picture

# Job 17:4-6
# 🗣️ Made A Byword
---
## 🧠 Thou Hast Hid Their Heart From Understanding

Job says God has kept his friends from truly understanding him.

"Heart" here means their mind and judgment, not just emotion.

This explains why their accusations keep missing the truth.

Job is not simply calling them foolish on his own authority.

He believes their blindness has come from God himself.

🧠 Heart here means mind and judgment
🙈 Job says God hid understanding
❌ This explains their repeated misreading
📖 Job traces their blindness to God

## ⬆️ Thou Shalt Not Exalt Them

"Exalt" means to lift up, honor, or prove right.

Job predicts God will not vindicate his friends' harsh arguments.

He is confident their accusations will not hold up in the end.

This is a direct rebuttal to everything they have said about him.

Job trusts that truth will eventually stand, even if it takes time.

⬆️ Exalt means to lift up
🚫 God will not prove them right
🗣️ This rebuts all their arguments
📖 Job trusts truth to stand later

## 🎭 He That Speaketh Flattery To His Friends

"Flattery" means false, empty praise meant to gain something.

This line describes someone who betrays a friend for personal reward.

Ancient readers understood this as one of the worst kinds of treachery.

Job may be describing his own friends turning against him for their own reasons.

Betraying someone close cuts deeper than an enemy's attack ever could.

🗣️ Flattery means false empty praise
💔 This describes betraying a friend
🎭 It was seen as deep treachery
📖 Betrayal cuts deeper than enmity

## 👶 The Eyes Of His Children Shall Fail

This line warns that betrayal brings consequences beyond just one person.

"Fail" here means to grow weak, weary, or hopeless.

Ancient thought often connected a parent's wrongdoing to a family's suffering.

Job's own children have already died earlier in this story.

That loss sharpens the pain of this line for Job.

👶 Fail means grow weak and hopeless
⚖️ Wrongdoing was linked to family cost
🔗 The consequence reaches the next generation
📖 Job's own losses sharpen this line

## 🗣️ He Hath Made Me A Byword Of The People

"Byword" means a name or example used to mock someone.

Job says his suffering has turned him into a public joke.

People now use his name as shorthand for disaster or failure.

This adds public humiliation on top of his physical suffering.

Losing his reputation feels like its own separate loss to Job.

🗣️ Byword means a mocking example
😞 Job's name now means disaster
👥 His suffering has become public
📖 Reputation loss is its own wound

## 🥁 Aforetime I Was As A Tabret

"Tabret" is a small hand drum used in celebration and music.

"Aforetime" simply means formerly or in time past.

Job remembers when people once respected and celebrated him.

Now he says people strike at him with words the way a drum gets struck.

The image captures a total reversal from honor to open mockery.

🥁 Tabret was a small hand drum
⏮️ Aforetime means formerly or before
🎉 Job was once celebrated and honored
📖 Honor has reversed into open mockery

# Job 17:7-9
# 💪 The Righteous Holds On
---
## 👁️ Mine Eye Also Is Dim By Reason Of Sorrow

"Dim" here means weakened or clouded, almost failing to see clearly.

Job says grief itself has physically affected his eyesight.

Ancient writers often connected deep sorrow to real physical symptoms.

Job's whole body now carries the weight of his loss.

This is not exaggeration but an honest description of prolonged suffering.

👁️ Dim means weakened clouded sight
😢 Grief has affected Job physically
📚 Ancient writers linked sorrow to symptoms
📖 This describes real honest suffering

## 🌫️ All My Members Are As A Shadow

"Members" here means the parts of Job's body, not people in a group.

"As a shadow" pictures something thin, faint, and losing its solid form.

Job feels physically wasted away by grief and illness.

This continues the physical toll described in the verse before it.

The image captures a body that feels like it is fading from existence.

🦴 Members means the parts of his body
🌫️ Shadow pictures something thin and faint
📉 Job feels physically wasted away
📖 His body feels like it is fading

## 😲 Upright Men Shall Be Astonied At This

"Astonied" is an old form of astonished, meaning shocked or appalled.

Job predicts that honest, godly people will be horrified by his suffering.

Their shock will come from seeing an innocent man treated this way.

This anticipates people who will side with Job rather than accuse him.

Job expects vindication to come eventually, even if not from his friends.

😲 Astonied means shocked or appalled
👀 Honest people will be horrified
⚖️ Their shock proves Job's innocence
📖 Job expects vindication eventually

## 💪 The Innocent Shall Stir Up Himself Against The Hypocrite

"Hypocrite" here means someone who is godless, not just someone pretending.

Job predicts that innocent people will eventually push back against injustice.

"Stir up himself" means to rouse to action rather than staying passive.

Job believes truth eventually provokes a real response from good people.

This sets up a contrast with the passive silence of his three friends.

🎭 Hypocrite here means someone godless
💪 Stir up means rouse to action
⚖️ Innocent people will resist injustice
📖 This contrasts his friends' silence

## 🛤️ The Righteous Also Shall Hold On His Way

"Hold on his way" means to keep walking a path without turning aside.

Job insists that righteous people will keep doing right despite what happens to him.

His suffering should not make anyone abandon their own integrity.

This is Job defending the value of righteousness itself, not just himself.

🛤️ Hold on means keep walking steady
💪 Righteous people keep doing right
🙅 Job's pain should not change that
📖 Job defends righteousness not just himself

## ✋ He That Hath Clean Hands Shall Be Stronger And Stronger

"Clean hands" is a common Bible picture for genuine innocence.

Job insists that innocence does not weaken a person over time.

"Stronger and stronger" pictures growth, not just survival.

This directly answers his friends' claim that suffering proves hidden guilt.

Job trusts that real integrity holds up and even grows under pressure.

✋ Clean hands pictures real innocence
💪 Innocence does not weaken over time
📈 Stronger and stronger pictures real growth
📖 This answers the guilt accusation directly

# Job 17:10-12
# 💔 Purposes Broken Off
---
## 🔄 Do Ye Return And Come Now

Job invites his friends to try again, even after everything already said.

This sounds like sarcasm rather than a genuine welcome.

He does not expect them to actually bring anything new.

The invitation exposes how empty their previous arguments really were.

🔄 Job invites another round of speeches
😏 The invitation carries clear sarcasm
🚫 He expects nothing new from them
📖 It exposes their empty arguments

## 🗣️ I Cannot Find One Wise Man Among You

Job bluntly says none of his three friends have spoken real wisdom.

This is a direct insult after chapters of long speeches from them.

Wisdom, in this book, means understanding rightly, not simply speaking confidently.

Confident speech and true wisdom are not the same thing.

Job draws a clear line between the two here.

🗣️ Job bluntly denies their wisdom
💬 Confidence is not the same as wisdom
📚 Wisdom means understanding not confidence
📖 Job separates the two plainly

## ⏳ My Days Are Past

Job says his time and opportunities feel already used up.

This is not about calendar days alone but about hope for the future.

He feels like a man whose story has already ended.

The line sets up the deeper despair expressed in the rest of the section.

⏳ Days here means hope for tomorrow
🏁 Job feels his story already ended
😔 This is deeper than simple age
📖 It sets up his growing despair

## 🔁 My Purposes Are Broken Off Even The Thoughts Of My Heart

Hebrew poetry often repeats one idea using two matching lines.

"Purposes" and "thoughts of my heart" describe the same thing here.

Job means every plan and hope he once had is now shattered.

This is one loss stated twice for weight, not two separate losses.

🔁 Hebrew poetry often repeats one idea
💔 Purposes and heart thoughts match here
🧩 Every plan Job had is shattered
📖 Repetition adds weight not new loss

## 🌗 They Change The Night Into Day

Job accuses his friends of twisting reality to fit their argument.

Calling night "day" pictures insisting something false is actually true.

His friends keep promising relief that never actually arrives.

This continues Job's frustration with their false comfort.

🔄 Job accuses them of twisting reality
🌗 Night into day means calling false true
🤥 Their comfort keeps proving false
📖 This exposes their false comfort again

## 💡 The Light Is Short Because Of Darkness

This difficult line pictures hope shrinking the longer the darkness lasts.

Job's friends keep insisting relief is near despite the evidence.

The real darkness around Job only keeps growing harder to deny.

Job's honest experience keeps contradicting their forced optimism.

💡 Light here pictures shrinking hope
🌑 Darkness only keeps growing here
🚫 Their optimism ignores the evidence
📖 Job's experience contradicts their claims

# Job 17:13-16
# ⚰️ Kin To The Grave
---
## 🏚️ If I Wait The Grave Is Mine House

Job pictures Sheol, the realm of the dead, as his future home.

Calling it a "house" pictures settling in, not just visiting briefly.

Job has stopped expecting recovery and started expecting only death.

This resignation follows directly from the shattered hope in the verse before it.

🏚️ Grave pictures Sheol as a home
🛏️ House pictures settling not visiting
😔 Job now expects only death
📖 This follows his shattered hope

## 🛏️ I Have Made My Bed In The Darkness

This line continues the picture of the grave as a house.

"Made my bed" pictures deliberately settling in for the night.

Job describes accepting death rather than merely fearing it.

The darkness here means the grave itself, not simply sadness.

🛏️ Made my bed pictures settling in
🌑 Darkness here means the grave itself
😔 Job describes accepting not just fearing
📖 This extends the house picture further

## 💀 I Have Said To Corruption Thou Art My Father

"Corruption" here means decay, the process of a body breaking down.

Job speaks to decay directly, as if introducing a family member.

Calling decay his "father" pictures accepting it as already part of him.

This is startling, intimate language aimed at death itself.

💀 Corruption means the body's decay
🗣️ Job speaks to decay directly
👪 Father pictures decay as already his
📖 This is startling language about death

## 🪱 To The Worm Thou Art My Mother And My Sister

Job continues addressing decay using close family titles.

Worms consuming a body were a common ancient picture of death.

Naming decay as mother and sister makes death feel like his closest relation.

This finishes the family picture that began with the line about corruption.

🪱 Worms pictured decay in ancient thought
👪 Mother and sister continue the family image
💔 Death now feels like his closest kin
📖 This completes the corruption family picture

## ❓ And Where Is Now My Hope

Job asks this as a genuine, aching question, not just a rhetorical one.

He has spent the whole chapter describing hope that keeps failing.

The question sits at the emotional center of everything said so far.

Naming despair honestly is different from giving up on God entirely.

❓ Job asks this question honestly
📉 Hope has failed throughout the chapter
💔 This sits at the chapter's center
📖 Honest despair differs from abandoning God

## ⚰️ They Shall Go Down To The Bars Of The Pit

"The pit" is another name for Sheol, the realm of the dead.

"Bars" pictures gates or a locked barrier, like a prison entrance.

Job pictures death as a place that shuts firmly behind a person.

This image reinforces how final and total death feels to Job here.

⚰️ The pit means Sheol realm of death
🔒 Bars pictures a locked final gate
🚪 Death shuts firmly behind a person
📖 This stresses how final death feels

## 🌫️ Our Rest Together Is In The Dust

Job ends the chapter picturing everyone sharing the same final resting place.

"Dust" recalls Genesis, where humanity was formed from dust and returns to it.

Rich or poor, righteous or wicked, everyone meets the same grave.

Job closes this speech resting in that grim but honest equality.

🌫️ Dust recalls humanity's origin in Genesis
⚖️ Everyone shares the same final rest
👥 Rich and poor share one ending
📖 Job closes on grim honest equality
`.trim();

export const JOB_SEVENTEEN_PERSONAL_SECTIONS = parseJobSeventeenRawNotes(JOB_SEVENTEEN_RAW_NOTES);
