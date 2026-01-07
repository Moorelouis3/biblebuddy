"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface FeedbackBannerProps {
  userId: string;
  onBannerClick: () => void;
}

export function FeedbackBanner({ userId, onBannerClick }: FeedbackBannerProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFeedbackEligibility() {
      try {
        // Check if user has 5+ total actions
        const { data: profileStats, error: statsError } = await supabase
          .from("profile_stats")
          .select("total_actions")
          .eq("user_id", userId)
          .maybeSingle();

        if (statsError) {
          console.error("[FEEDBACK] Error checking profile stats:", statsError);
          setLoading(false);
          return;
        }

        const totalActions = profileStats?.total_actions || 0;
        
        if (totalActions < 5) {
          setShouldShow(false);
          setLoading(false);
          return;
        }

        // Check if user has already submitted feedback
        const { data: existingFeedback, error: feedbackError } = await supabase
          .from("user_feedback")
          .select("happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, last_dismissed_at, permanently_dismissed")
          .eq("user_id", userId)
          .maybeSingle();

        if (feedbackError && feedbackError.code !== 'PGRST116') {
          console.error("[FEEDBACK] Error checking feedback:", feedbackError);
          setLoading(false);
          return;
        }

        // Check if user has submitted feedback (has any rating filled)
        const hasSubmitted = existingFeedback?.happiness_rating || 
                            existingFeedback?.usefulness_rating || 
                            existingFeedback?.usage_frequency || 
                            existingFeedback?.recommendation_likelihood;
        
        if (hasSubmitted) {
          // User has submitted feedback, never show again
          setShouldShow(false);
          setLoading(false);
          return;
        }

        // If user clicked "No" (permanently dismissed), never show again
        if (existingFeedback?.permanently_dismissed) {
          setShouldShow(false);
          setLoading(false);
          return;
        }

        // If user clicked "Do later", check if 30 days have passed
        if (existingFeedback?.last_dismissed_at && !existingFeedback?.permanently_dismissed) {
          const dismissedDate = new Date(existingFeedback.last_dismissed_at);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          if (dismissedDate > thirtyDaysAgo) {
            // Still within 30 day window, don't show
            setShouldShow(false);
            setLoading(false);
            return;
          }
        }

        // All conditions met - show banner
        setShouldShow(true);
        setLoading(false);
      } catch (err) {
        console.error("[FEEDBACK] Error checking eligibility:", err);
        setLoading(false);
      }
    }

    if (userId) {
      checkFeedbackEligibility();
    }
  }, [userId]);

  if (loading || !shouldShow) {
    return null;
  }

  return (
    <div
      className="w-full bg-red-600 text-white py-3 px-4 text-center cursor-pointer hover:bg-red-700 transition-colors z-50"
      onClick={onBannerClick}
    >
      <span className="font-medium">New message</span>
    </div>
  );
}

