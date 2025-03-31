import { Term } from "@/lib/types/course-types";
import { create } from "zustand";

interface TrackedSectionsState {
  terms: Term[];
  activeTerms: Term[];
  isLoading: boolean;

  setTerms: (terms: Term[]) => void;
  fetchTerms: () => Promise<void>;
}

function isDateInRange(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();

  const lowerLimit = new Date(today);
  lowerLimit.setMonth(today.getMonth() - 1);

  const upperLimit = new Date(today);
  upperLimit.setMonth(today.getMonth() + 8);

  return date >= lowerLimit && date <= upperLimit;
}

const useTermsStore = create<TrackedSectionsState>((set) => ({
  terms: [],
  activeTerms: [],
  isLoading: false,
  setTerms: (terms) => {
    set({
      terms: terms,
      activeTerms: terms.filter((term: Term) => isDateInRange(term.startDate)),
    });
  },
  fetchTerms: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/data/terms");
      const data = await response.json();
      set({
        terms: data,
        activeTerms: data.filter((term: Term) => isDateInRange(term.startDate)),
        isLoading: false,
      });
    } catch {
      set({ terms: [], isLoading: false });
    }
  },
}));

export default useTermsStore;
