import { Eyebrow } from "@/components/ui/eyebrow";
import { ImmersiveMarker } from "@/components/ui/immersive-marker";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { IntegrationOrbit } from "@/features/integrations/integration-orbit";

export const IntegrationsSection = () => (
  <section
    id="integrations"
    aria-labelledby="integrations-heading"
    className="relative flex min-h-svh scroll-mt-20 flex-col justify-center py-14 sm:py-24"
  >
    <ImmersiveMarker />
    <SectionBackdrop tone="slate" dots />
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Integrations</Eyebrow>
        <h2
          id="integrations-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink lg:text-4xl"
        >
          Connect BoSS to the tools your business already uses
        </h2>
        <p className="mt-3 text-sm text-pretty text-ink/70 sm:text-base">
          Bring your business tools together and keep your data moving.
        </p>
      </div>
    </div>

    <div className="mt-10 sm:mt-12">
      <IntegrationOrbit />
      <p className="mx-auto mt-4 max-w-2xl px-4 text-center text-xs text-pretty text-ink/50">
        All logos belong to their respective owners. They are shown only to indicate that BoSS
        offers integrations with these tools.
      </p>
    </div>
  </section>
);
