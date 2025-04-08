import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className={
        "flex items-center justify-between w-full px-8 lg:px-24 py-2 sticky top-0 bg-white h-20 border-b border-b-neutral-200 shadow-sm z-50"
      }
    >
      <Link
        href={"/"}
        className={
          "flex items-center h-full transition-transform hover:cursor-pointer hover:scale-[1.02] active:scale-[0.97]"
        }
      >
        <Image
          className={"h-auto w-auto max-h-16"} // Added max height for better scaling
          src={"/images/logo-black.png"}
          alt={"AggieSeek"}
          width={150} // Adjust width for a reasonable size
          height={25} // Adjust height for a reasonable size
        />
      </Link>
      
      <div className="flex items-center gap-6">
        <Link 
          href="/about" 
          className="text-neutral-800 hover:text-neutral-600 font-medium"
        >
          About
        </Link>
        <Link 
          href="/contact" 
          className="text-neutral-800 hover:text-neutral-600 font-medium"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
