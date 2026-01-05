# Action Recording Integration Guide

This document explains where to call `recordAction()` to track user actions.

## Action Types

1. **user_login** - When user logs in
2. **chapter_completed** - When user marks a chapter as finished
3. **note_created** - When user creates a note
4. **person_learned** - When user marks a person as finished
5. **place_discovered** - When user marks a place as finished
6. **keyword_mastered** - When user marks a keyword as finished

## Integration Points

### 1. User Login
**Location**: Authentication flow (login page or auth callback)
**Action**: `recordAction(userId, "user_login")`
**When**: After successful authentication

### 2. Chapter Completed
**Location**: Chapter completion handlers
**Files to check**:
- `app/Bible/[book]/[chapter]/page.tsx` - "Mark as finished" button
- `app/reading/books/[book]/page.tsx` - Chapter completion logic
**Action**: `recordAction(userId, "chapter_completed")`
**When**: After successfully upserting to `completed_chapters` table

### 3. Note Created
**Location**: Note creation/save handlers
**Files to check**:
- `app/notes/page.tsx` - Note creation form
- Any note saving logic
**Action**: `recordAction(userId, "note_created")`
**When**: After successfully saving a note to the `notes` table

### 4. Person Learned
**Location**: People in the Bible completion handler
**File**: `app/people-in-the-bible/page.tsx`
**Action**: `recordAction(userId, "person_learned")`
**When**: After successfully upserting to `people_progress` table (in the "Mark as finished" button handler)

### 5. Place Discovered
**Location**: Places in the Bible completion handler
**File**: `app/places-in-the-bible/page.tsx`
**Action**: `recordAction(userId, "place_discovered")`
**When**: After successfully upserting to `places_progress` table (in the "Mark as finished" button handler)

### 6. Keyword Mastered
**Location**: Keywords in the Bible completion handler
**File**: `app/keywords-in-the-bible/page.tsx`
**Action**: `recordAction(userId, "keyword_mastered")`
**When**: After successfully upserting to `keywords_progress` table (in the "Mark as finished" button handler)

## Implementation Pattern

```typescript
import { recordAction } from "../../lib/actionRecorder";

// After successful database operation:
await recordAction(userId, "action_type");
```

## Important Notes

- Always call `recordAction()` AFTER the database operation succeeds
- If the database operation fails, do NOT record the action
- The action recorder handles both inserting into `master_actions` and updating `profile_stats`
- Actions are never edited or deleted - they are append-only

