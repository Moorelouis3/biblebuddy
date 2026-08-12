export type SecondKingsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsFourRawNotes(rawText: string): SecondKingsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsFour\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsFour\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsFour\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 4:${startVerse}` : `2 Kings 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 2 Kings 4 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_FOUR_RAW_NOTES = `# SecondKingsFour 4:1-4
# 👩 A Widow's Desperate Cry
---
## 📿 Sons Of The Prophets

"Sons of the prophets" does not mean their fathers were prophets.

It means a group of men training together to serve God under a senior prophet like Elisha.

They often lived and worked together almost like a school.

This widow's husband had belonged to that same group.

📿 Sons of the prophets means trainees

🏫 They lived and trained together

🤝 Elisha served as their leader

📖 Serving God did not spare this family

---

## 🙏 Thou Knowest That Thy Servant Did Fear The Lord

This widow does not just ask for pity.

She reminds Elisha that her husband honored God his whole life.

She is really asking why faithfulness did not protect her family from disaster.

That question does not get an easy answer, it gets a miracle instead.

🙏 She reminds Elisha of his faith

❓ Faithfulness did not prevent disaster

😢 Her appeal is honest, not proud

📖 God answers with a miracle instead

---

## ⚖️ The Creditor Is Come To Take Unto Him My Two Sons To Be Bondmen

A creditor is a person who is legally owed money.

In this culture, an unpaid debt could be settled with a person instead of cash.

"Bondmen" means servants forced to work without pay until the debt was gone.

Losing her two sons that way was legal, but it still felt unbearable.

⚖️ A creditor collects on unpaid debt

🔗 Bondmen means servants working off debt

👦 Her two sons were the payment

📖 Legal did not mean it was easy

---

## 🫙 Save A Pot Of Oil

Oil in this culture had many everyday uses.

People burned it for light and cooked meals with it.

Kings and priests were even anointed with special oil for their role.

This widow has only a small jar of it left.

🫙 Oil served many everyday purposes

💡 It also fueled lamps for light

😔 She had only a tiny amount

📖 A small amount was still enough

---

## 🏺 Borrow Thee Vessels Abroad Of All Thy Neighbours, Even Empty Vessels

Elisha does not perform this miracle out of nothing.

He tells her to gather ordinary jars from everyone she knows.

The instruction only makes sense once oil actually starts pouring out.

Until then, it looks like busywork with no visible purpose.

🏺 Elisha asks her to gather jars

🤷 The instruction makes no sense yet

👣 She has to obey before understanding

📖 Faith often acts before it sees results

---

## 🔢 Borrow Not A Few

Elisha adds a specific warning here, do not stop at just a couple of jars.

The number of empty vessels she gathers will set the limit on the miracle.

More containers mean more oil poured out before it finally stops.

Her own faith, shown through how many jars she collects, shapes the outcome.

🔢 More jars would mean more oil

🎯 The vessel count sets the limit

🙏 Her faith is measured in jars

📖 The miracle matched what she prepared for

# SecondKingsFour 4:5-7
# 🫗 Oil Enough To Pay The Debt
---
## 🫗 She Poured Out

The widow obeys Elisha's strange instructions exactly as given.

She does not question how one small jar could fill so many borrowed vessels.

Her obedience comes before she sees any results at all.

That order, obey first and understand later, runs through this whole miracle.

🫗 She obeys without seeing results yet

🙏 Trust came before understanding here

👦 Her sons helped by bringing vessels

📖 Obedience often comes before proof

---

## 🛑 There Is Not A Vessel More

The oil does not stop because it runs out.

It stops because the family runs out of empty jars to fill.

The miracle was only ever limited by what she prepared beforehand.

That detail matches the warning in verse four to borrow more than a few.

🛑 The oil stopped, not the amount

🫙 The jars ran out, not the oil

📏 Preparation set the limit, not God

📖 The miracle matched what she gathered

---

## 🙏 The Man Of God

This title appears often for Elisha throughout this chapter.

It marks him as someone who speaks and acts for God directly.

That role mattered because normal people rarely got direct answers from God.

The widow returns to him for guidance instead of guessing her next step.

🙏 Man of God names Elisha's role

📣 It marks him as God's messenger

🚶 She returns to him for guidance

📖 She trusted his instructions to the end

---

## 💰 Go, Sell The Oil, And Pay Thy Debt

Elisha's final instruction turns the miracle into an actual solution.

The oil itself was never the point, paying off the debt was.

Selling it converts a household miracle into money the creditor will accept.

💰 Selling the oil provides real cash

🎯 The miracle solves a real problem

🔗 It frees her sons from bondage

📖 God's provision met a practical need

---

## 👨‍👩‍👦 Live Thou And Thy Children Of The Rest

Elisha does more than cancel the debt.

He tells her to keep whatever money is left over for daily needs.

God's provision here reaches beyond the immediate crisis.

It covers her future, not just this one emergency.

👨‍👩‍👦 Leftover money supports her family

🌅 Provision reaches beyond today's crisis

🔮 God provides for her future too

📖 God's gifts often outlast the need

# SecondKingsFour 4:8-10
# 🏠 A Room For The Man Of God
---
## 🏙️ Elisha Passed To Shunem

Shunem was a small town in northern Israel, in the territory of Issachar.

It sat along a route travelers used often, which explains why Elisha kept passing through.

Naming the town grounds this story in a real, specific place.

🏙️ Shunem sat in Issachar's territory

🛤️ It sat along a busy route

📍 A real place, not a vague setting

📖 God works through ordinary towns

---

## 👑 A Great Woman

"Great" here does not describe her size or her personality.

It means she was wealthy and highly respected in her community.

Her wealth becomes important later when she builds an entire room for Elisha.

👑 Great means wealthy and respected

🏘️ She held real standing in Shunem

🧱 Her wealth funds the room later

📖 Status here comes with generosity

---

## 🍞 She Constrained Him To Eat Bread

"Constrained" means she did not just offer a meal, she insisted on it.

Hospitality in this culture was taken seriously, especially toward a traveling holy man.

She makes this a regular habit rather than a onetime kindness.

🍞 Constrained means she insisted firmly

🤝 Hospitality mattered deeply in this culture

🔁 She fed him every time he passed

📖 Generosity here became a habit

---

## 🙏 An Holy Man Of God

The Shunammite woman recognizes something about Elisha before anyone tells her.

She sees his character in how he carries himself, not from a title he claims.

Her perception sets up everything generous she is about to do for him.

🙏 She recognizes Elisha's character herself

👀 No one had to tell her

🧠 Her insight leads to real action

📖 Discernment often comes before instruction

---

## 🛏️ Let Us Make A Little Chamber

Homes in this culture were often built with flat roofs.

A small room could be added there, up a separate stairway, for privacy.

This gave Elisha his own quiet space whenever he visited.

🛏️ Homes often had flat roofs

🪜 A rooftop room offered separate access

🤫 It gave Elisha real privacy

📖 She built comfort into her kindness

---

## 🪑 A Bed, And A Table, And A Stool, And A Candlestick

These four items cover everything a guest would need to rest and work.

A bed for sleep, a table and stool for eating, a candlestick for light.

Nothing here is fancy, but everything here is complete.

🪑 Four simple items, fully furnished

😴 A bed gave him real rest

🕯️ A candlestick gave him light

📖 Small gifts, given completely

# SecondKingsFour 4:11-17
# 👶 The Promise Of A Son
---
## 🧑‍🤝‍🧑 Gehazi His Servant

Gehazi works closely with Elisha throughout this section of the chapter.

He acts as a messenger, going between Elisha and the Shunammite woman.

His role here sets up a much darker moment for him later in the book.

🧑‍🤝‍🧑 Gehazi serves as Elisha's assistant

📨 He carries messages between them

🔮 His story continues later in Kings

📖 Small roles can carry future weight

---

## 🙇 Thou Hast Been Careful For Us With All This Care

Elisha wants to repay her generosity with something in return.

He notices the effort behind her hospitality, not just the result.

Gratitude here leads directly to action, not just a polite thank you.

🙇 Elisha notices her real effort

🎁 He wants to repay her kindness

🗣️ Gratitude moves him to offer help

📖 Noticing effort matters, not just results

---

## 👑 Spoken For To The King, Or To The Captain Of The Host

Elisha offers to use his influence with powerful people on her behalf.

A word from a prophet could open doors with the king or the army's commander.

This was a real, valuable offer, not an empty gesture.

👑 Elisha offers real political influence

⚔️ The captain led the army

🚪 A prophet's word could open doors

📖 He offered genuine, costly help

---

## 🏘️ I Dwell Among Mine Own People

The Shunammite woman turns down Elisha's offer without hesitation.

She already has security and standing within her own community.

Her answer reveals contentment, not a lack of gratitude.

🏘️ She already has community support

🙅 She declines his political offer

😌 Her answer shows real contentment

📖 Not every need is what it seems

---

## 👴 Verily She Hath No Child, And Her Husband Is Old

Gehazi notices the one real gap in her otherwise full life.

Childlessness carried deep social and personal weight in this culture.

Her husband's age made the situation feel even less likely to change.

👴 Gehazi identifies her true need

💔 Childlessness carried heavy cultural weight

⏳ Her husband's age made it feel hopeless

📖 The real need was hidden until named

---

## 👶 About This Season, According To The Time Of Life, Thou Shalt Embrace A Son

Elisha promises a son will be born within about a year.

"According to the time of life" points to a normal pregnancy, not something strange.

This mirrors the promise God gave Sarah in Genesis eighteen almost word for word.

👶 Elisha promises a son within a year

🤰 The timing points to a normal pregnancy

🔁 This echoes God's promise to Sarah

📖 God repeats His pattern of provision

---

## 😲 Do Not Lie Unto Thine Handmaid

The Shunammite woman reacts with disbelief rather than excitement at first.

She has likely given up hope of ever having a child.

Her blunt honesty shows she is not afraid to speak plainly to a man of God.

😲 She reacts with real disbelief

💔 She had likely given up hope

🗣️ She speaks honestly, without pretending

📖 Honest doubt still gets God's answer

---

## 🤰 The Woman Conceived, And Bare A Son

The promise comes true exactly as Elisha said it would.

The timing matches what he told her almost to the day.

This confirms Elisha was speaking for God, not just offering comfort.

🤰 The promise came true exactly

📆 The timing matched his word precisely

✅ This confirmed Elisha spoke for God

📖 God keeps His word on time

# SecondKingsFour 4:18-20
# 💔 Sudden Tragedy
---
## 🌾 He Went Out To His Father To The Reapers

The child is old enough now to visit his father in the fields.

Reapers were workers harvesting grain, likely during a hot part of the year.

This ordinary family moment sets up the sudden tragedy that follows.

🌾 Reapers were workers harvesting grain

👦 The child was old enough to visit

☀️ The season was likely hot

📖 Ordinary moments can turn suddenly

---

## 🤕 My Head, My Head

The boy cries out twice, a sign of sudden, sharp pain.

Many scholars believe heat exposure or sunstroke caused this collapse.

The urgency in his words shows something is seriously wrong right away.

🤕 Repeating it shows sudden pain

☀️ Heat exposure was a likely cause

🚨 His words signal real urgency

📖 Small details reveal real suffering

---

## 🏃 Carry Him To His Mother

The father does not try to treat this sudden pain himself.

He immediately sends the boy back to where his mother could care for him.

This quick decision could not save him, but it shows real concern.

🏃 The father acts immediately

👩 A mother's care was the first instinct

⏳ Quick action still could not save him

📖 Real concern does not always change the outcome

---

## 😢 He Sat On Her Knees Till Noon, And Then Died

The mother holds her son as his condition quickly worsens.

"Till noon" tells us this happened within just a few hours.

This was the very son Elisha had promised her by name.

😢 She holds him as he weakens

⏰ He died within just a few hours

👶 This was the promised son himself

📖 The gift now seems taken away

# SecondKingsFour 4:21-24
# 🐎 She Sets Out For Elisha
---
## 🛏️ Laid Him On The Bed Of The Man Of God

She places her dead son on the very bed built for Elisha.

This was not panic, it was a deliberate act of faith.

She is already trusting God's man to reverse what has happened.

🛏️ She lays him on Elisha's bed

🎯 This was a deliberate choice

🙏 She trusts Elisha before asking him

📖 Faith acted before any words were spoken

---

## 🚪 Shut The Door Upon Him, And Went Out

She keeps her son's death private for now, even from her own husband.

Telling him too soon might have slowed her down or changed her plan.

Her next move required speed and a clear head.

🚪 She keeps the death private

🤐 She has not yet told her husband

🏃 Speed mattered more than explanation

📖 She moved on faith, not panic

---

## 🐴 One Of The Young Men, And One Of The Asses

She needs a servant and a donkey to travel quickly to Elisha.

Asses were the normal, practical transportation for a journey like this.

She does not explain why, she simply asks for what she needs.

🐴 A donkey was normal transportation

🧑 A servant would guide the animal

🤫 She still withholds the real reason

📖 Urgency did not need full explanation

---

## 🌙 Neither New Moon, Nor Sabbath

Her husband is confused because there is no normal reason for this trip.

New moons and sabbaths were the regular days people visited a prophet for guidance.

Traveling on an ordinary day signals something unusual is happening.

🌙 New moons were regular worship days

🛌 Sabbaths were the other normal visiting day

❓ Today was neither, which confused him

📖 Urgent faith does not wait for the calendar

---

## 🕊️ It Shall Be Well

She answers her husband's question without revealing what has actually happened.

This is not denial, it is a statement of confident hope.

She says a version of this same phrase again before this story ends.

🕊️ She hides the truth for now

🙏 Her words show confident hope

🔁 She repeats this hope later too

📖 Faith spoke before the outcome was known

---

## 🐎 Drive, And Go Forward, Slack Not Thy Riding For Me

She pushes her servant to move as fast as possible.

"Slack not thy riding" means do not slow the pace for any reason.

Every minute mattered once she had decided to seek out Elisha.

🐎 She demands maximum speed

⏱️ Every minute mattered to her

🚫 No slowing down was allowed

📖 Urgency drove every step of the trip

# SecondKingsFour 4:25-31
# 🏔️ Reaching Elisha At Carmel
---
## ⛰️ To Mount Carmel

Mount Carmel was a well known mountain range along Israel's coast.

Elisha apparently stayed there at times, likely for prayer and solitude.

The distance from Shunem to Carmel made this an urgent, demanding trip.

⛰️ Carmel sat along Israel's coast

🙏 Elisha likely used it for prayer

🛤️ The distance made her trip demanding

📖 She traveled far for real help

---

## 👀 When The Man Of God Saw Her Afar Off

Elisha recognizes her from a distance before she even arrives.

He immediately senses something is wrong just from how she looks.

His concern shows real care, not just prophetic duty.

👀 Elisha spots her from far away

🚨 He senses trouble immediately

❤️ His concern feels personal, not routine

📖 He noticed her before she spoke

---

## ❓ Is It Well With Thee, Is It Well With Thy Husband, Is It Well With The Child

Gehazi asks about her, her husband, and her son in that order.

This threefold question was likely a normal greeting checking on a whole household.

Her one word answer hides the tragedy she is racing to report.

❓ Three questions cover her whole family

🗣️ This may reflect a normal greeting

🤐 Her short answer hides the truth

📖 Grief does not always answer honestly at first

---

## 🦶 She Caught Him By The Feet

Grabbing someone's feet was a posture of urgent desperation, not casual greeting.

This was how a person begged for help when words were not enough yet.

Gehazi tries to stop her, not understanding the depth of her grief.

🦶 Grabbing his feet showed desperation

🙇 It was a posture of pleading

🚫 Gehazi tries to pull her away

📖 Some grief speaks before words do

---

## 💔 Her Soul Is Vexed Within Her

Elisha tells Gehazi to let her alone, sensing deep inner distress.

"Vexed" means troubled or in real anguish, not simply upset.

He recognizes something serious is wrong before she says a single word about it.

💔 Vexed means deep inner anguish

🛑 Elisha stops Gehazi from interfering

👁️ He senses her pain immediately

📖 Compassion noticed what words had not said

---

## 🙈 The Lord Hath Hid It From Me

Elisha admits he does not automatically know everything.

God reveals things to him at certain times, not constantly.

This honesty shows Elisha's power came from God, not from himself.

🙈 Elisha admits a real limit

🔒 God controls what he knows and when

🙏 His power depended fully on God

📖 Even prophets do not know everything

---

## 😭 Did I Desire A Son Of My Lord

The Shunammite woman finally says what has been building since verse sixteen.

She reminds Elisha that she never asked for this gift in the first place.

Her grief carries real anger, not just sadness, and Elisha lets her speak it.

😭 She names her hidden grief

❓ She never asked for this son

😠 Her words carry real anger

📖 Grief and honesty can coexist

---

## 🥾 Gird Up Thy Loins, And Take My Staff In Thine Hand

"Gird up thy loins" meant tucking long robes into a belt to move quickly.

Elisha sends Gehazi ahead immediately, carrying his own staff as a symbol of his authority.

Speed and urgency define this entire instruction from start to finish.

🥾 Gird up meant preparing to move fast

🪄 The staff represented Elisha's authority

🏃 Gehazi is sent ahead immediately

📖 Urgency shaped every instruction given

---

## 🤐 Salute Him Not, And If Any Salute Thee, Answer Him Not Again

Elisha tells Gehazi to skip all normal greetings along the way.

Greetings in this culture were often long, formal, and time consuming.

Every skipped hello meant more time saved for reaching the dying child.

🤐 Skip every greeting along the way

⏳ Greetings back then took real time

🏃 Speed mattered more than politeness

📖 Some moments outweigh normal courtesy

---

## 💍 As The Lord Liveth, And As Thy Soul Liveth, I Will Not Leave Thee

The Shunammite woman refuses to let Elisha send Gehazi in his place.

This oath formula was one of the strongest promises a person could make.

She wants Elisha himself, not just his staff or his servant.

💍 This was among the strongest oaths possible

🙅 She refuses to accept a substitute

🎯 She wants Elisha there in person

📖 Some faith will not settle for less

---

## 🪄 The Child Is Not Awaked

Gehazi follows every instruction exactly, but the staff alone does not work.

"Not awaked" is a gentle way of saying the child is still dead.

This sets up why Elisha himself still has to come and act personally.

🪄 The staff alone was not enough

😔 Not awaked means still dead

👣 Obedience alone did not bring the miracle

📖 Some things require personal presence

# SecondKingsFour 4:32-37
# ✨ Elisha Raises The Child
---
## 🛏️ The Child Was Dead, And Laid Upon His Bed

Elisha arrives and confirms what the Shunammite woman already knew.

The child still lies exactly where she placed him back in verse twenty one.

Nothing has changed in his condition during the entire journey to fetch Elisha.

🛏️ Elisha confirms the child is dead

📍 The boy lies where she left him

⏳ Nothing changed during the long journey

📖 The situation looked hopeless before the miracle

---

## 🚪 Shut The Door Upon Them Twain, And Prayed

Elisha handles this moment privately, just himself and the boy.

He turns to prayer first, before doing anything else physical.

This mirrors the privacy the Shunammite woman herself used back in verse twenty one.

🚪 Elisha keeps this moment private

🙏 Prayer comes before any action

🔁 This echoes her own privacy earlier

📖 Miracles often begin in quiet prayer

---

## 🤲 He Put His Mouth Upon His Mouth, And His Eyes Upon His Eyes

Elisha stretches his own body directly over the child's, point for point.

This physical closeness was unusual and deeply personal, not a distant gesture.

A similar pattern appears earlier with Elijah in first Kings seventeen.

🤲 Elisha lies fully over the child

❤️ This closeness was deeply personal

🔁 Elijah did something similar earlier

📖 God worked through hands on prayer

---

## 🔥 The Flesh Of The Child Waxed Warm

"Waxed warm" means the child's body slowly began heating up again.

This is the first visible sign that something is actually changing.

The miracle happens gradually here, not in one sudden instant.

🔥 Waxed warm means slowly heating up

👀 This was the first visible sign

⏳ The miracle unfolded gradually

📖 God's power does not always work instantly

---

## 🤧 The Child Sneezed Seven Times, And The Child Opened His Eyes

Sneezing seven times may describe breath returning fully to his lungs.

The number seven often signals completeness throughout scripture.

Opening his eyes confirms beyond doubt that he is truly alive again.

🤧 Sneezing may show breath returning

🔢 Seven often signals completeness

👁️ Opened eyes confirmed he was alive

📖 Full life returned, not partial recovery

---

## 👶 Take Up Thy Son

Elisha uses almost the exact words Gehazi once used to comfort her.

Now those same words carry an entirely different, joyful meaning.

The son she once had to give up is now given back to her whole.

👶 Elisha echoes an earlier phrase

🔄 The same words now mean joy

🎁 Her son is given back to her

📖 God can turn old words into new joy

---

## 🙇 She Fell At His Feet, And Bowed Herself To The Ground

This is the same posture of desperation from verse twenty seven, now turned to worship.

Her grief has become genuine gratitude in the span of one chapter.

She leaves carrying her son, not carrying her grief.

🙇 Her posture shifts from grief to worship

🔄 Desperation becomes deep gratitude

🚶 She leaves carrying her living son

📖 God can turn desperation into worship

# SecondKingsFour 4:38-41
# 🍲 Death In The Pot
---
## 🌾 There Was A Dearth In The Land

Elisha comes again to Gilgal, another site where the sons of the prophets gathered.

A "dearth" means a famine, a season with far too little food to go around.

This shortage explains why someone went foraging for wild plants in the next verse.

🌾 Gilgal was another prophet training site

🍽️ Dearth means a serious famine

🌿 Hunger explains the risky foraging

📖 Scarcity set up the danger ahead

---

## 🍲 Seethe Pottage For The Sons Of The Prophets

"Pottage" means a thick stew, usually made from vegetables and herbs.

Feeding this whole group during a famine required stretching whatever food was available.

This ordinary meal was about to turn dangerous.

🍲 Pottage means a thick stew

🍽️ Famine made every meal count

⚠️ This meal was about to go wrong

📖 Ordinary tasks can carry real risk

---

## 🌱 One Went Out Into The Field To Gather Herbs

During a famine, someone had to take on the task of finding extra food.

Foraging wild plants was a normal, necessary practice when supplies ran low.

This routine task is what puts the whole group at risk moments later.

🌱 Foraging was normal during famine

🍽️ Someone had to find extra food

⚠️ A routine task turned risky

📖 Necessity can lead straight into danger

---

## 🌿 Found A Wild Vine, And Gathered Thereof Wild Gourds His Lap Full

This man gathers unfamiliar plants without knowing whether they were safe to eat.

Many scholars believe these gourds were a bitter, possibly toxic wild vine.

Good intentions during a famine still led to a genuinely dangerous mistake.

🌿 Wild gourds were an unfamiliar plant

☠️ They were likely bitter and toxic

😬 Good intentions still caused real danger

📖 Ignorance can create real harm

---

## ☠️ There Is Death In The Pot

The men taste the stew and immediately recognize something is deeply wrong.

This was not a mild complaint, they believed the food could actually kill them.

Their alarm shows just how serious the danger really was.

☠️ They sense the food is dangerous

🚨 Their alarm was not exaggerated

🍲 The whole pot was now suspect

📖 Real danger deserved real alarm

---

## 🌾 Then Bring Meal

Elisha responds with a simple, almost unexplained instruction.

"Meal" here means ground flour, an everyday kitchen staple.

The fix looks too small for the size of the problem it solves.

🌾 Meal means ordinary ground flour

🤏 A small fix for a big problem

🙏 Elisha trusted God over logic

📖 God's power fits inside simple things

---

## ✅ There Was No Harm In The Pot

The danger disappears completely once Elisha acts.

This miracle protected an entire group of people, not just one person.

It shows God's care extending even to something as ordinary as a shared meal.

✅ The danger vanished completely

👥 The whole group was protected

🍽️ Even meals fall under God's care

📖 God provides safety, not just miracles

# SecondKingsFour 4:42-44
# 🍞 Bread Enough For A Hundred
---
## 🗺️ A Man From Baalshalisha

Baalshalisha was a town whose exact location scholars are not fully certain of.

It sat somewhere in the hill country not far from Gilgal.

Naming the town again grounds this miracle in a real place and time.

🗺️ Baalshalisha was a real hill town

📍 Its exact site is not fully certain

🧭 It likely sat near Gilgal

📖 Real places anchor real miracles

---

## 🌾 Bread Of The Firstfruits, Twenty Loaves Of Barley

"Firstfruits" means the very first portion of a harvest, offered to God before anything else.

Barley was a common, everyday grain in ancient Israel, not a luxury food.

Bringing this offering to Elisha, God's man, was itself an act of worship.

🌾 Firstfruits meant the harvest's first portion

🍞 Barley was a common, everyday grain

🙏 Giving it to Elisha was worship

📖 Ordinary grain became an offering to God

---

## 🌽 Full Ears Of Corn In The Husk Thereof

This "corn" means grain such as wheat, still in its outer husk, not modern corn.

Bringing it unprocessed shows this gift was fresh, straight from the field.

Every part of this gift was ordinary, everyday food.

🌽 Corn here means grain like wheat

🌿 It came fresh, still in husk

🍞 The whole gift was everyday food

📖 God multiplies what is ordinary

---

## 😳 What, Should I Set This Before An Hundred Men

Elisha's servant reacts with plain disbelief at the math involved.

Twenty loaves clearly could not feed a hundred hungry men by normal counting.

His doubt voices exactly what any reasonable person would think.

😳 The servant does the obvious math

🔢 Twenty loaves could not feed a hundred

🗣️ His doubt was completely reasonable

📖 Doubt often meets God right at the math

---

## ✅ They Shall Eat, And Shall Leave Thereof

Elisha promises not just enough food, but food left over afterward.

This mirrors a miracle Jesus performs later in the Gospels with loaves and fish.

God's provision here is generous, not just barely sufficient.

✅ Elisha promises leftovers, not just enough

🔁 This foreshadows Jesus feeding the crowds

💰 God's provision is generous, not bare minimum

📖 God gives more than what is needed

---

## 📜 According To The Word Of The Lord

The chapter closes by crediting the miracle to God's word, not to Elisha himself.

Every miracle in this chapter follows the same pattern, God speaks and it happens.

This phrase ties the whole chapter's separate stories back to one single source.

📜 The miracle is credited to God's word

🔁 The same pattern repeats all chapter

🙏 Elisha was the messenger, not the source

📖 Every miracle here traces back to God
`.trim();

export const SECOND_KINGS_FOUR_PERSONAL_SECTIONS = parseSecondKingsFourRawNotes(SECOND_KINGS_FOUR_RAW_NOTES);
