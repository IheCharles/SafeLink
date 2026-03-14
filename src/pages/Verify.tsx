import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicLink } from "../lib/firestore";
import type { PublicLink } from "../types";
import TierBadge from "../components/verification/TierBadge";
import ResultCard from "../components/verification/ResultCard";

type State =
  | { kind: "loading" }
  | { kind: "not-found" }
  | { kind: "expired" }
  | { kind: "ready"; link: PublicLink };

export default function Verify() {
  const { linkId } = useParams<{ linkId: string }>();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!linkId) {
      setState({ kind: "not-found" });
      return;
    }

    getPublicLink(linkId).then((link) => {
      if (!link) {
        setState({ kind: "not-found" });
      } else if (!link.active || link.expiresAt < Date.now()) {
        setState({ kind: "expired" });
      } else {
        setState({ kind: "ready", link });
      }
    });
  }, [linkId]);

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
        <h1 className="text-2xl font-bold text-gray-900">Link Not Found</h1>
        <p className="mt-2 text-gray-500">
          This verification link doesn't exist. Please check the URL.
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

  if (state.kind === "expired") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <div className="text-5xl">⏱</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Link Expired</h1>
        <p className="mt-2 text-gray-500">
          This verification link has expired. The owner can request a new one.
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

  const { link } = state;
  const clear = link.overallClear;

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
              src={link.idPhotoUrl}
              alt="Verified person"
              className={`w-28 h-28 rounded-full object-cover ring-4 ${ringColor}`}
            />
          </div>

          {/* Tier badge */}
          <div className="flex justify-center">
            <TierBadge type={link.verificationType} />
          </div>

          {/* Results */}
          <div className="space-y-2">
            {link.results.map((r) => (
              <ResultCard key={r.testName} result={r} clear={clear} />
            ))}
          </div>

          {/* Meta */}
          <div className="text-xs text-gray-400 text-center space-y-1">
            <p>
              Verified on{" "}
              {new Date(link.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              Expires{" "}
              {new Date(link.expiresAt).toLocaleDateString("en-US", {
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
