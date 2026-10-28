const CAPTIONS = [
  "A new online order arrives in BoSS",
  "Bank payments match your invoices",
  "Customer chats and emails land in one place",
  "Your accounts stay in sync, no re-typing",
] as const;

const CAPTION_SECONDS = 4;

/**
 * Plain-language lines that take turns under the BoSS badge, so someone who does not recognise
 * every logo still sees what connecting these tools does for them.
 */
export const ConnectionCaption = () => (
  <>
    <p className="sr-only">{CAPTIONS.join(". ")}.</p>
    <div aria-hidden="true" className="relative h-12 w-full">
      {CAPTIONS.map((caption, index) => (
        <p
          key={caption}
          className="absolute inset-x-0 top-0 text-center text-base leading-snug font-semibold text-balance text-ink opacity-0 motion-safe:animate-caption-cycle motion-reduce:first:opacity-100"
          style={{ animationDelay: `${String(index * CAPTION_SECONDS)}s` }}
        >
          {caption}
        </p>
      ))}
    </div>
  </>
);
