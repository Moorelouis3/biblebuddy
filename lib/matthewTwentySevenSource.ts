export type MatthewTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentySevenRawNotes(rawText: string): MatthewTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 27:${startVerse}` : `Matthew 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 16) {
    throw new Error("Expected 16 Matthew 27 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_SEVEN_RAW_NOTES = `# Matthew 27:1-2
# 👮 Jesus Delivered To Pilate
---
## 🏛️ All The Chief Priests And Elders Took Counsel

"Took counsel" means the leaders held a formal meeting to decide something together.

This was not a quick conversation in a hallway.

The whole Jewish ruling council gathered at daybreak to make the decision official.

They had already decided overnight that Jesus deserved death.

This morning meeting made that decision ready to act on.

🏛️ Took counsel means an official meeting
🌅 This happened early the next morning
⚖️ The council made last night's decision formal
📖 Religious leaders moved fast to finish this

## 🏺 Delivered Him To Pontius Pilate The Governor

The Jewish council could convict Jesus of a religious charge, but it could not legally execute anyone.

Rome reserved the death penalty for itself in every province it controlled.

Pontius Pilate was the Roman governor over Judea, sent to keep order and collect taxes.

Only Pilate could approve a death sentence, especially crucifixion, which was a Roman punishment.

That is why Jesus now moves from a religious trial to a political one.

🏺 Pontius Pilate governed Judea for Rome
⚖️ Rome alone could approve execution
✝️ Crucifixion was a Roman punishment
📖 The trial now turns political

# Matthew 27:3-5
# 💰 Judas Hangs Himself
---
## 😔 Judas Repented Himself

This word for "repented" describes regret and horror over what he had done.

It is not the same word used elsewhere for turning back to God in faith.

Judas feels crushing guilt, but there is no sign he turns to Jesus for mercy.

Guilt alone cannot undo a betrayal or heal a soul.

😔 Repented here means painful regret
🚪 It does not mean turning to God
💔 Guilt without faith leads nowhere
📖 Feeling sorry is not forgiveness

## 🪙 Brought Again The Thirty Pieces Of Silver

Thirty pieces of silver was the price Judas was paid to hand Jesus over, back in chapter twenty six.

The Old Testament law set that same amount as the price of a slave who was gored by an ox.

Judas tries to return the money, as if giving it back could erase the deed.

🪙 Thirty pieces was the betrayal price
🐂 It matched the legal price of a slave
😣 Returning money cannot undo a choice
📖 Some harm cannot be bought back

## 🩸 I Have Betrayed The Innocent Blood

"Innocent blood" is an Old Testament phrase for killing someone who did nothing deserving death.

Judas openly admits here that Jesus has done nothing wrong.

This is the clearest confession of Jesus's innocence spoken by anyone involved in his arrest.

It comes from the one man closest to the plot against him.

🩸 Innocent blood means an unjust killing
🗣️ Judas names Jesus as innocent
👥 This comes from inside the betrayal itself
📖 Even the betrayer could not deny the truth

## 🙄 What Is That To Us? See Thou To That

This phrase bluntly means "that is your problem, not ours."

The chief priests take Judas's money gladly but refuse to share any blame for what follows.

Their coldness exposes how little they actually cared about Judas once he had served his purpose.

🙄 The phrase means this is your problem
🧊 The priests show total coldness
🤝 They wanted Judas useful, not cared for
📖 People who use others often abandon them after

## 🏛️ He Cast Down The Pieces Of Silver In The Temple

The word used here points to the inner sanctuary, the sacred part of the temple building itself.

Judas does not quietly leave the coins with an official.

He throws them into the holy space, a dramatic and desperate gesture of rejection.

🏛️ He threw the coins into the sanctuary
😖 It was a desperate, public act
🚫 He wanted to be rid of the money
📖 Guilt drove him to a place he ignored

## ⚰️ He Went And Hanged Himself

This is the first place in the Bible that records how Judas died.

The book of Acts later adds a detail about his body falling after the hanging.

Many readers put the two accounts together as one event seen from two angles, not two separate deaths.

Judas ends his own life rather than seeking the forgiveness Jesus offered even from the cross.

⚰️ Judas took his own life
📜 Acts adds a detail about his fall
🧩 The accounts describe one death, not two
📖 He never sought the mercy Jesus still offered

# Matthew 27:6-10
# 🏺 The Potter's Field
---
## 🏦 Not Lawful To Put Them Into The Treasury

The temple treasury held gifts and offerings considered sacred to God.

Jewish law already taught that money earned through wrongdoing could not be given as a holy offering.

The priests suddenly become careful about religious rules, right after arranging an unjust death.

🏦 The treasury held sacred offerings
📜 Blood money could not be offered there
😬 The priests picked a strange moment for scruples
📖 Rule keeping without justice misses the point

## 🩸 The Price Of Blood

This phrase names money that was paid in exchange for someone's death.

The coins themselves were now seen as contaminated by what they had purchased.

The priests will not touch the money directly, but they will still use it.

🩸 Price of blood means payment for a killing
🙅 The coins felt too tainted to keep
🪙 They still found a use for the money
📖 Avoiding one sin does not erase another

## 🏺 The Potter's Field, To Bury Strangers In

A potter's field was land where clay had been dug out, leaving the ground poor for farming.

It was cheap to buy because almost nothing else could be done with it.

The priests used the betrayal money to turn this worthless plot into a graveyard.

It became a burial place for travelers and foreigners who died while visiting Jerusalem.

🏺 A potter's field was dug up, poor land
💸 It was cheap, useless for crops
⚰️ It became a cemetery for visitors
📖 Betrayal money bought a burial ground for strangers

## 📛 Called The Field Of Blood, Unto This Day

Matthew writes this account years after the events themselves took place.

"Unto this day" tells the reader that the field's grim nickname had stuck for decades.

Everyone in Jerusalem still knew the story behind that patch of ground.

📛 The field kept a lasting nickname
🗓️ Matthew wrote this years later
🏙️ Jerusalem residents still knew the story
📖 Some names outlive the people who gave them

## 📜 Fulfilled That Which Was Spoken By Jeremy The Prophet

Matthew names Jeremiah here, but the wording actually matches a passage in Zechariah about thirty pieces of silver.

Ancient scrolls sometimes grouped the prophets together under one well known name for reference.

Scholars have offered this and a few other honest explanations, but no single answer is certain.

What stays certain is that the detail about thirty pieces of silver really was written centuries earlier.

📜 The quote mainly matches Zechariah, not Jeremiah
🤔 Scholars still discuss why the name differs
🎯 The thirty pieces detail was genuinely foretold
📖 Truth does not depend on the name

## 🧑‍🏺 As The Lord Appointed Me

Centuries earlier, the prophet Zechariah was told to accept thirty pieces of silver as a symbolic insult.

He was then instructed to throw that very silver to a potter in the temple.

Matthew points out that Judas's betrayal money followed that exact same pattern, detail for detail.

🧑‍🏺 Zechariah once acted out this same scene
🪙 Thirty silver pieces appear in both stories
🎭 The potter and the temple both match
📖 A small detail came true exactly

# Matthew 27:11-14
# ⚖️ Jesus Before Pilate
---
## 👑 Art Thou The King Of The Jews?

Pilate does not ask about blasphemy, the charge the Jewish council had used against Jesus.

He asks about kingship, because claiming to be a king was treason against the Roman emperor.

This is the question that actually matters to a Roman governor holding the power of execution.

👑 Pilate asks about kingship, not blasphemy
🏛️ Claiming kingship counted as treason against Rome
⚖️ This question decides a Roman verdict
📖 The charge now fits Roman law

## 🗣️ Thou Sayest

This short reply was a common way of saying "yes, since you are the one saying it."

Jesus does not deny the title, but he also will not simply shout it as a political claim.

The answer is true, careful, and leaves Pilate to work out what kind of king Jesus means.

🗣️ Thou sayest means a careful yes
👑 Jesus does not deny being a king
🧩 He leaves the meaning for Pilate to weigh
📖 Truth can be stated without becoming a slogan

## 📜 How Many Things They Witness Against Thee?

In the previous chapter, the council had already used false witnesses whose stories did not even agree.

Pilate is puzzled that Jesus will not defend himself against charges that could easily be shown weak.

Silence in the face of flimsy accusations was unusual and hard for Pilate to understand.

📜 Earlier witnesses had already contradicted each other
🤷 Pilate expects some kind of defense
🤐 Jesus offers none
📖 Silence here was not weakness, it was restraint

## 🤐 He Answered Nothing

Jesus stays completely silent in the face of serious accusations.

Centuries earlier, Isaiah described a suffering servant who stayed silent like a sheep before those who shear it.

Many readers connect that image directly to this exact moment at Jesus's trial.

🤐 Jesus offers no defense at all
📖 Isaiah described a silent, suffering servant long before
🐑 The image is of quiet, willing suffering
➡️ This silence was a choice, not defeat

## 😲 The Governor Marvelled Greatly

Roman trials usually involved defendants pleading, arguing, or begging for their lives.

Pilate, who had likely seen many prisoners before, is struck by Jesus's calm and silence.

Even a pagan Roman official recognizes that something unusual is happening in front of him.

😲 Pilate is genuinely amazed
🗣️ Most defendants begged or argued
🧘 Jesus stayed calm instead
📖 Even an outsider sensed something was different here

# Matthew 27:15-19
# 🙅 Barabbas Offered
---
## 🎉 The Governor Was Wont To Release A Prisoner

Each year at the Passover feast, the Roman governor released one Jewish prisoner as a gesture of goodwill.

Passover itself celebrated Israel's deliverance from slavery in Egypt.

Releasing a prisoner at this exact feast carried an extra layer of meaning the crowd would have felt.

🎉 This release happened yearly at Passover
🕊️ It was meant as a gesture of goodwill
🗝️ Passover already celebrated freedom from bondage
📖 This custom made the choice feel loaded

## 🔪 A Notable Prisoner, Called Barabbas

Other Gospels describe Barabbas as a violent rebel involved in robbery and murder.

His name combines the Aramaic words for "son" and "father," so it literally means son of the father.

The crowd is about to choose a son of the father over the true Son of the Father.

🔪 Barabbas was a violent rebel
🗣️ His name means son of the father
😳 That name creates a sharp irony here
📖 The crowd will choose the wrong son

## ❓ Barabbas, Or Jesus Which Is Called Christ?

"Christ" is not Jesus's last name but a title meaning anointed one, or Messiah.

Pilate frames the choice in the starkest terms he can, hoping to shame the crowd into releasing Jesus.

He is gambling that no reasonable crowd would pick a known criminal over an unthreatening teacher.

❓ Christ means anointed one, or Messiah
🎯 Pilate frames the choice sharply on purpose
🤞 He hopes the crowd picks Jesus
📖 His gamble is about to fail

## 😒 For Envy They Had Delivered Him

Matthew tells the reader Pilate's own private read on the situation.

The real motive behind this entire ordeal was not a political threat but jealousy of Jesus's influence.

Envy dressed itself up as a legal and religious concern.

😒 Envy was the true motive
🎭 It hid behind religious and legal language
🧠 Pilate saw through it privately
📖 Jealousy can disguise itself as righteous concern

## 😴 His Wife Sent Unto Him In A Dream

Pilate's wife, a Roman woman with no connection to Jewish faith, receives a troubling dream about Jesus.

She urgently sends word to her husband in the middle of the public trial.

An outsider with no religious stake in the matter recognizes something that Jesus's own accusers refuse to see.

😴 Pilate's wife has a disturbing dream
✉️ She interrupts the trial to warn him
👀 An outsider sees what insiders deny
📖 Warning came from an unexpected direction

## ⚖️ Have Thou Nothing To Do With That Just Man

"Just" here means righteous or innocent, not merely fair.

This is a direct warning that Pilate is about to take part in condemning an innocent man.

Pilate hears this warning clearly and still does not act on it in time.

⚖️ Just man means an innocent man
🚨 This was a clear, direct warning
🙉 Pilate hears it but does not heed it
📖 A warning ignored is still a warning given

# Matthew 27:20-23
# 📣 The Crowd Chooses Barabbas
---
## 🗣️ The Chief Priests Persuaded The Multitude

Many in this same crowd had welcomed Jesus into Jerusalem with shouts of praise only days earlier.

Religious leaders now actively work the crowd, turning public opinion firmly against Jesus.

A crowd's mood can be shaped quickly by the people it trusts to lead it.

🗣️ Leaders actively turned the crowd
🌴 Days earlier this same city had praised Jesus
🔁 Public mood shifted fast under pressure
📖 Crowds often follow whoever shapes the message

## ✝️ Let Him Be Crucified

Crucifixion was a Roman execution method, usually reserved for slaves, rebels, and those without Roman citizenship.

It was designed to be slow, public, and shameful, meant as a warning to anyone watching.

The crowd demands the harshest death Rome had to offer.

✝️ Crucifixion was a Roman punishment
😖 It was slow and deliberately public
⚠️ It served as a warning to others
📖 The crowd asks for the harshest sentence available

## 🤷 Why, What Evil Hath He Done?

Pilate asks directly for an actual crime, and no one in the crowd answers with one.

Even the Roman governor, no friend to Jesus, cannot identify a real offense.

The demand for death is not built on evidence but on momentum.

🤷 Pilate asks for a real crime
🙊 No one gives him an answer
🌊 The demand runs on momentum, not evidence
📖 Even the judge found no real charge

## 📢 They Cried Out The More

The louder voices in the crowd drown out any room for Pilate's question.

Mob pressure can override careful thought, even for someone holding real legal power.

The noise itself becomes the argument.

📢 The crowd grows louder, not clearer
🌊 Momentum overtakes reasoning
👨‍⚖️ Even Pilate feels the pressure mount
📖 Volume replaced evidence in this moment

# Matthew 27:24-26
# 🧼 Pilate Washes His Hands
---
## 💧 He Took Water, And Washed His Hands

Washing hands in front of a crowd to deny bloodguilt was a recognized Jewish gesture, not a Roman one.

An older law described town elders washing their hands over an unsolved killing to declare their innocence.

Pilate borrows this gesture, speaking in the crowd's own symbolic language.

💧 Hand washing was a known gesture of innocence
📜 It echoes an older Jewish law
🗣️ Pilate uses the crowd's own symbol
📖 He borrows their language to excuse himself

## 🙅 I Am Innocent Of The Blood Of This Just Person

Pilate publicly declares he bears no guilt for what is about to happen.

Yet in the very same moment, he hands Jesus over to be executed.

Saying the words innocent does not actually remove his responsibility for the outcome.

🙅 Pilate declares himself innocent
✋ He still authorizes the execution
🎭 Words cannot undo an action
📖 Saying innocent does not make it true

## 🩸 His Blood Be On Us, And On Our Children

In the moment, this crowd takes responsibility for Jesus's death onto themselves.

This line describes the guilt of the people present at that trial, not every Jewish person for all time.

Later history twisted this verse to justify terrible violence against Jewish people, something the text itself never intended.

🩸 The crowd accepts blame for that moment
📍 It describes those present, not a whole people
😔 History has badly misused this verse
📖 The text never supports hating a whole people

## 🪢 He Had Scourged Jesus

Roman scourging used a whip with several leather strands, often fitted with pieces of bone or metal.

It was a standard, brutal step before crucifixion, meant to weaken a prisoner before execution.

The beating Jesus receives here happens before the cross is ever mentioned again in this chapter.

🪢 Scourging used a multi strand whip
💢 It was brutal by design
✝️ It came right before crucifixion
📖 He is weakened before carrying the cross

# Matthew 27:27-31
# 👑 Soldiers Mock Jesus
---
## 🏛️ The Whole Band Of Soldiers

"The common hall" refers to the Praetorium, the Roman governor's official residence and headquarters.

A "band" of soldiers was a Roman cohort, which could number several hundred men.

This was not two or three guards amusing themselves, but a large unit joining in together.

🏛️ The common hall was the governor's headquarters
🪖 A band meant hundreds of soldiers
👥 A whole unit joined the mockery
📖 This cruelty was shared, not isolated

## 👘 A Scarlet Robe

Roman officials and kings often wore robes of deep red or purple to show rank.

The soldiers dress Jesus in a scarlet robe as a cruel parody of royal clothing.

The goal was public humiliation disguised as a joke.

👘 Scarlet robes signaled royal or official rank
🎭 The soldiers turned the robe into mockery
😣 The goal was humiliation
📖 They dressed him as a fake king

## 👑 A Crown Of Thorns

Roman emperors and victors wore crowns made of laurel leaves as a sign of honor.

The soldiers twist together thorny branches instead, forcing them onto Jesus's head.

What should have honored a king instead caused him real, painful injury.

👑 Real crowns were made of laurel leaves
🌿 Soldiers used thorns instead
🩹 The crown caused real pain
📖 Honor was replaced with cruelty on purpose

## 🪃 A Reed In His Right Hand

A king's scepter was a symbol of ruling authority, usually made of gold or fine wood.

The soldiers place a simple reed, a thin hollow plant stem, into Jesus's hand instead.

The flimsy reed mocks the very idea of Jesus holding any real power.

🪃 A scepter normally showed royal authority
🌾 A reed replaced it here
😏 The weak object mocked his claim to rule
📖 Even his symbols of power became jokes

## 🙇 They Bowed The Knee Before Him

Bowing the knee was the normal way subjects honored a true king.

The soldiers perform this gesture here only to mock Jesus, not to honor him.

It is worship turned completely upside down into cruelty.

🙇 Bowing the knee normally showed honor
🎭 The soldiers twisted it into mockery
🔄 Worship was flipped into ridicule
📖 Honor became an act of scorn

## 😆 Hail, King Of The Jews!

This exact title will reappear soon, nailed above Jesus's head on the cross in verse thirty seven.

The soldiers mean this as a joke, never expecting it to be literally true.

What begins as mockery turns out to state the plain truth about who Jesus is.

😆 Soldiers shout this as a cruel joke
📌 The same title returns above the cross
🤯 Mockery accidentally states the truth
📖 Jesus really is the King they are mocking

## 🤮 They Spit Upon Him

Spitting on someone was considered one of the deepest insults a person could give in this culture.

Centuries earlier, Isaiah described a suffering servant who did not hide his face from shame and spitting.

Many readers connect that old prophecy directly to this moment.

🤮 Spitting was a severe public insult
📜 Isaiah described this kind of treatment long before
🔗 Many connect the prophecy to this exact scene
📖 Ancient scripture described this suffering in advance

## 🚶 Led Him Away To Crucify Him

The mocking inside the governor's headquarters ends, and the walk toward execution begins.

Everything that has happened so far was only preparation for what comes next.

The scene shifts from humiliation to the cross itself.

🚶 The mockery is now finished
➡️ The walk to execution begins
🎬 The scene shifts to the cross
📖 Humiliation was only the prelude to the cross

# Matthew 27:32-34
# 🪵 Simon Of Cyrene And Golgotha
---
## 🌍 A Man Of Cyrene, Simon By Name

Cyrene was a city in North Africa, in what is now Libya, with a notable Jewish community.

Simon was likely a Jewish pilgrim who had traveled a long distance to Jerusalem for Passover.

He becomes part of this story completely by accident, simply by being in the wrong place at the right time.

🌍 Cyrene was a city in North Africa
🕍 It had a sizable Jewish community
🚶 Simon was likely a visiting pilgrim
📖 An ordinary traveler stepped straight into this story

## 💪 Him They Compelled To Bear His Cross

Roman law allowed soldiers to force any bystander into sudden, unpaid labor without explanation.

The brutal scourging Jesus had just endured likely left him unable to carry the heavy crossbeam alone.

Simon had no choice in the matter, yet he ends up carrying the very weight Jesus could not.

💪 Roman law allowed forced, sudden labor
🩹 Jesus was weakened from the scourging
🪵 Simon carried the crossbeam instead
📖 An unwilling stranger shared in this burden

## 💀 Golgotha, That Is To Say, A Place Of A Skull

Golgotha is an Aramaic name, and Matthew translates it directly for his readers.

The name likely came from skull shaped terrain nearby, or from its grim reputation as a place of death.

Executions in this culture were deliberately held outside the city walls.

💀 Golgotha is Aramaic for place of a skull
⛰️ The name may describe the terrain
🏙️ Executions happened outside the city walls
📖 Even the location's name spoke of death

## 🍷 Vinegar To Drink Mingled With Gall

This bitter mixture was sometimes offered to slightly dull a prisoner's pain before execution.

Jesus tastes it, but then refuses to drink any further.

He chooses to face the full weight of what is coming rather than numbing himself to it.

🍷 This mixture could dull pain slightly
👅 Jesus only tastes it
🚫 He refuses to drink more
📖 He chose to feel it fully

# Matthew 27:35-38
# ✝️ The Crucifixion
---
## 🎲 Parted His Garments, Casting Lots

"Casting lots" was an ancient way of making a random choice, much like rolling dice today.

Soldiers divided Jesus's clothing among themselves this way, treating it as ordinary spoils of the job.

A psalm written centuries earlier had already described enemies dividing a sufferer's garments by lot.

🎲 Casting lots means a random draw
👕 Soldiers divided his clothing this way
📜 An old psalm foretold this detail
📖 A small detail matched scripture written long before

## 👀 Sitting Down They Watched Him There

Roman soldiers were assigned to stay at a crucifixion to prevent any rescue attempt.

Their job was simply to confirm that death actually occurred.

For these soldiers, this horrifying scene was ordinary, routine duty.

👀 Guards stayed to prevent any rescue
✅ Their job was to confirm the death
😐 For them, this was routine duty
📖 Cruelty had become routine for these men

## 📜 This Is Jesus The King Of The Jews

Roman executions commonly included a sign, called a titulus, stating the prisoner's crime for all to read.

The sign was meant to mock Jesus and warn anyone who might think of challenging Rome.

Meant as ridicule, the sign ends up stating the plain and literal truth.

📜 Roman crosses displayed a written charge
🎯 This sign was meant as mockery and warning
👑 It names Jesus a king
📖 The joke accidentally told the truth

## ⚔️ Two Thieves Crucified With Him

Other Gospels suggest these two men may have been armed rebels rather than simple robbers.

Centuries earlier, Isaiah had described God's suffering servant being counted among criminals.

Jesus is executed in the exact company that old prophecy had already described.

⚔️ These men were likely armed rebels
📜 Isaiah foretold being counted with criminals
✝️ Jesus is placed among lawbreakers
📖 Prophecy and this moment line up exactly

# Matthew 27:39-44
# 😠 Mockery At The Cross
---
## 🙄 Wagging Their Heads

Shaking or wagging the head at someone was a well known gesture of scorn in this culture.

Old psalms describe enemies wagging their heads at a suffering, mocked sufferer.

The crowd's taunting gestures echo language written long before this moment happened.

🙄 Wagging the head showed open scorn
📜 Old psalms describe this same gesture
🔁 The crowd repeats an ancient pattern of mockery
📖 Scripture had already described this kind of scorn

## 🏛️ Thou That Destroyest The Temple, Save Thyself

This insult twists words from Jesus's trial, where witnesses had misquoted something he once said.

The crowd throws the distorted charge back at him now as a taunt.

Without meaning to, they point straight at his real resurrection only three days away.

🏛️ This repeats a twisted trial accusation
🎯 It is thrown back as a public taunt
📆 It accidentally points to the resurrection
📖 Mockery pointed straight at the resurrection

## 🤲 He Saved Others

The crowd admits, even while mocking him, that Jesus truly had saved and healed other people.

This backhanded compliment confirms his reputation even in the middle of their cruelty.

Their own words end up praising the very man they are trying to destroy.

🤲 Even mockers admit he saved others
👐 His reputation shows through their insult
😒 Truth leaks out of their own mouths
📖 Even an insult can admit a real fact

## ✋ Himself He Cannot Save

This taunt carries a bitter irony the crowd does not understand.

It was precisely because Jesus refused to save himself that he could save anyone else at all.

The very thing mocked here is the reason the mockers could ever be forgiven.

✋ The crowd sees only apparent weakness
🔄 His refusal to save himself was the point
🎁 That refusal made saving others possible
📖 Their insult names the reason for the cross

## ⬇️ Let Him Now Come Down From The Cross

The crowd demands a spectacle as proof, instead of trusting what Jesus had already shown them.

Years earlier, in the wilderness, Satan had tempted Jesus with a similar shortcut around suffering.

Jesus refuses the shortcut both times, for the same reason.

⬇️ The crowd wants a dramatic sign
🏜️ Satan once offered Jesus a similar shortcut
🚫 Jesus refuses the easy way again
📖 Real faith does not wait for a spectacle

## 🙏 He Trusted In God

An old psalm had already put almost these exact words into the mouths of a sufferer's enemies.

The crowd does not realize they are quoting prophetic scripture while mocking Jesus.

Scripture is being fulfilled in the very words meant to mock it.

🙏 This line echoes an old psalm
🗣️ The crowd repeats it without knowing
😳 They are quoting scripture while mocking its subject
📖 Even their mockery fulfilled what was written

## 📣 For He Said, I Am The Son Of God

This directly recalls Jesus's own testimony at his trial before the council in the previous chapter.

The religious leaders throw his own words back at him now as an insult.

What he stated plainly under oath becomes the basis of their ridicule.

📣 This recalls his trial testimony
⚖️ His own words are used against him
🔁 Testimony becomes taunting
📖 Truth spoken plainly was twisted into mockery

## 🦷 Cast The Same In His Teeth

This old idiom simply means to throw insults at someone, or taunt them harshly.

Even the two criminals dying beside Jesus join in the mockery.

Luke's Gospel later records one of these same men changing his mind before the end, a detail not included here.

🦷 The idiom means to throw harsh insults
⚔️ Even the dying men beside him mock him
🔄 Luke records one of them changing his mind
📖 Even in agony, some still chose cruelty

# Matthew 27:45-50
# 🌑 Darkness And Jesus's Death
---
## 🌑 Darkness Over All The Land

The sixth hour was midday, and the ninth hour was midafternoon, counted from sunrise.

Passover always fell during a full moon, when a natural solar eclipse was not possible.

An old prophet had described the sun going down at noon as a sign of mourning and judgment.

🌑 Sixth to ninth hour means noon to midafternoon
🌕 A natural eclipse could not happen at Passover
📜 Prophets described darkness as a sign of judgment
📖 This darkness was a sign, not a coincidence

## 🗣️ Eli, Eli, Lama Sabachthani?

These words are Aramaic, the everyday language Jesus and his followers actually spoke.

Jesus is quoting the opening line of an old psalm that begins in deep anguish.

That same psalm moves from suffering all the way to eventual victory and praise.

🗣️ These words are Aramaic, not Hebrew
📜 Jesus quotes the start of an old psalm
🔄 That psalm moves from pain toward victory
📖 Jesus prays scripture even in his final anguish

## 😭 My God, My God, Why Hast Thou Forsaken Me?

Many understand this cry as Jesus bearing the full weight of human sin in this moment.

That burden brought with it a real sense of separation from his Father.

Scripture does not spell out every detail of what happened between them in this instant.

😭 This cry shows real, deep anguish
⚖️ Many connect it to bearing human sin
🤐 Scripture does not explain every detail here
📖 The cost of the cross included this moment

## 👂 This Man Calleth For Elias

In Aramaic, the word for "my God" sounds similar to the name Elijah, called Elias here.

Some bystanders genuinely misheard what Jesus said in the noise and confusion.

Many Jewish people expected the prophet Elijah to return just before the Messiah arrived.

👂 Eli sounded like the name Elijah
😕 Some bystanders simply misheard him
📜 Many expected Elijah before the Messiah
📖 Confusion mixed with real prophetic expectation

## 🧽 Filled It With Vinegar, And Gave Him To Drink

This sour wine was a common, cheap drink that ordinary Roman soldiers kept on hand.

It differs from the earlier bitter mixture offered back in verse thirty four.

An old psalm had already described someone giving a suffering man vinegar to drink.

🧽 This was a common soldier's drink
🔄 It differs from the earlier bitter mixture
📜 An old psalm foretold this detail
📖 Another small detail matched scripture written long before

## 👋 Let Us See Whether Elias Will Come To Save Him

This comment pretends to be curious, but it is really one more taunt.

The crowd still wants a dramatic rescue instead of simply trusting what they had already seen.

Even at the very end, they demand a show instead of faith.

👋 This sounds curious but is mockery
🎭 It still demands a spectacle
🙈 They still refuse to simply trust him
📖 Even his final moments were met with taunts

## 🕊️ Yielded Up The Ghost

This KJV phrase simply means that Jesus died.

Death on a cross usually came slowly, from exhaustion, once a victim could no longer push up to breathe.

Jesus instead cries out loudly right before he dies, an unusual strength for that point in the ordeal.

The detail suggests Jesus gave up his life by choice rather than simply having it taken from him.

🕊️ Yielded up the ghost means he died
😮‍💨 Crucifixion deaths usually came from slow exhaustion
💥 Jesus cried out loudly just before dying
📖 He laid down his life freely

# Matthew 27:51-54
# ⛰️ The Veil Is Torn
---
## 🧵 The Veil Of The Temple Was Rent In Twain

This massive curtain separated the Holy Place from the Most Holy Place inside the temple.

Only the high priest could pass beyond it, and only once each year.

The tear ran from the top downward, a detail that points to God himself as the cause.

🧵 The veil guarded the Most Holy Place
🕍 Only the high priest entered, once a year
⬇️ It tore from the top down
📖 God himself opened the way to his presence

## 🌋 The Earth Did Quake, And The Rocks Rent

An earthquake accompanies the moment of Jesus's death.

Throughout scripture, earthquakes often mark a moment of God acting directly in the world.

Creation itself responds visibly to what has just happened on the cross.

🌋 An earthquake marks this moment
📜 Earthquakes often signal God acting directly
🌍 Creation itself reacts here
📖 Even the ground responded to the cross

## ⚰️ The Graves Were Opened

Tombs near Jerusalem are physically broken open at this same moment.

This detail appears only in Matthew's account among all four Gospels.

It is treated honestly here as a real but unusually described event, not fully explained by the text.

⚰️ Nearby tombs are opened
📖 Only Matthew records this detail
🤔 The text leaves many details unexplained
➡️ Even the dead are affected by this moment

## 🙆 Many Bodies Of The Saints Which Slept Arose

"Slept" is a common biblical way of describing death without saying the harsher word directly.

"Saints" here means faithful believers who had already died before this moment.

These risen people wait before appearing publicly, a detail explained in the very next verse.

🙆 Slept means died, in gentle language
🙏 Saints means faithful believers who had died
⏳ They wait before appearing publicly
📖 Jesus's death briefly reaches even the grave

## 🏙️ Appeared Unto Many In The Holy City

These risen believers do not appear until after Jesus's own resurrection, not immediately.

That order matters, since Jesus himself is meant to be the first to rise to new life.

"The holy city" names Jerusalem by its sacred reputation among God's people.

🏙️ The holy city means Jerusalem
⏱️ They waited until after Jesus rose
🥇 Jesus remains first in this resurrection order
📖 Even a miracle followed God's intended order

## 🪖 The Centurion Feared Greatly

A centurion commanded about a hundred Roman soldiers and had likely overseen this entire execution.

Centurions witnessed crucifixions constantly and were trained to remain unmoved by them.

What this Roman officer sees here breaks through that hardened routine completely.

🪖 A centurion led about a hundred soldiers
😐 Centurions were trained to stay unmoved
😨 This moment broke through that training
📖 Even a hardened soldier was shaken here

## 🙌 Truly This Was The Son Of God

A Roman soldier, with no reason to favor Jesus, reaches this striking conclusion on his own.

It is an outsider, not a religious insider, who speaks this confession aloud.

The Gospel's central claim about Jesus is confirmed here by one of the very men who crucified him.

🙌 A Roman soldier reaches this conclusion
🌍 An outsider, not an insider, says it
🔄 Even his executioner confirms who he is
📖 Truth broke through where it was least expected

# Matthew 27:55-56
# 👀 Women Watching From Afar
---
## 👀 Beholding Afar Off

Most of Jesus's male disciples had already fled when he was arrested, back in chapter twenty six.

These women remain, even if from a careful distance, when almost everyone else has scattered.

Their presence here shows quiet courage at the very moment courage was hardest to find.

👀 They watched from a careful distance
🏃 Most male disciples had already fled
💪 These women stayed anyway
📖 Quiet courage showed up when it was hardest

## 🤝 Ministering Unto Him

"Ministering" describes practical, ongoing support, not just occasional kindness.

These women had been providing food, resources, and care throughout Jesus's entire ministry.

Their support continues all the way to this final, painful scene.

🤝 Ministering means steady, practical support
🍞 They provided food and resources
🛤️ Their support lasted his whole ministry
📖 Faithful support does not quit early

## 🕊️ Mary Magdalene

"Magdalene" identifies her hometown, Magdala, a town on the Sea of Galilee.

This detail distinguishes her clearly from Mary, the mother of Jesus, and from other women named Mary.

Elsewhere in the Gospels, Jesus had freed her from a severe spiritual affliction.

🕊️ Magdalene names her hometown, Magdala
👩 She is a different Mary from Jesus's mother
🔓 Jesus had freed her from deep affliction
📖 Her whole life had already changed

## 👪 Mary The Mother Of James And Joses

This is a different Mary from Mary Magdalene, and readers should not confuse the two.

"The mother of Zebedee's children" names the mother of the disciples James and John.

That same mother had once asked Jesus for places of highest honor for her sons.

👪 This Mary is not Mary Magdalene
👦 Zebedee's children were James and John
🙏 She once asked Jesus to honor her sons
📖 These families stayed faithful from start to finish

# Matthew 27:57-61
# ⚰️ Burial In Joseph's Tomb
---
## 💰 A Rich Man Of Arimathaea, Named Joseph

Arimathaea was a town, likely somewhere in Judea, though its exact location is debated today.

Other Gospels describe Joseph as a member of the Jewish ruling council who had not agreed with its plot.

He had likely followed Jesus quietly until now, but he steps forward publicly at great personal risk.

💰 Arimathaea was likely a town in Judea
🏛️ Joseph belonged to the ruling council
🤫 He had followed Jesus quietly until now
📖 He finally acted in the open

## 🙇 He Begged The Body Of Jesus

Rome often left the bodies of crucified criminals exposed, or disposed of them without ceremony.

Asking for the body at all required real courage, since it openly tied Joseph to a condemned man.

Pilate's agreement allows Jesus a proper burial that would not have happened otherwise.

🙇 Crucified bodies were often left exposed
😬 Asking for it was a risky, open request
🤝 Pilate agrees to release the body
📖 Courage made a proper burial possible

## 🧻 Wrapped In A Clean Linen Cloth

Jewish burial customs called for wrapping a body carefully as an act of honor and respect.

The word "clean" signals genuine care, not simply a hurried disposal.

This was done quickly, since the Sabbath was approaching and work would soon be forbidden.

🧻 Wrapping showed honor for the dead
✨ Clean signals real care, not haste alone
⏳ The Sabbath was approaching fast
📖 Even a rushed burial was done with respect

## 🪨 His Own New Tomb, Hewn Out In The Rock

Tombs in this period were often caves carved into rock, sometimes used for generations of one family.

This particular tomb was new, never used before, and belonged personally to Joseph himself.

Giving up his own tomb was a costly, deeply personal gift.

🪨 Tombs were caves carved from rock
🆕 This tomb was brand new and unused
🎁 It belonged personally to Joseph
📖 He gave his own resting place to Jesus

## 🚪 A Great Stone To The Door Of The Sepulchre

A large, heavy stone was rolled across a groove to seal a tomb's entrance.

Moving a stone this size required real effort and usually more than one person.

This stone becomes important again very soon, when someone needs to move it a second time.

🚪 A heavy stone sealed the entrance
💪 Moving it took real effort
🔮 This stone matters again very soon
📖 The story is not finished at this stone

## 👁️ Sitting Over Against The Sepulchre

Mary Magdalene and the other Mary stay behind after everyone else involved in the burial has gone.

They do not leave once the task is finished, as others might have.

Their quiet watching here sets up their role as the very first witnesses of what comes next.

👁️ The women stay after the men leave
⏳ They do not rush away
🥇 This sets them up as first witnesses
📖 Faithful watching comes before faithful witness

# Matthew 27:62-66
# 🪖 The Guard At The Tomb
---
## 📅 The Day Of The Preparation

"Preparation" named the day before the Sabbath, when food and rest were readied in advance.

This scene actually happens on the Sabbath itself, a day of rest for religious leaders.

Their urgency to secure the tomb overrides their own usual Sabbath rules.

📅 Preparation was the day before the Sabbath
🛑 This scene happens on the Sabbath itself
⚡ Urgency overrode their own normal rules
📖 Fear can push people past their own standards

## 🔁 After Three Days I Will Rise Again

Jesus had predicted his own resurrection clearly, more than once, earlier in this Gospel.

Strangely, it is his opponents who remember this prediction, not his own grieving followers.

The people least likely to believe it are the ones taking it most seriously right now.

🔁 Jesus had predicted this before, repeatedly
🙉 His own followers seem to have missed it
👂 His opponents remember it instead
📖 Belief showed up in an unexpected place first

## 🕵️ Lest His Disciples Steal Him Away

The religious leaders fear a staged resurrection, a fraud they want to prevent in advance.

They plan carefully for a scenario they expect, rather than one that is actually about to happen.

Their preparation is aimed at the wrong threat entirely.

🕵️ They fear a staged, fake resurrection
📋 They plan for theft, not truth
🎯 Their plan targets the wrong threat
📖 Careful planning cannot stop what is actually coming

## ⚠️ The Last Error Worse Than The First

"Error" here means a false claim or deception, not a simple mistake.

The leaders fear a resurrection rumor more than they ever feared Jesus's original ministry.

They treat a story about rising from the dead as a greater danger than the man himself had been.

⚠️ Error means a deceptive, false claim
😨 They fear this more than his ministry
📈 The perceived danger has grown, not shrunk
📖 They sense something bigger than they can control

## 🪖 Ye Have A Watch

Pilate grants the religious leaders their own security detail to guard the tomb.

This detail may have been temple guards rather than Roman soldiers, though the text leaves this open.

Either way, Pilate hands them the official authority to secure the site themselves.

🪖 Pilate grants a guard detail
🤔 The exact identity of the guards is debated
📜 Pilate gives them official authority
📖 Human authority is about to meet its limit

## 🔒 Sealing The Stone, And Setting A Watch

A Roman seal used cord and wax or clay, stamped with an official mark no one dared break.

Breaking that seal without authorization carried serious Roman punishment.

Soldiers are then physically posted to guard the tomb around the clock.

Every precaution available is used, and none of it will be enough to stop what happens next.

🔒 A Roman seal threatened serious punishment
🪖 Guards were posted around the clock
🛡️ Every available precaution was taken
📖 No human seal could hold back the resurrection
`.trim();

export const MATTHEW_TWENTY_SEVEN_PERSONAL_SECTIONS = parseMatthewTwentySevenRawNotes(MATTHEW_TWENTY_SEVEN_RAW_NOTES);
