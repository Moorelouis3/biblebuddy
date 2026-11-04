# The anchor cascade fix

Plan written 2026-11-04, after the `/android` button shipped unreadable.
Not yet done. Everything here was measured on the live site, not reasoned
about.

## The bug

`app/globals.css:4099` declares, at the end of the file and **outside any
`@layer`**:

```css
a {
  color: inherit;
  text-decoration: none;
}
```

`@import "tailwindcss"` is at line 260, and Tailwind v4 puts its utilities in
a layer. **Unlayered CSS beats layered CSS**, whatever the specificity. So on
an `<a>`:

- every `text-*` colour class is dead — the link inherits its parent instead
- every `underline` / `decoration-*` class is dead — the link never underlines

Measured on www.mybiblebuddy.net:

| | on a `<div>` | on an `<a>` |
|---|---|---|
| `.text-white` | `rgb(255,255,255)` | `rgb(17,24,39)` |
| `.underline` | `underline` | `none` |

A real example: the homepage's "Continue on web version" link declares
`underline` and has never shown one.

## What it has already cost

Two links shipped invisible, from opposite directions:

- `/android` "Get Bible Buddy" — `bg-[#07162f] text-white` inside
  `<main className="text-[#07162f]">`, so it inherited navy. Navy on navy.
  Fixed 2026-11-03 after Louis reported it.
- `/updates` "Go to Dashboard" — `bg-white text-gray-950` inside a dark hero,
  so it inherited white. White on white. Found 2026-11-04 by the sweep.

Two `!important` workarounds in `globals.css` — `.bb-store-cta` and
`.bb-on-dark` — exist because somebody hit this before and patched the
symptom.

## What is already done

Commit `22104194`: all 37 links that set their own background now carry an
inline `style={{ color }}` matching the class they declare. Inline styles beat
every layer, so **those 37 are immune to whatever the root fix does** and need
no re-checking.

## The fix, in two parts

They are separate decisions with very different blast radius. Do part 1. Treat
part 2 as a design call, not a bug fix.

### Part 1 — colour only (recommended)

```css
@layer base {
  a {
    color: inherit;
  }
}

/* Deliberately left unlayered: see part 2. */
a {
  text-decoration: none;
}
```

Repaints **94 links across 49 files** — the ones that declare a colour and do
not set their own background. Each switches from its inherited colour to the
colour it actually asks for.

Heaviest files:

| links | file |
|---|---|
| 9 | `app/study-groups/[id]/chat/page.tsx` |
| 8 | `app/study-groups/[id]/series/week/[weekNum]/page.tsx` |
| 6 | `components/DashboardJourneyExperience.tsx` |
| 4 | `app/admin/analytics/legacy/page.tsx` |
| 4 | `app/profile/[userId]/page.tsx` |
| 4 | `app/study-groups/[id]/scheduler/page.tsx` |

Most are inline text links whose declared colour is a brand blue — almost
certainly what was wanted. The risk is the handful whose declared colour was
wrong and has been quietly rescued by inheritance.

### Part 2 — underlines (separate, later)

Moving `text-decoration: none` into the layer as well would switch on
**435 declared underlines across 376 files**, including the sign-in and
sign-up pages. That is not a bug fix, it is a change of look, and it should be
somebody's decision rather than a side effect. Leave the rule unlayered until
then.

## How to verify part 1 without guessing

The pages that matter most are behind sign-in, so measuring beats reasoning.

1. Start the dev server and create a throwaway account **on localhost** so the
   signed-in pages can be reached. Local dev only; never a real password.
2. Before the change, walk this list and record, for every `<a>`, its computed
   `color`, its nearest painted background and the resulting contrast ratio:
   `/`, `/updates`, `/upgrade`, `/blog`, `/not-found`, `/android`,
   `/bible-trivia/jesus`, `/library`, `/library/bible-in-one-year`,
   `/library/bible-in-one-year/progress`, `/dashboard`, `/bb-feed`,
   `/profile/<id>`, `/settings`, `/plan`, a study-group page, and
   `/devotionals/<a published id>`.
3. Apply part 1.
4. Walk the same list again and diff. Expect colour changes; flag any link
   whose contrast drops below **4.5:1**, and any that lands within 1.5:1 of
   its background.
5. Fix the regressions at the call site by correcting the class — the class is
   now the truth, so a wrong colour is a real bug worth fixing properly rather
   than pinning with another inline style.
6. Re-run `npm run verify:bible-year-overview` and `npm run verify:app-links`,
   then `npx tsc --noEmit`.

A small script that collects step 2 and step 4 into JSON and diffs them is
worth writing; doing it by eye across 17 routes is how a regression gets
missed.

## Afterwards

With the rule layered, the two `!important` workarounds (`.bb-store-cta`,
`.bb-on-dark`) should become unnecessary. Check them, then delete them — but
only after part 1 is verified, and in their own commit.

## Deploy

Step 3 by the test in `CLAUDE.md`: nothing is broken for anybody while it
waits. Commit untagged and let the next scheduled build take it.
