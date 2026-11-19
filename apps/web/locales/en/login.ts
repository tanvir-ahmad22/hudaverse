const login = {
  previewLabel: "Your Journey to Allah",
  title: "Welcome Back",
  subtitle: "Login to continue your spiritual journey",
  methods: {
    email: "Email",
    username: "Username",
  },
  fields: {
    email: "Email Address",
    username: "Username",
    password: "Password",
  },
  placeholders: {
    email: "Enter your email address",
    username: "Enter your username",
    password: "Enter your password",
  },
  rememberMe: "Remember me",
  forgotPassword: "Forgot Password?",
  loginButton: "Login",
  continueWith: "or continue with",
  loginWith: "or login with",
  social: {
    google: "Continue with Google",
    facebook: "Continue with Facebook",
    microsoft: "Continue with Microsoft",
  },
  noAccount: "Don't have an account?",
  createAccount: "Create Account",
  previewNotice: "This sign-in method is not available yet.",
  unavailableNotice: "This sign-in method is not available yet.",
  facebookEmailRequired: "Facebook did not provide an email address. Please sign up with your email instead.",
  facebookEmailUnverified: "Facebook could not verify this email for account linking. Sign in with your email and password instead.",
  forgotNotice: "If an account matches that email, password reset instructions have been sent.",
  submitting: "Signing you in…",
  genericFailure: "We couldn't complete sign-in. Please try again.",
  createNotice: "Account creation is not available yet.",
  passwordShow: "Show password",
  passwordHide: "Hide password",
  biometrics: "Use Biometrics",
  encryptionNote: "Your data is protected with end-to-end encryption",
  languageSelector: "Language",
  themeToggle: "Toggle theme",
  verse: {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship [will be] ease.",
    citation: "— Quran 94:6",
  },
  showcase: {
    title: "The Complete Islamic Ecosystem",
    principlesTitle: "Guided by knowledge",
    imageAlt: "Illustrated mosque at sunset",
    features: [
      { title: "Secure & Private", description: "Your data is safe with us. We use advanced encryption to protect your privacy." },
      { title: "Authentic Content", description: "Quran, Hadith and Islamic content from authentic and trusted sources." },
      { title: "AI Islamic Assistant", description: "Ask anything about Islam and get answers with Quran & Hadith references." },
      { title: "Works Offline", description: "Download content and use HudaVerse even without internet." },
    ],
    principles: [
      {
        title: "Knowledge first",
        description: "Place Islamic knowledge before technology and AI.",
      },
      {
        title: "Authentic knowledge",
        description: "Keep authentic Islamic knowledge at the foundation.",
      },
      {
        title: "Responsible technology",
        description: "Let technology support learning and discovery.",
      },
    ],
  },
} as const;

export interface LoginTranslations {
  previewLabel: string;
  title: string;
  subtitle: string;
  methods: { email: string; username: string };
  fields: { email: string; username: string; password: string };
  placeholders: { email: string; username: string; password: string };
  rememberMe: string;
  forgotPassword: string;
  loginButton: string;
  continueWith: string;
  loginWith: string;
  social: { google: string; facebook: string; microsoft: string };
  noAccount: string;
  createAccount: string;
  previewNotice: string;
  unavailableNotice: string;
  facebookEmailRequired: string;
  facebookEmailUnverified: string;
  forgotNotice: string;
  submitting: string;
  genericFailure: string;
  createNotice: string;
  passwordShow: string;
  passwordHide: string;
  biometrics: string;
  encryptionNote: string;
  languageSelector: string;
  themeToggle: string;
  verse: { arabic: string; translation: string; citation: string };
  showcase: {
    title: string;
    principlesTitle: string;
    imageAlt: string;
    features: readonly { title: string; description: string }[];
    principles: readonly { title: string; description: string }[];
  };
}
export default login;
