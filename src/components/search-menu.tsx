"use client";

import { Course } from "@/lib/types/course-types";
import { useEffect, useState } from "react";
import SearchTerm from "./search-term";
import { Button } from "./ui/button";
import LoadingCircle from "./loading-circle";
import SearchSubject from "./search-subject";
import SearchCourse from "./search-course";
import { Section } from "@prisma/client";
import SearchClassCell from "./search-class-cell";
import useTermsStore from "@/stores/useTermsStore";

const pageSize = 8;

function SectionDisplay({ sections }: { sections: Section[] | undefined }) {
  const [page, setPage] = useState<number>(0);
  const maxPage = sections ? Math.ceil(sections.length / pageSize) - 1 : 0;

  const incPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const decPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    setPage(0);
  }, [sections]);

  if (sections === undefined) {
    return (
      <div className="mt-4 lg:mt-0">
        Choose from the filters to begin your search!
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex flex-col text-xs w-full overflow-visible gap-y-1">
        {paginateArray(sections, page).map((section) => (
          <SearchClassCell
            key={section.term + " " + section.crn}
            section={section}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <div className="text-xs self-center font-bold">
          Page {page + 1} of {maxPage + 1}{" "}
        </div>

        <div className="flex justify-end gap-x-2">
          <Button
            disabled={page === 0}
            className="transition-opacity"
            onClick={decPage}
          >
            Back
          </Button>

          <Button
            disabled={page === maxPage}
            className="transition-opacity"
            onClick={incPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function paginateArray<T>(array: T[], page: number): T[] {
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

export default function SearchMenu() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<string>("");

  const [searchTitle, setSearchTitle] = useState<string>("");

  const { fetchTerms, terms, activeTerms } = useTermsStore();

  const selectedTermCode =
    terms?.find((term) => term.desc === selectedTerm)?.code || "";
  const [subjects, setSubjects] = useState<string[] | undefined>(undefined);
  const [sections, setSections] = useState<Section[] | undefined>(undefined);
  const [courses, setCourses] = useState<Course[] | undefined>([]);

  const [isSearching, setSearching] = useState<boolean>(false);

  function beginSearch() {
    if (!terms) return;
    if (!selectedSubject) return;

    setSearching(true);
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term: selectedTermCode,
        subject: selectedSubject,
        course: selectedCourse,
      }),
    })
      .then((res) => res.json())
      .then((data: Section[]) => {
        setSearchTitle(
          `${selectedSubject}${selectedCourse && " " + selectedCourse}`
        );
        setSections(data);
      })
      .finally(() => setSearching(false));
  }

  useEffect(() => {
    if (terms.length === 0) {
      fetchTerms().then(() => console.log(activeTerms));
    }
  }, [terms, fetchTerms]);

  useEffect(() => {
    fetch(`/api/data/subjects?term=${selectedTermCode}`)
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  }, [selectedTerm]);

  useEffect(() => {
    if (!selectedTerm || !selectedSubject) return;
    setSelectedCourse("");
    fetch(
      `/api/data/courses?subject=${selectedSubject}&term=${selectedTermCode}`
    )
      .then((res) => res.json())
      .then((data: Course[]) => setCourses(data));
  }, [selectedSubject, selectedTerm]);

  if (terms.length === 0 || subjects === undefined)
    return (
      <div className="w-full flex justify-center">
        <LoadingCircle />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row flex-1 mt-1 lg:gap-x-4 h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          beginSearch();
        }}
        className="flex w-full lg:pr-12 sticky flex-col justify-between lg:w-72 p-4 border rounded-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div className="font-semibold">Filter Sections</div>

          <div className="flex flex-col gap-y-4">
            <SearchTerm
              terms={activeTerms}
              selected={selectedTerm}
              setSelected={setSelectedTerm}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <SearchSubject
              selected={selectedSubject}
              setSelected={setSelectedSubject}
              subjects={subjects}
            />
          </div>

          {selectedSubject && (
            <div className="flex flex-col gap-y-4">
              <SearchCourse
                courses={courses}
                selected={selectedCourse}
                setSelected={setSelectedCourse}
              />
            </div>
          )}
        </div>
        <Button type="submit" className="w-full mt-8 lg:mt-0">
          {isSearching ? <LoadingCircle /> : "Search"}
        </Button>
      </form>

      <div className="h-full w-full flex flex-col">
        {sections && (
          <div className="text-2xl mt-4 lg:mt-0 font-bold mb-6">
            Showing results for {searchTitle}:
          </div>
        )}

        <SectionDisplay sections={sections} />
      </div>
    </div>
  );
}
