import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  CircleCheck,
  Clock,
  Plus,
  Receipt,
  Repeat,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

import chooseWhatYouNeedPhoto from "@/assets/photos/why-boss/choose-what-you-need.jpg";
import enterOncePhoto from "@/assets/photos/why-boss/enter-once.jpg";
import lessCheckingPhoto from "@/assets/photos/why-boss/less-checking.jpg";
import onePlacePhoto from "@/assets/photos/why-boss/one-place.jpg";
import { Eyebrow } from "@boss/ui";

/** One small line in a mini screen: an icon, a label and, optionally, a second line under it. */
const MiniRow = ({
  icon: Icon,
  iconClass,
  label,
  detail,
}: {
  icon: LucideIcon;
  iconClass: string;
  label: string;
  detail?: string;
}) => (
  <li className="flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2 shadow-sm ring-1 ring-light-ink/5">
    <span
      aria-hidden="true"
      className={`flex size-6 shrink-0 items-center justify-center rounded-md ${iconClass}`}
    >
      <Icon className="size-3.5" />
    </span>
    <span className="min-w-0 text-xs leading-tight font-semibold text-light-ink">
      {label}
      {detail ? (
        <span className="block text-xs font-normal text-light-ink/60">{detail}</span>
      ) : null}
    </span>
  </li>
);

const modulePicks = [
  { icon: ShoppingCart, iconClass: "bg-pastel-blue text-blue-600", label: "Sales" },
  { icon: Boxes, iconClass: "bg-pastel-amber text-amber-600", label: "Inventory" },
  { icon: Receipt, iconClass: "bg-pastel-rose text-rose-600", label: "Finance" },
  { icon: Users, iconClass: "bg-pastel-violet text-violet-600", label: "People" },
  { icon: Settings, iconClass: "bg-pastel-green text-emerald-600", label: "Operations" },
] as const;

const attentionItems = [
  {
    icon: Wallet,
    iconClass: "bg-pastel-amber text-amber-600",
    label: "Pending Payments",
    detail: "4 invoices",
  },
  {
    icon: Boxes,
    iconClass: "bg-pastel-rose text-rose-600",
    label: "Low Stock Items",
    detail: "12 items",
  },
  {
    icon: BadgeCheck,
    iconClass: "bg-pastel-blue text-blue-600",
    label: "Pending Approvals",
    detail: "3 requests",
  },
] as const;

const orderUpdates = ["Stock updated", "Invoice created", "Finance updated"] as const;

const growthSteps = [
  { icon: ShoppingCart, iconClass: "bg-pastel-blue text-blue-600", label: "Start with Sales" },
  { icon: Boxes, iconClass: "bg-pastel-amber text-amber-600", label: "Add Inventory" },
  { icon: Receipt, iconClass: "bg-pastel-rose text-rose-600", label: "Add Finance" },
  { icon: Users, iconClass: "bg-pastel-violet text-violet-600", label: "Add People" },
] as const;

type ShowcaseCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** The card's pastel background and the colour of its icon and label. */
  backgroundClass: string;
  accentClass: string;
  action: { label: string; href?: "/modules" };
  photo: StaticImageData;
  photoAlt: string;
  /** Where the photo is cropped to, so the face stays in view. */
  photoPositionClass: string;
  screen: ReactNode;
};

const showcaseCards: readonly ShowcaseCard[] = [
  {
    id: "one-place",
    title: "One place for daily work",
    description: "Sales, stock, accounts and people in one system.",
    icon: Users,
    backgroundClass: "from-pastel-blue",
    accentClass: "bg-white text-blue-600 shadow-sm",
    action: { label: "Explore modules", href: "/modules" },
    photo: onePlacePhoto,
    photoAlt: "A team member smiling at her laptop in a bright office",
    photoPositionClass: "object-[25%_50%]",
    screen: (
      <ul className="w-36 space-y-1.5">
        {modulePicks.map((pick) => (
          <MiniRow key={pick.label} {...pick} />
        ))}
      </ul>
    ),
  },
  {
    id: "less-checking",
    title: "Less follow-up",
    description: "See what is pending or due at a glance.",
    icon: Clock,
    backgroundClass: "from-pastel-amber",
    accentClass: "bg-white text-amber-600 shadow-sm",
    action: { label: "Less manual work" },
    photo: lessCheckingPhoto,
    photoAlt: "A business owner at his laptop, relaxed and in control",
    photoPositionClass: "object-[40%_30%]",
    screen: (
      <ul className="w-40 space-y-1.5">
        {attentionItems.map((item) => (
          <MiniRow key={item.label} {...item} />
        ))}
      </ul>
    ),
  },
  {
    id: "enter-once",
    title: "Enter it once",
    description: "Use the same details wherever they are needed.",
    icon: Repeat,
    backgroundClass: "from-pastel-green",
    accentClass: "bg-white text-emerald-600 shadow-sm",
    action: { label: "Work smarter" },
    photo: enterOncePhoto,
    photoAlt: "A smiling team member at her desk with a laptop",
    photoPositionClass: "object-[60%_20%]",
    screen: (
      <div className="w-40 rounded-xl bg-white p-3 shadow-sm ring-1 ring-light-ink/5">
        <p className="flex items-center gap-2 text-xs font-bold text-light-ink">
          <span
            aria-hidden="true"
            className="flex size-5 items-center justify-center rounded-md bg-emerald-500 text-white"
          >
            <Check className="size-3.5" />
          </span>
          Order created
        </p>
        <ul className="mt-2.5 space-y-1.5 border-t border-light-ink/10 pt-2.5">
          {orderUpdates.map((update) => (
            <li key={update} className="flex items-center gap-2 text-xs text-light-ink/70">
              <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
              {update}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "choose-what-you-need",
    title: "Choose what you need",
    description: "Start small. Add modules as you grow.",
    icon: TrendingUp,
    backgroundClass: "from-pastel-violet",
    accentClass: "bg-white text-violet-600 shadow-sm",
    action: { label: "Grow at your pace" },
    photo: chooseWhatYouNeedPhoto,
    photoAlt: "A smiling professional with a laptop",
    photoPositionClass: "object-[48%_30%]",
    screen: (
      <ul className="w-40 space-y-1.5">
        {growthSteps.map((step) => (
          <MiniRow key={step.label} {...step} />
        ))}
        <li className="flex items-center gap-2.5 rounded-lg border border-dashed border-light-ink/25 bg-white/60 px-2.5 py-2">
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white text-light-ink/60"
          >
            <Plus className="size-3.5" />
          </span>
          <span className="text-xs leading-tight font-medium text-light-ink/70">
            Add more as you grow
          </span>
        </li>
      </ul>
    ),
  },
];

const ShowcaseCardView = ({ card }: { card: ShowcaseCard }) => (
  <li>
    <article
      className={`flex h-full flex-col overflow-hidden rounded-3xl border border-light-ink/5 bg-linear-to-br ${card.backgroundClass} to-white sm:flex-row`}
    >
      <div className="flex flex-col p-6 sm:w-5/12 sm:p-7">
        <span
          aria-hidden="true"
          className={`flex size-11 items-center justify-center rounded-xl ${card.accentClass}`}
        >
          <card.icon className="size-6" />
        </span>
        <h3 className="mt-4 text-xl leading-snug font-bold text-balance text-light-ink">
          {card.title}
        </h3>
        <p className="mt-2 text-sm text-pretty text-light-ink/70">{card.description}</p>
        {card.action.href ? (
          <Link
            href={card.action.href}
            className="mt-5 inline-flex min-h-11 items-center gap-2.5 self-start text-sm font-semibold text-light-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <span
              aria-hidden="true"
              className={`flex size-8 items-center justify-center rounded-full ${card.accentClass}`}
            >
              <ArrowRight className="size-4" />
            </span>
            {card.action.label}
          </Link>
        ) : (
          <p className="mt-5 flex min-h-11 items-center gap-2.5 text-sm font-semibold text-light-ink">
            <span
              aria-hidden="true"
              className={`flex size-8 items-center justify-center rounded-full ${card.accentClass}`}
            >
              <CircleCheck className="size-4" />
            </span>
            {card.action.label}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pr-0 pb-4 pl-4 sm:w-7/12 sm:py-4 sm:pl-0">
        <div className="shrink-0">{card.screen}</div>
        <div className="relative min-h-72 flex-1 self-stretch overflow-hidden rounded-l-2xl">
          <Image
            src={card.photo}
            alt={card.photoAlt}
            fill
            sizes="(min-width: 640px) 240px, 50vw"
            className={`object-cover ${card.photoPositionClass}`}
          />
        </div>
      </div>
    </article>
  </li>
);

export const WhyBossSection = () => (
  <section
    id="why-boss"
    aria-labelledby="why-boss-heading"
    className="relative scroll-mt-20 py-14 sm:py-20"
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Why BoSS</Eyebrow>
        <h2
          id="why-boss-heading"
          className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl"
        >
          Built for real businesses,
          <span className="block text-brand-blue">not just one department.</span>
        </h2>
        <p className="mt-4 text-sm text-pretty text-ink/70 sm:text-base">
          BoSS brings the work your business does every day into one connected system — so you can
          focus on growth instead of managing multiple tools and follow-ups.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 xl:grid-cols-2">
        {showcaseCards.map((card) => (
          <ShowcaseCardView key={card.id} card={card} />
        ))}
      </ul>
    </div>
  </section>
);
