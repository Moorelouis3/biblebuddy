export type MatthewTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTenRawNotes(rawText: string): MatthewTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 10:${startVerse}` : `Matthew 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 10 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TEN_RAW_NOTES = `# Matthew 10:1-4
# ⚡ He Gave Them Power Against Unclean Spirits
---
## ⚡ He Gave Them Power Against Unclean Spirits

Up to this point, only Jesus has done these miracles in Matthew.

Now he hands that same authority to twelve ordinary men.

Power here means a delegated ability, not something they earned on their own.

Unclean spirits were seen as evil forces causing sickness and chaos in a person.

This authority covers the same things Jesus has been doing since chapter eight.

⚡ Jesus delegates his own authority
🧍 Twelve ordinary men receive it
👻 Unclean spirits means evil forces
📖 Their power mirrors his own work

---

## 📜 Now The Names Of The Twelve Apostles Are These

Until this verse, Matthew only called them disciples.

Disciple means a student who learns from a teacher.

Apostle means someone sent out to deliver a message with real authority.

Luke says Jesus picked these twelve after spending a whole night in prayer.

📜 Disciple means a student or follower
🚀 Apostle means one who is sent
🌙 Jesus chose them after prayer
📖 This title shift means a new job

---

## 🎣 Simon, Who Is Called Peter, And Andrew His Brother

Matthew lists the apostles in pairs, not as one long unordered list.

Simon called Peter and Andrew were brothers, both fishermen from chapter four.

James the son of Zebedee and John his brother worked in that same fishing business.

Mark's Gospel says Jesus sent the twelve out two by two.

Family ties and work partnerships become the foundation for this new assignment.

🎣 Simon and Andrew were fishermen
👬 James and John were brothers too
👥 Jesus sent them out two by two
📖 Partnerships become the foundation here

---

## 🤝 Thomas, And Matthew The Publican

Philip and Bartholomew appear here with almost nothing said about them elsewhere.

Thomas becomes famous later in John's Gospel for doubting the resurrection.

Matthew finishes his own name with a label he could have left out.

The publican means tax collector, the exact job chapter nine already introduced.

Naming himself this way shows humility, not forgetfulness.

❓ Philip and Bartholomew stay mostly unknown
🤔 Thomas later doubts the resurrection
💰 Publican means tax collector
📖 Matthew labels himself with humility

---

## 🏷️ James The Son Of Alphaeus, And Lebbaeus, Whose Surname Was Thaddaeus

This James is a different man from James the son of Zebedee listed earlier.

Ancient writers sometimes needed two names to tell apostles with the same first name apart.

Lebbaeus and Thaddaeus are not two different men, just two names for one man.

Having a surname or nickname alongside a birth name was a common practice then.

This kind of double naming shows up elsewhere among the twelve as well.

🏷️ A second James, not Zebedee's son
🔁 Lebbaeus and Thaddaeus are one man
📛 Double names were common back then
📖 Even the list needs careful reading

---

## 🗡️ Simon The Canaanite

Canaanite here does not mean Simon came from the land of Canaan.

The word likely comes from an Aramaic term meaning zealous or eager.

Zealots wanted armed revolt against Roman occupation of Israel.

Jesus places a former revolutionary right beside Matthew, a man who once worked for Rome.

Only the kingdom of God could hold these two men together on one team.

🗡️ Canaanite likely means zealous or eager
⚔️ Zealots wanted revolt against Rome
💰 Matthew once worked for Rome instead
📖 Only Jesus unites such opposites

---

## 🪙 Judas Iscariot, Who Also Betrayed Him

Iscariot likely means man of Kerioth, naming the town he came from.

He may be the only apostle in this list not from Galilee.

Judas is still just a name here, yet Matthew already adds a warning.

Who also betrayed him tells the reader the ending before the story gets there.

Even a list of twelve faithful friends includes the one who will not stay faithful.

🪙 Iscariot likely means man of Kerioth
🗺️ Maybe the only apostle outside Galilee
⚠️ Matthew warns readers early
📖 One name here will not stay faithful

# Matthew 10:5-8
# 🐑 The Lost Sheep Of The House Of Israel
---
## 🚷 Go Not Into The Way Of The Gentiles

This mission comes with a clear boundary before it even begins.

The way of the Gentiles means the normal roads and towns outside Jewish territory.

Jesus limits the twelve to their own people for this first sending.

Chapter twenty eight later sends the same apostles to every nation on earth.

This early limit is temporary, not a permanent wall around the good news.

🚷 A clear boundary opens the mission
🗺️ Gentile towns are off limits for now
⏳ This limit is only temporary
📖 Chapter twenty eight later removes it

---

## 🏘️ Into Any City Of The Samaritans Enter Ye Not

Samaritans descended from intermarriage between Israelites and foreign settlers centuries earlier.

Jews and Samaritans had a long, bitter history of mutual distrust by this time.

This restriction sits right alongside the ban on Gentile towns in the same verse.

The book of Acts later shows the gospel reaching Samaria directly.

A wall drawn here in chapter ten comes down within a few years of this moment.

🏘️ Samaritans had mixed ancestry and worship
💔 Jews and Samaritans distrusted each other
🚧 This ban matches the Gentile one
📖 Acts later removes this wall too

---

## 🐑 The Lost Sheep Of The House Of Israel

Lost here does not mean Israel had vanished or gone missing geographically.

It means the people had wandered from God, much like scattered sheep without a shepherd.

House of Israel points to the covenant people descended from Jacob.

Jesus sends help first to the family he already made promises to.

This order reflects a pattern seen later in the New Testament, to the Jew first.

🐑 Lost means wandered, not missing
🏠 House of Israel means Jacob's covenant family
🥇 Israel receives the message first
📖 A pattern repeated later in scripture

---

## 📢 The Kingdom Of Heaven Is At Hand

This exact announcement already opened John the Baptist's and Jesus's own preaching.

At hand means close enough to reach, not simply coming sometime later.

Kingdom of heaven describes God's rule breaking into ordinary life right now.

Now the twelve carry the very same message Jesus has been preaching himself.

The announcement never changes, only the number of people proclaiming it grows.

📢 Same message John and Jesus both used
⏰ At hand means close, not distant
👑 God's rule breaks into life now
📖 The same message now carried further

---

## 🩺 Cleanse The Lepers, Raise The Dead

Healing the sick repeats work already seen throughout chapters eight and nine.

Cleansing lepers and raising the dead are new additions to their assignment now.

Casting out devils continues the very same authority given back in verse one.

These four tasks match exactly what Jesus himself has already been doing.

The twelve are not inventing new miracles, they are continuing his.

🩺 Healing repeats earlier chapters
➕ Cleansing lepers and raising the dead are new
🔗 Casting out devils continues verse one
📖 The twelve continue what Jesus started

---

## 🎁 Freely Ye Have Received, Freely Give

The disciples did not pay Jesus for the power they just received.

Freely here means as a gift, with no cost attached either way.

Charging money for healing or teaching would turn a gift into a business.

This command protects the integrity of the message they are about to carry.

Receiving grace and then selling it would contradict the whole point of grace.

🎁 They received this power as a gift
🚫 No charging money for healing or teaching
🛡️ This protects the message's integrity
📖 Grace was never meant to be sold

# Matthew 10:9-15
# 🎒 Provide Neither Gold, Nor Silver, Nor Brass
---
## 💰 Provide Neither Gold, Nor Silver, Nor Brass In Your Purses

These three metals list coin values from highest to lowest, gold, silver, then brass.

Purses here were small belts or sashes used to carry money against the body.

Jesus tells the twelve not to fund this trip with their own savings at all.

Their support is meant to come from the people they serve along the way.

This instruction trains them to depend on God's provision instead of their own supply.

💰 Gold, silver, brass list coin values
👝 Purses means a worn money belt
🙅 No self funding for this trip
📖 Trust God's provision instead of savings

---

## 🎒 Nor Scrip For Your Journey

Scrip names a small bag travelers used to carry food and supplies.

Leaving it behind meant leaving behind their own backup food supply too.

Every item banned in this verse removes one layer of self reliance.

The twelve travel lighter than almost any traveler would normally dare.

Their lightness becomes a visible sign of trust placed in those who host them.

🎒 Scrip means a travel food bag
🚫 No backup supply allowed
🪶 Each banned item removes self reliance
📖 Their light travel shows real trust

---

## 👕 Neither Two Coats, Neither Shoes, Nor Yet Staves

A spare coat, spare shoes, and a walking staff were normal travel gear.

Jesus removes even the ordinary backup items most travelers would carry.

Mark's account of this same sending allows a staff, a small difference worth noting honestly.

The Gospels do not always repeat identical details, since each writer picks what fits his point.

Matthew's version pushes the picture further, total dependence rather than partial preparation.

👕 Normal travel gear is stripped away
🥾 Even a spare pair of shoes is cut
🪵 Mark's version allows a staff instead
📖 The point is total dependence, not gear

---

## 🍽️ For The Workman Is Worthy Of His Meat

Meat in the King James Bible usually means food in general, not just animal flesh.

This is a well known proverb about fair pay for honest work.

A worker deserves support from the people benefiting from that work.

This line explains why they can travel without money or supplies at all.

Their needs will be met by those they serve, not by what they packed.

🍽️ Meat here means food in general
⚖️ A worker deserves fair support
🤝 Hosts provide what travel supplies would have
📖 This explains why they travel empty handed

---

## 🏠 Enquire Who In It Is Worthy

Worthy here describes a household willing to welcome and support a stranger.

The twelve are told to find one such home in each town, not many.

Staying put protects them from chasing better food or comfort elsewhere in town.

This single minded focus keeps the mission, not personal comfort, as the priority.

Their host becomes their base of operations for as long as they remain.

🏠 Worthy means willing to host them
🔎 Find one home, not several
🎯 Comfort is not the real goal
📖 One host becomes their base

---

## 🤝 When Ye Come Into An House, Salute It

Salute here means far more than a casual hello at the door.

Luke's version of this same instruction records actual words of greeting.

A greeting like this functioned as a spoken blessing, not just a polite custom.

Words carried real weight in this culture, especially words meant as a blessing.

This small moment sets up exactly what the next verse explains about that peace.

🤝 Salute means more than a hello
🕊️ Luke's version adds the actual words
💬 A greeting worked as a real blessing
📖 This sets up the next verse

---

## ☮️ Let Your Peace Come Upon It

Peace here acts almost like an object that can be given or taken back.

If the home welcomes them, that spoken blessing settles there and takes effect.

If the home refuses them, the blessing simply returns to the one who gave it.

Nothing offered in Jesus's name on this mission goes to waste.

Rejection costs the household something real, not the messenger who gave the blessing.

☮️ Peace acts like a spoken gift
🏠 A welcoming home keeps the blessing
↩️ A refusing home sends it back
📖 Nothing given in Jesus's name is wasted

---

## 👣 Shake Off The Dust Of Your Feet

This was a real gesture, not just a figure of speech.

Jewish travelers sometimes shook dust off their feet after leaving Gentile territory.

Using that same gesture against an Israelite town sends a strong message.

It treats an unreceptive town the way someone would treat pagan ground.

The gesture formally releases the messengers from any further responsibility for that town.

👣 Dust shaking was a real gesture
🗺️ Normally used after leaving Gentile land
⚠️ Here it is used against Israelite towns
📖 It releases them from further responsibility

---

## 🔥 More Tolerable For Sodom And Gomorrha

Sodom and Gomorrha were two cities destroyed for their wickedness in Genesis nineteen.

For centuries, their names stood as the worst example of sin in Israel's memory.

Jesus says rejecting this message brings worse judgment than that ancient destruction.

More revelation brings more responsibility, not less, for the town that turns it away.

A quiet refusal at someone's door can carry heavier weight than Israel ever imagined.

🔥 Sodom and Gomorrha were destroyed for sin
📜 Their name stood for Israel's worst memory
⚖️ Rejecting this message is judged more harshly
📖 More revelation means more responsibility

# Matthew 10:16-23
# 🐺 Sheep In The Midst Of Wolves
---
## 🐺 Sheep In The Midst Of Wolves

Jesus describes the exact danger these twelve are about to walk into.

Sheep have no natural defense against a wolf's attack at all.

He is not hiding the risk from them before they leave.

Every instruction in this chapter assumes real, serious danger ahead.

Honesty about danger comes before the sending, not after it starts.

🐺 Wolves describe real danger ahead
🐑 Sheep have no natural defense
🗣️ Jesus hides none of the risk
📖 Honesty comes before the sending

---

## 🕊️ Wise As Serpents, And Harmless As Doves

Serpents were seen as sharp, careful, and hard to catch off guard.

Doves were seen as gentle creatures with no sting or bite at all.

Jesus asks for both qualities at once, not one instead of the other.

Shrewd thinking without gentle character can turn cold and manipulative.

Gentle character without shrewd thinking can turn naive and easily fooled.

🐍 Serpents picture sharp, careful thinking
🕊️ Doves picture gentle, harmless character
⚖️ Both qualities are needed together
📖 Either alone becomes a problem

---

## ⚖️ They Will Deliver You Up To The Councils

Councils here means local Jewish courts with real power to punish people.

Synagogues served as both places of worship and places of local discipline.

Scourge means a formal beating carried out as a legal punishment.

Jesus warns that religious institutions, not just hostile strangers, will turn against them.

Persecution will come from familiar, respected places, not only from the outside world.

⚖️ Councils were local Jewish courts
🕍 Synagogues could also punish, not just teach
🩸 Scourge means a formal legal beating
📖 Danger comes from familiar places too

---

## 👑 Brought Before Governors And Kings For My Sake

The threat now grows beyond Jewish courts to Roman and foreign rulers.

Governors and kings represent the highest political power of that world.

For my sake means their only crime will be loyalty to Jesus.

For a testimony means even a trial becomes a chance to speak the truth.

Jesus turns their worst moments into an opportunity he has already planned for.

👑 Threat grows to Roman rulers
⚠️ Their only crime is loyalty to Jesus
🗣️ A trial becomes a testimony
📖 Jesus plans for their worst moments

---

## 🧠 Take No Thought How Or What Ye Shall Speak

Take no thought here means do not worry in advance, not avoid thinking altogether.

This promise covers the moment of arrest and trial specifically, not everyday life.

It is not a general excuse to skip studying or preparing elsewhere.

Jesus promises the right words will come exactly when they are needed most.

This is comfort for a courtroom, not a rule for every situation.

🧠 Take no thought means do not worry
⏰ This applies to arrest and trial moments
📚 It is not a rule against preparing
📖 The right words come when needed

---

## 🕊️ The Spirit Of Your Father Which Speaketh In You

The words given in that moment will not really be their own.

Jesus names the Holy Spirit here as the Spirit of your Father.

This same Spirit has already been present since chapter three at Jesus's own baptism.

A frightened disciple on trial is never actually speaking alone.

God supplies the courage and the content in the same breath.

🕊️ The Holy Spirit supplies the words
👑 Called the Spirit of your Father
🔁 Already seen at Jesus's own baptism
📖 No disciple truly speaks alone

---

## ⚔️ The Brother Shall Deliver Up The Brother To Death

This verse names the closest human relationships, brother, father, child.

Following Jesus is about to divide families that once stood together.

Handing someone over to death was the most extreme form of betrayal possible.

Jesus does not soften this warning or pretend it will be rare.

This theme returns later in the chapter when family conflict comes up again.

⚔️ Closest family ties get named here
💔 Jesus does not soften this warning
☠️ Betrayal reaches the most extreme level
📖 This theme returns later in the chapter

---

## 🛡️ He That Endureth To The End Shall Be Saved

Hated of all men describes hostility with almost no exceptions.

For my name's sake makes clear the real target is their loyalty to Jesus.

Endureth means remaining faithful through hardship, not simply staying alive.

Saved here points to final salvation, not rescue from present suffering.

The promise is not that persecution ends, but that faithfulness through it is rewarded.

🛡️ Hated of all men, almost no exceptions
🎯 The real target is loyalty to Jesus
🏁 Endureth means staying faithful, not just alive
📖 Faithfulness through persecution is what gets rewarded

---

## 🏃 When They Persecute You In This City, Flee Ye Into Another

Enduring persecution does not mean refusing to ever run from danger.

Jesus gives explicit permission here to leave a hostile town for a safer one.

Courage and caution are not opposites in this instruction.

Fleeing to keep preaching somewhere else is still obedience, not failure.

The mission continues even when one city shuts its doors.

🏃 Fleeing danger is explicitly allowed
🛡️ Courage and caution work together
➡️ Fleeing still serves the mission
📖 One closed door does not end it

---

## ⏳ Till The Son Of Man Be Come

This phrase is genuinely difficult, and honest teaching says so plainly.

Many scholars connect it to judgment coming on Jerusalem within that generation.

Others read it as pointing further ahead to Christ's final return.

The text itself does not settle which reading is correct.

What stays clear either way is that the mission keeps going without running out of towns.

⏳ A genuinely difficult phrase to pin down
📜 Some link it to judgment on Jerusalem
🔭 Others see it pointing to the future
📖 The mission never runs out of towns

# Matthew 10:24-31
# 🐦 Ye Are Of More Value Than Many Sparrows
---
## 🎓 The Disciple Is Not Above His Master

This is a simple, well known proverb about rank and expectation.

A student should not expect better treatment than the teacher receives.

A servant should not expect better treatment than the master of the house.

Jesus uses this logic to prepare the twelve for what comes next.

If the world treats him with hostility, his followers should expect the same.

🎓 A student expects no better than the teacher
🏠 A servant expects no better than the master
🧍 Jesus applies this logic to himself
📖 His followers should expect the same treatment

---

## 👹 If They Have Called The Master Of The House Beelzebub

Beelzebub began as the name of a pagan god worshipped outside Israel.

By this time, the name had become a common slur for Satan himself.

Chapter nine already recorded the Pharisees using this exact accusation against Jesus.

If people insult the master this way, his household should expect the same insult.

That earlier accusation was not a one time insult, it previews a pattern.

👹 Beelzebub became a slur for Satan
🗣️ Chapter nine already used this insult
🏠 The household gets the same insult too
📖 One accusation previews a pattern

---

## 🔦 Nothing Covered That Shall Not Be Revealed

Fear of slander often comes from worrying that lies will stand forever.

Jesus promises that every hidden truth will eventually come into the open.

This is not a threat, it works as real comfort for the twelve.

False accusations like the Beelzebub charge will not have the final word.

Truth has a built in expiration date on every lie told against it.

🔦 Hidden truth eventually comes out
💬 This works as comfort, not threat
🗣️ False accusations do not get the last word
📖 Every lie has a built in expiration

---

## 🏠 Preach Ye Upon The Housetops

Flat rooftops were common in this region and used for daily life and gatherings.

A person standing on a housetop could be heard across much of a town.

What Jesus taught privately to the twelve was never meant to stay private.

Housetops here pictures the boldest, most public way to proclaim something.

Fear should shrink, not the volume of what they have been taught.

🏠 Flat rooftops worked as public platforms
📢 Private teaching was never meant to stay private
🔊 Housetops pictures the boldest kind of proclaiming
📖 Fear should shrink, not their voice

---

## 💀 Fear Not Them Which Kill The Body

Jesus ranks two different kinds of fear against each other here.

Killing the body is the worst thing a human enemy can do.

Even that worst case has a clear limit, it cannot reach the soul.

This verse is not denying that physical death is real or painful.

It simply says physical death is not the deepest danger that exists.

💀 Two different fears are ranked here
🧍 Human enemies can only reach the body
🚧 Even death has a clear limit
📖 Physical death is not the deepest danger

---

## 🔥 Able To Destroy Both Soul And Body In Hell

Hell translates a word tied to a real valley outside Jerusalem, Gehenna.

That valley had a history of fire and judgment imagery attached to it.

Jesus uses the image to describe final judgment, not a place on a map.

Only God has power over both the body and the soul after death.

That is the fear Jesus says actually deserves real weight.

🔥 Hell points back to a real valley
⚖️ Jesus uses it as judgment imagery
👑 Only God holds power over soul and body
📖 This is the fear that deserves weight

---

## 🐦 Two Sparrows Sold For A Farthing

A farthing was one of the smallest coins in common use.

Sparrows were sold cheaply in the market, often for food.

Jesus picks the least valuable bird people actually bought and sold.

Even that small, cheap creature does not fall to the ground unnoticed by God.

If God tracks something this small, nothing about his people goes unnoticed either.

🐦 Sparrows were the cheapest birds sold
🪙 A farthing was a very small coin
👀 God notices even a sparrow's fall
📖 Nothing about his people goes unnoticed

---

## 💇 The Very Hairs Of Your Head Are All Numbered

This image goes even further than the sparrow example just given.

Nobody actually counts their own hairs, let alone tracks the number daily.

Jesus says God's knowledge reaches that same impossible level of detail.

This is not about hair specifically, it pictures total, intimate awareness.

Nothing about a single person is too small for God to know.

💇 An even more intimate image than sparrows
🔢 Nobody could count their own hairs
👁️ God's knowledge reaches that level of detail
📖 Nothing about a person is too small

---

## 📈 Ye Are Of More Value Than Many Sparrows

This line gathers up the sparrow and the hair examples together.

If God notices something as small as a sparrow's fall, he notices people even more.

The conclusion is simple, fear should lose its grip in light of this.

Value here is not about usefulness, it is about belonging to God.

Twelve frightened men are sent out carrying this exact promise with them.

📈 This verse gathers the two examples above
⚖️ God's attention to people is greater
💪 Fear should lose its grip here
📖 Value comes from belonging to God

# Matthew 10:32-39
# ⚔️ I Came Not To Send Peace, But A Sword
---
## 🗣️ Whosoever Shall Confess Me Before Men

Confess here means openly identifying with Jesus in front of other people.

This is a public act, not just a private, personal belief.

Jesus promises to do the same thing for that person before the Father.

Heaven responds to what happens on earth in this specific way.

Open loyalty on earth receives open loyalty in return before God.

🗣️ Confess means publicly identifying with Jesus
👀 This is public, not only private belief
🔁 Jesus promises the same response in heaven
📖 Open loyalty gets open loyalty back

---

## 🙅 Whosoever Shall Deny Me Before Men

This verse states the exact opposite warning as a mirror image.

Denying Jesus publicly brings a matching denial before the Father.

Peter will do exactly this later, three times in one night.

Jesus already knows this failure is coming for one of them.

The warning here is not abstract, it is already pointed at someone real.

🙅 The exact opposite warning as a mirror
🔁 Denial brings a matching denial back
🐓 Peter will do this three times later
📖 Jesus already knows who will fail

---

## ⚔️ I Came Not To Send Peace, But A Sword

Many expected the promised king to bring immediate, visible peace to the world.

Jesus says that peaceful picture is not what his first arrival brings.

Sword here is a picture of division, not a call to physical violence.

Choosing to follow Jesus forces a decision that not everyone around a person will make.

That decision, multiplied across a family or a town, creates real conflict.

⚔️ Sword pictures division, not violence
👑 Peace was expected from the promised king
🤔 Following Jesus forces a real choice
📖 That choice creates real conflict

---

## 👪 Set A Man At Variance Against His Father

Variance means open conflict, not just minor disagreement at the dinner table.

This language echoes the prophet Micah's description of a troubled, divided time.

Jesus says choosing him will cause exactly this kind of family division.

Father against son and daughter against mother is named specifically here.

The gospel does not promise every household will agree once it arrives.

👪 Variance means real conflict, not minor tension
📜 This echoes the prophet Micah's words
⚔️ Following Jesus can divide a family
📖 Agreement is never guaranteed, even at home

---

## 💔 A Man's Foes Shall Be They Of His Own Household

Foes usually brings to mind strangers or enemies from outside a person's life.

Jesus says the opposite can happen once someone chooses to follow him.

The people closest to someone can become the hardest to stay faithful around.

This completes the warning started two verses earlier about family conflict.

Following Jesus can cost comfort at the very table where someone eats dinner.

💔 Foes can come from inside the home
👪 The closest people can resist the hardest
🔁 This completes the earlier warning
📖 Following Jesus can cost comfort at home

---

## ❤️ He That Loveth Father Or Mother More Than Me

This is not a command to stop loving family members at all.

Ancient Hebrew often used love and hate to describe priority, not pure emotion.

Jesus is asking for first place, not the only place, in someone's loyalty.

Worthy here means fit to belong to him, not earning value through performance.

Every other relationship in a person's life has to answer to this one first.

❤️ This is about priority, not pure emotion
🥇 Jesus asks for first place, not only place
🏷️ Worthy means fit to belong to him
📖 Every relationship answers to this one first

---

## ✝️ He That Taketh Not His Cross

A cross at this point in the story meant one thing, a Roman execution device.

Condemned criminals carried their own crossbeam to the place where they would die.

Jesus asks his followers to picture that exact level of surrender.

Taking up a cross means treating your own life as already given away.

This image carries real weight long before Jesus carries his own cross later in this book.

✝️ A cross meant a Roman execution device
🚶 The condemned carried their own crossbeam
💀 It pictures total surrender of a life
📖 Jesus carries this same cross later

---

## 🔄 He That Findeth His Life Shall Lose It

This verse is built entirely around a sharp, deliberate contradiction.

Clinging tightly to comfort and safety leads to a deeper kind of loss.

Giving up comfort and safety for Jesus leads to a deeper kind of life.

Life here means more than staying alive, it means a life that actually matters.

The math only makes sense once Jesus himself becomes the reason for the trade.

🔄 A deliberate contradiction sits at the center
🔒 Clinging to comfort leads to real loss
🔓 Giving up comfort leads to real life
📖 The trade only makes sense because of Jesus

# Matthew 10:40-42
# 🥤 A Cup Of Cold Water Only
---
## 🤝 He That Receiveth You Receiveth Me

Receiving a messenger in this culture counted as receiving the one who sent them.

The twelve carry Jesus's own authority wherever this mission takes them.

Welcoming an apostle into a home is treated the same as welcoming Jesus himself.

This principle gives enormous weight to how a town treats a stranger at the door.

Hospitality toward these men is really hospitality toward Jesus in disguise.

🤝 Receiving a messenger means receiving the sender
👑 The twelve carry Jesus's own authority
🚪 Hospitality to them is hospitality to him
📖 A stranger at the door matters greatly

---

## 🔗 Receiveth Me Receiveth Him That Sent Me

This verse extends the same chain one link further than the first half.

Welcoming the twelve reaches all the way back to welcoming God the Father.

Jesus describes himself here as sent, just as the Father sent him.

The messenger, the Son, and the Father are tied together in one line.

A small act of welcome connects all the way up to heaven itself.

🔗 The chain extends one link further
👑 Welcoming them reaches the Father too
📨 Jesus describes himself as sent
📖 A small welcome connects up to heaven

---

## 🏆 Receive A Prophet's Reward

A prophet's reward and a righteous man's reward are named side by side here.

In the name of means welcoming someone specifically because of who they represent.

Motive matters more here than simply being a generous or friendly host.

Someone who welcomes God's messenger for the right reason shares in that messenger's reward.

This is not about status, it is about recognizing and honoring what God is doing.

🏆 Reward is shared with the right motive
🎯 Means recognizing who the guest truly is
🤝 Hosting is not just generosity
📖 Honoring God's work brings a shared reward

---

## 🥤 A Cup Of Cold Water Only

This is the smallest possible act of kindness Jesus could name.

Little ones here likely means ordinary, humble followers, not children specifically.

Even water, the cheapest and most available gift, counts before God.

In no wise lose his reward promises that nothing done for Jesus is wasted.

The size of the gift matters far less than the heart behind it.

🥤 The smallest possible act of kindness
🧍 Little ones means humble followers, not children
💧 Even water counts as a real gift
📖 Nothing done for Jesus goes unrewarded
`.trim();

export const MATTHEW_TEN_PERSONAL_SECTIONS = parseMatthewTenRawNotes(MATTHEW_TEN_RAW_NOTES);
