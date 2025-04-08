"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow px-8 lg:px-24 py-12">
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 2 }}
          className="flex flex-col gap-6 max-w-4xl mx-auto"
        >
          <h1 className="font-bold text-3xl lg:text-4xl text-neutral-800">About AggieSeek</h1>
          
          <div className="relative w-full h-64 lg:h-80 mb-6 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/dashboard-preview.png"
              alt="AggieSeek Dashboard"
              fill
              className="object-cover"
            />
          </div>
          
          <section className="mb-8">
            <h2 className="font-bold text-2xl mb-4 text-neutral-700">Our Mission</h2>
            <p className="text-lg text-neutral-600 mb-4">
              AggieSeek was created to solve a common problem faced by Texas A&M students: 
              the stress and frustration of course registration. Our mission is to provide 
              a reliable, user-friendly platform that helps Aggies get into their desired classes.
            </p>
            <p className="text-lg text-neutral-600">
              We monitor class availability in real-time and notify students the moment a seat opens up, 
              giving them the best chance to register for the classes they want.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="font-bold text-2xl mb-4 text-neutral-700">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl mb-3 text-neutral-700">1. Track Your Courses</h3>
                <p className="text-neutral-600">
                  Search for and select the courses you want to track. AggieSeek continuously monitors 
                  the availability of these courses, checking for open seats.
                </p>
              </div>
              <div className="border border-neutral-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl mb-3 text-neutral-700">2. Get Notified</h3>
                <p className="text-neutral-600">
                  When a seat opens up in one of your tracked courses, you will receive an instant 
                  notification through our Discord server, giving you the opportunity to register right away.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="font-bold text-2xl mb-4 text-neutral-700">Our Team</h2>
            <p className="text-lg text-neutral-600 mb-4">
              AggieSeek is built and maintained by Computer Science & Engineering students at Texas A&M who understand the challenges 
              of course registration.
            </p>
          </section>
          
          <div className="flex gap-x-4 mt-4">
            <Link href="/contact">
              <Button
                className="transition-all group bg-[#3c1817] hover:bg-[#2d0908] active:scale-[0.97]"
              >
                Contact Us
                <span className="transition-all -ml-1 duration-200 group-hover:ml-1">
                  <RiArrowRightLine />
                </span>
              </Button>
            </Link>
            
            <Link href="/">
              <Button
                variant="outline"
                className="transition-all active:scale-[0.97]"
              >
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
