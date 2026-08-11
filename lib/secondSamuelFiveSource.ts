export type SecondSamuelFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelFiveRawNotes(rawText: string): SecondSamuelFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 5:${startVerse}` : `2 Samuel 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 5 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_FIVE_RAW_NOTES = `
# SecondSamuel 5:1-5
# 🤝 All Israel Crowns David
---
## 🌍 All The Tribes Of Israel Came To David

"The tribes of Israel" here means the northern tribes who had backed Saul's family.

For years they had followed Ishbosheth instead of David.

Chapter four just showed his death ending that resistance.

Now the very people who once opposed David come looking for him.

🌍 Tribes of Israel means the northern tribes
👑 They had backed Saul's family
💀 Ishbosheth's death ended that resistance
📖 Former opponents now seek David out

## 🦴 We Are Thy Bone And Thy Flesh

"Bone and flesh" is an old way of claiming shared blood and family.

The tribes are not describing a political deal.

They are reminding David that Israel is his own people, not a foreign ruler.

The same phrase describes true kinship elsewhere in the Old Testament.

🦴 Bone and flesh means shared blood
👪 It claims real family kinship
🚫 Not a foreign ruler over them
📖 David belongs to his own people

## ⚔️ Thou Wast He That Leddest Out And Broughtest In Israel

"Led out and brought in" was the standard way of describing a military commander.

It meant leading an army to battle and bringing the same men safely home.

The tribes are recalling David's years commanding Saul's forces.

His leadership record was already well known to them.

⚔️ Led out and brought in means commanded armies
🛡️ It meant fighting and returning safely
📜 This recalls David's years under Saul
📖 His leadership was already proven

## 🐑 Thou Shalt Feed My People Israel

"Feed" here does not mean handing out food.

It means to shepherd, to guide, protect, and provide for a flock.

David had spent his boyhood herding real sheep.

The image ties his old job directly to his new one.

🐑 Feed means to shepherd and guide
🛡️ It includes protecting and providing
👦 David shepherded real sheep as a boy
📖 One skill prepared him for the other

## 👑 Thou Shalt Be A Captain Over Israel

This same promise was already spoken years earlier when Samuel first anointed David.

"Captain" here means a ruler set in place by God, not a man who simply seized power.

The tribes now speak God's own words back as their reason for accepting him.

Their loyalty rests on a promise older than this meeting.

👑 Captain means a ruler appointed by God
📜 Samuel spoke this same promise earlier
🗣️ The tribes repeat God's own words
📖 Their loyalty rests on an old promise

## 🤝 David Made A League With Them In Hebron Before The LORD

A "league" here means a formal covenant, a binding agreement between two parties.

David does not simply accept the crown by force.

He signs a mutual promise with Israel's elders, made in God's presence as witness.

Kingship in Israel was always meant to run through covenant, not conquest alone.

🤝 A league means a binding covenant
📜 David agrees to mutual terms
👀 God witnesses the agreement directly
📖 Israel's kingship ran through covenant

## 🛢️ They Anointed David King Over Israel

This is the third time David is anointed king in scripture.

Samuel anointed him privately as a boy in First Samuel sixteen.

Judah anointed him king over one tribe back in chapter two.

Now all Israel anoints him, completing what God promised decades earlier.

🛢️ This is David's third anointing
👦 Samuel anointed him first, privately
🏘️ Judah anointed him second, in chapter two
📖 All Israel completes God's old promise

## 🎂 David Was Thirty Years Old When He Began To Reign

Thirty was considered full adulthood in ancient Israel, old enough for major leadership.

David had already waited years since his private anointing as a teenager.

Priests also began their service at this same age under the law.

The number marks David as fully ready, not rushed into the role.

🎂 Thirty marked full adulthood then
⏳ David waited years since his anointing
🛐 Priests also began service at thirty
📖 He came to the throne fully ready

## 🔢 Seven Years And Six Months... Thirty And Three Years

These two numbers cover the entire span of David's reign, forty years total.

The first stretch matches the civil war years already told in chapters two through four.

The second stretch begins with the events about to unfold in the rest of this chapter.

One kingdom is finally united after years of division.

🔢 Seven plus thirty three years makes forty
🏘️ The first years covered the civil war
🏙️ The second years begin right here
📖 A divided kingdom is finally united

# SecondSamuel 5:6-8
# 🏯 Jerusalem Falls To David
---
## 🏯 Went To Jerusalem Unto The Jebusites

The Jebusites were a Canaanite people who had held Jerusalem since long before Israel entered the land.

Joshua's conquest generations earlier never actually removed them from this one city.

Jerusalem sat wedged between Judah and Benjamin, ground that belonged to neither tribe alone.

Taking it would give David a capital with no old tribal claim attached.

🏯 Jebusites held Jerusalem since Joshua's day
🗺️ The city sat between two tribes
🚫 No single tribe already claimed it
📖 It made a capital free of old rivalry

## 🗣️ Except Thou Take Away The Blind And The Lame

This is not a literal description of Jerusalem's defenders.

The Jebusites are boasting that their walls are so strong that even blind and lame men could hold them off.

It is trash talk meant to humiliate David before the fight even starts.

They believe their city is simply unconquerable.

🗣️ This line is a boast, not a fact
🧱 They claim their walls need no real defenders
😏 It mocks David before the fight starts
📖 They believe the city cannot fall

## 😌 Thinking, David Cannot Come In Hither

The Jebusites are so confident that they say this thought out loud.

Every fortified city in this era believed its walls made it safe.

That same confidence had protected Jerusalem from Israel for generations.

David is about to prove that confidence wrong.

😌 The Jebusites feel fully safe
🧱 Their walls had held for generations
⏳ That safety is about to end
📖 Confidence is not the same as certainty

## ⛰️ David Took The Strong Hold Of Zion

"Zion" originally named this one fortified hill inside Jerusalem, not the whole city yet.

The name later grows to represent all of Jerusalem.

It eventually stands for God's dwelling place itself.

This capture is the very first time that word appears in the Bible.

⛰️ Zion first named just this one hill
🏙️ The name later covers all Jerusalem
🕍 It later stands for God's own dwelling
📖 This is the word's first appearance

## 🏷️ The Same Is The City Of David

Jerusalem now takes on a new title, the city of David.

Renaming a captured city after its conqueror was a common practice in this era.

This name appears throughout the rest of the Old Testament for Jerusalem.

The city that resisted Israel for centuries now carries David's own name.

🏷️ Jerusalem gains the title city of David
👑 Renaming marked a city's new ruler
📜 The name is used throughout scripture
📖 A resistant city now bears his name

## 💧 Whosoever Getteth Up To The Gutter

"Gutter" here likely refers to a water shaft used to reach the city's spring from inside the walls.

Jerusalem's defenders needed a hidden way to reach water during a siege.

Many scholars believe David's men used this exact passage to climb into the city unseen.

A weakness built for survival became the way in for David's army.

💧 Gutter likely means a hidden water shaft
🏯 It let defenders reach water safely
🧗 Scholars think David's men climbed through it
📖 A safety feature became the way in

## 🔁 That Are Hated Of David's Soul

David repeats the Jebusites' own insult back at them.

He is not mocking people with disabilities in general.

He is throwing their boast about the blind and the lame back at the men who said it.

The insult meant to shame him becomes the reason for his victory.

🗣️ David echoes their own insult back
🚫 This targets the boasters, not disabled people
🔁 Their words are turned against them
📖 Their mockery becomes David's victory line

## 🏆 He Shall Be Chief And Captain

Whoever led the daring climb into the city would be rewarded with high command.

First Chronicles later names Joab as the man who took this challenge.

Joab becomes David's top military commander for most of his reign after this.

One bold act inside a narrow tunnel shapes David's whole army.

🏆 The reward was becoming top commander
⚔️ First Chronicles names Joab as the man
👑 Joab leads David's army from here on
📖 One bold act shaped David's whole reign

## 🏠 The Blind And The Lame Shall Not Come Into The House

This closing line likely became a proverb repeating the Jebusites' taunt, not a permanent rule.

"The house" refers to the palace, and eventually the temple built on this same ground.

Scripture elsewhere shows disabled people welcomed into worship, and even into David's own household.

This verse reflects the insult of the moment, not a rule for how God's people should be treated.

🗣️ Likely repeats the Jebusites own insult
🏠 The house means the palace or temple site
🤝 Scripture elsewhere welcomes disabled people fully
📖 This is not a lasting rule for worship

# SecondSamuel 5:9-10
# 🏗️ David Builds The City
---
## 🏯 David Dwelt In The Fort, And Called It The City Of David

David moves his own household into the captured stronghold right away.

Living inside the fortress signals permanence, not a temporary military camp.

Naming it after himself confirms Jerusalem is now the seat of his kingdom.

The city that once resisted him becomes his own home.

🏯 David moves his household inside
🏡 This signals a permanent capital
🏷️ Naming it confirms his new seat
📖 A resistant city becomes his home

## 🧱 David Built Round About From Millo And Inward

"Millo" likely refers to a terraced structure, supporting platforms filled with rubble and stone.

It reinforced the steep hillside so buildings could stand safely near the top of the city.

This was a major engineering project, not a small repair.

David is investing real resources into making Jerusalem permanent and defensible.

🧱 Millo likely means a terraced support structure
⛰️ It reinforced the steep hillside
🏗️ This was a major building project
📖 David invests in a lasting capital

## 📈 David Went On, And Grew Great

David's influence, wealth, and territory all expand from this point forward.

This growth follows directly after capturing Jerusalem, not before it.

The city itself becomes the base that makes further growth possible.

One conquest opens the door to everything that follows in his reign.

📈 David's power expands from here
🏙️ Jerusalem becomes his new base
🚪 One conquest opens later growth
📖 The reign's real momentum starts here

## 👑 The LORD God Of Hosts Was With Him

"LORD of hosts" is a title naming God as commander over heaven's armies, not just Israel's.

The writer credits this success to God's presence, not David's own cleverness.

This same title appears throughout the rest of the Old Testament for God's power in battle.

Every victory in this chapter traces back to this one short sentence.

👑 LORD of hosts means commander of heaven's armies
🙌 The writer credits God, not David alone
📜 This title recurs throughout the Old Testament
📖 Every victory traces back to this line

# SecondSamuel 5:11-12
# 🌲 Hiram Builds David A House
---
## 🌊 Hiram King Of Tyre Sent Messengers To David

Tyre was a wealthy Phoenician city on the coast, famous for trade and skilled craftsmen.

Hiram ruled that city and reached out to David on his own, before any request was made.

This marks the start of a long friendly relationship between Israel and Tyre.

The same alliance continues later under David's son Solomon.

🌊 Tyre was a wealthy Phoenician trade city
🤝 Hiram reached out first, unasked
🔁 This begins a long friendly alliance
📖 The relationship continues under Solomon

## 🌲 Cedar Trees, And Carpenters, And Masons

Cedar from Lebanon was prized across the ancient world for its strength and pleasant smell.

Israel had almost no skilled builders trained for large stone and timber construction.

Hiram supplies both the rare material and the trained workers Israel lacked.

This gift makes Jerusalem's first true palace possible.

🌲 Cedar was prized ancient building wood
🏗️ Israel lacked skilled large scale builders
👷 Hiram supplied both material and workers
📖 This gift made the first palace possible

## 🏠 They Built David An House

"House" here means a literal palace, not a symbolic dynasty.

This is the first real royal residence David has ever had.

He had lived as a shepherd, a fugitive, and a warrior camp leader up to this point.

The word "house" takes on a second, bigger meaning just two chapters later in this book.

🏠 House here means a real palace
👑 It is David's first royal residence
🏃 Before this he lived as a fugitive
📖 The word house grows bigger later

## 👀 David Perceived That The LORD Had Established Him King

"Perceived" means David came to understand something clearly, not just guess at it.

Foreign gifts and unity among all the tribes were visible proof.

David reads his political success as confirmation of God's own hand at work.

He does not credit his own skill for what has happened.

👀 Perceived means he came to understand
🌍 Foreign gifts and unity were his proof
🙏 David reads it as God's confirmation
📖 He does not credit his own skill

## 🎁 Exalted His Kingdom For His People Israel's Sake

David's success is framed as a gift for the nation, not a personal reward.

Kingship in Israel was always meant to serve the people, not the other way around.

This line quietly sets the standard every king after David will be measured against.

A king's greatness was supposed to serve everyone under him.

🎁 His success serves the whole nation
⚖️ Kingship existed to serve the people
📏 This sets the standard for later kings
📖 Greatness was meant to serve others

# SecondSamuel 5:13-16
# 👶 More Sons Born In Jerusalem
---
## 👰 David Took Him More Concubines And Wives Out Of Jerusalem

A "concubine" was a recognized secondary wife with fewer legal rights than a full wife.

Kings across the ancient Near East commonly took many wives to build alliances and show status.

God's law had already warned Israel's future kings not to multiply wives for themselves.

This choice quietly plants a problem that grows worse later in David's story.

👰 A concubine was a lesser status wife
👑 Many kings multiplied wives for status
⚠️ God's law warned against this practice
📖 This choice causes trouble later on

## 👨‍👩‍👧‍👦 There Were Yet Sons And Daughters Born To David

This adds to the children already born back in Hebron in chapter three.

A growing family signaled a growing, stable dynasty to everyone watching.

More children also meant more future claims to David's throne.

Every birth here quietly sets up conflicts still years away.

👨‍👩‍👧‍👦 This adds to his Hebron born children
📈 A large family signaled dynasty stability
👑 More sons meant more future claims
📖 These births plant seeds for later conflict

## 👶 Shammuah, And Shobab, And Nathan, And Solomon

These four are named as sons of Bathsheba according to First Chronicles chapter three.

Solomon is the son who will eventually inherit David's throne.

Nathan's name later appears again in Luke's genealogy leading to Jesus.

Two ordinary sounding names in this list carry enormous weight later.

👶 These four are Bathsheba's sons
👑 Solomon later inherits David's throne
📜 Nathan appears in Luke's genealogy of Jesus
📖 Small names here carry huge weight later

## 📜 Ibhar Also, And Elishua, And Nepheg, And Japhia

Scripture records almost nothing else about these four sons individually.

Their names are still preserved here, fully counted among David's own children.

Not every name in the Bible needs a famous story to matter.

Being listed at all was its own kind of honor in ancient record keeping.

📜 Little else is recorded about these sons
👶 They are still fully counted as David's
🏷️ Not every name needs a famous story
📖 Being listed at all honored them

## 📋 Elishama, And Eliada, And Eliphalet

This finishes the list of sons born to David after he moved to Jerusalem.

First Chronicles later counts eleven sons total from this city, not including daughters.

Compare that to the six sons already born earlier in Hebron.

David's family, like his kingdom, is now firmly centered in his new capital.

📋 This closes the Jerusalem born sons list
🔢 Chronicles counts eleven sons from here
🏘️ Compare that to six sons from Hebron
📖 His family now centers on Jerusalem

# SecondSamuel 5:17-21
# ⚔️ Philistines Attack The New King
---
## 🏃 The Philistines Heard That They Had Anointed David King

The Philistines had once treated David as a useful exile living under their protection.

A united Israel with David as king looked like a real rival power now.

What once looked like a manageable neighbor now looked like a genuine threat.

Their attack comes as a direct response to David's new strength.

🏃 David once lived as a Philistine exile
🌍 A united Israel changed everything for them
😨 Their old ally now looked like a rival
📖 This attack answers his new strength

## ⚔️ All The Philistines Came Up To Seek David

This was not a small border raid.

The word "all" signals a full scale military mobilization against David personally.

The Philistines aim to crush this new kingdom before it can grow stronger.

They understand exactly what a united Israel threatens for their own power.

⚔️ This was a full scale mobilization
🎯 The target was David personally
🚫 They wanted to stop him early
📖 They understood the threat clearly

## 🏔️ David Went Down To The Hold

"The hold" refers to a natural stronghold, likely the same fortress at Adullam from David's fugitive years.

David falls back on a defensive position he already knows well from experience.

This was a wise tactical retreat, not a sign of fear.

Old survival skills from his fugitive years serve him again as king.

🏔️ The hold likely means Adullam's stronghold
🧠 David already knew this position well
🛡️ This was a wise tactical retreat
📖 Old survival skills serve him again

## 🗺️ Spread Themselves In The Valley Of Rephaim

The valley of Rephaim sat just southwest of Jerusalem, dangerously close to David's new capital.

Spreading out across the valley shows the Philistines massing for a major battle, not a quick raid.

This location put real pressure on the city David had only just secured.

The new capital is threatened almost as soon as it is won.

🗺️ Rephaim sat near Jerusalem itself
⚔️ Spreading out signaled a major battle
🏙️ This threatened David's brand new capital
📖 The win was tested almost immediately

## 🙏 David Enquired Of The LORD

David does not simply react out of instinct or fear.

He stops to ask God directly whether and how to fight, likely through a priest and the ephod.

Saul rarely sought God this way during his own reign.

This single habit marks one of the clearest differences between the two kings.

🙏 David asks God before acting
📿 This likely used a priest and ephod
🚫 Saul rarely asked God this way
📖 This habit sets the two kings apart

## ❓ Shall I Go Up To The Philistines? Wilt Thou Deliver Them Into Mine Hand?

David asks two separate questions here, not just one.

First, whether he should even fight this battle at all.

Second, whether God guarantees the actual outcome.

He commits to nothing until he has a clear answer to both.

❓ David asks two separate questions
⚔️ First, whether to fight at all
🏆 Second, whether victory is guaranteed
📖 He waits for a clear answer

## ✅ Go Up: For I Will Doubtless Deliver The Philistines Into Thine Hand

God answers both of David's questions plainly and without hesitation.

"Doubtless" means without any question or uncertainty at all.

This kind of direct guarantee before battle rarely appears elsewhere in scripture.

David goes into this fight already certain of the outcome.

✅ God answers both questions directly
💯 Doubtless means without any uncertainty
📜 Such a direct guarantee is rare in scripture
📖 David fights already certain of victory

## 🌊 David Smote Them There... As The Breach Of Waters

"Baalperazim" means something like "the Lord who breaks through," a name David gives on the spot.

He compares his victory to a flood suddenly bursting through a dam.

The image describes overwhelming, unstoppable force arriving all at once.

David credits God directly for the breakthrough, not his own army's strength.

🌊 Baalperazim means the Lord who breaks through
💥 Like a flood bursting through a dam
⚡ It describes sudden overwhelming force
📖 David credits God for the breakthrough

## 🗿 There They Left Their Images, And David And His Men Burned Them

Ancient armies often carried small idols into battle, believing their gods fought alongside them.

The Philistines flee so fast that they abandon these idols on the field.

Burning captured idols followed God's own law for dealing with foreign gods found in the land.

Even in victory, David makes sure obedience comes before any spoils.

🗿 Armies often carried idols into battle
🏃 The Philistines fled too fast to grab them
🔥 Burning idols followed God's own law
📖 Obedience came even before celebrating victory

# SecondSamuel 5:22-25
# 🌳 A Second Battle, A New Strategy
---
## 🔁 The Philistines Came Up Yet Again

One defeat does not end the Philistine threat.

They return to the exact same valley for a second attempt.

A single victory rarely settles a war completely in this period of Israel's history.

David will face this same enemy again and again throughout his reign.

🔁 The Philistines return for round two
🗺️ Same valley, same target as before
⚔️ One victory rarely ends a war
📖 This enemy returns again and again

## 🙏 When David Enquired Of The LORD

David asks God again rather than assuming the last battle plan will work twice.

Repeating a winning strategy without checking first can be a real mistake.

This habit of asking every single time is part of what makes David different from Saul.

Obedience here means staying dependent, not just staying victorious.

🙏 David asks God a second time
🔁 He does not assume the old plan works
🧭 Constant dependence marks David's kingship
📖 Obedience means staying dependent, not just winning

## 🧭 Fetch A Compass Behind Them

"Fetch a compass" is an old expression meaning to circle around, not a navigation tool.

God instructs a flanking maneuver instead of another direct frontal attack.

Approaching from behind would catch the Philistines completely off guard.

The same enemy required a completely different plan the second time.

🧭 Fetch a compass means circle around
🔄 God orders a flanking maneuver
😲 This would catch them off guard
📖 The same enemy needed a new plan

## 🌳 Over Against The Mulberry Trees

"Mulberry trees" likely refers to a kind of balsam or poplar tree, not the mulberry familiar today.

Many scholars are not fully certain of the exact species meant by the Hebrew word.

What matters most is not the tree species but the sound that comes next from its branches.

God gives David a very precise place to watch and listen from.

🌳 Mulberry likely means balsam or poplar trees
❓ The exact species is not fully certain
👂 The sound from the branches matters most
📖 God gives a precise place to watch

## 👂 The Sound Of A Going In The Tops Of The Mulberry Trees

This describes a sound like marching or rushing wind moving through the treetops.

It was the sign that God's own forces were advancing ahead of David's men.

David had to wait and listen rather than charge in based on sight alone.

Faith here meant trusting an unseen signal completely.

👂 The sound resembled marching in the treetops
👻 It signaled God's forces moving first
⏳ David had to wait for the sign
📖 Faith meant trusting what he could not see

## 🚶 Then Shall The LORD Go Out Before Thee

God does not simply promise support from a distance this time.

The picture is of God personally leading the charge, with David's army following behind.

This flips the usual picture of a king leading his own troops into battle.

Israel's true commander was never David himself.

🚶 God leads the charge personally here
🔄 David's army follows instead of leading
👑 This flips the usual battle picture
📖 Israel's true commander was always God

## ✅ David Did So, As The LORD Had Commanded Him

David follows the unusual instructions exactly, without changing the plan.

Waiting for a sound in the trees before attacking took real discipline and trust.

This kind of full, careful obedience is a repeated theme throughout David's early reign.

The unusual plan works precisely because David does not improvise around it.

✅ David follows the exact instructions
⏳ Waiting for the sign took real discipline
🔁 Full obedience is a repeated theme here
📖 The plan works because he does not improvise

## 🗺️ Smote The Philistines From Geba Until Thou Come To Gazer

Geba and Gazer mark two points across a wide stretch of territory in the central hill country.

The distance between them shows this was a long, thorough rout, not just one battlefield.

Philistine power in this central region is broken for years of David's reign.

What began as a threat to his brand new capital ends as a decisive, lasting victory.

🗺️ Geba and Gazer span real distance
🏃 This shows a long, thorough rout
🚫 Philistine power here is broken for years
📖 A capital under threat ends in victory
`.trim();

export const SECOND_SAMUEL_FIVE_PERSONAL_SECTIONS = parseSecondSamuelFiveRawNotes(
  SECOND_SAMUEL_FIVE_RAW_NOTES,
);
