export type JeremiahTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyTwoRawNotes(rawText: string): JeremiahTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 22:${startVerse}` : `Jeremiah 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 22 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_TWO_RAW_NOTES = `# Jeremiah 22:1-5
# 🏛️ God Warns The King's House
---
## 🏛️ Go Down To The House Of The King Of Judah

Jeremiah's temple stood on higher ground than the royal palace below it.

Going down here describes an actual walk downhill, not humility or shame.

God sends His prophet directly into the seat of political power.

This message could not be delivered from a safe distance.

🏛️ Temple sat higher than the palace

🚶 Going down means an actual downhill walk

👑 God sends Jeremiah into the palace itself

📖 This warning could not stay at a distance

## 👑 That Sittest Upon The Throne Of David

The throne of David refers to God's covenant promise of an everlasting line of kings.

Every king addressed this way is reminded that his rule rests on that promise.

The promise was never a blank check for bad behavior.

It came with real conditions attached from the very beginning.

👑 Throne of David means God's covenant promise

🤝 Every king rules under that promise

⚠️ The promise was never unconditional

📖 Real conditions came attached to it

## 🚪 Thy Servants, And Thy People That Enter In By These Gates

The gates of the palace were where legal cases and business were decided.

Servants here means the king's officials, not just household staff.

Thy people that enter by these gates points to everyday citizens seeking justice.

This warning was never aimed at the king alone.

The whole government and everyone who depended on it stood under it too.

🚪 City gates were where justice got decided

👔 Servants means the king's officials

🚶 People at the gates means ordinary citizens

📖 This warning covered the whole government

## ⚖️ Execute Ye Judgment And Righteousness

Judgment means making fair legal decisions that match the facts of a case.

Righteousness means living in right relationship with both God and other people.

Together the two words describe a ruler's whole responsibility, not just courtroom duty.

God pairs these words often because true justice always flows from a right heart.

⚖️ Judgment means fair legal decisions

🤝 Righteousness means right relationship with God and others

👑 Together they describe a ruler's whole job

📖 True justice flows from a right heart

## 💰 Deliver The Spoiled Out Of The Hand Of The Oppressor

Spoiled here means robbed or taken advantage of, not physically ruined.

The oppressor is anyone using power to exploit someone weaker.

This command asks the king to rescue victims, not merely judge cases after the fact.

Justice in this verse means action on behalf of people who cannot protect themselves.

💰 Spoiled means robbed or exploited

👊 The oppressor abuses power over others

🤝 The king must actively rescue victims

📖 Justice here means action, not only words

## 🧍 The Stranger, The Fatherless, Nor The Widow

These three groups had no built in legal protection in the ancient world.

A stranger was a foreigner living without the rights of a citizen.

The fatherless and the widow had lost the male relative who normally defended their legal claims.

This exact trio appears again and again across the Old Testament as a test of true religion.

🧍 Stranger means a foreigner without citizen rights

👶 Fatherless lost their legal protector

👵 Widow lost hers as well

📖 This trio was a test of true religion

## 👑 Kings Sitting Upon The Throne Of David, Riding In Chariots And On Horses

This is the promised reward if the king and his people obey.

Kings would keep entering these same gates in strength for generations to come.

Chariots and horses were signs of royal wealth and military power.

Obedience was never separate from real, lasting national security.

👑 Kings would keep entering these gates

⚔️ Chariots and horses signaled royal strength

🔁 The dynasty would continue for generations

📖 Obedience and security were tied together

## 🙌 I Swear By Myself

God swears by Himself because there is no one greater to swear by.

An oath like this appears elsewhere in scripture as the strongest guarantee possible.

This is not an idle threat or an exaggeration for effect.

The weight of the warning matches the weight of the one making it.

🙌 God swears by His own name

🔝 No one greater exists to swear by

⚠️ This is the strongest kind of oath

📖 The warning carries God's full weight

## 🏚️ This House Shall Become A Desolation

Desolation means left empty and in ruins, unfit for anyone to live in.

This is the direct consequence promised if the warning goes unheeded.

The house in question is both the palace and the whole royal line it represents.

A grand building can be reduced to rubble as fast as any other structure.

🏚️ Desolation means empty and ruined

⚠️ This is the promised consequence

🏛️ The palace stands for the whole royal line

📖 No building is safe from this warning

# Jeremiah 22:6-9
# 🌲 A Wilderness Where Cedars Stood
---
## 🌿 Thou Art Gilead Unto Me, And The Head Of Lebanon

Gilead was a fertile, hilly region famous for its rich pastures and healing balm.

Lebanon was famous for its tall cedar forests, prized across the ancient world.

Both names pictured wealth, height, and beauty at their very best.

God is describing how precious and impressive the royal house once looked to Him.

🌿 Gilead pictured rich, fertile land

🌲 Lebanon pictured tall, famous cedars

👑 Both described the royal house at its best

📖 God once saw this house as precious

## 🏜️ Yet Surely I Will Make Thee A Wilderness

The very same house God once compared to Gilead and Lebanon would become empty land.

A wilderness has no crops, no shelter, and no one living in it.

This is a complete reversal from richness to total ruin.

Nothing about the coming judgment would leave the old glory standing.

🏜️ Wilderness means empty, unfarmed land

🔄 This is a total reversal

💔 Old glory would not remain standing

📖 Richness turns to ruin here

## ⚔️ I Will Prepare Destroyers Against Thee

Destroyers here means enemy armies, later revealed as Babylon and its allies.

God describes Himself as the one sending them, not merely permitting them.

This removes any doubt about who is really in control of the coming disaster.

The invasion is not random misfortune, it is a planned response to sin.

⚔️ Destroyers means invading enemy armies

👑 God says He sends them Himself

🎯 This is planned, not random

📖 Disaster here answers real sin

## 🌲 They Shall Cut Down Thy Choice Cedars

Choice cedars were the finest timber used in the grandest buildings in Jerusalem.

Cutting them down pictures the destruction of the palace's most impressive parts.

The image also stands for cutting down the nation's proud leadership.

What once stood tallest would be the first to fall.

🌲 Choice cedars meant the finest timber

🏛️ This pictures the palace being destroyed

👑 It also pictures leaders being cut down

📖 What stood tallest fell first

## 🚶 Many Nations Shall Pass By This City

Travelers and merchants from surrounding nations regularly passed through this region.

After the destruction, these same travelers would see Jerusalem's ruins for themselves.

A city's fall being witnessed by outsiders made the judgment public, not private.

Nothing about this disaster would stay hidden from the watching world.

🚶 Travelers regularly passed through this land

👀 They would witness the ruins firsthand

🌍 This judgment became public, not private

📖 Nothing about it stayed hidden

## ❓ Wherefore Hath The LORD Done Thus Unto This Great City?

This question was not really coming from Judah's own people.

Foreign travelers would ask it as they looked at Jerusalem's ruins.

Even outsiders who did not follow the LORD would notice something had gone terribly wrong.

A city's fall this total demanded an explanation from anyone who saw it.

❓ This question came from foreign onlookers

👀 Even outsiders noticed something was wrong

🏙️ The fall was too total to ignore

📖 Judgment this visible demanded an answer

## 📜 Because They Have Forsaken The Covenant Of The LORD Their God

The covenant was the binding agreement God made with Israel at Mount Sinai.

It promised blessing for obedience and real consequences for turning away.

Forsaken means abandoned on purpose, not lost by accident.

This single sentence is the real reason behind everything else in the chapter.

📜 Covenant means God's binding agreement with Israel

⛰️ It began at Mount Sinai

🚫 Forsaken means abandoned on purpose

📖 This is the real reason for the judgment

## 🗿 And Worshipped Other Gods, And Served Them

Other gods here means the local idols of Canaan and its neighboring nations.

Worship included sacrifices, festivals, and shrines dedicated to these false gods.

Served them means these idols were treated as a source of daily provision and protection.

Judah looked to these gods instead of trusting the one true God who rescued them from Egypt.

🗿 Other gods meant local Canaanite idols

🔥 Worship included sacrifices and festivals

🙏 Served means relied on for daily needs

📖 Judah trusted idols instead of God

# Jeremiah 22:10-12
# 😢 Weep For The One Who Leaves
---
## 👑 Weep Ye Not For The Dead

The dead here refers to King Josiah, who had died a short time earlier.

Josiah was already mourned deeply across the whole nation when he died.

God says that grief has already been given its proper place.

A worse fate was coming for the next king in line.

👑 The dead means King Josiah

😢 Judah already mourned him fully

✅ That grief had already run its course

📖 A worse fate was still ahead

## 🚶 Weep Sore For Him That Goeth Away

Goeth away means being taken away into exile, not simply leaving town.

This king would lose his throne, his homeland, and his freedom all at once.

Exile like this was considered worse than an honorable death by many in that culture.

The command to weep sore shows how heavy the outcome really was.

🚶 Goeth away means taken into exile

👑 He would lose throne, home, and freedom

💔 Exile felt worse than death itself

📖 This outcome was meant to be felt

## 🌍 For He Shall Return No More, Nor See His Native Country

This king would die far from Jerusalem, in a foreign land.

He would never again see his family, his people, or his home.

Dying away from one's native land carried real weight in the ancient world.

Being cut off from home this completely was its own kind of judgment.

🌍 He would die in a foreign land

👪 He would never see family again

🏡 Losing home was its own judgment

📖 This exile was permanent, not temporary

## 👑 Touching Shallum The Son Of Josiah King Of Judah

Shallum was the throne name taken by Josiah's son Jehoahaz when he became king.

He is the same king referred to as him that goeth away.

Kings in this period sometimes took a new name upon taking the throne.

Shallum reigned for only three months before his story took a dark turn.

👑 Shallum was Jehoahaz's throne name

🔗 He is the one who goeth away

📛 Kings sometimes took a new throne name

📖 His reign lasted only three months

## 👑 Which Reigned Instead Of Josiah His Father

After Josiah died in battle, the people crowned Shallum as the next king.

His reign began under painful circumstances, right after his father's sudden death.

Egypt's king quickly stepped in and removed him from the throne.

A promising new reign ended almost as soon as it had begun.

👑 The people crowned him after Josiah died

⚔️ Josiah had died suddenly in battle

🏺 Egypt's king removed him quickly

📖 His reign ended almost immediately

## ⛓️ He Shall Die In The Place Whither They Have Led Him Captive

Egypt's king carried Shallum away as a captive, and he never returned.

Jeremiah's prophecy said plainly that he would die in that foreign land.

Second Kings records that this is exactly what happened to him.

A prophecy spoken years in advance came true in painful detail.

⛓️ Egypt carried Shallum away captive

📜 Jeremiah said he would die there

📚 Second Kings confirms this happened

📖 This prophecy came true exactly as spoken

# Jeremiah 22:13-17
# 🏚️ Woe To The Builder Of Unrighteousness
---
## 😔 Woe Unto Him That Buildeth His House By Unrighteousness

Woe is a prophetic cry announcing coming doom, not a simple complaint.

Prophets used this word to open a formal, serious pronouncement of judgment.

Buildeth his house by unrighteousness means gaining wealth through dishonest and unfair means.

This introduces a direct accusation against the very next king in line.

😔 Woe announces coming doom

📢 Prophets used it to open judgment

💰 Unrighteousness means gaining wealth dishonestly

📖 This accusation targets the next king

## 📜 Useth His Neighbour's Service Without Wages

The law of Moses required that a worker be paid the very same day.

This king used forced labor and simply refused to pay the workers who built his palace.

Withholding wages from a poor laborer was treated as a serious sin in the law.

His grand new house was being built on the backs of unpaid workers.

📜 The law required same day payment

🏗️ This king used unpaid, forced labor

⚖️ Withholding wages was treated as sin

📖 His palace was built on unpaid workers

## 🗣️ I Will Build Me A Wide House And Large Chambers

This is the king speaking, quoted directly in the middle of God's own accusation.

A wide house and large chambers describes an ambitious expansion of the royal palace.

The size of the project reveals how much this king valued personal comfort.

His ambition for space came at the direct expense of his own people.

🗣️ This quotes the king's own words

🏛️ He wanted a much bigger palace

💺 Comfort mattered more than his people

📖 His ambition cost others dearly

## 🪵 Cutteth Him Out Windows, And It Is Cieled With Cedar, And Painted With Vermilion

Cieled means the walls or ceiling were paneled with fine wood, here expensive cedar.

Vermilion was a bright red pigment used for decoration, imported at real cost.

Large windows, cedar paneling, and red paint together signaled extreme royal luxury.

Every detail listed here was a display of wealth, not a note of comfort.

🪵 Cieled means paneled walls or ceiling

🔴 Vermilion was a costly red pigment

🪟 Windows added to the display of wealth

📖 Every detail here showed off luxury

## ❓ Shalt Thou Reign, Because Thou Closest Thyself In Cedar?

This is a sharp, pointed question, not a real request for information.

Closest thyself in cedar means surrounding yourself with luxury and expensive materials.

True kingship was never measured by how impressive a palace looked.

God corrects a wrong assumption before He explains what actually counted.

❓ This question is sharp, not curious

🪵 Closest in cedar means surrounded by luxury

👑 Kingship was never measured by luxury

📖 God corrects this wrong assumption directly

## 👑 Did Not Thy Father Eat And Drink, And Do Judgment And Justice

Thy father here refers to Josiah, this king's own predecessor and family.

Josiah enjoyed the normal comforts of royal life, the same as any king.

The difference was that Josiah paired his comfort with real, active justice.

Enjoying royal life was never the actual problem God was pointing to.

👑 Thy father means King Josiah

🍽️ Josiah also enjoyed royal comforts

⚖️ He paired comfort with real justice

📖 Comfort itself was never the problem

## 🤝 He Judged The Cause Of The Poor And Needy, Then It Was Well With Him

Judging the cause of the poor means actively defending people without power or money.

This phrase describes Josiah's daily practice of ruling, not a single kind act.

Then it was well with him ties real justice directly to real blessing.

Josiah's legacy rested on how he treated the powerless, not on his palace.

🤝 He actively defended the poor

📅 This was his daily practice

🎁 Real justice brought real blessing

📖 His legacy rested on treating the powerless

## 🧠 Was Not This To Know Me?

Knowing God here means far more than believing facts about Him.

It means living out justice in daily, practical decisions of leadership.

Josiah's fair treatment of the poor was itself a form of worship.

Religious ritual without justice was never the same thing as truly knowing God.

🧠 Knowing God means more than belief

⚖️ It means practicing justice daily

🙏 Josiah's fairness was itself worship

📖 Ritual without justice is not knowing God

## 👀 Thine Eyes And Thine Heart Are Not But For Thy Covetousness

Eyes and heart together describe a person's whole attention and desire.

Covetousness means an intense, selfish craving for more wealth and possessions.

This king's entire focus had narrowed down to personal gain alone.

The contrast with his own father could not be stated more plainly.

👀 Eyes and heart mean total focus

💰 Covetousness means selfish craving for more

🎯 His focus had narrowed to personal gain

📖 The contrast with his father is stark

# Jeremiah 22:18-19
# ⚰️ No Mourning For This King
---
## 👑 Concerning Jehoiakim The Son Of Josiah King Of Judah

Jehoiakim is finally named directly as the target of the last section's accusation.

Egypt's king had installed him on the throne after removing his brother Shallum.

Jehoiakim and Shallum, also called Jehoahaz, were both sons of Josiah.

Two brothers from the same righteous father ended up ruling very differently.

👑 Jehoiakim is finally named here

🏺 Egypt's king put him on the throne

🔗 He was Shallum's brother

📖 Two brothers, one righteous father, different paths

## 😭 They Shall Not Lament For Him, Saying, Ah My Brother!

Ancient funerals for kings included formal, ritual cries of grief spoken aloud.

Phrases like ah my brother or ah lord were expected parts of royal mourning.

Jehoiakim would receive none of these customary cries when he died.

A king who lived without justice would also die without honor.

😭 Kings received ritual mourning cries

🗣️ Phrases like ah lord were expected

🚫 Jehoiakim would get none of this

📖 A life without justice ended without honor

## 🐴 He Shall Be Buried With The Burial Of An Ass

Donkeys that died were simply dragged away and left, with no burial rites at all.

Comparing a king's burial to that of a donkey was the deepest possible insult.

Kings normally received elaborate burials inside the City of David.

This king would get the treatment given to an animal instead.

🐴 Donkeys received no burial rites

👑 Kings normally got elaborate burials

💔 This was the deepest possible insult

📖 A king treated like an animal in death

## 🚚 Drawn And Cast Forth Beyond The Gates Of Jerusalem

Drawn means dragged, and cast forth means thrown out without care or ceremony.

Beyond the gates means his body would end up outside the city entirely.

Being buried outside the city walls was its own mark of shame.

The chapter that opened with a warning at the gates now ends there too.

🚚 Drawn means dragged away

🗑️ Cast forth means thrown out carelessly

🏙️ Outside the gates meant shame

📖 This ending echoes the chapter's opening

# Jeremiah 22:20-23
# 🌬️ The Wind Takes The Shepherds
---
## 🏙️ Go Up To Lebanon, And Cry, Lift Up Thy Voice In Bashan

Jerusalem is now addressed directly as a woman, a common prophetic picture for a city.

Lebanon and Bashan were both famous for height, richness, and natural beauty.

She is told to climb to these high, well known places and wail out loud.

A cry from these locations would be seen and heard from a great distance.

🏙️ Jerusalem is pictured as a woman

🌲 Lebanon and Bashan were rich, high places

📢 She is told to cry out loud

📖 A cry this public could not be missed

## ⛰️ Cry From The Passages

Many scholars believe the passages points to Abarim, a mountain range on Judah's border.

This was another high, visible location suited to a cry meant to be heard far away.

Naming specific mountains made the summons feel real and immediate, not vague.

Every direction Judah could look held a place calling her to grieve.

⛰️ Passages likely means the Abarim range

📢 It was another high, visible spot

🧭 Naming real places made this feel immediate

📖 Every direction called Judah to grieve

## 🤝 For All Thy Lovers Are Destroyed

Lovers here does not describe romance, it describes foreign political allies.

Judah had trusted nations like Egypt instead of trusting God for protection.

Prophets often used this same language to describe unfaithful alliances as a kind of unfaithfulness.

Every ally Judah leaned on would fail at the exact moment she needed them.

🤝 Lovers means foreign political allies

🏺 Judah trusted Egypt instead of God

💔 Prophets called these alliances unfaithfulness

📖 Every ally would fail when needed most

## 🗣️ I Spake Unto Thee In Thy Prosperity, But Thou Saidst, I Will Not Hear

God did not wait until disaster struck to speak to Judah.

He spoke plainly during the good years, when life still felt secure.

Judah's answer was blunt refusal, not confusion or ignorance.

Prosperity had made the warning easy to dismiss instead of easy to hear.

🗣️ God spoke during the good years

🚫 Judah bluntly refused to listen

💰 Prosperity made the warning easy to ignore

📖 Comfort dulled her ability to hear God

## 📅 This Hath Been Thy Manner From Thy Youth

Youth here refers to Judah's early history as a nation, long before this moment.

This was never a single lapse or a one time mistake.

God describes a lifelong pattern of ignoring warnings, even during good times.

The root problem went back much further than anyone in this chapter's audience remembered.

📅 Youth means Judah's early history

🔁 This was a lifelong pattern

👂 Warnings were ignored even in good times

📖 The problem ran deeper than one moment

## 🐑 The Wind Shall Eat Up All Thy Pastors

Pastors here is an old word for shepherds, meaning the nation's rulers and leaders.

The wind eating them up pictures them being scattered helplessly, like chaff in a storm.

Leaders who should have protected the people would instead be swept away themselves.

A nation cannot stand once its own shepherds have been scattered.

🐑 Pastors is an old word for rulers

🌬️ Wind pictures being scattered helplessly

🛡️ Leaders meant to protect would be swept away

📖 A scattered leadership leaves a nation defenseless

## 😳 Surely Then Shalt Thou Be Ashamed And Confounded For All Thy Wickedness

Ashamed and confounded both describe a public, humiliating collapse of confidence.

This shame would come once her allies and her leaders were both gone.

The verse ties this humiliation directly back to real, specific wrongdoing.

Judah's coming disgrace was earned, not accidental or unfair.

😳 Ashamed and confounded mean public humiliation

🤝 This came once allies and leaders failed

⚖️ The shame is tied to real wrongdoing

📖 This disgrace was earned, not random

## 🐦 O Inhabitant Of Lebanon, That Makest Thy Nest In The Cedars

This pictures Jerusalem as a bird nesting proudly high up in tall cedar trees.

A nest that high felt permanently safe from any danger below.

The image describes Judah's false confidence in her allies and her high position.

That sense of safety was about to be shaken completely.

🐦 Jerusalem is pictured as a nesting bird

🌲 The nest sat high in cedar trees

😌 High position felt permanently safe

📖 That false safety was about to break

## ✨ How Gracious Shalt Thou Be When Pangs Come Upon Thee

Gracious here means graceful or charming, not kind or merciful.

Pangs and the pain of a woman in travail both describe intense labor pain.

The question is bitterly ironic, asking how charming she will look while in agony.

All the composure Judah once displayed would collapse under real distress.

✨ Gracious here means graceful, not kind

🤰 Pangs describes intense labor pain

😖 The question is bitterly ironic

📖 Composure collapses under real distress

# Jeremiah 22:24-27
# 💍 The Signet Ring Removed
---
## 🙌 As I Live, Saith The LORD

This phrase is a solemn oath formula God uses only in the most serious moments.

Swearing by His own life means there is nothing greater to guarantee the promise.

What follows this phrase is certain, not a passing threat.

Coniah is about to hear the most personal judgment yet in this chapter.

🙌 This is a solemn oath formula

🔝 Nothing greater exists to guarantee it

✅ What follows is certain, not idle

📖 A deeply personal judgment follows this

## 👑 Though Coniah Were The Signet Upon My Right Hand

Coniah is another name for Jehoiachin, also called Jeconiah elsewhere in scripture.

He was Jehoiakim's son, next in line for the throne of Judah.

A signet was a ring used to stamp and seal official documents.

Wearing it on the king's own hand pictured someone trusted with his full authority.

👑 Coniah is Jehoiachin, also called Jeconiah

🔗 He was Jehoiakim's son

💍 A signet sealed official documents

📖 It pictured someone trusted with full authority

## ✋ Yet Would I Pluck Thee Thence

Pluck thee thence means to violently remove someone from their place.

Even a signet ring, worn constantly and valued highly, can still be pulled off.

No status, however close to the king it seemed, could protect Coniah now.

God is showing that this judgment reaches the very highest position in the land.

✋ Pluck thence means violently removed

💍 Even a signet ring gets pulled off

🛡️ No status could protect Coniah

📖 This judgment reaches the highest position

## 🎯 Into The Hand Of Them That Seek Thy Life, And Whose Face Thou Fearest

These phrases describe the same enemy in two different, personal ways.

Seeking his life meant they wanted him dead, not merely defeated.

Whose face thou fearest names an enemy Coniah already dreaded before this moment.

The verse names the danger before it even says Babylon's name out loud.

🎯 Both phrases describe the same enemy

💀 Seeking his life meant wanting him dead

😨 Coniah already feared this enemy's face

📖 Danger is named before Babylon is

## 👑 Into The Hand Of Nebuchadrezzar King Of Babylon

Nebuchadrezzar and Nebuchadnezzar are simply two spellings of the same Babylonian king.

Jeremiah's book uses both spellings at different points for this same ruler.

Naming him directly removes any remaining mystery about who this enemy is.

Babylon is the empire that will soon carry Judah's king away.

👑 Nebuchadrezzar and Nebuchadnezzar are the same king

🎯 The enemy is now named directly

⛓️ Babylon will carry Judah's king away

📖 Jeremiah uses both spellings for the same man

## 🏴 Into The Hand Of The Chaldeans

Chaldeans is another name for the Babylonians, the same empire and army.

The word appears often in Jeremiah whenever Babylon's forces are in view.

Repeating the same threat using different names hammers home how certain it is.

There is no version of this outcome where Babylon does not win.

🏴 Chaldeans means the Babylonians

🔁 Repeating names hammers home certainty

⚔️ Babylon's victory here is not in doubt

📖 Jeremiah often uses this name for Babylon

## 👑 I Will Cast Thee Out, And Thy Mother That Bare Thee

The queen mother held a real, official position of influence in Judah's royal court.

Coniah's mother would be exiled right alongside her son, not left behind.

This shows the judgment falling on the whole royal household, not one man alone.

Even the most protected members of the family would share this exile.

👑 The queen mother held real influence

👩 She would be exiled with her son

🏠 Judgment fell on the whole household

📖 Even protected family members shared this exile

## 🔁 But To The Land Whereunto They Desire To Return, Thither Shall They Not Return

Other captivities in Judah's history had eventually come to an end.

This exile is described as different, with no promised road back home.

Desiring to return would not be enough to make it happen.

The chapter's warning about a king's throne ends without any hope of reversal.

🔁 Other captivities had eventually ended

🚫 This one comes with no promised return

🙏 Desire alone would not bring them home

📖 This warning ends without any reversal

# Jeremiah 22:28-30
# 📜 Write This Man Childless
---
## 🗿 Is This Man Coniah A Despised Broken Idol?

This question uses idol imagery in an ironic, ordinary way, not as worship.

A broken idol was a discarded object nobody wanted or valued anymore.

Coniah went from a king wearing a signet to being compared to trash.

The fall in status could hardly be described in starker terms.

🗿 Idol here means a discarded object

📉 Coniah fell from king to trash

💔 The comparison is deliberately harsh

📖 His fall could not be starker

## 🏺 A Vessel Wherein Is No Pleasure?

A vessel here means a jar or container used for everyday household purposes.

A cracked or useless vessel gets thrown out without a second thought.

This second image repeats the same point using different, everyday language.

Coniah is pictured as something once useful, now simply discarded.

🏺 Vessel means an everyday jar or container

🗑️ A useless one gets thrown out

🔁 This repeats the idol image differently

📖 Coniah is pictured as discarded

## 🔁 O Earth, Earth, Earth, Hear The Word Of The LORD

Repeating one word three times in scripture signals maximum urgency and weight.

This is a formal, courtroom style summons demanding the whole world's attention.

The verdict about to be announced is treated as a landmark moment.

Even creation itself is called to witness what happens next.

🔁 Repeating a word signals maximum urgency

⚖️ This sounds like a courtroom summons

🌍 The whole world is called to listen

📖 Even creation witnesses this verdict

## 📜 Write Ye This Man Childless

Coniah did have sons later on, according to the genealogy records in Chronicles.

Childless here does not mean he would never father any children at all.

It means none of his descendants would ever successfully sit on Judah's throne.

The line of kings ruling from Jerusalem effectively stops with this man.

📜 Coniah did have sons later on

👑 Childless means no descendant reigns as king

🚫 His line of ruling kings ends here

📖 This is about the throne, not birth

## ⛓️ A Man That Shall Not Prosper In His Days

Coniah's own life would end without the success or comfort he once knew.

Second Kings records that he spent decades as a prisoner in Babylon.

He was eventually released from prison, but never returned home as king.

This personal ending matched the larger judgment spoken over his whole family.

⛓️ His life ended without success

📚 Second Kings records his years as a prisoner

🏠 He never returned home as king

📖 His ending matched his family's judgment

## 👑 No Man Of His Seed Shall Prosper, Sitting Upon The Throne Of David, And Ruling Any More In Judah

This closes the chapter's long look at three of Josiah's sons and grandson.

Shallum, Jehoiakim, and Coniah each lost the throne in a different way.

The unbroken line of kings physically ruling in Jerusalem effectively ends with this word.

A chapter that opened with hope for the throne closes with its collapse.

👑 Three of Josiah's descendants all lost the throne

📉 Each lost it in a different way

🏛️ The line of ruling kings ends here

📖 Hope for the throne ends in collapse
`.trim();

export const JEREMIAH_TWENTY_TWO_PERSONAL_SECTIONS = parseJeremiahTwentyTwoRawNotes(JEREMIAH_TWENTY_TWO_RAW_NOTES);
