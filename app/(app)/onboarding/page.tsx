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
import Intro from "@/components/onboarding/intro";
import Contact from "@/components/onboarding/contact";
import Preferences from "@/components/onboarding/preferences";

export default function Onboarding() {
  const router = useRouter();

  return (
    <>
      <Dialog defaultOpen={true}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onCloseAutoFocus={() => router.push("/dashboard")}
        >
          <Intro/>
        </DialogContent>
      </Dialog>
    </>
  );
}
