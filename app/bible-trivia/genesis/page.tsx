"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { logActionToMasterActions } from "@/lib/actionRecorder";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

// Helper function to fetch verse text from Bible API
async function fetchVerseText(reference: string): Promise<string> {
  try {
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error('Failed to fetch verse');
    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error fetching verse:', error);
    return '';
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "genesis01", question: "What did God create on the first day?", options: [{ label: "A", text: "The heavens and the earth" }, { label: "B", text: "Light" }, { label: "C", text: "The sun and moon" }, { label: "D", text: "Man" }], correctAnswer: "B", verse: "Genesis 1:3", explanation: "Light is the first thing God speaks into existence. This happens before the sun moon and stars are created later. It shows that God Himself is the source of light and order. Creation begins with God bringing clarity out of darkness." },
  { id: "genesis02", question: "On which day did God create humanity?", options: [{ label: "A", text: "Day four" }, { label: "B", text: "Day five" }, { label: "C", text: "Day six" }, { label: "D", text: "Day seven" }], correctAnswer: "C", verse: "Genesis 1:27", explanation: "Humanity is created on the sixth day after everything else is prepared. Being made in God's image gives humans unique value and responsibility. This verse emphasizes identity purpose and relationship. Humans are not accidental but intentional." },
  { id: "genesis03", question: "What was unique about how humans were created?", options: [{ label: "A", text: "They were created first" }, { label: "B", text: "They were created from light" }, { label: "C", text: "They were made in the image of God" }, { label: "D", text: "They were made immortal" }], correctAnswer: "C", verse: "Genesis 1:26", explanation: "No other part of creation is described this way. Being made in God's image points to moral responsibility creativity and relationship. This truth forms the foundation for human dignity. It shapes how Scripture views humanity." },
  { id: "genesis04", question: "What tree were Adam and Eve forbidden to eat from?", options: [{ label: "A", text: "The tree of life" }, { label: "B", text: "The tree of wisdom" }, { label: "C", text: "The tree of the knowledge of good and evil" }, { label: "D", text: "The tree of blessing" }], correctAnswer: "C", verse: "Genesis 2:17", explanation: "God gave Adam and Eve freedom with one boundary. The command tested trust and obedience not deprivation. Disobedience brought death and separation. The issue was authority not fruit." },
  { id: "genesis05", question: "Who tempted Eve in the garden?", options: [{ label: "A", text: "Adam" }, { label: "B", text: "An angel" }, { label: "C", text: "A serpent" }, { label: "D", text: "A demon" }], correctAnswer: "C", verse: "Genesis 3:1", explanation: "The serpent approaches by questioning God's word. Temptation begins with doubt rather than open rebellion. Scripture later connects the serpent to Satan. Genesis focuses on deception and choice." },
  { id: "genesis06", question: "What was the first sin committed by Adam and Eve?", options: [{ label: "A", text: "Murder" }, { label: "B", text: "Disobedience" }, { label: "C", text: "Lying" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Genesis 3:6", explanation: "The first sin was disobedience to God's command. Adam and Eve chose their own judgment over God's word. This act brought sin into human experience. Everything broken afterward flows from this moment." },
  { id: "genesis07", question: "Who was the first person born according to Genesis?", options: [{ label: "A", text: "Abel" }, { label: "B", text: "Cain" }, { label: "C", text: "Seth" }, { label: "D", text: "Noah" }], correctAnswer: "B", verse: "Genesis 4:1", explanation: "Cain is the first human born after creation. His story quickly reveals how sin spreads through relationships. Genesis does not hide human failure. Being first does not mean faithful." },
  { id: "genesis08", question: "Why was Abel's offering accepted and Cain's rejected?", options: [{ label: "A", text: "Abel offered more" }, { label: "B", text: "Cain offered too late" }, { label: "C", text: "Abel's heart was right before God" }, { label: "D", text: "Cain broke a ritual law" }], correctAnswer: "C", verse: "Genesis 4:4-5", explanation: "God looks at the heart not just the offering. Abel's offering was given in faith. Cain's anger reveals his heart posture. Worship is about trust not ritual." },
  { id: "genesis09", question: "What sin did Cain commit after God warned him?", options: [{ label: "A", text: "Theft" }, { label: "B", text: "Adultery" }, { label: "C", text: "Murder" }, { label: "D", text: "Blasphemy" }], correctAnswer: "C", verse: "Genesis 4:8", explanation: "God warned Cain that sin was crouching at the door. Cain ignored the warning and acted in anger. This is the first recorded murder. Sin grows when unchecked." },
  { id: "genesis10", question: "What punishment did Cain receive?", options: [{ label: "A", text: "Immediate death" }, { label: "B", text: "Exile and wandering" }, { label: "C", text: "Loss of all possessions" }, { label: "D", text: "Flood judgment" }], correctAnswer: "B", verse: "Genesis 4:12", explanation: "God did not kill Cain but removed stability from his life. The punishment carried both justice and mercy. Cain was marked for protection. God restrains evil while judging it." },
  { id: "genesis11", question: "Who walked with God and did not experience death?", options: [{ label: "A", text: "Noah" }, { label: "B", text: "Seth" }, { label: "C", text: "Enoch" }, { label: "D", text: "Methuselah" }], correctAnswer: "C", verse: "Genesis 5:24", explanation: "Enoch stands out in a chapter filled with death. Walking with God describes ongoing faithfulness. God took Enoch directly. Faith breaks the pattern of death." },
  { id: "genesis12", question: "How old was Noah when the flood began?", options: [{ label: "A", text: "500" }, { label: "B", text: "600" }, { label: "C", text: "700" }, { label: "D", text: "950" }], correctAnswer: "B", verse: "Genesis 7:6", explanation: "This verse places the flood in a real timeline. Noah obeyed God for many years before judgment came. Faith often requires patience. God's promises are not rushed." },
  { id: "genesis13", question: "How long did it rain during the flood?", options: [{ label: "A", text: "7 days" }, { label: "B", text: "30 days" }, { label: "C", text: "40 days" }, { label: "D", text: "150 days" }], correctAnswer: "C", verse: "Genesis 7:12", explanation: "Forty days represents testing and judgment throughout Scripture. The flood was a complete cleansing of the earth. God was restarting creation. Judgment and mercy work together." },
  { id: "genesis14", question: "What animal did Noah send out first to find dry land?", options: [{ label: "A", text: "Dove" }, { label: "B", text: "Eagle" }, { label: "C", text: "Raven" }, { label: "D", text: "Sparrow" }], correctAnswer: "C", verse: "Genesis 8:7", explanation: "The raven was sent before the dove. Noah carefully observed the changing conditions. Patience guided his decisions. Obedience includes waiting." },
  { id: "genesis15", question: "What sign did God give as a covenant after the flood?", options: [{ label: "A", text: "A flame" }, { label: "B", text: "A rainbow" }, { label: "C", text: "A mountain" }, { label: "D", text: "A star" }], correctAnswer: "B", verse: "Genesis 9:13", explanation: "The rainbow is a visible reminder of God's promise. God commits Himself never to destroy the earth by flood again. This covenant is unconditional. Mercy follows judgment." },
  { id: "genesis16", question: "Who became drunk after planting a vineyard?", options: [{ label: "A", text: "Noah" }, { label: "B", text: "Lot" }, { label: "C", text: "Abraham" }, { label: "D", text: "Isaac" }], correctAnswer: "A", verse: "Genesis 9:21", explanation: "This moment shows Noah's humanity and weakness. Scripture does not hide flaws of faithful people. Righteousness does not mean perfection. God's grace remains." },
  { id: "genesis17", question: "What was the sin behind the Tower of Babel?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Violence" }, { label: "C", text: "Pride and self exaltation" }, { label: "D", text: "False sacrifice" }], correctAnswer: "C", verse: "Genesis 11:4", explanation: "The people sought independence from God. Their goal was self glory not obedience. God confused their language to stop them. Pride leads to division." },
  { id: "genesis18", question: "Where was Abram originally from?", options: [{ label: "A", text: "Canaan" }, { label: "B", text: "Egypt" }, { label: "C", text: "Ur of the Chaldeans" }, { label: "D", text: "Babylon" }], correctAnswer: "C", verse: "Genesis 11:31", explanation: "Abram was called to leave familiarity and security. Faith often begins with leaving what is known. God initiates the journey. Obedience starts with trust." },
  { id: "genesis19", question: "What promise did God make to Abram?", options: [{ label: "A", text: "Wealth only" }, { label: "B", text: "Political power" }, { label: "C", text: "Land descendants and blessing" }, { label: "D", text: "Immediate kingship" }], correctAnswer: "C", verse: "Genesis 12:2", explanation: "God promised land descendants and global blessing. This covenant shapes the entire Bible. Israel and Jesus flow from this promise. God's plan is long term." },
  { id: "genesis20", question: "What was Abram's wife's original name?", options: [{ label: "A", text: "Rebecca" }, { label: "B", text: "Sarai" }, { label: "C", text: "Rachel" }, { label: "D", text: "Leah" }], correctAnswer: "B", verse: "Genesis 11:29", explanation: "God later changes her name to Sarah. Name changes mark new identity and purpose. God redefines people. Promise transforms identity." },
  { id: "genesis21", question: "Why did Abram go to Egypt?", options: [{ label: "A", text: "To conquer land" }, { label: "B", text: "To escape famine" }, { label: "C", text: "To find family" }, { label: "D", text: "To trade livestock" }], correctAnswer: "B", verse: "Genesis 12:10", explanation: "Famine forced Abram into a difficult decision. Pressure reveals fear and faith. Abram struggled but God remained faithful. God's promise did not fail." },
  { id: "genesis22", question: "What lie did Abram tell Pharaoh?", options: [{ label: "A", text: "Sarai was his servant" }, { label: "B", text: "Sarai was his cousin" }, { label: "C", text: "Sarai was his sister" }, { label: "D", text: "Sarai was his widow" }], correctAnswer: "C", verse: "Genesis 12:13", explanation: "Abram feared for his life and lied. God protected Sarai anyway. Human failure does not cancel God's plan. Grace covers weakness." },
  { id: "genesis23", question: "Who chose the fertile land near Sodom?", options: [{ label: "A", text: "Abram" }, { label: "B", text: "Lot" }, { label: "C", text: "Isaac" }, { label: "D", text: "Nahor" }], correctAnswer: "B", verse: "Genesis 13:10", explanation: "Lot chose based on appearance not wisdom. His decision brought later trouble. Sight based choices often carry hidden cost. Wisdom looks beyond surface." },
  { id: "genesis24", question: "Who rescued Lot after he was captured?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "Abram" }, { label: "C", text: "Melchizedek" }, { label: "D", text: "The king of Sodom" }], correctAnswer: "B", verse: "Genesis 14:14", explanation: "Abram acted courageously and sacrificially. Faith produces action. Abram becomes a protector. Righteousness involves responsibility." },
  { id: "genesis25", question: "Who blessed Abram after the battle?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "Melchizedek" }, { label: "C", text: "An angel" }, { label: "D", text: "The king of Sodom" }], correctAnswer: "B", verse: "Genesis 14:19", explanation: "Melchizedek was a priest of God Most High. He blesses Abram and receives a tithe. Hebrews later connects him to Christ. Genesis points forward to Jesus." },
  { id: "genesis26", question: "What did God promise Abram in a vision?", options: [{ label: "A", text: "Immediate wealth" }, { label: "B", text: "A great reward and descendants" }, { label: "C", text: "Military victories" }, { label: "D", text: "Peaceful rest" }], correctAnswer: "B", verse: "Genesis 15:1", explanation: "God came to Abram in a vision to reassure him. The covenant promised descendants numerous as stars. Faith struggles but God offers assurance. Promise sustains hope." },
  { id: "genesis27", question: "Why was Hagar given to Abram?", options: [{ label: "A", text: "To serve in the house" }, { label: "B", text: "Because Sarah was barren" }, { label: "C", text: "To bear children for Sarah" }, { label: "D", text: "As a dowry gift" }], correctAnswer: "C", verse: "Genesis 16:2", explanation: "Sarah's impatience led to a human plan. Taking matters into human hands causes complications. God's timing differs from ours. Trust requires waiting." },
  { id: "genesis28", question: "What was Hagar's son's name?", options: [{ label: "A", text: "Isaac" }, { label: "B", text: "Ishmael" }, { label: "C", text: "Eliezer" }, { label: "D", text: "Kedar" }], correctAnswer: "B", verse: "Genesis 16:11", explanation: "Hagar named her son Ishmael meaning God hears. God saw Hagar's affliction and gave her a son. God's compassion extends to all. Even mistakes bring God's care." },
  { id: "genesis29", question: "At what age was Abram when Ishmael was born?", options: [{ label: "A", text: "75" }, { label: "B", text: "86" }, { label: "C", text: "99" }, { label: "D", text: "100" }], correctAnswer: "B", verse: "Genesis 16:16", explanation: "Abram was still far from being a father to Isaac. The waiting would be long and test his faith further. Human plans cannot rush God's timeline. Patience refines faith." },
  { id: "genesis30", question: "What was the covenant sign God gave Abraham?", options: [{ label: "A", text: "An animal sacrifice" }, { label: "B", text: "Circumcision" }, { label: "C", text: "A stone pillar" }, { label: "D", text: "An altar" }], correctAnswer: "B", verse: "Genesis 17:11", explanation: "Circumcision became the sign of the covenant. It marked Abraham's household as God's people. The sign was physical and permanent. Covenants require commitment." },
  { id: "genesis31", question: "What new name did God give Abram?", options: [{ label: "A", text: "Avram" }, { label: "B", text: "Abraham" }, { label: "C", text: "Abiram" }, { label: "D", text: "Ariram" }], correctAnswer: "B", verse: "Genesis 17:5", explanation: "God changed Abram to Abraham meaning father of many. The name embodied the promise. God renames people for their destiny. Identity flows from covenant." },
  { id: "genesis32", question: "What new name did God give to Sarai?", options: [{ label: "A", text: "Sara" }, { label: "B", text: "Sarah" }, { label: "C", text: "Sari" }, { label: "D", text: "Sarina" }], correctAnswer: "B", verse: "Genesis 17:15", explanation: "Sarai became Sarah meaning princess. The renaming anticipated her role as mother of nations. Name changes reflect transformed purpose. God fulfills His promises." },
  { id: "genesis33", question: "How did Abraham and Sarah respond when told Isaac would be born?", options: [{ label: "A", text: "With immediate joy" }, { label: "B", text: "With laughter of doubt" }, { label: "C", text: "With silence" }, { label: "D", text: "With anger" }], correctAnswer: "B", verse: "Genesis 17:17", explanation: "Abraham laughed at the impossibility. Sarah also laughed in doubt behind the door. Laughter can express disbelief. Yet God's promises transcend human limitations." },
  { id: "genesis34", question: "How many visitors came to Abraham's tent?", options: [{ label: "A", text: "One" }, { label: "B", text: "Two" }, { label: "C", text: "Three" }, { label: "D", text: "Five" }], correctAnswer: "C", verse: "Genesis 18:2", explanation: "Three visitors appeared as the Lord with two angels. Abraham showed hospitality without knowing their identity. Generosity to strangers matters. God sometimes visits incognito." },
  { id: "genesis35", question: "What did the visitors tell Abraham about Sarah?", options: [{ label: "A", text: "She would be healed" }, { label: "B", text: "She would have a son" }, { label: "C", text: "She would live longer" }, { label: "D", text: "She would travel far" }], correctAnswer: "B", verse: "Genesis 18:10", explanation: "The visitors announced Sarah would have a son. Sarah laughed in the tent when she heard. God kept His promise despite human doubt. Nothing is too wonderful for the Lord." },
  { id: "genesis36", question: "What was Abraham's concern for Sodom?", options: [{ label: "A", text: "Its location" }, { label: "B", text: "Its righteous people" }, { label: "C", text: "Whether God would destroy innocent people" }, { label: "D", text: "Its wealth" }], correctAnswer: "C", verse: "Genesis 18:23", explanation: "Abraham interceded for righteous people in the city. He understood God's justice mixed with mercy. Intercession expresses compassion. God values those who stand for others." },
  { id: "genesis37", question: "How many righteous people would have saved Sodom?", options: [{ label: "A", text: "50" }, { label: "B", text: "45" }, { label: "C", text: "10" }, { label: "D", text: "1" }], correctAnswer: "C", verse: "Genesis 18:32", explanation: "Abraham negotiated with God down to 10 righteous people. Even that small number would spare the city. God's mercy works through remnants. Intercession changes outcomes." },
  { id: "genesis38", question: "Who were the two angels who visited Lot?", options: [{ label: "A", text: "Gabriel and Michael" }, { label: "B", text: "Named in Genesis" }, { label: "C", text: "The two visitors from Abraham's tent" }, { label: "D", text: "Unnamed" }], correctAnswer: "C", verse: "Genesis 19:1", explanation: "The same two angels who visited Abraham went to Lot. They came to rescue Lot from destruction. God sends deliverers to the faithful. Mercy reaches even the struggling." },
  { id: "genesis39", question: "Why did Lot's wife look back?", options: [{ label: "A", text: "She forgot something" }, { label: "B", text: "She loved Sodom" }, { label: "C", text: "She disobeyed the command" }, { label: "D", text: "She was curious" }], correctAnswer: "C", verse: "Genesis 19:26", explanation: "Lot's wife turned back despite the command not to. Her longing for Sodom brought judgment. Dwelling on the past hinders forward movement. Obedience requires letting go." },
  { id: "genesis40", question: "What happened to Lot's wife?", options: [{ label: "A", text: "She became a stone" }, { label: "B", text: "She became a pillar of salt" }, { label: "C", text: "She returned to Sodom" }, { label: "D", text: "She was lost in the darkness" }], correctAnswer: "B", verse: "Genesis 19:26", explanation: "She became a pillar of salt as a memorial. Her refusal to obey brought immediate death. Judgment is real and permanent. Obedience is the path to safety." },
  { id: "genesis41", question: "Where did Abraham and Isaac almost get into conflict?", options: [{ label: "A", text: "In Egypt" }, { label: "B", text: "In Beersheba" }, { label: "C", text: "Over the well of water" }, { label: "D", text: "In the wilderness" }], correctAnswer: "C", verse: "Genesis 21:25", explanation: "Abimelech's servants took Abraham's well. Abraham protested the injustice. Resources matter and ownership disputes arise. Conflict resolution requires direct communication." },
  { id: "genesis42", question: "What covenant did Abraham and Abimelech make?", options: [{ label: "A", text: "Friendship" }, { label: "B", text: "Military alliance" }, { label: "C", text: "Peace and possession of wells" }, { label: "D", text: "Business partnership" }], correctAnswer: "C", verse: "Genesis 21:27-32", explanation: "They swore an oath at Beersheba about the wells. Abraham gave rams and ewes as confirmation. Covenants seal agreements. Honesty builds lasting peace." },
  { id: "genesis43", question: "What did Abraham do when Isaac was born?", options: [{ label: "A", text: "Made a great feast" }, { label: "B", text: "Named him Isaac" }, { label: "C", text: "Circumcised him" }, { label: "D", text: "Traveled to Egypt" }], correctAnswer: "A", verse: "Genesis 21:8", explanation: "Abraham made a great feast when Isaac was weaned. Joy marked the occasion. Celebration acknowledges God's faithfulness. Community shares in the blessing." },
  { id: "genesis44", question: "Why did Abraham send away Hagar and Ishmael?", options: [{ label: "A", text: "They disobeyed him" }, { label: "B", text: "Sarah demanded it" }, { label: "C", text: "God commanded it" }, { label: "D", text: "To punish Hagar" }], correctAnswer: "C", verse: "Genesis 21:12", explanation: "God commanded Abraham to listen to Sarah. This ensured the covenant line through Isaac. God's plan is specific and intentional. Obedience sometimes requires difficult choices." },
  { id: "genesis45", question: "What did God promise about Ishmael?", options: [{ label: "A", text: "He would not survive" }, { label: "B", text: "He would become a great nation" }, { label: "C", text: "He would serve Isaac" }, { label: "D", text: "He would be poor forever" }], correctAnswer: "B", verse: "Genesis 21:18", explanation: "God promised Ishmael would become a great nation. God cares for those outside the covenant line. God's mercy is broader than human limitations. Every person matters to God." },
  { id: "genesis46", question: "What test did God give to Abraham?", options: [{ label: "A", text: "To give away all wealth" }, { label: "B", text: "To leave his homeland" }, { label: "C", text: "To sacrifice his son Isaac" }, { label: "D", text: "To live as a nomad" }], correctAnswer: "C", verse: "Genesis 22:2", explanation: "God asked Abraham to offer Isaac in sacrifice. This was the ultimate test of faith and obedience. God tests to strengthen faith. Obedience reveals the depth of trust." },
  { id: "genesis47", question: "How did Abraham respond to God's test command?", options: [{ label: "A", text: "He refused outright" }, { label: "B", text: "He argued with God" }, { label: "C", text: "He rose early and obeyed" }, { label: "D", text: "He delayed for days" }], correctAnswer: "C", verse: "Genesis 22:3", explanation: "Abraham rose early and prepared to obey. No argument or hesitation is recorded. Faith trusts even when confused. Obedience precedes understanding." },
  { id: "genesis48", question: "Where was Abraham supposed to sacrifice Isaac?", options: [{ label: "A", text: "Mount Moriah" }, { label: "B", text: "Mount Horeb" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Sinai" }], correctAnswer: "A", verse: "Genesis 22:2", explanation: "Mount Moriah is where Solomon later built the temple. God provided a substitute sacrifice instead. This foreshadows Christ's redemption. Divine provision replaces human sacrifice." },
  { id: "genesis49", question: "What did Abraham call that place?", options: [{ label: "A", text: "The Mountain of Sacrifice" }, { label: "B", text: "The Lord Will Provide" }, { label: "C", text: "Altar Mountain" }, { label: "D", text: "Faith's Peak" }], correctAnswer: "B", verse: "Genesis 22:14", explanation: "Abraham named it Jehovah Jireh meaning the Lord will provide. The name captures the core truth. God's provision transforms trials. Faith renames despair." },
  { id: "genesis50", question: "Who was Abraham's servant who went to find a wife for Isaac?", options: [{ label: "A", text: "Eliezer" }, { label: "B", text: "Lot" }, { label: "C", text: "Haran" }, { label: "D", text: "Nahor" }], correctAnswer: "A", verse: "Genesis 24:2", explanation: "Eliezer of Damascus was Abraham's trusted servant. He would oversee finding a wife from Abraham's kindred. Trust in leadership is foundational. Delegation requires confidence." },
  { id: "genesis51", question: "What sign did Eliezer ask God for regarding Isaac's bride?", options: [{ label: "A", text: "The girl would be beautiful" }, { label: "B", text: "She would offer water to him and his camels" }, { label: "C", text: "She would speak a certain name" }, { label: "D", text: "She would wear purple" }], correctAnswer: "B", verse: "Genesis 24:14", explanation: "Eliezer asked for a sign of kindness and generosity. The woman who offered water to his camels would be the right bride. Character reveals in small actions. Kindness matters more than appearance." },
  { id: "genesis52", question: "Who offered water to Eliezer and his camels?", options: [{ label: "A", text: "Rachel" }, { label: "B", text: "Rebekah" }, { label: "C", text: "Leah" }, { label: "D", text: "Zilpah" }], correctAnswer: "B", verse: "Genesis 24:20", explanation: "Rebekah not only gave water but also offered to water the camels. She went beyond the request. Her actions demonstrated the character Eliezer sought. Providence works through willing obedience." },
  { id: "genesis53", question: "Who was Rebekah's brother?", options: [{ label: "A", text: "Jacob" }, { label: "B", text: "Laban" }, { label: "C", text: "Isaac" }, { label: "D", text: "Lot" }], correctAnswer: "B", verse: "Genesis 24:29", explanation: "Laban saw the jewelry Eliezer gave Rebekah and welcomed him. Laban would later figure prominently in the story. First impressions reveal character. Family networks matter." },
  { id: "genesis54", question: "What was Isaac doing when Rebekah arrived?", options: [{ label: "A", text: "Working in the fields" }, { label: "B", text: "Meditating in the field" }, { label: "C", text: "Sleeping" }, { label: "D", text: "Praying at an altar" }], correctAnswer: "B", verse: "Genesis 24:63", explanation: "Isaac went out to meditate in the field. This shows his spiritual nature. Meditation precedes meeting his bride. Spiritual foundation strengthens relationships." },
  { id: "genesis55", question: "How did Isaac and Rebekah's marriage begin?", options: [{ label: "A", text: "With grand ceremony" }, { label: "B", text: "Isaac loved her immediately" }, { label: "C", text: "Through arranged contract" }, { label: "D", text: "After long courtship" }], correctAnswer: "B", verse: "Genesis 24:67", explanation: "Isaac loved Rebekah and was comforted after his mother's death. Love grew from the beginning. Divine provision includes emotional healing. God works through relationships." },
  { id: "genesis56", question: "Why was Isaac important to the covenant?", options: [{ label: "A", text: "He was the firstborn" }, { label: "B", text: "He was the child of promise" }, { label: "C", text: "He was born in Egypt" }, { label: "D", text: "He was chosen by the people" }], correctAnswer: "B", verse: "Genesis 21:1-3", explanation: "Isaac was born to Abraham and Sarah in their old age. He embodied God's promise. God fulfilled what seemed impossible. Miracles produce the promised offspring." },
  { id: "genesis57", question: "What was the outcome of Rebekah's pregnancy?", options: [{ label: "A", text: "One strong son" }, { label: "B", text: "Twin sons who struggled" }, { label: "C", text: "A daughter" }, { label: "D", text: "No children" }], correctAnswer: "B", verse: "Genesis 25:24-26", explanation: "Rebekah bore twin sons Esau and Jacob who struggled in the womb. The struggle foreshadowed their conflict. From conception, division appears. Conflict shapes God's plan." },
  { id: "genesis58", question: "Which son was born first?", options: [{ label: "A", text: "Jacob" }, { label: "B", text: "Esau" }, { label: "C", text: "Both together" }, { label: "D", text: "Benjamin" }], correctAnswer: "B", verse: "Genesis 25:25", explanation: "Esau came out first but Jacob grasped his heel. Birth order did not determine God's choice. Providence sometimes reverses expectations. God's selection is sovereign." },
  { id: "genesis59", question: "What did Esau sell to Jacob?", options: [{ label: "A", text: "His field" }, { label: "B", text: "His birthright" }, { label: "C", text: "His blessing" }, { label: "D", text: "His inheritance" }], correctAnswer: "B", verse: "Genesis 25:31-34", explanation: "Esau sold his birthright for bread and stew. His immediate hunger overshadowed inheritance. Short-term satisfaction can cost long-term blessing. Perspective determines choices." },
  { id: "genesis60", question: "Why did Isaac go to Gerar?", options: [{ label: "A", text: "To escape famine" }, { label: "B", text: "To visit family" }, { label: "C", text: "To trade goods" }, { label: "D", text: "To find a wife" }], correctAnswer: "A", verse: "Genesis 26:1", explanation: "Famine drove Isaac from Canaan to Gerar. He followed the pattern his father Abraham had set. God-fearing people sometimes face the same trials. Trials test character consistently." },
  { id: "genesis61", question: "What mistake did Isaac make in Gerar?", options: [{ label: "A", text: "Stole livestock" }, { label: "B", text: "Worshipped false gods" }, { label: "C", text: "Claimed Rebekah was his sister" }, { label: "D", text: "Broke a contract" }], correctAnswer: "C", verse: "Genesis 26:7", explanation: "Isaac repeated his father's lie about Rebekah. Fear rather than faith motivated the deception. The children inherit parents' weakness patterns. Breaking cycles requires spiritual transformation." },
  { id: "genesis62", question: "Who discovered Isaac's lie?", options: [{ label: "A", text: "Servants" }, { label: "B", text: "King Abimelech" }, { label: "C", text: "Rebekah" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Genesis 26:8", explanation: "Abimelech observed Isaac and Rebekah showing affection. He concluded she was Isaac's wife not sister. Obvious truth eventually emerges. Deception cannot remain hidden permanently." },
  { id: "genesis63", question: "What did God promise Isaac?", options: [{ label: "A", text: "The land of Egypt" }, { label: "B", text: "The land and descendants of Abraham" }, { label: "C", text: "Immediate wealth" }, { label: "D", text: "A palace and servants" }], correctAnswer: "B", verse: "Genesis 26:3-4", explanation: "God confirmed the Abrahamic covenant with Isaac. The promise would continue through him. Covenants pass to the next generation. Lineage receives inherited blessing." },
  { id: "genesis64", question: "What was Jacob's response when asked for a blessing?", options: [{ label: "A", text: "He confessed his deception" }, { label: "B", text: "He was silent" }, { label: "C", text: "He claimed the birthright was his" }, { label: "D", text: "He fled immediately" }], correctAnswer: "C", verse: "Genesis 27:35-36", explanation: "Jacob deceived his blind father to get the blessing. Esau protested that Jacob had stolen his birthright. Deception produces lasting consequences. Manipulation damages relationships." },
  { id: "genesis65", question: "What was Isaac's reaction upon discovering the deception?", options: [{ label: "A", text: "He punished Jacob" }, { label: "B", text: "He took back the blessing" }, { label: "C", text: "He trembled but the blessing stood" }, { label: "D", text: "He blessed Esau instead" }], correctAnswer: "C", verse: "Genesis 27:33", explanation: "Isaac trembled because the blessing was irrevocable. Once spoken, it could not be undone. God's purposes worked even through deception. Justice includes consequences but not reversal." },
  { id: "genesis66", question: "Why did Jacob flee from Esau?", options: [{ label: "A", text: "To find a wife" }, { label: "B", text: "To escape Esau's anger" }, { label: "C", text: "To settle the land" }, { label: "D", text: "To trade in the city" }], correctAnswer: "B", verse: "Genesis 27:41-42", explanation: "Esau wanted to kill Jacob for stealing the blessing. Rebekah warned Jacob to flee to Laban. Consequences catch up to the deceiver. Escape becomes necessary." },
  { id: "genesis67", question: "What happened to Jacob at Bethel?", options: [{ label: "A", text: "He met Laban" }, { label: "B", text: "He had a dream of a ladder" }, { label: "C", text: "He found a wife" }, { label: "D", text: "He defeated an enemy" }], correctAnswer: "B", verse: "Genesis 28:12", explanation: "Jacob dreamed of a ladder reaching heaven with angels ascending and descending. God stood above promising the land and protection. Dreams reveal God's presence. Vision sustains the displaced." },
  { id: "genesis68", question: "What vow did Jacob make at Bethel?", options: [{ label: "A", text: "To return home soon" }, { label: "B", text: "To serve God and tithe" }, { label: "C", text: "To build an altar" }, { label: "D", text: "To marry Rachel" }], correctAnswer: "B", verse: "Genesis 28:20-22", explanation: "Jacob promised to worship God and give him a tenth. He made conditional obedience his response to the vision. Faith produces commitments. Vows solidify belief." },
  { id: "genesis69", question: "Who did Jacob meet at the well?", options: [{ label: "A", text: "Isaac" }, { label: "B", text: "Rebekah" }, { label: "C", text: "Rachel" }, { label: "D", text: "Leah" }], correctAnswer: "C", verse: "Genesis 29:9-10", explanation: "Jacob saw Rachel at the well with her father's flocks. He was moved emotionally by her. Love strikes suddenly. Divine arrangement brings future spouses." },
  { id: "genesis70", question: "How long did Jacob agree to work for Rachel?", options: [{ label: "A", text: "5 years" }, { label: "B", text: "7 years" }, { label: "C", text: "10 years" }, { label: "D", text: "14 years" }], correctAnswer: "B", verse: "Genesis 29:18", explanation: "Jacob worked seven years thinking it was nothing because of his love. Time passes quickly in devoted service. Love makes labor light. Commitment transcends difficulty." },
  { id: "genesis71", question: "Who did Jacob receive instead of Rachel?", options: [{ label: "A", text: "Leah" }, { label: "B", text: "Zilpah" }, { label: "C", text: "Bilhah" }, { label: "D", text: "A stranger" }], correctAnswer: "A", verse: "Genesis 29:25", explanation: "Laban deceived Jacob by substituting Leah. Jacob woke to find he had married the wrong sister. Deception returns to the deceiver. Justice includes ironic reversal." },
  { id: "genesis72", question: "What did Laban require after the deception?", options: [{ label: "A", text: "More payment" }, { label: "B", text: "Seven more years of work for Rachel too" }, { label: "C", text: "Jacob to leave immediately" }, { label: "D", text: "A public apology" }], correctAnswer: "B", verse: "Genesis 29:27-28", explanation: "Laban offered Rachel too but required another seven years. Jacob agreed to work fourteen years total. Love endures long waits. Deep commitment transcends economic cost." },
  { id: "genesis73", question: "How many sons did Leah bear Jacob?", options: [{ label: "A", text: "Two" }, { label: "B", text: "Four" }, { label: "C", text: "Six" }, { label: "D", text: "Eight" }], correctAnswer: "C", verse: "Genesis 29:32-35; 30:17-20", explanation: "Leah bore Reuben Simeon Levi and Judah then later Issachar and Zebulun. Rachel remained barren longer. Leah found purpose in childbearing. God's plans include the overlooked." },
  { id: "genesis74", question: "How did Jacob become wealthy while with Laban?", options: [{ label: "A", text: "Through inheritance" }, { label: "B", text: "Through careful breeding of livestock" }, { label: "C", text: "Through gold mining" }, { label: "D", text: "Through trading" }], correctAnswer: "B", verse: "Genesis 30:37-43", explanation: "Jacob used selective breeding of the spotted and streaked animals. He increased his own flocks significantly. Skill and strategy produce wealth. God blesses industrious hands." },
  { id: "genesis75", question: "Why did Jacob decide to leave Laban?", options: [{ label: "A", text: "Laban treated him poorly" }, { label: "B", text: "God told him to return to Canaan" }, { label: "C", text: "He had accumulated enough wealth" }, { label: "D", text: "Laban kicked him out" }], correctAnswer: "B", verse: "Genesis 31:3", explanation: "God told Jacob to return to his homeland. The promise of Canaan called him home. Divine direction supersedes comfort. God's plan requires obedience." },
  { id: "genesis76", question: "What did Rachel steal from Laban?", options: [{ label: "A", text: "Money" }, { label: "B", text: "Livestock" }, { label: "C", text: "The household idols" }, { label: "D", text: "Land documents" }], correctAnswer: "C", verse: "Genesis 31:19", explanation: "Rachel took her father's household gods. These idols held spiritual and legal significance. Stealth sometimes accompanies wrong action. Theft has unseen consequences." },
  { id: "genesis77", question: "How did Jacob respond when confronted by Laban?", options: [{ label: "A", text: "He confessed everything" }, { label: "B", text: "He made a covenant with Laban" }, { label: "C", text: "He fought Laban" }, { label: "D", text: "He ran away faster" }], correctAnswer: "B", verse: "Genesis 31:44-54", explanation: "Jacob and Laban made a covenant and set up a pillar as witness. They agreed to boundaries. Conflict resolution requires mutual commitment. Covenants seal peace." },
  { id: "genesis78", question: "Whom did Jacob see encamped before him on his journey?", options: [{ label: "A", text: "Esau and his army" }, { label: "B", text: "Egyptian soldiers" }, { label: "C", text: "Laban pursuing him" }, { label: "D", text: "Canaanite warriors" }], correctAnswer: "A", verse: "Genesis 32:1-2", explanation: "Jacob saw Esau approaching with 400 men. Jacob was terrified facing his brother. Fear precedes reconciliation. Meeting what we dread often ends differently than expected." },
  { id: "genesis79", question: "What did Jacob do to prepare for meeting Esau?", options: [{ label: "A", text: "Prepared an army" }, { label: "B", text: "Prayed earnestly to God" }, { label: "C", text: "Sent gifts ahead as appeasement" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 32:9-23", explanation: "Jacob prayed sent gifts and divided his family into groups. He used multiple strategies. Preparation includes spiritual prayer and practical planning. Wisdom combines both." },
  { id: "genesis80", question: "What happened at Peniel during Jacob's struggle?", options: [{ label: "A", text: "He defeated an army" }, { label: "B", text: "He wrestled with God and was renamed" }, { label: "C", text: "He made a covenant" }, { label: "D", text: "He found a treasure" }], correctAnswer: "B", verse: "Genesis 32:24-30", explanation: "Jacob wrestled with a man who was God until daybreak. God changed his name to Israel. The struggle became his greatest victory. Transformation requires wrestling with God." },
  { id: "genesis81", question: "What was the meaning of the name Israel?", options: [{ label: "A", text: "Strong man" }, { label: "B", text: "One who strives with God" }, { label: "C", text: "Blessed one" }, { label: "D", text: "Chosen servant" }], correctAnswer: "B", verse: "Genesis 32:28", explanation: "Israel meant he had striven with God and prevailed. The name captured his spiritual journey. Names embody identity and calling. Wrestling produces new identity." },
  { id: "genesis82", question: "What happened when Jacob and Esau finally met?", options: [{ label: "A", text: "They fought violently" }, { label: "B", text: "They embraced and wept" }, { label: "C", text: "Esau rejected Jacob" }, { label: "D", text: "They ignored each other" }], correctAnswer: "B", verse: "Genesis 33:4", explanation: "Esau ran to Jacob threw his arms around him and wept. Years of anger dissolved. Reconciliation heals broken relationships. Forgiveness transcends injury." },
  { id: "genesis83", question: "Where did Jacob settle after reconciling with Esau?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Shechem" }, { label: "C", text: "Bethel" }, { label: "D", text: "Beer-sheba" }], correctAnswer: "B", verse: "Genesis 33:18", explanation: "Jacob came to Shechem a city of Canaan. He bought land there. Settling signified returning home. Promise fulfillment includes possession." },
  { id: "genesis84", question: "What tragedy happened at Shechem?", options: [{ label: "A", text: "Famine devastated the land" }, { label: "B", text: "Shechem seduced Dinah" }, { label: "C", text: "War broke out" }, { label: "D", text: "Disease spread" }], correctAnswer: "B", verse: "Genesis 34:2", explanation: "Shechem the son of Hamor took Dinah and violated her. Dinah's violation brought family trauma. Innocence can be destroyed by predatory action. Consequences extend beyond the victim." },
  { id: "genesis85", question: "How did Jacob's sons respond to Dinah's violation?", options: [{ label: "A", text: "With peaceful negotiation" }, { label: "B", text: "With anger and deceptive revenge" }, { label: "C", text: "They accepted Shechem's offer" }, { label: "D", text: "They fled the land" }], correctAnswer: "B", verse: "Genesis 34:25-26", explanation: "Simeon and Levi killed all the males of Shechem while they were sore from circumcision. They deceived the city. Righteous anger can become murder. Revenge produces blood feuds." },
  { id: "genesis86", question: "What was God's response to Jacob's condition?", options: [{ label: "A", text: "Judgment and abandonment" }, { label: "B", text: "Instructions to go to Bethel and build an altar" }, { label: "C", text: "Silence and distance" }, { label: "D", text: "A plague" }], correctAnswer: "B", verse: "Genesis 35:1", explanation: "God told Jacob to go to Bethel and build an altar. Jacob purified his household and removed idols. Restoration begins with returning to God. Rebuilding requires spiritual cleansing." },
  { id: "genesis87", question: "What covenant did God renew with Jacob?", options: [{ label: "A", text: "Just the land" }, { label: "B", text: "Just descendants" }, { label: "C", text: "The land and descendants plus his name confirmation" }, { label: "D", text: "Wealth only" }], correctAnswer: "C", verse: "Genesis 35:11-12", explanation: "God confirmed the covenant of land and descendants and reaffirmed the name Israel. Covenants repeat for assurance. God's promises are reliable and unchanging. Affirmation strengthens faith." },
  { id: "genesis88", question: "How old was Isaac when he died?", options: [{ label: "A", text: "100" }, { label: "B", text: "150" }, { label: "C", text: "180" }, { label: "D", text: "200" }], correctAnswer: "C", verse: "Genesis 35:28", explanation: "Isaac lived 180 years. He died an old man full of years. Long life marked God's blessing. The patriarchs lived extraordinarily long lives." },
  { id: "genesis89", question: "Who buried Isaac?", options: [{ label: "A", text: "Jacob alone" }, { label: "B", text: "Esau alone" }, { label: "C", text: "Jacob and Esau together" }, { label: "D", text: "The servants" }], correctAnswer: "C", verse: "Genesis 35:29", explanation: "Both Jacob and Esau came to bury their father. Death temporarily united separated brothers. Shared loss can bridge old wounds. Family ties remain sacred." },
  { id: "genesis90", question: "What were the descendants of Esau called?", options: [{ label: "A", text: "Canaanites" }, { label: "B", text: "Moabites" }, { label: "C", text: "Edomites" }, { label: "D", text: "Midianites" }], correctAnswer: "C", verse: "Genesis 36:8-9", explanation: "Esau settled in Mount Seir and his descendants became the Edomites. Nations developed from covenant families. Lineage determines national identity. Prophecy shapes future peoples." },
  { id: "genesis91", question: "How many sons did Jacob have?", options: [{ label: "A", text: "10" }, { label: "B", text: "11" }, { label: "C", text: "12" }, { label: "D", text: "13" }], correctAnswer: "C", verse: "Genesis 35:22-26", explanation: "Jacob had 12 sons who would become the twelve tribes of Israel. The twelve reflect God's organized people. Tribes preserved covenant identity. Israel means God's people organized." },
  { id: "genesis92", question: "Who was Jacob's favorite son?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Simeon" }, { label: "C", text: "Joseph" }, { label: "D", text: "Benjamin" }], correctAnswer: "C", verse: "Genesis 37:3", explanation: "Jacob loved Joseph most because he was born to Rachel. Joseph received a special coat of many colors. Favoritism breeds resentment among siblings. Parental preference creates division." },
  { id: "genesis93", question: "What did Joseph's dreams suggest to his brothers?", options: [{ label: "A", text: "Joseph would become a great leader" }, { label: "B", text: "Joseph would rule over them" }, { label: "C", text: "The family would bow to Joseph" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 37:5-10", explanation: "Joseph's dreams suggested he would rule over his family. His brothers hated him for the dreams. Pride in calling produces envy. Arrogance invites opposition." },
  { id: "genesis94", question: "What did Joseph's brothers do when he came to them in the field?", options: [{ label: "A", text: "Welcomed him warmly" }, { label: "B", text: "Plotted to kill him" }, { label: "C", text: "Sent him home" }, { label: "D", text: "Tested him" }], correctAnswer: "B", verse: "Genesis 37:18-20", explanation: "The brothers plotted to kill Joseph. Judah convinced them to sell him instead. Violence can escalate to commerce. Evil proposes murder before settling for profit." },
  { id: "genesis95", question: "Who bought Joseph from his brothers?", options: [{ label: "A", text: "Egyptian nobles" }, { label: "B", text: "Midianite traders" }, { label: "C", text: "Canaanite merchants" }, { label: "D", text: "Traders going to Egypt" }], correctAnswer: "D", verse: "Genesis 37:28", explanation: "Midianite traders bought Joseph from his brothers. They sold him to Potiphar in Egypt. Trafficking dehumanizes people. Commerce in human suffering corrupts." },
  { id: "genesis96", question: "What lie did Jacob's sons tell about Joseph?", options: [{ label: "A", text: "Joseph ran away" }, { label: "B", text: "A wild animal killed Joseph" }, { label: "C", text: "Joseph was captured by enemies" }, { label: "D", text: "Joseph decided to stay in another land" }], correctAnswer: "B", verse: "Genesis 37:31-35", explanation: "They presented Joseph's coat soaked in animal blood. Jacob believed a wild animal had killed Joseph. Deception involves false evidence. Evil uses props to support lies." },
  { id: "genesis97", question: "How did Jacob respond to the news of Joseph's 'death'?", options: [{ label: "A", text: "He investigated" }, { label: "B", text: "He grieved and would not be comforted" }, { label: "C", text: "He sought revenge" }, { label: "D", text: "He accepted God's will" }], correctAnswer: "B", verse: "Genesis 37:34-35", explanation: "Jacob tore his clothes and mourned deeply refusing comfort. His grief was profound and lasting. Loss can overwhelm hope. Despair sometimes persists despite faith." },
  { id: "genesis98", question: "Why is the Book of Genesis important for the Bible?", options: [{ label: "A", text: "It establishes God's creation" }, { label: "B", text: "It introduces key covenants" }, { label: "C", text: "It develops the patriarchal line to Israel" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 1-50", explanation: "Genesis establishes creation covenant and lineage foundations. God's plans unfold through these accounts. Beginnings contain seeds of all that follows. Genesis shapes all Biblical theology." },
  { id: "genesis99", question: "How do God's promises in Genesis carry forward?", options: [{ label: "A", text: "Through the patriarchs and their descendants" }, { label: "B", text: "Through the tribes of Israel" }, { label: "C", text: "Through Jesus Christ ultimately" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 12:1-3", explanation: "The promise to Abraham continues through Israel and culminates in Christ. Genealogy tracks fulfillment. God's plan unfolds across generations. Every promise moves toward Jesus." },
  { id: "genesis100", question: "What is the overall message of Genesis?", options: [{ label: "A", text: "God creates and sustains all things" }, { label: "B", text: "Humanity falls into sin but God provides covenant redemption" }, { label: "C", text: "God's purposes persist despite human failure" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 1:1, 3:15, 12:1-3, 50:20", explanation: "Genesis reveals creation fall covenant and providence. God works through history toward redemption. Evil intends harm but God reverses it. Genesis declares God's sovereign grace." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GenesisTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Fetch user's progress for genesis questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'genesis');

        if (error) {
          console.error('Error fetching trivia progress:', error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter(p => p.is_correct)
            .map(p => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(q => !answeredCorrectly.has(q.id));
        
        // If no questions left, show all questions (allow review)
        const questionsToUse = availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;
        
        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        // No user logged in, show random questions
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        // Insert into master_actions via server-side API (uses service role)
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'genesis' });
        const response = await fetch('/api/trivia-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: 'genesis'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to record trivia answer:', response.status, errorText);
        } else {
          console.log('Successfully recorded trivia answer');
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from('profile_stats')
          .select('trivia_questions_answered')
          .eq('user_id', userId)
          .single();
        
        if (currentStats) {
          await supabase
            .from('profile_stats')
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1
            })
            .eq('user_id', userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions(prev => {
          const updated = [...prev];
          updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], verseText };
          return updated;
        });
      } catch (error) {
        console.error("Error fetching verse text:", error);
      } finally {
        setLoadingVerseText(false);
      }
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Genesis expert!";
    if (score >= 8) return "Excellent! You know Genesis well!";
    if (score >= 6) return "Good job! Keep studying Genesis!";
    if (score >= 4) return "Nice try! Genesis has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / 10
            </p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/genesis"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600 flex gap-8">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold">Score: {correctCount}</span>
          </div>
        </div>

        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={!!selectedAnswer}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold text-gray-700">
                      {option.label}. {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div className="mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 rounded-lg ${
                        option.label === currentQuestion.correctAnswer
                          ? "bg-green-100 border-2 border-green-400"
                          : option.label === selectedAnswer && !isCorrect
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-gray-700">
                        {option.label}. {option.text}
                        {option.label === currentQuestion.correctAnswer && (
                          <span className="ml-2 text-green-700">✓</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentQuestion.verse}
                  </p>
                  {loadingVerseText ? (
                    <p className="text-gray-500 text-sm italic mb-3">Loading verse...</p>
                  ) : currentQuestion.verseText ? (
                    <p className="text-gray-800 text-sm leading-relaxed mb-3 italic">
                      "{currentQuestion.verseText}"
                    </p>
                  ) : null}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


