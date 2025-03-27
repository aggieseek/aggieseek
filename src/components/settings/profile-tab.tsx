"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiBook2Fill, RiGraduationCapFill, RiUserFill } from "react-icons/ri";

async function getDataFromRoute(endpoint: string) {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function ProfileTab() {
  const [majors, setMajors] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    getDataFromRoute("/api/data/majors").then((result) => setMajors(result));

    getDataFromRoute("/api/data/classes").then((result) => setClasses(result));
  }, []);

  return (
    <div className={"flex flex-col gap-y-6 pt-4"}>
      <div className="flex flex-col gap-2">
        <Label className=" flex gap-x-2">
          <RiUserFill />
          Name
        </Label>
        <Input className="w-64" placeholder={"First Last"} />
      </div>
      <div className="flex flex-col gap-2">
        <Label className=" flex gap-x-2">
          <RiGraduationCapFill />
          Class
        </Label>
        <div className="w-64">
          <Select disabled={classes.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((major, index) => (
                <SelectItem key={index} value={major}>
                  {major}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <Label className=" flex gap-x-2">
          <RiBook2Fill />
          Major
        </Label>
        <div className=" min-w-64 max-w-96">
          <Select disabled={majors.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {majors.map((major, index) => (
                <SelectItem key={index} value={major}>
                  {major}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
