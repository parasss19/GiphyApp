import React from "react";

const GifSkeleton = () => (
  <div className="relative w-full aspect-video rounded bg-gray-700/60 animate-pulse" />
);

export const GifGridSkeleton = ({ count = 12, className = "" }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <GifSkeleton key={i} />
    ))}
  </div>
);

export default GifSkeleton;
