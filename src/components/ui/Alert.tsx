import React from "react";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}

export function Alert({ children, variant = "default", className }: AlertProps) {
  const baseStyles = "p-4 rounded-lg border";
  const variantStyles = {
    default: "bg-blue-50 border-blue-200 text-blue-700",
    destructive: "bg-red-50 border-red-200 text-red-700"
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className || ""}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}