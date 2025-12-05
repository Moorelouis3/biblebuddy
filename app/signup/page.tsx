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
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

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

    // 3. INSERT INTO user_signups TABLE
    const { error: insertError } = await supabase
      .from("user_signups")
      .insert({
        user_id: user.id,
        email: user.email,
      });

    if (insertError) {
      console.error("Failed inserting signup:", insertError);
      setError("Signup created but analytics insert failed.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setMessage("Account created! Check your email to confirm.");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
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

          {message && (
            <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              {message}
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
    </div>
  );
}
