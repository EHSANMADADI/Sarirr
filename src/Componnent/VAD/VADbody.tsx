import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever, MdDeleteSweep } from "react-icons/md";
import VoiceRecorder from "../Share/VoiceRecorder";
import WavesurferPlayer from "@wavesurfer/react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { useStore } from "../../Store/Store";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Config/api";
import loader from "../../IMG/tail-spin.svg";
export default function VADBody() {
  const { audioURLs, removeRecording, clearRecordings } = useStore();
  // clearRecordings();
  const [savedRecordings, setSavedRecordings] = useState(audioURLs);
  const [converting, setConverting] = useState<boolean[]>([]);
  const [sucsessFullConverting, setSucsessFullConverting] = useState<boolean[]>(
    []
  );
  const [file, setFile] = useState<File | null>(null);
  // const [isOpen, setIsOpen] = useState(false);///open Modal for select Language

 

  useEffect(() => {
    setConverting(new Array(savedRecordings.length).fill(false));
    setSucsessFullConverting(new Array(savedRecordings.length).fill(false));
   
  }, [savedRecordings]);

  const handleButtonClick = () => {
    document.getElementById("dropzone-file")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Audio = reader.result as string;
        const newRecording = {
          name: selectedFile.name,
          audio: base64Audio,
        };
        setSavedRecordings((prev: any) => [...prev, newRecording]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleNewRecording = (recording: { name: string; audio: string }) => {
    const newRecording = {
      ...recording,
    };
    setSavedRecordings((prev: any) => [...prev, newRecording]);
  };

  // useEffect(() => {
  //   localStorage.setItem("ASR", JSON.stringify(savedRecordings));
  // }, [savedRecordings]);

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
  const handelConvert = async (index: number) => {
    try {
      const recording = savedRecordings[index];
      if (!recording || !recording.audio) {
        alert("فایلی برای ارسال یافت نشد.");
        return;
      }

      // فعال کردن وضعیت "صبر کنید" برای دکمه مربوطه
      setConverting((prev: any) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });

      // تبدیل Base64 به Blob
      const base64Data = recording.audio.split(",")[1]; // حذف prefix
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/webm" });

      // ایجاد FormData و ارسال درخواست
      const formData = new FormData();
      formData.append("file", audioBlob, `${recording.name}.webm`);
        
      console.log(formData);

      const response = await api.post("/api/vad/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("پردازش با موفقیت به اتمام رسید");
      console.log("نتیجه سرور:", response.data);
    
      setSucsessFullConverting((prev: any) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    } catch (err) {
      console.error("خطا در ارسال فایل:", err);
      toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
    } finally {
      // بازگرداندن وضعیت دکمه به حالت اولیه
      setConverting((prev: any) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };


  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan mt-20 justify-around">
      <div className="extended-file w-5/12 mx-auto">
        {savedRecordings.length > 0 ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg">
                : فایل های موجود برای تبدیل به متن قابل ویرایش
              </span>
            </div>
            <div className="border-b-2 w-7/12 mx-auto border-gray-600 max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-blue-300">
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

                    <div className="flex items-center">
                      <span
                        onClick={() => deleteItem(index)}
                        className="text-white text-xl bg-gradient-to-r px-6 py-2 cursor-pointer rounded-2xl hover:scale-105 duration-200 from-red-600 to-red-950"
                      >
                        <MdDeleteForever />
                      </span>
                      {converting[index] ? (
                        <span className="text-white text-base mx-2 bg-gradient-to-r px-16 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950">
                          {" "}
                          <img src={loader} className="w-6 h-5" />
                        </span>
                      ) : !sucsessFullConverting[index] ? (
                        <span
                          onClick={() => handelConvert(index)}
                          className="text-white text-base mx-2 bg-gradient-to-r px-16 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950"
                        >
                          {" "}
                          شروع پردازش
                        </span>
                      ) : (<span>slam</span>)}
                    
                    </div>
                    <div className="w-1/2">
                 
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <span className="text-xl font-bold text-gray-600">
              فایلی برای نمایش وجود ندارد
            </span>
          </div>
        )}
      </div>

      {/* rigth */}
      <div className="input-div justify-center border border-dashed  border-gray-800 p-10 rounded-md w-3/12 max-h-[60vh] mx-auto">
        <input
          id="dropzone-file"
          type="file"
          accept=".mp3"
          className="hidden"
          onChange={handleFileChange}
        />
       

       
        <div className="flex justify-center items-center">
          <span className="text-9xl text-blue-600">
            <FaCloudUploadAlt />
          </span>
        </div>

        <div className="flex justify-center mb-5">
          <span className="text-gray-500 text-2xl">
            فایل های خود را انتخاب کنید
          </span>
        </div>

        <div className="mb-5 flex justify-center" dir="rtl">
          <button
            onClick={handleButtonClick}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
          >
            انتخاب فایل ها
            <span className="mr-2">
              <FaCloudUploadAlt />
            </span>
          </button>
          {file && (
            <div className="flex items-center mx-2">
              <span className="text-red-700 cursor-pointer">
                <MdDeleteSweep />
              </span>
              <span className="ml-4 text-gray-700">{file.name} </span>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <span className="text-gray-400 text-2xl">یا رکورد را شروع کنید </span>
        </div>

        <VoiceRecorder
          nameComponent={"ASR"}
          onRecordingComplete={handleNewRecording}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
