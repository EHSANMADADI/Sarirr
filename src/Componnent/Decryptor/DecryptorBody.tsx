import React, { useEffect, useState } from "react";
import InputFile from "./InputFile";
import { FaCheckCircle } from "react-icons/fa";
import UploadFile from "./UploadFile";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function DecryptorBody() {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState("");
  const [saveItems, setSaveItems] = useState([]);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  console.log(files);

  const handelremove = (id: number) => {
    const updatedItems = saveItems.filter((_, i) => i !== id);
    setSaveItems(updatedItems);
    Swal.fire({
      title: "فایل با موفقیت حذف شد",
      icon: "success",
    });
  };

  return (
    <div className="flex lg:overflow-hidden bg-blue-50 lg:flex-nowrap flex-wrap lg:h-screen">
      <div className="w-2/3 mx-auto">
        <InputFile
          files={files}
          setFiles={setFiles}
          error={error}
          setError={setError}
        />
      </div>
      <div className="h-screen lg:w-1/2 w-full mx-auto sm:mr-20 flex items-center">
        <div className="w-full md:h-1/2 h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 ">
          {!files && saveItems.length === 0 && (
            <div className="flex justify-center items-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center">
              <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
            </div>
          )}
          {files && (
            <UploadFile
              allFilesUploaded={allFilesUploaded}
              setAllFilesUploaded={setAllFilesUploaded}
              // keys={files.length}
              files={files}
              // setFiles={setFiles}
              setSaveItems={setSaveItems}
              saveItems={saveItems}
            />
          )}
          {saveItems.length > 0 &&
            saveItems.map((itemArray, index) => (
              <div
                key={index}
                className="box-Item seavItem border bg-white border-gray-100 shadow-lg rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10"
              >
                <div className="flex justify-between items-center md:mx-5 mx-2">
                  <p className="text-xl font-semibold">پردازش تکمیل شد</p>
                  <div className="text-lg text-green-500">
                    <FaCheckCircle />
                  </div>
                </div>
                <div className="sm:mx-6 mx-0 mt-1">
                  <div className="bg-gray-200 rounded-full h-2 ">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mb-1">
                    <span className="text-sm font-medium text-gray-400 ">
                      100%
                    </span>
                  </div>
                  {/* <div className='flex'>
                                            <div className='flex justify-between w-full'>
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => handelremove(index)}
                                                >
                                                    <span className='text-center  mr-2 text-2xl text-red-600 '>
                                                        <RiDeleteBin6Line />
                                                    </span>
                                                    حذف
                                                </button>
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => { setShowBTN(true); handleModalOpen(index, itemArray.responseText); ChangeIndexMultiple(index) }}
                                                >
                                                    <span className='text-center mr-2 text-2xl text-blue-600'>
                                                        <IoMdEye />
                                                    </span>
                                                    مشاهده
                                                </button>
                                              
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => handelDownloadPdf(index)}
                                                    disabled={isDownloadPdf[index]}
                                                >
                                                    <span className='text-center mr-2 text-xl text-red-700'>
                                                        <FaRegFilePdf />
                                                    </span>
                                                    {isDownloadPdf[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>PDF</span>)}

                                                </button>
                                                <button
                                                    className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
                                                    onClick={() => handelDownloadWord(index)}
                                                >
                                                    <span className='text-center mr-2 text-xl text-yellow-600'>
                                                        <FaDownload />
                                                    </span>
                                                    {isDownloadWord[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>WORD</span>)}

                                                </button>
                                            </div>
                                        </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>

      
    </div>
  );
}
