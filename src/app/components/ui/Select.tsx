import React from "react";
import { cn } from "../utils/cn";

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...props }) => (
  <select className={cn("border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600", className)} {...props}>
    {children}
  </select>
);
