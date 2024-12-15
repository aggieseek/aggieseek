'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Onboarding() {
  const router = useRouter();

  return (
    <>
      <Dialog defaultOpen={ true }>
        <DialogContent onInteractOutside={ e => e.preventDefault() }
                       onPointerDownOutside={ e => e.preventDefault() }
                       onEscapeKeyDown={ e => e.preventDefault() }
                       onCloseAutoFocus={ () => router.push('/dashboard') }>
          <DialogHeader>
            <DialogTitle>
              <Image src={ "/images/logo-black.png" } alt={ 'AggieSeek' } width={ 200 } height={ 100 }/>
              <div className={ "mt-8" }>Welcome!</div>
            </DialogTitle>
            <DialogDescription>
              Before you start, let&apos;s make sure you&apos;re all set to make the most out of your AggieSeek
              experience.
            </DialogDescription>
          </DialogHeader>

          <div className={ "flex justify-between" }>
            <div className={ "text-sm opacity-25 hover:underline hover:cursor-pointer" }>Skip</div>

            <div className={ "text-sm hover:underline hover:cursor-pointer" }>Next</div>
          </div>
        </DialogContent>
      </Dialog></>
  );
}