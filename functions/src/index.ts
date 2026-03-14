import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { nanoid } from "nanoid";

admin.initializeApp();
const db = admin.firestore();

/**
 * Triggered when a submission document is updated.
 * When status changes to "approved", creates a public link and queues an email.
 */
export const onSubmissionApproved = functions.firestore
  .document("submissions/{submissionId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only proceed when status just changed to "approved"
    if (before.status === "approved" || after.status !== "approved") {
      return null;
    }

    const submissionId = context.params.submissionId;
    const linkId = nanoid(12);

    // All links expire after 90 days (3 months)
    const EXPIRY_DAYS = 90;
    const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + expiryMs;

    // Write public link document
    await db
      .collection("links")
      .doc(linkId)
      .set({
        id: linkId,
        submissionId,
        idPhotoUrl: after.idPhotoUrl,
        verificationType: after.verificationType,
        results: after.results ?? [],
        overallClear: after.overallClear ?? false,
        expiresAt,
        active: true,
        createdAt: Date.now(),
      });

    // Determine the base URL from function config or default
    const baseUrl =
      functions.config().app?.url ??
      `https://${process.env.GCLOUD_PROJECT}.web.app`;

    const verifyUrl = `${baseUrl}/v/${linkId}`;
    const clear = after.overallClear === true;
    const tierLabel =
      after.verificationType === "lab_report"
        ? "Lab Verified ✓✓"
        : "Self-Recorded ✓";

    // Queue email via Trigger Email extension
    await db.collection("mail").add({
      to: after.email,
      message: {
        subject: `Your SafeLink Verification is Ready${clear ? " — All Clear ✓" : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#0c8eeb;">SafeLink</h2>
            <p>Your STD results have been verified.</p>
            <p><strong>Status:</strong> ${clear ? "✅ All Clear" : "⚠️ Review Required"}</p>
            <p><strong>Verification Tier:</strong> ${tierLabel}</p>
            <p><strong>Expires:</strong> ${new Date(expiresAt).toLocaleDateString()}</p>
            <a href="${verifyUrl}"
               style="display:inline-block;margin-top:16px;padding:12px 24px;background:${clear ? "#16a34a" : "#dc2626"};color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
              View Your Verification Link
            </a>
            <p style="margin-top:24px;font-size:12px;color:#999;">
              Share the link above with anyone who needs to see your results.
            </p>
          </div>
        `,
      },
    });

    // Update original submission with generated linkId
    await change.after.ref.update({ linkId, updatedAt: Date.now() });

    functions.logger.info(
      `Created link ${linkId} for submission ${submissionId}`,
    );
    return null;
  });
