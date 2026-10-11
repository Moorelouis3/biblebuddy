export type ActsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsThreeRawNotes(rawText: string): ActsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 3:${startVerse}` : `Acts 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 3 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_THREE_RAW_NOTES = `# Acts 3:1-3
# 🏛️ Going Up To Pray
---
## 🏛️ Went Up Together Into The Temple

"The temple" means the one Herod had rebuilt, still standing in Jerusalem.

Peter and John are now apostles of the risen Christ.

They still keep the same daily habit of temple prayer.

Following Jesus never meant abandoning every familiar practice.

The new faith grew up inside the old rhythms of worship.

🏛️ Temple means Herod's rebuilt temple

🙏 Peter and John still worship there

📿 Old habits continued after Pentecost

📖 New faith grew inside old rhythms

## 🕒 The Hour Of Prayer Being The Ninth Hour

Jewish days were counted in hours starting at sunrise.

The ninth hour lands around three in the afternoon.

Devout Jews paused for set prayer times each day.

The ninth hour was one of those fixed appointments.

Peter and John were keeping a lifelong rhythm, not a special trip.

🕒 Ninth hour means about three afternoon

☀️ Days were counted from sunrise

📿 Prayer times were fixed, not random

➡️ A daily habit, not a special visit

## 🚶 Lame From His Mother's Womb

This man had never once walked in his entire life.

His condition was not an injury or a passing illness.

Every single day someone else had to carry him there.

A lifetime of total dependence sits behind that one short phrase.

What happens later in the chapter interrupts decades of that same routine.

🚶 Lame from birth, never once walked

📆 This was lifelong, not temporary

🤝 Others carried him every day

➡️ Decades of routine are about to break

## 🚪 The Gate Of The Temple Which Is Called Beautiful

"Alms" means money or food given to the poor.

The Beautiful gate was a busy entrance near the temple courts.

Heavy foot traffic made it a good spot for begging.

Friends placed him there on purpose, not by accident.

He was placed there so worshippers heading inside would notice him.

🚪 Beautiful gate was a busy entrance

🙏 Alms means money or food for the poor

👥 Heavy foot traffic made begging possible

➡️ He was placed there on purpose

# Acts 3:4-6
# 🪙 Something Greater Than Silver
---
## 👀 Fastening His Eyes Upon Him

"Fastening his eyes" means staring with full, steady attention.

This was not a quick, polite glance in passing.

Peter wanted the man to look back at him directly.

"Look on us" asked for real attention before anything else happened.

Peter was about to give him something, not just notice him.

👀 Fastening eyes means steady full attention

🙅 Not a quick glance in passing

🗣️ Look on us asked for his attention

➡️ Attention came before the miracle

## 💰 Expecting To Receive Something Of Them

The man assumed Peter and John carried coins like everyone else.

Begging at that gate usually earned a little money, not a miracle.

He had no idea what was actually about to happen.

His hope was small compared to what he was about to get.

💰 He expected ordinary coins

🙏 Begging usually earned small gifts

😮 He had no idea what was coming

➡️ His small hope was about to be outgrown

## 🪙 Silver And Gold Have I None

Peter owned no money to give this man.

The apostles had given up personal wealth to follow Jesus.

Peter names his own poverty honestly, without embarrassment.

What he offers next costs him nothing in coin and everything in faith.

🪙 Peter had no money to give

🙌 He admits his poverty openly

✝️ He followed Jesus instead of wealth

➡️ What he gives is worth more than coin

## ✝️ In The Name Of Jesus Christ Of Nazareth Rise Up And Walk

"In the name of" does not mean reciting a magic formula.

It means acting with Christ's own authority behind the words.

Peter is not healing by his own power at all.

The command is simple, direct, and immediate.

Everything that happens next belongs to Jesus, not to Peter.

✝️ In the name of means by Christ's authority

🙅 Not a magic phrase repeated

🗣️ The command is short and direct

📖 The healing belongs to Jesus, not Peter

# Acts 3:7-10
# 🦵 Strength Returns Instantly
---
## 🤝 Took Him By The Right Hand And Lifted Him Up

Peter does not just speak and walk away.

He physically takes the man's hand and pulls him upright.

Faith here comes with real, hands on action.

The miracle involved both a word and a touch.

🤝 Peter physically lifted him up

🗣️ The word and the touch worked together

💪 Faith showed up as action

➡️ Healing was personal, not distant

## 🦶 His Feet And Ankle Bones Received Strength

Luke, who wrote this book, was a physician by training.

He names the exact body part healed, not just "his legs."

Ankle bones carry a person's entire weight when standing.

A lifetime of weakness was reversed in a single moment.

🦶 Ankle bones carry a person's full weight

🩺 Luke wrote with a physician's precision

⚡ Strength came instantly, not slowly

📖 A lifetime of weakness reversed at once

## 🙌 Walking And Leaping And Praising God

The man tests his new strength in stages.

First he leaps, then he stands, then he walks.

He had never done any of these three things before.

Praising God was his first response, not an afterthought.

Joy came out before any explanation ever did.

🦵 He leaped, stood, and walked in stages

🆕 None of these were ever possible before

🙌 Praise came before any explanation

📖 Joy was his first honest response

## 👀 They Knew That It Was He Which Sat For Alms

This was not a stranger who suddenly appeared healed.

People recognized him as the same beggar from that same gate.

Many of them had walked past him for years without a second thought.

The familiar face made the miracle impossible to dismiss or doubt.

👀 They recognized the same beggar

📆 Many had passed him for years

🚫 No one could call him a stranger

➡️ A familiar face made the miracle undeniable

## 😲 Filled With Wonder And Amazement

This reaction was not polite applause or mild surprise.

"Wonder and amazement" describes genuine shock at something impossible.

A man born lame simply does not start walking.

The crowd's confusion sets up the sermon Peter is about to preach.

😲 Wonder means genuine shock, not mild surprise

🚫 Lifelong lameness does not simply end

❓ The crowd has no explanation yet

➡️ Their confusion opens the door for Peter

# Acts 3:11-16
# 🗣️ Peter Preaches At Solomon's Porch
---
## 🏛️ The Porch That Is Called Solomon's

"Solomon's porch" was a long covered walkway along the temple courts.

It kept the name even though Solomon's own temple was long gone.

It was a common meeting spot for teaching and conversation.

A crowd could gather there quickly without blocking the temple itself.

Jesus himself had taught in this same spot before.

🏛️ Solomon's porch was a covered walkway

📛 Kept Solomon's name after his temple was gone

👥 A common spot for teaching and talk

📖 Jesus had taught in this same place

## 🙅 By Our Own Power Or Holiness

Peter immediately refuses credit for what just happened.

The crowd is staring at him like he performed the miracle himself.

"Holiness" here means his own personal goodness or spiritual rank.

Peter insists plainly that neither his power nor his character did this.

🙅 Peter refuses the credit immediately

💪 Power would mean his own ability

🙏 Holiness would mean his own goodness

➡️ Neither one caused this healing

## 👴 The God Of Abraham And Of Isaac And Of Jacob

Naming all three patriarchs together was a familiar way to name Israel's God.

Every listener in that crowd grew up hearing this exact phrase.

Peter is not introducing a new or foreign God.

He is pointing straight back to the God they already claim to worship.

👴 Names Abraham, Isaac, and Jacob together

📖 A familiar way to name Israel's God

🚫 Not a new or foreign God

➡️ Peter points to the God they already know

## ⚖️ Denied Him In The Presence Of Pilate When He Was Determined To Let Him Go

Pilate was the Roman governor who judged Jesus's case.

Pilate himself had already decided to release Jesus.

The crowd's own pressure overturned Pilate's decision instead.

Peter is naming an uncomfortable truth to the very people who did it.

⚖️ Pilate was the Roman governor

🙅 Pilate wanted to release Jesus

📢 Crowd pressure overturned that decision

➡️ Peter names this truth to the crowd itself

## 🔓 Desired A Murderer To Be Granted Unto You

This "murderer" is Barabbas, the prisoner released instead of Jesus.

The crowd had chosen a violent criminal over an innocent man.

Peter is not inventing a new accusation here.

He is reminding them of a choice they already made.

🔓 The murderer was Barabbas

✝️ Jesus was innocent of any crime

📢 The crowd chose Barabbas instead

📖 Peter reminds them of their own choice

## 👑 Killed The Prince Of Life Whom God Hath Raised From The Dead

"Prince of life" is a title, not just a description.

It names Jesus as the source and ruler of life itself.

Killing him could not actually end that life.

Peter and John say plainly that they personally saw him raised.

👑 Prince of life means ruler over life

🚫 Death could not hold that life down

👀 Peter and John witnessed the resurrection

📖 Life itself cannot stay dead

## 🙏 His Name Through Faith In His Name Hath Made This Man Strong

Peter repeats "his name" twice on purpose in this one line.

The strength did not come from Peter's own hands at all.

It came through faith placed in Jesus specifically.

Peter keeps steering credit away from himself, again.

🙏 Faith in Jesus caused the healing

🙅 Not Peter's own hands or power

🔁 His name is repeated on purpose

➡️ Peter keeps pointing away from himself

# Acts 3:17-21
# 🧼 A Call To Repent
---
## 🤷 I Wot That Through Ignorance Ye Did It

"Wot" is an old word that simply means know.

Peter says their guilt came from ignorance.

This was not pure malice.

Even the religious leaders acted without fully understanding who Jesus was.

Peter's tone here offers mercy, not just blame.

🤷 Wot simply means know

😕 Ignorance explains but never excuses

👤 Even the leaders misunderstood who Jesus was

➡️ Peter offers mercy along with the truth

## 📜 Shewed By The Mouth Of All His Prophets That Christ Should Suffer

"Shewed" is an old spelling of showed.

God had already announced a suffering Messiah through many prophets.

The crucifixion was not a plan that failed.

Human sin carried out exactly what God had already announced.

📜 Shewed means showed

🗣️ Many prophets announced a suffering Messiah

🚫 The cross was not a failed plan

📖 Human sin fulfilled God's own announcement

## 🧼 Repent Ye Therefore And Be Converted That Your Sins May Be Blotted Out

"Repent" means a real change of mind and direction, not just regret.

"Converted" means actually turning around, not just feeling sorry.

"Blotted out" pictures a debt record wiped completely clean.

Ancient ink could be washed away, leaving no trace behind.

That is the picture Peter uses for what forgiveness actually does.

🧼 Repent means a real change of direction

🔄 Converted means actually turning around

📜 Blotted out pictures a wiped clean record

📖 Forgiveness leaves no trace behind

## 🌬️ The Times Of Refreshing Shall Come From The Presence Of The Lord

"Refreshing" pictures relief after a long, exhausting season.

Peter promises this relief comes directly from God's own presence.

It is not a reward people earn through effort alone.

It flows out of being near God himself.

🌬️ Refreshing means relief after exhaustion

🙏 It comes from God's presence

🚫 Not something earned by effort alone

➡️ Nearness to God is the real relief

## 🔧 Must Receive Until The Times Of Restitution Of All Things

"Restitution" means restoring something to its proper, original condition.

Peter is describing a future when everything broken gets repaired.

Heaven currently holds Jesus until that future moment arrives.

This points forward to Christ's eventual return.

🔧 Restitution means putting things right again

🌍 A future repair of everything broken

⏳ Jesus is held in heaven until then

📖 This points to Christ's eventual return

# Acts 3:22-26
# 📜 The Prophets Point To Christ
---
## 📖 A Prophet Shall The Lord Your God Raise Up Unto You Like Unto Me

Peter is quoting Moses directly from the book of Deuteronomy.

Moses had promised a future prophet greater than himself.

Peter identifies that promised prophet as Jesus.

The whole quote is meant to be heard, not summarized.

📖 Peter quotes Moses from Deuteronomy

🙋 Moses promised a future greater prophet

✝️ Peter says that prophet is Jesus

➡️ An old promise lands on a new name

## ⚠️ Every Soul Which Will Not Hear That Prophet Shall Be Destroyed

This is a direct warning, not a side comment.

Refusing to listen to this prophet carries real, lasting consequences.

"Hear" here means obey, not simply listen with the ears.

Peter is raising the stakes before he even finishes his sermon.

⚠️ A direct warning, not a side note

👂 Hear here means obey, not just listen

🚫 Ignoring this prophet carries real consequences

➡️ The stakes are raised before the sermon ends

## 📚 All The Prophets From Samuel And Those That Follow After

Samuel is named as the starting point of Israel's prophets.

Before Samuel, there were judges and occasional individual messengers.

After Samuel, a continuous line of prophets carried God's word.

Peter says that entire line was pointing toward this moment.

📚 Samuel marks the start of the prophetic line

👨‍⚖️ Before him came judges and messengers

🔁 After him came a continuous line of prophets

📖 That whole line pointed to this moment

## 🤝 Ye Are The Children Of The Prophets And Of The Covenant

"The covenant" refers back to God's promise to Abraham.

Peter tells this crowd they are heirs of that very promise.

"Thy seed" in that promise ultimately points to Christ himself.

Every family on earth was promised a blessing through that one descendant.

🤝 The covenant is God's promise to Abraham

👪 This crowd are heirs of that promise

✝️ Thy seed points to Christ

➡️ The blessing was always meant for every nation

## 🥇 Unto You First

"Unto you first" does not mean the blessing stops with this crowd.

It means this audience hears the message before anyone else does.

The gospel is about to reach far beyond this one crowd.

Jewish listeners are given priority, not an exclusive claim.

🥇 First means priority, not exclusive

👂 This crowd hears the message first

🌍 The message later reaches everyone else

➡️ Priority is not the same as limit

## 💔 In Turning Away Every One Of You From His Iniquities

"Iniquities" means sins, specific patterns of wrongdoing.

Peter names the real blessing being offered right now.

It is not wealth, status, or an easy life.

The blessing itself is turning away from exactly those sins.

💔 Iniquities means sins or wrongdoing

🎁 Peter names the real blessing offered

🚫 Not wealth or an easy life

📖 The blessing is turning away from sin
`.trim();

export const ACTS_THREE_PERSONAL_SECTIONS = parseActsThreeRawNotes(ACTS_THREE_RAW_NOTES);
