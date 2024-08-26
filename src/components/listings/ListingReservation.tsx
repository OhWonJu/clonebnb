"use client";

import { Range } from "react-date-range";

import Calender from "../inputs/Calender";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  dateRage: Range;
  totalPrice: number;
  onChageDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  dateRage,
  disabledDates,
  onChageDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-2xl font-semibold">$ {price}</span>
        <span className="font-light text-neutral-600">per night</span>
      </div>
      <hr />
      <Calender
        value={dateRage}
        disabledDates={disabledDates}
        onChange={(value) => onChageDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
