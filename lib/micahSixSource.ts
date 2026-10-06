export type MicahSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahSixRawNotes(rawText: string): MicahSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 6:${startVerse}` : `Micah 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Micah 6 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_SIX_RAW_NOTES = `# Micah 6:1-5
# ⚖️ The LORD's Lawsuit
---
## ⚖️ Arise, Contend Thou Before The Mountains

Contend means to argue a formal legal case.

Micah pictures God opening a courtroom scene here.

The mountains are being called in as witnesses.

They were there when Israel first made this covenant.

Nothing in creation is old enough to forget that promise.

⚖️ Contend means a formal legal case

🏔️ Mountains are called as witnesses

📜 They watched the covenant get made

📖 Nothing is old enough to forget it
---
## 🏔️ Let The Hills Hear Thy Voice

Mountains and hills are not two separate audiences here.

Hebrew poetry often says the same thing twice in different words.

This pattern repeats constantly through the Psalms and the Prophets.

Saying it twice makes the point impossible to miss.

Every corner of creation is being summoned to hear this case.

🔁 Mountains and hills repeat one idea

📜 This is called Hebrew parallelism

📚 It appears often in Psalms and Prophets

📖 Repetition makes the point impossible to miss
---
## 📜 The LORD's Controversy

Controversy here means a formal legal complaint, not an argument.

It is the same legal idea behind the word contend.

Foundations of the earth stands for everything permanent and unmoving.

Even the most solid things on earth are called to listen.

God is building an airtight case before he says another word.

📜 Controversy means a formal legal complaint

⚖️ It matches the word contend exactly

🗻 Foundations means the permanent parts of earth

📖 God builds his case before speaking further
---
## 🤝 He Will Plead With Israel

Plead here means arguing a case in court, not begging.

God is not asking Israel for pity or mercy.

He is presenting evidence like a lawyer before a judge.

The irony is that God is both plaintiff and judge here.

Israel cannot win a case this well prepared.

⚖️ Plead means arguing a legal case

🙅 God is not begging for pity

🧾 He presents evidence like a lawyer

📖 Israel cannot win this prepared case
---
## ❓ Testify Against Me

God is confident enough to invite the defense to speak.

Testify means to give sworn evidence in court.

A guilty party would never ask the other side to accuse them.

God turns the courtroom around by inviting his own cross examination.

His invitation is itself proof that he has done nothing wrong.

⚖️ Testify means giving evidence in court

🙋 God invites the defense to speak

🚫 A guilty party would never do this

📖 The invitation itself proves his innocence
---
## 😮 Wherein Have I Wearied Thee

Wearied means to tire someone out or wear them down.

God asks if he has ever been a burden to his people.

The expected answer is a clear no on both questions.

Israel has plenty of complaints, but none of them are really about God.

The real problem has never been God's conduct toward them.

😮 Wearied means tiring someone out

🙅 God asks if he has burdened them

✅ The expected answer is clearly no

📖 The real problem was never God
---
## 🔓 Redeemed Thee Out Of The House Of Servants

Redeemed means paying the price to set a slave free.

House of servants is another name for Egypt itself.

Egypt is described by what it did to Israel, not its geography.

Every Israelite listening remembered their own family's slavery there.

God reminds them exactly what kind of life he pulled them from.

🔓 Redeemed means buying a slave's freedom

🏚️ House of servants names Egypt itself

⛓️ Egypt is named by its cruelty

📖 God reminds them what he rescued them from
---
## 👩 Moses, Aaron, And Miriam

Miriam was Moses and Aaron's older sister.

She led the women in worship after Israel crossed the Red Sea.

Scripture even calls her a prophetess in her own right.

Naming her here alongside her brothers honors a leader easy to overlook.

God sent more than one kind of leader to bring them out.

👩 Miriam was Moses and Aaron's sister

🎶 She led worship after the Red Sea

📜 Scripture calls her a true prophetess

📖 God sent more than one leader
---
## 🐴 What Balak King Of Moab Consulted

Balak was a Moabite king afraid of Israel's growing strength.

He hired the prophet Balaam to curse Israel instead of fighting them.

God turned every curse Balaam tried into a blessing instead.

The story is told in full back in Numbers chapters twenty two through twenty four.

Micah brings it up to remind Israel how far God has already protected them.

🐴 Balak feared Israel's growing strength

🗣️ He hired Balaam to curse them

🔄 God turned curses into blessings

📖 This story is told in Numbers
---
## 🛤️ From Shittim Unto Gilgal

Shittim was Israel's last camp before crossing into the promised land.

Gilgal was the first camp they set up once they arrived.

Naming both spots marks the whole journey from waiting to arriving.

Righteousness of the LORD means his record of keeping every promise made.

From Shittim to Gilgal, God's faithfulness never once stopped moving with them.

🏕️ Shittim was the last camp before entry

🏁 Gilgal was the first camp after entry

🧭 This span names the whole journey

📖 God's faithfulness never stopped moving with them
# Micah 6:6-8
# 🐑 What Doth The LORD Require
---
## 🙇 Bow Myself Before The High God

Bow here means a physical posture of worship and submission.

High God emphasizes just how far above humanity God truly is.

The question itself admits that approaching him is not casual.

Whoever asks this already senses the weight of standing before God.

The real question is not posture, but what God actually wants.

🙇 Bow means a posture of worship

⛰️ High God stresses God's greatness

😟 The question admits this is not casual

📖 The real issue is what God wants
---
## 🐂 Burnt Offerings, With Calves Of A Year Old

A burnt offering was an animal completely burned up on the altar.

It was the costliest basic sacrifice a worshiper could bring.

Calves of a year old were prime animals, not weak leftovers.

The question offers God the best possible version of this gift.

Even the finest sacrifice is about to be shown as not enough.

🔥 Burnt offerings were fully burned animals

💰 This was the costliest basic sacrifice

🐂 A year old calf was prime stock

📖 Even the best sacrifice falls short here
---
## 🌊 Ten Thousands Of Rivers Of Oil

This number is not a real estimate, it is deliberate exaggeration.

No one actually owned rivers of oil to pour out.

The question keeps escalating to show how far someone would go.

Piling up impossible amounts was never going to satisfy God.

Quantity was never the thing God was actually asking for.

🌊 Rivers of oil is not literal

📈 The number keeps escalating on purpose

🚫 No amount of oil was ever the goal

📖 Quantity was never what God wanted
---
## 👶 Shall I Give My Firstborn For My Transgression

This question jumps to the most extreme offering a person could imagine.

Some neighboring nations actually practiced child sacrifice to their gods.

God's own law forbids this practice in the strongest terms.

The question exposes how far people will wrongly go chasing forgiveness.

Not even a child could buy what obedience was already meant to give.

👶 This is the most extreme offering imaginable

🕯️ Some nations practiced child sacrifice nearby

🚫 God's law forbids this completely

📖 Obedience was always the real answer
---
## 📖 He Hath Shewed Thee, O Man, What Is Good

This is not a brand new requirement God is revealing for the first time.

Shewed means God had already made this clear long before now.

The law and the prophets had already taught this same lesson.

The questioner is not confused, he already knows the answer.

God is about to simply remind him of what he already knows.

📖 Shewed means already made clear

📜 The law already taught this lesson

🤔 The questioner already knows the answer

➡️ God simply reminds him of the truth
---
## ⚖️ To Do Justly

Justly means treating people honestly in everyday dealings.

This is not an abstract virtue to admire from a distance.

It shows up in how someone pays wages or settles a dispute.

God starts his answer with something measurable, not mystical.

Fairness toward other people is the first mark of a good life.

⚖️ Justly means fair everyday dealings

💵 It shows in wages and disputes

📏 This is measurable, not mystical

📖 Fairness toward people comes first
---
## ❤️ To Love Mercy

Mercy here translates the Hebrew word hesed, loyal covenant love.

Loving mercy means wanting to show it, not just doing it when forced.

This is the same loyal love God has shown Israel throughout the chapter.

God is asking for the attitude behind the action, not just the action.

Kindness that is grudging misses the point of this command.

❤️ Hesed means loyal covenant love

🙂 Loving it means wanting to give it

🔁 This mirrors God's own loyalty to Israel

📖 The attitude matters as much as the act
---
## 🚶 To Walk Humbly With Thy God

Walk pictures an ongoing daily relationship, not a single ritual visit.

Humbly means remembering your proper place before God.

This is the exact opposite of the earlier bargaining questions.

Those questions tried to buy God off instead of simply walking with him.

The whole chapter's question gets answered in these three simple commands.

🚶 Walk means an ongoing daily relationship

🙇 Humbly means knowing your proper place

🔄 This reverses the earlier bargaining questions

📖 Three simple commands answer the whole question
# Micah 6:9-12
# 🏙️ The City's Crooked Business
---
## 🗣️ The Man Of Wisdom Shall See Thy Name

Wisdom here means discernment to recognize and respect God's reputation.

Seeing God's name means recognizing exactly who is speaking through this warning.

A wise person reads a situation correctly instead of ignoring it.

The crowd about to be judged needed this kind of clear sight.

Wisdom starts with taking God's reputation seriously.

🧠 Wisdom means recognizing God's reputation

👀 Seeing his name means knowing who speaks

🔍 A wise person reads the situation correctly

📖 Wisdom starts with taking God seriously
---
## 🪓 Hear Ye The Rod, And Who Hath Appointed It

Rod here is a symbol for coming punishment or discipline.

Appointed means God himself assigned this judgment on purpose.

This is not bad luck or a random disaster striking the city.

The warning names both the punishment and who sent it.

Nothing about what is coming is an accident.

🪓 Rod means coming punishment

✍️ Appointed means God assigned it

🚫 This is not random bad luck

📖 Nothing coming is an accident
---
## 💰 Treasures Of Wickedness

Treasures of wickedness means wealth gained by dishonest and cruel means.

This is not money that was simply earned and saved honestly.

The treasure itself carries the guilt of how it was gotten.

God notices how wealth was built, not just how much exists.

A full account is worth nothing if it was built on wrong.

💰 These treasures were gained dishonestly

🚫 This is not honest savings

⚖️ Guilt is attached to how it was gotten

📖 God checks how wealth was built
---
## 📏 The Scant Measure That Is Abominable

A scant measure was a container made smaller than it claimed to be.

Merchants used it to secretly cheat customers on every sale.

Abominable is the same strong word used elsewhere for idolatry.

Cheating a buyer is treated here as seriously as worshiping a false god.

Dishonest business was never a small or separate sin in God's eyes.

📏 A scant measure cheated on size

🤝 Merchants used it on every sale

🚫 Abominable is the same word for idolatry

📖 Cheating ranked as seriously as idolatry
---
## ❓ Shall I Count Them Pure

Pure here is a legal word meaning innocent and cleared of guilt.

The question is rhetorical, expecting one clear answer.

Nobody running a business like this could honestly be called clean.

The answer God expects is an obvious no.

Their own practices already convict them before any sentence is spoken.

⚖️ Pure means legally innocent

❓ This question expects one clear answer

🚫 Nobody here could honestly be called clean

📖 Their practices already convict them
---
## ⚖️ Wicked Balances, And With The Bag Of Deceitful Weights

Merchants carried stone weights in a bag to balance their scales.

A rigged set of weights let a seller secretly cheat every buyer.

This was not a one time trick.

It happened on every single sale.

Deceitful weights describes a whole system built around constant small lies.

Daily dishonesty like this is exactly what God is putting on trial.

⚖️ Weights were carried in a bag

🎭 Rigged weights cheated every single buyer

🔁 This happened on every sale, not once

📖 Daily dishonesty is on trial here
---
## 💪 The Rich Men Thereof Are Full Of Violence

This wealth was not built through hard honest work.

Full of violence means force and exploitation funded their fortune.

The rich in this city got that way by hurting others.

God names the method, not just the outcome.

How wealth was made matters as much as how much was made.

💪 Violence funded their fortune

🚫 This was not honest hard work

😢 They got rich by hurting others

📖 How wealth was made matters
---
## 🗣️ Their Tongue Is Deceitful In Their Mouth

This repeats the lying already mentioned earlier in the same verse.

Repeating it shows dishonesty was constant, not an occasional slip.

Deceitful speech had become simply how these people talked every day.

A deceitful tongue matches the deceitful weights already described.

Every tool this city used, scales and speech, told the same lie.

🔁 This repeats the earlier lying charge

📢 Dishonesty was constant, not occasional

🗣️ Lying had become their normal speech

📖 Their words matched their rigged scales
# Micah 6:13-16
# 🌾 The Curse Of Futility
---
## 🤕 I Will Make Thee Sick In Smiting Thee

Smiting here means striking someone down in judgment.

Sick pictures the whole nation left weak and wounded.

The punishment is described as an injury, not just a loss.

This sickness is the direct result of their own actions.

God is not attacking without cause, this is consequence.

🤕 Smiting means striking in judgment

🤒 Sick pictures a weakened nation

🎯 This is an injury, not just a loss

📖 This sickness is a direct consequence
---
## 🏜️ Desolate Because Of Thy Sins

Desolate means emptied out and left without resources.

Because of thy sins names the exact cause plainly.

This judgment is not random.

It is directly earned.

God states the connection instead of leaving it a mystery.

Cause and effect are placed side by side on purpose.

🏜️ Desolate means emptied of resources

🎯 Because of thy sins names the cause

🚫 This judgment was not random

📖 Cause and effect sit side by side
---
## 🍽️ Thou Shalt Eat, But Not Be Satisfied

This pictures a hunger that eating itself cannot fix.

It is a specific curse named earlier in the law in Deuteronomy.

Food goes in.

The emptiness stays exactly the same.

The curse targets the most basic daily need there is.

Even full meals cannot undo what disobedience has broken.

🍽️ This hunger cannot be fixed by eating

📜 It is a curse named earlier in Deuteronomy

🕳️ The emptiness stays no matter what

📖 Even full meals cannot undo disobedience
---
## 📉 Thy Casting Down Shall Be In The Midst Of Thee

Casting down pictures an inward collapse, not an outside attack.

In the midst of thee means the trouble lives inside them.

No enemy army is needed to cause this particular suffering.

The nation is falling apart from within its own walls.

This is judgment working from the inside out.

📉 Casting down means inward collapse

🏚️ The trouble lives inside them

🚫 No outside enemy is needed here

📖 Judgment works from the inside out
---
## ✋ Thou Shalt Take Hold, But Shalt Not Deliver

Take hold means trying to grab and protect something valuable.

Deliver here means successfully carrying it to safety.

The effort to save something is about to fail anyway.

Every attempt to protect what matters comes up empty.

Even their best efforts cannot outrun this judgment.

✋ Take hold means trying to protect something

🚫 Deliver means carrying it safely away

❌ The effort to save it fails anyway

📖 Their best efforts cannot outrun judgment
---
## ⚔️ That Which Thou Deliverest Will I Give Up To The Sword

Whatever they do manage to save gets handed over anyway.

The sword here names conquest by an invading enemy army.

Even a rare success turns into another loss in the end.

This shows how complete this coming judgment really is.

There is no safe hiding place left in this curse.

⚔️ The sword names invasion by an enemy

🔄 Even a rare success ends in loss

🎯 This shows how complete the judgment is

📖 No safe hiding place is left
---
## 🌱 Thou Shalt Sow, But Thou Shalt Not Reap

Sowing means planting seed, reaping means gathering the harvest.

This curse breaks the connection between hard work and result.

Deuteronomy already warned that disobedience would end this way.

Labor continues.

The payoff never actually arrives.

Work without fruit is one of the oldest covenant curses.

🌱 Sowing means planting, reaping means harvest

🔗 This breaks work from its result

📜 Deuteronomy warned of this exact curse

📖 Work without fruit is an old curse
---
## 🫒 Thou Shalt Tread The Olives, But Thou Shalt Not Anoint Thee With Oil

Treading olives was the ancient way of pressing oil out by foot.

Anointing with oil was an everyday habit, not just a ritual.

People used it on their skin the way others use lotion today.

The curse removes a small daily comfort, not only a ritual one.

Even ordinary comforts were part of what this judgment took away.

🫒 Treading pressed oil out by foot

🧴 Anointing with oil was an everyday habit

☀️ It worked like lotion does today

📖 This judgment took daily comforts too
---
## 🍇 Sweet Wine, But Shalt Not Drink Wine

Sweet wine means fresh grape juice, newly pressed and not yet aged.

This is the third picture of labor without any personal reward.

Field, orchard, and vineyard are all named in these two verses.

Every normal source of provision gets touched by this same curse.

Nothing a person grew was safe from this particular judgment.

🍇 Sweet wine means fresh grape juice

🔢 This is the third labor picture here

🌾 Field, orchard, and vineyard are all named

📖 Every source of provision was touched
---
## 👑 The Statutes Of Omri Are Kept

Omri was a king of Israel's northern kingdom known for wickedness.

He founded a royal dynasty that led the nation deeper into idolatry.

Statutes here means the corrupt customs and policies he established.

Judah is accused of copying a northern kingdom's worst example.

Following a bad king's playbook was never going to end well.

👑 Omri was a wicked northern king

🏛️ He founded a corrupt royal dynasty

📜 Statutes means his corrupt customs

📖 Judah copied the worst example available
---
## 😈 All The Works Of The House Of Ahab

Ahab was Omri's son and an even worse king than his father.

He married Jezebel and promoted Baal worship across the whole kingdom.

House of Ahab names his whole royal family and their policies.

Naming both kings together shows Judah copied the worst of both.

This was not a small slip.

It was two generations of wrong leadership.

😈 Ahab was worse than his father

💍 He married Jezebel and pushed Baal worship

👪 House of Ahab names his whole dynasty

📖 Judah copied two generations of wrong leaders
---
## 😏 An Hissing

Hissing describes a mocking sound people make at something shameful.

Other nations would look at Israel and react with scorn.

Israel was meant to be an example of blessing, not ridicule.

Becoming a warning to others reverses that entire purpose.

This is reputation turned completely upside down.

😏 Hissing means a mocking reaction

👀 Other nations would watch with scorn

🔄 Israel was meant to be a blessing

📖 Their reputation flipped completely upside down
---
## 😔 Ye Shall Bear The Reproach Of My People

Reproach means a lasting public shame attached to someone's name.

This shame is tied directly to being called God's own people.

Acting this way does not match carrying that name.

The mismatch makes the disgrace even worse.

The chapter's lawsuit ends here with a verdict delivered in full.

Identity and behavior were never meant to pull in opposite directions.

😔 Reproach means lasting public shame

🏷️ This shame is tied to God's name

⚖️ The lawsuit ends with a full verdict

📖 Identity and behavior should never conflict
`.trim();

export const MICAH_SIX_PERSONAL_SECTIONS = parseMicahSixRawNotes(MICAH_SIX_RAW_NOTES);
