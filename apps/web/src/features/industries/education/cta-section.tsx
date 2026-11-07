import Image from "next/image";

import educationPhoto from "@/assets/photos/industries/education.jpg";
import { bookDemoAction } from "@/config/navigation";

import { ctaContent } from "./content";

export const EducationCta = () => (
  <section aria-labelledby="education-cta-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={educationPhoto}
          alt=""
          aria-hidden="true"
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-brand-navy/95 via-brand-navy/85 to-brand-navy/50"
        />

        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <h2
            id="education-cta-heading"
            className="max-w-lg text-3xl leading-tight font-extrabold tracking-tight text-balance text-white sm:text-4xl"
          >
            {ctaContent.heading}
          </h2>
          <p className="mt-4 max-w-md text-base text-pretty text-white/80 sm:text-lg">
            {ctaContent.text}
          </p>
          <div className="mt-8">
            <a
              href={bookDemoAction.href}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-brand-blue shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {bookDemoAction.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
