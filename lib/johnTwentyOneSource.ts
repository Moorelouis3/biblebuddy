export type JohnTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnTwentyOneRawNotes(rawText: string): JohnTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 21:${startVerse}` : `John 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 John 21 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_TWENTY_ONE_RAW_NOTES = `# John 21:1-3
# 🎣 Back To The Boats
---
## 🌊 Shewed Himself Again At The Sea Of Tiberias

"Shewed" is an old way of spelling showed.

The Sea of Tiberias is another name for the Sea of Galilee.

Herod built a city called Tiberias on its shore.

He named the city after the Roman emperor.

John uses this newer Roman name instead of the older one.

🌊 Shewed means showed

🏙️ Tiberias was a city on the lake

👑 Named after a Roman emperor

📖 Another name for the Sea of Galilee

## 🌾 Nathanael Of Cana In Galilee

Nathanael appears early in this Gospel, back in chapter one.

There, Philip brought him to Jesus from the town of Cana.

Many believe Nathanael is the same man called Bartholomew in the other Gospels.

The Gospels often use more than one name for the same person.

🌾 Nathanael came from Cana in Galilee

👋 Philip first introduced him to Jesus

🔄 Other Gospels may call him Bartholomew

📖 Same man, different names in different books

## 🌩️ The Sons Of Zebedee

The sons of Zebedee are James and John.

Mark's Gospel calls them the sons of thunder.

That nickname likely points to their bold, forceful personalities.

John probably avoids naming himself directly here, as he does throughout this Gospel.

🌩️ Sons of Zebedee means James and John

⚡ Mark calls them sons of thunder

🔥 The name points to bold personalities

📖 John avoids naming himself again here

## ❓ Two Other Of His Disciples

John never names these final two men.

Not every detail in scripture gets fully explained.

Some things are simply left for the reader to wonder about.

What happens next matters more than who exactly watched it.

❓ Two disciples stay unnamed

🤐 Scripture does not explain every detail

🙇 Some things are simply left untold

📖 What happens next matters more than their names

## 🎣 I Go A Fishing

"I go a fishing" is an old way of saying I am going fishing.

Fishing was Peter's trade before Jesus ever called him.

He returns to familiar work during an uncertain wait.

This does not mean Peter has given up his calling.

A waiting season can still be full of ordinary work.

🎣 A fishing is an old phrase for fishing

🪢 Fishing was Peter's trade before Jesus called him

⏳ He waits on an uncertain future

📖 Busy hands can still be waiting on God

## 🌑 That Night They Caught Nothing

An entire night of work ends with empty nets.

Luke's Gospel records an earlier night just like this one, long before this.

That first time, Jesus filled the nets after a hopeless night of fishing.

The same pattern is about to repeat itself here.

🌑 A whole night brings no fish

📜 Luke tells of an earlier empty night

🐟 Jesus filled empty nets once before

➡️ The same pattern is about to repeat

# John 21:4-8
# 🌅 A Stranger On The Shore
---
## 👁️ The Disciples Knew Not That It Was Jesus

Morning light and distance from shore make him hard to recognize.

Mary had the same trouble at the tomb two chapters earlier.

Many scholars believe the risen body of Jesus looked different in some way.

Recognizing Jesus seems to take more than simply seeing him.

👁️ Distance makes him hard to recognize

😢 Mary had the same trouble earlier

🆕 His risen body may have looked different

📖 Recognizing Jesus takes more than sight

## 🍞 Children, Have Ye Any Meat

"Children" here is a warm, informal way to address the group.

"Meat" in this verse means food in general, not only flesh.

Jesus already knows the answer before he asks the question.

The question opens a conversation instead of simply stating a fact.

👶 Children is a warm, informal address

🍽️ Meat here just means food

🤔 Jesus already knows their answer

📖 A question opens the conversation

## 🕸️ Cast The Net On The Right Side Of The Ship

A stranger on the shore tells tired fishermen exactly where to throw their net.

Simple obedience to an unknown voice is all that is asked of them.

They have no reason yet to expect anything will change.

They still choose to try it anyway.

🕸️ A stranger gives a simple instruction

🙋 They have no reason to expect success

🤝 They choose to obey anyway

📖 Small obedience opened a miracle

## 🐟 Not Able To Draw It For The Multitude Of Fishes

The net suddenly becomes impossibly heavy.

So many fish fill it that the men cannot pull it in.

One simple instruction changes an empty night into overflowing abundance.

God's provision often arrives suddenly, not gradually.

🐟 The net fills with fish

💪 Too heavy for the men to pull

⚡ Emptiness turns to abundance in a moment

📖 God's provision often arrives suddenly

## 💡 It Is The Lord

John recognizes Jesus first, before anyone actually sees his face clearly.

The miracle itself is what gives him away.

John remembers a very similar catch from years earlier.

Faith here notices the pattern of Jesus before it notices his face.

💡 John recognizes Jesus first

🕸️ The miracle gives him away

🔁 He remembers an earlier, similar catch

📖 Faith can notice a pattern before a face

## 👕 He Girt His Fisher's Coat Unto Him, For He Was Naked

"Naked" here does not mean completely undressed.

It likely means Peter was wearing only a light undergarment.

He kept working in it right up to this moment.

He quickly wraps his outer coat around himself before jumping in.

Peter cannot wait for the boat to reach the shore.

👕 Naked means lightly dressed here

🎽 Peter wears only a light undergarment

🏃 He wraps his coat on fast

📖 Peter cannot wait for the boat

## 📏 Two Hundred Cubits

A cubit was an ancient measurement based on the length of a forearm.

Two hundred cubits comes out to about the length of a football field.

The other disciples are close enough to shore to see everything happening.

Measuring the distance helps the reader picture the whole scene clearly.

📏 A cubit is about one forearm's length

🏈 About the length of a football field

👀 The disciples are near enough to see

📖 The distance helps picture the scene

# John 21:9-14
# 🔥 Breakfast On The Beach
---
## 🔥 A Fire Of Coals

This exact phrase appears only one other place in this Gospel.

Peter warmed himself at a fire of coals the night he denied Jesus.

Now Jesus prepares a very similar fire for him on this beach.

The same picture that once surrounded Peter's failure now surrounds his restoration.

🔥 Fire of coals appears earlier too

😔 Peter denied Jesus beside one

🌅 Jesus builds a similar fire now

📖 The same picture now surrounds restoration

## 🤝 Bring Of The Fish Which Ye Have Now Caught

Jesus already has fish and bread cooking on his own fire.

He still asks the disciples to bring their catch as well.

God's provision does not erase the value of human effort.

Jesus welcomes what they worked for into what he already prepared.

🤝 Jesus already has food ready

🐟 He still asks for their catch

💪 Human effort still has real value

📖 Jesus welcomes their work into his provision

## 🔢 An Hundred And Fifty And Three

John records the exact number of fish in the net.

That is an oddly specific detail to remember and record.

It reads like an eyewitness detail.

It does not read like an invented symbol.

Some search for hidden meaning in this number.

The text itself explains no such meaning.

🔢 An exact count of fish

🎣 An eyewitness kind of detail

🤷 The text explains no hidden meaning

📖 Real memory, not invented symbolism

## 🕸️ Yet Was Not The Net Broken

An earlier miracle catch in Luke's Gospel actually broke the net.

This net holds together under the very same kind of load.

John notices this small difference and records it on purpose.

Even small, specific details can carry real meaning in this Gospel.

🕸️ Luke's earlier net had broken

💪 This net holds under the same load

✍️ John records the difference on purpose

📖 Small details can carry real meaning

## 🍽️ Come And Dine

Jesus invites them to a simple, ordinary meal.

"Dine" here just means to eat a meal together.

The risen Lord of all creation still shares breakfast with his friends.

Even the greatest moments can look like an ordinary morning.

🍽️ Dine means to share a meal

👑 The risen Lord still eats with friends

🌅 A huge moment looks like an ordinary morning

📖 Greatness can look completely ordinary

## 🤐 None Durst Ask Him, Who Art Thou

"Durst" is an old word meaning dared.

Nobody dares question who is sitting with them.

They already know the answer without needing to ask it.

Quiet certainty has replaced their earlier confusion and fear.

🤐 Durst means dared

🙇 Nobody dares to ask the question

💡 They already know who he is

📖 Certainty has replaced their confusion

## 🍞 Taketh Bread, And Giveth Them, And Fish Likewise

Jesus takes bread and gives it to them with his own hands.

He did the very same thing feeding the five thousand in chapter six.

He did something similar again at the table during the last supper.

The risen Jesus still serves his followers with his own hands.

🍞 Jesus takes and gives bread himself

👥 It echoes feeding the five thousand

🍷 It echoes the last supper too

📖 The risen Jesus still serves his own

## 🔁 The Third Time

John carefully counts this as the third appearance to the group.

He does not count appearances to individuals like Mary Magdalene separately.

John is tracking something specific here, not a full list of every sighting.

Careful counting shows this Gospel cares about reliable, exact testimony.

🔁 John counts this as the third

👥 He counts group appearances specifically

📝 Not a complete list of sightings

📖 Careful counting shows reliable testimony

# John 21:15-17
# 🐑 Feed My Sheep
---
## 📛 Simon, Son Of Jonas

Jesus uses Peter's birth name here instead of the nickname Peter.

That same birth name was used back when Jesus first called him.

Returning to it now signals an especially personal, weighty moment.

A name from the beginning reopens a conversation that matters deeply.

📛 Jesus uses Peter's birth name

🔙 The same name marked his first calling

❗ It signals a weighty, personal moment

📖 This name reopens a deep conversation

## ❤️ Lovest Thou Me More Than These

"These" could mean the boats and nets Peter just returned to.

It could also mean the other disciples standing right there with him.

Peter had once boasted he would stay loyal even if everyone else fell away.

Jesus may be gently testing that very same boast.

❤️ These may mean the boats and nets

👥 These may mean the other disciples

🗣️ Peter once boasted about his loyalty

📖 Jesus may be testing that old boast

## 🐑 Feed My Lambs

Lambs here are the younger or newer followers of Jesus.

Jesus had already called himself the good shepherd back in chapter ten.

Peter is now being handed a piece of that same shepherding work.

Caring for young believers becomes Peter's new assignment.

🐑 Lambs means newer followers

🛡️ Jesus already called himself the shepherd

🤝 Peter is handed shepherding work

📖 Caring for young believers is his new job

## 🐏 He Saith Unto Him Again The Second Time, Feed My Sheep

The second question repeats with only one small change in the animal.

Sheep here are the more mature believers, not only the newest ones.

Jesus is placing the whole flock into Peter's care, young and old alike.

One calling now covers every stage of the church's life.

🐏 Sheep means more mature believers

🐑 Lambs and sheep together make the whole flock

🤲 Peter's care now covers everyone

📖 One calling for every stage of faith

## 😔 The Third Time, Lovest Thou Me

Jesus asks the same question a third time in a row.

Three questions line up exactly with Peter's three denials by the fire.

That earlier fire of coals is still fresh in everyone's memory.

Painful repetition becomes the exact shape of Peter's healing.

😔 A third question in a row

🔥 Three denials happened by a fire too

🩹 Painful repetition becomes healing

📖 Failure's shape becomes restoration's shape

## 💔 Peter Was Grieved

The third question stings in a way the first two did not.

Peter likely hears an echo of his own three denials in it.

Grief here comes from being fully known, not from being falsely accused.

Real love can still ask a question that hurts.

💔 The third question stings Peter

🔁 It echoes his own three denials

👁️ Grief comes from being fully known

📖 Love can still ask a question that hurts

## 🙏 Lord, Thou Knowest All Things

Peter stops making confident promises about his own loyalty.

He once promised more than he could actually deliver.

Now he simply appeals to what Jesus already knows about him.

Trusting what Jesus knows is safer than trusting his own feelings.

🙏 Peter stops over promising

📉 He once promised more than he kept

🧠 He appeals to what Jesus knows

📖 Trusting Jesus beats trusting your own feelings

# John 21:18-19
# ✝️ Follow Me Again
---
## ❗ Verily, Verily, I Say Unto Thee

"Verily" means truly.

Jesus doubles the word here for extra weight and certainty.

This phrase appears often in this Gospel right before something important.

A serious prophecy is about to follow this solemn opening.

❗ Verily means truly

🔁 Doubling the word adds weight

📣 This phrase often signals something important

📖 A serious prophecy is coming next

## 🚶 Walkedst Whither Thou Wouldest

"Walkedst whither thou wouldest" is an old way of saying you walked wherever you wanted.

Young Peter had full control over his own movements and choices.

He could go fishing, travel, or act on his own terms.

That freedom describes Peter's whole life up to this very moment.

🚶 He once walked wherever he wanted

🆓 Young Peter controlled his own choices

🎣 Freedom marked his life until now

📖 This freedom is about to change

## ⛓️ Another Shall Gird Thee, And Carry Thee Whither Thou Wouldest Not

Jesus describes Peter's old age using the picture of being bound and led away.

"Gird" here means to be tied or bound by someone else's hands.

Peter will eventually go somewhere he would not choose on his own.

Early church writers believed this points directly to Peter's death by crucifixion.

⛓️ Gird means bound by another

🚫 He will go where he would not choose

✝️ Early writers connect this to his crucifixion

📖 Jesus foretells the cost of following him

## 🕊️ Signifying By What Death He Should Glorify God

John explains plainly what Jesus's strange words actually mean.

This is a direct prophecy about how Peter would eventually die.

Tradition holds that Peter was crucified decades after this conversation.

Even a death like that could still bring glory to God.

🕊️ John explains the hidden meaning

✝️ It predicts how Peter would die

📜 Tradition says Peter was later crucified

📖 Even death can glorify God

## ➡️ Follow Me

These are the exact same two words Jesus used when he first called Peter.

Back then, Peter left his nets behind to follow a stranger.

Now the same call includes the full cost of what following means.

The invitation never really changed, only Peter's understanding of its price.

➡️ The same two words as his first calling

🎣 He once left his nets for these words

💰 Now the cost is fully known

📖 The invitation never changed

# John 21:20-23
# ❓ What Shall This Man Do
---
## 👣 The Disciple Whom Jesus Loved Following

This is John, identifying himself again without using his own name.

John also leaned close to Jesus at the table during the last supper.

That same closeness from the upper room is still visible here on the beach.

A real friendship with Jesus marks this disciple throughout the whole Gospel.

👣 John follows close behind them

🍽️ He once leaned near Jesus at supper

🔁 The same closeness shows up again here

📖 Real friendship marks this whole Gospel

## ❓ Lord, And What Shall This Man Do

Peter has just heard a hard, costly prophecy about his own death.

He immediately turns his attention to someone else's future instead.

Curiosity, or simple comparison, pulls his focus away from his own calling.

It is a very human reaction right after hard news.

❓ Peter asks about John's future

🔄 His focus shifts from his own calling

👥 Comparison is a very human reaction

📖 Hard news often turns eyes toward others

## 🛑 If I Will That He Tarry Till I Come, What Is That To Thee

"Tarry" means to remain or stay in one place.

Jesus does not answer Peter's question about John directly at all.

Instead he gently redirects Peter back to his own calling.

Comparing one calling to another is simply not Peter's business.

🛑 Tarry means to remain

🚫 Jesus will not answer that question

🔁 He redirects Peter back to himself

📖 Comparing callings is not Peter's business

## ➡️ Follow Thou Me

Jesus repeats the same two words from earlier in this chapter.

Each disciple carries a different calling and a different cost.

Peter's only real job is to keep his own eyes on Jesus.

Every believer eventually needs to hear this same, simple instruction.

➡️ The same instruction repeats here

🧭 Each disciple has a different calling

👁️ Peter's job is to watch Jesus, not John

📖 Every believer needs to hear this

## 🗣️ This Saying Abroad Among The Brethren, That That Disciple Should Not Die

A rumor spreads among the earliest believers about John never dying.

"Abroad" here simply means the rumor traveled widely among them.

John corrects this exact misunderstanding directly in his own words.

Jesus never actually said John would not die, only that his future was not Peter's business.

🗣️ A rumor spreads about John

🌍 Abroad means the rumor traveled widely

✍️ John corrects it himself in writing

📖 Jesus never promised John would not die

# John 21:24-25
# 📖 The Witness Who Wrote It Down
---
## ✍️ This Is The Disciple Which Testifieth Of These Things, And Wrote These Things

John steps forward one final time to identify himself as the author.

"Testifieth" means to give eyewitness testimony, like a witness in a courtroom.

John claims both to have witnessed these events and to have written them down.

This Gospel ends the way careful legal testimony often does, by naming its source.

✍️ John identifies himself as the author

⚖️ Testifieth means to give eyewitness testimony

👁️ He claims to have witnessed it himself

📖 The Gospel closes by naming its source

## ✅ We Know That His Testimony Is True

This line speaks in the voice of more than one person.

Many believe it reflects the early church community backing John's account.

Their endorsement adds outside confirmation to what John has personally claimed.

A trusted witness is stronger when others can vouch for him too.

✅ Others confirm John's account here

👥 It sounds like the early church speaking

🤝 Outside confirmation backs his personal claim

📖 A witness is stronger with others vouching

## 🌍 The World Itself Could Not Contain The Books That Should Be Written

This is a deliberate exaggeration, not a literal measurement of books and shelves.

John means that Jesus did far more than any library could ever hold.

The whole earth running out of room is simply a vivid way to say so.

Twenty one chapters were never meant to be the complete story.

🌍 A deliberate exaggeration, not a literal claim

📚 Jesus did more than any library could hold

🙌 It is a vivid way to say so

📖 This Gospel was never meant to be complete

## 🙏 Amen

"Amen" is a word meaning let it be so, or this is true.

It usually closes a prayer, a blessing, or a solemn statement.

Placing it here marks this entire Gospel as a solemn, truthful testimony.

The book that opened by calling Jesus the Word now closes on that same note of certainty.

🙏 Amen means let it be so

🔒 It usually closes something solemn

📜 It marks this whole Gospel as true

📖 The Gospel ends on certainty
`.trim();

export const JOHN_TWENTY_ONE_PERSONAL_SECTIONS = parseJohnTwentyOneRawNotes(JOHN_TWENTY_ONE_RAW_NOTES);
