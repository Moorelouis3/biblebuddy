"use client";

/**
 * "Finish your account to join in" - shown when a guest (or an incomplete
 * account) tries to post in the group or join a community study
 * (Louis, 2026-09-04). Fixes everything inline: full name, profile photo
 * (avatars bucket, same as the comment section's gate), and for guests an
 * email + password attached to the SAME user via auth.updateUser, so no
 * progress is ever lost. Depending on project settings Supabase may email a
 * confirmation link before the address becomes active.
 */

import { useCallback, useEffect, useState } from "react";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { checkFullAccount, hasFullName, type AccountGateState } from "../lib/accountGate";

/**
 * The one-line way to use the gate: call ensureFullAccount() at the top of
 * a gated action and bail when it returns false - the modal takes over.
 * Render accountGateModal anywhere in the component's tree (it portals).
 */
export function useAccountGate(actionLabel: string) {
  const [gate, setGate] = useState<AccountGateState | null>(null);
  const [open, setOpen] = useState(false);

  const ensureFullAccount = useCallback(async () => {
    const state = await checkFullAccount();
    if (state.ok) return true;
    setGate(state);
    setOpen(true);
    return false;
  }, []);

  const accountGateModal = (
    <AccountRequiredModal
      isOpen={open}
      onClose={() => setOpen(false)}
      gate={gate}
      actionLabel={actionLabel}
      onCompleted={() => setOpen(false)}
    />
  );

  return { ensureFullAccount, accountGateModal };
}

export default function AccountRequiredModal({
  isOpen,
  onClose,
  gate,
  actionLabel,
  onCompleted,
}: {
  isOpen: boolean;
  onClose: () => void;
  gate: AccountGateState | null;
  /** What they were trying to do, e.g. "post in the group". */
  actionLabel: string;
  /** Called when the account is complete - the caller can retry the action. */
  onCompleted: (gate: AccountGateState) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailPendingConfirm, setEmailPendingConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen || !gate) return;
    const parts = gate.displayName.split(/\s+/);
    setFirstName(parts[0] && parts[0].toLowerCase() !== "user" ? parts[0] : "");
    setLastName(parts.slice(1).join(" "));
    setPhotoPreview(gate.profileImageUrl);
    setPhotoFile(null);
    setError(null);
    setEmailPendingConfirm(false);
  }, [isOpen, gate]);

  if (!gate) return null;

  async function save() {
    if (saving || !gate?.userId) return;
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!hasFullName(fullName)) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!photoPreview && !photoFile) {
      setError("Please add a profile picture.");
      return;
    }
    if (gate.missing.email && (!email.trim() || password.trim().length < 6)) {
      setError("Please enter your email and a password of at least 6 characters.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      let imageUrl = gate.profileImageUrl;
      if (photoFile) {
        const ext = photoFile.name.split(".").pop() || "jpg";
        const path = `${gate.userId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, photoFile, { upsert: true });
        if (uploadError) throw uploadError;
        imageUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
      }

      const { error: profileError } = await supabase.from("profile_stats").upsert(
        { user_id: gate.userId, display_name: fullName, username: fullName, profile_image_url: imageUrl },
        { onConflict: "user_id" },
      );
      if (profileError) throw profileError;

      if (gate.missing.email) {
        // Attaches the email to the SAME user id - study history carries over.
        const { error: authError } = await supabase.auth.updateUser({
          email: email.trim().toLowerCase(),
          password: password.trim(),
          data: { firstName: firstName.trim(), first_name: firstName.trim(), display_name: fullName },
        });
        if (authError) throw authError;
      } else {
        await supabase.auth.updateUser({
          data: { firstName: firstName.trim(), first_name: firstName.trim(), display_name: fullName },
        });
      }

      const fresh = await checkFullAccount();
      if (fresh.ok) {
        onCompleted(fresh);
        onClose();
      } else if (fresh.missing.email) {
        // The address needs its confirmation link clicked first.
        setEmailPendingConfirm(true);
      } else {
        onCompleted(fresh);
        onClose();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your account.");
    } finally {
      setSaving(false);
    }
  }

  const rows: Array<[string, boolean]> = [
    ["Your name", !gate.missing.name],
    ["Email & password", !gate.missing.email],
    ["Profile picture", !gate.missing.photo],
  ];

  return (
    <ModalShell isOpen={isOpen} onClose={saving ? undefined : onClose} backdropColor="bg-black/55">
      <div className="mx-4 w-full max-w-md rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-white p-5 text-left shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
              One quick step
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
              Finish your account to {actionLabel}
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              The community is real people - a name, an email, and a face.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-lg font-bold text-[var(--bb-text-secondary,#4b5563)]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-3 flex gap-3">
          {rows.map(([label, done]) => (
            <span
              key={label}
              className={`rounded-full px-2.5 py-1 text-[11px] font-black ${
                done ? "bg-emerald-50 text-emerald-700" : "bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-secondary,#4b5563)]"
              }`}
            >
              {done ? "✓" : "○"} {label}
            </span>
          ))}
        </div>

        {emailPendingConfirm ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            Almost there - we sent a confirmation link to your email. Click it, then come back and try again.
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
                className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
              />
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last name"
                className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
              />
            </div>

            {gate.missing.email ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Choose a password"
                  className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-3 py-2.5 text-sm font-semibold outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
                />
              </>
            ) : null}

            <label className="flex cursor-pointer items-center gap-3">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="" className="h-12 w-12 rounded-full border border-[var(--bb-card-border,#dbe7f4)] object-cover" />
              ) : (
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-xl" aria-hidden="true">
                  📷
                </span>
              )}
              <span className="text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
                {photoPreview ? "Change profile picture" : "Add a profile picture"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setPhotoFile(file);
                  if (file) setPhotoPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="mt-1 rounded-2xl bg-[#111827] px-5 py-3 text-sm font-black disabled:cursor-wait disabled:opacity-70"
              style={{ color: "#ffffff" }}
            >
              {saving ? "Saving..." : "Save & continue"}
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
