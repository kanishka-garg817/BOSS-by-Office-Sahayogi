/**
 * The animated illustration shown on each homepage solution card. The files live in
 * `public/animations/solutions`. They are free animations by Abdul Latif (Animoox) from
 * LottieFiles, used under the Lottie Simple License, which allows commercial use without credit.
 */
export type SolutionAnimation = {
  src: string;
  /** The animation's own size, used to reserve space so nothing jumps while it loads. */
  width: number;
  height: number;
};

const animation = (slug: string, width: number, height: number): SolutionAnimation => ({
  src: `/animations/solutions/${slug}.json`,
  width,
  height,
});

export const solutionAnimations: Readonly<Record<string, SolutionAnimation>> = {
  "one-connected-system": animation("one-connected-system", 1073, 616),
  "automatic-workflows": animation("automatic-workflows", 974, 712),
  "one-source-of-truth": animation("one-source-of-truth", 960, 908),
  "real-time-visibility": animation("real-time-visibility", 976, 776),
  "everyone-on-the-same-page": animation("everyone-on-the-same-page", 936, 884),
  "grows-with-your-business": animation("grows-with-your-business", 926, 906),
};
