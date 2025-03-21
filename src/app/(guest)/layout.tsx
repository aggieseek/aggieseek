import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className={"font-[family-name:var(--font-geist-sans)]"}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
