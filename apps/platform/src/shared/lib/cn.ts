// Copied from apps/web/lib/utils.ts on 2026-11-10. Keep in sync until moved to packages/ui.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
