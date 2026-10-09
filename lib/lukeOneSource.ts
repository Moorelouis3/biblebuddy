export type LukeOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeOneRawNotes(rawText: string): LukeOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 1:${startVerse}` : `Luke 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 Luke 1 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_ONE_RAW_NOTES = `# Luke 1:1-4
# 📜 Luke Explains Why He Is Writing
---
## 📝 Many Have Taken In Hand To Set Forth In Order A Declaration

Luke was not the first person to write down the story of Jesus.

Other written accounts already existed before he picked up his pen.

Luke wanted to add something more careful and complete than what came before.

His Gospel became one of four accounts the church later kept as scripture.

📝 Other written accounts already existed

✍️ Luke added his own careful account

📚 Four Gospels were later kept as scripture

📖 Luke wrote to complete, not compete

## 👀 Eyewitnesses, And Ministers Of The Word

Luke relied on people who had actually seen Jesus with their own eyes.

These eyewitnesses later became preachers who spread the message by voice first.

Written Gospels came only after spoken testimony had already been circulating for years.

Luke's information traced back to real witnesses, not rumor or guesswork.

👀 Eyewitnesses had seen Jesus personally

🗣️ They preached the message by voice first

⏳ Spoken testimony came before written Gospels

📖 Luke's account traced back to real witnesses

## 🔍 Having Had Perfect Understanding Of All Things From The Very First

Luke was likely a Gentile doctor, not one of the twelve apostles.

He was not an eyewitness himself, so he had to research his material.

Perfect understanding here means a careful, thorough investigation, not secret knowledge.

Luke tells Theophilus up front that this account was checked, not assumed.

⚕️ Luke was likely a Gentile doctor

🔍 He researched rather than witnessed firsthand

📋 Perfect understanding means careful investigation

📖 This account was checked, not assumed

## 🏛️ Most Excellent Theophilus

Theophilus was a real person, likely the one who funded or received this Gospel.

The title most excellent was used for Roman officials of some rank.

His name is Greek for friend of God or one who loves God.

Many ancient books were formally dedicated to a single patron this way.

🏛️ Theophilus likely held an official rank

🇬🇷 His name means friend of God

📜 Ancient books were often dedicated to one patron

📖 Luke wrote for a real named reader

## 🎯 That Thou Mightest Know The Certainty Of Those Things

Luke's goal was confidence, not new information Theophilus had never heard.

Theophilus had already been taught the basics of the Christian faith.

Luke wanted him to know the story stood on solid, checked ground.

Faith built on verified history is not the same as faith built on rumor.

🎯 Luke's goal was confidence, not novelty

📚 Theophilus already knew the basics

🧱 Luke gave the story a solid foundation

📖 Verified history can support real faith

# Luke 1:5-7
# 👴 Zacharias And Elisabeth
---
## 🧮 Of The Course Of Abia

Zacharias belonged to one of twenty four priestly divisions called courses.

King David had organized the priests this way centuries earlier.

Each course served at the temple for about a week, twice a year.

Abia, also spelled Abijah, was the eighth of these twenty four courses.

🧮 Twenty four priestly courses existed

👑 David first organized this system

🗓️ Each course served about a week, twice yearly

📖 Abia was the eighth of the twenty four

## 👪 His Wife Was Of The Daughters Of Aaron

Elisabeth also came from a priestly family, through the line of Aaron.

Aaron was Moses's brother and the first high priest of Israel.

Zacharias and Elisabeth were both from the same priestly tribe of Levi.

Their son John would also be born into this same priestly line.

👪 Elisabeth descended from Aaron's priestly line

🕊️ Aaron was Israel's first high priest

⚖️ Both parents came from the tribe of Levi

📖 John was born into a priestly family

## ✅ They Were Both Righteous Before God

Luke describes this couple as faithful, not just religious by title.

Walking blameless in the commandments meant a consistent, sincere obedience.

Their righteousness makes their childlessness feel even harder to understand at first.

Good, faithful people still face disappointment that God has not yet explained.

✅ Luke calls them genuinely faithful

🚶 Blameless meant consistent, sincere obedience

❓ Their childlessness seemed hard to explain

📖 Faithful people still face unanswered waiting

## 💔 They Had No Child, Because Elisabeth Was Barren

Barrenness carried real social shame in this culture, not just sadness.

Many people assumed childlessness meant God was somehow displeased with a couple.

Both Zacharias and Elisabeth were also now well along in years.

This same impossible situation had already happened to Abraham and Sarah generations earlier.

💔 Barrenness carried public shame then

🤔 Many wrongly linked it to God's displeasure

👵 Both were already well along in years

📖 Abraham and Sarah faced this same impossibility

# Luke 1:8-12
# 🕯️ Zacharias Serves At The Altar
---
## 🗓️ While He Executed The Priest's Office Before God In The Order Of His Course

This was the specific week Zacharias's course was scheduled to serve.

Only a small number of priests actually served at the temple at once.

For most priests, their course's turn came up only a couple times a year.

This ordinary rotation became the setting for an extraordinary visit from God.

🗓️ This was his course's scheduled week

👥 Only a small group served at once

🔁 Turns came up a couple times yearly

📖 An ordinary rotation became extraordinary

## 🎲 His Lot Was To Burn Incense

Priests cast lots, a kind of sacred drawing, to decide daily duties.

Burning incense inside the temple's Holy Place was considered the highest honor.

A priest might receive this one duty only once in an entire lifetime.

Zacharias was living through what may have been his single greatest honor.

🎲 Lots decided which priest served where

🔥 Burning incense was the highest honor

⏳ Some priests never received it at all

📖 This may have been his one great honor

## 🚪 When He Went Into The Temple Of The Lord

This phrase points to the Holy Place, not the outer temple courts.

Only priests were allowed to enter this inner room of the temple.

A thick curtain separated the Holy Place from the innermost Holy of Holies.

Zacharias stood somewhere very few people would ever be allowed to stand.

🚪 The Holy Place was an inner room

🙅 Only priests could enter this space

🧵 A curtain separated it from the sanctuary

📖 Few people ever stood where Zacharias stood

## 🏛️ The Whole Multitude Of The People Were Praying Without

Worshipers gathered in the outer courts while the priest burned incense inside.

Rising incense smoke was pictured as prayers rising up to God.

The crowd outside was praying at the very same moment, joined in spirit.

One priest's private duty connected to an entire nation's shared worship.

🏛️ Worshipers waited outside in the courts

💨 Rising smoke pictured prayers rising to God

🙏 The crowd prayed at that same moment

📖 One priest's duty connected to shared worship

## ⚡ There Appeared Unto Him An Angel Of The Lord

This sudden appearance interrupted a familiar, routine duty without any warning.

Angels in scripture usually appear at turning points in God's larger plan.

Zacharias had no reason to expect anything unusual on this ordinary day.

God often breaks into routine moments right when something new is starting.

⚡ The angel's visit came without warning

🔁 Angels often mark turning points in scripture

📅 Zacharias expected an ordinary day

📖 God breaks into routine at key moments

# Luke 1:13-17
# 👶 The Angel Promises A Son Named John
---
## 😨 Fear Not, Zacharias, For Thy Prayer Is Heard

Zacharias had likely prayed for a child many years before this moment.

Fear not is the first thing angels usually say in scripture.

God does not always answer a prayer the moment it is spoken.

Here, years of apparent silence end with an answer at the right time.

😨 Fear not opens most angel visits

🙏 Zacharias had prayed for this long ago

⏳ God's answer did not come quickly

📖 Delay was not the same as denial

## 🇮🇱 Thy Wife Elisabeth Shall Bear Thee A Son, And Thou Shalt Call His Name John

The name John comes from a Hebrew name meaning the Lord is gracious.

Naming a child before birth signaled that this birth carried special purpose.

Zacharias did not choose this name, God assigned it in advance.

The name itself became a quiet statement about why this child mattered.

🇮🇱 John means the Lord is gracious

📛 This name was assigned before birth

👆 God chose the name, not the parents

📖 The name carried the point of the birth

## 🎉 Many Shall Rejoice At His Birth

This birth would matter to more people than just one relieved family.

The angel promises wide, public joy, not just private family happiness.

John's later ministry would in fact draw crowds from across the region.

A single answered prayer here grows into a much larger blessing.

🎉 This joy would reach beyond one family

🌍 Public impact was promised from the start

👥 John later drew large crowds publicly

📖 One answered prayer grew into a wider blessing

## 🚫 Shall Drink Neither Wine Nor Strong Drink

This instruction echoes the Nazirite vow described back in the book of Numbers.

A Nazirite set himself apart for God through specific, visible restrictions.

Refusing wine marked a life of focused devotion and self control.

John's entire lifestyle, not just his message, would point people toward God.

📜 This echoes the Nazirite vow in Numbers

🚫 Avoiding wine marked total devotion

🧘 Self control marked his whole life

📖 John's lifestyle itself preached a message

## 🔥 He Shall Go Before Him In The Spirit And Power Of Elias

Elias is the Greek form of the prophet Elijah's name.

Malachi had earlier promised a messenger would come in Elijah's spirit.

John would prepare the way for someone greater, just as a herald announces a king.

Turning hearts of fathers to children describes repairing broken family relationships.

🔥 Elias is the Greek form of Elijah

📜 Malachi promised a messenger like Elijah

📢 A herald announces a greater king coming

📖 John's role was to prepare hearts first

# Luke 1:18-25
# 🤐 Zacharias Doubts And Is Struck Silent
---
## ❓ Whereby Shall I Know This? For I Am An Old Man

Zacharias asks for proof instead of simply trusting the angel's word.

His own age and his wife's age made the promise sound impossible to him.

This same doubt echoes Abraham's reaction to a similar promise long before.

A sincere, faithful man still struggled to believe something this unlikely.

❓ Zacharias asked the angel for proof

👴 Their age made the promise sound impossible

📜 Abraham once doubted a similar promise

📖 Even faithful people can struggle to believe

## 👼 I Am Gabriel, That Stand In The Presence Of God

Gabriel is one of only two angels named directly in the whole Bible.

His name is often understood to mean mighty one of God.

Standing in God's presence marked Gabriel as a messenger of the highest rank.

This was not a vague vision, it was a specific, named heavenly messenger.

👼 Gabriel is one of two named angels

💪 His name points to God's might

🏛️ He stood in God's own presence

📖 This was a specific, named messenger

## 🤐 Thou Shalt Be Dumb, And Not Able To Speak

This silence was a direct sign tied to Zacharias's unbelief.

It also protected him from explaining too much before the time was right.

Being unable to speak for months would have been a constant, visible reminder.

Some readers think he lost his hearing as well, based on later signs.

🤐 Silence was tied to his unbelief

🛡️ It also kept the news from spreading early

📅 Months passed before his speech returned

📖 A visible reminder stayed with him daily

## ⏱️ The People Waited For Zacharias, And Marvelled That He Tarried So Long

The incense offering was usually a quick duty inside the temple.

Zacharias stayed inside far longer than the waiting crowd expected.

Their confusion outside mirrored his own stunned silence on the inside.

Something had clearly happened, even before anyone knew exactly what.

⏱️ Incense offerings were usually quick

😕 The crowd noticed his long delay

🤔 Confusion outside matched silence inside

📖 Something unusual had plainly happened

## 🤲 He Could Not Speak Unto Them, And They Perceived He Had Seen A Vision

Zacharias used hand signals since he could no longer speak at all.

The watching crowd correctly guessed that he had experienced something supernatural.

His silence became unintended proof that something real had just occurred.

A man who could not explain anything still communicated that God had acted.

🤲 Zacharias used signs instead of words

👀 The crowd guessed something supernatural happened

🔇 His silence became unintended proof

📖 Actions confirmed what words could not

## 🏠 His Wife Elisabeth Conceived, And Hid Herself Five Months

Elisabeth's hiding may have been simple humility rather than fear or shame.

Keeping quiet also let the pregnancy become undeniable before anyone could doubt it.

By staying hidden, she avoided public questions she could not yet fully answer.

Five months gave the miracle time to speak for itself.

🏠 Elisabeth stayed away from public view

⏳ Time let the pregnancy become undeniable

🤫 She avoided questions she could not answer

📖 The miracle was allowed to speak for itself

## 💔 To Take Away My Reproach Among Men

Reproach here means the shame and judgment barrenness carried in that culture.

Some neighbors likely assumed, unfairly, that Elisabeth's childlessness meant God disapproved of her.

Her pregnancy finally silenced years of quiet, unfair social judgment.

God's timing addressed not just her sadness but her public reputation too.

💔 Reproach meant public shame then

⚖️ Some unfairly blamed Elisabeth's own standing

🤐 Pregnancy finally silenced that judgment

📖 God restored her reputation, not just her hope

# Luke 1:26-31
# 👼 Gabriel Greets Mary
---
## 🗓️ In The Sixth Month The Angel Gabriel Was Sent

This sixth month counts from Elisabeth's pregnancy, linking the two stories together.

Luke deliberately ties John's story and Jesus's story into one connected timeline.

The same angel, Gabriel, now carries a second, even greater announcement.

God's plan for the forerunner and the Messiah unfolds side by side.

🗓️ This counts Elisabeth's sixth month

🔗 Luke links the two birth stories

👼 The same angel returns a second time

📖 Two plans unfolded side by side

## 🏘️ A City Of Galilee, Named Nazareth

Nazareth was a small, unimportant village in the northern region of Galilee.

No prophecy had specifically named Nazareth as a significant place beforehand.

It was an ordinary, easy to overlook town for God to choose.

God often works through places the world would never think to notice.

🏘️ Nazareth was small and unimportant

🗺️ Galilee sat in the northern region

❓ No prophecy had named this town

📖 God chose an overlooked place on purpose

## 📜 A Virgin Espoused To A Man Whose Name Was Joseph

Espoused describes a formal betrothal, more binding than a modern engagement.

Breaking a betrothal legally required something like an actual divorce.

Couples did not yet live together or have children during this stage.

Mary's pregnancy during this period would have looked deeply scandalous to outsiders.

📜 Espoused meant a binding betrothal

⚖️ Ending it required a formal divorce

🚫 Couples did not yet live together

📖 Mary's pregnancy now risked real scandal

## 👑 Of The House Of David

This detail describes Joseph's family line, tracing back to King David.

God had promised David centuries earlier that his throne would last forever.

A child adopted into Joseph's line would legally inherit this royal claim.

Jesus's birth quietly began fulfilling a promise made a thousand years earlier.

👑 Joseph descended from King David

📜 God once promised David an eternal throne

⚖️ Adoption carried legal royal rights

📖 An ancient promise began coming true

## 🎁 Hail, Thou That Art Highly Favoured

Highly favoured means graciously chosen by God, not personally flawless or sinless.

The favor flows from God toward Mary, not the other way around.

This greeting marks Mary as specially chosen for an enormous responsibility.

Being favored by God does not remove hardship, it often invites it.

🎁 Favoured means graciously chosen by God

🙇 Favor flowed from God toward Mary

🎯 She was chosen for great responsibility

📖 God's favor often invites hardship, not comfort

## 😟 When She Saw Him, She Was Troubled At His Saying

Mary's trouble came from the angel's strange words, not from fear of him.

She was clearly already thinking carefully about what this greeting could mean.

Scripture never criticizes Mary for this honest confusion.

A thoughtful question is not the same thing as doubt or disbelief.

😟 Her trouble came from his words

🤔 Mary was already thinking it through

✅ Scripture never criticizes her confusion

📖 A question is not the same as doubt

# Luke 1:32-38
# 👑 The Angel's Promise And Mary's Answer
---
## 👑 He Shall Be Great, And Shall Be Called The Son Of The Highest

Son of the Highest is a direct title identifying this child as divine.

This is not a title ever given to an ordinary human king.

Gabriel announces Jesus's identity before Mary has even conceived him.

Mary learns exactly who this child will be before she agrees to anything.

👑 Son of the Highest marks him divine

🚫 No ordinary king carried this title

📢 His identity came before his birth

📖 Mary knew who he was in advance

## 📜 The Lord God Shall Give Unto Him The Throne Of His Father David

This fulfills God's ancient covenant promise made directly to King David.

David's own throne had been empty of a true heir for centuries.

The promise of an endless kingdom finally finds its lasting fulfillment here.

Jesus is announced as both fully divine and the rightful heir to David.

📜 This fulfills God's covenant with David

⏳ The throne had sat empty for centuries

♾️ An endless kingdom was finally promised

📖 Jesus was both divine and David's heir

## ❓ How Shall This Be, Seeing I Know Not A Man

Mary asks a direct, practical question about how this is even possible.

Her question is not doubt, it is confusion about an impossible biology.

Unlike Zacharias, Mary is never rebuked or punished for asking this.

Honest questions and real faith can exist together in the same moment.

❓ Mary asked a practical question

🙅 This was confusion, not doubt

✅ She was never rebuked for asking

📖 Honest questions can sit alongside real faith

## ☁️ The Holy Ghost Shall Come Upon Thee, The Power Of The Highest Shall Overshadow Thee

Overshadow echoes the cloud that once covered the tabernacle in the wilderness.

That cloud marked God's own glory and presence resting on a place.

Here, God's presence rests directly on a person instead of a building.

This conception happens through divine power, with no human father involved.

☁️ Overshadow echoes the cloud on the tabernacle

✨ That cloud marked God's own presence

👤 God's presence now rested on a person

📖 This conception involved no human father

## 👪 Thy Cousin Elisabeth, She Hath Also Conceived A Son In Her Old Age

Cousin here is a broad KJV word for a relative, not a specific first cousin.

Gabriel offers Mary visible proof by pointing to another real miracle happening.

Elisabeth's pregnancy becomes living evidence that nothing here is beyond God.

Mary now has a real, nearby example to encourage her own faith.

👪 Cousin meant a relative broadly

🧪 Elisabeth's pregnancy served as living proof

💪 Nothing here was beyond God's power

📖 One miracle encouraged faith for the next

## 📜 For With God Nothing Shall Be Impossible

This exact promise once answered Sarah's doubt about having a child in Genesis.

The same God who kept that ancient promise is speaking again here.

Both Elisabeth's and Mary's pregnancies rest on this one unchanging truth.

God's power does not shrink with time or circumstance.

📜 This echoes God's promise to Sarah

🔁 The same God speaks again here

🤰 Both pregnancies rest on this truth

📖 God's power never shrinks with time

## 🙇 Behold The Handmaid Of The Lord, Be It Unto Me According To Thy Word

Handmaid describes a servant who willingly submits to her master's instruction.

Mary accepts a plan that will bring real personal risk and public shame.

Her answer comes without demanding proof or asking for more explanation first.

This simple yes becomes one of the most quietly courageous moments in scripture.

🙇 Handmaid meant a willing servant

⚠️ Mary accepted real risk and shame

🤝 She agreed without demanding more proof

📖 Her simple yes took real courage

# Luke 1:39-45
# 🏃 Mary Visits Elisabeth
---
## 🗺️ Mary Arose In Those Days, And Went Into The Hill Country With Haste

The Judean hill country sat many miles south of Mary's home in Nazareth.

This journey likely took several days of real travel on foot or by donkey.

With haste shows Mary's urgency, not casual curiosity about Elisabeth's news.

She may have gone partly to escape questions at home while things settled.

🗺️ The hill country was many miles south

🚶 The journey took several days

🏃 With haste shows real urgency

📖 Mary may have needed space at home too

## 👋 Entered Into The House Of Zacharias, And Saluted Elisabeth

Saluted simply means Mary gave Elisabeth a warm, ordinary greeting.

What happens next turns an ordinary greeting into something extraordinary.

Two women carrying two miraculous pregnancies now stand in the same room.

God brings these two families together at exactly the right moment.

👋 Saluted meant an ordinary greeting

✨ The moment turned extraordinary quickly

🤰 Two miracle pregnancies met in one room

📖 God timed this meeting on purpose

## 🤸 The Babe Leaped In Her Womb

Leaped describes a sudden, noticeable movement, not just a normal flutter.

Luke presents this as more than ordinary fetal movement at that stage.

Even before birth, John is pictured responding to the presence of Jesus.

This detail quietly affirms that both unborn children were already fully real persons.

🤸 Leaped meant a sudden, strong movement

👶 This was more than ordinary movement

🙇 John responded to Jesus before birth

📖 Both unborn children were already real persons

## 🔥 Elisabeth Was Filled With The Holy Ghost

This filling gave Elisabeth sudden, accurate knowledge she could not have known otherwise.

She immediately recognizes Mary's child as something far greater than her own.

Prophetic insight, not gossip or guesswork, explains what she says next.

God speaks through Elisabeth before Mary even explains anything herself.

🔥 The Spirit gave her sudden insight

🧠 She knew things she could not have guessed

📢 Prophecy, not gossip, explains her words

📖 God spoke through her before Mary explained

## 🗣️ Blessed Art Thou Among Women, And Blessed Is The Fruit Of Thy Womb

Elisabeth speaks this blessing before Mary has said a single word to her.

Fruit of thy womb is a common biblical phrase for an unborn child.

Elisabeth honors both Mary and the child Mary is carrying together.

An older priest's wife humbles herself before a much younger relative.

🗣️ Elisabeth spoke first, unprompted

🌾 Fruit of the womb meant the unborn child

🙇 She honored Mary and her child together

📖 An elder humbled herself before the younger

## ⚖️ Blessed Is She That Believed

This line draws a quiet but clear contrast with Zacharias's earlier doubt.

Mary trusted the angel's impossible word without demanding proof first.

Belief here means trusting God's word even before seeing it come true.

Elisabeth names faith itself as the thing worth celebrating most here.

⚖️ This contrasts with Zacharias's doubt

🤝 Mary trusted without demanding proof

🙏 Belief meant trusting before seeing

📖 Faith itself was worth celebrating

# Luke 1:46-50
# 🎶 Mary's Song Begins
---
## 🔍 My Soul Doth Magnify The Lord

Magnify does not mean making God bigger, since God cannot grow.

It means recognizing and declaring how great God already truly is.

Mary's song closely follows the pattern of Hannah's prayer in First Samuel.

Praise here starts with a heart overwhelmed, not a performance for others.

🔍 Magnify means recognizing God's greatness

♾️ God cannot actually grow bigger

📜 Mary's song echoes Hannah's prayer

📖 Real praise starts in the heart

## 🙏 My Spirit Hath Rejoiced In God My Saviour

Mary calls God her Saviour, showing she also needed saving herself.

Being chosen for this role did not make Mary sinless or exempt.

Her joy comes from what God is doing, not from her own status.

Even the mother of Jesus needed the same salvation he would bring.

🙏 Mary called God her own Saviour

❌ Being chosen did not make her sinless

🎉 Her joy came from God's action

📖 Even Mary needed the salvation Jesus brought

## 🏠 He Hath Regarded The Low Estate Of His Handmaiden

Low estate describes Mary's humble, ordinary social standing, not personal unworthiness.

God is shown here noticing and choosing someone the world would overlook.

This pattern repeats throughout Luke, where God lifts up the overlooked person.

Mary's song already announces the kind of kingdom her son will bring.

🏠 Low estate meant humble, ordinary standing

👀 God noticed someone the world overlooked

🔁 Luke repeats this pattern often

📖 This song previews Jesus's whole kingdom

## 🔮 From Henceforth All Generations Shall Call Me Blessed

Mary predicts that her role will be remembered for a very long time.

This is not Mary claiming worship, it is recognizing lasting historical honor.

Christians across many centuries and cultures have in fact honored this moment.

Mary's own prophecy here has clearly come true ever since.

🔮 Mary predicted lasting remembrance

🙅 This was honor, not worship of Mary

🌍 Many cultures have honored this moment

📖 Her own prophecy came true

## 💪 He That Is Mighty Hath Done To Me Great Things, Holy Is His Name

Mighty describes God's power to do something no human effort could accomplish.

Holy means set apart, completely different from anything flawed or ordinary.

Mary ties God's great power directly to his perfect moral character.

Power without holiness would be frightening, but God's power is trustworthy.

💪 Mighty described God's unmatched power

✨ Holy meant set apart and perfect

🔗 Mary linked power to character

📖 God's power is matched by his goodness

# Luke 1:51-56
# 🔄 Mary's Song Of Reversal
---
## 💪 He Hath Shewed Strength With His Arm, He Hath Scattered The Proud In The Imagination Of Their Hearts

God's arm is a common biblical picture of his active, visible power.

Imagination of their hearts points to inner pride, not just outward boasting.

God opposes a prideful attitude even before it turns into a prideful action.

This line sets up the pattern of reversal that fills the rest of the song.

💪 God's arm pictured his active power

🧠 Imagination meant inner pride, not just actions

🚫 God resists pride at its root

📖 This line opens a theme of reversal

## 🪑 He Hath Put Down The Mighty From Their Seats, And Exalted Them Of Low Degree

Seats here means positions of power and authority, like a throne or office.

Low degree describes people with little status, money, or influence.

Mary sings about a complete reversal of the world's usual order.

Luke's Gospel will keep returning to this same theme again and again.

🪑 Seats meant positions of power

📉 Low degree meant little status or influence

🔄 Mary sang about complete reversal

📖 Luke returns to this theme often

## 🍞 He Hath Filled The Hungry With Good Things, The Rich He Hath Sent Empty Away

This line pairs physical hunger with the emptiness of relying only on wealth.

Good things suggests real, satisfying provision, not just enough to survive.

Sent empty away describes wealth that could not actually fill a person's need.

Mary's song quietly warns that riches alone never satisfy the soul.

🍞 Hungry received real, good provision

💰 Rich here relied only on wealth

🫙 Sent empty away meant unsatisfied

📖 Riches alone never satisfy the soul

## 🗣️ He Hath Holpen His Servant Israel, In Remembrance Of His Mercy

Holpen is an old form of the word helped, used throughout the KJV.

Servant Israel refers to the entire nation, not one single person.

Remembrance of his mercy means God kept acting on an old, ongoing promise.

God's help here was not random, it followed a pattern he already set.

🗣️ Holpen is an old word for helped

🇮🇱 Servant Israel meant the whole nation

📜 Remembrance pointed to an old promise

📖 God's help followed his own pattern

## 📜 As He Spake To Our Fathers, To Abraham, And To His Seed For Ever

This points back to God's covenant promises first made to Abraham in Genesis.

Seed refers to Abraham's descendants, the ongoing family line of promise.

Mary's own pregnancy becomes part of fulfilling this very ancient covenant.

One quiet young woman now stands at the center of a thousand year old promise.

📜 This recalls God's covenant with Abraham

👪 Seed meant Abraham's family line

🤰 Mary's pregnancy fulfilled this covenant

📖 An ancient promise centered on one woman

## 🏠 Mary Abode With Her About Three Months, And Returned To Her Own House

Three months of staying together let both women support each other closely.

This timing lines up with Elisabeth reaching close to her own delivery.

Mary returned home still early in her own pregnancy, facing it mostly alone.

Scripture leaves this transition quiet, without describing what happened next for Mary.

🏠 Three months let the women support each other

🗓️ This matched Elisabeth's own timing

🚶 Mary returned home still early in pregnancy

📖 Scripture stays quiet about what followed

# Luke 1:57-61
# 👶 John Is Born
---
## 🗓️ Elisabeth's Full Time Came That She Should Be Delivered

Full time simply means the normal nine months of pregnancy had ended.

Luke moves quickly past the pregnancy straight to this long awaited birth.

Everything the angel promised Zacharias now finally becomes visible reality.

A promise spoken months earlier in the temple finally arrives in a home.

🗓️ Full time meant nine months had passed

⏩ Luke moves quickly to the birth

✅ The angel's promise became reality

📖 A temple promise arrived in a home

## 👥 Her Neighbours And Her Cousins Heard How The Lord Had Shewed Great Mercy, And They Rejoiced With Her

The same community that once may have pitied Elisabeth now celebrates with her.

Shared joy from neighbors reflects how deeply childlessness had been felt as loss.

Mercy here means God's kindness toward someone who could not help herself.

Public shame has fully turned into public celebration.

👥 Neighbors now celebrated with Elisabeth

💔 Childlessness had once been felt as loss

🤝 Mercy meant kindness she could not earn

📖 Shame had turned into celebration

## 📜 On The Eighth Day They Came To Circumcise The Child

Circumcision on the eighth day followed the covenant command given back in Genesis.

This ritual marked a Jewish boy as formally part of God's covenant people.

Naming a child often happened at this same eighth day ceremony.

John's identity as covenant child and promised prophet come together on this day.

📜 This followed the covenant in Genesis

✅ It marked him as a covenant child

📛 Naming often happened at this ceremony

📖 Covenant and promise met on this day

## 👨 They Called Him Zacharias, After The Name Of His Father

Naming a firstborn son after his father was a common and expected custom.

This choice completely ignored what the angel had already commanded about his name.

The family assumed tradition would simply continue as it always had before.

Everyone in the room was about to be corrected at the same moment.

👨 Naming after the father was common custom

🚫 This ignored the angel's earlier command

🔁 The family assumed tradition would continue

📖 A correction was about to interrupt them

## 🗣️ His Mother Answered, Not So, But He Shall Be Called John

Elisabeth firmly corrects the crowd before her mute husband can even respond.

She may have learned the name from Zacharias through writing or signs already.

Elisabeth stands confidently against ordinary custom to follow what God had said.

A woman's clear word here settles what tradition alone would have gotten wrong.

🗣️ Elisabeth firmly corrected the crowd

✍️ She may have already known the name

💪 She stood against ordinary custom

📖 Obedience outweighed tradition here

# Luke 1:62-66
# ✍️ Zacharias Writes The Name
---
## 🤲 They Made Signs To His Father, How He Would Have Him Called

The crowd turns to Zacharias since he still could not speak at all.

Using hand signs suggests Zacharias may have lost his hearing too.

Everyone wanted the father's confirmation before accepting Elisabeth's unusual choice.

A silent man was about to settle the whole family's disagreement.

🤲 The crowd turned to Zacharias

🔇 Signs suggest he may not have heard either

✅ They wanted the father's confirmation

📖 A silent man settled the disagreement

## 📝 He Asked For A Writing Table, And Wrote, Saying, His Name Is John

A writing table was likely a small wooden board covered in wax.

Zacharias writes the exact name the angel had commanded months earlier.

His written answer perfectly matches what Elisabeth had already said aloud.

Obedience, not confusion, finally connects both parents on this one point.

📝 A writing table was a small wax board

👼 He wrote the angel's exact command

🤝 His answer matched Elisabeth's own words

📖 Obedience finally united both parents

## 🗣️ His Mouth Was Opened Immediately, And His Tongue Loosed

Zacharias's speech returns at the exact instant he obeys the angel's command.

His silence was never random, it was tied directly to this one act.

Immediately shows this restoration happened at once, not slowly over time.

Obedience and healing arrive together in the very same moment.

🗣️ His speech returned right away

🔗 His silence was tied to this one act

⚡ Immediately means this happened at once

📖 Obedience and healing arrived together

## 😮 Fear Came On All That Dwelt Round About Them

Fear here means awe at something clearly beyond normal human explanation.

News of these strange events spread quickly across the surrounding hill country.

An entire region started talking about this one unusual family and child.

God was already building public attention before John ever preached a word.

😮 Fear here meant reverent awe

📢 News spread across the hill country

🗣️ A whole region began talking

📖 Attention built before John ever preached

## 🤔 All They That Heard Them Laid Them Up In Their Hearts

People did more than gossip, they seriously thought over what had happened.

The hand of the Lord was with him points to God's visible favor on John.

Even as an infant, John's life already carried a sense of real purpose.

Luke leaves readers with a clear signal that something larger is beginning.

🤔 People seriously thought it over

✋ God's hand marked visible favor on John

👶 Purpose was already visible in infancy

📖 Something larger was clearly beginning

# Luke 1:67-71
# 📯 Zacharias Prophesies Of Redemption
---
## 🔥 Zacharias Was Filled With The Holy Ghost, And Prophesied

The same silent priest now speaks with sudden prophetic power and clarity.

His first words in months are not small talk, they are inspired prophecy.

Months of enforced silence seem to have prepared him for this moment.

God sometimes uses a season of quiet to prepare someone for a bigger message.

🔥 The Spirit filled Zacharias suddenly

🗣️ His first words were inspired prophecy

⏳ Silence seemed to prepare him for this

📖 Quiet seasons can prepare a bigger message

## 👣 Blessed Be The Lord God Of Israel, For He Hath Visited And Redeemed His People

Visited describes God personally stepping into human history to act directly.

Redeemed carries the picture of buying someone back out of real captivity.

Zacharias speaks about this redemption as if it had already fully happened.

Faith here looks at a promise and speaks about it as settled fact.

👣 Visited meant God stepping in personally

💰 Redeemed pictured buying someone out of captivity

✅ Zacharias spoke of it as already done

📖 Faith can speak of a promise as settled

## 🐂 Hath Raised Up An Horn Of Salvation For Us In The House Of His Servant David

A horn pictured strength, like the weapon an animal uses to fight.

This image describes a powerful rescuer, not a gentle or weak figure.

House of David ties this rescuer directly back to the promised royal line.

Zacharias is describing his own newborn relative's cousin, not yet even born.

🐂 A horn pictured real strength

⚔️ This described a powerful rescuer

👑 House of David tied to royal promise

📖 This rescuer was not yet even born

## 📜 As He Spake By The Mouth Of His Holy Prophets, Which Have Been Since The World Began

Zacharias claims this moment fulfills promises stretching all the way back through history.

Many Old Testament prophets had spoken of a coming rescue and a coming king.

This was never a sudden new idea, it was a very old promise arriving.

God's plan had been building for a very long time before this night.

📜 Many prophets spoke of this rescue

⏳ This was an old promise, not new

🏗️ God's plan had been building for ages

📖 History was arriving at this moment

## ⚔️ That We Should Be Saved From Our Enemies, And From The Hand Of All That Hate Us

On the surface, this sounds like a promise of political and national rescue.

Many Jewish listeners at the time were hoping mainly for relief from Rome.

The rescue God actually sent reached much deeper, into sin and death itself.

God's answer was bigger than the specific problem people thought they were asking about.

⚔️ This sounded like national rescue

🏛️ Many hoped mainly for relief from Rome

💔 God's rescue reached sin and death too

📖 God's answer went deeper than expected

# Luke 1:72-75
# 🙏 Zacharias Recalls God's Covenant Oath
---
## 📜 To Perform The Mercy Promised To Our Fathers, And To Remember His Holy Covenant

Mercy promised points back to specific covenant promises God made generations earlier.

Remember does not mean God had forgotten, it means he was now acting.

A covenant is a binding promise, not a casual suggestion that can be ignored.

God keeping an old promise is the real engine behind this entire story.

📜 This recalled an old covenant promise

🧠 Remember meant acting, not forgetting

🤝 A covenant was binding, not casual

📖 Kept promises drive this whole story

## 🙏 The Oath Which He Sware To Our Father Abraham

This oath points back to God's binding promise recorded in the book of Genesis.

God swore by his own name since nothing greater existed to swear by.

That ancient oath is now quietly reaching its fulfillment through these two babies.

One promise made to one man now blesses an entire future people.

📜 This recalls God's oath in Genesis

🙏 God swore by his own name

🤰 The oath was reaching fulfillment now

📖 One promise now blessed a whole people

## 🎯 That He Would Grant Unto Us, That We Being Delivered Out Of The Hand Of Our Enemies Might Serve Him Without Fear

This verse explains the actual purpose behind God's promised rescue.

Deliverance was never meant to be the final goal by itself.

Serving God without fear points to a life fully free from oppression.

Rescue and worship are tied together here, not kept as separate ideas.

🎯 Rescue was never the final goal

🔓 Deliverance led toward free worship

😌 Without fear meant freedom from oppression

📖 Rescue and worship were tied together

## ✨ In Holiness And Righteousness Before Him, All The Days Of Our Life

Holiness means being set apart for God, not merely behaving well.

Righteousness describes living rightly in relationship with God and with other people.

All the days of our life describes a lasting direction, not a brief season.

Zacharias ends this part of his prophecy by naming the whole purpose of salvation.

✨ Holiness meant being set apart

⚖️ Righteousness meant living rightly with others

🗓️ This described a lasting direction

📖 Salvation's purpose was named here

# Luke 1:76-80
# 🌅 John's Future Role
---
## 👶 Thou, Child, Shalt Be Called The Prophet Of The Highest

Zacharias now turns from Israel's history to speak directly to his newborn son.

Prophet of the Highest names John's future calling before he can even talk.

This title places John in the same line as Israel's earlier great prophets.

A father's prophecy over his son becomes this baby's first real identity.

👶 Zacharias now spoke to his son

📢 Prophet marked John's future calling

📜 This placed him among earlier prophets

📖 A father's words became his first identity

## 🚶 Shalt Go Before The Face Of The Lord To Prepare His Ways

Going before pictures a herald walking ahead of a king into a city.

A herald's job was to announce the king's coming and prepare the road.

John's whole mission was never about himself, it pointed people toward someone greater.

Preparing the way meant calling people to repent before the Messiah arrived.

🚶 Going before pictured a royal herald

📢 A herald announced the king's coming

👉 John pointed people toward someone greater

📖 Preparing meant calling people to repent

## 🔓 To Give Knowledge Of Salvation Unto His People By The Remission Of Their Sins

Remission simply means forgiveness, having sins fully cancelled rather than ignored.

John's preaching would connect the idea of salvation directly to forgiveness of sin.

This was not about rituals, moral effort, or a political movement.

John's message prepared hearts, not just a nation's political situation.

🔓 Remission meant forgiveness, not ignoring sin

🔗 John linked salvation to forgiveness

🙅 This was not about rituals or politics

📖 John's message prepared hearts, not politics

## 🌅 Through The Tender Mercy Of Our God, Whereby The Dayspring From On High Hath Visited Us

Dayspring is an old word for the first light breaking at sunrise.

This pictures the Messiah as light breaking into a long, dark waiting.

Tender mercy describes gentle, caring kindness, not distant or cold judgment.

Hope was described here as a sunrise, not a sudden, harsh event.

🌅 Dayspring meant the first light of sunrise

💡 This pictured the Messiah as breaking light

❤️ Tender mercy meant gentle, caring kindness

📖 Hope arrived like a sunrise, not a shock

## 🌑 To Give Light To Them That Sit In Darkness And In The Shadow Of Death

Darkness and shadow of death describe spiritual confusion and hopelessness, not just nighttime.

This language echoes an old prophecy from the book of Isaiah.

Sitting suggests people who had grown resigned, stuck without any real way forward.

Light breaking into that stillness promises real movement and real hope again.

🌑 Darkness pictured spiritual confusion

📜 This echoes a prophecy from Isaiah

🪑 Sitting suggested resigned, stuck hopelessness

📖 Light promised real hope and movement

## 🚶 To Guide Our Feet Into The Way Of Peace

Guide our feet pictures someone walking ahead, showing the safest road forward.

Peace here means far more than the absence of conflict or war.

It describes wholeness, right relationship with God, and lasting inner rest.

Zacharias's prophecy ends by pointing toward where this entire story is heading.

🚶 Guide our feet pictured a safe road

☮️ Peace meant more than no conflict

🤍 It described wholeness and right relationship

📖 The whole prophecy pointed toward this end

## 📈 The Child Grew, And Waxed Strong In Spirit

Waxed is an old word simply meaning grew or became over time.

Luke summarizes years of John's childhood in a single short sentence here.

Luke later uses this exact same pattern to describe young Jesus too.

Quiet, ordinary growth came before either child's public calling began.

📈 Waxed is an old word for grew

⏩ Luke summarized years in one sentence

🔁 Luke later repeats this same pattern for Jesus

📖 Ordinary growth came before public calling

## 🏜️ He Was In The Deserts Till The Day Of His Shewing Unto Israel

Deserts here means the dry, open wilderness regions of Judea, not total isolation.

This detail quietly foreshadows where John's adult ministry would actually begin.

Shewing unto Israel points forward to his public appearance as a grown preacher.

Luke closes this chapter by pointing straight ahead to what comes next.

🏜️ Deserts meant the dry wilderness regions

🔮 This foreshadowed his adult ministry

📢 Shewing meant his public appearance

📖 The chapter closes by pointing ahead
`.trim();

export const LUKE_ONE_PERSONAL_SECTIONS = parseLukeOneRawNotes(LUKE_ONE_RAW_NOTES);
