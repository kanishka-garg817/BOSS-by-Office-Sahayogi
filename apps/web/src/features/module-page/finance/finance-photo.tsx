import Image from "next/image";

import { financePhotos } from "./finance-photos";

type FinancePhotoProps = {
  id: string;
  /** How wide the picture is shown at each screen size, so the browser fetches the right file. */
  sizes: string;
  /** Only for the picture that is the largest thing on screen when the page opens. */
  isPriority?: boolean;
  className?: string;
};

/** A stock photo that fills its parent, which must be positioned and have a size. */
export const FinancePhoto = ({
  id,
  sizes,
  isPriority = false,
  className = "",
}: FinancePhotoProps) => {
  const photo = financePhotos[id];
  if (!photo) return null;
  return (
    <Image
      src={photo.image}
      alt={photo.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      priority={isPriority}
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={`object-cover ${className}`.trim()}
    />
  );
};
