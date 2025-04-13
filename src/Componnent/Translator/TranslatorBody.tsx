
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function TranslatorBody() {
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // ذخیره زبان انتخاب‌شده
  const ListLanguage = [
    "Persian",
    "Hebrew",
    "Arabic",
    "English",
    "Russian",
    "Chinese",
  ];
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [dir, setDir] = useState("rtl");
  // const [model, setModel] = useState("aya-expanse-32b");

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
  };
  const translate = async () => {
    if (text === "") {
      toast.info("لطفا متن مورد نظر خود را برای ترجمه وارد کنید");
      return;
    }
  
    setLoading(true);
    setResult("");
  
    const controller = new AbortController();
    const { signal } = controller;
  
    const response = await fetch("http://109.230.90.198:17021/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma-2-27b-it",
          // model: "aya-23-8b",
          // model: "aya-expanse-32b",
        messages: [
          {
            role: "user",
            content: `{"phrase":"${text}", "language":"${selectedLanguage}"}`,
          },
        ],
        stream: true,
      }),
      signal,
    });
  
    if (!response.body) {
      toast.error("پاسخی از سرور دریافت نشد");
      setLoading(false);
      return;
    }
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
  
    let partial = "";
  
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
  
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (jsonStr === "[DONE]") break;
  
            try {
              const parsed = JSON.parse(jsonStr);
              const contentChunk = parsed?.choices?.[0]?.delta?.content;
              if (contentChunk) {
                // نمایش کلمه‌به‌کلمه به صورت زنده
                setResult((prev) => prev + contentChunk);
              }
            } catch (err) {
              console.log("خطا در پارس کردن چانک:", err);
            }
          }
        }
      }
    } catch (err) {
      console.log("خطا در استریم:", err);
      toast.error("مشکلی در خواندن پاسخ وجود دارد");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setResult("   ");
    switch (selectedLanguage) {
      case "English":
        setDir("ltr");
        break;

      default:
        setDir("rtl");
        break;
    }
  }, [selectedLanguage]);

  return (
    <>
    
      <div className="flex flex-wrap justify-around  lg:flex-nowrap my-5">
        <div className="result-box lg:mt-0 mt-5 min-h-72 px-5 pb-5 pt-2 bg-white border-[3px] rounded-lg border-gray-300 lg:mb-0 mb-5 xl:w-5/12 w-10/12 mx-auto order-2 lg:order-1">
          <div className="flex items-center sm:justify-end justify-center px-2 border-b-2 w-full p-1">
            {ListLanguage.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`font-black lg:text-lg text-xs font-Byekan md:px-3 px-1 pb-2 cursor-pointer ${
                    selectedLanguage === item
                      ? "text-blue-600"
                      : "text-gray-800"
                  }`}
                  onClick={() => handleLanguageClick(item)}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div dir={dir} className="w-full">
            {result.split("\\n").map((line) => (
              <div>{line}</div>
            ))}
          </div>
        </div>

        <div className="text-box p-1 min-h-60 flex bg-white border-[3px] px-2 h-auto rounded-lg outline-none border-gray-300 xl:w-5/12 w-10/12 mx-auto order-1 lg:order-2">
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              dir="rtl"
              placeholder="متن مورد نظر خود را وارد کنید..."
              className="w-full h-[30vh] border-none text-sm font-bold outline-none focus:outline-none focus:border-none p-5"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-2">
        <button
          onClick={translate}
          disabled={loading}
          className="text-xl font-bold sm:w-1/6 w-2/6 py-3 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-lg text-white hover:bg-blue-800 duration-200 hover:scale-105"
        >
          {loading ? <span>Loading ...</span> : <span>ترجمه</span>}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
