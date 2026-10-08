export type MatthewTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyRawNotes(rawText: string): MatthewTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 20:${startVerse}` : `Matthew 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Matthew 20 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_RAW_NOTES = `# Matthew 20:1-4
# 🌄 The Householder Hires At Dawn
---
## 📚 For The Kingdom Of Heaven Is Like Unto

Jesus often starts a story this way to teach something about God's kingdom.

"Like unto" means this story is a comparison, not a literal history lesson.

The kingdom works differently than the world the listeners already knew.

This parable will overturn an assumption about fairness and reward.

📚 Jesus signals a kingdom comparison
🌍 Kingdom logic differs from worldly logic
🔄 Fairness gets overturned in this story
➡️ A lesson about reward is coming

## 🏠 An Householder

A householder was a man who owned land and managed his own estate.

He had the wealth to hire workers and the authority to set wages.

In this story he represents God, and the vineyard pictures God's kingdom.

His choices in the story reveal something about how God treats people.

🏠 Householder means a landowner
👑 He has authority to hire and pay
🌱 The vineyard pictures God's kingdom
📖 His choices reveal God's character

## 🍇 Hire Labourers Into His Vineyard

Grape harvest season demanded extra hands beyond a landowner's regular workers.

Day labourers gathered in town hoping someone would hire them for the day.

Work was not guaranteed, and a missed day meant no food that night.

This custom explains why so many men are still waiting later in the story.

🍇 Harvest season needed extra workers
🏙️ Labourers waited in town for work
🍞 A missed day meant no pay
➡️ Waiting men appear again later

## 🪙 Agreed With The Labourers For A Penny A Day

The word translated "penny" here is a denarius, a Roman coin.

A denarius was the normal full day's wage for a common labourer.

Both sides agreed to this wage before the work ever began.

That agreement becomes important later, when the pay gets questioned.

🪙 Penny means a denarius coin
💵 A denarius was a full day's wage
🤝 Both sides agreed before work began
➡️ This agreement matters later

## 🌅 About The Third Hour

The Jewish and Roman day in this period started counting from sunrise, near six in the morning.

The third hour means about nine in the morning.

The householder goes out a second time to hire more workers.

He keeps returning to the marketplace throughout the whole day.

🌅 The day started counting at sunrise
🕤 Third hour means about nine in the morning
🔁 The householder returns again and again
📖 He never stops looking for workers

## 🏙️ Standing Idle In The Marketplace

The marketplace was the normal place where day labourers waited to be chosen.

Standing idle did not mean these men were lazy.

It meant no one had offered them work yet.

Their waiting shows how fragile daily survival was for the poorest workers.

🏙️ Marketplace was where labourers waited
🙅 Idle does not mean lazy
📋 No one had offered them work
📖 Daily survival depended on being chosen

## 🤝 Whatsoever Is Right I Will Give You

These later workers do not get a set wage like the first group did.

They agree to trust the householder's own sense of what is fair.

That trust becomes the real test at the end of the story.

🤝 No set wage is promised here
⚖️ They trust the householder's fairness
🎯 Their trust becomes the real test
➡️ Fairness will look different than expected

# Matthew 20:5-7
# ⏰ Hiring Continues All Day
---
## ☀️ The Sixth And Ninth Hour

The sixth hour means noon, the hottest part of the day.

The ninth hour means about three in the afternoon.

The householder keeps hiring hour after hour, not just once.

His search for workers never slows down the whole day.

☀️ Sixth hour means noon
🕒 Ninth hour means about three in the afternoon
🔁 He keeps hiring all day long
📖 His search never slows down

## 🕔 The Eleventh Hour

The eleventh hour means about five in the afternoon.

That left only one hour of daylight before the workday ended.

This phrase gave us a common modern saying about the last possible moment.

Here it describes workers hired so late they could barely work at all.

🕔 Eleventh hour means about five in the afternoon
⏳ Only one hour of work was left
💬 This gave us a common modern saying
➡️ These workers were hired at the very end

## 👀 Why Stand Ye Here All The Day Idle

The householder notices men still waiting even this late in the day.

He does not ignore them or walk past without asking.

His question shows genuine concern, not simply curiosity.

This small detail reveals his character before any payment ever happens.

👀 He notices the still waiting men
🙋 He stops to ask them directly
❤️ His question shows real concern
📖 His character shows before any pay

## 🙁 Because No Man Hath Hired Us

Their answer explains why they were still standing there so late.

No one had chosen them, through no fault of their own.

This removes any idea that they were lazy or avoiding work.

Their honesty sets up the generosity that follows.

🙁 They were simply never chosen
🚫 Not lazy, just never hired
✅ Their honesty is plain and simple
➡️ Generosity is about to follow

## ⏱️ Go Ye Also Into The Vineyard

The householder hires them immediately, even this close to quitting time.

He does not ask how much work they can still finish.

He offers them the same chance already given to everyone else.

Time left in the day never limits his willingness to hire.

⏱️ He hires them close to the end
🎁 Same chance given to everyone
🌱 He welcomes them into the vineyard
📖 His willingness to hire never runs out

# Matthew 20:8-12
# 💰 Equal Pay For Unequal Hours
---
## 🌆 So When Even Was Come

Even here means evening, when the workday finally ended.

Jewish law required that day labourers be paid before sunset, not days later.

Waiting until morning to pay a poor worker was considered unjust.

This detail shows the householder following the law exactly as written.

🌆 Even means evening
📜 Law required same day payment
⚖️ Delayed payment was considered unjust
📖 The householder follows the law exactly

## 👑 The Lord Of The Vineyard

This title repeats who is really in charge of this whole story.

He is the same man called the householder back in verse one.

In the parable, he stands in the place of God.

Every decision about pay and timing comes from him alone.

👑 Same man as the householder
🌱 He owns and rules the vineyard
🙏 He stands in the place of God
📖 Every decision comes from him alone

## 📣 Call The Labourers, And Give Them Their Hire

Hire here simply means the wages owed for the work done.

The steward is told to call every worker forward to be paid.

This begins the public moment where the whole day's fairness gets tested.

📣 Hire means the wages owed
📋 The steward calls every worker forward
🔎 A public moment of testing begins
➡️ Fairness is about to be revealed

## 🔄 Beginning From The Last Unto The First

Workers are usually paid in the order they started, first in, first out.

This householder reverses that normal order on purpose.

The last men hired are the first to be paid.

That small detail draws everyone's attention to what happens next.

🔄 He reverses the normal pay order
🕐 Last hired are first paid
👀 Everyone's attention is drawn here
➡️ A lesson is about to land

## 🪙 They Received Every Man A Penny

Every worker, no matter how many hours they worked, gets the same denarius.

The men hired at the eleventh hour receive a full day's wage.

This is the moment the whole parable has been building toward.

🪙 Every worker receives the same wage
⏳ One hour workers get a full wage
🎯 The parable's turning point arrives here
📖 Generosity defines this payment, not hours worked

## 🤔 They Supposed That They Should Have Received More

The men hired first naturally expect to be paid more than the rest.

They worked the longest, so more pay feels fair to them.

Their assumption is reasonable by normal standards of fairness.

The story is about to challenge that very standard.

🤔 They expect more pay than others
⏰ Longer hours felt like it deserved more
📏 A reasonable assumption by normal standards
➡️ That standard is about to be challenged

## 😤 Murmured Against The Goodman Of The House

Murmured means to grumble quietly, the same word used for Israel's complaints in the wilderness.

Goodman is an old word for the master of a household.

Their grumbling reveals resentment rather than honest confusion.

😤 Murmured means grumbled quietly
📜 Israel used this same word in the wilderness
🏠 Goodman means the master of the house
➡️ Grumbling reveals resentment, not confusion

## ⏱️ These Last Have Wrought But One Hour

This is the heart of their complaint, stated as plainly as possible.

One hour of work received the exact same pay as twelve hours.

By normal math, that looks completely unfair on the surface.

The next card reveals why the householder sees it differently.

⏱️ One hour paid the same as twelve
🧮 Looks unfair by normal math
😠 The core of their whole complaint
➡️ The householder sees it differently

## 🔥 Borne The Burden And Heat Of The Day

This phrase pictures real physical hardship, hours of labor under a hot Mediterranean sun.

These workers carried the heaviest, longest share of the day's work.

Their complaint is not really about the amount of money.

It is about fairness measured by effort instead of grace.

🔥 Pictures real heat and hard labor
💪 They carried the longest share of work
💰 Their complaint is not really about money
📖 Fairness by grace differs from fairness by effort

# Matthew 20:13-16
# ⚖️ Friend, I Do Thee No Wrong
---
## 🤝 Friend, I Do Thee No Wrong

The householder answers one grumbling worker directly and personally.

Friend sounds warm, but here it is a firm, respectful address, not flattery.

He starts by stating plainly that nothing unfair has happened.

His calm response contrasts sharply with the worker's anger.

🤝 He answers one worker directly
😐 Friend here is firm, not flattery
⚖️ He states plainly nothing unfair happened
📖 Calm truth answers an angry complaint

## 📜 Didst Not Thou Agree With Me For A Penny

The householder points back to the exact agreement made back in verse two.

Nothing about that original deal has changed or been broken.

The worker received precisely what he agreed to receive.

📜 Points back to the original agreement
✅ Nothing about that deal has changed
🪙 He received exactly what he agreed to
➡️ The complaint ignores the actual agreement

## 💰 Take That Thine Is, And Go Thy Way

This sounds blunt, but it is not a punishment.

The worker keeps every penny he is owed, in full.

He is simply being sent off with exactly what was promised.

💰 He keeps every penny owed
🚫 Not a punishment of any kind
🤷 A blunt but fair dismissal
➡️ Full payment, nothing taken away

## 🎁 I Will Give Unto This Last, Even As Unto Thee

The householder openly admits he is paying the last workers the exact same as the first.

This is not an accident or a bookkeeping mistake.

He chooses this generosity on purpose, in front of everyone.

🎁 Equal pay is chosen on purpose
👀 Done openly, not hidden
🚫 Not a bookkeeping mistake
📖 Generosity is the whole point

## 💵 Is It Not Lawful For Me To Do What I Will With Mine Own

The money belongs to the householder, earned and owned by him alone.

He has every right to decide how generous he wants to be with it.

No one else has a legal claim to override his choice.

💵 The money belongs to him alone
⚖️ He has the right to decide
🚫 No one can override his choice
➡️ Generosity is his to give

## 👁️ Is Thine Eye Evil, Because I Am Good

An evil eye in this culture was a well known idiom for envy and resentment.

The worker is not angry about losing money of his own.

He is angry that someone else received the same blessing he did.

This exposes jealousy hiding behind a complaint about fairness.

👁️ Evil eye is an idiom for envy
😠 He lost nothing of his own
💔 He resents another man's blessing
📖 Jealousy hides behind the fairness complaint

## 🔁 So The Last Shall Be First, And The First Last

This exact saying closed out the end of chapter nineteen.

Here it closes the parable that explains what the saying actually means.

Earthly order and divine reward do not always match.

🔁 Echoes the ending of chapter nineteen
🎯 Now the saying is fully explained
🔄 Earthly order is not divine order
📖 Reward does not follow the usual order

## ❓ For Many Be Called, But Few Chosen

This line raises a hard question that Bible teachers have long debated.

It may describe how many hear God's invitation compared to how many truly respond.

The text itself does not spell out every detail here.

What stays clear is that response to the invitation matters deeply.

❓ A line long debated by teachers
📢 Many hear the invitation
🙏 Fewer truly respond to it
➡️ Response to the call matters deeply

# Matthew 20:17-19
# ✝️ The Third Prediction
---
## ⛰️ Going Up To Jerusalem

Jerusalem sits high in the hill country, so every approach truly is a climb.

This is also Jesus's final journey toward the city before his death.

Every step forward now moves the story toward the cross.

⛰️ Jerusalem required an actual uphill climb
🚶 This is Jesus's final journey there
⏳ Every step moves toward the cross
➡️ The story now turns toward Jerusalem

## 👥 Took The Twelve Disciples Apart

Jesus pulls his twelve away from the crowd before speaking.

This hard teaching is meant for his closest followers, not the public.

Private moments like this one happen several times across the Gospels.

👥 Only the twelve are told
🤫 Not meant for the crowd
🔁 Private moments repeat in the Gospels
📖 Hard truths get personal attention

## 🏛️ Betrayed Unto The Chief Priests And Unto The Scribes

Chief priests ran temple worship and held real religious authority in Jerusalem.

Scribes were trained experts who studied and taught the law of Moses.

Together these two groups led the official opposition against Jesus.

🏛️ Chief priests led temple worship
📜 Scribes were experts in the law
🤝 Both groups opposed Jesus together
➡️ Official leaders turn against him

## 🏛️ Deliver Him To The Gentiles To Mock, And To Scourge, And To Crucify Him

Jewish leaders had no legal power to execute someone by crucifixion.

That power belonged only to Rome, the ruling Gentile authority.

Scourge means a brutal whipping that regularly happened before crucifixion.

Jesus names this entire painful process himself, in detail, ahead of time.

🏛️ Rome alone could order crucifixion
⚔️ Scourge means a brutal whipping
😣 Jesus names the pain in advance
📖 He walks toward it with full knowledge

## 🔁 The Third Day He Shall Rise Again

This is the third time Jesus has told his disciples this exact outcome.

Each time he adds a little more detail than before.

The resurrection promise always follows right behind the prediction of death.

🔁 The third time Jesus says this
📈 Each telling adds more detail
⚰️ Death is never the final word
📖 Resurrection always follows the prediction

# Matthew 20:20-23
# 👑 A Mother's Bold Request
---
## 👩 The Mother Of Zebedee's Children

This mother is the parent of James and John, two of the twelve disciples.

Many identify her by name elsewhere in the Gospels as Salome.

Comparing Gospel accounts of the crucifixion scene helps connect these names together.

👩 Mother of James and John
📖 Likely named Salome elsewhere
🔍 Gospel comparison connects the names
➡️ A family request is coming

## 🙇 Worshipping Him, And Desiring A Certain Thing

She approaches Jesus with visible respect before making her request.

A certain thing is deliberately vague, hinting she expects a big favor.

Her approach shows she already senses this is a bold ask.

🙇 She approaches with visible respect
❓ Her request stays deliberately vague
😏 She senses the ask is bold
➡️ A bold request is coming next

## 👑 Sit, The One On Thy Right Hand, And The Other On The Left

Ancient kings seated their most trusted officials closest to the throne.

The right hand and left hand were the two highest seats of honor.

She is asking for her sons to outrank the other ten disciples permanently.

👑 Closest seats belonged to top officials
✋ Right and left were the highest honor
📈 She asks for permanent top rank
📖 A bold request for power

## 😌 Ye Know Not What Ye Ask

Jesus answers gently, but he corrects a serious misunderstanding.

They are picturing a throne room, not a path to suffering.

Glory in God's kingdom comes bundled together with real cost.

😌 A gentle but firm correction
👑 They picture a throne, not a cross
⚖️ Glory comes bundled with cost
➡️ They do not see the cost yet

## 🍷 The Cup That I Shall Drink Of

In the Old Testament, a cup often pictures suffering poured out by God.

Jesus uses this same picture later while praying in Gethsemane.

Asking for glory means also accepting this cup of suffering.

🍷 Cup is an Old Testament picture of suffering
🙏 Jesus repeats this picture in Gethsemane
⚖️ Glory and suffering come together
📖 The cup cannot be separated from the crown

## 💧 Baptized With The Baptism

This is not a reference to water baptism at all.

It pictures being completely overwhelmed, the way water covers someone fully.

Jesus describes his coming suffering as something that will engulf him entirely.

💧 Not about water baptism here
🌊 Pictures being completely overwhelmed
😔 Describes suffering that engulfs him
➡️ The disciples do not grasp this yet

## 🙅 Not Mine To Give, But It Shall Be Given To Them For Whom It Is Prepared Of My Father

Jesus does not control who receives the highest seats of honor.

That decision belongs entirely to the Father's own plan.

Even the Son submits his authority to the Father here.

🙅 Jesus does not control the seats
👑 The decision belongs to the Father
🙏 Even the Son submits here
📖 The Father's plan has the final word

# Matthew 20:24-28
# 🤲 Whosoever Will Be Chief
---
## 😠 The Ten Heard It, They Were Moved With Indignation

The other ten disciples react with real anger at this request.

Their anger is not really about fairness toward James and John.

It reveals that all twelve still want the same kind of status.

😠 The ten react with real anger
🙄 Not simply about fairness
👥 All twelve still want status
➡️ The real problem runs deeper

## 👑 Princes Of The Gentiles Exercise Dominion

Jesus points to how pagan rulers typically treat the people under them.

Dominion here means control backed by force, not loving leadership.

He names this pattern so his disciples can clearly reject it.

👑 Pagan rulers rule by force
⚔️ Dominion means control, not love
🚫 Jesus names this to reject it
➡️ A different pattern is coming

## 👑 They That Are Great Exercise Authority Upon Them

Jesus repeats the same idea using slightly different words for emphasis.

Worldly greatness presses down on people from above.

This is the model his disciples have watched their whole lives.

👑 Greatness presses down from above
🔁 Repeated for emphasis
🌍 This is the common worldly model
➡️ Jesus is about to flip it

## 📜 Whosoever Will Be Great Among You, Let Him Be Your Minister

The word translated minister here is the same root behind our word deacon.

A minister in this sense serves others, like someone waiting on tables.

Greatness in God's kingdom flows from serving, not from being served.

📜 Minister shares a root with deacon
🍽️ Pictures someone serving at tables
🔄 Greatness means serving, not ruling
➡️ Kingdom greatness flips the normal order

## ⛓️ Whosoever Will Be Chief Among You, Let Him Be Your Servant

This second word for servant is stronger, closer to the word for slave.

Jesus raises the bar even higher for anyone seeking the top position.

The highest rank in the kingdom carries the lowest position on earth.

⛓️ Servant here is close to slave
📈 The bar gets raised even higher
🔄 Highest rank means lowest position
📖 Chief and slave now mean the same thing

## 👑 The Son Of Man Came Not To Be Ministered Unto, But To Minister

Jesus does not just teach this lesson, he lives it out first.

Most people expected the Messiah to be served, not to serve others.

He reverses that expectation completely through his own example.

👑 Jesus lives out his own teaching
😲 Most expected a Messiah who is served
🔄 He reverses that expectation completely
➡️ His example backs up his words

## 💰 To Give His Life A Ransom For Many

A ransom was the price paid to free a slave or a captive.

Jesus describes his own coming death using this exact picture.

His life becomes the price that buys freedom for many people.

💰 Ransom means a price paid to free someone
⛓️ Pictures freeing a slave or captive
❤️ His life pays that price
📖 His death buys freedom for many

# Matthew 20:29-34
# 👁️ Two Blind Men At Jericho
---
## 🏙️ As They Departed From Jericho

Jericho sat low in the Jordan Valley, one of the oldest cities in the world.

From Jericho, the road to Jerusalem climbed steadily uphill for miles.

Jesus is now on the final leg of his journey toward the cross.

🏙️ Jericho was an ancient, low lying city
⛰️ The road to Jerusalem climbed uphill
🚶 Jesus nears the final leg of his journey
➡️ The road leads straight to Jerusalem

## 🌊 A Great Multitude Followed Him

Large crowds still travel with Jesus even this close to his death.

His popularity has not faded even after hard teachings on sacrifice.

This crowd becomes the backdrop for the next miracle.

🌊 Crowds still travel with Jesus
📣 His popularity has not faded
🎬 This crowd sets the next scene
➡️ A miracle is about to happen

## 🛤️ Two Blind Men Sitting By The Way Side

Roadside begging was one of the only options open to blind men in this culture.

Sitting by a busy road gave them the best chance at receiving help.

Their location put them right in the path of the passing crowd.

🛤️ Roadside begging was a common option
🙏 They hoped travelers would show mercy
📍 Their spot put them near the crowd
➡️ Jesus is about to pass by

## 👑 Thou Son Of David

Son of David is a title that points straight to the promised king from David's family line.

These blind men call out something many sighted religious leaders refuse to say.

Their physical blindness has not stopped them from seeing who Jesus really is.

👑 Son of David points to the promised king
🙌 A bold, public messianic claim
👁️ Physical blindness, but spiritual sight
📖 They see what many leaders will not say

## 🤫 The Multitude Rebuked Them, Because They Should Hold Their Peace

The crowd tries to silence these two men, treating their cries as an annoyance.

Blind beggars held very little social value in this culture.

The crowd assumes Jesus has no time for men like these.

🤫 The crowd tries to silence them
📉 Beggars held little social value
🙄 The crowd assumes Jesus has no time
➡️ Their assumption is about to be proven wrong

## 📢 But They Cried The More

Instead of giving up, these two men cry out even louder.

Social pressure fails to silence their persistent, desperate plea.

Their persistence refuses to let the crowd decide their fate.

📢 They cry out even louder
🚫 Social pressure fails to silence them
💪 Persistence refuses to back down
➡️ Their cry finally reaches Jesus

## ❓ What Will Ye That I Shall Do Unto You

Jesus asks these two beggars almost the exact same question he asked James and John's mother.

That earlier request was about status and power.

This request will turn out to be about basic human need instead.

❓ The same question asked earlier in the chapter
👑 That request was about status and power
🙏 This request is about basic human need
📖 The contrast reveals two very different hearts

## 🎯 Lord, That Our Eyes May Be Opened

Their request is specific, simple, and completely honest.

They do not ask for wealth, status, or any special seat of honor.

They ask only for exactly what they actually need.

🎯 A specific, simple, honest request
🚫 No ask for wealth or status
🙏 They ask for exactly what they need
➡️ A simple request meets a willing Savior

## ❤️ Jesus Had Compassion On Them, And Touched Their Eyes

The word for compassion here describes a deep, gut level feeling, not a polite reaction.

Jesus does not just speak a word of healing from a distance.

He physically touches these men who society had pushed aside.

❤️ Compassion describes a deep, gut level feeling
🙌 Not just a polite reaction
✋ Jesus physically touches them himself
📖 He reaches out to the pushed aside

## ⚡ Immediately Their Eyes Received Sight, And They Followed Him

The healing happens at once, with no waiting and no process.

Their very first response to new sight is to follow Jesus.

That response stands in sharp contrast to the rich young man from chapter nineteen, who walked away instead.

⚡ Healing happens immediately, with no delay
👁️ Their first sight leads straight to Jesus
🔄 Contrasts with the rich young man's choice
📖 True sight leads to true following
`.trim();

export const MATTHEW_TWENTY_PERSONAL_SECTIONS = parseMatthewTwentyRawNotes(MATTHEW_TWENTY_RAW_NOTES);
