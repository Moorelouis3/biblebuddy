export type JobThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyThreeRawNotes(rawText: string): JobThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 33:${startVerse}` : `Job 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 33 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_THREE_RAW_NOTES = `# Job 33:1-7
# 🗣️ Elihu Speaks Directly To Job
---
## 👂 Hear My Speeches, And Hearken To All My Words

Elihu finally speaks straight to Job by name for the first time.

"Hearken" means to listen closely, not just to hear in passing.

Up to this point Elihu had only spoken about Job to the others.

Now he turns and addresses him face to face.

🗣️ Elihu now speaks straight to Job

📜 Hearken means listen closely

👥 Before this he only spoke about Job

📖 The debate shifts to a direct exchange

## 👄 My Tongue Hath Spoken In My Mouth

This line simply announces that Elihu has begun to talk.

Saying his tongue spoke in his mouth sounds repetitive to modern ears.

Hebrew often doubled an idea like this for emphasis, not for extra information.

The doubling signals how deliberately he is choosing to begin.

👄 The line announces Elihu has begun speaking

🔁 Hebrew doubles ideas for emphasis

📢 It is not extra information, only stress

📖 Elihu is choosing his opening with care

## ⚖️ My Words Shall Be Of The Uprightness Of My Heart

"Uprightness" means honesty and moral straightness, not perfection.

Elihu claims his coming speech will match what he actually believes inside.

He is promising sincerity before he says a single argument.

That promise sets the standard he will be judged against.

⚖️ Uprightness means honesty and moral straightness

🗣️ Elihu claims his words will match his heart

🤝 He promises sincerity before arguing

📖 That promise sets his own standard

## 💬 My Lips Shall Utter Knowledge Clearly

Elihu is not only promising honesty, he is promising clarity.

He wants his coming words to be plain enough that no one misunderstands him.

Job's three friends were often accused of vague or twisted logic.

Elihu is setting himself apart from that pattern before he even starts.

💬 Elihu promises clarity, not just honesty

🎯 He wants his words plainly understood

👥 The friends were often vague or twisted

📖 Elihu sets himself apart before he starts

## 🌬️ The Spirit Of God Hath Made Me

Elihu grounds his own existence in God, the same as any other person.

This line echoes the language of Genesis, where God's breath brings life to man.

Elihu is not claiming any special origin above Job's own.

Both men were made by the same Spirit.

🌬️ Elihu credits God with making him

📜 This echoes the language of Genesis

🤝 Elihu claims no special origin

📖 The same Spirit made them both

## 👑 The Breath Of The Almighty Hath Given Me Life

"The Almighty" is one of the oldest titles used for God in the book of Job.

The line restates the first half of verse four in different words for emphasis.

Breath and spirit were closely linked ideas in Hebrew thought.

Life itself is treated here as a direct gift, not something owed.

👑 The Almighty is an ancient title for God

🔁 This restates the line before it

🌬️ Breath and spirit were closely linked

📖 Life is a gift, not something owed

## ⚖️ Set Thy Words In Order Before Me, Stand Up

This is not a challenge to a physical fight.

"Set thy words in order" is courtroom language for preparing a formal case.

Elihu is inviting Job to respond the way a person would in a real hearing.

He wants an organized answer, not a scattered complaint.

⚖️ This is courtroom language, not a fight

📋 Set in order means prepare a formal case

🙋 Elihu invites a real, organized answer

📖 He wants structure, not scattered complaint

## 🏺 I Also Am Formed Out Of The Clay

Elihu claims the same lowly origin Job used for himself earlier in the book.

"Clay" pictures how easily a human being can be shaped or broken.

By using Job's own image, Elihu is meeting him on equal ground.

Neither man stands above the other in the eyes of God.

🏺 Clay pictures a life easily shaped or broken

🔁 Elihu borrows an image Job used himself

🤝 He is meeting Job on equal ground

📖 Neither man stands above the other

## 😨 My Terror Shall Not Make Thee Afraid

Job had earlier complained that God's presence terrified him beyond words.

Elihu promises he will not overwhelm Job the way Job feared God would.

A heavy hand pictures crushing pressure or punishment.

Elihu wants Job to answer freely, without that same fear.

😨 Job had feared being terrified by God

🤝 Elihu promises not to overwhelm him

✋ A heavy hand pictures crushing pressure

📖 Elihu wants a free, fearless answer

# Job 33:8-11
# 🔁 Elihu Quotes Job's Own Complaint
---
## 👂 Surely Thou Hast Spoken In Mine Hearing

Elihu insists he heard these words directly from Job himself.

This is not secondhand gossip or a twisted report.

He is about to quote Job with real accuracy.

That accuracy makes his coming argument harder to dismiss.

👂 Elihu heard these words directly

🚫 This is not secondhand gossip

🎯 He is about to quote Job accurately

📖 Accuracy makes his case harder to dismiss

## 🗣️ I Am Clean Without Transgression, I Am Innocent

Elihu quotes Job's repeated claim of total innocence.

"Transgression" means a willful act of wrongdoing, not an accident.

Job had said this kind of thing many times across earlier chapters.

Elihu is about to challenge this exact claim head on.

🗣️ Elihu quotes Job's claim of innocence

📜 Transgression means willful wrongdoing

🔁 Job said this many times before

📖 Elihu will challenge this claim directly

## 🔍 He Findeth Occasions Against Me, He Counteth Me For His Enemy

This is Job's complaint that God is actively searching for reasons to condemn him.

"Occasions" here means excuses or grounds for accusation.

Job felt treated like a criminal, not a suffering servant of God.

That feeling of being God's enemy weighed heavily on him.

🔍 Job felt God searched for reasons to condemn

📜 Occasions means excuses for accusation

😔 Job felt treated like a criminal

📖 He felt like God's enemy, not servant

## ⛓️ He Putteth My Feet In The Stocks

"Stocks" were a device that locked a prisoner's feet in place.

Job pictures his suffering as being physically restrained by God.

This image had already appeared earlier in the book, in chapter thirteen.

It captures how trapped and immobile Job felt in his condition.

⛓️ Stocks locked a prisoner's feet in place

🖼️ Job pictures himself restrained by God

🔁 This image appeared earlier in chapter thirteen

📖 It captures Job's feeling of being trapped

## 🕵️ He Marketh All My Paths

This does not describe a caring shepherd watching over a flock.

Job means God is tracking his every move like a suspect under watch.

"Marketh" here carries the sense of close, hostile surveillance.

Job felt he could not take a single step without being observed and judged.

🚫 This is not a caring, gentle watch

🕵️ Job means hostile, close surveillance

👣 He felt every step was tracked

📖 Job felt watched like a suspect

# Job 33:12-14
# ⚖️ God Is Greater Than Man
---
## 🙅 In This Thou Art Not Just

Elihu now gives his first direct correction of Job.

He says Job is wrong in this one specific complaint, not wrong as a person.

This is a narrow rebuttal, not a broad condemnation.

Elihu is careful about where exactly he disagrees.

🙅 Elihu gives his first direct correction

🎯 He targets one specific complaint

🚫 This is not a broad condemnation

📖 Elihu is careful and precise here

## 👑 God Is Greater Than Man

Elihu names the core truth Job's complaint had overlooked.

God is not a peer who owes Job a courtroom style explanation.

This does not mean God is unfair, only that He is not equal to man.

That difference in scale reframes the entire complaint Job had raised.

👑 God is not equal to man

⚖️ This does not mean God is unfair

📏 It is a difference of scale

📖 This reframes Job's whole complaint

## 🤐 He Giveth Not Account Of Any Of His Matters

This does not mean God is silent or hidden from His creation.

It means God is not obligated to explain every decision to a human being.

Elihu is answering Job's demand for a courtroom style hearing with God.

A king does not owe every subject a personal explanation for each ruling.

🤐 This does not mean God is silent

🚫 God is not obligated to explain everything

⚖️ Elihu answers Job's demand for a hearing

📖 A king owes no explanation to every subject

## 🗣️ God Speaketh Once, Yea Twice

This corrects the idea that God never speaks to people at all.

Elihu insists God does communicate, often more than once.

The problem is not God's silence, it is human attention.

This line sets up the two ways Elihu is about to describe.

🗣️ God does communicate with people

🔁 He often speaks more than once

👂 The problem is human attention

📖 This sets up two ways God speaks

## 👀 Yet Man Perceiveth It Not

"Perceiveth" means to notice or take real notice of something.

God's message can arrive and still be completely missed.

This is not God's failure to communicate.

It is a failure of the listener to pay attention.

👀 Perceiveth means to notice something

📡 God's message can still be missed

🚫 This is not God's failure

📖 It is the listener's failure to notice

# Job 33:15-18
# 💤 God Speaks Through Dreams
---
## 💤 In A Dream, In A Vision Of The Night

Elihu names the first way God speaks to people.

A dream and a vision of the night are closely related ways God communicated in this era.

Scripture records several other examples of God using dreams this same way.

This method reaches a person when their guard is completely down.

💤 Elihu names his first way God speaks

🌙 Dreams and night visions are closely linked

📜 Scripture records this method elsewhere

📖 It reaches someone with their guard down

## 😴 When Deep Sleep Falleth Upon Men

"Deep sleep" describes an unusually heavy, God given sleep.

The same Hebrew idea appears when God put Adam to sleep in Genesis.

It is not ordinary tiredness but a state set apart for revelation.

This detail shows the dream is being sent, not simply happening by chance.

😴 Deep sleep is unusually heavy sleep

📜 The same idea appears with Adam

✨ It is set apart for revelation

📖 The dream is sent, not random

## 👂 Then He Openeth The Ears Of Men

This pictures God unlocking a person's ability to truly hear Him.

A sleeping person cannot hear with their physical ears at all.

So this opening happens on a deeper, spiritual level instead.

God is described as actively initiating this contact.

👂 God opens a person's ability to hear

😴 Physical ears cannot hear during sleep

✨ The opening happens on a deeper level

📖 God actively initiates the contact

## 🔏 And Sealeth Their Instruction

"Sealeth" means to stamp something firmly so it cannot be easily erased.

The instruction given in the dream is meant to stick permanently.

This is not a fading impression that disappears by morning.

God intends the message to leave a lasting mark on the person.

🔏 Sealeth means stamped firmly in place

📌 The instruction is meant to stick

🚫 This is not a fading impression

📖 God intends a lasting mark

## 🛑 That He May Withdraw Man From His Purpose

Elihu now explains why God sends these dreams in the first place.

"His purpose" here often means a planned, harmful, or sinful course of action.

The dream functions as a warning before real damage is done.

God intervenes early, before the person acts on that plan.

🛑 Elihu explains the purpose of the dream

⚠️ His purpose often means a harmful plan

🚧 The dream warns before damage is done

📖 God intervenes early, not after

## 💔 Hide Pride From Man

"Pride" here means the self confidence that refuses correction from anyone.

To hide pride means to keep it from fully taking root in a person.

Left unchecked, pride blinds a person to their own danger.

The dream works like an early, quiet defense against that blindness.

💔 Pride means refusing correction from anyone

🙈 Hiding it stops it from taking root

😵 Unchecked pride blinds a person

📖 The dream defends against that blindness

## 🕳️ He Keepeth Back His Soul From The Pit

"The pit" is a common Old Testament picture of death and the grave.

Keeping the soul back means preventing an early, unnecessary death.

The dream is not only correction, it is protection.

God's warning aims to preserve a person's life, not just scold them.

🕳️ The pit pictures death and the grave

🛡️ Keeping back means preventing early death

✅ The dream protects, not just corrects

📖 God's warning aims to preserve life

## ⚔️ His Life From Perishing By The Sword

This does not necessarily describe a literal battlefield death.

"The sword" can stand more broadly for any violent or sudden end.

The point is the same either way, God intervenes to prevent it.

The dream and the danger it prevents are directly connected.

⚔️ This is not only a literal battlefield

🌪️ The sword can mean any violent end

🛑 God intervenes to prevent it

📖 The dream and the danger connect directly

# Job 33:19-22
# 🤒 God Speaks Through Pain
---
## 🤒 He Is Chastened Also With Pain Upon His Bed

Elihu introduces a second way God speaks to people.

"Chastened" means disciplined or corrected, not simply punished at random.

This time the message does not come through sleep, but through sickness.

Being confined to a bed forces a person to stop and take notice.

🤒 Elihu introduces a second way God speaks

📜 Chastened means disciplined, not random

🛏️ This time the message comes through sickness

📖 Illness forces a person to stop

## 🦴 The Multitude Of His Bones With Strong Pain

This describes pain that reaches deep, into the bones themselves.

"Multitude" stresses how widespread the pain is across the whole body.

This is not a minor ache but a total, overwhelming affliction.

The severity of the pain matches the seriousness of the message.

🦴 The pain reaches deep into the bones

🌐 Multitude stresses how widespread it is

⚠️ This is total, overwhelming affliction

📖 Severity matches the message's seriousness

## 🍞 His Life Abhorreth Bread, And His Soul Dainty Meat

This describes a sick person losing all desire to eat.

"Dainty meat" means rich, appealing food, the kind normally hard to resist.

Even the best food becomes repulsive when someone is this ill.

The loss of appetite shows just how serious the sickness has become.

🍞 The sick person loses all desire to eat

🍽️ Dainty meat means rich, appealing food

🤢 Even good food becomes repulsive

📖 Lost appetite shows real severity

## 📉 His Flesh Is Consumed Away, That It Cannot Be Seen

This pictures a body wasting away from prolonged, severe illness.

The flesh disappears to the point that it seems to vanish entirely.

This kind of description appears elsewhere in Job's own complaints.

The wasting illustrates how far this discipline can physically go.

📉 The body wastes away from illness

👻 The flesh seems to vanish entirely

🔁 Job used similar language himself

📖 This shows how far the illness goes

## 🦴 His Bones That Were Not Seen Stick Out

This continues the same picture of a body wasted down to almost nothing.

Bones that were once hidden beneath flesh now show clearly.

The image is disturbing on purpose, meant to be felt, not glossed over.

Elihu wants Job to feel the full weight of this kind of suffering.

🦴 Bones once hidden now show clearly

😖 The image is disturbing on purpose

👁️ It is meant to be felt

📖 Elihu wants the weight to land

## ⚰️ His Soul Draweth Near Unto The Grave

This marks how close the suffering person has come to death itself.

"Draweth near" describes a slow, steady approach, not a sudden arrival.

The discipline described here can reach this far if it goes unanswered.

The stakes of this second way of speaking are made very clear.

⚰️ The person has drawn very close to death

🐢 Draweth near means a slow approach

⚠️ The discipline can reach this far

📖 The stakes here are made very clear

## 💀 His Life To The Destroyers

"The destroyers" likely refers to agents or forces connected with death.

Some readers understand this as a picture of destroying angels or forces.

The text does not give a detailed identity for them.

What matters most is how close this person stands to real ruin.

💀 Destroyers connects to forces tied to death

👼 Some read this as destroying angels

❓ The text does not name them clearly

📖 The point is how close ruin stands

# Job 33:23-28
# 👼 A Messenger And A Ransom
---
## 👼 If There Be A Messenger With Him, An Interpreter

Elihu introduces a striking new figure into his argument.

A "messenger" here means a heavenly being sent from God's side.

An "interpreter" explains a message the sufferer could not understand alone.

This figure stands between the struggling person and God himself.

👼 Elihu introduces a heavenly messenger

📨 Messenger means one sent from God

🗣️ Interpreter explains what the person could not

📖 This figure stands between man and God

## 🔢 One Among A Thousand

This phrase stresses how rare this kind of help truly is.

Out of a thousand possible messengers, only a select one can do this task.

The rarity makes the gift feel even more significant when it comes.

Not every struggling person will experience this exact kind of intervention.

🔢 One among a thousand stresses rarity

🎯 Only a select messenger can do this

✨ Rarity makes the gift more significant

📖 Not everyone experiences this exact help

## 🙏 Deliver Him From Going Down To The Pit

This is the messenger's exact request made on the sufferer's behalf.

"The pit" again pictures death, the same image used earlier in the chapter.

The messenger actively pleads for the person's life to be spared.

This is intercession, someone speaking up for another person's good.

🙏 The messenger pleads on the sufferer's behalf

🕳️ The pit again pictures death

🛡️ The plea is for life to be spared

📖 This is intercession for another person

## 💰 I Have Found A Ransom

A "ransom" is a price paid to free someone from a debt or a penalty.

This is one of the earliest pictures in scripture of a substitute paying for another.

The text does not spell out exactly what or who this ransom is.

Many readers across history have connected this idea forward to Christ.

💰 Ransom means a price paid to free someone

🌱 This is an early picture of substitution

❓ The text does not name it exactly

📖 Many connect this idea forward to Christ

## 🌱 His Flesh Shall Be Fresher Than A Child's

This describes a complete physical reversal of the wasting sickness.

The picture is deliberately extreme, healthier than even a child's skin.

What was consumed and shrunken earlier in the chapter is now restored.

The recovery matches how severe the earlier suffering had been.

🌱 This describes a full physical reversal

👶 The picture is deliberately extreme

🔁 It restores what was described earlier

📖 Recovery matches the earlier severity

## 🙏 He Shall Pray Unto God, And He Will Be Favourable Unto Him

The physical healing is followed by a restored relationship with God.

Prayer here marks a return to open, welcome communication.

"Favourable" means God receives the person warmly, not with distance.

The broken relationship Job feared he had lost is repaired.

🙏 Physical healing leads to restored prayer

📞 Prayer marks open communication again

🤗 Favourable means received warmly

📖 The relationship Job feared losing is repaired

## 😊 He Shall See His Face With Joy

This does not describe a literal, visible face to face meeting.

It pictures the restored closeness and confidence of someone at peace with God.

Job had earlier felt hidden from God's face in his suffering.

Here that same image returns, but now filled with joy instead of dread.

🙅 Not a literal face to face event

😊 It pictures restored closeness with God

😔 Job once felt hidden from God's face

📖 The same image now carries joy

## 🔄 I Have Sinned, And Perverted That Which Was Right

This is the restored person's own honest confession afterward.

"Perverted" means twisted or bent away from what was actually right.

The confession comes freely, after the mercy, not before it as a bargain.

Honest acknowledgment follows real restoration instead of causing it.

🗣️ This is the person's own confession

🔄 Perverted means twisted away from right

🎁 The confession comes after mercy, not before

📖 Honesty follows restoration, not causes it

## ✅ He Will Deliver His Soul From Going Into The Pit

This restates the messenger's original request as an accomplished fact.

What was pleaded for earlier in the chapter has now actually happened.

The pit, named twice already, is avoided completely in the end.

The whole sequence closes with the danger fully removed.

✅ The messenger's request is now fulfilled

🔁 This restates the earlier plea

🕳️ The pit is avoided completely

📖 The danger is fully removed

## ☀️ His Life Shall See The Light

"Light" here stands for life itself, in contrast to the darkness of the pit.

The sequence that began with a warning dream now ends in daylight.

Dream, pain, and mediator each moved toward this one outcome.

God's discipline in this chapter always aims at restoring life, not ending it.

☀️ Light stands for life against darkness

🔁 Dream, pain, and mediator all aimed here

🎯 Every stage moved toward this outcome

📖 God's discipline aims to restore, not end

# Job 33:29-33
# 📖 God Works This Repeatedly
---
## 🔁 All These Things Worketh God Oftentimes With Man

Elihu now steps back and names the pattern behind everything just described.

Dreams, pain, and a merciful mediator are not rare, one time events.

God repeats these approaches often, in different lives and different ways.

The chapter has been building toward this one summarizing claim.

🔁 Elihu names the pattern behind it all

💤 Dreams, pain, and mercy are not rare

🌍 God repeats these approaches often

📖 The chapter builds toward this claim

## 🎯 To Bring Back His Soul From The Pit

This restates the purpose Elihu has been building toward all chapter.

Every method described, dream, pain, or ransom, aims at the same rescue.

The pit is not the end of the story in Elihu's view.

God works actively to pull a person back from it.

🎯 This restates the purpose of the chapter

🔁 Every method aims at the same rescue

🕳️ The pit is not the final word

📖 God works to pull a person back

## ☀️ To Be Enlightened With The Light Of The Living

"The light of the living" describes life itself, full and aware.

This phrase closes the rescue described across dreams, pain, and mercy.

God's aim was never simply survival but a restored, meaningful life.

The whole chapter has moved steadily toward this bright ending.

☀️ Light of the living means full life

🎯 This closes the whole rescue sequence

❤️ God aims at meaningful life, not survival

📖 The chapter moves toward this bright ending

## 👋 Mark Well, O Job, Hearken Unto Me

Elihu turns his attention back to Job directly once more.

"Mark well" means pay close, careful attention to what comes next.

He is signaling that something important is still coming.

This direct address matches how he opened the whole chapter.

👋 Elihu turns back to Job directly

👀 Mark well means pay careful attention

📢 He signals something important is coming

📖 This matches how the chapter opened

## 🤐 Hold Thy Peace, And I Will Speak

Elihu asks Job for silence so he can keep going.

This is not a rude demand but a request to finish his thought.

He is aware he still has more to say after this pause.

The request sets up the offer that follows in the next verse.

🤐 Elihu asks Job for a moment of silence

🙏 This is a request, not a rude demand

➕ He has more to say after this

📖 It sets up the offer that follows

## 🎁 I Desire To Justify Thee

This line is surprisingly generous coming from someone about to correct Job.

"Justify" means to show that Job's case was actually right.

Elihu is not committed to proving Job guilty no matter what.

He genuinely invites Job to answer and change his mind if he can.

🎁 This line is surprisingly generous

⚖️ Justify means show Job was right

🚫 Elihu is not set on proving guilt

📖 He genuinely invites Job to answer

## 🏁 I Shall Teach Thee Wisdom

Elihu closes this section with a final offer to Job.

If Job stays silent, Elihu promises to keep teaching him.

"Wisdom" here means practical understanding, not just clever words.

This offer sets up everything Elihu is about to say in the following chapters.

🏁 Elihu closes with a final offer

🤐 If Job stays silent, Elihu will teach

🧠 Wisdom means practical understanding

📖 This sets up the chapters ahead
`.trim();

export const JOB_THIRTY_THREE_PERSONAL_SECTIONS = parseJobThirtyThreeRawNotes(JOB_THIRTY_THREE_RAW_NOTES);
