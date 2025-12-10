import { User2 } from "lucide-react";
import LogoutButton from "../auth/signout";

export default function NavControls() {
  return (
    <>
      <User2 className="w-5 h-5" />
      <LogoutButton />
    </>
  );
}
