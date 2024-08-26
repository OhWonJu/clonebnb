"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center">
      <Image
        alt="logo"
        onClick={() => router.push("/")}
        className="hidden md:block cursor-pointer"
        height={25}
        width={25}
        src="/images/logo.png"
      />
      <span
        onClick={() => router.push("/")}
        className="ml-1 text-rose-400 font-bold text-xl cursor-pointer"
      >
        Clonebnb
      </span>
    </div>
  );
};

export default Logo;
