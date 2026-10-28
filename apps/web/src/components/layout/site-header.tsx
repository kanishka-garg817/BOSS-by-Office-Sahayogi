import { bookDemoAction, primaryNav } from "@/config/navigation";

import { ButtonLink } from "@/components/ui/button-link";

import { BrandLogo } from "./brand-logo";
import { ChevronDownIcon } from "./chevron-down-icon";
import { MobileMenu } from "./mobile-menu";
import { ModulesMenu } from "./modules-menu";
import { ThemeToggle } from "./theme-toggle";

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
    <div className="relative flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-6 xl:gap-6 xl:px-8">
      <BrandLogo />

      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {primaryNav.map((item) => (
            <li key={item.href}>
              {item.menu === "modules" ? <ModulesMenu item={item} /> : null}
              {item.menu === undefined ? (
                <a
                  href={item.href}
                  className="group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-ink transition-colors hover:bg-brand-tint hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  {item.label}
                  {item.isPlain ? null : (
                    <ChevronDownIcon className="size-4 shrink-0 opacity-70 transition-transform group-hover:rotate-180" />
                  )}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
        <ThemeToggle />
        <ButtonLink action={bookDemoAction} />
      </div>

      <div className="flex items-center gap-1 lg:hidden">
        <ThemeToggle />
        <MobileMenu items={primaryNav} primaryAction={bookDemoAction} />
      </div>
    </div>
  </header>
);
