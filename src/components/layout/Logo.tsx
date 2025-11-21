import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="relative flex items-center justify-center w-8 h-8">
        <span className="absolute inset-0 rounded-full bg-linear-to-br from-primary/80 to-primary" />
        <span className="relative text-primary-foreground font-bold text-sm">
          L
        </span>
      </span>

      <span className="ml-2 hidden text-lg font-semibold text-foreground sm:inline">
        Omega
      </span>
    </Link>
  );
}
