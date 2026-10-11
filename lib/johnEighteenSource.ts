export type JohnEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnEighteenRawNotes(rawText: string): JohnEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 18:${startVerse}` : `John 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 John 18 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_EIGHTEEN_RAW_NOTES = `# John 18:1-3
# 🏞️ Judas Leads Them To The Garden
---
## 🗺️ Over The Brook Cedron

The brook Cedron ran along the eastern edge of Jerusalem.

It separated the city from the Mount of Olives.

King David once crossed this same brook fleeing his own son Absalom.

Jesus crosses it now on his way to his own betrayal.

🗺️ Cedron ran along Jerusalem's eastern edge

🏔️ It separated the city from Olivet

👑 David once crossed it fleeing Absalom

📖 Jesus crosses it toward his own betrayal

## 🌿 Where Was A Garden

This chapter never names the garden directly.

The other Gospels call it Gethsemane.

Gethsemane means oil press, named for the olive groves around it.

Jesus often prayed here, away from the noise of the city.

🌿 John never names this garden

📜 Other Gospels call it Gethsemane

🫒 Gethsemane means oil press

📖 Jesus often prayed in this quiet place

## 🗝️ Judas Also Knew The Place

Judas was not a stranger sneaking in from outside.

He had walked this same ground with Jesus many times before.

That familiarity is what makes this betrayal so painful.

Betrayal cuts deepest when it comes from someone who knew you well.

🗝️ Judas was not a stranger here

🚶 He walked this ground with Jesus often

💔 Familiarity makes this betrayal painful

📖 Betrayal cuts deepest from someone close

## 🔦 Lanterns And Torches And Weapons

This was no quiet arrest of a cooperative man.

The crowd arrived prepared for a struggle that never came.

Lanterns and torches suggest they expected Jesus to hide in the dark.

Jesus meets this show of force by simply walking forward.

🔦 They came prepared for a struggle

🌑 Lanterns suggest they expected hiding

🚶 Jesus walks forward to meet them

📖 Force meets a man with nothing to hide

# John 18:4-11
# ⚔️ Whom Seek Ye
---
## 👁️ Knowing All Things That Should Come Upon Him

Jesus is not caught off guard by any of this.

He already knows exactly what is about to happen to him.

That knowledge does not make him run or hide.

Instead he walks forward and meets the armed crowd himself.

👁️ Jesus already knows what is coming

🚫 This knowledge does not make him flee

🚶 He walks forward to meet them

📖 Full knowledge does not stop his courage

## 🗣️ Whom Seek Ye

Jesus speaks first, before anyone can accuse him of hiding.

The question puts him in control of this moment, not the mob.

He forces them to name exactly who they came for.

A prisoner does not usually open the conversation this way.

🗣️ Jesus speaks first, not the mob

🎯 He puts himself in control here

❓ He forces them to name their target

📖 A prisoner rarely opens this way

## 🙋 I Am He

Jesus answers with a short, direct phrase in Greek, ego eimi.

That same phrase echoes God's own name revealed to Moses.

John often uses it to point at who Jesus really is.

This is not just an introduction, it carries real weight.

🙋 Jesus answers with ego eimi

🔥 That phrase echoes God's name to Moses

📚 John uses this phrase on purpose

📖 A simple answer carries real weight

## 😳 They Went Backward And Fell To The Ground

This reaction does not fit a simple name and answer.

Armed soldiers do not normally fall down from two words.

Many readers see a flash of divine power in this moment.

Jesus controls even his own arrest without lifting a hand.

😳 This reaction is far from normal

⚔️ Armed men fall from two words

⚡ Many see divine power here

📖 Jesus controls his arrest without a hand

## 🛡️ Let These Go Their Way

Jesus is being arrested, yet he still protects his friends.

He asks for the disciples to be allowed to leave safely.

His own danger does not stop him from thinking of them.

Love for others keeps showing up even in his worst hour.

🛡️ Jesus protects his friends while arrested

🚶 He asks for their safe release

❤️ His danger does not stop his care

📖 Love shows up even in his worst hour

## 📖 Of Them Which Thou Gavest Me Have I Lost None

This exact promise was spoken only hours earlier in chapter seventeen.

Jesus prayed that none of his own would be lost.

Protecting them physically now is one way that prayer gets answered.

A promise prayed in private is now kept out in public.

🔁 This echoes his prayer in chapter seventeen

🙏 Jesus prayed none would be lost

🛡️ Protecting them answers that prayer

📖 A private promise is kept in public

## ⚔️ Simon Peter Having A Sword

Peter carries a weapon even though Jesus never asked him to fight.

Swords were common for travelers, not just soldiers, in this period.

Peter reacts the way many of us would, with force first.

His instinct is to protect Jesus the wrong way.

⚔️ Peter carries a weapon that night

🧳 Travelers often carried swords back then

💥 Peter reacts with force first

📖 He protects Jesus the wrong way

## 👂 The Servant's Name Was Malchus

Only John tells us this servant's actual name.

Malchus likely belonged to the high priest as a household servant.

Naming him suggests this detail came from someone who was there.

Small details like this make the account feel like eyewitness memory.

👂 Only John names this servant

🏠 Malchus likely served in the priest's house

👀 Naming him suggests an eyewitness source

📖 Small details carry the weight of memory

## 🍷 The Cup Which My Father Hath Given Me

In the Old Testament, a cup often pictures God's judgment or wrath.

Jesus describes his coming suffering using that same picture.

He is not forced into this, he accepts it from the Father's own hand.

Rebuking Peter shows Jesus choosing his path on purpose.

🍷 A cup often pictures God's judgment

🤝 Jesus accepts this from the Father

🙅 He is not being forced into it

📖 Jesus chooses this path on purpose

# John 18:12-14
# ⛓️ Led Away To Annas First
---
## ⛓️ The Band And The Captain

The captain here likely commanded a unit of Roman soldiers.

Having Roman forces present shows this arrest had Rome's backing already.

Jesus is bound here even though he offered no resistance at all.

Binding a willing prisoner reveals fear more than real danger.

⛓️ A Roman captain led this unit

🪖 Rome backed this arrest from the start

🙅 Jesus offered no resistance at all

📖 Binding him reveals fear, not danger

## 🧔 Led Him Away To Annas First

Annas had once held the office of high priest himself.

Rome removed him years earlier, but he still held real influence.

Bringing Jesus to Annas first shows where the true power sat.

Titles can change while actual authority stays in the same hands.

🧔 Annas once served as high priest

🏛️ Rome removed him but not his power

👑 Jesus goes to him first

📖 Authority can outlast an official title

## 👑 Father In Law To Caiaphas

Caiaphas was the high priest in office that specific year.

He was married into Annas' family, keeping power inside one household.

High priest families often arranged these ties to control the office.

This single family shaped much of Jerusalem's religious power at the time.

👪 Caiaphas was Annas' son in law

🏠 Power stayed inside one family

🤝 Families arranged these ties on purpose

📖 One household shaped the city's religious power

## 🔮 It Was Expedient That One Man Should Die

Caiaphas said this same thing once before, back in chapter eleven.

He meant it as cold political strategy to avoid a Roman crackdown.

Without realizing it, he was describing exactly what God intended.

Caiaphas spoke a human calculation that became an unintended prophecy.

🔮 Caiaphas said this once before

🏛️ He meant it as political strategy

🙏 He was unknowingly describing God's plan

📖 A political calculation became a prophecy

# John 18:15-18
# 🚪 Peter Follows Into The Courtyard
---
## 🕵️ Another Disciple

John never names himself directly anywhere in his own Gospel.

Many readers believe this unnamed disciple is John the author himself.

Writing this way keeps the attention on Jesus, not the writer.

Humility can show up in what a person leaves out.

🕵️ John never names himself in this book

📝 Many think this disciple is John

🎯 This keeps attention on Jesus, not him

📖 Humility shows in what gets left out

## 🚪 Her That Kept The Door

A servant girl was given the job of watching the entrance.

This was an ordinary household task, not a position of power.

Peter's fate in this scene rests on a conversation with her.

Even small, ordinary people end up shaping this story.

🚪 A servant girl guarded the entrance

👤 This was an ordinary household job

🗣️ Peter must answer to her directly

📖 Ordinary people end up shaping this story

## 🙅 He Saith, I Am Not

Minutes earlier Peter was swinging a sword to defend Jesus.

Now a single question from a servant makes him deny everything.

Fear works differently than courage under pressure in the moment.

Bravery with a weapon and bravery with the truth are not the same.

⚔️ Peter swung a sword minutes earlier

🙅 One question makes him deny Jesus

😰 Fear works differently under pressure

📖 Physical bravery and honest bravery differ

## 🔥 A Fire Of Coals

Peter warms himself at a charcoal fire in the cold night.

This small detail returns later, after Jesus rises from the dead.

John eighteen puts Peter at a fire where he denies Jesus.

John twenty one will put him at a fire where Jesus restores him.

🔥 Peter warms himself at this fire

❄️ The cold night made a fire needed

🔁 A fire returns in chapter twenty one

📖 This fire later brings restoration back

# John 18:19-24
# ⚖️ The High Priest Asked Of His Doctrine
---
## 📖 Asked Of His Doctrine

Doctrine here simply means the body of what Jesus taught.

The high priest wants to know if Jesus led a secret movement.

This questioning is really searching for a political threat, not truth.

Caiaphas already decided the verdict long before this conversation began.

🧠 Doctrine means what Jesus actually taught

🕵️ He is searching for a political threat

⚖️ This is not an honest trial

📖 Caiaphas had already decided the verdict

## 🌍 I Spake Openly To The World

Jesus insists he has no secret teaching hidden from anyone.

He taught publicly in synagogues and in the temple itself.

This directly denies any accusation of plotting in the shadows.

A movement built on secrecy would not survive this kind of scrutiny.

🌍 Jesus taught publicly, with nothing hidden

🏛️ He taught in synagogues and the temple

🙅 This denies any secret plotting

📖 Open teaching does not fear scrutiny

## 👥 Ask Them Which Heard Me

Jesus points the high priest toward actual witnesses who heard him.

Jewish law required multiple witnesses before anyone could be condemned.

Jesus is demanding they follow their own legal standards honestly.

Instead the room answers him with violence, not with witnesses.

👥 Jesus points to real witnesses

⚖️ Jewish law required multiple witnesses

🗣️ He demands a fair legal process

📖 Violence answers him instead of witnesses

## 👋 Struck Him With The Palm Of His Hand

Striking a prisoner before any verdict was against proper legal conduct.

This officer punishes Jesus simply for asking a reasonable question.

The scene shows how little real justice is happening in this room.

Power without accountability quickly turns into cruelty.

👋 Striking a prisoner broke legal conduct

😠 He is punished for a fair question

⚖️ Little real justice happens in this room

📖 Power without accountability turns cruel

## ⚖️ If I Have Spoken Evil Bear Witness Of The Evil

Jesus answers the blow with a calm, direct legal challenge.

He asks them to name his actual crime instead of hitting him.

No one in the room can answer that simple question honestly.

Silence from his accusers says more than any testimony could.

⚖️ Jesus answers with a legal challenge

❓ He asks them to name his crime

🤐 No one can answer honestly

📖 Their silence speaks louder than testimony

## 🏛️ Whither The Jews Always Resort

Resort here means a place people gather regularly, not a vacation.

The same word described Jesus visiting the garden back in verse two.

Jesus taught in the open, in places everyone already expected him.

There was never anything hidden about where or how he taught.

🏛️ Resort means a regular gathering place

🔁 The same word appeared back in verse two

👀 Jesus taught where everyone expected him

📖 Nothing about his teaching was hidden

## 🔁 Annas Had Sent Him Bound Unto Caiaphas

This verse quietly confirms Jesus already moved from Annas to Caiaphas.

The two men shared power so closely the handoff barely needed mention.

Being bound the entire time shows Jesus was never treated as free.

Every step of this process already assumed his guilt.

🔁 This confirms the move to Caiaphas

🤝 Annas and Caiaphas shared power closely

⛓️ Jesus stayed bound the whole time

📖 Every step already assumed his guilt

# John 18:25-27
# 🐓 Peter Denies Again
---
## 🔥 Simon Peter Stood And Warmed Himself

The scene returns to Peter standing at the same charcoal fire.

He is physically close to Jesus' trial without actually helping him.

Standing near danger is not the same as standing up for someone.

Peter's body is present while his courage has already left.

🔥 Peter stands at the same fire

📍 He stays physically close to the trial

🙅 Closeness is not the same as courage

📖 His courage has already left him

## 🙅 He Denied It And Said I Am Not

This is the second time Peter uses this exact short denial.

Jesus predicted this exact pattern happening three times before dawn.

Peter is living out a prediction he probably hoped would not come true.

Watching a prophecy unfold can feel very different from hearing it.

🙅 This is Peter's second denial

🔮 Jesus predicted this exact pattern

😔 Peter hoped this would not happen

📖 Watching prophecy unfold feels different

## 👂 Being His Kinsman Whose Ear Peter Cut Off

This servant is personally related to Malchus, the man Peter wounded.

Recognizing Peter here carries real danger, not just curiosity.

Peter is being identified by the very violence he committed earlier.

His past action is now the thing that threatens to expose him.

👂 This man is related to Malchus

⚠️ Recognizing Peter carries real danger

⚔️ Peter's own violence helps expose him

📖 His past action threatens him now

## 🐓 Immediately The Cock Crew

Roosters crowing marked a known point in the early morning hours.

Jesus told Peter this sound would follow his third denial exactly.

The timing lands precisely the way Jesus already said it would.

A small, ordinary sound becomes proof that Jesus truly sees ahead.

🐓 Rooster crowing marked the early morning

🔮 Jesus predicted this exact timing

🎯 It lands precisely as he said

📖 An ordinary sound proves he sees ahead

# John 18:28-32
# 🏛️ Led To The Hall Of Judgment
---
## 🏛️ The Hall Of Judgment

This hall was Pilate's official residence and headquarters in Jerusalem.

Romans called this kind of building a praetorium.

Jesus now stands before Rome's actual political power, not just religious leaders.

The scene shifts from a religious trial to a political one.

🏛️ This was Pilate's official headquarters

🏢 Romans called it a praetorium

⚖️ Jesus now faces Rome's political power

📖 The trial shifts from religious to political

## 🧼 Lest They Should Be Defiled

Entering a Gentile's home could make a Jewish person ceremonially unclean.

Staying outside let the leaders keep the Passover on schedule.

They guard a ritual rule while pushing for an unjust execution.

Careful religious practice and real injustice can sit side by side.

🧼 Entering could cause ceremonial uncleanness

📅 Staying outside protected their Passover plans

⚖️ They push for an unjust execution

📖 Ritual care and injustice sit together

## 🚶 Pilate Then Went Out Unto Them

Pilate leaves his own headquarters to meet the Jewish leaders outside.

This small accommodation shows how carefully he manages this situation.

Rome needed local cooperation to keep the peace in Jerusalem.

Even a governor sometimes has to bend to local pressure.

🚶 Pilate steps outside to meet them

🤝 He manages the situation carefully

🏛️ Rome needed local cooperation here

📖 Even a governor bends to pressure

## ⚖️ If He Were Not A Malefactor

Malefactor simply means someone who does evil or breaks the law.

The leaders never actually state what crime Jesus supposedly committed.

Their answer avoids the real question Pilate just asked them.

A charge without real evidence behind it is not really a charge.

⚖️ Malefactor means someone who does evil

🤐 They never name his actual crime

❓ Their answer avoids the real question

📖 A charge needs real evidence behind it

## 📜 It Is Not Lawful For Us To Put Any Man To Death

Rome had taken away the Jewish council's power to execute prisoners.

They needed Pilate specifically because of the method they wanted.

Crucifixion was a Roman punishment, not a Jewish one like stoning.

Their request quietly points toward the exact death Jesus had foretold.

📜 Rome removed their power to execute

⚔️ Crucifixion was a Roman punishment

🪨 Stoning was the Jewish method instead

📖 This points toward the death Jesus foretold

## ✝️ Signifying What Death He Should Die

Jesus had already spoken earlier about being lifted up from the earth.

That phrase was a quiet way of describing his coming crucifixion.

This verse confirms that exact kind of death is now set in motion.

Even the method of his death follows what Jesus already said.

✝️ Jesus already spoke of being lifted up

🔮 That phrase pointed to his crucifixion

🎯 This verse confirms that death is set

📖 Even the method follows his own words

# John 18:33-40
# 👑 Art Thou A King Then
---
## 👑 Art Thou The King Of The Jews

Pilate's question is political, not about Jewish religious belief at all.

King of the Jews sounded like a direct threat against Roman rule.

Rome tolerated no rival claims to political power in its territory.

This single question decides which charge Pilate will actually weigh.

👑 Pilate's question is purely political

⚔️ This title sounded like a threat to Rome

🏛️ Rome tolerated no rival rulers

📖 This question shapes the whole trial

## 🗣️ Sayest Thou This Thing Of Thyself

Jesus asks Pilate where this accusation actually came from.

He wants to know if Pilate understands the charge or is just repeating it.

This question exposes that Pilate may not grasp what he is asking.

Jesus keeps control of the conversation even while on trial.

🗣️ Jesus asks where the charge came from

🤔 He tests if Pilate understands it

🎯 This exposes Pilate's own confusion

📖 Jesus still controls this conversation

## 🤷 Am I A Jew

Pilate distances himself from any Jewish religious dispute entirely.

He admits he only knows what the religious leaders told him.

This shows Pilate has no real personal interest in the actual truth.

He wants a quick political answer, not a deep understanding.

🤷 Pilate distances himself from the dispute

📢 He only knows what leaders told him

🙅 He has no real interest in truth

📖 He wants a quick answer, not understanding

## 🌍 My Kingdom Is Not Of This World

Jesus directly answers the political fear behind Pilate's question.

His kingdom does not compete with Rome for land or armies.

This does not mean his kingdom is unreal or unimportant.

It means his kingdom works by a completely different set of rules.

🌍 Jesus answers Pilate's political fear

🏰 His kingdom does not compete with Rome

✅ This does not make it unreal

📖 It runs by completely different rules

## ⚔️ My Servants Would Fight

Jesus points out that his followers never raised an army for him.

If his kingdom worked like Rome's, soldiers would already be fighting.

Peter's one sword in the garden proves the opposite was never the plan.

This is not a king waiting to seize power by force.

⚔️ His followers never raised an army

🛡️ Soldiers would already be fighting otherwise

🔁 Peter's sword showed force was never the plan

📖 This king never seizes power by force

## ✝️ To This End Was I Born

Jesus says his entire purpose for existing points toward this moment.

He was not just born, he was born for a specific mission.

That mission is to bear witness to the truth, in front of everyone.

Even standing on trial fits inside that larger purpose.

✝️ His whole purpose points to this moment

🎯 He was born for a specific mission

📣 That mission is bearing witness to truth

📖 Even this trial fits that purpose

## 🔍 What Is Truth

Pilate asks this question but does not wait around for an answer.

The real truth is standing right in front of him already.

Pilate treats a life changing question like empty, meaningless talk.

Some people ask the biggest questions without ever truly wanting an answer.

🔍 Pilate asks but will not wait

👀 Truth stands right in front of him

🙅 He treats it like meaningless talk

📖 Some ask big questions without wanting answers

## ✅ I Find In Him No Fault At All

Pilate openly states that Jesus is innocent of any real crime.

This makes everything that happens after this moment even more unjust.

A Roman governor himself admits there is no legal case here.

Pilate will still choose politics over the verdict he just gave.

✅ Pilate openly declares Jesus innocent

⚖️ This makes what follows deeply unjust

🏛️ Even Rome finds no real case

📖 Pilate still chooses politics over justice

## 🎉 A Custom That I Should Release Unto You One

Passover season apparently included a custom of releasing one prisoner.

Pilate offers this as a way to let Jesus go without conflict.

He hands the real decision over to the crowd instead of making it himself.

Passing the choice to others does not remove his own responsibility.

🎉 Passover included releasing one prisoner

🚪 Pilate offers this as an exit

👥 He hands the choice to the crowd

📖 Passing the choice does not remove responsibility

## 🙋 Barabbas Was A Robber

Barabbas in Aramaic can mean son of the father.

The crowd rejects the true Son of the Father for this man.

Other Gospels describe Barabbas as involved in violent rebellion, not just theft.

The irony is sharp, a guilty man walks free while an innocent one does not.

🙋 Barabbas means son of the father

🔄 They reject the true Son for him

⚔️ Other Gospels link him to rebellion

📖 Guilt walks free, innocence does not
`.trim();

export const JOHN_EIGHTEEN_PERSONAL_SECTIONS = parseJohnEighteenRawNotes(JOHN_EIGHTEEN_RAW_NOTES);
