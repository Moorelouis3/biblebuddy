import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // If not protected route → allow
  const protectedPaths = [
    "/dashboard",
    "/reading-plan",
    "/notes",
    "/ai",
    "/grow",
    "/profile"
  ];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // If protected BUT user is coming from login or callback
  // Allow Supabase auth flow to finish
  const referer = req.headers.get("referer") || "";
  const fromAuth =
    req.nextUrl.pathname.startsWith("/auth") ||
    req.url.includes("access_token") ||
    req.url.includes("refresh_token") ||
    referer.includes("/login") ||
    referer.includes("/signup");

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

  // Logged in → allow access
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reading-plan/:path*",
    "/notes/:path*",
    "/ai/:path*",
    "/grow/:path*",
    "/profile/:path*"
  ],
};
