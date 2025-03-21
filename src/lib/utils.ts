import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const CURRENT_TERM = process.env.NEXT_PUBLIC_CURRENT_TERM;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
