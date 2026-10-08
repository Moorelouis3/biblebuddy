export type MatthewFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewFifteenRawNotes(rawText: string): MatthewFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 15:${startVerse}` : `Matthew 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 15 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_FIFTEEN_RAW_NOTES = `# Matthew 15:1-6
# 🏛️ Tradition Versus The Commandment
---
## 🕍 Scribes And Pharisees, Which Were Of Jerusalem

Scribes were trained experts who copied and explained the Law for a living.

Pharisees were a strict religious group devoted to keeping every detail of that Law.

Both groups normally worked closer to home, among their own local communities.

This delegation had traveled all the way from Jerusalem, the center of religious authority.

That distance shows how closely the leaders in the capital were already watching Jesus.

🕍 Scribes explained the Law professionally

📜 Pharisees followed every detail strictly

🚶 This group came from Jerusalem

📖 Jerusalem's leaders were watching Jesus

## 🧼 Transgress The Tradition Of The Elders

"Transgress" means to break a rule or step over a line that was set.

The "tradition of the elders" was never part of the written Law of Moses.

It grew over time as a long spoken list of extra rules added by teachers.

Washing hands a certain way before eating had become one of those added rules.

The disciples were accused of breaking a human custom, not an actual command from God.

🧼 Transgress means breaking a rule

📚 Tradition of elders was unwritten

🙌 Hand washing was an added custom

📖 A human custom, not God's command

## ❓ Why Do Ye Also Transgress The Commandment Of God By Your Tradition

Jesus does not defend his disciples first.

He answers one accusation with a bigger one of his own.

The Pharisees guarded small human customs while quietly ignoring God's actual commands.

Jesus is about to prove that claim with one specific example.

❓ Jesus answers with a question

⚖️ He turns the charge around

🙈 Pharisees ignored God's real commands

📖 One example is coming next

## 👪 Honour Thy Father And Mother

This command comes straight from the Ten Commandments given through Moses.

It is paired here with another command, that cursing a parent brought the death penalty.

Together they show how seriously God took the care of elderly parents.

Jesus picks this exact command because the Pharisees had found a clever way around it.

👪 This is one of the Ten Commandments

⚖️ Cursing a parent brought the death penalty

🙏 God valued caring for parents highly

📖 Jesus is about to expose a loophole

## 🎁 It Is A Gift, By Whatsoever Thou Mightest Be Profited By Me

This is the loophole Jesus has in mind.

A person could formally dedicate money or property to God as a gift.

Once dedicated that way, the money was legally off limits for any other use.

The Gospel of Mark names this exact kind of vow Corban.

Someone could use this vow to avoid ever supporting their own aging parents.

🎁 A gift vow dedicated money to God

🔒 Dedicated money became legally off limits

📜 Mark calls this same vow Corban

📖 The vow excused neglecting parents

## 🙅 Made The Commandment Of God Of None Effect By Your Tradition

"Of none effect" means the command was made powerless, as if it no longer applied.

A tradition meant to honor God had been twisted into an excuse to disobey him.

Jesus names exactly what happened, a man made rule had replaced God's own word.

This is the proof behind his earlier question in verse three.

🙅 None effect means made powerless

🔄 A good tradition got twisted

⚖️ Human rules replaced God's word

📖 This proves the charge from verse three

# Matthew 15:7-9
# 👄 Lips Without The Heart
---
## 🎭 Ye Hypocrites, Well Did Esaias Prophesy Of You

"Hypocrite" comes from a Greek word for a stage actor wearing a mask.

Jesus is saying these leaders were only playing a part, not living it.

"Esaias" is simply the Greek form of the prophet Isaiah's name.

Jesus quotes an old prophecy because this same problem is not new.

🎭 Hypocrite once meant a stage actor

🎪 They were only playing a part

📜 Esaias is Isaiah in Greek

📖 This same problem is ancient

## 💔 Draweth Nigh Unto Me With Their Mouth, But Their Heart Is Far From Me

This line is a direct quote from the prophet Isaiah, written centuries earlier.

"Draweth nigh" is an old way of saying someone comes close or approaches.

Their words sounded religious, full of praise and respect on the surface.

Underneath those words, their actual devotion to God had quietly disappeared.

A person can say all the right things while meaning none of them.

💔 Isaiah wrote this centuries earlier

🗣️ Draweth nigh means comes close

🎭 Words sounded religious on the surface

📖 True devotion had quietly disappeared

## 📏 Teaching For Doctrines The Commandments Of Men

A "doctrine" is a teaching presented as true and authoritative.

These leaders were presenting their own man made rules as if God had given them.

That blurred the line between what God actually said and what people had simply decided.

Jesus is defending the authority of God's word against human additions.

📏 Doctrine means an authoritative teaching

🙋 Human rules were taught as God's

🙈 The line between the two blurred

📖 Jesus defends God's word alone

# Matthew 15:10-14
# 🦯 Blind Leading The Blind
---
## 📣 He Called The Multitude, And Said Unto Them, Hear, And Understand

Jesus had been speaking privately with the Pharisees up to this point.

Now he turns and calls the ordinary crowd to come listen.

"Hear and understand" means this teaching needs real thought, not a quick glance.

He is about to say something that will overturn common assumptions about food and purity.

📣 Jesus now speaks to the crowd

👥 This widens beyond the Pharisees

🧠 Hear and understand calls for real thought

📖 A hard teaching is coming next

## 🍽️ Not That Which Goeth Into The Mouth Defileth A Man

This is the core teaching Jesus wants the crowd to grasp.

"Defile" means to make something unclean or unfit before God.

Food entering the body was never the real source of spiritual uncleanness.

This directly overturns the whole hand washing debate from the start of the chapter.

🍽️ Defile means spiritually unclean

🚫 Food was never the real problem

🔄 This overturns the hand washing debate

📖 Uncleanness is not about what enters

## 😳 Knowest Thou That The Pharisees Were Offended, After They Heard This Saying

The disciples are nervous because Jesus just publicly challenged respected religious leaders.

They warn him as if he might not have realized the reaction he caused.

Jesus already knew exactly how the Pharisees would respond.

Being offended by truth does not make the truth any less true.

😳 Disciples warn Jesus nervously

🙄 They assume he missed the reaction

👀 Jesus already knew their response

📖 Offense does not undo truth

## 🌱 Every Plant, Which My Heavenly Father Hath Not Planted, Shall Be Rooted Up

Jesus answers with a picture from farming.

A plant that God himself never put in the ground has no lasting place there.

The Pharisees and their man made traditions are the plant in this picture.

Their teaching may look alive now, but it will eventually be pulled out.

🌱 A farming picture is used here

🚫 God never planted their traditions

🪴 Their teaching will not last

📖 What God did not plant will fall

## 🦯 They Be Blind Leaders Of The Blind

Jesus names the Pharisees as guides who cannot actually see the way themselves.

"Both shall fall into the ditch" pictures the real danger of following a blind guide.

A blind man might survive alone, but following another blind man guarantees a fall.

The people trusted these leaders completely, which made the danger even greater.

🦯 Pharisees could not see truth

🕳️ Both guide and follower fall together

🙏 People trusted them completely

📖 A bad guide endangers everyone following

# Matthew 15:15-20
# 💭 What Truly Defiles
---
## 🗣️ Declare Unto Us This Parable

Peter speaks up on behalf of all the confused disciples.

A "parable" here means a saying with a hidden meaning, not just a story.

Peter wants Jesus to explain plainly what he just said to the crowd.

The disciples had walked with Jesus for a while, yet this still confused them.

🗣️ Peter speaks for the group

🧩 Parable means a hidden meaning saying

❓ Peter asks for a plain answer

📖 Even close disciples stayed confused

## 😕 Are Ye Also Yet Without Understanding

Jesus sounds surprised that his own disciples still do not get it.

"Also" links them to the very Pharisees Jesus had just corrected.

Being close to Jesus did not automatically guarantee real understanding.

This question invites the disciples to think harder, not to feel ashamed.

😕 Jesus is mildly surprised here

🔗 Also links them to the Pharisees

🤔 Closeness does not guarantee understanding

📖 The question invites more thought

## 🚽 Goeth Into The Belly, And Is Cast Out Into The Draught

"Draught" is an old word for a latrine, where waste leaves the body.

Jesus walks through the plain, physical process of eating on purpose.

Food simply passes through the body and leaves it again.

That ordinary process has nothing to do with a person's standing before God.

🚽 Draught means an ancient latrine

🍽️ Food just passes through the body

🧮 This process is purely physical

📖 Physical digestion cannot touch the soul

## ❤️ Those Things Which Proceed Out Of The Mouth Come Forth From The Heart

Jesus flips the whole question from the stomach to the heart.

Words are not random, they start somewhere deep inside a person.

What someone says under pressure often reveals what they actually believe.

This is why Jesus cares so much about the words people choose.

❤️ Words start deep inside a person

🗣️ Speech reveals real belief

⚠️ Pressure often exposes the heart

📖 This is why words matter to Jesus

## 📋 Evil Thoughts, Murders, Adulteries, Fornications, Thefts, False Witness, Blasphemies

Jesus names exactly what a defiled heart actually produces.

Evil thoughts and violent acts top the list he gives.

Broken marriage vows and sexual sin appear next on it.

Theft, dishonest testimony, and cursing against God round out the rest.

This catalog shows the real danger was never something external.

📋 Jesus names the heart's real output

🧠 Evil thoughts begin the list

💔 Sexual sin and broken vows appear

📖 The danger was never external

## 🤲 To Eat With Unwashen Hands Defileth Not A Man

Jesus closes the argument right where it started back in verse two.

"Unwashen" simply means hands that were not ceremonially washed before the meal.

The entire controversy began over this exact ceremonial custom.

Jesus has now shown that this custom was never the real issue at all.

🤲 This closes the loop from verse two

🧼 Unwashen means not ceremonially washed

🔄 The whole debate centered on this custom

📖 The real issue was always the heart

# Matthew 15:21-28
# 🙇 The Canaanite Woman's Faith
---
## 🗺️ Departed Into The Coasts Of Tyre And Sidon

Tyre and Sidon were major port cities along the Mediterranean coast.

Both cities sat outside Israel, in Gentile, non Jewish territory.

Jesus deliberately leaves Jewish land and enters a different culture entirely.

What happens next will test exactly how far his mission reaches.

🗺️ Tyre and Sidon were coastal cities

🌍 Both sat in Gentile territory

🚶 Jesus leaves Jewish land on purpose

📖 His mission is about to widen

## 👩 A Woman Of Canaan

"Canaan" was the name of Israel's ancient enemy nation in that land.

By the time of Jesus, that nation no longer existed as a separate people.

Matthew still uses this old name to highlight how distant this woman was from Israel.

She belonged to the very people Israel had once been commanded to drive out.

👩 Canaan was Israel's ancient enemy

📜 That nation no longer existed by then

🚫 She stood far outside Israel's story

📖 Matthew highlights how distant she was

## 👑 Have Mercy On Me, O Lord, Thou Son Of David

"Son of David" was a title for Israel's promised king, the Messiah.

It is remarkable that a Gentile woman uses this specific Jewish title.

She clearly knew more about who Jesus claimed to be than many expected.

Her cry already shows real faith before Jesus ever answers her.

👑 Son of David names the Messiah

😲 A Gentile uses this Jewish title

🙏 She already shows real faith

📖 Her words reveal surprising knowledge

## 😖 My Daughter Is Grievously Vexed With A Devil

"Vexed" here means tormented or severely afflicted, not simply annoyed.

This was not a minor illness but a serious demonic affliction.

A mother is pleading on behalf of someone she cannot help herself.

Desperation, not curiosity, is what brought her to Jesus.

😖 Vexed means severely tormented

👿 A demon caused this affliction

💔 A mother pleads for her child

📖 Desperation drove her to Jesus

## 🤐 He Answered Her Not A Word

Jesus's silence here is surprising, given how quickly he usually responds to need.

The text does not explain exactly why he stayed quiet at first.

Many readers find this moment uncomfortable, and that discomfort is worth sitting with.

Her story is not finished yet, even in the silence.

🤐 Jesus stays silent at first

❓ The text gives no stated reason

😕 This moment feels uncomfortable to read

📖 Her story is far from over

## 🙅 Send Her Away, For She Crieth After Us

The disciples want Jesus to get rid of this woman, not to help her.

Her persistent crying out was becoming a disturbance to them.

Their request focused on comfort and quiet, not on her daughter's suffering.

Jesus does not simply obey their request to dismiss her.

🙅 Disciples want her sent away

😤 Her crying felt disruptive to them

🙈 They ignored her daughter's suffering

📖 Jesus does not dismiss her

## 🐑 I Am Not Sent But Unto The Lost Sheep Of The House Of Israel

Jesus states his primary mission plainly, to Israel first.

"Lost sheep" pictures people who had wandered from God's covenant care.

This does not mean Gentiles were excluded forever from his mercy.

It describes the order of his earthly mission, Israel first, the nations later.

🐑 Lost sheep means Israel's wandering people

🎯 Jesus names Israel as his priority

🌍 Gentiles were not excluded forever

📖 Order, not exclusion, is the point

## 🙇 Then Came She And Worshipped Him, Lord, Help Me

The woman does not argue with Jesus or walk away offended.

She drops every argument and simply worships him instead.

Her prayer shrinks to three words, Lord, help me.

Sometimes the most honest prayer is also the shortest one.

🙇 She worships instead of arguing

🙏 Her prayer becomes just three words

❤️ Simplicity did not weaken her faith

📖 Short prayers can still be honest

## 🐕 Not Meet To Take The Children's Bread, And To Cast It To Dogs

"Children" here pictures Israel, already seated at God's table being fed.

"Dogs" sounds harsh to modern ears at first read.

The Greek word used is closer to small house pets, not wild street dogs.

Jesus is testing her here, repeating a prejudice Israel often held about Gentiles.

🍞 Children's bread pictures Israel first

🐕 Dogs here means small house pets

🧪 Jesus is testing her response

📖 He names a real prejudice aloud

## 💡 Truth, Lord, Yet The Dogs Eat Of The Crumbs Which Fall From Their Masters' Table

The woman does not deny the comparison Jesus just made.

She accepts the picture completely, then finds hope inside it anyway.

Even a house pet still gets fed something from the family table.

Her answer shows both humility and remarkable confidence in Jesus's mercy.

💡 She accepts the picture fully

🐕 Even pets get fed something

🙇 Humility and confidence appear together

📖 She finds hope inside the comparison

## ✨ O Woman, Great Is Thy Faith

Jesus publicly praises this woman's faith in front of everyone listening.

Only one other person in Matthew's gospel receives this same praise.

That was a Roman centurion back in chapter eight.

Both people praised for great faith were Gentiles, not Israelites.

"Made whole from that very hour" means the healing was immediate.

✨ Jesus praises her faith publicly

🪖 A Roman centurion received the same praise

🌍 Both people of great faith were Gentiles

📖 The healing happened immediately

# Matthew 15:29-31
# 🙌 Healing By The Sea
---
## ⛰️ Went Up Into A Mountain, And Sat Down There

Sitting down was the normal posture for a teacher in this culture.

Jesus had just crossed back from Gentile territory toward the sea of Galilee.

This mountain setting echoes the same posture he took before feeding the five thousand.

A new crowd is about to gather around him again.

⛰️ Sitting down signaled formal teaching

🌊 He returned near the sea of Galilee

🔁 This echoes the earlier feeding scene

📖 A new crowd is gathering

## 🩼 Lame, Blind, Dumb, Maimed, And Many Others

This list names real, visible kinds of suffering people carried every day.

"Dumb" here means unable to speak, not a judgment on someone's intelligence.

"Maimed" describes people missing a limb or otherwise permanently injured.

The crowd brought every kind of need they had, holding nothing back.

🩼 The list names real suffering

🗣️ Dumb means unable to speak

🦾 Maimed means a missing limb

📖 Every kind of need was brought

## 🙌 They Glorified The God Of Israel

This crowd near Galilee likely included many non Jewish people from the surrounding region.

Even so, they credit the healings to "the God of Israel" specifically.

Gentiles recognizing Israel's God fulfills an old hope found throughout the prophets.

This moment widens who gets to praise God, without changing who God is.

🙌 Mixed crowds likely watched here

🙏 They praised the God of Israel

📜 Prophets hoped Gentiles would do this

📖 God's identity never changes, his audience does

# Matthew 15:32-39
# 🍞 Feeding The Four Thousand
---
## ⏳ They Continue With Me Now Three Days

Jesus notices how long this crowd has stayed with him.

Three full days without a proper meal is a real physical strain.

His compassion here is not abstract, it responds to an actual physical need.

This same kind of compassion drove the feeding of the five thousand earlier.

⏳ Three days without food passed

😟 Real physical strain had set in

❤️ Jesus responds to physical need

📖 This echoes his compassion in chapter fourteen

## 🚶 Lest They Faint In The Way

Jesus thinks ahead to the long walk home still facing this crowd.

Sending them away hungry could leave weak travelers stranded on the road.

His concern covers both the moment and what happens after it.

Compassion here looks like planning ahead, not only reacting in the moment.

🚶 He considers the journey home

😓 Hunger could strand weak travelers

🧭 His care covers what comes after

📖 Compassion planned ahead, not just reacted

## 🤷 Whence Should We Have So Much Bread In The Wilderness

The disciples ask this despite having just watched Jesus feed five thousand people.

Their doubt here is almost surprising, given what they had already witnessed.

Faith does not always carry over automatically from one miracle to the next.

Jesus patiently works with their doubt instead of condemning it.

🤷 Disciples doubt despite past proof

😮 Faith did not carry over automatically

🙏 Jesus is patient with doubt

📖 He works with them anyway

## 🐟 How Many Loaves Have Ye, Seven, And A Few Little Fishes

Jesus asks the disciples to count what they actually have first.

Seven loaves and a few small fish was still a tiny amount for a huge crowd.

The numbers here differ slightly from the five loaves and two fish in chapter fourteen.

Jesus does not need abundance to start, only willing hands.

🐟 Jesus asks them to count first

🍞 Seven loaves, a small amount

🔢 The numbers differ from chapter fourteen

📖 Jesus starts small, not abundant

## 🌾 Commanded The Multitude To Sit Down On The Ground

Jesus organizes this huge crowd before doing anything else.

Chapter fourteen described sitting on grass, here the text simply says ground.

Order before the miracle is a pattern Jesus repeats on purpose.

A calm, seated crowd was ready to receive what came next.

🌾 Jesus organizes the crowd first

🔁 Chapter fourteen used this same pattern

🧘 Order came before the miracle

📖 A ready crowd received what came next

## 🙏 Gave Thanks, And Brake Them

"Brake" is simply the old word for broke.

Jesus gives thanks for seven loaves as though they were already enough.

This gratitude happens before anything is multiplied, not after.

The same pattern appeared in the earlier feeding of the five thousand.

🙏 Brake simply means broke

💫 Thanks came before the miracle

🔁 This matches the earlier feeding

📖 Gratitude always led the increase

## 🧺 Seven Baskets Full

These baskets were a different, larger kind than the ones used in chapter fourteen.

Chapter fourteen used smaller traveling baskets, twelve of them, for a Jewish crowd.

This chapter uses large hamper style baskets, seven of them, in a largely Gentile area.

The difference in both the words and numbers helps mark these as two distinct events.

🧺 A larger kind of basket is named

🔁 Chapter fourteen used smaller baskets

🌍 This crowd was largely Gentile

📖 These are two separate miracles

## 🧮 Four Thousand Men, Beside Women And Children

Matthew again counts only the men present, following the custom of that time.

Women and children were there too but were left out of the official count.

The real number of people fed that day was likely much higher than four thousand.

This mirrors the exact same counting pattern used for the five thousand earlier.

🧮 Only men were officially counted

👩‍👧 Women and children were also present

📈 The real total was likely higher

📖 This matches the earlier feeding's pattern

## ⛵ Came Into The Coasts Of Magdala

Magdala was a town on the western shore of the sea of Galilee.

This town's name later becomes attached to one of Jesus's most devoted followers.

Mary Magdalene, meaning Mary of Magdala, likely came from this exact town.

A quiet place name here quietly connects forward to a major figure later in the story.

⛵ Magdala sat on Galilee's shore

👤 The name later marks Mary Magdalene

🔗 This connects forward in the gospel

📖 Small details often carry forward meaning
`.trim();

export const MATTHEW_FIFTEEN_PERSONAL_SECTIONS = parseMatthewFifteenRawNotes(MATTHEW_FIFTEEN_RAW_NOTES);
