"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/signupAttribution";
import { rememberCloserCode } from "@/lib/closerSignup";

// Mounted once in the root layout so a visitor's original channel is recorded
// on whatever page they land on. Before this, only the landing page stored a
// source, so anyone arriving straight onto a blog post from Pinterest lost
// that origin entirely and signed up as "Blog".
//
// Both captures below run on arrival, for the same reason: whatever the URL
// carries when the visitor first lands is gone by the time they sign up, so it
// has to be written down the moment they get here, on whichever page that is.
export default function TrafficSourceCapture() {
  useEffect(() => {
    captureFirstTouch();
    /**
     * The `r=` code from a Closer comment reply (2026-11-12).
     *
     * rememberCloserCode() was only ever called from reportCloserSignup(), at
     * the moment an account was created - so the code was read off the URL
     * only if `?r=` was still in the address bar right then. It never is:
     * people land on `/?r=ABC`, read, click through to `/signup`, and the
     * parameter is gone. Nothing was ever stored, so the Closer screen read
     * 9,539 clicks against zero signups for five weeks after the reporting
     * half went live, and no reply could be credited with a single user.
     *
     * Calling it here writes the code to localStorage on arrival, on any page
     * - which matters, because these links also land straight on blog posts.
     * reportCloserSignup() then finds it at signup and clears it.
     */
    rememberCloserCode();
  }, []);

  return null;
}
