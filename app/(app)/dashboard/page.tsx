"use client";

import ClassCell from "@/components/class-cell";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingCircle from "@/components/loading-circle";
import { useSession } from "next-auth/react";
import { Section, TrackedSection } from "@prisma/client";
import { CURRENT_TERM } from "@/lib/utils";

enum PageState {
  LOADING, IDLE, ERROR
}

interface SectionInfo extends TrackedSection {
  sections: Section
}

export default function Dashboard() {

  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);
  const { status } = useSession();

  const addSection = (crn: string) => {
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
      });
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

  const handleClick = () => {
    const input = prompt('Enter a CRN');
    if (!input) return;

    const crn: string = input;
    addSection(crn);
  };

  return (
    <>
      <div className={ "flex gap-x-12 items-center mb-6" }>
        <h3 className="font-bold text-xl">
          Your Courses
        </h3>

        <Button variant={ 'default' } onClick={ handleClick } className={ "h-8" }>Add</Button>
      </div>

      <div className="flex flex-col space-y-2">
        { pageState === PageState.IDLE
          ?
          sections.map(section => (
            <ClassCell onDeleteAction={ crn => deleteSection(crn) } key={ section.crn } section={section.sections}/>
          ))
          :
          <div className="flex justify-center items-center space-y-2">
            <div className={ "inline-block" }>
              <LoadingCircle/>
            </div>
          </div> }
      </div>

    </>
  );
}