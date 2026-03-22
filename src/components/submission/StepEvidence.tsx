import { useRef, useState } from "react";
import type { VerificationType } from "../../types";

interface Props {
  verificationType: VerificationType;
  file: File | null;
  onTypeChange: (t: VerificationType) => void;
  onFileChange: (f: File) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepEvidence({
  verificationType,
  file,
  onTypeChange,
  onFileChange,
  onNext,
  onBack,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(file?.name ?? "");

  const acceptMap: Record<VerificationType, string> = {
    lab_report: "image/*,.pdf",
    video: "video/*",
  };

  function handleFile(f: File) {
    onFileChange(f);
    setFileName(f.name);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">STD Test Evidence</h2>
      <p className="mt-1 text-sm text-gray-500">
        Choose how you want to prove your results, then upload the file.
      </p>

      {/* Type selector */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onTypeChange("lab_report")}
          className={`border-2 rounded-lg p-4 text-left transition ${
            verificationType === "lab_report"
              ? "border-brand-600 bg-brand-50"
              : "border-gray-300 hover:border-brand-300"
          }`}
        >
          <span className="block font-semibold text-gray-900">Lab Report</span>
          <span className="text-xs text-gray-500">
            PDF or photo of official lab results
          </span>
          <span className="mt-1 block text-xs font-bold text-brand-600">
            ✓✓ Highest trust
          </span>
        </button>
        <button
          type="button"
          onClick={() => onTypeChange("video")}
          className={`border-2 rounded-lg p-4 text-left transition ${
            verificationType === "video"
              ? "border-brand-600 bg-brand-50"
              : "border-gray-300 hover:border-brand-300"
          }`}
        >
          <span className="block font-semibold text-gray-900">Video</span>
          <span className="text-xs text-gray-500">
            Screen recording of your health portal
          </span>
          <span className="mt-1 block text-xs text-gray-400">✓ Standard</span>
        </button>
      </div>

      {/* File upload */}
      <input
        key={verificationType}
        ref={inputRef}
        type="file"
        accept={acceptMap[verificationType]}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition"
      >
        {fileName ? (
          <span className="text-gray-800 font-medium">{fileName}</span>
        ) : (
          <span className="text-gray-500">
            Click to upload{" "}
            {verificationType === "lab_report" ? "lab report" : "video"}
          </span>
        )}
      </button>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          disabled={!file}
          onClick={onNext}
          className="flex-1 bg-brand-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 hover:bg-brand-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
