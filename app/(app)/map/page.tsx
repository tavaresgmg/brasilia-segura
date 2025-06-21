"use client";

import { BrasiliaMap } from "@/components/features/BrasiliaMap";

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-128px)] -mx-4 -mt-4">
      <BrasiliaMap />
    </div>
  );
}