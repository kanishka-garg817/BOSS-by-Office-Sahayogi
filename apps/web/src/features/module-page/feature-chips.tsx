type FeatureChipsProps = { label: string; features: readonly string[] };

/** A wrapped row of small labels naming what a section covers. */
export const FeatureChips = ({ label, features }: FeatureChipsProps) => (
  <ul aria-label={label} className="flex flex-wrap gap-2">
    {features.map((feature) => (
      <li
        key={feature}
        className="rounded-full border border-ink/10 bg-surface px-3 py-1 text-xs font-semibold text-ink/80"
      >
        {feature}
      </li>
    ))}
  </ul>
);
