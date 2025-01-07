import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import TranslatorBody from "./TranslatorBody";

export default function TranslatorComponnent() {
  return (
    <div className="overflow-hidden mx-auto h-screen">
      <HeaderMenue />
      <div className="pb-20 overflow-auto h-[90vh] w-full bg-blue-50 font-Byekan">
        <TitleDetails
          title={"ابزار مترجم هوشمند"}
          detailes="ابزاری قدرتمند برای ترجمه متون به زبان های مختلف است که دقت و سرعت بالایی را ارائه میدهد"
        />
        <TranslatorBody />
      </div>
    </div>
  );
}
