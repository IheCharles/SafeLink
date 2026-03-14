import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-brand-600"
        >
          <img src="/safelink.svg" alt="" className="w-8 h-8" />
          SafeLink
        </Link>
        <Link
          to="/submit"
          className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition"
        >
          Get Verified
        </Link>
      </div>
    </header>
  );
}
