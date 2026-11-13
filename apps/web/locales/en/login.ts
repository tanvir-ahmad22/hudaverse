const login = {
  previewLabel: "VISUAL LAB · UI PREVIEW",
  title: "Welcome back",
  subtitle: "Sign in to continue your journey of knowledge.",
  methods: {
    email: "Email",
    phone: "Phone",
    username: "Username",
  },
  fields: {
    email: "Email address",
    phone: "Phone number",
    username: "Username",
    password: "Password",
  },
  placeholders: {
    email: "Enter your email address",
    phone: "Enter your phone number",
    username: "Enter your username",
    password: "Enter your password",
  },
  rememberMe: "Remember me",
  forgotPassword: "Forgot password?",
  loginButton: "Sign in",
  continueWith: "or continue with",
  social: {
    google: "Continue with Google",
    apple: "Continue with Apple",
    phone: "Continue with phone",
  },
  noAccount: "Don't have an account?",
  createAccount: "Create account",
  previewNotice:
    "Visual preview only. Sign-in is not connected, and no credentials are sent.",
  unavailableNotice: "This option is not connected in the visual preview.",
  forgotNotice: "Password recovery is not connected in the visual preview.",
  createNotice: "Account creation is not connected in the visual preview.",
  passwordShow: "Show password",
  passwordHide: "Hide password",
  showcase: {
    title: "The Complete Islamic Ecosystem",
    principlesTitle: "Guided by knowledge",
    imageAlt: "Illustrated mosque at sunset",
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
  methods: { email: string; phone: string; username: string };
  fields: { email: string; phone: string; username: string; password: string };
  placeholders: { email: string; phone: string; username: string; password: string };
  rememberMe: string;
  forgotPassword: string;
  loginButton: string;
  continueWith: string;
  social: { google: string; apple: string; phone: string };
  noAccount: string;
  createAccount: string;
  previewNotice: string;
  unavailableNotice: string;
  forgotNotice: string;
  createNotice: string;
  passwordShow: string;
  passwordHide: string;
  showcase: {
    title: string;
    principlesTitle: string;
    imageAlt: string;
    principles: readonly { title: string; description: string }[];
  };
}
export default login;
