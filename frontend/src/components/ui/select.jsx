import React from "react";
import { cn } from "../../lib/utils";

export const Select = React.forwardRef(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
        "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export default Select;
