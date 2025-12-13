"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface LogoutButtonProps {
  icons?: ReactNode;
  text?: string;
}

export default function LogoutButton({ icons, text }: LogoutButtonProps) {
  return (
    <Button variant={"ghost"} onClick={() => signOut({ callbackUrl: "/login" })}>
      {icons && icons}
      {text && text}
    </Button>
  );
}
