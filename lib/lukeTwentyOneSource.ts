export type LukeTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwentyOneRawNotes(rawText: string): LukeTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 21:${startVerse}` : `Luke 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 21 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWENTY_ONE_RAW_NOTES = `# Luke 21:1-4
# 👛 The Widow Who Gave Everything
---
## Rich Men Casting Their Gifts Into The Treasury

The treasury was a collection area inside the temple court where people gave their offerings.

Thirteen trumpet shaped chests stood there to receive different kinds of gifts.

Wealthy givers could drop in large sums without anyone missing the sound.

This scene sets up a sharp contrast with what happens next.

🏛️ Treasury means the temple's giving area

💰 Thirteen chests collected different offerings

👑 Wealthy gifts went unnoticed in size

📖 This scene sets up a contrast

## A Certain Poor Widow Casting In Two Mites

A mite was the smallest coin in use in the Roman world.

It took well over a hundred mites to equal a single day's wage.

Jesus watches this one woman the same way He watched the rich givers.

Nobody else in the temple notices her gift.

Jesus notices what the crowd overlooks.

🪙 Mite means the smallest Roman coin

📉 A mite was worth very little

👀 Jesus watches her, unlike the crowd

📖 He notices what everyone else overlooks

## This Poor Widow Hath Cast In More Than They All

This does not mean her coins added up to more money than the rich gave.

Jesus is measuring the gift against what each person kept for themselves.

The rich still had plenty left over after their large donations.

The widow had nothing left over at all.

Measured that way, her two mites outweighed every large gift in the treasury.

⚖️ Not a literal count of coins

💰 Jesus measures gifts against what is kept

🏦 The rich still had plenty left

📖 Her sacrifice outweighed every large gift

## Of Their Abundance Cast In Unto The Offerings Of God

Abundance here means what a person has left over after their needs are covered.

The rich bring their gift out of that leftover surplus.

Giving from surplus costs comparatively little, even if the total sum looks large.

The text does not condemn their gift, only compares it honestly.

💼 Abundance means money left over

📊 Rich gifts came from that surplus

💸 Surplus giving costs comparatively little

📖 The text compares honestly, not harshly

## Of Her Penury Cast In All The Living That She Had

Penury means deep poverty, having barely enough to survive on.

The word living here means her whole means of support, not just pocket change.

She did not give from what was left over.

She gave what she needed for her very next meal.

Her gift risked her own survival in a way the rich gift never did.

🍞 Penury means deep, desperate poverty

💔 Living meant her whole means of support

🙏 She gave what she needed to survive

📖 Her gift risked her own survival

# Luke 21:5-9
# 🏛️ Not One Stone Shall Be Left
---
## Adorned With Goodly Stones And Gifts

Herod's temple was famous across the Roman world for its enormous white stones.

Some of those stones were cut so large that ancient visitors wrote about their size.

Gifts here means costly items people had donated to decorate the building itself.

To the disciples, this temple looked like it would stand forever.

🏛️ Herod's temple used massive white stones

📏 Visitors marveled at their huge size

🎁 Gifts means donated decorations, not money

📖 It looked permanent to the disciples

## There Shall Not Be Left One Stone Upon Another

Jesus predicts the total destruction of the building they are admiring.

This happened in the year seventy when Roman armies destroyed Jerusalem.

The stones the disciples found so impressive would not protect the city at all.

What looks permanent to people is never permanent to God.

💥 Jesus predicts total destruction ahead

🗓️ Rome destroyed the temple in year seventy

🪨 Impressive stones could not protect the city

📖 Nothing built by people stays forever

## Master, But When Shall These Things Be?

These things points back to the destruction Jesus just described.

The disciples want a timeline and a warning sign to watch for.

Jesus answers the sign question first before He ever answers the timing question.

The rest of the chapter unfolds as His full answer.

❓ These things means the temple's fall

🗣️ Disciples ask for timing and a sign

🔄 Jesus answers the sign question first

📖 The whole chapter answers this question

## Take Heed That Ye Be Not Deceived

Jesus opens His answer with a warning instead of a date.

Deceived means being led to believe something false about what is happening.

Clear thinking matters more to Him right now than exact timing.

Every warning that follows in this chapter builds on this first command.

⚠️ A warning comes before any date

🌀 Deceived means believing something false

🧠 Clear thinking matters more than timing

📖 Every warning below builds on this one

## Many Shall Come In My Name, Saying, I Am Christ

False teachers would claim to speak for Jesus or even claim to be Him.

Using His name gave these claims instant credibility with a worried crowd.

The warning is not about obvious frauds who reject Jesus outright.

It is about convincing voices that sound like they belong to Him.

🎭 False teachers would claim His name

🏷️ His name made the claims sound credible

🙅 The danger is not obvious fraud

📖 It is a convincing voice that lies

## The End Is Not By And By

By and by is an old way of saying right away or soon.

Jesus tells His disciples not to panic at every war or rumor of war.

Wars and commotions are a normal part of history before the end.

A troubled headline is not the same as a final signal.

⏳ By and by means right away

😨 Jesus warns against panic over wars

📰 Wars are normal before the end

📖 A headline is not the final sign

# Luke 21:10-13
# ⚔️ Wars And Signs Before The End
---
## Nation Shall Rise Against Nation, And Kingdom Against Kingdom

This line describes widespread war between whole nations and kingdoms.

It echoes language used by Old Testament prophets describing times of judgment.

Large scale conflict has marked nearly every century since Jesus spoke this.

These wars are a sign that the age is troubled, not a sign the end has arrived.

⚔️ Nation against nation means widespread war

📜 This echoes Old Testament prophetic language

🕰️ Large conflict has marked every century

📖 It signals trouble, not the end itself

## Great Earthquakes, And Famines, And Pestilences

Pestilences means widespread deadly disease, what today gets called an epidemic.

Famine means a severe shortage of food across a whole region.

Ancient listeners already knew the fear behind each of these three words firsthand.

Jesus names normal disasters, not supernatural signs limited only to the future.

🦠 Pestilence means widespread deadly disease

🌾 Famine means severe regional food shortage

😨 Ancient listeners feared all three already

📖 These are normal disasters, not only future signs

## Fearful Sights And Great Signs From Heaven

The text does not describe exactly what these heavenly signs looked like.

Ancient readers linked unusual events in the sky to major turning points.

Jesus groups this sign together with earthquakes and famine.

It is one more disruption in a troubled world, not a separate mystery.

👀 The exact signs are never described

🌌 Ancient readers linked the sky to history

🔗 Jesus groups this with earthquakes and famine

📖 One more disruption, not a mystery

## They Shall Lay Their Hands On You, And Persecute You

Jesus shifts from global disasters to what His own followers will personally face.

Lay hands on you means arrest, not a gentle touch.

Being delivered up to synagogues and prisons means formal religious and legal trials.

Being brought before kings and rulers means facing the highest political power available.

Persecution for following Jesus starts long before the final end arrives.

✋ Lay hands on means formal arrest

🏛️ Synagogues meant formal religious trials

👑 Kings and rulers meant real political power

📖 Persecution begins long before the end

## It Shall Turn To You For A Testimony

This does not mean the suffering itself is good news.

Testimony here means a public opportunity to speak honestly about Jesus.

Standing trial becomes a platform instead of only a punishment.

God can use even an unjust arrest to make His name known.

🙅 The suffering itself is not good news

🎤 Testimony means a chance to speak about Jesus

⚖️ A trial becomes a platform, not just punishment

📖 God can use suffering to be known

# Luke 21:14-19
# 🗣️ Betrayed For My Name's Sake
---
## Settle It Therefore In Your Hearts, Not To Meditate Before What Ye Shall Answer

Meditate here means rehearsing a defense ahead of time out of fear.

Jesus tells His followers not to spend their energy preparing a nervous speech.

Settling it in your hearts means deciding ahead of time to trust God instead.

Peace comes from trust, not from a perfectly rehearsed answer.

📝 Meditate means rehearsing a fearful defense

🚫 Jesus says do not prepare a nervous speech

🙏 Settle it means choosing to trust God

📖 Peace comes from trust, not rehearsal

## I Will Give You A Mouth And Wisdom

Jesus promises to supply the words Himself in the moment of need.

This does not remove the danger of the trial they are facing.

It removes the burden of having to face it using only their own strength.

Wisdom here means an answer their accusers cannot actually overturn.

🗣️ Jesus promises to supply the words

⚠️ The danger of the trial still remains

💪 The burden no longer rests on them alone

📖 Their answer will stand against every accusation

## Ye Shall Be Betrayed Both By Parents, And Brethren, And Kinsfolks, And Friends

This list moves from closest family outward to the widest circle of friends.

Following Jesus could cost even the most basic family loyalty in this culture.

No relationship was guaranteed to survive this kind of pressure and fear.

Jesus warns about this cost honestly instead of hiding it from them.

👪 The list moves from family to friends

💔 Loyalty itself could not be guaranteed

😨 Fear could break even close relationships

📖 Jesus warns honestly about this real cost

## Some Of You Shall They Cause To Be Put To Death

Jesus does not promise physical safety to everyone who follows Him.

Some of His own disciples would eventually be executed for their faith.

This promise sits honestly right next to the harder warnings around it.

Faith in Jesus was never sold here as a guarantee of comfort.

⚰️ Physical safety is never promised here

🩸 Some disciples would be executed for their faith

🤝 Hard truth sits beside every warning

📖 Faith was never sold as comfort

## Ye Shall Be Hated Of All Men For My Name's Sake

Hatred here is not random, it is tied directly to the name of Jesus.

All men does not mean literally every single person on earth.

It means hostility this wide should be expected, not treated as unusual.

The reason for the hatred matters more than its size.

😠 The hatred is tied to Jesus's name

🌍 All men means widespread, not literally universal

🤷 Wide hostility should be expected, not surprising

📖 The reason matters more than the size

## There Shall Not An Hair Of Your Head Perish

This promise does not contradict verse sixteen, which already mentioned death.

An hair of your head perish is an old idiom for total, careless harm.

The promise is about ultimate safety in God's hands, not about avoiding every danger.

Even death could not actually touch what God was protecting.

🙅 This does not contradict verse sixteen

💇 The idiom means total, careless harm

🛡️ The promise covers ultimate safety in God

📖 Death could not touch what God protects

## In Your Patience Possess Ye Your Souls

Patience here means staying steady under pressure instead of panicking.

Possess your souls means keeping control of your own inner peace.

No outside circumstance gets to decide how someone responds on the inside.

This verse closes the warning section with one simple, practical command.

🧘 Patience means staying steady under pressure

🔒 Possess your soul means guarding inner peace

🌪️ Outside events do not control the inside

📖 One simple command closes this warning

# Luke 21:20-24
# 🏙️ The Days Of Vengeance On Jerusalem
---
## When Ye Shall See Jerusalem Compassed With Armies

Compassed means surrounded completely, with no way left to escape unnoticed.

This warning points to the Roman siege that actually happened in the year seventy.

Jesus gives His followers a visible, concrete signal to watch for.

When the armies arrive, the time for debate is already over.

🏰 Compassed means completely surrounded

🗓️ This points to the siege in year seventy

👀 Jesus gives a visible, concrete signal

📖 The time for debate ends there

## Let Them Which Are In Judaea Flee To The Mountains

Jesus gives one clear instruction once the siege begins, run immediately.

Judaea was the region surrounding Jerusalem, not the city alone.

The mountains offered natural hiding places away from the coming army.

Obedience here meant trusting the warning over the instinct to stay and watch.

🏃 Jesus gives one clear instruction, run

🗺️ Judaea means the region, not just the city

⛰️ Mountains offered safety from the army

📖 Trusting the warning mattered more than watching

## These Be The Days Of Vengeance, That All Things Which Are Written May Be Fulfilled

Which are written points back to warnings already given through the Old Testament prophets.

Vengeance here means God's judgment falling on a city that rejected its Messiah.

This was not a random disaster with no connection to anything before it.

Scripture had already described this moment long before it actually happened.

📜 Which are written means older prophetic warnings

⚖️ Vengeance means God's judgment on the city

🚫 Not a random disaster without warning

📖 Scripture described this moment long before

## Woe Unto Them That Are With Child, And To Them That Give Suck

Give suck is an old way of saying nursing a baby.

Pregnant women and nursing mothers could not move quickly enough to escape danger.

Jesus names the most vulnerable people first when describing this disaster.

His warning carries real compassion, not just a prediction of judgment.

🍼 Give suck means nursing a baby

🏃 Pregnant women could not flee quickly

💔 The most vulnerable are named first

📖 Compassion sits inside this hard warning

## They Shall Fall By The Edge Of The Sword, And Shall Be Led Away Captive

This describes two outcomes of the coming siege, death or captivity.

Edge of the sword means killed in direct military conflict.

Led away captive points to the mass deportation that followed many ancient conquests.

Roman historians later recorded both of these outcomes happening exactly this way.

⚔️ The sword means death in conflict

⛓️ Captive means forced deportation afterward

📚 Roman historians recorded both outcomes

📖 This prophecy matched real history later

## Jerusalem Shall Be Trodden Down Of The Gentiles, Until The Times Of The Gentiles Be Fulfilled

Trodden down pictures a city crushed underfoot by foreign armies.

Gentiles here means non Jewish nations, specifically Rome at this point in history.

Until sets a limit, this control was never meant to last forever.

Jerusalem's hardship had an appointed end, even if that end was still far off.

👣 Trodden down means crushed underfoot

🌍 Gentiles means non Jewish ruling nations

⏳ Until means this control had a limit

📖 Jerusalem's hardship was never meant to last forever

# Luke 21:25-28
# ☁️ The Son Of Man Coming In Glory
---
## Signs In The Sun, And In The Moon, And In The Stars

Ancient writers often used sky imagery to describe major shifts in political power.

This is not necessarily describing a literal, scientific change happening in space.

It is the kind of language the prophets already used for the fall of great nations.

The whole created order appears shaken when its rulers finally fall.

🌞 Sky imagery often described political upheaval

🔭 Not necessarily a literal scientific event

📜 Prophets used this language for falling nations

📖 Creation appears shaken when rulers fall

## The Sea And The Waves Roaring

The sea in ancient Jewish imagery often pictured chaos and danger.

A roaring sea added to the sense that the whole natural world felt unstable.

Nations behave like that same roaring sea in the verse right before this one.

Political chaos and natural chaos are pictured together here on purpose.

🌊 The sea often pictured chaos

📣 A roaring sea signaled instability

🌍 Nations are compared to that same sea

📖 Political and natural chaos appear together

## Men's Hearts Failing Them For Fear

Hearts failing is an old way of describing complete terror and despair.

People are not just worried here, they feel like hope itself has run out.

Looking after those things coming on the earth means dreading what comes next.

Jesus names this fear honestly before offering any comfort at all.

💔 Hearts failing means complete terror

😨 Hope itself feels like it ran out

👀 People dread whatever comes next

📖 Jesus names the fear before any comfort

## The Son Of Man Coming In A Cloud With Power And Great Glory

Son of man is a title Jesus often used for Himself throughout Luke.

Coming in a cloud pictures a visible, unmistakable arrival, not a quiet one.

Power and great glory stand in sharp contrast to His first, humble arrival.

The same Jesus who was once rejected returns now as the clear ruler of all.

👑 Son of man is Jesus's own title

☁️ A cloud pictures a visible arrival

💪 Power and glory contrast His first coming

📖 The rejected one returns as ruler

## Look Up, And Lift Up Your Heads, For Your Redemption Draweth Nigh

This command answers the fear described just two verses earlier.

Redemption here means the final rescue of everyone who belongs to Jesus.

Draweth nigh means it is approaching, not that it has already arrived.

The same events that terrify the world are hope for His own people.

🙌 This answers the fear from before

🎁 Redemption means final rescue for His people

⏳ Draweth nigh means it is approaching

📖 The same events mean hope, not terror

# Luke 21:29-33
# 🌳 Behold The Fig Tree
---
## Behold The Fig Tree, And All The Trees

Jesus switches from frightening signs to a simple, everyday picture.

A fig tree was a common sight anyone in that culture would recognize instantly.

And all the trees widens the picture so the lesson applies generally, not to one species.

Ordinary nature becomes the teacher for a moment.

🌳 Jesus shifts to an everyday picture

🌱 Fig trees were common and familiar

🍃 All the trees widens the lesson

📖 Ordinary nature becomes the teacher

## Ye See And Know Of Your Own Selves That Summer Is Nigh At Hand

Shoot forth means new leaves budding out on the branches.

Nobody needs a teacher to explain that budding leaves mean summer is close.

The lesson works the same way for the signs Jesus already described.

Some conclusions are obvious once you know what you are looking for.

🌿 Shoot forth means new leaves budding

👀 Nobody needs a teacher for this

🔗 The same logic applies to the signs

📖 Obvious conclusions need only the right signal

## Know Ye That The Kingdom Of God Is Nigh At Hand

These things come to pass ties directly back to everything described earlier in the chapter.

The kingdom of God here means God's full and final rule breaking into the world.

The fig tree picture now applies directly to that coming kingdom.

Watching the signs is really a way of watching for God's rule arriving.

🔗 These things ties back to the chapter

👑 Kingdom of God means God's final rule

🌳 The fig tree picture applies here directly

📖 Watching signs means watching for God's rule

## This Generation Shall Not Pass Away, Till All Be Fulfilled

This generation has caused real debate among readers for centuries.

It may mean the generation alive when Jerusalem actually fell in the year seventy.

It may also mean the generation that will be alive when Jesus finally returns.

The text does not force readers into only one certain answer here.

Either way, the promise itself does not fail.

🤔 This phrase has caused real debate

🗓️ It may mean the generation of year seventy

🔮 It may mean the final generation instead

📖 Either way, the promise does not fail

## Heaven And Earth Shall Pass Away, But My Words Shall Not Pass Away

Heaven and earth pass away names the most permanent things people can imagine.

Jesus claims His own words will outlast even those permanent things.

This is not a casual comparison, it is a direct claim to divine authority.

Everything else in creation is temporary next to what Jesus has spoken.

🌌 Heaven and earth are the most permanent things

🗣️ Jesus claims His words outlast them

👑 This is a direct claim to divine authority

📖 Everything else is temporary next to His words

# Luke 21:34-38
# 🙏 Watch Ye Therefore, And Pray Always
---
## Hearts Be Overcharged With Surfeiting, And Drunkenness, And Cares Of This Life

Surfeiting means overindulgence, eating and drinking far past any real need.

Overcharged pictures a heart weighed down until it can no longer think clearly.

Cares of this life means everyday worry that quietly crowds out attention to God.

All three dull a person the same way, just by different paths.

🍖 Surfeiting means eating past any need

⚖️ Overcharged means weighed down and dulled

😟 Cares of this life means everyday worry

📖 All three dull attention to God

## So That Day Come Upon You Unawares

That day refers back to the coming of the Son of man described earlier.

Unawares means catching someone completely by surprise, with no time left to prepare.

A distracted heart is the real danger Jesus is warning about here.

Readiness, not panic, is what He actually wants from His followers.

📅 That day means the Son of man's coming

😳 Unawares means caught completely by surprise

💭 A distracted heart is the real danger

📖 Readiness, not panic, is the goal

## As A Snare Shall It Come On All Them That Dwell On The Face Of The Whole Earth

A snare is a hidden trap, designed to catch an animal that never sees it coming.

Jesus compares that day to exactly this kind of sudden, hidden trap.

All them that dwell on the face of the whole earth widens this warning globally.

Nobody gets to assume this warning only applies to someone else.

🪤 A snare is a hidden trap

😮 That day comes just as suddenly

🌍 The warning reaches the whole earth

📖 Nobody is exempt from this warning

## Watch Ye Therefore, And Pray Always

Watch means staying spiritually alert instead of spiritually distracted.

Pray always means a constant posture of dependence on God, not nonstop talking.

These two commands answer every warning given earlier in the chapter.

Readiness is built through ongoing attention, not a single moment of panic.

👀 Watch means staying spiritually alert

🙏 Pray always means constant dependence on God

🔁 These commands answer the chapter's warnings

📖 Readiness is built through ongoing attention

## Accounted Worthy To Escape All These Things, And To Stand Before The Son Of Man

Worthy here does not mean earning this outcome through personal effort alone.

It means being found faithful and ready when the moment actually arrives.

Standing before the Son of man pictures a final, confident meeting, not a fearful one.

The whole point of watching and praying is to be ready for exactly this meeting.

🙏 Worthy means found faithful, not self earned

✅ It means being ready when it arrives

🧍 Standing before Him pictures a confident meeting

📖 Watching and praying prepares for this meeting

## He Was Teaching In The Temple, And At Night He Went Out, And Abode In The Mount Of Olives

Jesus spends His final days following a steady daily rhythm.

Mornings and days were spent teaching openly inside the temple courts.

Nights were spent outside the city on the Mount of Olives instead.

This same mountain is where Jesus will pray in agony just before His arrest.

🗓️ A steady daily rhythm marks His final days

🏛️ Mornings were spent teaching in the temple

🌙 Nights were spent on the Mount of Olives

📖 Soon He will pray here in agony

## All The People Came Early In The Morning To Him In The Temple

Crowds keep returning to hear Jesus even this close to His arrest.

Early in the morning shows real eagerness, not casual curiosity.

The leaders plot against Him in private while the people still gather to Him in public.

Chapter twenty one closes with Jesus still teaching, still faithful to the task in front of Him.

👥 Crowds keep returning despite the danger

🌅 Early morning shows real eagerness

🤫 Leaders plot while people still gather

📖 Jesus stays faithful to the very end
`.trim();

export const LUKE_TWENTY_ONE_PERSONAL_SECTIONS = parseLukeTwentyOneRawNotes(LUKE_TWENTY_ONE_RAW_NOTES);
