export type JohnTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnTwelveRawNotes(rawText: string): JohnTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 12:${startVerse}` : `John 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 John 12 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_TWELVE_RAW_NOTES = `# John 12:1-8
# 🪔 A Costly Anointing
---
## Six Days Before The Passover

John counts down to the biggest week of Jesus's life using the Passover as the marker.

Passover was the yearly feast that remembered Israel's rescue from slavery in Egypt.

Six days away means Jerusalem was already filling with pilgrims for the festival.

This opening phrase sets a clock running under the rest of the chapter.

🗓️ Passover marked Israel's rescue from Egypt
⏳ Only six days remained before the feast
👥 Jerusalem was filling with pilgrims
📖 A countdown begins under this chapter

## Where Lazarus Was, Whom He Raised From The Dead

John reminds the reader exactly who Lazarus is before the story continues.

Lazarus is the man Jesus called out of his own grave in the previous chapter.

Bethany is now the place where a miracle and a meal sit side by side.

The reader is meant to feel the weight of sitting at a table with a man who had died.

🪦 Lazarus had been raised from the dead
🏘️ This happens in the same town, Bethany
🍽️ A meal follows right after a miracle
📖 Death and dinner now share one room

## There They Made Him A Supper, And Martha Served

Hosting a supper for an honored guest was a way to publicly show gratitude.

Martha is remembered elsewhere as the sister busy with serving.

Mary was the sister who once sat and simply listened.

Here that same instinct to serve finally fits the moment perfectly.

This meal becomes Martha's way of thanking Jesus for her brother's life.

🍽️ A supper honored an important guest
🏃 Martha was known for serving busily
🙏 Her service now fits this moment
📖 Martha thanks Jesus the way she knows

## A Pound Of Ointment Of Spikenard, Very Costly

Spikenard was a rare perfume oil pressed from a plant grown far away in India.

A pound in this culture was a heavy, expensive amount to pour out at once.

John later tells readers exactly how costly this gift truly was.

Mary did not hold back even a little of something this rare.

🌿 Spikenard came from a plant grown in India
💰 A pound was a large, costly amount
🎁 Mary held nothing back
📖 This gift was rare and expensive

## Anointed The Feet Of Jesus, And Wiped His Feet With Her Hair

Anointing a guest's head with oil was a common act of honor in this culture.

Anointing someone's feet instead was far more humble and far more personal.

A woman loosening her hair in public was considered shocking and improper at this time.

Mary ignored that social risk completely to honor Jesus.

👣 Feet, not the head, received the oil
🙇 Feet made this gesture deeply humble
😮 Loose hair in public broke social custom
📖 Mary risked shame to honor Jesus

## The House Was Filled With The Odour Of The Ointment

The fragrance did not stay near Mary, it spread through the whole house.

Everyone present, even skeptics like Judas, had to smell what she had done.

John includes this small detail because he remembered it himself as a witness.

An act meant to honor Jesus became something the entire room could not ignore.

👃 The scent filled the entire house
👥 Everyone present could smell it
✍️ John remembered this detail firsthand
📖 Her gift could not be ignored

## Judas Iscariot, Simon's Son, Which Should Betray Him

John names Judas in full right here, long before the betrayal actually happens.

Calling him Simon's son simply tells readers which Judas this is.

The phrase which should betray him is John writing with hindsight, already knowing the ending.

Judas sits at this honoring supper already planning to hand Jesus over.

🏷️ John fully names Judas here
👤 Simon's son identifies which Judas
🔮 John already knows how the story ends
📖 Betrayal sits quietly at this supper

## Why Was Not This Ointment Sold For Three Hundred Pence

A single pence, or denarius, was about one full day's wage for a laborer.

Three hundred pence adds up to nearly a full year's income for an ordinary worker.

Judas frames his objection as concern for the poor, not greed.

His next words in this very passage expose that this was never really about the poor.

💰 A pence equaled about a day's wage
📊 Three hundred pence equaled nearly a year's pay
🗣️ Judas frames this as concern for the poor
📖 His real motive comes out next

## Not That He Cared For The Poor, But Because He Was A Thief

John steps in here to explain what Judas really meant.

Judas held the group's money bag and had been quietly stealing from it.

His objection about the poor was only a cover for his own greed.

John wants no reader to mistake Judas's words for genuine compassion.

💰 Judas held the disciples' money bag
🫥 He had been stealing from it
🎭 His concern for the poor was a cover
📖 John exposes his real motive plainly

## Against The Day Of My Burying Hath She Kept This

Jesus does not mean Mary planned this act as a burial ritual in advance.

He reframes her gift of love as something that points toward his coming death.

Burial customs in this culture usually involved wrapping a body in costly spices.

Jesus is already preparing his followers to understand his death before it happens.

🪦 Burial oils and spices were customary
💭 Jesus reframes her gift toward his death
⏳ He prepares his followers in advance
📖 Love and death sit side by side

## The Poor Always Ye Have With You, But Me Ye Have Not Always

Jesus is not saying caring for the poor does not matter.

He is pointing out that this exact moment with him will not come again.

Opportunities to help the poor will continue for the rest of history.

This one chance to honor him in person was about to end forever.

🙏 Jesus does not dismiss caring for the poor
⏳ This exact moment will not repeat
🕰️ Helping the poor will always be possible
📖 This one chance with Jesus was ending

# John 12:9-11
# ⚖️ A Plot Against Lazarus
---
## Much People Of The Jews Therefore Knew That He Was There

Word of Jesus staying in Bethany spread quickly through Jerusalem.

Bethany sat only a short walk from the city of Jerusalem.

Crowds were already gathering before Jesus even entered the city the next day.

This sets up the large welcome he receives in the very next verses.

📰 News of Jesus spread fast
🗺️ Bethany sat close to Jerusalem
👥 Crowds were already gathering
📖 This sets up his next entrance

## They Came Not For Jesus' Sake Only, But That They Might See Lazarus Also

Some of this crowd cared less about Jesus than about seeing a walking miracle.

Lazarus himself had become a living, breathing piece of evidence.

People wanted to see a man who had actually been dead and buried.

Curiosity about Lazarus became one more reason crowds kept gathering around Jesus.

👀 Many came just to see Lazarus
🧍 He was living proof of a miracle
🪦 He had truly been dead and buried
📖 Curiosity drew crowds toward Jesus

## The Chief Priests Consulted That They Might Put Lazarus Also To Death

The chief priests cannot deny that Lazarus was genuinely raised from the dead.

Instead of questioning the miracle, they plot to silence the evidence itself.

Killing a man who was raised from death shows exactly how far their fear had gone.

Their real enemy was never Lazarus, it was the faith his life created in others.

⚰️ They plot to kill Lazarus himself
🙅 They never deny the miracle happened
😨 Fear drives this extreme decision
📖 Living proof threatened their authority

## By Reason Of Him Many Of The Jews Went Away, And Believed On Jesus

Lazarus's resurrection pulled people away from the religious leaders' influence.

Many who witnessed or heard about the miracle placed their trust in Jesus instead.

A sign this public could not be contained or explained away quietly.

The leaders now faced a problem spreading faster than they could control.

🙌 Many believed because of Lazarus
🚶 People turned away from the leaders
📣 The miracle was too public to hide
📖 Belief was spreading beyond their control

# John 12:12-19
# 🌴 The King Enters Jerusalem
---
## On The Next Day Much People That Were Come To The Feast

Passover drew enormous crowds of pilgrims into Jerusalem every year.

Many of these visitors had already heard about Lazarus being raised.

This massive crowd of travelers is what greets Jesus as he approaches the city.

A festival meant for remembering Egypt becomes the backdrop for a much bigger moment.

🐑 Passover filled Jerusalem with pilgrims
📰 Many already knew about Lazarus
👥 A huge crowd awaited Jesus
📖 Passover becomes the backdrop for his arrival

## Took Branches Of Palm Trees

Palm branches were a symbol of celebration and national pride in this culture.

Waving them was common at festivals celebrating victory or a king's arrival.

The crowd is treating Jesus like a conquering king returning in triumph.

Few of them yet understand what kind of king he actually came to be.

🌴 Palm branches signaled celebration
👑 They welcomed kings and victors
🎉 The crowd treats Jesus as a conqueror
📖 They misread what kind of king he is

## Cried, Hosanna

Hosanna is a Hebrew word that literally means save now or save us.

It began as a cry for help and became a shout of praise.

The crowd is calling out for rescue.

They are also honoring Jesus as a coming king.

🙌 Hosanna means save now
🗣️ It mixed a cry for help with praise
👑 The crowd treats him as their king
📖 Rescue and praise rise together

## Blessed Is The King Of Israel That Cometh In The Name Of The Lord

This line quotes directly from Psalm one hundred eighteen, a psalm sung at festivals.

Calling someone blessed who comes in the name of the Lord meant they carried God's own authority.

The crowd names Jesus king of Israel publicly for the first time in this Gospel.

This public title will become one of the official charges used against him later.

📜 This quotes Psalm one hundred eighteen
👑 Blessed named someone carrying God's authority
🗣️ The crowd names Jesus king publicly
📖 This title returns later as a charge

## Jesus, When He Had Found A Young Ass, Sat Thereon

Conquering kings in this era typically rode powerful war horses into a city.

Jesus chooses a young donkey instead, a humble, ordinary animal.

That choice quietly announces what kind of king he truly is.

He comes in peace, not as a warrior seeking conquest.

🐴 Kings usually rode war horses
🫏 Jesus rides a humble donkey instead
🕊️ The choice announces peace, not conquest
📖 His kingship looks nothing like Rome's

## Fear Not, Daughter Of Sion

This line quotes the prophet Zechariah almost word for word.

Daughter of Sion is simply a poetic way of naming the people of Jerusalem.

Zechariah had promised centuries earlier that their king would arrive this exact way.

John points out this old promise is being fulfilled right in front of the crowd.

📜 This quotes the prophet Zechariah
🏙️ Daughter of Sion means Jerusalem's people
⏳ The prophecy was centuries old
📖 An old promise is being fulfilled

## These Things Understood Not His Disciples At The First

The disciples watching this moment did not grasp its full meaning yet.

John admits even Jesus's closest followers were confused in the moment.

Full understanding only came later, after Jesus had risen and been glorified.

Looking back, they finally connected what they had witnessed to the old prophecy.

😕 The disciples did not understand yet
👥 Even his closest followers were confused
⏳ Clarity came only after his resurrection
📖 Hindsight revealed what they had missed

## The People That Was With Him Bare Record

John points to actual eyewitnesses who saw Lazarus raised from the grave.

Bare record means they were telling others what they had personally seen.

Their testimony fueled the size and excitement of the crowd that day.

A private miracle in Bethany became public news carried by real witnesses.

👁️ Eyewitnesses testified to what they saw
🗣️ Bare record means telling others firsthand
📣 Their testimony fueled the crowd
📖 One miracle became widely known news

## Perceive Ye How Ye Prevail Nothing?

The Pharisees admit privately that their efforts to stop Jesus are failing.

Prevail nothing means their strategy has accomplished absolutely nothing so far.

Their frustration shows how quickly they were losing control of public opinion.

This private admission comes right before they escalate their plans against him.

😤 The Pharisees admit their failure privately
🚫 Prevail nothing means their plan failed
📉 They were losing public support fast
📖 Frustration pushes them toward escalation

## Behold, The World Is Gone After Him

The Pharisees meant this as an exaggerated complaint about Jesus's popularity.

Their words were meant as frustration, not literal truth, in that moment.

Looking back, the statement turns out to be strangely prophetic.

The gospel really would go out to the whole world through people exactly like this.

😠 The Pharisees meant this as complaint
🌍 Their words become unintentionally prophetic
✨ The gospel truly would reach the world
📖 Frustration accidentally spoke the truth

# John 12:20-26
# 🌾 Certain Greeks Seek Jesus
---
## There Were Certain Greeks Among Them That Came Up To Worship At The Feast

These Greeks were Gentile worshippers, not ethnic Greek speaking Jews from the area.

They had adopted faith in the God of Israel without becoming full converts.

Their presence at Passover shows interest in Israel's God was spreading well beyond Israel itself.

Their arrival sets up the very next scene that follows.

🌍 These Greeks were Gentile worshippers
🙏 They followed Israel's God without full conversion
📈 Interest in God was spreading beyond Israel
📖 Their arrival sets up what follows

## Sir, We Would See Jesus

This simple request came through Philip, a disciple with a Greek sounding name.

Philip came from Bethsaida, a town with many Gentile residents nearby.

A request this small ends up prompting one of Jesus's most important teachings.

Even outsiders were now actively seeking him out.

🙋 Greeks asked to see Jesus
🏘️ Philip came from a Gentile area
🗣️ A small request sparked a big teaching
📖 Outsiders were actively seeking him

## Philip Cometh And Telleth Andrew

The request passes through two disciples before it finally reaches Jesus.

John slows the story down to show this chain happening step by step.

Perhaps Philip and Andrew were unsure how Jesus would respond to Gentiles asking for him.

This small chain of messengers builds real anticipation for what Jesus says next.

🔗 The message passes through two disciples
🐢 John slows the story down here
🤔 They may have been unsure how to respond
📖 Anticipation builds before Jesus answers

## The Hour Is Come, That The Son Of Man Should Be Glorified

Earlier in this Gospel, Jesus repeatedly said his hour had not yet come.

Now, with Gentiles asking to see him, he finally says the hour has arrived.

Gentiles seeking him signals that his mission is about to reach beyond Israel alone.

This moment marks the turning point into the final week before the cross.

⏳ Earlier his hour had not yet come
✨ Here Jesus says the hour has arrived
🌍 Gentiles seeking him signals a wider mission
📖 This turns the story toward the cross

## Except A Corn Of Wheat Fall Into The Ground And Die

A corn of wheat here simply means a single grain or kernel of wheat.

A seed buried in the ground looks like it has been completely lost.

That hidden burial is actually the exact step that leads to new life.

Jesus is describing his own coming death in a picture anyone could understand.

🌾 A corn of wheat means a single grain
⬇️ Burial looks like total loss
🌱 Burial is actually the path to new life
📖 Jesus describes his own coming death

## If It Die, It Bringeth Forth Much Fruit

A single buried seed can grow into a plant producing dozens of new seeds.

Jesus is saying his own death will multiply into countless new believers.

One life given up becomes the source of many lives gained.

The Greeks now listening are themselves part of that coming harvest.

🌱 One seed can produce many more
✝️ His death would multiply believers
➕ One life given produces many gained
📖 These very Greeks are part of that harvest

## He That Loveth His Life Shall Lose It

Loving his life here means clinging tightly to comfort and self preservation.

Clinging that tightly to this life actually guarantees losing what matters most.

Jesus is describing a spiritual principle, not literal suicide or carelessness with life.

Holding on too tightly to this world costs a person everything that lasts.

🤲 Loving this life means clinging tightly
❌ Clinging tightly guarantees losing it
🧠 This is spiritual, not literal carelessness
📖 Holding too tight costs what lasts

## He That Hateth His Life In This World Shall Keep It Unto Life Eternal

Hateth here does not mean a literal, bitter hatred of being alive.

It means refusing to let this world's comforts become the most important thing.

That kind of letting go leads to a life that lasts forever.

The paradox is real, losing this world actually gains eternal life.

🚫 Hateth does not mean literal hatred
🌍 It means refusing to prioritize this world
♾️ Letting go leads to life eternal
📖 Losing this world gains the next

## Where I Am, There Shall Also My Servant Be

Serving Jesus here means actively following him, not just admiring him from a distance.

A true servant goes wherever their master goes, even into suffering.

Jesus promises his own presence to anyone who serves him this way.

The reward for that service comes directly from the Father himself, not from people.

🚶 Serving means actively following, not admiring
🤝 A servant follows even into suffering
🏡 Jesus promises his own presence
📖 The Father himself gives the honor

# John 12:27-33
# 😟 Now Is My Soul Troubled
---
## Now Is My Soul Troubled

Jesus openly admits real inner anguish as the cross draws close.

This echoes the same anguish he will show again later in Gethsemane.

His trouble does not mean doubt, it means genuine human dread of suffering.

Even God's own Son felt the weight of what was coming.

😟 Jesus admits real inner anguish
🌳 This echoes his later anguish in Gethsemane
💔 Trouble here means dread, not doubt
📖 Even the Son felt this weight

## Father, Save Me From This Hour

Jesus voices the honest human instinct to want to avoid suffering.

He says this out loud instead of hiding what he is feeling.

This prayer is not a request he ultimately asks the Father to grant.

It shows the real cost of the choice he is about to make.

🗣️ Jesus voices his honest human instinct
😣 He admits wanting to avoid suffering
🙏 He does not actually ask for escape
📖 This shows the real cost of his choice

## But For This Cause Came I Unto This Hour

Jesus immediately answers his own question with firm resolve.

This exact suffering is the very reason he came into the world.

He is not a victim caught by surprise, he came for this on purpose.

Resolve replaces hesitation within the same breath.

💪 Jesus answers his own question with resolve
🎯 Suffering was the reason he came
🚫 He is no surprised victim
📖 Resolve replaces hesitation instantly

## Father, Glorify Thy Name

Jesus shifts his prayer away from himself and onto the Father's name.

Glorify here means make God's greatness visible and unmistakable to everyone watching.

His focus is not escaping pain, it is honoring who God is.

This single line sums up his whole mission in four words.

🔄 Jesus shifts focus away from himself
✨ Glorify means making God's greatness visible
🎯 His focus is honoring God, not escape
📖 Four words sum up his mission

## Then Came There A Voice From Heaven

God speaks audibly from heaven here, something that happens only a few times in the Gospels.

The same voice spoke at Jesus's baptism and again at his transfiguration.

This public moment confirms the Father's approval in front of a crowd.

Not everyone who heard it understood what they were actually hearing.

🔊 God speaks audibly from heaven
💧 The same voice spoke at his baptism
👥 This confirmation happens before a crowd
📖 Not everyone understood what they heard

## Others Said, An Angel Spake To Him

The crowd hears the exact same sound in two completely different ways.

Some heard only thunder, a natural sound with no real meaning to them.

Others sensed something supernatural, even if they could not name it clearly.

Spiritual hearing varies even when the same voice speaks to everyone.

👂 The crowd heard the same sound differently
⛈️ Some heard only ordinary thunder
👼 Others sensed something supernatural
📖 Spiritual hearing varies person to person

## This Voice Came Not Because Of Me, But For Your Sakes

Jesus already knew the Father heard him, spoken aloud or completely silent.

He did not need this voice for his own reassurance or comfort.

The voice was a gift to the crowd, so they might come to believe.

Even his most private relationship with God was shared for the crowd's benefit.

🤫 Jesus did not need this for himself
🎁 The voice was a gift to the crowd
🙏 Its purpose was building their belief
📖 Even his prayer served others

## Now Is The Judgment Of This World

Jesus names the cross itself as the true moment of judgment.

Judgment here means the world's rebellion against God is about to be exposed.

The cross reveals exactly what sin and rejection of God really cost.

This judgment falls on the world's system, not yet on individual people.

⚖️ The cross is the moment of judgment
🌍 It exposes the world's rebellion
💔 It reveals the true cost of sin
📖 This judgment targets a system, not people yet

## Now Shall The Prince Of This World Be Cast Out

The prince of this world is one of John's names for Satan.

Satan had real influence over human hearts and earthly systems up to this point.

The cross marks the beginning of that grip being broken for good.

His defeat starts here, even though its full effect unfolds later.

👑 The prince of this world is Satan
⛓️ He had real influence until this point
💥 The cross begins breaking his grip
📖 His defeat starts here, finishes later

## If I Be Lifted Up From The Earth, Will Draw All Men Unto Me

Lifted up carries two meanings at the exact same time.

It describes being physically raised up on a cross to die.

It also describes being exalted and glorified afterward.

John confirms the first meaning plainly, that Jesus meant the death he would die.

Both meanings are true together, the crucifixion becomes the exaltation.

⬆️ Lifted up means raised on a cross
✨ It also means exalted and glorified
📝 John confirms this means his death
📖 The cross becomes his exaltation

# John 12:34-36
# 🌗 Walk While Ye Have The Light
---
## We Have Heard Out Of The Law That Christ Abideth For Ever

Many Jewish teachers taught that the promised Messiah would reign forever once he came.

The crowd is quoting that common teaching back to Jesus as a challenge.

A king who dies does not match their picture of an eternal Messiah.

Their confusion comes from knowing part of the truth without the whole picture.

📜 Many taught the Messiah would reign forever
❓ The crowd quotes this teaching as a challenge
💀 A dying king does not fit their picture
📖 Partial truth creates real confusion

## How Sayest Thou, The Son Of Man Must Be Lifted Up?

The crowd cannot reconcile a Messiah who reigns forever with one who is lifted up to die.

They assume Son of man and dying are two ideas that cannot fit together.

Jesus has already connected both ideas earlier in this same chapter.

Their question reveals how little of his teaching had actually landed yet.

🤔 The crowd cannot fit death with a king
🔀 They treat these as two separate ideas
🔗 Jesus had already connected both ideas
📖 Their question shows little had landed yet

## Yet A Little While Is The Light With You

Jesus is describing how much time remains before his death and departure.

Light here means his own presence, teaching, and truth among them.

That window of time was closing faster than the crowd realized.

Jesus urges urgency because this chance to respond would not last forever.

⏳ Little time remained before his death
💡 Light means his presence and truth
⌛ The window was closing fast
📖 Urgency matters because it will not last

## Walk While Ye Have The Light, Lest Darkness Come Upon You

Walking here is a picture for how someone lives and makes daily choices.

Jesus urges the crowd to respond now, before this opportunity disappears.

Darkness in this picture means confusion, danger, and real spiritual loss.

Waiting too long to decide carries a real and lasting cost.

🚶 Walking pictures daily choices and living
⏰ Jesus urges a response right now
🌑 Darkness means confusion and real loss
📖 Delay carries a lasting cost

## He That Walketh In Darkness Knoweth Not Whither He Goeth

Someone walking at night cannot see the path or any obstacles ahead.

Jesus uses that simple, everyday picture to describe life without him.

Without his light, a person moves forward with no real direction.

The image makes an abstract spiritual truth easy to actually picture.

🌑 Night walking means no visible path
🖼️ Jesus uses an everyday picture here
🧭 Without him, there is no real direction
📖 A simple image carries a deep truth

## Departed, And Did Hide Himself From Them

Jesus withdraws from public view right after finishing this teaching.

This marks the last time John shows Jesus publicly addressing the crowds directly.

He is not hiding out of fear, his time is simply being managed carefully.

What follows in the chapter becomes John's own summary of this public rejection.

🙈 Jesus withdraws from public view here
🔚 This ends his public teaching to crowds
⏳ His timing is managed, not fear
📖 John now steps back to summarize

# John 12:37-43
# 📜 Though They Believed Not
---
## Though He Had Done So Many Miracles Before Them, Yet They Believed Not On Him

John pauses the narrative to make sense of all the unbelief just witnessed.

Miracles alone, even many of them, never guarantee that people will actually believe.

Seeing Lazarus raised and still refusing to believe shows how deep this resistance ran.

John now turns to scripture itself to explain why this was happening.

⏸️ John pauses to explain the unbelief
👁️ Even many miracles did not create belief
🪦 Even Lazarus raised did not convince everyone
📖 John turns to scripture to explain why

## That The Saying Of Esaias The Prophet Might Be Fulfilled

Esaias is simply the Greek form of the name Isaiah.

John quotes Isaiah to show this unbelief was not a surprise to God.

The prophet had described this exact pattern of rejection centuries beforehand.

Fulfilled here means the old prophecy was playing out exactly as written.

📛 Esaias is the Greek form of Isaiah
📜 Isaiah had predicted this rejection
⏳ The prophecy was centuries old
📖 It is playing out exactly as written

## Lord, Who Hath Believed Our Report?

This line comes from Isaiah's famous description of a suffering servant.

That servant passage describes someone despised and rejected by his own people.

Isaiah asks this question centuries before Jesus, almost as if watching it happen.

Very few people actually believed what they were being told about this servant.

📜 This quotes Isaiah's suffering servant passage
💔 The servant is despised and rejected
⏳ Isaiah wrote this centuries early
📖 Very few believed the report

## He Hath Blinded Their Eyes, And Hardened Their Heart

This quotes Isaiah chapter six, from a vision of God's throne room.

Blinding here is not random, it comes as a result of persistent rejection.

God is not forcing unbelief on innocent people against their will.

This describes a hardening that grows naturally from refusing the truth repeatedly.

📜 This quotes Isaiah's throne room vision
🙈 Blindness results from persistent rejection
🚫 This is not forced on innocent people
📖 Hardening grows from repeated refusal

## Lest They Should Be Converted, And I Should Heal Them

This finishes the Isaiah quote describing a tragic, locked in pattern.

Seeing, understanding, turning, and healing were meant to follow one after another.

Persistent rejection broke that chain before healing could ever arrive.

The tragedy is not God's unwillingness, it is the people's repeated refusal.

🔗 Seeing, turning, and healing form one chain
💔 Persistent rejection broke that chain
🙅 The problem was never God's unwillingness
📖 Repeated refusal caused the tragedy

## These Things Said Esaias, When He Saw His Glory

John makes a striking claim about what Isaiah actually saw in his vision.

John says Isaiah's vision of God's glory was really a vision of Christ.

This connects Jesus directly to the God Isaiah saw enthroned in that vision.

Isaiah's ancient vision and this moment in Jerusalem point to the exact same person.

👁️ John says Isaiah saw Christ's glory
👑 This connects Jesus to God enthroned
⏳ An ancient vision and this moment align
📖 Both point to the exact same person

## Nevertheless Among The Chief Rulers Also Many Believed On Him

Not every religious leader rejected Jesus, despite the official opposition.

Many of these rulers believed privately but stayed quiet about it publicly.

Their hidden faith reveals how much social pressure shaped public behavior.

Belief and public confession did not always travel together in this setting.

👑 Some rulers secretly believed in Jesus
🤫 They stayed quiet about their faith
😨 Social pressure shaped their public behavior
📖 Belief and confession did not always match

## Because Of The Pharisees They Did Not Confess Him

Being put out of the synagogue meant total exclusion from Jewish religious and social life.

It cut a person off from worship, community, and often their own family.

This fear was powerful enough to silence genuine belief in public.

Hidden faith protected their status at the real cost of open loyalty.

🚪 Being put out meant total exclusion
👥 It cut people off from community
😨 This fear silenced public belief
📖 Status won out over open loyalty

## For They Loved The Praise Of Men More Than The Praise Of God

John names the real reason behind their silence in one plain sentence.

Human approval mattered more to them than approval from God himself.

This is not a problem only for ancient religious leaders.

The same quiet trade still tempts anyone who craves being accepted by others.

🎯 John names their real motive plainly
👥 Human approval mattered more than God's
🪞 This temptation is not only ancient
📖 Craving acceptance still tempts people today

# John 12:44-50
# 💡 I Am Come A Light Into The World
---
## He That Believeth On Me, Believeth Not On Me, But On Him That Sent Me

Jesus is not separating belief in himself from belief in God.

Trusting Jesus and trusting the Father are really the same single act of faith.

Jesus is making one final, direct claim about who he actually is.

This statement leaves no room for rejecting Jesus and still claiming God.

🔗 Belief in Jesus equals belief in God
🤝 Trusting both is really one single act
🗣️ Jesus makes a direct claim here
📖 Rejecting Jesus means rejecting God too

## He That Seeth Me Seeth Him That Sent Me

Jesus claims to be the visible, human face of the invisible God.

Anyone who has watched Jesus act has watched God act through him.

This claim only makes sense if Jesus truly shares God's own nature.

Seeing Jesus clearly is the closest any person can get to seeing God himself.

👤 Jesus is the visible face of God
👀 Watching Jesus means watching God act
✨ This claim requires sharing God's nature
📖 Seeing Jesus is the closest view of God

## I Am Come A Light Into The World

Jesus has already used this exact image earlier in this Gospel.

Light here means truth, guidance, and life itself, not literal sunlight.

He is naming his entire purpose for coming in one short phrase.

This claim ties directly back to John's own opening words about Jesus.

💡 Jesus repeats his earlier light claim
✨ Light means truth, guidance, and life
🎯 One phrase names his whole purpose
📖 This echoes John's opening words

## That Whosoever Believeth On Me Should Not Abide In Darkness

Abiding in darkness means staying stuck in confusion, sin, and separation from God.

Jesus offers an exit from that darkness to absolutely anyone who believes.

Whosoever makes this offer completely open, with no exceptions based on background.

Belief is the one condition that moves a person from dark into light.

🌑 Abiding in darkness means staying stuck in sin
🚪 Jesus offers an exit from that darkness
🌍 Whosoever means this offer excludes no one
📖 Belief moves a person into the light

## I Came Not To Judge The World, But To Save The World

Jesus states plainly why he came the first time.

Judgment was not the goal of this first visit to earth.

Saving people was the entire point of his coming.

A future day of judgment still waits, but that is not what this moment is about.

🎯 Jesus states his purpose plainly
🚫 Judgment was not this visit's goal
❤️ Saving people was the entire point
📖 A future judgment still waits ahead

## The Word That I Have Spoken, The Same Shall Judge Him In The Last Day

Rejecting Jesus now does not mean escaping judgment forever.

His own spoken words become the standard used to measure that later judgment.

Nothing extra needs adding, the message already given is enough to judge by.

What someone does with his words now quietly decides their outcome later.

⚖️ Rejecting Jesus does not escape judgment
📝 His own words become the standard
✅ No extra evidence needs adding later
📖 A response now decides the outcome later

## I Have Not Spoken Of Myself

Jesus is not presenting his own private opinions or personal philosophy.

Everything he teaches comes directly from the Father who sent him.

This removes any idea that Jesus was simply a clever, independent teacher.

His authority rests entirely on where his words actually came from.

🗣️ Jesus is not sharing personal opinions
🔗 His teaching comes directly from the Father
🚫 He was not an independent teacher
📖 His authority rests on his true source

## His Commandment Is Life Everlasting

God's instructions were never just a list of rules to obey.

Following them actually leads somewhere, into real and lasting life.

Jesus connects simple obedience directly to the biggest promise in scripture.

The goal behind every command was always life, not restriction for its own sake.

📜 Commandments were never just a rule list
➡️ Obedience leads somewhere real and lasting
✨ Jesus links obedience to eternal life
📖 The goal was always life, not restriction

## As The Father Said Unto Me, So I Speak

Jesus closes this public teaching by returning to perfect obedience one more time.

He claims no personal agenda hidden behind anything he has said.

His words function as an exact transmission of what the Father told him.

This final line sums up his whole relationship with the Father in one sentence.

🔁 Jesus returns to obedience one final time
🚫 He hides no personal agenda
📡 His words transmit the Father exactly
📖 One sentence sums up his whole mission
`.trim();

export const JOHN_TWELVE_PERSONAL_SECTIONS = parseJohnTwelveRawNotes(JOHN_TWELVE_RAW_NOTES);
