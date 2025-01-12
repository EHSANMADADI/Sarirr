import React, { useState } from "react";
import { useStore } from "../../Store/Store";
import { FaCloudUploadAlt, FaPauseCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import WavesurferPlayer from "@wavesurfer/react";
import { ToastContainer } from "react-toastify";

export default function KeyWordSpottingBody() {
  const [keyWord, setKeyword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState("persian");
  const handleChange = (event: { target: { value: any } }) => {
    setSelectedLanguages(event.target.value); // مقدار گزینه انتخاب‌شده
  };
  const { lang, audioURLs, removeRecording } = useStore();
  const [savedRecordings, setSavedRecordings] = useState(audioURLs);
  const [suportsFile, setSuportsFile] = useState(audioURLs);
  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [wavesurfers, setWavesurfers] = useState<any>({});

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

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex flex-wrap-reverse font-Byekan mx-auto mt-20 justify-around">
      <div className="extended-file xl:w-5/12 lg:mt-0 mt-5 w-full mx-auto">
        {savedRecordings.length > 0 ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg m-1 p-2 font-bold">
                : فایل های موجود
              </span>
            </div>
            <div className="border-b-2 sm:w-7/12 w-full mx-auto border-gray-600 max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-blue-300">
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
                      <div className="w-72 ">
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
                  </div>
                )
              )}
            </div>
          </>
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
            value="english"
            name="language"
            className="sm:w-6 sm:h-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            checked={selectedLanguages === "english"}
            onChange={handleChange}
          />
          <label htmlFor="en" className="text-base font-bold text-gray-900">
            انگلیسی
          </label>

          <input
            id="fa"
            type="radio"
            value="persian"
            name="language"
            className="sm:w-6 sm:h-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            checked={selectedLanguages === "persian"}
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
            اضافه کردن فولدر صوت کلمات کلیدی
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
            انتخاب فولدر
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
