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
    <div className="flex border-b-2 relative items-center">
      <div className="w-full sticky flex px-5 pb-2 mx-auto justify-between items-center">
        {/* لوگو */}
        <div className="flex items-center text-blue-800">
          <span>
            <img src={logo} alt="logo" className="h-auto w-16" />
          </span>
          <span className="font-nastaliq text-5xl px-1">سریر</span>
        </div>

        {/* دکمه منوی همبرگری */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <IoMdClose className="text-3xl text-blue-800" />
            ) : (
              <CiMenuFries className="text-3xl text-blue-800" />
            )}
          </button>
        </div>

        {/* منوی اصلی */}
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } md:flex text-blue-800 flex-col-reverse md:flex-row items-center justify-between absolute md:static md:top-16 top-24 left-0 w-full md:w-auto bg-white md:bg-transparent z-50`}
        >
          <span
            onClick={() => handlePageChange("/")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer  hover:bg-gray-200 duration-200 md:border-none border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center"
          >
            keyword spotting
          </span>
          <span
            onClick={() => handlePageChange("/Decryptor")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 md:border-none border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center"
          >
            Decryptor
          </span>
          <span
            onClick={() => handlePageChange("/LLMUI")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 md:border-none border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center"
          >
            LLMUI
          </span>
          <span
            onClick={() => handlePageChange("/translate")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer hover:bg-gray-200 duration-200 md:border-none border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center"
          >
            ترجمه
          </span>

          {/* Dropdowns */}
          <Dropdown
            className="md:text-xl text-sm font-bold"
            label=""
            inline
            renderTrigger={() => (
              <div className=" mx-3 cursor-pointer md:border-none hover:bg-gray-200 duration-200 border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center">
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
              <div className=" mx-3 cursor-pointer md:border-none hover:bg-gray-200 duration-200 border-b-2  md:w-auto w-full items-center p-5 md:p-0 flex justify-center">
                <span className="md:text-2xl text-lg">
                  <FaAngleDown />
                </span>
                <span className="font-black md:text-lg text-sm">
                  ابزارهای پردازش صوت
                </span>
              </div>
            )}
          >
            <DropdownItem onClick={() => handlePageChange("/ASR")}>ASR</DropdownItem>
            <DropdownItem onClick={() => handlePageChange("/VAD")}>VAD</DropdownItem>
            <DropdownItem onClick={() => handlePageChange("/SpeechEnhancement")}>
              SpeechEnhancement
            </DropdownItem>
          </Dropdown>

          <span
            onClick={() => handlePageChange("/")}
            className="md:text-4xl md:border-none border-b-2  hover:bg-gray-200 duration-200 md:w-auto w-full items-center p-5 md:p-0 flex justify-center text-2xl cursor-pointer"
          >
            <IoMdHome />
          </span>
        </div>
      </div>
    </div>
  );
}
