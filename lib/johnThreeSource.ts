export type JohnThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnThreeRawNotes(rawText: string): JohnThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 3:${startVerse}` : `John 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 John 3 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_THREE_RAW_NOTES = `# John 3:1-3
# 🌙 A Ruler Comes By Night
---

## 🕍 A Ruler Of The Jews

Nicodemus belonged to the Pharisees, a strict religious group devoted to the details of the law.

"Ruler" points to his seat on the Sanhedrin, the top Jewish council in Jerusalem.

A man with that much standing had real reason to avoid a controversial teacher.

John names him clearly so the reader feels exactly what he was risking.

🕍 The Pharisees guarded the law closely
⚖️ A ruler sat on the top council
👀 His standing made this visit risky
📖 John wants the reader to feel that risk

## 🌙 The Same Came To Jesus By Night

Coming "by night" was not just about convenience.

Darkness let Nicodemus approach Jesus without other Pharisees watching.

Many religious leaders had already turned against Jesus by this point.

Nicodemus wanted answers, but he was not yet ready to be seen seeking them.

🌙 Night hid this visit from view
🙈 Other leaders already opposed Jesus
❓ Nicodemus wanted answers kept quiet
➡️ He was not yet ready to be seen

## 👨‍🏫 A Teacher Come From God

Nicodemus says "we," not "I," when he speaks to Jesus.

That small word hints that other leaders agreed with him privately.

They were just not willing to say so in public yet.

He calls Jesus a teacher "come from God" because of the miracles he saw.

Rabbi was already a term of real respect.

Nicodemus adds even more honor on top of that title.

👥 We hints at hidden support
🤐 Other leaders stayed quiet in public
✨ Miracles pointed to God's own hand
📖 Nicodemus already honors Jesus deeply

## 🐣 Except A Man Be Born Again

"Born again" does not mean trying harder to be good.

The same word can also be read as "from above."

Jesus means a birth that starts with God, not with effort.

Nicodemus has not even finished his compliment before the subject changes completely.

🐣 Born again means a fresh start
⬆️ The word can also mean from above
🙅 It is not about trying harder
➡️ Jesus redirects the whole conversation

# John 3:4-8
# 💨 Born Of The Spirit
---

## 😮 Be Born When He Is Old

Nicodemus takes "born again" completely literally.

He pictures an impossible second trip through childbirth.

His question shows he is still thinking only of the physical body.

Jesus is about to describe a birth that has nothing to do with a mother's womb.

😮 Nicodemus hears this literally
🤰 He imagines a second childbirth
🧠 His thinking stays only physical
➡️ Jesus means something else entirely

## 💧 Born Of Water And Of The Spirit

Jesus answers with two parts working together, not two separate steps.

Many readers connect "water" to the washing already tied to repentance.

"Spirit" points to the inward change only God can make.

Together they describe one new birth, both cleansing and spiritual at once.

💧 Water points to cleansing
🕊️ Spirit points to inward change
🔗 Both describe one new birth
📖 Jesus is not giving two separate steps

## 🌬️ Born Of The Flesh Is Flesh

A physical birth can only produce a physical life.

No amount of human effort can create a spiritual one.

That is why trying harder could never be the answer here.

A different birth has to come from a different source entirely.

🌬️ Flesh can only produce flesh
🚫 Effort cannot create spiritual life
🙅 Trying harder is not the answer
➡️ A new source is required

## 🗣️ Ye Must Be Born Again

"Marvel not" is an old way of saying do not be shocked.

Jesus already knows this sounds impossible to Nicodemus.

He still refuses to soften what he just said.

The command stands exactly as strange, and as necessary, as it first sounded.

🗣️ Marvel not means do not be shocked
😲 The teaching sounds impossible at first
🔒 Jesus does not take it back
📖 The command stays exactly as given

## 🍃 The Wind Bloweth Where It Listeth

One Greek word in this verse can mean both "wind" and "spirit."

Nobody sees wind itself, only its effect on trees and water.

"Listeth" is an old word for wherever the wind wants to go.

The Spirit works the same way, unseen but still completely real.

🍃 Wind and spirit share one Greek word
👀 Nobody sees wind, only its effects
🧭 Listeth means wherever it wants
📖 The Spirit works unseen but real

# John 3:9-15
# 🐍 The Serpent Lifted Up
---

## 🤷 How Can These Things Be

Nicodemus still cannot picture what Jesus means.

His confusion here is honest, not an excuse to avoid an answer.

A man trained to study the law finds himself completely out of his depth.

The conversation is about to shift from his question to Jesus's own authority.

🤷 Nicodemus remains honestly confused
📚 His training cannot explain this
😳 Even an expert is out of his depth
➡️ Jesus shifts to his own authority

## 🎓 Art Thou A Master Of Israel

"Master" marks Nicodemus as a trained, recognized teacher of Israel's scripture.

Jesus gently points out the irony of his question.

A teacher of the Hebrew scriptures should already know this language about the Spirit.

The Old Testament had already spoken of a coming new heart and spirit.

🎓 Master means a trained teacher
🤔 Jesus points out the irony
📜 Scripture already spoke of a new heart
➡️ Nicodemus should recognize this language

## 👁️ We Speak That We Do Know

Jesus switches from "I" to "we" in this verse.

He may be including John the Baptist, the disciples, or his unity with the Father.

Either way, Jesus claims firsthand, certain knowledge, not a guess.

Nicodemus and the other leaders are refusing a reliable witness.

👁️ We may include others testifying with Jesus
✅ Jesus claims certain, firsthand knowledge
🚫 This is not a guess or theory
➡️ The leaders refuse a reliable witness

## 🌍 I Tell You Of Heavenly Things

"Earthly things" likely means the birth analogy Jesus already used.

If that simple picture is too hard, deeper truths will be harder still.

"Heavenly things" means truths about God's own realm no human could discover alone.

Jesus is warning that the real test of faith is still ahead.

🌍 Earthly things means the birth analogy
📈 Heavenly things go even deeper
🧗 Harder truths are still ahead
➡️ The real test of faith is coming

## ⬆️ No Man Hath Ascended Up To Heaven

Nobody has traveled up to heaven and returned with firsthand knowledge of it.

Jesus is the one exception, since he is the Son of man who already lived there.

This is a bold claim about where Jesus came from before his life on earth.

His authority to speak about heaven comes from actually having been there.

⬆️ No human has visited heaven and returned
👑 Jesus is the lone exception
🌌 He existed in heaven before his birth
📖 His authority comes from being there

## 🐍 Lifted Up The Serpent In The Wilderness

This points back to Numbers chapter twenty one.

Israel was dying from snakebites after complaining against God.

God told Moses to raise a bronze serpent on a pole.

Anyone who simply looked at it in faith was healed.

Jesus compares that bronze serpent to his own coming death.

🐍 Numbers twenty one tells the bronze serpent story
💀 The people were dying from snakebites
👀 Looking at it in faith brought healing
📖 Jesus compares it to his own cross

## ✝️ Should Not Perish, But Have Eternal Life

"Perish" does not only mean physical death.

It describes a lasting separation from God beyond this life.

"Eternal life" is not just living forever, but knowing God starting now.

Looking at the bronze serpent healed the body through simple faith.

Believing in Jesus heals the soul the very same way.

✝️ Perish means more than physical death
🔁 It means lasting separation from God
🌱 Eternal life means knowing God now
📖 Belief is the one condition

# John 3:16-18
# ❤️ God So Loved The World
---

## ❤️ For God So Loved The World

"So" here means "in this way," not only "this much."

The next words show exactly how that love was carried out.

God's love was never only a feeling.

It was a specific, costly action.

❤️ So means in this way
➡️ The next words show how
🎁 Love here is an action
📖 God's love was costly, not just felt

## 👶 His Only Begotten Son

"Only begotten" translates a word meaning one of a kind, not merely "born."

It marks Jesus as uniquely God's Son.

No other person is ever called God's child in that same sense.

Many readers hear an echo of Abraham offering his one of a kind son, Isaac.

What Abraham was asked to spare, God himself did not spare.

👶 Only begotten means one of a kind
👑 Jesus is uniquely God's own Son
🔗 Many hear an echo of Isaac
📖 God did not spare his own Son

## 🙌 Whosoever Believeth In Him Should Not Perish

"Whosoever" removes every barrier of nation or background.

The offer in this verse is open to anyone who believes.

That was a radical claim for a Jewish ruler like Nicodemus.

His people often thought God's promises belonged to them alone.

Jesus hands him a promise that reaches every people on earth.

🙌 Whosoever excludes no one
🌍 The offer reaches every nation
😲 This was radical for Nicodemus to hear
📖 God's promise now reaches the whole earth

## 🚫 Not To Condemn The World

The world already stood guilty before God sent his Son.

Jesus did not come to add to that guilty verdict.

His mission was rescue, not another judgment.

Saving the world was always the stated purpose of sending the Son.

🚫 The world already stood guilty
🎯 Jesus came to rescue, not condemn
➕ No extra judgment was added
📖 Saving the world was the purpose

## ⚖️ He That Believeth Not Is Condemned Already

Belief does not create a guilt that was not already there.

A person who rejects Jesus simply stays in the state they were already in.

"Already" shows that unbelief adds no new charge.

It just leaves the old one unanswered.

Believing in the Son is what changes anyone's standing before God.

⚖️ Unbelief does not add new guilt
🔙 It leaves the old guilt unanswered
🗝️ Belief is what changes someone's standing
📖 Jesus is the turning point for everyone

# John 3:19-21
# 🌓 Light And Darkness
---

## 💡 Light Is Come Into The World

"Light" is another name John uses for Jesus throughout his gospel.

In scripture, light regularly stands for truth and the presence of God.

Jesus coming into the world means truth itself has arrived in a person.

Everyone who meets him is now forced to respond to that light somehow.

💡 Light is another name for Jesus
✨ Light pictures truth and purity
🧍 Truth has now arrived in a person
➡️ Everyone must respond to it

## 🌑 Men Loved Darkness Rather Than Light

This verse names the real reason people reject Jesus.

It is not a lack of evidence.

People choose darkness because it lets them keep hiding what they do.

The problem here is a love, not simply a misunderstanding.

🌑 Rejection is not about missing evidence
🙈 Darkness lets people hide their actions
💔 The real issue is a love, not confusion
📖 People choose what they already love

## 😠 Every One That Doeth Evil Hateth The Light

Light exposes things exactly as they are.

Someone doing wrong instinctively avoids anything that might reveal it.

That is why a guilty person often avoids the very people who could help.

Avoiding the light is a form of self protection, not an accident.

😠 Light exposes things clearly
🙅 Guilty people avoid what reveals them
🛡️ Avoidance protects their actions
📖 Hiding is a choice, not an accident

## 🌞 He That Doeth Truth Cometh To The Light

"Doeth truth" means living in a way that matches what is actually right.

That kind of person is not afraid of being seen clearly.

Coming to the light shows that God's own power was behind those actions.

The real difference between the two groups is honesty, not perfection.

🌞 Doeth truth means living honestly
🙂 Honest people are not afraid of light
🙌 Their actions are shown to be from God
📖 The real difference is honesty, not perfection

# John 3:22-26
# 🕊️ Jesus And John Baptize
---

## 🏞️ Into The Land Of Judaea

Jesus leaves Jerusalem for the quieter Judean countryside.

This season of ministry sits away from the crowds of the city.

John notes that Jesus and his disciples were baptizing here too.

The actual baptizing was carried out by the disciples themselves.

🏞️ Judaea was the countryside around Jerusalem
🤫 This season was quieter than the city
💧 Jesus and his disciples baptized here
➡️ The disciples carried out the baptizing

## 🌊 Baptizing In Aenon Near To Salim

Aenon means "springs," a fitting name for a place known for its water.

John explains there was plenty of water there for the crowds.

This all happened before John the Baptist was arrested.

Two ministries, Jesus and John, were briefly running side by side.

🌊 Aenon means springs
💦 The location had plenty of water
🔓 This was before John's imprisonment
📖 Two ministries briefly overlapped

## ❓ Then There Arose A Question

A dispute broke out between some of John's disciples and a group of Jews.

The subject was purifying, the Jewish washing rituals for ceremonial cleanness.

John's baptism and Jesus's baptism likely got tangled in that same argument.

A small dispute about washing opens into a much bigger conversation.

❓ A dispute broke out over washing rituals
🧼 Purifying meant removing ceremonial uncleanness
🔀 The two baptisms got tangled together
➡️ A small dispute opens a bigger conversation

## 👥 All Men Come To Him

John's own disciples report that crowds are now flocking to Jesus.

Their words carry a hint of concern, maybe even wounded pride.

They expect their teacher to feel threatened by losing his audience.

John's answer in the next verse completely overturns that expectation.

👥 Crowds are now flocking to Jesus
😟 The disciples sound concerned for John
🏆 They expect John to feel threatened
➡️ John's answer overturns that expectation

# John 3:27-30
# 🤝 He Must Increase
---

## 🎁 Except It Be Given Him From Heaven

John refuses to treat Jesus's growing crowd as a problem.

Every bit of success, his own included, is a gift from God.

That belief frees John from needing to compete with Jesus at all.

A ministry built on gift, not achievement, defends nothing.

🎁 Success is a gift from God
🤲 John includes his own ministry in that
🕊️ Gift frees him from needing to compete
📖 A gift based ministry defends nothing

## 🚫 I Am Not The Christ

John reminds his disciples of something he told them plainly before.

He never claimed to be the Messiah himself.

He only claimed to be the one sent ahead of him.

Knowing his own role clearly keeps him from envying the one he announced.

🚫 John already denied being the Christ
📣 He called himself the one sent ahead
🔑 That role explains everything he does next
➡️ Clarity about his role prevents envy

## 💍 The Friend Of The Bridegroom

In Jewish wedding custom, the friend of the bridegroom helped arrange the marriage.

That friend was never meant to be the center of attention.

His job was to serve the groom and celebrate on his behalf.

John happily places himself into that supporting role next to Jesus.

💍 The friend helped arrange the wedding
🙇 He was never the center of attention
🤝 His job was to serve the groom
📖 John happily takes that supporting role

## 😊 This My Joy Therefore Is Fulfilled

Hearing the bridegroom's voice is what makes the friend glad, not seeing him.

John compares hearing about Jesus's growing crowd to that very same wedding joy.

His joy is not about losing his own followers.

It is about what is now happening to Jesus.

A joy like this only makes sense for someone who was never competing.

😊 Hearing the bridegroom's voice brings joy
🔁 Losing followers does not block that joy
🎊 His joy comes through what Jesus gains
➡️ This joy only works without competition

## 📉 He Must Increase, But I Must Decrease

This line sums up John's entire understanding of his own ministry.

Jesus's influence was always meant to grow larger over time.

John's role was always meant to shrink back once that growth began.

Few leaders in scripture model stepping aside this willingly.

📉 John's ministry was always meant to shrink
📈 Jesus was always meant to grow
🗝️ This line sums up John's whole purpose
📖 Few leaders step aside this willingly

# John 3:31-36
# 👑 He That Cometh From Above
---

## ⬆️ He That Cometh From Above Is Above All

Many readers believe John the narrator is speaking now, not John the Baptist.

Either way, the subject shifts from John's ministry to Jesus's own origin.

"Above" describes heaven, the place Jesus came from before his life on earth.

Nothing on earth outranks someone who came from that place.

⬆️ Scholars debate who is speaking here
🔀 The subject shifts to Jesus's origin
🌌 Above means heaven itself
📖 Nothing on earth outranks him

## 🌍 He That Is Of The Earth Is Earthly

This phrase contrasts ordinary human teachers with Jesus himself.

An earthly teacher, however wise, can only speak from human limits.

Even John the Baptist still belongs to that earthly category.

Jesus alone speaks from firsthand knowledge of heaven.

🌍 Earthly means limited to human experience
👤 Even John belongs to that category
🔝 Jesus alone speaks from heaven itself
➡️ His words carry a different authority

## 🙅 No Man Receiveth His Testimony

This sounds like an exaggeration, since some people did believe Jesus.

Read against the larger pattern in John's gospel, it describes the nation as a whole.

Widespread, stubborn rejection felt like total rejection to those watching it happen.

The few who did believe stand out as the exception, not the rule.

🙅 This describes rejection on a national scale
📊 Overall response still felt like total rejection
🌟 A few believers were the exception
➡️ Most still refused to listen

## 🔏 Hath Set To His Seal That God Is True

A seal in the ancient world was pressed into wax to prove something official.

Believing Jesus's testimony is like stamping approval on what God has said.

That belief does not make God's word true.

It simply agrees with a truth that was already settled.

Faith here is an act of trust, not an act of creating truth.

🔏 A seal proved something was genuine
✅ Belief agrees with what God already said
🚫 Belief does not create that truth
📖 Faith is trust, not creation

## 📏 Not The Spirit By Measure

Prophets before Jesus each received a portion of God's Spirit for one task.

Jesus receives the Spirit completely, without any limit at all.

That full measure sets him apart from every prophet before him.

What others received in part, Jesus holds in full.

📏 Prophets received the Spirit in portions
♾️ Jesus receives the Spirit without limit
👑 This sets him apart from every prophet
📖 Jesus holds completely what others held in part

## 🤲 Given All Things Into His Hand

The Father's love for the Son is the reason for this authority.

"All things" means total authority, not a share of it.

Nothing is left outside what the Son has been given to rule.

That authority flows from love, not something Jesus had to earn.

🤲 Love is the reason for this authority
👑 All things means total authority
🚫 Nothing is left outside of it
📖 Authority flows from the Father's love

## ⚖️ The Wrath Of God Abideth On Him

"Wrath" is not a loss of temper.

It is God's settled, righteous opposition to sin.

Everlasting life is the promised result of believing in the Son.

Refusing to believe simply leaves a person under that same wrath.

The chapter that opened with Nicodemus in the dark ends with a clear choice in the light.

⚖️ Wrath means God's settled opposition to sin
🌱 Belief leads to everlasting life
🚫 Unbelief leaves a person under that wrath
📖 The chapter ends on the clearest choice`.trim();

export const JOHN_THREE_PERSONAL_SECTIONS = parseJohnThreeRawNotes(JOHN_THREE_RAW_NOTES);
