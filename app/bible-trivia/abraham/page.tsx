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
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, '+');
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
  { id: "abraham01", question: "What was Abraham's original name?", options: [{ label: "A", text: "Abram" }, { label: "B", text: "Isaac" }, { label: "C", text: "Jacob" }, { label: "D", text: "Joseph" }], correctAnswer: "A", verse: "Genesis 17:5", explanation: "Abraham was originally named Abram, which means 'exalted father.' God changed his name to Abraham, meaning 'father of many nations.' This reflected God's covenant promise. The name change signified new identity and destiny." },
  { id: "abraham02", question: "Where did Abraham originally live?", options: [{ label: "A", text: "Ur of the Chaldeans" }, { label: "B", text: "Egypt" }, { label: "C", text: "Canaan" }, { label: "D", text: "Haran" }], correctAnswer: "A", verse: "Genesis 11:31", explanation: "Abraham was born in Ur of the Chaldeans, a prosperous city in Mesopotamia. He lived among idol worshippers. God called him to leave his homeland. This was a radical step of faith." },
  { id: "abraham03", question: "What was God's first command to Abraham?", options: [{ label: "A", text: "Leave your country" }, { label: "B", text: "Go to a land I will show you" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Build an altar" }], correctAnswer: "C", verse: "Genesis 12:1", explanation: "God told Abraham to leave his country, people, and father's household. He was to go to a land God would show him. This required complete trust. Abraham obeyed without knowing the destination." },
  { id: "abraham04", question: "What did God promise Abraham?", options: [{ label: "A", text: "Great nation" }, { label: "B", text: "Blessing" }, { label: "C", text: "Fame" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 12:2", explanation: "God promised to make Abraham into a great nation. He would be blessed and become a blessing. His name would be great. Through him all nations would be blessed. This was the Abrahamic covenant." },
  { id: "abraham05", question: "Where did Abraham build his first altar?", options: [{ label: "A", text: "Shechem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Hebron" }, { label: "D", text: "Jerusalem" }], correctAnswer: "A", verse: "Genesis 12:6", explanation: "Abraham built an altar at Shechem in Canaan. The Canaanites were in the land. Abraham worshipped God there. Altars marked places of divine encounter." },
  { id: "abraham06", question: "What famine caused Abraham to go to Egypt?", options: [{ label: "A", text: "Severe famine" }, { label: "B", text: "Drought" }, { label: "C", text: "Both A and B" }, { label: "D", text: "War" }], correctAnswer: "A", verse: "Genesis 12:10", explanation: "A severe famine struck the land of Canaan. Abraham went down to Egypt. This tested his faith. Abraham's journey showed human vulnerability." },
  { id: "abraham07", question: "What did Abraham tell Pharaoh about Sarah?", options: [{ label: "A", text: "She is my sister" }, { label: "B", text: "She is my wife" }, { label: "C", text: "She is my daughter" }, { label: "D", text: "She is my cousin" }], correctAnswer: "A", verse: "Genesis 12:13", explanation: "Abraham said Sarah was his sister, which was technically true. He feared Pharaoh would kill him. This showed Abraham's lack of faith. God protected Sarah despite Abraham's deception." },
  { id: "abraham08", question: "Who separated Abraham and Lot?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Lot" }, { label: "C", text: "Their herdsmen" }, { label: "D", text: "God" }], correctAnswer: "A", verse: "Genesis 13:8", explanation: "Abraham suggested they separate to avoid conflict. He gave Lot first choice of land. This showed Abraham's generosity. Abraham chose the less desirable land." },
  { id: "abraham09", question: "What did God promise Abraham after Lot left?", options: [{ label: "A", text: "All the land he could see" }, { label: "B", text: "Wealth" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Genesis 13:14", explanation: "God told Abraham to look in all directions. All the land he saw would be his. This was an expansion of the promise. Abraham's descendants would inherit this land." },
  { id: "abraham10", question: "What battle did Abraham fight in?", options: [{ label: "A", text: "Battle of the Kings" }, { label: "B", text: "Battle of Siddim" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Battle of Canaan" }], correctAnswer: "C", verse: "Genesis 14:1", explanation: "Abraham fought in the Battle of the Kings Valley of Siddim. He rescued Lot from captivity. Abraham defeated four kings. This showed his military prowess." },
  { id: "abraham11", question: "Who blessed Abraham after the battle?", options: [{ label: "A", text: "Melchizedek" }, { label: "B", text: "Pharaoh" }, { label: "C", text: "Abimelech" }, { label: "D", text: "Lot" }], correctAnswer: "A", verse: "Genesis 14:18", explanation: "Melchizedek, king of Salem and priest of God Most High, blessed Abraham. He brought bread and wine. Abraham gave him a tenth. This foreshadowed Christ's priesthood." },
  { id: "abraham12", question: "What was Abraham's concern about heirs?", options: [{ label: "A", text: "No children" }, { label: "B", text: "Eliezer of Damascus" }, { label: "C", text: "Both A and B" }, { label: "D", text: "His age" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Abraham had no children and was childless. He thought Eliezer would be his heir. This showed Abraham's impatience. God reassured him of descendants." },
  { id: "abraham13", question: "What did God use to confirm His covenant?", options: [{ label: "A", text: "Rainbow" }, { label: "B", text: "Animals cut in half" }, { label: "C", text: "Smoke and fire" }, { label: "D", text: "Blood" }], correctAnswer: "B", verse: "Genesis 15:10", explanation: "God had Abraham cut animals in half. A smoking fire pot passed between them. This was an ancient covenant ritual. God alone passed through, binding Himself." },
  { id: "abraham14", question: "How many years did God say until the promise?", options: [{ label: "A", text: "10 years" }, { label: "B", text: "25 years" }, { label: "C", text: "400 years" }, { label: "D", text: "430 years" }], correctAnswer: "C", verse: "Genesis 15:13", explanation: "God said Abraham's descendants would be strangers in a foreign land for 400 years. They would be enslaved and mistreated. Then God would judge and deliver them. This predicted Israel's Egyptian bondage." },
  { id: "abraham15", question: "What did Sarah suggest to Abraham?", options: [{ label: "A", text: "Pray for a child" }, { label: "B", text: "Have a child with Hagar" }, { label: "C", text: "Adopt a child" }, { label: "D", text: "Wait for God" }], correctAnswer: "B", verse: "Genesis 16:2", explanation: "Sarah suggested Abraham have a child with her Egyptian maidservant Hagar. This was Sarah's plan to fulfill God's promise. It created family conflict. Abraham agreed to this human solution." },
  { id: "abraham16", question: "What was Ishmael's name mean?", options: [{ label: "A", text: "God hears" }, { label: "B", text: "God laughs" }, { label: "C", text: "God sees" }, { label: "D", text: "God provides" }], correctAnswer: "A", verse: "Genesis 16:11", explanation: "The angel told Hagar to name her son Ishmael, meaning 'God hears.' God heard Hagar's affliction. Ishmael would be a wild donkey of a man. He would live in hostility with relatives." },
  { id: "abraham17", question: "What was Abraham's age when Ishmael was born?", options: [{ label: "A", text: "75" }, { label: "B", text: "86" }, { label: "C", text: "99" }, { label: "D", text: "100" }], correctAnswer: "B", verse: "Genesis 16:16", explanation: "Abraham was 86 years old when Ishmael was born. This was 11 years after arriving in Canaan. Ishmael was Abraham's firstborn son. He became father of 12 princes." },
  { id: "abraham18", question: "What did God change Abraham's name to?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Isaac" }, { label: "C", text: "Jacob" }, { label: "D", text: "Israel" }], correctAnswer: "A", verse: "Genesis 17:5", explanation: "God changed Abram to Abraham, meaning 'father of many nations.' This reflected the covenant promise. Abraham would be father of many nations. Kings would come from him." },
  { id: "abraham19", question: "What was the sign of God's covenant?", options: [{ label: "A", text: "Circumcision" }, { label: "B", text: "Sacrifices" }, { label: "C", text: "Altars" }, { label: "D", text: "Pillars" }], correctAnswer: "A", verse: "Genesis 17:10", explanation: "Circumcision was the sign of the covenant. Every male was to be circumcised. This was a physical sign of faith. It marked belonging to God's covenant people." },
  { id: "abraham20", question: "What did Abraham laugh about?", options: [{ label: "A", text: "God's promise of a son" }, { label: "B", text: "Sarah's age" }, { label: "C", text: "Both A and B" }, { label: "D", text: "His own age" }], correctAnswer: "A", verse: "Genesis 17:17", explanation: "Abraham fell facedown and laughed when God promised a son. He thought it impossible at 100 years old. God said Sarah would have a son. Abraham's laughter showed doubt." },
  { id: "abraham21", question: "What did the three visitors tell Abraham?", options: [{ label: "A", text: "Sarah would have a son" }, { label: "B", text: "Sodom would be destroyed" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Abraham would die soon" }], correctAnswer: "C", verse: "Genesis 18:10", explanation: "The visitors told Abraham Sarah would have a son. They also revealed Sodom's destruction. Abraham interceded for the righteous. This showed God's judgment and mercy." },
  { id: "abraham22", question: "What did Sarah laugh about?", options: [{ label: "A", text: "The visitors" }, { label: "B", text: "Abraham's age" }, { label: "C", text: "Having a child" }, { label: "D", text: "The promise" }], correctAnswer: "C", verse: "Genesis 18:12", explanation: "Sarah laughed to herself about having a child. She was past childbearing age. The visitor asked why she laughed. Sarah denied laughing but was rebuked." },
  { id: "abraham23", question: "What was Abraham's nephew's name?", options: [{ label: "A", text: "Lot" }, { label: "B", text: "Ishmael" }, { label: "C", text: "Isaac" }, { label: "D", text: "Jacob" }], correctAnswer: "A", verse: "Genesis 11:27", explanation: "Lot was Abraham's nephew, son of Haran. He traveled with Abraham from Ur. They separated due to land disputes. Lot chose the well-watered Jordan plain." },
  { id: "abraham24", question: "What city did Lot choose to live near?", options: [{ label: "A", text: "Sodom" }, { label: "B", text: "Gomorrah" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Zoar" }], correctAnswer: "A", verse: "Genesis 13:12", explanation: "Lot pitched his tents near Sodom. Sodom was well-watered like Egypt. The men of Sodom were wicked. Lot's choice led to captivity and loss." },
  { id: "abraham25", question: "How many righteous people did Abraham ask for?", options: [{ label: "A", text: "10" }, { label: "B", text: "50" }, { label: "C", text: "45" }, { label: "D", text: "40" }], correctAnswer: "A", verse: "Genesis 18:32", explanation: "Abraham bargained down from 50 to 45, then 40, 30, 20, and finally 10. He asked if God would spare for 10 righteous. This showed Abraham's boldness in intercession." },
  { id: "abraham26", question: "Who rescued Lot from Sodom?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "The angels" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Lot's family" }], correctAnswer: "B", verse: "Genesis 19:16", explanation: "Two angels rescued Lot and his family from Sodom. They urged them to hurry. Lot's sons-in-law thought it was a joke. Only Lot, his wife, and two daughters escaped." },
  { id: "abraham27", question: "What happened to Lot's wife?", options: [{ label: "A", text: "She became a pillar of salt" }, { label: "B", text: "She was burned" }, { label: "C", text: "She drowned" }, { label: "D", text: "She was captured" }], correctAnswer: "A", verse: "Genesis 19:26", explanation: "Lot's wife looked back and became a pillar of salt. She disobeyed the angels' warning. This showed the seriousness of God's judgment. Looking back represented longing for sinful ways." },
  { id: "abraham28", question: "What did Abraham name his son with Sarah?", options: [{ label: "A", text: "Isaac" }, { label: "B", text: "Ishmael" }, { label: "C", text: "Jacob" }, { label: "D", text: "Joseph" }], correctAnswer: "A", verse: "Genesis 21:3", explanation: "Abraham named his son Isaac, meaning 'he laughs.' This referred to Abraham's laughter of doubt. Isaac represented joy and fulfillment. He was the child of promise." },
  { id: "abraham29", question: "How old was Abraham when Isaac was born?", options: [{ label: "A", text: "86" }, { label: "B", text: "99" }, { label: "C", text: "100" }, { label: "D", text: "110" }], correctAnswer: "C", verse: "Genesis 21:5", explanation: "Abraham was 100 years old when Isaac was born. Sarah was 90 years old. This miraculous birth showed God's power. It fulfilled God's promise despite human impossibility." },
  { id: "abraham30", question: "What did Sarah want Abraham to do with Ishmael?", options: [{ label: "A", text: "Bless him" }, { label: "B", text: "Send him away" }, { label: "C", text: "Make him heir" }, { label: "D", text: "Teach him" }], correctAnswer: "B", verse: "Genesis 21:10", explanation: "Sarah saw Ishmael mocking Isaac. She wanted Abraham to send Hagar and Ishmael away. This created family conflict. Abraham was distressed but God reassured him." },
  { id: "abraham31", question: "What did God promise about Ishmael?", options: [{ label: "A", text: "He would be blessed" }, { label: "B", text: "He would become a nation" }, { label: "C", text: "Both A and B" }, { label: "D", text: "He would die young" }], correctAnswer: "C", verse: "Genesis 21:13", explanation: "God said Ishmael would become a nation. He would be blessed because he was Abraham's son. God heard Ishmael's cry. This showed God's care for all Abraham's children." },
  { id: "abraham32", question: "Where did Hagar and Ishmael go?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Beer-sheba" }, { label: "C", text: "Desert of Paran" }, { label: "D", text: "Canaan" }], correctAnswer: "C", verse: "Genesis 21:21", explanation: "Hagar and Ishmael went to the Desert of Paran. God provided water for them. Ishmael became an archer. He lived in the Desert of Paran. God was with him." },
  { id: "abraham33", question: "What did Abimelech give Abraham?", options: [{ label: "A", text: "Sheep and cattle" }, { label: "B", text: "Land" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Gold" }], correctAnswer: "A", verse: "Genesis 20:14", explanation: "Abimelech gave Abraham sheep, cattle, and servants. He also gave him land. This was compensation for Abraham's deception. Abimelech recognized God's blessing on Abraham." },
  { id: "abraham34", question: "What well did Abraham dig?", options: [{ label: "A", text: "Well of Oath" }, { label: "B", text: "Well of Seven" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Well of Abraham" }], correctAnswer: "C", verse: "Genesis 21:31", explanation: "Abraham dug a well called Beer-sheba, meaning 'well of seven' or 'well of oath.' He made a treaty with Abimelech. They swore an oath there. This established peaceful relations." },
  { id: "abraham35", question: "What test did God give Abraham?", options: [{ label: "A", text: "Sacrifice Isaac" }, { label: "B", text: "Give away wealth" }, { label: "C", text: "Leave Canaan" }, { label: "D", text: "Circumcise himself" }], correctAnswer: "A", verse: "Genesis 22:2", explanation: "God told Abraham to sacrifice Isaac on Mount Moriah. This tested Abraham's faith. Abraham obeyed, believing God would provide. This was the ultimate test of trust." },
  { id: "abraham36", question: "What did Abraham tell Isaac about the sacrifice?", options: [{ label: "A", text: "God will provide" }, { label: "B", text: "It will hurt" }, { label: "C", text: "We will return" }, { label: "D", text: "All of the above" }], correctAnswer: "A", verse: "Genesis 22:8", explanation: "Abraham said 'God will provide for himself the lamb.' He trusted God's provision. Isaac carried the wood. Abraham carried the fire and knife. This foreshadowed Christ's sacrifice." },
  { id: "abraham37", question: "What did the angel call Abraham?", options: [{ label: "A", text: "Faithful servant" }, { label: "B", text: "Father of nations" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Covenant keeper" }], correctAnswer: "A", verse: "Genesis 22:11", explanation: "The angel called Abraham from heaven. He said 'do not lay your hand on the boy.' Abraham had not withheld his son. This showed Abraham's complete obedience." },
  { id: "abraham38", question: "What did Abraham name the place?", options: [{ label: "A", text: "Mount Moriah" }, { label: "B", text: "The Lord Will Provide" }, { label: "C", text: "Mount of Sacrifice" }, { label: "D", text: "Mount Abraham" }], correctAnswer: "B", verse: "Genesis 22:14", explanation: "Abraham named it 'The Lord Will Provide.' This referred to the ram caught in the thicket. God provided the sacrifice. This became Jehovah Jireh." },
  { id: "abraham39", question: "Who was Abraham's wife after Sarah died?", options: [{ label: "A", text: "Hagar" }, { label: "B", text: "Keturah" }, { label: "C", text: "Rebekah" }, { label: "D", text: "Rachel" }], correctAnswer: "B", verse: "Genesis 25:1", explanation: "Abraham married Keturah after Sarah's death. She bore him six sons. These became additional nations. Abraham provided for all his children. He sent them eastward." },
  { id: "abraham40", question: "How old was Abraham when he died?", options: [{ label: "A", text: "175" }, { label: "B", text: "150" }, { label: "C", text: "200" }, { label: "D", text: "125" }], correctAnswer: "A", verse: "Genesis 25:7", explanation: "Abraham lived 175 years. He died at a good old age. He was gathered to his people. Isaac and Ishmael buried him. This showed a full life of faith." },
  { id: "abraham41", question: "Where was Abraham buried?", options: [{ label: "A", text: "Cave of Machpelah" }, { label: "B", text: "Garden tomb" }, { label: "C", text: "Family tomb" }, { label: "D", text: "Royal tomb" }], correctAnswer: "A", verse: "Genesis 25:9", explanation: "Abraham was buried in the Cave of Machpelah near Mamre. Sarah was already buried there. Isaac and Ishmael buried him. This became the family burial place." },
  { id: "abraham42", question: "What was Abraham's faith described as?", options: [{ label: "A", text: "Credited as righteousness" }, { label: "B", text: "Perfect faith" }, { label: "C", text: "Blind faith" }, { label: "D", text: "Weak faith" }], correctAnswer: "A", verse: "Genesis 15:6", explanation: "Abraham believed God and it was credited to him as righteousness. This was before circumcision. Faith, not works, saves. Abraham is the father of all who believe." },
  { id: "abraham43", question: "What land did God promise Abraham?", options: [{ label: "A", text: "From Nile to Euphrates" }, { label: "B", text: "Canaan only" }, { label: "C", text: "Mesopotamia" }, { label: "D", text: "Egypt" }], correctAnswer: "A", verse: "Genesis 15:18", explanation: "God promised land from the Nile to the Euphrates. This was the land of ten nations. Abraham's descendants would inherit it. The promise included Canaan and beyond." },
  { id: "abraham44", question: "How did Abraham acquire the Cave of Machpelah?", options: [{ label: "A", text: "Bought it" }, { label: "B", text: "Inherited it" }, { label: "C", text: "Conquered it" }, { label: "D", text: "Was given it" }], correctAnswer: "A", verse: "Genesis 23:16", explanation: "Abraham bought the cave from Ephron the Hittite. He paid 400 shekels of silver. This was the first land ownership in Canaan. It showed Abraham's faith in the promise." },
  { id: "abraham45", question: "What was Abraham's tithe?", options: [{ label: "A", text: "To Melchizedek" }, { label: "B", text: "To the poor" }, { label: "C", text: "To the temple" }, { label: "D", text: "To Lot" }], correctAnswer: "A", verse: "Genesis 14:20", explanation: "Abraham gave a tenth of everything to Melchizedek. This was before the Mosaic law. It showed Abraham's recognition of priesthood. Tithing predates the law." },
  { id: "abraham46", question: "What was Abraham's hospitality like?", options: [{ label: "A", text: "Welcomed strangers" }, { label: "B", text: "Ignored visitors" }, { label: "C", text: "Charged for meals" }, { label: "D", text: "Was unfriendly" }], correctAnswer: "A", verse: "Genesis 18:2", explanation: "Abraham welcomed three strangers. He bowed low and offered hospitality. He prepared a feast for them. This showed Middle Eastern hospitality. The visitors were angels." },
  { id: "abraham47", question: "What was Abraham's prayer life?", options: [{ label: "A", text: "Bold intercession" }, { label: "B", text: "Silent prayer" }, { label: "C", text: "Ritual prayer" }, { label: "D", text: "No prayer" }], correctAnswer: "A", verse: "Genesis 18:23", explanation: "Abraham boldly interceded for Sodom. He bargained with God for the righteous. He started at 50 and went to 10. This showed intimate relationship with God." },
  { id: "abraham48", question: "What was Abraham's wealth?", options: [{ label: "A", text: "Livestock and silver" }, { label: "B", text: "Land" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Gold only" }], correctAnswer: "A", verse: "Genesis 13:2", explanation: "Abraham was very wealthy in livestock, silver, and gold. God blessed him materially. His wealth was a sign of favor. He used it to bless others." },
  { id: "abraham49", question: "What was Abraham's relationship with God?", options: [{ label: "A", text: "Friend of God" }, { label: "B", text: "Servant of God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Enemy of God" }], correctAnswer: "C", verse: "2 Chronicles 20:7", explanation: "Abraham is called God's friend. He walked with God. He obeyed God's commands. Friendship involves trust and intimacy. Abraham's faith made him God's friend." },
  { id: "abraham50", question: "What nations came from Abraham?", options: [{ label: "A", text: "Israel and Arabs" }, { label: "B", text: "Egypt and Babylon" }, { label: "C", text: "Rome and Greece" }, { label: "D", text: "China and India" }], correctAnswer: "A", verse: "Genesis 25:12", explanation: "Isaac's descendants became Israel. Ishmael's descendants became Arab nations. Abraham is father of both. This fulfills 'father of many nations.' The conflict continues today." },
  { id: "abraham51", question: "What was Abraham's call?", options: [{ label: "A", text: "To leave idolatry" }, { label: "B", text: "To trust God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "To become rich" }], correctAnswer: "C", verse: "Genesis 12:1", explanation: "God called Abraham from Ur of idol worshippers. He was to trust God completely. Abraham left security for uncertainty. This was a call to faith." },
  { id: "abraham52", question: "What was Abraham's altar building?", options: [{ label: "A", text: "Worship places" }, { label: "B", text: "Memorials" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Forts" }], correctAnswer: "C", verse: "Genesis 12:7", explanation: "Abraham built altars to worship God. They marked divine encounters. Altars were places of sacrifice and prayer. They testified to God's presence." },
  { id: "abraham53", question: "What was Abraham's mistake in Egypt?", options: [{ label: "A", text: "Lied about Sarah" }, { label: "B", text: "Trusted Pharaoh" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Worshipped idols" }], correctAnswer: "A", verse: "Genesis 12:12", explanation: "Abraham feared Pharaoh would kill him for Sarah. He said she was his sister. This showed lack of trust in God. God protected Sarah anyway." },
  { id: "abraham54", question: "What was Abraham's generosity?", options: [{ label: "A", text: "Gave Lot first choice" }, { label: "B", text: "Shared wealth" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Kept everything" }], correctAnswer: "A", verse: "Genesis 13:9", explanation: "Abraham let Lot choose first. He took the less desirable land. This prevented family conflict. Abraham valued relationships over possessions." },
  { id: "abraham55", question: "What was Abraham's victory?", options: [{ label: "A", text: "Defeated kings" }, { label: "B", text: "Rescued Lot" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Lost battle" }], correctAnswer: "C", verse: "Genesis 14:14", explanation: "Abraham defeated four kings with 318 men. He rescued Lot and recovered goods. This showed his military leadership. Abraham refused spoil for himself." },
  { id: "abraham56", question: "What was Abraham's tithe to Melchizedek?", options: [{ label: "A", text: "A tenth" }, { label: "B", text: "Half" }, { label: "C", text: "All" }, { label: "D", text: "Nothing" }], correctAnswer: "A", verse: "Genesis 14:20", explanation: "Abraham gave a tenth of everything to Melchizedek. This honored the priest-king. It showed Abraham's recognition of spiritual authority. Tithing was voluntary worship." },
  { id: "abraham57", question: "What was Abraham's doubt?", options: [{ label: "A", text: "No heir" }, { label: "B", text: "Eliezer as heir" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Too many heirs" }], correctAnswer: "C", verse: "Genesis 15:3", explanation: "Abraham had no child and was old. He thought Eliezer would inherit. God reassured him. Abraham's doubt led to Ishmael's birth." },
  { id: "abraham58", question: "What was the covenant ritual?", options: [{ label: "A", text: "Cut animals" }, { label: "B", text: "Blood covenant" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Written contract" }], correctAnswer: "A", verse: "Genesis 15:10", explanation: "Abraham cut animals in half. God passed through as smoking fire. This bound God to His promise. Abraham slept during the ritual." },
  { id: "abraham59", question: "What was Abraham's 400 year prophecy?", options: [{ label: "A", text: "Egyptian bondage" }, { label: "B", text: "Canaan conquest" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Babylonian exile" }], correctAnswer: "A", verse: "Genesis 15:13", explanation: "Descendants would be enslaved 400 years. They would be mistreated in Egypt. God would judge and deliver. This predicted Israel's history." },
  { id: "abraham60", question: "What was Hagar's encounter?", options: [{ label: "A", text: "Angel appeared" }, { label: "B", text: "God heard her" }, { label: "C", text: "Both A and B" }, { label: "D", text: "She was alone" }], correctAnswer: "C", verse: "Genesis 16:7", explanation: "Angel found Hagar by a spring. God heard her affliction. He promised numerous descendants. Ishmael would be blessed." },
  { id: "abraham61", question: "What was Abraham's name change?", options: [{ label: "A", text: "Abram to Abraham" }, { label: "B", text: "Father of many" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Father of one" }], correctAnswer: "C", verse: "Genesis 17:5", explanation: "God changed Abram to Abraham. It means 'father of many nations.' This reflected the covenant. Abraham was 99 years old." },
  { id: "abraham62", question: "What was the covenant sign?", options: [{ label: "A", text: "Circumcision" }, { label: "B", text: "Sacrament" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Baptism" }], correctAnswer: "A", verse: "Genesis 17:11", explanation: "Circumcision was the covenant sign. Every male was to be circumcised. It marked covenant relationship. Uncircumcised were cut off." },
  { id: "abraham63", question: "What was Abraham's laughter?", options: [{ label: "A", text: "At God's promise" }, { label: "B", text: "At Sarah's age" }, { label: "C", text: "Both A and B" }, { label: "D", text: "At Isaac's name" }], correctAnswer: "A", verse: "Genesis 17:17", explanation: "Abraham laughed at the son promise. He was 100 years old. God said 'Is anything too hard?' Sarah would have a son." },
  { id: "abraham64", question: "What was Sarah's laughter?", options: [{ label: "A", text: "At the promise" }, { label: "B", text: "At her age" }, { label: "C", text: "Both A and B" }, { label: "D", text: "At Abraham" }], correctAnswer: "A", verse: "Genesis 18:12", explanation: "Sarah laughed at having a child. She was past menopause. The visitor rebuked her. Sarah denied laughing." },
  { id: "abraham65", question: "What was Abraham's intercession?", options: [{ label: "A", text: "For Sodom" }, { label: "B", text: "Bargained to 10" }, { label: "C", text: "Both A and B" }, { label: "D", text: "For Gomorrah" }], correctAnswer: "C", verse: "Genesis 18:23", explanation: "Abraham pleaded for Sodom. He bargained from 50 to 10 righteous. God would spare for 10. This showed Abraham's compassion." },
  { id: "abraham66", question: "What was Lot's rescue?", options: [{ label: "A", text: "Angels led him out" }, { label: "B", text: "Wife looked back" }, { label: "C", text: "Both A and B" }, { label: "D", text: "He escaped alone" }], correctAnswer: "C", verse: "Genesis 19:16", explanation: "Angels urged Lot to flee. His wife became salt. Only his family escaped. Sodom was destroyed." },
  { id: "abraham67", question: "What was Isaac's name meaning?", options: [{ label: "A", text: "He laughs" }, { label: "B", text: "God provides" }, { label: "C", text: "Both A and B" }, { label: "D", text: "God hears" }], correctAnswer: "A", verse: "Genesis 21:3", explanation: "Isaac means 'he laughs.' It referred to Abraham's laughter. Isaac brought joy. He was the promised son." },
  { id: "abraham68", question: "What was Abraham's age at Isaac's birth?", options: [{ label: "A", text: "100" }, { label: "B", text: "Sarah 90" }, { label: "C", text: "Both A and B" }, { label: "D", text: "86" }], correctAnswer: "C", verse: "Genesis 21:5", explanation: "Abraham was 100, Sarah 90. This showed God's power. The birth was miraculous. Isaac was the covenant child." },
  { id: "abraham69", question: "What was Ishmael's blessing?", options: [{ label: "A", text: "Become a nation" }, { label: "B", text: "God hears him" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Become priest" }], correctAnswer: "C", verse: "Genesis 21:13", explanation: "God blessed Ishmael. He would become a great nation. God heard his cry. Abraham sent him away." },
  { id: "abraham70", question: "What was the well of oath?", options: [{ label: "A", text: "Beer-sheba" }, { label: "B", text: "Peace treaty" }, { label: "C", text: "Both A and B" }, { label: "D", text: "War site" }], correctAnswer: "C", verse: "Genesis 21:31", explanation: "Abraham and Abimelech swore oath. They named it Beer-sheba. It means 'well of seven.' It established peace." },
  { id: "abraham71", question: "What was Abraham's test?", options: [{ label: "A", text: "Sacrifice Isaac" }, { label: "B", text: "On Mount Moriah" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Sacrifice Ishmael" }], correctAnswer: "C", verse: "Genesis 22:2", explanation: "God tested Abraham's faith. He commanded Isaac's sacrifice. Abraham obeyed completely. God provided the ram." },
  { id: "abraham72", question: "What was Abraham's response?", options: [{ label: "A", text: "God will provide" }, { label: "B", text: "Early morning" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Refused" }], correctAnswer: "C", verse: "Genesis 22:3", explanation: "Abraham rose early. He said 'God will provide.' He trusted God's provision. Isaac carried the wood." },
  { id: "abraham73", question: "What was the angel's call?", options: [{ label: "A", text: "Do not harm the boy" }, { label: "B", text: "Now I know you fear God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Harm the boy" }], correctAnswer: "C", verse: "Genesis 22:12", explanation: "Angel stopped Abraham. God knew Abraham feared Him. He did not withhold his son. This was supreme faith." },
  { id: "abraham74", question: "What was the place named?", options: [{ label: "A", text: "Jehovah Jireh" }, { label: "B", text: "God will provide" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Mount of Testing" }], correctAnswer: "C", verse: "Genesis 22:14", explanation: "Abraham named it 'The Lord Will Provide.' Ram was in the thicket. God provided the sacrifice. This became Jehovah Jireh." },
  { id: "abraham75", question: "What was Abraham's second wife?", options: [{ label: "A", text: "Keturah" }, { label: "B", text: "Six sons" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Hagar" }], correctAnswer: "C", verse: "Genesis 25:1", explanation: "Abraham married Keturah. She bore six sons. They became nations. Abraham provided inheritances. He sent them eastward." },
  { id: "abraham76", question: "What was Abraham's death?", options: [{ label: "A", text: "175 years" }, { label: "B", text: "Good old age" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Young death" }], correctAnswer: "C", verse: "Genesis 25:8", explanation: "Abraham died at 175. He died in good old age. Full of years. Gathered to his people." },
  { id: "abraham77", question: "What was Abraham's burial?", options: [{ label: "A", text: "Cave of Machpelah" }, { label: "B", text: "With Sarah" }, { label: "C", text: "Both A and B" }, { label: "D", text: "In Egypt" }], correctAnswer: "C", verse: "Genesis 25:9", explanation: "Buried in Machpelah cave. With Sarah. Isaac and Ishmael buried him. Family burial place." },
  { id: "abraham78", question: "What was Abraham's faith?", options: [{ label: "A", text: "Credited as righteousness" }, { label: "B", text: "Before law" }, { label: "C", text: "Both A and B" }, { label: "D", text: "After law" }], correctAnswer: "C", verse: "Romans 4:3", explanation: "Abraham believed God. Credited as righteousness. Before circumcision. Faith saves, not works." },
  { id: "abraham79", question: "What was Abraham's land promise?", options: [{ label: "A", text: "Nile to Euphrates" }, { label: "B", text: "Ten nations" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Small plot" }], correctAnswer: "C", verse: "Genesis 15:18", explanation: "Land from Nile to Euphrates. Land of ten nations. Everlasting possession. To his descendants." },
  { id: "abraham80", question: "What was Abraham's cave purchase?", options: [{ label: "A", text: "400 shekels" }, { label: "B", text: "First land in Canaan" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Free gift" }], correctAnswer: "C", verse: "Genesis 23:16", explanation: "Paid 400 shekels to Ephron. First land ownership. Burial place. Faith in promise." },
  { id: "abraham81", question: "What was Abraham's hospitality?", options: [{ label: "A", text: "Welcomed strangers" }, { label: "B", text: "Prepared feast" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Ignored them" }], correctAnswer: "C", verse: "Genesis 18:1", explanation: "Three men at tent. Abraham ran to meet them. Offered water, rest, food. Middle Eastern hospitality. They were angels." },
  { id: "abraham82", question: "What was Abraham's prayer?", options: [{ label: "A", text: "Bold intercession" }, { label: "B", text: "For Sodom" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Silent" }], correctAnswer: "C", verse: "Genesis 18:23", explanation: "Abraham approached God. Bargained for righteous. From 50 to 10. Intimate relationship." },
  { id: "abraham83", question: "What was Abraham's wealth?", options: [{ label: "A", text: "Livestock, silver, gold" }, { label: "B", text: "Very rich" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Poor" }], correctAnswer: "C", verse: "Genesis 13:2", explanation: "Very wealthy. Livestock, silver, gold. God blessed him. Sign of favor." },
  { id: "abraham84", question: "What was Abraham's title?", options: [{ label: "A", text: "Friend of God" }, { label: "B", text: "Father of faith" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Enemy of God" }], correctAnswer: "C", verse: "James 2:23", explanation: "Friend of God. Father of all believers. Faith relationship. Obedience from trust." },
  { id: "abraham85", question: "What nations from Abraham?", options: [{ label: "A", text: "Israel and Ishmaelites" }, { label: "B", text: "Jews and Arabs" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Egyptians" }], correctAnswer: "C", verse: "Genesis 25:12", explanation: "Isaac: Israel. Ishmael: Arab nations. Father of many nations. Ongoing conflict." },
  { id: "abraham86", question: "What was Abraham's call?", options: [{ label: "A", text: "Leave Ur" }, { label: "B", text: "Trust God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Stay home" }], correctAnswer: "C", verse: "Genesis 12:1", explanation: "Leave country, family, home. Go to unknown land. Radical faith. Called from idolatry." },
  { id: "abraham87", question: "What was Abraham's altars?", options: [{ label: "A", text: "Worship places" }, { label: "B", text: "Testify to God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Hiding places" }], correctAnswer: "C", verse: "Genesis 12:7", explanation: "Built altars in Canaan. Places of worship. Marked encounters. Testified to God's presence." },
  { id: "abraham88", question: "What was Abraham's Egypt mistake?", options: [{ label: "A", text: "Feared Pharaoh" }, { label: "B", text: "Lied about Sarah" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Trusted Pharaoh" }], correctAnswer: "C", verse: "Genesis 12:11", explanation: "Feared for life. Said Sarah was sister. Lack of trust. God protected anyway." },
  { id: "abraham89", question: "What was Abraham's generosity?", options: [{ label: "A", text: "Lot first choice" }, { label: "B", text: "Prevented conflict" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Took best land" }], correctAnswer: "C", verse: "Genesis 13:9", explanation: "Let Lot choose first. Took less desirable. Valued relationship. Avoided strife." },
  { id: "abraham90", question: "What was Abraham's battle?", options: [{ label: "A", text: "Rescued Lot" }, { label: "B", text: "Defeated kings" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Lost battle" }], correctAnswer: "C", verse: "Genesis 14:14", explanation: "318 men defeated four kings. Rescued Lot and goods. Military leader. Refused spoil." },
  { id: "abraham91", question: "What was Abraham's tithe?", options: [{ label: "A", text: "To Melchizedek" }, { label: "B", text: "Voluntary" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Required" }], correctAnswer: "C", verse: "Genesis 14:20", explanation: "Gave tenth to priest-king. Before Mosaic law. Worship act. Honored authority." },
  { id: "abraham92", question: "What was Abraham's doubt?", options: [{ label: "A", text: "No heir" }, { label: "B", text: "Human solution" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Trusted God" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Childless at 75. Thought Eliezer heir. Impatient. Led to Hagar." },
  { id: "abraham93", question: "What was covenant ritual?", options: [{ label: "A", text: "Animals cut" }, { label: "B", text: "God passed through" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Abraham cut" }], correctAnswer: "C", verse: "Genesis 15:17", explanation: "Cut animals in half. Smoking fire pot passed. God bound Himself. Ancient ritual." },
  { id: "abraham94", question: "What was 400 year prophecy?", options: [{ label: "A", text: "Egyptian slavery" }, { label: "B", text: "God's deliverance" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Canaan conquest" }], correctAnswer: "C", verse: "Genesis 15:13", explanation: "Slavery 400 years. Mistreated in Egypt. God would judge and deliver. Fulfilled in Exodus." },
  { id: "abraham95", question: "What was Hagar's promise?", options: [{ label: "A", text: "Many descendants" }, { label: "B", text: "Ishmael blessed" }, { label: "C", text: "Both A and B" }, { label: "D", text: "No descendants" }], correctAnswer: "C", verse: "Genesis 16:10", explanation: "Descendants too numerous. Ishmael would be blessed. God heard affliction. Fulfilled promise." },
  { id: "abraham96", question: "What was name change?", options: [{ label: "A", text: "Abram to Abraham" }, { label: "B", text: "Father of nations" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Father of one" }], correctAnswer: "C", verse: "Genesis 17:5", explanation: "Changed to Abraham. Means 'father of many.' Reflected covenant. At 99 years." },
  { id: "abraham97", question: "What was circumcision?", options: [{ label: "A", text: "Covenant sign" }, { label: "B", text: "Physical mark" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Optional" }], correctAnswer: "C", verse: "Genesis 17:11", explanation: "Sign of covenant. Every male circumcised. Marked relationship. Required for covenant." },
  { id: "abraham98", question: "What was Abraham's laughter?", options: [{ label: "A", text: "At promise" }, { label: "B", text: "At impossibility" }, { label: "C", text: "Both A and B" }, { label: "D", text: "At joy" }], correctAnswer: "C", verse: "Genesis 17:17", explanation: "Laughed at son promise. 100 years old. God asked 'Is anything too hard?' Faith tested." },
  { id: "abraham99", question: "What was Sarah's laughter?", options: [{ label: "A", text: "At promise" }, { label: "B", text: "Denied it" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Admitted it" }], correctAnswer: "C", verse: "Genesis 18:15", explanation: "Laughed at child promise. Past childbearing. Visitor rebuked her. She denied laughing." },
  { id: "abraham100", question: "What was Abraham's legacy?", options: [{ label: "A", text: "Father of faith" }, { label: "B", text: "Covenant keeper" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Faithless" }], correctAnswer: "C", verse: "Romans 4:16", explanation: "Father of all believers. Faith credited as righteousness. Model of trust. Through him all nations blessed." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function AbrahamTriviaPage() {
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
        
        // Fetch user's progress for abraham questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'abraham');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'abraham' });
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
            book: 'abraham'
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
    if (score === 10) return "Perfect! You're an Abraham expert!";
    if (score >= 8) return "Excellent! You know Abraham well!";
    if (score >= 6) return "Good job! Keep studying Abraham!";
    if (score >= 4) return "Nice try! Abraham has much to reveal!";
    return "Keep learning! Every question brings you closer to understanding Abraham!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-6xl mb-4">🌾</div>
        <p className="text-gray-600">Loading questions...</p>
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
              href="/bible-trivia/abraham"
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