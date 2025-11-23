"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import ReviewStatistics from "@/components/community/ReviewStatistics";

export default function Cpage() {
    return (
      <>
      <Head>
        <title>Our Community</title>
        {/* Add other meta tags as needed */}
      </Head>

      <section className="bg-transparent from(--primary-dark) to-gray-800 text-black py-32 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 uppercase tracking-tight dark:text-white"
          >
            Our Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto dark:text-white"
          >
            Join thousands of members sharing their fitness journeys, success stories, and motivation.
          </motion.p>
          
        </div>
 
      </section>
     
      <div><ReviewStatistics /></div>
      </>
    );
};
