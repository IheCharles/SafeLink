import { useRef, useState } from "react";

interface Props {
  file: File | null;
  photoLink: string;
  onFileChange: (file: File) => void;
  onLinkChange: (url: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPhoto({
  file,
  photoLink,
  onFileChange,
  onLinkChange,
  onNext,
  onBack,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "link">(
    photoLink ? "link" : "upload",
  );
  const [preview, setPreview] = useState<string | null>(
    file ? URL.createObjectURL(file) : null,
  );

  function handleFile(f: File) {
    onFileChange(f);
    setPreview(URL.createObjectURL(f));
  }

  const canContinue =
    mode === "upload" ? !!file : photoLink.trim().length > 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Your Photo</h2>
      <p className="mt-1 text-sm text-gray-500">
        This will be shown on your verification page so others can confirm your
        identity. Upload a photo or provide a link to your social media profile.
      </p>

      {/* Mode toggle */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`border-2 rounded-lg p-3 text-center transition ${
            mode === "upload"
              ? "border-brand-600 bg-brand-50"
              : "border-gray-300 hover:border-brand-300"
          }`}
        >
          <span className="block font-semibold text-gray-900">Upload</span>
          <span className="text-xs text-gray-500">Choose a file</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("link")}
          className={`border-2 rounded-lg p-3 text-center transition ${
            mode === "link"
              ? "border-brand-600 bg-brand-50"
              : "border-gray-300 hover:border-brand-300"
          }`}
        >
          <span className="block font-semibold text-gray-900">Link</span>
          <span className="text-xs text-gray-500">Social media or image URL</span>
        </button>
      </div>

      {mode === "upload" ? (
        <>
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
        </>
      ) : (
        <>
          <input
            type="url"
            placeholder="https://instagram.com/yourprofile"
            value={photoLink}
            onChange={(e) => onLinkChange(e.target.value)}
            className="mt-4 w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none transition"
          />
          <p className="mt-2 text-xs text-gray-400">
            You can link to Instagram, Twitter/X, Facebook, or any public profile.
          </p>
        </>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          disabled={!canContinue}
          onClick={onNext}
          className="flex-1 bg-brand-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 hover:bg-brand-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
