import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "border-accent bg-accent text-accent-foreground hover:bg-accent-hover hover:border-accent-hover",
  outline: "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
  ghost: "border-transparent bg-transparent text-foreground hover:text-accent",
};

type ActionProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
};

export function ActionLink({
  children,
  className,
  variant = "primary",
  ...props
}: ActionProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "inline-flex h-12 items-center justify-center border px-7 text-[15px] font-semibold transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function IconButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "grid size-11 shrink-0 place-items-center text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}