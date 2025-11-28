import { Chrome, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type OAuthButtonProps = {
  provider: "google" | "apple";
  label: string;
  icon: React.ReactNode;
};

export function OAuthButton({ provider, label, icon }: OAuthButtonProps) {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/buy";

  /* ----------------------------- SOCIAL LOGIN -------------------------------- */
  const socialSignIn = (provider: "google" | "github") => {
    console.log(`Redirect to ${provider}`);
    // NextAuth: signIn(provider)
  };

  return (
    <>
      <button
        onClick={() => signIn(provider, { callbackUrl })}
        className="flex items-center gap-2 w-full py-2 px-4 text-gray-900 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => socialSignIn("google")}
        >
          <Chrome size={18} />
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => socialSignIn("github")}
        >
          <Github size={18} />
          Continue with Github
        </Button>
      </div>
    </>
  );
}
