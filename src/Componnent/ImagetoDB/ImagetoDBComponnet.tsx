import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import InputFile from "./InputFile";

export default function ImagetoDBComponnet() {
  return (
    <div className="overflow-hidden mx-auto h-screen font-Byekan">
      <HeaderMenue />
      <div className="pb-20 overflow-auto h-[90vh] w-full bg-blue-50">
        <TitleDetails
          title={"ابزار استخراج اطلاعات افراد از تصویر"}
          detailes="ابزاری که به کاربران اجازه میدهد اطلاعات اشخاص را از تصویر استخراج کنند"
        />
        <div className="my2">
          <InputFile />
        </div>
      </div>
    </div>
  );
}
