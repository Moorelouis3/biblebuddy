export type IsaiahFiftySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftySevenRawNotes(rawText: string): IsaiahFiftySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+57:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 57 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+57:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+57:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 57 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 57,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 57:${startVerse}` : `Isaiah 57:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 57 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_SEVEN_RAW_NOTES = `# Isaiah 57:1-2
# 🕊️ The Righteous Taken Away
---
## 🙏 The Righteous Perisheth, And No Man Layeth It To Heart

To lay something to heart means to think seriously about it.

Isaiah says a righteous person can die and hardly anyone notices why.

People were too busy chasing false gods to ask what that loss meant.

A godly life ending quietly is itself a warning sign for a nation.

🙏 Lay to heart means take seriously

😔 A righteous death goes unnoticed

🙈 The nation is too distracted to see it

📖 Ignoring loss is itself a warning

## ⏳ Taken Away From The Evil To Come

This phrase means death itself can be a mercy.

Many scholars believe this points to godly people who died before a coming disaster struck the nation.

Judah would soon face invasion and exile from Babylon.

Dying first spared the righteous from watching that judgment happen.

⏳ Evil to come means a future disaster

🕯️ Death can be a form of mercy

⚔️ Babylon's invasion was likely on the way

📖 God spares the righteous by taking them home

## 🕊️ He Shall Enter Into Peace

This does not mean a quiet nap in the grave.

It means the righteous find rest with God once life on earth ends.

The Hebrew idea of peace here means wholeness, not just the absence of noise.

This chapter ends with the opposite promise for the wicked in verse twenty one.

🕊️ Peace means wholeness with God

🛌 Rest describes life after death, not sleep

⚖️ This peace contrasts with the wicked's fate

📖 The chapter's two endings mirror each other

## 🧭 Each One Walking In His Uprightness

Uprightness means living straight, with integrity, not living perfectly.

The righteous in this verse were not sinless people.

They kept walking toward God instead of the idols described next.

Their direction mattered more than their perfection.

🧭 Uprightness means walking straight with God

🚫 It does not mean sinless

🚶 Direction mattered more than perfection

📖 Verse three shows the opposite direction

# Isaiah 57:3-5
# 🔥 Sons Of The Sorceress
---
## 🧙 Draw Near Hither, Ye Sons Of The Sorceress

God now turns from the righteous to address the whole unfaithful nation.

Hither is an old word meaning to this place.

Calling them sons of a sorceress is not a literal family line.

It names them by the sin they had adopted as their own identity.

🧙 Sorceress names the sin, not the family

📍 Hither means to this place

🔄 God now addresses the whole nation

📖 A people take on their sin's identity

## 💍 The Seed Of The Adulterer And The Whore

In the prophets, worshiping other gods is often pictured as unfaithfulness to God.

Israel is described elsewhere as God's own bride.

Calling the nation the seed of adultery names spiritual betrayal in the sharpest terms.

This is not mainly about individual sexual sin.

Some of the worship practices already named did involve that too.

💍 God pictures Israel as His bride

🔥 Idolatry gets described as adultery

😔 Betrayal, not literal family, is the point

📖 Sharp language names a serious sin

## 👅 Against Whom Make Ye A Wide Mouth, And Draw Out The Tongue

This describes mocking gestures, an open mouth and a stuck out tongue.

The people were not just worshiping idols quietly.

They openly mocked God and anyone who still followed Him.

Their rebellion had turned bold instead of hidden.

👅 Wide mouth and tongue mean open mockery

😏 The scorn targets God directly

📢 Rebellion had become public, not hidden

📖 Open mockery marks a hardened heart

## 🚫 Children Of Transgression, A Seed Of Falsehood

Transgression means willfully crossing a line that was already known.

Seed of falsehood means their whole identity had grown out of a lie.

These were not people who stumbled by accident.

They had built a whole way of life on rejecting the truth.

🚫 Transgression means a known line, crossed anyway

🌱 Seed of falsehood means built on a lie

🧭 This was not an accident

📖 A whole identity formed around rejecting truth

## 🌳 Enflaming Yourselves With Idols Under Every Green Tree

Ancient Canaanite worship often happened outdoors, under trees treated as sacred.

Enflaming yourselves describes a frenzied, worked up devotion to these false gods.

Every green tree shows how widespread the practice had become across the land.

This was not one shrine in one city.

🌳 Green trees marked pagan worship sites

🔥 Enflaming means frenzied devotion

🗺️ Every tree shows how widespread it was

📖 Idolatry had spread across the whole land

## 😢 Slaying The Children In The Valleys Under The Clifts Of The Rocks

This describes child sacrifice, one of the most horrifying practices in the ancient world.

Some Canaanite worship, especially of the god Molech, involved offering children in fire.

Clifts of the rocks points to hidden valley locations.

These sites often sat just outside Jerusalem.

God names this evil plainly so it cannot be softened.

😢 This describes actual child sacrifice

🔥 Molech worship is likely in view

🏞️ Clifts of the rocks means hidden valleys

📖 God names this evil without softening it

# Isaiah 57:6-8
# 🪨 Smooth Stones And A Lofty Bed
---
## 🪨 Among The Smooth Stones Of The Stream Is Thy Portion

Portion and lot are words normally used for what God assigns His people.

The tribes of Israel each received a portion of land this way.

Here the people had chosen smooth streambed stones as their portion instead.

Many scholars believe these stones were used as idols or worship objects.

They had traded a true inheritance from God for worthless rocks.

🪨 Smooth stones were treated as idols

🎁 Portion normally meant a God given inheritance

🔄 They chose stones instead of God

📖 A true inheritance traded for worthless rocks

## 🍷 Thou Hast Poured A Drink Offering, Thou Hast Offered A Meat Offering

A drink offering was wine poured out as worship.

A meat offering here means a grain offering, not meat as in flesh.

Both were normal, proper ways to worship the true God in the temple.

The people were using God's own worship forms on lifeless stones instead.

Religious ritual does not guarantee real worship.

🍷 Drink offering means wine poured out

🌾 Meat offering here means a grain gift

⚠️ Proper worship forms, aimed at the wrong object

📖 Religious ritual does not guarantee real worship

## ⛰️ Upon A Lofty And High Mountain Hast Thou Set Thy Bed

High places and mountains were common sites for pagan worship in the ancient world.

Bed here continues the marriage picture already used in this chapter.

Marriage was the ancient picture for a relationship with God.

Setting a bed on a high mountain gave these idols the most honored, visible place possible.

Nothing about this worship was hidden or half hearted.

⛰️ High mountains were common idol sites

🛏️ Bed continues the marriage picture

👀 The idols got the most visible place

📖 Devotion this open was fully chosen

## 🚪 Behind The Doors Also And The Posts Hast Thou Set Up Thy Remembrance

Faithful Israelites were told to write God's words on their doorposts as a reminder.

This verse describes those same doorposts used instead to display idol worship symbols.

Remembrance here means a marker meant to keep an idol in mind day after day.

A command meant to point toward God got repurposed toward something else entirely.

🚪 Doorposts once pointed to God's word

🗿 Now they held idol markers instead

🧠 Remembrance means a constant daily reminder

📖 A holy command turned toward false gods

## 👀 Thou Hast Discovered Thyself To Another Than Me

Discovered thyself is an old phrase meaning to uncover or expose oneself.

It continues the marriage picture, describing unfaithfulness in the most intimate terms.

The people had exposed their devotion to another god entirely.

A spouse who breaks loyalty exposes it the very same way.

This is the sharpest language in the chapter for naming broken loyalty.

👀 Discovered thyself means exposed yourself

💔 It pictures marital unfaithfulness

🔄 Loyalty shifted to another god entirely

📖 Broken loyalty described in its sharpest terms

## 📏 Thou Hast Enlarged Thy Bed, And Made Thee A Covenant With Them

Enlarged thy bed pictures making more and more room for these false gods over time.

A covenant is a binding agreement, here made with idols instead of God.

What began as one act of unfaithfulness grew into an ongoing commitment.

Sin left unchecked tends to expand.

It rarely stays the same size for long.

📏 Enlarged thy bed means growing devotion

🤝 Covenant means a binding agreement

📈 One act grew into ongoing commitment

📖 Unchecked sin tends to expand

# Isaiah 57:9-10
# 👑 Wearied But Not Grieved
---
## 👑 Thou Wentest To The King With Ointment

This king may point to a foreign ruler.

It may also point to the pagan god Molech, whose name meant king.

Ointment here means costly oil sent as a diplomatic gift or tribute.

Judah's leaders sometimes tried to buy safety from foreign powers instead of trusting God.

Seeking security through political alliances counts here as another form of unfaithfulness.

👑 King may mean Molech or a foreign ruler

🫙 Ointment means costly oil sent as tribute

🤝 This pictures political alliances, not trust in God

📖 Seeking safety elsewhere still counts as unfaithfulness

## ⚰️ Didst Debase Thyself Even Unto Hell

Debase means to lower or humiliate oneself.

Hell here translates the Hebrew word Sheol, the realm of the dead.

This is not the later idea of eternal punishment.

The picture is of someone willing to go to any length to secure these alliances or idols.

There was no limit to how far the people would go.

⚰️ Debase means to lower yourself

🌑 Hell here means Sheol, realm of the dead

🚫 No limit to how far they would go

📖 Desperation for idols knew no bottom

## 😩 Thou Art Wearied In The Greatness Of Thy Way

This pictures someone exhausted from constantly chasing after idols and foreign alliances.

The effort spent seeking false security had genuinely worn the people out.

Despite that exhaustion, they never stopped to question the path itself.

Tiredness alone never changed their direction.

😩 Wearied means genuinely worn out

🏃 The chase itself caused the exhaustion

🚫 Exhaustion never led to turning back

📖 Being tired is not the same as repenting

## 🖐️ Thou Hast Found The Life Of Thine Hand, Therefore Thou Wast Not Grieved

This phrase means the people found just enough success to keep going.

A little relief or a little gain was enough to silence any real regret.

Not grieved means they felt no true sorrow over the path they were on.

Small comforts kept them from ever facing the bigger problem.

🖐️ Life of thine hand means some success found

😐 That success silenced real regret

😶 Not grieved means no true sorrow

📖 Small comforts hid a much bigger problem

# Isaiah 57:11-13
# ⚖️ God's Patience Is Not Blindness
---
## ❓ Of Whom Hast Thou Been Afraid Or Feared, That Thou Hast Lied

God now asks a direct, personal question.

Fear of someone or something else had driven the people to abandon Him.

Whatever they feared, they trusted it more than they trusted God's protection.

The question exposes the real reason behind their unfaithfulness.

❓ God asks who they feared instead

😨 Fear, not logic, drove their choice

🔄 They trusted fear more than God

📖 Naming the real reason exposes the sin

## 🤐 Have Not I Held My Peace Even Of Old, And Thou Fearest Me Not

Held my peace means God stayed silent and did not immediately punish this behavior.

The people mistook God's patience for permission.

Some may have thought God did not notice at all.

His silence was never approval.

Delay is not the same as forgiveness.

🤐 Held my peace means God stayed silent

😌 Silence was mistaken for permission

🚫 Patience is not approval

📖 Delay is not the same as forgiveness

## 🎭 I Will Declare Thy Righteousness, And Thy Works, For They Shall Not Profit Thee

This line drips with irony.

God says He will announce their righteousness and their works.

He actually means the exact opposite.

Their so called righteousness was actually the idol worship just described.

When it is finally exposed publicly, it will do them no good at all.

🎭 This line is deeply ironic

🗿 Their righteousness was really idolatry

📢 God will expose it plainly

📖 Fake righteousness offers no real help

## 💨 The Wind Shall Carry Them All Away, Vanity Shall Take Them

Them refers to the idols the people had trusted for so long.

Wind carrying something away pictures how easily these idols will disappear.

Vanity means emptiness, something with no real substance or power.

Everything they leaned on will prove to have nothing solid underneath it.

💨 Wind pictures how easily idols vanish

🗿 Them refers to the false gods

🕳️ Vanity means empty, with no substance

📖 False security has nothing solid underneath

## 🏔️ He That Putteth His Trust In Me Shall Possess The Land, And Shall Inherit My Holy Mountain

This verse turns sharply from judgment to promise.

The land and my holy mountain both point back to what God originally gave His people.

Trust, not ritual and not political alliances, secures that inheritance.

The whole contrast of the chapter comes down to this one choice.

🔄 The tone shifts from judgment to promise

🏔️ Holy mountain points to God's own dwelling

🤝 Trust, not ritual, secures the inheritance

📖 One choice decides the whole outcome

# Isaiah 57:14-15
# 🏔️ The High And Lofty One
---
## 🛣️ Cast Ye Up, Cast Ye Up, Prepare The Way

This pictures road building, clearing rocks and obstacles to make a path smooth.

The repetition of cast ye up gives the command real urgency.

The same image later describes preparing a way for God's people to return from exile.

God is clearing a road back to Himself for anyone who will trust Him.

🛣️ This pictures clearing a road

🔁 Repetition adds urgency to the command

🏠 The image echoes a return from exile

📖 God clears the road back to Himself

## 🪨 Take Up The Stumblingblock Out Of The Way Of My People

A stumblingblock is anything that causes someone to trip and fall spiritually.

Here it points back to the idols and false alliances described earlier in the chapter.

God commands those obstacles to be physically removed from the path.

A clear path back to God requires removing temptation, not just good intentions.

🪨 Stumblingblock means a spiritual trip hazard

🗿 It refers to the idols already named

🧹 God commands the obstacle removed

📖 A clear path requires removing temptation

## ⏳ The High And Lofty One That Inhabiteth Eternity, Whose Name Is Holy

This is one of the clearest descriptions of God's greatness in the whole book.

Inhabiteth eternity means God exists outside of time itself, with no beginning and no end.

Holy means completely set apart, with nothing else like it.

This description sets up a deliberate surprise in the next line.

⏳ Inhabiteth eternity means outside of time

👑 High and lofty describes total greatness

✨ Holy means set apart, nothing else like it

📖 This greatness sets up a surprising turn

## 🏔️ I Dwell In The High And Holy Place, With Him Also That Is Of A Contrite And Humble Spirit

The surprise is that this eternal, holy God also chooses to dwell with humble people.

Contrite means genuinely sorry, crushed by awareness of one's own sin.

The same God who fills eternity chooses to stay close to the humblest heart.

Greatness and nearness are not opposites in God's character.

🏔️ God dwells in the highest place

💔 Contrite means genuinely sorry, crushed by sin

🤲 He also dwells with the humble

📖 God's greatness does not distance Him from us

## 💓 To Revive The Spirit Of The Humble, And To Revive The Heart Of The Contrite Ones

Revive means to bring back to life, like reviving someone who has fainted.

God's nearness to the humble actively restores them, not just observes them.

This line repeats the same idea twice for emphasis.

Humble and contrite describe the same brokenhearted condition.

God's purpose in staying close is healing, not just company.

💓 Revive means bring back to life

🔁 The line repeats for emphasis

🤲 Humble and contrite describe the same heart

📖 God's nearness actively restores, not just observes

# Isaiah 57:16-19
# 💗 I Will Heal Him
---
## ⚖️ I Will Not Contend For Ever, Neither Will I Be Always Wroth

Contend means to argue a legal case, like a prosecutor pressing charges.

Wroth means deep anger.

God says His anger and His case against His people both have a limit.

Judgment in this book is never presented as endless for its own sake.

⚖️ Contend means arguing a legal case

🔥 Wroth means deep anger

⏳ God's anger has a real limit

📖 Judgment is not endless for its own sake

## 😩 The Spirit Should Fail Before Me, And The Souls Which I Have Made

This explains why God limits His anger.

If He stayed angry without end, the people He created would be completely crushed.

God restrains judgment because He remembers He made them in the first place.

Mercy here grows out of God's role as Creator, not out of weakness.

😩 Spirit fail means being completely crushed

🙌 God remembers He made them Himself

🛑 Being their Creator restrains His anger

📖 Mercy grows out of God's role as Maker

## 💰 For The Iniquity Of His Covetousness Was I Wroth, And Smote Him

Covetousness means an unchecked greed for more, whether wealth, power, or false gods.

God names the specific root sin behind the judgment already described.

Smote means He actually acted on it.

This was real discipline, not an empty warning.

💰 Covetousness means unchecked greed

🎯 God names the exact root sin

⚡ Smote means He actually acted

📖 Discipline here was real, not just words

## 🙈 I Hid Me, And Was Wroth, And He Went On Frowardly In The Way Of His Heart

Hid me pictures God withdrawing His close presence for a season because of this sin.

Frowardly means stubbornly, going the wrong direction on purpose.

Even when God pulled back, the people did not turn around and seek Him.

They kept walking further into the same sin instead.

🙈 Hid me means God withdrew His presence

🚫 Frowardly means stubbornly wrong direction

🔁 They kept walking the same path

📖 Discipline alone did not turn them back

## 👀 I Have Seen His Ways, And Will Heal Him

The tone shifts again here from discipline to healing.

God says plainly that He sees the very ways He just described as sinful.

Seeing clearly does not stop Him from choosing to heal instead of only punish.

This is the mercy the rest of the chapter has been building toward.

👀 God sees the sin plainly

💗 He chooses healing anyway

🔄 The tone shifts from discipline to mercy

📖 Clear sight and real mercy exist together

## 🗣️ I Create The Fruit Of The Lips

Fruit of the lips means the words of praise and worship God will put back in His people's mouths.

God does not just forgive quietly here.

He restores the ability to worship and speak rightly again.

Words themselves are described here as something God creates.

🗣️ Fruit of the lips means renewed praise

🎁 God restores the ability to worship

🤫 Forgiveness here is not quiet or hidden

📖 God restores worship, not just forgiveness

## 🕊️ Peace, Peace To Him That Is Far Off, And To Him That Is Near

Saying peace twice in a row adds emphasis, a full and complete peace.

Far off and near together mean this peace reaches everyone, without exception.

This promise comes right after the anger and discipline described earlier in the chapter.

God's mercy reaches every distance, not just the people who stayed close.

🕊️ Peace repeated means complete peace

🌍 Far off and near means everyone included

🔄 This promise follows real discipline

📖 God's mercy reaches every distance

# Isaiah 57:20-21
# 🌊 No Peace For The Wicked
---
## 🌊 The Wicked Are Like The Troubled Sea, When It Cannot Rest

This is the sharpest possible contrast to the peace just promised to the humble.

A calm sea pictures rest, but a storm tossed sea never settles.

The wicked here are pictured as restless, never finding the peace others were just promised.

Their own choices keep them in constant motion with no calm.

🌊 Troubled sea pictures constant unrest

⚖️ This contrasts directly with verse nineteen

😣 The wicked stay restless by their own choice

📖 Sin removes the possibility of real rest

## 🌫️ Whose Waters Cast Up Mire And Dirt

A storm churns up mud and filth from the bottom of the sea onto the surface.

This pictures how a restless, sinful life keeps surfacing its own ugliness.

Nothing about that life stays hidden or settled for long.

The mess a person carries inside eventually shows on the outside.

🌫️ A storm churns mud to the surface

😖 This pictures sin surfacing repeatedly

🚫 Nothing stays hidden for long

📖 Inner mess eventually shows outwardly

## 🔁 There Is No Peace, Saith My God, To The Wicked

This exact sentence also closes chapter forty eight, earlier in the book.

Repeating it here shows this truth was never a one time warning.

My God is a personal note from Isaiah himself, not just a title for God in general.

The chapter's two paths land on this one final, unavoidable line.

🔁 This line also closes chapter forty eight

📌 Repetition shows this is a settled truth

🙏 My God marks Isaiah's personal voice

📖 Two paths end in one final verdict
`.trim();

export const ISAIAH_FIFTY_SEVEN_PERSONAL_SECTIONS = parseIsaiahFiftySevenRawNotes(ISAIAH_FIFTY_SEVEN_RAW_NOTES);
