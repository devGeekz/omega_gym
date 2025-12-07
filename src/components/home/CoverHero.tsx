"use client";
import Head from "next/head";
import { motion } from "framer-motion";

type Props = {
  header: string;
  subHeader: string;
  coverImg: string;
};

export default function CoverHero({ header, subHeader, coverImg }: Props) {
  // Function to generate the typing effect for each letter
  const typewriter = {
    hidden: { opacity: 0, width: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      width: "100%",
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
      <Head>
        <title>{header}</title>
        {/* Add other meta tags as needed */}
      </Head>

      <section
        className="relative min-h-screen items-center flex bg-transparent bg-cover bg-center text-black py-32 text-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header with typewriter effect */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-montserrat flex text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 uppercase tracking-tight text-gray-200"
          >
            {header.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={typewriter}
                custom={index}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          Subheader with typewriter effect
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg flex md:text-xl opacity-90 max-w-2xl mx-auto text-gray-200"
          >
            {subHeader}
          </motion.p>
        </div>
      </section>
    </>
  );
}
