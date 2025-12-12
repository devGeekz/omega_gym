"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  const { data: session } = useSession();

  const displayName = session?.user?.name || session?.user?.email || "User";
  const userInitials = session?.user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex items-center justify-between gap-4 px-4 py-5 bg-white dark:bg-zinc-800 rounded-md shadow-sm"
    >
      {/* LEFT: Greeting */}
      <div className="flex flex-col">
        <h1 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
          Welcome back, <span className="capitalize text-teal-600">{displayName}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Make today count.</p>
      </div>

      {/* RIGHT: Avatar */}
      <div className="flex items-center">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-teal-500 shadow-md">
          <AvatarImage
            src={session?.user?.image || "/placeholder.png"}
            alt={`${displayName} avatar`}
            className="rounded-full"
          />
          <AvatarFallback>
            {userInitials || displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  );
}
