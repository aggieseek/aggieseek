"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { Instructor } from "@prisma/client";
import { usePageTitle } from "@/contexts/title-context";

const fetchInstructor = async (id: string) => {
  const url = `/api/data/instructors?id=${id}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export default function Instructor() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("id");
  const router = useRouter();
  const [instructorData, setInstructorData] = useState<Instructor | null>(null);
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
  }, [instructorId, router, setTitle]);

  return (
    <Suspense>
      <div className="space-y-4">
        <p>{instructorData?.name}</p>
      </div>
    </Suspense>
  );
}
