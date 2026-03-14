import type { SubmissionFormData } from "../../types";

interface Props {
  data: SubmissionFormData;
  submitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export default function StepReview({
  data,
  submitting,
  onSubmit,
  onBack,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Review &amp; Submit</h2>
      <p className="mt-1 text-sm text-gray-500">
        Please confirm everything looks correct before submitting.
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <Row label="Email" value={data.email} />
        <Row label="ID Photo" value={data.idPhoto?.name ?? "—"} />
        <Row
          label="Evidence Type"
          value={
            data.verificationType === "lab_report" ? "Lab Report ✓✓" : "Video ✓"
          }
        />
        <Row label="Evidence File" value={data.evidence?.name ?? "—"} />
        <Row label="Link Expiry" value={`${data.expiryDays} days`} />
      </div>

      {/* Consent */}
      <p className="mt-6 text-xs text-gray-400">
        By submitting, you consent to SafeLink storing your uploaded files and
        personal information for the purpose of identity and health-result
        verification. Your data will be handled in accordance with our privacy
        policy.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium text-right max-w-[60%] truncate">
        {value}
      </span>
    </div>
  );
}
