"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTitle } from "@/contexts/title-context";
export default function Feedback() {
  const [priority, setPriority] = useState<string>("");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle({ title: "Feedback" });
  }, [setTitle]);

  return (
    <>
      <div className=" border border-neutral-300 p-4 rounded-lg">
        <p className=" text-lg font-semibold">Submit Issue</p>
        <p className=" text-sm text-neutral-500">
          Please provide details about the issue you&apos;re experiencing.
        </p>
        <form className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Brief description of the issue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide more details about the issue"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              name="priority"
              value={priority}
              onValueChange={setPriority}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className=" w-40">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
