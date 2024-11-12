"use client";

import ClassCell from "@/components/class-cell";
import { useState } from "react";

export default function Dashboard() {

  const [crns, setCRNs] = useState<string[]>(["12345", "10338", "22605", "19960", "54747", "43689"]);

  return (
    <>
      <h3 className="font-bold text-xl mb-6">
        Your Courses
      </h3>

      <div className="flex flex-col space-y-2">
        {crns.map(crn => (
          <ClassCell key={crn} crn={crn} />
        ))}
      </div>

    </>
  );
} 