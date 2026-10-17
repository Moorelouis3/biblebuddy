export type HebrewsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsSixRawNotes(rawText: string): HebrewsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 6:${startVerse}` : `Hebrews 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Hebrews 6 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_SIX_RAW_NOTES = `# Hebrews 6:1-3
# 🏗️ Time To Leave The Basics
---
## 🏗️ Leaving The Principles Of The Doctrine Of Christ

"Principles" means the basic starting teachings about Christ.

Leaving them behind does not mean they were wrong.

It means not staying stuck at the very start.

Think of a student who already learned the alphabet.

That student still uses it in every harder book.

🏗️ Principles means the basic starting teachings

📚 Leaving does not mean they were wrong

🔤 Like an alphabet learned long ago

📖 Growth still rests on those basics

---
## 🎯 Let Us Go On Unto Perfection

"Perfection" here does not mean sinless or flawless living.

It means full spiritual maturity, grown up instead of still a child.

The readers were being pushed to grow past the basics.

Moving toward maturity was the whole point of this call.

🎯 Perfection means full maturity, not sinless living

🧑 Grown up, not still a child

🌱 The readers needed to keep growing

📖 Maturity, not sinlessness, is the goal here

---
## 🪦 Not Laying Again The Foundation Of Repentance From Dead Works

"Dead works" means actions that cannot actually give life.

Before trusting Christ, people often tried to earn standing with God.

Repentance from dead works means turning away from that whole approach.

That turning away happens once, at the very start of faith.

🪦 Dead works means actions that cannot give life

🔄 People once tried earning standing with God

🚪 Repentance means turning away from that approach

📖 This turning happens once, at the beginning

---
## 🤲 Faith Toward God

Repentance and faith always come paired together in true conversion.

Repentance turns away from dead works.

Faith turns toward God himself for life instead.

Neither one works alone without the other.

🔄 Repentance turns away from dead works

🤲 Faith turns toward God for life

🤝 The two always come paired together

📖 Neither repentance nor faith works alone

---
## 💧 The Doctrine Of Baptisms, And Laying On Of Hands

"Baptisms" here is plural, not just Christian baptism.

Jewish readers already practiced washing rituals before Christ ever came.

"Laying on of hands" was a custom for blessing, healing, or commissioning someone.

Teachers had to explain both practices clearly.

💧 Baptisms is plural, not just one ritual

🕎 Jewish washing rituals came before Christ

🙌 Laying on of hands blessed or healed

📖 Both practices needed clear teaching

---
## ⚖️ Resurrection Of The Dead, And Eternal Judgment

These two truths look to the very end of all things.

"Resurrection of the dead" means every person will be raised bodily one day.

"Eternal judgment" means that final day settles things forever, not for a season.

Every person's future rests on these two unshakable truths.

💀 Resurrection means being raised bodily one day

⚖️ Judgment settles everything, once and forever

🔚 Both truths point to the very end

📖 Every person's future rests on these truths

---
## 🙏 This Will We Do, If God Permit

The writer makes a plan, then submits it to God.

"If God permit" is not a throwaway phrase.

It admits that even good plans depend on God's permission.

True confidence still leaves room for God to say no.

🙏 The writer submits his plan to God

🚦 If God permit is not thrown in lightly

🤲 Even good plans depend on permission

📖 Confidence still leaves room for God's no

# Hebrews 6:4-8
# ⚠️ A Warning About Falling Away
---
## 💡 Impossible For Those Who Were Once Enlightened

"Enlightened" means given real understanding of the truth about Christ.

This describes people who clearly understood the gospel, not confused outsiders.

The warning that follows is aimed at genuine insiders, not strangers.

That makes the warning far more serious than it first sounds.

💡 Enlightened means given real understanding of Christ

👥 This describes insiders, not confused outsiders

⚠️ The warning targets people who already knew

📖 That makes the warning more serious, not less

---
## 🍯 Tasted Of The Heavenly Gift

"Tasted" here means truly experienced, not just sampled briefly.

Think of tasting a full meal, not licking a single crumb.

"The heavenly gift" points to the real blessings of salvation.

These people had genuinely experienced God's grace at work.

🍯 Tasted means truly experienced, not just sampled

🍽️ Like a full meal, not one crumb

🎁 The heavenly gift points to salvation's blessings

📖 These people had genuinely known God's grace

---
## 🕊️ Partakers Of The Holy Ghost

"Partakers" means people who truly shared in something, not bystanders.

These people had a real experience of the Holy Ghost's work.

That shared experience makes the coming warning land even harder.

Someone this close to the truth could still turn away.

🕊️ Partakers means sharing in something real

🙌 They truly experienced the Holy Ghost's work

💔 That closeness makes the warning land harder

📖 Even someone this close could still turn away

---
## ✨ Tasted The Good Word Of God, And The Powers Of The World To Come

"The good word of God" means the gospel message itself.

"Powers of the world to come" means miracles that preview God's future kingdom.

These readers had witnessed real demonstrations of that coming kingdom.

They were not guessing about the gospel from a distance.

✨ Good word of God means the gospel itself

⚡ Powers of the world to come means miracles

🔮 Those miracles previewed God's future kingdom

📖 They witnessed it firsthand, not from far

---
## ⚠️ If They Shall Fall Away

"Fall away" does not describe a small stumble or a doubt.

It describes a complete, deliberate turning back from the truth.

Many scholars read this as a hypothetical, meant as a warning.

Others read it as describing a real and final turning away.

Either way, the warning was meant to be taken seriously.

⚠️ Fall away means a complete, deliberate turning back

🤔 Scholars disagree on exactly who this describes

🚨 Either way, it is a serious warning

📖 The warning was not meant to be softened

---
## ✝️ Crucify To Themselves The Son Of God Afresh

"Afresh" means doing something again, as if for the first time.

Turning away from Christ pictures repeating his crucifixion all over again.

It is not a literal repeat but a picture of betrayal.

Rejecting the Son after knowing him echoes that first rejection.

✝️ Afresh means doing it again, as new

🔁 Turning away pictures repeating the crucifixion

🚫 It is a picture, not a literal repeat

📖 Rejecting Christ echoes that first betrayal

---
## 😳 Put Him To An Open Shame

"Open shame" means public humiliation, done where everyone could see.

Crucifixion itself was already a public, shameful death in Rome's eyes.

Turning away from Christ now repeats that same public dishonor.

The image is meant to feel deeply uncomfortable, on purpose.

😳 Open shame means humiliation done publicly

🏛️ Crucifixion itself was already public and shameful

🔁 Turning away repeats that same dishonor

📖 The discomfort here is intentional, not accidental

---
## 🌧️ The Earth Which Drinketh In The Rain

The writer shifts to a farming picture everyone would recognize.

"Rain that cometh oft" means blessing poured out again and again.

God's teaching and grace are pictured here as that same rain.

How the ground responds to that rain is what matters next.

🌧️ Rain pictures blessing poured out again and again

🌱 God's teaching and grace are the rain here

🚜 A farming picture everyone would recognize

📖 How the ground responds is what matters

---
## 🌾 Herbs Meet For Them By Whom It Is Dressed

"Herbs meet" means useful plants, crops worth harvesting.

"Dressed" means the ground was worked and farmed on purpose.

Land that receives rain and produces a useful crop earns God's blessing.

A fruitful response to grace is the whole point here.

🌾 Herbs meet means useful, harvestable crops

🪴 Dressed means the ground was worked on purpose

🙏 A fruitful response to grace earns blessing

📖 Fruit, not just rain received, is the point

---
## 🌵 That Which Beareth Thorns And Briers Is Rejected

The same rain can fall on land that produces nothing useful.

"Thorns and briers" means worthless, choking plants instead of real crops.

That land receives the same blessing but wastes it completely.

The warning is aimed at wasted grace, not a lack of grace.

🌵 Thorns and briers means worthless, choking plants

💧 Rain falls the same on both lands

🗑️ One land wastes the exact same blessing

📖 Wasted grace, not missing grace, is the danger

---
## 🔥 Nigh Unto Cursing, Whose End Is To Be Burned

"Nigh unto cursing" means close to coming under judgment.

Burning worthless land was a real farming practice in that world.

Farmers burned off thorns and weeds to clear a field for new growth.

The picture closes with judgment, not gentle correction.

🔥 Nigh unto cursing means close to judgment

🧹 Burning cleared useless growth for a fresh field

🚜 This was a real ancient farming practice

📖 The picture ends in judgment, not correction

# Hebrews 6:9-12
# 💪 Confidence And A Call To Diligence
---
## 🤝 We Are Persuaded Better Things Of You

The writer softens his tone right after a harsh warning.

"Persuaded" means genuinely confident, not just being polite.

He believed these specific readers were not the ones falling away.

A hard warning and real confidence can exist side by side.

🤝 Persuaded means genuinely confident, not just polite

🔄 The tone softens right after the warning

👥 He trusted these readers specifically

📖 Warning and confidence can exist together

---
## 🌱 Things That Accompany Salvation

Real salvation always produces visible fruit in a person's life.

That fruit is the evidence, not the cause, of salvation.

The writer saw that evidence already present in these readers.

Good works confirm faith, they do not earn it.

🌱 Salvation always produces visible fruit

🔍 Fruit is evidence, not the cause

👀 The writer saw that evidence already

📖 Works confirm faith, they do not earn it

---
## ⚖️ God Is Not Unrighteous To Forget Your Work And Labour Of Love

"Unrighteous" means acting unjustly or unfairly.

God's justice is not only about punishing sin.

It also includes faithfully remembering every genuine act of love.

Nothing done out of real love for God goes unnoticed.

⚖️ Unrighteous means acting unjustly or unfairly

👀 God's justice also remembers genuine love

📝 Nothing done in real love is missed

📖 God notices labor done out of love

---
## 🤲 Ministered To The Saints, And Do Minister

"Saints" here simply means fellow believers, not extraordinary figures.

"Ministered" means practical service, meeting real needs.

These readers had already served others and were still serving.

Ongoing service, not a one time act, is what God noticed.

🤲 Saints means fellow believers, not special figures

🛠️ Ministered means practical, hands on service

🔄 These readers served before and still serve

📖 Ongoing service is what God noticed

---
## 🎯 The Same Diligence To The Full Assurance Of Hope

"Diligence" means steady, continued effort over time.

"Full assurance" means settled confidence, not nagging doubt.

The writer wanted that same effort applied toward hope itself.

Hope needed tending just as much as service did.

🎯 Diligence means steady, continued effort

🔒 Full assurance means settled confidence, not doubt

🌱 That same effort should grow their hope

📖 Hope needs tending just like service

---
## 🚶 Be Not Slothful, But Followers

"Slothful" means spiritually lazy, not just physically tired.

"Followers" here means imitators, copying someone else's example.

The call is to actively copy good examples, not avoid laziness.

Growth comes from imitation, not from standing still.

🚶 Slothful means spiritually lazy, not tired

🪞 Followers means imitators, copying an example

🏃 The call is to copy, not coast

📖 Growth comes from imitation, not standing still

---
## ⏳ Through Faith And Patience Inherit The Promises

"Patience" means enduring steadily over a long stretch of time.

"Inherit" means receiving a promise, not earning it through labor.

Faith trusts the promise.

Patience waits for it to arrive.

Both are needed together to receive what God promised.

⏳ Patience means enduring steadily over time

🎁 Inherit means receiving, not earning, a promise

🤲 Faith trusts, patience waits

📖 Both are needed to receive the promise

# Hebrews 6:13-15
# 🤝 God's Promise To Abraham
---
## 📜 God Made Promise To Abraham

This looks back to God's covenant promises made to Abraham in Genesis.

God had promised Abraham a son, a nation, and a lasting blessing.

That old promise is exactly what the writer now builds on.

Abraham's story becomes proof that God keeps his word over time.

📜 This looks back to Genesis and Abraham

🤝 God promised a son, a nation, and blessing

⏳ That old promise is the example here

📖 Abraham proves God keeps his word

---
## ⚖️ Because He Could Swear By No Greater

In that culture, people swore oaths by something greater than themselves.

A person might swear by a king, an idol, or a sacred place.

God has nothing greater than himself to swear by.

There was simply no bigger name available to back up his word.

⚖️ People swore oaths by something greater

👑 A king, an idol, or a sacred place

🚫 God had nothing greater than himself

📖 No bigger name existed to back his word

---
## 🙌 He Sware By Himself

God swore by his own name and character instead.

That is the strongest possible guarantee available in all creation.

His own integrity became the proof behind the promise.

Nothing outside God needed to back up what he said.

🙌 God swore by his own character

💯 The strongest possible guarantee in creation

🔒 His integrity became the proof itself

📖 Nothing outside God backed up his word

---
## 🌟 Surely Blessing I Will Bless Thee, And Multiplying I Will Multiply Thee

Hebrew repeats words like this to add weight and certainty.

Saying blessing I will bless is stronger than simply saying I will bless.

This exact wording was first spoken after Abraham offered Isaac in Genesis twenty two.

Repetition here means the promise is unshakably certain.

🌟 Hebrew repeats words to add certainty

🔁 Repeating blessing makes the promise stronger

📜 First spoken after Isaac's near sacrifice

📖 Repetition means the promise is unshakably certain

---
## ⏳ After He Had Patiently Endured, He Obtained The Promise

Abraham waited about twenty five years between the promise and Isaac's birth.

"Patiently endured" means waiting faithfully through real delay, not instant fulfillment.

"Obtained" means he actually received what he had been promised.

The wait was long, but the promise still arrived exactly as spoken.

⏳ Abraham waited about twenty five years

🧍 Patiently endured means real delay, not instant results

🎁 Obtained means he truly received the promise

📖 Long waits do not cancel God's word

# Hebrews 6:16-20
# ⚓ An Anchor For The Soul
---
## 👥 Men Verily Swear By The Greater

This restates the ordinary human custom just described with Abraham's example.

People swear by something bigger than themselves to make a promise trustworthy.

A king or idol often served that role in the ancient world.

The writer is about to show how God used that same custom.

👥 This restates the ordinary human custom

⚖️ People swear by something bigger than themselves

👑 A king or idol often served that role

📖 God used this same custom next

---
## 🤝 An Oath For Confirmation Is To Them An End Of All Strife

"Strife" means ongoing dispute or disagreement between people.

An oath settled an argument because no one dared break it.

Once sworn, the matter was considered closed for good.

That cultural weight is exactly why God's own oath matters so much.

🤝 Strife means ongoing dispute between people

🔒 An oath settled a matter for good

🚫 No one dared break a sworn oath

📖 That weight explains why God's oath matters

---
## 🎁 The Heirs Of Promise

"Heirs" means the people who will actually receive what was promised.

Abraham was the first heir of this specific covenant.

Everyone who trusts God the way Abraham did becomes an heir too.

The promise did not stop with one man in history.

🎁 Heirs means those who receive the promise

👴 Abraham was the first heir of this promise

🤲 Trusting God like Abraham makes someone an heir

📖 The promise did not stop with one man

---
## 🗿 The Immutability Of His Counsel

"Immutability" means being completely unable to change.

"Counsel" here means God's plan or decision.

God's plan was never at risk of shifting or being revised.

That unchanging nature is exactly what makes the promise safe to trust.

🗿 Immutability means completely unable to change

📋 Counsel means God's plan or decision

🔒 That plan was never at risk of shifting

📖 An unchanging plan is safe to trust

---
## ✍️ Confirmed It By An Oath

God added an oath beyond the promise he had already made.

That gave the promise two separate layers of certainty instead of one.

Nothing extra was legally required for God to keep his word.

The oath was a gift of reassurance, not a legal necessity.

✍️ God added an oath beyond the promise

🔐 That gave two separate layers of certainty

🎁 Nothing extra was legally required of God

📖 The oath was reassurance, not a necessity

---
## 🔐 Two Immutable Things, In Which It Was Impossible For God To Lie

This means the promise and the oath standing behind it.

Both things share one trait.

God cannot lie through either one.

Two unchangeable, truthful guarantees stand behind this one promise.

🔐 This means the promise and the oath

🚫 God cannot lie through either one

🧱 Two guarantees stand behind one promise

📖 This gives total, unshakable certainty

---
## 💪 Strong Consolation

"Consolation" means comfort and encouragement in a hard moment.

This comfort is not weak or temporary, it is strong.

It comes directly from God's double guarantee, promise and oath together.

That strength is meant to steady someone during real doubt.

💪 Consolation means comfort and encouragement

🔒 This comfort is strong, not weak

🤝 It comes from God's double guarantee

📖 It is meant to steady real doubt

---
## 🏃 Fled For Refuge To Lay Hold Upon The Hope Set Before Us

Israel had cities of refuge where someone could flee for safety.

"Fled for refuge" pictures running hard toward a place of real safety.

"Lay hold upon" means grabbing onto something and refusing to let go.

Hope here works the same way, a place to run to and hold.

🏃 Fled for refuge pictures running toward safety

🏙️ Israel had real cities of refuge

✊ Lay hold means grabbing on, not letting go

📖 Hope is also a place to hold

---
## ⚓ An Anchor Of The Soul, Both Sure And Stedfast

An anchor keeps a ship from drifting during a storm.

"Sure" means it will not fail.

"Stedfast" means it will not move, no matter the pressure.

Hope in Christ holds a person steady the same way.

⚓ An anchor keeps a ship from drifting

✅ Sure means it will not fail

🧱 Stedfast means it will not move

📖 Hope holds a person steady the same way

---
## 🚪 Entereth Into That Within The Veil

"The veil" guarded the Holy of Holies from everyone else.

Only the high priest could pass through it, and only once a year.

This hope reaches past that curtain, straight into God's own presence.

No place is closer to God than that.

🚪 The veil guarded the Holy of Holies

👤 Only the high priest could pass through it

🤲 This hope reaches straight into God's presence

📖 No place is closer to God than that

---
## 🏃 The Forerunner Is For Us Entered, Even Jesus

"Forerunner" means someone who goes ahead to prepare the way for others.

A forerunner is not a replacement, everyone following still gets there too.

Jesus went in first, into God's own presence, on our behalf.

Because he went first, the way is now open for everyone else.

🏃 Forerunner means going ahead to prepare the way

🚪 Jesus entered God's presence first, on our behalf

🔓 He went so the way would open

📖 Because he entered first, others can follow

---
## 🗿 Made An High Priest For Ever After The Order Of Melchisedec

This closes the chapter where chapter five ended.

Melchisedec's priesthood never depended on bloodline or ended at death.

Jesus holds that same kind of priesthood, permanent and not inherited.

The next chapter will explain Melchisedec in far more detail.

🗿 This closes the chapter where chapter five ended

♾️ Melchisedec's priesthood never depended on bloodline

🔒 Jesus holds that same permanent priesthood

📖 The next chapter explains Melchisedec further
`.trim();

export const HEBREWS_SIX_PERSONAL_SECTIONS = parseHebrewsSixRawNotes(HEBREWS_SIX_RAW_NOTES);
