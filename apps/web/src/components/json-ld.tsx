type JsonLdProps = {
  /** A schema.org object, e.g. { "@context": "https://schema.org", "@type": "Organization", ... } */
  data: Record<string, unknown>;
};

/** Renders structured data. `<` is escaped so content can never close the script tag. */
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);
