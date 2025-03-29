"use client";

import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  RiAddFill,
  RiAddLine,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiRestartLine,
  RiSearch2Line,
} from "react-icons/ri";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import LoadingCircle from "./loading-circle";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
  const { addSection, trackedSections, fetchSections, loadState } =
    useTrackedSectionsStore();
  const isLoading = loadState === LoadingState.FETCHING;
  const isAdding = loadState === LoadingState.ADDING;
  const [crnInput, setCrnInput] = useState<string>("");

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (crnInput.trim() === "") return;
    if (trackedSections.some((section) => section.crn === crnInput)) {
      toast(
        <div className="flex items-center">
          <RiErrorWarningFill className="w-4 h-4 mr-2" />
          You are already tracking section {crnInput}.
        </div>,
        {}
      );
      return;
    }

    addSection(crnInput)
      .then(() => {
        toast(
          <div className="flex items-center">
            <RiCheckboxCircleFill className="w-4 h-4 mr-2" />
            Added section {crnInput}.
          </div>,
          {}
        );
      })
      .catch(() => {
        toast(
          <div className="flex items-center">
            <RiErrorWarningFill className="w-4 h-4 mr-2" />
            Failed to add section {crnInput}.
          </div>,
          {}
        );
      });
    setCrnInput("");
  };

  return (
    <div className="flex justify-between sm:items-center mb-6 border-b pb-4">
      <div className="flex flex-col lg:flex-row lg:gap-x-12 lg:items-center">
        <h3 className="font-bold text-xl">Your Courses</h3>

        <div className="flex items-center">
          <RiSearch2Line className="w-4 h-4" />
          <Link
            href="/dashboard/search"
            className="group text-sm gap-x-2 font-semibold p-2"
          >
            <p className="underline-anim">Search for Sections</p>
          </Link>
        </div>

        <div className="flex items-center">
          <RiAddLine className="w-4 h-4 mr-2" />
          <Popover>
            <PopoverTrigger>
              <div className="text-sm flex items-center gap-x-2 font-semibold  hover:cursor-pointer">
                <p className="underline-anim">Add by CRN</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-none w-max" align="start">
              <form onSubmit={(e) => handleAdd(e)} className="flex gap-x-2">
                <Input
                  className="flex-1 w-40"
                  placeholder="#####"
                  value={crnInput}
                  required
                  onChange={(e) => setCrnInput(e.target.value)}
                  maxLength={5}
                  inputMode="numeric"
                />
                <Button disabled={isAdding}>
                  {isAdding ? <LoadingCircle /> : <RiAddFill />}
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <RiRestartLine
        onClick={fetchSections}
        className={cn(
          "w-5 h-5",
          isLoading ? "animate-spin opacity-50" : "hover:cursor-pointer"
        )}
      />
    </div>
  );
}
