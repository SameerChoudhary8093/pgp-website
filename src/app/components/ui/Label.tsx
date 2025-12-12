import React from "react";
import { cn } from "../utils/cn";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={cn("text-sm text-gray-700", className)} {...props} />
);
