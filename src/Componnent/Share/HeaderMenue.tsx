import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../src/IMG/logo.png";

export default function HeaderMenu() {
  const [activePage, setActivePage] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const handlePageChange = (value: string) => {
    setActivePage(value);
    navigate(value); // هدایت به آدرس جدید
  };
  useEffect(() => {
    // تنظیم گزینه فعال بر اساس مسیر فعلی
    setActivePage(location.pathname);
  }, []);
  const [openMenu, setOpenMenue] = useState(false);

  return (
    <div className="flex border-b-2 relative items-center">
      <div className="w-full sticky flex lg:pl-14 pl-5 pb-2 mx-auto justify-between items-center">
        <div className="flex items-center text-blue-800">
          <span>
            <img src={logo} alt="logo" className="h-auto w-16" />
          </span>
          <span className="font-nastaliq text-5xl px-1">سریر</span>
        </div>
      </div>

      {/* منو */}
      <div
        className={`fixed top-0 right-0 h-screen bg-gradient-to-r from-blue-800 to-blue-950 opacity-80 text-white w-64 transform transition-transform duration-300 p-2 ${
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

          <div className="flex flex-col items-center justify-around font-black text-xl w-full h-4/6 my-auto">
              <span className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200" 
              onClick={()=>navigate('/')}
              >
                صفحه اصلی
              </span>
              <span className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200" 
              onClick={()=>navigate('/OCR')}
              >
                تبدیل عکس به متن
              </span>
              <span
                className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
                // value="/translate"
                onClick={()=>navigate('/translate')}
              >
                ترجمه
              </span>
              <span
                className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
                // value="/SpeechEnhancement"
                onClick={()=>navigate('/SpeechEnhancement')}
              >
                بهبود کیفیت صدا
              </span>
              <span className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
              //  value="/VAD"
              onClick={()=>navigate('/VAD')}
               >
                تفکیک صوت
              </span>
              <span className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
              //  value="/ASR"
              onClick={()=>navigate('/ASR')}
              >
                تبدیل گفتار به متن
              </span>
              <span
                className="font-extrabold cursor-pointer hover:border-b-2  hover:border-b-blue-200 hover:scale-110 duration-200"
                // value="/SuperResolution"
                onClick={()=>navigate('/SuperResolution')}
              >
                بهبود کیفیت عکس
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
  );
}
