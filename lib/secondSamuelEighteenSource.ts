export type SecondSamuelEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelEighteenRawNotes(rawText: string): SecondSamuelEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 18:${startVerse}` : `2 Samuel 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Samuel 18 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_EIGHTEEN_RAW_NOTES = `# SecondSamuel 18:1-5
# ⚔️ David Sends The Army Out To War
---
## 📋 Numbered The People, And Set Captains

"Numbered" means David counted and organized his fighting men before battle.

This was not a casual headcount.

Captains over thousands and captains over hundreds gave the army real structure.

Every soldier now had a clear leader to follow into battle.

David prepared carefully for a war he never wanted to fight.

📋 Numbered means counted and organized
⚔️ Captains led thousands and hundreds
🪖 Every soldier had a clear leader
📖 War against his own son needed real order

## ⚔️ A Third Part Under The Hand Of Joab

David splits his army into three separate divisions before the battle.

Splitting a force this way was a common ancient war tactic.

If one division failed, the other two could still hold the line.

Gideon used a similar three way split generations earlier in Judges.

A single defeat could no longer end the whole war at once.

⚔️ Army split into three divisions
🛡️ One defeat could not end everything
📜 Gideon used a similar tactic
📖 Splitting the force protected the whole army

## 👪 Abishai The Son Of Zeruiah, Joab's Brother

Zeruiah was David's own sister, which makes these men his nephews.

Joab, Abishai, and their brother Asahel were all Zeruiah's sons.

That family tie explains why Joab holds so much power in David's army.

Blood relation to the king came with real military authority.

Family loyalty and army leadership were tangled together in this house.

👪 Zeruiah was David's own sister
⚔️ Joab and Abishai were nephews
👑 Family ties brought real authority
➡️ Blood and command were tangled together

## 🌍 Ittai The Gittite

"Gittite" means a man from Gath, one of the Philistine cities.

Ittai was a foreigner, not a native Israelite at all.

Back in chapter fifteen he pledged full loyalty to David during the same rebellion.

David tried to send him home, but Ittai refused to leave his side.

A foreign outsider ended up more loyal than David's own son.

🌍 Gittite means from the city of Gath
🤝 Ittai pledged loyalty back in chapter fifteen
🚫 He refused to leave David's side
📖 A foreigner outlasted David's own son in loyalty

## 🛡️ I Will Surely Go Forth With You Myself Also

David wants to fight beside his own soldiers in this battle.

He has led armies personally for most of his life.

This war feels different, since the enemy is his own son Absalom.

David still wants to be there when it happens.

A father cannot simply sit back while his son is in danger.

🛡️ David wants to fight personally
👑 He has led armies his whole life
😥 This war is against his own son
📖 A father wants to be near the danger

## 🚫 Thou Shalt Not Go Forth

The army is not disrespecting David by refusing this request.

They are protecting him, because he is worth more to them than any soldier.

If David died in battle, the whole cause would collapse instantly.

Keeping the king safe kept the entire kingdom safe.

Sometimes loyalty means telling a leader no.

🚫 The army refuses David's request
🛡️ They are protecting him, not defying him
👑 His death would end the whole cause
➡️ Real loyalty sometimes means saying no

## 💰 Thou Art Worth Ten Thousand Of Us

This number is not a literal headcount comparison.

It means David's life carried more weight than any single soldier's life.

As king, he represented the whole nation in one person.

Losing him would have been far worse than losing thousands of soldiers.

The army valued David as the symbol of the kingdom itself.

💰 Ten thousand is not a literal count
👑 David represented the whole nation
⚖️ His life outweighed any soldier's life
📖 Protecting the king protected the kingdom

## 🏙️ Succour Us Out Of The City

"Succour" means to help, support, or send relief.

The army is asking David to stay back and send reinforcements instead.

He could still lead from a place of safety in the city.

His presence there would matter just as much as his presence on the field.

Wisdom does not always mean being on the front line.

🏙️ Succour means help or relief
🏰 David could lead from the city
🧠 Wise leadership does not need the front line
📖 Support from safety still counts as leadership

## 🤝 What Seemeth You Best I Will Do

David gives up control and trusts his own men's judgment here.

This is a real change from a king who usually gives the orders.

He listens because he knows his officers can see the danger more clearly.

Good leaders know when to stop insisting and start listening.

🤝 David yields to his officers' judgment
👑 A rare moment for a king who commands
👂 He trusts what they can see
➡️ Good leaders know when to listen

## 💔 Deal Gently For My Sake With The Young Man

David gives one final order before the army marches out.

He does not ask for victory or vengeance.

He asks his commanders to spare his son's life if they can.

Absalom had led an open rebellion trying to kill his own father.

David still calls him "the young man," not a traitor or an enemy.

A father's love reached further than any rebellion could break it.

💔 David's final order is mercy, not victory
👶 He calls Absalom "the young man"
⚔️ Absalom had rebelled to kill his father
📖 A father's love outlasted the betrayal

# SecondSamuel 18:6-8
# 🌲 The Wood Of Ephraim
---
## 🌲 The Battle Was In The Wood Of Ephraim

This forest sat east of the Jordan River, in Gilead.

The name is confusing, since the tribe of Ephraim lived west of the Jordan.

The text does not fully explain why this eastern forest carried that name.

What matters most is that the terrain itself became a battlefield.

The forest was about to prove more dangerous than the enemy army.

🌲 The wood sat east of the Jordan
❓ The name does not match Ephraim's territory
🗺️ The text does not explain why
📖 The terrain became its own battlefield

## ⚔️ The People Of Israel Were Slain Before The Servants Of David

"Israel" here means Absalom's rebel army, not David's own side.

David is still Israel's true king through this entire chapter.

Absalom's forces simply borrowed the nation's name for his uprising.

This whole battle was a civil war, Israelite against Israelite.

⚔️ Israel here means Absalom's rebel side
👑 David remained the true king
🏴 Absalom borrowed the nation's name
➡️ This was Israelite fighting Israelite

## 🔢 A Great Slaughter That Day Of Twenty Thousand Men

Twenty thousand deaths in a single day is a staggering number.

This was not a small skirmish between two armies.

A rebellion built on one man's ambition cost an entire generation of soldiers.

Absalom's bid for the throne carried a devastating human price.

🔢 Twenty thousand died in one day
💥 Not a small skirmish at all
😢 One man's ambition cost thousands
📖 Rebellion carried a devastating price

## 🌲 The Wood Devoured More People Than The Sword

This does not mean trees literally attacked anyone.

Soldiers likely died from falling, getting trapped, or being trampled in thick terrain.

Fleeing through a dense forest was its own kind of danger.

Absalom himself is about to become the clearest example of this.

The land itself turned deadlier than the fighting.

🌲 Trees did not literally attack
🍃 Thick terrain trapped fleeing soldiers
🏃 Fleeing was as risky as fighting
📖 The land proved deadlier than the swords

## 🗺️ Scattered Over The Face Of All The Country

This was not one clean battle line in an open field.

Fighting broke out in pockets across a wide stretch of land.

Soldiers on both sides were spread out and disorganized by the end.

Chaos, not order, defined the final hours of this battle.

🗺️ Fighting spread across wide terrain
🌀 No single clean battle line
😵 Soldiers ended up scattered and lost
➡️ Chaos defined this battle's final hours

# SecondSamuel 18:9-13
# 🌳 Absalom Caught In The Oak
---
## 🐴 Absalom Rode Upon A Mule

A mule was not a lowly animal in this culture.

Kings' sons often rode mules as a mark of royal status.

David himself later gives his own royal mule to Solomon.

Absalom was fleeing on the very animal that symbolized the throne he wanted.

The symbol of his ambition carried him straight into disaster.

🐴 Mules marked royal status, not weakness
👑 David's own mule later goes to Solomon
🏃 Absalom fled on a royal animal
📖 His symbol of ambition led to disaster

## 🌳 His Head Caught Hold Of The Oak

This does not mean Absalom's literal skull got wedged in a branch.

Absalom was famous back in chapter fourteen for his thick, heavy hair.

Most readers picture his long hair tangled in the thick branches instead.

Either way, he was suddenly stuck and completely helpless.

The very thing once praised about him became his trap.

🌳 Not his literal skull wedged in wood
💇 His famous long hair likely tangled instead
🪤 He was suddenly stuck and helpless
📖 His pride became his own trap

## ☁️ Taken Up Between The Heaven And The Earth

Absalom is left hanging, touching neither the ground nor the sky.

His mule simply ran off and left him stranded there alone.

The picture is one of total helplessness in the middle of nowhere.

A prince who once commanded armies now could not even touch the ground.

☁️ Suspended between the ground and sky
🐴 His mule ran off without him
😨 Total helplessness in an instant
➡️ A commander left unable to touch ground

## 💰 Ten Shekels Of Silver, And A Girdle

A "shekel" was an ancient unit of weight used as money.

Ten shekels of silver plus a "girdle," a soldier's belt, was a real reward.

Joab offers real payment for a quick, violent solution to his problem.

He is trying to buy his way around David's own order.

💰 A shekel was an ancient weight of silver
🎗️ A girdle was a soldier's belt
🤑 Joab offers a real cash reward
📖 He tries to buy around David's order

## 🚫 Though I Should Receive A Thousand Shekels

The soldier turns down an amount a hundred times larger than offered.

Money is clearly not what is stopping him here.

Fear of consequences matters more to him than any reward could.

Some lines will not move, no matter the price attached.

🚫 He refuses even a huge reward
💵 A thousand shekels far exceeds the offer
😨 Fear matters more than any money
📖 Some lines will not move for a price

## ⚠️ Beware That None Touch The Young Man Absalom

The soldier repeats David's exact order from earlier in this chapter.

He heard it firsthand, publicly, along with the rest of the army.

There is no confusion in his mind about what the king wanted.

The order was clear, and everyone in camp already knew it.

⚠️ He quotes David's own order exactly
👂 He heard it firsthand and publicly
🚫 No confusion about what David wanted
➡️ Everyone in camp already knew this order

## 👑 There Is No Matter Hid From The King

The soldier knows nothing stays secret for long in David's court.

Word of a killing like this would eventually reach the king.

He is not willing to risk everything on Joab's protection.

He trusts that the truth always finds its way to the top.

👑 Secrets rarely stayed hidden from David
🗣️ Word of this would surely spread
🛡️ He will not risk it on Joab's word
📖 The truth tends to reach the top

## ⚔️ Thou Thyself Wouldest Have Set Thyself Against Me

The soldier predicts that Joab would abandon him if trouble followed.

He believes Joab would deny giving the order and blame him alone.

Minutes later, Joab does the killing himself instead of trusting anyone else.

The soldier's caution turns out to be exactly right about Joab.

⚔️ He predicts Joab would abandon him
🙅 Joab would deny giving any order
🗡️ Joab ends up doing it himself
📖 The soldier's suspicion of Joab was right

# SecondSamuel 18:14-15
# 🗡️ Joab Kills Absalom
---
## ⏳ I May Not Tarry Thus With Thee

"Tarry" means to wait or delay.

Joab refuses to keep arguing or waiting any longer.

He decides to act himself instead of convincing the soldier.

Joab does exactly what he told the soldier he would not do.

⏳ Tarry means to wait or delay
🏃 Joab stops arguing and acts himself
🙅 He ignores the soldier's warning
➡️ Joab breaks his own earlier promise

## 🗡️ Thrust Them Through The Heart Of Absalom

Joab takes three darts, likely short spears, and strikes Absalom directly.

This is a direct, personal violation of David's clear order.

Joab chooses his own judgment over his king's explicit command.

Loyalty to David did not stop Joab from disobeying him completely.

🗡️ Darts here mean short throwing spears
🚫 A direct violation of David's order
👑 Joab overrides his own king's command
📖 Loyalty did not mean obedience here

## 😔 While He Was Yet Alive In The Midst Of The Oak

Absalom was still alive and trapped when Joab struck him.

He had no way to fight back or escape.

This detail makes the killing feel even more brutal and unjust.

A helpless man was killed instead of captured.

😔 Absalom was alive and trapped
🚫 He had no way to escape
💔 This made the killing more brutal
📖 A helpless man was killed, not captured

## 🗡️ Ten Young Men That Bare Joab's Armour

Armour bearers were young soldiers assigned to carry a commander's weapons and shield.

Ten of them join in and strike Absalom together after Joab's first blow.

Spreading the killing across many hands may have spread the blame too.

No single man could be pointed to as the only killer.

🗡️ Armour bearers carried a commander's gear
👥 Ten men joined the final blows
⚖️ Shared killing may have shared blame
➡️ No one man could be singled out

# SecondSamuel 18:16-18
# 🪦 A Pit Of Stones, Not A King's Grave
---
## 📯 Joab Blew The Trumpet

The trumpet here was likely a ram's horn used as a battle signal.

Its sound told the army to stop chasing the fleeing enemy.

Joab still commanded real discipline even after his own brutal choice.

He stopped the killing from spreading any further than it had to.

📯 A ram's horn signaled the army
🛑 It told the army to stop chasing
🎖️ Joab still held real command
📖 He limited the killing that followed

## 🕳️ Cast Him Into A Great Pit In The Wood

This was not a burial fit for a king's son.

A pit in the woods was a shameful, hurried resting place.

Achan received a similar burial in Joshua after his own act of rebellion.

Rebellion earned Absalom a criminal's burial, not a royal one.

🕳️ Not a burial fit for royalty
😞 A pit meant shame, not honor
📜 Achan received a similar burial
📖 Rebellion earned a criminal's grave

## 🪨 A Very Great Heap Of Stones Upon Him

Piling stones over a body marked a grave of disgrace in this culture.

It was the opposite of a monument built to honor someone.

Everyone who saw the heap would know exactly what it meant.

The stones themselves announced Absalom's guilt for generations.

🪨 Stone heaps marked shameful graves
🚫 The opposite of an honoring monument
👀 Everyone understood what the heap meant
➡️ The stones announced his guilt for years

## 🏃 All Israel Fled Every One To His Tent

Once Absalom died, his entire rebellion collapsed within minutes.

His followers did not stay to keep fighting for a cause.

They scattered home the moment their leader was gone.

The rebellion was never really about ideas, it was about one man.

🏃 The rebellion collapsed within minutes
🏠 Followers scattered straight back home
🚫 No one kept fighting the cause
📖 The rebellion was really about one man

## 🗿 I Have No Son To Keep My Name In Remembrance

This line creates a real puzzle for careful readers.

Chapter fourteen already named three sons and a daughter belonging to Absalom.

The text does not explain why he says he has none here.

Many scholars believe his sons may have died young, before this moment.

Even the Bible leaves some details honestly unresolved.

🗿 Chapter fourteen named three sons already
❓ This verse creates a real puzzle
👶 His sons may have died young
📖 Scripture sometimes leaves details unresolved

## 🏛️ Called The Pillar After His Own Name

Absalom built himself a monument while he was still alive.

It stood in the king's valley as a lasting tribute to his own name.

He wanted to be remembered as important and permanent.

He ended up remembered by a pit of stones instead.

🏛️ A monument built to his own name
👑 It stood in the king's valley
😔 He wanted to be remembered as great
➡️ A pit of stones remembered him instead

## 📍 Absalom's Place

The narrator adds this detail long after the events happened.

Absalom's pillar apparently still stood as a known landmark for readers of this book.

People could visit the monument even though the man himself was gone.

A vain effort to be remembered still stood, quietly outliving him.

📍 A landmark known to later readers
🏛️ The monument outlived the man himself
👀 People could visit it afterward
📖 Vanity outlived the man who built it

# SecondSamuel 18:19-23
# 🏃 Two Messengers Sent To David
---
## 🏃 Let Me Now Run, And Bear The King Tidings

Ahimaaz was the son of Zadok the priest.

He had already served as a trusted messenger earlier in this rebellion.

Being the first to bring victory news carried real honor.

Ahimaaz wants that honor for himself.

🏃 Ahimaaz was Zadok the priest's son
📨 He had served as a messenger before
🏅 Being first with news brought honor
📖 Ahimaaz wanted that honor for himself

## ⚖️ The LORD Hath Avenged Him Of His Enemies

Ahimaaz frames this as a clean victory given by God.

He does not yet know how the ending actually happened.

The real story includes a helpless death David never wanted.

Good news can still hide a painful, complicated truth underneath.

⚖️ Ahimaaz frames this as God's victory
❓ He does not know the full story
💔 The truth is more painful than it sounds
➡️ Good news can hide a harder truth

## 🛑 Because The King's Son Is Dead

Joab refuses to send Ahimaaz with this particular news.

He does not want Zadok's son burdened with such a heavy message.

This is one of the only gentle moments Joab shows all chapter.

Even Joab wanted to protect someone from this kind of grief.

🛑 Joab blocks Ahimaaz from this news
💔 The message was too heavy to carry
😌 A rare gentle moment from Joab
📖 Even Joab wanted to spare someone grief

## 🌍 Then Said Joab To Cushi

"Cushi" likely means a man from Cush, a region south of Egypt.

He was probably a foreign servant, not a native Israelite messenger.

Joab sends him instead, sparing Ahimaaz from delivering the hard news.

The harder task fell to the outsider in the camp.

🌍 Cush was a region south of Egypt
🧭 Cushi was likely a foreign servant
📨 He carries the harder message instead
➡️ The hard task fell to an outsider

## 🙇 Cushi Bowed Himself Unto Joab, And Ran

Bowing before running off shows a clear respect for Joab's command.

Cushi accepts the assignment without hesitation or complaint.

He heads straight toward the king with the news he was given.

Obedience here looked quiet, quick, and immediate.

🙇 Bowing showed respect before leaving
✅ Cushi accepted without complaint
🏃 He ran straight toward the king
📖 His obedience was quiet and immediate

## ❓ Wherefore Wilt Thou Run, My Son

Joab calls Ahimaaz "my son," a warm and personal term here.

He is warning him gently rather than simply refusing him again.

Joab genuinely does not want Ahimaaz stuck delivering painful news.

Even a hardened commander showed real care in this one moment.

❓ Joab questions why Ahimaaz wants to run
👨‍👦 My son is a warm personal term
💬 Joab warns him gently, not harshly
📖 Even Joab showed real care here

## 🏃 Ran By The Way Of The Plain, And Overran Cushi

Ahimaaz takes a shorter, flatter route instead of Cushi's path.

His determination and physical speed let him pass Cushi entirely.

He is about to reach David first after all, despite Joab's warning.

Eagerness carried him faster than caution had warned him to go.

🏃 Ahimaaz chose a shorter, flatter route
💨 His speed let him pass Cushi
🥇 He reaches David first after all
📖 Eagerness outran Joab's own warning

# SecondSamuel 18:24-27
# 👁️ The Watchman On The Wall
---
## 🚪 David Sat Between The Two Gates

Ancient city gates often had an inner and an outer gate structure.

David waits in the space between them, watching and waiting for news.

This was a natural place for a king to sit and be seen.

He waited there helplessly for word about his own son.

🚪 Cities had inner and outer gates
👑 A natural place for a king to sit
⏳ David waited helplessly for news
➡️ A father waiting for word on his son

## 👁️ The Watchman Went Up To The Roof

Watchmen stood on city walls scanning for danger or approaching travelers.

Their job was to see trouble, or good news, before anyone else did.

This watchman becomes the first to spot the coming messenger.

A single set of eyes carried the whole city's attention.

👁️ Watchmen scanned the walls for danger
🏙️ They saw news before anyone else
🏃 This watchman spots the messenger first
📖 One set of eyes held everyone's attention

## 🏃 If He Be Alone, There Is Tidings In His Mouth

David reasons through the situation before he even hears anything.

A lone runner meant a messenger, not a fleeing, defeated army.

A crowd of runners would have meant the battle was lost.

David reads hope into the smallest detail available to him.

🏃 A lone runner suggested a messenger
👥 A crowd would have meant defeat
🧠 David reasons it out before hearing anything
📖 He reads hope into a small detail

## 💨 He Came Apace, And Drew Near

"Apace" means quickly or at a fast pace.

The runner is closing the distance fast, and the tension is rising.

David and everyone near the gate can only watch and wait.

Every second brings the truth closer, whatever it turns out to be.

💨 Apace means quickly or fast
⏳ The distance closes fast
😬 Tension rises with every step
➡️ The truth was getting closer

## 🏃 Behold Another Man Running Alone

A second runner appears before the first one even arrives.

Two independent reports heading toward the king raise the stakes further.

David assumes this second man also carries news, just like the first.

Two messengers meant the story was about to be confirmed twice.

🏃 A second runner appears quickly
📨 Two independent reports are coming
🧠 David assumes both carry news
📖 The story was about to be confirmed

## 👣 Like The Running Of Ahimaaz The Son Of Zadok

The watchman recognizes the runner's style before he can even see his face.

This small detail shows just how familiar Ahimaaz was around David's camp.

People could identify him from a distance just by how he moved.

Even his running had become recognizable to those who knew him.

👣 The watchman recognizes his running style
🏃 Ahimaaz was familiar around the camp
👀 People knew him from a distance
📖 Even his movement had become recognizable

## 🙂 He Is A Good Man, And Cometh With Good Tidings

David assumes a good messenger always brings good news.

That assumption is about to prove only partly true.

The battle news really is good, but Absalom's fate is not.

David's hopeful guess is half right and half tragically wrong.

🙂 David assumes good character means good news
⚔️ The battle news really is good
💔 Absalom's fate is not good at all
➡️ David's hope was only half correct

# SecondSamuel 18:28-30
# ❓ Is The Young Man Absalom Safe
---
## 📣 All Is Well

Ahimaaz opens with the news he is most comfortable sharing.

It is true, but it is also incomplete on purpose.

He leaves out the one detail David actually needs to hear.

A true statement can still avoid the real question.

📣 Ahimaaz opens with the easy news
✅ It is true but incomplete
🙊 He avoids the harder detail
📖 True words can still dodge a question

## 🙇 Fell Down To The Earth Upon His Face

Falling flat before a king was a formal act of deep respect.

It showed honor before a single word of news was even spoken.

This gesture set the tone before Ahimaaz said anything else.

Respect came first, and the message came second.

🙇 Falling flat showed deep respect
👑 Honor came before any words
🗣️ The gesture set the tone
📖 Respect was offered before the message

## 🙏 Blessed Be The LORD Thy God

Ahimaaz gives credit to God before saying anything about the battle itself.

Framing victory this way was a normal and expected response.

It still does not answer the question David actually wants answered.

Even a religious answer can still be a way of stalling.

🙏 Ahimaaz credits God right away
🎗️ This response was culturally expected
❓ It still avoids David's real question
➡️ A religious answer can still stall

## 😟 Is The Young Man Absalom Safe

David ignores the entire military victory Ahimaaz just described.

This single question is the only thing he actually cares about.

Every soldier, every battle detail, and every strategy fade next to this.

A father's love outweighed the whole war in a single moment.

😟 David ignores the military victory
❤️ Only Absalom's safety matters to him
⚔️ The whole war fades next to this
📖 A father's love outweighed the war

## 🌪️ I Saw A Great Tumult, But I Knew Not What It Was

"Tumult" means loud, chaotic commotion.

Ahimaaz likely saw enough to guess what had happened to Absalom.

He chooses vague words instead of telling David the truth directly.

Sometimes silence feels safer than being the one who says it plainly.

🌪️ Tumult means loud, chaotic commotion
👀 Ahimaaz likely knew more than he says
🤐 He chooses vague words on purpose
📖 Silence felt safer than the plain truth

## 🚶 Turn Aside, And Stand Here

David senses Ahimaaz is holding something back from him.

Rather than press him further, David simply sets him to one side.

He waits instead for someone willing to tell him the truth.

David could tell an answer was being avoided.

🚶 David sets Ahimaaz aside
🧠 He senses something is missing
⏳ He waits for the full truth
➡️ David could tell an answer was avoided

# SecondSamuel 18:31-33
# 😭 O My Son Absalom
---
## 📯 Tidings, My Lord The King

Cushi opens far more directly than Ahimaaz did moments earlier.

He does not lead with reassurance or soft, careful words.

His tone already signals that harder news is coming.

Two messengers, two very different ways of approaching the same king.

📯 Cushi opens directly, not softly
🗣️ No reassurance offered up front
😬 His tone signals harder news
📖 Two messengers, two different approaches

## ⚖️ The LORD Hath Avenged Thee This Day

Cushi also credits God for the day's victory, just like Ahimaaz did.

Both messengers frame the outcome as God's doing, not their own.

Cushi is about to be far more honest about the cost, though.

Crediting God did not stop him from telling the whole truth.

⚖️ Cushi also credits God for the day
🗣️ Both messengers frame it this way
✅ Cushi still tells the full truth
📖 Faith and honesty were not opposites here

## 💀 Be As That Young Man Is

Cushi never actually says the word dead out loud.

He wishes all David's enemies would end up exactly like Absalom.

That wish only makes sense if Absalom has already died.

The truth arrives sideways, but David understands it instantly.

💀 Cushi never says the word dead
🙏 He wishes enemies shared Absalom's fate
🧠 The meaning is instantly clear anyway
➡️ Truth arrived sideways but landed hard

## 😢 The King Was Much Moved

"Moved" here means deeply shaken, not simply upset for a moment.

Every victory detail suddenly stops mattering to David at all.

Only the loss of his son remains in front of him.

Grief overtook every ounce of David's political and military relief.

😢 Moved means deeply shaken, not upset
🏆 The victory stops mattering instantly
💔 Only the loss of his son remains
📖 Grief overtook every bit of relief

## 🚪 Went Up To The Chamber Over The Gate, And Wept

David leaves the public gate for a private room above it.

He wants to grieve away from the soldiers who just won this war for him.

A king's grief still needed a place to be entirely human.

Even kings need somewhere private to fall apart.

🚪 David retreats to a private room
😢 He grieves away from his soldiers
👑 A king still needed to be human
📖 Even kings need somewhere to fall apart

## 😭 O My Son Absalom, My Son, My Son Absalom

David repeats his son's name over and over in raw grief.

This repetition is not polished language, it is pure heartbreak spilling out.

The entire military victory means nothing next to this personal loss.

The chapter ends not in triumph, but in a father's grief.

😭 David repeats the name in grief
💔 Raw heartbreak, not polished words
🏆 Victory means nothing beside this loss
➡️ The chapter ends in a father's grief

## 🙏 Would God I Had Died For Thee

David says he would have traded his own life for Absalom's.

This comes from a son who had just tried to kill him.

David's love reached past every betrayal Absalom had ever committed.

A father's love for his child outlasted every act of rebellion.

🙏 David offers his own life instead
⚔️ Absalom had tried to kill him
❤️ Love outlasted every act of rebellion
📖 A father's love had no real limit
`.trim();

export const SECOND_SAMUEL_EIGHTEEN_PERSONAL_SECTIONS = parseSecondSamuelEighteenRawNotes(SECOND_SAMUEL_EIGHTEEN_RAW_NOTES);
