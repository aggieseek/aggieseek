import { FaGoogle } from "react-icons/fa";
import { RxGithubLogo, RxHeart  } from "react-icons/rx";
import { SiKofi } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="pb-6  px-8 lg:px-24 w-full">
      <div className="flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-2">
          <p className="text-sm md:text-base">Made with</p><RxHeart className="w-6 h-6" /><p>by the AggieSeek team</p>
        </div>
        <div className="flex space-x-5 lg:space-x-10">
          <a href="https://github.com/aggieseek" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <RxGithubLogo className="w-6 h-6" />
          </a>
          <a href="mailto:aggieseek@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaGoogle className="w-6 h-6" />
          </a>
          <a href="https://ko-fi.com/aggieseek" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <SiKofi className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}