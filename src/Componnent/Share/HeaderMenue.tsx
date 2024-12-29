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
        <div className="flex items-center justify-between mr-2 
          text-blue-800">
            <span onClick={()=>navigate('/LLMUI')} className="font-black text-lg mx-3 cursor-pointer">LLMUI</span>
          <span onClick={()=>navigate('/translate')} className="font-black text-lg mx-3 cursor-pointer">ترجمه</span>

          <Dropdown
              className="text-xl font-bold "
              label=""
              inline
              renderTrigger={() => (
                <div className="flex items-center mx-3 cursor-pointer">
            <span className="text-2xl">
              <FaAngleDown />
            </span>
            <span className="font-black text-lg">ابزارهای پردازش تصویر</span>
            </div>
              )}
            >
              <DropdownItem onClick={()=>navigate('/OCR')}>OCR</DropdownItem>
              <DropdownItem onClick={()=>navigate('/SuperResolution')} >SuperResolution</DropdownItem>
            </Dropdown>
         

            <Dropdown
              className="text-xl font-bold "
              label=""
              inline
              renderTrigger={() => (
                <div className="flex items-center mx-3 cursor-pointer">
            <span className="text-2xl">
              <FaAngleDown />
            </span>
            <span className="font-black text-lg"> ابزارهای پردازش صوت</span>
            </div>
              )}
            >
              <DropdownItem onClick={()=>navigate('/ASR')}>ASR</DropdownItem>
              <DropdownItem onClick={()=>navigate('/VAD')}>VAD</DropdownItem>
              <DropdownItem onClick={()=>navigate('/SpeechEnhancement')}>SpeechEnhancement</DropdownItem>
            </Dropdown>

          
          <span onClick={()=>navigate('/')} className="text-4xl cursor-pointer">
            <IoMdHome />
          </span>
        </div>
      </div>
    </div>
  );
}
 