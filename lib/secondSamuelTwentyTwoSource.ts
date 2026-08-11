export type SecondSamuelTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwentyTwoRawNotes(rawText: string): SecondSamuelTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 22:${startVerse}` : `2 Samuel 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 2 Samuel 22 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWENTY_TWO_RAW_NOTES = `# SecondSamuel 22:1-4
# 🎵 A Song Of Rock And Refuge
---
## 📜 Spake Unto The LORD The Words Of This Song

This song appears again almost word for word as Psalm 18.

David likely sang it near the end of his life.

He was looking back over decades of danger.

Saul, the Philistines, and other enemies are already defeated by this point in the story.

This is not a prayer asking for rescue.

It is a song of thanks after the rescue already happened.

📜 This song repeats again as Psalm 18

🕰️ David sang it near life's end

✅ Every enemy is already defeated

📖 It thanks God, it does not beg

## 🪨 The LORD Is My Rock, And My Fortress

A rock here is not just any stone.

It means a high, defensible slab of rock a person could climb up and out of reach.

David hid in exactly this kind of terrain for years, running from Saul in the wilderness.

A fortress is a different picture, a built stronghold with walls, not a natural feature.

Together the two images cover the safety God found for him and the safety God built for him.

🪨 Rock means a high, climbable stone shelter

🏰 Fortress means a walled, built stronghold

🏜️ David hid in terrain like this for years

📖 God was both natural refuge and built defense

## 🤲 My Deliverer

A rock and a fortress protect someone who is already safe inside them.

A deliverer does something different.

It means someone who reaches into danger and physically pulls a person out.

David is not only saying God kept him safe.

He is saying God rescued him while the danger was still happening.

🪨 Rock and fortress mean passive safety

🤲 Deliverer means active rescue

⚔️ God pulled David out mid danger

📖 Both protection and rescue are true of God

## 👤 The God Of My Rock, In Him Will I Trust

David just called God his rock.

Now he makes something clear, God is not simply like a rock.

God is the person behind the rock, the one he actually trusts.

The image was never meant to replace a relationship with a thing.

It was always pointing to God himself.

🪨 David already called God his rock

👤 Now he names God as a person

🙏 Trust rests in God, not the image

📖 The metaphor always pointed to God himself

## 🛡️ He Is My Shield, And The Horn Of My Salvation

A shield blocks a blow before it lands.

A horn is a different picture.

An ox or a bull fights with its horn.

The horn is the animal's weapon and its strength.

Calling God the horn of my salvation means God is the strength that saves him.

One image blocks harm.

The other image is the power that saves him.

🛡️ Shield means God blocks the blow

🐂 Horn is an animal's weapon and strength

💪 Horn of salvation means saving strength

📖 God is both defense and raw power

## 🗼 My High Tower, And My Refuge, My Saviour

A high tower let a person see danger from far away.

It also kept them safely out of reach.

A refuge is different.

It is a place to run to when danger already arrived.

Saviour is the plainest of the four titles.

It simply means the one who rescues.

Four different pictures build to one meaning.

God keeps David safe in every kind of danger.

🗼 Tower means seeing danger from far off

🏃 Refuge means a place to run to

🙌 Saviour simply means the one who rescues

📖 Four pictures, one truth, God keeps him safe

## ⚔️ Thou Savest Me From Violence

This is not only about surviving war.

It includes personal violence, ambush, and betrayal by people close to him.

David faced exactly that kind of danger from his own family, not just foreign armies.

Absalom's rebellion and Saul's years of jealousy both count as this kind of violence.

God's protection covered every source of danger, not only the battlefield.

⚔️ Violence includes ambush and betrayal, not just war

👨‍👦 Absalom's rebellion counted as this danger too

😠 So did Saul's years of jealous pursuit

📖 God's protection reached beyond the battlefield

## 🙏 I Will Call On The LORD, Who Is Worthy To Be Praised

David commits to calling on God before he even names a problem.

Worthy to be praised means God deserves praise regardless of the outcome.

This is not a transaction, praise now in exchange for rescue later.

David is stating a settled fact about who God is.

The rescue mentioned next is the result of that trust, not the reason for it.

🙏 David calls on God before naming a problem

👑 Worthy to be praised means praise either way

🤝 This is not a transaction with God

📖 Trust comes first, rescue follows


# SecondSamuel 22:5-8
# 🌊 Compassed By The Sorrows Of Death
---
## 🌊 The Waves Of Death Compassed Me

Waves of death is a picture of drowning.

David felt danger closing in on every side, like water rising over his head.

Compassed means surrounded completely, with no clear way out.

This is not a mild fear, it is the feeling of being about to die.

🌊 Waves of death pictures drowning

🔄 Compassed means surrounded on every side

😰 This describes real fear of dying

📖 David is not exaggerating his danger

## 😈 The Floods Of Ungodly Men Made Me Afraid

The flood image continues from the verse before it.

Ungodly men means people who live without regard for God.

David names actual enemies here, not just abstract danger.

Their hostility felt like rising water threatening to overwhelm him.

🌊 The flood image continues here

😈 Ungodly men means people without regard for God

👥 These are real enemies, not abstract fear

📖 Their hostility felt like rising water

## ⚰️ The Sorrows Of Hell Compassed Me About

Hell here does not mean the New Testament idea of eternal punishment.

In the Old Testament, this word usually points to Sheol, the grave, or the realm of the dead.

Sorrows of hell means the grief and terror of feeling close to death itself.

David felt surrounded by that closeness to dying, not just by enemies.

⚰️ Hell here means Sheol, the grave

😢 Sorrows of hell means grief near death

🔄 Compassed about means surrounded again

📖 Death itself felt close, not just enemies

## 🪤 The Snares Of Death Prevented Me

Prevented does not mean stopped, the way the word is used today.

In King James English, prevented means went before, or came to meet.

A snare is a trap, often used to catch an animal by the foot.

The traps of death were already ahead of him, waiting.

🪤 Snare means a trap, like for an animal

⏳ Death's traps were already waiting

😰 Danger did not creep up on him

📖 Prevented is old English for went before

## 🙏 In My Distress I Called Upon The LORD

After three straight images of being surrounded and trapped, David finally acts.

Distress means the pressure had become too much to carry alone.

Calling on the LORD is the turning point of the whole song.

Every image before this one built toward this one decision.

🌊 Three images built up unbearable pressure

📣 Distress means the weight became too much

🙏 Calling on God is the turning point

📖 Every earlier image leads to this one choice

## 👂 He Did Hear My Voice Out Of His Temple

God's temple is pictured here as his dwelling place, not only the building in Jerusalem.

David's cry reached all the way to where God actually is.

This answers the fear from the verses before it, no one heard him then.

Now someone hears him, and it is God himself.

🏛️ Temple pictures God's own dwelling place

📣 David's cry reached all the way there

👂 God heard, answering the earlier silence

📖 The cry did not go nowhere

## 😠 Then The Earth Shook And Trembled, Because He Was Wroth

Wroth means angry, a word that has mostly disappeared from modern English.

David describes God's answer to his cry as an earthquake.

The whole physical world reacts to God's anger on David's behalf.

This is not decoration, it shows how seriously God took the threat against David.

😠 Wroth is an old word for angry

🌍 The earth shakes as God's response

⚡ Creation reacts to God's anger for David

📖 God took the threat against David seriously


# SecondSamuel 22:9-12
# 🌩️ The LORD Rides Down In Storm And Fire
---
## 🐂 There Went Up A Smoke Out Of His Nostrils

This pictures God as a warrior breathing hard with anger.

Think of a bull snorting before it charges.

Ancient readers pictured extreme anger this way, with heat and smoke.

This is not a literal description of God's body.

It is a vivid picture of how serious his anger was.

🐂 Pictures anger like a bull about to charge

🔥 Smoke and fire showed extreme anger

🎨 Not a literal description of God's body

📖 It shows how seriously God took this

## 🔥 Fire Out Of His Mouth Devoured, Coals Were Kindled By It

The fire imagery continues, now coming from God's mouth instead of his nostrils.

Devoured means the fire consumed everything in its path completely.

Coals kindled means burning embers were set ablaze by that same fire.

Ancient warfare often used fire as a weapon, so this image felt immediately real to the first readers.

🔥 Fire from God's mouth continues the image

💨 Devoured means it consumed everything

🪨 Coals kindled means embers set ablaze

📖 This weapon felt real to ancient readers

## 🌌 He Bowed The Heavens Also, And Came Down

Bowed means bent down, the way a person leans down to pick something up.

David pictures the sky itself bending low so God could step down to him.

This shows God is not distant or unreachable in David's crisis.

God comes personally, not through a messenger or a sign.

🌌 Bowed means the sky bent down

👣 God pictured stepping down personally

🚫 Not sending a messenger instead

📖 God came himself, not from a distance

## ⛈️ Darkness Was Under His Feet

This continues the picture of God descending like a king in a storm.

Dark storm clouds are pictured as the ground under his feet as he comes down.

Ancient Near Eastern gods were often pictured riding storms, but David gives that picture only to the LORD.

The storm is not a rival power, it is God's own transportation.

⛈️ Storm clouds pictured as ground under his feet

👑 God descends like a king in a storm

🌩️ Storm imagery given only to the LORD here

📖 The storm serves God, not the reverse

## 👼 He Rode Upon A Cherub, And Did Fly

A cherub is a class of angelic being, often pictured guarding God's presence.

Cherubim appear earlier guarding the entrance to Eden and on top of the ark of the covenant.

Riding a cherub pictures God moving through the sky with complete control and speed.

David is describing raw, fast, unstoppable power coming to rescue him.

👼 A cherub is a class of angelic being

🚪 Cherubim guarded Eden and the ark

💨 Riding one pictures unstoppable speed

📖 This power was coming to rescue David

## 🌬️ Seen Upon The Wings Of The Wind

This line repeats the same idea as the cherub, just with a different picture.

Now the wind itself carries God, like wings carrying a bird.

Hebrew poetry often says the same idea twice in two different images.

Both pictures agree on one thing, nothing could slow God down on his way to David.

🌬️ Wind pictured carrying God like wings

🔁 Restates the cherub image differently

📜 Hebrew poetry often repeats an idea twice

📖 Nothing could slow God's approach

## ⛺ He Made Darkness Pavilions Round About Him

A pavilion is a large tent, the kind a king or commander would use in a military camp.

Darkness pavilions pictures storm clouds wrapped around God like a tent.

This hides God's full glory rather than revealing it plainly.

Even coming to rescue David, God remains impossible to fully see or explain.

⛺ Pavilion means a large tent, like a king's

🌑 Storm clouds pictured wrapping around God

🙈 The image hides God rather than reveals him

📖 God remains beyond full human sight

## 🌊 Dark Waters, And Thick Clouds Of The Skies

This closes out the storm picture that began back in verse nine.

Water and cloud together build one continuous image of an overwhelming storm.

David is not describing ordinary weather.

He is describing what it looks like when the God of the universe moves.

🌊 Dark waters continue the storm picture

☁️ Thick clouds finish the image

🌪️ Not ordinary weather being described

📖 This is what God's movement looks like


# SecondSamuel 22:13-16
# ⚡ Thunder, Arrows, And The Sea Laid Bare
---
## ⚡ Through The Brightness Before Him Were Coals Of Fire Kindled

This restates the fire image from verse nine, now describing light instead of heat.

Brightness pictures lightning flashing out from the storm cloud surrounding God.

The coals catching fire show that same lightning striking and igniting as it goes.

The whole scene keeps building the picture of raw divine power on the move.

⚡ Brightness pictures lightning from the storm

🔥 Coals kindled shows lightning striking and igniting

🔁 Restates the fire image from verse nine

📖 The storm keeps building divine power

## ⛈️ The LORD Thundered From Heaven

Thunder is the sound of the same storm already pictured since verse nine.

Ancient readers heard thunder as the literal voice of a god speaking.

David gives that voice only to the LORD, not to any other god.

The most powerful sound in nature simply belongs to God.

⛈️ Thunder is the sound of God's storm

🗣️ Ancient people heard thunder as a god's voice

👑 David gives that voice only to the LORD

📖 The loudest sound in nature belongs to God

## 👑 The Most High Uttered His Voice

Most High is a title for God that emphasizes his position over every other power.

Uttered his voice restates the thunder from the line before it.

Hebrew poetry often pairs two lines that say almost the same thing.

Here that pairing makes the point twice, so the reader cannot miss it.

👑 Most High means God is over every power

🔁 Restates the thunder line before it

📜 Hebrew poetry often pairs matching lines

📖 The repetition makes sure the point lands

## 🏹 He Sent Out Arrows, And Scattered Them

The storm now becomes a weapon aimed directly at David's enemies.

Arrows pictures lightning striking down at specific targets.

Scattered them means the enemies were thrown into disorder and driven apart.

God is not just powerful in general, he is powerful against these specific people.

🏹 Arrows pictures lightning as a weapon

⚡ Aimed at specific enemies, not just anywhere

💨 Scattered means thrown into disorder

📖 God's power targeted David's actual enemies

## 📖 Lightning, And Discomfited Them

Discomfited means thrown into confusion and defeated, a much stronger word than it sounds today.

It was often used in the Old Testament to describe an army broken and routed in battle.

Lightning here is not just a light show.

It is the weapon that broke the enemy's ranks.

⚔️ Often described a routed army

⚡ Lightning acted as the actual weapon

🏃 The enemy's ranks were broken apart

📖 Discomfited is old English for defeated

## 🌊 The Channels Of The Sea Appeared

Channels of the sea means the ocean floor itself was exposed.

This pictures God's power as strong enough to pull back the sea like a curtain.

The image echoes the Red Sea splitting apart for Israel generations earlier.

Nothing, not even the ocean, can hide from this kind of power.

🌊 Channels of the sea means the ocean floor

🎭 Pictured like pulling back a curtain

🚶 Echoes the Red Sea splitting for Israel

📖 Nothing can hide from this power

## 🌍 The Foundations Of The World Were Discovered

Foundations of the world pictures the very base the earth rests on.

Discovered here means uncovered or laid bare, not found for the first time.

Even the deepest, most hidden parts of creation are exposed by God's anger.

🌍 Foundations means the base the earth rests on

👁️ Discovered means laid bare, not found

🕳️ Even the deepest parts of creation are exposed

📖 Nothing stays hidden from God's anger

## 🌬️ At The Blast Of The Breath Of His Nostrils

This closes the storm scene by returning to the nostrils image from verse nine.

Breath here pictures a powerful wind, strong enough to expose the sea floor.

The whole storm sequence begins and ends with the same picture of God's anger as breath and fire.

🌬️ Breath pictures a powerful, exposing wind

🔁 Returns to the nostrils image from verse nine

🎯 Frames the whole storm scene together

📖 The sequence begins and ends the same way


# SecondSamuel 22:17-20
# 🌊 Drawn Out Of Many Waters
---
## 🖐️ He Sent From Above, He Took Me

The storm imagery ends here, and the rescue itself finally happens.

Sent from above pictures God reaching down personally, not sending help through someone else.

Took me is a simple, tender word after eight verses of thunder and fire.

The power described in the storm was always aimed at this one moment.

🖐️ God reaches down personally here

🔚 The storm imagery ends at this line

🤲 Took me is simple and tender

📖 All that power aimed at this rescue

## 🌊 He Drew Me Out Of Many Waters

This returns to the drowning image from verse five, the waves and floods of death.

Drew out means physically lifted from danger, not just protected from a distance.

Many waters can also picture overwhelming trouble in general, not only literal water.

The danger that opened the song is the same danger closed here by rescue.

🌊 Returns to the drowning image from verse five

🤲 Drew out means physically lifted to safety

💧 Many waters pictures overwhelming trouble

📖 The song's opening danger is now closed

## 👑 He Delivered Me From My Strong Enemy

Strong enemy most likely points to Saul, the most dangerous threat of David's early life.

Naming the enemy as strong admits David could not have survived this alone.

The rescue only matters because the threat was real and serious.

👑 Strong enemy likely points to Saul

😓 Naming him strong admits David needed help

⚔️ The threat was real, not exaggerated

📖 That makes the rescue actually matter

## 🔁 For They Were Too Strong For Me

David repeats the point instead of moving past it quickly.

He is not ashamed to admit his own weakness in this moment.

The song's whole logic depends on this honesty, a strong God rescuing a weak man.

🔁 David repeats the point on purpose

😔 He is not ashamed to admit weakness

💪 A strong God rescues a weak man

📖 Honesty about weakness makes the rescue mean something

## 💥 They Prevented Me In The Day Of My Calamity

Prevented again means went before, or confronted, the same old meaning from verse six.

Calamity means a sudden disaster or crisis.

His enemies struck first, catching him at his lowest point.

💥 Calamity means a sudden disaster

🎯 Enemies struck at his lowest point

😰 He was caught off guard

📖 Prevented again means went before, not stopped

## 🪑 But The LORD Was My Stay

Stay here means support, something to lean on, not a place to remain.

This is the turning word of the whole verse.

Everything before it was danger, this word is rescue.

Even at his lowest, David had one thing holding him up.

🪑 Stay means support, not staying in place

🔄 The turning word of the whole verse

🙌 One thing held David up at his lowest

📖 God was the support under the danger

## 📏 He Brought Me Forth Also Into A Large Place

A large place is the opposite of the tight, trapped feeling from earlier in the song.

Ancient readers pictured danger as a narrow, cramped space with no room to move.

Rescue meant open space, room to breathe and act freely again.

📏 Large place is the opposite of trapped

🗺️ Danger was pictured as a cramped space

🌬️ Rescue meant room to breathe again

📖 Freedom followed the danger

## ❤️ He Delivered Me, Because He Delighted In Me

This is the reason behind everything in the song so far.

Delighted means God took real pleasure in David, not just a sense of duty.

The rescue was not owed to David for good behavior.

It came from how God actually felt about him.

❤️ Delighted means real pleasure, not duty

🎁 The rescue was not something David earned

🙏 It came from how God felt about him

📖 This explains every verse before it


# SecondSamuel 22:21-25
# ⚖️ Rewarded According To Righteousness
---
## 😬 The LORD Rewarded Me According To My Righteousness

This can sound uncomfortable, since David sinned badly with Bathsheba and Uriah.

This song looks back at a specific season, David's long years fleeing Saul, not his whole life.

During that season, David repeatedly refused to kill Saul when he had the chance.

Righteousness here means faithful, honest conduct in that specific test, not sinless perfection overall.

😬 Can sound strange given David's later sin

🕰️ This song looks at one season

🗡️ He refused to kill Saul

📖 Righteousness here means faithfulness in that test

## 🤲 According To The Cleanness Of My Hands Hath He Recompensed Me

Clean hands is a picture of someone who has not done anything shameful or violent to get ahead.

Recompensed means repaid or rewarded in return.

David is saying the reward matched how he actually acted, not how much he wanted power.

🤲 Clean hands means acting without shame or violence

💰 Recompensed means repaid in return

👑 He did not grab for power dishonestly

📖 The reward matched his conduct

## 🛤️ I Have Kept The Ways Of The LORD

Kept the ways means following God's direction even when it cost him something.

David had chances to seize the throne early and refused every one.

Following God's timing instead of forcing his own was the actual test here.

🛤️ Kept the ways means following God's direction

⏳ He waited instead of forcing his own timing

👑 He had chances to seize power early

📖 The test was patience, not just avoiding sin

## 📜 As For His Statutes, I Did Not Depart From Them

Statutes means God's specific laws and commands.

Judgments in the line before this one means God's decisions and standards more broadly.

Both words point to the same thing, David is claiming he stayed within the boundaries God set.

📜 Statutes means God's specific laws

⚖️ Judgments means God's broader standards

🚧 Both point to staying within God's boundaries

📖 David claims he did not cross them

## 🚶 I Was Also Upright Before Him, And Have Kept Myself From Mine Iniquity

Upright means walking straight, without the twisting and hiding that mark a guilty conscience.

Iniquity means sin, especially the kind that bends or twists what is right.

Kept myself shows this took real, ongoing effort, not accidental innocence.

🚶 Upright means walking straight, without hiding

🌀 Iniquity means sin that twists what is right

💪 Kept myself shows ongoing effort

📖 This was not accidental innocence

## 🔁 Therefore The LORD Hath Recompensed Me According To My Righteousness

This verse repeats verse twenty one almost word for word.

Hebrew poetry often opens and closes a section with the same line, like bookends.

Repeating it here closes out this section on integrity before moving to a new idea.

🔁 Repeats verse twenty one almost exactly

📚 Poetry often bookends a section this way

🚪 This closes out the integrity section

📖 The next section moves to a new idea


# SecondSamuel 22:26-28
# 🔄 God Answers Each Person In Kind
---
## 📖 With The Merciful Thou Wilt Shew Thyself Merciful

Shew is an old spelling of show, simply meaning to reveal or display.

This says God responds to people in a way that matches how they treat others.

A person who shows mercy will find God merciful toward them.

🔄 God responds in a way that matches

🤝 A merciful person finds God merciful

😊 The pattern holds throughout this verse

📖 Shew is an old spelling of show

## 🚶 With The Upright Man Thou Wilt Shew Thyself Upright

This repeats the same pattern with a different word, upright instead of merciful.

Upright means someone who deals honestly, without hidden motives.

The point lands twice so the reader cannot miss the principle.

🔁 Repeats the mercy pattern with a new word

🚶 Upright means honest, without hidden motives

🎯 Two examples make the principle land

📖 God mirrors honest people honestly

## 💎 With The Pure Thou Wilt Shew Thyself Pure

Pure describes someone whose motives are not mixed with selfishness or deceit.

A person with pure motives has nothing hidden to protect.

The pattern continues a third time here.

It is building toward a sharp contrast in the next line.

💎 Pure means motives without deceit

🔁 The pattern continues a third time

⏭️ It is building toward a contrast next

📖 Purity meets purity in God's response

## 🌀 With The Froward Thou Wilt Shew Thyself Unsavoury

Froward is an old word for stubborn, twisted, or deliberately contrary.

Unsavoury literally means bad tasting.

Here it pictures God opposing that same twisted attitude right back.

This is the sharp turn of the whole passage, God does not treat crooked people the same as honest ones.

📖 Froward is old English for stubborn and twisted

🍋 Unsavoury pictures God opposing that twisting

🔄 The sharp turn of the whole passage

➡️ God does not treat everyone the same way

## 😢 The Afflicted People Thou Wilt Save

Afflicted means people who are suffering, oppressed, or without power to help themselves.

God is described as being on their side specifically.

This is not a general statement about everyone, it names who God moves toward.

😢 Afflicted means suffering, without power to help themselves

🙌 God is described as on their side

🎯 Not a general statement, a specific one

📖 God moves toward the powerless

## 👀 Thine Eyes Are Upon The Haughty, That Thou Mayest Bring Them Down

Haughty means proud, looking down on other people.

God's eyes being upon someone here is not a comforting picture.

It means God is watching in order to act.

The same God who lifts the afflicted brings down the proud.

👀 Haughty means proud, looking down on others

👁️ Eyes upon someone here means watching to act

⬇️ God brings down the proud

📖 Lifting the low and humbling the proud, together


# SecondSamuel 22:29-31
# 🕯️ The Lamp That Lights His Darkness
---
## 🏮 Thou Art My Lamp, O LORD

Ancient homes used small oil lamps as the only source of light after dark.

Without one, a person could not see danger or find their way at all.

Calling God a lamp means God gives him the ability to see and move safely, even in the hardest moments.

🏮 Ancient homes relied on small oil lamps

🌑 Without one, a person is truly blind

👁️ God gives David the ability to see danger

📖 Light here means safety, not just brightness

## 💡 The LORD Will Lighten My Darkness

Darkness here pictures confusion, danger, or despair, not literal nighttime.

Lighten means to make bright, to turn that darkness into something he can see through.

This restates the lamp image from the line before it in plainer words.

🌑 Darkness pictures confusion and despair

💡 Lighten means turning it into light

🔁 Restates the lamp image plainly

📖 God turns confusion into clarity

## ⚔️ By Thee I Have Run Through A Troop

A troop here means a band of enemy soldiers.

Running through one alone would normally mean death.

David credits God's strength for making that kind of impossible feat happen.

⚔️ Troop means a band of enemy soldiers

💀 Running through one alone should mean death

💪 David credits God's strength for this

📖 The impossible became possible through God

## 🧱 By My God Have I Leaped Over A Wall

A wall in ancient warfare usually meant a city's defenses, built to keep enemies out.

Leaping over a wall pictures overcoming an obstacle that should have stopped him completely.

Both this line and the one before it use battle images most listeners would recognize instantly.

🧱 Wall means a city's defensive barrier

🦘 Leaping over pictures overcoming the impossible

⚔️ Both lines use familiar battle images

📖 God made the impossible obstacle passable

## 📖 As For God, His Way Is Perfect

Perfect in this kind of old English does not mean flawless the way the word is used now.

It means complete, whole, lacking nothing needed.

God's way being perfect means it is fully trustworthy, with nothing missing from it.

📖 Perfect here means complete, not flawless

🧩 It means nothing needed is missing

🤝 God's way is fully trustworthy

➡️ Old English perfect is not modern perfect

## 🔥 The Word Of The LORD Is Tried

Tried means tested and proven true.

Think of a metal tested by fire to check it is not fake.

God's word has already been tested by David's own experience, not just claimed to be true.

🔥 Tried means tested like metal in fire

✅ It means proven true, not just claimed

🧪 David tested it through his own experience

📖 Real testing backs up this trust

## 🛡️ He Is A Buckler To All Them That Trust In Him

A buckler is a small, round shield a soldier could carry easily and move quickly.

Unlike a full body shield, a buckler was made for a fighter who still needed speed.

This is not a promise for David alone.

It is offered to all them that trust in him.

🛡️ Buckler means a small, quick shield

🏃 Made for a fighter who needed speed

🌍 Offered to all who trust, not David alone

📖 The promise widens beyond just David


# SecondSamuel 22:32-35
# 🏔️ Feet Like Hinds' Feet
---
## ❓ Who Is God, Save The LORD? And Who Is A Rock, Save Our God?

This is a rhetorical question, not a real question expecting an answer.

David is stating that no other so called god compares to the LORD.

The rock image returns from the very start of the song, tying the whole piece back together.

❓ A rhetorical question, not a real one

👑 No other god compares to the LORD

🪨 The rock image returns from the song's start

📖 This ties the whole song back together

## 💪 God Is My Strength And Power

Strength and power together emphasize that this is not a small or partial ability.

David is not describing occasional help.

He is describing the source of everything he has been able to do.

💪 Strength and power together mean total ability

🔋 Not occasional help, but the actual source

🙌 Everything David did traces back here

📖 God is the source, not just a helper

## 🛤️ He Maketh My Way Perfect

This repeats the same word from verse thirty one, perfect meaning complete, not flawless.

Way here means David's path or course through life, not a single choice.

God does not just help occasionally, he makes David's whole path whole and complete.

📖 Perfect again means complete, not flawless

🛤️ Way means David's whole path through life

🧩 God completes the path, not just a moment

➡️ The same word links back to verse 31

## 🦌 He Maketh My Feet Like Hinds' Feet

A hind is a female deer, known for climbing steep, rocky terrain without slipping.

Comparing David's feet to a hind's feet pictures sure footed movement in dangerous places.

This connects back to the rock and high tower images from the start of the song.

🦌 A hind is a female deer

🏔️ Known for climbing rocky terrain safely

👣 David's feet are pictured just as sure

📖 It connects back to the rock imagery

## ⛰️ Setteth Me Upon My High Places

High places here means safe, elevated ground.

It is not the pagan worship sites the phrase can mean elsewhere in the Bible.

David is set on ground his enemies cannot easily reach.

The whole verse pictures someone who can move through danger and land somewhere safe.

⛰️ High places here means safe, elevated ground

🚫 Not the pagan worship sites elsewhere

🏃 Enemies cannot easily reach him there

📖 Danger leads to a safe landing

## 🎓 He Teacheth My Hands To War

This credits God with David's actual skill as a warrior, not just his survival.

David does not take credit for his own training or ability here.

Even something as practical as combat skill is traced back to God.

🎓 Credits God with David's warrior skill

🙅 David does not take credit himself

⚔️ Even combat skill traces back to God

📖 Nothing about his success is self made

## 🏹 A Bow Of Steel Is Broken By Mine Arms

A bow of steel, or bronze in some translations, was extremely hard to bend.

Breaking one by hand took far more than ordinary strength.

This is a picture of exceptional strength, not an ordinary soldier's ability.

David again credits this strength to God, not to himself.

🏹 A bow of steel needed unusual strength

💪 Pictures exceptional, not ordinary strength

🙏 Credited to God, not to David

📖 The strength was given, not earned


# SecondSamuel 22:36-40
# 🛡️ Trained For War, Kept From Falling
---
## 🛡️ The Shield Of Thy Salvation

This returns to the shield image from verse three, now naming it specifically as salvation.

The shield is not just generic protection.

It is the very thing that saved his life.

🛡️ Returns to the shield image from verse three

🙌 Named specifically as salvation here

❤️ Not generic protection, but life saving

📖 The shield and the rescue are one

## 🤝 Thy Gentleness Hath Made Me Great

This might sound like an odd pairing, gentleness making someone great in battle.

Gentleness here likely points to God's patient care through David's years of hardship, not just soft feelings.

That patient care, not raw force alone, is what shaped David into who he became.

🤝 Gentleness paired with greatness sounds unusual

⏳ It points to God's patient care over years

🌱 Patient care, not force, shaped David

📖 Greatness grew out of being cared for

## 👣 Thou Hast Enlarged My Steps Under Me

Enlarged steps pictures walking freely, without the constant fear of stumbling.

This contrasts with a narrow, cramped, or dangerous path.

A solid, wide path let David move with confidence.

Even his stride reflects the safety God gave him.

👣 Enlarged steps means walking freely

🚫 Contrasts with a narrow, dangerous path

🏃 No more constant fear of stumbling

📖 Freedom of movement, not just survival

## 🏔️ So That My Feet Did Not Slip

This continues the sure footed image from the hinds' feet earlier in the song.

Slipping on rocky or muddy ground could easily mean death in battle.

A missed step could cost a soldier his life.

God kept David's footing solid the whole way through.

👣 Continues the sure footed image

⚔️ Slipping in battle could easily mean death

🏔️ Echoes the hinds' feet picture

📖 Stability itself was a form of protection

## 🔄 I Have Pursued Mine Enemies, And Destroyed Them

The tone shifts here from being rescued to actively winning.

Pursued means David chased them down rather than simply defending himself.

Destroyed leaves no ambiguity, this is complete victory, not a partial win.

🔄 Tone shifts from rescue to victory

🏃 Pursued means chasing them down

💥 Destroyed means complete victory

📖 No ambiguity about the outcome

## 🚫 Turned Not Again Until I Had Consumed Them

Turned not again means he did not stop or retreat partway through.

He kept pursuing until the fight was completely finished.

Consumed continues the fire imagery from the very start of the song.

The same fire that came from God's mouth now finishes off the enemy.

🚫 He did not stop or retreat partway

🔥 Consumed echoes the fire imagery from the start

🎯 Full commitment until the job was finished

📖 The same fire from verse nine returns here

## 👣 They Are Fallen Under My Feet

Standing over a fallen enemy was a well known ancient picture of total victory.

Kings in the ancient Near East were sometimes shown this way in art.

A foot would rest on a conquered enemy's neck.

David uses that same familiar image here.

👣 Standing over a fallen enemy pictured victory

🎨 Ancient kings were shown this way in art

👑 David uses that same familiar image

📖 A vivid, well known symbol of total win

## 🎽 Thou Hast Girded Me With Strength To Battle

Girded means tying a belt or sash tight around the waist to prepare for hard, physical work or a fight.

Loose robes had to be gathered and tied up before a person could run or fight effectively.

The image is one of active preparation, not passive strength sitting unused.

🎽 Girded means tying up for hard work

👘 Loose robes had to be tied up first

🏃 Pictures active preparation, not passive strength

📖 God actively readied David for battle

## ✋ Them That Rose Up Against Me Hast Thou Subdued Under Me

Subdued means forced into submission, no longer able to fight back.

Every enemy who rose against David is named here at once.

This closes out the battle section of the song.

The victory described is total and settled.

✋ Subdued means forced into submission

🔚 Closes out the whole battle section

🏆 Total, settled victory is the result

📖 The fight is fully over


# SecondSamuel 22:41-46
# ⚔️ Beaten Small As Dust
---
## 👣 Thou Hast Also Given Me The Necks Of Mine Enemies

This continues the image from verse thirty nine, standing over a defeated enemy.

Necks specifically pictures total, humiliating defeat.

It is not just losing a fight, it is complete surrender.

God gave David this level of victory himself.

👣 Continues the defeated enemy image

😔 Necks pictures total, humiliating defeat

⚔️ More than just losing, complete surrender

📖 God gave David this level of victory

## 🎯 That I Might Destroy Them That Hate Me

The purpose of the victory is stated plainly here, not left implied.

David names exactly why God gave him this power.

Hate, not just opposition, describes how these enemies actually felt toward David.

The song does not hide the real emotion involved.

🎯 The purpose is stated plainly

😠 Hate describes real hostility, not mild opposition

⚔️ This was personal, not abstract conflict

📖 The song names the real emotion involved

## 🙏 They Looked, But There Was None To Save

David's enemies had their own gods and allies they hoped would rescue them.

They looked around in every direction for help.

None to save means every source they turned to failed them completely.

Their rescue never came.

🙏 Enemies had their own gods and allies

❌ None of them could save them

😱 Every hope they had failed

📖 Their rescue never came

## 🤫 Even Unto The LORD, But He Answered Them Not

Some of David's enemies may have cried out to the LORD himself, expecting help.

They hoped for the same kind of rescue David received.

God's silence toward them contrasts sharply with his quick answer to David.

That answer came all the way back in verse seven.

🙏 Some enemies may have cried to God

🤫 God's silence contrasts with his answer to David

⚖️ The difference shows whose side God was on

📖 Not every cry receives the same answer

## 💨 I Did Beat Them As Small As The Dust Of The Earth

This pictures crushing something into the smallest possible pieces.

Nothing recognizable was left of the enemy's strength.

Dust of the earth is a common ancient image for something insignificant.

A light wind could scatter it without effort.

💨 Pictures crushing into tiny pieces

🌍 Dust of the earth means insignificant

🌬️ Easily scattered by the wind

📖 Total defeat, nothing left standing

## 🟤 I Did Stamp Them As The Mire Of The Street

Mire means thick mud, the kind that collected in unpaved ancient streets.

Ancient roads were not paved, so mud gathered easily after rain.

Stamping something into mud pictures pressing an already fallen thing further down.

The image adds humiliation on top of defeat.

🟤 Mire means thick street mud

👣 Stamping pictures pressing it further down

📉 The image adds humiliation to defeat

📖 Nothing left to recover

## 🔄 Thou Hast Delivered Me From The Strivings Of My People

This shifts from foreign enemies to conflict within Israel itself.

Strivings means internal fighting and rebellion, not war with outsiders.

It likely includes Absalom's rebellion and Sheba's revolt from earlier chapters.

Not every threat David survived came from outside Israel.

🔄 Shifts from foreign enemies to internal conflict

👨‍👦 Likely includes Absalom's rebellion

🚩 Also includes Sheba's revolt

📖 Not every threat came from outside Israel

## 👑 Kept Me To Be Head Of The Heathen

Heathen here means the surrounding nations who did not worship the LORD.

Head means the ruler or leader over them.

This is not just someone who defeated them once.

David's influence extended past Israel's own borders.

🌍 Heathen means nations without the LORD

👑 Head means ongoing rule, not one battle

🏛️ His influence extended past Israel's own borders

📖 Foreign nations came under his leadership

## 🌍 A People Which I Knew Not Shall Serve Me

This points to nations David never had direct contact with before submitting to him.

Even strangers he had never met came under his rule.

His growing kingdom reached further than his own personal history.

God expanded David's reach beyond anything David built himself.

🌍 Points to nations he never directly met

📈 His influence outgrew his own experience

👑 Even strangers came under his rule

📖 God expanded David's reach beyond himself

## 🏚️ Strangers Shall Fade Away, And They Shall Be Afraid Out Of Their Close Places

Close places likely means hiding places or fortified strongholds enemies retreated to.

Fade away pictures their strength and resistance slowly draining out completely.

Even in their own hiding places, fear followed them.

🏚️ Close places likely means hiding places

📉 Fade away pictures strength draining out

😨 Fear followed them even in hiding

📖 There was no safe place left for them


# SecondSamuel 22:47-51
# 👑 Mercy To David's Seed For Evermore
---
## 🙌 The LORD Liveth

This is a common Old Testament phrase.

It declares that God is alive and active, not silent or distant.

It functions almost like an oath.

It is the kind of phrase used to swear something is certainly true.

🙌 Declares God is alive and active

🤝 Functions almost like an oath

✅ Used to swear something is certainly true

📖 God is not silent or distant

## 🪨 Blessed Be My Rock

The rock image returns one final time here.

It closes the loop from the very first verse of the song.

Blessed here means praised, not the modern sense of receiving something good.

The song deliberately circles back to where it began.

🪨 The rock image closes the loop

🙏 Blessed here means praised

🔁 The song returns to where it began

📖 A deliberate bookend to the whole piece

## ⬆️ Exalted Be The God Of The Rock Of My Salvation

Exalted means lifted high in honor and praise.

David stacks multiple titles together one final time, rock, God, and salvation.

He is layering his praise before the song ends.

⬆️ Exalted means lifted high in honor

📚 Multiple titles are stacked together here

🙌 A final layering of praise

📖 The song builds to its loudest point

## ⚖️ It Is God That Avengeth Me

Avenge means to bring justice for a wrong done to someone.

David is not claiming credit for his own justice.

He attributes it entirely to God.

⚖️ Avenge means bringing justice for a wrong

🙅 David does not take credit himself

🙏 He attributes justice entirely to God

📖 The victory was never really his own

## 🔁 That Bringeth Down The People Under Me

This restates David's victories one more time before the song closes.

The repetition throughout this song is intentional, not careless.

Each restating drives the same point deeper.

🔁 Restates his victories one more time

🎯 The repetition throughout is intentional

📢 It drives the same point deeper

📖 Nothing here is careless repetition

## 👤 Thou Hast Delivered Me From The Violent Man

This may point to a specific enemy, or to violent men in general throughout David's life.

Either way, it closes the danger side of the song.

It echoes thou savest me from violence back in verse four.

The threat that opened the song is fully resolved here.

👤 May point to one enemy or many

🔁 Echoes verse four's violence language

🔚 Closes the danger side of the whole song

📖 The song's opening threat is now closed

## 🗣️ I Will Give Thanks Unto Thee, O LORD, Among The Heathen

David commits to praising God publicly, not privately.

Among the heathen means in front of the very nations who did not worship the LORD.

His testimony was not kept quiet or private.

He wanted the surrounding nations to hear it too.

🗣️ David commits to public praise

🌍 Among the heathen means before other nations

📢 Not a private, quiet thanks

📖 His testimony reaches beyond Israel

## 🗼 He Is The Tower Of Salvation For His King

This returns to the high tower image from verse three.

It ties the whole song together one last time.

Tower of salvation means the same safety that protected David personally.

That safety now belongs to his whole royal line.

🗼 Returns to the tower image from verse three

👑 Now describes protection for his royal line

🔁 A final tie back to the song's start

📖 The same safety extends beyond David himself

## 🫒 Sheweth Mercy To His Anointed

Anointed means someone set apart for a special role, often by having oil poured on their head.

Kings and priests in Israel were anointed this way, marking them as chosen by God for that position.

David was literally anointed by Samuel years before he ever became king.

🫒 Anointed means chosen, marked with oil

👑 Kings and priests were anointed this way

📜 Samuel anointed David years before he was king

📖 This mercy follows that original anointing

## 🌱 Unto David, And To His Seed For Evermore

Seed here means his descendants, his family line going forward.

This points ahead to God's covenant promise that David's throne would last forever.

That promise ultimately points to Jesus, described in the New Testament as a descendant of David whose kingdom never ends.

🌱 Seed means his descendants going forward

👑 Points to God's promise of an eternal throne

✝️ That promise ultimately points to Jesus

📖 The song ends looking beyond David's life`.trim();

export const SECOND_SAMUEL_TWENTY_TWO_PERSONAL_SECTIONS = parseSecondSamuelTwentyTwoRawNotes(
  SECOND_SAMUEL_TWENTY_TWO_RAW_NOTES,
);
