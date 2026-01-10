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
  onDayComplete: (reflectionText: string, readingCompleted: boolean) => void; // Called with current modal state values
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setReadingChecked(dayProgress?.reading_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
    setHasUnsavedChanges(false);
  }, [dayProgress]);

  const handleReadingCheck = () => {
    setReadingChecked(!readingChecked);
    setHasUnsavedChanges(true);
  };

  const handleReflectionChange = (text: string) => {
    setReflectionText(text);
    setHasUnsavedChanges(true);
  };

  const handleMarkComplete = () => {
    // Pass current modal state directly to parent - parent will save everything in one transaction
    onDayComplete(reflectionText.trim(), readingChecked);
  };

  const handleClose = () => {
    // Close without saving - just discard any unsaved changes
    setReadingChecked(dayProgress?.reading_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
    setHasUnsavedChanges(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto" 
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER SECTION - Fixed at top */}
        <div className="flex-shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            title="Close (don't save)"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⭐</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Day {day.day_number}</h1>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 ml-11">{day.day_title}</h2>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {/* DEVOTIONAL CONTENT SECTION */}
          <div className="mb-8">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
              {day.devotional_text}
            </div>
          </div>

          {/* BIBLE READING SECTION */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              📖 Bible Reading
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg -ml-2 transition">
                <input
                  type="checkbox"
                  checked={readingChecked}
                  onChange={handleReadingCheck}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={onBibleReadingClick}
                    className="text-blue-600 hover:text-blue-700 font-medium underline text-left"
                  >
                    Read {day.bible_reading_book} {day.bible_reading_chapter}
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          {day.reflection_question && (
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                ✍️ Reflection
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                {day.reflection_question}
              </p>
              <textarea
                value={reflectionText}
                onChange={(e) => handleReflectionChange(e.target.value)}
                placeholder="Type your thoughts here, or use voice-to-text..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y text-gray-900 leading-relaxed"
                style={{ lineHeight: '1.6' }}
              />
              {hasUnsavedChanges && (
                <p className="text-xs text-gray-500 mt-2">Changes will be saved when you mark the day complete.</p>
              )}
            </div>
          )}
        </div>

        {/* ACTION BUTTONS - Fixed at bottom */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 border border-gray-300 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleMarkComplete}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            ✓ Mark Day as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
