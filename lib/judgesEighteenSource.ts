export type JudgesEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesEighteenRawNotes(rawText: string): JudgesEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 18:${startVerse}` : `Judges 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 18 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_EIGHTEEN_RAW_NOTES = `# Judges 18:1-6
# 🗺️ The Danites Search For Land
---
## 🗺️ The Tribe Of The Danites Sought Them An Inheritance

Dan was one of Israel's twelve tribes and had already received land from Joshua.

That land sat between Judah and the Philistines, and the Danites never fully took hold of it.

Judges 1 already showed the Amorites pushing Dan back into the hill country.

With no king to lead a unified conquest, Dan decides to search for land somewhere else entirely.

🗺️ Dan already had assigned land
⚔️ The tribe never fully took it
🏔️ Amorites had pushed them into the hills
📖 No king means Dan solves this alone

## 📜 All Their Inheritance Had Not Fallen Unto Them

Land was divided among Israel's tribes partly by casting lots, a practice described in the book of Joshua.

Dan's lot included territory it could never fully secure because of stronger enemies already living there.

This unfinished inheritance is the specific problem verse one describes.

The rest of the chapter shows Dan solving it through conquest instead of trusting God's original plan.

📜 Land was divided by casting lots
⚔️ Dan's assigned territory proved hard to hold
❓ This unfinished task opens the chapter
➡️ Dan chooses conquest over trusting God's plan

## 💪 Five Men Of Valour

Valour is an old word for courage and skill in battle.

The Danites did not send ordinary travelers to scout new land.

They sent trained fighting men, ready for whatever they might find.

This detail signals that Dan is planning conquest, not just relocation.

💪 Valour means courage in battle
🎯 These were trained fighters
🗺️ They scouted with conquest in mind
➡️ Dan plans more than a peaceful move

## 🏘️ From Zorah And From Eshtaol

Zorah and Eshtaol were two towns already belonging to the tribe of Dan.

These same two towns raised Samson a few chapters earlier in Judges thirteen.

The same small region produces two very different stories back to back.

One gave Israel a flawed judge, and the other launches a flawed migration.

🏘️ Zorah and Eshtaol were Danite towns
👶 Samson also came from this area
🔀 Two very different stories share one home
➡️ Dan's struggles run deeper than one man

## 🕵️ To Spy Out The Land

Spying out land before entering it was not new for Israel.

Moses sent spies into Canaan back in the book of Numbers.

Joshua sent spies into Jericho before that city fell.

This time the spies are not testing God's promise, they are hunting for a home on their own.

🕵️ Spying out land was a known pattern
📜 Numbers and Joshua both used it
🎯 This scouting trip is different
➡️ Dan searches without waiting on God

## 👂 They Knew The Voice Of The Young Man The Levite

The spies recognized this stranger by the sound of his own speech.

Different regions of Israel had noticeable differences in accent and dialect.

The Levite had already introduced himself to Micah using this same regional voice back in Judges seventeen.

His speech marked him as an outsider from Bethlehemjudah the moment he spoke.

👂 His accent gave him away
🗣️ Regions had different dialects
📖 Judges seventeen already introduced this same man
➡️ His voice makes him easy to identify

## ❓ Who Brought Thee Hither

Hither is an old word meaning to this place.

The spies ask the Levite how he ended up serving in Micah's house.

Their question sounds casual, but they are quickly sizing up an opportunity.

A Levite already living inside a private shrine is useful information for what they plan next.

❓ Hither means to this place
🗣️ The question sounds casual
🕵️ The spies are gathering information
➡️ They see a use for him already

## 🙏 Ask Counsel Of God

Asking counsel of God normally meant consulting Israel's true priest at the tabernacle.

Here it means asking Micah's homemade priest to consult his stolen idols instead.

The Danites want religious approval before committing to a risky journey.

They are treating a counterfeit system as if it carries real divine authority.

🙏 Asking counsel meant seeking God's guidance
🚫 This priest and idols are not real
🎭 The Danites still want it to feel official
📖 A counterfeit system gets treated like the truth

## ✌️ Go In Peace Before The LORD Is Your Way

The priest answers instantly, with no real process of seeking God at all.

This is the same young man Micah hired for a steady wage back in Judges seventeen.

A blessing spoken quickly to please a visitor is not the same as a true word from God.

The Danites walk away encouraged by words that were never actually tested.

✌️ The priest answers instantly
🪙 He is the same hired priest as before
🎭 A quick blessing is not real guidance
➡️ Dan moves ahead on an untested word

# Judges 18:7-10
# 🕵️ Laish Lies Undefended
---
## 🏞️ Then The Five Men Departed And Came To Laish

Laish was a city in the far north of the land, well beyond Dan's own territory.

The spies now leave Micah's house behind and travel much farther to see this new target.

Their mission moves from gathering an oracle to actually scouting a city.

The rest of the chapter will show this scouting trip leading straight to conquest.

🏞️ Laish sat far to the north
🕵️ The spies now target this city
🎯 Scouting becomes conquest planning
➡️ This trip sets up the chapter

## 😌 How They Dwelt Careless After The Manner Of The Zidonians

Careless here means free of worry or fear of attack, not sloppy or messy.

Zidon was a wealthy Phoenician city known for trade rather than warfare.

Laish apparently shared that same relaxed, undefended way of life.

A peaceful people with no army becomes an easy target for a tribe looking for land.

😌 Careless means free of worry
🏛️ Zidon was known for trade, not war
🏞️ Laish shared that same relaxed life
➡️ Peace without defense invites an attacker

## 👑 There Was No Magistrate In The Land That Might Put Them To Shame

A magistrate was a ruling official with authority to judge or punish wrongdoing.

Laish had no such leader to organize a defense or call for help.

This detail explains exactly why the Danite spies see such an easy opportunity.

A city without leadership cannot protect itself from a sudden attack.

👑 A magistrate was a ruling official
🚫 Laish had no such leader
🕵️ The spies notice this weakness
➡️ No leadership means no real defense

## 🗺️ Far From The Zidonians And Had No Business With Any Man

Laish sat too far from Zidon to expect quick help if it was attacked.

The city also had no alliances or treaties with any nearby people group.

Isolation made Laish peaceful, but it also made Laish completely alone.

The spies have now found a target with no defenders and no allies.

🗺️ Laish sat far from any ally
🤝 It had no treaties with neighbors
🏝️ Isolation left it alone
➡️ No defenders and no allies means no help

## ❓ What Say Ye

The spies return home and their brethren ask them directly for a report.

This short question opens a fast exchange of urgency and excitement.

The five men are about to describe an opportunity almost too good to pass up.

Their answer will move the whole tribe toward war.

❓ Brethren ask for a direct report
⏱️ The exchange moves quickly
🗺️ The men describe a real opportunity
➡️ Their report pushes the tribe toward war

## ⚔️ Arise That We May Go Up Against Them

The spies urge immediate action instead of more scouting or delay.

Their confidence comes from what they personally saw with their own eyes.

Slothful means lazy or hesitant when the moment calls for action.

Their urgency pressures the rest of the tribe to move fast.

⚔️ The spies push for quick action
👀 Their confidence rests on what they saw
🐌 Slothful means lazy or hesitant
➡️ Urgency pressures the tribe to move

## 🌾 A People Secure And To A Large Land

Secure here repeats the same idea as careless from verse seven.

The spies emphasize both the size of the land and how unprepared its people are.

Large land also promises Dan the space its assigned territory never gave them.

Two separate appeals, size and safety, make the case impossible to refuse.

🌾 Secure repeats the idea of careless
📏 The land is described as large
🏠 It offers space Dan never had
➡️ Size and safety both make the case

## 🎁 For God Hath Given It Into Your Hands

The spies frame their conquest as something God has already decided.

Nothing earlier in the chapter shows God actually speaking to them about Laish.

This claim echoes true promises God gave Israel elsewhere in the Bible, but without the same evidence here.

Borrowing God's name for a plan does not automatically make the plan God's will.

🎁 The spies credit God with the land
🤐 God never actually spoke this to them
📜 It echoes real promises without their evidence
📖 Borrowing God's name is not His will

# Judges 18:11-13
# ⚔️ Six Hundred Men March
---
## ⚔️ Six Hundred Men Appointed With Weapons Of War

This is a far larger group than the five spies sent earlier.

Six hundred armed men signals the Danites intend to take Laish by force, not just settle peacefully.

Appointed shows these men were formally selected and equipped for battle.

A scouting mission has now become a military campaign.

⚔️ Six hundred men now march
🗡️ They carry real weapons of war
🎯 Force, not settlement, is the plan
➡️ A scouting trip becomes a campaign

## 🏕️ Pitched In Kirjathjearim In Judah

Kirjathjearim was a town in the territory of Judah, not Dan.

The Danite army camps there on their way north, far from their own land.

This detour shows how far the tribe now travels to find a new home.

Their path cuts straight through territory that belongs to another tribe entirely.

🏕️ Kirjathjearim belonged to Judah
🗺️ Dan's army camps far from home
🛤️ The detour shows how far they travel
➡️ Their path cuts through another tribe's land

## 📛 They Called That Place Mahanehdan Unto This Day

Mahanehdan means the camp of Dan in Hebrew.

Naming a location after this event shows how memorable the march became.

The phrase unto this day tells us the name was still used long after Judges was written.

A temporary campsite left a permanent mark on Israel's map.

📛 Mahanehdan means the camp of Dan
🏕️ The name remembers this exact march
🗓️ Unto this day shows it lasted
➡️ A campsite left a lasting mark

## 🌄 Behind Kirjathjearim

The narrator adds this detail to help the original audience picture exactly where this camp sat.

It sat to the west of Kirjathjearim, on the road heading north toward Mount Ephraim.

Small landmark notes like this show Judges was written for readers who still knew this land firsthand.

A detail this specific was not needed for us today, but it mattered greatly to them.

🌄 The camp sat west of Kirjathjearim
🛤️ It was on the road north
🗺️ Judges assumed a reader who knew the land
📖 The detail mattered to its first readers

## 🏔️ They Passed Thence Unto Mount Ephraim

The army now retraces the same path the five spies walked earlier.

Mount Ephraim is the same hill country where Micah's house sits.

The six hundred men are heading straight back to the Levite and the idols.

Everything the spies reported is about to be put into action.

🏔️ The army retraces the spies' path
🏠 Mount Ephraim holds Micah's house
🎯 They march straight toward the idols
➡️ The spies' report is about to be used

# Judges 18:14-20
# 🗿 The Idols And The Priest Are Taken
---
## 🗣️ Then Answered The Five Men

The same five spies from earlier now guide the entire army through Micah's territory.

Their firsthand knowledge from the earlier scouting trip makes them the obvious leaders here.

They are no longer just reporting information, they are directing an operation.

Their earlier trip has turned into real influence over six hundred armed men.

🗣️ The same five spies now lead
👀 Their earlier knowledge guides the plan
🎯 They direct the operation itself
➡️ Scouting turned into real influence

## ❓ Do Ye Know That There Is In These Houses An Ephod And Teraphim

The spies remind the army exactly what valuable religious objects sit inside Micah's home.

They list every item by name, the ephod, the teraphim, the graven image, and the molten image.

This is not a spontaneous discovery, it is a plan already worked out in advance.

The army now knows precisely what to take and where to find it.

❓ The spies list every idol by name
🗿 Micah's house holds several objects
📋 This theft was already planned
➡️ The army knows exactly what to take

## 🤔 Consider What Ye Have To Do

The spies push the army to act rather than debate the morality of the plan.

No one in this scene raises a concern about stealing sacred objects.

The chapter keeps showing decisions made quickly, without anyone stopping to ask if it is right.

Speed replaces conscience throughout this entire story.

🤔 The spies push for quick action
🤐 No one questions the plan
⏱️ Decisions happen without pause
➡️ Speed replaces conscience in this story

## 🙋 Saluted Him

Saluted here means they greeted him warmly and respectfully, not a military gesture.

The friendly greeting hides the fact that the Levite is about to lose everything he has built.

Kindness on the surface can still lead somewhere dishonest underneath.

The greeting is the calm moment right before the theft begins.

🙋 Saluted means a warm, respectful greeting
🎭 Friendliness hides what happens next
😶 Kindness on the surface, dishonesty underneath
➡️ The calm comes right before the theft

## 🚪 Stood By The Entering Of The Gate

The six hundred armed men position themselves at Micah's entrance while the spies go inside.

This is a show of force meant to prevent any resistance from Micah's household.

No one inside the house could realistically fight past that many armed men.

The idols are about to be taken with no real choice involved.

🚪 The army guards the entrance
🛡️ It is a clear show of force
🚫 Resistance was never realistically possible
➡️ The theft happens with no real choice

## 🗿 Took The Graven Image And The Ephod And The Teraphim And The Molten Image

The spies walk in and take every sacred object Micah owns, without asking.

The priest himself simply watches this happen at the gate, doing nothing to stop it.

Everything Micah paid the founder to build in chapter seventeen is now gone in a moment.

Stolen silver bought idols that could just as easily be stolen right back.

🗿 The spies take every idol
😶 The priest does not intervene
💸 Micah's investment disappears instantly
📖 What was stolen once gets stolen again

## 👀 The Priest Stood In The Entering Of The Gate

The priest positions himself right beside the six hundred armed men, not beside Micah.

His choice of where to stand already hints at where his loyalty is heading.

He watches the theft happen without lifting a hand to stop it.

His silence sets up the offer he is about to accept.

👀 The priest stands with the army
🤔 His position hints at his loyalty
😶 He does not stop the theft
➡️ His silence sets up what comes next

## ❓ What Do Ye

Micah's hired priest finally speaks up once he sees the idols being carried out.

His question comes only after the theft is already happening, not before.

This is the same passive pattern the chapter has shown from him all along.

He reacts to events instead of guarding what was placed in his care.

❓ He finally speaks once idols are taken
⏱️ His question comes too late
😶 This matches his passive pattern
➡️ He reacts instead of guarding his post

## 🤐 Hold Thy Peace Lay Thine Hand Upon Thy Mouth

This is an old expression meaning stay silent and do not raise an alarm.

The Danites are not asking the priest a question, they are giving him an order.

Six hundred armed men make refusal feel impossible.

Fear, not agreement, is what actually silences him here.

🤐 The phrase means stay completely silent
📢 It is an order, not a request
⚔️ Six hundred men make refusal feel impossible
➡️ Fear silences him, not agreement

## 👨‍👦 Be To Us A Father And A Priest

This is the exact same offer of respect Micah made back in Judges seventeen.

The Danites now use the same flattering title to win the priest over.

Bigger numbers and bigger promises simply replace Micah's smaller household offer.

The priest is being bought a second time with almost identical words.

👨‍👦 The same offer language repeats
🔁 The Danites reuse Micah's own words
💰 A bigger offer replaces the smaller one
➡️ The priest is bought a second time

## ⚖️ Is It Better To Be A Priest Unto One House Or Unto A Tribe

The Danites frame this as a clear upgrade in status and reach.

Serving one household looks small next to serving an entire tribe and family in Israel.

Neither option is actually the priesthood God commanded through Aaron's descendants.

The priest is choosing between two counterfeit versions of the same broken system.

⚖️ The choice looks like a clear upgrade
📈 A tribe outranks one household
🚫 Neither option is God's true priesthood
📖 Both choices are still counterfeit

## 😊 The Priest's Heart Was Glad

Glad here means pleased and satisfied, with no hesitation shown at all.

He does not weigh loyalty to Micah or the fact that these idols were just stolen.

A bigger platform and steadier support outweigh any question of right and wrong.

His gladness closes out the same pattern from the very first time Micah hired him.

😊 Glad means pleased, without hesitation
🤷 Loyalty to Micah is not weighed
📈 A bigger platform outweighs right and wrong
➡️ This gladness completes an old pattern

## 🚶 Went In The Midst Of The People

The priest now walks surrounded by six hundred men instead of standing alone in Micah's house.

Carrying the stolen ephod, teraphim, and image, he leaves with the very army that took them.

His journey from hired stranger to tribal priest happens in the span of a few verses.

The chapter never once shows him hesitating to ask if any of this pleases God.

🚶 He now walks among the army
🗿 He carries the stolen idols with him
⏱️ His rise happens within a few verses
📖 He never once asks if this pleases God

# Judges 18:21-26
# 😡 Micah Confronts The Danites
---
## 👶 Put The Little Ones And The Cattle And The Carriage Before Them

Carriage here means baggage and belongings, not a vehicle for riding.

Placing the vulnerable people and goods in front protected them if anyone attacked from behind.

This formation shows real military planning, not a careless retreat.

The Danites expect trouble following them and prepare for it.

👶 Little ones means the children
🎒 Carriage means baggage and belongings
🛡️ This order protects the vulnerable
➡️ The Danites expect trouble behind them

## 🏃 The Men In The Houses Near Micah's House Were Gathered Together

Micah's neighbors notice the theft and quickly assemble their own group to respond.

Their fast reaction shows the whole area understood exactly what had just happened.

Six hundred armed men are a lot to chase down, yet these neighbors still try.

Their courage will not be enough to change what the Danites have already decided.

🏃 Neighbors quickly gather to respond
👀 The whole area saw what happened
😤 They chase despite being outnumbered
➡️ Their courage will not change the outcome

## 😤 They Cried Unto The Children Of Dan

The neighbors do not attack immediately, they call out first, hoping to be heard.

Crying out was often the first step before violence in these kinds of pursuits.

Their loud approach gives the Danites time to prepare their response.

This detail shows the confrontation almost turning physical before any words are exchanged.

😤 The neighbors cry out first
🗣️ Calling out often preceded violence
⏱️ The Danites hear them coming
➡️ The scene nearly turns physical

## ❓ What Aileth Thee That Thou Comest With Such A Company

Aileth is an old word meaning what is wrong or what is troubling you.

The Danites ask this with mock innocence, already knowing exactly why Micah is upset.

The question sounds concerned but is really meant to stall and provoke him.

Their tone treats a real theft like a small misunderstanding.

❓ Aileth means what is troubling you
🎭 The question is mock innocence
⏱️ It stalls and provokes Micah
➡️ A real theft gets treated as small

## 😡 Ye Have Taken Away My Gods Which I Made

Micah calls the stolen idols his gods, revealing exactly how he saw them all along.

He also says he made them, though really he only paid silver for a craftsman to build them.

His grief sounds sincere, yet it is grief over objects that were never truly God in the first place.

The chapter lets his own words expose the emptiness of what he is mourning.

😡 Micah calls the idols his gods
💰 He paid a craftsman to build them
😢 His grief still sounds sincere
📖 His own words expose the emptiness

## 😟 What Have I More

Micah treats the loss of these idols as if he has lost everything of value.

His entire sense of security was built around objects a craftsman could melt down and remake.

Nothing in the text shows him grieving the loss of the priest's guidance, only the objects.

His question reveals where his real trust had been placed all along.

😟 Micah feels he has lost everything
🗿 His security rested on objects, not God
😶 He mourns the idols, not true guidance
➡️ His trust was misplaced from the start

## ⚠️ Let Not Thy Voice Be Heard Among Us Lest Angry Fellows Run Upon Thee

This is a direct threat of violence disguised as a warning for Micah's own safety.

Angry fellows likely refers to the Danite soldiers themselves, ready to attack if provoked.

The Danites use fear instead of any actual justice or negotiation.

Might, not right, decides the outcome of this entire confrontation.

⚠️ This warning is really a threat
⚔️ Angry fellows means the Danite soldiers
😨 Fear replaces any real negotiation
📖 Might decides the outcome here

## 🔙 Micah Saw That They Were Too Strong For Him

Micah correctly judges that six hundred armed men cannot be defeated by his household alone.

He turns back home with nothing left, no idols, no priest, and no way to get either back.

The chapter never records God stepping in to defend Micah's private religion.

His silence at this defeat matches how quietly this whole idolatry began back in Judges seventeen.

🔙 Micah recognizes he is outmatched
🏠 He returns home with nothing left
🤐 God never defends his private religion
📖 His quiet defeat echoes how it all began

# Judges 18:27-31
# 🔥 Laish Becomes Dan
---
## 🔥 Smote Them With The Edge Of The Sword And Burnt The City With Fire

The Danites attack Laish exactly as the spies predicted, with no resistance able to stop them.

The peaceful, undefended life the spies noticed earlier becomes the very reason the city falls.

Nothing in the text shows any warning given or any chance for the people to surrender first.

Their conquest is total, not partial.

🔥 The Danites destroy the city completely
😌 Laish's peaceful ways left it defenseless
🚫 No warning is recorded
➡️ The conquest is total

## 🚫 There Was No Deliverer

A deliverer is someone who rescues a people from danger or defeat.

Laish's distance from Zidon, already noted earlier in the chapter, means help never arrives in time.

This same word later becomes a title for figures like Samson throughout the book of Judges.

Here it simply marks the tragic absence of anyone able to save this city.

🚫 Deliverer means someone who rescues
🗺️ Zidon was too far to help
📖 Judges uses this word for its heroes
➡️ Laish had no hero to save it

## 🏞️ In The Valley That Lieth By Bethrehob

Bethrehob was a town used here to help locate this new territory on the map.

Naming nearby landmarks was a normal way ancient writers gave readers a sense of place.

This detail plants the story in a real, specific location rather than a vague setting.

The Danites are not just conquering a city, they are permanently resettling in a real valley.

🏞️ Bethrehob helps locate the valley
🗺️ Ancient writers used known landmarks
📍 The setting is a real place
➡️ Dan permanently resettles here

## 🏙️ They Built A City And Dwelt Therein

The Danites do not just occupy Laish, they rebuild it entirely as their own.

Therein simply means in that place, an old way of saying they lived there.

This marks the successful completion of the search for land that opened the chapter.

It comes at the cost of a whole peaceful city and one family's stolen idols.

🏙️ Dan rebuilds the city fully
📍 Therein means in that place
🏠 Their search for land is complete
📖 It cost a city and a family's idols

## 📛 They Called The Name Of The City Dan

Renaming a conquered city after their own tribe marks it as permanent Danite territory.

This is the same Dan later remembered in the phrase from Dan to Beersheba, marking Israel's northern border.

Howbeit is an old word meaning however or nonetheless.

The text makes sure readers still know the city's original name was Laish.

📛 Renaming marks permanent ownership
🗺️ Dan later marks Israel's northern border
🔀 Howbeit means however
📖 The text preserves the city's original name

## 🗿 The Children Of Dan Set Up The Graven Image

The stolen idol does not stay hidden, it becomes the centerpiece of Dan's new worship.

An entire tribe now organizes its religious life around an object stolen from one Israelite family.

What began as one man's private idols in a small house becomes a tribe's public shrine.

The chapter traces idolatry spreading outward, not fading away.

🗿 The idol becomes tribal worship
🏠 It started in one man's house
📈 It grew into a whole tribe's shrine
➡️ Idolatry spreads instead of fading

## 👨‍👦 Jonathan The Son Of Gershom The Son Of Manasseh

Many ancient Hebrew manuscripts actually spell this name as Moses rather than Manasseh.

Scholars believe scribes may have added one small letter to the word Moses to protect his reputation.

That would make this priest the actual grandson of Moses, serving a stolen idol.

Either way, someone from a respected family line ends up leading Dan's counterfeit worship.

👨‍👦 The name may originally read Moses
✏️ A small letter may hide that link
😔 That would make him Moses' own grandson
📖 A respected family leads counterfeit worship

## ⏳ Priests To The Tribe Of Dan Until The Day Of The Captivity Of The Land

This idolatrous priesthood did not last one generation, it continued for centuries.

The captivity refers to Israel's later exile, when enemy nations conquered and removed the people from the land.

An idol stolen from one house in Judges seventeen shaped worship in Dan for hundreds of years.

Small compromises can outlast the people who first made them.

⏳ This priesthood lasted for centuries
🏚️ Captivity means Israel's later exile
🗿 One stolen idol shaped centuries of worship
📖 Small compromises can outlast their makers

## 🕍 All The Time That The House Of God Was In Shiloh

Shiloh was the location of Israel's tabernacle, the true and proper place of worship at this time.

The chapter ends by placing Dan's stolen idol directly beside Israel's true, God given worship site.

Two rival centers of worship exist in Israel at the exact same time.

Judges eighteen closes not with resolution, but with a warning left standing right next to the truth.

🕍 Shiloh held Israel's true tabernacle
🗿 Dan's idol stood alongside it
⚖️ Two worship centers existed together
📖 The chapter ends on an unresolved warning
`.trim();

export const JUDGES_EIGHTEEN_PERSONAL_SECTIONS = parseJudgesEighteenRawNotes(JUDGES_EIGHTEEN_RAW_NOTES);
