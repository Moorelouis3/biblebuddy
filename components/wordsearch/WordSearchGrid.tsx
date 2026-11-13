"use client";

/**
 * The letter grid, built for a thumb first (2026-11-13).
 *
 * Three ways to select a word, all ending in the same place:
 *
 *  - Drag from the first letter to the last. The end snaps to the nearest
 *    straight line, so the finger does not have to stay on a 26px cell.
 *  - Tap the first letter, then tap the last. For anyone who finds dragging
 *    hard.
 *  - Arrow keys to move, Enter or Space to mark the first and last letter.
 *
 * The page must not scroll while a finger is working in the grid, and must
 * scroll normally everywhere else. `touch-action: none` on the grid alone does
 * that: the browser hands every touch that starts here to us and leaves the
 * rest of the page as it was. Which cell a touch is over is worked out from
 * the grid's own rectangle rather than from the element under the finger, so
 * a touch that slides just off the edge still counts as the edge cell.
 *
 * A touch the system takes away (a notification, the iOS edge swipe) arrives
 * as pointercancel. That clears the drag, so a selection can never be left
 * stuck on screen.
 *
 * Found words are marked with an outlined capsule and heavier letters, not
 * with colour alone.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { cellsBetween, matchSelection, placementCells, snapEnd, type Cell, type Placement, type Puzzle } from "@/lib/wordSearchGame";

type Props = {
  puzzle: Puzzle;
  /** Letters of the words already found. */
  found: readonly string[];
  /** Called once when a new word is selected correctly. */
  onFound: (letters: string) => void;
  /** No more selecting: the puzzle is finished. */
  disabled?: boolean;
};

type Selection = { start: Cell; end: Cell };

const sameCell = (a: Cell | null, b: Cell | null) => Boolean(a && b && a.row === b.row && a.col === b.col);

export default function WordSearchGrid({ puzzle, found, onFound, disabled = false }: Props) {
  const size = puzzle.size;
  const gridRef = useRef<HTMLDivElement | null>(null);
  // The live drag. `end` lives here, not only in state, so pointerup reads
  // the latest snapped cell and never a value from an older render.
  const drag = useRef<{ pointerId: number; start: Cell; end: Cell; moved: boolean } | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  // Tap-tap mode: the first letter that was tapped, waiting for the last.
  const [anchor, setAnchor] = useState<Cell | null>(null);
  const [cursor, setCursor] = useState<Cell>({ row: 0, col: 0 });
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");

  const foundSet = useMemo(() => new Set(found), [found]);
  const foundPlacements = useMemo(
    () => puzzle.placements.filter((placement) => foundSet.has(placement.letters)),
    [puzzle, foundSet],
  );
  const foundCells = useMemo(() => {
    const keys = new Set<string>();
    for (const placement of foundPlacements) for (const cell of placementCells(placement)) keys.add(`${cell.row},${cell.col}`);
    return keys;
  }, [foundPlacements]);

  // A new grid (Play again, another book) must start with nothing
  // half-selected. The parent gives this component a new key per grid, so a
  // fresh instance is mounted and there is no state to clear here.

  const cellAt = useCallback(
    (clientX: number, clientY: number): Cell | null => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return null;
      const clamp = (value: number) => Math.min(size - 1, Math.max(0, value));
      return {
        row: clamp(Math.floor(((clientY - rect.top) / rect.height) * size)),
        col: clamp(Math.floor(((clientX - rect.left) / rect.width) * size)),
      };
    },
    [size],
  );

  const commit = useCallback(
    (start: Cell, end: Cell) => {
      const placement: Placement | null = matchSelection(puzzle, start, end);
      if (placement && !foundSet.has(placement.letters)) {
        setMessage(`Found ${placement.letters}`);
        onFound(placement.letters);
      } else if (placement) {
        setMessage("Already found");
      } else {
        setMessage("Not one of the words");
      }
    },
    [puzzle, foundSet, onFound],
  );

  /** One tap (or one Enter) on a cell, in tap-tap mode. */
  const tap = useCallback(
    (cell: Cell) => {
      if (!anchor) {
        setAnchor(cell);
        setMessage("Now tap the last letter");
        return;
      }
      if (sameCell(anchor, cell)) {
        setAnchor(null);
        setMessage("");
        return;
      }
      if (cellsBetween(anchor, cell)) {
        commit(anchor, cell);
        setAnchor(null);
      } else {
        // Not on a line with the first letter: treat it as a new first letter.
        setAnchor(cell);
        setMessage("Now tap the last letter");
      }
    },
    [anchor, commit],
  );

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    const cell = cellAt(event.clientX, event.clientY);
    if (!cell) return;
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is a nicety; the handlers below work without it.
    }
    drag.current = { pointerId: event.pointerId, start: cell, end: cell, moved: false };
    setSelection({ start: cell, end: cell });
    setCursor(cell);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const raw = cellAt(event.clientX, event.clientY);
    if (!raw) return;
    const end = snapEnd(current.start, raw, size);
    if (!sameCell(end, current.start)) current.moved = true;
    current.end = end;
    setSelection({ start: current.start, end });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    drag.current = null;
    const end = current.end;
    setSelection(null);
    if (current.moved && !sameCell(end, current.start)) {
      setAnchor(null);
      commit(current.start, end);
    } else {
      tap(current.start);
    }
  }

  function cancelDrag() {
    drag.current = null;
    setSelection(null);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      setCursor((current) => ({
        row: Math.min(size - 1, Math.max(0, current.row + move[0])),
        col: Math.min(size - 1, Math.max(0, current.col + move[1])),
      }));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      tap(cursor);
    } else if (event.key === "Escape") {
      setAnchor(null);
      setMessage("");
    }
  }

  // What to draw as the live preview: an active drag, or the tapped first
  // letter stretched to the keyboard cursor when the two line up.
  const preview: Selection | null =
    selection ?? (anchor ? { start: anchor, end: focused && cellsBetween(anchor, cursor) ? cursor : anchor } : null);

  const line = (start: Cell, end: Cell) => ({
    x1: start.col + 0.5,
    y1: start.row + 0.5,
    x2: end.col + 0.5,
    y2: end.row + 0.5,
  });

  return (
    <div className="mx-auto w-full max-w-[30rem]">
      <div
        ref={gridRef}
        role="grid"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Word search grid, ${size} by ${size}. Drag across a word, or tap its first and last letter.`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={cancelDrag}
        onLostPointerCapture={() => {
          // Capture can be taken without a pointerup. Never leave a preview behind.
          if (drag.current) cancelDrag();
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onContextMenu={(event) => event.preventDefault()}
        className="relative aspect-square w-full select-none rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2563eb)]"
        style={{ touchAction: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {foundPlacements.map((placement) => {
            const cells = placementCells(placement);
            const points = line(cells[0], cells[cells.length - 1]);
            return (
              <g key={placement.letters}>
                {/* A dark outline under a pale fill: a capsule you can see without colour. */}
                <line {...points} stroke="#166534" strokeWidth={0.84} strokeLinecap="round" />
                <line {...points} stroke="#dcfce7" strokeWidth={0.7} strokeLinecap="round" />
              </g>
            );
          })}
          {preview ? (
            <line
              {...line(preview.start, preview.end)}
              stroke="#2563eb"
              strokeOpacity={0.35}
              strokeWidth={0.8}
              strokeLinecap="round"
            />
          ) : null}
        </svg>

        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }}
        >
          {puzzle.grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isFound = foundCells.has(`${rowIndex},${colIndex}`);
              const isAnchor = sameCell(anchor, { row: rowIndex, col: colIndex });
              const isCursor = focused && !disabled && cursor.row === rowIndex && cursor.col === colIndex;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  role="gridcell"
                  aria-selected={isAnchor}
                  className={`relative flex items-center justify-center leading-none text-[#111827] ${
                    isFound ? "font-black" : "font-bold"
                  }`}
                  style={{ fontSize: "clamp(13px, 4.6vw, 22px)" }}
                >
                  {isAnchor ? (
                    <span className="absolute inset-[8%] rounded-full border-2 border-[#2563eb] bg-[#dbeafe]" aria-hidden="true" />
                  ) : null}
                  {isCursor ? (
                    <span className="absolute inset-[4%] rounded-md border-2 border-dashed border-[#111827]" aria-hidden="true" />
                  ) : null}
                  <span className="relative">{letter}</span>
                </div>
              );
            }),
          )}
        </div>
      </div>

      <p className="mt-2 min-h-[1.25rem] text-center text-xs font-bold text-[var(--bb-text-muted,#6b7280)]" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
