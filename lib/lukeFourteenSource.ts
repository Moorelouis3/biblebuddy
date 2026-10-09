export type LukeFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeFourteenRawNotes(rawText: string): LukeFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 14:${startVerse}` : `Luke 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 14 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_FOURTEEN_RAW_NOTES = `# Luke 14:1-6
# 🤕 Healing On The Sabbath Again
---
## 🍽️ That They Watched Him

Pharisees sometimes invited a visiting teacher to share a sabbath meal.

This particular invitation came with a second purpose.

"Watched" means they were waiting for a reason to accuse him.

The meal was hospitality on the surface and a trap underneath.

Jesus walks into the test already knowing it is one.

🍽️ Pharisees often shared sabbath meals

👀 Watched means waiting to accuse

🪤 Hospitality hid a real trap

📖 Jesus enters already knowing the test

## 🤕 A Certain Man Before Him Which Had The Dropsy

"Dropsy" is an old medical word for swelling caused by trapped fluid.

Ancient doctors had no real cure for it, only ways to ease the symptoms.

This man appears right in front of Jesus at the exact moment he is being watched.

His presence turns a quiet meal into an immediate test.

Jesus can stay silent and keep the peace, or heal him and risk a fight.

🤕 Dropsy means fluid swelling

⚕️ Ancient doctors could not cure it

👁️ He appears while Jesus is watched

📖 Healing him means risking a fight

## ❓ Is It Lawful To Heal On The Sabbath Day

Jesus asks the question before he acts, not after.

Lawyers and Pharisees had built detailed rules about what counted as work on the sabbath.

Healing was often classified as work under those rules.

By asking first, Jesus forces them to answer in front of everyone or stay silent.

Either answer would cost them something.

❓ Jesus asks before he acts

📜 Rules defined sabbath work closely

🩺 Healing often counted as work

📖 Either answer costs them something

## 🤐 They Held Their Peace

Nobody answers his question out loud.

Answering yes would admit mercy matters more than their rule.

Answering no would sound cruel in front of the room.

Silence was the only safe choice left to them.

Jesus heals the man anyway, without waiting for their permission.

🤐 Nobody answers out loud

😬 Yes would admit mercy matters more

😠 No would sound cruel

📖 Jesus heals without their permission

## 🐂 An Ass Or An Ox Fallen Into A Pit

Jesus points to something every farmer in the room had actually done.

Pulling a trapped animal out on the sabbath was treated as basic care, not work.

He already made this same argument back in Luke thirteen with an ox tied in a stall.

If an animal's safety could not wait a day, a man's suffering should not either.

Nobody in the room can answer him again.

🐂 Every farmer rescued trapped animals

⚖️ That rescue was never counted as work

🔁 Jesus repeats this same argument

📖 Nobody can answer him again

# Luke 14:7-11
# 🪑 The Highest Room
---
## 👀 He Marked How They Chose Out The Chief Rooms

"Marked" means Jesus was quietly watching and noticing the detail.

Guests at a formal meal reclined around the table in a fixed order of status.

The seats closest to the host were the most honored and the most visible.

People were jostling for those seats before the meal even started.

Jesus turns this small moment of vanity into a parable for everyone at the table.

👀 Marked means quietly noticing

🪑 Seats near the host meant honor

🏃 Guests competed for the best seats

📖 Jesus turns vanity into a parable

## 🪑 Sit Not Down In The Highest Room

The highest room was the seat of greatest honor at the table.

Taking that seat uninvited assumed a status the guest did not actually have.

If someone more honored arrived later, the host would have to ask for the seat back.

That request happened in front of everyone else at the table.

Jesus warns against the public embarrassment that false confidence invites.

🪑 Highest room meant the top seat

🙋 Taking it assumed a status unearned

😳 A late guest could bump you

📖 False confidence invites public shame

## 😳 Begin With Shame To Take The Lowest Room

Being asked to move down happened in full view of the other guests.

"Shame" here is public embarrassment, not just private disappointment.

The lowest room was already the least desired seat at the table.

Ending up there after reaching for something higher made the fall feel worse.

Pride does not just risk missing the honor. It risks a very public demotion.

😳 Moving down happened in public

💔 Shame means public embarrassment

🪑 The lowest room was least desired

📖 Pride risks a public demotion

## 🙋 Friend, Go Up Higher

This time the host is the one doing the inviting, not the guest doing the demanding.

"Friend" is a warm, public word of honor spoken in front of the whole room.

Being moved up by someone else carries far more honor than claiming a seat yourself.

Luke already used this same reversal with Mary choosing the better part back in chapter ten.

The honor that lasts is the kind handed to you, not the kind you grab.

🙋 The host does the inviting here

🗣️ Friend is spoken in public honor

⬆️ Being moved up outranks self promotion

📖 Lasting honor is given, not grabbed

## ⬆️ Whosoever Exalteth Himself Shall Be Abased

"Exalteth" means to lift yourself up or claim honor for yourself.

"Abased" means brought down low, the opposite of being honored.

"Humbleth" means to willingly lower your own position.

Jesus states the rule plainly instead of leaving it as just a dinner tip.

The same principle he just taught through a seating chart governs the whole kingdom of God.

⬆️ Exalteth means lifting yourself up

⬇️ Abased means brought down low

🙇 Humbleth means lowering yourself willingly

📖 One rule governs seats and the kingdom

# Luke 14:12-14
# 🍽️ Call The Poor
---
## 🔄 Call Not Thy Friends, Nor Thy Brethren

Jesus now turns from the guests to the host himself.

Inviting friends, family, and wealthy neighbors was the normal custom at any feast.

That kind of guest list always expected to be repaid with a future invitation.

Jesus names that exact expectation as the real reason behind the invitation.

A gift that is only given to be repaid is not really a gift at all.

🔄 Jesus turns to address the host

🎉 Inviting peers was the normal custom

🤝 That guest list expected repayment

📖 A gift expecting return is not a gift

## 👥 Call The Poor, The Maimed, The Lame, The Blind

Jesus lists four groups that could never repay a dinner invitation.

"Maimed" means missing a limb or otherwise permanently injured.

None of these guests could return the favor with a future invitation of their own.

Inviting them strips the act of any hidden transaction.

This list directly answers the earlier instruction to call only friends and family.

👥 Four groups could never repay him

🦵 Maimed means permanently injured

🚫 No hidden transaction is possible here

📖 This answers the earlier guest list

## 💰 Recompensed At The Resurrection Of The Just

"Recompensed" means paid back or rewarded.

This kind of generosity gets no reward from the guest at the table.

Jesus moves the payback to the resurrection of the righteous instead.

"The just" means those who are right with God.

Choosing a gift with no immediate payoff trusts a reward that has not arrived yet.

💰 Recompensed means paid back

🚫 No reward comes from the guest

⚖️ The just means the righteous

📖 This reward waits for the resurrection

# Luke 14:15-20
# 🏰 Excuses For The Great Supper
---
## 🗣️ Blessed Is He That Shall Eat Bread In The Kingdom Of God

A guest at the table responds to Jesus's teaching with a comment of his own.

Eating bread in the kingdom of God was a common Jewish picture of future blessing.

Jewish teaching often pictured the coming kingdom as one great banquet.

The guest assumes he will obviously be at that table himself.

Jesus answers with a parable that quietly questions that assumption.

🗣️ A guest adds his own comment

🍞 Eating bread pictured future blessing

🎊 Jewish teaching imagined the kingdom as a feast

📖 Jesus questions that easy assumption

## 🍽️ A Certain Man Made A Great Supper

A great supper was the main meal of the day, served in the evening.

Hosting a "great" supper meant inviting many guests at real expense.

"Bade many" means he sent out invitations well in advance.

Accepting an invitation like this carried a social obligation to actually show up.

Everything is set up to make the coming refusals feel shocking.

🍽️ A great supper was the evening meal

💰 Hosting many guests cost real money

✉️ Bade many means invited in advance

📖 The coming refusals are meant to shock

## 📨 Come, For All Things Are Now Ready

Guests in this culture were invited twice, once in advance and once when the meal was ready.

The first invitation only asked for a yes or no.

This second call meant the food was already on the table.

Backing out at this second call was a far greater insult than declining earlier.

Every excuse that follows breaks this specific, final invitation.

📨 Guests were invited in two stages

✅ The first call only asked yes

🍖 The second call meant food was ready

📖 Backing out now was a real insult

## 🤝 They All With One Consent Began To Make Excuse

"With one consent" means every single guest refused in the same way at once.

Buying a field or a team of oxen were major purchases needing time, not minutes.

Claiming an urgent errand right at supper time was not believable.

These were ordinary excuses used to cover an unwillingness to come.

The problem was never really the ground or the oxen.

🤝 One consent means everyone refused together

🏞️ A field was a major purchase

🐂 Oxen needed inspection over days, not minutes

📖 The real problem was unwillingness

## 💍 I Have Married A Wife, And Therefore I Cannot Come

Marriage was a major life event and carried real family obligations.

This excuse sounds more personal than buying land or oxen.

Even something good and legitimate can still become a reason to refuse the invitation.

The man is not choosing something evil. He is choosing something smaller over something greater.

Any good thing can crowd out the one invitation that matters most.

💍 Marriage carried real family obligations

❤️ This excuse sounds more personal

⚖️ A good thing still became a refusal

📖 Smaller things can crowd out the greater

# Luke 14:21-24
# 🚪 Compel Them To Come In
---
## 😠 Bring In Hither The Poor, And The Maimed, And The Halt, And The Blind

The master's anger is not random. It responds directly to being publicly refused.

"Halt" is an old word meaning lame or unable to walk normally.

This exact guest list matches the one Jesus already gave the host back in verse thirteen.

The master fills his table with people nobody else would have invited first.

Rejection by the expected guests becomes an opening for the unexpected ones.

😠 His anger answers being refused

🦵 Halt means lame or unable to walk

🔁 This matches the guest list from verse thirteen

📖 Rejection opens the door for others

## 📣 Yet There Is Room

The servant reports back after gathering every guest from the streets and lanes.

Even after filling the house this way, space is still left over.

The invitation turns out to be bigger than anyone expected.

There was always more room at this table than the first guests assumed.

The house was never close to full capacity to begin with.

📣 The servant reports back to the master

🏠 Room was still left after that

📐 The invitation was bigger than expected

📖 This table always had room to spare

## 💪 Compel Them To Come In

"Compel" means to urge strongly, not to force someone against their will.

Highways and hedges meant the open roads and rough country outside the city.

These guests lived far past where the first invitations were ever sent.

The strong urging matches how unlikely it was that they would come on their own.

An invitation this good was worth insisting on.

💪 Compel means urging strongly

🛣️ Highways and hedges meant the open country

🌍 These guests lived far outside the city

📖 A good invitation is worth insisting on

## 📨 None Of Those Men Which Were Bidden Shall Taste Of My Supper

"Bidden" means the ones who were formally invited first.

The master closes the door on the very people who refused him.

This is not cruelty. It is simply taking their own answer seriously.

They were not uninvited. They removed themselves by making excuses.

Refusing an invitation has a real and lasting consequence here.

📨 Bidden means formally invited first

🚪 The master closes the door on them

🙅 They removed themselves with excuses

📖 Refusing has a lasting consequence

# Luke 14:25-30
# ✝️ Counting The Cost
---
## 🚶 There Went Great Multitudes With Him

The scene shifts away from the dinner table to the open road.

Crowds had been gathering around Jesus throughout this whole journey to Jerusalem.

Popularity like this can look like success without actually meaning commitment.

Jesus turns to this same crowd and says something that would thin it out fast.

He never seems interested in a crowd that has not thought about the cost.

🚶 The scene moves to the open road

👥 Crowds followed him toward Jerusalem

📈 Popularity is not the same as commitment

📖 Jesus is not chasing crowd size

## ❤️ Hate Not His Father, And Mother, And Wife, And Children

"Hate" here is a strong comparison, not a command to feel actual hatred.

Genesis uses this same word for Leah, loved less than Rachel, not truly hated.

Family loyalty was one of the strongest obligations in this culture.

Jesus places loyalty to himself above even that deep an obligation.

Nothing is allowed to outrank this, not even the closest family tie.

❤️ Hate means loved less, not despised

📜 Genesis uses this word for Leah

👨‍👩‍👧 Family loyalty ran extremely deep here

📖 Nothing outranks loyalty to Jesus

## ✝️ Whosoever Doth Not Bear His Cross

A Roman condemned man carried his own cross beam publicly through the streets.

Everyone watching that walk already knew exactly where it ended.

Bearing a cross meant accepting that same visible, public cost.

This was not a metaphor for minor inconvenience to the first people who heard it.

Following Jesus could mean walking toward a cost this real.

✝️ Condemned men carried their own cross

👀 Everyone watching knew the outcome

💀 This meant a real public cost

📖 Following Jesus could cost this much

## 🏗️ Counteth The Cost

Building a tower required a real plan before the first stone was ever laid.

A builder had to know his total resources before committing to the project.

Jesus uses ordinary construction math to describe following him.

Skipping this step was not caution. It was the actual cause of failure.

He wants followers who already know the full price, not ones who discover it partway through.

🏗️ Towers needed a plan first

💰 A builder had to know his resources

🧮 Jesus compares discipleship to this math

📖 Half knowing the cost causes failure

## 🏗️ Began To Build, And Was Not Able To Finish

An abandoned, half built tower was a visible, lasting embarrassment in a small town.

Everyone who walked past it would remember exactly why it stopped.

Jesus is not warning against starting. He is warning against starting carelessly.

A half finished commitment to him would be just as visible to everyone watching.

Following Jesus means finishing, not just beginning with excitement.

🏗️ A half built tower was a visible failure

👀 Everyone would remember why it stopped

🚫 The warning targets careless starting

📖 Following Jesus means finishing, not starting

# Luke 14:31-33
# ⚔️ The King Going To War
---
## ⚔️ Whether He Be Able With Ten Thousand To Meet Him With Twenty Thousand

A king facing an army twice his size had to weigh the odds honestly before marching out.

Ten thousand against twenty thousand was not a close fight by any ancient measure.

Wise kings assessed this gap before committing their whole army to it.

Jesus uses a national level decision to describe something each person has to weigh alone.

Following him asks for this same honest math about the cost ahead.

⚔️ A king weighed the real odds

📊 Twenty thousand doubled his own army

🧠 Wise kings assessed this before marching

📖 Each person weighs this cost alone

## 🏳️ Desireth Conditions Of Peace

A king who knows he will lose sends messengers to negotiate surrender terms instead.

"Ambassage" means a formal envoy sent to represent him in talks.

Asking for peace here is not weakness. It is simple honesty about the odds.

Jesus is describing someone who counted the cost and acted on what he found.

Knowing you cannot win a fight is itself useful knowledge.

🏳️ A losing king sought peace terms

📨 Ambassage means a formal envoy

🤔 Asking for peace was honest, not weak

📖 Knowing you cannot win is useful

## 🙌 Forsaketh Not All That He Hath

"Forsaketh" means to give up entirely, not just to share part of something.

Jesus returns to the exact warning he opened this whole section with.

The tower, the war, and this final line all make the same single point.

Half measures do not count as discipleship by this standard.

This is the hardest, plainest line in the whole passage, stated without softening it.

🙌 Forsaketh means giving up entirely

🔁 This repeats the opening warning

🏗️ Three pictures make one single point

📖 Half measures are not enough

# Luke 14:34-35
# 🧂 Salt Without Savour
---
## 🧂 If The Salt Have Lost His Savour

Salt in this region often came mixed with other minerals, not pure like modern table salt.

"Savour" means its flavor and its power to preserve food from spoiling.

That kind of salt could lose its useful properties while the minerals remained behind.

Salt that can no longer do its job becomes a strange, useless thing.

Jesus just described a disciple who starts strong and quits partway.

This picture of ruined salt matches that exact failure.

🧂 Salt here was mixed with minerals

👃 Savour means flavor and preserving power

🚫 Useless salt still looked like salt

📖 This matches the unfinished disciple

## 🌱 Neither Fit For The Land, Nor Yet For The Dunghill

Good salt improved soil and helped compost break down in the dunghill.

Ruined salt was too useless even for either of those ordinary backup jobs.

"Cast it out" means it gets thrown away entirely, with no use left for it anywhere.

There was no quiet, humble fallback use for salt once it stopped working.

Something made for one specific purpose can become worthless once it fails at it.

🌱 Good salt helped soil and compost

🚮 Ruined salt failed even backup uses

🗑️ Cast out means thrown away entirely

📖 A failed purpose can mean no use left

## 👂 He That Hath Ears To Hear, Let Him Hear

Jesus uses this exact phrase at the end of several hard teachings in the gospels.

Having physical ears was never the point of the phrase.

It calls for actually listening and letting the teaching change something.

Jesus closes this entire chapter on cost the same way he closes others on mystery.

The whole chapter has been building toward this one quiet challenge.

👂 Jesus repeats this phrase elsewhere

🙉 Having ears was never the point

🧠 It calls for truly listening

📖 The chapter ends on this challenge
`.trim();

export const LUKE_FOURTEEN_PERSONAL_SECTIONS = parseLukeFourteenRawNotes(LUKE_FOURTEEN_RAW_NOTES);
