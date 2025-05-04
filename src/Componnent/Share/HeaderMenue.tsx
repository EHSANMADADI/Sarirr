import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../src/IMG/logo.png";
import { IoMdHome } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, DropdownItem } from "flowbite-react";
import { motion } from "framer-motion"; // اضافه کردن framer-motion
export default function HeaderMenu() {
  const [activePage, setActivePage] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(window.innerWidth >= 1024);

  const handlePageChange = (value: string) => {
    setActivePage(value);
    navigate(value); //routing to new address
  };

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex border-b-2 relative items-center z-50">
      <div className="w-full sticky flex px-5 pb-2 mx-auto justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-blue-800">
          <span>
            <img src={logo} alt="logo" className="h-auto w-16" />
          </span>
          <span className="font-nastaliq text-5xl px-1">سریر</span>
        </div>

        {/* btn humberger menue */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <IoMdClose className="text-3xl text-blue-800" />
            ) : (
              <CiMenuFries className="text-3xl text-blue-800" />
            )}
          </button>
        </div>

        {/* orginal menue */}
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={
            openMenu
              ? { maxHeight: "500px", opacity: 1 }
              : { maxHeight: 0, opacity: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`${
            openMenu ? "flex" : "hidden"
          } lg:flex text-blue-800 flex-col-reverse font-Byekan lg:flex-row items-center justify-between absolute lg:static lg:top-16 top-24 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-50 overflow-hidden`}
        >
          <span
            onClick={() => handlePageChange("/keywordSpotting")}
            className="font-semibold  md:text-lg text-sm mx-3 cursor-pointer  hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md flex justify-center"
          >
            keyword spotting
          </span>
          <span
            onClick={() => handlePageChange("/Decryptor")}
            className="font-semibold  md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center"
          >
            Decryptor
          </span>


          <a
          href="http://109.230.90.198:17022/"
            // onClick={() => handlePageChange("http://109.230.90.198:17022/")}
            className="font-semibold  md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center"
          >
            LLMUI
          </a>
          <span
            onClick={() => handlePageChange("/translate")}
            className="font-semibold md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md flex justify-center"
          >
            ترجمه
          </span>
          <span
            onClick={() => handlePageChange("/gitinama")}
            className="font-semibold md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md flex justify-center"
          >
            گیتی نما
          </span>

          {/* Dropdowns */}
          <Dropdown
            className="md:text-xl text-sm "
            label=""
            inline
            renderTrigger={() => (
              <div className=" mx-3 cursor-pointer lg:border-none hover:bg-gray-200 duration-200 border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center">
                <span className="md:text-2xl text-lg">
                  <FaAngleDown />
                </span>
                <span className="font-black md:text-lg text-sm">
                  ابزارهای پردازش تصویر
                </span>
              </div>
            )}
          >
            <DropdownItem onClick={() => handlePageChange("/OCR")}>
              OCR
            </DropdownItem>
            <DropdownItem onClick={() => handlePageChange("/SuperResolution")}>
              SuperResolution
            </DropdownItem>
          </Dropdown>

          <Dropdown
            className="md:text-xl text-sm "
            label=""
            inline
            renderTrigger={() => (
              <div className=" mx-3 cursor-pointer lg:border-none hover:bg-gray-200 duration-200 border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center">
                <span className="md:text-2xl text-lg">
                  <FaAngleDown />
                </span>
                <span className="font-black md:text-lg text-sm">
                  ابزارهای پردازش صوت
                </span>
              </div>
            )}
          >
            <DropdownItem onClick={() => handlePageChange("/ASR")}>
              ASR
            </DropdownItem>
            <DropdownItem onClick={() => handlePageChange("/VAD")}>
              VAD
            </DropdownItem>
            <DropdownItem
              onClick={() => handlePageChange("/SpeechEnhancement")}
            >
              SpeechEnhancement
            </DropdownItem>
          </Dropdown>

          <span
            onClick={() => handlePageChange("/")}
            className="md:text-4xl lg:border-none border-b-2  hover:bg-gray-200 duration-200 lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center text-2xl cursor-pointer"
          >
            <IoMdHome />
          </span>
        </motion.div>
      </div>
    </div>
  );
}
