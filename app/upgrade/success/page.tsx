export default function UpgradeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 You’re Pro!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Your upgrade was successful.
        </p>
        <p className="text-base text-gray-600 mb-4">
          You now have full access to all Bible Buddy features, including unlimited
          study tools, trivia, devotionals, reading plans, and deep Bible insights.
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Thank you for supporting Bible Buddy and investing in deeper Scripture
          study.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
