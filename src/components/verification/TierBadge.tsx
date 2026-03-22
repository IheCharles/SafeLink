import type { VerificationType } from "../../types";

interface Props {
  type: VerificationType;
}

export default function TierBadge({ type }: Props) {
  if (type === "lab_report") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-300">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Lab Verified ✓✓
      </span>
    );
  }

  const label = type === "link" ? "Link Verified ✓" : "Self-Recorded ✓";

  return (
    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {label}
      <span className="text-[10px] text-gray-400 ml-1">(lower confidence)</span>
    </span>
  );
}
