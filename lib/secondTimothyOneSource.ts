export type SecondTimothyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondTimothyOneRawNotes(rawText: string): SecondTimothyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondTimothyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Timothy\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Timothy 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Timothy\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Timothy\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Timothy 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Timothy 1:${startVerse}` : `2 Timothy 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Timothy 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_TIMOTHY_ONE_RAW_NOTES = `# 2 Timothy 1:1-2
# ✉️ To Timothy, My Dearly Beloved Son
---
## 📨 An Apostle Of Jesus Christ By The Will Of God
"Apostle" means someone sent out with full authority to represent another.

Paul did not appoint himself to this title.

"By the will of God" means God himself chose him for it.

Every instruction in this letter rests on that calling.

📨 Apostle means one sent with authority
🙅 Paul did not choose this role
👆 God himself called and sent him
📖 This calling anchors the whole letter
---
## ✨ According To The Promise Of Life Which Is In Christ Jesus
This promise points to eternal life found only in Jesus Christ.

It is not a promise of comfort or success in this life.

Paul's entire mission flowed out of that one promise.

Everything he teaches Timothy traces back to this same hope.

✨ Promise of life means eternal life
🙅 Not comfort or success now
🎯 Paul's whole mission flowed from this
📖 Every teaching traces back to this hope
---
## 🤝 My Dearly Beloved Son
This does not mean Timothy was Paul's biological son.

Paul led Timothy to faith and trained him in ministry.

That relationship earned him this deeply personal title.

Spiritual fatherhood could run as deep as blood family.

🙅 Timothy was not Paul's blood son
🌱 Paul led him to faith
🤝 Paul trained him for ministry
📖 Spiritual fatherhood ran this deep
---
## 🙏 Grace, Mercy, And Peace
Paul's standard greeting was grace and peace in his other letters.

Here he adds "mercy," asking for compassion toward real human weakness.

This letter was written from prison near the end of Paul's life.

That setting makes this extra plea for mercy feel personal.

🙏 Grace and peace was Paul's usual greeting
❤️ Mercy here asks for real compassion
⛓️ Paul wrote this from prison
📖 The setting makes this greeting personal

# 2 Timothy 1:3-5
# 🙏 I Thank God, Whom I Serve
---
## 🕎 Whom I Serve From My Forefathers
Paul was Jewish and grew up serving the God of Israel.

His own father and grandfather had served this same God before him.

Becoming a Christian did not break that family line of faith.

Paul saw his new faith as a continuation of that older family faith.

🕎 Paul grew up serving Israel's God
👴 His father and grandfather served God too
🔄 New faith continued that family line
📖 Faith was continuation, not rejection
---
## 🧼 With Pure Conscience
"Pure conscience" means a conscience with nothing hidden or unresolved.

Paul served God honestly, without secret guilt weighing him down.

He could say this even after once persecuting the church.

A clear conscience came from forgiveness, not from a flawless past.

🧼 Pure conscience means nothing hidden
🙏 Paul served God honestly
😔 He once persecuted the church
📖 Forgiveness gave him a clear conscience
---
## 🔁 Without Ceasing I Have Remembrance Of Thee In My Prayers
"Without ceasing" means Paul prayed for Timothy constantly, not just occasionally.

"Remembrance" here means Timothy stayed present in Paul's mind during prayer.

Paul names Timothy by name, not only in general terms.

That kind of constant, specific prayer reveals real personal love.

🔁 Without ceasing means constant prayer
🧠 Timothy stayed in Paul's thoughts
🎯 Paul prayed for him by name
📖 Constant prayer showed real love
---
## 😢 Greatly Desiring To See Thee, Being Mindful Of Thy Tears
These tears likely came from Paul and Timothy's last parting.

Ministry in the first century often meant long, uncertain separations.

Paul had not forgotten how hard that goodbye actually was.

Remembering someone's grief is its own quiet form of love.

😢 Tears point to their last parting
⏳ Separations were common in ministry
💭 Paul remembered that hard goodbye
📖 Remembering grief is a form of love
---
## 😊 That I May Be Filled With Joy
Paul expected real joy, not just relief, from seeing Timothy again.

Reunion with someone loved was never a small or minor thing to him.

That hope kept pulling his thoughts back to Timothy.

Joy, for Paul, was tied to people, not just to circumstances.

😊 Paul expected real joy, not relief
🤗 Reunion with loved ones mattered deeply
💭 Hope pulled his thoughts to Timothy
📖 Joy was tied to people, not circumstances
---
## 💎 The Unfeigned Faith That Is In Thee
"Unfeigned" means genuine, without any pretending or performance.

Paul had actually watched this faith lived out, not just claimed.

Timothy's faith held up under real pressure and real distance.

Genuine faith shows itself over time, not in a single moment.

💎 Unfeigned means genuine, not pretend
👀 Paul watched this faith lived out
🪨 It held up under real pressure
📖 Real faith proves itself over time
---
## 👵 Thy Grandmother Lois, And Thy Mother Eunice
Timothy's faith ran through the women in his family.

Lois, his grandmother, believed first.

Eunice, his mother, carried that same faith forward.

Timothy's father is never named in this story.

👵 Lois was Timothy's grandmother
👩 Eunice was Timothy's mother
🙋 His father is never named
📖 Faith passed down through the women

# 2 Timothy 1:6-7
# 🔥 Stir Up The Gift Of God
---
## 🔥 Stir Up The Gift Of God
"Stir up" pictures fanning a small flame back into a full fire.

Timothy already had a real spiritual gift inside him.

That gift had apparently grown quiet through fear or neglect.

Paul calls him to actively use it again, not wait passively.

🔥 Stir up means fanning a flame
🎁 Timothy already owned this gift
😶 The gift had grown quiet
📖 Paul calls him to use it
---
## ✋ By The Putting On Of My Hands
This points to a real moment when Paul laid his hands on Timothy.

Laying on of hands was how the church publicly marked someone for ministry.

It did not create the gift out of nothing.

It confirmed and released a calling God had already given.

✋ Paul once laid hands on Timothy
⛪ This publicly marked him for ministry
🚫 It did not create the gift
📖 It confirmed a calling already given
---
## 😨 The Spirit Of Fear
This does not mean healthy caution or ordinary human nervousness.

"Fear" here means a crippling timidity that silences someone completely.

Timothy was apparently struggling with exactly this kind of fear.

God never hands out a gift paired with cowardice.

🙅 Not ordinary caution or nervousness
😨 Fear means crippling timidity here
🤐 This timidity can silence a person
📖 God never pairs gifts with cowardice
---
## ⚡ Power, And Of Love, And Of A Sound Mind
God replaces fear with three specific gifts instead.

"Power" means real strength to act even when afraid.

"Love" means the will to serve others instead of hiding.

"A sound mind" means clear, stable thinking under pressure.

⚡ Power means strength to act
❤️ Love means serving instead of hiding
🧠 Sound mind means clear thinking
📖 These three gifts answer fear directly

# 2 Timothy 1:8-10
# ⛓️ Ashamed Of The Testimony
---
## ⛓️ Ashamed Of The Testimony Of Our Lord, Nor Of Me His Prisoner
Being linked to a prisoner carried real social shame in this culture.

Paul was writing this letter from an actual Roman prison.

He asks Timothy not to let that shame silence his own faith.

Standing with Paul meant risking the same reputation.

⛓️ Paul wrote this from prison
😳 Prisoners carried real social shame
🙅 Timothy should not hide from this
📖 Loyalty risked the same reputation
---
## 🤝 Partaker Of The Afflictions Of The Gospel
"Partaker" means sharing fully in something, not just watching from a distance.

"Afflictions" here means real suffering that came from spreading the gospel.

Paul invites Timothy into that suffering, not just into its reward.

Sharing hardship for the gospel was expected, not unusual or extreme.

🤝 Partaker means sharing fully
💔 Afflictions means real gospel suffering
🎯 Paul shares both the cost and reward
📖 Hardship for the gospel was expected
---
## 📞 Called Us With An Holy Calling, Not According To Our Works
This calling did not start because of anything God saw in Paul or Timothy.

"Not according to our works" rules out earning this calling by good behavior.

God's own purpose and grace were the only real reasons behind it.

Salvation here runs entirely on God's initiative, not human performance.

📞 This calling started with God, not us
🙅 Works never earned this calling
🎯 Purpose and grace caused it
📖 Salvation runs on God's initiative
---
## ⏳ Given Us In Christ Jesus Before The World Began
This grace was planned before the world even existed.

God's purpose for Timothy did not begin the day he was born.

It reached back before creation itself.

Nothing about this calling was a last minute decision.

⏳ Grace was planned before creation
🌍 This precedes the world itself
🎯 God's purpose was never last minute
📖 History, not accident, shaped this calling
---
## 💀 Who Hath Abolished Death
"Abolished" means stripped of its final power, not simply delayed.

Death still happens, but it no longer has the last word.

Jesus broke death's hold through his own resurrection.

That victory stands behind everything Paul is willing to suffer.

💀 Abolished means stripped of final power
⏸️ Death still happens but loses its grip
✝️ Jesus broke death through his resurrection
📖 This victory fuels Paul's courage
---
## 💡 Brought Life And Immortality To Light Through The Gospel
"To light" means bringing something hidden out into open view.

Immortality was not a brand new idea God just invented here.

The gospel made that truth clear and certain for the first time.

What was once only hoped for became something openly proclaimed.

💡 To light means brought into view
♾️ Immortality was not a new idea
📢 The gospel made it certain
📖 Hope became an open announcement

# 2 Timothy 1:11-14
# 📜 Hold Fast The Form Of Sound Words
---
## 📢 Appointed A Preacher, And An Apostle, And A Teacher Of The Gentiles
"Preacher" means someone who publicly announces a message.

"Apostle" means someone sent with direct authority to represent Christ.

"Teacher" means someone who explains and grounds that message for others.

"Gentiles" means people outside the Jewish nation.

Paul carried all three roles for that specific audience.

📢 Preacher means announcing the message
✉️ Apostle means sent with authority
📚 Teacher means explaining it clearly
📖 Paul carried all three for the Gentiles
---
## 🤝 I Know Whom I Have Believed
Paul's confidence rested in a person, not in a set of facts.

Knowing information about God is different from actually trusting him.

Paul had history with this God across hard circumstances.

That track record is what let him feel certain even now.

🤝 Trust was in a person, not facts
🧠 Knowing about God differs from trusting him
📜 Paul had history with this God
📖 That history gave him real certainty
---
## 🔒 Able To Keep That Which I Have Committed Unto Him Against That Day
"Committed" pictures handing something valuable over for safekeeping.

Paul had entrusted his whole life and future to God.

"That day" points forward to the day Christ returns and judges.

Paul trusted God to guard that deposit until then.

🔒 Committed means handed over for safekeeping
🙏 Paul entrusted his whole life to God
📅 That day points to Christ's return
📖 God guards that deposit until then
---
## 🧱 Hold Fast The Form Of Sound Words
"Form" means a fixed pattern, like a mold that keeps its shape.

"Sound" means healthy, the same word used for good medicine.

Timothy learned this pattern of teaching directly from Paul himself.

"Hold fast" means gripping it tightly, not letting it drift.

🧱 Form means a fixed pattern
💊 Sound means healthy, like medicine
🎓 Timothy learned it from Paul
📖 Hold fast means gripping it tightly
---
## ❄️ In Faith And Love Which Is In Christ Jesus
Sound teaching was never meant to be cold or purely academic.

Paul ties correct doctrine directly to faith and love.

Truth without love can turn harsh and lifeless.

Real doctrine shapes both the mind and the heart together.

❄️ Doctrine was never meant to be cold
🤝 Paul ties truth to faith and love
💔 Truth without love turns harsh
📖 Real doctrine shapes mind and heart
---
## 📘 That Good Thing Which Was Committed Unto Thee Keep By The Holy Ghost Which Dwelleth In Us
"That good thing" points back to the gospel message itself.

Timothy could not guard this truth through willpower alone.

The Holy Ghost living inside him supplied the real strength to keep it.

Guarding sound doctrine was always a shared work with God's Spirit.

📘 That good thing means the gospel
💪 Willpower alone could not guard it
🕊️ The Holy Ghost supplied the strength
📖 Guarding truth was shared with God

# 2 Timothy 1:15-18
# 🏠 The House Of Onesiphorus
---
## 🗺️ All They Which Are In Asia Be Turned Away From Me
"Asia" here names a Roman province in what is now western Turkey.

It does not mean the whole continent of Asia today.

Many believers from that region had abandoned Paul during his imprisonment.

That kind of mass desertion would have been deeply painful to read.

🗺️ Asia means a Roman province, not the continent
🚪 Many believers there abandoned Paul
⛓️ This happened during his imprisonment
📖 Mass desertion was deeply painful
---
## 🙋 Phygellus And Hermogenes
These were two specific believers from the region of Asia.

Paul names them instead of speaking only in vague generalities.

Naming them made the pain of their desertion concrete and personal.

Scripture does not record anything else about either man.

🙋 Two specific men are named here
✍️ Paul names names instead of staying vague
💔 Naming them made the hurt personal
📖 Nothing else about them is recorded
---
## 🏠 The House Of Onesiphorus
"House" here means his whole household, not just one building.

Paul blesses this entire family in contrast to those who deserted him.

Onesiphorus himself may have already died by the time this letter was written.

Paul's blessing reached his family even if that was true.

🏠 House means his whole household
⚖️ This contrasts with those who deserted Paul
🕊️ Onesiphorus may have already died
📖 Paul's blessing still reached the family
---
## 💧 Oft Refreshed Me, And Was Not Ashamed Of My Chain
"Refreshed" means he brought real relief during a hard season.

"My chain" names Paul's actual imprisonment, not a figure of speech.

Visiting a chained prisoner carried real risk of suspicion in Rome.

Onesiphorus visited anyway, openly and without hiding it.

💧 Refreshed means he brought real relief
⛓️ My chain names a real imprisonment
⚠️ Visiting a prisoner carried real risk
📖 He visited anyway, openly
---
## 🏛️ Sought Me Out Very Diligently, And Found Me
Rome was a massive city with no simple way to locate one prisoner.

"Diligently" means Onesiphorus searched hard and did not give up quickly.

He treated finding Paul as something worth real effort.

That kind of search revealed real love, not casual curiosity.

🏛️ Rome was a huge, hard city to search
🔍 Diligently means he searched hard
💪 He did not give up quickly
📖 This search revealed real love
---
## 📍 Ministered Unto Me At Ephesus
This points back to earlier service Onesiphorus gave Paul in Ephesus.

His loyalty did not begin the day he visited Rome.

It was a long, consistent pattern of quiet faithfulness.

One loyal friend outweighed every name on the list of those who left.

📍 This recalls earlier service in Ephesus
⏳ His loyalty did not start in Rome
🪨 It was a long consistent pattern
📖 One faithful friend outweighed many who left
`.trim();

export const SECOND_TIMOTHY_ONE_PERSONAL_SECTIONS = parseSecondTimothyOneRawNotes(SECOND_TIMOTHY_ONE_RAW_NOTES);
