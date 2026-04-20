import type { SeriesWeekLesson } from "./seriesContent";

function q(
  id: string,
  question: string,
  answers: [string, string, string, string],
  correctAnswer: "A" | "B" | "C" | "D",
  explanation: string,
) {
  return {
    id,
    question,
    options: [
      { label: "A" as const, text: answers[0] },
      { label: "B" as const, text: answers[1] },
      { label: "C" as const, text: answers[2] },
      { label: "D" as const, text: answers[3] },
    ],
    correctAnswer,
    explanation,
  };
}

const WEEK_ONE_INTRO = `Joseph's story did not hit me the first time I read it.

Compared to the Red Sea splitting, manna falling from heaven, or Jonah being swallowed by a great fish, it felt too normal.

No fire from the sky. No giant public miracle. Just family tension, jealousy, dreams, and betrayal.

But that is exactly why Joseph matters so much.

His story is not built around one dramatic moment. It is built around the kind of pain people actually live through.

Genesis 37 is where the testing begins.

We meet a seventeen year old who is favored, immature, and carrying dreams he does not yet know how to handle. We also meet brothers whose jealousy has been growing for a long time and a father whose favoritism has damaged the whole house.

This chapter is not just Joseph's backstory. It is the setup for everything that follows.

What starts with a robe, a report, and two dreams will eventually move an entire family into Egypt and set the stage for Israel becoming a nation.

So read this chapter slowly.

Pay attention to the family tension, the symbols, the geography, and the way God is still moving even when every person in the story seems messy.

Joseph's testing does not begin in Egypt.

It begins at home.`;

const WEEK_ONE_NOTES = "";
/*

Compared to:

🌊 Moses parting the sea

🍞 Manna falling from heaven

🐋 Jonah being swallowed by a great fish

Joseph's story felt plain.

No dramatic miracles.
No fire from the sky.

Just:

🏠 family drama

😤 jealousy

🌙 a kid with big dreams

So for a long time, I skimmed past it.

But once I actually learned how to study the Bible, I came back to Joseph's story.

And it changed everything.

Because Joseph's story isn't about flashy miracles.

It's about the stuff we all actually go through.

💔 betrayal
😠 jealousy
⏳ waiting
😞 pain
🤍 forgiveness
🙏 faith when nothing makes sense

That is why Joseph feels so real.

## Why Genesis 37 Matters

Most of Genesis follows one family line over generations.

👴 Abraham
👨 Isaac
🧔 Jacob

Now in Genesis 37, the focus narrows from Jacob to his sons, and especially to Joseph.

But this is bigger than Joseph alone.

This story shows how God's covenant family moves from one fractured household toward becoming the people who will one day leave Egypt in the Exodus.

What starts as jealousy inside one home will eventually become part of the story of national deliverance.

And it starts here:

💤 with dreams
🤩 with favoritism
😡 with tension

## Genesis 37:1 - Jacob in the Land of Promise

> Genesis 37:1
> Jacob lived in the land of his father's sojournings, in the land of Canaan.

The Hebrew word for sojournings is **gur**.

It means to dwell as a foreigner, to reside temporarily, to live without full possession.

Jacob is living in the land God promised, but he still does not fully own it.

That means Jacob is living in promise, but not yet in fulfillment.

Three generations have touched this same land:

👴 Abraham
👨 Isaac
🧔 Jacob

Same promise. Same waiting. Same tension between what God said and what they currently see.

## Genesis 37:2 - Joseph Steps Into the Story

> Genesis 37:2
> These are the generations of Jacob.
>
> Joseph, being seventeen years old, was pasturing the flock with his brothers... and Joseph brought a bad report of them to their father.

The phrase "these are the generations" comes from the Hebrew word **toledot**.

It is one of Genesis' major section markers and signals a new focus. The story now moves from Jacob himself to the family that came from him.

Joseph immediately becomes the center of gravity.

## Jacob's Family Was Already Complicated

Jacob's house was layered with rivalry before Joseph ever had a dream.

Leah bore Reuben, Simeon, Levi, Judah, Issachar, Zebulun, and Dinah.

Rachel bore Joseph and Benjamin.

Bilhah bore Dan and Naphtali.

Zilpah bore Gad and Asher.

This was a house full of unequal status, old wounds, and comparison.

## Joseph in the Field

Joseph seems less like one of the laboring brothers and more like an observer who reports back to Jacob.

He is young, naive, and honestly carrying a little snitch energy.

That does not justify the brothers' later violence, but it helps explain why resentment is already growing.

## Genesis 37:3-4 - Israel Loved Joseph More

> Genesis 37:3
> Now Israel loved Joseph more than all his children, because he was the son of his old age: and he made him a coat of many colours.

> Genesis 37:4
> And when his brethren saw that their father loved him more than all his brethren, they hated him, and could not speak peaceably unto him.

The name Israel is still Jacob, but it emphasizes covenant identity after his encounter with God in Genesis 32.

Jacob loved Joseph deeply because Joseph was Rachel's son, born after years of longing and waiting.

That does not make the favoritism right.

But it does make it understandable.

## The Robe of Many Colors

The robe was not just a nice gift.

It was a public symbol of status.

It was not shepherd clothing. It looked like privilege.

Every time Joseph wore it, his brothers saw a reminder that their father favored him more.

## The Dreams

Joseph's dreams were from God, but Joseph did not yet have the discernment to carry them wisely.

In the first dream, his brothers' sheaves bowed to his.

In the second, the sun, moon, and stars bowed.

The brothers do not hear those dreams as innocent storytelling. They hear authority, status, and threat.

Joseph is not trying to be evil. He is just not mature enough yet to understand timing.

That is a lesson by itself.

Everything God shows you is not meant to be announced immediately.

> Genesis 37:5
> And Joseph dreamed a dream, and he told it his brethren: and they hated him yet the more.

> Genesis 37:6
> And he said unto them, Hear, I pray you, this dream which I have dreamed:

> Genesis 37:7
> For, behold, we were binding sheaves in the field, and, lo, my sheaf arose, and also stood upright; and, behold, your sheaves stood round about, and made obeisance to my sheaf.

> Genesis 37:8
> And his brethren said to him, Shalt thou indeed reign over us? or shalt thou indeed have dominion over us? And they hated him yet the more for his dreams, and for his words.

> Genesis 37:9
> And he dreamed yet another dream, and told it his brethren, and said, Behold, I have dreamed a dream more; and, behold, the sun and the moon and the eleven stars made obeisance to me.

> Genesis 37:10
> And he told it to his father, and to his brethren: and his father rebuked him, and said unto him, What is this dream that thou hast dreamed? Shall I and thy mother and thy brethren indeed come to bow down ourselves to thee to the earth?

> Genesis 37:11
> And his brethren envied him; but his father observed the saying.

## Jacob Sends Joseph

Joseph is sent from Hebron toward Shechem and then farther to Dothan to check on his brothers and the flock.

> Genesis 37:12
> And his brethren went to feed their father's flock in Shechem.

> Genesis 37:13
> And Israel said unto Joseph, Do not thy brethren feed the flock in Shechem? come, and I will send thee unto them. And he said to him, Here am I.

> Genesis 37:14
> And he said to him, Go, I pray thee, see whether it be well with thy brethren, and well with the flocks; and bring me word again. So he sent him out of the vale of Hebron, and he came to Shechem.

> Genesis 37:15
> And a certain man found him, and, behold, he was wandering in the field: and the man asked him, saying, What seekest thou?

> Genesis 37:16
> And he said, I seek my brethren: tell me, I pray thee, where they feed their flocks.

> Genesis 37:17
> And the man said, They are departed hence; for I heard them say, Let us go to Dothan. And Joseph went after his brethren, and found them in Dothan.

That was not a casual errand. It was oversight.

It also meant Joseph was traveling alone into a hostile situation.

Favor put a robe on his back, but it also painted a target there.

## The Plot and the Pit

The brothers see him from far away and conspire before he even arrives.

> Genesis 37:18
> And when they saw him afar off, even before he came near unto them, they conspired against him to slay him.

> Genesis 37:19
> And they said one to another, Behold, this dreamer cometh.

> Genesis 37:20
> Come now therefore, and let us slay him, and cast him into some pit, and we will say, Some evil beast hath devoured him: and we shall see what will become of his dreams.

> Genesis 37:21
> And Reuben heard it, and he delivered him out of their hands; and said, Let us not kill him.

> Genesis 37:22
> And Reuben said unto them, Shed no blood, but cast him into this pit that is in the wilderness, and lay no hand upon him; that he might rid him out of their hands, to deliver him to his father again.

> Genesis 37:23
> And it came to pass, when Joseph was come unto his brethren, that they stript Joseph out of his coat, his coat of many colours that was on him;

> Genesis 37:24
> And they took him, and cast him into a pit: and the pit was empty, there was no water in it.

They call him "this dreamer."

That tells you exactly what is burning in them.

Reuben stops the murder, but Joseph is still stripped, humiliated, and thrown into a dry cistern.

The robe is removed before he goes into the pit.

That matters because they are attacking the symbol of favor before they attack the man.

## Sold for Silver

Then comes one of the coldest details in the chapter: they sit down to eat.

> Genesis 37:25
> And they sat down to eat bread: and they lifted up their eyes and looked, and, behold, a company of Ishmeelites came from Gilead with their camels bearing spicery and balm and myrrh, going to carry it down to Egypt.

> Genesis 37:26
> And Judah said unto his brethren, What profit is it if we slay our brother, and conceal his blood?

> Genesis 37:27
> Come, and let us sell him to the Ishmeelites, and let not our hand be upon him; for he is our brother and our flesh. And his brethren were content.

> Genesis 37:28
> Then there passed by Midianites merchantmen; and they drew and lifted up Joseph out of the pit, and sold Joseph to the Ishmeelites for twenty pieces of silver: and they brought Joseph into Egypt.

Joseph is in the pit, and they are having lunch.

Judah then asks what profit there is in killing him and proposes selling him instead.

So Joseph is sold for twenty shekels of silver and sent toward Egypt.

The brothers think they are ending the problem.

God is actually moving Joseph directly into the place where the dreams will eventually unfold.

## The Cover Up

The brothers dip the robe in blood and bring it to Jacob.

> Genesis 37:31
> And they took Joseph's coat, and killed a kid of the goats, and dipped the coat in the blood;

> Genesis 37:32
> And they sent the coat of many colours, and they brought it to their father; and said, This have we found: know now whether it be thy son's coat or no.

> Genesis 37:33
> And he knew it, and said, It is my son's coat; an evil beast hath devoured him; Joseph is without doubt rent in pieces.

> Genesis 37:34
> And Jacob rent his clothes, and put sackcloth upon his loins, and mourned for his son many days.

> Genesis 37:35
> And all his sons and all his daughters rose up to comfort him; but he refused to be comforted; and he said, For I will go down into the grave unto my son mourning. Thus his father wept for him.

They do not even say Joseph is dead directly. They let Jacob identify the robe and say the words himself.

That makes the deception even darker.

Jacob tears his garments, puts on sackcloth, and says he will go down to Sheol mourning.

In other words, he believes this grief will stay with him until death.

## Potiphar

The chapter ends with Joseph sold again, now into the house of Potiphar in Egypt.

> Genesis 37:36
> Meanwhile the Midianites had sold him in Egypt to Potiphar, an officer of Pharaoh, the captain of the guard.

*/
export const TESTING_OF_JOSEPH: SeriesWeekLesson[] = [
  {
    weekNumber: 1,
    title: "The Dreamer in the House of Jealousy",
    subtitle: "Favor, dreams, and betrayal",
    readingReference: "Genesis 37",
    readingApiQuery: "genesis+37",
    intro: WEEK_ONE_INTRO,
    reflectionQuestion:
      "Who do you think carries the most responsibility in Genesis 37: Joseph for being reckless with his dreams, the brothers for letting jealousy turn into violence, or Jacob for failing to lead his household with wisdom? Why?",
    triviaQuestions: [
      q("j1q1", "How old was Joseph when Genesis 37 introduces him?", ["12", "17", "20", "30"], "B", "Genesis 37:2 says Joseph was seventeen years old."),
      q("j1q2", "What did Joseph bring back to his father about his brothers?", ["A peace offering", "A dream report", "A bad report", "A written letter"], "C", "Genesis 37:2 says Joseph brought a bad report of them to their father."),
      q("j1q3", "What special gift did Jacob give Joseph that made the favoritism visible?", ["A silver ring", "A staff", "A robe of many colors", "A new tent"], "C", "Genesis 37:3 highlights the robe as the visible sign of Jacob's preference."),
      q("j1q4", "What did Joseph's first dream show his brothers doing?", ["Running away from him", "Fighting him in the field", "Bowing to his sheaf", "Giving him grain"], "C", "In the first dream, Joseph's sheaf stands and the others bow around it."),
      q("j1q5", "What happened to Joseph after his brothers pulled him from the pit?", ["He escaped and ran home", "He was sold to traders going to Egypt", "He was taken to Hebron", "He became a shepherd again"], "B", "Genesis 37:28 says Joseph was sold and taken down to Egypt."),
    ],
  },
  {
    weekNumber: 2,
    title: "Judah, Tamar, and the Mess in the Family Line",
    subtitle: "God's purposes in a morally broken chapter",
    readingReference: "Genesis 38",
    readingApiQuery: "genesis+38",
    intro: `Genesis 38 does not come out of nowhere.

It begins in the shadow of Joseph being sold, Jacob grieving, and a house full of silence and guilt.

The spotlight shifts away from Joseph and lands on Judah, one of the very brothers who helped make that pain possible.

This chapter is messy on purpose. It gives us grief, drift, hypocrisy, injustice, exposure, and the beginning of change.

But that is exactly why it matters.

Before Judah becomes the man who later offers himself for Benjamin, he has to be exposed and humbled first.

Genesis 38 shows us that God does not abandon people at their worst. He confronts them there and keeps His purposes moving forward.`,
    reflectionQuestion:
      "Genesis 38 exposes hidden sin, hypocrisy, and the damage caused when people refuse responsibility. Where does this chapter challenge you most: in owning your failures, in avoiding double standards, or in trusting that God can still work through messy history?",
    triviaQuestions: [
      q("j2q1", "Which brother becomes the focus of Genesis 38?", ["Reuben", "Judah", "Levi", "Benjamin"], "B", "Genesis 38 shifts the spotlight to Judah."),
      q("j2q2", "Who was Tamar married into?", ["Joseph's household", "Potiphar's house", "Judah's family", "Pharaoh's court"], "C", "Tamar was married to Judah's sons."),
      q("j2q3", "What sign items did Tamar receive from Judah as a pledge?", ["A crown and sandals", "His signet, cord, and staff", "A ring and necklace", "Silver and grain"], "B", "Those personal items became the proof that exposed Judah."),
      q("j2q4", "What did Judah finally say when Tamar revealed the evidence?", ["She deceived me", "I do not know her", "She is more righteous than I", "This is not my fault"], "C", "Genesis 38:26 records Judah's admission."),
      q("j2q5", "Why is Genesis 38 so important in the bigger biblical story?", ["It explains the Exodus", "It preserves the Judah line that leads toward kingship and ultimately Jesus", "It ends Joseph's dreams", "It starts the priesthood"], "B", "Judah's line matters deeply for the later story of Scripture."),
    ],
  },
  {
    weekNumber: 3,
    title: "The Lord Was With Joseph",
    subtitle: "Faithfulness in service and in temptation",
    readingReference: "Genesis 39",
    readingApiQuery: "genesis+39",
    intro: `Genesis 39 brings the camera back to Joseph after the hard detour through Judah and Tamar.

Joseph is no longer in Canaan. He is in Egypt, bought into Potiphar's house, and living as property in a foreign land.

But this chapter keeps repeating one line that changes how we read everything else: the LORD was with Joseph.

Genesis 39 is not just about suffering. It is about faithfulness in work, holiness under pressure, and God's presence in a place that still feels deeply unfair.

Joseph rises in Potiphar's house, refuses temptation in private, gets falsely accused, and ends the chapter in prison.

And still, God does not leave him.

This chapter teaches us that God's favor does not always look like comfort. Sometimes it looks like strength, integrity, and steady faithfulness in a place you never would have chosen.`,
    reflectionQuestion:
      "Genesis 39 shows Joseph being faithful in work, in private temptation, and in unfair suffering. Which part challenges you more right now: being consistent when no one sees it, refusing temptation when it costs you, or trusting God when obedience does not seem to pay off quickly?",
    triviaQuestions: [
      q("j3q1", "What repeated phrase appears in Genesis 39 to describe Joseph's situation?", ["Joseph was highly educated", "The Lord was with Joseph", "Joseph had many servants", "Joseph forgot his family"], "B", "Genesis 39 keeps repeating that the Lord was with Joseph."),
      q("j3q2", "Who bought Joseph in Egypt?", ["Pharaoh", "Potiphar", "An Ishmaelite captain", "The baker"], "B", "Joseph is sold into the house of Potiphar."),
      q("j3q3", "What temptation does Joseph face in Potiphar's house?", ["Stealing money", "Running away", "Potiphar's wife trying to sleep with him", "Lying to Pharaoh"], "C", "Potiphar's wife repeatedly tries to seduce Joseph."),
      q("j3q4", "What reason does Joseph give for refusing Potiphar's wife?", ["He is afraid of Potiphar", "He wants to go home", "It would be wickedness and sin against God", "He is too busy"], "C", "Joseph frames the temptation as sin against God, not just danger from people."),
      q("j3q5", "Where does Joseph end up at the end of Genesis 39?", ["Back in Canaan", "Dead in the field", "In prison", "In Pharaoh's palace"], "C", "Potiphar has Joseph thrown into prison."),
    ],
  },
  {
    weekNumber: 4,
    title: "Dreams in the Prison",
    subtitle: "Serving faithfully while being forgotten",
    readingReference: "Genesis 40",
    readingApiQuery: "genesis+40",
    intro: `Genesis 40 opens with Joseph still in prison after doing the right thing in Genesis 39.

He is not vindicated, not released, and not rewarded for obedience.

Instead, this chapter shows what faithfulness looks like after disappointment, when life does not immediately improve.

Joseph keeps serving, notices the pain of others, and gives God the credit when Pharaoh's officials have dreams in prison.

One man is restored. One man is executed. And Joseph stays right where he is.

Genesis 40 is about waiting, faithfulness, and the ache of being forgotten by people while still being positioned by God.`,
    reflectionQuestion:
      "What do you do when it feels like you have been faithful and still forgotten? Genesis 40 asks whether you can keep serving, keep noticing others, and keep trusting God even when the person who could have helped you walks away and forgets your name.",
    triviaQuestions: [
      q("j4q1", "Which two officials are put in prison with Joseph?", ["A soldier and a merchant", "The chief cupbearer and the chief baker", "Two shepherds", "A priest and a scribe"], "B", "Genesis 40 centers on Pharaoh's cupbearer and baker."),
      q("j4q2", "Who said, 'Do not interpretations belong to God?'", ["The cupbearer", "Joseph", "Potiphar", "Pharaoh"], "B", "Joseph gives God the credit for interpretation."),
      q("j4q3", "What happened to the cupbearer according to Joseph's interpretation?", ["He died in prison", "He escaped Egypt", "He was restored to service", "He became governor"], "C", "The cupbearer was restored to Pharaoh."),
      q("j4q4", "What happened to the baker according to Joseph's interpretation?", ["He was promoted", "He was executed", "He fled to Canaan", "He became cupbearer"], "B", "Joseph's interpretation said the baker would be hanged."),
      q("j4q5", "What painful thing happens to Joseph at the end of the chapter?", ["He loses the ability to interpret dreams", "The jailer abandons him", "The cupbearer forgets him", "His brothers find him"], "C", "Genesis 40 ends by saying the cupbearer did not remember Joseph."),
    ],
  },
  {
    weekNumber: 5,
    title: "From Prison to Palace",
    subtitle: "God's timing and God-given wisdom",
    readingReference: "Genesis 41",
    readingApiQuery: "genesis+41",
    intro: `Genesis 41 is not about dreams first. It is about timing.

Joseph has already spent years being betrayed, enslaved, falsely accused, and forgotten.

And then Genesis quietly says two whole years passed after the cupbearer forgot him.

No breakthrough. No explanation. Just waiting.

But when the time is finally right, God flips the story fast.

Pharaoh dreams, Egypt's wisest men fail, Joseph is brought out of prison, and the forgotten prisoner becomes the man who prepares a nation to survive famine.

Genesis 41 shows us that God is never late. He is precise.

And when He opens the door, the years of preparation suddenly make sense.`,
    reflectionQuestion:
      "Genesis 41 asks whether you trust God's timing enough to stay ready before the door opens. If the opportunity you have been waiting on came suddenly, would your heart be ready to give God the credit and carry the responsibility well?",
    triviaQuestions: [
      q("j5q1", "Who had the disturbing dreams in Genesis 41?", ["Potiphar", "The baker", "Pharaoh", "Jacob"], "C", "Genesis 41 begins with Pharaoh's dreams."),
      q("j5q2", "What two main dream images troubled Pharaoh?", ["Stars and ladders", "Cows and ears of grain", "Lions and rivers", "Fire and hail"], "B", "Pharaoh dreamed about cows and grain."),
      q("j5q3", "How many years of abundance and famine did Joseph say were coming?", ["3 and 3", "5 and 5", "7 and 7", "10 and 10"], "C", "Joseph interprets the dreams as seven years of plenty followed by seven years of famine."),
      q("j5q4", "What new Egyptian name was Joseph given?", ["Rameses", "Zaphenath-paneah", "Merneptah", "Onesimus"], "B", "Pharaoh gives Joseph the name Zaphenath-paneah."),
      q("j5q5", "What was Joseph's position after Pharaoh elevated him?", ["Captain of the guard", "Chief baker", "Second only to Pharaoh over Egypt", "Temple priest"], "C", "Joseph was made ruler over Egypt under Pharaoh."),
    ],
  },
  {
    weekNumber: 6,
    title: "The First Return of the Brothers",
    subtitle: "Famine, fear, and awakening conscience",
    readingReference: "Genesis 42",
    readingApiQuery: "genesis+42",
    intro: `Genesis 42 brings Joseph's brothers back into his life, but not in the way anyone would have imagined.

It has been almost twenty years since they sold Joseph, and now the famine has pushed them right into the presence of the brother they think is gone forever.

Joseph recognizes them immediately. They do not recognize him.

This chapter is about conscience, pressure, and the way buried guilt starts speaking when God brings old sin back to the surface.

The brothers come for grain, but what they really walk into is confrontation.

Joseph does not reveal himself right away. He tests them.

Not because he wants revenge, but because truth has to come out before healing can begin.`,
    reflectionQuestion:
      "Genesis 42 shows how old sin can stay buried for years and still rise back up under pressure. Is there anything unresolved in your life that only seems quiet because it has not been pressed yet? What would honest repentance look like before pressure exposes it for you?",
    triviaQuestions: [
      q("j6q1", "Why did Joseph's brothers travel to Egypt?", ["To visit Potiphar", "To buy grain during the famine", "To find Joseph", "To escape war"], "B", "The famine drove them to Egypt to buy food."),
      q("j6q2", "Did Joseph recognize his brothers when they came before him?", ["No", "Only Benjamin", "Yes", "Only Reuben"], "C", "Joseph recognized them, but they did not recognize him."),
      q("j6q3", "What accusation did Joseph make against his brothers at first?", ["That they were thieves", "That they were spies", "That they were idolaters", "That they were runaway slaves"], "B", "Joseph accused them of being spies."),
      q("j6q4", "Which brother was kept bound in Egypt?", ["Judah", "Reuben", "Simeon", "Levi"], "C", "Joseph kept Simeon while the others returned."),
      q("j6q5", "What happened to the brothers' money after they left with grain?", ["It was stolen by bandits", "Joseph secretly returned it in their sacks", "It was doubled by Pharaoh", "It was donated to the poor"], "B", "Joseph had the money put back into their sacks."),
    ],
  },
  {
    weekNumber: 7,
    title: "Bring Benjamin Down",
    subtitle: "Fear, pressure, and surrender",
    readingReference: "Genesis 43",
    readingApiQuery: "genesis+43",
    intro: `Genesis 43 is about what happens when fear finally collides with necessity.

Jacob does not want to let Benjamin go, but the famine does not care about fear.

Judah steps forward and takes responsibility in a new way, which shows his character is beginning to change.

The brothers return to Egypt, and Joseph sees Benjamin.

The pressure is still building, but grace also starts peeking through the story.`,
    reflectionQuestion:
      "Genesis 43 asks what you are holding so tightly that fear is running your decisions. Where might God be pushing you to trust Him more deeply, not because the risk feels small, but because the need to obey has become bigger than the fear?",
    triviaQuestions: [
      q("j7q1", "Which brother offered himself as a pledge for Benjamin's safety?", ["Simeon", "Judah", "Levi", "Issachar"], "B", "Judah took responsibility for Benjamin."),
      q("j7q2", "Why did the brothers have to return to Egypt?", ["They wanted revenge", "They wanted to see Joseph", "They needed more grain", "They were summoned by Pharaoh"], "C", "The famine continued, so they needed more grain."),
      q("j7q3", "How did Joseph react when he saw Benjamin?", ["He threw him in prison", "He wept and had to leave the room", "He ignored him", "He sent him home immediately"], "B", "Joseph was deeply moved and wept privately."),
      q("j7q4", "What extra portion was given to Benjamin at the meal?", ["Twice as much", "Five times as much", "Ten times as much", "No portion at all"], "B", "Benjamin received five times as much."),
      q("j7q5", "What major emotional pressure still hangs over the family in Genesis 43?", ["Military war", "The fear of losing Benjamin like Joseph", "A plague in Goshen", "Pharaoh's anger"], "B", "Jacob's fear about Benjamin is central to the chapter."),
    ],
  },
  {
    weekNumber: 8,
    title: "The Silver Cup Test",
    subtitle: "Judah changes and the brothers are exposed",
    readingReference: "Genesis 44",
    readingApiQuery: "genesis+44",
    intro: `Genesis 44 is one of the most emotionally intense chapters in Joseph's story.

Joseph sets up a final test by having his silver cup placed in Benjamin's sack.

This chapter reveals whether these brothers are still the same men who abandoned Joseph years earlier.

When Benjamin is threatened, Judah steps into the gap and offers himself instead.

The brother who once helped sell Joseph is now willing to suffer in another brother's place.`,
    reflectionQuestion:
      "Genesis 44 forces the question of whether people can really change. Where have you seen God changing you from the kind of person who protects self first into the kind of person who takes responsibility, tells the truth, and stands in the gap for others?",
    triviaQuestions: [
      q("j8q1", "What item was secretly placed in Benjamin's sack?", ["A royal ring", "A silver cup", "A robe", "A gold chain"], "B", "Joseph's silver cup was hidden in Benjamin's sack."),
      q("j8q2", "What accusation followed after the cup was found?", ["That Benjamin was a spy", "That Benjamin stole the cup", "That Judah attacked a servant", "That Reuben lied to Pharaoh"], "B", "Benjamin was accused of stealing the cup."),
      q("j8q3", "Who gave the long plea in front of Joseph?", ["Levi", "Reuben", "Judah", "Simeon"], "C", "Judah speaks at length and pleads for Benjamin."),
      q("j8q4", "What did Judah offer in Benjamin's place?", ["Money", "His own freedom and life as a servant", "A flock of sheep", "Simeon's release"], "B", "Judah offers himself in Benjamin's place."),
      q("j8q5", "Why is Judah's response so significant?", ["Because he was the youngest", "Because he once played a role in selling Joseph", "Because he was from Egypt", "Because he was a priest"], "B", "Judah's growth is part of the chapter's turning point."),
    ],
  },
  {
    weekNumber: 9,
    title: "I Am Joseph",
    subtitle: "Revelation, tears, and grace after betrayal",
    readingReference: "Genesis 45",
    readingApiQuery: "genesis+45",
    intro: `Genesis 45 is the release after all the built-up pressure of the previous chapters.

Joseph can no longer control himself, so he sends everyone out and reveals who he is.

The brothers are forced to face the living brother they betrayed.

But Joseph does not use that moment to crush them.

He interprets the whole story through God's providence and preserving purpose.`,
    reflectionQuestion:
      "Joseph's words in Genesis 45 do not deny the wrong done to him, but they do place the story under God's bigger hand. Where do you need God's help to move from replaying the wound toward seeing how He may still be at work in a painful story that was never okay on its own?",
    triviaQuestions: [
      q("j9q1", "What did Joseph finally say to his brothers in private?", ["I am Pharaoh's servant", "I am Joseph", "I forgive you all", "Bring me Jacob"], "B", "Joseph finally reveals himself by saying, 'I am Joseph.'"),
      q("j9q2", "How did the brothers respond at first to Joseph's revelation?", ["They celebrated loudly", "They were dismayed and stunned", "They immediately bowed again", "They ran away"], "B", "The text says they were dismayed in his presence."),
      q("j9q3", "How many years of famine did Joseph say were still remaining?", ["Two", "Five", "Seven", "Ten"], "B", "Genesis 45 says there were still five years of famine left."),
      q("j9q4", "How did Joseph interpret the larger purpose behind being sent to Egypt?", ["As pure bad luck", "As punishment for his pride", "As God preserving life", "As Egypt's victory"], "C", "Joseph says God sent him ahead to preserve life."),
      q("j9q5", "What invitation did Joseph give his family after revealing himself?", ["Return to Canaan forever", "Come dwell in Egypt near him", "Stay where they were", "Send only Benjamin"], "B", "Joseph invites them to come down to Egypt."),
    ],
  },
  {
    weekNumber: 10,
    title: "Jacob Goes Down to Egypt",
    subtitle: "Transition, fear, and the God of the journey",
    readingReference: "Genesis 46",
    readingApiQuery: "genesis+46",
    intro: `Genesis 46 is about a major transition.

Jacob, now called Israel, is leaving Canaan and going down to Egypt.

Before the journey continues, God meets Jacob at Beersheba and tells him not to be afraid.

That matters because even this move into Egypt is not outside God's plan.

The genealogy in this chapter shows the covenant story moving with a real family into a new land.`,
    reflectionQuestion:
      "Genesis 46 reminds us that major transitions can still be under God's hand even when they are uncomfortable. Where do you need to hear God's 'do not be afraid' in your own life right now as you step into a place, season, or responsibility that feels unfamiliar?",
    triviaQuestions: [
      q("j10q1", "Where did God speak to Jacob before he went fully into Egypt?", ["Bethel", "Jerusalem", "Beersheba", "Hebron"], "C", "God spoke to Jacob in visions of the night at Beersheba."),
      q("j10q2", "What did God tell Jacob about going down to Egypt?", ["That he should turn back", "Do not be afraid to go down to Egypt", "That Egypt would destroy him", "That Joseph was dead"], "B", "God specifically told Jacob not to be afraid to go down to Egypt."),
      q("j10q3", "Who rode in the wagons Pharaoh had sent?", ["Only Joseph", "Jacob's whole household going down", "Only the servants", "The Egyptian army"], "B", "Jacob and the family made the journey with what had been provided."),
      q("j10q4", "Why is the list of names in Genesis 46 important?", ["It proves Joseph wrote Genesis", "It records the covenant family entering Egypt", "It names Egyptian officials", "It explains the plagues"], "B", "The genealogy shows the covenant household moving into Egypt."),
      q("j10q5", "What emotional reunion happens in this chapter?", ["Judah sees Tamar again", "Joseph meets Benjamin for the first time", "Joseph and Jacob see each other again", "Reuben becomes ruler"], "C", "Joseph is reunited with his father Jacob."),
    ],
  },
  {
    weekNumber: 11,
    title: "Goshen and the Famine Strategy",
    subtitle: "Wisdom, provision, and preserving a people",
    readingReference: "Genesis 47",
    readingApiQuery: "genesis+47",
    intro: `Genesis 47 shows Joseph not just as a survivor, but as a wise administrator.

Jacob's family is settled in Goshen, and Joseph carefully handles how they are presented before Pharaoh.

The famine keeps intensifying across the land, and Joseph manages the crisis with real wisdom.

At the same time, Jacob keeps his heart pointed toward God's promise and asks to be buried in Canaan, not Egypt.`,
    reflectionQuestion:
      "Genesis 47 shows Joseph handling real responsibility with wisdom while Jacob keeps his heart pointed toward God's larger promise. How do you stay faithful in the practical responsibilities right in front of you without losing sight of the deeper things God has said over your life?",
    triviaQuestions: [
      q("j11q1", "What land was given to Jacob's family in Egypt?", ["Memphis", "The Delta", "Goshen", "Thebes"], "C", "Joseph settled his family in Goshen."),
      q("j11q2", "How old was Jacob when he stood before Pharaoh?", ["90", "110", "130", "147"], "C", "Jacob says his years are one hundred thirty."),
      q("j11q3", "What did Joseph collect after the people ran out of money during the famine?", ["Only grain", "Livestock", "Weapons", "Temple offerings"], "B", "Joseph collected livestock after their money was gone."),
      q("j11q4", "What did Jacob ask Joseph to promise near the end of the chapter?", ["To make Benjamin ruler", "To bury him in Canaan", "To leave Egypt immediately", "To punish his brothers"], "B", "Jacob asked not to be buried in Egypt."),
      q("j11q5", "What does Genesis 47 reveal about Joseph's role in Egypt?", ["He was only symbolic", "He handled national survival with real wisdom and policy", "He retired from service", "He only served Goshen"], "B", "Joseph was actively managing the famine response for Egypt."),
    ],
  },
  {
    weekNumber: 12,
    title: "Blessing the Next Generation",
    subtitle: "Crossed hands and covenant sight",
    readingReference: "Genesis 48",
    readingApiQuery: "genesis+48",
    intro: `Genesis 48 slows down and gives us one of the most meaningful blessing scenes in Joseph's story.

Joseph brings his sons, Manasseh and Ephraim, to Jacob for blessing.

Joseph expects the older son to receive the stronger blessing, but Jacob deliberately crosses his hands.

That moment shows again that God is not trapped by human ordering systems.`,
    reflectionQuestion:
      "Genesis 48 reminds us that God is not locked into the expectations people build around status, order, or human strategy. Where have you seen God work in a way that crossed your assumptions and forced you to trust His wisdom over your own neat plan?",
    triviaQuestions: [
      q("j12q1", "Whose sons did Joseph bring to Jacob for blessing?", ["Reuben and Simeon", "Ephraim and Manasseh", "Perez and Zerah", "Dan and Naphtali"], "B", "Genesis 48 centers on Ephraim and Manasseh."),
      q("j12q2", "Which son was older, Manasseh or Ephraim?", ["Ephraim", "Manasseh", "They were twins", "The chapter does not say"], "B", "Manasseh was the firstborn."),
      q("j12q3", "What did Jacob do when he blessed Joseph's sons?", ["He refused to bless them", "He crossed his hands", "He blessed only Manasseh", "He asked Judah to bless them"], "B", "Jacob crossed his hands so the right hand rested on Ephraim."),
      q("j12q4", "How did Joseph react when he saw Jacob's hands crossed?", ["He approved immediately", "He tried to correct his father", "He walked away", "He laughed"], "B", "Joseph tried to move his father's hands."),
      q("j12q5", "What larger theme does Genesis 48 continue from earlier in Genesis?", ["God often overturns expected human order", "Egypt is stronger than Canaan", "Dreams are no longer important", "Only firstborn sons matter"], "A", "Genesis repeatedly shows God working through surprising reversals."),
    ],
  },
  {
    weekNumber: 13,
    title: "Jacob's Final Blessings",
    subtitle: "Prophecy, exposure, and the future of the tribes",
    readingReference: "Genesis 49",
    readingApiQuery: "genesis+49",
    intro: `Genesis 49 is not a light chapter.

Jacob gathers his sons and speaks words that are part blessing, part rebuke, and part prophetic unveiling.

He addresses the real character and legacy of each son.

Judah receives the most far-reaching promise, which points toward kingship and later messianic hope.`,
    reflectionQuestion:
      "Genesis 49 makes us face the reality that patterns of character carry consequences. If someone had to summarize the strongest spiritual pattern in your life right now, what would they say it is and would that description feel like a blessing, a warning, or both?",
    triviaQuestions: [
      q("j13q1", "What did Jacob do before speaking to each of his sons in Genesis 49?", ["He divided the land", "He gathered them to tell what would happen in days to come", "He crowned Joseph", "He built an altar"], "B", "Jacob gathered them and spoke prophetically over them."),
      q("j13q2", "Which son received the promise that the scepter would not depart from him?", ["Reuben", "Joseph", "Judah", "Benjamin"], "C", "Judah receives the royal line language."),
      q("j13q3", "How is Reuben described in a negative way in Jacob's words?", ["Like a lion", "Unstable as water", "A fruitful vine", "A strong donkey"], "B", "Jacob says Reuben is unstable as water."),
      q("j13q4", "Which two brothers are rebuked together for violence?", ["Dan and Naphtali", "Simeon and Levi", "Gad and Asher", "Joseph and Benjamin"], "B", "Simeon and Levi are addressed together over their violence."),
      q("j13q5", "Why is Genesis 49 important for the big picture of Scripture?", ["It predicts the exile of Judah only", "It helps frame the future identity and destiny of the tribes, especially Judah", "It ends the covenant promises", "It explains Egyptian religion"], "B", "Jacob's words help shape how the tribes are seen going forward."),
    ],
  },
  {
    weekNumber: 14,
    title: "You Meant Evil, God Meant Good",
    subtitle: "Forgiveness, burial, and Joseph's final hope",
    readingReference: "Genesis 50",
    readingApiQuery: "genesis+50",
    intro: `Genesis 50 closes Joseph's story with grief, fear, forgiveness, and hope.

Jacob dies, and Joseph honors him by burying him in Canaan.

After the funeral, the brothers panic and fear Joseph will finally repay them for what they did.

Joseph answers with one of the most famous lines in Genesis: what they meant for evil, God meant for good.

The story ends in Egypt, but it ends with eyes still looking toward God's promise.`,
    reflectionQuestion:
      "Genesis 50 asks whether you believe God can tell a bigger story than the evil people have done. Where do you need grace to release bitterness, and where do you need faith to believe that pain, betrayal, and loss are not stronger than God's long-term purpose?",
    triviaQuestions: [
      q("j14q1", "Where did Joseph bury Jacob?", ["In Goshen", "In Pharaoh's tombs", "Back in Canaan", "In the prison yard"], "C", "Joseph honored Jacob's request to be buried in Canaan."),
      q("j14q2", "Why were Joseph's brothers afraid after Jacob died?", ["They thought Joseph would now repay them for their evil", "They feared famine again", "They feared Pharaoh", "They feared Benjamin"], "A", "They worried Joseph would finally take revenge."),
      q("j14q3", "What did Joseph say about their evil intentions?", ["It destroyed everything", "It no longer mattered", "They meant evil, but God meant it for good", "It was just a misunderstanding"], "C", "Genesis 50:20 gives Joseph's famous statement of providence."),
      q("j14q4", "What did Joseph ask regarding his bones before he died?", ["To bury them in Goshen forever", "To burn them", "To carry them up when God visited His people", "To place them in Pharaoh's court"], "C", "Joseph asked for his bones to be carried up later."),
      q("j14q5", "How old was Joseph when he died?", ["90", "100", "110", "120"], "C", "Genesis 50 says Joseph died at one hundred ten years old."),
    ],
  },
];
