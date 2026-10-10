export type LukeTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwentyThreeRawNotes(rawText: string): LukeTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 23:${startVerse}` : `Luke 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Luke 23 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWENTY_THREE_RAW_NOTES = `# Luke 23:1-5
# 😠 Accused Before Pilate
---
## ⚖️ The Whole Multitude Of Them Arose

"The whole multitude" refers to the chief priests, elders, and scribes from the council in chapter twenty two.

This was not an unruly mob but the official religious leadership of Israel.

Pilate held the only power in Jerusalem to legally order an execution.

So the council now had to convince a Roman governor, not just themselves, that Jesus deserved death.

⚖️ The multitude means the Jewish council

👮 Only Pilate could order an execution

🏛️ The council needed Roman approval

➡️ Their private verdict now needed public backing

## 🗣️ We Found This Fellow Perverting The Nation

"Perverting" means twisting something good into something harmful and dangerous.

The charge claims Jesus was turning the whole nation away from truth and order.

This was a political accusation, not the religious charge of blasphemy used at Jesus's own trial.

Rome cared nothing about blasphemy but took any threat to public order seriously.

🗣️ Perverting means twisting something harmful

🏛️ This charge targeted Roman concerns

⚖️ Blasphemy would not interest Pilate

➡️ The accusers changed their argument for Rome

## 💰 Forbidding To Give Tribute To Caesar

This accusation was simply false, and the council almost certainly knew it.

Earlier in Luke, Jesus had actually told people to pay their taxes to Caesar.

"Tribute" means the tax every conquered people paid to Rome as a sign of submission.

Claiming Jesus opposed this tax was the fastest way to make Pilate see him as a threat.

💰 Tribute means a tax paid to Rome

🗣️ Jesus had told people to pay it

🎭 The charge was false on its face

➡️ It was designed to alarm Pilate

## 👑 Art Thou The King Of The Jews? Thou Sayest It

Pilate asks the one question that actually matters to Rome, a rival king.

Jesus does not deny the title, but he also does not explain what kind of king he is.

"Thou sayest it" is an honest yes spoken in a way Pilate could not easily use against him.

Jesus lets the truth stand even while knowing exactly how dangerous it sounded in a Roman court.

👑 King was the charge Rome cared about

✅ Thou sayest it means a plain yes

🤐 Jesus did not explain the claim further

📖 Truth stood even at great cost

## ⚖️ I Find No Fault In This Man

Pilate, a trained Roman official, examines the evidence and reaches a clear verdict.

He finds nothing in Roman law that makes Jesus guilty of any crime.

This is the first of several times in this chapter that Pilate declares Jesus innocent.

A Roman governor, with no reason to protect Jesus, could not find a single real charge.

⚖️ Pilate declares Jesus legally innocent

🔁 This verdict repeats several times

👮 Rome found no real crime

📖 Even the judge saw no guilt

## 🔥 He Stirreth Up The People...From Galilee

"Stirreth up" means causing unrest or rebellion among a crowd.

The accusers now widen the charge to cover Jesus's entire ministry, not one incident.

Mentioning Galilee was not random, since Rome already saw that region as a center of rebellion.

Naming Jesus's whole territory of ministry made the accusation sound bigger than it actually was.

🔥 Stirreth up means causing unrest

🗺️ Galilee had a reputation for rebellion

📈 The charge grew bigger here

➡️ Exaggeration replaced a weak case

# Luke 23:6-12
# 🦊 Before Herod
---
## 🗺️ He Belonged Unto Herod's Jurisdiction

"Jurisdiction" means the specific area and people a ruler had legal authority over.

Herod Antipas ruled Galilee and Perea, while Pilate governed Judea itself.

Since Jesus was from Galilee, Pilate saw a chance to hand this difficult case to someone else.

Passing the decision along let Pilate avoid responsibility without openly releasing a man his accusers wanted dead.

🗺️ Jurisdiction means a ruler's legal territory

👑 Herod ruled Galilee, not Judea

🙅 Pilate tried to avoid the decision

➡️ Responsibility got passed along instead

## 😄 When Herod Saw Jesus, He Was Exceeding Glad

This is the same Herod Antipas who had ordered John the Baptist beheaded.

Luke had already mentioned earlier that Herod wanted to see Jesus, out of curiosity mixed with guilt.

Herod's gladness here was entertainment, not respect or genuine interest in the truth.

A man who should have feared facing Jesus instead treated the moment like a show.

😄 Herod wanted entertainment, not truth

🗡️ This Herod had killed John the Baptist

🔁 Luke already mentioned Herod's curiosity

➡️ Curiosity here was shallow, not sincere

## ✨ He Hoped To Have Seen Some Miracle Done By Him

This does not mean Herod wanted to believe in Jesus as the Messiah.

He wanted a spectacle, something amazing to watch like a traveling performer.

Jesus refuses to perform on command for anyone seeking a show instead of the truth.

Real faith was never what Herod was actually asking for.

✨ Herod wanted a show, not faith

🎭 He treated Jesus like entertainment

🙅 Jesus refused to perform on demand

📖 A miracle was never the real need

## 🤐 He Answered Him Nothing

Jesus had plenty to say to Pilate but offers Herod complete silence.

This fulfills an old prophecy in Isaiah about a suffering servant who would not open his mouth.

Silence here was not fear but a refusal to feed Herod's shallow curiosity.

Some people do not deserve an answer, and Jesus knew exactly which one Herod was.

🤐 Jesus stayed completely silent here

📜 This echoes Isaiah's suffering servant

🚫 Herod's curiosity got no answer

📖 Silence itself was Jesus's answer

## 👘 Arrayed Him In A Gorgeous Robe

Soldiers often mocked claims to royalty by dressing a prisoner up like a fake king.

"Gorgeous" here means flashy and showy, not elegant or dignified.

Herod's men turned Jesus's real kingship into a cruel joke for their own amusement.

Mockery, not justice, became the only verdict Herod was willing to give.

👘 Gorgeous means flashy and showy

🎭 This robe mocked his kingship

😈 Soldiers turned justice into a joke

➡️ Herod gave mockery instead of judgment

## 🤝 The Same Day Pilate And Herod Were Made Friends

These two rulers had been enemies before this day, likely over territory or past insults.

Passing Jesus back and forth gave both men a shared project that cost them nothing.

Shared cruelty, not shared virtue, is what brought these two men together.

Jesus's trial became the strange occasion that patched up an old political feud.

🤝 Pilate and Herod had been enemies

🔄 Sending Jesus back and forth united them

😔 Shared cruelty caused their friendship

📖 Jesus's trial mended an old feud

## 📢 The Chief Priests And Scribes Stood And Vehemently Accused Him

"Vehemently" means with intense, forceful energy, not a calm or measured statement.

The same accusers who followed Jesus to Pilate now follow him to Herod as well.

Their persistence shows how determined they were to see this case end in death.

A calm review of evidence was never what these accusers actually wanted.

📢 Vehemently means forceful and intense

🔁 The same accusers followed to Herod

🎯 They wanted a death sentence, not a trial

➡️ Persistence replaced actual evidence

# Luke 23:13-19
# ⚖️ No Fault, Yet No Freedom
---
## 🏛️ Pilate...Called Together The Chief Priests And The Rulers And The People

This was not a private meeting but a public announcement, said in front of everyone.

Pilate gathers the exact same crowd that had brought the original accusation against Jesus.

By speaking publicly, Pilate puts his verdict on the record for everyone present to hear.

What Pilate says next could not later be denied or quietly reversed.

🏛️ Pilate spoke to the whole crowd

👥 The same accusers were gathered again

📜 His verdict became public record

➡️ Nothing here could be quietly undone

## ⚖️ Having Examined Him Before You, Have Found No Fault In This Man

Pilate repeats the exact same verdict he already gave earlier in this chapter.

"Examined" means Pilate personally investigated the charges rather than simply taking the accusers' word for it.

Two separate Roman hearings, by two different rulers, reached the same conclusion of innocence.

Rome's own justice system kept clearing Jesus while the crowd kept demanding his death.

⚖️ This is Pilate's second declaration

🔍 Examined means a real investigation happened

👥 Two rulers both found him innocent

📖 Rome's system kept clearing Jesus

## 🙅 No, Nor Yet Herod

Pilate now adds Herod's verdict to his own, strengthening the case for innocence.

Herod had every reason to please the Jewish leaders and still found nothing worth death.

Two rulers, two different courts, and still not one real crime against Jesus.

The accusation was failing everywhere it was actually tested.

🙅 Herod also found no real crime

⚖️ Two separate courts agreed on this

🔁 The charge failed every real test

➡️ Innocence kept being confirmed, not denied

## 😣 I Will Therefore Chastise Him, And Release Him

"Chastise" means a painful physical beating, likely a Roman scourging with a whip.

Pilate proposes punishing an innocent man simply to satisfy an angry crowd.

This compromise tries to give the accusers some suffering without an actual execution.

Even here, true justice was already being traded away for political convenience.

😣 Chastise means a severe beating

⚖️ This punished an innocent man

🤝 Pilate tried to please the crowd

➡️ Justice was already being compromised

## 🎉 Of Necessity He Must Release One Unto Them At The Feast

Each year during Passover, Roman governors released one Jewish prisoner as a goodwill gesture.

This custom is not recorded outside the Gospels, but it fits how Rome often managed occupied peoples.

The timing meant Pilate now had to let the crowd choose between two very different prisoners.

A tradition meant to show mercy instead became the trap that doomed Jesus.

🎉 One prisoner was freed each Passover

🤝 Rome used this to calm tensions

⚖️ The crowd now had to choose

📖 Mercy's custom became a trap

## 😡 Away With This Man, And Release Unto Us Barabbas

"Barabbas" means son of the father, an ironic name given what happens next.

Verse nineteen explains that Barabbas had committed sedition and murder, real and violent crimes.

The crowd chooses a known killer over a man three separate hearings found innocent.

An actual criminal walked free while an innocent man stayed condemned.

😡 The crowd demanded Barabbas instead

👤 Barabbas means son of the father

🔪 Barabbas was a real killer

➡️ A guilty man was chosen over Jesus

## 🔪 For A Certain Sedition...And For Murder

"Sedition" means organized rebellion or violent uprising against the ruling government.

Barabbas had committed the very crime Jesus was falsely accused of in verse two.

Rome considered sedition and murder among the most serious crimes a prisoner could commit.

The choice offered to the crowd could not have made the contrast any sharper.

🔪 Sedition means violent rebellion

🎭 Jesus was falsely accused of this

⚖️ Barabbas was actually guilty of it

📖 The contrast could not be sharper

# Luke 23:20-25
# 😡 Crucify Him
---
## 🗣️ Pilate...Willing To Release Jesus, Spake Again To Them

Pilate has not given up on releasing Jesus, even after the crowd's demand for Barabbas.

He tries reasoning with the crowd a second time instead of simply giving in.

A Roman governor, who answered to no one in this province but Rome itself, still hesitates.

Even real political power can feel powerless against a crowd determined to get its way.

🗣️ Pilate tried reasoning a second time

🙅 He still wanted Jesus released

👮 He held real power here

➡️ Power still felt stuck against the crowd

## 📣 Crucify Him, Crucify Him

"Crucify" means execution by nailing or binding a person to a cross to die slowly.

The crowd repeats the same demand twice in a row, almost like a chant.

This was one of the most painful and shameful deaths the Roman world knew.

What began as a political accusation now openly demands the cruelest possible death.

📣 Crucify means death on a cross

🔁 The demand repeats twice, like a chant

😣 This was one of Rome's cruelest deaths

➡️ The demand had grown openly brutal

## 🔢 He Said Unto Them The Third Time

This is Pilate's third public declaration that he finds no cause of death in Jesus.

Repeating something three times in this culture signaled real emphasis and seriousness.

Three separate attempts by the actual judge still could not change the crowd's demand.

The repetition makes the final outcome look even more clearly unjust.

🔢 This is Pilate's third declaration

📢 Repeating three times showed real emphasis

⚖️ The verdict never actually changed

📖 Unjust outcomes do not need real evidence

## 📢 They Were Instant With Loud Voices

"Instant" here means urgent and persistent, not quick or sudden.

The crowd does not simply ask once but keeps pressing with growing volume and intensity.

Loud, repeated pressure began to work on Pilate in a way calm argument never could.

Mob pressure, not evidence, was steadily becoming the deciding factor in this trial.

📢 Instant means urgent and persistent

📈 Their pressure kept building louder

⚖️ Volume replaced actual evidence

➡️ Mob pressure was winning the trial

## 📜 Pilate Gave Sentence That It Should Be As They Required

This is the exact moment Pilate officially surrenders his own verdict to the crowd's demand.

He had declared Jesus innocent three times and now sentences him anyway.

A Roman governor's job was to enforce justice, not simply ratify popular anger.

Pilate chose his own comfort over the innocence he had already recognized.

📜 Pilate officially surrendered his verdict

⚖️ He had called Jesus innocent three times

😔 He chose comfort over justice

📖 Known innocence still led to a sentence

## 🔄 He Delivered Jesus To Their Will

This does not mean Pilate personally carried out the crucifixion himself.

It means he handed Jesus over to be executed according to what the crowd demanded.

Barabbas walked free in these same verses while Jesus took his place toward death.

One guilty man went free, and one innocent man was delivered up instead.

🔄 Delivered means handed over for death

🔓 Barabbas walked free in this exchange

⚖️ Guilt and innocence traded places

📖 Jesus was delivered up in his place

# Luke 23:26-31
# 😢 The Road To Calvary
---
## 🚶 One Simon, A Cyrenian, Coming Out Of The Country

Cyrene was a city in North Africa with a large Jewish population at this time.

Simon was likely in Jerusalem only as a visitor for the Passover feast.

Mark's Gospel later names Simon's sons, Alexander and Rufus, suggesting his family became known among early believers.

An ordinary passerby was suddenly pulled straight into the most important day in history.

🗺️ Cyrene was a city in North Africa

🎉 Simon was likely visiting for Passover

👪 His sons later appear in Mark's Gospel

➡️ An ordinary man was pulled into this moment

## ✝️ On Him They Laid The Cross

Roman custom forced condemned prisoners to carry the heavy crossbeam of their own execution device.

This public carrying was meant to humiliate the prisoner on the way to death.

Jesus had likely already been severely beaten, leaving him physically unable to carry it alone.

Simon's forced help became an unexpected, permanent part of the gospel story.

✝️ Prisoners normally carried their own cross

😣 This public walk was meant to shame

🩹 Jesus was too weakened to carry it

📖 Simon's help became part of the story

## 😭 A Great Company Of People...Which Also Bewailed And Lamented Him

"Bewailed and lamented" both describe loud, open mourning, not quiet or private sadness.

This crowd differs from the hostile one demanding crucifixion earlier in the chapter.

Public mourning like this was a normal response to watching any execution procession pass by.

Not everyone in Jerusalem that day wanted Jesus dead.

😭 Bewailed means loud, open grief

👥 This crowd differs from the hostile one

🚶 Mourning crowds often watched executions

➡️ Not everyone wanted this outcome

## 🗣️ Daughters Of Jerusalem, Weep Not For Me, But Weep For Yourselves

This does not mean Jesus was rejecting their compassion or telling them not to care.

He redirects their grief toward a coming judgment that would fall on Jerusalem itself.

Jesus often addressed personal suffering by pointing toward a larger, more urgent truth.

Even while walking toward his own death, Jesus still thought of their future.

🗣️ Jesus redirects their grief forward

🏙️ A coming judgment would hit Jerusalem

👀 He still thought of their future

📖 Compassion did not stop his warning

## 🤱 Blessed Are The Barren, And The Wombs That Never Bare

This does not celebrate being unable to have children as some kind of blessing.

In this culture, having no children usually brought shame rather than honor.

Jesus flips that shame into a strange kind of relief, since no child would face the coming horror.

This points forward to the terrible siege and destruction of Jerusalem decades later.

🤱 Barren usually meant shame, not honor

🔄 Jesus flips that shame here

🏙️ He points toward a future siege

📖 No child would want to witness it

## ⛰️ Say To The Mountains, Fall On Us, And To The Hills, Cover Us

This cry for mountains to fall and hide people echoes a similar plea in the prophet Hosea.

People would rather be crushed by a mountain than face the judgment that was coming.

This is the language of total despair, not a request anyone expected to actually happen.

Jesus borrows Israel's own prophetic words to describe the horror still ahead.

⛰️ This echoes a plea from Hosea

😱 It expresses total despair

🗣️ Jesus borrows Israel's prophetic language

📖 Worse judgment was still ahead

## 🌳 If They Do These Things In A Green Tree, What Shall Be Done In The Dry

A "green tree" is healthy and full of life, while a "dry" one is dead and ready to burn.

Jesus compares himself, completely innocent, to the green tree suffering unjustly right now.

If an innocent, living tree burns this badly, a guilty, dead nation faces something far worse.

This proverb warns that Jerusalem's own coming judgment would be even harsher than this.

🌳 Green means alive, dry means dead

✅ Jesus is the innocent green tree

🔥 A dead tree burns even worse

➡️ Jerusalem's judgment would be harsher still

# Luke 23:32-34
# ✝️ Father, Forgive Them
---
## 😈 Two Other, Malefactors, Led With Him To Be Put To Death

"Malefactors" means criminals, people who had broken serious laws.

Jesus is deliberately placed in the middle of two convicted criminals during his execution.

This detail fulfills an old prophecy in Isaiah about being numbered among transgressors.

The most innocent man present was placed to look exactly like the guiltiest.

😈 Malefactors means convicted criminals

🎯 Jesus was placed between two of them

📜 This fulfills Isaiah's old prophecy

➡️ The innocent looked like the guilty

## 🏔️ The Place, Which Is Called Calvary

"Calvary" comes from a Latin word meaning skull, matching the Greek word Golgotha used elsewhere.

Many scholars believe the site was named for its shape or for skulls found there.

This was likely a hill just outside Jerusalem's city walls, visible to passersby.

A place named after death became the exact spot where life's true source was killed.

🏔️ Calvary means skull in Latin

🗺️ It sat just outside Jerusalem's walls

👀 It was visible to passersby

📖 Death's name marked where life was killed

## 🙏 Father, Forgive Them, For They Know Not What They Do

Jesus prays this forgiveness while nails are still being driven into his own hands.

"They" likely includes the soldiers, the crowd, and the religious leaders who pushed for this death.

This prayer does not excuse their guilt but asks God to show mercy anyway.

Jesus modeled the exact forgiveness he had spent his whole ministry teaching others to give.

🙏 Jesus prayed this during his own execution

👥 They includes soldiers, crowds, and leaders

⚖️ The prayer asks mercy, not innocence

📖 Jesus modeled his own teaching here

## 🎲 They Parted His Raiment, And Cast Lots

"Raiment" means clothing, and "cast lots" means dividing it up through a game of chance.

Roman soldiers were legally allowed to keep the belongings of anyone they executed.

This detail fulfills Psalm twenty two, written centuries earlier, describing this exact scene.

Soldiers casually gambling nearby showed how routine this horrific moment was for them.

🎲 Cast lots means dividing by chance

👕 Raiment means clothing taken as payment

📜 This fulfills Psalm twenty two exactly

➡️ Soldiers treated this as routine work

# Luke 23:35-38
# 😏 Mocked On The Cross
---
## 👀 The People Stood Beholding

This crowd watches silently, unlike the mourning crowd from the road to Calvary earlier.

"Beholding" suggests a passive, almost curious watching rather than active grief or anger.

Public executions were treated as public spectacle in the ancient Roman world.

Silence here was not sympathy, just distance from the dying man on the cross.

👀 Beholding means passive, curious watching

😢 This differs from the earlier mourning crowd

🎭 Executions were treated as public spectacle

➡️ Watching was not the same as caring

## 😏 He Saved Others, Let Him Save Himself, If He Be Christ

The rulers mock Jesus using his own reputation for healing and helping others.

They assume that true power would obviously be used to escape personal suffering.

This mockery accidentally states something true, that Jesus really had saved others before this day.

Real power, in God's kingdom, chose to stay on the cross instead of escaping it.

😏 Rulers mocked his healing reputation

🎭 They assumed power always escapes pain

✅ Their mockery accidentally stated the truth

📖 Real power chose to stay, not escape

## 🍷 The Soldiers Also Mocked Him...Offering Him Vinegar

This "vinegar" was likely sour wine, a cheap drink soldiers carried for themselves on duty.

Offering it to Jesus was a crude joke, pretending to toast a king who could not drink.

Soldiers joined the rulers in treating Jesus's suffering as entertainment rather than tragedy.

Every group present, rulers, soldiers, and bystanders, found their own way to mock him.

🍷 Vinegar means cheap, sour wine

😈 Offering it was a cruel joke

🎭 Soldiers joined the mockery too

➡️ Every group mocked him differently

## 📜 A Superscription...In Letters Of Greek, And Latin, And Hebrew

A "superscription" was a sign listing the charge against a crucified prisoner, placed above his head.

Writing it in three languages meant every passerby could read it, no matter their background.

Greek was the language of trade, Latin the language of Rome, and Hebrew the language of the Jews.

Pilate's mocking sign, meant as an insult, ended up publicly announcing the truth to the whole world.

📜 A superscription listed the prisoner's charge

🗣️ Three languages reached every passerby

🏛️ Greek, Latin, and Hebrew covered everyone

📖 An insult accidentally announced the truth

# Luke 23:39-43
# 🙏 The Thief On The Cross
---
## 😡 One Of The Malefactors...Railed On Him

"Railed" means shouting harsh, bitter insults at someone.

This criminal joins the rulers and soldiers in mocking Jesus from his own cross nearby.

Even while dying for his own crimes, this man still finds energy to attack someone else.

Suffering does not automatically make a person humble or honest.

😡 Railed means shouting bitter insults

🤝 He joined the rulers' mockery

😣 He mocked while dying himself

➡️ Suffering alone does not create humility

## 🙏 Dost Not Thou Fear God, Seeing Thou Art In The Same Condemnation

The second criminal rebukes the first, pointing out their shared, deserved punishment.

"Fear God" here means showing basic respect, not literal terror.

This man recognizes something the mocking crowd below completely missed, that Jesus was different from them.

A dying criminal becomes the one clear voice of honesty on that entire hill.

🙏 Fear God means basic respect here

⚖️ Both men shared the same punishment

👀 He saw what the crowd missed

📖 Honesty came from an unlikely voice

## ✅ We Receive The Due Reward Of Our Deeds...This Man Hath Done Nothing Amiss

"Amiss" means wrong or wrongdoing, so this phrase simply means Jesus had done nothing wrong.

This criminal openly admits his own guilt instead of denying it like so many others nearby.

He draws a clear line between his own deserved suffering and Jesus's completely undeserved suffering.

True honesty about his own life let him finally see the truth standing right beside him.

✅ Amiss means wrongdoing or fault

🙋 He admitted his own guilt openly

⚖️ He saw Jesus's suffering as undeserved

➡️ Honesty opened his eyes to the truth

## 👑 Lord, Remember Me When Thou Comest Into Thy Kingdom

This dying criminal makes an astonishing statement of faith with almost nothing to go on.

He calls Jesus Lord and believes in a coming kingdom while watching him die beside him.

No miracle, no resurrection, and no visible victory had happened yet when he said this.

Faith here reached further than anything the eyes could actually see in that moment.

👑 He called Jesus Lord while dying

🙏 He believed in a coming kingdom

👀 No visible victory had happened yet

📖 Faith saw further than his eyes could

## 🌴 To Day Shalt Thou Be With Me In Paradise

"Paradise" was a word borrowed from Persian, describing a beautiful, walled garden of rest.

Jewish tradition had come to use this word for the place where righteous souls waited after death.

Jesus promises immediate presence with him, not a future reward earned over time.

A lifetime of crime ended with a single day's promise that could never be taken back.

🌴 Paradise means a beautiful garden of rest

⏰ Jesus promised it that very day

🎁 This reward required no earned time

📖 One day's faith secured eternity

# Luke 23:44-46
# 🌑 Darkness And Death
---
## 🕐 About The Sixth Hour...Until The Ninth Hour

Jewish time counted hours from sunrise, so the sixth hour fell near midday.

The ninth hour fell around three in the afternoon, the normal time for evening sacrifices at the temple.

Jesus hung on the cross through the brightest hours of the day, yet darkness still covered the land.

Nature itself seemed to respond to what was happening on that hill.

🕐 The sixth hour fell near midday

🕒 The ninth hour fell midafternoon

🌑 Darkness covered the land unexpectedly

➡️ Nature responded to this moment

## 🏛️ The Veil Of The Temple Was Rent In The Midst

The "veil" was a massive, thick curtain separating the temple's holiest room from everyone else.

Only the high priest could pass behind it, and only once a year, to meet with God there.

This curtain tearing from top to bottom, not bottom to top, points to God's own action, not human hands.

Full access to God, once blocked by this veil, was now suddenly and dramatically opened.

🏛️ The veil guarded God's holiest room

👤 Only the high priest could enter

👆 It tore from the top down

📖 Access to God was now opened

## 🙏 Father, Into Thy Hands I Commend My Spirit

Jesus quotes Psalm thirty one, a prayer of trust that godly Jews prayed before sleep.

"Commend" means entrusting something valuable completely into someone else's care.

Jesus chooses the exact moment and words of his own death, rather than simply fading away.

He gave up his spirit willingly, as an act of trust, not as a victim overwhelmed by force.

🙏 This quotes Psalm thirty one directly

🤲 Commend means fully entrusting something

⏰ Jesus chose the moment himself

📖 He died in trust, not defeat

## 💨 He Gave Up The Ghost

"Gave up the ghost" is an old way of saying he breathed his last and died.

The wording suggests an active choice, Jesus releasing his life, rather than life simply running out.

No one took Jesus's life without his own willing permission in this account.

Death itself became something Jesus walked into, not something that simply caught up with him.

💨 This phrase means he breathed his last

🤲 The wording suggests a willing choice

🚫 No one forced this moment alone

📖 Jesus walked into death, in control

# Luke 23:47-49
# 👀 Watching From A Distance
---
## ⚔️ Now When The Centurion Saw...He Glorified God

A "centurion" commanded about one hundred Roman soldiers, a career military officer, not a religious man.

This same type of officer had overseen the crucifixion itself from start to finish.

A hardened Roman soldier, who had seen many executions, reacts with worship instead of indifference.

Even Rome's own military witnessed enough that day to recognize something was different.

⚔️ A centurion led about one hundred soldiers

👀 He had overseen the execution firsthand

🙏 He reacted with worship, not indifference

📖 Rome's own soldier sensed something different

## ✅ Certainly This Was A Righteous Man

A Roman soldier, with no reason to defend a condemned Jewish prisoner, declares Jesus innocent.

This matches Pilate's own earlier verdict, now confirmed by the man who watched Jesus actually die.

Everyone with firsthand authority to judge kept reaching the exact same conclusion.

The one group pushing hardest for Jesus's death were the only ones who disagreed.

✅ A Roman soldier called Jesus innocent

⚖️ This matched Pilate's earlier verdict

👀 Every firsthand witness agreed on this

➡️ Only the accusers disagreed with the truth

## 😥 Smote Their Breasts, And Returned

"Smote their breasts" was a physical gesture of grief, striking the chest with the hand.

This crowd came simply to watch, yet left visibly shaken by what they had seen.

Grief here looks different from the earlier bystanders who stood passively mocking or watching.

Something about witnessing this death moved even casual spectators toward real sorrow.

😥 Smote their breasts showed physical grief

👀 They came only to watch

🔄 Watching turned into real sorrow

📖 This death moved even casual onlookers

## 👩 His Acquaintance, And The Women...Stood Afar Off

"His acquaintance" likely refers to other followers and friends beyond the eleven remaining disciples.

The women mentioned had followed Jesus all the way from Galilee, supporting his ministry.

Standing "afar off" shows fear of the authorities, yet they still would not leave him entirely alone.

Their quiet, distant loyalty would soon matter greatly at the empty tomb just days later.

👥 Acquaintance means other friends and followers

🗺️ These women had followed from Galilee

😨 Afar off still showed real fear

➡️ Their loyalty mattered again very soon

# Luke 23:50-53
# ⚰️ Joseph Of Arimathaea
---
## 👤 A Man Named Joseph, A Counsellor

A "counsellor" was a member of the Sanhedrin, the same council that had condemned Jesus.

Arimathaea was a small town whose exact location is still debated by scholars today.

Luke describes Joseph as both good and just, setting him apart from his fellow council members.

This detail reminds the reader that not every religious leader wanted Jesus dead.

👤 A counsellor sat on the Sanhedrin

🗺️ Arimathaea's exact location is debated

✅ Luke calls Joseph good and just

➡️ Not every leader wanted Jesus dead

## 🙅 He Had Not Consented To The Counsel And Deed Of Them

Joseph had been present for the council's decision but refused to agree with it.

This took real courage, since disagreeing publicly could cost him his standing among powerful men.

"Also himself waited for the kingdom of God" shows Joseph was already quietly hoping for the Messiah.

A secret believer finally steps into the open at the most dangerous possible moment.

🙅 Joseph refused to agree with the verdict

😨 Disagreeing risked his own standing

🙏 He was already hoping for the kingdom

📖 He stepped forward at the riskiest moment

## 🏛️ This Man Went Unto Pilate, And Begged The Body Of Jesus

This does not mean Joseph simply asked a quick, easy favor of a friend.

Approaching Pilate directly after Jesus's execution was a public, risky act of association.

Roman custom often left executed criminals unburied, so claiming the body required real boldness.

Joseph's quiet faith became visible action at the exact moment it was hardest to show it.

🏛️ Approaching Pilate was risky and public

⚠️ Bodies were often left unburied

💪 Claiming it required real boldness

➡️ Quiet faith became visible action here

## 📿 Wrapped It In Linen...Never Man Before Was Laid

Wrapping a body in "linen" was the normal Jewish burial custom of the time.

A "sepulchre...hewn in stone" means a tomb carved directly out of solid rock, often owned by wealthy families.

That this tomb had never held a body before meant nothing could confuse whose resurrection happened here later.

Joseph's generous gift of his own tomb becomes essential to the story only days later.

📿 Linen was the normal burial cloth

🪦 The tomb was carved from solid rock

🆕 No body had ever been laid there

📖 This detail mattered again very soon

# Luke 23:54-56
# 🕯️ Preparing Spices
---
## ☀️ That Day Was The Preparation, And The Sabbath Drew On

"The preparation" meant the day before the sabbath, when Jewish law required cooking and heavy work finished in advance.

The sabbath began at sunset on Friday, giving everyone only a few remaining hours to act.

Joseph and the women had to finish burying Jesus quickly before the sabbath restrictions took effect.

Even grief had to work within the pressing limits of the clock that evening.

☀️ Preparation meant the day before sabbath

🌇 The sabbath began at sunset

⏰ Only a few hours remained to act

➡️ Grief still had to meet a deadline

## 👀 The Women Also...Followed After, And Beheld The Sepulchre

These are the same Galilean women mentioned earlier watching from a distance during the crucifixion.

"Beheld" means they watched closely and carefully, noting exactly where the tomb was located.

Their careful attention here explains exactly how they could return to the same place days later.

Small, observant faithfulness often ends up mattering more than anyone realizes at the time.

👀 These were the same Galilean women

📍 They carefully noted the tomb's location

🔁 This explains their later return

📖 Small faithfulness mattered more than they knew

## 🕯️ Rested The Sabbath Day According To The Commandment

These women kept the sabbath command even while grieving the death of the man they loved most.

Their obedience here looks almost unbearable, forced to wait quietly before they could even finish honoring him.

Luke ends the chapter on stillness, obedience, and grief, with no hint yet of what comes next.

A single day of rest stood quietly between the cross and the empty tomb.

🕯️ They obeyed the sabbath command fully

😔 Grief still had to wait patiently

🤐 The chapter ends on quiet obedience

➡️ One day of rest came before the tomb
`.trim();

export const LUKE_TWENTY_THREE_PERSONAL_SECTIONS = parseLukeTwentyThreeRawNotes(LUKE_TWENTY_THREE_RAW_NOTES);
