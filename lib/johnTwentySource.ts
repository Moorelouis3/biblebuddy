export type JohnTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnTwentyRawNotes(rawText: string): JohnTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 20:${startVerse}` : `John 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 John 20 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_TWENTY_RAW_NOTES = `# John 20:1-2
# 👣 The Empty Tomb
---
## 📅 The First Day Of The Week

The first day of the week means Sunday on the Jewish calendar.

The Sabbath ran from Friday evening to Saturday evening, so Sunday opened a brand new week.

Jesus rose on this day, and believers have gathered on Sundays ever since to remember it.

This day became known as the Lord's day.

📅 The first day means Sunday

🕯️ The Sabbath ended Saturday evening

⛪ Believers still gather on Sundays

📖 This day became the Lord's day

## 👩 Mary Magdalene

She is the first person to reach the tomb that morning.

Luke's Gospel says Jesus had delivered her from seven devils years earlier.

She had stayed near Jesus through the crucifixion when many others ran away.

Her loyalty now brings her back before the sun is even up.

👩 Mary Magdalene reaches the tomb first

😈 Jesus freed her from seven devils

✝️ She stayed near him at the cross

📖 Loyalty brought her back at dawn

## 🪨 Seeth The Stone Taken Away From The Sepulchre

A sepulchre is simply a tomb cut into solid rock.

Large stones sealed tombs like this one to keep out animals and grave robbers.

Matthew's Gospel says this particular stone had also been sealed and guarded by soldiers.

Finding it moved was shocking, since nobody could roll a stone like that quietly.

🪨 Sepulchre means a rock cut tomb

🚪 Large stones normally sealed tombs shut

💂 Soldiers had sealed and guarded this one

📖 A moved stone meant something big happened

## 💗 The Other Disciple, Whom Jesus Loved

The other disciple whom Jesus loved is John, the writer of this Gospel.

John never names himself directly anywhere in his own book.

He describes himself this way instead, out of humility and wonder.

The phrase points to a real and personal friendship between Jesus and John.

📝 John never names himself here

🙇 He uses this phrase instead

❤️ It points to real friendship

📖 Jesus loved John personally

## 😟 We Know Not Where They Have Laid Him

Mary assumes someone has stolen the body.

That was the most reasonable explanation available to her at the time.

Nobody present yet expects a resurrection.

Jesus had already told them this would happen, but grief makes it hard to remember.

😟 Mary assumes the body was stolen

🤔 That seemed like the only explanation

🙈 Nobody expected a resurrection yet

📖 Jesus had already told them this

# John 20:3-10
# 🏃 The Race To The Tomb
---
## 🏃 Peter Therefore Went Forth, And That Other Disciple

Peter and John both race toward the tomb the moment they hear the news.

They set out immediately after hearing Mary's frightening report.

Their urgency shows how seriously they take her words.

Neither man wastes a single moment getting there.

🏃 Peter and John both run

📣 Mary's report sends them running

⏱️ They waste no time at all

➡️ Urgency reveals how much this matters

## 💨 So They Ran Both Together

Both men run the whole distance side by side.

Running in public was not considered dignified for grown men in this culture.

Normal customs did not matter anymore after news like this.

Their dignity became far less important than the truth.

💨 Both men ran the whole way

🎭 Running broke normal social dignity

🚫 Custom no longer mattered to them

📖 Truth mattered more than appearance

## 🥇 The Other Disciple Did Outrun Peter

John reaches the tomb before Peter does.

Many readers believe John was simply younger and faster on his feet.

The text never explains why, only that it happened this way.

Being first does not make John the more important figure in this story.

🥇 John arrives at the tomb first

🏃 He was likely younger and faster

❓ The text gives no clear reason

📖 Being first is not the point

## 👀 Stooping Down, And Looking In

Tomb entrances in this culture were cut low into the rock.

Anyone looking inside had to bend down just to see anything at all.

John peers inside but does not step through the opening yet.

Both caution and reverence are visible in this small detail.

👀 Low openings forced a stooped look

🪨 Tombs were cut low into rock

🙇 John looks but does not enter

📖 Small details can carry real meaning

## 🧵 Saw The Linen Clothes Lying

Linen clothes were the burial wrappings placed around the body of Jesus.

Those wrappings are still lying there, flat and undisturbed.

A grave robber in a hurry would never pause to unwrap a body first.

This small detail already argues against a simple theft.

🧵 Linen clothes were burial wrappings

📍 They remain lying in place

🚫 A thief would not unwrap a body

📖 This detail argues against theft

## 🚪 Yet Went He Not In

John stops just outside the tomb for a moment.

Reverence may have held him back as much as fear did.

Touching the dead carried real ceremonial weight in this culture.

He waits, letting Peter be the first one through the opening.

🚪 John pauses outside the tomb

🙏 Reverence may explain the pause

⚖️ Touching the dead carried ceremonial weight

📖 John lets Peter enter first

## 🗂️ Wrapped Together In A Place By Itself

A napkin here means a cloth that had covered the face of Jesus.

It sits neatly folded, separate from the rest of the burial cloths.

Grave robbers do not usually pause to fold anything before leaving in a hurry.

The careful order itself quietly points toward resurrection, not robbery.

🗂️ Napkin means a face cloth

🧻 It was folded, not scattered

🙅 Robbers do not stop to fold

📖 Order here points to resurrection

## 💡 He Saw, And Believed

John describes his own reaction here, still without naming himself.

Seeing the empty, orderly grave clothes is what convinces him.

He does not yet fully understand how, only that something has happened.

Belief arrives here before full understanding does.

💡 John believed at this moment

👀 The orderly scene convinced him

❓ Full understanding comes later

📖 Belief can arrive before understanding

## 📜 They Knew Not The Scripture, That He Must Rise Again

Even these two close disciples had not expected a resurrection.

Old Testament passages like Psalm sixteen had hinted at this all along.

Nobody had connected those verses to Jesus until this exact moment.

Understanding often arrives only after the event itself.

📜 Old Testament hints existed already

❓ Nobody connected them beforehand

💡 This moment finally opens their eyes

📖 Understanding can follow the event

## 🏠 The Disciples Went Away Again Unto Their Own Home

Peter and John leave the tomb and head back home.

They do not yet know what to do with what they have seen.

Mary stays behind, unwilling to leave so quickly.

Different people process the same event in very different ways.

🏠 Peter and John go home

🤷 They are unsure what comes next

🧍 Mary chooses to stay behind

📖 People process grief differently

## 🚶 Then Cometh Simon Peter Following Him

John calls him Simon Peter here, using both names together.

That fuller name often marks a weighty, memorable moment in this Gospel.

Peter arrives just after John, out of breath from the run.

He walks straight into the tomb without pausing outside.

🚶 Simon Peter arrives right after John

📛 The full name marks a weighty moment

🏃 Peter is out of breath

📖 He walks straight into the tomb

# John 20:11-18
# 🌅 Mary Meets The Risen Lord
---
## 😭 Mary Stood Without At The Sepulchre Weeping

Without here means outside, not a lack of something.

Mary stands outside the tomb long after the other two men have left.

Her grief keeps her rooted to this one spot.

She cannot bring herself to walk away yet.

😭 Without means outside here

🧍 Mary stays after the men leave

💔 Grief keeps her in this spot

📖 She cannot walk away yet

## 👀 Stooped Down, And Looked Into The Sepulchre

Mary finally looks inside the tomb herself.

She repeats the same stooping posture John used earlier in the chapter.

This time something inside is different.

Two figures now sit where the body used to lie.

👀 Mary looks inside herself now

🔁 She repeats John's earlier posture

✨ Something new waits inside

📖 Figures sit where the body lay

## 👼 Two Angels In White Sitting

White clothing in scripture usually signals something pure and heavenly.

One angel sits where the head of Jesus had rested.

The other sits where his feet had rested.

Their careful placement seems to frame the empty space on purpose.

👼 White signals something heavenly here

🛏️ One angel sits at the head

🦶 The other sits at the feet

📖 Their place frames the empty space

## ❓ Woman, Why Weepest Thou

The angels ask Mary a direct question instead of simply comforting her.

Weepest is an old way of saying weep or cry.

Their question gently points toward a fact Mary has not yet grasped.

There is no longer a real reason to weep here.

❓ Angels ask her directly

😢 Weepest is an old word for cry

💡 The question hints at good news

📖 There is no reason left to weep

## 💔 They Have Taken Away My LORD

Mary repeats almost the exact words she said back in verse two.

She still believes someone has stolen the body.

Grief is keeping her from seeing what is right in front of her.

Her sorrow is genuine, even though her conclusion is wrong.

💔 Mary repeats her earlier words

😟 She still assumes theft happened

😢 Grief blinds her for now

📖 Real sorrow, wrong conclusion

## 🌟 Saw Jesus Standing, And Knew Not That It Was Jesus

Mary turns and sees a man standing nearby.

She does not recognize him as Jesus at first.

Tears, low light, and shock could all explain this on their own.

Many scholars believe his risen body looked different as well.

🌟 Jesus stands near her

😢 Tears blur her eyes

🤔 Shock clouds her recognition

📖 His risen body looked different

## 🌱 Supposing Him To Be The Gardener

Mary assumes the man is simply the tomb's caretaker.

The garden tomb named back in chapter nineteen would have had a real gardener.

Her guess is completely reasonable given where she is standing.

The truth waiting for her is far bigger than she expects.

🌱 Mary assumes he tends the garden

🏡 Chapter nineteen already named a garden here

🤷 Her guess makes sense at first

📖 The truth is much bigger

## 📛 Jesus Saith Unto Her, Mary

Jesus does not argue or explain anything first.

He simply speaks her name.

John chapter ten already said his sheep know his voice when he calls them.

One word changes everything for her instantly.

📛 Jesus just says her name

👂 His sheep know his voice

⚡ One word changes everything

📖 Recognition comes through relationship

## 🗣️ Rabboni, Which Is To Say, Master

Rabboni is a Hebrew word meaning something close to my great one.

It carries more warmth than the more formal word Rabbi.

Mary reaches for the most personal title she can find.

Pure joy pours out through that one single word.

🗣️ Rabboni means my master

❤️ It sounds warmer than Rabbi

😊 Mary reaches for a personal word

📖 Joy pours out in one word

## ✋ Touch Me Not, For I Am Not Yet Ascended

This is not Jesus pushing Mary away in anger.

It is closer to saying do not cling to me yet.

Jesus still has unfinished work before he returns fully to the Father.

A new and lasting closeness is still coming, just not yet.

✋ Not a rejection, a redirection

🤲 Do not cling just yet

⏳ More work still remains

📖 New closeness comes later

## 👨‍👩‍👧‍👦 Go To My Brethren

Jesus calls the disciples his brethren here for the first time after rising.

Brethren is an old word for brothers, used broadly for close family.

Before this, he more often called them servants or friends.

His resurrection draws them into something closer to family.

👨‍👩‍👧‍👦 Brethren means brothers or close family

🔄 This title appears for the first time

🤝 He once called them friends

📖 Resurrection makes them family now

## 🙌 My Father, And Your Father, And To My God, And Your God

Jesus links himself and the disciples to the very same Father.

He is God's Son by nature, in a way no one else is.

Believers become God's children by adoption, through what Jesus has done.

The relationship is shared, but it is never identical.

🙌 Jesus shares his Father with them

👶 Believers become children by adoption

⚖️ The relationship is shared, not identical

📖 Grace brings believers into the family

## 📣 Mary Magdalene Came And Told The Disciples

Mary becomes the very first person to announce the resurrection.

A woman's testimony usually held little legal weight in this culture.

God chooses her anyway to deliver the most important news in history.

The first Easter sermon is preached by a woman who once wept alone at a tomb.

📣 Mary announces the news first

⚖️ A woman's testimony held little legal weight

👑 God still chooses her for this

📖 The first witness was a woman

# John 20:19-23
# 🕊️ Peace And Proof
---
## 🌆 The Same Day At Evening

This is still the very same Sunday, now moving toward evening.

An enormous amount happens within this single day.

The empty tomb, Mary's encounter, and this appearance all occur before nightfall.

God moves quickly once the resurrection begins.

🌆 Still the same Sunday

⏰ So much happens in one day

📆 All of it before nightfall

📖 God moves quickly here

## 😨 For Fear Of The Jews

The disciples hide behind locked doors after the crucifixion.

The Jews here means the hostile religious leaders, not the Jewish people as a whole.

Those same leaders had just had Jesus executed only days earlier.

The disciples have real reason to fear for their own lives.

😨 Disciples hide out of fear

⚖️ This means the hostile leaders specifically

🔒 Leaders had just killed Jesus

📖 Real danger, real fear

## ✨ Came Jesus And Stood In The Midst

Jesus appears inside a room with the doors still locked.

This does not mean he simply walked through solid wood like a ghost.

His resurrected body could move in ways ordinary bodies cannot.

Locked doors are no longer a barrier for him at all.

✨ Jesus appears despite locked doors

🚫 Not a trick, not a ghost

🆕 His risen body works differently

📖 No door can stop him now

## 🕊️ Peace Be Unto You

Peace be unto you was a completely ordinary, everyday Jewish greeting.

Jesus says it twice within this short passage alone.

After days of fear and confusion, the ordinary words now carry extra weight.

Real peace from the risen Jesus means far more than a polite hello.

🕊️ A normal everyday greeting

🔁 Jesus repeats it twice here

💬 Ordinary words, extra weight

📖 Real peace follows real fear

## 🙌 He Shewed Unto Them His Hands And His Side

Shewed is simply an old spelling of showed.

Jesus proves to the disciples that he is not a spirit or a vision.

The wounds from the cross are still visible on his risen body.

His body is real and touchable, still marked by what he suffered.

🙌 Shewed is an old word for showed

👐 He proves he is not a ghost

🩹 The wounds are still visible

📖 A real body, still marked by the cross

## 🚀 As My Father Hath Sent Me, Even So Send I You

Jesus hands his own mission straight to the disciples.

The Father had sent Jesus into the world for a purpose.

Now Jesus sends these ordinary men out the very same way.

The mission does not end just because Jesus is leaving.

🚀 Jesus passes on his mission

🌍 The Father sent Jesus first

🤝 Now he sends the disciples

📖 The mission continues after him

## 💨 He Breathed On Them, And Saith Unto Them, Receive Ye The Holy Ghost

Jesus breathes on the disciples and tells them to receive the Holy Ghost.

Genesis two describes God breathing life into the very first man.

This moment echoes that same picture of new life being given.

A fuller outpouring of the Holy Ghost still waits ahead at Pentecost.

💨 Jesus breathes on them here

🌬️ Genesis shows God breathing life

🔄 This moment echoes that picture

📖 Pentecost still waits ahead

## ⚖️ Whose Soever Sins Ye Remit, They Are Remitted Unto Them

Remit means to forgive or release a debt completely.

Retain means to hold something back instead of releasing it.

Jesus gives the disciples authority to declare forgiveness in his name.

This is about proclaiming the gospel offer, not disciples deciding who gets saved.

⚖️ Remit means forgive completely

🔒 Retain means hold back instead

📣 Disciples can declare forgiveness

📖 This is about proclaiming the gospel

# John 20:24-29
# ✋ The Doubt Of Thomas
---
## 👬 Thomas, One Of The Twelve, Called Didymus

Didymus is a Greek word meaning twin.

Thomas likely had a twin sibling, though scripture never names them.

He is one of the original twelve apostles chosen by Jesus.

This same man is often remembered only for doubting, though he was far more than that.

👬 Didymus means twin

👨‍👩‍👧 He likely had a twin sibling

✝️ One of the original twelve

📖 More than just his doubt

## 🚶 Was Not With Them When Jesus Came

Thomas happens to be absent during Jesus's first appearance.

Scripture never explains exactly why he was away.

Missing one gathering costs him well over a week of doubt.

Being absent at the wrong moment can carry a real cost.

🚶 Thomas missed this appearance

❓ No reason is given

⏳ He waits over a week now

📖 Absence has a real cost

## ✋ Except I Shall See In His Hands The Print Of The Nails

Thomas sets a specific, physical test before he will believe.

He wants to see and touch the actual nail wounds himself.

His doubt is honest, not rebellious or dismissive.

Many sincere believers have asked for proof somewhere along the way.

✋ Thomas demands physical proof

🩹 He wants to touch the wounds

🤔 His doubt is honest, not rebellious

📖 Many sincere believers ask for proof

## 📆 After Eight Days Again His Disciples Were Within

Eight days later lands on another first day of the week.

The disciples are already forming a pattern of Sunday gatherings.

This simple habit becomes the root of the Christian Sunday service.

A regular rhythm of meeting together is already beginning here.

📆 Eight days later is another Sunday

🔁 A gathering pattern is forming

⛪ This becomes the Sunday service

📖 A rhythm begins right here

## 🚪 Then Came Jesus, The Doors Being Shut

Jesus appears the exact same way he did the first time.

Locked doors still present no barrier for his risen body.

Thomas is finally in the room this time.

God arranges this second meeting specifically for the one who doubted.

🚪 Locked doors stop him again

🔁 Same miracle, second time

🙋 Thomas is finally present

📖 God arranges this just for him

## 👆 Reach Hither Thy Finger, And Behold My Hands

Jesus repeats Thomas's exact private words back to him.

Jesus was not even in the room when Thomas first said them.

This proves Jesus already knew Thomas's specific demand.

Nothing said in private is ever truly hidden from him.

👆 Jesus quotes Thomas's own words

👂 He was not there to hear them

🔍 He already knew the demand

📖 Nothing is hidden from Jesus

## 🙏 Be Not Faithless, But Believing

Jesus corrects Thomas gently, not harshly.

Faithless simply means without faith, not evil or hopeless.

Jesus invites Thomas forward instead of shaming him backward.

Doubt met with patience can still lead somewhere good.

🙏 A gentle correction, not a scolding

❓ Faithless just means without faith

🤝 Jesus invites him forward

📖 Patience can turn doubt into faith

## 👑 My LORD And My God

Thomas makes the clearest statement of who Jesus is in the whole Gospel.

He does not just call Jesus teacher or master here.

He calls him LORD and God, both titles belonging to God alone.

The doubter ends up giving the boldest confession in the entire book.

👑 Thomas calls Jesus LORD and God

🙌 This is the clearest confession yet

✝️ Both titles belong to God alone

📖 The doubter gives the boldest confession

## 👁️ Because Thou Hast Seen Me, Thou Hast Believed

Jesus names exactly what just happened for Thomas.

Seeing the risen body led directly to Thomas's belief.

Thomas received evidence that most future believers never will.

Jesus is not finished speaking about belief yet.

👁️ Seeing led to Thomas's belief

🖐️ He got evidence others will not

⏭️ Jesus has more to say

📖 Belief followed real evidence here

## 🙌 Blessed Are They That Have Not Seen, And Yet Have Believed

Jesus speaks past Thomas now to every future reader of this book.

Most believers will never see the nail marks for themselves.

Faith without physical proof carries its own special blessing.

This verse speaks directly to every reader holding this book right now.

🙌 Jesus speaks to future readers

👀 Most will never see the marks

✨ Unseen faith carries a blessing

📖 This verse speaks to you directly

# John 20:30-31
# 📖 Why John Wrote This Book
---
## ✨ Many Other Signs Truly Did Jesus

John admits he has left out a great deal of material.

Jesus performed far more miracles than any one book could ever hold.

John is not claiming to give a complete biography.

He has been selective on purpose this whole time.

✨ Jesus did far more than this

📚 One book could never hold it all

🎯 John chose his material on purpose

📖 Selection, not a full biography

## 📚 Which Are Not Written In This Book

Other true events about Jesus exist that John never records.

The other Gospels preserve some of that extra material.

Even all four Gospels together do not capture everything Jesus did.

What was written down was chosen for a specific reason.

📚 Other real events go unrecorded

📖 Other Gospels capture some of it

🧩 Even four books cannot hold it all

➡️ Everything written serves one goal

## ✝️ That Ye Might Believe That Jesus Is The Christ, The Son Of God

John finally states his whole purpose for writing this book.

Christ means anointed one, the promised King and rescuer of Israel.

Son of God points to Jesus's full and real divine identity.

Every sign recorded in this Gospel points toward this one conclusion.

✝️ John's whole purpose is stated here

👑 Christ means the promised anointed King

🙌 Son of God points to his divinity

📖 Every sign points to this truth

## 🌿 That Believing Ye Might Have Life Through His Name

Life is one of the most repeated words in John's entire Gospel.

Belief in Jesus is the one way to receive this kind of life.

Through his name means life comes by trusting in who Jesus actually is.

The whole Gospel has been building toward this one offer.

🌿 Life is John's recurring theme

🙏 Belief is how it is received

📛 His name means who he truly is

📖 The whole Gospel leads to this offer
`.trim();

export const JOHN_TWENTY_PERSONAL_SECTIONS = parseJohnTwentyRawNotes(JOHN_TWENTY_RAW_NOTES);
