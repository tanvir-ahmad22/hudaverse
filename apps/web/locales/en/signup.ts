const signup = {
  brandTagline: "Knowledge · Guidance · Peace",
  language: "Language",
  alreadyAccount: "Already have an account?",
  signIn: "Sign In",
  hero: {
    join: "Join",
    brand: "HudaVerse",
    subtitle: "Begin Your Journey",
    with: "with",
    knowledge: "Divine Knowledge",
    paragraph: "Access Quran, Hadith, Islamic knowledge, and powerful learning tools — all in one place.",
    features: [
      { title: "Quran & Hadith", description: "Read, learn and reflect" },
      { title: "Islamic Learning", description: "Deepen your knowledge" },
      { title: "AI Assistant", description: "Get trusted guidance" },
      { title: "Global Community", description: "Connect and grow together" },
    ],
    quote: "Seek knowledge, for it is a light that never fades.",
    quoteBy: "— HudaVerse",
    languages: "Languages",
  },
  card: { title: "Create Account", subtitle: "Start your journey in the HudaVerse ecosystem" },
  fields: {
    fullName: "Full Name *", fullNamePlaceholder: "Enter your full name",
    email: "Email Address *", emailPlaceholder: "you@example.com",
    password: "Password *", passwordPlaceholder: "Create a strong password",
    confirm: "Confirm Password *", confirmPlaceholder: "Confirm your password",
    dob: "Date of Birth (Optional)", dobPlaceholder: "Select your date of birth",
    country: "Country / Region", countryPlaceholder: "Select your country",
    countrySearch: "Search countries", countryEmpty: "No countries found", showPassword: "Show password", hidePassword: "Hide password",
    interests: "Select Your Interest(s) (Optional)", interestsPlaceholder: "Choose one or more interests",
  },
  interests: { quran: "Quran", hadith: "Hadith", fiqh: "Fiqh", tafsir: "Tafsir", islamicHistory: "Islamic History", others: "Others" },
  strength: { label: "Password strength", weak: "Weak", fair: "Fair", strong: "Strong" },
  terms: { before: "I agree to the", and: "and", service: "Terms of Service", privacy: "Privacy Policy", required: "Please accept the Terms of Service and Privacy Policy to continue." },
  submit: "Create Account",
  submitting: "Creating your account…",
  continueWith: "or continue with",
  social: { google: "Continue with Google", microsoft: "Continue with Microsoft", facebook: "Continue with Facebook" },
  securityNote: "Your information is safe and secure with HudaVerse.",
  errors: {
    required: "Complete the required fields and try again.",
    mismatch: "Passwords do not match.",
    weak: "Choose a password with at least 10 characters that is not commonly used.",
    rateLimit: "Too many attempts. Please wait before trying again.",
    unavailable: "This sign-up method is not available yet.",
    general: "We couldn't create your account. Please try again.",
    email: "Enter a valid email address.",
  },
  success: { title: "Check your email", body: "If an account can be created for this address, verification instructions will be sent to your inbox. Follow the link to finish creating your account.", back: "Back to sign in" },

} as const;

export interface SignupTranslations {
  brandTagline: string; language: string; alreadyAccount: string; signIn: string;
  hero: { join: string; brand: string; subtitle: string; with: string; knowledge: string; paragraph: string; features: readonly { title: string; description: string }[]; quote: string; quoteBy: string; languages: string };
  card: { title: string; subtitle: string };
  fields: { fullName: string; fullNamePlaceholder: string; email: string; emailPlaceholder: string; password: string; passwordPlaceholder: string; confirm: string; confirmPlaceholder: string; dob: string; dobPlaceholder: string; country: string; countryPlaceholder: string; countrySearch: string; countryEmpty: string; interests: string; interestsPlaceholder: string; showPassword: string; hidePassword: string };
  interests: { quran: string; hadith: string; fiqh: string; tafsir: string; islamicHistory: string; others: string };
  strength: { label: string; weak: string; fair: string; strong: string };
  terms: { before: string; and: string; service: string; privacy: string; required: string };
  submit: string; submitting: string; continueWith: string; social: { google: string; microsoft: string; facebook: string }; securityNote: string;
  errors: { required: string; mismatch: string; weak: string; rateLimit: string; unavailable: string; general: string; email: string };
  success: { title: string; body: string; back: string };
}
export default signup;
