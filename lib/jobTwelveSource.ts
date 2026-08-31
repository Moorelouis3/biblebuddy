export type JobTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwelveRawNotes(rawText: string): JobTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 12:${startVerse}` : `Job 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 12 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWELVE_RAW_NOTES = `# Job 12:1-3
# 🙄 Job Answers Back
---
## 😏 No Doubt But Ye Are The People

Job opens with sarcasm instead of agreement.

"No doubt" here does not mean Job agrees.

It mocks Zophar's confident tone from the last chapter.

Job says it as if only his friends hold all wisdom.

The sarcasm sets the tone for his entire reply.

😏 No doubt signals sarcasm here
🗣️ Zophar spoke with total confidence
🎭 Job mocks that confidence openly
📖 The sarcasm sets up his reply

## 🙄 Wisdom Shall Die With You

This line finishes Job's sarcastic jab.

Job pictures his friends as if they own all wisdom in the world.

He suggests that once they die wisdom itself will vanish.

No person actually holds wisdom that completely.

Job wants Zophar to hear how arrogant that sounds.

🙄 Job exaggerates their claim to wisdom
🌍 No one owns all wisdom
💭 Job pictures wisdom dying with them
➡️ He wants them to hear their own arrogance

## 🧠 I Have Understanding As Well As You

Job answers their implied insult directly.

His friends have treated him as if he lacks basic understanding.

Job insists he follows the same logic they do.

He has heard every argument they have made before.

Their advantage was never in wisdom itself.

🧠 Job claims equal understanding
😤 His friends implied he lacked it
📚 He already knows their arguments
➡️ Their advantage was never wisdom

## 📉 I Am Not Inferior To You

"Inferior" means lower in rank or worth.

Job refuses to accept that label from his friends.

He has suffered greatly.

That suffering has not erased his mind.

Job's pain does not make him a lesser thinker.

The rest of the chapter now becomes Job proving that claim.

📉 Inferior means lower in rank
🚫 Job rejects that label
💔 Suffering has not dulled his mind
📖 The rest of the chapter proves it

# Job 12:4-6
# 💔 Mocked By My Neighbour
---
## 😢 I Am As One Mocked Of His Neighbour

Job describes his current reputation among people who know him.

He used to be someone others respected.

Now people who once respected him laugh at his condition.

This wound is personal, not a general complaint.

Job names the exact wound Zophar's speech reopened.

😢 Job names his own humiliation
🤝 He once had real respect
😂 Now former friends mock him
📖 This wound is personal, not general

## ⚖️ The Just Upright Man Is Laughed To Scorn

"Just" and "upright" both describe a person who lives rightly.

Job says a truly good man can still become a joke to others.

This directly challenges his friends' theology.

They have taught that suffering proves hidden sin.

Job stands as living proof that a right man can suffer anyway.

⚖️ Just and upright both mean living rightly
😭 Even a right man gets mocked
📚 This challenges his friends' theology
➡️ Job is living proof of that

## 🕯️ A Lamp Despised In The Thought Of Him That Is At Ease

Job compares himself to a lamp that others look down on.

A lamp burning low or flickering out gets no respect.

People who are comfortable often despise the struggling.

Job feels exactly like that dying lamp to his friends.

Their comfort makes his suffering look small to them.

🕯️ Job compares himself to a fading lamp
😌 The comfortable despise the struggling
👀 Comfort blinds people to real pain
📖 Job feels small in their eyes

## ⛺ The Tabernacles Of Robbers Prosper

"Tabernacles" simply means tents or dwelling places.

Job points out something uncomfortable to admit.

Robbers, people who openly steal and harm others, often live in comfort.

This fact does not fit his friends' simple rule.

Job uses it to challenge their entire argument.

⛺ Tabernacles means tents or homes
🦹 Even robbers can live comfortably
📉 This breaks their simple rule
➡️ Job uses it to challenge them

## 😡 They That Provoke God Are Secure

"Provoke" means to deliberately anger someone.

Job notes that people who openly defy God often stay safe.

"Secure" means untouched by trouble or danger.

This is the opposite of what Zophar has been arguing.

Job is building a case that life does not always work that way.

😡 Provoke means to deliberately anger
🛡️ Secure means untouched by trouble
📚 This contradicts Zophar's argument
📖 Life does not always follow their rule

# Job 12:7-10
# 🦁 Ask The Beasts
---
## 🦁 Ask Now The Beasts And They Shall Teach Thee

Job tells his friends to go ask animals for wisdom instead.

This is sharp sarcasm aimed straight at them.

Job is saying that what they told him was that obvious.

Even a wild animal could have taught him the same basic lesson.

Job is not doubting God's power.

He is doubting their tone.

🦁 Job sends them to ask animals
😏 This is pure sarcasm
📢 Their lesson was that obvious
➡️ Job doubts their tone, not God

## 🌍 Speak To The Earth And It Shall Teach Thee

Job widens his sarcasm from animals to the ground itself.

Even the earth, he says, could teach this simple lesson.

Fish in the sea could declare it too.

Job is not attacking the truth his friends spoke.

He is attacking their assumption that only they understood it.

🌍 Even the earth could teach this
🐟 Fish could declare it too
✅ Job does not deny the truth
📖 He denies that only they knew it

## ✋ The Hand Of The Lord Hath Wrought This

"Hand of the LORD" is a common way to describe God acting in the world.

"Wrought" is an old word meaning made or done.

Job affirms plainly that God stands behind everything happening around him.

He agrees with his friends on this basic point completely.

Their real disagreement was never about who is in control.

✋ Hand of the LORD means God acting
🔨 Wrought means made or done
✅ Job affirms God controls all things
📖 Their real disagreement was elsewhere

## 🫁 The Soul Of Every Living Thing And The Breath Of All Mankind

Job describes God holding life itself in His hand.

"Soul" here means the very life inside a creature.

"Breath" points back to how God first gave life to Adam.

Every animal and every person depends on God for that breath.

Nothing alive exists apart from what God is holding.

🫁 Soul means the life inside a creature
🌬️ Breath recalls how life began
🐾 Every creature depends on God
📖 Nothing alive exists without Him

# Job 12:11-13
# 👂 Doth Not The Ear Try Words
---
## 👂 Doth Not The Ear Try Words

"Try" here means to test or examine carefully.

Job compares listening to words with testing food by taste.

A wise ear does not accept every claim without checking it first.

Job wants his friends to test their own words the same way.

He is asking them to think, not just repeat old sayings.

👂 Try means to test carefully
🍽️ Job compares this to tasting food
🤔 A wise ear checks claims first
➡️ Job wants them to think, not repeat

## 👅 The Mouth Taste His Meat

This second image finishes the comparison Job just started.

A tongue can tell good food from bad.

An ear can tell true words from empty ones the same way.

Zophar's speech sounded wise, but sounding wise is not the same as being right.

Job believes their judgment has been too quick.

👅 The tongue tells good food from bad
🗣️ Sounding wise is not being right
⏳ Their judgment came too quickly
📖 Job wants a fairer hearing

## 👴 With The Ancient Is Wisdom

"Ancient" refers to people who have lived a long life.

This line states a common belief of that time.

Older people were assumed to carry more wisdom simply from experience.

Job's friends likely leaned on this assumption to sound authoritative.

Job is about to test whether that assumption always holds.

👴 Ancient means someone who has lived long
📜 Age was assumed to bring wisdom
🎓 This gave his friends authority
➡️ Job is about to test that idea

## 📆 In Length Of Days Understanding

"Length of days" is an old way of saying a long life.

This line repeats the same idea from a slightly different angle.

Long life was thought to naturally produce deep understanding.

Job has not rejected this idea yet.

He is setting it up so he can turn it around soon.

📆 Length of days means a long life
🔁 This restates the same old idea
🧓 Long life was linked to understanding
📖 Job is setting up a turn

## 🔄 With Him Is Wisdom And Strength

Job shifts the subject from aged humans to God Himself.

"Him" now refers to God, not any elderly person.

Real wisdom does not ultimately belong to the old.

It belongs to God, who gives it out as He chooses.

This shift quietly corrects what verse twelve assumed.

🔄 Job shifts from humans to God
👑 Him now means God Himself
🎁 God gives wisdom as He chooses
📖 This corrects the assumption in verse twelve

## 🗺️ He Hath Counsel And Understanding

"Counsel" means the ability to plan and decide wisely.

Job says God possesses both the plan and the insight behind it.

Human wisdom, even from the aged, is only ever borrowed.

God's wisdom needs no source outside Himself.

This closes the point Job has been building since verse eleven.

🗺️ Counsel means the ability to plan wisely
🎓 God holds both plan and insight
🪞 Human wisdom is only ever borrowed
📖 God's wisdom needs no outside source

# Job 12:14-16
# 🌊 He Withholdeth The Waters
---
## 🧱 He Breaketh Down, And It Cannot Be Built Again

Job pictures God tearing something down completely.

Once God breaks a thing, no human effort can rebuild it.

This is not ordinary damage that skilled hands could fix.

Job is describing power that is total and final.

No one can overrule a decision God has already made.

🧱 God tears something down completely
🚫 No human effort can rebuild it
💪 This power is total and final
📖 No one can overrule God's decision

## 🔒 He Shutteth Up A Man, And There Can Be No Opening

Job now applies that same total power to a person.

"Shutteth up" pictures someone locked away or trapped.

Once God closes that door.

No one else can open it.

This could describe prison, sickness, or any trapped situation.

Job likely has his own trapped suffering in mind here.

🔒 Shutteth up means locked away
🚪 No one else can open that door
🤒 This could mean prison or sickness
➡️ Job likely means his own suffering

## 🌧️ He Withholdeth The Waters, And They Dry Up

"Withholdeth" means to hold something back on purpose.

Job describes God controlling rain and water at their source.

Without that water, land and people dry up quickly.

Ancient farmers depended completely on rain God alone controlled.

Job is naming one more area where humans have no real power.

🌧️ Withholdeth means holding something back
🏜️ Without rain, land dries up fast
🌾 Farmers depended completely on that rain
📖 Humans have no real power here

## 💧 He Sendeth Them Out, And They Overturn The Earth

Job now flips the same picture in the opposite direction.

The same God who withholds water can release it without limit.

Too much water floods and overturns the land instead of feeding it.

Both drought and flood come from the same hand.

Job wants his friends to see how much this hand controls.

💧 God can release water without limit
🌊 Too much water floods the land
🔁 Drought and flood share one source
📖 That source controls far more than they admit

## 🎭 The Deceived And The Deceiver Are His

"Deceiver" means someone who tricks others on purpose.

"Deceived" means the person who gets fooled by that trick.

Job says both people still belong to God.

Even human dishonesty happens inside God's larger authority.

Nothing, not even deception, sits outside His control.

🎭 Deceiver means someone who tricks others
😵 Deceived means the one who gets fooled
🤝 Both belong to God either way
📖 Even deception sits under His control

# Job 12:17-21
# 👑 He Looseth The Bond Of Kings
---
## 📜 He Leadeth Counsellors Away Spoiled

"Counsellors" were trusted advisors to kings and leaders.

"Spoiled" here means stripped of status and led off like captives.

Job says even the most trusted advisors can be humbled by God.

Their titles and influence offer no real protection.

God can remove that standing whenever He chooses.

📜 Counsellors were trusted royal advisors
⛓️ Spoiled means stripped and led away
🏆 Titles offer no real protection
📖 God can remove standing at will

## ⚖️ Maketh The Judges Fools

Judges were respected for sound thinking and fair rulings.

Job says God can turn that same sound thinking into foolishness.

This reverses exactly what people expected from someone in that role.

No human position guarantees lasting wisdom.

Job continues stacking example after example of reversal.

⚖️ Judges were known for sound thinking
🌀 God can reverse that thinking
🎭 This upends what people expected
➡️ Job keeps stacking these reversals

## 🔓 He Looseth The Bond Of Kings

"Looseth" means to loosen or undo something that was tight.

"Bond" here points to the authority a king holds over his people.

Job says God can undo that royal authority whenever He wants.

A crown offers no permanent guarantee of power.

Even kings answer to a higher hand than their own.

🔓 Looseth means to undo or loosen
👑 Bond means a king's ruling authority
♟️ God can undo that authority
📖 Even kings answer to God

## 🧵 Girdeth Their Loins With A Girdle

A "girdle" here is a cloth or belt worn at the waist.

Servants and prisoners in this culture often wore a simple girdle like this.

Job pictures a king stripped of royal robes.

Then that king gets dressed like a captive instead.

This is a picture of complete reversal, not just loss of power.

🧵 A girdle was a simple waist cloth
⛓️ Servants and prisoners wore one like it
👑 A king dressed like a captive
📖 Even a king's clothes can change

## 👑 He Leadeth Princes Away Spoiled

Job repeats the same reversal he described for counsellors.

This time it happens to princes, the ruling class just below a king.

No level of noble birth protects a person from this kind of fall.

Job's list is climbing steadily toward the highest ranks of society.

Every rank he names still bends under God's hand.

👑 Princes ranked just below a king
🏰 Noble birth offers no protection
📈 Job's list climbs the social ladder
📖 Every rank bends under God

## 💪 Overthroweth The Mighty

"Mighty" describes people known for strength or military power.

"Overthroweth" means to violently bring something down.

Job says raw strength cannot outlast God's will either.

Muscles and armies fail the same as crowns and titles.

This line quietly answers anyone who trusts in strength alone.

💪 Mighty means strong or powerful people
🏚️ Overthroweth means to violently bring down
⚔️ Strength cannot outlast God's will
📖 This answers trust in strength alone

## 🤝 He Removeth Away The Speech Of The Trusty

"Trusty" describes people known for being reliable and honest.

Job says God can take away even their ability to speak clearly.

A trusted voice suddenly losing its words is a strange and humbling picture.

Reliability is not permanent, no matter how strong it looks.

God controls even the words that come out of a trusted mouth.

🤝 Trusty means known for being reliable
🗣️ God can silence their speech
😶 A trusted voice can suddenly falter
📖 God controls even trusted words

## 👴 Taketh Away The Understanding Of The Aged

This line directly answers verse twelve, where wisdom was linked to old age.

Job now shows that assumption does not always hold true.

God can remove clear thinking even from someone who has lived a long life.

Age alone never guaranteed wisdom in the first place.

Job is dismantling the exact assumption his friends leaned on.

👴 This answers the claim from verse twelve
🧓 Age alone never guaranteed wisdom
🌫️ God can cloud even an elder's mind
➡️ Job dismantles their old assumption

## 😠 He Poureth Contempt Upon Princes

"Contempt" means a deep, public kind of disrespect.

"Poureth" pictures this disrespect coming down suddenly, like water poured out.

Job says God can make even honored princes into objects of scorn.

Public honor can vanish just as quickly as it arrived.

Nothing in this list has been a private, quiet fall.

😠 Contempt means deep public disrespect
🌊 Poureth pictures it falling suddenly
👑 Even princes can become objects of scorn
📖 Public honor can vanish quickly

## 🔚 Weakeneth The Strength Of The Mighty

This final line closes the whole list Job has been building.

Every category of human power named in these verses has now fallen.

Counsellors, judges, kings, princes, the trusty, the aged, and now the mighty.

Job is not describing chaos.

He is describing total authority.

God, not misfortune, stands behind every reversal in this list.

🔚 This line closes Job's whole list
📋 Every kind of human power has fallen
🎯 Job describes authority, not chaos
📖 God stands behind every reversal

# Job 12:22-25
# 🌑 He Discovereth Deep Things Out Of Darkness
---
## 🔦 He Discovereth Deep Things Out Of Darkness

"Discovereth" means to uncover or bring something hidden into view.

Job says nothing stays hidden from God, no matter how deeply buried.

Secrets kept in total darkness are still visible to Him.

This includes hidden motives, hidden plans, and hidden sin.

Job's own hidden situation is not actually hidden from God either.

🔦 Discovereth means to uncover something hidden
🕳️ Nothing stays buried from God
🤫 Even hidden motives are visible to Him
📖 Job's own case is not hidden either

## 🌑 Bringeth Out To Light The Shadow Of Death

"Shadow of death" is a common Old Testament phrase for the deepest darkness.

It can describe near death, deep despair, or total hopelessness.

Job says God can bring even that darkness out into full light.

Nothing is too dark or too final for God to expose.

This includes whatever darkness Job himself is currently sitting in.

🌑 Shadow of death means deepest darkness
😔 It can mean despair or near death
💡 God can expose even that darkness
📖 That includes Job's own darkness

## 🌍 He Increaseth The Nations, And Destroyeth Them

Job zooms out from individuals to entire nations.

"Increaseth" means to grow larger and more powerful.

Job says the same God who builds up a nation can also bring it down.

No empire's rise is permanent just because it happened.

This adds nations to the long list Job has already given.

🌍 Increaseth means to grow larger
📈 God builds nations up
📉 God can bring them down too
📖 No empire's rise is permanent

## 📏 He Enlargeth The Nations, And Straiteneth Them Again

"Straiteneth" means to squeeze something into a smaller, tighter space.

Job pairs growth and shrinking together on purpose.

A nation's borders can expand under God's hand.

Those same borders can shrink again just as easily.

He sees a single hand guiding both directions.

📏 Straiteneth means squeezed into a tighter space
📐 Growth and shrinking are paired together
🗺️ Borders can expand and shrink under God
📖 One hand guides both directions

## 🧠 He Taketh Away The Heart Of The Chief

"Heart" in this verse means clear thinking and good judgment, not emotion.

"Chief" refers to a nation's top leader.

Job says God can strip even a leader of clear judgment.

A leader without that judgment becomes dangerous to everyone under him.

Nations often fall not from weak armies but from confused leaders.

🧠 Heart here means clear judgment
👑 Chief means a nation's top leader
😵 God can strip that judgment away
📖 Confused leaders can bring down nations

## 🏜️ Causeth Them To Wander In A Wilderness Where There Is No Way

Job pictures leaders left without any clear path forward.

A wilderness with no way is a place built for getting lost.

Once judgment is gone, even the most powerful leader wanders blindly.

This image completes the picture started in the line before it.

Confusion at the top eventually spreads down to everyone else.

🏜️ A wilderness with no way means lost
🧭 Leaders wander without clear judgment
👑 Even powerful leaders can wander blindly
📖 Confusion at the top spreads downward

## 🕶️ They Grope In The Dark Without Light

"Grope" means to feel around blindly, unable to see where to step.

Job pictures a leader or a whole nation stumbling like someone in a pitch dark room.

This is not a small stumble.

It is total helplessness.

No amount of former power fixes this kind of blindness.

Job uses this picture to show how fast greatness can collapse.

🕶️ Grope means to feel around blindly
🌑 This pictures total helplessness
🏆 Former power cannot fix this blindness
📖 Greatness can collapse this fast

## 🍷 He Maketh Them To Stagger Like A Drunken Man

Job closes the chapter with one final, vivid picture.

A drunken man cannot walk a straight line no matter how hard he tries.

Job says confused leaders and falling nations look exactly like that.

This is not random chaos in the world.

It is God's own hand at work.

Job has spent this whole chapter proving that God controls every reversal in life.

🍷 A drunken man cannot walk straight
🌀 Confused leaders look the same way
✋ This is God's hand, not chaos
📖 God controls every reversal in life
`.trim();

export const JOB_TWELVE_PERSONAL_SECTIONS = parseJobTwelveRawNotes(JOB_TWELVE_RAW_NOTES);
