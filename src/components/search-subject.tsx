"use client";

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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface SearchSubjectProps {
  selected: string;
  setSelected: (string) => void;
}

export default function SearchSubject({
  selected,
  setSelected,
}: SearchSubjectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/data/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  }, []);

  return (
    <>
      <Label className="mb-1">Subject</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selected ? selected : "Select subject..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search subject..." className="h-9" />
            <CommandList>
              <CommandEmpty>No subject found.</CommandEmpty>
              <CommandGroup>
                {subjects?.map((subject) => (
                  <CommandItem
                    key={subject}
                    value={subject}
                    className="hover:cursor-pointer"
                    onSelect={(curr) => {
                      setSelected(curr === selected ? "" : curr);
                      setOpen(false);
                    }}
                  >
                    {subject}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected === subject ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
