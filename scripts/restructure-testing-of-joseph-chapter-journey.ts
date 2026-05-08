import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type JosephDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

const josephDays: JosephDay[] = [
  {
    day_number: 1,
    day_title: "The Family Before Joseph",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 29,
    reflection_question: "Where do you see family pain or longing shaping the story before Joseph is even born?",
    devotional_text: `Genesis 29 begins before Joseph is born, but it matters deeply for Joseph's story.

Jacob arrives in the east and meets Rachel at a well. He loves her quickly and deeply. But the family Joseph will be born into is already complicated. Laban deceives Jacob. Leah is given in marriage first. Rachel is loved, Leah is wounded, Jacob is caught in a household shaped by desire, disappointment, rivalry, and manipulation.

That background matters because Joseph's story does not begin with a colorful coat. It begins in a family where favoritism, comparison, and unresolved pain are already present.

Jacob knows what it is to be deceived. He knows what it is to want blessing. He knows what it is to live in a family divided by preference. Those patterns do not disappear when Joseph enters the story. They echo forward.

This chapter helps us see that God often works in families that are not clean or simple. He does not wait for perfect people before He begins His plan. He moves through broken households, wounded hearts, and complicated histories.

Joseph's future testing will happen inside a family that already needs healing.

Before we judge Joseph's brothers, Jacob, Leah, or Rachel too quickly, Genesis invites us to notice the roots. Pain travels when it is not surrendered. Favoritism grows when wisdom is missing. But God's covenant is still moving.

The story is messy. God is still faithful.`,
  },
  {
    day_number: 2,
    day_title: "The Son Rachel Longed For",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 30,
    reflection_question: "How does Genesis 30 help you understand why Joseph was so deeply loved and why that love became complicated?",
    devotional_text: `Genesis 30 shows the pressure inside Jacob's home.

Leah has children. Rachel waits. The sisters compare, compete, and suffer. Children become tangled up in longing, jealousy, identity, and the ache of wanting to be seen.

Then Genesis says something tender: "God remembered Rachel."

Rachel conceives and gives birth to Joseph. His name carries hope. She says, "May the Lord add to me another son." Joseph is not just another child in the household. He is the child Rachel waited for. He is the son born after tears, frustration, and years of longing.

That helps explain why Jacob's love for Joseph becomes so intense later. Joseph is tied to Rachel, the woman Jacob loved first and most deeply. Joseph carries emotional weight before he ever speaks a word.

But love without wisdom can become favoritism. And favoritism can wound everyone around it.

Genesis 30 is not just background information. It is the soil where Joseph's story grows. His birth is a gift, but the family system around him is fragile. The brothers are not simply villains who appear out of nowhere. They are sons growing up inside rivalry.

God gives Joseph life in the middle of a divided family. That does not excuse what the brothers later do, but it helps us understand the pressure.

Sometimes your story begins before your own choices. You inherit family patterns. You inherit wounds. You inherit expectations. But inherited pain does not have to define the end of the story.

God remembered Rachel. And through her son Joseph, God would one day preserve the very family that struggled to love each other well.`,
  },
  {
    day_number: 3,
    day_title: "Leaving Laban's House",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 31,
    reflection_question: "What does Jacob's departure from Laban teach you about God protecting a family in transition?",
    devotional_text: `Genesis 31 is a chapter of departure.

Jacob has spent years under Laban's control. He has worked, been deceived, negotiated, endured tension, and built a family in a place that was never meant to be permanent.

Then God speaks: "Return to the land of your fathers and to your kindred, and I will be with you."

That sentence matters for Joseph's story. Joseph grows up in a family on the move because God is bringing Jacob back toward the land of promise. The family is not drifting randomly. God is directing them.

But obedience does not make the transition easy. Jacob leaves secretly. Rachel takes the household gods. Laban chases them. Accusations fly. Old patterns of control and fear surface again.

Still, God protects Jacob. God warns Laban. God keeps the family from being swallowed by the past.

Joseph's early world is shaped by movement, conflict, and divine protection. He is part of a family learning that the promise of God is stronger than the schemes of people.

This chapter teaches us that leaving an unhealthy season can still be complicated. You can be obeying God and still feel tension. You can be moving toward promise and still have old voices chasing you.

But God knows how to guard what He is guiding.

Jacob's family leaves Laban's house with wounds, wealth, children, conflict, and promise. They are not fully healed yet. But they are being moved by God.

Sometimes the journey toward calling begins with leaving what shaped you.`,
  },
  {
    day_number: 4,
    day_title: "Jacob Becomes Israel",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 32,
    reflection_question: "Where might God be changing your identity before changing your circumstances?",
    devotional_text: `Genesis 32 brings Jacob to the edge of a reunion he fears.

Esau is coming. Four hundred men are with him. Jacob remembers what he did. He remembers deception, stolen blessing, and a brother's anger. The past is walking toward him.

That night, Jacob is left alone.

And he wrestles.

The mysterious man wrestles with him until daybreak. Jacob clings and refuses to let go without a blessing. Then his name is changed. No longer only Jacob, the grasping one. Now Israel, the one who strives with God.

This matters for Joseph because Joseph is born into the family of Israel. His father is not just a man with a painful past. He is a man God renamed.

But Jacob still walks with a limp.

That is important. Transformation does not erase history. God changes Jacob, but Jacob still carries the mark of the encounter. He moves forward blessed and humbled.

Joseph's story will also be about identity under pressure. The coat will be stripped. The family name will be far away. Egypt will rename him. Prison will confine him. Power will test him.

But before Joseph is tested, Jacob is renamed.

Genesis 32 reminds us that God often deals with identity before destiny. He does not only move people into places. He forms them into people who can carry what comes next.

Jacob wanted protection from Esau. God gave him a deeper blessing. He gave him a new name.

Sometimes the answer you need is not first a changed situation. It is a changed you.`,
  },
  {
    day_number: 5,
    day_title: "Loss, Worship, and Benjamin",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 35,
    reflection_question: "How does Genesis 35 prepare you to understand Jacob's attachment to Joseph and Benjamin?",
    devotional_text: `Genesis 35 is a chapter of return, worship, death, and family change.

God sends Jacob back to Bethel, the place where Jacob first encountered Him in a dream. Jacob tells his household to put away foreign gods, purify themselves, and prepare to worship.

The family is still messy. But Jacob is trying to lead them back to God.

Then Rachel gives birth to Benjamin. The moment is both gift and grief. A son is born, but Rachel dies. Jacob loses the woman he loved most deeply. Joseph loses his mother. Benjamin enters the story through sorrow.

This changes how we read the Joseph story.

Joseph and Benjamin are not just two younger sons. They are Rachel's sons. They are tied to Jacob's deepest love and deepest loss. When Jacob later clings to Joseph, and then clings to Benjamin after Joseph is gone, Genesis 35 helps us understand why.

Grief can shape love. But grief can also distort it.

Jacob's love for Joseph is real, but it becomes favoritism. His protection of Benjamin is understandable, but it also creates pressure for the whole family. Pain that is not surrendered can become control.

Genesis 35 also shows God reaffirming Jacob's name, Israel, and His covenant promises. Death does not cancel promise. Loss does not stop God's plan.

Rachel is buried on the way. Benjamin is born. Jacob keeps walking. The covenant continues.

Joseph's testing will grow out of this soil: worship and grief, promise and pain, love and favoritism.

God is still working in the middle of all of it.`,
  },
  {
    day_number: 6,
    day_title: "The Coat, the Dreams, and the Pit",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 37,
    reflection_question: "What does Genesis 37 show you about favor, immaturity, jealousy, and God's hidden plan?",
    devotional_text: `Genesis 37 brings Joseph to the center of the story.

He is seventeen. He is loved by Jacob more than the others. He receives the special coat. He has dreams that point toward future authority. And his brothers hate him.

This chapter is painful because almost everyone is exposed.

Jacob's favoritism is exposed. Joseph's youth and lack of discernment are exposed. The brothers' jealousy is exposed. A family that needed healing becomes a family capable of betrayal.

Joseph's brothers strip him of the coat and throw him into a pit. Then they sell him. The visible sign of favor is torn away, but the calling of God is not.

That is one of the deep truths of this chapter.

People can strip what they see. They cannot strip what God has spoken.

The coat can be taken. The dream cannot.

Genesis 37 also teaches that God's plan may begin moving in a way that looks like loss. Joseph is sold into Egypt. Jacob believes his son is dead. The brothers think the dream is over.

But the chapter ends with Joseph in Egypt, in the house of Potiphar. What looks like disaster is also positioning.

That does not make the betrayal good. It was evil. It was cruel. It wounded a family for years. But God is already working beyond what anyone can see.

The pit was not the end of Joseph's story.

Sometimes the place that feels like burial is actually the beginning of movement.`,
  },
  {
    day_number: 7,
    day_title: "Judah's Detour",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 38,
    reflection_question: "What does Judah's story teach you about guilt, compromise, and the beginning of repentance?",
    devotional_text: `Genesis 38 feels like an interruption, but it is not.

Joseph has just been sold into Egypt. Then the story turns to Judah. That shift matters because Judah was the brother who suggested selling Joseph. He watched the betrayal happen. He watched Jacob grieve. He carried the secret.

Then Genesis says Judah went down from his brothers.

That line is more than geography. Judah drifts from the family, from responsibility, and from the covenant community. His life becomes tangled in compromise, loss, deception, and exposure.

Tamar's story is hard, but it reveals Judah's heart. He withholds what is right. He protects himself. He judges quickly. Then the truth comes out.

And Judah says, "She is more righteous than I."

That sentence is the beginning of change.

Genesis 38 matters for the Joseph journey because Judah must be transformed before the family can be reconciled. The man who helped sell one brother will later offer himself for another brother.

But that transformation begins here, with exposure and confession.

God does not only test Joseph in this story. He is also dealing with Judah. Joseph is being formed through suffering. Judah is being confronted through sin.

Both need grace.

This chapter reminds us that God works on more than one person at a time. While Joseph is in Egypt, God is not ignoring the brothers. He is preparing the future moment when repentance will have to become action.

Judah's detour is ugly. But it is not wasted.

Confession can become the doorway to change.`,
  },
  {
    day_number: 8,
    day_title: "Faithful in Potiphar's House",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 39,
    reflection_question: "What does Joseph's faithfulness in Genesis 39 teach you about integrity when life is unfair?",
    devotional_text: `Genesis 39 opens with Joseph in Egypt.

He is far from home. Far from Jacob. Far from the coat. Far from everything familiar. From the outside, it looks like Joseph has been abandoned.

But the chapter repeats the truth: the Lord was with Joseph.

That does not mean Joseph's situation was easy. He was still enslaved. He was still betrayed. He was still living in a place he did not choose. But God's presence was not absent in the hard place.

Joseph serves faithfully in Potiphar's house. He works with excellence. He becomes trusted. Responsibility grows around him.

Then temptation comes.

Potiphar's wife pressures him again and again. Joseph refuses. He does not reduce sin to whether he will get caught. He says, "How then can I do this great wickedness and sin against God?"

That is integrity.

Joseph sees God even in Egypt. He chooses obedience even when no one from home is watching. He flees temptation even when it costs him.

And it does cost him. He is falsely accused and thrown into prison.

Genesis 39 refuses a shallow version of faith where obedience always brings immediate comfort. Joseph does the right thing and suffers anyway. But the chapter ends the same way it began.

The Lord was with Joseph.

God's presence is not proven by easy circumstances. Sometimes His presence is revealed by the character He forms in unfair ones.

Joseph loses another garment. But he keeps his integrity.

And integrity is worth more than comfort.`,
  },
  {
    day_number: 9,
    day_title: "Serving While Forgotten",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 40,
    reflection_question: "How can you stay faithful with your gifts while you are still waiting for your own breakthrough?",
    devotional_text: `Genesis 40 shows Joseph in prison.

Not because he failed, but because he was falsely accused. He has every reason to become bitter. He could withdraw. He could stop caring. He could decide that helping people is pointless because people have only hurt him.

But Joseph keeps serving.

When Pharaoh's cupbearer and baker are troubled by dreams, Joseph notices their faces. That detail matters. A bitter person may not notice someone else's pain. Joseph does.

He asks, "Why are your faces downcast today?"

Joseph is still attentive. Still compassionate. Still using his gifts.

Then he says, "Do not interpretations belong to God?" Even in prison, Joseph points people back to the Lord. His own dream has not been fulfilled, but he still believes God speaks.

That is maturity.

Joseph interprets both dreams. One man will be restored. One man will die. Joseph asks the cupbearer to remember him when he is restored.

But the chapter ends with a painful sentence: the cupbearer forgot him.

This is one of the hardest tests in Joseph's life. Not the pit. Not Potiphar's house. Not even prison itself. The test is being useful and forgotten.

Can you serve when it does not seem to move your own story forward? Can you use your gifts when your own promise feels delayed?

Joseph does.

Genesis 40 teaches that waiting does not have to become wasting. The prison can become a place of faithfulness.

God was still writing the story, even when the person Joseph helped forgot his name.`,
  },
  {
    day_number: 10,
    day_title: "From Prison to Wisdom",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 41,
    reflection_question: "What does Genesis 41 teach you about being ready when God opens a door?",
    devotional_text: `Genesis 41 begins with time: two full years.

Two years after the cupbearer forgot Joseph. Two years of silence. Two years of prison. Two years where nothing seemed to change.

Then Pharaoh dreams.

No one can interpret the dreams. Suddenly the cupbearer remembers Joseph. In one day, Joseph is brought from prison to the palace.

That is how quickly a door can open when God decides the time is right.

But the most important thing is not that Joseph gets an opportunity. It is that Joseph is ready for it.

When Pharaoh says he has heard Joseph can interpret dreams, Joseph does not grab glory. He says, "It is not in me; God will give Pharaoh a favorable answer."

Years of suffering have not made Joseph arrogant. Years of waiting have not made him faithless. He stands before power and gives credit to God.

Then Joseph does more than interpret. He gives wisdom. He explains the years of plenty and famine. He counsels Pharaoh to appoint a wise leader and store grain.

Joseph's gift opens the door, but his wisdom makes him useful.

Pharaoh promotes him over Egypt. Joseph moves from prison to authority, but the assignment is not comfort. It is stewardship.

The years of hardship prepared Joseph to handle responsibility. The forgotten years were not wasted years.

Genesis 41 teaches that God can change a situation suddenly, but He forms character slowly. Joseph was not made ready in the palace. He was made ready in the pit, the house, and the prison.

When the door opened, his character walked through it with him.

That is what preparation looks like.`,
  },
  {
    day_number: 11,
    day_title: "The Past Walks Into the Room",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 42,
    reflection_question: "How does Joseph's restraint in Genesis 42 challenge the way you respond when old wounds resurface?",
    devotional_text: `Genesis 42 brings Joseph's brothers to Egypt.

The famine reaches Canaan. Jacob sends his sons to buy grain. They do not know the official they will stand before is the brother they sold.

But Joseph knows.

The past walks into the room and bows before him.

This is a dangerous moment. Joseph has power now. He has authority. He could punish them instantly. He could expose them publicly. He could use his position to repay the pain.

Instead, Joseph restrains himself.

He tests them. Not because he is playing games, but because he needs to know what kind of men they have become. Are they still willing to sacrifice a brother? Are they still hiding behind lies? Has anything changed?

Genesis 42 is not simple revenge. It is controlled wisdom.

Joseph remembers the dreams. The bowing is happening. But fulfillment does not make him careless. He does not let the dream become ego. He lets the moment reveal hearts.

The brothers begin to connect their trouble with what they did to Joseph. Their guilt is still alive. Reuben speaks. They remember Joseph pleading from the pit.

Joseph turns away and weeps.

That detail matters. He is not cold. He is not healed in a way that feels nothing. He feels deeply, but he does not let emotion rule the process.

Sometimes God brings old wounds back into view, not to reopen them, but to redeem what was broken.

Joseph shows us that maturity is not pretending the past did not hurt. Maturity is refusing to let hurt become your master.

Power tests the heart.

Joseph chooses restraint.`,
  },
  {
    day_number: 12,
    day_title: "Benjamin at the Table",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 43,
    reflection_question: "What does Genesis 43 teach you about emotion, wisdom, and the slow work of rebuilding trust?",
    devotional_text: `Genesis 43 brings Benjamin to Egypt.

Jacob resists at first. He already believes Joseph is gone. Simeon is held in Egypt. Now he is being asked to risk Benjamin, Rachel's other son. His fear makes sense.

But the famine continues. The family cannot survive without returning.

Judah steps forward and offers himself as a pledge for Benjamin. This is already different from Genesis 37. The brother who once helped sell Joseph is now taking responsibility for another son of Rachel.

When the brothers arrive, Joseph sees Benjamin.

And he nearly breaks.

Genesis says Joseph hurried out because his compassion grew warm for his brother. He goes into a private room and weeps. Then he washes his face and returns.

That is such a human moment.

Joseph is powerful, but he is not numb. He is wise, but he still feels. He is testing the brothers, but he is not enjoying their fear. He is carrying grief, love, memory, and restraint all at once.

At the meal, the brothers are seated by birth order, and Benjamin receives a larger portion. Joseph watches. He observes how they respond to favor resting on the younger brother again.

Will jealousy rise? Will resentment return? Or have they changed?

Genesis 43 teaches that trust is not rebuilt by words alone. It takes observation. It takes time. It takes repeated moments where the old pattern could return but does not.

Joseph's tears show tenderness. His restraint shows wisdom.

Forgiveness does not always mean instant closeness. Sometimes love waits for truth to become visible.

God is slowly bringing the family toward reconciliation, one tested moment at a time.`,
  },
  {
    day_number: 13,
    day_title: "Judah Stands in the Gap",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 44,
    reflection_question: "Where do you see real repentance in Judah's actions, not just his words?",
    devotional_text: `Genesis 44 is the turning point for Judah.

Joseph arranges one final test. His silver cup is placed in Benjamin's sack. The brothers are stopped, searched, and brought back. Benjamin appears guilty. Joseph says Benjamin will remain as a servant and the rest can go home.

This is the moment.

Years earlier, the brothers abandoned Joseph. They chose themselves. They let Jacob suffer. They returned home without Rachel's son.

Now they can do it again.

They can leave Benjamin and save themselves.

But Judah steps forward.

He tells the story. He speaks of Jacob's grief. He explains the bond between the father and the boy. He owns responsibility. And then he offers himself in Benjamin's place.

"Please let your servant remain instead of the boy."

That sentence shows transformation.

Judah is no longer the man who sold a brother for profit. He is willing to sacrifice himself to save a brother. That is not just regret. That is repentance with action.

Joseph needed to see this. Not because he wanted to torture them, but because reconciliation requires truth. The family cannot be restored if the brothers are still the same.

Genesis 44 shows that God can change people over time. Judah's guilt, loss, exposure, and responsibility have shaped him. He now stands in the gap.

This matters beyond Joseph. Judah's line will one day lead to David, and eventually to Jesus, the One who truly stands in the place of the guilty.

Judah's offer points forward.

Real love does not abandon. Real repentance does not just feel sorry. It steps forward and bears cost.`,
  },
  {
    day_number: 14,
    day_title: "I Am Joseph",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 45,
    reflection_question: "How does Joseph's view of God's providence make forgiveness possible?",
    devotional_text: `Genesis 45 is the moment Joseph can no longer hold back.

He sends everyone out. Then he weeps so loudly that the Egyptians hear him. The hidden brother becomes known.

"I am Joseph."

Those words must have terrified his brothers. The one they betrayed is alive. The one they sold has power. The one they wounded can now decide their future.

But Joseph does not begin with revenge.

He says, "Do not be distressed or angry with yourselves because you sold me here, for God sent me before you to preserve life."

Joseph does not deny what they did. He says, "You sold me." That is honest. Forgiveness is not pretending evil was harmless.

But Joseph also sees something bigger. "God sent me."

That is providence.

Human evil was real, but it was not ultimate. The brothers acted sinfully. God acted sovereignly. What they meant for harm, God was already weaving into preservation.

This belief frees Joseph from revenge.

If Joseph believed his brothers had the final word over his life, bitterness would own him. But he sees God's hand above their sin. That does not erase the pain. It gives the pain a different frame.

Joseph embraces his brothers. He sends for Jacob. He provides a place for the family. The wound begins to become a testimony.

Genesis 45 shows the heart of the Joseph story. God was working when Joseph could not see it. God was preserving life through the very path that looked like destruction.

Forgiveness becomes possible when you trust that God is greater than what people did to you.

The pit did not win.

God did.`,
  },
  {
    day_number: 15,
    day_title: "Jacob Goes Down to Egypt",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 46,
    reflection_question: "What does Jacob's move to Egypt teach you about trusting God when restoration does not look like returning to the old life?",
    devotional_text: `Genesis 46 is a chapter of movement and reunion.

Jacob hears that Joseph is alive. The son he mourned for years is not dead. The story he thought was over is still moving.

But going to Egypt is not a small thing.

The land of promise is Canaan. Egypt is foreign. Jacob is old. The family is vulnerable. So God speaks to him in the night.

"Do not be afraid to go down to Egypt, for there I will make you into a great nation."

That promise matters. Egypt is not an accident. It is part of God's plan. The move that looks like leaving the promise will actually become the place where the family grows into a nation.

Then Joseph prepares his chariot and goes to meet Jacob.

Genesis says Joseph falls on his father's neck and weeps on his neck a good while. Years of grief collapse into embrace. What Jacob thought was buried is standing in front of him.

But restoration does not mean everything goes back to the way it was.

Joseph is not the same boy. Jacob is not the same father. The brothers are not the same men. The family is not returning to the old life in Canaan. They are entering a new chapter in Egypt.

That is often how God restores.

He does not always rewind the story. He redeems it forward.

Genesis 46 teaches that God can bring joy out of grief, but the joy may come in a form you did not expect. Jacob wanted his son back. God gave him that, and also moved the covenant family into the next stage of His plan.

Restoration is not nostalgia.

It is God's faithfulness carrying the story forward.`,
  },
  {
    day_number: 16,
    day_title: "God Meant It for Good",
    bible_reading_book: "Genesis",
    bible_reading_chapter: 50,
    reflection_question: "Where do you need to trust that human evil is real, but not ultimate?",
    devotional_text: `Genesis 50 brings Joseph's story to its theological center.

Jacob dies. The brothers become afraid. They wonder if Joseph's kindness was only because their father was alive. They fear revenge.

So they send a message and fall before Joseph.

Joseph weeps.

Then he says the sentence that explains the whole journey: "You meant evil against me, but God meant it for good, to bring it about that many people should be kept alive."

Joseph does not minimize sin. He does not call evil good. He names it clearly: "You meant evil."

But he also names the greater reality: "God meant it for good."

That is not shallow optimism. That is hard-earned faith. Joseph can look back over the coat, the pit, slavery, false accusation, prison, waiting, promotion, famine, and reunion, and see God's hand threading through it all.

The brothers were responsible for what they did. God was sovereign over what He redeemed.

This is why Joseph can comfort them. He is not standing above them as a bitter victim. He is standing before them as a man who has seen God's providence.

The chapter ends with Joseph still believing God's promise. He tells his family that God will surely visit them and bring them out of Egypt. He asks that his bones be carried up when that day comes.

Joseph dies in Egypt, but his faith looks beyond Egypt.

The story is not over.

That is the final lesson of Joseph's testing. God was present when He seemed hidden. God was working when nothing seemed to move. God was faithful when people were not.

The pit was not the end. The prison was not the end. Egypt was not the end.

God was writing a bigger story.`,
  },
];

async function restructureTestingOfJoseph() {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Testing of Joseph")
    .maybeSingle();

  if (devotionalError) throw devotionalError;
  if (!devotional) throw new Error("Could not find devotional titled The Testing of Joseph.");

  const devotionalId = devotional.id as string;

  const { error: updateDevotionalError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 16 Day Chapter Journey",
      description:
        "A chapter-based journey through Joseph's family story, testing, wisdom, forgiveness, and God's providence.",
      total_days: josephDays.length,
    })
    .eq("id", devotionalId);

  if (updateDevotionalError) throw updateDevotionalError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", josephDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of josephDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Joseph day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log(`The Testing of Joseph is now a ${josephDays.length}-day chapter journey.`);
}

restructureTestingOfJoseph().catch((error) => {
  console.error(error);
  process.exit(1);
});
