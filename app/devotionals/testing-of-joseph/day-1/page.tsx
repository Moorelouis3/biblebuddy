"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JosephDay1() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm mb-2"
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold mb-2">Day 1: Favor and Friction</h1>
          <h2 className="text-lg text-gray-700 mb-1">“Favor attracts tension”</h2>
          <div className="text-gray-600 mb-4">
            <span className="font-semibold">Scripture:</span> Genesis 37:1–4
          </div>
        </div>
        <div className="prose prose-lg max-w-none mb-8">
          <p>Genesis 37 opens quietly.<br />
          Jacob is living in the land of Canaan. The promised land. The land God covenanted to Abraham generations earlier. For chapter after chapter in Genesis, we have been watching that covenant move forward. From Abraham to Isaac. From Isaac to Jacob.</p>
          <p>Three generations.<br />One promise.<br />Still not fully fulfilled.</p>
          <p>Then verse 2 shifts the spotlight.</p>
          <p>“These are the generations of Jacob.”</p>
          <p>That phrase signals something important. The focus is no longer just Jacob’s story. It now moves to what comes after him. His sons. His legacy. The continuation of the covenant through the next generation.</p>
          <p>Jacob had twelve sons.</p>
          <p>And one of them was Joseph.</p>
          <p>Seventeen years old.<br />Young.<br />Working the fields with his brothers.<br />Already different.</p>
          <p>Joseph brings a bad report back to his father. That detail matters. It tells us why he was not fully aligned with his brothers. He was observing. Reporting. Positioned differently.</p>
          <p>Then comes the line that ignites everything.</p>
          <p>“Now Israel loved Joseph more than any of his sons.”</p>
          <p>Jacob, also known as Israel, makes him a robe of many colors.</p>
          <p>In that culture, clothing communicated status.</p>
          <p>This was not shepherd work wear.</p>
          <p>This was symbolic.</p>
          <p>It marked him as set apart.</p>
          <p>Every time Joseph walked into the field wearing that robe, it said something without words.</p>
          <p>He is chosen.<br />He is loved.<br />He stands out.</p>
          <p>And the brothers saw it.</p>
          <p>The text says they hated him and could not speak peacefully to him.</p>
          <p>Notice something important.</p>
          <p>Joseph had not done anything criminal.</p>
          <p>He did not steal.<br />He did not attack anyone.<br />He did not try to overthrow his father.</p>
          <p>The tension began because of favor.</p>
          <p>This is one of the first hard lessons in Scripture.</p>
          <p>God’s hand on your life does not guarantee peace with people.</p>
          <p>Sometimes it guarantees the opposite.</p>
          <p>Favor makes people ask, “Why him and not me?”</p>
          <p>Instead of looking inward, it is easier to place blame outward.</p>
          <p>Comparison grows.<br />Insecurity hardens.<br />Resentment builds.</p>
          <p>Favor can create friction before fulfillment.</p>
          <p>And here is where we need to be careful.</p>
          <p>Joseph did not earn the coat.</p>
          <p>He was given it.</p>
          <p>You cannot apologize for what God placed on your life.</p>
          <p>You cannot shrink yourself to make others comfortable if God is the one who set you apart.</p>
          <p>At the same time, favor must be carried with humility.</p>
          <p>Genesis 37 does not paint Joseph as evil.</p>
          <p>It paints him as young.<br />Favored.<br />Positioned differently.<br />And surrounded by brothers who were not healed from their own wounds.</p>
          <p>Sometimes resistance does not mean you are wrong.</p>
          <p>Sometimes it means you are marked.</p>
          <p>But favor is not about ego.</p>
          <p>It is about responsibility.</p>
          <p>God does not choose people to inflate them.</p>
          <p>He chooses people to test them.</p>
          <p>And Joseph’s testing begins the moment the robe touches his shoulders.</p>
        </div>
        <div className="mb-8">
          <div className="font-semibold mb-1">Daily Reading:</div>
          <div className="text-gray-700">Genesis 37:1–4</div>
        </div>
        <div className="mb-8">
          <div className="font-semibold mb-1">Reflection:</div>
          <div className="text-gray-700">
            Joseph was hated by his brothers because of the favor placed on him. Can you think of a time when something that felt like a blessing from God created tension with someone close to you?
          </div>
        </div>
        <div className="flex justify-between">
          <div />
          <Link href="/devotionals/testing-of-joseph/day-2" className="text-blue-600 hover:underline font-medium">
            Next Day →
          </Link>
        </div>
      </div>
    </div>
  );
}
