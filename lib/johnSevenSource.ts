export type JohnSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnSevenRawNotes(rawText: string): JohnSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 7:${startVerse}` : `John 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 John 7 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_SEVEN_RAW_NOTES = `# John 7:1-5
# 😔 His Brothers Do Not Believe
---
## 📜 He Would Not Walk In Jewry

"Jewry" is an old word for the region of Judea.

Jerusalem sits inside that region.

It was the center of Jewish religious power.

Jesus avoids that region because its leaders already want him dead.

This is not fear taking over his mission.

It is the right timing, not yet here.

📜 Jewry means the region of Judea

🏛️ Jerusalem sits at its center

⚠️ Leaders there already want him dead

📖 Timing, not fear, shapes his movement

## 📍 Because The Jews Sought To Kill Him

The phrase "the Jews" in John usually means the religious leaders in Jerusalem.

It does not mean the whole Jewish nation.

Jesus himself was Jewish, and so were all his disciples.

John is naming one hostile group, not an entire people.

Missing that distinction has caused real harm throughout history.

📍 The Jews here means Jerusalem's leaders

🚫 Not the whole Jewish nation

👤 Jesus and his disciples were Jewish

📖 John names a group, not a people

## ⛺ The Jews' Feast Of Tabernacles Was At Hand

"Tabernacles" was one of three feasts every Jewish man had to attend in Jerusalem.

It celebrated the harvest.

It also remembered the years Israel lived in tents in the wilderness.

Families built small shelters and lived in them for a week.

Jerusalem would have been crowded with travelers during this feast.

🌾 Tabernacles celebrated the harvest season

⛺ Families lived in temporary shelters

📅 One of three required yearly feasts

📖 Jerusalem was crowded during this week

## 👀 Shew Thyself To The World

"Shew thyself" means make a public display.

It means prove something openly, for everyone to see.

His brothers are not offering real encouragement here.

They are daring him to prove himself in the most dangerous city for him.

This sounds like support on the surface.

Underneath, it is closer to a taunt.

👀 Shew thyself means prove it publicly

🎭 This sounds like support, not encouragement

⚠️ Jerusalem was the riskiest place for him

➡️ Doubt can disguise itself as advice

## 👪 Neither Did His Brethren Believe In Him

This is a plain, direct statement.

Jesus's own brothers did not believe he was the Messiah at this point.

Growing up in the same house does not guarantee understanding who someone really is.

Mark's Gospel shows this same doubt from his family.

These brothers later become believers after the resurrection.

James, one of them, leads the church in Jerusalem.

👪 His own brothers did not believe

🏠 Growing up together is not understanding

📜 Mark shows this same doubt elsewhere

📖 Doubt here does not mean doubt forever

# John 7:6-9
# ⏳ My Time Is Not Yet Come
---
## ⏳ My Time Is Not Yet Come

Jesus repeats this phrase several times throughout John's Gospel.

It points ahead to his death and resurrection, the hour he came to fulfill.

Right now, that hour has simply not arrived yet.

He is not refusing to go to the feast out of fear.

He is refusing to let his brothers set his schedule.

⏳ My time points to his death

🔁 This phrase repeats across John's Gospel

🧭 Jesus controls his own schedule

📖 The right hour has not arrived

## 🙂 Your Time Is Alway Ready

"Alway" is an old spelling of always.

Jesus tells his brothers that any time works fine for them.

Nothing is at stake for them if they go up to the feast.

Everything is at stake for him.

The danger is not shared equally between them.

📝 Alway is an old spelling of always

🙂 Any time works fine for them

⚠️ Everything is at stake for him

📖 The danger is not shared equally

## 🔥 The World Cannot Hate You, But Me It Hateth

Jesus explains exactly why the danger falls on him and not his brothers.

His brothers blend in with the world's values.

He does not, because he exposes what is wrong with those values.

"Testify" here means to speak the truth about something plainly.

Naming sin honestly tends to draw anger toward the one who names it.

🌍 His brothers blend in with the world

🔥 Jesus exposes the world's wrong values

🗣️ Testify means speaking the truth plainly

📖 Naming sin honestly draws real anger

## 🚫 I Go Not Up Yet Unto This Feast

This line can sound like a change of mind.

Jesus does go up to the feast in verse ten.

That is not a contradiction.

He means he will not go in the public group his brothers wanted.

He goes later, on his own timing, away from attention.

"Yet" is the word the English easily hides.

🚫 Not a contradiction with verse ten

👥 He skips the public traveling group

🕰️ He goes later, on his own timing

📖 Yet is the word that matters most

# John 7:10-13
# 🤫 Up To The Feast In Secret
---
## 🤫 Not Openly, But As It Were In Secret

Jesus still goes to the feast his brothers pushed him toward.

He simply refuses to go the way they wanted.

No crowd, no announcement, no public entrance.

He controls how and when people see him.

🤫 Jesus travels without an announcement

🚫 No public entrance, no crowd

🧭 He controls how people see him

📖 Obedience does not require their terms

## 👀 Then The Jews Sought Him At The Feast, And Said, Where Is He?

People are already looking for Jesus before he even arrives.

His reputation from earlier miracles and teaching has gone ahead of him.

The question shows real curiosity, not only hostility.

Not everyone asking this question wants to harm him.

👀 People search for him before he arrives

📣 His reputation already traveled ahead

❓ The question shows real curiosity

📖 Not everyone looking for him is hostile

## 🗣️ Much Murmuring Among The People

"Murmuring" means low, uneasy talk passed between people in small groups.

The crowd has split into two opinions about Jesus.

Some think he is simply a good man.

Others think he deceives the people on purpose.

This same two sided reaction follows Jesus through much of John's Gospel.

🗣️ Murmuring means uneasy talk in small groups

👍 Some call him a good man

👎 Others call him a deceiver

📖 Opinions split everywhere Jesus goes

## 🤐 No Man Spake Openly Of Him For Fear Of The Jews

People hold real opinions about Jesus but will not say them out loud.

The religious leaders control enough power to punish open support.

Fear silences honest conversation in the middle of the crowd.

This same fear returns later in the chapter, among the rulers themselves.

🤐 People hide their real opinions

⚠️ Leaders hold real power to punish

😨 Fear silences honest public conversation

📖 This same fear returns later in the chapter

# John 7:14-18
# 📜 Teaching In The Temple
---
## 📅 About The Midst Of The Feast

Tabernacles lasted about a week.

Jesus arrives partway through it, not at the very start.

Showing up mid feast kept attention lower than arriving on day one.

It also gave him time to teach before the feast's most dramatic moments.

📅 Tabernacles lasted about a week

🚶 Jesus arrives partway through it

👀 Less attention than a day one arrival

📖 Time to teach before the feast peaks

## 📚 How Knoweth This Man Letters, Having Never Learned?

"Letters" here means formal training under a recognized rabbi.

Every respected teacher in this culture could name the rabbi who trained them.

Jesus has no such teacher to point to.

His knowledge does not come from that normal path.

The crowd is genuinely confused, not simply hostile, in this moment.

📚 Letters means formal rabbinic training

🧑‍🏫 Teachers normally named their own rabbi

❓ Jesus has no teacher to name

📖 His knowledge comes from another source

## 📖 My Doctrine Is Not Mine, But His That Sent Me

Jesus answers the confusion directly.

He never trained under a human rabbi because his teaching comes from God the Father.

"Doctrine" simply means teaching.

He is not claiming new, invented ideas.

He is claiming a direct, divine source instead.

📖 Doctrine simply means teaching

🙅 Not from a human rabbi

🙌 His teaching comes from the Father

➡️ A divine source, not invention

## ✅ If Any Man Will Do His Will, He Shall Know Of The Doctrine

Jesus offers a test that starts with action, not study.

Obedience comes first, and understanding follows after.

Many people wait to understand everything before they will obey.

Jesus flips that order completely.

✅ Obedience comes before full understanding

🔄 Jesus flips the normal order

🧠 Understanding follows after obedience

📖 Doing comes first, knowing comes after

## 🪞 He That Speaketh Of Himself Seeketh His Own Glory

Jesus names the real test for telling a true teacher from a false one.

A person chasing their own glory speaks for themselves.

A person sent by God points away from themselves, toward the one who sent them.

Jesus claims the second kind of motive for himself.

🪞 A false teacher seeks his own glory

➡️ A true one points beyond himself

🙌 Jesus claims the second motive

📖 Motive reveals who someone really serves

# John 7:19-24
# ⚖️ Why Go Ye About To Kill Me
---
## 📜 Did Not Moses Give You The Law, And Yet None Of You Keepeth The Law?

Jesus turns the conversation toward hypocrisy.

The crowd prides itself on keeping the law of Moses.

Jesus points out that they already break it by plotting murder.

A crowd focused on his supposed guilt suddenly has to face its own.

📜 The crowd prides itself on the law

🔪 Plotting murder already breaks that law

🔄 Jesus turns the accusation back around

📖 Hypocrisy hides behind claimed obedience

## 😤 Thou Hast A Devil

This accusation does not mean the people think Jesus is literally possessed.

It was a common insult meaning someone is paranoid or delusional.

The crowd uses it to dismiss his claim that anyone wants him dead.

Their own leaders really are planning exactly that.

😤 A common insult, not a literal claim

🙄 It meant paranoid or delusional

🚫 The crowd dismisses a true danger

📖 Irony sits underneath their denial

## 🏊 I Have Done One Work, And Ye All Marvel

Jesus points back to a specific miracle, not a vague claim.

He healed a lame man on the sabbath at the pool of Bethesda.

That event, told fully in chapter five, started this whole conflict.

One act of healing is still echoing through this entire argument.

🏊 Points back to the healing at Bethesda

📖 Told fully in chapter five

🔁 One act still echoes through this argument

➡️ A single kindness sparked a lasting conflict

## 📛 Moses Therefore Gave Unto You Circumcision, Not Because It Is Of Moses, But Of The Fathers

Jesus corrects a small but important detail.

Circumcision did not start with Moses.

It began generations earlier with Abraham, long before the law of Moses existed.

Moses simply carried the practice forward into the law.

📛 Circumcision did not start with Moses

👴 It began earlier, with Abraham

📜 Moses only carried it forward

📖 Getting the origin right matters here

## 🧩 Every Whit Whole On The Sabbath Day

"Every whit" is an old way of saying completely, in every part.

Jesus is defending the healing from chapter five, done on a sabbath.

Circumcision itself was allowed on the sabbath under the law.

Jesus argues that healing a whole person should be allowed too.

🧩 Every whit means completely, fully

🏥 Defends the healing from chapter five

📜 Circumcision was already allowed on the sabbath

📖 Healing a person fits the same logic

## ⚖️ Judge Not According To The Appearance, But Judge Righteous Judgment

Jesus closes this argument with a direct command.

Surface level judgment often gets the facts backward.

The crowd judged a kind, legal healing as a crime.

Real judgment looks underneath the surface to what is actually right.

👀 Surface judgment often gets it backward

⚖️ A kind, legal act was called a crime

🔍 Real judgment looks underneath the surface

📖 Fairness requires looking deeper

# John 7:25-31
# ❓ Whom They Seek To Kill
---
## 😲 Is Not This He, Whom They Seek To Kill?

Some people in Jerusalem already know about the plot against Jesus.

They are stunned to see him teaching openly in the temple.

Their question shows real shock, not accusation.

The gap between the secret plot and the public scene confuses them.

😲 Some already knew about the plot

🏛️ They see him teaching openly anyway

❓ Their question shows real shock

📖 A secret plan meets a public scene

## 🗣️ He Speaketh Boldly, And They Say Nothing Unto Him

The crowd notices something strange.

The rulers who want Jesus dead are doing nothing to stop him.

That silence raises a real question in the crowd's mind.

Maybe the rulers themselves are not sure what to do with him.

🗣️ Jesus teaches without any fear

🤐 The rulers say nothing to stop him

🤔 Their silence raises real suspicion

📖 Even his enemies hesitate here

## 📝 Howbeit We Know This Man Whence He Is

"Howbeit" is an old word for however.

The crowd assumes they already know where Jesus comes from, a carpenter's home in Nazareth.

Jewish tradition at the time expected the true Messiah to appear from a hidden origin.

Because they think they know his background, they conclude he cannot be the Christ.

📝 Howbeit is an old word for however

🏠 They know his hometown, Nazareth

🎭 Tradition expected a hidden, mysterious origin

📖 A wrong assumption blocks their belief

## 🙌 I Am Not Come Of Myself, But He That Sent Me Is True

Jesus answers their confusion about his origin directly.

Yes, they know his hometown.

No, they do not know where his real mission began.

His true origin is God the Father, not Nazareth.

🏠 They know his hometown, not his mission

🙌 His real origin is God

✅ He affirms the Father's truth

📖 Earthly facts can hide a deeper truth

## ✋ His Hour Was Not Yet Come

The crowd tries to seize Jesus, but it fails.

John does not credit luck or a clever escape for this.

God's own timetable, not the crowd's anger, controls this moment.

The same phrase appears earlier in this chapter, at verse six.

✋ The attempt to seize him fails

⏳ God's timetable controls the outcome

🔁 The same phrase appeared in verse six

📖 No one can rush God's timing

## 👍 Will He Do More Miracles Than These Which This Man Hath Done?

Many in the crowd respond with growing belief, not rejection.

They reason from what they have already seen him do.

If the real Christ does more, surely Jesus already qualifies.

Belief here grows from evidence, not from blind guessing.

👍 Many respond with growing belief

🧮 They reason from his miracles

✅ If this is the standard, he qualifies

📖 Evidence, not guessing, builds their belief

# John 7:32-36
# 🚔 The Pharisees Send Officers
---
## 🏛️ The Pharisees And The Chief Priests Sent Officers To Take Him

These "officers" were temple guards, not Roman soldiers.

They answered to the Jewish religious council, not to Rome.

Sending them shows the religious leaders were ready to act, not just talk.

This decision sets up the dramatic scene at the end of the chapter.

🏛️ Officers were temple guards, not Romans

👮 They answered to the religious council

📣 Talk has turned into real action

📖 This sets up the chapter's ending scene

## ⏳ Yet A Little While Am I With You

Jesus speaks about his remaining time with a calm, settled tone.

He is not panicked about the officers sent after him.

His time on earth is short, but it is not out of his control.

He knows exactly how much time remains.

⏳ His remaining time is short

😌 Jesus stays calm, not panicked

🧭 His time is still under his control

📖 He knows exactly what is coming

## ⬆️ Ye Shall Seek Me, And Shall Not Find Me

Jesus points ahead to his death and return to the Father.

Once he returns to God, people cannot simply go looking for him the way they do now.

This is not a riddle meant to confuse on purpose.

It is a real warning about a closing window of time.

⬆️ Points ahead to his return to God

🚪 A window of access will close

⚠️ A real warning, not a riddle

📖 Time to respond will not last forever

## 😏 Will He Go Unto The Dispersed Among The Gentiles, And Teach The Gentiles?

The crowd means this question as a mocking guess.

They cannot imagine Jesus actually leaving Jewish territory to teach outsiders.

Later in the New Testament, the gospel does spread to the Gentiles, exactly as they joked.

Their sarcasm accidentally predicts what truly happens.

😏 Meant as a mocking guess

🌍 Gentiles means non Jewish people everywhere

🎯 The gospel really does reach them later

📖 Their sarcasm predicted the truth

# John 7:37-39
# 💧 Rivers Of Living Water
---
## 💧 In The Last Day, That Great Day Of The Feast

Tabernacles ended with a special water ceremony on its final day.

Priests carried water from a nearby pool and poured it out at the temple altar.

The ceremony looked back to God providing water in the wilderness long ago.

Jesus chooses this exact moment, with everyone watching, to speak.

💧 A water ceremony closed the feast

🏺 Priests poured water at the altar

📜 It recalled water in the wilderness

📖 Jesus speaks at the perfect moment

## 💧 If Any Man Thirst, Let Him Come Unto Me, And Drink

Jesus uses the image everyone just watched, water poured at the altar.

"Thirst" here means a deep need, not simple physical dryness.

He offers himself as the true answer to that deep need.

The invitation is open to anyone, without exception.

💧 Thirst means a deep inner need

🙌 Jesus offers himself as the answer

🌍 The invitation excludes no one

📖 A real need meets a real offer

## 🫀 Out Of His Belly Shall Flow Rivers Of Living Water

"Belly" here means the innermost part of a person, not the stomach.

"Living water" means water that flows and moves, unlike a still pool.

Jesus promises something that keeps flowing outward, not water that simply sits and fills.

Believing in him leads to overflow, not just personal satisfaction.

🫀 Belly means a person's innermost part

🌊 Living water means water that flows

➡️ Faith overflows, it does not just sit

📖 Belief in Jesus produces outward flow

## 🕊️ The Holy Ghost Was Not Yet Given

John steps in here to explain what Jesus meant by living water.

Jesus was speaking about the Holy Spirit.

At this point in the story, the Spirit had not yet come in this new way.

That gift arrives later, at Pentecost, after Jesus is raised and glorified.

💡 John explains the living water image

🕊️ Jesus meant the Holy Spirit

⏳ The Spirit had not yet come

📖 Pentecost still waits ahead in the story

# John 7:40-44
# ✂️ A Division Among The People
---
## 📜 Of A Truth This Is The Prophet

"The Prophet" points to a promise from Deuteronomy eighteen.

Moses told Israel that God would one day send a prophet like him.

Many in the crowd now believe Jesus fulfills that exact promise.

This is a specific, scripture based claim, not a vague compliment.

📜 The Prophet points to Deuteronomy eighteen

👴 Moses promised a prophet like himself

✅ Many believe Jesus fulfills that promise

📖 A specific promise, not a vague guess

## 🗺️ Shall Christ Come Out Of Galilee?

Some in the crowd dismiss Jesus based on a wrong assumption.

They assume he was born in Galilee.

That is where he grew up and worked as a man.

The reader of John's Gospel already knows this assumption is incomplete.

A wrong fact about his birth becomes their excuse to disbelieve.

🗺️ They assume Galilee is his birthplace

🙅 That assumption is incomplete

📖 John's reader already knows more

➡️ A wrong fact becomes a convenient excuse

## 🏘️ Christ Cometh Of The Seed Of David, And Out Of The Town Of Bethlehem

This recalls the prophecy from Micah chapter five.

Jesus actually was born in Bethlehem, in the family line of David.

The crowd arguing against him simply does not know this detail.

Their confident objection is built on a gap in their own information.

📜 Recalls the prophecy in Micah five

🏘️ Jesus truly was born in Bethlehem

❓ The crowd does not know this

📖 Confidence does not require being right

## ✂️ There Was A Division Among The People Because Of Him

"Division" becomes a repeated word in John's Gospel whenever Jesus is near.

Jesus never asked the crowd to split into warring opinions for its own sake.

Clear truth simply forces a response, one way or the other.

Staying neutral about Jesus turns out to be harder than it sounds.

✂️ Division repeats often in John's Gospel

🎯 Truth forces a real response

⚖️ Neutral ground is hard to hold

📖 Jesus divides by being who he is

# John 7:45-49
# 🗣️ Never Man Spake Like This Man
---
## 😤 Why Have Ye Not Brought Him?

The chief priests and Pharisees expected a simple arrest.

Instead, their own officers return empty handed.

Their frustrated question opens a surprising moment in the story.

Power expected easy obedience and did not get it.

😤 Leaders expected a simple arrest

🙅 Officers return without Jesus

❓ Their question shows real frustration

📖 Power does not always get its way

## 🗣️ Never Man Spake Like This Man

These officers were sent specifically to arrest Jesus.

Instead, they come back describing him with open admiration.

Even people assigned to oppose Jesus are moved by what they heard.

Their honest report embarrasses the men who sent them.

👮 Sent to arrest, not to admire

😲 They return with open admiration

🗣️ Even opponents are moved by his words

📖 Truth can reach even an assigned enemy

## 😡 Are Ye Also Deceived?

The Pharisees respond with contempt instead of curiosity.

They assume anyone impressed by Jesus must simply be fooled.

This question refuses to consider that the officers might be right.

Certainty can close off the one place truth might get in.

😡 Pharisees respond with pure contempt

🙄 They assume the officers were fooled

🚫 They refuse to consider another option

📖 Certainty can block out the truth

## 📚 This People Who Knoweth Not The Law Are Cursed

The Pharisees look down on ordinary people who never studied the law formally.

"Cursed" here reveals real contempt, not careful theology.

Common people are treated as beneath real religious consideration.

This attitude matters again a moment later, when Nicodemus speaks up.

📚 Ordinary people lacked formal training

😤 Cursed reveals contempt, not theology

👇 Common people get looked down on

📖 This contempt sets up the next verse

# John 7:50-53
# 🌙 Nicodemus Speaks Up
---
## 🌙 He That Came To Jesus By Night

Nicodemus is the same Pharisee from John chapter three.

He first visited Jesus secretly, under cover of darkness.

That early meeting left real questions in his mind, not full belief.

Now he speaks up in public, even if only carefully.

🌙 The same Pharisee from chapter three

🤫 He first came secretly, at night

❓ That meeting left real questions

📖 Private curiosity begins to go public

## ⚖️ Doth Our Law Judge Any Man, Before It Hear Him, And Know What He Doeth?

Nicodemus raises a real legal point, not a theological one.

Jewish law required a fair hearing before any judgment was made.

The council is condemning Jesus without ever actually hearing him speak for himself.

The very leaders who prize the law are the ones breaking it.

⚖️ The law required a fair hearing

🙅 Jesus has not been allowed to speak

🔄 Law keepers are breaking their own law

📖 Fairness gets abandoned in the rush to judge

## 🗺️ Art Thou Also Of Galilee?

The council answers with an insult instead of an argument.

Galilee carried a reputation as a rougher, less educated region.

Calling Nicodemus a Galilean is meant to shame and silence him.

Attacking the person is easier than answering the actual point.

🗺️ Galilee was seen as a rough region

😤 The insult is meant to silence him

🎯 They attack the person, not the point

📖 Mockery often replaces a real answer

## 📜 Out Of Galilee Ariseth No Prophet

This claim sounds confident, but it is not accurate.

The prophet Jonah came from Gath Hepher, a town inside Galilee.

The council's own certainty is built on a fact they got wrong.

Confident words are not the same as correct ones.

📜 Jonah actually came from Galilee

❌ Their confident claim is not accurate

🗣️ Certainty is not the same as truth

📖 Confidence does not equal truth
`.trim();

export const JOHN_SEVEN_PERSONAL_SECTIONS = parseJohnSevenRawNotes(JOHN_SEVEN_RAW_NOTES);
