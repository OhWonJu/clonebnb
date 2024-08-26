"use client";

import React, { useCallback } from "react";
import { IconType } from "react-icons/lib";
// import { useRouter, useSearchParams } from "next/navigation";
// import qs from "query-string";

import { cn } from "@/lib/utils";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (label: string) => void;
}

const CategoryBox = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryBoxProps) => {
  // const router = useRouter();
  // const params = useSearchParams();

  // const handleClick = useCallback(() => {
  //   let currentQuery = {};

  //   if (params) currentQuery = qs.parse(params.toString());

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     category: label,
  //   };

  //   // 카테고리 선택 해제
  //   if (params?.get("category") === label) delete updatedQuery.category;

  //   const url = qs.stringifyUrl(
  //     {
  //       url: "/",
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );

  //   router.push(url);
  // }, [label, params, router]);

  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      )}
    >
      <Icon size={24} />
      <div className="font-medium text-xs">{label}</div>
    </div>
  );
};

export default CategoryBox;
