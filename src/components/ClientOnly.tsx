"use client";

import React, { useEffect, useState } from "react";

interface ClineOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClineOnlyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
