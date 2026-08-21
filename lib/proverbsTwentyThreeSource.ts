export type ProverbsTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyThreeRawNotes(rawText: string): ProverbsTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 23:${startVerse}` : `Proverbs 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Proverbs 23 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_THREE_RAW_NOTES = `# Proverbs 23:1-3
# 🍽️ Dining With Danger At A Ruler's Table
---
## When Thou Sittest To Eat With A Ruler

Sitting down to eat with a ruler meant sharing a meal with someone far above your own social rank.

In this world such an invitation could open doors to real influence and favor.

It could also carry hidden danger, since a ruler's motives were not always simple friendship.

This proverb prepares the reader before the meal even begins.

🍽️ Sitting with a ruler crossed real social rank

👑 A ruler's table could open real doors

⚠️ It could also hide real danger

📖 This proverb prepares you before the meal starts

## Consider Diligently What Is Before Thee

Consider diligently means to look closely instead of relaxing your guard.

The food and the company both deserved careful attention in this setting.

A ruler's hospitality was rarely just about the meal itself.

Paying close attention was the wise guest's actual job.

👀 Consider diligently means looking closely, not relaxing

🍞 The food and company both deserved attention

👑 A ruler's hospitality was rarely simple

📖 Close attention was the wise guest's job

## Put A Knife To Thy Throat

This is a vivid, exaggerated warning, not a literal instruction to hurt yourself.

The wise teacher pictures self control as sharp and immediate as a blade at your neck.

The point is to stop yourself before overeating in front of someone watching.

Ancient wisdom writing often used shocking pictures to make a lesson unforgettable.

🔪 This is a vivid warning, not literal

🛑 It pictures self control as sharp and immediate

👀 Stop yourself before overeating while being watched

📖 Shocking pictures made ancient lessons unforgettable

## If Thou Be A Man Given To Appetite

Given to appetite describes someone who struggles to control their desire for food.

This warning is not against eating itself but against being ruled by craving.

A person known for this weakness needed extra caution at a ruler's table.

Self control here protected both dignity and safety in front of powerful company.

🍖 Given to appetite means struggling with craving

⚖️ The warning targets being ruled by craving

🛡️ This weakness needed extra caution here

📖 Self control protected dignity in front of power

## Be Not Desirous Of His Dainties

Dainties means rich, tempting foods far beyond someone's normal daily meals.

Desiring them too openly could look greedy in front of a powerful host.

Restraint at this table was also a mark of self respect.

Wanting less was safer than appearing eager for a ruler's favor.

🍰 Dainties means rich, tempting food

😬 Wanting them openly could look greedy

🙇 Restraint showed self respect here

📖 Wanting less was safer than appearing eager

## For They Are Deceitful Meat

Deceitful meat means the food is not as safe or simple as it looks.

A ruler's generosity could come with an unspoken cost or expectation attached.

This food might exist to test the guest, not simply to feed them.

The proverb warns the reader to see past the surface of the table.

🎭 Deceitful meat means hidden cost, not safety

👑 Generosity could carry an unspoken expectation

🧪 The meal might exist to test the guest

📖 See past the surface of the table
# Proverbs 23:4-5
# 🦅 Riches That Grow Wings And Fly
---
## Labour Not To Be Rich

This does not forbid working hard or earning an honest living.

It warns against making wealth itself the goal driving every choice you make.

Chasing riches as the main prize tends to crowd out wiser priorities.

The next line explains exactly why that chase never truly pays off.

💰 This does not forbid honest work

🎯 It warns against wealth as your main goal

⚖️ Chasing riches crowds out wiser priorities

📖 The next line explains why it fails

## Cease From Thine Own Wisdom

This means stop trusting your own clever schemes for getting rich quickly.

Human cleverness alone cannot guarantee lasting wealth or real security.

The proverb pairs this warning directly with the command just before it.

True wisdom knows the limits of its own planning power.

🧠 This means stop trusting clever schemes

🚫 Cleverness alone cannot guarantee lasting wealth

🔗 This pairs directly with the line before it

📖 Wisdom knows the limits of its own planning

## Wilt Thou Set Thine Eyes Upon That Which Is Not

This asks whether you will fix your attention on wealth that will not last.

That which is not points to riches that seem solid but quickly disappear.

The question invites the reader to reconsider where real focus belongs.

A rhetorical question like this expects the honest answer to be no.

👀 This asks where your attention is fixed

💨 That which is not means wealth that vanishes

❓ The question expects the answer no

📖 Real focus belongs somewhere more lasting

## Riches Certainly Make Themselves Wings

This pictures wealth as something alive enough to grow its own wings.

Money that seems secure today can disappear through loss, theft, or bad luck.

The image warns against building your whole security on something so unstable.

Real security has to be rooted in something wealth cannot touch.

🪶 Wealth is pictured as growing its own wings

📉 Money that seems secure can still vanish

⚠️ Security built only on wealth is unstable

📖 Real security must be rooted elsewhere

## They Fly Away As An Eagle Toward Heaven

An eagle in flight was one of the fastest, most unstoppable sights this culture knew.

Riches are compared to that same speed and distance once they start to go.

There is no catching wealth once it decides to leave your hands.

The comparison makes the warning from the line before feel even more urgent.

🦅 An eagle pictured unstoppable speed and distance

💨 Riches can leave just as fast

🙌 Wealth cannot be caught once it goes

📖 This makes the earlier warning more urgent
# Proverbs 23:6-8
# 🎭 A Host Whose Heart Is Not With You
---
## Eat Thou Not The Bread Of Him That Hath An Evil Eye

An evil eye in this culture described someone stingy, jealous, or grudging by nature.

Sharing a meal with that kind of host came with a hidden cost.

The warning tells the reader to notice character before accepting hospitality.

Not every invitation to eat was offered with a genuinely open hand.

👁️ Evil eye means a stingy, grudging nature

🍞 Sharing bread with them carried hidden cost

🕵️ Notice character before accepting an invitation

📖 Not every invitation came from an open hand

## Neither Desire Thou His Dainty Meats

This repeats the same caution already given earlier in the chapter about rich food.

Wanting a stingy host's special dishes only deepened the trap of that table.

The value of a meal depends heavily on who is offering it.

Appetite here needed to answer to discernment, not the other way around.

🍽️ This repeats an earlier warning about rich food

🪤 Wanting it deepened the trap of that table

🧭 A meal's value depends on who offers it

📖 Discernment should guide appetite here

## As He Thinketh In His Heart So Is He

This is one of the most quoted lines in the whole book of Proverbs.

It means a person's true self is shown by their private thoughts, not their words.

The stingy host's real feelings never actually left his heart.

What someone says out loud can hide what they truly think inside.

💭 This is one of Proverbs' most quoted lines

👤 True self is shown by private thoughts

🎭 The host's real feelings stayed hidden

📖 Words can hide what someone truly thinks

## Eat And Drink Saith He To Thee

These are the host's actual spoken words, sounding warm and generous on the surface.

The invitation itself sounds exactly like real hospitality to any listener.

This is exactly the gap between appearance and reality the proverb is warning about.

Kind words alone were never proof of a kind heart in this proverb.

🗣️ These are the host's actual spoken words

😊 The invitation sounds warm on the surface

🎭 This is the gap the proverb warns about

📖 Kind words do not prove a kind heart

## But His Heart Is Not With Thee

This names the exact problem hiding underneath the friendly invitation.

The host's private feelings do not match his generous sounding words.

A guest who trusted the words alone would completely miss this warning.

This line is the whole reason the chapter opened with such caution.

💔 This names the real problem underneath

🎭 Feelings do not match the friendly words

👀 Trusting words alone would miss this warning

📖 This explains the chapter's opening caution

## The Morsel Which Thou Hast Eaten Shalt Thou Vomit Up

Morsel means a small bite or portion of food, not a whole meal.

This pictures the meal turning sour once the guest realizes what really happened.

Even a small amount of that host's food became unwelcome in hindsight.

Discovering the deception ruined whatever pleasure the meal had offered.

🍞 Morsel means a small bite of food

🤢 The meal turns sour once truth is clear

🔍 Even a small portion became unwelcome

📖 Discovering deception ruins the meal's pleasure

## And Lose Thy Sweet Words

Sweet words here likely means the polite thanks and kind conversation offered during the meal.

Those words end up wasted once the host's real motive comes out.

Effort spent being gracious to a two faced host brings no real return.

The whole encounter leaves the guest with nothing gained and something lost.

🗣️ Sweet words means polite thanks and conversation

💸 Those words end up wasted here

🎭 Grace toward a two faced host wastes effort

📖 The guest leaves with nothing gained
# Proverbs 23:9-12
# 🪨 Landmarks, Orphans, And A Mighty Redeemer
---
## Speak Not In The Ears Of A Fool

A fool in Proverbs means someone who has already decided not to listen to correction.

Speaking wisdom to that kind of person is effort spent for nothing.

This is not about giving up on people, only about reading the moment correctly.

Wisdom knows when a word will be received and when it will not.

🙉 A fool has already decided not to listen

💨 Wisdom spoken here is effort wasted

🎯 This is about reading the moment correctly

📖 Wisdom knows when a word will land

## For He Will Despise The Wisdom Of Thy Words

Despise means to actively look down on something, not just ignore it quietly.

The fool does not simply miss the point, he rejects it on purpose.

This explains exactly why speaking to him wastes real effort.

Some resistance to wisdom is a choice, not a lack of ability.

😤 Despise means actively looking down on something

🎯 The fool rejects wisdom on purpose

🔗 This explains the earlier warning

📖 Resistance to wisdom can be a choice

## Remove Not The Old Landmark

A landmark was a stone marker showing exactly where one family's land ended.

Moving it quietly shifted a boundary line to steal a portion of land.

This same warning appears again later in the book, word for word close.

Small, quiet dishonesty was still treated as real, serious theft.

🪨 A landmark marked a family's land boundary

🕵️ Moving it quietly stole a portion of land

🔁 This warning repeats later in Proverbs

📖 Quiet dishonesty still counted as real theft

## And Enter Not Into The Fields Of The Fatherless

Fatherless describes an orphan, someone with no father to defend their property.

Their land was an easy target since no powerful guardian stood watch over it.

Taking advantage of that vulnerability made the theft even worse.

Proverbs consistently singles out orphans as people who deserve extra protection.

👶 Fatherless means an orphan with no defender

🎯 Their land was an easy, unguarded target

💔 Taking it made the theft even worse

📖 Proverbs consistently protects the vulnerable

## For Their Redeemer Is Mighty

Redeemer here means a powerful protector who steps in to defend someone weaker.

This redeemer is almost certainly God himself, not a human relative in this case.

Mighty tells the reader this protector has real, unstoppable power to act.

The orphan is never actually as unguarded as a thief might assume.

🛡️ Redeemer means a powerful protector who defends

🙏 This redeemer is almost certainly God

💪 Mighty means real, unstoppable power to act

📖 The orphan is never truly unguarded

## He Shall Plead Their Cause With Thee

Plead their cause pictures a courtroom where God argues on the orphan's behalf.

With thee means the thief himself becomes the one being confronted directly.

This turns a quiet, hidden crime into a case God personally takes up.

No human court ever needed to catch this thief for justice to still come.

⚖️ Plead their cause pictures a courtroom scene

🎯 With thee means the thief is confronted

🙌 God personally takes up this case

📖 Justice does not depend on a human court

## Apply Thine Heart Unto Instruction

Apply thine heart means engaging your whole inner self, not just your ears.

Instruction here points to correction meant to shape real character over time.

This calls for effort, not passive listening while thoughts drift elsewhere.

Wisdom in Proverbs is something actively pursued, never simply absorbed by accident.

🧠 Apply thine heart means full inner engagement

🔨 Instruction means correction that shapes character

🎯 This calls for real effort, not drifting

📖 Wisdom is pursued, not absorbed by accident

## And Thine Ears To The Words Of Knowledge

This pairs the heart's effort with the ears' actual attention during teaching.

Knowledge here means true understanding, not scattered facts collected at random.

Hearing and applying are treated as two separate steps working together.

This verse closes the short section with a plain call to focus.

👂 This pairs heart effort with real listening

🧠 Knowledge means true understanding, not scattered facts

🔗 Hearing and applying work as two steps

📖 The section closes with a call to focus
# Proverbs 23:13-16
# 🏒 Correction, The Rod, And A Father's Joy
---
## Withhold Not Correction From The Child

Withhold means holding something back that should have been given freely.

This calls discipline a genuine gift, not simply a harsh punishment.

Skipping correction out of misplaced kindness actually harms a child long term.

Proverbs treats real love and real discipline as partners, not opposites.

🚫 Withhold means holding back something needed

🎁 This calls discipline a real gift

⚠️ Skipping it harms a child long term

📖 Love and discipline work together here

## For If Thou Beatest Him With The Rod He Shall Not Die

The rod pictures firm, physical correction common in this ancient culture.

He shall not die reassures the parent that reasonable discipline will not destroy the child.

This is not permission for cruelty, but confidence that appropriate correction is safe.

Ancient Near Eastern parenting assumed structure and consequences, not endless negotiation.

🏒 The rod pictures firm, physical correction

🛡️ He shall not die reassures the parent

🎯 This is confidence, not permission for cruelty

📖 Ancient parenting assumed real structure

## Thou Shalt Beat Him With The Rod

This repeats the instruction from the verse just before it, word for word close.

Repetition in Proverbs usually signals something the teacher wants firmly remembered.

The correction described here is meant to be consistent, not occasional.

A pattern of discipline shapes a child more than a single moment ever could.

🔁 This repeats the previous verse closely

📢 Repetition signals something worth remembering

⏳ Correction is meant to be consistent

📖 A pattern shapes more than one moment

## And Shalt Deliver His Soul From Hell

Hell here points to a path of ruin and destruction, not only a final judgment.

Real discipline is framed as protection, steering a child away from that path.

A parent's firmness in the moment can prevent much greater loss later.

This raises correction from a chore into something with lasting, eternal weight.

🔥 Hell here means a path toward ruin

🛡️ Discipline is framed as real protection

⏳ Firmness now can prevent greater loss later

📖 This gives correction lasting, eternal weight

## My Son If Thine Heart Be Wise

The voice shifts here from instruction into a father's personal, emotional hope.

Wise heart means the deep, settled kind of wisdom, not just clever answers.

This softens the chapter after two verses about firm physical correction.

A parent's goal was never the punishment itself but the wisdom it produced.

🗣️ The voice shifts to personal hope here

❤️ Wise heart means deep, settled wisdom

🎯 This softens the chapter after correction

📖 Wisdom was always the real goal

## My Heart Shall Rejoice Even Mine

Even mine adds emphasis, underlining just how personally invested this father is.

A child's wisdom is described as genuine, personal joy for the parent watching.

This reveals the real motive behind all the earlier discipline in the chapter.

Correction was never about control alone, it aimed at this exact moment.

❤️ Even mine adds real emotional emphasis

😊 A child's wisdom brings genuine parental joy

🎯 This reveals the motive behind earlier discipline

📖 Correction aimed at this exact moment

## Yea My Reins Shall Rejoice

Reins in this era referred to the kidneys, believed to be the seat of deep emotion.

Saying reins instead of heart pushes the joy even deeper into the body.

This is poetic language for feeling something all the way through, not surface happiness.

The father's joy here reaches further than words alone could easily capture.

🫘 Reins meant the kidneys, seat of emotion

📏 This pushes the joy even deeper

🎭 This is poetic language for deep feeling

📖 Words alone could not capture this joy

## When Thy Lips Speak Right Things

This names the visible proof that the wisdom from verse fifteen has taken root.

Right things means honest, wise speech that matches a well trained heart.

What fills a person's heart eventually surfaces in their everyday words.

The son's future words could bring this exact joy to a father waiting to hear them.

🗣️ This proves verse fifteen's wisdom took root

✅ Right things means honest, wise speech

🔗 A trained heart surfaces in daily words

📖 A son's words can bring a father joy
# Proverbs 23:17-21
# 🍷 Envy, A Sure Hope, And The Cost Of Excess
---
## Let Not Thine Heart Envy Sinners

Envy here means wishing you had what a wicked person seems to enjoy right now.

Sinners in this proverb often looked successful, comfortable, or free from consequence.

That appearance was misleading, since their story was never actually finished.

Wanting a wicked person's life was a trap this proverb wanted readers to avoid.

😒 Envy means wishing for a sinner's life

👀 Sinners could look successful in the moment

🎭 That appearance was genuinely misleading

📖 Wanting their life was a real trap

## But Be Thou In The Fear Of The LORD All The Day Long

Fear of the LORD means taking God seriously enough to shape your whole day around him.

All the day long rules out treating this as an occasional, once a week habit.

This gives the reader a real alternative instead of just naming the temptation.

Constant reverence for God is offered as the actual antidote to envy.

🙏 Fear of the LORD means daily reverence

⏳ All the day long rules out occasional habit

🔄 This offers a real alternative to envy

📖 Reverence for God is the antidote here

## For Surely There Is An End

This promises that the wicked person's apparent success will not last forever.

Surely adds real confidence, not a vague hope that things might work out.

The proverb trusts a future the reader cannot yet see for themselves.

This is the reasoning behind the earlier command not to envy sinners.

⏳ Their apparent success will not last

✅ Surely means real confidence, not a guess

🔮 This trusts a future not yet visible

📖 This explains why envy makes no sense

## And Thine Expectation Shall Not Be Cut Off

Expectation here means the hope a faithful person holds for their own future.

Cut off pictures that hope being violently ended before it can come true.

This promises the opposite fate for the reader compared to the sinner just described.

Patience now is paired with a real, guaranteed hope for later.

🎯 Expectation means hope for your own future

✂️ Cut off pictures that hope ending early

🔄 This promises the opposite of the sinner's end

📖 Patience is paired with a real hope

## Hear Thou My Son And Be Wise

This direct address signals the teacher shifting to a fresh, personal appeal.

Hear here means more than just physically listening to the words.

Be wise names the actual response this whole appeal is asking for.

Proverbs often pauses like this to make sure the reader is still paying attention.

👂 This signals a fresh, personal appeal

🎯 Hear means more than physical listening

🧠 Be wise names the response being asked

📖 Proverbs pauses to check real attention

## And Guide Thine Heart In The Way

Guide thine heart pictures actively steering your inner life, not just drifting along.

The way refers to the wise, godly path this whole book keeps pointing toward.

This calls for ongoing effort, since a heart left alone tends to wander.

Direction here is a daily choice, not a decision made once and finished.

🧭 Guide thine heart means active steering

🛤️ The way means the wise, godly path

🔄 A heart left alone tends to wander

📖 Direction is a daily choice

## Be Not Among Winebibbers

Winebibbers means people who habitually drink to excess, not someone at a single meal.

Among warns specifically against the company you regularly keep, not one occasion.

This picks up the same warning about influence and company from earlier in the chapter.

Who you regularly sit with quietly shapes your own habits over time.

🍷 Winebibbers means habitual heavy drinkers

🤝 Among warns about regular company, not one night

🔗 This repeats the earlier warning about influence

📖 Regular company quietly shapes your habits

## Among Riotous Eaters Of Flesh

Riotous eaters describes people known for wasteful, undisciplined overindulgence in food.

Flesh here simply means meat, an expensive item eaten in large amounts.

This pairs excessive drinking with excessive eating as two matching warning signs.

Both habits point to the same deeper problem, a life without self control.

🍖 Riotous eaters means wasteful overindulgence in food

💰 Flesh meant meat, an expensive item

🔗 This pairs drinking and eating as matched warnings

📖 Both point to a life without self control

## For The Drunkard And The Glutton Shall Come To Poverty

This names the real world result of the lifestyle just described in both verses.

Money spent chasing excess in food and drink does not stay for anything else.

Poverty here is shown as a natural consequence, not a random misfortune.

The proverb connects daily habits directly to a person's eventual financial future.

📉 This names the real result of excess

💸 Money spent chasing it disappears elsewhere

🎯 Poverty is a natural consequence, not luck

📖 Daily habits shape financial futures

## And Drowsiness Shall Clothe A Man With Rags

Drowsiness here points to laziness that grows out of constant overindulgence.

Clothe with rags pictures poverty becoming as visible and constant as the clothes someone wears.

This final image completes the warning that opened this short section.

A pattern of excess quietly becomes a person's permanent condition.

😴 Drowsiness here means laziness from overindulgence

👕 Rags pictures poverty becoming permanently visible

🔗 This completes the section's opening warning

📖 A pattern of excess becomes permanent
# Proverbs 23:22-25
# 👨‍👩‍👧 Honoring Parents And Buying What Matters Most
---
## Hearken Unto Thy Father That Begat Thee

Hearken means listening with real intention to obey, not just hearing the sound of words.

Begat thee is an old word simply meaning the father who fathered you.

This calls for ongoing respect for a parent's wisdom throughout your whole life.

Honoring a father was treated as a lifelong duty, not just a childhood rule.

👂 Hearken means listening with intent to obey

👨 Begat thee simply means your father

⏳ This calls for lifelong respect

📖 Honor was a duty beyond childhood

## And Despise Not Thy Mother When She Is Old

Despise means actively looking down on someone, not merely disagreeing with them.

When she is old points to a season when a parent may need real care.

Age could tempt a grown child to dismiss a mother's continuing wisdom or needs.

This proverb protects aging parents from being quietly cast aside by their own children.

😤 Despise means actively looking down on someone

👵 When she is old names a real season

⚠️ Age tempts children to dismiss a parent

📖 This protects aging parents from neglect

## Buy The Truth And Sell It Not

Buy here is a picture, since real truth is not literally something purchased with coins.

The point is that truth is worth real cost and sacrifice to gain.

Sell it not warns against trading truth away for comfort or convenience later.

Once real truth is grasped, it is treated as too valuable to trade back.

💰 Buy pictures truth being worth real cost

🎯 Truth is worth genuine sacrifice to gain

🚫 Sell it not warns against trading it away

📖 True understanding is too valuable to lose

## Also Wisdom And Instruction And Understanding

This names three companions to truth, each describing a different part of real wisdom.

Instruction means the correction and teaching that shapes wisdom over time.

Understanding means grasping why something is true, not just knowing that it is.

Together these four words describe a full, well rounded kind of wisdom.

🔗 This names three companions to truth

🔨 Instruction means correction that shapes wisdom

🧠 Understanding means grasping why, not just what

📖 Together these describe full, well rounded wisdom

## The Father Of The Righteous Shall Greatly Rejoice

Righteous here describes a child who actually lives out the wisdom just described.

Greatly rejoice shows a father's joy that goes far beyond simple satisfaction.

This connects a child's choices directly back to a parent's own happiness.

A wise child becomes a gift a parent receives, not just gives.

✅ Righteous means living out real wisdom

😊 Greatly rejoice shows joy beyond satisfaction

🔗 A child's choices affect a parent's happiness

📖 A wise child is a gift received

## And He That Begetteth A Wise Child Shall Have Joy Of Him

This restates the same idea from a slightly different angle for emphasis.

Wise child again ties directly back to the wisdom, truth, and instruction named earlier.

Repetition here underlines just how central this truth is to the whole passage.

A parent's deepest joy is shown coming from character, not achievement or wealth.

🔁 This restates the idea for emphasis

🔗 Wise child ties back to earlier wisdom

📢 Repetition underlines this truth's importance

📖 Deepest joy comes from character, not wealth

## Thy Father And Thy Mother Shall Be Glad

This widens the joy already named to include both parents together.

Glad here describes a settled, genuine happiness, not a brief passing feeling.

Both parents share equally in the reward of a child's real wisdom.

The passage makes sure neither parent's investment is left unmentioned.

👨‍👩‍👧 This widens joy to include both parents

😊 Glad means settled, genuine happiness

🤝 Both parents share equally in this reward

📖 Neither parent's investment goes unmentioned

## And She That Bare Thee Shall Rejoice

Bare thee is an old way of saying gave birth to you.

This closes the section by naming the mother specifically, one more time.

Her joy completes a picture of a whole family shaped by wisdom.

The chapter ties a child's private choices to very public, family wide joy.

👶 Bare thee means gave birth to you

👩 This names the mother specifically again

❤️ Her joy completes the family picture

📖 Private choices produce public family joy
# Proverbs 23:26-28
# 🕳️ A Father's Plea Before The Deep Pit
---
## My Son Give Me Thine Heart

Give me thine heart asks for real trust and attention, not outward performance.

This is a father speaking directly and personally, not a distant rule giver.

The request comes right before a serious warning about temptation ahead.

Real wisdom always starts with this kind of open, willing heart.

❤️ Give me thine heart asks for real trust

🗣️ A father speaks personally here, not a rule

⚠️ This comes right before a serious warning

📖 Wisdom starts with an open heart

## And Let Thine Eyes Observe My Ways

Observe my ways means watching a father's example, not just hearing his advice.

A lived example carried real weight beyond spoken instruction alone in this culture.

This asks the son to learn by watching a life, not only by listening.

Wisdom here is passed down through pattern as much as through words.

👀 Observe my ways means watching, not just hearing

🚶 A lived example carried real weight

🎯 The son learns by watching a life

📖 Wisdom passes through pattern and words

## For A Whore Is A Deep Ditch

This uses vivid imagery instead of a plain warning to make the danger memorable.

A deep ditch pictures a hazard that is easy to fall into but hard to escape.

The comparison warns that this temptation traps more than it first appears to offer.

Ancient wisdom writing often used a striking picture to make a warning stick.

🕳️ This uses vivid imagery for memory

⚠️ A deep ditch means easy in, hard out

🎣 The temptation traps more than it offers

📖 A striking picture makes a warning stick

## And A Strange Woman Is A Narrow Pit

Strange woman here means a woman outside a covenant relationship, tied to forbidden temptation.

Narrow pit adds a picture of a trap so tight it is nearly impossible to climb out of.

This repeats the ditch image from the line before with an even sharper picture.

Two matched pictures in a row make this warning impossible for the reader to miss.

🚫 Strange woman means forbidden, outside temptation

🕳️ Narrow pit means a trap hard to escape

🔗 This repeats the earlier image, sharper

📖 Two matched pictures make the warning clear

## She Also Lieth In Wait As For A Prey

Lieth in wait pictures a deliberate ambush, not an accidental encounter.

As for a prey compares the situation to a hunter stalking an animal.

This removes any idea that the danger described here is passive or harmless.

The warning treats this temptation as an active threat, not a neutral risk.

🎯 Lieth in wait pictures a deliberate ambush

🦁 As for a prey compares this to hunting

⚠️ The danger here is active, not passive

📖 This is treated as a real threat

## And Increaseth The Transgressors Among Men

Transgressors means people who cross a clear moral line on purpose.

Increaseth shows this danger spreading its damage well beyond just one person.

This closes the warning by naming its wider, ongoing cost to a whole community.

One pit can end up claiming far more than a single careless traveler.

⚠️ Transgressors means crossing a clear line on purpose

📈 Increaseth shows damage spreading beyond one person

🌍 This names a cost to the whole community

📖 One pit can claim more than one traveler
# Proverbs 23:29-35
# 😵 The Drunkard's Riddle And Its Bitter Ending
---
## Who Hath Woe Who Hath Sorrow

This opens a riddle built entirely out of repeated questions, six in a row.

Woe and sorrow name real emotional pain and grief a reader can picture.

The teacher is building suspense before naming who these questions are actually about.

Piling up questions like this was a memorable teaching device in ancient wisdom writing.

❓ This opens a riddle of six questions

😢 Woe and sorrow name real pain and grief

⏳ The teacher is building suspense on purpose

📖 Stacked questions made a memorable teaching device

## Who Hath Contentions Who Hath Babbling

Contentions means constant arguing and conflict with people around you.

Babbling pictures confused, embarrassing speech that no longer makes real sense.

Both are named as common results of the same unnamed cause.

The riddle keeps stacking symptoms before finally revealing what causes them.

😠 Contentions means constant arguing and conflict

🗣️ Babbling pictures confused, embarrassing speech

🔗 Both share the same unnamed cause

📖 The riddle keeps stacking symptoms first

## Who Hath Wounds Without Cause Who Hath Redness Of Eyes

Wounds without cause pictures injuries a person cannot even properly explain afterward.

Redness of eyes describes the visible, physical toll of this same hidden habit.

This finishes the list of six questions building toward one final answer.

Every symptom named so far points toward the same coming reveal.

🤕 Wounds without cause means unexplainable injuries

👁️ Redness of eyes shows a physical toll

🔚 This finishes the riddle's list of six

📖 Every symptom points to the same answer

## They That Tarry Long At The Wine

This finally answers every question from the riddle in the verse just before.

Tarry long means lingering for hours, not stopping after one reasonable drink.

The riddle's whole point was building suspense toward this single, simple answer.

Every wound, every argument, every bloodshot eye traces back to this one habit.

🎯 This finally answers the riddle's six questions

⏳ Tarry long means lingering for hours

🔚 The suspense was building toward this answer

📖 Every earlier symptom traces to this habit

## They That Go To Seek Mixed Wine

Mixed wine in this culture was often strengthened with spices to increase its effect.

Seeking it out shows deliberate pursuit, not an occasional or accidental drink.

This adds detail to the picture of someone actively chasing intoxication.

The proverb is describing a settled habit, not one unlucky evening.

🍷 Mixed wine was often strengthened with spices

🎯 Seeking it shows deliberate pursuit

🔁 This pictures active chasing, not accident

📖 This describes a habit, not one evening

## Look Not Thou Upon The Wine When It Is Red

This warns against even the first, admiring glance at the temptation.

Red wine was considered especially fine and visually appealing in this culture.

The warning starts at the eyes, before any decision has even been made.

Avoiding the first look was treated as easier than resisting the later craving.

👀 This warns against even the first glance

🍷 Red wine was considered especially fine

🎯 The warning starts before any decision

📖 Avoiding the look is easier than resisting craving

## When It Giveth His Colour In The Cup

This pictures the wine's rich color catching the light inside the cup.

The detail shows just how carefully this whole scene is being described.

Visual appeal is treated as part of the trap, not an innocent detail.

Temptation here works first through the eyes, exactly as the verse just warned.

🍷 This pictures the wine's color in the cup

🎨 The scene is described in careful detail

🪤 Visual appeal is part of the trap

📖 Temptation works first through the eyes

## When It Moveth Itself Aright

This pictures the wine swirling smoothly, almost gracefully, inside the cup.

Aright suggests something that looks pleasant, correct, and perfectly appealing.

Every detail so far builds an image of pure, harmless enjoyment.

The very next verse is about to shatter that entire pleasant picture.

🌀 This pictures the wine swirling smoothly

✨ Aright suggests something pleasant and appealing

🎭 The image so far looks harmless

📖 The next verse shatters this picture

## At The Last It Biteth Like A Serpent

At the last marks a turning point, revealing wine's true cost after the fact.

Biteth like a serpent pictures a sudden, venomous strike instead of a slow decline.

This directly reverses the pleasant, colorful picture from the verses just before.

What looked beautiful in the cup becomes genuinely dangerous once it is consumed.

⏳ At the last marks a turning point

🐍 Biteth like a serpent pictures a sudden strike

🔄 This reverses the pleasant picture before it

📖 What looked beautiful becomes genuinely dangerous

## And Stingeth Like An Adder

An adder was a venomous snake well known and feared in this region.

Stingeth repeats the serpent image with a second, equally dangerous creature.

This doubling makes the warning about wine's true nature impossible to soften.

Two venomous pictures in a row leave no room to call this harmless.

🐍 An adder was a venomous, feared snake

🔁 This repeats the danger with a second image

⚠️ Doubling the image makes the warning stronger

📖 Two venomous pictures rule out calling this harmless

## Thine Eyes Shall Behold Strange Women

This names one real consequence of drunkenness, clouded and reckless judgment.

Strange women again points to forbidden relationships outside a covenant marriage.

Alcohol here is shown weakening the same discernment warned about earlier in the chapter.

One poor habit is shown opening the door to an entirely separate temptation.

👁️ This names a real consequence of drunkenness

🚫 Strange women means forbidden relationships again

🧠 Alcohol weakens discernment warned about earlier

📖 One habit opens the door to another

## And Thine Heart Shall Utter Perverse Things

Perverse things means twisted, wrong speech a sober person would never actually say.

The heart here again stands for a person's true, unfiltered inner thoughts.

Alcohol is shown removing the normal filter between thought and spoken word.

This completes the picture of judgment fully unraveling under drunkenness.

🗣️ Perverse things means twisted, wrong speech

❤️ The heart again means true inner thoughts

🚫 Alcohol removes the filter on speech

📖 This completes the picture of unraveling judgment

## Thou Shalt Be As He That Lieth Down In The Midst Of The Sea

This pictures the dizzy, disoriented feeling of a person tossed on open water.

The midst of the sea means far from any solid, stable ground.

Drunkenness here is compared to losing all sense of balance and direction.

The image captures confusion, not simply tiredness or ordinary sleepiness.

🌊 This pictures dizzy, disoriented tossing

🎯 The midst of the sea means no ground

😵 Drunkenness is compared to losing all balance

📖 This captures confusion, not simple tiredness

## Or As He That Lieth Upon The Top Of A Mast

A mast is the tall pole holding a ship's sail high above the deck.

Lying at the very top pictures an extremely unstable, dangerous position to be in.

This second image intensifies the danger already shown by the sea comparison.

Both pictures together capture a person who has completely lost control of themselves.

⛵ A mast holds a ship's sail high

⚠️ The top of a mast is extremely unstable

🔗 This intensifies the earlier sea comparison

📖 Both pictures show lost self control

## They Have Stricken Me Shalt Thou Say And I Was Not Sick

This gives the drunkard his own voice for the very first time in the passage.

Stricken me means being physically struck or beaten in some kind of fight.

I was not sick shows alcohol has completely numbed him to real pain.

His own words now reveal exactly how far his judgment has actually fallen.

🗣️ This gives the drunkard his own voice

🤕 Stricken me means being physically struck

🚫 I was not sick shows numbed pain

📖 His words reveal how far judgment fell

## They Have Beaten Me And I Felt It Not

This repeats the same numbness with a second, matching example of injury.

Felt it not shows a body no longer sending normal warning signals.

Pain exists to protect a person, and that protection has now completely failed.

Doubling the image drives home just how far this habit has gone.

🔁 This repeats the numbness with a second example

🚫 Felt it not shows warning signals failing

🛡️ Pain normally protects, and that has failed

📖 Doubling the image shows how far this went

## When Shall I Awake

This question reveals the drunkard already planning his very next drink.

Awake pictures waking from this stupor only to return to it again.

There is no real regret here, only impatience to repeat the pattern.

This is the clearest picture in the whole book of addiction's actual grip.

❓ This shows him already planning the next drink

😴 Awake pictures waking only to return to it

🚫 There is no real regret shown here

📖 This is a clear picture of addiction's grip

## I Will Seek It Yet Again

This is the chapter's final line, and it ends without any resolution or rescue.

Seek it yet again shows the cycle continuing instead of finally breaking.

The chapter chooses to end on the trap itself, not a tidy escape from it.

Leaving the ending open makes the earlier warnings feel even more urgent to the reader.

🔚 This is the chapter's final line

🔁 Seek it again shows the cycle continuing

🎯 The chapter ends on the trap, not rescue

📖 The open ending makes earlier warnings urgent
`.trim();

export const PROVERBS_TWENTY_THREE_PERSONAL_SECTIONS = parseProverbsTwentyThreeRawNotes(PROVERBS_TWENTY_THREE_RAW_NOTES);
