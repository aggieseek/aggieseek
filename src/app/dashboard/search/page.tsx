"use client";

import { usePageTitle } from "@/contexts/title-context";
import { useEffect } from "react";

export default function Search() {
  const { setPageTitle: setTitle } = usePageTitle();

  useEffect(() => {
    setTitle({ title: "Search" });
  }, [setTitle]);

  return (
    <>
      <h3 className="font-bold text-xl">Search Courses</h3>
    </>
  );
}
