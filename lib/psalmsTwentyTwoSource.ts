export type PsalmsTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyTwoRawNotes(rawText: string): PsalmsTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 22:${startVerse}` : `Psalms 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 22 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_TWO_RAW_NOTES = `# Psalms 22:1-5
# 😭 Forsaken Yet Still Holy
---
## 😭 My God, My God, Why Hast Thou Forsaken Me

This cry opens one of the most quoted psalms in the whole Bible.

Jesus spoke these exact words while hanging on the cross.

David wrote them centuries earlier out of his own deep pain.

The repeated "My God" shows desperate, personal pleading, not distant theology.

This is a real cry from someone who feels utterly alone.

😭 David cries out in real anguish
✝️ Jesus spoke these words on the cross
🔁 My God is repeated for emphasis
📖 This cry belongs to the truly forsaken

## 📣 Why Art Thou So Far From Helping Me, And From The Words Of My Roaring

"Roaring" pictures a groan too raw for normal words.

David feels that God has moved far away in his pain.

He is not staying quiet about his suffering.

He cries out loudly, the way a wounded animal might.

🦁 Roaring means a raw, wordless groan
😢 David feels God is far away
📣 He cries out loudly, not quietly
📖 Honest cries are not weakness before God

## ☀️ I Cry In The Day Time, But Thou Hearest Not

David does not pray once and then stop.

"Day time" means the crying continues through the whole day.

Even so, no answer seems to come back.

This is prayer that keeps going without a visible response.

☀️ Day time means all day long
🙉 No answer seems to come
🙏 He keeps praying despite the silence
📖 Real faith prays even without answers

## 🌙 In The Night Season, And Am Not Silent

The crying does not stop once the sun goes down.

David keeps calling out to God through the night as well.

"Not silent" means he refuses to simply give up.

His prayer covers every hour, not just the easy ones.

🌙 Night season means after dark
🗣️ Not silent means he keeps calling
⏰ His prayer covers every hour
📖 Persistent prayer never gives up

## ✨ Thou Art Holy

The psalm suddenly turns from complaint to a statement about God.

"Holy" means completely set apart, without any moral failure.

David's pain does not erase this fact about God.

He tells the truth about God even while he is hurting.

🔀 The psalm turns from complaint to praise
✨ Holy means set apart and without failure
😣 His pain does not change this truth
📖 Truth about God stands above our feelings

## 🕍 O Thou That Inhabitest The Praises Of Israel

"Inhabitest" means to sit enthroned, to dwell in a fixed place.

God is pictured as sitting enthroned upon Israel's worship itself.

When His people sing praise, He is truly present there.

This is not a poetic exaggeration but a real claim about God.

🕍 Inhabitest means enthroned, dwelling in a place
🎵 God dwells within Israel's praises
👑 Praise itself becomes His throne
📖 God is present when His people worship

## 👴 Our Fathers Trusted In Thee

David looks back to earlier generations of Israel for comfort.

"Our fathers" means the ancestors, going back to Abraham and beyond.

Their story becomes evidence he can lean on in his own pain.

He is not the first person to trust God through hardship.

👴 Fathers means Israel's earlier ancestors
📜 Their story becomes his evidence
🔁 He is not the first to trust
📖 Past faithfulness supports present faith

## 🙌 They Trusted, And Thou Didst Deliver Them

The verse repeats the word "trusted" from the line before it.

Hebrew poetry often restates an idea to make it land harder.

This time the sentence finishes with an actual result, deliverance.

Trust in this psalm is never left hanging without an answer.

🙌 Trusted repeats the idea on purpose
📜 Hebrew poetry often restates for emphasis
✅ This time trust leads to deliverance
📖 God answers real trust with real rescue

## 😭 They Cried Unto Thee, And Were Delivered

"Cried" describes the same kind of desperate call David used in verse one.

The ancestors' crying did not go unanswered like David's currently seems to.

Naming their rescue sharpens the pain of his own unanswered cry.

It also gives him a reason to keep hoping.

😭 Cried echoes David's own cry in verse one
✅ Their crying was answered with rescue
💔 This sharpens David's own unanswered pain
📖 Their rescue still gives him hope

## 🚫 They Trusted In Thee, And Were Not Confounded

"Confounded" means put to shame or humiliated in front of others.

The fathers trusted God and were never left looking foolish for it.

David has not experienced that outcome yet in his own life.

Naming the pattern keeps his hope alive even in the gap.

🚫 Confounded means put to shame
👴 The fathers were never shamed for trusting
⏳ David has not seen that outcome yet
📖 Naming the pattern keeps hope alive

# Psalms 22:6-8
# 😔 Mocked As A Worm
---
## 🪱 But I Am A Worm, And No Man

David describes himself as lower than human, like a worm underfoot.

A worm has no strength, no dignity, and no ability to defend itself.

This is not literal self hatred but a picture of total helplessness.

Many readers see this line pointing forward to Christ's own humiliation.

🪱 A worm pictures total helplessness
💔 David feels stripped of all dignity
✝️ Many see this pointing to Christ
📖 God hears even the most helpless cry

## 😞 A Reproach Of Men, And Despised Of The People

"Reproach" means public shame, being openly insulted by others.

"Despised" means looked down upon as worthless.

David is not just suffering privately, he is being humiliated in public.

The crowd's contempt adds a second layer of pain to his suffering.

😞 Reproach means public shame
🙅 Despised means treated as worthless
👥 This shame plays out in public
📖 Public contempt deepens private pain

## 😂 All They That See Me Laugh Me To Scorn

"Laugh to scorn" means to mock someone with open contempt.

People are not just ignoring David, they are actively ridiculing him.

Watching others enjoy his suffering makes the pain sharper.

Matthew's Gospel later describes this same kind of mockery at the cross.

😂 Laugh to scorn means open mockery
👀 Onlookers actively ridicule him
😣 Watching cruelty adds to the pain
📖 The Gospels echo this same scene

## 👅 They Shoot Out The Lip, They Shake The Head

"Shoot out the lip" was a gesture of open contempt in this culture.

Shaking the head was a similar mocking gesture, still recognizable today.

Both actions communicated insult without a single word being spoken.

Matthew 27 describes this exact gesture aimed at Jesus on the cross.

👅 Shooting the lip was a mocking gesture
🙄 Shaking the head also signaled contempt
🤐 Both mocked without saying a word
📖 Matthew 27 echoes this exact scene

## 🗣️ He Trusted On The LORD That He Would Deliver Him

The crowd is quoting David's own words back at him as an insult.

They twist his trust in God into a joke at his expense.

This is a cruel way to mock someone's faith.

Real trust in God can still draw ridicule from onlookers.

🗣️ The crowd quotes his own faith
😈 They twist his trust into a joke
💔 Mocking someone's faith is especially cruel
📖 Real faith can still draw ridicule

## 😈 Let Him Deliver Him, Seeing He Delighted In Him

This taunt dares God to prove Himself by rescuing David on the spot.

"Delighted in him" mockingly questions whether God actually loves David at all.

Matthew 27:43 quotes this almost word for word at the crucifixion.

The same insult aimed at David gets aimed at Jesus centuries later.

😈 The taunt dares God to rescue him now
❓ It mocks whether God truly loves him
✝️ Matthew 27:43 quotes this almost exactly
📖 The same insult reaches Jesus centuries later

# Psalms 22:9-11
# 🤱 Trusted From Birth
---
## 🤱 But Thou Art He That Took Me Out Of The Womb

David shifts from present suffering back to his very beginning.

"Took me out of the womb" credits God with the act of birth itself.

Even something as ordinary as being born becomes evidence of God's care.

David is building a case for trust that stretches back before memory.

🤱 God is credited with his very birth
👶 Even birth becomes evidence of care
🧠 This trust stretches before memory
📖 God's care began before he knew it

## 🍼 Thou Didst Make Me Hope When I Was Upon My Mother's Breasts

This pictures David as a nursing infant, fully dependent and unaware.

Even then, the text says God was already shaping hope in him.

A baby cannot choose to trust, yet God's care was already at work.

This is not a hope David built himself, it was given to him.

🍼 Pictures David as a helpless infant
🌱 God shaped hope before he could choose it
👶 A baby cannot earn or build trust
📖 This hope was a gift, not effort

## 🎁 I Was Cast Upon Thee From The Womb

"Cast upon thee" pictures a helpless infant being placed directly into God's care.

The image is almost like being handed over, with no other option.

David had no ability to survive on his own as a newborn.

From his very first moment, dependence on God was already his story.

🎁 Cast upon thee pictures being handed over
👶 A newborn has no other option
🤲 David could not survive on his own
📖 Dependence on God began at his first breath

## 👑 Thou Art My God From My Mother's Belly

This is a direct, personal claim, not a general statement about religion.

David is not describing God in the abstract here.

He is naming God as his own God, from before he could speak.

That personal claim becomes the foundation for everything else in the psalm.

👑 This is a personal claim, not abstract belief
🗣️ He names God as his own
🍼 The claim reaches back before he could speak
📖 Personal faith is the psalm's foundation

## 🙏 Be Not Far From Me

This short, direct plea returns to the fear named in verse one.

David feared that God had moved far away from him.

Here he asks plainly for that distance to close.

The prayer is simple because the need is simple, God's nearness.

🙏 This plea echoes the fear in verse one
📏 David fears real distance from God
🤲 He asks plainly for God to be near
📖 The simplest prayers are often the truest

## ⚠️ There Is None To Help

David names the reality of his situation without softening it.

He has no human ally left who can rescue him.

Naming this plainly is not a lack of faith.

It is honesty that clears the way for trusting God alone.

⚠️ David names his situation plainly
🙅 No human ally remains to help him
🗣️ Honest naming is not a lack of faith
📖 Honesty clears the way to trust God alone

# Psalms 22:12-16
# 🩸 Surrounded And Pierced
---
## 🐂 Many Bulls Have Compassed Me

"Compassed" means surrounded on every side, leaving no way out.

David pictures his enemies as a herd of bulls closing in around him.

Bulls in this image are not calm farm animals but a real threat.

The picture is meant to feel overwhelming and inescapable.

🐂 Compassed means surrounded on every side
🚫 There is no way out pictured here
⚠️ Bulls represent real, physical danger
📖 The image is meant to feel inescapable

## 🐮 Strong Bulls Of Bashan Have Beset Me Round

Bashan was a region east of the Jordan River known for rich pastureland.

Cattle raised there grew unusually large and powerful because of that land.

"Beset me round" repeats the idea of being surrounded, this time by the strongest bulls known.

Naming Bashan specifically makes the danger feel even more overwhelming.

🌾 Bashan was known for rich pastureland
🐮 Its cattle grew unusually large and strong
🔁 Beset me round repeats surrounded on every side
📖 Naming Bashan sharpens the sense of danger

## 👄 They Gaped Upon Me With Their Mouths

"Gaped" means to open the mouth wide, staring with hostile intent.

The image shifts from bulls to something even more predatory.

An open, gaping mouth suggests an attack that is about to happen.

David feels like prey being sized up before the strike.

👄 Gaped means an open, staring mouth
🎯 The image now suggests an attack
🦴 David feels sized up like prey
📖 Fear here is physical, not just emotional

## 🦁 As A Ravening And A Roaring Lion

"Ravening" describes an animal ferociously hunting for its next meal.

Pairing it with a roaring lion makes the threat feel immediate and violent.

This is the most dangerous predator a shepherd in this culture could imagine.

David uses the strongest image available to describe his enemies.

🦁 Ravening means ferociously hunting for prey
🔊 A roaring lion adds immediate danger
🐑 Lions were a shepherd's worst fear
📖 David reaches for his strongest possible image

## 💧 I Am Poured Out Like Water, And All My Bones Are Out Of Joint

"Poured out like water" pictures strength draining away completely, like water spilled on dry ground.

"Bones out of joint" describes the body itself failing under extreme stress.

This is physical suffering, not only emotional pain.

Many see this verse describing exactly what crucifixion does to a body.

💧 Poured out pictures strength draining away
🦴 Bones out of joint means physical failure
😖 This is real bodily suffering
📖 Many connect this to crucifixion itself

## 🕯️ My Heart Is Like Wax

Wax holds its shape until heat is applied, then it softens and loses form.

David's inner strength is melting the same way under pressure.

His heart is not literally made of wax, this is a picture of collapse.

Courage itself is failing him under this much suffering.

🕯️ Wax holds shape until heat softens it
💔 David's inner strength is melting away
🧠 This pictures collapse, not a literal heart
📖 Even courage can fail under enough suffering

## 🫀 It Is Melted In The Midst Of My Bowels

In this culture, the "bowels" were thought of as the seat of deep emotion.

Saying his heart melted "in his bowels" pushes the image of collapse even further inward.

This is not a shallow feeling but something felt in the deepest part of a person.

David's suffering has reached the very core of who he is.

🫀 Bowels meant the seat of deep emotion
🌊 The collapse reaches even deeper here
💔 This is not a shallow feeling
📖 His suffering reaches his very core

## 🏺 My Strength Is Dried Up Like A Potsherd

A potsherd is a broken piece of dry, brittle pottery.

David compares his own strength to something already cracked and used up.

There is nothing flexible or resilient left in that image.

He feels completely spent, with nothing left to give.

🏺 A potsherd is a broken piece of pottery
💔 David compares his strength to something used up
🚫 Nothing flexible or resilient remains
📖 He feels completely spent

## 👅 My Tongue Cleaveth To My Jaws

"Cleaveth" is an old word meaning to stick or cling tightly.

Extreme thirst can make the tongue feel stuck to the roof of the mouth.

This detail adds physical, bodily suffering to the emotional picture already painted.

Many see this as another detail matching what crucifixion produces in the body.

👅 Cleaveth means stuck or clinging tightly
💧 Extreme thirst causes this exact sensation
😖 This adds real physical suffering
📖 Many connect this detail to crucifixion

## ⚰️ Thou Hast Brought Me Into The Dust Of Death

"Dust of death" is a vivid way of saying he feels as good as dead already.

David is not just uncomfortable, he feels brought to the very edge of dying.

Naming God as the one who "brought" him there is startling honesty.

Even in near despair, David still speaks directly to God about it.

⚰️ Dust of death means feeling near dead
😨 David feels brought to the very edge
🗣️ He names God directly in his despair
📖 Honest prayer speaks even from near despair

## 🐕 Dogs Have Compassed Me

Dogs in this culture were not household pets but wild, scavenging animals.

A pack of dogs closing in pictures a dangerous, coordinated threat.

This repeats the surrounded image from verse twelve with a new picture.

The danger has not lessened, it has only changed shape.

🐕 Dogs here were wild, scavenging animals
🎯 A pack pictures a coordinated threat
🔁 This repeats the surrounded image again
📖 The danger has only changed shape

## 👥 The Assembly Of The Wicked Have Inclosed Me

"Inclosed" is an older spelling of enclosed, meaning shut in with no way out.

This time the threat is not animals but a gathered crowd of hostile people.

"Assembly" suggests an organized group, not a random mob.

The danger David faces is deliberate, not accidental.

👥 Inclosed means shut in on every side
🧑‍🤝‍🧑 This threat is a crowd of hostile people
📋 Assembly suggests an organized group
📖 This danger is deliberate, not accidental

## ✋ They Pierced My Hands And My Feet

This line describes wounds in the hands and feet, centuries before crucifixion existed as a punishment.

Crucifixion as a method of execution was not even practiced when David wrote this psalm.

Roman crucifixion, which pierces exactly the hands and feet, would not appear for many centuries.

Christians have long read this verse as a direct prophecy fulfilled at the cross.

✋ Wounds appear in the hands and feet
📜 Crucifixion did not exist when David wrote this
🕰️ Roman crucifixion came many centuries later
📖 Many read this as prophecy of the cross

# Psalms 22:17-21
# 🎲 Stared At And Stripped
---
## 🦴 I May Tell All My Bones

David's suffering has made him so thin that his bones are visible.

"Tell" here means to count, not to speak.

This detail shows extreme physical wasting, not just a figure of speech.

His body itself has become evidence of how much he has suffered.

🦴 His bones are visible from wasting
🔢 Tell here means to count
😖 This shows real physical suffering
📖 His body itself testifies to his pain

## 👀 They Look And Stare Upon Me

Instead of showing pity, onlookers simply stare at his suffering.

Staring in this context is cold, not curious or compassionate.

The crowd watches like spectators rather than people who might help.

David is surrounded by witnesses who offer no comfort at all.

👀 Onlookers stare instead of showing pity
❄️ Their staring is cold, not curious
🎭 The crowd watches like spectators
📖 No one nearby offers real comfort

## 👕 They Part My Garments Among Them, And Cast Lots Upon My Vesture

"Vesture" is an older word for clothing or a garment.

Dividing a condemned or dying person's clothes was a real practice in this world.

Casting lots meant using a random method, like dice, to decide who received what.

All four Gospels describe soldiers doing this exact thing at the crucifixion.

👕 Vesture means clothing or a garment
🎲 Casting lots meant a random draw
⚔️ This detail was a real ancient practice
📖 All four Gospels describe this at the cross

## 🙏 Be Not Thou Far From Me, O LORD

This plea repeats the same request made earlier in the psalm.

Repetition here is not empty, it shows the depth of David's need.

He keeps returning to this one request no matter what else he describes.

Sometimes prayer is simply asking the same true thing again and again.

🔁 This repeats an earlier plea in the psalm
💔 Repetition shows the depth of his need
🔙 He keeps returning to this one request
📖 Faithful prayer can ask the same thing twice

## 💪 O My Strength, Haste Thee To Help Me

David calls God his strength, even while feeling completely weak himself.

"Haste thee" is an urgent plea for God to act quickly, not eventually.

This is not a calm, patient prayer, it is an urgent cry for immediate rescue.

Naming God as strength does not mean David feels strong himself.

💪 God is named as strength in David's weakness
⏱️ Haste thee is an urgent plea
🚨 This prayer asks for rescue now
📖 Naming God's strength does not require feeling strong

## ⚔️ Deliver My Soul From The Sword

"Soul" here means his whole life, not just an inner spiritual part.

The sword pictures a violent, sudden death at the hands of enemies.

David is asking to be saved from being killed outright.

This is a direct, physical request, not only a spiritual one.

⚔️ Soul here means his whole life
🗡️ The sword pictures a violent death
🙏 David asks to be saved from being killed
📖 This request is physical, not only spiritual

## 🐕 My Darling From The Power Of The Dog

"Darling" is an older word meaning his one and only, his precious life.

It does not describe a person he loves, it describes his own life as precious to him.

"The dog" returns to the earlier image of dangerous, scavenging animals closing in.

David treats his own life as something worth pleading for.

💗 Darling means his one precious life
🚫 It means his own life, not another
🐕 The dog recalls the earlier scavenger image
📖 His own life is worth pleading for

## 🦁 Save Me From The Lion's Mouth

This returns to the lion image used earlier in the psalm.

The lion's mouth pictures the very edge of being devoured completely.

David is not asking for comfort, he is asking to not be destroyed.

The request is as basic and urgent as survival itself.

🔁 This returns to the earlier lion image
😱 The lion's mouth pictures being devoured
🙏 David asks simply to survive
📖 Some prayers are just this basic

## 🐂 Thou Hast Heard Me From The Horns Of The Unicorns

"Unicorns" in the King James Bible does not mean the mythical horse creature.

It translates a Hebrew word for a powerful wild ox known for its strength and its horns.

The horns pictured a real, physical danger of being gored.

The verse ends this section with a note that God has already heard him.

🐂 Unicorns here means a powerful wild ox
🦴 Its horns pictured a real danger
✅ God has already heard him
📖 Answered prayer can end even a hard section

# Psalms 22:22-26
# 🎉 Praise Breaks Through
---
## 🗣️ I Will Declare Thy Name Unto My Brethren

The psalm shifts here from desperate pleading to a promise of public praise.

"Declare" means to announce openly, not to whisper privately.

"Brethren" means his own people, the community around him.

Hebrews 2:12 later quotes this exact line and applies it directly to Christ.

🔀 The psalm shifts from pleading to praise
📣 Declare means to announce openly
👥 Brethren means his own community
📖 Hebrews 2:12 applies this line to Christ

## 🎤 In The Midst Of The Congregation Will I Praise Thee

"Congregation" describes a gathered assembly of people worshiping together.

David's praise will not stay private, it will be spoken out loud in public.

This mirrors the public mockery from earlier in the psalm, now turned into public praise.

What began in public shame will end in public worship.

🎤 Congregation means a gathered worshiping assembly
📢 His praise will be spoken publicly
🔄 This mirrors the earlier public mockery
📖 Public shame turns into public worship

## 🙌 Ye That Fear The LORD, Praise Him

"Fear the LORD" means holding God in deep reverence, not being afraid of Him.

David now turns and speaks directly to other worshipers.

He is inviting others into the praise he is about to offer.

His personal rescue becomes an invitation for the whole community.

🙌 Fear the LORD means deep reverence
🗣️ David now speaks directly to others
🤝 He invites others into his praise
📖 One person's rescue can invite a whole community

## 👨‍👩‍👧‍👦 All Ye The Seed Of Jacob, Glorify Him

"Seed of Jacob" means the descendants of Jacob, later renamed Israel.

This widens the invitation from individual worshipers to the entire nation.

"Glorify" means to give honor and weight to someone publicly.

The call to praise keeps growing larger throughout this section.

👨‍👩‍👧‍👦 Seed of Jacob means Jacob's descendants
📈 The invitation widens to the whole nation
🏆 Glorify means to give public honor
📖 The call to praise keeps growing larger

## 😨 Fear Him, All Ye The Seed Of Israel

The call to reverence now reaches every branch of God's covenant people.

"Israel" was the new name given to Jacob after wrestling with God.

By naming both Jacob and Israel, the psalm covers the nation's full identity.

No part of God's people is left out of this call to worship.

🏷️ Israel was Jacob's new covenant name
📛 Naming both covers the nation's full identity
🌐 The call now reaches every branch of Israel
📖 No part of God's people is left out

## 🚫 He Hath Not Despised Nor Abhorred The Affliction Of The Afflicted

"Despised" and "abhorred" both describe rejecting something with disgust.

David states plainly that God did not treat his suffering that way.

"Affliction of the afflicted" repeats the word for emphasis, naming real suffering directly.

This answers the fear of abandonment raised all the way back in verse one.

🚫 Despised and abhorred mean rejected with disgust
🙅 God did not treat David's suffering that way
🔁 Affliction of the afflicted repeats for emphasis
📖 This answers the fear from verse one

## 🙈 Neither Hath He Hid His Face From Him

"Hid his face" was a common way of describing God's absence or disfavor.

David now states the opposite of what he feared at the start of the psalm.

God's face was not hidden, even though it felt that way in the moment.

Feelings during suffering are not always the full truth about God's presence.

🙈 Hid his face pictured God's absence
🔄 This reverses the fear from the psalm's opening
👁️ God's face was not actually hidden
📖 Feelings are not always the full truth

## 👂 But When He Cried Unto Him, He Heard

This short line resolves the entire tension the psalm opened with.

David cried out in verse one wondering if anyone was listening.

Here the answer arrives plainly, God heard him after all.

The forsaken cry from the beginning ends in a heard prayer.

🔚 This line resolves the psalm's opening tension
❓ Verse one wondered if anyone was listening
✅ The answer is plain, God heard him
📖 The forsaken cry ends in a heard prayer

## 🎶 My Praise Shall Be Of Thee In The Great Congregation

David commits to praising God publicly, not only in private relief.

"The great congregation" points to a large, gathered crowd of worshipers.

His personal answered prayer becomes material for shared, public worship.

Private rescue is meant to be turned into public testimony.

🎶 David commits to public, not just private praise
👥 The great congregation means a large crowd
🔗 His rescue becomes shared public worship
📖 Private rescue can become public testimony

## 🤝 I Will Pay My Vows Before Them That Fear Him

A "vow" in this culture was a promise made to God, often during distress.

Paying a vow meant following through on that promise once help arrived.

David likely made promises to God while he was suffering earlier in the psalm.

He now intends to keep those promises publicly, not quietly forget them.

🤝 A vow was a promise made to God
✅ Paying it means following through later
🙏 David likely made vows during his suffering
📖 He intends to keep his word publicly

## 🍞 The Meek Shall Eat And Be Satisfied

"Meek" describes people who are humble and often overlooked by others.

"Eat and be satisfied" pictures a shared feast, not just personal relief.

David's rescue becomes an occasion for others who are poor or humble to be fed.

His personal story widens out to include people who have nothing of their own.

🍞 Meek means the humble and overlooked
🍽️ Eat and be satisfied pictures a shared feast
🤲 His rescue benefits the humble and poor
📖 One story widens to include many others

## ❤️ Your Heart Shall Live For Ever

This is not a promise about a physical heart continuing to beat.

"Heart" here means the whole inner life of a person, their spirit.

"For ever" points beyond an ordinary human lifespan toward something eternal.

This line stretches David's personal rescue into a promise for future generations.

❤️ Heart here means a person's whole inner life
♾️ For ever points beyond an ordinary lifespan
🌅 This stretches beyond David's own rescue
📖 One rescue becomes a promise for generations

# Psalms 22:27-31
# 🌍 Every Nation Will Worship
---
## 🌍 All The Ends Of The World Shall Remember And Turn Unto The LORD

The psalm now widens dramatically, from Israel to the entire world.

"Ends of the world" means every distant nation, not just God's covenant people.

"Remember and turn" describes a real change of direction, not a passing thought.

What began as one man's private cry ends by reaching every nation on earth.

🌍 The psalm widens from Israel to the world
🗺️ Ends of the world means every distant nation
🔄 Remember and turn means a real change
📖 One man's cry reaches every nation

## 🙇 All The Kindreds Of The Nations Shall Worship Before Thee

"Kindreds" means family groups or clans, an older word for peoples.

This repeats the previous line's idea using a different word for emphasis.

Worship here is pictured as something every nation eventually does, not just Israel.

The psalm keeps expanding its circle wider with almost every line now.

🙇 Kindreds means family groups or clans
🔁 This repeats the idea with a new word
🌐 Worship is pictured as reaching every nation
📖 The psalm's circle keeps expanding

## 👑 For The Kingdom Is The LORD's

This is a flat statement of fact, not a wish or a hope.

Every human kingdom, however powerful, ultimately belongs to God.

This truth stands whether or not any nation on earth admits it.

David's own suffering does not shrink this fact about who truly rules.

👑 The kingdom belonging to God is a fact
🏛️ Every human kingdom answers to Him
🗣️ This is true whether nations admit it
📖 Suffering does not shrink this truth

## 🏛️ He Is The Governor Among The Nations

"Governor" means a ruler who has real authority to direct and control.

This is not describing God as one influence among many equal ones.

He rules actively among every nation, not just Israel alone.

The whole earth answers to a single, real authority.

🏛️ Governor means a ruler with real authority
⚖️ God is not one influence among many
🌐 He rules actively among every nation
📖 The whole earth answers to one authority

## 🍞 All They That Be Fat Upon Earth Shall Eat And Worship

"Fat upon earth" was a common way of describing the wealthy and well fed.

Even the richest and most comfortable people will one day bow before God.

Their comfort now does not exempt them from worshiping later.

Wealth in this world never removes a person's need for God.

💰 Fat upon earth means the wealthy and comfortable
🙇 Even the richest will one day worship
🚫 Comfort now does not exempt anyone
📖 Wealth never removes the need for God

## ⚰️ All They That Go Down To The Dust Shall Bow Before Him

This describes the opposite end of life, those who are dying or already dead.

"Go down to the dust" is a common way of describing death in this culture.

Both the wealthy and the dying are named in these two lines together.

No one, rich or dying, escapes bowing before God in the end.

⚰️ Go down to the dust describes death
↔️ Both the wealthy and the dying are named
🙇 Everyone eventually bows before God
📖 No one escapes this truth in the end

## 🚫 None Can Keep Alive His Own Soul

No person, however powerful or wealthy, can extend their own life forever.

"Keep alive his own soul" means preserving oneself by one's own strength alone.

Every human being eventually depends on something outside themselves.

This line quietly humbles every reader, not only ancient kings.

🚫 No one can extend their own life forever
💪 Keep alive means self preservation alone
🙏 Everyone depends on something beyond themselves
📖 This truth humbles every reader, then and now

## 🌱 A Seed Shall Serve Him

"Seed" is a common Bible word for descendants, children not yet born.

This looks forward past David's own generation to those who will come later.

Serving God here is described as something that will continue into the future.

The story of faith is passed forward, not left to end with one person.

🌱 Seed means descendants not yet born
⏭️ This looks forward past David's own life
🔁 Service to God continues into the future
📖 Faith is passed forward, not left to end

## 📜 It Shall Be Accounted To The Lord For A Generation

"Accounted" means counted or credited, like an entry recorded on purpose.

This future generation's service will be recorded as belonging to the Lord.

The record is not lost or forgotten with the passing of time.

God keeps track of faithfulness across generations, not just within one lifetime.

📜 Accounted means counted or credited
📋 This service is recorded as belonging to God
⏳ The record survives the passing of time
📖 God tracks faithfulness across generations

## 🗣️ They Shall Come, And Shall Declare His Righteousness Unto A People That Shall Be Born

This describes a generation not even alive yet at the time David wrote.

"Declare his righteousness" means publicly announcing what God has done and who He is.

The psalm ends by looking far into the future, beyond anyone currently living.

Even people not yet born are included in the reach of this promise.

🗣️ This future generation is not alive yet
📣 Declare his righteousness means announcing God's character
🔭 The psalm looks far into the future
📖 Even the unborn are included in this promise

## ✅ That He Hath Done This

The psalm's very last line points back to everything God has already done.

After a psalm of deep suffering, it ends on simple, settled fact.

"This" refers to the whole story, the cry, the rescue, and the praise that followed.

The psalm that opened in abandonment closes in quiet, finished confidence.

✅ The last line points to God's finished work
🔚 A psalm of suffering ends on settled fact
📚 This refers to the whole story told here
📖 Abandonment gives way to finished confidence
`.trim();

export const PSALMS_TWENTY_TWO_PERSONAL_SECTIONS = parsePsalmsTwentyTwoRawNotes(PSALMS_TWENTY_TWO_RAW_NOTES);
