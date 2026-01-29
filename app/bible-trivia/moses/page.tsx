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
  { id: "moses01", question: "Where was Moses born?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "Canaan" }, { label: "C", text: "Midian" }, { label: "D", text: "Sinai" }], correctAnswer: "A", verse: "Exodus 2:1", explanation: "Moses was born in Egypt during the time when the Israelites were enslaved. His birth came at a dangerous time when Pharaoh ordered Hebrew baby boys killed. God protected Moses through his family." },
  { id: "moses02", question: "What was Moses' Hebrew name?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Jethro" }, { label: "C", text: "Moses" }, { label: "D", text: "Pharaoh" }], correctAnswer: "C", verse: "Exodus 2:10", explanation: "Moses means 'drawn out' from the water. Pharaoh's daughter named him Moses when she drew him out of the Nile. This name foreshadowed his role in delivering Israel from Egypt." },
  { id: "moses03", question: "What did Moses do when he was 40?", options: [{ label: "A", text: "Became Pharaoh" }, { label: "B", text: "Fled to Midian" }, { label: "C", text: "Led Israel out of Egypt" }, { label: "D", text: "Built the tabernacle" }], correctAnswer: "B", verse: "Exodus 2:15", explanation: "Moses fled to Midian after killing an Egyptian taskmaster. He became a fugitive and shepherd. This 40-year period prepared him for leadership. God used this time to humble Moses." },
  { id: "moses04", question: "What did Moses see at the burning bush?", options: [{ label: "A", text: "A snake" }, { label: "B", text: "Fire that didn't burn up the bush" }, { label: "C", text: "A golden calf" }, { label: "D", text: "The promised land" }], correctAnswer: "B", verse: "Exodus 3:2", explanation: "Moses saw a bush that was on fire but not consumed. This miraculous sight got his attention. God spoke to Moses from this bush. The burning bush represented God's presence." },
  { id: "moses05", question: "What was God's name revealed to Moses?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Adonai" }, { label: "C", text: "I AM THAT I AM" }, { label: "D", text: "Jehovah" }], correctAnswer: "C", verse: "Exodus 3:14", explanation: "God said 'I AM THAT I AM' - YHWH in Hebrew. This name means God is self-existent and eternal. It revealed God's unchanging nature. Moses was to tell Israel 'I AM' sent him." },
  { id: "moses06", question: "Who was Moses' brother?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Miriam" }, { label: "C", text: "Joshua" }, { label: "D", text: "Caleb" }], correctAnswer: "A", verse: "Exodus 4:14", explanation: "Aaron was Moses' older brother. God appointed Aaron as Moses' spokesman. Aaron became the first high priest. The brothers worked together in leading Israel." },
  { id: "moses07", question: "What sign did God give Moses?", options: [{ label: "A", text: "Staff turning to snake" }, { label: "B", text: "Water from rock" }, { label: "C", text: "Manna from heaven" }, { label: "D", text: "Pillar of fire" }], correctAnswer: "A", verse: "Exodus 4:3", explanation: "Moses' staff became a snake when thrown down. This demonstrated God's power over creation. The sign convinced others of Moses' divine calling. God performed miracles through Moses' staff." },
  { id: "moses08", question: "What did Moses say to excuse himself from God?", options: [{ label: "A", text: "I am too young" }, { label: "B", text: "I am not eloquent" }, { label: "C", text: "I am too old" }, { label: "D", text: "I am too rich" }], correctAnswer: "B", verse: "Exodus 4:10", explanation: "Moses said 'I am slow of speech and tongue.' He felt inadequate for public speaking. God promised to help him speak. Moses learned God equips those He calls." },
  { id: "moses09", question: "What happened to Moses' hand?", options: [{ label: "A", text: "It became leprous" }, { label: "B", text: "It grew longer" }, { label: "C", text: "It caught fire" }, { label: "D", text: "It turned to gold" }], correctAnswer: "A", verse: "Exodus 4:6", explanation: "Moses' hand became leprous then was healed. This was another sign of God's power. Leprosy represented death and uncleanness. God demonstrated His authority over disease." },
  { id: "moses10", question: "Who did Moses marry?", options: [{ label: "A", text: "Zipporah" }, { label: "B", text: "Miriam" }, { label: "C", text: "Rahab" }, { label: "D", text: "Deborah" }], correctAnswer: "A", verse: "Exodus 2:21", explanation: "Moses married Zipporah, daughter of Reuel/Jethro. She was from Midian. Zipporah saved Moses' life by circumcising their son. She became Moses' wife and helper." },
  { id: "moses11", question: "What was the first plague?", options: [{ label: "A", text: "Frogs" }, { label: "B", text: "Blood" }, { label: "C", text: "Locusts" }, { label: "D", text: "Boils" }], correctAnswer: "B", verse: "Exodus 7:20", explanation: "The Nile River turned to blood. All water in Egypt became blood. Fish died and the water stank. This showed God's power over creation. Pharaoh's magicians could do the same temporarily." },
  { id: "moses12", question: "What did Aaron's staff become?", options: [{ label: "A", text: "A tree" }, { label: "B", text: "A snake" }, { label: "C", text: "A flower" }, { label: "D", text: "A rock" }], correctAnswer: "B", verse: "Exodus 7:10", explanation: "Aaron's staff became a snake before Pharaoh. This was the first miracle before Pharaoh. Pharaoh's magicians did the same with their staffs. Aaron's snake swallowed the others' snakes." },
  { id: "moses13", question: "What plague involved insects?", options: [{ label: "A", text: "Flies" }, { label: "B", text: "Locusts" }, { label: "C", text: "Gnats" }, { label: "D", text: "Beetles" }], correctAnswer: "C", verse: "Exodus 8:16", explanation: "God brought swarms of gnats/lice. Pharaoh's magicians couldn't reproduce this plague. They admitted 'This is the finger of God.' The plague affected Egyptians but not Israelites in Goshen." },
  { id: "moses14", question: "What animal plague came next?", options: [{ label: "A", text: "Frogs" }, { label: "B", text: "Locusts" }, { label: "C", text: "Flies" }, { label: "D", text: "Bees" }], correctAnswer: "A", verse: "Exodus 8:6", explanation: "Frogs covered the land of Egypt. They were in houses, beds, and ovens. Pharaoh begged Moses to remove them. The frogs died and caused a stench. This showed God's power over amphibians." },
  { id: "moses15", question: "What plague affected livestock?", options: [{ label: "A", text: "Disease on animals" }, { label: "B", text: "Animals turned to stone" }, { label: "C", text: "Animals disappeared" }, { label: "D", text: "Animals multiplied" }], correctAnswer: "A", verse: "Exodus 9:6", explanation: "A severe plague killed Egyptian livestock. Horses, donkeys, camels, cattle, sheep, and goats died. Israelite animals were spared. This affected Egypt's economy and military power." },
  { id: "moses16", question: "What plague caused boils?", options: [{ label: "A", text: "On people and animals" }, { label: "B", text: "Only on animals" }, { label: "C", text: "Only on Egyptians" }, { label: "D", text: "Only on Israelites" }], correctAnswer: "A", verse: "Exodus 9:10", explanation: "Painful boils broke out on people and animals. Even Pharaoh's magicians were afflicted. They couldn't stand before Moses. This plague affected everyone including magicians." },
  { id: "moses17", question: "What was the plague of hail?", options: [{ label: "A", text: "Hail mixed with fire" }, { label: "B", text: "Just hail" }, { label: "C", text: "Hail and snow" }, { label: "D", text: "Hail and rain" }], correctAnswer: "A", verse: "Exodus 9:24", explanation: "Hail fell with fire flashing in it. This was unprecedented in Egypt. Those who feared God protected their livestock. The hail destroyed crops and people. It was a judgment on Egypt's gods." },
  { id: "moses18", question: "What was the locust plague?", options: [{ label: "A", text: "Locusts ate remaining crops" }, { label: "B", text: "Locusts sang songs" }, { label: "C", text: "Locusts brought water" }, { label: "D", text: "Locusts healed people" }], correctAnswer: "A", verse: "Exodus 10:15", explanation: "Locusts devoured all remaining vegetation. Nothing green was left in Egypt. This was the worst locust plague ever. It completed the destruction of Egypt's food supply." },
  { id: "moses19", question: "What was the ninth plague?", options: [{ label: "A", text: "Darkness" }, { label: "B", text: "Light" }, { label: "C", text: "Wind" }, { label: "D", text: "Earthquake" }], correctAnswer: "A", verse: "Exodus 10:22", explanation: "Darkness covered Egypt for three days. People couldn't see each other or move. Israelites had light in their dwellings. This darkness was tangible and palpable. It represented judgment on Egypt's sun god Ra." },
  { id: "moses20", question: "What was the tenth plague?", options: [{ label: "A", text: "Death of firstborn" }, { label: "B", text: "Death of Pharaoh" }, { label: "C", text: "Death of animals" }, { label: "D", text: "Death of crops" }], correctAnswer: "A", verse: "Exodus 12:29", explanation: "The Lord struck down all firstborn in Egypt. From Pharaoh to prisoners, all firstborn died. This was the final and most devastating plague. It led to Israel's release from slavery." },
  { id: "moses21", question: "What protected Israelites from the tenth plague?", options: [{ label: "A", text: "The blood of the lamb" }, { label: "B", text: "Their location" }, { label: "C", text: "Their prayers" }, { label: "D", text: "Their wealth" }], correctAnswer: "A", verse: "Exodus 12:13", explanation: "The blood on doorposts was a sign. When God saw the blood, He passed over. This became Passover. The lamb's blood represented substitutionary sacrifice. It foreshadowed Jesus' sacrifice." },
  { id: "moses22", question: "What did Moses lead Israel through?", options: [{ label: "A", text: "The Red Sea" }, { label: "B", text: "The Jordan River" }, { label: "C", text: "The Nile River" }, { label: "D", text: "The Euphrates River" }], correctAnswer: "A", verse: "Exodus 14:22", explanation: "Israel crossed the Red Sea on dry ground. God parted the waters with a strong east wind. Egyptians pursuing them drowned. This was Israel's miraculous deliverance." },
  { id: "moses23", question: "What did God provide for food?", options: [{ label: "A", text: "Bread from heaven" }, { label: "B", text: "Fish from the sea" }, { label: "C", text: "Meat from animals" }, { label: "D", text: "Fruit from trees" }], correctAnswer: "A", verse: "Exodus 16:4", explanation: "God provided manna from heaven. It appeared each morning except Sabbath. Manna means 'What is it?' It sustained Israel for 40 years. It taught dependence on God." },
  { id: "moses24", question: "What did Moses strike to get water?", options: [{ label: "A", text: "A tree" }, { label: "B", text: "A rock" }, { label: "C", text: "The ground" }, { label: "D", text: "His staff" }], correctAnswer: "B", verse: "Exodus 17:6", explanation: "Moses struck the rock at Horeb. Water gushed out for the people. This was God's provision in the desert. The rock represented Christ in the New Testament." },
  { id: "moses25", question: "Who helped Moses judge Israel?", options: [{ label: "A", text: "Jethro" }, { label: "B", text: "Aaron" }, { label: "C", text: "Joshua" }, { label: "D", text: "Caleb" }], correctAnswer: "A", verse: "Exodus 18:13", explanation: "Jethro advised Moses to delegate authority. He suggested captains of thousands, hundreds, etc. This organized leadership structure. Jethro was Moses' father-in-law and priest of Midian." },
  { id: "moses26", question: "What mountain did Moses climb?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Hermon" }], correctAnswer: "A", verse: "Exodus 19:3", explanation: "Moses went up Mount Sinai to meet God. God spoke to Moses there. The mountain was covered in smoke and fire. This was where Moses received the Ten Commandments." },
  { id: "moses27", question: "What did God write on tablets?", options: [{ label: "A", text: "The Ten Commandments" }, { label: "B", text: "The history of Israel" }, { label: "C", text: "Moses' genealogy" }, { label: "D", text: "Egyptian laws" }], correctAnswer: "A", verse: "Exodus 31:18", explanation: "God wrote the Ten Commandments on stone tablets. Moses broke the first set in anger. God rewrote them on the second set. These laws formed the basis of Israel's covenant with God." },
  { id: "moses28", question: "What was the first commandment?", options: [{ label: "A", text: "No other gods" }, { label: "B", text: "Honor parents" }, { label: "C", text: "No idols" }, { label: "D", text: "Keep Sabbath" }], correctAnswer: "A", verse: "Exodus 20:3", explanation: "You shall have no other gods before me. This established monotheism. God demanded exclusive worship. All other commandments flowed from this relationship." },
  { id: "moses29", question: "What happened to the golden calf?", options: [{ label: "A", text: "It was worshipped" }, { label: "B", text: "Moses ground it to powder" }, { label: "C", text: "It was kept as treasure" }, { label: "D", text: "It was given to Aaron" }], correctAnswer: "B", verse: "Exodus 32:20", explanation: "Moses burned the calf, ground it to powder, and made Israelites drink it. This was judgment on idolatry. The golden calf represented apostasy. Moses' anger showed his zeal for God." },
  { id: "moses30", question: "What did Moses see of God's glory?", options: [{ label: "A", text: "His face" }, { label: "B", text: "His back" }, { label: "C", text: "His hands" }, { label: "D", text: "His feet" }], correctAnswer: "B", verse: "Exodus 33:23", explanation: "Moses saw God's back but not His face. No one can see God's face and live. God's glory passed by Moses. This was a unique privilege for Moses." },
  { id: "moses31", question: "What made Moses' face shine?", options: [{ label: "A", text: "God's glory" }, { label: "B", text: "Egyptian makeup" }, { label: "C", text: "Desert sun" }, { label: "D", text: "His anger" }], correctAnswer: "A", verse: "Exodus 34:29", explanation: "Moses' face shone from being in God's presence. He had to veil his face. This showed the effect of God's glory. The veil represented Moses' unique relationship with God." },
  { id: "moses32", question: "What was the tabernacle?", options: [{ label: "A", text: "A tent of meeting" }, { label: "B", text: "A palace" }, { label: "C", text: "A fortress" }, { label: "D", text: "A marketplace" }], correctAnswer: "A", verse: "Exodus 33:7", explanation: "The tabernacle was God's dwelling place among Israel. It was a portable sanctuary. Moses supervised its construction. It represented God's presence with His people." },
  { id: "moses33", question: "Who designed the tabernacle?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Aaron" }, { label: "C", text: "Bezalel" }, { label: "D", text: "God" }], correctAnswer: "D", verse: "Exodus 31:1", explanation: "God filled Bezalel with His Spirit for craftsmanship. God gave the pattern for the tabernacle. Bezalel and Oholiab built it. This showed God's sovereignty in design." },
  { id: "moses34", question: "What was the mercy seat?", options: [{ label: "A", text: "A throne" }, { label: "B", text: "God's throne" }, { label: "C", text: "A place of atonement" }, { label: "D", text: "A judgment seat" }], correctAnswer: "C", verse: "Exodus 25:17", explanation: "The mercy seat was on the ark of the covenant. It was where God met with Moses. Blood was sprinkled there for atonement. It represented God's grace and forgiveness." },
  { id: "moses35", question: "What was in the ark of the covenant?", options: [{ label: "A", text: "Gold and silver" }, { label: "B", text: "The Ten Commandments" }, { label: "C", text: "Aaron's staff" }, { label: "D", text: "Manna" }], correctAnswer: "B", verse: "Exodus 25:16", explanation: "The ark contained the tablets of the Ten Commandments. It also held Aaron's staff and a pot of manna. The ark represented God's presence and covenant. It was the holiest object." },
  { id: "moses36", question: "What was the bronze laver for?", options: [{ label: "A", text: "Baptism" }, { label: "B", text: "Washing hands and feet" }, { label: "C", text: "Drinking water" }, { label: "D", text: "Cooking food" }], correctAnswer: "B", verse: "Exodus 30:18", explanation: "Priests washed at the bronze laver. It was for ceremonial cleansing. This represented spiritual purification. Cleanliness was required for ministry." },
  { id: "moses37", question: "What was the altar of incense for?", options: [{ label: "A", text: "Burning sacrifices" }, { label: "B", text: "Prayer" }, { label: "C", text: "Cooking food" }, { label: "D", text: "Lighting the tabernacle" }], correctAnswer: "B", verse: "Exodus 30:1", explanation: "Incense represented prayers ascending to God. It was burned morning and evening. The sweet aroma pleased God. Incense had to be made precisely as God commanded." },
  { id: "moses38", question: "What did the cloud represent?", options: [{ label: "A", text: "God's presence" }, { label: "B", text: "Weather" }, { label: "C", text: "Egyptian army" }, { label: "D", text: "Food" }], correctAnswer: "A", verse: "Exodus 40:38", explanation: "The cloud covered the tabernacle by day. It was fire by night. When it moved, Israel moved. The cloud guided Israel's journey. It showed God's leadership." },
  { id: "moses39", question: "What was the sin of Nadab and Abihu?", options: [{ label: "A", text: "Unauthorized fire" }, { label: "B", text: "Stealing" }, { label: "C", text: "Lying" }, { label: "D", text: "Drunkenness" }], correctAnswer: "A", verse: "Leviticus 10:1", explanation: "They offered strange fire before the Lord. God consumed them with fire. This showed the seriousness of worship. God demands worship according to His instructions." },
  { id: "moses40", question: "What made a person unclean?", options: [{ label: "A", text: "Touching dead bodies" }, { label: "B", text: "Eating certain foods" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Leviticus 11:1", explanation: "Various things caused ceremonial uncleanness. Contact with death or unclean animals. Purification rituals were required. This taught separation and holiness. Cleanliness represented spiritual purity." },
  { id: "moses41", question: "What was the Day of Atonement?", options: [{ label: "A", text: "A feast day" }, { label: "B", text: "A day of fasting and sacrifice" }, { label: "C", text: "A wedding day" }, { label: "D", text: "A harvest day" }], correctAnswer: "B", verse: "Leviticus 16:29", explanation: "It was the most holy day of the year. The high priest entered the Holy of Holies. Blood was sprinkled for atonement. This foreshadowed Christ's atonement." },
  { id: "moses42", question: "What was the Year of Jubilee?", options: [{ label: "A", text: "Every 7 years" }, { label: "B", text: "Every 50 years" }, { label: "C", text: "Every 10 years" }, { label: "D", text: "Every 25 years" }], correctAnswer: "B", verse: "Leviticus 25:10", explanation: "Every 50th year was Jubilee. Slaves were freed and land returned. It was a year of liberation. Jubilee represented God's redemptive work. It taught economic justice." },
  { id: "moses43", question: "What was the test at Massah?", options: [{ label: "A", text: "Water from rock" }, { label: "B", text: "Manna collection" }, { label: "C", text: "Golden calf" }, { label: "D", text: "Quail provision" }], correctAnswer: "A", verse: "Exodus 17:7", explanation: "Israel tested God at Massah. They questioned God's presence. Moses struck the rock for water. Massah means 'testing.' It showed Israel's unbelief." },
  { id: "moses44", question: "Who spied out Canaan?", options: [{ label: "A", text: "Moses and Aaron" }, { label: "B", text: "Twelve spies" }, { label: "C", text: "Joshua and Caleb" }, { label: "D", text: "The priests" }], correctAnswer: "B", verse: "Numbers 13:2", explanation: "Moses sent twelve spies into Canaan. One from each tribe. Ten gave bad report, two gave good. The majority's unbelief led to 40 years in wilderness." },
  { id: "moses45", question: "Who were the faithful spies?", options: [{ label: "A", text: "Joshua and Caleb" }, { label: "B", text: "Aaron and Hur" }, { label: "C", text: "Eleazar and Ithamar" }, { label: "D", text: "Nadab and Abihu" }], correctAnswer: "A", verse: "Numbers 14:6", explanation: "Joshua and Caleb tore their clothes in grief. They encouraged Israel to enter Canaan. They alone from adults entered promised land. Their faith was rewarded." },
  { id: "moses46", question: "What was Korah's rebellion about?", options: [{ label: "A", text: "Priesthood" }, { label: "B", text: "Leadership" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Food" }], correctAnswer: "C", verse: "Numbers 16:3", explanation: "Korah challenged Moses' and Aaron's authority. He wanted priesthood for all Levites. The earth swallowed the rebels. This showed God's choice of leadership." },
  { id: "moses47", question: "What did the bronze serpent represent?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Healing" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "B", verse: "Numbers 21:9", explanation: "Moses made a bronze serpent on a pole. Looking at it healed snake bites. It represented salvation by faith. Jesus compared it to His crucifixion." },
  { id: "moses48", question: "Who was Balaam?", options: [{ label: "A", text: "A prophet" }, { label: "B", text: "A diviner" }, { label: "C", text: "Both A and B" }, { label: "D", text: "A king" }], correctAnswer: "B", verse: "Numbers 22:5", explanation: "Balaam was hired to curse Israel. God spoke through him instead. His donkey spoke to him. Balaam represents false prophets who compromise." },
  { id: "moses49", question: "What did Balaam's donkey do?", options: [{ label: "A", text: "Spoke to Balaam" }, { label: "B", text: "Flew" }, { label: "C", text: "Disappeared" }, { label: "D", text: "Died" }], correctAnswer: "A", verse: "Numbers 22:28", explanation: "The donkey spoke to Balaam. It asked why he beat it. God opened the donkey's mouth. This showed God's sovereignty over creation. Even animals serve God's purposes." },
  { id: "moses50", question: "What was the sin at Baal Peor?", options: [{ label: "A", text: "Idolatry and immorality" }, { label: "B", text: "Stealing" }, { label: "C", text: "Murder" }, { label: "D", text: "Lying" }], correctAnswer: "A", verse: "Numbers 25:1", explanation: "Israel committed sexual immorality with Moabite women. They worshipped Baal of Peor. 24,000 died in the plague. This was spiritual adultery against God." },
  { id: "moses51", question: "Who succeeded Moses as leader?", options: [{ label: "A", text: "Aaron" }, { label: "B", text: "Joshua" }, { label: "C", text: "Caleb" }, { label: "D", text: "Eleazar" }], correctAnswer: "B", verse: "Numbers 27:18", explanation: "God chose Joshua to succeed Moses. Joshua was filled with the spirit of wisdom. He led Israel into Canaan. Joshua means 'The Lord saves.'" },
  { id: "moses52", question: "What was Moses' final sermon?", options: [{ label: "A", text: "The Ten Commandments" }, { label: "B", text: "Deuteronomy" }, { label: "C", text: "Leviticus" }, { label: "D", text: "Exodus" }], correctAnswer: "B", verse: "Deuteronomy 1:1", explanation: "Deuteronomy contains Moses' final messages. He reviewed Israel's history and laws. It means 'second law.' Moses prepared Israel for life in Canaan." },
  { id: "moses53", question: "What was the Shema?", options: [{ label: "A", text: "Hear, O Israel" }, { label: "B", text: "Love God with all your heart" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Deuteronomy 6:4", explanation: "The Shema is Israel's creed: 'Hear, O Israel: The Lord our God, the Lord is one.' It calls for wholehearted love for God. This is the greatest commandment." },
  { id: "moses54", question: "What did Moses forbid adding to God's word?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Words" }, { label: "C", text: "Laws" }, { label: "D", text: "Stories" }], correctAnswer: "B", verse: "Deuteronomy 4:2", explanation: "Do not add to or subtract from God's commands. The law was complete and perfect. Moses warned against altering Scripture. God's word is sufficient." },
  { id: "moses55", question: "What was the greatest commandment?", options: [{ label: "A", text: "Love God completely" }, { label: "B", text: "Love neighbor as self" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "A", verse: "Deuteronomy 6:5", explanation: "Love the Lord your God with all your heart, soul, and strength. This summarizes all the law. Jesus affirmed this as greatest. Love is the foundation of obedience." },
  { id: "moses56", question: "What did Moses command about teaching children?", options: [{ label: "A", text: "Teach diligently" }, { label: "B", text: "Talk about God's laws constantly" }, { label: "C", text: "Bind them as signs" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 6:7", explanation: "Impress God's commands on your children. Talk about them at home and on journeys. Bind them on hands and foreheads. Faith must be passed to next generation." },
  { id: "moses57", question: "What was the test of a true prophet?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "Accuracy of predictions" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "B", verse: "Deuteronomy 18:22", explanation: "If a prophet speaks in the Lord's name but the word does not come to pass, he is a false prophet. Accuracy tested true prophecy. God holds prophets accountable." },
  { id: "moses58", question: "What cities were cities of refuge?", options: [{ label: "A", text: "Six cities" }, { label: "B", text: "Three cities" }, { label: "C", text: "Twelve cities" }, { label: "D", text: "One city" }], correctAnswer: "A", verse: "Deuteronomy 19:2", explanation: "Six cities provided refuge for accidental killers. They were east and west of Jordan. Refuge prevented blood feuds. Justice required fair trial." },
  { id: "moses59", question: "What was required for kings?", options: [{ label: "A", text: "Not accumulate horses" }, { label: "B", text: "Not take many wives" }, { label: "C", text: "Write copy of the law" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 17:16", explanation: "Kings must not trust in military power or wealth. They must study God's law daily. Kings were subject to God's law. Power corrupts without godliness." },
  { id: "moses60", question: "What was the tithe for?", options: [{ label: "A", text: "Priests and Levites" }, { label: "B", text: "Festivals" }, { label: "C", text: "Poor" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 14:22", explanation: "Tithes supported religious leaders and celebrations. Every third year tithe helped the poor. Tithing expressed trust in God's provision. It was an act of worship." },
  { id: "moses61", question: "What was the Song of Moses?", options: [{ label: "A", text: "A victory song" }, { label: "B", text: "A prophetic song" }, { label: "C", text: "Both A and B" }, { label: "D", text: "A love song" }], correctAnswer: "B", verse: "Deuteronomy 31:19", explanation: "Moses taught Israel a prophetic song. It warned of future apostasy. The song would testify against Israel. It predicted Israel's history." },
  { id: "moses62", question: "What did Moses do before his death?", options: [{ label: "A", text: "Blessed the tribes" }, { label: "B", text: "Saw the promised land" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Deuteronomy 33:1", explanation: "Moses blessed each tribe prophetically. God showed him the promised land from Mount Nebo. Moses died at 120 years old. His strength was undiminished." },
  { id: "moses63", question: "Who buried Moses?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "The Lord" }, { label: "C", text: "Aaron" }, { label: "D", text: "The Israelites" }], correctAnswer: "B", verse: "Deuteronomy 34:6", explanation: "God buried Moses in a valley in Moab. No one knows his burial place. This prevented Moses from becoming an object of worship. God personally cared for His servant." },
  { id: "moses64", question: "How old was Moses when he died?", options: [{ label: "A", text: "80" }, { label: "B", text: "100" }, { label: "C", text: "120" }, { label: "D", text: "140" }], correctAnswer: "C", verse: "Deuteronomy 34:7", explanation: "Moses lived 120 years. His eyes were not weak nor strength gone. This was God's blessing. Moses' long life showed God's faithfulness." },
  { id: "moses65", question: "What was Moses known for?", options: [{ label: "A", text: "Meekness" }, { label: "B", text: "Strength" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Numbers 12:3", explanation: "Moses was more humble than anyone on earth. God testified to his meekness. Humility was Moses' greatest virtue. It qualified him for leadership." },
  { id: "moses66", question: "What mountain did Moses die on?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "Mount Nebo" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Zion" }], correctAnswer: "B", verse: "Deuteronomy 34:1", explanation: "Moses climbed Mount Nebo to view Canaan. God showed him the promised land. Moses died there without entering. Nebo means 'prophet' or 'height.'" },
  { id: "moses67", question: "What did God say about Moses?", options: [{ label: "A", text: "He was the greatest prophet" }, { label: "B", text: "He spoke face to face with God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Deuteronomy 34:10", explanation: "No prophet like Moses has risen in Israel. God knew him face to face. Moses had unique intimacy with God. He was God's chosen deliverer." },
  { id: "moses68", question: "What was Moses' role in the exodus?", options: [{ label: "A", text: "Military leader" }, { label: "B", text: "Spiritual leader" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Economic leader" }], correctAnswer: "C", verse: "Exodus 3:10", explanation: "God sent Moses to deliver Israel from Egypt. He led them through plagues and Red Sea. Moses was both prophet and king. He represented God to the people." },
  { id: "moses69", question: "What was the significance of Moses' staff?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Miracle working" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Exodus 4:17", explanation: "Moses' staff represented God's authority. It performed miracles: snake, plagues, Red Sea. The staff showed God's power through Moses. It was a symbol of leadership." },
  { id: "moses70", question: "What was Moses' relationship with God?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "Friend" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Enemy" }], correctAnswer: "C", verse: "Exodus 33:11", explanation: "The Lord spoke to Moses face to face, as a man speaks with his friend. Moses was God's faithful servant. Their relationship was intimate. Moses enjoyed unique access to God." },
  { id: "moses71", question: "What was the purpose of the law?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "Revealing sin" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Punishment" }], correctAnswer: "B", verse: "Romans 3:20", explanation: "Through the law comes knowledge of sin. The law shows what sin is. It prepares for the gospel. The law is holy and good." },
  { id: "moses72", question: "What was the tabernacle's purpose?", options: [{ label: "A", text: "God's dwelling place" }, { label: "B", text: "Teaching about heaven" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Military headquarters" }], correctAnswer: "C", verse: "Exodus 25:8", explanation: "God dwelt among His people in the tabernacle. It was a copy of heavenly things. The tabernacle represented God's presence. It taught about worship and holiness." },
  { id: "moses73", question: "What was the significance of the sacrifices?", options: [{ label: "A", text: "Feeding priests" }, { label: "B", text: "Covering sins" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Celebrating victories" }], correctAnswer: "B", verse: "Leviticus 17:11", explanation: "The life of the flesh is in the blood. Blood makes atonement for sins. Sacrifices pointed to Christ's sacrifice. They maintained relationship with God." },
  { id: "moses74", question: "What was the Sabbath for?", options: [{ label: "A", text: "Rest" }, { label: "B", text: "Remembering creation" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Working harder" }], correctAnswer: "C", verse: "Exodus 20:8", explanation: "Remember the Sabbath day to keep it holy. It commemorates God's creation rest. Sabbath provides physical and spiritual rest. It teaches trust in God's provision." },
  { id: "moses75", question: "What was the land promise?", options: [{ label: "A", text: "To Abraham" }, { label: "B", text: "To Moses" }, { label: "C", text: "To Joshua" }, { label: "D", text: "To David" }], correctAnswer: "A", verse: "Genesis 12:7", explanation: "God promised Canaan to Abraham's descendants. Moses led them toward this promise. The land represented God's faithfulness. It was a type of heaven." },
  { id: "moses76", question: "What was Moses' greatest achievement?", options: [{ label: "A", text: "Leading exodus" }, { label: "B", text: "Giving the law" }, { label: "C", text: "Building tabernacle" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 34:12", explanation: "Moses performed signs and wonders in Egypt. He led Israel 40 years in wilderness. No one like Moses in signs and wonders. His life was marked by faithfulness." },
  { id: "moses77", question: "What was the covenant at Sinai?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "Unconditional" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "A", verse: "Exodus 19:5", explanation: "If you obey my voice and keep my covenant, you shall be my treasured possession. Blessing depended on obedience. The covenant revealed Israel's responsibility. It showed need for a Savior." },
  { id: "moses78", question: "What was the book of the covenant?", options: [{ label: "A", text: "Exodus 20-23" }, { label: "B", text: "Civil laws" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Religious laws" }], correctAnswer: "C", verse: "Exodus 24:7", explanation: "Moses read the book of the covenant to the people. It contained laws for community life. The people agreed to obey. It established Israel's constitution." },
  { id: "moses79", question: "What was the significance of the cloud?", options: [{ label: "A", text: "God's guidance" }, { label: "B", text: "Protection" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Weather control" }], correctAnswer: "C", verse: "Exodus 13:21", explanation: "The pillar of cloud guided Israel by day. It protected them from Egyptians. When it moved, they moved. It represented God's presence and care." },
  { id: "moses80", question: "What was the water of Meribah?", options: [{ label: "A", text: "Sweet water" }, { label: "B", text: "Bitter water" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "B", verse: "Exodus 15:23", explanation: "The water was bitter at Marah. Moses threw a tree in and it became sweet. At Meribah, Moses struck rock for water. Both showed God's provision. They tested Israel's faith." },
  { id: "moses81", question: "What was the significance of manna?", options: [{ label: "A", text: "Daily dependence" }, { label: "B", text: "God's provision" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Human effort" }], correctAnswer: "C", verse: "Exodus 16:4", explanation: "Manna taught daily dependence on God. It appeared each morning. Sabbath had double portion. It represented spiritual nourishment. Jesus called Himself true bread." },
  { id: "moses82", question: "What was the battle with Amalek?", options: [{ label: "A", text: "Israel's first battle" }, { label: "B", text: "Moses' prayer power" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Defeat" }], correctAnswer: "C", verse: "Exodus 17:8", explanation: "Amalek attacked Israel at Rephidim. When Moses held up hands, Israel prevailed. Aaron and Hur helped. It showed prayer's importance in battle." },
  { id: "moses83", question: "What was the significance of the veil?", options: [{ label: "A", text: "Moses' glory" }, { label: "B", text: "Separation from God" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Fashion" }], correctAnswer: "A", verse: "Exodus 34:33", explanation: "Moses veiled his face because of God's glory. The glory was fading. The veil represented Moses' unique access. In Christ, the veil is removed." },
  { id: "moses84", question: "What was the census tax?", options: [{ label: "A", text: "Half shekel" }, { label: "B", text: "One shekel" }, { label: "C", text: "Two shekels" }, { label: "D", text: "No tax" }], correctAnswer: "A", verse: "Exodus 30:13", explanation: "Each person gave half a shekel for tabernacle. Rich and poor gave the same. It showed equality before God. The tax supported worship." },
  { id: "moses85", question: "What was the anointing oil?", options: [{ label: "A", text: "For priests" }, { label: "B", text: "For tabernacle" }, { label: "C", text: "Both A and B" }, { label: "D", text: "For food" }], correctAnswer: "C", verse: "Exodus 30:25", explanation: "The holy anointing oil consecrated priests and tabernacle. It represented the Holy Spirit. The recipe was sacred. Only specified people could make it." },
  { id: "moses86", question: "What was the incense?", options: [{ label: "A", text: "Sweet aroma" }, { label: "B", text: "Prayer symbol" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Cooking spice" }], correctAnswer: "C", verse: "Exodus 30:34", explanation: "Incense represented prayers ascending to God. It had a pleasing aroma. The recipe was exclusive. Nadab and Abihu's wrong incense killed them." },
  { id: "moses87", question: "What was the breastplate?", options: [{ label: "A", text: "Priestly garment" }, { label: "B", text: "Twelve stones" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Armor" }], correctAnswer: "C", verse: "Exodus 28:15", explanation: "The breastplate represented Israel's twelve tribes. Stones were set in gold. Urim and Thummim were there. It was for decision making." },
  { id: "moses88", question: "What was the ephod?", options: [{ label: "A", text: "Priestly apron" }, { label: "B", text: "Shoulder garment" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Head covering" }], correctAnswer: "B", verse: "Exodus 28:6", explanation: "The ephod was the high priest's shoulder garment. It had onyx stones with tribe names. It connected priest to people. It represented bearing Israel's burdens." },
  { id: "moses89", question: "What was the turban?", options: [{ label: "A", text: "Crown" }, { label: "B", text: "Holy to the Lord" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Hat" }], correctAnswer: "B", verse: "Exodus 28:36", explanation: "The turban had 'Holy to the Lord' engraved. It signified priest's consecration. The high priest bore Israel's sins. It represented holiness." },
  { id: "moses90", question: "What was the Day of Atonement ritual?", options: [{ label: "A", text: "Scapegoat" }, { label: "B", text: "Blood sacrifice" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Feast" }], correctAnswer: "C", verse: "Leviticus 16:10", explanation: "One goat sacrificed, blood sprinkled. Other goat (scapegoat) carried sins away. It provided complete atonement. It foreshadowed Christ's work." },
  { id: "moses91", question: "What was the red heifer?", options: [{ label: "A", text: "Purification sacrifice" }, { label: "B", text: "Food animal" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Work animal" }], correctAnswer: "A", verse: "Numbers 19:2", explanation: "The red heifer was burned for purification ashes. Ashes mixed with water cleansed uncleanness. It purified from death contact. It represented cleansing power." },
  { id: "moses92", question: "What was the Nazirite vow?", options: [{ label: "A", text: "Separation to God" }, { label: "B", text: "No wine, hair cutting" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Military service" }], correctAnswer: "C", verse: "Numbers 6:2", explanation: "Nazirites consecrated themselves to God. They abstained from wine and grapes. Hair uncut during vow. Samson and Samuel were Nazirites." },
  { id: "moses93", question: "What was the test of adultery?", options: [{ label: "A", text: "Bitter water" }, { label: "B", text: "Jealousy offering" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Trial by combat" }], correctAnswer: "A", verse: "Numbers 5:11", explanation: "Suspected adulteress drank bitter water with curses. If guilty, her abdomen swelled. If innocent, she was cleared. It tested hidden sins. God revealed truth." },
  { id: "moses94", question: "What was the significance of the spies?", options: [{ label: "A", text: "Faith vs fear" }, { label: "B", text: "Caleb and Joshua faithful" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Military strategy" }], correctAnswer: "C", verse: "Numbers 13:30", explanation: "Ten spies saw giants and feared. Caleb and Joshua trusted God. Unbelief led to 40 years wandering. Faith sees God's promises." },
  { id: "moses95", question: "What was the rebellion of Korah?", options: [{ label: "A", text: "Against Moses" }, { label: "B", text: "Priesthood challenge" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Food complaint" }], correctAnswer: "C", verse: "Numbers 16:3", explanation: "Korah challenged Moses' and Aaron's authority. He wanted all Levites as priests. Earth swallowed rebels. God establishes leadership." },
  { id: "moses96", question: "What was the bronze serpent?", options: [{ label: "A", text: "Healing symbol" }, { label: "B", text: "Judgment on sin" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Military weapon" }], correctAnswer: "A", verse: "Numbers 21:8", explanation: "Moses made serpent on pole. Looking at it healed bites. It represented salvation by faith. Jesus compared it to His crucifixion." },
  { id: "moses97", question: "What was Balaam's prophecy?", options: [{ label: "A", text: "Star from Jacob" }, { label: "B", text: "Scepter from Israel" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Curse on Israel" }], correctAnswer: "A", verse: "Numbers 24:17", explanation: "Balaam prophesied Israel's future king. A star will come from Jacob. He will crush Moab's foes. This pointed to the Messiah." },
  { id: "moses98", question: "What was the sin at Shittim?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Sexual immorality" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Theft" }], correctAnswer: "C", verse: "Numbers 25:1", explanation: "Israel joined Baal worship at Shittim. They committed sexual immorality. 24,000 died in plague. Phinehas' zeal stopped judgment." },
  { id: "moses99", question: "What was Moses' final blessing?", options: [{ label: "A", text: "Prophetic blessings" }, { label: "B", text: "For each tribe" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Curses" }], correctAnswer: "C", verse: "Deuteronomy 33:1", explanation: "Moses blessed each tribe prophetically. Reuben's instability, Judah's strength, etc. Blessings showed God's purposes. They encouraged Israel's future." },
  { id: "moses100", question: "What was Moses' legacy?", options: [{ label: "A", text: "Lawgiver" }, { label: "B", text: "Deliverer" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Conqueror" }], correctAnswer: "C", verse: "Deuteronomy 34:12", explanation: "Moses was Israel's deliverer and lawgiver. No prophet like him arose. He led from slavery to freedom. His life pointed to the greater Prophet, Jesus." }
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
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
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