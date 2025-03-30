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
import { Term } from "@/lib/types/course-types";

interface SearchTermProps {
  selected: string;
  setSelected: (value: string) => void;
  terms: Term[];
}

export default function SearchTerm({
  selected,
  setSelected,
  terms,
}: SearchTermProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <Label className="mb-1">Term</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-xs"
          >
            <div className="truncate">
              {selected
                ? terms.find((term) => term.desc === selected)?.desc
                : "Select term..."}
            </div>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search term..." className="h-9" />
            <CommandList>
              <CommandEmpty>No subject found.</CommandEmpty>
              <CommandGroup>
                {terms?.map((term) => (
                  <CommandItem
                    key={term.desc}
                    value={term.desc}
                    className="hover:cursor-pointer text-xs"
                    onSelect={(curr) => {
                      setSelected(curr);
                      setOpen(false);
                    }}
                  >
                    {term.desc}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected === term.desc ? "opacity-100" : "opacity-0"
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
