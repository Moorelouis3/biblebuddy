export type PsalmsEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEighteenRawNotes(rawText: string): PsalmsEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 18:${startVerse}` : `Psalms 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 Psalms 18 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTEEN_RAW_NOTES = `# Psalms 18:1-3
# 🏰 A Song Of Many Names For God
---
## ❤️ I Will Love Thee, O LORD, My Strength

The Hebrew word behind love here is rare, used only this one time for a person's love toward God.

Most other places in the Old Testament use a different, more everyday word for love.

This special word pictures deep tender affection, the kind felt for a close family member.

David is not offering polite respect from a distance.

He is expressing raw affection for the one who rescued him.

❤️ A rare Hebrew word for deep love
👪 Pictures affection like close family
🙅 Not polite distance or duty
📖 David feels genuine affection for God

## 🪨 The LORD Is My Rock, And My Fortress, And My Deliverer

A rock in this culture meant a high place safe from attackers below.

A fortress added walls and structure built for defense.

A deliverer is someone who physically rescues a person from danger.

David stacks three different pictures instead of choosing just one.

Each word describes a different way God kept him safe.

🪨 Rock means a high safe place
🏯 Fortress means walls built for defense
🛟 Deliverer means someone who rescues
📖 Three pictures for one kind of safety

## 💪 My God, My Strength, In Whom I Will Trust

Strength here does not describe David's own muscles.

It describes power that belongs to God and gets loaned to David.

Trust means leaning full weight onto something, not just believing it exists.

David is not simply agreeing God is strong.

He is depending on that strength to hold him up.

💪 Strength belongs to God, not David
⚖️ Trust means leaning full weight on someone
🙅 Not just believing God exists
📖 David depends on God to hold him up

## 🛡️ My Buckler, And The Horn Of My Salvation

A buckler was a small round shield strapped to the arm.

It blocked close range blows during hand to hand fighting.

A horn pictured an animal's weapon, the source of its power to fight back.

Calling God a horn of salvation means God is David's actual power to survive.

Both pictures come from the battlefield, not the throne room.

🛡️ Buckler means a small handheld shield
🐂 Horn pictures an animal's fighting power
⚔️ Both images come from the battlefield
📖 God is David's power to survive

## 🗼 And My High Tower

A high tower stood above the reach of enemies on the ground.

Someone inside it could see danger coming from a distance.

David pictures God as a place raised completely out of reach.

This finishes a list of seven different pictures in one verse.

Each name describes a different kind of safety David has found in God.

🗼 A high tower stood above danger
👀 It let someone see trouble coming
🙌 God is pictured as out of reach
📖 Seven names describe one safe God

## 📣 I Will Call Upon The LORD, Who Is Worthy To Be Praised

Worthy to be praised means God deserves honor regardless of the outcome still to come.

David is not praising God because the rescue has already happened.

He praises God as part of asking for help, not only after receiving it.

This kind of praise comes from settled trust, not from results already seen.

Confidence like this only makes sense for someone who already knows this God.

🏆 Worthy means deserving praise either way
⏳ Praise comes before the answer here
🙏 Trust shown before results are seen
📖 Confidence built on already knowing God

## 🔗 So Shall I Be Saved From Mine Enemies

Calling on God and being saved are tied together as one single act here.

David does not describe a vague hope or wishful thinking.

He states a confident expectation grounded in past experience with God.

The rest of the psalm goes on to explain exactly what that salvation looked like.

Confidence like this is earned only through a real history with God.

🔗 Calling and being saved are tied together
✅ This is confidence, not vague hope
📚 Grounded in real past experience
📖 The rest of the psalm explains the details

# Psalms 18:4-6
# 🌊 Sorrows Like Floods
---
## ⭕ The Sorrows Of Death Compassed Me

Compassed means surrounded on every side, leaving no gap to escape through.

Sorrows of death pictures the crushing weight that comes right before dying.

David is not describing ordinary sadness here.

He is describing a moment when death itself felt certain.

The danger was not distant, it was closing in from all directions.

⭕ Compassed means surrounded with no gap
💀 Sorrows of death means near dying
🙅 Not ordinary sadness
📖 Death felt certain and close

## 🌊 The Floods Of Ungodly Men Made Me Afraid

A flood pictures sudden overwhelming force a person cannot stand against.

Ungodly men here means people acting without any regard for God.

David compares their attack to rushing water that sweeps everything away.

He admits real fear instead of pretending to feel brave.

Honest fear does not cancel out real trust in God.

🌊 Flood pictures sudden overwhelming force
😨 Ungodly means acting without regard for God
💧 Their attack felt like rushing water
📖 Honest fear does not cancel trust

## ⚰️ The Sorrows Of Hell Compassed Me About

Hell here translates sheol, the Hebrew word for the grave or the place of the dead.

It does not carry the exact same meaning as the modern word hell.

David pictures the grave itself closing in around him like a trap.

This repeats the surrounding image from verse four with even heavier language.

The danger keeps intensifying as the psalm builds.

⚰️ Sheol means the grave or place of death
🔁 Repeats the surrounding image from before
📈 The danger keeps intensifying
📖 Even the grave felt close

## 🪤 The Snares Of Death Prevented Me

A snare was a hidden trap used to catch animals by surprise.

Prevented here is an old word meaning to come before or confront first.

David felt death's traps were already set before he even noticed them.

He was not walking into danger with warning.

The danger arrived first, without notice.

🪤 A snare was a hidden trap
⏱️ Prevented means arriving first, confronting
😳 Danger came before any warning
📖 He had no notice it was coming

## 😖 In My Distress I Called Upon The LORD

Distress here means the tightest kind of pressure, like being squeezed from every side.

David does not wait until the danger passes to pray.

He calls out in the middle of the crushing moment itself.

This is the same phrase from verse three, now shown happening in real time.

Prayer under pressure is not a last resort for David, it is instinct.

😖 Distress means being squeezed from all sides
🗣️ David prays in the middle of danger
🔁 Same phrase from verse three, now lived out
📖 Prayer under pressure was David's instinct

## 🏛️ He Heard My Voice Out Of His Temple

The temple here pictures God's own dwelling place, not a building David could see.

David's cry traveled all the way from an earthly battlefield into heaven itself.

This shows real distance being crossed by a single prayer.

God was not too far away or too busy to notice.

His cry came before him, even into his ears shows how personally God listened.

🏛️ Temple pictures God's own dwelling place
📡 The cry traveled from earth to heaven
👂 God was not too far to notice
📖 God listened to him personally

# Psalms 18:7-9
# 🌋 The Earth Shook
---
## 🌍 Then The Earth Shook And Trembled

God's response to danger in this psalm was never going to be quiet.

The picture becomes an earthquake, ground moving under a person's own feet.

This kind of shaking elsewhere in scripture often marks God arriving in power.

The earth itself reacts physically to God's presence.

Nothing about this response stays subtle or hidden.

🌍 God's response was never going to be quiet
📣 Pictures an earthquake under someone's feet
🔊 Elsewhere in scripture this marks God arriving
📖 The earth reacts to God's presence

## 🏔️ The Foundations Also Of The Hills Moved

Foundations means the deepest, most fixed part of something, the part nothing normally shifts.

Even the base of the hills gets shaken here, not just the surface.

David pictures the most permanent things in creation moving because God is angry.

That kind of shaking shows overwhelming power, not a minor tremor.

Nothing in creation is too solid to respond to God.

🏔️ Foundations mean the deepest fixed part
📐 Even hills shift, not just the surface
💥 This shows overwhelming power
📖 Nothing in creation is too solid for God

## 😠 Because He Was Wroth

Wroth is the old word for intense anger.

This anger is not petty or out of control.

It is God's response to the danger threatening David.

The earthquake pictures how seriously God took the attack against him.

God's anger here worked in David's favor, not against him.

😠 Wroth means intense anger
⚖️ Not petty, a serious response
🛡️ Anger aimed at David's enemies
📖 God's anger worked for David here

## 💨 There Went Up A Smoke Out Of His Nostrils

This is a picture, not a claim that God has a physical body like a person.

Smoke rising from the nostrils pictures fierce anger, the way an animal snorts before charging.

Ancient readers understood this as a vivid image of fury, not literal biology.

The picture makes God's anger feel immediate and physical to the listener.

Poetry uses the body to make an invisible feeling visible.

💨 Smoke pictures fierce anger, not biology
🐂 Like an animal snorting before a charge
🎨 Poetry makes anger feel physical
📖 The image makes fury vivid, not literal

## 🍽️ And Fire Out Of His Mouth Devoured

Devoured means completely consumed, leaving nothing behind at all.

Fire from the mouth continues the same picture of overwhelming anger from the line before.

David pictures God's anger as a force that destroys everything it touches.

This kind of imagery shows up elsewhere in scripture describing God's judgment.

The reader is meant to feel intensity, not calculate literal flames.

🍽️ Devoured means completely consumed
🔥 Continues the picture of overwhelming anger
⚡ Judgment imagery used elsewhere in scripture
📖 The reader feels intensity, not literal flame

## ☁️ He Bowed The Heavens Also, And Came Down

Bowed means bent low, like something being pulled down on purpose.

David pictures the sky itself bending so God could step through it.

This is not God staying distant while sending help.

God personally comes down into the situation.

Darkness under his feet pictures storm clouds carrying him toward earth.

☁️ Bowed means the sky bent low
👣 God personally comes down
🙅 Not staying distant while sending help
📖 Storm clouds carry him toward earth

# Psalms 18:10-12
# ☁️ Riding On The Wind
---
## 👼 He Rode Upon A Cherub, And Did Fly

A cherub is a powerful heavenly being, not the soft infant figure seen in later art.

In the Bible, cherubim guard sacred places and carry out God's will with great strength.

David pictures God riding one like a chariot, moving with speed and total control.

This is a picture of swift, decisive action.

God is not slow to respond to David's cry.

👼 Cherub means a powerful heavenly being
🛡️ Cherubim guard and serve with strength
🐎 Pictured like a chariot in motion
📖 God was swift, not slow, to respond

## 💨 Upon The Wings Of The Wind

Wings of the wind pictures speed too fast to see coming, only felt after it arrives.

Wind cannot be seen, only felt, moving faster than anything visible to the eye.

David compares God's arrival to something invisible and completely unstoppable.

No obstacle could slow down this kind of movement.

The picture adds real urgency to how quickly God answered.

💨 Wings of wind pictures unseen speed
👻 Wind is invisible but unstoppable
🚫 Nothing could slow this movement
📖 The picture adds urgency to God's answer

## 🌑 He Made Darkness His Secret Place

A secret place means somewhere hidden from view, not open to plain sight.

David pictures God surrounded by darkness like a curtain that hides him.

This does not mean God is far away or absent.

It means his full presence and power stay beyond human sight.

Mystery is part of how overwhelming this moment is.

🌑 Secret place means hidden from view
🚪 Darkness works like a curtain
🙅 Not far away, just beyond sight
📖 Mystery adds to the moment's weight

## ⛺ His Pavilion Round About Him

A pavilion was a large tent, often used by kings and commanders.

David pictures storm clouds as the tent walls surrounding God.

This borrows royal imagery to picture God's arrival like a king going to battle.

The storm becomes God's traveling shelter.

Even nature serves as furniture for God's presence.

⛺ Pavilion means a large royal tent
👑 Borrows imagery of a king in battle
🌩️ Storm clouds become the tent walls
📖 Nature serves as furniture for God

## ⚡ At The Brightness That Was Before Him

Brightness here pictures lightning breaking through the storm clouds.

Even inside the darkness, light still breaks out ahead of God.

This shows power breaking through mystery rather than staying hidden completely.

The storm is not only dark, it is also blinding.

Both darkness and light describe the same overwhelming arrival.

⚡ Brightness pictures lightning breaking through
🌗 Both darkness and light are present
💥 Power breaks through the mystery
📖 One arrival, described two ways

## 🧊 Hail Stones And Coals Of Fire

Hail stones and fire together picture a violent storm unlike any normal weather.

Ancient readers would picture this as a divine weapon, not a random storm.

Both hot and cold extremes appear together in one image.

The storm itself becomes an instrument of God's judgment.

Even the weather obeys God's purpose here.

🧊 Hail and fire picture a violent storm
⚔️ The storm works like a weapon
🌡️ Hot and cold extremes appear together
📖 Even the weather obeys God's purpose

# Psalms 18:13-15
# ⚡ The LORD Thundered
---
## 🌩️ The LORD Also Thundered In The Heavens

Thunder in the ancient world was often connected to the voice of a god speaking.

David makes clear this thunder belongs to the one true LORD, not a pagan storm god.

The heavens themselves carry his voice down to earth.

This claim would have stood out sharply in a culture surrounded by storm gods.

David gives credit to the only God who actually controls the sky.

🌩️ Thunder was linked to a god's voice
☝️ David credits the one true LORD
🏛️ Stood out in a culture of storm gods
📖 Only the true God controls the sky

## 🏹 He Sent Out His Arrows, And Scattered Them

Arrows here picture lightning bolts shot down like weapons.

Scattered means the enemy's ranks broke apart and could not stay organized.

David pictures God fighting directly on his behalf, using the storm as a weapon.

This is active combat language, not passive protection.

God did not just shield David, he attacked the threat.

🏹 Arrows picture lightning as weapons
💥 Scattered means the enemy broke apart
⚔️ This is active combat, not passive shielding
📖 God attacked the threat directly

## 😵 He Shot Out Lightnings, And Discomfited Them

Discomfited means thrown into confusion and panic, unable to fight back in order.

Lightning here repeats the same weapon picture from the line before.

David describes an enemy that could not regroup once the attack began.

Confusion spreading through an army was often more deadly than direct combat.

God's storm did the work of an entire army.

😵 Discomfited means thrown into panic
⚡ Lightning repeats the weapon picture
🌀 The enemy could not regroup
📖 God's storm did the work of an army

## 🌊 Then The Channels Of Waters Were Seen

Channels of waters pictures the ocean floor being exposed, something no one normally sees.

This kind of imagery elsewhere in scripture recalls the Red Sea splitting apart for Israel.

David borrows a picture of God controlling water itself, down to its hidden depths.

Nothing stays hidden when God moves this powerfully.

Even the sea floor answers to him.

🌊 Ocean floor exposed, normally hidden
🏞️ Echoes imagery like the Red Sea
🕳️ Nothing stays hidden from this power
📖 Even the sea floor answers to God

## 🌍 The Foundations Of The World Were Discovered

Discovered here is an old word meaning uncovered or laid bare.

David pictures the deepest structures holding up the earth being exposed to view.

This matches the exposed ocean floor from the line just before it.

Both pictures show creation reacting to God's rebuke.

Nothing stays hidden or fixed when God acts this powerfully.

🌍 Discovered means uncovered or laid bare
🏗️ The earth's deep structure gets exposed
🔁 Matches the exposed ocean floor before it
📖 Nothing stays fixed under this kind of power

## 💨 At The Blast Of The Breath Of Thy Nostrils

Blast of the breath pictures a forceful, violent wind, not gentle breathing.

This same picture of smoke and fury first appeared back in verse eight.

David closes this section the same way he began building the storm.

The whole scene has been one continuous display of controlled power.

Every detail points back to the same source, God's own anger on David's behalf.

💨 Blast of breath pictures a violent wind
🔁 The same picture first appeared in verse eight
🌀 Closes the storm scene where it began
📖 Every detail traces to God's anger for David

# Psalms 18:16-19
# 🙌 Drawn Out Of Many Waters
---
## 🙌 He Sent From Above, He Took Me

Rescue in this psalm now becomes personal instead of cosmic.

Above pictures heaven itself reaching down to one individual person.

Sent and took describe a direct, personal rescue, not a distant miracle.

David is not describing God's power in general terms anymore.

He is describing exactly what God did for him specifically.

🙌 Rescue becomes personal, not cosmic
☁️ Above pictures heaven reaching down
🎯 Describes a direct personal rescue
📖 God acted specifically for David

## 🌊 He Drew Me Out Of Many Waters

Many waters is a common Old Testament picture for chaos and overwhelming danger.

Drawing someone out pictures lifting a drowning person to safety.

This same image appears when Moses was drawn out of the Nile as a baby.

David borrows a rescue picture his readers would already recognize.

Being drawn out means someone else did the saving, not David himself.

🌊 Many waters pictures chaos and danger
🙆 Drawing out pictures lifting someone from drowning
👶 Echoes Moses being drawn from the Nile
📖 Someone else did the saving, not David

## 💪 He Delivered Me From My Strong Enemy

Strong enemy names one specific, powerful threat rather than a vague danger.

David does not minimize how serious this enemy actually was.

He admits the enemy had real strength before describing the rescue.

Naming the danger honestly makes the rescue mean more.

A minor threat would not need this kind of dramatic language.

💪 Strong enemy names a real serious threat
🗣️ David admits the danger honestly
📈 Naming it makes the rescue mean more
📖 A small threat would not need this language

## 🙅 For They Were Too Strong For Me

David openly admits he could not have survived this on his own.

This is not false modesty, it is an honest assessment of the danger.

Admitting weakness here sets up why the rescue mattered so much.

A person who never admits danger cannot fully thank God for saving them.

David's honesty makes his gratitude in this psalm believable.

🙅 David admits he could not survive alone
✅ This is honesty, not false modesty
🔗 Weakness explains why the rescue mattered
📖 Honesty makes his gratitude believable

## ⏱️ They Prevented Me In The Day Of My Calamity

Prevented again means came before, arrived first, the same sense used back in verse five.

Calamity means a day of disaster or ruin.

David's enemies struck at the worst possible moment, when he was already in trouble.

Attackers often choose the moment someone looks weakest.

David faced trouble stacked on top of trouble.

⏱️ Prevented means arrived first, came before
💥 Calamity means a day of disaster
🎯 Enemies struck at his weakest moment
📖 Trouble was stacked on top of trouble

## 🪵 But The LORD Was My Stay

Stay here means a support, something that holds a person up from falling.

Even while trouble piled up, David had one thing that did not move.

This single line answers the entire buildup of danger in one short phrase.

God did not remove every hardship instantly.

He held David steady through it instead.

🪵 Stay means a support that holds someone up
🧱 One steady thing amid stacked trouble
⏳ God did not remove hardship instantly
📖 God held David steady through it

## 🏞️ He Brought Me Forth Also Into A Large Place

A large place pictures open ground, room to move freely without threat closing in.

This contrasts sharply with the cramped, trapped feeling described earlier in the psalm.

David moves from being surrounded to finally having space to breathe.

Rescue here means more than survival, it means freedom to live normally again.

Wide open space becomes a picture of relief.

🏞️ Large place means open room to move
🔗 Contrasts with the earlier trapped feeling
🌬️ Rescue means room to breathe again
📖 Wide space pictures real relief

## 😊 Because He Delighted In Me

Delighted means God took real pleasure in David, not grudging obligation.

This is the reason David gives for the entire rescue.

God did not save David out of duty alone.

He acted out of genuine affection for him.

The whole rescue story rests on this one motive.

😊 Delighted means real pleasure, not duty
❤️ This is the reason for the rescue
🙅 Not obligation, but genuine affection
📖 The whole rescue rests on this motive

# Psalms 18:20-24
# ⚖️ Rewarded According To Righteousness
---
## ⚖️ The LORD Rewarded Me According To My Righteousness

Righteousness here means David's conduct in the specific conflict he just described.

This is not a claim of sinless perfection over his entire life.

David is talking about how he handled this particular situation with integrity.

The reward matches the character he showed during the danger.

Context matters for understanding this bold sounding claim.

⚖️ Righteousness means conduct in this conflict
🙅 Not a claim of total sinless perfection
🎯 About this specific situation, not his whole life
📖 Context explains this bold claim

## 🤲 According To The Cleanness Of My Hands

Clean hands is a common Old Testament picture for innocent, honest action.

It has nothing to do with literal handwashing.

David claims he did not gain his position through violence, lies, or betrayal.

Hands picture what a person actually does, not just what they believe.

David's actions matched the trust he was asking God to honor.

🤲 Clean hands pictures honest action
🚫 Not literal handwashing
✋ Hands picture what someone actually does
📖 His actions matched his trust in God

## 🛤️ For I Have Kept The Ways Of The LORD

Ways of the LORD means the path of obedience laid out in God's law.

Keeping a way means walking it consistently, not visiting it occasionally.

David claims a steady pattern of obedience, not a single good decision.

This becomes the evidence behind his earlier claim of righteousness.

A pattern over time carries more weight than one moment of good behavior.

🛤️ Ways of the LORD means the obedient path
🔁 Keeping means walking it consistently
📊 A steady pattern, not one good moment
📖 Pattern over time is the real evidence

## 🚶 And Have Not Wickedly Departed From My God

Departed pictures deliberately walking away from a relationship, not simply drifting.

Wickedly adds intent, David is naming a choice, not an accident.

He is not claiming he never struggled or made mistakes.

He is claiming he never chose to abandon God on purpose.

That distinction matters throughout the rest of this section.

🚶 Departed pictures a deliberate walking away
🎯 Wickedly adds the idea of intent
🙅 Not a claim of never struggling
📖 He never chose to abandon God

## 📜 For All His Judgments Were Before Me

Judgments here means God's specific rulings and commands, not final courtroom verdicts.

Before me pictures keeping something in constant view, like a map open on a table.

David describes actively consulting God's commands rather than ignoring them.

This is a picture of ongoing attention, not a rule memorized once and forgotten.

Obedience required David to keep looking, not just to have once learned.

📜 Judgments means God's specific commands
🗺️ Before me pictures constant attention
👀 Active consulting, not one time memorizing
📖 Obedience meant continually looking, not just knowing

## 🌀 I Kept Myself From Mine Iniquity

Iniquity is an old word for sin, specifically twisted or bent behavior.

Kept myself shows this required active effort, not passive luck.

David is describing ongoing self control, a discipline practiced repeatedly.

This line adds personal responsibility to the pattern of obedience already described.

Staying right with God takes continued effort, not one time decisions.

🌀 Iniquity means sin, twisted behavior
🛡️ Kept himself shows active effort
💪 This describes practiced self control
📖 Staying right takes continued effort

## 💰 Therefore Hath The LORD Recompensed Me

Recompensed means repaid or rewarded in direct response to something already done.

Therefore ties this reward directly back to everything just described.

David is not claiming he earned salvation through good behavior.

He is describing how God responded to faithful conduct in this specific conflict.

The reward followed the pattern of obedience, it did not replace grace.

💰 Recompensed means repaid in response
🔗 Therefore ties the reward to what came before
🙅 Not salvation earned through good behavior
📖 Reward followed conduct, it did not replace grace

# Psalms 18:25-27
# 🪞 God Mirrors What He Is Given
---
## 🔤 With The Merciful Thou Wilt Shew Thyself Merciful

Shew is the old spelling of show.

David describes how God responds differently depending on a person's own character.

Toward someone who shows mercy to others, God responds with mercy in return.

This is not God changing who he is.

It describes how his character gets experienced differently by different people.

🔤 Shew is the old spelling of show
🪞 God's response reflects a person's own character
🙅 Not God changing who he actually is
📖 His character is experienced differently by each person

## 📏 With An Upright Man Thou Wilt Shew Thyself Upright

Upright describes someone who deals honestly, without hidden crookedness.

David repeats the same pattern from the line before with a new quality.

Honest people find God meeting their honesty with his own faithfulness.

This is not a formula for earning God's approval through good behavior.

It describes how a life shaped one way tends to experience God a certain way.

📏 Upright means dealing honestly, no crookedness
🔁 Repeats the mirroring pattern from before
🤝 Honesty meets God's own faithfulness
📖 A life shapes how God is experienced

## 💎 With The Pure Thou Wilt Shew Thyself Pure

Pure describes someone whose motives are not mixed with hidden agendas.

This continues the same list of qualities being mirrored back.

A person without hidden motives experiences God as clear and trustworthy.

Impure motives, by contrast, tend to distort how a person sees God at all.

Clarity in a person's heart shapes clarity in how they see God.

💎 Pure means motives without hidden agendas
🔁 Continues the same mirroring list
🔍 Clear motives bring a clearer view of God
📖 Heart clarity shapes how God is seen

## 😤 With The Froward Thou Wilt Shew Thyself Froward

Froward is an old word for stubborn, twisted, and difficult to deal with.

This line completes the pattern with its harshest example.

Toward someone determined to resist and twist things, God can respond with matching resistance.

This does not describe God acting unfairly or arbitrarily.

It describes a person meeting the natural consequence of their own chosen path.

😤 Froward means stubborn and twisted
🔁 Completes the pattern with its harshest case
⚖️ Not unfair, a natural consequence
📖 A chosen path meets its own outcome

## 😔 For Thou Wilt Save The Afflicted People

Afflicted describes people who are humbled, often through hardship or lowly circumstances.

David shifts here from describing mirrored qualities to describing outright rescue.

God is described as actively saving people in this position, not merely tolerating them.

This favors those in a humble position rather than the powerful.

Humility here becomes a place of rescue, not weakness to be ashamed of.

😔 Afflicted means humbled through hardship
🛟 God actively saves this group
👑 Favors the humble over the powerful
📖 Humility here leads to rescue

## 👀 But Wilt Bring Down High Looks

High looks pictures someone with a lifted, arrogant expression on their face.

The face here reveals an inward attitude of pride and self importance.

God is described as opposing that posture directly.

This contrasts sharply with saving the afflicted in the line right before it.

Pride and humility receive very different responses from God in this verse.

👀 High looks pictures an arrogant expression
😏 The face reveals inward pride
🛑 God opposes that posture directly
📖 Pride and humility get opposite responses

# Psalms 18:28-30
# 🕯️ Lighting The Candle
---
## 🕯️ For Thou Wilt Light My Candle

A candle here means a small lamp, the only light source in an ancient home.

Lighting it pictures restoring hope or direction after a time of darkness.

David is not describing literal household lighting.

He is describing renewed clarity and life after despair.

Without this light, a person could not see their next step at all.

🕯️ Candle means a small ancient lamp
💡 Lighting pictures renewed hope
🌑 Contrasts with an earlier season of darkness
📖 Without it, no one sees the next step

## 💡 The LORD My God Will Enlighten My Darkness

Enlighten means to bring light into a place that had none.

Darkness here pictures confusion, danger, or hopelessness David faced earlier in the psalm.

This directly answers a problem the reader has already seen described.

God does not just rescue David from danger, he restores his ability to see clearly.

Both physical safety and inward clarity come from the same source.

💡 Enlighten means bringing in light
🌑 Darkness pictures confusion or hopelessness
🔗 Answers a problem shown earlier in the psalm
📖 Safety and clarity come from the same source

## ⚔️ For By Thee I Have Run Through A Troop

A troop meant an armed band or group of soldiers blocking the way.

Running through one pictures breaking past a barrier that should have stopped David completely.

By thee credits the strength for this to God, not David's own ability.

This is a specific memory, not a general boast.

David remembers an actual moment when the impossible became possible.

⚔️ Troop means an armed group blocking the way
🏃 Running through pictures breaking past a barrier
🙏 By thee credits God, not David's own skill
📖 A real memory, not a general boast

## 🧱 And By My God Have I Leaped Over A Wall

A wall pictures a fixed, solid barrier meant to keep people out completely.

Leaping over one pictures doing something physically impossible without outside help.

David repeats the same pattern as the line before with an even harder obstacle.

Walls do not normally get leaped, they get climbed slowly or not at all.

This describes strength beyond David's own natural limits.

🧱 Wall pictures a fixed solid barrier
🦘 Leaping over pictures the physically impossible
🔁 Repeats the pattern with a harder obstacle
📖 This is strength beyond David's own limits

## ✅ As For God, His Way Is Perfect

Perfect here means complete and without flaw, missing nothing it needs.

David shifts from personal testimony to a statement about God's character in general.

This is not a claim that everything happens exactly the way a person would prefer.

It is a claim that God's way lacks nothing necessary.

That confidence grows directly out of everything David just described.

✅ Perfect means complete, without flaw
🔀 Shifts from testimony to a general claim
🙅 Not a claim everything feels preferable
📖 Confidence built from real experience

## 🔥 The Word Of The LORD Is Tried

Tried repeats the refining picture used earlier in this book of Psalms, the way fire tests metal.

God's word here means his spoken promises and instructions.

Being tried means those promises have already proven reliable under pressure.

David is not asking readers to take this claim on blind faith.

He is pointing to something already tested and found trustworthy.

🔥 Tried repeats the earlier refining picture
📜 Word means God's promises and instructions
✅ Already proven reliable under pressure
📖 Not blind faith, tested trust

# Psalms 18:31-33
# 🦶 Feet Like Hinds' Feet
---
## 🔤 For Who Is God Save The LORD

Save here is an old word meaning except or besides, not the word for rescue.

This is a rhetorical question with an obvious answer built in.

David is not genuinely wondering if other gods might qualify.

He is stating there is no real competition for this title.

The surrounding nations worshiped many gods, making this claim a bold contrast.

🔤 Save here means except, not rescue
❓ A rhetorical question with an obvious answer
🚫 No real competition for this title
📖 A bold contrast to the surrounding nations

## 🧵 It Is God That Girdeth Me With Strength

Girdeth means to wrap or fasten tightly, the way a soldier fastened a belt before battle.

A loose robe had to be gathered and tied before a person could move quickly or fight.

David pictures God preparing him physically for what lies ahead.

Strength here is something given, not something David generated on his own.

Being girded pictures readiness, not just raw power sitting unused.

🧵 Girdeth means fastening tightly, like a belt
🏃 A soldier girded up before moving fast
🎁 Strength is given, not self generated
📖 Girded pictures readiness, not unused power

## 🛤️ And Maketh My Way Perfect

Way here means the path David actually walks through life and battle.

Perfect means complete, without a missing piece needed for the journey.

David credits God with making the path itself workable, not just giving him strength.

This connects strength given in the line before with clear direction here.

Both power and direction come from the same source.

🛤️ Way means David's actual path through life
✅ Perfect means complete, nothing missing
🧭 Direction paired with the strength before it
📖 Power and direction share one source

## 🦌 He Maketh My Feet Like Hinds' Feet

A hind is a female deer, known for sure footed movement across steep, rocky terrain.

Deer can leap between narrow ledges without slipping or hesitating.

David compares his own steadiness in danger to that same sure footed skill.

This is not natural human ability, it is a gift compared to an animal's instinct.

The image pictures confident movement even where the ground itself is unstable.

🦌 A hind is a deer, sure footed
🪨 Deer move confidently across steep rocky ground
🎁 Compared to a gift, not natural human skill
📖 Confident movement even on unstable ground

## 🏔️ And Setteth Me Upon My High Places

High places here means elevated, secure ground, not the pagan worship sites named elsewhere in scripture.

Setteth pictures being placed there deliberately, not climbing there alone.

This finishes the imagery of the sure footed deer from the line before it.

Reaching the high place completes the picture of safety after danger.

David ends this section standing in a position his enemies cannot reach.

🏔️ High places means elevated secure ground
🙌 Setteth pictures being placed there
🔁 Finishes the sure footed deer imagery
📖 David stands where his enemies cannot reach

# Psalms 18:34-36
# 🏹 Trained For War
---
## 🎓 He Teacheth My Hands To War

Teacheth means actively trains, the same word used for instructing a student.

War here required real skill, not just natural strength or courage.

David credits God directly with training his hands for combat.

This is not a claim that talent alone made him effective in battle.

Skill itself becomes something given by God, not something David built entirely on his own.

🎓 Teacheth means active training
⚔️ War required real learned skill
🙏 David credits God with the training
📖 Skill itself is a gift from God

## 🏹 So That A Bow Of Steel Is Broken By Mine Arms

A bow of steel or bronze required unusual strength to bend and fire correctly.

Most soldiers could not draw a bow this stiff without years of practice.

David describes breaking one, an image of overwhelming, almost impossible strength.

This exaggerated picture emphasizes the scale of the power God gave him.

Poetry often stretches an image like this to make the point unmistakable.

🏹 A bronze bow needed unusual strength
💪 Most soldiers could not even draw it
🔨 Breaking it pictures overwhelming strength
📖 Poetry stretches the image to be clear

## 🛡️ Thou Hast Given Me The Shield Of Thy Salvation

A shield protected a soldier from incoming blows during close combat.

Calling it the shield of salvation ties ordinary battle equipment directly to God's rescue.

David is not just physically equipped, his protection itself comes from God's saving power.

The shield picture connects back to titles for God used at the very start of the psalm.

Every piece of David's success traces back to the same giver.

🛡️ A shield protected against close combat blows
🔗 Ties equipment directly to God's salvation
🔁 Connects back to titles from the psalm's start
📖 Every success traces back to the same giver

## 🕊️ Thy Gentleness Hath Made Me Great

This does not mean God was only harsh throughout David's training for battle.

Gentleness here describes patient, careful care rather than forceful correction.

David credits his greatness to God's patient care over time, not raw power alone.

This softens the entire warrior picture with an unexpected, tender explanation.

Strength and gentleness are shown working together, not competing with each other.

🙅 Not only harshness throughout David's training
🕊️ Gentleness means patient, careful care
📈 Greatness credited to patient care over time
📖 Strength and gentleness work together here

## 🛤️ Thou Hast Enlarged My Steps Under Me

Enlarged pictures widening the ground someone can safely walk on.

This is the opposite of the trapped, cramped danger described earlier in the psalm.

David describes room to move freely and confidently, without fear of stumbling.

Wide steps allow speed and confidence that a narrow, cramped path never could.

Freedom of movement itself becomes one more gift traced back to God.

🛤️ Enlarged pictures widened safe ground
🔗 Opposite of the earlier cramped danger
🏃 Room to move freely and confidently
📖 Freedom of movement traced back to God

# Psalms 18:37-40
# ⚔️ Pursuing The Enemy
---
## 🏃 I Have Pursued Mine Enemies, And Overtaken Them

Pursued means actively chasing, not simply waiting for danger to leave on its own.

Overtaken means catching up completely, closing the distance entirely.

David moves here from defense to active offense against the threat.

This shift shows confidence built directly from everything just described.

A person who once felt surrounded now becomes the one giving chase.

🏃 Pursued means actively chasing danger
🎯 Overtaken means catching up completely
🔄 A shift from defense to offense
📖 The surrounded becomes the one chasing

## 🔙 Neither Did I Turn Again Till They Were Consumed

Turn again pictures giving up a chase partway through and heading back.

David describes total commitment, refusing to stop until the danger ended completely.

Consumed means fully finished, nothing left of the threat to return later.

Half measures against real danger often leave a threat to return stronger.

David's persistence matches the seriousness of the danger described earlier.

🔙 Turn again pictures quitting partway through
🚫 David refused to stop early
🏁 Consumed means the threat fully ended
📖 Persistence matched the danger's seriousness

## 👣 They Are Fallen Under My Feet

Fallen under the feet pictures total defeat, the ancient image of a conquered enemy.

Kings in this era were sometimes shown standing over defeated rulers as public proof of victory.

David is not exaggerating a minor success into something grand.

He describes a real, complete reversal from being surrounded to standing victorious.

The picture makes the outcome impossible to misunderstand.

👣 Fallen under feet pictures total defeat
👑 Kings used this image to show victory
🔄 A real reversal from surrounded to victorious
📖 The picture leaves no room for doubt

## ⚔️ Thou Hast Girded Me With Strength Unto The Battle

Strength unto the battle means power suited exactly for this particular fight.

Girding pictures fastening tightly for action, the same picture used back in verse thirty two.

David again credits God directly rather than claiming personal skill alone.

Repetition in this psalm is not accidental, it reinforces where credit belongs.

Every victory keeps tracing back to the same giver of strength.

⚔️ Strength suited exactly for this fight
🔁 Same girding picture used in verse thirty two
🙏 Credit given to God, not personal skill
📖 Every victory traces to the same giver

## 🦴 Thou Hast Given Me The Necks Of Mine Enemies

Giving someone the neck of an enemy pictures complete, humiliating defeat.

An enemy who turns their back or neck in retreat has stopped fighting entirely.

This ancient picture of triumph appears in similar language elsewhere in the Old Testament.

David describes total victory, not a narrow or partial escape.

The danger that opened this psalm has now completely reversed.

🦴 Neck pictures complete humiliating defeat
🏃 A turned neck means retreat, fight over
📜 Similar language appears elsewhere in scripture
📖 The opening danger has fully reversed

# Psalms 18:41-45
# 🌬️ Beaten As Small As Dust
---
## 😢 They Cried, But There Was None To Save Them

They here refers to David's enemies, not David himself.

None to save pictures complete abandonment, no rescue available anywhere for them.

This directly reverses David's own experience described earlier in the psalm.

David was heard and rescued, while his enemies find no one listening at all.

The contrast between these two outcomes could not be sharper.

😢 They refers to David's enemies
🚫 None to save means complete abandonment
🔄 Directly reverses David's own experience
📖 A sharp contrast between two outcomes

## 🙅 Even Unto The LORD, But He Answered Them Not

This does not mean God refuses to hear every honest prayer that comes to him.

It clarifies exactly who these enemies cried out to and received no answer from.

It shows these were not people sincerely turning toward God in humility.

Their cry came only after defeat, not out of real relationship with him.

Timing and motive shape whether a cry for help actually gets an answer.

🙅 Not a claim God ignores honest prayer
🙏 Clarifies they cried to the LORD directly
⏱️ Their cry came only after defeat
📖 Timing and motive shape how prayer lands

## 💨 Then Did I Beat Them Small As The Dust Before The Wind

Dust before the wind pictures something so light it simply scatters and disappears.

David describes a total, easy defeat, not a difficult or costly struggle.

The comparison emphasizes how little resistance remained by this point.

This kind of image would have been familiar to anyone who had seen dust blown off a threshing floor.

The once threatening enemy is reduced to almost nothing.

💨 Dust before wind pictures something scattering
🍃 A total, easy defeat by this point
🌾 Familiar image from a threshing floor
📖 The enemy is reduced to almost nothing

## 👑 Thou Hast Made Me The Head Of The Heathen

Head here pictures the leading, ruling position over a group of people.

Heathen means nations outside of Israel, foreign peoples who did not worship the LORD.

David describes authority extending beyond his own nation's borders.

This reflects the wider influence David's kingdom actually reached during his reign.

God's rescue expanded into something far larger than personal survival.

👑 Head pictures the ruling position
🌍 Heathen means nations outside Israel
📈 Authority extending beyond his own borders
📖 Rescue grew into something larger than survival

## 🌐 A People Whom I Have Not Known Shall Serve Me

A people whom I have not known means nations with no prior relationship to David at all.

Serve here means submitting to his authority, not personal friendship or familiarity.

This detail highlights how far David's influence spread beyond any expectation.

He is not describing people who chose him out of familiarity.

Unfamiliar nations submitting shows the scale of what God accomplished through him.

🌐 Describes nations with no prior relationship
🙇 Serve means submitting to authority
📊 Highlights unexpected, far reaching influence
📖 Shows the scale of what God accomplished

## 🤝 The Strangers Shall Submit Themselves Unto Me

Submit themselves means surrendering willingly, not being forced into submission through further violence.

This describes voluntary recognition of David's authority once his reputation spread.

Obey me shows nations responding based on reputation alone, before any direct encounter.

This is influence built through what people heard rather than through repeated new conquest.

David's rescue by God created lasting authority far beyond the original battle.

🤝 Submit means surrendering willingly
📣 Nations respond based on reputation alone
🌍 Influence built through what people heard
📖 God's rescue created lasting authority

## 🌫️ The Strangers Shall Fade Away

Strangers here refers to foreign enemies who once resisted or opposed David.

Fade away pictures losing strength and confidence gradually, not through direct combat.

This describes a quiet collapse rather than another dramatic battle scene.

Enemies who cannot defeat David directly simply lose their will to resist.

Sometimes victory looks like an enemy's resolve slowly dissolving.

🌫️ Strangers means foreign enemies who resisted
📉 Fade away pictures losing strength gradually
🤐 A quiet collapse, not another battle
📖 Victory sometimes looks like resolve dissolving

# Psalms 18:46-48
# 🪨 The LORD Liveth
---
## ☝️ The LORD Liveth

No lifeless idol worshiped by nearby nations could ever make this claim.

Liveth means actively alive and active, not merely existing somewhere unseen.

David is not offering a philosophical statement about existence in general.

He is celebrating a God who has just personally acted throughout this entire psalm.

Every event described earlier in the psalm backs up this simple claim.

☝️ No lifeless idol could make this claim
⚡ Liveth means actively alive, not just existing
🙏 Not philosophy, a personal celebration
📖 Backed up by everything already described

## 🙌 And Blessed Be My Rock

Blessed here means praised and honored, spoken back to God in worship.

Rock returns to the very first title David used for God back in verse two.

David closes the loop by returning to where the psalm began.

The rock that protected him through everything now receives his praise directly.

This return to the opening image shows the psalm reaching its natural conclusion.

🙌 Blessed means praised and honored
🔁 Returns to the first title from verse two
🔗 Closes the loop back to the start
📖 The psalm reaches its natural conclusion

## ⚖️ It Is God That Avengeth Me

Avengeth means brings justice against wrongdoing, not personal revenge for its own sake.

David credits God, not himself, with settling the wrong done against him.

This distinguishes justice carried out by God from wrongful vengeance carried out in anger.

Trusting God's justice can free a person from having to settle every score personally.

David rested his case in God's hands, not his own retaliation.

⚖️ Avengeth means bringing justice, not revenge
🙏 Credit given to God, not David himself
🆚 Different from personal vengeance done in anger
📖 David rested his case in God's hands

## 🙌 Thou Liftest Me Up Above Those That Rise Up Against Me

Liftest pictures being raised to a position above a threat, no longer level with the danger.

Rise up against pictures an active, ongoing opposition, not a single past incident.

David describes an ongoing pattern of protection, not just one closed chapter.

This lifted position echoes the high places and high tower named earlier in the psalm.

Elevation keeps showing up throughout this psalm as a picture of safety.

🙌 Liftest pictures rising above the threat
⚔️ Rise up against pictures ongoing opposition
🔁 Echoes the high places from earlier
📖 Elevation pictures safety throughout the psalm

## 🗡️ Thou Hast Delivered Me From The Violent Man

Violent man names a specific kind of danger, someone who used force rather than words.

This likely echoes real threats David faced, including from Saul and other rivals.

David closes this section by naming the danger plainly one final time.

Naming a threat honestly gives the rescue that follows its full weight.

This entire psalm rests on real events, not abstract poetry alone.

🗡️ Violent man means someone who used force
👑 Likely echoes real threats like Saul
🗣️ Naming the danger plainly one last time
📖 The psalm rests on real events, not abstraction

# Psalms 18:49-50
# 👑 Mercy To David And His Seed
---
## 📢 Therefore Will I Give Thanks Unto Thee Among The Heathen

Among the heathen means David plans to praise God publicly, even in front of foreign nations.

This is not private, quiet gratitude kept to himself.

David wants everyone, including outsiders, to know exactly who deserves credit.

This verse gets quoted later in the New Testament to show God's plan reaching beyond Israel.

Public praise turns personal rescue into a wider witness.

📢 Praise given publicly, even before foreign nations
🙅 Not private, quiet gratitude alone
🌍 Quoted later to show God's wider plan
📖 Personal rescue becomes a public witness

## 👑 Great Deliverance Giveth He To His King

King here refers to David himself, chosen and anointed to rule Israel.

Great deliverance summarizes the entire rescue story told throughout this whole psalm.

David steps back here to describe himself in the third person, almost like a title.

This shift gives the summary a formal, almost official weight.

The entire psalm gets compressed into this one confident sentence.

👑 King refers to David himself
🔀 Shifts to third person for emphasis
🏆 Summarizes the entire rescue story
📖 The whole psalm compressed into one claim

## 🛢️ And Sheweth Mercy To His Anointed

Anointed translates the Hebrew word mashiach, the root behind the word messiah.

David was anointed with oil as a sign of being chosen by God for kingship.

This word later grows into a much larger promise about a future anointed king.

Mercy here means God's loyal, covenant based kindness, not simple pity.

The rescue in this psalm becomes a small picture of a much bigger promise.

🛢️ Anointed translates mashiach, root of messiah
👑 Anointing marked David as chosen king
🤝 Mercy means loyal covenant kindness
📖 A small picture of a much bigger promise

## 🌱 To David, And To His Seed For Evermore

Seed here means descendants, the family line that continues after David.

For evermore extends this promise far beyond David's own lifetime.

This connects to God's covenant promise that David's throne would last forever.

That promise ultimately points toward Jesus, the greater son of David.

The psalm that opened with one man's desperate cry ends with an everlasting promise.

🌱 Seed means descendants, his family line
⏳ For evermore extends beyond his lifetime
👑 Connects to the promise of an eternal throne
📖 One man's cry ends in an everlasting promise
`.trim();

export const PSALMS_EIGHTEEN_PERSONAL_SECTIONS = parsePsalmsEighteenRawNotes(PSALMS_EIGHTEEN_RAW_NOTES);
