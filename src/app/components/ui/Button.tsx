import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", className, ...props }) => {
  const base = "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantCls =
    variant === "primary"
      ? "bg-green-700 hover:bg-green-800 text-white focus:ring-green-600"
      : variant === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
      : "border border-gray-300 hover:bg-gray-50 text-gray-800 focus:ring-gray-300";
  const sizeCls = size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-2.5" : "px-4 py-2";
  return <button className={cn(base, variantCls, sizeCls, className)} {...props} />;
};
