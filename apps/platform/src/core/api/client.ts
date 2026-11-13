import { env } from "../config/env";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export type ApiClientHandlers = {
  getAccessToken: () => string | null;
  refreshAccessToken: () => Promise<string | null>;
  onAuthFailure: () => void;
};

export type ApiRequestOptions = Omit<
  RequestInit,
  "body" | "headers" | "credentials"
> & {
  body?: unknown;
  headers?: Record<string, string>;
  /** No Authorization header and no refresh-and-retry (login, refresh, public calls). */
  anonymous?: boolean;
};

let handlers: ApiClientHandlers | null = null;

/** Registered once by core/session, which keeps core/api independent of core/session. */
export function configureApiClient(next: ApiClientHandlers | null): void {
  handlers = next;
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  return response.json().catch(() => undefined);
}

function messageFrom(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body) {
    const { message } = body as { message: unknown };
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.every((m) => typeof m === "string")) {
      return message.join(", ");
    }
  }
  return fallback;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const { anonymous = false, body, headers, ...init } = options;

  const execute = (token: string | null) =>
    fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let response = await execute(
    anonymous ? null : (handlers?.getAccessToken() ?? null),
  );

  if (response.status === 401 && !anonymous && handlers) {
    const freshToken = await handlers.refreshAccessToken();
    if (freshToken) {
      response = await execute(freshToken);
    } else {
      handlers.onAuthFailure();
    }
  }

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      messageFrom(data, response.statusText),
      data,
    );
  }

  return data as T;
}
