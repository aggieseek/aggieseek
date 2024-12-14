"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    getSession()
      .then(session => {
        setSession(session);
      });
  }, []);

  return (
    <div className="">
      <div className="flex mt-24 pl-8 lg:pl-24 gap-8">

        <div className="mt-10 mr-10">
          <Image src={ "/images/logo-black.png" } alt={ "AggieSeek" } width={ 400 } height={ 200 }/>
          <h2 className={ "font-bold mt-4 text-3xl lg:text-4xl text-neutral-500" }>Get your desired courses hassle free!</h2>

          <div className={ "flex flex-col gap-y-2 text-sm my-8" }>
            <div className={ "flex gap-x-4" }>
              <Check className={ "w-5 h-5" }/>
              <p>Notify you when courses open</p>
            </div>

            <div className={ "flex gap-x-4" }>
              <Check className={ "w-5 h-5" }/>
              <p>View course and instructor history</p>
            </div>

            <div className={ "flex gap-x-4" }>
              <Check className={ "w-5 h-5" }/>
              <p>Take your mind off of registration</p>
            </div>
          </div>

          { session === undefined ? undefined
            : session
              ? <motion.div initial={ { opacity: 0, translateY: 20 } }
                            animate={ { opacity: 1, translateY: 0 } }
                            transition={{type: 'spring', duration: 2}}>
                <Link href={ "/dashboard" }>
                  <Button className={ "transition-transform bg-[#3c1817] hover:bg-[#2d0908] active:scale-[0.97]" }>
                    Dashboard
                  </Button>
                </Link>
              </motion.div>
              : <Button onClick={ () => signIn('google', { callbackUrl: "/dashboard" }) }
                        className={ "transition-transform p-1 pr-4 bg-[#502F2F] hover:bg-[#2d0908] active:scale-[0.97]" }>
                <div
                  className={ "bg-white p-2 flex justify-center items-center text-black h-full aspect-square rounded-sm mr-2" }>
                  <Image className={ "w-auto h-auto" } src={ "/images/google-logo.png" } alt={ "Google" } width={ 50 }
                         height={ 50 }/>
                </div>
                <p>Sign in with Google</p>
              </Button> }
        </div>

        <Image className={ "rounded-md shadow-xl" } src={ "/images/dashboard-preview.png" } alt={ "Dashboard" }
               width={ 700 } height={ 300 }/>
      </div>

    </div>
  );
}
