"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBell } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function Preferences() {
  const router = useRouter();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Image
            src={"/images/logo-black.png"}
            alt={"AggieSeek"}
            width={200}
            height={100}
          />
          <div className={"mt-8"}>Please input your notification preferences!</div>
        </DialogTitle>
        <DialogDescription>
          Inputting your notification preferences ensures that you get notified in the ways you want! Feel free to chance your preferences any time in the settings page.
        </DialogDescription>
      </DialogHeader>
      <div className=" flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <Label className={ "flex gap-x-2 mb-2" }>
            <FaBell/>
            Notification Preferences
          </Label>
          <div className="flex gap-4 text-neutral-500 text-sm font-semibold">
            <p>Discord</p>
            <p>SMS</p>
            <p>Email</p>
          </div>
        </div>
        <Separator/>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Openings</p>
            <p className=" text-xs text-neutral-500">
              Get notified when classes open up
            </p>
          </div>
          <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox/>
            <Checkbox/>
            <Checkbox/>
          </div>
        </div>
        <Separator className=""/>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Closings</p>
            <p className=" text-xs text-neutral-500">
              Get notified when classes close
            </p>
          </div>
          <div className=" flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox/>
            <Checkbox/>
            <Checkbox/>
          </div>
        </div>
        <Separator className=""/>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Instructor Changes</p>
            <p className=" text-xs text-neutral-500">
              Get notified when instructors change for a class
            </p>
          </div>
          <div className=" flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox/>
            <Checkbox/>
            <Checkbox/>
          </div>
        </div>

      </div>
      <div className={"flex justify-between"}>
        <div
          className={"text-sm opacity-25 hover:underline hover:cursor-pointer"}
        >
          Back
        </div>

        <div className={"text-sm hover:underline hover:cursor-pointer"}>
          Finish
        </div>
      </div>
    </>
  );
}