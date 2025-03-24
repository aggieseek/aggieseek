import { CURRENT_TERM } from "@/lib/utils";
import { Section, TrackedSection } from "@prisma/client";
import { create } from "zustand";

interface SectionInfo extends TrackedSection {
  section: Section;
}

export enum LoadingState {
  FETCHING,
  IDLE,
  ERROR,
  ADDING,
  REMOVING,
}

interface TrackedSectionsState {
  trackedSections: SectionInfo[];
  loadState: LoadingState;
  addSection: (crn: string) => Promise<void>;
  deleteSection: (crn: string) => Promise<void>;
  fetchSections: () => void;
  refresh: () => void;
}

const useTrackedSectionsStore = create<TrackedSectionsState>((set) => ({
  trackedSections: [],
  loadState: LoadingState.FETCHING,
  addSection: async (crn: string) => {
    const res = await fetch("/api/users/sections", {
      method: "POST",
      body: JSON.stringify({ crn, term: CURRENT_TERM }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("");
    set((state) => {
      state.refresh();
      return state;
    });
  },
  deleteSection: async (crn: string) => {
    try {
      const res = await fetch("/api/users/sections", {
        method: "DELETE",
        body: JSON.stringify({ crn, term: CURRENT_TERM }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete section");

      set((state) => ({
        trackedSections: state.trackedSections.filter(
          (section) => section.crn !== crn
        ),
      }));

      set((state) => {
        state.refresh();
        return state;
      });
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  },
  fetchSections: async () => {
    set(() => ({
      loadState: LoadingState.FETCHING,
    }));

    set((state) => {
      state.refresh();
      return state;
    });
  },
  refresh: async () => {
    const res = await fetch(`/api/users/sections?term=${CURRENT_TERM}`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Failed to fetch sections");

    const data = await res.json();
    set(() => ({
      loadState: LoadingState.IDLE,
      trackedSections: data,
    }));
  },
}));

export default useTrackedSectionsStore;
