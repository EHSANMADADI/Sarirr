import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import Body from "./Body";

export default function SpeechEnhancement() {
  return (
    <div className='overflow-hidden h-screen'>
      <HeaderMenue />
      <div className="pb-20 overflow-auto h-[90vh] bg-blue-50 font-Byekan">
        <TitleDetails
          title={"Speech Enhancement ابزار افزایش کیفیت و وضوح صدای ضبط شده "}
          detailes="فناوری است که کیفیت و وضوح صدای ضبط شده را با کاهش نویز و تقویت سیگنال های گفتاری بهبود می بخشد"
        />
        <Body />
      </div>
    </div>
  );
}
