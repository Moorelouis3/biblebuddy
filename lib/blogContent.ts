export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  canonicalPath: string;
  readTime: string;
  image: string;
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "bible-insights",
    name: "Bible Insights",
    description: "Clear answers for common Bible questions and study challenges.",
  },
  {
    slug: "bible-study-tips",
    name: "Bible Study Tips",
    description: "Practical ways to read, study, highlight, and understand Scripture.",
  },
  {
    slug: "christian-foundations",
    name: "Christian Foundations",
    description: "Simple explanations of core Christian beliefs.",
  },
  {
    slug: "verse-breakdowns",
    name: "Verse Breakdowns",
    description: "Deeper explanations of important Bible verses.",
  },
  {
    slug: "character-studies",
    name: "Character Studies",
    description: "Learn from the lives, failures, and faith of people in Scripture.",
  },
  {
    slug: "christian-history",
    name: "Christian History",
    description: "Stories and turning points from the history of the Church.",
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "how-to-defend-the-bible",
    title: "How to Defend the Bible",
    description: "How to respond when people say the Bible was changed, written by men, or fake.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/bible-study-hub/bible-insights/how-to-defend-the-bible",
    readTime: "8 min read",
    image: "/Defenthebiblebanner.png",
  },
  {
    slug: "what-is-the-bible",
    title: "What Is the Bible?",
    description: "Understand the Bible's origin, structure, authors, and why it matters.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/bible-study-hub/bible-insights/what-is-the-bible",
    readTime: "7 min read",
    image: "/Whatisthebiblebanner.png",
  },
  {
    slug: "why-so-many-bible-translations",
    title: "Why So Many Bible Translations?",
    description: "A simple guide to understanding modern Bible versions.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/bible-study-hub/bible-insights/why-so-many-bible-translations",
    readTime: "6 min read",
    image: "/Translationsbanner.png",
  },
  {
    slug: "why-bible-study-is-hard",
    title: "Why Bible Study Is Hard",
    description: "Five reasons studying the Bible can feel difficult and how to keep going.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/bible-study-tips/why-bible-study-is-hard",
    readTime: "7 min read",
    image: "/Biblestudyhardbanner.png",
  },
  {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible",
    description: "A simple way to read Scripture with understanding instead of just checking a box.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/bible-study-tips/how-to-read-the-bible",
    readTime: "8 min read",
    image: "/Biblereadingbanner.png",
  },
  {
    slug: "a-simple-bible-highlighting-system",
    title: "A Simple Bible Highlighting System",
    description: "How to highlight Scripture with purpose so your notes actually help you study.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/bible-study-tips/a-simple-bible-highlighting-system",
    readTime: "5 min read",
    image: "/Biblehighlightingbanner.png",
  },
  {
    slug: "what-is-hell",
    title: "What Is Hell?",
    description: "A biblical explanation of hell without confusion or shallow answers.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/bible-study-hub/christian-foundations/what-is-hell",
    readTime: "8 min read",
    image: "/Whatishell.png",
  },
  {
    slug: "what-is-heaven",
    title: "What Is Heaven?",
    description: "A clear look at what the Bible teaches about heaven.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/bible-study-hub/christian-foundations/what-is-heaven",
    readTime: "7 min read",
    image: "/Whatisheaven.png",
  },
  {
    slug: "why-so-many-denominations",
    title: "Why So Many Denominations?",
    description: "Understanding Christian divisions and why so many church traditions exist.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/bible-study-hub/christian-foundations/why-so-many-denominations",
    readTime: "8 min read",
    image: "/Whydenominations.png",
  },
  {
    slug: "your-body-is-a-temple",
    title: "Your Body Is a Temple",
    description: "1 Corinthians 6:19-20 explained with the history and culture behind Corinth.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/bible-study-hub/verse-breakdowns/your-body-is-a-temple",
    readTime: "12 min read",
    image: "/Bodytemplebanner.png",
  },
  {
    slug: "building-self-control",
    title: "Building Self Control",
    description: "Proverbs 25:28 explained for real life and spiritual discipline.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/bible-study-hub/verse-breakdowns/building-self-control",
    readTime: "6 min read",
    image: "/Selfcontrolbanner.png",
  },
  {
    slug: "salt-and-light",
    title: "Salt and Light",
    description: "Matthew 5:13-16 explained in a way that is clear and practical.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/bible-study-hub/verse-breakdowns/salt-and-light",
    readTime: "6 min read",
    image: "/Saltearthbanner.png",
  },
  {
    slug: "luke",
    title: "Luke",
    description: "The Gentile doctor, Gospel writer, and companion of Paul.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/bible-study-hub/character-studies/luke",
    readTime: "7 min read",
    image: "/Lukebanner.png",
  },
  {
    slug: "moses",
    title: "Moses",
    description: "The man God drew out to draw His people out.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/bible-study-hub/character-studies/moses",
    readTime: "7 min read",
    image: "/Mosesbanner.png",
  },
  {
    slug: "paul",
    title: "Paul",
    description: "From persecutor to missionary apostle.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/bible-study-hub/character-studies/paul",
    readTime: "7 min read",
    image: "/Paulbanner.png",
  },
  {
    slug: "the-man-who-legalized-christianity",
    title: "The Man Who Legalized Christianity",
    description: "Constantine and the turning point of the Church.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/bible-study-hub/christian-history/the-man-who-legalized-christianity",
    readTime: "8 min read",
    image: "/Legalized.png",
  },
  {
    slug: "st-patrick",
    title: "St. Patrick",
    description: "The story of the man connected with bringing Christianity to Ireland.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/bible-study-hub/christian-history/st-patrick",
    readTime: "6 min read",
    image: "/Irelandbanner.png",
  },
  {
    slug: "st-valentine",
    title: "St. Valentine",
    description: "The martyr behind the modern holiday.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/bible-study-hub/christian-history/st-valentine",
    readTime: "6 min read",
    image: "/Valentinebanner.png",
  },
];

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug) || null;
}

export function getBlogCategory(slug: string) {
  return BLOG_CATEGORIES.find((category) => category.slug === slug) || null;
}

export function getArticlesByCategory(categorySlug: string) {
  return BLOG_ARTICLES.filter((article) => article.categorySlug === categorySlug);
}
