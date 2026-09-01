export type JobTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyThreeRawNotes(rawText: string): JobTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 23:${startVerse}` : `Job 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 23 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_THREE_RAW_NOTES = `# Job 23:1-3
# 😢 Job Answers Bitterly
---
## 😢 My Complaint Is Bitter

"Complaint" here does not mean a minor gripe.

It means a formal case laid out before a judge.

Job is not just venting his feelings.

He is preparing to argue his innocence in real terms.

😢 Complaint means a formal legal case
⚖️ Job is not simply venting
📢 He wants to argue his innocence
📖 This sets up a courtroom scene

## 💔 My Stroke Is Heavier Than My Groaning

"Stroke" here means the blow of suffering God has allowed.

Job says his pain outweighs even his loudest groaning.

No sound he can make matches what he actually feels.

His grief has gone past what words can hold.

💔 Stroke means the blow of suffering
📢 Groaning is Job's loudest expression
⚖️ His pain outweighs even that sound
➡️ Grief here has outgrown his words

## 🔍 Oh That I Knew Where I Might Find Him

Job is not asking a casual question here.

He wants to locate God the way a person finds an address.

His whole speech grows out of feeling unable to reach God directly.

That distance is what makes his suffering feel unbearable.

🔍 Job wants to locate God directly
📍 He pictures God like a fixed place
😣 Distance makes his suffering worse
➡️ This longing drives the whole chapter

## 🪑 That I Might Come Even To His Seat

"Seat" here means a throne or a judge's bench, not a chair.

Job pictures walking straight into a courtroom to state his case.

Ancient courts often sat elders or judges formally at a city gate.

Job wants that same kind of direct, formal hearing.

🪑 Seat means a judge's throne or bench
⚖️ Job pictures a real courtroom scene
🏛️ Ancient judges sat formally at a gate
📖 Job wants a direct, formal hearing

# Job 23:4-7
# ⚖️ Job Prepares His Case
---
## 📋 I Would Order My Cause Before Him

"Cause" here means a legal case, not a personal reason.

Order means to lay it out point by point, like a lawyer.

Job imagines standing before God with every fact organized.

He wants his suffering examined honestly, not dismissed.

📋 Cause means a legal case
🗂️ Order means laying it out point by point
⚖️ Job imagines a fair, organized hearing
➡️ He wants his suffering examined honestly

## 🗣️ Fill My Mouth With Arguments

This pictures Job walking in fully prepared, not caught off guard.

Every argument would already be ready before he even spoke.

Job feels confident in his own innocence.

He wants a real debate, not simple mercy.

🗣️ Job pictures himself fully prepared
📚 Every argument would already be ready
💪 He speaks from confidence, not fear
📖 Job wants a debate, not simple mercy

## 👂 Understand What He Would Say Unto Me

Job does not just want to speak, he wants a real answer back.

Silence has been the hardest part of his suffering so far.

He believes a fair judge would actually respond to his case.

Any answer, even a hard one, would feel better than nothing.

👂 Job wants to hear a real answer
🤐 Silence has been the hardest part
⚖️ A fair judge would respond
📖 Any answer beats continued silence

## ⚡ Will He Plead Against Me With His Great Power

This is not Job accusing God of being unfair by nature.

He is asking whether raw power would override a fair hearing.

Job hopes strength is not used simply to silence him.

He wants justice, not force, to decide the outcome.

⚡ Job questions if power would override fairness
🙅 This is not an accusation of God
⚖️ He hopes justice decides, not raw force
➡️ Job wants a fair, not forced, outcome

## 💪 He Would Put Strength In Me

Job answers his own question with real hope.

He believes God would actually help him plead his case well.

This is not a picture of a hostile judge crushing a defendant.

Job imagines God strengthening him to speak, not silencing him.

💪 Job answers his own question with hope
🤝 He believes God would help him plead
🙅 Not a picture of a hostile judge
📖 God would strengthen him, not silence him

## ⚖️ There The Righteous Might Dispute With Him

Dispute here means a formal legal argument, not a shouting match.

Job believes an honest person could reason with God directly.

He is describing what a truly fair trial would look like.

This is the ideal Job wishes he could actually reach.

⚖️ Dispute means a formal legal argument
🙋 Job believes honest people could reason with God
🏛️ He describes an ideal, fair trial
➡️ This is the hearing Job cannot yet reach

## 🕊️ Delivered For Ever From My Judge

Job pictures a final, permanent verdict in his favor.

Delivered here means fully cleared, not just given a short reprieve.

This would end his suffering completely, not just pause it.

Job's hope is for total vindication, not partial relief.

🕊️ Delivered means fully cleared, not paused
⚖️ Job pictures a final, permanent verdict
🏁 This would end his suffering completely
📖 Job hopes for total vindication

# Job 23:8-12
# 🌫️ Searching For A Hidden God
---
## 🧭 I Go Forward But He Is Not There

Forward and backward here describe a full, careful search.

Job is not talking about a literal walk in one direction.

He means he has looked everywhere he can think to look.

God still feels completely out of reach.

🧭 Forward and backward describe a full search
🚶 Job means he has looked everywhere
😔 God still feels out of reach
➡️ This search comes up empty

## 👀 And Backward, But I Cannot Perceive Him

Perceive means to notice or sense something clearly.

Job says even looking backward, he cannot sense God's presence at all.

This is a deeper claim than simply not seeing something.

Job feels God is not there to be sensed in any way.

👀 Perceive means to notice or sense clearly
🔄 Job also searched backward
😶 He cannot sense God at all
➡️ The absence feels total, not partial

## ✋ On The Left Hand, Where He Doth Work

Left hand and right hand complete the four directions from verse eight.

Together they describe a search covering every side, not just two.

Job even names God's ongoing work, since God is clearly active somewhere.

Still, Job cannot find or see that activity himself.

✋ Left and right complete four directions
🔄 Together they mean every side searched
⚙️ Job names God's ongoing work
➡️ He still cannot see it himself

## 🙈 He Hideth Himself On The Right Hand

This is the clearest line in the whole search.

Job is not just failing to find God by accident.

He believes God is actively staying hidden from him.

That feels far worse than simple distance or silence.

🙈 God is described as actively hiding
😣 This feels worse than simple distance
🔎 Job's search has come up empty
📖 Hiddenness feels like a real choice

## 🛤️ He Knoweth The Way That I Take

Job shifts his tone here after four verses of searching.

Even though Job cannot see God, God clearly sees Job.

This is a turning point in the middle of the chapter.

Job moves from feeling lost to feeling truly known.

🛤️ Job shifts his tone here
👁️ God sees Job even when unseen
🔄 This marks a turning point
📖 Job moves from lost to known

## ✨ I Shall Come Forth As Gold

Ancient goldsmiths heated raw ore until the impurities rose and burned away.

What remained afterward was pure, valuable metal.

Job pictures his suffering working the same way on his own character.

He believes the trial will prove him genuine, not destroy him.

✨ Ancient gold was purified through fire
🔥 Impurities burned away, leaving pure metal
💪 Job's suffering works the same way
📖 The trial will prove him genuine

## 👣 My Foot Hath Held His Steps

This pictures Job walking closely in God's own footprints.

He is claiming steady, careful obedience, not perfection.

Job insists he has not wandered off God's path on his own.

This claim sets up the specific proof that follows.

👣 Job pictures walking in God's footprints
🎯 He claims steady, careful obedience
🚫 He says he has not wandered off
➡️ This sets up the proof ahead

## 📜 Gone Back From The Commandment Of His Lips

Commandment of his lips means the spoken instruction God gave.

Gone back here means turned away or abandoned that instruction.

Job insists he has stayed obedient the entire time.

He is building his defense one honest claim at a time.

📜 Commandment of his lips means spoken instruction
🚫 Gone back means turning away from it
✅ Job claims full, steady obedience
➡️ He builds his defense claim by claim

## 🍞 Esteemed The Words Of His Mouth More Than My Necessary Food

Esteemed means valued highly, placed above other things.

Necessary food means the basic meals a person needs just to survive.

Job says he valued God's word even more than daily survival.

That is a bold claim about where his real priorities have been.

🍞 Necessary food means basic daily survival
❤️ Esteemed means valued highly
📖 Job places God's word above survival
➡️ This reveals his true priorities

# Job 23:13-17
# 😨 The Terror Of God's Power
---
## 🧠 He Is In One Mind, And Who Can Turn Him

One mind here means God's will never wavers or changes course.

Turn him means to talk God out of a decision, to change it.

Job says no one has that kind of power over God.

This truth used to comfort Job, but now it frightens him.

🧠 One mind means an unchanging will
🔄 Turn him means changing God's decision
🚫 No one holds that power over God
➡️ This truth now frightens Job

## ⚡ What His Soul Desireth, Even That He Doeth

This means God acts freely on whatever He decides.

Nothing outside God forces His hand or limits His choices.

For Job, that includes his own ongoing suffering.

There is no outside appeal Job can make against it.

⚡ God acts freely on His own will
🚫 Nothing limits or forces His choices
😔 Job's suffering falls under that same freedom
➡️ There is no outside appeal to make

## 📋 He Performeth The Thing That Is Appointed For Me

Appointed here means already decided or assigned in advance.

Job believes his path, including this suffering, was set beforehand.

This is not random chance in Job's eyes.

It is God carrying out a plan Job cannot see fully.

📋 Appointed means decided in advance
🎯 Job's suffering fits a set plan
🚫 Job does not see it as random
📖 God is carrying out a hidden plan

## 🗂️ Many Such Things Are With Him

Job admits this situation is not the only plan God is working on.

God holds many purposes at once, far beyond Job's own story.

That is not comforting to Job here, it is overwhelming.

His single life feels small against something so much larger.

🗂️ God holds many purposes at once
🌍 Job's story is only one among many
😣 That scale feels overwhelming, not comforting
➡️ Job feels small against something larger

## 😟 Therefore Am I Troubled At His Presence

Troubled here means deeply unsettled, not mildly annoyed.

Job is not afraid of losing an argument anymore.

He is afraid simply of standing near God's raw power.

That power itself has become the frightening part.

😟 Troubled means deeply unsettled
🙅 Job is not afraid of losing an argument
⚡ He fears God's raw power itself
➡️ God's power has become the fear

## 😱 When I Consider, I Am Afraid Of Him

Consider means to stop and think it through carefully.

The more Job reflects, the more his fear actually grows.

This is not a passing feeling, it comes from real thought.

Job's fear is reasoned, not simply emotional panic.

😱 Consider means careful, deliberate thought
📈 The more Job thinks, the more he fears
🧠 This fear comes from reasoning, not panic
➡️ Job's fear feels fully justified to him

## 💧 God Maketh My Heart Soft

Soft here does not mean gentle or kind in this context.

It means weak, melted, or drained of courage.

Job says God has caused this collapse in him.

His usual strength has given way under the pressure.

💧 Soft means weak, not gentle
📉 Job describes an inner collapse
⚡ God caused this weakening
➡️ His usual strength has given way

## 😰 The Almighty Troubleth Me

Almighty here names the full, unmatched power that frightens Job.

Trouble means to stir up fear and unrest, not simple worry.

Job's fear is not really about his suffering itself.

It is about facing the sheer power that stands behind it.

😰 Almighty names God's unmatched power
🌊 Trouble means real fear and unrest
🎯 Job fears the power behind the suffering
📖 The power itself is what frightens him

## 🌑 I Was Not Cut Off Before The Darkness

This line echoes Job's earlier wish in chapter three to have never been born.

Cut off here means dying before this suffering ever began.

Job is not saying God failed to protect him from trouble.

He is saying he wishes he had died before the trouble came.

🌑 Cut off means dying before the trouble
📖 This echoes Job's wish back in chapter three
🙅 God did not fail to protect him
➡️ Job wishes he had died first instead

## 🌫️ Neither Hath He Covered The Darkness From My Face

Covered here means shielded or hidden from view.

Job says God let him see and feel this darkness fully.

Nothing about his suffering was softened or hidden from him.

The chapter ends with Job facing that darkness wide awake.

🌫️ Covered means shielded from view
👁️ God let Job feel it fully
🚫 Nothing was softened or hidden
📖 Job faces the darkness wide awake
`.trim();

export const JOB_TWENTY_THREE_PERSONAL_SECTIONS = parseJobTwentyThreeRawNotes(JOB_TWENTY_THREE_RAW_NOTES);
