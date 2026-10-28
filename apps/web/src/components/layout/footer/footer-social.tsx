import { socialProfiles, type SocialProfile } from "@/config/social";

import { socialMarks } from "./social-marks";

const tileClass =
  "flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition";

const Mark = ({ id }: Pick<SocialProfile, "id">) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5 fill-current">
    <path d={socialMarks[id]} />
  </svg>
);

/** The social icons. A profile with no address yet is drawn as a plain icon, not a dead link. */
export const FooterSocial = () => (
  <ul aria-label="Follow us" className="mt-6 flex flex-wrap gap-2.5">
    {socialProfiles.map((profile) => (
      <li key={profile.id}>
        {profile.href ? (
          <a
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.label}
            className={`${tileClass} hover:-translate-y-0.5 hover:bg-white hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
          >
            <Mark id={profile.id} />
          </a>
        ) : (
          <span role="img" aria-label={`${profile.label}, link coming soon`} className={tileClass}>
            <Mark id={profile.id} />
          </span>
        )}
      </li>
    ))}
  </ul>
);
