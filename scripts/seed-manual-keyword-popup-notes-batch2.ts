import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const KEYWORD_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Burn offering",
    notes: `A burn offering was a sacrifice completely given to God. Nothing was kept back, everything was burned on the altar. It represented full surrender, not partial commitment. The person offering it was showing that everything belonged to God. It was not just about the act, it was about the heart behind it. Giving something fully showed trust and devotion. It pointed to total dedication. It was a way of saying, "I'm all in."`,
  },
  {
    term: "Care",
    notes: `Care is showing concern for someone's well being. It is not just feeling something, it is acting on it. In the Bible, care is a reflection of God's heart. People were called to care for the weak, the poor, and the vulnerable. It shows love in a practical way. Care requires attention and effort. It is not passive. It reveals what actually matters to you.`,
  },
  {
    term: "Censure",
    notes: `Censure is strong correction or disapproval. It is calling out something that is wrong. In the Bible, this was done to guide people back to the right path. It was not meant to destroy someone, but to correct them. Ignoring wrong leads to bigger problems. Accountability is necessary for growth. Censure brings awareness. It is meant to lead to change.`,
  },
  {
    term: "Circumcise",
    notes: `Circumcision was a physical sign of belonging to God's covenant. It marked identity and commitment. It was not just a ritual, it represented something deeper. Later in the Bible, it shifts to the idea of the heart. Circumcision of the heart means inner change, not just outward action. God cares about what is inside, not just what is visible. It is about transformation. True belonging goes deeper than appearance.`,
  },
  {
    term: "Confess",
    notes: `To confess is to openly admit wrongdoing. It requires honesty and humility. In the Bible, confession leads to forgiveness. You cannot fix what you refuse to admit. It breaks denial and pride. Confession brings things into the light. It is the first step toward change. It opens the door for restoration.`,
  },
  {
    term: "Declare",
    notes: `To declare is to speak something clearly and openly. It is not hidden or uncertain. In the Bible, people declare truth, judgment, or praise. Words carry weight when they are spoken with clarity. Declaring something makes it known. It brings direction and understanding. It is about being bold with truth. What you declare shapes what people hear.`,
  },
  {
    term: "Elders",
    notes: `Elders were leaders within the community. They were known for wisdom and experience. People looked to them for guidance and decisions. It was not just about age, but maturity. Elders helped maintain order. They represented stability in the community. Leadership was shared, not isolated. Their role carried responsibility.`,
  },
  {
    term: "Gates",
    notes: `Gates were more than entrances to a city. They were places where decisions were made. Leaders would gather there to judge and discuss matters. It was a center of authority. What happened at the gate affected everyone. It represented control and access. It was where business and justice met. The gate was a place of influence.`,
  },
  {
    term: "Goodness",
    notes: `Goodness is doing what is right consistently. It reflects God's character. It is not just being nice, it is being righteous. Goodness shows up in actions, not just words. It is visible and real. It impacts how people treat others. Goodness builds trust. It is a steady reflection of God's nature.`,
  },
  {
    term: "Graven image",
    notes: `A graven image is an idol made by human hands. It represents false worship. In the Bible, this was strictly forbidden. People were not to replace God with something created. It shows how easily people turn to what they can see. God cannot be reduced to an object. Worship is meant to be directed to Him alone. Idolatry leads people away from truth.`,
  },
  {
    term: "Hear",
    notes: `To hear in the Bible means more than listening. It means understanding and responding. Hearing requires action. It is not passive. When God speaks, hearing means obeying. It connects knowledge with behavior. If there is no action, there was no true hearing. It is about response.`,
  },
  {
    term: "Heed",
    notes: `To heed means to take something seriously and act on it. It is paying attention with intention. In the Bible, people were told to heed God's instructions. Ignoring them led to consequences. Heeding shows wisdom. It is listening and applying. It is about awareness and response.`,
  },
  {
    term: "Lend",
    notes: `To lend is to give something with the expectation it will be returned. In the Bible, this was meant to be done fairly. It was not supposed to be used to take advantage of others. Lending was about helping, not controlling. It required honesty and integrity. It showed trust between people. It was part of community support.`,
  },
  {
    term: "Listen",
    notes: `Listening is active attention. It is choosing to focus and receive. In the Bible, listening to God is essential. It shapes direction and decisions. It is not just hearing sound. It is receiving truth. Listening requires humility. It shows willingness to learn.`,
  },
  {
    term: "Long life",
    notes: `Long life is often seen as a blessing. It is connected to obedience and wisdom. It does not just mean living many years. It means living with purpose and stability. It reflects God's favor. A long life is meant to be meaningful. It shows alignment with God's way. It is about quality, not just time.`,
  },
  {
    term: "Might",
    notes: `Might refers to strength or power. It can be physical or spiritual. In the Bible, true might comes from God. Human strength has limits. God's power does not. It reminds people where real strength comes from. Relying on God brings stability. Might is not just force, it is capacity.`,
  },
  {
    term: "Overtake",
    notes: `To overtake means to catch up and surpass. In the Bible, blessings or consequences can overtake people. It shows that actions have outcomes. What you pursue eventually reaches you. Nothing stays neutral forever. Movement leads somewhere. Overtaking shows the result of direction. It is cause and effect.`,
  },
  {
    term: "Priest",
    notes: `A priest served between God and the people. They handled sacrifices and rituals. Their role was structured and serious. Not everyone could take on that role. They represented the people before God. It showed the need for mediation. Access to God had a process. It was about responsibility.`,
  },
  {
    term: "Punish",
    notes: `To punish is to bring consequences for wrongdoing. In the Bible, punishment is tied to justice. It is not random or emotional. It reflects order. Actions have results. Punishment shows that behavior matters. It is meant to correct and warn. It reinforces accountability.`,
  },
  {
    term: "Repay",
    notes: `To repay is to give back what is owed. It can be positive or negative. In the Bible, repayment reflects justice. What you do comes back to you. It shows balance and fairness. Nothing is ignored. Repayment closes the cycle. It is about completion.`,
  },
  {
    term: "Return",
    notes: `To return means to come back. In the Bible, it often refers to turning back to God. It is about repentance and restoration. No matter how far someone goes, return is possible. God leaves that door open. It requires a decision. Returning changes direction. It brings people back into alignment.`,
  },
  {
    term: "Rule",
    notes: `To rule is to lead with authority. It involves responsibility and accountability. In the Bible, rulers were under God's authority. Leadership was not about control. It was about stewardship. How someone ruled affected others. Authority carried weight. It was meant to be used wisely.`,
  },
  {
    term: "Teach",
    notes: `To teach is to pass on truth and understanding. It shapes how people think and live. In the Bible, teaching was central. Knowledge was meant to be shared. Teaching builds foundation. It influences generations. It requires clarity and accuracy. What is taught matters.`,
  },
  {
    term: "Teacher",
    notes: `A teacher is someone who explains and guides others in truth. In the Bible, teachers had influence. People followed what they said. Teaching required responsibility. It was not just information, it was direction. A teacher shapes understanding. Integrity was essential.`,
  },
  {
    term: "Turn",
    notes: `To turn means to change direction. Spiritually, it means repentance. It is not just feeling bad. It is choosing a different path. Turning shows intention. It leads to transformation. It requires action. It is a shift in direction.`,
  },
  {
    term: "Uncircumcised",
    notes: `This term often referred to those outside of God's covenant. It marked separation. It was not just physical, it was identity. Later, it pointed to the condition of the heart. Being uncircumcised meant not being aligned with God. It showed distance. It was about belonging.`,
  },
  {
    term: "Allegiance",
    notes: `Allegiance is loyalty and commitment. It is choosing who or what you follow. In the Bible, allegiance belongs to God. Divided loyalty leads to conflict. Where your allegiance is shows your priorities. It shapes your decisions. It defines your direction. You cannot serve two masters.`,
  },
  {
    term: "Commanding",
    notes: `Commanding is speaking or acting with clear authority. It is not guessing, it is directing with confidence. In the Bible, when God commands something, it is final and purposeful. There is no confusion in His voice. Leaders were also expected to command with clarity, not hesitation. It shows responsibility, not just power. Authority is meant to guide people in the right direction. When done right, it brings order, not control.`,
  },
  {
    term: "Community guilt",
    notes: `Community guilt is when one person's actions affect everyone else. In the Bible, people were not seen as completely separate individuals. What one person did could bring consequences on the whole group. This forced accountability at a deeper level. It made people pay attention to each other, not just themselves. Sin was never just personal, it had impact. This shows how connected people really are. It pushes responsibility beyond your own life.`,
  },
  {
    term: "Complaint against leadership",
    notes: `This is when people speak against those placed in authority. In the Bible, this often came from frustration, fear, or impatience. But many times, the complaint was really against God, not just the leader. It revealed a lack of trust. People focused on what they did not like instead of what God was doing. Complaining created division and instability. It showed more about the heart than the situation. Trust was always the real issue.`,
  },
  {
    term: "Courage",
    notes: `Courage is moving forward even when fear is present. It is not about feeling strong, it is about choosing to act anyway. In the Bible, courage is tied directly to trusting God. People were told to be strong because God was with them. It is not self confidence, it is God confidence. Courage shows up when things are uncertain. It is obedience under pressure. It is choosing faith over fear.`,
  },
  {
    term: "Covenant mercy",
    notes: `Covenant mercy is God staying faithful even when people fail. It is not random kindness, it is rooted in His promises. Even when the people broke the covenant, God still showed mercy. He did not ignore sin, but He did not abandon them either. This shows His character clearly. Mercy is part of the relationship, not separate from it. God keeps His word, even when people do not. It is consistent and intentional.`,
  },
  {
    term: "Covering",
    notes: `Covering is protection or being shielded. In the Bible, it can be physical or spiritual. God covering someone means He is guarding them from harm. It can also refer to sin being covered through atonement. That does not mean ignoring it, it means dealing with it properly. Covering shows care and provision. It means you are not exposed or left vulnerable. God does not leave His people uncovered.`,
  },
  {
    term: "Cut off",
    notes: `To be cut off means to be removed or separated completely. In the Bible, this could mean being removed from the community or even death. It was a serious consequence, not something small. It showed that certain actions broke the relationship deeply. Being cut off meant losing access and identity. It was meant to be a warning. Not everything could just be brushed off. Some things carried real weight.`,
  },
  {
    term: "Day of rest",
    notes: `The day of rest is set apart for stopping work and focusing on God. It is not just about relaxing physically. It is about trusting God to provide even when you stop working. It resets your focus and priorities. It reminds you that everything does not depend on you. Rest is an act of obedience. It shows faith in God's provision. It brings balance back to life.`,
  },
  {
    term: "Death sentence",
    notes: `A death sentence is the judgment that someone must die for their actions. In the Bible, certain sins carried this level of consequence. It shows how serious sin really is. Life was not treated lightly. Justice had real weight. At the same time, it highlights the need for mercy. Not everyone received what they deserved. It points to the bigger picture of redemption.`,
  },
  {
    term: "Dedication",
    notes: `Dedication is setting something apart for God's purpose. It could be a person, place, or object. Once something is dedicated, it is no longer ordinary. It belongs to God. This shows commitment and intention. It is not casual. Dedication requires focus and consistency. It is about giving something fully, not partially.`,
  },
  {
    term: "Desecrate",
    notes: `To desecrate means to treat something holy like it is common. It is showing disrespect toward what God has set apart. In the Bible, this was taken seriously. It revealed a lack of reverence. Not everything is meant to be handled the same way. Holiness requires respect and awareness. Desecration breaks that boundary. It shows a heart that does not value what God values.`,
  },
  {
    term: "Despair",
    notes: `Despair is a deep feeling of hopelessness. It is when someone feels like there is no way forward. In the Bible, people experienced despair, but they were not meant to stay there. It often came when focus shifted away from God. Despair is real, but it is not final. God meets people even in that place. It is a low point, not the end. Hope is still possible.`,
  },
  {
    term: "Discontent",
    notes: `Discontent is constantly feeling unsatisfied. It is always thinking something is missing. In the Bible, this often led to complaining and rebellion. It shows a lack of gratitude. Discontent shifts focus away from what God has already done. It creates frustration and instability. It can lead people away from trust. Contentment, on the other hand, brings peace.`,
  },
  {
    term: "Dissension",
    notes: `Dissension is conflict within a group. It creates division and weakens unity. In the Bible, this often came from pride or disagreement. It broke relationships and trust. Unity was important for strength. Dissension worked against that. It showed how internal problems can destroy a group. It is not just about being right, it is about staying together.`,
  },
  {
    term: "Divine presence",
    notes: `Divine presence is God being near and active. It is not just an idea, it is real. In the Bible, people experienced it through visible signs like fire or a cloud. It brought guidance, comfort, and sometimes fear. Being in God's presence changes how people act. It reminds them who He is. It is the center of relationship with God. Everything flows from His presence.`,
  },
  {
    term: "Divine wrath",
    notes: `Divine wrath is God's response to sin and injustice. It is not uncontrolled anger. It is righteous and measured. God does not ignore evil. His wrath shows that He cares about what is right. It protects what is good. It also calls people to change. It is part of His justice.`,
  },
  {
    term: "Doubt",
    notes: `Doubt is questioning what is true. It often shows up in difficult situations. In the Bible, people struggled with doubt when things did not make sense. It is not always rebellion, but it can lead there. Doubt reveals where trust is weak. It needs to be addressed, not ignored. Faith grows when doubt is worked through. It is part of the process.`,
  },
  {
    term: "Earth opening",
    notes: `This is a direct act of judgment where the ground opens and swallows people. It happened suddenly and clearly. It was not symbolic, it was real. It showed that God's judgment can be immediate. There was no confusion about what happened. It served as a warning to others. Some moments are meant to wake everyone up. It showed God's authority over everything.`,
  },
  {
    term: "Faithlessness",
    notes: `Faithlessness is choosing not to trust God. It is more than doubt, it is rejection. In the Bible, it kept people from receiving what was promised. It blocked progress and growth. It showed where people's hearts really were. Faithlessness leads to distance from God. It is not about ability, it is about trust. Without faith, nothing moves forward.`,
  },
  {
    term: "Backslide",
    notes: `To backslide is to return to old habits after moving forward. It is losing ground spiritually. In the Bible, people often turned back after making progress. It showed inconsistency and weakness. Growth is not always steady, but going backward is a warning. Backsliding shows a lack of discipline. It does not mean the end, but it is a problem. It needs to be corrected.`,
  },
  {
    term: "Blot out",
    notes: `To blot out means to completely remove or erase something. In the Bible, it can refer to sins being forgiven or names being removed. It shows finality. Something is either remembered or gone. When God blots out sin, it is mercy. When He blots out a name, it is judgment. It is about permanence. Nothing is partial.`,
  },
  {
    term: "Borrow",
    notes: `To borrow is to take something with the intention of returning it. In the Bible, this was part of everyday life. It required trust between people. Borrowing was not meant to be abused. It was supposed to help, not harm. Honesty was important. It showed responsibility and integrity.`,
  },
  {
    term: "Break covenant",
    notes: `To break covenant is to violate a serious agreement with God. It is not just breaking a rule. It is breaking a relationship. Covenants were binding and meaningful. Breaking them brought consequences. It showed unfaithfulness. This is why loyalty mattered so much. Covenant was about commitment.`,
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
