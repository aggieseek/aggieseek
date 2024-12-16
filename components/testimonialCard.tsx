import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  date: string;
  feedback: string;
}

export default function TestimonialCard({ name, rating, date, feedback }: TestimonialCardProps) {
  return (
    <div className="bg-[#F4F4F4] p-8 rounded-xl shadow-lg">
      {/* Name */}
      <p className="font-bold text-lg lg:text-xl text-neutral-500">{name}</p>

      {/* Stars */}
      <div className="flex">
        {[...Array(rating)].map((_, index) => (
          <Star key={index} className="size-5 fill-[#502F2F]" color="#502F2F]" />
        ))}
      </div>

      {/* Date */}
      <p className="text-sm">{date}</p>

      {/* Feedback */}
      <p className="mt-2">{feedback}</p>
    </div>
  );
}