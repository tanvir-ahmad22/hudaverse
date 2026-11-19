import { withLegalConfig } from "./legal.config";

const privacy = withLegalConfig({
  id: "privacy",
  title: "Privacy Policy",
  summary: "How HudaVerse collects, uses and protects your personal data, and the choices you have.",
  sections: [
    { id: "about", heading: "About this policy", blocks: [{ type: "paragraph", text: "This Privacy Policy explains what personal data {{operatorName}} ({{operatorLocation}}) collects when you use the HudaVerse website and platform, why we collect it, how we protect it, and the choices you have. By creating an account you confirm that you have read it." }] },
    { id: "data-we-collect", heading: "Data we collect", blocks: [
      { type: "paragraph", text: "We collect only what we need to run HudaVerse." },
      { type: "definitions", items: [
        { term: "Account data", description: "Your name, email address and password. We never store your password in plain text; we store only a secure one-way hash." },
        { term: "Profile data", description: "Your country, preferred language, time zone and interests, and your date of birth if you choose to provide it." },
        { term: "Consent records", description: "Which version of the Terms and Privacy Policy you accepted, and when." },
        { term: "Security and session data", description: "When you sign in we record your IP address, browser, device and operating system so we can show your active sessions and protect your account." },
        { term: "Abuse-prevention data", description: "Failed sign-in, sign-up and password-reset attempts, kept as hashed identifiers together with your IP address, so we can block automated attacks." },
        { term: "Sign in with Google", description: "If you choose this option we receive your name, email address and a Google account identifier. We do not receive your Google password." },
        { term: "Your content", description: "Notes, bookmarks and reading history you create on the platform. These are private to you by default." },
      ] },
    ] },
    { id: "what-we-do-not-do", heading: "What we do not do", blocks: [{ type: "bullets", items: [
      "We do not sell your personal data.", "We do not show advertisements.", "We do not use advertising or tracking cookies, and we do not use third-party analytics on the public website.", "We do not use your private notes, bookmarks or history for advertising.",
    ] }] },
    { id: "how-we-use-data", heading: "How we use your data", blocks: [{ type: "bullets", items: [
      "Create and secure your account.", "Sign you in and keep you signed in.", "Send verification and password-reset emails.", "Remember your language and preferences.", "Detect and prevent abuse and unauthorized access.", "Meet legal obligations and respond to lawful requests.",
    ] }] },
    { id: "cookies", heading: "Cookies and local storage", blocks: [{ type: "paragraph", text: "We use only strictly necessary storage. After you sign in we set two cookies, an access cookie and a refresh cookie. Both are HttpOnly, which means scripts on the page cannot read them, and they exist only to keep you signed in. We store your language choice in your browser's local storage. We do not use tracking or advertising cookies, so no cookie banner is needed. You can clear cookies and local storage at any time in your browser settings; you will then be signed out and the language will reset." }] },
    { id: "sharing", heading: "Who we share data with", blocks: [
      { type: "paragraph", text: "We do not sell or rent your data. We share it only with service providers that help us run HudaVerse, and only as needed:" },
      { type: "bullets", items: ["A cloud hosting provider that stores our application and database.", "An email delivery provider that sends verification and password-reset emails.", "Google, only if you choose Sign in with Google."] },
      { type: "paragraph", text: "These providers act on our instructions and are bound by confidentiality and security obligations. We may also disclose information when required by law or to protect the rights and safety of our users and platform." },
    ] },
    { id: "transfers", heading: "International transfers", blocks: [{ type: "paragraph", text: "HudaVerse is available worldwide. Our providers may process data in countries other than the one you live in. Where required, we use appropriate safeguards for such transfers." }] },
    { id: "retention", heading: "How long we keep data", blocks: [
      { type: "paragraph", text: "We keep your account data while your account is active. If you ask us to delete your account, we delete your personal data within {{deletionDays}} days. Backups may keep a copy for up to a further {{backupDays}} days before they are overwritten. Security and abuse-prevention records that contain only hashed identifiers may be kept for a limited period to protect the platform." },
      { type: "link", text: "How to request deletion", href: "/data-deletion" },
    ] },
    { id: "your-rights", heading: "Your rights", blocks: [{ type: "paragraph", text: "You can ask us to: access the personal data we hold about you; correct inaccurate data; delete your data; give you a copy of your data in a common format; restrict or object to certain processing. To make a request, email {{privacyEmail}} from the email address of your account. We may need to verify your identity first. Depending on where you live, you may also have the right to lodge a complaint with your local data protection authority." }] },
    { id: "children", heading: "Children", blocks: [{ type: "paragraph", text: "HudaVerse is not intended for children under {{minimumAge}}. We do not knowingly collect personal data from children under {{minimumAge}}. If you believe a child has given us personal data, contact {{privacyEmail}} and we will delete it." }] },
    { id: "security", heading: "Security", blocks: [{ type: "paragraph", text: "We protect your data with industry-standard measures, including password hashing, encrypted connections (HTTPS), HttpOnly session cookies, rate limiting and access controls. No online service can be perfectly secure, so please use a strong, unique password and tell us right away if you suspect unauthorized access." }] },
    { id: "changes", heading: "Changes to this policy", blocks: [{ type: "paragraph", text: "If we make a meaningful change to this policy, we will update the date at the top and notify you on the platform or by email before the change takes effect." }] },
    { id: "contact", heading: "Contact us", blocks: [{ type: "paragraph", text: "Questions about this policy or your data: {{privacyEmail}}. General support: {{supportEmail}}." }] },
  ],
});

export default privacy;
