export type JohnElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnElevenRawNotes(rawText: string): JohnElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 11:${startVerse}` : `John 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 John 11 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_ELEVEN_RAW_NOTES = `# John 11:1-3
# 🏘️ A Sick Friend In Bethany
---
## Now A Certain Man Was Sick, Named Lazarus

"Lazarus" is a Greek form of the Hebrew name Eleazar.

That name means God has helped.

This whole chapter will show just how literally that name comes true.

John introduces him here because everything that follows happens because of him.

📛 Lazarus means God has helped
🏘️ He lived in the village of Bethany
👣 His sickness starts this whole chapter
📖 His name becomes literally true

## Of Bethany, The Town Of Mary And Her Sister Martha

Bethany sat about two miles from Jerusalem.

John names the town by its most familiar residents instead of by geography alone.

Mary and Martha were already known to many readers from earlier stories about them.

Naming the sisters first tells the reader this family matters before the story even begins.

🗺️ Bethany sat near Jerusalem
👭 Mary and Martha lived there
📝 John names the town by its people
➡️ This family is central to the story

## It Was That Mary Which Anointed The Lord With Ointment

This anointing has not happened yet in John's own story.

It will not actually take place until chapter twelve.

John mentions it here anyway because his first readers already knew the story well.

He is helping them place Mary before her most famous act happens.

⏳ The anointing comes later, in chapter twelve
📜 John's readers already knew that story
👃 Mary becomes known for that act
➡️ John places her identity ahead of time

## Lord, Behold, He Whom Thou Lovest Is Sick

The sisters do not ask Jesus directly to come.

They simply describe Lazarus as the one Jesus loves.

They trust that will be enough to move him.

This is a quiet, confident kind of request.

💌 No direct request is made
❤️ They call him the one Jesus loves
🙏 Their trust assumes he will act
📖 Relationship speaks louder than demands

# John 11:4-6
# ⏳ For The Glory Of God
---
## This Sickness Is Not Unto Death, But For The Glory Of God

Jesus is not saying Lazarus will never actually die.

Lazarus does die, later in this very chapter.

Jesus means death will not be the final word over this sickness.

Something greater than death is about to be revealed through it.

💀 Lazarus really does die
🎯 Death will not have the last word
✨ God's glory is the real outcome
📖 The sickness becomes a stage for God

## That The Son Of God Might Be Glorified Thereby

"Glorified" means God's true greatness gets shown clearly for people to see.

Jesus is saying his own identity will be revealed through what happens next.

This links Lazarus directly to the larger purpose of Jesus's whole ministry.

A private family tragedy is about to become a public sign.

✨ Glorified means God's greatness revealed
👤 Jesus's identity is at stake here
🔗 Links Lazarus to Jesus's larger purpose
📖 A tragedy becomes a public sign

## Now Jesus Loved Martha, And Her Sister, And Lazarus

John stops the story to say this plainly before anything else happens.

All three siblings are named as people Jesus genuinely loved.

What happens next will look like the opposite of love.

Readers need this reminder before they watch him seem to delay.

❤️ Jesus loved all three siblings
⏸️ John pauses the story to say so
🤔 What happens next looks unloving
📖 Love explains everything that follows

## He Abode Two Days Still In The Same Place

Jesus does not rush to Bethany when he hears the news.

He deliberately stays exactly where he is for two more days.

This delay is not neglect.

It is part of the plan already stated just before this.

⏳ Jesus waits two more days
🚫 This is not neglect
📋 The delay is intentional
📖 Timing serves a bigger purpose

# John 11:7-10
# 🌙 Walking In The Light
---
## Let Us Go Into Judaea Again

Judaea was the region around Jerusalem, the most dangerous place for Jesus to be seen.

"Again" points back to an earlier chapter where Jesus had already left that area because of threats.

He is now choosing to walk straight back into danger on purpose.

🗺️ Judaea surrounded Jerusalem
⚠️ It was the most dangerous region for Jesus
🔁 He had already left it once before
➡️ He chooses to return anyway

## The Jews Of Late Sought To Stone Thee

This recalls the exact scene at the end of the previous chapter.

Jesus had claimed to be one with the Father.

A crowd there had tried to stone him for saying it.

The disciples are reminding him just how recently that happened.

📜 This recalls the end of chapter ten
🪨 A crowd had tried to stone him
⏳ That happened very recently
➡️ Returning feels like walking into danger

## Are There Not Twelve Hours In The Day

This is not really a question about clocks.

In this culture, the daylight hours were the time appointed for a person's work.

Jesus is saying his time to act has been set by God.

Danger does not change that schedule.

🕐 Twelve hours marked the working day
⏰ Daylight was the appointed time to work
🎯 God sets the timing, not danger
📖 Jesus trusts his appointed hour

## If A Man Walk In The Night, He Stumbleth

Walking in daylight means acting within the purpose God has given.

Walking at night means acting outside of that purpose, without real direction.

Jesus uses this everyday picture to explain why he is not afraid to return now.

Staying inside God's timing keeps him from stumbling into disaster too soon.

☀️ Day means acting in God's purpose
🌑 Night means acting without direction
🚶 Jesus moves within God's timing
📖 Purpose protects him from disaster

# John 11:11-16
# 😴 Our Friend Sleepeth
---
## Our Friend Lazarus Sleepeth

"Sleepeth" here is a gentle way of saying someone has died.

The New Testament often describes death this way for those who belong to God.

Calling death sleep suggests it is not permanent.

Sleep, after all, ends with waking.

😴 Sleepeth means has died
🕊️ A gentle word used often in scripture
⏳ Sleep suggests something temporary
📖 Death is not the final word

## I May Awake Him Out Of Sleep

Jesus continues the same picture from the line before.

Waking someone from sleep is something anyone can picture easily.

He is quietly promising to do exactly that for Lazarus.

A huge miracle is hiding inside gentle, ordinary words.

💤 Waking someone is an easy picture
🤫 Jesus quietly promises to do it
⚡ A huge miracle in gentle words
📖 Small words can carry a large promise

## Lord, If He Sleep, He Shall Do Well

The disciples take the word "sleep" literally here.

They think Jesus means Lazarus is simply resting and will recover.

This misunderstanding is exactly why Jesus has to speak plainly next.

😵 Disciples take sleep literally
🛌 They think Lazarus is just resting
❌ They miss what Jesus really means
➡️ Plain words become necessary next

## Then Said Jesus Unto Them Plainly, Lazarus Is Dead

Jesus drops the soft language the moment it gets misunderstood.

He states the hard fact without any cushioning.

Sometimes clarity matters more than gentleness, even when news is painful.

🗣️ Jesus speaks plainly now
💀 Lazarus has actually died
🎯 Clarity replaces gentle language
📖 Painful truth still needs saying

## That I Was Not There, To The Intent Ye May Believe

Jesus explains why he is actually glad he was not present earlier.

If he had arrived in time, he might have simply healed a sick man.

Raising a dead man gives the disciples a far stronger reason to believe.

🙌 Jesus is glad he was absent
🩹 Healing sickness would be a smaller sign
⚡ Raising the dead is far greater
📖 A bigger miracle builds bigger faith

## Thomas, Which Is Called Didymus

"Didymus" is the Greek word for twin.

It carries the same meaning as the name Thomas in Aramaic.

John gives both names together so every reader understands the nickname.

This small detail becomes useful again later, when Thomas is remembered mainly for doubting.

👯 Didymus means twin
🗣️ Same meaning as the name Thomas
📝 John explains the name plainly
➡️ Thomas returns later in the Gospel

## Let Us Also Go, That We May Die With Him

Thomas assumes this trip back to Judaea will get them all killed.

He still chooses to go anyway, out of loyalty to Jesus.

This is not the blind doubt Thomas becomes known for later.

Here it looks much more like reckless courage.

⚔️ Thomas expects real danger
🤝 He chooses loyalty anyway
💪 This looks like courage, not doubt
📖 Thomas is not only a doubter

# John 11:17-19
# 🪦 Four Days In The Grave
---
## He Found That He Had Lain In The Grave Four Days Already

Many Jewish people at this time believed a person's spirit stayed near the body for three days.

By the fourth day, death was considered final beyond any doubt.

John includes this detail so no reader could later claim Lazarus was only unconscious.

📆 Four days confirmed real death
👻 Many believed the spirit lingered three days
🚫 No room left for doubt
📖 This removes any natural explanation

## Nigh Unto Jerusalem, About Fifteen Furlongs Off

A "furlong" was a Roman measurement of distance, about two hundred yards long.

Fifteen furlongs adds up to about two miles.

That short distance explains why so many people from Jerusalem could come and mourn.

📏 A furlong is about two hundred yards
🧮 Fifteen furlongs equals about two miles
🚶 Jerusalem was an easy walk away
📖 Distance explains the large crowd

## Many Of The Jews Came To Martha And Mary, To Comfort Them

Visiting a grieving family was a serious, expected duty in this culture.

Friends and neighbors often stayed for days, simply sitting with the mourners.

This custom explains why so many witnesses are already present when Jesus finally arrives.

🤝 Comforting mourners was expected
🏠 Visitors often stayed for days
👥 A large crowd was already gathered
📖 Many witnesses see what happens next

# John 11:20-27
# 🧎 I Am The Resurrection
---
## Martha, As Soon As She Heard, Went And Met Him

Martha moves the instant she hears Jesus is near.

This matches how she is described elsewhere, as someone quick to act.

Her grief does not stop her from going straight to him.

🏃 Martha moves immediately
💪 She is known for quick action
😢 Grief does not slow her down
📖 Her character shows even in sorrow

## But Mary Sat Still In The House

This is not laziness or a lack of love.

Mary is described elsewhere as the quieter, more reflective sister.

She stays with the mourners gathered in the house instead of rushing out.

Two sisters respond to the same grief in two different, equally real ways.

🏠 Mary stays inside with mourners
🤫 She is the quieter sister
😢 Her grief looks different, not lesser
📖 People grieve in different ways

## Lord, If Thou Hadst Been Here, My Brother Had Not Died

This is not an accusation.

Martha says it as a plain statement of what she believes is true.

Mary will say this exact same sentence again later in the chapter.

It shows how deeply both sisters trusted what Jesus could have done.

💬 Not an accusation, a belief
🙏 Martha trusts Jesus could have healed him
🔁 Mary repeats this same line later
📖 Both sisters share this same faith

## Whatsoever Thou Wilt Ask Of God, God Will Give It Thee

Martha is not yet asking Jesus to raise her brother.

She does not have that much faith at this exact moment.

She is simply affirming that Jesus has a special, trusted closeness with God.

Her full understanding grows further as this conversation continues.

🙏 Martha is not asking for a miracle yet
🤔 Her faith is still growing
🤝 She trusts Jesus is close to God
📖 Understanding builds step by step

## Thy Brother Shall Rise Again

Jesus speaks a true statement that can be heard two different ways.

Martha hears a general comfort about the far future.

Jesus actually means something far more immediate.

The ambiguity is about to be cleared up completely.

🔀 The statement has two possible meanings
🕊️ Martha hears a distant, future comfort
🎯 Jesus means something immediate
📖 Clarity is about to come

## I Know That He Shall Rise Again In The Resurrection At The Last Day

Many Jewish people, especially the Pharisees, believed in a future resurrection of the dead.

That resurrection was expected on a final coming day of judgment.

Martha is stating that accepted belief, not expecting anything sooner.

She has real faith, just aimed at the wrong moment.

📜 Many believed in a future resurrection
⚖️ This was common Pharisee teaching
🔭 Martha's faith looks to the far future
📖 Real faith aimed at the wrong moment

## I Am The Resurrection, And The Life

Jesus does not point Martha toward a future event anymore.

He says the resurrection and the life are standing right in front of her.

This is one of several places in John where Jesus says plainly who he is.

✨ Resurrection is not just a future event
👤 Jesus says it is found in himself
🗣️ One of John's great I am statements
📖 Life itself stands before Martha

## I Believe That Thou Art The Christ, The Son Of God

Martha answers with a full, clear confession of faith.

"Christ" means the promised anointed king God's people had waited for.

Her answer matches the confession Peter makes about Jesus in the other Gospels.

Even without fully understanding what comes next, her faith is already complete.

👑 Christ means the promised anointed king
🗣️ Her confession matches Peter's in other Gospels
🙏 Her faith does not need full understanding
📖 Complete trust before the miracle happens

# John 11:28-32
# 🏃 Mary Comes To Jesus
---
## Called Mary Her Sister Secretly

Martha calls Mary away from the crowd of mourners quietly, not publicly.

Jesus was still a wanted man in this region, remembered from the stoning threat earlier.

A quiet, private meeting kept Jesus safer from any hostile crowd nearby.

🤫 Martha calls Mary privately
⚠️ Jesus was still in danger here
🛡️ Secrecy protected him from a crowd
📖 Caution follows him even now

## The Master Is Come, And Calleth For Thee

Martha delivers a short, urgent message.

She does not waste words explaining everything that was just said.

Mary only needs to know one thing, that Jesus is asking for her.

📨 A short, urgent message
🏃 No time wasted explaining details
👤 Jesus asks for her by name
📖 Being called by name moves her instantly

## She Arose Quickly, And Came Unto Him

Mary does not hesitate for even a moment.

Her quiet grief from earlier in the chapter turns into immediate action.

That shift happens the instant she hears Jesus wants her.

⚡ Mary responds without delay
😢 Grief does not slow this response
🏃 She moves the moment she hears his name
📖 His call changes her stillness instantly

## She Goeth Unto The Grave To Weep There

The crowd following Mary assumes she is simply heading back to Lazarus's tomb.

They have no idea she is actually going to meet Jesus.

Their wrong assumption means this whole crowd is about to witness something unexpected.

❓ The crowd misreads her destination
🪦 They think she is returning to the tomb
😮 They end up witnessing far more
📖 A wrong guess leads to a true miracle

## She Fell Down At His Feet

Mary repeats the same words Martha already said earlier in the chapter.

Falling at someone's feet in this culture showed deep respect alongside deep grief.

Both sisters land on the exact same honest statement of faith and sorrow.

🙇 Falling at his feet showed deep respect
🔁 She repeats Martha's exact words
😢 Grief and faith arrive together
📖 Two sisters, one shared conviction

# John 11:33-37
# 😭 Jesus Wept
---
## He Groaned In The Spirit, And Was Troubled

"Groaned" describes a deep, physical reaction, not a quiet sigh.

Some scholars believe the word can carry strong emotion, even indignation, not grief alone.

Jesus is deeply and visibly moved by the grief surrounding him.

😣 Groaned means a strong physical reaction
💔 Real, visible emotion, not calm detachment
😤 Possibly includes righteous anger at death itself
📖 Jesus feels this moment fully

## Where Have Ye Laid Him? Lord, Come And See

Jesus already knows Lazarus is dead and exactly what is about to happen.

He still asks the question and lets himself be led to the grave.

He enters fully into the family's sorrow instead of skipping past it.

❓ Jesus already knows the answer
🚶 He still lets himself be led there
😢 He enters the grief fully
📖 He does not skip past sorrow

## Jesus Wept

This is the shortest verse in this chapter, only two words in the original language.

Jesus cries real tears even though he already knows Lazarus is about to be raised.

His grief is not about doubt over the outcome.

It is a genuine response to the pain death has caused the people he loves.

💧 Only two words in the original text
😭 Real tears despite knowing the outcome
❤️ Grief flows from genuine love
📖 He feels the pain death causes

## Behold How He Loved Him

The watching crowd reads Jesus's tears correctly.

They see real love, not performance or distant sympathy.

Even people who do not yet believe in him recognize what they are watching.

👀 The crowd reads his tears correctly
❤️ They see genuine love, not performance
🗣️ Even skeptics notice the depth of it
📖 Love is visible before the miracle is

## Could Not This Man, Which Opened The Eyes Of The Blind, Have Caused That Even This Man Should Not Have Died

Some in the crowd remember Jesus healing a blind man in the previous chapter.

Their question sounds like genuine wonder.

It also carries an edge of doubt underneath it.

They are questioning why Jesus waited instead of preventing this death entirely.

👁️ They recall the healing from chapter nine
🤔 Their words sound like genuine wonder
😒 An edge of doubt sits underneath
📖 They question his timing, not his power

# John 11:38-40
# 🪨 Take Away The Stone
---
## It Was A Cave, And A Stone Lay Upon It

Wealthier families in this region often buried their dead in carved out caves.

A large stone was rolled or placed across the entrance to seal it shut.

This detail makes the coming miracle undeniable, since everyone present could see how sealed it was.

🪨 Burial caves were common for families with means
🚪 A stone sealed the entrance shut
👀 Everyone could see how sealed it was
📖 No trick could explain what follows

## Lord, By This Time He Stinketh

Martha is not objecting out of disbelief alone.

She is stating a practical, physical fact about four days of decomposition in this climate.

Her blunt honesty actually strengthens the miracle that follows.

No one could later claim Lazarus was never truly dead.

👃 Decomposition was already expected
🗣️ Martha speaks honestly, not faithlessly
🚫 No one could claim he was not dead
📖 Honesty makes the miracle undeniable

## If Thou Wouldest Believe, Thou Shouldest See The Glory Of God

Jesus reminds Martha of what he already told her earlier in their conversation.

Belief is not a reward that comes after seeing a miracle.

Here, belief is the doorway that comes first, before the glory of God is shown.

🔁 Jesus repeats his earlier promise
🚪 Belief comes before seeing, not after
✨ Glory is about to be revealed
📖 Faith opens the door to the miracle

# John 11:41-44
# 📣 Lazarus, Come Forth
---
## Father, I Thank Thee That Thou Hast Heard Me

Jesus thanks God before the miracle actually happens.

This is not a request for power in this moment.

It confirms that this exact outcome had already been settled before Jesus ever arrived.

🙏 Thanks comes before the miracle
✅ The outcome was already settled
🤝 This shows Jesus's constant relationship with God
📖 Confidence replaces last minute pleading

## Because Of The People Which Stand By I Said It

Jesus explains exactly why he prayed out loud instead of silently.

He already knows the Father hears him at all times, spoken aloud or not.

The prayer is really for the crowd's benefit.

They need to see the miracle is truly from God, not a trick.

👥 The prayer is spoken for the crowd
🤫 God already hears him without words
🎯 The goal is the crowd's belief
📖 Even his prayer serves a purpose

## He Cried With A Loud Voice, Lazarus, Come Forth

Jesus does not whisper a quiet command.

He calls out loudly enough for the whole watching crowd to hear every word.

Calling Lazarus by name makes the moment personal, not a generic display of power.

📣 Jesus calls out loudly
👥 The whole crowd hears clearly
👤 He calls Lazarus by name
📖 Power is personal, not a show

## Bound Hand And Foot With Graveclothes, Bound About With A Napkin

Burial customs here wrapped a body in long strips of cloth.

A separate cloth, the "napkin," covered the face specifically.

Lazarus walks out still fully wrapped.

That proves this is no staged event where someone had already loosened his bindings.

🧻 Graveclothes were long wrapping strips
🫥 A napkin covered the face
🚶 He walks out still fully bound
📖 No staging could explain this

## Loose Him, And Let Him Go

Jesus could have raised Lazarus already free of every wrapping.

Instead he lets the watching crowd take part by physically unwrapping him.

The miracle becomes something the community actively shares in, not something they only watch.

🙌 The crowd takes part directly
🧵 They physically unwrap him
🤝 The miracle becomes shared, not distant
📖 Community joins in the joy

# John 11:45-48
# ⚖️ A Council Is Gathered
---
## Many Of The Jews Believed On Him

A large public miracle, witnessed by many people from Jerusalem, produces real faith.

This was not a quiet, private sign.

The size of the crowd present means news of this spreads fast and far.

👥 Many witnesses were present
🙌 Real faith results for many
📰 News of this spreads quickly
📖 A public sign reaches many people

## Some Of Them Went Their Ways To The Pharisees

Not everyone who saw the miracle responds with faith.

Some witnesses go straight to report it to the religious leaders instead.

The exact same evidence produces two completely different responses in different people.

👀 Same evidence, two different reactions
🏛️ Some report straight to the Pharisees
🙅 Seeing a miracle does not guarantee belief
📖 The heart decides how evidence lands

## What Do We? For This Man Doeth Many Miracles

The religious leaders do not deny that the miracle happened.

Their concern is not whether it is real.

Their only question is what to do about the growing threat to their authority.

✅ They do not deny the miracle
🤔 Their concern is not whether it is real
👑 They worry about their own authority
📖 Evidence is not their real problem

## The Romans Shall Come And Take Away Both Our Place And Nation

Rome ruled over this region and watched closely for any sign of rebellion.

A rival king or a popular miracle worker could trigger a brutal Roman response.

The leaders fear that response would fall on the whole nation.

Their decision about Jesus is driven by political fear as much as religious concern.

🏛️ Rome ruled the region closely
⚔️ Rome crushed any sign of rebellion
😨 Leaders fear a harsh Roman response
📖 Political fear shapes their decision

# John 11:49-53
# 👑 Caiaphas's Unwitting Prophecy
---
## Caiaphas, Being The High Priest That Same Year

Caiaphas held the highest religious office among the Jewish people at this time.

John notes "that same year" for a reason.

Rome had turned the high priesthood into a position it could remove and replace.

It was no longer the lifelong role it was originally meant to be.

👑 Caiaphas held the highest religious office
📆 Rome could remove a high priest at will
🏛️ The role was no longer truly independent
📖 Roman control reached into worship itself

## It Is Expedient For Us, That One Man Should Die For The People

"Expedient" means useful or convenient for a goal, not necessarily right.

Caiaphas is making a cold, practical argument, not a moral one.

Sacrificing one man's life seems, to him, like simple political math.

⚖️ Expedient means convenient, not right
🧮 Caiaphas treats this as political math
💔 One life weighed against many
📖 Convenience can disguise injustice

## This Spake He Not Of Himself, But Being High Priest That Year, He Prophesied

Caiaphas has no idea he is speaking a true prophecy.

He means his words as cold political strategy.

John points out that God can speak truth even through a hostile official.

🎯 Caiaphas means only political strategy
🗣️ His words become true prophecy anyway
🙌 God can speak through anyone, even enemies
📖 Truth can emerge from hostile intentions

## Gather Together In One The Children Of God That Were Scattered Abroad

John explains what Caiaphas's words actually mean on a much deeper level.

Jesus's death would not only save the nation of Israel.

It would bring together God's people from every nation into one family.

🌍 Not just Israel, but every nation
🤝 One family gathered from everywhere
✨ A far bigger plan than Caiaphas imagined
📖 One death, one worldwide family

## They Took Counsel Together For To Put Him To Death

This is the moment the decision changes from worried talk into an active plan.

From this point forward, Jesus is a marked man with his death already decided.

Everything that follows in the Gospel moves toward that fixed decision.

📋 A worried talk becomes a real plan
⚰️ Jesus is now a marked man
🎯 The decision is already fixed
📖 The road to the cross begins here

# John 11:54-57
# 🏞️ Withdrawing To Ephraim
---
## Jesus Therefore Walked No More Openly Among The Jews

The death plot from the previous verses forces Jesus into hiding.

He does not disappear out of fear.

He steps back from public view because his time has not yet arrived.

🙈 Jesus withdraws from public view
🚫 Not fear, but timing
⏳ His hour has not yet come
📖 He controls the timing, not his enemies

## A City Called Ephraim

Ephraim was a small town in a quiet, wilderness area.

It sat away from the crowds and dangers of Jerusalem.

It gave Jesus and his disciples a safe place to stay for a while.

That quiet pause sits right before the final chapters of the Gospel begin.

🏞️ Ephraim sat in a quiet wilderness area
🛡️ It offered safety from Jerusalem's danger
⏸️ A pause before the final chapters
📖 Even Jesus rested before the end

## The Jews' Passover Was Nigh At Hand

Passover was the major yearly festival remembering Israel's rescue from slavery in Egypt.

Many worshipers arrived in Jerusalem early to complete required purification rituals.

This sets the stage for the final Passover of Jesus's life.

In that one, Jesus himself becomes the ultimate sacrifice.

🐑 Passover remembered the rescue from Egypt
🧼 Rituals purified worshipers beforehand
📅 Crowds arrived early for the feast
📖 This sets up Jesus's final Passover

## If Any Man Knew Where He Were, He Should Shew It

This is an official order from the religious leaders, not just rumor.

Anyone who spotted Jesus was commanded to report his location.

The chapter began with a sick friend in Bethany.

It ends with Jesus as a wanted man with a search ordered for him.

📜 An official order, not just rumor
👀 Anyone who saw Jesus must report him
⚠️ Jesus is now actively hunted
📖 A sick friend's story ends in a manhunt
`.trim();

export const JOHN_ELEVEN_PERSONAL_SECTIONS = parseJohnElevenRawNotes(JOHN_ELEVEN_RAW_NOTES);
