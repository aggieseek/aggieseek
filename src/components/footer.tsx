import { RiGithubFill, RiHeart3Fill, RiMailFill } from "react-icons/ri";
import { SiKofi } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="pb-6  px-8 lg:px-24 w-full">
      <div className="flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-2 font-semibold">
          <p className="text-sm md:text-base">Made with</p>
          <RiHeart3Fill className="w-6 h-6" />
          <p>by the AggieSeek team</p>
        </div>
        <div className="text-sm opacity-50">
        This web site is not endorsed by, directly affiliated with, maintained, or sponsored by Texas A&M University.
        </div>
        <div className="flex space-x-5 lg:space-x-10">
          <a
            href="https://github.com/aggieseek"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <RiGithubFill className="w-6 h-6" />
          </a>
          <a
            href="mailto:aggieseek@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <RiMailFill className="w-6 h-6" />
          </a>
          <a
            href="https://ko-fi.com/aggieseek"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <SiKofi className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
