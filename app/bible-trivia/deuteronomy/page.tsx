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
  { id: "deuteronomy01", question: "What is the main theme of the book of Deuteronomy?", options: [{ label: "A", text: "Creation and origins" }, { label: "B", text: "God's covenant and laws" }, { label: "C", text: "Prophecies about the Messiah" }, { label: "D", text: "Historical narratives" }], correctAnswer: "B", verse: "Deuteronomy 4:1", explanation: "Deuteronomy focuses on God's covenant relationship with Israel and the laws that govern that relationship." },
  { id: "deuteronomy02", question: "Where did Moses deliver his final speeches to Israel?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "The plains of Moab" }, { label: "C", text: "Jericho" }, { label: "D", text: "The Jordan River" }], correctAnswer: "B", verse: "Deuteronomy 1:5", explanation: "Moses spoke to Israel on the plains of Moab before they entered the Promised Land." },
  { id: "deuteronomy03", question: "What does Deuteronomy mean?", options: [{ label: "A", text: "Second law" }, { label: "B", text: "Book of blessings" }, { label: "C", text: "Words of Moses" }, { label: "D", text: "Covenant renewal" }], correctAnswer: "A", verse: "Deuteronomy 17:18", explanation: "Deuteronomy means 'second law' - Moses restating God's laws before Israel enters Canaan." },
  { id: "deuteronomy04", question: "What is the greatest commandment according to Deuteronomy?", options: [{ label: "A", text: "Love your neighbor" }, { label: "B", text: "Love the Lord your God" }, { label: "C", text: "Honor your parents" }, { label: "D", text: "Keep the Sabbath" }], correctAnswer: "B", verse: "Deuteronomy 6:5", explanation: "The greatest commandment is to love God with all your heart, soul, and strength." },
  { id: "deuteronomy05", question: "What warning does Moses give about false prophets?", options: [{ label: "A", text: "They will perform miracles" }, { label: "B", text: "They will lead you to other gods" }, { label: "C", text: "They will promise wealth" }, { label: "D", text: "They will speak in foreign languages" }], correctAnswer: "B", verse: "Deuteronomy 13:1-5", explanation: "False prophets will try to lead Israel away from worshiping the one true God." },
  { id: "deuteronomy06", question: "What cities were designated as cities of refuge?", options: [{ label: "A", text: "Jerusalem, Bethlehem, Nazareth" }, { label: "B", text: "Six cities on both sides of the Jordan" }, { label: "C", text: "Three cities in Judah" }, { label: "D", text: "Twelve cities for the tribes" }], correctAnswer: "B", verse: "Deuteronomy 4:41-43", explanation: "Six cities were set aside as places of refuge for those who accidentally killed someone." },
  { id: "deuteronomy07", question: "What does Moses command Israel to do with God's laws?", options: [{ label: "A", text: "Memorize them" }, { label: "B", text: "Write them on doorposts and gates" }, { label: "C", text: "Teach them to children" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 6:6-9", explanation: "Israel was to keep God's laws constantly in mind and teach them diligently." },
  { id: "deuteronomy08", question: "What does Moses say will happen if Israel forgets God?", options: [{ label: "A", text: "They will become wealthy" }, { label: "B", text: "They will be destroyed" }, { label: "C", text: "They will rule other nations" }, { label: "D", text: "They will live in peace" }], correctAnswer: "B", verse: "Deuteronomy 8:19-20", explanation: "Moses warns that forgetting God will lead to Israel's destruction." },
  { id: "deuteronomy09", question: "What is the purpose of the blessings and curses in Deuteronomy?", options: [{ label: "A", text: "To show God's favoritism" }, { label: "B", text: "To motivate obedience" }, { label: "C", text: "To predict the future" }, { label: "D", text: "To establish rituals" }], correctAnswer: "B", verse: "Deuteronomy 11:26-28", explanation: "The blessings and curses were meant to motivate Israel to choose obedience." },
  { id: "deuteronomy10", question: "What does Moses say about God's choice of Israel?", options: [{ label: "A", text: "Because they were the largest nation" }, { label: "B", text: "Because they were the most righteous" }, { label: "C", text: "Because of God's love and faithfulness" }, { label: "D", text: "Because they deserved it" }], correctAnswer: "C", verse: "Deuteronomy 7:7-8", explanation: "God chose Israel not because of their merit, but because of His love and covenant promises." },
  { id: "deuteronomy11", question: "What does Moses command about caring for the poor?", options: [{ label: "A", text: "Give generously and without grudging" }, { label: "B", text: "Only help family members" }, { label: "C", text: "Lend money at interest" }, { label: "D", text: "Ignore the poor" }], correctAnswer: "A", verse: "Deuteronomy 15:7-11", explanation: "Israel was commanded to be generous to the poor and not to harden their hearts." },
  { id: "deuteronomy12", question: "What does Moses say about justice in the courts?", options: [{ label: "A", text: "Accept bribes" }, { label: "B", text: "Show partiality to the rich" }, { label: "C", text: "Do not pervert justice" }, { label: "D", text: "Judge quickly without evidence" }], correctAnswer: "C", verse: "Deuteronomy 16:19", explanation: "Judges were commanded to judge fairly and not show partiality." },
  { id: "deuteronomy13", question: "What does Moses say about kings in Israel?", options: [{ label: "A", text: "Kings should be chosen by lot" }, { label: "B", text: "Kings should not multiply horses or wives" }, { label: "C", text: "Kings should rule forever" }, { label: "D", text: "Kings should be foreigners" }], correctAnswer: "B", verse: "Deuteronomy 17:16-17", explanation: "Kings were warned not to trust in military power or foreign alliances." },
  { id: "deuteronomy14", question: "What does Moses command about false witnesses?", options: [{ label: "A", text: "They should be rewarded" }, { label: "B", text: "They should receive the same punishment they sought" }, { label: "C", text: "They should be exiled" }, { label: "D", text: "They should pay a fine" }], correctAnswer: "B", verse: "Deuteronomy 19:16-21", explanation: "False witnesses were to receive the punishment they tried to inflict on others." },
  { id: "deuteronomy15", question: "What does Moses say about warfare?", options: [{ label: "A", text: "Kill all enemies" }, { label: "B", text: "Offer peace first, then fight if necessary" }, { label: "C", text: "Never go to war" }, { label: "D", text: "Use any means necessary" }], correctAnswer: "B", verse: "Deuteronomy 20:10-15", explanation: "Israel was to offer peace to cities before attacking them." },
  { id: "deuteronomy16", question: "What does Moses say about unsolved murders?", options: [{ label: "A", text: "Ignore them" }, { label: "B", text: "The elders must break a heifer's neck" }, { label: "C", text: "Execute the nearest relative" }, { label: "D", text: "Offer a sacrifice" }], correctAnswer: "B", verse: "Deuteronomy 21:1-9", explanation: "In cases of unsolved murder, the elders performed a ritual to symbolically remove guilt." },
  { id: "deuteronomy17", question: "What does Moses say about rebellious children?", options: [{ label: "A", text: "Discipline them severely" }, { label: "B", text: "Stone them to death" }, { label: "C", text: "Send them away" }, { label: "D", text: "Forgive them always" }], correctAnswer: "B", verse: "Deuteronomy 21:18-21", explanation: "Rebellious children who refused discipline were to be executed as a severe warning." },
  { id: "deuteronomy18", question: "What does Moses say about compassion for animals?", options: [{ label: "A", text: "Do not muzzle an ox while threshing" }, { label: "B", text: "Kill animals for food only" }, { label: "C", text: "Treat animals like people" }, { label: "D", text: "Never work animals" }], correctAnswer: "A", verse: "Deuteronomy 25:4", explanation: "Workers should allow animals to eat while working, showing kindness to creatures." },
  { id: "deuteronomy19", question: "What is Moses' final blessing to Israel?", options: [{ label: "A", text: "Wealth and prosperity" }, { label: "B", text: "Military victory" }, { label: "C", text: "God's presence and favor" }, { label: "D", text: "Long life" }], correctAnswer: "C", verse: "Deuteronomy 33:29", explanation: "Moses' final blessing emphasizes Israel's unique relationship with God." },
  { id: "deuteronomy20", question: "What does Moses say about God's uniqueness?", options: [{ label: "A", text: "He is the greatest among many gods" }, { label: "B", text: "He is the only God" }, { label: "C", text: "He is like other gods" }, { label: "D", text: "He changes like other gods" }], correctAnswer: "B", verse: "Deuteronomy 4:35", explanation: "Deuteronomy repeatedly emphasizes that Yahweh is the one true God." },
  { id: "deuteronomy21", question: "What does Moses remind Israel about their journey from Egypt?", options: [{ label: "A", text: "It was easy and quick" }, { label: "B", text: "God tested them in the wilderness" }, { label: "C", text: "They traveled alone" }, { label: "D", text: "They never complained" }], correctAnswer: "B", verse: "Deuteronomy 8:2", explanation: "God led Israel through the wilderness to test and humble them." },
  { id: "deuteronomy22", question: "What does Moses say about the Promised Land?", options: [{ label: "A", text: "It is a land of plenty" }, { label: "B", text: "It flows with milk and honey" }, { label: "C", text: "God is giving it to them" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 6:3", explanation: "The Promised Land is described as a good land given by God." },
  { id: "deuteronomy23", question: "What does Moses command about the Passover?", options: [{ label: "A", text: "Celebrate it in Egypt only" }, { label: "B", text: "Remember it forever in the Promised Land" }, { label: "C", text: "Forget about it after entering Canaan" }, { label: "D", text: "Change the date each year" }], correctAnswer: "B", verse: "Deuteronomy 16:1-3", explanation: "Israel was to celebrate Passover annually to remember their deliverance." },
  { id: "deuteronomy24", question: "What does Moses say about the Sabbath year?", options: [{ label: "A", text: "Work extra hard that year" }, { label: "B", text: "Let the land rest every seventh year" }, { label: "C", text: "Plant different crops" }, { label: "D", text: "Sell the land permanently" }], correctAnswer: "B", verse: "Deuteronomy 15:1-3", explanation: "Every seventh year, debts were canceled and the land rested." },
  { id: "deuteronomy25", question: "What does Moses command about the Feast of Weeks?", options: [{ label: "A", text: "Celebrate it in the fall" }, { label: "B", text: "Bring offerings from the firstfruits" }, { label: "C", text: "Fast for seven days" }, { label: "D", text: "Only priests can attend" }], correctAnswer: "B", verse: "Deuteronomy 16:9-12", explanation: "The Feast of Weeks celebrated the wheat harvest with offerings." },
  { id: "deuteronomy26", question: "What does Moses say about the Feast of Tabernacles?", options: [{ label: "A", text: "Live in booths for seven days" }, { label: "B", text: "Celebrate in the temple only" }, { label: "C", text: "Bring animal sacrifices only" }, { label: "D", text: "Women are excluded" }], correctAnswer: "A", verse: "Deuteronomy 16:13-15", explanation: "Israel was to dwell in booths to remember their wilderness journey." },
  { id: "deuteronomy27", question: "What does Moses command about the altar on Mount Ebal?", options: [{ label: "A", text: "Build it with gold" }, { label: "B", text: "Write the law on stones" }, { label: "C", text: "Offer sacrifices immediately" }, { label: "D", text: "Destroy it after use" }], correctAnswer: "B", verse: "Deuteronomy 27:2-8", explanation: "The law was to be written on stones at the altar on Mount Ebal." },
  { id: "deuteronomy28", question: "What tribes were to pronounce blessings?", options: [{ label: "A", text: "All twelve tribes" }, { label: "B", text: "Six tribes on Mount Gerizim" }, { label: "C", text: "Only the Levites" }, { label: "D", text: "The oldest tribes" }], correctAnswer: "B", verse: "Deuteronomy 27:12", explanation: "Six tribes stood on Mount Gerizim to bless obedience." },
  { id: "deuteronomy29", question: "What tribes were to pronounce curses?", options: [{ label: "A", text: "The same six tribes" }, { label: "B", text: "Six tribes on Mount Ebal" }, { label: "C", text: "Only the priests" }, { label: "D", text: "The youngest tribes" }], correctAnswer: "B", verse: "Deuteronomy 27:13", explanation: "Six tribes stood on Mount Ebal to pronounce curses for disobedience." },
  { id: "deuteronomy30", question: "What does Moses say about secret things?", options: [{ label: "A", text: "They belong to God" }, { label: "B", text: "We should try to discover them" }, { label: "C", text: "They are revealed in dreams" }, { label: "D", text: "They are written in other books" }], correctAnswer: "A", verse: "Deuteronomy 29:29", explanation: "Secret things belong to God, but revealed things are for us and our children." },
  { id: "deuteronomy31", question: "What does Moses say about the song he teaches Israel?", options: [{ label: "A", text: "It is for entertainment" }, { label: "B", text: "It will be a witness against them" }, { label: "C", text: "It will be forgotten quickly" }, { label: "D", text: "Only priests can sing it" }], correctAnswer: "B", verse: "Deuteronomy 31:19-21", explanation: "The song would testify against Israel when they turned from God." },
  { id: "deuteronomy32", question: "What does Moses command Joshua to do?", options: [{ label: "A", text: "Build the temple" }, { label: "B", text: "Be strong and courageous" }, { label: "C", text: "Write new laws" }, { label: "D", text: "Return to Egypt" }], correctAnswer: "B", verse: "Deuteronomy 31:7", explanation: "Moses encourages Joshua to be strong and lead Israel into the Promised Land." },
  { id: "deuteronomy33", question: "What does Moses do before his death?", options: [{ label: "A", text: "Blesses each tribe" }, { label: "B", text: "Divides the land" }, { label: "C", text: "Builds an altar" }, { label: "D", text: "Writes a new book" }], correctAnswer: "A", verse: "Deuteronomy 33:1-29", explanation: "Moses pronounces blessings on each of the twelve tribes." },
  { id: "deuteronomy34", question: "What does Moses see from Mount Nebo?", options: [{ label: "A", text: "The whole land of Canaan" }, { label: "B", text: "Only the Jordan River" }, { label: "C", text: "Egypt in the distance" }, { label: "D", text: "The Red Sea" }], correctAnswer: "A", verse: "Deuteronomy 34:1-4", explanation: "God showed Moses the entire Promised Land before his death." },
  { id: "deuteronomy35", question: "Who buried Moses?", options: [{ label: "A", text: "The Israelites" }, { label: "B", text: "God Himself" }, { label: "C", text: "Joshua and the elders" }, { label: "D", text: "No one knows" }], correctAnswer: "B", verse: "Deuteronomy 34:6", explanation: "God personally buried Moses, and no one knows his burial place." },
  { id: "deuteronomy36", question: "What does Moses emphasize about God's covenant?", options: [{ label: "A", text: "It is conditional" }, { label: "B", text: "It depends on Israel's merit" }, { label: "C", text: "It is based on God's grace" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 7:6-8", explanation: "The covenant is gracious but requires faithful obedience." },
  { id: "deuteronomy37", question: "What does Moses say about idols?", options: [{ label: "A", text: "They have some power" }, { label: "B", text: "They are nothing" }, { label: "C", text: "They represent other gods" }, { label: "D", text: "They should be collected" }], correctAnswer: "B", verse: "Deuteronomy 4:28", explanation: "Idols are worthless and cannot see, hear, or eat." },
  { id: "deuteronomy38", question: "What does Moses command about child sacrifice?", options: [{ label: "A", text: "It is acceptable in some cases" }, { label: "B", text: "It must never happen" }, { label: "C", text: "Only firstborn sons" }, { label: "D", text: "It purifies the land" }], correctAnswer: "B", verse: "Deuteronomy 12:31", explanation: "Child sacrifice is an abomination that God hates." },
  { id: "deuteronomy39", question: "What does Moses say about consulting mediums?", options: [{ label: "A", text: "It is a harmless practice" }, { label: "B", text: "It defiles the land" }, { label: "C", text: "Only use approved ones" }, { label: "D", text: "It brings good luck" }], correctAnswer: "B", verse: "Deuteronomy 18:10-12", explanation: "Consulting mediums and spiritists defiles the land and must be avoided." },
  { id: "deuteronomy40", question: "What does Moses say about the prophet like him?", options: [{ label: "A", text: "He will be greater than Moses" }, { label: "B", text: "You must listen to him" }, { label: "C", text: "He will come from Egypt" }, { label: "D", text: "He will rewrite the law" }], correctAnswer: "B", verse: "Deuteronomy 18:15", explanation: "God will raise up a prophet like Moses, and Israel must listen to him." },
  { id: "deuteronomy41", question: "What does Moses say about clean and unclean foods?", options: [{ label: "A", text: "All foods are clean now" }, { label: "B", text: "Some animals are still unclean" }, { label: "C", text: "Food laws are abolished" }, { label: "D", text: "Only eat what is sacrificed" }], correctAnswer: "B", verse: "Deuteronomy 14:3-21", explanation: "Certain animals remain unclean and are not to be eaten." },
  { id: "deuteronomy42", question: "What does Moses command about fringes on garments?", options: [{ label: "A", text: "They are for decoration" }, { label: "B", text: "They remind of God's commands" }, { label: "C", text: "They protect from evil" }, { label: "D", text: "Only priests wear them" }], correctAnswer: "B", verse: "Deuteronomy 22:12", explanation: "Tassels on garments serve as reminders of God's commandments." },
  { id: "deuteronomy43", question: "What does Moses say about vows?", options: [{ label: "A", text: "They must always be kept" }, { label: "B", text: "They can be broken if inconvenient" }, { label: "C", text: "Keep them promptly" }, { label: "D", text: "Vows are discouraged" }], correctAnswer: "C", verse: "Deuteronomy 23:21-23", explanation: "Vows to God must be kept and not delayed." },
  { id: "deuteronomy44", question: "What does Moses say about runaway slaves?", options: [{ label: "A", text: "Return them immediately" }, { label: "B", text: "They must serve forever" }, { label: "C", text: "Give them sanctuary" }, { label: "D", text: "Set them free in the seventh year" }], correctAnswer: "C", verse: "Deuteronomy 23:15-16", explanation: "Runaway slaves should not be returned to their masters." },
  { id: "deuteronomy45", question: "What does Moses command about interest?", options: [{ label: "A", text: "Charge high interest to foreigners" }, { label: "B", text: "Do not charge interest to fellow Israelites" }, { label: "C", text: "Interest is always forbidden" }, { label: "D", text: "Only charge interest to the poor" }], correctAnswer: "B", verse: "Deuteronomy 23:19-20", explanation: "Israelites should not charge interest to fellow Israelites." },
  { id: "deuteronomy46", question: "What does Moses say about marriage?", options: [{ label: "A", text: "Marry only within your tribe" }, { label: "B", text: "Do not marry foreigners" }, { label: "C", text: "Marriage is discouraged" }, { label: "D", text: "Marry for love only" }], correctAnswer: "B", verse: "Deuteronomy 7:3-4", explanation: "Israel was warned not to intermarry with surrounding nations." },
  { id: "deuteronomy47", question: "What does Moses command about divorce?", options: [{ label: "A", text: "Divorce is never allowed" }, { label: "B", text: "A certificate of divorce must be given" }, { label: "C", text: "Women can divorce men" }, { label: "D", text: "Divorce requires priestly approval" }], correctAnswer: "B", verse: "Deuteronomy 24:1-4", explanation: "If divorce occurs, a certificate must be provided." },
  { id: "deuteronomy48", question: "What does Moses say about levirate marriage?", options: [{ label: "A", text: "It is optional" }, { label: "B", text: "The brother must marry the widow" }, { label: "C", text: "It preserves the family name" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 25:5-10", explanation: "Levirate marriage ensures the deceased brother's name continues." },
  { id: "deuteronomy49", question: "What does Moses command about dishonest weights?", options: [{ label: "A", text: "They are acceptable in business" }, { label: "B", text: "They are an abomination" }, { label: "C", text: "Only use them for foreigners" }, { label: "D", text: "They bring blessing" }], correctAnswer: "B", verse: "Deuteronomy 25:13-16", explanation: "Dishonest weights and measures are detestable to God." },
  { id: "deuteronomy50", question: "What does Moses say about Amalek?", options: [{ label: "A", text: "They will be blessed" }, { label: "B", text: "Blot out their memory" }, { label: "C", text: "Make peace with them" }, { label: "D", text: "They will rule Israel" }], correctAnswer: "B", verse: "Deuteronomy 25:17-19", explanation: "Amalek's attack on Israel must never be forgotten." },
  { id: "deuteronomy51", question: "What does Moses say about firstfruits?", options: [{ label: "A", text: "Give them to the king" }, { label: "B", text: "Bring them to the sanctuary" }, { label: "C", text: "Keep them for yourself" }, { label: "D", text: "Sell them in the market" }], correctAnswer: "B", verse: "Deuteronomy 26:1-11", explanation: "Firstfruits were to be brought to God's sanctuary as an offering." },
  { id: "deuteronomy52", question: "What does Moses say about tithes?", options: [{ label: "A", text: "Give them every year" }, { label: "B", text: "Eat them before the Lord" }, { label: "C", text: "Share with the Levites and poor" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 14:22-29", explanation: "Tithes were given annually and shared with others." },
  { id: "deuteronomy53", question: "What does Moses say about the central sanctuary?", options: [{ label: "A", text: "Build many altars" }, { label: "B", text: "Worship at the place God chooses" }, { label: "C", text: "Worship wherever you want" }, { label: "D", text: "Only priests can go there" }], correctAnswer: "B", verse: "Deuteronomy 12:5-7", explanation: "All worship and sacrifices must occur at God's chosen place." },
  { id: "deuteronomy54", question: "What does Moses say about blood?", options: [{ label: "A", text: "Drink it for strength" }, { label: "B", text: "Pour it out like water" }, { label: "C", text: "It represents life" }, { label: "D", text: "All of the above" }], correctAnswer: "C", verse: "Deuteronomy 12:23-25", explanation: "Blood represents life and must not be consumed." },
  { id: "deuteronomy55", question: "What does Moses say about apostate cities?", options: [{ label: "A", text: "Leave them alone" }, { label: "B", text: "Destroy them completely" }, { label: "C", text: "Convert the people" }, { label: "D", text: "Tax them heavily" }], correctAnswer: "B", verse: "Deuteronomy 13:12-18", explanation: "Cities that turn to other gods must be utterly destroyed." },
  { id: "deuteronomy56", question: "What does Moses say about self-mutilation?", options: [{ label: "A", text: "It is a sign of devotion" }, { label: "B", text: "Do not cut yourselves for the dead" }, { label: "C", text: "It brings healing" }, { label: "D", text: "Only priests can do it" }], correctAnswer: "B", verse: "Deuteronomy 14:1", explanation: "Self-mutilation was a pagan practice forbidden to Israel." },
  { id: "deuteronomy57", question: "What does Moses say about the Year of Release?", options: [{ label: "A", text: "Cancel all debts" }, { label: "B", text: "Free Hebrew slaves" }, { label: "C", text: "Let the land rest" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 15:1-18", explanation: "Every seventh year brought debt cancellation and slave release." },
  { id: "deuteronomy58", question: "What does Moses say about firstborn animals?", options: [{ label: "A", text: "Keep them all" }, { label: "B", text: "Redeem them or sacrifice them" }, { label: "C", text: "Sell them for profit" }, { label: "D", text: "Give them to the king" }], correctAnswer: "B", verse: "Deuteronomy 15:19-23", explanation: "Firstborn animals were holy and either sacrificed or redeemed." },
  { id: "deuteronomy59", question: "What does Moses say about judges?", options: [{ label: "A", text: "Appoint them in every town" }, { label: "B", text: "They must be fair and impartial" }, { label: "C", text: "They judge only capital cases" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 16:18-20", explanation: "Judges were appointed locally and required to judge justly." },
  { id: "deuteronomy60", question: "What does Moses say about the king?", options: [{ label: "A", text: "He must write his own copy of the law" }, { label: "B", text: "He must not be a foreigner" }, { label: "C", text: "He must read the law daily" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 17:14-20", explanation: "The king must be Israelite, write and read God's law daily." },
  { id: "deuteronomy61", question: "What does Moses say about priests and Levites?", options: [{ label: "A", text: "They receive no inheritance" }, { label: "B", text: "They serve at the sanctuary" }, { label: "C", text: "They teach God's law" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 18:1-8", explanation: "Priests and Levites served God and were supported by offerings." },
  { id: "deuteronomy62", question: "What does Moses say about the test for a prophet?", options: [{ label: "A", text: "Their predictions must come true" }, { label: "B", text: "They must perform miracles" }, { label: "C", text: "They must be from Levi" }, { label: "D", text: "They must be wealthy" }], correctAnswer: "A", verse: "Deuteronomy 18:20-22", explanation: "A true prophet's predictions will come to pass." },
  { id: "deuteronomy63", question: "What does Moses say about asylum?", options: [{ label: "A", text: "Cities of refuge provide protection" }, { label: "B", text: "Only for intentional killers" }, { label: "C", text: "Protection lasts forever" }, { label: "D", text: "Only for priests" }], correctAnswer: "A", verse: "Deuteronomy 19:1-13", explanation: "Cities of refuge protected those who killed accidentally." },
  { id: "deuteronomy64", question: "What does Moses say about boundary markers?", options: [{ label: "A", text: "Move them to enlarge your land" }, { label: "B", text: "Do not move your neighbor's landmark" }, { label: "C", text: "They are not important" }, { label: "D", text: "Only kings can set them" }], correctAnswer: "B", verse: "Deuteronomy 19:14", explanation: "Moving boundary markers was a serious offense." },
  { id: "deuteronomy65", question: "What does Moses say about going to war?", options: [{ label: "A", text: "Conscript all men" }, { label: "B", text: "Exempt newlyweds and homeowners" }, { label: "C", text: "Priests must lead" }, { label: "D", text: "Use any weapons" }], correctAnswer: "B", verse: "Deuteronomy 20:5-9", explanation: "Certain men were exempt from military service." },
  { id: "deuteronomy66", question: "What does Moses say about captive women?", options: [{ label: "A", text: "Marry them immediately" }, { label: "B", text: "Let them mourn before marriage" }, { label: "C", text: "Kill them" }, { label: "D", text: "Set them free" }], correctAnswer: "B", verse: "Deuteronomy 21:10-14", explanation: "Captive women had to mourn their families before marriage." },
  { id: "deuteronomy67", question: "What does Moses say about inheritance?", options: [{ label: "A", text: "The firstborn son gets double" }, { label: "B", text: "Daughters inherit equally" }, { label: "C", text: "The youngest gets everything" }, { label: "D", text: "Only sons inherit" }], correctAnswer: "A", verse: "Deuteronomy 21:15-17", explanation: "The firstborn son received a double portion of inheritance." },
  { id: "deuteronomy68", question: "What does Moses say about hanging a body?", options: [{ label: "A", text: "It can hang overnight" }, { label: "B", text: "Bury it the same day" }, { label: "C", text: "It brings a curse on the land" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 21:22-23", explanation: "Executed criminals were buried the same day to avoid defiling the land." },
  { id: "deuteronomy69", question: "What does Moses say about lost property?", options: [{ label: "A", text: "Keep it if no one claims it" }, { label: "B", text: "Return it to your brother" }, { label: "C", text: "Sell it for profit" }, { label: "D", text: "Give it to the king" }], correctAnswer: "B", verse: "Deuteronomy 22:1-4", explanation: "Lost property must be returned to its owner." },
  { id: "deuteronomy70", question: "What does Moses say about cross-dressing?", options: [{ label: "A", text: "It is acceptable" }, { label: "B", text: "It is an abomination" }, { label: "C", text: "It shows creativity" }, { label: "D", text: "Only for festivals" }], correctAnswer: "B", verse: "Deuteronomy 22:5", explanation: "Wearing clothing of the opposite sex was forbidden." },
  { id: "deuteronomy71", question: "What does Moses say about birds' nests?", options: [{ label: "A", text: "Take both mother and eggs" }, { label: "B", text: "Let the mother go free" }, { label: "C", text: "Kill all the birds" }, { label: "D", text: "Leave the nest alone" }], correctAnswer: "B", verse: "Deuteronomy 22:6-7", explanation: "When taking eggs, let the mother bird go to show compassion." },
  { id: "deuteronomy72", question: "What does Moses say about house construction?", options: [{ label: "A", text: "Build a parapet around the roof" }, { label: "B", text: "Roofs can be flat" }, { label: "C", text: "No safety requirements" }, { label: "D", text: "Only stone houses need protection" }], correctAnswer: "A", verse: "Deuteronomy 22:8", explanation: "Houses needed protective railings to prevent accidents." },
  { id: "deuteronomy73", question: "What does Moses say about mixed seeds?", options: [{ label: "A", text: "Plant them together" }, { label: "B", text: "Do not sow different seeds together" }, { label: "C", text: "It improves crops" }, { label: "D", text: "Only for export" }], correctAnswer: "B", verse: "Deuteronomy 22:9", explanation: "Different kinds of seeds should not be planted in the same field." },
  { id: "deuteronomy74", question: "What does Moses say about mixed fabrics?", options: [{ label: "A", text: "Wear them for warmth" }, { label: "B", text: "Do not wear wool and linen together" }, { label: "C", text: "It is fashionable" }, { label: "D", text: "Only priests can do it" }], correctAnswer: "B", verse: "Deuteronomy 22:11", explanation: "Clothing should not be made of mixed wool and linen." },
  { id: "deuteronomy75", question: "What does Moses say about virginity tests?", options: [{ label: "A", text: "They are not required" }, { label: "B", text: "Spread the cloth before elders" }, { label: "C", text: "Only for wealthy families" }, { label: "D", text: "They prove guilt" }], correctAnswer: "B", verse: "Deuteronomy 22:13-21", explanation: "If virginity was questioned, evidence was presented to elders." },
  { id: "deuteronomy76", question: "What does Moses say about adultery?", options: [{ label: "A", text: "It is a minor offense" }, { label: "B", text: "Both parties are stoned" }, { label: "C", text: "Only the man is punished" }, { label: "D", text: "It can be forgiven easily" }], correctAnswer: "B", verse: "Deuteronomy 22:22-24", explanation: "Adultery was punishable by death for both parties." },
  { id: "deuteronomy77", question: "What does Moses say about rape?", options: [{ label: "A", text: "The woman must marry her rapist" }, { label: "B", text: "The rapist is executed" }, { label: "C", text: "It depends on location" }, { label: "D", text: "No punishment is required" }], correctAnswer: "B", verse: "Deuteronomy 22:25-27", explanation: "Rape was treated as a serious crime with severe punishment." },
  { id: "deuteronomy78", question: "What does Moses say about Ammonites and Moabites?", options: [{ label: "A", text: "They are welcome in Israel" }, { label: "B", text: "Do not seek their peace or prosperity" }, { label: "C", text: "They must be destroyed" }, { label: "D", text: "They can intermarry" }], correctAnswer: "B", verse: "Deuteronomy 23:3-6", explanation: "Ammonites and Moabites were excluded from Israel's assembly." },
  { id: "deuteronomy79", question: "What does Moses say about Edomites?", options: [{ label: "A", text: "Treat them as brothers" }, { label: "B", text: "Do not abhor them" }, { label: "C", text: "They are enemies" }, { label: "D", text: "Exclude them forever" }], correctAnswer: "B", verse: "Deuteronomy 23:7", explanation: "Edomites were to be treated as brothers, not enemies." },
  { id: "deuteronomy80", question: "What does Moses say about Egyptians?", options: [{ label: "A", text: "Hate them forever" }, { label: "B", text: "Do not abhor them after three generations" }, { label: "C", text: "They are welcome immediately" }, { label: "D", text: "Treat them as slaves" }], correctAnswer: "B", verse: "Deuteronomy 23:7-8", explanation: "Egyptians could be accepted into Israel after three generations." },
  { id: "deuteronomy81", question: "What does Moses say about camp hygiene?", options: [{ label: "A", text: "Dig a latrine outside the camp" }, { label: "B", text: "Keep the camp holy" }, { label: "C", text: "It prevents disease" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 23:12-14", explanation: "Proper sanitation kept the camp pure and holy." },
  { id: "deuteronomy82", question: "What does Moses say about fugitive slaves?", options: [{ label: "A", text: "Return them to masters" }, { label: "B", text: "Do not extradite them" }, { label: "C", text: "They must work to pay debts" }, { label: "D", text: "Only from Israel" }], correctAnswer: "B", verse: "Deuteronomy 23:15-16", explanation: "Fugitive slaves were not to be returned to foreign masters." },
  { id: "deuteronomy83", question: "What does Moses say about prostitution?", options: [{ label: "A", text: "It is acceptable" }, { label: "B", text: "Temple prostitution is forbidden" }, { label: "C", text: "It brings wealth" }, { label: "D", text: "Only for foreigners" }], correctAnswer: "B", verse: "Deuteronomy 23:17-18", explanation: "Prostitution, especially cultic prostitution, was forbidden." },
  { id: "deuteronomy84", question: "What does Moses say about pledges?", options: [{ label: "A", text: "Take a millstone as pledge" }, { label: "B", text: "Do not take a widow's garment" }, { label: "C", text: "Pledges can be permanent" }, { label: "D", text: "Only take gold" }], correctAnswer: "B", verse: "Deuteronomy 24:6, 17", explanation: "Certain items, like millstones and widows' garments, could not be taken as pledges." },
  { id: "deuteronomy85", question: "What does Moses say about infectious diseases?", options: [{ label: "A", text: "Isolate the person" }, { label: "B", text: "The house must be inspected" }, { label: "C", text: "It may be leprosy" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 24:8-9", explanation: "Suspected leprosy required priestly inspection and isolation." },
  { id: "deuteronomy86", question: "What does Moses say about hired workers?", options: [{ label: "A", text: "Pay them whenever you want" }, { label: "B", text: "Do not withhold wages overnight" }, { label: "C", text: "They work for free" }, { label: "D", text: "Only pay with food" }], correctAnswer: "B", verse: "Deuteronomy 24:14-15", explanation: "Workers must be paid promptly, especially the poor and vulnerable." },
  { id: "deuteronomy87", question: "What does Moses say about family responsibility?", options: [{ label: "A", text: "Children are not punished for parents" }, { label: "B", text: "Parents are not executed for children" }, { label: "C", text: "Each person dies for their own sin" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 24:16", explanation: "Individual responsibility meant no one was punished for another's sins." },
  { id: "deuteronomy88", question: "What does Moses say about gleaning?", options: [{ label: "A", text: "Leave crops for the poor" }, { label: "B", text: "Harvest everything" }, { label: "C", text: "Burn the leftovers" }, { label: "D", text: "Give to the king" }], correctAnswer: "A", verse: "Deuteronomy 24:19-22", explanation: "Harvesters were to leave grain for the poor, widow, and orphan." },
  { id: "deuteronomy89", question: "What does Moses say about flogging?", options: [{ label: "A", text: "No more than 40 lashes" }, { label: "B", text: "It must be done in public" }, { label: "C", text: "Only for serious crimes" }, { label: "D", text: "All of the above" }], correctAnswer: "A", verse: "Deuteronomy 25:1-3", explanation: "Flogging was limited to 40 lashes to avoid degrading the person." },
  { id: "deuteronomy90", question: "What does Moses say about the ox that threshes?", options: [{ label: "A", text: "Do not muzzle it" }, { label: "B", text: "Let it eat while working" }, { label: "C", text: "It shows kindness to animals" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 25:4", explanation: "Working animals should be allowed to eat while laboring." },
  { id: "deuteronomy91", question: "What does Moses say about the sandal in levirate marriage?", options: [{ label: "A", text: "It symbolizes rejection" }, { label: "B", text: "Remove and spit in the face" }, { label: "C", text: "It brings shame" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 25:5-10", explanation: "Removing a sandal symbolized rejection of levirate duty." },
  { id: "deuteronomy92", question: "What does Moses say about fighting men?", options: [{ label: "A", text: "Pull the wife away" }, { label: "B", text: "Do not castrate the man" }, { label: "C", text: "It brings shame to both" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 25:11-12", explanation: "Interfering in a fight by grabbing private parts brought severe punishment." },
  { id: "deuteronomy93", question: "What does Moses say about accurate weights?", options: [{ label: "A", text: "Use different weights for buying and selling" }, { label: "B", text: "Have honest weights and measures" }, { label: "C", text: "It is an abomination to God" }, { label: "D", text: "All of the above" }], correctAnswer: "B", verse: "Deuteronomy 25:13-16", explanation: "Honest business practices were commanded by God." },
  { id: "deuteronomy94", question: "What does Moses say about Amalek's memory?", options: [{ label: "A", text: "Forget about them" }, { label: "B", text: "Blot out their name" }, { label: "C", text: "They attacked the weak" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 25:17-19", explanation: "Amalek's cowardly attack required eternal remembrance." },
  { id: "deuteronomy95", question: "What does Moses say about the firstfruits basket?", options: [{ label: "A", text: "Set it before the priest" }, { label: "B", text: "Recite Israel's history" }, { label: "C", text: "It shows gratitude" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 26:1-11", explanation: "The firstfruits ceremony included reciting God's deliverance." },
  { id: "deuteronomy96", question: "What does Moses say about the tithe declaration?", options: [{ label: "A", text: "I have obeyed all commands" }, { label: "B", text: "I have removed the holy portion" }, { label: "C", text: "I have given to Levite and stranger" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 26:12-15", explanation: "The tithe declaration affirmed faithful obedience to God's commands." },
  { id: "deuteronomy97", question: "What does Moses say about covenant obedience?", options: [{ label: "A", text: "You have declared today" }, { label: "B", text: "You are God's people" }, { label: "C", text: "Walk in His ways" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 26:16-19", explanation: "Israel committed to be God's special people and obey His commands." },
  { id: "deuteronomy98", question: "What does Moses say about the blessings on Mount Gerizim?", options: [{ label: "A", text: "They come from obeying God's commands" }, { label: "B", text: "They include prosperity and victory" }, { label: "C", text: "God will set you high above nations" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 28:1-14", explanation: "Obedience brings comprehensive blessing in every area of life." },
  { id: "deuteronomy99", question: "What does Moses say about the curses for disobedience?", options: [{ label: "A", text: "They are comprehensive" }, { label: "B", text: "They affect body, mind, and society" }, { label: "C", text: "They include defeat and exile" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 28:15-68", explanation: "Disobedience brings comprehensive curses affecting every aspect of life." },
  { id: "deuteronomy100", question: "What does Moses say about covenant renewal?", options: [{ label: "A", text: "It happens every seven years" }, { label: "B", text: "All Israel participates" }, { label: "C", text: "It includes blessings and curses" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 31:9-13", explanation: "The covenant was renewed every seven years with public reading and ceremony." },
];

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DeuteronomyTriviaPage() {
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
        
        // Fetch user's progress for deuteronomy questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'deuteronomy');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'deuteronomy' });
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
            book: 'deuteronomy'
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
    if (score === 10) return "Perfect! You're a Deuteronomy expert!";
    if (score >= 8) return "Excellent! You know Deuteronomy well!";
    if (score >= 6) return "Good job! Keep studying Deuteronomy!";
    if (score >= 4) return "Nice try! Deuteronomy has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <div className="text-gray-600">Loading questions...</div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">{correctCount}/{questions.length}</div>
          <div className="text-lg text-gray-600 mb-4">{percentage}% Correct</div>
          <p className="text-gray-700 mb-6">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/deuteronomy"
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
