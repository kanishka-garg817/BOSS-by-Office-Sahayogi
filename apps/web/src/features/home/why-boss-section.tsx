import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { helps, reasons, type Point } from "@/config/why-boss-points";

const PointCard = ({ point }: { point: Point }) => (
  <article className="h-full rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/10">
    <span
      aria-hidden="true"
      className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand-blue"
    >
      <point.icon className="size-6" />
    </span>
    <h4 className="mt-4 text-base font-bold text-ink">{point.title}</h4>
    <p className="mt-1.5 text-sm text-pretty text-ink/70">{point.detail}</p>
  </article>
);

export const WhyBossSection = () => (
  <section
    id="why-boss"
    aria-labelledby="why-boss-heading"
    className="relative scroll-mt-20 py-14 sm:py-20"
  >
    <SectionBackdrop tone="blue" />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Why BoSS</Eyebrow>
        <h2
          id="why-boss-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          One system that makes running your business easier
        </h2>
        <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">
          Here is why businesses need BoSS, and how it helps day to day.
        </p>
      </div>

      <div className="mt-12 space-y-14">
        <div>
          <h3 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
            Why you need BoSS
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((point) => (
              <li key={point.id}>
                <PointCard point={point} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
            How BoSS helps you
          </h3>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {helps.map((point) => (
              <li key={point.id}>
                <PointCard point={point} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
