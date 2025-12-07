/* eslint-disable @next/next/no-img-element */
"use client";

import useParallax from "@/hooks/useParallax";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export function ParallaxSection({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="img-container">
      <div ref={ref}>
        <img src={`/images/cardio.jpg`} alt="A London skyscraper" />
      </div>
      <motion.h2
        // Hide until scroll progress is measured
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >{`#00${id}`}</motion.h2>
    </section>
  );
}
