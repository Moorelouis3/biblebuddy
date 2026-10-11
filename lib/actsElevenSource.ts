export type ActsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsElevenRawNotes(rawText: string): ActsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 11:${startVerse}` : `Acts 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 11 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_ELEVEN_RAW_NOTES = `# Acts 11:1-3
# ⚖️ Called To Account In Jerusalem
---
## 📰 The Gentiles Had Also Received The Word Of God

News of what happened at Cornelius's house traveled fast.

It reached the apostles and believers back in Jerusalem before Peter himself did.

Nothing this significant could stay quiet for long.

A door had opened that could never be closed again.

📰 News of Cornelius reached Jerusalem fast

🚪 A major door had just opened

⏳ Peter had not even arrived yet

📖 This change could not stay hidden

## 🏙️ Peter Was Come Up To Jerusalem

Travelers always spoke of going "up" to Jerusalem, no matter which direction they came from.

The city sat high on a ridge, both geographically and in importance to Jewish life.

Peter is heading straight into the center of Jewish religious authority.

That makes this meeting far more serious than a casual conversation among friends.

🏙️ Jerusalem sat high, literally and spiritually

🧭 "Up" described the city's importance

⚖️ Peter faced real religious authority here

📖 This was no casual conversation

## 👥 They That Were Of The Circumcision Contended With Him

"The circumcision" refers to Jewish believers who still held firmly to the law of Moses.

"Contended" means they argued sharply, not that they simply disagreed in passing.

These were fellow believers in Jesus, not outside opponents.

The earliest church is already wrestling with what following Jesus requires of a Gentile.

👥 Circumcision means law observant Jewish believers

🗣️ Contended means a sharp, real argument

🤝 These were fellow believers, not enemies

📖 The church is working out its own boundaries

## 🍽️ Thou Wentest In To Men Uncircumcised, And Didst Eat With Them

The real complaint was not that Gentiles heard the gospel.

Baptizing Gentiles might have been forgiven as an exception.

Eating at a Gentile table broke a deeply held rule about ritual purity.

Sharing a meal was the one detail they could not let go.

🍽️ Eating together was the real complaint

⚖️ Baptism alone might have been excused

🚫 Shared meals broke a strict purity rule

📖 One meal exposed the bigger question

# Acts 11:4-10
# 🔁 Peter Retells The Vision
---
## 📋 Rehearsed The Matter From The Beginning, And Expounded It By Order

"Rehearsed" means Peter told the whole story again, step by step.

"By order" means he laid it out in the exact sequence it happened.

He is not improvising a defense on the spot.

Peter answers a serious accusation with patient, orderly truth instead of a quick excuse.

📋 Rehearsed means telling the full story again

🔢 By order means the exact sequence

🙅 Peter does not improvise an excuse

📖 Patient truth answers a serious charge

## 📦 A Certain Vessel Descend, As It Had Been A Great Sheet

Peter describes the same sheet already shown to him on the rooftop in Joppa.

It held every kind of animal, the clean and the unclean mixed together.

He is retelling this to people who were not there and never saw it.

Every detail matters now because his whole defense rests on what God actually showed him.

📦 The same sheet from the rooftop vision

🐍 Clean and unclean animals mixed together

👥 His hearers never saw this themselves

📖 His defense rests on these exact details

## 🙅 Not So, Lord: For Nothing Common Or Unclean

Peter reminds the Jerusalem believers of his own first reaction.

He refused the command exactly the way they would have refused it.

His objection proves he was not looking for a reason to break the law.

Peter needed convincing just as much as the men listening to him now.

🙅 Peter repeats his own first refusal

⚖️ He reacted exactly as they would have

🚫 He was not seeking a loophole

📖 Peter needed convincing too

## 🧼 What God Hath Cleansed, That Call Not Thou Common

This is the one line Peter needs his listeners to hear most clearly.

The voice from heaven overruled Peter's lifelong training, not the other way around.

Peter is not defending his own opinion about Gentiles.

He is reporting a direct command that came from God himself.

🧼 The turning point of the whole vision

🗣️ A command from heaven, not Peter's idea

📜 It overruled his lifelong training

📖 Peter reports God's order, not his own view

## 🔁 This Was Done Three Times, And All Were Drawn Up Again Into Heaven

Three repeats removed any excuse for Peter to claim he misunderstood.

The sheet then rose back into heaven the same way it had come down.

That detail shows the vessel was never an earthly object Peter could have staged.

It was a vision sent from God and returned to God once its message landed.

🔁 Three repeats removed any confusion

🌤️ The sheet rose back into heaven

🚫 It was never an earthly object

📖 A vision from God, returned to God

# Acts 11:11-14
# ✉️ The Men And The Angel's Message
---
## 🚪 Immediately There Were Three Men Already Come Unto The House

Peter points out the timing on purpose.

The men from Caesarea arrived at the very moment his vision ended.

A coincidence this exact was never really a coincidence at all.

Peter wants his listeners to see God's hand lining up every piece in advance.

🚪 The men arrived right as the vision ended

⏳ The timing was exact, not random

🧩 God lined up every piece in advance

📖 Peter wants the timing noticed

## 👥 These Six Brethren Accompanied Me

"Nothing doubting" means Peter went with the men despite his own confusion about the vision.

He adds a detail not mentioned back in Acts chapter ten, that six believers went with him from Joppa.

Six witnesses plus Peter made seven total men who could confirm every part of the story.

Peter is building his case on numbers his accusers can check for themselves.

👥 Six brethren joined Peter from Joppa

🔢 Seven total witnesses to the whole event

🧮 Peter offers numbers that can be checked

📖 Faith moved him before full understanding did

## 🏠 Send Men To Joppa, And Call For Simon, Whose Surname Is Peter

Peter repeats the angel's instructions to Cornelius word for word.

The same exact name and the same exact city appear again in this retelling.

Nothing about this story has shifted or softened in the retelling.

Consistency across two tellings is itself part of Peter's defense.

🏠 The same exact name and city again

🔁 Nothing shifted between the two tellings

✅ Consistency itself supports the defense

📖 Peter's story holds together under scrutiny

## 🙏 Whereby Thou And All Thy House Shall Be Saved

This detail was not included when Cornelius's story was told back in Acts chapter ten.

The angel told Cornelius plainly that Peter's own words would bring salvation to his household.

An angel could deliver the vision, but only a person could deliver the saving message.

God designed this whole sequence around the preaching of the gospel, not around visions alone.

🙏 A new detail not told in chapter ten

👼 Angels cannot preach the saving message

🗣️ Only Peter's words could bring salvation

📖 God built this around the gospel, not visions

# Acts 11:15-18
# 🕊️ Then Hath God Also To The Gentiles Granted Repentance Unto Life
---
## 🔥 The Holy Ghost Fell On Them, As On Us At The Beginning

"At the beginning" points back to the day of Pentecost in Acts chapter two.

Peter says plainly that Cornelius's household received the exact same experience the apostles did.

No lesser version and no partial measure was given to these Gentile believers.

The same Spirit that launched the church in Jerusalem now falls in a Roman soldier's home.

🔥 At the beginning means Pentecost in Acts two

⚖️ Gentiles received the same experience, not less

🏠 This happened in a Roman soldier's home

📖 One Spirit, poured out the same way twice

## 💧 Ye Shall Be Baptized With The Holy Ghost

Peter remembers a specific promise Jesus made before ascending into heaven.

John's baptism only used water, but Jesus promised something greater still to come.

Seeing that promise fulfilled on Gentiles convinces Peter this moment truly came from God.

A remembered promise becomes the proof Peter needed in the moment.

💧 Jesus promised this before his ascension

🌊 John's baptism used water alone

✅ Fulfillment on Gentiles proved it was from God

📖 A remembered promise became Peter's proof

## 🤷 What Was I, That I Could Withstand God

"Withstand" means to stand against or resist something.

Peter asks this as a real question, not a dramatic flourish.

If God already gave Gentiles the same gift given to Jewish believers, no human objection can outrank that.

Peter's whole defense comes down to a single honest admission of his own limits.

🤷 Withstand means to resist or stand against

❓ A genuine question, not a performance

⚖️ God's gift outranks any human objection

📖 The defense ends in honest humility

## 🙌 Then Hath God Also To The Gentiles Granted Repentance Unto Life

"Repentance unto life" means turning from sin in a way that leads into real, lasting life with God.

The Jerusalem believers stop arguing the moment they hear the whole story in order.

Silence first, then praise, shows genuine hearts changing in real time, not just a debate being settled.

What began as an accusation against Peter ends as worship directed toward God.

🙌 Repentance unto life means turning toward God

🤐 Silence came before the praise

❤️ Hearts changed, not just an argument

📖 An accusation ended in worship

# Acts 11:19-21
# 🌍 The Gospel Reaches Antioch
---
## 🏃 Scattered Abroad Upon The Persecution That Arose About Stephen

This callback reaches back to the stoning of Stephen in Acts chapter seven.

That violence scattered believers out of Jerusalem into surrounding regions.

What looked like a disaster for the church became the very thing that spread the gospel further.

Persecution meant to crush the church instead pushed it outward.

🏃 Points back to Stephen's stoning

💥 Violence scattered believers from Jerusalem

🌱 The scattering spread the gospel further

📖 Persecution pushed the church outward

## 🗺️ Phenice, And Cyprus, And Antioch

Phenice was a coastal region north of Israel, known today as Phoenicia.

Cyprus was a large island in the Mediterranean Sea.

Antioch was a major city in Syria, one of the largest cities in the entire Roman Empire.

These scattered believers carried the gospel far outside Jewish territory without any formal plan to do so.

🗺️ Phenice was coastal land north of Israel

🏝️ Cyprus was a Mediterranean island

🏛️ Antioch was a major Roman city

📖 The gospel spread with no formal plan

## 🗣️ Preaching The Word To None But Unto The Jews Only

Even after Cornelius, old habits did not disappear overnight for everyone.

These particular believers still limited their preaching to fellow Jews in these new cities.

Change in the early church came gradually, not all at once everywhere.

The next two verses show exactly where that pattern finally breaks.

🗣️ Old habits lingered after Cornelius

🐢 Change spread gradually, not instantly

🌍 Some still preached only to Jews

📖 The next verses break this pattern

## 🤝 Men Of Cyprus And Cyrene, Which...Spake Unto The Grecians

Cyrene was a city in North Africa with a significant Jewish population.

"The Grecians" here means Greek speaking Gentiles, not Jews living among Greek culture.

Unnamed believers, not an apostle, are the ones who first cross this line deliberately.

Ordinary, unnamed people often carry history's biggest turning points forward.

🤝 Cyrene was a North African city

🌍 Grecians here means Greek speaking Gentiles

🙋 Unnamed believers crossed the line first

📖 Ordinary people carried this turning point

## 🙌 The Hand Of The Lord Was With Them

"The hand of the Lord" is a common Old Testament way of describing God's active power at work.

It is not a literal hand, but a picture of God personally guiding and strengthening these preachers.

A great number believed and turned to the Lord as a direct result.

Success here is credited to God's hand, not to any one person's skill at preaching.

🙌 The hand of the Lord means God's power

✋ It is a picture, not a literal hand

📈 A great number believed because of it

📖 God's hand gets the credit, not skill

# Acts 11:22-24
# 📨 Barnabas Sent To Antioch
---
## 📨 Tidings Of These Things Came Unto The Ears Of The Church Which Was In Jerusalem

The Jerusalem church still functioned as a kind of home base for the whole young movement.

News traveled from Antioch back to Jerusalem the same way it had from Caesarea earlier in this chapter.

Jerusalem's leaders wanted a trusted set of eyes on what was happening in this new city.

Oversight here comes from care, not suspicion.

📨 Jerusalem still served as a home base

🔁 News traveled the same path as before

👀 Leaders wanted trusted eyes on Antioch

📖 Oversight grew from care, not suspicion

## 🧍 They Sent Forth Barnabas

Barnabas was first introduced back in Acts chapter four as a generous Levite from Cyprus.

His own name meant "son of consolation," reflecting his gift for encouraging others.

Sending a man from Cyprus fit naturally, since some of the new believers in Antioch came from Cyprus too.

Jerusalem chose someone who could build trust quickly in an unfamiliar city.

🧍 Barnabas first appeared in Acts chapter four

❤️ His name meant son of consolation

🏝️ He shared a homeland with some believers there

📖 Jerusalem chose a man who could build trust

## 😊 When He Came, And Had Seen The Grace Of God, Was Glad

Barnabas did not arrive suspicious or looking for reasons to shut things down.

He saw real evidence of God's work in these new Gentile believers and responded with genuine joy.

His reaction set the tone for how Antioch and Jerusalem would relate going forward.

Joy, not gatekeeping, became the posture that shaped this new relationship.

😊 Barnabas arrived without suspicion

👀 He saw real evidence of God's grace

🤝 His joy shaped Antioch's relationship with Jerusalem

📖 Joy, not gatekeeping, set the tone

## 💪 Exhorted Them All, That With Purpose Of Heart They Would Cleave Unto The Lord

"Exhorted" means to strongly encourage or urge someone toward action.

"Cleave" means to hold fast to something, the same word used for a strong, lasting commitment.

"Purpose of heart" means a firm, deliberate decision, not a feeling that might fade.

Barnabas pushes new believers toward lasting commitment, not just an emotional moment.

💪 Exhorted means to strongly encourage

🤝 Cleave means to hold fast firmly

🎯 Purpose of heart means firm decision

📖 Barnabas aimed at lasting commitment

## ✝️ He Was A Good Man, And Full Of The Holy Ghost And Of Faith

Luke, the writer of Acts, rarely hands out this kind of direct character description.

Three things are named together, goodness, the Holy Ghost, and genuine faith.

That combination explains why Barnabas handled this delicate, high stakes moment so well.

Much people was added unto the Lord as a direct result of his ministry there.

✝️ Luke rarely gives this kind of praise

🕊️ Goodness, the Spirit, and faith named together

📈 Many more people were added because of it

📖 Character shaped the outcome of his ministry

# Acts 11:25-26
# ✝️ Saul Brought To Antioch
---
## 🧭 Departed Barnabas To Tarsus, For To Seek Saul

Tarsus was Saul's hometown, far to the north in the region of Cilicia.

Saul had last been sent there for his own safety back in Acts chapter nine.

Several years appear to have passed with Saul mostly out of the story's view.

Barnabas remembered him anyway and went looking for him personally.

🧭 Tarsus was Saul's hometown

🛡️ He had been sent there for safety

⏳ Years had passed since then

📖 Barnabas remembered him and went looking

## 🏙️ When He Had Found Him, He Brought Him Unto Antioch

Finding Saul may have taken real searching, since the text does not say it was quick or easy.

Barnabas personally vouches for Saul again, the same way he did back in Jerusalem after Saul's conversion.

This decision quietly reshapes the rest of the New Testament.

Saul of Tarsus is about to become the apostle who writes most of its letters.

🏙️ Finding Saul likely took real effort

🤝 Barnabas personally vouched for him again

📜 This decision reshaped the New Testament

📖 Saul becomes its most prolific writer

## 📆 A Whole Year They Assembled Themselves With The Church, And Taught Much People

A full year of steady, patient teaching built a mature congregation in Antioch.

This was not a quick visit or a single dramatic sermon.

Deep teaching over time turned new believers into a strong, lasting church.

Antioch would soon become one of the most important church centers in the whole New Testament.

📆 A full year of steady teaching

🏗️ This built a mature congregation

⏳ Not a quick visit or one sermon

📖 Antioch became a major church center

## 🏷️ The Disciples Were Called Christians First In Antioch

"Christian" literally means "belonging to Christ" or "little Christ."

Outsiders in Antioch likely coined the name, possibly as a label rather than a compliment at first.

Believers had simply called themselves disciples, brethren, or followers of the Way before this.

A name meant to describe them from the outside became the name the whole world still uses today.

🏷️ Christian means belonging to Christ

🗣️ Outsiders likely coined the term first

📛 Believers used other names before this

📖 An outside label became a lasting name

# Acts 11:27-30
# 🌾 Agabus Prophesies Famine
---
## 📜 In These Days Came Prophets From Jerusalem Unto Antioch

Prophets in the early church spoke messages they believed came directly from God, often about future events.

Jerusalem sending prophets to Antioch shows the two churches staying closely connected, not drifting apart.

This connection matters, since Antioch is quickly becoming a major center of its own.

Unity between the two cities is being built even as Antioch grows in its own importance.

📜 Prophets spoke messages believed to be from God

🔗 Jerusalem and Antioch stayed closely connected

🏙️ Antioch was growing into its own center

📖 Unity grew even as Antioch gained importance

## 🗣️ Agabus...Signified By The Spirit That There Should Be Great Dearth

Agabus appears again later in Acts with another specific prophecy about Paul's own future.

"Signified" means he made the coming event clearly known ahead of time.

"Dearth" means a severe shortage of food, the old word for a famine.

A real famine threatening real lives is about to test how this new church actually lives out its faith.

🗣️ Agabus appears again later in Acts

📢 Signified means clearly announced in advance

🌾 Dearth means a severe food shortage

📖 A real famine will test real faith

## 👑 Which Came To Pass In The Days Of Claudius Caesar

Claudius ruled the Roman Empire during this period of history.

Ancient historians outside the Bible also recorded real famines occurring during his reign.

Luke anchors this prophecy to a specific, checkable point in actual history.

This was never a vague prediction meant to sound spiritual without any real stakes.

👑 Claudius ruled the empire at this time

📚 Outside historians confirm famines in his reign

🔎 Luke anchors this to real history

📖 The prophecy carried real, checkable stakes

## 🤲 Every Man According To His Ability, Determined To Send Relief

The believers in Antioch decide to help fellow Christians in Judaea before the famine even arrives.

Giving according to ability means each person contributed based on what they genuinely had, not an equal forced amount.

This response shows the new Gentile believers already caring deeply for the Jewish believers back in Judaea.

A famine meant to divide people by region instead drew two churches closer together.

🤲 They prepared relief before the famine hit

⚖️ Each gave according to real ability

🤝 Gentile believers cared for Jewish believers

📖 Hardship drew two churches closer, not apart

## 🤝 Sent It To The Elders By The Hands Of Barnabas And Saul

Elders were the recognized local leaders responsible for the Jerusalem church's daily life and care for its people.

Barnabas and Saul personally deliver this gift rather than sending it through a stranger.

The two men who first partnered together in Antioch now carry out this mission side by side.

A famine relief trip quietly becomes the first step in a partnership that will soon carry the gospel much further.

🤝 Elders led the Jerusalem church's daily care

🧍 Barnabas and Saul delivered the gift personally

🔗 Their Antioch partnership carried into this mission

📖 This step led toward a much larger partnership
`.trim();

export const ACTS_ELEVEN_PERSONAL_SECTIONS = parseActsElevenRawNotes(ACTS_ELEVEN_RAW_NOTES);
