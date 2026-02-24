"use client";
import React from "react";

// Explanations for each verse reference
const VERSE_EXPLANATIONS: Record<string, string> = {
  "Psalm 119:105": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, during Israel’s monarchy.|||📖 What Was Happening: The people were relying on God’s Law to guide their lives.|||🔍 What It Means In Context: The psalmist describes God’s Word as a lamp and a light, showing that Scripture gives just enough guidance for each step.|||💡 How It Applies Today: You can trust the Bible to guide you through uncertainty, one step at a time.",
  "Psalm 119:130": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel treasured the Law as their foundation.|||📖 What Was Happening: The psalmist was reflecting on how God’s Word brings understanding to everyone, not just the wise.|||🔍 What It Means In Context: Opening Scripture brings light and wisdom, even to those who feel unqualified.|||💡 How It Applies Today: God’s Word is accessible and enlightening for all who seek it.",
  "Psalm 1:1–2": "✍️ Who Wrote It: David.|||📅 When: Around 1000 BC, as Israel was learning to live as God’s people.|||📖 What Was Happening: The nation was surrounded by influences that pulled them away from God.|||🔍 What It Means In Context: True happiness comes from delighting in God’s Law and meditating on it.|||💡 How It Applies Today: Joy grows when you let Scripture shape your thoughts and actions every day.",
  "2 Timothy 3:16": "✍️ Who Wrote It: Paul.|||📅 When: Mid-60s AD, while imprisoned in Rome.|||📖 What Was Happening: The early church was facing persecution and confusion about what to believe.|||🔍 What It Means In Context: All Scripture is inspired by God and useful for teaching and training.|||💡 How It Applies Today: Every part of the Bible has value and can help you grow, no matter what you’re facing.",
  "James 1:22": "✍️ Who Wrote It: James, the brother of Jesus.|||📅 When: Around AD 45–50, to Jewish Christians scattered by persecution.|||📖 What Was Happening: Believers were struggling to live out their faith in a challenging world.|||🔍 What It Means In Context: James urges them not just to listen to God’s Word, but to put it into practice.|||💡 How It Applies Today: Bible study is meant to change you, not just inform you.",
  "Colossians 3:16": "✍️ Who Wrote It: Paul.|||📅 When: Around AD 60–62, while in prison.|||📖 What Was Happening: The church in Colossae was facing false teachings and needed encouragement.|||🔍 What It Means In Context: Paul tells them to let Christ’s message dwell richly among them, shaping their worship and relationships.|||💡 How It Applies Today: Make God’s Word a living part of your daily life, letting it influence your thoughts and actions.",
  "Psalm 119:11": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel depended on God’s Law for guidance.|||📖 What Was Happening: The psalmist wanted to internalize Scripture to resist temptation.|||🔍 What It Means In Context: Storing God’s Word in your heart prepares you for challenges.|||💡 How It Applies Today: Let Scripture shape who you are and guide your choices.",
  "John 6:63": "✍️ Who Wrote It: John, one of Jesus’ disciples.|||📅 When: Around AD 90, as the early church was growing.|||📖 What Was Happening: Jesus was teaching that His words are spirit and life, not just information.|||🔍 What It Means In Context: God’s Word brings true life and spiritual nourishment.|||💡 How It Applies Today: Reading Scripture is about receiving life, not just learning facts.",
  "Romans 10:17": "✍️ Who Wrote It: Paul.|||📅 When: Around AD 57, to believers in Rome.|||📖 What Was Happening: The church was learning how faith works and needed unity.|||🔍 What It Means In Context: Faith comes from hearing the message of Christ.|||💡 How It Applies Today: Listening to God’s Word is essential for your faith to grow.",
  "Psalm 119:18": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel cherished God’s Law.|||📖 What Was Happening: The psalmist asks God to open his eyes to see wonderful things in Scripture.|||🔍 What It Means In Context: Seeking deeper understanding from God’s Word is vital.|||💡 How It Applies Today: Ask God for insight as you read the Bible.",
  "Psalm 19:7": "✍️ Who Wrote It: David.|||📅 When: Around 1000 BC, as Israel was learning to trust God’s Word.|||📖 What Was Happening: The people needed renewal and wisdom.|||🔍 What It Means In Context: God’s Law is perfect and able to revive the soul.|||💡 How It Applies Today: Scripture refreshes you when you’re weary and gives you wisdom for life.",
  "Matthew 4:4": "✍️ Who Wrote It: Matthew, a disciple of Jesus.|||📅 When: Around AD 60–70.|||📖 What Was Happening: Jesus spoke these words during His temptation in the wilderness.|||🔍 What It Means In Context: Spiritual nourishment is more important than physical food.|||💡 How It Applies Today: Feed your soul with God’s Word every day.",
  "John 17:17": "✍️ Who Wrote It: John, the beloved disciple.|||📅 When: Around AD 90, before Jesus went to the cross.|||📖 What Was Happening: The disciples were about to face hardship.|||🔍 What It Means In Context: Jesus prayed for their sanctification through God’s truth.|||💡 How It Applies Today: Let Scripture shape your identity and set you apart for God’s purposes.",
  "Psalm 119:33": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel valued God’s statutes.|||📖 What Was Happening: The psalmist asks God to teach him the way of His laws.|||🔍 What It Means In Context: Start study with humility and a teachable heart.|||💡 How It Applies Today: Approach the Bible ready to learn and grow.",
  "Deuteronomy 6:6": "✍️ Who Wrote It: Moses.|||📅 When: Around 1400 BC, as Israel prepared to enter the Promised Land.|||📖 What Was Happening: The people needed to remember God’s commands in daily life.|||🔍 What It Means In Context: Moses tells them to keep God’s Word on their hearts.|||💡 How It Applies Today: Make Scripture part of your everyday routine.",
  "Ezra 7:10": "✍️ Who Wrote It: Ezra, a priest and scribe.|||📅 When: Around 450 BC, as Israel returned from exile.|||📖 What Was Happening: The nation needed to rebuild spiritually.|||🔍 What It Means In Context: Ezra set his heart to study, practice, and teach God’s Law.|||💡 How It Applies Today: Pursue Scripture with purpose, knowing it can impact generations.",
  "Psalm 119:24": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel sought wisdom from God’s testimonies.|||📖 What Was Happening: The psalmist found delight and counsel in Scripture.|||🔍 What It Means In Context: The Bible offers guidance for life’s decisions.|||💡 How It Applies Today: Turn to God’s Word for wisdom and comfort.",
  "Psalm 119:36": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel needed God’s guidance.|||📖 What Was Happening: The psalmist asks God to incline his heart toward God’s testimonies.|||🔍 What It Means In Context: Ask God to help you love His Word.|||💡 How It Applies Today: Pray for God to change your heart.",
  "2 Timothy 3:14": "✍️ Who Wrote It: Paul.|||📅 When: Mid-60s AD, encouraging Timothy to remain faithful.|||📖 What Was Happening: The church was facing challenges.|||🔍 What It Means In Context: Paul wanted Timothy to continue in what he had learned from Scripture.|||💡 How It Applies Today: Keep studying God’s Word, trusting that steady progress leads to maturity.",
  "Hosea 6:3": "✍️ Who Wrote It: Hosea, a prophet.|||📅 When: Around 750 BC, during a time of spiritual wandering in Israel.|||📖 What Was Happening: The nation needed to return to God.|||🔍 What It Means In Context: Hosea urges them to press on to know the Lord.|||💡 How It Applies Today: Keep seeking God, knowing that deeper understanding comes with persistence.",
  "Proverbs 9:10": "✍️ Who Wrote It: Solomon.|||📅 When: Around 950 BC, offering wisdom to Israel.|||📖 What Was Happening: The people needed guidance for daily living.|||🔍 What It Means In Context: Wisdom begins with reverence for God.|||💡 How It Applies Today: True understanding starts with honoring God.",
  "John 5:39": "✍️ Who Wrote It: John, one of Jesus’ disciples.|||📅 When: Around AD 90.|||📖 What Was Happening: Jesus spoke these words to religious leaders searching Scripture but missing its true meaning.|||🔍 What It Means In Context: The Bible points to Jesus.|||💡 How It Applies Today: Look for Jesus in Scripture and let it transform your heart.",
  "Psalm 119:165": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel needed stability.|||📖 What Was Happening: The psalmist celebrates the peace found in loving God’s Law.|||🔍 What It Means In Context: God’s Word brings stability and peace.|||💡 How It Applies Today: Loving Scripture anchors you in turbulent times.",
  "Luke 11:28": "✍️ Who Wrote It: Luke, a physician and companion of Paul.|||📅 When: Around AD 60–70.|||📖 What Was Happening: Jesus spoke these words to a crowd, emphasizing obedience.|||🔍 What It Means In Context: Hearing God’s Word is just the beginning—keeping it is what matters.|||💡 How It Applies Today: Let Scripture move you to action.",
  "Psalm 119:140": "✍️ Who Wrote It: David or another psalmist.|||📅 When: Around 1000 BC, when Israel valued purity in God’s Word.|||📖 What Was Happening: The psalmist saw Scripture as uncorrupted and trustworthy.|||🔍 What It Means In Context: God’s Word stands pure and reliable.|||💡 How It Applies Today: Trust the Bible’s integrity.",
  "Joshua 1:8": "✍️ Who Wrote It: Joshua.|||📅 When: Around 1400 BC, as Israel entered the Promised Land.|||📖 What Was Happening: The people needed courage and guidance.|||🔍 What It Means In Context: Meditating on God’s Word brings success and depth.|||💡 How It Applies Today: Reflect on Scripture day and night.",
  "Psalm 27:11": "✍️ Who Wrote It: David.|||📅 When: Around 1000 BC, seeking God’s guidance in times of trouble.|||📖 What Was Happening: Israel was facing enemies and uncertainty.|||🔍 What It Means In Context: David asks God to teach him His way.|||💡 How It Applies Today: Keep asking God to lead you step by step."
};

export interface VerseDetailProps {
  text: string;
  reference: string;
  subtitle: string;
  onClose?: () => void; // If provided, renders as a modal with a Close button
}

export default function VerseDetail({ text, reference, subtitle, onClose }: VerseDetailProps) {
  const explanation = VERSE_EXPLANATIONS[reference] || "No explanation available.";
  // Split explanation into sections using the delimiter
  const sections = explanation.split('|||');

  return (
    <div className="w-full max-w-lg mx-auto bg-blue-50 border border-blue-200 rounded-3xl shadow-xl p-8 flex flex-col items-center mt-8 mb-8">
      <div className="w-full text-center mb-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{reference}</h2>
        <div className="italic text-lg text-blue-800 mb-2">“{text}”</div>
        <div className="text-sm text-blue-700 mb-4">{subtitle}</div>
      </div>
      <div className="w-full text-base text-gray-800 bg-white rounded-xl p-5 shadow-sm mb-6" style={{ lineHeight: 1.7 }}>
        {sections.map((section, idx) => {
          if (typeof section !== 'string') return null;
          const [header, ...rest] = section.split(":");
          const info = rest.join(":").trim();
          // Remove margin under last section
          const isLast = idx === sections.length - 1;
          return (
            <div key={idx} className={isLast ? '' : 'mb-8'}>
              <h1 className="text-xl font-bold text-blue-700 mb-2">{header}</h1>
              <div className="text-base whitespace-pre-line">{info}</div>
            </div>
          );
        })}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          Close
        </button>
      )}
    </div>
  );
}
