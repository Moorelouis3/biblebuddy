"use client";

import { useRouter } from "next/navigation";

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewNoteModal({ isOpen, onClose }: NewNoteModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  function handleGrowNote() {
    onClose();
    router.push("/notes/grow");
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">What kind of note do you want to take today?</h2>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGrowNote}
            className="w-full px-6 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            GROW Note
          </button>

          <button
            disabled
            className="w-full px-6 py-4 rounded-xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
          >
            SEARCH Note
          </button>

          <button
            onClick={() => {
              onClose();
              router.push("/notes/advanced");
            }}
            className="w-full px-6 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Advanced Note
          </button>
        </div>
      </div>
    </div>
  );
}

