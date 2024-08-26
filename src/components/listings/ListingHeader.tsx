"use client";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHeader = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}: ListingHeaderProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <header className="flex flex-col gap-6">
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="__IMAGE_WRAPPER__ w-full h-[60vh] overflow-hidden rounded-lg relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
};

export default ListingHeader;
