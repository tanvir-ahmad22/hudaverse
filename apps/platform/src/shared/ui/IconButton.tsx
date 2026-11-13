// Copied from apps/web/components/ui/IconButton.tsx on 2026-11-10. Keep in sync until moved to packages/ui.
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonVariant = "default" | "filled" | "gold" | "ring";
export type IconButtonSize = "sm" | "lg" | "utility";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "aria-label"
> & {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export function IconButton({
  icon,
  label,
  variant = "default",
  size,
  type = "button",
  disabled = false,
  ...buttonProps
}: IconButtonProps) {
  const className = clsx(
    "hv-icon-btn",
    variant !== "default" && `hv-icon-btn--${variant}`,
    size && `hv-icon-btn-${size}`,
  );

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={className}
      aria-label={label}
    >
      {icon}
    </button>
  );
}
