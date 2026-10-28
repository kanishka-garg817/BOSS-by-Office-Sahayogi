import {
  Bell,
  Ellipsis,
  House,
  Layers,
  Search,
  UserRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";

import robotImage from "@/assets/brand/assistant-robot.png";
import markImage from "@/assets/brand/boss-mark.png";
import { demoCompany } from "@/config/mobile-app";

import type { Tab } from "./app-types";
import { AssistantScreen } from "./assistant-screen";
import { AttendanceScreen } from "./attendance-screen";
import { BusinessScreen } from "./business-screen";
import { ClaimScreen } from "./claim-screen";
import { HomeScreen } from "./home-screen";
import { LeaveScreen } from "./leave-screen";
import { MoreScreen } from "./more-screen";
import { PayslipsScreen } from "./payslips-screen";
import { SpaceScreen } from "./space-screen";
import { TourCursor } from "./tour-cursor";
import type { DemoApp } from "./use-demo-app";

export type TourPointer = { x: number; y: number; isVisible: boolean; isTapping: boolean };

type NavItem = { tab: Tab; label: string; icon: LucideIcon };

const leftItems: readonly NavItem[] = [
  { tab: "home", label: "Home", icon: House },
  { tab: "business", label: "Business", icon: Layers },
];
const rightItems: readonly NavItem[] = [
  { tab: "space", label: "My Space", icon: UserRound },
  { tab: "more", label: "More", icon: Ellipsis },
];

const NavButton = ({ item, app }: { item: NavItem; app: DemoApp }) => {
  const isActive = app.route.tab === item.tab;
  return (
    <button
      type="button"
      data-demo={`tab-${item.tab}`}
      aria-current={isActive ? "page" : undefined}
      onClick={() => {
        app.goTab(item.tab);
      }}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold ${isActive ? "text-app-blue" : "text-app-muted"}`}
    >
      <item.icon aria-hidden="true" className="size-6" />
      {item.label}
    </button>
  );
};

/** The strip at the top of the phone's screen: the time on one side, the signal on the other. */
const StatusBar = () => (
  <div className="flex h-12 shrink-0 items-center text-xs font-semibold text-app-ink">
    <span className="flex-1 pt-1 text-center text-sm">9:41</span>
    <span aria-hidden="true" className="w-28 shrink-0" />
    <span className="flex flex-1 items-center justify-center gap-1.5 pt-1">
      <span aria-hidden="true" className="flex items-end gap-px">
        <span className="h-1 w-0.5 rounded-full bg-app-ink" />
        <span className="h-1.5 w-0.5 rounded-full bg-app-ink" />
        <span className="h-2 w-0.5 rounded-full bg-app-ink" />
        <span className="h-2.5 w-0.5 rounded-full bg-app-ink" />
      </span>
      <Wifi aria-hidden="true" className="size-3.5" />
      <span aria-hidden="true" className="h-3 w-5.5 rounded-[4px] border border-app-ink/50 p-px">
        <span className="block h-full w-4/5 rounded-[2px] bg-app-ink" />
      </span>
    </span>
  </div>
);

const TabHeader = ({ tab }: { tab: Tab }) =>
  tab === "more" ? (
    <header className="flex shrink-0 items-center justify-between px-4 py-4">
      <h2 className="text-xl font-bold text-app-ink">More</h2>
      <span className="flex gap-4 text-app-ink">
        <Search aria-hidden="true" className="size-5" />
        <Bell aria-hidden="true" className="size-5" />
      </span>
    </header>
  ) : (
    <header className="flex shrink-0 items-center gap-3 px-4 py-3">
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-xl bg-app-blue-soft"
      >
        <Image src={markImage} alt="" className="h-6 w-auto" sizes="24px" />
      </span>
      <h2 className="flex-1 text-lg font-bold text-app-ink">{demoCompany}</h2>
      <Search aria-hidden="true" className="size-5 text-app-ink" />
      <Bell aria-hidden="true" className="size-5 text-app-ink" />
    </header>
  );

const TabBody = ({ app }: { app: DemoApp }) => {
  switch (app.route.tab) {
    case "home":
      return <HomeScreen nav={app} isCheckedIn={app.isCheckedIn} />;
    case "business":
      return <BusinessScreen />;
    case "space":
      return <SpaceScreen nav={app} />;
    case "more":
      return <MoreScreen theme={app.theme} onTheme={app.setTheme} />;
  }
};

type PhoneAppProps = {
  app: DemoApp;
  pointer: TourPointer;
  screenRef: RefObject<HTMLDivElement | null>;
};

/** The BoSS app, drawn at the size of a 360 by 780 phone screen. The caller scales it to fit. */
export const PhoneApp = ({ app, pointer, screenRef }: PhoneAppProps) => {
  const { detail } = app.route;
  const isFullScreen = detail === "claim" || detail === "assistant";

  return (
    <div
      ref={screenRef}
      className={`app-${app.theme} relative flex h-200 w-90 flex-col overflow-hidden bg-app-bg text-app-ink`}
    >
      <StatusBar />
      {detail === "claim" ? (
        <ClaimScreen
          form={app.claim}
          onChange={app.changeClaim}
          onSubmit={app.submitClaim}
          onClose={app.back}
        />
      ) : null}
      {detail === "assistant" ? (
        <AssistantScreen
          messages={app.messages}
          draft={app.draft}
          isReplying={app.isReplying}
          onDraft={app.setDraft}
          onSend={app.send}
          onBack={app.back}
        />
      ) : null}

      {isFullScreen ? null : (
        <>
          {detail === null ? <TabHeader tab={app.route.tab} /> : null}
          <div
            data-demo-scroll=""
            className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto"
          >
            {detail === null ? <TabBody app={app} /> : null}
            {detail === "attendance" ? (
              <AttendanceScreen
                isCheckedIn={app.isCheckedIn}
                elapsedSeconds={app.elapsedSeconds}
                onToggle={app.toggleCheckIn}
                onBack={app.back}
              />
            ) : null}
            {detail === "leave" ? (
              <LeaveScreen
                filter={app.leaveFilter}
                cancelledIds={app.cancelledIds}
                onFilter={app.setLeaveFilter}
                onCancel={app.cancelLeave}
                onBack={app.back}
              />
            ) : null}
            {detail === "payslips" ? <PayslipsScreen onBack={app.back} /> : null}
          </div>
          <nav
            aria-label="App navigation"
            className="relative flex shrink-0 items-end border-t border-app-line bg-app-card px-1 pb-5"
          >
            {leftItems.map((item) => (
              <NavButton key={item.tab} item={item} app={app} />
            ))}
            <button
              type="button"
              data-demo="tab-assistant"
              aria-label="Ask Sahayogi"
              onClick={() => {
                app.open("assistant");
              }}
              className="relative -mt-8 flex flex-1 justify-center"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-app-card shadow-xl ring-4 shadow-app-blue/30 ring-app-blue-soft">
                <Image src={robotImage} alt="" className="w-11" sizes="44px" />
              </span>
            </button>
            {rightItems.map((item) => (
              <NavButton key={item.tab} item={item} app={app} />
            ))}
          </nav>
        </>
      )}

      <TourCursor {...pointer} />
    </div>
  );
};
