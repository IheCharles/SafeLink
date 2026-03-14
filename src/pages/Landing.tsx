import { Link } from "react-router-dom";

const steps = [
  {
    num: "1",
    title: "Upload Your Proof",
    desc: "Provide your email, a photo of yourself, your ID, and your STD test results — either a lab report or a screen-recorded video of your health portal.",
  },
  {
    num: "2",
    title: "We Review It",
    desc: "Our team verifies your submission and enters your results. Lab reports receive the highest trust tier.",
  },
  {
    num: "3",
    title: "Share Your Link",
    desc: "You receive a unique, color-coded verification link by email. Green means all clear — share it with confidence.",
  },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Verify Your Sexual Health.
            <br />
            Share It Safely.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-brand-100 max-w-2xl mx-auto">
            SafeLink lets you upload your STD results once, get them verified,
            and share a simple color-coded link with anyone who needs to see
            them.
          </p>
          <Link
            to="/submit"
            className="mt-8 inline-block bg-white text-brand-700 font-semibold px-8 py-3 rounded-full text-lg hover:bg-brand-50 transition"
          >
            Get Verified Now
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          How It Works
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-2xl font-bold">
                {s.num}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust tiers */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Verification Tiers
          </h2>
          <p className="mt-2 text-center text-gray-500 max-w-xl mx-auto">
            Not all proof is created equal. We make the source of your results
            clear on every link.
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border-2 border-brand-600 rounded-xl p-6">
              <span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold uppercase px-3 py-1 rounded-full">
                Highest Trust
              </span>
              <h3 className="mt-3 text-xl font-bold text-gray-900">
                Lab Report ✓✓
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                You upload a PDF or photo of an official lab report. This is
                reviewed and marked with a prominent "Lab Verified" badge.
              </p>
            </div>
            <div className="border border-gray-300 rounded-xl p-6">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase px-3 py-1 rounded-full">
                Standard
              </span>
              <h3 className="mt-3 text-xl font-bold text-gray-900">
                Self-Recorded Video ✓
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                You upload a video of yourself logging into your healthcare
                portal and showing your results. Marked with a "Self-Recorded"
                badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Verified?</h2>
          <p className="mt-2 text-brand-100">
            It only takes a few minutes. Your link will be ready after review.
          </p>
          <Link
            to="/submit"
            className="mt-6 inline-block bg-white text-brand-700 font-semibold px-8 py-3 rounded-full text-lg hover:bg-brand-50 transition"
          >
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
}
