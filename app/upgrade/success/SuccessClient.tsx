"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple validation that we have a session_id
    if (sessionId) {
      setLoading(false);
    } else {
      // If no session_id, redirect back to upgrade page after a short delay
      setTimeout(() => {
        router.push("/upgrade");
      }, 3000);
    }
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to BibleBuddy Pro! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your subscription is now active.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You now have unlimited access to all Pro features.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold mb-3">What's Next?</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Unlimited deep study views (People, Places, Keywords)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Unlimited Little Louis (AI) messages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>No daily limits or interruptions</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/Bible"
            className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Start Reading
          </Link>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-400 mt-8">
            Session ID: {sessionId.substring(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}
