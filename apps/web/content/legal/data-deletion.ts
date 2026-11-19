import { withLegalConfig } from "./legal.config";

const dataDeletion = withLegalConfig({
  id: "data-deletion",
  title: "Account and Data Deletion",
  summary: "How to ask us to delete your HudaVerse account and the personal data linked to it.",
  sections: [
    { id: "how-to-request", heading: "How to request deletion", blocks: [{ type: "steps", items: [
      "Send an email to {{privacyEmail}} from the email address registered to your account.",
      "Use the subject line: Account deletion request.",
      "We may reply to confirm that the request really comes from you.",
      "We delete your account and personal data within {{deletionDays}} days of confirming your request, and we email you when it is done.",
    ] }] },
    { id: "what-we-delete", heading: "What we delete", blocks: [{ type: "bullets", items: [
      "Your account, profile and settings.", "Your notes, bookmarks and reading history.", "Your active sessions and saved sign-in connections, including any Google connection.",
    ] }] },
    { id: "what-we-keep", heading: "What we may keep", blocks: [{ type: "paragraph", text: "Some limited records may remain for a short period: security and abuse-prevention records that contain only hashed identifiers; information we are legally required to keep; and backup copies, which are overwritten within a further {{backupDays}} days." }] },
    { id: "google", heading: "Sign in with Google", blocks: [{ type: "paragraph", text: "Removing HudaVerse from the connected apps in your Google account stops Google sign-in but does not delete the data we hold. To delete it, send a deletion request as described above." }] },
    { id: "before-you-delete", heading: "Before you delete", blocks: [
      { type: "paragraph", text: "Deletion is permanent and cannot be undone. If you only want to change or correct your information, or to stop receiving emails, write to us at {{supportEmail}} instead." },
      { type: "link", text: "Read the Privacy Policy", href: "/privacy" },
    ] },
    { id: "help", heading: "Need help?", blocks: [{ type: "paragraph", text: "Contact {{privacyEmail}}." }] },
  ],
});

export default dataDeletion;
