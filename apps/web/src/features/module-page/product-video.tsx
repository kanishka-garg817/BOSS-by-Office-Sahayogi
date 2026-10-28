"use client";

import { Play } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export type ProductVideoSource = {
  /** What the video is, for people using a screen reader. */
  title: string;
  /** The video file. Until there is one, a plain placeholder is shown instead of a player. */
  src?: string;
  /** The still picture shown before the video plays. */
  poster?: StaticImageData;
  /** A captions file (WebVTT), so people who cannot hear the video can follow it. */
  captionsSrc?: string;
};

const frameClass =
  "relative aspect-video w-full overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-xl shadow-brand-navy/10";

const playButtonClass =
  "flex size-20 items-center justify-center rounded-full bg-white text-brand-blue shadow-xl";

/** One large video. It loads and plays only when the visitor presses play. */
export const ProductVideo = ({ video }: { video: ProductVideoSource }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video.src) {
    return (
      <div
        role="img"
        aria-label={`Placeholder for the product video: ${video.title}. The video has not been added yet.`}
        className={`${frameClass} flex flex-col items-center justify-center gap-4 bg-brand-tint/60`}
      >
        <span aria-hidden="true" className={playButtonClass}>
          <Play className="ml-1 size-8 fill-current" />
        </span>
        <p aria-hidden="true" className="text-sm font-semibold text-ink/60">
          Product video · to be added
        </p>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className={frameClass}>
        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          className="size-full bg-black"
          aria-label={video.title}
        >
          {video.captionsSrc ? (
            <track kind="captions" src={video.captionsSrc} srcLang="en" label="English" default />
          ) : null}
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setIsPlaying(true);
      }}
      aria-label={`Play video: ${video.title}`}
      className={`${frameClass} group block focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue`}
    >
      {video.poster ? (
        <Image
          src={video.poster}
          alt=""
          fill
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover"
        />
      ) : null}
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className={`${playButtonClass} transition-transform group-hover:scale-105`}>
          <Play aria-hidden="true" className="ml-1 size-8 fill-current" />
        </span>
      </span>
    </button>
  );
};
