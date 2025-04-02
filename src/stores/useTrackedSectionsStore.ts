import { Section, TrackedSection } from "@prisma/client";
import { toast } from "sonner";
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
  addSection: (term: string, crn: string) => Promise<void>;
  deleteSection: (term: string, crn: string) => Promise<void>;
  deleteSectionImmediately: (term: string, crn: string) => Promise<void>;
  fetchSections: (term: string) => void;
  refresh: (term: string) => void;
  toggleSms: (term: string, crn: string) => void;
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
  toggleSms: async (term, crn) => {
    try {
      const response = await fetch("/api/users/sections/sms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, crn }),
      });

      if (response.status !== 201) {
        toast.error(
          "You have reached the maximum number of SMS-tracked sections."
        );
        return;
      }

      const data: TrackedSection = await response.json();

      toast.success(
        `You have successfully ${
          data.smsEnabled ? "enabled" : "disabled"
        } SMS-tracking for section ${data.crn}.`
      );

      set((state) => {
        state.refresh(term);
        return state;
      });
    } catch (error) {
      console.error("Failed to toggle SMS tracking:", error);
      toast.error("An error occurred while updating SMS tracking.");
    }
  },
}));

export default useTrackedSectionsStore;
