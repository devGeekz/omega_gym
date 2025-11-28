/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { auth } from "auth";
import { User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function Avatar() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const image = session.user.image;
  return (
    <>
      <Link href={"/dashboard"}>
        <Button
          variant="default"
          className="bg-muted-foreground h-9 w-9 rounded-full p-0.5"
        >
          {image ? (
            <img
              src={image}
              alt="User Avatar"
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            <User2 className="w-6 h-6 text-muted mx-auto my-auto" />
          )}
        </Button>
      </Link>
    </>
  );
}
