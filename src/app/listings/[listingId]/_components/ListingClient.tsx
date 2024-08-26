"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import useLoginModal from "@/hooks/useLoginModal";

import { CATEGORIES } from "@/components/navbar/Categories";
import Container from "@/components/Container";
import ListingHeader from "@/components/listings/ListingHeader";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const INITIAL_DATE_RANGE = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  currentUser,
  listing,
  reservations = [],
}: ListingClientProps) => {
  const openLogin = useLoginModal((state) => state.onOpen);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return openLogin();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(INITIAL_DATE_RANGE);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  }, [totalPrice, dateRange, listing?.id, router, currentUser, openLogin]);

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );

    if (dayCount && listing.price) setTotalPrice(dayCount * listing.price);
    else setTotalPrice(listing.price);
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />
          <section className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.location}
            />
            <aside className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChageDate={(value) => setDateRange(value)}
                dateRage={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </aside>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
