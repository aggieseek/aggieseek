import Image from "next/image";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className={"flex items-center w-full px-8 lg:px-24 py-2 sticky top-0 bg-white h-20 border-b border-b-neutral-200 shadow-sm"}>
      <Link href={"/"} className={"flex items-center h-full transition-transform hover:cursor-pointer hover:scale-[1.02] active:scale-[0.97]"}>
        <Image className={"h-1/2 w-auto object-contain"} src={ "/images/logo-black.png" } alt={ "AggieSeek" } width={ 400 } height={ 200 }/>
      </Link>
    </nav>
  );
}