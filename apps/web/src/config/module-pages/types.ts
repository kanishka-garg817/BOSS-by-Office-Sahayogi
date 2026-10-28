import type { LucideIcon } from "lucide-react";

export type SubnavItem = {
  id: string;
  label: string;
  /** A link to another page. Without it the item scrolls to the section with this id. */
  href?: `/${string}`;
  /** Opens a panel listing the main features when the item is hovered or focused. */
  hasFeatureMenu?: boolean;
  /** Marks the page the visitor is on, when it is reached through this item. */
  isCurrent?: boolean;
};

/** One main capability of a module: what it is for, and its main features. */
export type FeatureGroup = {
  id: string;
  name: string;
  icon: LucideIcon;
  /** One line on what the feature does. */
  summary: string;
  /** The main features, as short labels. */
  highlights: readonly string[];
};

/** A few capabilities shown together under one customer-friendly heading. */
export type FeatureCluster = {
  id: string;
  name: string;
  icon: LucideIcon;
  /** A short name for the in-page navigation, where room is tight. */
  navLabel: string;
  /** One line on what the group is for. */
  summary: string;
  /** The ids of the capabilities in it, in the order they are shown. */
  capabilityIds: readonly string[];
};
