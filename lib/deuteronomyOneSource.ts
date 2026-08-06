export type DeuteronomyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyOneRawNotes(rawText: string): DeuteronomyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 1:${startVerse}` : `Deuteronomy 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 1 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_ONE_RAW_NOTES = `# Deuteronomy 1:1-5
# 🗣️ Moses Begins To Speak
---
## 🗣️ These Be The Words Which Moses Spake

"Deuteronomy" comes from a Greek phrase meaning second law.

This whole book is Moses speaking, not a narrator describing action.

Everything from here through chapter thirty four is Moses teaching the law again to a new generation.

The first generation that left Egypt did not survive to hear it.

📖 Deuteronomy means second law

🗣️ Moses speaks the whole book aloud

👥 A new generation needs the teaching repeated

➡️ Moses is retelling the story before he dies

## 🗺️ On This Side Jordan In The Wilderness

This phrase locates Israel's whole camp east of the Jordan River.

They have not yet crossed into the promised land itself.

The wilderness here refers to the plains of Moab, Israel's final camp before Joshua leads the crossing.

🗺️ On this side Jordan means the east bank

🚫 Israel has not crossed in yet

🏕️ This is the final camp before Joshua leads

📖 The wilderness here means the plains of Moab

## 🗺️ Between Paran, And Tophel, And Laban, And Hazeroth, And Dizahab

These five names mark wilderness stops along Israel's forty year route.

Paran and Hazeroth already appear earlier in Numbers as real campsites.

Tophel, Laban, and Dizahab are mentioned only here in the whole Bible.

🗺️ Five places mark the wilderness route

📜 Paran and Hazeroth appear back in Numbers

❓ Three names appear only in this verse

📖 The list itself shows a long scattered journey

## 🏔️ Eleven Days' Journey From Horeb By The Way Of Mount Seir Unto Kadeshbarnea

Horeb is another name for Mount Sinai, used often throughout Deuteronomy.

Mount Seir is the hill country of Edom, a natural route north toward Canaan.

Walking that direct route normally took only eleven days.

Israel is about to hear that same trip actually took forty years.

🏔️ Horeb is another name for Sinai

🧭 Mount Seir is Edom's hill country

🚶 Eleven days was the direct walking time

📖 Forty years replaced an eleven day walk

## 📆 In The Fortieth Year, In The Eleventh Month, On The First Day Of The Month

This date places the whole book at the very end of the wilderness years.

Moses will die before this same fortieth year is over.

Every word that follows in Deuteronomy is spoken in this last narrow window of time.

📆 This date sits at the very end

⏳ Moses has only weeks left to live

🗣️ Every remaining word is spoken in this window

📖 Deuteronomy is Moses racing against his own death

## ⚔️ Slain Sihon The King Of The Amorites

Sihon and Og were two Amorite kings defeated just before this speech, back in Numbers twenty one.

Both battles happened east of the Jordan, on the very ground Israel now stands on.

Later chapters remember Og as the last surviving giant king in the region.

⚔️ Sihon and Og were recently defeated kings

📍 Both battles happened east of the Jordan

👹 Og is remembered as a giant king

📖 Fresh victories build confidence before Moses teaches

## 📖 Began Moses To Declare This Law

Declare means far more than simply reading the law out loud again.

It carries the sense of explaining and applying it clearly.

The generation gathered here was mostly too young to have heard it directly at Sinai.

📖 Declare means explain, not just recite

👶 Most listeners were too young for Sinai

🧑‍🏫 Moses teaches, he does not just repeat

➡️ This whole book is that explanation

# Deuteronomy 1:6-8
# 🏔️ Leaving Horeb
---
## 🏔️ Ye Have Dwelt Long Enough In This Mount

Israel had camped at the base of Sinai for about a year.

During that year they received the law and built the tabernacle.

God's own words admit that a full year in one place was already more than enough.

The mountain stop was never meant to be Israel's permanent home.

🏔️ Israel camped at Sinai about a year

⛺ The tabernacle was built during that year

🚶 God says the camping is now over

➡️ The mountain was only ever a stop

## 🧭 Turn You, And Take Your Journey

This is a direct, literal marching order.

Turn away from Horeb and start moving north toward Canaan.

After a full year of standing still, the command itself must have felt like relief and fear at once.

🧭 Turn means change direction immediately

🚶 Take your journey means start marching

⛰️ Horeb sits behind them now

➡️ Standing still is officially over

## 🗺️ Unto All The Places Nigh Thereunto, In The Plain, In The Hills, And In The Vale, And In The South, And By The Sea Side

God names every kind of terrain Israel will inherit, not just one region.

The plain and the vale describe lowland and valley ground.

The south points toward the dry desert region later called the Negev.

By the sea side reaches all the way to the Mediterranean coast.

🗺️ God names every kind of terrain

🌄 Plain and vale mean lowland and valley

🏜️ The south points toward the Negev desert

📖 The sea side reaches the Mediterranean coast

## 🌊 Unto The Great River, The River Euphrates

This sets the promised land's furthest boundary far to the northeast.

Israel under Joshua never actually settled land that large.

Only later, under David and Solomon, did Israel's influence briefly reach toward that river.

🌊 The Euphrates marks the farthest boundary

📉 Joshua's Israel never filled this whole map

👑 David and Solomon came closest later

➡️ The promise was always bigger than one conquest

## 📜 The Land Which The LORD Sware Unto Your Fathers, Abraham, Isaac, And Jacob

This promise traces back generations before anyone in this crowd was born.

God swore this land first to Abraham, then confirmed it again to Isaac and Jacob.

Moses reminds the people that this moment is not a new plan.

It is an old promise finally coming due.

📜 The promise started with Abraham

🔁 God confirmed it again to Isaac and Jacob

⏳ This promise predates everyone listening

📖 An old promise is finally coming due

# Deuteronomy 1:9-15
# ⚖️ Appointing Judges And Captains
---
## ⚖️ I Am Not Able To Bear You Myself Alone

Moses admits a real limit here instead of pretending he could manage everything himself.

This same decision is first told in Exodus eighteen, where Moses' father in law Jethro suggests it.

Here Moses retells it in his own words, as his own honest confession.

😮‍💨 Moses admits a real limit

📜 Exodus eighteen first told this story

🗣️ Moses now tells it himself

➡️ Honest limits are not weakness

## ⭐ As The Stars Of Heaven For Multitude

This exact promise was first given to Abraham back in Genesis, that his children would outnumber the stars.

Moses points at the size of the crowd in front of him as living proof.

No one in that crowd could count every person present that day.

⭐ This promise goes back to Abraham

📈 Population growth fulfills that old promise

👀 The crowd itself is living proof

📖 Abraham's promise is now visibly true

## 🙏 The LORD God Of Your Fathers Make You A Thousand Times So Many More As Ye Are

This line sits inside parentheses in most Bibles, a brief blessing tucked inside Moses' story.

It is not a command or a law, just a prayer Moses adds in passing.

Even while explaining a hard season, Moses still stops to bless the people out loud.

🙏 This is a prayer, not a law

📖 It sits inside parentheses in the text

💬 Moses adds it while telling the story

➡️ Even hard memories can include a blessing

## ⚖️ Your Cumbrance, And Your Burden, And Your Strife

Cumbrance is an old word for a heavy, awkward weight to carry.

Moses names three separate problems here, not just one.

The sheer number of people, their needs, and their constant arguments all wore him down together.

⚖️ Cumbrance means a heavy awkward weight

🔢 Moses names three separate problems

😩 Numbers, needs, and arguments combined

📖 Leadership can wear a person down

## 🧠 Wise Men, And Understanding, And Known Among Your Tribes

Moses lists three real qualifications, not just popularity.

Wise means sound judgment.

Understanding means the ability to judge a case rightly.

Known means a trusted reputation already earned.

This was the community choosing its own leaders, not Moses picking favorites.

🧠 Wise means sound judgment

⚖️ Understanding means judging a case rightly

👥 Known means a trusted reputation

➡️ The community chose its own leaders

## ✅ The Thing Which Thou Hast Spoken Is Good For Us To Do

This is the people's actual answer, recorded here for the first time in Moses' retelling.

For once, the whole crowd agrees without arguing or complaining.

That kind of unity will not last very long in the chapters that follow.

✅ The people agree without arguing

🗣️ This is their actual recorded answer

😌 A rare moment of unity

➡️ This unity will not last long

## ✅ So I Took The Chief Of Your Tribes, Wise Men, And Known

Moses confirms he actually followed through on the process, not just planned it.

He chose from the leaders the tribes themselves had already put forward.

This detail matters because Deuteronomy often stresses that Moses kept his word.

✅ Moses followed through on the plan

👥 Leaders came from the tribes themselves

🤝 The choice was shared, not imposed

📖 Deuteronomy stresses Moses kept his word

## 🔢 Captains Over Thousands, And Captains Over Hundreds, And Captains Over Fifties, And Captains Over Tens

This structure works like a chain of command, largest group down to smallest.

A captain over a thousand answered to Moses directly.

A captain over ten only had to manage a small handful of people.

🔢 Leadership scales from a thousand down to ten

⛓️ Each level answers to the level above

👤 Smaller groups mean manageable oversight

📖 No leader carries the nation alone

## 📋 Officers Among Your Tribes

Officers describes a different role than the captains just listed.

Captains commanded and made decisions.

Officers were more like administrators, recording, organizing, and carrying out those decisions.

📋 Officers means administrators, not commanders

⚖️ Captains decided, officers carried it out

🗂️ Officers handled records and organization

➡️ Both roles kept the nation running

# Deuteronomy 1:16-18
# 👂 The Charge To Judge Rightly
---
## ⚖️ Hear The Causes Between Your Brethren

Causes here means legal disputes or complaints brought for judgment.

Judges were expected to actually listen carefully, not rush to a decision.

Brethren reminds everyone that these are disputes between fellow Israelites.

⚖️ Causes means legal disputes

👂 Judges were expected to truly listen

👥 Brethren means fellow Israelites

➡️ Careful listening comes before judgment

## 🌍 And The Stranger That Is With Him

Foreigners living among Israel received the exact same access to justice.

There was no separate, lesser court for outsiders.

This was an unusual level of fairness for the ancient world.

🌍 Stranger means a foreigner living among Israel

⚖️ Foreigners got the same access to justice

🚫 No separate lesser court existed

📖 Fair courts were unusual in that world

## 🎭 Ye Shall Not Respect Persons In Judgment

This phrase is an old idiom for favoritism.

It does not mean judges could not care about people.

It means a judge could not rule in someone's favor just because of their wealth or status.

🎭 Respect persons means show favoritism

🚫 Status could not sway a ruling

💰 Wealth was not supposed to buy justice

➡️ Fairness had to outweigh influence

## 😨 Ye Shall Not Be Afraid Of The Face Of Man

Judges were warned not to fear a powerful person's anger.

A ruling made out of fear is not a true ruling at all.

This command protected ordinary people from judges who might otherwise cave to pressure.

😨 Face of man means a powerful person

🛡️ Fear was not an excuse for injustice

👥 This protected ordinary people

➡️ True justice cannot bow to pressure

## 👑 For The Judgment Is God's

This line raises the stakes of every single ruling.

Human judges are not acting only in their own name.

They are standing in for God's own justice whenever they rule.

👑 God is the true source of justice

🧑‍⚖️ Judges act as God's representatives

⬆️ This raises the weight of every ruling

📖 Human courts answer to a higher one

## 📤 The Cause That Is Too Hard For You, Bring It Unto Me

Moses builds an appeals process into the very first court system.

Local judges handled ordinary cases themselves.

Anything too difficult could still be brought up to Moses directly.

📤 Hard cases could be appealed

🧑‍⚖️ Local judges handled ordinary cases

🪜 Moses remained the final court

➡️ Even a new system kept room for appeal

# Deuteronomy 1:19-25
# 🕵️ The Journey To Kadeshbarnea
---
## 🏜️ That Great And Terrible Wilderness

This phrase describes brutal, dangerous desert terrain.

Heat, scarce water, and few landmarks made the route genuinely dangerous.

Moses is not exaggerating for effect here.

He is describing exactly what that generation actually survived.

🏜️ Terrible describes real danger, not exaggeration

☀️ Heat and scarce water made travel hard

🧭 Few landmarks made the route risky

➡️ This generation survived a genuinely hard journey

## 📍 We Came To Kadeshbarnea

Kadeshbarnea sits on the southern edge of Canaan.

It becomes the staging point for the spy mission told in Numbers thirteen.

Later in this same chapter, it also becomes the place where a long, lost stretch of years quietly begins.

📍 Kadeshbarnea sits on Canaan's southern edge

🕵️ The spy mission launches from here

📆 Years of wandering also begin here

📖 One place, two very different outcomes

## 🏔️ The Mountain Of The Amorites

This names the hill country of southern Canaan, the first region Israel would need to take.

The Amorites were one of several peoples already living in the land God promised.

Taking the land meant confronting real nations, not settling empty ground.

🏔️ This is southern Canaan's hill country

👥 The Amorites already lived there

🎯 This was the first target region

➡️ The promised land was not empty land

## 🛡️ Fear Not, Neither Be Discouraged

God repeats this exact command more than once in Israel's story.

Joshua later hears nearly the same words when he takes over from Moses.

The command comes right alongside proof, not instead of it.

🛡️ God repeats this command elsewhere

🔁 Joshua hears nearly the same words later

📜 The command comes paired with proof

📖 Courage was never asked for blindly

## 🗣️ We Will Send Men Before Us

Here Moses recalls this as the people's own idea.

Numbers thirteen instead records God formally commanding Moses to send the spies.

Both accounts are true at once, the people asked and God then commanded it through Moses.

🗣️ The people proposed the idea here

📜 Numbers records God's formal command

🤝 Both details fit together, not against each other

➡️ A request became an official mission

## 👍 The Saying Pleased Me Well

Moses admits, in hindsight, that he liked the plan at the time.

Looking back while writing Deuteronomy, that same approval carries a trace of regret.

A good sounding idea does not always lead to a good outcome.

👍 Moses approved of the plan then

😔 Hindsight adds a trace of regret

⚠️ A good idea does not guarantee good results

➡️ Even Moses misjudged this decision

## 🔢 One Of A Tribe

Twelve men were chosen, one representative from each tribe.

This matches the same twelve names listed in Numbers thirteen.

Choosing one from every tribe made the report belong to the whole nation, not just a few voices.

🔢 Twelve men, one from each tribe

📜 This matches the list in Numbers

🤝 Every tribe had a voice in it

➡️ The report would belong to everyone

## 🍇 The Valley Of Eshcol

Eshcol itself means cluster, a fitting name for a valley famous for its grapes.

This detail comes straight from the same story told fully in Numbers thirteen.

The grapes there were large enough that two men had to carry just one cluster.

🍇 Eshcol means cluster

🗺️ It was famous for its grapes

📜 The same valley appears in Numbers

➡️ A place named for its best feature

## 👍 It Is A Good Land Which The LORD Our God Doth Give Us

This is the spies' own words, and the report starts out genuinely positive.

They confirm the land really was rich and worth having.

The tragedy of this chapter is not a false report about the land.

It is what the people chose to do with a true one.

👍 The initial report was actually positive

🍯 The land really was rich and good

😢 The tragedy was not the report itself

📖 A true report still met real unbelief

# Deuteronomy 1:26-33
# 😤 Israel Rebels In The Tents
---
## 🗣️ Ye Murmured In Your Tents

Murmured describes private grumbling, not open protest to Moses' face.

The complaint spread quietly through the camp, tent by tent.

Quiet complaining can spread just as much damage as a loud one.

🗣️ Murmured means quiet private grumbling

⛺ It spread tent by tent

🤫 No one confronted Moses directly

➡️ Quiet complaints still spread real damage

## 💔 Because The LORD Hated Us

This claim twists a rescue into an accusation.

God had just freed this same people from slavery in Egypt.

Fear, not honest reasoning, produced this wild conclusion.

💔 This twists rescue into accusation

🇪🇬 God had just freed them from Egypt

😨 Fear produced this claim, not logic

➡️ Panic can rewrite recent history

## 🏰 Walled Up To Heaven

This is exaggerated language, not a literal measurement.

The cities were genuinely fortified and intimidating to look at.

Fear tends to make real obstacles look even larger than they are.

🏰 This is exaggeration, not literal height

🧱 The cities were genuinely fortified

😨 Fear inflates the size of a threat

➡️ Real obstacles still get exaggerated

## 👹 The Sons Of The Anakims

The Anakim were a people known for unusually tall, imposing warriors.

The spies already named them by this same title back in Numbers thirteen.

A later chapter in Deuteronomy calls them legendary in size compared to everyone else.

👹 Anakim means unusually tall warriors

📜 Numbers already named this same people

📏 Later chapters call them legendary in size

➡️ Fear focused on the tallest threat

## 🛡️ Dread Not, Neither Be Afraid Of Them

Moses reminds the people that this exact command had already been given to them.

The instruction was not new information.

What actually failed here was trust, not information.

🛡️ This command was already given once

📢 It was not new information

💭 The failure here was trust, not knowledge

➡️ Repeating truth does not guarantee belief

## ⚔️ He Shall Fight For You

God himself promises to fight this battle for Israel.

They had already watched Him defeat Egypt's entire army at the Red Sea.

That same power was still available here, only a few years later.

⚔️ God is described as a warrior here

🌊 The Red Sea already proved this power

⏳ Only a few years separated the two moments

📖 Available power does not remove real fear

## 👨‍👦 As A Man Doth Bear His Son

This is a tender, physical image of a father carrying a tired child.

It pictures constant, personal care through every mile of a hard journey.

This is not distant management from far away.

👨‍👦 This pictures a father carrying his child

🚶 It shows care through every hard mile

❤️ This is personal, not distant, care

➡️ God carried them, He did not just watch

## 🎯 Ye Did Not Believe The LORD Your God

This line names the actual sin plainly.

The real failure was not fear itself.

The real failure was refusing to trust God despite everything they had already seen.

🎯 This names the real sin plainly

😨 Fear itself was not the failure

🙅 Trust was refused, not just fear

📖 Evidence does not automatically produce belief

## 🔥 In Fire By Night, And In A Cloud By Day

This recalls the visible pillar of cloud and fire from the exodus out of Egypt.

Israel was not being asked to trust an invisible God.

They were being asked to trust the same God they could literally see leading them.

🔥 This recalls the pillar from Exodus

👀 God's guidance was visible, not invisible

🚶 Fire led by night, cloud by day

➡️ Seen guidance still met real doubt

# Deuteronomy 1:34-40
# 😠 The LORD's Oath Against That Generation
---
## 🔥 Was Wroth, And Sware

Wroth is an old word for deep, burning anger.

A sworn oath in this culture was permanent and binding.

God's anger here comes with a formal, irreversible consequence attached to it.

🔥 Wroth means deep burning anger

📜 A sworn oath could not be taken back

⚖️ This was not a passing threat

➡️ Words this serious carried real weight

## 🎯 This Evil Generation

This phrase identifies exactly who is being judged.

It means the adults who left Egypt.

They personally witnessed everything God did.

They still refused to trust Him at Kadeshbarnea.

🎯 This names the adult generation specifically

👀 They personally witnessed everything already

🙅 They still refused to trust God

📖 Judgment matched a specific choice, not everyone

## 🌟 Save Caleb The Son Of Jephunneh

Caleb stands out as the one named exception among all the adults.

His loyalty during the spy mission earns him this personal promise from God.

Joshua receives the same exception, though he is named separately a few verses later.

🌟 Caleb is the one named exception

🕵️ His loyalty during the spy mission mattered

🎁 God personally promises him the land

➡️ One faithful voice was never forgotten

## 💯 Because He Hath Wholly Followed The LORD

Wholly means completely, without holding anything back.

This phrase draws a sharp line between Caleb and the other ten spies.

Full obedience, not partial obedience, is what earns this promise.

💯 Wholly means completely, not partly

⚖️ This contrasts Caleb with the other ten

🎯 Full obedience is what earns this promise

📖 Half hearted faith is not the same

## 🚫 The LORD Was Angry With Me For Your Sakes

Moses says here that he too is barred from entering the land.

He connects his own ban to the people's rebellion in this retelling.

A later chapter describes Moses' own specific failure at the waters of Meribah.

🚫 Moses is barred from entering too

🔗 He ties it to the people's rebellion here

📜 Another chapter names his own failure too

➡️ Moses gives an honest, layered account

## 🚫 Thou Also Shalt Not Go In Thither

This states plainly what this means for Moses personally.

The man who led Israel out of Egypt will not lead them into Canaan.

He will see the land only from a distance before he dies.

🚫 Moses will not enter Canaan

👀 He will only see it from a distance

😔 This is a personal, painful cost

➡️ Leadership here came with real sacrifice

## 🔄 He Shall Go In Thither: Encourage Him

Leadership transfer begins here, well before Moses actually dies.

Joshua already stood beside Moses as his assistant during the wilderness years.

Encourage him is Moses' own charge, given directly by God.

🔄 Leadership transfer begins here already

🧑‍🤝‍🧑 Joshua had already served as Moses' assistant

💪 Encourage him is God's direct charge

📖 Succession started years before the actual change

## 👶 Which Had No Knowledge Between Good And Evil

This phrase identifies children too young to be morally responsible.

The rebellion belonged to the adults who chose fear over trust.

These same children inherit the land their parents refused to enter.

👶 This names children too young to be responsible

⚖️ The rebellion belonged to the adults

🎁 These children inherit the promise instead

➡️ Innocence was not punished with the guilty

## 🧭 By The Way Of The Red Sea

This is a literal geographic reversal, back the way they came.

Israel had reached the very edge of the promised land.

Now they turn around and head back into the wilderness instead.

🧭 This means turning back the way they came

🚫 They had reached the promised land's edge

😔 Retreat replaced what should have been entry

➡️ Unbelief cost them the shortest path

# Deuteronomy 1:41-46
# 🐝 The Failed Attack And Retreat
---
## 🗣️ We Have Sinned Against The LORD

This confession sounds right on the surface.

It comes only after judgment was already announced, not before.

True repentance and a fear driven reaction can sound identical at first.

🗣️ This confession sounds right at first

⏰ It comes after judgment was announced

😨 Fear and repentance can sound alike

➡️ Timing reveals what this really was

## ⚔️ Girded On Every Man His Weapons Of War

The people arm themselves for battle without being told to.

The same fear that stopped them earlier now flips into reckless overconfidence.

Neither response, cowering nor charging, actually involved trusting God.

⚔️ This means arming for battle

🔄 Fear flipped into overconfidence

🚫 Neither response involved trusting God

➡️ Extremes can both miss the same point

## 🚫 I Am Not Among You

This is God's direct warning through Moses ahead of the battle.

Victory in earlier battles never came from Israel's own strength or numbers.

Weapons and courage cannot replace God's actual presence in a fight.

🚫 God warns He will not be present

💪 Past victories never came from strength alone

⚔️ Weapons cannot replace God's presence

📖 Presence, not preparation, wins the battle

## 🚫 Went Presumptuously Up Into The Hill

Presumptuously means acting without permission or backing.

The people had God's command to leave, not to attack.

Confidence without God's support is not the same as faith.

🚫 Presumptuously means acting without permission

📜 God had commanded retreat, not attack

💭 Confidence is not the same as faith

➡️ Boldness without God is just risk

## 🐝 Chased You, As Bees Do

This simile pictures a swarming, relentless pursuit.

Bees do not attack in one place and stop.

They chase in numbers, from every direction, until the threat is gone.

🐝 This pictures a swarming pursuit

🔄 Bees chase relentlessly, not just once

🧭 The attack came from every direction

➡️ The defeat was total, not partial

## 📛 Destroyed You In Seir, Even Unto Hormah

Hormah carries the sense of destruction in its very name.

Other passages connect this same name to Israel's earlier and later battles in this region.

A place name here becomes a permanent marker of this specific defeat.

📛 Hormah's name carries the sense of destruction

📜 Other passages connect this place to nearby battles

🗺️ Seir marks where the chase happened

📖 A name became a lasting marker of defeat

## 😢 Ye Returned And Wept Before The LORD

Tears here do not automatically mean repentance.

The weeping comes only after a painful, humiliating defeat.

Sorrow over consequences is not the same thing as sorrow over the actual sin.

😢 Tears do not equal repentance

🩹 This grief follows a painful defeat

💭 Sorrow over consequences differs from real sorrow

➡️ Grief came too late to change the outcome

## 🚪 The LORD Would Not Hearken

This means God did not answer their prayer this time.

The door for that specific battle, at that specific moment, had already closed.

This is not the same as God rejecting Israel forever.

🚪 This means God did not answer here

⏰ That specific window had already closed

🚫 This is not permanent rejection

📖 Some doors do not reopen once closed

## ⏳ Ye Abode In Kadesh Many Days

This single line quietly covers years Deuteronomy otherwise skips over.

A later chapter names the real length of that stretch.

Most of that long stretch never gets its own detailed story at all.

⏳ This line hides a very long stretch

📜 A later chapter gives the real number

🤐 Most of those years go untold

➡️ Silence in scripture can still mean real time
`.trim();

export const DEUTERONOMY_ONE_PERSONAL_SECTIONS = parseDeuteronomyOneRawNotes(DEUTERONOMY_ONE_RAW_NOTES);
