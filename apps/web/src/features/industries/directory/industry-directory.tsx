import Image from "next/image";
import Link from "next/link";

import { directoryIndustries, type DirectoryIndustry } from "./industries-data";

const cardClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-sm";

const CardBody = ({ industry }: { industry: DirectoryIndustry }) => (
  <>
    <div className="relative aspect-3/2 overflow-hidden">
      <Image
        src={industry.photo}
        alt={industry.photoAlt}
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 290px, (min-width: 640px) 45vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h2 className="text-lg font-bold text-ink">{industry.name}</h2>
      <p className="mt-1.5 text-sm text-pretty text-ink/70">{industry.description}</p>
      <p className="mt-auto pt-4 text-sm font-semibold text-brand-blue">
        {industry.href ? (
          <>
            Explore Industry
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </>
        ) : (
          <span className="text-ink/60">Coming soon</span>
        )}
      </p>
    </div>
  </>
);

export const IndustryDirectory = () => (
  <section aria-labelledby="industries-heading" className="relative py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1
          id="industries-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          Industries We Serve
        </h1>
        <p className="mt-3 text-base text-pretty text-ink/70">
          Discover how BoSS supports businesses across different industries with connected business
          management solutions.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {directoryIndustries.map((industry) => (
          <li key={industry.slug}>
            {industry.href ? (
              <Link
                href={industry.href}
                className={`${cardClass} transition hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
              >
                <CardBody industry={industry} />
              </Link>
            ) : (
              <article className={cardClass}>
                <CardBody industry={industry} />
              </article>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
