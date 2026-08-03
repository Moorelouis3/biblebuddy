export type LeviticusFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusFiveRawNotes(rawText: string): LeviticusFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 5:${startVerse}` : `Leviticus 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 5 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_FIVE_RAW_NOTES = `# Leviticus 5:1-4
# 🤐 Four Silent Ways To Become Guilty
---
## 🗣️ And Hear The Voice Of Swearing

"The voice of swearing" means a public oath.

Someone stood up in a dispute and swore to the truth in front of others.

A witness who heard that oath was expected to speak up if they knew the facts.

This law targets that silent witness, not the person already on trial.

🗣️ Voice of swearing means a public oath

⚖️ A dispute needed a witness to speak

🤐 This law targets the silent witness

📖 Truth telling was treated as a duty

## 🤐 Then He Shall Bear His Iniquity

"Iniquity" means guilt, and everything that guilt requires a person to face.

Bearing his iniquity means the guilt becomes his to answer for.

Chapter four already covered sins of wrong action.

This verse introduces something different, a sin of staying silent.

🤐 Silence itself could become the sin

📜 Chapter four covered actions, not silence

⚖️ Iniquity means guilt and its full weight

📖 Staying quiet still carried real cost

## 🐫 A Carcase Of An Unclean Beast

"Carcase" means a dead body.

Touching a dead unclean animal made a person unclean under the purity laws.

This uncleanness was ceremonial, not a moral failure by itself.

Leviticus eleven later explains exactly which animals counted as unclean.

🐫 Carcase means a dead body

🚫 Touching it made a person unclean

📏 This uncleanness was ceremonial, not moral

📖 Leviticus eleven names the animals later

## 🙈 And If It Be Hidden From Him

"Hidden from him" means he did not realize it at the time.

Maybe he brushed past the carcase in the dark or did not recognize it.

The guilt was not for touching it by accident.

The guilt began the moment he actually realized what had happened.

🙈 Hidden from him means he did not notice

⏰ Guilt began only once he realized

🔁 This matches chapter four's pattern

📖 Awareness, not the act, triggered guilt

## 🧍 Or If He Touch The Uncleanness Of Man

This third case covers contact with another person's uncleanness.

Certain bodily conditions made a person ceremonially unclean.

Leviticus twelve through fifteen will later explain exactly which conditions counted.

The same pattern from the carcase repeats. Guilt starts once he knows.

🧍 This covers contact with human uncleanness

📖 Leviticus twelve through fifteen explains it later

🔁 The same guilt pattern repeats from before

➡️ Awareness still marked when guilt began

## 🗯️ Pronouncing With His Lips To Do Evil, Or To Do Good

Unlike the courtroom oath back in verse one, this is a private vow.

A person promised something out loud without thinking it through first.

"Pronouncing with his lips" means the spoken words themselves created a real obligation.

Numbers thirty later covers this same kind of vow in far more detail.

🗯️ This is a rash personal vow

🗣️ Spoken words alone created the obligation

📖 Numbers thirty covers vows further

➡️ Careless speech carried real consequences

## 🔢 Then He Shall Be Guilty In One Of These

Four very different situations just got covered in one short section.

A silent witness, an unclean carcase, human uncleanness, and a careless oath.

All four end with the exact same rule about guilt.

Guilt begins the moment a person actually realizes what happened, not before.

🔢 Four different situations share one rule

⏰ Guilt starts at the moment of realizing

🎯 The next verses explain what to do next

📖 God cared about the honesty of the heart

# Leviticus 5:5-6
# 🗣️ Confess, Then Bring An Offering
---
## 🗣️ He Shall Confess That He Hath Sinned In That Thing

Confession here means speaking the specific sin out loud, not just feeling sorry.

Chapter four never spelled out this step this plainly.

The spoken confession comes before the offering, not after it.

Quiet guilt was not enough. Words had to be said first.

🗣️ Confession meant speaking the sin aloud

🆕 Chapter four did not require this step

✅ Owning the sin came before the ritual

📖 Words mattered as much as the offering

## 🐑 A Female From The Flock, A Lamb Or A Kid Of The Goats

One single offering covers all four situations from verses one through four.

Silence as a witness, touching a carcase, human uncleanness, or a careless oath.

The required animal stayed the same across every one of them.

This matches the ordinary tier chapter four already set for a common Israelite.

🔀 One offering covers four different sins

🐑 A female lamb or goat was required

📖 Chapter four already set this same tier

➡️ Different sins led to one shared solution

## ✝️ The Priest Shall Make An Atonement For Him Concerning His Sin

"Trespass offering" and "sin offering" describe the exact same animal in this verse.

Later in this chapter, starting at verse fourteen, trespass offering becomes its own separate category.

Right now the two Hebrew terms still overlap in everyday use.

The priest performs the atonement no matter which of the four sins applied.

🔤 Trespass and sin offering overlap here

🎯 The outcome, not the sin, stayed constant

✝️ The priest always performs the atonement

📖 Verse fourteen splits them into separate ideas

# Leviticus 5:7-10
# 🕊️ Too Poor For A Lamb, Bring Two Birds
---
## 🕊️ If He Be Not Able To Bring A Lamb

This begins an economic plan that runs through the rest of the chapter.

Nobody in Israel was priced out of forgiveness by this law.

If a lamb or goat was truly out of reach, a cheaper path opened at once.

An even cheaper option follows later, starting in verse eleven.

🕊️ A cheaper offering option begins here

💰 Cost never blocked the path to forgiveness

📖 Verse eleven offers something cheaper still

➡️ God kept lowering the bar, not the standard

## 🕊️ Two Turtledoves, Or Two Young Pigeons

Turtledoves and young pigeons were common birds and cheap to obtain.

Even a poor family could usually catch or raise them nearby.

Luke two twenty four shows Mary and Joseph bringing exactly this offering for Jesus.

That small detail quietly shows the economic tier Jesus's own family stood in.

🕊️ These birds were cheap and common

✝️ Luke two twenty four names this offering

👶 It reveals the poverty of Jesus's family

📖 God provided even for the poorest family

## 🔀 One For A Sin Offering, And The Other For A Burnt Offering

The two birds did not do the same job in this ritual.

The first bird replaced the lamb as the sin offering for guilt.

The second bird became an added burnt offering, the category covered back in chapter one.

This cheaper option actually included one more offering than the lamb tier required.

🔀 The two birds served two purposes

🐑 One bird stood in for the lamb

🔥 The other added a full burnt offering

📖 The cheaper path still gave more

## ✂️ Wring Off His Head From His Neck, But Shall Not Divide It Asunder

"Wring off" means twisting the bird's head to kill it quickly.

This method suited something this small and light.

Larger animals in chapters one and four instead had their throats cut.

"Not divide it asunder" means the bird stayed mostly whole, not torn fully apart.

✂️ Wring off means killing by twisting

🔪 Larger animals used a different method

🧩 The bird was not torn fully apart

➡️ The ritual scaled down to fit the animal

## 🩸 Sprinkle Of The Blood Of The Sin Offering Upon The Side Of The Altar

A bird holds far too little blood to reach the altar's horns.

Chapter four used the horns for a bullock or a goat instead.

Here the blood is simply sprinkled on the altar's side.

The ritual still applied blood to the altar, just at a much smaller scale.

🩸 A bird's blood went on the altar's side

📏 This scaled the ritual to fit its size

🔁 The core principle still stayed the same

📖 Even a small offering still counted fully

## 🔥 He Shall Offer The Second For A Burnt Offering, According To The Manner

"According to the manner" points back to chapter one's bird instructions.

Leviticus does not repeat instructions it has already given in full.

By this point in the book, the reader is expected to remember the procedure.

Chapter one, verses fourteen through seventeen, spelled out that exact procedure first.

🔥 According to the manner means as before

✂️ Leviticus shortens what it already explained

📖 Chapter one gave the full bird procedure

➡️ Familiar readers needed fewer repeated details

## ✝️ And It Shall Be Forgiven Him

The outcome here matches every earlier tier already covered in this chapter.

A bullock, a goat, a lamb, or now two birds, all produced identical forgiveness.

Poverty changed the required animal every single time.

Poverty never once changed the actual result.

✝️ Every tier ends in the same forgiveness

💰 A cheaper offering worked just as well

📏 Only the animal's cost ever changed

📖 God's mercy did not scale with wealth

# Leviticus 5:11-13
# 🌾 Too Poor For Birds, Bring Flour
---
## 🌾 If He Be Not Able To Bring Two Turtledoves

This is a third and even lower economic tier than the birds.

It exists for someone who could not afford even two cheap birds.

Leviticus kept lowering the bar rather than ever shutting someone out completely.

Forgiveness in this system was never priced beyond anyone's reach.

🌾 This is the lowest tier in the chapter

💰 It covers those too poor for birds

🙌 Nobody was ever priced out completely

📖 The system bent toward the poor, not away

## 🌾 The Tenth Part Of An Ephah Of Fine Flour

An ephah was a large dry measure, close to two thirds of a bushel.

A tenth of an ephah is the same amount later called an omer elsewhere in scripture.

Exodus sixteen sixteen uses that exact portion as one person's daily food.

Even the poorest offering here echoed God's own daily care for His people.

🌾 An ephah was a large dry measure

🍞 A tenth of it equaled one omer

📖 Exodus sixteen sixteen used this same amount

➡️ The smallest gift still echoed God's provision

## 🚫 He Shall Put No Oil Upon It, Neither Shall He Put Any Frankincense Thereon

Chapter two required both oil and frankincense for the ordinary grain offering.

Those two costly ingredients marked a joyful, willing gift to God.

Leaving them out here was deliberate, not an oversight by the priest.

This flour dealt with guilt, so it stayed plain instead of festive.

🚫 Oil and frankincense marked a joyful gift

⚠️ Leaving them out here was on purpose

🎯 This offering dealt with guilt, not joy

📖 Even the missing ingredients carried meaning

## ✋ The Priest Shall Take His Handful Of It, Even A Memorial Thereof

"Memorial" is the same word used for the grain offering's handful back in chapter two.

Only a small portion of the flour actually went onto the fire.

That single handful stood in for the entire offering being given.

Leviticus reused a familiar pattern instead of inventing something new.

✋ Memorial means a token portion representing all

🔥 Only a handful was actually burned

🔁 This reused chapter two's grain pattern

📖 A small part still represented the whole

## 🍞 The Remnant Shall Be The Priest's, As A Meat Offering

"Meat offering" in King James English is an old term for a grain offering.

It does not mean animal meat at all.

The leftover flour, once the priest's handful was burned, became food for the priests.

Even the poorest sinner's offering still fed the men who served at the tabernacle.

🍞 Meat offering here means grain, not meat

🍽️ Leftover flour became food for priests

🙏 Even the cheapest gift still fed someone

📖 Small gifts still served a real purpose

# Leviticus 5:14-16
# ⚠️ Sinning Against Holy Things
---
## 📜 And The LORD Spake Unto Moses, Saying

This formula marks a new topic starting partway through the chapter.

Verses one through thirteen covered the ordinary sin offering.

Verses fourteen through nineteen shift to a related but separate offering instead.

The Hebrew word behind this new category is asham, the trespass offering.

📜 This formula signals a fresh topic

🔀 The chapter now shifts to a new offering

📖 Asham is the Hebrew word for trespass

➡️ Related categories still stayed distinct

## ⚠️ And Sin Through Ignorance, In The Holy Things Of The LORD

"Holy things of the LORD" means anything set apart specifically for God.

Tithes, firstfruits, and portions reserved for the priests all counted as holy things.

This case covers accidentally mishandling one of those set apart items.

A common example was unknowingly eating food that actually belonged to the priests.

⚠️ Holy things means anything set apart for God

🤝 This covers accidentally misusing something sacred

🍞 Eating priestly food by mistake was one example

📖 Even sacred things got sinned against by accident

## 🐏 A Ram Without Blemish Out Of The Flocks, With Thy Estimation By Shekels Of Silver, After The Shekel Of The Sanctuary

A ram is required here for the first time in this whole chapter.

It cost far more than a lamb, a goat, a bird, or flour.

"The shekel of the sanctuary" was a fixed, official weight standard.

It was heavier and more exact than an everyday shekel, so nobody could shortchange the payment.

🐏 A ram was required for this offense

💰 It cost more than any earlier option

⚖️ The sanctuary shekel was an official standard

📖 Precision protected against underpayment

## 💰 Make Amends For The Harm That He Hath Done In The Holy Thing, And Shall Add The Fifth Part Thereto

Real repayment enters this chapter for the first time here.

The guilty person paid back the full value of what they had mishandled.

A twenty percent penalty was added on top of that repayment.

No earlier offering in this chapter demanded literal repayment like this one.

💰 Real repayment was required here

➕ A twenty percent penalty was added

🆕 No earlier offering demanded repayment

📖 Measurable harm required a measurable fix

## ✝️ The Priest Shall Make An Atonement For Him With The Ram Of The Trespass Offering

Both parts were required together, not just one or the other.

Paying back the debt plus the penalty, and offering the ram itself.

Repayment alone did not finish the matter by itself.

Making things right with people never replaced making things right with God.

✝️ Both repayment and ritual were required

🤝 People and God both needed peace

🎯 Neither part alone was ever enough

📖 Justice and worship worked side by side

# Leviticus 5:17-19
# 🐏 Guilty Even Without Knowing The Law
---
## ❓ Though He Wist It Not, Yet Is He Guilty

"Wist" is an old word meaning knew.

This verse says not even knowing a law existed removes the guilt of breaking it.

Chapter four already showed that guilt can exist without any intent to sin.

This verse goes further still. Guilt exists without any awareness a rule was broken.

❓ Wist is the old word for knew

⚖️ Not knowing the law did not excuse it

📈 This pushes chapter four's idea even further

📖 Ignorance did not erase real guilt

## 🐏 A Ram Without Blemish Out Of The Flock, With Thy Estimation

This is the same ram and the same priestly valuation used back in verses fourteen through sixteen.

The offering matches even though the exact wrongdoing here stays unnamed.

Leviticus reused an offering it had already defined rather than inventing a new one.

The category of the sin, not the specific act, decided the required offering.

🐏 The same ram and valuation apply here

📏 The exact offense stays unnamed this time

🔁 Leviticus reused an offering already defined

📖 The category decided the required offering

## 😟 Concerning His Ignorance Wherein He Erred And Wist It Not

"Erred" means made a genuine mistake.

"Wist it not" repeats plainly that he truly did not know.

Real ignorance did not erase real guilt in this system.

It also did not put a person beyond the reach of forgiveness.

⚖️ Erred means made an honest mistake

🔁 This repeats that he truly did not know

🎯 Guilt and grace both stayed true at once

📖 Forgiveness reached even honest mistakes

## 📋 It Is A Trespass Offering

This closing label gives the whole section its formal name.

Everything from verse fourteen to this point falls under one category.

Naming it plainly closes out the case law before the next chapter begins.

Leviticus six continues this same trespass category with more examples.

📋 This section gets one formal closing name

🔀 Everything since verse fourteen fits this label

🔚 Naming it plainly closes the case law

📖 Leviticus six continues with more examples

## ✅ He Hath Certainly Trespassed Against The LORD

"Certainly" removes any doubt about whether the guilt was real.

That word choice mattered even when the sinner never knew a rule existed.

Human courts sometimes excuse genuine ignorance of the law.

Before God, this verse says plainly that the guilt still stood.

✅ Certainly removes any doubt about guilt

⚖️ Guilt stood even without any awareness

👨‍⚖️ Human courts often treat ignorance differently

📖 God's standard did not bend for ignorance
`.trim();

export const LEVITICUS_FIVE_PERSONAL_SECTIONS = parseLeviticusFiveRawNotes(LEVITICUS_FIVE_RAW_NOTES);
