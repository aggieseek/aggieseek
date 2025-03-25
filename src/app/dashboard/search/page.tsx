"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePageTitle } from "@/contexts/title-context";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

const subjects = ["CSCE", "STAT", "MATH"];

export default function Search() {
  const { setPageTitle: setTitle } = usePageTitle();
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/data/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  }, []);

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
            <Label className="mb-1">Subject</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {selectedSubject ? selectedSubject : "Select subject..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search subject..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No subject found.</CommandEmpty>
                    <CommandGroup>
                      {subjects?.map((subject) => (
                        <CommandItem
                          key={subject}
                          value={subject}
                          className="hover:cursor-pointer"
                          onSelect={(curr) => {
                            setSelectedSubject(
                              curr === selectedSubject ? "" : curr
                            );
                            setOpen(false);
                          }}
                        >
                          {subject}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedSubject === subject
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full">Search</Button>
        </div>
        <div>b</div>
      </div>
    </div>
  );
}
