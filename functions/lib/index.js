"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSubmissionApproved = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const nanoid_1 = require("nanoid");
admin.initializeApp();
const db = admin.firestore();
/**
 * Triggered when a submission document is updated.
 * When status changes to "approved", creates a public link and queues an email.
 */
exports.onSubmissionApproved = functions.firestore
    .document("submissions/{submissionId}")
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    // Only proceed when status just changed to "approved"
    if (before.status === "approved" || after.status !== "approved") {
        return null;
    }
    const submissionId = context.params.submissionId;
    const linkId = (0, nanoid_1.nanoid)(12);
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
    const baseUrl = functions.config().app?.url ??
        `https://${process.env.GCLOUD_PROJECT}.web.app`;
    const verifyUrl = `${baseUrl}/v/${linkId}`;
    const clear = after.overallClear === true;
    const tierLabel = after.verificationType === "lab_report"
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
    functions.logger.info(`Created link ${linkId} for submission ${submissionId}`);
    return null;
});
//# sourceMappingURL=index.js.map