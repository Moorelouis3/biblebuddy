import { ProfileStats } from "../lib/profileStats";

export function shouldShowGlobalUpdateModal(profile: ProfileStats | null, currentUpdateVersion: string): boolean {
  if (!profile) return false;
  if (profile.onboarding_completed !== true) return false;
  if ((profile as any).last_seen_update_version === currentUpdateVersion) return false;
  return true;
}
