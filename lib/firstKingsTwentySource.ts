export type FirstKingsTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTwentyRawNotes(rawText: string): FirstKingsTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTwenty\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTwenty\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTwenty\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 20:${startVerse}` : `1 Kings 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 1 Kings 20 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TWENTY_RAW_NOTES = `# FirstKingsTwenty 20:1-4
# 😤 Benhadad Demands Total Surrender
---
## 👑 Thirty And Two Kings With Him

Benhadad ruled over Syria, a kingdom northeast of Israel called Aram.

Thirty and two kings joined him for this siege.

These were vassal kings, smaller rulers who answered to Benhadad as their overlord.

This was not one king attacking Israel.

It was an entire coalition surrounding Samaria at once.

👑 Benhadad ruled Syria, called Aram

🤝 Thirty two kings joined him

⚔️ Vassal kings answered to Benhadad

📖 A coalition surrounded Samaria, not one king

## 🏰 Besieged Samaria, And Warred Against It

To besiege a city means surrounding it and cutting off its supplies.

The goal is to force a surrender without a full battle.

Samaria was the capital city of the northern kingdom of Israel.

Ahab ruled from this exact city.

Trapping the capital was meant to force the whole kingdom to give up at once.

🏰 Besiege means surround and cut off supplies

🏙️ Samaria was Israel's capital city

👑 Ahab ruled from here

📖 Trapping the capital aimed to force full surrender

## 💰 Thy Silver And Thy Gold Is Mine

Benhadad does not ask Ahab for tribute here.

He announces that everything Ahab owns already belongs to him.

Silver and gold, wives and children, all get claimed in a single sentence.

This kind of language was standard for a conquering king demanding total surrender.

Ahab is being told he has already lost before a single arrow is fired.

💰 Benhadad claims Ahab's silver and gold

👨‍👩‍👧 He claims Ahab's wives and children too

⚔️ This is surrender language, not a request

📖 Ahab is told he has already lost

## 🙇 I Am Thine, And All That I Have

Ahab agrees to everything without any resistance.

He calls Benhadad "my lord" and "king."

Those titles admit that Ahab is now the lesser ruler.

I am thine, and all that I have hands over his entire kingdom in one line.

This total surrender happens before Benhadad's men take a single item.

🙇 Ahab surrenders without a fight

👑 He calls Benhadad his lord

💬 I am thine gives up everything

📖 Total surrender comes before any battle

# FirstKingsTwenty 20:5-9
# 📜 Ahab Refuses The Second Demand
---
## 🔍 Whatsoever Is Pleasant In Thine Eyes, They Shall Put It In Their Hand

Benhadad's first demand named specific things, silver, gold, wives, and children.

This second demand goes further than the first one.

Now his own servants will search every house in Samaria themselves.

Anything they find pleasing gets taken, with no limit named.

This is not a treaty anymore.

It is open plunder disguised as a peace deal.

🔍 Servants would search every house

🎯 Nothing has a limit this time

💔 This goes further than the first demand

📖 It is plunder disguised as a treaty

## 👴 Elders Of The Land

Elders were the respected leaders of Israelite towns and tribes.

Kings still consulted them before major decisions.

Ahab gathers all of them together for this one.

Calling a full council shows how serious this second demand felt to him.

👴 Elders were respected town leaders

👑 Kings still consulted them

📢 Ahab calls the whole council

📖 The threat felt serious enough for that

## 🎯 Mark, I Pray You, And See How This Man Seeketh Mischief

To seek mischief means to look for an excuse to cause harm.

Ahab is not overreacting here.

He already gave in fully to the first demand and denied Benhadad nothing.

The second, harsher demand exposes that Benhadad was never going to stop.

🎯 Mischief means an excuse to harm

✅ Ahab already agreed to the first demand

🔁 Benhadad asked for more anyway

📖 The real goal was never satisfied

## 🗣️ Hearken Not Unto Him, Nor Consent

The elders give Ahab a rare, unanimous answer.

Hearken means listen and obey.

Every elder agrees that this demand should be refused completely.

This is one of the few moments in Ahab's reign where good counsel wins out.

🗣️ Hearken means listen and obey

🙅 Every elder says refuse it

✅ Rare unanimous agreement here

📖 Good counsel wins this time

## 🚫 This Thing I May Not Do

Ahab already agreed to Benhadad's first demand without hesitation.

Now he draws a line at the second one.

His refusal is not really about newfound courage.

It is the elders and the people who pushed him to say no.

🔁 Ahab agreed to the first demand

🚫 He refuses the second one

👥 Pressure came from the elders and people

📖 This was not really Ahab's own courage

# FirstKingsTwenty 20:10-12
# 🍷 Benhadad's Boast
---
## 🙏 The Gods Do So Unto Me, And More Also

This is an ancient oath formula.

The speaker calls down a curse on their own gods if the words do not come true.

Jezebel used this same formula against Elijah back in chapter nineteen.

Speaking a curse on yourself was a way of making a threat sound certain.

🙏 An oath calling curses on himself

📜 Jezebel used this same formula before

⚔️ It made the threat sound certain

📖 This links back to chapter nineteen

## ✋ If The Dust Of Samaria Shall Suffice For Handfuls

Benhadad boasts that his army is enormous.

Every soldier could scoop up a handful of Samaria's dust.

Even then, there would not be enough dust for all of them.

This is exaggeration, meant to sound overwhelming.

He says this before the battle even starts.

✋ Every soldier gets a handful of dust

📢 The boast means his army is huge

💬 It is exaggeration, not a real plan

📖 He says this before the battle starts

## 🛡️ Let Not Him That Girdeth On His Harness Boast Himself As He That Putteth It Off

Ahab answers with an old proverb.

Girding on the harness means putting on armor to prepare for battle.

Putting it off means taking the armor off once the fight is over.

The proverb means do not celebrate a victory before the battle happens.

Ahab is telling Benhadad his boast is premature.

🛡️ Girding on harness means putting on armor

🏁 Putting it off means the fight is done

⏳ Do not celebrate before it is over

📖 Ahab calls the boast premature

## 🍷 Benhadad Heard This Message, As He Was Drinking

Benhadad receives Ahab's reply in the middle of a drinking party.

He and thirty two kings are feasting together in tents called pavilions.

He gives the order to attack while still in the middle of that feast.

Confidence and alcohol are driving this decision, not careful planning.

🍷 Benhadad is drinking when the reply comes

⛺ Pavilions were the kings' tents

😤 He orders the attack mid feast

📖 Confidence, not planning, drives this call

# FirstKingsTwenty 20:13-15
# 🔮 A Prophet Promises Victory
---
## 🔮 There Came A Prophet Unto Ahab King Of Israel

This prophet is never named in the chapter.

God sends him to Ahab despite Ahab's history of worshiping Baal.

Israel is badly outnumbered and surrounded at this moment.

God still chooses to speak and act on Ahab's behalf.

🔮 The prophet's name is never given

🙏 God speaks despite Ahab's history with Baal

⚔️ Israel is badly outnumbered here

📖 God still chooses to help Israel

## 📜 Thou Shalt Know That I Am The LORD

This phrase repeats often throughout the Old Testament.

God ties the coming victory directly to His own name.

The battle is not just about saving Ahab's kingdom.

It is proof, in front of Ahab and Israel, of exactly who God is.

📜 This phrase repeats often in scripture

🏆 Victory here proves who God is

👑 It is bigger than saving Ahab

📖 God ties the win to His name

## 🧑 Even By The Young Men Of The Princes Of The Provinces

This is not Israel's normal trained army.

These young men were the attendants and staff of local governors.

Using untrained men instead of soldiers made the coming victory even more surprising.

The strength behind the win could not be credited to Israel's own military skill.

🧑 These were governors' young attendants

❌ Not Israel's trained soldiers

😲 An unlikely group to win with

📖 The win could not be credited to skill

## 🔢 Two Hundred And Thirty And Two

This number counts the young attendants who lead the first attack.

Seven thousand more Israelites follow behind them.

Benhadad's coalition commands thirty two kings and their combined armies.

Israel's total force is small next to that kind of strength.

🔢 232 young men led the way

🚶 7000 more followed behind

⚔️ Benhadad commanded 32 kings' armies

📖 Israel's numbers were small by comparison

# FirstKingsTwenty 20:16-21
# ⚔️ Israel's Surprising Victory
---
## ☀️ They Went Out At Noon

Armies rarely attacked in the middle of the day.

Noon offered no cover of darkness or morning fog to hide behind.

Benhadad was not expecting an attack at this hour at all.

He was still busy feasting when it happened.

☀️ Noon offered no cover to hide

😲 Benhadad did not expect it now

⏰ An unusual hour for an attack

📖 Surprise came from the timing itself

## 🍷 Benhadad Was Drinking Himself Drunk In The Pavilions

Benhadad and his thirty two allied kings are still feasting when Israel attacks.

Drinking himself drunk means he was fully intoxicated, not lightly enjoying a cup of wine.

The coming defeat catches an entire coalition off guard at once.

Overconfidence left no one watching for danger.

🍷 Benhadad was fully intoxicated

🤝 So were his thirty two allies

😴 No one was watching for danger

📖 Overconfidence left the coalition exposed

## 🎯 Whether They Be Come Out For Peace, Take Them Alive

Benhadad gives one order no matter what Israel's small group is doing.

Take them alive applies whether they come for peace or for war.

This order sounds confident, almost careless.

He never imagines Israel's small group could actually win.

🎯 One order covers every outcome

😏 The order sounds careless and confident

❌ He never expects to lose

📖 His confidence blinds him to the danger

## 🏃 The Syrians Fled, And Israel Pursued Them

Israel's small, untrained group routs an entire coalition army.

The Syrians break and run almost immediately.

Benhadad himself escapes only by riding away on a horse.

A king who boasted about handfuls of dust now flees his own battlefield.

🏃 The Syrian army breaks and flees

🐎 Benhadad escapes on a horse

😳 His earlier boast now looks foolish

📖 The unlikely army wins the day

## 🐎 Smote The Horses And Chariots, And Slew The Syrians With A Great Slaughter

Ahab presses the advantage once the Syrians start running.

Horses and chariots were Syria's most valuable military equipment.

Destroying them crippled Syria's ability to fight again soon.

The victory was total, not partial.

🐎 Horses and chariots were destroyed too

💪 This crippled Syria's ability to fight

🏆 The victory was total, not partial

📖 Israel pressed the advantage fully

# FirstKingsTwenty 20:22-25
# 🌱 Planning A Rematch
---
## 🌱 At The Return Of The Year The King Of Syria Will Come Up Against Thee

The return of the year refers to spring, when kings traditionally began military campaigns.

Ancient armies usually paused fighting during winter.

The prophet warns Ahab that this victory does not end the conflict.

Benhadad will return once the campaign season starts again.

🌱 Return of the year means spring

❄️ Winter usually paused campaigns

⚠️ This warns of a second attack

📖 The war was not over yet

## ⛰️ Their Gods Are Gods Of The Hills, Therefore They Were Stronger Than We

Benhadad's servants believe every god only holds power in certain territory.

They assume Israel's God only rules mountains and hill country.

This belief comes from the surrounding pagan cultures, not from anything true about God.

Their advice sets up the next battle to directly test that wrong idea.

⛰️ They think Israel's God rules hills only

🌍 This came from pagan cultural belief

❌ It was never actually true

📖 The next battle will test that idea

## 🎖️ Put Captains In Their Rooms

Benhadad's servants suggest a change in command structure.

Removing the thirty two kings takes away leaders who answer to no one but themselves.

Putting captains in their place gives Benhadad more direct control over his own army.

This was a real strategy shift, not just superstition about hill gods.

👑 Thirty two kings are removed from command

🎖️ Captains take their place instead

🎯 Benhadad gains more direct control

📖 This was real strategy, not just superstition

## ✅ He Hearkened Unto Their Voice, And Did So

Benhadad follows his servants' advice completely.

He gathers a new army to match the one he lost.

Nothing in this plan corrects the wrong belief about God's power.

The coming battle will prove that belief false either way.

✅ Benhadad follows the advice completely

🔁 He rebuilds an army to match the last

❌ The wrong belief is never corrected

📖 The next battle will prove it false

# FirstKingsTwenty 20:26-30
# 🏔️ God Is Not Just A God Of The Hills
---
## 🗺️ Went Up To Aphek, To Fight Against Israel

Aphek was a town east of the Sea of Galilee, sitting on flat, open ground.

This location fits Syria's new strategy exactly.

Their servants had argued that Israel's God only had power in the hills.

Fighting on a plain was meant to prove that theory right.

🗺️ Aphek sat on flat, open ground

📜 This fit Syria's new strategy

⛰️ They avoided the hills on purpose

📖 The plain would test their theory

## 🐐 Like Two Little Flocks Of Kids, But The Syrians Filled The Country

A kid is a young goat, small and defenseless next to a grown animal.

Israel's army looked like two tiny herds next to Syria's massive force.

The Syrian army was so large it covered the entire visible landscape.

The size difference was meant to look hopeless for Israel.

🐐 A kid is a small, young goat

📏 Israel looked tiny by comparison

🌍 Syria's army filled the whole landscape

📖 The odds looked hopeless on purpose

## 🌾 He Is Not God Of The Valleys

A man of God directly answers Syria's wrong belief from verse twenty three.

God is not confined to hills or mountains.

He rules every kind of land, valleys included.

This coming battle happens specifically to correct that false idea about Him.

⛰️ Syria believed God ruled hills only

🌾 God rules valleys just as fully

❌ Their belief gets directly corrected

📖 The battle answers their false theology

## ⏳ They Pitched One Over Against The Other Seven Days

Both armies camp facing each other for a full week before fighting begins.

Seven is a number that often marks completion in scripture.

The delay builds tension and lets both sides consider what is about to happen.

The battle finally starts on the seventh day.

⏳ Both armies wait seven full days

🔢 Seven often marks completion in scripture

😬 The delay builds tension

📖 The battle finally starts on day seven

## 🔢 Slew Of The Syrians An Hundred Thousand Footmen In One Day

One hundred thousand soldiers die in a single day of fighting.

This is a massive, overwhelming defeat for Syria.

The number matches the scale of Syria's earlier boast about handfuls of dust.

God's answer to their pride is just as total as their arrogance was.

🔢 100000 soldiers fall in one day

💔 A massive defeat for Syria

😤 It matches the scale of their boast

📖 God's answer is just as total

## 🧱 There A Wall Fell Upon Twenty And Seven Thousand

The surviving Syrians flee into the city of Aphek for safety.

A city wall collapses there, killing twenty seven thousand of them.

The text does not explain exactly how the wall fell.

Even the place they ran to for safety becomes part of their defeat.

🏃 Survivors flee into the city

🧱 A wall collapses on 27000 of them

❓ The text does not explain the cause

📖 Their place of safety brings defeat too

# FirstKingsTwenty 20:31-34
# 🤝 Benhadad Begs For His Life
---
## 🧵 Put Sackcloth On Our Loins, And Ropes Upon Our Heads

Sackcloth is coarse, rough cloth normally worn to show grief or mourning.

Here it signals surrender and desperate pleading instead.

Ropes around the head marked complete submission, much like a prisoner awaiting judgment.

Benhadad's own servants dress this way before facing the king they nearly conquered.

🧵 Sackcloth was rough cloth for grief

🙇 Here it signals surrender instead

⛓️ Ropes on the head showed submission

📖 They approach as prisoners, not equals

## 🙏 The Kings Of The House Of Israel Are Merciful Kings

Benhadad's servants count on Israel's kings having a reputation for mercy.

That reputation ends up saving Benhadad's life.

Ahab's mercy here is not the same thing as covenant faithfulness to God.

Kindness toward an enemy king is not the same thing as obedience.

🙏 Servants count on Israel's mercy

✅ That mercy saves Benhadad's life

❌ Mercy here is not covenant faithfulness

📖 Kindness and obedience are not the same

## 🤝 Is He Yet Alive? He Is My Brother

Ahab calls his enemy king "my brother" the moment he hears Benhadad survived.

Brother here means a political equal or ally, not blood family.

Ahab treats the man who besieged his capital twice as a peer, not a defeated enemy.

This decision brings a prophet's judgment on Ahab later in this same chapter.

🤝 Brother meant a political equal here

👑 Benhadad besieged Samaria twice

⚖️ Ahab treats him as an equal

📖 This choice brings judgment later

## 🏙️ Thou Shalt Make Streets For Thee In Damascus

Damascus was Syria's capital city.

Making streets there gave Ahab trading rights and a market inside enemy territory.

Benhadad's own father had done the same thing to Israel in Samaria earlier.

Ahab settles for financial gain instead of finishing off a defeated enemy.

🏙️ Damascus was Syria's capital

💰 Streets meant trading rights there

🔁 Benhadad's father did the same to Israel

📖 Ahab chose profit over finishing the war

# FirstKingsTwenty 20:35-40
# 🦁 A Prophet's Parable
---
## 🗣️ Smite Me, I Pray Thee. And The Man Refused To Smite Him

Sons of the prophets refers to a group or school of prophets, not literal sons.

One prophet asks a companion to strike him, speaking by the word of the LORD.

The command sounds strange, but it comes from God, not from the man's own idea.

His companion refuses, thinking it wrong to strike a prophet.

👥 Sons of the prophets means a prophetic group

🗣️ The command came from God's word

❓ It sounded like a strange request

📖 One man refuses to obey it

## 🦁 A Lion Shall Slay Thee

The refusing man disobeyed a command that genuinely came from the LORD.

A lion kills him almost immediately after he walks away.

The punishment seems severe for what looked like a small act of caution.

The story is really pointing at a much bigger disobedience still to come in this chapter.

🦁 A lion kills the man who refused

⚡ The punishment follows almost immediately

❓ It looks severe for a small refusal

📖 It points toward a bigger disobedience ahead

## 🩹 Smote Him, So That In Smiting He Wounded Him

The prophet finds a second man and repeats the same odd request.

This time the man obeys and actually wounds him.

The wound is not an accident.

It is the whole point, since the prophet needs to look like a wounded soldier next.

✅ The second man obeys and wounds him

🩹 The wound is intentional, not an accident

🎭 It sets up a disguise

📖 Obedience here looks painful but purposeful

## 🎭 Disguised Himself With Ashes Upon His Face

The prophet covers his face with ashes so the king will not recognize him.

He waits along the road for Ahab to pass by.

This setup mirrors a scene that comes later in the Bible.

The prophet Nathan uses the same trick on King David.

Disguising himself lets Ahab judge the case before realizing it is about him.

🎭 Ashes hide the prophet's identity

🛣️ He waits for Ahab on the road

📜 This mirrors Nathan's parable to David

📖 Ahab judges his own case unknowingly

## ⚖️ Thy Life Shall Go For His Life, Or Else Thou Shalt Pay A Talent Of Silver

The disguised prophet tells Ahab a made up story about guarding a prisoner in battle.

Losing the prisoner would cost the guard his own life or a huge fine.

A talent of silver was an enormous sum of money, far beyond an ordinary soldier's means.

The story is designed to make Ahab judge it harshly.

He does not yet realize the story describes his own choice.

⚖️ The made up story raises high stakes

💰 A talent of silver was a huge sum

🎯 The penalty sounds severe on purpose

📖 Ahab judges it before knowing

## 😮 As Thy Servant Was Busy Here And There, He Was Gone

The soldier in the story loses the prisoner through simple carelessness.

Ahab immediately condemns him, saying the man decided his own fate.

Ahab does not yet realize the story is about his own decision with Benhadad.

His quick judgment on someone else is about to turn back on him.

😮 The soldier loses the prisoner carelessly

⚖️ Ahab quickly condemns him

❓ He misses that it is about him

📖 His judgment is about to backfire

# FirstKingsTwenty 20:41-43
# ⚖️ Ahab's Sentence
---
## 🎭 The King Of Israel Discerned Him That He Was Of The Prophets

The prophet removes the ashes from his face.

Ahab suddenly recognizes him as one of the LORD's prophets.

The disguise has done its job perfectly.

Ahab already passed judgment before realizing the story was about himself.

🎭 The ashes come off

👀 Ahab recognizes the prophet

🎯 The disguise worked exactly as planned

📖 Ahab already judged himself unknowingly

## ⚖️ A Man Whom I Appointed To Utter Destruction

Utter destruction describes a person or group specifically devoted to judgment under God's command.

Benhadad had been placed under that kind of sentence.

Ahab's covenant of friendship let Benhadad walk free instead.

Sparing an enemy God had already condemned still counted as disobedience.

⚖️ Utter destruction meant devoted to judgment

👑 Benhadad was under that sentence

🤝 Ahab spared him instead

📖 Mercy toward him was still disobedience

## ⚖️ Thy Life Shall Go For His Life, And Thy People For His People

The prophet hands down a direct and personal judgment.

Ahab will pay with his own life for letting Benhadad go free.

Israel as a nation will also suffer for this same decision.

This sentence sets up conflict with Syria that continues in later chapters.

⚖️ Ahab's life is now on the line

🇮🇱 Israel's people share the consequence too

🔮 This sets up future conflict with Syria

📖 One act of mercy carries a national cost

## 😠 Went To His House Heavy And Displeased

Heavy and displeased describes sulking anger, not genuine sorrow over disobedience.

Ahab reacts to correction with irritation instead of repentance.

This same reaction shows up again in the very next chapter.

That time it happens over Naboth's vineyard.

A pattern in Ahab's character is forming here, not just a single bad mood.

😠 Heavy and displeased means sulking

❌ Not genuine repentance

🔁 The same reaction repeats next chapter

📖 This is a pattern, not a mood
`.trim();

export const FIRST_KINGS_TWENTY_PERSONAL_SECTIONS = parseFirstKingsTwentyRawNotes(FIRST_KINGS_TWENTY_RAW_NOTES);
