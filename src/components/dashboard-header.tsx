"use client";

import Link from "next/link";
import {
  MdAdd,
  MdCheck,
  MdError,
  MdOutlineAdd,
  MdRefresh,
  MdSearch,
} from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import LoadingCircle from "./loading-circle";

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
          <MdError className="w-4 h-4 mr-2" />
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
            <MdCheck className="w-4 h-4 mr-2" />
            Added section {crnInput}.
          </div>,
          {}
        );
      })
      .catch(() => {
        toast(
          <div className="flex items-center">
            <MdError className="w-4 h-4 mr-2" />
            Failed to add section {crnInput}.
          </div>,
          {}
        );
      });
    setCrnInput("");
  };

  return (
    <div className="flex justify-between sm:items-center mb-6 border-b pb-4">
      <div className="flex flex-col lg:flex-row gap-x-12">
        <h3 className="font-bold mb-2 lg:mb-0 text-xl">Your Courses</h3>

        <Link
          href="/dashboard/search"
          className="text-sm flex items-center gap-x-2 font-semibold hover:underline"
        >
          <MdSearch className="w-4 h-4" />
          Search for Sections
        </Link>

        <Popover>
          <PopoverTrigger>
            <div className="text-sm flex items-center gap-x-2 font-semibold hover:underline hover:cursor-pointer">
              <MdOutlineAdd />
              Add by CRN
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
                {isAdding ? <LoadingCircle /> : <MdAdd />}
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      <div
        className={
          isLoading ? "animate-spin opacity-50" : "hover:cursor-pointer"
        }
        onClick={fetchSections}
      >
        <MdRefresh className="w-5 h-5" />
      </div>
    </div>
  );
}
