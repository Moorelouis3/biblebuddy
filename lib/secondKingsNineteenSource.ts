export type SecondKingsNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsNineteenRawNotes(rawText: string): SecondKingsNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsNineteen\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsNineteen\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsNineteen\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 19:${startVerse}` : `2 Kings 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Kings 19 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_NINETEEN_RAW_NOTES = `# SecondKingsNineteen 19:1-4
# 😢 Hezekiah Tears His Clothes And Turns To Isaiah
---
## 😢 He Rent His Clothes, And Covered Himself With Sackcloth

"Rent" means torn, a common way to show grief in ancient Israel.

Sackcloth was a rough, uncomfortable fabric worn during mourning or crisis.

The officials already tore their own clothes at the end of the last chapter.

Now the king does the exact same thing himself.

This was not a show for the public.

Hezekiah's fear in this moment was completely real.

😢 Rent means torn cloth

🧥 Sackcloth showed public mourning

🔁 The officials already did this

➡️ Hezekiah's fear was completely real

## 🏛️ Went Into The House Of The LORD

Hezekiah does not go find soldiers or make a speech.

His first move is to go straight to the temple.

That decision reveals where he actually believed the real power was.

Prayer, not weapons, becomes Judah's first line of defense.

🏛️ He goes to the temple first

🙏 Prayer comes before any plan

💪 Judah's real defense was not military

📖 Crisis reveals what a person truly trusts

## 📜 Shebna The Scribe, And The Elders Of The Priests

Eliakim and Shebna already appeared standing against Rabshakeh in the last chapter.

This time Hezekiah adds something new to the group.

He also sends the elders of the priests, the senior religious leadership of Judah.

Political leaders alone were not enough for this moment.

Hezekiah brings the nation's spiritual leadership into the crisis too.

📜 Same officials as the last chapter

🙏 Elders of the priests now join

⚖️ Political leaders alone were not enough

➡️ Hezekiah brings in spiritual leadership too

## 📛 Isaiah The Prophet The Son Of Amoz

Isaiah's father, Amoz, is not the same person as King Amon of Judah.

The two names look alike in English but come from different Hebrew roots.

Isaiah has already been prophesying in Jerusalem for years by this point.

Hezekiah turns to the one prophet with a direct line to God.

📛 Amoz is not King Amon

🈯 The names only look alike

🗣️ Isaiah already had a long track record

➡️ Hezekiah turns to God's own prophet

## 😣 A Day Of Trouble, And Of Rebuke, And Blasphemy

Hezekiah names three different kinds of pain in a single sentence.

Trouble means the military danger surrounding the city right now.

Rebuke means the shame of a king openly mocked by an enemy.

Blasphemy means the insult was aimed at God, not just at Judah.

One crisis is actually carrying three separate wounds at once.

😣 Trouble means military danger

😳 Rebuke means public shame

🙏 Blasphemy means an insult to God

➡️ One day, three different wounds

## 🤰 The Children Are Come To The Birth, And There Is Not Strength To Bring Forth

This is a picture borrowed from childbirth, not a literal birth.

Labor has reached the final, most dangerous stage with no way to stop it.

But the mother has no strength left to actually deliver the child.

Hezekiah is describing Judah's exact situation with that same image.

The danger has fully arrived, and Judah has no power left to survive it alone.

🤰 A childbirth image, not literal birth

⏳ Labor has reached its final stage

😔 No strength is left to finish

➡️ Judah cannot survive this alone

## 🙏 It May Be The LORD Thy God Will Hear

Hezekiah does not command God or assume an answer is guaranteed.

"It may be" is honest, humble language, not weak faith.

He is asking, not demanding, even in the middle of real danger.

That kind of humility marks Hezekiah apart from prouder kings before him.

🙏 Hezekiah does not demand an answer

🙇 It may be shows real humility

❓ He asks instead of assumes

➡️ Humility marks this king apart

## 🌱 Lift Up Thy Prayer For The Remnant That Are Left

Remnant means the small part of a nation still remaining after loss.

Much of Judah's countryside has already fallen to Assyria's army by this point.

Hezekiah is not asking Isaiah to pray for the whole nation anymore.

He is asking for whatever is left to be spared.

🌱 Remnant means what still remains

🏙️ Much of Judah has already fallen

🙏 The prayer is for what is left

📖 Even a remnant was worth saving

# SecondKingsNineteen 19:5-7
# 🌬️ Be Not Afraid Of The Words
---
## 🗣️ Thus Shall Ye Say To Your Master

"Your master" refers to Hezekiah, the king who sent these servants.

Isaiah is not giving a private opinion of his own.

He is delivering an official response, on God's own authority.

The prophet's words carry the weight of a royal reply.

🗣️ Your master means Hezekiah

👤 Isaiah is not speaking for himself

📜 This is an official reply

📖 The prophet speaks with God's authority

## 🌬️ Be Not Afraid Of The Words Which Thou Hast Heard

God's very first word to Hezekiah in this crisis is do not be afraid.

Rabshakeh's whole speech in the last chapter was built to spread fear.

God directly answers the exact tactic the enemy just used.

Fear was always the real target of that entire speech.

🌬️ Do not be afraid comes first

🎯 Rabshakeh's speech aimed at fear

🗣️ God answers that exact tactic

➡️ Fear was the true target all along

## 🙏 With Which The Servants Of The King Of Assyria Have Blasphemed Me

Rabshakeh's insults were aimed at Hezekiah, but God claims them as His own.

Blasphemed means to speak with open contempt toward God.

Mocking Judah's trust in the LORD was really mocking the LORD Himself.

God takes the enemy's words personally, not just politically.

🙏 Blasphemed means open contempt for God

🎯 The insults were really aimed at God

👑 Not just a political attack

➡️ God takes the mockery personally

## 💨 I Will Send A Blast Upon Him, And He Shall Hear A Rumour

A blast here means a sudden, forceful action God will take against the king of Assyria.

A rumour means a report or piece of news that reaches him unexpectedly.

God does not reveal yet what that news will be.

The next verses in this chapter slowly answer that exact question.

💨 A blast means sudden forceful action

📰 A rumour means unexpected news

❓ The details are not given yet

➡️ The chapter itself answers this question

## ⚔️ I Will Cause Him To Fall By The Sword In His Own Land

God promises the king of Assyria will not die in battle at Jerusalem.

He will return home first, and die there instead.

This exact promise is fulfilled at the very end of this chapter.

The ending of the story is announced before the story even happens.

⚔️ He will not die at Jerusalem

🏠 He dies at home instead

🔁 This is fulfilled later in the chapter

📖 The ending is announced in advance

# SecondKingsNineteen 19:8-13
# ✉️ Sennacherib Sends A Letter
---
## 🗺️ Rabshakeh Returned, And Found The King Of Assyria Warring Against Libnah

Rabshakeh had been camped outside Jerusalem delivering threats in the last chapter.

He now leaves to rejoin Sennacherib, the actual king of Assyria.

Libnah was another walled city in Judah, close to Lachish.

Sennacherib had already moved his main army on to a new target.

🗺️ Rabshakeh rejoins Sennacherib

🏙️ Libnah is another city in Judah

📍 It sits close to Lachish

➡️ The main army had already moved on

## 🏯 He Had Heard That He Was Departed From Lachish

Lachish was one of Judah's most heavily fortified cities.

Assyrian records outside the Bible describe a major siege of Lachish in detail.

That siege had apparently already ended by the time of this verse.

Sennacherib's army kept moving through Judah, city by city.

🏯 Lachish was a major fortified city

📜 Assyrian records describe its siege

✅ The siege had already ended

➡️ Assyria kept moving city by city

## 🌍 Tirhakah King Of Ethiopia

Tirhakah ruled over Cush, a powerful kingdom south of Egypt.

Egypt and Cush were closely linked as allies at this point in history.

Rabshakeh had already mocked Judah's trust in Egypt back in chapter eighteen.

Now that very alliance becomes the real threat forcing Assyria's hand.

🌍 Tirhakah ruled Cush, south of Egypt

🤝 Egypt and Cush were allied

😏 Rabshakeh had mocked this alliance already

➡️ That alliance now threatens Assyria for real

## ✉️ He Sent Messengers Again Unto Hezekiah

Sennacherib is now distracted by a real army approaching from the south.

He does not have time to wait outside Jerusalem any longer.

Instead of another public speech, this time he sends a written letter.

Pressure from Egypt and Cush forces him to change his approach.

✉️ A letter replaces the public speech

⏳ Sennacherib is now short on time

🌍 Egypt and Cush press him from the south

➡️ Pressure forces a change in tactics

## 🚫 Let Not Thy God In Whom Thou Trustest Deceive Thee

This is the same tactic Rabshakeh already used back in chapter eighteen.

Sennacherib tries once more to plant doubt about God's reliability.

Repeating the same threat suggests it did not work the first time.

The people's silence in chapter eighteen had already defeated this approach once.

🚫 The same old tactic returns

🎯 It targets trust in God again

🔁 Repeating it suggests it failed before

📖 Silence had already beaten this once

## ❓ By Destroying Them Utterly: And Shalt Thou Be Delivered?

Sennacherib points to his own track record as proof of what is coming.

He argues that no nation has ever survived an Assyrian invasion.

The logic sounds strong only if history always has to repeat itself.

This letter is betting that Judah will believe the pattern cannot break.

❓ Sennacherib points to his track record

🌍 No nation has survived him yet

🔁 His logic assumes history must repeat

➡️ The letter bets the pattern holds

## 🗿 Have The Gods Of The Nations Delivered Them

Sennacherib treats the LORD as just one more national god among many.

Gozan, Haran, and Rezeph were real regions Assyria had already conquered.

The children of Eden in Thelasar were another people group Assyria destroyed.

Every name on this list is meant to build the same argument again.

🗿 The LORD is treated as one more god

🗺️ Gozan, Haran, and Rezeph were real places

👥 Eden in Thelasar names another people

➡️ Every name repeats the same argument

## 🏙️ The King Of Hamath, And The King Of Arpad

These are the exact same cities Rabshakeh already named out loud in chapter eighteen.

The list continues with Sepharvaim, Hena, and Ivah in the same verse.

Sennacherib is not offering new evidence, only repeating his own servant's speech in writing.

Even a king's own signature cannot make a false argument true.

🏙️ These cities were already named once

📝 Sepharvaim, Hena, and Ivah follow them

✍️ The letter repeats Rabshakeh's own speech

📖 A signature cannot make a lie true

# SecondKingsNineteen 19:14-19
# 🙏 Hezekiah Spreads The Letter Before The LORD
---
## 📨 Hezekiah Received The Letter Of The Hand Of The Messengers, And Read It

Hezekiah does not dismiss the letter or ignore its threat.

He takes it seriously enough to read every word of it himself.

Facing the danger honestly comes before Hezekiah brings it to God.

Denial was never part of his response to this crisis.

📨 Hezekiah reads the letter himself

😨 He takes the threat seriously

🙏 Honesty comes before prayer here

➡️ Denial plays no part in his response

## 🏛️ Went Up Into The House Of The LORD, And Spread It Before The LORD

Hezekiah physically unrolls the letter and lays it open in the temple.

This was an act of prayer, not just paperwork.

He is asking God to read the very same threat he just read.

Handing the letter to God directly puts the crisis in the right hands.

🏛️ He lays the letter open in the temple

📜 This act itself was a prayer

🙏 God is asked to read it too

➡️ The crisis is placed in God's hands

## 👼 O LORD God Of Israel, Which Dwellest Between The Cherubims

Cherubim were winged heavenly figures, carved in gold above the ark of the covenant.

That space between them symbolized God's own throne room on earth.

Hezekiah is not praying to a distant, unknown god.

He is addressing the God whose presence rested inside that very temple.

👼 Cherubim were golden winged figures

👑 That space symbolized God's throne

🏛️ God's presence rested in the temple

➡️ Hezekiah prays to a God who is near

## 🌍 Thou Art The God, Even Thou Alone, Of All The Kingdoms Of The Earth

Sennacherib's whole argument assumed every nation has its own separate god.

Hezekiah's prayer directly rejects that entire assumption.

He confesses that one God rules over Assyria, Judah, and every other kingdom.

Sennacherib's letter and Hezekiah's prayer are actually about the exact same question.

🌍 Sennacherib assumed many separate gods

☝️ Hezekiah confesses only one true God

👑 That God rules every kingdom, not just Judah

📖 The letter and prayer share one question

## ✨ Thou Hast Made Heaven And Earth

Hezekiah grounds his prayer in creation before he asks for anything.

A God who made everything has real authority over an invading army too.

This line answers Sennacherib's boasting before Hezekiah even mentions him by name.

The prayer starts with who God is, not with what Hezekiah wants.

✨ Creation is named before any request

👑 A creator has authority over armies

🗣️ This answers Sennacherib in advance

➡️ Who God is comes before what is asked

## 👂 Bow Down Thine Ear, And Hear: Open, LORD, Thine Eyes, And See

This language pictures God leaning close, like a person paying full attention.

God does not literally have ears or eyes like a human body.

Hezekiah uses this picture because it is exactly how urgent this prayer feels.

He wants God's full attention on Sennacherib's actual written words.

👂 The picture is God leaning close

🙌 God does not literally have ears

😨 The urgency shapes the language

➡️ Hezekiah wants full attention on the letter

## 🪵 They Were No Gods, But The Work Of Men's Hands, Wood And Stone

Hezekiah explains exactly why those other nations' gods could not save them.

Idols were only carved wood and stone, shaped by human hands.

They had no real power because they were never alive in the first place.

Hezekiah's own God cannot be compared to something a craftsman built.

🪵 Idols were only wood and stone

🔨 Human hands shaped them

💀 They were never alive at all

📖 God cannot be compared to a carving

## 🌍 That All The Kingdoms Of The Earth May Know That Thou Art The LORD God, Even Thou Only

Hezekiah's final request is not simply save my city.

He asks God to act so every nation on earth will know the truth.

His own survival becomes secondary to God's reputation among the nations.

That kind of prayer looks far past Hezekiah's own immediate danger.

🌍 He does not just pray save my city

👑 He prays for God's reputation instead

❤️ His own survival becomes secondary

➡️ The prayer looks past his own danger

# SecondKingsNineteen 19:20-25
# 🎭 Isaiah's Taunt Against Sennacherib
---
## 👂 That Which Thou Hast Prayed To Me Against Sennacherib King Of Assyria I Have Heard

God answers Hezekiah's prayer almost immediately through Isaiah.

There is no long, silent wait between the prayer and the response.

This confirms the prayer from the last section actually reached God.

The rest of this section is God's own direct reply.

👂 The answer comes almost immediately

⏳ There is no long silent wait

✅ The prayer really did reach God

➡️ Everything after this is God's own reply

## 👑 The Virgin The Daughter Of Zion Hath Despised Thee

The daughter of Zion is a poetic name for the city of Jerusalem.

Calling her a virgin pictures the city as untouched, never actually conquered.

Sennacherib expected fear from Jerusalem, and instead God gives her contempt.

The city that was supposed to be terrified is pictured mocking him instead.

👑 Daughter of Zion means Jerusalem

🕊️ Virgin pictures the city as untouched

😏 Jerusalem responds with contempt, not fear

➡️ The expected fear gets reversed completely

## 😏 The Daughter Of Jerusalem Hath Shaken Her Head At Thee

Shaking the head was a common ancient gesture of mockery and contempt.

This is not fear dressed up as bravery.

God pictures Jerusalem's actual reaction as genuine, confident scorn.

The invader expecting to be feared becomes the one who looks foolish.

😏 Head shaking showed mockery

💪 This is not fear in disguise

👑 Jerusalem's scorn is genuine

➡️ The feared invader looks foolish instead

## ❓ Whom Hast Thou Reproached And Blasphemed?

God now speaks directly instead of describing the scene from a distance.

This question is not really a request for information.

It is meant to make Sennacherib actually name who he has been mocking.

The answer is about to be stated plainly in the very next line.

❓ God speaks directly now

🗣️ This is not a real question

🎯 It forces Sennacherib to face the truth

➡️ The answer comes in the next line

## 👀 Exalted Thy Voice, And Lifted Up Thine Eyes On High

Both phrases are old idioms for arrogance and open pride.

A raised voice pictures loud, confident boasting.

Lifted eyes pictures looking down on everyone else.

Together they describe a man who believed he answered to no one.

👀 Both phrases describe arrogance

📢 A raised voice pictures boasting

😤 Lifted eyes pictures looking down

➡️ Sennacherib believed he answered to no one

## ☝️ Even Against The Holy One Of Israel

The Holy One of Israel is one of Isaiah's favorite titles for God.

Holy means set apart, completely different from anything else that exists.

Sennacherib thought he was only mocking a small nation's local god.

He was actually mocking the one true, set apart God of everything.

☝️ Isaiah's favorite title for God

✨ Holy means set apart, completely different

🇮🇱 Sennacherib thought he mocked a small nation

📖 He really mocked the one true God

## 🐎 With The Multitude Of My Chariots I Am Come Up To The Height Of The Mountains

God quotes Sennacherib's own boastful words back to him directly.

Chariots were Assyria's most feared and powerful weapon of war.

Claiming to reach mountain heights pictures conquering even nature itself.

Sennacherib's own pride becomes the evidence used against him.

🐎 Chariots were Assyria's feared weapon

⛰️ He claims to conquer mountains too

😤 The boast targets nature itself

➡️ His own words become the evidence

## 🌲 Cut Down The Tall Cedar Trees Thereof, And The Choice Fir Trees Thereof

Lebanon's cedar trees were famous across the ancient world for their size and quality.

Kings prized this wood for palaces and temples, including Solomon's temple.

Sennacherib boasts of destroying even this legendary, valuable forest.

Nothing, in his own mind, was too great for him to touch.

🌲 Cedars were famous prized timber

🏛️ Kings used them for temples and palaces

🪓 Sennacherib boasts of destroying them

➡️ Nothing seemed too great for his reach

## 🌳 The Forest Of His Carmel

Carmel was a fertile, wooded region famous for its beauty and richness.

Calling it his Carmel is Sennacherib claiming ownership over land that was never his.

The land actually belonged to God, not to any invading king.

His own boast unintentionally reveals exactly what he had gotten wrong.

🌳 Carmel was a fertile, famous region

👑 Sennacherib calls it his own

✋ The land really belonged to God

📖 His boast reveals his own mistake

## 💧 I Have Digged And Drunk Strange Waters

Controlling water sources was a real mark of military conquest in this era.

Strange waters means wells and springs that belonged to other nations.

Drinking from them was Sennacherib's way of claiming total ownership.

He treats even another people's water as something he is entitled to.

💧 Water sources marked real conquest

🌍 Strange waters means other nations' wells

👑 Drinking them claims total ownership

➡️ He treats it all as his by right

## 🦶 With The Sole Of My Feet Have I Dried Up All The Rivers Of Besieged Places

This is an exaggeration, not a literal claim about drying up rivers.

Sennacherib pictures his army as so massive it drinks whole rivers dry.

Ancient kings often used this kind of hyperbole to sound unstoppable.

The boast is designed to make resistance sound completely pointless.

🦶 This is exaggeration, not literal fact

🌊 His army supposedly drinks rivers dry

👑 Ancient kings often boasted this way

➡️ The goal was making resistance feel pointless

## 📜 Hast Thou Not Heard Long Ago How I Have Done It

The speaker suddenly shifts here, from Sennacherib's boasting to God's own voice.

God claims He planned Assyria's conquests long before they ever happened.

Sennacherib thought his victories proved his own greatness.

God says those same victories were actually His plan all along.

📜 The speaker shifts to God here

🗓️ God planned this long before it happened

😤 Sennacherib credited his own greatness

📖 It was God's plan all along

## 🏚️ That Thou Shouldest Be To Lay Waste Fenced Cities Into Ruinous Heaps

Fenced means walled and heavily fortified for defense.

God calls Sennacherib a tool He used, not an independent conqueror.

Even Assyria's cruelty served a purpose it never intended or understood.

The invader was never as powerful, or as free, as he believed.

🏚️ Fenced means walled and fortified

🔨 Sennacherib was God's tool, not an independent force

❓ Assyria's cruelty served a purpose it never knew

📖 He was never as free as he believed

# SecondKingsNineteen 19:26-28
# 🌾 Small Power, Then God's Own Ears
---
## 🌾 As The Grass Of The Field, And As The Green Herb

These images describe the nations Assyria had already conquered.

Grass and young grain look strong but wither or die quickly.

The chapter adds a third picture, corn blasted before it grows up.

Assyria's past victories looked impressive but were never permanent or God's final word.

🌾 The images describe conquered nations

🌱 Grass and young grain die quickly

🌽 Corn blasted adds a third picture

➡️ Assyria's victories were never the final word

## 👁️ I Know Thy Abode, And Thy Going Out, And Thy Coming In

God claims complete knowledge of everywhere Sennacherib goes.

Abode means his home base.

Going out and coming in cover his campaigns and his return.

Nothing about his movements is hidden from God's sight.

The proud king who tracked conquered nations is himself being tracked the whole time.

👁️ God knows Sennacherib's every move

🏠 Abode means his home base

🚶 Going out means his campaigns and return

➡️ The watcher is himself being watched

## 😤 Thy Rage Against Me And Thy Tumult Is Come Up Into Mine Ears

Tumult means the noisy uproar of Sennacherib's boasting and threats.

God says that noise has traveled all the way up to Him.

Sennacherib thought his words only reached frightened people in Jerusalem.

Every boastful word was actually heard in heaven the whole time.

😤 Tumult means noisy uproar

📢 The noise reaches all the way to God

🗣️ Sennacherib thought only Jerusalem heard him

📖 Heaven heard every word the whole time

## 🪝 I Will Put My Hook In Thy Nose, And My Bridle In Thy Lips

Ancient hunters and soldiers sometimes led captured animals with a hook through the nose.

A bridle controlled a horse's direction by pulling on its mouth.

God pictures Sennacherib as a captured animal, not a free conqueror anymore.

The king who thought he controlled every army is about to be led away himself.

🪝 A hook led captured animals

🐎 A bridle controlled a horse's mouth

🔗 Sennacherib is pictured as captured

📖 The controller is about to be controlled

# SecondKingsNineteen 19:29-31
# 🌱 The Sign Of The Third Year
---
## ✍️ This Shall Be A Sign Unto Thee

A sign here means visible proof that backs up a spoken promise.

God does not just tell Hezekiah what will happen.

He also gives him a way to actually watch it unfold, year by year.

Words alone were not the only thing Hezekiah was given.

✍️ A sign means visible proof

🗣️ God does not stop at words

📅 Hezekiah can watch it unfold

➡️ Proof was given, not just promises

## 🌾 Ye Shall Eat This Year Such Things As Grow Of Themselves

Assyria's invasion had already ruined this year's normal planting season.

The first year, the people will only have wild, self seeded crops to eat.

The second year will look almost the same, still no real planting.

The disruption from war does not disappear the moment the danger ends.

🌾 War had ruined the planting season

🌱 Year one means only wild growth

🔁 Year two looks much the same

➡️ Recovery takes real time, not a moment

## 🍇 In The Third Year Sow Ye, And Reap, And Plant Vineyards

By the third year, normal farming life fully returns to Judah.

Sowing, reaping, and planting vineyards were the ordinary rhythms of everyday life.

This detail proves the danger is genuinely over, not just paused.

Ordinary life returning becomes its own kind of miracle after a siege.

🍇 Normal farming returns by year three

🌱 Sowing and reaping resume fully

✅ This proves the danger has passed

📖 Ordinary life becomes its own miracle

## 🌳 Take Root Downward, And Bear Fruit Upward

This is a plant picture used for the surviving people of Judah.

Roots growing downward describe a nation becoming stable again.

Fruit growing upward describes new growth and future generations.

Judah is promised recovery that goes deep, not just a surface fix.

🌳 A plant picture describes the nation

⬇️ Roots downward mean new stability

⬆️ Fruit upward means future growth

➡️ Recovery goes deep, not surface deep

## 🔥 The Zeal Of The LORD Of Hosts Shall Do This

Zeal means intense, passionate commitment, not a calm or distant promise.

LORD of hosts means God who commands heaven's own armies.

Judah's survival will not come from clever strategy or a strong army.

It will come from God's own passionate commitment to His people.

🔥 Zeal means intense, passionate commitment

⚔️ LORD of hosts means commander of heaven's armies

🛡️ Survival will not come from strategy

📖 God's own commitment secures it

# SecondKingsNineteen 19:32-34
# 🛡️ The LORD Defends The City
---
## 🏹 He Shall Not Come Into This City, Nor Shoot An Arrow There

God's promise is extremely specific, not just a vague reassurance.

Sennacherib will not fire even a single arrow at Jerusalem.

The city will not experience even the very beginning of an attack.

Total protection is promised, not just eventual survival after a fight.

🏹 The promise is very specific

🎯 Not even one arrow will land

🚫 The attack will not even begin

➡️ Total protection is promised here

## 🏗️ Nor Cast A Bank Against It

A bank here means a large ramp of earth built up against a city's wall.

Armies built these ramps to help soldiers climb over or break through defenses.

Assyria was famous throughout the region for building them well.

God promises Jerusalem will never even see one being built.

🏗️ A bank means an earthen siege ramp

🪖 Armies used them to break through walls

👑 Assyria was famous for building them

➡️ Jerusalem will never see one built here

## 🔄 By The Way That He Came, By The Same Shall He Return

Sennacherib's defeat is described as a retreat, not a battle.

He leaves exactly the same way he arrived, empty handed.

No dramatic final battle at Jerusalem's gates is even necessary.

The mightiest army in the region simply turns around and goes home.

🔄 Defeat looks like a retreat

🚶 He leaves the same way he came

🚫 No final battle is needed

📖 The mightiest army just turns around

## 👑 For Mine Own Sake, And For My Servant David's Sake

God gives two separate reasons for defending Jerusalem, not just one.

His own sake means His reputation and name are on the line.

David's sake points back to God's old covenant promise to David's family.

Jerusalem is protected because of who God is and what He already promised.

👑 Two reasons are given here

✨ God's own reputation is one reason

📖 David's covenant promise is the other

➡️ Jerusalem is spared for God's name and word

# SecondKingsNineteen 19:35-37
# ⚔️ The Angel Strikes The Camp
---
## 👼 The Angel Of The LORD Went Out

No human army delivers this final blow against Assyria.

An angel, a heavenly messenger sent directly by God, does it instead.

This confirms every promise made earlier in this chapter was literal.

The battle Judah never had to fight was won without a single soldier.

👼 An angel does this, not an army

🕊️ Angels are heavenly messengers from God

✅ It confirms the earlier promises

➡️ The battle was won without a soldier

## 🔢 An Hundred Fourscore And Five Thousand

Fourscore is an old word meaning eighty.

Together this number equals one hundred eighty five thousand men.

That was an enormous army, larger than most cities of that time.

One single night ends the greatest military threat Judah had ever faced.

🔢 Fourscore means eighty

➕ The total is one hundred eighty five thousand

🪖 It was an enormous army

📖 One night ends Judah's greatest threat

## 💀 When They Arose Early In The Morning, Behold, They Were All Dead Corpses

The devastation happens silently, overnight, while the camp was sleeping.

No one in the Assyrian camp even saw it coming.

Isaiah's promise of a blast and a sudden fall by the sword is now fulfilled exactly.

Words spoken earlier in this very chapter become literal history here.

💀 The devastation happens overnight

😴 No one saw it coming

✅ Isaiah's earlier promise is fulfilled exactly

📖 A spoken word becomes real history

## 🏙️ So Sennacherib King Of Assyria Departed, And Went And Returned, And Dwelt At Nineveh

Nineveh was the capital city of the Assyrian empire.

Sennacherib survives the disaster, but returns home utterly defeated.

This is the exact ending God announced all the way back in verse seven.

The promise made at the very start of the chapter closes it too.

🏙️ Nineveh was Assyria's capital

😔 Sennacherib survives, but defeated

🔁 This fulfills verse seven exactly

📖 The chapter's promise becomes its ending

## 🗿 As He Was Worshipping In The House Of Nisroch His God

Nisroch was a god worshipped in the Assyrian religious system.

Sennacherib is killed inside his own god's temple, not on any battlefield.

The idol he trusted could not protect him in its own house.

The very god he relied on failed him completely, in its own home.

🗿 Nisroch was an Assyrian god

🏛️ He is killed in that god's temple

🚫 The idol could not protect him

📖 His own god failed him completely

## 🗡️ Adrammelech And Sharezer His Sons Smote Him With The Sword

Sennacherib's own sons are the ones who kill him.

Ancient historical records outside the Bible confirm this assassination happened.

The mightiest king in the region dies at the hands of his own family.

The invader who mocked God's power could not even trust his own household.

🗡️ His own sons kill him

📜 Outside records confirm this event

👑 A mighty king dies by his own family

📖 He could not even trust his own house

## 👑 Esarhaddon His Son Reigned In His Stead

Esarhaddon is a real, historically documented Assyrian king.

He succeeds his father after the assassination described in the verse before.

The chapter closes on ordinary political history, not another miracle.

God's power was proven, and then everyday life simply moved forward.

👑 Esarhaddon was a real historical king

🔁 He succeeds his father after the murder

📜 The chapter ends in ordinary history

➡️ God's power proven, life moves on`.trim();

export const SECOND_KINGS_NINETEEN_PERSONAL_SECTIONS = parseSecondKingsNineteenRawNotes(SECOND_KINGS_NINETEEN_RAW_NOTES);
