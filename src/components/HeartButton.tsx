"use client";

import useFavorite from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <Heart
        className={cn(
          "stroke-none absolute -top-[2px] -right-[2px]",
          hasFavorited ? "fill-rose-500" : "stroke-white/50 fill-neutral-700/70"
        )}
      />
    </div>
  );
};

export default HeartButton;
