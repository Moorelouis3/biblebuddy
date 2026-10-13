import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Delete Your Account | Bible Buddy",
  description: "How to permanently delete your Bible Buddy account and data.",
};

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      eyebrow="Account"
      title="Delete Your Account"
      description="You can permanently delete your Bible Buddy account and the data tied to it at any time."
      lastUpdated="September 21, 2026"
    >
      <LegalSection title="1. Delete Your Account in the App">
        <ol className="list-decimal pl-5">
          <li>Sign in to Bible Buddy on the website or in the app.</li>
          <li>Open <strong>Settings</strong>.</li>
          <li>Scroll to <strong>Delete my account</strong> and tap the button.</li>
          <li>Type <strong>DELETE</strong> to confirm, then tap <strong>Permanently delete</strong>.</li>
        </ol>
        <p>
          Your account is deleted right away and you will be signed out. This
          cannot be undone.
        </p>
      </LegalSection>

      <LegalSection title="2. Request Deletion by Email">
        <p>
          If you cannot sign in, email{" "}
          <a href="mailto:support@mybiblebuddy.net?subject=Delete%20my%20Bible%20Buddy%20account">support@mybiblebuddy.net</a>{" "}
          from the email address on your account and ask us to delete it. We will
          confirm and delete your account and data, usually within a few days.
        </p>
      </LegalSection>

      <LegalSection title="3. What Gets Deleted">
        <ul>
          <li>Your login and account (email address, name, and profile).</li>
          <li>Your reading progress, stats, streaks, levels, and plan progress.</li>
          <li>Your notes, highlights, and bookmarks.</li>
          <li>Your group posts, comments, likes, and reactions (including replies under your posts).</li>
          <li>Your direct messages and conversations, buddy connections, and blocks.</li>
          <li>Your conversations with Little Louis, our AI study assistant.</li>
          <li>Your notifications and push notification subscriptions.</li>
          <li>Your uploaded profile pictures and photos.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. What We May Keep">
        <p>
          Groups or study series you led stay available for their other members,
          but are no longer linked to you. If you unsubscribed from our emails, we
          keep your email on our do-not-email list so we never email you again. We
          may keep limited records where the law requires it (for example, records
          of past payments).
        </p>
        <p>
          To stop receiving marketing emails without deleting your account, use the
          unsubscribe link in any email.
        </p>
      </LegalSection>

      <LegalSection title="5. Questions">
        <p>
          Contact us at{" "}
          <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>, or
          read our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
