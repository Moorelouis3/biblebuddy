import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Community Guidelines | Bible Buddy",
  description: "The rules for posting, commenting, and messaging in Bible Buddy.",
};

export default function CommunityGuidelinesPage() {
  return (
    <LegalPageLayout
      eyebrow="Community"
      title="Community Guidelines"
      description="Bible Buddy is a place to study the Bible and encourage each other. These simple rules keep it safe and kind for everyone."
      lastUpdated="September 21, 2026"
    >
      <LegalSection title="1. Be Respectful">
        <p>
          Treat everyone the way you would want to be treated. Disagree kindly,
          assume the best about people, and remember that people of every
          background and stage of faith use Bible Buddy.
        </p>
      </LegalSection>

      <LegalSection title="2. What Is Not Allowed">
        <p>Do not post, comment, or message anything that includes:</p>
        <ul>
          <li>Harassment, bullying, threats, or intimidation.</li>
          <li>Hate speech or attacks on people because of race, ethnicity, nationality, religion, gender, sexual orientation, disability, or age.</li>
          <li>Sexual, pornographic, or sexually suggestive content.</li>
          <li>Graphic violence, or encouraging self-harm or harm to others.</li>
          <li>Spam, repeated off-topic posts, or unwanted advertising.</li>
          <li>Scams, fraud, requests for money, or misleading links.</li>
          <li>Impersonating another person, ministry, or organization.</li>
          <li>Anything illegal, or content that infringes someone else&apos;s rights.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Protect Privacy">
        <p>
          Do not share anyone else&apos;s private information (such as phone
          numbers, addresses, or private messages) without their permission. Be
          careful about how much of your own personal information you share in
          public spaces.
        </p>
      </LegalSection>

      <LegalSection title="4. How to Report and Block">
        <ul>
          <li><strong>Report:</strong> use the report option on a post, comment, message, or profile to flag it to our team.</li>
          <li><strong>Block:</strong> block a user to stop them from messaging you and to hide their content from you.</li>
          <li>You can also email <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a> about anything that concerns you.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. How We Enforce These Rules">
        <p>
          <strong>
            Bible Buddy has zero tolerance for objectionable content and abusive users.
          </strong>
        </p>
        <ul>
          <li>We review reports, usually within 24 hours.</li>
          <li>We remove content that breaks these guidelines.</li>
          <li>We eject users who post objectionable content or abuse others, by suspending or permanently removing their accounts.</li>
          <li>Serious cases may be reported to the appropriate authorities.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. More Information">
        <p>
          These guidelines are part of our{" "}
          <Link href="/terms">Terms of Service</Link>. To learn how we handle your
          information, read our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
