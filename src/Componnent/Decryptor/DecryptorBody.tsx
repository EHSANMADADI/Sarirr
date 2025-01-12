import React, { useEffect, useState } from "react";
import InputFile from "./InputFile";
import { FaCheckCircle } from "react-icons/fa";
import UploadFile from "./UploadFile";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import TabeleShowItem from "./TabeleShowItem";
import { ToastContainer } from "react-toastify";
type FileItem = {
  name: string;
  size: number;
};

type SaveItem = {
  name: string;
  size: number;
  status: string;
  file: any;
};

export default function DecryptorBody() {
  const [files, setFiles] = useState<FileItem[]>([]); ////فایل ای که کاربر هر دفعه انتخاب میکند
  const [error, setError] = useState("");
  const [saveItems, setSaveItems] = useState<SaveItem[]>([]);

  // const handelremove = (id: number) => {
  //   const updatedItems = saveItems.filter((_, i) => i !== id);
  //   setSaveItems(updatedItems);
  //   Swal.fire({
  //     title: "فایل با موفقیت حذف شد",
  //     icon: "success",
  //   });
  // };

  console.log(files);

  useEffect(() => {
    const UpdateSaveItems = files.map((file, index) => {
      return { file, name: file.name, size: file.size, status: "آماده پردازش" };
    });
    setSaveItems([...saveItems, ...UpdateSaveItems]);
  }, [files]);

  return (
    <div className="flex lg:overflow-hidden bg-blue-50 lg:flex-nowrap flex-wrap lg:h-screen">
      <div className="w-2/3 mx-auto">
        <InputFile setFiles={setFiles} setError={setError} />
      </div>
      <div className="h-screen lg:w-1/2 w-full mx-auto lg:mr-20 flex items-center justify-center">
        <div className="w-full md:h-4/5 h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 ">
          {files.length === 0 && saveItems.length === 0 && (
            <div className="flex-col justify-center items-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center">
              <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
              <span></span>
            </div>
          )}
          {saveItems.length > 0 && (
            <TabeleShowItem saveItems={saveItems} setSaveItems={setSaveItems} />
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
