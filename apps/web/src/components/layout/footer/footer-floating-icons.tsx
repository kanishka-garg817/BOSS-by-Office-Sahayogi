import { modules } from "@/config/modules";

/** Where each icon floats, in the band behind the big wordmark so it never covers a link. */
const floaters = [
  { slug: "finance-accounting", left: "5%", top: "68%", seconds: 5.5, size: "size-8" },
  { slug: "sales-crm", left: "17%", top: "80%", seconds: 6.5, size: "size-6" },
  { slug: "inventory", left: "29%", top: "66%", seconds: 7, size: "size-7" },
  { slug: "people-payroll", left: "42%", top: "78%", seconds: 5, size: "size-8" },
  { slug: "manufacturing", left: "55%", top: "67%", seconds: 6, size: "size-6" },
  { slug: "warehouse-management", left: "68%", top: "79%", seconds: 7.5, size: "size-7" },
  { slug: "supply-chain-logistics", left: "80%", top: "66%", seconds: 5.8, size: "size-8" },
  { slug: "procurement", left: "91%", top: "78%", seconds: 6.8, size: "size-6" },
] as const;

/** Module icons drifting softly behind the footer. They are decoration only. */
export const FooterFloatingIcons = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {floaters.map((floater, index) => {
      const bossModule = modules.find((candidate) => candidate.slug === floater.slug);
      if (!bossModule) return null;
      return (
        <span
          key={floater.slug}
          className="absolute max-sm:odd:hidden"
          style={{ left: floater.left, top: floater.top }}
        >
          <span
            className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-3 text-white/60 backdrop-blur-sm motion-safe:animate-float"
            style={{
              animationDuration: `${String(floater.seconds)}s`,
              animationDelay: `-${String(index * 0.9)}s`,
            }}
          >
            <bossModule.icon className={floater.size} />
          </span>
        </span>
      );
    })}
  </div>
);
