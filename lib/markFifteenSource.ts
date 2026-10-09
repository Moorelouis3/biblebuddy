export type MarkFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkFifteenRawNotes(rawText: string): MarkFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 15:${startVerse}` : `Mark 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Mark 15 sections, received " + sections.length);
  }

  return sections;
}

const MARK_FIFTEEN_RAW_NOTES = `# Mark 15:1-5
# ⚖️ Silence Before Pilate
---
## 🏛️ The Whole Council

The whole council means the Sanhedrin.

The Sanhedrin was the top Jewish court in Jerusalem.

It combined chief priests, elders, and scribes into one body.

This group usually numbered around seventy men.

Meeting this early, before sunrise, shows how badly they wanted Jesus removed.

🏛️ The council means the Sanhedrin

📜 It combined priests, elders, and scribes

🌅 They met before sunrise

📖 Urgency reveals how much they feared him

## 🚔 Delivered Him To Pilate

Delivered him to Pilate names the handoff from Jewish custody to Roman custody.

Jewish law allowed the council to convict, but not to execute.

Only Rome held the power to carry out a death sentence.

That is exactly why Jesus now stands before the governor instead of the priests.

🚔 Jewish leaders could convict, not execute

🏰 Pilate held Rome's power over life and death

📜 This explains why Jesus faces a governor next

📖 Human plans still worked inside God's larger plan

## 👑 Art Thou The King Of The Jews

Pilate's question is not really about religion.

Rome did not care about blasphemy charges.

Claiming to be a king was treason against Caesar.

Pilate is asking whether Jesus is a political threat to Rome.

👑 The question is political, not religious

🏰 Rome only cared about threats to power

⚔️ Claiming kingship counted as treason

📖 Pilate is testing loyalty to Rome, not faith

## 🗣️ Thou Sayest It

Thou sayest it is Jesus's own careful answer.

He does not deny the title outright.

He also does not simply claim it for himself.

He hands the word back to Pilate and lets it stand.

The answer is true, even though Pilate does not yet understand how.

🗣️ Jesus does not deny the title

🤐 He also does not simply claim it

🔁 He hands the question back to Pilate

📖 The truth stands, even unrecognized

## 🤐 He Answered Nothing

He answered nothing is a strange detail for someone fighting for his life.

Most accused men argue, explain, or beg.

Jesus does none of that here.

Isaiah had already pictured a suffering servant who stayed silent before his accusers.

That old prophecy is playing out in this exact moment.

🤐 Jesus stays silent instead of arguing

⚖️ Most accused men would defend themselves

📜 Isaiah pictured a silent suffering servant

📖 An old prophecy is unfolding here

## 😮 Pilate Marvelled

Pilate marvelled means the silence genuinely surprised him.

Roman governors were used to prisoners pleading for mercy.

Jesus offers no defense at all.

His calm is not weakness.

It looks more like complete trust in something bigger than this trial.

😮 Pilate is genuinely surprised

🏛️ Prisoners usually begged for mercy

🧘 Jesus shows calm, not weakness

➡️ His trust points past this trial

# Mark 15:6-11
# 🔓 The Custom Of Release
---
## 🔓 One Prisoner, Whomsoever They Desired

This names a Passover custom.

Each year, the Roman governor let the crowd choose one prisoner to set free.

No outside Roman record of this exact custom survives.

It likely worked as a goodwill gesture to keep peace during a tense festival.

Pilate expected an easy way to release Jesus without a fight.

🔓 A yearly Passover pardon custom

🏛️ The governor let the crowd choose

🕊️ It kept peace during a tense feast

📖 Pilate hoped the crowd would choose Jesus

## 😈 Barabbas

Barabbas comes from two Aramaic words, bar and abba.

Bar means son, and abba means father.

His own name means son of the father.

The crowd is about to trade the true Son of the Father for a man who only shares the title.

😈 Barabbas means son of the father

🔁 The crowd swaps one son for another

🙏 Jesus is the true Son of the Father

📖 The trade is heavy with irony

## ⚔️ Made Insurrection With Him

An insurrection was an armed uprising against Roman rule.

Barabbas was not a simple thief.

He was a violent revolutionary who had already killed someone.

The crowd is demanding freedom for a killer instead of Jesus.

⚔️ Insurrection means armed rebellion against Rome

🗡️ Barabbas had already committed murder

🔁 The crowd picks a killer over Jesus

📖 Violence is chosen instead of peace

## 😢 For Envy

For envy explains the real reason behind this whole trial.

Pilate can see straight through the religious charges.

The chief priests are not protecting truth.

They are protecting their own position and influence.

😢 Envy is the hidden motive

👀 Pilate sees through the charges

🏛️ Leaders protect their own power

📖 Jealousy, not justice, drives the trial

## 📣 Moved The People

Moved the people means the chief priests actively stirred up the crowd.

This was not a crowd that calmly decided to reject Jesus on its own.

Their leaders pushed them toward it.

A whole crowd's shout can still be someone else's plan.

📣 Leaders stirred up the crowd

🐑 The crowd did not decide alone

🎭 A loud shout can hide a quiet plan

➡️ Manipulation often wears the mask of popular choice

# Mark 15:12-15
# ✝️ Sentenced To The Cross
---
## 👑 Whom Ye Call The King Of The Jews

Whom ye call carries a trace of mockery from Pilate.

He is putting distance between himself and that title.

He is not personally calling Jesus a king.

He is repeating what the crowd and the council are calling him.

👑 Pilate distances himself from the title

🗣️ He repeats what others are saying

🏛️ The crowd owns this accusation now

📖 Pilate is stalling, not deciding

## ✝️ Crucify Him

Crucifixion was a Roman execution, not a Jewish one.

It was reserved for slaves, rebels, and the worst criminals.

A condemned person often hung for hours or even days before dying.

Rome used it publicly on purpose, to warn anyone else who might resist.

✝️ Crucifixion was a Roman punishment

⛓️ It was used for slaves and rebels

⏳ Death could take hours or days

📖 Rome displayed it as a public warning

## ❓ What Evil Hath He Done

Pilate asks this question and never gets a real answer.

He already knows there is no actual crime here.

He asks anyway, hoping the crowd will have second thoughts.

Instead their shouting only grows louder.

❓ Pilate finds no real crime

🧐 He hopes the crowd reconsiders

📢 Their shouting grows louder instead

📖 Truth loses to noise

## 🙇 Willing To Content The People

Willing to content the people means Pilate chooses popularity over justice.

He already believes Jesus is innocent.

He hands him over anyway, to avoid a riot.

Keeping the peace mattered more to Pilate than doing what was right.

🙇 Pilate chooses popularity over justice

⚖️ He already sees Jesus as innocent

🕊️ He fears a riot more than wrongdoing

➡️ Convenience can quietly outweigh conscience

## 🩸 Scourged Him

Scourging was a brutal Roman whipping that happened before crucifixion.

Soldiers used a whip often studded with bone or metal.

It tore the skin and left prisoners badly weakened.

By the time Jesus reaches the cross, his body has already suffered greatly.

🩸 Scourging came before crucifixion

🪢 A studded whip tore the skin

💔 It left prisoners severely weakened

📖 Suffering begins long before the cross

# Mark 15:16-20
# 👑 Mocked As A King
---
## 🏰 Called Praetorium

The Praetorium was the Roman governor's official residence in Jerusalem.

Pilate stayed there during festival time to keep order.

A whole band of soldiers gathering there means dozens of men, not just a few guards.

This mockery was a group event, not one isolated cruelty.

🏰 Praetorium means the governor's residence

👮 Pilate stayed there to keep order

👥 A whole band means dozens of soldiers

📖 Group cruelty replaces private justice

## 🟣 Clothed Him With Purple

Purple dye was extremely expensive in the ancient world.

Only royalty and the wealthy normally wore it.

Putting it on Jesus was not kindness.

It was a cruel joke dressing a condemned man like a king.

🟣 Purple was the color of royalty

💰 The dye was costly to make

🎭 The robe was a cruel joke

📖 Mock honor hides real contempt

## 🌿 Platted A Crown Of Thorns

Platted means woven or braided together.

A real crown was a symbol of honor and rule.

This crown was made to cause pain instead.

Every thorn pressed into his head turned a royal symbol into torture.

🌿 Platted means woven together

👑 A crown usually means honor

🩸 This crown was built to hurt

📖 Royalty is twisted into torment

## 🫡 Hail, King Of The Jews

Hail was the greeting Roman soldiers gave to Caesar himself.

Saying it to Jesus was a direct parody of that imperial salute.

The soldiers knew exactly what they were mocking.

They aimed the joke at Rome's own idea of power.

🫡 Hail was Caesar's own greeting

🎭 Soldiers are mocking Roman honor

⚔️ They know exactly what they mock

📖 Even the joke points at real kingship

## 🙇 Bowing Their Knees Worshipped Him

Bowing the knee was normally a sign of real worship.

Here the soldiers twist it into one more insult.

They kneel only to laugh, not to honor him.

Mockery borrows the shape of worship without any of its heart.

🙇 Bowing the knee usually means honor

😂 The soldiers kneel only to mock

🎭 Mockery borrows the shape of worship

📖 No honor lives inside this gesture

# Mark 15:21-24
# ✝️ On The Way To Golgotha
---
## 🧍 Compel One Simon A Cyrenian

Compel describes a legal power Roman soldiers had.

They could force any civilian to carry a load for them without warning.

Simon was from Cyrene, a city in North Africa with a large Jewish population.

He was likely just visiting Jerusalem for Passover when soldiers grabbed him.

🧍 Compel means forced by Roman law

🏛️ Soldiers could demand help from anyone

🌍 Cyrene was a city in North Africa

📖 An ordinary visitor is pulled into the story

## 👨‍👦 Father Of Alexander And Rufus

Mark names Simon's sons on purpose.

Naming them only makes sense if later readers already knew who they were.

This detail suggests Simon's family became known believers in the early church.

One forced errand on a hard road may have changed his whole family.

👨‍👦 Mark names Simon's own sons

⛪ The names suggest a known church family

🔁 This family turns up again later

📖 A forced errand becomes a lasting faith

## 💀 The Place Of A Skull

Golgotha is an Aramaic word that Mark translates for his readers.

It means the place of a skull.

Scholars are not fully certain why it carried that name.

Some think it described the shape of the hill, others a place regularly used for executions.

💀 Golgotha means the place of a skull

🗣️ Mark translates the word for his readers

⛰️ Some think the hill looked like one

📖 Either way, the name fit a death site

## 🍷 Wine Mingled With Myrrh

Myrrh was a bitter spice that could dull pain when mixed into wine.

Offering it to a condemned man was a small act of mercy some bystanders gave.

Jesus refuses to drink it.

He chooses to face the cross with a clear mind instead of a numbed one.

🍷 Myrrh could dull pain in wine

🤲 Some bystanders offered it out of mercy

🧠 Jesus refuses to be numbed

📖 He meets the cross fully aware

## 🎲 Parted His Garments, Casting Lots

Soldiers normally kept the clothing of anyone they executed.

Casting lots was a way of randomly dividing those items among themselves.

This detail matches an old line from Psalm twenty two almost word for word.

What looked like routine soldiers' business was fulfilling a promise written centuries earlier.

🎲 Casting lots divided his clothing randomly

🪖 Soldiers kept a condemned man's garments

📜 Psalm twenty two already described this

📖 Routine cruelty fulfilled an old promise

# Mark 15:25-28
# 📜 What The Cross Declared
---
## 🕒 The Third Hour

Jewish time counted hours starting at sunrise, near six in the morning.

The third hour lands close to nine in the morning.

Mark keeps marking the hours through this chapter on purpose.

Tracking the clock shows exactly how long this suffering lasted.

🕒 Jewish hours started near sunrise

🌅 The third hour was near nine

⏱️ Mark tracks the hours on purpose

📖 The clock measures real, lasting suffering

## 📜 The Superscription

A superscription was a sign Rome posted above a crucified criminal.

It listed the crime the person had supposedly committed.

This sign was meant to warn anyone else who might try to rebel.

Without meaning to, Rome posted the plain truth above his head.

📜 A superscription listed the crime

🚨 Rome used it to warn rebels

🪧 This one named him King of the Jews

📖 Rome accidentally wrote down the truth

## 🗡️ Two Thieves

The word translated thieves actually describes armed bandits or rebels.

It is the same kind of crime Barabbas was already guilty of.

These were not small time pickpockets.

Jesus is executed between two violent men, exactly where the world expected a criminal to hang.

🗡️ Thieves here means armed rebels

🔁 It matches Barabbas's own crime

⚔️ These were violent men, not pickpockets

📖 Jesus hangs where the world expected guilt

## 📚 Numbered With The Transgressors

This line quotes an old prophecy from Isaiah about God's suffering servant.

Isaiah said that servant would be counted among criminals, not kept apart from them.

Jesus is not only killed alongside criminals.

He is deliberately placed there to fulfill exactly what Isaiah had written.

📜 Isaiah foretold a servant among criminals

🔗 Jesus fulfills that old prophecy here

⛓️ He is grouped with criminals on purpose

📖 Prophecy and crucifixion match exactly

# Mark 15:29-32
# 😡 Reviled From Every Side
---
## 🙄 Wagging Their Heads

Wagging their heads was a common ancient gesture of scorn.

An old psalm already pictured enemies mocking God's suffering servant this exact way.

The crowd may not even realize they are acting out old scripture.

Their contempt fits a pattern written centuries before this day.

🙄 Head wagging showed open scorn

📜 An old psalm already pictured this

😶 The crowd does not notice the pattern

📖 Scripture is unfolding through their mockery

## 🏛️ Destroyest The Temple

This insult twists something Jesus once said about his own body.

Years earlier, he had compared his body to a temple.

His listeners back then misunderstood him as talking about the actual building.

That same old misunderstanding is now hurled back at him as a taunt.

🏛️ Jesus once called his body a temple

❌ Listeners misunderstood it as the building

🔁 That old confusion returns as an insult

📖 His true words outlast their mockery

## 😏 He Saved Others, Himself He Cannot Save

This insult is meant as sarcasm.

The chief priests say something completely true without realizing it.

Jesus cannot save himself precisely because he is busy saving everyone else.

Mockery accidentally speaks the deepest truth of the entire scene.

😏 The insult is meant as sarcasm

✅ The statement is actually true

🙏 Saving others cost him saving himself

📖 Mockery stumbles onto the real truth

## 👀 That We May See And Believe

The crowd demands a miracle before they will trust him.

They want proof delivered exactly on their own terms.

Real faith does not usually work that way.

God rarely performs on command just to satisfy a dare.

👀 The crowd demands proof first

🎯 They want it on their own terms

🙏 Faith rarely works by demand

📖 God is not auditioning for approval

## ⚔️ Crucified With Him Reviled Him

Both men dying beside Jesus start out mocking him too.

Even the condemned find someone lower to look down on.

Luke's gospel later records one of these two men changing his mind before the end.

Right now, in Mark's account, both voices are still against him.

⚔️ Both criminals mock Jesus at first

👇 Even the condemned look down on someone

🔄 Luke later records one man's change of heart

📖 Mark captures the darker moment first

# Mark 15:33-37
# 🌑 Darkness And A Loud Cry
---
## 🌑 Darkness Over The Whole Land

The sixth hour lands near noon, the brightest part of the day.

Darkness falling at noon was not a normal eclipse.

A solar eclipse cannot happen during Passover, since the moon is full at that time.

This darkness was something God caused on purpose.

🌑 Noon darkness was not natural

🌕 A full moon rules out an eclipse

⏳ It lasted three full hours

📖 God caused this darkness himself

## 🗣️ Eloi, Eloi, Lama Sabachthani

These words are Aramaic, the everyday language Jesus actually spoke.

Mark quickly translates them for readers who do not know that language.

The cry opens an old psalm that begins with the exact same question.

Jesus is praying scripture out loud in his final hour.

🗣️ The words are spoken in Aramaic

📜 They open a psalm about suffering

🙏 Jesus prays scripture in this final hour

➡️ Scripture carries him through forsaking

## ❓ Why Hast Thou Forsaken Me

This question quotes the opening line of Psalm twenty two exactly.

It captures a real and terrible sense of separation from God.

Jesus is carrying the full weight of human sin in this moment.

That weight creates the feeling of abandonment.

The Father never truly leaves him.

❓ The question quotes Psalm twenty two

⚖️ Jesus carries the full weight of sin

💔 That weight feels like abandonment

📖 The Father never actually leaves him

## 🗣️ He Calleth Elias

Some bystanders mishear Eloi as the name Elias.

Elias is the Greek form of the prophet Elijah's name.

Many Jews expected Elijah to appear again before major, climactic moments.

Their confusion shows how little they understood what was actually happening.

🗣️ Bystanders mishear Eloi as Elias

👳 Elias is the name for Elijah

📜 Many expected Elijah before big moments

📖 Their mistake misses what is really happening

## 🧽 Filled A Spunge Full Of Vinegar

Vinegar here means a sour wine Roman soldiers regularly drank on duty.

A sponge on a reed could reach a man already lifted high on a cross.

This was likely common soldier's drink, not a special cruelty.

Even an ordinary detail becomes part of this unforgettable scene.

🧽 Vinegar was a soldier's sour wine

🪄 A reed let the sponge reach him

🪖 This was likely ordinary soldier's drink

📖 Small details still shape the bigger scene

## 💨 Gave Up The Ghost

Gave up the ghost means Jesus died.

The wording suggests something handed over on purpose, not simply lost.

He cries out loudly first, which is unusual for someone about to die from exhaustion.

His death looks chosen, not merely endured.

💨 Gave up the ghost means he died

🎁 The wording suggests a willing release

📢 A loud cry is unusual right before death

📖 His death looks chosen, not forced

# Mark 15:38-41
# 😲 Torn Veil, True Confession
---
## 🧵 The Veil Of The Temple

The veil was a massive curtain inside the temple.

It separated the Holy of Holies, the space reserved only for God, from everyone else.

Only the high priest could pass through it, and only once a year.

This single thick curtain stood for the distance between God and sinful people.

🧵 The veil guarded the Holy of Holies

🚫 Only the high priest could pass through

📅 He entered just once a year

📖 The veil stood for distance from God

## ⬇️ From The Top To The Bottom

This tear starts at the top, not the bottom.

Human hands could never reach that high to begin a rip.

The direction shows this was God acting, not a person.

The barrier between God and people is torn open from heaven's side first.

⬇️ The tear begins at the top

🙅 No person could start it there

🙏 This points to God's own action

📖 Heaven opens the way, not a human

## 🪖 The Centurion

A centurion commanded about a hundred Roman soldiers.

He had likely overseen many executions before this one.

He knew exactly how crucified men usually died, slowly and silently.

Something about this death convinced him it was different from all the rest.

🪖 A centurion led about a hundred soldiers

⚔️ He had seen many executions before

👀 This death struck him as different

📖 Even a hardened soldier noticed something true

## 🙏 Truly This Man Was The Son Of God

A Roman soldier says this, not a religious leader or a disciple.

He is an outsider to the Jewish faith entirely.

His declaration arrives from the last place anyone would expect it.

The first clear confession after the cross comes from a Gentile, not an insider.

🙏 A Roman soldier says this, not a believer

🌍 He stood completely outside the Jewish faith

😲 The confession comes from an unexpected voice

📖 Faith appears first in an outsider

## 👭 Mary Magdalene

Mary Magdalene was one of several women who stayed close through the crucifixion.

Mark also names another Mary and a woman called Salome here.

Many more women watched from a distance as well.

These were not minor characters in the story.

👭 Mary Magdalene stayed close to the end

📛 Mark names two more women here too

👀 Many more watched from a distance

📖 These women were never minor characters

## 🚶 Followed Him, And Ministered Unto Him

Ministered here means these women supported Jesus with real practical help.

That likely included money, food, and other everyday provisions during his travels.

Most of the male disciples had already fled by this point in the story.

These women stayed faithful when it cost the most to stay.

🚶 Ministered means practical, ongoing support

💰 That support likely included money and food

🏃 Most male disciples had already fled

📖 Faithfulness here costs these women the most

# Mark 15:42-47
# ⚰️ A Borrowed Tomb
---
## 🕯️ The Preparation

The preparation was the Jewish name for Friday.

It was the day everything had to be ready before the sabbath began at sundown.

Work, including burial, had to be finished quickly.

This explains the rush to bury Jesus before evening fell.

🕯️ Preparation day was simply Friday

🌇 The sabbath began again at sundown

⏳ Everything had to be ready in time

📖 This explains the rush to bury him

## 🧑‍⚖️ Joseph Of Arimathaea

Joseph was a member of the very council that had condemned Jesus.

He is called an honourable counsellor, meaning he held real respect and influence.

Arimathaea was his hometown, a place whose exact location is still debated.

A secret believer inside the council finally steps into the open.

🧑‍⚖️ Joseph sat on the same council

🏅 He was respected and influential

🏘️ Arimathaea was simply his hometown

📖 A quiet believer finally acts openly

## 🙏 Waited For The Kingdom Of God

This phrase marks Joseph as someone who genuinely trusted God's promises.

Many on the council had already rejected Jesus completely.

Joseph had apparently stayed quietly hopeful the whole time.

His faith was real, even though it had stayed hidden until now.

🙏 Joseph genuinely trusted God's promises

🤐 He had kept his faith quiet

⏳ He had waited a long time

📖 Hidden faith becomes visible action

## 🚪 Went In Boldly Unto Pilate

Boldly signals real risk here, not simple confidence.

Asking for the body of an executed criminal could easily look like loyalty to a condemned man.

That request could cost Joseph his position or his safety.

He asks anyway, in broad daylight, with his name attached.

🚪 Boldly signals real personal risk

⚠️ The request could cost him dearly

👤 He asks publicly, under his own name

📖 Courage finally outweighs his fear

## 😮 Pilate Marvelled If He Were Already Dead

Crucified men often lingered in pain for a day or two before dying.

Jesus dies within only a few hours.

Pilate is surprised enough to personally double check with the centurion.

This detail quietly confirms exactly how real his death was.

😮 Crucifixion usually took much longer

⏱️ Jesus died within just a few hours

🧐 Pilate personally double checks the facts

📖 This confirms his death was completely real

## ⛰️ A Sepulchre Hewn Out Of A Rock

Hewn out of a rock means the tomb was carved directly into solid stone.

This style of burial was expensive and usually belonged to a wealthy family.

A large stone was then rolled across the entrance to seal it.

Joseph gave Jesus a wealthy man's grave instead of a criminal's pit.

⛰️ Hewn means carved directly into rock

💰 This style of tomb was costly

🪨 A stone sealed the entrance shut

📖 A criminal receives a rich man's grave

## 👀 Beheld Where He Was Laid

These women watch carefully and remember the exact location.

No one has to explain directions to them later.

This small detail sets up exactly how they find the right tomb in the next chapter.

Paying close attention now will matter enormously only a few days later.

👀 The women watch closely

🗺️ They remember the tomb's exact location

➡️ This sets up the next chapter

📖 Careful attention now pays off later
`.trim();

export const MARK_FIFTEEN_PERSONAL_SECTIONS = parseMarkFifteenRawNotes(MARK_FIFTEEN_RAW_NOTES);
