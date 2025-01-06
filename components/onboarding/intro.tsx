"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Intro({ onNext, onFinish }) {
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
          <div className={"mt-8"}>Welcome!</div>
        </DialogTitle>
        <DialogDescription>
          Before you start, let&apos;s make sure you&apos;re all set to make the
          most out of your AggieSeek experience.
        </DialogDescription>
      </DialogHeader>

      <div className={"flex justify-between"}>
        <button className="text-sm hover:underline" onClick={onFinish}>
          Skip
        </button>
        <button className="text-sm hover:underline" onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}
