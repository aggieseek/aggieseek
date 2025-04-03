"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isSubmitted, setSubmitted] = useState<boolean>(false);

  const [priority, setPriority] = useState<string>("Low");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
    submitFeedback(title, description, priority).then((res) => {
      if (res.status != 201) console.error("feedback submit failed");
    });
  };

  if (isSubmitted) {
    return (
      <div className="p-4 font-semibold">
        Your feedback has been submitted. Thank you!
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-x-8 border-b pb-4 mb-6">
        <div className="flex items-center font-bold h-10 text-xl flex-1">
          Feedback
        </div>
      </div>
      <div className=" border p-4 rounded-lg">
        <p className=" text-lg font-semibold">Submit Feedback</p>
        <p className=" text-sm text-neutral-500">
          Please provide details regarding your feedback.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              disabled={isSubmitted}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              disabled={isSubmitted}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details"
              required
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              name="priority"
              disabled={isSubmitted}
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
          <Button type="submit" className=" w-40" disabled={isSubmitted}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
