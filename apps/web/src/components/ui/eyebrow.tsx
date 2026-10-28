type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/** The small label above a section heading, e.g. "The Problem". */
export const Eyebrow = ({ children, className = "" }: EyebrowProps) => (
  <p
    className={`inline-block rounded-full border border-brand-blue/20 bg-surface px-4 py-1.5 text-sm font-semibold text-brand-blue ${className}`.trim()}
  >
    {children}
  </p>
);
