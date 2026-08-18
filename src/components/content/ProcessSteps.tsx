export type ProcessStep = { title: string; description: string };

export function ProcessSteps({ steps, onDark = false }: { steps: ProcessStep[]; onDark?: boolean }) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-md border border-border bg-white p-6 shadow-sm">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full text-step-number font-heading ${
              onDark ? "bg-gold-500 text-ink-950" : "bg-ink-950 text-gold-300"
            }`}
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-card-h3-mobile lg:text-card-h3-desktop text-ink-950">{step.title}</h3>
          <p className="mt-2 text-small text-text-secondary">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
