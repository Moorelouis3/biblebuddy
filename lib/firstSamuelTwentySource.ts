export type FirstSamuelTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyRawNotes(rawText: string): FirstSamuelTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 20:${startVerse}` : `1 Samuel 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 1 Samuel 20 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_RAW_NOTES = `# FirstSamuel 20:1-4
# 🏃 David Asks What He Has Done
---
## ❓ What Have I Done? What Is Mine Iniquity?

David is not confessing to a crime here.

He is demanding proof of one that does not exist.

Chapter nineteen already showed Saul trying to kill him with no real cause given.

David comes straight to Jonathan instead of running further away.

He wants answers before he decides what to do next.

❓ David demands proof, not forgiveness

📜 Chapter nineteen showed no real cause

🏃 He comes to Jonathan first

📖 Answers matter before another decision

## 🙅 God Forbid: Thou Shalt Not Die

Jonathan reacts with total confidence that David is safe.

He believes his father tells him everything, either great or small.

That confidence turns out to be Jonathan's blind spot.

Saul has already stopped trusting his own son with the truth.

🙅 Jonathan denies any real danger

👂 He believes Saul hides nothing from him

😳 That trust is about to be tested

📖 Jonathan does not yet see the danger

## 🤐 Let Not Jonathan Know This, Lest He Be Grieved

David explains exactly why Jonathan has been kept in the dark.

Saul knows how much Jonathan loves David.

Telling Jonathan the plan would only cause his own son grief.

David reads his king's mind more clearly than the king's own son does.

🤐 Saul hides the plan on purpose

💗 He knows Jonathan loves David deeply

😔 Telling him would only cause pain

📖 David reads Saul better than Jonathan does

## 🪜 There Is But A Step Between Me And Death

This is an old idiom meaning David is one small step from being killed.

David swears this using a formal oath before Jonathan.

He is not exaggerating for sympathy.

Chapter nineteen already showed a javelin thrown at him personally.

🪜 The idiom means death is one step away

🤝 David swears this as a formal oath

🗡️ Chapter nineteen already proved the danger

📖 David is stating fact, not fear

## 🤝 Whatsoever Thy Soul Desireth, I Will Even Do It For Thee

Jonathan makes an open ended promise before he even knows the plan.

This kind of loyalty already appeared back in chapter eighteen.

Jonathan gave David his own robe and weapons there.

This chapter is about to test how far that loyalty can actually go.

🤝 Jonathan promises before hearing the plan

📜 Chapter eighteen already showed this loyalty

⚖️ That loyalty is about to be tested

📖 A blind promise is a real risk

# FirstSamuel 20:5-8
# 🌙 The New Moon Feast Plan
---
## 🌙 Tomorrow Is The New Moon

The new moon marked the start of each month on Israel's calendar.

It was celebrated with a required feast at the king's table.

David's seat there was expected, not optional.

His absence would be noticed immediately by everyone present.

🌙 New moon began each Israelite month

🍽️ A feast at the king's table was expected

👀 David's absence would stand out fast

📖 This sets up the test to come

## 🕶️ Hide Myself In The Field Unto The Third Day At Even

David proposes a three day test instead of guessing at Saul's intentions.

He will stay hidden the whole time.

Jonathan will watch his father's reaction at two feasts in a row.

A real plan replaces fear and speculation.

🕶️ David hides for three full days

👀 Jonathan watches two feasts

📋 A plan replaces guesswork

➡️ Real evidence will settle the question

## 🏠 There Is A Yearly Sacrifice There For All The Family

Family clans in Israel held a yearly sacrifice together in their hometown.

Bethlehem was David's family town, and Jesse was David's father.

This cover story is completely believable on its own.

A king missing a family religious duty would raise no suspicion normally.

🏠 Bethlehem was David's family hometown

🐑 A yearly sacrifice was a normal family duty

✅ The excuse is believable on its own

📖 A good lie hides inside a true custom

## 🔥 If He Be Very Wroth, Then Be Sure That Evil Is Determined

Wroth means burning, furious anger, not simple annoyance.

David is not just asking Jonathan to notice Saul's mood.

He is asking Jonathan to treat that mood as real evidence.

A king's temper becomes the test result David needs.

🔥 Wroth means burning anger, not mild upset

🧪 Saul's reaction becomes the actual test

📊 Mood here counts as real evidence

➡️ One feast will answer David's question

## 📜 Thou Hast Brought Thy Servant Into A Covenant Of The LORD

David reminds Jonathan of a formal promise already made between them.

Chapter eighteen already described this covenant in detail.

David is not asking for a new favor here.

He is asking Jonathan to honor a promise already sworn.

📜 Chapter eighteen already sealed this covenant

🤝 David calls in an existing promise

🚫 This is not a brand new request

📖 A covenant carries lasting obligation

## ⚖️ If There Be In Me Iniquity, Slay Me Thyself

David offers Jonathan an extreme, almost startling deal.

If David is truly guilty, he wants Jonathan to be the one who kills him.

He would rather die by a friend's hand than by his father's ambush.

That offer proves David believes his own innocence completely.

⚖️ David offers his own life as proof

🗡️ He would rather Jonathan strike than Saul

😤 This shows total confidence in his innocence

📖 Real trust can survive an extreme offer

# FirstSamuel 20:9-11
# 🌾 Into The Field
---
## 🙅 Far Be It From Thee

This is a strong old way of rejecting an idea completely.

Jonathan insists he would never let David walk into danger unwarned.

He restates his loyalty even after already promising it in verse four.

Words alone are not yet proof to David.

🙅 Far be it means a strong flat refusal

🤝 Jonathan repeats his loyalty again

🗣️ Words are not proof yet

➡️ A real plan is still needed

## ❓ Who Shall Tell Me?

David raises the real logistical problem with the plan so far.

Jonathan cannot exactly walk up and shout the verdict across the field.

Someone needs a safe way to deliver dangerous news.

This question forces the two men to design an actual signal.

❓ David spots a real logistical gap

🤫 Bad news cannot be shouted openly

📡 A safe signal method is needed

➡️ This question creates the arrow plan

## 😠 What If Thy Father Answer Thee

David worries Saul might turn his temper on Jonathan for even asking.

That word for a harsh reply is the same anger already seen in earlier chapters.

This shows David cares about Jonathan's safety too, not just his own.

The danger in this chapter threatens both men, not just David.

😠 David fears a harsh reply for Jonathan

🛡️ David worries for Jonathan too

⚠️ The danger touches both men

📖 Loyalty runs in both directions here

## 🌾 Come, And Let Us Go Out Into The Field

The field was already established back in chapter nineteen as a safe place to talk.

Saul's court had ears everywhere, much like Laban's house did in Genesis.

Moving outdoors keeps this conversation away from servants and spies.

Every safe conversation in this story happens away from the palace walls.

🌾 The field means privacy from the court

📜 Chapter nineteen used the same setting

🕵️ Palace walls were never fully safe

📖 True plans happen away from prying ears

# FirstSamuel 20:12-17
# 🤝 A Covenant Sworn Again
---
## 🙏 O LORD God Of Israel

Jonathan opens a formal oath by calling on God directly.

This is not a casual promise between friends.

An oath like this made the LORD Himself a witness to the deal.

Breaking it would mean sinning against God, not just against David.

🙏 Jonathan calls on God as witness

📜 This is a formal, binding oath

⚖️ Breaking it would be a sin

📖 God stands over this whole promise

## ⚡ The LORD Do So And Much More To Jonathan

This is a set formula ancient Israelites used to invite punishment on themselves for breaking a promise.

Jonathan is asking God to punish him personally if he fails David.

That is an extreme risk for Jonathan to accept willingly.

Few promises in the Old Testament are sealed this seriously.

⚡ This formula invites self punishment

🎯 Jonathan risks it on himself

🤝 It seals the promise completely

📖 Few oaths go this far

## 🚶 That Thou Mayest Go In Peace

Jonathan already speaks as if David's exile is settled, not just possible.

Go in peace is the language of a real goodbye, not a hopeful maybe.

Jonathan seems to sense deep down that David will not be staying.

The oath is protecting a friendship that is about to be tested by distance.

🚶 Jonathan speaks as if parting is certain

👋 Go in peace sounds like a real goodbye

😔 He seems to sense what is coming

📖 The oath prepares for real distance

## 💗 The Kindness Of The LORD

This phrase describes covenant loyalty, a steady faithfulness that outlasts circumstances.

It is the same kind of loyalty God shows His people again and again.

Jonathan asks David to treat him with that same unshakable faithfulness.

Friendship here is measured by God's own standard of love.

💗 Kindness here means covenant loyalty

🕊️ It mirrors how God loves His people

🤝 Jonathan asks for that same standard

📖 Their friendship is measured by God's love

## 👪 Thou Shalt Not Cut Off Thy Kindness From My House For Ever

Jonathan is not only asking for loyalty to himself.

He extends the request to his entire family, for all future generations.

This exact promise is fulfilled years later when David protects Jonathan's son Mephibosheth.

A promise made in a field here reaches decades into the future.

👪 Jonathan includes his whole family

⏳ The request reaches far into the future

👦 David later keeps it for Jonathan's son

📖 One promise here shapes years ahead

## 👑 When The LORD Hath Cut Off The Enemies Of David

Jonathan speaks openly about David defeating his enemies one day.

That includes Saul's own royal family losing the throne.

Jonathan already accepts that David, not himself, will become king.

He asks for mercy in advance instead of resenting that future.

👑 Jonathan accepts David will reign

😔 That means his own family loses the throne

🤲 He asks for mercy instead of resentment

📖 Jonathan chooses friendship over ambition

## 🏠 Jonathan Made A Covenant With The House Of David

This covenant is not only between two individual friends.

It formally binds Jonathan's whole family to David's whole family.

The house of David here means every descendant David will ever have.

This single agreement outlives both men who signed it.

🏠 The covenant binds two whole families

👪 David's future descendants are included

📜 It outlives both men involved

📖 A private friendship becomes a lasting bond

## 💗 He Loved Him As He Loved His Own Soul

This phrase measures Jonathan's love for David against his love for his own life.

It is the strongest possible comparison available in this language.

Jonathan causes David to swear the oath again here, to make sure it is fully sealed.

A friendship this deep is rare anywhere in scripture.

💗 The comparison is the strongest possible

🤝 Jonathan has David swear again

📜 The oath is now fully sealed

📖 Few friendships in scripture run this deep

# FirstSamuel 20:18-23
# 🏹 The Arrow Signal Explained
---
## 🪑 Thy Seat Will Be Empty

Jonathan repeats the plan already laid out back in verse five.

An empty seat at a royal feast could not go unnoticed.

Restating the plan here shows how seriously Jonathan is taking it.

Every detail is being confirmed before the actual danger begins.

🪑 The empty seat repeats the earlier plan

👀 A king's feast made absence obvious

🔁 Jonathan confirms every detail again

📖 Careful planning matches real danger

## 🪨 The Stone Ezel

Ezel was a specific landmark stone near the field where David had been hiding.

Its exact location is not known today, but it clearly marked a spot both men already knew.

Using a fixed landmark meant no confusion about where to meet.

Small, careful details like this run through this whole plan.

🪨 Ezel was a known landmark stone

📍 Its exact site is unknown today

🎯 A fixed spot prevented confusion

📖 Careful details protect careful plans

## 📆 When Thou Hast Stayed Three Days

David must wait a full three days hidden before the signal even happens.

This matches the timeline he requested himself back in verse five.

Patience here is not optional, it is part of the actual plan.

Every hour of that wait carries real risk of discovery.

📆 Three days matches David's own request

⏳ Patience was part of the actual plan

⚠️ Every hour risked discovery

📖 A good plan still demands real patience

## 🎯 As Though I Shot At A Mark

Archery practice against a target was an everyday activity for a young nobleman.

Nobody watching would think twice about Jonathan shooting arrows near the wall.

The most effective disguise is something completely ordinary.

This plan hides real danger behind a boring afternoon.

🎯 Target practice was a normal activity

😐 Nobody would suspect anything unusual

🎭 Ordinary cover works best

📖 Real danger hides behind boring routine

## ✅ The Arrows Are On This Side Of Thee

This phrase is the code word for safety.

If the arrows land short of the lad, it means Saul's anger has passed.

David can come out of hiding and return in peace.

One simple phrase carries an entire verdict.

✅ Arrows short means real danger has passed

🕊️ David can safely return

🗣️ One phrase carries the whole verdict

📖 Simplicity kept the signal safe

## 🚨 The Arrows Are Beyond Thee

This phrase is the opposite code word, for danger.

If the arrows land past the lad, David must run and never return to Saul's court.

The LORD hath sent thee away reframes David's exile as God's own doing, not just Saul's cruelty.

Even in danger, Jonathan points David back to God's control over the outcome.

🚨 Arrows beyond means real danger

🏃 David must flee immediately

🙏 God sent thee away, not just Saul

📖 God stays in control even in exile

## 🔁 The LORD Be Between Thee And Me For Ever

This line echoes the same kind of blessing Laban once spoke over Jacob at Mizpah.

Jonathan is not just planning an escape route.

He is asking God to watch over this friendship permanently, no matter how far apart it takes them.

A field meant for secrecy becomes the site of a lasting promise.

🔁 This echoes Laban's blessing over Jacob

🙏 Jonathan asks God to watch forever

📏 Distance will not end the friendship

📖 A hiding place becomes a sacred moment

# FirstSamuel 20:24-27
# 🍽️ The Empty Seat
---
## 🕶️ David Hid Himself In The Field

The plan agreed on in the earlier verses is now actually happening.

David is exactly where he said he would be.

Every careful detail discussed with Jonathan is being tested for real now.

Words have turned into action.

🕶️ David follows the plan exactly

🎯 Every detail is now being tested

🏃 Words have become real action

📖 A plan matters once it is lived out

## 🧱 As At Other Times, Even Upon A Seat By The Wall

Saul's seat by the wall becomes an important detail later in the chapter.

A javelin thrown from that seat has a clear path across the room.

This small detail sets up the violence that happens just a few verses later.

Nothing in this account is placed by accident.

🧱 Saul sat by the wall, as usual

🗡️ That seat gives a clear throwing path

⚠️ It sets up the coming violence

📖 Small details often set up bigger ones

## ⚔️ Abner Sat By Saul's Side

Abner was Saul's cousin and the commander of his army.

His seat next to the king shows his high rank at court.

Abner reappears again and again throughout the books of Samuel.

This is the reader's first glimpse of a man who becomes very important later.

⚔️ Abner commanded Saul's army

👑 His seat showed his high rank

🔁 He reappears often in later chapters

📖 A major figure enters the story quietly

## 🚫 Something Hath Befallen Him, He Is Not Clean

Not clean refers to ceremonial uncleanness under Israel's law.

Certain situations, like touching a dead body, made a person unfit to eat a sacred meal for a short time.

Saul assumes this ordinary, harmless explanation for David's absence.

His guard is completely down on the very first day.

🚫 Not clean meant ceremonially unfit

📜 Israel's law defined these situations

😌 Saul assumes an innocent reason

📖 His guard is fully down at first

## 👎 Wherefore Cometh Not The Son Of Jesse

Saul refuses to say David's name here.

Calling him the son of Jesse strips away his identity and his friendship with the family.

By the second missed meal, Saul's patience for excuses has already run out.

The plan is now entering its real test.

🚫 Saul avoids saying David's name

👎 Son of Jesse is a deliberate insult

⏳ Patience is already running out

📖 The real test begins now

# FirstSamuel 20:28-31
# 😡 Saul's Rage Against His Son
---
## 🗣️ David Earnestly Asked Leave Of Me

Jonathan repeats the exact cover story agreed on earlier in the chapter.

He speaks it calmly, as if nothing is wrong.

This is the riskiest moment of the whole plan so far.

One wrong word here could expose everything.

🗣️ Jonathan delivers the rehearsed story

😌 He keeps his voice calm

⚠️ One slip could ruin the plan

📖 The excuse is finally put to the test

## 👨‍👩‍👧 Our Family Hath A Sacrifice In The City

Jonathan adds a small detail not in the original plan, that David's brother summoned him.

Small, specific details make a lie sound more believable.

This kind of improvisation shows real loyalty under pressure.

Jonathan is protecting David with his own words, not just his silence.

👨‍👩‍👧 A brother's summons adds believability

🎭 Specific details make excuses convincing

🛡️ Jonathan improvises under pressure

📖 Loyalty here is active, not silent

## 😡 Thou Son Of The Perverse Rebellious Woman

Saul insults Jonathan's own mother instead of arguing the actual facts.

Attacking a person's mother was one of the harshest insults available in this culture.

This shows Saul has lost control of the conversation entirely.

Rage has replaced any real argument.

😡 Saul insults Jonathan's own mother

🩸 This was one of the harshest insults available

🔥 It shows Saul has lost control

📖 Rage has replaced real argument

## 🩸 To Thine Own Confusion, And Unto The Confusion Of Thy Mother's Nakedness

This is an old, blunt way of saying Jonathan shames his whole family.

It reaches back to the moment of his own birth.

Saul is claiming Jonathan's loyalty to David will destroy the family's honor completely.

The insult reaches backward into Jonathan's entire existence.

Nothing about this outburst is measured or fair.

🩸 The phrase attacks Jonathan's entire family

👎 It blames his birth itself

🔥 The insult reaches backward, not just forward

📖 Nothing about this is fair or measured

## 👑 For As Long As The Son Of Jesse Liveth Upon The Ground

Saul finally says outright what chapter nineteen only showed through actions.

He believes David is a direct threat to Jonathan's own future throne.

Saul is not only protecting himself here.

He genuinely believes he is protecting his son's inheritance, even while trying to kill an innocent man.

👑 Saul names the threat outright

🪑 He fears for Jonathan's future throne

😔 He believes he is protecting his son

📖 Fear can justify terrible choices

## ⚰️ He Shall Surely Die

This is a direct, final order, not another threat or outburst.

Saul commands that David be brought to him personally for execution.

There is no ambiguity left in what Saul intends.

The test David asked for in verse one has now been answered completely.

⚰️ This is a direct execution order

👑 Saul commands it be done personally

❌ No ambiguity remains

📖 David's opening question is now answered

# FirstSamuel 20:32-34
# 🗡️ The Javelin Aimed At Jonathan
---
## ❓ Wherefore Shall He Be Slain? What Hath He Done?

Jonathan asks the exact same kind of question David asked back in verse one.

He demands a real reason instead of accepting his father's rage as proof.

This is the boldest moment of loyalty in the whole chapter.

Jonathan risks his own safety to defend an absent friend.

❓ Jonathan echoes David's own question

⚖️ He demands real evidence, not rage

🦁 This is his boldest moment of loyalty

📖 He risks himself to defend a friend

## 🗡️ Saul Cast A Javelin At Him To Smite Him

Saul throws the same kind of weapon at his own son.

He already threw it at David twice in earlier chapters.

This is not a wild swing, but a real attempt to kill Jonathan.

The line between Saul's enemies and his own family has completely disappeared.

Rage now controls Saul more than any relationship does.

🗡️ Saul reuses the same weapon as before

🎯 This was a real attempt to kill

👨‍👦 Even his own son is no longer safe

📖 Rage now outweighs every relationship

## 🎯 Whereby Jonathan Knew That It Was Determined

Jonathan no longer needs the arrow signal to know the truth.

His father's own weapon just answered every remaining doubt.

What began as a careful plan has become undeniable, violent proof.

The rest of the signal is now just a formality to protect David physically.

🎯 The javelin removes all doubt

🗡️ Proof came by weapon, not words

📜 The arrow signal is now just formality

📖 Violence confirmed what words could not

## 😢 He Arose From The Table In Fierce Anger

Jonathan leaves the royal table without permission, a serious breach of court manners.

He refuses to eat for the rest of that day.

His anger and grief are described together, not as separate feelings.

Losing a friend and losing trust in his own father happen in the same moment.

🚶 Jonathan leaves the table without permission

🚫 He refuses to eat all day

😢 Anger and grief arrive together

📖 One moment breaks two relationships

# FirstSamuel 20:35-40
# 🎯 The Arrows Fly
---
## 🕰️ Jonathan Went Out Into The Field At The Time Appointed

Everything happens exactly on the timeline set back in verse nineteen.

David is already hidden nearby, watching and waiting.

A small servant boy comes along, with no idea what is really happening.

The whole plan now depends on this one ordinary looking morning.

🕰️ Everything happens right on schedule

🕶️ David waits hidden nearby

👦 The lad has no idea why

📖 An ordinary morning hides real danger

## 🏃 Run, Find Out Now The Arrows Which I Shoot

Jonathan gives the lad a simple, ordinary task, nothing about it sounds strange.

The command sends him running ahead, away from where Jonathan and David can speak freely later.

Every instruction serves two purposes at once, the visible one and the hidden one.

The lad becomes an unwitting part of a plan he will never understand.

🏃 The lad gets one simple task

🚶 It sends him running ahead

🎭 Every order serves two purposes

📖 He never understands his role

## 🏹 He Shot An Arrow Beyond Him

Jonathan shoots the arrow past the lad on purpose.

This is the coded signal for danger agreed on earlier in the chapter.

David is watching from hiding and understands the verdict instantly.

The arrow itself becomes the answer to the question David first asked in verse one.

🏹 The arrow lands past the lad on purpose

🚨 This is the coded danger signal

🕶️ David understands it from hiding

📖 One arrow answers the chapter's opening question

## 🗣️ Is Not The Arrow Beyond Thee?

Jonathan repeats the word beyond out loud on purpose.

He wants David to hear the exact coded word clearly from a distance.

The lad still has no idea these words carry a hidden message.

Every word here is chosen carefully for someone who is not supposed to be listening.

🗣️ Jonathan repeats the key word aloud

👂 He wants David to hear it clearly

👦 The lad hears it without understanding

📖 Hidden messages hide inside plain words

## ⚡ Make Speed, Haste, Stay Not

On the surface, Jonathan is only rushing his servant to fetch the arrows.

Underneath, every word he shouts is also urgent advice for David.

David needs to move quickly and stay away, not just the lad.

Jonathan warns his friend in code while appearing to talk to a child.

🏃 The words seem aimed at the lad only

🕶️ They are really urgent advice for David

⚡ Both messages are stacked in one shout

📖 Urgency hides inside ordinary orders

## 🙈 The Lad Knew Not Any Thing

The servant boy carries the arrows home with no idea what just happened.

Keeping him in the dark protects him from any danger or blame later.

Only Jonathan and David understand the real meaning of that morning.

A secret shared by exactly two people is far safer than one shared by three.

🙈 The lad understands nothing real

🛡️ His ignorance keeps him safe

🤫 Only two people know the truth

📖 A smaller secret is a safer secret

## 🏹 Jonathan Gave His Artillery Unto His Lad

Artillery here is an old word for weapons and gear, specifically the bow and arrows.

Sending the lad away with the equipment clears the field for what happens next.

Jonathan is deliberately removing the last witness before he speaks to David directly.

Every detail continues to protect the secret until the very end.

🏹 Artillery means the bow and arrows here

👦 The lad is sent away with the gear

🚪 This clears the field of witnesses

📖 Every detail still protects the secret

# FirstSamuel 20:41-42
# 😢 Farewell In The Field
---
## 🧭 David Arose Out Of A Place Toward The South

This is the first time the text says exactly where David had been hiding.

Toward the south places him near the stone Ezel mentioned back in verse nineteen.

A small geographic detail confirms the whole careful plan actually worked.

Nothing about David's hiding place is left vague at the end.

🧭 South marks David's exact hiding spot

🪨 It matches the stone Ezel from earlier

✅ The detail confirms the plan worked

📖 Careful planning is confirmed by careful detail

## 🙇 Bowed Himself Three Times

Bowing to the ground three times was a formal show of deep respect.

David bows to Jonathan even though Jonathan is not yet king.

This gesture honors Jonathan's status as the king's son and as a true friend.

Even in danger, David does not abandon proper honor and respect.

🙇 Three bows showed deep formal respect

👑 Jonathan was still the king's son

🤝 The gesture honored their friendship too

📖 Respect survives even in danger

## 💋 They Kissed One Another, And Wept

A kiss between two men here was a normal greeting or farewell custom in this culture.

It was not a romantic gesture.

Public weeping between men was also fully accepted, not seen as weakness.

Both men know this friendship is about to be tested by real distance.

Grief this open shows exactly how much this covenant actually cost them.

💋 A kiss was a normal farewell custom

😢 Public weeping was fully accepted

📏 Both men know distance is coming

📖 Open grief shows the covenant's real cost

## 💔 Until David Exceeded

This phrase means David wept even harder and longer than Jonathan did.

David is the one losing his home, his position, and his safety all at once.

Jonathan is losing a friend, but David is losing an entire life.

The weight of this goodbye falls heaviest on David.

😢 Exceeded means David wept the hardest

🏠 David loses his home and safety

💔 Jonathan loses a friend, David loses more

📖 The heavier loss falls on David

## 🕊️ Go In Peace

Jonathan sends David away with a blessing, not a warning.

Both men repeat the same oath already sworn earlier in the chapter, sworn in the name of the LORD.

This friendship survives on that oath alone from this point forward.

Two men who grew up in the same palace will now live entirely separate lives.

🕊️ Jonathan blesses David's departure

🤝 Both repeat their earlier oath

📜 The oath alone carries the friendship forward

📖 Two lives now split apart

## 🏙️ Jonathan Went Into The City

Jonathan returns to Saul's court and to his father's house.

David walks away from everything familiar with nothing but a promise.

This is the last time these two men are shown together for years.

Chapter twenty one opens with David already alone and on the run.

🏙️ Jonathan returns to his father's house

🚶 David walks away with only a promise

⏳ Years pass before they meet again

📖 The next chapter opens with David alone
`.trim();

export const FIRST_SAMUEL_TWENTY_PERSONAL_SECTIONS = parseFirstSamuelTwentyRawNotes(FIRST_SAMUEL_TWENTY_RAW_NOTES);
