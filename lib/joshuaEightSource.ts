export type JoshuaEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaEightRawNotes(rawText: string): JoshuaEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 8:${startVerse}` : `Joshua 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Joshua 8 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_EIGHT_RAW_NOTES = `# Joshua 8:1-2
# 😨 Fear Not, Go Up To Ai
---
## 😨 Fear Not, Neither Be Thou Dismayed

God speaks to Joshua right after the failure at Ai in the last chapter.

Fear and dismayed both describe the same kind of panic.

Israel already lost this exact battle once before.

God does not scold Joshua for feeling afraid.

He simply commands him to move forward anyway.

😨 Fear and dismayed both mean panic

💔 Israel already lost this battle once

🗣️ God commands action instead of blame

📖 Courage means moving forward while still afraid

## 🪖 Take All The People Of War With Thee

This time Joshua takes the entire army with him.

Chapter seven sent only about three thousand men.

That small force ended in a painful defeat.

Israel is not repeating the same mistake twice.

This second attempt corrects what went wrong before.

🪖 The whole army goes this time

🔢 Chapter seven sent only three thousand men

❌ That small force ended in defeat

📖 God corrects the mistake, not just Joshua

## 🎯 I Have Given Into Thy Hand The King Of Ai

God states the victory as already settled before the battle even starts.

The king, his people, his city, and his land are all named.

Nothing is left uncertain in this promise.

Joshua still has to march, fight, and plan the ambush himself.

God's certainty does not remove the need for Joshua to act.

🎯 God names the victory before it happens

👑 The king, people, city, and land are named

💪 Joshua still has to act and plan

📖 Certain promises still call for real obedience

## 🐑 The Spoil Thereof Shall Ye Take For A Prey

At Jericho, everything was devoted to God and nobody could keep anything.

That rule is now different for the city of Ai.

Cattle and goods can be kept by the people this time.

Achan died in chapter seven for taking Jericho's forbidden spoil.

This new permission removes the very temptation that destroyed him.

🐑 Jericho required total destruction, nothing kept

🔄 Ai allows the people to keep spoil

⚖️ This directly answers Achan's failure in chapter seven

📖 God removes the exact temptation Achan faced

# Joshua 8:3-9
# 🌙 Joshua Lays The Ambush
---
## 🪤 Lay Thee An Ambush For The City

An ambush means hiding a force out of sight until the enemy is exposed.

This is the opposite of the direct frontal attack that failed before.

Joshua is now using strategy instead of simple force.

Warfare in the ancient world relied heavily on surprise and terrain.

🪤 Ambush means a hidden, surprise attack

🔁 This time Joshua uses strategy, not just force

🗺️ Terrain and surprise mattered in ancient warfare

📖 Wisdom, not just courage, wins this battle

## 🪖 Thirty Thousand Mighty Men Of Valour

Mighty men of valour describes trained, capable fighters, not raw recruits.

Thirty thousand is ten times the force sent to Ai in chapter seven.

The size of this army shows Joshua has learned from the earlier defeat.

Careful preparation now replaces the overconfidence that caused the first loss.

🪖 Valour means trained, capable fighters

🔟 Ten times the force sent before

📈 The size shows real preparation this time

📖 Overconfidence is replaced with careful planning

## 🌙 Sent Them Away By Night

Moving thirty thousand men at night kept the plan hidden from Ai's watchers.

Darkness let the ambush force reach its hiding place unseen.

Secrecy was the whole point of this entire strategy.

One spotted soldier could have ruined the trap before it began.

🌙 Night movement kept the plan hidden

👁️ Ai's watchers could not see them travel

🤫 Secrecy protected the whole strategy

📖 One mistake could have ruined the trap

## 🚶 Go Not Very Far From The City

Joshua gives exact instructions, not a vague general plan.

The ambush force had to stay close enough to strike quickly.

Too far away and they would arrive too late to trap the enemy.

Good leadership plans the small details, not just the big idea.

🚶 The instructions were exact, not vague

⏱️ Staying close allowed a fast strike

⚠️ Too far away would ruin the timing

📖 Strong leaders plan the small details too

## 🏃 We Will Flee Before Them

Joshua plans to lead the main army in a fake retreat.

This decoy is meant to pull every fighting man out of Ai.

A fake retreat only works if the enemy actually believes it.

Joshua is staking the whole plan on Ai's overconfidence.

🏃 Joshua plans a fake retreat

🎣 The decoy is meant to empty the city

🎭 The trick only works if Ai believes it

📖 The plan depends on the enemy's overconfidence

## 😏 They Flee Before Us, As At The First

This line points straight back to Israel's real defeat in chapter seven.

Joshua expects Ai's men to remember that first victory and grow careless.

Their own past success is about to become their downfall.

Pride in an old win can blind a person to a new danger.

😏 This recalls Israel's real defeat in chapter seven

🧠 Ai is expected to remember that old win

📉 Their past success becomes their downfall

📖 Old pride can blind a person completely

## ⏰ Rise Up From The Ambush

Timing was everything in this plan, and Joshua names the exact signal.

The hidden men could not act too early or too late.

Rising up too soon would expose the trap before Ai left the city.

Every soldier had to trust the plan and wait for the moment.

⏰ Timing was the key to the whole plan

🚫 Acting too early would expose the trap

⏳ Every soldier had to wait for the signal

📖 Trust and patience were part of the strategy

## 🔥 Ye Shall Set The City On Fire

Fire made the ambush impossible to miss from anywhere on the battlefield.

Smoke rising from Ai would be the signal for the rest of Israel's army.

Burning the city also carried out the destruction God commanded for Ai.

This single act served as both a military signal and an act of judgment.

🔥 Fire was impossible to miss from far away

📡 Smoke became the signal to the whole army

⚖️ Burning the city also carried out judgment

📖 One act served both strategy and obedience

## 🗣️ See, I Have Commanded You

Joshua closes his instructions the same way God opened this chapter, with a command.

He wants total precision, not soldiers improvising in the middle of battle.

Every man needed to know exactly what was expected of him.

Clear orders were part of what chapter seven's failure had been missing.

🗣️ Joshua closes with a firm command

🎯 He wants precision, not improvising

📋 Every soldier knew exactly what to do

📖 Clear orders were missing in the earlier failure

## 🏔️ Abode Between Bethel And Ai

Bethel means house of God, the place Jacob once saw a ladder to heaven.

Ai sat close enough to Bethel that both cities could join forces.

Hiding between them let Israel's ambush strike either city if needed.

The location carried meaning far beyond simple military positioning.

🏔️ Bethel means house of God

🪜 Jacob saw a ladder to heaven there

🗺️ Ai and Bethel sat close together

📖 A holy place now hides a battle plan

## 🌙 Joshua Lodged That Night Among The People

Joshua does not send his army out and stay behind in safety.

He sleeps among the ordinary soldiers the night before the battle.

A leader who shares the risk earns the trust of the people he leads.

This detail quietly shows the kind of leader Joshua actually is.

🌙 Joshua slept among his own soldiers

🛡️ He shared the risk, not just the orders

🤝 Shared risk builds real trust

📖 True leadership shows up in small details

# Joshua 8:10-13
# ⛰️ Positioning For The Trap
---
## 📋 Numbered The People

Numbering the people meant taking a careful count before marching into battle.

Every soldier's presence mattered for a plan this precise.

An army moving out for an ambush cannot afford confusion in its ranks.

This step shows careful preparation instead of a rushed attack.

📋 Numbering meant a careful headcount

🎯 Every soldier mattered for this precise plan

🚫 Confusion in the ranks could ruin the ambush

📖 Careful preparation replaces a rushed attack

## 🧑‍🤝‍🧑 He And The Elders Of Israel

Joshua marches at the very front of the army, not from behind.

The elders, Israel's respected tribal leaders, march there with him.

Leadership walking first was a visible statement of shared risk.

The people could see exactly who was willing to lead them into danger.

🧑‍🤝‍🧑 Joshua marched at the front, not behind

👴 The elders were Israel's respected tribal leaders

👀 Leadership was visible to the whole army

📖 Shared risk is stronger than spoken command

## 🗺️ A Valley Between Them And Ai

The valley created a natural gap between Israel's main camp and the city.

This open ground is exactly where the coming battle would take place.

Israel camped in plain sight, which was part of the plan.

Ai needed to see this army in order to take the bait.

🗺️ The valley separated the two camps

⚔️ This ground became the battlefield

👁️ Israel camped where Ai could see them

📖 Being seen was part of the strategy

## 🔢 About Five Thousand Men

This second group of five thousand joins the thirty thousand already sent ahead.

Some readers wonder if this restates the earlier number or adds to it.

The text does not fully explain how the two groups worked together.

What is clear is that Joshua split his forces with real precision.

🔢 A second group of five thousand men

❓ The text leaves the exact split unclear

🎯 Both groups worked with real precision

📖 Not every detail needs a full explanation

## 🌙 Into The Midst Of The Valley

Joshua does not stay safely behind his troops during this final setup.

He personally walks into the open valley between the two armies.

This puts him closer to danger than almost anyone else that night.

A leader willing to stand in the gap inspires real confidence.

🌙 Joshua walked into the open valley himself

⚠️ This placed him closest to the danger

🧍 He did not hide behind his troops

📖 Leaders who stand in the gap earn trust

# Joshua 8:14-17
# 🏃 Ai Falls For The Trap
---
## ⏰ Hasted And Rose Up Early

The king of Ai reacts the moment he sees Israel's army in the valley.

He rushes out to fight without waiting or checking for danger.

Speed feels like strength, but here it becomes his fatal mistake.

Confidence built on one earlier win made him careless this time.

⏰ The king rushed out immediately

⚡ Speed felt like strength to him

❌ His rush became a fatal mistake

📖 Confidence from one win made him careless

## 🙈 He Wist Not That There Were Liers In Ambush

Wist is an old word that simply means knew.

The king had no idea thirty thousand men were hiding behind his own city.

He was completely focused on the smaller force in front of him.

What he could not see was about to destroy everything he had.

🙈 Wist is an old word for knew

👁️ He never saw the hidden army

🎯 He focused only on the force in front

📖 What went unseen decided the whole battle

## 🎭 Made As If They Were Beaten Before Them

Joshua's army fakes a retreat exactly as planned back in verse five.

Every soldier had to act convincingly for the trick to work.

This was not real fear, it was a rehearsed strategy playing out.

The same road Israel once truly fled on is now the bait.

🎭 The retreat was fake, not real fear

🎬 Every soldier had to act convincingly

🛣️ The real defeat's road becomes the bait

📖 A rehearsed plan is unfolding exactly as designed

## 📣 Called Together To Pursue After Them

Every fighting man in Ai leaves the city to chase the fleeing decoy.

This is the exact outcome the entire ambush was designed to create.

An empty city is now completely unprotected behind them.

The trap only works because the bait was believable enough to trust.

📣 Every fighting man in Ai joined the chase

🎯 This was the exact outcome Joshua planned

🏚️ The city was left completely unprotected

📖 A believable trap draws its enemy in fully

## 🚪 Not A Man Left In Ai Or Bethel

Bethel's men joined this chase alongside the men of Ai.

This detail shows the two cities were allies, not just neighbors.

Every single available fighter from both places is now away from home.

The trap has worked more completely than Joshua could have guarded against.

🚪 Bethel's men joined the chase too

🤝 The two cities were close allies

🏃 Every fighter from both places left home

📖 The trap worked beyond what was even planned

## 🏚️ They Left The City Open

An open, undefended city was the entire point of the fake retreat.

Nobody remained behind to notice thirty thousand soldiers approaching from hiding.

The overconfidence born from chapter seven's victory blinded them completely.

Ai is about to lose everything because it trusted an old win.

🏚️ The city sat completely undefended

👀 Nobody noticed the hidden army approaching

💭 Old confidence blinded them completely

📖 Trusting a past win can cost everything

# Joshua 8:18-23
# 🔥 The Spear And The Fire
---
## 🗡️ Stretch Out The Spear Toward Ai

God gives Joshua a specific physical signal to start the final attack.

This echoes Moses stretching out his rod and hand during the battle with Amalek.

A simple raised weapon becomes the trigger for God's promised victory.

The same pattern appears again, obedience paired with a visible sign from God.

🗡️ A raised spear signals the attack

🙌 This echoes Moses and the battle with Amalek

⚡ A simple sign triggers God's promised victory

📖 Obedience and a visible sign work together

## 🏃 The Ambush Arose Quickly

The hidden thirty thousand men had been waiting for this exact moment.

They move the instant Joshua's hand goes up, with no hesitation.

Weeks or days of careful planning come down to a single second.

Disciplined waiting is what made this fast, decisive strike possible.

🏃 Thirty thousand men moved instantly

⏱️ No hesitation once the signal came

📆 Careful planning led to one decisive second

📖 Patience made a fast strike possible

## 🏰 Entered Into The City, And Took It

With every defender gone, the hidden army walks into an empty city.

There was no fight left to win because Ai had already emptied itself.

The real battle had already been decided back when the trap was set.

Sometimes victory is won long before the final moment of action.

🏰 The city had no defenders left

🚶 The ambush walked in unopposed

🎯 The battle was decided before this moment

📖 Some victories are won before the final action

## 💨 The Smoke Of The City Ascended Up To Heaven

Smoke rising from Ai now becomes visible to everyone on the battlefield.

This is the exact signal Joshua promised back in verse eight.

Both the fleeing army and the pursuing men of Ai see it at once.

One column of smoke changes the entire shape of the battle instantly.

💨 Smoke became visible to everyone at once

📡 This was the signal promised in verse eight

👀 Both sides saw it at the same moment

📖 One signal changed the whole battle instantly

## 🚫 No Power To Flee This Way Or That Way

The men of Ai suddenly realize their own city is already burning.

Running home is no longer an option, and running forward means facing Israel.

They are trapped between two forces with nowhere left to go.

The very plan they trusted has become the trap that destroys them.

🚫 Their own city was already burning

⚔️ They were trapped between two forces

🏃 There was nowhere left to run

📖 Their own trusted plan became their trap

## 🔄 They Turned Again, And Slew The Men Of Ai

The fleeing decoy army instantly stops running and turns to fight.

This is the exact reversal the entire ambush was designed to create.

What looked like weakness only seconds earlier is now full strength.

A planned retreat and a real counterattack look identical from a distance.

🔄 The fake retreat instantly became an attack

🎯 This reversal was the plan's whole purpose

💪 Weakness became strength in a single moment

📖 A planned move can look like real defeat

## ⚔️ In The Midst Of Israel, Some On This Side

Ai's remaining soldiers are now surrounded on every side at once.

One force comes from the burning city behind them.

Another force turns back from the road in front of them.

There is no direction left that does not lead straight to Israel's army.

⚔️ Ai's soldiers were surrounded completely

🔥 One army came from the burning city

🛣️ Another turned back from the road ahead

📖 Every direction now led to defeat

## 👑 The King Of Ai They Took Alive

Unlike his soldiers, the king of Ai is captured rather than killed in battle.

Keeping a defeated king alive was a way to control his final fate publicly.

His capture sets up the public judgment that comes later in the chapter.

Nothing about his ending will happen quietly or in secret.

👑 The king was captured, not killed in battle

🎯 Keeping him alive controlled his fate publicly

⚖️ His capture sets up a later judgment

📖 Nothing about his ending stays hidden

# Joshua 8:24-29
# ⚔️ Total Destruction Of Ai
---
## 🌾 Fallen On The Edge Of The Sword

Israel finishes the battle out in the open field where the chase happened.

The edge of the sword is an old way of describing close hand to hand combat.

This was not a distant or bloodless victory for either side.

The battle described here was brutal, direct, and physically fought.

🌾 The battle ended out in the open field

⚔️ Edge of the sword means close combat

😔 This was not a distant, easy fight

📖 Real victories often came at a real cost

## 🔢 Twelve Thousand, Even All The Men Of Ai

This exact number stands in sharp contrast to Israel's small losses in chapter seven.

Every single fighting man of the city is included in this count.

Ai's population, judging by this number, was a small city, not a major power.

The size of the defeat matches the size of the city's earlier confidence.

🔢 Twelve thousand covered every man of Ai

📉 This contrasts sharply with chapter seven's losses

🏙️ Ai was a small city, not a power

📖 The defeat matched the size of their pride

## ✊ Joshua Drew Not His Hand Back

Joshua holds the spear up for the entire length of the battle.

This mirrors Moses holding up his hand throughout the fight with Amalek.

Lowering his arm too soon could have changed the outcome of the fight.

Sustained obedience, not just a single moment of it, carried this victory.

✊ Joshua held the spear the whole battle

🙌 This mirrors Moses during the fight with Amalek

⏳ Lowering it early could have changed the outcome

📖 Sustained obedience carried this victory

## 💰 According Unto The Word Of The LORD

Israel finally keeps the cattle and goods exactly as God permitted in verse two.

This is the same kind of plunder that destroyed Achan one chapter earlier.

The difference this time is that God specifically allowed it.

Obedience is not about avoiding all spoil, it is about following the actual command.

💰 The people kept the spoil as permitted

⚖️ The same kind of plunder destroyed Achan before

✅ This time God specifically allowed it

📖 Obedience means following the command, not guessing

## 🏚️ An Heap For Ever, Even A Desolation

The name Ai itself likely means heap of ruins in the original language.

Joshua burns the city until its own name becomes literally true.

This detail is easy to miss without knowing what the name Ai meant.

The judgment on this city matched its name with painful precision.

🏚️ Ai likely means heap of ruins

🔥 Joshua made the city's own name come true

📖 The judgment matched the meaning of the name

➡️ Names in scripture often carry hidden weight

## 🌳 Hanged On A Tree Until Eventide

Hanging a defeated king's body publicly was a common way to display total victory.

Eventide simply means evening, the time the body was required to come down.

Israel's law elsewhere required a hanged body to be removed before nightfall.

Even in total judgment, this practice still followed a set boundary.

🌳 A hanged body publicly displayed the victory

🌇 Eventide means evening, when it came down

📜 Israel's law required removal before nightfall

📖 Even harsh judgment followed a set limit

## 🪨 A Great Heap Of Stones

Piling stones over the king's body created a permanent, visible marker.

Anyone traveling past this spot afterward would know exactly what had happened there.

Ancient people often marked major events with stone piles instead of written signs.

The stones spoke for a story that had no other lasting record.

🪨 Stones created a permanent, visible marker

🚶 Travelers would recognize what happened there

📍 Stone piles worked like ancient signs

📖 Silent stones preserved a story permanently

# Joshua 8:30-35
# 📜 The Altar On Mount Ebal
---
## 🏔️ An Altar Unto The LORD In Mount Ebal

After a violent battle, Joshua immediately turns to build a place of worship.

Mount Ebal sat far from the battlefield, requiring a real journey to reach it.

This altar fulfills a specific command Moses gave back in Deuteronomy.

Worship, not conquest, becomes the very next priority after the victory.

🏔️ Joshua traveled to Mount Ebal to worship

📜 Moses had commanded this altar in Deuteronomy

⚔️ Worship immediately followed a violent battle

📖 Victory was followed by obedience, not celebration

## 🔨 No Man Hath Lift Up Any Iron

Iron tools were normally used to shape and smooth building stones.

This altar was built from uncut, natural stones instead.

Iron was also the material used to make weapons of war.

Keeping human tools of war away from the altar kept worship untouched by violence.

🔨 Iron tools were left completely unused

🪨 The altar used natural, uncut stones

⚔️ Iron was also the metal of weapons

📖 Worship stayed untouched by the tools of war

## 🔥 Burnt Offerings, And Peace Offerings

A burnt offering was completely consumed by fire as a full gift to God.

A peace offering was partly burned and partly shared in a meal.

Together these two offerings expressed both total devotion and restored fellowship.

Israel worshiped through both giving everything and sharing a meal together.

🔥 Burnt offerings were fully consumed by fire

🍽️ Peace offerings were partly shared in a meal

🙏 Together they expressed devotion and fellowship

📖 Worship included both giving and sharing

## ✍️ A Copy Of The Law Of Moses

Joshua physically writes out the law on the stones of the altar.

This made God's covenant something visible and permanent, not just spoken aloud.

Anyone who could read would be able to see the law for themselves.

A carved record could not be quietly forgotten or reworded later.

✍️ Joshua wrote the law onto the stones

👀 This made the covenant visible, not just spoken

📖 Anyone could read the law for themselves

➡️ A carved record could not be forgotten

## ⛰️ Half Toward Gerizim, And Half Toward Ebal

Gerizim and Ebal are twin mountains that sit across a valley from each other.

The valley between them formed a natural amphitheater for a huge crowd.

Six tribes stood on each mountain, following Moses' instructions from Deuteronomy twenty seven.

Every person present could hear the words carried across that open space.

⛰️ Gerizim and Ebal sit across one valley

🎤 The valley formed a natural amphitheater

👥 Six tribes stood on each mountain

📖 The whole nation could hear at once

## 🌍 As Well The Stranger As He That Was Born Among Them

Stranger here refers to foreigners who had joined Israel's camp.

They stood alongside native born Israelites for this entire ceremony.

This came right after a chapter that ended with total destruction of a city.

The same law that judged Canaan's sin also welcomed outsiders into its promises.

🌍 Stranger means a foreigner living among Israel

🤝 They stood alongside native born Israelites

⚖️ This follows a chapter of total judgment

📖 The same law judged sin and welcomed outsiders

## 📖 The Blessings And The Cursings

Deuteronomy twenty seven and twenty eight recorded these exact blessings and curses in advance.

Joshua now reads them aloud in the very place Moses had commanded.

Every person present hears clearly what obedience and disobedience will bring.

Nobody in Israel could later claim they never knew the terms of the covenant.

📖 Deuteronomy recorded these blessings and curses in advance

🗣️ Joshua read them aloud exactly as commanded

👂 Every person heard the terms clearly

➡️ No one could claim ignorance later

## 👨‍👩‍👧‍👦 The Women, And The Little Ones, And The Strangers

This covenant reading included every single person in the entire camp.

Women, children, and foreigners were not left out of this moment.

God's law was never meant to be understood only by soldiers or leaders.

The whole community shared equal responsibility for what they had just heard.

👨‍👩‍👧‍👦 Every person in the camp was included

👶 Women, children, and foreigners all heard it

🚫 The law was not just for leaders

📖 The whole community shared this responsibility
`.trim();

export const JOSHUA_EIGHT_PERSONAL_SECTIONS = parseJoshuaEightRawNotes(JOSHUA_EIGHT_RAW_NOTES);
