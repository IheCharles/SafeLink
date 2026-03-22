import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uploadFile } from "../lib/storage";
import { createSubmission } from "../lib/firestore";
import type { SubmissionFormData, VerificationType } from "../types";
import StepEmail from "../components/submission/StepEmail";
import StepPhoto from "../components/submission/StepPhoto";
import StepEvidence from "../components/submission/StepEvidence";
import StepReview from "../components/submission/StepReview";

const TOTAL_STEPS = 4;

export default function Submit() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SubmissionFormData>({
    email: "",
    photo: null,
    photoLink: "",
    verificationType: "lab_report",
    evidence: null,
  });

  function update<K extends keyof SubmissionFormData>(
    key: K,
    value: SubmissionFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!formData.evidence) return;
    if (!formData.photo && !formData.photoLink) return;

    setSubmitting(true);
    setError(null);

    try {
      const submissionId = doc(collection(db, "submissions")).id;

      let photoUrl: string;
      if (formData.photoLink) {
        photoUrl = formData.photoLink;
      } else {
        photoUrl = await uploadFile(submissionId, "photo", formData.photo!);
      }

      const evidenceUrl = await uploadFile(
        submissionId,
        "evidence",
        formData.evidence,
      );

      const subId = await createSubmission(submissionId, {
        email: formData.email,
        photoUrl,
        verificationType: formData.verificationType,
        evidenceUrl,
      });

      navigate(`/${subId}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const stepLabels = ["Email", "Photo", "Evidence", "Review"];

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-8">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-brand-600" : "bg-gray-200"
              }`}
            />
            <span
              className={`block mt-1 text-[10px] text-center ${
                i === step ? "text-brand-600 font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {step === 0 && (
        <StepEmail
          email={formData.email}
          onChange={(v) => update("email", v)}
          onNext={next}
        />
      )}
      {step === 1 && (
        <StepPhoto
          file={formData.photo}
          photoLink={formData.photoLink}
          onFileChange={(f) => update("photo", f)}
          onLinkChange={(v) => update("photoLink", v)}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 2 && (
        <StepEvidence
          verificationType={formData.verificationType}
          file={formData.evidence}
          onTypeChange={(t: VerificationType) => update("verificationType", t)}
          onFileChange={(f) => update("evidence", f)}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 3 && (
        <StepReview
          data={formData}
          submitting={submitting}
          onSubmit={handleSubmit}
          onBack={back}
        />
      )}
    </div>
  );
}
