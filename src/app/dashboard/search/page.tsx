"use client";

import SearchSubject from "@/components/search-subject";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/contexts/title-context";
import { useEffect, useState } from "react";

export default function Search() {
  const { setPageTitle: setTitle } = usePageTitle();
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    setTitle({ title: "Search" });
  }, [setTitle]);

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-xl pb-1">Course Catalog</h3>

      <div className="flex mt-3 flex-1">
        <div className="w-72 p-4 border rounded-lg">
          <div className="font-semibold mb-4">Filters</div>

          <div className="flex flex-col">
            <SearchSubject
              selected={selectedSubject}
              setSelected={setSelectedSubject}
            />
          </div>

          <Button className="w-full">Search</Button>
        </div>
      </div>
    </div>
  );
}
