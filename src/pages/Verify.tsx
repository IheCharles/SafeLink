import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubmission } from "../lib/firestore";
import type { Submission } from "../types";
import TierBadge from "../components/verification/TierBadge";
import ResultCard from "../components/verification/ResultCard";

type State =
  | { kind: "loading" }
  | { kind: "not-found" }
  | { kind: "pending" }
  | { kind: "rejected" }
  | { kind: "approved"; submission: Submission };

export default function Verify() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!submissionId) {
      setState({ kind: "not-found" });
      return;
    }

    getSubmission(submissionId).then((sub) => {
      if (!sub) {
        setState({ kind: "not-found" });
      } else if (sub.status === "rejected") {
        setState({ kind: "rejected" });
      } else if (sub.status === "pending") {
        setState({ kind: "pending" });
      } else {
        setState({ kind: "approved", submission: sub });
      }
    });
  }, [submissionId]);

  if (state.kind === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 text-lg">Loading…</div>
      </div>
    );
  }

  if (state.kind === "not-found") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Not Found</h1>
        <p className="mt-2 text-gray-500">
          This link doesn't exist. Please check the URL.
        </p>
        <Link
          to="/"
          className="mt-6 text-brand-600 font-medium hover:underline"
        >
          Go to SafeLink
        </Link>
      </div>
    );
  }

  if (state.kind === "pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-4 text-center">
        <div className="text-5xl">⏳</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Under Review</h1>
        <p className="mt-2 text-gray-600 max-w-sm">
          Your submission is being reviewed. We'll email you once it's been
          verified. This usually takes less than 24 hours.
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Bookmark this page to check back anytime.
        </p>
        <Link
          to="/"
          className="mt-6 text-brand-600 font-medium hover:underline"
        >
          Go to SafeLink
        </Link>
      </div>
    );
  }

  if (state.kind === "rejected") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
        <div className="text-5xl">✕</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Verification Denied
        </h1>
        <p className="mt-2 text-gray-600 max-w-sm">
          We were unable to verify your submission. You can submit again with
          clearer documentation.
        </p>
        <Link
          to="/submit"
          className="mt-6 inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          Try Again
        </Link>
      </div>
    );
  }

  // Approved — show color-coded results
  const { submission } = state;
  const clear = submission.overallClear;

  const bg = clear ? "bg-green-50" : "bg-red-50";
  const border = clear ? "border-green-300" : "border-red-300";
  const ringColor = clear ? "ring-green-400" : "ring-red-400";

  return (
    <div className={`min-h-screen ${bg} flex flex-col items-center py-12 px-4`}>
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg border ${border} overflow-hidden`}
      >
        {/* Header band */}
        <div
          className={`py-4 px-6 text-center ${
            clear ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          <h1 className="text-lg font-bold">
            {clear ? "✓ All Clear" : "⚠ Attention Required"}
          </h1>
          <p className="text-sm opacity-80">SafeLink Verified Results</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Photo */}
          <div className="flex justify-center">
            <img
              src={submission.profilePhotoUrl}
              alt="Verified person"
              className={`w-28 h-28 rounded-full object-cover ring-4 ${ringColor}`}
            />
          </div>

          {/* Tier badge */}
          <div className="flex justify-center">
            <TierBadge type={submission.verificationType} />
          </div>

          {/* Results */}
          <div className="space-y-2">
            {submission.results.map((r) => (
              <ResultCard key={r.testName} result={r} clear={clear} />
            ))}
          </div>

          {/* Meta */}
          <div className="text-xs text-gray-400 text-center space-y-1">
            <p>
              Verified on{" "}
              {new Date(submission.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Branding */}
      <p className="mt-8 text-sm text-gray-400">
        Powered by{" "}
        <Link to="/" className="text-brand-600 font-medium hover:underline">
          SafeLink
        </Link>
      </p>
    </div>
  );
}
