import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ItemTable {
  saveItems: { file: any; name: string; size: number; status: string }[];
  setSaveItems: React.Dispatch<
    React.SetStateAction<
      { name: string; size: number; status: string; file: any }[]
    >
  >;
}

export default function TabeleShowItem({ saveItems, setSaveItems }: ItemTable) {
  const [token, setToken] = useState("");
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const [passwords, setPasswords] = useState<string[]>([]);

  useEffect(() => {
    setPasswords((prevPasswords) => {
      const updatedPasswords = [...prevPasswords];
      for (let i = prevPasswords.length; i < saveItems.length; i++) {
        updatedPasswords.push("");
      }
      return updatedPasswords;
    });

    setLoadingStates((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      for (let i = prevLoadingStates.length; i < saveItems.length; i++) {
        updatedLoadingStates.push(false);
      }
      return updatedLoadingStates;
    });
  }, [saveItems]);

  const startProgress = async (index: number) => {
    try {
      // وضعیت loading برای فایل انتخاب‌شده به true تغییر می‌کند
      setLoadingStates((prev) =>
        prev.map((state, i) => (i === index ? true : state))
      );

      const file = saveItems[index].file;
      const formData = new FormData();
      formData.append("files", file);

      // مرحله 1: دریافت توکن
      const authResponse = await axios.post(
        "http://195.191.45.56:17023/api/auth",
        {
          login: "ehsan",
          password: "123456",
        }
      );

      const token = authResponse.data.accessToken;
      setToken(token);

      // مرحله 2: آپلود فایل
      const uploadResponse = await axios.post(
        "http://195.191.45.56:17023/api/UploadesFile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const match = uploadResponse.data.match(/Process id = (\d+)/);
      if (!match) {
        throw new Error("Process ID not found in response");
      }

      const processId = match[1];

      // مرحله 3: بررسی وضعیت پردازش
      const checkProcessingStatus = async () => {
        try {
          const resultResponse = await axios.get(
            `http://195.191.45.56:17023/api/result?request_id=${processId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("result",resultResponse.data);
          

          const job = resultResponse.data.jobs[0];

          if (job.status === "Processing") {
            return false; // هنوز تمام نشده
          }

          setPasswords((prev) =>
            prev.map((pass, i) => (i === index ? job.extractedPassword : pass))
          );

          return true; // پردازش تمام شده
        } catch (error) {
          console.error("Error checking processing status:", error);
          toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");

          return false;
        }
      };

      const pollStatus = async () => {
        const interval = setInterval(async () => {
          const isCompleted = await checkProcessingStatus();
          if (isCompleted) {
            clearInterval(interval);
            setLoadingStates((prev) =>
              prev.map((state, i) => (i === index ? false : state))
            );
            setSaveItems((prevItem) =>
              prevItem.map((prev, i) =>
                i === index ? { ...prev, status: "Completed" } : prev
              )
            );
            toast.success("فایل با موفقیت رمز گشایی شد");
          }
        }, 2000);
      };

      await pollStatus();
    } catch (error) {
      toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      console.error("Error in startProgress:", error);
      setLoadingStates((prev) =>
        prev.map((state, i) => (i === index ? false : state))
      );
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div dir="rtl" className="relative w-full overflow-x-auto mx-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام فایل
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3">
                رمز
              </th>
            </tr>
          </thead>
          <tbody>
            {saveItems.map((seaveItem, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-200 cursor-pointer duration-200 "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {seaveItem.name}
                </th>
                <td
                  onClick={() => startProgress(index)}
                  className={`px-6 py-4 ${
                    seaveItem.status === "Completed"
                      ? "text-green-600 font-bold"
                      : ""
                  }`}
                >
                  {loadingStates[index] && <span>...Processing</span>}
                  {!loadingStates[index] && <span>{seaveItem.status}</span>}
                </td>
                <td className="px-6 py-4">{passwords[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
