import { useRef, useState } from "react";

interface Props {
  file: File | null;
  onChange: (file: File) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepProfilePhoto({
  file,
  onChange,
  onNext,
  onBack,
}: Props) {
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
      <h2 className="text-xl font-bold text-gray-900">Profile Photo</h2>
      <p className="mt-1 text-sm text-gray-500">
        Upload a clear photo of your face. This will be displayed on your
        verification link so others can confirm it's you.
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
            className="mx-auto w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Click to upload a face photo</span>
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
