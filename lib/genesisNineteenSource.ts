export type GenesisNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisNineteenRawNotes(rawText: string): GenesisNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s*(?:\*\*)?(.*?Genesis\s+19:(\d+)(?:[-–—]|â€“|â€”)?(\d+)?)\s*(?:\*\*)?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].replace(/Genesis\s+19:.+$/i, "").replace(/\*\*/g, "").trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch =
      lines[index]?.trim().match(/^#+\s*(?:\*\*)?(.+?)(?:\*\*)?$/) || lines[index]?.trim().match(/^\*\*(.+?)\*\*$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 19 section title after verse " + startVerse);
    }
    const title = sectionTitleMatch[1].trim();
    index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+/.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^###\s+(.+)$/) || trimmed.match(/^\*\*(.+?)\*\*$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseTitle = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^###\s+/.test(lines[index].trim()) &&
        !/^#\s+/.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 19 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 19:" + startVerse
          : "Genesis 19:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 19 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_NINETEEN_RAW_NOTES = `# 👼 Genesis 19:1–3

## The Angels Visit Lot

### 🌆 And There Came Two Angels To Sodom At Even

The word **even** means **evening**, near sunset.

These are the **same two angels** who had just visited Abraham in Genesis 18.

After the Lord finished speaking with Abraham, He departed, while the two angels continued on to Sodom to carry out God's mission.

This connects directly to the previous chapter.

🌆 Even means evening

👼 These are the same two angels from Genesis 18

➡️ They continue toward Sodom after leaving Abraham

📖 God has sent them to investigate and rescue Lot

---

### 🚪 And Lot Sat In The Gate Of Sodom

This is a major detail.

The last time we saw Lot, he **chose the fertile plain of Jordan** because it looked better than the land Abraham chose (Genesis 13). At first, he **pitched his tent toward Sodom**. Later, he was **living in Sodom**. Now he is **sitting at the city gate.**

In the ancient world, the **city gate** wasn't just an entrance. It was where the city's leaders, judges, merchants, and respected men gathered to make decisions and conduct business.

Lot had gone from living **near** Sodom to living **inside** Sodom, and now he appears to hold a respected position among its people.

It also shows how slowly compromise can happen. Lot didn't become part of Sodom overnight. Step by step, he moved closer until he was fully surrounded by its wicked culture.

🚪 The city gate was the center of leadership and business

🏙️ Lot had become established in Sodom

⚠️ His gradual compromise led him deeper into a wicked city

➡️ The angels arrive where Lot is sitting

---

### 👀 And Lot Seeing Them Rose Up To Meet Them

This closely mirrors Abraham's response in Genesis 18.

Like Abraham, Lot immediately gets up to welcome these visitors.

The Bible never says the angels had wings or looked unusual. They appeared as ordinary men.

Lot likely recognized them as honorable travelers who deserved hospitality.

👀 Lot immediately greets the visitors

🤝 His response resembles Abraham's hospitality

👼 The angels appeared as ordinary men

➡️ Lot humbles himself before them

---

### 🙇 And He Bowed Himself With His Face Toward The Ground

Bowing with the face to the ground was one of the highest signs of **respect, humility, and honor** in the ancient Near East.

People often bowed before kings, rulers, honored guests, or those they recognized as having authority.

Lot shows great respect toward these visitors, just as Abraham had done.

🙇 A sign of humility and honor

👑 Common before rulers and honored guests

🙏 Lot shows deep respect to the visitors

➡️ He invites them into his home

---

### 🏠 Behold Now, My Lords, Turn In, I Pray You

"My lords" was a respectful way of addressing honored guests.

Lot urgently invites them into his home instead of allowing them to remain outside.

His urgency hints that he already knows how dangerous Sodom becomes after dark.

🏠 "My lords" is a respectful title

🙏 Lot urgently invites them inside

⚠️ He knows the streets of Sodom are unsafe

➡️ He offers them hospitality

---

### 💧 Into Your Servant's House, And Tarry All Night, And Wash Your Feet

Lot offers the same hospitality Abraham offered in the previous chapter.

Travelers walked long distances on dusty roads wearing sandals.

Washing someone's feet was a practical act of kindness and a sign of welcoming them into your home.

Offering them a place to stay for the night would also protect them from the dangers outside.

💧 Washing feet refreshed weary travelers

🏠 Staying overnight provided safety

❤️ Hospitality was an important custom

➡️ The angels respond

---

### ❌ And They Said, Nay; But We Will Abide In The Street All Night

**Nay** simply means **"No."**

**Abide** means **to remain** or **stay.**

The angels initially refuse Lot's invitation and say they will spend the night in the city square.

They already know exactly how wicked Sodom is, and by remaining outside, the true condition of the city will soon be revealed.

❌ Nay means "No"

🏕️ Abide means to remain or stay

👼 The angels first choose to stay outside

➡️ Lot continues urging them

---

### 🙏 And He Pressed Upon Them Greatly

The phrase **pressed upon them** means Lot **strongly urged**, **insisted**, or **pleaded** with them.

He wasn't casually inviting them.

He knew how dangerous the city was and desperately wanted them to come inside before night fully arrived.

🙏 Lot urgently insists

⚠️ He knows the danger of Sodom

🏠 His concern comes from experience

➡️ The angels accept

---

### 🚪 And They Turned In Unto Him, And Entered Into His House

After Lot's repeated pleading, the angels accepted his invitation.

They entered his home, where they would be protected—for the moment—from the wickedness outside.

🚪 The angels accept Lot's invitation

🏠 They enter his house

📖 The stage is now set for what follows

➡️ Lot prepares a meal

---

### 🍞 And He Made Them A Feast

Lot prepares a generous meal for his guests.

Like Abraham before him, he demonstrates hospitality by personally serving those who have come to his home.

🍽️ Lot prepares a generous meal

❤️ Hospitality was expected for honored guests

📖 He follows the same custom Abraham practiced

➡️ The meal is served

---

### 🫓 And Did Bake Unleavened Bread

**Unleavened bread** is bread made **without yeast**, causing it to remain flat.

It could be prepared much more quickly than regular bread because there was no waiting for the dough to rise.

Lot likely prepared it because his guests had arrived unexpectedly.

🫓 Unleavened bread contains no yeast

⏱️ It could be prepared quickly

🏠 A practical meal for unexpected visitors

➡️ The visitors eat together

---

### 🍽️ And They Did Eat

The angels accepted Lot's hospitality and shared a meal with him.

The Bible often uses shared meals to show fellowship, peace, and the beginning of important conversations or events.

Although the meal begins peacefully, the events of this night are about to reveal just how wicked Sodom has become.

🍽️ The angels share a meal with Lot

🤝 The meal shows fellowship and hospitality

⚠️ Peace will soon give way to confrontation

➡️ The men of Sodom arrive

---

# 🚨 Genesis 19:4–11

## The Evilness of Sodom

### 🌃 But Before They Lay Down

This happened **before the angels went to sleep** for the night.

Lot had barely finished showing hospitality to his guests when the city reacted.

The Bible emphasizes how quickly the wickedness of Sodom revealed itself.

🌃 This happened before the visitors went to bed

⏱️ The events unfold almost immediately

⚠️ Sodom's wickedness quickly becomes visible

➡️ The men of the city gather

---

### 👥 The Men Of The City, Even The Men Of Sodom, Compassed The House Round

The word **compassed** means **surrounded** or **encircled**.

The men of Sodom completely surrounded Lot's house so no one could leave.

The Bible stresses how widespread the city's corruption had become.

It says **both old and young…all the people from every quarter**, showing this was not just a small criminal group. Wickedness had spread throughout the entire city.

👥 Compassed means surrounded on every side

🏠 Lot's house was completely surrounded

⚠️ The city's corruption affected every generation

📖 Sin had become part of the culture of Sodom

➡️ They call for Lot

---

### 📣 And They Called Unto Lot

The men knew exactly where Lot lived.

Lot had lived in Sodom long enough to become well known among its people.

They expected Lot to cooperate with them because he was part of the city.

📣 The crowd calls directly to Lot

🏙️ Lot had become a recognized resident of Sodom

⚠️ His neighbors expected him to give them what they wanted

➡️ They demand the visitors

---

### ❓ Where Are The Men Which Came In To Thee This Night?

The crowd isn't asking out of curiosity.

They already know strangers have entered Lot's house.

They demand that Lot bring them outside.

❓ The crowd demands the visitors

🏠 They know strangers are inside

⚠️ Their intentions are evil

➡️ They reveal what they want

---

### ⚠️ Bring Them Out Unto Us, That We May Know Them

The word **know** here means **to have sexual relations**.

Just as "Adam knew Eve his wife" referred to intimacy in Genesis 4, the same Hebrew word is used here.

The men of Sodom wanted to sexually assault the two visitors.

This passage reveals one expression of Sodom's wickedness.

Elsewhere in Scripture, Sodom is also condemned for **violence, arrogance, pride, neglecting the poor, injustice, and sexual immorality**. Their sin was not limited to one act—it was a city that had become completely corrupt.

🍎 "Know" means sexual relations

⚠️ The crowd intends to sexually assault the visitors

📖 Sodom became known for widespread wickedness

🚫 Pride, violence, injustice, and sexual immorality filled the city

➡️ Lot responds

---

### 🚪 And Lot Went Out At The Door Unto Them

Instead of allowing the crowd inside, Lot steps outside alone to face them.

He places himself between the mob and his guests.

🚪 Lot steps outside alone

🛡️ He attempts to protect the visitors

⚠️ The situation continues to escalate

➡️ He shuts the door behind him

---

### 🔒 And Shut The Door After Him

Lot closes the door behind himself.

By doing this, he separates himself from the angels and stands alone before an angry crowd.

He is trying to prevent them from reaching his guests.

🔒 Lot closes the door behind him

🛡️ He protects the visitors inside

⚠️ He now stands alone before the mob

➡️ He pleads with them

---

### 🙏 I Pray You, Brethren, Do Not So Wickedly

"I pray you" means **"Please"** or **"I beg you."**

Lot pleads with the crowd not to commit this evil act.

The word **wickedly** means morally evil, sinful, and completely contrary to what is right.

🙏 "I pray you" means "Please"

⚖️ Wickedly means to act in great evil

🗣️ Lot begs the crowd to stop

➡️ Lot makes a shocking proposal

---

### 👧 Behold Now, I Have Two Daughters

Lot's daughters were virgins who had **not known a man**.

What Lot says next is one of the most disturbing moments in Genesis.

The Bible records his actions honestly, but it does **not** approve of them.

👧 Lot had two unmarried daughters

📖 The Bible records human failures honestly

⚠️ What follows is not presented as God's approval

➡️ Lot offers a terrible solution

---

### 😔 Let Me, I Pray You, Bring Them Out Unto You

Lot offers his daughters to the mob instead of the visitors.

This is a shocking and heartbreaking proposal.

Why would he do this?

In the ancient world, protecting guests under your roof was considered a sacred duty. Lot appears willing to do almost anything to keep that responsibility.

However, that does **not** make his decision right.

The Bible simply tells us what happened. It does not praise Lot's choice.

This also shows how living in a corrupt environment can affect a person's judgment.

⚠️ Lot offers his daughters to protect his guests

🏠 Hospitality was considered a sacred duty

📖 The Bible describes the event without approving it

💔 Sinful environments can distort moral judgment

➡️ Lot pleads for the visitors

---

### 🛡️ Only Unto These Men Do Nothing

Lot begs the crowd to leave the visitors alone.

He places their safety above everything else.

🛡️ Lot desperately protects the visitors

⚠️ The crowd refuses to listen

➡️ Lot explains why

---

### 🏠 For Therefore Came They Under The Shadow Of My Roof

The phrase **under the shadow of my roof** means they had come under Lot's protection.

In the ancient Near East, once a guest entered your home, the host became responsible for their safety.

Lot takes this responsibility seriously, even though he responds in a deeply flawed way.

🏠 The visitors were under Lot's protection

🤝 Hospitality carried great responsibility

⚠️ Lot's method of protecting them was wrong

➡️ The crowd turns on Lot

---

### 😠 And They Said, Stand Back

The crowd rejects Lot's plea.

"Stand back" means **"Move out of our way."**

They no longer see Lot as one of them.

😠 The crowd rejects Lot

🚫 "Stand back" means move aside

⚠️ The situation becomes violent

➡️ They accuse Lot

---

### 👤 This One Fellow Came In To Sojourn, And He Will Needs Be A Judge

The crowd is talking about **Lot**.

A **sojourner** is someone living in a place that is not originally his home.

They're basically saying,

*"You came here as an outsider, and now you're trying to tell us how to live?"*

They resent Lot for judging their behavior.

👤 The crowd is speaking about Lot

🏕️ Sojourner means a foreign resident

😠 They reject his moral authority

➡️ They threaten him

---

### ⚔️ Now Will We Deal Worse With Thee Than With Them

The crowd threatens Lot.

They say they'll treat him even worse than they planned to treat the visitors.

Their anger now turns toward him.

⚔️ The mob threatens Lot

😠 Their violence escalates

➡️ They rush the house

---

### 🚪 And They Pressed Sore Upon The Man, Even Lot, And Came Near To Break The Door

The crowd physically rushes toward Lot.

**Pressed sore** means they forced themselves violently against him.

They then move to break down the door and force their way inside.

💥 The crowd becomes physically violent

🚪 They attempt to break into the house

⚠️ Lot is overwhelmed

➡️ The angels intervene

---

### ✋ But The Men Put Forth Their Hand, And Pulled Lot Into The House

The angels step in.

They reach out, pull Lot safely back inside, and rescue him before the crowd can seize him.

This is the first clear display of the angels' supernatural protection.

✋ The angels rescue Lot

🛡️ They pull him safely inside

⚠️ God protects those He came to save

➡️ The door is shut

---

### 🔒 And Shut To The Door

Once Lot is safely inside, the angels immediately shut the door.

The violent crowd is now locked outside.

🔒 The house is secured

🛡️ The crowd is kept outside

➡️ The angels act with power

---

### ✨ And They Smote The Men That Were At The Door Of The House With Blindness

The word **smote** means **struck**.

It doesn't always mean someone was killed.

Here, the angels **supernaturally struck the crowd with blindness.**

This wasn't a sword fight like Abram's battle in Genesis 14.

Instead, God directly intervened through His angels.

✨ Smote means struck

👼 The angels miraculously blind the crowd

⚡ God Himself intervenes

➡️ Everyone is affected

---

### 👥 Both Small And Great

This means **everyone**, regardless of age, importance, wealth, or social status.

No one escaped the judgment.

👥 Everyone was affected

⚖️ No social status protected them

📖 God's judgment reached the entire crowd

➡️ Their blindness doesn't stop them

---

### 🚪 So That They Wearied Themselves To Find The Door

Even after being struck with blindness, the crowd continued trying to force their way into the house.

**Wearied themselves** means they exhausted themselves searching for the door.

Their determination shows just how consumed they were by sin.

Instead of stopping after God's judgment, they stubbornly continued.

🚪 They kept searching for the door

😵 Wearied means exhausted themselves

⚠️ Sin had completely hardened their hearts

📖 Even judgment did not immediately produce repentance

---

# Genesis 19:12–23

## 🏃 Lot Flees Sodom

### 👨‍👩‍👧 Hast Thou Here Any Besides?

The two angels ask Lot if he has any other family living in Sodom.

They specifically mention his **sons-in-law, sons, daughters, or anyone else connected to him** because everyone must leave immediately.

This is God's mercy giving every possible opportunity for Lot's family to escape before judgment falls.

👨‍👩‍👧 The angels ask about Lot's entire family

⚠️ Everyone must leave before judgment comes

❤️ God gives people an opportunity to escape

➡️ The angels explain why

---

### 🔥 Bring Them Out Of This Place

The angels command Lot to gather everyone who belongs to him and leave the city.

There is no time to wait.

God's judgment is about to fall on Sodom.

🏃 Everyone must leave immediately

⚠️ There is no time to delay

🔥 Judgment is about to begin

➡️ The reason is revealed

---

### ⚖️ For We Will Destroy This Place

The angels finally reveal why they came.

God had not sent them merely to investigate.

Now that the city's wickedness has been confirmed, they have been sent to carry out God's judgment.

⚖️ The investigation is over

👼 The angels are carrying out God's judgment

🔥 Sodom's destruction is now certain

➡️ Why God judged the city

---

### 📈 Because The Cry Of Them Is Waxen Great Before The Face Of The Lord

**Waxen great** means **had grown extremely great.**

The "cry" is the continual outcry caused by Sodom's violence, injustice, and wickedness.

Its sin had become so widespread that it cried out for God's justice.

This connects back to Genesis 18, where God said the cry of Sodom had become great.

📈 Waxen means grown larger or stronger

⚖️ The city's sin had reached its full measure

📖 This fulfills what God told Abraham

➡️ The angels explain their mission

---

### 👼 The Lord Hath Sent Us To Destroy It

The angels make it clear that they are acting under God's authority.

They are not acting on their own.

God Himself has sent them to bring judgment upon Sodom.

👼 The angels obey God's command

⚖️ God's judgment is righteous

🔥 The destruction is certain

➡️ Lot warns his family

---

### 🏃 And Lot Went Out

Lot immediately leaves his house.

He obeys the angels by trying to warn the rest of his family.

🏃 Lot acts immediately

👨‍👩‍👧 He goes to find his family

➡️ He speaks to his sons-in-law

---

### 🗣️ And Spake Unto His Sons-In-Law

Lot warns the men who were engaged or married to his daughters.

The wording suggests that Lot had daughters besides the two still living at home.

Some may have already been married and living elsewhere in Sodom.

These men were now part of Lot's extended family.

💍 Lot's sons-in-law were connected to his daughters

🏠 They were still living in Sodom

⚠️ They are given the same opportunity to escape

➡️ Lot warns them

---

### ⚠️ Up, Get You Out Of This Place

Lot urgently tells them to leave immediately.

His message is simple:

**Run now because God is about to destroy the city.**

🏃 Lot urgently warns them

⚠️ God's judgment is coming

➡️ They don't believe him

---

### 🔥 For The Lord Will Destroy This City

Lot repeats the warning.

The destruction is not a possibility.

It is certain.

🔥 The judgment is definite

📖 Lot repeats the angels' message

➡️ His family laughs

---

### 😂 But He Seemed As One That Mocked Unto His Sons-In-Law

His sons-in-law think Lot is joking.

The word **mocked** means they treated his warning as if it were ridiculous.

They had likely lived in wicked Sodom for years.

To them, life would simply continue as normal.

Their unbelief cost them their lives.

😂 They think Lot is joking

❌ They refuse to believe God's warning

⚠️ Unbelief keeps them in Sodom

➡️ Morning arrives

---

### 🌅 And When The Morning Arose, Then The Angels Hasted Lot

**Hasted** means **urged quickly** or **pressed him to hurry.**

The angels realize time is running out.

Judgment cannot be delayed much longer.

🌅 Morning has arrived

⏳ The angels urge Lot to hurry

⚠️ Time is running out

➡️ They tell him who must leave

---

### 👨‍👩‍👧 Arise, Take Thy Wife And Thy Two Daughters Which Are Here

Only Lot, his wife, and his two unmarried daughters remain.

His sons-in-law refused to leave.

The angels tell the four of them to leave immediately.

👨‍👩‍👧 Only four family members remain

🏃 They must leave now

➡️ They are warned again

---

### 🔥 Lest Thou Be Consumed In The Iniquity Of The City

**Consumed** means completely destroyed.

If they remain, they will perish alongside the wicked city.

God is rescuing them before His judgment falls.

🔥 Consumed means destroyed

⚖️ Judgment is coming upon Sodom

❤️ God is rescuing Lot's family

➡️ Lot hesitates

---

### ⏱️ And While He Lingered

**Lingered** means Lot hesitated.

Even after all he had seen, he was still slow to leave.

This shows how attached he had become to Sodom.

Sin had surrounded him for years, making it difficult to walk away.

⏱️ Lot delays

🏙️ His heart is still attached to Sodom

⚠️ Delayed obedience can be dangerous

➡️ God intervenes

---

### ✋ The Men Laid Hold Upon His Hand…And Upon The Hand Of His Wife…And Upon The Hand Of His Two Daughters

The angels literally grab them by the hand.

Lot is moving so slowly that they physically lead the family out of the city.

This is one of the clearest pictures of God's mercy in Genesis.

✋ The angels physically lead them

❤️ God rescues them despite their hesitation

🏃 They are brought out safely

➡️ Why God does this

---

### ❤️ The Lord Being Merciful Unto Him

Lot is not rescued because he deserves it.

He is rescued because God is merciful.

God remembers His promise to Abraham and shows mercy to Lot.

❤️ Mercy means receiving kindness you do not deserve

🙏 God keeps His promises

📖 God's mercy is greater than Lot's weakness

➡️ They leave the city

---

### 🚶 They Brought Him Forth And Set Him Without The City

The angels personally escort the family outside the city walls.

Only once they are safely outside does the next command come.

🚶 The family is escorted to safety

🛡️ God removes them before judgment

➡️ Final instructions are given

---

### 🏃 Escape For Thy Life

The angels tell them to run without stopping.

Their lives depend on leaving Sodom behind.

🏃 Run immediately

⚠️ Don't delay

❤️ God provides a way of escape

➡️ Don't look back

---

### 👀 Look Not Behind Thee

This command is both physical and spiritual.

Physically, they must not stop.

Spiritually, they must not long for the sinful city they are leaving behind.

Their future is ahead, not behind them.

👀 Don't stop to look back

❤️ Leave your old life behind

⚠️ Don't cling to what God is judging

➡️ Keep moving

---

### 🏞️ Neither Stay Thou In All The Plain

The plain includes the entire Jordan Valley surrounding Sodom.

The angels tell them not to stop anywhere nearby.

The judgment will affect the whole region.

🏞️ Don't stop anywhere in the valley

🔥 Judgment extends beyond one city

➡️ Go to the mountains

---

### ⛰️ Escape To The Mountain, Lest Thou Be Consumed

The mountains are outside the area of judgment.

The angels tell them to flee there immediately.

⛰️ The mountains are the place of safety

🔥 Staying behind means death

➡️ Lot makes another request

---

### 🙏 Oh, Not So, My Lord

Lot respectfully asks if another option is possible.

He is afraid of fleeing into the mountains.

🙏 Lot makes a request

😟 He is afraid

➡️ He explains why

---

### ❤️ Behold Now, Thy Servant Hath Found Grace In Thy Sight

Lot recognizes that God has already shown him grace.

Grace means receiving undeserved favor.

He knows he has been spared because of God's kindness.

❤️ Grace is undeserved favor

🙏 Lot acknowledges God's mercy

➡️ He praises God's mercy

---

### ❤️ Thou Hast Magnified Thy Mercy…And Saved My Life

Lot thanks God for saving him.

**Magnified thy mercy** means God has shown extraordinary kindness.

He realizes he should have died with Sodom.

❤️ God greatly multiplied His mercy

🛡️ Lot's life was spared

➡️ Lot explains his fear

---

### ⛰️ I Cannot Escape To The Mountain

Lot says he fears he won't survive the journey.

He worries some disaster will happen before he reaches safety.

Rather than fully trusting God's command, he asks for an easier destination.

😟 Lot fears the journey

⚠️ His faith is still weak

➡️ He suggests another city

---

### 🏙️ This City Is Near To Flee Unto

Lot points to a nearby town.

Instead of traveling farther into the mountains, he asks permission to stop there.

🏙️ Lot asks for a closer refuge

➡️ He argues his case

---

### 🏘️ It Is A Little One

Lot argues that the city is very small.

His reasoning is that such a small place surely would not deserve destruction.

🏘️ Zoar is a small town

🙏 Lot asks for mercy toward it

➡️ He asks to live there

---

### ❤️ And My Soul Shall Live

"My soul shall live" simply means:

**"My life will be spared."**

Lot believes he can safely survive there.

❤️ Soul refers to his life

🏃 Lot wants a safe refuge

➡️ God answers

---

### ✅ I Have Accepted Thee Concerning This Thing Also

God graciously grants Lot's request.

Even though the original command was to flee to the mountains, God allows him to flee to Zoar instead.

❤️ God graciously answers Lot

🙏 Another act of mercy

➡️ Zoar will be spared

---

### 🏙️ I Will Not Overthrow This City

Because of Lot, God temporarily spares Zoar.

The city escapes the judgment that falls upon the surrounding region.

🏙️ Zoar is spared

❤️ God shows mercy because of Lot

➡️ Hurry there

---

### ⏳ Haste Thee, Escape Thither, For I Cannot Do Anything Till Thou Be Come Thither

**Haste thee** means **"Hurry!"**

The word **thither** is an old English word meaning **"to that place"** or simply **"there."**

The angels are saying,

**"Hurry to that place—Zoar—because I cannot begin God's judgment until you arrive there safely."**

This shows God's mercy. Even though judgment is ready to fall, God delays it until Lot reaches safety.

God would not destroy Sodom while the person He had chosen to rescue was still inside.

⏳ Haste means "hurry"

📍 Thither means "to that place" or "there"

❤️ God waits until Lot is secure

⚖️ Mercy comes before judgment

➡️ The city receives its name

---

### 🏙️ Therefore The Name Of The City Was Called Zoar

**Zoar** means **"small."**

Its name matches Lot's request when he said it was **"a little one."**

🏙️ Zoar means "small"

📖 The name fits Lot's request

➡️ Lot arrives safely

---

### 🌅 The Sun Was Risen Upon The Earth When Lot Entered Zoar

As the sun rises, Lot finally reaches safety.

Only after he enters Zoar does God's judgment begin on Sodom.

🌅 A new day begins

🏙️ Lot safely reaches Zoar

⚖️ Mercy is complete before judgment falls

---

# Genesis 19:24–29

## 🔥 Sodom And Gomorrah Are Destroyed

### 🔥 Then The Lord Rained Upon Sodom And Upon Gomorrah Brimstone And Fire

Now that **Lot has safely reached Zoar**, God's judgment begins.

God rains **brimstone (burning sulfur)** and fire upon Sodom and Gomorrah. Brimstone is a sulfur-like substance that burns with intense heat and choking smoke. Together with the fire, it completely destroys the cities.

Although Genesis often says **"Sodom and Gomorrah,"** the judgment was larger than just two cities. It included the entire region of the Jordan Plain, including the five-city alliance introduced in Genesis 14: **Sodom, Gomorrah, Admah, Zeboiim, and Zoar** (though Zoar was spared because of Lot).

Sodom and Gomorrah became the representative names because they were the most prominent cities and the centers of the region's wickedness.

🔥 God's judgment begins only after Lot is safe

🪨 Brimstone is burning sulfur

🏙️ The destruction included the cities of the plain

⚖️ Sodom and Gomorrah represent the entire wicked region

➡️ The judgment comes directly from God

---

### ☁️ From The Lord Out Of Heaven

The judgment comes directly from God Himself.

This was not a natural disaster or an accident.

Moses emphasizes that this destruction came **"from the Lord out of heaven,"** showing that God personally carried out His righteous judgment against the cities.

☁️ The judgment came directly from God

⚖️ This was an act of divine justice

📖 God fulfilled the warning He had given Abraham

➡️ The destruction spreads across the region

---

### 🏙️ And He Overthrew Those Cities

The phrase **"those cities"** refers to the cities of the Jordan Plain.

God completely overturned and destroyed the wicked cities that had rejected Him.

This fulfills the warning given to Lot to flee because the entire region was about to be judged.

🏙️ Multiple cities were destroyed

⚖️ God's judgment was complete

📖 This fulfills the angels' warning

➡️ The plain is destroyed as well

---

### 🌄 And All The Plain

The **plain** refers to the fertile Jordan Valley where Lot had chosen to settle back in Genesis 13.

What once looked like the richest land in Canaan became the center of God's judgment.

This explains why the angels warned Lot not to remain anywhere in the plain.

🌄 The fertile Jordan Valley is destroyed

📖 This is the same plain Lot chose years earlier

⚖️ The entire region comes under judgment

➡️ Nothing is left untouched

---

### 👥 And All The Inhabitants Of The Cities

Everyone who remained in the cities perished.

Those who rejected God's warning experienced the judgment that the angels had announced.

Lot and his daughters survived because they obeyed God's command to leave.

👥 The people remaining in the cities perished

⚖️ Judgment fell upon the wicked

❤️ God rescued those He chose to save

➡️ Even the land was affected

---

### 🌱 And That Which Grew Upon The Ground

The destruction was total.

Not only were the cities destroyed, but the vegetation, crops, and everything growing in the region were destroyed as well.

The once-fertile plain became a picture of complete devastation.

🌱 Crops and vegetation were destroyed

🔥 Nothing escaped God's judgment

📖 The fertile valley became desolate

➡️ Lot's wife disobeys

---

### 👀 But His Wife Looked Back From Behind Him

Lot's wife disobeyed the one command the angels had given.

The Bible does not tell us exactly **why** she looked back.

Many believe her heart was still attached to Sodom. Others suggest she may have been thinking about family, friends, possessions, or the life she was leaving behind.

Whatever her reason, her actions revealed an unwillingness to completely leave the city God was judging.

The emphasis is not simply that she turned her head—it is that her heart remained tied to the world God had condemned.

👀 She disobeyed God's command

💔 Her heart remained attached to Sodom

⚠️ Looking back showed divided loyalty

➡️ Judgment fell immediately

---

### 🧂 And She Became A Pillar Of Salt

Immediately after looking back, Lot's wife became a pillar of salt.

This became a lasting reminder that God's commands are to be obeyed completely.

Jesus later referenced Lot's wife in Luke 17:32, saying simply,

**"Remember Lot's wife."**

Her story stands as a warning against turning back toward the life God calls us to leave.

🧂 Lot's wife became a lasting warning

⚖️ God's judgment was immediate

📖 Jesus later tells people to remember her

➡️ Abraham witnesses the aftermath

---

### 🌅 And Abraham Gat Up Early In The Morning

The next morning, Abraham rises early.

He returns to the same place where he had stood before the Lord during their conversation in Genesis 18.

It was from this place that Abraham had pleaded for Sodom.

🌅 Abraham returns early

📖 He goes back to where he met God

🙏 The place reminds us of his prayer for Sodom

➡️ He looks toward the cities

---

### 👀 And He Looked Toward Sodom And Gomorrah

From where Abraham stood, he looked across the Jordan Plain toward Sodom and Gomorrah.

He was looking to see what had become of the cities after speaking with God the previous day.

👀 Abraham looks across the plain

🏙️ He looks toward Sodom and Gomorrah

📖 He witnesses God's judgment

➡️ He sees the smoke

---

### 🌫️ And Toward All The Land Of The Plain, And Beheld

Abraham looks across the entire valley.

Everything that had once been fertile and prosperous had been devastated.

The destruction was impossible to miss.

🌫️ Abraham surveys the whole region

🏞️ The entire plain has been affected

➡️ He sees the smoke rising

---

### 🔥 Lo, The Smoke Of The Country Went Up As The Smoke Of A Furnace

The smoke rises in thick, dark columns like smoke pouring from a giant furnace.

The picture is one of total destruction.

From a distance, Abraham can clearly see that God's judgment has fallen exactly as He said it would.

🔥 Thick smoke fills the sky

🏭 Like smoke from a massive furnace

📖 God's judgment is visible from afar

➡️ Moses explains why Lot survived

---

### ❤️ And It Came To Pass

Some time passes after the destruction.

Moses now explains why Lot survived when the cities around him did not.

⏳ Time passes after the destruction

📖 Moses shifts from the event to its reason

➡️ God remembers Abraham

---

### 🙏 That God Remembered Abraham

The word **remembered** does not mean God had forgotten Abraham.

It means God acted because of His covenant and His relationship with Abraham.

Abraham had pleaded for the righteous in Sodom the day before.

Although there were not enough righteous people to spare the cities, God honored Abraham's intercession by rescuing Lot.

🙏 God remembers His covenant

❤️ God honors Abraham's intercession

📖 Abraham's prayer was not forgotten

➡️ Lot is delivered

---

### 🛡️ And Sent Lot Out Of The Midst Of The Overthrow

The **midst of the overthrow** means the middle of the destruction.

God rescued Lot before the judgment reached him.

Lot escaped not because he deserved it, but because God showed mercy and remembered His covenant with Abraham.

🛡️ Lot was rescued from the middle of the judgment

❤️ God showed mercy through His covenant

🙏 Abraham's relationship with God benefited Lot

➡️ The chapter closes with Lot safely delivered

---

### 🔥 When He Overthrew The Cities In The Which Lot Dwelt

The cities where Lot had chosen to live were completely destroyed.

Years earlier, Lot chose the fertile Jordan Plain because it looked prosperous.

Now those same cities have disappeared under God's judgment.

Genesis ends this section by contrasting Lot's rescue with the destruction of everything he had once chosen.

🏙️ Lot's former home is destroyed

⚖️ The choice that once looked best ended in judgment

❤️ God rescued Lot before the destruction

📖 God's promises to Abraham continue through His mercy

---

# Genesis 19:30–38

## 🏔️ The Birth Of Moab And Ben-ammi

### 🏔️ And Lot Went Up Out Of Zoar

After the destruction of Sodom, Lot leaves Zoar.

Although God had spared the city at Lot's request, Lot no longer feels safe living there.

He finally does what the angels originally told him to do—he goes to the mountains.

🏔️ Lot leaves Zoar

🏃 He finally obeys the angels' original command

📖 He leaves the city God had temporarily spared

➡️ Lot settles in the mountains

---

### ⛰️ And Dwelt In A Mountain

**Dwelt** simply means **lived**.

Lot settles in the mountains, just as the angels had instructed him earlier.

Life in the mountains would have been isolated and simple, much like the lifestyle Abraham had lived for years as a shepherd.

Instead of living in prosperous cities, Lot is now living far from civilization.

⛰️ Dwelt means lived

🏕️ Lot begins a simple life in the mountains

📖 This was God's original place of safety

➡️ Only his daughters remain with him

---

### 👨‍👧‍👧 And His Two Daughters With Him

Only Lot and his two unmarried daughters remain.

His wife has died.

His sons-in-law refused God's warning.

Much of the extended family they once knew had perished in Sodom.

Lot has lost nearly everything.

👨‍👧‍👧 Only three people remain

💔 Lot has lost his wife and much of his family

📖 His household has been reduced dramatically

➡️ They settle in a cave

---

### 🕳️ And He Dwelt In A Cave

Rather than building a home, Lot and his daughters live in a cave.

The man who once chose the richest land in Canaan is now living with almost nothing.

Genesis quietly shows how far Lot's life has fallen since separating from Abraham.

🕳️ Lot lives in a cave

📉 His wealth and comfort are gone

📖 Sin's consequences continue long after the judgment

➡️ Moses explains why

---

### 😟 For He Feared To Dwell In Zoar

Lot is afraid to remain in Zoar.

The Bible does not say exactly why.

Perhaps he feared that Zoar would also be judged, or perhaps the destruction of the surrounding cities left him fearful of staying anywhere nearby.

Whatever the reason, he abandons Zoar and retreats into the mountains.

😟 Lot is overcome with fear

🏙️ He no longer feels safe in Zoar

⛰️ He retreats farther into the mountains

➡️ His daughters begin to worry

---

### 👩 The Firstborn Said Unto The Younger

Lot's oldest daughter begins speaking to her younger sister.

From their perspective, their entire world has just been destroyed.

They believe there are no men left nearby with whom they can have families.

👩 The older sister begins the conversation

🌍 Their world appears destroyed

➡️ They explain their concern

---

### 🌍 There Is Not A Man In The Earth To Come In Unto Us After The Manner Of All The Earth

The daughters believe there is no man left to continue their family line.

The phrase **"after the manner of all the earth"** refers to the normal way families continue through marriage and children.

Although Abraham and others were still alive, the daughters apparently believed everyone around them had perished.

Their understanding was limited by what they had witnessed.

🌍 They think humanity has been wiped out

👨 They believe no husbands remain

📖 "After the manner of all the earth" refers to the normal way of marriage and children

➡️ They create a sinful plan

---

### 🍷 Come, Let Us Make Our Father Drink Wine

The daughters deliberately plan to intoxicate Lot.

This is not a spontaneous decision.

It is carefully planned.

They believe this is the only way to preserve their father's family line.

🍷 The plan is intentional

📝 The daughters carefully prepare it

➡️ They explain their reasoning

---

### 👶 That We May Preserve Seed Of Our Father

In the ancient world, preserving a family line was extremely important.

The daughters fear that their father's family will completely disappear.

Instead of trusting God to provide another way, they take matters into their own hands.

Like many stories in Genesis, fear leads people to make sinful decisions instead of waiting on God.

👶 They want to preserve Lot's family line

📖 Family lineage was highly valued

⚠️ They act out of fear instead of faith

➡️ They carry out their plan

---

### 🍷 They Made Their Father Drink Wine That Night

The daughters intentionally get Lot drunk.

Lot had just experienced unimaginable loss.

He had lost his home, his wife, his possessions, and nearly everyone he knew.

While the Bible does not tell us how much he had already been drinking, it tells us they purposely gave him enough wine that he would not know what was happening.

🍷 Lot is intentionally made drunk

💔 He has suffered tremendous loss

⚠️ The daughters carry out their plan

➡️ The oldest daughter acts

---

### 👩 The Firstborn Went In And Lay With Her Father

The oldest daughter sleeps with Lot while he is intoxicated.

This is one of the darkest moments in Genesis.

The Bible records what happened without approving of it.

Scripture often tells the truth about people's actions without saying those actions were right.

⚠️ The Bible records the event without approving it

🍷 Lot is intoxicated

📖 Sin is honestly recorded in Scripture

➡️ Lot is unaware

---

### 😴 He Perceived Not When She Lay Down, Nor When She Arose

Lot is so intoxicated that he is completely unaware of what happens.

The daughters intentionally made sure he could not consent or even remember.

😴 Lot is completely unaware

🍷 His drunkenness leaves him helpless

➡️ The plan continues the next day

---

### 🌅 It Came To Pass On The Morrow

**On the morrow** simply means **the next day.**

The oldest daughter tells the younger sister what happened the previous night.

🌅 Morrow means the next day

👩 The sisters continue their plan

➡️ They repeat it

---

### 🍷 Let Us Make Him Drink Wine This Night Also

The sisters repeat the exact same plan.

Again they intentionally make Lot drunk before the younger daughter goes in to him.

🍷 The plan is repeated

⚠️ The daughters continue deceiving their father

➡️ The younger daughter acts

---

### 👩 And The Younger Arose And Lay With Him

The younger sister carries out the same plan.

Again, Lot is completely unaware because of his intoxication.

👩 The younger daughter follows through

🍷 Lot remains unaware

➡️ Both daughters become pregnant

---

### 🤰 Thus Were Both The Daughters Of Lot With Child By Their Father

Both daughters become pregnant by Lot.

The Bible simply states the fact.

The consequences of this event will continue throughout Israel's history.

🤰 Both daughters become pregnant

📖 This event affects future generations

➡️ The first son is born

---

### 👶 And The Firstborn Bare A Son, And Called His Name Moab

The oldest daughter names her son **Moab**.

The name is closely connected with his unusual birth.

Moab becomes the ancestor of the **Moabite** nation, which frequently appears throughout the rest of the Old Testament.

👶 Moab is the first son

📖 His descendants become the Moabites

➡️ Moses identifies the nation

---

### 🏙️ The Same Is The Father Of The Moabites Unto This Day

Moses tells his readers that Moab became the father of the Moabite people.

The Moabites later become neighbors—and often enemies—of Israel.

They appear throughout the books of Numbers, Judges, Kings, and Ruth.

🏙️ Moab founded the Moabite nation

📖 The Moabites become an important nation in Israel's history

➡️ The younger daughter's son is introduced

---

### 👶 And The Younger, She Also Bare A Son, And Called His Name Ben-ammi

The younger daughter also gives birth to a son.

She names him **Ben-ammi**, which means **"son of my people"** or **"son of my kinsman."**

👶 Ben-ammi is the younger daughter's son

📖 His name reflects his family origin

➡️ Moses identifies his descendants

---

### 🏙️ The Same Is The Father Of The Children Of Ammon Unto This Day

Ben-ammi becomes the ancestor of the **Ammonites**.

Like the Moabites, the Ammonites become neighboring nations that frequently interact—and often come into conflict—with Israel throughout the Old Testament.

🏙️ Ben-ammi founded the Ammonite nation

📖 The Ammonites become another major nation in biblical history

➡️ Genesis 19 comes to a close`;

export const GENESIS_NINETEEN_PERSONAL_SECTIONS = parseGenesisNineteenRawNotes(GENESIS_NINETEEN_RAW_NOTES);
