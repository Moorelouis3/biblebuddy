import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
  // These two admin routes build paths from process.cwd() and touch public/,
  // so Next's file tracer cannot tell which files they need and bundles the
  // whole directory. public/ is 1.3GB of audio, video and images, which took
  // api/admin/covers to 931MB against Vercel's 250MB function limit and broke
  // every production build from 11 August onward.
  //
  // Excluding public/ is safe for both: they only do real work on a writable
  // filesystem, which Vercel's is not. Serving public/ as static assets is
  // unaffected - this only controls what gets copied into the function bundle.
  outputFileTracingExcludes: {
    "/api/admin/covers": ["public/**"],
    "/api/admin/bible-notes-progress": ["public/**"],
  },
  async redirects() {
    // Old article URLs (pre "blog lives at /blog/<slug>" migration).
    // 301s so old links, Pinterest pins, and any indexed URLs pass on to
    // the new canonical /blog addresses.
    return [
      { source: "/bible-study-hub/character-studies/who-is-leah", destination: "/blog/who-is-leah", permanent: true },
      { source: "/bible-study-hub/character-studies/who-is-jezebel", destination: "/blog/who-is-jezebel", permanent: true },
      { source: "/bible-study-hub/christian-foundations/what-does-the-bible-say-about-anxiety", destination: "/blog/what-does-the-bible-say-about-anxiety", permanent: true },
      { source: "/bible-study-hub/christian-foundations/5-things-holding-men-back-from-god", destination: "/blog/5-things-holding-men-back-from-god", permanent: true },
      { source: "/bible-study-hub/bible-insights/how-to-defend-the-bible", destination: "/blog/how-to-defend-the-bible", permanent: true },
      { source: "/bible-study-hub/bible-insights/what-is-the-bible", destination: "/blog/what-is-the-bible", permanent: true },
      { source: "/bible-study-hub/bible-insights/why-so-many-bible-translations", destination: "/blog/why-so-many-bible-translations", permanent: true },
      { source: "/bible-study-tips/why-bible-study-is-hard", destination: "/blog/why-bible-study-is-hard", permanent: true },
      { source: "/bible-study-tips/how-to-read-the-bible", destination: "/blog/how-to-read-the-bible", permanent: true },
      { source: "/bible-study-tips/a-simple-bible-highlighting-system", destination: "/blog/a-simple-bible-highlighting-system", permanent: true },
      { source: "/bible-study-hub/christian-foundations/what-is-hell", destination: "/blog/what-is-hell", permanent: true },
      { source: "/bible-study-hub/christian-foundations/what-is-heaven", destination: "/blog/what-is-heaven", permanent: true },
      { source: "/bible-study-hub/christian-foundations/why-so-many-denominations", destination: "/blog/why-so-many-denominations", permanent: true },
      { source: "/bible-study-hub/verse-breakdowns/your-body-is-a-temple", destination: "/blog/your-body-is-a-temple", permanent: true },
      { source: "/bible-study-hub/verse-breakdowns/building-self-control", destination: "/blog/building-self-control", permanent: true },
      { source: "/bible-study-hub/verse-breakdowns/salt-and-light", destination: "/blog/salt-and-light", permanent: true },
      { source: "/bible-study-hub/character-studies/luke", destination: "/blog/luke", permanent: true },
      { source: "/bible-study-hub/character-studies/moses", destination: "/blog/moses", permanent: true },
      { source: "/bible-study-hub/character-studies/paul", destination: "/blog/paul", permanent: true },
      { source: "/bible-study-hub/christian-history/the-man-who-legalized-christianity", destination: "/blog/the-man-who-legalized-christianity", permanent: true },
      { source: "/bible-study-hub/christian-history/st-patrick", destination: "/blog/st-patrick", permanent: true },
      { source: "/bible-study-hub/christian-history/st-valentine", destination: "/blog/st-valentine", permanent: true },
    ];
  },
};

export default nextConfig;
