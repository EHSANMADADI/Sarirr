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

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language); // تنظیم زبان انتخاب‌شده
  };
  const translate = () => {
    console.log("click");
    setLoading(true);
    setResult("");
    const txttranslate = text + `به ${selectedLanguage}  ترجمه کن `;

    console.log(txttranslate);

    axios
      .post("http://195.191.45.56:17021/v1/chat/completions", {
        model: "aya-23-8b",
        messages: [
          {
            role: "user",
            content: txttranslate,
          },
        ],
      })
      .then((res) => {
        console.log(res.data?.choices[0].message.content);
        setResult(res.data?.choices[0].message.content);
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
      <div className="flex justify-evenly  my-5">
        <div className="result-box px-5 pb-5 pt-2 bg-white border-[3px] rounded-lg border-gray-300 xl:w-5/12">
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

        <div className="text-box p-5 flex bg-white border-[3px] px-2 rounded-lg border-gray-300 xl:w-5/12">
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              dir="rtl"
              placeholder="متن مورد نظر خود را وارد کنید..."
              className="w-full h-[30vh] border-none text-sm font-bold focus:outline-none p-5"
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
