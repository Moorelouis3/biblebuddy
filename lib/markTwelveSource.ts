export type MarkTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkTwelveRawNotes(rawText: string): MarkTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 12:${startVerse}` : `Mark 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Mark 12 sections, received " + sections.length);
  }

  return sections;
}

const MARK_TWELVE_RAW_NOTES = `# Mark 12:1-5
# 🍇 The Parable Of The Wicked Husbandmen
---
## 🍇 A Certain Man Planted A Vineyard

A vineyard was a common picture in Jewish teaching.

The prophet Isaiah used this same picture for the nation of Israel.

In that picture, God is the man who plants it.

The vineyard itself stands for His people.

Every detail that follows in this parable points back to that picture.

🍇 Vineyard pictures a planted, cared for nation

🌱 Isaiah used this image for Israel first

👑 God is the one who plants it

📖 Every detail points back to this image

## 🏗️ Set An Hedge About It, And Built A Tower

A hedge was a thick wall of thorn bushes or stones.

It kept out wild animals and thieves looking for an easy target.

A tower let a watchman see trouble coming from a distance.

Both details show an owner who built this vineyard to last.

God did not plant Israel and walk away.

He built in protection from the very start.

🧱 Hedge means a thick thorn wall

🐺 It kept out animals and thieves

🗼 Tower let a watchman see trouble early

📖 God built in protection from the start

## 🍷 Digged A Place For The Winefat

A winefat was a wine press, often cut straight into solid rock.

Workers would crush grapes inside it with their feet.

The juice drained down into a lower basin to collect.

Digging this out ahead of time took real time and real cost.

This owner was not testing the ground.

He was investing in a harvest he expected to come.

🍷 Winefat means a wine press pit

🦶 Grapes were crushed by foot inside it

⏳ Digging it took real time and cost

📖 The owner expected a real harvest

## 📜 Sent To The Husbandmen A Servant

Husbandmen were tenant farmers who leased the land from an owner.

They worked the vineyard and owed the owner a share of the fruit.

Sending a servant to collect that share was completely normal and fair.

In the bigger picture, these servants stand for God's prophets.

Again and again, God sent messengers to call His people back to Him.

📜 Husbandmen were tenant farmers, not owners

🤝 They owed the owner a fair share

🗣️ Servants stand for God's prophets here

📖 God kept sending messengers to His people

## 👊 Sent Him Away Empty

This servant was beaten and sent back with nothing.

Refusing to pay what was owed was a direct insult to the owner.

It was also a flat rejection of his authority over the land.

This is the first sign that these tenants plan to keep everything for themselves.

The pattern only grows worse from here.

👊 He was beaten and sent back empty

🚫 Refusing payment insulted the owner directly

👑 It rejected the owner's authority outright

📖 The tenants plan to keep it all

## 🪨 Wounded Him In The Head

The next servant was treated even worse than the first.

He was hit with stones and badly hurt before being sent away.

Scripture records Israel's own history of mistreating the prophets God sent.

Zechariah the priest was stoned to death inside the temple courts for speaking truth.

The violence in this story is not invented for effect.

It echoes something that actually happened again and again.

🪨 He was struck with stones and hurt

📚 Israel had a history of harming prophets

🏛️ Zechariah was stoned inside the temple

📖 This violence echoes real history, not fiction

# Mark 12:6-9
# 💔 The Wellbeloved Son Is Killed
---
## 💔 Having Yet Therefore One Son, His Wellbeloved

This detail makes the owner's patience impossible to miss.

After losing servant after servant, he still has one person left to send.

It is his own son, the one he loves most.

Sending him anyway shows real hope that this time will be different.

The word wellbeloved is the same word used over Jesus at His baptism.

The parable is not hiding who this son represents.

💔 Only one son is left to send

❤️ Wellbeloved echoes words said over Jesus

🙏 Sending him anyway shows costly hope

📖 The parable does not hide who this is

## ⚖️ This Is The Heir

Under the law, land without a living heir could sometimes pass to whoever held it.

The tenants are not confused about who the son is.

They understand exactly who he is, and they want the inheritance for themselves.

Killing the heir looks, to them, like a legal shortcut to owning the land outright.

Their plan is cold and calculated, not a mistake made in a moment of panic.

⚖️ Heir means the legal owner to come

🧮 Killing him looked like a legal shortcut

🎯 Their plan was calculated, not confused

📖 They wanted the land for themselves

## 🚪 Cast Him Out Of The Vineyard

The son is killed and then thrown outside the vineyard itself.

This detail matters more than it first appears.

Jesus was also crucified outside the walls of Jerusalem, not within them.

The writer of Hebrews later calls attention to that same detail about Jesus.

Being cast out, in both stories, does not mean being defeated.

🚪 He is killed and thrown outside

🏙️ Jesus died outside Jerusalem's walls too

📚 Hebrews later points back to this detail

📖 Being cast out does not mean losing

## 🍇 Give The Vineyard Unto Others

Jesus asks His own question and then answers it himself.

The owner will destroy the husbandmen who did this and hand the vineyard to new tenants.

This does not mean God abandons His people forever.

It means the religious leaders who rejected God's messengers lose their place of care over it.

The vineyard continues under new stewards instead of ending.

⚖️ The owner judges the guilty tenants

🔄 The vineyard is handed to new keepers

🚫 This is not God abandoning His people

📖 Care over the vineyard simply changes hands

# Mark 12:10-12
# 🪨 The Stone The Builders Rejected
---
## 📚 Have Ye Not Read This Scripture

Jesus points His listeners straight to Psalm 118, a psalm they already knew well.

Quoting scripture back at His accusers was a common and respected way to argue.

He is not just telling a story anymore, He is naming it as prophecy.

The parable and the psalm are pointing at the exact same thing.

📚 Jesus quotes Psalm 118 directly

🗣️ Quoting scripture was a respected way to argue

🔗 The parable and the psalm point together

📖 Jesus names His own story as prophecy

## 🪨 The Stone Which The Builders Rejected

Builders in this picture are the religious leaders judging what belongs in God's house.

They look at this stone and decide it does not fit their plan.

A rejected stone was normally thrown aside as worthless and wasted.

🪨 Builders reject a stone they call worthless

👀 They decide what fits their own plan

🚫 Rejected stones were normally thrown aside

📖 The builders are the religious leaders here

## 👑 Is Become The Head Of The Corner

The head of the corner is the most important stone in the whole building.

It sets the angle and strength for every wall built on top of it.

The very stone the builders threw away becomes the one holding everything together.

That reversal is the whole point of the psalm Jesus just quoted.

👑 The corner stone matters most of all

🏗️ It sets the strength for the whole wall

🔄 The rejected stone becomes the key stone

📖 Rejection does not get the final word

## 😨 They Sought To Lay Hold On Him, But Feared The People

These leaders wanted Jesus arrested right then and there.

Fear of the crowd is the only thing holding them back.

They understood that this parable was spoken straight at them.

So they walk away for now instead of acting on their anger.

😨 They wanted Jesus arrested immediately

👥 Fear of the crowd held them back

🎯 They knew the parable targeted them

📖 Their anger waits instead of acting now

## 🎯 They Knew That He Had Spoken The Parable Against Them

These leaders are not confused about who the parable was aimed at.

They understand immediately that the wicked husbandmen represent them specifically.

Clear understanding is exactly why their anger turns toward wanting Him arrested.

Knowing the truth about themselves does not lead them to repent here.

🎯 They know the parable targets them

😡 Clear understanding fuels their anger

🙅 Truth does not lead them to repent

📖 Knowing and changing are not the same

# Mark 12:13-17
# 💰 Render To Caesar
---
## 🤝 Certain Of The Pharisees And Of The Herodians

Pharisees and Herodians normally could not stand each other.

Pharisees resented Roman rule over Israel.

Herodians supported Herod's political alliance with Rome instead.

These two opposite groups team up for one single purpose, to trap Jesus.

A shared enemy is strong enough to override their usual conflict.

🤝 Pharisees and Herodians usually opposed each other

👑 Herodians supported Herod's alliance with Rome

🎯 Both teamed up with one goal, trapping Jesus

📖 A shared enemy overrides their usual conflict

## 💰 Is It Lawful To Give Tribute Unto Caesar

Tribute here means a tax the Jewish people had to pay directly to Rome.

Saying yes would make Jesus look like he supported Roman rule over Israel.

Saying no would make him look like he was inciting rebellion against Rome.

Either answer, on its own, hands His enemies a weapon to use against Him.

💰 Tribute means a tax paid to Rome

👍 A yes makes Him look pro Rome

👎 A no makes Him look rebellious

📖 Either answer alone becomes a weapon

## 😏 Knowing Their Hypocrisy

Jesus sees straight through the flattering question these men just asked.

Calling Him true and fair was not sincere respect.

It was a setup designed to make the trap look harmless.

Jesus names the trick out loud instead of falling into it.

😏 Jesus sees through their flattering question

🎭 Their praise was not sincere at all

🪤 It was a setup, not real respect

📖 Jesus names the trick instead of falling in

## 🪙 Bring Me A Penny, That I May See It

The coin Jesus asks for was a Roman denarius, not an actual English penny.

It was a small silver coin, about a day's wage for a common worker.

Asking to see it puts the coin itself on display for everyone watching.

What is stamped on that coin is about to become the whole point.

🪙 The coin was a Roman denarius

💵 It equaled about a day's wage

👀 Jesus puts the coin on display

📖 What is stamped on it becomes the point

## 👑 Whose Is This Image And Superscription

The image stamped on the coin was Caesar's own face.

The superscription was Caesar's title, naming him as a son of a god.

Carrying that coin meant living under Rome's economy, whether anyone liked it or not.

Jesus lets the coin answer its own question before He says a word.

👑 The image on it was Caesar's face

📜 The title named Caesar as a god's son

💱 Carrying it meant living under Rome's economy

📖 The coin answers before Jesus even speaks

## ⚖️ Render To Caesar The Things That Are Caesar's

Render means to give back what is rightfully owed.

Caesar's coin, Caesar's economy, gets a fitting payment back to Caesar.

God's image stamped on every human being gets a different kind of payment.

Jesus is not dodging the question.

He is reframing what is actually owed.

Loyalty to an earthly government and loyalty to God are not the same debt.

⚖️ Render means giving back what is owed

🪙 Caesar's coin gets a payment back to Caesar

🧑 God's image on people gets a different debt

📖 Earthly and heavenly loyalty are not the same

## 😲 And They Marvelled At Him

His answer leaves no safe angle for His accusers to attack.

It does not pick a side in their trap at all.

Instead, it reframes the whole question onto higher ground.

Even the men trying to catch Him walk away impressed instead of satisfied.

😲 His answer leaves no safe angle

🚫 It refuses to pick either side

⬆️ It reframes the question on higher ground

📖 His accusers leave impressed, not satisfied

# Mark 12:18-23
# 🤔 The Sadducees' Trick Question
---
## 🤔 The Sadducees, Which Say There Is No Resurrection

Sadducees were a religious group inside Judaism with real political power.

Unlike the Pharisees, they did not believe in a resurrection of the dead.

They only accepted the first five books of Moses as fully authoritative.

That belief shapes the exact question they are about to ask Jesus.

🤔 Sadducees held real religious and political power

🚫 They denied any resurrection of the dead

📚 They trusted only the five books of Moses

📖 Their belief shapes the question they ask next

## 👫 If A Man's Brother Die, And Leave His Wife Behind Him

This law comes from Deuteronomy and is called levirate marriage.

If a man died without children, his brother was required to marry the widow.

Any child from that marriage legally carried on the dead brother's name and inheritance.

This law protected the widow and kept the family line from disappearing.

👫 This law comes from Deuteronomy directly

💍 A brother had to marry the widow

👶 A child carried on the dead man's name

📖 The law protected widows and family lines

## 🔢 Now There Were Seven Brethren

The Sadducees build an extreme example on purpose.

One woman ends up married, in turn, to seven different brothers.

Each brother dies before leaving her any children of her own.

The exaggeration is meant to make resurrection sound absurd, not just unlikely.

🔢 Seven brothers marry the same woman

💭 The example is exaggerated on purpose

😵 Every single brother dies childless

📖 It is built to make resurrection sound absurd

## ❓ Whose Wife Shall She Be Of Them

This is the actual trap hidden inside the whole story.

If resurrection is real, the Sadducees assume it creates an unsolvable mess.

Seven marriages cannot all still apply once everyone is raised from the dead.

To them, the confusion itself proves resurrection cannot be true.

❓ The question hides the real trap

🧩 They assume resurrection creates an unsolvable mess

🙅 Seven marriages cannot all still apply

📖 Confusion is their proof against resurrection

## 😶 The Seven Had Her, And Left No Seed

Every single brother in this story fails to have a child.

Repeating that outcome seven times is not an accident in the story.

It drives home just how impossible this scenario is meant to feel.

😶 Every brother leaves no children behind

🔁 Repeating it seven times is deliberate

🎭 It makes the scenario feel impossible

📖 The impossibility is the whole point

## ⚰️ Last Of All The Woman Died Also

The woman outlives every single husband she was given.

Her death closes out the hypothetical with a flat, final line.

Nothing in the story has been resolved by the time she dies.

The Sadducees leave the mess unsolved on purpose, waiting for Jesus to fail at it.

⚰️ She outlives every husband in the story

🔚 Her death ends the story unresolved

🪤 The trap is left open for Jesus

📖 They expect Him to fail at it

# Mark 12:24-27
# ✝️ God Of The Living
---
## 📖 Ye Know Not The Scriptures, Neither The Power Of God

Jesus answers with a direct correction, not a gentle one.

Their whole question rests on two separate blind spots.

They have misread what scripture actually teaches about the resurrection.

They have also underestimated what God's own power can actually do.

📖 Their question rests on two blind spots

📚 They misread what scripture actually teaches

💪 They underestimate what God's power can do

➡️ Both mistakes feed the same wrong question

## 💍 They Neither Marry, Nor Are Given In Marriage

Jesus is not describing an empty or lonely kind of existence.

Marriage, in this life, exists partly to grow and continue a family line.

In the resurrection, death no longer threatens anyone's family line.

That specific need marriage filled on earth simply will not exist anymore.

💍 Marriage partly exists to continue a family

♾️ Death no longer threatens anyone after this

🚫 That specific need will no longer exist

➡️ This is not emptiness, it is a change

## 👼 But Are As The Angels Which Are In Heaven

This comparison is not about becoming a different kind of being entirely.

It is about no longer being limited the way life on earth limits people.

Angels are not subject to death, so marriage for that purpose is not needed.

The comparison answers exactly the narrow point the Sadducees raised, nothing more.

👼 It does not mean becoming a new being

⏳ Angels are not limited by death

🚫 So marriage for that reason is not needed

➡️ It answers only the narrow point raised

## 🔥 I Am The God Of Abraham, And The God Of Isaac, And The God Of Jacob

Jesus quotes God speaking to Moses from the burning bush.

God does not say He was their God in the past tense.

He says it in the present tense, long after all three men had died.

That single verb tense becomes Jesus's whole proof that the resurrection is real.

🔥 God speaks to Moses from the bush

⏰ God uses present tense, not past tense

⚰️ This is long after all three died

📖 One verb tense becomes Jesus's whole proof

## ☀️ He Is Not The God Of The Dead, But The God Of The Living

If God still calls Himself their God, they must still exist to Him somehow.

A relationship cannot continue with someone who is simply gone forever.

This line is Jesus's conclusion, not just a repeated restatement of the bush story.

It states plainly that life continues under God's care beyond physical death.

☀️ God still calls Himself their God today

🤝 A relationship needs someone still present

🎯 This line is Jesus's conclusion, not a repeat

📖 Life continues under God beyond death

# Mark 12:28-31
# ❤️ The Greatest Commandment
---
## 📜 Which Is The First Commandment Of All

This scribe is not trying to trap Jesus like the groups before him.

Jewish teachers had identified over six hundred individual commands in the law.

Ranking them by importance was a genuine and respected question among teachers.

This scribe genuinely wants to know what matters most.

📜 This scribe is not setting a trap

🔢 Jewish law held over six hundred commands

🎓 Ranking commands was a respected question

➡️ He genuinely wants to know what matters most

## ☀️ The Lord Our God Is One Lord

This line opens the Shema, the central prayer of Jewish faith.

Faithful Jews recited this exact line every single morning and evening.

It declares that Israel's God is one, not many competing gods.

Jesus starts His answer with the most basic truth of all, who God is.

☀️ This opens the Shema, Israel's core prayer

🗣️ Faithful Jews recited it daily

☝️ It declares God is one, not many

➡️ Jesus starts with who God actually is

## 💗 With All Thy Heart, And With All Thy Soul, And With All Thy Mind, And With All Thy Strength

This command does not divide a person into separate, competing parts.

Heart points to a person's will and deepest desires.

Soul points to a person's whole life and being.

Mind points to a person's thoughts and reasoning.

Strength points to a person's actual effort and action.

Together they ask for all of a person, not just a feeling.

💗 Heart means a person's will and desire

🧠 Mind means a person's thoughts and reasoning

💪 Strength means effort and action, not feeling alone

➡️ This command asks for all of a person

## 🤝 Thou Shalt Love Thy Neighbour As Thyself

Jesus adds a second command the scribe did not even ask for.

Loving God and loving other people are not two separate religions.

They are two sides of the very same obedience.

Neighbour here is not limited to people who are easy to love.

Loving yourself honestly, not selfishly, becomes the measuring stick for loving others.

🤝 Jesus adds a command not even asked for

🔗 Loving God and loving people are linked

🌍 Neighbour is not limited to easy people

📖 Self love becomes the measuring stick for others

## 🗣️ Hear, O Israel

These words open the most repeated prayer in Jewish life.

Hear here means more than just listening with the ears.

It means listening in a way that leads to actually obeying.

Jesus begins His whole answer with a call to pay real attention.

🗣️ Hear opens Israel's most repeated prayer

👂 Hear means more than listening passively

✅ It means listening that leads to obeying

📖 Jesus opens with a call to attention

# Mark 12:32-34
# 🧎 Not Far From The Kingdom
---
## 🔥 More Than All Whole Burnt Offerings And Sacrifices

This scribe repeats Jesus's answer back in his own words.

Then he adds his own striking conclusion about what matters most.

Loving God and neighbour outweighs every animal sacrifice offered at the temple.

That is a bold thing for a scribe to say inside Jerusalem's own temple courts.

🔥 The scribe repeats Jesus's answer back

💭 He adds his own striking conclusion

🐑 Love outweighs every animal sacrifice offered

📖 This is bold to say inside the temple

## 👏 Thou Art Not Far From The Kingdom Of God

Jesus notices this scribe answered with real understanding, not just cleverness.

This is one of the few moments in this chapter where an opponent is praised.

Not far does not mean he has already arrived.

It means he is standing closer to the truth than most people around him.

👏 Jesus praises real understanding, not cleverness

🌟 This is a rare praised moment here

🚶 Not far does not mean already arrived

📖 He stands closer to truth than most

## 🤐 No Man After That Durst Ask Him Any Question

Durst is an old word that simply means dared.

After this exchange, nobody else steps forward to challenge Jesus publicly.

Every trick question so far has backfired on the person who asked it.

Silence becomes the safest option left for His opponents.

🤐 Durst is an old word for dared

🛑 Nobody else steps forward to challenge Him

🪃 Every trick question has backfired so far

📖 Silence becomes the safest option left

## 👆 For There Is One God, And There Is None Other But He

The scribe is not just repeating Jesus for the sake of agreement.

He personally affirms that there is only one true God.

This matches the exact Shema Jesus had just quoted a moment earlier.

Agreement like this from a scribe was genuinely rare in these exchanges.

👆 The scribe personally affirms one God

🔁 This matches the Shema Jesus just quoted

🤝 Real agreement from a scribe was rare

📖 He is not just repeating words to please

# Mark 12:35-37
# 👑 David's Son, David's Lord
---
## 🤔 How Say The Scribes That Christ Is The Son Of David

Jewish teachers commonly taught that the coming Messiah would be a descendant of King David.

That teaching was correct as far as it went.

Jesus is about to show that it is not the whole picture.

Being David's descendant does not fully explain who the Messiah actually is.

🤔 Teachers taught Messiah descends from David

✅ That teaching was correct, but incomplete

❓ Jesus points to a bigger picture

➡️ Being David's heir is not the whole story

## 🎵 The Lord Said To My Lord, Sit Thou On My Right Hand

Jesus quotes Psalm 110, a psalm David himself wrote.

In that psalm, David calls someone else his own Lord.

Sitting at someone's right hand was a position of highest honor and shared authority.

David is pointing to someone greater than himself, long before that person was even born.

🎵 Jesus quotes Psalm 110, written by David

👑 David calls this person his own Lord

✋ The right hand means highest honor

📖 David points ahead to someone greater

## ❓ David Therefore Himself Calleth Him Lord

If David calls Him Lord, the Messiah cannot simply be David's descendant in the ordinary sense.

A son, under the normal custom of that culture, did not outrank his own father.

Jesus lets this question sit in the open without supplying His own answer out loud.

The crowd listening clearly enjoys watching the religious experts struggle with it.

❓ A descendant should not outrank his father

🧩 Jesus leaves the question open on purpose

😄 The crowd enjoys watching experts struggle

📖 The Messiah is more than David's heir

## 😊 And The Common People Heard Him Gladly

The religious experts are left stumped by this exchange.

The ordinary crowd reacts in a very different way.

Gladly here describes real joy, not polite tolerance.

These were the very people the religious leaders often looked down on.

They are the ones who actually welcome what Jesus is teaching.

😊 Gladly means real joy, not politeness

🙇 These were people leaders looked down on

❤️ They actually welcome Jesus's teaching

📖 Ordinary people respond better than experts here

# Mark 12:38-40
# ⚠️ Beware Of The Scribes
---
## 👀 Beware Of The Scribes

Beware is a real warning, not advice.

Jesus is telling the crowd to watch these men closely.

The danger is not their teaching position itself.

The danger is how that position gets used against vulnerable people.

👀 Beware is a real warning, not advice

🎓 The danger is not the position itself

⚠️ The danger is how it gets misused

📖 Jesus warns the crowd to watch closely

## 👘 Which Love To Go In Long Clothing

Long, flowing robes were expensive and impractical for actual daily work.

Wearing one in public was a visible way to announce religious status.

Jesus is not criticizing clothing itself here.

He is naming the desire to be noticed and admired by everyone watching.

👘 Long robes were expensive and impractical

👀 Wearing one announced religious status publicly

🚫 Jesus is not against clothing itself

📖 He names the desire to be admired

## 🏛️ The Chief Seats In The Synagogues, And The Uppermost Rooms At Feasts

Synagogue seating followed a strict order based on a person's social rank.

The best seats faced the congregation so everyone could see who was sitting there.

The same pattern repeated at dinner parties and public feasts.

Chasing the best seat at every event becomes its own quiet form of worship.

🏛️ Seating followed strict social rank

👀 Best seats faced the crowd on purpose

🍽️ The same pattern repeated at feasts

📖 Chasing status becomes its own worship

## 💸 Which Devour Widows' Houses

Widows in this culture had almost no legal protection of their own.

Some scribes managed a widow's estate and quietly drained it for themselves.

Long, impressive prayers were sometimes used to build trust before taking advantage of her.

The very people trusted to protect the vulnerable were preying on them instead.

💸 Widows had almost no legal protection

🤝 Some scribes managed and drained their estates

🙏 Long prayers built trust before the theft

📖 Protectors became predators on the vulnerable

## ⚖️ These Shall Receive Greater Damnation

Greater here does not describe a different kind of judgment entirely.

It describes a judgment that weighs heavier because of greater trust abused.

Religious position does not earn anyone a lighter standard.

If anything, it raises the standard instead.

⚖️ Greater means heavier, not just different

🏋️ More trust abused means more weight

🎓 Religious position is not a free pass

📖 It actually raises the standard instead

# Mark 12:41-44
# 🪙 The Widow's Two Mites
---
## 👀 Beheld How The People Cast Money Into The Treasury

The temple treasury sat in the Court of Women, open for anyone to see.

Wealthy worshippers often gave loudly enough for others to notice the amount.

Jesus sits and watches the whole scene unfold without saying a word yet.

What He notices is not what anyone else in that courtyard is noticing.

👀 The treasury sat in the Court of Women

📢 Wealthy givers often gave loudly and visibly

🧘 Jesus watches quietly before saying anything

📖 He notices what nobody else does

## 🪙 Two Mites, Which Make A Farthing

A mite was the smallest coin in common use in that economy.

Two mites together added up to one farthing, a tiny fraction of a day's wage.

This was not a respectable gift by any normal standard of giving.

Mark makes sure to spell out exactly how small this amount really was.

🪙 A mite was the smallest coin around

💵 Two mites equaled a tiny farthing

📏 It was not a respectable gift by size

📖 Mark spells out exactly how small it was

## 🙌 This Poor Widow Hath Cast More In Than All They

Jesus is not doing simple math when He says this.

By coin count, the wealthy clearly gave far more than she did.

Jesus is measuring the gift against what each person had left over afterward.

By that measure, she gave more than every wealthy giver combined.

🙌 Jesus is not doing simple coin math

⚖️ He measures against what is left over

💰 Wealthy givers kept plenty left over

📖 By that measure, she gave the most

## 💔 Of Her Want Did Cast In All That She Had

Want here means need, not desire.

She gives out of what she actually needed to survive, not out of comfortable extra.

The wealthy gave out of their abundance and never felt the loss.

She gave her whole living, with nothing held back for tomorrow.

💔 Want means need, not desire

🏦 The wealthy gave from comfortable extra

🫳 She gave everything, with nothing held back

📖 Her small gift cost her everything

## 🌾 Even All Her Living

Living here means her whole means of support, not just spare change.

She does not know where her next meal is coming from after this.

Yet she gives it all to God without being asked to.

Jesus holds this up as the clearest example of trust in this entire chapter.

🌾 Living means her whole means of support

❓ She does not know what comes next

🙏 She gives anyway without being asked

📖 Jesus holds her up as the clearest example
`.trim();

export const MARK_TWELVE_PERSONAL_SECTIONS = parseMarkTwelveRawNotes(MARK_TWELVE_RAW_NOTES);
