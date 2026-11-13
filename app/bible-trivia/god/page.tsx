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
  { id: "god01", question: "What is the first name given to God in the Bible?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Jehovah" }, { label: "C", text: "Adonai" }, { label: "D", text: "El Shaddai" }], correctAnswer: "A", verse: "Genesis 1:1", explanation: "Elohim is the first name for God in Genesis 1:1. It emphasizes God's power and majesty as Creator. Elohim is plural in form but singular in meaning. This name reveals God's sovereignty over creation." },
  { id: "god02", question: "Which attribute of God means He is all-powerful?", options: [{ label: "A", text: "Omnipotent" }, { label: "B", text: "Omniscient" }, { label: "C", text: "Omnipresent" }, { label: "D", text: "Immutable" }], correctAnswer: "A", verse: "Jeremiah 32:17", explanation: "Omnipotent means all-powerful. Jeremiah declares nothing is too hard for God. God's power is unlimited and absolute. This attribute gives believers confidence in prayer." },
  { id: "god03", question: "What does it mean that God is omniscient?", options: [{ label: "A", text: "He is everywhere" }, { label: "B", text: "He knows everything" }, { label: "C", text: "He is all-powerful" }, { label: "D", text: "He never changes" }], correctAnswer: "B", verse: "Psalm 139:4", explanation: "Omniscient means all-knowing. God knows our thoughts before we speak them. His knowledge is perfect and complete. This gives comfort that God understands us fully." },
  { id: "god04", question: "What name did God give Himself when Moses asked what to tell the children of Israel?", options: [{ label: "A", text: "The Most High" }, { label: "B", text: "The Ancient of days" }, { label: "C", text: "I AM THAT I AM" }, { label: "D", text: "The Lord of hosts" }], correctAnswer: "C", verse: "Exodus 3:14", explanation: "God said unto Moses, I AM THAT I AM. He told Moses to say to the children of Israel, I AM hath sent me unto you. This happened at the burning bush." },
  { id: "god05", question: "What does God's holiness mean?", options: [{ label: "A", text: "He is loving" }, { label: "B", text: "He is set apart from sin" }, { label: "C", text: "He is powerful" }, { label: "D", text: "He is wise" }], correctAnswer: "B", verse: "Isaiah 6:3", explanation: "Holiness means being completely set apart from sin. The seraphim cry 'Holy, holy, holy' before God. God's holiness demands reverence and purity. It is the foundation of His moral perfection." },
  { id: "god06", question: "Which attribute means God is present everywhere?", options: [{ label: "A", text: "Omnipotent" }, { label: "B", text: "Omniscient" }, { label: "C", text: "Omnipresent" }, { label: "D", text: "Eternal" }], correctAnswer: "C", verse: "Psalm 139:7-10", explanation: "Omnipresent means God is present everywhere simultaneously. David asks where he can flee from God's presence. God's presence brings comfort and accountability. He is never absent from His creation." },
  { id: "god07", question: "What does it mean that God is immutable?", options: [{ label: "A", text: "He is all-powerful" }, { label: "B", text: "He never changes" }, { label: "C", text: "He is everywhere" }, { label: "D", text: "He knows everything" }], correctAnswer: "B", verse: "Malachi 3:6", explanation: "Immutable means God never changes. He is the same yesterday, today, and forever. This gives believers security in God's promises. His character and purposes remain constant." },
  { id: "god08", question: "Which name of God means 'Lord' or 'Master'?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Jehovah" }, { label: "C", text: "Adonai" }, { label: "D", text: "El Roi" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Adonai means Lord or Master. It emphasizes God's authority and ownership. This name appears frequently in the Old Testament. It calls for submission to God's lordship." },
  { id: "god09", question: "Complete the verse: He that loveth not knoweth not God; for God is ____.", options: [{ label: "A", text: "wrath" }, { label: "B", text: "love" }, { label: "C", text: "silent" }, { label: "D", text: "far off" }], correctAnswer: "B", verse: "1 John 4:8", explanation: "God is love according to Scripture. His love is the foundation of all His actions. Love motivates God's redemptive plan. God's love is sacrificial and unconditional." },
  { id: "god10", question: "Which name means 'God Almighty'?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "Jehovah Jireh" }, { label: "D", text: "El Elyon" }], correctAnswer: "B", verse: "Genesis 17:1", explanation: "El Shaddai means God Almighty. God appeared to Abraham as El Shaddai. It emphasizes God's unlimited power and strength. This name gives confidence in God's ability." },
  { id: "god11", question: "What does the psalmist say the LORD is in all His ways?", options: [{ label: "A", text: "Hidden" }, { label: "B", text: "Righteous" }, { label: "C", text: "Slow" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Psalm 145:17", explanation: "God's righteousness means He always does what is right. His ways are perfect and just. This attribute demands moral accountability. God's righteousness and love work together." },
  { id: "god12", question: "Which name means 'God Most High'?", options: [{ label: "A", text: "El Shaddai" }, { label: "B", text: "El Elyon" }, { label: "C", text: "Jehovah Nissi" }, { label: "D", text: "Jehovah Rapha" }], correctAnswer: "B", verse: "Genesis 14:18", explanation: "El Elyon means God Most High. Melchizedek blessed Abraham in this name. It emphasizes God's supremacy over all. No one is higher or more powerful than God." },
  { id: "god13", question: "What is God's mercy?", options: [{ label: "A", text: "His love" }, { label: "B", text: "His justice" }, { label: "C", text: "His compassion toward the undeserving" }, { label: "D", text: "His power" }], correctAnswer: "C", verse: "Lamentations 3:22-23", explanation: "Mercy is God's compassion toward sinners who deserve punishment. His mercies are new every morning. Mercy withholds deserved judgment. It flows from God's loving character." },
  { id: "god14", question: "Which name means 'The Lord Who Provides'?", options: [{ label: "A", text: "Jehovah Jireh" }, { label: "B", text: "Jehovah Nissi" }, { label: "C", text: "Jehovah Rapha" }, { label: "D", text: "Jehovah Shalom" }], correctAnswer: "A", verse: "Genesis 22:14", explanation: "Jehovah Jireh means 'The Lord will provide'. Abraham named the place after God provided a ram. It speaks of God's faithful provision. God meets needs in His perfect timing." },
  { id: "god15", question: "What does God's faithfulness mean?", options: [{ label: "A", text: "He keeps His promises" }, { label: "B", text: "He is powerful" }, { label: "C", text: "He is holy" }, { label: "D", text: "He is loving" }], correctAnswer: "A", verse: "Deuteronomy 7:9", explanation: "Faithfulness means God keeps His promises. He is faithful to a thousand generations. God's faithfulness is the basis for trust. His covenant love endures forever." },
  { id: "god16", question: "Which name means 'The Lord Our Banner'?", options: [{ label: "A", text: "Jehovah Jireh" }, { label: "B", text: "Jehovah Nissi" }, { label: "C", text: "Jehovah Rapha" }, { label: "D", text: "Jehovah Shalom" }], correctAnswer: "B", verse: "Exodus 17:15", explanation: "Jehovah Nissi means 'The Lord is my banner'. Moses built an altar after victory over Amalek. It represents God's protection in battle. God fights for His people." },
  { id: "god17", question: "What is God's grace?", options: [{ label: "A", text: "His power" }, { label: "B", text: "His justice" }, { label: "C", text: "Unmerited favor" }, { label: "D", text: "His holiness" }], correctAnswer: "C", verse: "Ephesians 2:8-9", explanation: "Grace is unmerited favor from God. Salvation is by grace through faith. Grace gives what we don't deserve. It is God's free gift to sinners." },
  { id: "god18", question: "Which name means 'The Lord Who Heals'?", options: [{ label: "A", text: "Jehovah Jireh" }, { label: "B", text: "Jehovah Nissi" }, { label: "C", text: "Jehovah Rapha" }, { label: "D", text: "Jehovah Shalom" }], correctAnswer: "C", verse: "Exodus 15:26", explanation: "Jehovah Rapha means 'The Lord who heals'. God promised to heal the Israelites if they obeyed. It speaks of God's healing power. God cares for physical and spiritual health." },
  { id: "god19", question: "What does God's sovereignty mean?", options: [{ label: "A", text: "He is loving" }, { label: "B", text: "He is in control of everything" }, { label: "C", text: "He is holy" }, { label: "D", text: "He is merciful" }], correctAnswer: "B", verse: "Daniel 4:35", explanation: "Sovereignty means God is in control of all things. He does according to His will. Nothing happens outside His plan. This gives purpose to all events." },
  { id: "god20", question: "Which name means 'The Lord Our Peace'?", options: [{ label: "A", text: "Jehovah Jireh" }, { label: "B", text: "Jehovah Nissi" }, { label: "C", text: "Jehovah Rapha" }, { label: "D", text: "Jehovah Shalom" }], correctAnswer: "D", verse: "Judges 6:24", explanation: "Jehovah Shalom means 'The Lord is peace'. Gideon built an altar after God's reassurance. It represents God's peace in troubled times. God brings peace to anxious hearts." },
  { id: "god21", question: "How many persons are in the Trinity?", options: [{ label: "A", text: "One" }, { label: "B", text: "Two" }, { label: "C", text: "Three" }, { label: "D", text: "Four" }], correctAnswer: "C", verse: "Matthew 28:19", explanation: "The Trinity is Father, Son, and Holy Spirit. Jesus commanded baptism in this name. Three persons, one God. The Trinity is a mystery but clearly taught." },
  { id: "god22", question: "What did Jesus say the Holy Spirit would do when He came?", options: [{ label: "A", text: "Rule the nations" }, { label: "B", text: "Reprove the world of sin" }, { label: "C", text: "End all sickness" }, { label: "D", text: "Rebuild the temple" }], correctAnswer: "B", verse: "John 16:8", explanation: "The Holy Spirit convicts the world of sin. He brings conviction of sin, righteousness, and judgment. The Spirit draws people to Christ. Conviction leads to repentance." },
  { id: "god23", question: "Which person of the Trinity became flesh?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "None" }], correctAnswer: "B", verse: "John 1:14", explanation: "The Son (Jesus) became flesh and dwelt among us. The Word became human. This is the incarnation. God became man to save humanity." },
  { id: "god24", question: "What is God's wrath?", options: [{ label: "A", text: "His love" }, { label: "B", text: "His righteous anger against sin" }, { label: "C", text: "His mercy" }, { label: "D", text: "His grace" }], correctAnswer: "B", verse: "Romans 1:18", explanation: "God's wrath is His righteous anger against sin. It is revealed against all ungodliness. Wrath is not capricious but just. God's wrath and love are compatible." },
  { id: "god25", question: "What does God's transcendence mean?", options: [{ label: "A", text: "He is immanent" }, { label: "B", text: "He is above and independent of creation" }, { label: "C", text: "He is everywhere" }, { label: "D", text: "He is changing" }], correctAnswer: "B", verse: "Isaiah 40:22", explanation: "Transcendence means God is above creation. He sits above the earth. God is not part of His creation. He is completely other than the universe." },
  { id: "god26", question: "What is God's immanence?", options: [{ label: "A", text: "He is far away" }, { label: "B", text: "He is present and active in creation" }, { label: "C", text: "He is above creation" }, { label: "D", text: "He is unchanging" }], correctAnswer: "B", verse: "Acts 17:28", explanation: "Immanence means God is present in His creation. We live and move and have our being in Him. God is not distant but near. He is actively involved in the world." },
  { id: "god27", question: "How long has God been God, according to the psalmist?", options: [{ label: "A", text: "Since the flood" }, { label: "B", text: "From everlasting to everlasting" }, { label: "C", text: "Since the mountains were made" }, { label: "D", text: "Since the days of Abraham" }], correctAnswer: "B", verse: "Psalm 90:2", explanation: "Eternity means God has no beginning or end. He is from everlasting to everlasting. God exists outside of time. His eternal nature gives hope." },
  { id: "god28", question: "How does Paul describe God's judgments?", options: [{ label: "A", text: "Simple" }, { label: "B", text: "Unsearchable" }, { label: "C", text: "Uncertain" }, { label: "D", text: "Forgotten" }], correctAnswer: "B", verse: "Romans 11:33", explanation: "Paul writes, O the depth of the riches both of the wisdom and knowledge of God! He says God's judgments are unsearchable and His ways past finding out." },
  { id: "god29", question: "Which name means 'God of Seeing'?", options: [{ label: "A", text: "El Roi" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "El Elyon" }, { label: "D", text: "El Olam" }], correctAnswer: "A", verse: "Genesis 16:13", explanation: "El Roi means 'God who sees'. Hagar named God this after He saw her affliction. God sees the suffering of the oppressed. He is aware of every detail." },
  { id: "god30", question: "What does God's jealousy mean?", options: [{ label: "A", text: "He is envious" }, { label: "B", text: "He demands exclusive worship" }, { label: "C", text: "He is angry" }, { label: "D", text: "He is possessive" }], correctAnswer: "B", verse: "Exodus 20:5", explanation: "God's jealousy demands exclusive worship. He will not share glory with idols. Jealousy flows from His holiness. God deserves our complete devotion." },
  { id: "god31", question: "Which name means 'Everlasting God'?", options: [{ label: "A", text: "El Roi" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "El Elyon" }, { label: "D", text: "El Olam" }], correctAnswer: "D", verse: "Genesis 21:33", explanation: "El Olam means 'Everlasting God'. Abraham called on this name. It emphasizes God's eternal nature. God is the unchanging eternal One." },
  { id: "god32", question: "What is God's goodness?", options: [{ label: "A", text: "His power" }, { label: "B", text: "His moral excellence and kindness" }, { label: "C", text: "His justice" }, { label: "D", text: "His holiness" }], correctAnswer: "B", verse: "Psalm 34:8", explanation: "God's goodness is His moral excellence and kindness. Taste and see that the Lord is good. God's goodness is the source of blessing. It motivates worship and trust." },
  { id: "god33", question: "How does Paul say all scripture is given?", options: [{ label: "A", text: "By the will of kings" }, { label: "B", text: "By inspiration of God" }, { label: "C", text: "By the wisdom of scribes" }, { label: "D", text: "By the vote of elders" }], correctAnswer: "B", verse: "2 Timothy 3:16", explanation: "Paul wrote to Timothy that all scripture is given by inspiration of God. He said it is profitable for doctrine, for reproof, for correction and for instruction in righteousness." },
  { id: "god34", question: "What does the psalmist say endures for ever?", options: [{ label: "A", text: "The LORD's mercy" }, { label: "B", text: "The LORD's anger" }, { label: "C", text: "The strength of kings" }, { label: "D", text: "The riches of the earth" }], correctAnswer: "A", verse: "Psalm 136:1", explanation: "The psalm says, O give thanks unto the LORD; for he is good: for his mercy endureth for ever. The same line is repeated in every verse of this psalm." },
  { id: "god35", question: "Which attribute means God is self-sufficient?", options: [{ label: "A", text: "Omnipotent" }, { label: "B", text: "Aseity" }, { label: "C", text: "Omniscient" }, { label: "D", text: "Omnipresent" }], correctAnswer: "B", verse: "Acts 17:25", explanation: "Aseity means God is self-existent and self-sufficient. He is not served by human hands. God needs nothing from creation. He is completely independent." },
  { id: "god36", question: "What is God's patience?", options: [{ label: "A", text: "His slowness to anger" }, { label: "B", text: "His mercy" }, { label: "C", text: "His love" }, { label: "D", text: "His grace" }], correctAnswer: "A", verse: "Exodus 34:6", explanation: "God's patience is His slowness to anger. He is abundant in lovingkindness. Patience gives time for repentance. God's patience leads to salvation." },
  { id: "god37", question: "By whom has God spoken to us in these last days?", options: [{ label: "A", text: "By angels" }, { label: "B", text: "By His Son" }, { label: "C", text: "By dreams" }, { label: "D", text: "By kings" }], correctAnswer: "B", verse: "Hebrews 1:1-2", explanation: "In time past God spoke unto the fathers by the prophets. In these last days He has spoken unto us by His Son, whom He appointed heir of all things." },
  { id: "god38", question: "What is God's glory?", options: [{ label: "A", text: "His power" }, { label: "B", text: "His manifest presence and majesty" }, { label: "C", text: "His holiness" }, { label: "D", text: "His love" }], correctAnswer: "B", verse: "Exodus 33:18", explanation: "Glory is God's manifest presence and majesty. Moses asked to see God's glory. God's glory reveals His character. It demands worship and awe." },
  { id: "god39", question: "Which person of the Trinity is called the Comforter?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "None" }], correctAnswer: "C", verse: "John 14:26", explanation: "Jesus said, the Comforter, which is the Holy Ghost, whom the Father will send in my name. He said the Comforter would teach them all things and bring His words to their remembrance." },
  { id: "god40", question: "What is God's purpose in creation?", options: [{ label: "A", text: "To display His glory" }, { label: "B", text: "To create beauty" }, { label: "C", text: "To have servants" }, { label: "D", text: "To test humans" }], correctAnswer: "A", verse: "Isaiah 43:7", explanation: "God's purpose is to display His glory. Everything exists for His glory. Creation reveals God's character. Worship is the ultimate purpose." },
  { id: "god41", question: "How does God feel about sin?", options: [{ label: "A", text: "He ignores it" }, { label: "B", text: "He hates it" }, { label: "C", text: "He tolerates it" }, { label: "D", text: "He enjoys it" }], correctAnswer: "B", verse: "Proverbs 6:16-19", explanation: "God hates sin and wickedness. He cannot tolerate evil. Sin offends God's holy character. God's hatred of sin shows His righteousness." },
  { id: "god42", question: "With the Lord, one day is as how many years?", options: [{ label: "A", text: "Seven years" }, { label: "B", text: "Forty years" }, { label: "C", text: "A hundred years" }, { label: "D", text: "A thousand years" }], correctAnswer: "D", verse: "2 Peter 3:8", explanation: "Peter writes that one day is with the Lord as a thousand years, and a thousand years as one day. He says this so that believers will not think the Lord is slow to keep His promise." },
  { id: "god43", question: "Which attribute means God is simple?", options: [{ label: "A", text: "He is uncomplicated" }, { label: "B", text: "His being is not composed of parts" }, { label: "C", text: "He is easy to understand" }, { label: "D", text: "He is basic" }], correctAnswer: "B", verse: "Deuteronomy 6:4", explanation: "Divine simplicity means God's being has no parts. He is not composed of attributes. God is one undivided being. His attributes are identical to His essence." },
  { id: "god44", question: "What does God say He declares from the beginning?", options: [{ label: "A", text: "The names of every king" }, { label: "B", text: "The number of the stars" }, { label: "C", text: "The price of the harvest" }, { label: "D", text: "The end" }], correctAnswer: "D", verse: "Isaiah 46:10", explanation: "God says He declares the end from the beginning, and from ancient times the things that are not yet done. He says, My counsel shall stand, and I will do all my pleasure." },
  { id: "god45", question: "What is God's relationship to evil?", options: [{ label: "A", text: "He causes evil" }, { label: "B", text: "He permits evil but is not its author" }, { label: "C", text: "He is indifferent to evil" }, { label: "D", text: "He enjoys evil" }], correctAnswer: "B", verse: "Job 1:12", explanation: "God permits evil but is not its author. Satan needed permission to afflict Job. God uses evil for good purposes. Evil exists in a fallen world." },
  { id: "god46", question: "Which name means 'God My Shepherd'?", options: [{ label: "A", text: "Jehovah Rohi" }, { label: "B", text: "Jehovah Jireh" }, { label: "C", text: "Jehovah Nissi" }, { label: "D", text: "Jehovah Rapha" }], correctAnswer: "A", verse: "Psalm 23:1", explanation: "Jehovah Rohi means 'The Lord is my shepherd'. David experienced God's care. God provides, protects, and guides. The shepherd metaphor shows God's tender care." },
  { id: "god47", question: "What does the psalmist say are the habitation of God's throne?", options: [{ label: "A", text: "Gold and silver" }, { label: "B", text: "Justice and judgment" }, { label: "C", text: "Thunder and lightning" }, { label: "D", text: "Cedar and stone" }], correctAnswer: "B", verse: "Psalm 89:14", explanation: "Justice is God's righteousness in judgment. Righteousness and justice are His throne. God judges fairly and rightly. Justice demands punishment for sin." },
  { id: "god48", question: "How does God respond to prayer?", options: [{ label: "A", text: "He always says yes" }, { label: "B", text: "He always says no" }, { label: "C", text: "He answers according to His will" }, { label: "D", text: "He ignores prayer" }], correctAnswer: "C", verse: "1 John 5:14", explanation: "God answers prayer according to His will. We can be confident when we ask according to His will. Prayer aligns with God's purposes. God hears and responds." },
  { id: "god49", question: "For whom do all things work together for good, according to Paul?", options: [{ label: "A", text: "The rich" }, { label: "B", text: "The strong" }, { label: "C", text: "Them that love God" }, { label: "D", text: "The wise of this world" }], correctAnswer: "C", verse: "Romans 8:28", explanation: "Paul writes, we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
  { id: "god50", question: "Jesus told His hearers to be perfect, even as who is perfect?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "The angels" }, { label: "C", text: "The prophets" }, { label: "D", text: "Your Father which is in heaven" }], correctAnswer: "D", verse: "Matthew 5:48", explanation: "God is perfect in all His attributes. Be perfect as your Father is perfect. God's perfection is the standard. He lacks nothing in excellence." },
  { id: "god51", question: "How does God commend His love toward us, according to Paul?", options: [{ label: "A", text: "He gave us the law" }, { label: "B", text: "He made us rich" }, { label: "C", text: "He kept us from all trouble" }, { label: "D", text: "While we were yet sinners, Christ died for us" }], correctAnswer: "D", verse: "Romans 5:8", explanation: "God shows love in many ways, supremely through Christ's death. God demonstrates His love. Love is action, not just feeling. God's love is sacrificial." },
  { id: "god52", question: "What does Paul say God cannot do?", options: [{ label: "A", text: "Forgive" }, { label: "B", text: "Hear" }, { label: "C", text: "Wait" }, { label: "D", text: "Lie" }], correctAnswer: "D", verse: "Titus 1:2", explanation: "Paul writes of the hope of eternal life, which God, that cannot lie, promised before the world began. Because God cannot lie, His promise is sure." },
  { id: "god53", question: "How does God feel about repentance?", options: [{ label: "A", text: "He hates it" }, { label: "B", text: "He is indifferent" }, { label: "C", text: "He delights in it" }, { label: "D", text: "He ignores it" }], correctAnswer: "C", verse: "Ezekiel 18:23", explanation: "God delights in repentance. He takes no pleasure in the death of the wicked. Repentance brings joy in heaven. God welcomes returning sinners." },
  { id: "god54", question: "What one thing did the psalmist desire of the LORD?", options: [{ label: "A", text: "Victory over every enemy" }, { label: "B", text: "Great riches" }, { label: "C", text: "A larger kingdom" }, { label: "D", text: "To dwell in the house of the LORD" }], correctAnswer: "D", verse: "Psalm 27:4", explanation: "God is beautiful and creates beauty. One thing I ask: to behold God's beauty. God's beauty is glorious. Beauty reflects God's character." },
  { id: "god55", question: "According to Paul, how are the invisible things of God clearly seen?", options: [{ label: "A", text: "By dreams in the night" }, { label: "B", text: "By the words of kings" }, { label: "C", text: "By signs in the temple" }, { label: "D", text: "By the things that are made" }], correctAnswer: "D", verse: "Romans 1:20", explanation: "God's power is evident in creation and miracles. His invisible attributes are clearly seen. Power displays God's glory. God's power is for His purposes." },
  { id: "god56", question: "Whom does Paul call the power of God and the wisdom of God?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "Solomon" }, { label: "C", text: "Apollos" }, { label: "D", text: "Christ" }], correctAnswer: "D", verse: "1 Corinthians 1:24", explanation: "Christ is the wisdom of God. God gives wisdom generously. Wisdom comes from God. God's wisdom is perfect and complete." },
  { id: "god57", question: "The LORD's compassions are new every morning. What does the writer then say is great?", options: [{ label: "A", text: "The LORD's anger" }, { label: "B", text: "The LORD's silence" }, { label: "C", text: "The LORD's distance" }, { label: "D", text: "The LORD's faithfulness" }], correctAnswer: "D", verse: "Lamentations 3:23", explanation: "God's faithfulness is new every morning. His mercies never cease. Faithfulness is God's nature. It provides security and hope." },
  { id: "god58", question: "What does the psalmist say is found in God's presence?", options: [{ label: "A", text: "Deep silence" }, { label: "B", text: "Great darkness" }, { label: "C", text: "Sorrow" }, { label: "D", text: "Fulness of joy" }], correctAnswer: "D", verse: "Psalm 16:11", explanation: "God has fullness of joy. In His presence is fullness of joy. God gives joy to believers. Joy is part of God's character." },
  { id: "god59", question: "What does the psalmist say the LORD is plenteous in?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Silence" }, { label: "C", text: "Wrath" }, { label: "D", text: "Mercy" }], correctAnswer: "D", verse: "Psalm 103:8", explanation: "God is compassionate and gracious, slow to anger, abounding in love. Mercy characterizes God's dealings. Mercy withholds deserved punishment." },
  { id: "god60", question: "After giving His peace, what did Jesus tell His disciples not to let their hearts be?", options: [{ label: "A", text: "Glad" }, { label: "B", text: "Humble" }, { label: "C", text: "Quiet" }, { label: "D", text: "Troubled" }], correctAnswer: "D", verse: "John 14:27", explanation: "Jesus gives peace not as the world gives. God is the God of peace. Peace comes from relationship with God. God's peace surpasses understanding." },
  { id: "god61", question: "What does Paul call being saved by grace through faith?", options: [{ label: "A", text: "A reward for works" }, { label: "B", text: "A wage that is owed" }, { label: "C", text: "A reason to boast" }, { label: "D", text: "The gift of God" }], correctAnswer: "D", verse: "Ephesians 2:8", explanation: "Grace is God's unmerited favor. By grace you have been saved. Grace gives what is undeserved. God's grace is abundant and free." },
  { id: "god62", question: "What does Paul call God when he prays that believers be filled with all joy and peace?", options: [{ label: "A", text: "The God of thunder" }, { label: "B", text: "The God of the mountains" }, { label: "C", text: "The God of the sea" }, { label: "D", text: "The God of hope" }], correctAnswer: "D", verse: "Romans 15:13", explanation: "God is the God of hope. He fills with joy and peace in believing. Hope comes from God's promises. God is the source of true hope." },
  { id: "god63", question: "Why are believers told to be holy?", options: [{ label: "A", text: "Because the law is hard" }, { label: "B", text: "Because the priests said so" }, { label: "C", text: "So that others will praise them" }, { label: "D", text: "Because God is holy" }], correctAnswer: "D", verse: "1 Peter 1:16", explanation: "Be holy because God is holy. Holiness demands purity and separation. God's holiness is majestic. It calls for reverent worship." },
  { id: "god64", question: "What does John say is not in God at all?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Mercy" }, { label: "C", text: "Truth" }, { label: "D", text: "Darkness" }], correctAnswer: "D", verse: "1 John 1:5", explanation: "God is light and in Him is no darkness. Light represents truth and purity. God's nature is pure light. Darkness cannot exist in God's presence." },
  { id: "god65", question: "What does the psalmist say about the LORD's judgments?", options: [{ label: "A", text: "They are hidden" }, { label: "B", text: "They are slow" }, { label: "C", text: "They are harsh" }, { label: "D", text: "They are upright" }], correctAnswer: "D", verse: "Psalm 119:137", explanation: "God is righteous and His judgments are right. Righteousness is God's nature. It demands moral accountability. God's righteousness is perfect." },
  { id: "god66", question: "How did Jesus say a man comes to the Father?", options: [{ label: "A", text: "By the law of Moses" }, { label: "B", text: "By the temple sacrifices" }, { label: "C", text: "By being born in Israel" }, { label: "D", text: "By Jesus" }], correctAnswer: "D", verse: "John 14:6", explanation: "Jesus is the way, truth, and life. God is the source of all life. Eternal life comes through Christ. God is life itself." },
  { id: "god67", question: "What does the psalmist say our God in the heavens has done?", options: [{ label: "A", text: "Nothing at all" }, { label: "B", text: "Only what men asked of Him" }, { label: "C", text: "Only what the nations allowed" }, { label: "D", text: "Whatsoever He hath pleased" }], correctAnswer: "D", verse: "Psalm 115:3", explanation: "God does whatever He pleases. His sovereignty is absolute. God rules over all creation. Nothing happens outside His will." },
  { id: "god68", question: "Who does the psalmist call blessed after saying the LORD is good?", options: [{ label: "A", text: "The man with many sons" }, { label: "B", text: "The man who is rich" }, { label: "C", text: "The man who is strong" }, { label: "D", text: "The man that trusteth in Him" }], correctAnswer: "D", verse: "Psalm 34:8", explanation: "Taste and see that the Lord is good. God's goodness is perfect. He is the source of all goodness. Goodness flows from God's character." },
  { id: "god69", question: "What does Isaiah say the everlasting God, the Creator of the ends of the earth, never does?", options: [{ label: "A", text: "Speak" }, { label: "B", text: "Forgive" }, { label: "C", text: "Remember" }, { label: "D", text: "Faint or grow weary" }], correctAnswer: "D", verse: "Isaiah 40:28", explanation: "Isaiah asks, Hast thou not known? The everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary." },
  { id: "god70", question: "What did the psalmist say about God's knowledge of him?", options: [{ label: "A", text: "It is a small thing" }, { label: "B", text: "It is easy to explain" }, { label: "C", text: "It is a heavy burden" }, { label: "D", text: "It is too wonderful for me" }], correctAnswer: "D", verse: "Psalm 139:6", explanation: "God's knowledge is too wonderful. He knows all things perfectly. Omniscience is God's attribute. Nothing is hidden from Him." },
  { id: "god71", question: "How do God's ways compare with our ways, according to Isaiah?", options: [{ label: "A", text: "They are slower" }, { label: "B", text: "They are the same" }, { label: "C", text: "They are lower" }, { label: "D", text: "They are higher" }], correctAnswer: "D", verse: "Isaiah 55:9", explanation: "God's ways are higher than human ways. He is completely other than creation. Transcendence emphasizes God's majesty. It calls for awe and worship." },
  { id: "god72", question: "What does the LORD say He fills?", options: [{ label: "A", text: "The temple only" }, { label: "B", text: "The sea only" }, { label: "C", text: "The land of Israel only" }, { label: "D", text: "Heaven and earth" }], correctAnswer: "D", verse: "Jeremiah 23:24", explanation: "The LORD asks, Can any hide himself in secret places that I shall not see him? Then He asks, Do not I fill heaven and earth? No one can hide from Him." },
  { id: "god73", question: "What does Peter say the Lord wants all to come to?", options: [{ label: "A", text: "Riches" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Old age" }, { label: "D", text: "Repentance" }], correctAnswer: "D", verse: "2 Peter 3:9", explanation: "God is patient, not wanting anyone to perish. He gives time for repentance. Patience shows God's mercy. It leads to salvation." },
  { id: "god74", question: "How does the psalmist say the LORD pities them that fear Him?", options: [{ label: "A", text: "As a king pities his servants" }, { label: "B", text: "As a master pities his slaves" }, { label: "C", text: "As a judge pities the guilty" }, { label: "D", text: "As a father pities his children" }], correctAnswer: "D", verse: "Psalm 103:13", explanation: "God has compassion on those who fear Him. Compassion is God's heart. It moves Him to action. Compassion reflects God's love." },
  { id: "god75", question: "What does the psalmist tell God has made him great?", options: [{ label: "A", text: "His own strength" }, { label: "B", text: "His army" }, { label: "C", text: "His wisdom" }, { label: "D", text: "God's gentleness" }], correctAnswer: "D", verse: "Psalm 18:35", explanation: "God's gentleness makes us great. Tenderness is part of God's strength. God cares for the weak. His power includes gentleness." },
  { id: "god76", question: "Paul calls God the Father of mercies and the God of all what?", options: [{ label: "A", text: "Riches" }, { label: "B", text: "Wars" }, { label: "C", text: "Seasons" }, { label: "D", text: "Comfort" }], correctAnswer: "D", verse: "2 Corinthians 1:3", explanation: "God is the Father of mercies and God of all comfort. He comforts in affliction. Comfort comes from God's presence. God turns mourning to joy." },
  { id: "god77", question: "What does James say to do if you lack wisdom?", options: [{ label: "A", text: "Ask the elders" }, { label: "B", text: "Study harder" }, { label: "C", text: "Wait for old age" }, { label: "D", text: "Ask of God" }], correctAnswer: "D", verse: "James 1:5", explanation: "God gives generously to all. He does not withhold wisdom. Generosity is God's nature. He gives without finding fault." },
  { id: "god78", question: "On which day did God rest from all His work?", options: [{ label: "A", text: "The first day" }, { label: "B", text: "The third day" }, { label: "C", text: "The sixth day" }, { label: "D", text: "The seventh day" }], correctAnswer: "D", verse: "Genesis 2:2", explanation: "On the seventh day God ended His work which He had made. He rested on the seventh day from all His work." },
  { id: "god79", question: "What did God create in the beginning?", options: [{ label: "A", text: "The garden of Eden only" }, { label: "B", text: "The tower of Babel" }, { label: "C", text: "The ark" }, { label: "D", text: "The heaven and the earth" }], correctAnswer: "D", verse: "Genesis 1:1", explanation: "In the beginning God created. Creativity is God's nature. Creation displays His wisdom. God's creativity is limitless." },
  { id: "god80", question: "What does Paul say God is not the author of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Life" }, { label: "C", text: "Mercy" }, { label: "D", text: "Confusion" }], correctAnswer: "D", verse: "1 Corinthians 14:33", explanation: "God is not a God of confusion but of peace. Order reflects God's character. Creation shows divine order. God brings order from chaos." },
  { id: "god81", question: "What does the psalmist say the LORD who reigns is clothed with?", options: [{ label: "A", text: "Sackcloth" }, { label: "B", text: "Fine linen" }, { label: "C", text: "Purple" }, { label: "D", text: "Majesty" }], correctAnswer: "D", verse: "Psalm 93:1", explanation: "The Lord reigns, clothed with majesty. Majesty demands worship. God's greatness is unsearchable. Majesty inspires awe and reverence." },
  { id: "god82", question: "To whom do the secret things belong?", options: [{ label: "A", text: "The priests" }, { label: "B", text: "The kings" }, { label: "C", text: "The wise men" }, { label: "D", text: "The LORD our God" }], correctAnswer: "D", verse: "Deuteronomy 29:29", explanation: "Moses said the secret things belong unto the LORD our God. But the things that are revealed belong to us and to our children for ever, that we may do all the words of the law." },
  { id: "god83", question: "What does James say God will do if you draw nigh to Him?", options: [{ label: "A", text: "He will hide" }, { label: "B", text: "He will test you" }, { label: "C", text: "He will send you away" }, { label: "D", text: "He will draw nigh to you" }], correctAnswer: "D", verse: "James 4:8", explanation: "Draw near to God and He will draw near to you. Intimacy is possible with God. God desires relationship. He knows us personally." },
  { id: "god84", question: "What is God to the fatherless, according to the psalmist?", options: [{ label: "A", text: "A stranger" }, { label: "B", text: "A taskmaster" }, { label: "C", text: "A neighbour" }, { label: "D", text: "A father" }], correctAnswer: "D", verse: "Psalm 68:5", explanation: "God is a father to the fatherless. He shows care for the vulnerable. God protects the weak. Vulnerability moves God's heart." },
  { id: "god85", question: "Complete the verse: God is not ____, that he should lie.", options: [{ label: "A", text: "an angel" }, { label: "B", text: "a king" }, { label: "C", text: "a prophet" }, { label: "D", text: "a man" }], correctAnswer: "D", verse: "Numbers 23:19", explanation: "God is not a man that He should lie. Reliability is God's nature. He is completely trustworthy. God's Word is dependable." },
  { id: "god86", question: "To whom does God give grace, according to James?", options: [{ label: "A", text: "The proud" }, { label: "B", text: "The rich" }, { label: "C", text: "The strong" }, { label: "D", text: "The humble" }], correctAnswer: "D", verse: "James 4:6", explanation: "God opposes the proud but gives grace to the humble. Humility pleases God. God shows humility in Christ. Pride leads to destruction." },
  { id: "god87", question: "How are believers told to come to the throne of grace?", options: [{ label: "A", text: "Fearfully" }, { label: "B", text: "Rarely" }, { label: "C", text: "Silently" }, { label: "D", text: "Boldly" }], correctAnswer: "D", verse: "Hebrews 4:16", explanation: "Approach the throne of grace with confidence. God is accessible to believers. Prayer brings us near. God welcomes the seeking heart." },
  { id: "god88", question: "By whom are believers changed into the image of the Lord, from glory to glory?", options: [{ label: "A", text: "The law of Moses" }, { label: "B", text: "The angels" }, { label: "C", text: "The rulers of this world" }, { label: "D", text: "The Spirit of the Lord" }], correctAnswer: "D", verse: "2 Corinthians 3:18", explanation: "We are being transformed into His image. God changes hearts. Transformation is God's work. He makes all things new." },
  { id: "god89", question: "Who is the same yesterday, and to day, and for ever?", options: [{ label: "A", text: "King David" }, { label: "B", text: "Moses" }, { label: "C", text: "The high priest" }, { label: "D", text: "Jesus Christ" }], correctAnswer: "D", verse: "Hebrews 13:8", explanation: "Jesus Christ is the same yesterday and today and forever. Constancy gives security. God's nature never changes. He is forever faithful." },
  { id: "god90", question: "What shall they that wait upon the LORD renew?", options: [{ label: "A", text: "Their vows" }, { label: "B", text: "Their houses" }, { label: "C", text: "Their fields" }, { label: "D", text: "Their strength" }], correctAnswer: "D", verse: "Isaiah 40:31", explanation: "Those who hope in the Lord will renew their strength. Renewal is God's promise. He makes all things new. God restores what is broken." },
  { id: "god91", question: "What did the Lord tell Paul is sufficient for him?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Paul's own strength" }, { label: "C", text: "Paul's own wisdom" }, { label: "D", text: "The Lord's grace" }], correctAnswer: "D", verse: "2 Corinthians 12:9", explanation: "My grace is sufficient for you. God is enough. His power is made perfect in weakness. Sufficiency comes from God alone." },
  { id: "god92", question: "Through whom does God give us the victory?", options: [{ label: "A", text: "Moses" }, { label: "B", text: "The angels" }, { label: "C", text: "The kings of the earth" }, { label: "D", text: "Our Lord Jesus Christ" }], correctAnswer: "D", verse: "1 Corinthians 15:57", explanation: "Thanks be to God who gives us the victory. God is the conqueror. Victory comes through Christ. God triumphs over evil." },
  { id: "god93", question: "What does Paul say dwells bodily in Christ?", options: [{ label: "A", text: "The wisdom of Solomon" }, { label: "B", text: "The spirit of Elijah" }, { label: "C", text: "The strength of Samson" }, { label: "D", text: "All the fulness of the Godhead" }], correctAnswer: "D", verse: "Colossians 2:9", explanation: "In Christ all the fullness of the Deity lives in bodily form. God is completely perfect. He lacks nothing. Completeness is God's nature." },
  { id: "god94", question: "Why did Jesus say He came?", options: [{ label: "A", text: "To steal" }, { label: "B", text: "To kill" }, { label: "C", text: "To destroy" }, { label: "D", text: "That they might have life more abundantly" }], correctAnswer: "D", verse: "John 10:10", explanation: "I have come that they may have life abundantly. Abundance characterizes God. He gives generously. God's blessings overflow." },
  { id: "god95", question: "Complete the words spoken to Israel: The LORD our God is ____.", options: [{ label: "A", text: "far away" }, { label: "B", text: "many" }, { label: "C", text: "unknown" }, { label: "D", text: "one LORD" }], correctAnswer: "D", verse: "Deuteronomy 6:4", explanation: "Hear, O Israel: The Lord our God, the Lord is one. God is uniquely God. No one compares to Him. Uniqueness demands exclusive worship." },
  { id: "god96", question: "Paul praises God as the King eternal, invisible and what else?", options: [{ label: "A", text: "Unknown" }, { label: "B", text: "Silent" }, { label: "C", text: "Distant" }, { label: "D", text: "Immortal" }], correctAnswer: "D", verse: "1 Timothy 1:17", explanation: "To the King eternal, immortal, invisible, the only God. Eternity is God's essence. He has no beginning or end. Eternal life comes from eternal God." },
  { id: "god97", question: "What does the psalmist say about the Lord's understanding?", options: [{ label: "A", text: "It is small" }, { label: "B", text: "It is like man's" }, { label: "C", text: "It grows each day" }, { label: "D", text: "It is infinite" }], correctAnswer: "D", verse: "Psalm 147:5", explanation: "Great is our Lord and mighty in power; His understanding has no limit. God is infinite in all attributes. Nothing limits God. Infinity shows God's greatness." },
  { id: "god98", question: "What does the song of Moses say about the work of God, who is called the Rock?", options: [{ label: "A", text: "It is unfinished" }, { label: "B", text: "It is hidden" }, { label: "C", text: "It is slow" }, { label: "D", text: "It is perfect" }], correctAnswer: "D", verse: "Deuteronomy 32:4", explanation: "Moses sang, He is the Rock, his work is perfect: for all his ways are judgment. He called Him a God of truth and without iniquity, just and right." },
  { id: "god99", question: "Of what does Paul say Christ is the head?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "The city of Rome" }, { label: "C", text: "The tribe of Levi" }, { label: "D", text: "The body, the church" }], correctAnswer: "D", verse: "Colossians 1:18", explanation: "He is the head of the body, the church; He is the beginning. Christ has supremacy. God is supreme over all. Supremacy demands submission." },
  { id: "god100", question: "What did Jesus tell Philip about anyone who has seen Him?", options: [{ label: "A", text: "He has seen an angel" }, { label: "B", text: "He has seen a prophet" }, { label: "C", text: "He has seen the Father" }, { label: "D", text: "He has seen Elijah" }], correctAnswer: "C", verse: "John 14:9", explanation: "Anyone who has seen me has seen the Father. Jesus reveals God's character perfectly. Christ is the image of God. In Jesus we see God's heart." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GodTriviaPage() {
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
        
        // Fetch user's progress for god questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'god');

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
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'god' });
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
            book: 'god'
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
    if (score === 10) return "Perfect! You're a God expert!";
    if (score >= 8) return "Excellent! You know God well!";
    if (score >= 6) return "Good job! Keep studying God's character!";
    if (score >= 4) return "Nice try! God has much to reveal!";
    return "Keep learning! Every question brings you closer to God!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✨</div>
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
              href="/bible-trivia/god"
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



