import { withLegalConfig } from "./legal.config";

const terms = withLegalConfig({
  id: "terms",
  title: "Terms of Service",
  summary: "The rules for using HudaVerse, and what you can expect from us.",
  sections: [
    { id: "agreement", heading: "Agreement", blocks: [
      { type: "paragraph", text: "These Terms of Service (\"Terms\") are an agreement between you and {{operatorName}} ({{operatorLocation}}) for your use of the HudaVerse website and platform. By creating an account or using HudaVerse you agree to these Terms and to our Privacy Policy. If you do not agree, please do not use HudaVerse." },
      { type: "link", text: "Read the Privacy Policy", href: "/privacy" },
    ] },
    { id: "eligibility", heading: "Who can use HudaVerse", blocks: [{ type: "paragraph", text: "You must be at least {{minimumAge}} years old and able to enter into a binding agreement. If you are under the age of majority where you live, use HudaVerse only with the permission of a parent or guardian." }] },
    { id: "account", heading: "Your account", blocks: [{ type: "bullets", items: ["Give accurate information when you sign up.", "Keep your password secure and do not share it.", "Tell us promptly if you suspect unauthorized access.", "You are responsible for activity on your account.", "One person, one account."] }] },
    { id: "acceptable-use", heading: "Acceptable use", blocks: [
      { type: "paragraph", text: "You agree not to:" },
      { type: "bullets", items: ["Access or try to access accounts, data or systems you are not authorized to use.", "Scrape, copy or resell the platform's content at scale.", "Interfere with the security, integrity or availability of the service.", "Upload or share unlawful, hateful, abusive or harmful content.", "Use HudaVerse to harass, deceive or harm others.", "Attempt to reverse engineer or bypass any protection or rate limit."] },
    ] },
    { id: "religious-guidance", heading: "Educational purpose and religious guidance", blocks: [{ type: "paragraph", text: "HudaVerse provides Islamic knowledge for learning and reference. It is not a fatwa and it is not a substitute for a qualified scholar. For rulings on personal matters or questions specific to your circumstances, please consult a qualified scholar. We take care to present content from reliable sources and we welcome corrections at {{supportEmail}}, but we cannot guarantee that every piece of content is free from error." }] },
    { id: "ip", heading: "Content and intellectual property", blocks: [{ type: "paragraph", text: "The HudaVerse platform, its design, software and original content belong to {{operatorName}} or its licensors. The Quran, Hadith and other source texts remain subject to the terms of their respective sources and licenses. We give you a personal, non-exclusive, non-transferable right to use HudaVerse for your own learning. This does not give you ownership of any part of the platform." }] },
    { id: "your-content", heading: "Your content", blocks: [{ type: "paragraph", text: "Notes, bookmarks and other content you create remain yours and are private to you by default. You give {{operatorName}} only the limited permission needed to store, display and back up this content for you." }] },
    { id: "availability", heading: "Free service and availability", blocks: [{ type: "paragraph", text: "HudaVerse is provided free of charge. We may add, change, suspend or discontinue features, and we do not promise that the service will always be available or free from errors. We will try to give reasonable notice of significant changes." }] },
    { id: "termination", heading: "Suspension and ending your account", blocks: [
      { type: "paragraph", text: "You can stop using HudaVerse and ask us to delete your account at any time. We may suspend or close accounts that break these Terms or put the platform or other users at risk, and we will explain why where it is reasonably possible." },
      { type: "link", text: "Account and Data Deletion", href: "/data-deletion" },
    ] },
    { id: "liability", heading: "Disclaimers and limits of liability", blocks: [{ type: "paragraph", text: "To the fullest extent permitted by law, HudaVerse is provided \"as is\" and \"as available\" without warranties of any kind, and {{operatorName}} is not liable for indirect or consequential loss arising from your use of the service. Nothing in these Terms limits any right you have under mandatory consumer protection law where you live." }] },
    { id: "governing-law", heading: "Governing law", blocks: [{ type: "paragraph", text: "These Terms are governed by the laws of {{operatorLocation}}, without affecting any mandatory rights you have under the law of your country of residence." }] },
    { id: "changes", heading: "Changes to these Terms", blocks: [{ type: "paragraph", text: "We may update these Terms from time to time. If a change is material, we will notify you and, where required, ask you to accept the new version. If you keep using HudaVerse after a change takes effect, you accept the updated Terms." }] },
    { id: "contact", heading: "Contact", blocks: [{ type: "paragraph", text: "Questions about these Terms: {{supportEmail}}." }] },
  ],
});

export default terms;
