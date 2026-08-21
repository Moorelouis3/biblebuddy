export type ProverbsTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyTwoRawNotes(rawText: string): ProverbsTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 22:${startVerse}` : `Proverbs 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 22 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_TWO_RAW_NOTES = `# Proverbs 22:1-4
# 💎 A Good Name, A Humble Heart, And One Maker For All
---
## 🏷️ A Good Name Is Rather To Be Chosen Than Great Riches

A good name means the reputation a person earns over years of honest living.

It is not something you can buy or claim for yourself.

Proverbs ranks that earned trust above even great wealth.

A fortune can be rebuilt after loss.

A broken reputation rarely recovers that fast.

🏷️ A good name means earned reputation

🕰️ It builds slowly over years

⚖️ Trust outranks wealth here

📖 Reputation is harder to rebuild than money

## ❤️ Loving Favour Rather Than Silver And Gold

Loving favour means being genuinely well regarded by the people around you.

This pairs with the line before it to name two things worth more than money.

Silver and gold could be gained by force or by theft in this world.

Genuine goodwill from others could only be earned, never taken.

❤️ Loving favour means real goodwill from others

🔗 This pairs with the line before it

🗡️ Silver could be taken by force

📖 Goodwill can only be earned

## 🏘️ The Rich And Poor Meet Together

This does not mean rich and poor people never had real differences.

It means both classes still crossed paths constantly in daily life.

Markets, courts, and streets in this world served everyone together.

No wall separated the two groups completely.

🏘️ Rich and poor still shared daily life

🛒 Markets and streets served everyone

🚪 No wall fully separated the classes

📖 Their common ground is named next

## 🎨 The LORD Is The Maker Of Them All

This names the reason rich and poor still share common ground.

Both come from the same Creator, whatever their income looks like.

Wealth or poverty says nothing about a person's actual worth to God.

Every person meets God as the same kind of creature underneath.

🎨 God is the maker named here

💰 Wealth does not change a person's worth

🙌 Both meet God as the same creature

📖 One Maker levels every income gap

## 🧠 A Prudent Man Foreseeth The Evil, And Hideth Himself

Prudent means someone who thinks ahead instead of reacting in the moment.

Foreseeth means noticing danger before it actually arrives.

Hideth himself pictures taking real, practical action once danger is spotted.

This exact line appears again later in the book.

🧠 Prudent means thinking ahead of trouble

👀 Foreseeth means spotting danger early

🏃 Hideth means taking real action

📖 This exact line repeats later in Proverbs

## 🌱 But The Simple Pass On, And Are Punished

Simple here means untaught and inexperienced, not stupid.

Pass on pictures walking straight past a warning sign without stopping.

That person suffers consequences that careful attention could have avoided.

The difference between the prudent and the simple is attention, not intelligence.

🌱 Simple means untaught, not stupid

🚶 Pass on means ignoring the warning

⚠️ Consequences follow that ignored warning

📖 Attention separates the wise from the hurt

## 🙇 By Humility And The Fear Of The LORD

Humility here means a right sized view of yourself before God.

The fear of the LORD means taking God seriously enough to obey him.

These two named together form the actual starting point of this proverb.

Neither one is treated as optional in this pairing.

🙇 Humility means a right sized view of self

🙏 Fear of the LORD means taking God seriously

🔗 Both are named together on purpose

📖 Neither is treated as optional here

## 🎁 Are Riches, And Honour, And Life

This names three separate rewards tied to humility and the fear of God.

Riches means real material provision, not necessarily great wealth.

Honour means genuine respect earned over time from other people.

Life here points to more than survival, a full and secure existence.

🎁 Three rewards are named together

💰 Riches means real provision

🏅 Honour means respect earned over time

📖 Life means a full, secure existence
# Proverbs 22:5-8
# 🌾 Thorns, Training, And What Gets Sown
---
## 🌀 Thorns And Snares Are In The Way Of The Froward

Froward is an old word meaning stubbornly crooked and hard to correct.

Thorns and snares picture real dangers scattered along that person's chosen path.

The froward path is not neutral, it is genuinely hazardous.

Choosing that direction invites trouble a straighter path would avoid.

🌀 Froward means stubbornly crooked

🌵 Thorns and snares mean real danger

🛤️ This path is genuinely hazardous

📖 A crooked path invites real trouble

## 🛡️ He That Doth Keep His Soul Shall Be Far From Them

Keep his soul means guarding your own life and choices carefully.

That careful person naturally stays away from the froward path and its dangers.

Distance from trouble here is shown as a choice, not luck.

Watching your own steps is the actual protection this verse offers.

🛡️ Keep his soul means guarding your choices

🚶 Careful people avoid the froward path

🎯 Distance from danger is a choice

📖 Watching your steps is real protection

## 🏋️ Train Up A Child In The Way He Should Go

Train here means shaping a habit through steady, repeated practice, not one lesson.

In the way he should go points to the right, godly direction for a life.

Many scholars believe it can also point to a child's own natural bent.

Either reading agrees that early, consistent shaping matters deeply.

🏋️ Train means steady, repeated shaping

🧭 The way he should go names right direction

🌱 It may also mean a child's natural bent

📖 Early shaping matters either way

## ⏳ When He Is Old, He Will Not Depart From It

This states the long term result of that early, steady training.

It is stated as a general pattern, not an absolute guarantee for every case.

Proverbs speaks in this kind of general wisdom throughout the whole book.

Early habits tend to shape a person for the rest of their life.

⏳ This names a long term result

📏 Proverbs speaks in general patterns

🔁 It is a pattern, not a guarantee

📖 Early habits tend to last a lifetime

## 👑 The Rich Ruleth Over The Poor

This states a plain, observed fact about power in this world.

Wealth in this culture came with real practical authority over others.

Proverbs is not praising this arrangement, only naming how it worked.

Naming a fact honestly is different from calling it fair.

👑 This names a fact about power

💰 Wealth carried real authority

🎯 Proverbs names it, not praises it

📖 A fact and a fairness claim differ

## 🔗 The Borrower Is Servant To The Lender

Servant here pictures real obligation, not literal slavery in every case.

A debt creates leverage the lender can use over the borrower's choices.

This warns readers to think carefully before taking on debt.

Owing money quietly limits a person's freedom, even without a formal contract.

🔗 Servant here means real obligation

💳 Debt gives the lender leverage

🧠 This warns against careless borrowing

📖 Debt quietly limits freedom

## 🌾 He That Soweth Iniquity Shall Reap Vanity

Soweth and reap borrow farming language for moral cause and effect.

Iniquity means deep, willful wrongdoing planted like a seed.

Vanity here means an empty harvest with no real, lasting value.

Wrong actions eventually produce an outcome that cannot satisfy.

🌾 Sow and reap picture cause and effect

😈 Iniquity means willful wrongdoing

💨 Vanity means an empty harvest

📖 Wrong actions produce empty results

## 🏒 The Rod Of His Anger Shall Fail

The rod of his anger pictures the tool an angry, wicked person uses to dominate others.

Shall fail means that tool eventually breaks or stops working.

Whatever power anger seems to give does not hold up over time.

Force built on anger has a built in end point.

🏒 The rod pictures a tool for domination

💥 Shall fail means it stops working

⏳ Angry power does not last

📖 Anger built force has an end point
# Proverbs 22:9-12
# 👁️ A Generous Eye And Watching Eyes
---
## 👁️ He That Hath A Bountiful Eye Shall Be Blessed

A bountiful eye is a Hebrew way of describing a generous, giving nature.

The eye stands for the whole outlook a person carries toward others.

This kind of person is promised a real blessing in return.

Generosity here is shown as a way of seeing, not just an occasional act.

👁️ Bountiful eye means a generous outlook

🙌 The eye represents a person's whole nature

🎁 Generosity is promised a real blessing

📖 Generosity is a way of seeing others

## 🍞 He Giveth Of His Bread To The Poor

Bread here stands for basic, everyday provision, not just literal loaves.

This names the concrete action that a bountiful eye actually produces.

Generosity in Proverbs is never only an attitude kept inside.

It shows up in real food reaching a hungry person's hands.

🍞 Bread means basic, everyday provision

🙌 This names the generous eye's real action

❤️ Generosity always becomes concrete

📖 Real giving reaches real hands

## 🙄 Cast Out The Scorner, And Contention Shall Go Out

A scorner is someone who mocks correction and stirs up conflict on purpose.

Cast out means removing that person from the group entirely.

Contention here means ongoing arguing and division within a community.

Removing the source of conflict is shown as the actual solution.

🙄 A scorner mocks correction on purpose

🚪 Cast out means removing that person

😠 Contention means ongoing arguing

📖 Removing the source ends the conflict

## ⚔️ Strife And Reproach Shall Cease

Strife means open conflict, and reproach means public insults and blame.

Both are named as the natural results of a scorner staying in the group.

Once the scorner leaves, these two things are shown stopping together.

One person's presence can be the reason peace never settles in.

⚔️ Strife means open conflict

🗣️ Reproach means public insults

🔗 Both come from the scorner staying

📖 One person can block a group's peace

## 💛 He That Loveth Pureness Of Heart

Pureness of heart means honest, unmixed motives, not outward perfection.

This describes a person's inner life, not just their visible behavior.

Proverbs consistently values what happens inside over any outward performance.

A clean motive is treated as the real starting point for trust.

💛 Pureness of heart means honest motives

👤 This describes inner life, not performance

⚖️ Proverbs values the inside over the outside

📖 A clean motive is trust's starting point

## 👑 For The Grace Of His Lips The King Shall Be His Friend

Grace of his lips means speech that is honest, kind, and well chosen.

Ancient royal courts prized advisors who combined integrity with real skill in speech.

A person with both qualities could rise close to real political power.

Character and communication together open doors that neither one opens alone.

👑 Ancient courts prized skilled, honest advisors

🗣️ Grace of his lips means well chosen speech

🚪 Character and speech together open doors

📖 Neither quality alone opens the same door

## 👁️ The Eyes Of The LORD Preserve Knowledge

Eyes of the LORD pictures God's constant, careful attention to the world.

Preserve knowledge means God protects what is actually true from being lost.

This describes an active, ongoing guarding, not a one time glance.

Truth stays intact because God himself is watching over it.

👁️ Eyes of the LORD means constant attention

🛡️ Preserve knowledge means protecting truth

🔁 This is ongoing, not a one time act

📖 Truth survives because God watches over it

## 💥 He Overthroweth The Words Of The Transgressor

Overthroweth means bringing something down completely, not just weakening it.

The transgressor here means someone who deliberately breaks what is right.

Their words, even convincing ones, get undone by that same watching God.

Truth outlasts lies because of who is actually guarding it.

💥 Overthroweth means total collapse

🎭 The transgressor breaks what is right on purpose

🗣️ Even convincing lies get undone

📖 Truth outlasts lies because God guards it
# Proverbs 22:13-16
# 🦁 The Sluggard's Excuse And Bound Foolishness
---
## 😴 The Slothful Man Saith, There Is A Lion Without

Slothful means habitually, deliberately lazy, unwilling to work.

This person invents a dramatic, unlikely danger outside to justify staying put.

A lion wandering city streets was an extreme, rare excuse, not a real worry.

Laziness here is shown dressing itself up as caution.

😴 Slothful means habitually, deliberately lazy

🦁 A lion outside is an unlikely excuse

🎭 This excuse pretends to be caution

📖 Laziness disguises itself as caution

## 💀 I Shall Be Slain In The Streets

This finishes the sluggard's excuse with exaggerated, dramatic fear.

Slain means killed, the strongest possible word for what he claims to risk.

No real danger this severe was actually waiting outside his door.

The excuse only needs to sound convincing enough to justify staying home.

💀 Slain means killed, the strongest word used

🎭 The fear is exaggerated on purpose

🚪 No real danger was waiting outside

📖 A convincing excuse only needs to sound real

## 🚫 The Mouth Of Strange Women Is A Deep Pit

Strange women here means women outside a covenant relationship, tied to temptation.

Mouth stands for persuasive, smooth talking meant to draw someone in.

A deep pit pictures a hidden trap, easy to fall into and hard to climb out of.

This warning appears repeatedly across the early chapters of Proverbs.

🚫 Strange women here means forbidden temptation

🗣️ Mouth means persuasive, smooth talking

🕳️ A deep pit means a hidden trap

📖 This warning repeats through Proverbs

## 😠 He That Is Abhorred Of The LORD Shall Fall Therein

Abhorred means deeply rejected, the strongest word Proverbs uses for God's disapproval.

This does not mean God traps people at random.

It means a person already living far from God is exposed to this danger.

Distance from God leaves a person with less protection, not more risk imposed on them.

😠 Abhorred means deeply rejected

🎯 God does not trap people at random

📏 Distance from God removes protection

📖 Falling here follows an existing distance

## 🪢 Foolishness Is Bound In The Heart Of A Child

Bound here means tied up tightly, built in rather than added later.

This names foolishness as a natural starting point for every child, not a flaw in some.

It is not a harsh insult, it is an honest description of how people begin.

Every child needs real, active shaping, not just time to outgrow it alone.

🪢 Bound means tied in, built in

👶 This describes every child's starting point

🌱 It is honest, not an insult

📖 Every child needs active shaping

## 🏒 The Rod Of Correction Shall Drive It Far From Him

The rod of correction means real, active discipline, not mere words alone.

Drive it far pictures pushing foolishness out the way you would push out an intruder.

This verse pairs directly with the training language back in verse six.

Correction is shown as the actual tool, not a last resort.

🏒 The rod means real, active discipline

🚪 Drive it far means pushing it out

🔗 This pairs with verse six's training

📖 Correction is the tool, not a last resort

## ⚠️ He That Oppresseth The Poor To Increase His Riches

Oppresseth means using unfair pressure or force against someone weaker.

This names a specific method of getting rich, not wealth in general.

Taking advantage of the poor is treated as its own particular sin.

The method of gaining wealth matters as much as the result.

⚠️ Oppresseth means unfair pressure or force

💰 This names one method of gaining wealth

🎯 Taking advantage of the poor is its sin

📖 How wealth is gained still matters

## 📉 Shall Surely Come To Want

This pairs oppressing the poor with giving gifts to the rich as a matching mistake.

Both paths, despite looking opposite, are said to end the same way.

Want here means real poverty and lack.

Neither exploiting the weak nor flattering the powerful actually builds lasting wealth.

🔗 This pairs with a second, similar mistake

🔄 Two opposite paths share one ending

📉 Want means real poverty

📖 Neither shortcut builds lasting wealth
# Proverbs 22:17-21
# 📜 Bow Down Thine Ear To The Words Of The Wise
---
## 📖 Bow Down Thine Ear, And Hear The Words Of The Wise

This opens a new section of the book, often called the words of the wise.

Bow down thine ear pictures leaning in closely to listen with real attention.

The words of the wise names a separate collection from Solomon's earlier proverbs.

The teacher is asking for the reader's full, deliberate focus.

📜 This opens a new section of Proverbs

👂 Bow down thine ear means leaning in

📚 Words of the wise names a new collection

➡️ Full attention is being asked for here

## 🧠 Apply Thine Heart Unto My Knowledge

Apply thine heart means doing more than just hearing the words.

Heart here means the whole inner self, not only the emotions.

This calls for actively working the teaching into your own thinking.

Listening and applying are shown as two separate, necessary steps.

🧠 Apply thine heart means active engagement

❤️ Heart means the whole inner self

🔁 This is a second, separate step

📖 Hearing and applying are both required

## 😊 It Is A Pleasant Thing If Thou Keep Them Within Thee

Keep them within thee means holding this teaching in your memory and heart.

Pleasant here describes the real, lasting satisfaction of internalized wisdom.

This is not framed as a burden but as something genuinely enjoyable.

Wisdom kept inside becomes part of who a person actually is.

🧠 Keep within means holding it in memory

😊 Pleasant describes real satisfaction

🎁 Wisdom is framed as enjoyable, not a burden

📖 Internalized wisdom shapes who you are

## 🗣️ They Shall Withal Be Fitted In Thy Lips

Fitted in thy lips means the words become ready to speak naturally.

Withal is an old word meaning also, or together with the rest.

Wisdom stored inside eventually shapes what comes out of a person's mouth.

What fills the heart eventually reaches the lips.

🗣️ Fitted in thy lips means ready speech

📜 Withal is an old word meaning also

🔗 Inner wisdom shapes outer words

📖 What fills the heart reaches the lips

## 🙏 That Thy Trust May Be In The LORD

This names the actual goal behind all this careful teaching.

Trust here means relying on God, not just believing facts about him.

The words of the wise are a means, not the final point.

Every lesson in this section aims a reader's confidence back toward God.

🎯 This names the real goal of the teaching

🙏 Trust means relying on God

📜 The teaching is a means, not the end

📖 Every lesson points back to God

## ❓ Have Not I Written To Thee Excellent Things

This is a rhetorical question, expecting the answer yes.

Excellent things points to teaching worth real, careful attention.

Many scholars believe this section may reflect earlier collected wisdom sayings.

The teacher is reminding the reader of effort already spent on their behalf.

❓ This is a rhetorical question

📜 Excellent things means teaching worth real attention

📚 Many scholars link this to earlier wisdom writing

📖 Real effort was already spent teaching

## 🧭 In Counsels And Knowledge

Counsels means practical advice for how to actually live.

Knowledge here means true understanding, not just information.

Together they describe teaching meant for real daily decisions.

This is not abstract theory but usable, practical wisdom.

🧭 Counsels means practical, daily advice

🧠 Knowledge means true understanding

🔗 Together they describe usable teaching

📖 This wisdom is meant for real decisions

## 🎯 That I Might Make Thee Know The Certainty Of The Words Of Truth

Certainty here means confidence that these words can actually be trusted.

This teaching was not offered as a guess or a maybe.

The reader is meant to walk away sure, not just informed.

Confidence in truth is treated as the whole point of good teaching.

🎯 Certainty means real, trustworthy confidence

❓ This was never offered as a guess

✅ The reader should walk away sure

📖 Confidence is the point of good teaching

## 🤝 That Thou Mightest Answer The Words Of Truth To Them That Send Unto Thee

This names a practical purpose for all this careful teaching.

The reader is being prepared to represent truth well to other people.

Them that send unto thee pictures someone relying on this reader for a real answer.

Wisdom here is meant to be passed on, not just kept privately.

🎯 A practical purpose is named here

🗣️ The reader represents truth to others

🤝 Someone else relies on a real answer

📖 Wisdom is meant to be passed on
# Proverbs 22:22-25
# ⚖️ Do Not Rob The Poor Or Walk With Anger
---
## 🚫 Rob Not The Poor, Because He Is Poor

This names a specific temptation, taking advantage of someone with no power to resist.

Because he is poor names the exact reasoning this command forbids.

Poverty was never meant to make a person an easier, safer target.

This command protects the exact people least able to protect themselves.

🚫 This forbids exploiting the powerless

🎯 Poverty must never be the reasoning used

🛡️ This protects those least able to resist

📖 Weakness is not permission to exploit

## 🚪 Neither Oppress The Afflicted In The Gate

The gate was the public entrance area where cities held court and settled disputes.

Afflicted here means someone already suffering hardship or loss.

Oppress in the gate pictures using legal or social power to crush them further.

Even a formal, legal setting could be twisted into a weapon against the weak.

🚪 The gate was the city's courtroom

😢 The afflicted are already suffering

⚖️ This warns against legal or social crushing

📖 Even formal power can be twisted

## ⚖️ For The LORD Will Plead Their Cause

Plead their cause pictures God acting as a legal advocate for the powerless.

This promises real, active defense, not just future sympathy.

When human courts fail the poor, this verse claims a higher court remains open.

God takes the side of the person no one else stood up for.

⚖️ Plead their cause means acting as advocate

✅ This is active defense, not sympathy

🏛️ A higher court remains open here

📖 God stands where no one else did

## 🔁 Spoil The Soul Of Those That Spoiled Them

Spoil here means to strip or ruin, the exact word used twice in this verse.

This describes a real reversal, the oppressor losing what they took by force.

The punishment matches the crime almost exactly on purpose.

Justice in this verse is not random, it mirrors the original wrong.

🔁 Spoil means strip or ruin, used twice

⚖️ This describes a matching reversal

🎯 The punishment mirrors the original crime

📖 This justice is not random

## 😠 Make No Friendship With An Angry Man

Angry man here means someone whose temper is a settled, regular pattern.

Friendship pictures a close, ongoing relationship, not a passing conversation.

This warns against choosing that kind of person as a close companion.

Who you spend regular time with quietly shapes who you become.

😠 Angry here means a settled pattern

🤝 Friendship means a close relationship

🚫 This warns against choosing that companion

📖 Company quietly shapes character

## 🔥 With A Furious Man Thou Shalt Not Go

Furious means anger even more intense and unstable than the anger just named.

Thou shalt not go pictures avoiding shared activity, not just distant acquaintance.

This repeats the same warning with a stronger word for emphasis.

Repetition in Proverbs usually signals a warning worth taking seriously.

🔥 Furious means more intense, unstable anger

🚶 Thou shalt not go means avoiding shared activity

🔁 This repeats the warning for emphasis

📖 Repetition signals real seriousness

## 🎯 Lest Thou Learn His Ways

Learn his ways names the real risk behind this whole warning.

Behavior spreads through close company, often without anyone noticing it happen.

This is not about one bad conversation but slow, quiet influence.

The danger is imitation, not just contact.

🎯 Learn his ways names the real risk

🔗 Behavior spreads through close company

⏳ This influence works slowly and quietly

📖 The danger is imitation, not contact

## 🪤 Get A Snare To Thy Soul

Snare pictures a hidden trap that closes before the victim notices it.

Thy soul means your whole inner life, not just a passing habit.

Choosing the wrong company can trap a person without any warning.

This closes the warning with a real, lasting consequence, not just discomfort.

🪤 Snare means a hidden, closing trap

👤 Thy soul means your whole inner life

⚠️ Wrong company can trap without warning

📖 This warning ends in real consequence
# Proverbs 22:26-29
# 🏠 Sureties, Landmarks, And A Diligent Man
---
## 🤝 Be Not Thou One Of Them That Strike Hands

Strike hands was the ancient equivalent of signing a legal contract.

Two people would clasp hands publicly to seal a financial agreement.

This warns against joining that kind of binding agreement carelessly.

The custom made the promise real and legally binding, not just a friendly gesture.

🤝 Strike hands sealed an ancient contract

👐 Two people clasped hands publicly

🚫 This warns against joining carelessly

📖 The custom made a promise binding

## 💳 Or Are Sureties For Debts

A surety is someone who legally guarantees to pay another person's debt.

This names the specific danger, not friendship or generosity itself.

Proverbs repeats this exact warning several times across different chapters.

Guaranteeing someone else's debt puts your own security at real risk.

💳 A surety guarantees another person's debt

🎯 This names one specific danger

🔁 Proverbs repeats this warning often

📖 Your own security is put at risk

## ⚠️ If Thou Hast Nothing To Pay

This pictures the exact moment this risky agreement turns into real disaster.

The original borrower has failed, and now the surety owes the debt instead.

Nothing to pay means the guarantor is now just as broke as the borrower.

The danger warned about earlier has now actually arrived.

⚠️ This pictures the disaster arriving

🔄 The surety now owes the debt

📉 Nothing to pay means real poverty

📖 The earlier warning has now arrived

## 🛏️ Why Should He Take Away Thy Bed From Under Thee

A bed in this culture was a basic, essential possession, not a luxury.

This pictures a creditor legally seizing the last thing a person owns.

The rhetorical question underlines how needless this whole situation was.

A careless promise ends up costing even the most basic comfort.

🛏️ A bed was a basic, essential item

⚖️ Creditors could legally seize it

❓ This question underlines how needless it was

📖 A careless promise can cost the basics

## 🪨 Remove Not The Ancient Landmark

A landmark here means a stone marker set to show where one property ended and another began.

Removing it quietly shifted a boundary line in your own favor.

This counted as a real form of theft, even without any obvious violence.

Dishonesty could hide behind something as small as moving a stone.

🪨 A landmark marked property boundaries

🕵️ Removing it quietly shifted the line

💰 This counted as real theft

📖 Dishonesty can hide in small acts

## 👴 Which Thy Fathers Have Set

Thy fathers points to the earlier generations who originally set that boundary.

This adds a second layer of wrong, disrespecting inherited, settled agreements.

Land boundaries in Israel carried real weight tied to family inheritance.

Moving the stone stole from both a neighbor and a family's history.

👴 Thy fathers means earlier generations

📜 This adds disrespect for settled agreements

🏡 Land carried real family inheritance

📖 This theft reached into family history

## 💪 Seest Thou A Man Diligent In His Business

Diligent means someone who works with steady, careful skill over time.

Seest thou invites the reader to actually picture this specific kind of person.

Business here covers any honest trade or skilled work, not only commerce.

This verse closes the chapter by circling back to its opening theme of reputation.

💪 Diligent means steady, careful skill

👀 Seest thou invites picturing this person

🔨 Business covers any honest trade

📖 This circles back to the chapter's opening theme

## 👑 He Shall Stand Before Kings

Stand before kings means gaining access to real, high level influence.

Skilled work in this culture could genuinely lift someone far above their birth.

He shall not stand before mean men completes the verse, meaning obscure, low status work.

Diligence is shown opening real doors that background alone could not open.

👑 Stand before kings means real influence

📈 Skill could lift someone above their birth

🔽 Mean men means obscure, low status

📖 Diligence opens doors birth cannot
`.trim();

export const PROVERBS_TWENTY_TWO_PERSONAL_SECTIONS = parseProverbsTwentyTwoRawNotes(PROVERBS_TWENTY_TWO_RAW_NOTES);
