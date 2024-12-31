/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import ItemsComponnets from "./ItemsComponnets";
export default function BodyContainer() {
  const [showWebSite, setShowWebsite] = useState(false);
  return (
    <div
      className="flex flex-wrap items-start xl:justify-between justify-center xl:gap-5 gap-2 w-2/3 mx-auto"
      dir="rtl"
    >
      <ItemsComponnets
        id={1}
        title="ASR"
        discription="فناوری  تبدیل گفتار انسان  به متن"
        link="/ASR"
        key={1}
        bgClassName="bg-photoASR"
      />
      <ItemsComponnets
        id={2}
        title="OCR"
        discription="فناوری تبدیل تصاویر و اسناد اسکن شده به متن"
        link="/OCR"
        key={2}
        bgClassName="bg-photoOCR"
      />
      <ItemsComponnets
        id={3}
        title="VAD"
        discription="فناوری حذف بخش های بدون گفتار از یک فایل صوتی"
        link="/VAD"
        key={1}
        bgClassName="bg-photoVAD"
      />

      <ItemsComponnets
        id={4}
        title="Speech Enhancement"
        discription="فناوری کاهش نویز از فایل ها صوتی "
        link="/SpeechEnhancement"
        key={1}
        bgClassName="bg-photoSE"
      />

      <ItemsComponnets
        id={5}
        title="translator"
        discription="ابزار ترجمه متون به زبان مختلف"
        link="/translate"
        key={1}
        bgClassName="bg-photoTranslator"
      />
       <ItemsComponnets
        id={6}
        title="super resolution"
        discription="ابزار بهبود کیفیت تصاویر"
        link="/SuperResolution"
        key={1}
        bgClassName="bg-photoSuper"
      />
      <ItemsComponnets
        id={7}
        title="keyword spotting"
        discription="ابزار جست و جو کلمات کلیدی درفایل های صوتی"
        link="/"
        key={1}
        bgClassName="bg-ketWord"
      />
      <ItemsComponnets
        id={8}
        title="Decryptor"
        discription="ابزار یافتن رمزینه فایل های رمزگذاری شده"
        link="/Decryptor"
        key={1}
        bgClassName="bg-descreiption"
      />
       <ItemsComponnets
        id={9}
        title="LLMUI"
        discription="رابط کاربری مدل های زبانی با قابلیت های متنوع"
        link="/LLMUI"
        key={1}
        bgClassName="bg-llmui"
      />
    </div>
  );
}
