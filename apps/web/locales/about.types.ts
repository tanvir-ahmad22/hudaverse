export interface AboutBlock {
  type: "paragraph" | "heading" | "quote";
  text: string;
}

export interface AboutPrinciple {
  title: string;
  description: string;
}

export interface AboutDomain {
  title: string;
  description: string;
}

export interface AboutCommitment {
  title: string;
  description: string;
}

export interface AboutTranslations {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string[];
  section02Title: string;
  section02: AboutBlock[];
  section03Title: string;
  section03Body: string[];
  section03Closing: string;
  section04Title: string;
  section04VisionTitle: string;
  section04Vision: string;
  section04MissionTitle: string;
  section04Mission: string;
  section05Title: string;
  section05Intro: string;
  section05Principles: AboutPrinciple[];
  section06Title: string;
  section06Intro: string;
  section06Domains: AboutDomain[];
  section07Title: string;
  section07Intro: string;
  section07Commitments: AboutCommitment[];
  section08Title: string;
  section08: AboutBlock[];
  section09Title: string;
  section09Body: string[];
  section09Closing: string;
  section10Title: string;
  section10Body: string[];
  section10Closing: string;
  principleTitle: string;
  principle: string;
}
