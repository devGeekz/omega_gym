"use client";

import React from "react";

export const BackgroundComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col grow w-full relative bg-white dark:bg-black">
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, #FFF991 0%, transparent 70%)
      `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
};