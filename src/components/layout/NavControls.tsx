import { User2 } from "lucide-react";
import LogoutButton from "../auth/signout";
import Link from "next/link";

export default function NavControls() {
  return (
    <>
      {/* ─── RIGHT CONTROLS ───────────────────────────────────── */}
      <div className="flex gap-2">
        <Link
          href={"/dashboard"}
          className="border rounded-full p-2 bg-accent text-indigo-600 "
        >
          <User2 className="w-5 h-5" />
        </Link>
        <LogoutButton />
      </div>
    </>
  );
}
