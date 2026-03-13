"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface GlobalUpdateModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function GlobalUpdateModal({ isOpen, onDismiss }: GlobalUpdateModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  function handleExplore() {
    onDismiss();
    router.push("/devotionals");
  }

  function handleNotNow() {
    onDismiss();
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
      <div
        className="relative w-full max-w-md rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2"
        role="dialog"
        aria-modal="true"
        aria-label="New Update"
      >
        <div className="rounded-3xl bg-blue-50/80 px-5 py-8">

          {/* Cover image */}
          <div className="flex justify-center mb-5">
            <Image
              src="/Thetestingofjoseph.png"
              alt="The Testing of Joseph devotional cover"
              width={200}
              height={300}
              className="rounded-2xl shadow-lg ring-1 ring-black/10 object-contain"
            />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
              New Devotional
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            The Testing of Joseph
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
            A 21-day devotional walking through Joseph's journey — from his father's favor
            to the pit, from Potiphar's house to the palace. Explore how God works
            through trials, betrayal, and patience in Genesis.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleExplore}
              className="w-full px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Now
            </button>
            <button
              type="button"
              onClick={handleNotNow}
              className="w-full px-5 py-3 rounded-2xl bg-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Not Right Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
