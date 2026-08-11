export type SecondSamuelFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelFifteenRawNotes(rawText: string): SecondSamuelFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 15:${startVerse}` : `2 Samuel 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 15 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_FIFTEEN_RAW_NOTES = `# SecondSamuel 15:1-6
# 😏 Absalom Steals The Hearts Of Israel
---
## 🐎 Prepared Him Chariots And Horses, And Fifty Men To Run Before Him

A chariot with fifty runners going ahead was not a private hobby.

In the ancient world, that kind of procession announced a king.

Absalom is not hiding his ambition here.

He puts it on display for everyone to see.

His half brother Adonijah later copies this exact move.

🐎 Chariots and runners signaled royal ambition

👑 Absalom displays his ambition openly

🔁 Adonijah later copies this same move

📖 A public display before an open rebellion

## 🚪 Stood Beside The Way Of The Gate

The city gate was not just an entrance.

It served as the courtroom where kings and elders judged disputes.

Absalom picks that exact spot on purpose.

Anyone seeking justice would have to pass him first.

🚪 The gate functioned as the courtroom

⚖️ People came there seeking judgment

🎯 Absalom picks his spot on purpose

➡️ He meets people before David does

## ❓ Of What City Art Thou

Absalom greets every stranger with a personal question.

Asking where someone comes from makes a visitor feel noticed.

This was not real concern.

It was the opening line of a routine repeated on every visitor.

❓ Absalom asks personal questions

🙂 Attention makes strangers feel noticed

🎭 The routine is not sincere

➡️ Every visitor gets the same act

## 📜 There Is No Man Deputed Of The King To Hear Thee

"Deputed" means officially appointed to a task.

Absalom claims David left no one in place to hear complaints.

No other part of scripture confirms that claim is true.

Absalom is manufacturing a grievance against his own father.

📜 Deputed means officially appointed

❌ Absalom claims no judge exists

🤥 No other source confirms this

📖 A manufactured complaint against David

## 🙋 Oh That I Were Made Judge In The Land

Absalom offers himself as the fix for a problem he just invented.

He promises perfect justice for every single complaint.

A promise made that easily should raise suspicion.

This is not a real plan.

It is loyalty being built for a future coup.

🙋 Absalom offers himself as the fix

⚖️ He promises justice for everyone

🚩 Easy promises deserve suspicion

➡️ This loyalty is being built for a coup

## 💋 He Put Forth His Hand, And Took Him, And Kissed Him

A king's son was not expected to embrace ordinary people this way.

The kiss was a greeting normally shared between equals.

Absalom erases the distance between himself and the crowd on purpose.

Humility staged this often was not humility at all.

💋 Kissing was a greeting between equals

👑 A prince was not expected to do this

🎭 Absalom erases distance on purpose

➡️ Staged humility can hide ambition

## 🫀 Absalom Stole The Hearts Of The Men Of Israel

To steal someone's heart here does not mean romance.

It means winning loyalty away from where it belongs.

Every conversation at the gate was building toward this outcome.

David still has no idea any of this is happening.

🫀 Stealing hearts means winning loyalty

🚪 Every gate conversation built toward this

🙈 David remains completely unaware

📖 Loyalty stolen this way was never earned

# SecondSamuel 15:7-12
# 🗡️ Absalom's Plot Begins In Hebron
---
## 🔢 After Forty Years

Forty years does not fit anywhere in David's actual reign.

Many scholars believe this number was a copying error for four.

Four years matches the time since Absalom's return in chapter fourteen.

The exact number is uncertain, but years of planning sit behind it.

🔢 Forty years does not fit David's reign

📜 Many scholars believe it should read four

📆 Four years fits chapter fourteen's timeline

➡️ Years of planning sit behind this request

## 🙏 Let Me Go And Pay My Vow

A vow was a serious promise made directly to God.

Asking to fulfill one gave Absalom a respectable reason to travel.

He asks to pay it specifically in Hebron.

Hebron was David's first capital, and the city where Absalom was born.

🙏 A vow was a serious promise to God

🎭 It gave Absalom a respectable excuse

🏙️ Hebron was David's first capital

📖 Absalom was born in that same city

## 🗡️ Then I Will Serve The LORD

This recalls Absalom's exile after he killed his brother Amnon.

He fled to Geshur for several years before David allowed his return.

Absalom dresses his rebellion plan in the language of gratitude to God.

The vow sounds sincere, but it hides a very different purpose.

🗡️ This recalls Absalom's exile after Amnon's death

🏃 He fled to Geshur for years

🎭 He dresses ambition as gratitude

➡️ A sincere sounding vow hides a real plan

## 🕊️ Go In Peace

David has no reason yet to doubt his son.

He sends Absalom off with an ordinary blessing for a routine trip.

The same father who forgave Absalom in chapter fourteen now funds his rebellion.

Trust between them was never actually repaired.

🕊️ David suspects nothing at this point

👋 He blesses what looks like a routine trip

💔 Forgiveness never repaired real trust

📖 David unknowingly enables the plot

## 🕵️ Spies Throughout All The Tribes Of Israel

Absalom does not leave this to chance.

He plants loyal men in every tribe before he even leaves Jerusalem.

One trumpet blast, heard everywhere at once, would launch the rebellion.

This plan has been building for a long time, not decided suddenly.

🕵️ Spies are placed in every tribe

📯 A trumpet signal launches the plan

🗓️ This was planned well in advance

➡️ Hebron was the trigger, not the origin

## 👑 Absalom Reigneth In Hebron

This announcement declares Absalom king while David is still alive.

Hebron was the very city where Israel first crowned David.

Absalom is using his father's own history against him.

The city that started David's reign is chosen to end it.

👑 The plot declares Absalom king outright

🏙️ Hebron was where David himself was crowned

🔁 Absalom reuses his father's own history

📖 One city, two very different coronations

## 🙂 They Went In Their Simplicity, And They Knew Not Any Thing

"Simplicity" here means innocence, not foolishness.

These two hundred men had no idea what they were walking into.

Their presence made Absalom's gathering look larger and more legitimate.

Absalom is willing to use innocent people as cover for his plan.

🙂 Simplicity means innocence, not foolishness

🙈 These men had no idea of the plot

👥 Their presence made the plot look bigger

➡️ Absalom uses innocent people as cover

## 🧠 Ahithophel The Gilonite, David's Counsellor

Ahithophel was David's top advisor.

His advice was so respected that people compared it to hearing from God.

Many scholars believe Ahithophel was Bathsheba's grandfather.

That link comes from names matched in chapter eleven and chapter twenty three.

🧠 Ahithophel was David's top advisor

📖 His counsel was compared to God's own voice

👪 He may have been Bathsheba's grandfather

➡️ This betrayal may run deeper than politics

## 📈 The Conspiracy Was Strong

This line marks the moment the plot becomes a real threat.

What began as private scheming has turned into open, growing momentum.

Every gate conversation, every spy, every recruit converges here.

David is about to learn his kingdom is already slipping away.

📈 Support for Absalom keeps growing

🧩 Every earlier scheme converges here

⚠️ The threat becomes fully real

📖 David is about to lose his kingdom fast

# SecondSamuel 15:13-18
# 🏃 David Flees Jerusalem
---
## 🫀 The Hearts Of The Men Of Israel Are After Absalom

This is the exact language from verse six come true.

What Absalom worked to steal, he has now actually taken.

A messenger brings David the news in the plainest terms.

There is no time left to question how this happened.

🫀 This echoes the stolen hearts of verse six

✅ Absalom's plan has fully succeeded

📨 A messenger delivers the plain truth

➡️ There is no time left to react slowly

## 🏃 Arise, And Let Us Flee

David does not hesitate or try to negotiate first.

Years as a fighting commander taught him to spot a losing position.

Staying to defend Jerusalem risked the whole city, not just the throne.

Leaving quickly protects more lives than staying and fighting would.

🏃 David reacts immediately, without delay

⚔️ His military instincts take over

🏙️ Staying risked the whole city

➡️ Leaving protects more than the throne

## ⚔️ Lest He Overtake Us Suddenly, And Bring Evil Upon Us

David fears a sudden, violent attack more than losing the crown.

The threat is not abstract to him.

This is his own son leading soldiers toward him.

Strategy and heartbreak are tangled together in this one decision.

⚔️ David fears a violent surprise attack

👨‍👦 The attacker is his own son

💔 Strategy and grief mix together here

📖 A father flees the child he raised

## 🗡️ Smite The City With The Edge Of The Sword

"The edge of the sword" is an old phrase for violent slaughter.

David is not only thinking about his own safety.

He is trying to spare Jerusalem's people from the fighting.

Leaving the city undefended by armies actually protects the people in it.

🗡️ Edge of the sword means violent slaughter

🏙️ David protects the city, not just himself

👥 Ordinary people were at real risk

➡️ Leaving spared the people who stayed

## 🤝 Whatsoever My Lord The King Shall Appoint

David's own servants answer him without hesitation.

Their loyalty stands in sharp contrast to what Absalom just accomplished.

This is the first of several loyalty tests in this chapter.

Not everyone in Israel has turned against David.

🤝 The servants answer without hesitation

⚖️ Their loyalty contrasts with Absalom's plot

🔁 More loyalty tests follow in this chapter

📖 Not everyone has turned against David

## 👪 Left Ten Women, Which Were Concubines, To Keep The House

A concubine held a real, recognized place in the household, below a wife.

David leaves ten of them behind to maintain the palace.

This decision sets up a painful moment two chapters later.

Nathan had already warned David this kind of tragedy was coming.

👪 A concubine held a lesser household role

🏠 They stay behind to maintain the palace

⚠️ This sets up a painful moment later

📖 Nathan's earlier warning is already in motion

## 👥 Tarried In A Place That Was Far Off

This is not a small group slipping away quietly.

A large crowd follows David out of the city on foot.

He stops at a distance to organize everyone before continuing.

What happens next at this stop tests who is truly loyal.

👥 A large crowd follows David out

🚶 They travel out of the city on foot

🛑 David stops to organize the group

➡️ This stop becomes a test of loyalty

## 🛡️ All The Cherethites, And All The Pelethites, And All The Gittites

The Cherethites and Pelethites were David's personal bodyguard.

Many scholars believe both groups had foreign, likely Philistine, roots.

The Gittites were six hundred men from the Philistine city of Gath.

Foreign soldiers stay loyal while many of David's own people just defected.

🛡️ Cherethites and Pelethites were David's guard

🌍 Many scholars believe they were foreign born

⚔️ The Gittites came from Gath

📖 Foreign soldiers stay loyal here, unlike many Israelites

# SecondSamuel 15:19-23
# 🤝 Ittai's Loyalty Tested
---
## 🚪 Wherefore Goest Thou Also With Us?

David is fleeing for his life, yet he stops for one man.

Ittai owes David no permanent loyalty.

David gives him a real, honorable way out before the danger grows.

Even in crisis, David thinks about someone else's safety first.

🚪 David offers Ittai a real way out

🙅 Ittai owes David no permanent loyalty

❤️ David thinks of Ittai's safety first

➡️ Crisis reveals David's character here

## 🌍 Thou Art A Stranger, And Also An Exile

Ittai is a stranger, meaning he is not an Israelite by birth.

He is also an exile, someone driven out of his own homeland.

David understands that experience personally from his own years running from Saul.

David sees his own past in the man standing in front of him.

🌍 Stranger means Ittai is not an Israelite

🏃 Exile means driven from his own home

🔁 David lived through the same experience

📖 David sees his own past in Ittai

## 📆 Thou Camest But Yesterday

Ittai has only just arrived in David's service.

There has been no time to build years of trust between them.

David is honestly asking why a newcomer would risk his life this fast.

Loyalty formed this quickly usually does not run very deep.

📆 Ittai arrived only recently

🤝 There has been little time to build trust

❓ David honestly questions the risk

➡️ Fast loyalty usually runs shallow

## 🙏 Mercy And Truth Be With Thee

David offers a genuine blessing even while trying to send Ittai away.

"Mercy and truth" describes steady, faithful kindness.

Those same words often describe God's own character.

David simply wants what is best for Ittai.

🙏 David offers a genuine blessing

❤️ Mercy and truth describes faithful kindness

😌 David is not annoyed by Ittai

📖 He wants what is best for Ittai

## 🙏 Whether In Death Or Life, Even There Also Will Thy Servant Be

Ittai swears by the LORD's own name before he even finishes his answer.

His loyalty does not depend on David winning.

This vow echoes Ruth's promise to Naomi generations earlier.

A foreigner offers David the loyalty his own son just betrayed.

🙏 Ittai swears by the LORD's name

⚖️ His loyalty does not depend on winning

🔁 This echoes Ruth's vow to Naomi

📖 A foreigner outshines David's own son

## ✅ Go And Pass Over

David stops arguing and simply accepts the offer.

No further test or objection follows.

Ittai's answer was clear enough to settle the matter.

A loyal man now stands beside David.

✅ David accepts Ittai's answer

🚫 No further argument follows

🗣️ The answer settled the matter completely

➡️ A loyal man stays at David's side

## 👨‍👩‍👧 All His Men, And All The Little Ones That Were With Him

Ittai is not traveling with soldiers alone.

He brings his entire household, including children, into this danger.

That detail raises how much his loyalty actually costs him.

He is risking more than just his own life.

👨‍👩‍👧 Ittai's whole household comes along

👶 Children travel into the danger too

💰 His loyalty costs him more than his life

➡️ He risks everyone he loves for David

## 😭 All The Country Wept With A Loud Voice

This is not a private moment of sadness.

A whole crowd cries out together as the king leaves his own capital.

Everyone watching understands what this departure actually means.

A civil war is beginning, and the whole nation feels its weight.

😭 A whole crowd weeps together

🏙️ The king leaves his own capital

⚠️ Everyone senses what this means

📖 A civil war begins in full view

## 🌊 The King Also Himself Passed Over The Brook Kidron

The brook Kidron ran in the valley just outside Jerusalem's east wall.

Crossing it meant David was now fully outside his own city.

Centuries later, Jesus crosses this same brook on His way to Gethsemane.

One king crosses toward exile, another crosses toward the cross.

🌊 Kidron ran just outside Jerusalem's wall

🚶 Crossing it meant leaving the city fully

🔁 Jesus later crosses this same brook

📖 Two kings, two very different crossings

# SecondSamuel 15:24-29
# 📦 The Ark Sent Back To The City
---
## 🙏 Zadok Also, And All The Levites Were With Him, Bearing The Ark

Zadok was one of David's two chief priests.

Carrying the ark was a duty reserved only for the Levites.

Bringing the ark into this crisis suggested God's presence was leaving with David.

That instinct, though understandable, is about to be corrected.

🙏 Zadok was one of David's chief priests

👥 Only Levites were allowed to carry the ark

📦 Its presence suggested God leaving with David

➡️ David is about to correct that instinct

## 📦 Carry Back The Ark Of God Into The City

David refuses to treat the ark like a lucky charm.

Israel tried that once generations earlier and lost the ark to the Philistines.

David sends it back to where it actually belongs.

God's presence was never something David could control by keeping a box nearby.

📦 David refuses to make the ark a charm

⚠️ Israel tried this before and lost the ark

🏠 David sends it back where it belongs

📖 God's presence cannot be controlled this way

## 🙏 If I Shall Find Favour In The Eyes Of The LORD

David does not assume God automatically owes him the throne back.

He states his hope honestly, without demanding a guaranteed outcome.

This kind of open ended trust fills many of David's own psalms.

Real faith here looks like surrender, not certainty.

🙏 David does not assume automatic victory

❓ He states hope without a guarantee

📖 This trust echoes David's own psalms

➡️ Real faith looks like surrender here

## 🏕️ He Will Bring Me Again, And Shew Me Both It, And His Habitation

"Habitation" here means the tabernacle, the tent where God's presence dwelled.

David is not only hoping to reclaim a throne.

He is hoping to worship at that tent again someday.

His deepest hope in this crisis is spiritual, not just political.

🏕️ Habitation means the tabernacle tent

👑 David hopes for more than the throne

🙏 He longs to worship there again

📖 His deepest hope here is spiritual

## 😔 If He Thus Say, I Have No Delight In Thee

David considers the real possibility that God is finished with him.

Much of this crisis traces back to his own sin with Bathsheba and Uriah.

He does not argue that he deserves better treatment.

He accepts that a hard judgment from God would still be fair.

😔 David considers losing everything

⚖️ This crisis traces back to his own sin

🙅 He does not claim he deserves better

📖 He accepts a hard judgment as fair

## 🙌 Behold, Here Am I, Let Him Do To Me As Seemeth Good Unto Him

This phrase places David completely at God's disposal.

He is not bargaining or making excuses anymore.

Whatever God decides, David says he will accept it.

This is the same surrender David wrote about in many of his psalms.

🙌 David places himself at God's disposal

🚫 No bargaining or excuses here

✅ He accepts whatever God decides

📖 This matches the surrender in his psalms

## 👁️ Art Not Thou A Seer?

A seer was someone trusted to notice and report what was happening.

David is not questioning Zadok's calling.

He is assigning him a practical job inside the city he is leaving.

The ark returns to Jerusalem, and so does David's own intelligence network.

👁️ A seer noticed and reported events

🏙️ Zadok gets a job inside the city

🕵️ He becomes part of David's intelligence

➡️ The ark's return doubles as a strategy

## 👦 Your Two Sons With You, Ahimaaz Thy Son, And Jonathan The Son Of Abiathar

David names both priests' sons directly by name here.

Ahimaaz and Jonathan will carry secret messages between Jerusalem and David.

This detail sets up a dangerous courier system used later in the story.

A plan is already forming before David even leaves the area.

👦 Ahimaaz and Jonathan are named directly

📨 They will carry secret messages later

🕵️ This sets up a courier system

➡️ A plan forms before David even leaves

## 🗺️ I Will Tarry In The Plain Of The Wilderness

David is not simply running without a plan.

He picks a specific waiting point where messages can safely reach him.

This shows real strategy forming in the middle of a personal tragedy.

Grief and careful planning are happening in David at the same time.

🗺️ David picks a specific waiting point

📨 Messages can reach him there safely

🧠 Real strategy is forming already

📖 Grief and planning happen together here

## 🙏 Zadok Therefore And Abiathar Carried The Ark Of God Again To Jerusalem

Zadok and Abiathar obey David's instruction without argument.

The ark goes back to where it belongs instead of into a war zone.

Their obedience quietly models the same trust David just spoke about.

Not every act of loyalty in this chapter is loud or dramatic.

🙏 The priests obey without argument

📦 The ark returns to where it belongs

🤝 Their obedience models quiet trust

➡️ Loyalty here does not need to be loud

# SecondSamuel 15:30-33
# 😢 David Weeps Up Mount Olivet
---
## 🏔️ Went Up By The Ascent Of Mount Olivet

The Mount of Olives sat just east of Jerusalem, past the Kidron valley.

This climb was steep and physically hard, not a gentle walk.

Centuries later, Jesus weeps over Jerusalem from this exact hillside.

A king in grief and a King in grief both climb the same slope.

🏔️ Olivet sat just east of Jerusalem

🚶 The climb itself was steep and hard

🔁 Jesus later weeps from this same hill

📖 Two kings grieve on the same slope

## 😢 Wept As He Went Up, And Had His Head Covered, And He Went Barefoot

Covering the head and walking barefoot were recognized signs of mourning.

A king normally traveled in sandals with his head uncovered in public.

David chooses this humiliation instead of hiding his grief.

This is the opposite of Absalom's proud procession back in verse one.

😢 Covered head and bare feet signaled mourning

👑 Kings normally traveled with dignity

💔 David chooses visible humiliation instead

➡️ This contrasts Absalom's proud procession

## 😭 All The People That Was With Him Covered Every Man His Head

David's grief does not stay private.

The whole crowd following him mourns in exactly the same visible way.

A king's sorrow becomes a shared, national sorrow.

Everyone climbing this hill understands what has just been lost.

😭 The crowd mourns the same visible way

👥 A king's grief becomes shared grief

🏔️ Everyone climbs the hill together

📖 The whole nation feels this loss

## 😨 Ahithophel Is Among The Conspirators With Absalom

This confirms David's worst fear from the news out of Hebron.

Ahithophel was not a minor official.

He was the advisor David trusted more than almost anyone else.

This betrayal cuts deeper than any battlefield loss could.

😨 This confirms David's worst fear

🧠 Ahithophel was David's top advisor

💔 The betrayal is deeply personal

📖 Some wounds cut deeper than battle

## 🙏 O LORD, I Pray Thee, Turn The Counsel Of Ahithophel Into Foolishness

David does not have an army large enough to counter Ahithophel's mind right now.

Instead of panicking, he prays a specific, targeted request.

This exact prayer gets answered later in this same story.

Faith becomes David's first weapon in this fight, before any sword is drawn.

🙏 David prays instead of only planning

🎯 The prayer is specific and targeted

✅ This prayer is answered later in the story

📖 Faith becomes his first weapon here

## 🙏 The Top Of The Mount, Where He Worshipped God

David reaches the top of the hill and stops to worship.

This happens in the middle of the worst crisis of his reign.

He does not wait for the danger to pass first.

Worship here is how David faces the crisis, not a break from it.

🙏 David stops to worship at the top

⚠️ This happens mid crisis, not after

⏳ He does not wait for safety first

➡️ Worship becomes how David faces danger

## 🗺️ Hushai The Archite Came To Meet Him, With His Coat Rent, And Earth Upon His Head

An Archite was someone from Archi, a small region near Ephraim's border.

A torn coat and dirt on the head matched David's own mourning signs.

Hushai arrives already grieving before he even speaks a word.

His loyalty to David appears genuine before any assignment is given.

🗺️ An Archite came from a small border region

😢 Torn clothes and dirt signaled mourning

💔 Hushai grieves before speaking at all

➡️ His loyalty appears genuine from the start

## 🚫 If Thou Passest On With Me, Then Thou Shalt Be A Burden Unto Me

David is not rejecting Hushai's loyalty here.

He is being honest with an old friend.

Traveling together would only slow things down.

"Burden" here means extra weight to carry, not an insult.

David already has a better use for Hushai's loyalty.

🚫 David is not rejecting Hushai's loyalty

🐌 Traveling together would slow them down

⚖️ Burden here means extra weight, not insult

➡️ David already has a better plan for him

# SecondSamuel 15:34-37
# 🕵️ Hushai Sent Back To Spy For David
---
## 🎭 Return To The City, And Say Unto Absalom, I Will Be Thy Servant

David asks Hushai to do something that looks like betrayal from the outside.

Hushai will walk into Absalom's camp and offer loyalty he does not feel.

This is a deliberate deception aimed at protecting David.

Not every act of loyalty in this chapter looks loyal on the surface.

🎭 Hushai will appear to defect

🚶 He walks straight into Absalom's camp

🎯 The deception aims to protect David

➡️ Loyalty does not always look loyal

## 📜 As I Have Been Thy Father's Servant Hitherto, So Will I Now Also Be Thy Servant

Hushai's cover story only works because it is partly true.

He really has served David faithfully for a long time.

That real history is what will make Absalom believe the lie.

The most convincing cover stories are built on real facts.

📜 Hushai's history with David is real

🎭 That real history makes the lie believable

🧠 Absalom is meant to trust the story

➡️ Convincing lies are built on real facts

## 🎯 Defeat The Counsel Of Ahithophel

This line states David's exact goal in plain words.

He just prayed for this same outcome only a few verses earlier.

Now he builds an actual plan to help answer his own prayer.

Prayer and strategy work together here instead of replacing each other.

🎯 David states his exact goal plainly

🙏 This matches his prayer from verse thirty one

🧠 He builds a real plan alongside prayer

📖 Faith and strategy work together here

## 🙏 Hast Thou Not There With Thee Zadok And Abiathar The Priests?

This question is not really a question.

David reminds Hushai that a support network already waits inside the city.

Zadok and Abiathar returned to Jerusalem only a few verses earlier for this reason.

Every piece of David's plan is now falling into place at once.

🙏 Zadok and Abiathar already wait in the city

🧩 This connects to earlier verses in the chapter

📡 A support network is already in place

➡️ David's whole plan comes together here

## 🏰 What Thing Soever Thou Shalt Hear Out Of The King's House

"The king's house" now refers to Absalom's court, not David's own.

Hushai's job is to listen closely to whatever gets decided there.

Nothing he overhears is meant to stay secret from David for long.

An enemy's own palace becomes the source of David's best information.

🏰 King's house now means Absalom's court

👂 Hushai's job is to listen closely

📡 Nothing overheard stays secret for long

➡️ David spies from inside his enemy's palace

## 🔗 By Them Ye Shall Send Unto Me Every Thing That Ye Can Hear

The full chain of this plan is now complete.

Hushai hears it, the priests receive it, and their sons carry it to David.

Four different people each play one small, essential part.

A working spy network now stands between David and total defeat.

🔗 The full information chain is now set

👥 Four people each play one small part

🕵️ This becomes a real spy network

📖 Careful planning stands against defeat

## 📜 So Hushai David's Friend Came Into The City

"Friend" here was an actual title, an official position at the royal court.

It was not simply a casual description of a close relationship.

That official standing is exactly what makes Hushai's cover story work.

Absalom has real reason to think a trusted official switched sides.

📜 Friend was an official court title

👑 It was a real royal position

🎭 That standing makes the cover story work

➡️ Absalom has real reason to trust him

## 🏙️ Absalom Came Into Jerusalem

The chapter ends with Absalom walking into the very city David just fled.

Everything Absalom worked toward since verse one has now happened.

David is gone, and his own son now occupies the capital.

The rebellion has succeeded so far, and the next chapter shows what comes next.

🏙️ Absalom now occupies Jerusalem

✅ His plan from verse one has succeeded

😔 David's own son holds the capital

📖 The rebellion sets up the next chapter
`.trim();

export const SECOND_SAMUEL_FIFTEEN_PERSONAL_SECTIONS = parseSecondSamuelFifteenRawNotes(SECOND_SAMUEL_FIFTEEN_RAW_NOTES);
