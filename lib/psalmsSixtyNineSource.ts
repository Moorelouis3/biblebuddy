export type PsalmsSixtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyNineRawNotes(rawText: string): PsalmsSixtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+69:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 69 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+69:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+69:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 69 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 69,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 69:${startVerse}` : `Psalms 69:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 69 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_NINE_RAW_NOTES = `# Psalms 69:1-4
# 🌊 Save Me, O God
---
## 🌊 Save Me, O God, For The Waters Are Come In

Waters is a picture the Psalms often use for danger.

It does not mean an actual flood here.

David means trouble so heavy it feels like drowning.

Save me is the shortest prayer a person can pray.

This whole psalm opens already at that point of desperation.

There is no slow buildup before the cry for help.

🌊 Waters pictures danger, not literal flooding

😰 Trouble here feels like actual drowning

🆘 Save me is the most basic prayer

📖 The psalm opens already in crisis

## 🕳️ I Sink In Deep Mire, Where There Is No Standing

Mire means soft mud that will not let go.

A person sinks deeper the more they struggle in it.

There is no standing means no solid ground anywhere underfoot.

David pairs mire with deep waters in the same line.

Both pictures describe a trouble with no easy way out.

He is not slowly wading through hardship here.

He is already sinking, with nothing firm beneath him.

🕳️ Mire means soft mud that will not release

🌊 Deep waters and mire are paired together

🦶 No standing means no solid ground

📖 David is already sinking, not just wading

## 👀 Mine Eyes Fail While I Wait For My God

Eyes fail is an old way to describe eyes worn out from crying.

David has been watching and waiting so long his eyes ache.

His throat is described as dried out from crying as well.

The weariness here is physical, not only emotional.

Waiting on God can feel like a long, exhausting watch.

David still calls God my God even in that exhaustion.

👀 Eyes fail means eyes worn out from crying

😪 His throat and eyes are both worn out

🙏 David still calls out to God by name

📖 Waiting on God can feel like exhaustion

## 😡 They That Hate Me Without A Cause Are More Than The Hairs Of Mine Head

Hairs of mine head is an old way to say too many to count.

David is saying his enemies are truly that many.

Without a cause means these enemies have no real reason to hate him.

He is being accused and attacked for nothing he actually did.

This kind of suffering, for no real fault, runs through the whole psalm.

It also becomes an idea the New Testament later applies to Jesus.

😡 Hairs of my head means countless enemies

🎯 Without a cause means no real reason

🙅 David suffers for nothing he actually did

📖 John later applies this line to Jesus

## 💰 Then I Restored That Which I Took Not Away

This line describes paying back something David never actually stole.

It pictures a debt forced onto an innocent person.

David is being made to answer for a wrong that was not his.

This mirrors the false accusations already described earlier in the psalm.

Unjust blame is one of the heaviest kinds of suffering.

David names it plainly instead of only hinting at it.

💰 David repays a debt he never made

🙅 He answers for a wrong not his own

⚖️ This mirrors the accusations from earlier lines

📖 Unjust blame is real, named suffering

# Psalms 69:5-9
# 🙏 For Thy Sake I Have Borne Reproach
---
## 😔 O God, Thou Knowest My Foolishness

David admits his own faults in the middle of his suffering.

He is not claiming to be perfect in this psalm.

My sins are not hid from thee is an honest confession.

David knows nothing about himself is hidden from God.

Honesty about his own failure sits right next to his complaint.

This keeps the psalm from turning into pure self pity.

😔 David admits his own faults honestly

🙏 My sins are not hidden from God

🪞 He is not claiming to be perfect

📖 Honesty and suffering sit side by side

## 😟 Let Not Them That Wait On Thee Be Ashamed For My Sake

David worries about more than just his own pain here.

He worries his suffering could discourage other believers watching him.

Them that wait on thee means the wider community of faith.

If David falls apart publicly, it could shake their trust too.

David is thinking about his witness, not only his comfort.

His personal crisis carries a wider, public weight.

😟 David worries about more than his pain

👥 He worries about other believers watching him

🤝 His suffering could shake their trust too

📖 A personal crisis carries public weight

## 🚪 I Am Become A Stranger Unto My Brethren

Brethren means David's own family and close relatives.

Stranger describes someone treated like an outsider in his own home.

This is a painful kind of rejection.

It comes from people who were supposed to know him best.

The next line adds that even his own mother's children turned away.

Isolation from family is one of the deepest wounds in this psalm.

🚪 Brethren means David's own close family

👤 Stranger means treated like an outsider

💔 Even his own family turned away

📖 Family rejection cuts deeper than most wounds

## 🔥 The Zeal Of Thine House Hath Eaten Me Up

Zeal means intense devotion and care for something.

Thine house refers to God's own house of worship.

David's love for that house is described as consuming him.

Eaten me up pictures devotion so strong it costs everything.

John's Gospel later quotes this exact line about Jesus.

Jesus applies it to Himself in the temple courts.

He says it as He drives out the money changers.

🔥 Zeal means intense devotion for something

🏛️ Thine house means God's house of worship

🔗 John's Gospel later quotes this exact line

📖 Jesus applies it in the temple courts

## 😣 The Reproaches Of Them That Reproached Thee Are Fallen Upon Me

Reproach means public shame or insult.

People who insulted God ended up insulting David instead.

David's loyalty to God made him a target in their place.

The New Testament book of Romans later quotes this same line.

Paul applies it to Christ bearing reproach for others.

Standing for God can mean absorbing hostility meant for Him.

😣 Reproach means public shame or insult

🎯 David is targeted in God's place

📜 Romans later quotes this exact line

📖 Standing for God can invite hostility

# Psalms 69:10-12
# 😢 I Became Their Song
---
## 😭 When I Wept, And Chastened My Soul With Fasting

Chastened my soul means David humbled himself through self denial.

Fasting was going without food as an act of humility before God.

Weeping and fasting together showed the depth of his grief.

Instead of comfort, this devotion brought him public mockery.

That was to my reproach means people mocked him for it.

Sincere grief before God was twisted into public ridicule.

😭 Chastened my soul means humbling himself

🍽️ Fasting meant going without food on purpose

😢 Weeping and fasting showed real grief

📖 His devotion was mocked, not honored

## 👕 I Made Sackcloth Also My Garment

Sackcloth was a rough, uncomfortable cloth worn during mourning.

Wearing it in public showed genuine grief, not performance.

David traded his normal clothing for this humble mourning garment.

I became a proverb to them means people made him a joke.

His grief became public entertainment instead of public sympathy.

Genuine sorrow was turned into gossip and mockery.

👕 Sackcloth was rough cloth worn in mourning

😔 Wearing it showed real, public grief

🗣️ People turned his grief into a joke

📖 Genuine sorrow became public mockery instead

## 🚶 They That Sit In The Gate Speak Against Me

The gate was where a city's business and legal matters were handled.

Sitting in the gate meant the elders and leading citizens gathered there.

David is saying even respected, official voices spoke against him.

This was not just random gossip from strangers.

It came from people with real standing in the community.

Rejection at the gate meant rejection at the highest public level.

🚶 The gate was where leaders gathered publicly

👴 Even respected elders spoke against David

🚫 This was not random gossip from strangers

📖 His rejection reached the highest public level

## 🍷 I Was The Song Of The Drunkards

David became the subject of mocking songs at the local tavern.

Drunkards sang about him as entertainment, not out of concern.

This shows how low David's public reputation had fallen.

He went from a respected king to a common joke.

The humiliation reached every level of society by this point.

Nothing about his suffering was private anymore.

🍷 Drunkards mocked David in their songs

📉 His public reputation had fallen this low

👑 A king became the subject of jokes

📖 His suffering was no longer private

# Psalms 69:13-18
# 🙌 But As For Me, My Prayer Is Unto Thee
---
## 🙏 My Prayer Is Unto Thee, O LORD, In An Acceptable Time

David shifts from describing his pain to speaking directly to God.

An acceptable time means a moment when God is ready to answer.

David trusts there is a right time for God to act.

Multitude of thy mercy points to how much mercy God has.

David is not demanding an answer on his own schedule.

He is trusting God's timing over his own urgency.

🙏 David turns from pain to direct prayer

⏳ Acceptable time means God's own right moment

💗 Multitude of mercy points to abundant mercy

📖 David trusts God's timing over his own

## 🕳️ Deliver Me Out Of The Mire, And Let Me Not Sink

David repeats the mire image from the very first verse.

This ties the prayer back to where the psalm began.

He is not asking for comfort in the mire.

He is asking to be pulled completely out of it.

Let me not sink is a plea for rescue, not relief.

David wants the trouble ended, not simply eased.

🕳️ David repeats the mire image from verse one

🔁 This ties the prayer back to the start

🆘 He wants rescue, not just comfort

📖 He wants the trouble ended, not eased

## 🚫 Let Not The Pit Shut Her Mouth Upon Me

The pit pictures a grave or a trap with no way out.

Shut her mouth pictures the pit closing over him completely.

This is the same fear as drowning, pictured a different way.

David piles up images of being buried, drowned, and swallowed.

Each picture makes the danger feel more final.

He wants God to stop that ending before it happens.

🚫 The pit pictures a grave with no exit

🔁 This repeats the drowning fear differently

📚 David piles up images of danger

📖 He wants God to stop it in time

## 💗 Thy Lovingkindness Is Good

Lovingkindness is a rich Hebrew word for God's loyal, covenant love.

It is love that keeps a promise, not just a passing feeling.

David calls that love good, plainly and directly.

Tender mercies describes the same kind of steady, caring love.

David is not appealing to luck or fairness here.

He is appealing to God's own loyal character.

💗 Lovingkindness means God's loyal, covenant love

🤝 It is love that keeps a promise

🌟 David calls that love plainly good

📖 He appeals to God's own character

## 🙈 Hide Not Thy Face From Thy Servant

God hiding His face was a picture of absence or silence.

David is asking God to stay present and attentive.

For I am in trouble explains exactly why he is asking.

Hear me speedily adds urgency to the request.

David does not want a slow or distant response.

He wants God's attention now, not eventually.

🙈 Hiding His face pictured God's silence

👀 David asks God to stay present

⏱️ Speedily adds urgency to his request

📖 He wants attention now, not eventually

## 🫱 Draw Nigh Unto My Soul, And Redeem It

Draw nigh means come close, not stay at a distance.

David wants nearness, not just a rescue from far away.

Redeem means to buy back or set free at a cost.

The word pictures someone paying a price to free another.

David wants both closeness and real deliverance together.

Because of mine enemies names exactly what he needs rescue from.

🫱 Draw nigh means come close, not distant

💰 Redeem means to free at a cost

🤝 David wants nearness and rescue together

📖 He names his enemies as the danger

# Psalms 69:19-21
# ✝️ A Preview Of The Cross
---
## 😞 Thou Hast Known My Reproach, And My Shame, And My Dishonour

David lists three separate words for public humiliation in one line.

Reproach, shame, and dishonour each describe a different angle of disgrace.

David is not hiding any of it from God.

He says plainly that God has already seen it all.

Naming pain this precisely is its own kind of honesty.

Mine adversaries are all before thee adds that God sees his enemies too.

😞 Three separate words describe his humiliation

👁️ God has already seen it all

🗣️ David names his pain precisely and honestly

📖 God also sees every one of his enemies

## 💔 I Looked For Some To Take Pity, But There Was None

David describes searching for even one comforting face.

He found no pity and no comforters anywhere.

This is total isolation in the middle of real suffering.

Not one person stepped forward to help him.

This kind of abandonment cuts deeper than the attacks themselves.

Readers have long connected this verse to Christ's own abandonment on the cross.

💔 David found no pity anywhere at all

🚫 Not one comforter stepped forward for him

😔 Total isolation deepened his suffering

📖 Readers connect this to Christ's own abandonment

## 🍇 They Gave Me Gall For My Meat

Gall was a bitter, poisonous plant, not real food.

Offering it for meat means offering cruelty disguised as care.

Vinegar to drink adds a second image of bitter mockery.

Both Gospels of Matthew and John record this exact detail.

Soldiers offered Jesus a bitter drink as He hung on the cross.

This verse is one of the clearest previews of the crucifixion in the Psalms.

🍇 Gall was a bitter, poisonous plant

🍶 Vinegar added a second bitter insult

✝️ Both Gospels record this exact detail

📖 This previews the crucifixion centuries early

# Psalms 69:22-28
# ⚡ Let Their Table Become A Snare
---
## ⚖️ Let Their Table Become A Snare Before Them

This section is written as a prayer for justice, not personal revenge.

Psalms like this one are often called imprecatory psalms.

They call on God directly to judge the wicked.

A table pictures ordinary daily comfort and provision.

David asks for that very comfort to trap his enemies instead.

Paul later quotes this exact verse in the book of Romans.

⚖️ This is a prayer for justice, not revenge

📜 Scholars call this an imprecatory psalm

🍽️ A table pictures daily comfort and provision

📖 Paul later quotes this verse in Romans

## 🙈 Let Their Eyes Be Darkened, That They See Not

Darkened eyes pictures losing the ability to see clearly or safely.

Loins continually to shake pictures physical weakness and fear.

David is asking for his enemies' strength and clarity to fail.

These are physical pictures of losing power completely.

The prayer asks God to remove their ability to harm anyone.

It is aimed at their power, not their existence.

🙈 Darkened eyes pictures losing clear sight

🦵 Shaking loins pictures physical weakness

💪 The prayer targets their strength and power

📖 It aims at their power, not their lives

## 🔥 Pour Out Thine Indignation Upon Them

Indignation means righteous anger at real wrongdoing.

David is asking God to respond to injustice, not to sit quietly.

Wrathful anger repeats the same idea for emphasis.

This is not asking God to be cruel for no reason.

It is asking God to finally act against real cruelty.

The prayer trusts God's anger more than David's own.

🔥 Indignation means righteous anger at wrongdoing

📢 David asks God to respond to injustice

🔁 Wrathful anger repeats the idea for emphasis

📖 The prayer trusts God's anger, not David's own

## 🏚️ Let Their Habitation Be Desolate

Habitation means home or dwelling place.

Desolate means empty and abandoned, with no one left living there.

This asks for the enemies' households to be wiped out entirely.

Peter later quotes this exact line in the book of Acts.

He applies it to Judas after his betrayal of Jesus.

An ancient prayer of judgment reappears at a key New Testament moment.

🏚️ Habitation means home or dwelling place

🕳️ Desolate means empty and abandoned

📜 Peter quotes this line about Judas

📖 An ancient prayer reappears in Acts

## 🩹 They Persecute Him Whom Thou Hast Smitten

David points out a cruel pattern in how he is being treated.

His enemies are attacking him precisely where he is already hurting.

Smitten describes a wound or blow he has already suffered.

They talk to the grief of those whom thou hast wounded repeats the same charge.

This pictures kicking someone already on the ground.

David names that cruelty plainly instead of only feeling it.

🩹 His enemies attack him where he already hurts

🎯 Smitten means a wound he already suffered

👢 They attack him when he is already low

📖 David names that cruelty plainly and clearly

## 📕 Let Them Be Blotted Out Of The Book Of The Living

The book of the living pictures a record of who is currently alive.

Ancient cities and kingdoms sometimes kept lists like this for citizens.

Being blotted out pictures having your name struck from that record.

Not be written with the righteous adds a second layer of judgment.

David is asking for his enemies to be cut off completely.

This is the strongest request in this whole section of the psalm.

📕 The book of the living pictures a record

✂️ Blotted out means struck from that record

⚖️ A second request adds judgment on top

📖 This is the strongest request in the psalm

# Psalms 69:29-31
# 🎶 Praise Promised Before The Rescue
---
## 🙇 But I Am Poor And Sorrowful

The tone shifts here from cursing enemies to personal humility.

Poor does not only mean lacking money in this line.

It means someone low, needy, and dependent on God.

Sorrowful names his grief honestly, without hiding it.

David ends this long complaint by naming exactly where he stands.

Let thy salvation set me up on high asks God to lift that low place.

🙇 The tone shifts to personal humility here

🪙 Poor means low and dependent on God

😢 Sorrowful names his grief honestly

📖 David asks God to lift his low place

## 🎶 I Will Praise The Name Of God With A Song

David moves from asking for rescue to promising praise.

A song was one of the main ways Israel worshiped God.

Magnify him with thanksgiving means making God's greatness known publicly.

This praise is promised before the rescue has even happened yet.

David is choosing worship in the middle of his trouble.

That choice says something about where his trust really rests.

🎶 David promises praise, not just a request

📣 Magnify means making God's greatness known publicly

⏳ This praise comes before rescue even happens

📖 His trust shows in worship, not just words

## 🐂 This Shall Please The LORD Better Than An Ox Or Bullock

An ox or bullock with horns and hoofs was a costly animal sacrifice.

David says his honest praise pleases God more than that sacrifice.

This does not throw out the whole sacrificial system.

It puts the heart behind an offering above the offering itself.

Other Psalms make this same point about worship and obedience.

A grateful, honest heart outweighs an expensive ritual.

🐂 An ox sacrifice was a costly offering

❤️ Honest praise pleases God even more

🙏 Heart matters more than the offering itself

📖 A grateful heart outweighs expensive ritual

# Psalms 69:32-36
# 🌍 The Whole Earth Joins The Praise
---
## 😊 The Humble Shall See This, And Be Glad

The humble here means people who depend on God, like David does.

Seeing this means watching how God treats someone honest about their need.

Seeking God means actively looking for Him, not passively hoping.

David expects his honesty to encourage other struggling believers.

His personal story becomes a public source of hope.

One person's honest prayer can strengthen an entire community.

😊 The humble are people who depend on God

👀 Watching this encourages other struggling believers

🔍 Seeking God means actively looking for Him

📖 One honest prayer can strengthen a community

## 👂 The LORD Heareth The Poor, And Despiseth Not His Prisoners

Heareth means God actually listens, not just permits prayer.

The poor again describes those with no other help or resource.

Prisoners here likely pictures people trapped by suffering or captivity.

Despiseth not means God never looks down on people in that state.

Status and comfort were never the price of God's attention.

This line answers David's whole complaint with one simple truth.

👂 Heareth means God actually listens closely

🪙 The poor are those with no resource

⛓️ Prisoners pictures people trapped by suffering

📖 God's attention never depended on status

## 🌍 Let The Heaven And Earth Praise Him

The call to praise widens out to all of creation here.

Heaven, earth, and seas are named as a complete picture of everything.

Every thing that moveth therein adds every living creature into that praise.

This is the widest possible invitation in the whole psalm.

A psalm that began in personal drowning now reaches the whole earth.

David's private crisis becomes a doorway to universal worship.

🌍 Praise widens out to all creation

🌊 Heaven, earth, and seas are named together

🐦 Every living creature is included too

📖 A private crisis becomes universal worship

## 🏙️ For God Will Save Zion

Zion refers to Jerusalem and specifically the temple mount within it.

This verse shifts from David's personal need to the nation's future.

Build the cities of Judah pictures national restoration for the whole land.

The whole nation is pictured being rebuilt and resettled.

David's own rescue and the nation's future are tied together here.

One person's honest prayer connects to a much bigger hope.

🏙️ Zion refers to Jerusalem and its temple

🏗️ This pictures the whole nation rebuilt

🇮🇱 David's rescue ties to the nation's future

📖 One prayer connects to a bigger hope

## 🌱 The Seed Also Of His Servants Shall Inherit It

Seed here means descendants, the generations still to come.

Inherit it means receiving the land as a lasting possession.

This looks past David's own lifetime toward future generations.

They that love his name closes the psalm on loyalty to God.

The psalm that opened in drowning ends on lasting hope.

What started as a cry for rescue becomes a promise for generations.

🌱 Seed means descendants still to come

🗺️ Inherit means receiving the land permanently

🔁 The psalm ends on lasting hope, not despair

📖 A cry for rescue becomes a lasting promise`.trim();

export const PSALMS_SIXTY_NINE_PERSONAL_SECTIONS = parsePsalmsSixtyNineRawNotes(PSALMS_SIXTY_NINE_RAW_NOTES);
