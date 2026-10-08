export type MatthewTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyThreeRawNotes(rawText: string): MatthewTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 23:${startVerse}` : `Matthew 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 23 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_THREE_RAW_NOTES = `# Matthew 23:1-7
# 🪑 Sit In Moses' Seat
---
## 🪑 The Scribes And The Pharisees Sit In Moses' Seat

Moses' seat was a literal stone chair at the front of the synagogue.

Whoever sat there held the recognized authority to read and explain the Law.

Scribes and Pharisees occupied that seat in Jesus's own day.

Jesus does not deny the seat's authority, only how they live inside it.

🪑 Moses' seat was a real, physical chair
📖 Sitting there meant authority to teach the Law
👳 Scribes and Pharisees filled that seat
➡️ Jesus challenges their life, not their office

## ✅ All Therefore Whatsoever They Bid You Observe, That Observe And Do

Jesus tells the crowd to still follow sound teaching from that seat.

Good instruction does not become false just because the teacher fails to live it.

The authority belongs to the office of Moses' seat, not to the person sitting in it.

A flawed messenger does not automatically cancel a true message.

✅ Jesus tells them to keep sound teaching
📖 Truth does not depend on the teacher's life
🪑 Authority belongs to the seat, not the man
➡️ A flawed messenger can still carry truth

## 🗣️ For They Say, And Do Not

This phrase names the exact problem Jesus is about to spend a whole chapter exposing.

Their words and their actual conduct do not match each other.

That mismatch between teaching and living is the chapter's main target.

Everything that follows explains what this gap actually looks like in daily life.

🗣️ Their words and actions do not match
🎯 This gap is the chapter's main target
📋 Everything after this explains the gap
➡️ Teaching and living must line up

## 🎒 They Bind Heavy Burdens And Grievous To Be Borne

Burdens here means extra religious rules piled on top of the Law of Moses.

Scribes had added hundreds of detailed traditions over centuries of interpretation.

Grievous means painfully hard to carry, not just mildly inconvenient.

Ordinary people were left straining under rules God never actually commanded.

🎒 Burdens means added religious rules
📚 Scribes piled on centuries of traditions
😣 Grievous means painfully hard to bear
➡️ People strained under rules God never gave

## ☝️ They Themselves Will Not Move Them With One Of Their Fingers

This idiom pictures someone refusing to lift even the smallest amount of help.

The leaders demand strict obedience while offering no practical relief themselves.

Teaching a rule and helping someone keep it are two very different things.

Their burden making exposes a complete lack of compassion for the people.

☝️ The idiom pictures refusing the smallest help
📢 They demand obedience without offering relief
🤝 Teaching a rule is not helping
➡️ The rule making reveals a lack of compassion

## 👀 But All Their Works They Do For To Be Seen Of Men

Jesus now names the actual motive driving all of their religious behavior.

Every visible act of devotion is aimed at an audience, not at God.

This single motive explains every specific example that follows in this section.

Religious performance done for applause is the target of this whole passage.

👀 Their motive is to be seen
🎭 Devotion becomes a performance for people
🎯 This motive explains everything that follows
➡️ Performance for applause is the real target

## 📦 They Make Broad Their Phylacteries

Phylacteries were small leather boxes holding tiny scrolls of scripture.

Deuteronomy 6:8 commanded Israelites to bind God's words on their hand and forehead.

Faithful Jews wore these boxes literally during prayer, following that command.

Making them unusually broad was not devotion, it was a visible brag.

📦 Phylacteries held tiny scripture scrolls
📖 Commanded in Deuteronomy 6:8
🙏 Worn on the hand and forehead during prayer
➡️ Making them broad turned devotion into a brag

## 🧵 Enlarge The Borders Of Their Garments

The borders were tassels every Israelite was commanded to wear on their garments.

Numbers 15:38 ordered these tassels as a visual reminder to keep God's commands.

Every faithful Jew wore some version of this tassel, not just religious leaders.

Making theirs unusually large turned a shared command into personal advertising.

🧵 Borders means the commanded tassels
📖 Commanded in Numbers 15:38 for all Israel
👥 Every faithful Jew wore some version
➡️ Enlarging theirs turned a command into advertising

## 🍽️ Love The Uppermost Rooms At Feasts, And The Chief Seats In The Synagogues

The uppermost room at a feast sat closest to the host, the most honored spot.

The chief seats in the synagogue faced the congregation, reserved for respected teachers.

Both seats were about visible status, not comfort or convenience.

Loving these seats reveals what they actually wanted out of their religion.

🍽️ The uppermost room sat nearest the host
🪑 Chief seats faced the congregation
👑 Both seats were about visible status
➡️ Their love for status exposes their real goal

## 🗣️ To Be Called Of Men, Rabbi, Rabbi

Rabbi was a title of honor meaning something like my great one or my teacher.

The title is doubled here, Rabbi, Rabbi, to show how much they craved it repeated.

Wanting a title is not sin by itself.

Wanting it for pride is the problem Jesus names.

The craving for recognition had quietly replaced the actual work of teaching.

🗣️ Rabbi meant my great one or my teacher
🔁 Doubling the word shows their craving
💔 Craving the title for pride is the problem
➡️ Recognition had replaced real teaching

# Matthew 23:8-12
# 🙅 But Be Not Ye Called Rabbi
---
## 🙅 But Be Not Ye Called Rabbi

Jesus now turns from the crowd and speaks straight to his own disciples.

He forbids them from seeking the same honored title the religious leaders craved.

This command answers directly to the craving for status just named in verse seven.

What the leaders sought for pride, the disciples are told to refuse.

🙅 Jesus now addresses his own disciples
🎯 He forbids seeking that same honored title
🔁 This answers the craving named in verse seven
➡️ What leaders sought for pride, disciples refuse

## 👑 For One Is Your Master, Even Christ

Master here points to the one true teacher with final authority over truth.

Every other teacher only passes along what ultimately comes from Christ.

No human teacher, however respected, holds that same final place.

This single claim reorders every teacher and disciple relationship that follows.

👑 Master means the teacher with final authority
📖 Every teacher passes along what comes from Christ
🚫 No human holds that same final place
➡️ This claim reorders every teaching relationship

## 🤝 And All Ye Are Brethren

Brethren means brothers, members of one single family under God.

Rank and title fall away the moment this family identity is named.

No disciple stands structurally above another disciple in this new family.

Equality here comes from shared sonship, not from erasing real differences in gift.

🤝 Brethren means brothers in one family
⚖️ Titles and rank fall away here
👥 No disciple stands above another
➡️ Equality flows from shared sonship

## 👨‍👧 Call No Man Your Father Upon The Earth

This is not a command against calling a parent father in daily life.

It forbids treating any human teacher as the ultimate source of spiritual life.

Only God holds that place as the true Father who gives life and truth.

The warning targets misplaced devotion, not ordinary family language.

👨‍👧 Not about ordinary family language
🚫 It forbids ultimate devotion to a human teacher
🙏 Only God holds the place of true Father
➡️ The warning targets misplaced devotion

## 🧭 Neither Be Ye Called Masters

This word points to a guide or director, someone whose lead others simply follow.

It carries a different shade of meaning than the teacher named back in verse eight.

Together the two warnings cover both titles of pure instruction and pure authority.

Christ alone fills both roles completely, so no disciple should claim either one.

🧭 This word points to a guide or director
🔀 A different shade than teacher in verse eight
🧩 Together the warnings cover both kinds of title
➡️ Christ alone fills both roles completely

## 🛠️ He That Is Greatest Among You Shall Be Your Servant

This sentence rewrites what greatness even means inside God's kingdom.

Servant pictures someone who willingly meets another person's needs before their own.

Earthly greatness climbs over others.

This kind of greatness kneels down to help them instead.

Every seat seeking habit named earlier in the chapter gets reversed by this one line.

🛠️ Greatness is redefined here
🙇 Servant means meeting others' needs first
⬇️ Earthly greatness climbs, this greatness kneels
➡️ This line reverses every habit named earlier

## ⚖️ Whosoever Shall Exalt Himself Shall Be Abased

Exalt means to lift oneself up in status or pride.

Abased means brought low, the opposite of whatever status was being sought.

Humble means to lower oneself willingly instead of grasping for status.

This single principle will explain why the Pharisees are about to be confronted so directly.

⚖️ Exalt means lifting oneself up in pride
⬇️ Abased means brought low
🙇 Humble means lowering oneself willingly
➡️ This principle sets up the woes ahead

# Matthew 23:13-15
# 🚪 Shutting The Door On The Kingdom
---
## ⚠️ Woe Unto You, Scribes And Pharisees, Hypocrites

Woe is a cry of coming judgment, not simply a harsh insult.

Hypocrite originally described an actor performing behind a mask on a stage.

This exact phrase now repeats again and again through the rest of this chapter.

Jesus is naming a pattern, not venting a single moment of anger.

⚠️ Woe announces coming judgment
🎭 Hypocrite meant a masked stage actor
🔁 This phrase repeats through the chapter
➡️ Jesus names a pattern, not a mood

## 🚪 Ye Shut Up The Kingdom Of Heaven Against Men

Their teaching was meant to open the way into God's kingdom for people.

Instead their added rules and example blocked the entrance they were supposed to guard.

A locked door is the opposite of what a true teacher of God's Law should provide.

The very people meant to guide others in were keeping them out.

🚪 Their role was to open the way in
🔒 Their teaching blocked it instead
📖 Teachers should guide people in, not out
➡️ The guides became the gatekeepers who locked it

## 🙅 Neither Go In Yourselves, Neither Suffer Them That Are Entering To Go In

This names a double failure happening at the same time.

They themselves never enter the kingdom through genuine faith.

They also actively stop anyone else who tries to enter it.

Suffer here means allow, an old use of the word with no suffering involved.

🙅 A double failure, not just one
🚫 They themselves never truly enter
🛑 They stop others trying to enter too
➡️ Suffer here simply means allow

## 🏚️ Ye Devour Widows' Houses

Widows in this culture often had no legal protection managing their own property.

Some religious leaders served as trusted managers of a widow's estate or finances.

Devour pictures those leaders consuming her resources instead of protecting them.

The most vulnerable people were being exploited by the very leaders meant to shield them.

🏚️ Widows had little legal protection
📋 Leaders sometimes managed a widow's estate
😈 Devour means consuming her resources
➡️ The vulnerable were exploited by their protectors

## 🙏 For A Pretence Make Long Prayer

Pretence means a false show put on to hide a true motive.

Long public prayer was used here as a cover for financial exploitation.

The longer and more impressive the prayer, the more trustworthy they appeared.

Religious performance was hiding the exact opposite of what it displayed.

🙏 Pretence means a false show
💰 Long prayer covered financial exploitation
👀 Performance built false trust
➡️ The display hid its own opposite

## ⚖️ Therefore Ye Shall Receive The Greater Damnation

Damnation here means a sentence of judgment, not merely disapproval.

Greater means their judgment will be heavier than an ordinary sinner's.

Using religious trust to harm vulnerable people carries extra weight before God.

Position and knowledge raise responsibility rather than lowering it.

⚖️ Damnation means a sentence of judgment
📈 Greater means a heavier judgment
🏚️ Harming the vulnerable adds weight
➡️ More knowledge means more responsibility

## 🌊 Ye Compass Sea And Land To Make One Proselyte

Proselyte means a Gentile convert won over fully to the Jewish faith.

Compass sea and land is an idiom for traveling great distances with great effort.

Missionary zeal itself is not the problem Jesus names here.

The problem is what that convert gets taught once they finally arrive.

🌊 Compass sea and land means traveling far
🧑‍🤝‍🧑 Proselyte means a convert to the faith
✅ The zeal itself is not the problem
➡️ What the convert is taught is the problem

## 👹 Ye Make Him Twofold More The Child Of Hell Than Yourselves

Child of hell is a Hebrew style idiom describing someone marked for that fate.

Twofold means the new convert ends up worse than the very teachers who trained him.

A student can absorb a teacher's hypocrisy and perform it even more extremely.

The mission produced more of the exact problem the chapter has been exposing.

👹 Child of hell marks someone for that fate
📈 Twofold means worse than the teacher
🎓 Students can out perform a teacher's hypocrisy
➡️ The mission multiplied the very problem itself

# Matthew 23:16-22
# 🙄 Blind Guides And Broken Oaths
---
## 🙈 Ye Blind Guides

Blind here does not mean a physical condition, it means a spiritual failure to see truth.

A guide is supposed to lead others safely, which makes blindness in a guide especially dangerous.

This exact phrase, blind guides, becomes the repeated label for the rest of this section.

Leaders charged with seeing clearly have instead lost their own way.

🙈 Blind means a spiritual failure to see
🧭 A guide is meant to lead safely
🔁 This label repeats through the section
➡️ Leaders lost their own way

## 💍 Whosoever Shall Swear By The Temple, It Is Nothing

Scribes had built an entire system ranking which oaths actually had to be kept.

Swearing by the temple itself was treated as a loophole, not truly binding.

People could make a promise this way.

Then quietly plan an escape from it.

An oath that does not bind is not really an oath at all.

💍 Scribes ranked which oaths must be kept
🕳️ Swearing by the temple was a loophole
🤥 It allowed quietly breaking a promise
➡️ A non binding oath is not an oath

## 💰 Swear By The Gold Of The Temple, He Is A Debtor

Debtor here means legally bound, obligated to follow through.

Under their system, invoking the gold made an oath fully binding.

Invoking the building that held the gold did not count the same way.

The rule valued the object that glittered over the place that made it holy.

💰 Debtor means legally bound
🏛️ Invoking the gold was treated as binding
🏗️ Invoking the building was not
➡️ The rule prized gold over holiness

## 🙄 Ye Fools And Blind: Whether Is Greater, The Gold, Or The Temple

Jesus flips their own ranking system back on them directly.

The temple itself is what makes gold inside it sacred in the first place.

Something cannot be greater than the very thing that gives it its value.

Their entire oath system is built backward from the start.

🙄 Jesus flips their ranking back on them
🏛️ The temple makes the gold sacred
⚖️ Nothing outranks its own source of value
➡️ Their whole system runs backward

## 🐑 Whosoever Sweareth By The Gift That Is Upon It, He Is Guilty

The same loophole system applied to the altar and whatever gift sat on it.

Guilty here again means legally bound by that particular oath.

Swearing by the altar itself was treated as empty.

The gift placed on it was treated as binding instead.

The pattern from the temple and gold repeats here with the altar and gift.

🐑 The same loophole applied to the altar
⚖️ Guilty means legally bound
🎁 The gift was binding, the altar was not
➡️ The same backward pattern repeats

## 🙄 Ye Fools And Blind: Whether Is Greater, The Gift, Or The Altar

The altar is what makes any gift placed on it acceptable and holy.

Jesus repeats his exact argument from the gold and temple here.

A system built on this kind of reversal cannot be trusted in any of its details.

Calling them fools matches the plain backward logic they were actually teaching.

🙄 The altar makes the gift holy
🔁 The same argument repeats here
🧩 The whole system reverses true value
➡️ Fools matches their backward logic

## 🔗 Whoso Shall Swear By The Altar, Sweareth By It, And By All Things Thereon

Here Jesus finally states his own actual teaching plainly.

An oath by the altar automatically includes everything connected to that altar.

Nothing in an oath can be cleanly separated from what stands behind it.

Clever technical wording cannot shrink what a promise actually commits a person to.

🔗 Jesus states his own teaching here
🧩 An oath includes everything connected to it
🚫 Nothing separates cleanly from what backs it
➡️ Clever wording cannot shrink a promise

## 🏛️ Whoso Shall Swear By The Temple, Sweareth By It, And By Him That Dwelleth Therein

God's own presence was understood to fill the temple itself.

Swearing by the building was never actually separate from swearing by God.

Their loophole tried to invoke a place while dodging the God inside it.

That separation was never real to begin with.

🏛️ God's presence filled the temple
🙏 Swearing by it meant swearing by God
🕳️ The loophole tried to dodge that
➡️ The separation was never real

## ⭐ He That Shall Swear By Heaven, Sweareth By The Throne Of God

Heaven in this culture was pictured as the location of God's own throne.

Invoking heaven invokes the one who sits on that throne directly.

Every version of their loophole system collapses under this same logic.

There was never a safe, lesser thing to swear by instead of God himself.

⭐ Heaven was pictured as God's throne room
👑 Invoking heaven invokes the one on the throne
🧩 Every loophole collapses under this logic
➡️ No lesser thing existed to swear by

# Matthew 23:23-24
# 🐫 Gnats And Camels
---
## 🌿 Ye Pay Tithe Of Mint And Anise And Cummin

Tithe means giving one tenth of something as an offering to God.

Mint, anise, and cummin were small, common garden herbs, not major crops.

The Law never actually required tithing herbs this small and specific.

Their precision here shows exactly how far they stretched religious duty.

🌿 Tithe means giving one tenth
🌱 Mint, anise, cummin were small garden herbs
📏 The Law never required this level of precision
➡️ Their precision reveals how far they stretched duty

## ⚖️ Have Omitted The Weightier Matters Of The Law, Judgment, Mercy, And Faith

Weightier matters means the parts of God's Law that carry the most moral weight.

Judgment here means practicing real justice toward other people.

Mercy means showing compassion, and faith means genuine faithfulness toward God.

These three outweigh a thousand herb tithes, and they had been set aside.

⚖️ Weightier matters carry the most moral weight
👨‍⚖️ Judgment means practicing real justice
💗 Mercy means compassion, faith means faithfulness
➡️ These outweigh a thousand herb tithes

## ✅ These Ought Ye To Have Done, And Not To Leave The Other Undone

Jesus is not condemning tithing small herbs as wrong in itself.

The small religious duty was never the real problem here.

Neglecting the weightier matters entirely was the real problem.

Both matter, but not equally.

Real obedience holds the weighty things and the small things together.

✅ Tithing herbs itself is not condemned
🎯 Neglecting the large things is condemned
⚖️ Both matter, but not equally
➡️ Real obedience holds both together

## 🐫 Strain At A Gnat, And Swallow A Camel

Both the gnat and the camel were considered ritually unclean animals under the Law.

Straining a drink to filter out a tiny gnat shows extreme, careful caution.

Swallowing an entire camel whole pictures a wildly exaggerated opposite failure.

The image mocks obsessing over tiny rules while missing an enormous one entirely.

🐫 Gnats and camels were both unclean
🔍 Straining a gnat shows extreme caution
😳 Swallowing a camel is wildly exaggerated
➡️ Tiny rule obsession misses the big picture

# Matthew 23:25-28
# ⚰️ Whitewashed Tombs
---
## 🍷 Ye Make Clean The Outside Of The Cup And Of The Platter

Jewish ritual law required certain washing to keep vessels ceremonially clean.

Scribes and Pharisees were careful to scrub every visible surface of their dishes.

This image pictures a wider pattern of caring only about what others can see.

Visible cleanliness had quietly become the whole point instead of a side effect.

🍷 Ritual law required washing vessels
🧼 They scrubbed every visible surface
👀 This pictures caring only what others see
➡️ Visible cleanliness became the whole point

## 💰 Within They Are Full Of Extortion And Excess

Extortion means taking something from someone through pressure or greed.

Excess means self indulgence, taking more than a person actually needs.

Both sins happen on the inside, invisible to anyone just glancing at the surface.

The same hands that scrubbed the cup clean were the hands doing the taking.

💰 Extortion means taking through greed
🍾 Excess means self indulgence
🙈 Both sins stayed hidden inside
➡️ The scrubbing hands were the taking hands

## 🔄 Cleanse First That Which Is Within The Cup And Platter

Jesus names the correct order his listeners had reversed.

Inner change was always meant to come first.

Real outer change was always meant to follow after it.

Scrubbing only the outside never actually fixes what is inside.

True cleanliness starts in the heart and works its way outward from there.

🔄 Jesus corrects the order they reversed
🫀 Inner change should come first
🙈 Outside scrubbing never fixes the inside
➡️ True cleanliness starts in the heart

## ⚰️ Whited Sepulchres

Sepulchres were tombs, often carved into rock or built above ground.

Before Passover, tombs near Jerusalem were whitewashed a bright, visible white.

That whitewashing warned pilgrims not to touch the tomb and become ceremonially unclean.

The paint made something connected to death look clean and even beautiful.

⚰️ Sepulchres were tombs
🎨 They were whitewashed before Passover
⚠️ The paint warned pilgrims away from touching
➡️ Paint made death look clean and beautiful

## 💀 Full Of Dead Men's Bones, And Of All Uncleanness

The whitewashed outside of a tomb never changed what filled it inside.

Bones and decay remained exactly where they always were, just out of sight.

Uncleanness here carries real ceremonial weight under the Law, not just an unpleasant feeling.

Beauty on the surface did nothing to change the reality underneath it.

💀 The outside paint changed nothing inside
🦴 Bones and decay stayed hidden, not gone
📖 Uncleanness carried real ceremonial weight
➡️ Surface beauty did not change the reality

## 🎭 Outwardly Appear Righteous Unto Men, But Within Ye Are Full Of Hypocrisy And Iniquity

Jesus now applies the tomb image directly to the leaders themselves.

Outward righteousness here means a convincing performance of holiness for an audience.

Iniquity means sin and injustice, the exact opposite of what their appearance suggested.

The whitewashed tomb was never really about tombs, it was always about them.

🎭 Jesus applies the image to them directly
👀 Outward righteousness was a performance
⚖️ Iniquity means sin and injustice
➡️ The tomb image was always about them

# Matthew 23:29-33
# 🐍 Generation Of Vipers
---
## 🪦 Ye Build The Tombs Of The Prophets, And Garnish The Sepulchres Of The Righteous

Garnish means to decorate or beautify something visibly.

Building memorials for dead prophets was treated as an act of honor and piety.

These are the very same prophets earlier generations rejected and killed.

Honoring dead messengers is far easier than listening to a living one.

🪦 Garnish means to decorate visibly
🏗️ Building tombs was treated as honor
💀 These prophets had been rejected and killed
➡️ Dead messengers are easier to honor

## 🙅 We Would Not Have Been Partakers With Them In The Blood Of The Prophets

Partakers means sharing responsibility for an action, not just witnessing it.

The leaders claim they would have acted differently than their violent ancestors.

This claim sounds humble, but Jesus is about to expose it as false.

Distancing yourself from a past sin in words does not undo the same pattern repeating now.

🙅 Partakers means sharing responsibility
🗣️ They claim they would have acted differently
🎭 The claim sounds humble but is false
➡️ Words do not undo a repeating pattern

## 👪 Ye Be Witnesses Unto Yourselves, That Ye Are The Children Of Them Which Killed The Prophets

Jesus flips their own defense into an accidental confession.

Calling the prophets their fathers admits a shared identity with the killers.

Children here means more than bloodline, it means sharing the same pattern of behavior.

Their own words testify against them without Jesus needing to add anything.

👪 Jesus flips their defense into a confession
🩸 Calling them fathers admits shared identity
🔁 Children here means a shared pattern
➡️ Their own words testify against them

## 📏 Fill Ye Up Then The Measure Of Your Fathers

Measure pictures sin collecting like liquid poured into a container with a limit.

Earlier generations already poured a great deal of violence into that same container.

Jesus tells them plainly to go ahead and finish filling it completely.

This chillingly predicts what they are about to do to Jesus himself and his followers.

📏 Measure pictures sin filling a container
🩸 Earlier generations already filled it partway
⚠️ Jesus tells them to go ahead and finish
➡️ This predicts what happens to Jesus next

## 🐍 Ye Serpents, Ye Generation Of Vipers

This exact label was first used by John the Baptist back in chapter three.

Serpents and vipers picture something cunning, poisonous, and dangerous to approach.

The label names their true nature underneath the respectable religious appearance.

Jesus had already warned about this same danger from the very start of his ministry.

🐍 First used by John the Baptist earlier
☠️ Vipers picture something cunning and dangerous
🎭 The label names their true nature
➡️ This warning started at the ministry's beginning

## 🔥 How Can Ye Escape The Damnation Of Hell

This question expects the answer no, not an actual search for an escape route.

Hell here translates Gehenna, a real valley just outside Jerusalem's walls.

That valley had a long history connected to idol worship and later became a burning garbage site.

Jesus uses a place his listeners knew well to picture a judgment that is just as real.

🔥 The question expects the answer no
📍 Hell translates Gehenna, a real valley
🗑️ That valley later became a burning garbage site
➡️ A familiar place pictures a real judgment

# Matthew 23:34-36
# 🩸 The Blood Of The Prophets
---
## 📨 Behold, I Send Unto You Prophets, And Wise Men, And Scribes

Jesus speaks here in the first person as the one doing the sending.

Only God sends prophets across history in the Old Testament pattern Jesus is drawing on.

This claim quietly places Jesus in God's own role as the sender of messengers.

The messengers he is about to send include his own apostles and the early church.

📨 Jesus speaks as the one sending messengers
📖 Only God sends prophets in that pattern
👑 This claim places Jesus in God's role
➡️ These messengers include the apostles ahead

## ⚔️ Some Of Them Ye Shall Kill And Crucify, And Some Shall Ye Scourge In Your Synagogues

Scourge means a severe public whipping, a real legal punishment under Jewish law.

Jesus predicts his own followers will face this exact treatment after he is gone.

The book of Acts later records apostles facing trial, flogging, and execution for this message.

This prediction comes true in specific, traceable detail within a single generation.

⚔️ Scourge means a severe public whipping
📖 Jesus predicts followers will face this
📜 Acts records this treatment of the apostles
➡️ The prediction comes true within a generation

## 🩸 From The Blood Of Righteous Abel Unto The Blood Of Zacharias Son Of Barachias

Abel was the first righteous person murdered in all of scripture, back in Genesis.

In the Jewish ordering of the Old Testament, Chronicles stands as the very last book.

A Zechariah killed in the temple court appears near the end of that final book.

Jesus spans the entire Hebrew Bible, first murder to last, in one single sentence.

🩸 Abel was the first righteous murder victim
📖 Chronicles was the last book in that order
⚰️ A Zechariah was killed in the temple court
➡️ Jesus spans the whole Hebrew Bible at once

## 🏛️ Whom Ye Slew Between The Temple And The Altar

This location detail is not incidental, it names the holiest ground in Israel.

A righteous man's blood was shed in the very place meant for worship and atonement.

The location makes the crime far worse than an ordinary act of violence.

Even sacred ground could not stop this pattern of rejecting God's messengers.

🏛️ The holiest ground in Israel
🩸 A righteous man's blood shed there
⚠️ The location makes the crime worse
➡️ Sacred ground did not stop the pattern

## ⏳ All These Things Shall Come Upon This Generation

Verily is an old way of saying truly, used to stress total certainty.

This generation means the specific people alive and listening to Jesus that day.

Jerusalem's destruction about forty years later brought devastating judgment on that very generation.

Accumulated guilt across centuries finally came due within a single lifetime.

⏳ Verily means truly, with full certainty
👥 This generation means his actual listeners
🏛️ Jerusalem's fall came about forty years later
➡️ Centuries of guilt came due in one lifetime

# Matthew 23:37-39
# 😢 O Jerusalem, Jerusalem
---
## 😢 O Jerusalem, Jerusalem

Repeating a name twice in this way signals deep personal grief, not anger.

The tone shifts here from confrontation into open sorrow and lament.

Jesus has just finished naming centuries of hardened rejection in the woes before this.

Underneath the warnings the whole time was genuine heartbreak over the city.

😢 Doubling the name signals deep grief
🔄 The tone shifts from confrontation to sorrow
📜 This follows centuries of rejection just named
➡️ Heartbreak was underneath the warnings all along

## 🪨 Thou That Killest The Prophets, And Stonest Them Which Are Sent Unto Thee

Stoning was a real, commonly used method of execution in this culture.

Jesus names a long historical pattern stretching across the entire Old Testament.

Jerusalem stands here for the nation's leadership across many generations, not one person.

This same pattern is about to repeat one final time with Jesus himself.

🪨 Stoning was a real method of execution
📜 Jesus names a pattern across the Old Testament
🏛️ Jerusalem stands for generations of leadership
➡️ The same pattern repeats with Jesus next

## 🐔 How Often Would I Have Gathered Thy Children Together, Even As A Hen Gathereth Her Chickens Under Her Wings

A hen spreads her wings to physically shelter her chicks from danger overhead.

Would here shows a strong, repeated desire, not a single passing offer.

This tender, maternal image is a striking way for Jesus to describe his own care.

The desire to protect was real and repeated across Jerusalem's whole history.

🐔 A hen shelters her chicks under her wings
💗 Would shows a strong, repeated desire
🤱 A tender image for Jesus's own care
➡️ The desire to protect was real and repeated

## 🚫 And Ye Would Not

This short phrase names the actual obstacle plainly.

The failure here is human refusal, not any lack of divine desire or effort.

God's willingness to gather them never wavered across all that history.

Free will is what finally blocked what love had repeatedly offered.

🚫 Names the real obstacle plainly
🙅 The failure is human refusal, not God's
💗 God's willingness never wavered
➡️ Free will blocked what love offered

## 🏚️ Your House Is Left Unto You Desolate

House here most likely refers to the temple, the center of the city's worship.

Desolate means abandoned and empty, stripped of what once filled it with life.

This echoes an old pattern in scripture of God's presence withdrawing from an unfaithful temple.

The building would remain standing, but its true life and presence were departing.

🏚️ House likely means the temple
🫥 Desolate means abandoned and empty
📖 Echoes God's presence once withdrawing before
➡️ The building stands, but the presence leaves

## 👑 Ye Shall Not See Me Henceforth, Till Ye Shall Say, Blessed Is He That Cometh In The Name Of The Lord

Henceforth means from this point forward, starting now.

This exact line was shouted at Jesus just days earlier during his entry into the city.

It comes from Psalm 118, a song Jewish pilgrims already knew well.

Jesus says the crowd will not say this again about him until some future moment.

The chapter ends in judgment, but it does not end without hope.

👑 Henceforth means from this point forward
📣 Shouted at Jesus just days earlier
📖 Quoted from Psalm 118
➡️ Judgment closes, but hope remains
`.trim();

export const MATTHEW_TWENTY_THREE_PERSONAL_SECTIONS = parseMatthewTwentyThreeRawNotes(MATTHEW_TWENTY_THREE_RAW_NOTES);
