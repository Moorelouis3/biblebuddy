import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Contact | Bible Buddy",
  description: "Contact Bible Buddy.",
};

export default function ContactPage() {
  return (
    <LegalPageLayout
      eyebrow="Contact"
      title="Contact Bible Buddy"
      description="Questions, support requests, feedback, and partnership inquiries are welcome."
      lastUpdated="March 24, 2026"
    >
      <h2>General Support</h2>
      <p>
        Email{" "}
        <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>{" "}
        for account help, billing questions, bug reports, privacy requests, or
        general support.
      </p>

      <h2>Social Channels</h2>
      <p>You can also connect with Bible Buddy here:</p>
      <ul>
        <li>
          <a
            href="https://www.youtube.com/@BibleStudyWithLouis"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/biblestudywithlouis"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.threads.net/@biblestudywithlouis"
            target="_blank"
            rel="noreferrer"
          >
            Threads
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@biblestudywithlouis"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100085924826685"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </li>
      </ul>

      <h2>Legal Pages</h2>
      <p>
        For more information, review the Privacy Policy and Terms of Service
        linked in the footer on the main page.
      </p>
    </LegalPageLayout>
  );
}
