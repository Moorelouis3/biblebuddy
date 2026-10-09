export type LukeSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeSevenRawNotes(rawText: string): LukeSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 7:${startVerse}` : `Luke 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Luke 7 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_SEVEN_RAW_NOTES = `# Luke 7:1-5
# 🎖️ A Humble Request
---
## He Entered Into Capernaum

Capernaum was a fishing town on the north shore of the Sea of Galilee.

Jesus made it his home base for most of his Galilean ministry.

Several of his miracles in Luke already happened here.

Returning to Capernaum means returning to familiar, watching eyes.

🎣 Capernaum sat on the Sea of Galilee
🏠 Jesus used it as his home base
👀 People there already knew his work
📖 This miracle happens among familiar eyes

## A Certain Centurion's Servant, Who Was Dear Unto Him

A centurion was a Roman officer in charge of about one hundred soldiers.

Servants in that world were usually treated as property, not as people worth loving.

This servant was dear to his master, a word meaning deeply valued and loved.

That kind of affection between a Roman officer and a slave was unusual.

🎖️ Centurion means officer over a hundred men
⛓️ Servants were usually treated as property
❤️ Dear means truly valued and loved
📖 This bond was unusual for the time

## Was Sick, And Ready To Die

Ready to die means the servant was already near death.

There was no time to spare before deciding to ask for help.

The centurion's urgency explains why he reached out to a Jewish teacher at all.

A Roman officer asking a Jewish rabbi for help crossed real social lines.

⏳ Ready to die means near death
🚨 There was no time to lose
🤝 He reached across a social divide
📖 Desperation moved him to ask

## He Sent Unto Him The Elders Of The Jews

The centurion did not go to Jesus himself at first.

He sent respected Jewish elders to plead his case instead.

This shows he understood how much weight their word would carry with Jesus.

It also shows real humility, he worked through others rather than demanding help.

👴 Elders were respected Jewish leaders
🗣️ He sent them to speak for him
🙏 This showed real humility
📖 He understood how to approach Jesus

## They Besought Him Instantly

Besought means they begged, not just politely asked.

Instantly here means urgently and persistently, not immediately in time.

The elders pressed hard on Jesus to act quickly.

Their urgency matched the centurion's own desperation for his servant.

🙏 Besought means they begged earnestly
🔥 Instantly means urgent, not quick timing
📣 The elders pressed Jesus hard
📖 Their urgency mirrored the centurion's own

## He Loveth Our Nation, And Hath Built Us A Synagogue

The elders give their own reason why Jesus should help this Roman officer.

A synagogue was the local gathering place for prayer, teaching, and reading scripture.

Gentiles rarely funded Jewish religious buildings out of their own pocket.

This centurion had already shown real respect for the God of Israel before this day.

🏛️ A synagogue was the local worship hall
💰 He paid for it himself
🤝 Gentiles rarely funded Jewish religion
📖 His respect for Israel came first

# Luke 7:6-10
# 🗣️ Say In A Word
---
## I Am Not Worthy That Thou Shouldest Enter Under My Roof

Jewish teaching at the time treated a Gentile's house as a source of ceremonial uncleanness.

A strict Jewish teacher entering a Gentile home risked being seen as unclean himself.

The centurion is protecting Jesus from that social and religious cost.

His worthy here means fitting or deserving, not simply polite.

🏠 Gentile homes were seen as unclean
🛡️ He is protecting Jesus from that cost
🙇 Worthy means fitting or deserving
📖 His humility considered Jesus first

## But Say In A Word, And My Servant Shall Be Healed

The centurion believes Jesus does not need to be physically present to heal.

He trusts that Jesus's spoken word alone carries full authority over sickness.

This kind of faith in unseen power was rare even among Jesus's own followers.

He asks for a word, not a visit.

🗣️ He trusts a spoken word alone
💪 He believes in unseen authority
🌟 This faith was rare even among followers
📖 He asked for a word, not a visit

## I Also Am A Man Set Under Authority

The centurion reasons from his own daily experience in the army.

He obeys the officers above him, and soldiers obey him in turn.

He assumes sickness obeys Jesus the same way soldiers obey a commanding officer.

His logic treats Jesus's authority as total, even over invisible forces.

⚔️ He compares Jesus to army command
🫡 Soldiers obey him without question
🦠 He assumes sickness obeys the same way
📖 He saw Jesus's authority as total

## He Marvelled At Him

Marvelled means Jesus was genuinely amazed, not simply pleased.

The gospels rarely describe Jesus being surprised by anything.

This is one of the few moments his own reaction is highlighted this clearly.

A Gentile soldier's faith is what catches him off guard.

😮 Marvelled means genuinely amazed
📜 Jesus is rarely shown surprised
🎖️ A Gentile's faith caused it
📖 This reaction stood out from the rest

## I Have Not Found So Great Faith, No, Not In Israel

Israel was the nation that had waited for the Messiah for generations.

Jesus says a Roman outsider outdid all of them in simple trust.

This quietly hints that faith, not ancestry, is what matters most to God.

It previews the wider invitation to Gentiles that comes later in the story.

🇮🇱 Israel had waited longest for this
🎖️ A Gentile outdid them in faith
🌍 Faith mattered more than ancestry
📖 This hints at a wider invitation ahead

## Found The Servant Whole That Had Been Sick

Whole means completely healed, with nothing left of the sickness.

Jesus healed the servant from a distance, without ever entering the house.

The friends who returned became the witnesses to a miracle they never watched happen.

The centurion's unusual faith was matched by an unusual kind of miracle.

💯 Whole means completely healed
📍 Jesus healed from a distance
👀 Witnesses saw the result, not the act
📖 Faith and miracle matched each other

# Luke 7:11-17
# ⚰️ The Widow Of Nain
---
## A City Called Nain

Nain was a small village in Galilee, not an important or famous city.

Luke rarely names small, obscure places without a reason.

A miracle in an overlooked town matters just as much as one in Capernaum.

God's attention was never limited to the well known places.

🏘️ Nain was a small Galilean village
📍 It was not an important city
✨ Small places still mattered to Jesus
📖 God's attention was never limited

## The Only Son Of His Mother, And She Was A Widow

A widow in that culture had already lost her husband and his protection.

An only son was her last source of income and care in old age.

Losing him meant she now had no one left to provide for her.

This was not just grief.

It was also a crisis of survival.

👩 Widows depended on sons for support
👦 He was her only son
💔 His death left her with nothing
📖 Grief and survival collided together

## He Had Compassion On Her

Compassion here describes a deep, gut level ache for someone else's pain.

No one asked Jesus to help this woman, unlike the centurion's story just before.

Jesus acts purely because he sees her suffering himself.

His compassion moves before anyone requests anything from him.

💔 Compassion means a deep inward ache
🙅 No one asked him to help
👀 He acted on sight alone
📖 His mercy moved before any request

## He Came And Touched The Bier

A bier was an open frame used to carry a body to burial, not a sealed coffin.

Touching a dead body or anything carrying one made a person ceremonially unclean under Jewish law.

Jesus touches it anyway, without hesitation or concern for that rule.

His power over death outweighed any ritual risk to himself.

🪦 A bier was an open burial frame
🚫 Touching it caused ritual uncleanness
🖐️ Jesus touched it without hesitation
📖 His power outweighed the ritual risk

## Young Man, I Say Unto Thee, Arise

Jesus speaks directly to a dead man as if he could already hear him.

There is no ritual, no prayer, and no buildup before the command.

The command itself carries the same authority as his healing words elsewhere.

Death responds to his voice the same way sickness already had.

🗣️ He speaks straight to the dead
⚡ No ritual or buildup is used
💪 His command carries full authority
📖 Death obeyed his voice like sickness had

## He That Was Dead Sat Up, And Began To Speak

Sitting up and speaking proves this was full, immediate restoration, not a faint recovery.

Luke records this plainly, without exaggeration or added drama.

The crowd gets to witness the moment life clearly returns.

This miracle leaves no room for a natural explanation.

🙆 He sat up and spoke at once
📏 This was full restoration, not partial
👀 The crowd witnessed it directly
📖 No natural explanation could fit

## He Delivered Him To His Mother

This exact phrase echoes the prophet Elijah raising a widow's son in the Old Testament.

Luke's readers familiar with that story would catch the connection immediately.

Jesus is shown standing in the same line as Israel's great prophets, and beyond it.

The son is restored to the one who needed him most.

📜 This echoes Elijah's widow story
🔗 Readers would catch the connection
👑 Jesus stands above the old prophets
📖 The son returns to his mother

## A Great Prophet Is Risen Up Among Us

Fear here means reverent awe at witnessing something only God could do.

The crowd reaches for the closest category they know, a great prophet.

It is true as far as it goes, but it still understates who Jesus is.

Their praise is sincere, even if their understanding is still incomplete.

😮 Fear here means reverent awe
📣 Prophet was their closest label
⬆️ It still understates who he is
📖 Their praise, though true, falls short

## God Hath Visited His People

Visited means God has acted directly in human history, not simply watched from a distance.

The same word is used earlier in Luke for a prophecy about the coming Messiah.

The crowd senses that something larger than one miracle is happening through Jesus.

They are closer to the truth than they probably realize.

👁️ Visited means God acted directly
🔗 The same word appears earlier in Luke
🌟 Something larger than one miracle is happening
📖 They stood closer to truth than they knew

# Luke 7:18-23
# ❓ Art Thou He That Should Come
---
## The Disciples Of John Shewed Him

John the Baptist was in prison at this point in the story, arrested by Herod.

His disciples still visited him and reported what Jesus was doing.

News of Jesus's miracles reached John even behind bars.

John was not cut off from what was happening outside.

⛓️ John was in prison already
👥 His disciples visited him there
📰 News of Jesus reached him inside
📖 John was not cut off from events

## Art Thou He That Should Come, Or Look We For Another

He that should come was a known title for the promised Messiah.

John himself had already pointed to Jesus as this coming one earlier in Luke.

From prison, doubt seems to have crept into John's confidence.

Even a faithful prophet could still wrestle with real uncertainty.

👑 He that should come meant the Messiah
📜 John had already pointed to Jesus
😟 Doubt crept in from prison
📖 Even faithful prophets can wrestle with doubt

## In That Same Hour He Cured Many

Jesus does not answer John's question with a speech first.

He responds by healing people right in front of John's messengers.

The timing word same hour stresses that this happened immediately, not as a planned demonstration later.

Evidence came before explanation.

⏱️ Same hour means right away
🩺 He healed before he spoke
👀 The messengers watched it happen
📖 Evidence came before explanation

## The Blind See, The Lame Walk, The Lepers Are Cleansed, The Deaf Hear

Each of these conditions was seen as permanent and untreatable in that world.

Jesus lists blind eyes healed, lame legs walking, lepers cleansed, and deaf ears hearing, back to back.

He states them as plain facts, not as boasts.

This exact list matches an ancient prophecy about the coming Messiah in Isaiah.

🔆 These conditions were seen as permanent
📜 Jesus lists them as plain fact
🔗 The list matches Isaiah's prophecy
📖 Prophecy was happening in real time

## To The Poor The Gospel Is Preached

This is the last item on the list, and it carries special weight.

Every other item is a physical miracle anyone could witness with their own eyes.

Preaching good news to the poor requires no miracle, just someone willing to tell them.

Jesus names it as the clearest sign of all that the kingdom has arrived.

🏁 This item closes the list
👀 The others were visible miracles
📣 This one just needed to be told
📖 It was the clearest sign of all

## Blessed Is He, Whosoever Shall Not Be Offended In Me

Offended here means stumbling over Jesus or turning away from him in disappointment.

Many expected the Messiah to overthrow Rome by force, not heal quietly and preach to the poor.

Jesus warns that his kind of kingdom could disappoint those expectations.

Staying faithful through that disappointment is itself called a blessing.

🚫 Offended means stumbling away from him
⚔️ Many expected a political conqueror
😕 His kingdom could disappoint that hope
📖 Staying faithful through it is blessed

# Luke 7:24-28
# 📜 More Than A Prophet
---
## A Reed Shaken With The Wind

A reed is a tall, hollow stalk that grows near water and bends easily in any breeze.

The image describes someone who has no firm convictions and shifts with pressure.

Jesus asks the crowd if that is what they expected to find in the wilderness.

John was the exact opposite, unmoving even while sitting in a prison cell.

🌾 A reed bends easily in wind
🤷 It pictures someone with no convictions
🏜️ Jesus asks what they expected
📖 John was the opposite, unmoving

## A Man Clothed In Soft Raiment

Soft raiment means fine, comfortable, expensive clothing.

People who dressed that way lived in comfort inside royal palaces, not out in the desert.

John wore rough clothing and lived off locusts and wild honey, as Luke already showed.

The crowd did not go looking for comfort when they went to see John.

👔 Soft raiment means expensive clothing
🏰 That lifestyle belonged in palaces
🦗 John lived rough, not comfortable
📖 Comfort was never the draw

## Much More Than A Prophet

A prophet spoke God's word to the people of his own time.

John did that, but he also stood at the hinge point before the Messiah himself arrived.

His role was to prepare the way, not simply to deliver a message.

That assignment placed him above every prophet who came before him.

📢 A prophet simply spoke God's word
🚪 John prepared the way itself
⬆️ That placed him above earlier prophets
📖 His timing made his role unique

## Behold, I Send My Messenger Before Thy Face

This line is a direct quote from the prophet Malachi, written centuries earlier.

It promised a messenger who would appear right before the Lord himself arrived.

Jesus applies that ancient prophecy straight to John, in front of the crowd.

The forerunner they had been waiting for had already come and gone before their eyes.

📜 This quotes the prophet Malachi
📨 It promised a forerunner messenger
🎯 Jesus applies it directly to John
➡️ The wait described there was already over

## There Is Not A Greater Prophet Than John The Baptist

Born of women was a common way of saying every human being who ever lived.

Jesus ranks John above every prophet in the entire Old Testament.

No other verse in the gospels gives anyone else this level of praise.

John's unmatched calling was to be the last voice before the Messiah himself.

👶 Born of women means every human being
🥇 John ranks above every past prophet
🗣️ No one else gets this praise
📖 He was the last voice before Christ

## He That Is Least In The Kingdom Of God Is Greater Than He

This sounds like it is putting John down, but it is not.

John died before Jesus's death and resurrection fully opened the new covenant.

Even the smallest believer living after the cross understands something John never got to see.

Greater here is about position in God's unfolding plan, not about personal character.

🤔 This is not an insult to John
⏳ John died before the cross
🔑 Later believers see what John could not
📖 Greater means position, not character

# Luke 7:29-35
# 🧒 Children In The Marketplace
---
## Justified God, Being Baptized With The Baptism Of John

Justified means they agreed God was right and acted accordingly.

Ordinary people and tax collectors accepted John's baptism of repentance.

Tax collectors were widely hated for overcharging their own people on behalf of Rome.

Even society's outcasts recognized what the religious leaders were about to miss.

✅ Justified means agreeing God is right
🙇 Common people accepted John's baptism
💰 Tax collectors were hated outcasts
📖 Outcasts saw what leaders missed

## Rejected The Counsel Of God Against Themselves

The Pharisees and lawyers refused John's baptism.

Counsel of God here means God's plan and intention for them.

By rejecting it, they worked against their own good, not just against John.

Their refusal cost them something only they would end up losing.

🙅 Pharisees refused John's baptism
📋 Counsel means God's plan for them
⚖️ They worked against their own good
📖 Their refusal cost only themselves

## Like Unto Children Sitting In The Marketplace

Marketplace here was the open public square where children often gathered to play.

Jesus pictures two groups of children trying to play a game together.

One group refuses to join whatever the other group suggests.

The picture captures people who find fault no matter what is offered.

🧒 Marketplace was an open public square
🏪 Children often gathered there to play
🙄 One group refused every game offered
📖 This pictures endless, pointless criticism

## We Have Piped Unto You, And Ye Have Not Danced

Piping and mourning were the two common games children acted out, a wedding and a funeral.

Dancing was the expected response to joyful piping music.

Weeping was the expected response to mournful funeral songs.

The complaint is that nothing satisfies these critics no matter which mood is offered.

🎵 Piping pictured a wedding game
😢 Mourning pictured a funeral game
🙅 Neither response satisfied the critics
📖 No approach could please them

## He Hath A Devil

John lived an ascetic life, fasting often and avoiding wine and rich food.

Instead of admiring his discipline, critics claimed his strange lifestyle proved he was demon possessed.

This accusation was an easy way to dismiss him without engaging his actual message.

Attacking the messenger was simpler than answering what he said.

🍞 John fasted and avoided wine
😈 Critics called it demonic instead
🙅 This dismissed him without argument
📖 Attacking him was easier than listening

## Behold A Gluttonous Man, And A Winebibber

Jesus lived the opposite lifestyle, eating and drinking normally with others.

Critics flipped the complaint completely and called this excessive and sinful instead.

Gluttonous means eating too much, and winebibber means drinking too much wine.

Whatever lifestyle either man lived, the same critics found a way to condemn it.

🍽️ Jesus ate and drank normally
🔄 Critics flipped their complaint entirely
🍷 Winebibber means one who drinks too much
📖 Any lifestyle got condemned by them

## A Friend Of Publicans And Sinners

This insult was meant to shame Jesus by naming the company he kept.

Publicans and sinners were people the religious establishment avoided in public.

Jesus never denied the charge, because it was true, and he treated it as an honor.

Being their friend was exactly the kind of Messiah he came to be.

🤝 This named the company he kept
🙅 Religious leaders avoided these people
✅ Jesus never denied the charge
📖 He treated it as an honor

## Wisdom Is Justified Of All Her Children

Wisdom here is pictured almost like a person with her own family of followers.

Being justified means being proven right in the end by results.

Both John's and Jesus's very different lives ended up proving the same godly wisdom true.

Time and outcomes show who was right, not the loudest critics in the moment.

👩 Wisdom is pictured like a person
✅ Justified means proven right later
🔀 Two different lives proved the same truth
📖 Outcomes settle what critics could not

# Luke 7:36-39
# 🧴 The Woman With The Alabaster Box
---
## One Of The Pharisees Desired Him That He Would Eat With Him

Meals in that culture often happened in a semi open courtyard, not a private sealed room.

Local townspeople could wander in and observe without actually sitting down to eat.

This explains how a woman with a known reputation could enter uninvited.

Simon's invitation was not nearly as private as a modern dinner would be.

🏡 Meals happened in open courtyards
👀 Townspeople could wander in and watch
🚪 This explains the woman's entry
📖 The meal was never fully private

## A Woman In The City, Which Was A Sinner

This description marked her as someone with a widely known, disgraceful reputation.

Everyone in the room would have instantly recognized who Luke meant by this phrase.

Her reputation made her an outsider in a respectable Pharisee's home.

She came anyway, knowing exactly how she would be viewed by everyone there.

⚠️ This marked a widely known reputation
👥 Everyone would recognize the label
🚫 It made her an outsider here
📖 She came anyway, despite the risk

## An Alabaster Box Of Ointment

Alabaster was a soft, pale stone carved into small sealed jars for perfume.

The ointment inside was expensive, often worth months of an ordinary person's wages.

For many women, a jar like this doubled as a kind of savings or dowry.

Bringing it here meant she was prepared to give up something costly and personal.

🪨 Alabaster was a carved stone jar
💰 The ointment cost months of wages
👰 It often served as a woman's savings
📖 She gave up something costly and personal

## Wash His Feet With Tears

Guests walked dusty roads in open sandals, so washing feet was a basic act of hospitality.

Normally a servant performed this task, never an honored guest at the table.

This woman used her own tears instead of water, an act of raw, uncontrolled emotion.

Her grief and gratitude came out physically, in full view of everyone watching.

🦶 Foot washing was basic hospitality
🧺 A servant usually did this task
😭 She used tears instead of water
📖 Her emotion poured out openly

## Wipe Them With The Hairs Of Her Head

A respectable woman kept her hair bound up in public at all times.

Letting it down in front of strange men was considered scandalous and deeply intimate.

She used it anyway as a towel for Jesus's feet, ignoring how it looked.

Her devotion mattered more to her than her own reputation in that moment.

💇 Loose hair in public was scandalous
🧻 She used it as a towel
🙈 She ignored how it looked
📖 Devotion outweighed her reputation

## If He Were A Prophet, Would Have Known Who And What Manner Of Woman This Is

Simon assumes a true prophet would sense her sinful reputation and push her away.

His silent judgment is aimed at both the woman and at Jesus for allowing it.

The irony is that Jesus does know exactly who she is, completely.

Unlike Simon's assumption, knowing the truth is exactly why Jesus lets her stay.

🤔 Simon doubts Jesus can tell
⚖️ He silently judges them both
🎯 Jesus already knows the full truth
📖 Knowing her is why he welcomes her

# Luke 7:40-43
# 💰 The Two Debtors
---
## Master, Say On

Master here was a respectful title for a teacher, not a term of full submission.

Simon invites Jesus to continue speaking, unaware of where the words are headed.

Jesus is about to answer a judgment Simon never said out loud.

Simon is about to hear his own private thoughts reflected back at him.

🗣️ Master was a respectful teacher's title
👂 Simon invites Jesus to continue
🧠 Jesus answers an unspoken thought
📖 Simon is about to judge himself

## A Certain Creditor Which Had Two Debtors

A creditor is someone owed money, and a debtor is someone who owes it.

Jesus sets up a simple story using a relationship everyone in the room understood.

Two different people owe the same creditor very different amounts.

The story is designed to lead Simon to a conclusion before he realizes where it is going.

💰 A creditor is owed money
🧾 A debtor owes money back
👥 Two different debts are compared
📖 The story leads Simon somewhere unseen

## The One Owed Five Hundred Pence, And The Other Fifty

A single pence, or denarius, was about one full day's wage for a laborer.

Five hundred pence meant close to five hundred days of work to repay.

Fifty pence was a real debt too, but a fraction of the other amount.

Both debts were genuine, just on very different scales.

🪙 A pence equaled a day's wage
📅 Five hundred pence meant years of labor
📉 Fifty pence was a smaller real debt
📖 Both debts were real, just unequal

## He Frankly Forgave Them Both

Frankly here means freely and without any strings attached.

Neither debtor earned or paid back a single coin of what they owed.

The creditor absorbs the entire loss himself in both cases.

Jesus then asks which debtor will love him more because of it.

🤲 Frankly means freely, no strings
🚫 Neither one repaid anything
💸 The creditor absorbed the loss
📖 Forgiveness, not payment, produces love

## Thou Hast Rightly Judged

Simon answers correctly that the one forgiven more will love more.

He has just stated the principle without yet applying it to himself.

Jesus is about to turn this exact logic directly onto Simon and the woman.

Getting the right answer in theory is not the same as living it out.

✅ Simon gives the correct answer
🪞 He has not applied it yet
🔄 Jesus is about to turn it on him
📖 Right answers still need living out

# Luke 7:44-50
# 🕊️ Thy Faith Hath Saved Thee
---
## Thou Gavest Me No Water For My Feet

Offering water for a guest's feet was one of the most basic duties of a host.

Simon skipped this simple courtesy for Jesus entirely.

The sinful woman washed his feet with her own tears instead.

Jesus names the missing courtesy plainly, without raising his voice.

💧 Foot water was basic hospitality
🙅 Simon skipped it completely
😭 She gave tears in its place
📖 Jesus named the gap plainly

## Thou Gavest Me No Kiss

A greeting kiss on the cheek was the normal way to welcome an honored guest.

Simon left Jesus unwelcomed in this ordinary, expected way.

The woman kissed his feet repeatedly from the moment she arrived.

A small, routine courtesy was withheld while an extraordinary one was given freely.

💋 A greeting kiss was expected
🙅 Simon withheld even that
👣 She kissed his feet instead
📖 Routine courtesy was missing, devotion was not

## My Head With Oil Thou Didst Not Anoint

Anointing a guest's head with oil was a common mark of honor and welcome.

This was a cheap, ordinary oil, nothing costly or unusual to offer.

Simon left out even this small gesture toward Jesus.

The woman instead used expensive perfumed ointment on his feet, not his head.

🫗 Head oil was a common honor
💵 It was cheap and ordinary
🙅 Simon left this out too
📖 She gave costly ointment instead

## Her Sins, Which Are Many, Are Forgiven, For She Loved Much

This does not mean her love earned her forgiveness.

Her forgiveness came first, and her extravagant love is what poured out because of it.

Someone forgiven a small debt feels only a small amount of relief and gratitude.

Her tears and devotion reveal how much she already understood had been forgiven.

🚫 Love did not earn forgiveness
🔄 Forgiveness came first, love followed
📏 Small relief produces small gratitude
📖 Her devotion revealed what she understood

## To Whom Little Is Forgiven, The Same Loveth Little

This line is aimed quietly at Simon, not at the woman.

It does not mean Simon sinned less than she did.

It means Simon never recognized his own need for forgiveness in the first place.

A person blind to their own debt cannot feel the relief of having it canceled.

🎯 This line targets Simon quietly
⚖️ It is not about less sin
🙈 Simon missed his own need
📖 Unseen debt brings no felt relief

## Thy Sins Are Forgiven

Jesus speaks forgiveness directly over her, the same way he did for a paralyzed man earlier in Luke.

Only God was understood to have the authority to forgive sin itself.

Jesus makes this claim openly, in a Pharisee's own house, in front of witnesses.

He is not just commenting on her situation, he is acting with divine authority.

🗣️ Jesus speaks forgiveness directly
👑 Only God held that authority
🏠 He claimed it openly, in public
📖 This was a claim to be God

## Who Is This That Forgiveth Sins Also

The other guests ask this question among themselves, not to Jesus directly.

Their question is really about his identity, not just his behavior.

Forgiving sins was something only God could rightfully do.

Their confusion points, even without meaning to, straight at the truth about him.

🤷 Guests questioned among themselves
❓ The real question was his identity
👑 Only God could forgive sin
📖 Their confusion pointed at the truth

## Thy Faith Hath Saved Thee, Go In Peace

Her faith, not her tears or the costly ointment, is named as what saved her.

Her extravagant actions were the visible evidence of that faith, not the cause of her salvation.

Go in peace sends her away with a settled, restored standing before God.

She entered as a known sinner and leaves as a forgiven, faithful woman.

🙏 Faith, not actions, saved her
👁️ Her actions showed faith, not earned it
🕊️ Go in peace means restored standing
📖 She left forgiven and faithful
`.trim();

export const LUKE_SEVEN_PERSONAL_SECTIONS = parseLukeSevenRawNotes(LUKE_SEVEN_RAW_NOTES);
