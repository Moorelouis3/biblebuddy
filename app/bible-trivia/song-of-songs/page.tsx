"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
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

async function fetchVerseText(reference: string): Promise<string> {
  try {
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "song1", question: "Who is traditionally identified as the author of Song of Songs?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Jeremiah" }], correctAnswer: "B", verse: "Song of Songs 1:1", explanation: "The book is traditionally attributed to Solomon." },
  { id: "song2", question: "How does the woman describe her love's affection?", options: [{ label: "A", text: "Better than wine" }, { label: "B", text: "Sweeter than honey" }, { label: "C", text: "Stronger than gold" }, { label: "D", text: "Deeper than the sea" }], correctAnswer: "A", verse: "Song of Songs 1:2", explanation: "Love is compared to wine for its joy and delight." },
  { id: "song3", question: "What fragrance imagery is used for the beloved?", options: [{ label: "A", text: "Cedar" }, { label: "B", text: "Perfume poured out" }, { label: "C", text: "Incense smoke" }, { label: "D", text: "Fresh bread" }], correctAnswer: "B", verse: "Song of Songs 1:3", explanation: "The beloved's name is like perfume poured out." },
  { id: "song4", question: "How does the woman describe herself?", options: [{ label: "A", text: "Beautiful and flawless" }, { label: "B", text: "Dark but lovely" }, { label: "C", text: "Weak and afraid" }, { label: "D", text: "Lonely and lost" }], correctAnswer: "B", verse: "Song of Songs 1:5", explanation: "She embraces both humility and beauty." },
  { id: "song5", question: "Why is the woman dark?", options: [{ label: "A", text: "Illness" }, { label: "B", text: "Working in the vineyards" }, { label: "C", text: "Travel" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Song of Songs 1:6", explanation: "She labored in the sun." },
  { id: "song6", question: "Where does the woman want to find her beloved?", options: [{ label: "A", text: "In the city" }, { label: "B", text: "Among the flocks" }, { label: "C", text: "In the palace" }, { label: "D", text: "By the river" }], correctAnswer: "B", verse: "Song of Songs 1:7", explanation: "She seeks closeness and presence." },
  { id: "song7", question: "What animal imagery is used for the woman?", options: [{ label: "A", text: "A dove" }, { label: "B", text: "A lioness" }, { label: "C", text: "A gazelle" }, { label: "D", text: "A lamb" }], correctAnswer: "A", verse: "Song of Songs 1:15", explanation: "Dove imagery reflects purity and gentleness." },
  { id: "song8", question: "What setting is often used for their love?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "Gardens and vineyards" }, { label: "C", text: "The battlefield" }, { label: "D", text: "The marketplace" }], correctAnswer: "B", verse: "Song of Songs 2", explanation: "Nature imagery frames their love." },
  { id: "song9", question: "How does the woman describe herself among women?", options: [{ label: "A", text: "A cedar" }, { label: "B", text: "A lily among thorns" }, { label: "C", text: "A rose of Sharon" }, { label: "D", text: "A vine" }], correctAnswer: "B", verse: "Song of Songs 2:2", explanation: "She sees herself as distinct and cherished." },
  { id: "song10", question: "How does the man describe his beloved?", options: [{ label: "A", text: "A vine among trees" }, { label: "B", text: "An apple tree among the forest" }, { label: "C", text: "A cedar of Lebanon" }, { label: "D", text: "A palm tree" }], correctAnswer: "B", verse: "Song of Songs 2:3", explanation: "He values her above all others." },
  { id: "song11", question: "What does love bring the woman?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Delight and rest" }, { label: "C", text: "Sorrow" }, { label: "D", text: "Conflict" }], correctAnswer: "B", verse: "Song of Songs 2:3-4", explanation: "Love is a place of safety and joy." },
  { id: "song12", question: "What does the woman ask others not to awaken?", options: [{ label: "A", text: "Her fear" }, { label: "B", text: "Love before its time" }, { label: "C", text: "Her dreams" }, { label: "D", text: "Her sorrow" }], correctAnswer: "B", verse: "Song of Songs 2:7", explanation: "Love is not to be forced." },
  { id: "song13", question: "What animal imagery describes the man's movement?", options: [{ label: "A", text: "A lion" }, { label: "B", text: "A gazelle" }, { label: "C", text: "A horse" }, { label: "D", text: "A lamb" }], correctAnswer: "B", verse: "Song of Songs 2:9", explanation: "The man approaches with strength and grace." },
  { id: "song14", question: "What season symbolizes love's awakening?", options: [{ label: "A", text: "Winter" }, { label: "B", text: "Spring" }, { label: "C", text: "Autumn" }, { label: "D", text: "Summer" }], correctAnswer: "B", verse: "Song of Songs 2:11-12", explanation: "Spring imagery represents renewal." },
  { id: "song15", question: "What threatens the vineyards?", options: [{ label: "A", text: "Storms" }, { label: "B", text: "Little foxes" }, { label: "C", text: "Drought" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Song of Songs 2:15", explanation: "Small issues can harm love." },
  { id: "song16", question: "Who belongs to whom?", options: [{ label: "A", text: "The man belongs to the woman" }, { label: "B", text: "The woman belongs to the man" }, { label: "C", text: "They belong to each other" }, { label: "D", text: "They belong to Solomon" }], correctAnswer: "C", verse: "Song of Songs 2:16", explanation: "Mutual belonging defines their relationship." },
  { id: "song17", question: "What time setting is used for longing?", options: [{ label: "A", text: "Morning" }, { label: "B", text: "Night" }, { label: "C", text: "Noon" }, { label: "D", text: "Evening feast" }], correctAnswer: "B", verse: "Song of Songs 3:1", explanation: "Night reflects longing and searching." },
  { id: "song18", question: "Where does the woman search for her beloved?", options: [{ label: "A", text: "The countryside" }, { label: "B", text: "The city streets" }, { label: "C", text: "The palace" }, { label: "D", text: "The vineyard" }], correctAnswer: "B", verse: "Song of Songs 3:2", explanation: "She actively seeks him." },
  { id: "song19", question: "Who helps her search?", options: [{ label: "A", text: "Friends" }, { label: "B", text: "Watchmen" }, { label: "C", text: "Servants" }, { label: "D", text: "Family" }], correctAnswer: "B", verse: "Song of Songs 3:3", explanation: "The watchmen guard the city." },
  { id: "song20", question: "What happens when she finds him?", options: [{ label: "A", text: "She runs away" }, { label: "B", text: "She holds him tightly" }, { label: "C", text: "She questions him" }, { label: "D", text: "She hides" }], correctAnswer: "B", verse: "Song of Songs 3:4", explanation: "Love clings and commits." },
  { id: "song21", question: "What procession is described?", options: [{ label: "A", text: "A military parade" }, { label: "B", text: "Solomon's wedding procession" }, { label: "C", text: "A harvest celebration" }, { label: "D", text: "A temple ritual" }], correctAnswer: "B", verse: "Song of Songs 3:6-11", explanation: "Royal imagery emphasizes honor." },
  { id: "song22", question: "What material is Solomon's carriage made from?", options: [{ label: "A", text: "Iron" }, { label: "B", text: "Cedar" }, { label: "C", text: "Gold" }, { label: "D", text: "Stone" }], correctAnswer: "B", verse: "Song of Songs 3:9", explanation: "Cedar symbolizes royalty." },
  { id: "song23", question: "What crowns Solomon?", options: [{ label: "A", text: "A golden diadem" }, { label: "B", text: "A crown from his mother" }, { label: "C", text: "A priestly crown" }, { label: "D", text: "A laurel wreath" }], correctAnswer: "B", verse: "Song of Songs 3:11", explanation: "The crown reflects celebration and joy." },
  { id: "song24", question: "How does the man describe the woman's beauty?", options: [{ label: "A", text: "Terrifying" }, { label: "B", text: "Flawless" }, { label: "C", text: "Simple" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Song of Songs 4:7", explanation: "He sees no flaw in her." },
  { id: "song25", question: "What metaphor is used for her eyes?", options: [{ label: "A", text: "Stars" }, { label: "B", text: "Doves" }, { label: "C", text: "Pools" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Song of Songs 4:1", explanation: "Doves symbolize gentleness." },
  { id: "song26", question: "What is love compared to later in the book?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Water" }, { label: "C", text: "Wind" }, { label: "D", text: "Stone" }], correctAnswer: "A", verse: "Song of Songs 8:6", explanation: "Love is powerful like fire." },
  { id: "song27", question: "What cannot extinguish love?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Wealth" }, { label: "C", text: "Many waters" }, { label: "D", text: "Distance" }], correctAnswer: "C", verse: "Song of Songs 8:7", explanation: "True love endures all." },
  { id: "song28", question: "What is love described as in strength?", options: [{ label: "A", text: "Gentle as a breeze" }, { label: "B", text: "Strong as death" }, { label: "C", text: "Soft as silk" }, { label: "D", text: "Fleeting as smoke" }], correctAnswer: "B", verse: "Song of Songs 8:6", explanation: "Love is unyielding and powerful." },
  { id: "song29", question: "What cannot buy love?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Effort" }, { label: "C", text: "All one's wealth" }, { label: "D", text: "Sacrifice" }], correctAnswer: "C", verse: "Song of Songs 8:7", explanation: "Love is priceless." },
  { id: "song30", question: "How does the book end?", options: [{ label: "A", text: "With sorrow" }, { label: "B", text: "With longing and invitation" }, { label: "C", text: "With judgment" }, { label: "D", text: "With silence" }], correctAnswer: "B", verse: "Song of Songs 8:14", explanation: "Love remains active and desired." },
  { id: "song31", question: "What imagery is used for the woman's neck?", options: [{ label: "A", text: "A tower" }, { label: "B", text: "A pillar" }, { label: "C", text: "A wall" }, { label: "D", text: "A shield" }], correctAnswer: "A", verse: "Song of Songs 4:4", explanation: "The imagery reflects strength and dignity." },
  { id: "song32", question: "What does the man invite the woman to do?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Come away with him" }, { label: "C", text: "Wait" }, { label: "D", text: "Return home" }], correctAnswer: "B", verse: "Song of Songs 2:10", explanation: "Love calls for closeness." },
  { id: "song33", question: "What spice imagery is used?", options: [{ label: "A", text: "Cinnamon and myrrh" }, { label: "B", text: "Frankincense and myrrh" }, { label: "C", text: "Aloes only" }, { label: "D", text: "Honey only" }], correctAnswer: "B", verse: "Song of Songs 4:6", explanation: "Spices symbolize richness and intimacy." },
  { id: "song34", question: "What is the woman compared to in beauty?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Tirzah and Jerusalem" }, { label: "C", text: "Babylon" }, { label: "D", text: "Damascus" }], correctAnswer: "B", verse: "Song of Songs 6:4", explanation: "Cities symbolize majesty and beauty." },
  { id: "song35", question: "What does the woman ask of the daughters of Jerusalem?", options: [{ label: "A", text: "Protection" }, { label: "B", text: "Help finding her beloved" }, { label: "C", text: "Food" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Song of Songs 5:8", explanation: "She seeks help in longing." },
  { id: "song36", question: "How is the beloved described physically?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Radiant and ruddy" }, { label: "C", text: "Old" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Song of Songs 5:10", explanation: "He is described with admiration." },
  { id: "song37", question: "What symbolizes the man's authority?", options: [{ label: "A", text: "A sword" }, { label: "B", text: "A crown" }, { label: "C", text: "Gold hands" }, { label: "D", text: "Armor" }], correctAnswer: "C", verse: "Song of Songs 5:14", explanation: "Gold imagery symbolizes strength and value." },
  { id: "song38", question: "What does the woman declare about her beloved?", options: [{ label: "A", text: "He is flawed" }, { label: "B", text: "He is altogether lovely" }, { label: "C", text: "He is distant" }, { label: "D", text: "He is silent" }], correctAnswer: "B", verse: "Song of Songs 5:16", explanation: "Total admiration is expressed." },
  { id: "song39", question: "What do the daughters of Jerusalem ask?", options: [{ label: "A", text: "Why she loves him" }, { label: "B", text: "Where he has gone" }, { label: "C", text: "Who he is" }, { label: "D", text: "When he will return" }], correctAnswer: "B", verse: "Song of Songs 6:1", explanation: "They join the search." },
  { id: "song40", question: "Where is the beloved found?", options: [{ label: "A", text: "In the city" }, { label: "B", text: "In his garden" }, { label: "C", text: "In the palace" }, { label: "D", text: "By the river" }], correctAnswer: "B", verse: "Song of Songs 6:2", explanation: "The garden symbolizes intimacy." },
  { id: "song41", question: "What symbolizes exclusivity in love?", options: [{ label: "A", text: "One vineyard" }, { label: "B", text: "One dove" }, { label: "C", text: "One crown" }, { label: "D", text: "One city" }], correctAnswer: "B", verse: "Song of Songs 6:9", explanation: "The dove imagery reflects exclusivity." },
  { id: "song42", question: "How do others react to the woman's beauty?", options: [{ label: "A", text: "They ignore her" }, { label: "B", text: "They praise her" }, { label: "C", text: "They envy her" }, { label: "D", text: "They fear her" }], correctAnswer: "B", verse: "Song of Songs 6:9", explanation: "Her beauty is widely admired." },
  { id: "song43", question: "What dance is mentioned?", options: [{ label: "A", text: "David's dance" }, { label: "B", text: "Dance of Mahanaim" }, { label: "C", text: "Temple dance" }, { label: "D", text: "Harvest dance" }], correctAnswer: "B", verse: "Song of Songs 6:13", explanation: "Dance imagery conveys joy." },
  { id: "song44", question: "What fruit imagery appears?", options: [{ label: "A", text: "Pomegranates" }, { label: "B", text: "Grapes" }, { label: "C", text: "Figs" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Song of Songs 7", explanation: "Fruit symbolizes abundance." },
  { id: "song45", question: "What does the woman express confidently?", options: [{ label: "A", text: "Her fear" }, { label: "B", text: "Her belonging" }, { label: "C", text: "Her doubt" }, { label: "D", text: "Her sorrow" }], correctAnswer: "B", verse: "Song of Songs 7:10", explanation: "She affirms mutual desire." },
  { id: "song46", question: "What setting is proposed for love?", options: [{ label: "A", text: "The city" }, { label: "B", text: "The countryside" }, { label: "C", text: "The palace" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Song of Songs 7:11", explanation: "Nature remains a key backdrop." },
  { id: "song47", question: "What fruit is reserved for the beloved?", options: [{ label: "A", text: "Figs" }, { label: "B", text: "Apples" }, { label: "C", text: "Mandrakes" }, { label: "D", text: "Dates" }], correctAnswer: "C", verse: "Song of Songs 7:13", explanation: "Mandrakes symbolize desire." },
  { id: "song48", question: "What familial wish does the woman express?", options: [{ label: "A", text: "That he were her brother" }, { label: "B", text: "That he were her king" }, { label: "C", text: "That he were her father" }, { label: "D", text: "That he were her shepherd" }], correctAnswer: "A", verse: "Song of Songs 8:1", explanation: "She desires freedom of expression." },
  { id: "song49", question: "What does love demand?", options: [{ label: "A", text: "Possession" }, { label: "B", text: "Commitment" }, { label: "C", text: "Silence" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Song of Songs 8:6", explanation: "Love is binding and strong." },
  { id: "song50", question: "What symbolizes permanence?", options: [{ label: "A", text: "A seal" }, { label: "B", text: "A crown" }, { label: "C", text: "A wall" }, { label: "D", text: "A garden" }], correctAnswer: "A", verse: "Song of Songs 8:6", explanation: "A seal represents lasting commitment." },
  { id: "song51", question: "What cannot overpower love?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Distance" }, { label: "C", text: "Floods" }, { label: "D", text: "Silence" }], correctAnswer: "C", verse: "Song of Songs 8:7", explanation: "Love remains unquenchable." },
  { id: "song52", question: "What is love compared against wealth?", options: [{ label: "A", text: "Equal" }, { label: "B", text: "Worth more" }, { label: "C", text: "Less valuable" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Song of Songs 8:7", explanation: "Love is priceless." },
  { id: "song53", question: "What concern is expressed for a younger sister?", options: [{ label: "A", text: "Her wealth" }, { label: "B", text: "Her readiness for love" }, { label: "C", text: "Her beauty" }, { label: "D", text: "Her obedience" }], correctAnswer: "B", verse: "Song of Songs 8:8", explanation: "Protection and maturity are valued." },
  { id: "song54", question: "What imagery is used if she is mature?", options: [{ label: "A", text: "A vineyard" }, { label: "B", text: "A wall" }, { label: "C", text: "A tower" }, { label: "D", text: "A tree" }], correctAnswer: "B", verse: "Song of Songs 8:9", explanation: "A wall symbolizes strength." },
  { id: "song55", question: "What imagery is used if she is not mature?", options: [{ label: "A", text: "A door" }, { label: "B", text: "A vine" }, { label: "C", text: "A field" }, { label: "D", text: "A garden" }], correctAnswer: "A", verse: "Song of Songs 8:9", explanation: "A door implies vulnerability." },
  { id: "song56", question: "What does the woman claim about herself?", options: [{ label: "A", text: "I am weak" }, { label: "B", text: "I am a wall" }, { label: "C", text: "I am lost" }, { label: "D", text: "I am afraid" }], correctAnswer: "B", verse: "Song of Songs 8:10", explanation: "She affirms maturity and strength." },
  { id: "song57", question: "What vineyard belonged to Solomon?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Baal Hamon" }, { label: "C", text: "Lebanon" }, { label: "D", text: "Engedi" }], correctAnswer: "B", verse: "Song of Songs 8:11", explanation: "The vineyard reflects wealth." },
  { id: "song58", question: "What does the woman say about her own vineyard?", options: [{ label: "A", text: "It is neglected" }, { label: "B", text: "It belongs to her" }, { label: "C", text: "It is destroyed" }, { label: "D", text: "It is sold" }], correctAnswer: "B", verse: "Song of Songs 8:12", explanation: "She maintains agency and value." },
  { id: "song59", question: "What final invitation is given?", options: [{ label: "A", text: "Wait" }, { label: "B", text: "Come quickly" }, { label: "C", text: "Stay away" }, { label: "D", text: "Remain silent" }], correctAnswer: "B", verse: "Song of Songs 8:14", explanation: "Love longs for presence." },
  { id: "song60", question: "What animal imagery closes the book?", options: [{ label: "A", text: "Lion" }, { label: "B", text: "Gazelle" }, { label: "C", text: "Dove" }, { label: "D", text: "Lamb" }], correctAnswer: "B", verse: "Song of Songs 8:14", explanation: "The gazelle symbolizes swift love." },
  { id: "song61", question: "What theme dominates Song of Songs?", options: [{ label: "A", text: "War" }, { label: "B", text: "Romantic love" }, { label: "C", text: "Judgment" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Song of Songs 1-8", explanation: "The book celebrates love." },
  { id: "song62", question: "What type of love is portrayed?", options: [{ label: "A", text: "Political" }, { label: "B", text: "Covenantal and romantic" }, { label: "C", text: "Familial" }, { label: "D", text: "Platonic" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Love is exclusive and committed." },
  { id: "song63", question: "What literary style is used?", options: [{ label: "A", text: "Historical narrative" }, { label: "B", text: "Poetry" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Law code" }], correctAnswer: "B", verse: "Song of Songs", explanation: "The book is poetic." },
  { id: "song64", question: "What perspective balances desire?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Commitment" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Song of Songs 8:6", explanation: "Love is binding." },
  { id: "song65", question: "What does love require timing?", options: [{ label: "A", text: "Always" }, { label: "B", text: "Never" }, { label: "C", text: "Yes, before awakening" }, { label: "D", text: "Only later" }], correctAnswer: "C", verse: "Song of Songs 2:7", explanation: "Love should not be rushed." },
  { id: "song66", question: "What imagery reflects exclusivity?", options: [{ label: "A", text: "A garden locked" }, { label: "B", text: "A city wall" }, { label: "C", text: "A mountain" }, { label: "D", text: "A river" }], correctAnswer: "A", verse: "Song of Songs 4:12", explanation: "The locked garden symbolizes exclusivity." },
  { id: "song67", question: "What does mutual desire show?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Equality" }, { label: "C", text: "Fear" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Song of Songs 7:10", explanation: "Love is mutual." },
  { id: "song68", question: "What imagery describes commitment?", options: [{ label: "A", text: "A seal" }, { label: "B", text: "A ring" }, { label: "C", text: "A rope" }, { label: "D", text: "A wall" }], correctAnswer: "A", verse: "Song of Songs 8:6", explanation: "A seal marks ownership and permanence." },
  { id: "song69", question: "What contrasts Solomon's vineyard?", options: [{ label: "A", text: "The woman's vineyard" }, { label: "B", text: "The city" }, { label: "C", text: "The palace" }, { label: "D", text: "The field" }], correctAnswer: "A", verse: "Song of Songs 8:12", explanation: "Personal love outweighs wealth." },
  { id: "song70", question: "What cannot replace love?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Effort" }, { label: "C", text: "Wealth" }, { label: "D", text: "Wisdom" }], correctAnswer: "C", verse: "Song of Songs 8:7", explanation: "Love is priceless." },
  { id: "song71", question: "What does the book avoid?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Explicit instruction" }, { label: "C", text: "Commitment" }, { label: "D", text: "Desire" }], correctAnswer: "B", verse: "Song of Songs", explanation: "The book teaches through poetry." },
  { id: "song72", question: "What does the countryside symbolize?", options: [{ label: "A", text: "Danger" }, { label: "B", text: "Freedom and intimacy" }, { label: "C", text: "Isolation" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Song of Songs 7:11", explanation: "Nature reflects closeness." },
  { id: "song73", question: "What imagery reflects vulnerability?", options: [{ label: "A", text: "A wall" }, { label: "B", text: "A door" }, { label: "C", text: "A tower" }, { label: "D", text: "A seal" }], correctAnswer: "B", verse: "Song of Songs 8:9", explanation: "A door suggests openness." },
  { id: "song74", question: "What balances desire?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Wisdom and timing" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Song of Songs 2:7", explanation: "Love is patient." },
  { id: "song75", question: "What type of bond is emphasized?", options: [{ label: "A", text: "Temporary" }, { label: "B", text: "Exclusive" }, { label: "C", text: "Public" }, { label: "D", text: "Casual" }], correctAnswer: "B", verse: "Song of Songs 6:9", explanation: "Exclusive devotion is highlighted." },
  { id: "song76", question: "What do repeated refrains emphasize?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Timing and restraint" }, { label: "C", text: "Fear" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Song of Songs 2:7", explanation: "Love must not be forced." },
  { id: "song77", question: "What does longing reveal?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Depth of love" }, { label: "C", text: "Fear" }, { label: "D", text: "Impatience" }], correctAnswer: "B", verse: "Song of Songs 3:1", explanation: "Longing reflects devotion." },
  { id: "song78", question: "What role do friends play?", options: [{ label: "A", text: "Opposition" }, { label: "B", text: "Witnesses and encouragers" }, { label: "C", text: "Judges" }, { label: "D", text: "Leaders" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Community observes love." },
  { id: "song79", question: "What does mutual praise reinforce?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Affection and security" }, { label: "C", text: "Competition" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Song of Songs 4-7", explanation: "Affirmation strengthens love." },
  { id: "song80", question: "What does poetic imagery allow?", options: [{ label: "A", text: "Ambiguity" }, { label: "B", text: "Depth of expression" }, { label: "C", text: "Confusion" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Poetry deepens meaning." },
  { id: "song81", question: "What is central to the relationship?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Mutual desire" }, { label: "C", text: "Wealth" }, { label: "D", text: "Status" }], correctAnswer: "B", verse: "Song of Songs 7:10", explanation: "Desire is shared." },
  { id: "song82", question: "What does repetition create?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Emphasis" }, { label: "C", text: "Contradiction" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Repetition reinforces themes." },
  { id: "song83", question: "What does love protect?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Intimacy" }, { label: "C", text: "Status" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Song of Songs 4:12", explanation: "Love guards intimacy." },
  { id: "song84", question: "What does the locked garden symbolize?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Isolation" }, { label: "D", text: "Work" }], correctAnswer: "B", verse: "Song of Songs 4:12", explanation: "Faithfulness is protected." },
  { id: "song85", question: "What does love invite?", options: [{ label: "A", text: "Distance" }, { label: "B", text: "Pursuit" }, { label: "C", text: "Avoidance" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Song of Songs 2:10", explanation: "Love calls outward." },
  { id: "song86", question: "What role does beauty play?", options: [{ label: "A", text: "Manipulation" }, { label: "B", text: "Celebration" }, { label: "C", text: "Control" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Beauty is celebrated." },
  { id: "song87", question: "What theme contrasts wealth?", options: [{ label: "A", text: "Duty" }, { label: "B", text: "Personal love" }, { label: "C", text: "Law" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Song of Songs 8:11-12", explanation: "Love outweighs riches." },
  { id: "song88", question: "What does the woman guard?", options: [{ label: "A", text: "Her freedom" }, { label: "B", text: "Her vineyard" }, { label: "C", text: "Her fear" }, { label: "D", text: "Her wealth" }], correctAnswer: "B", verse: "Song of Songs 8:12", explanation: "She maintains agency." },
  { id: "song89", question: "What does the ending emphasize?", options: [{ label: "A", text: "Finality" }, { label: "B", text: "Ongoing desire" }, { label: "C", text: "Judgment" }, { label: "D", text: "Separation" }], correctAnswer: "B", verse: "Song of Songs 8:14", explanation: "Love continues." },
  { id: "song90", question: "What kind of book is Song of Songs?", options: [{ label: "A", text: "Historical law" }, { label: "B", text: "Wisdom poetry" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Narrative history" }], correctAnswer: "B", verse: "Song of Songs", explanation: "It belongs to wisdom literature." },
  { id: "song91", question: "What is celebrated without shame?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Marital love" }, { label: "C", text: "Wealth" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Love is honored." },
  { id: "song92", question: "What does love require mutuality?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Rarely" }], correctAnswer: "A", verse: "Song of Songs 2:16", explanation: "Belonging is mutual." },
  { id: "song93", question: "What does poetic exaggeration express?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Intensity of affection" }, { label: "C", text: "Error" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Poetry heightens emotion." },
  { id: "song94", question: "What is not forced in the book?", options: [{ label: "A", text: "Commitment" }, { label: "B", text: "Love" }, { label: "C", text: "Desire" }, { label: "D", text: "Praise" }], correctAnswer: "B", verse: "Song of Songs 2:7", explanation: "Love must awaken naturally." },
  { id: "song95", question: "What protects intimacy?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Boundaries" }, { label: "C", text: "Silence" }, { label: "D", text: "Distance" }], correctAnswer: "B", verse: "Song of Songs 4:12", explanation: "Boundaries preserve love." },
  { id: "song96", question: "What does the vineyard represent?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Personal love and self" }, { label: "C", text: "Wealth" }, { label: "D", text: "Family" }], correctAnswer: "B", verse: "Song of Songs 8:12", explanation: "The vineyard symbolizes personal devotion." },
  { id: "song97", question: "What kind of ending does the book have?", options: [{ label: "A", text: "Closed" }, { label: "B", text: "Open and ongoing" }, { label: "C", text: "Tragic" }, { label: "D", text: "Judicial" }], correctAnswer: "B", verse: "Song of Songs 8:14", explanation: "Love continues beyond the page." },
  { id: "song98", question: "What central value is highlighted?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Faithful love" }, { label: "C", text: "Law" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Song of Songs", explanation: "Faithful love is central." },
  { id: "song99", question: "What does the book affirm as good?", options: [{ label: "A", text: "Desire within commitment" }, { label: "B", text: "Uncontrolled passion" }, { label: "C", text: "Isolation" }, { label: "D", text: "Power" }], correctAnswer: "A", verse: "Song of Songs", explanation: "Love is celebrated within commitment." },
  { id: "song100", question: "What lasting message does Song of Songs leave?", options: [{ label: "A", text: "Love fades" }, { label: "B", text: "True love is strong and enduring" }, { label: "C", text: "Wealth satisfies" }, { label: "D", text: "Power controls" }], correctAnswer: "B", verse: "Song of Songs 8:6-7", explanation: "Love is powerful and enduring." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SongOfSongsTriviaPage() {
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
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "songofsongs");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
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

    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
const meta: any = user.user_metadata || {};
          username =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }

        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect: correct,
          book: "songofsongs",
        });
        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect: correct,
            book: "songofsongs",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1,
            })
            .eq("user_id", userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = {
            ...updated[currentQuestionIndex],
            verseText,
          };
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
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Song of Songs expert!";
    if (score >= 8) return "Excellent! You know Song of Songs well!";
    if (score >= 6) return "Good job! Keep studying Song of Songs!";
    if (score >= 4) return "Nice try! Song of Songs has much to explore!";
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
              href="/bible-trivia/song-of-songs"
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
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
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
                transform: "rotateY(180deg)",
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






