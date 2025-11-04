import React from "react";
import { cn } from "../../lib/utils";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "bg-primary-600 text-white shadow hover:bg-primary-700 focus-visible:ring-offset-2",
  outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
  ghost: "hover:bg-gray-100",
  secondary:
    "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-offset-2",
};

export function Button({ className, variant = "default", asChild, ...props }) {
  const Comp = asChild ? "span" : "button";
  return <Comp className={cn(base, variants[variant], className)} {...props} />;
}

export default Button;
