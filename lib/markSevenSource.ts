export type MarkSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkSevenRawNotes(rawText: string): MarkSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 7:${startVerse}` : `Mark 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Mark 7 sections, received " + sections.length);
  }

  return sections;
}

const MARK_SEVEN_RAW_NOTES = `# Mark 7:1-8
# 🧼 Tradition Over Truth
---
## 🕍 Certain Of The Scribes, Which Came From Jerusalem

Jerusalem sat many miles south of where Jesus was teaching in Galilee.

This group did not simply happen to be passing through.

Scribes from the capital rarely traveled this far without a specific reason.

Their arrival signals an organized effort to examine Jesus directly.

🕍 Jerusalem was the religious capital, far south
🚶 This was a long trip, not a visit
🔍 Scribes came with a specific purpose
📖 An organized inspection has begun

---
## 🧼 Eat Bread With Defiled, That Is To Say, With Unwashen Hands

"Defiled" here does not mean physically dirty.

It means ceremonially unclean under Jewish purity custom.

Washing hands before meals was never commanded in the law of Moses itself.

It had grown into a strict, added custom over time.

🧼 Defiled means ceremonially unclean here
📜 Moses never commanded this washing
➕ The custom grew over time
📖 They came looking to accuse him

---
## 📜 Except They Wash Their Hands Oft, Holding The Tradition Of The Elders

"Tradition of the elders" means rules Jewish teachers added over the centuries.

These rules were never part of the written law God gave Moses.

Over time many people treated them as equally binding.

Jesus is about to challenge that assumption directly.

📜 Tradition of the elders means added rules
✍️ These rules were not in the written law
⚖️ People treated them as equally binding
📖 Jesus challenges that assumption next

---
## 🏪 When They Come From The Market, Except They Wash, They Eat Not

The marketplace meant contact with many different people and goods.

Anyone or anything there might carry ceremonial uncleanness without anyone noticing.

So an extra washing was required on top of the washing before meals.

This shows how far the system had expanded beyond its original concern.

🏪 The market meant contact with many people
🧼 Extra washing followed any market visit
📈 The system kept expanding over time
📖 Caution multiplied far beyond the concern

---
## 🫙 The Washing Of Cups, And Pots, Brasen Vessels, And Of Tables

This tradition reached far beyond human hands.

Even cups, pots, and bronze vessels needed ritual washing before reuse.

"Brasen" simply means made of bronze or brass.

The system had grown large enough to touch almost every object in a home.

🧽 Washing reached far beyond hands
🫙 Cups, pots, and bronze vessels were included
🏠 Almost every object was covered
📖 The system had grown enormously

---
## ❓ Why Walk Not Thy Disciples According To The Tradition Of The Elders

This question sounds like genuine curiosity.

It is really an accusation dressed as a question.

The Pharisees frame their complaint entirely around tradition, not around God's actual law.

That distinction becomes the whole point of Jesus's answer.

❓ The question hides an accusation
⚖️ It is framed around tradition, not law
🎯 That gap becomes the whole point
📖 Jesus is about to expose it

---
## 🎭 Well Hath Esaias Prophesied Of You Hypocrites

"Esaias" is simply the Greek form of the name Isaiah.

Jesus quotes a line Isaiah wrote centuries earlier, from Isaiah chapter twenty nine.

A "hypocrite" originally meant an actor who wore a mask on stage.

Jesus uses the word for people whose outward show covers a very different inside.

📜 Esaias is the Greek form of Isaiah
📖 Jesus quotes an old prophecy exactly
🎭 Hypocrite originally meant a masked actor
➡️ Their outward show hides their real inside

---
## 👄 This People Honoureth Me With Their Lips, But Their Heart Is Far From Me

Lips can produce the right words without any real feeling behind them.

"Heart" here means a person's true inner will, not just emotion.

Isaiah first said this about Israelites in his own day.

Jesus applies the exact same gap to the religious leaders in front of him now.

👄 Lips can say the right words
🫀 Heart means true inner will
🔁 Isaiah first said this long ago
📖 Jesus applies it to the leaders now

---
## 💨 In Vain Do They Worship Me, Teaching For Doctrines The Commandments Of Men

"Vain" here means empty and without real effect.

Worship cannot run on human rules alone, no matter how sincere it feels.

"Doctrines" simply means teachings, things presented as settled truth.

Human rules were being taught as if they carried God's own authority.

💨 Vain means empty and worthless
🙏 Worship cannot run on human rules alone
📚 Doctrines simply means teachings
📖 Human rules were taught as if divine

---
## ⚖️ Laying Aside The Commandment Of God, Ye Hold The Tradition Of Men

Jesus names the trade plainly, without any softening.

God's actual commandment gets set aside first.

A human tradition then takes its place in importance.

This single trade sits underneath everything wrong in this whole scene.

⚖️ God's command gets set aside first
🔄 A human tradition replaces it
🎯 This is the root problem here
📖 Everything else in the scene flows from this

# Mark 7:9-13
# 🎁 The Corban Trick
---
## 🎯 Full Well Ye Reject The Commandment Of God, That Ye May Keep Your Own Tradition

Jesus restates the problem even more sharply than before.

"Full well" means they do this knowingly, not by accident.

Keeping their tradition requires actively rejecting God's own command.

The two cannot be held together, whatever they tell themselves.

🎯 Full well means this is done knowingly
⚖️ Tradition and command cannot both stand
🚫 Keeping one requires rejecting the other
📖 They chose tradition over God's own word

---
## 📜 For Moses Said, Honour Thy Father And Thy Mother

This command comes straight from the Ten Commandments, given through Moses.

"Honour" means far more than simple politeness.

It includes caring for parents practically as they grow older.

Jesus starts with the actual law before showing how it gets broken.

📜 This is one of the Ten Commandments
❤️ Honour means real care, not just politeness
👴 It includes caring for aging parents
📖 Jesus starts with the real law first

---
## ⚰️ Whoso Curseth Father Or Mother, Let Him Die The Death

This second line also comes from the law, naming a severe penalty.

"Curseth" here means a deliberate, hostile attack on a parent, not a moment of anger.

The law treated the parent relationship as serious enough for a death penalty.

Jesus is building toward just how seriously God takes this command.

⚖️ This penalty also comes from the law
😠 Curseth means a deliberate, hostile attack
⚰️ The law treated this with extreme seriousness
📖 God takes the parent command seriously

---
## 🏛️ If A Man Shall Say To His Father Or Mother, It Is Corban

"Corban" means a gift formally dedicated to God.

Once something was declared Corban, religious teachers treated it as off limits for others.

A son could say his money was Corban and still benefit from it himself.

The label let him dodge helping his own parents while sounding religious about it.

🏛️ Corban means a gift dedicated to God
🚫 Declared property became off limits for others
😏 A son could still benefit from it
📖 Religious language hid an unkind choice

---
## 📝 That Is To Say, A Gift, By Whatsoever Thou Mightest Be Profited By Me

Mark pauses to translate the Aramaic word for his readers.

The phrase describes exactly what gets withheld from a parent under this rule.

Verse twelve shows the result plainly.

The son is let off the hook.

A clever religious word trumped a direct command from God.

📝 Mark translates the word for readers
🙅 It describes what gets withheld from parents
✅ The son is let off the hook
📖 A clever word beat a direct command

---
## 👴 Ye Suffer Him No More To Do Ought For His Father Or His Mother

"Suffer" here means allow or permit, not pain.

Teachers of the law actually permitted this excuse once it was declared.

A son could stop helping his own aging parents and call it devotion to God.

The rule meant to protect God's honour ended up protecting selfishness instead.

✅ Suffer here means allow, not pain
👴 Parents could be left without real help
🙏 It was dressed up as devotion
📖 A rule meant for God protected selfishness

---
## ❌ Making The Word Of God Of None Effect Through Your Tradition

"Of none effect" means completely cancelled out.

It is treated as if it had never been said at all.

Human tradition was not just competing with God's word here.

It was actively overriding it, case by case.

Jesus names exactly how high the stakes of this practice really were.

❌ None effect means completely cancelled out
⚖️ Tradition was overriding, not just competing
📈 This happened case by case
📖 The real stakes were finally named

---
## 🔁 Many Such Like Things Do Ye

Jesus makes clear the Corban trick was not an isolated case.

Other traditions were almost certainly working the very same way.

This single example exposes a pattern, not a one time problem.

The real issue was a whole system built to get around God's word.

🔁 Corban was not an isolated case
📚 Other traditions likely worked the same way
🧩 One example exposed a wider pattern
📖 The system itself was the problem

# Mark 7:14-16
# 👂 Ears To Hear
---
## 👥 Called All The People Unto Him

Jesus shifts his attention from the religious leaders to the crowd.

What he is about to say was never meant to stay private.

He wants everyone listening to hear this teaching directly from him.

The next words carry weight for every single person present.

👥 Jesus turns toward the whole crowd
🗣️ This teaching was never meant to stay private
🎯 He wants everyone to hear it directly
📖 The next words carry real weight

---
## 👂 Hearken Unto Me Every One Of You, And Understand

"Hearken" means more than simply hearing sound.

It means paying close, careful attention to what follows.

Jesus adds "understand" because this teaching is easy to hear and still miss.

He signals that something important is about to be said plainly.

👂 Hearken means paying close attention
🧠 Understand means grasping it, not just hearing
⚠️ This teaching is easy to miss
📖 Jesus signals something important is coming

---
## 🚪 Nothing From Without A Man, That Entering Into Him Can Defile Him

This statement overturns a whole way of thinking about purity.

Jewish tradition had built an entire system around outside contact causing uncleanness.

Jesus says plainly that nothing entering from outside can make a person unclean.

This single sentence quietly reshapes the earlier argument from this chapter.

🔄 This overturns the old purity system
🚪 Outside contact cannot make someone unclean
💥 It reshapes the earlier argument completely
📖 A whole system is quietly undone

---
## 🫀 The Things Which Come Out Of Him, Those Are They That Defile The Man

Jesus flips the direction of the whole problem.

Defilement does not come from the outside world pressing in.

It comes from what a person actually produces from within.

The real battle for purity happens inside a person, not outside of them.

🔄 The direction of the problem gets flipped
🫀 Defilement comes from within, not outside
⚔️ The real battle is internal
📖 Purity is an inside problem

---
## 🧠 If Any Man Have Ears To Hear, Let Him Hear

Jesus uses this exact phrase at several key moments in his teaching.

It signals that ordinary hearing is not the point.

He is calling for real spiritual understanding, not just working ears.

Anyone willing to actually listen is invited to grasp what just happened.

🔁 Jesus repeats this phrase at key moments
👂 Ordinary hearing is not really the point
🧠 Real spiritual understanding is being asked for
📖 An invitation to grasp the moment

# Mark 7:17-23
# 🫀 What Truly Defiles
---
## 🏠 Entered Into The House From The People

Jesus steps away from the crowd and back into a private space.

This matches the quiet, parable explaining pattern seen earlier in Mark's gospel.

Public teaching now gives way to a smaller, closer conversation.

The disciples get a chance to ask what the crowd could not.

🏠 Jesus steps into a private space
🔁 This matches an earlier pattern in Mark
👥 Public teaching gives way to private talk
📖 The disciples get a closer chance to ask

---
## ❓ His Disciples Asked Him Concerning The Parable

Mark calls this short, blunt saying a "parable."

Here the word simply means a saying that needs further unpacking.

The disciples clearly did not grasp the full meaning on their own.

They come to Jesus privately instead of staying confused in public.

📖 Parable here means a saying needing unpacking
❓ The disciples did not fully grasp it
🤐 They chose to ask privately
➡️ Confusion led them back to Jesus

---
## 😕 Are Ye So Without Understanding Also

Jesus responds with a mild, pointed rebuke.

The word "also" hints that this gap matches the Pharisees he just corrected.

He expected more from the men who travel with him daily.

Closeness to Jesus should have produced more clarity by this point.

😕 Jesus gives a mild, pointed rebuke
🔁 Also links them to the Pharisees moment
🚶 They travel with him every day
📖 Closeness should have brought more clarity

---
## 🍞 Whatsoever Thing From Without Entereth Into The Man, It Cannot Defile Him

Jesus repeats the principle from verse fifteen for his disciples specifically.

Food entering the body physically cannot touch a person's moral center.

This is not a small side comment.

It corrects a huge assumption.

The disciples needed this said twice before it could really land.

🔁 Jesus repeats the principle again
🍞 Food cannot touch a person's moral center
💥 This corrects a huge assumption
📖 It took repeating before it landed

---
## 🚽 It Entereth Not Into His Heart, But Into The Belly, And Goeth Out Into The Draught

"Heart" here stands for a person's inner will, not the emotions alone.

Food never reaches that part of a person at all.

It passes through the stomach and leaves through the "draught," an old word for a latrine.

The whole process stays entirely physical from start to finish.

🫀 Heart means inner will, not emotion
🚫 Food never reaches that part at all
🚽 Draught is an old word for a latrine
📖 The whole process stays entirely physical

---
## 🔄 Purging All Meats

This short phrase carries enormous weight for Jewish readers.

The law of Moses once divided foods into clean and unclean categories.

Jesus quietly says the digestive process treats all food the same way.

Mark's own readers would recognize this as opening a door to a bigger change later in the church.

📜 Old law divided food into clean and unclean
🔄 Digestion treats all food the same way
🚪 This quietly opens a door
📖 A bigger change follows later in the church

---
## 🔁 That Which Cometh Out Of The Man, That Defileth The Man

Jesus restates the real source of defilement one final time.

The repetition itself is a teaching tool, not wasted words.

Three times now the same point has been made from different angles.

By this point the lesson should be impossible to miss.

🔁 Jesus restates the point a third time
🎯 Repetition itself teaches the lesson
🧠 Different angles reinforce the same truth
📖 The point is now impossible to miss

---
## 🫀 For From Within, Out Of The Heart Of Men, Proceed Evil Thoughts

Jesus names the actual source of sin plainly, the human heart.

"Proceed" means these things flow out from a person, like water from a spring.

Evil thoughts come first in the list for a reason.

Every other sin on this list begins as a thought before it becomes an action.

🫀 The heart is named as the real source
💧 Proceed means flowing out, like a spring
💭 Evil thoughts start the whole list
📖 Every sin begins as a thought first

---
## 💔 Adulteries, Fornications, Murders

"Adultery" means a married person being unfaithful to their spouse.

"Fornication" covers sexual sin more broadly, outside of marriage altogether.

"Murder" needs no definition, only the reminder that it begins as a thought too.

Jesus names each one without softening any of them.

💔 Adultery means unfaithfulness within marriage
🚫 Fornication covers broader sexual sin
🗡️ Murder also begins as a thought
📖 None of these are softened here

---
## 💰 Thefts, Covetousness, Wickedness, Deceit, Lasciviousness

"Covetousness" means wanting what belongs to someone else so badly it consumes a person.

"Deceit" means deliberately leading someone else into believing a lie.

"Lasciviousness" means an open, shameless pursuit of sexual pleasure without restraint.

Each word names a different direction the same corrupted heart can take.

💰 Covetousness means consuming desire for another's goods
🎭 Deceit means deliberately leading someone astray
🔥 Lasciviousness means shameless, unrestrained pleasure seeking
📖 One corrupted heart branches many ways

---
## 👁️ An Evil Eye, Blasphemy, Pride, Foolishness

An "evil eye" here means envy, resenting someone else's good fortune.

"Blasphemy" means speaking against God or treating what is holy with contempt.

"Pride" places self above both God and other people.

"Foolishness" in this list means a moral failure, not simply a lack of intelligence.

👁️ Evil eye means envy of others
🗣️ Blasphemy means contempt toward what is holy
👑 Pride places self above God
📖 Foolishness here means a moral failure

---
## 🔁 All These Evil Things Come From Within, And Defile The Man

Mark closes the list with the same point he opened it with.

Every item on this list traces back to the same internal source.

External rules about washed hands never could have prevented any of this.

The real problem, and the real solution, both start inside a person.

🔁 The list closes where it began
🫀 Every item traces to the same source
🧼 Hand washing could never fix this
📖 The real solution starts inside a person

# Mark 7:24-30
# 🐕 Crumbs Under The Table
---
## 🌊 Arose, And Went Into The Borders Of Tyre And Sidon

Tyre and Sidon were old Phoenician port cities north of Galilee.

This region sat outside Jewish territory, filled mostly with Gentile residents.

Jesus deliberately crosses a cultural and religious boundary here.

The story that follows could not happen on the Jewish side of that line.

🌊 Tyre and Sidon were Phoenician port cities
🗺️ The region was mostly Gentile territory
🚶 Jesus crosses that boundary on purpose
📖 What follows needed this exact setting

---
## 🏠 Entered Into An House, And Would Have No Man Know It

Jesus tries once again to find a quiet, private space.

This echoes his earlier attempt at rest earlier in this same chapter.

Fame has followed him even into foreign territory now.

Privacy keeps slipping further out of his reach as this gospel continues.

🏠 Jesus seeks a quiet, private space again
🔁 This echoes an earlier attempt at rest
🌍 His fame reaches foreign territory too
📖 Privacy keeps slipping out of reach

---
## 🙅 He Could Not Be Hid

Jesus wanted to stay unnoticed, but he could not manage it.

His reputation now moves faster than he can travel.

This small detail sets up the woman's ability to find him at all.

Nothing about this meeting with her was planned by Jesus himself.

🙅 Jesus could not stay unnoticed
📢 His reputation now travels ahead of him
🔑 This detail lets the woman find him
📖 Nothing here was planned by Jesus

---
## 👻 A Certain Woman, Whose Young Daughter Had An Unclean Spirit

"Unclean spirit" is Mark's regular term for a demonic presence.

This same term has already appeared earlier in this gospel more than once.

A mother is dealing with something far beyond her own ability to fix.

Desperation is what finally brings her to Jesus at all.

👻 Unclean spirit means a demonic presence
🔁 This term has already appeared before
🙇 A mother faces something beyond her control
📖 Desperation brings her to Jesus

---
## 🙇 The Woman Was A Greek, A Syrophenician By Nation

Falling at someone's feet, as she does first, was a posture of total humility.

"Greek" here simply means she was not Jewish, a Gentile.

"Syrophenician" means a Phoenician living within the Roman province of Syria.

Every detail in this introduction marks her as an outsider to Jesus's own people.

🙇 Falling at his feet showed total humility
🌍 Greek here simply means not Jewish
📍 Syrophenician means Phoenician living in Syria
📖 Every detail marks her as an outsider

---
## 🙏 Besought Him That He Would Cast Forth The Devil Out Of Her Daughter

"Besought" means she begged, repeatedly and earnestly.

A Gentile woman is asking a Jewish teacher for a miracle in his own terms.

She crosses both a religious and a cultural line to make this request.

Her need overrides whatever hesitation that crossing might have caused her.

🙏 Besought means she begged earnestly
🌉 She crosses a real religious and cultural line
❤️ Her need overrides any hesitation
📖 A bold request from an unlikely person

---
## 🐕 Let The Children First Be Filled, For It Is Not Meet To Take The Children's Bread, And To Cast It Unto The Dogs

"Children" here pictures Israel, the family Jesus was first sent to.

"Bread" pictures the ministry and blessing Jesus came to bring.

"Dogs" sounds harsh, but Jesus uses a softer word closer to little house pets.

The saying tests whether she will walk away offended or press in anyway.

👶 Children here pictures the people of Israel
🍞 Bread pictures Jesus's ministry and blessing
🐕 Dogs here means small house pets
📖 The saying tests how she will respond

---
## 🍞 Yet The Dogs Under The Table Eat Of The Children's Crumbs

The woman does not argue against the picture Jesus just gave her.

Instead she accepts it and finds room for herself inside it anyway.

Even crumbs, the smallest leftover scraps, would be enough for what she needs.

Her humility and her faith show up in the very same sentence.

🙇 She accepts the picture instead of arguing
🍞 Crumbs means the smallest leftover scraps
💪 Even scraps would be enough for her
📖 Humility and faith meet in one line

---
## 🏆 For This Saying Go Thy Way, The Devil Is Gone Out Of Thy Daughter

Jesus rewards her sharp, humble answer immediately.

He never travels to see the daughter in person at all.

Distance does not limit what Jesus is able to do here.

Her faith, not her nearness to him, is what moves this miracle forward.

🏆 Jesus rewards her answer right away
🚶 He never travels to see the girl
🌐 Distance does not limit his power
📖 Her faith moves the miracle, not nearness

---
## 🏠 She Found The Devil Gone Out, And Her Daughter Laid Upon The Bed

The woman returns home to find exactly what Jesus promised.

The daughter who was tormented is now simply resting.

No dramatic scene is described, only quiet, finished peace.

This small, foreign household receives the same mercy Jesus gives everywhere else in this gospel.

🏠 She returns home to find it true
😌 The daughter is now simply resting
🤫 The scene ends in quiet peace
📖 A foreign household receives the same mercy

# Mark 7:31-37
# 🗣️ Ephphatha, Be Opened
---
## 🏛️ Departing From The Coasts Of Tyre And Sidon, Through The Midst Of The Coasts Of Decapolis

"Decapolis" means a federation of ten mostly Gentile cities east of the Jordan River.

Jesus takes a long, roundabout route to get back to the Sea of Galilee.

This path keeps him moving through Gentile territory rather than straight home.

His ministry keeps reaching beyond Israel's own borders throughout this whole chapter.

🏛️ Decapolis means ten mostly Gentile cities
🗺️ Jesus takes a long, roundabout route
🌍 He stays in Gentile territory on purpose
📖 His ministry keeps reaching beyond Israel

---
## 👂 One That Was Deaf, And Had An Impediment In His Speech

This man could not hear and also struggled to speak clearly.

The two conditions were almost certainly connected to each other.

A person who has never heard sound usually struggles to form words too.

People bring him specifically because they believe Jesus can help him.

👂 The man could not hear at all
🗣️ He also struggled to speak clearly
🔗 The two conditions were likely connected
📖 People bring him expecting real help

---
## 🤲 They Beseech Him To Put His Hand Upon Him

Touch was a common and expected way to ask for healing in this culture.

The crowd requests something simple and familiar from Jesus.

What Jesus actually does next goes well beyond their simple request.

He meets ordinary faith with an uncommon amount of personal care.

🤲 Touch was a familiar healing request
🙏 The crowd makes a simple request
✨ Jesus does far more than asked
📖 Ordinary faith meets uncommon care

---
## 🚶 He Took Him Aside From The Multitude

Jesus removes this man from the crowd before doing anything else.

A deaf man could easily feel like a public spectacle in front of so many people.

Jesus protects his dignity before he ever touches him.

Compassion shapes the method here just as much as the miracle itself.

🚶 Jesus removes him from the crowd first
🙇 This protects the man's dignity
❤️ Compassion shapes the method, not just the result
📖 Dignity mattered before the miracle did

---
## ✋ Put His Fingers Into His Ears, And He Spit, And Touched His Tongue

Jesus could simply speak a word from a distance, as he has before.

Instead he uses touch the man can actually feel and understand.

Spit was a commonly used substance in ancient healing customs of the time.

Each action points directly at the exact body part that needed healing.

✋ Jesus uses touch instead of only words
👅 Each action points at the exact problem
🧴 Spit was a common ancient healing substance
📖 Jesus meets him where he can feel it

---
## 🙏 Looking Up To Heaven, He Sighed

Jesus pauses to look toward his Father before acting.

"Sighed" describes a deep, groaning breath, not a simple exhale.

This reaction shows how much human brokenness still weighs on him.

Compassion and power move together in this single moment.

🙏 Jesus looks to his Father first
😮‍💨 Sighed means a deep, groaning breath
💔 Brokenness genuinely weighs on him
📖 Compassion and power move together here

---
## 🗣️ Ephphatha, That Is, Be Opened

"Ephphatha" is an Aramaic word, the everyday language Jesus actually spoke.

Mark almost always translates Jesus's words straight into Greek for his readers.

Keeping the original sound here suggests an eyewitness remembered that exact moment.

Many scholars believe Peter's own memory sits behind small details like this one in Mark's gospel.

🗣️ Ephphatha is Jesus's own spoken Aramaic word
📝 Mark usually translates his words completely
👂 Keeping it suggests a real eyewitness memory
📖 Peter's memory likely preserved this detail

---
## ⚡ His Ears Were Opened, And The String Of His Tongue Was Loosed, And He Spake Plain

Both conditions are healed in the very same instant.

"The string of his tongue" pictures whatever had been holding his speech back.

"Spake plain" means his words came out clear, not broken or confused.

Nothing about this healing was partial or gradual.

⚡ Both conditions heal in the same instant
🧵 String of his tongue pictures the blockage
🗣️ Spake plain means clear, understandable speech
📖 This healing was complete, not partial

---
## 🤫 He Charged Them That They Should Tell No Man

Jesus asks for silence here, just as he has at other points in this gospel.

He is not trying to avoid helping people who are suffering.

He seems more concerned with controlling how and when his full identity gets revealed.

Mark keeps returning to this same quiet pattern throughout his gospel.

🤫 Jesus asks for silence again here
❤️ He is not avoiding people in need
⏳ He controls the timing of his reveal
📖 This pattern repeats throughout Mark's gospel

---
## 📢 The More He Charged Them, So Much The More A Great Deal They Published It

The crowd does the exact opposite of what Jesus asked them to do.

Genuine amazement is difficult for most people to keep quiet about.

The harder Jesus pushes for silence, the louder the news actually spreads.

This gentle irony shows up more than once across Mark's gospel.

🙅 The crowd does the opposite instead
😲 Real amazement is hard to keep quiet
📢 Silence requests backfire into louder news
📖 This same irony repeats across Mark

---
## 🎉 He Hath Done All Things Well, He Maketh Both The Deaf To Hear, And The Dumb To Speak

This closing praise echoes an old prophecy from the book of Isaiah.

Isaiah once promised a day when the deaf would hear and the mute would sing.

The crowd may not realize they are quoting Israel's own ancient hope.

Mark closes this whole chapter on the same note he opened it with.

People now respond to who Jesus really is.

📜 This echoes a promise from Isaiah
👂 Isaiah promised the deaf would hear
🎉 The crowd quotes an ancient hope unknowingly
📖 The chapter closes on who Jesus is
`.trim();

export const MARK_SEVEN_PERSONAL_SECTIONS = parseMarkSevenRawNotes(MARK_SEVEN_RAW_NOTES);
