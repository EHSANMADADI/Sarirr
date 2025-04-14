import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
interface res {
  response: string;
}

export default function TranslatorOlama() {
  useEffect(() => {
    const sendInitialRequest = async () => {
      try {
        const response = await fetch(
          "http://192.168.4.166:11434/api/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gemma2:27b",
            }),
          }
        );

        const data = await response.json();
        console.log("لود اولیه مدل", data);
        // اگر خواستی داده خاصی رو توی state ذخیره کنی
        // setResult(data.response);
      } catch (error) {
        console.error("خطا در لود مدل:", error);
      }
    };

    sendInitialRequest();
  }, []); // [] یعنی فقط یک‌بار در زمان mount اجرا شود

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

    try {
      const response = await fetch("http://192.168.4.166:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma2:27b",
          // prompt: ` زبان عبارت زیر را به ${selectedLanguage} ترجمه کن\n${text}`,
          prompt: `You will receive a JSON object containing two keys: 'phrase' and 'language'. Please translate the text in 'phrase' to the language specified in 'language' and return only a JSON object with two keys: 'translation' and 'additional_info' Important: Do not provide any additional explanations, notes, or information outside of the JSON format. Return only the following JSON format:{'translation': 'translated phrase','additional_info': 'additional information''language': 'target language here'}Input JSON:{'phrase': 'Your phrase here','language': 'target language here'}ExampleIf  input is:{'phrase': 'سلام، حال شما چطور است؟','language': 'English'}you should return only:{'translation': 'Hello, how are you?','additional_info': 'This is a common greeting in Persian.'language': 'English'}my text is :{${text},'language':${selectedLanguage}}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(data);

      try {
        let cleaned = data.response.replace(/```json|```/g, "").trim();
        cleaned = cleaned.replace(/'/g, '"');
        const jsonResponse = JSON.parse(cleaned);
        setResult(jsonResponse.translation);
      } catch (e) {
        console.error("خطا در پارس کردن پاسخ:", e);
        toast.error("پاسخ دریافتی معتبر نیست");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطا در ارتباط با سرور");
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
          className="text-xl font-bold sm:w-1/6 w-2/6 py-3 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-lg text-white hover:bg-blue-800 duration-200 hover:scale-105"
        >
          {loading ? <span>Loading ...</span> : <span>ترجمه</span>}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
