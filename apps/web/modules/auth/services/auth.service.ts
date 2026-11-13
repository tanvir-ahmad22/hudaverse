const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type AuthResponse = {
  accessToken?: string;
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

export async function signIn(email: string, password: string) {
  const result = await postAuth("login", { email, password });
  if (!result.accessToken) throw new Error("Sign-in response was incomplete. Please try again.");
  window.sessionStorage.setItem("hudaverse_access_token", result.accessToken);
  return result;
}

export async function requestPasswordReset(email: string) {
  return postAuth("forgot-password", { email });
}
