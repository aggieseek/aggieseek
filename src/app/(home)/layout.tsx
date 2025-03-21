import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className={"font-[family-name:var(--font-geist-sans)]"}>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}