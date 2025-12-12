"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CoverHeroProps {
  header: string;
  subHeader: string;
  coverImg: string;
  alt?: string;
}

// Import the correct easing functions
import { easeOut } from "framer-motion";

// Typewriter animation variants for smoother performance
const TYPEWRITER_VARIANTS = {
  hidden: { opacity: 0, width: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    width: "auto",
    transition: { delay: custom * 0.08, duration: 0.6, ease: easeOut }, // Using easeOut from framer-motion
  }),
};

// Memoized animated character for typewriter effect
const AnimatedChar = memo(
  ({ char, index }: { char: string; index: number }) => (
    <motion.span
      variants={TYPEWRITER_VARIANTS}
      custom={index}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
);
AnimatedChar.displayName = "AnimatedChar";

// CoverHero component - optimized with minimal re-renders and improved structure
export const CoverHero = memo(function CoverHero({
  header,
  subHeader,
  coverImg,
  alt = "Cover background",
}: CoverHeroProps) {
  const headerChars = useMemo(() => header.split(""), [header]);

  // Validate required props
  if (!header || !subHeader || !coverImg) {
    console.warn(
      "CoverHero: Missing required props (header, subHeader, or coverImg)"
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900 dark:bg-black">
      {/* Background Image (Next.js Image for optimization) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={coverImg}
          alt={alt}
          fill
          className="object-cover"
          priority={false}
          quality={85}
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80 opacity-60" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 lg:py-32 text-center">
        {/* Header with typewriter effect */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight uppercase tracking-widest text-white dark:text-gray-50 drop-shadow-lg mb-6 sm:mb-8"
        >
          {headerChars.map((char, index) => (
            <AnimatedChar key={`${char}-${index}`} char={char} index={index} />
          ))}
        </motion.h1>

        {/* Subheader with fade-in effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-100 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          {subHeader}
        </motion.p>
      </div>
    </section>
  );
});

CoverHero.displayName = "CoverHero";
