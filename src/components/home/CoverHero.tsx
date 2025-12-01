'use client'
import Head from "next/head";
import { motion } from "framer-motion";

type Props = {
  header: string;
  subHeader: string;
  coverImg: string;
};
export default function CoverHero({ header, subHeader, coverImg }: Props) {
  return (
    <>
      <Head>
        <title>{header}</title>
        {/* Add other meta tags as needed */}
      </Head>

      <section
        className="relative min-h-screen items-center flex bg-transparent bg-cover bg-center from(--primary-dark) to-gray-800 text-black py-32 text-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.02 }}
            viewport={{ once: true }}
            className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 uppercase tracking-tight text-gray-200"
          >
            {header}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.01, delay: 0.02 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-gray-200"
          >
            {subHeader}
          </motion.p>
        </div>
      </section>
    </>
  );
}
