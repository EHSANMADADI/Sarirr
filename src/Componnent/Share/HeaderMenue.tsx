import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
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

  return (
    <div className="w-full sticky flex lg:px-14 px-5 py-2 mx-auto justify-between items-center border-b-2">
      <div className="flex items-center text-blue-800">
        <span>
          <img src={logo} alt="logo" className="h-auto w-16" />
        </span>
        <span className="font-nastaliq text-5xl px-1">سریر</span>
      </div>
      <div className="flex items-center text-blue-800">
        <select
          onChange={(e) => handlePageChange(e.target.value)}
          value={activePage}
          dir="rtl"
          className="flex items-center font-extrabold text-xl"
        >
          <option className="font-extrabold cursor-pointer" value="/">
            صفحه اصلی
          </option>
          <option className="font-extrabold cursor-pointer" value="/OCR">
            تبدیل عکس به متن
          </option>
          <option className="font-extrabold cursor-pointer" value="/translate">
            ترجمه
          </option>
          <option
            className="font-extrabold cursor-pointer"
            value="/SpeechEnhancement"
          >
            بهبود کیفیت صدا
          </option>
          <option className="font-extrabold cursor-pointer" value="/VAD">
            تفکیک صوت
          </option>
          <option className="font-extrabold cursor-pointer" value="/ASR">
            تبدیل گفتار به متن
          </option>
          <option
            className="font-extrabold cursor-pointer"
            value="/SuperResolution"
          >
            بهبود کیفیت عکس
          </option>
        </select>
        <span
          onClick={() => navigate("/")}
          className="mx-2 text-4xl cursor-pointer"
        >
          <MdHome />
        </span>
      </div>
    </div>
  );
}
