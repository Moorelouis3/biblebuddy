export type ProverbsSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsSixteenRawNotes(rawText: string): ProverbsSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 16:${startVerse}` : `Proverbs 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 16 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_SIXTEEN_RAW_NOTES = `# Proverbs 16:1-5
# 🫀 Plans, Pride, And A God Who Weighs The Heart
---
## 🧠 The Preparations Of The Heart In Man

"Preparations" means the planning and arranging a person does before acting.

Every plan begins inside, long before it becomes a word or a deed.

A person can map out an entire course of action in private.

That private planning still belongs to the LORD, not just the final act.

🧠 Preparations means planning before acting

📋 Plans begin inside a person first

🔒 Even private planning is not hidden

📖 The LORD is present from the first thought

## 👄 The Answer Of The Tongue, Is From The LORD

This verse pairs the silent plan with the spoken word that follows it.

A person can prepare exactly what they mean to say.

What actually comes out of the mouth is shown here as still under God's hand.

Planning and speaking both sit inside a larger will than the speaker's own.

👄 The tongue's answer pairs with the heart's plan

🗣️ A person can plan their exact words

🙌 What comes out still rests in God's hand

📖 Planning and speaking both sit under God

## 👀 All The Ways Of A Man Are Clean In His Own Eyes

This means people naturally believe their own choices are justified.

Self judgment is rarely honest, since everyone excuses their own reasons.

A person can feel entirely right while walking a wrong path.

Feeling clean and actually being clean are two very different things.

👀 People see their own choices as justified

🪞 Self judgment is rarely fully honest

🚧 Feeling right does not mean being right

📖 Feeling clean differs from being clean

## ⚖️ But The LORD Weigheth The Spirits

"Weigheth" means examines closely and measures true value or motive.

This is the opposite of judging by outward appearance alone.

God looks past a person's own self approval to what actually drives them.

His verdict does not depend on how confident someone feels about themselves.

⚖️ Weigheth means examines and measures motive

👁️ This differs from judging by appearance

🔍 God looks past self approval

📖 His verdict does not depend on feelings

## 🙏 Commit Thy Works Unto The LORD

"Commit" means to hand something over fully, not just ask for help.

This pictures placing a plan directly into God's care before acting on it.

It is more than a quick prayer said before starting a task.

The whole project is being placed under His direction from the very start.

🙏 Commit means handing something over fully

📦 This is placing a plan in God's care

🚫 It is more than a quick prayer

📖 The whole project starts under His direction

## 🏗️ Thy Thoughts Shall Be Established

"Established" means made firm and lasting, not likely to collapse.

This is the result promised to the person who commits their plans to God.

A thought handed over to the LORD gains a stability it did not have alone.

The verse links surrender at the start to steadiness at the end.

🏗️ Established means made firm and lasting

🎁 This is the result of committing plans

💪 Surrendered thoughts gain real stability

📖 Surrender at the start brings steadiness later

## 🌍 The LORD Hath Made All Things For Himself

This means every created thing ultimately serves God's own purposes.

Nothing in creation exists purely by accident or without any reason.

Even things that look pointless still fit somewhere inside a larger design.

The world was never left to run without a purpose behind it.

🌍 All things ultimately serve God's purposes

🎯 Nothing exists purely by accident

🧩 Even odd things fit a larger design

📖 The world was never without purpose

## ⚠️ Yea, Even The Wicked For The Day Of Evil

This is one of the harder lines in Proverbs to read plainly.

It does not mean God causes a person's wickedness itself.

"The day of evil" points to a coming day of judgment or calamity.

Even the wicked fit inside a plan that ends in real accountability.

⚠️ This line is hard to read plainly

🚫 God does not cause the wickedness itself

📅 Day of evil means a day of judgment

📖 The wicked still end in real accountability

## 💔 Every One That Is Proud In Heart Is An Abomination To The LORD

"Abomination" means something God finds deeply offensive, not merely disliked.

Pride in this verse is an inward posture, not a single boastful act.

The heart's self exaltation is treated here as seriously as any outward sin.

God's opposition to pride reaches all the way to a person's inner attitude.

💔 Abomination means deeply offensive to God

🫀 Pride here is an inward posture

⚠️ God treats it as seriously as outward sin

📖 God's opposition reaches the inner attitude

## 🤝 Though Hand Join In Hand, He Shall Not Be Unpunished

"Hand join in hand" is an old idiom for people banding together.

It often pictured a formal handshake sealing an alliance or a conspiracy.

Numbers or teamwork are shown here as no shield against real justice.

Joining forces with others cannot buy protection from what a person has done.

🤝 Hand join in hand means banding together

🖐️ It pictured a handshake sealing an alliance

🚫 Teamwork is no shield against justice

📖 Numbers cannot buy protection from wrongdoing

# Proverbs 16:6-10
# 👑 Mercy, A King's Words, And The LORD Who Steers
---
## 💞 By Mercy And Truth Iniquity Is Purged

"Purged" means cleansed or removed, like impurity being burned away.

Mercy and truth together are pictured here as a kind of cleansing force.

This does not replace God's own provision for atonement elsewhere in Scripture.

It describes how genuine character keeps a person from sliding back into sin.

💞 Purged means cleansed or removed

🔥 Mercy and truth act like a cleansing force

🚫 This does not replace God's own atonement

📖 Real character keeps a person from sliding back

## 🚶 By The Fear Of The LORD Men Depart From Evil

"Fear of the LORD" means real reverence, taking God seriously.

This reverence is shown here producing an actual change in behavior.

It is not fear that paralyzes but fear that redirects a person's steps.

Right thinking about God is pictured as the engine behind right living.

🚶 Fear of the LORD means real reverence

🔄 Reverence is shown producing real change

🧭 It redirects steps rather than paralyzing

📖 Right thinking about God drives right living

## 🕊️ When A Man's Ways Please The LORD

"Please" here means genuinely pleasing to God, not merely acceptable.

This describes a person whose whole direction of life honors God.

Such pleasing is shown here as more than one isolated good deed.

A pattern of honoring God is what the verse actually has in view.

🕊️ Please means genuinely pleasing to God

🛤️ This describes a whole direction of life

🔁 It is a pattern, not one deed

📖 A life honoring God is in view

## 🤝 He Maketh Even His Enemies To Be At Peace With Him

This is a surprising promise most readers would not expect.

Living rightly does not guarantee an easy life free of conflict.

But it is shown here as able to soften even hostile relationships.

God can work through a person's integrity to change how others treat them.

🤝 A surprising promise most would not expect

⚔️ Right living does not guarantee an easy life

🕊️ It can soften even hostile relationships

📖 God can change how others treat someone

## 💰 Better Is A Little With Righteousness

"Better is" proverbs weigh two things to teach what actually matters.

A small, honestly gained amount outweighs dishonest wealth on this scale.

This is not praise for poverty itself.

It is praise for honesty over any amount of riches.

💰 Better is proverbs weigh what matters

🪙 A small honest amount outweighs dishonest wealth

🚫 This is not praise for poverty

📖 It praises honesty over any riches

## 😰 Than Great Revenues Without Right

"Revenues" means income or gain, however it was obtained.

"Without right" means gained unjustly, through dishonest or unfair means.

Large dishonest income is shown here as worse than small honest income.

The size of a fortune matters far less than how it was earned.

😰 Revenues means income however it was gained

⚠️ Without right means gained unjustly

📉 Dishonest income is worse than honest income

📖 How money is earned matters more than size

## 🗺️ A Man's Heart Deviseth His Way

"Deviseth" means plans out carefully, working out the details in advance.

A person can map out their entire path with real thought and care.

This planning is genuine and respected, not dismissed as pointless.

Human intention is real, even though it is not the final word.

🗺️ Deviseth means plans out carefully

📝 A person can map out their whole path

✅ This planning is genuine, not pointless

📖 Human intention is real but not final

## 🧭 But The LORD Directeth His Steps

"Directeth" means actively guides the actual outcome of each step.

This verse pairs directly with the planning just described a moment before.

A person's map and God's guidance are shown working at the same time.

The final direction of a life belongs to God more than to the planner.

🧭 Directeth means actively guides the outcome

🔗 This pairs with the planning above

🤝 A person's map and God's guidance work together

📖 The final direction belongs to God

## 👑 A Divine Sentence Is In The Lips Of The King

"Divine sentence" pictures royal speech carrying an almost prophetic weight.

Ancient kings were often seen as speaking with authority close to God's own.

This describes the ideal of kingship, not a guarantee every king lived up to it.

A king's words were expected to carry unusual weight and accuracy.

👑 Divine sentence pictures speech with prophetic weight

🏛️ Ancient kings spoke with authority close to God's

🎯 This is an ideal, not a guarantee

📖 A king's words were expected to carry weight

## ⚖️ His Mouth Transgresseth Not In Judgment

"Transgresseth" means crosses a line it should not cross.

This describes the standard a king was expected to meet in ruling.

A just ruler's verdicts were expected to line up with what was actually right.

The verse states an ideal that real kings did not always reach.

⚖️ Transgresseth means crosses a forbidden line

📏 This describes the standard for a king's rulings

🎯 Verdicts were expected to match what is right

📖 Real kings did not always meet this

# Proverbs 16:11-15
# ⚖️ Honest Scales And A King's Favor
---
## ⚖️ A Just Weight And Balance Are The LORD's

"Weight and balance" were the tools ancient merchants used to measure goods honestly.

Dishonest merchants sometimes used two different sets of weights to cheat customers.

This verse claims those honest tools themselves belong to God.

Fair dealing in the marketplace is treated as something God personally cares about.

⚖️ Weight and balance were tools for fair trade

🎭 Dishonest merchants used two sets of weights

🙌 Honest tools are said to belong to God

📖 God personally cares about fair dealing

## 💰 All The Weights Of The Bag Are His Work

Merchants carried small stone weights in a bag to measure out goods.

"His work" means God claims responsibility for the standard those weights should meet.

Even something as small as a merchant's stone weight matters to God.

Everyday honesty is shown here as sacred ground, not a minor detail.

💰 Merchants carried stone weights in a bag

🛠️ His work means God claims the standard

🔍 Even small weights matter to God

📖 Everyday honesty is sacred, not minor

## 🚫 It Is An Abomination To Kings To Commit Wickedness

This states an ideal every good king was expected to hold.

A ruler's own integrity was seen as part of what made a throne legitimate.

Wickedness in a king was viewed as uniquely dangerous, not a private matter.

A corrupt ruler put the whole nation's justice at risk, not just himself.

🚫 This states an ideal for good kings

👑 A king's integrity made his throne legitimate

⚠️ A king's wickedness endangered the whole nation

📖 A corrupt ruler risked more than himself

## 🏛️ For The Throne Is Established By Righteousness

"Established" means made secure and lasting over time.

A kingdom built on fair, honest rule was expected to actually last longer.

Corrupt power might look strong for a season but was seen as unstable.

Righteousness is treated here as the real foundation under political power.

🏛️ Established means made secure and lasting

⏳ Fair rule was expected to last longer

🏚️ Corrupt power looked strong but was unstable

📖 Righteousness is the real foundation of power

## 💋 Righteous Lips Are The Delight Of Kings

"Delight" here means something a king genuinely enjoyed hearing.

An honest advisor's words were treasured over flattering ones.

Truthful speech was prized in the ideal royal court.

Wise counsel outweighed comfortable words in a king's ear.

💋 Delight means something genuinely enjoyed

🗣️ Honest advice was treasured over flattery

👑 Truthful speech was prized in an ideal court

📖 Wise counsel outweighed comfortable words

## 🙌 They Love Him That Speaketh Right

"Speaketh right" means tells the truth, even when it is hard to hear.

A wise king is shown here favoring honest voices, not silent ones.

This verse pictures truth telling as something that earns real favor.

Courage to speak honestly was valued over safe silence in this ideal court.

🙌 Speaketh right means tells the truth

👂 A wise king favors honest voices

🏆 Truth telling earns real favor here

📖 Courage was valued over safe silence

## 💀 The Wrath Of A King Is As Messengers Of Death

"Messengers of death" was a vivid ancient image for an unstoppable threat.

Kings held real power over life and death in the ancient world.

A king's anger could unleash trouble a person could not simply outrun.

This is an honest warning about the danger of raw human power.

💀 Messengers of death pictured an unstoppable threat

⚔️ Kings held real power over life and death

🏃 A king's anger could not simply be outrun

📖 This warns about the danger of raw power

## 🕊️ But A Wise Man Will Pacify It

"Pacify" means calm down, turning anger away before it does harm.

This directly answers the danger just described in the verse before it.

A wise response is shown here as genuinely able to defuse real danger.

Skillful words are treated as a real defense against a powerful person's rage.

🕊️ Pacify means calm anger before harm

🔄 This answers the danger described above

🛡️ A wise response can defuse real danger

📖 Skillful words defend against a powerful person's rage

## ☀️ In The Light Of The King's Countenance Is Life

"Countenance" means the face, someone's outward expression.

A king's approving look was treated as a matter of real safety.

Falling out of favor with a ruler could threaten a person's whole future.

Nearness to royal favor is pictured here as literally life giving.

☀️ Countenance means the face and expression

🛡️ A king's approval meant real safety

⚠️ Losing favor could threaten someone's future

📖 Royal favor is pictured as life giving

## 🌧️ His Favour Is As A Cloud Of The Latter Rain

The "latter rain" fell in spring, right when crops needed it most to ripen.

Farmers depended completely on that rain arriving at exactly the right time.

A king's favor is compared here to rain a whole harvest depended on.

Good timing made the difference between a full harvest and a failed one.

🌧️ Latter rain fell in spring when needed

🌾 Farmers depended completely on that rain

👑 A king's favor is compared to needed rain

📖 Good timing made the harvest succeed or fail

# Proverbs 16:16-20
# 💎 Wisdom Worth More Than Gold
---
## 💎 How Much Better Is It To Get Wisdom Than Gold

"How much better" is a common Proverbs comparison moving from lesser to greater value.

Gold was the most valuable metal available in the ancient world.

Wisdom is placed here above even the finest material wealth a person could gain.

The comparison is not close, wisdom is shown as clearly worth more.

💎 How much better compares lesser to greater value

🪙 Gold was the most valuable ancient metal

🏆 Wisdom outranks even the finest wealth

📖 The comparison is not close at all

## 🥈 To Get Understanding Rather To Be Chosen Than Silver

Silver was the second most valuable metal in everyday ancient trade.

This verse repeats the same comparison using a second precious metal.

Repetition in Hebrew poetry usually signals an idea worth emphasizing twice.

Understanding is shown here as worth choosing over wealth by a wide margin.

🥈 Silver was the second most valuable metal

🔁 This repeats the comparison with a second metal

📢 Hebrew repetition signals an idea worth emphasis

📖 Understanding is worth choosing over wealth

## 🛣️ The Highway Of The Upright Is To Depart From Evil

"Highway" pictures a clear, well used road, not a hidden side path.

Turning from evil is shown here as the main road, not a rare detour.

A life of integrity is described as a whole direction, not one choice.

Avoiding evil is treated as the normal path for someone walking uprightly.

🛣️ Highway pictures a clear well used road

🚧 Turning from evil is the main road

🧭 Integrity is a whole direction, not one choice

📖 Avoiding evil is the normal path

## 🛡️ He That Keepeth His Way Preserveth His Soul

"Keepeth his way" means stays carefully on the right path over time.

"Preserveth" means protects and keeps safe, not just survives by luck.

Watching one's own direction is shown here as genuine self protection.

Careless drifting is the real danger this verse is quietly warning against.

🛡️ Keepeth his way means staying carefully on track

🔒 Preserveth means protects, not survives by luck

👀 Watching one's direction is real self protection

📖 Careless drifting is the real danger here

## 💥 Pride Goeth Before Destruction

This is one of the most quoted lines in the whole book.

"Goeth before" pictures pride as the first step in a predictable sequence.

Pride is shown here as a warning sign, not a harmless confidence.

The fall described later in the verse rarely arrives without pride first.

💥 One of the most quoted lines in Proverbs

🚶 Goeth before means it comes first

⚠️ Pride is a warning sign, not confidence

📖 The fall rarely arrives without pride first

## 😤 And An Haughty Spirit Before A Fall

"Haughty" means arrogant, looking down on others as beneath oneself.

This restates the same idea from the verse before in different words.

Hebrew poetry often repeats one truth twice to make sure it lands.

An inflated view of oneself is shown here as fragile, not strong.

😤 Haughty means arrogant, looking down on others

🔁 This restates the idea from the verse before

📢 Hebrew poetry often repeats a truth twice

📖 An inflated self view is fragile, not strong

## 🙏 Better It Is To Be Of An Humble Spirit With The Lowly

"Lowly" here means people of modest means or low social standing.

Choosing humble company is placed above choosing powerful company in this proverb.

A humble spirit fits naturally among people who have little to prove.

Status is shown here as a poor measure of who is worth being near.

🙏 Lowly means people of modest standing

👥 Humble company is placed above powerful company

🤝 Humility fits among people with nothing to prove

📖 Status is a poor measure of worth

## 🏆 Than To Divide The Spoil With The Proud

"Spoil" means plunder or loot taken after a victory or a raid.

Sharing in stolen riches with proud, dangerous people is offered as the alternative.

Even a share of real wealth is shown here as not worth that company.

The proverb values who you stand with over what you might gain.

🏆 Spoil means plunder taken after a raid

💰 Stolen riches came with proud dangerous company

🚫 Wealth is not worth that company

📖 The proverb values company over gain

## 🧠 He That Handleth A Matter Wisely Shall Find Good

"Handleth wisely" means approaches a situation with real skill and care.

This is broader than one decision, it points to a habit of thoughtful action.

Good outcomes are linked here to skillful handling, not just good luck.

Careful attention to a problem is treated as its own kind of wisdom.

🧠 Handleth wisely means approaching with real skill

🔁 This is a habit, not one decision

🎯 Good outcomes link to skillful handling, not luck

📖 Careful attention is its own kind of wisdom

## 🙌 And Whoso Trusteth In The LORD, Happy Is He

"Trusteth" means relies on, leaning full weight on someone else.

This pairs practical skill from the first half with simple trust in God.

Wisdom and trust are shown here working together, not competing with each other.

A truly happy life combines careful action with real dependence on God.

🙌 Trusteth means relies on, leaning full weight

🤝 This pairs skill with trust in God

🔄 Wisdom and trust work together, not against

📖 A happy life combines action and dependence

# Proverbs 16:21-25
# 🍯 Sweet Words, A Path That Only Looks Right
---
## 🧠 The Wise In Heart Shall Be Called Prudent

"Prudent" means practically skilled at making good decisions.

Inner wisdom is shown here earning an outward reputation over time.

Being called prudent was a real compliment in this culture, not a small one.

Wisdom that stays hidden inside eventually becomes visible through a person's choices.

🧠 Prudent means practically skilled at decisions

🏷️ Inner wisdom earns an outward reputation

👏 Being called prudent was a real compliment

📖 Hidden wisdom becomes visible through choices

## 🍯 And The Sweetness Of The Lips Increaseth Learning

"Sweetness of the lips" means speech that is pleasant and easy to receive.

This pairs the previous verse's inner prudence with an outward gift for teaching.

A kind way of speaking helps truth actually land instead of being resisted.

How something is said can determine whether it is ever really heard.

🍯 Sweetness of the lips means pleasant speech

🔗 This pairs prudence with a gift to teach

👂 Kind speech helps truth actually land

📖 How words are said affects if heard

## 💧 Understanding Is A Wellspring Of Life Unto Him That Hath It

A "wellspring" is a natural spring, a constant source of fresh water in a dry land.

This pictures understanding as something that keeps giving, not a one time gain.

A person with real understanding has a resource that renews itself over time.

Wisdom is shown here sustaining a person's whole life, not just one moment.

💧 Wellspring means a natural constant water source

🔁 Understanding keeps giving, not a one time gain

♻️ Real understanding renews itself over time

📖 Wisdom sustains a whole life, not one moment

## 🙄 But The Instruction Of Fools Is Folly

This verse draws a sharp contrast with the wellspring just described.

"Instruction" here refers to whatever a fool tries to teach others.

Whatever a fool passes on is shown here as worthless, not simply unhelpful.

A fool cannot give others water from a well they never had themselves.

🙄 This contrasts the wellspring described above

📚 Instruction means whatever a fool tries to teach

🗑️ A fool's teaching is worthless, not just unhelpful

📖 A fool cannot give water they never had

## 🫀 The Heart Of The Wise Teacheth His Mouth

This pictures wisdom starting inside and then shaping outward speech.

The order matters, the heart leads and the mouth follows after it.

A wise person's words are shown here as trained by careful inner thought.

Good speech is the fruit of a well taught heart, not a lucky guess.

🫀 Wisdom starts inside then shapes speech

🔄 The heart leads and the mouth follows

🎓 Words are trained by careful inner thought

📖 Good speech is fruit of a taught heart

## 📈 And Addeth Learning To His Lips

"Addeth" means increases or builds up over time, not a single event.

A wise person's speech is shown here continuing to grow more skilled.

This pictures learning as ongoing, never a finished project.

Wisdom keeps shaping how a person speaks for as long as they keep learning.

📈 Addeth means increases over time, not one event

🌱 Speech is shown continuing to grow

⏳ This pictures learning as ongoing, never finished

📖 Wisdom keeps shaping speech as learning continues

## 🍯 Pleasant Words Are As An Honeycomb

Honey straight from the comb was one of the sweetest foods available in this culture.

This verse compares kind, gentle speech to that rare natural sweetness.

Pleasant words are treated here as a genuine gift, not empty flattery.

The comparison assumes the reader already knows how good real honey tastes.

🍯 Honey was one of the sweetest ancient foods

🗣️ Kind speech is compared to that sweetness

🎁 Pleasant words are a genuine gift here

📖 The comparison assumes the reader knows honey's taste

## 💊 Sweet To The Soul, And Health To The Bones

Ancient people connected deep emotional states directly to physical bodily health.

"Bones" here stands for a person's whole physical body and strength.

Kind words are shown here doing real good far beyond just feeling nice.

Encouragement is pictured as medicine, not merely a pleasant social nicety.

💊 Emotional states were connected to physical health

🦴 Bones stands for a person's whole body

💪 Kind words do real good beyond feeling nice

📖 Encouragement is pictured as real medicine

## 🌀 There Is A Way That Seemeth Right Unto A Man

This verse warns that a path can feel completely correct and still be wrong.

Personal confidence is shown here as an unreliable guide on its own.

This echoes a warning already given earlier in this very chapter.

Feeling certain is not the same thing as actually being right.

🌀 A wrong path can still feel correct

🧭 Personal confidence is an unreliable guide alone

🔁 This echoes a warning earlier in this chapter

📖 Feeling certain differs from being right

## ☠️ But The End Thereof Are The Ways Of Death

"End thereof" means where that confident path actually leads in the end.

This verse repeats almost word for word a warning from Proverbs fourteen.

Repetition across the book signals how serious this danger is treated.

A path only proves itself trustworthy by where it actually ends.

☠️ End thereof means where the path leads

🔁 This repeats a warning from Proverbs fourteen

📢 Repeating it across the book signals real danger

📖 A path proves itself by where it ends

# Proverbs 16:26-30
# 🔥 A Working Mouth And Troublemaking Men
---
## 💪 He That Laboureth Laboureth For Himself

The repeated word "laboureth" emphasizes ongoing, hard physical work.

This describes basic human motivation in plain, honest terms.

Working to meet one's own needs is treated here as simply how life works.

The verse states a plain fact about labor rather than a moral command.

💪 Laboureth repeated emphasizes ongoing hard work

🎯 This describes basic human motivation plainly

🍽️ Meeting one's needs is just how life works

📖 The verse states a fact, not a command

## 👄 For His Mouth Craveth It Of Him

"Craveth" means demands strongly, like real hunger driving action.

This ties basic bodily need directly to the drive behind daily labor.

Hunger is shown here as a built in motivation, not a flaw to overcome.

Providing for oneself is treated as a normal, God given part of life.

👄 Craveth means demands strongly like hunger

🔗 This ties bodily need to daily labor

✅ Hunger is a normal built in motivation

📖 Providing for oneself is a normal part

## 🕳️ An Ungodly Man Diggeth Up Evil

"Diggeth up" pictures someone actively digging for trouble, not stumbling into it.

This describes deliberate effort put into causing harm.

Evil here is not an accident, it takes real, intentional work.

The image contrasts sharply with the honest labor just described above.

🕳️ Diggeth up pictures actively digging for trouble

🎯 This describes deliberate effort toward harm

⚠️ Evil here takes real intentional work

📖 This contrasts the honest labor above

## 🔥 And In His Lips There Is As A Burning Fire

Fire spreads quickly and destroys far more than its starting point.

This pictures cruel or destructive words spreading damage the same way.

A careless word from this kind of person is never small or contained.

Speech is treated here as genuinely dangerous, not just unpleasant to hear.

🔥 Fire spreads and destroys beyond its start

🗣️ Cruel words are pictured spreading the same way

💥 A careless word from them is never small

📖 Speech here is genuinely dangerous, not unpleasant

## 😈 A Froward Man Soweth Strife

"Froward" means stubbornly contrary, twisting things away from what is right.

"Soweth" pictures planting seeds that are meant to grow into conflict.

This person does not stumble into arguments, they plant them on purpose.

Strife is shown here as a harvest someone deliberately cultivated.

😈 Froward means stubbornly contrary and twisted

🌱 Soweth pictures planting seeds meant to grow

🎯 This person plants conflict on purpose

📖 Strife is a harvest someone cultivated

## 🤫 And A Whisperer Separateth Chief Friends

"Whisperer" means someone who spreads gossip in secret, quiet conversations.

"Chief friends" means close, trusted companions, not casual acquaintances.

Even the strongest friendships are shown here as vulnerable to quiet gossip.

Words spoken in secret can do damage loud arguments never could.

🤫 Whisperer means someone who spreads secret gossip

🤝 Chief friends means close trusted companions

💔 Even strong friendships are vulnerable to gossip

📖 Secret words can damage more than loud ones

## 😈 A Violent Man Enticeth His Neighbour

"Enticeth" means lures or persuades someone toward something harmful.

This describes deliberate influence, not an accident or a passing suggestion.

A violent person is shown here actively recruiting others into their pattern.

Bad influence rarely stays contained to just the one person practicing it.

😈 Enticeth means lures someone toward harm

🎯 This describes deliberate influence, not accident

👥 A violent person actively recruits others

📖 Bad influence rarely stays contained to one

## 🛣️ And Leadeth Him Into The Way That Is Not Good

"Leadeth" pictures someone actually guiding another person, step by step.

This is more than a bad example, it is active guidance toward harm.

Company and influence are shown here as genuinely dangerous, not neutral.

Who leads a person matters as much as the choices they make alone.

🛣️ Leadeth pictures actively guiding another person

🎯 This is active guidance, more than example

⚠️ Influence and company are genuinely dangerous

📖 Who leads someone matters as much as choices

## 👁️ He Shutteth His Eyes To Devise Froward Things

Ancient readers associated shut or narrowed eyes with hidden scheming.

This pictures someone deep in concentration, planning something twisted.

The closed eyes are a visible sign of a calculating, hidden mind.

Body language is shown here quietly revealing what a person is really thinking.

👁️ Shut eyes were linked to hidden scheming

🧠 This pictures someone concentrating on a twisted plan

🎭 Closed eyes signal a calculating hidden mind

📖 Body language can reveal hidden thoughts

## 👄 Moving His Lips He Bringeth Evil To Pass

Silently moving lips pictured someone quietly working out a plan's final details.

This person has already moved from planning into the moment of action.

The verse pairs the earlier shut eyes with this closing image of the mouth.

Evil described in this pair of verses moves from the mind straight into action.

👄 Moving lips pictured quietly finishing a plan

🎬 This is the moment planning becomes action

🔗 This pairs with the shut eyes above

📖 Evil here moves from mind to action

# Proverbs 16:31-33
# 🎲 Gray Hair, A Slow Temper, And A Lot Cast By God
---
## 👴 The Hoary Head Is A Crown Of Glory

"Hoary" means gray or white, describing the hair of someone elderly.

Old age in this culture was honored rather than something to hide.

A "crown" pictures gray hair as an honor to be worn proudly.

This honor comes with a condition named in the second half of the verse.

👴 Hoary means gray or white hair

🎖️ Old age was honored in this culture

👑 Crown pictures gray hair as an honor

📖 This honor comes with a condition next

## ✝️ If It Be Found In The Way Of Righteousness

This second half quietly narrows the promise made in the first half.

Age alone does not automatically earn the honor just described.

A long life lived in righteousness is what actually earns the crown.

Years add up to honor only when they are spent walking rightly.

✝️ This narrows the promise from the first half

⏳ Age alone does not earn honor automatically

🏆 Righteous living is what actually earns the crown

📖 Years earn honor only when spent rightly

## 🕊️ He That Is Slow To Anger Is Better Than The Mighty

"The mighty" means a powerful warrior admired for physical strength and conquest.

This verse compares two very different kinds of strength directly.

Self control is placed above military power in this comparison.

Ancient culture prized warriors highly, which makes this ranking genuinely surprising.

🕊️ The mighty meant a powerful admired warrior

⚔️ This compares two very different kinds of strength

💪 Self control outranks military power here

📖 This ranking would have surprised this culture

## 🏙️ And He That Ruleth His Spirit Than He That Taketh A City

"Taketh a city" pictured a major military conquest, a huge public achievement.

Ruling one's own spirit is placed above that famous, visible victory.

The inner battle for self control is shown here as the harder win.

A private victory over one's own temper outranks a public military triumph.

🏙️ Taketh a city pictured a huge public conquest

🫀 Ruling one's spirit outranks that visible victory

🥊 The inner battle is the harder win

📖 A private victory outranks a public one

## 🎲 The Lot Is Cast Into The Lap

Casting lots was an ancient method like rolling dice to decide something.

People sometimes cast lots into the fold of a garment, then drew one out.

This method was used to settle decisions that felt too close to call.

The outcome looked random to everyone watching it happen.

🎲 Casting lots worked like rolling dice

👘 Lots were cast into a garment's fold

🤷 It settled decisions too close to call

📖 The outcome looked random to onlookers

## 🙌 But The Whole Disposing Thereof Is Of The LORD

"Disposing" means the actual deciding of how something turns out.

What looked like pure chance is claimed here as fully under God's control.

This verse closes the chapter the same way it opened, with God behind the outcome.

Nothing, not even a roll of the dice, sits outside His authority.

🙌 Disposing means the actual deciding of outcomes

🎯 What looks like chance is under God's control

🔁 This closes the chapter the way it opened

📖 Nothing sits outside God's authority
`.trim();

export const PROVERBS_SIXTEEN_PERSONAL_SECTIONS = parseProverbsSixteenRawNotes(PROVERBS_SIXTEEN_RAW_NOTES);
