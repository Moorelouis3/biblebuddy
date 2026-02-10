"use client";

import { useState, useEffect } from "react";
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
  { id: "god04", question: "Which name of God means 'I AM THAT I AM'?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Jehovah" }, { label: "C", text: "Yahweh" }, { label: "D", text: "Adonai" }], correctAnswer: "C", verse: "Exodus 3:14", explanation: "Yahweh means 'I AM THAT I AM'. God revealed this name to Moses at the burning bush. It speaks of God's eternal self-existence. Yahweh emphasizes God's unchanging nature." },
  { id: "god05", question: "What does God's holiness mean?", options: [{ label: "A", text: "He is loving" }, { label: "B", text: "He is set apart from sin" }, { label: "C", text: "He is powerful" }, { label: "D", text: "He is wise" }], correctAnswer: "B", verse: "Isaiah 6:3", explanation: "Holiness means being completely set apart from sin. The seraphim cry 'Holy, holy, holy' before God. God's holiness demands reverence and purity. It is the foundation of His moral perfection." },
  { id: "god06", question: "Which attribute means God is present everywhere?", options: [{ label: "A", text: "Omnipotent" }, { label: "B", text: "Omniscient" }, { label: "C", text: "Omnipresent" }, { label: "D", text: "Eternal" }], correctAnswer: "C", verse: "Psalm 139:7-10", explanation: "Omnipresent means God is present everywhere simultaneously. David asks where he can flee from God's presence. God's presence brings comfort and accountability. He is never absent from His creation." },
  { id: "god07", question: "What does it mean that God is immutable?", options: [{ label: "A", text: "He is all-powerful" }, { label: "B", text: "He never changes" }, { label: "C", text: "He is everywhere" }, { label: "D", text: "He knows everything" }], correctAnswer: "B", verse: "Malachi 3:6", explanation: "Immutable means God never changes. He is the same yesterday, today, and forever. This gives believers security in God's promises. His character and purposes remain constant." },
  { id: "god08", question: "Which name of God means 'Lord' or 'Master'?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "Jehovah" }, { label: "C", text: "Adonai" }, { label: "D", text: "El Roi" }], correctAnswer: "C", verse: "Genesis 15:2", explanation: "Adonai means Lord or Master. It emphasizes God's authority and ownership. This name appears frequently in the Old Testament. It calls for submission to God's lordship." },
  { id: "god09", question: "What is God's primary emotion toward His people?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Love" }, { label: "C", text: "Justice" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "1 John 4:8", explanation: "God is love according to Scripture. His love is the foundation of all His actions. Love motivates God's redemptive plan. God's love is sacrificial and unconditional." },
  { id: "god10", question: "Which name means 'God Almighty'?", options: [{ label: "A", text: "Elohim" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "Jehovah Jireh" }, { label: "D", text: "El Elyon" }], correctAnswer: "B", verse: "Genesis 17:1", explanation: "El Shaddai means God Almighty. God appeared to Abraham as El Shaddai. It emphasizes God's unlimited power and strength. This name gives confidence in God's ability." },
  { id: "god11", question: "What does God's righteousness mean?", options: [{ label: "A", text: "He is fair" }, { label: "B", text: "He always does what is right" }, { label: "C", text: "He is holy" }, { label: "D", text: "He is loving" }], correctAnswer: "B", verse: "Psalm 145:17", explanation: "God's righteousness means He always does what is right. His ways are perfect and just. This attribute demands moral accountability. God's righteousness and love work together." },
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
  { id: "god22", question: "What is the Holy Spirit's primary role?", options: [{ label: "A", text: "To create" }, { label: "B", text: "To convict of sin" }, { label: "C", text: "To judge" }, { label: "D", text: "To destroy" }], correctAnswer: "B", verse: "John 16:8", explanation: "The Holy Spirit convicts the world of sin. He brings conviction of sin, righteousness, and judgment. The Spirit draws people to Christ. Conviction leads to repentance." },
  { id: "god23", question: "Which person of the Trinity became flesh?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "None" }], correctAnswer: "B", verse: "John 1:14", explanation: "The Son (Jesus) became flesh and dwelt among us. The Word became human. This is the incarnation. God became man to save humanity." },
  { id: "god24", question: "What is God's wrath?", options: [{ label: "A", text: "His love" }, { label: "B", text: "His righteous anger against sin" }, { label: "C", text: "His mercy" }, { label: "D", text: "His grace" }], correctAnswer: "B", verse: "Romans 1:18", explanation: "God's wrath is His righteous anger against sin. It is revealed against all ungodliness. Wrath is not capricious but just. God's wrath and love are compatible." },
  { id: "god25", question: "What does God's transcendence mean?", options: [{ label: "A", text: "He is immanent" }, { label: "B", text: "He is above and independent of creation" }, { label: "C", text: "He is everywhere" }, { label: "D", text: "He is changing" }], correctAnswer: "B", verse: "Isaiah 40:22", explanation: "Transcendence means God is above creation. He sits above the earth. God is not part of His creation. He is completely other than the universe." },
  { id: "god26", question: "What is God's immanence?", options: [{ label: "A", text: "He is far away" }, { label: "B", text: "He is present and active in creation" }, { label: "C", text: "He is above creation" }, { label: "D", text: "He is unchanging" }], correctAnswer: "B", verse: "Acts 17:28", explanation: "Immanence means God is present in His creation. We live and move and have our being in Him. God is not distant but near. He is actively involved in the world." },
  { id: "god27", question: "Which attribute shows God is infinite?", options: [{ label: "A", text: "His love" }, { label: "B", text: "His eternity" }, { label: "C", text: "His power" }, { label: "D", text: "His wisdom" }], correctAnswer: "B", verse: "Psalm 90:2", explanation: "Eternity means God has no beginning or end. He is from everlasting to everlasting. God exists outside of time. His eternal nature gives hope." },
  { id: "god28", question: "What is God's wisdom?", options: [{ label: "A", text: "His knowledge" }, { label: "B", text: "His perfect understanding and application" }, { label: "C", text: "His power" }, { label: "D", text: "His holiness" }], correctAnswer: "B", verse: "Romans 11:33", explanation: "God's wisdom is perfect understanding and application. His ways are unsearchable. God's wisdom is beyond human comprehension. It guides all His actions." },
  { id: "god29", question: "Which name means 'God of Seeing'?", options: [{ label: "A", text: "El Roi" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "El Elyon" }, { label: "D", text: "El Olam" }], correctAnswer: "A", verse: "Genesis 16:13", explanation: "El Roi means 'God who sees'. Hagar named God this after He saw her affliction. God sees the suffering of the oppressed. He is aware of every detail." },
  { id: "god30", question: "What does God's jealousy mean?", options: [{ label: "A", text: "He is envious" }, { label: "B", text: "He demands exclusive worship" }, { label: "C", text: "He is angry" }, { label: "D", text: "He is possessive" }], correctAnswer: "B", verse: "Exodus 20:5", explanation: "God's jealousy demands exclusive worship. He will not share glory with idols. Jealousy flows from His holiness. God deserves our complete devotion." },
  { id: "god31", question: "Which name means 'Everlasting God'?", options: [{ label: "A", text: "El Roi" }, { label: "B", text: "El Shaddai" }, { label: "C", text: "El Elyon" }, { label: "D", text: "El Olam" }], correctAnswer: "D", verse: "Genesis 21:33", explanation: "El Olam means 'Everlasting God'. Abraham called on this name. It emphasizes God's eternal nature. God is the unchanging eternal One." },
  { id: "god32", question: "What is God's goodness?", options: [{ label: "A", text: "His power" }, { label: "B", text: "His moral excellence and kindness" }, { label: "C", text: "His justice" }, { label: "D", text: "His holiness" }], correctAnswer: "B", verse: "Psalm 34:8", explanation: "God's goodness is His moral excellence and kindness. Taste and see that the Lord is good. God's goodness is the source of blessing. It motivates worship and trust." },
  { id: "god33", question: "How does God reveal Himself primarily?", options: [{ label: "A", text: "Through nature" }, { label: "B", text: "Through the Bible" }, { label: "C", text: "Through dreams" }, { label: "D", text: "Through angels" }], correctAnswer: "B", verse: "2 Timothy 3:16", explanation: "God reveals Himself primarily through Scripture. All Scripture is God-breathed. The Bible is God's Word. It is the definitive revelation of God." },
  { id: "god34", question: "What is God's covenant love?", options: [{ label: "A", text: "Hesed" }, { label: "B", text: "Agape" }, { label: "C", text: "Philos" }, { label: "D", text: "Eros" }], correctAnswer: "A", verse: "Psalm 136:1", explanation: "Hesed is God's covenant love and mercy. It is steadfast and faithful love. God's love is committed and unchanging. Hesed appears repeatedly in Psalms." },
  { id: "god35", question: "Which attribute means God is self-sufficient?", options: [{ label: "A", text: "Omnipotent" }, { label: "B", text: "Aseity" }, { label: "C", text: "Omniscient" }, { label: "D", text: "Omnipresent" }], correctAnswer: "B", verse: "Acts 17:25", explanation: "Aseity means God is self-existent and self-sufficient. He is not served by human hands. God needs nothing from creation. He is completely independent." },
  { id: "god36", question: "What is God's patience?", options: [{ label: "A", text: "His slowness to anger" }, { label: "B", text: "His mercy" }, { label: "C", text: "His love" }, { label: "D", text: "His grace" }], correctAnswer: "A", verse: "Exodus 34:6", explanation: "God's patience is His slowness to anger. He is abundant in lovingkindness. Patience gives time for repentance. God's patience leads to salvation." },
  { id: "god37", question: "How does God speak to people today?", options: [{ label: "A", text: "Through dreams" }, { label: "B", text: "Through the Bible" }, { label: "C", text: "Through prophets" }, { label: "D", text: "Through angels" }], correctAnswer: "B", verse: "Hebrews 1:1-2", explanation: "God speaks through His Son in these last days. The Bible is God's final word. Scripture is sufficient for faith and practice. God speaks through His written Word." },
  { id: "god38", question: "What is God's glory?", options: [{ label: "A", text: "His power" }, { label: "B", text: "His manifest presence and majesty" }, { label: "C", text: "His holiness" }, { label: "D", text: "His love" }], correctAnswer: "B", verse: "Exodus 33:18", explanation: "Glory is God's manifest presence and majesty. Moses asked to see God's glory. God's glory reveals His character. It demands worship and awe." },
  { id: "god39", question: "Which person of the Trinity is called the Helper?", options: [{ label: "A", text: "Father" }, { label: "B", text: "Son" }, { label: "C", text: "Holy Spirit" }, { label: "D", text: "None" }], correctAnswer: "C", verse: "John 14:26", explanation: "The Holy Spirit is called the Helper. He teaches and brings remembrance. The Spirit assists believers. He empowers Christian living." },
  { id: "god40", question: "What is God's purpose in creation?", options: [{ label: "A", text: "To display His glory" }, { label: "B", text: "To create beauty" }, { label: "C", text: "To have servants" }, { label: "D", text: "To test humans" }], correctAnswer: "A", verse: "Isaiah 43:7", explanation: "God's purpose is to display His glory. Everything exists for His glory. Creation reveals God's character. Worship is the ultimate purpose." },
  { id: "god41", question: "How does God feel about sin?", options: [{ label: "A", text: "He ignores it" }, { label: "B", text: "He hates it" }, { label: "C", text: "He tolerates it" }, { label: "D", text: "He enjoys it" }], correctAnswer: "B", verse: "Proverbs 6:16-19", explanation: "God hates sin and wickedness. He cannot tolerate evil. Sin offends God's holy character. God's hatred of sin shows His righteousness." },
  { id: "god42", question: "What is God's relationship to time?", options: [{ label: "A", text: "He is bound by time" }, { label: "B", text: "He exists outside of time" }, { label: "C", text: "He created time" }, { label: "D", text: "Both B and C" }], correctAnswer: "D", verse: "2 Peter 3:8", explanation: "God exists outside of time and created it. A day is like a thousand years to Him. God's eternal nature transcends time. He sees past, present, and future." },
  { id: "god43", question: "Which attribute means God is simple?", options: [{ label: "A", text: "He is uncomplicated" }, { label: "B", text: "His being is not composed of parts" }, { label: "C", text: "He is easy to understand" }, { label: "D", text: "He is basic" }], correctAnswer: "B", verse: "Deuteronomy 6:4", explanation: "Divine simplicity means God's being has no parts. He is not composed of attributes. God is one undivided being. His attributes are identical to His essence." },
  { id: "god44", question: "How does God know the future?", options: [{ label: "A", text: "He predicts it" }, { label: "B", text: "He sees it" }, { label: "C", text: "He determines it" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Isaiah 46:10", explanation: "God knows the future because He determines it. His counsel stands forever. God's foreknowledge is certain. He declares the end from the beginning." },
  { id: "god45", question: "What is God's relationship to evil?", options: [{ label: "A", text: "He causes evil" }, { label: "B", text: "He permits evil but is not its author" }, { label: "C", text: "He is indifferent to evil" }, { label: "D", text: "He enjoys evil" }], correctAnswer: "B", verse: "Job 1:12", explanation: "God permits evil but is not its author. Satan needed permission to afflict Job. God uses evil for good purposes. Evil exists in a fallen world." },
  { id: "god46", question: "Which name means 'God My Shepherd'?", options: [{ label: "A", text: "Jehovah Rohi" }, { label: "B", text: "Jehovah Jireh" }, { label: "C", text: "Jehovah Nissi" }, { label: "D", text: "Jehovah Rapha" }], correctAnswer: "A", verse: "Psalm 23:1", explanation: "Jehovah Rohi means 'The Lord is my shepherd'. David experienced God's care. God provides, protects, and guides. The shepherd metaphor shows God's tender care." },
  { id: "god47", question: "What is God's justice?", options: [{ label: "A", text: "His fairness" }, { label: "B", text: "His righteousness in judgment" }, { label: "C", text: "His mercy" }, { label: "D", text: "His grace" }], correctAnswer: "B", verse: "Psalm 89:14", explanation: "Justice is God's righteousness in judgment. Righteousness and justice are His throne. God judges fairly and rightly. Justice demands punishment for sin." },
  { id: "god48", question: "How does God respond to prayer?", options: [{ label: "A", text: "He always says yes" }, { label: "B", text: "He always says no" }, { label: "C", text: "He answers according to His will" }, { label: "D", text: "He ignores prayer" }], correctAnswer: "C", verse: "1 John 5:14", explanation: "God answers prayer according to His will. We can be confident when we ask according to His will. Prayer aligns with God's purposes. God hears and responds." },
  { id: "god49", question: "What is God's relationship to suffering?", options: [{ label: "A", text: "He causes all suffering" }, { label: "B", text: "He is indifferent to suffering" }, { label: "C", text: "He uses suffering for good purposes" }, { label: "D", text: "He eliminates all suffering" }], correctAnswer: "C", verse: "Romans 8:28", explanation: "God uses suffering for good purposes. All things work together for good. Suffering has redemptive value. God brings beauty from ashes." },
  { id: "god50", question: "Which attribute means God is perfect?", options: [{ label: "A", text: "His holiness" }, { label: "B", text: "His righteousness" }, { label: "C", text: "His love" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Matthew 5:48", explanation: "God is perfect in all His attributes. Be perfect as your Father is perfect. God's perfection is the standard. He lacks nothing in excellence." },
  { id: "god51", question: "How does God show His love?", options: [{ label: "A", text: "Through creation" }, { label: "B", text: "Through Jesus' death" }, { label: "C", text: "Through answered prayer" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Romans 5:8", explanation: "God shows love in many ways, supremely through Christ's death. God demonstrates His love. Love is action, not just feeling. God's love is sacrificial." },
  { id: "god52", question: "What is God's relationship to truth?", options: [{ label: "A", text: "He speaks truth" }, { label: "B", text: "He is truth" }, { label: "C", text: "He cannot lie" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Titus 1:2", explanation: "God is truth and cannot lie. God founded truth on faithfulness. God's truthfulness is absolute. His Word is completely reliable." },
  { id: "god53", question: "How does God feel about repentance?", options: [{ label: "A", text: "He hates it" }, { label: "B", text: "He is indifferent" }, { label: "C", text: "He delights in it" }, { label: "D", text: "He ignores it" }], correctAnswer: "C", verse: "Ezekiel 18:23", explanation: "God delights in repentance. He takes no pleasure in the death of the wicked. Repentance brings joy in heaven. God welcomes returning sinners." },
  { id: "god54", question: "What is God's relationship to beauty?", options: [{ label: "A", text: "He is beautiful" }, { label: "B", text: "He creates beauty" }, { label: "C", text: "He appreciates beauty" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 27:4", explanation: "God is beautiful and creates beauty. One thing I ask: to behold God's beauty. God's beauty is glorious. Beauty reflects God's character." },
  { id: "god55", question: "How does God show His power?", options: [{ label: "A", text: "Through miracles" }, { label: "B", text: "Through creation" }, { label: "C", text: "Through resurrection" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Romans 1:20", explanation: "God's power is evident in creation and miracles. His invisible attributes are clearly seen. Power displays God's glory. God's power is for His purposes." },
  { id: "god56", question: "What is God's relationship to wisdom?", options: [{ label: "A", text: "He has wisdom" }, { label: "B", text: "He is wisdom" }, { label: "C", text: "He gives wisdom" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 Corinthians 1:24", explanation: "Christ is the wisdom of God. God gives wisdom generously. Wisdom comes from God. God's wisdom is perfect and complete." },
  { id: "god57", question: "How does God show His faithfulness?", options: [{ label: "A", text: "Through keeping promises" }, { label: "B", text: "Through covenant relationships" }, { label: "C", text: "Through consistent character" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Lamentations 3:23", explanation: "God's faithfulness is new every morning. His mercies never cease. Faithfulness is God's nature. It provides security and hope." },
  { id: "god58", question: "What is God's relationship to joy?", options: [{ label: "A", text: "He gives joy" }, { label: "B", text: "He has joy" }, { label: "C", text: "He is joy" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 16:11", explanation: "God has fullness of joy. In His presence is fullness of joy. God gives joy to believers. Joy is part of God's character." },
  { id: "god59", question: "How does God show His mercy?", options: [{ label: "A", text: "Through forgiveness" }, { label: "B", text: "Through compassion" }, { label: "C", text: "Through patience" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 103:8", explanation: "God is compassionate and gracious, slow to anger, abounding in love. Mercy characterizes God's dealings. Mercy withholds deserved punishment." },
  { id: "god60", question: "What is God's relationship to peace?", options: [{ label: "A", text: "He gives peace" }, { label: "B", text: "He is peace" }, { label: "C", text: "He creates peace" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "John 14:27", explanation: "Jesus gives peace not as the world gives. God is the God of peace. Peace comes from relationship with God. God's peace surpasses understanding." },
  { id: "god61", question: "How does God show His grace?", options: [{ label: "A", text: "Through unmerited favor" }, { label: "B", text: "Through salvation" }, { label: "C", text: "Through blessing" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Ephesians 2:8", explanation: "Grace is God's unmerited favor. By grace you have been saved. Grace gives what is undeserved. God's grace is abundant and free." },
  { id: "god62", question: "What is God's relationship to hope?", options: [{ label: "A", text: "He gives hope" }, { label: "B", text: "He is hope" }, { label: "C", text: "He inspires hope" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Romans 15:13", explanation: "God is the God of hope. He fills with joy and peace in believing. Hope comes from God's promises. God is the source of true hope." },
  { id: "god63", question: "How does God show His holiness?", options: [{ label: "A", text: "Through separation from sin" }, { label: "B", text: "Through moral perfection" }, { label: "C", text: "Through worship" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 Peter 1:16", explanation: "Be holy because God is holy. Holiness demands purity and separation. God's holiness is majestic. It calls for reverent worship." },
  { id: "god64", question: "What is God's relationship to light?", options: [{ label: "A", text: "He created light" }, { label: "B", text: "He is light" }, { label: "C", text: "He dwells in light" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 John 1:5", explanation: "God is light and in Him is no darkness. Light represents truth and purity. God's nature is pure light. Darkness cannot exist in God's presence." },
  { id: "god65", question: "How does God show His righteousness?", options: [{ label: "A", text: "Through just actions" }, { label: "B", text: "Through moral perfection" }, { label: "C", text: "Through judgment" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 119:137", explanation: "God is righteous and His judgments are right. Righteousness is God's nature. It demands moral accountability. God's righteousness is perfect." },
  { id: "god66", question: "What is God's relationship to life?", options: [{ label: "A", text: "He created life" }, { label: "B", text: "He is life" }, { label: "C", text: "He gives life" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "John 14:6", explanation: "Jesus is the way, truth, and life. God is the source of all life. Eternal life comes through Christ. God is life itself." },
  { id: "god67", question: "How does God show His sovereignty?", options: [{ label: "A", text: "Through control" }, { label: "B", text: "Through authority" }, { label: "C", text: "Through ruling" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 115:3", explanation: "God does whatever He pleases. His sovereignty is absolute. God rules over all creation. Nothing happens outside His will." },
  { id: "god68", question: "What is God's relationship to goodness?", options: [{ label: "A", text: "He defines goodness" }, { label: "B", text: "He is good" }, { label: "C", text: "He does good" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 34:8", explanation: "Taste and see that the Lord is good. God's goodness is perfect. He is the source of all goodness. Goodness flows from God's character." },
  { id: "god69", question: "How does God show His eternity?", options: [{ label: "A", text: "Through endless existence" }, { label: "B", text: "Through timelessness" }, { label: "C", text: "Through immortality" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 90:2", explanation: "God is from everlasting to everlasting. He has no beginning or end. Eternity is God's nature. It gives context to human life." },
  { id: "god70", question: "What is God's relationship to knowledge?", options: [{ label: "A", text: "He has all knowledge" }, { label: "B", text: "He is omniscient" }, { label: "C", text: "He gives knowledge" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 139:6", explanation: "God's knowledge is too wonderful. He knows all things perfectly. Omniscience is God's attribute. Nothing is hidden from Him." },
  { id: "god71", question: "How does God show His transcendence?", options: [{ label: "A", text: "Through being above creation" }, { label: "B", text: "Through independence" }, { label: "C", text: "Through superiority" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Isaiah 55:9", explanation: "God's ways are higher than human ways. He is completely other than creation. Transcendence emphasizes God's majesty. It calls for awe and worship." },
  { id: "god72", question: "What is God's relationship to immanence?", options: [{ label: "A", text: "He is distant" }, { label: "B", text: "He is near" }, { label: "C", text: "He is involved" }, { label: "D", text: "Both B and C" }], correctAnswer: "D", verse: "Jeremiah 23:23", explanation: "God is a God nearby, not far away. Immanence shows God's presence. He is actively involved in creation. God is both transcendent and immanent." },
  { id: "god73", question: "How does God show His patience?", options: [{ label: "A", text: "Through waiting" }, { label: "B", text: "Through longsuffering" }, { label: "C", text: "Through tolerance" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Peter 3:9", explanation: "God is patient, not wanting anyone to perish. He gives time for repentance. Patience shows God's mercy. It leads to salvation." },
  { id: "god74", question: "What is God's relationship to compassion?", options: [{ label: "A", text: "He has compassion" }, { label: "B", text: "He shows compassion" }, { label: "C", text: "He is compassionate" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 103:13", explanation: "God has compassion on those who fear Him. Compassion is God's heart. It moves Him to action. Compassion reflects God's love." },
  { id: "god75", question: "How does God show His tenderness?", options: [{ label: "A", text: "Through gentle care" }, { label: "B", text: "Through kindness" }, { label: "C", text: "Through nurture" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 18:35", explanation: "God's gentleness makes us great. Tenderness is part of God's strength. God cares for the weak. His power includes gentleness." },
  { id: "god76", question: "What is God's relationship to comfort?", options: [{ label: "A", text: "He gives comfort" }, { label: "B", text: "He is the God of comfort" }, { label: "C", text: "He comforts the afflicted" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Corinthians 1:3", explanation: "God is the Father of mercies and God of all comfort. He comforts in affliction. Comfort comes from God's presence. God turns mourning to joy." },
  { id: "god77", question: "How does God show His generosity?", options: [{ label: "A", text: "Through giving" }, { label: "B", text: "Through abundance" }, { label: "C", text: "Through blessing" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "James 1:5", explanation: "God gives generously to all. He does not withhold wisdom. Generosity is God's nature. He gives without finding fault." },
  { id: "god78", question: "What is God's relationship to rest?", options: [{ label: "A", text: "He rested on the seventh day" }, { label: "B", text: "He gives rest" }, { label: "C", text: "He is rest" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Matthew 11:28", explanation: "Jesus gives rest to the weary. God rested after creation. Rest comes from God. He provides peace for the soul." },
  { id: "god79", question: "How does God show His creativity?", options: [{ label: "A", text: "Through creation" }, { label: "B", text: "Through design" }, { label: "C", text: "Through beauty" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Genesis 1:1", explanation: "In the beginning God created. Creativity is God's nature. Creation displays His wisdom. God's creativity is limitless." },
  { id: "god80", question: "What is God's relationship to order?", options: [{ label: "A", text: "He created order" }, { label: "B", text: "He is orderly" }, { label: "C", text: "He establishes order" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 Corinthians 14:33", explanation: "God is not a God of confusion but of peace. Order reflects God's character. Creation shows divine order. God brings order from chaos." },
  { id: "god81", question: "How does God show His majesty?", options: [{ label: "A", text: "Through glory" }, { label: "B", text: "Through splendor" }, { label: "C", text: "Through greatness" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 93:1", explanation: "The Lord reigns, clothed with majesty. Majesty demands worship. God's greatness is unsearchable. Majesty inspires awe and reverence." },
  { id: "god82", question: "What is God's relationship to mystery?", options: [{ label: "A", text: "He is mysterious" }, { label: "B", text: "He reveals mysteries" }, { label: "C", text: "He is beyond understanding" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Romans 11:33", explanation: "God's wisdom and knowledge are unsearchable. Mystery surrounds God's nature. He reveals what He chooses. God's ways are higher than ours." },
  { id: "god83", question: "How does God show His intimacy?", options: [{ label: "A", text: "Through relationship" }, { label: "B", text: "Through fellowship" }, { label: "C", text: "Through presence" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "James 4:8", explanation: "Draw near to God and He will draw near to you. Intimacy is possible with God. God desires relationship. He knows us personally." },
  { id: "god84", question: "What is God's relationship to vulnerability?", options: [{ label: "A", text: "He is vulnerable" }, { label: "B", text: "He shows vulnerability" }, { label: "C", text: "He protects the vulnerable" }, { label: "D", text: "Both B and C" }], correctAnswer: "D", verse: "Psalm 68:5", explanation: "God is a father to the fatherless. He shows care for the vulnerable. God protects the weak. Vulnerability moves God's heart." },
  { id: "god85", question: "How does God show His reliability?", options: [{ label: "A", text: "Through consistency" }, { label: "B", text: "Through faithfulness" }, { label: "C", text: "Through dependability" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Numbers 23:19", explanation: "God is not a man that He should lie. Reliability is God's nature. He is completely trustworthy. God's Word is dependable." },
  { id: "god86", question: "What is God's relationship to humility?", options: [{ label: "A", text: "He opposes pride" }, { label: "B", text: "He gives grace to the humble" }, { label: "C", text: "He shows humility" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "James 4:6", explanation: "God opposes the proud but gives grace to the humble. Humility pleases God. God shows humility in Christ. Pride leads to destruction." },
  { id: "god87", question: "How does God show His accessibility?", options: [{ label: "A", text: "Through prayer" }, { label: "B", text: "Through relationship" }, { label: "C", text: "Through approachability" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Hebrews 4:16", explanation: "Approach the throne of grace with confidence. God is accessible to believers. Prayer brings us near. God welcomes the seeking heart." },
  { id: "god88", question: "What is God's relationship to transformation?", options: [{ label: "A", text: "He transforms" }, { label: "B", text: "He changes people" }, { label: "C", text: "He renews" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Corinthians 3:18", explanation: "We are being transformed into His image. God changes hearts. Transformation is God's work. He makes all things new." },
  { id: "god89", question: "How does God show His constancy?", options: [{ label: "A", text: "Through unchanging nature" }, { label: "B", text: "Through reliable character" }, { label: "C", text: "Through steadfast love" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Hebrews 13:8", explanation: "Jesus Christ is the same yesterday and today and forever. Constancy gives security. God's nature never changes. He is forever faithful." },
  { id: "god90", question: "What is God's relationship to renewal?", options: [{ label: "A", text: "He renews creation" }, { label: "B", text: "He renews people" }, { label: "C", text: "He renews strength" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Isaiah 40:31", explanation: "Those who hope in the Lord will renew their strength. Renewal is God's promise. He makes all things new. God restores what is broken." },
  { id: "god91", question: "How does God show His sufficiency?", options: [{ label: "A", text: "Through provision" }, { label: "B", text: "Through strength" }, { label: "C", text: "Through grace" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Corinthians 12:9", explanation: "My grace is sufficient for you. God is enough. His power is made perfect in weakness. Sufficiency comes from God alone." },
  { id: "god92", question: "What is God's relationship to victory?", options: [{ label: "A", text: "He gives victory" }, { label: "B", text: "He is victorious" }, { label: "C", text: "He conquers" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 Corinthians 15:57", explanation: "Thanks be to God who gives us the victory. God is the conqueror. Victory comes through Christ. God triumphs over evil." },
  { id: "god93", question: "How does God show His completeness?", options: [{ label: "A", text: "Through perfection" }, { label: "B", text: "Through wholeness" }, { label: "C", text: "Through fullness" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Colossians 2:9", explanation: "In Christ all the fullness of the Deity lives in bodily form. God is completely perfect. He lacks nothing. Completeness is God's nature." },
  { id: "god94", question: "What is God's relationship to abundance?", options: [{ label: "A", text: "He has abundance" }, { label: "B", text: "He gives abundantly" }, { label: "C", text: "He is abundant" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "John 10:10", explanation: "I have come that they may have life abundantly. Abundance characterizes God. He gives generously. God's blessings overflow." },
  { id: "god95", question: "How does God show His uniqueness?", options: [{ label: "A", text: "Through being one" }, { label: "B", text: "Through being incomparable" }, { label: "C", text: "Through being supreme" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 6:4", explanation: "Hear, O Israel: The Lord our God, the Lord is one. God is uniquely God. No one compares to Him. Uniqueness demands exclusive worship." },
  { id: "god96", question: "What is God's relationship to eternity?", options: [{ label: "A", text: "He is eternal" }, { label: "B", text: "He gives eternal life" }, { label: "C", text: "He exists forever" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "1 Timothy 1:17", explanation: "To the King eternal, immortal, invisible, the only God. Eternity is God's essence. He has no beginning or end. Eternal life comes from eternal God." },
  { id: "god97", question: "How does God show His infinity?", options: [{ label: "A", text: "Through limitlessness" }, { label: "B", text: "Through boundlessness" }, { label: "C", text: "Through endlessness" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Psalm 147:5", explanation: "Great is our Lord and mighty in power; His understanding has no limit. God is infinite in all attributes. Nothing limits God. Infinity shows God's greatness." },
  { id: "god98", question: "What is God's relationship to perfection?", options: [{ label: "A", text: "He is perfect" }, { label: "B", text: "He demands perfection" }, { label: "C", text: "He perfects believers" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Matthew 5:48", explanation: "Be perfect, therefore, as your heavenly Father is perfect. Perfection is God's standard. He perfects what concerns us. God's perfection is complete." },
  { id: "god99", question: "How does God show His supremacy?", options: [{ label: "A", text: "Through authority" }, { label: "B", text: "Through preeminence" }, { label: "C", text: "Through sovereignty" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Colossians 1:18", explanation: "He is the head of the body, the church; He is the beginning. Christ has supremacy. God is supreme over all. Supremacy demands submission." },
  { id: "god100", question: "What is the ultimate revelation of God's character?", options: [{ label: "A", text: "Creation" }, { label: "B", text: "The Bible" }, { label: "C", text: "Jesus Christ" }, { label: "D", text: "The Holy Spirit" }], correctAnswer: "C", verse: "John 14:9", explanation: "Anyone who has seen me has seen the Father. Jesus reveals God's character perfectly. Christ is the image of God. In Jesus we see God's heart." }
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
  const [showResults, setShowResults] = useState(false);
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





