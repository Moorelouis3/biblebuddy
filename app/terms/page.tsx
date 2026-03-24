import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Terms of Service | Bible Buddy",
  description: "Terms of Service for Bible Buddy.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Terms"
      title="Terms of Service"
      description="These Terms of Service govern your access to and use of Bible Buddy. By using Bible Buddy, you agree to these terms."
      lastUpdated="March 24, 2026"
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using Bible Buddy, you agree to be bound by these Terms of
          Service and our{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not
          use the service.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          You must be legally able to enter into a binding agreement to use Bible
          Buddy. If you are under 18, you should use Bible Buddy only with the
          involvement of a parent or legal guardian. Bible Buddy is not intended for
          children under 13.
        </p>
      </LegalSection>

      <LegalSection title="3. Your Account">
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials and for activity that occurs under your account. You agree to
          provide accurate information and keep it reasonably up to date.
        </p>
      </LegalSection>

      <LegalSection title="4. License to Use Bible Buddy">
        <p>
          Subject to these terms, Bible Buddy grants you a limited, non-exclusive,
          non-transferable, revocable license to access and use the service for your
          personal, non-commercial use.
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable Use">
        <p>You agree not to:</p>
        <ul>
          <li>Use Bible Buddy for unlawful, fraudulent, abusive, or harmful activity.</li>
          <li>Interfere with the service, its infrastructure, or other users.</li>
          <li>Attempt to gain unauthorized access to accounts, systems, or private data.</li>
          <li>Upload or share malware, spam, harassing content, or content that infringes another person&apos;s rights.</li>
          <li>Scrape, copy, reverse engineer, or exploit Bible Buddy beyond what is allowed by applicable law.</li>
          <li>Use community, comments, messages, or study group features to threaten, impersonate, or abuse others.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. User Content">
        <p>
          You retain ownership of content you submit to Bible Buddy, such as notes,
          comments, posts, messages, and feedback. You grant Bible Buddy a
          non-exclusive, worldwide, royalty-free license to host, store, reproduce,
          adapt, display, and distribute that content as needed to operate, improve,
          and provide the service.
        </p>
        <p>
          You represent that you have the rights necessary to submit the content and
          that your content does not violate law or third-party rights.
        </p>
      </LegalSection>

      <LegalSection title="7. Community Standards">
        <p>
          Bible Buddy is intended to be a respectful, encouraging space for Bible
          study. We may remove content or restrict accounts that, in our judgment,
          violate these terms or harm the community, including content involving
          harassment, hate, explicit sexual content, threats, spam, or repeated
          disruption.
        </p>
      </LegalSection>

      <LegalSection title="8. Paid Features and Billing">
        <p>
          Some features may require payment, including Bible Buddy Pro or future
          subscription offerings. Prices, features, and billing terms may change
          from time to time. If you purchase a paid feature, you authorize the
          applicable payment processor to charge the selected payment method.
        </p>
        <p>
          Except where required by law, fees are non-refundable once billed. Trial
          offers, promotional codes, and discounts may be subject to separate terms.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual Property">
        <p>
          Bible Buddy and its design, branding, software, text, graphics, and other
          original content are owned by Bible Buddy or its licensors and protected
          by intellectual property laws. These terms do not transfer ownership of
          any intellectual property to you.
        </p>
      </LegalSection>

      <LegalSection title="10. Third-Party Services">
        <p>
          Bible Buddy may rely on or link to third-party services. We are not
          responsible for third-party products, websites, or policies, and your use
          of them may be subject to separate terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Service Availability">
        <p>
          We may modify, suspend, or discontinue all or part of Bible Buddy at any
          time, with or without notice. We do not guarantee uninterrupted or
          error-free availability.
        </p>
      </LegalSection>

      <LegalSection title="12. Disclaimers">
        <p>
          Bible Buddy is provided on an &quot;as is&quot; and &quot;as available&quot; basis to the
          fullest extent permitted by law. We disclaim warranties of any kind,
          whether express or implied, including implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, and uninterrupted
          availability.
        </p>
        <p>
          Bible Buddy provides educational and devotional tools, not professional
          legal, medical, mental health, or financial advice.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Bible Buddy and its operators,
          affiliates, licensors, and service providers will not be liable for any
          indirect, incidental, special, consequential, exemplary, or punitive
          damages, or for any loss of profits, revenues, data, goodwill, or use,
          arising out of or related to your use of the service.
        </p>
        <p>
          To the fullest extent permitted by law, our total liability for claims
          arising out of or relating to Bible Buddy will not exceed the greater of
          the amount you paid us in the 12 months before the claim arose or 50 U.S.
          dollars.
        </p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless Bible Buddy and its
          operators from claims, liabilities, damages, losses, and expenses arising
          out of your content, your misuse of the service, or your violation of
          these terms or applicable law.
        </p>
      </LegalSection>

      <LegalSection title="15. Termination">
        <p>
          You may stop using Bible Buddy at any time. We may suspend or terminate
          your access if we believe you violated these terms, created risk for the
          service or community, or where needed for legal or operational reasons.
        </p>
      </LegalSection>

      <LegalSection title="16. Governing Law">
        <p>
          These terms are governed by the laws applicable in the jurisdiction from
          which Bible Buddy is operated, excluding conflict-of-law rules, except to
          the extent consumer protection law in your home jurisdiction requires
          otherwise.
        </p>
      </LegalSection>

      <LegalSection title="17. Changes to These Terms">
        <p>
          We may update these Terms of Service from time to time. When we do, we
          will post the updated version here and update the date above. Continued
          use of Bible Buddy after changes become effective means you accept the
          revised terms.
        </p>
      </LegalSection>

      <LegalSection title="18. Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>.
        </p>
        <p>
          You can also visit the{" "}
          <Link href="/contact">Contact page</Link>{" "}
          or review our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
