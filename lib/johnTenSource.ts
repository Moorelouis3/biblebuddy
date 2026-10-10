export type JohnTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnTenRawNotes(rawText: string): JohnTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 10:${startVerse}` : `John 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 John 10 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_TEN_RAW_NOTES = `# John 10:1-6
# 🚪 The Shepherd And The Thief
---
## 🚪 He That Entereth Not By The Door

A sheepfold in this culture had exactly one proper entrance.

A real shepherd always walked straight through that entrance.

Climbing over the wall was how a thief got in instead.

Jesus opens with a picture everyone listening already knew from daily life.

🚪 Door means the one proper entrance

🧗 Climbing the wall marks a thief

🐑 Sheepfold means a fenced area for sheep

📖 Jesus opens with a familiar scene

## 🐑 The Shepherd Of The Sheep

Verse two gives the positive side of the same picture.

Anyone who enters through the door is the true shepherd.

There is no trick or shortcut to a real bond with the flock.

The legitimate way in is also the only way in.

🚪 Entering by the door marks the shepherd

🐑 The flock belongs to a true caretaker

🔑 No shortcut exists to that role

📖 Verse two mirrors verse one in reverse

## 🚪 To Him The Porter Openeth

A porter was a gatekeeper who stayed by the entrance all night.

His job was to open only for someone he recognized.

The porter opening the gate pictures recognition happening instantly.

Nothing about the shepherd's entry is hidden or forced.

🚪 Porter means the gatekeeper on duty

🌙 He watched the entrance through the night

🤝 He opened only for someone known

📖 Recognition, not force, grants entry

## 👂 The Sheep Hear His Voice

Shepherds in this region used a distinct call for their own flock.

Sheep raised under one shepherd learn to recognize that exact sound.

A whole mixed flock could still hear several calls and split correctly.

This is an ordinary fact of shepherding life, not an exaggeration.

👂 Sheep learn one shepherd's distinct call

🎶 Shepherds used a repeated call or cry

🐑 Mixed flocks still separated correctly

📖 Jesus picks a detail everyone had seen

## 📛 He Calleth His Own Sheep By Name

Shepherds in this culture often gave individual sheep their own names.

That is personal knowledge, not a headcount of animals.

Jesus describes a relationship with each person, not a crowd he manages.

He already knows the people who belong to him before they ever follow.

📛 Shepherds named sheep individually

🤝 This is knowledge, not a headcount

👥 Jesus describes people, not a crowd

📖 He knows his own by name

## 🚶 He Goeth Before Them

Shepherds in this region led from the front, not from behind.

Driving the animals from behind was a different, harsher method.

A shepherd walking ahead could be trusted into danger first.

The sheep follow because they already know that voice from the verse before.

🚶 Goeth before means leading from the front

🛡️ The shepherd faces danger first

🐑 Sheep follow a voice they trust

📖 Leadership here means going first

## 🙅 A Stranger Will They Not Follow

Sheep are naturally cautious around any voice they do not know.

An unfamiliar caller triggers fear instead of trust.

Jesus describes a built in defense the flock already has.

False teachers would meet that same instinctive resistance.

🙅 Sheep resist unfamiliar voices

😨 Fear replaces trust with a stranger

🛑 This instinct protects the flock

📖 False voices meet real resistance

## ❓ They Understood Not What Things He Spake

"Parable" means a short story that carries a deeper meaning underneath it.

The crowd pictured real shepherds and sheep without catching what Jesus meant.

He is talking about himself, not giving a lesson on farming.

The explanation that follows was necessary because the picture alone was not enough.

📜 Parable means a story with deeper meaning

🐑 The crowd pictured literal shepherding

❓ They missed the real meaning

➡️ Jesus is about to explain himself

# John 10:7-10
# 🚪 I Am The Door
---
## 🚪 I Am The Door Of The Sheep

Jesus now names himself as the door he described earlier.

Every detail about proper entry in the verses before points straight at him.

There is no separate door hiding behind this one.

He is the single way in, not one option among several.

🚪 Jesus names himself the door

🐑 Earlier verses point straight here

🔑 He is the single way in

📖 This is not one option among many

## ⚠️ All That Ever Came Before Me Are Thieves And Robbers

Jesus is not condemning every leader Israel ever had.

He means false shepherds and false messiahs who claimed a role that was not theirs.

Their followers never found lasting safety or real pasture.

Only the true door leads anywhere worth going.

⚠️ This targets false shepherds, not every leader

🐑 Their followers found no real safety

🚫 A false claim still fails

📖 Only the true door leads somewhere real

## 🚪 He Shall Be Saved

Entering through Jesus brings real safety, the same way a sheep is safe inside the fold.

"Go in and out" describes normal daily movement, not a one time event.

"Find pasture" means ongoing care, not a single rescue and nothing after.

Life with Jesus is described here as continual, not a single moment.

🚪 Entering through him brings real safety

🔁 Go in and out means daily movement

🌾 Pasture means ongoing care

📖 This is continual life, not one moment

## 🥷 For To Steal, And To Kill, And To Destroy

The thief in this picture has three goals, and all three take something away.

Nothing the thief does adds to the flock's life.

Jesus names his own purpose in the very next clause as the complete opposite.

The contrast is placed side by side on purpose.

🥷 The thief only takes, never gives

💔 Steal, kill, and destroy name real loss

🔄 Jesus states the opposite purpose

📖 Two purposes placed side by side

## ✨ That They Might Have It More Abundantly

"Life" here does not just mean staying alive longer.

"More abundantly" points to a fuller, richer life than mere survival.

This is the first time in John that Jesus states his purpose this directly.

Everything in the chapter so far builds toward this one line.

🌱 Life means more than mere survival

✨ Abundantly means full, rich life

🎯 This states Jesus's purpose directly

📖 The whole chapter builds to this line

# John 10:11-15
# 🐑 I Am The Good Shepherd
---
## 🐑 I Am The Good Shepherd

"Good" here means more than kind or gentle.

It carries the idea of genuine and completely devoted to the role.

A shepherd could be competent without ever being this committed.

Jesus claims the full measure of the title, not a partial version of it.

🐑 Good means genuine and fully devoted

👍 More than simply kind or gentle

🎯 Jesus claims the full title

📖 Devotion defines this shepherd

## ⚔️ Giveth His Life For The Sheep

A shepherd in this culture sometimes fought off wolves or thieves at real risk.

Jesus goes further than risk here and names his death outright.

This single phrase sets up the whole rest of the chapter.

No hired laborer anywhere would be expected to die for someone else's flock.

⚔️ Shepherds sometimes fought off real danger

💀 Jesus names his own death directly

🔑 This phrase sets up the chapter

📖 No hired hand owes that much

## 💰 An Hireling

A "hireling" was someone paid to watch the flock without owning any of it.

He had no personal stake in whether the sheep lived or died.

When real danger showed up, his pay was not worth the risk to him.

Jesus draws a sharp line between paid duty and real ownership.

💰 Hireling means hired help, not an owner

🐺 He flees once a wolf appears

⚖️ Pay was not worth the risk

📖 Ownership changes what a person risks

## 🔁 Careth Not For The Sheep

This repeats the word "hireling" from the verse just before it on purpose.

Repetition in this chapter marks an idea Jesus wants fully understood.

Fleeing was never really about fear of the wolf.

It was about never truly caring in the first place.

🔁 Hireling repeats on purpose here

🧠 Repetition marks an idea worth remembering

😶 Fleeing exposes a lack of care

📖 Care, not fear, is the real issue

## 🤝 Know My Sheep, And Am Known Of Mine

This goes beyond recognizing a face or a name on a list.

It describes a relationship that runs in both directions.

The sheep know the shepherd the same way the shepherd knows them.

That mutual knowledge is what the hireling never had.

🤝 Knowing here runs in both directions

👀 Not just a face on a list

💞 Mutual knowledge marks a real bond

📖 The hireling never had this bond

## 🙌 As The Father Knoweth Me, Even So Know I The Father

Jesus compares his bond with the sheep to his own bond with God the Father.

That is an enormous claim placed in the middle of a shepherding picture.

The closeness between Father and Son becomes the model for his closeness with his people.

Nothing about this relationship is distant or businesslike.

🙌 Compared to his own bond with the Father

🔗 Father and Son share that closeness

💞 That closeness becomes the model

📖 This relationship is never distant

## 🔁 I Lay Down My Life For The Sheep

This is the third time in five verses that Jesus names his own death.

Repetition this close together is not padding, it is emphasis.

The good shepherd named earlier is now defined by this one act above all.

Everything else in the chapter orbits around this single commitment.

🔁 Third mention in five verses

🎯 Repetition here means emphasis

🐑 This defines the good shepherd

📖 Everything orbits this one commitment

# John 10:16-18
# 🌍 Other Sheep, One Fold
---
## 🌍 Other Sheep I Have, Which Are Not Of This Fold

"This fold" refers to Israel, the people Jesus is speaking to right now.

The "other sheep" point forward to Gentiles who would also come to believe.

This was a real surprise to a Jewish audience expecting the promise for themselves alone.

The flock Jesus describes was always meant to grow beyond one nation.

🐑 This fold means Israel, his first listeners

🌍 Other sheep points to the Gentiles

😮 This surprised a Jewish audience

📖 The flock was always meant to grow

## 🤝 There Shall Be One Fold, And One Shepherd

Two different groups of sheep are promised one single future together.

No separate fold is kept for one group over the other.

This plainly points forward to the church, made of Jews and Gentiles under one shepherd.

Unity, not division, is the goal Jesus names here.

🤝 One future for two different groups

🚫 No separate fold for either group

⛪ This points toward the church

📖 Unity is the stated goal

## ⚰️ That I Might Take It Again

Jesus already names his resurrection here, well before the events of the final chapters.

Laying his life down was never going to be the end of the story.

The Father's love is tied directly to this willing sacrifice and its reversal.

Death here is always going to be followed by life again.

⚰️ Take it again points to resurrection

📆 This comes before the final chapters

❤️ The Father's love ties to this act

📖 Death here is followed by life

## 💪 I Have Power To Lay It Down, And I Have Power To Take It Again

No one is able to force this death on Jesus against his will.

He describes full control over both his death and his return to life.

That level of authority was never claimed by any ordinary teacher or prophet.

This single claim quietly reveals who he really is.

💪 No one can force this death

🔑 He controls both death and return

🙅 No ordinary teacher claimed this

📖 The claim reveals who he is

# John 10:19-21
# ⚔️ A Division Among The Jews
---
## ⚔️ A Division Therefore Again

This is not the first time Jesus's words have split this crowd into two camps.

"Again" points back to an earlier disagreement after Jesus spoke in similar terms.

Strong claims about himself kept producing the same reaction, agreement or rejection.

No one hearing him seemed able to stay neutral for long.

⚔️ Division means the crowd splits in two

🔁 Again recalls an earlier disagreement

🗣️ Strong claims force a reaction

📖 No one stays neutral for long

## 😡 He Hath A Devil, And Is Mad

This accusation claims Jesus is demon possessed and speaking out of madness.

It was a common insult used against anyone whose claims could not be dismissed.

Calling someone mad was an easy way to avoid answering what he said.

The crowd would rather question his sanity than consider his claim.

😡 This accuses him of demon possession

🏷️ Mad meant an easy insult to use

🙈 It avoids answering the real claim

📖 Insult replaces honest consideration here

## 👁️ Can A Devil Open The Eyes Of The Blind

Some in the crowd point back to the healing in the chapter just before this one.

A demon possessed man could not have given sight to someone born blind.

This question answers the accusation from the verse right before it.

The miracle itself argues for Jesus better than any defense he could give.

👁️ Points back to the healing before this

🚫 A demon could not give real sight

❓ This answers the accusation directly

📖 The miracle argues for Jesus

# John 10:22-26
# 🕎 The Feast Of Dedication
---
## 🕎 The Feast Of The Dedication

This feast is known today as Hanukkah, celebrated in winter.

It marked the rededication of the temple after a Greek ruler had defiled it.

That ruler had set up pagan worship inside the temple itself.

The feast remembered the day Israel took their temple back and made it holy again.

🕎 This feast is known today as Hanukkah

🏛️ It marked the temple's rededication

⚔️ A Greek ruler had defiled it

📖 The feast celebrated taking it back

## 🏛️ Solomon's Porch

This was a long, covered walkway along the east side of the temple courtyard.

It offered shade and shelter, making it a natural gathering spot in cold weather.

Teachers and crowds often met there to talk and debate.

The timing and place both matter, cold season, public space, a crowd already there.

🏛️ Solomon's porch was a covered walkway

❄️ It offered shelter in winter

🗣️ Teachers and crowds gathered there

📖 Timing and place both matter here

## ❓ How Long Dost Thou Make Us To Doubt

The crowd is not asking out of honest confusion here.

They are pressing Jesus for a clear, public yes or no answer.

"The Christ" means the promised Messiah, the anointed deliverer Israel had waited for.

A plain answer, they believed, would settle the argument once and for all.

❓ The crowd demands a clear answer

🎯 Christ means the promised Messiah

🗣️ They want a public yes or no

📖 They think a label would settle it

## 🗣️ Tell Us Plainly

Jesus had already answered this question in different words throughout the chapter.

"I am the door" and "I am the good shepherd" were both claims about his identity.

A plain label was never going to replace a changed life and real belief.

The crowd wanted a word, not the deeper trust Jesus was actually asking for.

🗣️ Jesus already answered in other words

🚪 I am the door was one claim

💔 A label cannot replace real belief

📖 Jesus asks for trust, not a word

## 👐 The Works That I Do In My Father's Name

Jesus points to his actions instead of repeating a title they could argue about.

Healing the blind man in the chapter before this was one of these very works.

Actions carried proof that words alone could not fully supply.

He had already given them every reason to believe, whatever word they used.

👐 Works means his actual actions

👁️ An earlier healing was one example

📜 Actions proved what words could not

📖 Evidence was already given plainly

## 🐑 Ye Are Not Of My Sheep

This connects directly back to the whole shepherd picture from earlier in the chapter.

Not believing is the direct result of not belonging, not the cause of it.

This is hard teaching, and Jesus states it without softening it.

Belonging comes first, and trust follows from it.

🐑 This recalls the shepherd picture

🔗 Not believing follows from not belonging

😔 Jesus states this without softening it

📖 Belonging comes before trust here

# John 10:27-30
# 🙌 My Sheep Hear My Voice
---
## 👂 My Sheep Hear My Voice, And I Know Them

This line gathers up what has already been said about hearing and knowing.

Hearing, knowing, and following are described here as one single movement.

A real sheep does all three together, not one without the others.

Jesus is summarizing his own teaching before adding something new.

👂 Hearing, knowing, following move together

🔁 This gathers the chapter's earlier teaching

🐑 A real sheep does all three

📖 Jesus summarizes before adding more

## 🎁 I Give Unto Them Eternal Life

This life is described as a gift given now, not a reward earned later.

"Eternal" describes a quality of life, not only its endless length.

It begins the moment someone belongs to this flock, not after death.

The gift is already in hand for anyone who follows this shepherd.

🎁 Eternal life is a gift, not a reward

⏳ Eternal means quality, not just length

🌱 It begins now, not after death

📖 The gift is already given

## 💔 They Shall Never Perish

This is one of the strongest promises of security found in the Gospels.

"Perish" means final, lasting loss, not a temporary stumble along the way.

The promise covers the whole future, not just the present moment.

Nothing about this flock's safety is left uncertain.

🛡️ This is a strong promise of security

💔 Perish means final, lasting loss

🔮 It covers the whole future

📖 Safety here is never uncertain

## ✋ Neither Shall Any Man Pluck Them Out Of My Hand

"Pluck" pictures someone trying to forcibly rip the sheep away.

Jesus names a direct, physical image of someone attempting exactly that and failing.

His hand is described as the place of real, lasting safety.

No outside force is strong enough to break that grip.

✋ Pluck means a forceful attempt to take

🛡️ His hand means a place of safety

💪 No outside force can break this grip

📖 Safety here is guaranteed, not likely

## 👑 My Father Is Greater Than All

Jesus points to the Father's power as a second layer of the same promise.

Two hands, not one, now hold this same flock securely.

Nothing in all creation outranks the Father's authority.

Security here rests on both the Son and the Father together.

🙌 The Father adds a second layer of safety

🤝 Two hands hold the same flock

👑 Nothing outranks the Father's authority

📖 Father and Son secure this together

## 🙏 I And My Father Are One

This is one of the clearest claims to full equality with God in the Gospels.

Jesus is not merely claiming the same mission as the Father.

He is claiming the same nature and the same essential being.

The reaction in the very next verse shows how the crowd understood this claim.

🙏 This claims full equality with God

🔗 Same nature, not just the same mission

😮 The crowd understood this clearly

📖 The next verse proves how they heard it

# John 10:31-33
# 🪨 They Took Up Stones
---
## 🪨 Took Up Stones Again To Stone Him

This is the second time in John that a crowd tries to stone Jesus over a claim like this.

Stoning was the legal penalty under Jewish law for blasphemy.

The crowd understood "I and my Father are one" as exactly that, a claim to deity.

Their reaction proves they heard the claim correctly, even while rejecting it.

🪨 Second attempt at stoning in John

⚖️ Stoning was the penalty for blasphemy

😮 They understood the claim correctly

📖 Rejection still proves they understood

## 👁️ Many Good Works Have I Shewed You

"Shewed" is an old way of saying shown or displayed openly.

Jesus points back to real, visible miracles he already performed.

These works had already been witnessed publicly, not done in secret.

He lets his actions answer the accusation forming against him.

👁️ Shewed means shown or displayed openly

🙌 Jesus points to real, visible miracles

👥 These works were done publicly

📖 Actions answer the accusation here

## ❓ For Which Of Those Works Do Ye Stone Me

Jesus turns the question back onto the crowd directly.

None of his miracles gave anyone a real reason for violence.

The question exposes that their anger is not really about any work he did.

It is about the identity those works were pointing to all along.

❓ Jesus turns the question on them

🙅 No miracle justified real violence

🎯 Their anger targets his identity instead

📖 The works were never the real issue

## ⚠️ Thou, Being A Man, Makest Thyself God

The Jews here state plainly what they believe Jesus is claiming.

They see a man claiming equality with God as the worst possible offense.

This is the exact charge that returns again at his trial later in this Gospel.

Their own words confirm they understood his claim correctly.

👤 They see a man claiming to be God

⚠️ This counted as the worst offense

⚖️ The same charge returns at his trial

📖 Their words confirm they understood him

# John 10:34-38
# 📜 Ye Are Gods
---
## 📜 Is It Not Written In Your Law, Ye Are Gods

Jesus quotes Psalm eighty two, a passage about human judges acting for God.

That psalm calls those judges "gods" because they carried God's authority in their role.

Jesus makes a legal style argument from scripture they already accepted.

He meets their accusation on their own ground, not by avoiding it.

📜 Jesus quotes Psalm eighty two

⚖️ Judges were called gods there

🧠 This is a scripture based argument

📖 Jesus meets the accusation head on

## 📜 The Scripture Cannot Be Broken

This means scripture carries real, lasting authority that cannot simply be dismissed.

Even a single difficult word choice in the Old Testament still holds weight.

Jesus treats scripture as fully reliable before making the rest of his argument.

This line reveals how seriously he regards every word of it.

📜 Scripture cannot be broken means lasting authority

🧾 Even one word choice still holds weight

🙏 Jesus treats scripture as fully reliable

📖 His view of scripture shapes this reply

## 🙏 Whom The Father Hath Sanctified, And Sent Into The World

"Sanctified" means set apart for a specific, holy purpose.

Jesus is far more than a judge carrying delegated authority like the ones in the psalm.

He was set apart and sent directly by the Father himself.

The comparison to the judges only goes so far before it breaks down in his favor.

🙏 Sanctified means set apart for a purpose

📤 Sent into the world marks his mission

⬆️ He is more than a delegated judge

📖 The comparison favors his claim

## 🙌 I Am The Son Of God

Jesus restates the very claim that started this whole confrontation.

If lesser judges could be called gods without complaint, his claim carries even more weight.

He is not softening the claim here, he is defending it with scripture.

This is the title the crowd reacted to with stones two verses earlier.

🙌 Jesus restates his own claim

⚖️ His claim outweighs the judges by far

🛡️ He defends it, he does not soften it

📖 This is the title that caused the stoning

## ⚖️ If I Do Not The Works Of My Father, Believe Me Not

Jesus gives the crowd a fair, testable standard instead of demanding blind belief.

If his actions do not match his claim, he invites them not to believe him.

This is confident teaching, not a cornered defense.

Truth, he says, can stand up to real scrutiny.

⚖️ Jesus offers a fair, testable standard

🙅 He invites doubt if the works fail

💪 This is confident, not cornered

📖 Truth can stand up to scrutiny

## 🔗 That Ye May Know, And Believe, That The Father Is In Me, And I In Him

This describes a relationship of complete mutual indwelling between Father and Son.

It goes even further than the oneness already claimed earlier in the chapter.

Jesus wants the works themselves to lead the crowd to this deeper understanding.

Belief was always meant to follow the evidence, not replace it.

🔗 Describes mutual indwelling of Father and Son

⬆️ This goes beyond the earlier oneness claim

👐 The works were meant to lead here

📖 Belief follows evidence, not instead of it

# John 10:39-42
# 🏃 Beyond Jordan
---
## 🏃 They Sought Again To Take Him

The crowd moves from stones to an attempt at an outright arrest.

"He escaped out of their hand" shows this was not yet his appointed time.

Jesus controls the timing of events throughout this Gospel, not the crowd.

Nothing happens to him before the hour he himself names later in the book.

🏃 The crowd tries an arrest this time

🛡️ He escapes, it is not yet his hour

⏳ Jesus controls the timing here

📖 Nothing happens before his appointed hour

## 🗺️ Beyond Jordan Into The Place Where John At First Baptized

Jesus returns to the exact location where his public ministry first began.

That return brings the story full circle after a long, tense chapter in Jerusalem.

It also placed him safely outside the direct reach of the hostile leaders in the city.

Geography here carries real meaning, not just travel logistics.

🗺️ He returns to where his ministry began

🔁 The story comes full circle here

🛡️ This placed him outside Jerusalem's reach

📖 Geography carries meaning, not just logistics

## ✅ All Things That John Spake Of This Man Were True

John the Baptist never performed a single miracle during his entire ministry.

What made John's testimony powerful was its accuracy, not any display of power.

People now compare Jesus's works to John's earlier words and find them matching exactly.

Faithful words outlast flashy signs when it comes to building real trust.

🚫 John himself performed no miracle

🎯 His testimony was accurate, not flashy

✅ Jesus's works match John's earlier words

📖 Faithful words build lasting trust

## 🙌 Many Believed On Him There

This calm, quiet belief closes a chapter that opened with intense conflict in Jerusalem.

Rejection in one place did not stop real faith from growing in another.

This small note sets up the raising of Lazarus in the very next chapter.

The chapter that began with division ends with genuine belief.

🙌 Quiet belief closes a tense chapter

🌱 Rejection in one place did not stop faith

➡️ This sets up the next chapter's story

📖 Division opened it, belief ends it
`.trim();

export const JOHN_TEN_PERSONAL_SECTIONS = parseJohnTenRawNotes(JOHN_TEN_RAW_NOTES);
