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
import { useState } from "react";
import { Button } from "./ui/button";

interface SearchSubjectProps {
  selected: string;
  setSelected: (value: string) => void;
  subjects: string[];
}

export default function SearchSubject({
  selected,
  setSelected,
  subjects,
}: SearchSubjectProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <Label className="mb-1">Subject</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between lg:w-[200px]"
          >
            {selected ? selected : "Select subject..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width] lg:w-[200px]">
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
    </div>
  );
}
