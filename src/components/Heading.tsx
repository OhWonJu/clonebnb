"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
  className?: string;
}

const Heading = ({ title, center, subTitle, className }: HeadingProps) => {
  return (
    <div className={cn(className, center ? "text-center" : "text-start")}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="font-light text-neutral-500 mt-2">{subTitle}</h2>
    </div>
  );
};

export default Heading;
