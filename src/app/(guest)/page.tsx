"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/testimonial-card";
import { RiArrowRightLine, RiCheckFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Home() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:mt-12 pl-8 lg:pl-24 gap-8">
        <div className="mt-10 mr-10">
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 4 }}
          >
            <Image
              src={"/images/logo-black.png"}
              alt={"AggieSeek"}
              width={400}
              height={200}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.25, type: "spring", duration: 4 }}
            className={"font-bold mt-4 text-2xl lg:text-3xl text-neutral-500"}
          >
            Get your desired courses hassle free!
          </motion.h2>

          <div className={"flex flex-col gap-y-2 my-8 "}>
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.4, type: "spring", duration: 4 }}
              className={"flex gap-x-4 items-center"}
            >
              <RiCheckFill className={"w-5 h-5"} />
              <p>Notify you when courses open</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.5, type: "spring", duration: 5 }}
              className={"flex gap-x-4 items-center"}
            >
              <RiCheckFill className={"w-5 h-5"} />
              <p>View course and instructor history</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.6, type: "spring", duration: 6 }}
              className={"flex gap-x-4 items-center"}
            >
              <RiCheckFill className={"w-5 h-5"} />
              <p>Take your mind off of registration</p>
            </motion.div>
          </div>

          <div className="flex gap-x-4">
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "spring", delay: 2, duration: 4 }}
            >
              <Button
                onClick={() =>
                  session
                    ? router.push("/dashboard")
                    : signIn("google", { callbackUrl: "/dashboard" })
                }
                className={
                  "transition-all group bg-[#3c1817] hover:bg-[#2d0908] active:scale-[0.97]"
                }
              >
                Get Started
                <span className="transition-all -ml-1 duration-200 group-hover:ml-1">
                  <RiArrowRightLine />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "spring", delay: 2.2, duration: 4 }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/t4rDRSCXBS"
              >
                <Button
                  className={
                    "transition-all group bg-[#7289da] hover:bg-[#5b72c3] active:scale-[0.97]"
                  }
                >
                  Join our Discord
                  <span className="transition-all -ml-1 duration-200 group-hover:ml-1">
                    <RiArrowRightLine />
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="relative w-full h-[400px] sm:h-[300px] md:h-[500px] lg:w-[800px] lg:h-[500px] overflow-hidden rounded-md shadow-xl">
          <Image
            src="/images/aggieseek-ss.png"
            alt="Dashboard"
            fill
            className="object-cover object-left"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row mt-16 px-8 lg:px-24 gap-8">
        {/* Mobile Mockup on the Left for `lg`, Bottom for Smaller Screens */}
        <div className="relative flex justify-center">
          <Image
            src="/images/aggieseek-mobile-mockup.png"
            alt="AggieSeek Mobile Mockup"
            width={450}
            height={300}
          />
        </div>

        {/* Text on the Right for `lg`, Top for Smaller Screens */}
        <div className="flex flex-col gap-4 lg:w-2/3 lg:mt-32">
          <h2 className="font-bold text-2xl lg:text-3xl text-neutral-500 text-left lg:text-right">
            Classes full? Get discord messages when classes open up!
          </h2>
          <p className="text-left lg:text-right">
            AggieSeek uses Discord to notify you. As soon as classes open up,
            you&apos;ll be the first one to know.
          </p>
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
            name="Peter Phan"
            rating={5}
            date="1 day ago"
            feedback="AggieSeek has to be one of the greatest websites my eyes have had the pleasure of witnessing. Everything about it is top tier, and I'm grateful for every second that I get to coexist with it. The creators of it must be geniuses, no bias."
          />
          <TestimonialCard
            name="Sophia Phu"
            rating={5}
            date="2 days ago"
            feedback="AggieSeek made my registration so convenient and easy. It helped me get out of my two 8am sections and my night lab section. I don’t know what I would do if AggieSeek didn’t exist. Thank you AggieSeek developers!"
          />
          <TestimonialCard
            name="enelear"
            rating={5}
            date="1 month ago"
            feedback="Boy oh boy where do I even begin. AggieSeek, my beloved. I have loved you ever since I first laid eyes on you. The way you notify me for the most competitive of classes and eliminate the stress of enrollment. I would do anything for you."
          />
        </div>
      </div>
    </div>
  );
}
