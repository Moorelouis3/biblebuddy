export type LukeTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwentyRawNotes(rawText: string): LukeTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 20:${startVerse}` : `Luke 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 20 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWENTY_RAW_NOTES = `# Luke 20:1-8
# 🔑 By What Authority Doest Thou These Things
---
## 🏛️ He Taught The People In The Temple, And Preached The Gospel

This scene happens during the last week of Jesus's life.

He teaches daily inside the temple courts in Jerusalem.

The temple was the center of Jewish worship and authority alike.

Teaching here draws the attention of the leaders who run it.

Luke already showed the leaders plotting against Him one chapter earlier.

This confrontation was always coming.

🗓️ This happens in Jesus's final week

🏛️ He teaches inside the temple courts

👀 Teaching there draws the leaders' attention

📖 Leaders were already plotting against Him

## 👥 The Chief Priests And The Scribes Came Upon Him With The Elders

These three groups together formed the Jewish ruling council.

Chief priests oversaw temple worship and its treasury.

Scribes were trained experts in the law of Moses.

Elders were senior leaders representing the people of Israel.

Together they made up the Sanhedrin, the highest Jewish court.

This is a formal delegation, not a random crowd.

⚖️ Chief priests ran temple worship and funds

📜 Scribes were trained experts in the law

👴 Elders represented the people of Israel

📖 Together they formed the Sanhedrin court

## ❓ By What Authority Doest Thou These Things

The phrase these things points back to the previous chapter.

Jesus had just driven the merchants out of the temple.

He had also been teaching there every day since.

No one had given Him an official license to do either.

Rabbis in this culture normally needed formal approval to teach publicly.

The leaders are asking where His credentials came from.

👀 These things means clearing the temple

📚 It also means His daily teaching

📜 Rabbis normally needed formal approval

📖 Leaders demand to know His credentials

## 🔄 I Will Also Ask You One Thing

Jewish rabbis often answered a hard question with another question.

Jesus uses this same method here on purpose.

His question is not a dodge or a delay.

Whatever answer they give will trap them either way.

He controls this conversation from this point forward.

The leaders walked in to test Him and walked into a test instead.

🔄 Rabbis often answered questions with questions

🎯 Jesus uses that same method here

🪤 His question traps them either way

📖 He controls the conversation from here

## 💧 The Baptism Of John, Was It From Heaven, Or Of Men

This question is really about John's whole ministry, not just his baptism.

Asking if it was from heaven asks if God sent him.

Asking if it was of men asks if John invented it himself.

The religious leaders had never publicly answered this question before.

Jesus ties His own authority to the same unanswered question.

There is no safe answer waiting for them here.

💧 This covers John's whole ministry

👆 From heaven means God sent him

🧑 Of men means John invented it

📖 No safe answer exists for them

## 🪨 All The People Will Stone Us

Most of Jerusalem already believed John was a true prophet.

Saying John's baptism was merely human would outrage the crowd.

Stoning here describes a real and immediate danger, not an exaggeration.

The leaders care more about public anger than about the truth.

Their silence exposes exactly what they are afraid of.

Popularity, not conviction, decides their answer.

👥 Jerusalem believed John was a true prophet

😠 This answer would outrage the crowd

🪨 Stoning was a real immediate danger

📖 Fear of people shaped their answer

## 🤷 They Could Not Tell Whence It Was

The leaders choose a third option instead of either answer.

They simply claim they do not know.

This answer is not honest confusion.

It is a calculated way to avoid both bad outcomes.

Refusing to decide is itself a decision.

They protect their position instead of answering the question.

🤷 They claim they simply do not know

🎭 This answer is not honest confusion

🛡️ It protects them from both outcomes

➡️ Refusing to decide is still a choice

## 🚫 Neither Tell I You By What Authority I Do These Things

Jesus does not owe them an answer they already refused to give.

He matches their refusal with a refusal of His own.

This is not Jesus avoiding the question.

It exposes that their real goal was never truth.

Their trap catches only themselves in the end.

Jesus walks away from this round completely untouched.

🚫 Jesus matches their refusal with His own

🎯 This is not Jesus avoiding the question

🪤 Their trap catches only themselves

📖 Jesus walks away from this untouched

# Luke 20:9-16
# 🍇 He Shall Come And Destroy These Husbandmen
---
## 🍇 A Certain Man Planted A Vineyard

A vineyard was a common image for Israel in Jewish Scripture.

Isaiah had already used this exact picture centuries earlier.

Listeners would recognize the image before Jesus says another word.

The man planting it clearly represents God Himself.

This parable speaks a familiar language to its first hearers.

🍇 A vineyard was a symbol for Israel

📜 Isaiah used this same image before

👂 Listeners recognized it immediately

📖 The planter represents God Himself

## 🧑‍🌾 Let It Forth To Husbandmen, And Went Into A Far Country

Husbandmen means tenant farmers who worked land they did not own.

The owner would lease his land and expect a share of the harvest.

Wealthy owners often lived elsewhere for long periods like this.

The husbandmen in this story represent Israel's religious leaders.

Distance did not cancel the owner's rightful claim.

🧑‍🌾 Husbandmen means tenant farmers

🧳 Owners often lived elsewhere for long periods

📋 They expected a share of the harvest

📖 Husbandmen represent Israel's religious leaders

## 📨 Sent Him Away Empty

The owner sends three separate servants to collect his portion of the harvest.

Each servant returns having gained nothing for his trouble.

The husbandmen beat the first, shame the second, and wound the third.

The violence gets worse with each new servant sent.

These servants represent the prophets God sent to Israel throughout its history.

Israel's history of rejecting its prophets is being retold in miniature.

📨 Three servants are sent in turn

📈 Each one suffers worse than the last

🙅 Every servant returns with nothing

📖 This retells Israel's history of rejecting prophets

## ❤️ I Will Send My Beloved Son, It May Be They Will Reverence Him

The owner has one option left after three servants fail.

Beloved son means a much loved and uniquely favored child.

Sending him shows the owner still hopes for a different response.

This son clearly represents Jesus Himself in the story.

Even now, the offer is patience, not immediate judgment.

❤️ Beloved son means uniquely favored

🙏 The owner still hopes for a change

👑 The son represents Jesus Himself

📖 Patience comes before judgment

## 🏡 This Is The Heir, Come, Let Us Kill Him

An heir would normally inherit the vineyard once the owner died.

The husbandmen plan does not make sense by any normal logic.

Killing the heir cannot actually transfer ownership to them legally.

Greed has replaced any real reasoning in their plan.

They see opportunity where there is none.

🏡 Heirs normally inherit the land

🤔 Their plan makes no real legal sense

💰 Greed replaced any real reasoning

➡️ They see an opportunity that is not there

## 👑 That The Inheritance May Be Ours

The husbandmen want permanent ownership, not just a good harvest.

This mirrors the religious leaders plotting against Jesus in this very chapter.

They want control of Israel without ever answering to God.

Jesus names their hidden motive out loud in front of everyone.

The parable has stopped being a story about someone else.

🏠 They want permanent ownership

🔁 This mirrors leaders already plotting

👑 They want control without answering to God

📖 The parable is no longer about someone else

## 🚪 So They Cast Him Out Of The Vineyard, And Killed Him

The husbandmen drag the son outside the vineyard before killing him.

Jesus Himself would be crucified outside the walls of Jerusalem.

This detail quietly matches what is about to happen to Him.

The parable predicts the exact shape of His own death.

Jesus is describing His own coming execution out loud.

🚪 The son is cast out before dying

🏙️ Jesus would die outside Jerusalem's walls

🔮 The parable predicts His own death

📖 Jesus describes His execution out loud

## ⚔️ He Shall Come And Destroy These Husbandmen, And Give The Vineyard To Others

Jesus lets the crowd supply the parable's own ending.

They predict the owner's return and his judgment without being asked.

Destroying the husbandmen means removing them from leadership entirely.

The vineyard itself is given to new caretakers, not destroyed.

Judgment falls on leadership, not on Israel as a whole.

🗣️ The crowd supplies the parable's ending

⚔️ The owner removes the husbandmen

🍇 The vineyard is given to others

📖 Judgment falls on leaders, not Israel

## 😲 God Forbid

The crowd reacts with shock once they hear their own answer out loud.

They suddenly realize what the parable is actually describing.

God forbid is a strong Jewish expression of refusal.

They understand the story but do not want to accept it.

Understanding a parable and accepting it are two different things.

😲 The crowd reacts with sudden shock

💡 They realize what the parable means

🙅 God forbid expresses strong refusal

📖 Understanding is not the same as accepting

# Luke 20:17-19
# 🪨 The Stone Which The Builders Rejected
---
## 🪨 The Stone Which The Builders Rejected, The Same Is Become The Head Of The Corner

This line quotes Psalm one hundred eighteen directly.

The head of the corner means the most important stone in a building.

Builders would reject a stone that looked useless or oddly shaped.

God takes that very stone and makes it the most essential one.

Jesus applies this ancient psalm directly to Himself.

The leaders who reject Him are fulfilling this prophecy as they do it.

📜 This quotes Psalm one eighteen

🏗️ The cornerstone is the most important stone

🙅 Builders rejected it as useless

📖 Jesus applies this psalm to Himself

## 💥 Whosoever Shall Fall Upon That Stone Shall Be Broken

This verse describes two different ways to be harmed by this stone.

Falling on the stone pictures someone who stumbles over Jesus in unbelief.

The stone falling on someone pictures final judgment crushing them instead.

Either way, this stone cannot simply be ignored or walked around.

Rejecting the cornerstone carries real consequences.

🧱 Two different images appear here

🚶 Falling on it means stumbling in unbelief

💥 It falling on someone means judgment

📖 This stone cannot be ignored

## ✋ The Same Hour Sought To Lay Hands On Him

The chief priests and scribes want to arrest Jesus immediately.

Their anger comes directly from understanding His parable correctly.

They know the husbandmen in the story represent them.

Their response proves they understood exactly what He meant.

Clarity, not confusion, provokes their anger.

✋ Leaders want Him arrested immediately

💡 Their anger shows they understood Him

🎭 They know the husbandmen represent them

📖 Clarity provoked their anger, not confusion

## 😨 They Feared The People

The leaders want Jesus arrested right away.

Public opinion is the only thing stopping them.

Many in the crowd still see Jesus as a true prophet.

Arresting Him in public could spark a riot against the leaders themselves.

Fear of people delays what hatred already decided.

😨 Fear of the crowd holds them back

👥 Many still saw Jesus as a prophet

🔥 A public arrest risked a riot

📖 Fear delays what hatred already decided

# Luke 20:20-26
# 🪙 Render Unto Caesar The Things Which Be Caesar's
---
## 🕵️ They Watched Him, And Sent Forth Spies

The leaders switch from public attack to a hidden strategy instead.

Spies here means agents sent to trap Jesus secretly.

Open arrest failed because of the crowd's support for Him.

They now try to trap Him in His own words instead.

The attack continues, only better disguised.

🕵️ Spies means secretly sent agents

🚫 Open arrest already failed them

🪤 They now try to trap His words

📖 The attack continues in disguise

## 🎭 Which Should Feign Themselves Just Men

Feign means to fake something that is not actually true.

These spies pretend to be honest seekers of truth.

Their flattering words in the next verse are part of the act.

Every compliment they give Jesus is calculated, not sincere.

Their performance is designed to lower His guard.

🎭 Feign means to fake something false

🙂 Spies pretend to be honest seekers

🗣️ Their flattery is part of the act

📖 The performance tries to lower His guard

## 🏛️ Is It Lawful For Us To Give Tribute Unto Caesar, Or No

Tribute here means a tax paid directly to the Roman emperor.

Many Jews deeply resented paying it as a mark of foreign control.

A yes answer could make Jesus look like a Roman collaborator.

A no answer could make Him look like a rebel against Rome.

The question is built to destroy Him either way He answers.

🪙 Tribute means a tax paid to Rome

😠 Many Jews resented this tax deeply

⚖️ Yes risked looking like a collaborator

📖 No risked looking like a rebel

## 👁️ He Perceived Their Craftiness

Jesus sees through their disguise immediately.

Craftiness means a clever, dishonest scheme hidden under a fair question.

Their flattery did not work on Him at all.

He is never fooled by appearances or compliments.

Jesus answers the real trap, not the fake question.

👁️ Jesus sees through their disguise

🎭 Craftiness means a hidden dishonest scheme

🙅 Flattery does not work on Him

📖 He answers the real trap

## 🪙 Shew Me A Penny

The coin Jesus asks for is a Roman denarius, not an English penny.

It carried the emperor's image and his official title stamped on it.

Carrying that coin already meant living under Roman economic rule.

The leaders produce the coin without even thinking about it.

They already use the system they claim to question.

🪙 The coin was a Roman denarius

👑 It carried the emperor's image

💰 Carrying it meant living under Rome

➡️ They already used what they questioned

## ✍️ Whose Image And Superscription Hath It

Superscription means the words and title engraved on the coin.

This coin named Caesar as a son of a god.

Jesus lets them answer their own trap question again.

They say the word Caesar before He ever has to.

The coin itself answers part of the question for Him.

✍️ Superscription means the engraved title

👑 It named Caesar a god's son

🗣️ They answer their own question first

📖 The coin itself does half the work

## ⚖️ Render Therefore Unto Caesar The Things Which Be Caesar's, And Unto God The Things Which Be God's

This answer refuses both traps the leaders set for Him.

Caesar's image on the coin means Caesar can have the coin.

Every person carries God's image instead of an emperor's.

Jesus is not dividing life into separate political and spiritual zones.

He is naming a much bigger claim God already has on them.

Give Caesar his coin. Give God yourself.

⚖️ This answer refuses both traps

🪙 Caesar's image means Caesar gets the coin

👤 People carry God's image instead

📖 God's claim is bigger than any coin

## 😮 They Marvelled At His Answer, And Held Their Peace

The spies came looking for a usable answer against Him.

Instead they leave with nothing they can use at all.

Marvelled means they were genuinely amazed, not just defeated.

Held their peace means they simply stopped talking.

Their silence says more than any words could.

🕵️ Spies leave with nothing usable

😮 Marvelled means genuine amazement

🤐 Held their peace means they stopped talking

📖 Their silence says enough on its own

# Luke 20:27-33
# 🚫 Which Deny That There Is Any Resurrection
---
## 🏛️ Certain Of The Sadducees, Which Deny That There Is Any Resurrection

Sadducees were a Jewish religious group tied closely to the temple.

They only accepted the five books of Moses as full authority.

They did not believe in any resurrection after death at all.

Pharisees, by contrast, did believe in a future resurrection.

Their question is designed to make resurrection look absurd.

🏛️ Sadducees were tied closely to the temple

📜 They accepted only the five books of Moses

🚫 They denied any resurrection after death

📖 Their question tries to mock resurrection itself

## 📜 If Any Man's Brother Die, Having A Wife

This question comes from a real law given through Moses.

If a married man died without children, his brother married his widow.

The first child born would legally continue the dead brother's name.

This law protected a widow and preserved a family's inheritance.

The Sadducees are using real Scripture to build a fake dilemma.

📜 This law came through Moses

👰 A brother married the widow

👶 The firstborn continued the dead man's name

📖 Real law builds a fake trap

## 🌱 Raise Up Seed Unto His Brother

Seed here means children who would carry on the family line.

A man without an heir was considered to have no lasting name.

This law existed to prevent that family name from disappearing.

It mattered more than personal preference in this culture.

Family continuation outweighed individual choice here.

🌱 Seed means children carrying the family line

🏷️ No heir meant no lasting name

📜 This law protected that family name

📖 Family continuation outweighed personal choice

## 🔢 There Were Therefore Seven Brethren

Seven brothers is a deliberately extreme version of the same scenario.

The Sadducees are not describing a real family they know.

They are building an absurd hypothetical on purpose.

A bigger number makes the resurrection sound more ridiculous to them.

The whole story is a rhetorical weapon, not a real case.

🔢 Seven is a deliberately extreme number

🎭 This family is not a real case

🎯 A bigger number sounds more absurd

📖 The story is a rhetorical weapon

## ⚰️ Last Of All The Woman Died Also

The woman in this story is never given a name.

She is treated purely as a legal problem to be solved.

Her own death finally closes the hypothetical story.

The Sadducees never ask what any of this meant for her.

Their question cares about logic, not about a real person.

❓ She is never given a name

📋 She is treated as a legal problem

⚰️ Her death closes the hypothetical

📖 Their question ignores her as a person

## 💍 Whose Wife Of Them Is She

This question assumes marriage in heaven works just like it does on earth.

The Sadducees expect Jesus to be stuck choosing one husband.

They think they have built an unanswerable trap.

Jesus is about to correct the entire assumption underneath the question.

The trap only works if their assumption is true.

💍 They assume heaven works like earth

🪤 They expect Jesus to be stuck

🧠 Their whole trap rests on one assumption

📖 Jesus is about to correct that assumption

# Luke 20:34-40
# 👼 They Are Equal Unto The Angels
---
## 🌍 The Children Of This World Marry, And Are Given In Marriage

This world here means life as it currently exists before the resurrection.

Marriage belongs to this present stage of human life.

Jesus is not condemning marriage or calling it unimportant.

He is simply placing it inside its proper time.

Marriage has a place, and that place has an edge.

🌍 This world means life before the resurrection

💍 Marriage belongs to this present stage

🙅 Jesus is not condemning marriage

📖 Marriage has a proper time and edge

## 🌅 Worthy To Obtain That World, And The Resurrection From The Dead

That world refers to the age that comes after the resurrection.

This is a completely different kind of existence than life now.

Jesus describes it as something people are counted worthy to reach.

The rules that govern life now do not simply carry over.

A new kind of life calls for a new kind of question.

🌅 That world means life after the resurrection

🆕 It is a different kind of existence

✅ People are counted worthy to reach it

📖 Old rules do not simply carry over

## 💍 Neither Marry, Nor Are Given In Marriage

Marriage will not continue in the same form after the resurrection.

This does not erase relationships people shared in this life.

It means the institution itself is no longer needed there.

Marriage exists partly to continue the human race through children.

That purpose simply will not apply anymore.

💍 Marriage will not continue the same way

❤️ Past relationships are not erased

🧬 Marriage helped continue the human race

📖 That purpose no longer applies there

## ☠️ Neither Can They Die Any More

Death itself will no longer exist in that resurrected life.

Marriage in this world exists partly to replace people who die.

Remove death, and that particular reason for marriage disappears with it.

This is not a loss. It is the removal of a problem.

No more death is the whole point of resurrection.

☠️ Death will no longer exist there

🔄 Marriage partly replaces those who die

🧩 Remove death, remove that reason for it

📖 No more death is the whole point

## 👼 Equal Unto The Angels

This phrase does not mean people literally become angels.

It means they share the angels' freedom from death and marriage.

Angels were already understood as immortal, unmarried beings in this culture.

Jesus borrows a familiar comparison to describe something totally new.

The comparison explains the kind of life, not the exact nature.

👼 People do not literally become angels

♾️ They share angels' freedom from death

🚫 Angels were already seen as unmarried

📖 The comparison explains the kind of life

## 👨‍👩‍👧 The Children Of The Resurrection

This phrase describes everyone who will actually be raised to that life.

It names an identity, not just a future event.

Being a child of the resurrection changes how someone belongs to God.

This new family line matters more than any family line before it.

Resurrection creates its own kind of family.

👨‍👩‍👧 This names an identity, not an event

🙌 It changes how someone belongs to God

🏷️ This family line outlasts any before it

📖 Resurrection creates its own family

## 🔥 Moses Shewed At The Bush

Jesus now argues from a text the Sadducees already fully accepted.

The burning bush story comes from the book of Exodus.

Sadducees trusted Moses even though they rejected most other Scripture.

Jesus beats them using their own accepted source.

He wins this argument on their own ground.

🔥 The bush story comes from Exodus

📜 Sadducees fully trusted the books of Moses

🎯 Jesus argues from their own source

📖 He wins the argument on their ground

## ⏳ The God Of Abraham, And The God Of Isaac, And The God Of Jacob

God speaks of these three men in the present tense, not the past.

He does not say I was their God.

All three men were long dead when this was spoken at the bush.

A present tense claim only makes sense if they are still alive somewhere.

The grammar itself argues for life after death.

⏳ God speaks in present tense here

☠️ All three men were already dead

🧠 Present tense only fits if they live

📖 The grammar argues for life after death

## ⚰️ Not A God Of The Dead, But Of The Living

This line states the conclusion of the whole argument plainly.

God is only ever described as the God of the living.

If Abraham, Isaac, and Jacob are truly dead, this title breaks.

The title only holds together if they are alive to God even now.

Resurrection is not an extra belief bolted onto Scripture.

⚰️ The title breaks if they are gone

❤️ God is only the God of the living

🧩 The title requires them to be alive

📖 Resurrection was already inside their own Scripture

## 🗣️ Master, Thou Hast Well Said

Some of the scribes openly praise this answer.

These are men who normally argue against Jesus, not for Him.

Their praise shows how solid this argument actually was.

No one in the crowd dares to ask Him anything else after this.

Even His opponents cannot find a way to answer back.

🗣️ Scribes openly praise this answer

🤝 These men usually argue against Him

💪 Their praise shows the argument's strength

📖 No one dares question Him further

# Luke 20:41-44
# 👑 David Himself Saith In The Book Of Psalms
---
## 👑 How Say They That Christ Is David's Son

Jewish teachers commonly taught that the Messiah would be David's descendant.

Jesus does not deny this teaching here.

He asks a deeper question most people had never considered.

Being David's descendant cannot be the Messiah's whole identity.

Something more is true about Him.

👑 Messiah was taught as David's descendant

🙅 Jesus does not deny that teaching

❓ He asks a deeper question instead

📖 Something more is true about Him

## 📜 The LORD Said Unto My Lord, Sit Thou On My Right Hand

This line quotes Psalm one hundred ten, written by David himself.

The first LORD in capital letters refers to God the Father.

The second Lord refers to someone David calls his own master.

David is speaking about someone greater than himself.

Sitting at the right hand describes a position of highest honor.

David points to a king above his own royal line.

📜 This quotes Psalm one hundred ten

👆 The first LORD means God the Father

👑 The second Lord is David's own master

📖 David points to someone greater than himself

## 🦶 Till I Make Thine Enemies Thy Footstool

A footstool describes complete victory over an enemy.

Ancient kings sometimes literally rested their feet on defeated rulers.

This image promises total and final conquest.

The victory belongs to the Lord David is describing, not to David himself.

This King still wins, even though the chapter ends with His arrest approaching.

🦶 A footstool means complete victory

👑 Ancient kings used this real image

⚔️ It promises total final conquest

📖 The victory belongs to this greater King

## 🤔 David Therefore Calleth Him Lord, How Is He Then His Son

This question has a real answer the scribes already miss.

The Messiah is both David's descendant and David's Lord at once.

His human line comes through David's family.

His true identity comes from somewhere far beyond that family line.

No one in the crowd offers an answer to this question.

❓ This puzzle has a real answer

🧬 The Messiah is David's own descendant

👑 He is also David's Lord

📖 No one offers an answer that day

# Luke 20:45-47
# ⚠️ Beware Of The Scribes
---
## 🗣️ In The Audience Of All The People He Said Unto His Disciples

Jesus speaks this warning loudly enough for the whole crowd to hear.

He directs it specifically to His own disciples first.

The scribes He is warning about are likely standing close enough to hear it too.

This is a public correction, not a private aside.

He wants everyone listening to notice the difference.

🗣️ Jesus speaks loudly for the crowd

👥 He aims the warning at His disciples

👂 The scribes likely hear it too

📖 This is a public correction

## 👘 Desire To Walk In Long Robes

Long robes were expensive clothing worn to display status and learning.

Ordinary working people wore short, practical garments instead.

Wearing a long robe announced importance before a scribe said a single word.

Jesus names the desire behind the clothing, not just the clothing itself.

Wanting to be noticed is the actual problem here.

👘 Long robes displayed status and learning

🧵 Ordinary people wore short practical clothes

👀 The robe announced importance silently

📖 Wanting to be noticed is the problem

## 🪑 Love Greetings In The Markets, And The Highest Seats In The Synagogues, And The Chief Rooms At Feasts

Jesus names three separate places where scribes craved public honor.

Formal greetings in the market were a public display of respect.

The highest seats in the synagogue faced the crowd for everyone to see.

The chief rooms at feasts were the most honored spots at the table.

Each one made their status visible to everyone around them.

They were chasing honor instead of chasing God.

🗣️ Greetings in the market showed respect

🪑 Front seats marked synagogue status

🍽️ Best seats marked status at feasts

📖 They chased honor instead of God

## 🏚️ Devour Widows' Houses

Widows in this culture had little legal protection or income of their own.

Some scribes managed a widow's estate and overcharged for the service.

Devour means they consumed her resources completely, not just took a small fee.

This happened under the cover of appearing to help her.

Religious authority was turned into a tool for exploitation.

👵 Widows had little legal protection

💰 Scribes managed estates and overcharged

🍽️ Devour means consuming it completely

📖 Religious authority became exploitation

## 🙏 For A Shew Make Long Prayers

Shew means an outward display meant to impress onlookers.

These long prayers were not really directed toward God.

They were performed to be seen and admired by people nearby.

Length became a substitute for sincerity.

A long prayer and a true prayer are not always the same thing.

👀 Shew means an outward display

🙏 These prayers aimed at onlookers

🎭 Length replaced real sincerity

📖 Long and true are not the same

## ⚖️ The Same Shall Receive Greater Damnation

Greater damnation means a harsher judgment than an ordinary sinner receives.

Religious position does not earn these scribes any protection.

Using that position to exploit widows makes the judgment worse, not lighter.

Jesus ends the chapter by reversing how His listeners rank religious status.

The most honored seats in this life can carry the heaviest reckoning in the next.

⚖️ Greater damnation means harsher judgment

🛡️ Position offers these scribes no protection

📈 Exploiting widows makes it worse

📖 Honored seats can carry heavy judgment
`.trim();

export const LUKE_TWENTY_PERSONAL_SECTIONS = parseLukeTwentyRawNotes(LUKE_TWENTY_RAW_NOTES);
