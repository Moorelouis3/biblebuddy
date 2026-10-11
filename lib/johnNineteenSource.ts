export type JohnNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnNineteenRawNotes(rawText: string): JohnNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 19:${startVerse}` : `John 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 John 19 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_NINETEEN_RAW_NOTES = `# John 19:1-3
# ⚡ The Soldiers Mock The King
---
## 🩸 Took Jesus And Scourged Him

"Scourged" means far more than a simple whipping.

Roman scourging used a weighted whip called a flagrum, with pieces of bone or metal tied into the leather straps.

This punishment alone was brutal enough to kill a man before any cross was ever involved.

Pilate orders it here hoping the sight of Jesus already beaten will satisfy the crowd.

It does not.

🩸 Scourged means far worse than a whipping

⛓️ Roman whips used bone and metal

💀 This alone could kill a man

📖 Pilate hoped it would satisfy the crowd

## 🌿 Platted A Crown Of Thorns

"Platted" means woven or twisted together by hand.

The soldiers twist thorn branches into a circle and press it onto his head.

A real crown was a sign of honor and royal power.

This crown was built only to cause pain and ridicule.

The men mocking him do not realize they are placing a true king's crown.

🌿 Platted means woven together by hand

👑 A real crown marks honor and power

😖 This crown exists only to cause pain

📖 They crown a true king by mistake

## 🐚 Put On Him A Purple Robe

Purple dye in the ancient world was extremely expensive.

It came from crushing thousands of small sea snails just to color one garment.

Only kings, emperors, and the very wealthy normally wore it.

Dressing Jesus in purple was another layer of cruel mockery.

The soldiers dress him as a king only to beat the king they just dressed.

🐚 Purple dye came from crushed sea snails

💰 Only the wealthy could normally afford it

👑 Soldiers dress Jesus like a king

📖 They mock the king they just dressed

## 📣 Hail King Of The Jews

Roman soldiers normally shouted a salute like this only to Caesar.

"Hail Caesar" was the normal cry for Rome's actual ruler.

Twisting it toward Jesus turns the salute into a cruel joke.

They smote him with their hands right after saying it.

Mockery and violence arrive together in this single moment.

📣 Hail Caesar was the normal salute

🔄 Soldiers twist it toward Jesus instead

👊 They strike him right after saying it

📖 Mockery and violence arrive together

# John 19:4-7
# ⚖️ Behold The Man
---
## ⚖️ I Find No Fault In Him

Pilate says this exact line twice across these verses.

Rome's own governor publicly declares Jesus innocent of any crime.

A Roman trial has already reached its true verdict.

Pilate keeps repeating that verdict while still moving toward a cross.

Saying the right thing and doing the right thing are not the same.

⚖️ Pilate says this exact line twice

✅ Rome's own judge calls him innocent

🎯 The true verdict is already spoken

📖 Saying it and doing it differ

## 👀 Behold The Man

Pilate presents Jesus to the crowd still wearing the crown of thorns and purple robe.

He likely means this as an appeal to pity, pointing at a beaten, harmless man.

John's readers would later hear far more inside that one sentence.

The man Pilate holds up is the same man John calls the Word made flesh.

Pilate thinks he is showing weakness.

He is actually showing the world its king.

👀 Pilate points at a beaten man

💔 He appeals to the crowd's pity

👑 John's readers hear far more here

📖 Pilate shows the world its king

## 📜 We Have A Law

Jewish law treated blasphemy, claiming the identity of God, as a crime worthy of death.

Leviticus spells out stoning as the punishment for that charge.

The leaders finally state the real accusation out loud.

Political pressure on Pilate was never really about Rome at all.

It was about a religious charge Rome had no interest in.

📜 Jewish law punished blasphemy with death

🪨 Leviticus named stoning as the penalty

🗣️ Leaders finally state the real charge

📖 Rome never truly cared about this charge

## ✅ He Made Himself The Son Of God

The leaders treat this claim as a man reaching for a title that is not his.

John's Gospel has already shown Jesus is not reaching for anything new.

He said plainly, earlier, that he and the Father are one.

The charge is accurate about what Jesus claims, and wrong only about whether it is true.

Their accusation names exactly who Jesus says he is.

⚖️ Leaders call this claim blasphemy

🙏 Jesus had already said this plainly

✅ The charge names him correctly

📖 They accuse him of telling the truth

# John 19:8-11
# 👆 Power From Above
---
## 😨 The More Afraid

"That saying" refers to the leaders calling Jesus the Son of God.

Pilate is a political governor, not a particularly religious man.

Even he senses something larger than politics is happening in this room.

Fear can creep in even on someone who claims not to believe.

Pilate already suspects this trial is bigger than he wants it to be.

👂 That saying means the Son of God claim

😨 Pilate grows afraid at the words

🏛️ A political man senses something larger

📖 Fear reaches even an unbeliever here

## 🤐 Jesus Gave Him No Answer

Jesus has already answered Pilate's real political questions earlier in this chapter.

This new question, about where Jesus truly comes from, gets only silence.

Isaiah had described a suffering servant who would stay silent before his accusers.

Silence here is not confusion.

It is Jesus choosing which questions deserve an answer.

🤐 Jesus answers with silence here

📜 Isaiah foretold a silent suffering servant

🎯 Silence is a choice, not confusion

📖 Jesus controls which questions get answered

## ⚖️ Power To Crucify Thee And Power To Release Thee

Pilate reminds Jesus who technically holds the power in this room.

On paper that claim is true.

Rome gave Pilate legal authority over life and death in Judea.

The very next verse shows whose authority actually outranks his.

⚖️ Pilate claims power over life and death

🏛️ Rome did give him that authority

👑 A higher authority outranks him here

📖 The next verse proves it

## 👆 Except It Were Given Thee From Above

Jesus does not deny that Pilate holds real authority.

He corrects where that authority actually comes from.

Every earthly power ultimately answers to God's own authority.

Pilate thinks he is in control of this trial.

He is only operating inside a larger plan he cannot see.

👆 Jesus points to a higher source

🌍 All earthly power answers to God

🎭 Pilate thinks he controls this trial

📖 He only acts inside a larger plan

## 👉 He That Delivered Me Unto Thee Hath The Greater Sin

"He that delivered me" most likely points to Caiaphas, or to the Jewish leadership as a whole.

Jesus is not excusing Pilate's own guilt in this moment.

He is ranking the guilt, not erasing it.

Knowing the truth about God and rejecting it anyway carries a heavier weight than Pilate's own cowardice.

Even in chains, Jesus still judges rightly.

👉 He that delivered me likely means Caiaphas

⚖️ Jesus ranks guilt, he does not erase it

📚 Knowing truth and rejecting it is heavier

📖 Even in chains Jesus judges rightly

# John 19:12-16
# 👑 Not Caesar's Friend
---
## 👑 Not Caesar's Friend

"Friend of Caesar" was an actual status among Roman officials, not just a figure of speech.

Losing that status could end a governor's career or even his life.

The crowd is threatening Pilate's own political survival, not just arguing theology.

Fear for his own position pushes Pilate harder than anything else in this trial.

👑 Friend of Caesar was a real status

⚠️ Losing it could end a career

🏛️ The crowd threatens Pilate's own survival

📖 Self preservation drives his final choice

## 🪨 The Pavement, But In The Hebrew, Gabbatha

The Pavement describes a stone platform, likely paved in patterned stone, used for official judgments.

Gabbatha is the Aramaic or Hebrew name John adds for his readers.

Naming the exact spot roots this moment in a real, physical place.

This was never a vague or symbolic trial.

It happened on an actual stone floor Roman officials used for real verdicts.

🪨 The Pavement names a stone platform

🗣️ Gabbatha is its Hebrew name

📍 John roots this in a real place

📖 This verdict happened on real stone

## 🕛 About The Sixth Hour

Counting from sunrise, the sixth hour lands near midday.

John's timing here has long puzzled readers next to Mark's account of the crucifixion.

Mark describes the crucifixion itself happening earlier, near the third hour by a different count.

Many scholars believe John may be using Roman civil time instead of the Jewish method.

Either way, the day is moving fast toward the cross.

🕛 Sixth hour lands near midday

📚 John's timing differs from Mark's account

🧮 John may use Roman time instead

📖 The day races toward the cross

## 🔁 Behold Your King

Pilate changes his own words from earlier in this chapter.

He first said behold the man.

Now he says behold your king, and he means it as mockery.

Even his mockery keeps repeating a truth he does not believe.

🔁 Pilate shifts from man to king

😏 He means this as mockery

👑 He still names Jesus as king

📖 Mockery accidentally repeats the truth

## 😮 We Have No King But Caesar

This line should feel shocking coming from the nation's own chief priests.

Israel's whole history runs on the belief that God alone is their true king.

Choosing Caesar over their own promised king is a stunning reversal.

Political survival wins out over the hope their own scriptures had pointed toward for centuries.

😮 This line should shock the reader

🙏 Israel's king was always meant to be God

🔄 They choose Caesar over their promise

📖 Political survival defeats centuries of hope

# John 19:17-22
# ✝️ The Place Called Golgotha
---
## 🪵 Bearing His Cross

Condemned men typically carried only the heavy crossbeam, not the full upright post.

The other Gospels describe Simon of Cyrene helping carry it for part of the way.

John focuses his account only on Jesus himself here.

He wants the reader watching Jesus carry his own suffering, not a helper.

🪵 Prisoners carried the crossbeam, not the whole cross

🙋 Other Gospels mention Simon helping carry it

🎥 John keeps the focus on Jesus alone

📖 He shows Jesus carrying his own suffering

## 💀 Golgotha

Golgotha is the Aramaic or Hebrew word for a skull.

The nearby Latin word for skull, calvaria, is where the later name Calvary comes from.

Scholars are not certain why the hill carried this grim name.

Some think it was the shape of the hill, others a place known for executions.

💀 Golgotha means place of a skull

🗣️ Calvary comes from the Latin word for skull

❓ The exact reason for the name is unclear

📖 Either way, death already named this place

## 👥 Two Other With Him, On Either Side One

John does not say who these two men were.

The other Gospels describe them as robbers or criminals condemned alongside Jesus.

Placing the one truly innocent man in the exact middle was no accident.

Rome often crucified several prisoners together as a public warning.

👥 John leaves these two men unnamed

⚔️ Other Gospels call them criminals

🎯 The innocent man is placed in the middle

📖 Rome used mass crucifixions as warnings

## 🏷️ Jesus Of Nazareth The King Of The Jews

Rome commonly posted a written sign above a crucified prisoner naming his crime.

This sign was called a titulus.

Pilate's wording names Jesus as a king, not as a common criminal.

Without meaning to, Pilate writes out the exact truth of who Jesus is.

📜 Rome posted a titulus naming the crime

🏷️ Pilate's titulus instead names a king

😮 He writes the truth without meaning to

📖 Even the sign confesses who Jesus is

## 🕍 Written In Hebrew, And Greek, And Latin

Hebrew was the language of the Jewish people and their scriptures.

Greek was the common trade language across the entire Roman world.

Latin was the official language of Rome's government and army.

Writing the title in all three made sure no one passing by could miss it.

🕍 Hebrew spoke to the Jewish people

🌍 Greek reached the wider Roman world

🏛️ Latin carried Rome's own authority

📖 All three made the title impossible to miss

## ✋ Write Not, The King Of The Jews

The leaders are not objecting to a factual error.

They are objecting to Pilate letting Jesus claim the title at all.

Removing the word king would soften an accusation they still want to stand.

Pilate, oddly, refuses to budge on this one point.

✋ Leaders are not correcting a fact

👑 They want the title king removed

🧱 Removing it would soften their own charge

📖 Pilate refuses to change it

## 🧍 What I Have Written I Have Written

Pilate has bent to crowd pressure through most of this trial.

Here, finally, he will not move.

Perhaps it is stubbornness, or a small flash of defiance against the leaders who pushed him.

Whatever his reason, the sign stays exactly as it is.

🧍 Pilate finally refuses to bend

😤 This may be stubborn defiance

🏷️ The sign stays exactly as written

📖 Even Pilate cannot erase this truth

# John 19:23-27
# 🎲 At The Foot Of The Cross
---
## 🧵 His Coat Was Without Seam, Woven From The Top Throughout

Most garments of this time were sewn together from several pieces of cloth.

Jesus' inner garment was instead woven as one complete piece from top to bottom.

A seamless garment like this took real skill and real time to make.

John may be quietly pointing to something valuable being destroyed for nothing.

🧵 Most garments were sewn from several pieces

🪢 This one was woven as a single piece

⏳ A seamless garment took real skill

📖 Something valuable is torn apart for nothing

## 🎲 Let Us Not Rend It, But Cast Lots

Tearing the coat into pieces would ruin its value completely.

The soldiers choose a gambling game over destroying something worth keeping.

Men assigned to execute Jesus treat his last earthly possession as a prize.

Nothing about this moment shows him any respect at all.

🎲 Soldiers gamble instead of tearing it

💰 Keeping its value matters more to them

🙅 They show him no respect here

📖 His last possession becomes a prize

## 📜 That The Scripture Might Be Fulfilled

John is quoting directly from Psalm twenty two, written centuries before crucifixion even existed as a punishment.

That psalm already pictured enemies dividing a suffering man's clothing by lot.

A detail this specific, soldiers gambling for clothing, lines up with an ancient psalm.

John wants his reader to see a pattern older than this one afternoon.

📜 Psalm twenty two pictures this exact scene

⏳ It was written before crucifixion existed

🎯 Gambling for clothing matches it precisely

📖 John points to a much older pattern

## 👩 His Mother, And His Mother's Sister, Mary The Wife Of Cleophas

John names several women standing near the cross at once.

Mary, the mother of Jesus, stands closest to her own son's suffering.

Mary the wife of Cleophas was likely Jesus' aunt or another close relative.

Mary Magdalene, named right after her, had followed Jesus closely since he freed her from great torment.

👩 Jesus' own mother stands by the cross

👪 A relative, Mary wife of Cleophas, joins her

🙏 Mary Magdalene had followed Jesus closely

📖 Women stay present through his darkest hour

## 🕵️ The Disciple Standing By, Whom He Loved

This phrase almost certainly points to John himself, the writer of this Gospel.

John never names himself directly anywhere in his own account.

Writing it this way keeps attention on Jesus rather than on the author.

Even in physical agony, Jesus still notices exactly who is standing near him.

🕵️ This likely names John the author

📝 He never names himself directly

🎯 This keeps the focus on Jesus

📖 Jesus notices who stands near him

## 🗣️ Woman, Behold Thy Son

Calling his mother "woman" was not rude or cold in that culture.

It was a normal, respectful way to address a woman at the time.

Jesus is making sure his mother will be cared for after he is gone.

Even while dying, he arranges a new family to look after her.

🗣️ Woman was a respectful term then

❤️ Jesus is not being cold here

🏠 He arranges care for his mother

📖 Even dying, he plans for those he loves

## 🏠 That Disciple Took Her Unto His Own Home

John takes this responsibility seriously, and immediately, not someday later.

Mary becomes part of his own household from this moment forward.

Jesus builds a new kind of family out of loyal love, not only blood.

The cross creates new belonging even as it takes everything else away.

🏠 John takes Mary into his own home

⏱️ He does this right away, not later

❤️ Jesus builds family through loyal love

📖 New belonging grows even at the cross

# John 19:28-30
# 🍷 It Is Finished
---
## 🎯 Knowing That All Things Were Now Accomplished

Jesus is fully aware his mission is reaching its exact final moments.

Nothing happening here catches him by surprise.

He speaks his next words on purpose, to complete what scripture had foretold.

Even his final words serve a larger plan already written long before this day.

🎯 Jesus knows his mission is ending

😮 Nothing here surprises him

📜 His next words fulfill scripture on purpose

📖 Even his last words serve the plan

## 💧 I Thirst

This short phrase names a real physical need after hours of suffering.

It is also likely a direct echo of Psalm sixty nine, which pictured a suffering man given vinegar to drink.

Even a basic human need becomes one more fulfilled scripture in this moment.

Jesus remains fully human while also fulfilling a plan far older than himself.

💧 I thirst names a real physical need

📜 Psalm sixty nine already pictured this

🎯 One more scripture is fulfilled here

📖 Jesus stays fully human through it all

## 🌿 Put It Upon Hyssop

Hyssop was a small, leafy plant with a long, thin stem.

It had long been used to sprinkle blood during the first Passover in Egypt.

Using hyssop here quietly ties this moment back to that first Passover lamb.

Jesus dies at Passover carrying echoes of the very first one.

🌿 Hyssop was a small leafy plant

🩸 It once sprinkled blood at the first Passover

🐑 This ties Jesus to that first lamb

📖 He dies carrying Passover's oldest echo

## ✅ It Is Finished

This is one word in the original Greek, tetelestai.

Merchants used that same word on a receipt to mark a debt as fully paid.

Jesus is not giving up in defeat.

He is announcing that the work he came to do is completely, truly done.

💳 Tetelestai marked a debt as paid

🙅 This is not a cry of defeat

✅ The work is completely finished

📖 A debt is paid in full here

## 🕊️ Gave Up The Ghost

John describes this as something Jesus does, not only something that happens to him.

He bows his head and releases his own spirit on his own terms.

Even his death carries the same intention as the rest of his life.

No one takes his life from him without his own willing surrender.

🕊️ Jesus gives up his spirit willingly

🎯 His death matches his life's intention

🙅 No one takes it from him

📖 His surrender is willing, not forced

# John 19:31-37
# 🗡️ Blood And Water
---
## 📜 That The Bodies Should Not Remain Upon The Cross

Jewish law required a body be removed before nightfall, especially before the sabbath.

Leaving a corpse exposed was considered a curse on the land itself.

This sabbath also fell during Passover week, making it an especially high day.

Religious timing, not mercy toward Jesus, drives this request to Pilate.

📜 Law required removal before nightfall

⚠️ An exposed body was seen as a curse

📅 This sabbath fell during Passover week

📖 Religious timing, not mercy, drives the request

## 🦴 They Brake The Legs Of The First, And Of The Other

Breaking a crucified man's legs removed his ability to push himself up to breathe.

This sped up a death that could otherwise drag on for days.

Soldiers do this to the two men crucified beside Jesus.

They move toward Jesus next, expecting to do the same to him.

🦴 Broken legs stopped a man from breathing

⏳ This sped up an otherwise slow death

⚔️ The two other men receive this first

📖 Soldiers turn toward Jesus next

## 🙅 They Brake Not His Legs

Soldiers reach Jesus and find him already dead.

Breaking his legs becomes completely unnecessary.

This small detail will matter again just a few verses later.

Even the soldiers' routine actions end up fitting an older pattern.

💀 Jesus is already dead when they arrive

🙅 His legs are never broken

🔁 This detail returns a few verses later

📖 Routine actions fit a much older pattern

## 🗡️ One Of The Soldiers With A Spear Pierced His Side

This spear thrust confirmed death beyond any doubt.

Blood and water likely describes fluid buildup around the heart and lungs after this kind of trauma.

John is not offering poetic imagery here.

He is reporting what he personally watched happen.

🗡️ The spear confirmed death for certain

💧 Blood and water describe real fluid buildup

👀 John reports this as an eyewitness

📖 This is observation, not poetry

## ✅ He That Saw It Bare Record, And His Record Is True

John insists on his own reliability right in the middle of the story.

He wants later readers to trust these details as real history.

This whole Gospel is written so that people might believe.

One small detail, a spear and some blood, carries that entire purpose.

✅ John insists on his own reliability

📚 He wants readers to trust real history

🙏 His whole Gospel aims at belief

📖 One detail carries that larger purpose

## 🐑 A Bone Of Him Shall Not Be Broken

This echoes the instructions for the original Passover lamb, whose bones were never to be broken.

Jesus dies as the true Passover lamb during this same Passover week.

An ordinary soldier's routine decision ends up matching an ancient instruction.

Nothing about this crucifixion happens outside what scripture already described.

🐑 This echoes the Passover lamb's instructions

🎯 Jesus dies as that true lamb

🔁 A routine decision matches an old command

📖 Scripture already described this moment

## 🔭 They Shall Look On Him Whom They Pierced

This line comes from the prophet Zechariah, written centuries earlier.

Zechariah pictured a future day when people would mourn over someone they had pierced.

John connects that old prophecy directly to the spear wound just described.

The soldiers' spear becomes the exact fulfillment of an ancient promise.

📜 This quotes the prophet Zechariah

⏳ It was written centuries before this day

🗡️ John ties it to the spear wound

📖 An ancient promise is fulfilled here

# John 19:38-42
# 🪦 Laid In A New Sepulchre
---
## 👤 Joseph Of Arimathaea, Being A Disciple Of Jesus, But Secretly

Joseph belonged to the ruling council that had just condemned Jesus to death.

He had kept his faith in Jesus quiet out of fear of his own colleagues.

Watching Jesus die apparently moves him past that fear at last.

Courage sometimes arrives only after the moment everyone expected it to matter most.

👤 Joseph sat on the ruling council

🤫 He had kept his faith secret

💪 Jesus' death moves him past that fear

📖 Courage can arrive later than expected

## 🌙 There Came Also Nicodemus

John introduced Nicodemus many chapters earlier, visiting Jesus secretly at night.

Back then he came full of questions and uncertainty.

Here he comes with spices and a hundred pounds of costly burial preparation.

A quiet, private curiosity has grown into open, costly devotion.

🌙 Nicodemus first appeared visiting at night

❓ He once came full of questions

🎁 Now he brings costly burial spices

📖 Quiet curiosity grows into open devotion

## 🌿 A Mixture Of Myrrh And Aloes, About An Hundred Pound Weight

Myrrh and aloes were fragrant spices used to prepare a body for burial.

A hundred Roman pounds was an enormous amount to use for one burial.

This kind of quantity was normally reserved for honoring a king.

Two men give Jesus a royal burial that the world refused to give him in life.

🌿 Myrrh and aloes prepared a body

💰 A hundred pounds was an enormous amount

👑 This much spice honored royalty

📖 Jesus gets the burial a king deserves

## 🧵 Wound It In Linen Clothes With The Spices

Jewish burial custom wrapped the body carefully in strips of linen cloth.

Spices were packed between the layers to slow the natural process of decay.

This was done quickly, since Jewish law required burial before nightfall.

Every detail here follows normal Jewish practice exactly.

🧵 Linen cloth wrapped the body carefully

🌿 Spices were packed between the layers

⏱️ Burial had to happen before nightfall

📖 Every detail follows normal custom

## 🪦 In The Garden A New Sepulchre, Wherein Was Never Man Yet Laid

Wealthy families in this period often owned a carved rock tomb.

It was meant for multiple family burials stretched out over many years.

This particular tomb had never once been used.

Jesus becomes the very first body placed inside it.

An unused tomb leaves nothing ambiguous about whose body turns up missing three days later.

🪦 Wealthy families owned carved rock tombs

🆕 This tomb had never been used

🥇 Jesus is its first burial

📖 An empty tomb later proves unmistakable

## ⏳ Because Of The Jews' Preparation Day, For The Sepulchre Was Nigh At Hand

Time was already running out before the sabbath began.

A nearby tomb was simply the fastest, most practical option available.

Practical necessity places Jesus in the exact tomb a prophecy already pointed toward.

Even rushed, ordinary decisions land exactly where God intended all along.

⏳ Time was running out before sabbath

📍 A nearby tomb was the practical choice

🎯 Ordinary decisions land where God intended

📖 Even rushed choices fit the larger plan
`.trim();

export const JOHN_NINETEEN_PERSONAL_SECTIONS = parseJohnNineteenRawNotes(JOHN_NINETEEN_RAW_NOTES);
