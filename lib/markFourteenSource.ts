export type MarkFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkFourteenRawNotes(rawText: string): MarkFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 14:${startVerse}` : `Mark 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 Mark 14 sections, received " + sections.length);
  }

  return sections;
}

const MARK_FOURTEEN_RAW_NOTES = `# Mark 14:1-2
# 🗡️ A Plot By Craft
---
## 🗡️ They Might Take Him By Craft

"Craft" here means trickery, not a skill with tools.

The religious leaders wanted Jesus arrested through deception, not an open confrontation.

Arresting Him in public could spark a riot they could not control.

A secret plan protected their own power more than it protected the law.

🗡️ Craft means trickery here, not skill

🤫 Leaders wanted a quiet, hidden arrest

😨 Public arrest risked a riot

📖 Protecting power mattered more than justice

## 🏙️ Not On The Feast Day, Lest There Be An Uproar

The feast day means Passover, when Jerusalem filled with visiting pilgrims.

An uproar meant a public riot the leaders could not control.

Killing Jesus during the feast risked turning the crowd against them.

Their fear was crowd control, not conscience.

🏙️ Feast day means Passover with crowded Jerusalem

⚠️ Uproar means an uncontrollable public riot

😨 They feared the crowd, not guilt

📖 Fear of chaos drove the timing

# Mark 14:3-9
# 🏺 The Woman With The Alabaster Box
---
## 🏺 An Alabaster Box Of Ointment Of Spikenard

Alabaster is a soft, pale stone carved into small sealed jars.

Spikenard was a rare perfume oil imported from far away, near the Himalayas.

Breaking the box released the whole jar at once, nothing saved back.

This was not a small gift, it was a costly, deliberate sacrifice.

🏺 Alabaster means a carved stone jar

🌿 Spikenard was a rare imported perfume

💔 Breaking it meant holding nothing back

📖 The gift was costly on purpose

## 💰 It Might Have Been Sold For More Than Three Hundred Pence

A penny here translates a denarius, the normal pay for one day of work.

Three hundred pence equaled almost a full year of ordinary work.

The complaint sounds reasonable, help the poor instead of this waste.

Yet the complaint missed who was sitting right in front of them.

💰 A penny here means a day's wage

📅 Three hundred pence equaled a year's pay

🤔 The complaint sounded reasonable on the surface

📖 It missed who was actually present

## 😠 There Were Some That Had Indignation Within Themselves

Indignation means a sharp, angry sense that something is unfair or wasteful.

The complaint began quietly, inside their own minds, before it was spoken aloud.

Judging her gift came easily to people who had given nothing themselves.

Private resentment can grow into public criticism very quickly.

😠 Indignation means sharp inner anger

🤐 The complaint started silently, unspoken at first

👥 They judged a gift they never gave

📖 Private resentment can turn into criticism

## 🙌 She Hath Wrought A Good Work On Me

Jesus defends her before anyone else can speak in her favor.

"Wrought" is an old word that simply means done or performed.

He names her act a good work, not a wasteful one.

His verdict overrules the room's shared, confident judgment of her.

🙌 Wrought means done or performed

🛡️ Jesus defends her before anyone else can

⚖️ He calls it good, not wasteful

📖 His verdict overrules the room's judgment

## 🤲 Ye Have The Poor With You Always

This is not Jesus dismissing care for the poor as unimportant.

He is naming a present moment that will never come again.

Ongoing opportunities to help the poor will always remain open.

This one chance to anoint Him before His death will not.

🤲 Jesus is not dismissing the poor

⏳ This exact moment will not return

🔁 Helping the poor remains an ongoing chance

📖 This anointing was a one time moment

## ⚰️ Aforehand To Anoint My Body To The Burying

"Aforehand" is an old word meaning ahead of time, in advance.

Burial customs in that culture usually included anointing the body with spices.

Jesus's own burial would be rushed before the Sabbath began.

She unknowingly performed part of His burial preparation while He was still alive.

⚰️ Aforehand means ahead of time

🧴 Burial customs included anointing with spices

⏱️ His actual burial would be rushed

📖 She prepared His body before He died

## 📯 Wheresoever This Gospel Shall Be Preached, This Shall Be Spoken Of

Jesus ties her quiet act to the entire future spread of the gospel.

A memorial means something kept and retold so it is never forgotten.

No apostle and no miracle gets this exact promise in the Gospels.

An unnamed woman's private devotion earns permanent, worldwide remembrance.

📯 Jesus links her act to the whole gospel

🕯️ Memorial means something retold and never forgotten

👑 No apostle receives this exact promise

📖 Her quiet devotion earns worldwide memory

# Mark 14:10-11
# 🪙 Judas Goes To Betray Him
---
## 🚶 Judas Iscariot, One Of The Twelve, Went Unto The Chief Priests

Mark repeats "one of the twelve" to underline how shocking this betrayal was.

Judas was not an outsider or an enemy who infiltrated the group.

He had walked with Jesus through every mile of this ministry.

Betrayal from inside a trusted circle wounds differently than an outside attack.

🚶 Judas was one of the inner twelve

💔 He had walked with Jesus for years

🗡️ This betrayal came from inside the circle

📖 Mark repeats this fact on purpose

## 😊 When They Heard It, They Were Glad

The chief priests had been plotting quietly without a reliable way in.

Judas suddenly handed them exactly what their secret plan was missing.

Their gladness reveals how calculated and cold this plot truly was.

A disciple's betrayal became the answer to their problem.

😊 The priests had lacked a reliable way in

🎯 Judas solved their exact problem

🧊 Their gladness shows a cold, calculated plot

📖 A disciple's betrayal became their answer

# Mark 14:12-16
# 🏠 Prepare The Passover
---
## 🥖 The First Day Of Unleavened Bread, When They Killed The Passover

Passover and Unleavened Bread were two connected feasts often spoken of as one.

The Passover lamb was slaughtered on this day, in the afternoon.

Every family or group needed a lamb and a place to eat it.

The timing here matters because it sets the entire chapter's clock.

🥖 Passover and Unleavened Bread were linked feasts

🐑 The lamb was slaughtered that afternoon

🕰️ Every group needed a lamb and a room

📖 This verse sets the chapter's timeline

## 🏺 There Shall Meet You A Man Bearing A Pitcher Of Water

Carrying water from the well was usually a woman's daily task in that culture.

A man carrying a water pitcher would stand out immediately in a crowd.

This detail functioned as a prearranged, silent signal for the two disciples.

Jesus had planned this meeting before anyone asked Him a question.

🏺 Carrying water was usually women's work

👀 A man doing it would stand out

🔑 This was a prearranged, silent signal

📖 Jesus had planned ahead of their question

## 🛋️ Say Ye To The Goodman Of The House, The Master Saith

"Goodman" is an old word for the owner or master of a house.

"The Master" was how the disciples commonly referred to Jesus to others.

A prearranged password like this helped protect the location from being leaked.

Secrecy here guarded Jesus from Judas learning the meeting place too soon.

🛋️ Goodman means the house's owner

🗣️ The Master was a disciple's title for Jesus

🔒 This password protected the meeting place

📖 Secrecy kept Judas from learning it early

## 🕯️ A Large Upper Room Furnished And Prepared

"Furnished" meant the room already had low tables and cushions for reclining.

Guests at a formal meal in that culture ate while reclining, not sitting upright.

The room being ready saved the disciples real time and labor.

Jesus had arranged every detail long before they arrived to prepare it.

🕯️ Furnished means ready with tables and cushions

🛋️ Guests reclined to eat, they did not sit

⏱️ The ready room saved real time

📖 Jesus arranged every detail in advance

## ✅ His Disciples Went Forth And Found As He Had Said

The two disciples went into the city exactly as Jesus instructed them.

Everything happened precisely the way He said it would happen.

No detail, down to a stranger carrying water, proved to be wrong.

Small, specific predictions like this build trust for the larger ones still coming.

🚶 The disciples obeyed the exact instructions given

✅ Everything happened exactly as Jesus said

🔍 Even the smallest detail proved true

📖 Small proofs build trust for bigger ones

# Mark 14:17-21
# 🍽️ One Of You Shall Betray Me
---
## 🌙 In The Evening He Cometh With The Twelve

Passover meals in that culture were always eaten at night, not midday.

The evening timing followed the instructions first given at the exodus from Egypt.

Jesus sits down to this meal already knowing exactly what the night holds.

Nothing about this meal is random or accidental.

🌙 Passover meals were always eaten at night

📜 This followed the original exodus instructions

👁️ Jesus already knew what the night held

📖 Nothing about this meal is accidental

## 😰 One Of You Which Eateth With Me Shall Betray Me

Sharing a meal in that culture was a sign of trust and loyalty.

Betrayal from a table companion broke one of the deepest ancient bonds.

This line echoes an old psalm about a trusted friend turning traitor.

Jesus names the coming betrayal before it happens, not after.

😰 Shared meals signaled trust and loyalty

💔 A table companion's betrayal broke that bond deeply

📜 This echoes an old psalm's exact language

📖 Jesus names the betrayal before it happens

## ❓ They Began To Be Sorrowful, And To Say, Is It I

Each disciple questions himself rather than immediately suspecting someone else.

Their sorrow shows real love for Jesus, not just shock at the news.

Not one of them claims certainty that it could not be him.

Honest self doubt replaces confident self defense around that table.

❓ Each disciple questions himself first

😢 Their sorrow shows genuine love for Jesus

🙅 No one claims certainty it is not him

📖 Honest doubt replaces confident self defense

## 🍲 It Is One Of The Twelve, That Dippeth With Me In The Dish

Sharing a common dish at a meal was an act of close intimacy.

Jesus does not name Judas directly, even now, in front of the group.

The betrayer is sitting close enough to share the very same food.

Nearness to Jesus never guaranteed loyalty to Him.

🍲 Sharing a dish meant close intimacy

🤐 Jesus still does not name Judas directly

📍 The betrayer sat physically near Him

📖 Nearness to Jesus did not guarantee loyalty

## ⚖️ Good Were It For That Man If He Had Never Been Born

This line states the weight of Judas's choice in the starkest terms possible.

Jesus had already said the Son of man's path was written in scripture.

A fixed, foretold plan did not erase Judas's own personal responsibility.

Divine purpose and human guilt stand together in this one verse.

⚖️ This names the full weight of the choice

📜 Jesus already called this path foretold

🙋 A foretold plan did not erase Judas's guilt

📖 Divine purpose and human guilt stand together

# Mark 14:22-25
# 🍷 This Is My Body
---
## 🍞 He Took Bread, And Blessed, And Brake It

"Blessed" here follows the normal Jewish custom of thanking God before a meal.

Breaking bread was an ordinary part of every shared meal in that culture.

Jesus takes this familiar, everyday action and fills it with new meaning.

Something ordinary becomes the center of a brand new memory.

🍞 Blessed means giving thanks before eating

🤲 Breaking bread was a normal meal custom

✨ Jesus fills the ordinary with new meaning

📖 An everyday action becomes a new memory

## 🩸 This Is My Body

Jesus is not announcing a magic trick that changes bread into flesh.

He is giving His disciples a picture of His body about to be broken.

The bread they eat every day will now point forward to His death.

He explains His coming death before it happens, in their own hands.

🩸 Jesus points to His body, soon broken

🍞 Ordinary bread becomes a lasting picture

🔮 He explains His death before it happens

📖 They hold the picture in their own hands

## 🍷 My Blood Of The New Testament, Which Is Shed For Many

"Testament" here means covenant, a binding agreement sealed with blood.

This echoes Moses sealing the old covenant with the blood of animals.

Shed for many points to His death covering a wide, waiting crowd.

A new covenant begins at this table, sealed by a far greater cost.

🍷 Testament means a covenant sealed in blood

📜 This echoes Moses sealing the old covenant

🌍 Shed for many means a wide reach

📖 A greater covenant begins at this table

## 🍇 I Will Drink No More Of The Fruit Of The Vine

Jesus makes a personal vow to fast from wine starting at this exact meal.

The fruit of the vine is simply an old way of saying wine.

His vow points forward to a future meal in God's coming kingdom.

Even here, His eyes are fixed past the cross and into future joy.

🍇 Fruit of the vine means wine

🤐 Jesus vows to fast from it now

👑 He looks forward to a future kingdom meal

📖 His eyes stay fixed on future joy

# Mark 14:26-31
# 🫒 Before The Cock Crow Twice
---
## 🎶 When They Had Sung An Hymn, They Went Out

Jewish Passover meals traditionally closed with singing a set of psalms, called the Hallel.

This hymn would have included songs of praise even while facing coming danger.

The Mount of Olives sat just across a valley from the upper room.

Jesus walks straight from worship into the night that will undo Him.

🎶 They sang the traditional Passover Hallel psalms

🙏 They praised God while danger was near

⛰️ The Mount of Olives was close by

📖 Worship led straight into His hardest night

## 🐑 I Will Smite The Shepherd, And The Sheep Shall Be Scattered

Jesus quotes directly from the prophet Zechariah, written centuries earlier.

A shepherd being struck down naturally sends a flock running in fear.

Jesus predicts His own disciples will scatter the very same night.

Scripture had already described this exact moment long before it happened.

🐑 Jesus quotes the prophet Zechariah

🏃 A struck shepherd sends the flock running

👥 He predicts His own disciples will scatter

📖 Scripture described this night in advance

## 🌅 After That I Am Risen, I Will Go Before You Into Galilee

Jesus speaks about His resurrection before anyone else believes it is coming.

Galilee was home territory, far from the danger surrounding Jerusalem.

A promise of reunion sits right beside His prediction of their failure.

Their coming scattering will not be the end of the story.

🌅 Jesus predicts His own resurrection here

🏡 Galilee was their familiar home region

🤝 He promises reunion despite their coming failure

📖 Their scattering will not be the final word

## 💪 Although All Shall Be Offended, Yet Will Not I

Peter's confidence sounds brave, but it quietly contradicts Jesus's own words.

He sets himself above the other eleven disciples in this one claim.

Confidence in his own strength blinds him to how weak he really is.

The loudest promise in this chapter will be the first one broken.

💪 Peter's confidence contradicts Jesus directly

👆 He sets himself above the other eleven

🙈 His confidence blinds him to real weakness

📖 His loudest promise breaks first

## 🔥 He Spake The More Vehemently, Likewise Also Said They All

"Vehemently" means with intense force, far beyond a calm, simple reply.

Peter does not quiet down after Jesus corrects him, he pushes harder.

The other eleven disciples all repeat the very same confident promise.

A whole room agrees together on something none of them can keep.

🔥 Vehemently means with intense force

📢 Peter pushes harder instead of listening

👥 All eleven repeat the same promise

📖 A whole room agreed on a broken promise

## 🐓 Before The Cock Crow Twice, Thou Shalt Deny Me Thrice

Only Mark records the detail of the rooster crowing twice, not once.

A denial means publicly refusing to admit any connection to Jesus.

Jesus names the exact number of denials before even one has happened.

Precise knowledge like this reveals Jesus is not surprised by what comes.

🐓 Mark alone records two separate crows

🙅 Denial means publicly refusing to know Jesus

🔢 Jesus names the number before it happens

📖 This precision shows He is not surprised

# Mark 14:32-36
# 🫒 Gethsemane
---
## 🫒 They Came To A Place Which Was Named Gethsemane

"Gethsemane" literally means oil press, a place where olives were crushed for oil.

The name itself pictures exactly what is about to happen to Jesus there.

He brings His disciples to this specific, familiar place to pray.

The setting becomes a quiet image of the pressure closing in on Him.

🫒 Gethsemane means oil press

🪨 Olives were crushed there for oil

📍 Jesus chose this familiar place to pray

📖 The setting pictures the pressure ahead

## 👥 He Taketh With Him Peter And James And John

These three disciples appear together at several major turning points in the Gospels.

They already witnessed the Transfiguration, a moment of overwhelming glory.

Now they witness the opposite, overwhelming sorrow instead of glory.

Jesus wanted witnesses for both His brightest hour and His heaviest one.

👥 These three appear at major turning points

✨ They already saw the Transfiguration's glory

💔 Now they witness overwhelming sorrow instead

📖 Jesus wanted witnesses for both extremes

## 😨 He Began To Be Sore Amazed, And To Be Very Heavy

"Sore amazed" describes shock and distress far beyond ordinary sadness.

This reaction appears nowhere else in the Gospels at this same intensity.

Jesus is not performing calm acceptance in front of His closest friends.

His honest anguish here makes His later obedience even more costly.

😨 Sore amazed means deep shock and distress

🆕 This intensity appears nowhere else in the Gospels

🎭 Jesus shows real anguish, not calm performance

📖 Honest anguish makes His obedience costlier

## 💔 My Soul Is Exceeding Sorrowful Unto Death

This phrase echoes language from the Psalms describing deep, crushing grief.

Jesus names a sorrow heavy enough to feel like dying from it.

He says this plainly to Peter, James, and John, not hiding it from them.

Naming pain honestly is not the same thing as giving up.

💔 This echoes sorrowful language from the Psalms

⚰️ The grief feels as heavy as death

🗣️ Jesus names this pain to His friends openly

📖 Honest pain is not the same as quitting

## 🙏 Abba, Father, All Things Are Possible Unto Thee

"Abba" is an intimate Aramaic word, close to how a child says dad.

Using this word in prayer was unusually personal for that culture.

Jesus brings His rawest request to a Father He trusts completely.

Intimacy with God and honest desperation sit together in one prayer.

🙏 Abba is an intimate word like dad

❤️ This was unusually personal for that culture

🧎 Jesus brings His rawest request to God

📖 Intimacy and desperation sit together here

## 🍷 Take Away This Cup From Me

"Cup" is a biblical image often used for God's judgment and wrath.

Jesus is not merely asking to avoid physical pain or death alone.

He faces the weight of standing in judgment's place for others.

Even here, His request ends by yielding to His Father's will.

🍷 Cup pictures God's judgment elsewhere in scripture

⚖️ Jesus faces more than ordinary pain

🙇 He stands in judgment's place for others

📖 His request still ends in yielding

# Mark 14:37-42
# 😴 Could Not Thou Watch One Hour
---
## 😴 Simon, Sleepest Thou, Couldest Not Thou Watch One Hour

Jesus calls Peter by his original name, Simon, not his new name.

That choice quietly recalls Peter's bold promise made only hours earlier.

One hour of watching proved harder than Peter's confident words suggested.

Good intentions did not translate into staying alert in the moment.

😴 Jesus uses Peter's old name, Simon

⏳ This recalls his bold promise earlier

💤 One hour proved harder than his words

📖 Good intentions did not keep him alert

## ⚔️ The Spirit Truly Is Ready, But The Flesh Is Weak

Jesus names a real gap between sincere desire and actual physical ability.

The disciples genuinely wanted to stay faithful in this moment.

Exhaustion, fear, and sorrow had simply overwhelmed their bodies that night.

Watching and praying was given as the remedy for exactly this gap.

⚔️ A gap exists between desire and ability

❤️ Their desire to stay faithful was real

😩 Exhaustion overwhelmed their bodies that night

📖 Prayer was given as the remedy

## 🔁 Again He Went Away, And Prayed The Same Words

Jesus returns to pray a second time, repeating His earlier request.

Repetition here is not doubt, it reflects persistent, honest wrestling.

Each cycle of prayer brings Him closer to full acceptance.

Even Jesus needed to return to prayer more than once.

🔁 Jesus prays the same request again

🙏 Repetition reflects honest wrestling, not doubt

📈 Each round brings Him closer to acceptance

📖 Even Jesus returned to prayer repeatedly

## 😔 He Found Them Asleep Again, For Their Eyes Were Heavy

This is now the second time Jesus finds His closest friends sleeping.

"Wist" is an old word meaning knew, used to describe their confusion.

Shame kept them from finding any good explanation to offer Him.

Their silence here contrasts sharply with their loud promises earlier.

😔 This was the second time they slept

📖 Wist is an old word meaning knew

😳 Shame left them without any explanation

➡️ Their silence contrasts their earlier loud promises

## ⏰ It Is Enough, The Hour Is Come

"Enough" signals the waiting itself has finally reached its end.

"The hour" refers back to the appointed time of His suffering.

Jesus states this plainly, without panic or last minute hesitation.

He walks toward what is coming rather than waiting for it to arrive.

⏰ Enough means the waiting has ended

🔮 The hour means His appointed suffering

😌 Jesus states this without panic

📖 He walks toward it, not waits for it

## 🚶 Rise Up, Let Us Go

This short command shifts the entire scene from stillness to motion.

Jesus does not try to flee or delay the coming arrest.

He chooses to walk out and meet His betrayer directly.

Courage here looks like moving forward, not standing still in fear.

🚶 The scene shifts from stillness to motion

🙅 Jesus does not try to flee

🤝 He walks out to meet His betrayer

📖 Courage here means moving forward

# Mark 14:43-46
# 😘 Betrayed With A Kiss
---
## ⚔️ A Great Multitude With Swords And Staves

"Staves" means wooden clubs, heavy sticks used as crude weapons.

This armed crowd came from the chief priests, scribes, and elders directly.

Jesus had taught peacefully in the temple for days without resistance like this.

The scale of this force reveals how seriously they feared Him.

⚔️ Staves means heavy wooden clubs

🏛️ This force came from the Jewish leaders

🕊️ Jesus had taught peacefully for days

📖 The scale shows how much they feared Him

## 😘 Whomsoever I Shall Kiss, That Same Is He

A kiss normally greeted a respected teacher with honor and affection.

Judas turns that same gesture into the exact signal for an arrest.

"Token" simply means a prearranged sign agreed on beforehand.

Twisting an act of love into a weapon makes betrayal cut deeper.

😘 A kiss normally showed honor to a teacher

🔑 Token means a sign agreed on in advance

🗡️ Judas turned affection into a weapon

📖 Twisted love cuts deeper than open hate

## 🙇 Master, Master, And Kissed Him

Judas repeats the respectful title twice, as if nothing has changed.

The repetition makes the coming betrayal feel even more calculated and cold.

Mark's word for kissed here suggests something fervent, not quick or casual.

A show of devotion covers the very moment devotion is abandoned.

🙇 Master repeated twice sounds falsely warm

🧊 The repetition makes the betrayal feel colder

💋 The kiss itself was fervent, not casual

📖 Devotion's appearance covered its abandonment

## 🤲 They Laid Their Hands On Him, And Took Him

The arrest happens quickly, without any struggle or resistance from Jesus.

Every warning Jesus gave earlier in this chapter is now fulfilled.

He had already chosen this moment back in the garden.

What looks like defeat is actually a plan unfolding on time.

🤲 The arrest happened without resistance

✅ His earlier warnings are now fulfilled

🫒 He had already chosen this in the garden

📖 This looked like defeat but was on time

# Mark 14:47-52
# 🗡️ They All Forsook Him And Fled
---
## 👂 Drew A Sword, And Smote A Servant Of The High Priest

Mark does not name this disciple, though another Gospel identifies him as Peter.

Cutting off an ear was a sudden, violent, and ultimately pointless act.

This single sword could never have stopped an entire armed crowd.

Fear sometimes reacts with force exactly when force cannot help.

👂 Mark leaves this disciple unnamed

⚔️ Cutting off an ear was violent and sudden

🙅 One sword could not stop the crowd

📖 Fear can react with force that cannot help

## 🗡️ As Against A Thief, With Swords And With Staves

Jesus points out the strange mismatch between the arrest and the crime.

A thief might require weapons to subdue, a teacher does not.

I was daily with you in the temple teaching notes His constant visibility.

An open, peaceful teacher was arrested like a dangerous, hidden criminal.

🗡️ Jesus notes the mismatch in force used

📚 He taught openly in the temple daily

👀 He was never hiding from anyone

📖 A peaceful teacher was treated like a criminal

## 📜 The Scriptures Must Be Fulfilled

Jesus does not treat this night as random or out of control.

He reads this exact moment through the lens of written prophecy.

Fulfillment language ties this arrest back to God's long standing plan.

Even betrayal and ambush fit inside a far larger story.

📜 Jesus reads this night through prophecy

🧩 Fulfillment ties this to God's long plan

🗺️ Nothing here is random or unplanned

📖 Even ambush fits a larger story

## 🏃 They All Forsook Him, And Fled

Every single disciple abandons Jesus at the moment He needs them most.

This fulfills His own prediction made earlier that same night.

Their courage from the upper room evaporates completely under real pressure.

Prediction and failure line up exactly as Jesus said they would.

🏃 Every disciple abandoned Him here

🔮 This fulfills His earlier prediction exactly

💨 Their earlier courage evaporated under pressure

📖 Prediction and failure matched perfectly

## 👕 A Certain Young Man, Having A Linen Cloth Cast About His Naked Body

This unnamed detail appears only in Mark's Gospel, nowhere else.

Many readers believe this young man may have been Mark himself.

Wearing only a linen cloth suggests he was roused suddenly from sleep.

A small, personal detail like this reads like an eyewitness's own memory.

👕 This detail is unique to Mark's Gospel

✍️ Many believe this may be Mark himself

🛌 A single cloth suggests sudden waking

📖 It reads like an eyewitness's own memory

## 🏃 He Left The Linen Cloth, And Fled From Them Naked

The young men in the crowd grab hold of his only garment.

He chooses to escape rather than hold onto what covered him.

Fleeing naked meant total, humiliating exposure in front of a crowd.

Even a passing bystander could not escape that night's total chaos.

🏃 He chose escape over his own garment

😳 Fleeing naked meant total exposure

👥 A crowd of soldiers grabbed at him

📖 Even bystanders were caught in the chaos

# Mark 14:53-59
# ⚖️ Before The Council
---
## 🏛️ Led Jesus Away To The High Priest, All The Council Assembled

"The council" refers to the Sanhedrin, Israel's highest religious court.

Chief priests, elders, and scribes together formed this governing body.

Gathering all of them this quickly, at night, was itself unusual.

This urgency suggests a trial arranged in advance, not a fair process.

🏛️ Council means the Sanhedrin, Israel's high court

👥 Priests, elders, and scribes made up this body

🌙 Gathering this fast at night was unusual

📖 Urgency suggests the trial was prearranged

## 🔭 Peter Followed Him Afar Off

"Afar off" shows Peter's courage already shrinking under real danger.

He follows close enough to still see what happens to Jesus.

Yet he stays far enough back to avoid being noticed himself.

This careful distance pictures exactly where his loyalty stood that night.

🔭 Afar off shows his shrinking courage

👀 He stayed close enough to watch

🙈 He stayed far enough to avoid notice

📖 Distance pictured his loyalty that night

## 🔥 Sat With The Servants, And Warmed Himself At The Fire

Peter sits down among the high priest's own household servants.

Warming himself by the fire gave him a plain reason to linger nearby.

This ordinary act placed him right where danger could find him.

A small comfort put him exactly where his next test would come.

🔥 Peter sat among the high priest's servants

🧍 The fire gave him a reason to stay

⚠️ This placed him right where danger waited

📖 Comfort led him to his next test

## 🔍 Sought For Witness Against Jesus, And Found None

The court is actively hunting for evidence instead of weighing it with honesty.

Jewish law required consistent testimony from at least two separate witnesses.

Searching this hard and still finding nothing speaks to His innocence.

A trial built to convict still could not manufacture real guilt.

🔍 The court hunted for evidence, not truth

⚖️ Jewish law required two matching witnesses

🙅 Finding nothing points to real innocence

📖 Guilt could not be manufactured here

## 🗣️ Many Bare False Witness Against Him, But Their Witness Agreed Not Together

False testimony came forward easily, yet it still kept contradicting itself.

Agreement between witnesses was the legal standard this trial needed to meet.

Even manufactured lies could not line up cleanly with each other.

Truth has a way of exposing lies even inside a rigged process.

🗣️ False testimony still contradicted itself

⚖️ Matching testimony was the required legal standard

🧩 Even lies could not line up cleanly

📖 Truth exposed lies inside a rigged trial

## 🏛️ I Will Destroy This Temple That Is Made With Hands

This twisted quote distorts something Jesus once said about His own body.

Made with hands described the physical temple built by human builders.

Without hands pointed instead to resurrection, something God alone would do.

Witnesses repeated His words while missing their actual meaning completely.

🏛️ This twists an earlier saying of Jesus

🧱 Made with hands means the physical temple

✨ Without hands pointed to resurrection instead

📖 Witnesses repeated words but missed the meaning

## 🔁 Neither So Did Their Witness Agree Together

This exact phrase repeats almost word for word from a few verses earlier.

Mark repeats it on purpose to underline the trial's complete failure.

Two separate attempts at false testimony both collapsed the same way.

A court determined to convict still could not make its lies match.

🔁 This phrase repeats from a few verses earlier

🎯 Mark repeats it to stress total failure

🧩 Two attempts at lying both collapsed

📖 A rigged court still could not match lies

# Mark 14:60-65
# 🔇 I Am
---
## 🔇 He Held His Peace, And Answered Nothing

Jesus stays completely silent in the face of a mounting, unfair trial.

This silence matches a prophecy written centuries earlier in Isaiah.

A guilty man desperate to escape would normally fight every accusation.

His calm, deliberate silence itself becomes a quiet form of testimony.

🔇 Jesus answers the accusations with silence

📜 This matches Isaiah's ancient prophecy

🙅 A guilty man would normally fight back

📖 His silence becomes its own testimony

## 👑 Art Thou The Christ, The Son Of The Blessed

"The Blessed" was a reverent Jewish way of referring to God indirectly.

Christ means the anointed one, Israel's long awaited promised deliverer.

The high priest finally asks the one question everything has circled around.

This question forces Jesus to either deny His identity or claim it plainly.

👑 The Blessed is a reverent name for God

🕊️ Christ means the anointed, promised deliverer

🎯 This is the question everything circled toward

📖 Jesus must deny or claim it plainly

## ☁️ I Am, And Ye Shall See The Son Of Man Coming In The Clouds

Jesus answers plainly, with no hedging or careful political language.

He joins two prophecies together, from the Psalms and from Daniel.

Right hand of power pictures supreme, divine authority and honor.

Coming in the clouds pictures arriving with full, undeniable divine authority.

☁️ Jesus answers with total plainness

📜 He joins Psalms and Daniel together

👑 Right hand of power means divine honor

📖 Clouds pictured arriving with divine authority

## 😠 The High Priest Rent His Clothes

Tearing one's own garments was a traditional Jewish expression of grief or outrage.

Leaders were normally forbidden from this act under ordinary circumstances.

Breaking his own rule here reveals real, dramatic indignation.

This gesture signals the verdict before any formal vote is taken.

😠 Tearing clothes showed grief or outrage

📏 Leaders were usually forbidden to do this

🎭 Breaking the rule showed real indignation

📖 The gesture signaled the verdict early

## ⚖️ They All Condemned Him To Be Guilty Of Death

The verdict arrives immediately, with no deliberation or careful weighing of evidence.

Blasphemy meant claiming an honor or identity that belonged to God alone.

The council treats His plain answer as proof enough to convict.

A true claim about Himself becomes the official reason for His execution.

⚖️ The verdict came with no real deliberation

🙅 Blasphemy meant claiming an honor only God holds

🧾 His true answer became their proof

📖 Truth about Himself became His death sentence

## 👊 Spit On Him, And To Buffet Him, Saying, Prophesy

"Buffet" means to strike with a closed fist, a direct blow.

Mocking Him to prophesy targeted His identity as a true prophet of God.

The soldiers turn His own claim into a cruel, public joke.

Humiliation here becomes a weapon aimed straight at who He said He was.

👊 Buffet means striking with a closed fist

🎭 Prophesy mocked His claim to be a prophet

😔 His identity became the target of the joke

📖 Humiliation targeted His own identity directly

# Mark 14:66-72
# 😭 Peter Denies Him Thrice
---
## 🔥 One Of The Maids Of The High Priest, Thou Also Wast With Jesus

Peter sits in the very courtyard where Jesus is being tried.

A single servant girl recognizes him simply by sight, nothing more.

This is the exact moment his earlier bold promise gets tested.

Real pressure, not a hostile soldier, is what finally exposes his fear.

🔥 Peter sits in the same courtyard as Jesus

👁️ A servant girl recognizes him by sight

🎯 This tests his earlier bold promise

📖 Ordinary pressure exposed his fear

## 🙅 I Know Not, Neither Understand I What Thou Sayest

Peter's first denial is careful, worded like a confused misunderstanding.

He does not shout a dramatic lie, he simply plays dumb.

Stepping out to the porch puts more physical distance between them.

Small, quiet denials are often easier to tell than loud ones.

🙅 His first denial sounds like confusion

🎭 He played dumb instead of lying loudly

🚶 He moved further away toward the porch

📖 Quiet denials come easier than loud ones

## 👥 This Is One Of Them

A different maid repeats the same accusation to the people standing nearby.

Peter denies it again, this time to a wider audience listening.

Each denial grows a little louder and a little more public.

Escaping one accusation only led him straight into a second one.

👥 A different maid repeats the accusation

📢 Peter denies it to a wider audience

📈 Each denial grows louder and more public

📖 Escaping one led straight into another

## 🗣️ Surely Thou Art One Of Them, For Thou Art A Galilaean

Galilee had its own recognizable regional accent, different from Jerusalem's speech.

Peter's own voice betrayed him before any witness could point a finger.

No disguise or careful wording could hide where he had come from.

The very voice that once confessed Jesus now gave him away.

🗣️ Galilee had its own regional accent

🎙️ Peter's voice betrayed him on its own

🙅 No disguise could hide his origin

📖 His own voice gave him away

## 😡 He Began To Curse And To Swear, Saying, I Know Not This Man

Peter's third denial escalates into cursing and swearing an oath.

This is no longer careful wording, it is desperate, forceful denial.

I know not this man strips away even using Jesus's name.

Fear had pushed him from quiet evasion into outright, forceful rejection.

😡 His third denial includes cursing and oaths

📈 This denial is desperate, not careful

🙅 He will not even say Jesus's name

📖 Fear pushed him into forceful rejection

## 😢 The Second Time The Cock Crew, And He Wept

The second rooster crow lands exactly where Jesus said it would.

Peter suddenly remembers the precise words Jesus spoke to him earlier.

Memory, not accusation, is what finally breaks through his fear.

His weeping shows real grief, not just getting caught in public.

😢 The second crow matched Jesus's exact words

🧠 Peter remembered what Jesus had told him

💔 Memory broke through his fear, not accusation

📖 His tears showed real grief, not shame alone`.trim();

export const MARK_FOURTEEN_PERSONAL_SECTIONS = parseMarkFourteenRawNotes(MARK_FOURTEEN_RAW_NOTES);
