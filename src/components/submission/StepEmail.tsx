interface Props {
  email: string;
  onChange: (email: string) => void;
  onNext: () => void;
}

export default function StepEmail({ email, onChange, onNext }: Props) {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Your Email</h2>
      <p className="mt-1 text-sm text-gray-500">
        We'll send your verification link to this address.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
      />
      <button
        disabled={!valid}
        onClick={onNext}
        className="mt-6 w-full bg-brand-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 hover:bg-brand-700 transition"
      >
        Continue
      </button>
    </div>
  );
}
