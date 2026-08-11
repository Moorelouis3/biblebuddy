export type SecondSamuelNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelNineteenRawNotes(rawText: string): SecondSamuelNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 19:${startVerse}` : `2 Samuel 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Samuel 19 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_NINETEEN_RAW_NOTES = `# SecondSamuel 19:1-4
# 😭 The King Mourns While Israel Rejoices
---
## 😭 Behold, The King Weepeth And Mourneth For Absalom

"Mourneth" means grieving with the whole body, not quiet tears alone.

David's men bring word to Joab, his own army commander.

Absalom had just tried to kill his father and steal his throne.

David grieves for him anyway, as a father grieves for a son.

That grief will collide hard with what the army expects next.

😭 Mourneth means whole body grief

👑 Absalom led a rebellion against David

❤️ David still grieves as a father

📖 Grief and loyalty are about to collide

## ⚔️ The Victory That Day Was Turned Into Mourning

Joab's army had just won the whole civil war in one battle.

Twenty thousand men reportedly died in that forest the day before.

That kind of win should have meant parades and celebration.

Instead the whole camp learns their king is grieving, not celebrating.

A victory this large should never feel like a defeat.

⚔️ Joab's army won a huge battle

💀 Twenty thousand men died in chapter eighteen

🎉 Victory should have meant celebration

📖 Instead the camp meets only grief

## 👂 The People Heard Say That Day How The King Was Grieved

Word of David's grief spreads through the whole camp fast.

Soldiers returning from a real victory expect to be praised.

Instead they hear that their king is devastated over the enemy leader.

Absalom had commanded the very army they had just defeated.

The soldiers cannot celebrate a win their own king mourns.

👂 News of David's grief spreads fast

🎖️ Soldiers expect praise after victory

😕 Instead they hear only sorrow

📖 A king's grief silenced his army's joy

## 🙈 Gat Them By Stealth That Day Into The City

"Gat" is an old form of the word "got."

"Stealth" means moving quietly, trying not to be noticed.

David's own winning soldiers sneak into the city instead of marching in proudly.

Nobody wants to draw attention on a day this heavy with grief.

🙈 Gat is an old form of got

🤫 Stealth means moving without being noticed

🏙️ The winning soldiers sneak in quietly

📖 Grief made a proud entrance impossible

## 🏃 As People Being Ashamed Steal Away When They Flee In Battle

This is a simile, comparing one thing to another using the word "as."

Normally, only a defeated, humiliated army sneaks away like this.

David's men actually won, but they still act exactly like the losers would.

The king's visible grief made victory feel like a shameful defeat.

🏃 A simile compares two very different things

💀 Normally only defeated armies sneak away

🏆 These soldiers actually won the battle

📖 Grief turned a win into a shameful defeat

## 🫣 The King Covered His Face

Covering the face was a visible sign of deep private grief.

David hides his eyes even while sitting among his own people.

He cannot look at the men who fought and won for him.

His whole body language announces a father's loss, not a king's win.

🫣 Covering the face signals deep grief

👀 David cannot face his own soldiers

👑 A king's body language speaks loudly

📖 His posture announces loss, not victory

## 💔 O My Son Absalom, O Absalom, My Son, My Son

Repeating a name like this is a Hebrew way of showing raw pain.

David says "my son" three separate times in one short cry.

Absalom had murdered his brother and led a war against his own father.

David still cries out for him with nothing but a father's love.

💔 Repeating a name shows raw pain

🔁 My son is said three times

⚔️ Absalom rebelled against his own father

📖 David's love outlasts every betrayal

# SecondSamuel 19:5-8
# 🗣️ Joab Rebukes The King
---
## 😳 Thou Hast Shamed This Day The Faces Of All Thy Servants

"Shamed the faces" is an old way of saying publicly humiliated.

Joab speaks to the king with almost no royal courtesy left.

David's loyal soldiers risked their lives for him this very day.

Instead of thanks, they come home to find their king weeping for the enemy.

Joab says that grief in public counts as an insult to them.

😳 Shamed the faces means humiliated publicly

🗣️ Joab speaks without royal courtesy

🛡️ These soldiers risked their lives today

📖 Public grief felt like an insult

## 🏠 The Lives Of Thy Wives, And The Lives Of Thy Concubines

"Concubine" was a secondary wife with fewer legal rights than a full wife.

Both groups were part of the king's household, protected under his authority.

All of them were in real danger the day Absalom nearly took the throne.

Joab wants David to remember exactly who was truly at risk.

🏠 Concubine means a secondary wife

👰 Both wives and concubines needed protection

⚠️ All of them faced real danger

📖 Joab wants David to remember the stakes

## 💔 Thou Lovest Thine Enemies, And Hatest Thy Friends

Joab accuses David of caring more about Absalom than his own men.

That is a harsh charge to bring against a grieving father.

In Joab's eyes, mourning Absalom insults every soldier who fought for David.

The accusation is unfair, but it comes from real battlefield exhaustion.

💔 Joab accuses David of backwards loyalty

😠 A harsh charge against a father

⚔️ Joab sees it from a soldier's view

📖 Exhaustion sharpens Joab's blunt words

## 😔 If Absalom Had Lived, And All We Had Died This Day, Then It Had Pleased Thee Well

Joab claims David secretly would have preferred a different outcome.

He suggests the king would rather have lost every loyal soldier.

As long as Absalom lived, David would have called it a good day.

That is a painful exaggeration, but it is meant to shock David awake.

😔 Joab claims David wanted the opposite result

⚖️ He exaggerates to make his point

😲 The words are meant to shock

📖 Sometimes truth needs a hard jolt

## 🗣️ Speak Comfortably Unto Thy Servants

"Speak comfortably" is an old idiom meaning to encourage and reassure someone.

Joab is not asking David to fake happiness.

He wants the king to publicly thank the men who protected him.

A few honest words could repair the damage David's grief just caused.

🗣️ Speak comfortably means to reassure someone

🙏 Not fake joy, just honest thanks

🛡️ The soldiers need to hear it

📖 Words can repair damaged loyalty

## ⚠️ There Will Not Tarry One With Thee This Night

"Tarry" means to stay or remain in one place.

Joab warns that every soldier could desert David by nightfall.

An army with no loyalty left cannot protect a king.

This is not politeness anymore, it is a direct warning of collapse.

⚠️ Tarry means to stay or remain

🚪 Joab warns of a mass desertion

🛡️ No army means no protection

📖 A warning, not a suggestion

## 🚪 Then The King Arose, And Sat In The Gate

The city gate served as the public courtroom of the ancient world.

Elders and officials held meetings and settled disputes there.

By sitting in the gate, David shows himself as king again, in public.

This one action tells the whole city that he heard Joab's warning.

🚪 The gate was the public courtroom

👑 David shows himself as king again

👀 A visible act calms the city

📖 David listens and responds quickly

## 🏕️ Israel Had Fled Every Man To His Tent

This line describes soldiers scattering home instead of celebrating together.

"Every man to his tent" is a phrase for total disorganized retreat.

The same phrase appears again soon, in the rebellion that follows this chapter.

Israel's loyalty to David is already cracking, even after this win.

🏕️ Soldiers scattered home instead of celebrating

🏃 Every man to his tent means retreat

🔁 The same phrase returns again soon

📖 Israel's loyalty is already cracking

# SecondSamuel 19:9-15
# 🤝 Judah Brings The King Home
---
## 🗣️ All The People Were At Strife Throughout All The Tribes Of Israel

"Strife" means open arguing and division, not quiet disagreement.

The nation is not united even after the rebellion collapses.

Different tribes now argue about what to do next.

This tension quietly sets up the next rebellion in chapter twenty.

🗣️ Strife means open arguing and division

🇮🇱 The tribes are not united yet

⚠️ Real tension follows right after the war

📖 This sets up chapter twenty's rebellion

## 🛡️ The King Saved Us Out Of The Hand Of Our Enemies, And He Delivered Us Out Of The Hand Of The Philistines

The people recall everything David already did for the nation.

He rescued Israel from the Philistines many years earlier.

Now, after Absalom's revolt, David sits in exile instead of his throne.

The people start to remember exactly what they nearly lost.

🛡️ David saved Israel many times before

⚔️ He defeated the Philistines years earlier

👑 Now their rescuer sits in exile

📖 The people remember what they nearly lost

## ⚰️ Absalom, Whom We Anointed Over Us, Is Dead In Battle

"Anointed" means the tribes had already crowned Absalom as their king.

Their rebellion had already gone all the way to naming a new ruler.

That new ruler is now dead, and the throne stands empty again.

The people who crowned Absalom now have nobody left to follow.

⚰️ Anointed means already crowned as king

👑 The rebellion had a real new ruler

💀 That ruler is now dead

📖 The throne now stands empty again

## ❓ Why Speak Ye Not A Word Of Bringing The King Back

The people ask themselves this question out loud.

Nobody has taken the first step to invite David home.

Public opinion has already shifted back toward the king.

Someone still needs to actually act on that shift.

❓ The people question their own silence

🔄 Public opinion has already shifted back

🚶 Nobody has taken the first step

📖 Feelings alone do not restore a king

## ✉️ David Sent To Zadok And To Abiathar The Priests

Zadok and Abiathar were the two chief priests loyal to David.

David uses them as messengers instead of going in person.

Priests carried real influence and trust among the tribes.

Sending trusted priests helps David look wanted, not pushy.

✉️ Zadok and Abiathar were chief priests

🙏 Priests carried real trust and influence

👑 David lets others invite him back

📖 Being wanted matters more than forcing it

## 👪 Ye Are My Brethren, Ye Are My Bones And My Flesh

"Bones and flesh" is an old way of saying close blood family.

David reminds the men of Judah that he belongs to their own tribe.

Judah had been slower than the other tribes to invite him back.

David appeals to family loyalty to speed that decision along.

👪 Bones and flesh means close blood family

🦁 David is from the tribe of Judah

🐢 Judah had been slow to respond

📖 Family loyalty gets used to persuade

## ⚔️ Captain Of The Host Before Me Continually In The Room Of Joab

Amasa had actually led Absalom's rebel army against David.

David now offers him Joab's old job, commander of the whole army.

"In the room of" means taking someone's exact place.

This is a political move, replacing the man who killed Absalom against orders.

⚔️ Amasa had led the rebel army

🎖️ David offers him Joab's command

🔄 In the room of means taking his place

📖 A political move against Joab's disobedience

## ❤️ He Bowed The Heart Of All The Men Of Judah

"Bowed the heart" describes winning people over completely.

David's message reaches every man in Judah as one united answer.

"Even as the heart of one man" means total, unanimous agreement.

Judah now speaks with a single voice, inviting David home.

❤️ Bowed the heart means winning people over

🗣️ Judah answers with one united voice

🤝 Every man in Judah agrees together

📖 Unity replaces the earlier division

## 🌊 The King Returned, And Came To Jordan

The Jordan River marks the boundary David must cross to go home.

Judah travels to Gilgal to meet him at that crossing.

Gilgal held meaning as the very first camp Israel made after entering the promised land.

Crossing the Jordan again symbolizes David's return to his rightful place.

🌊 The Jordan marks the way home

🏕️ Judah meets him at Gilgal

📍 Gilgal was Israel's first camp long ago

📖 Crossing back means returning to his place

# SecondSamuel 19:16-23
# 😌 Shimei Begs For Mercy
---
## 😡 Shimei The Son Of Gera, A Benjamite, Which Was Of Bahurim

A "Benjamite" belonged to the tribe of Benjamin, Saul's own tribe.

Bahurim was the small village where Shimei once cursed David and threw stones.

That earlier moment happened back in second Samuel chapter sixteen.

The text repeats his full identity here so the reader remembers exactly who this is.

😡 Benjamite means from the tribe of Benjamin

🏘️ Bahurim is where Shimei once cursed David

🪨 He had thrown stones at David there

📖 The text reminds the reader who this is

## 🏃 Hasted And Came Down With The Men Of Judah To Meet King David

"Hasted" means he hurried, moving with real urgency.

Shimei does not wait to be summoned, he rushes toward David himself.

Traveling with the men of Judah gave him some safety in numbers.

Speed here likely comes from fear more than genuine excitement.

🏃 Hasted means he hurried quickly

🚶 Shimei rushes toward David himself

👥 Traveling with Judah offered some safety

📖 Fear likely drove his urgency

## 👥 A Thousand Men Of Benjamin With Him, And Ziba The Servant Of The House Of Saul

Benjamin was Saul's own tribe, and Shimei belongs to it.

Bringing a thousand men shows Shimei wants to look loyal, not alone.

Ziba had served Saul's family and now manages Mephibosheth's household and land.

Both men rush to David here for very different, self interested reasons.

👥 Benjamin was Saul's own tribe

🛡️ A thousand men signals visible loyalty

🏞️ Ziba managed Saul's family estate

📖 Self interest drives both men here

## ⛴️ A Ferry Boat To Carry Over The King's Household

The Jordan River could not simply be walked across at this crossing point.

A ferry boat carried the royal family and belongings safely over.

This detail shows the scale of David's household on this journey.

Everything is being done to bring the king home properly.

⛴️ A ferry boat crossed the river

👑 It carried the whole royal household

📦 The journey involved real scale and care

📖 Every detail honors the king's return

## 🙇 Shimei The Son Of Gera Fell Down Before The King

Falling down was a physical act of total submission.

Shimei does this the moment David finishes crossing the Jordan.

Timing matters here, since David is at his most vulnerable, still traveling.

Shimei chooses this exact moment to make his case for mercy.

🙇 Falling down showed total submission

⏱️ Shimei times this right after the crossing

🚶 David is still mid journey, vulnerable

📖 Timing shapes how a plea lands

## 🙏 Let Not My Lord Impute Iniquity Unto Me

"Impute" means to officially charge someone with guilt.

"Iniquity" is an old word for serious wrongdoing or sin.

Shimei is asking David not to hold his earlier curses against him.

He chooses careful, formal language for a very real crime, cursing a king.

🙏 Impute means to officially charge

⚖️ Iniquity means serious wrongdoing

🗣️ Shimei asks David to forgive the curses

📖 Careful words plead for a real crime

## 😔 For Thy Servant Doth Know That I Have Sinned

Shimei openly admits guilt instead of making excuses.

This is a rare moment of someone confessing wrongdoing directly to David.

Confession here is also a strategy, offered right before asking for mercy.

Honesty and self preservation are working together in this one line.

😔 Shimei openly admits his own guilt

🗣️ A rare direct confession to David

🛡️ Confession comes right before asking mercy

📖 Honesty and self preservation work together

## 🥇 I Am Come The First This Day Of All The House Of Joseph

"House of Joseph" refers to the northern tribes descended from Joseph's two sons.

Benjamin was counted among those northern tribes, alongside Ephraim and Manasseh.

Shimei claims to be the very first from those tribes to greet David.

Being first was meant to prove loyalty more loudly than words alone could.

🥇 House of Joseph means the northern tribes

👪 Benjamin was counted among those tribes

🏃 Shimei claims to arrive first

📖 Being first proved loyalty louder than words

## ⚔️ Shall Not Shimei Be Put To Death For This, Because He Cursed The LORD's Anointed

Abishai is Joab's brother, and just as quick to demand blood.

"The LORD's anointed" is a title reserved for God's chosen king.

Cursing that title was treated as a serious crime against God, not just David.

Abishai wants Shimei executed immediately for that exact offense.

⚔️ Abishai demands immediate execution

👑 LORD's anointed means God's chosen king

🚫 Cursing that title was a serious crime

📖 Abishai sees mercy as weakness here

## 👑 What Have I To Do With You, Ye Sons Of Zeruiah

This exact phrase appeared earlier, when David restrained Abishai before.

Zeruiah was David's sister, making Abishai and Joab his own nephews.

David again refuses to let their harsh instincts control this day.

Today is meant for reunion, not for settling old scores in blood.

👑 David repeats a phrase used before

👪 Zeruiah's sons are David's own nephews

🛑 David restrains their harsh instincts again

📖 Reunion matters more than revenge today

## 🤝 Thou Shalt Not Die

David formally pardons Shimei with an actual spoken oath.

An oath from a king carried the full weight of law.

This mercy fits a pattern from David throughout this whole chapter.

David is choosing to unite the kingdom instead of punishing every enemy.

🤝 David formally pardons Shimei

⚖️ A king's oath carried real legal weight

🔁 This mercy fits a pattern today

📖 Unity matters more than punishment right now

# SecondSamuel 19:24-30
# 🦶 Mephibosheth Meets The King
---
## 🦶 Neither Dressed His Feet, Nor Trimmed His Beard, Nor Washed His Clothes

Mephibosheth is Saul's grandson and Jonathan's crippled son, cared for earlier by David.

This list describes weeks of deliberate, visible mourning.

Not grooming his feet, beard, or clothes showed genuine, continuous grief.

He kept this appearance the whole time David was away, not for one single day.

🦶 Mephibosheth is Saul's crippled grandson

😢 The list shows deliberate, visible mourning

📆 He kept this up the whole time

📖 His grief was continuous, not a show

## ❓ Wherefore Wentest Not Thou With Me, Mephibosheth

David asks a pointed, suspicious question the moment they meet.

Mephibosheth had stayed behind in Jerusalem during David's whole exile.

Ziba had already told David that Mephibosheth hoped to reclaim Saul's throne.

David wants a direct answer before deciding what to believe.

❓ David asks a pointed question

🏙️ Mephibosheth stayed behind in Jerusalem

🗣️ Ziba had already accused him

📖 David wants the truth before deciding

## 😡 My Lord, O King, My Servant Deceived Me

Mephibosheth finally gives his side, unheard until this very moment.

He directly blames his own servant Ziba for the deception.

This claim contradicts everything Ziba told David back in chapter sixteen.

David now has to weigh two very different, conflicting stories.

😡 Mephibosheth blames his servant Ziba

🗣️ This is his first chance to speak

⚖️ His story contradicts Ziba's earlier claim

📖 David must weigh two conflicting stories

## 🐴 I Will Saddle Me An Ass, That I May Ride Thereon, And Go To The King

Mephibosheth says he asked Ziba to saddle a donkey so he could travel too.

"Thereon" is an old word simply meaning on it.

He wanted to ride to David alongside everyone else fleeing the city.

Ziba never followed through, leaving Mephibosheth stranded at home.

🐴 Mephibosheth asked for a donkey

📍 Thereon is an old word for on it

🚶 He wanted to travel with everyone

📖 Ziba never followed through on the request

## 🦵 Thy Servant Is Lame

Mephibosheth was crippled in both feet as a young child.

That injury happened while fleeing after Saul and Jonathan died in battle.

Without help, he could not travel on his own at all.

His disability made him completely dependent on Ziba's cooperation.

🦵 Mephibosheth was lame in both feet

👶 The injury happened when he was young

🚶 He could not travel without help

📖 His disability made him depend on Ziba

## 😠 He Hath Slandered Thy Servant Unto My Lord The King

"Slandered" means Ziba spread a false, damaging story about him.

Mephibosheth directly accuses Ziba of lying to gain his land.

This confirms the two stories cannot both be true.

David has no easy way left to know which man is honest.

😠 Slandered means spreading a false story

🗣️ Mephibosheth accuses Ziba directly of lying

⚖️ Both stories cannot possibly be true

📖 David has no easy way to be certain

## 😇 My Lord The King Is As An Angel Of God

This exact phrase was used earlier by a wise woman speaking to David.

Comparing a king to an angel meant praising his wisdom and fairness.

Mephibosheth is not flattering David for no reason.

He is placing his whole case in the king's hands to judge with fairness.

😇 Angel of God means wise and fair

🗣️ The same phrase was used earlier

⚖️ Mephibosheth trusts David's fair judgment

📖 He places his case in David's hands

## 💀 For All Of My Father's House Were But Dead Men Before My Lord The King

Mephibosheth means Saul's entire family had every reason to be executed.

David could have wiped out any rival claim to the throne long ago.

Instead, David spared them and showed mercy to this whole family.

That earlier mercy is the whole reason Mephibosheth still has anything at all.

💀 Saul's family had reason to fear death

👑 David could have ended their claim

🕊️ Instead David showed the family mercy

📖 That mercy explains everything Mephibosheth still has

## 🍽️ Thou Set Thy Servant Among Them That Did Eat At Thine Own Table

This recalls David's promise made earlier in second Samuel chapter nine.

David had welcomed Mephibosheth to eat at the royal table for years.

That honor already answered any claim Mephibosheth could make about loyalty.

Mephibosheth reminds David of a kindness David chose freely, long before this crisis.

🍽️ This recalls David's promise in chapter nine

👑 Mephibosheth already ate at the royal table

🤝 That honor already proved his loyalty

📖 David chose this kindness long ago

## ❓ What Right Therefore Have I Yet To Cry Any More Unto The King

Mephibosheth says he has already received more mercy than he deserves.

Asking for anything more, even fair treatment, feels like pushing his luck.

He is choosing humility over defending his own reputation loudly.

That restraint says something true, whether or not his story is fully accurate.

❓ Mephibosheth feels he cannot ask for more

🙇 He chooses humility over loud defense

🤐 He does not press his own case

📖 Restraint speaks even without full proof

## ❓ Why Speakest Thou Any More Of Thy Matters

David sounds tired of hearing arguments about land and blame.

He wants to end the dispute quickly rather than investigate it fully.

This mirrors his mood throughout the whole chapter, favoring peace over strict justice.

David has bigger problems ahead than one disputed field.

❓ David sounds tired of the argument

🏁 He wants to end it quickly

🕊️ Peace matters more than strict justice here

📖 Bigger problems wait beyond this dispute

## ⚖️ Thou And Ziba Divide The Land

David does not fully investigate whose story is true.

Instead he splits the disputed land evenly between the two men.

This decision satisfies neither man completely, which was likely the point.

A quick, fair sounding compromise ends the dispute without more delay.

⚖️ David splits the land between them

🔍 He does not fully investigate the truth

🤝 The compromise satisfies neither man fully

📖 A quick decision ends the dispute

## 🏠 Let Him Take All, Forasmuch As My Lord The King Is Come Again In Peace

Mephibosheth gives up his claim to the land entirely.

"Forasmuch" is an old word meaning simply because or since.

He says David's safe return matters more to him than any property.

His response reveals real loyalty, whatever the truth about Ziba turns out to be.

🏠 Mephibosheth gives up his claim entirely

📍 Forasmuch means simply because

❤️ David's safety mattered more than property

➡️ His response reveals real loyalty

# SecondSamuel 19:31-35
# 👴 Barzillai Declines The King's Offer
---
## 👴 Barzillai The Gileadite Came Down From Rogelim

Barzillai lived in Rogelim, a town in the region of Gilead.

Gilead is the same region where David hid during Absalom's entire rebellion.

Barzillai now travels all the way to the Jordan just to see David off.

His presence here signals real, personal loyalty, not political calculation.

👴 Barzillai came from Rogelim in Gilead

🏕️ Gilead sheltered David during the rebellion

🚶 He travels far to see David off

📖 His presence shows real personal loyalty

## 👴 A Very Aged Man, Even Fourscore Years Old

"Fourscore" is an old way of saying eighty years old.

The text makes sure the reader knows exactly how old Barzillai is.

His age matters later, when he explains why he cannot move to Jerusalem.

Every detail here sets up the choice Barzillai will make soon.

👴 Fourscore means eighty years old

📆 The text states his exact age

🔮 His age explains a choice made later

📖 Every detail here has a purpose

## 🍞 Provided The King Of Sustenance While He Lay At Mahanaim

"Sustenance" means the food and supplies a person needs to survive.

Mahanaim was the city where David's camp stayed during the whole rebellion.

Barzillai used his own wealth to keep David and his men fed there.

That earlier generosity is the whole reason David wants to reward him now.

🍞 Sustenance means needed food and supplies

🏙️ Mahanaim sheltered David during the rebellion

💰 Barzillai fed them from his own wealth

📖 That generosity earns David's gratitude now

## 🍽️ Come Thou Over With Me, And I Will Feed Thee With Me In Jerusalem

David offers to repay Barzillai's kindness with a place at his own table.

This mirrors the same generosity David already showed Mephibosheth earlier.

Eating at the king's table in this culture meant lasting honor, not just a meal.

David wants to reward loyalty publicly, not quietly forget it.

🍽️ David offers Barzillai a place at his table

🔁 This mirrors his kindness to Mephibosheth

👑 Eating with the king meant lasting honor

📖 David rewards loyalty in public, not quietly

## ⏳ How Long Have I To Live, That I Should Go Up With The King Unto Jerusalem

Barzillai gently turns down David's generous offer.

At eighty years old, he has little time left to enjoy palace life.

His question is not bitter, just realistic about his own age.

He would rather David know the truth than accept an offer out of politeness.

⏳ Barzillai gently declines the offer

👴 His age leaves little time to enjoy it

🗣️ His question is realistic, not bitter

📖 Honesty matters more than false politeness

## 👀 Can I Discern Between Good And Evil

Barzillai questions whether his judgment is still sharp at his age.

He is not claiming to be foolish, just honest about growing older.

A palace advisor needs clear judgment, and he says his may be fading.

This is Barzillai explaining why the honor no longer fits his season of life.

👀 Barzillai questions his own sharp judgment

👴 He is honest about growing older

🧠 A palace role needs clear judgment

📖 The honor no longer fits his season

## 👅 Can Thy Servant Taste What I Eat Or What I Drink

Barzillai says his sense of taste has faded with age.

Food and drink at a royal feast would mean little to him now.

He lists his senses one by one to make his point completely clear.

Age has quietly taken away things he once enjoyed without thinking about it.

👅 Barzillai says his taste has faded

🍷 Royal food would mean little to him

📋 He lists his senses one by one

📖 Age quietly took away simple pleasures

## 🎶 Can I Hear Any More The Voice Of Singing Men And Singing Women

Royal courts employed singers for entertainment and celebration.

Barzillai says his hearing has faded too much to enjoy any of it.

He lists taste, hearing, and even his sense of pleasure as all fading with age.

None of the comforts of Jerusalem would mean anything to him now.

🎶 Royal courts kept singers for entertainment

👂 Barzillai's hearing has faded with age

😔 His senses are fading, not just his hearing

📖 Palace comforts would not reach him now

## 🎁 Wherefore Then Should Thy Servant Be Yet A Burden Unto My Lord The King

"Burden" here means an unnecessary weight or cost to someone else.

Barzillai worries that going to Jerusalem would only create expense and trouble for David.

He would rather stay useful in a small way than become dead weight in a palace.

His humility here matches his generosity back at Mahanaim.

🎁 Burden means unnecessary weight or cost

💰 He worries about becoming an expense

🙇 He would rather stay useful and humble

📖 His humility matches his earlier generosity

# SecondSamuel 19:36-39
# 🤝 Chimham Goes In His Place
---
## 🚶 Thy Servant Will Go A Little Way Over Jordan With The King

Barzillai offers a compromise instead of a flat refusal.

He will still escort David partway, honoring the friendship without moving permanently.

This small gesture shows respect without accepting the larger offer.

Barzillai finds a middle path between duty and his own honest limits.

🚶 Barzillai offers a middle path

🤝 He escorts David only partway

🙏 The gesture honors their friendship

📖 Respect does not require full acceptance

## 🎁 Why Should The King Recompense It Me With Such A Reward

"Recompense" means to pay someone back or reward them.

Barzillai insists he never helped David expecting anything in return.

Turning down a reward was a real display of humility in this culture.

His loyalty was never for sale in the first place.

🎁 Recompense means to pay someone back

🙅 Barzillai never expected any reward

🙇 Refusing honor showed real humility

📖 His loyalty was never for sale

## ⚰️ That I May Die In Mine Own City, And Be Buried By The Grave Of My Father And Of My Mother

Barzillai's deepest wish is simple, to die at home, not in a palace.

Being buried near his own parents mattered deeply in this culture.

A family burial site was treated as sacred ground worth protecting.

Barzillai chooses roots over royal comfort at the very end of his life.

⚰️ Barzillai wants to die at home

🪦 Family burial sites were treated as sacred

🌳 He values roots over royal comfort

📖 Home mattered more than the palace

## 🤝 Behold Thy Servant Chimham

Chimham is likely Barzillai's own son, offered in his place.

Barzillai cannot accept the honor himself, so he sends someone younger instead.

David later remembers this kindness, mentioning Chimham again near his own final days.

Loyalty in this story gets passed down, not just repaid once and forgotten.

🤝 Chimham is likely Barzillai's own son

👴 Barzillai sends a younger man instead

📜 David recalls this near his own end

📖 Loyalty gets passed down, not forgotten

## 🤝 Whatsoever Thou Shalt Require Of Me, That Will I Do For Thee

David makes an open, unconditional promise back to Barzillai.

This goes further than just caring for Chimham as agreed.

David is offering Barzillai anything he might ever need in the future.

Real friendship between these two men shows in this kind of open offer.

🤝 David makes an open promise

🎁 He offers more than just Chimham's care

🙏 Barzillai could ask for anything later

📖 Real friendship shows in open offers

## 💋 The King Kissed Barzillai, And Blessed Him

A kiss between men was a normal, respectful farewell in this culture.

David personally blesses Barzillai instead of simply letting him leave.

This is a warm, honest goodbye between two old allies.

Barzillai returns home content, without ever needing the reward he was offered.

💋 A kiss was a respectful farewell here

🙏 David personally blesses Barzillai

🤝 A warm goodbye between two allies

📖 Contentment needed no reward at all

# SecondSamuel 19:40-43
# ⚔️ Israel And Judah Quarrel Over The King
---
## 🚶 Chimham Went On With Him, And All The People Of Judah Conducted The King

David keeps his promise to Barzillai right away, bringing Chimham along.

Judah escorts David the whole way, showing off their closeness to him.

Only half of Israel bothers to join this procession.

That uneven turnout quietly signals trouble still brewing beneath the surface.

🚶 David keeps his promise about Chimham

🦁 Judah escorts David the whole way

🇮🇱 Only half of Israel shows up

📖 Uneven turnout signals hidden trouble

## ⚔️ Why Have Our Brethren The Men Of Judah Stolen Thee Away

Israel accuses Judah of secretly claiming David for themselves.

"Stolen thee away" is a sharp, dramatic accusation of favoritism.

Israel feels left out of officially escorting their own king home.

This complaint reopens the exact tribal rivalry that split the kingdom before.

⚔️ Israel accuses Judah of favoritism

🎭 Stolen thee away is a dramatic charge

😠 Israel feels left out of the honor

📖 Old tribal rivalry resurfaces immediately

## 👪 Because The King Is Near Of Kin To Us

Judah defends its role by pointing out David's own tribal background.

David belongs to the tribe of Judah by birth.

Judah argues that blood ties simply gave them the natural first place.

Their answer sounds reasonable, but it still stings the rest of Israel.

👪 Judah points to David's own tribe

🦁 David was born into the tribe of Judah

🥇 Blood ties gave them a natural role

📖 A reasonable answer still stings Israel

## 🎁 Have We Eaten At All Of The King's Cost, Or Hath He Given Us Any Gift

Judah insists they gained nothing extra from escorting David home.

They are defending against a charge of using the king for personal profit.

No royal favors were exchanged in return for their loyalty.

The question is meant to prove their motives were clean.

🎁 Judah denies gaining any personal profit

⚖️ They defend against a charge of favoritism

🚫 No royal favors were exchanged

📖 The question defends their clean motives

## 🔟 We Have Ten Parts In The King

Israel points out that ten of the twelve tribes belong to them, not Judah.

By that count, Israel claims a much larger stake in David's kingship.

"More right in David than ye" pushes the argument even further.

Numbers become a weapon in an argument that is really about pride.

🔟 Ten of twelve tribes belong to Israel

📊 Israel claims the larger overall stake

⚖️ More right in David pushes it further

📖 Numbers become a weapon for pride

## 🔥 The Words Of The Men Of Judah Were Fiercer Than The Words Of The Men Of Israel

This tense argument closes the chapter without any real resolution.

Judah's words are described as sharper and angrier than Israel's own.

This exact unresolved anger is what a man named Sheba will exploit next.

Chapter twenty opens with a full rebellion growing directly out of this quarrel.

🔥 The chapter ends without resolution

🗣️ Judah's words are sharper than Israel's

👤 Sheba will exploit this anger next

📖 Chapter twenty grows out of this quarrel
`.trim();

export const SECOND_SAMUEL_NINETEEN_PERSONAL_SECTIONS = parseSecondSamuelNineteenRawNotes(SECOND_SAMUEL_NINETEEN_RAW_NOTES);
