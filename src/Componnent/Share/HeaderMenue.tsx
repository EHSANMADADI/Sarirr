import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../src/IMG/logo.png";
import { IoMdHome } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function HeaderMenu() {
  const [activePage, setActivePage] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handlePageChange = (value: string) => {
    setActivePage(value);
    navigate(value); // هدایت به آدرس جدید
  };

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

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
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } lg:flex text-blue-800 flex-col-reverse font-Byekan lg:flex-row items-center justify-between absolute lg:static lg:top-16 top-24 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-50`}
        >
          <span
            onClick={() => handlePageChange("/")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer  hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md flex justify-center"
          >
            keyword spotting
          </span>
          <span
            onClick={() => handlePageChange("/Decryptor")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center"
          >
            Decryptor
          </span>
          <span
            onClick={() => handlePageChange("/LLMUI")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md  flex justify-center"
          >
            LLMUI
          </span>
          <span
            onClick={() => handlePageChange("/translate")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 lg:border-none border-b-2  lg:w-auto w-full items-center p-5 lg:p-4 rounded-md flex justify-center"
          >
            ترجمه
          </span>

          {/* Dropdowns */}
          <Dropdown
            className="md:text-xl text-sm font-bold"
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
            className="md:text-xl text-sm font-bold"
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
        </div>
      </div>
    </div>
  );
}
