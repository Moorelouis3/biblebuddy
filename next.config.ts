import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    // Required by the /Bible -> /bible redirects below. By default Next matches
    // the `source` of every redirect, rewrite and header in this file with
    // path-to-regexp's `sensitive: false`, i.e. case-insensitively. A redirect
    // from "/Bible" to "/bible" would therefore also match "/bible" and send it
    // to itself forever. This makes the sources in this file match
    // case-sensitively, which is how the app/ page routes already behave on
    // Vercel's case-sensitive filesystem.
    //
    // Every other source in this file is already all-lowercase and is reached
    // by lowercase links, so nothing else changes behaviour.
    caseSensitiveRoutes: true,
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
      // The Bible reader lives at lowercase /bible. Capital /Bible was a
      // half-finished rename: ecc877d17 renamed the index route in git,
      // core.ignorecase made the directory rename a no-op on Windows, and later
      // commits (f9197d985, 798694ad0) re-added the chapter route under capital
      // Bible. Git ended up recording app/bible/page.tsx next to
      // app/Bible/[book]/[chapter]/page.tsx, so in production /bible served the
      // index and 404'd on chapters while /Bible did the exact opposite.
      //
      // Both routes now live under lowercase app/bible. These redirects keep the
      // capital URLs alive, and not only for bookmarks: group posts published by
      // the recurring-series cron and weekly report emails already went out with
      // hard-coded /Bible links, so those live on in the database and in
      // people's inboxes for good.
      { source: "/Bible", destination: "/bible", permanent: true },
      { source: "/Bible/:book/:chapter", destination: "/bible/:book/:chapter", permanent: true },

      // Proverbs' shareable page (2026-10-06). Doing this here rather than with
      // redirect() inside app/study/[slug]/page.tsx: by the time that component
      // runs the response has already started streaming, so Next falls back to a
      // meta refresh with a one second delay, which link preview crawlers do not
      // follow. A config redirect is a real 308 before any rendering happens.
      { source: "/study/wisdom-of-proverbs", destination: "/devotionals/wisdom-of-proverbs", permanent: true },
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
  async rewrites() {
    // Tracked links in comments and DMs.
    //
    // Content Buddy mints a short code per person and counts the click on the
    // way through, but its own address is a railway.app URL - and Louis found
    // it in his Instagram DMs on 26 September: "why is the link in IG DMs
    // saying life buddy not mybiblebuddy.net". A link under his name has to be
    // his domain, so mybiblebuddy.net/r/<code> is served straight through to
    // the counter, which then forwards to the page. Same click tracking, and
    // the reader only ever sees mybiblebuddy.net.
    return [
      {
        source: "/r/:code",
        destination: "https://life-buddy-production.up.railway.app/r/:code",
      },
    ];
  },
  async headers() {
    // Never let a phone keep an HTML document.
    //
    // The store app is a WKWebView pointed at this site, and iOS caches the
    // document it is given. The cached document names the previous build's
    // JavaScript, so the app goes on running old code after a deploy - and
    // quitting the app does not clear it. On 2026-10-17 four DM fixes and the
    // Bible lock unlock were all live on the website and none of them had
    // reached Louis's phone: "none of the DM shit went through, the 4 changes
    // we made."
    //
    // StaleBuildReloader notices and reloads, but it can only run if it is in
    // the document that was cached - a phone stuck on HTML older than the
    // reloader itself never self-heals, which is exactly the hole this closes.
    //
    // Only documents. sec-fetch-dest is "script" for the hashed chunks under
    // /_next/static and "image", "style" and so on for everything else, so
    // those keep their immutable caching and nothing is re-downloaded. Every
    // browser that matters has sent this header since 2019; one that does not
    // simply behaves as it did before.
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "sec-fetch-dest", value: "document" }],
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
