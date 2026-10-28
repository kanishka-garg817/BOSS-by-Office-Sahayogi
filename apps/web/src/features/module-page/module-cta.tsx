import { bookDemoAction } from "@/config/navigation";

type ModuleCtaProps = { title: string; text: string };

/** The closing call to action at the bottom of a module page. */
export const ModuleCta = ({ title, text }: ModuleCtaProps) => (
  <section aria-labelledby="module-cta-heading" className="relative py-14 sm:py-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="relative reveal-on-scroll overflow-hidden rounded-3xl bg-linear-to-br from-brand-blue to-brand-navy px-6 py-14 text-center text-white shadow-xl shadow-brand-blue/20 sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-white/15 blur-3xl"
        />
        <h2
          id="module-cta-heading"
          className="relative text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          {title}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-base text-pretty text-white/80">{text}</p>
        <div className="relative mt-8">
          <a
            href={bookDemoAction.href}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-brand-blue shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {bookDemoAction.label}
          </a>
        </div>
      </div>
    </div>
  </section>
);
