export type SecondSamuelSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelSevenRawNotes(rawText: string): SecondSamuelSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 7:${startVerse}` : `2 Samuel 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 7 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_SEVEN_RAW_NOTES = `
# SecondSamuel 7:1-3
# 🏡 See Now, I Dwell In An House Of Cedar
---
## 🏡 When The King Sat In His House

David is no longer living as a fugitive or a soldier in the field.

He is finally settled, safe, and secure in Jerusalem.

Years earlier he ran from cave to cave hiding from Saul.

Now he sits inside his own house as an established king.

That change of scene sets up everything David is about to feel.

🏡 David is finally settled and secure
🏃 He once fled from cave to cave
👑 He now reigns as an established king
📖 A quiet moment brings a big idea

## 🕊️ The Lord Had Given Him Rest Round About From All His Enemies

"Rest" here does not just mean a nap or a pause.

It means the fighting has genuinely stopped on every side.

Moses had said Israel could not build a permanent house for God yet.

That could only happen after rest like this arrived.

David's next thought grows directly out of this rest.

🕊️ Rest means the fighting has stopped
🗺️ Enemies no longer threaten on any side
📜 Deuteronomy tied this rest to worship
📖 Rest opens the door to a bigger plan

## 📜 Nathan The Prophet

Nathan appears here for the first time in the Bible.

He serves as God's messenger to David throughout his reign.

Nathan will speak both blessing and hard correction to the king over the years.

This first appearance shows him simply agreeing with David's plan.

Later chapters show a very different side of Nathan.

📜 Nathan appears here for the first time
🗣️ He serves as God's messenger to David
⚖️ He later brings hard correction too
📖 This is only his first appearance

## 🌲 I Dwell In An House Of Cedar

Cedar wood was imported from Lebanon at great expense.

It was strong, fragrant, and reserved for the wealthiest kind of building.

David is describing his own palace, not a modest house.

The contrast he is about to draw could not be more obvious.

🌲 Cedar was expensive imported wood
💰 It marked the wealthiest kind of building
🏰 David is describing his own palace
📖 A sharp contrast is coming

## ⛺ The Ark Of God Dwelleth Within Curtains

"Curtains" refers to the tent David pitched for the ark back in chapter six.

God's presence still sits inside simple fabric walls.

David's palace is cedar and stone.

God's dwelling place is still cloth.

That gap between the two homes bothers David deeply.

⛺ Curtains means the tent from chapter six
🏰 David's house is cedar and stone
🧵 God's house is still cloth
📖 The gap between them troubles David

## ✅ Go, Do All That Is In Thine Heart

Nathan answers David immediately, without asking God first.

This is Nathan speaking his own good opinion, not a prophetic word yet.

The next verse will show that timing matters here.

Even a godly prophet can speak too quickly.

✅ Nathan answers right away
🗣️ This is Nathan's own opinion here
⏳ It is not yet a word from God
📖 Even a prophet can speak too soon

# SecondSamuel 7:4-7
# ❓ Shalt Thou Build Me An House
---
## 🌙 That Night, That The Word Of The Lord Came Unto Nathan

God corrects Nathan the very same night he gave his advice.

Nathan had spoken quickly, without asking the Lord first.

God does not let the wrong answer stand for even one full day.

This shows how fast a good intention can miss God's actual plan.

🌙 God speaks the very same night
⏳ Nathan had not asked first
🛑 God corrects the error quickly
📖 Good intentions can still miss God's plan

## ❓ Shalt Thou Build Me An House For Me To Dwell In

This question is not really a question.

God already knows the answer is no.

He is gently exposing that David's plan was never actually His idea.

The rest of the chapter turns this question completely around.

❓ God already knows the answer
🔄 He is exposing whose idea this was
🎯 The question redirects the whole plan
📖 God turns David's plan around

## 🙇 My Servant David

God calls David "my servant" even though David is a reigning king.

The title has nothing to do with rank or throne.

It describes David's relationship to God, not his job title.

The most powerful man in Israel is still just a servant to God.

🙇 Servant describes a relationship, not a rank
👑 David is a king and still a servant
🎯 Status never outranks belonging to God
📖 The greatest king is still God's servant

## 🐑 Since The Time That I Brought Up The Children Of Israel Out Of Egypt

God is measuring time all the way back to the Exodus.

That event happened about four hundred years before this chapter.

For that entire span, God chose not to live in a fixed building.

This was never an oversight.

It was a deliberate choice made for centuries.

🐑 God measures back to the Exodus
⏳ That is about four hundred years
🏠 God chose not to have a fixed home
📖 This was a deliberate, long choice

## ⛺ Walked In A Tent And In A Tabernacle

A tent could be picked up and moved at any time.

God intentionally stayed mobile with His people through the wilderness and beyond.

He never asked to be boxed into one location.

His presence traveled with Israel instead of waiting for them to come to Him.

⛺ A tent could move at any time
🚶 God stayed mobile with His people
📦 He was never boxed into one place
📖 His presence traveled with Israel

## 🐑 Whom I Commanded To Feed My People Israel

"Feed" here means to shepherd and lead, not just to give food.

God is talking about the judges who led Israel before the kings.

Their job was to guide and protect the people like a shepherd guides sheep.

God chose that image on purpose for how He wanted Israel led.

🐑 Feed means to shepherd and lead
⚖️ This points to the judges before the kings
🧑‍🤝‍🧑 Their job was to guide and protect
📖 God chose the shepherd image on purpose

## 🌲 Why Build Ye Not Me An House Of Cedar

God asks this question to make a point, not because He is upset.

He never once complained about living in a tent.

He never sent word through any judge asking for a cedar house.

The idea of a temple was entirely David's, not God's demand.

🌲 God never complained about the tent
🚫 He never asked for a cedar house
💡 This idea was David's, not God's
📖 God is making a point, not a complaint

# SecondSamuel 7:8-11
# 🐑 From The Sheepcote To The Throne
---
## 🐑 I Took Thee From The Sheepcote, From Following The Sheep

A sheepcote was a simple pen where sheep were kept at night.

David spent his early years there as the youngest son, an ordinary shepherd boy.

God is reminding David exactly where he started.

Nothing about David's rise to power was David's own doing.

🐑 A sheepcote was a simple sheep pen
👦 David started as an ordinary shepherd boy
⬆️ His rise was not his own doing
📖 God reminds him where he began

## 👑 To Be Ruler Over My People, Over Israel

God chose David personally for this role.

The nation belongs to God first, David second.

"My people" is repeated on purpose in this verse.

David rules, but he does not own what he rules.

👑 God chose David personally
🏷️ God calls Israel "my people" twice
🤝 David rules but does not own Israel
📖 Leadership here still belongs to God

## 🧭 I Was With Thee Whithersoever Thou Wentest

"Whithersoever" is an old word that simply means wherever.

God is describing the years David spent running from Saul.

Caves, foreign lands, and battlefields all counted.

God's presence did not depend on David's circumstances changing first.

🧭 Whithersoever means wherever
🏃 This covers David's years running from Saul
🕳️ Caves and battlefields were included
📖 God's presence never depended on comfort

## 🌟 Have Made Thee A Great Name, Like Unto The Name Of The Great Men

This promise echoes what God once told Abraham in Genesis twelve.

God had promised to make Abraham's name great too.

David's rise connects him to that much older promise.

God's pattern of blessing runs in a straight line through Israel's history.

🌟 This echoes God's promise to Abraham
📜 Genesis twelve made the same kind of promise
🔗 David connects to that older promise
📖 God's blessing follows a consistent pattern

## 🌱 I Will Appoint A Place For My People Israel, And Will Plant Them

"Plant" pictures something taking root and staying, not something temporary.

God is promising Israel a permanent homeland, not another season of wandering.

The image is deliberate.

A planted thing grows stronger the longer it stays put.

🌱 Plant means taking root permanently
🏡 This promises a permanent homeland
🚫 No more wandering seasons
📖 A planted people grows stronger over time

## 🛡️ Neither Shall The Children Of Wickedness Afflict Them Any More

"Children of wickedness" refers to hostile nations and raiders, not literal children.

Israel had suffered repeated attacks throughout the time of the judges.

God promises that pattern of suffering will not continue.

This promise depends on trusting God, not on Israel's own strength.

🛡️ Children of wickedness means hostile raiders
⚔️ Israel suffered repeated attacks under the judges
🕊️ God promises that pattern will end
📖 The promise rests on God, not Israel's strength

## 🏠 He Will Make Thee An House

This is the turning point of the whole chapter.

David wanted to build God a house made of cedar and stone.

God flips the plan completely around.

Instead, God will build David a house made of descendants and a lasting throne.

🏠 David wanted to build God a house
🔄 God flips the plan around
👨‍👩‍👧‍👦 God will build David a house of descendants
📖 The greater gift comes from God, not David

# SecondSamuel 7:12-17
# ♾️ The Everlasting Covenant
---
## 😴 Thou Shalt Sleep With Thy Fathers

This is a common Old Testament way of saying someone will die.

It pictures death as a peaceful rest, joining ancestors who died before.

The phrase carries no violence or tragedy in itself.

God is simply marking the natural end of David's own lifetime.

😴 Sleep with thy fathers means death
🕊️ It pictures death as peaceful rest
👴 It joins someone to earlier ancestors
📖 This marks the natural end of David's life

## 👶 I Will Set Up Thy Seed After Thee, Which Shall Proceed Out Of Thy Bowels

"Seed" here means a literal son, not just a general descendant.

"Proceed out of thy bowels" is an old way of saying born from David's own body.

This first points to Solomon, David's actual son and successor.

The promise starts specific before it grows into something much bigger.

👶 Seed means a literal son
🧬 This is David's own biological child
👑 Solomon is the first fulfillment
📖 A specific promise grows into a larger one

## 👑 I Will Establish His Kingdom

God promises stability for the next generation before David even asks.

Kingdoms in this era rarely survived a change in ruler smoothly.

Rivals and rebellions often tore a kingdom apart at that exact moment.

God guarantees David's son will not face that same danger.

👑 God promises stability for the next king
⚔️ Successions were often violent in this era
🛡️ God removes that danger for Solomon
📖 God secures what David could not guarantee

## 🏛️ He Shall Build An House For My Name

This directly answers David's original wish from the start of the chapter.

Solomon, not David, will be the one to build the temple.

"For my name" means the building represents God's own reputation and presence.

The house David wanted to build finally gets built, just not by him.

🏛️ Solomon will build the temple, not David
🔄 This answers David's opening wish
🏷️ For my name means it represents God Himself
📖 The house gets built, just later

## ♾️ I Will Stablish The Throne Of His Kingdom For Ever

"Stablish" is an old spelling of establish.

"For ever" appears three separate times across these six verses.

That repetition is not an accident.

God is making an unusually strong, permanent promise here.

♾️ Stablish is an old spelling of establish
🔁 For ever repeats three times here
📌 Repetition signals a permanent promise
📖 This is not a temporary arrangement

## 👨‍👦 I Will Be His Father, And He Shall Be My Son

This language was used in the ancient world for royal adoption.

A king would formally call his successor "son" as part of covenant language.

Hebrews chapter one later quotes this exact verse about Jesus.

The promise ultimately points beyond Solomon to a far greater king.

👨‍👦 This was royal adoption language
📜 Ancient kings used father son covenant terms
✝️ Hebrews one quotes this about Jesus
📖 The promise points past Solomon

## 🌾 If He Commit Iniquity, I Will Chasten Him With The Rod Of Men

"Iniquity" means sin or moral failure.

God does not promise Solomon's line will be perfect.

He promises real discipline instead of blind approval.

"Rod of men" means ordinary human consequences, not supernatural destruction.

🌾 Iniquity means sin or moral failure
🚫 God does not promise a perfect line
🪵 Rod of men means ordinary consequences
📖 Real love includes real discipline

## 🤝 My Mercy Shall Not Depart Away From Him, As I Took It From Saul

This is the most important contrast in the whole chapter.

Saul lost his kingdom completely because of his disobedience.

David's line will be disciplined for sin, but never rejected outright.

That difference makes this promise unconditional in a way Saul's reign never was.

🤝 This directly contrasts with Saul
👑 Saul lost his kingdom entirely
🛡️ David's line gets discipline, not rejection
📖 This promise is unconditional, unlike Saul's

## 🏰 Thine House And Thy Kingdom Shall Be Established For Ever

"House" here means dynasty, a family line of kings.

"Kingdom" means the throne and the nation together.

Both promises point toward an unending line from David.

Christian readers see this promise ultimately fulfilled in Jesus, David's greater descendant.

🏰 House means a dynasty here
👑 Kingdom means the throne and nation
♾️ Both are promised without end
📖 Many see this fulfilled in Jesus

## 📝 According To All These Words, And According To All This Vision

Nathan does not add his own opinion this time.

He repeats God's message exactly as he received it.

That is a deliberate contrast with his quick answer back in verse three.

A true prophet delivers the message accurately, even when it corrects his own earlier words.

📝 Nathan repeats the message exactly
🔄 This contrasts with his quick answer earlier
🎯 A true prophet delivers it accurately
📖 Even Nathan had to be corrected

# SecondSamuel 7:18-21
# 🙇 Who Am I, O Lord God
---
## 🪑 Went King David In, And Sat Before The Lord

Sitting was an unusual posture for prayer in this culture.

Most prayers in the Bible are offered standing or kneeling.

David sitting suggests a quiet, overwhelmed pause rather than a formal ceremony.

He needs a moment just to take in what he has heard.

🪑 Sitting was unusual for prayer here
🙇 Most prayers were standing or kneeling
😳 This suggests quiet, overwhelmed pause
📖 David needs a moment to take this in

## ❓ Who Am I, O Lord God

David does not open with praise or a request.

He opens with genuine disbelief about his own worth.

The shepherd boy from Bethlehem cannot make sense of this promise.

Real humility often starts with an honest question, not a polished speech.

❓ David opens with disbelief, not praise
👦 He remembers his own humble start
🤔 The promise feels hard to make sense of
📖 Real humility starts with honest questions

## 🏠 What Is My House, That Thou Hast Brought Me Hitherto

"Hitherto" is an old word meaning up to this point.

David's family was not royalty or nobility of any kind.

Jesse's household was an ordinary family from a small town.

David cannot explain why God chose his family for any of this.

🏠 Hitherto means up to this point
👨‍👩‍👧‍👦 Jesse's family was not royalty
🌾 They were an ordinary small town family
📖 David cannot explain why he was chosen

## 🤏 This Was Yet A Small Thing In Thy Sight

David is talking about his own kingship, already an enormous gift.

Compared to what God just promised, even that feels small to David now.

The covenant in this chapter dwarfs everything that came before it.

David is recalibrating just how much God has actually given him.

🤏 David means his own kingship here
📏 It now feels small by comparison
♾️ This new covenant dwarfs it
📖 David is recalibrating God's generosity

## 🔭 Spoken Also Of Thy Servant's House For A Great While To Come

God's promise does not stop with David's own lifetime.

It reaches generations David will never personally meet.

David recognizes he is receiving a promise bigger than himself.

Few people get to see this far into their own family's future.

🔭 The promise reaches future generations
👶 David will never meet these descendants
🎁 He receives a promise bigger than himself
📖 Few see this far into their future

## 🤷 Is This The Manner Of Man, O Lord God

This difficult phrase asks whether this is how humans normally treat each other.

David is saying no ordinary person shows kindness this far beyond what is deserved.

Human generosity usually has limits and expects something back.

God's promise here breaks that normal human pattern completely.

🤷 David asks if this is normal human kindness
⚖️ Human generosity usually has limits
🎁 God's promise breaks that pattern
📖 This kindness goes beyond anything human

## 💛 For Thy Word's Sake, And According To Thine Own Heart

David correctly names the real reason behind this promise.

It is not because of anything David earned or deserved.

It flows entirely out of God's own character and God's own decision.

That distinction matters for how David receives every gift that follows.

💛 The promise is not something David earned
❤️ It flows from God's own character
🎁 God decided this on His own
📖 Every gift here starts with God, not David

# SecondSamuel 7:22-24
# 🙌 There Is None Like Thee
---
## 🙌 There Is None Like Thee, Neither Is There Any God Beside Thee

David makes a direct, exclusive claim about God.

He is not saying God is simply the best among many gods.

He is saying no other real God exists at all.

This kind of clear statement was rare in the ancient world David lived in.

🙌 David makes an exclusive claim
🚫 God is not the best of many
☝️ No other real God exists
📖 This clarity was rare for that world

## 👂 According To All That We Have Heard With Our Ears

David was not alive during the Exodus generation.

He knows these stories because they were passed down faithfully through his people.

His faith rests partly on trusted accounts he received from others.

Passed down truth still carries real weight and real trust.

👂 David was not alive at the Exodus
🗣️ These stories were passed down to him
🤝 His faith rests on trusted accounts
📖 Received truth still carries real weight

## 🌍 What One Nation In The Earth Is Like Thy People

David steps back to look at Israel among the other nations.

No other nation has a God who personally chose and rescued them like this.

That uniqueness is not something Israel earned through greatness.

It is something God freely chose to give them.

🌍 David compares Israel to other nations
🎯 No other nation was chosen like this
🎁 Israel did not earn this uniqueness
📖 God freely chose to give it

## 🕊️ Whom God Went To Redeem For A People To Himself

"Redeem" means to buy back or rescue at a real cost.

"Went" pictures God actively coming down into Egypt, not waiting from a distance.

God did not simply free Israel and walk away afterward.

He rescued them specifically to belong to Him.

🕊️ Redeem means rescued at a real cost
🚶 Went pictures God actively coming near
🔓 God did not free them and leave
📖 Israel was rescued to belong to Him

## ⚡ Great Things And Terrible

"Terrible" here means awe inspiring, not evil or cruel.

This phrase points back to the plagues and wonders in Egypt.

Those events were meant to strike genuine awe into anyone who saw them.

Fear here is about greatness, not about danger from God's people.

⚡ Terrible means awe inspiring here
🐸 This points back to the plagues in Egypt
😮 These events struck real awe
📖 This is awe, not danger

## 📜 Confirmed To Thyself Thy People Israel To Be A People Unto Thee For Ever

"Confirmed" means God locked this relationship in as permanent.

This is covenant language, not a casual or temporary arrangement.

Israel belongs to God the way a wife belongs to a husband in covenant.

That permanence is exactly what David has just heard promised to his own family.

📜 Confirmed means locked in permanently
🤝 This is covenant language, not casual
💍 Israel belongs to God like a covenant marriage
📖 David just heard this same permanence promised

# SecondSamuel 7:25-29
# 🙏 Let It Please Thee To Bless My House
---
## 🙏 Establish It For Ever, And Do As Thou Hast Said

David is not doubting God's promise here.

He is doing something Israelites often did, praying God's own words back to Him.

Asking God to keep His word is an act of faith, not distrust.

David wants to actively agree with what God has already decided.

🙏 David is not doubting the promise
🔁 He prays God's own words back to Him
🤝 This is an act of faith, not distrust
📖 David agrees with what God decided

## 🌟 Let Thy Name Be Magnified For Ever

David's biggest concern here is not his own family legacy.

He wants God's reputation to grow, not just his own.

"Magnified" means made great or shown to be great in people's eyes.

The dynasty exists to point toward God, not just toward David's family.

🌟 David's concern is God's reputation
🔍 Magnified means shown to be great
🏰 The dynasty points toward God
📖 This is not about David's own legacy

## 👑 The Lord Of Hosts Is The God Over Israel

David repeats this title on purpose in his prayer.

"Lord of hosts" names God as commander over every army in heaven and earth.

Saying it out loud here restates exactly who Israel's true ruler is.

Even as king, David reminds himself who actually sits above his own throne.

👑 David repeats this title on purpose
⚔️ It names God as commander of every army
🎯 It restates who Israel's true ruler is
📖 Even the king answers to this ruler

## 📣 Hast Revealed To Thy Servant, Saying, I Will Build Thee An House

David directly quotes God's own promise from earlier in the chapter.

Repeating God's exact words strengthens his prayer.

He is not asking for something new, only for what was already spoken.

That distinction matters.

This prayer asks God to keep a promise, not grant a favor.

📣 David quotes God's own promise
🔁 Repeating it strengthens his prayer
🆕 He is not asking for something new
📖 This asks God to keep a promise

## 💪 Found In His Heart To Pray This Prayer Unto Thee

"Found in his heart" is an old way of saying found the courage.

This kind of bold, sustained prayer was not David's first instinct.

God's massive promise is what gives David the confidence to pray this way.

Big promises from God often produce bold prayers in return.

💪 Found in his heart means found courage
😳 Bold prayer was not David's first instinct
🎁 God's promise gave him this confidence
📖 Big promises produce bold prayers

## ✅ Thou Art That God, And Thy Words Be True

David is not placing his confidence in the plan itself.

He is placing it in God's own character.

A promise is only as strong as the one who makes it.

David trusts the speaker, which is why he can trust the promise.

✅ David's confidence rests in God's character
📋 Not confidence in the plan itself
💬 Promises are only as strong as speakers
📖 Trusting the speaker means trusting the promise

## 🙏 Let It Please Thee To Bless The House Of Thy Servant

David closes with a direct, humble request.

He does not demand the blessing or assume it is owed to him.

"Let it please thee" shows he still sees this as God's choice to make.

Confidence in the promise does not remove humility in how David asks.

🙏 David makes a direct, humble request
🚫 He does not demand or assume it
🎯 He still sees this as God's choice
📖 Confidence and humility exist together

## ♾️ Let The House Of Thy Servant Be Blessed For Ever

The chapter began with David wanting to build God a house.

It ends with David asking God to bless the house God is building for him instead.

"For ever" appears here for the final time in this prayer.

The whole chapter turns on this one reversal, from David's plan to God's far bigger promise.

♾️ For ever appears one final time
🔄 The chapter reverses David's original plan
🏠 God builds David's house instead
📖 God's promise outgrew David's own plan
`.trim();

export const SECOND_SAMUEL_SEVEN_PERSONAL_SECTIONS = parseSecondSamuelSevenRawNotes(
  SECOND_SAMUEL_SEVEN_RAW_NOTES,
);
