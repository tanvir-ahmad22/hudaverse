import {
  Amiri,
  Hind,
  Hind_Siliguri,
  Inter,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
  Noto_Sans_Arabic,
  Plus_Jakarta_Sans,
  Source_Serif_4,
  Vazirmatn,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const heading = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const subheading = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-subheading",
  display: "swap",
});

const quran = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-quran",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

const hindi = Hind({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hindi",
  display: "swap",
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
});

const persian = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-persian",
  display: "swap",
});

export const fontVariableClasses = [
  inter.variable,
  heading.variable,
  subheading.variable,
  quran.variable,
  naskh.variable,
  arabic.variable,
  bangla.variable,
  hindi.variable,
  urdu.variable,
  persian.variable,
].join(" ");
