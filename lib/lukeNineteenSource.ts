export type LukeNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeNineteenRawNotes(rawText: string): LukeNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 19:${startVerse}` : `Luke 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Luke 19 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_NINETEEN_RAW_NOTES = `# Luke 19:1-4
# 🌳 Zacchaeus Climbs The Sycomore Tree
---
## 💰 The Chief Among The Publicans

"Publican" means a tax collector who worked for the Roman government.

A chief publican oversaw a whole district of tax collectors underneath him.

That position made Zacchaeus very wealthy and very hated.

Tax collectors regularly overcharged their own people and kept the difference.

Luke mentions his wealth and his job in the very same breath on purpose.

💰 Publican means a Roman tax collector

👑 Chief means he ran a whole district

😠 The job made him rich and hated

📖 Luke names his wealth and his job together

## 📏 Little Of Stature

"Stature" means physical height.

Zacchaeus was a short man.

His short height is not an insult or a joke in the text.

It explains the very next action he takes.

A short man could not see over a crowd pressing in on every side.

📏 Stature means physical height

🧍 Zacchaeus was a short man

👀 Short height blocked his view

➡️ His height explains what he does next

## 👥 Could Not For The Press

"Press" here means a crowd pressed tightly together.

Zacchaeus could not see past all the people crowding around Jesus.

Being short made the problem even worse for him.

A man in his position was used to people making way for him.

Here the crowd simply would not move.

👥 Press means a tightly packed crowd

🧍 Zacchaeus could not see over it

😤 He was used to people stepping aside

📖 This crowd would not move for him

## 🌳 Climbed Up Into A Sycomore Tree

A sycomore tree in this region had low, wide branches that were easy to climb.

It was common along roadsides and grew large enough to see over a crowd.

A wealthy, respected man climbing a tree in public was not normal behavior.

Zacchaeus does not care how this looks to anyone watching.

He only cares about seeing Jesus.

🌳 A sycomore had low, easy branches

🛣️ It grew along roads like this one

😳 Climbing it in public looked undignified

📖 Zacchaeus did not care how it looked

## 🏃 He Ran Before

Running in public was considered beneath a man of status in this culture.

A wealthy official was expected to walk slowly and let others come to him.

Zacchaeus runs ahead of the crowd instead, with no concern for appearances.

His urgency says more about his heart than any of his wealth does.

Status never stops him once he decides he wants to see Jesus.

🏃 Running in public looked undignified then

👑 Wealthy men were expected to walk slowly

❤️ His urgency reveals what he wants

📖 Status could not stop him this time

# Luke 19:5-10
# 🏠 This Day Is Salvation Come To This House
---
## 👁️ Zacchaeus, Make Haste, And Come Down

Jesus speaks Zacchaeus by name before anyone introduces them.

Nothing in the story explains how Jesus already knows who he is.

Jesus sees him first, before Zacchaeus even finishes seeing Jesus.

That order matters more than it looks like at first.

Jesus is the one who initiates every single time.

👁️ Jesus already knows his name

🔄 Jesus sees him before he is seen

🙌 Jesus always moves first

📖 This meeting was never an accident

## 🍽️ They All Murmured, Saying, That He Was Gone To Be Guest With A Man That Is A Sinner

Eating as a guest in someone's house was a public act of acceptance.

Sharing a table in this culture meant approving of the host.

The crowd assumes Jesus is endorsing a man everyone considers corrupt.

Their complaint is really about who Jesus is willing to sit with.

Jesus chooses the house everyone else avoided.

🍽️ Sharing a table meant approving the host

😠 The crowd objects to this choice

🤔 Their real question is who Jesus accepts

📖 Jesus chooses the house others avoided

## 💰 The Half Of My Goods I Give To The Poor

Zacchaeus offers this without being asked for anything.

No one demanded repentance or repayment from him first.

His wealth was the whole foundation of his old life.

He gives half of it away in a single moment.

This is the opposite of the rich ruler from the chapter before.

💰 He offers this without being asked

🏗️ Wealth was the base of his old life

✅ He gives up half of it instantly

📖 He is the opposite of the rich ruler

## 📜 I Restore Him Fourfold

Jewish law normally required repaying a theft plus a fifth extra.

Roman law for certain thefts required paying back four times the amount.

Zacchaeus chooses the harsher standard against his own interest.

He is not calculating the minimum he can get away with.

His repentance shows up in math, not just in words.

📜 Jewish law required repayment plus a fifth

⚖️ Roman law required four times the amount

💸 Zacchaeus chooses the harsher standard himself

📖 His repentance shows up in the numbers

## 🏠 This Day Is Salvation Come To This House

"House" here means Zacchaeus and his whole household, not just the building.

Jesus does not say salvation is coming someday in the future.

He says it has already arrived, today, inside this specific home.

The change in Zacchaeus's actions is the evidence, not the cause.

Salvation reached him before he finished proving anything.

🏠 House means his whole household

⏰ Salvation comes today, not someday

✅ His changed actions are the evidence

📖 Salvation reached him before he proved anything

## 🏷️ The Son Of Man Is Come To Seek And To Save That Which Was Lost

"Son of man" is the title Jesus most often used for Himself.

"Seek" means Jesus goes looking, rather than waiting to be found.

Zacchaeus climbed a tree to see Jesus, but Jesus came looking for him first.

This sentence names the mission behind the entire story.

It also names the mission behind the whole Gospel of Luke.

🏷️ Son of man is Jesus's chosen title

🔎 Seek means Jesus goes looking first

🌳 Zacchaeus climbed, but Jesus came first

📖 This sentence names Luke's whole mission

# Luke 19:11-15
# 👑 A Certain Nobleman Went Into A Far Country
---
## ⏳ They Thought That The Kingdom Of God Should Immediately Appear

The crowd near Jerusalem expects God's kingdom to arrive right away.

They picture an immediate political takeover, not a long process.

Jesus tells this parable specifically to correct that expectation.

The kingdom will come, but not on the timeline they imagine.

This sets up everything that follows in the parable.

⏳ The crowd expected the kingdom immediately

🏛️ They pictured instant political change

🛑 Jesus corrects that expectation here

📖 The parable answers their wrong timeline

## 🏛️ A Certain Nobleman Went Into A Far Country To Receive For Himself A Kingdom

Local rulers in this region sometimes had to travel to Rome for approval.

The emperor alone could confirm or deny someone's right to rule.

A ruler's own people could petition Rome against him.

They could even do this during his absence.

This detail was not invented for the parable.

It mirrors events that had actually happened near Jesus's own lifetime.

🏛️ Rulers traveled to Rome for approval

👑 Only the emperor could confirm a king

📨 People could petition against him there

📖 This detail reflects real history

## 💰 He Called His Ten Servants, And Delivered Them Ten Pounds

A "pound" here refers to a mina, a set amount of silver money.

One mina was worth about three months of an ordinary worker's wages.

It was a real sum, but not a fortune by itself.

Each servant receives the exact same starting amount.

What they do with it is left entirely up to them.

💰 A pound means a sum called a mina

📅 It equaled about three months of wages

⚖️ Every servant starts with the same amount

📖 What happens next is up to them

## 💼 Occupy Till I Come

"Occupy" here is an old word meaning to put money to work.

It does not mean to simply occupy a place or sit still.

The master expects the money to be used, not just stored.

Trading, investing, or lending were all valid ways to obey this command.

Doing nothing with it was never one of the options given.

💼 Occupy means put the money to use

🚫 It does not mean stay still

📈 Trading or lending both counted as obeying

📖 Doing nothing was never an option

## 👥 We Will Not Have This Man To Reign Over Us

"His citizens" refers to the people under the nobleman's authority back home.

They send word ahead that they reject his right to rule them.

This rejection happens while he is still away seeking the throne.

The parable mirrors the religious leaders already plotting against Jesus.

Jerusalem itself is only days away from saying the very same thing.

👥 Citizens means the people under his rule

📨 They reject him before he returns

🔁 This mirrors leaders plotting against Jesus

📖 Jerusalem is close to saying this too

## 📊 That He Might Know How Much Every Man Had Gained By Trading

The nobleman returns and immediately calls for an accounting.

Every servant must answer for what he did with his pound.

Nothing about the wait or the distance changes this expectation.

The settling always comes, even after a long delay.

Faithfulness is measured by what was done, not by excuses later.

📊 The master demands a full accounting

⏳ Distance and delay do not cancel it

✅ Faithfulness is measured by actions taken

📖 The settling always comes eventually

# Luke 19:16-19
# 💰 Thou Hast Been Faithful In A Very Little
---
## 📈 Thy Pound Hath Gained Ten Pounds

The first servant reports a tenfold return on the original amount.

He speaks plainly, with no boasting in his report.

The gain belongs to the master, even though the servant did the work.

His success came through faithful effort, not through luck.

The master's first question will not be about the amount at all.

📈 The servant reports a tenfold return

🗣️ He reports it without boasting

💼 His effort produced the gain

📖 Amount is not the master's first concern

## 🙌 Thou Hast Been Faithful In A Very Little

The master praises faithfulness before he ever mentions the profit.

"A very little" describes the modest size of the original pound.

Small assignments are treated as a real and genuine test.

Passing a small test is what opens the door to something larger.

The size of the task never excuses carelessness with it.

🙌 Faithfulness is praised before profit

🔍 A very little describes the small pound

🚪 Small tests open the door to larger ones

📖 Size never excuses carelessness

## 🏙️ Have Thou Authority Over Ten Cities

This reward is not simply a bigger paycheck for good work.

Authority over ten cities is real governing responsibility.

The reward is far larger than the original pound by any measure.

This is not wages for labor performed.

It is trust given because trust was already proven.

🏙️ Authority over cities means real responsibility

📏 The reward dwarfs the original pound

🚫 This is not simple payment for labor

📖 Trust is given because trust was proven

## 📉 Be Thou Also Over Five Cities

The second servant gained five pounds instead of ten.

His reward is smaller, but the pattern stays exactly the same.

Faithfulness is rewarded in proportion to what was actually done.

Neither servant is compared against the other servant directly.

Each one is measured only against what he was given to start.

📉 Five pounds brought a smaller reward

🔁 The same pattern still applies here

⚖️ Reward is proportional to what was done

📖 Each servant is measured on his own

# Luke 19:20-27
# 🧻 I Have Kept Laid Up In A Napkin
---
## 🧻 Kept Laid Up In A Napkin

A "napkin" here means a small cloth normally used for covering food.

The third servant wraps the money in cloth and buries it away.

He takes no risk and makes no effort with what he was given.

The other two servants put their pounds to active use.

This servant simply hides his and waits.

🧻 A napkin means a small cloth

💰 He wraps the money and hides it

🚫 He takes no risk at all

📖 The others acted while he waited

## 😠 Thou Art An Austere Man

"Austere" means harsh, strict, and difficult to please.

The servant claims fear of the master as his excuse for doing nothing.

His own words describe someone he was too afraid to even try for.

Real fear of a harsh master should have produced more effort, not less.

His excuse actually exposes laziness dressed up as fear.

😠 Austere means harsh and strict

😨 He claims fear as his excuse

🤔 Real fear should have produced effort

📖 His excuse was laziness, not fear

## 🗣️ Out Of Thine Own Mouth Will I Judge Thee

The master does not need any other witness against this servant.

He simply repeats the servant's own description of him back to him.

If the master really were that harsh, hiding the money made no sense.

Fear of punishment should have pushed him toward more effort, not less.

His own excuse becomes the very evidence that convicts him.

🗣️ The master uses his own words

🔄 Fear should have produced more effort

⚖️ His excuse becomes the evidence

📖 He is judged by his own mouth

## 🏦 Gavest Not Thou My Money Into The Bank

"Usury" means interest earned on money that is loaned out.

Putting money in a bank was the safest, laziest possible option available.

It required no skill, no risk, and almost no effort at all.

Even this minimal step would have produced some small return.

The servant did not even manage the easiest option on the table.

🏦 A bank deposit was the safest option

💤 It required almost no effort

📈 Usury means interest earned on a loan

📖 Even the easiest option was skipped

## 👥 Lord, He Hath Ten Pounds

The bystanders are the ones who speak up in this verse, not the master.

They sound surprised that the first servant already has so much.

Their comment makes the reward public and visible to everyone watching.

Faithfulness in this story does not stay hidden for long.

What was done quietly with a small pound becomes known to all.

👥 Bystanders speak up, not the master

😲 They sound surprised at his success

👀 The reward becomes public and visible

📖 Faithfulness does not stay hidden

## 🔁 Even That He Hath Shall Be Taken Away From Him

This line states a principle that runs through the whole parable.

Using what is given opens the door to even more being given.

Refusing to use it results in losing even what was first given.

This is not about how much a person starts with.

It is about what a person actually does with it.

🔁 Using what is given brings more

📉 Refusing it loses what was given

⚖️ Starting amount is not the real issue

📖 The real issue is what you do

## 👥 Bring Hither, And Slay Them Before Me

"Those mine enemies" points back to the citizens from the start of the parable.

They are the ones who rejected the nobleman's right to reign over them.

Their rejection is answered once he actually receives his kingdom.

The parable is quietly describing Jesus Himself, rejected now, returning later as King.

This ending was never really about servants and money at all.

👥 Enemies means the citizens who rejected him

🔁 Their rejection is answered once he returns

👑 The parable points to Jesus as King

📖 It was never only about money

# Luke 19:28-34
# 🐴 The Lord Hath Need Of Him
---
## 🏔️ Ascending Up To Jerusalem

Jerusalem sits high in the hill country above the surrounding roads.

Every approach to the city is described in Scripture as going up.

This is the final stretch of Jesus's long journey toward the city.

What waits for Him there is the cross, not a crown.

He walks toward it directly, without turning back.

🏔️ Jerusalem sits high above the roads

🛣️ Every approach is described as going up

✝️ The cross waits at the end

📖 Jesus walks toward it directly

## 🏡 Bethphage And Bethany, At The Mount Called The Mount Of Olives

Bethphage and Bethany were small villages just outside Jerusalem.

Bethany was the home of Jesus's friends Mary, Martha, and Lazarus.

The Mount of Olives rises just east of the city, across a small valley.

Jesus is in familiar, friendly territory as He prepares to enter Jerusalem.

The last steps of His journey pass through people who already love Him.

🏡 Bethany was home to His close friends

⛰️ The Mount of Olives sits near the city

🤝 Jesus is in familiar territory here

📖 Friends surround His final approach

## 🐴 A Colt Tied, Whereon Yet Never Man Sat

This is not a random animal picked for convenience.

An unridden colt had never been trained to carry a rider.

Riding one safely into a loud crowd was normally nearly impossible.

The prophet Zechariah had already described Israel's king arriving this very way.

Jesus fulfills that specific prophecy down to this small, exact detail.

🐴 The colt had never carried a rider

😲 Riding it safely was normally impossible

📜 Zechariah described a king arriving this way

📖 Jesus fulfills that exact detail

## ❓ Why Loose Ye The Colt

The owners notice two strangers untying their animal and ask why.

Jesus had already told His disciples exactly what to say in this moment.

Nothing about this encounter catches Jesus off guard.

The answer satisfies the owners completely, without any argument.

Every small detail of this day was already arranged in advance.

❓ The owners challenge the two disciples

🗣️ Jesus already gave them the right answer

✅ The owners accept it without argument

📖 Every detail was arranged beforehand

## 👑 The Lord Hath Need Of Him

"The Lord" here is the exact phrase Jesus told His disciples to use.

It identifies Jesus with an authority far beyond a simple traveler.

The owners release the colt based on that single sentence alone.

No payment, no argument, and no hesitation are recorded.

One true claim of authority was all it took.

👑 Lord claims real authority here

🗣️ Jesus gave them this exact phrase

🤲 The owners release the colt freely

📖 One true claim was enough

## ✅ Found Even As He Had Said Unto Them

The disciples find everything exactly the way Jesus described it in advance.

The colt, the owners, and even their question all match His words.

Nothing about this small errand is left to chance.

Jesus's knowledge of what was coming was not a guess.

Small fulfilled details build confidence for the larger ones still ahead.

✅ Everything matched what Jesus had said

🎯 Nothing was left to chance here

🔮 His knowledge was not a guess

📖 Small fulfillments build confidence for bigger ones

# Luke 19:35-40
# 🌿 Blessed Be The King That Cometh
---
## 👑 They Cast Their Garments Upon The Colt

Laying garments down was an ancient way of honoring a king.

The disciples use their own clothing as a makeshift saddle for Jesus.

This small act already treats Him as royalty before He even speaks.

No one commands them to do this.

It comes from what they already believe about Him.

👑 Garments were a way to honor a king

🧥 Disciples use their own clothes as a saddle

🙌 This treats Jesus as royalty already

📖 Belief comes before any command

## 🛣️ Spread Their Clothes In The Way

Spreading clothing on the road in front of someone was another royal welcome.

An earlier king in Israel's history was welcomed into power this same way.

The road itself becomes part of the celebration, not just the animal.

This gesture turns an ordinary path into a king's processional route.

The crowd is making a public statement with their own belongings.

🛣️ Clothes on the road were a royal welcome

👑 An earlier king was welcomed this way too

🎉 The road becomes part of the celebration

📖 The crowd makes a public statement

## 👥 The Whole Multitude Of The Disciples

"The whole multitude" here means His own followers traveling with Him.

It is not the general crowd that fills Jerusalem during this festival.

These are people who have walked with Jesus and seen His works firsthand.

Their praise comes from everything they have personally witnessed.

This same city will shout very differently within just a few days.

👥 Multitude means His own followers here

🚶 They have walked with Him and seen Him

🙌 Their praise comes from firsthand experience

📖 The same city will shout differently soon

## 📜 Blessed Be The King That Cometh In The Name Of The Lord

This exact line comes from Psalm one hundred eighteen, a song of celebration.

It was originally sung to welcome pilgrims arriving for a festival in Jerusalem.

The disciples apply it directly to Jesus as their long awaited King.

Calling Him King out loud, in public, was not a safe thing to say.

They mean every word of it.

📜 This line comes from Psalm one eighteen

🎉 It originally welcomed festival pilgrims

👑 Disciples apply it directly to Jesus

📖 Calling Him King publicly was not safe

## 👼 Peace In Heaven, And Glory In The Highest

This phrase closely echoes the angels' announcement at Jesus's birth.

That earlier night in Bethlehem also spoke of peace and glory from heaven.

The beginning and this moment near the end are tied together on purpose.

The same praise that opened His life surrounds His final approach to Jerusalem.

Luke wants readers to notice both scenes echo each other.

👼 This echoes the angels at His birth

🌙 Bethlehem also spoke of peace and glory

🔁 Beginning and ending are tied together

📖 Luke wants readers to notice the echo

## 🪨 The Stones Would Immediately Cry Out

Some Pharisees in the crowd ask Jesus to silence His disciples.

Jesus answers that silencing them would change nothing at all.

He says even lifeless stones would announce the truth if people would not.

This is not a prediction about actual rocks speaking out loud.

It is a claim that this truth is too large to stay hidden.

🙅 Pharisees ask Jesus to silence them

🪨 Jesus says stones would speak instead

📢 This truth cannot stay hidden

📖 The claim is bigger than literal rocks

# Luke 19:41-44
# 😢 He Beheld The City, And Wept Over It
---
## 😢 He Beheld The City, And Wept Over It

Jesus weeps in this verse.

The crowd behind Him is still celebrating loudly.

His grief is not for Himself.

He weeps for the city and for what is coming to it.

Joy and sorrow sit side by side in this single moment.

The King entering in triumph is also the King who grieves for His people.

😢 Jesus weeps amid loud celebration

❤️ His grief is for the city, not Himself

🔀 Joy and sorrow sit side by side

📖 The King entering also grieves for His people

## 🚪 If Thou Hadst Known, Even Thou, The Things Which Belong Unto Thy Peace

This is not Jesus saying Jerusalem never had a chance.

The city had every opportunity to recognize its own King.

"The things which belong unto thy peace" means the peace Jesus Himself offered.

That peace was available, real, and now hidden from their eyes.

His grief comes from a loss that could have been avoided.

🚪 Jerusalem had a real chance

❤️ Jesus Himself was the peace offered

👁️ That peace is now hidden from them

📖 This loss could have been avoided

## 🏰 Thine Enemies Shall Cast A Trench About Thee

This describes a military siege wall built completely around a city.

Roman armies under General Titus built exactly this kind of wall decades later.

The siege cut off all food and escape from the city completely.

Jesus names this coming disaster decades before any of it happens.

Nothing about this prophecy is vague or symbolic.

🏰 A trench means a siege wall

⚔️ Rome built this exact wall decades later

🚫 It cut off all food and escape

📖 Jesus names this disaster in advance

## 🏛️ Not Leave In Thee One Stone Upon Another

This describes total destruction, down to the foundation stones themselves.

The magnificent temple in Jerusalem would be torn apart completely.

This happened in the year seventy, within the lifetime of many listening.

The grandest building many of them had ever seen would not survive.

Judgment here is specific and historical, not distant or abstract.

🏛️ The destruction reaches down to the foundation

📅 This happened in the year seventy

👥 Many listeners lived to see it happen

📖 This judgment was specific, not abstract

## 🚪 The Time Of Thy Visitation

"Visitation" means a moment when God draws near with purpose.

God came close to Jerusalem in the person of Jesus Himself.

The city failed to recognize that moment while it was happening.

A visitation like this one does not repeat on demand.

Missing it was the true tragedy hiding underneath all the coming disaster.

🚪 Visitation means God drawing near

👣 God drew near in Jesus Himself

👁️ Jerusalem failed to recognize the moment

📖 Missing it was the deeper tragedy

# Luke 19:45-48
# ⛓️ My House Is The House Of Prayer
---
## 🏛️ Began To Cast Out Them That Sold Therein

The outer court of the temple was the only place non Jewish worshippers could pray.

That same court had become crowded with merchants selling sacrificial animals.

Money changers also worked there, converting foreign coins for temple offerings.

The space meant for prayer had been turned into a loud marketplace.

Jesus moves directly to clear it out Himself.

🏛️ The outer court was for non Jewish worship

🐑 Merchants sold animals there instead

💰 Money changers crowded the space too

📖 Jesus clears it out Himself

## 📜 My House Is The House Of Prayer

This line quotes the prophet Isaiah directly, word for word.

God's own stated purpose for the temple was always prayer.

Jesus is not introducing a new rule here.

He is holding the temple to the purpose it already had on paper.

The building had simply drifted far away from its own stated reason to exist.

📜 This line quotes the prophet Isaiah

🏠 Prayer was always the temple's purpose

🚫 Jesus introduces nothing new here

📖 The building drifted from its own purpose

## 💸 Ye Have Made It A Den Of Thieves

This second line quotes the prophet Jeremiah just as directly.

"Den of thieves" does not mean simple theft happened here.

It points to merchants overcharging pilgrims who had nowhere else to buy.

The very system meant to help people worship was exploiting them instead.

Jesus names that exploitation plainly, with no softening of the charge.

📜 This line quotes the prophet Jeremiah

💸 Merchants overcharged pilgrims who had no choice

🚫 Worship itself was being exploited

📖 Jesus names the exploitation plainly

## ⚔️ Sought To Destroy Him

The chief priests, scribes, and leading citizens begin plotting against Jesus here.

Clearing the temple directly threatened their income and their authority.

Their response is not debate or correction, but a plan to kill Him.

This moment sets the Passion narrative firmly in motion.

The path to the cross grows shorter from this point forward.

👥 Leaders begin plotting against Jesus

💰 Clearing the temple threatened their income

⚔️ Their plan moves straight to killing Him

📖 The path to the cross grows shorter

## 📖 He Taught Daily In The Temple

Jesus does not retreat after clearing out the merchants.

He returns to the same temple courts every day that follows.

Teaching daily, in public, took real courage given who was now plotting against Him.

He makes Himself fully available right up until the end.

Nothing about His final days is spent in hiding.

📖 Jesus returns to teach daily

🏛️ He teaches in the same temple courts

💪 This took real courage under threat

➡️ His final days were not spent hiding

## 👂 All The People Were Very Attentive To Hear Him

Ordinary people keep listening closely to Jesus.

Leaders are plotting against Him at the very same time.

Their attentiveness becomes an unplanned kind of protection for Him.

Leaders cannot move against Him in public without facing the crowd's reaction.

Popularity buys Him time for now.

Luke closes the chapter on this uneasy, temporary balance.

👂 The people listen closely to Jesus

🛡️ Their attention protects Him for now

⚖️ Leaders fear the crowd's reaction

📖 The chapter ends on an uneasy balance
`.trim();

export const LUKE_NINETEEN_PERSONAL_SECTIONS = parseLukeNineteenRawNotes(LUKE_NINETEEN_RAW_NOTES);
