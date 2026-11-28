/** English interface text: settings. See ../en.ts for the rules. */
export const settingsEn = {
  // Shared on the page
  "settings.loading": "Loading...",
  "settings.loadFailed": "Settings had trouble loading. Please try again in a moment.",
  "settings.errorWithMessage": "Error: {message}",
  "settings.saving": "Saving...",
  "settings.cancel": "Cancel",

  // Guest logging out
  "settings.guest.closeAria": "Close logout warning",
  "settings.guest.eyebrow": "Guest account",
  "settings.guest.title": "Create an account before logging out?",
  "settings.guest.body": "You are a guest right now. If you log out, you will not be able to log back into this guest journey unless you create an account first.",
  "settings.guest.create": "Create Account",
  "settings.guest.logoutAnyway": "Log Out Anyway",

  // New Buddy chosen
  "settings.buddyReady.closeAria": "Close Buddy ready message",
  "settings.buddyReady.eyebrow": "Bible Buddy ready",
  "settings.buddyReady.title": "{name} is ready",
  "settings.buddyReady.body": "Your new Bible Buddy is ready to guide you through the Bible.",
  "settings.buddyReady.letsGo": "Let's go",
  "settings.buddyReady.ok": "OK",
  "settings.buddyReady.awesome": "That's awesome",

  // Bible cover
  "settings.cover.title": "Bible cover",
  "settings.cover.description": "Pick the Bible you want to carry. It dresses every page of Bible Buddy.",
  "settings.cover.light": "Light",
  "settings.cover.dark": "Dark",
  "settings.cover.lightMode": "Light mode",
  "settings.cover.darkMode": "Dark mode",
  "settings.cover.coverAria": "{cover} Bible cover",
  "settings.cover.bookTitle": "HOLY BIBLE",
  "settings.cover.buddies.one": "{count} Buddy",
  "settings.cover.buddies.other": "{count} Buddies",
  "settings.cover.firstUsing": "You're the first Buddy using {cover}.",
  "settings.cover.manyUsing": "{count} Buddies are using {cover}.",
  "settings.cover.motionNote": "Off keeps the picture still. It also goes still by itself on phones that cannot keep up.",

  // Bible Buddy (the character)
  "settings.buddy.title": "Bible Buddy",
  "settings.buddy.description": "Pick the Buddy that shows across your dashboard, menu, popups, games and study areas.",
  "settings.buddy.previousAria": "Previous Bible Buddy",
  "settings.buddy.nextAria": "Next Bible Buddy",
  "settings.buddy.showAria": "Show {name}",
  "settings.buddy.current": "Current Buddy",
  "settings.buddy.select": "Select Buddy",
  "settings.buddy.removing": "Removing...",
  "settings.buddy.delete": "Delete",
  "settings.buddy.none": "No Bible Buddies are available yet.",
  "settings.buddy.updated": "Bible Buddy updated.",
  "settings.buddy.updateFailed": "Could not update Bible Buddy.",
  "settings.buddy.removeConfirm": "Remove {item} from your account?",
  "settings.buddy.removed": "{item} removed.",
  "settings.buddy.removeFailed": "Could not remove that item.",

  // Display mode and streak flame
  "settings.display.updated": "Display mode updated.",
  "settings.display.updateFailed": "Could not update display mode.",
  "settings.flame.updated": "Streak flame updated.",
  "settings.flame.updateFailed": "Could not update streak flame.",

  // Profile
  "settings.profile.title": "Profile",
  "settings.profile.description": "Your name and email address.",
  "settings.profile.firstName": "First Name",
  "settings.profile.firstNamePlaceholder": "Your first name",
  "settings.profile.lastName": "Last Name",
  "settings.profile.lastNamePlaceholder": "Your last name",
  "settings.profile.email": "Email Address",
  "settings.profile.emailPlaceholder": "your@email.com",
  "settings.profile.save": "Save Changes",
  "settings.profile.nameRequired": "Please enter your first and last name.",
  "settings.profile.updated": "Profile updated successfully!",

  // Password
  "settings.password.title": "Password",
  "settings.password.description": "Send yourself a link to set a new one.",
  "settings.password.body": "Reset your password by email. We'll send you a link to create a new password.",
  "settings.password.sent": "Password reset email sent! Please check your inbox.",
  "settings.password.sending": "Sending...",
  "settings.password.reset": "Reset Password",

  // Reading plan
  "settings.readingPlan.title": "Reading Plan",
  "settings.readingPlan.description": "Reset your Bible reading progress back to the beginning.",
  "settings.readingPlan.resetButton": "Reset Bible Reading Plan",
  "settings.readingPlan.warningTitle": "⚠️ Warning",
  "settings.readingPlan.warningBody": "This will reset your reading progress, levels, and stats back to 0. This cannot be undone.",
  "settings.readingPlan.resetting": "Resetting...",
  "settings.readingPlan.confirm": "Yes, Reset",
  "settings.readingPlan.done": "Reading plan has been reset. Your progress is now at 0.",

  // Account
  "settings.account.title": "Account",
  "settings.account.description": "Your user ID and when you joined.",
  "settings.account.userId": "User ID",
  "settings.account.notAvailable": "N/A",
  "settings.account.joined": "Joined",
  "settings.account.logout": "Logout",

  // Help
  "settings.help.title": "Help",
  "settings.help.description": "Replay the dashboard walkthrough whenever you want a refresher.",
  "settings.help.replay": "Replay Dashboard Walkthrough",

  // Delete account
  "settings.delete.title": "Delete my account",
  "settings.delete.description": "Permanently remove your account and all of your data.",
  "settings.delete.done": "You are signed out and your account can no longer be used. Everything in it will be permanently deleted in 30 days, and we have emailed you the date. If you change your mind before then, just sign in again and it all carries on as it was.",
  "settings.delete.intro": "Delete your Bible Buddy account and everything tied to it: your profile, progress, notes, highlights, bookmarks, posts, comments, messages, and chats with Little Louis. You are signed out straight away and it is all permanently deleted 30 days later.",
  "settings.delete.warningTitle": "You have 30 days to change your mind",
  "settings.delete.warningBody": "You will be signed out everywhere immediately and your account stops working. Your progress and everything you have posted is then permanently deleted 30 days from now, and after that it cannot be recovered. Sign in again before then to cancel.",
  // {word} is the word to type; it is shown in bold and stays DELETE.
  "settings.delete.typeToConfirm": "Type {word} below to confirm.",
  "settings.delete.placeholder": "Type DELETE",
  "settings.delete.typeError": "Type DELETE to confirm.",
  "settings.delete.signInAgain": "Please sign in again, then try deleting your account.",
  "settings.delete.failed": "We couldn't delete your account. Please try again.",
  "settings.delete.deleting": "Deleting...",
  "settings.delete.confirm": "Permanently delete",

  // Footer links
  "settings.legal.privacy": "Privacy Policy",
  "settings.legal.terms": "Terms of Service",
  "settings.legal.guidelines": "Community Guidelines",
} as const;
