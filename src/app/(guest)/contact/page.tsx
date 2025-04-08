"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RiArrowRightLine } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { RxGithubLogo } from "react-icons/rx";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle form submission, for now just show success message
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow px-8 lg:px-24 py-12">
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 2 }}
          className="flex flex-col gap-6 max-w-4xl mx-auto"
        >
          <h1 className="font-bold text-3xl lg:text-4xl text-neutral-800">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            <div>
              <p className="text-lg text-neutral-600 mb-6">
                Have a question, suggestion, or just want to say hello? Feel free to reach out to the 
                AggieSeek team using any of the methods below:
              </p>
              
              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="bg-neutral-100 p-3 rounded-full">
                    <FaGoogle className="w-6 h-6 text-neutral-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Email</h3>
                    <a href="mailto:aggieseek@gmail.com" className="text-neutral-600 hover:text-neutral-900">
                      aggieseek@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-neutral-100 p-3 rounded-full">
                    <FaDiscord className="w-6 h-6 text-[#7289da]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Discord</h3>
                    <a 
                      href="https://discord.gg/t4rDRSCXBS" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-neutral-900"
                    >
                      Join our Discord!
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-neutral-100 p-3 rounded-full">
                    <RxGithubLogo className="w-6 h-6 text-neutral-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">GitHub</h3>
                    <a 
                      href="https://github.com/aggieseek" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-neutral-900"
                    >
                      github.com/aggieseek
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm mt-1">Thank you for contacting us. We will get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="How can we help you?"
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full transition-all group bg-[#3c1817] hover:bg-[#2d0908] active:scale-[0.97]"
                    >
                      Send Message
                      <span className="transition-all -ml-1 duration-200 group-hover:ml-1">
                        <RiArrowRightLine />
                      </span>
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
          
          <div className="mt-8">
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