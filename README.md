# SafeLink — Verified STD Results Sharing

Upload your STD test results, get them verified, and share a color-coded link.

## Quick Start

```bash
# Install frontend dependencies
npm install

# Install Cloud Function dependencies
cd functions && npm install && cd ..

# Start dev server
npm run dev
```

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore**, **Storage**, and **Cloud Functions** (requires Blaze plan for functions)
3. Copy your web app config into `.env`:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
4. Update `.firebaserc` with your project ID
5. Install the **Trigger Email from Firestore** extension in Firebase Console and configure it with an SMTP provider (e.g., SendGrid free tier). Set the collection to `mail`.

## Deploy

```bash
npm run build
firebase deploy
```

## Admin Review Workflow

There is no admin dashboard in this MVP. You review submissions directly in the Firebase Console:

1. Open **Firebase Console → Firestore → `submissions`**
2. Filter by `status == "pending"`
3. Click a submission document. Open `idPhotoUrl` and `evidenceUrl` in new tabs to review the uploaded files.
4. If approved, edit the document:
   - Set `status` → `"approved"`
   - Set `overallClear` → `true` (if all tests negative) or `false`
   - Add `results` array, e.g.:
     ```json
     [
       { "testName": "HIV", "result": "negative" },
       { "testName": "Chlamydia", "result": "negative" },
       { "testName": "Gonorrhea", "result": "negative" },
       { "testName": "Syphilis", "result": "negative" }
     ]
     ```
5. Save. The **`onSubmissionApproved`** Cloud Function will automatically:
   - Create a public link in the `links` collection
   - Queue an email to the user with their verification URL
   - Update the submission with the `linkId`

If rejecting, set `status` → `"rejected"`. No link or email is generated.

## Verification Tiers

| Type       | Badge               | Trust Level                                  |
| ---------- | ------------------- | -------------------------------------------- |
| Lab Report | **Lab Verified ✓✓** | Highest — official lab document reviewed     |
| Video      | Self-Recorded ✓     | Standard — user recorded their health portal |

The tier badge is prominently displayed on every verification link page so viewers clearly understand the source.

## Link Behavior

- **Green theme**: all results negative (`overallClear: true`)
- **Red theme**: one or more positive results (`overallClear: false`)
- Links expire after the user's chosen period (30, 60, or 90 days)
- Expired links show a clear "Link Expired" message

## Project Structure

```
src/
  components/
    layout/        — Header, Footer, Layout
    submission/    — StepEmail, StepIdPhoto, StepEvidence, StepExpiry, StepReview
    verification/  — TierBadge, ResultCard
  pages/           — Landing, Submit, Submitted, Verify
  lib/             — firebase.ts, storage.ts, firestore.ts
  types/           — TypeScript interfaces
functions/src/     — Cloud Function (onSubmissionApproved)
```
