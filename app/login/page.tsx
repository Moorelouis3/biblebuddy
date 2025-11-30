import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-3">
            BSB
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            The Bible Study Buddy
          </h1>
          <p className="text-sm text-slate-600">
            Log in to begin your journey through the Bible.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-blue-600 cursor-pointer">
          Forgot password?
        </p>

        <p className="mt-3 text-sm text-center text-slate-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
