"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  height?: number;
};

export function Logo({ className, height = 28 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark ? "/logo-dark.svg" : "/logo-light.svg";
  const width = Math.round((height * 570) / 162);

  return (
    <Image
      src={src}
      alt="SDViGApp"
      width={width}
      height={height}
      priority
      className={cn("block select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}
