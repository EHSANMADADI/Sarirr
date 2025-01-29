import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function TranslatorBody() {
  const [selectedLanguage, setSelectedLanguage] = useState("فارسی"); // ذخیره زبان انتخاب‌شده
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
  const [model, setModel] = useState("aya-expanse-32b");

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
  };
  const translate = () => {
    console.log("click");
    setLoading(true);
    setResult("");
    // const txttranslate = text + `به ${selectedLanguage}  ترجمه کن `;

    // console.log(txttranslate);
    const content = `{"phrase":"${text}",  "language":"${selectedLanguage}"} `;
    console.log(content);

    axios
      .post("http://195.191.45.56:17021/v1/chat/completions", {
        model: model,
        messages: [
          {
            role: "user",
            content,
          },
        ],
      })
      .then((res) => {
        console.log(res.data);

        let content = res.data?.choices[0].message.content.replaceAll("\n", "")
          .replace(/(?<=("|}|{|(",)))(\r|\n|\t|\v|\f| )+(?=(,|"|{|}))/gi,'')
          .replaceAll(/\n/gi, "\\\\n")
          .replaceAll(/(\r|\t|\v|\f)/gi, "")
          .replaceAll(/`/gi, "");
          // .replaceAll(/\r\n/gi, "\\\\r\\\\n")
          // .replaceAll(/\r/gi, "\\\\r")
          // .replaceAll(/\t/gi, "\\\\t")
          // .replaceAll(/\f/gi, "\\\\f")
          // .replaceAll(/\v/gi, "\\\\v");
        console.log(content);
        const resulttranslation = JSON.parse(content);
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
      case "english":
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
          className="bg-blue-500 text-white font-black rounded-xl p-2 border-none focus:border-none cursor-pointer"
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
            {result.split('\\n').map(line => (
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
          className="text-xl font-bold w-1/6 py-3 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-lg text-white hover:bg-blue-800 duration-200 hover:scale-105"
        >
          {loading ? <span>Loading ...</span> : <span>ترجمه</span>}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
