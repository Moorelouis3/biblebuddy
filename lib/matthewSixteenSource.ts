export type MatthewSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewSixteenRawNotes(rawText: string): MatthewSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 16:${startVerse}` : `Matthew 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Matthew 16 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_SIXTEEN_RAW_NOTES = `# Matthew 16:1-4
# 🌦️ A Sign From Heaven
---
## 🤝 Pharisees Also With The Sadducees Came

The Pharisees and the Sadducees almost never worked together.

Pharisees cared deeply about tradition and the coming resurrection.

Sadducees rejected both, and the two groups usually argued bitterly.

Here they set their differences aside for one shared goal.

🤝 Two rival groups joined forces

⚖️ Pharisees and Sadducees usually disagreed

🎯 Stopping Jesus united them instead

📖 Even enemies can share one target

## 🧪 Tempting Desired Him That He Would Shew Them A Sign From Heaven

"Tempting" here means testing him with a hostile motive.

They were not sincerely curious about who Jesus was.

"Shew" is simply the old spelling of show.

A sign from heaven meant something only God could do.

They had already watched Jesus heal and feed thousands.

Yet they still demanded a bigger, more dramatic proof.

🧪 Tempting means hostile testing

📜 Shew is an old spelling of show

☁️ A sign from heaven meant a divine act

📖 They ignored proof they had already seen

## 🌅 It Will Be Fair Weather For The Sky Is Red

Jesus answers their demand with something they already understood.

People in this region read the evening sky to predict the next day.

A red sky at evening meant calm weather was coming.

"Lowring" is an old word for a sky that looks dark and threatening.

A red, lowring sky at morning warned of a storm instead.

Reading the sky was treated as ordinary, everyday wisdom.

🌅 Evening red sky meant calm weather

🌧️ Morning red sky warned of storms

👀 This was common, everyday wisdom

📖 Jesus starts with what they already know

## 🔍 Can Ye Not Discern The Signs Of The Times

"Discern" means to notice and correctly read something.

These leaders could read clouds without any trouble at all.

Yet they could not recognize what God was doing right in front of them.

Jesus calls this exact failure hypocrisy in the same breath.

🔍 Discern means to correctly read

☁️ They read clouds with ease

🙈 They missed what God was doing

📖 Reading skies is easier than reading hearts

## 💔 A Wicked And Adulterous Generation Seeketh After A Sign

"Adulterous" here is not about marriage at all.

It pictures a people who were unfaithful to their covenant with God.

Israel was often compared to a bride committed to the Lord alone.

Demanding a flashy new sign after everything God had already shown them exposed that unfaithfulness.

💔 Adulterous means covenant unfaithfulness

💍 Israel is pictured as God's bride

🙄 They wanted novelty, not truth

📖 Unfaithfulness hides behind the demand for proof

## 🐋 No Sign Be Given Unto It, But The Sign Of The Prophet Jonas

Jesus already gave this exact answer once before, back in chapter twelve.

Jonah spent three days inside the great fish before coming out alive.

Jesus points ahead to his own three days before rising from the grave.

Then he simply turns and walks away from the whole conversation.

🐋 Jonah spent three days inside a fish

⏳ Jesus points to his own three days

🚶 He ends the conversation and leaves

📖 The resurrection is the only sign he offers

# Matthew 16:5-12
# 🍞 Beware The Leaven
---
## ⛵ When His Disciples Were Come To The Other Side, They Had Forgotten To Take Bread

The disciples just crossed the sea of Galilee by boat again.

Somewhere in the rush, nobody remembered to pack any food.

This small, ordinary detail is about to set up a bigger lesson.

Jesus is not actually worried about the missing bread at all.

⛵ They crossed the sea again

🍞 Nobody packed any food

🎯 A small detail sets up a lesson

📖 The real point is not about bread

## 🍞 Take Heed And Beware Of The Leaven Of The Pharisees And Of The Sadducees

Leaven is a small amount of yeast that spreads through a whole batch of dough.

A tiny bit works through the entire loaf until all of it rises.

Jesus uses leaven as a picture for an idea that quietly spreads and changes everything.

He is warning about a way of thinking, not an actual food.

🍞 Leaven spreads through a whole batch

📈 A small amount changes everything

🧠 It pictures an idea, not food

📖 Jesus warns about spreading wrong thinking

## 🤔 They Reasoned Among Themselves, Saying, It Is Because We Have Taken No Bread

The disciples completely miss what Jesus actually meant.

They assume he is upset about the forgotten food.

Taking a figure of speech literally is an easy mistake to make.

Their worry stays stuck on a problem Jesus was not even raising.

🤔 Disciples take him too literally

🍞 They think he means real bread

😅 A simple mistake, easy to make

📖 They worry about the wrong problem

## 😟 O Ye Of Little Faith

Jesus gently calls out their lack of trust here.

This is not the first time he has used this exact phrase with them.

It usually comes right after they forget something he has already proven.

He already fed thousands with almost nothing in their hands twice.

😟 Little faith means weak trust

🔁 Jesus has said this before

🍞 He already proved his power twice

📖 Forgetting proof weakens trust

## 🍞 Do Ye Not Yet Understand, Neither Remember The Five Loaves Of The Five Thousand

Jesus points them back to a miracle they personally watched happen.

Five loaves fed a crowd of five thousand men with baskets left over.

That event is told back in chapter fourteen of this same book.

If Jesus could stretch five loaves that far, bread was never the real worry.

🍞 Five loaves fed five thousand

🧺 Baskets of food were left over

📜 This happened in chapter fourteen

📖 Bread was never the real worry

## 🍞 Neither The Seven Loaves Of The Four Thousand

This points back to a second feeding miracle, told in chapter fifteen.

Seven loaves fed four thousand people, with baskets left over again.

Two different miracles, with two different sets of numbers, both prove the same thing.

Jesus has more than enough power to provide for every physical need.

🍞 Seven loaves fed four thousand

🔁 A second, separate feeding miracle

🔢 Different numbers, same kind of proof

📖 Jesus provides more than enough

## 🗣️ How Is It That Ye Do Not Understand That I Spake It Not To You Concerning Bread

Jesus makes his meaning completely plain now.

He never meant to warn them about running out of food.

The warning was always about a dangerous way of thinking.

Confusion about bread kept them from hearing the actual lesson.

🗣️ Jesus explains himself plainly

🍞 Bread was never the subject

🧠 The real warning was about thinking

📖 Confusion blocked the real lesson

## 📚 Then Understood They How That He Bade Them Not Beware Of The Leaven Of Bread, But Of The Doctrine Of The Pharisees And Of The Sadducees

"Doctrine" means a teaching that people treat as true and authoritative.

The disciples finally connect the picture of leaven to actual ideas.

The Pharisees and Sadducees disagreed on plenty.

Both groups still taught things that led people away from Jesus.

That wrong teaching was the real danger Jesus wanted them to notice.

📚 Doctrine means an authoritative teaching

💡 The disciples finally understand

⚠️ Wrong teaching was the real danger

📖 Leaven pictured ideas, not food

# Matthew 16:13-20
# 🔑 Peter's Confession And The Keys
---
## 🗺️ When Jesus Came Into The Coasts Of Caesarea Philippi

Caesarea Philippi sat far north, near the base of Mount Hermon.

This city was not Jewish territory at all.

It was filled with temples built for Roman and Greek gods.

Jesus chooses this unlikely, pagan setting to ask his most important question yet.

🗺️ Caesarea Philippi sat in the far north

⛰️ It sat near Mount Hermon

🏛️ Pagan temples filled this city

📖 Jesus asks his biggest question here

## 👤 He Asked His Disciples, Saying, Whom Do Men Say That I The Son Of Man Am

"Son of man" was a title Jesus used for himself often.

It comes from an old prophecy in the book of Daniel.

That prophecy pointed to someone given real authority by God himself.

Jesus starts by asking what the crowds are already saying about him.

This sets up the far more personal question still to come.

👤 Son of man is a title from Daniel

💬 Jesus asks about public opinion first

🎯 A harder question is still coming

📖 He starts with what others think

## 🤔 Some Say That Thou Art John The Baptist, Some Elias, And Others Jeremias, Or One Of The Prophets

These were the leading guesses people had about who Jesus really was.

Some thought Herod's fear had come true, that John the Baptist had somehow returned.

"Elias" is simply the Greek form of the name Elijah.

Many Jews expected Elijah himself to return before the Messiah finally came.

"Jeremias" is the Greek form of Jeremiah, another major prophet.

Every guess treated Jesus as important.

Still, none of them got close enough.

🤔 These were the popular guesses

👤 Elias is the Greek form of Elijah

📜 Jeremias is the Greek form of Jeremiah

📖 Even the best guesses fell short

## 🎯 But Whom Say Ye That I Am

Jesus turns the question from public opinion straight to the disciples themselves.

"Ye" is simply an old word for the plural you.

This question cannot be answered by repeating someone else's opinion.

Every person who follows Jesus eventually has to answer this question personally.

🎯 Jesus makes it personal now

🗣️ Ye is an old plural you

🙋 Borrowed opinions will not work here

📖 Everyone must answer this personally

## 👑 Thou Art The Christ, The Son Of The Living God

Peter gives two huge titles in a single short sentence.

"Christ" is the Greek word for Messiah, God's long promised anointed king.

"Son of the living God" claims something even bigger than that.

Peter is saying Jesus is not just a king, but God's own Son.

This is the clearest confession of who Jesus is found so far in this book.

👑 Christ means God's anointed king

✨ Son of God claims divine identity

💬 Peter names both titles together

📖 This is the clearest confession yet

## 👤 Blessed Art Thou, Simon Barjona

Jesus calls Peter by his full, formal name here.

"Barjona" combines the word for son with the name Jonah or John.

It likely means son of Jonah, naming Peter's own father.

Jesus pauses to bless Peter personally before explaining anything else.

👤 Barjona means son of Jonah

🙏 Jesus blesses Peter by name

👨 This names Peter's own father

📖 Blessing comes before explanation

## 🧠 Flesh And Blood Hath Not Revealed It Unto Thee, But My Father Which Is In Heaven

"Flesh and blood" is an old way of saying human effort or reasoning.

Peter did not figure this out through cleverness or guesswork.

God himself placed this understanding directly into Peter's heart.

The truest things about Jesus are never discovered by human thinking alone.

🧠 Flesh and blood means human reasoning

🙅 Peter did not figure this out himself

🙏 God revealed it to him directly

📖 Truth about Jesus comes from God

## 🗿 Thou Art Peter, And Upon This Rock I Will Build My Church

Peter's name comes from the Greek word for rock.

Jesus makes a deliberate play on words right here.

"Church" means the gathered community of people who belong to Jesus.

Scholars disagree on whether the rock is Peter himself or Peter's confession of faith.

Either way, Jesus announces something brand new.

It starts right here, in this conversation.

🗿 Peter's name means rock

🔑 Jesus makes a clear wordplay

⛪ Church means his gathered people

📖 Jesus announces something brand new

## 🚪 The Gates Of Hell Shall Not Prevail Against It

"Gates of hell" was a common picture for the power of death itself.

Ancient cities were defended by walls and gates meant to keep enemies out.

Here the picture flips.

Death itself cannot keep Jesus's church locked out or destroyed.

This is a promise about survival, not a comment about an actual building.

🚪 Gates of hell pictures death's power

🏰 Gates usually kept enemies out

💪 Death cannot destroy this church

📖 This promises survival, not geography

## 🔑 I Will Give Unto Thee The Keys Of The Kingdom Of Heaven

Keys represent real authority, not just physical access to a locked door.

In this culture, handing someone keys meant putting them in charge of a household.

Jesus hands Peter genuine authority inside this new community he is building.

This authority was never about controlling who gets into heaven personally.

🔑 Keys pictured real authority

🏠 Handing over keys meant real responsibility

🙌 Peter receives genuine authority

📖 This is not personal control over heaven

## ⚖️ Whatsoever Thou Shalt Bind On Earth Shall Be Bound In Heaven

"Bind" and "loose" were common rabbinic terms in Jesus's day.

They described the authority to declare what was forbidden or allowed.

Jewish teachers already used this exact language to describe their own authority.

Jesus gives Peter that same kind of authoritative, teaching role.

⚖️ Bind and loose meant forbid and allow

📚 Rabbis already used this language

🎓 Jesus hands Peter a teaching role

📖 Heaven backs this authority

## 🤐 Then Charged He His Disciples That They Should Tell No Man That He Was Jesus The Christ

Jesus orders immediate silence right after this huge announcement.

The timing was not yet right for this truth to spread publicly.

Many people already misunderstood what kind of king the Messiah would be.

Premature news could easily trigger a political uprising Jesus never intended.

🤐 Jesus demands immediate silence

⏳ The timing was not right yet

😬 People misunderstood what Messiah meant

📖 Early news risked a political uprising

# Matthew 16:21-23
# ⛓️ Get Thee Behind Me, Satan
---
## 🔄 From That Time Forth Began Jesus To Shew Unto His Disciples

This marks a clear turning point in the whole book of Matthew.

Jesus has spent most of his ministry so far teaching and healing.

Now the subject shifts toward his coming suffering and death.

Peter's confession in the verses just before this made the timing right.

🔄 This marks a clear turning point

📚 Teaching and healing filled the ministry so far

☁️ The subject now shifts toward suffering

📖 Peter's confession made the timing right

## 🏙️ How That He Must Go Unto Jerusalem, And Suffer Many Things Of The Elders And Chief Priests And Scribes

Jesus names Jerusalem specifically as the place where this will happen.

The elders, chief priests, and scribes together formed the religious ruling council.

Jesus predicts his own suffering will come from his own nation's leaders.

"Must" shows this was never an accident, but part of God's plan.

🏙️ Jerusalem is named specifically

⚖️ Religious leaders formed a ruling council

💔 His own leaders would cause this

📖 Must shows this was planned, not accidental

## 💀 Be Killed, And Be Raised Again The Third Day

Jesus states his coming death in the plainest possible words.

He does not soften or hide what is about to happen to him.

In the very same sentence, he also promises he will rise again.

The resurrection was never an afterthought.

Jesus names it here, long before it happens.

💀 Jesus states his death plainly

⏳ The third day is named specifically

✨ Resurrection is promised in the same breath

📖 This was never an afterthought

## 🤚 Then Peter Took Him, And Began To Rebuke Him

Peter actually pulls Jesus aside to correct him.

Moments earlier, Peter had just confessed Jesus as the Christ.

Now that same disciple tries to talk Jesus out of the cross.

Strong faith in one moment does not guarantee clear understanding in the next.

🤚 Peter pulls Jesus aside

💬 He tries to correct Jesus directly

😳 This follows his own huge confession

📖 Faith and understanding do not always match

## ❤️ Be It Far From Thee, Lord, This Shall Not Be Unto Thee

Peter means well, trying to protect someone he loves.

His words still work directly against God's actual plan.

Good intentions can still lead someone to resist what God is doing.

Love for Jesus is not the same as understanding his mission.

❤️ Peter speaks out of love

🚫 He still opposes God's plan

⚠️ Good intentions can resist God's will

📖 Love is not the same as understanding

## ⚡ Get Thee Behind Me, Satan

Jesus responds with the strongest possible rebuke.

He calls Peter "Satan," the same title used for the devil himself.

Peter was not possessed by a demon.

He was voicing the same temptation Satan once offered Jesus in the wilderness.

Avoiding the cross was the real temptation underneath this whole conversation.

⚡ Jesus gives his strongest rebuke

👿 Satan names the same wilderness temptation

🙅 Peter was not possessed, just mistaken

📖 Avoiding the cross was the real temptation

## 🧠 Thou Savourest Not The Things That Be Of God, But Those That Be Of Men

"Savourest" is an old word meaning to care about or value something.

Peter was thinking the way most people naturally think, focused on comfort and safety.

God's plan often looks completely backward from that normal human point of view.

Jesus names the real problem, not Peter's loyalty, but his perspective.

🧠 Savourest means to value or care about

🛋️ Peter valued comfort and safety

🔄 God's plan looks backward to humans

📖 The problem was perspective, not loyalty

# Matthew 16:24-28
# ✝️ Take Up The Cross
---
## ✝️ If Any Man Will Come After Me, Let Him Deny Himself, And Take Up His Cross, And Follow Me

Carrying a literal cross meant walking toward your own execution.

Everyone listening had likely seen a condemned criminal forced to carry one.

"Deny himself" does not mean giving up small comforts here and there.

It means giving up the right to run your own life.

Following Jesus was never framed as a safe or easy decision.

✝️ A cross meant walking toward execution

👀 The crowd had seen this before

🙅 Deny himself means giving up control

📖 Following Jesus was never framed as easy

## 🧩 For Whosoever Will Save His Life Shall Lose It

This sounds like a riddle at first hearing.

Clinging tightly to comfort and safety in this life carries a cost.

Avoiding risk for Jesus's sake can quietly cost someone everything that truly matters.

Playing it safe is not actually the safe choice it appears to be.

🧩 This sounds like a riddle

🛟 Clinging to safety still carries a cost

⚠️ Playing it safe is not really safe

📖 Avoiding risk can cost everything

## 🔑 Whosoever Will Lose His Life For My Sake Shall Find It

"For my sake" is the key phrase that changes everything here.

This is not a general command to seek out suffering for no reason.

Giving up comfort and safety specifically for Jesus leads to real life instead.

The loss Jesus describes always has a clear direction and purpose.

🔑 For my sake is the key phrase

🚫 Not suffering for no reason

🌱 Giving up for Jesus leads to life

📖 This loss always has a purpose

## 🌍 What Is A Man Profited, If He Shall Gain The Whole World, And Lose His Own Soul

Jesus asks his listeners to imagine total, worldwide success.

Every possible gain this world offers is placed on one side.

A person's own soul is placed on the other side alone.

No amount of wealth, power, or fame could ever balance that trade.

🌍 The whole world sits on one side

💭 The soul sits on the other

⚖️ No worldly gain can balance that scale

📖 The soul outweighs the entire world

## 💱 What Shall A Man Give In Exchange For His Soul

Jesus follows his own question with an even sharper one.

"Exchange" pictures trying to buy something back after selling it away.

There is no possible price that could ever buy a soul back.

This question is left completely unanswered on purpose.

💱 Exchange means buying something back

💰 No price can buy back a soul

❓ The question is left unanswered

📖 Some losses cannot be undone

## ☁️ For The Son Of Man Shall Come In The Glory Of His Father With His Angels

Jesus suddenly shifts from his coming suffering to his future glory.

Right now he walks toward rejection and an execution.

One day he will return surrounded by angels and radiant with divine glory.

The cross and the crown were never two separate stories.

☁️ Jesus shifts from suffering to glory

👑 He will return with angels

✨ Divine glory will surround him then

📖 The cross and the crown connect

## ⚖️ Then He Shall Reward Every Man According To His Works

This moment of return comes with real, personal accountability.

"Works" here points to how someone actually lived, not what they claimed to believe.

Every person will eventually answer for their own actual choices.

This is a sober warning, not a threat meant to create fear.

⚖️ Return brings real accountability

🛠️ Works means how someone actually lived

👤 Everyone answers for their own choices

📖 This warns soberly, without creating fear

## ❓ There Be Some Standing Here, Which Shall Not Taste Of Death, Till They See The Son Of Man Coming In His Kingdom

This verse has puzzled readers for a very long time.

Jesus clearly does not mean every disciple standing there would live forever.

Many readers connect this promise to the transfiguration, told just one chapter later.

There, three disciples personally witness Jesus revealed in dazzling, kingdom level glory.

The text does not force one certain answer.

Honest teaching says so plainly.

❓ This verse has puzzled readers for ages

⏳ Not everyone there would live forever

⛰️ Many connect this to the transfiguration

📖 Scripture does not force one certain answer
`.trim();

export const MATTHEW_SIXTEEN_PERSONAL_SECTIONS = parseMatthewSixteenRawNotes(MATTHEW_SIXTEEN_RAW_NOTES);
