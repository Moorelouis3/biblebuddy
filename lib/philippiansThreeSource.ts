export type PhilippiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePhilippiansThreeRawNotes(rawText: string): PhilippiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PhilippiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Philippians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Philippians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Philippians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Philippians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Philippians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Philippians 3:${startVerse}` : `Philippians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Philippians 3 sections, received " + sections.length);
  }

  return sections;
}

const PHILIPPIANS_THREE_RAW_NOTES = `# Philippians 3:1-3
# 🐕 Beware Of The Dogs
---
## 😊 Rejoice In The Lord

Finally does not mean this is the end of the letter.

Here it means Paul is shifting to a new, serious topic.

Brethren shows he still writes as family, even with a warning coming.

Rejoice in the Lord points to a joy anchored in Christ himself.

That kind of joy does not depend on easy circumstances.

😌 Finally signals a shift here

👨‍👩‍👧 Brethren shows Paul writes as family

✝️ Joy is anchored in the Lord

📖 Real joy outlasts hard circumstances

## ✍️ To Write The Same Things

Paul is not ashamed to repeat a warning he already gave.

Grievous means heavy or burdensome to carry.

Writing the same warning again was not a burden for Paul.

Safe pictures a guard or fence that keeps something protected.

Repetition here is not laziness, it is a safeguard for them.

🔁 Paul repeats a warning on purpose

🪨 Grievous means heavy or burdensome

🛡️ Safe pictures something being guarded

📖 Repetition protects, it does not burden

## 🐕 Beware Of Dogs

In Jewish culture, calling someone a dog was a harsh insult.

Dogs were seen as unclean scavengers, not loyal pets.

Jewish teachers sometimes used the word dog for Gentiles outside the covenant.

Paul flips that same insult onto teachers demanding circumcision.

He is warning the Philippians away from false teachers, not outsiders.

🐕 Dog was a harsh ancient insult

🚫 Dogs were unclean scavengers, not pets

🔄 Paul flips the insult around

📖 The warning targets false teachers

## ✂️ Beware Of The Concision

Concision means a cutting or mutilation of the body.

The word sounds almost like circumcision in the original language.

Paul uses that closeness as a deliberate insult.

He is saying their rite is now just a cut, nothing more.

True circumcision of the heart has already replaced it.

✂️ Concision means a harsh cutting

🗣️ It sounds like circumcision on purpose

😏 Paul turns their own word on them

📖 Heart circumcision has already replaced it

## 💛 We Are The Circumcision

Paul redefines circumcision away from a physical mark.

True circumcision now describes a changed heart, not a changed body.

Anyone who trusts Christ belongs to this true circumcision.

Being physically cut was never what mattered most to God.

The real mark of belonging to God was always inward.

💛 Circumcision now means a changed heart

🙌 Trusting Christ is what truly matters

🚫 Physical cutting was never the point

📖 The real mark was always inward

## 🙏 Worship God In The Spirit

True worship was never about following a checklist of rituals.

Worship in the spirit means a real, inward devotion to God.

It shows up in a changed heart first.

Only then does it appear in outward acts.

Paul contrasts this with people trusting outward performance alone.

🙏 Worship is not a checklist

❤️ It starts with a changed heart

🎭 Outward acts come after, not before

📖 Inward devotion matters most to God

## 🚫 No Confidence In The Flesh

Flesh here means human effort and personal credentials.

That includes birth, family background, and religious achievement.

Paul is about to list his own impressive flesh based credentials.

He lists them only to show why none of it is enough.

🚫 Flesh means human effort and status

📜 It covers birth and achievement both

👀 Paul is about to list his own

📖 None of it was ever enough

# Philippians 3:4-6
# 📜 A Pharisee Of The Pharisees
---
## 📜 Circumcised The Eighth Day

The law required Jewish boys to be circumcised eight days after birth.

Paul was circumcised exactly on schedule, not as a late convert.

Many Gentile converts to Judaism were circumcised as adults instead.

Paul's pedigree started from his very first week of life.

📜 The law required eighth day circumcision

👶 Paul kept it from infancy

🙋 Converts were often circumcised as adults

📖 His pedigree began in his first week

## 🏛️ Of The Stock Of Israel

Stock of Israel means full blooded, native born Jewish ancestry.

Paul was not a convert who joined the faith later in life.

His family line traced directly back through the people of Israel.

This was the opposite of an outsider earning his way in.

🏛️ Stock means pure Israelite ancestry

🙅 Paul was never an outside convert

🧬 His family line traced back directly

📖 This was inherited, not earned

## 👑 Of The Tribe Of Benjamin

Israel was divided into twelve tribes, each with its own history.

Benjamin was a small tribe, but a notable one.

Israel's first king, Saul, came from this exact tribe.

Knowing your tribe was a way of knowing exactly where you belonged.

👑 Benjamin gave Israel its first king

🔍 It was a small but known tribe

🧭 Tribe showed exactly where you belonged

📖 Paul's roots were specific, not vague

## 🗣️ An Hebrew Of The Hebrews

Many Jews in this era spoke mainly Greek and lived by Greek customs.

Hebrew of the Hebrews means Paul kept the language and customs at home too.

This was not just ethnic Jewish blood, it was a Jewish upbringing.

Paul could not be dismissed as someone disconnected from the culture.

🗣️ Many Jews spoke mainly Greek instead

🏠 Paul kept Hebrew language at home

🧑‍🦳 This was culture, not only blood

📖 No one could call him disconnected

## 📚 As Touching The Law, A Pharisee

Pharisees were the strictest group within Jewish religious life.

They devoted themselves to keeping every detail of the law of Moses.

Being a Pharisee was not a casual label.

It meant years of serious training and rigid daily practice.

📚 Pharisees kept the strictest standard

🎓 It took years of serious training

📏 Every detail of the law mattered

📖 This was Paul's serious religious life

## 🔥 Concerning Zeal, Persecuting The Church

Zeal means intense devotion and passionate energy for a cause.

Paul's zeal once drove him to attack the early church violently.

He arrested and imprisoned believers before his own conversion.

This zeal was sincere, but it was aimed at the wrong target.

🔥 Zeal means intense, burning devotion

⚔️ Paul once attacked the early church

🔒 He arrested believers before his conversion

📖 Sincere zeal was aimed wrongly

## ✅ Touching The Righteousness Which Is In The Law, Blameless

Blameless does not mean Paul believed he was sinless.

It means no one could point to a law he had broken.

By an outward, checklist standard, his record looked perfect.

That outward record is exactly what Paul is about to set aside.

✅ Blameless means no broken rule found

📋 His record looked perfect on paper

👀 This was an outward standard only

📖 Paul is about to set it aside

# Philippians 3:7-9
# ⚖️ Counting It All Loss
---
## ⚖️ Those Things Were Gain To Me

Gain and loss are accounting words, like entries in a ledger.

Everything Paul once listed as an asset, he moved to the loss column.

His pedigree, training, and zeal did not disappear.

He simply stopped trusting any of it for righteousness.

⚖️ Gain and loss are ledger words

🔄 Paul moved his assets to loss

📜 His pedigree and training stayed real

📖 He stopped trusting them for righteousness

## 💔 I Have Suffered The Loss Of All Things

This loss was not only in Paul's mind.

He lost real standing, safety, and belonging among his own people.

Following Christ cost him something true and painful.

His counted loss was backed up by a lived loss.

💔 This loss was real, not mental

🏃 He lost standing among his people

✝️ Following Christ cost him something true

📖 His words were backed by his life

## 💎 The Excellency Of The Knowledge Of Christ

Excellency means a worth so great it outweighs everything else.

Knowing Christ is not just knowing facts about him.

It means a real, personal relationship with Jesus himself.

Next to that relationship, every old credential loses its shine.

💎 Excellency means surpassing, outweighing worth

🤝 Knowing Christ means a real relationship

📚 It is not just facts about him

📖 Every old credential loses its shine

## 🗑️ Count Them But Dung

Dung is a blunt, crude word for waste or garbage.

Paul chooses an ugly word on purpose, not a polite one.

His old credentials are not just unhelpful to him now.

They are worthless to him, next to knowing Christ.

🗑️ Dung means garbage or waste

😤 Paul chose a deliberately ugly word

🔄 His credentials became worthless to him

📖 His whole value system had changed

## 🏆 That I May Win Christ

Win continues the same gain and loss picture from before.

Paul is not saying Christ can be lost like a prize.

He means gaining a real, growing relationship with Christ.

Everything else was worth losing for that one relationship.

🏆 Win continues the ledger picture

🙅 Christ is not a prize to lose

🤝 It means a growing relationship with him

📖 One relationship was worth losing everything

## 🙅 Not Having Mine Own Righteousness

Own righteousness means a moral record a person builds alone.

Paul had tried to build that record through careful law keeping.

He now says that self built record cannot save anyone.

What he needed could not come from his own effort.

⚖️ Own righteousness means self built record

🔨 Paul once tried to build this

🚫 Self built records cannot save anyone

📖 Rescue had to come from outside him

## ✝️ The Righteousness Which Is Of God By Faith

This righteousness is not earned, it is given.

By faith means it is received through trusting God.

It comes from God himself, not from a person's own effort.

That is the exact trade Paul makes in this whole passage.

✝️ Righteousness here is given, not earned

🙏 Faith means trusting, not working

🎁 It comes from God, not effort

📖 Paul trades his effort for God's gift

# Philippians 3:10-11
# ⚡ Knowing The Power Of His Resurrection
---
## 🤝 That I May Know Him

Know here means a real, experienced relationship, not just information.

Paul already believed facts about Jesus for years as a Pharisee.

This is a deeper, personal knowing he is still pursuing.

Facts about Christ are not the same as walking with him.

🤝 Know means real relationship, not facts

📚 Paul already had the facts before

❤️ This knowing is personal and ongoing

📖 Walking with Christ beats knowing about him

## ⚡ The Power Of His Resurrection

Resurrection power is the same power that raised Jesus from death.

Paul wants that power active in his own daily life.

It is not just a future hope for after death.

That power can change how a person lives right now.

⚡ The same power that raised Jesus

🔋 Paul wants it active in his life

⏳ It is not only a future hope

📖 Resurrection power changes life right now

## 🤕 The Fellowship Of His Sufferings

Fellowship means sharing something together, not standing on the sidelines.

Paul welcomes a real share in Christ's own suffering.

This is not suffering to avoid if at all possible.

For Paul, it was part of following Christ closely.

🤕 Fellowship means sharing something together

🙌 Paul welcomes sharing in Christ's suffering

🚫 This is not suffering to dodge

📖 Suffering can be part of following Christ

## 🪞 Being Made Conformable Unto His Death

Conformable means shaped to match a pattern exactly.

Paul is not asking to die physically like Jesus did.

He is describing a life shaped by the same self giving pattern.

Dying to old pride and comfort becomes part of following Christ.

🪞 Conformable means shaped to match

🙅 Not a literal copy of his death

❤️ A life shaped by self giving

📖 Dying to pride is part of following

## ⚰️ Attain Unto The Resurrection Of The Dead

Paul is not doubting that resurrection will happen for believers.

He is expressing humble hope, not showing off certainty.

Even an apostle like Paul still looked forward to this hope.

Confidence in Christ does not erase a healthy humility.

⚰️ Paul is not doubting resurrection itself

🙇 He speaks with humble hope instead

🧑‍💼 Even an apostle held this hope

📖 Confidence and humility can stand together

# Philippians 3:12-14
# 🏃 Press Toward The Mark
---
## 🙅 Not As Though I Had Already Attained

Paul denies having fully arrived in his spiritual life.

Perfect here does not mean sinless or completely finished growing.

Even after everything just described, Paul still sees himself in progress.

That honesty protects against pride in his own spiritual journey.

🙅 Paul denies having fully arrived

🌱 Perfect means mature, not sinless

🚶 He still saw himself in progress

📖 Honesty protects against spiritual pride

## 🏃 I Follow After

Follow after pictures a runner chasing hard after a goal.

Paul is not coasting on his past religious achievements.

He keeps actively pursuing a deeper walk with Christ.

This pursuit never fully stops in this life.

🏃 Follow after means actively chasing

🛑 Paul refuses to coast on the past

➡️ He keeps pursuing Christ actively

📖 The pursuit does not stop here

## ✋ Apprehended Of Christ Jesus

Apprehend means to grab hold of something firmly.

Christ grabbed hold of Paul first, back on the road to Damascus.

Now Paul reaches to grab hold of all Christ called him toward.

Christ's grip on Paul came before Paul's grip on Christ.

✋ Apprehend means to grab hold firmly

🛣️ Christ grabbed Paul on the Damascus road

🎯 Paul now reaches for Christ's purpose

📖 Christ took hold of him first

## 🔙 Forgetting Those Things Which Are Behind

Behind means both Paul's failures and his past religious achievements.

Forgetting does not mean the memories disappear completely.

It means refusing to let the past control his focus now.

A runner cannot win by staring backward.

🔙 Behind means failures and achievements both

🧠 Forgetting means refusing to dwell there

🏃 A runner cannot win staring backward

📖 The past no longer controls Paul

## 🏃 Reaching Forth Unto Those Things Which Are Before

Reaching forth pictures a runner straining forward with his whole body.

Before means the future goal still ahead, not yet reached.

His whole posture leans toward what is coming.

Faith keeps leaning forward, even without having fully arrived.

🏃 Reaching forth means straining forward

🎯 Before means the goal still ahead

🧍 His whole posture leans forward

📖 Faith keeps leaning even unfinished

## 🎯 I Press Toward The Mark

Mark names the finish line marker in an ancient footrace.

Press means pushing hard, not coasting toward the end.

Paul pictures his whole life as a race still being run.

The goal stays fixed as the race continues.

🎯 Mark means the race's finish line

💪 Press means pushing hard, not coasting

🏃 His whole life is pictured as a race

📖 The goal stays fixed throughout

## 🏅 The Prize Of The High Calling Of God

Prize names the reward waiting for the one who finishes well.

High calling means a calling that comes down from God himself.

This calling was never Paul's own idea to begin with.

The reward and the calling both belong to God, not Paul.

🏅 Prize means the reward for finishing

📯 High calling comes from God himself

🙅 It was never Paul's own idea

📖 The reward belongs to God, not Paul

# Philippians 3:15-16
# 📏 Walking By The Same Rule
---
## 🌱 As Many As Be Perfect, Be Thus Minded

Perfect here again means mature, not flawless.

Paul calls mature believers to think this same forward focused way.

Spiritual maturity shows up in direction, not in claiming perfection.

Mature believers keep chasing Christ instead of settling down.

🌱 Perfect means mature, not flawless

🧭 Maturity shows up in direction

🛑 It does not mean settling down

📖 Mature believers keep chasing Christ

## 🙏 God Shall Reveal Even This Unto You

Paul expects some believers to see things differently for now.

He does not demand instant agreement on every point.

He trusts God to correct understanding over time.

That kind of patience protects unity during real disagreement.

🙏 Paul expects some real disagreement

⏳ He trusts God's timing to correct it

🤝 Patience protects unity during disagreement

📖 God can grow understanding over time

## 📏 Let Us Walk By The Same Rule

Rule here pictures a measuring line used to keep something straight.

Whatever ground they had already gained, Paul tells them to hold it steady.

Growth should not come with constant backsliding.

A shared standard keeps a whole church moving in the same direction.

📏 Rule means a straight measuring line

🧱 Hold steady whatever ground is gained

🔁 Growth should not mean backsliding

📖 A shared standard keeps unity moving

## 🧠 Let Us Mind The Same Thing

Mind the same thing does not mean identical opinions on every detail.

It means staying united on the main purpose and direction.

Paul already asked for this same unity back in chapter two.

A shared direction holds a church together even through disagreement.

🧠 Mind the same means shared direction

🔁 Paul already asked for this before

🤝 Unity does not require identical opinions

📖 Shared direction holds a church together

# Philippians 3:17-19
# ⚔️ Enemies Of The Cross
---
## 👥 Be Followers Together Of Me

Paul is not asking them to worship him.

He is asking them to copy a pattern of following Christ.

He already told them earlier to copy his example as he copies Christ.

A visible example makes an invisible faith easier to copy.

👥 Paul is not asking for worship

🪞 He offers himself as an example

✝️ The pattern itself points to Christ

📖 A visible example helps faith grow

## 👀 Mark Them Which Walk So

Mark means watch closely and take note.

Paul wants them to notice good examples on purpose.

Ensample means a pattern worth copying.

Good examples are worth pointing out by name.

👀 Mark means watch closely on purpose

🧭 Ensample means a pattern worth copying

🙌 Good examples deserve to be named

📖 Paying attention to examples takes effort

## 😭 Now Tell You Even Weeping

Paul is not writing this warning in anger.

Weeping shows real grief over people heading toward real danger.

He has warned them about this before, more than once.

A hard warning can still come from a heart full of love.

😭 Paul writes this warning in grief

🔁 He had warned them before

❤️ Grief does not cancel out love

📖 Hard warnings can come from love

## ⚔️ The Enemies Of The Cross Of Christ

Paul names people he has warned them about many times before.

He writes this with real tears, not cold judgment.

Enemies of the cross means opposing what the cross stands for.

Someone can claim Christ's name and still live against his cross.

📛 Paul names a familiar warning again

😢 He writes with real tears

⚔️ They oppose what the cross stands for

📖 Claiming Christ is not living it

## 💔 Whose End Is Destruction

End here means final outcome, not a neutral stopping point.

Paul is giving a serious, sobering warning, not an exaggeration.

False teaching does not lead somewhere harmless.

The warning is strong because the stakes are real.

💔 End means the final outcome

⚠️ This is a sobering warning

🚧 False teaching leads somewhere harmful

📖 Paul warns because the stakes are real

## 🍔 Whose God Is Their Belly

Belly pictures physical appetite and craving treated like a god.

These people serve their own desires more than they serve the Lord.

Food and bodily comfort are not inherently evil here.

The problem is letting a craving take God's place.

🍔 Belly means craving, treated like a god

🙅 They serve desire more than the Lord

🍽️ Food itself is not the real problem

📖 A craving had taken God's place

## 😳 Whose Glory Is In Their Shame

Glory here means something a person is proud of and boasts about.

Paul says they are proud of exactly what should embarrass them.

Their values are pointed in the wrong direction entirely.

What they celebrate is actually evidence against them.

😳 Glory means something they boast about

🙃 They boast about what should shame them

🧭 Their values point the wrong direction

📖 Their celebration is evidence against them

## 🌍 Who Mind Earthly Things

Mind here means where someone's attention and thinking stay fixed.

Earthly things means the concerns of this life only.

Paul is building a direct, sharp contrast with what comes next.

Heavenly focus is about to replace this earthly focus completely.

🌍 Mind means where attention stays fixed

📅 Earthly things means this life only

🔄 Paul is building a sharp contrast

📖 Heavenly focus is coming next

# Philippians 3:20-21
# 🏛️ Citizens Of Heaven
---
## 🏛️ Our Conversation Is In Heaven

Conversation here is an old English word, not chatting.

It means citizenship, a person's true civic home and identity.

Philippi was a Roman colony, full of people proud of Roman citizenship.

Paul tells them their deeper citizenship belongs to heaven instead.

🏛️ Conversation here means citizenship

🏙️ Philippi was proud of Roman citizenship

🌌 Paul points to a higher citizenship

📖 Heaven is the believer's true home

## 👀 We Look For The Saviour

Look for means eagerly watching, not idly waiting.

A citizen waiting on word from home pictures this well.

Paul expects Jesus to return as both Lord and Savior.

That hope stays active, not forgotten in daily life.

👀 Look for means eagerly watching

🏠 It pictures waiting on word from home

✝️ Jesus returns as both Lord and Savior

📖 This hope stays active, not forgotten

## ✨ Shall Change Our Vile Body

Vile body does not call the human body evil in itself.

It means a body that is weak, mortal, and easily broken.

Paul is not ashamed of physical bodies.

Christ himself took on a real human body.

What changes here is weakness, not basic goodness.

✨ Vile body means weak, not evil

🧍 Christ also took a real body

🔧 What changes is weakness, not worth

📖 Our bodies have a future ahead

## 🌟 Fashioned Like Unto His Glorious Body

Fashioned means reshaped to match a pattern.

Christ's own resurrected body is that pattern.

Believers are promised a real, physical transformation one day.

This is not becoming a ghost, it is becoming glorious.

🌟 Fashioned means reshaped to match

✝️ Christ's resurrected body is the pattern

👻 This is not becoming a ghost

📖 The promise is a glorious, real body

## 💪 According To The Working Whereby He Is Able

Working here means active, ongoing power, not a one time act.

Subdue means bringing something fully under control.

The same power that controls the whole universe will remake believers' bodies.

The chapter ends by resting the whole promise on Christ's own power.

💪 Working means active, ongoing power

🌌 Subdue means bringing fully under control

🌍 This same power controls the universe

📖 Christ's own power guarantees the promise
`.trim();

export const PHILIPPIANS_THREE_PERSONAL_SECTIONS = parsePhilippiansThreeRawNotes(PHILIPPIANS_THREE_RAW_NOTES);
