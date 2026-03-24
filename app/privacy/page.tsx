import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy | Bible Buddy",
  description: "Privacy Policy for Bible Buddy.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This Privacy Policy explains what information Bible Buddy collects, how we use it, when we share it, and what choices you have."
      lastUpdated="March 24, 2026"
    >
      <LegalSection title="1. Scope">
        <p>
          This Privacy Policy applies to Bible Buddy, including the website, web app,
          study tools, community features, messaging features, and related services
          we provide.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>Account information, such as your name, email address, profile details, login credentials, and account preferences.</li>
          <li>Content you create, such as notes, highlights, comments, messages, study progress, trivia activity, group posts, feedback, and other material you submit through Bible Buddy.</li>
          <li>Payment and subscription information related to Bible Buddy Pro or other paid features. Payment card details are processed by third-party payment providers such as Stripe and are not stored directly by Bible Buddy.</li>
          <li>Device and usage information, such as browser type, approximate device information, app interactions, pages viewed, referral information, and general diagnostic or analytics data.</li>
          <li>Notification data, including push notification preferences, device subscription details, and message delivery status information.</li>
          <li>Communications you send to us, including support requests, contact submissions, and survey or feedback responses.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Collect Information">
        <p>We collect information in several ways:</p>
        <ul>
          <li>Directly from you when you create an account or use features.</li>
          <li>Automatically when you use Bible Buddy.</li>
          <li>From integrated service providers that help us operate the app, including hosting, authentication, analytics, database, messaging, and payment tools.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How We Use Information">
        <p>We use information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve Bible Buddy.</li>
          <li>Create and manage user accounts and authenticate users.</li>
          <li>Save your progress, notes, highlights, study history, and other account activity.</li>
          <li>Deliver community, messaging, and study features.</li>
          <li>Process subscriptions, upgrades, promotions, and payments.</li>
          <li>Send service-related messages, onboarding messages, updates, and notifications.</li>
          <li>Monitor performance, diagnose errors, and protect the service.</li>
          <li>Enforce our terms, community expectations, and legal rights.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Cookies, Local Storage, and Similar Technologies">
        <p>
          Bible Buddy may use cookies, local storage, session storage, and similar
          technologies to keep you signed in, remember preferences, improve
          performance, support analytics, and help core features work properly.
          Your browser may allow you to limit some of these technologies, but doing
          so may affect functionality.
        </p>
      </LegalSection>

      <LegalSection title="6. When We Share Information">
        <p>We do not sell your personal information for money. We may share information:</p>
        <ul>
          <li>With service providers that help us operate Bible Buddy, such as hosting, infrastructure, analytics, authentication, database, messaging, and payment providers.</li>
          <li>With other users when you choose to participate in community features, messages, comments, study groups, public profiles, or other shared spaces.</li>
          <li>If required by law, legal process, or a good-faith belief that sharing is necessary to protect rights, safety, or the integrity of the service.</li>
          <li>As part of a merger, acquisition, financing, or sale of assets, subject to standard confidentiality protections where appropriate.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. User Content and Visibility">
        <p>
          Some features of Bible Buddy allow you to create or share content with
          others. Depending on the feature, that content may be visible to other
          users, study groups, or the broader community inside the app. Please avoid
          posting sensitive personal information in places intended for sharing.
        </p>
      </LegalSection>

      <LegalSection title="8. Data Retention">
        <p>
          We retain information for as long as reasonably necessary to provide Bible
          Buddy, maintain records, comply with legal obligations, resolve disputes,
          prevent abuse, and enforce agreements. Retention periods may vary based on
          the type of information and the reason we hold it.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Security">
        <p>
          We use reasonable administrative, technical, and organizational measures to
          help protect personal information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="10. Children&apos;s Privacy">
        <p>
          Bible Buddy is not intended for children under 13, and we do not knowingly
          collect personal information from children under 13. If you believe a
          child under 13 has provided personal information, please contact us so we
          can review and delete it if appropriate.
        </p>
      </LegalSection>

      <LegalSection title="11. Your Choices and Rights">
        <p>Depending on where you live, you may have rights to:</p>
        <ul>
          <li>Access, update, or delete certain personal information.</li>
          <li>Request a copy of information associated with your account.</li>
          <li>Object to or limit certain processing in some circumstances.</li>
          <li>Opt out of marketing communications.</li>
          <li>Control browser-based cookies or device notification settings.</li>
        </ul>
        <p>
          You may also be able to update some information directly from your account
          settings. To make a privacy request, contact us using the information
          below.
        </p>
      </LegalSection>

      <LegalSection title="12. International Use">
        <p>
          Bible Buddy may be accessed from different countries. By using the
          service, you understand that your information may be processed in
          countries other than your own, where data protection laws may differ.
        </p>
      </LegalSection>

      <LegalSection title="13. Third-Party Services and Links">
        <p>
          Bible Buddy may link to or integrate with third-party services. Their
          privacy practices are governed by their own policies, not this one. We
          encourage you to review those policies when using third-party services.
        </p>
      </LegalSection>

      <LegalSection title="14. California Notice">
        <p>
          If you are a California resident, you may have additional rights under
          California law, including rights to know, delete, correct, and limit
          certain uses of personal information, subject to legal exceptions.
        </p>
      </LegalSection>

      <LegalSection title="15. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          post the updated version on this page and update the effective date above.
          Your continued use of Bible Buddy after an update means the revised policy
          applies going forward.
        </p>
      </LegalSection>

      <LegalSection title="16. Contact Us">
        <p>
          For privacy questions or requests, contact us at{" "}
          <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>.
        </p>
        <p>
          You can also visit the{" "}
          <Link href="/contact">Contact page</Link>{" "}
          or review our{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
