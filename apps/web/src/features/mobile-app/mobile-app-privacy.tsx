import { LockKeyhole, ScrollText, Smartphone } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { securityPoints } from "@/config/mobile-app";

import { LockDemo } from "./lock-demo";

const icons = { lock: LockKeyhole, devices: Smartphone, legal: ScrollText } as const;

export const MobileAppPrivacy = () => (
  <section aria-labelledby="app-privacy-heading" className="relative py-14 sm:py-20">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="reveal-on-scroll">
        <Eyebrow>Your privacy</Eyebrow>
        <h2
          id="app-privacy-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          Your pay and attendance stay behind your lock
        </h2>
        <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">
          Your leave, payslips and documents are personal. The app gives you simple controls to keep
          them that way.
        </p>
        <ul className="mt-8 space-y-5">
          {securityPoints.map((point) => {
            const Icon = icons[point.id];
            return (
              <li key={point.id} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{point.title}</h3>
                  <p className="mt-0.5 text-sm text-pretty text-ink/70">{point.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="reveal-on-scroll">
        <div className="mx-auto max-w-sm rounded-3xl border border-brand-blue/30 bg-linear-to-b from-brand-tint to-surface p-6 shadow-xl shadow-brand-blue/10">
          <p className="mb-5 text-xs font-bold tracking-wide text-brand-blue uppercase">App lock</p>
          <LockDemo />
          <p className="mt-5 border-t border-ink/10 pt-4 text-sm text-pretty text-ink/70">
            Every time the app reopens, it asks for your fingerprint, face or phone passcode.
          </p>
        </div>
      </div>
    </div>
  </section>
);
