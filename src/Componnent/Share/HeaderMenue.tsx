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
  const handlePageChange = (value: string) => {
    setActivePage(value);
    navigate(value); // هدایت به آدرس جدید
  };
  useEffect(() => {
    setActivePage(location.pathname);
  }, []);
  const [openMenu, setOpenMenue] = useState(false);

  return (
    <div className="flex border-b-2 relative items-center">
      <div className="w-full sticky flex px-5 pb-2 mx-auto justify-between items-center">
        <div className="flex items-center text-blue-800">
          <span>
            <img src={logo} alt="logo" className="h-auto w-16" />
          </span>
          <span className="font-nastaliq text-5xl px-1">سریر</span>
        </div>
        <div
          className="sm:flex hidden items-center justify-between mr-2 
          text-blue-800"
        >
          <span
            onClick={() => navigate("/LLMUI")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer"
          >
            LLMUI
          </span>
          <span
            onClick={() => navigate("/translate")}
            className="font-black md:text-lg text-sm mx-3 cursor-pointer"
          >
            ترجمه
          </span>

          <Dropdown
            className="md:text-xl text-sm font-bold "
            label=""
            inline
            renderTrigger={() => (
              <div className="flex items-center mx-3 cursor-pointer">
                <span className="md:text-2xl text-lg">
                  <FaAngleDown />
                </span>
                <span className="font-black md:text-lg text-sm">
                  ابزارهای پردازش تصویر
                </span>
              </div>
            )}
          >
            <DropdownItem onClick={() => navigate("/OCR")}>OCR</DropdownItem>
            <DropdownItem onClick={() => navigate("/SuperResolution")}>
              SuperResolution
            </DropdownItem>
          </Dropdown>

          <Dropdown
            className="md:text-xl text-sm font-bold "
            label=""
            inline
            renderTrigger={() => (
              <div className="flex items-center mx-3 cursor-pointer">
                <span className="md:text-2xl text-lg">
                  <FaAngleDown />
                </span>
                <span className="font-black md:text-lg text-sm">
                  {" "}
                  ابزارهای پردازش صوت
                </span>
              </div>
            )}
          >
            <DropdownItem onClick={() => navigate("/ASR")}>ASR</DropdownItem>
            <DropdownItem onClick={() => navigate("/VAD")}>VAD</DropdownItem>
            <DropdownItem onClick={() => navigate("/SpeechEnhancement")}>
              SpeechEnhancement
            </DropdownItem>
          </Dropdown>

          <span
            onClick={() => navigate("/")}
            className="md:text-4xl text-2xl cursor-pointer"
          >
            <IoMdHome />
          </span>
        </div>

        {/* sm< */}
        <div className="relative sm:hidden z-50 ">
          <div
            className={`fixed z-50 top-0 right-0 h-screen bg-gradient-to-r from-blue-600 to-blue-900 text-white w-64 transform transition-transform duration-300 p-2 ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <span
              onClick={() => {
                setOpenMenue(false);
              }}
              className="text-3xl cursor-pointer"
            >
              <IoMdClose />
            </span>

            <div className="flex flex-col items-center justify-around font-black text-lg w-full h-4/6 my-auto">
              <span
                className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
                onClick={() => navigate("/")}
              >
                صفحه اصلی
              </span>

              <Dropdown
                className="font-bold "
                label=""
                inline
                renderTrigger={() => (
                  <div className="flex items-center mx-3 cursor-pointer">
                    <span className="md:text-2xl text-xl">
                      <FaAngleDown />
                    </span>
                    <span className="font-black ">ابزارهای پردازش تصویر</span>
                  </div>
                )}
              >
                <DropdownItem onClick={() => navigate("/OCR")}>
                  OCR
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/SuperResolution")}>
                  SuperResolution
                </DropdownItem>
              </Dropdown>

              <Dropdown
                className="font-bold "
                label=""
                inline
                renderTrigger={() => (
                  <div className="flex items-center mx-3 cursor-pointer">
                    <span className="md:text-2xl text-xl">
                      <FaAngleDown />
                    </span>
                    <span className="font-black "> ابزارهای پردازش صوت</span>
                  </div>
                )}
              >
                <DropdownItem onClick={() => navigate("/ASR")}>
                  ASR
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/VAD")}>
                  VAD
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/SpeechEnhancement")}>
                  SpeechEnhancement
                </DropdownItem>
              </Dropdown>

              <span
                className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
                // value="/translate"
                onClick={() => navigate("/translate")}
              >
                ترجمه
              </span>
            </div>
          </div>

          {/* دکمه همبرگر */}
          <span
            onClick={() => setOpenMenue(true)}
            className="xl:text-4xl text-2xl mx-5  cursor-pointer text-blue-600"
          >
            <CiMenuFries />
          </span>
        </div>
      </div>
    </div>
  );
}
