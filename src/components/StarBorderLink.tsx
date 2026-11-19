import type { ComponentPropsWithoutRef } from "react";

export default function StarBorderLink({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className={className ? `star-border ${className}` : "star-border"}
    >
      {children}
      <span className="star-border-track" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </a>
  );
}
