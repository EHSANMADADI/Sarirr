import React, { useState } from "react";
import { MdGTranslate } from "react-icons/md";
import axios from "axios";
import { useStore } from "../../Store/Store";
export default function TextEreaUser() {
  const [text, setText] = useState("");
  const maxChars = 40000;
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { keywords } = useStore();
  const handleChange = (e: any) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };
  const handelClick = () => {
    console.log("click");
    setLoading(true);
    setResult("");
    const txt = text + "به فارسی ترجمه کن";
    axios
      .post("http://127.0.0.1:17016/v1/chat/completions", {
        model:'aya-23-8b:2',
        messages: [
          {
            role: "user",
            content: txt,
          },
        ],
      })
      .then((res) => {
        console.log(res.data.choices[0].message.content);
        setResult(res.data.choices[0].message.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" p-4 w-full my-5">
      <textarea
        value={text}
        onChange={handleChange}
        className="p-5  border focus:outline-none w-full rounded-md bg-gray-50"
        placeholder="Enter Text.."
      />
      <div className="flex w-full justify-center items-center">
        <button
          onClick={handelClick}
          className="px-5 py-2 bg-green-500 flex items-center border-none outline-none text-white rounded-md hover:scale-110 duration-300 my-2"
        >
          {loading && <span>لطفا صبر کنید</span>}
          {!loading && (
            <>
              <span className="pr-2">
                <MdGTranslate />
              </span>
              <span>Translate</span>
            </>
          )}
        </button>
      </div>

      <div dir="rtl" className="w-full p-3">{result}</div>
    </div>
  );
}
