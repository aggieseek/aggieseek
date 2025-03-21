"use client";

import ClassCell from "@/components/class-cell";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/loading-circle";
import { useSession } from "next-auth/react";
import { Section, TrackedSection } from "@prisma/client";
import { cn, CURRENT_TERM } from "@/lib/utils";
import Link from "next/link";
import { MdOutlineAdd, MdRefresh, MdSearch } from "react-icons/md";

enum PageState {
  LOADING, IDLE, ERROR, REFRESHING
}

interface SectionInfo extends TrackedSection {
  section: Section
}

export default function Dashboard() {

  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);
  const [addInProgress, setAddInProgress] = useState<boolean>(false);
  const { status } = useSession();

  const addSection = (crn: string) => {
    setAddInProgress(true);
    fetch('/api/users/sections', {
      method: "POST",
      body: JSON.stringify({ crn: crn, term: CURRENT_TERM })
    })
      .then(res => {
        if (!res.ok) return;
        getSections();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setAddInProgress(false));
  };

  const getSections = () => {
    fetch(`/api/users/sections?term=${CURRENT_TERM}`, {
      method: "GET"
    })
      .then(data => {
        return data.json();
      })
      .then(json => {
        setSections(json);
        setPageState(PageState.IDLE);
      })
      .catch(err => {
        console.error(err);
        setPageState(PageState.ERROR);
      });
  };

  const deleteSection = (crn: string) => {
    fetch('/api/users/sections', {
      method: "DELETE",
      body: JSON.stringify({ crn: crn, term: CURRENT_TERM })
    })
      .then(() => {
        setSections(prev => prev.filter(section => section.crn !== crn));
      })
      .catch(err => {
        console.error(err);
      });
  };

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
    const input = prompt('Enter a CRN');
    if (!input) return;

    const crn: string = input;
    addSection(crn);
  };

  return (
    <>
      <div className={ "flex justify-between sm:items-center mb-6 border-b pb-4" }>
        <div className="flex gap-x-12">
          <h3 className="font-bold text-xl">
            Your Courses
          </h3>

          <Link href={"/dashboard/search"} className="text-sm flex items-center gap-x-2 font-semibold hover:underline">
            <MdSearch />
            Search for Sections
          </Link>

          <div onClick={handleClick} className="text-sm flex items-center gap-x-2 font-semibold hover:underline hover:cursor-pointer">
            <MdOutlineAdd />
            Add by CRN
          </div>
        </div>

        <div className={pageState === PageState.REFRESHING ? "animate-spin opacity-50" : "hover:cursor-pointer"} onClick={refreshScreen}>
          <MdRefresh className="w-5 h-5" />
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-y-4">
        { pageState === PageState.IDLE
          ?
          sections.map(section => (
            <ClassCell onDeleteAction={ crn => deleteSection(crn) } key={ section.crn } section={section.section}/>
          ))
          :
          <div className="flex justify-center items-center w-full space-y-2">
            <div className={ "inline-block" }>
              <LoadingCircle/>
            </div>
          </div> }
      </div>

    </>
  );
}