export type RomansFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansFifteenRawNotes(rawText: string): RomansFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 15:${startVerse}` : `Romans 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 15 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_FIFTEEN_RAW_NOTES = `# Romans 15:1-6
# 💪 Bear Ye The Infirmities Of The Weak
---
## 💪 We Then That Are Strong

"Strong" here points back to the confident believers from the end of chapter 14.

Paul does not treat that strength as a reward to enjoy alone.

He treats it as a responsibility owed to someone weaker.

The stronger believer carries the weaker, not the other way around.

💪 Strong refers to confident believers from chapter 14
🎁 Strength is not a private reward
🤝 It comes with responsibility toward others
📖 The strong carries the weak, not the reverse

## 🩹 Ought To Bear The Infirmities Of The Weak

"Bear" means to carry a real weight, not merely put up with it.

"Infirmities" describes a weakness in conviction, not a moral failure.

Paul uses this same word elsewhere for physical sickness, a picture of something that needs real support.

Simply tolerating a weaker believer from a distance does not meet this command.

🩹 Bear means carry, not merely tolerate
🙇 Infirmities means weakness, not moral failure
🏥 The word elsewhere describes physical sickness
📖 Distant tolerance does not meet this command

## 🚫 Not To Please Ourselves

This phrase names the exact instinct Paul is correcting.

Pleasing yourself here means making every choice purely around personal comfort.

The strong believer truly had Christian liberty on his side.

A free choice can still be the wrong choice when someone weaker is watching.

🚫 Pleasing self means choosing by comfort alone
✅ The strong believer truly had the liberty
👀 Liberty was never the only question
📖 A free choice can still be wrong

## 🤝 Please His Neighbour For His Good To Edification

"Edification" means building someone up, the same picture used for construction.

Paul is not asking believers to please everyone about everything.

The aim is narrowed to whatever actually builds up that neighbour's faith.

Pleasing people turns selfish the moment it stops aiming at their good.

🏗️ Edification means building someone up
🙅 This is not pleasing everyone about everything
🎯 The aim is narrowed to real spiritual good
📖 Pleasing people without that aim turns selfish

## ✝️ For Even Christ Pleased Not Himself

Paul reaches for the strongest possible example, Christ himself.

If the Son of God did not live to please himself, no believer gets an exception.

The quotation that follows comes from Psalm 69, a psalm about a suffering righteous man.

Paul applies words written about human suffering directly to Christ.

✝️ Christ is the strongest possible example
🙅 No believer is exempt from this standard
📜 The quote comes from Psalm 69
📖 Paul applies it directly to Christ

## 📜 Written For Our Learning

Paul is talking about the Old Testament scriptures here.

"Aforetime" simply means in an earlier time, long before Paul's readers were born.

He treats those ancient writings as still alive and useful for the church in Rome.

Old words were never meant to go stale on a shelf.

📜 This points to the Old Testament
🕰️ Aforetime means written long before now
⚡ Paul treats it as still useful today
📖 Old scripture was never meant to go stale

## 🙏 Patience And Comfort Of The Scriptures

"Patience" here means the ability to endure hardship without giving up.

"Comfort" means real encouragement, not just a kind word.

Paul says both of those qualities are something the scriptures themselves supply.

That supply is what produces genuine hope in a believer's life.

⏳ Patience means enduring without giving up
🤗 Comfort means real encouragement
📚 Scripture supplies both qualities
📖 That supply produces real hope

## 🎶 One Mind And One Mouth Glorify God

"One mind" pictures the church agreeing in heart, not just in words.

"One mouth" pictures that agreement spilling out into shared, audible worship.

This unity was the actual goal behind all the advice about weak and strong believers.

The argument about food and days was never the real point, unified worship was.

🧠 One mind means true inward agreement
🗣️ One mouth means shared outward worship
🎯 Unity was the real goal all along
📖 Food and days were never the real point

# Romans 15:7-13
# 🤝 Receive Ye One Another As Christ Received Us
---
## 🤝 Receive Ye One Another As Christ Also Received Us

This sums up the entire argument stretching back to chapter 14.

"Receive" means full acceptance, not a grudging truce between two sides.

Christ's own acceptance of each believer becomes the pattern for how they treat one another.

Nobody earned that reception, so nobody gets to withhold it from someone else.

🔒 This closes the whole argument since chapter 14
🤲 Receive means full acceptance, not a truce
✝️ Christ's acceptance is the pattern to copy
📖 Nobody earned it, so nobody withholds it

## ✂️ Minister Of The Circumcision For The Truth Of God

"The circumcision" is a common way the New Testament refers to the Jewish people.

Christ's earthly ministry was first directed to Israel, the people God had promised long before.

"Confirm the promises made unto the fathers" means proving God kept his word to Abraham, Isaac, and Jacob.

God's faithfulness to Israel was never in question, Christ came to make good on it.

✂️ Circumcision refers to the Jewish people
🎯 Christ's ministry targeted Israel first
📜 This confirmed old promises to the patriarchs
📖 God came to make good on his word

## 🌍 That The Gentiles Might Glorify God For His Mercy

Where the Jews received a promise, Paul says Gentiles received mercy instead.

"Mercy" means receiving kindness that was never owed in the first place.

Paul now quotes four Old Testament passages in a row to prove this inclusion was planned.

The Old Testament already pointed toward Gentiles joining in worship of Israel's God.

🌍 Gentiles received mercy, not an owed promise
🎁 Mercy means kindness that was never owed
🔢 Four Old Testament quotes follow as proof
📖 Gentile inclusion was planned, not an afterthought

## 🎶 I Will Confess To Thee Among The Gentiles

This is the first quotation, lifted from Psalm 18.

"Confess" here means openly declaring praise, not admitting wrongdoing.

The psalm pictures someone praising God in front of a Gentile audience, not hidden away.

David wrote this about his own victories, and Paul applies it forward to Christ's wider victory.

📜 This line is lifted from Psalm 18
🗣️ Confess means declaring praise, not guilt
🌍 It pictures praise in front of Gentiles
📖 Paul applies David's words to Christ's victory

## 📖 Rejoice, Ye Gentiles, With His People

This second quotation comes from the Song of Moses in Deuteronomy.

"His people" originally meant Israel, and here Gentiles are invited to celebrate alongside them.

The invitation to Gentiles was already buried inside the Law itself, not only the prophets.

Paul is showing this was no late addition to God's plan.

📖 This quote comes from Deuteronomy
🤝 Gentiles are invited to join Israel's celebration
🔍 The invitation was already inside the Law
➡️ This was no late addition to the plan

## 🎉 Praise The Lord, All Ye Gentiles

This third quotation comes from Psalm 117, the shortest chapter in the whole Bible.

"Laud" is an old word that simply means to praise highly.

Even though it runs only two verses, that psalm commands every nation to praise the Lord.

Paul uses it to prove Gentile praise of God was always part of the plan.

📏 This is the shortest chapter in the Bible
🗣️ Laud is an old word for praise
🌍 It commands every nation to praise God
📖 Gentile praise was always part of the plan

## 🌳 A Root Of Jesse

Jesse was the father of King David, so a root from Jesse points to David's own family line.

This fourth quotation comes from the prophet Isaiah.

"He that shall rise to reign over the Gentiles" describes a king whose rule reaches beyond Israel.

Paul names Christ as the fulfillment of that ancient promise of a Gentile including king.

🌳 Jesse was King David's father
📜 This quote comes from Isaiah
👑 It pictures a king who rules the Gentiles
📖 Paul names Christ as that fulfillment

## 🕊️ The God Of Hope Fill You With Joy And Peace

Paul closes this section with a prayer instead of another argument.

"The God of hope" names God as the actual source behind the hope just described.

Joy and peace here grow specifically out of believing, not out of changing circumstances.

The Holy Ghost is named as the power that makes that hope abound, not willpower.

🙏 Paul closes with a prayer, not an argument
🌱 Hope's source is named as God himself
😊 Joy and peace grow out of believing
📖 The Holy Ghost supplies the power for it

# Romans 15:14-21
# ✍️ Ministering The Gospel Of God To The Gentiles
---
## 💛 Full Of Goodness, Filled With All Knowledge

Paul has spent fourteen chapters correcting and instructing this church.

Here he pauses to affirm them before giving any more instruction.

"Admonish" means to warn or correct gently, something Paul trusts them to do for each other.

Correction lands better once it follows genuine confidence in the person receiving it.

📝 Paul has spent fourteen chapters teaching them
💛 He pauses here to affirm them first
⚠️ Admonish means to warn or correct gently
📖 Confidence should come before more correction

## ✍️ Written The More Boldly Unto You

Paul explains why he felt free to write so directly to a church he had never visited.

"The grace that is given to me of God" names the source of that boldness.

He is not claiming personal authority, he is pointing to a calling he received.

That calling, not confidence in himself, is what let him write so plainly.

✍️ Paul explains his boldness in writing
🎁 Grace is named as the real source
🙅 This is not personal authority
📖 A calling, not self confidence, explains it

## 🕊️ Minister Of Jesus Christ To The Gentiles

"Minister" here uses priestly language, not just a general job title.

Paul pictures his preaching work as something like a priest offering a sacrifice.

"The offering up of the Gentiles" pictures Gentile believers themselves as that offering.

"Sanctified by the Holy Ghost" means the Spirit is what makes that offering acceptable to God.

🕊️ Minister here carries priestly language
🙏 Paul's preaching is pictured as an offering
🌍 Gentile believers are the offering itself
📖 The Holy Ghost makes it acceptable

## 🏆 I May Glory Through Jesus Christ

"Glory" here does not mean personal pride or bragging.

Paul is naming a legitimate confidence that comes only through what Christ has done.

"Those things which pertain to God" keeps the focus on spiritual results, not personal achievement.

Any genuine confidence Paul has traces straight back to Christ, not to himself.

🏆 Glory here is not personal pride
✝️ This confidence comes only through Christ
🎯 The focus stays on spiritual results
📖 Paul's confidence traces back to Christ

## 🗣️ Which Christ Hath Not Wrought By Me

Paul refuses to take credit for results Christ did not actually produce through him.

"By word and deed" covers both his preaching and the miracles that backed it up.

This humility is deliberate, not false modesty, Paul genuinely will not overstate his impact.

Every real result gets credited to Christ working through him, not to Paul himself.

🙅 Paul refuses credit Christ did not earn
🗣️ Word and deed covers preaching and miracles
✅ This humility is deliberate, not false modesty
📖 Results are credited to Christ, not Paul

## 🗺️ From Jerusalem, And Round About Unto Illyricum

Illyricum was a Roman region in what is now the Balkans.

Naming Jerusalem and Illyricum together spans the entire breadth of Paul's mission field so far.

"Fully preached" means he did not merely visit these regions, he thoroughly established the gospel there.

Paul is summarizing about twenty years of travel in a single sentence.

🗺️ Illyricum sat in what is now the Balkans
📏 These two places span his whole mission field
✅ Fully preached means thoroughly established, not just visited
📖 Twenty years of travel in one sentence

## 🏗️ Lest I Should Build Upon Another Man's Foundation

Paul deliberately targeted places where no one had preached Christ yet.

"Foundation" pictures starting a work from the ground up, not adding to someone else's.

This explains why Paul had not yet visited Rome, a church someone else had already started.

His calling was pioneering new ground, not managing established churches.

🎯 Paul targeted places with no gospel yet
🏗️ Foundation pictures starting from the ground up
🏛️ This explains why he had not visited Rome
📖 His calling was pioneering, not managing

## 👀 To Whom He Was Not Spoken Of, They Shall See

Paul closes this section with another Old Testament quotation, this time from Isaiah.

The verse originally described a servant whose message would reach nations that had never heard of him.

Paul applies that ancient picture directly to his own pioneering mission work.

What looked like a strange calling was actually written about centuries in advance.

📜 This quote comes from the prophet Isaiah
🌍 It describes a message reaching unreached nations
🎯 Paul applies it to his own calling
📖 His mission was written about long before

# Romans 15:22-29
# 🗺️ Paul's Journey Toward Rome And Spain
---
## 🛑 Much Hindered From Coming To You

Paul's pioneering mission work is the direct reason he just explained.

"Hindered" means his travel plans were genuinely delayed, not that he forgot about Rome.

Rome had been on Paul's mind for years before this letter was ever written.

The delay was about priorities, not neglect.

🔗 This connects back to his pioneering work
⏳ Hindered means genuinely delayed, not forgotten
📅 Rome had been on his mind for years
📖 The delay was about priorities, not neglect

## 🏁 No More Place In These Parts

"These parts" refers to the entire eastern Mediterranean region Paul had already evangelized.

Paul is not saying there are no more lost people there.

He means no pioneering work is left for him specifically in that region.

His calling was to plant new churches, not to keep working the same ground forever.

🗺️ These parts means the whole eastern region
🏁 Paul finished his pioneering work there
🌱 His calling was to plant new churches
📖 Finishing one region opened the next

## 🗺️ Whensoever I Take My Journey Into Spain

Spain sat at the far western edge of the Roman Empire, about as far as Paul could travel.

Paul hoped to use Rome as a stopover on the way there, not as his final stop.

"Filled with your company" means he wanted real time with them first, not a quick visit.

Paul's plan put Rome in the middle of a much larger missionary journey.

🗺️ Spain sat at the far edge of Rome
🛤️ Rome was meant to be a stopover
🤝 He wanted real time with them first
📖 Rome sat inside a larger journey plan

## 🙏 I Go Unto Jerusalem To Minister Unto The Saints

Before Spain and even before Rome, Paul had one more trip planned, to Jerusalem.

"Minister unto the saints" here refers to delivering a specific gift, not general preaching.

This detour meant Rome would have to wait even longer than Paul might have liked.

Paul put the needs of the Jerusalem church ahead of his own travel plans.

🙏 Jerusalem came before Rome in his plans
🎁 Minister here means delivering a specific gift
⏳ This delayed Rome even further
📖 Their need came before his own plans

## 💰 A Certain Contribution For The Poor Saints

Macedonia and Achaia were Gentile regions in modern day Greece.

Jerusalem's believers were suffering real poverty, likely from famine and persecution.

Gentile churches voluntarily raised money to help Jewish believers they had never met.

This collection visibly united two groups the rest of the letter worked hard to reconcile.

🌍 Macedonia and Achaia were Greek regions
😔 Jerusalem's believers faced real poverty
💰 Gentile churches gave money voluntarily
📖 The gift visibly united Jew and Gentile

## ⚖️ Their Debtors They Are

Paul explains why Gentile giving here is not pure charity but repayment of a debt.

"Spiritual things" refers to the gospel itself, which reached Gentiles through Jewish believers.

"Carnal things" refers to ordinary material needs like food and money.

Receiving something spiritual creates a real obligation to give back something physical.

⚖️ This is debt repayment, not pure charity
📜 Spiritual things refers to the gospel itself
💵 Carnal things refers to material needs
📖 Receiving spiritually creates a physical obligation

## 🔒 Sealed To Them This Fruit

"Sealed" pictures officially confirming that a delivery was completed and secure.

"This fruit" refers to the money collected, pictured as the result of real Gentile faith.

Only after delivering the gift safely would Paul finally continue on toward Rome and Spain.

Paul treats finishing this responsibility as a condition before moving forward.

🔒 Sealed means confirming safe delivery
🍇 Fruit pictures the result of Gentile faith
✅ Rome and Spain wait until this is done
📖 Finishing this duty came before moving on

## 🌟 The Fulness Of The Blessing Of The Gospel Of Christ

Paul expresses real confidence, not just hope, about what his eventual visit will bring.

"Fulness" means a complete and overflowing measure, not a partial one.

Whatever delays stood in the way, Paul expected the visit to be worth the wait.

The blessing he anticipated was not about himself, it belonged to the gospel of Christ.

🌟 Paul expresses confidence, not just hope
💯 Fulness means complete, not partial
⏳ The wait does not shrink the blessing
📖 The blessing belongs to the gospel, not Paul

# Romans 15:30-33
# 🙏 Strive Together With Me In Your Prayers
---
## 🙏 Strive Together With Me In Your Prayers

"Strive" pictures an athlete's intense physical effort, not a casual request.

Paul is asking the Roman believers to pray for him with that same intensity.

This is one of the strongest requests for prayer support found anywhere in Paul's letters.

Even the apostle who wrote most of the New Testament depended on other people's prayers.

🏃 Strive pictures intense athletic effort
🙏 Paul wants that same intensity in prayer
💪 This is one of his strongest prayer requests
📖 Even Paul depended on others praying for him

## ⚠️ Delivered From Them That Do Not Believe In Judaea

Paul had real enemies waiting for him on this trip to Jerusalem.

Jewish opponents in Judaea had already shown hostility toward his Gentile mission work.

Paul was not being dramatic, this danger turned out to be completely real.

The book of Acts later records Paul's actual arrest not long after this letter was written.

⚠️ Paul faced real enemies on this trip
😠 Jewish opponents opposed his Gentile mission
✅ This danger was not exaggerated
📖 Acts records his arrest soon after this letter

## 🎁 My Service Which I Have For Jerusalem May Be Accepted

Paul's second concern was whether Jewish believers would even accept a Gentile gift.

Old tension between Jewish and Gentile believers made that acceptance far from guaranteed.

Paul needed the gift received warmly, not grudgingly tolerated as an obligation.

A cold acceptance would have undone much of what the gift was meant to show.

🎁 Paul worried the gift might be refused
⚖️ Old Jewish and Gentile tension made that real
💛 He wanted warm acceptance, not toleration
📖 A cold acceptance would undo its purpose

## 😌 Be Refreshed

"Refreshed" pictures rest after a long and difficult stretch of work.

Paul expects that visiting Rome, once he finally arrives, will function as real rest for him.

This small, human detail shows Paul's own need for encouragement, not just his role as a teacher.

Even an apostle needed the simple comfort of being among friends.

😌 Refreshed pictures rest after hard work
🏠 Paul expected Rome to be that rest
🙋 This shows Paul's own human need
📖 Even an apostle needed simple friendship

## ✌️ The God Of Peace Be With You All

Paul closes the chapter with a short benediction, a blessing spoken over the readers.

"The God of peace" is a fitting title after a long argument about conflict between weak and strong believers.

"Amen" means let it be so, a simple word of agreement and closure.

The chapter began by asking believers to bear with one another.

It ends by asking God to keep them at peace.

🙏 This closes the chapter with a blessing
✌️ God of peace fits a chapter about conflict
✅ Amen means let it be so
📖 It ends asking God for lasting peace
`.trim();

export const ROMANS_FIFTEEN_PERSONAL_SECTIONS = parseRomansFifteenRawNotes(ROMANS_FIFTEEN_RAW_NOTES);
