// Static hub content - mirrors the Bible Study Hub pages
// Used by the official study group to display articles/questions inline.

export type HubItemStatic = {
  id: string;
  type: "article" | "question";
  title: string;
  subtitle: string;
  emoji: string;
  path: string;
  display_order: number;
};

export type HubCategoryStatic = {
  name: string;
  emoji: string;
  color: string;
  items: HubItemStatic[];
};

export const HUB_CONTENT: HubCategoryStatic[] = [
  {
    name: "Bible Insights",
    emoji: "💡",
    color: "#ddeeff",
    items: [
      { id: "bi-1", type: "article", title: "🛡️ How to Defend the Bible", subtitle: "How to respond when people say it was changed, written by men, or fake.", emoji: "🛡️", path: "/bible-study-hub/bible-insights/how-to-defend-the-bible", display_order: 1 },
      { id: "bi-2", type: "article", title: "📖 What Is the Bible?", subtitle: "Understanding its origin, structure, authors, and why it matters.", emoji: "📖", path: "/bible-study-hub/bible-insights/what-is-the-bible", display_order: 2 },
      { id: "bi-3", type: "article", title: "📚 Why So Many Bible Translations?", subtitle: "Understanding your modern Bible version.", emoji: "📚", path: "/bible-study-hub/bible-insights/why-so-many-bible-translations", display_order: 3 },
      { id: "bi-q1", type: "question", title: "🧑‍🦱 Which Bible Character Relates?", subtitle: "Faith journeys are deeply personal.", emoji: "🧑‍🦱", path: "/bible-study-hub/bible-insights/which-bible-character-relates", display_order: 4 },
      { id: "bi-q2", type: "question", title: "📚 Favorite Book of the Bible?", subtitle: "Every book speaks differently.", emoji: "📚", path: "/bible-study-hub/bible-insights/favorite-book-of-the-bible", display_order: 5 },
    ],
  },
  {
    name: "Bible Study Tips",
    emoji: "🛠️",
    color: "#fef9c3",
    items: [
      { id: "bst-1", type: "article", title: "🧠 Why Bible Study Is Hard", subtitle: "5 reasons studying the Bible is hard.", emoji: "🧠", path: "/bible-study-tips/why-bible-study-is-hard", display_order: 1 },
      { id: "bst-2", type: "article", title: "📖 How to Read the Bible", subtitle: "A simple way to study Scripture.", emoji: "📖", path: "/bible-study-tips/how-to-read-the-bible", display_order: 2 },
      { id: "bst-3", type: "article", title: "🖍️ A Simple Bible Highlighting System", subtitle: "How to highlight with purpose.", emoji: "🖍️", path: "/bible-study-tips/a-simple-bible-highlighting-system", display_order: 3 },
      { id: "bst-q1", type: "question", title: "💡 What's Your Best Study Tip?", subtitle: "Share what helps you most.", emoji: "💡", path: "/bible-study-tips/whats-your-best-study-tip", display_order: 4 },
      { id: "bst-q2", type: "question", title: "📝 How Do You Take Notes?", subtitle: "Everyone studies a little differently.", emoji: "📝", path: "/bible-study-tips/how-do-you-take-notes", display_order: 5 },
      { id: "bst-q3", type: "question", title: "🔥 What Keeps You Consistent?", subtitle: "Staying disciplined is not easy.", emoji: "🔥", path: "/bible-study-tips/what-keeps-you-consistent", display_order: 6 },
    ],
  },
  {
    name: "Christian Foundations",
    emoji: "✝",
    color: "#ede9fe",
    items: [
      { id: "cf-1", type: "article", title: "🔥 What Is Hell", subtitle: "Understanding Hell biblically.", emoji: "🔥", path: "/bible-study-hub/christian-foundations/what-is-hell", display_order: 1 },
      { id: "cf-2", type: "article", title: "✨ What Is Heaven", subtitle: "Understanding Heaven biblically.", emoji: "✨", path: "/bible-study-hub/christian-foundations/what-is-heaven", display_order: 2 },
      { id: "cf-3", type: "article", title: "🌎 Why So Many Denominations", subtitle: "Understanding Christian divisions.", emoji: "🌎", path: "/bible-study-hub/christian-foundations/why-so-many-denominations", display_order: 3 },
      { id: "cf-q1", type: "question", title: "📖 What Is Your Testimony?", subtitle: "Share how faith changed you.", emoji: "📖", path: "/bible-study-hub/christian-foundations/what-is-your-testimony", display_order: 4 },
      { id: "cf-q2", type: "question", title: "✝️ What Does Being Christian Mean?", subtitle: "Faith is more than religion.", emoji: "✝️", path: "/bible-study-hub/christian-foundations/what-does-being-christian-mean", display_order: 5 },
      { id: "cf-q3", type: "question", title: "❤️ What Does Following Jesus Look Like?", subtitle: "Faith lived out daily.", emoji: "❤️", path: "/bible-study-hub/christian-foundations/what-does-following-jesus-look-like", display_order: 6 },
    ],
  },
  {
    name: "Verse Breakdowns",
    emoji: "🔍",
    color: "#d1fae5",
    items: [
      { id: "vb-1", type: "article", title: "🏛️ Your Body Is a Temple", subtitle: "1 Corinthians 6:19 to 20.", emoji: "🏛️", path: "/bible-study-hub/verse-breakdowns/your-body-is-a-temple", display_order: 1 },
      { id: "vb-2", type: "article", title: "🧑‍🦱 Building Self Control", subtitle: "Proverbs 25:28 explained.", emoji: "🧑‍🦱", path: "/bible-study-hub/verse-breakdowns/building-self-control", display_order: 2 },
      { id: "vb-3", type: "article", title: "🧂 Salt and Light", subtitle: "Matthew 5:13 to 16.", emoji: "🧂", path: "/bible-study-hub/verse-breakdowns/salt-and-light", display_order: 3 },
      { id: "vb-q1", type: "question", title: "🛡️ What Verse Do You Lean On?", subtitle: "The scripture you return to.", emoji: "🛡️", path: "/bible-study-hub/verse-breakdowns/what-verse-do-you-lean-on", display_order: 4 },
      { id: "vb-q2", type: "question", title: "🔥 What Verse Has Challenged You?", subtitle: "Growth often comes through conviction.", emoji: "🔥", path: "/bible-study-hub/verse-breakdowns/what-verse-has-challenged-you", display_order: 5 },
      { id: "vb-q3", type: "question", title: "🤔 What Verse Confuses You?", subtitle: "Some passages require deeper study.", emoji: "🤔", path: "/bible-study-hub/verse-breakdowns/what-verse-confuses-you", display_order: 6 },
    ],
  },
  {
    name: "Character Studies",
    emoji: "👤",
    color: "#dbeafe",
    items: [
      { id: "cs-1", type: "article", title: "👤 Luke", subtitle: "The Gentile doctor, Gospel writer, and companion of Paul.", emoji: "👤", path: "/bible-study-hub/character-studies/luke", display_order: 1 },
      { id: "cs-2", type: "article", title: "🔥 Moses", subtitle: "The man God drew out to draw His people out.", emoji: "🔥", path: "/bible-study-hub/character-studies/moses", display_order: 2 },
      { id: "cs-3", type: "article", title: "🧔 Paul", subtitle: "From persecutor to missionary apostle.", emoji: "🧔", path: "/bible-study-hub/character-studies/paul", display_order: 3 },
      { id: "cs-q1", type: "question", title: "👑 Favorite Bible Character?", subtitle: "The person who inspires you.", emoji: "👑", path: "/bible-study-hub/character-studies/favorite-bible-character", display_order: 4 },
      { id: "cs-q2", type: "question", title: "🪞 Who Do You Relate To?", subtitle: "A story that mirrors yours.", emoji: "🪞", path: "/bible-study-hub/character-studies/who-do-you-relate-to", display_order: 5 },
      { id: "cs-q3", type: "question", title: "🧐 Most Misunderstood Character?", subtitle: "Someone people often misjudge.", emoji: "🧐", path: "/bible-study-hub/character-studies/most-misunderstood-character", display_order: 6 },
    ],
  },
  {
    name: "Christian History",
    emoji: "📜",
    color: "#fff7ed",
    items: [
      { id: "ch-1", type: "article", title: "🏛️ The Man Who Legalized Christianity", subtitle: "Constantine and the turning point of the Church.", emoji: "🏛️", path: "/bible-study-hub/christian-history/the-man-who-legalized-christianity", display_order: 1 },
      { id: "ch-2", type: "article", title: "🍀 St. Patrick", subtitle: "He who brought Christianity to Ireland.", emoji: "🍀", path: "/bible-study-hub/christian-history/st-patrick", display_order: 2 },
      { id: "ch-3", type: "article", title: "❤️ St. Valentine", subtitle: "The martyr behind the modern holiday.", emoji: "❤️", path: "/bible-study-hub/christian-history/st-valentine", display_order: 3 },
      { id: "ch-q1", type: "question", title: "👑 Did Power Help the Church?", subtitle: "Faith and influence through history.", emoji: "👑", path: "/bible-study-hub/christian-history/did-power-help-the-church", display_order: 4 },
      { id: "ch-q2", type: "question", title: "📜 Most Surprising Church History Moment?", subtitle: "Events that changed your perspective.", emoji: "📜", path: "/bible-study-hub/christian-history/most-surprising-church-history-moment", display_order: 5 },
      { id: "ch-q3", type: "question", title: "🔥 Does Persecution Strengthen Faith?", subtitle: "Suffering and spiritual growth.", emoji: "🔥", path: "/bible-study-hub/christian-history/does-persecution-strengthen-faith", display_order: 6 },
    ],
  },
];
