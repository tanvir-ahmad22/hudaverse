import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy | HudaVerse",
  description: "How HudaVerse collects, uses and protects your personal data, and the choices you have.",
};

export default function PrivacyPage() {
  return <LegalDocumentPage documentId="privacy" />;
}
