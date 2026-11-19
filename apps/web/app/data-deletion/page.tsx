import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Account and Data Deletion | HudaVerse",
  description: "How to ask us to delete your HudaVerse account and the personal data linked to it.",
};

export default function DataDeletionRoute() {
  return <LegalDocumentPage documentId="data-deletion" />;
}
