import type { socialMarks } from "@/components/layout/footer/social-marks";

export type SocialProfile = {
  id: keyof typeof socialMarks;
  label: string;
  /** The profile's address. Until it is set, the icon is shown without a link. */
  href: string | undefined;
};

/** BoSS's social profiles, in the order the footer shows them. Fill in `href` as each one opens. */
export const socialProfiles: readonly SocialProfile[] = [
  { id: "linkedin", label: "LinkedIn", href: undefined },
  { id: "facebook", label: "Facebook", href: undefined },
  { id: "instagram", label: "Instagram", href: undefined },
  { id: "x", label: "X (Twitter)", href: undefined },
  { id: "youtube", label: "YouTube", href: undefined },
];
