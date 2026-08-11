export type FirstKingsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsOneRawNotes(rawText: string): FirstKingsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKings\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKings\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKings\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 1:${startVerse}` : `1 Kings 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Kings 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_ONE_RAW_NOTES = `# FirstKings 1:1-4
# 🛏️ King David Grows Old
---
## 🧓 Old And Stricken In Years

"Stricken in years" is an old way of saying someone has grown very frail with age.

It does not simply mean David had birthdays.

It means his body was failing him in visible ways.

David had led Israel through decades of war and hardship before reaching this point.

The man once famous for his strength is now the frailest person in the room.

🧓 Stricken in years means very frail

⚔️ David ruled through decades of war

😔 His strength has clearly failed him

➡️ The strongest man in Israel is now weak

---
## 🥶 They Covered Him With Clothes, But He Gat No Heat

"Gat" is an old form of the word "got."

David's servants piled blankets on top of him.

His body still could not warm up.

Ancient physicians linked failing body heat to a person nearing death.

This is not a small complaint about being cold.

It is a clear sign David's health is failing badly.

🥶 Gat is an old word for got

🛏️ Blankets could not warm him

⚕️ Ancient healers watched body heat closely

📖 Failing warmth signaled David was dying

---
## 🔍 Let There Be Sought For My Lord The King A Young Virgin

The servants propose a nationwide search for a healthy young woman.

Her job would not be marriage.

It would be caregiving for a failing king.

Ancient households sometimes used a young healthy person to share body warmth with someone very ill.

This kind of care was a known practice in the ancient world.

Choosing a virgin protected her reputation under the law and custom of the time.

🔍 A search covers the whole kingdom

🩺 Her role was caregiving, not marriage

🌡️ Sharing body warmth was known medical care

📖 The custom protected her reputation

---
## 🛌 Let Her Lie In Thy Bosom, That My Lord The King May Get Heat

This phrase describes physical closeness meant purely for warmth.

It does not describe a romantic or marital relationship.

The text says plainly later that David never had relations with her.

Ancient medicine had no better way to treat a body that had stopped generating its own heat.

The servants were trying every available remedy for a dying king.

🛌 Lying near him means physical warmth

🚫 Not a romantic or marital act

⚕️ Ancient medicine had no better remedy

📖 Every option was tried for the king

---
## 🗺️ Abishag A Shunammite

Abishag came from Shunem, a town in the fertile Jezreel Valley.

Shunem appears again later in the story of the prophet Elisha.

There, a Shunammite woman shows great kindness to Elisha and his servant.

The Bible does not say these are the same woman.

Abishag's hometown ties her to a region known elsewhere in scripture.

🗺️ Shunem sat in the Jezreel Valley

📜 Shunem appears again with the prophet Elisha

❓ The two women may not be the same

📖 Her hometown links her to scripture elsewhere

---
## 💍 The King Knew Her Not

In the Bible, the word "knew" is often a polite way of describing sexual relations.

This verse states plainly that David and Abishag never had that kind of relationship.

The detail matters more than it first appears.

It confirms Abishag never became David's wife or gained any political claim.

That detail becomes important once Adonijah later asks to marry her.

💍 Knew is a Bible word for intimacy

🚫 David and Abishag never had that relationship

👑 She gained no wife's status or claim

➡️ This detail matters again later with Adonijah

# FirstKings 1:5-10
# 👑 Adonijah Crowns Himself
---
## 🙋 Then Adonijah The Son Of Haggith Exalted Himself

Adonijah was one of David's surviving sons, born to his wife Haggith.

"Exalted himself" means he declared his own kingship without being chosen.

He did not wait for David's word or God's choice.

Three of David's older sons were already dead or out of the picture by this point.

That left Adonijah as the presumed next in line by simple age.

👑 Adonijah was David's son by Haggith

🙋 Exalted himself means self declared king

⏳ He did not wait to be chosen

➡️ Age alone made him assume he was next

---
## 🏇 He Prepared Him Chariots And Horsemen, And Fifty Men To Run Before Him

Chariots, horsemen, and runners were classic symbols of royal power in this era.

A crown prince gathering these on his own signaled one thing clearly.

He intended to be seen as king before anyone approved it.

Adonijah's older brother Absalom used this exact same tactic years earlier.

That earlier rebellion ended in Absalom's death and a divided kingdom.

🏇 Chariots and horsemen signaled royal power

👀 The display announced his own kingship

📜 Absalom used this same tactic before

➡️ That earlier attempt ended in disaster

---
## 😶 His Father Had Not Displeased Him At Any Time

David never confronted Adonijah about anything he did.

This is the exact same parenting pattern that shaped Absalom.

A king who ruled a whole nation could not bring himself to correct his own son.

That unchecked upbringing helped create this crisis.

😶 David never confronted his son

🔁 The same pattern shaped Absalom

👨‍👦 A king who never corrected his son

➡️ Unchecked upbringing helped cause this crisis

---
## 👶 His Mother Bare Him After Absalom

This line settles Adonijah's place in David's family.

David's first son Amnon was killed by Absalom's men years earlier.

Absalom himself was later killed during his own rebellion.

A son named Chileab is mentioned once at birth and never appears again in the story.

That leaves Adonijah as the oldest son still alive and active in this scene.

👨‍👨‍👦 Amnon and Absalom were older and dead

👶 Chileab is barely mentioned elsewhere

🥇 Adonijah becomes the oldest living son

➡️ Birth order fuels his claim to the throne

---
## 🤝 He Conferred With Joab The Son Of Zeruiah, And With Abiathar The Priest

Joab had commanded David's entire army for decades.

Abiathar had fled Jerusalem alongside David during Absalom's earlier revolt.

Both men were trusted insiders from the very beginning of David's reign.

Their choice to back Adonijah instead of Solomon was a major political shift.

⚔️ Joab commanded David's army for decades

🏃 Abiathar once fled with David himself

🤝 Both were trusted, long term allies

➡️ Their switch was a major defection

---
## ⚖️ But Zadok The Priest, And Benaiah The Son Of Jehoiada

David's government splits into two camps in this chapter.

Zadok, Benaiah, Nathan, and David's personal guard chose not to back Adonijah.

Joab and Abiathar chose the other side.

Even the priesthood itself divides between Zadok and Abiathar.

This split reaches all the way to the very top of the kingdom.

⚖️ The government splits into two camps

🛡️ Zadok and Benaiah refuse to join

🙏 The priesthood itself divides in two

➡️ The split reaches the top of the kingdom

---
## 🐑 Adonijah Slew Sheep And Oxen And Fat Cattle By The Stone Of Zoheleth

A large public sacrifice like this was part of an ancient coronation feast.

Slaughtering this many animals signaled serious wealth and serious intent.

The stone of Zoheleth is not identified anywhere else in the Bible.

Its exact location and meaning are simply not recorded for us today.

🐑 A big sacrifice marked a coronation feast

💰 The scale showed wealth and intent

❓ Zoheleth is not identified elsewhere

➡️ Not every detail in scripture is explained

---
## 🏞️ By Enrogel

En rogel was a spring just outside Jerusalem's walls.

Its name likely means spring of the fuller, tied to a trade that washed cloth there.

Choosing a spot outside the city kept the event away from David's own household.

The location itself was part of the plan.

🏞️ En rogel was a spring near Jerusalem

🧺 Its name may mean spring of the fuller

🚪 The spot sat outside the city walls

➡️ Distance from David kept his plan hidden

---
## 📋 Nathan The Prophet, And Benaiah, And The Mighty Men, And Solomon His Brother, He Called Not

Adonijah's guest list was not random.

He invited every brother except Solomon.

He left out every officer known to be loyal to David's original inner circle.

This was a calculated exclusion, not an oversight.

📋 The guest list was carefully chosen

🚫 Solomon alone was left out

🛡️ Loyal officers were also excluded

➡️ Exclusion here was deliberate, not accidental

# FirstKings 1:11-14
# 🗣️ Nathan Warns Bathsheba
---
## 🗣️ Wherefore Nathan Spake Unto Bathsheba The Mother Of Solomon

Nathan chooses to approach Bathsheba first instead of going straight to David.

As Solomon's mother, she has the most personal reason to act.

She also has private access to the king that Nathan does not have.

Working together gives their warning more weight than either could bring alone.

🗣️ Nathan approaches Bathsheba first

👩 She has the strongest personal stake

🚪 She has private access to the king

➡️ Together their warning carries more weight

---
## 🚨 Hast Thou Not Heard That Adonijah Doth Reign, And David Our Lord Knoweth It Not

Nathan states the danger in the bluntest possible terms.

Adonijah is already acting like king in public.

David, the actual king, has not approved any of it.

Someone is deliberately keeping this news away from him.

🚨 Nathan states the danger bluntly

👑 Adonijah already acts like king

🤐 David has not approved any of it

➡️ Someone is hiding this from the king

---
## ⚠️ That Thou Mayest Save Thine Own Life, And The Life Of Thy Son Solomon

This is not simply political talk.

It is a warning about survival.

New kings in the ancient world often executed rival claimants and their families.

Bathsheba and Solomon were both in real, immediate danger if Adonijah succeeded.

⚠️ This warning is about survival

☠️ New kings often killed rival claimants

👨‍👦 Bathsheba and Solomon were both at risk

➡️ The danger here was real and immediate

---
## 🤝 Didst Not Thou, My Lord, O King, Swear Unto Thine Handmaid

Nathan tells Bathsheba to remind David of a specific promise.

David had apparently sworn that Solomon would be the next king.

Scripture never records that exact oath being made earlier in the story.

Its existence is confirmed here through the memory of the people who heard it.

🤝 Nathan points to an earlier promise

👑 David had sworn Solomon would reign

📜 The oath itself is not recorded earlier

➡️ We only learn of it through this scene

---
## 🚪 Go And Get Thee In Unto King David

As David's wife, Bathsheba could enter his private chamber directly.

Nathan, as a prophet, would normally need a more formal approach.

Her access is exactly why Nathan sends her in first.

Their two approaches work together as one coordinated plan.

🚪 A wife had direct chamber access

📯 A prophet needed a more formal approach

🧩 Her access fits the plan's first step

➡️ Two approaches form one coordinated plan

---
## 🕰️ I Also Will Come In After Thee, And Confirm Thy Words

Nathan promises to arrive right after Bathsheba finishes speaking.

A second witness backing up her story makes it far harder to dismiss.

Ancient law valued the testimony of two witnesses over just one.

This plan is designed with that principle in mind.

🕰️ Nathan will arrive right after her

🤝 A second witness is harder to dismiss

⚖️ Ancient law valued multiple witnesses

➡️ The plan uses that principle on purpose

# FirstKings 1:15-21
# 👸 Bathsheba Pleads Her Case
---
## 🛏️ The King Was Very Old, And Abishag The Shunammite Ministered Unto The King

The scene opens by reminding the reader of David's condition one more time.

Abishag is still present, caring for him as she was assigned to do in verse four.

Her presence in the room highlights just how weak David has become.

This detail sets the stage for everything Bathsheba is about to say.

🛏️ The reminder repeats David's condition

🧑‍⚕️ Abishag is still caring for him

😔 His weakness sets the scene

➡️ The stage is set for Bathsheba's plea

---
## 🙇 Bathsheba Bowed, And Did Obeisance Unto The King

"Obeisance" means a formal bow showing deep respect.

Even as David's wife, Bathsheba follows strict royal court protocol.

This formality shows how seriously she treats the moment.

She is approaching this as a matter of state, not just a family talk.

🙇 Obeisance means a formal, deep bow

👑 Court protocol applied even to a wife

🎯 Her formality shows the moment's weight

➡️ This was treated as a matter of state

---
## 🧠 And The King Said, What Wouldest Thou

David's direct question shows his mind is still sharp.

His body may be failing, but his attention is not.

This detail matters because it rules out any idea that confusion caused this crisis.

David will make his choice with full understanding of what is happening.

🧠 David's question shows a sharp mind

💪 Only his body has failed, not his mind

🚫 Confusion did not cause this crisis

➡️ David acts with full understanding

---
## 🗣️ Thou Swarest By The LORD Thy God Unto Thine Handmaid

Bathsheba reminds David that his earlier promise was not a casual comment.

He swore it in God's name, which made it a binding oath.

Breaking a vow made in the LORD's name was considered extremely serious.

She is holding him to his own word before God.

🗣️ Bathsheba states the promise plainly

🙏 Swearing by God made it binding

⚖️ Breaking such a vow was serious

📖 She holds David to his own oath

---
## 🔁 Adonijah Reigneth, And Now, My Lord The King, Thou Knowest It Not

Bathsheba repeats almost exactly what Nathan told her to say.

The repetition shows their plan is playing out exactly as designed.

She confirms David truly has not been told what is happening.

The information gap Nathan described is now proven directly by David's own wife.

🔁 Her words echo Nathan's script closely

🎯 The plan plays out as designed

🤐 David confirms he was never told

➡️ The information gap is now proven

---
## 🎯 Solomon Thy Servant Hath He Not Called

Bathsheba points out one detail on purpose.

Every other son of David was invited to Adonijah's feast.

Solomon alone was left out of the guest list.

That single exclusion is evidence of Adonijah's hostile intent.

🎯 Bathsheba names one deliberate detail

👨‍👦‍👦 Every other son was invited

🚫 Solomon alone was excluded

➡️ Exclusion here reveals hostile intent

---
## 👀 The Eyes Of All Israel Are Upon Thee

Bathsheba reminds David that the whole nation is waiting on his word.

No one else can settle this question but him.

His silence is not neutral.

People are already reading it as consent.

👀 The whole nation waits on David

👑 Only the king can settle this

🤫 Silence is not a neutral choice

➡️ People are reading silence as consent

---
## ⚠️ I And My Son Solomon Shall Be Counted Offenders

"Offenders" here means people treated as guilty rebels.

If David dies without naming an heir, whoever wins will treat Bathsheba and Solomon as threats.

In this era, that usually meant execution, not exile.

Bathsheba is naming the worst possible outcome plainly.

⚠️ Offenders means treated as guilty rebels

☠️ The usual punishment was execution

👨‍👦 Both Bathsheba and Solomon are at risk

➡️ She names the worst outcome plainly

---
## ⚔️ Joab The Captain Of The Host

Bathsheba names Joab specifically among Adonijah's guests.

His title, captain of the host, means commander of Israel's whole army.

His presence at the feast means Adonijah has military backing, not just family support.

That detail raises the stakes of the whole situation.

⚔️ Captain of the host means army commander

🎉 Joab attended Adonijah's feast

🪖 Adonijah has real military backing

➡️ Military support raises the stakes here

# FirstKings 1:22-27
# 🔮 Nathan Confirms The Threat
---
## ⏰ While She Yet Talked With The King, Nathan The Prophet Also Came In

Nathan arrives at exactly the moment he promised in verse fourteen.

His timing is not luck.

It is the plan working precisely.

Two separate witnesses now stand before David within minutes of each other.

⏰ Nathan arrives exactly on schedule

🎯 This confirms the earlier plan

👥 Two witnesses now stand together

➡️ Timing itself becomes part of the proof

---
## 📣 And They Told The King, Saying, Behold Nathan The Prophet

Court protocol required an attendant to announce a visitor by name and title.

David hears exactly who has arrived before Nathan even speaks.

Announcing a prophet by name signaled that something important was happening.

📣 Attendants announced visitors by name

👑 David knew who arrived immediately

📯 Naming a prophet signaled importance

➡️ The formality prepares David for news

---
## 🙇 He Bowed Himself Before The King With His Face To The Ground

This bow goes even further than Bathsheba's earlier gesture.

Face to the ground was the deepest form of respect shown in this culture.

A prophet, someone who regularly speaks for God, still honors the king this fully.

The gesture shows respect for David's office before a single hard word is spoken.

🙇 This bow goes deeper than Bathsheba's

🌍 Face to the ground was the deepest honor

📜 Even a prophet honors the king's office

➡️ Respect and hard news can coexist

---
## ❓ Hast Thou Said, Adonijah Shall Reign After Me

Nathan frames his warning as a simple question, not an accusation.

He is testing whether David actually approved any of this.

The question forces David to state clearly what he did or did not decide.

It is a careful, respectful way to expose the truth.

❓ Nathan asks instead of accusing

🧪 The question tests David's actual will

🗣️ David must state the truth clearly

➡️ It exposes the truth respectfully

---
## 🍽️ They Eat And Drink Before Him, And Say, God Save King Adonijah

Nathan reports that people are already publicly hailing Adonijah as king.

This is not a private ambition anymore.

It has become a public celebration happening in real time.

Every moment David delays makes the claim harder to undo.

🍽️ Guests are eating and drinking together

📢 People already hail him as king

⏱️ This celebration is happening right now

➡️ Delay makes the claim harder to stop

---
## 🚫 Me, Even Me Thy Servant, Hath He Not Called

Nathan points out that he himself was left off the guest list too.

His own exclusion proves he is not exaggerating the threat.

A prophet close to the king would normally expect to be included.

Being left out puts Nathan in real danger alongside Solomon and Zadok.

🚫 Nathan was excluded from the feast too

✅ His exclusion proves he is not exaggerating

👀 Prophets close to the king expected invitations

➡️ Nathan himself is now at real risk

---
## 🗣️ Thou Hast Not Shewed It Unto Thy Servant

Nathan directly challenges David to his face.

"Shewed" is an old spelling of "showed."

He asks plainly whether David approved this without telling his own prophet.

This kind of bluntness was part of a prophet's proper role, not disrespect.

🗣️ Nathan challenges the king directly

📝 Shewed is an old spelling of showed

❓ He asks if David approved this quietly

➡️ Bluntness was a prophet's proper role

# FirstKings 1:28-31
# 🤝 David Renews His Oath
---
## 🔔 Then King David Answered And Said, Call Me Bathsheba

David finally breaks his silence after hearing both witnesses.

"Call me Bathsheba" is his first clear command in this whole crisis.

His passivity ends the moment he has heard enough.

Action follows immediately after this simple sentence.

🔔 David finally breaks his silence

🗣️ This is his first clear command

⏹️ His passivity ends right here

➡️ Decisive action follows immediately

---
## 📜 As The LORD Liveth, That Hath Redeemed My Soul Out Of All Distress

This exact phrase appears elsewhere in David's own writing, including several Psalms.

It recalls a lifetime of real dangers God had already brought him through.

David is not making an empty promise.

He is standing on decades of personal experience with God's faithfulness.

📜 This phrase echoes David's own Psalms

🛡️ It recalls a lifetime of real danger

🙏 David stands on years of experience

➡️ This oath is not an empty promise

---
## ⏳ Even So Will I Certainly Do This Day

David does not schedule this for later.

He commits to acting immediately, that very day.

The feast at En rogel is still happening as he speaks.

Urgency, not ceremony, drives every word of this decision.

⏳ David commits to acting today

🎉 Adonijah's feast is still underway

🚨 Urgency shapes this whole decision

➡️ This is action, not just a promise

---
## 🙇 Then Bathsheba Bowed With Her Face To The Earth, And Did Reverence

This bow goes deeper than her earlier obeisance back in verse sixteen.

That first bow was a formal request.

This one is a grateful response after getting exactly what she came for.

The posture shifts from petition to genuine relief.

🙇 This bow is deeper than her first

📥 Her first bow was a request

🙏 This bow is a grateful response

➡️ The shift shows real relief

---
## 👑 Let My Lord King David Live For Ever

This line was a standard court blessing, not a literal wish for immortality.

People said it to honor a king and express loyalty.

It appears elsewhere in scripture in similar royal scenes.

Bathsheba uses the traditional words to close the moment with honor.

👑 This was a standard royal blessing

🗣️ It expressed honor, not literal immortality

📜 Similar phrases appear elsewhere in scripture

➡️ Bathsheba closes the moment with honor

# FirstKings 1:32-37
# 🐴 Solomon's Anointing Is Commanded
---
## 👥 Take With You The Servants Of Your Lord

David assembles the men he trusts most for this next step.

Zadok, Nathan, and Benaiah are each already known to be loyal to Solomon.

Choosing these three specifically leaves no room for Adonijah's supporters to interfere.

David is acting fast and acting through people he knows will not hesitate.

👥 David gathers his most trusted men

🛡️ Zadok, Nathan, and Benaiah are all loyal

🚫 No room is left for interference

➡️ David acts fast through trusted hands

---
## 🐴 Cause Solomon My Son To Ride Upon Mine Own Mule

This is not a small detail.

Riding the king's own animal was a specific, exclusive symbol of the king's chosen successor.

No one else was permitted to ride it.

The act itself announces Solomon's status before a single word is spoken.

🐴 Riding the king's mule was exclusive

🚫 No one else could ride that animal

👑 It marked Solomon as chosen successor

➡️ The act itself announced the decision

---
## 💧 Bring Him Down To Gihon

Gihon was a spring located near Jerusalem, close to the city itself.

It stands in sharp contrast to En rogel, where Adonijah held his private feast.

Gihon was chosen precisely because it was public and visible.

Everyone in the city could see and hear what happened there.

💧 Gihon was a spring near the city

🙈 En rogel was chosen for privacy

👀 Gihon was chosen for visibility

➡️ Everyone in the city could witness it

---
## 🕊️ Let Zadok The Priest And Nathan The Prophet Anoint Him There King

Anointing meant pouring oil on someone to set them apart for God's purpose.

Having both a priest and a prophet perform it gave the act double authority.

Adonijah's feast had no priest, no prophet, and no anointing at all.

This ceremony carries weight that Adonijah's celebration never had.

🕊️ Anointing set Solomon apart for God

⚖️ A priest and prophet gave double authority

🚫 Adonijah's feast lacked any of this

➡️ Real authority backs this ceremony

---
## 🗺️ Ruler Over Israel And Over Judah

David names both halves of the kingdom together in one sentence.

At this point, Israel and Judah still functioned as one united nation under David.

Years later, after Solomon's own son takes the throne, the kingdom splits along this exact line.

This phrase reads very differently once that later split is known.

🗺️ Israel and Judah are named together

🤝 The two still formed one kingdom

💔 They later split under Solomon's son

➡️ This phrase carries weight looking forward

---
## ✅ And Benaiah The Son Of Jehoiada Answered The King, And Said, Amen

"Amen" is a word of firm agreement, meaning "let it be so."

It is not simply a word said at the end of a prayer.

Benaiah uses it here to formally back David's command out loud.

His public agreement adds his own military weight behind Solomon's cause.

✅ Amen means let it firmly be so

🗣️ It is more than a prayer ending

🪖 Benaiah backs the command publicly

➡️ His agreement adds real military weight

---
## 🙏 Make His Throne Greater Than The Throne Of My Lord King David

David prays for Solomon's reign to surpass his own.

This is a remarkable thing for any ruler to ask.

Most kings guard their own legacy instead of hoping to be outdone.

David's request reveals a father who wants what is best for his son and his nation.

🙏 David prays for Solomon to surpass him

👑 Few rulers wish to be outdone

❤️ This shows real fatherly selflessness

➡️ David wants what is best for the nation

# FirstKings 1:38-40
# 🎺 Solomon Is Anointed At Gihon
---
## 🛡️ The Cherethites, And The Pelethites

The Cherethites and Pelethites were foreign soldiers who served as David's personal bodyguard.

They answered directly to David, not to the wider army or the tribes of Israel.

Their presence here shows exactly where the real armed loyalty stood.

David's private guard backs Solomon's anointing without hesitation.

🛡️ These were David's personal bodyguard

🌍 They were foreign soldiers, not Israelite tribes

👑 They answered only to David himself

➡️ Their loyalty backs Solomon without hesitation

---
## 🐮 Zadok The Priest Took An Horn Of Oil Out Of The Tabernacle

The horn of oil was the proper ritual container used for anointing kings and priests.

Taking it from the tabernacle means this oil was set apart for sacred use.

Adonijah's feast never involved anything like this sacred object.

This detail marks Solomon's anointing as the officially sanctioned one.

🐮 A horn held oil for anointing

🛖 The tabernacle marked it as sacred

🚫 Adonijah's feast had no sacred oil

➡️ This marks Solomon's anointing as official

---
## 📢 All The People Said, God Save King Solomon

This proclamation is immediate and unanimous.

No one present objects or hesitates.

It stands in direct contrast to Adonijah's smaller, self selected crowd.

Public support for Solomon appears the moment his anointing is complete.

📢 The proclamation is immediate

🙌 No one present objects

👥 This crowd is larger than Adonijah's

➡️ Public support appears instantly

---
## 📣 The Earth Rent With The Sound Of Them

"Rent" is an old word meaning torn or split apart.

This is a figure of speech, not a literal earthquake.

It describes an overwhelming volume of noise from trumpets, singing, and celebration.

The sheer sound itself becomes proof of how big this moment was.

📣 Rent is an old word for torn

🌍 This is not a literal earthquake

🎺 Trumpets and singing filled the air

➡️ The noise itself proved the moment's size

# FirstKings 1:41-45
# 😱 Adonijah's Feast Falls Apart
---
## 🍽️ Adonijah And All The Guests That Were With Him Heard It

The noise from Gihon reaches Adonijah's feast just as the meal finishes.

The timing is almost cruelly precise.

Adonijah's celebration is complete just before it collapses entirely.

There was no warning, only a sudden interruption.

🍽️ The feast had just finished eating

⏰ The timing could not be worse

💥 The celebration collapses right after

➡️ No warning came before the interruption

---
## ❓ Wherefore Is This Noise Of The City Being In An Uproar

Joab asks this question the moment he hears the commotion.

As a career military commander, Joab knows the sound of trouble.

His alarm shows that even Adonijah's own general senses something has gone wrong.

Confidence at the feast turns to concern in an instant.

❓ Joab questions the sudden noise

⚔️ He recognizes trouble from experience

😟 Even Adonijah's own general grows alarmed

➡️ Confidence turns to concern instantly

---
## 🏃 Jonathan The Son Of Abiathar The Priest Came

This is the same Jonathan who once carried urgent news to David during Absalom's revolt.

Back then, he ran through danger to deliver a message that saved lives.

His reputation as a reliable messenger is already well established.

Whatever he says next will be taken as fact, not rumor.

🏃 Jonathan once ran urgent news to David

🛡️ He helped save lives during Absalom's revolt

✅ His reputation for reliability is well known

➡️ His words will be trusted as fact

---
## 😀 Thou Art A Valiant Man, And Bringest Good Tidings

Adonijah greets Jonathan warmly, expecting only good news.

He assumes Jonathan has come to confirm his new kingship.

This moment is full of dramatic irony for the reader.

The very messenger Adonijah welcomes is about to end his celebration.

😀 Adonijah expects only good news

🎉 He assumes his kingship is confirmed

🎭 The moment is full of irony

➡️ This welcome is about to backfire

---
## 🗣️ Verily Our Lord King David Hath Made Solomon King

Jonathan does not soften this news at all.

He states the reversal in the plainest possible words.

"Verily" is an old way of saying "truly" or "certainly."

There is no ambiguity left in his report.

🗣️ Jonathan states the news plainly

🚫 He does not soften the blow

📝 Verily is an old word for truly

➡️ No ambiguity remains after this report

---
## 🔁 They Have Caused Him To Ride Upon The King's Mule

Jonathan repeats the exact same details David commanded back in verse thirty three.

This precision matters.

He is reporting facts, not rumors he half heard.

Every detail lines up with what actually happened at Gihon.

Repetition here builds credibility instead of feeling redundant.

🔁 Jonathan repeats David's exact commands

🐴 The mule detail confirms the report

✅ Every fact lines up with what happened

➡️ Repetition here builds credibility, not boredom

---
## 🔊 The City Rang Again

The sound of celebration reaches all the way back to Adonijah's location.

This is the same uproar Joab first questioned back in verse forty one.

Sound becomes physical proof that Jonathan's report is true.

Adonijah does not need to see Solomon crowned.

He can hear it happening from where he sits.

🔊 Celebration noise reaches Adonijah directly

🔁 This is the same uproar from before

✅ Sound itself proves the report true

➡️ Adonijah hears his defeat before he sees it

# FirstKings 1:46-49
# 👑 Solomon's Throne Is Secured
---
## 👑 Solomon Sitteth On The Throne Of The Kingdom

This line confirms Solomon is already, officially, enthroned.

There is no waiting period and no further ceremony needed.

The transfer of power that took David decades to build happens here within hours.

Adonijah's plan is now completely finished.

👑 Solomon is already fully enthroned

⏱️ No waiting period was needed

🏃 Power transferred within just hours

➡️ Adonijah's plan is now finished

---
## 🛏️ The King Bowed Himself Upon The Bed

Even in this moment of triumph, David remains physically frail.

He cannot stand to celebrate.

He can only bow from where he lies.

This detail keeps David's real condition in view even at the story's high point.

Strength of purpose does not require strength of body.

🛏️ David remains physically frail here

🙇 He bows from where he lies

👁️ His condition stays visible even now

➡️ Purpose does not require physical strength

---
## 🙏 Mine Eyes Even Seeing It

David expresses gratitude that he lived to witness this moment himself.

Many kings in this era died before their chosen successor was secured.

David gets to see the outcome he worked and prayed for.

This is a rare and personal mercy inside a chaotic day.

🙏 David gives thanks for what he sees

👑 Many kings never saw this outcome

❤️ David witnesses his own success

➡️ This moment is a personal mercy

---
## 🏃 All The Guests That Were With Adonijah Were Afraid, And Rose Up, And Went Every Man His Way

Adonijah's supporters scatter the moment the news arrives.

No one stays to defend him or the celebration they were just part of.

Political loyalty in this scene proves shallow and self interested.

The feast that began with confidence ends in complete abandonment.

🏃 Guests scatter immediately at the news

🙅 No one stays to defend Adonijah

💔 Their loyalty proves shallow and self interested

➡️ Confidence ends in total abandonment

# FirstKings 1:50-53
# 🙏 Adonijah Begs For Mercy
---
## 😨 And Adonijah Feared Because Of Solomon, And Arose, And Went, And Caught Hold On The Horns Of The Altar

The altar had raised, horn shaped corners at each of its four points.

Grabbing hold of them was an ancient way of claiming sanctuary from immediate punishment.

Adonijah runs straight to the one place he believes offers him safety.

His fear shows he already understands exactly how this usually ends for a rival claimant.

🐮 The altar had raised, horn shaped corners

🏃 Adonijah runs there for safety

😨 His fear reveals real understanding

➡️ Rival claimants usually did not survive

---
## 📰 It Was Told Solomon, Saying, Behold, Adonijah Feareth King Solomon

News of Adonijah's move reaches Solomon almost immediately.

This shows Solomon already has people watching and reporting to him.

The new king's government is functioning within hours of his anointing.

Solomon is not caught off guard by this next crisis.

📰 News reaches Solomon almost immediately

👀 His government is already watching closely

⏱️ It functions within hours of anointing

➡️ Solomon is not caught off guard

---
## ⚔️ Let King Solomon Swear Unto Me Today That He Will Not Slay His Servant With The Sword

Adonijah names his exact fear out loud.

He knows execution was the normal way new kings dealt with rivals.

Asking for an oath shows he does not trust a simple promise alone.

He wants the strongest possible guarantee available to him.

⚔️ Adonijah names execution as his fear

👑 New kings often killed rival claimants

🤝 He wants a sworn guarantee, not a promise

➡️ He seeks the strongest safety available

---
## 🕊️ If He Will Shew Himself A Worthy Man, There Shall Not An Hair Of Him Fall To The Earth

Solomon offers real mercy, but it comes with a condition.

"Not a hair falling to the earth" is an old idiom meaning complete safety.

The safety depends on Adonijah's future behavior, not just his past fear.

Solomon's first act as king is measured mercy, not blind trust.

🕊️ Solomon offers real, conditional mercy

💇 Not a hair falling means total safety

🔍 Safety depends on future behavior

➡️ This is measured mercy, not blind trust

---
## ⚖️ But If Wickedness Shall Be Found In Him, He Shall Die

Solomon makes the other side of the condition just as clear.

Mercy here is not the same as forgetting what Adonijah tried to do.

This warning sets up real tension for later chapters in the book.

Adonijah's story is not actually finished after this scene.

⚖️ The condition cuts both ways

🚫 Mercy does not mean forgetting the coup

⏳ Real tension carries into later chapters

➡️ Adonijah's story is not finished yet

---
## 🏠 Go To Thine House

Adonijah is released from the altar and sent home, not to prison.

He bows to Solomon first, formally accepting the new king's authority.

"Go to thine house" is not full restoration to his old standing.

It is supervised freedom, not forgiveness without consequence.

🏠 Adonijah is sent home, not jailed

🙇 He bows, accepting Solomon's authority

👀 This is supervised freedom, not full pardon

➡️ Mercy here comes with limits
`.trim();

export const FIRST_KINGS_ONE_PERSONAL_SECTIONS = parseFirstKingsOneRawNotes(FIRST_KINGS_ONE_RAW_NOTES);
