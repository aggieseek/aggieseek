'use client';

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    getDataFromRoute('/api/data/majors')
      .then(result => setMajors(result));

    getDataFromRoute('/api/data/classes')
      .then(result => setClasses(result));
  }, []);

  return (
    <div className={ "flex flex-col gap-y-4" }>
      <div className={ "w-1/5 space-y-1" }>
        <Label>Username</Label>
        <Input placeholder={ "username" }/>
      </div>

      <div className={ "w-1/5 space-y-1" }>
        <Label>Class</Label>
        <Select disabled={ classes.length === 0 }>
          <SelectTrigger>
            <SelectValue placeholder="Select"/>
          </SelectTrigger>
          <SelectContent>
            { classes.map((major, index) => (
              <SelectItem key={ index } value={ major }>{ major }</SelectItem>
            )) }
          </SelectContent>
        </Select>

      </div>

      <div className={ "w-1/5 space-y-1" }>
        <Label>Major</Label>
        <Select disabled={ majors.length === 0 }>
          <SelectTrigger>
            <SelectValue placeholder="Select"/>
          </SelectTrigger>
          <SelectContent>
            { majors.map((major, index) => (
              <SelectItem key={ index } value={ major }>{ major }</SelectItem>
            )) }
          </SelectContent>
        </Select>

      </div>

    </div>
  );
}