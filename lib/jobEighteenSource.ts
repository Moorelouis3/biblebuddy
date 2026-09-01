export type JobEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobEighteenRawNotes(rawText: string): JobEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 18:${startVerse}` : `Job 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 18 sections, received " + sections.length);
  }

  return sections;
}

const JOB_EIGHTEEN_RAW_NOTES = `# Job 18:1-4
# 😤 Bildad Loses Patience
---
## ⏳ How Long Will It Be Ere Ye Make An End Of Words

"Ere" is an old word that simply means before.

Bildad is asking Job when he will finally stop talking.

This is Bildad's second speech in the whole debate.

He wants Job to finish so the friends can answer again.

The question itself reveals how thin Bildad's patience has worn.

⏳ Ere means before
🗣️ Bildad wants Job to stop talking
🔁 This opens Bildad's second speech
📖 His patience is wearing thin

## 👂 Mark And Afterwards We Will Speak

"Mark" here means pay close attention, not write something down.

Bildad wants Job to listen carefully before he answers again.

The request sounds calm and reasonable on the surface.

Underneath it carries real irritation at being interrupted so often.

Bildad is asking for the floor, not offering comfort.

👂 Mark means pay close attention
🗣️ Bildad wants his turn to speak
😤 The calm tone hides real irritation
📖 Bildad wants the floor not comfort

## 🐂 Wherefore Are We Counted As Beasts

Bildad feels Job has been treating his friends like unthinking animals.

Job never actually said this exact line in the book.

Bildad is reacting to the tone of Job's last speech.

He hears every hard word from Job as a personal insult.

Wounded pride is shaping how Bildad listens to Job's grief.

🐂 Beasts means treated as unthinking animals
😡 Bildad feels personally insulted here
🗣️ Job never said this exact line
📖 Pride shapes how Bildad listens

## 🗑️ Reputed Vile In Your Sight

"Reputed" means considered or regarded as something.

"Vile" means worthless or beneath any respect.

Bildad believes Job now sees his three friends as worthless.

He answers Job's grief with a complaint about his own feelings.

Bildad centers his own offense instead of Job's suffering.

🔎 Reputed means considered or regarded
🗑️ Vile means worthless or beneath respect
😔 Bildad feels dismissed by Job
📖 He centers his hurt not Job's pain

## 😢 He Teareth Himself In His Anger

This line echoes something Job said about himself earlier in the book.

Job had described tearing his own flesh in grief and anger.

Bildad throws Job's own image back at him as an accusation.

He treats Job's raw grief as an attack on his friends.

Bildad reads honest pain as if it were a personal assault.

🔗 This echoes Job's own earlier words
😢 Job described tearing himself in grief
🎯 Bildad turns it into an accusation
📖 He reads pain as an assault

## 🌍 Shall The Earth Be Forsaken For Thee

Bildad accuses Job of expecting the whole world to bend around him.

"Forsaken" here means abandoned or emptied out completely.

He pairs this question with one about a rock never moving.

Both point to something fixed that will not shift for one person.

Bildad insists the created order will not reorganize for Job's sake.

🌍 Forsaken means abandoned or emptied out
🗿 The rock question makes the same point
😤 Bildad accuses Job of self focus
📖 Creation will not bend for one man

# Job 18:5-7
# 🕯️ The Wicked Man's Light
---
## 💡 The Light Of The Wicked Shall Be Put Out

Light in this chapter pictures a person's life, success, and future.

Bildad is not naming Job directly in this part of his speech.

He is describing the general fate of every wicked person.

Job is left to decide for himself whether the description fits.

Losing this light means losing prosperity for good.

💡 Light pictures life and success
🗣️ Bildad speaks in general terms here
🎯 Job must judge if it fits him
📖 Losing light means losing prosperity

## 🔥 The Spark Of His Fire Shall Not Shine

Hebrew poetry often says the same idea twice in matching lines.

"Light" and "the spark of his fire" describe the same coming ruin.

The repeated image adds weight rather than new information.

Bildad wants this particular point to land hard on Job.

One idea stated twice sinks in deeper than one line alone.

🔁 Hebrew poetry often repeats one idea
🔥 Spark of fire matches the light
⚖️ Repetition adds weight not new facts
📖 Bildad wants this point to land

## ⛺ The Light Shall Be Dark In His Tabernacle

A "tabernacle" here simply means a tent or a dwelling place.

Bildad says the wicked man's own home will go dark too.

This shifts the picture from the man himself to his household.

Even his family and legacy get pulled into the ruin.

The darkness spreads from one man to everyone under his roof.

⛺ Tabernacle means tent or dwelling
🏚️ His own home goes dark too
👪 His household is pulled in
📖 Ruin spreads beyond just one man

## 🕯️ His Candle Shall Be Put Out With Him

Think of a candle burning steadily in a dark room.

Now picture someone reaching over and pinching it out completely.

That sudden final image is what Bildad means by this line.

The man's life ends the same way.

Bildad describes a sudden ruin, not a slow decline.

🕯️ A lit candle pictures a living man
🫰 Pinching it out pictures sudden death
⚡ The end comes fast not slow
📖 Bildad describes a sudden total ruin

## 📏 The Steps Of His Strength Shall Be Straitened

"Straitened" means squeezed into a narrow, restricted space.

Bildad pictures a strong man's stride shrinking into short, cramped steps.

His confident, powerful walk becomes hesitant and small.

Strength that once moved freely now barely moves at all.

Bildad describes power collapsing in on itself.

📏 Straitened means squeezed narrow
🚶 A strong stride becomes cramped
💪 Confident strength turns hesitant
📖 Power collapses in on itself

## 🧠 His Own Counsel Shall Cast Him Down

"Counsel" here means his own plans and advice to himself.

Bildad says the wicked man's own schemes will trip him up.

He will not be brought down only by outside enemies.

His own choices become the trap that ruins him.

This answers Job's earlier complaint about being attacked from outside.

🧠 Counsel means his own plans
🪤 His schemes become his downfall
👤 No outside enemy is required
📖 His own choices ruin him

# Job 18:8-10
# 🪤 Caught In His Own Trap
---
## 🕸️ Cast Into A Net By His Own Feet

A net here is a hunting tool that trapped animals by the legs.

Bildad says the wicked man walks into it himself.

Nobody else drives him toward the trap that catches him.

His own steps carry him straight into his own ruin.

Bildad insists this downfall is self inflicted, not forced on him.

🕸️ A net trapped animals by the legs
🚶 His own feet walk him in
👤 No one else drives him there
📖 This downfall is self inflicted

## 👣 He Walketh Upon A Snare

A snare here means a hidden loop of cord or rope.

Bildad says the man does not even see it under his feet.

He walks forward with total confidence straight into danger.

The danger stays invisible to him until it is too late.

Confidence without caution becomes its own kind of blindness.

👣 A snare is a hidden loop trap
😌 The man walks in full confidence
🙈 He cannot see the danger coming
📖 Confidence without caution becomes blindness

## ⚙️ The Gin Shall Take Him By The Heel

A "gin" is an old word for a mechanical trap, not a drink.

It worked by snapping shut suddenly on whatever stepped into it.

Bildad pictures this trap catching the man by the heel.

The image adds a second, different kind of trap to the first one.

Every kind of trap in this chapter points to the same certain end.

⚙️ Gin means an old mechanical trap
🦶 It snaps shut on the heel
🔁 This adds a second kind of trap
📖 Every trap points to the same end

## 🗡️ The Robber Shall Prevail Against Him

"Prevail" means to win out or overpower completely.

Bildad pictures an actual robber overpowering the trapped man.

Once caught in a trap, a person cannot fight off an attacker.

The trap and the robber work together to finish him off.

Being trapped leaves a person defenseless against whatever comes next.

🏴 Prevail means to win out completely
🗡️ A robber overpowers the trapped man
🪢 The trap leaves him unable to fight
📖 Being trapped leaves a person defenseless

## 🕳️ The Snare Is Laid For Him In The Ground

This snare was hidden and buried, not left out in plain sight.

Bildad describes danger set in advance, waiting for the man to arrive.

The trap was not an accident that happened to occur.

Someone or something had already prepared this exact ruin ahead of time.

The ground itself becomes dangerous ground for the wicked man.

🕳️ The snare was hidden underground
⏳ It was prepared before he arrived
🚫 This was not a random accident
📖 The ground itself turns dangerous

## 🪵 A Trap For Him In The Way

"The way" simply means the path or road he was walking.

Bildad repeats the trap image one final time for emphasis.

Ordinary daily movement becomes the very thing that destroys him.

He does not need to go looking for trouble to find it.

Danger waits on the road he already walks every day.

🪵 The way means his ordinary path
🔁 Bildad repeats the trap image again
🚶 Daily movement becomes dangerous for him
📖 Danger waits on his own road

# Job 18:11-15
# 👑 The King Of Terrors
---
## 😱 Terrors Shall Make Him Afraid On Every Side

Bildad pictures fear surrounding the man from every direction at once.

There is no safe direction left for him to turn toward.

This is not one single fear but many fears closing in together.

The wicked man cannot outrun or outthink what is coming for him.

Total fear becomes the atmosphere he now lives inside.

😱 Terrors surround him from every side
🧭 No safe direction is left
🌀 Many fears close in together
📖 Fear becomes the air he breathes

## 🏃 Shall Drive Him To His Feet

This phrase pictures terror chasing the man, forcing him to keep moving.

He cannot rest or settle anywhere for very long.

Fear itself becomes the thing controlling his every step.

The hunter and hunted imagery from earlier verses continues here.

A man ruled by terror is never truly free to stand still.

🏃 Terror forces him to keep moving
😰 He cannot rest or settle down
🎯 Fear now controls his every step
📖 He is never free to stand still

## 🍞 His Strength Shall Be Hungerbitten

"Hungerbitten" means weakened and gnawed away by hunger or famine.

Bildad pictures strength being eaten away slowly from the inside.

This is not sudden collapse but a long, wearing decline.

Whatever the man once relied on for power is being consumed.

Even his own body begins to work against him now.

🍞 Hungerbitten means gnawed by hunger
📉 Strength is eaten away slowly
⏳ This is a long wearing decline
📖 His own body works against him

## 💀 Destruction Shall Be Ready At His Side

Bildad pictures destruction like a servant standing constantly ready to act.

It does not wait to be summoned from far away.

It already stands right beside the man at every moment.

Ruin is never distant for someone living under this kind of judgment.

Disaster becomes a constant companion rather than a rare event.

💀 Destruction stands ready like a servant
📍 It waits right beside him always
⏱️ Ruin is never far away here
📖 Disaster becomes a constant companion

## 🦴 It Shall Devour The Strength Of His Skin

"Devour" means to eat up or consume completely.

Bildad pictures disease consuming the man's body from the outside in.

"The strength of his skin" points to his outward health and appearance.

Even what looks strong on the surface is being eaten away.

Nothing about the man is left untouched by this decline.

🦴 Devour means eaten up completely
🩹 Skin here points to outward health
👁️ Even outward strength is consumed
📖 Nothing about him stays untouched

## 👑 The Firstborn Of Death Shall Devour His Strength

"The firstborn of death" is a striking way to picture the deadliest disaster.

Many scholars believe this phrase points to the worst and cruelest fate death can bring.

Calling it a firstborn treats death almost like it has a family of terrors.

This is the most severe outcome the whole chapter names.

Bildad is describing an end that is not merely hard but total.

👑 This names the deadliest kind of ruin
👪 Firstborn pictures death having its own family
📈 This is the worst outcome named here
📖 The end described is total not partial

## 🏚️ His Confidence Shall Be Rooted Out Of His Tabernacle

"Confidence" here means whatever the man trusted in to keep him safe.

Bildad pictures that trust being torn out by the very roots.

This happens inside his own home, not somewhere far away.

Nothing he relied on inside his own household will remain standing.

Even his sense of safety at home gets pulled out completely.

🏚️ Confidence means what he trusted for safety
🌱 It gets torn out by the roots
🏠 This happens inside his own home
📖 Even his sense of safety is gone

## 👑 It Shall Bring Him To The King Of Terrors

"The king of terrors" is one of the Bible's boldest titles for death.

It pictures death as a ruler every fear in this chapter finally serves.

All the smaller terrors named earlier build toward this one final terror.

Death becomes the end point of the wicked man's whole downward story.

Every trap, every fear, and every loss in this chapter leads here.

👑 King of terrors is a title for death
⚡ Every smaller fear answers to this one
🏁 Death ends the wicked man's story
📖 Every earlier terror leads to this king

## 🏠 It Shall Dwell In His Tabernacle Because It Is None Of His

The "it" in this line points to disaster, not to the man himself.

Ruin moves into the man's own home and settles in for good.

The phrase "none of his" means the home no longer belongs to him.

What he built and owned now belongs to his own ruin instead.

Losing his home to ruin completes the picture of total collapse.

🏠 It refers to ruin not the man
🏚️ Ruin settles into his own home
🔑 None of his means it is not his
📖 Total collapse now includes his home

## 🌋 Brimstone Shall Be Scattered Upon His Habitation

"Brimstone" is burning sulfur, a substance linked to fire and judgment in the Bible.

This same word describes what fell on Sodom and Gomorrah in Genesis.

Bildad is connecting the wicked man's fate to that same infamous judgment.

"Habitation" simply means the place where he lived.

Even the ground under his home becomes a sign of judgment.

🌋 Brimstone means burning sulfur
🔥 The same word appears at Sodom
⚖️ Bildad links him to that judgment
📖 His own ground becomes a sign

# Job 18:16-21
# 🌳 No Root No Name
---
## 🌱 His Roots Shall Be Dried Up Beneath

Bildad switches to the picture of a tree to describe total ruin.

Roots below the ground represent a person's hidden foundation and support.

When roots dry up, nothing can keep the tree alive any longer.

This pictures the man's inner strength failing where no one can see it.

Ruin here begins from the ground up, hidden at first.

🌱 Roots picture hidden inner support
🏜️ Dried roots mean no support left
👁️ This ruin starts where no one sees
📖 Collapse begins from the ground up

## 🌿 Above Shall His Branch Be Cut Off

Bildad now moves from the hidden roots to the visible branches above.

A cut branch shows on the outside what already happened underground.

Together the roots and the branch picture total ruin, top to bottom.

Nothing about the tree survives once both halves are destroyed.

The man's public life mirrors what already failed inside him privately.

🌿 Branch pictures the visible outer life
✂️ A cut branch matches the dead roots
🌳 Together they show total ruin
📖 Outer collapse mirrors inner failure

## 🕳️ His Remembrance Shall Perish From The Earth

"Remembrance" means how a person is remembered after they are gone.

Bildad says the wicked man will eventually be entirely forgotten.

No monument, story, or memory of him will survive for long.

In a culture that valued a lasting name, this was a severe loss.

Being forgotten completely was one of the worst fates a person could imagine.

🕳️ Remembrance means being remembered later
🚫 The wicked man will be forgotten
🏛️ No lasting story survives about him
📖 Being forgotten was a severe loss

## 🏘️ He Shall Have No Name In The Street

In the ancient world, the street or gate was where people gathered publicly.

Having a good name there meant being known, respected, and welcomed.

Bildad says the man will lose even that basic public respect.

His name will not be spoken with honor by anyone in town.

Public disgrace becomes the final layer added onto his private ruin.

🏘️ The street was a public gathering place
🙌 A good name there meant respect
🤫 The man loses even that respect
📖 Public disgrace adds to his ruin

## 🌑 He Shall Be Driven From Light Into Darkness

Light and darkness in this chapter stand for life and death.

"Driven" means forced out, not a choice the man makes himself.

Bildad pictures an unwilling, forceful push out of the world of the living.

This is not a quiet fading but a violent removal.

He does not walk into darkness on his own.

He is thrown into it instead.

🌑 Light and darkness mean life and death
👊 Driven means forced out unwillingly
⚡ The removal is violent not quiet
📖 He is thrown out, not walking out

## 🌍 Chased Out Of The World

This phrase repeats the same idea from the line just before it for emphasis.

Bildad is not describing exile to another country or region.

He means total removal from among the living entirely.

The repetition drives home how absolute this loss really is.

Nothing gentle remains in Bildad's description of the wicked man's end.

🌍 This repeats the removal for emphasis
🚪 It means removal from among the living
🔁 Repetition shows how absolute the loss is
📖 Nothing gentle remains in this picture

## 👨‍👦 He Shall Neither Have Son Nor Nephew Among His People

In this verse, "nephew" is an old word for a grandson, not a modern nephew.

Bildad says the man's entire family line will come to a complete end.

No son and no grandson means no one to carry his name forward.

In this culture, having descendants was considered a central sign of God's blessing.

Losing every descendant was one of the harshest judgments Bildad could name.

👨‍👦 Nephew here is an old word for grandson
🧬 His whole family line comes to an end
🏆 Descendants were seen as a sign of blessing
📖 Losing them all was a harsh judgment

## 🏚️ Nor Any Remaining In His Dwellings

This phrase widens the loss beyond just direct descendants.

"Dwellings" means his homes, land, and any place his family once lived.

Bildad says absolutely no one connected to the man will be left anywhere.

Even distant relatives or servants tied to his household disappear from the picture.

The ruin reaches every corner of what once belonged to him.

🏚️ Dwellings means his homes and land
🚫 No one connected to him remains
👥 Even distant relatives disappear here
📖 Ruin reaches everything that was his

## 😲 They That Come After Him Shall Be Astonied At His Day

"Astonied" is an old form of astonished, meaning shocked or horrified.

"His day" refers to the day his ruin finally happens.

Bildad says future generations will be stunned when they hear what happened to him.

His downfall becomes a story people tell as a warning to others.

A ruined life can end up teaching a lesson its owner never intended.

😲 Astonied means shocked or horrified
📅 His day means the day of his ruin
🗣️ Later generations will hear the story
📖 His ruin becomes a warning to others

## 😨 As They That Went Before Were Affrighted

"Affrighted" is another old word that simply means terrified.

This line matches the one just before it, another example of Hebrew repetition.

Both the generation before and the generation after react the same way.

Everyone who hears about this man's fate responds with the same horror.

The reaction to this kind of ruin never really changes across time.

😨 Affrighted means terrified
🔁 This repeats the idea just stated
👥 Both generations react the same way
📖 Horror at this fate never changes

## ⚖️ Surely Such Are The Dwellings Of The Wicked

Bildad now steps back and states his entire point plainly.

Every earlier image in this chapter builds toward this one line.

"Surely" signals Bildad's total confidence that his conclusion is correct.

He believes he has just described exactly what happens to every wicked person.

This line works as the summary of his whole speech.

⚖️ Bildad states his point plainly here
🧩 Every earlier image builds to this line
💯 Surely shows his total confidence
📖 This line summarizes his whole speech

## 🙏 This Is The Place Of Him That Knoweth Not God

Bildad ends his speech by naming the real root cause behind everything.

Every trap, every loss, and every terror traces back to this one thing.

"Knoweth not God" means the man never had a real relationship with Him.

For Bildad, this single missing thing explains the whole downward spiral.

The chapter closes not on the punishments but on their true cause.

🙏 Knoweth not God means no real relationship
🌱 This is named as the root cause
🧭 Every earlier loss traces back to it
📖 The chapter closes on the true cause
`.trim();

export const JOB_EIGHTEEN_PERSONAL_SECTIONS = parseJobEighteenRawNotes(JOB_EIGHTEEN_RAW_NOTES);
