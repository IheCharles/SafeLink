import { useRef, useState } from "react";

interface Props {
  file: File | null;
  onChange: (file: File) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepIdPhoto({ file, onChange, onNext, onBack }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    file ? URL.createObjectURL(file) : null,
  );

  function handleFile(f: File) {
    onChange(f);
    setPreview(URL.createObjectURL(f));
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Government-Issued ID</h2>
      <p className="mt-1 text-sm text-gray-500">
        Upload a clear photo of the front of your government-issued ID (driver's
        license, passport, etc.). This is used to verify your identity and will
        not appear on your verification link. Upload a clear photo of the front
        of your government-issued ID (driver's license, passport, etc.). This is
        used to verify your identity and will not appear on your verification
        link.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-400 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-48 rounded-lg"
          />
        ) : (
          <span className="text-gray-500">Click to select a photo</span>
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
