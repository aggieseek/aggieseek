"use client";

import ClassCell from "@/components/class-cell";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingCircle from "@/components/loading-circle";

enum PageState {
  LOADING, IDLE, ERROR
}

export default function Dashboard() {

  const [crns, setCRNs] = useState<string[]>([]);
  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

  const addSection = (crn: string) => {
    fetch('/api/user/sections', {
      method: "POST",
      body: JSON.stringify({ crn: crn })
    })
      .then(() => {
        setCRNs(prev => [...prev, crn]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getSections = () => {
    fetch('/api/user/sections', {
      method: "GET"
    })
      .then(data => {
        return data.json();
      })
      .then(json => {
        setCRNs(json.sections);
        setPageState(PageState.IDLE);
      })
      .catch(err => {
        console.error(err);
        setPageState(PageState.ERROR);
      });
  };

  const deleteSection = (crn: string) => {
    fetch('/api/user/sections', {
      method: "DELETE",
      body: JSON.stringify({ crn: crn })
    })
      .then(() => {
        setCRNs(prev => prev.filter(currCrn => currCrn != crn));
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSections();
  }, []);

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
        { pageState === PageState.IDLE ? crns.map(crn => (
          <ClassCell onDeleteAction={ crn => deleteSection(crn) } key={ crn } crn={ crn }/>
        )) : <div className="flex justify-center items-center space-y-2">
          <div className={"inline-block"}>
            <LoadingCircle/>
          </div>
        </div> }
      </div>

    </>
  );
}