import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="avatar"
      src={src || "/images/placeholder.png"}
      className="rounded-full"
      height={25}
      width={25}
    />
  );
};

export default Avatar;
