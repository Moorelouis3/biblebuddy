export type MatthewFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewFourRawNotes(rawText: string): MatthewFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 4:${startVerse}` : `Matthew 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 4 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_FOUR_RAW_NOTES = `# Matthew 4:1-2
# 🏜️ Driven Into The Wilderness To Fast
---
## 🕊️ Then Was Jesus Led Up Of The Spirit Into The Wilderness

The word "led" here means guided, not forced against his will.

The same Spirit that just descended on Jesus at his baptism now leads him onward.

Israel also spent time in the wilderness right after leaving Egypt.

Jesus walks a similar path, tested in the desert before his ministry begins.

This testing serves God's own purpose, not an accident or a detour.

🕊️ Led means guided by the Spirit

🚶 The same Spirit from his baptism leads him

🏜️ Israel also faced the wilderness after Egypt

📖 This testing serves God's own purpose

---

## 😈 To Be Tempted Of The Devil

"Tempted" here means tested, not just offered something sinful.

"The devil" comes from a word meaning slanderer or accuser.

God allowed this test to happen.

The devil is the one who brought the temptation itself.

Being tested is not the same thing as giving in to sin.

Jesus faces the same kind of testing every person eventually faces.

🧪 Tempted means tested, not just enticed

😈 Devil means slanderer or accuser

✅ Allowed by God, brought by the devil

📖 Jesus faces testing every person faces

---

## 🔢 When He Had Fasted Forty Days And Forty Nights

Fasting means going without food on purpose, usually to focus on God.

The number forty shows up again and again in scripture.

Moses fasted forty days on Mount Sinai before receiving the law.

Elijah traveled forty days into the wilderness fleeing for his life.

Jesus now stands in that same long line of desert testing.

🍽️ Fasting means going without food on purpose

🔢 Forty repeats often throughout scripture

⛰️ Moses fasted forty days on Sinai

📖 Jesus stands in that same line

---

## 🍞 He Was Afterward An Hungred

"An hungred" is an old way of saying hungry.

This was not a passing craving after skipping one meal.

Forty days without food left Jesus physically weak and depleted.

The temptation that follows targets this exact moment of weakness.

Real hunger makes the test that comes next far harder to resist.

🍞 An hungred is an old word for hungry

😔 This was deep hunger, not a craving

⚠️ The temptation targets this weak moment

📖 Real hunger makes resisting harder

# Matthew 4:3-4
# 🍞 The First Temptation: Bread
---
## 👂 And When The Tempter Came To Him

"The tempter" is simply another name for the devil in this scene.

Temptation often arrives right after a high spiritual moment, not before it.

Jesus had just been declared God's beloved Son at his baptism.

Now that very identity becomes the target of the test.

The timing of temptation is rarely random.

😈 Tempter is another name for the devil

⏳ Temptation often follows a high moment

👑 His identity as Son becomes the target

📖 The timing of temptation is not random

---

## 🪨 If Thou Be The Son Of God, Command That These Stones Be Made Bread

This is not really about a quick snack in the desert.

The devil opens by questioning the very words God just spoke.

"If thou be" plants a seed of doubt about Jesus's identity.

Turning stone to bread would prove nothing except selfish power.

The real question underneath is whether Jesus trusts his Father or not.

❓ If thou be plants doubt about his identity

🪨 Turning stone to bread proves nothing real

😈 The devil questions what God just said

📖 The real question is trust in the Father

---

## 📜 It Is Written, Man Shall Not Live By Bread Alone

Jesus answers by quoting Deuteronomy, not his own reasoning.

"It is written" points back to Scripture as the final authority.

Bread here stands for every physical need a person has.

Physical survival was never meant to be the highest goal of life.

Jesus refuses to let hunger decide what he does next.

📜 It is written points back to Scripture

🍞 Bread stands for every physical need

🎯 Survival was never the highest goal

📖 Jesus refuses to let hunger decide

---

## 🍯 But By Every Word That Proceedeth Out Of The Mouth Of God

This line finishes the quotation from Deuteronomy chapter eight.

God had once fed Israel with manna, bread they did not grow themselves.

That story taught Israel to depend on God's word, not just food.

"Proceedeth" simply means comes forth or goes out.

Jesus leans on that same old lesson in his own moment of hunger.

🍯 God once fed Israel with manna

📜 That story taught dependence on God's word

🙏 Jesus leans on that same old lesson

📖 Trusting God's word matters more than bread

# Matthew 4:5-7
# 🏛️ The Second Temptation: The Temple
---
## 🏙️ Then The Devil Taketh Him Up Into The Holy City

The holy city is Jerusalem, the center of Jewish worship.

The temple stood as the most sacred building in that whole city.

The devil chooses a place soaked in religious meaning for this next test.

Even sacred ground is no shield against temptation.

Jesus now faces the devil in the very heart of Jewish faith.

🏙️ Holy city means Jerusalem

🕍 The temple was the city's most sacred site

😈 The devil picks a place full of meaning

📖 Sacred ground is no shield against temptation

---

## 🗼 Setteth Him On A Pinnacle Of The Temple

A "pinnacle" means a high point or peak of a building.

Many scholars believe this was a high corner of the temple's outer wall.

That wall dropped hundreds of feet down into the valley below.

Standing there alone would have taken real nerve.

The height itself makes the coming test more dramatic and dangerous.

🗼 Pinnacle means a high peak or point

📏 The wall dropped hundreds of feet down

😨 Standing there alone took real nerve

📖 Height makes this test more dangerous

---

## 🎭 If Thou Be The Son Of God, Cast Thyself Down

This temptation looks different from the first one in the desert.

The first temptation happened in secret, turning stone into bread.

This one happens in public, in front of a crowd below.

Jumping from the temple would prove nothing about real faith.

It would only prove that Jesus is willing to force God's hand.

True trust in God never needs a crowd watching.

🎭 This test is public, not private

🙅 Jumping would force God's hand

🧎 True trust needs no crowd

📖 Faith does not perform for anyone

---

## 📜 For It Is Written, He Shall Give His Angels Charge Concerning Thee

This time the devil also quotes Scripture, from Psalm ninety one.

He pulls out one promise and ignores everything around it.

The devil twists a true verse to push Jesus toward a reckless act.

Scripture misused this way can sound convincing and still be wrong.

Knowing a verse is not the same as applying it rightly.

📜 The devil quotes Psalm ninety one

✂️ He pulls one line out of context

⚠️ Misused Scripture can still sound convincing

📖 Knowing a verse is not applying it

---

## ⚖️ Thou Shalt Not Tempt The Lord Thy God

Jesus answers with another quote, this time from Deuteronomy chapter six.

"Tempt" here means testing God on purpose to force his hand.

Israel once tested God in the wilderness by demanding proof of his care.

Jesus refuses to repeat that same old failure.

Trusting God means waiting on him, not daring him to act.

📖 Tempt here means testing God on purpose

🏜️ Israel once tested God this same way

🚫 Jesus refuses to repeat that failure

➡️ Trust waits on God and never dares him

# Matthew 4:8-11
# ⛰️ The Third Temptation: The Mountain
---
## ⛰️ Again, The Devil Taketh Him Up Into An Exceeding High Mountain

This is the third and final location in the temptation story.

Each temptation moves to a higher, more dramatic stage than the last.

"Exceeding high" simply means extremely tall, higher than any normal peak.

No mountain on earth actually offers a view of every kingdom at once.

This scene is best understood as a vision the devil shows him.

⛰️ This is the third and final location

📈 Each temptation grows more dramatic

🔭 Exceeding high means extremely tall

📖 This was likely a vision, not a hike

---

## 👁️ Sheweth Him All The Kingdoms Of The World, And The Glory Of Them

"Sheweth" is an old spelling of shows.

"The glory" means the wealth, power, and splendor that kingdoms display.

The devil offers a shortcut to something God already promised Jesus.

Every nation would one day bow to Christ anyway, through the cross.

The devil tempts him to skip straight to the reward without the suffering.

👁️ Sheweth is an old word for shows

💎 Glory means wealth, power, and splendor

🎯 God already promised Jesus the nations

📖 The devil offers a shortcut around the cross

---

## 🤝 All These Things Will I Give Thee, If Thou Wilt Fall Down And Worship Me

This is the clearest, boldest offer of the entire chapter.

The devil asks for one single act of worship in exchange.

Worship means complete devotion and submission to someone, not just a bow.

Taking this deal would hand ultimate loyalty to the wrong ruler.

Every shortcut away from God eventually asks for this same price.

🤝 The devil offers a direct trade

🙇 Worship means complete devotion and submission

💰 Taking it means serving the wrong ruler

📖 Shortcuts away from God ask this price

---

## 🛑 Then Saith Jesus Unto Him, Get Thee Hence, Satan

Jesus finally commands the devil directly instead of only answering his questions.

"Satan" is a name meaning adversary or enemy.

"Get thee hence" means leave, go away now.

Up to this point Jesus only quoted Scripture back at him.

Now he adds a direct order, closing the temptation completely.

🛑 Get thee hence means leave now

😈 Satan means adversary or enemy

📜 Before this Jesus only quoted Scripture

📖 Jesus now closes the temptation completely

---

## 📜 For It Is Written, Thou Shalt Worship The Lord Thy God, And Him Only Shalt Thou Serve

This is the third and final Scripture quote in the chapter, again from Deuteronomy.

"Him only" rules out splitting worship between God and anything else.

Serving means more than saying words.

It means where someone's loyalty actually goes.

Three temptations met three separate quotes, not one clever argument.

Scripture itself is the weapon Jesus uses every single time.

📜 This is the third Deuteronomy quote

🚫 Him only rules out divided worship

❤️ Serving means where loyalty actually goes

📖 Scripture is the weapon Jesus uses

---

## ⏸️ Then The Devil Leaveth Him

The temptation ends, but only for now.

Luke's Gospel adds that the devil left until a more fitting time.

This was a real victory, not a permanent end to opposition.

Jesus will face resistance again throughout his ministry.

Winning one battle does not mean the war is finished.

⏸️ This ends the temptation, but only for now

🏆 This was a real victory

⚔️ Jesus faces resistance again later

📖 Luke says he left for a better time

---

## 🕊️ And, Behold, Angels Came And Ministered Unto Him

"Behold" is an old word used to draw attention to something important.

Earlier the devil offered angels catching him in a dramatic public stunt.

Now angels come quietly, after real obedience, not before a performance.

"Ministered" means they served and cared for his needs.

God's true provision often looks nothing like the shortcut the devil offered.

👀 Behold draws attention to something important

🙅 Earlier the devil offered a public stunt

🕊️ Angels come quietly after real obedience

📖 God's provision looks nothing like a shortcut

# Matthew 4:12-17
# 🌅 A New Light In Galilee
---
## ⛓️ Now When Jesus Had Heard That John Was Cast Into Prison

John the Baptist has now been arrested, likely by Herod Antipas.

"Cast into prison" means thrown in and held, not a short visit.

This news marks real danger for anyone preaching the same message John preached.

Jesus does not go into hiding after hearing it.

His next move is deliberate, not a retreat out of fear.

⛓️ Cast into prison means arrested and held

👑 Herod Antipas likely gave the order

⚠️ This news signals real danger

📖 Jesus moves forward, not into hiding

---

## 🗺️ He Departed Into Galilee

Galilee was a region north of Jerusalem, away from Herod's base of power.

This move was about timing, not escape.

Jesus begins his public ministry at the exact moment John's ends.

One voice calling Israel to repentance picks up right where the other left off.

Nothing about this timing was accidental.

🗺️ Galilee sat north, away from Herod's base

⏰ This move was about timing, not escape

🔄 One voice continues where the other stopped

📖 Nothing about this timing was accidental

---

## 🏡 And Leaving Nazareth, He Came And Dwelt In Capernaum

Nazareth was the small town where Jesus grew up.

Luke's Gospel records that Nazareth's own people rejected him early on.

Capernaum becomes his new home base for most of his Galilean ministry.

"Dwelt" means he settled there, not just passed through.

From here Jesus will reach crowds across the whole region.

🏠 Nazareth was the town where Jesus grew up

🚫 Nazareth's people rejected him early on

🏡 Capernaum became his new home base

📖 From here he reaches the whole region

---

## 📛 Which Is Upon The Sea Coast, In The Borders Of Zabulon And Nephthalim

"Zabulon" and "Nephthalim" are the old spellings of Zebulun and Naphtali.

These were two of the twelve tribal territories given to Israel's tribes.

Capernaum sat right along the border where both territories met.

This region had a mixed population, Jewish and Gentile, for centuries.

Matthew is about to show why that detail matters.

📛 Zabulon and Nephthalim are old tribal names

🗺️ Capernaum sat where both territories met

🌍 The region had a mixed population

📖 Matthew is about to show why that matters

---

## 📖 That It Might Be Fulfilled Which Was Spoken By Esaias The Prophet

"Esaias" is the Greek form of the name Isaiah.

Matthew often pauses the story to point out a prophecy being fulfilled.

This particular prophecy comes from Isaiah chapter nine.

Isaiah wrote it centuries earlier, long before Galilee fell under foreign rule.

Matthew wants his readers to see Jesus as the fulfillment Isaiah promised.

📜 Esaias is the Greek name for Isaiah

🔗 Matthew often points out fulfilled prophecy

⏳ Isaiah wrote this centuries earlier

📖 Jesus fulfills what Isaiah promised

---

## 🌍 The Land Of Zabulon, And The Land Of Nephthalim, By The Way Of The Sea, Beyond Jordan, Galilee Of The Gentiles

These two territories were the first conquered when Assyria invaded centuries earlier.

Many of their own people were carried off into exile after that invasion.

Foreign nations later settled in the land, mixing with whoever remained.

"Galilee of the Gentiles" became something of an insult among the religious elite.

Isaiah promised that this overlooked, mixed region would see light first, not last.

⚔️ Assyria conquered this region first

🌍 Foreign nations settled there afterward

👎 Religious leaders looked down on Galilee

📖 Isaiah promised light here first

---

## 💡 The People Which Sat In Darkness Saw Great Light

"Darkness" here pictures more than a lack of sunlight.

It means spiritual confusion, foreign rule, and a long silence from God.

"Great light" pictures the exact opposite breaking in without warning.

Isaiah promised this centuries before Jesus ever set foot in Capernaum.

Matthew says that promised light has finally arrived in this unlikely town.

🌑 Darkness pictures spiritual confusion and silence

💡 Great light pictures sudden hope breaking in

⏳ Isaiah promised this centuries earlier

📖 That promised light arrives in Capernaum

---

## 🌑 And To Them Which Sat In The Region And Shadow Of Death Light Is Sprung Up

"The shadow of death" pictures a place so dark it feels close to the grave.

This phrase doubles down on just how hopeless the region felt.

"Sprung up" means light suddenly appeared, like a plant breaking through the ground.

Nobody there was expecting rescue from this exact direction.

God's rescue plans rarely start where people expect them to.

💀 Shadow of death pictures deep hopelessness

🌱 Sprung up means light suddenly appeared

😮 Nobody expected rescue from here

📖 God's rescue rarely starts where expected

---

## 🚩 From That Time Jesus Began To Preach

Matthew marks this moment as a clear turning point in the story.

Up to now Jesus has been tested, not teaching in public.

This phrase signals that his public ministry has officially started.

Matthew uses this same kind of marker again later in the Gospel.

Everything before this verse was preparation for what comes next.

🚩 Matthew marks this as a turning point

🤫 Before now Jesus was tested, not teaching

📢 His public ministry officially starts here

📖 Everything before this was preparation

---

## 🔄 Repent: For The Kingdom Of Heaven Is At Hand

This is the exact same message John preached back in chapter three.

Jesus does not change the message, he carries it forward.

"Repent" still means turning around, changing direction completely.

"At hand" still means near, already breaking into the present moment.

The difference now is that the kingdom stands in front of them in person.

🔁 This matches John's message from chapter three

🔄 Repent means turning around completely

⏰ At hand means already breaking in

📖 The kingdom now stands in front of them

# Matthew 4:18-22
# 🎣 Calling The First Disciples
---
## 🌊 And Jesus, Walking By The Sea Of Galilee

The "Sea of Galilee" is actually a large freshwater lake, not an ocean.

It sat near the center of Jesus's ministry for the next few years.

Fishing was one of the main trades for families living along its shore.

Jesus does not call his first followers from a classroom or a temple.

He meets them in the middle of their ordinary workday.

🌊 The Sea of Galilee was a large lake

🎣 Fishing was a major local trade

👣 Jesus meets them during an ordinary day

📖 Ministry often begins in ordinary places

---

## 🪨 Saw Two Brethren, Simon Called Peter, And Andrew His Brother

Simon is his birth name, the one his family always used.

"Peter" is a nickname Jesus gives him later, meaning rock.

Matthew uses the name Peter here because that is how readers already know him.

Andrew is Simon's brother, mentioned by name right alongside him.

These two brothers will become some of Jesus's closest followers.

📛 Simon was his birth name

🪨 Peter means rock, a name Jesus gave him

👬 Andrew was Simon's brother

📖 Both become close followers of Jesus

---

## 🎣 Casting A Net Into The Sea: For They Were Fishers

"Casting a net" describes the physical work of throwing a weighted net into the water.

Fishing was hard, repetitive, physical labor, not a glamorous career.

These men were not religious scholars or people of high social standing.

Jesus builds his first team from ordinary working men.

That choice says something about who God tends to call.

🎣 Casting a net was hard, repeated work

👷 Fishers were ordinary working men

🚫 They held no special religious standing

📖 God often calls ordinary people

---

## 🚶 And He Saith Unto Them, Follow Me

In that culture, a student usually chose which teacher to follow.

Here Jesus reverses that pattern completely and does the choosing himself.

"Follow me" means far more than walking behind him on a road.

It means leaving your old life and old plans behind.

This simple invitation carries a complete change of direction inside it.

🎓 Students usually chose their own teacher

🔄 Jesus reverses that pattern here

🚶 Follow me means leaving your old life

📖 This invitation carries a full change

---

## 👥 And I Will Make You Fishers Of Men

Jesus takes the one skill these brothers already know and reshapes it.

"Fishers of men" means gathering people into God's kingdom instead of fish into a net.

This was not a job they could already picture themselves doing.

Jesus promises to shape them into something new over time.

He meets them exactly where they are and calls them further.

🎣 Jesus reshapes a skill they already have

👥 Fishers of men means gathering people

🌱 Jesus promises to shape them further

📖 He meets them where they are

---

## ⚡ And They Straightway Left Their Nets, And Followed Him

"Straightway" is an old word meaning immediately, without delay.

These nets were their entire livelihood, not a hobby on the side.

Walking away from them on the spot meant real financial risk.

There is no sign here of hesitation or bargaining.

Their response matches the size of what Jesus just asked.

⚡ Straightway means immediately, without delay

💰 Nets were their entire livelihood

🚫 There is no hesitation shown here

📖 Their response matched what was asked

---

## 👬 He Saw Other Two Brethren, James The Son Of Zebedee, And John His Brother

This is a second pair of brothers, separate from Simon and Andrew.

Zebedee is named here as their father, a working fisherman himself.

James and John will later become part of Jesus's closest inner circle.

Matthew introduces them by their family, the normal way people were identified.

Four fishermen now stand at the center of this growing story.

👬 This is a second pair of brothers

👨 Zebedee was their father, also a fisherman

⭐ James and John join his inner circle

📖 Four fishermen now anchor the story

---

## 🧵 In A Ship With Zebedee Their Father, Mending Their Nets

"Mending" means repairing torn or tangled nets after a day of use.

This was slow, patient, ordinary work, done again and again.

Jesus interrupts them in the middle of routine, unglamorous labor.

Nothing about this moment looked like the start of something historic.

God often steps into the most ordinary parts of a person's day.

🧵 Mending means repairing torn nets

🔁 This was slow, repeated, ordinary work

✨ Nothing looked historic in this moment

📖 God often steps into ordinary days

---

## 💔 And They Immediately Left The Ship And Their Father, And Followed Him

This time the cost includes leaving a father, not just a job.

"Immediately" matches the same instant response as the first two brothers.

Leaving the family business meant leaving their father without the help he needed.

Following Jesus here costs more than it did for Simon and Andrew.

The pattern across both callings is the same, total and immediate.

👨 This time they leave their father too

⚡ Immediately matches the first two brothers

💔 Leaving cost their father needed help

📖 The pattern stays total and immediate

# Matthew 4:23-25
# 🌍 Fame Spreads Across The Land
---
## 🕍 And Jesus Went About All Galilee, Teaching In Their Synagogues

A "synagogue" was a local Jewish meeting place for prayer and teaching.

Every town of any size had one, unlike the single temple in Jerusalem.

Jesus does not stay in one location, he travels constantly through the region.

Teaching in synagogues meant working inside the existing structure of Jewish worship.

His message starts inside familiar places before it ever reaches outsiders.

🕍 A synagogue was a local meeting place

🚶 Jesus traveled constantly through Galilee

📚 He taught inside familiar Jewish structures

📖 His message started inside, then spread out

---

## 📰 Preaching The Gospel Of The Kingdom

"Gospel" is an old word that simply means good news.

"The kingdom" refers to God's reign breaking into the world through Jesus.

This was the same core message John and Jesus both preached.

Preaching here means publicly announcing something, not quietly suggesting it.

The good news was that God's promised rule had finally arrived.

📰 Gospel means good news

👑 Kingdom means God's reign arriving

📢 Preaching means publicly announcing something

📖 God's promised rule had finally arrived

---

## 🩹 Healing All Manner Of Sickness And All Manner Of Disease Among The People

Matthew describes a pattern here, not a single isolated miracle.

Teaching, preaching, and healing all work together in Jesus's ministry.

"All manner" means every kind, without exception or limit.

These healings backed up his words with visible, physical proof.

People did not just hear about the kingdom, they watched it arrive.

🩹 This describes a repeated pattern

🗣️ Teaching, preaching, and healing work together

💯 All manner means every kind, no exception

📖 People watched the kingdom arrive

---

## 🗺️ And His Fame Went Throughout All Syria

Syria sat north of Galilee, outside the land of Israel itself.

This detail shows how far his reputation had already spread.

Word about Jesus was no longer staying inside Jewish territory alone.

"Fame" here simply means his reputation and the news about him.

Even this early, his reach was already bigger than one region.

🗺️ Syria sat north, outside Israel

📣 His reputation spread beyond Jewish territory

🌍 Fame here means his growing reputation

📖 His reach already outgrew one region

---

## 👻 Those Which Were Possessed With Devils, And Those Which Were Lunatick, And Those That Had The Palsy

"Possessed with devils" describes people controlled by evil spirits, not a figure of speech.

"Lunatick" is an old word, once linked to the moon, used to describe conditions similar to seizures.

"Palsy" describes paralysis or uncontrollable shaking in the body.

Matthew lists these conditions plainly, without softening how serious they were.

Jesus's healing reached every kind of suffering people brought to him.

👻 Possessed with devils means controlled by evil spirits

🌙 Lunatick was an old word for seizures

🦴 Palsy means paralysis or shaking

📖 His healing reached every kind of suffering

---

## 🏙️ There Followed Him Great Multitudes Of People From Galilee, And From Decapolis, And From Jerusalem, And From Judaea, And From Beyond Jordan

"Decapolis" means ten cities, a mostly Gentile region east of the Jordan River.

Matthew names five separate regions, stretching in nearly every direction.

This list shows people crossing real political and cultural lines to reach Jesus.

Jewish and Gentile crowds both show up in this same group.

The movement around Jesus was already far bigger than anyone expected.

🏙️ Decapolis means ten cities, mostly Gentile

🧭 Matthew names five separate regions

🤝 Jewish and Gentile crowds both came

📖 This movement grew bigger than expected
`.trim();

export const MATTHEW_FOUR_PERSONAL_SECTIONS = parseMatthewFourRawNotes(MATTHEW_FOUR_RAW_NOTES);
