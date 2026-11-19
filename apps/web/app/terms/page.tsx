import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Service | HudaVerse",
  description: "The rules for using HudaVerse, and what you can expect from us.",
};

export default function TermsPage() {
  return <LegalDocumentPage documentId="terms" />;
}
