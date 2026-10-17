export type HebrewsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsThirteenRawNotes(rawText: string): HebrewsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 13:${startVerse}` : `Hebrews 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Hebrews 13 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_THIRTEEN_RAW_NOTES = `# Hebrews 13:1-3
# 🤝 Let Brotherly Love Continue
---
## 🤝 Let Brotherly Love Continue

"Brotherly love" means the natural affection a family already shares.

The Greek word behind it is philadelphia, love between those in the same family.

This church had already suffered real persecution together.

The call now is to keep loving each other that same way.

That love was never meant to fade once the pressure lifted.

🤝 Brotherly love means family like affection
📜 Philadelphia is the Greek word used
😣 This church had suffered together before
📖 The bond was never meant to fade

## 🚪 Be Not Forgetful To Entertain Strangers

"Entertain" here does not mean putting on a show.

It means welcoming a traveler into your home for food and a safe place to sleep.

Inns in the ancient world were scarce, unsafe, and expensive.

Opening your own home was sometimes the only real option a traveler had.

Hospitality in this world was not a nice extra, it was survival.

🚪 Entertain means welcoming travelers into your home
🛏️ Inns were scarce, unsafe, and costly
🧳 A traveler often had nowhere else to go
📖 Hospitality here was survival, not a luxury

## 👼 Entertained Angels Unawares

This does not mean every visitor is secretly an angel.

It recalls two stories from Genesis.

Abraham and Lot both welcomed strangers into their homes.

Those strangers turned out to be angels in disguise.

Neither man knew that at the time.

Kindness to a stranger can matter more than anyone realizes in the moment.

👼 Not every visitor is a secret angel
📜 Genesis tells of Abraham and Lot
🚪 Both welcomed strangers into their homes
📖 Kindness can matter more than realized

## ⛓️ Remember Them That Are In Bonds

"Bonds" means being held in prison, often simply for following Christ.

The command is to remember them, not just to feel sorry from a distance.

The writer adds, as bound with them, picturing the reader sharing their same chains.

Christians who suffer adversity deserve that same kind of shared feeling.

Suffering for faith was never meant to be carried alone.

⛓️ Bonds means being held in prison
🤝 Remember means more than feeling sorry
🫂 As bound with them means shared chains
📖 Suffering for faith was not meant alone

# Hebrews 13:4-6
# 💍 Marriage Is Honourable In All
---
## 💍 Marriage Is Honourable In All

Marriage here receives full honor, not shame.

"The bed undefiled" means the marriage relationship itself is clean.

Some teachers in this world treated marriage and the body as somehow dirty.

This verse rejects that idea outright.

God will judge those who commit sexual sin outside marriage.

💍 Marriage receives full honor here
🛏️ The bed undefiled means marriage is clean
🚫 Some wrongly taught marriage was impure
📖 God judges sin committed outside marriage

## 🙏 Be Content With Such Things As Ye Have

Covetousness means always wanting more than what you already have.

It is not the same as working hard or planning for the future.

It is the restless feeling that present life is never enough.

The writer gives the opposite instead, contentment with what is already in hand.

A grateful heart does not need more to feel secure.

🙏 Covetousness means always wanting more
⚙️ It is not hard work or planning
😣 It is restlessness with what you have
📖 Gratitude needs nothing more to feel secure

## 🤲 I Will Never Leave Thee, Nor Forsake Thee

This exact promise was first given to Joshua, not written new here.

The writer quotes it straight from Deuteronomy and Joshua.

God's loyalty was never limited to one person or one generation.

The same promise now belongs to everyone trusting Christ.

A promise once spoken to one man became a promise for an entire people.

🤲 This promise first came to Joshua
📜 The writer quotes it from Deuteronomy
🌍 God's loyalty is not limited to one person
📖 One promise now belongs to every believer

## 💪 The Lord Is My Helper

This line is a direct quote from Psalm one hundred eighteen.

"Boldly" means speaking without fear of what people might do in return.

The confidence does not come from personal strength.

It comes from knowing who stands with the believer.

Fear of man loses its grip once a bigger protector is trusted.

💪 This quotes Psalm one hundred eighteen
🗣️ Boldly means speaking without fear
🙅 Confidence is not personal strength
📖 Trusting God removes the grip of fear

# Hebrews 13:7-9
# ⚓ Jesus Christ The Same Yesterday
---
## 👨‍🏫 Remember Them Which Have The Rule Over You

This refers to the church's own leaders and teachers.

Some of those original leaders may have already died by the time this letter was read.

The call is to remember how they lived, not just what they once said.

Their faith was proven by the whole shape of their lives.

A life well lived teaches longer than any single sermon.

👨‍🏫 Rule over you means church leaders
⚰️ Some leaders were likely already gone
🧭 Remember how they lived, not only taught
📖 A faithful life teaches longer than words

## 🏃 Whose Faith Follow

"Follow" here does not mean copying every detail of their lives.

It means imitating the direction their faith pointed toward.

"Considering the end of their conversation" means looking at how their whole life turned out.

A life that ends in faith is worth studying closely.

Faith is proven over years, not in a single moment.

🏃 Follow means imitate their direction
🔍 Not copying every detail of life
🏁 Consider how their whole life ended
📖 Faith is proven over a lifetime

## ⚓ Jesus Christ The Same Yesterday, And Today, And For Ever

Leaders come and go, but Christ never changes.

Yesterday points back to his earthly life and finished work on the cross.

Today means he is present and active right now.

For ever means that will never shift in the future.

Everything else in this chapter changes, this one fact does not.

⚓ Christ never changes, unlike leaders
📜 Yesterday points to his finished work
🕐 Today means he is active now
📖 This one fact never shifts

## 🍽️ Carried About With Divers And Strange Doctrines

"Divers" means various or many different kinds, not related to swimming.

Strange doctrines were ideas brought in from outside the original teaching.

One example named here is rules about certain foods, meats.

Grace, not diet, is what actually strengthens the heart.

A heart can be pulled off course by teaching that sounds spiritual but is not.

🍽️ Divers means many different kinds
🌀 Strange doctrines came from outside
🥘 One example was rules about food
📖 Grace strengthens the heart, not diet

# Hebrews 13:10-14
# 🏕️ Without The Camp
---
## 🙏 We Have An Altar

This altar is not a physical object sitting somewhere in a church.

It represents the sacrifice of Christ himself.

Old covenant priests had access to a physical altar and the offerings on it.

Believers now have access to something far greater than that altar ever provided.

The real altar was never made of stone.

🙏 This altar is not a physical object
✝️ It represents the sacrifice of Christ
🏛️ Old priests had only a stone altar
📖 The real altar was never made of stone

## 🚫 No Right To Eat Which Serve The Tabernacle

This refers to the priests who worked in the tabernacle.

Under the old system, priests ate portions of certain sacrifices as their own food.

But one sacrifice was never eaten by anyone, the sin offering on the Day of Atonement.

That one exception becomes the whole point of what follows.

The sacrifice that fed no one pointed toward Christ all along.

🚫 Priests could eat most sacrifices
🔥 One sacrifice was never eaten
📅 That was the Day of Atonement offering
📖 This exception points toward Christ

## 🔥 Burned Without The Camp

On the Day of Atonement, the bodies of the sin offering were burned completely.

That burning happened outside the camp, on ground considered unclean.

No priest offered that sacrifice at the altar inside the camp.

It was removed and destroyed instead.

The sin offering had to leave the holy space entirely.

🔥 The sin offering was burned outside camp
🚷 That ground was considered unclean
🏕️ It never reached the altar inside
📖 Sin had to leave the holy space

## ✝️ Jesus Also Suffered Without The Gate

Jesus was crucified outside the walls of Jerusalem, not inside the city.

That detail matches the old pattern exactly, the sin offering burned outside the camp.

Jesus became that same kind of offering, taken outside to the unclean ground.

The location was not an accident of history.

It fulfilled a pattern set centuries earlier.

✝️ Jesus was crucified outside Jerusalem's walls
🔥 This matches the sin offering pattern
📍 The location was never an accident
📖 It fulfilled what the old pattern pictured

## 🚶 Bearing His Reproach

"Reproach" here means public shame and disgrace.

Crucifixion outside the camp carried that same public shame Jesus endured.

"Going forth unto him" means choosing to leave safety behind too.

Believers are called to accept that same kind of rejection if it comes.

Following Christ sometimes means standing outside the comfortable crowd.

🚶 Reproach means public shame and disgrace
✝️ Jesus endured that shame outside the camp
🚪 Going forth means leaving safety behind
📖 Faith may mean standing outside the crowd

## 🏙️ Here Have We No Continuing City

No earthly city was ever meant to be a permanent home.

Every city believers knew, including Jerusalem itself, would eventually pass away.

"Seeking one to come" points toward a lasting home still ahead.

That search gives a different shape to ordinary life here.

A traveler does not unpack everything in a place they are only passing through.

🏙️ No earthly city was ever permanent
🏛️ Even Jerusalem itself would eventually fall
🏡 A lasting home is still ahead
📖 Life here is only a journey

# Hebrews 13:15-17
# 🙌 The Sacrifice Of Praise
---
## 🙌 The Sacrifice Of Praise

Old covenant worship centered on animal sacrifices offered again and again.

This new sacrifice is praise itself, spoken out loud to God continually.

"The fruit of our lips" means the words that come from a thankful mouth.

It replaces the smoke of an altar, not the sincerity behind it.

Worship now happens through a grateful voice, not a burning offering.

🙌 Old worship centered on animal sacrifice
🗣️ Praise itself becomes the new offering
💬 Fruit of lips means thankful words
📖 A grateful voice replaces the burning altar

## 🤝 To Do Good And To Communicate Forget Not

"Communicate" here means sharing what you have with someone in need.

It is not the modern idea of simply talking or texting.

Generosity itself is named as a kind of sacrifice to God.

Giving is worship just as much as singing or praying is.

God is well pleased by a shared meal as much as a sung hymn.

🤝 Communicate means sharing with those in need
💬 It is not about talking or texting
🎁 Generosity itself counts as a sacrifice
📖 A shared meal pleases God like a hymn

## 👂 Obey Them That Have The Rule Over You

"Obey" here does not describe blind submission to anyone claiming authority.

It refers to the church's own recognized leaders and teachers.

"Submit yourselves" means trusting their guidance even when it is uncomfortable.

That trust only makes sense because of what those leaders are doing for the church.

Good leadership earns that kind of trust, it does not demand it by force.

👂 Obey does not mean blind submission
👨‍🏫 It refers to the church's own leaders
🤝 Submit means trusting their guidance
📖 Good leadership earns trust, not force

## 👀 They Watch For Your Souls

"Watch" here pictures a shepherd staying alert all night for the safety of the flock.

Church leaders carry that same kind of responsibility for the people in their care.

"Give account" means they will one day answer to God for how they led.

That weight is meant to be carried with joy, not dread.

Supporting a leader well makes their hard work lighter, not heavier.

👀 Watch pictures a shepherd staying alert
🐑 Leaders carry that care for the flock
⚖️ They will give account to God
📖 Supporting leaders makes their work lighter

# Hebrews 13:18-21
# 🐑 The God Of Peace
---
## 🙏 Pray For Us

The writer now asks the readers to pray for him in return.

A good conscience means living with nothing hidden that needs to be covered up.

"Honestly" here points to the kind of life anyone could examine openly.

Leaders need prayer just as much as the people they serve.

No one is too far along in faith to need others praying for them.

🙏 The writer asks for prayer himself
🪞 A good conscience hides nothing
🔍 His life could be examined honestly
📖 No one outgrows the need for prayer

## 🏠 Restored To You The Sooner

This suggests the writer had visited this church before and been away since.

"Restored" means returning to them again, not meeting them for the first time.

"The sooner" shows a real, personal eagerness to come back.

This was not a distant theological essay written to strangers.

It was a letter from someone who genuinely missed them.

🏠 The writer had visited this church before
🔄 Restored means returning, not a first meeting
⏳ The sooner shows real personal eagerness
📖 This letter came from someone who missed them

## 🐑 That Great Shepherd Of The Sheep

This title for Jesus ties back to the shepherd image used earlier in the chapter.

A shepherd protects, guides, and knows each one of the sheep personally.

"Great shepherd" ranks Jesus above every human leader mentioned so far.

God brought him back from the dead to hold that title permanently.

Every human leader in this chapter serves under this one shepherd.

🐑 This ties back to the shepherd image
🛡️ A shepherd protects and guides the sheep
👑 Great shepherd ranks above every leader
📖 Every leader here serves under this shepherd

## 🩸 The Blood Of The Everlasting Covenant

This covenant was sealed by Jesus's own blood, not the blood of an animal.

"Everlasting" means this agreement will never need to be renewed or replaced.

Older covenants in the Bible required repeated sacrifices to stay in force.

This one was finished completely in a single death.

One sacrifice now covers what endless animal offerings never could.

🩸 Jesus's own blood sealed this covenant
♾️ Everlasting means it never needs renewal
🔁 Older covenants needed repeated sacrifices
📖 One sacrifice covers what many never could

## 🎯 Make You Perfect In Every Good Work

"Perfect" here does not mean flawless or without any mistakes.

It means fully equipped and complete for the work God has given.

This closing prayer asks God to supply whatever is still missing.

The goal is a life that actually does God's will, not just hears about it.

Glory belongs to God both for starting and finishing that work.

🎯 Perfect here means fully equipped
🧰 Not flawless, but complete for the task
🙏 This prayer asks God to supply the rest
📖 Glory belongs to God for finishing the work

# Hebrews 13:22-25
# ✉️ Grace Be With You All
---
## 📜 Suffer The Word Of Exhortation

"Suffer" here means to patiently bear with or accept something.

"Exhortation" means a strong, encouraging appeal, not a harsh lecture.

The writer calls this whole letter few words, surprisingly short for how much ground it covers.

That shows real confidence that the readers would actually take it in.

A short letter can still carry a heavy weight of truth.

📜 Suffer means patiently bearing with something
💬 Exhortation means a strong encouraging appeal
📏 The writer calls this letter few words
📖 A short letter still carries real weight

## 🔓 Our Brother Timothy Is Set At Liberty

Timothy was a close companion of the writer, mentioned often in Paul's letters.

"Set at liberty" suggests Timothy had recently been released from some kind of imprisonment.

The details of that imprisonment are never explained anywhere in scripture.

His release was still recent and personal news worth sharing.

Even an unnamed hardship like this one was real for the people living it.

🔓 Timothy had just been released
⛓️ He was likely imprisoned before this
❓ Scripture never explains the details
📖 Real hardship often goes unrecorded in full

## 🇮🇹 They Of Italy Salute You

This line gives a clue about where the letter was written.

"Italy salute you" could mean Italians traveling abroad sent greetings home.

It could also mean the writer was writing from inside Italy itself.

Scholars still debate exactly where this letter came from.

The greeting itself still carried real affection across the distance.

🇮🇹 This line hints at the letter's origin
✈️ Italians abroad may have sent greetings
🏛️ Or it was written from inside Italy
📖 The real origin is still debated today

## 👋 Salute All Them That Have The Rule Over You

"Salute" here means a warm greeting sent through the letter itself.

The writer greets both the leaders and all the saints by name.

No one in the church is left out of this closing word.

Even a short goodbye named every single person as worth mentioning.

A real community leaves no one out of its closing greeting.

👋 Salute means a warm sent greeting
👥 Both leaders and all the saints
✅ No one is left out here
📖 A real community greets everyone equally

## 🙏 Grace Be With You All

This final line is the same kind of blessing found at the end of nearly every New Testament letter.

"Grace" means God's favor given freely, not something anyone has to earn.

The letter opened by describing who God is through his Son.

It closes by simply wishing that same gift onto every reader.

A letter built entirely on grace ends exactly where it began.

🙏 This closing echoes every New Testament letter
🎁 Grace means favor that is never earned
🔄 The letter opens and closes on grace
➡️ The whole letter ends where it began
`.trim();

export const HEBREWS_THIRTEEN_PERSONAL_SECTIONS = parseHebrewsThirteenRawNotes(HEBREWS_THIRTEEN_RAW_NOTES);
