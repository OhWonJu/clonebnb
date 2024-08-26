"use client";

import React from "react";
import { IconType } from "react-icons/lib";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  descripton: string;
}

const ListingCategory = ({
  descripton,
  icon: Icon,
  label,
}: ListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={30} className="text-neutral-600" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          <span className="text-neutral-500 font-light">{descripton}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
