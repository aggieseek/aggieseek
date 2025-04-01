"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { Instructor, Section } from "@prisma/client";
import Link from "next/link";
import { CURRENT_TERM } from "@/lib/utils";
import LoadingCircle from "@/components/loading-circle";
import { RiHome3Line } from "react-icons/ri";
import ProfClassCell from "@/components/prof-class-cell";
import { convertTermCode } from "@/lib/utils";

const fetchInstructor = async (id: string) => {
  const url = `/api/data/instructors?id=${id}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

const fetchInstructorSections = async (id: string) => {
  const url = `/api/data/instructors/sections?id=${id}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

function InstructorSections({ sections }: { sections: Section[] | null }) {
  if (!sections || sections.length === 0) {
    return (
      <div className="flex justify-center py-4">
        <LoadingCircle />
      </div>
    );
  }

  // Separate current courses and history based on CURRENT_TERM.
  const currentSections = sections.filter(
    (section) => section.term === CURRENT_TERM
  );
  const historySections = sections.filter(
    (section) => section.term !== CURRENT_TERM
  );

  // Group history sections by term.
  const groupedHistory = historySections.reduce((acc, section) => {
    if (!acc[section.term]) {
      acc[section.term] = [];
    }
    acc[section.term].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  return (
    <div className="text-xs">
      {currentSections.length > 0 && (
        <>
          <p className="text-lg font-semibold mt-6 mb-2">Current Courses</p>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {currentSections.map((section) => (
              <div key={section.crn} className="flex">
                <ProfClassCell section={section} />
              </div>
            ))}
          </div>
        </>
      )}

      {Object.keys(groupedHistory).length > 0 && (
        <>
          <p className="text-lg font-semibold mt-6 -mb-4">Course History</p>
          {Object.entries(groupedHistory)
            .sort(([termA], [termB]) => termB.localeCompare(termA))
            .map(([term, sectionsForTerm]) => (
              <div key={term} className="">
                <p className="text-sm font-semibold mb-2 mt-4 text-gray-400">
                  {convertTermCode(term)}
                </p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                  {sectionsForTerm.map((section) => (
                    <div key={section.crn} className="flex">
                      <ProfClassCell section={section} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

function InstructorPage() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("id");
  const source = searchParams.get("source");
  const router = useRouter();
  const [instructorData, setInstructorData] = useState<Instructor | null>(null);
  const [instructorSections, setInstructorSections] = useState<
    Section[] | null
  >(null);

  useEffect(() => {
    if (!instructorId) {
      router.push("/dashboard/search");
      return;
    }

    fetchInstructor(instructorId).then((data: Instructor) => {
      setInstructorData(data);
    });

    fetchInstructorSections(instructorId).then((data: Section[]) => {
      setInstructorSections(data);
    });
  }, [instructorId, router]);

  if (instructorData === null) {
    return (
      <div className="flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      <div className="reset-transform translate-y-3">
        {source === "dashboard" && (
          <Link
            href={"/dashboard"}
            className="inline-flex self-start gap-x-2 items-center font-bold mb-4 group"
          >
            <RiHome3Line className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all" />
            Back to Dashboard
          </Link>
        )}
        <div className="border-b pb-3 ">
          <p className="text-2xl tracking-wide font-black maroon-gradient inline-block text-transparent bg-clip-text">
            {instructorData?.name}
          </p>
        </div>
      </div>
      <InstructorSections sections={instructorSections} />
    </div>
  );
}

export default function Instructor() {
  return (
    <Suspense>
      <InstructorPage />
    </Suspense>
  );
}
