"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Intro from "@/components/onboarding/intro";
import Contact from "@/components/onboarding/contact";
import Preferences from "@/components/onboarding/preferences";

const steps = [Intro, Contact, Preferences];
export default function Onboarding() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;

  const CurrentStepComponent = steps[stepIndex];

  const handleNext = () => {
    if (!isLastStep) setStepIndex(stepIndex + 1);
  };

  const handlePrevious = () => {
    if (!isFirstStep) setStepIndex(stepIndex - 1);
  };

  const handleExit = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Dialog defaultOpen={true}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onCloseAutoFocus={() => router.push("/dashboard")}
        >
          <CurrentStepComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleExit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
