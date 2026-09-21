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
      lastUpdated="September 21, 2026"
    >
      <LegalSection title="1. Scope">
        <p>
          This Privacy Policy applies to Bible Buddy, including the Bible Buddy website and apps,
          study tools, community features, messaging features, and related services
          we provide.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>Account information, such as your name, email address, profile details, login credentials, and account preferences. If you sign in with Google, we receive your name, email address, and profile picture from Google.</li>
          <li>Content you create, such as notes, highlights, bookmarks, comments, messages, study progress, trivia activity, group posts, feedback, and other material you submit through Bible Buddy.</li>
          <li>Conversations with our AI study assistant, Little Louis, including the messages you send and the replies you receive.</li>
          <li>Signup attribution information, such as which website, page, or referrer brought you to Bible Buddy when you created your account.</li>
          <li>Payment information for legacy paid features. Bible Buddy is now free; past payments were processed by Stripe, and payment card details are never stored by Bible Buddy.</li>
          <li>Device and usage information, such as browser or device type, app interactions, pages viewed, referral information, and general diagnostic or analytics data.</li>
          <li>Notification data, including push notification preferences, the device token or push subscription used to deliver notifications, and delivery status information.</li>
          <li>Communications you send to us, including support requests, bug reports, contact submissions, and survey or feedback responses.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Collect Information">
        <p>We collect information in several ways:</p>
        <ul>
          <li>Directly from you when you create an account or use features.</li>
          <li>Automatically when you use Bible Buddy.</li>
          <li>From service providers that help us operate Bible Buddy, such as Google when you choose Google sign-in.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How We Use Information">
        <p>We use information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve Bible Buddy.</li>
          <li>Create and manage user accounts and authenticate users.</li>
          <li>Save your progress, notes, highlights, study history, and other account activity.</li>
          <li>Deliver community, messaging, AI study assistant, and study features.</li>
          <li>Send service-related messages, onboarding messages, updates, notifications, and (if you are subscribed) email newsletters.</li>
          <li>Understand which websites and campaigns bring people to Bible Buddy.</li>
          <li>Monitor performance, diagnose errors, and protect the service.</li>
          <li>Enforce our Terms of Service and Community Guidelines, including reviewing reports of objectionable content.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Service Providers We Use">
        <p>We share information with the following providers only as needed to run Bible Buddy:</p>
        <ul>
          <li><strong>Supabase</strong> hosts our database, account logins, and uploaded files (such as profile pictures).</li>
          <li><strong>Vercel</strong> hosts the Bible Buddy website. Vercel Analytics collects anonymous usage data (such as pages viewed and device type) to help us understand how the site is used. It does not use cookies to track you across sites.</li>
          <li><strong>OpenAI</strong> generates replies for Little Louis, our AI study assistant. The messages you send to Little Louis (and relevant conversation context) are sent to OpenAI to create a reply. Your conversations are also stored in our database so you can come back to them. Please do not share sensitive personal information in AI chats.</li>
          <li><strong>Google</strong> provides optional Google sign-in. When you use it, Google receives the information needed to sign you in, and we receive your basic profile information from Google.</li>
          <li><strong>Systeme.io</strong> sends our emails. We share your email address and name with Systeme.io to send you onboarding emails and newsletters. You can unsubscribe at any time using the link in any email.</li>
          <li><strong>Google AdSense</strong> shows ads on parts of the Bible Buddy website. Google and its partners may use cookies to show ads and may personalize ads based on your visits to this and other websites. You can manage ad personalization at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</li>
          <li><strong>Stripe</strong> processed payments for legacy paid features. Bible Buddy is now free, and we do not store card details.</li>
          <li><strong>Push notification services</strong> (such as your browser&apos;s push service, Apple Push Notification service, or Firebase Cloud Messaging) receive a device token or push subscription so we can deliver notifications you have turned on.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Cookies, Local Storage, and Similar Technologies">
        <p>
          Bible Buddy uses cookies, local storage, session storage, and similar
          technologies to keep you signed in, remember preferences, improve
          performance, and help core features work properly. On the website,
          advertising partners such as Google AdSense may also set cookies as
          described above. Your browser may allow you to limit some of these
          technologies, but doing so may affect functionality.
        </p>
      </LegalSection>

      <LegalSection title="7. When We Share Information">
        <p>We do not sell your personal information for money. We may share information:</p>
        <ul>
          <li>With the service providers listed above that help us operate Bible Buddy.</li>
          <li>With other users when you choose to participate in community features, messages, comments, study groups, public profiles, or other shared spaces.</li>
          <li>If required by law, legal process, or a good-faith belief that sharing is necessary to protect rights, safety, or the integrity of the service.</li>
          <li>As part of a merger, acquisition, financing, or sale of assets, subject to standard confidentiality protections where appropriate.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. User Content and Visibility">
        <p>
          Some features of Bible Buddy allow you to create or share content with
          others. Depending on the feature, that content may be visible to other
          users, study groups, or the broader community inside the app. Please avoid
          posting sensitive personal information in places intended for sharing.
          See our <Link href="/community-guidelines">Community Guidelines</Link> for
          how we handle reports and objectionable content.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Retention">
        <p>
          We keep your information for as long as your account is active. When you
          delete your account, we delete your account and the data tied to it, as
          described below. We may keep limited records where we are legally required
          to, to resolve disputes, or to prevent abuse.
        </p>
      </LegalSection>

      <LegalSection title="10. Deleting Your Account">
        <p>
          You can permanently delete your account at any time from inside Bible
          Buddy: go to <strong>Settings → Delete my account</strong> and confirm.
          This deletes your login, profile, progress, notes, highlights, bookmarks,
          posts, comments, messages, AI chats, and uploaded profile pictures.
        </p>
        <p>
          You can also request deletion by emailing{" "}
          <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>.
          More details are on our{" "}
          <Link href="/delete-account">account deletion page</Link>.
        </p>
      </LegalSection>

      <LegalSection title="11. Data Security">
        <p>
          We use reasonable administrative, technical, and organizational measures to
          help protect personal information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="12. Children&apos;s Privacy">
        <p>
          Bible Buddy is not intended for children under 13, and we do not knowingly
          collect personal information from children under 13. If you believe a
          child under 13 has provided personal information, please contact us so we
          can review and delete it if appropriate.
        </p>
      </LegalSection>

      <LegalSection title="13. Your Choices and Rights">
        <p>Depending on where you live, you may have rights to:</p>
        <ul>
          <li>Access, update, or delete certain personal information.</li>
          <li>Request a copy of information associated with your account.</li>
          <li>Object to or limit certain processing in some circumstances.</li>
          <li>Opt out of marketing emails at any time using the unsubscribe link.</li>
          <li>Control cookies, ad personalization, and device notification settings.</li>
        </ul>
        <p>
          You may also be able to update some information directly from your account
          settings. To make a privacy request, contact us using the information
          below.
        </p>
      </LegalSection>

      <LegalSection title="14. International Use">
        <p>
          Bible Buddy may be accessed from different countries. By using the
          service, you understand that your information may be processed in
          countries other than your own, where data protection laws may differ.
        </p>
      </LegalSection>

      <LegalSection title="15. Third-Party Services and Links">
        <p>
          Bible Buddy may link to or integrate with third-party services. Their
          privacy practices are governed by their own policies, not this one. We
          encourage you to review those policies when using third-party services.
        </p>
      </LegalSection>

      <LegalSection title="16. California Notice">
        <p>
          If you are a California resident, you may have additional rights under
          California law, including rights to know, delete, correct, and limit
          certain uses of personal information, subject to legal exceptions.
        </p>
      </LegalSection>

      <LegalSection title="17. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          post the updated version on this page and update the effective date above.
          Your continued use of Bible Buddy after an update means the revised policy
          applies going forward.
        </p>
      </LegalSection>

      <LegalSection title="18. Contact Us">
        <p>
          For privacy questions or requests, contact us at{" "}
          <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>.
        </p>
        <p>
          You can also visit the{" "}
          <Link href="/contact">Contact page</Link>{" "}
          or review our{" "}
          <Link href="/terms">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/community-guidelines">Community Guidelines</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
