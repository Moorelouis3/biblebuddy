export type MatthewEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewEightRawNotes(rawText: string): MatthewEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 8:${startVerse}` : `Matthew 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 8 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_EIGHT_RAW_NOTES = `# Matthew 8:1-4
# 🧼 The Leper Who Worshipped
---
## 👥 Great Multitudes Followed Him

Jesus had just finished teaching the Sermon on the Mount in chapter seven.

Walking down from the mountain, a large crowd was already following him.

His words had drawn people in, and now they wanted to see what he would do.

This links the teaching just given to the actions that follow right after it.

👥 A large crowd was already following him

👂 His words had drawn people in

🔗 Teaching leads straight into action here

📖 What he says and does now connect

---

## 🧴 There Came A Leper

"Leper" names someone with a serious skin disease that spread and disfigured the body.

Under the law in Leviticus, a leper was considered ritually unclean.

That meant living outside the normal camp or city, cut off from family and worship.

This man was risking a public approach to a crowded teacher while still unclean.

🧴 Leprosy was a serious, disfiguring disease

🚫 It made a person ritually unclean

🏕️ Lepers lived apart from the community

📖 This man risked approaching Jesus anyway

---

## 🙇 Worshipped Him

"Worshipped" here means he bowed low to the ground before Jesus.

This was more than polite respect shown to a teacher or rabbi.

The posture itself showed he already saw Jesus as someone far above himself.

His actions matched the faith he was about to put into words.

🙇 Worshipped means bowing low to the ground

🎓 This went beyond respect for a teacher

👑 His posture showed who he believed Jesus was

📖 His actions matched his coming words

---

## 🙏 Lord, If Thou Wilt, Thou Canst Make Me Clean

The leper never doubted that Jesus had the power to heal him.

"If thou wilt" means his only real question was whether Jesus was willing.

"Clean" points to more than healed skin, it means ritually clean again too.

Being clean would let him rejoin worship and ordinary life with others.

💪 He never doubted Jesus had the power

🙏 His only question was Jesus's will

✨ Clean meant ritually clean, not just healed

📖 Clean meant rejoining worship and community

---

## 🤲 Jesus Put Forth His Hand, And Touched Him

The law warned against touching a leper, since it spread uncleanness to the one who touched.

Jesus reaches out anyway, breaking the normal custom on purpose.

Instead of Jesus becoming unclean, the leper becomes clean.

The touch itself already answers the question the leper had just asked.

🚫 Touching a leper normally spread uncleanness

🤲 Jesus reaches out and breaks that custom

🔄 The leper becomes clean instead

📖 The touch answers the leper's question

---

## ✅ I Will, Be Thou Clean

Jesus answers using the exact wording of the leper's own request.

"I will" settles the only doubt the man had raised.

"Be thou clean" is a command, not a wish or a prayer to someone else.

The healing happens simply because Jesus speaks it.

🗣️ Jesus answers using the man's own words

✅ I will settles his only doubt

🫴 Be clean is a command, not a prayer

📖 Jesus heals by speaking alone

---

## 🤫 See Thou Tell No Man

Jesus tells the healed man to keep this quiet for now.

A miracle like this could draw crowds looking for a political or military leader.

Jesus was not ready for that kind of attention yet.

This same caution shows up again later in his ministry.

🤫 Jesus tells him to stay quiet for now

👥 A miracle like this draws the wrong crowd

🛑 Jesus was not ready for that attention

📖 This same caution returns later in his ministry

---

## 🧑‍⚖️ Shew Thyself To The Priest

The law in Leviticus required a priest to formally examine a healed leper.

Only the priest could officially declare someone clean again.

Without that step, the man could not fully rejoin community life and worship.

Jesus tells him to follow that process instead of skipping it.

📜 Leviticus required a priest's examination

✅ Only a priest could declare him clean

🏠 Rejoining community needed that official step

📖 Jesus sends him through the proper process

---

## 🧾 Offer The Gift That Moses Commanded, For A Testimony Unto Them

Leviticus fourteen lists a specific offering required after a leper was healed.

Bringing that offering was proof the healing had actually happened.

"Testimony" means evidence, something the priests themselves could witness and confirm.

This miracle was never meant to stay hidden from the official record of that day.

📋 Leviticus listed a specific required offering

🧾 The offering proved the healing was real

👀 Testimony means evidence the priests could see

📖 The miracle entered the official record

# Matthew 8:5-10
# 🎖️ The Centurion's Faith
---
## 🏘️ When Jesus Was Entered Into Capernaum

Capernaum was a fishing town on the north shore of the Sea of Galilee.

Jesus used it as his home base for much of his ministry in this region.

A Roman garrison likely was stationed there to guard nearby trade routes.

That explains why a Roman officer was present in a small Jewish town at all.

🏘️ Capernaum sat on the Sea of Galilee

🏠 Jesus used it as his ministry base

🪖 A Roman garrison was likely stationed there

📖 This explains the centurion's presence there

---

## 🎖️ There Came Unto Him A Centurion, Beseeching Him

A centurion commanded about one hundred soldiers in the Roman army.

He represented the occupying power ruling over Judea at this time.

"Beseeching" means begging earnestly, not making a casual request.

A Roman officer coming humbly to a Jewish teacher was unusual on both sides.

🎖️ A centurion commanded about a hundred soldiers

🏛️ He represented the occupying Roman army

🙏 Beseeching means begging earnestly

📖 A Roman seeking a Jewish teacher was unusual

---

## 🩺 My Servant Lieth At Home Sick Of The Palsy, Grievously Tormented

"Palsy" names a condition causing paralysis or severe shaking.

"Grievously tormented" shows this was no minor illness.

A servant's health mattered enough to this man that he came looking for help himself.

That detail already said something about how he treated those under him.

🩺 Palsy caused paralysis or severe shaking

⚠️ Grievously tormented means severe suffering

❤️ He personally sought help for his servant

📖 This showed how he treated those under him

---

## ✅ I Will Come And Heal Him

Jesus agrees before the centurion even finishes explaining what he wants.

This offer meant Jesus entering a Gentile home, something many Jews avoided.

Jesus shows no hesitation about crossing that line.

His willingness sets up the surprising response that follows.

✅ Jesus agrees before being fully asked

🏠 This meant entering a Gentile home

🙅 Jesus shows no hesitation about that

📖 His willingness sets up what follows

---

## 🙇 Lord, I Am Not Worthy That Thou Shouldest Come Under My Roof

The centurion stops Jesus from making that trip at all.

He recognizes a real gap between himself and who Jesus is.

This kind of humility from a Roman officer was rare toward anyone.

He is not refusing the healing, only the need for Jesus to travel.

🛑 He stops Jesus from making the trip

🙇 He recognizes a real gap between them

😲 This humility was rare from an officer

📖 He refuses the trip, not the healing

---

## 🗣️ But Speak The Word Only, And My Servant Shall Be Healed

The centurion believes Jesus can heal from a distance with a single spoken word.

No touch, no physical presence, no ritual is required in his mind.

This is a bigger claim about Jesus's authority than the leper made back in verse two.

He treats Jesus's word itself as enough to change reality.

🗣️ He believes one spoken word is enough

📏 No touch or presence is required

⬆️ This claim goes beyond the leper's request

📖 Jesus's word alone can change reality

---

## ⚔️ For I Am A Man Under Authority, Having Soldiers Under Me

The centurion explains his faith using the one system he knows well, the army.

He gives an order, and soldiers under him obey it without question.

He assumes Jesus must carry an even larger authority behind his words.

This military picture becomes his reason for why Jesus need not travel there himself.

⚔️ He explains faith using military command

📋 His own orders are obeyed without question

🔗 He assumes Jesus holds a larger authority

📖 This becomes his case for Jesus's power

---

## 📝 I Say To This Man, Go, And He Goeth

The centurion lists three simple commands and their instant results.

Go, come, and do this all work the same way under his authority.

He is building toward one clear point about how real authority functions.

A word spoken with real authority behind it needs no repeating or enforcing.

📝 He lists three simple commands

⚡ Each command gets an instant result

🎯 He builds toward one clear point

📖 Real authority needs no enforcing

---

## 😲 When Jesus Heard It, He Marvelled

"Marvelled" means Jesus himself was genuinely amazed.

This is one of very few moments the Gospels describe Jesus reacting with surprise.

A Gentile soldier's grasp of his authority outran what Jesus was finding among his own people.

The reaction signals just how unusual this moment truly was.

😲 Marvelled means genuinely amazed

🎭 This is a rare moment of surprise

🔀 A Gentile understood more than expected

📖 This shows how unusual the moment was

---

## 📊 I Have Not Found So Great Faith, No, Not In Israel

"Verily" is an old word meaning truly or certainly.

Jesus states plainly that this Gentile's faith outranked anything he had found among his own people.

Israel had the scriptures, the temple, and the promises, yet faith like this was still rare there.

This moment quietly points toward Gentiles being welcomed into what God is doing.

✅ Verily means truly or certainly

📊 This faith outranked anything found in Israel

📜 Israel had the promises but not this faith

📖 Gentiles are quietly welcomed in here

# Matthew 8:11-13
# 🍽️ Many From The East And West
---
## 🧭 Many Shall Come From The East And West

This pictures people traveling from every direction, not just from Israel.

Jesus is describing Gentiles joining a feast that many assumed was for Jews alone.

The centurion's faith had just become proof this was already starting to happen.

Geography here stands for who gets included, not simply where people live.

🧭 This pictures people from every direction

🌍 Jesus means Gentiles joining the feast

🎖️ The centurion's faith proved it was starting

📖 Geography stands for who gets included

---

## 🍽️ Sit Down With Abraham, And Isaac, And Jacob, In The Kingdom Of Heaven

Sitting down together pictures a shared meal, a sign of close fellowship in this culture.

Abraham, Isaac, and Jacob were the three founding fathers of Israel's own family line.

Jesus pictures outsiders joining that family feast as honored guests, not servants.

This was a startling claim to make to the Jewish audience listening that day.

🍽️ Sitting together pictures a shared meal

👨‍👨‍👦 Abraham, Isaac, and Jacob founded Israel's line

🤝 Outsiders join as honored guests

📖 This startled the Jewish audience listening

---

## 👪 The Children Of The Kingdom Shall Be Cast Out

"Children of the kingdom" means those who assumed the kingdom belonged to them by birth.

Jesus warns that ancestry alone was never going to be enough.

Being cast out means losing a place that felt guaranteed and secure.

The warning targets faith, or the lack of it, not nationality itself.

👪 Children of the kingdom means natural heirs

🚫 Ancestry alone was never enough

😳 Cast out means losing a secure place

📖 The warning targets faith, not nationality

---

## 🌑 Outer Darkness: There Shall Be Weeping And Gnashing Of Teeth

"Outer darkness" pictures being shut outside a bright, joyful feast, left in the cold and dark.

"Gnashing of teeth" pictures grinding teeth together in pain and regret.

This exact phrase repeats several times later in Matthew's Gospel as a warning.

Jesus reaches for his sharpest language to describe missing out on the kingdom.

🌑 Outer darkness means shut outside the feast

😖 Gnashing of teeth pictures pain and regret

🔁 This phrase repeats later in Matthew

📖 Jesus uses his sharpest warning language

---

## 🔗 Go Thy Way, As Thou Hast Believed, So Be It Done Unto Thee

Jesus ties the healing directly to the centurion's own faith.

"So be it done" means the outcome matches exactly what he believed would happen.

Jesus never had to travel to the house or see the servant at all.

The centurion's faith alone was the ground the healing stood on.

🔗 Jesus ties the healing to his faith

✅ The outcome matches what he believed

🚶 Jesus never had to travel there

📖 Faith alone was the ground here

---

## ⏱️ His Servant Was Healed In The Selfsame Hour

"Selfsame hour" means the very same hour, with no delay at all.

The healing happened the instant Jesus spoke, miles away from the servant.

This confirms the centurion's claim from verse eight was exactly right.

Distance was never a limit on what Jesus's word could do.

⏱️ Selfsame hour means no delay at all

📏 The servant was healed miles away

✅ This confirms the centurion's claim

📖 Distance never limited Jesus's word

# Matthew 8:14-17
# 🤒 Peter's House
---
## 🏠 When Jesus Was Come Into Peter's House

This confirms Peter was married, since his wife's mother lived with them.

Peter's house in Capernaum likely served as a regular base for Jesus this season.

The detail is easy to miss but matters for understanding Peter's actual life.

Ministry here moves from the public road into an ordinary family home.

💍 This confirms Peter was married

🏠 His house was a regular base for Jesus

👀 This detail is easy to miss

📖 Ministry moves into an ordinary home

---

## 🛏️ He Saw His Wife's Mother Laid, And Sick Of A Fever

"Laid" means she was confined to bed, unable to get up on her own.

A fever in this era, without modern medicine, could turn serious or even deadly.

There is no record of anyone asking Jesus to heal her this time.

Jesus simply sees the need and responds without being asked.

🛏️ Laid means confined to bed

🤒 A fever could turn serious without medicine

🙋 No one is recorded asking for healing

📖 Jesus responds without being asked

---

## 🤲 He Touched Her Hand, And The Fever Left Her

Touch again becomes the method, just as it was with the leper in verse three.

"Left her" describes the fever leaving completely, not just easing for a while.

This happens as simply and quickly as every other healing in this chapter.

His touch carries the same authority whether a crowd is watching or not.

🤲 Touch is the method again, like the leper

✅ Left her means fully gone, not eased

⚡ This happens quickly, like the others

📖 His authority holds with no crowd watching

---

## 🍲 She Arose, And Ministered Unto Them

"Ministered" means she got up and served them, likely preparing food for the household.

This detail proves the healing was complete, not just a temporary improvement.

Someone truly sick with a serious fever could not immediately return to physical work.

Her response becomes quiet proof the miracle was fully real.

🍲 Ministered means she served them, likely with food

✅ This proves the healing was complete

💪 Serious fever would not allow quick work

📖 Her response proves the miracle was real

---

## 🌆 When The Even Was Come, They Brought Unto Him Many

"Even" means evening, after the sun had gone down.

Jewish custom often limited certain work and travel during daylight on a Sabbath.

Waiting until evening may explain why so many people arrive all at once.

A whole town's worth of need suddenly shows up at Peter's door.

🌆 Even means evening, after sundown

📅 Daylight travel may have been limited that day

⏳ Waiting explains the sudden rush of people

📖 A town's worth of need arrives at once

---

## 🗣️ He Cast Out The Spirits With His Word, And Healed All That Were Sick

Jesus removes demonic spirits using only spoken words, with no ritual or struggle described.

"All that were sick" means no case was too difficult or too far along.

This matches the pattern already seen throughout the whole chapter, speech alone carries real power.

Nothing in this long list of healings costs Jesus any visible effort.

🗣️ Spirits leave through spoken words alone

💯 All that were sick means no exceptions

🔁 This matches the pattern across the chapter

📖 None of it costs visible effort

---

## 📜 Himself Took Our Infirmities, And Bare Our Sicknesses

Matthew quotes the prophet Esaias, better known today as Isaiah.

This line comes from Isaiah fifty three, originally about a suffering servant figure.

"Infirmities" means weaknesses or sicknesses, and "bare" means carried the weight of them.

Matthew connects Jesus's healing ministry directly to that centuries old prophecy.

📜 Esaias is the prophet known as Isaiah

📖 This quotes the suffering servant passage

🩹 Infirmities means weaknesses or sicknesses

➡️ Matthew ties healing to old prophecy

# Matthew 8:18-22
# 🦊 Foxes Have Holes
---
## 🚣 He Gave Commandment To Depart Unto The Other Side

Jesus chooses to leave the crowds behind and cross to the far side of the Sea of Galilee.

Popularity never becomes Jesus's goal anywhere in this chapter.

This short transition line sets up the boat scene still to come.

A deliberate departure prepares the way for the storm narrative next.

🚣 Jesus leaves the crowd and crosses the lake

🙅 Popularity is never his goal

➡️ This sets up the boat scene ahead

📖 A deliberate choice leads to what follows

---

## 📚 A Certain Scribe Came, And Said Unto Him, Master, I Will Follow Thee

A scribe was a trained expert in Jewish law and scripture.

Scribes usually taught from a safe distance rather than becoming someone's personal disciple.

This scribe offers an enthusiastic, open commitment to follow Jesus anywhere.

His confidence is about to meet an honest answer about the real cost involved.

📚 A scribe was a trained legal expert

🧑‍🏫 Scribes usually kept a teaching distance

🙋 This one offers to follow anywhere

📖 His confidence meets an honest answer

---

## 🧭 Whithersoever Thou Goest

"Whithersoever" is an old word meaning wherever, to any place at all.

The scribe's promise sounds complete and unconditional on the surface.

Jesus is about to test whether that promise can survive real discomfort.

Big claims are often easier to make than they are to actually live out.

🧭 Whithersoever means wherever, any place at all

💬 His promise sounds complete and unconditional

🧪 Jesus is about to test that promise

📖 Big claims are easier made than lived

---

## 🦊 The Foxes Have Holes, And The Birds Of The Air Have Nests

Even wild animals in this picture have a fixed place that belongs to them.

Foxes dig dens, and birds build nests they can return to each night.

Jesus uses ordinary nature that everyone listening would recognize right away.

The comparison is about to turn personal in the very next line.

🦊 Even foxes have a den of their own

🐦 Birds have nests to return to

🌿 Jesus uses ordinary, familiar nature

📖 The comparison turns personal next

---

## 👤 But The Son Of Man Hath Not Where To Lay His Head

"Son of man" was a title Jesus often used for himself, drawn from the prophet Daniel.

Unlike foxes or birds, Jesus has no permanent home of his own during this ministry.

Following him could mean real homelessness, not just inconvenience or hardship.

He tells the scribe the truth up front instead of making the offer sound easier.

👤 Son of man was Jesus's chosen title

🏠 Jesus has no permanent home right now

⚠️ Following could mean real homelessness

📖 He tells the truth before the scribe commits

---

## 👥 Another Of His Disciples Said Unto Him

This second man is already called a disciple, unlike the scribe before him.

He is not a new, hopeful follower, he already belongs to Jesus's circle.

Even someone already following can still struggle with full commitment.

These two requests in a row show different stages of the same real struggle.

👥 This man is already called a disciple

🔄 He is not new like the scribe

⚖️ Even disciples can struggle with commitment

📖 Both requests show the same struggle

---

## 🙏 Lord, Suffer Me First To Go And Bury My Father

"Suffer me" is an old way of saying allow me, or let me.

This request sounds like a simple, reasonable pause before following Jesus.

Many scholars believe this may describe a formal mourning period, not a funeral happening that day.

Either way, he is asking to put a family duty ahead of following right now.

🙏 Suffer me means allow me, or let me

⏸️ The request sounds like a reasonable pause

📜 Many scholars think this means a mourning period

📖 Family duty is placed ahead of following

---

## 💀 Follow Me, And Let The Dead Bury Their Dead

This saying sounds harsh on first read, almost cold toward grief.

Jesus is likely contrasting those who are spiritually dead with the truly dead needing burial.

Other family or community members could usually handle those duties instead.

The call to follow Jesus is placed above even a deeply honored family duty.

😳 This saying sounds harsh at first

💀 Spiritually dead people can bury the dead

👪 Others could usually handle that duty

📖 Following Jesus outranks even family duty

# Matthew 8:23-27
# ⛈️ A Great Calm
---
## 🚣 And When He Was Entered Into A Ship, His Disciples Followed Him

This small boat trip connects directly back to the command to depart in verse eighteen.

The disciples follow without hesitation, unlike the two men just discussed.

Their obedience here quietly contrasts with the excuses given moments before.

A short, calm sentence sets up the sudden danger about to follow.

🚣 This connects to the command in verse eighteen

✅ The disciples follow without hesitation

🔀 This contrasts with the excuses just given

📖 Calm words set up sudden danger

---

## 🌊 There Arose A Great Tempest In The Sea

"Tempest" means a violent, sudden storm with powerful wind and waves.

The Sea of Galilee sits low, surrounded by hills that can funnel wind suddenly onto the water.

Storms there could appear with little warning, even on a previously calm day.

The fishermen among the disciples would have known exactly how dangerous this was.

🌊 Tempest means a violent, sudden storm

⛰️ Surrounding hills could funnel sudden wind

⚡ Storms could appear with little warning

📖 The fishermen knew how dangerous this was

---

## 📏 Insomuch That The Ship Was Covered With The Waves

"Insomuch" is an old word meaning to such a degree, or so much that.

Waves were not just rocking the boat, they were washing directly over it.

A small fishing boat taking on water like this was in real danger of sinking.

The danger here is physical and immediate, not exaggerated for effect.

📏 Insomuch means to such a degree

🌊 Waves were washing directly over the boat

⚠️ The boat was in real danger of sinking

📖 This danger was physical, not exaggerated

---

## 😴 But He Was Asleep

Jesus sleeps through the storm that has the experienced fishermen terrified.

This detail shows his genuine human tiredness after a long season of ministry.

It also sets up a sharp contrast with the power he is about to display.

Complete exhaustion and complete authority sit side by side in this one scene.

😴 Jesus sleeps through the terrifying storm

🧍 This shows his genuine human tiredness

🔀 It sets up a sharp coming contrast

📖 Exhaustion and authority sit side by side

---

## 💀 Lord, Save Us: We Perish

"Perish" means to die, and the disciples believe that outcome is close.

Their cry is short, urgent, and genuinely afraid, not calm or composed.

They still call him Lord even in the middle of real panic.

Frightened faith still turns toward Jesus instead of away from him.

💀 Perish means to die, their real fear

😨 Their cry is short, urgent, and afraid

🗣️ They still call him Lord in panic

📖 Frightened faith still turns toward Jesus

---

## ❓ Why Are Ye Fearful, O Ye Of Little Faith

Jesus questions their fear before he does anything about the actual storm.

"Little faith" does not mean no faith, it means faith that is present but still small.

He names the deeper problem underneath their panic first.

The internal issue gets addressed before the external danger does.

❓ Jesus questions their fear first

📏 Little faith means small, not absent

🎯 He names the deeper problem first

📖 Internal issues come before external ones

---

## 🗣️ He Arose, And Rebuked The Winds And The Sea

"Rebuked" means to sharply correct, the same word used elsewhere for silencing demons.

Jesus speaks directly to wind and water as if they were able to listen and obey.

In this culture, the sea was often seen as a symbol of chaos beyond human control.

Jesus treats that chaos as something fully under his own authority.

🗣️ Rebuked means a sharp correction

🌬️ Jesus speaks directly to wind and water

🌊 The sea often symbolized uncontrollable chaos

📖 Jesus holds authority over that chaos

---

## ⏱️ And There Was A Great Calm

The storm does not simply fade away slowly over time.

It stops completely and immediately, the instant Jesus speaks.

This matches every other healing and miracle pattern already seen in this chapter.

Creation itself responds to his word exactly like sickness and demons already have.

⏱️ The storm stops immediately, not slowly

🗣️ It stops the instant Jesus speaks

🔁 This matches the pattern across the chapter

📖 Creation obeys his word like sickness did

---

## ❓ What Manner Of Man Is This, That Even The Winds And The Sea Obey Him

The disciples' question is bigger than simple relief at being saved.

"What manner of man" asks what kind of category Jesus even fits into.

No normal teacher or prophet could command nature itself this way.

The question is left open here, but the whole Gospel keeps building toward its answer.

❓ Their question is bigger than relief

🧍 They ask what category Jesus fits into

🚫 No normal teacher commands nature this way

📖 The Gospel keeps building toward the answer

# Matthew 8:28-34
# 🐖 The Swine Ran Into The Sea
---
## 🗺️ The Country Of The Gergesenes

This region sat on the eastern side of the Sea of Galilee, outside Jewish territory.

It was largely Gentile land, which explains the pig farming mentioned shortly after.

Jews considered pigs unclean animals, so a Jewish herd like this would be unthinkable.

Jesus crossing here means stepping into territory beyond his usual Jewish audience.

🗺️ This region sat east of Galilee

🏛️ It was largely Gentile land

🐖 Pigs were unclean, unthinkable for Jews

📖 Jesus steps beyond his usual audience

---

## ⚰️ There Met Him Two Possessed With Devils, Coming Out Of The Tombs

These men lived among burial caves, cut off from normal town life.

Living among the dead marked them as outcasts even beyond their illness.

"Possessed with devils" means evil spirits had taken real control over them.

Their location already pictures the death and isolation ruling their lives.

⚰️ They lived among burial caves

🚫 This marked them as complete outcasts

👻 Possessed means evil spirits had control

📖 Their location pictures death ruling them

---

## ⚠️ Exceeding Fierce, So That No Man Might Pass By That Way

"Exceeding fierce" describes extreme, violent danger, not simple strangeness.

These men had made an entire road too dangerous for normal travelers to use.

The whole community had apparently been forced to avoid this area entirely.

The danger here is real and physical, not only spiritual or emotional.

⚠️ Exceeding fierce means extreme, violent danger

🚧 They made a whole road unsafe

🏘️ The community had to avoid this area

📖 This danger was real and physical

---

## 👻 What Have We To Do With Thee, Jesus, Thou Son Of God

The demons speak through the men, and they recognize Jesus instantly.

Calling him Son of God shows they understand exactly who he is.

This knowledge did not produce worship, only fear and open hostility.

Correct belief about Jesus, by itself, was never the same as real faith.

👻 Demons speak and recognize Jesus instantly

👑 Son of God shows they know him

😨 That knowledge brings fear, not worship

📖 Correct belief is not the same as faith

---

## 📅 Art Thou Come Hither To Torment Us Before The Time

The demons seem to know a final day of judgment is coming for them eventually.

"Before the time" suggests they expected that judgment later, not yet.

They assume Jesus's presence here might mean that day has arrived early.

Even evil spirits in this scene already understand their defeat is only a matter of time.

📅 They know a future judgment is coming

⏳ Before the time means not yet

😰 They fear Jesus might be early

📖 Even demons know their defeat is coming

---

## 💰 There Was A Good Way Off From Them An Herd Of Many Swine Feeding

"A good way off" means some real distance away, not right beside the men.

A herd this size represented a significant amount of money and food for its owners.

Swine were raised here because this was Gentile territory, not Jewish land.

This detail quietly sets up the costly request about to come next.

📏 A good way off means real distance

💰 A herd this size meant real money

🏛️ Swine fit Gentile territory, not Jewish land

📖 This sets up the costly request ahead

---

## 🐖 If Thou Cast Us Out, Suffer Us To Go Away Into The Herd Of Swine

The demons do not ask if they can stay, only where they can go next.

They already know they have no real power to resist being cast out.

Asking to enter the pigs still gives them some form of a request, not a total loss.

Even defeated evil in this scene is still trying to negotiate terms.

🚪 They only ask where to go

🙅 They know they cannot resist being cast out

🐖 Entering swine avoids a total loss for them

📖 Defeated evil still tries to negotiate

---

## 🗣️ And He Said Unto Them, Go

Jesus answers with a single word, the shortest command in this entire chapter.

No ritual, no struggle, no lengthy process accompanies this moment.

The same effortless authority already seen with sickness and storms applies here too.

One word is simply enough, every single time in this chapter.

🗣️ Jesus answers with one single word

🚫 No ritual or struggle is needed

🔁 The same authority applies as before

📖 One word is enough every time

---

## 💀 The Whole Herd Of Swine Ran Violently Down A Steep Place Into The Sea, And Perished

The entire herd rushes to its own destruction the instant the spirits enter.

"Perished" means the animals drowned, a total economic loss for their owners.

This result shows how genuinely destructive these spirits actually were the whole time.

What had been tormenting two men was powerful enough to destroy a whole herd at once.

🐖 The whole herd rushes to destruction

💀 Perished means the animals drowned completely

💸 This was a total loss for the owners

📖 This shows how destructive the spirits were

---

## 🏃 They That Kept Them Fled, And Went Their Ways Into The City

The swine herders run to report what just happened to the local townspeople.

Their urgency shows how shocking and costly this event truly was for them.

News like this would spread through a small town extremely fast.

What started as two men's healing becomes the whole town's business within minutes.

🏃 The herders run to report the event

😲 Their urgency shows how shocking this was

📢 News spreads fast through a small town

📖 One healing becomes the whole town's business

---

## 🏘️ The Whole City Came Out To Meet Jesus

An entire town turns out at once, drawn by the news they just heard.

This is the biggest, most public response Jesus receives anywhere in this chapter.

Curiosity and fear likely both played a part in such a large crowd.

Their reason for coming is about to be revealed as something other than gratitude.

🏘️ An entire town turns out at once

📣 This is the biggest response in the chapter

😨 Curiosity and fear both likely played a part

📖 Their real reason is about to show

---

## 🚪 They Besought Him That He Would Depart Out Of Their Coasts

"Coasts" here means the region or territory, not a literal ocean shore.

The town asks Jesus to leave rather than welcoming him after this miracle.

Two men were set free, but an entire herd of valuable animals was lost.

The economic cost to the town outweighed their appreciation for what Jesus had done.

🗺️ Coasts means the surrounding territory

🚪 The town asks Jesus to leave

⚖️ Lost animals outweighed two men's freedom

📖 Economic cost outweighed their gratitude
`.trim();

export const MATTHEW_EIGHT_PERSONAL_SECTIONS = parseMatthewEightRawNotes(MATTHEW_EIGHT_RAW_NOTES);
