"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/testimonialCard";

export default function Home() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row mt-8 lg:mt-24 pl-8 lg:pl-24 gap-8">
        <div className="mt-10 mr-10">
          <Image
            src={"/images/logo-black.png"}
            alt={"AggieSeek"}
            width={400}
            height={200}
          />
          <h2
            className={"font-bold mt-4 text-3xl lg:text-4xl text-neutral-500"}
          >
            Get your desired courses hassle free!
          </h2>

          <div className={"flex flex-col gap-y-2 my-8 "}>
            <div className={"flex gap-x-4 items-center"}>
              <Check className={"w-5 h-5"} />
              <p>Notify you when courses open</p>
            </div>

            <div className={"flex gap-x-4 items-center"}>
              <Check className={"w-5 h-5"} />
              <p>View course and instructor history</p>
            </div>

            <div className={"flex gap-x-4 items-center"}>
              <Check className={"w-5 h-5"} />
              <p>Take your mind off of registration</p>
            </div>
          </div>

          {session === undefined ? undefined : session ? (
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "spring", duration: 2 }}
            >
              <Link href={"/dashboard"}>
                <Button
                  className={
                    "transition-transform bg-[#3c1817] hover:bg-[#2d0908] active:scale-[0.97]"
                  }
                >
                  Dashboard
                </Button>
              </Link>
            </motion.div>
          ) : (
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={
                "transition-transform p-1 pr-4 bg-[#502F2F] hover:bg-[#2d0908] active:scale-[0.97]"
              }
            >
              <div
                className={
                  "bg-white p-2 flex justify-center items-center text-black h-full aspect-square rounded-sm mr-2"
                }
              >
                <Image
                  className={"w-auto h-auto"}
                  src={"/images/google-logo.png"}
                  alt={"Google"}
                  width={50}
                  height={50}
                />
              </div>
              <p>Sign in with Google</p>
            </Button>
          )}
        </div>

        <div className=" relative w-full h-[400px] sm:h-[300px] md:h-[500px] lg:w-[800px] lg:h-[500px] overflow-hidden rounded-md shadow-xl">
          <Image
            src="/images/aggieseek-ss.png"
            alt="Dashboard"
            fill
            className="object-cover object-left"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-16 px-8 lg:px-24 gap-8">
        <div className="w-full flex flex-col gap-4 items-center mt-0 lg:mt-24 lg:w-2/3">
          <h2 className="font-bold text-2xl lg:text-3xl text-neutral-500">
            Classes full? Get text, email, and discord messages when classes
            open up!
          </h2>
          <p>
            AggieSeek has a text, email, and discord notification system. As
            soon as classes open up, you’ll be the first one to know.
          </p>
        </div>
        <div className="relative flex">
          <Image
            src="/images/aggieseek-mobile-mockup.png"
            alt="AggieSeek Mobile Mockup"
            width={450}
            height={300}
          />
        </div>
      </div>
      <div className="mt-16 px-8 lg:px-24 gap-8 mb-8 lg:mb-24">
        <h2 className="font-bold text-2xl lg:text-3xl text-neutral-500">
          See what our users think!
        </h2>
        <p className=" lg:text-xl mt-2 mb-4">
          AggieSeek has helped 1000+ students get into their desired classes
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          <TestimonialCard
            name="Sophia Phu"
            rating={5}
            date="2 days ago"
            feedback="AggieSeek made my registration so convenient and easy. It helped me get out of my 2 8am sections and my night lab section. I don’t know what I would do if AggieSeek didn’t exist. Thank you AggieSeek developers!"
          />
          <TestimonialCard
            name="Sophia Phu"
            rating={5}
            date="2 days ago"
            feedback="AggieSeek made my registration so convenient and easy. It helped me get out of my 2 8am sections and my night lab section. I don’t know what I would do if AggieSeek didn’t exist. Thank you AggieSeek developers!"
          />
          <TestimonialCard
            name="Sophia Phu"
            rating={5}
            date="2 days ago"
            feedback="AggieSeek made my registration so convenient and easy. It helped me get out of my 2 8am sections and my night lab section. I don’t know what I would do if AggieSeek didn’t exist. Thank you AggieSeek developers!"
          />
        </div>
      </div>
    </div>
  );
}
