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
  DELETING,
}

interface TrackedSectionsState {
  trackedSections: SectionInfo[];
  loadState: LoadingState;
  addSection: (crn: string, term: string) => Promise<void>;
  deleteSection: (crn: string, term: string) => Promise<void>;
  deleteSectionImmediately: (crn: string, term: string) => Promise<void>;
  fetchSections: (term: string) => void;
  refresh: (term: string) => void;
}

const useTrackedSectionsStore = create<TrackedSectionsState>((set) => ({
  trackedSections: [],
  loadState: LoadingState.FETCHING,
  addSection: async (term: string, crn: string) => {
    set({ loadState: LoadingState.ADDING });

    try {
      const res = await fetch("/api/users/sections", {
        method: "POST",
        body: JSON.stringify({ crn, term }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to add section.");
      set((state) => {
        state.refresh(term);
        return state;
      });
    } catch (error) {
      console.error("Error adding section:", error);
      set({ loadState: LoadingState.IDLE });
      throw error;
    }
  },
  deleteSectionImmediately: async (term: string, crn: string) => {
    set({ loadState: LoadingState.DELETING });

    try {
      const res = await fetch("/api/users/sections", {
        method: "DELETE",
        body: JSON.stringify({ crn, term }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete section.");

      set((state) => ({
        trackedSections: state.trackedSections.filter(
          (section) => section.crn !== crn
        ),
      }));

      set((state) => {
        state.refresh(term);
        return state;
      });
    } catch (error) {
      console.error("Error adding section:", error);
      set({ loadState: LoadingState.IDLE });
      throw error;
    }
  },
  deleteSection: async (term: string, crn: string) => {
    set({ loadState: LoadingState.DELETING });

    try {
      const res = await fetch("/api/users/sections", {
        method: "DELETE",
        body: JSON.stringify({ crn, term }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete section.");

      set((state) => {
        state.refresh(term);
        return state;
      });
    } catch (error) {
      console.error("Error adding section:", error);
      set({ loadState: LoadingState.IDLE });
      throw error;
    }
  },
  fetchSections: async (term: string) => {
    set(() => ({
      loadState: LoadingState.FETCHING,
    }));

    set((state) => {
      state.refresh(term);
      return state;
    });
  },
  refresh: async (term: string) => {
    try {
      const res = await fetch(`/api/users/sections?term=${term}`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch sections.");

      const data = await res.json();
      set({
        loadState: LoadingState.IDLE,
        trackedSections: data,
      });
    } catch (error) {
      console.error(error);
      set({ loadState: LoadingState.ERROR });
    }
  },
}));

export default useTrackedSectionsStore;
