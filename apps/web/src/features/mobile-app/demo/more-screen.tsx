import {
  Bell,
  Bug,
  ChevronRight,
  CloudDownload,
  FileText,
  LifeBuoy,
  Lock,
  LogOut,
  Moon,
  ShieldCheck,
  Smartphone,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { ThemeChoice } from "./app-types";
import { Card, IconTile, SectionTitle, type Tone } from "./ui";

type Row = { id: string; icon: LucideIcon; tone: Tone; title: string; hint: string };

const profileRows: readonly Row[] = [
  {
    id: "personal",
    icon: UserRound,
    tone: "violet",
    title: "Personal information",
    hint: "Employee ID, department and other details kept by HR",
  },
  {
    id: "devices",
    icon: Smartphone,
    tone: "blue",
    title: "Devices & sessions",
    hint: "Phones you are signed in on",
  },
];

const appRows: readonly Row[] = [
  {
    id: "notifications",
    icon: Bell,
    tone: "amber",
    title: "Notifications",
    hint: "Choose what you are told about",
  },
  {
    id: "lock",
    icon: Lock,
    tone: "green",
    title: "App lock",
    hint: "Reopening asks for your fingerprint, face or phone passcode",
  },
  {
    id: "updates",
    icon: CloudDownload,
    tone: "blue",
    title: "App updates",
    hint: "Check for the latest version",
  },
];

const helpRows: readonly Row[] = [
  {
    id: "help",
    icon: LifeBuoy,
    tone: "violet",
    title: "About & help",
    hint: "Common questions, support and the app",
  },
  {
    id: "report",
    icon: Bug,
    tone: "amber",
    title: "Report a problem",
    hint: "Tell support what went wrong",
  },
];

const legalRows: readonly Row[] = [
  {
    id: "privacy",
    icon: ShieldCheck,
    tone: "green",
    title: "Privacy Policy",
    hint: "How your information is used",
  },
  {
    id: "terms",
    icon: FileText,
    tone: "blue",
    title: "Terms of Use",
    hint: "The rules for using the app",
  },
];

const themeChoices: readonly { id: ThemeChoice; label: string }[] = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const RowList = ({ rows }: { rows: readonly Row[] }) => (
  <Card className="overflow-hidden">
    {rows.map((row) => (
      <div
        key={row.id}
        className="flex items-center gap-3 border-b border-app-line p-3 last:border-b-0"
      >
        <IconTile tone={row.tone}>
          <row.icon className="size-5" />
        </IconTile>
        <span className="flex-1">
          <span className="block text-sm font-bold text-app-ink">{row.title}</span>
          <span className="block text-xs text-app-muted">{row.hint}</span>
        </span>
        <ChevronRight aria-hidden="true" className="size-4 text-app-muted" />
      </div>
    ))}
  </Card>
);

type MoreScreenProps = { theme: ThemeChoice; onTheme: (choice: ThemeChoice) => void };

export const MoreScreen = ({ theme, onTheme }: MoreScreenProps) => (
  <div className="space-y-4 px-4 pt-4 pb-6">
    <SectionTitle>PROFILE SETTINGS</SectionTitle>
    <RowList rows={profileRows} />

    <SectionTitle>APP SETTINGS</SectionTitle>
    <Card className="overflow-hidden">
      <div className="space-y-3 border-b border-app-line p-3">
        <div className="flex items-center gap-3">
          <IconTile tone="red">
            <Moon className="size-5" />
          </IconTile>
          <span>
            <span className="block text-sm font-bold text-app-ink">Appearance</span>
            <span className="block text-xs text-app-muted">
              Follow the phone, or always light or dark
            </span>
          </span>
        </div>
        <div
          role="group"
          aria-label="Appearance"
          className="grid grid-cols-3 gap-1 rounded-xl bg-app-soft p-1"
        >
          {themeChoices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              data-demo={`theme-${choice.id}`}
              aria-pressed={theme === choice.id}
              onClick={() => {
                onTheme(choice.id);
              }}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${theme === choice.id ? "bg-app-blue text-white shadow" : "text-app-ink"}`}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
      {appRows.map((row) => (
        <div
          key={row.id}
          className="flex items-center gap-3 border-b border-app-line p-3 last:border-b-0"
        >
          <IconTile tone={row.tone}>
            <row.icon className="size-5" />
          </IconTile>
          <span className="flex-1">
            <span className="block text-sm font-bold text-app-ink">{row.title}</span>
            <span className="block text-xs text-app-muted">{row.hint}</span>
          </span>
          <ChevronRight aria-hidden="true" className="size-4 text-app-muted" />
        </div>
      ))}
    </Card>

    <SectionTitle>HELP &amp; SUPPORT</SectionTitle>
    <RowList rows={helpRows} />

    <SectionTitle>LEGAL</SectionTitle>
    <RowList rows={legalRows} />

    <SectionTitle>ACCOUNT</SectionTitle>
    <Card className="flex items-center gap-3 p-3">
      <IconTile tone="red">
        <LogOut className="size-5" />
      </IconTile>
      <span className="text-sm font-bold text-app-red">Sign out</span>
    </Card>
  </div>
);
