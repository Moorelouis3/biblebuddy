export type JohnSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnSixteenRawNotes(rawText: string): JohnSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 16:${startVerse}` : `John 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 John 16 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_SIXTEEN_RAW_NOTES = `# John 16:1-4
# ⚠️ A Warning Before The Storm
---
## 🚧 That Ye Should Not Be Offended

"Offended" means far more than feeling hurt or insulted.

The word pictures someone tripping over a hidden stone and falling down completely.

Jesus means his followers might stumble away from faith itself under pressure.

He warns them now so the coming trouble does not catch them by surprise.

🚧 Offended means stumbling away from faith

💥 It pictures tripping over a hidden stone

🛑 Jesus warns before the trouble starts

📖 A warning now prevents a fall later

## 🚪 Put You Out Of The Synagogues

A synagogue was the center of Jewish worship, teaching, and community life.

Being put out meant total exclusion, cut off from family, trade, and faith alike.

This was not a minor inconvenience in that culture.

It meant losing almost every normal connection a person had.

Jesus is preparing his followers for a very real and painful cost.

🕍 Synagogue means the center of Jewish life

🚪 Being put out meant total exclusion

💔 Family, trade, and faith connections were lost

📖 Jesus prepares them for a real cost

## ⚔️ Killeth You Will Think That He Doeth God Service

Some who kill Jesus' followers will believe they are serving God by doing it.

Paul himself once persecuted Christians while convinced he was defending the truth.

Sincere belief does not always mean a person is right.

The worst cruelty in history has often hidden behind God's name wrongly claimed.

⚔️ Killers may believe they serve God

🙏 Paul once persecuted while believing that

❌ Sincerity does not guarantee being right

📖 Cruelty has hidden behind God's name before

## ❓ Because They Have Not Known The Father, Nor Me

Jesus names the real root cause behind all this coming persecution.

It is not political anger or simple misunderstanding.

It is a deeper failure to actually know God at all.

Knowing facts about God is not the same as truly knowing him.

❓ Persecution's root cause is named here

🙅 It is not political anger

🧠 It is a failure to truly know God

📖 Knowing facts differs from truly knowing God

## 🤝 I Said Not Unto You At The Beginning, Because I Was With You

Jesus explains why he never warned them about this earlier in his ministry.

While he was physically present with them, he absorbed the world's hostility himself.

Now that he is about to leave, they need to hear it directly.

His presence had been their shield the whole time without them even realizing it.

🤝 Jesus shielded them while present

🛡️ His presence absorbed the hostility himself

⏳ Now his departure makes the warning necessary

📖 Unseen protection is ending soon

# John 16:5-11
# 🕊️ Why Jesus Must Go
---
## ❓ None Of You Asketh Me, Whither Goest Thou

Grief has completely taken over the disciples' attention right now.

Peter asked this exact question earlier, back in John chapter thirteen.

Now nobody even thinks to ask it anymore.

Sorrow can crowd out even the most important questions a person should ask.

😢 Grief has taken over their attention

🔁 Peter asked this exact question before

🤐 Nobody thinks to ask it now

📖 Sorrow can crowd out the right question

## 💧 Sorrow Hath Filled Your Heart

Jesus names their emotional state directly instead of ignoring it.

Their hearts are completely full, with no extra room left for anything else.

He does not scold them for feeling this way.

He simply acknowledges it before explaining why it will not last.

💧 Jesus names their sorrow directly

🫗 Their hearts are completely full

🙆 He does not scold their grief

📖 Acknowledging pain comes before explaining it

## ⚖️ It Is Expedient For You That I Go Away

"Expedient" means truly better for them, even though it feels like a loss.

Jesus is not minimizing the pain of his departure.

He is naming a greater benefit that outweighs the coming grief.

Short term pain can still serve a long term good.

⚖️ Expedient means truly better, not easier

💔 His leaving still causes real pain

🎯 A greater benefit outweighs that grief

📖 Short term pain can serve long term good

## 🕊️ The Comforter Will Not Come Unto You

"Comforter" translates a Greek word meaning someone called alongside to help.

This is the Holy Spirit, already promised back in John chapter fourteen.

His coming depends directly on Jesus actually leaving first.

Jesus departing in the flesh makes room for the Spirit to arrive.

🕊️ Comforter means a helper called alongside

📜 Already promised back in chapter fourteen

🔁 His coming depends on Jesus leaving

📖 One must leave before the other arrives

## 🗣️ Reprove The World Of Sin, And Of Righteousness, And Of Judgment

"Reprove" means to convict, to prove someone wrong beyond excuse.

The Spirit's work covers three different areas listed here together.

Each one gets its own explanation in the next three verses.

This is the Spirit's ongoing work in the world after Jesus leaves.

🗣️ Reprove means to convict beyond excuse

🔢 Three areas are named together here

📋 Each gets its own explanation next

📖 This is the Spirit's ongoing work

## 🚫 Of Sin, Because They Believe Not On Me

The deepest sin named here is not a specific bad action.

It is refusing to believe in Jesus himself.

Every other wrong act eventually traces back to that one root rejection.

The Spirit convicts the world of this exact failure.

🚫 The deepest sin is unbelief itself

🌳 Other wrongs trace back to that root

🙅 Rejecting Jesus is the real failure

📖 The Spirit convicts the world of this

## 👑 Of Righteousness, Because I Go To My Father

Jesus returning to the Father proves his righteousness was always real.

The resurrection and the ascension vindicate everything he claimed about himself.

The world had judged Jesus as guilty and put him to death.

God reverses that verdict completely by raising and receiving him back.

👑 Returning to the Father proves righteousness

⚰️ The world judged Jesus guilty first

🔄 God reverses that verdict completely

📖 The resurrection vindicates everything Jesus claimed

## 💥 Of Judgment, Because The Prince Of This World Is Judged

"The prince of this world" is a name for Satan, the ruler behind human rebellion.

His defeat is already decided, even before it is fully carried out.

The cross breaks his power over anyone who turns to Jesus.

This judgment is the quiet victory sitting underneath the whole discourse.

👹 Prince of this world means Satan

⚔️ His defeat is already decided

✝️ The cross breaks his power

📖 Victory sits quietly under this whole discourse

# John 16:12-15
# 📜 The Spirit Of Truth
---
## ⏳ Many Things To Say Unto You, But Ye Cannot Bear Them Now

Jesus has more to teach, but the disciples are not ready yet.

Readiness matters as much as the truth itself.

Some lessons only make sense after the resurrection and Pentecost happen.

Timing is part of how God teaches, not an afterthought.

⏳ More truth exists than they can bear

🧠 Readiness matters as much as truth

🗓️ Some lessons wait for later events

📖 Timing is part of how God teaches

## 🧭 He Will Guide You Into All Truth

"Guide" means the Spirit leads them, rather than handing over information all at once.

He is called the Spirit of truth because he never distorts or hides it.

This guidance covers understanding and direction, not just raw facts.

The disciples are not left to figure out truth entirely on their own.

🧭 Guide means leading, not just informing

✅ Spirit of truth never distorts it

🗺️ Guidance covers understanding and direction

📖 They are not left on their own

## 🔗 He Shall Not Speak Of Himself

The Spirit does not introduce a separate, independent message of his own.

Everything he says comes directly from what he hears from the Father and the Son.

This shows a deep unity inside the Godhead itself.

The Spirit's role is to transmit, not to invent.

🔗 The Spirit brings no separate message

👂 He speaks only what he hears

🙏 This shows unity in the Godhead

📖 His role is to transmit, not invent

## ✨ He Shall Glorify Me

The Spirit's entire mission centers on lifting up Jesus, not himself.

Any teaching that quietly shifts attention away from Jesus misses this verse completely.

True spiritual experience always points back toward Christ.

The Spirit works behind the scenes on purpose.

✨ The Spirit's mission is to glorify Jesus

🙈 He never draws attention to himself

🎯 True spiritual experience points to Christ

📖 The Spirit works behind the scenes

## 🤝 All Things That The Father Hath Are Mine

Jesus claims complete and total ownership alongside the Father.

Nothing belonging to the Father is withheld from the Son.

This is why the Spirit can take from Jesus and still be fully true to the Father.

Shared ownership between Father and Son runs through this entire farewell discourse.

🤝 Jesus shares total ownership with the Father

🚫 Nothing is withheld from the Son

🔄 The Spirit stays true to both

📖 Shared ownership runs through this whole discourse

# John 16:16-22
# 😢 Sorrow Turned To Joy
---
## ⏳ A Little While, And Ye Shall Not See Me

Jesus speaks of two different short periods happening back to back.

The first little while is the short time until his death on the cross.

The second little while is the short time until his resurrection appearance.

Both stretches feel long to the disciples but are actually brief.

⏳ Two short periods are described here

✝️ The first ends at the cross

🌅 The second ends at the resurrection

📖 Both feel long but are truly brief

## ❓ What Is This That He Saith Unto Us

The disciples talk quietly among themselves instead of asking Jesus directly.

His wording genuinely confuses them in this moment.

They repeat his own words back and forth, trying to make sense of them.

Confusion here is honest, not a lack of faith.

❓ They talk among themselves, not to him

🤔 His wording genuinely confuses them

🔁 They repeat his words to each other

📖 Honest confusion is not a lack of faith

## 🤷 We Cannot Tell What He Saith

The disciples finally admit out loud that they are completely lost.

This is a rare moment of total honesty about their confusion.

They do not pretend to understand something they genuinely do not.

Admitting confusion is often the first step toward real understanding.

🤷 They openly admit total confusion

🙊 They do not pretend to understand

🫴 Honesty here is rare and real

📖 Admitting confusion opens the door to understanding

## 👀 Jesus Knew That They Were Desirous To Ask Him

Jesus perceives their unspoken question without them ever voicing it.

He does not wait to be asked before offering help.

This same insight appears again and again throughout John's Gospel.

Jesus meets confusion even when pride or fear keeps someone silent.

👀 Jesus perceives their unspoken question

🗣️ He answers before being asked

🔁 This insight repeats through John's Gospel

📖 Jesus meets confusion even when unspoken

## 😭 Ye Shall Weep And Lament, But The World Shall Rejoice

"Lament" means loud, open grief, far beyond quiet tears.

The disciples will openly mourn while Jesus is crucified and buried.

At the very same time, his enemies will celebrate what looks like a victory.

Those two reactions will happen side by side within hours of each other.

😭 Lament means loud, open grief

⚰️ Disciples mourn while Jesus is buried

🎉 Enemies celebrate what looks like victory

📖 Both reactions happen within the same hours

## 🔄 Your Sorrow Shall Be Turned Into Joy

This is not sorrow simply being replaced by a separate, unrelated joy.

The very same event causing the grief becomes the source of the joy.

The resurrection transforms the crucifixion's meaning completely.

Nothing about the pain is wasted or erased.

🔄 Sorrow transforms rather than gets replaced

✝️ The same event causes grief and joy

🌅 The resurrection changes the meaning completely

📖 No pain here goes to waste

## 🤱 A Woman When She Is In Travail Hath Sorrow

"Travail" means the intense pain and labor of childbirth.

Jesus chooses an image every ancient listener understood immediately.

The pain is real and sharp, but it has a clear limit.

It is not pain without purpose or without an end point.

🤱 Travail means the pain of childbirth

⏱️ The pain is real but has limits

🎯 It is pain with a clear purpose

📖 Jesus picks an image everyone understood

## 👶 She Remembereth No More The Anguish, For Joy

Once the child is born, the sharp memory of pain fades quickly.

The joy of new life does not erase that the pain happened.

It simply becomes small compared to what the pain produced.

This pictures exactly how the resurrection will reshape the disciples' sorrow.

👶 New life makes the pain fade fast

⚖️ Joy outweighs the memory of pain

🪞 This pictures the coming resurrection joy

📖 Great joy can shrink real pain

## 🔒 Your Joy No Man Taketh From You

This joy is permanent, unlike anything that depends on circumstances.

No person, threat, or loss can reach in and remove it.

The resurrection is the one event nothing can undo or take back.

That is why the joy built on it cannot be stolen either.

🔒 This joy cannot be taken away

🛡️ No threat or loss can reach it

✝️ The resurrection cannot be undone

📖 Joy built on it cannot be stolen

# John 16:23-28
# 🙏 Ask The Father In My Name
---
## 🚪 In That Day Ye Shall Ask Me Nothing

"That day" points to the time after the resurrection and the Spirit's coming.

The disciples will no longer need to ask Jesus their questions in person.

A new and direct kind of access to the Father opens up instead.

This is not a loss, it is an upgrade in how prayer works.

🚪 That day means after the resurrection

❓ They will not need to ask him questions

🔓 Direct access to the Father opens up

📖 This upgrade changes how prayer works

## 🏷️ Whatsoever Ye Shall Ask The Father In My Name

"In my name" means asking in line with Jesus' own character and purpose.

It is not a special phrase tacked onto the end of a prayer.

A request that truly matches what Jesus wants carries real weight with the Father.

This phrase already appeared back in John chapter fourteen.

🏷️ In my name means matching his purpose

🚫 It is not a magic phrase

⚖️ Matching requests carry real weight

📖 This phrase already appeared in chapter fourteen

## 🆕 Hitherto Have Ye Asked Nothing In My Name

"Hitherto" means up until this very point in time.

The disciples have never prayed this specific way before now.

Jesus is about to open an entirely new chapter of prayer for them.

Pentecost will make this new kind of asking fully possible.

🆕 Hitherto means up until right now

🙏 They have never prayed this way before

🔥 Pentecost will make it fully possible

📖 A new chapter of prayer begins

## 😊 Ask, And Ye Shall Receive, That Your Joy May Be Full

Answered prayer here is tied directly to complete joy, not just getting what is wanted.

Asking is not optional once this new access is opened up.

Joy and prayer stay connected throughout this whole farewell discourse.

Full joy was already named earlier as the goal in chapter fifteen.

😊 Prayer here aims at complete joy

🙏 Asking is not optional once opened

🔁 Joy and prayer stay linked here

📖 Full joy was named earlier too

## 🗣️ These Things Have I Spoken Unto You In Proverbs

"Proverbs" here means figurative, veiled language rather than direct plain speech.

Jesus has used pictures like the vine, the woman in travail, and the little while.

These pictures protected deep truths until the disciples were ready to receive them.

Plainer speech is coming very soon.

🗣️ Proverbs means figurative, veiled language

🍇 Pictures like the vine have been used

🛡️ Pictures protected truth until they were ready

📖 Plainer speech is coming very soon

## 👁️ I Shall Shew You Plainly Of The Father

After the resurrection and Pentecost, the need for veiled pictures fades.

The disciples will understand the Father far more directly and clearly.

Clarity grows as a person's relationship with God grows.

What once felt hidden eventually becomes plain.

👁️ Veiled pictures fade after Pentecost

🔍 Understanding of the Father grows clearer

📈 Clarity grows with a deeper relationship

📖 What once felt hidden becomes plain

## ❤️ The Father Himself Loveth You

Jesus makes clear that he is not the only one keeping this relationship warm.

The Father's own love for the disciples is real and direct, not secondhand.

That love is tied here to their love for Jesus and their belief in him.

This closes a major theme of the whole farewell discourse.

❤️ The Father's love is direct, not secondhand

🔗 It is tied to loving Jesus

🙏 It is tied to believing in him

📖 This closes a major theme here

## 🌍 I Came Forth From The Father, And Am Come Into The World

Jesus summarizes his entire mission in one short, plain sentence.

He came from the Father into the world at his birth.

Now he is about to leave the world and return to the Father.

This single verse holds the whole shape of the gospel story.

🌍 Jesus came from the Father to earth

🚪 He is about to leave the world

🔄 He returns to the Father next

📖 One verse holds the whole gospel shape

# John 16:29-33
# 🏆 Peace In Spite Of Tribulation
---
## 😮 Lo, Now Speakest Thou Plainly

The disciples feel like a fog has suddenly lifted for them.

They believe they finally understand everything Jesus has been saying.

Their confidence arrives quickly, right before it gets tested hard.

Feeling like you understand is not the same as being ready.

😮 The disciples feel sudden clarity

✅ They believe they finally understand

⚡ Their confidence arrives right before a test

📖 Understanding is not the same as readiness

## 🧠 Now Are We Sure That Thou Knowest All Things

The disciples affirm that Jesus knows everything, even unspoken questions.

This is a genuine, true statement about who Jesus is.

Genuine belief can still exist right alongside real weakness.

Their faith here is real, but it is about to be shaken hard.

🧠 They affirm Jesus knows all things

✅ This statement about Jesus is true

💪 Real belief can sit beside real weakness

📖 This faith is about to be shaken

## ❓ Do Ye Now Believe

Jesus answers their confidence with a gentle, pointed question instead of praise.

He already knows their coming failure in the next few hours.

He is not mocking them, he is preparing them honestly.

A loving warning is more useful than false reassurance.

❓ Jesus questions their sudden confidence

🔮 He already knows their coming failure

🙏 He is preparing them, not mocking them

📖 Honest warnings help more than false comfort

## 🐑 Ye Shall Be Scattered, Every Man To His Own

Jesus predicts that his own followers will abandon him within hours.

This fulfills an old prophecy from the book of Zechariah about scattered sheep.

Each disciple will run toward his own safety instead of staying together.

This scattering happens very soon, in the garden of Gethsemane.

🐑 Disciples will scatter within hours

📜 This fulfills a prophecy from Zechariah

🏃 Each one runs toward his own safety

📖 This happens soon in Gethsemane

## 🤝 And Yet I Am Not Alone, Because The Father Is With Me

Even total human abandonment cannot touch the Father's constant presence with Jesus.

This contrast matters directly against what he just predicted about the disciples.

They will leave him completely, yet he is never truly left alone.

The Father's presence never depends on human faithfulness.

🤝 The Father stays even when people leave

⚖️ This contrasts with the disciples' coming failure

🛡️ Jesus is never truly left alone

📖 God's presence never depends on human faithfulness

## ☮️ That In Me Ye Might Have Peace

Jesus names the goal of this entire three chapter farewell discourse.

This peace does not depend on circumstances staying calm or safe.

It depends entirely on staying connected to Jesus himself.

Everything said since chapter fourteen has aimed at this one purpose.

☮️ Peace is the goal of this discourse

🌪️ It does not depend on calm circumstances

🔗 It depends on staying connected to Jesus

📖 Three chapters built toward this one purpose

## ⚔️ In The World Ye Shall Have Tribulation

Jesus makes a direct and honest promise of coming hardship.

He never promises his followers an easy or comfortable life.

This matches the earlier warning back in verses one through four.

Real faith includes facing real trouble, not avoiding it.

⚔️ Jesus promises real coming hardship

🚫 Comfort is never promised here

🔁 This matches the earlier warning

📖 Real faith includes facing real trouble

## 🏆 I Have Overcome The World

This is the triumphant climax of the entire farewell discourse.

Jesus declares victory before the cross, the tomb, or the resurrection even happen yet.

His victory does not wait for success to be visible first.

Good cheer rests entirely on this one finished reality.

🏆 This is the discourse's triumphant climax

✝️ Victory is declared before the cross

🔒 The victory does not wait for proof

📖 Good cheer rests on this one reality
`.trim();

export const JOHN_SIXTEEN_PERSONAL_SECTIONS = parseJohnSixteenRawNotes(JOHN_SIXTEEN_RAW_NOTES);
