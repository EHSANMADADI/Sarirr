import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import KeyWordSpottingBody from "./KeyWordSpottingBody";

export default function KeyWordSpottingComponnent() {
  return (
    <div className="overflow-hidden mx-auto h-screen">
      <HeaderMenue />
      <div className="pb-10 overflow-auto h-[90vh] w-full bg-blue-50 font-Byekan">
        <TitleDetails
          title={"ابزار تشخیص کلمه کلیدی در صوت "}
          detailes={
            "فناوری ای است که کلمه کلیدی را در صوت شناسایی میکند"
          }
        />
        <KeyWordSpottingBody />
      </div>
    </div>
  );
}
