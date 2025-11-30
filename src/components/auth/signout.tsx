"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { CirclePower } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      variant={"outline"}
      onClick={() => signOut({ callbackUrl: "/" })}
      className="border rounded-full p-2 bg-rose-100 text-rose-600 hover:bg-destructive hover:text-rose-200"
    >
      <CirclePower className="w-5 h-5" />
    </Button>
  );
}
