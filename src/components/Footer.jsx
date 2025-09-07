import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="px-4 py-3 my-5 gradienteffect rounded-lg font-[outfit]">
      <div className="flex justify-between items-center">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg" alt="giphy-logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <h1 className='text-[20px] sm:text-[30px] font-extrabold curson-pointer'>STICKY</h1>
        </div>

        {/* Social + Email */}
        <div className="flex flex-col items-center gap-3">
            <h2 className="font-semibold text-sm sm:text-[18px]">Connect With Us</h2>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/Paras_tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-700 hover:text-black transition-transform hover:-translate-y-1"
              >
                <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://github.com/parasss19"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-700 hover:text-black transition-transform hover:-translate-y-1"
              >
                <FiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/paras-mehta19/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-700 hover:text-black transition-transform hover:-translate-y-1"
              >
                <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>
        </div>
      </div>

      <div className="border-t border-black mt-4 pt-3 text-center text-[18px] text-white">
        Made with ❤️ by Paras
      </div>
    </footer>
  );
};

export default Footer;
