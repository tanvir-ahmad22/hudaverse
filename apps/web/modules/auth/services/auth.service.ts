const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type AuthResponse = {
  message?: string;
};

export class AuthServiceError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

async function postAuth<T extends AuthResponse>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Unable to reach HudaVerse. Check your connection and try again.");
  }

  const result = (await response.json().catch(() => ({}))) as T & { message?: string | string[] };
  if (!response.ok) {
    const message = Array.isArray(result.message) ? result.message[0] : result.message;
    throw new AuthServiceError(message || "We couldn't complete your request. Please try again.", response.status);
  }
  return result;
}

export async function signIn(identifier: string, password: string, rememberMe = false) {
  return postAuth("login", { identifier, password, rememberMe });
}

export async function requestPasswordReset(email: string) {
  return postAuth("forgot-password", { email });
}

export type AuthProviders = {
  identifiers: string[];
  password: boolean;
  google: boolean;
  microsoft: boolean;
  facebook: boolean;
  passkeys: boolean;
};

export async function getAuthProviders(): Promise<AuthProviders> {
  const response = await fetch(`${API_BASE_URL}/auth/providers`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Sign-in methods are temporarily unavailable.");
  return response.json() as Promise<AuthProviders>;
}

export function startOAuth(provider: "google" | "facebook" | "microsoft") {
  window.location.assign(`${API_BASE_URL}/auth/oauth/${provider}`);
}

export function requestPasskeySignIn() {
  return postAuth("passkeys/authentication/options", {});
}

export type RegisterAccountInput = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  country?: string;
  interests: string[];
  termsAccepted: true;
  locale: string;
};

export function registerAccount(input: RegisterAccountInput) {
  return postAuth("register", input);
}

export function resetPassword(token: string, newPassword: string) {
  return postAuth("reset-password", { token, newPassword });
}

export function verifyEmail(token: string) {
  return postAuth("verify-email", { token });
}
