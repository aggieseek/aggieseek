"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePageTitle } from "@/contexts/title-context";

const submitFeedback = async (
  title: string,
  body: string,
  priority: string
) => {
  return await fetch("/api/data/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, priority }),
  });
};

export default function Feedback() {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [priority, setPriority] = useState<string>("Low");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle({ title: "Feedback" });
  }, [setPageTitle]);

  const resetForm = () => {
    setSubmitting(false);
    setPriority("Low");
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitFeedback(title, description, priority).then((res) => {
      if (res.status != 201) console.error("feedback submit failed");
      resetForm();
    });
  };

  return (
    <>
      <div className=" border p-4 rounded-lg">
        <p className=" text-lg font-semibold">Submit Issue</p>
        <p className=" text-sm text-neutral-500">
          Please provide details about the issue you&apos;re experiencing.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              disabled={isSubmitting}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              disabled={isSubmitting}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about the issue"
              required
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              name="priority"
              disabled={isSubmitting}
              value={priority}
              onValueChange={setPriority}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className=" w-40" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
