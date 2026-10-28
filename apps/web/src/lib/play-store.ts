import "server-only";

import { env, isProduction } from "@/env";

const PLAY_STORE_HOME = "https://play.google.com/store";

/**
 * Where "Download from Google Play" goes. The listing URL is required in production, where the
 * button is left out until it is set. Elsewhere the button opens the Play Store home so it can be tried.
 */
export const playStoreHref: string | undefined =
  env.NEXT_PUBLIC_PLAY_STORE_URL ?? (isProduction ? undefined : PLAY_STORE_HOME);
