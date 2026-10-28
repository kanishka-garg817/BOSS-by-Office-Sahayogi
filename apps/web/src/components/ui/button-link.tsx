import type { NavItem } from "@/config/navigation";

type ButtonLinkVariant = "primary" | "secondary";
type ButtonLinkSize = "md" | "lg";

type ButtonLinkProps = {
  action: NavItem;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  className?: string;
  /** Appends a decorative arrow after the label. */
  withArrow?: boolean;
  onClick?: () => void;
};

const baseClass =
  "inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const variantClass = {
  primary: "bg-brand-blue text-white hover:brightness-90",
  secondary: "bg-brand-tint text-ink hover:bg-brand-light/50",
} as const satisfies Record<ButtonLinkVariant, string>;

const sizeClass = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
} as const satisfies Record<ButtonLinkSize, string>;

/** A link styled as a button. Plain `<a>` until the target routes exist (typed routes). */
export const ButtonLink = ({
  action,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
  onClick,
}: ButtonLinkProps) => (
  <a
    href={action.href}
    onClick={onClick}
    className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
  >
    {action.label}
    {withArrow ? (
      <span aria-hidden="true" className="ml-2">
        →
      </span>
    ) : null}
  </a>
);
