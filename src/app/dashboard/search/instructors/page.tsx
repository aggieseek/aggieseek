"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { Instructor, Section } from "@prisma/client";
import { usePageTitle } from "@/contexts/title-context";
import Link from "next/link";
import { CURRENT_TERM } from "@/lib/utils";
import LoadingCircle from "@/components/loading-circle";
import { RiHome3Line } from "react-icons/ri";

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
  if (sections === null) {
    return (
      <div className="flex justify-center py-4">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="text-xs">
      {sections.map((section) => (
        <div key={section.crn}>
          <Link
            href={`/dashboard/search/sections?term=${CURRENT_TERM}&crn=${section.crn}`}
          >
            <div className="bg-neutral-100 p-2 hover:bg-neutral-200 font-semibold">
              {section.subject} {section.course} - {section.title}
            </div>
          </Link>
        </div>
      ))}
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
  const { setPageTitle: setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(null);
    if (!instructorId) {
      router.push("/dashboard/search");
      return;
    }

    fetchInstructor(instructorId).then((data: Instructor) => {
      setInstructorData(data);
      setTitle({
        title: data.name ?? "",
        subtitle: data.instructorId,
      });
    });

    fetchInstructorSections(instructorId).then((data: Section[]) => {
      setInstructorSections(data);
    });
  }, [instructorId, router, setTitle]);

  if (instructorData === null) {
    return (
      <div className="flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      <div className="translate-y-3 reset-transform">
        {source === "dashboard" && (
          <Link
            href={"/dashboard"}
            className="inline-flex self-start gap-x-2 items-center font-bold mb-4 group"
          >
            <RiHome3Line className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all" />
            Back to Dashboard
          </Link>
        )}

        <p className="text-2xl border-b pb-3 font-semibold">
          {instructorData?.name}
        </p>
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
