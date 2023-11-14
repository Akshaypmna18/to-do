import * as React from "react";

import { cn } from "../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[calc(3rem+1vw)] w-full max-w-[25rem] border-b border-inpt bg-transparent px-3 py-1 text-[calc(1rem+1vw)] shadow transition-colors file:border-0 file:bg-transparent file:text-[calc(1rem+1vw)] file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
