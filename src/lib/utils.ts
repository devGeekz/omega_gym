import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPathname(pathname: string) {
  const lastSegment = pathname.split("/").pop() || "";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


export function getMembershipMonths(joinedAt:Date, now = new Date()) {
  const start = new Date(joinedAt);

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  // If the current day is before the join day, subtract 1 month
  if (now.getDate() < start.getDate()) {
    months--;
  }

  return Math.max(0, months);
}