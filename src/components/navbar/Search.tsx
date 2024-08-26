"use client";

import { SearchIcon } from "lucide-react";
import React, { useMemo } from "react";
import { differenceInDays } from "date-fns";

import useSearchModal from "@/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";

const Search = () => {
  const searchOpen = useSearchModal((state) => state.onOpen);
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationlabel = useMemo(() => {
    if (!locationValue) return "Anywhere";

    return getByValue(locationValue as string)?.label;
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (!(startDate && endDate)) return "Any Week";

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    let diff = differenceInDays(end, start);
    if (diff === 0) diff = 1;

    return `${diff} Days`;
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (!guestCount) return "Add Guests";

    if (+guestCount === 1) return `${guestCount} guest`;
    return `${guestCount} guests`;
  }, [guestCount]);

  return (
    <div
      onClick={searchOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationlabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <SearchIcon className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
