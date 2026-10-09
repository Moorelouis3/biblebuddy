export type LukeTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTenRawNotes(rawText: string): LukeTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 10:${startVerse}` : `Luke 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Luke 10 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TEN_RAW_NOTES = `# Luke 10:1-4
# 📡 Sending Out The Seventy
---
## 👥 Appointed Other Seventy Also

The seventy were a separate group from the twelve apostles.

Luke already told the story of twelve men chosen earlier in this Gospel.

This larger group of seventy is sent out here for the first time.

Jewish tradition linked the number seventy to the elders who once helped Moses.

👥 Seventy differs from the twelve apostles
📜 Seventy echoes the elders under Moses
🚀 Jesus multiplied his own reach
📖 One mission, carried by many hands

## 👯 Two And Two Before His Face

Pairs were sent because two witnesses were taken more seriously than one.

Jewish law required at least two witnesses before a claim could be trusted.

Traveling in pairs also meant built in support on a dangerous road.

"Before his face" means these pairs went ahead to prepare the way.

👯 Pairs matched the rule on witnesses
🛡️ Pairs offered safety on the road
🚶 Before his face means sent ahead
📖 The message arrived before Jesus did

## 🌾 The Harvest Truly Is Great

"Harvest" is a picture borrowed straight from farming season.

A harvest means crops that are ripe and ready to be gathered in.

Jesus uses that picture for people who are ready to respond to God.

Many towns in Galilee had not yet heard Jesus preach in person.

🌾 Harvest means people ready to respond
📈 Great means the need was huge
🏘️ Many towns had not heard yet
📖 The need was bigger than the workers

## 📉 The Labourers Are Few

The real shortage was never the harvest itself.

It was the number of people willing to go and gather it in.

Jesus tells them to pray first instead of simply trying harder themselves.

Prayer puts the responsibility for sending workers back onto God himself.

📉 Labourers means workers, and they were few
🙏 Jesus told them to pray first
👆 God sends the workers, not man
📖 Prayer comes before the sending

## 🐑 As Lambs Among Wolves

A lamb has no natural defense against a wolf at all.

Jesus pictures the weakest animal he can choose, not the strongest.

Wolves picture real hostility these messengers would soon meet in certain towns.

Jesus sends them out already aware of the danger, not blind to it.

🐑 Lambs picture total vulnerability
🐺 Wolves picture real hostility ahead
👁️ Jesus warned them before sending them
📖 Their safety depended on God, not strength

## 💰 Carry Neither Purse, Nor Scrip, Nor Shoes

A "purse" here was a small bag used to carry money.

A "scrip" was a separate travel bag used for food and supplies.

Going without shoes meant traveling in simple sandals instead of sturdier footwear.

Leaving all three behind meant depending on God for every need.

💰 Purse means a small money bag
🎒 Scrip means a food and supply bag
👣 No shoes meant minimal travel gear
📖 Trust replaced ordinary preparation

## 🙅 Salute No Man By The Way

This does not mean Jesus wanted them to be rude to strangers.

A normal greeting in that culture could take several minutes of formal exchange.

Stopping for every lengthy greeting along the road would slow the mission down.

Jesus wanted them focused entirely on the urgency of the task ahead.

🙅 Not about being unfriendly
⏱️ Greetings then took real time
🏃 Urgency mattered more than custom
📖 Every hour mattered for the harvest

# Luke 10:5-9
# 🚪 Received Or Rejected In A House
---
## 🕊️ Peace Be To This House

This greeting was more than a polite hello.

"Peace," or shalom, meant wholeness, safety, and blessing from God on that home.

Guests often spoke blessings over a household as soon as they entered.

Here the seventy are not simply greeting the family.

They are pronouncing something real over that house.

🕊️ Peace means wholeness from God
🏠 Spoken over the household itself
🗣️ More than a polite greeting
📖 Words carried real spiritual weight

## 📜 The Son Of Peace

"The son of peace" is a Hebrew way of describing a person's character.

It means someone whose heart is already open to the message.

Calling someone a "son" of something described their nature, not their family.

A "son of peace" is simply a peaceable, welcoming person.

📜 A Hebrew way to describe character
🤝 Means a peaceable, welcoming person
🔑 Son of something describes a trait
📖 Not every house would fit this

## 🔄 It Shall Turn To You Again

This does not mean the blessing gets lost if it is refused.

If the house was not receptive, the spoken peace simply returned to the speaker.

Nothing about the blessing was ever wasted or wrongly given.

The hearer alone carried the weight of rejecting it.

🔄 Blessing returns if it is refused
✅ Nothing given was ever wasted
🙌 Messengers were not at fault
📖 The hearer carries the rejection

## 💵 The Labourer Is Worthy Of His Hire

This is a flat statement about fair support for ministry workers.

"Hire" here means wages or payment owed for work actually done.

The seventy were allowed to receive food and shelter from those they served.

This was fair payment for honest work, not charity.

Paul later quotes this same principle when defending his own ministry.

💵 Hire means wages owed for work
🍽️ Food and shelter counted as pay
⚖️ This was payment, not charity
📖 Paul later repeats this same principle

## 🛏️ Go Not From House To House

This is not a rule against visiting multiple homes.

It warns against hopping around looking for better food or a nicer bed.

Staying put in one household showed contentment instead of restless comparison.

It also protected the host who had already offered welcome in good faith.

🚫 Not a ban on visiting homes
🛏️ Warns against seeking better comfort
🤝 Protected the first host's honor
📖 Mission mattered more than comfort

## 🍲 Eat Such Things As Are Set Before You

This freed the seventy from worrying about unfamiliar food customs.

Jewish travelers sometimes worried about food that broke their usual dietary habits.

Jesus tells them to simply accept whatever was offered in that house.

Refusing a host's food could easily be read as a serious insult.

🍲 Freed them from food worries
🙏 Accept whatever the host offers
🚫 Refusing food could insult the host
📖 Accepting the meal honored the welcome

## 🩺 Heal The Sick That Are Therein

"Therein" simply means within that house or town.

This healing power was the same authority Jesus had already given them.

A visible healing gave people a real reason to listen to the message.

The miracle supported the words instead of replacing them.

🩺 Therein means within that place
💪 Same authority given earlier
👂 Healing backed up the message
📖 Word and healing traveled together

## 📏 The Kingdom Of God Is Come Nigh Unto You

"Nigh" is an old word that simply means near.

The kingdom of God is God's own rule breaking into ordinary life through Jesus.

This was not only a future promise.

It was already arriving in that very town.

Every healing and every word spoken proved it had come.

📏 Nigh simply means near
👑 Kingdom means God's rule arriving
⏳ Already present, not only future
📖 This town could see it now

# Luke 10:10-12
# 👣 Shaking Off The Dust
---
## 🚶 Go Your Ways Out Into The Streets

Rejection did not mean the seventy slipped away quietly.

Jesus tells them to go out into the open streets, not hide in shame.

The act that followed was meant to be seen by the whole town.

A public rejection of the message received a public, visible response.

🚶 Rejection was not hidden
👀 The response was meant to be seen
📢 Public message, public response
📖 Nothing about it stayed private

## 🧷 The Very Dust Of Your City, Which Cleaveth On Us

"Cleaveth" is an old word meaning to stick or cling tightly.

Even ordinary road dust had clung to their feet and clothing.

That dust had come from walking through that specific town's own streets.

Picking it up to shake off made the rejection visible and physical.

🧷 Cleaveth means to stick or cling
👣 Dust came from that town's streets
🎭 A symbol everyone could watch
📖 An ordinary thing became a sign

## 🤲 We Do Wipe Off Against You

Shaking off dust from the feet was a real, known custom.

Jewish travelers sometimes did this after leaving land they considered unclean.

Using that same gesture against a Jewish town sent a shocking message.

It said the town had chosen to be treated like foreign, unwelcoming ground.

🤲 A real known travel custom
🌍 Normally used for unclean land
⚠️ Using it here was shocking
📖 It was a warning, not an insult

## 🔁 Notwithstanding Be Ye Sure Of This

"Notwithstanding" is an old word that simply means even so.

Even after being rejected, the warning about the kingdom still stood firm.

Refusing to listen did not make the message any less true.

The town's own choice changed its outcome, not the message itself.

🔁 Notwithstanding means even so
🧱 The warning still stood firm
🚪 Rejection changed the outcome, not the truth
📖 Truth does not depend on belief

## 📅 More Tolerable In That Day For Sodom

"That day" refers to the future day when God judges everyone.

Sodom was remembered as one of the most sinful cities in the Old Testament.

Sodom never had the chance to see Jesus or hear his own voice.

A town that saw Jesus and still refused him faced a heavier judgment.

📅 That day means the final judgment
🔥 Sodom was remembered for deep sin
⚖️ More knowledge means more responsibility
📖 Clear opportunity raises the stakes

# Luke 10:13-16
# ⚖️ Woe To The Cities That Saw And Did Not Turn
---
## 😢 Woe Unto Thee, Chorazin

"Woe" is a cry of grief mixed with warning, not just anger.

Chorazin was a small fishing town on the edge of the Sea of Galilee.

Jesus had done many miracles in towns just like this one nearby.

Despite seeing such power firsthand, Chorazin never turned back to God.

😢 Woe means grief mixed with warning
🎣 Chorazin was a Galilee fishing town
👀 It saw Jesus's miracles firsthand
📖 Wasted opportunity, not simple anger

## 🏘️ Woe Unto Thee, Bethsaida

Bethsaida was another fishing town near Chorazin and Capernaum.

It was the hometown of several of Jesus's own disciples.

Having disciples from that very town did not guarantee the town's own belief.

Jesus names it separately because its failure was just as real as Chorazin's.

🏘️ Bethsaida sat near Chorazin
🎣 Home to several of the disciples
🚫 Closeness did not guarantee belief
📖 Nearness is not the same as faith

## 🌊 The Mighty Works Had Been Done In Tyre And Sidon

Tyre and Sidon were wealthy Gentile port cities up the coast.

Both cities were known in the Old Testament for pride and open idolatry.

Jesus says sinners like these would have repented if they had seen his miracles.

That comparison was meant to shock a Jewish audience listening to him.

🌊 Tyre and Sidon were Gentile ports
🛐 Known for pride and idolatry
😮 A shocking comparison for Jewish ears
📖 Even sinful cities would have repented

## 🖤 Sitting In Sackcloth And Ashes

This was the ancient way of showing deep, public sorrow.

"Sackcloth" was a rough, uncomfortable fabric worn instead of normal clothing.

Sitting in ashes added visible proof of grief and humility before God.

Tyre and Sidon would have worn this if they had truly seen what Chorazin saw.

🖤 Sackcloth means rough mourning cloth
🔥 Ashes showed humility and grief
🏙️ A whole city could do this
📖 Gentile cities would have repented this way

## ⚖️ More Tolerable For Tyre And Sidon At The Judgment

Judgment is never flat or identical for everyone.

Tyre and Sidon sinned without ever seeing Jesus work a single miracle.

Capernaum, Chorazin, and Bethsaida sinned after watching him heal and teach directly.

Greater exposure to the truth brings a heavier judgment for rejecting it.

⚖️ Judgment is not identical for all
🙈 Tyre and Sidon never saw Jesus
👁️ Galilee's towns watched him directly
📖 Judgment matches what was actually seen

## 🏠 Capernaum, Which Art Exalted To Heaven

Capernaum was the town Jesus actually lived in during his ministry.

No town on earth had a greater front row seat to Jesus's own life.

"Exalted to heaven" describes the incredible privilege of having him right there daily.

That privilege was never a reward Capernaum had earned for itself.

🏠 Capernaum was Jesus's home base
⭐ Exalted means given great privilege
🎁 Privilege was given, not earned
📖 Privilege always carries responsibility

## 📉 Shalt Be Thrust Down To Hell

This is not describing a random, unfair punishment.

The height of the fall matches the height of the privilege Capernaum had.

A town lifted up to see so much fell the furthest when it refused.

This warning uses dramatic language on purpose, not as mere exaggeration.

📉 The fall matched the height
💡 Great light was rejected here
🗣️ Dramatic language, not exaggeration
📖 Rejected light leads to greater darkness

## 🔗 He That Heareth You Heareth Me

Jesus ties his own authority directly to these ordinary messengers.

Listening to the seventy counted the same as listening to Jesus himself.

An ancient messenger carried the full authority of the one who sent him.

Every rejection of them reached all the way back to the Father.

🔗 Hearing them meant hearing Jesus
📨 Ancient messengers carried full authority
🚫 Rejection was never really personal
📖 Rejection reached back to the Father

# Luke 10:17-20
# ⚡ The Seventy Return With Joy
---
## 📝 The Seventy Returned Again With Joy

This is the one mission report Luke actually records in full.

The seventy had gone out uncertain, carrying nothing, expecting possible rejection.

They came back amazed at what had actually happened out in the field.

Joy was their honest, immediate reaction, not something staged for show.

📝 Luke records their full report
😟 They left uncertain and empty handed
😄 Joy was their honest reaction
📖 Real power produces real joy

## 🙇 Even The Devils Are Subject Unto Us Through Thy Name

"Subject unto us" means the evil spirits obeyed and had to yield.

This authority was never their own personal power to begin with.

It worked only because it was carried out in Jesus's own name.

The seventy were simply amazed that it actually worked when they tried it.

🙇 Subject means forced to obey
🚫 Not their own personal power
🏷️ Jesus's name carried the authority
📖 They were amazed it worked

## ⚡ I Beheld Satan As Lightning Fall From Heaven

Lightning falls suddenly, visibly, and all at once.

Jesus pictures Satan's defeat with that same sudden, dramatic motion.

This was not a slow retreat.

It was a sudden collapse of power.

The seventy's small victories on earth reflected a far bigger defeat already happening.

⚡ Lightning means sudden, visible fall
💥 Not a slow retreat
🌍 Earthly wins reflected a bigger defeat
📖 A visible sign of an unseen victory

## 🐍 Power To Tread On Serpents And Scorpions

This is not a promise that every believer can safely handle venomous animals.

Serpents and scorpions were common, real dangers on ancient roads.

Here they also stand as a picture for every kind of evil power.

Jesus is describing authority over the enemy's whole range of attacks.

🐍 Serpents pictured real danger
🦂 Scorpions pictured danger too
👿 Both also pictured evil power
📖 The authority covered every attack

## 🛡️ Nothing Shall By Any Means Hurt You

This does not promise the seventy would never suffer harm again.

It promises protection specifically for the mission Jesus had just sent them on.

Many of the apostles later suffered greatly for this same message.

The promise covered their assigned task, not every danger for the rest of their lives.

🛡️ Protection fit this specific mission
⚰️ Many later suffered for the message
🎯 Not a promise against all harm
📖 Protection matched the calling given

## 📇 Your Names Are Written In Heaven

This pictures a permanent record kept by God himself.

Ancient cities kept written registers listing their actual recognized citizens.

Having your name written in heaven meant true, lasting citizenship there.

Jesus says this matters far more than any power displayed on earth.

📇 A citizen register kept by God
🏙️ Pictures true heavenly citizenship
💪 Matters more than visible power
➡️ A quiet relationship outlasts any miracle

# Luke 10:21-22
# 🙏 Jesus Rejoices In Spirit
---
## 😊 In That Hour Jesus Rejoiced In Spirit

This is one of the few places in the Gospels where Jesus's own joy is described directly.

"In spirit" means this joy came from deep inside him, not just his face.

It happened right after hearing about the seventy's mission and Satan's defeat.

His joy was tied directly to the Father's plan succeeding.

😊 Jesus's own joy, rarely described
💗 In spirit means deep inside him
📣 Came right after their report
📖 Joy tied to the Father's plan

## 🚫 Hid These Things From The Wise And Prudent

This is not an attack on intelligence or education itself.

"Wise and prudent" describes people confident in their own understanding and status.

Their confidence often became pride that blocked them from receiving anything new.

Pride, not intelligence, was the real barrier the whole time.

🚫 Not against intelligence itself
🎓 Wise and prudent means confident, proud experts
🧱 Pride blocked their own understanding
📖 Pride was the real barrier

## 👶 Revealed Them Unto Babes

"Babes" does not mean literal infants here.

It pictures people humble enough to receive truth without proving themselves first.

A small child trusts without demanding proof or credentials first.

God chose to reveal his deepest truths to exactly that kind of humility.

👶 Babes pictures humble receivers
🙌 Trust without needing proof first
🔓 Humility opened what pride shut
📖 God favored humble hearts

## 🎁 All Things Are Delivered To Me Of My Father

Jesus makes a claim here that no ordinary teacher could honestly make.

He says the Father has handed everything over into his hands completely.

Knowing the Son and knowing the Father are tied together as one thing.

No one can fully know the Father except through the Son's own revealing.

🎁 All things given to the Son
🔗 Knowing Son and Father are tied
🚪 The Son reveals the Father
📖 A claim no other teacher could make

# Luke 10:23-24
# 👀 Blessed Are The Eyes Which See
---
## 🔄 He Turned Him Unto His Disciples, And Said Privately

Jesus shifts here from speaking to a crowd to speaking only to his followers.

Some teaching was meant for the whole crowd.

Other teaching was meant only for his closest followers.

"Privately" means this moment was personal, not a public announcement.

🔄 A shift from crowd to disciples
🤫 Privately means personal, not public
👥 Disciples received deeper access
📖 Closeness brought deeper conversation

## 🙌 Blessed Are The Eyes Which See The Things That Ye See

This is a statement about living at a uniquely privileged moment in history.

"Blessed" means genuinely fortunate, favored by God, not just lucky.

The disciples were watching God's own promises unfold right in front of them.

No generation before them had ever witnessed this moment arrive.

🙌 Blessed means favored by God
👁️ They watched promises unfold live
🕰️ No earlier generation saw this
📖 A privilege words could not capture

## 📜 Many Prophets And Kings Have Desired To See Those Things

These prophets and kings are figures from the Old Testament story.

People like Isaiah and David spoke about a coming Messiah for centuries.

They longed for this moment without ever living to see it happen.

The disciples were standing inside the very answer those men had prayed for.

📜 Prophets and kings from the Old Testament
⏳ They longed for this for centuries
🙏 They never lived to see it
📖 The disciples stood inside that answer

# Luke 10:25-29
# 📜 A Lawyer Tests Jesus
---
## ⚖️ A Certain Lawyer Stood Up, And Tempted Him

A "lawyer" here was an expert trained in the Jewish law of Moses.

"Tempted" in this context means testing Jesus, not necessarily trying to trap him.

Standing up to publicly question a traveling teacher was normal at that time.

This was a real test of Jesus's own understanding of Scripture.

⚖️ Lawyer means an expert in the law
🧪 Tempted means testing, not only trapping
🗣️ Public questioning was normal then
📖 A real test of Jesus's knowledge

## 🎁 What Shall I Do To Inherit Eternal Life

This question already contains a flawed assumption about how eternal life works.

"Inherit" normally means receiving something as a gift, not earning it through effort.

The lawyer asks about inheriting.

He is really thinking about earning it instead.

Jesus will answer him on his own terms before correcting him later with a story.

🎁 Inherit normally means receiving as a gift
🤔 He really meant earning it
🪞 Jesus met him on his own terms
📖 The question revealed his belief

## 🔄 What Is Written In The Law? How Readest Thou?

Jesus answers a question with a question of his own.

He turns the lawyer back to Scripture instead of offering a new answer.

This was a common rabbinic teaching method used to make a student think.

The lawyer already knew the answer before Jesus ever spoke it aloud.

🔄 A question answered with a question
🎓 A common rabbinic teaching method
📖 Jesus trusted Scripture to answer
➡️ The lawyer already knew the answer

## 📖 Thou Shalt Love The Lord Thy God With All Thy Heart

This command is lifted directly from Deuteronomy chapter six.

Every faithful Jew recited this exact command daily as part of regular prayer.

"Heart, soul, strength, and mind" together describe a love that holds nothing back.

This was the most familiar verse the lawyer could possibly have quoted.

📖 Quoted directly from Deuteronomy six
🗣️ Recited daily in Jewish prayer
💯 Describes total, undivided love
➡️ Love for God left nothing back

## 🧑 Thy Neighbour As Thyself

This command from Leviticus is quoted right alongside the one about loving God.

"Neighbour" in that culture usually meant a fellow Israelite, someone already like you.

Jesus will stretch that definition dramatically in the parable just ahead.

Loving God and loving people were never meant to be separated.

🧑 Quoted from the book of Leviticus
👨 Neighbour normally meant a fellow Israelite
🔗 Love for God and people tied together
📖 Its full reach was not yet clear

## ✅ Thou Hast Answered Right

Jesus confirms the lawyer gave a genuinely correct answer.

Knowing the right answer and actually living it out are two very different things.

The lawyer had passed a test of knowledge, not yet a test of obedience.

Jesus will expose that gap in the very next words he speaks.

✅ A genuinely correct answer
🧠 Knowledge is not the same as obedience
🔍 Jesus will expose the gap
📖 Right answers alone do not change a life

## ⚙️ This Do, And Thou Shalt Live

Jesus ties eternal life directly to actually doing what the law commands.

This was not Jesus offering salvation purely by human effort as a final answer.

It was Jesus showing the lawyer how impossible his own standard really was.

No one can perfectly keep this command through willpower alone.

⚙️ Do means actually living it out
🏔️ Showed how impossible the standard was
💪 No one keeps it by willpower
📖 The coming parable exposes the gap

## 😬 Willing To Justify Himself

"Justify" here means to prove he was already in the right.

The lawyer sensed Jesus's answer put real pressure on his own life.

Instead of admitting the gap, he reached for a narrower definition of neighbour.

Narrowing the definition was an attempt to make the command easier to keep.

😬 Justify means proving himself right
😣 He felt the pressure of the answer
🔍 He tried narrowing the definition
📖 Shrinking a command is not obeying it

## 🔍 And Who Is My Neighbour?

This question sounds sincere, but it is really a search for a loophole.

A narrower definition of neighbour meant fewer people he was obligated to love.

The lawyer wanted a clear boundary line he could point to and stop at.

Jesus is about to answer with a story that erases that boundary completely.

🔍 A search for a loophole
📏 He wanted a clear boundary
🚧 Jesus erases that boundary next
📖 The real question was how far love goes

# Luke 10:30-37
# 🩹 The Good Samaritan
---
## 🛣️ A Certain Man Went Down From Jerusalem To Jericho

This road drops thousands of feet in elevation over about seventeen miles.

The steep, winding path gave robbers plenty of hiding places among the rocks.

It was known for danger so widely that people nicknamed it the way of blood.

Jesus's listeners would have instantly recognized this setting as genuinely dangerous.

🛣️ A steep, dangerous mountain road
🪨 Rocks gave robbers hiding places
🩸 Known locally as the way of blood
📖 A real, recognizable danger to listeners

## 👥 Fell Among Thieves

Thieves on this road often worked in organized groups, not alone.

Travelers often tried to journey in larger groups for exactly this reason.

This man was apparently traveling that dangerous road completely by himself.

Being alone on that road already made him an easy target.

👥 Thieves often worked in groups
🚶 He was traveling completely alone
🎯 Being alone made him a target
📖 One choice set up the danger

## 👕 Stripped Him Of His Raiment, And Wounded Him

"Raiment" is an old word that simply means clothing.

Taking his clothing was theft, and it also erased any clue to his identity.

Without clothes, no one could tell what class or nation he belonged to.

That detail matters later when a stranger helps him without knowing who he was.

👕 Raiment simply means clothing
🕵️ Removing it hid his identity
❓ No one could tell who he was
📖 Help came without knowing who he was

## 💀 Leaving Him Half Dead

The man was left in the worst possible condition, neither clearly alive nor dead.

Anyone passing by had to stop and check closely just to know.

Touching a dead body made a person ceremonially unclean under Jewish law.

A priest or Levite might reasonably have worried about exactly that risk.

That worry still did not excuse walking past a man who needed help.

💀 Half dead meant unclear at a glance
🚫 Touching a corpse brought uncleanness
🙇 Priests feared that exact risk
📖 Fear still did not excuse walking by

## 🙏 There Came Down A Certain Priest That Way

A priest was exactly the kind of person expected to show mercy.

Priests represented God's own compassion to the ordinary people around them.

This priest had every religious reason to know what mercy required.

He also had the most to lose ceremonially by stopping to help.

🙏 Priests were expected to show mercy
📖 He knew what mercy required
⚠️ He had the most ceremonial risk
➡️ His position made the failure sharper

## 🚶 He Passed By On The Other Side

Crossing to the far side of the road was a deliberate choice.

This was not someone who simply failed to notice the wounded man.

He saw him clearly enough to actively steer around him.

Avoidance is its own kind of decision, not an accident.

🚶 Crossing the road was deliberate
👁️ He clearly saw the man
🙈 Avoidance took active effort
📖 Avoidance is a decision, not an accident

## 🏛️ Came And Looked On Him, And Passed By On The Other Side

A Levite assisted priests with the daily duties of temple worship.

Levites were respected religious figures, just one step below the priests themselves.

This Levite actually came closer and looked directly at the wounded man.

Looking closely made his decision to still walk away even harder to excuse.

🏛️ Levites assisted with temple duties
👀 He looked closely this time
🚶 He still chose to walk away
📖 Religious duty failed him twice

## ⚔️ A Certain Samaritan, As He Journeyed, Came Where He Was

Samaritans and Jews shared a long, bitter history of mutual hatred.

Samaritans were viewed by many Jews as mixed race, half pagan, and unclean.

Jesus's listeners would have expected the Samaritan to be the villain of this story.

Choosing a Samaritan as the hero reversed their expectations on purpose.

⚔️ Jews and Samaritans shared old hatred
🚫 Samaritans were viewed as unclean
🔀 Jesus reversed the expected villain
📖 The least expected man became the hero

## 💗 He Had Compassion On Him

"Compassion" here means a gut level feeling that moves a person to act.

It is stronger than simply feeling sorry for someone from a distance.

This compassion crossed every boundary of race, religion, and old resentment at once.

The feeling did not stay a feeling.

It turned immediately into real action.

💗 Compassion means feeling that moves to act
🚧 It crossed race and religion
⚡ Feeling turned instantly into action
📖 Real compassion always does something

## 🫒 Bound Up His Wounds, Pouring In Oil And Wine

Oil and wine were common, practical first aid supplies in that world.

Oil was used to soothe and soften an open wound.

Wine worked as a crude but genuinely effective antiseptic for cleaning it.

A traveling Samaritan simply happened to be carrying both supplies with him.

🫒 Oil soothed the wound
🍷 Wine helped clean it
🎒 Ordinary travel supplies, not special gear
📖 Mercy used whatever was on hand

## 🐴 Set Him On His Own Beast

The Samaritan gave up his own ride for a total stranger.

This meant the Samaritan himself now had to walk the rest of that road.

He took on real personal risk and real discomfort for this man.

Mercy here cost him something concrete, not just a kind feeling.

🐴 He gave up his own ride
🚶 He walked the risky road himself
💸 Mercy cost him something real
📖 Compassion traded comfort for need

## 🏨 Brought Him To An Inn

Ancient inns along that road were rough, basic, and often unsafe places.

Innkeepers in that era had a known reputation for dishonesty and overcharging.

The Samaritan still trusted this stranger's care to an imperfect stranger himself.

He did not simply drop the man off and quietly disappear.

🏨 Inns then were rough and unsafe
💰 Innkeepers often had bad reputations
🤝 He stayed involved anyway
📖 Mercy did not stop at dropping him off

## 🪙 Took Out Two Pence, And Gave Them To The Host

"Two pence" refers to two Roman denarii, each worth about a day's wage.

Two days' wages was enough to cover real food, shelter, and basic care.

This was a real, costly, calculated gift, not a token gesture.

The Samaritan also promised to repay anything more that was spent on the man.

🪙 Two pence meant two days' wages
💵 Enough to cover real care
🤲 A real cost, not a gesture
📖 He even promised to repay more

## 🔄 Which Now Of These Three, Thinkest Thou, Was Neighbour

Jesus flips the lawyer's original question completely around.

The lawyer had asked who qualifies as a neighbour, as if drawing a boundary.

Jesus instead asks who actually acted like a neighbour toward someone in need.

That shift moves the question from a label to a behavior.

🔄 Jesus flipped the lawyer's question
📏 From a label to a behavior
➡️ From who deserves love to who gives it
📖 The whole point of the command shifted

## 📖 He That Shewed Mercy On Him

"Shewed" is simply an old spelling of the word showed.

The lawyer cannot even bring himself to say the word Samaritan out loud.

He answers by describing the action instead of naming the man who did it.

Even his careful wording reveals how deep the old prejudice still ran.

📖 Shewed is an old spelling of showed
🙊 He avoided saying Samaritan
😣 His wording revealed lingering prejudice
➡️ Mercy stood true despite his silence

## 🎯 Go, And Do Thou Likewise

Jesus ends the conversation with a direct command, not a theory.

He never answers the lawyer's original question about who his neighbour actually is.

He instead tells the lawyer to go and become that kind of neighbour himself.

The parable was always aimed at changed action, not settled debate.

🎯 A command, not a theory
🙋 Go and become that neighbour
🛑 Mercy was never just a definition
📖 Aimed at action, not debate

# Luke 10:38-42
# 🍽️ Mary And Martha
---
## 🏠 A Certain Woman Named Martha Received Him Into Her House

Receiving a guest like this was a significant act of hospitality in that culture.

Hosting a traveling teacher meant real cost in food, space, and time.

Martha's willingness to open her home shows real devotion to Jesus from the start.

This hospitality sets up the tension that comes later in the story.

🏠 Hosting cost real time and food
❤️ Showed real devotion to Jesus
⚠️ Sets up the coming tension
📖 Her heart toward him was genuine

## 👭 A Sister Called Mary

Mary and Martha are introduced here as sisters sharing one household.

This same pair of sisters appears again later in the Gospel of John.

John adds their brother Lazarus, whom Jesus famously raised from the dead.

Even a brief introduction sets up a meaningful contrast between the two sisters.

👭 Mary and Martha were sisters
🕯️ Their brother was Lazarus
🔀 A contrast begins here
📖 They reappear in John's Gospel

## 🪑 Sat At Jesus’ Feet, And Heard His Word

Sitting at a teacher's feet was the normal posture of a serious student.

Rabbis taught seated on a raised place.

Students sat on the ground around them to listen.

This posture was almost always reserved for men in that culture.

Mary taking that posture was a bold, unusual choice for a woman.

🪑 Sitting at the feet meant being a student
🚺 Usually reserved for men only
💪 A bold choice for a woman
📖 Jesus welcomed her as a student

## ⚓ Martha Was Cumbered About Much Serving

"Cumbered" means weighed down or overwhelmed by a burden.

Martha was busy with real, necessary work preparing a meal for a guest.

The burden was not the work itself.

It was her growing stress about getting it all done.

Good work done with an anxious heart still feels like a burden.

⚓ Cumbered means weighed down
🍳 Her work itself was necessary
😣 Her stress was the real problem
📖 Anxious hearts turn work into burden

## 😤 Dost Thou Not Care That My Sister Hath Left Me To Serve Alone?

Martha's question to Jesus sounds more like a complaint than an actual question.

She assumes Jesus simply has not noticed her situation.

Her frustration is aimed at Mary, but her words are directed straight at Jesus.

Asking him to make Mary help reveals what Martha thinks he should value most.

😤 Sounds more like a complaint
🙈 She assumed Jesus did not notice
🎯 Aimed at Mary, spoken to Jesus
📖 Her words revealed her own values

## 💬 Martha, Martha, Thou Art Careful And Troubled About Many Things

Repeating a name twice like this was a gentle, affectionate way to speak.

"Careful" here is an old word meaning full of worry, not simply attentive.

Jesus is not scolding her work.

He is naming her inner anxiety directly.

"Many things" describes a mind pulled in several directions at once.

💬 Repeated name meant gentle affection
😟 Careful meant anxious, not attentive
🧵 Many things meant a scattered mind
📖 Tender correction, not harsh rebuke

## 🎯 One Thing Is Needful

Jesus narrows everything down to a single real priority.

Many tasks might feel urgent, but only one thing is actually necessary.

Sitting and listening to Jesus mattered more than any meal being prepared.

This did not mean hospitality itself was worthless.

It meant hospitality should never crowd out time with Jesus himself.

🎯 Only one thing truly necessary
🍽️ A meal mattered less than listening
🙌 Hospitality still had real value
📖 Nothing should crowd out time with Jesus

## 🌟 Mary Hath Chosen That Good Part

"That good part" refers to the choice to sit and listen to Jesus.

Mary was not praised for being lazy or avoiding necessary work.

She was praised for correctly recognizing what mattered most in that moment.

Her choice would never be taken from her, unlike a meal that gets eaten and forgotten.

Listening to Jesus produces something that quietly outlasts every other task.

🌟 That good part meant choosing to listen
🚫 Not praised for avoiding work
🏆 Praised for right priorities
📖 Listening outlasts every other task
`.trim();

export const LUKE_TEN_PERSONAL_SECTIONS = parseLukeTenRawNotes(LUKE_TEN_RAW_NOTES);
