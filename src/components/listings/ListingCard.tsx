"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import useCountries from "@/hooks/useCountries";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
  type?: "normal" | "author";
}

const ListingCard = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation,
  type = "normal",
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.location);

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [data.price, reservation]);

  const reservationData = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="__IMAGE_WRAPPER__ aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="listing"
            src={data.imageSrc}
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationData || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">nignt</div>}
        </div>
        {reservation && type === "author" && (
          <div className="flex flex-row items-center gap-1">
            guest name - {reservation.user?.name}
          </div>
        )}
        {onAction && actionLabel && (
          <div>
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
