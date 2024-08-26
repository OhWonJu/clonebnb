"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  value?: string;
}

const Input = ({
  errors,
  id,
  label,
  register,
  disabled,
  formatPrice,
  required,
  type,
  className,
  value,
}: InputProps) => {
  return (
    <div className={cn(className, "w-fill relative")}>
      {formatPrice && (
        <DollarSign className="w-4 h-4 text-neutral-700 absolute top-5 left-2" />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        value={value}
        type={type}
        className={cn(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          formatPrice ? "pl-9" : "pl-4",
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        )}
      />
      <label
        className={cn(
          "absolute text-md duration-150 transfrom -translate-y-3 top-4 z-10 origin-[0]",
          formatPrice ? "left-9" : "left-4",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          errors[id] ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
