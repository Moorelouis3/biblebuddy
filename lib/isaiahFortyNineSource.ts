export type IsaiahFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyNineRawNotes(rawText: string): IsaiahFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+49:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 49 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+49:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+49:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 49 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 49,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 49:${startVerse}` : `Isaiah 49:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Isaiah 49 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_NINE_RAW_NOTES = `# Isaiah 49:1-3
# 🌊 Called Before Birth To Speak
---
## 🌊 Listen, O Isles, Unto Me

Isles means distant coastlands and nations far across the sea.

The speaker is calling out to the whole world, not only Israel.

This chapter widens the story far beyond one nation.

Everyone listening, near or far, is meant to hear this voice.

🌊 Isles means distant coastlands and nations
🌍 The call reaches far beyond Israel alone
👂 Everyone near or far is meant to listen
📖 This chapter opens with a global audience

## 👶 The LORD Hath Called Me From The Womb

This voice says God set apart its mission before it was even born.

Other prophets like Jeremiah describe being called before birth this way too.

A calling this early means the mission was never an accident.

It was planned before the very first breath was drawn.

👶 Called before birth means chosen ahead of time
📜 Jeremiah describes the same kind of early calling
🎯 This mission was never an accident
📖 God planned it before the first breath

## ⚔️ My Mouth Like A Sharp Sword

A sword pictures a weapon that cuts cleanly and does real damage.

Comparing the mouth to a sword pictures words with real cutting power.

This is about truth, not literal violence.

God's message through this servant will cut through denial and excuse.

⚔️ A sword cuts cleanly and does damage
🗣️ The mouth pictures the power of spoken words
💬 This is about truth, not literal violence
📖 This message will cut through denial

## 🌑 In The Shadow Of His Hand Hath He Hid Me

A shadow here pictures shelter and protection from harm.

God is pictured as covering this servant with his own hand.

The hiding is not punishment, it is safekeeping until the right time.

Something valuable is kept out of sight until it is ready to be used.

🌑 A shadow pictures shelter and protection
✋ God covers the servant with his own hand
⏳ The hiding is safekeeping, not punishment
📖 Something valuable waits until it is ready

## 🏹 Made Me A Polished Shaft, In His Quiver Hath He Hid Me

A shaft here means an arrow, and polished means it was carefully prepared.

A quiver was the case an archer used to carry and protect arrows.

The picture shifts from a sword in the mouth to an arrow ready for use.

God is preparing this servant like a weapon kept ready until the exact moment.

🏹 A shaft is an arrow, polished means prepared
🎯 A quiver protected arrows until needed
🔄 The picture shifts from sword to arrow
📖 God prepares this servant for the right moment

## 🏷️ Thou Art My Servant, O Israel

This does not mean the whole nation of Israel is speaking these words.

The servant is being named Israel, standing in for the nation itself.

One person can represent an entire people in the language of the prophets.

This same servant will later work to restore Israel himself.

🏷️ Israel here names a person, not a nation
👤 One person can represent an entire people
🔁 This servant later works to restore Israel
📖 The servant and the nation stay connected

# Isaiah 49:4-6
# 😔 A Light To The Gentiles
---
## 😔 I Have Laboured In Vain

Laboured means worked hard, and vain means it felt like it produced nothing.

This voice openly admits discouragement over what looked like a failed effort.

Real faith in the Bible does not hide moments of doubt or fatigue.

Even a called and chosen servant can feel like the work is not working.

😔 Laboured in vain means the work felt wasted
🗣️ This voice admits real discouragement
💭 Doubt and fatigue appear honestly in scripture
📖 Even a chosen servant can feel this way

## ⚖️ Yet Surely My Judgment Is With The LORD

Judgment here means the final verdict on whether the work actually mattered.

The servant chooses to trust God's evaluation over his own discouraged feelings.

Success is not always visible in the moment it happens.

The true measure of this work belongs to God, not to how it feels.

⚖️ Judgment means the final verdict on the work
🙏 The servant trusts God over his own feelings
👁️ Success is not always visible right away
📖 God alone measures whether the work mattered

## 👶 Formed Me From The Womb To Be His Servant

This repeats the same before birth calling from earlier in the chapter.

Here the purpose is named clearly, to bring Jacob back to God.

Jacob again stands for the whole nation of Israel.

The servant's assignment was to restore a scattered and struggling people.

👶 This repeats the servant's calling before birth
🎯 The purpose named here is bringing Jacob back
👪 Jacob again means the whole nation
📖 The assignment was restoring a scattered people

## 🤔 Though Israel Be Not Gathered

This admits the mission to gather Israel might not fully succeed.

Even so, the servant is told he will still be glorious in God's eyes.

His worth was never tied only to whether Israel responded.

God separates the value of faithful work from whether it appears to succeed.

🤔 The mission to gather Israel might not succeed
✨ The servant is still called glorious
💛 His worth was never tied to results
📖 God separates faithfulness from visible success

## ⚖️ It Is A Light Thing That Thou Shouldest Be My Servant

A light thing here means a task too small on its own.

Restoring just the tribes of Jacob was already a real assignment.

God says an even bigger calling is coming next.

What sounded like the whole mission was actually only the first part.

⚖️ A light thing means a task too small
🌿 Restoring Jacob's tribes was already a real job
📈 An even bigger calling was coming
📖 The first part was not the whole mission

## 🌍 A Light To The Gentiles

Gentiles means every nation and people outside of Israel.

A light pictures something that reveals truth in the darkness.

The servant's mission suddenly expands from one nation to the whole world.

This same phrase gets quoted later in the New Testament about Jesus.

🌍 Gentiles means every nation outside Israel
💡 A light reveals truth in darkness
📈 The mission expands to the whole world
📖 The New Testament quotes this phrase about Jesus

## 🌐 My Salvation Unto The End Of The Earth

End of the earth is an old way of saying every distant place on the globe.

This is not a mission with a border or a limit.

The reach of this salvation is described as total and complete.

Nothing in the chapter so far has been this wide in scope.

🌐 End of the earth means everywhere on earth
🚫 This mission has no border or limit
🎯 The reach is described as total
📖 Nothing so far has been this wide

# Isaiah 49:7-9
# 👑 Despised Now, Worshipped Later
---
## 💔 To Him Whom Man Despiseth, To Him Whom The Nation Abhorreth

Despiseth and abhorreth both describe deep contempt and rejection.

This servant is described as hated and looked down on by his own people.

The one carrying God's mission is not being welcomed as a hero.

Rejection is named honestly here before the reversal that follows.

💔 Despiseth and abhorreth both mean deep contempt
👤 The servant is rejected by his own people
🚫 He is not welcomed as a hero
📖 Rejection is named before the reversal

## ⛓️ A Servant Of Rulers

This phrase pictures someone with no power, under the authority of others.

The servant starts out low, controlled rather than in control.

The contrast with what comes next is deliberate and sharp.

Someone this low will soon be honored by the highest rulers on earth.

⛓️ A servant of rulers has no power
📉 The servant starts out controlled, not controlling
🔀 The contrast ahead is deliberate
📖 The lowest will soon be honored highest

## 🧍 Kings Shall See And Arise, Princes Also Shall Worship

Rising to your feet in this culture showed honor toward someone greater.

Kings standing up for this servant reverses everything just described about him.

The despised one becomes someone even rulers rise to respect.

This complete reversal only happens because of God, not the servant's own status.

🧍 Rising showed honor toward someone greater
🔄 This completely reverses the earlier rejection
👑 Kings rise to respect the despised one
📖 The reversal comes from God, not status

## ⏰ In An Acceptable Time Have I Heard Thee

Acceptable time means a moment specifically chosen and favorable for God's purpose.

God is describing his own perfect timing, not a random or convenient point.

A day of salvation names that same well timed moment a second way.

Nothing here happens early or late, it happens exactly on time.

⏰ Acceptable time means a chosen, favorable moment
🎯 This is God's timing, not a random one
🔁 A day of salvation repeats the same idea
📖 Nothing here happens early or late

## 🤝 A Covenant Of The People

A covenant is a binding agreement backed by a promise.

Calling the servant himself a covenant is unusual and striking language.

The servant does not just deliver the agreement, he becomes it in person.

God's promise to the people is now attached to a living person.

🤝 A covenant is a binding agreement
👤 Calling a person a covenant is striking
🔗 The servant becomes the agreement in person
📖 God's promise is now tied to a person

## ⛓️ Say To The Prisoners, Go Forth

This pictures captives being told their captivity has finally ended.

Those in darkness are told to show themselves, to come back into the light.

Both pictures describe freedom after a long and hidden confinement.

This freedom is announced by the same servant introduced earlier in the chapter.

⛓️ Prisoners are told their captivity has ended
💡 Show yourselves means come back into the light
🕊️ Both pictures describe freedom after confinement
📖 This freedom is announced by the servant

# Isaiah 49:10-13
# 🏞️ Led Home By Springs Of Water
---
## 🍞 They Shall Not Hunger Nor Thirst

This promises relief from two of the harshest hardships of ancient travel.

A journey home across open country could easily mean going without food or water.

God promises this return will not carry that same danger.

Provision, not just permission to return, is part of the promise.

🍞 Hunger and thirst were real travel dangers
🛤️ A return journey could easily lack food
🛡️ God promises this trip will be different
📖 Provision is part of this promise too

## 🔥 Neither Shall The Heat Nor Sun Smite Them

Smite here means strike down or harm severely.

Sun exposure on a long journey through this region could be dangerous and exhausting.

God promises protection from the weather itself, not only from enemies.

Every kind of danger on this road is covered by the promise.

🔥 Smite means strike down or harm severely
☀️ Sun exposure was a real travel danger
🛡️ God protects from weather, not just enemies
📖 Every danger on this road is covered

## 💛 He That Hath Mercy On Them Shall Lead Them

Mercy here means kindness shown to people who could not save themselves.

The one leading this journey is defined first by mercy, not by power.

A shepherd led with patience, not force, matched this same picture closely.

The journey home is guided by compassion at every single step.

💛 Mercy means kindness to those who cannot help
🧑‍🌾 The leader is defined by mercy first
🐑 This matches the picture of a shepherd
📖 Compassion guides every step of the journey

## 💧 By The Springs Of Water Shall He Guide Them

Springs of water meant a reliable source in an often dry landscape.

Finding water on a long journey could mean the difference between survival and death.

God is pictured personally guiding people to exactly what they need.

This is not a vague promise, it names a specific and vital provision.

💧 Springs were a reliable water source
🏜️ Water could mean survival on a journey
🧭 God personally guides them to what they need
📖 This is a specific, vital provision

## ⛰️ I Will Make All My Mountains A Way

Mountains normally blocked travel and forced long, difficult detours.

Calling them a way pictures God turning an obstacle into a road.

Highways exalted pictures raised, smoothed paths easy to travel on.

Every physical barrier standing between the people and home gets removed.

⛰️ Mountains normally blocked travel
🛣️ God turns the obstacle into a road
📈 Highways exalted means raised, smoothed paths
📖 Every barrier to home gets removed

## 🧭 From The North And From The West, And From The Land Of Sinim

This lists people returning from every direction, not just one route.

Sinim is a distant land, likely describing a region far to the east or south.

Naming distant, unfamiliar places pictures a return larger than anyone expected.

This return gathers people from the far corners of the earth.

🧭 People return from every direction, not one
🗺️ Sinim names a distant, unfamiliar region
🌍 This return is larger than expected
📖 People are gathered from earth's far corners

## 🎶 Sing, O Heavens, And Be Joyful, O Earth

Sky, earth, and mountains are all called to celebrate together here.

Nature bursting into song is a common way the prophets describe a huge moment.

The reason given is that the LORD has comforted his people.

Comfort here is not a small feeling, it is God actively acting on their behalf.

🎶 Sky, earth, and mountains all celebrate here
📜 Nature singing is common in the prophets
🤗 The reason is God comforting his people
📖 Comfort here means God acting on their behalf

# Isaiah 49:14-16
# 🤱 A Mother Could Forget, But Not God
---
## 🏙️ But Zion Said, The LORD Hath Forsaken Me

Zion here is another name for Jerusalem, standing in for the whole people.

This is a raw complaint, not a calm theological statement.

Forsaken means abandoned completely, left with no help at all.

The chapter allows the people's real pain to be spoken out loud before it answers them.

🏙️ Zion is another name for Jerusalem's people
😢 This is a raw, honest complaint
🚫 Forsaken means abandoned with no help
📖 Real pain is spoken before it is answered

## 🍼 Can A Woman Forget Her Sucking Child

A sucking child means a nursing infant who is completely dependent on its mother.

This bond was considered one of the strongest and most natural in that world.

God uses the strongest human bond available to answer Zion's complaint.

The question expects a shocked no as its only honest answer.

🍼 A sucking child means a nursing infant
❤️ This bond was seen as unbreakable
🤱 God compares himself to this strongest bond
📖 The question expects a shocked no

## 🤔 Yea, They May Forget, Yet Will I Not Forget Thee

God admits that even this strongest human bond could theoretically fail.

Even so, his own commitment is placed above that possibility entirely.

The comparison is not close, it is total and one sided.

God's memory of his people is more reliable than the most natural love on earth.

🤔 Even the strongest human bond could fail
🙌 God places his commitment above that
⚖️ The comparison is total, not close
📖 God's memory outlasts even natural love

## 🖐️ I Have Graven Thee Upon The Palms Of My Hands

Graven means carved or engraved permanently into a hard surface.

This pictures a mark that cannot be washed off or forgotten by accident.

Hands were used constantly, so a mark there stayed always in view.

God pictures himself remembering his people every time he looks at his own hands.

🖐️ Graven means carved in permanently
🚿 This mark cannot be washed away
👀 Hands stayed constantly in view
📖 God remembers his people every time he looks

## 🧱 Thy Walls Are Continually Before Me

Walls here likely refers to the city walls of Jerusalem, still in ruins at this point.

Continually before me means constantly in view, never forgotten or set aside.

Even the ruined, broken state of the city has not escaped God's attention.

What looked abandoned to the people was never actually out of God's sight.

🧱 Walls likely means Jerusalem's ruined walls
👁️ Continually before me means never forgotten
🏚️ Even the ruins stayed in view
📖 Nothing was ever out of God's sight

# Isaiah 49:17-19
# 👰 Clothed Like A Bride Again
---
## 🏃 Thy Children Shall Make Haste

Make haste means to hurry, to move quickly without delay.

This pictures scattered children of Zion rushing back home at last.

The word choice contrasts sharply with the slow, weary tone of the exile years.

Return, when it finally comes, is described as fast and joyful, not dragging.

🏃 Make haste means to hurry quickly
👪 Scattered children rush home at last
⏱️ This contrasts with the slow exile years
📖 Return is described as fast and joyful

## 🏚️ Thy Destroyers Shall Go Forth Of Thee

This pictures the very people who ruined the city finally leaving it.

The destroyers had lived among the ruins they themselves had caused.

Their departure clears the way for restoration to actually begin.

The city could not be rebuilt while the ones who wrecked it still remained.

🏚️ This pictures the destroyers finally leaving
🧍 They had lived among the ruins they caused
🚪 Their departure clears the way for rebuilding
📖 The city could not heal while they remained

## 💍 Thou Shalt Clothe Thee With Them All, As With An Ornament

An ornament here means jewelry, something worn to show honor and beauty.

The returning children are pictured as jewelry Zion proudly wears.

This is a picture of pride and delight, not just numbers coming home.

What was once empty and ashamed is now dressed in something beautiful.

💍 An ornament means jewelry worn for beauty
👪 Returning children are pictured as jewelry
😊 This pictures pride and delight, not just numbers
📖 What was empty is now dressed in beauty

## 👰 And Bind Them On Thee, As A Bride Doeth

Brides in this culture wore visible jewelry and ornaments on their wedding day.

Comparing Zion to a bride pictures a fresh start filled with joy and hope.

The city that felt forsaken is now pictured dressed for a celebration.

This image of a bride reappears often later in scripture to describe God's people.

👰 Brides wore visible jewelry on their wedding day
✨ Zion is pictured as a joyful bride
🎉 The forsaken city is now dressed for celebration
📖 This bride image reappears often later in scripture

## 📏 Too Narrow By Reason Of The Inhabitants

Narrow here means the space will not be big enough for everyone returning.

This pictures a population so large the ruined city cannot contain it.

It directly answers Zion's earlier fear of being left empty and alone.

An overcrowded, thriving city is the exact opposite of the desolation described before.

📏 Narrow means not big enough for everyone
👥 The returning population will be huge
😢 This answers Zion's earlier fear of emptiness
📖 A crowded city is the opposite of desolation

# Isaiah 49:20-21
# ❓ Who Hath Begotten Me These?
---
## 👶 The Children Which Thou Shalt Have, After Thou Hast Lost The Other

This names a second, later generation different from the children first lost in exile.

Zion is pictured gaining new life after a real and painful loss.

Loss in this chapter is never hidden or minimized before the promise of restoration.

God speaks to real grief before describing what comes after it.

👶 This names a new, later generation
💔 Zion gains new life after real loss
🚫 Loss is never hidden in this chapter
📖 God speaks to grief before restoration

## 📏 The Place Is Too Strait For Me

Strait here is an old word meaning narrow or cramped, not related to honesty.

This pictures a returning population that no longer fits in the available space.

It repeats the same overcrowding picture just described in the verse before.

The city that once felt abandoned now cannot hold everyone coming home.

📏 Strait is an old word for narrow
🏙️ The returning population no longer fits
🔁 This repeats the overcrowding picture just given
📖 The abandoned city cannot hold everyone now

## 👶 Who Hath Begotten Me These, Seeing I Have Lost My Children

Begotten means given birth to or brought into being.

Zion is pictured as stunned, unable to explain where all these people came from.

Desolate and a captive describe her earlier condition of loss and exile.

Her amazement highlights just how unexpected and undeserved this restoration really is.

👶 Begotten means given birth to
😲 Zion is stunned by this sudden growth
⛓️ Desolate and captive describe her earlier condition
📖 This restoration is unexpected and undeserved

## 🔁 Behold, I Was Left Alone, These, Where Had They Been?

This repeats Zion's disbelief a second time for emphasis.

She remembers being left completely alone with nothing and no one.

The sudden crowd of returning children feels almost impossible to explain.

The chapter lets her confusion stand as proof of how great this reversal truly is.

🔁 This repeats her disbelief a second time
😔 She remembers being left completely alone
🤯 The sudden crowd feels impossible to explain
📖 Her confusion proves how great this reversal is

# Isaiah 49:22-23
# 👑 Kings Become Nursing Fathers
---
## ✋ I Will Lift Up Mine Hand To The Gentiles

Lifting a hand here pictures giving a signal or a command.

This answers the question from the last section, explaining how the children return.

The Gentiles, once outside the story, now actively help bring Zion's children home.

The nations who once scattered Israel are now the ones helping gather her back.

✋ Lifting a hand pictures giving a signal
❓ This explains how the children actually return
🌍 The Gentiles now help gather Zion's children
📖 The nations become part of the solution

## 🚩 Set Up My Standard To The People

A standard was a banner or flag used to rally an army or a crowd.

Raising a standard called people together toward a single clear purpose.

Here it rallies the nations toward helping restore God's people.

What once symbolized conquest or war is used here for a rescue.

🚩 A standard was a banner for rallying people
📢 It called people toward one clear purpose
🤝 Here it rallies nations toward rescue
📖 A symbol of war becomes one of rescue

## 👨‍👧 Kings Shall Be Thy Nursing Fathers

A nursing father pictures a caretaker who provides and protects like a parent.

This reverses the earlier picture of Zion's children being carried by strangers.

Rulers who once ignored or opposed Israel now serve and protect her.

The most powerful people on earth are pictured caring for God's people personally.

👨‍👧 A nursing father pictures a caring provider
🔄 This reverses the earlier picture of strangers
👑 Former rulers now serve and protect Israel
📖 The powerful now care for God's people

## 🙇 They Shall Bow Down To Thee With Their Face Toward The Earth

Bowing with the face to the ground was the deepest form of honor in this culture.

Licking the dust of someone's feet pictures total, humbled submission.

This was language usually reserved for approaching a king or a god.

Nations that once despised Zion now show her this highest possible honor.

🙇 Face to the ground was the deepest honor
👣 Licking dust pictures total humbled submission
👑 This language usually described approaching a king
📖 Nations now give Zion the highest honor

# Isaiah 49:24-26
# ⚔️ God Fights For His People
---
## 🦁 Shall The Prey Be Taken From The Mighty?

Prey here means captives or plunder taken and held by a stronger power.

This question voices real doubt about whether rescue from a powerful enemy is even possible.

Ancient readers knew that a mighty captor rarely released what it had taken.

The question sets up an answer that seems humanly impossible.

🦁 Prey means captives held by a stronger power
❓ This voices real doubt about rescue
⛓️ A mighty captor rarely released its captives
📖 The question sets up an impossible answer

## ✅ Even The Captives Of The Mighty Shall Be Taken Away

God answers his own impossible sounding question directly here.

What looked impossible for people is described here as certain for God.

The terrible describes an enemy known for cruelty, not just strength.

God promises to overturn even the strongest and most feared captor there is.

✅ God answers the impossible question directly
💪 What is impossible for people is certain here
😨 The terrible names a cruel, feared enemy
📖 God overturns even the strongest captor

## ⚔️ I Will Contend With Him That Contendeth With Thee

Contend means to fight or argue a case on someone's behalf.

God personally takes on Israel's enemies as his own opponents.

This is not a promise of help from a distance.

God places himself directly between his people and whatever threatens them.

⚔️ Contend means to fight on someone's behalf
🛡️ God takes on Israel's enemies personally
🚫 This is not help from a distance
📖 God stands directly between his people and harm

## 🍷 I Will Feed Them That Oppress Thee With Their Own Flesh

This is vivid, poetic language describing an enemy's total and violent defeat.

Ancient readers used extreme images like this to describe a decisive military collapse.

Drunken with their own blood repeats the same violent picture a second way.

The oppressors, not Israel, are the ones who ultimately fall.

🍷 This pictures an enemy's total defeat
📜 Ancient writers used extreme images for collapse
🔁 Drunken with blood repeats the same picture
📖 The oppressors are the ones who fall

## 🌍 All Flesh Shall Know That I The LORD Am Thy Saviour

All flesh means every person, not just Israel or its enemies.

This rescue is described as public, something the whole world will witness and recognize.

Saviour and Redeemer both describe God personally acting to rescue his people.

The point of this rescue is not hidden, it is meant to be seen by everyone.

🌍 All flesh means every person, not just Israel
👀 This rescue will be witnessed by the world
🛟 Saviour and Redeemer both describe personal rescue
📖 This rescue is meant to be seen

## 💪 The Mighty One Of Jacob

This closing title ties God's power directly to his ancient promise to Jacob.

Mighty One emphasizes strength strong enough to defeat any enemy named in this chapter.

The chapter that opened with a servant's quiet calling ends with God's raw power on display.

Every promise made along the way is backed by exactly this kind of strength.

👪 This title ties God's power to Jacob's promise
💪 Mighty One means strength to defeat any enemy
🔚 The chapter ends with power on display
📖 Every promise is backed by this strength`.trim();

export const ISAIAH_FORTY_NINE_PERSONAL_SECTIONS = parseIsaiahFortyNineRawNotes(ISAIAH_FORTY_NINE_RAW_NOTES);
