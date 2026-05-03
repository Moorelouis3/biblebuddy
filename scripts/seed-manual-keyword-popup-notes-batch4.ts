import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Authority of law",
    notes: `Authority of law means the law is not just advice, it carries real power. In the Bible, God's law had authority because it came from Him, not from people. It defined what was right and wrong. It created order and structure in how people lived. Without authority, laws mean nothing. Authority of law means you are accountable to something higher than your own opinion.`,
  },
  {
    term: "Blessing and curse",
    notes: `Blessing and curse show the outcome of choices. In the Bible, obedience led to blessing, and disobedience led to consequences. This was clearly laid out, not random. Blessing brought life, provision, and stability. Curse brought struggle and disorder. It shows that direction matters, and every choice leads somewhere.`,
  },
  {
    term: "Borrower",
    notes: `A borrower is someone who takes something with the intent to return it. In the Bible, borrowing created responsibility and obligation. It was not meant to trap people. Being a borrower meant you were accountable to someone else. It required honesty and integrity. It shows that even small actions carry weight in relationships.`,
  },
  {
    term: "Brotherhood",
    notes: `Brotherhood is the connection between people who share a bond. In the Bible, it often refers to family or the community of believers. It is built on loyalty, support, and shared identity. Brotherhood means you are not alone. What affects one person affects the group. It requires unity and accountability. True brotherhood reflects how God wants people to live together.`,
  },
  {
    term: "Captive woman",
    notes: `A captive woman was someone taken during war. In the Bible, laws were given to protect her dignity and prevent abuse. She was not to be treated as property. There were boundaries placed even in difficult situations. It showed restraint and structure. This reflects that justice still mattered, even in times of conflict.`,
  },
  {
    term: "Ceremonial law",
    notes: `Ceremonial law refers to rules about worship and ritual. In the Bible, these laws guided how people approached God. They showed that God is holy. Every detail had meaning and purpose. It was not random tradition. These laws taught reverence and pointed to deeper spiritual truth.`,
  },
  {
    term: "Compensation",
    notes: `Compensation is making things right after harm is done. In the Bible, it involved restoring what was lost or damaged. It was not just punishment. It showed fairness and responsibility. People were accountable for their actions. Compensation helped repair relationships and restore balance.`,
  },
  {
    term: "Compassionate",
    notes: `Being compassionate means caring deeply about others. In the Bible, compassion reflects God's character. It leads to action, not just feeling. It responds to pain instead of ignoring it. It shows mercy and understanding. Compassion builds connection and reflects true love.`,
  },
  {
    term: "Covenant loyalty",
    notes: `Covenant loyalty is staying faithful to a promise. In the Bible, it describes commitment between God and His people. It is not based on feelings. Even when things are difficult, loyalty remains. God shows this consistently. It is about trust, commitment, and long term faithfulness.`,
  },
  {
    term: "Debt release",
    notes: `Debt release was a system where debts were forgiven. In the Bible, this prevented people from being trapped forever. It gave them a fresh start. It showed mercy and fairness in society. It protected the vulnerable. It reminds people that everything ultimately belongs to God.`,
  },
  {
    term: "Declaration",
    notes: `A declaration is a clear and public statement. In the Bible, it is used to speak truth or make something known. It is not hidden or uncertain. Declaring something brings clarity and direction. Words carry weight. It is about speaking truth boldly and clearly.`,
  },
  {
    term: "Devour",
    notes: `To devour means to consume completely. In the Bible, it often describes destruction or judgment. It leaves nothing behind. It shows overwhelming force or impact. It is total, not partial. Devouring represents complete loss or defeat.`,
  },
  {
    term: "Divine law",
    notes: `Divine law is law given by God. It reflects His character and standards. It is not based on human opinion. These laws guided how people were to live. They defined right and wrong. Divine law carries authority because of its source.`,
  },
  {
    term: "Dowry",
    notes: `A dowry was a gift connected to marriage. In the Bible, it showed commitment and responsibility. Marriage was treated seriously. It was part of establishing the relationship. It created security and structure. It showed that marriage was intentional, not casual.`,
  },
  {
    term: "False witness",
    notes: `False witness is lying about someone. In the Bible, this was strongly condemned because it could destroy lives. Truth mattered in judgment. False testimony broke trust and justice. It caused harm. Integrity in speech was essential for a stable community.`,
  },
  {
    term: "Flee",
    notes: `To flee means to run away quickly from danger. In the Bible, people were told to flee from sin or harmful situations. It shows urgency. Not everything should be faced directly. Sometimes leaving is the right choice. Fleeing can be wisdom, not weakness.`,
  },
  {
    term: "Foreign god",
    notes: `A foreign god is any god outside of the true God. In the Bible, worshiping foreign gods was unfaithfulness. It broke the covenant. It showed misplaced trust in created things. Loyalty to God was meant to be exclusive.`,
  },
  {
    term: "Foreign nation",
    notes: `A foreign nation is a people group outside Israel. In the Bible, they had different beliefs and practices. They could influence God's people. Sometimes they were enemies, sometimes part of God's plan. They were still under God's authority.`,
  },
  {
    term: "Foreign wife",
    notes: `A foreign wife was someone from another nation. In the Bible, this often led to spiritual influence and compromise. Marriage affected faith, not just relationships. It shows that close relationships shape direction and belief.`,
  },
  {
    term: "Free",
    notes: `To be free means not being in bondage. In the Bible, freedom is both physical and spiritual. God frees people from oppression and sin. Freedom is not just doing anything you want. It is living the way you were created to live.`,
  },
  {
    term: "Generosity",
    notes: `Generosity is giving willingly. In the Bible, it reflects trust in God's provision. It is not forced. It helps others and strengthens community. Generosity shifts focus away from self.`,
  },
  {
    term: "Substitute",
    notes: `A substitute is something that takes the place of another. In the Bible, sacrifices often acted as substitutes. Something else took the consequence. This pointed to a deeper spiritual reality. It showed that cost still had to be paid. Substitution reflects both justice and mercy.`,
  },
  {
    term: "Thankfulness",
    notes: `Thankfulness is recognizing what has been given. In the Bible, it reflects awareness of God's provision. It shifts focus from lack to gratitude. Thankfulness builds contentment. It changes how you see everything.`,
  },
  {
    term: "Tithe year",
    notes: `The tithe year was a set time for giving a portion of resources. In the Bible, it supported those in need and those serving God. It created a system of provision and balance. It showed trust that God would continue to provide.`,
  },
  {
    term: "Tradition",
    notes: `Tradition is something passed down over time. In the Bible, traditions could guide or mislead depending on how they were used. Not all traditions were equal to God's truth. They had to be tested and understood.`,
  },
  {
    term: "Treasure people",
    notes: `Treasure people refers to those valued highly by God. In the Bible, Israel was called God's treasured possession. It shows relationship and value, not superiority. It reflects God's choice and care.`,
  },
  {
    term: "Trustworthy",
    notes: `Trustworthy means reliable and consistent. In the Bible, trustworthiness reflects integrity. People could depend on you. It builds strong relationships. Consistency proves character over time.`,
  },
  {
    term: "Unjust",
    notes: `Unjust means unfair or not right. In the Bible, injustice was strongly opposed. It harmed others and broke order. God cares about fairness. Unjust actions bring consequences.`,
  },
  {
    term: "Voluntary",
    notes: `Voluntary means done by choice. In the Bible, some offerings and actions were voluntary. They were not forced. This showed genuine intention. True devotion comes from willingness.`,
  },
  {
    term: "Waiting",
    notes: `Waiting is remaining patient over time. In the Bible, waiting often meant trusting God's timing. It required faith. It was not passive, but expectant. Waiting builds endurance and trust.`,
  },
  {
    term: "Widow care",
    notes: `Widow care refers to supporting those who lost their husbands. In the Bible, widows were vulnerable and needed protection. People were commanded to care for them. It reflects compassion and responsibility.`,
  },
  {
    term: "Year of release",
    notes: `The year of release was when debts were canceled. In the Bible, this prevented long term oppression. It gave people a fresh start. It showed mercy and reset systems.`,
  },
];

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const item of KEYWORD_NOTES) {
    const normalized = item.term.toLowerCase().trim().replace(/\s+/g, " ");
    const notesText = extractCompactPopupMeaning("keywords", item.notes);

    const { error } = await supabase
      .from("keywords_in_the_bible")
      .upsert(
        {
          keyword: normalized,
          notes_text: notesText,
        },
        { onConflict: "keyword" }
      );

    if (error) {
      throw new Error(`Failed for ${item.term}: ${error.message}`);
    }
  }

  console.log(`Seeded ${KEYWORD_NOTES.length} manual keyword popup notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
