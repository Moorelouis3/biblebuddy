export type JohnFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnFiveRawNotes(rawText: string): JohnFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 5:${startVerse}` : `John 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 John 5 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_FIVE_RAW_NOTES = `# John 5:1-5
# 🏊 A Pool Called Bethesda
---

## ⛪ A Feast Of The Jews

This feast is never named directly in the text.

Many scholars believe it was likely Pentecost or Passover.

John often marks time by Jewish festivals throughout his gospel.

Each feast pulls Jesus back to Jerusalem at the center of Jewish worship.

❓ The feast is never named here
📅 It was likely Pentecost or Passover
🕍 John marks time by Jewish feasts
📖 Each feast draws Jesus back to Jerusalem

## 🏛️ Called In The Hebrew Tongue Bethesda

Bethesda likely means house of mercy in Hebrew.

The pool sat near the sheep market, close to the temple.

Five covered porches ringed the water, giving shelter from the sun.

Archaeologists have actually uncovered a pool matching this description in Jerusalem.

💧 Bethesda likely means house of mercy
🐑 It sat near the sheep market
🏛️ Five porches gave shelter from the sun
📖 Archaeologists found a matching pool in Jerusalem

## 📜 An Angel Went Down At A Certain Season

Many ancient manuscripts of John do not include this verse.

Later scribes likely added it to explain verse seven.

Verse seven mentions waiting for the water to move.

The healing itself never actually depends on this detail.

📜 Many old manuscripts skip this verse
✍️ Scribes likely added it later
💧 It explains the waiting in verse seven
📖 The healing never depends on this detail

## ⏳ An Infirmity Thirty And Eight Years

Infirmity means a sickness or weakness in the body.

Thirty eight years is almost an entire adult lifetime in this era.

That length of suffering makes the man's hopelessness understandable.

His whole adult life had revolved around waiting by this pool.

⏳ Infirmity means a long term weakness
📅 Thirty eight years nearly spanned a lifetime
😔 That length explains his hopelessness
📖 His whole life revolved around this pool

# John 5:6-9
# 🗣️ Rise And Walk
---

## ❓ Wilt Thou Be Made Whole

Wilt thou simply means do you want.

Whole here means fully healed, body and spirit together.

Jesus asks this even though the answer seems obvious.

The question forces the man to actually voice his hope out loud.

❓ Wilt thou means do you want
💪 Whole means healed in body and spirit
🗣️ Jesus asks despite the obvious answer
📖 The question makes him voice his hope

## 🙅 While I Am Coming, Another Steppeth Down Before Me

The man never actually answers Jesus's direct question.

He describes his problem instead of asking for help.

No one has ever stayed to carry him into the water.

Thirty eight years of disappointment show up in that one complaint.

🙅 He never answers the actual question
😞 He describes his problem instead
🤷 No one ever carried him in
📖 Years of disappointment show in that complaint

## 🗣️ Rise, Take Up Thy Bed, And Walk

Jesus gives a direct command instead of a comforting word.

Thy bed likely means a thin mat used for sleeping.

No ritual, prayer, or touch happens before this healing.

The command alone carries all the power needed.

🗣️ Jesus commands instead of comforting him
🛏️ Bed means a simple sleeping mat
✋ No ritual or touch is needed
📖 His word alone carries the power

## ⚡ Immediately The Man Was Made Whole

Immediately means the healing happens all at once, with no recovery period.

He does not need to slowly regain strength over days.

Thirty eight years of weakness end in a single moment.

He picks up his own bed and simply walks away.

⚡ Immediately means no recovery time
💪 He regains full strength at once
⏳ Thirty eight years end in a moment
📖 He walks away carrying his own bed

## 📅 On The Same Day Was The Sabbath

This detail looks small but sets up the entire conflict ahead.

The sabbath was the Jewish day of rest, kept holy from work.

Carrying a bed could count as forbidden labor on that day.

John places this detail here on purpose, right before the confrontation.

📅 This small detail starts the real conflict
🛌 Sabbath was a day of rest
⚖️ Carrying a bed could count as labor
📖 John places this detail on purpose

# John 5:10-13
# ⚖️ A Forbidden Burden
---

## 📜 It Is Not Lawful For Thee To Carry Thy Bed

Jewish teachers had identified many specific categories of forbidden sabbath work.

Carrying any burden from one place to another was one of them.

The Jews focus entirely on the rule instead of the miracle.

Not one of them stops to ask who healed him.

📜 Teachers listed specific sabbath rules
🎒 Carrying a burden broke one rule
❓ They ignore the miracle entirely
📖 No one asks who healed him

## 🔀 He That Made Me Whole, The Same Said Unto Me

The healed man shifts responsibility onto the one who healed him.

He answers the legal charge with a bigger fact than the rule.

Someone with power to heal also had the authority to command him.

He still does not know this man's actual name.

🔀 He shifts the blame to his healer
⚖️ He answers the rule with a bigger fact
💪 Healing power implied real authority
➡️ He still does not know the name

## ❓ He That Was Healed Wist Not Who It Was

Wist is an old word that simply means knew.

The man genuinely has no idea that this was Jesus.

Jesus had healed him and then quietly disappeared into the crowd.

His ignorance here makes his next words completely honest, not evasive.

❓ He truly does not know who healed him
🚶 Jesus had quietly slipped away
📖 Wist is an old word for knowing
➡️ His honesty here is genuine, not evasive

## 🚶 Jesus Had Conveyed Himself Away, A Multitude Being In That Place

Conveyed away simply means Jesus slipped out unnoticed.

A large crowd at the pool made it easy to disappear.

Jesus avoids the praise and the growing crowd on purpose.

He will seek this man out privately instead, later in the temple.

🚶 Conveyed away means he slipped out
👥 A crowd made it easy to vanish
🙅 Jesus avoids the praise on purpose
📖 He will find the man later, privately

# John 5:14-16
# 🏛️ Found In The Temple
---

## 🔍 Jesus Findeth Him In The Temple

Jesus takes the initiative to find this man a second time.

The healed man had gone to the temple instead of straight home.

That choice suggests real gratitude, not just relief at being healed.

Jesus does not let the moment end with just a physical healing.

🔍 Jesus seeks him out a second time
🛕 The man goes to the temple first
🙏 That choice suggests real gratitude
📖 Jesus wants more than a physical healing

## 🙅 Sin No More, Lest A Worse Thing Come Unto Thee

This is not a claim that his sin caused the sickness.

Jesus never says that anywhere in this conversation.

The warning points toward something worse than thirty eight years of weakness.

Jesus cares about the man's soul even more than his body.

🙅 Sin did not cause the sickness
🗣️ Jesus never claims that here
⚠️ A worse fate could still come
📖 His soul matters more than his body

## 🗣️ Told The Jews That It Was Jesus

The man now finally learns and shares the healer's name.

His motive here is genuinely unclear from the text itself.

He may simply want to honor Jesus publicly in the temple.

He may also be trying to protect himself from blame.

🗣️ He finally learns and shares the name
❓ His motive is not stated clearly
🙏 He may want to honor Jesus
➡️ He may be protecting himself instead

## ⚔️ Sought To Slay Him

Persecute here means actively working to harm or punish someone.

The conflict has now moved from the healed man to Jesus himself.

Breaking their sabbath rules becomes their first formal complaint against him.

This moment marks a real turning point toward open hostility.

⚔️ Persecute means working to harm someone
🔀 The conflict now targets Jesus directly
📜 Sabbath rules become their first complaint
📖 This marks a turn toward open hostility

# John 5:17-18
# ✝️ Equal With God
---

## ⏳ My Father Worketh Hitherto, And I Work

Hitherto is an old word that simply means until now.

Jesus argues that God's providential care never actually stops, even on the sabbath.

Keeping the universe running counts as a different kind of work.

Jesus claims the exact same ongoing work for himself.

⏳ Hitherto is an old word for until now
🌍 God's care for the world never stops
🔧 Keeping creation running counts as work
📖 Jesus claims that same work for himself

## 😡 Sought The More To Kill Him

Their anger grows sharper after hearing this specific claim.

Breaking a sabbath rule was one thing to them.

Claiming equal standing with God felt far more dangerous.

Their plan to kill him begins to take real shape here.

😡 Their anger grows sharper now
📜 Breaking sabbath rules was one charge
⚠️ Claiming equality with God felt worse
📖 Their plan to kill him takes shape

## 👑 Making Himself Equal With God

Calling God his own Father in this unique way was the real charge.

No ordinary Jewish teacher ever spoke about God this personally.

The Jews understood exactly what Jesus was claiming about himself.

This claim, not just a broken rule, truly threatens them.

👑 Calling God his own Father was the claim
🗣️ No teacher spoke about God this way
👀 The Jews understood the claim clearly
📖 This claim, not the rule, truly threatens them

# John 5:19-23
# 👨‍👦 Equal In Work And Honor
---

## 💪 The Son Can Do Nothing Of Himself

This does not describe Jesus as weak or limited in power.

It describes perfect agreement between the Father and the Son.

Jesus only does what he sees the Father already doing.

Their unity, not any weakness, is the actual point here.

💪 This is not weakness in Jesus
🤝 It describes perfect agreement with the Father
👀 Jesus does what he sees the Father do
📖 Their unity is the real point here

## 🤝 The Father Loveth The Son, And Sheweth Him All Things

Sheweth is an old word that simply means shows.

This describes an open, completely trusting relationship between Father and Son.

Nothing is hidden between them in this relationship.

Everything the Father plans, the Son already knows.

📖 Sheweth is an old word for shows
🤝 Their relationship holds nothing back
👀 Nothing is hidden between them
➡️ The Son already knows what the Father plans

## ✨ Greater Works Than These, That Ye May Marvel

Jesus hints at even bigger miracles still ahead of this one.

Raising Lazarus from the dead later becomes exactly that kind of work.

Marvel means to be utterly amazed, beyond ordinary surprise.

These future works will prove his identity beyond any doubt.

✨ Even bigger miracles are still ahead
💀 Raising Lazarus later fits this exactly
😲 Marvel means being utterly amazed
📖 Future works will prove who he is

## ⚡ As The Father Raiseth Up The Dead, And Quickeneth Them

Quickeneth is an old word that simply means gives life.

Only God himself has the power to raise the dead.

Jesus claims that same power as completely his own.

This is not a borrowed power, it is a shared one.

📖 Quickeneth is an old word for gives life
⚡ Only God can raise the dead
🤝 Jesus claims that same power
➡️ This power is shared, not borrowed

## ⚡ The Son Quickeneth Whom He Will

This life giving power belongs personally to Jesus, not just to his Father alone.

Whom he will means Jesus chooses who receives this life.

That choice reveals real divine authority, not random chance.

No human leader could ever claim a power like this one.

⚡ Life giving power belongs to Jesus too
🎯 He personally chooses who receives it
👑 That choice shows real divine authority
📖 No human leader could claim this power

## 🙏 That All Men Should Honour The Son, Even As They Honour The Father

Honor here means the same level of worship and respect.

Jesus claims he deserves exactly the same honor given to God himself.

Refusing to honor the Son means failing to honor the Father too.

The two cannot actually be separated from each other.

🙏 Honor means the same worship and respect
⚖️ Jesus deserves honor equal to God
🚫 Rejecting the Son means rejecting the Father
📖 The two cannot be separated

# John 5:24-27
# ⏳ Life Now And Life To Come
---

## 👂 He That Heareth My Word, And Believeth

Hearing here means more than simply listening to words.

It means actually trusting and acting on what is heard.

This eternal life starts the moment someone truly believes, not later.

Believing is aimed directly at the one who sent Jesus too.

👂 Hearing means trusting, not just listening
⏳ Eternal life starts the moment of belief
🎯 Belief is aimed at the Father too
📖 This life begins now, not later

## ⚖️ Is Passed From Death Unto Life

Condemnation here means the final judgment against sin.

A believer has already crossed from death into life.

This change happens now, not only at the end of time.

The verdict is already settled before the final day even arrives.

⚖️ Condemnation means final judgment for sin
🚶 Believers already crossed into life
⏳ This change happens now, not later
📖 The verdict is settled before the end

## ⏳ The Hour Is Coming, And Now Is

This phrase holds two different timeframes together on purpose.

Something is already starting to happen in the present moment.

Something else still waits for a future, final completion.

Jesus often speaks this way about his coming kingdom.

⏳ Two timeframes sit together on purpose
✅ Something is already happening now
🔮 Something else still waits ahead
📖 Jesus often speaks of his kingdom this way

## 💀 The Dead Shall Hear The Voice Of The Son Of God

This points forward to a future, bodily resurrection of the dead.

A single spoken word carries the power to raise anyone.

Only God's voice could ever reach into the grave like this.

Jesus claims that exact same voice and that exact same power.

💀 This points to a future resurrection
🗣️ One word carries power to raise
👑 Only God's voice could reach the grave
📖 Jesus claims that same voice and power

## 🔋 Hath Given To The Son To Have Life In Himself

Life in himself means Jesus does not depend on another source for life.

Every created thing depends on something outside itself to stay alive.

Jesus alone holds life as his own, not borrowed from elsewhere.

This is a direct claim to being fully God.

🔋 Life in himself means no outside source
🌱 Everything else depends on something outside itself
👑 Jesus alone holds life as his own
📖 This is a direct claim to deity

# John 5:28-30
# ⚖️ Two Resurrections
---

## ⏳ All That Are In The Graves Shall Hear His Voice

This describes a future, physical resurrection still to come.

It includes literally everyone who has ever died, not a select few.

Jesus's voice alone will be enough to call every grave open.

No grave anywhere will be able to stay closed against it.

⏳ This is a future physical resurrection
🌍 It includes every person who has died
🗣️ His voice alone opens every grave
📖 No grave can resist that voice

## ⚖️ The Resurrection Of Life, And The Resurrection Of Damnation

Jesus describes only two final outcomes, with nothing in between them.

Those who have done good rise into life everlasting.

Those who have done evil rise into judgment instead.

This is not about earning salvation through good works alone.

⚖️ Only two final outcomes exist
🌟 Doing good leads to life
🔥 Doing evil leads to judgment
📖 Good works alone do not earn this

## ⚖️ My Judgment Is Just

Jesus's judgment is never random or based on personal preference.

He judges exactly as he hears from the Father.

Seeking the Father's will, not his own, keeps his judgment fair.

A judge this closely tied to God's will cannot be unjust.

⚖️ His judgment is never random
👂 He judges as he hears the Father
🎯 He seeks the Father's will, not his own
📖 That closeness keeps his judgment fair

# John 5:31-35
# 🕯️ A Witness Greater Than John
---

## 📜 If I Bear Witness Of Myself, My Witness Is Not True

Ancient law generally required more than one witness to establish a fact.

Testifying only about yourself was considered weak proof, legally speaking.

Jesus acknowledges that exact legal standard here.

He will point to outside witnesses instead of only himself.

📜 Ancient law required more than one witness
⚖️ Self testimony alone counted as weak proof
🎯 Jesus accepts that same legal standard
📖 He points to witnesses beyond himself

## 👤 There Is Another That Beareth Witness Of Me

Jesus points first toward John the Baptist as one such witness.

Ultimately, this other witness is the Father himself.

Multiple layers of testimony stand behind Jesus in this conversation.

He is never relying on his own word alone.

👤 John the Baptist is one witness
👑 The Father stands as the ultimate witness
🧱 Multiple layers of testimony support Jesus
📖 He never relies on his word alone

## 📖 Ye Sent Unto John, And He Bare Witness Unto The Truth

This recalls the delegation the Jews sent to question John earlier.

That earlier scene appears back in John chapter one.

John had already pointed directly at Jesus as the one to come.

The Jews themselves set up this very witness without realizing it.

📖 This recalls the delegation from chapter one
👉 John already pointed to Jesus
🤔 The Jews set this witness up themselves
➡️ They did not realize what they started

## 🔥 He Was A Burning And A Shining Light

This describes John the Baptist's ministry in a vivid image.

Burning suggests genuine, intense passion for his message.

Shining suggests light that other people could actually see and follow.

John pointed people toward Jesus rather than toward himself.

🔥 Burning suggests real passion for his message
💡 Shining suggests light others could follow
👉 John pointed people toward Jesus
📖 He never pointed toward himself

## 🎉 Willing For A Season To Rejoice In His Light

The crowds enjoyed John's popularity only for a limited season.

Their enthusiasm for him had already started fading by this point.

Jesus gently points out how shallow and temporary that excitement really was.

True faith needed to go further than a passing trend.

🎉 Crowds enjoyed John for a season only
📉 Their enthusiasm was already fading
🗣️ Jesus names how shallow that excitement was
📖 Real faith needed to go further

# John 5:36-40
# 📖 Scriptures That Point To Jesus
---

## 💪 I Have Greater Witness Than That Of John

Jesus's own works themselves count as a greater testimony than words.

Healing this man at Bethesda is one clear example of that proof.

Actions here speak louder than any human endorsement ever could.

The Father himself works through everything Jesus does.

💪 His works testify louder than words
🏊 Healing the man is one example
🗣️ Actions outweigh human endorsement here
📖 The Father works through everything he does

## 👑 Hath Borne Witness Of Me

This points to a direct testimony from God the Father himself.

It may recall the voice heard at Jesus's baptism earlier.

It may also point to the works the Father enables Jesus to do.

Either way, the ultimate witness behind Jesus is God himself.

👑 This points to testimony from the Father
🎙️ It may recall the voice at his baptism
💪 It may point to the works he enables
📖 The ultimate witness is God himself

## 👂 Neither Heard His Voice, Nor Seen His Shape

The Jews had never directly heard God speak or seen his form.

That was never how most people encountered God throughout the Old Testament.

Scripture became the main way people could actually know him.

Jesus now stands in front of them as living proof instead.

👂 They never heard God speak directly
📜 Scripture was their main way to know him
👀 They never saw his form either
📖 Jesus now stands before them as proof

## 📜 Search The Scriptures

The Jews studied scripture carefully, believing it was the way to life.

They were not wrong to search, but they missed the actual point.

The scriptures themselves were pointing toward Jesus all along.

Knowing the text was never the same as knowing the one it described.

📜 They studied scripture seeking eternal life
🎯 Searching was not wrong, but incomplete
👉 Scripture pointed toward Jesus the whole time
📖 Knowing the text is not knowing him

## 🚫 Ye Will Not Come To Me, That Ye Might Have Life

This is a matter of the will, not a lack of information.

The Jews had plenty of scripture and plenty of evidence already.

What they were missing was not proof, but willingness.

Jesus names this refusal plainly, without any softening.

🚫 This is about will, not information
📚 They already had plenty of evidence
❤️ What they lacked was willingness
📖 Jesus names the refusal plainly

# John 5:41-47
# 👥 Honor From Men Or From God
---

## 🙅 I Receive Not Honour From Men

Jesus does not need or seek human approval for himself.

His sense of worth never depends on popularity or praise.

This frees him to speak hard truths without fear of losing favor.

Most religious leaders of his day cared deeply about public approval.

🙅 Jesus does not seek human approval
💪 His worth never depends on praise
🗣️ This frees him to speak hard truths
📖 Most leaders cared deeply about approval

## 🔍 I Know You, That Ye Have Not The Love Of God In You

Jesus names the real problem underneath all their questions and objections.

This is not primarily about a lack of knowledge or evidence.

It is about a heart that does not truly love God.

Right beliefs without real love for God still fall short.

🔍 Jesus names the real underlying problem
📚 It is not about missing knowledge
❤️ It is about a heart without love
📖 Right beliefs without love still fall short

## 👑 I Am Come In My Father's Name, And Ye Receive Me Not

Jesus comes carrying his Father's own authority and identity.

Coming in someone's name means representing them fully and completely.

The Jews reject the very one God himself sent to them.

Their rejection is aimed higher than they probably realize.

👑 Jesus carries his Father's own authority
🤝 Coming in a name means full representation
🚫 The Jews reject the one God sent
📖 Their rejection aims higher than they know

## ⚠️ If Another Shall Come In His Own Name, Him Ye Will Receive

Jesus predicts people will gladly accept false teachers who seek only themselves.

Self promoting leaders often feel more comfortable and familiar to a crowd.

True authority that points back to God often feels harder to accept.

History has repeated this exact pattern again and again since then.

⚠️ Jesus predicts people will accept false teachers
🙋 Self seeking leaders feel more familiar
🚫 True authority can feel harder to accept
📖 History keeps repeating this same pattern

## 🔀 How Can Ye Believe, Which Receive Honour One Of Another

Seeking approval from other people and seeking real faith pull in different directions.

Caring too much about reputation makes it hard to follow an unpopular truth.

Many of these leaders valued their standing in the community above honesty.

Real faith sometimes costs the very approval people are not willing to lose.

🔀 Approval seeking and real faith pull apart
😬 Reputation made unpopular truth hard to follow
👥 Many valued standing over honesty
📖 Real faith can cost real approval

## 📜 Moses, In Whom Ye Trust

The Jews placed enormous confidence in Moses and the law he gave.

Jesus turns their own trusted authority directly back against them.

Moses himself, they are told, actually wrote about Jesus.

Their greatest hero becomes a witness testifying against their unbelief.

📜 They trusted Moses and his law completely
🔀 Jesus turns that trust back on them
✍️ Moses himself wrote about Jesus
📖 Their hero now testifies against them

## 🎯 If Ye Believe Not His Writings, How Shall Ye Believe My Words

Jesus closes with a simple, pointed logical challenge.

Moses's writings and Jesus's own words ultimately point to the same truth.

Rejecting one while claiming to accept the other does not hold together.

The chapter that opened with a healing ends with a direct confrontation.

🎯 Jesus closes with a pointed challenge
🔗 Moses and Jesus point to one truth
🚫 Accepting one but not the other fails
📖 A healing chapter ends in confrontation`.trim();

export const JOHN_FIVE_PERSONAL_SECTIONS = parseJohnFiveRawNotes(JOHN_FIVE_RAW_NOTES);
