export type JeremiahFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFiveRawNotes(rawText: string): JeremiahFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 5:${startVerse}` : `Jeremiah 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 5 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FIVE_RAW_NOTES = `# Jeremiah 5:1-6
# 🔍 Search The Streets For One Honest Man
---
## 🔍 Run Ye To And Fro Through The Streets Of Jerusalem

God is ordering a citywide search.

"Run to and fro" pictures checking every street and open square.

This same test of finding one righteous person was used with Abraham and Sodom.

There God agreed to spare the city for the sake of only ten honest people.

🔍 God orders a citywide search
🏙️ Every street and square gets checked
🏚️ The same test appeared with Sodom
📖 One honest person could still save the city

## ⚖️ If Ye Can Find A Man, I Will Pardon It

This is not a search for a perfect person.

"Executeth judgment" means someone who deals honestly with others.

"Seeketh the truth" means someone who actually lives it out, not just talks about it.

One person like that would be enough to change the verdict on the whole city.

⚖️ Judgment here means fair, honest dealing
🗣️ Truth means living it, not just saying it
🙋 Only one such person was needed
📖 The city's fate rested on finding him

## 🤝 Though They Say, The LORD Liveth: Surely They Swear Falsely

"The LORD liveth" was a common way to swear a solemn oath in this culture.

Swearing by that phrase meant staking your word on God's very existence.

Using it while lying about who they were shows how far the words had drifted from reality.

Sacred language had become a cover for a lie, not a guarantee of truth.

🤝 The LORD liveth was a solemn oath
📜 It staked your word on God's existence
🎭 Here it covered up a lie
📖 Sacred words no longer matched their lives

## 🩹 Thou Hast Stricken Them, But They Have Not Grieved

God had already sent smaller judgments meant to wake the people up.

"Stricken" and "consumed" point to real losses already suffered, not future threats.

Grieving and correction were the expected response to that kind of discipline.

Instead the people brushed each blow off and kept going the same way.

🩹 Stricken points to losses already suffered
🎯 Discipline was meant to bring correction
🙅 The people brushed it off instead
📖 Earlier warnings had already failed

## 🪨 They Have Made Their Faces Harder Than A Rock

A hard face here pictures someone who refuses to react or change at all.

Comparing it to a rock takes that stubbornness to its furthest point.

People can usually be moved by shame, warning, or loss.

This description says none of that worked anymore.

🪨 A hard face means refusing to change
😐 Rock pictures stubbornness at its extreme
🚫 Shame and warning stopped working
📖 Nothing could move them anymore

## 👥 Surely These Are Poor: They Are Foolish

Jeremiah first assumes the ordinary, poorer people are simply uninformed.

"Foolish" here does not mean stupid, it means lacking basic moral direction.

He reasons that people without access to teaching might not know better.

This assumption sets up the test in the very next verse.

👥 Jeremiah assumes ignorance, not rebellion
🙄 Foolish here means lacking moral direction
📚 He blames a lack of teaching
📖 That assumption is about to be tested

## 👑 I Will Get Me Unto The Great Men

Jeremiah expects the leaders and educated class to know better.

"The great men" means the nobles, officials, and religious leaders of Jerusalem.

He assumes their position gave them access to God's law that the poor lacked.

The next line shatters that assumption completely.

👑 Great men means Jerusalem's leaders
📜 Jeremiah expects them to know God's law
🎓 Position was assumed to mean understanding
📖 That assumption is about to fail

## 🐂 These Have Altogether Broken The Yoke, And Burst The Bonds

A yoke is a wooden frame placed on an animal to keep it under control.

The image describes willingly walking under God's authority and law.

Breaking the yoke means refusing that authority on purpose.

The leaders Jeremiah expected to know better had rejected it just as hard as everyone else.

🐂 A yoke pictures submission to authority
🔓 Breaking it means refusing that authority
👑 Even the leaders had rejected it
📖 No group was actually the exception

## 🦁 A Lion Out Of The Forest Shall Slay Them

Lion, wolf, and leopard were three of the most feared predators in this region.

Naming all three together pictures danger coming from every direction at once.

These animals stand in for invading armies and coming disasters.

No single escape route was going to be safe.

🦁 Lion, wolf, leopard were feared predators
🧭 Naming all three means danger everywhere
⚔️ The animals stand in for armies
📖 No direction offered an escape

## 🔁 Because Their Transgressions Are Many, And Their Backslidings Are Increased

Backsliding means falling back into sin after already turning from it once.

This is not a single mistake, it is a repeated pattern.

Each return to sin made the pattern deeper and harder to break.

Judgment here answers years of repetition, not one bad moment.

🔁 Backsliding means returning to sin again
📈 The pattern kept repeating and growing
⏳ Years of repetition built up to this
📖 Judgment answers a pattern, not one moment

# Jeremiah 5:7-9
# 🐴 Fed Horses In The Morning
---
## 👪 Thy Children Have Forsaken Me, And Sworn By Them That Are No Gods

Calling Judah "thy children" points back to God's covenant relationship with them.

Swearing loyalty to false gods was treated as a direct betrayal of that family bond.

"No gods" makes the point plainly, the idols had no real power at all.

Judah gave loyalty to something that could not even answer back.

👪 Children points to a covenant bond
💔 Idol worship broke that bond
🚫 No gods means the idols had no power
📖 Judah trusted something that could not answer

## 🍞 When I Had Fed Them To The Full, They Then Committed Adultery

God is describing a time of blessing and provision, not hardship.

Full stomachs and comfortable lives did not produce gratitude.

Instead that comfort gave them the freedom to chase other loyalties.

Ease exposed what was really in their hearts.

🍞 Fed to the full means real blessing
😐 Comfort did not produce gratitude
🔄 Ease freed them to chase other gods
📖 Prosperity revealed their true loyalty

## 🛕 Assembled Themselves By Troops In The Harlots' Houses

Many ancient religions in this region built prostitution directly into temple worship.

People believed sexual rituals there would please the gods and guarantee good harvests.

Judah's people took part in this pagan practice in large groups, not in secret.

Worship and sexual sin had become the same activity.

🛕 Ancient temples often included ritual prostitution
🌾 It was believed to guarantee harvests
👥 Judah joined in openly, not secretly
📖 Worship and sin had become one act

## 🐴 They Were As Fed Horses In The Morning

A "fed horse" pictures a stallion well rested and full of energy.

That image was a common way to describe uncontrolled desire in this culture.

"Every one neighed after his neighbour's wife" makes the comparison completely explicit.

This is not subtle poetry, it is a blunt description of widespread adultery.

🐴 A fed horse pictures restless energy
🔥 It described uncontrolled desire here
🏘️ Neighbour's wife makes the meaning explicit
📖 The description is blunt on purpose

## ⚖️ Shall I Not Visit For These Things?

"Visit" in this book is not a friendly word, it is a legal one.

It means God stepping in personally to bring judgment for what was done.

The question is not really a question, it states what is already decided.

"Avenged" ties this back to a real wrong that demands a real response.

⚖️ Visit means stepping in to judge
📜 The question states a decision already made
🎯 Avenged points to a real wrong
📖 Judgment fits exactly what was done

# Jeremiah 5:10-13
# 🏰 Take Away Her Battlements
---
## ⚔️ Go Ye Up Upon Her Walls, And Destroy: But Make Not A Full End

This command is given to the coming invading army.

"Destroy" gives real permission for serious damage to the city.

"But make not a full end" limits that permission on purpose.

God is directing this judgment carefully, not releasing pure destruction.

⚔️ Destroy commands real, serious damage
🛑 Full end sets a deliberate limit
🎯 God directs this judgment personally
📖 Even severe judgment stays controlled

## 🏰 Take Away Her Battlements: For They Are Not The LORD's

Battlements are the raised, notched sections along the top of a city wall.

They were built for soldiers to hide behind while defending the city.

Calling them "not the LORD's" means God is disowning Judah's manmade defenses.

The very structures meant to protect the city are handed over to be dismantled.

🏰 Battlements were wall top defenses
🛡️ Soldiers used them to fight back
🙅 God disowns these manmade defenses
📖 Judah's protection is handed over

## 🗺️ The House Of Israel And The House Of Judah Have Dealt Very Treacherously

Israel, the northern kingdom, had already fallen years before this.

Naming both Israel and Judah together shows the unfaithfulness was never limited to one kingdom.

"Treacherously" means betraying a relationship someone had a duty to protect.

Both halves of the covenant people share the same charge.

🗺️ Israel and Judah were both named
⏳ Israel had already fallen by now
💔 Treacherously means betraying a duty
📖 Both kingdoms share the same failure

## 🗣️ They Have Belied The LORD, And Said, It Is Not He

"Belied" means telling lies about someone, not just lying in general.

Here the lie is specifically about God's own character and plans.

"It is not he" denies that God is the one who sends judgment at all.

They were not just sinning, they were rewriting who God actually is.

🗣️ Belied means lying about someone specific
🙅 Here the lie targets God's own character
🚫 It is not he denies God sends judgment
📖 They rewrote who God actually is

## 🌬️ The Prophets Shall Become Wind, And The Word Is Not In Them

These are the false prophets who had been promising safety.

"Become wind" means their words will turn out to be empty, carrying no real substance.

"The word is not in them" states plainly that God never actually spoke through them.

Their comforting message will collapse the moment reality arrives.

🌬️ Become wind means empty words
🚫 God never actually spoke through them
🎭 Their comfort was never real
📖 Reality will collapse their message

# Jeremiah 5:14-17
# 🔥 Words Turned To Fire
---
## ⚔️ Thus Saith The LORD God Of Hosts

"Hosts" here means armies, and this title names God as their commander.

It can point to the armies of heaven, the angels, or the stars themselves.

Whatever earthly army is coming, it answers to a greater commander than any king.

This title is a reminder of real power right before real judgment is described.

⚔️ Hosts means armies under command
👼 It can mean angels or the stars
👑 Every army answers to this commander
📖 Power is named before judgment is spoken

## 🔥 I Will Make My Words In Thy Mouth Fire, And This People Wood

Jeremiah's own spoken words are compared to fire.

Judah's stubborn resistance is compared to dry wood.

Fire meeting wood does not stay contained, it consumes.

The prophecy itself becomes the instrument that carries out the judgment.

🔥 Jeremiah's words are pictured as fire
🪵 Judah is pictured as dry wood
💥 Fire meeting wood means total consumption
📖 The spoken word carries out judgment

## 🗣️ A Nation Whose Language Thou Knowest Not, Neither Understandest What They Say

This points ahead to the Babylonians, whose language was foreign to Judah.

Not being able to understand your captors adds a real layer of fear.

There would be no shared words to plead with or reason with them.

The invasion would feel completely foreign, not like a fight between neighbors.

🗣️ The invaders spoke an unfamiliar language
😨 Not understanding them added real fear
🚫 There was no shared language to plead with
📖 This invasion would feel completely foreign

## 🏹 Their Quiver Is As An Open Sepulchre

A quiver is the case a soldier carries arrows in.

A sepulchre is a tomb, a place built to hold the dead.

Comparing a full quiver to an open grave pictures certain, waiting death.

Every arrow drawn from it was already aimed at someone's ending.

🏹 A quiver holds a soldier's arrows
⚰️ A sepulchre is a tomb for the dead
💀 The comparison pictures certain death waiting
📖 Every arrow was aimed at an ending

## 🌾 They Shall Eat Up Thine Harvest, And Thy Bread

This verse lists exactly what the invading army would take.

The harvest and daily bread meant survival for ordinary families.

Flocks, herds, vines, and fig trees represented years of patient labor.

This was the complete removal of a nation's entire food supply.

🌾 Harvest and bread meant daily survival
🐑 Flocks and herds meant years of labor
🍇 Vines and fig trees took years to grow
📖 This removed the nation's entire food supply

# Jeremiah 5:18-19
# 🌍 Serve Strangers In A Land Not Yours
---
## 🔁 Nevertheless In Those Days, Saith The LORD, I Will Not Make A Full End With You

This promise repeats a limit God already set earlier in the book.

Even in the middle of real judgment, total destruction is ruled out again.

The same phrase appears again later for those who end up carried off to Babylon.

Severe judgment and a future are being held together on purpose.

🔁 This limit repeats an earlier promise
🛑 Total destruction is ruled out again
🌍 The same promise returns for the exiles
📖 Judgment and a future stay linked

## ❓ When Ye Shall Say, Wherefore Doeth The LORD Our God All These Things Unto Us?

God already knows the question the people will eventually ask.

That question comes later, after the disaster has already happened.

Putting the future question in their mouths now shows judgment is not random.

There will be a clear, specific answer waiting when they finally ask it.

❓ God anticipates their future question
⏳ The question comes after disaster strikes
🎯 This shows judgment has a clear reason
📖 An answer is already prepared for them

## 🔄 Like As Ye Have Forsaken Me, And Served Strange Gods In Your Land, So Shall Ye Serve Strangers In A Land That Is Not Yours

This judgment is shaped to match the sin exactly.

Judah served foreign gods it did not need to serve.

In exile, Judah would serve foreign masters in a country that was not home.

The punishment fits the choice so closely that it becomes its own explanation.

🔄 Judgment mirrors the sin exactly
🛐 They served gods they did not need
⛓️ Exile served masters in a foreign land
📖 The punishment explains itself

# Jeremiah 5:20-25
# 👂 Eyes That Do Not See
---
## 👴 Declare This In The House Of Jacob, And Publish It In Judah

Jacob was the patriarch later renamed Israel by God.

Using his original name here reaches back to the very start of the covenant family.

Pairing "house of Jacob" with "Judah" addresses the whole covenant people again.

This message was never aimed at only one kingdom.

👴 Jacob was the covenant family's patriarch
🔄 His name was later changed to Israel
🤝 Jacob and Judah together mean everyone
📖 No kingdom was left out of this message

## 👁️ Which Have Eyes, And See Not: Which Have Ears, And Hear Not

This is not describing blindness or deafness in a physical sense.

It describes people who refuse to respond to what they clearly perceive.

The same idiom appears elsewhere in scripture for the same kind of willful refusal.

Working senses do nothing if the will behind them refuses to act.

👁️ This is not physical blindness
🙉 It describes willful refusal to respond
📚 The same idiom appears elsewhere in scripture
📖 Working senses cannot fix a closed will

## 🌊 Which Have Placed The Sand For The Bound Of The Sea By A Perpetual Decree

God set the shoreline as a permanent boundary the ocean cannot cross.

This was common knowledge to anyone who lived near the coast.

The sea has no will of its own and still keeps this limit perfectly.

Creation itself is presented as more obedient than the people God is speaking to.

🌊 God set the shoreline as a fixed limit
🏖️ Sand marks a boundary the sea cannot cross
🌀 The sea has no will of its own
📖 Creation obeys more readily than the people

## 🌊 Though The Waves Thereof Toss Themselves, Yet Can They Not Prevail

Storms can make the sea look wild and uncontrollable.

Even at its most violent, the sea still stops exactly where it was told to stop.

This continues the point that even chaos obeys God's fixed decree.

People with real freedom to choose refuse what the sea cannot even attempt to break.

🌊 Storms make the sea look uncontrollable
🛑 Even then, the sea stops on command
⚖️ Chaos still obeys God's decree
📖 People refuse what the sea cannot break

## 🔀 This People Hath A Revolting And A Rebellious Heart

"Revolting" here does not mean disgusting the way the word is often used today.

It means turning away or rebelling, matching the word right next to it.

Pairing it with "rebellious" doubles down on the same single idea.

The contrast with the obedient sea just described makes the failure sharper.

🔀 Revolting here means rebelling, not disgusting
🔁 Rebellious repeats the idea for emphasis
🌊 The sea obeys while the people rebel
📖 The contrast makes the failure sharper

## 🌧️ That Giveth Rain, Both The Former And The Latter, In His Season

Israel's farming year depended on two separate rainy seasons.

The former rain fell in autumn and softened the ground for planting.

The latter rain fell in spring and ripened the crops before harvest.

Both were necessary, and both came from God on a reliable schedule.

🌧️ Former rain came in autumn for planting
🌦️ Latter rain came in spring for ripening
📅 Both followed a reliable yearly schedule
📖 Reliable rain was a direct gift from God

## 📅 He Reserveth Unto Us The Appointed Weeks Of The Harvest

The harvest followed a fixed calendar that people could count on every year.

"Reserveth" means God kept this schedule in place on purpose.

This steady provision sat right next to a people who still would not fear him.

Faithful provision and a faithless response are placed side by side here.

📅 The harvest followed a fixed calendar
🎯 Reserveth means God kept it in place
🎁 This was steady, ongoing provision
📖 Faithful provision met a faithless response

## ❓ Your Iniquities Have Turned Away These Things, And Your Sins Have Withholden Good Things From You

This verse answers a question no one has asked yet, why the rain or harvest might fail.

"Turned away" and "withholden" both describe something being cut off on purpose.

Their own sin is named as the direct cause, not chance or circumstance.

Good things were available and were forfeited, not simply withheld at random.

❓ This answers an unasked question in advance
🚫 Turned away means cut off on purpose
🎯 Their own sin is named as the cause
📖 Good things were forfeited, not withheld randomly

# Jeremiah 5:26-29
# 🪶 A Cage Full Of Birds
---
## 🪤 They Lay Wait, As He That Setteth Snares

A snare is a hidden trap used to catch birds or small animals.

Hunters set snares and waited quietly for a victim to wander in.

This verse takes that hunting image and applies it to people preying on other people.

The trap here is dishonest dealing, not physical rope or wire.

🪤 A snare is a hidden hunting trap
🤫 Hunters waited quietly for a victim
👥 Here the victims are other people
📖 Dishonesty became the actual trap

## 🪶 As A Cage Is Full Of Birds, So Are Their Houses Full Of Deceit

A birdcage packed full of trapped birds is a vivid, specific picture.

Their homes are described as just as full, only packed with deceit instead.

"Waxen rich" means they grew wealthy specifically because of that deceit.

Every gain pictured here came at someone else's expense.

🪶 A packed birdcage is the picture used
🏠 Their houses were just as full of deceit
💰 Waxen rich means wealth gained through it
📖 Every gain came at someone's expense

## 💪 They Are Waxen Fat, They Shine

"Waxen fat" describes visible, comfortable prosperity.

"They shine" adds a sense of health and confidence on display.

This description sits right next to warnings of coming siege and famine.

Prosperity built on injustice was never going to last as long as it looked like it would.

💪 Waxen fat means visible prosperity
✨ They shine adds health and confidence
⚔️ This sits beside warnings of famine
📖 Injustice built prosperity that could not last

## ⚖️ They Judge Not The Cause, The Cause Of The Fatherless

"Cause" here means a legal case brought before a judge.

Fatherless meant orphans, one of the most vulnerable groups in this society.

God's law repeatedly commanded special protection for orphans and widows.

These judges skipped exactly the cases that needed the most care.

⚖️ Cause means a legal case in court
🧒 Fatherless meant orphans specifically
📜 God's law commanded their protection
📖 The most vulnerable were skipped first

## 🔁 Shall I Not Visit For These Things? Saith The LORD: Shall Not My Soul Be Avenged On Such A Nation As This?

This exact line already appeared earlier in the chapter, back in verse 9.

Repeating it word for word frames everything in between as one continuous case.

Idolatry opened the chapter, and injustice toward the poor closes this section.

Both counted as the same kind of offense against God.

🔁 This line repeats verse 9 exactly
📚 It frames the whole section as one case
🛐 Idolatry and injustice are named together
📖 Both counted as the same offense

# Jeremiah 5:30-31
# 😱 What Will Ye Do In The End
---
## 😲 A Wonderful And Horrible Thing Is Committed In The Land

"Wonderful" here does not carry its modern meaning of good or delightful.

It means astonishing, something that stops people in their tracks with shock.

Pairing it with "horrible" makes clear this astonishment is over something terrible.

The very next verse names exactly what this shocking thing is.

😲 Wonderful here means astonishing, not good
💔 Horrible confirms the shock is over evil
🎯 The pairing sharpens the reaction
📖 The next verse names the thing itself

## 🗣️ The Prophets Prophesy Falsely, And The Priests Bear Rule By Their Means

False prophets were making up comforting messages instead of speaking for God.

"The priests bear rule by their means" means the priests took their direction from those same false prophets.

Two groups meant to guide the nation honestly were feeding off each other's lies instead.

Corrupt leadership had become a closed loop.

🗣️ Prophets made up comforting lies
📿 Priests took direction from those lies
🔄 Both groups fed off each other
📖 Leadership had become a closed loop

## 💔 My People Love To Have It So

This is the most damning line in the whole chapter.

It does not blame leaders alone for forcing lies onto an innocent population.

The people themselves preferred comfortable lies over the hard truth.

Willing participation, not simple deception, is named as the real problem.

💔 This is the chapter's most damning line
🙅 It does not blame leaders alone
🙋 The people preferred comfortable lies
📖 Willing participation was the real problem

## ❓ What Will Ye Do In The End Thereof?

This question closes the chapter without offering an answer.

It echoes earlier questions in the chapter about what people will do when disaster lands.

No plan, no ally, and no excuse has held up anywhere in this chapter.

The chapter ends leaving that question hanging in the air on purpose.

❓ This question closes the chapter unanswered
🔁 It echoes earlier questions in the chapter
🚫 No plan or excuse has held up
📖 The question is left hanging on purpose
`.trim();

export const JEREMIAH_FIVE_PERSONAL_SECTIONS = parseJeremiahFiveRawNotes(JEREMIAH_FIVE_RAW_NOTES);
