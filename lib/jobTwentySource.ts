export type JobTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyRawNotes(rawText: string): JobTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 20:${startVerse}` : `Job 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 20 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_RAW_NOTES = `# Job 20:1-3
# 😤 Zophar Answers Too Fast
---
## 🗺️ Zophar The Naamathite

Naamathite likely points to a region near Edom, though the exact location is not certain.

This is Zophar's third and final speech in the whole book of Job.

He has grown more impatient with every round of this argument.

This time he skips any greeting and launches straight into his case.

🗺️ Naamathite likely points near Edom
🔁 This is Zophar's third speech
😤 He grows more impatient each round
📖 He skips a greeting and starts arguing

## 💭 My Thoughts Cause Me To Answer

Zophar admits his answer comes from agitation inside him, not from calm reasoning.

The word thoughts here points to his inner emotions, not simple logic.

He is telling Job plainly that he cannot stay silent any longer.

This is an honest but revealing admission about where his speech is really coming from.

💭 Thoughts here means inner emotion, not logic
😠 Zophar cannot stay silent any longer
🗣️ He admits his answer is agitated
📖 He reveals where his speech comes from

## 🏃 For This I Make Haste

Zophar says he is rushing to respond, not taking time to think it through.

Haste in this context means acting quickly, without patience or careful thought.

This contrasts sharply with the wisdom Zophar claims to be offering Job.

A rushed answer often says more about the speaker than about the truth.

🏃 Haste means acting quickly, without patience
⚡ Zophar rushes instead of thinking carefully
⚖️ This contrasts with the wisdom he claims
📖 A rushed answer reveals the speaker

## 🩹 The Check Of My Reproach

Check here means a rebuke or a correction, something that stings.

Reproach means a sharp insult or shame directed at someone.

Zophar has taken Job's words in the last chapter as a personal attack on himself.

He is not just defending Job's suffering.

He is defending his own wounded pride.

🩹 Check means a rebuke that stings
😤 Reproach means a sharp insult or shame
🙋 Zophar takes Job's words personally
📖 He is defending his own pride

## 🧠 The Spirit Of My Understanding

Zophar claims a kind of inner insight is compelling him to speak.

He believes his own understanding gives him the right to correct Job.

This sets up the rest of his speech as his personal wisdom.

Zophar is confident he is right, even though he will be proven wrong later in the book.

🧠 Understanding here means his own insight
🗣️ Zophar claims this insight forces his speech
📚 This frames his whole speech as wisdom
📖 God later shows this confidence was wrong

# Job 20:4-9
# 💨 The Wicked Vanish Like A Dream
---
## 🌍 Since Man Was Placed Upon Earth

Zophar opens by appealing to wisdom he believes is old and universally known.

Since man was placed upon earth means this truth has held true since the beginning of humanity.

Zophar is implying Job should already know this without being told.

He is framing his coming argument as common sense, not new insight.

🌍 This appeals to truth since humanity began
🧓 Zophar calls it old, common wisdom
🙄 He implies Job should already know it
📖 He frames his view as common sense

## 🏆 The Triumphing Of The Wicked Is Short

Triumphing here means celebrating success or victory.

Zophar states his main argument for this entire speech in one line.

He believes any success the wicked enjoy cannot possibly last.

This becomes the theme every image in the rest of the chapter will support.

🏆 Triumphing means celebrating success or victory
⏳ Zophar claims wicked success cannot last
🎯 This is his main argument for the chapter
📖 Every later image supports this one claim

## 🎭 The Joy Of The Hypocrite But For A Moment

Hypocrite in the King James Bible does not mean a two faced person the way it does today.

It means someone who is godless or ungodly, living without genuine reverence for God.

Zophar says this person's happiness will only last for a very brief time.

The word moment stresses just how short lived that joy really is.

🎭 Hypocrite here means godless, not two faced
😄 It refers to someone without reverence for God
⏱️ Moment stresses just how brief this is
📖 Zophar says this joy cannot last

## 👑 His Excellency Mount Up To The Heavens

Excellency here means wealth, status, and public glory.

Zophar pictures the wicked person's success rising higher and higher, like a building under construction.

This is hyperbole, deliberate exaggeration meant to make a point vividly.

No one's actual status literally touches the sky.

Zophar is describing how impressive this person's rise looks to everyone watching.

👑 Excellency means wealth, status, and glory
🏗️ Zophar pictures success rising higher and higher
🎨 This is hyperbole, exaggeration for effect
📖 It shows how impressive the rise looks

## ☁️ His Head Reach Unto The Clouds

This line repeats the same idea from the line before it in different words.

Hebrew poetry often says one thing twice, using two different pictures.

Reaching into the clouds pushes the image of pride even higher than before.

Zophar wants Job to picture the most extreme possible version of worldly success.

☁️ This repeats the idea with a new picture
🔁 Hebrew poetry often restates an idea twice
📈 The image pushes even higher than before
📖 Zophar pictures the most extreme success

## 💩 Perish For Ever Like His Own Dung

Dung means animal waste, something worthless that gets thrown away and forgotten.

Zophar says the wicked person's end will be just as low and just as final.

This is a deliberately crude and shocking image, not polite language.

Someone who rose as high as the clouds will end as low as garbage.

💩 Dung means waste, thrown away and forgotten
📉 The wicked person's end is low and final
😳 This image is deliberately crude and shocking
📖 The highest rise ends in the lowest fall

## 🔍 They Which Have Seen Him Shall Say Where Is He

People who once knew this person well will search for him and come up empty.

The question Where is he shows just how sudden and complete his disappearance was.

No one needs to explain what happened.

His absence alone becomes the proof that Zophar's warning came true.

🔍 People who knew him will search for him
❓ Where is he shows a sudden disappearance
🤐 No explanation is needed, the absence speaks
📖 His absence proves Zophar's warning true

## 🌫️ He Shall Fly Away As A Dream

Dreams feel completely real while they are happening.

The moment a person wakes up, a dream disappears and cannot be recovered.

Zophar compares the wicked person's success to exactly that kind of vanishing.

It felt solid and real, right up until it was gone.

🌫️ Dreams feel real while they are happening
⏰ Waking up makes a dream vanish completely
💭 Zophar compares success to that same vanishing
📖 It felt real until it was suddenly gone

## 🌙 Chased Away As A Vision Of The Night

This line intensifies the dream image from the line before it.

A vision of the night suggests something even more unsettling, closer to a nightmare.

Chased away means forced out, not simply fading on its own.

Zophar pictures the wicked person's success being violently driven away, not gently forgotten.

🌙 Vision of the night suggests a nightmare
💨 Chased away means forced out, not faded
⚡ This intensifies the dream image before it
📖 His success is driven away, not forgotten

## 👁️ His Place Shall Behold Him No More

Zophar repeats the idea of total disappearance a third time in these two verses.

The eye that once watched him will never see him again.

Even his own place, his home and land, will hold no trace that he was ever there.

Zophar is building toward one single, overwhelming picture of erasure.

👁️ The eye that saw him sees no more
🏠 His own home holds no trace of him
🔁 Zophar repeats this erasure a third time
📖 The picture becomes total, complete erasure

# Job 20:10-16
# 🐍 Sin Turns To Poison Inside Him
---
## 👶 His Children Shall Seek To Please The Poor

Zophar pictures a complete reversal for the wicked man's family after he is gone.

His children, who once lived off his stolen or unjust wealth, will fall to a much lower place.

They will be forced to seek favor from the very people their father once oppressed.

The family's fortune does not simply disappear.

It flows backward, toward the people it was taken from.

👶 His children fall to a lower place
🙏 They must seek favor from the poor
🔄 The wrong is reversed in the next generation
📖 Stolen fortune flows back where it belongs

## ↩️ His Hands Shall Restore Their Goods

Restore means to give something back to its rightful owner.

Zophar says even the wicked man's own family will end up returning what he wrongly took.

This continues the picture of reversal from the line before it.

Justice, in Zophar's view, eventually corrects itself, even generations later.

↩️ Restore means giving something back
👪 His own family ends up returning it
⚖️ This continues the picture of reversal
📖 Justice corrects itself, even generations later

## 🦴 His Bones Are Full Of The Sin Of His Youth

Bones in Hebrew thought often represent a person's deepest, most permanent inner self.

Zophar says this man's sin is not a recent problem.

It began when he was young and has settled deep inside him ever since.

Sin, left unaddressed, does not stay on the surface.

It works its way into the core of who a person becomes.

🦴 Bones often picture a person's deepest self
🧒 This sin began back in his youth
⏳ It has settled deep inside over time
📖 Sin left unaddressed reaches the core

## ⚰️ Which Shall Lie Down With Him In The Dust

Dust is a common Old Testament image for the grave and for death itself.

Zophar says this deep, buried sin will still be with the man when he dies.

It was never dealt with, so it never truly left him.

Some things a person refuses to face simply follow them all the way to the end.

⚰️ Dust is an image for the grave
🔗 The sin stays with him until death
🙅 It was never faced or dealt with
📖 Unfaced sin follows a person to the end

## 🍬 Wickedness Be Sweet In His Mouth

Zophar switches to a new picture here, using the language of eating and taste.

Sweet in his mouth means the man genuinely enjoys doing wrong.

Sin does not always feel bad while a person is doing it.

Sometimes it feels good, which is exactly what makes it so dangerous.

🍬 Sweet in his mouth means he enjoys it
👅 Zophar switches to an eating and taste picture
😋 Sin often feels good while it is happening
📖 That good feeling is what makes it dangerous

## 👅 Hide It Under His Tongue

Hiding something under the tongue pictures savoring a piece of candy slowly, on purpose.

Zophar says this man does not rush through his sin.

He keeps it close, enjoying it for as long as he possibly can.

This detail makes the sin feel deliberate, not accidental or momentary.

👅 Hiding it under the tongue means savoring slowly
🍭 Zophar compares it to keeping candy inside
🕰️ He enjoys this sin as long as possible
📖 This makes the sin feel deliberate, not accidental

## ✋ Spare It And Forsake It Not

Spare here means to hold back from giving something up.

Forsake means to abandon or let go of completely.

Zophar says this man refuses to release his sin, even when he easily could.

He is not someone who slipped once.

He is someone who keeps choosing to hold on.

✋ Spare means holding back, refusing to release
🚫 Forsake means letting go completely
🔁 He keeps choosing to hold on
📖 This is repeated choice, not one mistake

## 🍽️ His Meat In His Bowels Is Turned

Zophar shifts the eating picture from taste to digestion.

Meat here simply means food in general, not only animal flesh.

What tasted sweet going in has now turned rotten inside his body.

The sin that once felt pleasant is now doing real damage where it cannot be seen.

🍽️ Meat here simply means food in general
🔄 What was sweet has turned rotten inside
🙈 The damage happens where no one can see
📖 Pleasant sin still causes real harm inside

## 🧪 The Gall Of Asps Within Him

Gall is a bitter fluid connected to the body, often linked to poison in the Bible.

Asps are venomous snakes, likely a reference to the Egyptian cobra known in this region.

Zophar says the man's food has become as deadly as snake venom inside him.

The sweetness he once savored has fully turned against him.

🧪 Gall is a bitter fluid linked to poison
🐍 Asps are venomous snakes, likely cobras
☠️ His food has become as deadly as venom
📖 The sweetness has fully turned against him

## 💰 Swallowed Down Riches Shall Vomit Them Up Again

Zophar returns to the picture of stolen wealth from earlier in the chapter.

Swallowing riches pictures greedily taking in more and more.

Vomiting them back up means losing it all suddenly and violently.

Ill gotten wealth, in Zophar's view, was never truly his to keep.

💰 Swallowing riches means greedily taking more
🤮 Vomiting it up means losing it violently
🚫 Stolen wealth was never truly his
📖 What is grabbed wrongly does not stay

## 🎯 God Shall Cast Them Out Of His Belly

Zophar makes clear who is really behind this reversal.

This is not simply bad luck or a stomach illness.

God himself forces the stolen wealth back out.

Zophar wants Job to see a moral and divine cause behind this loss, not chance.

🎯 God himself causes this reversal
🚫 This is not random bad luck
✋ Zophar names a divine, moral cause
📖 God forces the wealth back out

## 🐍 He Shall Suck The Poison Of Asps

Zophar repeats the snake venom image once more, this time even more directly.

Sucking poison pictures actively drawing something deadly into himself.

This is not something that merely happens to him.

In Zophar's picture, the man's own sin becomes the poison he takes in.

🐍 Zophar repeats the snake venom image again
🫗 Sucking poison means drawing it in himself
🎯 This is not something that just happens
📖 His own sin becomes his poison

## 💀 The Viper's Tongue Shall Slay Him

Viper is another word for a venomous snake, closely related to the asp mentioned earlier.

Slay means to kill, often violently.

Zophar closes this section on the clearest, most direct image of the entire passage.

The very sin the man once savored becomes the exact thing that kills him.

💀 Viper is another word for venomous snake
🔪 Slay means to kill, often violently
🎯 Zophar closes on his sharpest image yet
📖 The sin he savored becomes what kills him

# Job 20:17-19
# 🍯 He Will Never Enjoy What He Took
---
## 🍯 The Rivers The Floods The Brooks Of Honey And Butter

This pictures overflowing abundance, more richness than anyone could possibly use up.

Honey and butter were prized foods in the ancient world, signs of a truly good life.

Zophar says the wicked man will never actually get to enjoy this kind of abundance.

Whatever he gained through wrongdoing will not become the lasting, satisfying wealth he pictured.

🍯 Honey and butter picture prized, rich food
🌊 Rivers and brooks picture overflowing abundance
🚫 He will never actually enjoy this abundance
📖 His gains do not become lasting wealth

## 💪 That Which He Laboured For Shall He Restore

Laboured means worked hard for, though here that work was built on wrongdoing.

Restore means give back to the person it rightfully belongs to.

Zophar says all that effort will ultimately profit someone else, not the man himself.

His labor becomes pointless from his own perspective.

💪 Laboured means worked hard, even through wrongdoing
↩️ Restore means giving it back to its owner
🙅 His effort profits someone else, not him
📖 His hard work becomes pointless for him

## 🚫 Shall Not Swallow It Down

This returns to the eating language used earlier in the chapter.

Swallowing something down means fully taking it in and keeping it.

Zophar says this man will be stopped before he can actually consume what he gained.

He gets the trouble of taking it without ever getting to keep it.

🍽️ Swallowing down means fully taking something in
🚫 He is stopped before he can consume it
😤 He gets the trouble without the reward
📖 Taking without keeping is the whole point

## 💼 According To His Substance Shall The Restitution Be

Substance here means his wealth, property, and total possessions.

Restitution means paying back exactly what is owed, matched to what was taken.

Zophar says the repayment will be measured precisely against what the man actually has.

Nothing about this correction, in Zophar's view, will be left to chance.

💼 Substance means his wealth and possessions
⚖️ Restitution means paying back what is owed
📏 The repayment is measured exactly against him
📖 Nothing about this correction is left to chance

## ⚖️ He Hath Oppressed And Hath Forsaken The Poor

Oppressed means used power unfairly to harm or control someone weaker.

Forsaken means abandoned someone who needed help.

Zophar finally names the actual crime behind everything he has described so far.

This is not vague wrongdoing.

It is a specific pattern of hurting people who could not fight back.

⚖️ Oppressed means used power unfairly to harm
🚪 Forsaken means abandoned someone in need
🎯 Zophar names the actual crime plainly
📖 He hurt people who could not fight back

## 🏠 Violently Taken Away An House Which He Builded Not

Zophar describes outright theft, not simply hard bargaining or shrewd business.

The man seized a house or property that someone else had built with their own labor.

Violently makes clear this was forceful, not a fair or willing exchange.

Taking what another person built is presented here as one of his clearest crimes.

🏠 He seized a house someone else built
💪 Violently means this was forceful, not fair
🚫 This was outright theft, not shrewd business
📖 Taking another's work is his clearest crime

# Job 20:20-22
# 😰 No Rest, Even At The Top
---
## 😌 He Shall Not Feel Quietness In His Belly

Quietness here means a settled sense of peace and satisfaction.

Belly in Hebrew idiom often points to a person's deepest inner appetite, not just the stomach.

Zophar says this man will never feel truly at peace, no matter how much he gains.

Wealth gained wrongly cannot buy the rest a person actually needs.

😌 Quietness means a settled sense of peace
🍽️ Belly pictures inner appetite, not just the stomach
🚫 He never feels truly at peace inside
📖 Wrong gain cannot buy real rest

## 🎯 He Shall Not Save Of That Which He Desired

Desired means the very things this man wanted most and worked to get.

Save here means to keep safely, to hold onto for the long term.

Zophar says even his most wanted possessions will slip out of his grasp.

Getting something and keeping it, it turns out, are two very different things.

🎯 Desired means what he wanted most
🤲 Save means keeping something for the long term
💨 His most wanted things slip away anyway
📖 Getting it and keeping it are different

## 📉 There Shall None Of His Meat Be Left

Meat again simply means food or provisions in general.

Zophar pictures total loss, nothing at all left over from everything he gathered.

This is not a partial setback.

It is complete and total depletion.

📉 Meat means food and provisions in general
🍽️ Zophar pictures total loss, nothing left over
🚫 This is not a partial setback
📖 It is complete, total depletion

## 🔍 No Man Look For His Goods

Earlier in the chapter, people searched for the man himself and could not find him.

Now Zophar says no one will even bother searching for what he owned.

His goods become worthless or simply gone, not worth anyone's effort to chase.

The man's entire legacy, both himself and his wealth, disappears without a trace.

🔍 Earlier people searched for the man himself
🙅 Now no one searches for his goods
💸 His wealth is not worth chasing after
📖 Both the man and his legacy vanish

## 📦 In The Fulness Of His Sufficiency

Sufficiency means having more than enough, fully supplied in every way.

Fulness intensifies that idea even further, meaning the absolute peak of having plenty.

Zophar picks the exact moment this man feels most secure and successful.

That is precisely the moment everything is about to fall apart.

📦 Sufficiency means having more than enough
⬆️ Fulness means the absolute peak of plenty
🎯 Zophar picks his most secure moment
📖 That moment is when it all falls apart

## 🧱 He Shall Be In Straits

Straits means a place of pressure and distress, like being squeezed into a narrow space.

Zophar says trouble arrives at the exact height of this man's success, not before or after.

There is no safe zone, not even at the very top.

Sudden trouble at the peak feels far worse than trouble that builds up slowly.

🧱 Straits means pressure, like a narrow space
⏰ Trouble arrives right at the height of success
🚫 There is no safe zone at the top
📖 Sudden trouble at the peak feels worse

## 🤝 Every Hand Of The Wicked Shall Come Upon Him

Zophar says this man's downfall will not come from good, honest people.

Other wicked people, the kind he may have once associated with, will turn on him instead.

There is no loyalty among people who live by taking from others.

The very world he built his life around ends up destroying him.

🤝 His downfall comes from other wicked people
🔄 Even his own circle turns against him
🚫 There is no loyalty among the wicked
📖 The world he built destroys him too

# Job 20:23-29
# ⚡ The Portion God Appoints The Wicked
---
## 🍽️ About To Fill His Belly

Zophar returns to the same idea used earlier in the chapter, a person at the height of satisfaction.

This time the picture is even more physical, a man sitting down to eat a full meal.

The timing here is deliberate and pointed.

Judgment does not wait for a convenient moment.

It arrives at the exact instant this man feels most secure.

🍽️ This pictures a man about to eat well
🎯 Zophar returns to his fulness of success image
⏰ Judgment strikes at the least convenient moment
📖 It arrives when he feels most secure

## 🔥 God Shall Cast The Fury Of His Wrath Upon Him

Fury here means intense, burning anger.

Zophar names God directly and specifically as the one bringing this judgment.

This is not vague misfortune or simple bad luck.

Zophar wants Job to understand that real consequences, in his view, come from God himself.

🔥 Fury means intense, burning anger
🎯 God is named directly as the source
🚫 This is not vague or random misfortune
📖 Real consequences come from God himself

## 🌧️ Rain It Upon Him While He Is Eating

Rain here pictures judgment falling steadily and completely, like a storm that cannot be avoided.

Zophar chooses the moment of eating on purpose, the most relaxed and vulnerable point in a person's day.

There is no warning and no chance to prepare.

The suddenness of the timing is the whole point of the image.

🌧️ Rain pictures judgment falling completely
🍽️ Zophar chooses the most relaxed moment on purpose
⚡ There is no warning to prepare
📖 The sudden timing is the whole point

## ⚔️ He Shall Flee From The Iron Weapon

Iron weapon likely points to a sword or spear, common tools of ancient warfare.

Zophar pictures the wicked man trying to run from one danger.

Fleeing shows he is aware trouble is coming and actively tries to escape it.

His attempt to escape sets up the next line, where escape fails completely.

⚔️ Iron weapon likely means a sword or spear
🏃 The man tries to run from this danger
😰 He knows trouble is actively coming for him
📖 His attempt to escape sets up what follows

## 🏹 The Bow Of Steel Shall Strike Him Through

Bow of steel points to a powerful, high quality weapon that could shoot with great force.

Zophar pictures the man escaping one danger only to be struck down by another.

He runs from the sword directly into the path of an arrow.

There is no safe direction left for him to run.

🏹 Bow of steel means a powerful weapon
🔄 He escapes one danger into another
🎯 Running from the sword meets the arrow
📖 No safe direction is left for him

## 🩸 Drawn And Cometh Out Of The Body

This describes the arrow passing completely through the man's body, not simply wounding him.

Drawn here refers to the weapon being pulled out from the other side.

This is graphic, physical language on purpose.

Zophar is not softening the picture of judgment for his listener.

🩸 The arrow passes completely through his body
➡️ Drawn means it comes out the far side
😳 The language is graphic and physical on purpose
📖 Zophar does not soften this picture

## 🗡️ The Glittering Sword Cometh Out Of His Gall

Gall was understood as a bitter organ inside the body, closely connected to poison and pain.

Glittering describes the blade catching light as it moves, a vivid visual detail.

Zophar pictures the weapon passing through this specific, painful part of the body.

The image ties this violent death back to the poison and bitterness described earlier in the chapter.

🗡️ Glittering describes light catching the blade
🫀 Gall was seen as a bitter, painful organ
🔗 This ties back to the poison imagery earlier
📖 Violence and poison connect in this picture

## 😱 Terrors Are Upon Him

Terrors here means overwhelming, paralyzing fear.

Zophar shifts briefly from physical violence to the man's inner emotional state.

This fear comes on top of everything else already described.

The horror is not only physical.

It is also deeply psychological.

😱 Terrors means overwhelming, paralyzing fear
🧠 Zophar shifts to his inner emotional state
➕ This fear adds to everything else described
📖 The horror is physical and psychological both

## 🌑 All Darkness Shall Be Hid In His Secret Places

Secret places likely points to hidden wealth, hidden sin, or both at once.

Darkness pictures judgment and ruin waiting quietly, unseen until it is too late.

Zophar suggests nothing this man has hidden away will actually stay safe.

Whatever he thought was secure and secret is about to be exposed.

🌑 Darkness pictures judgment waiting unseen
🗝️ Secret places likely means hidden wealth or sin
🙈 Nothing hidden away actually stays safe
📖 What felt secret is about to be exposed

## ✨ A Fire Not Blown Shall Consume Him

Normally, fires in the ancient world needed to be started and fed by human hands.

A fire not blown means this fire lights and spreads on its own, without any human cause.

Zophar is pointing to something supernatural, judgment that does not come from ordinary means.

This fire needs no help from anyone to do its damage.

🔥 Fire not blown needs no human help
🙅 Normal fires require human hands to start
✨ Zophar points to something supernatural here
📖 This judgment needs no ordinary cause

## ⛺ Him That Is Left In His Tabernacle

Tabernacle here simply means his tent, his household, his home.

Zophar says even whoever remains behind in that household will not be spared.

This extends the judgment beyond the man himself to the people still around him.

It will go ill for them too, not only for him.

⛺ Tabernacle here means his tent or home
👪 Whoever remains behind is not spared either
➕ This judgment extends past the man himself
📖 Trouble reaches the whole household, not one man

## 👀 The Heaven Shall Reveal His Iniquity

Iniquity means guilt or wrongdoing, often carrying the sense of something twisted or bent out of shape.

Zophar pictures the sky itself as a witness that exposes what this man tried to hide.

Nothing stays covered forever in Zophar's view of the world.

Even the heavens above will eventually testify against him.

⚖️ Iniquity means guilt or twisted wrongdoing
👀 Heaven itself becomes a witness against him
🙅 Nothing stays hidden forever, in Zophar's view
📖 Even the sky testifies against him

## 🌍 The Earth Shall Rise Up Against Him

This line completes a pair with the line just before it.

Heaven testifies from above, and now earth testifies from below.

Together they picture all of creation united against this one man.

There is nowhere left, above or below, for him to hide.

🌍 Earth testifies from below, heaven from above
🤝 Together they picture all creation united
🙅 There is nowhere left for him to hide
📖 Creation itself rises up against him

## 📈 The Increase Of His House Shall Depart

Increase means everything this man gained or built up over time, his growth and profit.

Zophar says all of that accumulated gain will simply leave.

This is not sudden violence this time, but a quiet draining away.

Loss, in this picture, can be just as total without a single dramatic blow.

📈 Increase means everything he gained over time
💨 That accumulated gain will simply leave
🤫 This loss is quiet, not violent this time
📖 Loss can be total without one dramatic blow

## 🌊 Flow Away In The Day Of His Wrath

Flow away pictures wealth moving like water, impossible to hold onto or contain.

Day of his wrath points to a specific moment of divine judgment, not a slow decline.

Zophar combines both images from this section, sudden judgment and total draining loss.

Everything this man built ends up scattered and gone.

🌊 Flow away pictures wealth moving like water
📅 Day of his wrath means a specific judgment
🔗 This combines sudden judgment with total loss
📖 Everything he built ends up scattered

## 🏛️ The Heritage Appointed Unto Him By God

Portion and heritage both mean a person's assigned share, like an inheritance passed down.

Zophar repeats the same idea twice, in typical Hebrew poetic style, for emphasis.

He is not describing random misfortune here.

He is describing what he believes God deliberately assigns to every wicked person.

This is Zophar's final, summarizing word on the entire speech.

📦 Portion and heritage both mean an assigned share
🔁 Zophar repeats the idea twice for emphasis
🎯 This is not random, but deliberately assigned
📖 This is Zophar's summarizing word on his speech`.trim();

export const JOB_TWENTY_PERSONAL_SECTIONS = parseJobTwentyRawNotes(JOB_TWENTY_RAW_NOTES);
