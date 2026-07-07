export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  num: string;
  title: string;
  content: LegalBlock[];
};

export type LegalSummary = {
  title: string;
  text: string;
};

export type LegalMeta = {
  title: string;
  edition: string;
  operator: string;
  emailLegal: string;
  site: string;
};
