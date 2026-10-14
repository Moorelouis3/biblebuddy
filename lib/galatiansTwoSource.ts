export type GalatiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansTwoRawNotes(rawText: string): GalatiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 2:${startVerse}` : `Galatians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Galatians 2 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_TWO_RAW_NOTES = `# Galatians 2:1-5
# 🧭 A Private Meeting In Jerusalem
---
## ⛰️ Fourteen Years After I Went Up Again To Jerusalem

"Went up" means more than simply traveling toward Jerusalem.

Jerusalem sat high in the hill country, so every route into the city climbed uphill.

Many scholars count these fourteen years from Paul's conversion near Damascus, not his last visit.

That long gap matters because Paul held the same gospel the whole time, with no apostle correcting him.

⛰️ Went up means climbing in elevation

🗓️ Fourteen years likely counts from his conversion

⏳ A long gap with no correction

📖 Paul held the same gospel the whole time

## 🤝 With Barnabas, And Took Titus With Me Also

Barnabas was a trusted Jewish believer who had worked alongside Paul for years.

Titus was a Gentile convert, someone never raised under the Jewish law.

Paul did not bring Titus by accident.

Titus was the test case for the very question this chapter argues.

🤝 Barnabas was Paul's trusted coworker

🌍 Titus was a Gentile convert

🧪 Titus was brought as a test case

📖 His presence tests this chapter's whole argument

## 💡 I Went Up By Revelation

"Revelation" means Paul went because God directly told him to go.

This was not Paul calculating that Jerusalem's leaders needed to approve him.

Acts 15 records a separate, practical reason for the same trip, a dispute over circumcision.

Both reasons can be true at once, a divine prompting acted out through ordinary events.

💡 Revelation means a direct prompting from God

🧮 Not a political calculation by Paul

📜 Acts 15 names a practical reason too

📖 God can work through ordinary events

## 📣 That Gospel Which I Preach Among The Gentiles

Paul specifies exactly which message he brought to this meeting.

"That gospel" points back to the one message he already described in chapter one.

He preached the same gospel to the Gentiles without edits or local versions.

Consistency was the entire point of bringing it up again here.

📣 Paul names the exact message

🔁 The same gospel from chapter one

🌍 Preached to Gentiles without edits

📖 Consistency is the whole point

## 🏛️ Privately To Them Which Were Of Reputation

"Of reputation" names people already recognized as leaders, not strangers to the movement.

Paul met with them privately, not in a public assembly.

A private meeting let him test his message before any public fight broke out.

Paul was being wise, not secretive about something he feared.

🏛️ Of reputation means recognized leaders

🤫 Paul met with them privately

🧠 A private test before a public fight

📖 This was wisdom, not fear

## 🏃 Lest By Any Means I Should Run, Or Had Run, In Vain

Paul borrows a runner's image to describe his years of ministry.

"Run" pictures an athlete racing toward a finish line.

"In vain" means all that effort could still turn out worthless.

Paul is not doubting the gospel itself, only whether Jerusalem would recognize his version of it.

🏃 Run pictures a racing athlete

🎯 In vain means worthless effort

❓ Paul questions recognition, not truth

📖 His years of work were at stake

## ✡️ Was Compelled To Be Circumcised

"Compelled" means forced under pressure, not simply invited.

Circumcision marked a man as formally joining the Jewish covenant people.

Titus was not forced to receive it, even under real pressure to conform.

That outcome became Paul's proof that Gentile believers need nothing added to faith in Christ.

⚔️ Compelled means forced under pressure

✡️ Circumcision marked covenant membership

🙅 Titus was not forced to it

📖 Faith in Christ needs nothing added

## 🎭 False Brethren Unawares Brought In

"False brethren" describes people posing as genuine believers while pushing a different message.

"Unawares brought in" means they slipped into the meeting without anyone inviting them.

These were not honest disagreements from genuine fellow believers.

Paul treats their presence as an intrusion, not a normal part of church life.

🎭 False brethren means posers, not believers

🚪 Unawares means they slipped in uninvited

⚠️ Not an honest disagreement

📖 Paul treats this as an intrusion

## 🕵️ Came In Privily To Spy Out Our Liberty

"Privily" means secretly, working behind the scenes rather than openly.

"Spy out" pictures a scout checking enemy territory before an attack.

"Our liberty" names the freedom from the law's requirements that faith in Christ brings.

These false brethren wanted to measure that freedom so they could attack it later.

🕵️ Privily means working in secret

🔭 Spy out pictures scouting for attack

🗽 Liberty means freedom from the law

📖 They wanted to attack that freedom

## 🙅 Gave Place By Subjection, No, Not For An Hour

"Gave place by subjection" means yielding ground and submitting to a demand.

Paul refuses to do that, even for a single hour.

He is not claiming to never compromise on anything at all.

On this one point, whether Gentiles must be circumcised, he would not bend at all.

🙅 Subjection means yielding to a demand

⏱️ Not even for a single hour

🎯 This one issue was not negotiable

📖 Paul held firm without bending

## 🔗 That The Truth Of The Gospel Might Continue With You

Paul names exactly who his stubbornness was protecting.

"You" means the Galatian believers reading this letter right now.

His refusal to bend in Jerusalem was not really about himself.

It secured the same gospel that later reached Galatia unchanged.

🎯 You means the Galatian readers

🛡️ Paul's stand protected them directly

🔗 It secured the gospel that reached Galatia

📖 His resistance was never about himself

# Galatians 2:6-10
# 🤝 The Jerusalem Pillars Agree
---
## 🏛️ Whatsoever They Were, It Maketh No Matter To Me

"Whatsoever they were" refers to the reputation and status of the Jerusalem leaders.

"It maketh no matter to me" means Paul will not weigh his case based on their rank.

Paul refuses to build his argument on human status at any point.

The truth of the gospel never depends on someone's title or position.

🏛️ Whatsoever they were points to their status

⚖️ It maketh no matter means no favoritism

🚫 Paul will not argue by rank

📖 Truth never depends on title or position

## ⚖️ God Accepteth No Man's Person

"Accepteth no man's person" means God never plays favorites based on status.

A leader's title or reputation carries no extra weight with God.

Paul says this before praising these leaders at all.

He protects his gospel from depending on human rank.

⚖️ Accepteth no person means no favoritism

👔 Titles carry no weight with God

🛡️ Paul protects his gospel from rank

📖 Truth does not depend on status

## 🔇 Added Nothing To Me

Paul states the outcome of this whole meeting in four words.

The Jerusalem leaders heard his gospel and found nothing to correct.

They did not add a single requirement he was missing.

Their silence here becomes Paul's strongest proof that his gospel was already complete.

🔇 They added nothing at all

✅ No missing requirement was found

🧩 His gospel was already complete

📖 Their silence proves his point

## 🌍 The Gospel Of The Uncircumcision Was Committed Unto Me

"The gospel of the uncircumcision" names the mission to reach Gentile believers.

"Committed unto me" means God specifically assigned this mission to Paul.

It was not a role Paul invented or claimed for himself.

The assignment came from God before any human leader agreed to it.

🌍 Uncircumcision means the Gentile mission

📬 Committed means formally assigned

🙅 Paul did not claim this himself

📖 God assigned it before any approval

## ✡️ As The Gospel Of The Circumcision Was Unto Peter

Peter's assignment mirrors Paul's, aimed at a different audience.

"The circumcision" names the Jewish people as Peter's primary mission field.

Both men preached the exact same gospel to different groups.

Paul is building a case for equal, parallel authority, not a rival gospel.

✡️ Circumcision here means the Jewish people

🪞 Peter's role mirrors Paul's role

🤝 Same gospel, different audience

📖 This proves parallel authority, not rivalry

## ⚡ Wrought Effectually In Peter

"Wrought effectually" means worked with real, visible power and results.

Paul names God as the one actually doing this work in Peter.

Peter's success among the Jews was never Peter's own achievement.

Naming God here keeps both men from claiming personal credit.

⚡ Wrought effectually means worked with real power

🙏 God is the one working, not Peter

🏆 Peter's success was not his own

📖 No one here claims personal credit

## 💪 Mighty In Me Toward The Gentiles

Paul applies the exact same claim to his own ministry.

The same God who empowered Peter also empowered Paul.

"Mighty" points to visible results among Gentile converts.

Both missions rest on one and the same divine power.

💪 Mighty means visible divine power

🔁 The same God empowers both men

🌍 Results showed up among the Gentiles

📖 One power behind two missions

## 📛 James, Cephas, And John, Who Seemed To Be Pillars

Paul finally names the three leaders he kept unnamed earlier.

"Cephas" is simply Peter's Aramaic name.

"Pillars" pictures these three as load bearing supports holding up the whole building.

This image means the Jerusalem church itself depended on these three men.

📛 Paul finally names the three leaders

🗣️ Cephas is Peter's Aramaic name

🏛️ Pillars means load bearing supports

📖 The whole church depended on them

## 👀 Perceived The Grace That Was Given Unto Me

"Perceived" means they recognized and understood something real.

"The grace" names God's work and calling visible in Paul's ministry.

These leaders did not take Paul's word for it blindly.

They observed real evidence before agreeing to anything.

👀 Perceived means they recognized something real

🎁 Grace names God's visible work in Paul

🔍 They looked for real evidence

📖 Agreement followed observation, not blind trust

## 🤝 The Right Hands Of Fellowship

This phrase describes a formal handshake sealing an agreement.

In that culture, shaking right hands publicly confirmed a partnership.

It was the ancient equivalent of signing a contract together.

Jerusalem's leaders publicly confirmed Paul and Barnabas as genuine partners.

🤝 Right hands sealed a formal agreement

📜 It worked like signing a contract

👥 Paul and Barnabas were confirmed partners

📖 Jerusalem publicly backed their mission

## 🗺️ That We Should Go Unto The Heathen, And They Unto The Circumcision

This line records the actual division of labor they agreed on.

"Heathen" means the Gentiles, the group Paul and Barnabas would focus on reaching.

"They" points back to Peter, James, and John, focused on reaching Jewish people.

One gospel now moved forward through two separate mission fields at once.

🗺️ The two missions split by audience

🌍 Heathen means the Gentile mission field

✡️ They means the mission to Jews

📖 One gospel, two mission fields

## 🙏 Remember The Poor

Jerusalem's leaders add exactly one request to this whole agreement.

"The poor" likely refers to needy believers inside the Jerusalem church itself.

Paul was already eager to help before anyone even asked him to.

This detail shows the two mission fields staying connected through real generosity.

🙏 Remember the poor was their one request

🏙️ Likely means needy believers in Jerusalem

❤️ Paul was already eager to help

📖 Generosity kept both missions connected

# Galatians 2:11-14
# ⚔️ Paul Confronts Peter At Antioch
---
## 🏙️ When Peter Was Come To Antioch

Antioch was a major city where Jewish and Gentile believers worshiped and ate together freely.

This mixed fellowship was unusual for its time and deeply meaningful.

Peter traveling there put him right inside that mixed community.

What happens next tests whether that mixed fellowship could actually hold.

🏙️ Antioch had mixed Jewish and Gentile believers

🍽️ They worshiped and ate together freely

🚶 Peter steps into that very community

📖 This mixed fellowship is about to be tested

## 👊 I Withstood Him To The Face

"Withstood... to the face" means Paul confronted Peter directly, not behind his back.

This was not a private letter or a quiet word through someone else.

Paul chose an open, direct confrontation on purpose.

Status did not shield Peter from being corrected publicly.

👊 Withstood means direct confrontation

🚫 Not a private letter or rumor

😠 Open correction was chosen on purpose

📖 Status did not shield Peter

## ❌ He Was To Be Blamed

Paul states plainly that Peter was actually wrong here.

This is not framed as simply a personality clash between two leaders.

Peter's actions, not his character, draw the correction.

Paul treats the truth of the gospel as worth this level of conflict.

❌ Peter was genuinely wrong

🙅 Not a personality clash

🎯 His actions, not his character, are at fault

📖 Truth was worth this conflict

## 🍞 He Did Eat With The Gentiles

Sharing a table was never a small social detail in that culture.

Jewish food laws and customs normally kept Jews from eating freely with Gentiles.

Peter had been eating with Gentile believers as equals before this incident.

That shared table was a living picture of one new family in Christ.

🍞 Shared meals carried deep cultural weight

📜 Jewish customs usually kept the groups apart

🤝 Peter had been eating with Gentiles as equals

📖 The table pictured one family in Christ

## 📬 Certain Came From James

"Certain... from James" names a group connected to the Jerusalem church leader James.

They likely held strict views about Jewish believers mixing freely with Gentiles.

Their arrival changed Peter's behavior almost immediately.

Their influence mattered more to Peter in that moment than consistency did.

📬 A group connected to James arrives

📏 They likely held strict views on mixing

⏱️ Peter's behavior changed almost immediately

📖 Their influence outweighed consistency

## 🚶 He Withdrew And Separated Himself

"Withdrew" pictures Peter quietly pulling his seat away from the Gentile believers.

"Separated himself" makes clear this was a deliberate choice, not an accident.

Nothing forced Peter to do this except social pressure.

His actions sent a message his words never would have said directly.

🚶 Withdrew means quietly pulling away

🎯 Separated means a deliberate choice

🫂 Social pressure, not force, moved him

📖 Actions spoke louder than any words

## 😨 Fearing Them Which Were Of The Circumcision

Paul names Peter's real motive in one plain word.

"Fearing" means Peter acted out of fear, not conviction.

"Them... of the circumcision" points to Jewish believers insisting Gentiles keep the law.

Fear of what people would think moved a leading apostle to act against his own belief.

😨 Fearing means acting out of fear

✡️ The circumcision party insisted on the law

🎭 Fear, not belief, drove this choice

📖 Even an apostle can act against belief

## 🎭 The Other Jews Dissembled Likewise With Him

"Dissembled" means acting out a belief you do not actually hold.

Other Jewish believers in Antioch followed Peter's example.

None of them had genuinely changed their minds about Gentile believers.

Peter's influence spread this hypocrisy through the whole community quickly.

🎭 Dissembled means faking a belief

👥 Other believers copied Peter's example

🧠 Nobody had genuinely changed their mind

📖 Influence spread the hypocrisy fast

## 🌊 Barnabas Also Was Carried Away With Their Dissimulation

"Carried away" pictures someone swept along by a current stronger than their own footing.

Barnabas had worked alongside Paul among the Gentiles for years by this point.

Even his longtime conviction did not protect him from this pressure.

Paul includes this detail to show how serious and widespread the problem had become.

🌊 Carried away pictures being swept along

🤝 Barnabas was Paul's longtime partner

⚠️ Even strong conviction was not immune

📖 This shows how widespread the problem was

## 🚶 They Walked Not Uprightly According To The Truth Of The Gospel

"Walked" is Paul's regular word picture for how someone actually lives, not just believes.

"Uprightly" means walking in a straight line without wandering off course.

Their daily actions no longer lined up with what the gospel actually teaches.

Belief and behavior had quietly come apart from each other.

🚶 Walked means how someone actually lives

📏 Uprightly means staying in a straight line

🧩 Their actions stopped matching their belief

📖 Belief and behavior had come apart

## ❓ Why Compellest Thou The Gentiles To Live As Do The Jews

Paul confronts Peter with a pointed question in front of everyone.

"Compellest" means forcing people toward an action through pressure, not just words.

Peter was not preaching this requirement, yet his example pushed Gentiles toward it anyway.

An action can compel just as strongly as a spoken command.

❓ Paul asks this question publicly

⚔️ Compellest means forcing through pressure

🚶 Peter's example pushed without any words

📖 Actions can compel as strongly as commands

# Galatians 2:15-17
# ⚖️ Justified By Faith, Not By The Law
---
## 🧬 We Who Are Jews By Nature

Paul includes himself and Peter together in this one phrase.

"By nature" means Jewish birth and upbringing, not a later choice.

Both men grew up inside the law from childhood.

Paul starts here so the coming argument cannot be dismissed as an outsider's complaint.

🧬 By nature means Jewish birth

👶 Both grew up inside the law

🗣️ Paul speaks as an insider

📖 This protects the argument from dismissal

## 🏷️ Sinners Of The Gentiles

This phrase quotes a common Jewish way of labeling Gentiles.

Gentiles were viewed as outsiders who never had the law to guide them.

Paul is quoting the assumption, not necessarily agreeing with it fully.

He is setting up a contrast he is about to tear down.

🏷️ A common Jewish label for Gentiles

📜 Gentiles lacked the law as a guide

💬 Paul quotes an assumption here

📖 He is about to challenge it

## ⚖️ Not Justified By The Works Of The Law

"Justified" means being declared right and acceptable before God.

"Works of the law" names obedience to the Jewish law's commands and rituals.

Paul states plainly that this obedience was never what made anyone right with God.

This line stands at the very center of the whole letter's argument.

⚖️ Justified means declared right before God

📜 Works of the law means obeying its commands

🚫 Obedience never earned that standing

📖 This is the letter's central claim

## 🙏 By The Faith Of Jesus Christ

Paul names the actual source of right standing with God.

"Faith of Jesus Christ" points to trust placed in what Christ did, not human effort.

This phrase directly replaces "works of the law" from the line before it.

One path is removed and a different path is named in its place.

🙏 Faith means trust in what Christ did

🔄 This replaces works of the law

🎯 Trust, not effort, is the path

📖 Paul names the real source directly

## 🙋 We Have Believed In Jesus Christ

Paul points to his own and Peter's actual choice, not just doctrine.

Both men were already devout, law keeping Jews before this.

They still turned to faith in Christ for right standing with God.

Their own decision proves that the law was never enough on its own.

🙋 Paul and Peter both believed personally

📜 Both were devout Jews already

🔄 They still turned to faith in Christ

📖 Their choice proves the law was not enough

## 🌍 For By The Works Of The Law Shall No Flesh Be Justified

Paul widens this claim beyond himself and Peter to everyone alive.

"No flesh" means not a single human being, Jew or Gentile, without exception.

This line borrows language straight out of the Psalms.

No one in all of history has ever been justified by perfectly keeping the law.

🌍 No flesh means every human being

📖 This echoes language from the Psalms

🚫 No exceptions exist anywhere

➡️ Nobody has ever been justified this way

## ❓ Is Therefore Christ The Minister Of Sin?

Paul raises an objection his critics were likely already making.

"Minister of sin" would mean Christ actually causes or promotes sin.

If faith in Christ sets aside the law, does that make Christ responsible for lawlessness.

Paul raises the accusation on purpose, before answering it directly.

❓ Paul raises a likely objection

😠 Minister of sin means causing sin

⚠️ Does faith in Christ excuse lawlessness

📖 Paul raises it before answering

## 🚫 God Forbid

This phrase is Paul's strongest possible denial in the whole letter.

It appears often in his writing whenever an idea must be rejected outright.

Christ did not become a minister of sin by replacing the law with faith.

Paul will spend the rest of the chapter explaining exactly why not.

🚫 God forbid is Paul's strongest denial

🔁 He uses it to reject ideas outright

❌ Christ is not a minister of sin

📖 The rest of the chapter explains why

# Galatians 2:18-21
# ✝️ Crucified With Christ
---
## 🏗️ If I Build Again The Things Which I Destroyed

Paul pictures himself as a builder here, not simply a believer.

"The things which I destroyed" means the old system of earning righteousness by the law.

Paul already tore that system down the moment he trusted Christ.

Going back to it now would mean rebuilding something he already proved could not save.

🏗️ Paul pictures himself as a builder

🧱 The old system was earning righteousness

💥 He already tore that system down

📖 Rebuilding it now makes no sense

## ⚠️ I Make Myself A Transgressor

"Transgressor" means someone who breaks a clear standard on purpose.

Returning to law keeping as the path to righteousness creates a new problem.

That path can never be kept perfectly, so failure becomes certain again.

Going backward actually manufactures the very guilt Paul once tried to escape.

⚠️ Transgressor means a lawbreaker

🔄 Returning to the law recreates the problem

❌ Perfect law keeping is never possible

📖 This path manufactures its own guilt

## ⚖️ I Through The Law Am Dead To The Law

This line sounds like a contradiction at first, but it is not.

The law itself, by demanding perfect obedience, proved Paul could never satisfy it.

That failure is exactly what killed Paul's reliance on the law for righteousness.

The law, in a sense, pointed Paul away from itself toward Christ.

⚖️ The law demanded perfect obedience

💀 That demand killed any hope of satisfying it

➡️ Failure pointed Paul toward Christ instead

📖 The law pointed away from itself

## 🚪 That I Might Live Unto God

Paul names the purpose behind this death to the law.

Dying to one way of living opened the door to an entirely different one.

"Live unto God" means a life now aimed directly at pleasing Him.

The death was never the point by itself, only the doorway.

🚪 Death to the law opened a doorway

🎯 Live unto God means living for Him

🔄 The old way was replaced, not added to

📖 Death was the doorway, not the point

## ✝️ I Am Crucified With Christ

Paul is not describing his own physical death here.

"Crucified with Christ" means Paul's old identity died when he trusted in Christ's death.

Union with Christ means Christ's death counts as Paul's own death.

The old Paul who tried to earn righteousness no longer exists.

✝️ Crucified with Christ means a shared death

🔗 Union makes Christ's death count as Paul's

🪦 Paul's old identity no longer exists

📖 A new identity replaces the old one

## ❤️ Yet Not I, But Christ Liveth In Me

Paul balances death with an immediate claim to real life.

"Not I, but Christ" does not erase Paul as a person.

It means Christ's own life now animates and directs Paul from the inside.

Paul still makes choices, but a new power now moves through him.

❤️ Paul still genuinely lives

🙋 Not I does not erase Paul

⚡ Christ's life now animates him

📖 A new power moves through Paul

## 🏃 The Life Which I Now Live In The Flesh I Live By The Faith Of The Son Of God

"In the flesh" simply means Paul's ordinary, everyday physical life.

Even his daily decisions and routines now run on faith, not law keeping.

Trust in Christ became the engine behind Paul's actual daily choices.

This is not a single decision but a constant, ongoing reliance.

🏃 In the flesh means ordinary daily life

⚙️ Faith is the engine behind his choices

🔁 This trust is constant, not a single event

📖 Daily life now runs on faith

## 🎁 Who Loved Me, And Gave Himself For Me

Paul shifts suddenly from speaking generally to speaking personally.

"Me" replaces the "us" and "we" language used earlier in the chapter.

Paul makes the entire gospel personal, not just theological or communal.

Christ's love and sacrifice reach all the way down to one individual person.

🙋 Paul switches from we to me

❤️ Christ's love reaches one person directly

🎁 Gave himself means a personal sacrifice

📖 The gospel becomes deeply personal here

## 🚫 I Do Not Frustrate The Grace Of God

"Frustrate" in this old English use means to cancel out or make useless.

Paul says he refuses to treat God's grace as if it never mattered.

Going back to the law would do exactly that, without him even saying so.

Paul protects grace by refusing to add the law back on top of it.

🚫 Frustrate means to cancel out

🎁 Grace is God's free gift

⚠️ Returning to the law would cancel it

📖 Paul protects grace from being added to

## ☠️ If Righteousness Come By The Law, Then Christ Is Dead In Vain

Paul ends the chapter with the sharpest possible conclusion.

"Dead in vain" means Christ's death accomplished nothing at all.

If the law alone could make a person righteous, the cross was never necessary.

Everything Paul has argued in this chapter rests on that one impossible outcome being false.

☠️ Dead in vain means accomplishing nothing

⚖️ If the law saves, the cross was needless

🧩 This outcome must be false

📖 The whole chapter rests on this point
`.trim();

export const GALATIANS_TWO_PERSONAL_SECTIONS = parseGalatiansTwoRawNotes(GALATIANS_TWO_RAW_NOTES);
