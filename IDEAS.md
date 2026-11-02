# Ideas from bug reports


- Let people attach a photo when replying/commenting in a group discussion or lesson response - several readers have asked, most recently a reader who wanted to add a pic to a lesson reply but couldn't (bug 6a14d918-fded-4162-a761-8f70098a7d01, Vickie James, Oct 19 2026).

## Handled

- ~~Let someone finishing the "complete your account" screen switch to logging in instead, when the email they type already belongs to an account~~ - **done 2026-10-26.** `components/AccountRequiredModal.tsx` now recognises an "already registered" error and offers "Sign in to that account", "Use a different email", or asking Louis to move it. (bug 539029a2-50e7-4742-8cfc-77de5a470fe0, Anthony Elem, Oct 21 2026.)
