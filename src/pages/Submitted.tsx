import { Link } from "react-router-dom";

export default function Submitted() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Submission Received!
      </h1>
      <p className="mt-3 text-gray-600">
        We've received your results and ID. Our team will review your submission
        and email you a verification link once approved.
      </p>
      <p className="mt-2 text-sm text-gray-400">
        This usually takes less than 24 hours.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
