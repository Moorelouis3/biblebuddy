// components/FeaturedCharacterModal.tsx
// Modal component for displaying featured Bible character information
// Matches the style of Bible Buddies modal

import { FeaturedCharacter } from "../lib/featuredCharacters";

type FeaturedCharacterModalProps = {
  character: FeaturedCharacter | null;
  onClose: () => void;
};

export function FeaturedCharacterModal({
  character,
  onClose,
}: FeaturedCharacterModalProps) {
  if (!character) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-black/60 shadow-2xl shadow-black/70 p-6 sm:p-7 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
          <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 mx-auto sm:mx-0 rounded-2xl overflow-hidden bg-gray-50">
            {/* Character name as fallback if no image */}
            <div className="text-4xl font-bold text-gray-400">
              {character.name.charAt(0)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <span>{character.name}</span>
            </h2>
            {character.role && (
              <p className="text-sm text-gray-600 mb-2">{character.role}</p>
            )}

            {character.era && (
              <p className="text-xs sm:text-sm text-gray-700">
                <span className="font-semibold">Era:</span> {character.era}
              </p>
            )}
            {character.role && (
              <p className="text-xs sm:text-sm text-gray-700">
                <span className="font-semibold">Role:</span> {character.role}
              </p>
            )}
            {character.key_verse && (
              <p className="text-xs sm:text-sm text-gray-700 mt-1">
                <span className="font-semibold">Key verse:</span> {character.key_verse}
              </p>
            )}
          </div>
        </div>

        {character.short_description && (
          <div className="text-sm text-gray-700 mb-3">
            <span className="font-semibold">About:</span> {character.short_description}
          </div>
        )}

        {character.long_description && (
          <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
            {character.long_description}
          </div>
        )}
      </div>
    </div>
  );
}

