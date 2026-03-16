/**
 * Global Update Modal Configuration
 *
 * To push a new monthly update popup to all users:
 * 1. Bump CURRENT_UPDATE_VERSION (e.g. "3.0" → "4.0")
 * 2. Update the modal content in components/GlobalUpdateModal.tsx
 * 3. Add a new version entry to app/updates/page.tsx
 * 4. Deploy — every user whose last_seen_update_version doesn't match will see the popup once
 */

export const CURRENT_UPDATE_VERSION = "4.0";
