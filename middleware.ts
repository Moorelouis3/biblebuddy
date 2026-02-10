import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  const FREE_TRIVIA_BOOK_SLUGS = new Set([
    "genesis",
    "exodus",
    "leviticus",
    "numbers",
  ]);
  const TRIVIA_PEOPLE_SLUGS = new Set(["god", "jesus", "moses", "abraham"]);

  // If not protected route → allow
  const protectedPaths = [
    "/dashboard",
    "/reading-plan",
    "/reading-plans",
    "/notes",
    "/ai",
    "/grow",
    "/profile",
    "/bible-trivia"
  ];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // If protected BUT user is coming from login, signup, or password reset
  // Allow Supabase auth flow to finish
  const referer = req.headers.get("referer") || "";
  const fromAuth =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset-password") ||
    req.url.includes("access_token") ||
    req.url.includes("refresh_token") ||
    referer.includes("/login") ||
    referer.includes("/signup") ||
    referer.includes("/reset-password");

  if (fromAuth) {
    return NextResponse.next();
  }

  // Create Supabase client to check for actual session
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Check for authenticated session using Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in → redirect to landing
  if (!user) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const triviaPrefix = "/bible-trivia/";
  const triviaSlug = pathname.startsWith(triviaPrefix)
    ? pathname.slice(triviaPrefix.length).split("/")[0]
    : "";
  const isTriviaDeck = Boolean(triviaSlug) && triviaSlug !== "books" && triviaSlug !== "people";
  const isTriviaPeopleDeck = TRIVIA_PEOPLE_SLUGS.has(triviaSlug);
  const isFreeTriviaDeck =
    (isTriviaPeopleDeck && (triviaSlug === "god" || triviaSlug === "jesus")) ||
    (!isTriviaPeopleDeck && FREE_TRIVIA_BOOK_SLUGS.has(triviaSlug));

  const isBibleBuddyPlan = pathname.startsWith("/reading-plans/bible-buddy");
  const needsPaidCheck = isBibleBuddyPlan || (isTriviaDeck && !isFreeTriviaDeck);

  if (needsPaidCheck) {
    const { data: profileStats } = await supabase
      .from("profile_stats")
      .select("is_paid")
      .eq("user_id", user.id)
      .maybeSingle();

    const isPaid = !!profileStats?.is_paid;

    if (!isPaid) {
      if (isBibleBuddyPlan) {
        url.pathname = "/reading-plans";
      } else if (isTriviaPeopleDeck) {
        url.pathname = "/bible-trivia/people";
      } else {
        url.pathname = "/bible-trivia/books";
      }
      return NextResponse.redirect(url);
    }
  }

  // Logged in → allow access
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reading-plan/:path*",
    "/reading-plans/:path*",
    "/notes/:path*",
    "/ai/:path*",
    "/grow/:path*",
    "/profile/:path*",
    "/bible-trivia/:path*"
  ],
};
