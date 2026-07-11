// Work history included per the owner's instruction. Exact titles/dates are
// intentionally omitted rather than guessed — add them when confirmed.
const FACTS = [
  { k: "Based in", v: "London, UK" },
  { k: "Education", v: "MSc Software Engineering" },
  { k: "Previously", v: "Pagoda Labs · We Media" },
  { k: "Focus", v: "AI-forward product engineering" },
];

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="label mb-3">03 — About</p>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Full-stack engineer, London.
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-graphite">
            <p>
              I build complete products end to end — the API, the database, the
              frontend, and the deploy. I care most about the parts that decide
              whether software actually works in production: data modelling,
              background jobs, auth, and clear failure modes.
            </p>
            <p>
              I&apos;ve worked at Pagoda Labs and We Media and hold an MSc in
              Software Engineering. My current focus is AI-forward products —
              building with FastAPI, React/Next.js and the Claude API.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-surface px-5 py-4">
              <dt className="label mb-1">{f.k}</dt>
              <dd className="font-display text-[15px] font-medium text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
