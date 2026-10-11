export type ActsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsNineRawNotes(rawText: string): ActsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 9:${startVerse}` : `Acts 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 9 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_NINE_RAW_NOTES = `# Acts 9:1-6
# 💥 Light On The Damascus Road
---
## 💨 Breathing Out Threatenings And Slaughter

Breathing out pictures violence as the very air Saul exhales.

It was not a passing mood or one angry outburst.

Threatenings and slaughter name his intent plainly, arrest and even killing.

Saul went to the high priest for official backing, not on his own authority.

💨 Breathing out pictures nonstop violent intent

⚔️ Threatenings and slaughter name real danger

🏛️ He sought official backing from the high priest

📖 This was organized persecution, not just anger

## 📜 Letters To Damascus

Saul asked the high priest for official letters addressed to the synagogues in Damascus.

Those letters worked like modern arrest warrants, giving him legal authority to act.

He wanted permission to seize believers, men and women alike, and drag them to Jerusalem.

Believers were still worshiping inside Jewish synagogues at this point in the story.

📜 Letters acted like official arrest warrants

🕍 Synagogues still held early Jewish believers

⛓️ Saul wanted both men and women seized

📖 Jerusalem was the destination for every prisoner

## 🚶 Of This Way

This way was one of the earliest names for the whole Christian movement.

It described a path of life, not just a set of beliefs.

Luke uses this same title again later in the book of Acts.

Saul's whole mission was to stop this way from spreading any further.

🚶 The way named a whole way of life

📖 Luke uses this title later in Acts

🛑 Saul aimed to stop this movement completely

➡️ A name this early shows a real identity

## ☀️ A Light From Heaven

Saul was almost at Damascus when something impossible happened.

A light from heaven means this was no ordinary daylight and no coincidence.

Bright, sudden light breaking in from above pictures God interrupting a human plan.

The very moment Saul meant to crush the church became the moment God confronted him.

☀️ The light came suddenly, with no warning

🚫 This was not ordinary daylight at all

🛑 God interrupted Saul's plan at its peak

📖 God confronted Saul at his worst moment

## 🗣️ Saul, Saul, Why Persecutest Thou Me

Repeating a name twice was a familiar way to show personal, urgent address.

God used this same pattern earlier with Abraham and with Moses.

"Why persecutest thou me" ties Jesus directly to the suffering of His church.

Attacking believers was not only attacking people, it was attacking Jesus Himself.

🗣️ Repeating a name shows urgent personal address

📜 The same pattern appears with Abraham and Moses

❤️ Jesus ties Himself directly to His church

📖 Attacking believers meant attacking Jesus Himself

## ❓ I Am Jesus Whom Thou Persecutest

Saul asks a simple, desperate question, who are you, Lord.

The answer could not have shocked him more, I am Jesus.

Saul had never met Jesus in the flesh, only persecuted His followers.

In one sentence, Saul learns exactly who he has really been fighting.

❓ Saul asks who is speaking to him

😲 The answer names Jesus Himself directly

👥 Saul had only ever met Jesus' followers

📖 Saul now knows exactly who he fought

## 🐂 Kick Against The Pricks

A prick here was a sharp, pointed goad used to drive oxen forward.

An ox that kicked back against the goad only hurt itself more.

This was a well known proverb in the ancient world, not a new image.

Jesus is telling Saul that fighting God's plan only wounds Saul himself.

🐂 A prick was a sharp goad for oxen

⚡ Kicking the goad only hurt the ox more

📜 This proverb was familiar across the ancient world

📖 Fighting God's plan only wounds Saul himself

## 🙇 What Wilt Thou Have Me To Do

Saul does not argue or defend himself at all.

His only question is what the Lord wants him to do next.

That is a complete reversal from the man breathing threats back in verse one.

Jesus does not explain everything yet, He only says to go into the city.

Full instructions would come later, through someone else entirely.

🙇 Saul offers no defense, only surrender

❓ His only question is what to do

🔄 This reverses the violent Saul of verse one

📖 Full instructions are saved for later

# Acts 9:7-9
# 🙈 Three Days Of Darkness
---
## 👂 Stood Speechless

Saul's travel companions heard the same voice he did.

They did not see anyone speaking, only heard the sound.

Speechless means they were too stunned to say a single word.

They shared the experience without sharing Saul's full encounter with Jesus.

👂 They heard the voice just like Saul

👁️ They saw no one speaking at all

😶 Speechless means too stunned to talk

📖 They shared the event, not the meeting

## 🙈 He Saw No Man

Saul's physical blindness began the instant he opened his eyes.

This blindness pictures something deeper than just his physical sight.

The man who could not see the risen Jesus coming now could not see anything at all.

God sometimes strips away sight before He gives a person true vision.

🙈 Saul's blindness began that very instant

💡 Physical blindness pictures a deeper truth

👀 He once refused to truly see Jesus

📖 God sometimes removes sight before giving vision

## ✋ Led Him By The Hand

The man who came to arrest believers now needed help just to walk.

Being led by the hand was something done for children or the helpless.

Saul's companions brought him the rest of the way into Damascus.

The most powerful man in the story became completely dependent in a moment.

✋ Saul needed help just to walk

🧒 This treatment matched a child's dependence

🚶 His companions guided him into the city

📖 The powerful man became fully dependent

## 🔢 Three Days Without Sight

Three days appears again and again across scripture at major turning points.

Jesus Himself spent three days in the tomb before the resurrection.

Saul's three days of darkness came right before his own new beginning.

This waiting period was not wasted time, it was preparation.

🔢 Three days marks major turning points often

⚰️ Jesus spent three days in the tomb

🌑 Saul's darkness came before his new start

📖 Waiting here was preparation, not an accident

## 🚫 Neither Did Eat Nor Drink

Saul refused both food and water for the entire three days.

This was not simply fasting as a religious habit.

It reflects the shock of a total identity crisis happening all at once.

The violent man was being stripped down before being rebuilt into something new.

🚫 Saul refused food and water completely

😳 This was shock, not planned fasting

🧱 His whole identity was breaking apart

📖 He was being rebuilt into something new

# Acts 9:10-16
# 👂 Ananias Receives A Vision
---
## 👤 A Certain Disciple At Damascus

Ananias was an ordinary believer, not one of the twelve apostles.

Scripture gives no record of him before or after this chapter.

God regularly works through ordinary, unnamed people, not only famous leaders.

Ananias simply happened to live in the right city at the right time.

👤 Ananias was an ordinary believer, not an apostle

📖 Scripture never mentions him again elsewhere

🙋 God often uses ordinary, unnamed people

➡️ Being in the right place mattered here

## 📜 Behold, I Am Here, Lord

This exact phrase appears earlier with Abraham and with young Samuel.

It signals full attention and total readiness to obey.

Ananias does not yet know what the Lord is about to ask of him.

He answers before he even hears the actual assignment.

📜 This phrase echoes Abraham and Samuel

👂 It signals full attention and readiness

❓ Ananias has not heard the assignment yet

📖 He agrees before knowing the details

## 🛣️ The Street Which Is Called Straight

Straight Street was a real, well known road running through ancient Damascus.

Giving this level of detail shows the vision was specific, not vague.

A version of this same street still exists in Damascus today.

God's instructions pointed to an exact house on an exact street.

🛣️ Straight Street was a real road in Damascus

🎯 The vision gave exact, specific details

🏙️ A version of it still exists today

📖 God's instructions were precise, not vague

## 🗺️ Saul, Of Tarsus

Tarsus was a major city in what is now southern Turkey.

It was known for education and for Roman citizenship among its people.

Saul likely grew up with both strong Jewish training and Roman standing.

That background would later help him preach across the wider Roman world.

🗺️ Tarsus sat in modern day southern Turkey

🎓 The city was known for education

🏛️ Saul likely held Roman citizenship there

📖 This background served his future mission

## 👁️ Hath Seen In A Vision

Saul had already seen Ananias coming to him before Ananias even moved.

God prepared both men with matching visions at the same time.

This double confirmation made the strange instructions easier to trust.

Neither man was acting on a guess or a feeling alone.

👁️ Saul had already seen Ananias coming

🔗 Both men received matching visions

✅ Double confirmation made the plan trustworthy

📖 Neither man relied on guesswork alone

## 😨 Thy Saints At Jerusalem

Ananias protests, since Saul's reputation has already reached Damascus.

Saints here simply means believers, set apart for God, not perfect people.

Ananias has heard real reports of harm done to real people.

His fear is reasonable, not a lack of faith.

😨 Ananias protests based on real reports

🙏 Saints means believers set apart for God

⚠️ Saul had already harmed real people

📖 Ananias had real reason to fear

## 📜 Authority From The Chief Priests

Saul was not acting alone or outside the law.

The chief priests had given him official, legal permission to arrest believers.

This made Saul's threat organized and backed by real religious power.

Ananias had every reason to expect the worst from this visit.

📜 Saul carried official permission, not a rumor

⚖️ The chief priests backed his mission

🏛️ Organized power stood behind his threat

📖 Ananias had real reason to fear him

## 🏺 A Chosen Vessel Unto Me

Vessel pictures a container made to carry something specific.

God chose Saul on purpose, with his violent past fully known.

This calling reaches beyond Israel, to Gentiles and even kings.

God's choice of Saul says more about grace than about Saul's record.

🏺 Vessel pictures a container with a purpose

✅ God chose Saul with his past fully known

🌍 This calling reached Gentiles, kings, and Israel

📖 The choice reveals grace, not merit

## ⚠️ How Great Things He Must Suffer

God pairs Saul's calling immediately with a warning about suffering.

Following Jesus was never promised to be safe or easy for Saul.

This suffering would come specifically for the name of Jesus Himself.

The same man once causing suffering would soon be enduring it instead.

⚠️ The calling comes paired with suffering

🛡️ Following Jesus was never promised safe

✝️ His suffering was tied to Jesus' name

📖 The persecutor would soon be persecuted

# Acts 9:17-19
# 🙌 Ananias Obeys
---
## 🤝 Brother Saul

Ananias calls Saul brother the moment he meets him.

That word means full, immediate acceptance into the family of believers.

Ananias had every reason to keep his distance instead.

Grace reached Saul before Saul had proven anything to anyone.

🤝 Brother means full, immediate acceptance

😨 Ananias had reason to stay distant

❤️ Grace met Saul before he proved himself

📖 Acceptance came before any proof at all

## 👁️ Filled With The Holy Ghost

Ananias names two separate gifts coming to Saul, sight and the Holy Ghost.

This is the same gift already given to believers earlier in Acts.

Saul is being fully welcomed into everything the church already shares.

Nothing about his past still being held against him remains.

👁️ Sight and the Holy Ghost both came

🕊️ The same gift already given to others

🤲 Saul received everything the church already shared

📖 His past no longer stood against him

## 🐍 As It Had Been Scales

Luke compares the healing to scales falling away from Saul's eyes.

This pictures something hard and covering suddenly dropping off completely.

Physical healing and spiritual understanding happen in the very same moment.

The blindness that began on the road now ends inside a believer's house.

🐍 Scales picture something hard falling away

⚡ Healing happened suddenly, all at once

👁️ Physical sight returned with spiritual insight

📖 His blindness ended where it belonged

## ⚡ Arose, And Was Baptized

Saul is baptized immediately, with no waiting period at all.

Baptism marked his public, outward response to what God had done.

No building, ceremony, or large crowd was needed for this moment.

Belief led straight into action without any delay.

⚡ Baptism happened right away, no delay

💧 It marked his public response to God

🏠 No special building or crowd was needed

📖 Belief moved straight into action

## 🍞 Received Meat, He Was Strengthened

Saul finally eats again after three full days of fasting.

Strengthened describes his body recovering after real physical exhaustion.

He stays with the Damascus believers for a stretch of days afterward.

The man sent to arrest them now lives safely among them instead.

🍞 Saul finally ate after three days

💪 Strengthened describes real physical recovery

🏠 He stayed among the Damascus believers

📖 The hunter now lived safely among them

# Acts 9:20-25
# ⚔️ From Hunter To Hunted
---
## ⚡ Straightway He Preached Christ

Straightway means immediately, with no delay at all.

Saul preaches inside the very synagogues he meant to use against believers.

His first public act as a believer is bold, public proclamation.

There is no quiet transition period before he starts speaking out.

⚡ Straightway means immediately, without delay

🕍 He preached inside synagogues he once targeted

🗣️ His first act was bold and public

📖 There was no quiet waiting period

## 😲 All That Heard Him Were Amazed

The listeners already knew Saul's reputation as a violent persecutor.

Their amazement comes from total shock at his complete reversal.

They even repeat out loud exactly what Saul used to do.

A reputation this well known does not change quietly or get ignored.

😲 Amazement came from total shock

📢 They repeated his old reputation out loud

🔁 His reversal was sudden and public

📖 A known reputation does not change quietly

## 🧠 Confounded The Jews Which Dwelt At Damascus

Confounded means Saul out argued them, leaving them unable to respond.

He used scripture itself to prove Jesus is the Messiah.

His training as a Pharisee now served the very message he once fought.

Increased strength here means growing boldness and skill, not physical power.

🧠 Confounded means out arguing them completely

🎓 His Pharisee training now served the gospel

💪 His strength here means growing boldness

📖 He proved his case straight from scripture

## 🔁 Took Counsel To Kill Him

The same tactic Saul once used against believers now targets Saul himself.

Took counsel means they planned together deliberately, not in a sudden rage.

The roles from the start of this chapter have now fully reversed.

Saul somehow learns of the plot before it can be carried out.

🔁 The same tactic now targets Saul

📋 Took counsel means a deliberate, planned plot

🔄 The chapter's roles have fully reversed

📖 Saul learned of the plot in time

## 🏰 Watched The Gates Day And Night

Damascus was a walled city with a limited number of gates.

Watching the gates both day and night shows serious, constant effort.

Leaving the city through a normal gate had become impossible for Saul.

His enemies were determined not to let him slip away quietly.

🏰 Damascus was a walled city with gates

👀 Watching continued constantly, day and night

🚫 Normal exit routes were now impossible

📖 His enemies wanted no quiet escape

## 🧺 Let Him Down By The Wall In A Basket

City walls were often thick enough to include window openings for baskets.

A basket like this was normally used to lower goods, not people.

Escaping this way was humbling for a man once sent with official authority.

Years later Saul, as Paul, still remembers this exact escape in his own writing.

🧺 Baskets usually lowered goods, not people

🏰 Thick walls allowed this kind of exit

😳 This escape was humbling for Saul

📖 Paul later remembers this exact moment

# Acts 9:26-31
# 🤝 Barnabas Vouches For Saul
---
## 🚪 They Were All Afraid Of Him

Saul tries to join the Jerusalem believers directly on his own.

His reputation as a persecutor had traveled ahead of him there too.

Fear here is a reasonable response, not simply unkind suspicion.

Trust after this kind of history takes real time to rebuild.

🚪 Saul tried joining the believers directly

😨 His old reputation had already arrived first

⚖️ Their fear was reasonable, not unkind

📖 Trust like this takes real time

## 🤝 Barnabas Took Him

Barnabas personally steps in where no one else would.

Took him shows direct, hands on involvement, not a simple introduction.

Barnabas becomes the bridge connecting Saul to the apostles themselves.

This same Barnabas will travel with Saul on real missions later in Acts.

🤝 Barnabas personally stepped in for Saul

🌉 He became the bridge to the apostles

🙌 His involvement was direct, not distant

📖 The two later travel together in Acts

## 🗣️ Declared Unto Them How He Had Seen The Lord

Barnabas repeats Saul's own testimony to the suspicious apostles.

He vouches for both the vision and Saul's bold preaching in Damascus.

A trusted voice can open doors a newcomer cannot open alone.

The apostles accept Saul because someone they already trust speaks for him.

🗣️ Barnabas repeated Saul's own testimony

🔑 A trusted voice opened a closed door

✅ The apostles accepted Saul through Barnabas

📖 Trust was lent until Saul earned his own

## 🗣️ Disputed Against The Grecians

Grecians here means Greek speaking Jews, not Gentile Greeks.

This is the same group connected earlier to Stephen's killers in Acts six.

Saul once again debates publicly using scripture, not threats or violence.

His enemies respond exactly the way Saul's own enemies once did, with murder plots.

🗣️ Grecians means Greek speaking Jews here

🔗 This group connects back to Acts six

⚠️ His enemies answered with murder plots again

📖 Saul debated using scripture, not threats

## ⚡ Sent Him Forth To Tarsus

The believers act quickly once they learn of the new plot.

Caesarea was a coastal city, a safe stop on the way out.

Tarsus was Saul's own hometown, a safe place to wait.

Protecting Saul's life mattered more than keeping him in Jerusalem.

⚡ Believers acted quickly once they knew

🚢 Caesarea served as a safe coastal stop

🏠 Tarsus was Saul's own hometown

📖 His safety mattered more than his location

## 🕊️ Had Rest

The violent persecution driving chapter eight has now actually stopped.

Removing Saul from the picture directly caused this season of peace.

Edified pictures a building going up, meaning the church was being strengthened.

The church grew in both number and depth during this calmer season.

🕊️ The persecution has genuinely stopped now

➡️ Removing Saul caused this real peace

🏗️ Edified pictures a building going up

📖 The church grew in number and depth

# Acts 9:32-35
# 🙌 Peter Heals Aeneas
---
## 🗺️ The Saints Which Dwelt At Lydda

Lydda sat on the road connecting Jerusalem to the coastal city of Joppa.

Peter was traveling through the region visiting existing groups of believers.

Saints again simply means believers, not people who were extra holy.

This visit sets up the healing that happens next in the story.

🗺️ Lydda sat between Jerusalem and Joppa

🚶 Peter was visiting existing believers nearby

🙏 Saints simply means ordinary believers here

📖 This visit leads into the next healing

## 🛏️ Kept His Bed Eight Years

Aeneas had been unable to move from his bed for eight full years.

Palsy describes paralysis or uncontrollable shaking of the body.

Eight years is specific and verifiable, not a vague exaggeration.

A condition this long and well known makes the coming miracle undeniable.

🛏️ Aeneas had been bedridden eight full years

😵 Palsy means paralysis or uncontrollable shaking

📏 Eight years is specific, not exaggerated

📖 A miracle this visible cannot be denied

## 🙏 Jesus Christ Maketh Thee Whole

Peter credits Jesus by name instead of claiming any power of his own.

This directly contrasts with Simon the sorcerer back in Acts eight.

Peter heals as a servant pointing elsewhere, not as the main attraction.

The name of Jesus carries the actual healing power here.

🙏 Peter credited Jesus, not his own power

🔮 This contrasts with Simon the sorcerer

👉 Peter pointed away from himself completely

📖 Jesus' name carried the real power

## 🛏️ Arise, And Make Thy Bed

Peter gives Aeneas an immediate, practical task to perform.

Making the bed proves the healing is real, not symbolic or partial.

There is no slow recovery period described here at all.

Full obedience followed immediately after the full healing happened.

🛏️ Peter gave an immediate, practical task

✅ Making the bed proved the healing real

⚡ No slow recovery period is described

📖 Obedience followed the healing immediately

## 🎯 Turned To The Lord

The whole purpose of this miracle quickly becomes visible here.

Physical healing opens the door, but faith is the actual goal.

An entire region, Lydda and Saron together, responds to this one healing.

One restored life leads many more people toward belief.

🎯 The healing's real purpose appears here

🚪 Physical healing opened a door to faith

🗺️ A whole region responded to this miracle

📖 One healed life led many toward belief

# Acts 9:36-43
# 🕊️ Peter Raises Tabitha
---
## 🦌 Tabitha, Which By Interpretation Is Called Dorcas

Tabitha was her name in Aramaic, and Dorcas was the same name in Greek.

Both names actually mean the same thing, gazelle, a graceful animal.

Joppa was a mixed community where both languages were common.

Luke gives both names so every reader recognizes exactly who she was.

🦌 Both names mean the same thing, gazelle

🗣️ Tabitha and Dorcas are Aramaic and Greek

🏙️ Joppa mixed both languages in daily life

📖 Luke named her clearly for every reader

## 🙏 Full Of Good Works And Almsdeeds

Almsdeeds means acts of charity, specifically giving to people in need.

This description comes before any miracle, establishing who she really was.

Her reputation in the community was built through consistent daily action.

Luke wants the reader to know her character before her death.

🙏 Almsdeeds means charity given to the needy

📋 Her character is named before any miracle

🔁 Her reputation grew through daily action

📖 Readers meet her character before her death

## 💧 Laid Her In An Upper Chamber

Washing the body was a standard part of Jewish burial preparation.

Burial in this culture usually happened quickly, often the very same day.

Placing her in an upper room instead suggests the believers were waiting for something.

That small delay in burial becomes important a few verses later.

💧 Washing the body followed Jewish custom

⏳ Quick burial was the normal practice

🏠 An upper room suggests they were waiting

📖 That delay matters later in the story

## 🏃 The Widows Stood By Him Weeping

Two men are sent urgently to bring Peter from nearby Lydda.

Widows in this culture often had little income or protection of their own.

They show Peter the actual clothing Dorcas had made for them herself.

Her good works were not abstract, they were physical proof standing in the room.

🏃 Two men urgently brought Peter to Joppa

👵 Widows often had little income or protection

🧵 They showed clothing Dorcas made herself

📖 Her good works stood as visible proof

## 🚪 Peter Put Them All Forth

Peter clears the room before doing anything else.

Jesus does this exact same thing at Jairus's daughter's healing.

Kneeling to pray shows dependence on God, not personal confidence.

Peter is following a pattern already set by Jesus Himself.

🚪 Peter cleared the room completely first

✝️ Jesus did this same thing earlier

🙏 Kneeling showed dependence, not confidence

📖 Peter followed a pattern Jesus set

## 🗣️ Tabitha, Arise

Peter speaks just two plain words, with no lengthy speech or ritual.

This mirrors Jesus speaking life directly over the dead elsewhere in scripture.

She opened her eyes describes an immediate, visible return of life.

The power at work here clearly belongs to God, not to Peter.

🗣️ Peter spoke only two plain words

✝️ This mirrors how Jesus spoke life

👀 Her eyes opened immediately and visibly

📖 The power belonged to God, not Peter

## 🙌 Presented Her Alive

Peter does not hide this miracle quietly from everyone.

He formally presents her alive to the saints and widows together.

This public confirmation prevents any doubt about what actually happened.

The miracle becomes something the whole community can personally witness.

🙌 Peter did not hide this quietly

👥 He presented her to the whole group

✅ Public proof removed any real doubt

📖 The community witnessed this miracle together

## 📢 Many Believed In The Lord

News of this miracle traveled throughout the whole town of Joppa.

The same pattern repeats, a miracle leading many people toward belief.

Faith here spreads through more than one single household.

Joppa becomes genuinely changed by what just happened there.

📢 News spread throughout the whole town

🔁 This matches an earlier pattern in Acts

🏠 Faith spread past just one household

📖 The miracle genuinely changed the town

## 🧵 Simon A Tanner

Tanning animal hides was considered an unclean trade under Jewish custom.

Peter chooses to stay in the home of a man many would avoid.

This small detail quietly previews Peter's openness in the very next chapter.

Peter is already comfortable crossing lines others were taught to avoid.

🧵 Tanning hides was considered unclean work

🏠 Peter stayed in a home others avoided

🔮 This detail previews the next chapter

📖 Peter already crossed lines others avoided
`.trim();

export const ACTS_NINE_PERSONAL_SECTIONS = parseActsNineRawNotes(ACTS_NINE_RAW_NOTES);
