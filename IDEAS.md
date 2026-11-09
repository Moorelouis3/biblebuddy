# Ideas from bug reports


- Let people attach a photo when replying/commenting in a group discussion or lesson response - several readers have asked, most recently a reader who wanted to add a pic to a lesson reply but couldn't (bug 6a14d918-fded-4162-a761-8f70098a7d01, Vickie James, Oct 19 2026).

- After finishing a trivia quiz, let the reader see which specific questions they got wrong, not just the final score - requested by a reader who thought her score didn't match how many she missed (bug 78e46f2c-064f-47f0-b5c9-8820ad28f8eb, Maleeka, Nov 4 2026).

- On a locked devotional day, make it clearer why it's locked and what unlocks it - two different readers on the same study (The Tempting of Jesus) got stuck within a few days of each other because closing the reading screen the "wrong" way (phone back button/swipe instead of its own close button) doesn't save anything, with no message telling them that. A small on-screen hint on a locked day ("finish and close the reading for the day before to unlock this one") would likely stop these before they turn into bug reports. (bugs 837774e3-5d4f-4353-9eef-9adfc1cda76e Vickie James and b7c8b844-a5e2-403d-9163-64cfc11e6ade Anthony Elem, Nov 2026.)

- Add a way to turn the background music off (or turn the volume down) on Bible in a Year lesson days - a reader found it distracting while reading (bug 6b54195c-d4f1-4bc4-a836-fbd6a4c01b6b, Stefani Tupamahu, Nov 9 2026).

## Handled

- ~~Let someone finishing the "complete your account" screen switch to logging in instead, when the email they type already belongs to an account~~ - **done 2026-10-26.** `components/AccountRequiredModal.tsx` now recognises an "already registered" error and offers "Sign in to that account", "Use a different email", or asking Louis to move it. (bug 539029a2-50e7-4742-8cfc-77de5a470fe0, Anthony Elem, Oct 21 2026.)
