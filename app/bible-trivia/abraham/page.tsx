"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { triggerPoints } from "@/components/PointsPop";

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
  { id: "abraham01", question: "What was Abraham's original name?", options: [{ label: "A", text: "Abram" }, { label: "B", text: "Isaac" }, { label: "C", text: "Jacob" }, { label: "D", text: "Joseph" }], correctAnswer: "A", verse: "Genesis 17:5", explanation: "Abraham was originally named Abram, which means 'exalted father.' God changed his name to Abraham, meaning 'father of many nations.' This reflected God's covenant promise. The name change signified new identity and destiny." },
  { id: "abraham02", question: "Where did Abraham originally live?", options: [{ label: "A", text: "Ur of the Chaldeans" }, { label: "B", text: "Egypt" }, { label: "C", text: "Canaan" }, { label: "D", text: "Haran" }], correctAnswer: "A", verse: "Genesis 11:31", explanation: "Abraham was born in Ur of the Chaldeans, a prosperous city in Mesopotamia. He lived among idol worshippers. God called him to leave his homeland. This was a radical step of faith." },
  { id: "abraham03", question: "What did God first tell Abram to do?", options: [{ label: "A", text: "Go down into Egypt" }, { label: "B", text: "Build a city" }, { label: "C", text: "Leave his country for a land God would show him" }, { label: "D", text: "Dig a well" }], correctAnswer: "C", verse: "Genesis 12:1", explanation: "God told Abraham to leave his country, people, and father's household. He was to go to a land God would show him. This required complete trust. Abraham obeyed without knowing the destination." },
  { id: "abraham04", question: "What did God promise to make of Abram?", options: [{ label: "A", text: "A king of Egypt" }, { label: "B", text: "A priest of Salem" }, { label: "C", text: "A judge over Canaan" }, { label: "D", text: "A great nation" }], correctAnswer: "D", verse: "Genesis 12:2", explanation: "God promised to make Abraham into a great nation. He would be blessed and become a blessing. His name would be great. Through him all nations would be blessed. This was the Abrahamic covenant." },
  { id: "abraham05", question: "Where did Abraham build his first altar?", options: [{ label: "A", text: "Shechem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Hebron" }, { label: "D", text: "Jerusalem" }], correctAnswer: "A", verse: "Genesis 12:6-7", explanation: "Abraham built an altar at Shechem in Canaan. The Canaanites were in the land. Abraham worshipped God there. Altars marked places of divine encounter." },
  { id: "abraham06", question: "Why did Abram go down to Egypt?", options: [{ label: "A", text: "There was a famine in the land" }, { label: "B", text: "God told him to go there" }, { label: "C", text: "He was fleeing from a war" }, { label: "D", text: "He wanted to see Pharaoh" }], correctAnswer: "A", verse: "Genesis 12:10", explanation: "A severe famine struck the land of Canaan. Abraham went down to Egypt. This tested his faith. Abraham's journey showed human vulnerability." },
  { id: "abraham07", question: "What did Abraham tell Pharaoh about Sarah?", options: [{ label: "A", text: "She is my sister" }, { label: "B", text: "She is my wife" }, { label: "C", text: "She is my daughter" }, { label: "D", text: "She is my cousin" }], correctAnswer: "A", verse: "Genesis 12:19", explanation: "Abraham said Sarah was his sister, which was technically true. He feared Pharaoh would kill him. This showed Abraham's lack of faith. God protected Sarah despite Abraham's deception." },
  { id: "abraham08", question: "Who suggested that Abram and Lot should separate?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Lot" }, { label: "C", text: "Their herdsmen" }, { label: "D", text: "God" }], correctAnswer: "A", verse: "Genesis 13:8-9", explanation: "Abram suggested they separate so there would be no strife between them. He let Lot choose which way to go, and Lot chose the plain of Jordan." },
  { id: "abraham09", question: "What did God promise Abraham after Lot left?", options: [{ label: "A", text: "All the land he could see" }, { label: "B", text: "Great wealth" }, { label: "C", text: "Victory over Egypt" }, { label: "D", text: "Power over kings" }], correctAnswer: "A", verse: "Genesis 13:14-15", explanation: "God told Abraham to look in all directions. All the land he saw would be his. This was an expansion of the promise. Abraham's descendants would inherit this land." },
  { id: "abraham10", question: "Where did the kings join in battle before Lot was taken captive?", options: [{ label: "A", text: "The plain of Mamre" }, { label: "B", text: "The wilderness of Paran" }, { label: "C", text: "The vale of Siddim" }, { label: "D", text: "The plain of Moreh" }], correctAnswer: "C", verse: "Genesis 14:8", explanation: "Four kings fought against five in the vale of Siddim. Lot was taken captive, and Abram went after them to rescue him." },
  { id: "abraham11", question: "Who blessed Abraham after the battle?", options: [{ label: "A", text: "Melchizedek" }, { label: "B", text: "Pharaoh" }, { label: "C", text: "Abimelech" }, { label: "D", text: "Lot" }], correctAnswer: "A", verse: "Genesis 14:18-19", explanation: "Melchizedek, king of Salem and priest of God Most High, blessed Abraham. He brought bread and wine. Abraham gave him a tenth. This foreshadowed Christ's priesthood." },
  { id: "abraham12", question: "Why was Abram troubled when God promised him a great reward?", options: [{ label: "A", text: "He was poor" }, { label: "B", text: "He was sick" }, { label: "C", text: "He was childless" }, { label: "D", text: "He had lost a battle" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Abraham had no children and was childless. He thought Eliezer would be his heir. This showed Abraham's impatience. God reassured him of descendants." },
  { id: "abraham13", question: "What did Abram do with the animals God told him to bring?", options: [{ label: "A", text: "Set them free" }, { label: "B", text: "Cut them in half and laid the pieces opposite each other" }, { label: "C", text: "Sold them" }, { label: "D", text: "Gave them to Lot" }], correctAnswer: "B", verse: "Genesis 15:10", explanation: "God had Abraham cut animals in half. A smoking fire pot passed between them. This was an ancient covenant ritual. God alone passed through, binding Himself." },
  { id: "abraham14", question: "How many years did God say Abram's descendants would be afflicted in a land that was not theirs?", options: [{ label: "A", text: "10 years" }, { label: "B", text: "25 years" }, { label: "C", text: "400 years" }, { label: "D", text: "430 years" }], correctAnswer: "C", verse: "Genesis 15:13", explanation: "God said Abraham's descendants would be strangers in a foreign land for 400 years. They would be enslaved and mistreated. Then God would judge and deliver them. This predicted Israel's Egyptian bondage." },
  { id: "abraham15", question: "What did Sarah suggest to Abraham?", options: [{ label: "A", text: "Pray for a child" }, { label: "B", text: "Have a child with Hagar" }, { label: "C", text: "Adopt a child" }, { label: "D", text: "Wait for God" }], correctAnswer: "B", verse: "Genesis 16:2", explanation: "Sarah suggested Abraham have a child with her Egyptian maidservant Hagar. This was Sarah's plan to fulfill God's promise. It created family conflict. Abraham agreed to this human solution." },
  { id: "abraham16", question: "What does the name Ishmael mean?", options: [{ label: "A", text: "God hears" }, { label: "B", text: "God laughs" }, { label: "C", text: "God sees" }, { label: "D", text: "God provides" }], correctAnswer: "A", verse: "Genesis 16:11", explanation: "The angel told Hagar to name her son Ishmael, meaning 'God hears.' God heard Hagar's affliction. Ishmael would be a wild donkey of a man. He would live in hostility with relatives." },
  { id: "abraham17", question: "What was Abraham's age when Ishmael was born?", options: [{ label: "A", text: "75" }, { label: "B", text: "86" }, { label: "C", text: "99" }, { label: "D", text: "100" }], correctAnswer: "B", verse: "Genesis 16:16", explanation: "Abraham was 86 years old when Ishmael was born. This was 11 years after arriving in Canaan. Ishmael was Abraham's firstborn son. He became father of 12 princes." },
  { id: "abraham18", question: "What new name did God give Abraham's wife Sarai?", options: [{ label: "A", text: "Sarah" }, { label: "B", text: "Rebekah" }, { label: "C", text: "Rachel" }, { label: "D", text: "Leah" }], correctAnswer: "A", verse: "Genesis 17:15", explanation: "God told Abraham not to call his wife Sarai any more. Her name would be Sarah." },
  { id: "abraham19", question: "What was the sign of God's covenant?", options: [{ label: "A", text: "Circumcision" }, { label: "B", text: "Sacrifices" }, { label: "C", text: "Altars" }, { label: "D", text: "Pillars" }], correctAnswer: "A", verse: "Genesis 17:10", explanation: "Circumcision was the sign of the covenant. Every male was to be circumcised. This was a physical sign of faith. It marked belonging to God's covenant people." },
  { id: "abraham20", question: "What made Abraham fall on his face and laugh?", options: [{ label: "A", text: "God's promise of a son in his old age" }, { label: "B", text: "Lot's choice of land" }, { label: "C", text: "Pharaoh's gifts" }, { label: "D", text: "The name Ishmael" }], correctAnswer: "A", verse: "Genesis 17:17", explanation: "Abraham fell facedown and laughed when God promised a son. He thought it impossible at 100 years old. God said Sarah would have a son. Abraham's laughter showed doubt." },
  { id: "abraham21", question: "What did Abraham's visitor promise about Sarah?", options: [{ label: "A", text: "She would go back to Egypt" }, { label: "B", text: "She would be healed of a sickness" }, { label: "C", text: "She would have a son" }, { label: "D", text: "She would see Sodom destroyed" }], correctAnswer: "C", verse: "Genesis 18:10", explanation: "The visitors told Abraham Sarah would have a son. They also revealed Sodom's destruction. Abraham interceded for the righteous. This showed God's judgment and mercy." },
  { id: "abraham22", question: "What did Sarah laugh about?", options: [{ label: "A", text: "The visitors" }, { label: "B", text: "The meal Abraham served" }, { label: "C", text: "Having a child in her old age" }, { label: "D", text: "The heat of the day" }], correctAnswer: "C", verse: "Genesis 18:12", explanation: "Sarah laughed to herself about having a child. She was past childbearing age. The visitor asked why she laughed. Sarah denied laughing but was rebuked." },
  { id: "abraham23", question: "What was Abraham's nephew's name?", options: [{ label: "A", text: "Lot" }, { label: "B", text: "Ishmael" }, { label: "C", text: "Isaac" }, { label: "D", text: "Jacob" }], correctAnswer: "A", verse: "Genesis 11:27", explanation: "Lot was Abraham's nephew, son of Haran. He traveled with Abraham from Ur. They separated due to land disputes. Lot chose the well-watered Jordan plain." },
  { id: "abraham24", question: "Toward which city did Lot pitch his tent?", options: [{ label: "A", text: "Sodom" }, { label: "B", text: "Bethel" }, { label: "C", text: "Hebron" }, { label: "D", text: "Zoar" }], correctAnswer: "A", verse: "Genesis 13:12", explanation: "Lot pitched his tents near Sodom. Sodom was well-watered like Egypt. The men of Sodom were wicked. Lot's choice led to captivity and loss." },
  { id: "abraham25", question: "What was the smallest number of righteous people for which Abraham asked God to spare Sodom?", options: [{ label: "A", text: "10" }, { label: "B", text: "50" }, { label: "C", text: "45" }, { label: "D", text: "40" }], correctAnswer: "A", verse: "Genesis 18:32", explanation: "Abraham bargained down from 50 to 45, then 40, 30, 20, and finally 10. He asked if God would spare for 10 righteous. This showed Abraham's boldness in intercession." },
  { id: "abraham26", question: "Who led Lot out of Sodom before it was destroyed?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "The angels" }, { label: "C", text: "His sons in law" }, { label: "D", text: "The king of Sodom" }], correctAnswer: "B", verse: "Genesis 19:16", explanation: "Two angels rescued Lot and his family from Sodom. They urged them to hurry. Lot's sons-in-law thought it was a joke. Only Lot, his wife, and two daughters escaped." },
  { id: "abraham27", question: "What happened to Lot's wife?", options: [{ label: "A", text: "She became a pillar of salt" }, { label: "B", text: "She was burned" }, { label: "C", text: "She drowned" }, { label: "D", text: "She was captured" }], correctAnswer: "A", verse: "Genesis 19:26", explanation: "Lot's wife looked back and became a pillar of salt. She disobeyed the angels' warning. This showed the seriousness of God's judgment. Looking back represented longing for sinful ways." },
  { id: "abraham28", question: "What did Abraham name his son with Sarah?", options: [{ label: "A", text: "Isaac" }, { label: "B", text: "Ishmael" }, { label: "C", text: "Jacob" }, { label: "D", text: "Joseph" }], correctAnswer: "A", verse: "Genesis 21:3", explanation: "Abraham named his son Isaac, meaning 'he laughs.' This referred to Abraham's laughter of doubt. Isaac represented joy and fulfillment. He was the child of promise." },
  { id: "abraham29", question: "How old was Abraham when Isaac was born?", options: [{ label: "A", text: "86" }, { label: "B", text: "99" }, { label: "C", text: "100" }, { label: "D", text: "110" }], correctAnswer: "C", verse: "Genesis 21:5", explanation: "Abraham was 100 years old when Isaac was born. Sarah was 90 years old. This miraculous birth showed God's power. It fulfilled God's promise despite human impossibility." },
  { id: "abraham30", question: "What did Sarah want Abraham to do with Ishmael?", options: [{ label: "A", text: "Bless him" }, { label: "B", text: "Send him away" }, { label: "C", text: "Make him heir" }, { label: "D", text: "Teach him" }], correctAnswer: "B", verse: "Genesis 21:10", explanation: "Sarah saw Ishmael mocking Isaac. She wanted Abraham to send Hagar and Ishmael away. This created family conflict. Abraham was distressed but God reassured him." },
  { id: "abraham31", question: "What did God promise to make of Ishmael?", options: [{ label: "A", text: "A priest" }, { label: "B", text: "An heir with Isaac" }, { label: "C", text: "A nation" }, { label: "D", text: "A servant of Isaac" }], correctAnswer: "C", verse: "Genesis 21:13", explanation: "God said Ishmael would become a nation. He would be blessed because he was Abraham's son. God heard Ishmael's cry. This showed God's care for all Abraham's children." },
  { id: "abraham32", question: "In which wilderness did Ishmael live when he grew up?", options: [{ label: "A", text: "The wilderness of Shur" }, { label: "B", text: "The wilderness of Zin" }, { label: "C", text: "The wilderness of Paran" }, { label: "D", text: "The wilderness of Sinai" }], correctAnswer: "C", verse: "Genesis 21:21", explanation: "After he was sent away, Ishmael grew up and became an archer. He lived in the wilderness of Paran, and his mother took him a wife from Egypt." },
  { id: "abraham33", question: "What did Abimelech give Abraham?", options: [{ label: "A", text: "Sheep, oxen and servants" }, { label: "B", text: "A walled city" }, { label: "C", text: "Chariots and horses" }, { label: "D", text: "A crown of gold" }], correctAnswer: "A", verse: "Genesis 20:14", explanation: "Abimelech gave Abraham sheep, oxen, menservants and womenservants, and gave Sarah back to him. He also told Abraham he could live wherever he pleased in his land." },
  { id: "abraham34", question: "What did Abraham call the place where he and Abimelech swore an oath?", options: [{ label: "A", text: "Bethel" }, { label: "B", text: "Mamre" }, { label: "C", text: "Beer-sheba" }, { label: "D", text: "Moriah" }], correctAnswer: "C", verse: "Genesis 21:31", explanation: "Abraham dug a well called Beer-sheba, meaning 'well of seven' or 'well of oath.' He made a treaty with Abimelech. They swore an oath there. This established peaceful relations." },
  { id: "abraham35", question: "What test did God give Abraham?", options: [{ label: "A", text: "Sacrifice Isaac" }, { label: "B", text: "Give away wealth" }, { label: "C", text: "Leave Canaan" }, { label: "D", text: "Circumcise himself" }], correctAnswer: "A", verse: "Genesis 22:2", explanation: "God told Abraham to sacrifice Isaac on Mount Moriah. This tested Abraham's faith. Abraham obeyed, believing God would provide. This was the ultimate test of trust." },
  { id: "abraham36", question: "What did Abraham answer when Isaac asked where the lamb was?", options: [{ label: "A", text: "God will provide himself a lamb" }, { label: "B", text: "The lamb is at home" }, { label: "C", text: "The young men have the lamb" }, { label: "D", text: "There will be no offering" }], correctAnswer: "A", verse: "Genesis 22:8", explanation: "Abraham said 'God will provide for himself the lamb.' He trusted God's provision. Isaac carried the wood. Abraham carried the fire and knife. This foreshadowed Christ's sacrifice." },
  { id: "abraham37", question: "How did Abraham answer when the angel of the LORD called his name from heaven?", options: [{ label: "A", text: "Here am I" }, { label: "B", text: "Who art thou?" }, { label: "C", text: "Speak, Lord" }, { label: "D", text: "I am afraid" }], correctAnswer: "A", verse: "Genesis 22:11", explanation: "The angel of the LORD called from heaven, 'Abraham, Abraham.' He answered, 'Here am I.' Then the angel told him not to lay his hand on the lad." },
  { id: "abraham38", question: "What did Abraham call the place where God provided a ram instead of Isaac?", options: [{ label: "A", text: "Mount Moriah" }, { label: "B", text: "Jehovah-jireh" }, { label: "C", text: "Beer-sheba" }, { label: "D", text: "Bethel" }], correctAnswer: "B", verse: "Genesis 22:14", explanation: "Abraham called the place Jehovah-jireh, a name that means the LORD will provide. God had provided a ram caught in a thicket for the offering." },
  { id: "abraham39", question: "Who was Abraham's wife after Sarah died?", options: [{ label: "A", text: "Hagar" }, { label: "B", text: "Keturah" }, { label: "C", text: "Rebekah" }, { label: "D", text: "Rachel" }], correctAnswer: "B", verse: "Genesis 25:1", explanation: "Abraham married Keturah after Sarah's death. She bore him six sons. These became additional nations. Abraham provided for all his children. He sent them eastward." },
  { id: "abraham40", question: "How old was Abraham when he died?", options: [{ label: "A", text: "175" }, { label: "B", text: "150" }, { label: "C", text: "200" }, { label: "D", text: "125" }], correctAnswer: "A", verse: "Genesis 25:7", explanation: "Abraham lived 175 years. He died at a good old age. He was gathered to his people. Isaac and Ishmael buried him. This showed a full life of faith." },
  { id: "abraham41", question: "Where was Abraham buried?", options: [{ label: "A", text: "Cave of Machpelah" }, { label: "B", text: "Garden tomb" }, { label: "C", text: "Family tomb" }, { label: "D", text: "Royal tomb" }], correctAnswer: "A", verse: "Genesis 25:9", explanation: "Abraham was buried in the Cave of Machpelah near Mamre. Sarah was already buried there. Isaac and Ishmael buried him. This became the family burial place." },
  { id: "abraham42", question: "What did God count Abram's belief as?", options: [{ label: "A", text: "Righteousness" }, { label: "B", text: "Foolishness" }, { label: "C", text: "Pride" }, { label: "D", text: "Weakness" }], correctAnswer: "A", verse: "Genesis 15:6", explanation: "Abraham believed God and it was credited to him as righteousness. This was before circumcision. Faith, not works, saves. Abraham is the father of all who believe." },
  { id: "abraham43", question: "What land did God promise Abraham?", options: [{ label: "A", text: "From the river of Egypt to the Euphrates" }, { label: "B", text: "Only the city of Hebron" }, { label: "C", text: "The land of Ur" }, { label: "D", text: "The land of Midian" }], correctAnswer: "A", verse: "Genesis 15:18", explanation: "God promised Abram's descendants the land from the river of Egypt to the great river Euphrates. The next verses list the peoples who lived there." },
  { id: "abraham44", question: "How did Abraham acquire the Cave of Machpelah?", options: [{ label: "A", text: "Bought it" }, { label: "B", text: "Inherited it" }, { label: "C", text: "Conquered it" }, { label: "D", text: "Was given it" }], correctAnswer: "A", verse: "Genesis 23:16", explanation: "Abraham bought the cave from Ephron the Hittite. He paid 400 shekels of silver. This was the first land ownership in Canaan. It showed Abraham's faith in the promise." },
  { id: "abraham45", question: "What did Melchizedek bring out to Abram?", options: [{ label: "A", text: "Bread and wine" }, { label: "B", text: "Gold and silver" }, { label: "C", text: "Sheep and oxen" }, { label: "D", text: "A sword and a shield" }], correctAnswer: "A", verse: "Genesis 14:18", explanation: "Melchizedek, king of Salem and priest of the most high God, brought out bread and wine. Then he blessed Abram." },
  { id: "abraham46", question: "What did Abraham do when he saw three men standing near his tent?", options: [{ label: "A", text: "Ran to meet them and bowed to the ground" }, { label: "B", text: "Hid inside his tent" }, { label: "C", text: "Sent a servant to ask their names" }, { label: "D", text: "Told them to leave" }], correctAnswer: "A", verse: "Genesis 18:2", explanation: "Abraham welcomed three strangers. He bowed low and offered hospitality. He prepared a feast for them. This showed Middle Eastern hospitality. The visitors were angels." },
  { id: "abraham47", question: "For which city did Abraham plead with God?", options: [{ label: "A", text: "Sodom" }, { label: "B", text: "Jericho" }, { label: "C", text: "Babylon" }, { label: "D", text: "Nineveh" }], correctAnswer: "A", verse: "Genesis 18:23-26", explanation: "Abraham boldly interceded for Sodom. He bargained with God for the righteous. He started at 50 and went to 10. This showed intimate relationship with God." },
  { id: "abraham48", question: "What was Abram very rich in?", options: [{ label: "A", text: "Cattle, silver and gold" }, { label: "B", text: "Ships and spices" }, { label: "C", text: "Chariots and horses" }, { label: "D", text: "Vineyards and olive trees" }], correctAnswer: "A", verse: "Genesis 13:2", explanation: "Abraham was very wealthy in livestock, silver, and gold. God blessed him materially. His wealth was a sign of favor. He used it to bless others." },
  { id: "abraham49", question: "What does the Bible call Abraham in relation to God?", options: [{ label: "A", text: "God's enemy" }, { label: "B", text: "A stranger to God" }, { label: "C", text: "God's friend" }, { label: "D", text: "God's scribe" }], correctAnswer: "C", verse: "2 Chronicles 20:7", explanation: "Abraham is called God's friend. He walked with God. He obeyed God's commands. Friendship involves trust and intimacy. Abraham's faith made him God's friend." },
  { id: "abraham50", question: "How many princes did God say Ishmael would father?", options: [{ label: "A", text: "Twelve" }, { label: "B", text: "Two" }, { label: "C", text: "Seven" }, { label: "D", text: "Forty" }], correctAnswer: "A", verse: "Genesis 17:20", explanation: "God told Abraham He had blessed Ishmael. Ishmael would father twelve princes and become a great nation." },
  { id: "abraham51", question: "Who was Abram's father?", options: [{ label: "A", text: "Nahor" }, { label: "B", text: "Haran" }, { label: "C", text: "Terah" }, { label: "D", text: "Lot" }], correctAnswer: "C", verse: "Genesis 11:27", explanation: "Terah was the father of Abram, Nahor and Haran. Haran was the father of Lot." },
  { id: "abraham52", question: "Between which two places did Abram pitch his tent and build an altar?", options: [{ label: "A", text: "Sodom and Gomorrah" }, { label: "B", text: "Ur and Haran" }, { label: "C", text: "Bethel and Hai" }, { label: "D", text: "Dan and Beer-sheba" }], correctAnswer: "C", verse: "Genesis 12:8", explanation: "Abram moved to a mountain with Bethel on the west and Hai on the east. He built an altar there and called on the name of the LORD." },
  { id: "abraham53", question: "Why did Abram ask Sarai to say she was his sister?", options: [{ label: "A", text: "He was afraid the Egyptians would kill him" }, { label: "B", text: "He wanted to trade with Pharaoh" }, { label: "C", text: "God told him to say it" }, { label: "D", text: "Sarai asked him to" }], correctAnswer: "A", verse: "Genesis 12:12", explanation: "Abram thought the Egyptians would see Sarai, say she was his wife, and kill him. So he asked her to say she was his sister." },
  { id: "abraham54", question: "What did Abram offer Lot when their herdsmen quarrelled?", options: [{ label: "A", text: "First choice of which way to go" }, { label: "B", text: "Half of his cattle" }, { label: "C", text: "A share of his silver" }, { label: "D", text: "His best servants" }], correctAnswer: "A", verse: "Genesis 13:9", explanation: "Abraham let Lot choose first. He took the less desirable land. This prevented family conflict. Abraham valued relationships over possessions." },
  { id: "abraham55", question: "How many trained servants did Abram arm to rescue Lot?", options: [{ label: "A", text: "70" }, { label: "B", text: "120" }, { label: "C", text: "318" }, { label: "D", text: "600" }], correctAnswer: "C", verse: "Genesis 14:14", explanation: "When Abram heard that Lot was taken captive, he armed 318 trained servants born in his own house. He pursued the kings and brought Lot back." },
  { id: "abraham56", question: "What portion of everything did Abram give to Melchizedek?", options: [{ label: "A", text: "A tenth" }, { label: "B", text: "Half" }, { label: "C", text: "All" }, { label: "D", text: "Nothing" }], correctAnswer: "A", verse: "Genesis 14:20", explanation: "Abraham gave a tenth of everything to Melchizedek. This honored the priest-king. It showed Abraham's recognition of spiritual authority. Tithing was voluntary worship." },
  { id: "abraham57", question: "Who was the steward of Abram's house?", options: [{ label: "A", text: "Lot of Sodom" }, { label: "B", text: "Mamre the Amorite" }, { label: "C", text: "Eliezer of Damascus" }, { label: "D", text: "Melchizedek of Salem" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Abraham had no child and was old. He thought Eliezer would inherit. God reassured him. Abraham's doubt led to Ishmael's birth." },
  { id: "abraham58", question: "Which of the animals did Abram not cut in half?", options: [{ label: "A", text: "The birds" }, { label: "B", text: "The heifer" }, { label: "C", text: "The she goat" }, { label: "D", text: "The ram" }], correctAnswer: "A", verse: "Genesis 15:10", explanation: "Abram divided the heifer, the she goat and the ram and laid the pieces opposite each other. He did not divide the birds." },
  { id: "abraham59", question: "What did God say Abram's descendants would come out with after their years of affliction?", options: [{ label: "A", text: "Great substance" }, { label: "B", text: "Nothing at all" }, { label: "C", text: "A great army" }, { label: "D", text: "A new king" }], correctAnswer: "A", verse: "Genesis 15:14", explanation: "God said He would judge the nation that Abram's descendants served. Afterward they would come out with great substance." },
  { id: "abraham60", question: "Where did the angel of the LORD find Hagar?", options: [{ label: "A", text: "In Pharaoh's house" }, { label: "B", text: "At the gate of Sodom" }, { label: "C", text: "By a fountain of water in the wilderness" }, { label: "D", text: "On a mountain in Moriah" }], correctAnswer: "C", verse: "Genesis 16:7", explanation: "Hagar had fled from Sarai. The angel of the LORD found her by a fountain of water in the wilderness, on the way to Shur." },
  { id: "abraham61", question: "What did the Almighty God tell Abram when He appeared to him at ninety-nine years old?", options: [{ label: "A", text: "Return to Ur" }, { label: "B", text: "Build me a house" }, { label: "C", text: "Walk before me, and be thou perfect" }, { label: "D", text: "Go down into Egypt" }], correctAnswer: "C", verse: "Genesis 17:1", explanation: "When Abram was ninety-nine, the LORD appeared and said, 'I am the Almighty God; walk before me, and be thou perfect.' Then God spoke of His covenant with him." },
  { id: "abraham62", question: "How old was a baby boy to be when he was circumcised?", options: [{ label: "A", text: "Eight days" }, { label: "B", text: "Forty days" }, { label: "C", text: "One year" }, { label: "D", text: "Thirteen years" }], correctAnswer: "A", verse: "Genesis 17:12", explanation: "God said every man child was to be circumcised when he was eight days old. This applied to those born in the house and those bought with money." },
  { id: "abraham63", question: "How old was Sarah when Abraham laughed at the promise of a son?", options: [{ label: "A", text: "Ninety" }, { label: "B", text: "Sixty" }, { label: "C", text: "Seventy-five" }, { label: "D", text: "One hundred" }], correctAnswer: "A", verse: "Genesis 17:17", explanation: "Abraham said in his heart, 'Shall Sarah, that is ninety years old, bear?' He himself was nearly a hundred." },
  { id: "abraham64", question: "Where was Sarah when she heard the visitor's promise?", options: [{ label: "A", text: "In the tent door" }, { label: "B", text: "At the well" }, { label: "C", text: "In the field" }, { label: "D", text: "Under the tree" }], correctAnswer: "A", verse: "Genesis 18:10", explanation: "The visitor said Sarah would have a son. Sarah heard it in the tent door, which was behind him." },
  { id: "abraham65", question: "What number of righteous people did Abraham start with when he pleaded for Sodom?", options: [{ label: "A", text: "Ten" }, { label: "B", text: "Thirty" }, { label: "C", text: "Fifty" }, { label: "D", text: "One hundred" }], correctAnswer: "C", verse: "Genesis 18:24", explanation: "Abraham pleaded for Sodom. He bargained from 50 to 10 righteous. God would spare for 10. This showed Abraham's compassion." },
  { id: "abraham66", question: "How many of Lot's daughters were brought out of Sodom with him?", options: [{ label: "A", text: "None" }, { label: "B", text: "One" }, { label: "C", text: "Two" }, { label: "D", text: "Seven" }], correctAnswer: "C", verse: "Genesis 19:16", explanation: "While Lot lingered, the men took hold of his hand, his wife's hand and the hands of his two daughters. They brought them out of the city because the LORD was merciful to him." },
  { id: "abraham67", question: "What does the name Isaac mean?", options: [{ label: "A", text: "He laughs" }, { label: "B", text: "God provides" }, { label: "C", text: "God sees" }, { label: "D", text: "God hears" }], correctAnswer: "A", verse: "Genesis 21:6", explanation: "Isaac means 'he laughs.' Both Abraham and Sarah laughed at the promise, and Sarah said, 'God hath made me to laugh.'" },
  { id: "abraham68", question: "What did Abraham do on the day Isaac was weaned?", options: [{ label: "A", text: "Built an altar" }, { label: "B", text: "Dug a well" }, { label: "C", text: "Made a great feast" }, { label: "D", text: "Went to Egypt" }], correctAnswer: "C", verse: "Genesis 21:8", explanation: "Isaac grew and was weaned. Abraham made a great feast the same day." },
  { id: "abraham69", question: "What did Hagar see when God opened her eyes in the wilderness?", options: [{ label: "A", text: "A ram in a thicket" }, { label: "B", text: "A burning bush" }, { label: "C", text: "A well of water" }, { label: "D", text: "A city on a hill" }], correctAnswer: "C", verse: "Genesis 21:19", explanation: "The water in the bottle was gone and Hagar thought her son would die. God opened her eyes and she saw a well of water, and she gave the lad a drink." },
  { id: "abraham70", question: "What did Abraham give Abimelech as a witness that he had dug the well?", options: [{ label: "A", text: "A pillar of stone" }, { label: "B", text: "A golden ring" }, { label: "C", text: "Seven ewe lambs" }, { label: "D", text: "Three measures of meal" }], correctAnswer: "C", verse: "Genesis 21:30", explanation: "Abraham set seven ewe lambs apart. He gave them to Abimelech as a witness that he had dug the well." },
  { id: "abraham71", question: "To which land did God tell Abraham to take Isaac?", options: [{ label: "A", text: "The land of Egypt" }, { label: "B", text: "The land of Shinar" }, { label: "C", text: "The land of Moriah" }, { label: "D", text: "The land of Midian" }], correctAnswer: "C", verse: "Genesis 22:2", explanation: "God told Abraham to take Isaac to the land of Moriah. He was to offer him there on one of the mountains God would tell him of." },
  { id: "abraham72", question: "Who carried the wood for the burnt offering?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "The two young men" }, { label: "C", text: "Isaac" }, { label: "D", text: "The ass" }], correctAnswer: "C", verse: "Genesis 22:6", explanation: "Abraham laid the wood of the burnt offering on Isaac his son. Abraham took the fire and a knife, and they went together." },
  { id: "abraham73", question: "What did the angel tell Abraham not to do?", options: [{ label: "A", text: "Look behind him" }, { label: "B", text: "Return home" }, { label: "C", text: "Lay his hand on the lad" }, { label: "D", text: "Build an altar" }], correctAnswer: "C", verse: "Genesis 22:12", explanation: "The angel said, 'Lay not thine hand upon the lad.' God now knew that Abraham feared Him, because he had not withheld his only son." },
  { id: "abraham74", question: "What did Abraham offer as a burnt offering in place of his son?", options: [{ label: "A", text: "A lamb from his flock" }, { label: "B", text: "A turtledove" }, { label: "C", text: "A ram caught in a thicket" }, { label: "D", text: "A young bullock" }], correctAnswer: "C", verse: "Genesis 22:13", explanation: "Abraham looked up and saw a ram caught in a thicket by its horns. He offered it for a burnt offering in the place of his son." },
  { id: "abraham75", question: "To whom did Abraham give all that he had?", options: [{ label: "A", text: "Ishmael" }, { label: "B", text: "Lot" }, { label: "C", text: "Isaac" }, { label: "D", text: "Eliezer" }], correctAnswer: "C", verse: "Genesis 25:5", explanation: "Abraham gave all that he had to Isaac. To the sons of his concubines he gave gifts and sent them away eastward." },
  { id: "abraham76", question: "Who buried Abraham?", options: [{ label: "A", text: "Lot and his daughters" }, { label: "B", text: "His servants" }, { label: "C", text: "His sons Isaac and Ishmael" }, { label: "D", text: "The sons of Heth" }], correctAnswer: "C", verse: "Genesis 25:9", explanation: "Abraham died in a good old age. His sons Isaac and Ishmael buried him in the cave of Machpelah." },
  { id: "abraham77", question: "Whom did Abraham bury in the cave of Machpelah?", options: [{ label: "A", text: "Hagar" }, { label: "B", text: "Lot" }, { label: "C", text: "Sarah his wife" }, { label: "D", text: "Terah his father" }], correctAnswer: "C", verse: "Genesis 23:19", explanation: "After buying the field from Ephron, Abraham buried Sarah his wife in the cave of Machpelah. Later he was buried there too." },
  { id: "abraham78", question: "The New Testament says Abraham obeyed God's call by faith. What did he not know when he went out?", options: [{ label: "A", text: "Who had called him" }, { label: "B", text: "How old he was" }, { label: "C", text: "Where he was going" }, { label: "D", text: "Who his father was" }], correctAnswer: "C", verse: "Hebrews 11:8", explanation: "By faith Abraham obeyed when he was called to go to a place he would later receive. He went out not knowing where he was going." },
  { id: "abraham79", question: "How old was Abram when he left Haran?", options: [{ label: "A", text: "40" }, { label: "B", text: "60" }, { label: "C", text: "75" }, { label: "D", text: "99" }], correctAnswer: "C", verse: "Genesis 12:4", explanation: "Abram left as the LORD had told him, and Lot went with him. Abram was seventy-five years old when he departed out of Haran." },
  { id: "abraham80", question: "How much silver did Abraham pay Ephron for the field and its cave?", options: [{ label: "A", text: "Thirty pieces" }, { label: "B", text: "One hundred shekels" }, { label: "C", text: "Four hundred shekels" }, { label: "D", text: "One thousand shekels" }], correctAnswer: "C", verse: "Genesis 23:16", explanation: "Abraham weighed out four hundred shekels of silver to Ephron. It bought the field and the cave where he buried Sarah." },
  { id: "abraham81", question: "What did Abraham ask Sarah to make quickly for the three visitors?", options: [{ label: "A", text: "A pot of lentils" }, { label: "B", text: "Dried figs" }, { label: "C", text: "Cakes of fine meal" }, { label: "D", text: "Roasted fish" }], correctAnswer: "C", verse: "Genesis 18:6", explanation: "Abraham hurried into the tent and told Sarah to take three measures of fine meal, knead it and make cakes. He also had a calf prepared." },
  { id: "abraham82", question: "What did Abraham ask God when he drew near to plead for Sodom?", options: [{ label: "A", text: "Wilt thou give me this land?" }, { label: "B", text: "Where is Lot my brother's son?" }, { label: "C", text: "Wilt thou also destroy the righteous with the wicked?" }, { label: "D", text: "Shall Sarah bear a son?" }], correctAnswer: "C", verse: "Genesis 18:23", explanation: "Abraham drew near and asked, 'Wilt thou also destroy the righteous with the wicked?' Then he asked God to spare the city if righteous people were found in it." },
  { id: "abraham83", question: "Why could Abram and Lot not dwell together in the land?", options: [{ label: "A", text: "God had forbidden it" }, { label: "B", text: "Lot wanted to return to Ur" }, { label: "C", text: "Their substance was too great for the land" }, { label: "D", text: "The Canaanites drove them apart" }], correctAnswer: "C", verse: "Genesis 13:6", explanation: "Both men had flocks, herds and tents. Their substance was so great that the land was not able to bear them together." },
  { id: "abraham84", question: "Where did Abraham send his servant to find a wife for Isaac?", options: [{ label: "A", text: "To Egypt" }, { label: "B", text: "To the daughters of the Canaanites" }, { label: "C", text: "To his own country and kindred" }, { label: "D", text: "To Sodom" }], correctAnswer: "C", verse: "Genesis 24:4", explanation: "Abraham did not want Isaac to marry a daughter of the Canaanites. He sent his servant to his own country and kindred to take a wife for Isaac." },
  { id: "abraham85", question: "What did God say would come out of Abraham along with nations?", options: [{ label: "A", text: "Giants" }, { label: "B", text: "Priests of Egypt" }, { label: "C", text: "Kings" }, { label: "D", text: "Angels" }], correctAnswer: "C", verse: "Genesis 17:6", explanation: "God said He would make Abraham exceeding fruitful. Nations would be made of him, and kings would come out of him." },
  { id: "abraham86", question: "What did God say He would do to anyone who cursed Abram?", options: [{ label: "A", text: "Forgive him" }, { label: "B", text: "Bless him" }, { label: "C", text: "Curse him" }, { label: "D", text: "Ignore him" }], correctAnswer: "C", verse: "Genesis 12:3", explanation: "God said He would bless those who blessed Abram and curse the one who cursed him. In Abram all families of the earth would be blessed." },
  { id: "abraham87", question: "In which place did Abram build an altar when he came to live in the plain of Mamre?", options: [{ label: "A", text: "Sodom" }, { label: "B", text: "Haran" }, { label: "C", text: "Hebron" }, { label: "D", text: "Zoar" }], correctAnswer: "C", verse: "Genesis 13:18", explanation: "Abram moved his tent and lived in the plain of Mamre, which is in Hebron. He built an altar to the LORD there." },
  { id: "abraham88", question: "What did the LORD do to Pharaoh's house because of Sarai?", options: [{ label: "A", text: "Blessed it with riches" }, { label: "B", text: "Burned it with fire" }, { label: "C", text: "Plagued it with great plagues" }, { label: "D", text: "Filled it with frogs" }], correctAnswer: "C", verse: "Genesis 12:17", explanation: "Pharaoh had taken Sarai into his house. The LORD plagued Pharaoh and his house with great plagues, and Pharaoh sent Abram and Sarai away." },
  { id: "abraham89", question: "What did Lot see when he looked at the plain of Jordan?", options: [{ label: "A", text: "It was a dry desert" }, { label: "B", text: "It was full of giants" }, { label: "C", text: "It was well watered everywhere" }, { label: "D", text: "It was covered with snow" }], correctAnswer: "C", verse: "Genesis 13:10", explanation: "Lot looked and saw that the plain of Jordan was well watered everywhere, like the garden of the LORD. So he chose it for himself." },
  { id: "abraham90", question: "How far did Abram pursue the kings who had taken Lot captive?", options: [{ label: "A", text: "To Egypt" }, { label: "B", text: "To Beer-sheba" }, { label: "C", text: "To Dan" }, { label: "D", text: "To Ur" }], correctAnswer: "C", verse: "Genesis 14:14", explanation: "Abram armed his trained servants and pursued the kings as far as Dan. He brought back Lot and all the goods." },
  { id: "abraham91", question: "What did Abram say he would take for himself from the king of Sodom's goods?", options: [{ label: "A", text: "Half of the spoil" }, { label: "B", text: "Only the cattle" }, { label: "C", text: "Nothing, not even a thread" }, { label: "D", text: "Only the silver" }], correctAnswer: "C", verse: "Genesis 14:23", explanation: "Abram said he would not take from a thread even to a shoelatchet. He did not want the king of Sodom to say, 'I have made Abram rich.'" },
  { id: "abraham92", question: "What did God tell Abram to try to count as a picture of his descendants?", options: [{ label: "A", text: "The sheep in his flock" }, { label: "B", text: "The trees of Mamre" }, { label: "C", text: "The stars" }, { label: "D", text: "The stones of the altar" }], correctAnswer: "C", verse: "Genesis 15:5", explanation: "God brought Abram outside and told him to look toward heaven and count the stars if he could. Then God said, 'So shall thy seed be.'" },
  { id: "abraham93", question: "What passed between the pieces of the animals after the sun went down?", options: [{ label: "A", text: "A great wind" }, { label: "B", text: "Abram and his servants" }, { label: "C", text: "A smoking furnace and a burning lamp" }, { label: "D", text: "A flock of birds" }], correctAnswer: "C", verse: "Genesis 15:17", explanation: "When the sun went down and it was dark, a smoking furnace and a burning lamp passed between the pieces. That same day the LORD made a covenant with Abram." },
  { id: "abraham94", question: "In which generation did God say Abram's descendants would come back to the land?", options: [{ label: "A", text: "The second" }, { label: "B", text: "The third" }, { label: "C", text: "The fourth" }, { label: "D", text: "The tenth" }], correctAnswer: "C", verse: "Genesis 15:16", explanation: "God said that in the fourth generation they would come back again. The iniquity of the Amorites was not yet full." },
  { id: "abraham95", question: "What did the angel of the LORD tell Hagar to do when she had run away?", options: [{ label: "A", text: "Go down to Egypt" }, { label: "B", text: "Stay by the fountain" }, { label: "C", text: "Return to her mistress and submit to her" }, { label: "D", text: "Go to Lot in Sodom" }], correctAnswer: "C", verse: "Genesis 16:9", explanation: "The angel told Hagar to return to her mistress and submit to her. He also promised that her descendants would be too many to count." },
  { id: "abraham96", question: "Why did God change Abram's name to Abraham?", options: [{ label: "A", text: "He had won a great battle" }, { label: "B", text: "He had left Egypt" }, { label: "C", text: "God had made him a father of many nations" }, { label: "D", text: "He had built an altar" }], correctAnswer: "C", verse: "Genesis 17:5", explanation: "God said his name would be Abraham, 'for a father of many nations have I made thee.' The new name matched God's promise." },
  { id: "abraham97", question: "How old was Ishmael when he was circumcised?", options: [{ label: "A", text: "Eight days" }, { label: "B", text: "Three years" }, { label: "C", text: "Thirteen years" }, { label: "D", text: "Thirty years" }], correctAnswer: "C", verse: "Genesis 17:25", explanation: "Abraham obeyed God the same day. Ishmael his son was thirteen years old when he was circumcised." },
  { id: "abraham98", question: "What did Abraham ask God for Ishmael after hearing that Sarah would have a son?", options: [{ label: "A", text: "That Ishmael might be a king" }, { label: "B", text: "That Ishmael might go to Egypt" }, { label: "C", text: "That Ishmael might live before God" }, { label: "D", text: "That Ishmael might serve Isaac" }], correctAnswer: "C", verse: "Genesis 17:18", explanation: "Abraham said to God, 'O that Ishmael might live before thee!' God answered that Sarah would indeed bear a son, and that He had blessed Ishmael too." },
  { id: "abraham99", question: "What did Sarah do when she was asked why she had laughed?", options: [{ label: "A", text: "She ran away" }, { label: "B", text: "She laughed again" }, { label: "C", text: "She denied it" }, { label: "D", text: "She wept" }], correctAnswer: "C", verse: "Genesis 18:15", explanation: "Sarah was afraid and said, 'I laughed not.' But the answer came, 'Nay; but thou didst laugh.'" },
  { id: "abraham100", question: "What does Paul call Abraham for all who share his faith?", options: [{ label: "A", text: "The king of us all" }, { label: "B", text: "The judge of us all" }, { label: "C", text: "The father of us all" }, { label: "D", text: "The teacher of us all" }], correctAnswer: "C", verse: "Romans 4:16", explanation: "Paul writes that the promise is sure to all who are of the faith of Abraham. He calls Abraham 'the father of us all.'" }
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
  const [earnedCorrectCount, setEarnedCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  // Bring the Next button into view when an answer lands - it renders below
  // the options and sat off screen on phones (user report, 2026-09-05).
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selectedAnswer) return;
    const timer = window.setTimeout(() => {
      nextButtonRef.current?.scrollIntoView({
        block: "end",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [selectedAnswer]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);
        
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
          const payload = (await response.json().catch(() => ({}))) as { awardedPoint?: boolean };
          if (payload.awardedPoint) {
            setEarnedCorrectCount((current) => current + 1);
          }
          console.log('Successfully recorded trivia answer');
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

  useEffect(() => {
    if (!showResults || earnedCorrectCount <= 0) return;
    triggerPoints(earnedCorrectCount);
  }, [showResults, earnedCorrectCount]);

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
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition" style={{ color: "#ffffff" }}
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition" style={{ color: "#374151" }}
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
            className="grid w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 [grid-area:1/1]"
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
              className="w-full bg-white rounded-2xl shadow-lg p-8 [grid-area:1/1]"
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
                ref={nextButtonRef}
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



