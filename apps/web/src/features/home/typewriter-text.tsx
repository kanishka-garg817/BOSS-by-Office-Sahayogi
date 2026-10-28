type TypewriterSegment = {
  text: string;
  /** Renders the segment in the brand blue. */
  highlight?: boolean;
  /** Starts this segment on a new line. */
  breakBefore?: boolean;
};

type TypewriterTextProps = {
  segments: readonly TypewriterSegment[];
};

type Token =
  | { kind: "space"; key: number }
  | { kind: "break"; key: number }
  | {
      kind: "word";
      key: number;
      highlight: boolean;
      characters: { character: string; index: number }[];
    };

const START_DELAY_MS = 200;
const STEP_DELAY_MS = 45;

/** Splits segments into words and spaces, numbering every character for the typing order. */
const tokenize = (segments: readonly TypewriterSegment[]): Token[] => {
  let characterIndex = 0;
  let tokenKey = 0;
  return segments.flatMap((segment) => [
    ...(segment.breakBefore ? [{ kind: "break", key: tokenKey++ } satisfies Token] : []),
    ...segment.text
      .split(/( )/)
      .filter((part) => part !== "")
      .map((part): Token => {
        if (part === " ") {
          characterIndex += 1;
          return { kind: "space", key: tokenKey++ };
        }
        return {
          kind: "word",
          key: tokenKey++,
          highlight: segment.highlight === true,
          characters: Array.from(part).map((character) => ({
            character,
            index: characterIndex++,
          })),
        };
      }),
  ]);
};

/**
 * Types its text once on load using CSS only (no JavaScript): every character is in the HTML from
 * the start and is revealed in sequence, so crawlers read the whole sentence and nothing shifts.
 * Animation is defined by `.type-char` in globals.css and skipped for reduced motion.
 */
export const TypewriterText = ({ segments }: TypewriterTextProps) => (
  <>
    {tokenize(segments).map((token) => {
      if (token.kind === "space") return " ";
      if (token.kind === "break") return <br key={token.key} />;
      return (
        <span
          key={token.key}
          className={`whitespace-nowrap ${token.highlight ? "text-brand-blue" : ""}`}
        >
          {token.characters.map(({ character, index }) => (
            <span
              key={index}
              className="type-char"
              style={{ animationDelay: `${START_DELAY_MS + index * STEP_DELAY_MS}ms` }}
            >
              {character}
            </span>
          ))}
        </span>
      );
    })}
  </>
);
