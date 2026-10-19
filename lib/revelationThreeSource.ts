export type RevelationThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationThreeRawNotes(rawText: string): RevelationThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 3:${startVerse}` : `Revelation 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 3 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_THREE_RAW_NOTES = `# Revelation 3:1-3
# 💀 A Living Name, A Dead Church
---
## 🏛️ The Angel Of The Church In Sardis

Sardis was once the proud capital of the ancient kingdom of Lydia.

Its kings grew wealthy from gold found in a nearby river.

By the time this letter was written the city had fallen from that former glory.

Rome still counted Sardis among its major cities, but its best days were behind it.

🏛️ Sardis was once Lydia's wealthy capital

🥇 Gold from a nearby river built its fame

📉 Its best days were already gone

📖 A city living on past glory

---
## 💀 A Name That Thou Livest, And Art Dead

Sardis had a reputation that no longer matched its reality.

The church looked alive from the outside.

It still held regular meetings and had a good name in the city.

Christ sees straight through the reputation to the real condition underneath.

He names that condition plainly.

The church was dead.

💀 A reputation no longer matching reality

👀 The church looked alive outside

🪦 Christ names its real condition

📖 Looking alive is not the same as living

---
## 👁️ Be Watchful

To be watchful means staying alert instead of getting comfortable.

Sardis sat on a high, steep hill that seemed impossible to attack.

The city had actually fallen to enemy armies twice in its history.

Both times, enemy soldiers found an unguarded path up the cliff.

The city's own defenders had grown careless and stopped watching.

👁️ Watchful means staying alert

⛰️ Sardis sat on a steep hill

🗝️ Enemies found it twice unguarded

📖 Comfort can lead to disaster

---
## 🕯️ The Things Which Remain, That Are Ready To Die

Some faith in this church was still barely alive, though most of it had already faded.

Christ calls them to strengthen whatever little was left before it disappeared too.

Not every dying thing has to be allowed to finish dying.

God does not give up on a congregation only partly gone.

🕯️ Faith barely alive still remained

🌱 Some practices had not fully died

💪 Christ calls them to strengthen it

📖 Partial faith is still worth saving

---
## ✅ Hold Fast, And Repent

Christ gives Sardis three clear commands here.

Remember what they first received and heard.

Hold fast means grip tightly to the truth instead of letting it slip.

Repent means to turn around and change direction completely.

✅ Three clear commands given to Sardis

🧠 Remember what they first received

✊ Hold fast means grip tightly

➡️ Repent means turning around completely

---
## 🗝️ I Will Come On Thee As A Thief

A thief gives no warning before breaking in.

Christ uses this image to describe a sudden, unannounced arrival.

Sardis had already lost its own city twice to surprise attacks.

This warning was not abstract to them.

It matched their own history exactly.

🗝️ A thief gives no warning

🌙 Christ pictures a sudden arrival

⛰️ Sardis had fallen this way twice

📖 History and warning match exactly

# Revelation 3:4-6
# 🤍 Those Who Have Not Defiled Their Garments
---
## 👕 Which Have Not Defiled Their Garments

To defile a garment means to make it dirty or stained.

Clothing stood for a person's conduct and reputation in this culture.

Clean clothes pictured a clean, faithful life.

A small group inside Sardis had stayed faithful even as the rest of the church faded.

👕 Defiled means stained or dirtied

🧥 Clothing pictured conduct and reputation

🤍 Clean clothes pictured a faithful life

📖 A few stayed faithful inside a dying church

---
## 🚶 They Shall Walk With Me In White, For They Are Worthy

Walking with someone pictures close companionship, not just standing nearby.

White clothing pictured victory and honor in the ancient world.

Winners in public festivals and triumphant armies were often dressed in white.

Christ promises this small faithful group that kind of honored, close friendship with Him.

🚶 Walking pictures close companionship

🤍 White pictured victory and honor

🏆 Winners and armies wore white

📖 Christ promises close friendship with Him

---
## 🙌 He That Overcometh

Overcoming does not mean living a flawless life without any failure.

It means holding on to real faith through real pressure, all the way to the end.

This same phrase closes every one of the seven letters in these two chapters.

Each church receives a different reward attached to this same promise.

🙌 Overcomer language closes all seven letters

💪 It does not mean a perfect life

🔥 It means faith enduring real pressure

📖 Each church gets its own reward

---
## 🤍 Clothed In White Raiment

Raiment is simply an old word for clothing.

Sardis was actually famous across the Roman world for its wool and dyed fabric trade.

A church known for producing fine, dyed clothing is promised clothing it cannot manufacture itself.

Only Christ can provide a life that is truly clean.

🤍 Raiment is an old word for clothing

🧵 Sardis was famous for dyed wool

👕 They could not produce clean lives

📖 Only Christ provides true purity

---
## 📜 I Will Not Blot Out His Name Out Of The Book Of Life

Ancient cities kept registers listing every citizen by name.

If someone was convicted of a serious crime, officials would strike their name from that list.

Being blotted out meant losing citizenship and every right that came with it.

Christ promises His people will never be struck from His own record.

📜 Cities kept written registers of citizens

✂️ Criminals were struck from that list

🚫 Blotted out meant losing all rights

📖 Christ's people are never struck off

---
## 🙏 I Will Confess His Name Before My Father

To confess someone's name here means to openly claim them as your own.

Christ promises to publicly acknowledge His faithful ones in front of God Himself.

This happens in front of the angels too, not in secret.

Public loyalty on earth is met with public acknowledgment in heaven.

🙏 Confess means openly claiming someone

👑 Christ acknowledges them before God

👼 Angels witness this acknowledgment too

📖 Earthly loyalty is met in heaven

# Revelation 3:7-9
# 🔑 The Key Of David
---
## 🌆 The Angel Of The Church In Philadelphia

Philadelphia's own name means brotherly love.

It sat on a trade route at the base of a mountain range prone to earthquakes.

The city was smaller and weaker than wealthy neighbors like Sardis.

Of all seven letters, this one and Smyrna's receive no correction at all.

🌆 Philadelphia's name means brotherly love

🏔️ It sat in an earthquake prone region

💪 It was smaller than wealthy neighbors

📖 This church receives no correction

---
## ✝️ He That Is Holy, He That Is True

These two titles describe God's own character, applied directly to Christ.

Holy means set apart, completely different from anything sinful or common.

True means fully reliable, never misleading or false.

Christ introduces Himself to a weak church with His own strongest qualities.

✝️ Holy and true describe God Himself

🌟 Holy means set apart from sin

🎯 True means fully reliable always

📖 Strength is introduced to a weak church

---
## 🔑 The Key Of David

A key here pictures authority to control access, not a literal object.

This phrase echoes Isaiah's description of a royal steward named Eliakim.

That steward held the one key that decided who entered the king's court.

Christ claims that same complete authority over entry into God's kingdom.

🔑 A key pictures controlling authority

📜 This echoes Isaiah's royal steward Eliakim

🚪 That steward controlled entry to court

📖 Christ controls entry to God's kingdom

---
## 🚪 He That Openeth, And No Man Shutteth

No official, no enemy, and no circumstance can override Christ's decision here.

If He opens a door for someone, nothing can close it again.

Philadelphia had lived through forces it could not control, like earthquakes and shifting borders.

Here, finally, is a decision no one else has the power to reverse.

🚪 Total control over one door

🛡️ Nothing can override Christ's decision

🔓 An opened door stays open

📖 Philadelphia could rest in that certainty

---
## 🛣️ An Open Door, And No Man Can Shut It

Philadelphia sat at a crossroads on a major trade road, a true gateway city.

An open door here pictures a wide opportunity for the gospel to spread outward.

No opposition, no matter how determined, can close an opportunity God Himself has opened.

A small church is handed a door bigger than its own size.

🚪 An open door pictures gospel opportunity

🛣️ Philadelphia sat on a trade crossroads

🛡️ No opposition can close God's door

📖 A small church gets a big door

---
## 💪 Thou Hast A Little Strength

Christ does not criticize this church for being small or weak.

Having little strength is stated here as a simple fact, not a failure.

Philadelphia used whatever little it had faithfully instead of giving up.

God often works through what looks too small to matter.

💪 Little strength is stated as fact

🙅 It is not named as failure

🔥 They used their little faithfully

📖 God works through what seems small

---
## 🗣️ Hast Not Denied My Name

Denying Christ's name would have meant publicly disowning Him under pressure.

Philadelphia faced real opposition from the group mentioned in the next verse.

They kept confessing Christ openly instead of staying quiet to avoid trouble.

Quiet, steady faithfulness under pressure is exactly what Christ commends here.

🗣️ Denying means disowning Christ publicly

⚔️ Real opposition pressured this church

✅ They kept confessing Him openly

📖 Christ commends steady faithfulness

---
## 🏛️ The Synagogue Of Satan

A local Jewish group opposed and harassed this church regularly.

They are not condemned here for being Jewish.

They are condemned for falsely claiming to represent God while opposing His Messiah.

Christ promises these opponents will one day recognize that He truly loved Philadelphia.

🏛️ Names a group that harassed them

🙅 Not condemned for being Jewish

🎭 Condemned for a false claim

📖 Christ promises a day of recognition

# Revelation 3:10-13
# 🏛️ A Pillar That Cannot Fall
---
## 🙏 The Word Of My Patience

Christ is not describing a command here but a quality Philadelphia had already shown.

They had patiently endured hardship while staying faithful, the same way Christ Himself endured.

Because they kept that patient endurance, Christ promises to keep them through what is coming.

Faithful waiting is never wasted, even when it feels invisible.

🙏 Patience here means faithful endurance

🔁 They endured the way Christ did

🛡️ Christ promises to keep them too

📖 Faithful waiting is never wasted

---
## 🌍 The Hour Of Temptation, Which Shall Come Upon All The World

A coming season of testing reaches far beyond one city.

It is aimed at everyone living on the earth, not just this church.

Philadelphia is promised protection through that wider trial, not an escape from history itself.

God's promise to one small church reaches into something much larger.

🌍 A worldwide season of testing is coming

🧍 It touches everyone on earth

🛡️ Philadelphia is kept through it

📖 One church's promise reaches further

---
## ⏳ Behold, I Come Quickly

This does not promise Christ would return within days or weeks of this letter.

Quickly here means suddenly and without warning, not immediately on a calendar.

The point is readiness, not a timestamp to calculate.

A church that expects Him at any moment lives differently than one that does not.

⏳ Quickly means suddenly, not immediately

🚫 This is not a timestamp

👀 The point is staying ready

📖 Expecting Him changes how a church lives

---
## 👑 That No Man Take Thy Crown

This crown is not a king's crown.

It pictures the wreath given to a winner at the end of a race or contest.

The crown was already promised to Philadelphia if they simply kept holding on.

Losing it would not come from Christ taking it back, but from letting go too soon.

👑 Not a king's crown here

🏅 It pictures a winner's wreath

✊ The crown was already theirs

📖 Letting go loses it, not Christ

---
## 🏛️ A Pillar In The Temple Of My God

Philadelphia sat in a region shaken by frequent, destructive earthquakes.

Historians recorded a massive quake that devastated this very city.

Pillars were often the only structures left standing after the ground settled again.

Christ promises this shaken church a permanence no earthquake can touch.

🏛️ Philadelphia faced frequent destructive earthquakes

🏗️ Pillars often survived when buildings fell

🪨 Christ promises lasting permanence

📖 No earthquake can shake this promise

---
## 🚪 He Shall Go No More Out

Earthquakes had forced this city's people to evacuate more than once in its history.

Fear of another quake kept many residents camping outside instead of trusting their own homes.

Christ promises a stability His people never had before.

No evacuation, no exile, no forced leaving ever again.

🚪 Earthquakes forced repeated evacuations before

⛺ Residents feared living in the city

🏠 Christ promises permanent stability instead

📖 No forced leaving, ever again

---
## 🏙️ The City Of My God, Which Is New Jerusalem

New Jerusalem reappears later in Revelation with much greater detail than this first mention.

Here it pictures God's own dwelling place coming down to join His people completely.

Having God's name written on someone marks them as belonging to Him permanently.

A new name here pictures a brand new identity, not just a label.

🏙️ New Jerusalem reappears later in Revelation

🏠 It pictures God's dwelling descending

✍️ God's name marks lasting belonging

📖 A new name means a new identity

# Revelation 3:14-18
# 🌡️ Neither Cold Nor Hot
---
## 🏦 The Angel Of The Church Of The Laodiceans

Laodicea was one of the wealthiest banking centers in the entire region.

An earthquake once leveled the city, and its citizens rebuilt it entirely with their own money.

They famously refused financial help from Rome afterward, proud of their own self sufficiency.

That same pride becomes the whole problem in this letter.

🏦 Laodicea was a wealthy banking center

🏗️ They rebuilt after an earthquake alone

🚫 They refused help from Rome

📖 That pride becomes this letter's problem

---
## ✝️ The Amen, The Faithful And True Witness

Amen is normally a word people say at the end of a prayer.

Here Christ uses it as His own title, meaning utterly reliable and true.

He calls Himself a faithful and true witness, someone whose testimony cannot be doubted.

A church full of empty words is addressed by the one whose word never fails.

✝️ Amen usually ends a prayer

🎯 Here it names Christ as reliable

📜 A witness means testimony that holds

📖 His word never fails, unlike theirs

---
## 🌱 The Beginning Of The Creation Of God

This title does not mean Christ was the first thing God created.

It names Him as the source and ruler over everything that was made.

The same idea opens the Gospel of John, where all things are made through Him.

Laodicea needed reminding that their own wealth did not create itself.

🌱 Not the first created thing

👑 Christ is the source of creation

💰 Their wealth did not create itself

📖 John's Gospel teaches the same truth

---
## 🌡️ Neither Cold Nor Hot

Laodicea had no local water source of its own.

Water arrived through a long pipe from hot springs several miles away.

By the time it reached the city, it had gone lukewarm and tasted unpleasant.

Nearby Colosse had cold mountain water, and Hierapolis had hot healing springs, both useful in their own way.

Laodicea's water was useful for neither, just like its faith.

🌡️ No local water source existed

🚰 Water arrived lukewarm through long pipes

🥤 Lukewarm water tasted genuinely unpleasant

📖 Their faith matched their water

---
## 🤢 I Will Spue Thee Out Of My Mouth

Spue is an old word for spitting something out.

Lukewarm water from that pipe was the kind of water people actually spat out.

Christ uses the exact local picture Laodicea would recognize immediately.

A faith with no real conviction is just as unwanted as that water was.

🤢 Spue is an old word for spitting

🚰 Lukewarm water got spat out locally

🎯 Christ uses their own local picture

📖 Half hearted faith is unwanted too

---
## 💰 I Am Rich, And Increased With Goods

Laodicea actually believed this about itself completely.

Banking, wool, and medicine had made the city genuinely wealthy.

Their self image and their bank account matched perfectly.

The problem was never their money.

It was believing money meant they had everything they needed.

💰 This matched their actual self image

🏦 Banking and trade made them wealthy

🚫 Money itself was not the problem

📖 The problem was believing it was enough

---
## 😢 Wretched, And Miserable, And Poor, And Blind, And Naked

Christ lists five words describing Laodicea's real spiritual condition.

Every single word directly contradicts how the church described itself one verse earlier.

They called themselves rich, Christ calls them poor.

They saw themselves clearly, Christ calls them blind.

Wealth in the bank said nothing true about the state of their souls.

😢 Five words describe their real condition

🙃 Each word contradicts their self image

💰 Rich outside, poor on the inside

📖 Money said nothing about their souls

---
## 🤍 White Raiment, That Thou Mayest Be Clothed

Laodicea was famous for producing fine black wool, prized across the region.

Christ offers them white clothing instead, the exact opposite of their famous export.

White here pictures a clean, honest life instead of a wealthy reputation.

The thing they were known for selling was not the thing they actually needed.

🤍 White is the opposite of their export

🐑 They were famous for black wool

✨ White pictures an honest clean life

📖 Fame in trade was not what they needed

---
## 👁️ Anoint Thine Eyes With Eyesalve, That Thou Mayest See

Laodicea was home to a well known medical school famous for treating eyes.

Eyesalve made there was shipped out and sold across the empire.

Christ tells a city that exported eye medicine that it could not see its own condition.

Spiritual blindness can hide behind real skill and real success.

👁️ Laodicea had a famous eye school

📦 Their eyesalve was sold everywhere

🙈 They could not see their own state

📖 Skill and success can still hide blindness

# Revelation 3:19-22
# 🚪 Christ Knocking At The Door
---
## 💔 As Many As I Love, I Rebuke And Chasten

This does not mean Christ's rebuke replaces His love.

Rebuke means pointing out a fault directly, without softening it.

Chasten means discipline meant to correct, not punishment meant to destroy.

A parent who truly loves a child still corrects them firmly.

Christ's harsh words in this letter are proof of His love, not its absence.

💔 Rebuke and love are not opposites

🗣️ Rebuke means naming a fault directly

🛠️ Chasten means correcting, not destroying

📖 Harsh words here prove real love

---
## 🔥 Be Zealous Therefore, And Repent

Zealous means pursuing something with real energy and urgency.

This is the exact opposite of the lukewarm condition described earlier in the letter.

Christ is not asking for an emotional performance.

He is asking Laodicea to actually care again about what it had stopped caring about.

🔥 Zealous means real energy and urgency

🌡️ It opposes the lukewarm condition

🎭 Not an emotional performance

📖 Christ asks them to care again

---
## 🚪 Behold, I Stand At The Door, And Knock

This is one of the most quoted lines in the whole Bible.

In this culture, a guest never forced their way inside uninvited.

They stood at the door and waited to be welcomed in by the one living there.

Christ pictures Himself as a patient guest outside His own church's door.

The door in this picture belongs to Laodicea, and only they can open it.

🚪 Guests waited outside to be welcomed

🤝 Christ pictures Himself as a patient guest

🏠 The door belongs to the church

📖 Only they can choose to open it

---
## 🍽️ I Will Come In To Him, And Will Sup With Him

Sharing a meal in this culture meant far more than simply eating together.

It signaled close friendship, trust, and acceptance between host and guest.

Christ does not just want to visit for a moment.

He wants an ongoing, shared life with whoever opens the door.

🍽️ Sharing a meal meant deep trust

🤝 It signaled real friendship and acceptance

🏠 Christ wants more than a visit

📖 He wants an ongoing shared life

---
## 👑 To Sit With Me In My Throne

This is the highest reward offered in any of the seven letters.

Christ promises to share His own ruling authority with those who overcome.

No earthly throne in this chapter compares to the one being offered here.

A lukewarm church is offered a seat beside the King.

👑 The highest reward of all seven letters

🤝 Christ shares His own authority

🏆 No earthly throne compares to this

📖 Offered a seat beside the King

---
## ⚔️ Even As I Also Overcame

Christ does not ask His people to do something He never did Himself.

He faced real suffering, rejection, and death before His own victory.

The throne He now offers came after His own real struggle, not instead of it.

Every promise to overcomers is backed by His own example first.

⚔️ Christ faced real suffering first

🩸 His victory came after real struggle

🤝 He asks nothing He did not do

📖 His example backs every promise

---
## 👂 He That Hath An Ear, Let Him Hear

The same line closes every one of the seven letters in these two chapters.

Each letter was addressed to one specific church by name.

This closing line widens that message to every church reading it afterward.

What one church needed to hear was meant for all of them to hear.

👂 This line closes all seven letters

✉️ Each letter named one specific church

🌍 This widens the message to everyone

📖 One church's letter speaks to all
`.trim();

export const REVELATION_THREE_PERSONAL_SECTIONS = parseRevelationThreeRawNotes(REVELATION_THREE_RAW_NOTES);
