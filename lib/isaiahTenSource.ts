export type IsaiahTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTenRawNotes(rawText: string): IsaiahTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 10:${startVerse}` : `Isaiah 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 10 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TEN_RAW_NOTES = `# Isaiah 10:1-4
# ⚖️ Woe To The Unjust Lawmakers
---
## ⚖️ Woe Unto Them That Decree Unrighteous Decrees

"Woe" is a word of doom, spoken before disaster arrives.

It is not a mild complaint.

It warns that judgment is already on its way.

The people being warned here are judges and rulers.

They write unfair rules into official law instead of breaking the law in secret.

⚖️ Woe warns that judgment is coming

📜 Decree means an official ruling

👑 Judges and rulers are being warned

📖 Their injustice was written into law

## 📝 Grievousness Which They Have Prescribed

"Grievousness" means a heavy, painful burden placed on someone else.

"Prescribed" means it was written down as a fixed rule, not a passing decision.

These rulers were not simply making one bad choice.

They were building oppression into the permanent legal system.

A law that hurts people does not become fair just because it is official.

📝 Grievousness means a heavy burden

📜 Prescribed means written into permanent law

⚖️ Oppression was built into the system

📖 An official law can still be unjust

## 👥 To Turn Aside The Needy From Judgment

"The needy" means people without money, power, or influence to defend themselves.

"Judgment" here means a fair hearing in court.

Turning them aside means their case was dismissed before anyone truly listened.

Courts in ancient Israel were supposed to protect the weak, not just the wealthy.

This law was doing the exact opposite of what courts were built for.

👥 The needy means the powerless poor

⚖️ Judgment means a fair court hearing

🚫 Their case was dismissed unheard

📖 Courts were meant to protect the weak

## 👩 That Widows May Be Their Prey, And Rob The Fatherless

Widows and orphans had no husband or father to defend their legal rights.

Calling them "prey" compares these rulers to hunters stalking easy, defenseless targets.

The law repeatedly commands Israel to protect widows and the fatherless, not exploit them.

These rulers used their power to rob the very people God commanded them to guard.

👩 Widows had no legal protector

🦁 Prey compares rulers to hunters

📜 God's law commanded their protection

📖 Power was used to rob, not guard

## ⏳ The Day Of Visitation

"Visitation" means a time when God personally steps in to judge or to help.

Here it refers to a coming day of judgment, not a friendly visit.

The rulers who oppressed the poor will face a reckoning they cannot avoid.

Every quiet, hidden injustice eventually comes into the light on that day.

⏳ Visitation means God stepping in

⚖️ This visitation means judgment, not blessing

🙈 Hidden injustice cannot stay hidden

📖 A day of reckoning is coming

## 🏃 To Whom Will Ye Flee For Help

This question has no good answer for the rulers being confronted.

Their money, their allies, and their armies will not be able to save them.

The point is not really a question at all.

It is a way of saying no one else can help them now.

🏃 The question expects no real answer

💰 Money and allies cannot save them

🚫 No human help will be enough

➡️ Only God could have helped them

## 😔 Without Me They Shall Bow Down Under The Prisoners

"Without me" means apart from God, with no divine help at all.

Bowing down under prisoners pictures total defeat, the conquered led away in chains.

Falling under the slain means being counted among the dead in battle.

Both pictures describe the same coming disaster from two different angles.

😔 Without me means no divine help

⛓️ Bowing under prisoners pictures defeat

💀 Falling under the slain means death

📖 Two pictures, one coming disaster

## 🔥 His Hand Is Stretched Out Still

This exact line already closed four separate sections back in Isaiah nine.

It works like a drumbeat, repeating after each new warning in this stretch of Isaiah.

"His hand stretched out" pictures God still actively reaching toward Israel, not finished yet.

The refrain means judgment so far has not been God's whole and final word.

🔁 This line repeats from Isaiah nine

🥁 It works like a drumbeat refrain

✋ Stretched out means God is not finished

📖 More warning was still to come

# Isaiah 10:5-11
# 🪓 Assyria, The Rod In God's Hand
---
## 🪓 O Assyrian, The Rod Of Mine Anger

A "rod" was a stick used for walking, punishing, or guiding animals.

Calling Assyria "the rod of mine anger" means God is using this nation as His own tool.

Assyria did not know it was being used this way at all.

God can use even a proud, violent empire to carry out His own purposes.

🪓 A rod was a tool for punishing

⚔️ Assyria did not know God's plan

🙌 God can use any nation He chooses

📖 Even empires serve God's purposes

## 😠 The Staff In Their Hand Is Mine Indignation

"Staff" repeats the same idea as "rod" in different words.

This is a common pattern in Hebrew poetry called parallelism, saying one thing twice in two ways.

"Indignation" means God's righteous anger over sin.

The doubled image makes the point impossible to miss, God himself is directing this army.

😠 Indignation means righteous anger

🔁 Staff repeats the idea of rod

📚 Hebrew poetry often restates one idea

📖 God himself directs this army

## 😈 Against An Hypocritical Nation

The hypocritical nation being punished here is Israel and Judah, God's own people.

"Hypocritical" means claiming to follow God while actually living against Him.

Assyria is described elsewhere as far more violent and idolatrous than Israel.

God can still use a worse nation to discipline a nation that claims to know better.

😈 Hypocritical means claiming faith falsely

👥 God's own people are being judged

⚖️ A worse nation can still discipline

📖 Knowing God does not excuse hypocrisy

## 🐾 To Tread Them Down Like The Mire Of The Streets

"Mire" means the mud and filth that collected in the streets of an ancient city.

Nobody valued mud lying in the road.

It was simply trampled underfoot without a second thought.

Comparing Israel's coming defeat to trampled mud pictures total, humiliating loss of worth.

This kind of judgment was not a gentle correction.

🐾 Mire means mud trampled in streets

👣 Nobody valued mud in the road

💔 The comparison pictures humiliating defeat

📖 This judgment was not gentle correction

## 🤔 Howbeit He Meaneth Not So, Neither Doth His Heart Think So

"Howbeit" is an old word meaning "however" or "but."

Assyria has no idea it is being used as God's tool at all.

The king believes every conquest is entirely his own idea and his own achievement.

God's plan and a person's own intentions can run at the very same time.

🤔 Howbeit means however or but

😶 Assyria does not know God's plan

👑 The king credits only himself

📖 God's plan can use a proud heart

## 💣 It Is In His Heart To Destroy And Cut Off Nations Not A Few

The Assyrian king's ambitions reach far beyond punishing Israel and Judah alone.

"Not a few" is an old way of saying a great many nations at once.

His goal was empire, not correction or obedience to God.

God's purpose was narrow.

Assyria's own goal was total conquest.

💣 His ambition reaches many nations

🔢 Not a few means a great many

👑 His true goal was empire

📖 God's purpose was narrower than his

## 👑 Are Not My Princes Altogether Kings

"Princes" here means the generals and governors serving directly under the Assyrian king.

The king boasts that each one of his officers rules with the full power of a king.

This was not humility.

It was a claim of overwhelming military strength.

An army with that many kinglike commanders would have felt unstoppable.

👑 Princes means generals and governors

💪 Each officer ruled like a king

🗣️ This boast claimed overwhelming strength

📖 The army felt unstoppable by comparison

## 🏙️ Is Not Calno As Carchemish? Is Not Hamath As Arpad?

Calno, Carchemish, Hamath, and Arpad were all real cities Assyria had already conquered.

The king is listing his past victories like trophies, one after another.

His point was simple.

Every one of these proud cities fell exactly the same way.

None of their gods or defenses made any real difference in the end.

🏙️ These were cities Assyria conquered

🏆 The king lists victories like trophies

⚔️ Every proud city fell the same way

📖 No god or wall stopped him

## 🏘️ Is Not Samaria As Damascus?

Samaria was the capital city of the northern kingdom of Israel.

Damascus was the capital city of Syria, another neighboring kingdom.

Both cities had already fallen to Assyria before this king ever spoke this boast.

He is warning that Jerusalem, Judah's own capital, could be next on that same list.

🏘️ Samaria was Israel's capital city

🏛️ Damascus was Syria's capital city

🗺️ Both cities had already fallen

📖 Jerusalem could be next on his list

## 🗿 As My Hand Hath Found The Kingdoms Of The Idols

The Assyrian king openly credits his own hand for every victory.

He calls the nations he conquered "kingdoms of the idols," since they worshiped false gods.

In his mind, every fallen kingdom simply proves whose god was stronger.

He is about to make the exact same claim about Jerusalem's God.

🗿 Idols means the false gods they worshiped

💪 The king credits his own hand

⚖️ Fallen kingdoms proved whose god won

📖 He is about to test that claim

## 🖼️ Whose Graven Images Did Excel Them Of Jerusalem And Samaria

"Graven images" means statues carved to represent a god.

The king believes Jerusalem simply worships a bigger, better version of the same kind of idol.

He has no idea that Jerusalem's God is not an image at all.

That single mistake is the reason his whole plan is about to fail.

🖼️ Graven images means carved idol statues

🤷 The king assumes all gods are similar

🚫 He does not know God is no idol

📖 That mistake will cost him everything

## 🎯 Shall I Not, As I Have Done Unto Samaria, So Do To Jerusalem

This is the exact threat the whole chapter has been building toward.

The king plans to treat Jerusalem exactly the way he already treated Samaria.

He is speaking with total confidence, since nothing has stopped him yet.

He does not know that the living God is not like Samaria's idols at all.

🎯 This is the chapter's central threat

🔁 He plans to repeat Samaria's fall

😤 He speaks with total confidence

📖 He does not know God is different

# Isaiah 10:12-14
# 👑 The King's Pride Will Be Punished
---
## ⛰️ When The Lord Hath Performed His Whole Work Upon Mount Zion

God is not finished using Assyria as a tool yet.

Once Assyria has done everything God intended against Jerusalem, its job ends.

A tool does not get to keep working after its task is complete.

What comes next for Assyria is judgment for its own pride, not more reward.

⛰️ Mount Zion refers to Jerusalem

🛠️ Assyria is a tool with a limit

⏳ A finished task ends the tool's use

📖 Judgment for pride comes next

## 😤 The Fruit Of The Stout Heart Of The King Of Assyria

"Stout heart" is an old phrase meaning stubborn pride.

"Fruit" here means the natural result that pride eventually produces.

Proud, self reliant hearts eventually produce arrogant, self destructive actions.

The very same pride God once used is the pride God is about to punish.

😤 Stout heart means stubborn pride

🍇 Fruit means the natural result

💔 Pride eventually produces bad fruit

📖 The same pride now faces judgment

## 👁️ The Glory Of His High Looks

"High looks" describes a proud, superior expression on someone's face.

It is the look of someone who believes no one else compares to him.

God specifically names this attitude as something He intends to punish.

Outward pride always begins with an inward belief that one stands above everyone else.

👁️ High looks means a proud expression

👑 It shows belief in his own superiority

⚖️ God names this pride for judgment

📖 Inner pride shows on the outside

## 💪 By The Strength Of My Hand I Have Done It, And By My Wisdom

The king credits only his own strength and cleverness for every victory.

He calls himself prudent, meaning wise and shrewd in his own eyes.

Nowhere in this boast does he mention any higher power at all.

This is the very same mistake the earlier boasts in this chapter already made.

💪 The king credits his own strength

🧠 Prudent means wise in his own eyes

🚫 He never mentions any higher power

📖 The same mistake repeats again

## 🗺️ I Have Removed The Bounds Of The People

"Bounds" means the marked borders between nations and territories.

Boundary stones and markers were treated as sacred and permanent in the ancient world.

The king boasts that he simply erased these lines whenever he chose to.

Redrawing another nation's borders by force was an act of total domination.

🗺️ Bounds means marked national borders

🪨 Boundary markers were treated as sacred

🚫 He erased borders whenever he wanted

📖 Redrawing borders showed total domination

## 🥚 As A Nest, And As One Gathereth Eggs That Are Left

A bird's nest full of eggs is completely defenseless against a human hand.

The king compares plundering nations to a person calmly gathering abandoned eggs.

No struggle slowed him down.

No resistance stood in his way.

His own words reveal exactly how little respect he had for those he conquered.

🥚 Eggs picture something totally defenseless

🐦 A nest cannot fight back

😌 The plunder felt effortless to him

📖 His words reveal his contempt

## 🤐 There Was None That Moved The Wing, Or Opened The Mouth, Or Peeped

This pictures birds so frightened that not one of them dares to react at all.

Every conquered nation stayed silent, like frightened birds afraid to move.

The king boasts about total, silent surrender from everyone he crushed.

That silence will not last.

The next verses already describe his coming downfall.

🤐 The image pictures total frightened silence

🐦 No wing, beak, or peep responded

😶 He boasts of silent surrender

📖 That silence will not last

# Isaiah 10:15-19
# 🪓 The Axe Cannot Boast Against Its User
---
## 🪓 Shall The Axe Boast Itself Against Him That Heweth Therewith

"Heweth" is an old word for chopping or cutting.

An axe has no power of its own.

It only does what the hand holding it decides.

The Assyrian king has forgotten that he is the axe, not the one swinging it.

God is the true hand behind every victory Assyria has claimed as its own.

🪓 Heweth means chopping or cutting

✋ A tool has no power alone

😤 The king forgot he was the tool

📖 God was the true hand at work

## 🌳 As If The Rod Should Shake Itself Against Them That Lift It Up

This repeats the same tool metaphor from verse five in a new picture.

A rod cannot shake on its own.

Someone else has to lift it and use it.

The image is almost comical on purpose, since a stick moving itself makes no sense.

Assyria claiming credit for its victories is just as senseless as a stick moving itself.

🌳 This repeats the rod metaphor

🤏 A rod cannot move on its own

😅 The image is almost comical

📖 Assyria's boast made just as little sense

## 🔥 Send Among His Fat Ones Leanness

"Fat ones" pictures Assyria's strongest, best fed soldiers and officers.

"Leanness" means the opposite, weakness, sickness, or sudden lack.

God promises to strike down exactly the strength Assyria was most proud of.

The very army that looked unstoppable will be weakened from the inside.

🔥 Fat ones means the strongest soldiers

📉 Leanness means sudden weakness

💪 God targets their greatest strength

📖 The unstoppable army grows weak

## 🕯️ The Light Of Israel Shall Be For A Fire, And His Holy One For A Flame

"The Holy One of Israel" is one of Isaiah's favorite names for God.

Here that same God is described as fire and flame, not gentle light.

Fire can comfort and guide, but it can also judge and destroy completely.

The same God protecting Israel is the God about to consume Assyria.

🕯️ Holy One of Israel names God

🔥 Fire and flame describe judgment

🛡️ The same God protects and judges

📖 Assyria is about to be consumed

## 🌿 It Shall Burn And Devour His Thorns And His Briers In One Day

Thorns and briers were tangled, worthless plants that farmers hated finding in a field.

Comparing Assyria's massive army to thorns and briers strips away all its terror.

Fire clears thorns quickly and completely, leaving nothing behind to regrow.

"In one day" means this judgment will come suddenly, not slowly over years.

🌿 Thorns and briers picture worthless growth

🔥 Fire clears them completely

⏱️ In one day means sudden judgment

📖 Terror shrinks once God is in view

## 🌲 Consume The Glory Of His Forest, And Of His Fruitful Field, Both Soul And Body

"His forest" pictures the huge size of the Assyrian army, like a vast stand of trees.

"Fruitful field" pictures the wealth and resources feeding that same army.

"Both soul and body" means this judgment reaches all the way through, not just the surface.

Nothing about Assyria's strength will be left standing once this fire finishes its work.

🌲 His forest pictures the huge army

🌾 Fruitful field pictures Assyria's wealth

🔥 Soul and body means total judgment

📖 Nothing of that strength survives

## 🏳️ As When A Standard Bearer Fainteth

A standard was a flag or banner carried at the front of an ancient army.

Soldiers watched that banner to know where to stand and when to retreat.

If the standard bearer collapsed, panic could spread through the entire army at once.

This small image pictures Assyria's whole massive force falling apart from a single failure.

🏳️ A standard was the army's flag

👀 Soldiers followed the standard's position

😱 One collapse could cause total panic

📖 A small failure can end a whole army

## 🌳 The Rest Of The Trees Of His Forest Shall Be Few, That A Child May Write Them

The forest imagery from earlier verses continues right into this closing picture.

So few soldiers will remain that a child could count and write down every name.

An army once too vast to number will be reduced to almost nothing.

The chapter keeps circling back to trees on purpose, since Lebanon's trees appear again later.

🌳 The forest image continues here

🔢 So few remain a child could count

📉 A vast army shrinks to almost nothing

📖 Trees return again later in the chapter

# Isaiah 10:20-23
# 🌾 The Remnant Will Return
---
## 🌾 The Remnant Of Israel, And Such As Are Escaped Of The House Of Jacob

"Remnant" means the small portion of a much larger group that survives.

"House of Jacob" is another name for the whole nation of Israel.

After all the destruction described earlier in this chapter, a remnant is promised to remain.

Judgment in this chapter was never the same thing as total, final erasure.

🌾 Remnant means the surviving portion

🏠 House of Jacob names all Israel

🔥 Even after judgment, survivors remain

📖 Judgment was never total erasure

## 🙅 Shall No More Again Stay Upon Him That Smote Them

"Stay upon" is an old way of saying "lean on" or "depend on."

Judah had been leaning on alliances with foreign nations like Assyria for protection.

That same Assyria is the nation now smiting, or striking, them instead.

This remnant learns to stop trusting the very power that once hurt them.

🙅 Stay upon means lean on for help

🤝 Judah once leaned on Assyria

⚔️ That ally became the striker instead

📖 Trust shifts from Assyria to God

## 🙏 But Shall Stay Upon The LORD, The Holy One Of Israel, In Truth

"In truth" means this trust will finally be real, not just words spoken out loud.

Judah had claimed to trust God before while still leaning on human alliances instead.

This time the remnant's dependence on God will actually match what they say.

Genuine trust looks different from religious language used without any real reliance behind it.

🙏 In truth means genuine, not just spoken

🗣️ Past trust in God was only words

❤️ This time trust will be real

📖 Genuine trust must match what is said

## 🔁 The Remnant Shall Return, Even The Remnant Of Jacob, Unto The Mighty God

This exact phrase, "a remnant shall return," already appeared once before in Isaiah.

Isaiah had earlier given his own son the name Shearjashub, which means that very phrase.

That child's name was a living, walking prophecy years before this chapter was ever spoken.

Here the promise behind that name is finally being explained in full.

🔁 This phrase already named Isaiah's own son

👶 Shearjashub means a remnant shall return

📆 The name came years before this chapter

📖 A promise walked around as a child

## 🌊 Though Thy People Israel Be As The Sand Of The Sea

This picture of sand by the sea echoes God's ancient promise to Abraham.

God had promised Abraham that his descendants would be as countless as the sand.

That promise of a huge, uncountable family is being recalled here on purpose.

Even a shrinking remnant does not cancel a promise God made generations earlier.

🌊 Sand of the sea recalls Abraham's promise

👴 God promised Abraham countless descendants

📜 That old promise is recalled here

📖 Judgment does not cancel God's promise

## ✂️ Yet A Remnant Of Them Shall Return

Only a portion of that huge, promised family will survive this coming judgment.

That should sound discouraging, yet the very next words turn it into hope instead.

A remnant returning is still a real return, not a complete and final ending.

God's promises can shrink in number without ever becoming untrue.

✂️ Only a portion will survive

😟 That sounds discouraging at first

🌱 A remnant is still a real return

📖 Fewer people does not mean a broken promise

## ⚖️ The Consumption Decreed Shall Overflow With Righteousness

"Consumption" here means a decreed, deliberate destruction, not random chaos or excess punishment.

Pairing that destruction with "righteousness" means it will be exactly fair, not cruel or extreme.

God's judgment in this chapter is never portrayed as an angry outburst.

It is described instead as measured, deliberate, and completely just.

⚖️ Consumption means a decreed destruction

✅ Righteousness means the judgment is fair

🚫 This was never an angry outburst

📖 God's judgment is measured and just

# Isaiah 10:24-27
# 🕊️ Be Not Afraid Of The Assyrian
---
## 🕊️ O My People That Dwellest In Zion, Be Not Afraid Of The Assyrian

After chapters of warning, God now speaks a direct word of comfort to Zion.

"Zion" is another name for Jerusalem, especially as God's own dwelling place.

Fear had every reason to be present after everything already described in this chapter.

God's command here is not to deny the danger, but to trust Him inside of it.

🕊️ Zion names Jerusalem as God's dwelling

😨 Fear made real sense here

🛡️ God speaks comfort straight into danger

📖 Trust does not mean denying danger

## 🪓 He Shall Smite Thee With A Rod, And Lift Up His Staff, After The Manner Of Egypt

This repeats the rod and staff imagery already used earlier in this same chapter.

"After the manner of Egypt" points back to Israel's slavery under Pharaoh long ago.

Assyria's oppression is being compared directly to that older, well known story of bondage.

Naming Egypt here already hints that a deliverance is coming, just like it did then.

🪓 Rod and staff repeat earlier imagery

🏺 Egypt recalls Israel's old slavery

🔁 Assyria's threat echoes that older story

📖 Naming Egypt hints at deliverance

## ⏳ For Yet A Very Little While, And The Indignation Shall Cease

God promises this hardship will not last forever.

"Indignation" here means the anger God allowed to fall on His own people.

That anger has a clear, limited stopping point already fixed by God.

Discipline in scripture is regularly described as temporary, never as God's last word.

⏳ A very little while means limited time

😠 Indignation means anger allowed for discipline

🛑 This anger has a fixed end

📖 Discipline is never God's final word

## 🗡️ According To The Slaughter Of Midian At The Rock Of Oreb

This recalls the story of Gideon's small army defeating a massive Midianite force.

That victory came through God's power alone, not through Israel's numbers or weapons.

"The rock of Oreb" was named after a Midianite leader captured and killed there.

God is promising a similarly impossible, unmistakably divine victory over Assyria as well.

🗡️ This recalls Gideon's small army

🏔️ Oreb was a Midianite leader

💪 That victory came from God alone

📖 A similar impossible victory is promised

## 🌊 As His Rod Was Upon The Sea, So Shall He Lift It Up

This points back to Moses lifting his rod to part the Red Sea in Exodus.

That same rod later came down again to drown Pharaoh's pursuing army in the sea.

The rod that once saved Israel is the same picture used again here.

God's power to rescue His people has not changed across the centuries.

🌊 This recalls Moses parting the Red Sea

🌀 The same rod later drowned Pharaoh's army

🔁 The same picture returns here

📖 God's rescuing power has not changed

## 🎒 His Burden Shall Be Taken Away From Off Thy Shoulder

A "burden" here pictures the heavy weight of living under a hostile foreign power.

Carrying that weight daily wore Judah down, both physically and emotionally.

God promises to personally lift that entire weight off of them.

This is not a partial relief being promised, but a complete removal.

🎒 Burden pictures oppression's daily weight

😓 That weight wore Judah down

🙌 God promises to lift it off

📖 This relief will be complete

## 🐂 His Yoke Shall Be Destroyed Because Of The Anointing

A "yoke" was a wooden frame placed on an animal's neck to force it to work.

Comparing Judah to a yoked animal pictures forced labor under a foreign master.

Many scholars believe "the anointing" pictures a neck grown strong enough to snap the yoke.

Whatever the exact picture, the point is the same, freedom is coming, not just relief.

🐂 A yoke forced an animal to work

😔 Judah is pictured as yoked labor

💪 The anointing suggests strength breaking free

📖 Freedom, not just relief, is promised

# Isaiah 10:28-32
# 🚶 The March Toward Jerusalem
---
## 🚩 He Is Come To Aiath, He Is Passed To Migron

This verse opens a rapid list of small towns just north of Jerusalem.

Aiath and Migron were real villages along the road an invading army would travel.

Naming each town in order lets the reader feel the enemy getting closer step by step.

This was not vague, distant danger, but a specific route toward a specific city.

🚩 This opens a march through named towns

🗺️ Aiath and Migron sat north of Jerusalem

👣 Each town marks the army's approach

📖 The danger was specific, not vague

## 🎒 At Michmash He Hath Laid Up His Carriages

"Carriages" here means baggage and supply wagons, not vehicles for riding.

An army stopping to unload supplies was preparing for a longer stay or a final push.

Michmash was close enough to Jerusalem that this pause would have felt deeply alarming.

Every stop on this list adds to the mounting sense of dread.

🎒 Carriages means baggage and supply wagons

🛑 Unloading supplies signaled a coming push

😨 Michmash sat close to Jerusalem

📖 Each stop adds to the dread

## 😱 Ramah Is Afraid, Gibeah Of Saul Is Fled

Ramah and Gibeah were both real towns in the path of this invasion.

Gibeah was especially significant as the hometown of Israel's first king, Saul.

Fear here is not described in general terms, it is named town by town.

Even a town tied to a former king's legacy could not stand against this fear.

😱 Ramah and Gibeah were real towns

👑 Gibeah was Saul's hometown

🏃 Fear spread town by town

📖 Even royal history could not stop the fear

## 📣 Lift Up Thy Voice, O Daughter Of Gallim, Cause It To Be Heard Unto Laish, O Poor Anathoth

"Daughter of Gallim" is an old way of speaking about a town as if it were a person.

Anathoth would later become well known as the prophet Jeremiah's own hometown.

Calling it "poor Anathoth" here already pictures the town in distress before that later story.

The list keeps naming real, specific places so the danger feels close and personal.

📣 A town is pictured as a person

🏡 Anathoth was later Jeremiah's hometown

😟 Poor Anathoth pictures a town in distress

📖 Real places make the danger feel personal

## 🏃 Madmenah Is Removed, The Inhabitants Of Gebim Gather Themselves To Flee

Madmenah and Gebim were smaller villages further along the same invasion route.

"Removed" here means the people had already abandoned the town before the army arrived.

Gathering to flee pictures entire families grabbing whatever they could carry and running.

Panic has now spread from soldiers and kings all the way down to ordinary villagers.

🏃 Madmenah and Gebim were small villages

📦 Removed means already abandoned

👨‍👩‍👧 Whole families gathered to flee

📖 Panic reached ordinary villagers too

## ⏸️ As Yet Shall He Remain At Nob That Day

Nob sat close enough to Jerusalem that a person could see the city walls from there.

This is the final stop named in the whole march, the very edge of Jerusalem itself.

The invading army has now arrived within sight of the city God promised to defend.

Every earlier town on this list led directly to this one final, tense stopping point.

⏸️ Nob was within sight of Jerusalem

🏁 This was the march's final stop

👀 The army could see the city walls

📖 Every earlier town led to this one

## ✊ He Shall Shake His Hand Against The Mount Of The Daughter Of Zion

Shaking a hand at someone was an ancient gesture of open threat and contempt.

"The daughter of Zion" is another way of naming Jerusalem itself, like a beloved child.

The army stands in plain sight of the city, gesturing threats at the very walls.

History records that this exact army never actually took the city, stopped by God alone.

✊ Shaking a hand pictured open threat

👧 Daughter of Zion names Jerusalem itself

🏙️ The army stood in sight of the walls

📖 God alone stopped this army from taking it

# Isaiah 10:33-34
# 🌲 The Lord Fells The Mighty Trees
---
## ⚡ Behold, The Lord, The LORD Of Hosts, Shall Lop The Bough With Terror

"Lop the bough" means to cut off a branch, often the highest and proudest one.

"The Lord of hosts" is a title picturing God as commander over every army, including heaven's own.

The forestry image from earlier in this chapter returns here for one final picture.

The very army that once looked like an unstoppable forest is about to be cut down.

⚡ Lop the bough means cutting a branch

👑 Lord of hosts pictures God as commander

🌳 The forest imagery returns one last time

📖 The unstoppable army faces the axe

## 📏 The High Ones Of Stature Shall Be Hewn Down, And The Haughty Shall Be Humbled

"High ones of stature" pictures the tallest, most impressive trees in a forest.

That image stands in for Assyria's proudest kings, generals, and officers.

"Haughty" means arrogant and looking down on everyone else, echoing the "high looks" from verse twelve.

The tallest trees fall first and hardest in this closing picture.

📏 High stature pictures the tallest trees

👑 This represents Assyria's proudest leaders

😤 Haughty means arrogant and prideful

📖 The tallest trees fall first

## 🪓 He Shall Cut Down The Thickets Of The Forest With Iron

"Thickets" means the dense, tangled undergrowth crowded beneath the tallest trees.

"Iron" pictures an axe blade, a decisive tool rather than a slow natural decay.

This judgment reaches beyond just the proudest leaders, down into the whole crowded army.

Nothing in this forest, however tangled or protected, is out of reach.

🪓 Iron pictures a decisive axe blade

🌿 Thickets means the dense undergrowth

👥 Judgment reaches beyond just the leaders

📖 Nothing here is out of reach

## 🏔️ And Lebanon Shall Fall By A Mighty One

Lebanon was famous throughout the ancient world for its massive, towering cedar trees.

Those cedars were the largest, strongest trees anyone in this region had ever seen.

Using Lebanon as the final image pictures Assyria at the very height of its power.

Even the mightiest cedar in the world falls easily before the one truly mighty God.

🏔️ Lebanon was famous for towering cedars

🌲 Cedars pictured the greatest possible strength

👑 Lebanon here represents Assyria at its peak

📖 The mightiest cedar still falls before God
`.trim();

export const ISAIAH_TEN_PERSONAL_SECTIONS = parseIsaiahTenRawNotes(ISAIAH_TEN_RAW_NOTES);
