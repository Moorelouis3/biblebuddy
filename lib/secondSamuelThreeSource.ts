export type SecondSamuelThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelThreeRawNotes(rawText: string): SecondSamuelThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 3:${startVerse}` : `2 Samuel 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Samuel 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_THREE_RAW_NOTES = `
# SecondSamuel 3:1-5
# ⚔️ War Above, A Growing House Below
---
## 📜 There Was Long War

"Long war" means fighting dragged on for years, not one single battle.

Judah stood behind David in Hebron.

The rest of Israel still followed Saul's family.

Neither side won a fast victory over the other.

⚔️ Long war means years of fighting
👑 Judah backed David, Israel backed Saul's house
⏳ Neither side won quickly
📖 Time slowly decided the outcome

## 📈 David Waxed Stronger And Stronger

"Waxed" is an old word for grew or became.

David's strength grew every year of Ishbosheth's fading reign.

Saul's own house lost power at the same pace David gained it.

The writer sets the two houses on opposite paths from the very first verse.

📈 Waxed is an old word for grew
💪 David's strength grew year by year
📉 Saul's house grew weaker at the same pace
📖 The chapter opens by naming the winner

## 👑 His Firstborn Was Amnon

Amnon was David's oldest son, first in line for the throne.

His mother Ahinoam came from Jezreel, a town inside Israel's own territory.

David already had Ahinoam as a wife before he ever reached Hebron, back in 1 Samuel 25.

Amnon's story will turn dark, ending in disgrace inside his own family.

👑 Amnon was David's firstborn son
🏞️ Ahinoam came from the town of Jezreel
🔁 She was already David's wife before Hebron
📖 Amnon's story ends in disgrace later

## 👶 Chileab, Of Abigail The Wife Of Nabal

Chileab was David's second son, born to his wife Abigail.

Abigail had been married to a wealthy fool named Nabal before David.

First Chronicles later calls this same son Daniel instead of Chileab.

Chileab disappears from the story after this list and is never mentioned again.

👶 Chileab was David's second son
🍇 Abigail was formerly married to Nabal
🔁 Chronicles calls him Daniel instead
📖 He vanishes from the story after this verse

## 👸 Absalom The Son Of Maacah The Daughter Of Talmai King Of Geshur

Absalom was David's third son, and this verse names his mother.

Maacah was a foreign princess, daughter of the king of a small kingdom called Geshur.

Geshur sat northeast of the Sea of Galilee, outside Israel's own borders.

Absalom later flees to his grandfather's kingdom after killing his brother Amnon.

This one small detail becomes an escape route years later.

👑 Absalom was David's third son
👸 Maacah was a foreign princess from Geshur
🗺️ Geshur sat northeast of the Sea of Galilee
📖 Absalom later flees there after killing Amnon

## 👑 Adonijah The Son Of Haggith

Adonijah was David's fourth son.

His mother Haggith is named here for the first time in the story.

Years later, Adonijah tries to crown himself king before David has died.

That attempt opens the very first chapter of 1 Kings.

👑 Adonijah was David's fourth son
👤 Haggith is named here for the first time
⚠️ He later tries to crown himself king
📖 That story opens the book of 1 Kings

## 🔢 These Were Born To David In Hebron

Shephatiah and Ithream round out the list, sons five and six.

Their mothers Abital and Eglah appear only here in the entire Bible.

Six sons from six different wives, all born during David's years in Hebron.

Kings in the ancient world often married widely to build alliances and show strength.

Several of these six sons will cause David real grief later in his reign.

🔢 Six sons born from six different wives
👤 Abital and Eglah appear only in this verse
👑 Many kings married widely to build power
📖 More than one brings grief later

# SecondSamuel 3:6-11
# 🐕 Abner Turns On Ishbosheth
---
## 💪 Abner Made Himself Strong For The House Of Saul

The war between the two houses was still going on.

Abner quietly gathered more power for himself during that time.

He already commanded Saul's whole army.

Now he also controls the family's future.

💪 Abner grew stronger during the war
⚔️ He already commanded Saul's whole army
👑 Now he controls the family's future too
📖 Ishbosheth wears the crown, not the power

## 👸 Saul Had A Concubine, Whose Name Was Rizpah

A concubine held a real place in a king's household, though a lower rank than a wife.

Rizpah belonged to Saul, and after his death she still lived under his family's care.

Taking a former king's concubine was never a small or private matter in this world.

It was widely understood as a public claim to that king's throne and authority.

👸 A concubine ranked below a wife
🏠 Rizpah still lived under Saul's household
👑 Taking her would be a claim to power
📖 This detail sets up the next accusation

## 😠 Wherefore Hast Thou Gone In Unto My Father's Concubine

Ishbosheth accuses Abner of sleeping with Rizpah, his father's concubine.

Given what that act meant, the real accusation is that Abner wants Saul's throne for himself.

Ishbosheth is a weak king trying to challenge the one man holding his kingdom together.

That is a dangerous move for someone with so little real power of his own.

😠 Ishbosheth accuses Abner directly
👑 The real charge is reaching for the throne
😬 A weak king challenges his strongest general
📖 This accusation will cost him everything

## 😡 Then Was Abner Very Wroth

"Wroth" is an old word for angry.

Abner does not deny the accusation, he explodes at being questioned at all.

His anger suggests either guilt over the charge or fury at being doubted after everything he has done.

😡 Wroth is an old word for angry
🚫 Abner never actually denies the charge
❓ His anger could mean guilt or pride
📖 Either way, the damage is already done

## 🐕 Am I A Dog's Head

Calling someone a dog's head was a serious insult in this culture.

Dogs were seen as unclean scavengers, not loyal pets the way many people picture them today.

Abner is asking whether Ishbosheth truly sees him as that worthless.

The question is meant to shame Ishbosheth for even bringing this up.

🐕 A dog's head meant something worthless
🚫 Dogs were seen as unclean scavengers here
😤 Abner demands to know if that is true
📖 The insult is meant to shame Ishbosheth

## 📖 Which Against Judah Do Shew Kindness This Day

"Shew" is an old spelling of show.

Abner lists everything he has personally done to keep Saul's family in power.

He has fought against Judah and David on their behalf this whole time.

He frames himself as the reason Saul's house survives at all.

📖 Shew is an old spelling of show
⚔️ Abner has fought Judah for Saul's family
🛡️ He credits himself with their survival
➡️ He expects loyalty in return, not suspicion

## 🙏 So Do God To Abner, And More Also

This is a formal oath, calling down a curse on the speaker if it is broken.

Ishbosheth just accused Abner of reaching for the throne.

Abner responds by swearing to do exactly that, on David's behalf now.

He commits himself publicly to make David king over the whole nation.

🙏 This is a formal self curse oath
⚔️ Abner turns from Saul's side to David's
👑 He swears to make David king of all
📖 David repeats this same oath later

## 🗺️ From Dan Even To Beersheba

"Translate" here is an old word for transfer.

Abner promises to move the whole kingdom out of Saul's family into David's hands.

"From Dan even to Beersheba" was a common way of saying the entire land, north to south.

Dan sat at the far north border, Beersheba at the far south.

🔁 Translate here means transfer
🗺️ Dan to Beersheba means the whole land
🧭 Dan marked the north, Beersheba the south
📖 Abner promises David all of it

## 😶 He Could Not Answer Abner A Word Again

Ishbosheth has no real response to his own general.

He started this conversation but cannot finish it once Abner turns on him.

Fear, not respect, is the only thing holding this kingship together now.

😶 Ishbosheth has no answer left
😨 He fears the man who made him king
👑 Fear is all that props up his throne
📖 The balance of power has already shifted

# SecondSamuel 3:12-16
# 🕊️ Abner's Bargain For Michal
---
## ❓ Whose Is The Land?

Abner opens his message to David with a question, not a greeting.

The question really means, who controls this land, if not me?

He is reminding David that Abner still holds real influence over most of the nation.

❓ Abner opens with a pointed question
🗺️ He is really asking who controls the land
💪 He reminds David of his own influence
➡️ This sets up the deal to come

## 🤝 Make Thy League With Me

A "league" here means a formal political agreement, close to a treaty.

Abner offers to personally deliver the loyalty of the northern tribes to David.

He is negotiating from a position of real strength, not surrender.

🤝 League here means a formal agreement
🗺️ Abner offers to deliver the northern tribes
💪 He negotiates from real strength
📖 David accepts the offer

## 👰 Thou Shalt Not See My Face, Except Thou First Bring Michal

David sets one condition before he will even meet with Abner.

Michal was Saul's daughter and David's first wife.

She had been taken from David years earlier.

Getting her back was not only personal.

It also tied David's kingship back to Saul's own family line.

David turns Abner's offer into a test of good faith.

👰 David demands Michal back first
👑 Michal was Saul's own daughter
🔗 Her return links David's kingship to Saul's line
➡️ David turns the offer into a test

## 💍 Which I Espoused To Me For An Hundred Foreskins Of The Philistines

David reminds Ishbosheth exactly what he originally paid for Michal.

Back in 1 Samuel 18, Saul demanded a bride price of one hundred Philistine foreskins.

He hoped David would die trying to collect them.

David delivered two hundred instead and survived.

Michal was never simply given to David.

He earned her at real risk to his own life.

💍 Espoused is an old word for married
⚔️ Saul set a deadly bride price for her
🛡️ David paid it and survived
📖 Michal was earned, not given

## 👑 Ishbosheth Sent, And Took Her From Her Husband, Even From Phaltiel

Ishbosheth actually obeys David's demand here, showing how little power he has left.

Phaltiel was the man Saul had given Michal to after David fled years earlier.

That marriage was likely a political move by Saul, meant to cut Michal's ties to David for good.

👑 Ishbosheth obeys, showing his weak position
👤 Phaltiel had been given Michal by Saul
✂️ Saul likely meant to sever those ties
📖 That plan is now being undone

## 😢 Her Husband Went With Her Along Weeping Behind Her

Phaltiel follows Michal on foot, crying the whole way, unwilling to let her go.

The Bible rarely shows this much raw emotion from a minor character.

This single detail makes the political trade feel like a real human cost.

😢 Phaltiel weeps the whole way
👤 He appears nowhere else in scripture
💔 His grief is shown plainly, not hidden
➡️ A political deal carries a real human cost

## 🗣️ Then Said Abner Unto Him, Go, Return

Abner ends Phaltiel's protest with two blunt words.

Bahurim was a village along the road, and it appears again later in David's story.

Phaltiel obeys instantly and disappears from scripture for good.

🗣️ Abner ends it with two short words
🗺️ Bahurim appears again later in David's life
🚶 Phaltiel obeys and vanishes from the story
📖 Abner's power silences even personal grief

# SecondSamuel 3:17-21
# 🤝 Abner Rallies Israel To David
---
## 👴 Abner Had Communication With The Elders Of Israel

The elders were the tribal leaders whose backing made a king's rule legitimate.

Abner works behind the scenes, building support before David ever appears in public.

Without the elders on his side, David could never be seen as king over the whole nation.

👴 Elders were the tribal leaders of Israel
🗣️ Abner works quietly behind the scenes
👑 Their backing makes David's kingship legitimate
📖 Abner is doing the real political work

## 🙏 By The Hand Of My Servant David I Will Save My People Israel

Abner quotes what he says is God's own promise about David.

He frames David's rise as God's plan, not just a political shift in power.

Using this kind of language makes it far harder for Israel's leaders to refuse.

🙏 Abner quotes a promise about David
👑 He frames this as God's own plan
🗣️ That framing is hard to argue against
📖 Abner uses faith to move politics

## 👪 Abner Also Spake In The Ears Of Benjamin

Benjamin was Saul's own tribe, the hardest group for Abner to convince.

Winning over Saul's closest kinsmen was a clear sign that the tide had turned.

If Benjamin would accept David, almost no one else had a strong reason left to refuse.

👪 Benjamin was Saul's own tribe
🎯 They were the hardest group to convince
🔁 Their agreement signals the tide has turned
➡️ Few others now have reason to refuse

## 🍽️ David Made Abner And The Men That Were With Him A Feast

Sharing a meal together was a way of formally sealing an agreement in this culture.

Twenty men traveled with Abner, a small enough group to signal peaceful intentions.

The feast marks the moment David and Abner's alliance becomes official.

🍽️ A shared feast sealed agreements in this world
👥 Twenty men signaled peaceful intentions
🤝 The meal makes the alliance official
📖 This should have been the turning point

## 🚶 I Will Arise And Go, And Will Gather All Israel

Abner promises to personally bring the rest of the nation under David's rule.

He is offering to finish, in one final trip, everything this chapter has built toward.

David sends him off trusting that promise completely.

🚶 Abner promises one final gathering trip
👑 He offers to unite the whole nation
🤝 David trusts him and sends him off
➡️ Everything is about to be undone

## 🕊️ David Sent Abner Away, And He Went In Peace

"In peace" means the two men parted as genuine allies, with no threat between them.

Nothing in this moment hints at what is about to happen next.

The very next verse changes everything this peaceful ending seemed to promise.

🕊️ In peace means they parted as allies
😌 Nothing here hints at danger ahead
⏳ The calm will not last long
📖 The next verse changes everything

# SecondSamuel 3:22-27
# 🗡️ Joab Murders Abner
---
## ⚔️ The Servants Of David And Joab Came From Pursuing A Troop

Joab and his men had been out raiding the whole time.

Abner was meeting with David during that very window.

Joab returns carrying real plunder from the raid.

Abner has already left Hebron by the time Joab arrives.

⚔️ Joab was away raiding during Abner's visit
💰 He returns carrying real plunder
🚶 Abner has already left before he arrives
➡️ Joab missed everything that just happened

## 🗣️ Abner The Son Of Ner Came Unto The King

Word reaches Joab the moment he returns, before he even sees David.

Someone makes sure Joab hears exactly what happened during his absence.

His reaction to this news will decide the rest of the chapter.

🗣️ Word reaches Joab immediately
👤 He learns of Abner's visit right away
😠 His reaction will shape everything next
➡️ Joab heads straight to David

## 😠 What Hast Thou Done? Behold, Abner Came Unto Thee

Joab confronts David directly, questioning his own king's judgment.

This is a bold move from a commander speaking to the man who leads him.

Joab's anger suggests he sees this meeting as a serious mistake, or a threat to himself.

😠 Joab openly questions David's decision
👑 This is a bold challenge to his king
⚠️ Joab sees danger, or a threat to himself
➡️ He pushes David toward suspicion

## 🕵️ He Came To Deceive Thee

Joab accuses Abner of spying, not negotiating in good faith.

There is no real evidence in the text that this accusation is true.

Joab may believe this, or he may be building an excuse.

His next move reveals his real motive.

🕵️ Joab accuses Abner of spying
❓ The text gives no proof this is true
😤 Joab may be building his own excuse
📖 His next move reveals his real motive

## 🗺️ Brought Him Again From The Well Of Sirah, But David Knew It Not

Joab acts entirely on his own, without telling David anything.

The well of Sirah sat a short distance north of Hebron.

Bringing Abner back this quietly is already a sign that Joab plans something David would never approve.

🗺️ The well of Sirah sat near Hebron
🤫 Joab acts without telling David at all
🚩 The secrecy itself is a warning sign
➡️ Joab is about to act alone

## 🚪 Took Him Aside In The Gate To Speak With Him Quietly

City gates were public meeting places, generally considered safe ground.

Joab pulls Abner away from that safety under the appearance of a private conversation.

Trust is exactly what makes this ambush possible.

🚪 Gates were normally safe, public places
🤝 Joab uses the appearance of trust
🗡️ That trust is what makes the ambush work
📖 Betrayal hides inside an ordinary invitation

## 🗡️ Smote Him There Under The Fifth Rib, That He Died

This is the exact same phrase used when Abner killed Asahel back in chapter two.

There, Abner struck in self defense during open battle.

Here, Joab strikes in a quiet ambush with no fight at all.

The matching wording makes the difference between the two deaths impossible to miss.

🗡️ The same phrase described Asahel's death
⚔️ Abner's killing happened in open battle
🤫 Joab's killing happens in a quiet ambush
📖 The matching words expose the real difference

## 👪 For The Blood Of Asahel His Brother

Joab kills Abner in personal revenge for his brother's death.

Under the old law, a close relative could avenge innocent blood.

That right was meant for honest justice, not a hidden ambush.

Real grief does not excuse breaking a promise of safety.

👪 Joab avenges his brother Asahel
⚖️ The law allowed an avenger for innocent blood
🚫 A hidden ambush was not honest justice
➡️ Real grief does not excuse the method

# SecondSamuel 3:28-30
# ⚖️ David's Curse On Joab's House
---
## 🙅 I And My Kingdom Are Guiltless Before The LORD For Ever

David immediately and publicly separates himself from what Joab just did.

He is protecting his own reputation, since a murdered peace envoy could destroy trust in his new kingship.

This declaration is as much a political necessity as it is a moral statement.

🙅 David publicly denies any guilt
👑 His reputation as king is at real risk
🗣️ The declaration protects his new kingship
📖 David draws a clear line from Joab

## ⚖️ Let It Rest On The Head Of Joab

David transfers the guilt for this killing onto Joab and his whole family line.

This is a formal curse, not just an angry comment.

Naming the consequence this clearly was meant to be remembered for generations.

⚖️ David shifts the guilt onto Joab's family
🗣️ This is a formal curse, not an insult
📜 It was meant to be remembered for years
➡️ David names the punishment instead of the man

## 🩹 That Hath An Issue, Or That Is A Leper

This curse lists several kinds of suffering, one after another.

"An issue" means a bodily disease that made a person ritually unclean.

A leper was also cast out of the community until healed.

Leaning on a staff meant permanent injury.

Falling on the sword meant a violent death.

Lacking bread meant lasting poverty.

🩹 An issue meant a disease making someone unclean
🚫 A leper was cast out of the community
⚔️ Falling on the sword meant violent death
📖 The list covers nearly every kind of shame

## 👪 Joab And Abishai His Brother Slew Abner

The text confirms plainly that both brothers were involved in the killing.

Abishai's exact role is not detailed, but he shares the blame here.

The writer ties the murder directly back to Asahel's death at Gibeon in chapter two.

Revenge, not politics, is named as the real reason behind this killing.

👪 Both Joab and Abishai share the blame
❓ Abishai's exact part is not detailed
🔁 The writer ties this back to Gibeon
📖 Revenge is named as the true motive

# SecondSamuel 3:31-35
# 😭 David Mourns Abner
---
## 👕 Rend Your Clothes, And Gird You With Sackcloth

David orders his own men to publicly grieve for the man Joab just murdered.

Tearing clothes and wearing rough sackcloth were the standard signs of deep mourning in this culture.

Ordering this for soldiers, not just family, made David's grief a public statement.

It also made his innocence in Abner's death visible to everyone watching.

👕 Rending clothes was a sign of grief
🪢 Sackcloth was rough cloth worn for mourning
📢 David makes this a public statement
📖 Public grief also proves his innocence

## ⚰️ King David Himself Followed The Bier

A "bier" is the frame used to carry a body to its burial place.

Kings did not normally walk behind the bodies of other men's funerals.

David does it anyway, treating a former enemy general with real personal honor.

⚰️ A bier carried the body to burial
👑 Kings rarely walked in funerals like this
🤝 David honors a former enemy personally
📖 His grief looks genuine, not staged

## 🪦 The King Lifted Up His Voice, And Wept

Abner is buried in Hebron itself, the city David now rules from.

David weeps loudly enough that everyone present can see and hear his grief.

The whole crowd weeps along with him.

🪦 Abner is buried right in Hebron
😭 David weeps loudly in front of everyone
👥 The whole crowd weeps along with him
📖 Grief spreads from the king to the people

## 📜 Died Abner As A Fool Dieth?

This line opens a short poem David composes on the spot.

A "fool" in this sense means a worthless criminal, not simply someone unwise.

The question implies Abner deserved a warrior's death, not a shameful ambush.

📜 This opens a short poem by David
🃏 Fool here means a worthless criminal
⚔️ Abner deserved a warrior's death instead
📖 The question quietly accuses Joab

## ⛓️ Thy Hands Were Not Bound, Nor Thy Feet Put Into Fetters

"Fetters" are chains used to bind a prisoner's feet.

David points out that Abner was never a captured criminal.

He fell the way an innocent man falls before wicked men.

The poem states, without naming Joab, exactly what really happened.

⛓️ Fetters are chains used on prisoners
🚫 Abner was never a lawfully punished criminal
😢 He died the way an innocent man dies
📖 The poem accuses Joab without naming him

## 🍞 So Do God To Me, And More Also, If I Taste Bread

The people try to get David to eat before the mourning is even finished.

David refuses with the same formal self curse oath Abner used earlier in this chapter.

Extending his fast this way was another visible sign of real grief, not performance.

🍞 The people urge David to eat early
🙏 He swears the same oath Abner used
⏳ He fasts until sundown as real grief
📖 The echo of Abner's own oath is deliberate

# SecondSamuel 3:36-39
# 👑 The People Take Notice
---
## 👥 All The People Took Notice Of It, And It Pleased Them

The public mourning works exactly as David intended.

People genuinely believe David had nothing to do with Abner's death.

Whatever the king did seemed right to them at this point in his reign.

👥 The people notice David's public grief
🤝 They believe he was not involved
👑 Trust in David grows from this moment
📖 His response wins the people over

## 📢 It Was Not Of The King To Slay Abner

This verse spells out plainly what David's mourning accomplished.

Even Israel's tribes, still technically loyal to Saul's family, believe David is innocent.

That trust becomes important as David works to unite the whole nation later.

📢 The verse states David's innocence plainly
🇮🇱 Even rival tribes believe he is innocent
🤝 That trust matters for uniting the nation
📖 Joab alone carries the blame

## 👑 There Is A Prince And A Great Man Fallen This Day

David publicly honors Abner's importance, even though Abner spent years opposing him.

Calling him a prince and a great man is high praise for a former enemy commander.

David's words shape how the nation remembers Abner going forward.

👑 David honors Abner despite past conflict
🗣️ Prince and great man is high praise
📖 His words shape how Abner is remembered
➡️ Grace toward an enemy defines this moment

## 👑 I Am This Day Weak, Though Anointed King

David openly admits that holding the title of king is not the same as holding full control.

Joab remains too powerful and too useful for David to punish him right now.

This honest admission of weakness is rare for a king to say out loud.

👑 A title does not always mean full control
💪 Joab remains too powerful to punish now
😔 David openly admits his own weakness
➡️ This weakness will resurface again later

## 👪 These Men The Sons Of Zeruiah Be Too Hard For Me

Zeruiah was David's own sister, making Joab and Abishai his nephews.

Family ties make it even harder for David to hold his own commanders accountable.

David hands the final judgment over to God instead of acting himself.

That unfinished justice does not disappear, it resurfaces on David's deathbed in 1 Kings.

👪 Zeruiah was David's own sister
⚔️ Joab and Abishai are David's own nephews
🙏 David leaves the judgment to God
📖 That justice returns in 1 Kings
`.trim();

export const SECOND_SAMUEL_THREE_PERSONAL_SECTIONS = parseSecondSamuelThreeRawNotes(
  SECOND_SAMUEL_THREE_RAW_NOTES,
);
