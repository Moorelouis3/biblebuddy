"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/signupAttribution";

// Mounted once in the root layout so a visitor's original channel is recorded
// on whatever page they land on. Before this, only the landing page stored a
// source, so anyone arriving straight onto a blog post from Pinterest lost
// that origin entirely and signed up as "Blog".
export default function TrafficSourceCapture() {
  useEffect(() => {
    captureFirstTouch();
  }, []);

  return null;
}
