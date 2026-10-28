import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  /** Headings sit in the middle unless the section lays them out beside a visual. */
  align?: "center" | "left";
};

export const SectionHeading = ({
  id,
  eyebrow,
  title,
  text,
  align = "center",
}: SectionHeadingProps) => (
  <div className={`max-w-2xl reveal-on-scroll ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <h2
      id={id}
      className={`${eyebrow ? "mt-4" : ""} text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl`}
    >
      {title}
    </h2>
    {text ? <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">{text}</p> : null}
  </div>
);
