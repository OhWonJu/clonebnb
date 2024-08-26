"use client";

import React from "react";
import Select from "react-select";

import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  flag: string;
  label: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChage: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChage }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChage(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-c0l items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-2 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#FFE4E6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
