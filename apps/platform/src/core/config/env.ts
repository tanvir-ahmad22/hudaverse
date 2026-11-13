const isProduction = process.env.NODE_ENV === "production";

export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    (isProduction ? "" : "http://localhost:3001"),
} as const;
export const AVAILABLE_ROUTES = ["/dashboard"] as const;

export function isAvailableRoute(route: string): boolean {
  return (AVAILABLE_ROUTES as readonly string[]).includes(route);
}
