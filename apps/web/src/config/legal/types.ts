export type LegalSection = {
  /** Used for the link in the contents list and the section's anchor. */
  id: string;
  title: string;
  paragraphs?: readonly string[];
  /** A bulleted list that follows the paragraphs. */
  items?: readonly string[];
};

export type LegalDocument = {
  title: string;
  /** One or two sentences under the title. */
  intro: string;
  /** The date the text was last changed, as YYYY-MM-DD. */
  updated: string;
  sections: readonly LegalSection[];
};
