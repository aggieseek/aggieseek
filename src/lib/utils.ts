import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const seasonMapping: Record<string, string> = {
  "11": "Spring",
  "21": "Summer",
  "31": "Fall"
};

export const CURRENT_TERM = process.env.NEXT_PUBLIC_CURRENT_TERM;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTermCode(termCode: string) {
  const year = termCode.slice(0, 4);
  const season = termCode.slice(4);

  return `${seasonMapping[season]} ${year}`;
}