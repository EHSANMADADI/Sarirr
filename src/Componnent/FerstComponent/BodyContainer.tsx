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
        discription="فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند"
        link="/ASR"
        key={1}
        bgClassName="bg-photoASR"
      />
      <ItemsComponnets
        id={2}
        title="OCR"
        discription="فناوری است که متن را از تصویر و اسناد اسکن شده به متن دیجیتال قابل ویرایش تبدیل میکند"
        link="/OCR"
        key={2}
        bgClassName="bg-photoOCR"
      />
      <ItemsComponnets
        id={3}
        title="VAD"
        discription="فناوری است که بخش های حاوی گفتار را در یک سیگنال صوتی شناسایی کرده و از بخش های بدون گفتار تفکیک میکند"
        link="/VAD"
        key={1}
        bgClassName="bg-photoVAD"
      />

      <ItemsComponnets
        id={4}
        title="Speech Enhancement"
        discription="فناوری است که کیفیت و وضوح صدای ظبط شده را با کاهش نویز و تقویت سیگنال های گفتاری بهبود می بخشد"
        link="/SpeechEnhancement"
        key={1}
        bgClassName="bg-photoSE"
      />

      <ItemsComponnets
        id={5}
        title="translator"
        discription="ابزاری قدرتمند برای ترجمه متون به زبان های مختلف است که دقت و سرعت بالایی را ارائه میدهد"
        link="/translate"
        key={1}
        bgClassName="bg-photoTranslator"
      />
       <ItemsComponnets
        id={6}
        title="super resolution"
        discription="یک تکنیک پردازش تصویر است که برای افزایش وضوح یا رزولوشن داده های بصری استفاده میشود.این تکنیک با تولید جزئیات بیشتر از تصویر اولیه ی به بهبود کیفیت و نمایش دقیق تر آن کمک میکند"
        link="/"
        key={1}
        bgClassName="bg-photoSuper"
      />
      <ItemsComponnets
        id={7}
        title="keyword spacing"
        discription="به فاصله گذاری صحیح بین کلمات کلیدی در متون یا کد ها اشاره دارد که در بهینه سازی و خوانایی متن تاثیر دارد"
        link="/"
        key={1}
        bgClassName="bg-photoSE"
      />
      <ItemsComponnets
        id={8}
        title="Decryption"
        discription="فرآیندی است که داده های رمزگذاری روش خاص به حالت اصلی و قابل فهم برمیگرداند.این فناوری به کاربران مجاز اجازه میدهد تا به اطلاعات محرمانه دسترسی پیدا کنند"
        link="/"
        key={1}
        bgClassName="bg-photoSE"
      />
    </div>
  );
}
