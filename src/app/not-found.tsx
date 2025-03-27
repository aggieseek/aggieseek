import Image from "next/image";
import Link from "next/link";
import { RiHome3Line } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="p-12">
      <Link
        href="/"
        className="font-medium flex gap-x-2 items-center text-sm hover:underline"
      >
        <RiHome3Line className="w-5 h-5" />
        Return Home
      </Link>

      <Image
        className="w-96 my-6"
        src={"/images/logo-black.png"}
        alt="AggieSeek"
        width={500}
        height={500}
      />
      <h1 className="text-3xl font-bold mb-3 uppercase">Page Not Found</h1>
      <div>
        <p className="font-light">
          Oops! The page you were looking for was not found.
        </p>
      </div>
    </div>
  );
}
