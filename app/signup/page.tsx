"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccessModal(false);

    // 1. SIGN USER UP
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // 2. GET THE USER ID
    const user = data.user;
    if (!user) {
      setError("Signup failed: no user returned.");
      setLoading(false);
      return;
    }

    // 3. INSERT INTO user_signups TABLE (non-blocking, analytics only)
    // This should never block signup or show errors to users
    try {
      const { error: insertError } = await supabase
        .from("user_signups")
        .insert({
          user_id: user.id,
          email: user.email,
        });

      if (insertError) {
        // Log to console only - do NOT show to user
        console.error("Analytics insert failed (non-blocking):", insertError);
      }
    } catch (analyticsError) {
      // Log to console only - do NOT show to user
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    // 4. SIGNUP SUCCEEDED - Clear form and show success modal
    setLoading(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setShowSuccessModal(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Create your Bible Buddy account
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          We will walk through Scripture one step at a time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              First name
            </label>
            <input type="text" required className="input"
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Last name
            </label>
            <input type="text" required className="input"
              value={lastName} onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input type="email" required className="input"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input type="password" required minLength={6} className="input"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-blue-600 text-white text-sm font-semibold py-2.5 mt-2 shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Account created successfully!
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Please check your email to confirm your account before logging in.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
