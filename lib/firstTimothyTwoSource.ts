export type FirstTimothyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothyTwoRawNotes(rawText: string): FirstTimothyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 2:${startVerse}` : `1 Timothy 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Timothy 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_TWO_RAW_NOTES = `# 1 Timothy 2:1-4
# 🙏 Prayer For Everyone, Even Rulers
---
## 🙏 I Exhort Therefore

Exhort means to urge someone strongly toward action.

Chapter one already called Timothy to fight for the faith.

Paul now turns to something just as urgent, prayer.

Faith and prayer were never meant to be separate.

🙏 Exhort means to urge strongly

⚔️ Chapter one called for a fight

🧭 Now Paul turns to prayer

📖 Faith and prayer stay connected
---
## 🗣️ Supplications, Prayers, Intercessions, And Giving Of Thanks

Paul names four different kinds of prayer in a single line.

Supplications are urgent requests made out of real need.

Intercessions mean pleading with God on behalf of someone else.

Giving of thanks means expressing real gratitude for what God has already done.

Paul wants every kind of prayer covered, not just one.

🗣️ Four different kinds of prayer named

🙋 Supplications are urgent personal requests

🤝 Intercessions mean pleading for others

📖 Every kind of prayer matters here
---
## 🌍 For All Men

The word all here is deliberately broad.

Paul does not limit this prayer list to friends or fellow believers.

It reaches every person, including strangers and enemies.

That kind of prayer stretches the heart past its comfort zone.

🌍 All men means every person

🤝 Not just friends or believers

😮 Strangers and enemies included too

📖 Prayer here stretches the heart
---
## 👑 For Kings, And For All That Are In Authority

Nero ruled the Roman Empire when Paul wrote this letter.

Nero was no friend to Christians and would later persecute them harshly.

Paul still tells Timothy to pray for him and every official like him.

Praying for a hostile ruler takes real spiritual discipline.

👑 Nero ruled Rome at this time

⚔️ Nero would later persecute Christians

🙏 Paul still commands prayer for him

📖 This prayer takes real discipline
---
## 🕊️ A Quiet And Peaceable Life

This phrase names the practical reason for praying for rulers.

Fair, stable government lets ordinary life continue without constant fear.

Christians were a small, often suspected group in the Roman world.

Peace from the government gave them room to live and worship safely.

🕊️ Quiet life means stable daily life

🏛️ Fair rulers protect ordinary life

😨 Christians were often viewed with suspicion

📖 Peace creates room to worship safely
---
## ✅ In All Godliness And Honesty

Godliness means a life that reflects genuine devotion to God.

Honesty here points to a life of integrity, not just truth telling.

Paul links peace from government to the believer's own character.

An outwardly safe life should match an inwardly godly one.

✅ Godliness means true devotion to God

🤲 Honesty here means integrity, not just truth

🔗 Peace and character connect here

📖 Outward safety should match inward faith
---
## 💙 Good And Acceptable In The Sight Of God

Paul explains why this kind of prayer matters so much.

It is not only useful, it genuinely pleases God.

Saviour is another name for God here.

It emphasizes his role as rescuer.

Prayer for others is something God delights to see.

💙 Prayer for others pleases God

🛟 Saviour emphasizes God as rescuer

😊 God delights in this kind of prayer

📖 Pleasing God matters more than convenience
---
## 🌐 Who Will Have All Men To Be Saved

This verse states God's desire plainly, he wants everyone saved.

It does not mean every person will automatically be saved.

It means God's heart holds no limit on who he invites.

That includes kings, enemies, and strangers named earlier in this chapter.

🌐 God desires all people to be saved

🚫 This does not guarantee universal salvation

❤️ God's invitation holds no limit

📖 Even enemies are included in that invitation
---
## 🔑 Knowledge Of The Truth

Knowledge here means more than hearing facts about God once.

It describes a real, settled understanding that changes how someone lives.

Paul pairs salvation with this deeper knowledge, not with salvation alone.

God wants people rescued and also able to understand what they were rescued from.

🔑 Knowledge means real, settled understanding

📚 More than just hearing facts once

🔄 Salvation and understanding go together

📖 God wants both rescue and clarity

# 1 Timothy 2:5-7
# ✝️ One Mediator Between God And Men
---
## 🤝 One Mediator Between God And Men

A mediator stands between two sides to bring them together.

Here the two sides are a holy God and sinful humanity.

Many religions in Paul's world leaned on priests and spirits to reach the gods.

Paul insists there is only one person who can actually bridge that gap.

🤝 Mediator means one who bridges two sides

⚖️ The two sides are God and humanity

🙏 Other religions leaned on many priests

📖 Jesus alone bridges that gap
---
## 👤 The Man Christ Jesus

Paul specifically calls Jesus a man here, not only God.

A mediator must genuinely belong to both sides it connects.

Jesus is fully God and fully man at the same time.

That is what makes him able to stand between God and people.

👤 Jesus is called a man here

⚖️ A mediator must belong to both sides

✝️ Jesus is fully God and fully man

📖 That is what makes him able to mediate
---
## 💰 A Ransom For All

A ransom is the price paid to free a captive or a slave.

Sin had left humanity trapped, unable to free itself.

Jesus paid that price himself, not with money but with his own life.

The word all repeats the wide scope from the start of this chapter.

💰 Ransom means the price to free a captive

⛓️ Sin had left humanity trapped

🩸 Jesus paid with his own life

📖 For all echoes this chapter's wide scope
---
## ⏳ To Be Testified In Due Time

Due time means the exact moment God had already planned.

The message of the ransom was not announced too early or too late.

Paul and others were now spreading that same message to the world.

God's timing had already been working long before Timothy was ever born.

⏳ Due time means God's planned moment

🎯 Not too early, not too late

📣 Paul spread that same message

📖 God's timing works before we arrive
---
## 📯 Ordained A Preacher, And An Apostle

Ordained here means officially appointed to a task, not chosen by vote.

Preacher describes someone who publicly announces a message.

Apostle describes someone personally sent out with real authority behind them.

Paul holds both roles because of a direct, personal calling from Christ.

📯 Ordained means officially appointed

📢 Preacher means one who announces

🧭 Apostle means one sent with authority

📖 Paul's calling came directly from Christ
---
## 🤚 I Speak The Truth In Christ, And Lie Not

This phrase sits inside parentheses but carries real weight.

False teachers were already active in Ephesus, as chapter one described.

Paul swears to his own honesty because his authority was being questioned.

He is not boasting, he is defending the truth he was sent to carry.

🤚 Paul swears to his own honesty

⚠️ False teachers were active in Ephesus

❓ His authority was being questioned

📖 He defends truth, not himself
---
## 🌍 A Teacher Of The Gentiles

Gentiles means anyone who is not Jewish by birth.

Peter mainly carried the gospel to Jewish audiences in the early church.

Paul's particular calling pointed outward, toward the wider non Jewish world.

Faith and verity together mean genuine belief paired with real truth.

🌍 Gentiles means non Jewish people

🤝 Peter mainly reached Jewish audiences

🧭 Paul's calling pointed to the wider world

📖 Faith and verity mean belief paired with truth

# 1 Timothy 2:8-10
# 🙌 How Men And Women Come To Worship
---
## 🙌 Lifting Up Holy Hands

Raising the hands during prayer was a common posture in the ancient world.

Holy here does not describe the hands themselves but the heart behind them.

Clean hands pictured a clean conscience approaching God without hidden sin.

The posture mattered less than what it was meant to represent.

🙌 Raised hands were a common prayer posture

🧼 Holy points to a clean heart

❤️ Clean hands pictured a clean conscience

📖 The posture represented something deeper
---
## 😡 Without Wrath And Doubting

Wrath here means ongoing anger held against someone else.

Doubting describes quarreling or disputing, not simple uncertainty.

Paul ties prayer directly to how people treat each other.

Unresolved anger and constant arguing were already problems in the Ephesian church.

😡 Wrath means ongoing anger

🗣️ Doubting means quarreling, not uncertainty

🤝 Prayer connects to how we treat others

📖 Anger and arguing blocked real worship
---
## 👗 Modest Apparel, With Shamefacedness And Sobriety

Modest apparel means clothing that does not seek to draw attention through excess.

Shamefacedness means a humble, appropriate sense of one's own limits.

Sobriety here means a clear, level headed self control.

Paul is describing an inward attitude, not only an outward outfit.

👗 Modest apparel avoids excess and show

😊 Shamefacedness means humble self awareness

🧠 Sobriety means level headed self control

📖 The attitude matters as much as the outfit
---
## 💇 Broided Hair, Or Gold, Or Pearls, Or Costly Array

Broided hair means hair elaborately braided and piled up, often woven with jewelry.

Wealthy women in Ephesus commonly displayed status through hairstyle and jewelry.

Gold and pearls served the same purpose, visible signs of wealth.

Costly array simply means expensive, eye catching clothing.

Paul is not condemning beauty, he is naming a culture built on being noticed.

💇 Broided hair means elaborate braided styles

💎 Gold and pearls signaled real wealth

🎭 Paul is not condemning beauty itself

📖 He names a culture built on being noticed
---
## 🌿 Which Becometh Women Professing Godliness

Becometh means fits properly, the way a good answer fits a careful question.

Professing godliness means publicly claiming to live for God.

Paul contrasts expensive display with something far more lasting, good works.

A life of real godliness becomes its own kind of beauty.

🌿 Becometh means fits properly

🙏 Professing godliness means publicly claiming faith

⚖️ Good works contrast with costly display

📖 Godly living becomes its own beauty

# 1 Timothy 2:11-15
# 📚 Learning, Teaching, And Creation Order
---
## 📚 Let The Woman Learn In Silence With All Subjection

In Paul's world, formal religious instruction for women was rare.

Telling women to learn at all was already a notable step forward.

Silence here points to a calm, attentive posture during instruction, not permanent muteness.

Subjection describes a willingness to receive teaching instead of resisting it.

📚 Women were told to learn, a real shift

🤫 Silence means calm attentiveness here

🙇 Subjection means willingness to receive teaching

📖 Learning itself was being encouraged
---
## 🚫 I Suffer Not A Woman To Teach

Suffer here is an old word meaning to permit or allow.

Paul gives Timothy a specific instruction for the church at Ephesus.

Scholars disagree on how broadly this applies.

Some read it as a rule for every church across all time.

Others read it as addressing one specific problem happening in Ephesus.

The text itself does not settle every detail of that debate.

🚫 Suffer means permit or allow

🏛️ This instruction was written to Ephesus

❓ Scholars disagree on how broadly it applies

📖 The text does not settle every detail
---
## 👑 Nor To Usurp Authority Over The Man

Usurp means to seize a position of power that does not rightfully belong to someone.

This exact Greek word appears only this one time in the whole New Testament.

That rarity makes its precise meaning hard to pin down with full certainty.

Many scholars believe it points to one harmful, forceful kind of control.

It likely does not describe all teaching by women everywhere.

👑 Usurp means to seize power wrongly

🔍 This exact word appears only here

❓ Its precise meaning is debated

📖 It likely names one harmful kind of control
---
## 🌳 For Adam Was First Formed, Then Eve

Paul reaches back to the creation account in Genesis chapter two.

God formed Adam first and then formed Eve from his side.

Paul uses that order to explain something about design, not about worth.

Being formed first never made Adam more valuable than Eve.

🌳 Points back to Genesis chapter two

🧍 Adam was formed first, then Eve

⚖️ Order speaks to design, not worth

📖 Equal value, different order
---
## 🐍 Adam Was Not Deceived, But The Woman Being Deceived Was In The Transgression

This looks back to Genesis chapter three, when the serpent tempted Eve.

Deceived means tricked into believing something false.

Transgression means a direct violation of a known command.

Paul notes that Eve was deceived first.

Adam, by contrast, sinned with full awareness.

🐍 Points back to Genesis chapter three

🎭 Deceived means tricked by something false

⚠️ Transgression means breaking a known command

📖 Both failed, but in different ways
---
## 👶 She Shall Be Saved In Childbearing

This is one of the hardest verses in this entire letter to interpret.

Saved does not likely mean earning eternal salvation through having children.

Many scholars believe it points to safety through childbirth itself.

Others believe it points forward to the birth of Christ himself.

That birth undid the curse named back in Genesis chapter three.

👶 One of this letter's hardest verses

🚫 Not likely salvation earned by childbirth

🩺 Many scholars see safety through childbirth

📖 Others connect it to Christ's own birth
---
## 🙏 If They Continue In Faith And Charity And Holiness With Sobriety

The pronoun shifts here from she to they, widening the focus.

Continuing names an ongoing choice, not a one time decision.

Faith, charity, holiness, and sobriety describe a whole life, not a single moment.

Paul ends this chapter the way he started it.

Both point back to a life of real devotion.

🔀 Pronoun shifts from she to they

⏳ Continuing means an ongoing choice

🧩 Four words describe a whole life

📖 The chapter ends where it began, devotion
---
## 💗 Charity

Charity in the King James Bible does not mean giving to charity today.

It translates a Greek word meaning selfless, sacrificial love for others.

Paul lists it alongside faith and holiness as a mark of real devotion.

The same word appears throughout the New Testament to describe God's own love.

💗 Charity means selfless, sacrificial love

🚫 Not the modern idea of donations

❤️ The same word describes God's love

📖 Real devotion includes loving others well
`.trim();

export const FIRST_TIMOTHY_TWO_PERSONAL_SECTIONS = parseFirstTimothyTwoRawNotes(FIRST_TIMOTHY_TWO_RAW_NOTES);
