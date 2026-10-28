/**
 * What a mini window shows. Everything here is made-up example data, written to look like the
 * everyday tools it stands in for.
 */
export type WindowContent =
  | {
      kind: "chat";
      contact: string;
      messages: readonly { side: "in" | "out"; text: string; time: string }[];
    }
  | {
      kind: "sheet";
      file: string;
      columns: readonly string[];
      rows: readonly (readonly string[])[];
      /** A cell to highlight, as [row index in `rows`, column index]. */
      flag?: readonly [number, number];
    }
  | { kind: "mail"; from: string; subject: string; preview: string; time: string }
  | {
      kind: "form";
      title: string;
      fields: readonly { label: string; value: string; flag?: boolean }[];
    }
  | { kind: "list"; title: string; items: readonly string[] }
  | {
      kind: "check";
      title: string;
      items: readonly { text: string; done: boolean }[];
      /** Unchecked items are shown as plain empty boxes instead of red "missed" boxes. */
      neutral?: boolean;
    };
