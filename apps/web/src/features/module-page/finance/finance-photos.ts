import type { StaticImageData } from "next/image";

import assets from "@/assets/photos/finance/assets.jpg";
import budgets from "@/assets/photos/finance/budgets.jpg";
import cashBank from "@/assets/photos/finance/cash-bank.jpg";
import currency from "@/assets/photos/finance/currency.jpg";
import expenses from "@/assets/photos/finance/expenses.jpg";
import general from "@/assets/photos/finance/general.jpg";
import group from "@/assets/photos/finance/group.jpg";
import hero from "@/assets/photos/finance/hero.jpg";
import multiEntity from "@/assets/photos/finance/multi-entity.jpg";
import payables from "@/assets/photos/finance/payables.jpg";
import receivables from "@/assets/photos/finance/receivables.jpg";
import reconciliation from "@/assets/photos/finance/reconciliation.jpg";
import reports from "@/assets/photos/finance/reports.jpg";
import setup from "@/assets/photos/finance/setup.jpg";

export type FinancePhoto = {
  image: StaticImageData;
  alt: string;
  /** Which part of the picture stays in view when it is cropped to fit. */
  position?: string;
};

/** One photo for each capability, by its id, plus the page's hero. Stock photos from Pexels. */
export const financePhotos: Record<string, FinancePhoto> = {
  hero: {
    image: hero,
    alt: "A woman using a laptop that shows a finance dashboard with revenue, expenses and profit, beside an invoice, a calculator and a printed financial report",
  },
  setup: {
    image: setup,
    alt: "An accountant using a calculator beside a stack of paperwork",
    position: "50% 85%",
  },
  general: {
    image: general,
    alt: "A person entering figures on a calculator while holding a report, with charts on the monitor behind",
  },
  receivables: {
    image: receivables,
    alt: "A person pointing at the items on an invoice held on a clipboard",
  },
  payables: {
    image: payables,
    alt: "A woman going through receipts and a notebook at her desk with a laptop",
  },
  "cash-bank": {
    image: cashBank,
    alt: "Hands on a laptop keyboard beside a phone calculator, bank notes and printed statements",
  },
  reconciliation: {
    image: reconciliation,
    alt: "Hands checking figures on a calculator over a binder of documents",
  },
  assets: {
    image: assets,
    alt: "Workers operating machines on a factory floor",
  },
  expenses: {
    image: expenses,
    alt: "A pile of receipts and printed documents on a desk",
  },
  budgets: {
    image: budgets,
    alt: "A person with a pen reviewing printed charts and reports beside a laptop",
  },
  currency: {
    image: currency,
    alt: "Bank notes from several countries fanned out",
  },
  "multi-entity": {
    image: multiEntity,
    alt: "A tall glass office building seen from the street",
    position: "40% 40%",
  },
  reports: {
    image: reports,
    alt: "A woman at her desk by a window working on a laptop with spreadsheets",
  },
  group: {
    image: group,
    alt: "A team in a meeting, one colleague showing a printed pie chart",
  },
};
