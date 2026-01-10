"use client";

import { useState, useEffect } from "react";

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
}

interface DayProgress {
  day_number: number;
  is_completed: boolean;
  reading_completed: boolean;
  reflection_text: string | null;
}

interface DevotionalDayModalProps {
  day: DevotionalDay;
  dayProgress: DayProgress | undefined;
  onClose: () => void;
  onBibleReadingClick: () => void;
  onReadingComplete: () => void;
  onReflectionSave: (text: string) => void;
  onDayComplete: () => void;
}

export default function DevotionalDayModal({
  day,
  dayProgress,
  onClose,
  onBibleReadingClick,
  onReadingComplete,
  onReflectionSave,
  onDayComplete,
}: DevotionalDayModalProps) {
  const [readingChecked, setReadingChecked] = useState(dayProgress?.reading_completed || false);
  const [reflectionText, setReflectionText] = useState(dayProgress?.reflection_text || "");
  const [isSavingReflection, setIsSavingReflection] = useState(false);

  useEffect(() => {
    setReadingChecked(dayProgress?.reading_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
  }, [dayProgress]);

  const handleReadingCheck = () => {
    const newValue = !readingChecked;
    setReadingChecked(newValue);
    if (newValue) {
      onReadingComplete();
    }
  };

  const handleReflectionChange = (text: string) => {
    setReflectionText(text);
    // Auto-save after user stops typing (debounced)
    setIsSavingReflection(true);
    setTimeout(() => {
      if (text.trim()) {
        onReflectionSave(text);
      }
      setIsSavingReflection(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">Day {day.day_number}</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">{day.day_title}</h3>

        {/* DEVOTIONAL TEXT */}
        <div className="mb-6">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {day.devotional_text}
          </div>
        </div>

        {/* BIBLE READING SECTION */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="reading-checkbox"
              checked={readingChecked}
              onChange={handleReadingCheck}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="reading-checkbox" className="text-lg font-medium text-gray-900">
              Bible Reading
            </label>
          </div>
          <button
            type="button"
            onClick={onBibleReadingClick}
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Read {day.bible_reading_book} {day.bible_reading_chapter}
          </button>
          {readingChecked && (
            <span className="ml-3 text-green-600 text-sm">✓ Completed</span>
          )}
        </div>

        {/* REFLECTION SECTION (Optional) */}
        {day.reflection_question && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <label htmlFor="reflection-input" className="block text-lg font-medium text-gray-900 mb-2">
              Reflection (Optional)
            </label>
            <p className="text-gray-600 text-sm mb-3">{day.reflection_question}</p>
            <textarea
              id="reflection-input"
              value={reflectionText}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder="Type your thoughts here, or use voice-to-text..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
            />
            {isSavingReflection && (
              <p className="text-xs text-gray-500 mt-2">Saving...</p>
            )}
            {dayProgress?.reflection_text && !isSavingReflection && (
              <p className="text-xs text-green-600 mt-2">✓ Saved</p>
            )}
          </div>
        )}

        {/* COMPLETE DAY BUTTON */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onDayComplete();
            }}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Mark Day Complete
          </button>
        </div>
      </div>
    </div>
  );
}

