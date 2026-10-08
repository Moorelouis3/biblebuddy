export type MarkOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkOneRawNotes(rawText: string): MarkOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 1:${startVerse}` : `Mark 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Mark 1 sections, received " + sections.length);
  }

  return sections;
}

const MARK_ONE_RAW_NOTES = `# Mark 1:1-3
# 📯 The Forerunner Is Announced
---
## 📰 The Beginning Of The Gospel Of Jesus Christ

"Gospel" means good news.

Mark opens by naming exactly what this whole book is.

It is not a legend written long after the fact.

It claims to be a true, eyewitness account of something that actually happened.

📰 Gospel means good news

📖 Mark names the whole book right away

👀 This claims to be a true account

➡️ Everything ahead builds on that claim

## ✝️ The Son Of God

Mark names who Jesus is before telling a single story about him.

"Son of God" was not a casual title in this culture.

It was the highest possible claim about someone's identity.

Every event in this book should be read in light of that claim.

✝️ Son of God is the highest claim

👑 This is named before any story starts

🔑 It is the key to the whole book

📖 Every event should be read in this light

## 📜 I Send My Messenger Before Thy Face

This quote is not Mark's own invention.

It combines two Old Testament prophecies, from Malachi and from Isaiah.

The messenger being promised here is John the Baptist.

Ancient readers would recognize these words as pointing straight to a forerunner for the Messiah.

📜 This quote combines two prophecies

📖 Malachi and Isaiah both promised a messenger

🧑 The messenger is John the Baptist

➡️ Old promises are landing in real time

## 🏜️ The Voice Of One Crying In The Wilderness

This phrase comes from Isaiah and describes a herald's job.

A herald's task was to prepare the way before a king's visit.

Roads for a king were literally cleared and leveled before he arrived.

John's job was to clear the way for God.

It was never about building an actual road.

🏜️ The voice comes from the wilderness

👑 Heralds prepared roads for a king's visit

🛣️ Make his paths straight borrows that image

📖 John clears the way for God himself

# Mark 1:4-8
# 🏕️ John Preaches In The Wilderness
---
## 🌊 John Did Baptize In The Wilderness

To baptize means to immerse someone in water as a sign of cleansing.

John performs this far from the Temple, out in the open wilderness.

That location matters.

It echoes Israel's own wilderness story, far from the religious establishment in Jerusalem.

🌊 Baptize means to immerse in water

🏜️ John worked in the wilderness, not the Temple

📍 Location recalls Israel's own wilderness story

➡️ A new beginning started outside the system

## 🙏 The Baptism Of Repentance For The Remission Of Sins

Repentance means a real change of direction, not just feeling sorry.

Remission means a debt being fully canceled.

John's baptism pictured both of those at once.

It did not save anyone on its own.

It pointed forward to something greater still coming.

🔄 Repentance means a change of direction

💳 Remission means a debt fully canceled

🌊 Baptism pictured both at once

📖 It pointed forward to something greater

## 🚶 There Went Out Unto Him All The Land Of Judaea

This describes large crowds traveling out from cities to find John.

Judaea covered the whole southern region around Jerusalem.

People were not casually curious.

They made a real trip just to hear him and be baptized.

🗺️ Judaea names the whole southern region

🚶 Crowds traveled a real distance for this

💧 They came specifically to be baptized

➡️ This was a movement, not a rumor

## 🐫 Clothed With Camel's Hair, And With A Girdle Of A Skin

Camel's hair clothing was rough, plain, and cheap.

A "girdle" was a thick belt worn around the waist.

This exact outfit matches the prophet Elijah from the Old Testament.

Readers familiar with Elijah would instantly connect the two men.

🐫 Camel's hair was rough and plain

🧵 A girdle is a thick waist belt

🔥 This outfit matches the prophet Elijah

📖 John steps into a prophet's role

## 🍯 Did Eat Locusts And Wild Honey

Locusts were a permitted wilderness food under Jewish law.

Wild honey came straight from nature, not from a market.

John lived entirely off what the wilderness itself provided.

His whole lifestyle matched his message of repentance and simplicity.

🦗 Locusts were a permitted wilderness food

🍯 Wild honey came straight from nature

🏕️ John lived off the land itself

➡️ His lifestyle matched his message

## 🥿 The Latchet Of Whose Shoes I Am Not Worthy To Stoop Down And Unloose

A "latchet" is a shoe strap or lace.

Unfastening someone's sandals was considered the lowest task.

That task was normally done by a slave.

John says he is not even worthy to do that lowest job for the one coming after him.

🥿 Latchet means a shoe strap

🧎 Unfastening sandals was a slave's task

🙇 John places himself beneath that task

📖 Real humility points away from itself

## 🔥 He Shall Baptize You With The Holy Ghost

John's baptism used only water.

He tells the crowd that one is coming who baptizes with the Holy Ghost instead.

Water baptism was an outward sign.

Holy Ghost baptism would change a person on the inside.

💧 John's baptism used water only

🔥 The one coming baptizes with the Holy Ghost

🪞 Water is only an outward sign

📖 The deeper change was still ahead

# Mark 1:9-13
# 🕊️ The Son Confirmed, Then Tested
---
## 📍 Jesus Came From Nazareth Of Galilee

Nazareth was a small, overlooked town in the region of Galilee.

It carried no special reputation among religious leaders of the time.

Mark names it plainly, with no apology.

God's chosen one came from a place nobody expected greatness to come from.

📍 Nazareth was small and overlooked

🗺️ Galilee was far from Jerusalem's religious center

🙇 No one expected greatness from this town

➡️ God often starts in unexpected places

## 🕊️ He Saw The Heavens Opened, And The Spirit Like A Dove

"The heavens opened" pictures a barrier between God and earth being pulled back.

The Spirit descending like a dove is a picture, not a claim that a literal bird appeared.

A dove suggests gentleness, not force.

This moment visibly marks Jesus as empowered for what comes next.

🌤️ Heavens opened pictures a barrier removed

🕊️ Dove pictures gentleness, not force

👀 This moment was visible, not private

📖 The Spirit now empowers his mission

## 🗣️ Thou Art My Beloved Son, In Whom I Am Well Pleased

This voice belongs to God the Father.

The words echo Psalm two and Isaiah forty two at the same time.

Jesus hears this approval before he performs a single miracle.

His identity was never something he had to earn.

🗣️ The voice belongs to the Father

📜 It echoes two Old Testament passages

🏆 Approval comes before any miracle

📖 Identity was given, not earned

## 🏜️ The Spirit Driveth Him Into The Wilderness

This does not mean Jesus stumbled into danger by accident.

The same Spirit that just descended on him now leads him into testing.

Approval and testing arrived back to back, not years apart.

Being God's beloved Son did not mean an easy road.

🕊️ The same Spirit leads him here

🏜️ The wilderness was not an accident

⚡ Approval and testing came back to back

➡️ Belonging to God is no easy road

## 👹 Tempted Of Satan

"Satan" means adversary or accuser.

Forty days recalls Israel's forty years of wandering.

It also recalls Moses fasting forty days on the mountain.

Mark gives almost no detail here.

Matthew and Luke both include far more.

The length and the setting alone carry the full weight of the trial.

👹 Satan means adversary or accuser

🔢 Forty recalls Israel's wilderness years

📜 Moses also fasted forty days

➡️ The number itself carries meaning

## 🦁 With The Wild Beasts

The wilderness near the Jordan was home to real predators.

It was never just empty sand.

Mark adds this detail that the other gospels leave out.

The danger Jesus faced was physical, not only spiritual.

🦁 Real predators lived in this wilderness

🌍 Only Mark includes this detail

⚠️ The danger was physical, not only spiritual

➡️ Jesus faced a real, harsh place

## 👼 The Angels Ministered Unto Him

To "minister" here means to serve or provide for someone's needs.

Angels cared for Jesus in a place with no food and no shelter.

God did not remove Jesus from the trial.

God sustained him through it instead.

👼 Minister means to serve someone's needs

🍞 Angels provided in a place with nothing

🛡️ God did not remove the trial

📖 God sustains people through trials, not around them

# Mark 1:14-20
# 🎣 Fishers Of Men
---
## ⛓️ After That John Was Put In Prison

Mark mentions John's imprisonment here without yet explaining why.

The full story behind his arrest comes later in this same book.

This detail marks a clear handoff.

John's public ministry is ending just as Jesus's is beginning.

⛓️ John's arrest is mentioned, not explained yet

📖 The full story comes later in Mark

🔄 One ministry ends as another begins

➡️ Jesus steps forward at this exact moment

## ⏳ The Time Is Fulfilled

This phrase announces that a long wait has reached its appointed moment.

Centuries of prophecy and promise are not background information anymore.

They are happening right now, in front of these listeners.

⏳ A long wait reaches its appointed moment

📜 Centuries of prophecy point to this moment

👀 Promise becomes present reality

📖 Waiting was never wasted time

## 👑 The Kingdom Of God Is At Hand

"Kingdom of God" means God's own rule breaking into the world.

It is not a place on a map.

"At hand" means it has already arrived close enough to touch.

It is not something far off in the future.

👑 Kingdom of God means God's own rule

🗺️ It is not a location on a map

✋ At hand means close enough to touch

➡️ This rule has already begun

## 🔄 Repent Ye, And Believe The Gospel

Repent does not simply mean feeling bad about something.

It means turning around and walking a completely different direction.

Belief here is not just agreeing with an idea in your head.

It means trusting the good news enough to act on it.

🔄 Repent means turning in a new direction

🙆 It is more than just feeling sorry

🤝 Belief means trusting enough to act

📖 Both together form Jesus's opening call

## 🎣 Casting A Net Into The Sea

Simon and Andrew worked the Sea of Galilee for a living.

Fishing there meant long hours and heavy nets.

This was ordinary, working class labor, not an elite profession.

Jesus calls men who were already doing honest, hard work.

🎣 Simon and Andrew were working fishermen

💪 The work was hard and uncertain

👷 This was ordinary, working class labor

➡️ Jesus calls people already at work

## 🕸️ I Will Make You To Become Fishers Of Men

Jesus takes a skill they already have and redirects its purpose.

Instead of pulling fish from water, they will gather people toward God.

The skill stays the same.

The mission changes completely.

🕸️ A familiar skill gets a new purpose

🐟 Fish become a picture for people

🎯 The mission is now gathering people

📖 God often reuses what we already know

## 👨‍👦 Left Their Father Zebedee In The Ship With The Hired Servants

Mentioning hired servants shows this was a real, working family business.

James and John were not desperate men with no other option.

They walked away from a stable income and their own father.

Following Jesus cost them something real, not just free time.

👨‍👦 Hired servants show a real family business

💼 These were not desperate, idle men

🚪 They left a stable income behind

➡️ Following Jesus had a real cost

# Mark 1:21-28
# 😲 Authority Over An Unclean Spirit
---
## 🏛️ He Entered Into The Synagogue, And Taught

A synagogue was the local Jewish place of worship and teaching.

It was not the Temple itself.

Every town had one, and visiting rabbis were often invited to teach there.

Capernaum's synagogue becomes an early, regular stop in Jesus's ministry.

🏛️ A synagogue was a local worship site

🕍 It was different from the Temple

📖 Visiting teachers were often invited to speak

➡️ Capernaum becomes an early home base

## 📚 Taught Them As One That Had Authority, And Not As The Scribes

Scribes typically taught by quoting other respected rabbis.

Jesus taught as though the authority was simply his own.

That difference was obvious to everyone listening.

It was not about volume or style.

It was about the source of what he said.

📚 Scribes usually quoted other teachers

🗣️ Jesus spoke with his own authority

👂 Listeners noticed the difference right away

📖 The source of his words set him apart

## 👤 A Man With An Unclean Spirit

"Unclean spirit" is another name for a demon.

The word "unclean" marks it as something that defiles.

It is not simply something unpleasant.

This man's condition was spiritual, not primarily a medical one.

👤 Unclean spirit means a demon

🚫 Unclean marks something that defiles

🙇 The condition was spiritual, not medical

➡️ Real spiritual conflict breaks into the room

## ❓ What Have We To Do With Thee, Thou Jesus Of Nazareth

This question was a common way of demanding to be left alone.

The spirit is not confused about who Jesus is.

It already knows exactly who it is speaking to.

❓ This phrase demanded to be left alone

🙅 The spirit is not confused at all

👁️ It already recognizes Jesus fully

➡️ Fear does not require confusion

## 👑 I Know Thee Who Thou Art, The Holy One Of God

A demon names Jesus correctly before most human characters in this book do.

Supernatural recognition came faster than human belief.

Knowing who Jesus is did not make this spirit obedient.

👑 A demon names Jesus correctly here

⚡ Recognition came faster than human belief

🚫 Knowledge alone did not bring obedience

📖 Knowing the truth is not obeying it

## 🤐 Hold Thy Peace, And Come Out Of Him

Jesus silences the spirit before casting it out.

He does not let the demon's words continue any further.

Two short commands end the conflict.

There is no struggle on Jesus's side.

🤐 Jesus silences the spirit's words

🚪 He commands it to leave

⚡ Two short commands end the conflict

📖 His authority needed no long battle

## 😱 The Unclean Spirit Had Torn Him, And Cried With A Loud Voice

The departure was violent and loud.

It was not quiet or gentle.

Everyone in the room would have seen and heard this moment clearly.

Mark does not soften how unsettling real deliverance could look.

😱 The exit was violent and loud

👀 The whole room witnessed it

📣 Mark does not soften the scene

➡️ Real deliverance was not always quiet

## 📣 His Fame Spread Abroad Throughout All The Region

News like this could not stay contained to one synagogue.

Word spread fast across the wider region of Galilee.

A single public act of authority became common knowledge almost overnight.

📣 News spread beyond this one town

🗺️ The whole region of Galilee heard

⚡ Fame grew almost overnight

📖 One act of authority reached many ears

# Mark 1:29-34
# 🤲 Healing In Simon's House
---
## 🏠 The House Of Simon And Andrew

Simon, later called Peter, and his brother Andrew shared this home.

Visiting a disciple's own house shows how personal this part of the ministry was.

This was not a public event planned in advance.

🏠 Simon and Andrew shared this home

👨‍👦 Simon is later known as Peter

🚪 This was a private, personal visit

➡️ Ministry did not stop after the synagogue

## 🤒 Simon's Wife's Mother Lay Sick Of A Fever

This verse reveals that Simon, a future apostle, was a married man.

In this period, a fever without modern medicine could be genuinely dangerous.

Family simply told Jesus about her condition.

No formal request or ceremony was needed.

👰 Simon was a married man

🤒 Fevers were genuinely dangerous back then

🗣️ Family told Jesus without a formal request

➡️ Need alone was enough to bring him in

## 🤝 Took Her By The Hand, And Lifted Her Up

Jesus heals through a simple, personal touch.

He does not perform a dramatic ritual or speak a long prayer.

The healing is immediate and complete.

She rises able to serve others right away.

🤝 Healing came through a simple touch

⚡ No ritual or long prayer was needed

🏃 Her recovery was immediate

📖 Restored people often return to serving others

## 🌇 At Even, When The Sun Did Set

The Jewish Sabbath ran from sunset to sunset.

Carrying a sick person any distance before sunset would have broken that rule.

Crowds waited until the sun went down to bring their sick to Jesus.

🌇 Sabbath ran from sunset to sunset

🚫 Carrying the sick earlier would break the rule

⏳ Crowds waited for sunset specifically

➡️ Even the timing here reflects real religious law

## 🚪 All The City Was Gathered Together At The Door

This is not a small gathering of a few neighbors.

Mark describes what feels like the whole town showing up at once.

One morning's healing and one afternoon's teaching had already drawn this much attention.

🚪 A crowd filled the doorway

🏙️ It felt like the whole town

⚡ Attention grew within a single day

➡️ Word of Jesus traveled fast

## 🤫 Suffered Not The Devils To Speak, Because They Knew Him

The demons being cast out knew exactly who Jesus was.

Jesus deliberately kept them from announcing that identity publicly.

His full identity would be revealed on his own timing.

It would not be revealed on theirs.

🤫 Jesus silenced the demons on purpose

👁️ They already knew his true identity

⏳ His timing controlled the announcement

📖 Truth revealed too soon can still be misused

# Mark 1:35-39
# 🙏 Alone To Pray, Then On To Preach
---
## 🌅 Rising Up A Great While Before Day

This phrase describes waking long before sunrise, while it was still dark.

The previous day had been packed and exhausting.

Jesus chose rest's opposite anyway.

He prioritized prayer over sleep.

🌅 This means waking long before sunrise

😴 The previous day had been exhausting

🙏 He chose prayer over extra sleep

➡️ Priorities show most clearly when tired

## 🏕️ Departed Into A Solitary Place, And There Prayed

Jesus deliberately leaves the crowd behind to be alone.

Demand for his time was already constant.

Even so, he makes space to pray.

This pattern shows prayer as a genuine need, not an afterthought.

🏕️ He chose a solitary place on purpose

🙏 Prayer came before more public work

⏳ He made time despite constant demand

📖 Prayer was a need, not an extra

## 🔍 All Men Seek For Thee

The disciples track Jesus down specifically to report rising demand.

Everyone, it seems, wants a piece of his time.

This is the first hint in Mark of the pressure that fame can bring.

🔍 Disciples specifically came looking for him

📣 Demand for his time kept growing

⚖️ Fame already carried real pressure

➡️ Popularity is not the same as purpose

## 🚶 Let Us Go Into The Next Towns, That I May Preach There Also

Jesus does not stay where the crowds already are.

He chooses to move toward people who have not heard him yet.

Popularity in one town was never the goal.

🚶 He moves toward new towns

🗣️ New listeners mattered more than staying popular

🎯 Reach mattered more than comfort

📖 Preaching everywhere came before preaching comfortably

## 🎯 For Therefore Came I Forth

Jesus names his own purpose plainly here.

Preaching was not one task among many for him.

It was the reason he came in the first place.

Every other decision in this chapter flows from that purpose.

🎯 Jesus states his purpose directly

📣 Preaching was the main reason, not a task

🧭 This purpose shaped where he traveled

📖 Knowing your purpose decides your direction

# Mark 1:40-45
# 🤍 The Leper Made Clean
---
## 🤍 There Came A Leper To Him

Leprosy was a serious skin disease that spread slowly across the body.

People with it were required to live apart from everyone else.

This man broke social convention just by approaching Jesus directly.

🤍 Leprosy was a serious, spreading skin disease

🚷 Lepers were required to live apart

🚶 He broke convention just by approaching

➡️ Desperation outweighed the social risk

## 🙏 If Thou Wilt, Thou Canst Make Me Clean

"Clean" here means ritually fit to rejoin normal community life.

It does not simply mean free of disease.

The leper does not doubt Jesus's ability.

His only question is whether Jesus is willing.

🧼 Clean means fit to rejoin community life

💪 The leper trusts Jesus's ability fully

❓ His real question is about willingness

📖 Faith here asks about willingness, not power

## 💛 Moved With Compassion, Put Forth His Hand, And Touched Him

Touching a leper was normally forbidden.

It risked spreading the disease.

It also broke rules about ritual uncleanness.

Jesus touches him anyway, before healing even happens.

Compassion moved first.

The miracle followed after.

💛 Touching a leper was normally forbidden

🤲 Jesus touched him before healing happened

❤️ Compassion came before the miracle

📖 Love reached out before power acted

## ⚡ I Will Be Thou Clean

Jesus answers the man's exact question directly, I will.

The healing happens the instant the words are spoken.

No process or waiting period comes first.

No ritual step is needed either.

⚡ Jesus answers the exact question asked

🗣️ Healing happens the moment he speaks

🚫 No ritual or waiting period was needed

📖 His word alone was enough

## 📜 Shew Thyself To The Priest

"Shew" is an old spelling of "show."

Moses's law required a priest to formally examine a healed leper.

Only after that examination could the man legally rejoin the community.

Jesus honors the law even while working outside its normal process.

📜 Shew is an old spelling of show

🧑‍⚖️ A priest had to certify the healing

🏘️ Certification allowed him to rejoin the community

➡️ Jesus still honored the Law of Moses

## 📣 Began To Publish It Much, And To Blaze Abroad The Matter

Jesus had told the man to stay quiet.

The man does the exact opposite instead.

Good news can be nearly impossible to contain.

That is true even under direct instruction.

📣 The man ignored Jesus's instruction

🙅 He was told to stay quiet

🌊 Good news was nearly impossible to contain

➡️ Obedience and excitement do not always match

## 🏜️ Jesus Could No More Openly Enter Into The City

The leper's disobedience created a real, lasting consequence.

Jesus now has to stay in remote places.

He could no longer move freely through towns.

Fame carried a genuine cost to his freedom of movement.

People kept coming to him anyway, no matter where he went.

🏜️ Jesus retreats to remote places now

🚫 He could not move freely in towns

⚖️ Fame came with a real cost

📖 Even in hiding, people still sought him
`.trim();

export const MARK_ONE_PERSONAL_SECTIONS = parseMarkOneRawNotes(MARK_ONE_RAW_NOTES);
