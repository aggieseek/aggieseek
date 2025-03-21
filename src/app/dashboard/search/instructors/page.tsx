"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Instructor } from "@prisma/client";

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

  useEffect(() => {
    if (!instructorId) {
      router.push("/dashboard/search");
      return;
    };

    fetchInstructor(instructorId).then((data) => {
      setInstructorData(data);
    });
  }, [instructorId, router]);

  return (
    <div className="space-y-4">
      <p>{instructorData?.name}</p>
    </div>
  );
}
