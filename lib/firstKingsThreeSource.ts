export type FirstKingsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsThreeRawNotes(rawText: string): FirstKingsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsThree\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsThree\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsThree\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 3:${startVerse}` : `1 Kings 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Kings 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_THREE_RAW_NOTES = `# FirstKingsThree 3:1-3
# 🤝 Solomon's Marriage And Mixed Worship
---
## 🤝 Solomon Made Affinity With Pharaoh King Of Egypt

"Affinity" is an old word for a marriage that sealed a political alliance.

Solomon was not just gaining a wife, he was securing peace with Egypt.

Egypt was the most powerful nation Israel bordered at the time.

A marriage like this told every neighboring king that Israel now stood as an equal partner.

The same kind of marriage later pulls Solomon toward foreign gods, in chapter eleven.

The chapter that opens with his wisdom also quietly opens the door to his downfall.

🤝 Affinity means a marriage alliance

👑 Egypt was the most powerful neighbor

🕊️ The marriage secured political peace

📖 The same marriages later divide Solomon's heart

## 🏯 Brought Her Into The City Of David

The city of David was the older, walled part of Jerusalem David had captured years earlier.

It held his palace and eventually his tomb.

Placing Pharaoh's daughter there put her inside the most secure and honored part of the capital.

This was not a minor guest room, it was the political center of the kingdom.

🏯 City of David was Jerusalem's oldest fortified section

👑 It held David's palace

🔒 Pharaoh's daughter lived at the center of power

📖 Her placement showed real honor

## 🏛️ Until He Had Made An End Of Building His Own House, And The House Of The LORD, And The Wall Of Jerusalem

This verse quietly names three massive building projects still ahead of Solomon.

His own house was the royal palace, a huge undertaking on its own.

The house of the LORD was the temple, described starting in chapter six.

The wall protected the entire city, still incomplete at this point.

Naming all three together tells the reader Solomon's reign is only just beginning.

This one verse works like a table of contents for chapters still to come.

🏛️ His own house means the royal palace

🕍 The house of the LORD means the temple

🧱 The wall protected the whole city

📖 This verse previews chapters still ahead

## ⛰️ Only The People Sacrificed In High Places, Because There Was No House Built Unto The Name Of The LORD

"High places" were elevated outdoor sites used for offering sacrifices.

They were common across the whole ancient Near East, not just in Israel.

The temple did not exist yet, so no single place was set apart for worship.

Using a high place at this point in the story was understandable, not sinful.

That will not stay true once the temple is finished later in this book.

⛰️ High places were outdoor worship sites

🌍 Common practice across the ancient world

🕍 No temple yet existed as an alternative

📖 This changes once the temple is built

## ❤️ Solomon Loved The LORD, Walking In The Statutes Of David His Father: Only He Sacrificed And Burnt Incense In High Places

The word "only" here marks a genuine but incomplete kind of faithfulness.

Solomon truly loved the LORD and followed the example his father David set.

At the very same time, he kept worshiping at high places outside Jerusalem.

The narrator is not condemning Solomon yet, simply being honest about him.

A good king can still carry one habit that needs to change later.

❤️ Solomon genuinely loved the LORD

👑 He followed David's example of devotion

⛰️ He still worshiped at high places too

📖 The narrator is honest, not condemning yet

# FirstKingsThree 3:4-5
# 🌙 The Dream At Gibeon
---
## 🗺️ The King Went To Gibeon To Sacrifice There, For That Was The Great High Place

Gibeon was a city a few miles northwest of Jerusalem.

The tabernacle Moses built in the wilderness stood there at this point in the story.

That is why the text calls it the great high place, the most important worship site before the temple.

Solomon traveling there shows him honoring the proper place of worship available to him.

🗺️ Gibeon sat a few miles from Jerusalem

⛺ The tabernacle stood there at this time

⭐ That made it the great high place

📖 Solomon honored the best worship site he had

## 🔥 A Thousand Burnt Offerings Did Solomon Offer Upon That Altar

A burnt offering was completely consumed by fire, unlike offerings the priests or people kept and ate.

It was a costly way to show total devotion, holding nothing back.

A thousand offerings at once was an extraordinary, unusually large act of worship.

This scale shows Solomon starting his reign seeking God seriously, not casually.

🔥 Burnt offerings were fully consumed by fire

💰 It was a costly, total gift

🐑 A thousand offerings was an enormous number

📖 Solomon began his reign seeking God seriously

## 🌙 In Gibeon The LORD Appeared To Solomon In A Dream By Night

God speaking through a dream was a real and accepted way He communicated in this period.

It was not treated as a lesser or uncertain kind of revelation.

This appearance comes directly after Solomon's costly, sincere worship at Gibeon.

The timing suggests God was responding to Solomon's devotion, not acting at random.

🌙 Dreams were a real way God spoke

✅ Not treated as uncertain revelation

🔥 It follows Solomon's costly worship

📖 God responded to sincere devotion

## 🎁 God Said, Ask What I Shall Give Thee

God gives Solomon an open invitation with no limit named.

This is not a trick question, it is a genuine test of what Solomon values most.

A young king could easily ask for wealth, long life, or victory over enemies.

What Solomon chooses to ask for next reveals his true priorities.

🎁 God offers Solomon anything he wants

🧪 The offer tests what Solomon values

👑 Many kings would ask for power or riches

📖 His answer reveals his true priorities

# FirstKingsThree 3:6-9
# 🙏 Solomon's Request For Wisdom
---
## 📜 Thou Hast Shewed Unto Thy Servant David My Father Great Mercy

"Shewed" is an old spelling of the word showed.

Solomon begins his prayer by remembering what God already did for his father, not by demanding anything.

He names three qualities that marked David's walk with God, truth, righteousness, and uprightness of heart.

Starting with gratitude before making a request was a mark of genuine prayer, not flattery.

📜 Shewed is an old spelling of showed

🙏 Solomon opens by remembering God's mercy

❤️ He names David's truth and uprightness

📖 Gratitude comes before the request

## 👑 Thou Hast Given Him A Son To Sit On His Throne, As It Is This Day

This line quietly points back to the succession crisis that filled chapters one and two.

Adonijah tried to take the throne, and Solomon's position was genuinely uncertain for a while.

"As it is this day" means Solomon is speaking with the crisis already fully behind him.

He treats his own throne as a gift from God, not something he seized for himself.

👑 This recalls the succession crisis

⚠️ Solomon's throne was once uncertain

✅ The crisis is now fully resolved

📖 Solomon credits God, not himself

## 👦 I Am But A Little Child: I Know Not How To Go Out Or Come In

Solomon was likely a young adult when he became king, not a literal small child.

He is describing how inexperienced he feels facing the size of this job.

"Go out or come in" meant he did not yet know how to lead in daily life.

This is genuine humility from a new king, not false modesty for show.

👦 A little child means inexperienced, not literal age

🚪 Go out or come in meant daily leadership

😟 Solomon feels the weight of the job

📖 This humility appears genuine, not performed

## ⭐ In The Midst Of Thy People Which Thou Hast Chosen, A Great People, That Cannot Be Numbered Nor Counted For Multitude

This description echoes God's ancient promise to Abraham of descendants too many to count.

Solomon is not just describing a large population, he is naming a promise already fulfilled.

Ruling a nation this size was a genuinely enormous responsibility for one young king.

The size of the task is exactly why Solomon feels so unprepared in the verse before this one.

⭐ This echoes God's promise to Abraham

🌍 The nation had grown too large to count

👑 Ruling it was an enormous task

📖 This explains Solomon's sense of being unprepared

## 🧠 Give Therefore Thy Servant An Understanding Heart

In this culture, the heart was considered the center of thinking and decision making, not just emotion.

An understanding heart means the ability to judge situations wisely, not simply to feel deeply.

Solomon does not ask God to feel compassion for his people, he asks to think clearly for them.

This is the exact request that becomes the defining trait of his entire reign.

🧠 Heart meant the center of thinking here

⚖️ Understanding meant wise judgment

🙏 Solomon asks to think clearly, not just feel

📖 This request defines his whole reign

## 🔍 To Judge Thy People, That I May Discern Between Good And Bad

To discern means to correctly tell apart two things that look similar on the surface.

A king in this period served as the nation's final court of judgment for hard cases.

Wrong judgments could ruin innocent lives or let real guilt go unpunished.

Solomon is asking specifically for the skill his actual job requires most.

🔍 Discern means telling things apart correctly

⚖️ Kings served as the final court

❌ Wrong judgments could ruin innocent lives

📖 Solomon asks for exactly what his job needs

## ❓ For Who Is Able To Judge This Thy So Great A People?

This question is not Solomon giving up before he starts.

It shows him honestly admitting no ordinary person could handle this task alone.

That honesty is exactly what makes his prayer different from empty self confidence.

Recognizing his own limits is what leads him to ask God for real help.

❓ The question is honest, not hopeless

🙅 No ordinary person could do this alone

💡 That honesty shapes his whole prayer

📖 Recognizing limits leads him to seek God

# FirstKingsThree 3:10-14
# ✨ God's Answer To Solomon
---
## ✅ The Speech Pleased The LORD, That Solomon Had Asked This Thing

God is genuinely pleased by the specific thing Solomon chose to ask for.

This tells the reader that wisdom, not wealth or power, is what God values most in a leader.

The request itself becomes the reason for the blessing that follows.

What a person asks for reveals what they actually love.

✅ God is pleased by Solomon's choice

🧠 Wisdom mattered more than wealth

🎁 The request shapes the blessing given

📖 What we ask for reveals what we love

## 🚫 Hast Not Asked For Thyself Long Life, Neither Hast Asked Riches For Thyself, Nor Hast Asked The Life Of Thine Enemies

God lists out loud exactly what Solomon could have asked for instead.

A new king could easily have asked for long life, personal riches, or revenge on his enemies instead.

Naming these options shows just how easy it would have been to ask selfishly.

Solomon's request stands out precisely because of what he chose to leave out.

👑 Long life was one option skipped

💰 Riches was another option skipped

⚔️ Revenge on enemies was skipped too

📖 What he left out reveals his character

## 🎁 I Have Given Thee A Wise And An Understanding Heart, So That There Was None Like Thee Before Thee, Neither After Thee Shall Any Arise Like Unto Thee

God grants exactly what Solomon asked for, and then goes further.

This promise says no king before or after Solomon would match his wisdom.

That is an extraordinary, once in history kind of claim.

It sets up the rest of the book to actually show that wisdom at work.

🎁 God grants the wisdom Solomon asked for

🏆 No king before or after would match it

⏳ This is a once in history promise

📖 The next scene proves this wisdom in action

## 🏅 I Have Also Given Thee That Which Thou Hast Not Asked, Both Riches, And Honour

God adds riches and honor on top of the wisdom Solomon actually requested.

These were never named in Solomon's prayer at all.

The blessing is bigger than the request precisely because the request was not selfish.

Seeking wisdom first did not cost Solomon the things he did not even ask for.

🎁 God adds riches on top of wisdom

🏅 Honor is added as well

🙅 Neither was named in the prayer

📖 An unselfish request led to a bigger reward

## 👑 So That There Shall Not Be Any Among The Kings Like Unto Thee All Thy Days

This promise is specifically limited to Solomon's own lifetime.

It compares him to every other king ruling anywhere during those same years.

This is a claim about unmatched wealth and status among his contemporaries.

The wisdom promise before this one was open ended, this promise about riches has a clear time limit.

👑 This promise covers Solomon's lifetime

🌍 It compares him to kings everywhere

💰 It is about wealth and status

📖 Unlike wisdom, this promise has a time limit

## ⚠️ If Thou Wilt Walk In My Ways, To Keep My Statutes And My Commandments, As Thy Father David Did Walk, Then I Will Lengthen Thy Days

This final promise is conditional, unlike the wisdom and riches already given freely.

Long life depends on Solomon actually walking in obedience going forward.

David's own life is held up again as the standard to follow.

God's generosity here does not remove Solomon's responsibility to keep choosing obedience.

⚠️ This promise alone comes with a condition

👣 It depends on Solomon's obedience

👴 David's walk is the standard again

📖 Generosity does not remove responsibility

# FirstKingsThree 3:15
# 🕯️ Solomon Wakes And Worships
---
## 🌙 Solomon Awoke, And, Behold, It Was A Dream

Solomon wakes up and realizes the entire conversation happened while he slept.

The dream does not become less real to him just because it has ended.

He responds immediately with worship, not doubt about whether it actually happened.

His actions afterward show he took the promise completely seriously.

🌙 Solomon wakes from the dream

🤔 He does not doubt what happened

🙏 He responds right away with worship

📖 His actions show he took it seriously

## 📦 He Came To Jerusalem, And Stood Before The Ark Of The Covenant Of The LORD, And Offered Up Burnt Offerings, And Offered Peace Offerings, And Made A Feast To All His Servants

The ark of the covenant stayed in Jerusalem even though the tabernacle was still at Gibeon.

A burnt offering was fully given up to God, a peace offering was shared and eaten in celebration.

Offering both together shows Solomon worshiping and celebrating in the very same moment.

Making a feast for all his servants turned a private dream into a shared, public celebration.

📦 The ark stayed in Jerusalem itself

🔥 Burnt offerings were fully given to God

🍽️ Peace offerings were shared and eaten

📖 Solomon turned a private dream into shared joy

# FirstKingsThree 3:16-19
# 👥 Two Women, One House
---
## 💔 Then Came There Two Women, That Were Harlots, Unto The King

A harlot was a woman who sold sex, one of the lowest positions in this society.

These two women had no husband, no wealth, and no social standing to back up their case.

Even so, they had direct access to bring their dispute before the king himself.

This detail shows the king's court was genuinely open, not just for the wealthy or powerful.

💔 Harlot named a woman with no social standing

🚪 They still had access to the king

⚖️ The court was open to the powerless too

📖 This tests real justice, not just royal favor

## 👶 I And This Woman Dwell In One House, And I Was Delivered Of A Child With Her In The House

"Delivered of a child" is an old way of saying she gave birth.

The two women lived together and gave birth just three days apart.

No servant, midwife, or outside witness lived in the house with them.

That missing witness is exactly what will make this case so difficult to settle.

👶 Delivered of a child means gave birth

🏠 Both women lived in the same house

👀 No outside witness was present

📖 That missing witness makes the case hard

## 📆 It Came To Pass The Third Day After That I Was Delivered, That This Woman Was Delivered Also

The two women gave birth only three days apart from each other.

That short gap made it entirely plausible for either baby to belong to either mother.

A larger gap in age would have made a switched baby easy to disprove.

This detail explains exactly why the case was hard enough to need a king's wisdom.

📆 The two births were three days apart

🤔 That gap made either story plausible

👶 A bigger age gap would disprove a switch

📖 This is why the case needed real wisdom

## 🚫 There Was No Stranger With Us In The House, Save We Two In The House

The woman repeats this detail on purpose, saying it twice in the same breath.

She is making sure the king understands no third party could testify.

This case will have to be settled without any normal evidence at all.

Solomon's wisdom is about to be tested in the hardest possible way, a case with no proof.

🔁 The detail is repeated for emphasis

🚫 No outside witness exists at all

⚖️ Normal evidence will not settle this

📖 This case truly tests Solomon's wisdom

## 😢 This Woman's Child Died In The Night, Because She Overlaid It

"Overlaid" means she accidentally suffocated the baby by rolling onto it while sleeping.

This was a real and tragic risk in a culture where infants often slept beside their mothers.

The dead child is only the first half of the coming dispute, not the whole problem yet.

What happens next, in the middle of the night, is what actually brings this case to the king.

😢 Overlaid means accidentally suffocated

🛏️ Babies commonly slept beside their mothers

💔 This tragedy begins the real dispute

📖 The worst part is still ahead

# FirstKingsThree 3:20-22
# ⚔️ Accusation And Denial
---
## 🌙 She Arose At Midnight, And Took My Son From Beside Me... And Laid Her Dead Child In My Bosom

The accusing woman claims the other mother secretly swapped the two babies while she slept.

"Bosom" simply means the crook of her arm, close against her body.

If true, this was a deliberate, calculated act done in complete darkness.

Nobody besides the two women was awake to see it actually happen.

🌙 The swap allegedly happened at midnight

🤱 Bosom means close against the body

🕵️ The act was done in total secrecy

📖 No witness saw what really happened

## 🙇 While Thine Handmaid Slept

"Handmaid" is an old word a woman used to humbly refer to herself before someone above her.

It was a common form of respectful, humble speech in this culture, not a literal servant title.

Using this term underlines just how carefully she is trying to appear respectful and honest before Solomon.

Her tone through this whole account stays careful and deferential, not aggressive.

🙇 Handmaid was humble self reference

👑 Common respectful speech before a king

🗣️ It shows her careful, respectful tone

📖 She is trying to appear honest and calm

## 🍼 When I Rose In The Morning To Give My Child Suck, Behold, It Was Dead

"Give my child suck" is an old way of saying to nurse the baby.

The horror of this discovery is described exactly as it would have felt, an ordinary morning turned tragic.

Only after picking up the child does she realize something is deeply wrong.

This is the moment her whole accusation grows out of.

🍼 Give suck is an old phrase for nursing

🌅 She discovers this in the morning

😱 An ordinary routine turns to horror

📖 Her whole accusation starts right here

## 👀 But It Was Not My Son, Which I Did Bear

She is not simply grieving a dead baby and assuming the worst.

She specifically recognizes this dead child as not being the one she gave birth to.

A mother noticing this kind of detail was considered strong, believable testimony in this culture.

Her certainty is exactly what sets up the direct conflict in the next verse.

👀 She recognizes the child is not hers

🤱 A mother's recognition carried real weight

🔍 Her certainty is specific, not vague

📖 This sets up the direct conflict

## 🔁 Nay, But The Living Is My Son, And The Dead Is Thy Son... No, But The Dead Is Thy Son, And The Living Is My Son

Both women make the exact same claim, just with the two children reversed.

Neither woman backs down or offers any new detail to break the tie.

From the outside, there is no way to tell which woman is lying.

This is precisely the kind of case Solomon prayed for wisdom to handle.

🔁 Both women make the same reversed claim

🚫 Neither one backs down at all

❓ No outside way exists to tell them apart

📖 This is exactly what Solomon prayed for

# FirstKingsThree 3:23-25
# 🗡️ The Sword Test
---
## 👂 Then Said The King, The One Saith, This Is My Son That Liveth

Solomon repeats the dispute back to both women in his own words.

He has listened carefully here, not rushed to a decision.

Restating a conflict plainly is often the first real step toward solving it.

What Solomon does next will be completely unexpected to everyone in the room.

👂 Solomon restates the dispute carefully

🧠 He has listened, not rushed to judge

🗣️ Restating a problem clearly helps solve it

📖 His next move surprises everyone present

## ⚔️ Bring Me A Sword. And They Brought A Sword Before The King

This request lands as a shock in the middle of a courtroom, not a battlefield.

Nobody in the room yet knows what Solomon actually intends to do with it.

The sudden silence and confusion is very likely the intended effect.

Tension is about to be used as a tool for uncovering the truth.

😨 The request shocks everyone present

❓ No one yet knows Solomon's plan

🤫 The room likely falls into stunned silence

📖 Tension becomes a tool for truth

## 🗡️ Divide The Living Child In Two

Solomon has no intention of actually killing this child.

The order is a test designed to reveal which woman truly loves him as her own.

A real mother would rather lose the child to someone else than see him harmed.

Solomon is trusting that genuine love will react differently than a lie will.

🗡️ Solomon never intends to carry this out

🧪 The order is really a test

❤️ Real love protects even at a loss

📖 Solomon trusts love to expose the truth

## ⚖️ Give Half To The One, And Half To The Other

On the surface, splitting something exactly in half sounds like a fair compromise.

For a living child, an even split is not fairness, it is destruction.

Solomon proposes something that only sounds reasonable if no one stops to think about it.

The false fairness is exactly what makes the test work.

⚖️ An even split sounds fair on paper

💔 For a living child it means destruction

🎭 It only sounds reasonable at first

📖 False fairness is what makes the test work

# FirstKingsThree 3:26-28
# 👑 The True Mother Revealed
---
## ❤️ For Her Bowels Yearned Upon Her Son

In this culture, the bowels were believed to be the seat of deep emotion, not just an organ.

"Yearned" describes an overwhelming rush of love and protective instinct.

This phrase describes a mother's love in the most physical, involuntary terms available.

Her body reacts before her mind can even finish forming the words.

❤️ Bowels described the seat of deep feeling

🌊 Yearned describes an overwhelming rush

🤱 This is love described physically

📖 Her body reacts before her words do

## 🚫 O My Lord, Give Her The Living Child, And In No Wise Slay It

"In no wise" is an old way of saying not under any circumstance.

The real mother chooses to lose her son completely rather than see him harmed at all.

Losing the child to someone else was better to her than the child dying.

This choice is the exact proof Solomon's test was designed to reveal.

🚫 In no wise means not at all

💔 She would rather lose him than see harm

❤️ Her love protects him over her own claim

📖 This choice proves who the real mother is

## 😡 Let It Be Neither Mine Nor Thine, But Divide It

The second woman's response reveals she never truly wanted the child alive at all.

She would rather see the baby dead than let the other woman raise him.

This reaction contrasts completely with the first woman's instinct to protect him.

Solomon's test succeeds precisely because it exposes what each woman actually wants.

💔 This woman would rather the child die

😡 She prioritizes spite over the child's life

⚖️ Her reaction contrasts sharply with the real mother

📖 The test exposes what each woman wants

## ⚖️ Give Her The Living Child, And In No Wise Slay It: She Is The Mother Thereof

Solomon's final verdict simply confirms what the test already revealed.

No blood test or paperwork was ever needed to settle this case.

A mother's own instinct to protect became the actual evidence.

Solomon's wisdom was not in knowing facts, it was in exposing the truth.

⚖️ Solomon's verdict confirms the test's result

🧬 No physical proof was ever needed

❤️ A mother's instinct became the evidence

📖 Wisdom exposed truth rather than facts

## 🙇 All Israel Heard Of The Judgment Which The King Had Judged, And They Feared The King

"Feared" here means deep respect and awe, not being afraid of cruelty.

News of this single case spread across the entire nation.

A wise judgment on one hard case became proof of Solomon's fitness to rule all of Israel.

One decision in a small courtroom ended up shaping how an entire nation saw its king.

🙇 Feared here means deep respect, not terror

📢 News of the case spread nationwide

⚖️ One case proved his fitness to rule

📖 A single judgment shaped his whole reputation

## ✨ They Saw That The Wisdom Of God Was In Him, To Do Judgment

This final line ties directly back to Solomon's prayer at the start of the chapter.

God promised him wisdom, and this story is the first public proof it was real.

The chapter opened with a private dream and closes with public evidence.

What God gives in secret, He is willing to prove in the open.

🙏 This ties back to Solomon's opening prayer

✨ The dream's promise is now publicly proven

🌙 The chapter opened with a private dream

📖 What God gives secretly He proves openly
`.trim();

export const FIRST_KINGS_THREE_PERSONAL_SECTIONS = parseFirstKingsThreeRawNotes(FIRST_KINGS_THREE_RAW_NOTES);
