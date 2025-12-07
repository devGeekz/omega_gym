"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

function UnlockSection() {
  return (
    <div className="w-full py-20 lg:py-40 overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          {/* Left Side - Text */}
          <motion.div
            className="flex gap-4 flex-col"
            initial={{ opacity: 0, x: -100 }} // Starts from the left
            whileInView={{ opacity: 1, x: 0 }} // Animates to its final position
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
              delay: 0.5,
            }}
          >
            <div>
              <Badge variant="outline">Start Today</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Unlock Your Peak Potential at Omega
              </h1>
              <p className="md:text-xl text-base leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Join Omega Gym and embark on a transformative fitness journey
                tailored to your goals. Experience state-of-the-art facilities,
                expert trainers, and a supportive community dedicated to helping
                you achieve your best self.
              </p>
            </div>
            <Button size="lg" className="gap-4 w-fit" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="bg-muted rounded-md aspect-square"
            initial={{ opacity: 0, x: 100 }} // Starts from the right
            whileInView={{ opacity: 1, x: 0 }} // Animates to its final position
            transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
          >
            <img
              src="/images/dunk.jpg"
              alt="hero image"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { UnlockSection };
