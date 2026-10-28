import {
  AlarmClock,
  Banknote,
  MapPin,
  MessageCircle,
  Package,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import { business } from "@/config/mobile-app";

import { Card, IconTile, Progress, SectionTitle, toneClass, type Tone } from "./ui";

const tileIcons = {
  visits: MapPin,
  orders: ShoppingCart,
  collections: Banknote,
  outstanding: Wallet,
  enquiries: MessageCircle,
  followups: AlarmClock,
} as const;

const targetTone = (percent: number): "blue" | "amber" | "green" => {
  if (percent >= 90) return "green";
  if (percent < 50) return "amber";
  return "blue";
};

export const BusinessScreen = () => (
  <div className="space-y-5 px-4 pt-4 pb-6">
    <div className="space-y-3">
      <SectionTitle>Business overview</SectionTitle>
      <span className="inline-block rounded-full bg-app-blue-soft px-2.5 py-1 text-xs font-bold text-app-blue">
        SAMPLE DATA
      </span>
    </div>

    <Card className="space-y-2 p-3.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-app-muted">
          Monthly target · <b className="text-app-ink">{business.target.achieved}</b> of{" "}
          {business.target.goal}
        </span>
        <b className="text-app-blue">{business.target.percent}%</b>
      </div>
      <Progress percent={business.target.percent} tone="blue" />
      <p className="text-xs text-app-muted">{business.target.note}</p>
    </Card>

    <div className="grid grid-cols-2 gap-2.5">
      {business.tiles.map((tile) => {
        const Icon = tileIcons[tile.id];
        const tone: Tone = tile.tone;
        return (
          <Card key={tile.id} className="flex items-center gap-2.5 p-2.5">
            <IconTile tone={tone}>
              <Icon className="size-5" />
            </IconTile>
            <div>
              <p className="text-xs text-app-muted">{tile.label}</p>
              <p className="text-lg leading-tight font-extrabold text-app-ink">{tile.value}</p>
              <p className={`text-xs ${toneClass[tone].text}`}>{tile.hint}</p>
            </div>
          </Card>
        );
      })}
    </div>

    <Card className="overflow-hidden">
      <h4 className="border-b border-app-line px-3.5 py-2.5 text-sm font-bold text-app-ink">
        Today&apos;s visits
      </h4>
      {business.visits.map((visit) => (
        <div
          key={visit.id}
          className="flex items-center gap-3 border-b border-app-line px-3.5 py-2.5 last:border-b-0"
        >
          <span className="w-16 text-xs text-app-muted">{visit.time}</span>
          <span className="flex-1">
            <span className="block text-sm font-bold text-app-ink">{visit.name}</span>
            <span className="block text-xs text-app-muted">{visit.purpose}</span>
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${visit.status === "Done" ? "bg-app-green-soft text-app-green" : "bg-app-soft text-app-muted"}`}
          >
            {visit.status}
          </span>
        </div>
      ))}
    </Card>

    <Card className="space-y-3 p-3.5">
      <h4 className="flex items-center gap-2 text-sm font-bold text-app-ink">
        <Package aria-hidden="true" className="size-4 text-app-blue" />
        Product targets
      </h4>
      {business.products.map((product) => (
        <div key={product.id} className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <b className="text-sm text-app-ink">{product.name}</b>
            <span className="text-app-muted">
              {product.value} · {product.percent}%
            </span>
          </div>
          <Progress percent={product.percent} tone={targetTone(product.percent)} />
        </div>
      ))}
    </Card>

    <Card className="overflow-hidden">
      <h4 className="border-b border-app-line px-3.5 py-2.5 text-sm font-bold text-app-ink">
        Top dealers this month
      </h4>
      {business.dealers.map((dealer) => (
        <div
          key={dealer.id}
          className="flex items-center gap-3 border-b border-app-line px-3.5 py-2.5 last:border-b-0"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-app-blue-soft text-xs font-bold text-app-blue">
            {dealer.rank}
          </span>
          <span className="flex-1 text-sm font-semibold text-app-ink">{dealer.name}</span>
          <span className="text-right">
            <b className="block text-sm text-app-ink">{dealer.amount}</b>
            <span className="text-xs text-app-muted">{dealer.orders}</span>
          </span>
        </div>
      ))}
    </Card>

    <Card className="overflow-hidden">
      <h4 className="border-b border-app-line px-3.5 py-2.5 text-sm font-bold text-app-ink">
        Follow-ups
      </h4>
      {business.followUps.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 border-b border-app-line px-3.5 py-2.5 last:border-b-0"
        >
          <AlarmClock aria-hidden="true" className="size-5 shrink-0 text-app-blue" />
          <span>
            <span className="block text-sm font-bold text-app-ink">{item.title}</span>
            <span className="block text-xs text-app-muted">{item.detail}</span>
          </span>
        </div>
      ))}
    </Card>
  </div>
);
