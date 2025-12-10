"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, CreditCard } from "lucide-react";

interface DashboardHeaderProps {
  subscriptionStatus?: string; // e.g. "Pro", "Premium", "Free Plan"
}

export function DashboardHeader({
  subscriptionStatus = "View Plan",
}: DashboardHeaderProps) {
  const { data: session } = useSession();

  const displayName = session?.user?.name || session?.user?.email || "User";

  const userInitials = session?.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isPremium =
    subscriptionStatus.toLowerCase().includes("pro") ||
    subscriptionStatus.toLowerCase().includes("premium");

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* LEFT: Greeting */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white leading-tight">
          Welcome back,
          <span className="ml-2 capitalize">{displayName} 👋</span>
        </h1>

        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Lets make today productive.
        </p>
      </div>

      {/* RIGHT: Subscription Badge + Avatar */}
      <div className="flex items-center gap-4">
        {/* Premium or Free Badge */}
        <Link
          href="/subscription"
          className={`
            flex items-center gap-2 text-sm font-medium transition
            px-3 py-1.5 rounded-md shadow-sm
            ${
              isPremium
                ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:opacity-90"
                : "text-primary hover:text-primary/70"
            }
          `}
        >
          {isPremium ? (
            <Crown className="w-4 h-4 fill-white text-white" />
          ) : (
            <CreditCard className="w-4 h-4" />
          )}

          {/* Text hidden on very small screens */}
          <span className="hidden sm:inline">{subscriptionStatus}</span>
        </Link>

        {/* Avatar */}
        <Avatar className="h-12 w-12 ring-1 ring-border shadow">
          <AvatarImage
            src={session?.user?.image || "/placeholder.png"}
            alt={`${displayName} avatar`}
          />
          <AvatarFallback>
            {userInitials || displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  );
}
