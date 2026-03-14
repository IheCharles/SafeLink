import type { ExpiryDays } from "../../types";

interface Props {
  expiryDays: ExpiryDays;
  onChange: (d: ExpiryDays) => void;
  onNext: () => void;
  onBack: () => void;
}

const options: { value: ExpiryDays; label: string }[] = [
  { value: 30, label: "30 days" },
  { value: 60, label: "60 days" },
  { value: 90, label: "90 days" },
];

export default function StepExpiry({
  expiryDays,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Link Expiry</h2>
      <p className="mt-1 text-sm text-gray-500">
        How long should your verification link stay active?
      </p>

      <div className="mt-4 space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 border-2 rounded-lg p-4 cursor-pointer transition ${
              expiryDays === opt.value
                ? "border-brand-600 bg-brand-50"
                : "border-gray-300 hover:border-brand-300"
            }`}
          >
            <input
              type="radio"
              name="expiry"
              value={opt.value}
              checked={expiryDays === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-brand-600"
            />
            <span className="font-medium text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
