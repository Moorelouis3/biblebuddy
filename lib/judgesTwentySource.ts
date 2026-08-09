export type JudgesTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesTwentyRawNotes(rawText: string): JudgesTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 20:${startVerse}` : `Judges 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Judges 20 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_TWENTY_RAW_NOTES = `# Judges 20:1-7
# 😧 Israel Gathers To Hear The Crime
---
## 🗺️ From Dan Even To Beersheba

"From Dan even to Beersheba" means the entire nation, from north to south.

Dan sat at the farthest northern edge of Israel.

Beersheba sat at the farthest southern edge.

Saying it this way included absolutely everyone.

No tribe could later claim they never heard the news.

🗺️ Dan marks the northern edge

🏜️ Beersheba marks the southern edge

🤝 The phrase means the whole nation

📖 No tribe could claim ignorance

---
## 🤝 Gathered Together As One Man

"As one man" means the entire nation acted with a single will.

Every tribe showed up together for this assembly.

That kind of complete unity was rare in the book of Judges.

The rest of this chapter slowly breaks that unity apart.

🤝 As one man means total unity

🏕️ Every tribe gathered together

📜 Unity like this was rare in Judges

➡️ That unity is about to crack

---
## ⚔️ Four Hundred Thousand Footmen That Drew Sword

Four hundred thousand is a staggering number for this time period.

"Footmen that drew sword" means foot soldiers armed and ready to fight.

This was not a small dispute between two families.

The entire nation had mobilized over one crime.

🔢 Four hundred thousand is a huge number

⚔️ Footmen that drew sword means soldiers

🇮🇱 The whole nation had mobilized

📖 One crime moved an entire army

---
## ❓ Tell Us, How Was This Wickedness

The assembly demands a full account before acting.

They do not rush straight to violence.

They stop to hear the facts first.

Verse three even notes that Benjamin already knew Israel had gathered.

Benjamin had a chance to respond before any formal accusation was made.

❓ Israel demands the full account

⚖️ They hear the facts first

👂 Benjamin already knew about the gathering

➡️ Benjamin had a chance to respond early

---
## 👰 The Levite, The Husband Of The Woman That Was Slain

The text calls the concubine's partner her husband here.

A concubine held a real place in the household, even without full wife status.

That real status is why the text can call him her husband.

Her death mattered enough to bring the whole nation together.

👰 A concubine held real status

🧍 The text calls him her husband

💔 Her death carried real weight

📖 She mattered enough to unite Israel

---
## 🔪 Cut Her In Pieces, And Sent Her Throughout All The Country

Cutting the body into pieces and sending them out was a shocking way to summon help.

It guaranteed every tribe would notice.

A similar method appears later in the book of Samuel.

Saul cut oxen into pieces to summon Israel to battle that time.

The horror of the image made refusal nearly impossible.

🔪 Cutting her body was a summons

📢 It guaranteed every tribe noticed

🐂 Saul later used a similar method

➡️ The horror made refusal impossible

---
## 🗣️ Give Here Your Advice And Counsel

The Levite finishes by handing the decision to the nation.

He does not call for revenge himself.

He asks Israel to decide what justice requires.

That choice shapes everything that happens next.

🗣️ The Levite ends his account

🤲 He hands the decision to Israel

⚖️ Israel must decide what justice requires

➡️ That choice shapes the whole chapter

# Judges 20:8-11
# ⚔️ Israel Vows To Punish Gibeah
---
## 🏕️ We Will Not Any Of Us Go To His Tent

The people make a collective vow before doing anything else.

Nobody goes home until this is settled.

That kind of oath bound the whole nation to finish what it started.

Backing out later was no longer an option.

🏕️ Nobody goes home yet

🤝 The whole nation is bound

🚫 Backing out is no longer possible

➡️ The vow commits them to action

---
## 🎲 We Will Go Up By Lot Against It

Casting lots was a way of letting God decide an outcome people could not agree on themselves.

It looked like chance, but it was treated as God's own choice.

Israel used this method to decide how the coming campaign would be organized.

🎲 Lots let God decide the outcome

🙏 It looked like chance to people

📜 Israel used it to organize the campaign

📖 God's will was sought even in details

---
## 🍞 Ten Men Of An Hundred

This describes a system for feeding an army of four hundred thousand men.

A set share from every group was assigned to gather supplies.

"Victual" means food and provisions for the army.

Feeding a force this size took real, careful planning.

🍞 Victual means food and provisions

🔢 A share from every group supplied it

📋 Feeding this army took real planning

➡️ Even a war needed logistics first

---
## 🤝 Knit Together As One Man

This phrase repeats the same idea from verse one.

The whole nation still acts as a single body.

That kind of unity will not survive very long in the chapters ahead.

For now, every tribe stands together against Gibeah.

🔁 This repeats the phrase from verse one

🤝 The nation still acts as one

⏳ This unity will not last long

📖 For now, every tribe stands together

# Judges 20:12-17
# 🛡️ Benjamin Chooses War Over Justice
---
## 😈 The Children Of Belial

"Belial" is an old word for someone worthless and wicked.

The men of Gibeah earned this same title back in chapter nineteen.

Israel uses it again here to describe the same guilty men.

Naming them this way leaves no room to see them as innocent.

😈 Belial means worthless and wicked

🔁 The same title appeared in chapter nineteen

👥 It names the guilty men of Gibeah

📖 The naming leaves no room for doubt

---
## 🙅 The Children Of Benjamin Would Not Hearken

Israel asks Benjamin to hand over the guilty men.

Benjamin refuses to listen at all.

Tribal loyalty wins out over justice for the victim.

That single refusal turns a local crime into a civil war.

🙅 Benjamin refuses to listen

👪 Tribal loyalty wins out here

⚖️ Justice for the victim is ignored

➡️ One refusal starts a civil war

---
## ⚔️ To Go Out To Battle Against The Children Of Israel

Benjamin chooses to defend Gibeah instead of surrendering the guilty men.

That choice commits the entire tribe to war.

One city's crime now belongs to the whole tribe.

Innocent Benjamites will suffer for a choice they did not make.

🛡️ Benjamin defends Gibeah instead

⚔️ The whole tribe commits to war

👥 One city's guilt becomes the tribe's guilt

➡️ Innocent people share the coming cost

---
## 🔢 Seven Hundred Chosen Men

Benjamin's whole army numbers twenty six thousand men.

Gibeah alone adds seven hundred more skilled fighters.

That total is tiny next to Israel's four hundred thousand.

The odds look impossible for Benjamin on paper.

🔢 Benjamin fields twenty six thousand men

🏹 Gibeah adds seven hundred more

⚖️ Israel vastly outnumbers them

➡️ The odds look impossible on paper

---
## 🎯 Sling Stones At An Hair Breadth, And Not Miss

"An hair breadth" describes an extremely tiny target, thinner than a hair.

These seven hundred men could hit that target with a sling every single time.

They also fought left handed, an unusual trait for warriors in this culture.

That trait made them harder for enemies to predict.

Judges chapter three already introduced a left handed judge named Ehud.

🎯 A hair breadth means an extremely tiny target

🪨 They never missed with a sling

🤚 Fighting left handed was unusual

📖 Ehud in chapter three was also left handed

---
## 🇮🇱 All These Were Men Of War

Israel's four hundred thousand men are described as experienced fighters, not raw recruits.

On paper, this looks like an overwhelming advantage.

The next verses will show that numbers alone do not decide a battle.

Something more than army size is about to matter here.

🇮🇱 Israel fields experienced fighters

📊 The numbers look overwhelming

⚠️ Numbers alone will not decide this

➡️ Something more than size matters here

# Judges 20:18-21
# 😢 The First Day Ends In Defeat
---
## 🏠 Judah Shall Go Up First

Israel goes to the house of God to ask for direction before fighting.

This is the tabernacle, where the ark of the covenant was kept at the time.

The exact same question and the exact same answer opened the whole book of Judges.

That earlier answer led to victory over Canaan.

This time the same answer leads to defeat.

🏠 The house of God means the tabernacle

🔁 Judges chapter one asked this same question

✅ That time it led to victory

📖 This time the story turns out differently

---
## 🏕️ Encamped Against Gibeah

Israel sets up camp right outside the city.

This kind of encampment signals a serious siege, not a quick raid.

Everyone on both sides knows what is about to happen.

Everything is now in place for open battle.

🏕️ Israel camps outside Gibeah

⚔️ This signals a real siege

📍 Everything is ready for battle

➡️ The fight is about to start

---
## ⚔️ Put Themselves In Array To Fight

"Array" is an old military word for formation.

Both armies line up in organized ranks before the fighting starts.

This was not a chaotic brawl.

It was a planned, formal battle.

⚔️ Array means battle formation

📏 Both armies line up in order

🚫 This was not a chaotic brawl

➡️ It was a planned, formal fight

---
## 💀 Twenty And Two Thousand Men

Despite following God's own instruction to go first, Israel suffers a massive defeat.

Twenty two thousand men die in a single day.

Obedience here did not guarantee an easy win.

Something deeper still needs to be dealt with before victory comes.

💀 Twenty two thousand Israelites die

🤔 Obedience did not guarantee a win

⚠️ Something deeper still needs addressing

➡️ Victory will not come easily here

# Judges 20:22-25
# 😢 The Second Day Ends In Defeat Again
---
## 💪 The People, The Men Of Israel, Encouraged Themselves

Israel does not quit after the first devastating loss.

They rally themselves and prepare to fight again in the same place.

Determination alone does not fix whatever is actually wrong here.

The next verse shows Israel still has not asked the right question.

💪 Israel rallies after a huge loss

📍 They return to the same battle line

⚠️ Determination alone will not fix this

➡️ The real problem is still unaddressed

---
## 😭 Wept Before The LORD Until Even

Israel weeps and asks God for direction again.

Weeping shows real grief over the losses.

Weeping alone is not the same as genuine repentance.

The armies still have not asked why they are losing.

😭 Israel weeps before the Lord

❓ They ask for direction again

⚠️ Weeping alone is not repentance

➡️ The real question stays unasked

---
## 🗣️ Against The Children Of Benjamin My Brother

Israel still calls Benjamin "my brother," even in the middle of this war.

That word choice shows the pain of fighting their own family.

God tells them to go up again, but no promise of victory is attached.

A second defeat is about to follow this exact answer.

🗣️ Benjamin is still called brother

💔 The war hurts because of family ties

🚫 No promise of victory is given

➡️ A second defeat follows this answer

---
## 💀 All These Drew The Sword

Eighteen thousand more Israelites die on the second day.

Two devastating defeats in a row is more than bad luck.

Something in Israel still needs to change before God grants victory.

The next verses finally show Israel changing its approach.

💀 Eighteen thousand more Israelites die

📉 Two defeats in a row is not luck

⚠️ Something in Israel must change first

➡️ The next scene shows real change

# Judges 20:26-28
# 🙏 Israel Weeps, Fasts, And Is Promised Victory
---
## 🙏 Wept, And Sat There Before The LORD, And Fasted

This time Israel adds fasting to the weeping.

Fasting means giving up food for a period of time as an act of humility before God.

Two failed battles finally push the nation toward real repentance instead of only grief.

The difference between this moment and the last two shows in what happens next.

😭 Weeping alone was not enough before

🍽️ Fasting means giving up food to humble oneself

🙏 This time Israel truly repents

➡️ The difference shows in what follows

---
## 🔥 Offered Burnt Offerings And Peace Offerings

A burnt offering was completely consumed on the altar, a sign of full surrender.

A peace offering was different.

Part of it was eaten in a shared meal that celebrated fellowship with God.

Israel offers both offerings together here.

That combination shows both sorrow over sin and hope for what comes next.

🔥 A burnt offering means full surrender

🍽️ A peace offering means restored fellowship

🙏 Israel offers both together

📖 Sorrow and hope appear side by side

---
## 📜 For The Ark Of The Covenant Of God Was There

This parenthetical detail is easy to skip past, but it matters.

The ark of the covenant represented God's presence among His people.

Phinehas, the grandson of Aaron, was serving as priest at this exact time.

That detail places this entire war very early in the period of the judges.

The book of Judges does not always tell its stories in order.

📜 The ark shows God's presence there

👴 Phinehas was Aaron's grandson

⏳ This places the war early in Judges

➡️ Judges does not tell events in order

---
## ✅ Tomorrow I Will Deliver Them Into Thine Hand

The first two times, God only said "go up," with no promise attached.

This time God adds a clear promise of victory.

That difference shows exactly what changed between the failures and this moment.

Real repentance, not just effort, brought the promise Israel needed.

🔁 The first two answers had no promise

✅ This time God promises victory

🔍 The difference reveals what actually changed

📖 Real repentance brought the promise

# Judges 20:29-34
# 🪤 Israel Sets A Hidden Trap
---
## 🪤 Israel Set Liers In Wait Round About Gibeah

"Liers in wait" means soldiers hidden in ambush, ready to strike without warning.

Israel finally changes its strategy after two straight defeats.

Instead of a straightforward fight, this time there is a hidden plan.

The whole outcome now depends on Benjamin falling for it.

🪤 Liers in wait means a hidden ambush

🔁 Israel finally changes its strategy

📋 A hidden plan replaces a straight fight

➡️ Everything now depends on deception

---
## 🎭 As At Other Times

Israel deliberately repeats the exact same battle pattern as the first two days.

This phrase appears several times in this passage on purpose.

The repetition is meant to make Benjamin believe nothing has changed.

Confidence built on a false pattern is about to be Benjamin's downfall.

🎭 Israel repeats the same pattern on purpose

🔁 The phrase appears again and again

😏 Benjamin believes nothing has changed

➡️ False confidence becomes Benjamin's downfall

---
## 💔 About Thirty Men Of Israel

This decoy retreat was not just theater.

Real soldiers died to make the trap believable.

Thirty men gave their lives so the rest of the plan could work.

Deception in this battle carried a genuine cost.

💔 Thirty men die making the decoy work

🎯 The retreat had to look completely real

⚠️ The plan carried a genuine cost

📖 Even a clever strategy cost real lives

---
## 🏃 Let Us Flee, And Draw Them From The City

A feigned retreat pulls the enemy away from a defended position.

Joshua used this same tactic to capture the city of Ai.

Pretending to lose was actually the whole plan.

Benjamin has no idea it is being lured into a trap.

🏃 A feigned retreat lures the enemy out

🏙️ Joshua used this trick at Ai

🎭 Pretending to lose was the real plan

➡️ Benjamin has no idea it is a trap

---
## 📍 Baaltamar

Baaltamar was a location near Gibeah used as a rallying point for the main army.

While the main force gathered there, a separate group of hidden fighters waited nearby.

That kind of coordination between two forces takes real planning.

Two different forces working two different jobs increased the odds of success.

📍 Baaltamar was the main rallying point

🙈 A separate hidden force waited nearby

🤝 Two forces worked two separate jobs

➡️ Coordination made the trap possible

---
## 😨 They Knew Not That Evil Was Near Them

"Sore" in this passage is an old word for severe or intense.

The battle was genuinely difficult for the men of Israel.

Benjamin has no idea what is waiting just out of sight.

The reader already knows the trap the fighters cannot yet see.

⚔️ Sore means severe or intense

😓 The battle was genuinely hard

🙈 Benjamin cannot see the trap

📖 The reader already knows what is coming

# Judges 20:35-41
# 🔥 The Trap Springs On Gibeah
---
## ✅ The LORD Smote Benjamin Before Israel

God is now given direct credit for what happens next.

This fulfills the exact promise made back in verse twenty eight.

Two defeats and one failed inquiry finally give way to a clear victory.

The turning point in this war came from God, not just from strategy.

✅ God is credited directly here

📜 This fulfills the promise from verse twenty eight

🔄 Two defeats give way to victory

📖 The turning point came from God

---
## 🔄 The Men Of Israel Gave Place To The Benjamites

This verse rewinds the story slightly to explain how the victory actually happened.

The Bible often tells an event, then circles back to explain the details.

"Gave place" means Israel deliberately fell back, continuing the decoy from before.

Benjamin still believes it is winning at this exact moment.

🔄 The story rewinds to explain the plan

📖 The Bible often zooms in like this

🎭 Gave place means a planned retreat

➡️ Benjamin still believes it is winning

---
## 🏃 The Liers In Wait Rushed Upon Gibeah

With Benjamin's army pulled away from the city, the ambush force finally moves.

The hidden soldiers strike the nearly empty city itself.

Every part of the earlier plan converges in this single moment.

🏃 The hidden force finally strikes

🏙️ Gibeah is nearly undefended now

🧩 Every part of the plan converges here

➡️ The trap finally springs

---
## 🔥 A Great Flame With Smoke Rise Up Out Of The City

Israel arranged this signal ahead of time, back before the battle even began.

Smoke rising from the city meant the ambush had succeeded.

That signal told the retreating army it was finally safe to turn and fight back.

A single visible sign coordinated two separate groups across a battlefield.

🔥 The signal was planned in advance

💨 Smoke meant the ambush had worked

🔄 It told the army to turn and fight

➡️ One signal coordinated the whole plan

---
## 👁️ The Flame Of The City Ascended Up To Heaven

This is the exact moment the tables turn in this battle.

Benjamin's soldiers finally see the smoke rising behind them.

Until now they believed they were still winning.

That single sight changes everything they think they know about this fight.

👁️ Benjamin finally sees the smoke

😳 They believed they were winning

🔄 One sight changes everything

📖 The truth arrives all at once

---
## 😱 The Men Of Benjamin Were Amazed

"Amazed" here means struck with sudden shock and confusion.

Benjamin realizes only now that this entire battle was a trap.

The confidence from two earlier victories collapses in a single moment.

This is the exact reversal the whole plan was built to create.

😱 Amazed means struck with shock

🪤 Benjamin realizes it was a trap

📉 Their confidence collapses instantly

📖 This reversal was the whole plan

# Judges 20:42-48
# 💀 Benjamin Is Nearly Destroyed
---
## 🏜️ Turned Their Backs Before The Men Of Israel

This retreat is real now, not a trick like the earlier ones.

Benjamin's army finally breaks and runs for the wilderness.

The very tactic Benjamin trusted twice before is now working against them.

🏜️ This retreat is finally real

💨 Benjamin's army breaks completely

🔄 The earlier tactic now works against them

➡️ There is no way back from here

---
## ⚔️ Trode Them Down With Ease

"Trode" is an old word meaning trampled.

Israel's forces now overwhelm Benjamin's scattered soldiers completely.

What had been two crushing defeats has fully reversed.

The battle that once looked impossible for Israel is now a rout.

⚔️ Trode means trampled underfoot

🌀 Benjamin's soldiers are now scattered

🔄 The two earlier defeats fully reverse

📖 The battle becomes a total rout

---
## 🪨 The Rock Of Rimmon

The remaining Benjamites flee toward a natural stronghold in the wilderness.

A rock like this offered caves and high ground for hiding.

This exact location becomes important again in the very next chapter.

Whoever survives this retreat carries the entire tribe's future with them.

🪨 Rimmon was a rocky wilderness stronghold

🙈 It offered caves for hiding

📖 The next chapter returns to this place

➡️ Survivors carry the tribe's whole future

---
## 💀 Twenty And Five Thousand Men That Drew The Sword

Benjamin started this war with about twenty six thousand seven hundred fighting men.

Twenty five thousand of them are now dead.

Almost the entire fighting force of one tribe is wiped out in a single war.

This is one of the darkest totals in the whole book of Judges.

💀 Twenty five thousand Benjamites die

📊 That is almost the whole army

⚠️ One tribe is nearly wiped out

📖 This is among the darkest totals in Judges

---
## 🏃 Abode In The Rock Rimmon Four Months

Only six hundred men remain of the entire tribe of Benjamin.

They hide together at Rimmon for four full months.

That tiny number raises an urgent question for the rest of Israel.

Can an entire tribe actually disappear from the nation forever?

🏃 Only six hundred men survive

🏔️ They hide at Rimmon four months

❓ Their survival raises an urgent question

➡️ The next chapter answers that question

---
## 🔥 Smote Them With The Edge Of The Sword, As Well The Men Of Every City, As The Beast

Israel now destroys entire Benjamite cities, including the animals inside them.

This mirrors the total destruction God commanded against Canaanite cities during the conquest.

Here it is turned against a tribe of Israel's own family instead.

The chapter that opened with a unified nation now closes with one tribe almost erased.

🔥 Whole cities are destroyed, even animals

📜 This mirrors conquest era total destruction

👪 This time it targets Israel's own family

📖 Unity opened the chapter, near erasure closes it
`.trim();

export const JUDGES_TWENTY_PERSONAL_SECTIONS = parseJudgesTwentyRawNotes(JUDGES_TWENTY_RAW_NOTES);
