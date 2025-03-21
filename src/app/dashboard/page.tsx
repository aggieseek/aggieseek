"use client";

import ClassCell from "@/components/class-cell";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { useSession } from "next-auth/react";
import { Section, TrackedSection } from "@prisma/client";
import { CURRENT_TERM } from "@/lib/utils";
import { usePageTitle } from "@/contexts/title-context";
import DashboardHeader from "@/components/dashboard-header";

enum PageState {
  LOADING,
  IDLE,
  ERROR,
  REFRESHING,
}

interface SectionInfo extends TrackedSection {
  section: Section;
}

export default function Dashboard() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);
  const { status } = useSession();
  const { setPageTitle: setTitle } = usePageTitle();

  const addSection = (crn: string) => {
    fetch("/api/users/sections", {
      method: "POST",
      body: JSON.stringify({ crn: crn, term: CURRENT_TERM }),
    })
      .then((res) => {
        if (!res.ok) return;
        getSections();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSections = () => {
    fetch(`/api/users/sections?term=${CURRENT_TERM}`, {
      method: "GET",
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        setSections(json);
        setPageState(PageState.IDLE);
      })
      .catch((err) => {
        console.error(err);
        setPageState(PageState.ERROR);
      });
  };

  const deleteSection = (crn: string) => {
    fetch("/api/users/sections", {
      method: "DELETE",
      body: JSON.stringify({ crn: crn, term: CURRENT_TERM }),
    })
      .then(() => {
        setSections((prev) => prev.filter((section) => section.crn !== crn));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setTitle({ title: "Dashboard" });
  }, [setTitle]);

  useEffect(() => {
    if (status === "authenticated") {
      getSections();
    }
  }, [status]);

  const refreshScreen = () => {
    setPageState(PageState.REFRESHING);
    getSections();
  };

  const handleClick = () => {
    const input = prompt("Enter a CRN");
    if (!input) return;

    const crn: string = input;
    addSection(crn);
  };

  return (
    <>
      <DashboardHeader
        onAdd={handleClick}
        onRefresh={refreshScreen}
        isRefreshing={pageState === PageState.REFRESHING}
      />

      <div className="flex flex-col lg:flex-row justify-between lg:flex-wrap gap-y-4">
        {pageState === PageState.IDLE ? (
          sections.map((section) => (
            <ClassCell
              onDeleteAction={(crn) => deleteSection(crn)}
              key={section.crn}
              section={section.section}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full space-y-2">
            <div className={"inline-block"}>
              <LoadingCircle />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
