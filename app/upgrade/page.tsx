"use client";

export default function UpgradePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Upgrade to Pro</h1>
      <p className="text-gray-600 mb-8">
        Unlock unlimited access to deep Bible study resources.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Free Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-gray-600 mb-4">Perfect for getting started</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✓ Full Bible reading</li>
            <li>✓ Notes and progress tracking</li>
            <li>✓ Levels and streaks</li>
            <li>✓ 3 deep study views per day</li>
          </ul>
          <div className="text-2xl font-bold mb-2">$0</div>
          <p className="text-sm text-gray-500">Forever free</p>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-semibold">Pro</h2>
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
              RECOMMENDED
            </span>
          </div>
          <p className="text-gray-600 mb-4">Unlimited Bible study</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✓ Everything in Free</li>
            <li>✓ Unlimited people, places, and keywords</li>
            <li>✓ No daily limits</li>
            <li>✓ Priority support</li>
          </ul>
          <div className="text-2xl font-bold mb-2">Coming Soon</div>
          <p className="text-sm text-gray-500">Pricing will be announced soon</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">What are deep study views?</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Deep study views include detailed information about people, places, and keywords in the Bible. 
          These are the pop-up explanations you see when clicking on highlighted terms while reading Scripture.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Free members can access 3 of these detailed views per day. Pro members have unlimited access 
          to help you dive deeper into your Bible study.
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Pro membership will be available soon. Check back for updates!
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

