// Copied from apps/web/components/ui/Button.tsx on 2026-11-10. Keep in sync until moved to packages/ui.
import { clsx } from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "primary-outline"
  | "secondary-outline"
  | "on-dark"
  | "tertiary"
  | "ghost"
  | "gold"
  | "feature"
  | "soft"
  | "small";

export type ButtonScale = "sm" | "lg";

type ButtonOptions = {
  variant?: ButtonVariant;
  scale?: ButtonScale;
  fullWidth?: boolean;
};

type NativeButtonProps = ButtonOptions &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

type LinkButtonProps = ButtonOptions &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
    disabled?: never;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function buttonClassName(
  variant: ButtonVariant = "primary",
  scale?: ButtonScale,
  fullWidth = false,
) {
  return clsx(
    "hv-btn",
    `hv-btn-${variant}`,
    scale && `hv-btn-${scale}`,
    fullWidth && "hv-btn-full-width",
  );
}

export function Button(props: ButtonProps) {
  if (typeof props.href === "string") {
    const { href, variant, scale, fullWidth, children, ...anchorProps } = props;

    return (
      <Link
        {...anchorProps}
        href={href}
        className={buttonClassName(variant, scale, fullWidth)}
      >
        {children}
      </Link>
    );
  }

  const {
    variant,
    scale,
    fullWidth,
    type = "button",
    disabled = false,
    children,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={buttonClassName(variant, scale, fullWidth)}
    >
      {children}
    </button>
  );
}
