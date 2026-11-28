"use client";

/**
 * The widget grid on Home, and everything about editing it (lib/homeWidgets.ts
 * for what a layout is, lib/homeLayoutStore.ts for where it is saved).
 *
 * - Edit Home (the button in the greeting) or a long press on any widget
 *   starts edit mode. Widgets wobble, each gets a remove badge, a drag grip
 *   and a size button when it comes in more than one size.
 * - Drag: a mouse clicks and drags any widget. A finger scrolls the page as
 *   usual, and picks a widget up by holding still on it briefly or from its
 *   grip. The page scrolls when the widget nears the top or bottom edge.
 * - Add Widget opens the gallery. Study Guide opens the published catalogue
 *   so the exact guide can be chosen, as many guides as the reader likes.
 * - Done saves. Reset to Default puts the original dashboard back.
 *
 * Editing never touches anything but the layout list: removing a widget does
 * not delete progress, notes, bookmarks or anything else.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  DEFAULT_LAYOUT,
  SIZE_LABEL_KEY,
  SIZE_SPAN,
  WIDGETS,
  WIDGET_CATEGORIES,
  newWidget,
  nextSize,
  studyWidget,
  type HomeLayout,
  type HomeWidget,
  type WidgetKind,
  type WidgetSize,
} from "../../lib/homeWidgets";
import { availability, withTotals, type LibraryStudy, type StudyProgress } from "../../lib/libraryCatalog";
import { loadStudyShelf } from "./HomeExtraWidgets";
import { imageThumb } from "../../lib/imageThumb";
import { useT } from "../../lib/i18n/useT";

const LONG_PRESS_MS = 550;
/** In edit mode, how long a finger holds still on a widget to pick it up. */
const DRAG_HOLD_MS = 220;

type Props = {
  userId: string | null;
  layout: HomeLayout;
  editing: boolean;
  setEditing: (value: boolean) => void;
  onSave: (layout: HomeLayout) => Promise<{ ok: boolean }>;
  onReset: () => Promise<{ ok: boolean }>;
  renderWidget: (widget: HomeWidget) => ReactNode;
};

export default function HomeWidgetBoard({ userId, layout, editing, setEditing, onSave, onReset, renderWidget }: Props) {
  const t = useT();
  const [draft, setDraft] = useState<HomeWidget[]>(layout.items);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Out of edit mode the board shows the saved layout; entering edit mode
  // starts a draft from it.
  useEffect(() => {
    if (!editing) setDraft(layout.items);
  }, [layout, editing]);

  const items = editing ? draft : layout.items;

  /* ----- long press to edit ----- */
  const press = useRef<{ timer: number; x: number; y: number } | null>(null);
  const swallowClick = useRef(false);
  const cancelPress = () => {
    if (press.current) window.clearTimeout(press.current.timer);
    press.current = null;
  };
  const startPress = (event: React.PointerEvent) => {
    if (editing || event.button > 0) return;
    cancelPress();
    const { clientX: x, clientY: y } = event;
    press.current = {
      x,
      y,
      timer: window.setTimeout(() => {
        press.current = null;
        swallowClick.current = true;
        try {
          navigator.vibrate?.(12);
        } catch {}
        setEditing(true);
      }, LONG_PRESS_MS),
    };
  };
  const movePress = (event: React.PointerEvent) => {
    if (press.current && Math.hypot(event.clientX - press.current.x, event.clientY - press.current.y) > 10) cancelPress();
  };
  // The tap that ends a long press must not also open the widget's link.
  useEffect(() => {
    const swallow = (event: MouseEvent) => {
      if (!swallowClick.current) return;
      swallowClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    };
    document.addEventListener("click", swallow, true);
    return () => document.removeEventListener("click", swallow, true);
  }, []);

  /* ----- editing actions ----- */
  const remove = (id: string) => setDraft((current) => current.filter((w) => w.id !== id));
  const resize = (id: string) => setDraft((current) => current.map((w) => (w.id === id ? { ...w, size: nextSize(w) } : w)));
  const add = (widget: HomeWidget) => {
    setDraft((current) => (current.some((w) => w.id === widget.id) ? current : [...current, widget]));
    setNotice(
      t("home.board.added", {
        name: widget.kind === "study_guide" ? t("home.board.studyGuide") : t(WIDGETS[widget.kind].nameKey),
      }),
    );
  };

  const done = async () => {
    setGalleryOpen(false);
    setConfirmReset(false);
    const result = await onSave({ v: 1, items: draft });
    setEditing(false);
    setNotice(result.ok ? t("home.board.saved") : t("home.board.savedLocally"));
  };
  const reset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    setGalleryOpen(false);
    await onReset();
    setDraft(DEFAULT_LAYOUT.items);
    setEditing(false);
    setNotice(t("home.board.resetDone"));
  };

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  /* ----- drag to reorder -----
   * No arrow buttons (Louis, 2026-11-21: "I want a click and drag option
   * instead... we can scroll down the page easier"). A mouse drags at once.
   * A finger scrolls the page as normal; it picks a widget up by holding
   * still on it for a moment, or straight away from the grip in its corner.
   * The moves are followed on the window, so the finger can travel anywhere. */
  const drag = useRef<{ id: string; pointerId: number } | null>(null);
  const hold = useRef<{ timer: number; x: number; y: number; pointerId: number } | null>(null);
  const cancelHold = () => {
    if (hold.current) window.clearTimeout(hold.current.timer);
    hold.current = null;
  };
  const pickUp = (id: string, pointerId: number) => {
    cancelHold();
    drag.current = { id, pointerId };
    setDraggingId(id);
    try {
      navigator.vibrate?.(10);
    } catch {}
  };
  const pressWidget = (event: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (event.button > 0) return;
    if (event.pointerType === "mouse") {
      event.preventDefault();
      pickUp(id, event.pointerId);
      return;
    }
    cancelHold();
    const pointerId = event.pointerId;
    hold.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId,
      timer: window.setTimeout(() => pickUp(id, pointerId), DRAG_HOLD_MS),
    };
  };
  const pressGrip = (event: React.PointerEvent<HTMLElement>, id: string) => {
    if (event.button > 0) return;
    event.preventDefault();
    event.stopPropagation();
    pickUp(id, event.pointerId);
  };

  useEffect(() => {
    if (!editing) return;
    const onMove = (event: PointerEvent) => {
      const h = hold.current;
      if (h && h.pointerId === event.pointerId && Math.hypot(event.clientX - h.x, event.clientY - h.y) > 8) {
        cancelHold(); // the finger is scrolling, not picking up
        return;
      }
      const current = drag.current;
      if (!current || event.pointerId !== current.pointerId) return;
      // Near an edge: scroll, so a widget can travel the whole page.
      const edge = 80;
      if (event.clientY < edge) window.scrollBy(0, -14);
      else if (event.clientY > window.innerHeight - edge) window.scrollBy(0, 14);

      const over = document
        .elementsFromPoint(event.clientX, event.clientY)
        .map((el) => (el as HTMLElement).closest<HTMLElement>("[data-widget-id]"))
        .find((el) => el && el.dataset.widgetId !== current.id);
      if (!over) return;
      const overId = over.dataset.widgetId!;
      const rect = over.getBoundingClientRect();
      const gridWidth = gridRef.current?.getBoundingClientRect().width ?? rect.width;
      // Side by side (smalls, desktop mediums): left half goes before. Full
      // width: top half goes before.
      const before = rect.width < gridWidth * 0.7 ? event.clientX < rect.left + rect.width / 2 : event.clientY < rect.top + rect.height / 2;
      setDraft((list) => {
        const from = list.findIndex((w) => w.id === current.id);
        if (from < 0) return list;
        const next = list.slice();
        const [item] = next.splice(from, 1);
        let to = next.findIndex((w) => w.id === overId);
        if (to < 0) return list;
        if (!before) to += 1;
        next.splice(to, 0, item);
        const same = next.every((w, i) => w.id === list[i].id);
        return same ? list : next;
      });
    };
    const onUp = (event: PointerEvent) => {
      if (hold.current?.pointerId === event.pointerId) cancelHold();
      if (!drag.current || event.pointerId !== drag.current.pointerId) return;
      drag.current = null;
      setDraggingId(null);
    };
    // While a widget is held the page must not scroll under the finger.
    const onTouchMove = (event: TouchEvent) => {
      if (drag.current) event.preventDefault();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      cancelHold();
      drag.current = null;
    };
  }, [editing]);

  return (
    <div>
      <style>{`
        @keyframes bb-hw-wobble { 0%,100% { transform: rotate(-0.6deg); } 50% { transform: rotate(0.6deg); } }
        .bb-hw-editing { animation: bb-hw-wobble 0.32s ease-in-out infinite; }
        .bb-hw-editing:nth-child(2n) { animation-delay: -0.16s; }
        @media (prefers-reduced-motion: reduce) { .bb-hw-editing { animation: none; } }
      `}</style>

      {editing ? (
        <div className="sticky top-2 z-40 mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-lg">
          <p className="pl-2 text-sm font-black text-[var(--bb-text-primary,#111827)]">{t("home.board.editing")}</p>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="min-h-[40px] rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 text-sm font-black text-[var(--bb-text-primary,#111827)]"
            >
              {t("home.board.addWidget")}
            </button>
            <button
              type="button"
              onClick={reset}
              className="min-h-[40px] rounded-xl px-3 text-sm font-bold text-[var(--bb-text-muted,#6b7280)]"
            >
              {confirmReset ? t("home.board.resetConfirm") : t("home.board.reset")}
            </button>
            <button
              type="button"
              onClick={done}
              className="min-h-[40px] rounded-xl bg-[var(--bb-button,#111827)] px-4 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
            >
              {t("home.board.done")}
            </button>
          </div>
        </div>
      ) : null}

      <div
        ref={gridRef}
        className="grid grid-cols-6 gap-3 sm:gap-4"
        style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
      >
        {items.map((widget) => {
          const def = WIDGETS[widget.kind];
          const dragging = draggingId === widget.id;
          return (
            <div
              key={widget.id}
              data-widget-id={widget.id}
              data-widget-kind={widget.kind}
              className={`relative min-w-0 ${SIZE_SPAN[widget.size]} ${editing ? "bb-hw-editing min-h-[96px]" : "empty:hidden"} ${
                dragging ? "z-30 scale-[1.03] opacity-90 shadow-2xl [animation:none]" : ""
              }`}
              onPointerDown={editing ? undefined : startPress}
              onPointerMove={editing ? undefined : movePress}
              onPointerUp={editing ? undefined : cancelPress}
              onPointerCancel={editing ? undefined : cancelPress}
              onPointerLeave={editing ? undefined : cancelPress}
            >
              {renderWidget(widget)}
              {editing ? (
                <>
                  {/* Covers the widget so nothing inside opens while editing,
                      and is what a finger or mouse drags. */}
                  <div
                    className="absolute inset-0 z-20 cursor-grab touch-pan-y select-none rounded-2xl ring-2 ring-[var(--bb-accent,#2f7fe8)]/40 active:cursor-grabbing"
                    onPointerDown={(event) => pressWidget(event, widget.id)}
                    onContextMenu={(event) => event.preventDefault()}
                    aria-hidden="true"
                  />
                  <span className="pointer-events-none absolute bottom-1.5 left-1.5 z-30 max-w-[90%] truncate rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    {def.icon} {t(def.nameKey)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(widget.id)}
                    onPointerDown={(event) => event.stopPropagation()}
                    aria-label={t("home.board.remove", { name: t(def.nameKey) })}
                    className="absolute -left-2 -top-2 z-30 grid h-7 w-7 place-items-center rounded-full bg-[#111827] text-sm font-black text-white shadow-md ring-2 ring-white"
                  >
                    −
                  </button>
                  <div className="absolute right-1 top-1 z-30 flex gap-1" onPointerDown={(event) => event.stopPropagation()}>
                    <span
                      role="img"
                      aria-label={t("home.board.drag", { name: t(def.nameKey) })}
                      onPointerDown={(event) => pressGrip(event, widget.id)}
                      className="grid h-7 w-7 cursor-grab touch-none select-none place-items-center rounded-full bg-white/90 text-sm font-black leading-none text-[#111827] shadow active:cursor-grabbing"
                    >
                      ⠿
                    </span>
                    {def.sizes.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => resize(widget.id)}
                        aria-label={t("home.board.size", { size: t(SIZE_LABEL_KEY[widget.size]) })}
                        className="h-7 rounded-full bg-white/90 px-2 text-[10px] font-black text-[#111827] shadow"
                      >
                        {t(SIZE_LABEL_KEY[widget.size])}
                      </button>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
        {editing && items.length === 0 ? (
          <p className="col-span-6 rounded-2xl border border-dashed border-[var(--bb-card-border,#dbe7f4)] p-6 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            {t("home.board.empty")}
          </p>
        ) : null}
      </div>


      {galleryOpen ? (
        <WidgetGallery userId={userId} onClose={() => setGalleryOpen(false)} onAdd={add} onHome={draft} />
      ) : null}

      {notice ? (
        <div role="status" className="pointer-events-none fixed inset-x-0 bottom-28 z-[70] flex justify-center px-4">
          <span className="rounded-full bg-[#111827] px-4 py-2 text-sm font-bold text-white shadow-lg">{notice}</span>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- the gallery ---------- */

function WidgetGallery({
  userId,
  onClose,
  onAdd,
  onHome,
}: {
  userId: string | null;
  onClose: () => void;
  onAdd: (widget: HomeWidget) => void;
  onHome: HomeWidget[];
}) {
  const t = useT();
  const [view, setView] = useState<"all" | "studies">("all");
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const onBoard = useMemo(() => new Set(onHome.map((w) => w.id)), [onHome]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;
  // Portalled to <body>: the dashboard pager's transform would otherwise
  // carry a fixed sheet off the screen.
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("home.gallery.label")}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-[var(--bb-surface,#ffffff)] shadow-2xl sm:rounded-3xl"
        style={{ backgroundColor: "var(--bb-cover-panel-strong, var(--bb-surface, #ffffff))" }}
      >
        <div className="flex items-center gap-2 border-b border-[var(--bb-card-border,#dbe7f4)] px-4 py-3">
          {view === "studies" ? (
            <button type="button" onClick={() => setView("all")} className="min-h-[36px] rounded-lg px-2 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
              {t("home.gallery.back")}
            </button>
          ) : null}
          <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">{view === "studies" ? t("home.gallery.chooseStudy") : t("home.gallery.title")}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("home.gallery.close")}
            className="ml-auto grid h-9 w-9 place-items-center rounded-full text-lg font-black text-[var(--bb-text-muted,#6b7280)]"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-4 pb-6 pt-2">
          {view === "studies" ? (
            <StudyPicker userId={userId} onBoard={onBoard} onAdd={onAdd} />
          ) : (
            WIDGET_CATEGORIES.map((category) => {
              const defs = Object.values(WIDGETS).filter((def) => def.category === category.id);
              if (!defs.length) return null;
              return (
                <section key={category.id} className="mt-3">
                  <h3 className="text-[11px] font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">{t(category.labelKey)}</h3>
                  <ul className="mt-1.5 space-y-2">
                    {defs.map((def) => {
                      const added = !def.perStudy && onBoard.has(def.kind);
                      return (
                        <li
                          key={def.kind}
                          className="flex items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3"
                        >
                          <span className="text-2xl" aria-hidden>
                            {def.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">{t(def.nameKey)}</span>
                            <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">{t(def.descriptionKey)}</span>
                          </span>
                          {def.perStudy ? (
                            <button
                              type="button"
                              onClick={() => setView("studies")}
                              className="min-h-[36px] shrink-0 rounded-xl bg-[var(--bb-button,#111827)] px-3 text-xs font-black text-[var(--bb-button-text,#ffffff)]"
                            >
                              {t("home.gallery.choose")}
                            </button>
                          ) : added ? (
                            <span className="shrink-0 text-xs font-black text-[var(--bb-text-muted,#6b7280)]">{t("home.gallery.onHome")}</span>
                          ) : (
                            <span className="flex shrink-0 gap-1">
                              {def.sizes.map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => onAdd(newWidget(def.kind as WidgetKind, size as WidgetSize))}
                                  aria-label={t("home.gallery.addSized", { name: t(def.nameKey), size: t(SIZE_LABEL_KEY[size]) })}
                                  className="min-h-[36px] rounded-xl bg-[var(--bb-button,#111827)] px-3 text-xs font-black text-[var(--bb-button-text,#ffffff)]"
                                >
                                  {def.sizes.length > 1 ? t(SIZE_LABEL_KEY[size]) : t("home.gallery.add")}
                                </button>
                              ))}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function StudyPicker({ userId, onBoard, onAdd }: { userId: string | null; onBoard: Set<string>; onAdd: (widget: HomeWidget) => void }) {
  const t = useT();
  const [shelf, setShelf] = useState<{ studies: LibraryStudy[]; progress: Record<string, StudyProgress> } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadStudyShelf(userId)
      .then((value) => !cancelled && setShelf(value))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (failed) return <p className="mt-4 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">{t("home.gallery.studiesFailed")}</p>;
  if (!shelf) return <div className="mt-4 h-40 animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />;

  return (
    <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {shelf.studies.map((study) => {
        const p = withTotals(shelf.progress[study.id], study.total_days);
        const { comingSoon } = availability(study, p.completedDays > 0);
        const added = onBoard.has(`study:${study.id}`);
        return (
          <li key={study.id}>
            <button
              type="button"
              disabled={added}
              onClick={() => onAdd(studyWidget(study.id))}
              className="w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 text-left disabled:opacity-60"
              aria-label={added ? t("home.gallery.studyOnHome", { title: study.title }) : t("home.gallery.addStudy", { title: study.title })}
            >
              {study.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageThumb(study.cover_image)} alt="" className={`aspect-[2/3] w-full rounded-lg object-cover ${comingSoon ? "grayscale" : ""}`} />
              ) : null}
              <span className="mt-1.5 line-clamp-2 block text-xs font-black text-[var(--bb-text-primary,#111827)]">{study.title}</span>
              <span className="block text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                {added
                  ? t("home.gallery.onHome")
                  : p.completedDays > 0
                    ? t("home.day.ofTotal", { day: p.nextDay, total: study.total_days })
                    : t.plural(study.total_days, "home.days.one", "home.days.other")}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
