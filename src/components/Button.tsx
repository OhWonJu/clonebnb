"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: React.ComponentType;
  className?: string;
}

const Button = ({
  label,
  onClick = () => null,
  disabled,
  Icon,
  outline,
  small,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full`,
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",
        small
          ? "py-1 text-sm font-light border"
          : "py-3 text-md font-semibold border-2",
        className
      )}
    >
      {/* @ts-ignore */}
      {Icon && <Icon className="w-5 h-5 absolute left-4 top-3.5" />}
      {label}
    </button>
  );
};

export default Button;
