export type JohnEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnEightRawNotes(rawText: string): JohnEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 8:${startVerse}` : `John 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 John 8 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_EIGHT_RAW_NOTES = `# John 8:1-6
# 🪤 A Trap In The Temple
---
## ⛰️ Jesus Went Unto The Mount Of Olives

The Mount of Olives sat just outside Jerusalem.

Jesus often spent the night there instead of in the city.

It was a quiet hillside, not a home.

This same hill is where he will later be arrested.

One quiet night here sits beside the heaviest nights of his life.

⛰️ Olives sat just outside Jerusalem

🌙 Jesus often stayed there at night

🙏 It was a place for prayer

📖 Later it becomes the arrest site

## 🌅 He Came Again Into The Temple

Jesus returns to the temple early the next morning.

Teaching here daily was normal for a rabbi building a following.

Crowds gathering around him was becoming the expected scene by now.

Nothing here warns the reader what is about to happen.

🌅 Jesus returns early the next morning

📚 Daily teaching was normal for a rabbi

👥 Crowds were already gathering around him

➡️ The calm scene is about to break

## 😳 Taken In Adultery, In The Very Act

The scribes and Pharisees bring a woman caught in the act of adultery.

They set her in the middle of the crowd on purpose.

Public shame was part of the plan before any trial happened.

The man involved is never named or brought forward at all.

😳 She was caught in the act

👥 They set her in the open crowd

🙈 Shame was part of the plan

➡️ Her partner is never named

## 📜 That Such Should Be Stoned

The law of Moses did call for stoning in cases of adultery.

That same law required both the man and the woman to be stoned.

Only she stands here.

The accusers already broke the very law they are quoting.

📜 Moses did command stoning for adultery

⚖️ The law required both guilty parties

🙋 Only the woman stands accused here

📖 Their own law exposes their trap

## 🪤 This They Said, Tempting Him

This question is a trap, not a real search for justice.

If Jesus says stone her, he looks merciless.

He would also be claiming power that belonged only to Rome.

If he says let her go, he looks like he ignores the law of Moses.

Jesus stoops down and writes on the ground instead of answering right away.

🪤 The question was a trap for Jesus

⚖️ Either answer seemed to condemn him

✍️ He stoops down and writes instead

📖 Silence can answer better than words

# John 8:7-11
# 🕊️ He That Is Without Sin
---
## 🗿 He That Is Without Sin Among You

Jesus does not say the law was wrong.

He simply asks the one question none of them can honestly answer.

Every single accuser standing there has sinned in some way too.

The stone meant for her would also convict the hand that threw it.

🗿 Jesus does not dismiss the law

❓ He asks a question none can answer

👥 Every accuser has sinned as well

📖 Judgment exposes the judge too

## ✍️ Again He Stooped Down, And Wrote On The Ground

Jesus repeats the same quiet action from verse six.

He gives the crowd time to think instead of rushing an answer.

No pressure, no raised voice, just patience while the truth sinks in.

Silence here does more work than a sermon could.

✍️ He repeats the same quiet action

⏳ He gives the crowd time to think

🤫 No pressure or raised voice here

➡️ Silence lets the truth sink in

## 😳 Convicted By Their Own Conscience

The accusers leave quietly instead of pressing their case.

They go in order, starting with the eldest among them.

Older men had lived longer and likely carried more to be ashamed of.

The whole crowd that came to accuse her disappears without a single stone thrown.

😳 They leave quietly, one by one

👴 The eldest leaves first

⚖️ Longer life often means more guilt

➡️ Not one stone is ever thrown

## ❓ Where Are Those Thine Accusers

Jesus looks up and finds the crowd already gone.

He asks her directly whether anyone is left to condemn her.

For the first time, someone speaks to her instead of about her.

Her answer is simple, no man, Lord.

❓ Jesus asks if anyone remains

👀 He looks up to an empty crowd

🗣️ He speaks directly to her

📖 She answers, no man, Lord

## 🕊️ Go, And Sin No More

Jesus does not excuse what she did.

He also does not add his voice to the ones ready to stone her.

Forgiveness and a changed life are both given in the same breath.

Grace here comes with a clear command, not a blank pass.

🕊️ Jesus does not condemn her

✅ He does not excuse the sin either

🔁 Grace comes with a call to change

📖 Mercy and truth meet in one sentence

# John 8:12-14
# 💡 The Light Of The World
---
## 💡 I Am The Light Of The World

"I am" echoes the name God gave himself to Moses at the burning bush.

Jesus is not just offering wisdom, he is naming himself as God.

Light here means the guidance and truth people need to find their way.

This claim came during the Feast of Tabernacles.

Huge lamps lit the temple courts every night of that feast.

Jesus is claiming to outshine that very festival light.

💡 I am echoes God's name to Moses

👑 Jesus claims to be God himself

🕯️ Light means truth and guidance

📖 He outshines the festival's own lamps

## 📜 Thy Record Is Not True

The Pharisees object using a real legal principle.

Jewish law usually did not accept a man's testimony about himself alone.

They are using a courtroom rule to dodge what Jesus just claimed.

Technically correct objections can still miss the larger truth standing in front of them.

📜 A rule said self testimony was weak

⚖️ The Pharisees use that rule here

🙈 It lets them dodge his claim

➡️ Being technically right can still miss truth

## 🧭 I Know Whence I Came, And Whither I Go

Jesus answers their legal objection with something no witness could offer.

He knows exactly where he came from and exactly where he is going.

That certainty is not something any ordinary man could honestly claim.

His testimony stands on who he actually is, not just on a rule of evidence.

🧭 Jesus knows his origin and destiny

🤷 No ordinary witness could claim that

👑 His identity backs up his words

📖 Truth does not always need two witnesses

# John 8:15-20
# ⚖️ Two Witnesses, One Testimony
---
## ⚖️ Ye Judge After The Flesh

"After the flesh" means judging only by appearance and surface assumptions.

The Pharisees are measuring Jesus by human rules of evidence alone.

Jesus says he is not here to condemn anyone in that way.

His mission right now is to reveal the truth, not to hand out sentences.

⚖️ After the flesh means surface judging

👀 They judge Jesus by appearances alone

🕊️ Jesus is not here to condemn

➡️ His mission is truth, not sentencing

## 🤝 I And The Father That Sent Me

Jesus says that if he does judge, his judgment is true.

He is never acting alone in anything he says.

The Father who sent him stands behind every word.

Two in agreement carries more weight than one voice alone.

🤝 Jesus and the Father act together

✅ That partnership makes his judgment true

👑 He never speaks alone

📖 Agreement carries real weight

## 👥 The Testimony Of Two Men Is True

The law of Moses required at least two witnesses to establish a fact in court.

Jesus points out that he actually meets that very standard.

He is one witness, and the Father is the second.

The Pharisees' own legal rule now supports the claim they are trying to reject.

👥 The law required two witnesses

🙋 Jesus counts as one witness

👑 The Father counts as the second

➡️ Their own rule backs his claim

## ❓ Where Is Thy Father

The Pharisees ask the question expecting to expose a weakness.

Jesus answers that knowing him would mean knowing the Father too.

They cannot see who stands in front of them.

Missing Jesus means missing God himself, even while standing in his own temple.

❓ They ask where his Father is

👀 Knowing Jesus means knowing the Father

🙈 They cannot see who he is

📖 Missing him means missing God

## 🏛️ His Hour Was Not Yet Come

The treasury was a public area of the temple where offerings were collected.

Jesus is teaching boldly in open view, not hiding in a corner.

"His hour" is a phrase John uses for the set time of his death.

No one touches him here because that hour has not arrived yet.

🏛️ The treasury was a public temple area

🗣️ Jesus teaches boldly, not in secret

🛡️ No one can touch him yet

📖 His hour had not yet come

# John 8:21-24
# 🚪 Where I Go, Ye Cannot Come
---
## 🚪 Ye Shall Die In Your Sins

Jesus warns that he will not always be present with them physically.

A day is coming when they will look for him and not find him.

Rejecting him now carries a cost they cannot undo later.

Dying in your sins means facing judgment still unforgiven.

🚪 Jesus warns he will not stay forever

🔍 A day comes when they seek him

⏳ Rejecting him now has lasting cost

📖 Dying unforgiven is the real danger

## 😕 Will He Kill Himself

The Jews misunderstand Jesus completely here.

They assume his talk of going away means suicide.

They are thinking in purely physical, earthly terms.

Jesus is actually speaking about returning to the Father through the cross.

😕 They misread his words as suicide

🌍 They think only in earthly terms

✝️ He actually means his return to God

➡️ Misunderstanding him is easy from below

## ⬆️ Ye Are From Beneath, I Am From Above

Jesus draws a clear line between two different origins.

"From beneath" describes a mindset limited to this world only.

"From above" describes Jesus coming from God's own presence.

Two completely different starting points lead to two completely different kinds of understanding.

⬇️ From beneath means an earthly mindset

⬆️ From above means Jesus came from God

🌍 They see only this world

📖 Different origins shape different understanding

## 🆔 If Ye Believe Not That I Am He

"I am he" echoes the same divine name God used with Moses.

Jesus is not just claiming to be a teacher or a prophet here.

He is quietly claiming to be God in human flesh.

Rejecting that claim is what he says will leave them dying in their sins.

🆔 I am he echoes God's own name

👑 Jesus claims to be God himself

🙅 Rejecting that claim has real weight

📖 Belief here is not optional

# John 8:25-30
# 🗣️ The Same From The Beginning
---
## ❓ Who Art Thou

The question sounds simple but the Jews are genuinely confused.

Jesus answers that he has been saying the same thing since the start.

He is not changing his message to confuse them.

Consistency itself is part of his answer to who he is.

❓ They ask who Jesus really is

🔁 He has said the same thing all along

🧭 His message has not shifted

📖 Consistency is part of his answer

## 🗣️ Those Things Which I Have Heard Of Him

Jesus claims he has much more he could say about them.

Everything he actually does say comes straight from the Father.

He is not inventing a message of his own.

He is simply relaying what he has already heard.

🗣️ Jesus has more he could say

👑 His words come from the Father

🚫 He invents nothing of his own

➡️ He relays, he does not create

## 🙈 He Spake To Them Of The Father

The crowd misses the real subject of what Jesus is saying.

They hear him talking yet cannot connect it to God the Father.

Spiritual truth can sit right in front of someone and still go unseen.

Misunderstanding here is not about hearing, it is about perceiving.

🙈 They miss his real subject

👂 They hear but do not perceive

🧠 Spiritual truth needs more than ears

📖 Hearing and understanding are not the same

## ⬆️ When Ye Have Lifted Up The Son Of Man

"Lifted up" points forward to the crucifixion still to come.

Jesus already used this same phrase back in John chapter three.

His death, not his defeat, is what will finally prove who he is.

The cross will become the clearest sign of his identity, not evidence against it.

⬆️ Lifted up points to the cross

🔁 John three already used this phrase

✝️ His death proves his identity

📖 The cross reveals, it does not disprove

## 🤝 The Father Hath Not Left Me Alone

Jesus states plainly that he is never isolated from the Father.

His obedience is constant, not occasional.

"I do always those things that please him" leaves no exceptions.

Unity with the Father defines everything Jesus does.

🤝 Jesus is never alone from the Father

✅ His obedience is constant, not occasional

🔁 No exceptions are made

📖 Unity with God defines his actions

## ✅ Many Believed On Him

Not everyone in this scene rejects Jesus.

Some genuinely believe as they hear him speak.

The next verses will test exactly how deep that belief actually goes.

Belief that starts strong can still waver under pressure.

✅ Many believe as he speaks

🌱 Their belief is only just starting

🧪 It will soon be tested

➡️ Early belief is not lasting faith

# John 8:31-36
# 🔓 Truly Free
---
## 📖 Are Ye My Disciples

Believing for a moment is not the same as continuing in his word.

A real disciple stays with Jesus' teaching over time.

Continuing proves that belief is real.

Lasting commitment is what marks a true disciple.

📖 Continuing proves belief is real

⏳ A moment of belief is not enough

🙋 A real disciple stays with his word

➡️ Lasting commitment marks a true disciple

## 🔓 The Truth Shall Make You Free

This truth is not just information, it is Jesus himself.

Knowing him personally is what actually sets a person free.

Freedom here is not about politics or Rome at all.

It is freedom from the power sin holds over a life.

🔓 Truth here means Jesus himself

🤝 Knowing him personally brings freedom

🚫 This freedom is not political

📖 It frees a person from sin's grip

## ⛓️ Never In Bondage To Any Man

The Jews hear "free" and think only of national independence.

They point to their bloodline as proof they were never slaves.

That claim ignores real history.

Israel had already lived under Egypt, Babylon, and Rome.

Jesus is talking about a slavery far deeper than any empire's chains.

⛓️ They think freedom means politics

📜 Their history already includes real bondage

🌍 Egypt, Babylon, and Rome all ruled them

📖 Jesus means a deeper kind of slavery

## 🔗 The Servant Of Sin

Jesus redefines what real slavery actually is.

It is not about a nation's history under foreign rule.

Sin itself becomes the master once a person keeps serving it.

Repeated sin forms a bondage no army ever caused.

🔗 Sin becomes its own kind of master

🚫 This bondage has nothing to do with nations

🔁 Repeated sin tightens its grip

📖 This slavery is internal, not political

## 🏠 The Son Abideth Ever

A household servant in this culture had no guaranteed permanent place.

A son, by contrast, belonged there for life.

Jesus is contrasting a slave's uncertain position with a son's secure one.

Freedom through Jesus comes with a son's lasting security.

🏠 A servant's place was never guaranteed

👶 A son's place was secure for life

🔁 Jesus contrasts slave status with sonship

📖 True freedom brings a son's security

## 🔓 Ye Shall Be Free

Only the Son of the house has authority to free a servant.

Jesus claims that very authority over sin's hold on people.

This freedom is complete, not partial.

It reaches all the way to the root of the problem.

🔓 Only the Son can grant this freedom

👑 Jesus claims that authority himself

✅ This freedom is complete, not partial

📖 It reaches the root of the problem

# John 8:37-41
# 👪 Abraham's Seed, Not Abraham's Children
---
## 🌱 Abraham's Seed

Jesus agrees they are Abraham's physical descendants.

Bloodline alone is not the point he is making.

Wanting to kill him shows a heart nothing like Abraham's.

Seed describes ancestry, children describes character, and Jesus is separating the two.

🌱 Seed means physical ancestry

💔 Wanting to kill him breaks that heritage

👪 Character matters more than bloodline

📖 Seed and children are not the same

## 👀 I Speak That Which I Have Seen With My Father

Jesus' words come straight from what he has seen in the Father's presence.

Their actions, by contrast, come from what they have learned from their own father.

The comparison is pointed on purpose.

Two very different sources are producing two very different kinds of behavior.

👀 Jesus speaks what he saw with the Father

👤 They act on what they learned elsewhere

⚖️ The comparison is pointed on purpose

📖 Source shapes behavior

## ⚡ The Works Of Abraham

Abraham is remembered in scripture for hospitality, faith, and welcoming strangers.

Their current plan to kill Jesus looks nothing like that legacy.

Jesus measures sonship by imitation, not just by birth records.

Actions reveal whose family someone truly belongs to.

⚡ Abraham was known for faith and welcome

🔪 Plotting murder looks nothing like that

👪 Sonship is proven by imitation

📖 Actions reveal true family

## 🔪 This Did Not Abraham

Jesus states the real charge plainly.

They want to kill him simply for telling the truth he heard from God.

"This did not Abraham" draws the sharpest possible contrast.

Abraham welcomed messengers from God, they want to murder one.

🔪 They plan to kill him for truth

📜 The truth came straight from God

👪 Abraham never did such a thing

➡️ Their actions betray their claimed ancestor

## 👶 We Have One Father, Even God

This line throws an insult right back at Jesus.

Some already doubted the circumstances of his birth.

They counter by claiming God himself as their only true Father.

The irony is heavy, since rejecting Jesus means rejecting the very God they claim.

👶 They imply doubt about Jesus' birth

🙋 They claim God as their only Father

⚖️ The insult is pointed and personal

📖 Rejecting Jesus rejects the God they claim

# John 8:42-47
# 👹 The Devil's Children
---
## ❤️ Ye Would Love Me

Jesus answers their claim about God directly.

A real relationship with God always produces love for the Son he sent.

Their hostility toward Jesus proves their claim false.

"I proceeded forth and came from God" restates exactly where Jesus comes from.

❤️ Loving God means loving the Son

🙅 Hostility toward Jesus proves the claim false

👑 Jesus confirms he came from God

📖 Love reveals the true Father

## 👂 Why Do Ye Not Understand My Speech

Jesus asks why his words are not landing with them.

The problem is not that his speech is confusing.

"Ye cannot hear my word" points to an unwillingness, not an inability.

Something deeper than confusion is blocking them from receiving it.

👂 Understanding is not the real problem

🚫 Cannot hear points to unwillingness

🧱 Something deeper blocks them

📖 The block is the heart

## 👹 Of Your Father The Devil

This is one of the strongest statements Jesus makes in the whole gospel.

He is not speaking about their physical ancestry here.

"The lusts of your father ye will do" ties their actions to that spiritual father.

Behavior exposes which father someone is actually following.

👹 Jesus names their spiritual father plainly

🚫 This is not about physical ancestry

🔁 Their actions match that father's desires

📖 Behavior exposes spiritual identity

## 🔪 A Murderer From The Beginning

This points back to the devil's role in Eden.

His lie there led to death entering the world.

Every attempt to kill Jesus traces back to that same old pattern.

The devil has worked this way since the very start.

🔪 The devil caused death from Eden onward

🔁 The same pattern repeats here

🕰️ His method has not changed

➡️ Plotting murder fits his oldest pattern

## 🤥 The Father Of It

"Abode not in the truth" means the devil never had a home in honesty.

"The father of it" names him as the very source of lying.

Every lie afterward traces back to that same original source.

Jesus ties their hostile accusations straight back to that father of lies.

🤥 Abode not in truth means no honest home

📛 He is called the father of lies

🔁 Every lie traces back to that source

📖 Their accusations fit that same pattern

## 🙅 Ye Believe Me Not

Jesus tells the plain truth, yet they still refuse to believe him.

Telling the truth did not win him trust here.

Honesty does not always lead to belief.

Their resistance says more about them than about his words.

🙅 They refuse to believe the truth

🗣️ Honesty did not win their trust

🧠 Resistance says more about them

📖 Truth does not guarantee belief

## ❓ Which Of You Convinceth Me Of Sin

Jesus issues a direct, open challenge.

No one in the crowd can actually name a sin he committed.

Yet they still refuse to believe what he says is true.

Their unbelief is not based on any real evidence against him.

❓ Jesus challenges them to name a sin

🤷 No one can answer the challenge

🙅 They still refuse to believe him

📖 Unbelief here has no real evidence

## 🙉 He That Is Of God Heareth God's Words

Belonging to God naturally produces a readiness to hear his words.

Their refusal to listen is not really about the words themselves.

It reveals which family they actually belong to.

Jesus closes this exchange by naming the real issue plainly.

🙉 Belonging to God means hearing his words

🚫 Their refusal reveals the real issue

👪 It shows which family they belong to

📖 Hearing proves belonging

# John 8:48-53
# 👴 Greater Than Our Father Abraham
---
## 😡 Thou Art A Samaritan, And Hast A Devil

Calling someone a Samaritan was a common insult among Jews at that time.

Samaritans were viewed as a mixed, lesser people by many Jews.

Accusing Jesus of having a devil was meant to discredit everything he had just said.

When truth cannot be answered, insults often take its place.

😡 Samaritan was used here as an insult

🙅 Samaritans were looked down on by many

👹 The devil charge aims to discredit him

➡️ Insults replace answers when truth stings

## 🙏 I Honour My Father

Jesus denies the accusation plainly and without hesitation.

He points instead to the honor he gives the Father.

"Ye do dishonour me" turns their own insult back around.

Respect for Jesus and respect for the Father cannot actually be separated.

🙏 Jesus denies the accusation plainly

👑 He honors the Father instead

🔁 Their dishonor of him is exposed

📖 Honoring God means honoring the Son

## ✨ I Seek Not Mine Own Glory

Jesus is not building a following for his own fame.

"There is one that seeketh and judgeth" points directly to the Father.

The Father is the one who will ultimately vindicate him.

Jesus leaves his reputation in someone else's hands entirely.

✨ Jesus is not chasing his own glory

👑 The Father seeks and judges on his behalf

🙌 Vindication belongs to the Father

📖 His reputation rests with God

## 🕊️ He Shall Never See Death

This does not mean a believer will never physically die.

It means death loses its final, lasting hold over that person.

Keeping his saying means holding onto his word with real commitment.

Jesus is promising something deeper than simply staying alive longer.

🕊️ This is not about avoiding physical death

🔓 Death loses its final hold

📖 Keeping his word means real commitment

➡️ The promise is deeper than long life

## 👴 Now We Know That Thou Hast A Devil

The Jews take Jesus' words about death completely literally.

They point to Abraham and the prophets as proof that everyone eventually dies.

Their logic sounds reasonable if his words are taken only on the surface.

They are missing the spiritual meaning entirely, the same mistake made earlier in this chapter.

👴 They take his words only literally

⚰️ Abraham and the prophets did die

🧠 Their logic misses the spiritual meaning

📖 This is the same mistake as before

## ❓ Art Thou Greater Than Our Father Abraham

The question is meant to sound absurd and unanswerable.

Abraham held enormous honor in Jewish history and faith.

Jesus' coming answer claims something far greater than that.

Whom makest thou thyself is the real question underneath their words.

❓ The question is meant to sound absurd

👴 Abraham held enormous honor in their history

👑 Jesus' answer claims something greater still

📖 Identity is the real question underneath

# John 8:54-59
# ✨ The Great I Am
---
## 🙌 My Honour Is Nothing

Jesus will not boost his own reputation on his own authority.

He points again to the Father as the one who gives him honor.

"Of whom ye say, that he is your God" names exactly who they claim to worship.

Jesus is pointing out that their own God is the one honoring him.

🙌 Jesus will not self promote

👑 The Father gives him true honor

🙋 They claim that same God as theirs

📖 Their own God honors Jesus

## 🤥 I Shall Be A Liar

Jesus states plainly that he truly knows the Father.

Denying that would make him exactly what he just called the devil, a liar.

"But I know him, and keep his saying" leaves no doubt about his claim.

Jesus refuses to pretend less than the full truth about who he is.

🤥 Denying this would make him a liar

✅ He truly knows the Father

🔁 This echoes the devil he described earlier

📖 Jesus will not understate the truth

## 😊 Your Father Abraham Rejoiced To See My Day

Jesus claims Abraham himself looked forward to this very moment.

This likely points to God's promises to Abraham.

Those promises included a coming blessing for all nations.

"He saw it, and was glad" suggests Abraham had some real glimpse of that future.

Jesus is claiming to be the fulfillment Abraham himself was waiting for.

😊 Abraham looked forward to this day

📜 This ties to God's promises to him

👀 Abraham caught some real glimpse of it

📖 Jesus fulfills what Abraham awaited

## 😲 Hast Thou Seen Abraham

The Jews hear Jesus' claim and assume he means he physically met Abraham.

Jesus was likely in his early thirties at this point.

That is nowhere near Abraham's own lifetime.

Their math is correct, but their assumption about what Jesus meant is wrong.

They are still thinking only in ordinary human terms.

😲 They assume a physical meeting with Abraham

🔢 Jesus was far too young for that

🧮 Their math is right, their assumption is not

📖 They still think in ordinary human terms

## ✨ Before Abraham Was, I Am

"I am" is the exact phrase God used to name himself to Moses at the burning bush.

Jesus is not claiming to simply exist before Abraham's birth.

He is claiming the eternal, timeless existence that belongs to God alone.

This is the clearest claim to deity Jesus makes in this entire chapter.

✨ I am echoes God's own name

♾️ This claims eternal, timeless existence

👑 It is a direct claim to be God

📖 The clearest claim in this chapter

## 🪨 Then Took They Up Stones To Cast At Him

The crowd understands exactly what Jesus just claimed.

Claiming to be God was considered blasphemy worth stoning under their law.

Jesus is not arrested or tried.

He simply slips away through the crowd.

His hour, mentioned earlier in this chapter, had still not come.

🪨 They understood it as a claim to deity

⚖️ Blasphemy carried the penalty of stoning

🚶 Jesus quietly slips away unharmed

📖 His hour still had not come
`.trim();

export const JOHN_EIGHT_PERSONAL_SECTIONS = parseJohnEightRawNotes(JOHN_EIGHT_RAW_NOTES);
