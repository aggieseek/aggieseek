"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Course } from "@/lib/types/course-types";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

interface SearchCourseProps {
  selected: string;
  setSelected: (value: string) => void;
  courses: Course[] | undefined;
}

export default function SearchCourse({
  selected,
  setSelected,
  courses,
}: SearchCourseProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <Label className="mb-1">Course</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={courses === undefined}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {courses === undefined
              ? "Loading..."
              : selected
              ? selected
              : "Select course..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search course..." className="h-9" />
            <CommandList>
              <CommandEmpty>No courses found.</CommandEmpty>
              <CommandGroup>
                {courses?.map((course, index) => (
                  <CommandItem
                    key={index}
                    value={course.course}
                    className="hover:cursor-pointer"
                    onSelect={(curr) => {
                      setSelected(curr === selected ? "" : curr);
                      setOpen(false);
                    }}
                  >
                    {course.course} - {course.title}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected === course.course ? "opacity-100" : "opacity-0"
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
  );
}
