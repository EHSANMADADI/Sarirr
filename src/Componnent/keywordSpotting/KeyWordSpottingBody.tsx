/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useStore } from "../../Store/Store";
import { FaCloudUploadAlt, FaPauseCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import WavesurferPlayer from "@wavesurfer/react";
import { toast, ToastContainer } from "react-toastify";
import loader from "../../IMG/tail-spin.svg";
import axios from "axios";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import api from "../../Config/api";

export default function KeyWordSpottingBody() {
  const [keyWord, setKeyword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState("fa");
  const handleChange = (event: { target: { value: any } }) => {
    setSelectedLanguages(event.target.value); // مقدار گزینه انتخاب‌شده
  };
  const [isProcessingDone, setIsProcessingDone] = useState(false);
  const { lang, audioURLs, removeRecording } = useStore();
  const [savedRecordings, setSavedRecordings] = useState(audioURLs);
  const [suportsFile, setSuportsFile] = useState(audioURLs);
  const [loading, setLoading] = useState(false);
  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [wavesurfers, setWavesurfers] = useState<any>({});
  const [foundedFiles, setFoundedFiles] = useState<string[]>([]);

  const onReady = (ws: any, index: number) => {
    setWavesurfers((prev: any) => ({
      ...prev,
      [index]: ws, // ذخیره wavesurfer برای هر فایل با استفاده از ایندکس
    }));
    setIsPlayingMap((prev: any) => ({
      ...prev,
      [index]: false,
    }));
  };

  const deleteItem = (index: number) => {
    removeRecording(index);
    const updatedRecordings = savedRecordings.filter(
      (_: any, i: number) => i !== index
    );
    setSavedRecordings(updatedRecordings);
  };

  const onPlayPause = (index: number) => {
    setIsPlayingMap((prev: any) => {
      const newMap = { ...prev };

      // اگر یک فایل در حال پخش است، آن را متوقف کنید
      Object.keys(newMap).forEach((key) => {
        const keyIndex = parseInt(key); // تبدیل کلید به عدد
        if (keyIndex !== index) {
          newMap[keyIndex] = false;
        }
      });

      // وضعیت فایل فعلی را تغییر دهید
      newMap[index] = !newMap[index];
      return newMap;
    });

    if (wavesurfers[index]) {
      wavesurfers[index].playPause();
    }
  };
  const handleButtonClick = () => {
    document.getElementById("dropzone-file")?.click();
  };
  const clickSuportChange = () => {
    document.getElementById("suports-file")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = reader.result as string;
          const newRecording = {
            name: file.name,
            audio: base64Audio,
            language: selectedLanguages, // افزودن زبان انتخاب‌شده
          };
          setSavedRecordings((prev: any) => [...prev, newRecording]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleChangeSuportFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = reader.result as string;
          const newRecording = {
            name: file.name,
            audio: base64Audio,
            language: selectedLanguages, // افزودن زبان انتخاب‌شده
          };
          setSuportsFile((prev: any) => [...prev, newRecording]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  console.log(suportsFile);
  console.log(savedRecordings);
  // تبدیل Base64 به Blob
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const sendFiles = () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("support_name", keyWord);
    formdata.append("lang", selectedLanguages);
    savedRecordings.forEach((item, index) => {
      const blob = dataURItoBlob(item.audio); //  convert base64 to blob
      formdata.append("files", blob, item.name);
    });
    suportsFile.forEach((item, index) => {
      const blob = dataURItoBlob(item.audio); //  convert base64 to blob
      formdata.append("support_files", blob, item.name);
    });
    // Send files to server
    api
      .post("/process", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.founded_files);
        setFoundedFiles(res.data.founded_files);
        setIsProcessingDone(true);
        toast.success("پردازش با موفقیت انجام شد");
      })
      .catch((err) => {
        console.log(err);
        toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="bg-blue-50 max-h-screen h-auto flex flex-wrap-reverse font-Byekan mx-auto mt-20 justify-around">
      <div className="extended-file xl:w-5/12 lg:mt-0 mt-5 w-full mx-auto ">
        {savedRecordings.length > 0 ? (
          <div className="max-h-[30rem] overflow-auto">
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg m-1 p-2 font-bold">
                : فایل های موجود
              </span>
            </div>
            <div className="border-b-2 sm:w-7/12 w-full mx-auto border-gray-600 max-h-max overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-blue-300">
              {savedRecordings.map(
                (
                  item: { name: string; audio: string; language: string },
                  index: number
                ) => (
                  <div className="mt-2 mb-3" key={index}>
                    <span>{item.name}:</span>
                    <div className="flex items-center w-full border rounded-full px-3 mb-2">
                      <button
                        className="text-lg mx-2"
                        onClick={() => onPlayPause(index)}
                      >
                        {isPlayingMap[index] ? (
                          <span className="text-red-500 text-3xl">
                            <FaPauseCircle />
                          </span>
                        ) : (
                          <span className="text-blue-500 text-3xl">
                            <FaRegCirclePlay />
                          </span>
                        )}
                      </button>
                      <div className="w-72">
                        <WavesurferPlayer
                          height={50}
                          waveColor="blue"
                          url={item.audio}
                          onReady={(ws: any) => onReady(ws, index)}
                          onPlay={() =>
                            setIsPlayingMap((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                          onPause={() =>
                            setIsPlayingMap((prev: any) => ({
                              ...prev,
                              [index]: false,
                            }))
                          }
                        />
                      </div>
                    </div>
                    {isProcessingDone ? ( // نمایش پیام‌ها پس از اتمام پردازش
                      foundedFiles.includes(item.name) ? (
                        <div
                          dir="rtl"
                          className="text-gray-500 text-base flex items-center"
                        >
                          <span className="text-green-500">
                            <IoCheckmarkDoneCircleSharp />
                          </span>
                          <span>کلمه کلیدی در این فایل یافت شد</span>
                        </div>
                      ) : (
                        <div
                          dir="rtl"
                          className="text-gray-500 text-base flex items-center"
                        >
                          <span className="text-red-500">
                            <ImCancelCircle />
                          </span>
                          <span>در این فایل کلمه کلیدی یافت نشد</span>
                        </div>
                      )
                    ) : (
                   null
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full justify-center items-center">
            <span className="text-xl font-bold text-gray-600">
              فایلی برای نمایش وجود ندارد
            </span>
          </div>
        )}
      </div>

      <div className="input-div justify-center border border-dashed  border-gray-800 p-10 rounded-md xl:w-3/12 w-8/12 max-h-[66vh] mx-auto">
        <input
          id="dropzone-file"
          type="file"
          accept=".mp3"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex justify-end mb-3">
          <span>لطفا ابتدا زبان را انتخاب کنید</span>
        </div>

        <div className="flex sm:justify-around justify-center sm:p-0 items-center w-full">
          <input
            id="en"
            type="radio"
            value="en"
            name="language"
            className="sm:w-6 sm:h-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            checked={selectedLanguages === "en"}
            onChange={handleChange}
          />
          <label htmlFor="en" className="text-base font-bold text-gray-900">
            انگلیسی
          </label>

          <input
            id="fa"
            type="radio"
            value="fa"
            name="language"
            className="sm:w-6 sm:h-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            checked={selectedLanguages === "fa"}
            onChange={handleChange}
          />
          <label htmlFor="fa" className="text-base font-bold text-gray-900">
            فارسی
          </label>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-9xl text-blue-600">
            <FaCloudUploadAlt />
          </span>
        </div>

        <div className="flex justify-center mb-5">
          <span className="text-gray-500 md:text-xl text-base">
            فایل های خود را انتخاب کنید
          </span>
        </div>

        <div className="mb-5 flex z-0 justify-center" dir="rtl">
          <button
            onClick={handleButtonClick}
            className="flex items-center sm:px-6 sm:py-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl  sm:text-xl text-base shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
          >
            انتخاب فایل
            <span className="mr-2">
              <FaCloudUploadAlt />
            </span>
          </button>
        </div>
        <div dir="rtl" className="flex items-center justify-center">
          <input
            className="p-2 rounded-xl focus:outline-blue-600"
            value={keyWord}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="کلمه کلیدی..."
          />
        </div>
        <div className="flex items-center justify-center my-3 md:text-xl text-base">
          <span className="text-gray-600 text-center">
            اضافه کردن صوت های کلمه کلیدی
          </span>
        </div>

        <div className="flex items-center justify-center">
          <input
            id="suports-file"
            type="file"
            accept=".mp3"
            className="hidden"
            multiple
            onChange={handleChangeSuportFile}
          />
          <button
            onClick={clickSuportChange}
            className="flex items-center sm:px-6 sm:py-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl  sm:text-xl text-base shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
          >
            <span className="mr-2">
              <FaCloudUploadAlt />
            </span>
            انتخاب صوت کلمه کلیدی
          </button>
        </div>
        {suportsFile.length > 0 && savedRecordings.length > 0 && keyWord && (
          <button
            onClick={sendFiles}
            disabled={loading}
            className="bg-green-500 px-4 py-2 rounded-xl text-white my-2"
          >
            {loading && (
              <div className="flex items-center justify-between">
                <span>لطفا صبر کنید</span>
                <img
                  className="mr-1 ml-2"
                  src={loader}
                  alt="loading"
                  width={20}
                  height={20}
                />
              </div>
            )}
            {!loading && <span>شروع فرآیند</span>}
          </button>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
