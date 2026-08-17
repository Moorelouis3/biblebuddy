export type ProverbsFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsFourteenRawNotes(rawText: string): ProverbsFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 14:${startVerse}` : `Proverbs 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 14 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_FOURTEEN_RAW_NOTES = `# Proverbs 14:1-5
# 🏠 A Wise Woman Builds, Honest Lips Preserve
---
## 🏠 Every Wise Woman Buildeth Her House

"House" here means more than a building.

It means the whole life of a family, its stability and reputation.

A wise woman builds this through years of steady, faithful choices.

Every small daily choice adds to what she is building.

🏠 House means a whole family's life

👷 A wise woman builds it steadily

⏳ It grows through years of choices

📖 Small daily faithfulness builds a lasting home

## 🔨 The Foolish Plucketh It Down With Her Hands

"Plucketh down" means tears apart, the opposite of building.

This is not one dramatic act but a pattern of small, careless choices.

Laziness or a sharp tongue can slowly wreck a home.

The same hands that could build are shown here doing the tearing.

🔨 Plucketh down means tears apart

🐌 It happens through small careless choices

👅 A sharp tongue can wreck a home

📖 The same hands can build or destroy

## 🧭 He That Walketh In His Uprightness Feareth The LORD

"Uprightness" means living an honest, straight path.

It does not mean perfection, only a sincere effort to do right.

This kind of life naturally leads to real reverence for God.

The two are shown here as connected, not separate.

🧭 Uprightness means an honest, straight path

🙏 It does not require perfection

❤️ Honest living leads to real reverence

📖 A straight path and fearing God connect

## 🌀 He That Is Perverse In His Ways Despiseth Him

"Perverse" means twisted, choosing to bend away from what is right.

This is the direct opposite of the upright person just described.

"Despiseth" means treats with contempt, not simple disagreement.

A crooked life is shown here as a quiet rejection of God himself.

🌀 Perverse means twisted or bent from right

🔄 This opposes the upright person just named

🙄 Despiseth means treats with contempt

📖 A crooked life quietly rejects God

## 🪵 In The Mouth Of The Foolish Is A Rod Of Pride

"Rod of pride" pictures proud, arrogant speech used like a weapon.

A rod was a stick used to strike or beat something.

A fool's proud words are shown here doing real harm to others.

This is not confidence, it is pride turned into a tool of hurt.

🪵 Rod pictures a stick used to strike

👑 Pride here means arrogant, boastful speech

💥 A fool's words become a weapon

📖 Proud speech is pride turned into harm

## 🛡️ The Lips Of The Wise Shall Preserve Them

"Preserve" means keep safe, protect from harm over time.

This contrasts directly with the fool's rod of pride just named.

Careful speech is pictured here as a real form of self protection.

What a wise person says ends up guarding their own life.

🛡️ Preserve means keep safe over time

🔄 This contrasts the fool's proud rod

🗣️ Careful speech protects the speaker

📖 Wise words guard the one who says them

## 🐂 Where No Oxen Are, The Crib Is Clean

"Crib" means a feeding trough or stall for animals.

A clean, empty crib means no oxen are being kept or fed there.

That sounds tidy, but it actually means nothing is being produced.

An empty barn looks neat because nothing is happening in it.

🐂 Crib means a feeding trough for animals

🧹 An empty crib looks clean

🚫 But it means nothing is being produced

📖 Neatness here hides real emptiness

## 📈 Much Increase Is By The Strength Of The Ox

"Increase" means growth, more crops or more wealth over time.

An ox plowing a field made the ground messy and the barn dirty.

That mess was the actual source of the farm's real productivity.

This proverb values real growth over a tidy but empty life.

📈 Increase means real growth over time

🐂 The ox made real mess doing real work

💪 That mess produced actual productivity

📖 Real growth is worth some mess

## ⚖️ A Faithful Witness Will Not Lie

"Witness" means someone giving testimony, often in a legal case.

"Faithful" means trustworthy, keeping their word even under pressure.

Ancient Israel depended on witnesses since there were no cameras or records.

A truthful witness protected the whole community's trust in justice.

⚖️ Witness means someone giving testimony

🤝 Faithful means trustworthy under pressure

📜 Israel depended on witnesses for justice

📖 Truthful testimony protects the whole community

## ⚠️ A False Witness Will Utter Lies

"Utter" means speaks out loud, states as if it were true.

A false witness could cost someone their property, freedom, or even their life.

This is the direct opposite of the faithful witness just named.

Lying under oath is treated here as a serious threat to justice.

🗣️ Utter means states out loud as true

⚠️ A false witness could cost a life

🔄 This opposes the faithful witness above

📖 Lying under oath threatens real justice

# Proverbs 14:6-10
# 🔍 Empty Search, Real Understanding
---
## 🙄 A Scorner Seeketh Wisdom, And Findeth It Not

"Scorner" means someone who mocks wisdom instead of respecting it.

This person may even go looking for wisdom, but with the wrong attitude.

Real wisdom cannot be found by someone unwilling to actually receive it.

The search fails because the heart behind it is not sincere.

🙄 Scorner means someone who mocks wisdom

🔍 This person may even search for it

🚫 Wisdom cannot be found this way

📖 A mocking heart blocks real understanding

## 🧠 Knowledge Is Easy Unto Him That Understandeth

"Understandeth" means someone with real insight, not just information.

For this person, learning new things comes naturally and quickly.

This contrasts directly with the scorner who searches and finds nothing.

A humble, teachable heart makes wisdom easy to receive.

🧠 Understandeth means someone with real insight

⚡ Learning comes naturally for this person

🔄 This contrasts the failed scorner above

📖 A teachable heart makes wisdom easy

## 🚶 Go From The Presence Of A Foolish Man

This is a direct command, not just friendly advice.

Proverbs often values distance from fools over trying to fix them.

Staying near constant foolishness can wear down a person's own character.

The wise response here is simply to leave.

🚶 This is a direct command

📏 Proverbs values distance from fools

🌀 Foolishness can wear down character

📖 Sometimes the wisest move is to leave

## 🗣️ When Thou Perceivest Not In Him The Lips Of Knowledge

"Perceivest" means notice or recognize by paying attention.

"Lips of knowledge" means speech that actually contains real understanding.

This line gives the test for spotting a foolish man in the first place.

If a person's words carry no real knowledge, that is the warning sign.

👀 Perceivest means notice by paying attention

🗣️ Lips of knowledge means real understanding in speech

🧪 This verse gives a real test

📖 Empty speech is the warning sign

## 🧠 The Wisdom Of The Prudent Is To Understand His Way

"Prudent" means careful and thoughtful about the direction of a life.

"His way" means the actual path a person is walking, their choices and habits.

This wisdom is practical, not abstract or theoretical.

It means honestly knowing where a person's own choices are leading them.

🧠 Prudent means careful and thoughtful

🛤️ His way means a person's actual path

🔧 This wisdom is practical, not abstract

📖 It means knowing where choices lead

## 🎭 The Folly Of Fools Is Deceit

"Deceit" means dishonesty, tricking others or even tricking themselves.

This contrasts directly with the honest self awareness just described.

A fool's foolishness often shows up as self deception first.

They cannot see their own path clearly because they are lying to themselves.

🎭 Deceit means dishonesty toward others or self

🔄 This contrasts the honest awareness above

🪞 A fool deceives themselves first

📖 Self deception blinds a person's own path

## 😂 Fools Make A Mock At Sin

"Make a mock" means treat something as a joke, not serious at all.

Fools are shown here laughing at wrongdoing instead of taking it seriously.

This reveals a deeper problem than just bad behavior.

Their whole way of judging right and wrong has become twisted.

😂 Make a mock means treat as a joke

⚠️ Fools laugh at wrongdoing itself

🌀 This reveals a deeper twisted judgment

📖 Mocking sin shows a broken conscience

## 🤝 Among The Righteous There Is Favour

"Favour" here means goodwill, both from other people and from God.

This is the opposite outcome from the mockery just described.

Taking sin seriously is shown here as something that earns real respect.

A righteous community values honesty about wrong more than jokes about it.

🤝 Favour means real goodwill from others and God

🔄 This opposes the mockery just named

✅ Taking sin seriously earns respect

📖 Honesty about wrong is valued here

## 💔 The Heart Knoweth His Own Bitterness

"Bitterness" here means deep, private pain or grief.

This proverb states a simple truth, some sorrow cannot fully be shared.

Even close friends or family cannot feel exactly what another person feels.

Personal pain always has a part that stays hidden inside.

💔 Bitterness means deep private pain

🔒 Some sorrow cannot fully be shared

👥 Even close family cannot feel it exactly

📖 Personal pain always stays partly hidden

## 🎉 A Stranger Doth Not Intermeddle With His Joy

"Intermeddle" means to fully share in or take part in something.

"Stranger" here simply means someone outside that person's own experience.

This proverb says the same thing about joy that it just said about pain.

A person's deepest feelings, good or bad, remain uniquely their own.

🎉 Intermeddle means to fully share in

🚶 Stranger means someone outside the experience

🔄 Joy gets the same truth as pain

📖 Deepest feelings remain uniquely a person's own

# Proverbs 14:11-15
# 🛤️ A Way That Seems Right, A Heart That Hides Pain
---
## 💥 The House Of The Wicked Shall Be Overthrown

"Overthrown" means violently torn down, not simply fading away.

"House" here means a family's whole life and legacy, not just a building.

This proverb pictures wicked living as something that eventually collapses.

The collapse is shown as forceful, not a slow accident.

💥 Overthrown means violently torn down

🏠 House means a family's whole legacy

🌀 Wicked living eventually collapses

📖 The collapse is forceful, not accidental

## ⛺ The Tabernacle Of The Upright Shall Flourish

"Tabernacle" here means a tent, a much simpler dwelling than a house.

Even so, this simple tent is shown outlasting the wicked man's whole house.

"Flourish" means grows and thrives, the opposite of overthrown.

What a life is built on matters more than how impressive it looks.

⛺ Tabernacle means a simple tent

🏠 A simple tent outlasts a grand house

🌱 Flourish means grows and thrives

📖 What a life is built on matters most

## 🤔 There Is A Way Which Seemeth Right Unto A Man

"Seemeth right" means it genuinely feels correct from the inside.

A person's own judgment can be sincerely wrong without realizing it.

This proverb warns that certainty is not the same as truth.

Feeling confident about a choice does not guarantee it is a good one.

🤔 Seemeth right means it genuinely feels correct

🙈 A person can be sincerely wrong

⚠️ Certainty is not the same as truth

📖 Confidence does not guarantee a good choice

## 🏁 The End Thereof Are The Ways Of Death

"The end thereof" means where that confident path actually leads.

This proverb repeats again later in the book almost word for word.

The repetition shows how seriously this book takes the warning.

A path can feel completely right and still lead somewhere fatal.

🏁 The end thereof means where the path leads

🔁 This proverb repeats later in the book

⚠️ Confidence and destination are not the same

📖 Feeling right does not mean it is safe

## 😢 Even In Laughter The Heart Is Sorrowful

A smile can sit right on top of real, hidden grief.

This does not mean laughter is always fake or wrong.

The outside of a person and the inside can tell two different stories.

This proverb takes seriously how well people can hide their pain.

😢 A smile can hide real hidden grief

🎭 Outside and inside can tell different stories

👀 This takes hidden pain seriously

📖 Laughter does not always mean happiness

## 😄 The End Of That Mirth Is Heaviness

"Mirth" means cheerfulness, laughter and lighthearted fun.

"Heaviness" means a heavy, weighed down sadness.

Even real happiness in this life eventually gives way to some sorrow.

This proverb is honest about joy's limits in a broken world.

😄 Mirth means cheerfulness and lighthearted fun

😔 Heaviness means a heavy weighed down sadness

⏳ Even real joy eventually meets some sorrow

📖 This is honest about joy's limits

## 🔙 The Backslider In Heart Shall Be Filled With His Own Ways

"Backslider" means someone who has turned away from following God.

"Filled with his own ways" means they get exactly what their own choices produce.

This is not random punishment, it is simply the natural harvest of a life.

Turning away from God leaves a person only with themselves.

🔙 Backslider means someone who turned from God

🌾 Filled with his ways means his own harvest

⚖️ This is not random, it is consequence

📖 Turning from God leaves a person only themselves

## 😌 A Good Man Shall Be Satisfied From Himself

"Satisfied from himself" means his contentment comes from within, not from outside praise.

A life actually lived with integrity produces real, lasting peace.

This contrasts the backslider, who is also filled from within, but emptily.

What fills a life on the inside shapes how much peace it holds.

😌 Satisfied from himself means contentment from within

✅ Integrity produces real lasting peace

🔄 This contrasts the empty backslider above

📖 What fills a life shapes its peace

## 🙋 The Simple Believeth Every Word

"Simple" in Proverbs means naive, not stupid, someone who has not yet learned discernment.

This person accepts whatever they are told without checking if it is true.

That kind of trust leaves a person open to being easily misled.

Naivety here is treated as dangerous, not innocent.

🙋 Simple means naive, not yet discerning

✅ This person believes without checking

⚠️ That trust leaves them easily misled

📖 Naivety here is dangerous, not innocent

## 🔍 The Prudent Man Looketh Well To His Going

"Looketh well" means examines carefully before acting.

"His going" means the path or direction of his life.

This is the direct opposite of the gullible simple person just named.

Wisdom here means checking the road ahead before walking it.

🔍 Looketh well means examines carefully

🛤️ His going means the direction of his life

🔄 This opposes the gullible simple person

📖 Wisdom checks the road before walking it

# Proverbs 14:16-20
# 😤 Quick Anger And Inherited Folly
---
## 👀 A Wise Man Feareth, And Departeth From Evil

"Feareth" here means takes danger seriously, stays alert and cautious.

"Departeth" means actually moves away, not just feels uneasy.

A wise person treats evil as a real threat worth avoiding.

This is caution that actually leads to action, not just a feeling.

👀 Feareth means takes danger seriously

🚶 Departeth means actually moves away

⚠️ Evil is treated as a real threat

📖 Real caution leads to real action

## 🔥 The Fool Rageth, And Is Confident

"Rageth" means acts recklessly, without self control.

"Is confident" here is not a compliment, it means overconfident and careless.

This fool feels no need for caution at all.

False confidence is shown here as more dangerous than open fear.

🔥 Rageth means acts recklessly

😎 Confident here means overconfident and careless

🚫 This fool feels no need for caution

📖 False confidence is more dangerous than fear

## 🌡️ He That Is Soon Angry Dealeth Foolishly

"Soon angry" means quick tempered, reacting before thinking.

"Dealeth foolishly" means the actions that follow end up being bad decisions.

Quick anger skips right past the thinking that wisdom requires.

Speed itself is shown here as the actual problem.

🌡️ Soon angry means quick tempered

🎲 Dealeth foolishly means bad decisions follow

🚫 Anger skips past careful thinking

📖 Speed itself is the problem here

## 🗡️ A Man Of Wicked Devices Is Hated

"Devices" means schemes, plans made on purpose to harm someone.

This is different and worse than the quick tempered person just named.

That person acts in the heat of the moment.

This person plans harm carefully, and others notice and respond with hatred.

🗡️ Devices means schemes planned on purpose

🔄 This is worse than quick anger

🧠 This person plans harm carefully

📖 Deliberate scheming earns real hatred

## 👪 The Simple Inherit Folly

"Inherit" means receive automatically, the way property passes down in a family.

This proverb pictures foolishness as something the naive simply end up with.

They did not have to work for it, it just came their way.

Staying naive has a real, almost automatic cost.

👪 Inherit means receive automatically

🎁 Foolishness comes to the naive unearned

🚫 They did not have to work for it

📖 Staying naive carries an automatic cost

## 👑 The Prudent Are Crowned With Knowledge

"Crowned" means honored publicly, given something valuable to wear or display.

This contrasts the inherited folly of the simple just described.

Knowledge here is not hidden or private, it is shown off like a crown.

Careful, thoughtful people are honored in a way the naive are not.

👑 Crowned means honored publicly

🔄 This contrasts the inherited folly above

💎 Knowledge is displayed like a crown

📖 Careful people are honored differently

## 🙇 The Evil Bow Before The Good

"Bow" pictures a posture of submission, like a servant before a master.

This proverb states a pattern that will ultimately hold true, even if not immediately.

Wickedness may look powerful now, but this is not its final position.

Proverbs consistently insists that outcomes eventually match character.

🙇 Bow pictures submission before a master

🔮 This pattern will ultimately hold true

👑 Wickedness now is not its final position

📖 Outcomes eventually match character

## 🚪 The Wicked At The Gates Of The Righteous

"Gates" in an ancient city were where elders judged disputes and business was done.

Standing at someone's gates meant waiting there, often to beg or seek favor.

This pictures the wicked ending up dependent on those they may have looked down on.

Power in this world does not always stay where it starts.

🚪 Gates were where cities judged and traded

🙏 Standing at gates meant waiting for favor

🔄 The wicked end up dependent on the righteous

📖 Power does not always stay where it starts

## 🏘️ The Poor Is Hated Even Of His Own Neighbour

The word "neighbour" here points to someone living right nearby, not a stranger.

Proverbs is describing a sad, common pattern rather than approving of it.

Even people who live close by can turn away from someone poor.

Naming this ugly reality plainly is itself part of the book's honesty.

🏘️ Neighbour means someone living right nearby

👎 This describes a pattern, not approval

😔 Even close neighbors can turn away

📖 Naming ugly realities is real honesty

## 💰 The Rich Hath Many Friends

"Many friends" here likely includes people drawn by what wealth can offer.

This proverb is not straightforward praise for riches or popularity.

Some of these friendships may not survive the money running out.

Later proverbs will directly instruct readers to care for the poor instead.

💰 Many friends may be drawn by wealth

❓ This is not straightforward praise

📉 Some friendships may not survive money running out

📖 Later proverbs call readers to help the poor

# Proverbs 14:21-25
# 🤲 Mercy For The Poor, Truth In The Court
---
## 🙄 He That Despiseth His Neighbour Sinneth

"Despiseth" means looks down on with contempt, treats as less valuable.

This proverb directly follows the sad pattern just described about the poor.

Looking down on another person is named here as sin, not just rudeness.

How a person treats their neighbor is treated as a real moral issue.

🙄 Despiseth means looks down with contempt

🔗 This follows the pattern just described

⚠️ This is named as sin, not rudeness

📖 How we treat neighbors is a moral issue

## 🤲 He That Hath Mercy On The Poor, Happy Is He

"Mercy" here means active kindness, not just feeling bad for someone.

This directly answers the neglect and contempt just named.

"Happy" means genuinely blessed, not simply feeling good in the moment.

Caring for the poor is shown here as a source of real blessing.

🤲 Mercy means active kindness, not just pity

🔄 This answers the contempt just named

😊 Happy means genuinely blessed

📖 Caring for the poor brings real blessing

## 🚫 Do They Not Err That Devise Evil?

"Err" means go astray, miss the right path entirely.

"Devise evil" means plan harm on purpose, the same word used earlier in the chapter.

This is phrased as a question expecting an obvious yes.

Planning harm is shown here as a plain mistake, not cleverness.

🚫 Err means go astray from the right path

🗡️ Devise evil means planning harm on purpose

❓ This question expects an obvious yes

📖 Planning harm is treated as plain foolishness

## 🌱 Mercy And Truth Shall Be To Them That Devise Good

"Devise good" mirrors the evil scheming just named, but aimed the opposite way.

Planning to help others is shown here as its own kind of wisdom.

"Mercy and truth" describes the reward, real kindness and real faithfulness returned.

Good intentions carried out are treated as something that comes back around.

🌱 Devise good mirrors the evil scheming above

🧠 Planning to help is its own wisdom

🎁 Mercy and truth describes the reward

📖 Good intentions carried out come back around

## 💪 In All Labour There Is Profit

"Labour" means real, sustained work, not a single burst of effort.

"Profit" here means genuine gain, something to actually show for the effort.

This proverb values steady work over clever talk or big promises.

Any honest work, even small, is shown here as worthwhile.

💪 Labour means real sustained work

📈 Profit means genuine gain from effort

🗣️ This contrasts work with mere talk

📖 Honest work, even small, is worthwhile

## 🗣️ The Talk Of The Lips Tendeth Only To Penury

"Tendeth" means leads toward, moves in that direction over time.

"Penury" means poverty, having little or nothing.

This pictures someone who talks about plans instead of actually doing them.

Words alone, without real work behind them, are shown here leading nowhere good.

🗣️ Talk of the lips means empty words

📉 Penury means poverty, having little

🚫 This pictures talk without real action

📖 Words alone lead nowhere good

## 👑 The Crown Of The Wise Is Their Riches

"Crown" means the visible mark of honor a person wears or carries.

For a wise person, wealth gained honestly becomes that mark of honor.

This is not saying wealth itself makes someone wise.

It says wisdom's fruit, gained honestly, is worn well by the wise.

👑 Crown means a visible mark of honor

💰 Riches can be wisdom's honest fruit

🚫 Wealth itself does not make someone wise

📖 Honest wealth is worn well by the wise

## 🔁 The Foolishness Of Fools Is Folly

This line is repetitive on purpose, foolishness produces nothing but more foolishness.

Where the wise gain something lasting, fools only multiply their own emptiness.

There is no hidden reward waiting underneath a foolish life.

Folly circles back on itself instead of building toward anything.

🔁 This line is repetitive on purpose

🌀 Foolishness only produces more foolishness

🔄 This contrasts the wise gaining riches above

📖 Folly circles back instead of building anything

## ⚖️ A True Witness Delivereth Souls

"Delivereth" means rescues or saves from real danger.

In ancient courts, an accusation without honest witnesses could end in death.

A truthful witness could be the difference between life and death for someone.

This proverb treats honest testimony as a matter of literal survival.

⚖️ Delivereth means rescues from real danger

📜 False accusations could end in death

🗣️ Honest testimony could save a life

📖 Truthful witness is a matter of survival

## 🎭 A Deceitful Witness Speaketh Lies

"Deceitful" means intentionally dishonest, not simply mistaken.

This is the direct opposite of the life saving witness just described.

Lying under oath could cost an innocent person their life.

This closes the section by returning to the same courtroom danger named earlier.

🎭 Deceitful means intentionally dishonest

🔄 This opposes the life saving witness above

⚠️ Lying under oath could cost a life

📖 This returns to the same courtroom danger

# Proverbs 14:26-30
# ⛲ A Fountain Of Life, A Sound Heart
---
## 🙏 In The Fear Of The LORD Is Strong Confidence

"Fear of the LORD" means taking God seriously, with real reverence and awe.

"Strong confidence" here pictures something solid, like a fortified place to stand.

This is not fear that makes a person anxious or afraid to move.

Taking God seriously is shown here as the actual source of real security.

🙏 Fear of the LORD means real reverence

🏰 Strong confidence pictures something solid to stand on

🚫 This is not anxious fear

📖 Real security starts with taking God seriously

## 🏠 His Children Shall Have A Place Of Refuge

"Refuge" means a safe place to run to when danger comes.

"His children" likely means the children of the one who fears the LORD.

A parent's reverence for God is shown here benefiting the next generation too.

Faith in one life can become real shelter for the family that follows.

🏠 Refuge means a safe place to run to

👶 His children likely means the parent's own children

🌳 One person's faith reaches the next generation

📖 Faith can become shelter for a family

## ⛲ The Fear Of The LORD Is A Fountain Of Life

"Fountain of life" pictures a spring of fresh water in a dry, thirsty land.

This exact picture appeared in the previous chapter tied to the law of the wise.

Here the same image is tied instead to fearing God directly.

Real reverence for God is shown as a source a person can keep returning to.

⛲ Fountain of life pictures a desert spring

🔁 This same picture appeared in the last chapter

🙏 Here it is tied to fearing God directly

📖 Reverence for God is a source to return

## 🪤 To Depart From The Snares Of Death

"Snares" pictures hidden traps set to catch something unaware.

This is the same danger named in the fountain of life proverb before it.

Reverence for God is pictured here as what lets a person spot the traps.

Wisdom rooted in God helps a person avoid dangers they cannot even see coming.

🪤 Snares pictures hidden traps

🔁 This is the same danger named earlier

👀 Reverence for God helps spot the traps

📖 Godly wisdom avoids unseen dangers

## 👥 In The Multitude Of People Is The King's Honour

"Multitude" means a large number, a nation full of people.

A king in the ancient world measured his greatness partly by his population.

More people meant more workers, more soldiers, and more taxes.

A thriving, growing nation reflected well on the king who ruled it.

👥 Multitude means a large number of people

👑 A king's greatness was measured by population

⚔️ More people meant more workers and soldiers

📖 A thriving nation reflected well on its king

## 📉 In The Want Of People Is The Destruction Of The Prince

"Want" here means lack, a shortage instead of an abundance.

"Prince" refers to the ruler, likely the same king just mentioned.

A shrinking population in the ancient world often signaled war, famine, or bad rule.

Fewer people ruled over was a real warning sign for any leader.

📉 Want means lack or shortage

👑 Prince refers to the ruling king

⚠️ A shrinking population signaled real trouble

📖 Fewer people was a warning sign for leaders

## ⏳ He That Is Slow To Wrath Is Of Great Understanding

"Slow to wrath" means someone who takes real time before reacting in anger.

This is not weakness, it takes real strength to pause before responding.

Proverbs repeatedly ties this kind of patience to real wisdom.

Self control under pressure is treated here as a mark of deep understanding.

⏳ Slow to wrath means taking time before reacting

💪 This takes real strength, not weakness

🧠 Proverbs ties patience to real wisdom

📖 Self control under pressure marks understanding

## ⚡ He That Is Hasty Of Spirit Exalteth Folly

"Hasty of spirit" means quick to react without thinking first.

"Exalteth folly" means lifts foolishness up on display for everyone to see.

This is the direct opposite of the patient person just described.

Quick reactions do not just cause harm, they publicly reveal foolishness.

⚡ Hasty of spirit means reacting without thinking

📢 Exalteth folly means displaying foolishness openly

🔄 This opposes the patient person above

📖 Quick reactions reveal foolishness publicly

## ❤️ A Sound Heart Is The Life Of The Flesh

"Sound heart" means a calm, healthy inner life, free from constant turmoil.

"Life of the flesh" means it actually benefits a person's physical body too.

This proverb connects emotional peace directly to physical health.

Ancient wisdom already recognized what the body and mind share with each other.

❤️ Sound heart means a calm healthy inner life

💪 Life of the flesh means physical benefit

🔗 This connects emotional peace to physical health

📖 Ancient wisdom saw the body and mind connect

## 💔 Envy The Rottenness Of The Bones

"Envy" means resentment toward what someone else has.

"Rottenness of the bones" pictures decay eating away at a person from the inside.

Bones represent the deep, structural support of the whole body.

Envy is pictured here as something that slowly destroys a person from the core.

💔 Envy means resentment toward what others have

🦴 Rottenness of the bones pictures decay inside

🏗️ Bones represent the body's deep support

📖 Envy destroys a person from the core

# Proverbs 14:31-35
# ⬆️ Reproaching The Maker, Exalting A Nation
---
## ⚠️ He That Oppresseth The Poor Reproacheth His Maker

"Oppresseth" means treats unjustly, takes advantage of someone with less power.

"Reproacheth" means insults or shows contempt toward.

"His Maker" means God, who made both the poor person and the one oppressing them.

Mistreating the poor is shown here as a direct insult to God himself.

⚠️ Oppresseth means treats unjustly

😠 Reproacheth means insults or shows contempt

🙏 His Maker means God, who made everyone

📖 Mistreating the poor insults God directly

## 🙏 He That Honoureth Him Hath Mercy On The Poor

The word "him" here refers back to God, the Maker just named.

This verse says honoring God shows up in how a person treats the poor.

Mercy toward the poor is not a separate issue from worshiping God.

Real reverence for God and real care for people are shown here as one thing.

🙏 Him refers back to God, the Maker

🔗 Honoring God shows in treatment of the poor

🤲 Mercy is not separate from worship

📖 Reverence for God and care for people connect

## 💨 The Wicked Is Driven Away In His Wickedness

"Driven away" pictures a forceful, sudden removal, not a slow fade.

This proverb pictures death itself as the moment wickedness catches up.

There is no comfort or peace described in this ending.

The very thing the wicked person built their life on gives them nothing at the end.

💨 Driven away pictures a sudden removal

⚰️ This pictures death as wickedness catching up

🚫 No comfort is described here

📖 A wicked life gives nothing at the end

## 🌅 The Righteous Hath Hope In His Death

"Hope" here means real confidence about what comes after this life.

This is the sharp contrast to the wicked man's ending just described.

Righteous living is shown here mattering all the way to the very end.

Death itself does not erase the difference between these two lives.

🌅 Hope means real confidence beyond this life

🔄 This contrasts the wicked man's ending

⏳ Righteous living matters to the very end

📖 Death does not erase this difference

## 🏠 Wisdom Resteth In The Heart Of Him That Hath Understanding

"Resteth" means settles in and stays, not a passing visit.

This pictures wisdom as something that quietly lives inside a person over time.

It is not loud or showy, it simply takes up residence.

A wise person carries wisdom internally, not just displays it outwardly.

🏠 Resteth means settles in and stays

🤫 Wisdom here is quiet, not showy

🧠 It lives inside a person over time

📖 Wisdom is carried inside, not just shown

## 📢 That Which Is In The Midst Of Fools Is Made Known

"Made known" means eventually comes out into the open for everyone to see.

Whatever actually fills a fool's heart cannot stay hidden forever.

Unlike the quiet, settled wisdom just described, foolishness has no patience to wait.

Sooner or later, what is inside a person becomes visible to everyone.

📢 Made known means eventually comes into the open

🌀 Whatever fills a fool cannot stay hidden

🔄 This contrasts the quiet wisdom above

📖 What is inside eventually becomes visible

## ⬆️ Righteousness Exalteth A Nation

"Exalteth" means lifts up, raises to a place of honor.

This is not only about individuals, it applies to whole nations.

A nation built on honest living is shown here actually rising because of it.

Collective character is treated here as something with real national consequences.

⬆️ Exalteth means lifts up to honor

🌍 This applies to whole nations, not just people

✅ Honest living raises a nation up

📖 A nation's character has real consequences

## 😳 Sin Is A Reproach To Any People

"Reproach" means public shame, disgrace in front of others.

This is the closing contrast for the whole chapter's many opposites.

No nation is exempt from this, not even a nation that claims God's name.

This proverb says a whole people's character matters, not just one person's.

😳 Reproach means public shame and disgrace

🔄 This closes the chapter's pattern of contrasts

🌍 No nation is exempt from this truth

📖 A whole people's character matters too

## 🤝 The King's Favour Is Toward A Wise Servant

"Favour" means goodwill and approval from someone in power.

A wise servant in the ancient world could rise significantly through a ruler's trust.

This applied literally in royal courts, and applies more broadly to any leader.

Skill and wisdom are shown here as a real path toward being valued.

🤝 Favour means goodwill from someone in power

👑 A wise servant could rise through royal trust

🌍 This applies to any leader, not just kings

📖 Wisdom is a real path toward being valued

## 🔥 His Wrath Is Against Him That Causeth Shame

"Wrath" here means real anger, backed by real power to punish.

"Causeth shame" means brings public embarrassment through careless or foolish action.

A servant who disgraced the king could lose everything, even their life.

This closes the chapter by tying a person's conduct to real consequences.

🔥 Wrath means real anger backed by power

😳 Causeth shame means brings public embarrassment

⚠️ A disgraced servant could lose everything

📖 Conduct carries real consequences here
`.trim();

export const PROVERBS_FOURTEEN_PERSONAL_SECTIONS = parseProverbsFourteenRawNotes(PROVERBS_FOURTEEN_RAW_NOTES);
