export type JohnSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnSeventeenRawNotes(rawText: string): JohnSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 17:${startVerse}` : `John 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 John 17 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_SEVENTEEN_RAW_NOTES = `# John 17:1-5
# 🙏 The Hour Has Come For Glory
---
## 👀 Lifted Up His Eyes To Heaven

Lifting the eyes upward was a common way to pray in this culture.

Jesus prays out loud with the disciples listening nearby.

This whole chapter is really one long prayer.

Jesus models exactly how he wants his followers to pray.

👀 Eyes lifted was a common prayer posture

🗣️ Disciples hear him pray out loud

📜 This whole chapter is one prayer

📖 Jesus models prayer before he leaves

## ⏳ Father, The Hour Is Come

The hour has been building through the whole book of John.

Earlier chapters said his hour had not yet come.

Now, for the first time, Jesus says it has arrived.

The hour means his coming arrest, death, and resurrection.

⏳ The hour has been building through John

🚫 Earlier it was said not yet come

✅ Now Jesus says it has arrived

📖 The hour means his death and resurrection

## ✝️ Glorify Thy Son, That Thy Son Also May Glorify Thee

This is not Jesus asking for fame or praise.

Glorify here means to show someone's true worth.

The cross will show the Father's love and the Son's obedience together.

Each one's glory is tied completely to the other's.

🙅 Not a request for fame or praise

🔍 Glorify means show someone's true worth

✝️ The cross shows love and obedience together

📖 The Father's glory and the Son's are tied

## 👑 Power Over All Flesh

All flesh means every single human being who has ever lived.

The Father has given Jesus real authority over all of them.

This authority lets Jesus offer eternal life to anyone.

Nobody stands outside the reach of that authority.

🌍 All flesh means every human being

👑 The Father gave Jesus this authority

🔑 This lets him give eternal life

➡️ Nobody sits outside Jesus' reach

## 🤝 This Is Life Eternal, That They Might Know Thee

Life eternal does not just mean living forever without end.

It means a real relationship with God starting now.

Knowing God here means more than knowing facts about him.

It means trusting him the way a child trusts a parent.

⏳ Eternal life is not only endless time

🤝 It means a real relationship with God

🧠 Knowing is more than knowing facts

📖 Trust like a child trusts a parent

## ✅ I Have Finished The Work Which Thou Gavest Me To Do

Jesus says this before the cross has even happened.

He speaks of his mission as already complete.

His confidence rests on what he knows is coming.

Certainty in God's plan can come before the outcome is seen.

✅ Jesus speaks as if the work is done

⏳ This is said before the cross happens

🔮 His confidence rests on what is coming

📖 Certainty can come before the outcome

## 👑 The Glory Which I Had With Thee Before The World Was

Jesus claims a glory that existed before anything was created.

This is a direct claim to living eternally with the Father.

John opened this whole book with this same claim in chapter one.

The prayer closes a circle that began on its first page.

⏳ This glory existed before creation began

👑 Jesus claims to exist with the Father

🔄 The prayer closes that opening circle

📖 John chapter one made this same claim

# John 17:6-10
# 🎁 Those Thou Hast Given Me
---
## 👁️ I Have Manifested Thy Name

Manifested means made fully visible, not just talked about.

Jesus did more than teach facts about God to his friends.

He showed them who the Father is through his own life.

A name in this culture carried someone's whole character.

👁️ Manifested means made fully visible

🗣️ Jesus did more than teach facts

🪞 He showed the Father through his life

📖 A name carried someone's whole character

## 👪 Thine They Were, And Thou Gavest Them Me

Jesus says the disciples belonged to the Father first.

The Father is the one who gave them to Jesus.

This moves credit away from the disciples' own choice.

Even their faith began as a gift, not an achievement.

👪 The disciples belonged to the Father first

🎁 The Father gave them to Jesus

🙅 Not the disciples' own achievement

📖 Even their faith began as a gift

## 🙌 They Have Kept Thy Word

This is a real compliment from Jesus to them.

Kept means held onto and obeyed, not just heard.

Peter will deny Jesus within hours of this very prayer.

Real faith and real failure can live in one person at once.

🙌 Jesus genuinely compliments them here

🤝 Kept means held onto, not just heard

🏃 These same men will fail soon

📖 Faith and failure can share one person

## 🙅 I Pray Not For The World, But For Them

This does not mean Jesus stopped loving the world.

John chapter three already said God loved the whole world.

This prayer simply has a narrower focus right now.

A focused prayer does not cancel a wider love.

🙅 Jesus has not stopped loving the world

📖 John chapter three already said this

🎯 This prayer's focus is simply narrower

➡️ One focused prayer does not cancel love

## 🔁 All Mine Are Thine, And Thine Are Mine

Jesus restates the shared ownership named in chapter sixteen.

Nothing belonging to the Father is held back from the Son.

This includes the disciples, who belong to both completely.

Shared ownership between Father and Son runs through this prayer.

🔁 This restates chapter sixteen's claim

🚫 Nothing is held back from the Son

👪 The disciples belong to both of them

📖 Shared ownership runs under this prayer

## 🔍 I Am Glorified In Them

Jesus says his glory shows through his followers' lives too.

Their faith and obedience become visible proof of who sent them.

This gives real weight to how the disciples live after Jesus leaves.

What they do next reflects back on Jesus himself.

🔍 Jesus is glorified through their lives

👀 Their obedience becomes visible proof

⚖️ Real weight rests on how they live

📖 Their actions reflect back on Jesus

# John 17:11-16
# 🛡️ Keep Them Through Thy Name
---
## ⏳ I Am No More In The World

Jesus speaks of leaving before it has even happened.

In his mind, the cross and resurrection already settle his return.

The disciples are about to be left behind in a hard world.

That gap between where Jesus is going and where they stay drives this prayer.

⏳ Jesus speaks as if already gone

✝️ The cross already settles his return

🌍 The disciples stay behind in a hard world

📖 That gap drives the rest of this prayer

## 🏷️ Holy Father, Keep Through Thine Own Name

Thy name means God's own character and power, not just a title.

Jesus asks the Father to protect the disciples by that power.

This is the first time in John Jesus calls him Holy Father.

Holiness here backs up why this protection can be trusted.

🏷️ Thy name means God's character and power

🛡️ Jesus asks for protection by that power

🆕 Holy Father appears here for the first time

📖 Holiness backs up this trustworthy protection

## 🤝 That They May Be One, As We Are

Jesus prays for a unity modeled on his own unity with the Father.

This is not asking for mere agreement or getting along.

It is asking for the same deep relationship Jesus already shares with God.

That kind of unity becomes a strong proof of the gospel to outsiders.

🤝 Unity is modeled on Jesus and the Father

🙅 Not just agreement or getting along

🔗 It mirrors Jesus' own relationship with God

📖 Unity becomes a proof to outsiders

## 💀 None Of Them Is Lost, But The Son Of Perdition

Perdition means total ruin or destruction, not a small mistake.

The son of perdition is Judas, who will soon betray Jesus.

Jesus names this loss directly instead of hiding it.

He ties it to scripture, showing betrayal fits God's larger plan.

💀 Perdition means total ruin

🙅 This names Judas, the betrayer

🗣️ Jesus names the loss plainly

📖 Even betrayal fits God's larger plan

## 😊 That They Might Have My Joy Fulfilled In Themselves

Jesus wants his followers to carry his own joy.

Fulfilled here means complete, with nothing missing.

This joy does not depend on Jesus staying physically present.

It is meant to continue in them long after he leaves.

😊 Jesus wants them to share his joy

✅ Fulfilled means complete, nothing missing

🚫 It does not depend on his presence

📖 This joy continues after he leaves

## 💔 The World Hath Hated Them

This hatred is not about the disciples being strange.

It comes from them no longer sharing the world's values.

Jesus already warned about this hostility back in chapter fifteen.

Belonging to a different kingdom creates friction with the old one.

💔 Hatred is not about being unlikable

⚖️ It comes from different values entirely

🔁 This was warned about in chapter fifteen

📖 A different kingdom creates friction

## 🙅 I Pray Not That Thou Shouldest Take Them Out Of The World

This does not mean the Christian life escapes the world completely.

Jesus does not ask for his followers to be removed from it.

Instead he asks for them to be kept safe from the evil.

Faith is meant to be lived inside a hard world.

🙅 Not a prayer to escape the world

🌍 Jesus keeps them inside it on purpose

🛡️ He asks for protection from real harm

📖 Faith is lived inside a hard world

## 🔁 They Are Not Of The World, Even As I Am Not Of The World

This exact phrase already appeared once in verse fourteen.

Repeating it this closely shows how important this marker is.

Not being of the world means their values no longer come from it.

Jesus roots their identity in his own, not in where they live.

🔁 This phrase already appeared in verse fourteen

📣 Repetition signals real importance

🧭 Their values no longer come from the world

📖 Jesus roots their identity in his own

# John 17:17-19
# ✨ Sanctified Through The Truth
---
## ✨ Sanctify Them Through Thy Truth

Sanctify means to set someone apart for a holy purpose.

It does not simply mean to feel spiritual or good.

The disciples are being prepared for a real mission, not just growth.

God's truth is the actual tool used for this setting apart.

✨ Sanctify means set apart for a purpose

🙅 Not just feeling spiritual or good

🎯 This prepares them for a real mission

📖 God's truth is the tool used

## 📣 Thy Word Is Truth

Jesus states this plainly, without softening it at all.

Truth here is not something each person gets to decide.

It is anchored completely in God's own word.

Everything the disciples teach later must trace back to this source.

📣 Jesus states this plainly

🙅 Truth is not up to each person

⚓ It is anchored in God's word

📖 Their future teaching traces back to this

## 🔁 As Thou Hast Sent Me, Even So Have I Also Sent Them

Jesus compares his own mission to the mission he now gives them.

The same sending and the same purpose now continue through others.

This phrase becomes the foundation for being sent into the world later.

The mission was never meant to stop with Jesus alone.

🔁 Jesus compares his mission to theirs

📨 The same sending now continues

🌍 This shapes being sent out later

📖 The mission never stops with Jesus alone

## ✝️ For Their Sakes I Sanctify Myself

Jesus sets himself apart here for his coming death.

For their sakes means this sacrifice benefits the disciples, not himself.

His sanctifying makes their own sanctifying possible.

One act of complete devotion opens the way for everyone else.

✝️ Jesus sets himself apart for his death

🎁 This sacrifice benefits the disciples

🔑 His devotion opens the way for theirs

📖 One act makes the others possible

# John 17:20-23
# 🌐 One As We Are One
---
## 👥 Neither Pray I For These Alone

Up to now the prayer has focused only on the eleven disciples.

Here the prayer suddenly widens to include everyone who believes later.

That includes every reader of this very chapter today.

Jesus is praying for people he has not even met yet.

👥 The prayer has focused on the eleven

🌍 It now widens to future believers

📜 That includes readers of this chapter today

➡️ Jesus prays for people he has not met

## 🗣️ Them Also Which Shall Believe On Me Through Their Word

Future believers come to faith through the disciples' own testimony.

This creates one chain stretching from the disciples to today.

Every believer since then has depended on a word passed down.

The gospel spreads by one generation telling the next.

🗣️ Faith comes through the disciples' testimony

🔗 This creates one long unbroken chain

📜 Every believer depends on a passed down word

📖 The gospel spreads person to person

## 🌐 That They All May Be One

This unity prayer now covers every believer across every century.

It stretches across language, culture, and time completely.

Division among believers works directly against this very prayer.

This single line carries real weight for how the church acts.

🌐 Unity here covers every century

🗺️ It crosses language and culture completely

⚔️ Division works against this very prayer

📖 This line carries real weight

## 👀 That The World May Believe That Thou Hast Sent Me

Unity among believers is not just for their own comfort.

It functions as real evidence to a watching world.

A divided, quarreling church makes this claim harder to believe.

A united church makes the claim visibly credible.

🙅 Unity is not only for comfort

👀 It functions as evidence to the world

⚔️ Division makes the claim harder to believe

📖 Unity makes the claim visibly credible

## 🎁 The Glory Which Thou Gavest Me I Have Given Them

Jesus shares his own glory with ordinary, flawed believers.

This is not glory in the sense of fame or honor.

It means being drawn into the same love Jesus has with the Father.

That is an extraordinary gift to people who will still fail him soon.

🎁 Jesus shares his own glory with believers

🙅 Not fame or honor from people

❤️ It means sharing his relationship of love

📖 An extraordinary gift to flawed people

## 🧩 That They May Be Made Perfect In One

Perfect here means complete or fully grown, not flawless.

The goal is a unity so real it looks finished.

This perfection comes from being joined to Christ, not effort alone.

A mature, unified church reflects something true about God himself.

✅ Perfect means complete, not flawless

🧩 The goal is a unity that looks finished

🔗 This comes from being joined to Christ

📖 A mature church reflects God himself

# John 17:24-26
# ❤️ Before The Foundation Of The World
---
## 🏠 I Will That They Also Be With Me Where I Am

Jesus prays for something beyond this life, a shared place with him.

This points forward to heaven, already promised back in chapter fourteen.

The goal of this prayer is an eternal future together.

Jesus wants his followers with him permanently, not just for one mission.

🏠 Jesus prays for a shared future home

🔁 This recalls the promise from chapter fourteen

⏳ The goal is eternal, not just survival

📖 He wants them with him permanently

## 👁️ That They May Behold My Glory

Behold means to see directly and fully, not secondhand.

The disciples have only glimpsed pieces of Jesus' true glory so far.

This prayer looks toward a day they will see it completely.

That full sight becomes part of their eternal reward.

👁️ Behold means to see fully, not secondhand

🧩 They have only seen pieces so far

🌅 A day is coming to see it completely

📖 Full sight becomes their eternal reward

## ⏳ Thou Lovedst Me Before The Foundation Of The World

This love between Father and Son existed before anything was created.

It did not begin at Jesus' birth or his baptism.

This same eternal love is what Jesus prays will reach his followers.

Nothing in all of history is older than this love.

⏳ This love predates all of creation

🙅 It did not begin at his birth

❤️ This love is what reaches his followers

📖 Nothing in history is older than it

## ⚖️ O Righteous Father, The World Hath Not Known Thee

Jesus draws a sharp contrast between two groups here.

The wider world has never truly known who God is.

Jesus himself has known the Father completely, his whole life.

The disciples now share in that same knowledge through him.

⚖️ Jesus draws a sharp contrast here

🌍 The world has never truly known God

👑 Jesus has known him completely

📖 The disciples now share that knowledge

## ❤️ The Love Wherewith Thou Hast Loved Me May Be In Them

Jesus ends the prayer asking for that same love to live in believers.

This is not a smaller, secondhand version of that love.

It is the very same love, now placed inside imperfect people.

The prayer that began with Jesus' glory ends with that glory reaching everyone.

❤️ The same divine love is asked for

🙅 Not a smaller, secondhand version

🎁 It is placed inside imperfect people

📖 The prayer's glory now reaches everyone
`.trim();

export const JOHN_SEVENTEEN_PERSONAL_SECTIONS = parseJohnSeventeenRawNotes(JOHN_SEVENTEEN_RAW_NOTES);
