"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";

import useSearchModal from "@/hooks/useSearchModal";

import ModalLayout from "./ModalLayout";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    if (step <= STEPS.LOCATION) return;
    setStep((value) => value - 1);
  }, [step]);

  const onNext = useCallback(() => {
    if (step >= STEPS.INFO) return;
    setStep((value) => value + 1);
  }, [step]);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery: any = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" />
      <CountrySelect
        value={location}
        onChage={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <div className="h-[35vh] rounded-lg overflow-hidden">
        <Map center={location?.latlng} />
      </div>
    </div>
  );

  if (step === STEPS.DATE)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
          direction="vertical"
        />
      </div>
    );

  if (step === STEPS.INFO)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More infomation" />
        <Counter
          title="Guests"
          subTitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );

  return (
    <ModalLayout
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
