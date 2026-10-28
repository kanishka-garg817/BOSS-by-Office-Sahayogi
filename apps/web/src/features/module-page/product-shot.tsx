import { LayoutDashboard } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

export type ProductShot = {
  /** The product screen the picture shows, e.g. "Chart of Accounts / General Ledger". */
  title: string;
  /** The real screenshot. Until there is one, a plain placeholder is drawn in its place. */
  image?: StaticImageData;
  /** Describes the screenshot for people who cannot see it. Required with `image`. */
  alt?: string;
};

const frameClass =
  "overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-lg shadow-brand-navy/5";

/** A large product screen in a clean frame, or an honest placeholder where there is no screenshot yet. */
export const ProductShotFrame = ({ shot }: { shot: ProductShot }) => {
  if (shot.image) {
    return (
      <figure className={frameClass}>
        <Image
          src={shot.image}
          alt={shot.alt ?? shot.title}
          sizes="(min-width: 1024px) 700px, 100vw"
          className="h-auto w-full"
        />
      </figure>
    );
  }

  return (
    <figure
      aria-label={`Placeholder for a BoSS product screen: ${shot.title}. The screenshot has not been added yet.`}
      className={frameClass}
    >
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-ink/10 px-4">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
      </div>
      <div aria-hidden="true" className="p-4 sm:p-6">
        <div className="flex aspect-16/10 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ink/15 bg-brand-tint/50 px-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-surface text-brand-blue shadow-sm">
            <LayoutDashboard className="size-6" />
          </span>
          <p className="text-base font-bold text-ink">{shot.title}</p>
          <p className="text-sm text-ink/60">BoSS product screen · screenshot to be added</p>
        </div>
      </div>
    </figure>
  );
};
