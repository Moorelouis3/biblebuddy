export type MatthewTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwelveRawNotes(rawText: string): MatthewTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 12:${startVerse}` : `Matthew 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 12 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWELVE_RAW_NOTES = `# Matthew 12:1-8
# 🌾 The Son Of Man Is Lord Of The Sabbath
---
## 🌾 At That Time Jesus Went On The Sabbath Day Through The Corn

"Corn" here does not mean the yellow vegetable eaten today.

It means a grain field, likely wheat or barley.

Walking through someone else's field and picking a few heads to eat was allowed by the law.

Moses commanded that hungry travelers could pluck grain by hand as they passed.

The disciples were not stealing, they were using an old right given to the hungry.

🌾 Corn means a grain field here
✋ The law allowed hungry travelers to pluck grain
🚫 This was never stealing
📖 God built mercy into this law

---

## 📏 Thy Disciples Do That Which Is Not Lawful To Do Upon The Sabbath Day

The Pharisees had built hundreds of extra rules around the sabbath law.

Harvesting grain counted as forbidden work under those added rules.

Plucking a few heads by hand was not harvesting under the law Moses gave.

The Pharisees were judging the disciples by rules God never actually wrote.

Jesus is about to answer a man made rule with scripture itself.

📏 Pharisees added hundreds of sabbath rules
🌾 They counted plucking grain as harvesting
📜 Moses never called this forbidden work
📖 Jesus answers a human rule with scripture

---

## 👆 Have Ye Not Read What David Did, When He Was An Hungred

Jesus points the Pharisees back to their own scriptures.

David once fled from Saul with his men, hungry and desperate.

He is reminding them that a desperate king broke a rule and God never condemned him.

The rule was never bigger than human need in that story.

Jesus is laying the groundwork for his own defense.

👆 Jesus points to their own scriptures
🏃 David fled Saul, hungry and desperate
🙅 God never condemned David for that
➡️ Jesus lays the groundwork for his defense

---

## 🍞 Did Eat The Shewbread, Which Was Not Lawful For Him To Eat

"Shewbread" means twelve loaves kept inside the tabernacle, set before God.

Normally only the priests were allowed to eat that bread.

David and his men ate it anyway, running from Saul.

God never punished David for breaking that rule under real need.

A ceremonial law bent under human hunger, and God was not angry.

🍞 Shewbread means twelve sacred loaves
🙏 Only priests were normally allowed to eat it
🏃 David ate it anyway fleeing for his life
📖 Need can outweigh ceremonial law

---

## 🏛️ The Priests In The Temple Profane The Sabbath, And Are Blameless

Priests performed real labor in the temple every single sabbath.

Preparing sacrifices and tending the altar counted as work by any definition.

Yet the law never called the priests guilty for doing that work.

The temple's own duties outranked the normal sabbath rest.

Jesus uses this to show one sacred duty can override another rule.

🏛️ Priests worked in the temple every sabbath
🔥 Preparing sacrifices counted as real labor
🙅 The law never called them guilty
📖 One sacred duty can override a rule

---

## 👑 In This Place Is One Greater Than The Temple

Jesus makes a bold claim here about himself.

The temple was the holiest place Israel knew.

Jesus says something greater than that is standing in front of them.

If temple duties excuse sabbath work, his own authority excuses even more.

This is Jesus naming his own identity, not just winning an argument.

👑 Jesus makes a bold claim
🏛️ The temple was Israel's holiest place
➡️ Something greater now stands before them
📖 Jesus names his own identity

---

## 📜 I Will Have Mercy, And Not Sacrifice

This exact line comes from the prophet Hosea, written centuries earlier.

God said he wanted mercy toward people more than ritual offerings.

Jesus already used this same verse once before, back in chapter nine.

The Pharisees judged the disciples by sacrifice minded rules instead of mercy.

They judged hungry men guilty before asking why they were hungry.

📜 This line comes from the prophet Hosea
❤️ God wants mercy more than ritual
🔁 Jesus already used this same verse before
📖 Mercy should come before judgment

---

## 👑 The Son Of Man Is Lord Even Of The Sabbath Day

Jesus closes this argument with his biggest claim yet.

"Son of man" was his own favorite title for himself.

He is not just allowed to break a man made sabbath rule.

He made the sabbath itself and rules over it completely.

The sabbath was always meant to serve people, under his authority.

👑 Jesus closes with his biggest claim
🏷️ Son of man was his favorite title
⚖️ He rules the sabbath, not the reverse
📖 The sabbath was always meant to serve people

# Matthew 12:9-14
# ✋ Is It Lawful To Heal On The Sabbath
---
## 🖐️ A Man Which Had His Hand Withered

"Withered" means the hand had shrunk and lost all its normal strength.

It likely could not grip, lift, or work like a healthy hand.

This man could not earn a living with a hand like that.

His condition was visible to everyone in the synagogue that day.

🖐️ Withered means shrunk and powerless
💼 He likely could not earn a living
👀 His condition was visible to everyone
📖 Real suffering sat in that room

---

## 🪤 Is It Lawful To Heal On The Sabbath Days? That They Might Accuse Him

This question sounds like honest curiosity about the law.

It is actually a trap, and the text says so plainly.

The Pharisees wanted Jesus to heal so they could charge him with sabbath work.

They were using a suffering man as bait for an accusation.

❓ The question sounds honest at first
🪤 It was really a trap
😠 They wanted a charge against Jesus
📖 A suffering man became bait

---

## 🐑 What Man Shall There Be Among You, That Shall Have One Sheep

Jesus answers with a scene everyone listening would recognize.

A sheep falling into a pit was a common problem for any shepherd.

Even strict sabbath keepers normally pulled their own animal out that same day.

Jesus is using their own accepted practice against them.

🐑 A sheep in a pit was common
🛠️ Even strict sabbath keepers rescued their own animal
🎯 Jesus uses their own practice against them
📖 Their own habits proved his point

---

## ⚖️ How Much Then Is A Man Better Than A Sheep

Jesus moves from the animal straight to the man standing in front of him.

If a sheep is worth rescuing on the sabbath, a person is worth far more.

Human worth outweighs a rule built to protect the day of rest.

Doing good was never supposed to wait for a more convenient day.

⚖️ Jesus moves from animal to man
❤️ A person is worth more than a sheep
⏳ Good should never wait for later
📖 Human worth outweighs man made rules

---

## 🗣️ Stretch Forth Thine Hand

Jesus does not touch the man or use any tool at all.

He simply speaks a command, and the hand is healed instantly.

No work by any Pharisee's definition actually happened here.

The healing itself becomes its own silent argument against their rule.

🗣️ Jesus heals with a spoken word
🙅 No physical work took place
⚡ The healing was instant
📖 The miracle argues against their rule

---

## ⚠️ Held A Council Against Him, How They Might Destroy Him

This moment marks a real turning point in the chapter.

A debate about a sabbath rule has just become a plan to kill Jesus.

The Pharisees were more troubled by losing an argument than by a healed hand.

Control mattered more to them than a healed man.

That anger will only grow as the chapter continues.

⚠️ This is a real turning point
💀 A debate just became a murder plot
😠 Losing an argument angered them more than healing
📖 Control mattered more than compassion

# Matthew 12:15-21
# 🕊️ Behold My Servant, Whom I Have Chosen
---
## 🚶 He Withdrew Himself From Thence

Jesus knows the Pharisees are now plotting against his life.

Instead of staying to fight, he quietly withdraws from that place.

This is not fear, it is wisdom about when to act and when to wait.

His time to die was coming, but it was not this day.

🚶 Jesus withdraws instead of staying to fight
🧠 This is wisdom, not fear
⏳ His time had not yet come
📖 Jesus controlled the timing of his own path

---

## 👥 Great Multitudes Followed Him, And He Healed Them All

Crowds keep finding Jesus no matter where he tries to withdraw.

He heals everyone who comes to him, without exception.

Opposition from leaders never stopped his compassion toward ordinary people.

The healing never depended on how safe the moment felt.

👥 Crowds found him anyway
💗 He healed every single person who came
🙅 Leaders' hostility never stopped his compassion
📖 Compassion did not depend on safety

---

## 🤫 Charged Them That They Should Not Make Him Known

This looks strange for someone performing public miracles.

Jesus was not ashamed of what he was doing.

He was avoiding a premature uprising before his actual mission was ready.

Crowds hoping for a political king could easily misuse open fame like this.

🤫 Jesus was not hiding in shame
⏳ He was avoiding an early uprising
👑 Crowds wanted a political king too soon
📖 Timing mattered more than fame

---

## 📜 Behold My Servant, Whom I Have Chosen

Matthew quotes directly from the prophet Isaiah here.

Isaiah had written about a chosen servant centuries before Jesus was born.

Matthew is telling his readers that Jesus is that exact servant.

Every detail that follows in this quote describes how Jesus actually worked.

📜 This quote comes from the prophet Isaiah
⏳ Isaiah wrote it centuries beforehand
🎯 Matthew says Jesus is that servant
📖 The quote describes how Jesus worked

---

## 🤐 He Shall Not Strive, Nor Cry

This does not describe someone who is weak or passive.

"Strive" here means pushing for power through loud public conflict.

Jesus pursued his mission without shouting or forcing his way into influence.

His strength showed up as quiet patience instead of noisy ambition.

🤐 Strive means fighting loudly for power
🙅 Jesus never pushed for influence that way
🕊️ His strength looked like patience
📖 Quiet patience is still real strength

---

## 🌾 A Bruised Reed Shall He Not Break, And Smoking Flax Shall He Not Quench

A reed is a thin plant that snaps easily once it is bruised.

Smoking flax is a wick that is barely still burning, about to go dark.

Both pictures describe people who are weak, hurting, or nearly given up.

Jesus deals gently with people like that instead of finishing them off.

🌾 A bruised reed is already weak
🕯️ Smoking flax is a nearly dead wick
💔 Both picture hurting, fragile people
📖 Jesus is gentle with the weak

---

## ⏳ Till He Send Forth Judgment Unto Victory

Gentleness was never the end of the story for this servant.

A quiet start does not mean a quiet finish.

Judgment unto victory promises that justice will eventually win completely.

Patience now does not cancel power later.

⏳ Gentleness is not the end
⚖️ Judgment unto victory promises a final win
💪 Patience now does not cancel future power
📖 God's justice always arrives eventually

---

## 🌍 In His Name Shall The Gentiles Trust

Isaiah's prophecy was never only about Israel.

"Gentiles" means every non Jewish nation and people on earth.

This servant's mission was always meant to reach far beyond one nation.

Matthew is already preparing his readers for a mission without borders.

🌍 Gentiles means every non Jewish nation
🎯 The mission was never for Israel alone
🚪 This opens the door worldwide
📖 Matthew prepares readers for a global mission

# Matthew 12:22-26
# 👹 Every Kingdom Divided Against Itself
---
## 👁️ One Possessed With A Devil, Blind, And Dumb

This man suffered from three separate problems layered together.

He could not see, he could not speak, and he was possessed by a demon.

Healing a case this severe was an unmistakable show of power.

No ordinary person could fix all three problems at once.

👁️ He could not see
🤐 He could not speak
👹 A demon controlled him too
📖 This was an unmistakable show of power

---

## 👑 Is Not This The Son Of David

"Son of David" was a well known title for the promised Messiah.

The crowd is asking the question out loud, almost afraid to hope.

They had just watched proof that fits exactly what the title promised.

Their amazement is pointed in the right direction here.

👑 Son of David names the promised Messiah
😮 The crowd dares to ask it aloud
✅ The proof matched the title
📖 Their amazement pointed the right way

---

## 😈 This Fellow Doth Not Cast Out Devils, But By Beelzebub The Prince Of The Devils

"Beelzebub" was originally the name of a pagan god, "lord of the flies."

Jewish teachers later used the name as an insulting title for Satan.

The Pharisees cannot deny the miracle, so they attack its source instead.

Crediting a real miracle to Satan was their only way to stay against Jesus.

👑 Beelzebub was once a pagan god's name
😈 It became an insulting title for Satan
🙅 They could not deny the miracle itself
📖 Attacking the source was their only option

---

## 🏰 Every Kingdom Divided Against Itself Is Brought To Desolation

Jesus answers with simple logic before any theology at all.

A kingdom or a city fighting itself cannot stand for very long.

If Satan were casting out his own demons, his kingdom would be collapsing on itself.

The accusation does not even make sense on its own terms.

🏰 A divided kingdom cannot stand
🏠 A divided house falls the same way
🤔 Satan fighting Satan makes no sense
📖 The accusation fails its own logic

# Matthew 12:27-30
# 🏠 Casting Out Devils By The Spirit Of God
---
## 🔁 If I By Beelzebub Cast Out Devils, By Whom Do Your Children Cast Them Out

Some Jewish exorcists of that time also claimed to cast out demons.

Jesus asks whose power those men were using instead.

If Jesus needs Satan's help, so would every one of their own exorcists.

Their own practice becomes the proof against their own accusation.

🔁 Other Jewish exorcists existed too
❓ Jesus asks whose power they used
🪞 The same charge falls on their own people
📖 Their own practice disproves their accusation

---

## ✅ If I Cast Out Devils By The Spirit Of God, Then The Kingdom Of God Is Come Unto You

Jesus now states the real explanation plainly.

The power behind this healing is the Spirit of God, not Satan.

That means God's promised kingdom is already breaking into the present moment.

This miracle is not just help for one man, it is a sign of arrival.

✅ Jesus states the real explanation
🕊️ The Spirit of God powers this healing
👑 God's kingdom is already arriving
📖 One miracle signals a larger arrival

---

## 🏠 How Can One Enter Into A Strong Man's House, And Spoil His Goods, Except He First Bind The Strong Man

Picture a thief who wants to rob a guarded house.

He cannot take anything until the strong guard inside is tied up first.

Satan is the strong man, and his captives are the goods inside the house.

Jesus is describing himself binding Satan before freeing the people Satan held.

🏠 A thief must bind the guard first
😈 Satan is pictured as that strong man
⛓️ Jesus binds Satan before freeing captives
📖 This explains how the healing worked

---

## ⚖️ He That Is Not With Me Is Against Me

Jesus removes any middle ground from this conflict.

Watching from a safe distance was never a real option here.

A person either gathers people toward Jesus or scatters them away from him.

Neutrality was simply not available in this moment.

⚖️ There is no middle ground here
👀 Watching safely was never an option
🧺 A person either gathers or scatters
📖 Neutrality was never actually available

# Matthew 12:31-37
# 🗣️ Every Idle Word
---
## ✅ All Manner Of Sin And Blasphemy Shall Be Forgiven Unto Men

Jesus opens with genuinely good news before the hard warning that follows.

Nearly every sin a person could name is covered by real forgiveness.

God's mercy reaches further than most people expect.

This makes the next verse land even harder by contrast.

✅ Nearly every sin can be forgiven
❤️ God's mercy reaches further than expected
⚖️ This sets up a sharp contrast
📖 Forgiveness is wider than people assume

---

## 😟 The Blasphemy Against The Holy Ghost Shall Not Be Forgiven Unto Men

This verse has frightened many readers who worry they already committed it.

The context here matters enormously for understanding what is being described.

The Pharisees had just called the Spirit's own work the work of Satan.

That is a complete, hardened refusal to call good evil's opposite.

An honest, worried conscience is itself proof this sin has not been committed.

😟 Many readers fear they committed this
🔍 Context explains exactly what happened here
🙅 Pharisees called the Spirit's work satanic
📖 A worried conscience is not this sin

---

## 🌍 Neither In This World, Neither In The World To Come

Jesus adds weight to the warning by naming both ages at once.

This life and the next life are both covered by this statement.

A hardened heart that calls good evil is choosing a permanent direction.

The warning is severe because the choice itself is severe.

🌍 This world is included
⏳ The world to come is included too
🧭 A hardened heart chooses a direction
📖 The warning matches a severe choice

---

## 🌳 Make The Tree Good, And His Fruit Good, For The Tree Is Known By His Fruit

A tree's fruit always reveals what kind of tree it really is.

Nobody can force a bad tree to grow good fruit by trying harder.

The fruit is evidence, not the cause, of the tree's true nature.

Jesus is describing how a person's words reveal their actual heart.

🌳 Fruit reveals the kind of tree
🙅 A bad tree cannot fake good fruit
🔍 Fruit is evidence, not the cause
📖 Words reveal a person's real heart

---

## 🐍 O Generation Of Vipers, How Can Ye, Being Evil, Speak Good Things

"Vipers" refers to poisonous snakes known for a sudden, hidden strike.

Jesus is naming the Pharisees as dangerous, not simply rude.

Their harsh accusation against him came from something poisoned underneath.

Good words cannot come from a heart that has not actually changed.

🐍 Vipers are poisonous, striking snakes
⚠️ Jesus names them as dangerous
☠️ Their accusation came from a poisoned heart
📖 Words cannot outrun an unchanged heart

---

## ❤️ Out Of The Abundance Of The Heart The Mouth Speaketh

"Abundance" here means whatever fills a heart the most.

Whatever a person treasures most eventually spills out through their words.

Speech is not random, it is overflow from somewhere deeper.

Listening closely to someone's words reveals what actually fills their heart.

❤️ Abundance means whatever fills the heart
💧 Words overflow from what fills it
🔍 Speech reveals something deeper
📖 Listen closely and a heart shows itself

---

## 💬 Every Idle Word That Men Shall Speak, They Shall Give Account Thereof In The Day Of Judgment

"Idle" means careless or thrown away without any real thought.

Jesus says even careless words will matter on judgment day.

This is a serious claim about how much words truly weigh.

Nothing spoken is ever treated as meaningless in the end.

💬 Idle means careless and thoughtless
⚖️ Even careless words will be weighed
📏 Words carry more weight than assumed
📖 Nothing spoken is ultimately meaningless

# Matthew 12:38-42
# 🐳 The Sign Of The Prophet Jonas
---
## 🙋 Master, We Would See A Sign From Thee

This sounds like a reasonable, humble request on the surface.

Jesus had already performed miracle after miracle in front of these exact men.

They were not lacking evidence, they were refusing to accept what they had already seen.

Asking for one more sign was simply another way to stall.

🙋 The request sounds reasonable at first
👀 They had already seen many miracles
🚫 They were stalling, not lacking evidence
📖 More evidence rarely convinces a closed heart

---

## 💍 An Evil And Adulterous Generation Seeketh After A Sign

"Adulterous" here is not about marriage at all.

In the Old Testament, Israel's unfaithfulness to God was often pictured as marriage breaking.

Calling this generation adulterous names their unfaithfulness to the God they claimed to follow.

Demanding proof instead of trusting God was itself a form of that unfaithfulness.

💍 Adulterous pictures unfaithfulness, not marriage
📜 Prophets often used this marriage image
🙅 Israel claimed God but doubted him
📖 Demanding proof was itself unfaithfulness

---

## 🐳 As Jonas Was Three Days And Three Nights In The Whale's Belly

Jonah spent three days and three nights trapped inside a great fish.

Jesus points to that old story as a preview of his own coming burial.

He will spend the same three day span in the heart of the earth.

Jonah's strange rescue becomes a sign pointing straight at the resurrection.

🐳 Jonah spent three days inside a fish
⚰️ Jesus previews his own burial here
⏳ The same time span is matched
📖 Jonah's rescue points to the resurrection

---

## 🏙️ The Men Of Nineveh Shall Rise In Judgment With This Generation

Nineveh was a pagan city that genuinely repented at Jonah's short warning.

That city had far less reason to believe than the crowd standing with Jesus.

Jesus says Nineveh's old repentance will testify against this unrepentant generation.

A greater sign than Jonah stood in front of them, and still nothing changed.

🏙️ Nineveh repented at Jonah's warning
🙅 They had far less reason to believe
⚖️ Their repentance now testifies against this crowd
📖 A greater sign still changed nothing

---

## 👑 The Queen Of The South Shall Rise Up In The Judgment With This Generation

The queen of the south refers to the Queen of Sheba in the Old Testament.

She traveled a very long distance just to hear Solomon's wisdom firsthand.

Jesus says someone greater than Solomon was standing right in front of this crowd.

She crossed a continent for wisdom.

This crowd would not even cross the street.

👑 She was the Queen of Sheba
🐫 She traveled far to hear Solomon
🎯 Someone greater than Solomon stood here
📖 Her effort shows how little this crowd gave

# Matthew 12:43-45
# 🏠 The Unclean Spirit Returns
---
## 🏜️ When The Unclean Spirit Is Gone Out Of A Man, He Walketh Through Dry Places, Seeking Rest

Ancient hearers pictured demons as restless, always searching for a place to settle.

"Dry places" meant desert wasteland, far from normal homes and comfort.

The spirit finds no real rest out there and eventually decides to return.

This pictures an exorcism that removed a spirit without changing anything deeper.

👻 Spirits were pictured as restless wanderers
🏜️ Dry places means empty desert wasteland
🔄 The spirit eventually decides to return
📖 Removal alone does not fix an empty heart

---

## 🧹 He Findeth It Empty, Swept, And Garnished

"Garnished" means decorated or tidied up, made to look nice.

The house, meaning the person, looks clean and orderly on the outside.

Nothing good has actually moved in to fill that cleaned out space.

An empty, decorated life is still an empty life.

🧹 Garnished means tidied up and decorated
🏠 The house looks clean on the outside
📦 Nothing good has filled that space
📖 An empty decorated life is still empty

---

## 🔢 He Taketh With Himself Seven Other Spirits More Wicked Than Himself

The number seven here signals completeness, not a literal headcount.

A superficial change that never fills the empty space invites something far worse back.

Jesus applies this old warning directly to the crowd in front of him.

Hearing good teaching and watching real miracles without real repentance leaves a person emptier than before.

🔢 Seven signals completeness, not a headcount
⚠️ An empty change invites something worse
🎯 Jesus applies this to his own crowd
📖 Hearing truth without repenting leaves a person emptier

# Matthew 12:46-50
# 👪 Who Is My Mother? And Who Are My Brethren?
---
## 👪 His Mother And His Brethren Stood Without, Desiring To Speak With Him

"Brethren" here most likely means Jesus's own younger half siblings.

Mary and Joseph appear to have had other children after Jesus was born.

These family members are standing outside, wanting a private word with him.

Family concern, not hostility, likely brought them to find him that day.

👪 Brethren likely means his younger half siblings
🚪 They are standing outside the crowd
❤️ Family concern likely brought them
📖 This sets up Jesus's surprising answer

---

## ❓ Who Is My Mother? And Who Are My Brethren?

This question can sound harsh or dismissive on first read.

Jesus is not rejecting his mother or denying his actual family here.

He is about to widen the definition of family for everyone listening.

The question sets up a much bigger point than mere biology.

❓ The question can sound harsh at first
🙅 Jesus is not rejecting his mother
🌍 He is widening the idea of family
📖 A bigger point is coming next

---

## 👉 He Stretched Forth His Hand Toward His Disciples

Jesus makes a deliberate, physical gesture toward the people around him.

He points at ordinary followers, not toward anyone with special status or blood ties.

The gesture itself answers his own question before he even finishes speaking.

His closest family, by his own definition, is standing right there with him.

👉 Jesus gestures toward his disciples
🙅 They have no special status or blood ties
💡 The gesture answers his own question
📖 His true family stands right there

---

## 👪 Whosoever Shall Do The Will Of My Father, The Same Is My Brother, And Sister, And Mother

Jesus names the real requirement for belonging to his family.

Doing the Father's will matters more than any bloodline ever could.

Anyone who obeys God that way gains brother, sister, and mother all at once.

This chapter opened with a question about lawful sabbath work.

It closes by redefining what truly belongs to Jesus at all.

👪 Doing the Father's will is the real test
🩸 Bloodline matters less than obedience
🎁 Obedience grants a whole new family
📖 The chapter closes by redefining belonging
`.trim();

export const MATTHEW_TWELVE_PERSONAL_SECTIONS = parseMatthewTwelveRawNotes(MATTHEW_TWELVE_RAW_NOTES);
