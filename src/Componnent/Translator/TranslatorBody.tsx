import React, { useEffect, useState } from "react";
import { useStore } from "../../Store/Store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function TranslatorBody() {
  const [selectedLanguage, setSelectedLanguage] = useState("فارسی"); // ذخیره زبان انتخاب‌شده
  const ListLanguage = ["فارسی", "انگلیسی", "عربی", "عبری"];
  const [text, setText] = useState("");
  const { setKeywords } = useStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [dir, setDir] = useState("rtl");
  const [model, setModel] = useState("aya-23-8b");
 
  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language); // تنظیم زبان انتخاب‌شده
  };
  const translate = () => {
    console.log("click");
    setLoading(true);
    setResult("");
    const txttranslate = text + `به ${selectedLanguage}  ترجمه کن `;

    // console.log(txttranslate);
    const content = `
     {phrase:${text},/n  language:${selectedLanguage}} `;
    console.log(content);

    axios
      .post("http://195.191.45.56:17021/v1/chat/completions", {
        model: model,
        messages: [
          {
            role: "user",
            content:content
          },
          // {
          //   phrase: "Your phrase here",
          //   language: "fa",
          // },
        ],
      })
      .then((res) => {
        console.log(res.data?.choices[0].message.content);
        const resulttranslation=JSON.parse(res.data?.choices[0].message.content)
        setResult(resulttranslation.translation);
      })
      .catch((err) => {
        console.log(err);
        toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setResult("   ");
    switch (selectedLanguage) {
      case "انگلیسی":
        setDir("ltr");
        break;

      default:
        setDir("rtl");
        break;
    }
  }, [selectedLanguage]);

  return (
    <>
      <div className="flex items-center justify-center text-lg font-black">
        <select
          className="bg-blue-500 text-white font-black rounded-xl"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option
            className="bg-white hover:bg-blue-400 text-blue-600 hover:text-white cursor-pointer my-2 p-5"
            value="aya-expanse-32b"
          >
            مدل دقیق
          </option>
          <option
            className="bg-white hover:bg-blue-400 text-blue-600 hover:text-white cursor-pointer my-2 p-5"
            value="aya-23-8b"
          >
            مدل سریع
          </option>
        </select>
      </div>
      <div className="lg:flex flex-reverse justify-around lg:flex-nowrap my-5">
        <div className="result-box min-h-72 px-5 pb-5 pt-2 bg-white border-[3px] rounded-lg border-gray-300 lg:mb-0 mb-5 xl:w-5/12 w-10/12 mx-auto order-2 lg:order-1">
          <div className="flex items-center justify-end px-2 border-b-2 w-full p-1">
            {ListLanguage.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`font-black text-lg font-Byekan px-3 pb-2 cursor-pointer ${
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
            {result}
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
          className="text-xl font-bold w-1/6 py-3 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-lg text-white hover:bg-blue-800 duration-200 hover:scale-105"
        >
          {loading ? <span>Loading ...</span> : <span>ترجمه</span>}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
