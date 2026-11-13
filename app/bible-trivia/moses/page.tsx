"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { bibleLockActivityCompleted } from "@/lib/bibleLockActivities";
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
  { id: "moses01", question: "Where was Moses born?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Canaan" }, { label: "C", text: "Midian" }, { label: "D", text: "Sinai" }], correctAnswer: "A", verse: "Exodus 2:1-2", explanation: "Moses was born in Egypt during the time when the Israelites were enslaved. His birth came at a dangerous time when Pharaoh ordered Hebrew baby boys killed. God protected Moses through his family." },
  { id: "moses02", question: "Why did Pharaoh's daughter name the child Moses?", options: [{ label: "A", text: "Because he cried loudly" }, { label: "B", text: "Because he was a Hebrew" }, { label: "C", text: "Because she drew him out of the water" }, { label: "D", text: "Because he was found at night" }], correctAnswer: "C", verse: "Exodus 2:10", explanation: "Moses means 'drawn out' from the water. Pharaoh's daughter named him Moses when she drew him out of the Nile. This name foreshadowed his role in delivering Israel from Egypt." },
  { id: "moses03", question: "Where did Moses flee when Pharaoh sought to kill him?", options: [{ label: "A", text: "Canaan" }, { label: "B", text: "Midian" }, { label: "C", text: "Goshen" }, { label: "D", text: "Ethiopia" }], correctAnswer: "B", verse: "Exodus 2:15", explanation: "Moses fled to Midian after killing an Egyptian taskmaster. He became a fugitive and shepherd. This 40-year period prepared him for leadership. God used this time to humble Moses." },
  { id: "moses04", question: "What did Moses see at the burning bush?", options: [{ label: "A", text: "A snake" }, { label: "B", text: "Fire that didn't burn up the bush" }, { label: "C", text: "A golden calf" }, { label: "D", text: "The promised land" }], correctAnswer: "B", verse: "Exodus 3:2", explanation: "Moses saw a bush that was on fire but not consumed. This miraculous sight got his attention. God spoke to Moses from this bush. The burning bush represented God's presence." },
  { id: "moses05", question: "What did God answer when Moses asked what name he should give the children of Israel?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Adonai" }, { label: "C", text: "I AM THAT I AM" }, { label: "D", text: "The Most High" }], correctAnswer: "C", verse: "Exodus 3:14", explanation: "God said 'I AM THAT I AM' - YHWH in Hebrew. This name means God is self-existent and eternal. It revealed God's unchanging nature. Moses was to tell Israel 'I AM' sent him." },
  { id: "moses06", question: "Who was Moses' brother?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Miriam" }, { label: "C", text: "Joshua" }, { label: "D", text: "Caleb" }], correctAnswer: "A", verse: "Exodus 4:14", explanation: "Aaron was Moses' older brother. God appointed Aaron as Moses' spokesman. Aaron became the first high priest. The brothers worked together in leading Israel." },
  { id: "moses07", question: "What sign did God give Moses?", options: [{ label: "A", text: "Staff turning to snake" }, { label: "B", text: "Water from rock" }, { label: "C", text: "Manna from heaven" }, { label: "D", text: "Pillar of fire" }], correctAnswer: "A", verse: "Exodus 4:3", explanation: "Moses' staff became a snake when thrown down. This demonstrated God's power over creation. The sign convinced others of Moses' divine calling. God performed miracles through Moses' staff." },
  { id: "moses08", question: "What excuse did Moses give God for not wanting to go?", options: [{ label: "A", text: "I am too young" }, { label: "B", text: "I am not eloquent" }, { label: "C", text: "I am too old" }, { label: "D", text: "I am too rich" }], correctAnswer: "B", verse: "Exodus 4:10", explanation: "Moses said 'I am slow of speech and tongue.' He felt inadequate for public speaking. God promised to help him speak. Moses learned God equips those He calls." },
  { id: "moses09", question: "What happened to Moses' hand?", options: [{ label: "A", text: "It became leprous" }, { label: "B", text: "It grew longer" }, { label: "C", text: "It caught fire" }, { label: "D", text: "It turned to gold" }], correctAnswer: "A", verse: "Exodus 4:6", explanation: "Moses' hand became leprous then was healed. This was another sign of God's power. Leprosy represented death and uncleanness. God demonstrated His authority over disease." },
  { id: "moses10", question: "Who did Moses marry?", options: [{ label: "A", text: "Zipporah" }, { label: "B", text: "Miriam" }, { label: "C", text: "Rahab" }, { label: "D", text: "Deborah" }], correctAnswer: "A", verse: "Exodus 2:21", explanation: "Moses married Zipporah, daughter of Reuel/Jethro. She was from Midian. Zipporah saved Moses' life by circumcising their son. She became Moses' wife and helper." },
  { id: "moses11", question: "What was the first plague?", options: [{ label: "A", text: "Frogs" }, { label: "B", text: "Blood" }, { label: "C", text: "Locusts" }, { label: "D", text: "Boils" }], correctAnswer: "B", verse: "Exodus 7:20", explanation: "The Nile River turned to blood. All water in Egypt became blood. Fish died and the water stank. This showed God's power over creation. Pharaoh's magicians could do the same temporarily." },
  { id: "moses12", question: "What did Aaron's staff become?", options: [{ label: "A", text: "A tree" }, { label: "B", text: "A snake" }, { label: "C", text: "A flower" }, { label: "D", text: "A rock" }], correctAnswer: "B", verse: "Exodus 7:10", explanation: "Aaron's staff became a snake before Pharaoh. This was the first miracle before Pharaoh. Pharaoh's magicians did the same with their staffs. Aaron's snake swallowed the others' snakes." },
  { id: "moses13", question: "What did the dust of the land become when Aaron struck it with his rod?", options: [{ label: "A", text: "Flies" }, { label: "B", text: "Locusts" }, { label: "C", text: "Lice" }, { label: "D", text: "Frogs" }], correctAnswer: "C", verse: "Exodus 8:16-17", explanation: "Aaron struck the dust and it became lice on man and beast throughout Egypt. The magicians could not copy this plague and said, 'This is the finger of God.'" },
  { id: "moses14", question: "Which plague came after the river was turned to blood?", options: [{ label: "A", text: "Frogs" }, { label: "B", text: "Locusts" }, { label: "C", text: "Flies" }, { label: "D", text: "Bees" }], correctAnswer: "A", verse: "Exodus 8:6", explanation: "Frogs covered the land of Egypt. They were in houses, beds, and ovens. Pharaoh begged Moses to remove them. The frogs died and caused a stench. This showed God's power over amphibians." },
  { id: "moses15", question: "What happened to the cattle of Egypt in the plague that spared the cattle of Israel?", options: [{ label: "A", text: "They died" }, { label: "B", text: "They turned to stone" }, { label: "C", text: "They ran away" }, { label: "D", text: "They multiplied" }], correctAnswer: "A", verse: "Exodus 9:6", explanation: "A severe plague killed Egyptian livestock. Horses, donkeys, camels, cattle, sheep, and goats died. Israelite animals were spared. This affected Egypt's economy and military power." },
  { id: "moses16", question: "Who was struck by the plague of boils?", options: [{ label: "A", text: "Man and beast" }, { label: "B", text: "Only the animals" }, { label: "C", text: "Only Pharaoh" }, { label: "D", text: "Only the Israelites" }], correctAnswer: "A", verse: "Exodus 9:10", explanation: "Painful boils broke out on people and animals. Even Pharaoh's magicians were afflicted. They couldn't stand before Moses. This plague affected everyone including magicians." },
  { id: "moses17", question: "What was mingled with the hail that fell on Egypt?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Snow" }, { label: "C", text: "Blood" }, { label: "D", text: "Ashes" }], correctAnswer: "A", verse: "Exodus 9:24", explanation: "Hail fell with fire flashing in it. This was unprecedented in Egypt. Those who feared God protected their livestock. The hail destroyed crops and people. It was a judgment on Egypt's gods." },
  { id: "moses18", question: "What did the locusts do when they covered Egypt?", options: [{ label: "A", text: "They ate everything the hail had left" }, { label: "B", text: "They sang songs" }, { label: "C", text: "They brought water" }, { label: "D", text: "They healed people" }], correctAnswer: "A", verse: "Exodus 10:15", explanation: "Locusts devoured all remaining vegetation. Nothing green was left in Egypt. This was the worst locust plague ever. It completed the destruction of Egypt's food supply." },
  { id: "moses19", question: "What was the ninth plague?", options: [{ label: "A", text: "Darkness" }, { label: "B", text: "Light" }, { label: "C", text: "Wind" }, { label: "D", text: "Earthquake" }], correctAnswer: "A", verse: "Exodus 10:22", explanation: "Darkness covered Egypt for three days. People couldn't see each other or move. Israelites had light in their dwellings. This darkness was tangible and palpable. It represented judgment on Egypt's sun god Ra." },
  { id: "moses20", question: "What was the tenth plague?", options: [{ label: "A", text: "Death of firstborn" }, { label: "B", text: "Death of Pharaoh" }, { label: "C", text: "Death of animals" }, { label: "D", text: "Death of crops" }], correctAnswer: "A", verse: "Exodus 12:29", explanation: "The Lord struck down all firstborn in Egypt. From Pharaoh to prisoners, all firstborn died. This was the final and most devastating plague. It led to Israel's release from slavery." },
  { id: "moses21", question: "What protected Israelites from the tenth plague?", options: [{ label: "A", text: "The blood of the lamb" }, { label: "B", text: "Their location" }, { label: "C", text: "Their prayers" }, { label: "D", text: "Their wealth" }], correctAnswer: "A", verse: "Exodus 12:13", explanation: "The blood on doorposts was a sign. When God saw the blood, He passed over. This became Passover. The lamb's blood represented substitutionary sacrifice. It foreshadowed Jesus' sacrifice." },
  { id: "moses22", question: "What did Moses lead Israel through?", options: [{ label: "A", text: "The Red Sea" }, { label: "B", text: "The Jordan River" }, { label: "C", text: "The Nile River" }, { label: "D", text: "The Euphrates River" }], correctAnswer: "A", verse: "Exodus 14:22", explanation: "Israel crossed the Red Sea on dry ground. God parted the waters with a strong east wind. Egyptians pursuing them drowned. This was Israel's miraculous deliverance." },
  { id: "moses23", question: "What did God say He would rain from heaven for Israel?", options: [{ label: "A", text: "Bread" }, { label: "B", text: "Fish" }, { label: "C", text: "Fruit" }, { label: "D", text: "Gold" }], correctAnswer: "A", verse: "Exodus 16:4", explanation: "God provided manna from heaven. It appeared each morning except Sabbath. Manna means 'What is it?' It sustained Israel for 40 years. It taught dependence on God." },
  { id: "moses24", question: "What did Moses strike to get water?", options: [{ label: "A", text: "A tree" }, { label: "B", text: "A rock" }, { label: "C", text: "The ground" }, { label: "D", text: "His staff" }], correctAnswer: "B", verse: "Exodus 17:6", explanation: "Moses struck the rock at Horeb. Water gushed out for the people. This was God's provision in the desert. The rock represented Christ in the New Testament." },
  { id: "moses25", question: "Who advised Moses to appoint rulers to help him judge the people?", options: [{ label: "A", text: "Jethro" }, { label: "B", text: "Aaron" }, { label: "C", text: "Joshua" }, { label: "D", text: "Caleb" }], correctAnswer: "A", verse: "Exodus 18:21", explanation: "Jethro advised Moses to delegate authority. He suggested captains of thousands, hundreds, etc. This organized leadership structure. Jethro was Moses' father-in-law and priest of Midian." },
  { id: "moses26", question: "On which mountain did Moses go up to meet God after Israel left Egypt?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Hermon" }], correctAnswer: "A", verse: "Exodus 19:20", explanation: "Moses went up Mount Sinai to meet God. God spoke to Moses there. The mountain was covered in smoke and fire. This was where Moses received the Ten Commandments." },
  { id: "moses27", question: "What did God write on tablets?", options: [{ label: "A", text: "The Ten Commandments" }, { label: "B", text: "The history of Israel" }, { label: "C", text: "Moses' genealogy" }, { label: "D", text: "Egyptian laws" }], correctAnswer: "A", verse: "Exodus 31:18", explanation: "God wrote the Ten Commandments on stone tablets. Moses broke the first set in anger. God rewrote them on the second set. These laws formed the basis of Israel's covenant with God." },
  { id: "moses28", question: "What was the first commandment?", options: [{ label: "A", text: "No other gods" }, { label: "B", text: "Honor parents" }, { label: "C", text: "No idols" }, { label: "D", text: "Keep Sabbath" }], correctAnswer: "A", verse: "Exodus 20:3", explanation: "You shall have no other gods before me. This established monotheism. God demanded exclusive worship. All other commandments flowed from this relationship." },
  { id: "moses29", question: "What did Moses do to the golden calf?", options: [{ label: "A", text: "Hid it in his tent" }, { label: "B", text: "Burned it and ground it to powder" }, { label: "C", text: "Kept it as treasure" }, { label: "D", text: "Gave it to Aaron" }], correctAnswer: "B", verse: "Exodus 32:20", explanation: "Moses burned the calf, ground it to powder, and made Israelites drink it. This was judgment on idolatry. The golden calf represented apostasy. Moses' anger showed his zeal for God." },
  { id: "moses30", question: "What did Moses see of God's glory?", options: [{ label: "A", text: "His face" }, { label: "B", text: "His back" }, { label: "C", text: "His hands" }, { label: "D", text: "His feet" }], correctAnswer: "B", verse: "Exodus 33:23", explanation: "Moses saw God's back but not His face. No one can see God's face and live. God's glory passed by Moses. This was a unique privilege for Moses." },
  { id: "moses31", question: "What made Moses' face shine?", options: [{ label: "A", text: "God's glory" }, { label: "B", text: "Egyptian makeup" }, { label: "C", text: "Desert sun" }, { label: "D", text: "His anger" }], correctAnswer: "A", verse: "Exodus 34:29", explanation: "Moses' face shone from being in God's presence. He had to veil his face. This showed the effect of God's glory. The veil represented Moses' unique relationship with God." },
  { id: "moses32", question: "Where did Moses pitch the tabernacle of the congregation?", options: [{ label: "A", text: "Outside the camp, far off" }, { label: "B", text: "In the middle of the camp" }, { label: "C", text: "On top of mount Sinai" }, { label: "D", text: "Beside the Red sea" }], correctAnswer: "A", verse: "Exodus 33:7", explanation: "Moses pitched the tabernacle outside the camp, far off from it. Everyone who sought the LORD went out to it." },
  { id: "moses33", question: "Who showed Moses the pattern for the tabernacle?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "Aaron" }, { label: "C", text: "Bezaleel" }, { label: "D", text: "God" }], correctAnswer: "D", verse: "Exodus 25:9", explanation: "God told Moses to make the tabernacle after the pattern He showed him. Bezaleel and Aholiab were later filled with skill to build it." },
  { id: "moses34", question: "What was the mercy seat made of?", options: [{ label: "A", text: "Shittim wood" }, { label: "B", text: "Brass" }, { label: "C", text: "Pure gold" }, { label: "D", text: "Silver" }], correctAnswer: "C", verse: "Exodus 25:17", explanation: "The mercy seat was made of pure gold and was set on top of the ark. God said He would meet with Moses there." },
  { id: "moses35", question: "What did God tell Moses to put into the ark?", options: [{ label: "A", text: "Gold and silver" }, { label: "B", text: "The testimony God would give him" }, { label: "C", text: "The priests' garments" }, { label: "D", text: "The golden candlestick" }], correctAnswer: "B", verse: "Exodus 25:16", explanation: "God told Moses to put the testimony into the ark. These were the tables of stone with the commandments." },
  { id: "moses36", question: "What was the bronze laver for?", options: [{ label: "A", text: "Baptism" }, { label: "B", text: "Washing hands and feet" }, { label: "C", text: "Drinking water" }, { label: "D", text: "Cooking food" }], correctAnswer: "B", verse: "Exodus 30:18-19", explanation: "Priests washed at the bronze laver. It was for ceremonial cleansing. This represented spiritual purification. Cleanliness was required for ministry." },
  { id: "moses37", question: "How often was Aaron to burn incense on the golden altar?", options: [{ label: "A", text: "Once a year" }, { label: "B", text: "Every morning and evening" }, { label: "C", text: "Only on the sabbath" }, { label: "D", text: "Once a month" }], correctAnswer: "B", verse: "Exodus 30:7-8", explanation: "Aaron was to burn sweet incense every morning when he dressed the lamps and every evening when he lit them. It was a perpetual incense before the LORD." },
  { id: "moses38", question: "What was on the tabernacle by night?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Rain" }, { label: "C", text: "A rainbow" }, { label: "D", text: "Darkness" }], correctAnswer: "A", verse: "Exodus 40:38", explanation: "The cloud of the LORD was on the tabernacle by day, and fire was on it by night. All Israel saw it throughout their journeys." },
  { id: "moses39", question: "What was the sin of Nadab and Abihu?", options: [{ label: "A", text: "Unauthorized fire" }, { label: "B", text: "Stealing" }, { label: "C", text: "Lying" }, { label: "D", text: "Drunkenness" }], correctAnswer: "A", verse: "Leviticus 10:1", explanation: "They offered strange fire before the Lord. God consumed them with fire. This showed the seriousness of worship. God demands worship according to His instructions." },
  { id: "moses40", question: "Which of these animals did the law call unclean?", options: [{ label: "A", text: "The ox" }, { label: "B", text: "The sheep" }, { label: "C", text: "The swine" }, { label: "D", text: "The goat" }], correctAnswer: "C", verse: "Leviticus 11:7", explanation: "The law named clean and unclean animals. The swine was unclean because it divides the hoof but does not chew the cud." },
  { id: "moses41", question: "What were the people told to do on the Day of Atonement?", options: [{ label: "A", text: "Hold a great banquet" }, { label: "B", text: "Afflict their souls and do no work" }, { label: "C", text: "Gather the harvest" }, { label: "D", text: "Go out to battle" }], correctAnswer: "B", verse: "Leviticus 16:29", explanation: "It was the most holy day of the year. The high priest entered the Holy of Holies. Blood was sprinkled for atonement. This foreshadowed Christ's atonement." },
  { id: "moses42", question: "How often did the Year of Jubilee come?", options: [{ label: "A", text: "Every 7 years" }, { label: "B", text: "Every 50 years" }, { label: "C", text: "Every 10 years" }, { label: "D", text: "Every 25 years" }], correctAnswer: "B", verse: "Leviticus 25:10", explanation: "Every 50th year was Jubilee. Slaves were freed and land returned. It was a year of liberation. Jubilee represented God's redemptive work. It taught economic justice." },
  { id: "moses43", question: "What did the people ask when they tempted the LORD at Massah?", options: [{ label: "A", text: "Is the LORD among us, or not?" }, { label: "B", text: "Who is the LORD?" }, { label: "C", text: "Where is Moses?" }, { label: "D", text: "Shall we return to Egypt?" }], correctAnswer: "A", verse: "Exodus 17:7", explanation: "Israel tested God at Massah. They questioned God's presence. Moses struck the rock for water. Massah means 'testing.' It showed Israel's unbelief." },
  { id: "moses44", question: "How many men did Moses send to spy out Canaan?", options: [{ label: "A", text: "Two" }, { label: "B", text: "Twelve" }, { label: "C", text: "Seven" }, { label: "D", text: "Forty" }], correctAnswer: "B", verse: "Numbers 13:2", explanation: "Moses sent twelve spies into Canaan. One from each tribe. Ten gave bad report, two gave good. The majority's unbelief led to 40 years in wilderness." },
  { id: "moses45", question: "Who were the faithful spies?", options: [{ label: "A", text: "Joshua and Caleb" }, { label: "B", text: "Aaron and Hur" }, { label: "C", text: "Eleazar and Ithamar" }, { label: "D", text: "Nadab and Abihu" }], correctAnswer: "A", verse: "Numbers 14:6", explanation: "Joshua and Caleb tore their clothes in grief. They encouraged Israel to enter Canaan. They alone from adults entered promised land. Their faith was rewarded." },
  { id: "moses46", question: "What did Korah and his company accuse Moses and Aaron of?", options: [{ label: "A", text: "Stealing the people's gold" }, { label: "B", text: "Hiding the manna" }, { label: "C", text: "Lifting themselves up above the congregation" }, { label: "D", text: "Worshipping idols" }], correctAnswer: "C", verse: "Numbers 16:3", explanation: "Korah challenged Moses' and Aaron's authority. He wanted priesthood for all Levites. The earth swallowed the rebels. This showed God's choice of leadership." },
  { id: "moses47", question: "What happened to a bitten person who looked at the serpent of brass?", options: [{ label: "A", text: "He fell asleep" }, { label: "B", text: "He lived" }, { label: "C", text: "He became blind" }, { label: "D", text: "He was sent out of the camp" }], correctAnswer: "B", verse: "Numbers 21:9", explanation: "Moses made a bronze serpent on a pole. Looking at it healed snake bites. It represented salvation by faith. Jesus compared it to His crucifixion." },
  { id: "moses48", question: "Who sent messengers to call Balaam to curse Israel?", options: [{ label: "A", text: "Pharaoh king of Egypt" }, { label: "B", text: "Balak king of Moab" }, { label: "C", text: "Og king of Bashan" }, { label: "D", text: "Sihon king of the Amorites" }], correctAnswer: "B", verse: "Numbers 22:4-5", explanation: "Balak king of Moab was afraid of Israel and sent for Balaam to curse them. God opened the mouth of Balaam's ass to rebuke him on the way." },
  { id: "moses49", question: "What did Balaam's donkey do?", options: [{ label: "A", text: "Spoke to Balaam" }, { label: "B", text: "Flew" }, { label: "C", text: "Disappeared" }, { label: "D", text: "Died" }], correctAnswer: "A", verse: "Numbers 22:28", explanation: "The donkey spoke to Balaam. It asked why he beat it. God opened the donkey's mouth. This showed God's sovereignty over creation. Even animals serve God's purposes." },
  { id: "moses50", question: "What was the sin at Baal Peor?", options: [{ label: "A", text: "Idolatry and immorality" }, { label: "B", text: "Stealing" }, { label: "C", text: "Murder" }, { label: "D", text: "Lying" }], correctAnswer: "A", verse: "Numbers 25:1-3", explanation: "Israel committed sexual immorality with Moabite women. They worshipped Baal of Peor. 24,000 died in the plague. This was spiritual adultery against God." },
  { id: "moses51", question: "Who succeeded Moses as leader?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Joshua" }, { label: "C", text: "Caleb" }, { label: "D", text: "Eleazar" }], correctAnswer: "B", verse: "Numbers 27:18", explanation: "God chose Joshua to succeed Moses. Joshua was filled with the spirit of wisdom. He led Israel into Canaan. Joshua means 'The Lord saves.'" },
  { id: "moses52", question: "Which book records the words Moses spoke to all Israel before they crossed the Jordan?", options: [{ label: "A", text: "Genesis" }, { label: "B", text: "Deuteronomy" }, { label: "C", text: "Leviticus" }, { label: "D", text: "Exodus" }], correctAnswer: "B", verse: "Deuteronomy 1:1", explanation: "Deuteronomy contains Moses' final messages. He reviewed Israel's history and laws. It means 'second law.' Moses prepared Israel for life in Canaan." },
  { id: "moses53", question: "Finish the verse: 'Hear, O Israel: The LORD our God is ...'", options: [{ label: "A", text: "a mighty God" }, { label: "B", text: "a consuming fire" }, { label: "C", text: "one LORD" }, { label: "D", text: "a man of war" }], correctAnswer: "C", verse: "Deuteronomy 6:4", explanation: "The verse reads, 'Hear, O Israel: The LORD our God is one LORD.' The next verse calls Israel to love Him with all their heart, soul and might." },
  { id: "moses54", question: "What did Moses say Israel must not do to the word he commanded them?", options: [{ label: "A", text: "Write it down" }, { label: "B", text: "Add to it or take away from it" }, { label: "C", text: "Teach it to their children" }, { label: "D", text: "Read it aloud" }], correctAnswer: "B", verse: "Deuteronomy 4:2", explanation: "Do not add to or subtract from God's commands. The law was complete and perfect. Moses warned against altering Scripture. God's word is sufficient." },
  { id: "moses55", question: "With what did Moses tell Israel to love the LORD their God?", options: [{ label: "A", text: "All their heart, soul and might" }, { label: "B", text: "Their sacrifices alone" }, { label: "C", text: "Their gold and silver" }, { label: "D", text: "Their words only" }], correctAnswer: "A", verse: "Deuteronomy 6:5", explanation: "Love the Lord your God with all your heart, soul, and strength. This summarizes all the law. Jesus affirmed this as greatest. Love is the foundation of obedience." },
  { id: "moses56", question: "What were parents to teach diligently to their children?", options: [{ label: "A", text: "The customs of Egypt" }, { label: "B", text: "The art of war" }, { label: "C", text: "The names of the stars" }, { label: "D", text: "The words God commanded them" }], correctAnswer: "D", verse: "Deuteronomy 6:7", explanation: "Impress God's commands on your children. Talk about them at home and on journeys. Bind them on hands and foreheads. Faith must be passed to next generation." },
  { id: "moses57", question: "How could Israel know that a prophet had not spoken the LORD's word?", options: [{ label: "A", text: "He worked no miracles" }, { label: "B", text: "The thing he said did not come to pass" }, { label: "C", text: "He was a poor man" }, { label: "D", text: "He came from another tribe" }], correctAnswer: "B", verse: "Deuteronomy 18:22", explanation: "If a prophet speaks in the Lord's name but the word does not come to pass, he is a false prophet. Accuracy tested true prophecy. God holds prophets accountable." },
  { id: "moses58", question: "How many cities of refuge was Israel to have in all?", options: [{ label: "A", text: "Six" }, { label: "B", text: "Two" }, { label: "C", text: "Twelve" }, { label: "D", text: "One" }], correctAnswer: "A", verse: "Numbers 35:13", explanation: "Six cities provided refuge for accidental killers. They were east and west of Jordan. Refuge prevented blood feuds. Justice required fair trial." },
  { id: "moses59", question: "What was a king of Israel forbidden to multiply for himself?", options: [{ label: "A", text: "Books" }, { label: "B", text: "Servants" }, { label: "C", text: "Cities" }, { label: "D", text: "Horses" }], correctAnswer: "D", verse: "Deuteronomy 17:16", explanation: "Kings must not trust in military power or wealth. They must study God's law daily. Kings were subject to God's law. Power corrupts without godliness." },
  { id: "moses60", question: "Who was to eat from the tithe laid up at the end of every three years?", options: [{ label: "A", text: "The king and his court" }, { label: "B", text: "The captains of the army" }, { label: "C", text: "The merchants" }, { label: "D", text: "The Levite, the stranger, the fatherless and the widow" }], correctAnswer: "D", verse: "Deuteronomy 14:28-29", explanation: "At the end of three years the tithe was laid up within the gates. The Levite, the stranger, the fatherless and the widow came and ate and were satisfied." },
  { id: "moses61", question: "What did God say the song He told Moses to write would be?", options: [{ label: "A", text: "A song of victory in battle" }, { label: "B", text: "A witness for Him against the children of Israel" }, { label: "C", text: "A song for the harvest" }, { label: "D", text: "A wedding song" }], correctAnswer: "B", verse: "Deuteronomy 31:19", explanation: "Moses taught Israel a prophetic song. It warned of future apostasy. The song would testify against Israel. It predicted Israel's history." },
  { id: "moses62", question: "What did Moses give the children of Israel before his death?", options: [{ label: "A", text: "A sword" }, { label: "B", text: "A crown" }, { label: "C", text: "A blessing" }, { label: "D", text: "A new king" }], correctAnswer: "C", verse: "Deuteronomy 33:1", explanation: "Moses, the man of God, blessed the children of Israel before his death. He spoke a blessing over the tribes." },
  { id: "moses63", question: "Who buried Moses?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "The Lord" }, { label: "C", text: "Aaron" }, { label: "D", text: "The Israelites" }], correctAnswer: "B", verse: "Deuteronomy 34:6", explanation: "God buried Moses in a valley in Moab. No one knows his burial place. This prevented Moses from becoming an object of worship. God personally cared for His servant." },
  { id: "moses64", question: "How old was Moses when he died?", options: [{ label: "A", text: "80" }, { label: "B", text: "100" }, { label: "C", text: "120" }, { label: "D", text: "140" }], correctAnswer: "C", verse: "Deuteronomy 34:7", explanation: "Moses lived 120 years. His eyes were not weak nor strength gone. This was God's blessing. Moses' long life showed God's faithfulness." },
  { id: "moses65", question: "What was Moses known for?", options: [{ label: "A", text: "Meekness" }, { label: "B", text: "Strength" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Numbers 12:3", explanation: "Moses was more humble than anyone on earth. God testified to his meekness. Humility was Moses' greatest virtue. It qualified him for leadership." },
  { id: "moses66", question: "What mountain did Moses die on?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "Mount Nebo" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Zion" }], correctAnswer: "B", verse: "Deuteronomy 34:1", explanation: "Moses climbed Mount Nebo to view Canaan. God showed him the promised land. Moses died there without entering. Nebo means 'prophet' or 'height.'" },
  { id: "moses67", question: "How does the Bible say the LORD knew Moses?", options: [{ label: "A", text: "Only in dreams" }, { label: "B", text: "From far off" }, { label: "C", text: "Face to face" }, { label: "D", text: "Only through an angel" }], correctAnswer: "C", verse: "Deuteronomy 34:10", explanation: "No prophet like Moses has risen in Israel. God knew him face to face. Moses had unique intimacy with God. He was God's chosen deliverer." },
  { id: "moses68", question: "To whom did God send Moses so that he could bring Israel out of Egypt?", options: [{ label: "A", text: "Jethro" }, { label: "B", text: "Balak" }, { label: "C", text: "Pharaoh" }, { label: "D", text: "Amalek" }], correctAnswer: "C", verse: "Exodus 3:10", explanation: "God said, 'I will send thee unto Pharaoh.' Moses was to bring God's people, the children of Israel, out of Egypt." },
  { id: "moses69", question: "What did God say Moses would do with the rod in his hand?", options: [{ label: "A", text: "Fight the Egyptians" }, { label: "B", text: "Herd Pharaoh's sheep" }, { label: "C", text: "Do signs" }, { label: "D", text: "Measure the land" }], correctAnswer: "C", verse: "Exodus 4:17", explanation: "Moses' staff represented God's authority. It performed miracles: snake, plagues, Red Sea. The staff showed God's power through Moses. It was a symbol of leadership." },
  { id: "moses70", question: "Who stayed in the tabernacle when Moses went back to the camp?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Hur" }, { label: "C", text: "Joshua" }, { label: "D", text: "Caleb" }], correctAnswer: "C", verse: "Exodus 33:11", explanation: "The LORD spoke to Moses face to face, as a man speaks to his friend. When Moses returned to the camp, his servant Joshua did not leave the tabernacle." },
  { id: "moses71", question: "According to Paul, what comes by the law?", options: [{ label: "A", text: "Being justified before God" }, { label: "B", text: "The knowledge of sin" }, { label: "C", text: "Great riches" }, { label: "D", text: "A long life" }], correctAnswer: "B", verse: "Romans 3:20", explanation: "Through the law comes knowledge of sin. The law shows what sin is. It prepares for the gospel. The law is holy and good." },
  { id: "moses72", question: "Why did God tell Israel to make Him a sanctuary?", options: [{ label: "A", text: "So He could hide from them" }, { label: "B", text: "So they could store their gold" }, { label: "C", text: "So He could dwell among them" }, { label: "D", text: "So they could defend the camp" }], correctAnswer: "C", verse: "Exodus 25:8", explanation: "God said, 'Let them make me a sanctuary; that I may dwell among them.' The tabernacle was the place of His presence in the camp." },
  { id: "moses73", question: "What does the law say makes an atonement for the soul?", options: [{ label: "A", text: "The fat" }, { label: "B", text: "The blood" }, { label: "C", text: "The smoke" }, { label: "D", text: "The ashes" }], correctAnswer: "B", verse: "Leviticus 17:11", explanation: "The life of the flesh is in the blood. Blood makes atonement for sins. Sacrifices pointed to Christ's sacrifice. They maintained relationship with God." },
  { id: "moses74", question: "What was Israel told to do with the sabbath day?", options: [{ label: "A", text: "Use it for trading" }, { label: "B", text: "Travel on it" }, { label: "C", text: "Remember it and keep it holy" }, { label: "D", text: "Gather manna on it" }], correctAnswer: "C", verse: "Exodus 20:8", explanation: "Remember the Sabbath day to keep it holy. It commemorates God's creation rest. Sabbath provides physical and spiritual rest. It teaches trust in God's provision." },
  { id: "moses75", question: "To whom did God first promise the land that Moses led Israel toward?", options: [{ label: "A", text: "Abraham" }, { label: "B", text: "Aaron" }, { label: "C", text: "Joshua" }, { label: "D", text: "David" }], correctAnswer: "A", verse: "Genesis 12:7", explanation: "God promised Canaan to Abraham's descendants. Moses led them toward this promise. The land represented God's faithfulness. It was a type of heaven." },
  { id: "moses76", question: "What did the LORD send Moses to do in the land of Egypt?", options: [{ label: "A", text: "Build a city for Pharaoh" }, { label: "B", text: "Gather a harvest" }, { label: "C", text: "Number the Egyptians" }, { label: "D", text: "Signs and wonders" }], correctAnswer: "D", verse: "Deuteronomy 34:11", explanation: "No prophet arose in Israel like Moses. The LORD sent him to do signs and wonders in Egypt, to Pharaoh, his servants and all his land." },
  { id: "moses77", question: "What did God say Israel would be to Him if they obeyed His voice and kept His covenant?", options: [{ label: "A", text: "A peculiar treasure above all people" }, { label: "B", text: "A nation like Egypt" }, { label: "C", text: "Servants of Pharaoh" }, { label: "D", text: "Strangers in the land" }], correctAnswer: "A", verse: "Exodus 19:5", explanation: "God said that if Israel obeyed His voice and kept His covenant, they would be a peculiar treasure to Him above all people. He added that all the earth is His." },
  { id: "moses78", question: "What did the people say when Moses read the book of the covenant to them?", options: [{ label: "A", text: "We will go back to Egypt" }, { label: "B", text: "These sayings are too hard" }, { label: "C", text: "All that the LORD hath said will we do" }, { label: "D", text: "Give us a king" }], correctAnswer: "C", verse: "Exodus 24:7", explanation: "Moses read the book of the covenant to the people. It contained laws for community life. The people agreed to obey. It established Israel's constitution." },
  { id: "moses79", question: "What went before Israel by day to lead them the way?", options: [{ label: "A", text: "An angel with a sword" }, { label: "B", text: "A flock of birds" }, { label: "C", text: "A pillar of a cloud" }, { label: "D", text: "A bright star" }], correctAnswer: "C", verse: "Exodus 13:21", explanation: "The LORD went before Israel by day in a pillar of a cloud to lead them. By night He went in a pillar of fire to give them light." },
  { id: "moses80", question: "What was wrong with the water at Marah?", options: [{ label: "A", text: "It was dried up" }, { label: "B", text: "It was bitter" }, { label: "C", text: "It was guarded by enemies" }, { label: "D", text: "It was full of frogs" }], correctAnswer: "B", verse: "Exodus 15:23", explanation: "At Marah the people could not drink the water because it was bitter. The LORD showed Moses a tree, and when he cast it into the waters they were made sweet." },
  { id: "moses81", question: "How often were the people to go out and gather the bread from heaven?", options: [{ label: "A", text: "Once a week" }, { label: "B", text: "Once a month" }, { label: "C", text: "Every day" }, { label: "D", text: "Once a year" }], correctAnswer: "C", verse: "Exodus 16:4", explanation: "Manna taught daily dependence on God. It appeared each morning. Sabbath had double portion. It represented spiritual nourishment. Jesus called Himself true bread." },
  { id: "moses82", question: "What happened in the battle with Amalek when Moses held up his hand?", options: [{ label: "A", text: "The sun stood still" }, { label: "B", text: "Amalek prevailed" }, { label: "C", text: "Israel prevailed" }, { label: "D", text: "The sea parted" }], correctAnswer: "C", verse: "Exodus 17:11", explanation: "Amalek attacked Israel at Rephidim. When Moses held up hands, Israel prevailed. Aaron and Hur helped. It showed prayer's importance in battle." },
  { id: "moses83", question: "What did Moses put on his face after speaking with the people?", options: [{ label: "A", text: "A vail" }, { label: "B", text: "Ashes" }, { label: "C", text: "Oil" }, { label: "D", text: "A plate of gold" }], correctAnswer: "A", verse: "Exodus 34:33", explanation: "Moses veiled his face because of God's glory. The glory was fading. The veil represented Moses' unique access. In Christ, the veil is removed." },
  { id: "moses84", question: "How much was each person to give when Israel was numbered?", options: [{ label: "A", text: "Half a shekel" }, { label: "B", text: "One shekel" }, { label: "C", text: "Two shekels" }, { label: "D", text: "Ten shekels" }], correctAnswer: "A", verse: "Exodus 30:13", explanation: "Each person gave half a shekel for tabernacle. Rich and poor gave the same. It showed equality before God. The tax supported worship." },
  { id: "moses85", question: "What was the holy anointing oil used to anoint?", options: [{ label: "A", text: "Kings and soldiers" }, { label: "B", text: "Only the sick" }, { label: "C", text: "The tabernacle and Aaron and his sons" }, { label: "D", text: "The food for the feasts" }], correctAnswer: "C", verse: "Exodus 30:25-30", explanation: "The holy anointing oil was used to anoint the tabernacle, the ark and the vessels. Aaron and his sons were anointed with it to serve as priests." },
  { id: "moses86", question: "What was mixed with the sweet spices to make the holy incense?", options: [{ label: "A", text: "Olive oil" }, { label: "B", text: "Honey" }, { label: "C", text: "Pure frankincense" }, { label: "D", text: "Fine flour" }], correctAnswer: "C", verse: "Exodus 30:34", explanation: "God told Moses to take sweet spices, stacte, onycha and galbanum, with pure frankincense. There was to be an equal weight of each." },
  { id: "moses87", question: "How many stones were set in the breastplate of judgment?", options: [{ label: "A", text: "Four" }, { label: "B", text: "Seven" }, { label: "C", text: "Twelve" }, { label: "D", text: "Seventy" }], correctAnswer: "C", verse: "Exodus 28:21", explanation: "The breastplate held twelve stones. Each one was engraved with a name, one for each of the twelve tribes of Israel." },
  { id: "moses88", question: "What was engraved on the two onyx stones on the shoulders of the ephod?", options: [{ label: "A", text: "The Ten Commandments" }, { label: "B", text: "The names of the children of Israel" }, { label: "C", text: "The name of Moses" }, { label: "D", text: "The names of the kings of Egypt" }], correctAnswer: "B", verse: "Exodus 28:9-12", explanation: "Two onyx stones were engraved with the names of the children of Israel, six on each stone. They were set on the shoulders of the ephod as a memorial." },
  { id: "moses89", question: "What words were engraved on the gold plate of Aaron's mitre?", options: [{ label: "A", text: "THE LORD IS ONE" }, { label: "B", text: "HOLINESS TO THE LORD" }, { label: "C", text: "I AM THAT I AM" }, { label: "D", text: "PEACE BE UPON ISRAEL" }], correctAnswer: "B", verse: "Exodus 28:36-37", explanation: "A plate of pure gold was engraved with the words HOLINESS TO THE LORD. It was fastened to the front of Aaron's mitre." },
  { id: "moses90", question: "What happened to the scapegoat on the Day of Atonement?", options: [{ label: "A", text: "It was eaten by the priests" }, { label: "B", text: "It was kept in the tabernacle" }, { label: "C", text: "It was let go into the wilderness" }, { label: "D", text: "It was given to the poor" }], correctAnswer: "C", verse: "Leviticus 16:10", explanation: "Lots were cast over two goats. The scapegoat was presented alive before the LORD and then let go into the wilderness." },
  { id: "moses91", question: "What kind of red heifer was Israel told to bring?", options: [{ label: "A", text: "One without spot that had never worn a yoke" }, { label: "B", text: "One that had ploughed for seven years" }, { label: "C", text: "One taken from the Egyptians" }, { label: "D", text: "One that was old and lame" }], correctAnswer: "A", verse: "Numbers 19:2", explanation: "The red heifer was to be without spot or blemish and never to have worn a yoke. Its ashes were kept for a water of purification." },
  { id: "moses92", question: "What was a Nazarite not allowed to drink?", options: [{ label: "A", text: "Water from a well" }, { label: "B", text: "Milk" }, { label: "C", text: "Wine and strong drink" }, { label: "D", text: "Water from a river" }], correctAnswer: "C", verse: "Numbers 6:3", explanation: "Nazirites consecrated themselves to God. They abstained from wine and grapes. Hair uncut during vow. Samson and Samuel were Nazirites." },
  { id: "moses93", question: "What did the priest give a woman to drink in the trial of jealousy?", options: [{ label: "A", text: "Bitter water" }, { label: "B", text: "New wine" }, { label: "C", text: "Milk and honey" }, { label: "D", text: "Vinegar" }], correctAnswer: "A", verse: "Numbers 5:24", explanation: "Suspected adulteress drank bitter water with curses. If guilty, her abdomen swelled. If innocent, she was cleared. It tested hidden sins. God revealed truth." },
  { id: "moses94", question: "What did Caleb say when he quieted the people before Moses?", options: [{ label: "A", text: "Let us return to Egypt" }, { label: "B", text: "Let us choose a new captain" }, { label: "C", text: "Let us go up at once, and possess it" }, { label: "D", text: "Let us wait another year" }], correctAnswer: "C", verse: "Numbers 13:30", explanation: "Caleb stilled the people and said, 'Let us go up at once, and possess it; for we are well able to overcome it.' The other spies said the people of the land were too strong." },
  { id: "moses95", question: "What happened to Korah and his men?", options: [{ label: "A", text: "They were sent back to Egypt" }, { label: "B", text: "They were made priests" }, { label: "C", text: "The earth opened and swallowed them" }, { label: "D", text: "They were struck with leprosy" }], correctAnswer: "C", verse: "Numbers 16:32", explanation: "Korah and his company rose up against Moses and Aaron. The earth opened her mouth and swallowed them up with all that belonged to them." },
  { id: "moses96", question: "Why did the LORD send fiery serpents among the people?", options: [{ label: "A", text: "They spoke against God and against Moses" }, { label: "B", text: "They refused to fight Amalek" }, { label: "C", text: "They made a golden calf" }, { label: "D", text: "They broke the sabbath" }], correctAnswer: "A", verse: "Numbers 21:5-6", explanation: "The people spoke against God and Moses and complained about the food and water. The LORD sent fiery serpents, and many people died." },
  { id: "moses97", question: "In Balaam's prophecy, what would come out of Jacob?", options: [{ label: "A", text: "A Star" }, { label: "B", text: "A plague" }, { label: "C", text: "A flood" }, { label: "D", text: "A serpent" }], correctAnswer: "A", verse: "Numbers 24:17", explanation: "Balaam prophesied Israel's future king. A star will come from Jacob. He will crush Moab's foes. This pointed to the Messiah." },
  { id: "moses98", question: "How many died in the plague at Shittim?", options: [{ label: "A", text: "Three thousand" }, { label: "B", text: "Seven hundred" }, { label: "C", text: "Twenty-four thousand" }, { label: "D", text: "Six hundred thousand" }], correctAnswer: "C", verse: "Numbers 25:9", explanation: "Israel joined in the worship of Baal-peor, and the anger of the LORD was kindled. Those who died in the plague were twenty-four thousand." },
  { id: "moses99", question: "How many days did the children of Israel weep for Moses?", options: [{ label: "A", text: "Three" }, { label: "B", text: "Seven" }, { label: "C", text: "Thirty" }, { label: "D", text: "Forty" }], correctAnswer: "C", verse: "Deuteronomy 34:8", explanation: "The children of Israel wept for Moses in the plains of Moab for thirty days. Then the days of mourning were ended." },
  { id: "moses100", question: "By faith, what did Moses refuse to be called when he had grown up?", options: [{ label: "A", text: "A prince of Midian" }, { label: "B", text: "The brother of Aaron" }, { label: "C", text: "The son of Pharaoh's daughter" }, { label: "D", text: "A shepherd of Israel" }], correctAnswer: "C", verse: "Hebrews 11:24", explanation: "The New Testament says that by faith Moses refused to be called the son of Pharaoh's daughter. He chose to suffer with the people of God instead." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MosesTriviaPage() {
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
        
        // Fetch user's progress for moses questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'moses');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'moses' });
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
            book: 'moses'
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
      // The last question is answered: a finished round, at any score. These
      // pages record each answer but no round, so Bible Lock is told here.
      bibleLockActivityCompleted(ACTION_TYPE.trivia_chapter_completed);
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (!showResults || earnedCorrectCount <= 0) return;
    triggerPoints(earnedCorrectCount);
  }, [showResults, earnedCorrectCount]);

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Moses expert!";
    if (score >= 8) return "Excellent! You know Moses well!";
    if (score >= 6) return "Good job! Keep studying Moses!";
    if (score >= 4) return "Nice try! Moses has much to reveal!";
    return "Keep learning! Every question brings you closer to understanding Moses!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-6xl mb-4">⛰️</div>
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
              href="/bible-trivia/moses"
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



