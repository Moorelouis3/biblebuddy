export type MarkFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkFiveRawNotes(rawText: string): MarkFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 5:${startVerse}` : `Mark 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Mark 5 sections, received " + sections.length);
  }

  return sections;
}

const MARK_FIVE_RAW_NOTES = `# Mark 5:1-5
# 🪦 A Man Among The Tombs
---
## 🗺️ Country Of The Gadarenes

Gadara was a Gentile city east of the Sea of Galilee, outside Jewish territory.

Jewish law forbade raising pigs, and this region raised them anyway.

Jesus deliberately crossed the sea into land His own people avoided.

This whole chapter happens on Gentile ground before Jesus returns to Jewish shores.

🗺️ Gadarenes names a Gentile region

🐷 Pig farming marked it unclean land

⛵ Jesus crossed the sea on purpose

📖 Jesus went where His people avoided

## 👹 A Man With An Unclean Spirit

An unclean spirit is an old way of naming a demon.

The word unclean marks it as spiritually impure, not simply unwell.

This man did not choose his condition or his isolation.

A real spiritual enemy had taken control of his body and his mind.

👹 Unclean spirit means a demon

🚫 Unclean marks spiritual impurity

😔 The man did not choose this

📖 A real enemy controlled him

## ⚰️ His Dwelling Among The Tombs

Tombs in this culture were caves or hewn chambers outside the town.

Jewish law treated contact with a dead body or a grave as defiling.

Living among tombs meant living in a constant state of uncleanness.

This man was already cut off from his family, his town, and his worship life.

⚰️ Tombs were caves outside town

🚫 Graves made a person unclean

🏚️ He lived in constant uncleanness

📖 He was already cut off from everyone

## ⛓️ No Man Could Bind Him, No, Not With Chains

Binding someone with chains was the normal way to control a dangerous person.

This man broke every attempt before it could work.

The doubled line, no, not with chains, makes his strength sound total.

Ordinary restraint had already failed completely by the time Jesus arrived.

⛓️ Chains were the normal restraint

💪 This man broke every attempt

🔁 No, not with chains repeats for emphasis

📖 Ordinary restraint had already failed

## 🔗 The Fetters Broken In Pieces

Fetters were shackles locked around the ankles to stop someone from walking.

Chains usually bound the wrists or the neck instead.

Both had already been used on this man, and both had already failed.

Breaking iron apart by hand was not a normal human feat.

🔗 Fetters were shackles for the ankles

⛓️ Chains bound the wrists or neck

💥 Both restraints had already failed

📖 This strength was not normal

## 🌄 Always, Night And Day, He Was In The Mountains

This man had no fixed home and no regular rest.

Night and day shows there was no relief, not even for sleep.

The mountains and the tombs were the only places left for him.

His whole existence had become constant wandering and constant torment.

🌄 He lived without a fixed home

🌙 Night and day means no relief

🏔️ Mountains and tombs were his only world

📖 His whole life had become torment

## 🪨 Crying, And Cutting Himself With Stones

Crying here means loud, continuous shouting, not quiet tears.

Cutting himself with stones describes real self harm, done again and again.

No one in his life could stop this or comfort him.

This is the broken, suffering man Jesus is about to meet face to face.

📢 Crying means loud continuous shouting

🪨 He cut himself with stones

😢 No one could comfort him

➡️ This is the man Jesus meets
---
# Mark 5:6-10
# 😨 The Demon Confronts Jesus
---
## 👀 He Saw Jesus Afar Off

Afar off means Jesus was still a distance away, not yet close.

Most people fled from this man rather than approach him.

Here the man runs toward Jesus instead of away from him.

Something inside him already recognized who Jesus was before a single word was spoken.

👀 Afar off means still far away

🏃 Most people fled from him

🔄 This time he ran toward Jesus

📖 Recognition came before any words

## 🙇 He Ran And Worshipped Him

Worshipped here means he fell down before Jesus in submission.

This was not the demon choosing to honor God out of love.

It was a forced reaction to real power and real authority.

Even unclean spirits cannot stand upright in the presence of Jesus.

🙇 Worshipped means falling down in submission

🚫 This was not loving honor

⚡ Real power forced this reaction

📖 Even demons cannot stand before Jesus

## 🗣️ What Have I To Do With Thee

This phrase was a common way of saying leave me alone.

The demon speaks for the man, but the demon is the one talking.

It is trying to create distance between itself and Jesus.

The question sounds confident, but it comes from real fear.

🗣️ The phrase means leave me alone

👹 The demon speaks through the man

😨 Fear is behind this question

➡️ Confidence here is only a mask

## 👑 Thou Son Of The Most High God

Most high God was a title used for God's supreme power over every other power.

Even Gentiles and pagan nations used this title when they met God's authority.

The demon names Jesus correctly, long before most people in the Gospel do.

Knowledge here does not mean obedience.

👑 Most high God means supreme power

🌍 Even Gentiles used this title

🎯 The demon names Jesus correctly

📖 Knowledge here does not mean obedience

## 📜 I Adjure Thee By God

To adjure means to place someone under a binding oath or command.

The demon is trying to use God's own name as leverage against Jesus.

It is attempting to control the very person who has authority over it.

The attempt is desperate, and it will not work.

📜 Adjure means a binding command

🔄 The demon tries to use God's name

⚖️ It wants control over Jesus

📖 The attempt cannot succeed

## 🔥 That Thou Torment Me Not

Torment here means a specific, feared punishment for evil spirits.

The demon is not afraid of pain the way a person fears pain.

It is afraid of a judgment it already knows is coming someday.

Even demons already know their future is decided.

🔥 Torment means a feared punishment

😨 This fear is not physical pain

⏳ It fears a coming judgment

📖 Even demons know their future

## 🗣️ Come Out Of The Man, Thou Unclean Spirit

This is a direct command, not a request or a prayer.

Jesus speaks straight to the spirit, not to the man.

No ritual, no long process, and no special object is used.

One sentence from Jesus is enough to begin the confrontation.

🗣️ This is a command, not a prayer

🎯 Jesus speaks directly to the spirit

🚫 No ritual or object is needed

📖 One sentence carries full authority

## ⚔️ My Name Is Legion: For We Are Many

A legion was a Roman army unit of about six thousand soldiers.

The name is not a personal name at all.

It describes a vast number of spirits controlling one man at once.

This single man had been carrying an army's worth of torment inside him.

⚔️ Legion names a large Roman army unit

🔢 It describes a huge number, not one name

😔 One man carried many tormentors

📖 His suffering was greater than it looked

## 🙏 He Besought Him Much

Besought means begged earnestly, more than a simple request.

The demons already know Jesus has full power to send them away completely.

They are not negotiating from strength here.

They are pleading from a position of total defeat.

🙏 Besought means begging earnestly

⚡ Jesus already holds full power

🏳️ The demons are not negotiating

📖 They plead from total defeat
---
# Mark 5:11-13
# 🐷 Into The Swine
---
## 🐷 A Great Herd Of Swine Feeding

Pigs were considered unclean animals under Jewish law.

A Gentile region could raise them without breaking its own customs.

A great herd means this was a large and valuable business.

The detail confirms once again that this story happens outside Jewish territory.

🐷 Pigs were unclean under Jewish law

🌍 Gentile land allowed raising them

💰 A great herd meant real value

📖 This confirms Gentile territory again

## 🐷 Send Us Into The Swine

The demons ask to enter unclean animals rather than leave the region completely.

This request reveals how badly they want to stay nearby.

Even unclean pigs seemed better to them than total exile.

Jesus allows the request instead of simply destroying them outright.

🐷 They ask to enter the pigs

🏞️ They want to stay nearby

😨 Exile felt worse to them than this

📖 Jesus permits rather than destroys

## ✅ Jesus Gave Them Leave

Leave here means permission, not an order Jesus forced on them.

Jesus remains in full control of this entire exchange.

He allows the demons their request without losing any authority.

Granting permission is still a form of command when Jesus is the one giving it.

✅ Leave means granted permission

👑 Jesus stays fully in control

🤝 Their request still needs His approval

📖 Permission here is still authority

## 💥 Ran Violently Down A Steep Place Into The Sea

The herd rushes to its own destruction the moment the spirits enter.

This was not an accident or a stampede caused by fear of a stranger.

The same destructive force that tormented the man now destroys the animals.

Evil spirits do not build, they only ever tear down.

🐷 The herd rushed toward destruction

💥 This was not a simple accident

🔥 The same force hurt him too

📖 Evil spirits only tear down

## 🔢 About Two Thousand

Two thousand pigs represented a massive financial loss for this region.

This number is not a rounded guess meant to sound impressive.

It is a specific, witnessed detail that confirms a real event happened.

The size of the loss is also the size of the proof.

🔢 Two thousand was a specific count

💰 This was a massive financial loss

👀 It was a real, witnessed event

📖 The loss itself became proof
---
# Mark 5:14-17
# 🏃 The Town Reacts
---
## 🏃 They That Fed The Swine Fled

The men watching the pigs run to tell others immediately.

News like this could not stay contained to one field.

The whole city and the whole countryside hear about it at once.

What happened to one man is about to become everyone's business.

🏃 The herdsmen ran to spread the news

📢 News spread through the city and country

👥 The whole region hears at once

📖 One event becomes everyone's concern

## 📝 Told Them How It Befell To Him That Was Possessed

Befell simply means what had happened to him.

The witnesses describe both the man's healing and the pigs' destruction together.

Both details travel as one report, not two separate stories.

The miracle and its cost arrive in the town's ears at the same time.

📝 Befell means what had happened

🗣️ Both events are reported together

⚖️ The healing and the loss are linked

📖 Good news and cost arrive together

## 🧠 Clothed, And In His Right Mind

Right mind means sane, calm, and fully in control of himself again.

This man had been living naked and wild among the tombs.

Now he sits dressed, quiet, and able to think clearly.

The change in his appearance is as striking as the miracle itself.

🧠 Right mind means sane and calm

👕 He is dressed, not wild

🪦 This is the same man from the tombs

📖 His appearance proves the change is real

## 😨 They Were Afraid

The crowd is not afraid of the former demoniac anymore.

They are afraid of the power that could do something like this.

Fear here is not relief or gratitude.

Power this real can feel more frightening than comforting to people who do not know Jesus.

😨 Fear here is not relief

⚡ Real power can feel frightening

🙅 This is not gratitude

📖 Unfamiliar power unsettles people

## 🗺️ They Began To Pray Him To Depart Out Of Their Coasts

Coasts here means their territory or region, not a shoreline.

The town asks Jesus to leave rather than asking Him to stay.

Losing two thousand pigs mattered more to them than a man's healing.

This is the opposite of how the healed man is about to respond.

🗺️ Coasts means their own territory

🙅 They ask Jesus to leave

💰 Lost pigs mattered more than a healing

➡️ One man's response will look very different
---
# Mark 5:18-20
# 📣 Go And Tell
---
## 🙏 Prayed Him That He Might Be With Him

The healed man wants to stay close to Jesus from now on.

This is the natural response of someone who knows exactly what he was saved from.

Most people who want to follow Jesus in the Gospels are invited to come along.

Jesus is about to send this man in the opposite direction instead.

🙏 He wants to stay near Jesus

💭 He knows what he was saved from

🚶 Most followers are invited to come along

➡️ Jesus sends him away instead

## 🔄 Howbeit Jesus Suffered Him Not

Howbeit is an old word meaning however.

Suffered him not means Jesus did not allow this particular request.

Jesus refuses the one thing the man actually asked for.

Jesus has a different, bigger plan for exactly where this man belongs.

🔄 Howbeit means however

🚫 Jesus does not allow this request

🎯 Jesus has a different plan

📖 God's plan can look like a no

## 🏠 Go Home To Thy Friends

This man's own town had likely avoided him for years because of his condition.

Jesus sends him straight back into the community that once feared him.

His mission field is his own home, not a life of traveling with Jesus.

Some callings stay close to where someone already belongs.

🏠 He returns to the town that feared him

🎯 His mission field is his own home

🚶 Not every calling means traveling away

📖 Some callings stay right where he belongs

## 🏛️ Publish In Decapolis

Decapolis means ten cities, a league of Gentile towns east of the Jordan River.

This region was Gentile territory, just like the country of the Gadarenes.

The healed man becomes the first person to carry this news into Gentile towns.

His testimony reaches people long before most of the disciples preach to Gentiles at all.

🏛️ Decapolis means ten Gentile cities

🌍 This was Gentile territory again

🗣️ He becomes an early Gentile witness

📖 His story reaches Gentiles first

## 😲 All Men Did Marvel

Marvel means a deep, lasting amazement, not a passing reaction.

This response is very different from the fear shown earlier in the chapter.

One man's testimony produces wonder instead of rejection.

A changed life can open doors that fear tried to close.

😲 Marvel means deep lasting amazement

⚖️ This differs from the earlier fear

🗣️ One testimony changed the reaction

📖 A changed life can open doors
---
# Mark 5:21-24
# 🙇 Jairus Begs For His Daughter
---
## ⛵ Passed Over Again By Ship Unto The Other Side

Jesus crosses back to the Jewish side of the Sea of Galilee.

This is the same sea He crossed into Gentile territory a short time before.

Both sides of this sea now become part of the same ministry.

Jesus moves freely between two worlds that normally stayed separate.

⛵ Jesus returns to Jewish territory

🌊 The same sea He crossed before

🤝 Both regions are part of His work

📖 Jesus crosses boundaries others would not

## 🏛️ Ruler Of The Synagogue, Jairus By Name

A ruler of the synagogue managed the building, the services, and community affairs.

This was a respected, visible position within the Jewish community.

Jairus has status, reputation, and influence that the earlier demoniac never had.

Yet both men end up at Jesus's feet in the exact same desperate posture.

🏛️ Ruler of the synagogue managed worship life

👔 Jairus held real status and respect

⚖️ His position differs from the demoniac's

📖 Both men still kneel the same way

## 🙇 He Fell At His Feet

Falling at someone's feet was a posture of complete humility.

A respected community leader does this in full public view.

Status and reputation do not shield anyone from real desperation.

Jairus sets aside his position the moment his daughter's life is at stake.

🙇 Falling down showed complete humility

👀 He does this in public view

💔 Status cannot shield real desperation

📖 Love for his daughter outweighs his pride

## 💕 My Little Daughter Lieth At The Point Of Death

Little daughter is a tender, affectionate way of speaking about her.

At the point of death means she is still alive, but only barely.

Jairus is racing against time with every word he speaks.

His tone carries both deep love and real panic at once.

💕 Little daughter shows tender affection

⏳ She is alive, but only barely

🏃 Jairus is racing against time

📖 Love and panic mix in his plea

## ✋ Lay Thy Hands On Her, That She May Be Healed

Laying on hands was a common way to bless or heal someone in this culture.

Jairus believes a simple touch from Jesus will be enough.

He does not ask for an explanation or a long process.

His request is specific, urgent, and full of real faith.

✋ Laying on hands was a common practice

🙏 Jairus believes one touch is enough

🎯 His request is specific and urgent

📖 Urgency here comes from real faith

## 👥 Much People Followed Him, And Thronged Him

Thronged means pressed in tightly from every side.

A large crowd now surrounds Jesus on his way to help Jairus.

This crush of people sets up the next interruption in the story.

Getting to Jairus's house will not be a simple, quick walk.

👥 Thronged means pressed in tightly

🚶 A crowd surrounds Jesus completely

⏳ This slows down an urgent walk

➡️ An interruption is about to happen
---
# Mark 5:25-29
# 🩸 A Woman Touches His Garment
---
## 🩸 An Issue Of Blood Twelve Years

An issue of blood means ongoing, abnormal bleeding, likely a long term medical condition.

Jewish law treated this kind of bleeding as a source of ongoing ritual uncleanness.

Twelve years means she had lived with this condition for over a decade.

Her whole adult life had been shaped by isolation and shame.

🩸 This means ongoing abnormal bleeding

🚫 The law treated her as unclean

📆 Twelve years is a very long time

📖 Isolation shaped her whole adult life

## 🩺 Suffered Many Things Of Many Physicians

She had tried many different doctors and many different treatments.

Ancient medical treatments for conditions like hers were often harsh and painful.

None of them actually solved her problem.

Years of effort had brought her nothing but more suffering.

🩺 She tried many different doctors

😣 Ancient treatments were often harsh

🚫 None of them actually worked

📖 Years of effort brought only suffering

## 💰 Spent All That She Had, And Was Nothing Bettered

She had used up all of her money chasing a cure.

Nothing bettered means none of it actually helped her condition.

She was now poor, sick, and completely out of options.

Jesus was her last possible hope, not just one option among many.

💰 She spent all her money

📉 Nothing bettered means no improvement

🪫 She was out of every option

📖 Jesus became her very last hope

## 👥 Came In The Press Behind, And Touched His Garment

The press means the crowd pressing in around Jesus.

She approaches from behind so no one will notice her.

As an unclean woman, touching anyone in public could cause her real trouble.

She risks everything for one brief, hidden moment of contact.

👥 The press means the crowded crowd

🤫 She approaches quietly from behind

⚠️ Touching someone could cause her trouble

📖 She risks everything for one touch

## 🙏 If I May Touch But His Clothes, I Shall Be Whole

She does not believe she needs a long conversation or a special ceremony.

Even the edge of his clothing feels like enough to her.

Whole here means fully healed, inside and out.

Her faith is small in size but completely sure of itself.

🙏 She expects no ceremony at all

👕 Even his clothing feels like enough

💯 Whole means fully healed completely

📖 Small faith can still be sure faith

## 💧 The Fountain Of Her Blood Was Dried Up

Fountain here means the constant source of her bleeding.

Dried up means the problem stopped completely, not partially.

Straightway means this happened the instant she touched him.

Twelve years of suffering ended in a single, immediate moment.

💧 Fountain means her constant bleeding

🛑 Dried up means complete healing

⚡ Straightway means it happened instantly

📖 Twelve years ended in one moment
---
# Mark 5:30-34
# 🗣️ The Woman's Healing Is Named
---
## ⚡ Virtue Had Gone Out Of Him

Virtue here means power or force, not moral goodness.

Jesus physically perceives that healing power has left him and gone somewhere.

This was not a loss that weakened him.

It was Jesus noticing the exact moment his power did its work.

⚡ Virtue means power, not goodness

👁️ Jesus perceives power leaving him

🚫 This did not weaken him

📖 He notices power doing its work

## ❓ Who Touched My Clothes?

Jesus already knows someone touched him with real faith, not by accident.

He asks the question out loud anyway, in front of the whole crowd.

He is giving the woman a chance to come forward herself.

Jesus wants her known, not just healed in secret.

❓ Jesus already knows who touched him

🗣️ He asks out loud anyway

🙋 He gives her a chance to come forward

📖 Jesus wants her known, not hidden

## 👥 Thou Seest The Multitude Thronging Thee

The disciples think the question makes no sense in a crowd this size.

Dozens of people were bumping into Jesus at the exact same moment.

They are thinking only about ordinary, accidental contact.

Jesus is asking about one specific touch made in real faith.

👥 Many people were touching him accidentally

🤔 The disciples find the question confusing

🎯 Jesus means one specific touch

📖 Faith made her touch different

## 😨 Fell Down Before Him, And Told Him All The Truth

She knows exactly what just happened inside her own body.

Fear comes from breaking a cultural rule by touching him while unclean.

She comes forward anyway and tells Jesus everything, with nothing held back.

Her honesty turns a private, hidden healing into a public testimony.

😨 She knows exactly what happened

⚠️ Fear came from breaking a cultural rule

🗣️ She tells him everything honestly

📖 Honesty turns healing into testimony

## 💕 Daughter, Thy Faith Hath Made Thee Whole

Daughter is a warm, personal title, not a distant or formal address.

Jesus publicly welcomes a woman many others had avoided for twelve years.

Thy faith made thee whole credits her trust, not just her action.

Jesus connects her inward belief directly to her outward healing.

💕 Daughter is warm and personal

🤝 Jesus welcomes a woman others avoided

🙏 Faith, not just action, gets credit

📖 Belief and healing are connected here

## 🕊️ Go In Peace, And Be Whole Of Thy Plague

Go in peace was a common Jewish blessing for someone leaving safely.

Plague here means her long term bleeding condition, not an epidemic.

Jesus sends her away with both her health and her dignity restored.

She leaves this encounter completely different from how she arrived.

🕊️ Go in peace was a common blessing

🩸 Plague means her bleeding condition

💯 Both health and dignity are restored

📖 She leaves completely changed
---
# Mark 5:35-38
# ⏳ News Of Death Arrives
---
## 💔 Thy Daughter Is Dead

This news arrives while Jesus is still on his way to help her.

The delay caused by the woman's healing now seems to have cost everything.

From a human view, the story appears to be over.

Jesus has not yet responded to this news at all.

💔 The news arrives mid journey

⏳ The delay now looks costly

🏁 It looks like the story is over

➡️ Jesus has not responded yet

## 🤷 Why Troublest Thou The Master Any Further

The messengers assume there is nothing left Jesus can do.

Master here shows respect, but it also assumes real limits on his power.

They are trying to spare Jairus more disappointment, not insult him.

Their assumption is about to be proven completely wrong.

🤷 They assume nothing more can help

👑 Master still shows respect for Jesus

💔 They want to spare Jairus more pain

📖 Their assumption is about to be wrong

## 😨 Be Not Afraid, Only Believe

Jesus speaks directly into the worst news a father could hear.

Be not afraid does not mean the situation feels safe.

Only believe asks Jairus to keep trusting even when hope seems gone.

This echoes the same lesson the storm already taught the disciples earlier in this Gospel.

😨 The news is genuinely terrible

🙏 Only believe means keep trusting

🌊 This echoes the earlier storm lesson

📖 Faith is asked for, not denial

## 🚪 He Suffered No Man To Follow Him

Jesus limits who gets to witness what happens next.

This is not the large crowd that followed him before.

Some moments in Jesus's ministry stayed small and private on purpose.

Not every miracle was meant for public display.

🚪 Jesus limits who can follow

👥 This is not the earlier crowd

🤫 Some moments stayed private on purpose

📖 Not every miracle was public

## 👥 Save Peter, And James, And John

These three disciples appear together at several major moments in the Gospels.

Their presence here marks this as one of those especially significant events.

Being chosen was about closeness to Jesus, not special rank among the twelve.

Jesus is about to let them witness something very few people will ever see.

👥 These three appear at key moments

⭐ This marks a significant event

🤝 Closeness mattered more than rank

📖 Few people will see what comes next

## 📢 The Tumult, And Them That Wept And Wailed Greatly

Tumult means loud, chaotic noise and commotion.

Wailing in this culture was a real, expected part of public mourning.

This was not quiet grief held privately indoors.

The noise confirms that everyone there already believed she was truly dead.

📢 Tumult means loud chaotic noise

😭 Wailing was expected public mourning

🏠 This grief was not private

📖 Everyone believed she was already dead
---
# Mark 5:39-43
# ✨ Talitha Cumi
---
## ❓ Why Make Ye This Ado, And Weep?

Ado means commotion or fuss, more than simple sadness.

Jesus questions the mourning in front of people who are certain she is dead.

His question is not mocking their grief.

He already knows something they do not know yet.

❓ Ado means loud commotion

😭 Everyone believes she is dead

🙅 Jesus is not mocking their grief

📖 Jesus already knows more than they do

## 😴 The Damsel Is Not Dead, But Sleepeth

Sleepeth here is not a denial that she had actually died.

Jesus uses sleep as a picture of death that can still be reversed.

To everyone else in the room, this statement sounds impossible.

Jesus is about to prove the picture true in front of them.

😴 Sleepeth pictures death as reversible

🙅 This is not a denial of death

🤨 The statement sounds impossible to them

📖 Jesus is about to prove it true

## 😂 They Laughed Him To Scorn

These are the same mourners who were wailing just moments earlier.

Their grief turns instantly into mockery at his words.

They are completely certain of what they already witnessed.

Their confidence is about to be interrupted by something they never expected.

😭 These are the same recent mourners

😂 Grief turns quickly into mockery

✅ They feel completely certain of death

➡️ Their certainty is about to be interrupted

## 👨‍👩‍👧 He Taketh The Father And The Mother

Jesus clears the room of everyone except the smallest, closest circle.

Only Jairus, his wife, and the three chosen disciples remain.

This miracle happens away from the doubting, mocking crowd.

Intimacy, not spectacle, surrounds this particular moment.

🚪 Jesus clears out the doubting crowd

👨‍👩‍👧 Only the parents and three disciples remain

🤫 This miracle stays away from the crowd

📖 Intimacy, not spectacle, defines this moment

## 🗣️ Talitha Cumi

Talitha cumi is Aramaic, the everyday language Jesus actually spoke.

It means little girl, I say unto thee, arise.

Mark preserves the exact words Jesus used, not just their meaning.

This small detail suggests someone who was actually in the room remembered it precisely.

🗣️ Talitha cumi is Aramaic for little girl

📜 Mark preserves Jesus's exact words

👁️ This suggests a real eyewitness memory

📖 Arise is a command, not a wish

## 🔢 She Was Of The Age Of Twelve Years

Her exact age matches the number already used earlier in this very chapter.

The woman with the issue of blood had suffered for that same number of years.

Two different stories, placed side by side, now share one number between them.

Mark seems to want readers to notice both twelve year spans together.

🔢 Her age matches an earlier number

🩸 The woman suffered twelve years too

🔗 Two stories now share one number

📖 Mark links both moments on purpose

## 😳 Astonished With A Great Astonishment

This doubled phrase is a Hebrew way of making a feeling as strong as possible.

A plain word for surprise was not considered strong enough here.

The witnesses had just seen a dead child stand up and walk.

No ordinary word could carry the weight of what they had just seen.

🔁 The doubled phrase intensifies the feeling

😳 Plain surprise was not strong enough

🚶 A dead child just stood and walked

📖 No ordinary word could hold this moment

## 🤐 He Charged Them Straitly That No Man Should Know It

Straitly means strictly and firmly, leaving no room for misunderstanding.

Jesus repeatedly asks witnesses to stay quiet about major miracles in this Gospel.

Too much public attention too soon could put his mission at risk.

This command protects the timing of what Jesus still needs to do.

🤐 Straitly means strictly and firmly

🙅 Jesus often limits miracle publicity

⚠️ Attention too soon could create risk

📖 This command protects his timing

## 🍞 Commanded That Something Should Be Given Her To Eat

This is a small, practical detail right after an enormous miracle.

A truly risen girl would still be hungry like anyone else.

Jesus cares about her ordinary needs, not only the dramatic moment.

Even after raising the dead, Jesus still thinks about a simple meal.

🍞 This detail is small and practical

🙋 A risen girl would still be hungry

❤️ Jesus cares about ordinary needs too

📖 Even miracles make room for a meal
`.trim();

export const MARK_FIVE_PERSONAL_SECTIONS = parseMarkFiveRawNotes(MARK_FIVE_RAW_NOTES);
