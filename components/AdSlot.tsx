"use client";

import { useEffect, useRef } from "react";

// TypeScript declaration for Google AdSense
declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSlotProps {
  /**
   * Ad slot ID from Google AdSense
   * Format: "ca-pub-XXXXX:ad-slot-XXXXX"
   */
  adSlotId?: string;
  /**
   * Ad format: "auto" for responsive, or specific dimensions like "300x250"
   */
  format?: "auto" | "300x250" | "728x90" | "320x50";
  /**
   * Layout variant: "vertical" for sidebars, "horizontal" for banners
   */
  variant?: "vertical" | "horizontal";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AdSlot Component
 * 
 * Renders a Google AdSense ad slot placeholder.
 * 
 * SAFETY RULES:
 * - Only renders if ENABLE_ADS is true (feature flag)
 * - Must be placed outside all Scripture, verses, notes, highlights, and devotional text
 * - Never appears between verses or inside reading flows
 * - Respects spacing and prevents accidental clicks
 * 
 * @example
 * // Desktop vertical ad (left/right sidebar)
 * <AdSlot variant="vertical" format="300x250" />
 * 
 * // Mobile horizontal ad (bottom banner)
 * <AdSlot variant="horizontal" format="320x50" />
 */
export default function AdSlot({
  adSlotId,
  format = "auto",
  variant = "vertical",
  className = "",
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  /**
   * FEATURE FLAG: Set to true to enable ads
   * 
   * To enable ads:
   * 1. Set ENABLE_ADS = true in this component
   * 2. Set ENABLE_ADS = true in app/dashboard/page.tsx
   * 3. Add actual ad slot IDs from Google AdSense to the AdSlot components
   * 4. Ensure Google AdSense script is loaded in app/layout.tsx (already added)
   * 
   * IMPORTANT: Ads are disabled by default. Only enable after:
   * - Getting approval from Google AdSense
   * - Testing thoroughly
   * - Ensuring ad slot IDs are correct
   */
  const ENABLE_ADS = false;

  useEffect(() => {
    // Don't initialize if ads are disabled
    if (!ENABLE_ADS) {
      return;
    }

    // Don't initialize if no ad slot ID provided
    if (!adSlotId) {
      return;
    }

    // Prevent double initialization
    if (adInitialized.current || !adRef.current) {
      return;
    }

    // Initialize AdSense ad
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        adInitialized.current = true;
      }
    } catch (error) {
      console.error("[AdSlot] Error initializing ad:", error);
    }
  }, [adSlotId, ENABLE_ADS]);

  // Don't render anything if ads are disabled
  if (!ENABLE_ADS) {
    return null;
  }

  // Base styles for ad container
  const baseStyles = "flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg";
  
  // Variant-specific styles
  const variantStyles = {
    vertical: "w-full min-h-[250px] max-w-[300px] mx-auto",
    horizontal: "w-full h-[50px] max-w-full",
  };

  // Format-specific min heights
  const formatStyles = {
    auto: variant === "vertical" ? "min-h-[250px]" : "min-h-[50px]",
    "300x250": "min-h-[250px]",
    "728x90": "min-h-[90px]",
    "320x50": "min-h-[50px]",
  };

  return (
    <div
      ref={adRef}
      className={`${baseStyles} ${variantStyles[variant]} ${formatStyles[format]} ${className}`}
      style={{
        // Prevent accidental clicks and ensure proper spacing
        pointerEvents: "auto",
        zIndex: 1,
      }}
    >
      {adSlotId ? (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: variant === "vertical" ? "300px" : "100%",
            height: variant === "vertical" ? "250px" : "50px",
          }}
          data-ad-client="ca-pub-3367331224607676"
          data-ad-slot={adSlotId}
          data-ad-format={format}
          data-full-width-responsive={format === "auto" ? "true" : "false"}
        />
      ) : (
        // Placeholder when no ad slot ID is provided
        <div className="text-gray-400 text-xs text-center p-4">
          Ad Slot Placeholder
          <br />
          <span className="text-[10px]">
            {variant === "vertical" ? "300x250" : "320x50"}
          </span>
        </div>
      )}
    </div>
  );
}

