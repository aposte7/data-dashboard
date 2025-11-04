import React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef(function Textarea(
  { className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400",
        "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "min-h-[120px]",
        className,
      )}
      {...props}
    />
  );
});

export default Textarea;
