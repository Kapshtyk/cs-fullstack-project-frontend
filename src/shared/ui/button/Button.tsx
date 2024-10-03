"use client";

import Link, { LinkProps } from "next/link";
import clsx from "clsx";

import "./Button.scss";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  disabled?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: "a";
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  children,
  variant = "primary",
  as = "button",
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const cn = clsx("button", className, {
    "button--disabled": disabled,
    "button--icon": variant === "icon",
    "button--primary": variant === "primary",
    "button--secondary": variant === "secondary",
  });

  if (as === "button") {
    return (
      <button
        type="button"
        disabled={disabled}
        {...(props as ButtonAsButton)}
        className={cn}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  } else {
    return (
      <Link
        scroll={(props as ButtonAsLink).scroll}
        {...(props as ButtonAsLink)}
        className={cn}
      >
        {children}
      </Link>
    );
  }
};
