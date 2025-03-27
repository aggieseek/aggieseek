"use client";

import ClassCell from "@/components/class-cell";
import { useEffect } from "react";
import LoadingCircle from "@/components/loading-circle";
import { useSession } from "next-auth/react";
import { usePageTitle } from "@/contexts/title-context";
import DashboardHeader from "@/components/dashboard-header";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";

export default function Dashboard() {
  const { trackedSections, loadState, fetchSections } =
    useTrackedSectionsStore();
  const { status } = useSession();
  const { setPageTitle: setTitle } = usePageTitle();

  useEffect(() => {
    setTitle({ title: "Dashboard" });
  }, [setTitle]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSections();
    }
  }, [status]);

  return (
    <>
      <DashboardHeader />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:flex-wrap gap-y-4">
        {loadState !== LoadingState.FETCHING ? (
          trackedSections.map((section) => (
            <ClassCell key={section.crn} section={section.section} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full space-y-2">
            <LoadingCircle />
          </div>
        )}
      </div>
    </>
  );
}
