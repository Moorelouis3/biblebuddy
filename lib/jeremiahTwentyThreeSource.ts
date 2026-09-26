export type JeremiahTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyThreeRawNotes(rawText: string): JeremiahTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 23:${startVerse}` : `Jeremiah 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Jeremiah 23 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_THREE_RAW_NOTES = `# Jeremiah 23:1-4
# 🐑 Shepherds Who Scatter The Flock
---
## 🐑 Woe Be Unto The Pastors That Destroy And Scatter The Sheep

Pastors is an old word for shepherds, here meaning Judah's own kings and leaders.

Woe opens a formal announcement of coming judgment, not a passing complaint.

These leaders scattered the very people they were supposed to protect.

The sheep represent the whole nation entrusted to their care.

🐑 Pastors means the nation's shepherd kings

📢 Woe announces coming judgment

💔 Leaders scattered their own people

📖 The sheep represent the whole nation

## 📤 Ye Have Scattered My Flock, And Driven Them Away, And Have Not Visited Them

God lists three separate failures in a row, not one general complaint.

Scattered means the people were pushed into exile and confusion.

Driven away describes leaders actively forcing the people out, not simply letting them wander.

Have not visited means these kings never checked on the people afterward.

📤 Three separate failures are named

🌪️ Scattered means pushed into exile

👊 Driven away means actively forced out

📖 Have not visited means no one checked

## 👀 Behold, I Will Visit Upon You The Evil Of Your Doings

Visit here carries two very different meanings depending on who receives it.

For the flock, God's visiting meant compassion and rescue.

For the shepherds, God's visiting meant punishment matched to their own actions.

The same word describes both care and consequence, depending on who earned it.

👀 Visit can mean rescue or punishment

🤝 The flock receives compassion

⚖️ The shepherds receive consequence

📖 The word fits whoever earns it

## 🌾 I Will Gather The Remnant Of My Flock Out Of All Countries

Remnant means the surviving portion of a people left after judgment has fallen.

God promises to personally regather Judah's exiles from every land they were scattered to.

This is the same God who allowed the scattering in the first place.

Judgment was never meant to be God's last word to His people.

🌾 Remnant means the surviving portion left

🌍 God gathers exiles from every country

🔄 The same God allows and reverses this

📖 Judgment was not God's final word

## 🌱 They Shall Be Fruitful And Increase

Fruitful and increase echo the same words God spoke to Adam and Noah at creation.

This promise reverses the shrinking and loss caused by exile.

A scattered, dying nation would become a growing one again.

God's plan for His people was always growth, not extinction.

🌱 Fruitful and increase echo creation language

🔄 This reverses exile's losses

📈 A dying nation would grow again

📖 God's plan was growth, not extinction

## 👥 I Will Set Up Shepherds Over Them Which Shall Feed Them

God promises new leaders to replace the corrupt ones just condemned.

Feed here means far more than simply providing food.

It describes genuine care, protection, and guidance for the whole community.

The failure of human shepherds never cancels God's commitment to His flock.

👥 God promises new, faithful leaders

🍞 Feed means real care and guidance

🛡️ It includes protection too

📖 Bad shepherds do not cancel God's care

## 😨 They Shall Fear No More, Nor Be Dismayed, Neither Shall They Be Lacking

Fear and dismayed both describe the constant anxiety of living under bad leadership.

Lacking means going without basic needs like safety and provision.

All three troubles named here were the direct result of the earlier failed shepherds.

Good leadership was always meant to remove this kind of fear, not add to it.

😨 Fear and dismayed describe constant anxiety

📉 Lacking means going without basic needs

👑 Bad shepherds caused all three troubles

📖 Good leadership removes fear, not adds it

# Jeremiah 23:5-6
# 🌿 The Righteous Branch
---
## 🌿 I Will Raise Unto David A Righteous Branch

Branch is a title used elsewhere in scripture for a promised future descendant of David.

Raise here means cause to grow up, not lift into the air.

Righteous marks this coming king as different from every failed king named in this chapter.

Many Christians read this Branch as ultimately pointing forward to Jesus.

🌿 Branch means a promised descendant of David

🌱 Raise means cause to grow up

⚖️ Righteous contrasts him with failed kings

📖 Many see this pointing to Jesus

## 👑 A King Shall Reign And Prosper

This king succeeds exactly where Judah's recent kings collapsed.

Prosper here does not just mean wealth, it means genuine success in the task of ruling.

Every king named earlier in this chapter failed at that same job.

This promised King finally gets it right.

👑 A future King is promised here

📈 Prosper means real success in ruling

💔 Earlier kings all failed this test

📖 This King finally succeeds

## ⚖️ Shall Execute Judgment And Justice In The Earth

Judgment and justice were the exact words used earlier in the chapter's warning to wicked kings.

This King fulfills the standard every earlier king failed to reach.

In the earth signals a reach beyond just the borders of Judah.

His rule reaches further than any human king managed before him.

⚖️ Same words used in earlier warnings

👑 This King succeeds where others failed

🌍 In the earth means beyond Judah's borders

📖 His rule reaches further than any king

## 🗺️ In His Days Judah Shall Be Saved, And Israel Shall Dwell Safely

Judah and Israel are named together even though the northern kingdom had already fallen generations earlier.

This promise looks forward to a reunited people, not just Judah alone.

Saved and dwell safely describe real, lasting security, not a temporary peace.

This safety comes directly from the King's own righteous rule.

🗺️ Judah and Israel are named together

🔗 This points to a reunited people

🛡️ Saved and safely mean lasting security

📖 Security flows from the King's rule

## 👑 THE LORD OUR RIGHTEOUSNESS

This name is given directly to the promised King, not to God the Father separately.

Righteousness here is presented as something the King gives His people, not something they earn.

Giving God's own covenant name, LORD, to this King is a striking, deliberate claim.

The chapter that opened with unrighteous kings closes this section by naming perfect righteousness.

👑 This name belongs to the promised King

🎁 Righteousness is given, not earned

✨ Using the LORD's name here is deliberate

📖 Perfect righteousness answers the unrighteous kings

# Jeremiah 23:7-8
# 🌍 A New And Greater Exodus
---
## 🇪🇬 They Shall No More Say, The LORD Liveth, Which Brought Up The Children Of Israel Out Of The Land Of Egypt

The LORD liveth was a common oath formula used constantly in everyday Israelite speech.

Israel's whole national identity had always been anchored in the exodus from Egypt.

This verse does not erase that history, it says something even bigger is coming.

A greater rescue is about to eclipse Israel's oldest and most treasured memory.

🇪🇬 Egypt was Israel's founding memory

🗣️ The LORD liveth was a common oath

🔄 A bigger rescue is coming

📖 It eclipses even the exodus

## 🧭 Out Of The North Country, And From All Countries Whither I Had Driven Them

Babylon, the coming place of exile, sat to the north of Judah.

North country points ahead to the very exile this chapter has been warning about.

From all countries widens the promise beyond Babylon alone to every place Israel would be scattered.

This new gathering would be even larger in scope than the first exodus.

🧭 North country points to Babylon

🌍 All countries widens the promise further

📈 This gathering outsizes the first exodus

📖 No scattered place is left out

## 🗺️ They Shall Dwell In Their Own Land

Own land points back to the promise God first made to Abraham centuries earlier.

Dwelling safely in that land was the goal all along, not exile itself.

The same God who allowed the scattering also guarantees the return.

This closing promise answers the opening woe against the failed shepherds directly.

🗺️ Own land recalls the promise to Abraham

🎯 Dwelling there was the goal all along

🔄 The same God allows and reverses exile

📖 This answers the chapter's opening woe

# Jeremiah 23:9-12
# 💔 Jeremiah's Heart Is Broken
---
## 💔 Mine Heart Within Me Is Broken Because Of The Prophets

This is Jeremiah speaking in his own voice, not God's direct words.

The prophets in view here are the false prophets misleading the nation.

Jeremiah's grief was personal, not just professional disagreement.

Carrying God's true word cost him real emotional pain.

🗣️ Jeremiah speaks in his own voice here

🎭 The prophets means the false prophets

💔 His grief was deeply personal

📖 Truth telling cost him real pain

## 🍷 I Am Like A Drunken Man, And Like A Man Whom Wine Hath Overcome

This comparison describes a body shaking and out of control, not literal drunkenness.

Jeremiah uses it to describe the overwhelming weight of what God had shown him.

The words of his holiness means the specific, holy message God had given him to carry.

Some messages are so heavy they physically shake the person carrying them.

🍷 This pictures a body shaking uncontrollably

⚖️ It describes emotional weight, not drinking

📜 Words of his holiness means God's message

📖 Some messages shake the messenger

## 💔 The Land Is Full Of Adulterers

Adulterers here works on two levels at once, both literal and spiritual unfaithfulness to God.

Swearing means casual, careless oaths and false promises spoken constantly.

The land mourneth pictures the ground itself reacting to the nation's sin.

Even the pleasant, fertile places had begun drying up as a visible sign of judgment.

💔 Adulterers means both kinds of unfaithfulness

🗣️ Swearing means careless, false oaths

🌾 The land mourns the nation's sin

📖 Even fertile places were drying up

## 🧭 Their Course Is Evil, And Their Force Is Not Right

Course describes the direction a person's whole life is heading.

Force describes the strength and energy people were pouring into that direction.

Both were pointed the wrong way at the same time.

Effort spent chasing the wrong goal is still wasted effort.

🧭 Course means life's overall direction

💪 Force means energy poured into it

🚫 Both were aimed the wrong way

📖 Effort chasing wrong goals is wasted

## 🚫 Both Prophet And Priest Are Profane

Profane means treating what is holy as common or unimportant.

Prophet and priest together covered both of Judah's main religious offices.

In my house means this corruption had reached inside God's own temple.

The very people meant to guard what was holy had defiled it instead.

🚫 Profane means treating holy things as common

👥 Prophet and priest covered both offices

🏛️ This reached inside God's own temple

📖 The guardians defiled what they guarded

## 🌑 Their Way Shall Be Unto Them As Slippery Ways In The Darkness

Slippery ways in darkness pictures someone walking without any way to see danger coming.

Driven on and fall describes losing control and going down hard.

This punishment fits the crime exactly, since these leaders had already led the nation blindly.

The year of their visitation names a specific, appointed time for judgment to land.

🌑 Slippery paths in darkness picture blind danger

🏃 Driven on and fall means losing control

⚖️ The punishment matches their own blindness

📖 Visitation names a set time for judgment

# Jeremiah 23:13-15
# ☠️ Wormwood And The Water Of Gall
---
## 🏛️ I Have Seen Folly In The Prophets Of Samaria

Samaria was the capital of the northern kingdom of Israel, already destroyed by this point.

Folly means foolish, sinful behavior, not a simple mistake.

Prophesied in Baal means these prophets spoke in the name of a false Canaanite god.

Samaria's fall stood as a clear, recent warning that Jerusalem seemed determined to ignore.

🏛️ Samaria was the fallen northern capital

🚫 Folly means foolish, sinful behavior

🗿 Baal was a false Canaanite god

📖 Samaria's fall was a warning ignored

## 🤥 They Commit Adultery, And Walk In Lies

Jerusalem's prophets are judged even more harshly than Samaria's already condemned ones.

Walk in lies describes a whole lifestyle built on dishonesty, not one false statement.

Strengthen the hands of evildoers means actively encouraging sinners to keep sinning.

These prophets made it easier for wicked people to feel fine about their wickedness.

👎 Jerusalem's prophets are judged even harder

🤥 Walk in lies means a whole dishonest life

👊 They strengthened evildoers' hands

📖 They made sin feel comfortable

## 🔥 They Are All Of Them Unto Me As Sodom, And The Inhabitants Thereof As Gomorrah

Sodom and Gomorrah were cities destroyed for their extreme, open wickedness generations earlier.

Comparing Jerusalem's prophets to Sodom was the harshest insult available in the Old Testament.

Jerusalem, God's own chosen city, now matched the most infamous example of sin in scripture.

The comparison makes clear how far these religious leaders had actually fallen.

🔥 Sodom and Gomorrah were destroyed for wickedness

💔 This was the harshest possible comparison

🏙️ God's own city now matched them

📖 Their fall was total, not partial

## ☠️ I Will Feed Them With Wormwood, And Make Them Drink The Water Of Gall

Wormwood is a plant known for an intensely bitter taste.

Gall refers to a bitter, harmful substance used the same way elsewhere in scripture.

Feeding and drinking bitterness pictures a punishment that matches exactly what these prophets had spread.

They had fed the nation lies, so bitterness becomes their own portion in return.

🌿 Wormwood means an intensely bitter plant

☠️ Gall means a bitter, harmful substance

⚖️ The punishment matches their own sin

📖 Bitterness becomes their own portion

## 🦠 From The Prophets Of Jerusalem Is Profaneness Gone Forth Into All The Land

Profaneness here means widespread corruption, spreading like a disease outward from its source.

Jerusalem was supposed to be the spiritual center guiding the whole nation rightly.

Instead it became the very origin point of the nation's corruption.

A center that should have purified the land instead poisoned it.

🦠 Profaneness spread outward like a disease

🏙️ Jerusalem was meant to guide the nation

🚫 Instead it became corruption's source

📖 The center poisoned instead of purified

# Jeremiah 23:16-20
# 🌪️ The Whirlwind Of The LORD's Fury
---
## 👂 Hearken Not Unto The Words Of The Prophets That Prophesy Unto You

Hearken means to listen and obey, not just to hear passively.

God directly commands the people to ignore this specific group of prophets.

This is a rare, direct order to disregard people who claimed to speak for God.

Not every voice claiming God's authority actually carries it.

👂 Hearken means listen and obey

🚫 God orders the people to ignore them

⚠️ This is a rare, direct warning

📖 Claiming God's name does not make it true

## 💭 They Speak A Vision Of Their Own Heart, And Not Out Of The Mouth Of The LORD

Vision of their own heart means these messages came from personal opinion, not revelation.

Mouth of the LORD describes the true source every real prophet was required to draw from.

The difference between the two sources decided whether a prophecy was true or false.

These prophets dressed up their own wishes as divine messages.

💭 Vision of their own heart means personal opinion

📜 Mouth of the LORD means true revelation

⚖️ The source decided true from false

📖 They dressed wishes up as revelation

## ☮️ They Say Still Unto Them That Despise Me, Ye Shall Have Peace

Despise me identifies people who openly rejected God, not innocent doubters.

These false prophets told rebellious people exactly what they wanted to hear.

Peace here means safety and freedom from consequences, promised falsely.

Imagination of his own heart describes living entirely by personal desire with no correction.

🚫 Despise me means openly rejecting God

🗣️ False prophets said what people wanted

☮️ Peace was promised falsely here

📖 They let sin go uncorrected

## 🏛️ Who Hath Stood In The Counsel Of The LORD

Counsel of the LORD pictures God's own inner council, where His true plans are known.

This question is not really a question, it is a challenge exposing these prophets as frauds.

None of the false prophets had ever actually stood there or heard anything real.

A true prophet's authority came from genuinely being present in that counsel.

🏛️ Counsel of the LORD means God's inner council

❓ This question exposes them as frauds

🚫 None of them had truly been there

📖 Real authority requires real access

## 🌪️ A Whirlwind Of The LORD Is Gone Forth In Fury

A whirlwind pictures sudden, violent, unstoppable destruction sweeping across the land.

Grievous means severe and painful, repeated twice here for emphasis.

This judgment specifically targets the wicked, not random or innocent victims.

The false peace these prophets promised was about to be proven completely wrong.

🌪️ Whirlwind pictures sudden violent destruction

😣 Grievous means severe, repeated for weight

🎯 This judgment targets the wicked specifically

📖 The false peace promise was proven wrong

## 🔮 In The Latter Days Ye Shall Consider It Perfectly

Latter days here means a future time when the truth becomes completely undeniable.

Consider it perfectly means the people would finally understand fully what they refused to see now.

Understanding this too late does not prevent judgment from arriving on schedule.

Clarity often comes only after the consequences a warning tried to prevent.

🔮 Latter days means a future point in time

💡 Consider perfectly means finally understanding fully

⏳ Late understanding does not stop judgment

📖 Clarity often comes after consequences

# Jeremiah 23:21-24
# 👂 I Have Not Sent These Prophets
---
## 🏃 I Have Not Sent These Prophets, Yet They Ran

Ran pictures eager, self appointed messengers rushing out with a message nobody gave them.

Being sent was the one requirement every true prophet needed and these men lacked.

Enthusiasm and confidence are not the same thing as being called by God.

A message delivered with great energy can still be completely false.

🏃 Ran pictures eager, self appointed messengers

📜 Being sent was the real requirement

💪 Confidence is not the same as calling

📖 Energy does not make a message true

## 🔄 If They Had Stood In My Counsel, And Had Caused My People To Hear My Words, Then They Should Have Turned Them From Their Evil Way

A true message from God's counsel always produces real change in the hearer's behavior.

This is the test that exposes these prophets, since Judah's sin only kept growing worse.

Real prophecy turns people away from sin, it does not simply comfort them in it.

The complete lack of change proves these men never carried God's actual word.

🔄 Real revelation produces real change

📉 Judah's sin only kept growing

⚖️ True prophecy turns people from sin

📖 No change proved their message was false

## 📍 Am I A God At Hand, And Not A God Afar Off

At hand means nearby, and afar off means distant.

This question corrects a hidden assumption that God's awareness had limits or a range.

False prophets may have counted on God not noticing what happened out of public view.

God asks this specifically to expose that false sense of security.

📍 At hand means nearby

🌌 Afar off means distant

❌ This corrects a wrong assumption about limits

📖 God exposes their false sense of security

## 🙈 Can Any Hide Himself In Secret Places That I Shall Not See Him

Secret places means anywhere a person assumes no one else is watching.

This question directly answers the previous verse's challenge about God's reach.

Do not I fill heaven and earth states God's presence everywhere at once, plainly.

Nothing done by these false prophets, however hidden, ever actually escaped God's sight.

🙈 Secret places means anywhere thought unseen

❓ This answers the previous question directly

🌍 God fills heaven and earth completely

📖 Nothing hidden ever escaped His sight

# Jeremiah 23:25-29
# 🔥 A Fire And A Hammer
---
## 💤 I Have Dreamed, I Have Dreamed

Repeating a phrase twice in Hebrew often signals excitement or exaggerated self importance.

These prophets were claiming an ordinary dream carried the full weight of a message from God.

Prophesy lies in my name means using God's own reputation to sell a false message.

Claiming God's name does not make an ordinary dream into real revelation.

🔁 Repeating a phrase signals exaggeration here

💤 An ordinary dream was claimed as revelation

🏷️ In my name means using God's reputation

📖 God's name does not validate a dream

## 🪞 Prophets Of The Deceit Of Their Own Heart

Deceit of their own heart means these men had first deceived themselves before deceiving anyone else.

How long shows God's patience finally wearing thin after repeated warnings.

Self deception is often the first step toward deceiving a whole community.

A liar who believes his own lie is far more convincing than one who does not.

🪞 They deceived themselves first

⏳ How long shows God's patience wearing thin

🤥 Self deception leads to deceiving others

📖 A believed lie convinces more easily

## 🗿 Cause My People To Forget My Name By Their Dreams

Forget my name means losing sight of who God actually is and what He requires.

Their fathers have forgotten my name for Baal points back to Israel's long history of idol worship.

These new false dreams were simply the latest version of an old, repeated failure.

A nation can drift from God gradually, one comfortable lie at a time.

🧠 Forget my name means losing sight of God

🗿 Their fathers did the same for Baal

🔁 This was an old failure repeating

📖 Drift happens one lie at a time

## 🌾 What Is The Chaff To The Wheat

Chaff is the worthless husk separated from grain during threshing and blown away as waste.

Wheat is the valuable, nourishing part that remains and feeds people.

This question compares a false dream directly to worthless chaff.

God's true word is compared to wheat, the part actually worth keeping.

🌾 Chaff is worthless husk blown away

🍞 Wheat is the valuable, nourishing part

💤 False dreams compare to chaff here

📖 God's word compares to the wheat

## 🔨 Is Not My Word Like As A Fire, And Like A Hammer That Breaketh The Rock In Pieces

Fire pictures God's word burning away everything false and worthless in its path.

A hammer breaking rock pictures overwhelming, unstoppable force applied with real purpose.

Both images describe active power, not a gentle suggestion easily ignored.

A dream can be forgotten by morning, but a word this powerful cannot be dismissed the same way.

🔥 Fire burns away what is false

🔨 A hammer breaks even solid rock

💪 Both describe active, unstoppable power

📖 God's word cannot be casually dismissed

# Jeremiah 23:30-32
# 🗣️ Against The Prophets Who Steal My Words
---
## 📋 I Am Against The Prophets That Steal My Words Every One From His Neighbour

Steal my words means copying another prophet's message and passing it off as an original word from God.

This exposes these prophets as frauds recycling secondhand phrases rather than actually hearing from God.

I am against you is one of the strongest personal warnings God speaks anywhere in scripture.

Borrowing the right sounding words never made these messages actually true.

📋 Steal my words means copying others' phrases

🎭 This exposes them as frauds

⚠️ I am against you is a severe warning

📖 Right sounding words were still false

## 👅 That Use Their Tongues, And Say, He Saith

This describes prophets simply adding He saith to their own ordinary opinions.

Tongues here emphasizes empty speech, words with no real substance behind them.

Attaching God's authority to a personal opinion is treated as a serious offense.

Saying God said something does not make it true if He never actually did.

👅 Tongues emphasizes empty, substanceless speech

🏷️ He saith was simply added to opinions

⚠️ Misusing God's authority is serious

📖 Claiming it does not make it true

## 🎈 Cause My People To Err By Their Lies, And By Their Lightness

Lightness here means reckless, careless behavior, treating something serious as trivial.

Err means wandering off the right path, led astray by someone trusted.

Yet I sent them not repeats a point already made earlier, driven home one final time.

A message can sound confident and still lead people somewhere false.

🎈 Lightness means treating something serious as trivial

🧭 Err means being led off the path

🔁 Yet I sent them not is repeated

📖 Confidence does not guarantee truth

## 📉 They Shall Not Profit This People At All

Profit means genuine benefit or help, the opposite of what these prophets actually delivered.

This closes the whole section's case against the false prophets with a final verdict.

Every promise of peace and safety they gave turned out completely empty.

A message that feels good in the moment can still leave a person worse off.

📉 Profit means real benefit, missing here

⚖️ This is the final verdict on them

☮️ Their promised peace turned out empty

📖 Feeling good does not mean being helped

# Jeremiah 23:33-36
# 📦 What Is The Burden Of The LORD
---
## 📦 What Is The Burden Of The LORD

Burden was a common term prophets used for a heavy, weighty message of judgment.

Over time the people had turned the phrase into a mocking, sarcastic nickname for Jeremiah's warnings.

This question was being asked with contempt, not genuine curiosity.

A serious word from God had been reduced to an insult by careless repetition.

📦 Burden meant a weighty prophetic message

😏 The phrase became a mocking nickname

🚫 The question was asked with contempt

📖 A serious word was reduced to insult

## ❓ What Burden? I Will Even Forsake You

Jeremiah is told to answer the mocking question with a question of his own.

This response refuses to keep dignifying their sarcasm with the word they had cheapened.

Forsake here describes God withdrawing His presence and protection entirely.

Mocking God's word carried a real, personal cost for the ones doing the mocking.

❓ Jeremiah answers with a question back

🚫 This refuses to dignify their sarcasm

👋 Forsake means withdrawing presence and protection

📖 Mocking God's word carried a real cost

## ⚖️ I Will Even Punish That Man And His House

This punishment falls on anyone who keeps using the phrase mockingly, not on one person alone.

His house extends the consequence to that person's whole family and household.

God treats the careless repetition of an insult as a real, punishable offense.

Words spoken casually still carry weight and consequence in God's sight.

⚖️ Anyone repeating the mockery is punished

🏠 His house extends it to the family

🗣️ Careless words are treated seriously

📖 Words still carry real weight

## 🔄 What Hath The LORD Answered? And, What Hath The LORD Spoken

God provides the people with two replacement phrases to use instead of the mocking one.

These questions still ask exactly the same thing, but without the built in contempt.

God is not banning the topic of prophecy, only the sarcastic label attached to it.

The same conversation could continue respectfully once the mockery was removed.

🔄 God offers two replacement phrases

❓ They ask the same thing without contempt

🚫 The topic itself was not banned

📖 Respect could replace mockery here

## 🌀 Every Man's Word Shall Be His Burden

This is a pointed wordplay, turning their own mocking word back onto themselves.

Burden now means the weight of consequence each person carries for their own words.

Perverted means twisted from its true, intended meaning into something false.

Twisting God's true word into a joke had become its own serious offense.

🔄 This wordplay turns the word back on them

⚖️ Burden now means personal consequence

🌀 Perverted means twisted from the truth

📖 Mocking God's word was itself an offense

# Jeremiah 23:37-40
# 😔 An Everlasting Reproach
---
## 🔁 Thus Shalt Thou Say To The Prophet, What Hath The LORD Answered Thee

This repeats the replacement question from earlier, now aimed specifically at the false prophets themselves.

Repetition in this chapter usually signals a point God wants remembered clearly.

Even the false prophets are still being offered a respectful way to ask about God's word.

The offer of a better way was extended even to the guilty.

🔁 This repeats the earlier replacement question

📌 Repetition signals a point worth remembering

🎯 It is aimed at the false prophets directly

📖 A better way was offered even to them

## 📢 Because Ye Say This Word, The Burden Of The LORD

God had already given a clear, direct command not to use this phrase mockingly.

This verse describes people continuing to say it anyway, in open defiance.

Disobedience here is not confusion about the rule, it is a refusal to follow it.

Being told plainly and still refusing is a heavier offense than never being told at all.

📢 God had already commanded them clearly

🚫 They kept using the phrase anyway

⚠️ This was defiance, not confusion

📖 Known disobedience is a heavier offense

## 🎯 I, Even I, Will Utterly Forget You, And I Will Forsake You

I, even I repeats the pronoun for emphasis, making the coming judgment deeply personal.

Utterly forget describes complete abandonment, not simply overlooking a small detail.

The city that I gave you reminds the people that Jerusalem itself was always God's gift.

Cast out of my presence describes losing access to God entirely, the worst possible loss.

🎯 I even I makes this deeply personal

🚫 Utterly forget means complete abandonment

🏙️ The city was always God's gift

📖 Losing His presence was the worst loss

## 😔 An Everlasting Reproach Upon You, And A Perpetual Shame

Reproach means public disgrace, being openly looked down upon by others.

Perpetual and everlasting both describe a shame with no expiration date attached.

Which shall not be forgotten closes the entire chapter on a note of permanence.

A chapter that began with a woe against bad shepherds ends with a warning that will outlast the moment.

😔 Reproach means public disgrace

⏳ Perpetual and everlasting mean no expiration

🗿 This shame would not be forgotten

📖 The warning outlasts this one moment
`.trim();

export const JEREMIAH_TWENTY_THREE_PERSONAL_SECTIONS = parseJeremiahTwentyThreeRawNotes(JEREMIAH_TWENTY_THREE_RAW_NOTES);
