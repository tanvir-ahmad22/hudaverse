const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type AuthResponse = {
  message?: string;
};

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
    throw new Error(message || "We couldn't complete your request. Please try again.");
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
  apple: boolean;
  phoneOtp: boolean;
  passkeys: boolean;
};

export async function getAuthProviders(): Promise<AuthProviders> {
  const response = await fetch(`${API_BASE_URL}/auth/providers`, {
    credentials: "include",
    cache: "force-cache",
  });
  if (!response.ok) throw new Error("Sign-in methods are temporarily unavailable.");
  return response.json() as Promise<AuthProviders>;
}

export function startOAuth(provider: "google" | "apple") {
  return postAuth(`oauth/${provider}`, {});
}

export function requestPhoneSignIn(phone: string) {
  return postAuth("phone/otp", { phone });
}

export function requestPasskeySignIn() {
  return postAuth("passkeys/authentication/options", {});
}

export function registerAccount(input: { name: string; email: string; username: string; password: string }) {
  return postAuth("register", input);
}

export function resetPassword(token: string, newPassword: string) {
  return postAuth("reset-password", { token, newPassword });
}

export function verifyEmail(token: string) {
  return postAuth("verify-email", { token });
}
