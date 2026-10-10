export type LukeFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeFifteenRawNotes(rawText: string): LukeFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 15:${startVerse}` : `Luke 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Luke 15 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_FIFTEEN_RAW_NOTES = `# Luke 15:1-3
# 🍽️ Sinners Gather, Pharisees Grumble
---
## 🧾 Drew Near Unto Him All The Publicans And Sinners

"Publicans" means Jewish men who collected taxes for Rome.

Most Jews saw them as traitors working for the occupying power.

"Sinners" here likely means people with open, well known bad reputations.

Religious leaders usually kept both groups at a careful distance.

These are the exact people now crowding in close to hear Jesus.

🧾 Publicans means Jewish tax collectors for Rome

🚫 Most Jews saw them as traitors

😔 Sinners means people with open bad reputations

📖 These people now crowd in close to Jesus

## 😠 This Man Receiveth Sinners, And Eateth With Them

Sharing a meal was treated as a public sign of friendship in this culture.

The Pharisees and scribes read Jesus eating with sinners as approving their sin.

"Murmured" means a grumbling complaint, not a direct public challenge.

That quiet complaint becomes the reason for the three stories Jesus tells next.

😠 Shared meals signaled real friendship

👀 Eating with sinners looked like approval

🗣️ Murmured means a grumbling complaint

📖 This complaint sparks three parables

## 📜 He Spake This Parable Unto Them

Jesus answers a grumbled complaint with a story instead of an argument.

"This parable" actually introduces three linked stories inside one chapter.

A lost sheep, a lost coin, and a lost son all make one point.

Each story defends the same behavior from a different angle.

📜 Jesus answers complaints with a story

🔗 One parable actually holds three stories

🐑 A sheep, a coin, and a son

📖 All three defend the same point

# Luke 15:4-7
# 🐑 The Lost Sheep
---
## 🔢 An Hundred Sheep

A hundred sheep was a solid, middle sized flock for this region.

Losing even one meant the shepherd knew the exact number missing.

Shepherds tracked their flocks closely, often knowing individual animals by sight.

This was not a vague guess about a general shortage.

🐑 A hundred sheep was a solid flock

🔢 The shepherd knew the exact count

👁️ Flocks were tracked closely, not guessed

📖 One missing sheep was noticed right away

## 🏜️ Leave The Ninety And Nine In The Wilderness

Shepherds in this region often worked together, not completely alone.

Leaving the flock likely meant leaving them with other shepherds nearby.

Going after one lost sheep still meant real time and real risk.

The shepherd treats one missing sheep as worth that risk anyway.

🏜️ Shepherds often worked in groups

🛡️ The flock likely stayed watched, not alone

⚠️ Chasing one sheep still meant real risk

📖 One sheep was still worth the risk

## 💪 He Layeth It On His Shoulders, Rejoicing

A sheep that wandered off was often too frightened or tired to walk.

Carrying it home meant the shepherd did the work, not the sheep.

"Rejoicing" describes genuine joy, not quiet relief or simple duty.

This reaction matches finding something precious, not just finishing a chore.

🐑 A lost sheep was often too scared

💪 The shepherd carries the full weight himself

🎉 Rejoicing means genuine joy, not relief

📖 This matches something precious being found

## ☁️ Joy Shall Be In Heaven Over One Sinner That Repenteth

Jesus moves from the shepherd's private joy to joy shared in heaven itself.

"Repenteth" means turning around, not just feeling sorry for a moment.

This joy is not for a sinner managing to behave slightly better alone.

It is joy over someone turning back toward God at all.

☁️ Jesus connects this joy to heaven

🔄 Repenteth means genuinely turning around

❌ This is not about simply behaving better

📖 Heaven celebrates someone turning to God

## ⚖️ More Than Over Ninety And Nine Just Persons, Which Need No Repentance

This line is not ranking sinners above people who already follow God.

Jesus is naming which moment actually produces visible celebration.

A flock that never wandered gives no story worth telling at supper.

A true return is what gets noticed and remembered.

⚖️ This does not rank sinners higher

🎉 It names which moment gets celebrated

🐑 A flock that never strayed tells no story

📖 A true return is what gets noticed

# Luke 15:8-10
# 🪙 The Lost Coin
---
## 🪙 Ten Pieces Of Silver

These coins were likely drachmas, each worth about a day's wage.

Some scholars think they were part of a woman's wedding headdress.

If so, losing one coin damaged something worn as a personal treasure.

Either way, ten coins represented real, carefully kept household wealth.

🪙 The coins were likely drachmas

👰 They may have decorated a wedding headdress

💰 Ten coins meant real household wealth

📖 Losing one meant losing something treasured

## 🕯️ Light A Candle, And Sweep The House

A one room house in this period often had small, high, shuttered windows.

Finding one small coin on a dirt floor meant very little light to search by.

Lighting a lamp and sweeping the floor was real, physical work.

This woman searches with the same effort the shepherd spent chasing his sheep.

🏠 Houses had small, dim windows

🕯️ A lamp was needed to search at all

🧹 Sweeping meant a real physical search

📖 Her effort matches the shepherd's effort

## 👼 Joy In The Presence Of The Angels Of God

This is the same celebration Jesus already described after the lost sheep.

"In the presence of the angels of God" names God's own joy reverently.

Jesus is careful here never to say the angels are the ones celebrating.

Two short parables in a row land on this exact point twice.

🔁 This repeats the lost sheep's ending

👼 It names God's own joy reverently

🙅 The angels are not named as rejoicing

📖 Two stories land on the same point

# Luke 15:11-13
# 👨‍👦 The Younger Son Leaves
---
## 👨‍👦 A Certain Man Had Two Sons

Jesus now shifts from animals and objects to an actual human family.

This third story matches the first two in shape, something lost and then found.

The father in the story stands in for God throughout what follows.

Two very different sons are about to picture being lost in two different ways.

👨‍👦 The third story centers on people

🔁 It matches the shape of the first two

👆 The father represents God throughout

📖 Two sons will picture being lost differently

## 💰 Give Me The Portion Of Goods That Falleth To Me

Jewish inheritance law let a father divide his property early, though it was unusual.

Asking for it while the father was still alive was a real insult.

It treated the father as already dead for practical, financial purposes.

This opening request alone would have shocked anyone actually listening to the story.

📜 Fathers could divide property early

😠 Asking early was a real insult

⚰️ It treated the father as already dead

📖 This line would have shocked listeners

## 💸 Wasted His Substance With Riotous Living

"Wasted" means he spent it carelessly, with nothing left to show for it.

"Riotous living" describes reckless partying, far from any responsible use of money.

The far country put real distance between him and anyone who knew his family.

Nobody there to watch his spending meant nothing was left to slow him down.

💸 Wasted means spent with nothing left

🎉 Riotous living means reckless partying

🌍 He traveled far from his family

📖 No one there could stop him

# Luke 15:14-16
# 🐷 Feeding The Swine
---
## 🌾 A Mighty Famine In That Land

His money ran out at the exact moment food became hardest to find.

A famine hit everyone in that country, not just him personally.

His own bad choices and this outside bad luck arrived together.

"He began to be in want" means real hunger, not mild inconvenience.

💰 His money ran out at the worst time

🌾 A famine hit the whole region

⏰ Bad choices and bad luck collided

📖 Want here means real hunger

## 🐷 He Sent Him Into His Fields To Feed Swine

Pigs were considered unclean animals under Jewish law and never raised by Jews.

A Jewish man feeding pigs for a Gentile employer was about as low as status could fall.

He now serves the exact kind of outsider his own people avoided.

This single detail tells a Jewish listener everything about how far he has fallen.

🐷 Pigs were unclean under Jewish law

📉 Feeding them was a huge loss of status

🤝 He now serves a Gentile employer

📖 This detail shows how far he fell

## 🌽 Fain Have Filled His Belly With The Husks

"Fain" is an old word meaning gladly or eagerly, under real pressure.

Husks were the tough pods eaten by pigs, not food fit for a person.

He has gone from refusing his father's house to envying pig food.

"No man gave unto him" means nobody even offered him real help.

🙏 Fain means eagerly, under pressure

🌽 Husks were pig food, not human food

📉 He now envies what pigs eat

📖 Nobody offered him any real help

# Luke 15:17-20
# 🏃 He Comes To Himself
---
## 💭 When He Came To Himself

"Came to himself" describes waking up from a kind of self deception.

He finally sees his situation clearly instead of making more excuses.

Clarity arrives only after every other option has already run out.

Hitting bottom becomes the exact moment real thinking finally starts.

💭 Came to himself means seeing clearly

🙈 He stops making more excuses

📉 Clarity arrived only after running out

📖 Hitting bottom started real thinking

## 🍞 How Many Hired Servants Of My Father's Have Bread Enough And To Spare

A hired servant held paid, low status work, well below being a son.

Even that lowest position still guaranteed steady food at his father's house.

He compares his current starving state to a servant's basic, guaranteed meal.

This is the first honest comparison he makes in the whole story.

👤 Hired servants ranked below sons

🍞 They still had guaranteed food

📊 He compares his hunger to their security

📖 This is his first honest comparison

## 💪 I Will Arise And Go To My Father

He does not just feel regret here. He makes an actual decision to move.

"Arise" signals action, not another round of feeling sorry for himself.

Going home meant risking rejection from the very father he had insulted.

The plan forms before he knows how it will actually be received.

💪 Arise signals action, not just feeling

🚶 He decides to actually go home

⚠️ Rejection was a real possible outcome

📖 He commits before knowing the outcome

## 🗣️ Make Me As One Of Thy Hired Servants

He rehearses a confession before he even reaches his father's house.

Calling himself unworthy to be a son is his own honest assessment.

Asking to become a servant shows he expects no special treatment.

He is not negotiating for restored status, only asking for a place at all.

🗣️ He rehearses his confession in advance

❌ He no longer claims the title son

🙇 He expects no special treatment

📖 He only asks for a place at all

## 🏃 His Father Saw Him, And Had Compassion, And Ran

"A great way off" means the father was already watching the road closely.

Older men in this culture rarely ran, since running in public looked undignified.

"Compassion" describes a gut level reaction, not a calm, measured decision.

The father reaches his son before a single word of confession is spoken.

👀 The father was already watching the road

🏃 Running in public was undignified for him

❤️ Compassion means a gut level reaction

📖 He runs before hearing any confession

## 🤗 Fell On His Neck, And Kissed Him

This embrace happens before the son finishes his rehearsed speech.

A kiss like this was a warm, public sign of full acceptance.

The father welcomes him back before hearing any explanation.

Grace here was not earned by the confession.

It simply arrived first.

🤗 The embrace comes before any speech

💋 A kiss here meant full acceptance

⏱️ Welcome arrives ahead of explanation

📖 Grace arrived first, not earned first

# Luke 15:21-24
# 🐄 The Father's Celebration
---
## 🗣️ I Have Sinned Against Heaven, And In Thy Sight

The son still delivers his rehearsed confession, word for word as planned.

He never gets to finish asking to become a hired servant.

The father interrupts the servant request before the son can even say it.

Confession still matters here, even though forgiveness had already been decided.

🗣️ He delivers the confession as planned

✋ The father cuts off the servant request

⏱️ Forgiveness came before the full speech

📖 Confession still mattered, even though decided

## 🧥 Bring Forth The Best Robe

The best robe in the house was reserved for the most honored guest.

Giving it to a son returning in rags reversed his situation at once.

This was not a hand me down.

It was the finest thing in the house.

The father restores dignity before a single chore gets assigned.

🧥 The best robe was for honored guests

🔄 It reversed his situation instantly

✨ It was the finest thing available

📖 Dignity was restored before any chore

## 💍 A Ring On His Hand, And Shoes On His Feet

A ring often carried a family seal used to sign documents and contracts.

Giving him a ring treated him as a full member of the family again.

Shoes marked a free man, since servants and slaves commonly went barefoot.

Both gifts quietly erase the servant request he came prepared to make.

💍 A ring could carry a family seal

👨‍👩‍👧 It restored full family membership

👟 Shoes marked a free man, not a servant

📖 Both gifts erase the servant request

## 🐄 Bring Hither The Fatted Calf

A fatted calf was raised and fed specifically for a future special occasion.

Killing it meant a feast large enough for the whole household and more.

This was not leftover food.

It was food saved on purpose for a day like this.

The size of the celebration matches the size of what was restored.

🐄 A fatted calf was raised for one occasion

🎉 Killing it fed the whole household

📦 It was food saved on purpose

📖 The feast matches what was restored

## 💀 This My Son Was Dead, And Is Alive Again

"Dead" here describes a relationship that seemed completely over, not a literal death.

"Lost, and is found" repeats the exact language used for the sheep and the coin.

All three stories now share the same two words at their ending.

The father states the meaning of the whole parable in his own words.

💀 Dead here means the relationship seemed over

🔁 Lost and found repeats the earlier stories

🔗 All three stories share the same ending

📖 The father names the parable's meaning

# Luke 15:25-28
# 😠 The Elder Son's Anger
---
## 🚜 His Elder Son Was In The Field

The elder son was out working while the celebration had already started inside.

He has stayed home the entire time his brother was away wasting money.

His steady, responsible presence is about to be set against real resentment.

Coming home from a long day's work, he finds a party already underway.

🚜 He was out working the whole time

🏠 He never left, unlike his brother

⚖️ His steady presence sets up a contrast

📖 He returns to find a party started

## 🎵 He Heard Musick And Dancing

"Musick" is simply an older spelling of music, nothing more unusual than that.

Hearing celebration before getting any explanation sets up real confusion.

He has to ask a servant what is actually going on.

Finding out secondhand, from a servant, adds its own small sting.

🎵 Musick is just an old spelling

❓ He hears celebration with no explanation

🗣️ He has to ask a servant

📖 Learning secondhand adds its own sting

## 🐄 Thy Father Hath Killed The Fatted Calf

The servant explains plainly that the younger son has safely come home.

"Safe and sound" means he returned physically whole, not harmed in any way.

The same fatted calf from the father's celebration gets named again here.

This news lands on the elder son very differently than it did on his father.

🗣️ The servant explains plainly what happened

✅ Safe and sound means fully unharmed

🐄 The same fatted calf is named again

📖 The same news lands very differently

## 😠 He Was Angry, And Would Not Go In

The elder son answers good news with real, open anger instead.

Refusing to go in was a public, visible protest at his own father's party.

His father has to come looking for him instead of the other way around.

A second son now stands outside a celebration, just in a different way.

😠 He responds with real, open anger

🚪 Staying outside was a public protest

🚶 His father comes looking for him

📖 A second son now stands outside

# Luke 15:29-32
# 👨‍👦 The Father's Reply
---
## 🗣️ Lo, These Many Years Do I Serve Thee

The elder son describes his years at home as service, not simply as sonship.

"Serve" is the same word used earlier for hired servant work.

Without realizing it, he describes himself the same way his brother once did.

His complaint reveals he has felt more like staff than family.

🗣️ He calls his years at home service

👤 Serve echoes the hired servant line

🪞 He describes himself like his brother did

📖 He has felt more like staff

## 🐐 Thou Never Gavest Me A Kid

A young goat was a modest animal, far smaller than a fatted calf.

He is not even asking for an equal celebration, only a small one.

His real complaint is about fairness, not the size of any party.

Years of quiet obedience suddenly feel unnoticed and unrewarded to him.

🐐 A kid was a modest animal

⚖️ He wanted fairness, not a big party

😔 His obedience felt unnoticed to him

📖 Quiet faithfulness suddenly felt unrewarded

## 😡 Devoured Thy Living With Harlots

The elder son adds a detail about harlots the story never actually stated.

He assumes the worst version of what "riotous living" must have meant.

His anger fills in details the text leaves deliberately unclear.

This guess says as much about his own bitterness as about his brother.

🗣️ He adds a detail the story never gave

😡 He assumes the worst meaning

❓ The text never actually says this

📖 His guess reveals his own bitterness

## 👨‍👦 Son, Thou Art Ever With Me, And All That I Have Is Thine

The father answers anger gently, still calling him son, not servant.

"Ever with me" reminds him that constant nearness was never actually in danger.

"All that I have is thine" means his inheritance was never at risk either.

He never actually lost anything by his brother's return.

He only felt like he had.

👨‍👦 The father still calls him son

🏠 Nearness to the father was never at risk

💰 His inheritance was never at risk

📖 He never actually lost anything

## 🔁 This Thy Brother Was Dead, And Is Alive Again

The father repeats the exact words he used earlier about his own reunion.

Calling the younger son "thy brother" invites the elder son back into celebrating.

The chapter never actually says whether the elder son goes inside.

Jesus leaves the Pharisees to make that same choice themselves.

🔁 The father repeats his earlier words

👨‍👦 Thy brother invites him into the celebration

❓ The ending is left deliberately open

📖 Jesus leaves that same choice to us
`.trim();

export const LUKE_FIFTEEN_PERSONAL_SECTIONS = parseLukeFifteenRawNotes(LUKE_FIFTEEN_RAW_NOTES);
