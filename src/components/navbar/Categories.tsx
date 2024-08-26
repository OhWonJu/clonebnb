"use client";

import React, { useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import qs from "query-string";

import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

import Container from "../Container";
import CategoryBox from "./CategoryBox";

export const CATEGORIES = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is close to the Windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has arctic activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get("category");
  const isMainPage = pathname === "/";

  const targetRef = useRef<HTMLDivElement>(null);

  const isGrabbing = useHorizontalScroll(targetRef);

  const handleClick = (label: string) => {
    if (isGrabbing) return;

    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // 카테고리 선택 해제
    if (params?.get("category") === label) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        ref={targetRef}
        className="pt-2 flex flex-row items-center justify-between overflow-x-scroll select-none"
      >
        {CATEGORIES.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            // description={item.description}
            selected={category === item.label}
            icon={item.icon}
            onClick={handleClick}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
