import "server-only";

type RateLimiterOptions = {
  /** How many calls one key may make in the window. */
  max: number;
  windowMs: number;
};

/**
 * A simple limiter that counts calls per key in memory. Each server instance counts on its own,
 * so it slows down a single visitor or bot but is not a shared limit across instances.
 */
export const createRateLimiter = ({ max, windowMs }: RateLimiterOptions) => {
  const calls = new Map<string, number[]>();

  return (key: string): boolean => {
    const now = Date.now();
    const recent = (calls.get(key) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= max) {
      calls.set(key, recent);
      return true;
    }
    calls.set(key, [...recent, now]);
    return false;
  };
};
