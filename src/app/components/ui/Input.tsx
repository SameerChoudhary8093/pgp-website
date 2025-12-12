import React from "react";
import { cn } from "../utils/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600", className)} {...props} />
  )
);
Input.displayName = "Input";
